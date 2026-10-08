// Runs the shared motion prompt through one or more (model, iteration) pairs, then renders each result.
//
//   node scripts/motion/run.mjs <model-id|all> [iteration|all] [--group baseline] [--force]
//
// Each run gets a fresh project folder and a fresh HOME that holds only the harness's credentials,
// so the harness starts from its stock configuration: no skills, plugins, MCP servers, or user instructions.
// The agent builds a page that follows the framekit contract (see the prompt); once its session ends,
// finish.mjs renders that page the same way for every model. Agent time and render time are recorded apart.
// Raw transcripts and the agent's source files stay in the work root (see harness.mjs); the repo gets the video,
// a poster, and one entry in src/lib/motion-runs.json.
import fs from "node:fs";
import path from "node:path";
import {
  assertClaudeAuth,
  authFiles,
  config,
  harnessCommand,
  harnessVersion,
  isolatedEnv,
  killTree,
  resolveBin,
  spawnHarness,
  templatesDir,
  trackDescendants,
} from "./harness.mjs";
import { finishRun, readRuns } from "./finish.mjs";
import { loadPrompt, prepareRun } from "./new.mjs";

const args = process.argv.slice(2);
const groupFlag = args.indexOf("--group");
const groupId = groupFlag === -1 ? "baseline" : args[groupFlag + 1];
const force = args.includes("--force");
const positional = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--group");
const [modelArg = "", iterArg = "all"] = positional;

if (!config.groups.some((g) => g.id === groupId)) fail(`Unknown group ${groupId}`);
const models = modelArg === "all" ? config.models : config.models.filter((m) => m.id === modelArg);
if (!models.length) fail(`Usage: node scripts/motion/run.mjs <${config.models.map((m) => m.id).join("|")}|all> [iteration|all]`);
const iterations =
  iterArg === "all" ? Array.from({ length: config.iterations }, (_, i) => i + 1) : [Number(iterArg)];
if (iterations.some((n) => !Number.isInteger(n) || n < 1 || n > config.iterations)) fail(`Bad iteration ${iterArg}`);

const { promptSha256 } = loadPrompt(groupId);

// Ctrl-C stops the current agent and everything it started, not just the runner.
let current = null;
process.on("SIGINT", () => {
  if (current) killTree(current);
  process.exit(130);
});

for (const model of models) {
  for (const iteration of iterations) {
    await runOne(model, iteration);
  }
}

async function runOne(model, iteration) {
  const harness = config.harnesses.find((h) => h.id === model.harness);
  if (!harness) fail(`Model ${model.id} points at unknown harness ${model.harness}`);
  const key = `${groupId}/${model.id}/${iteration}`;
  const existing = readRuns()[key];
  if (existing && !force) {
    // Only an isolated run under the current prompt counts as done; manual or older results get redone.
    if (existing.promptSha256 === promptSha256 && existing.source === "runner") {
      console.log(`skip ${key} (already ran, pass --force to redo)`);
      return;
    }
    console.log(`redo ${key} (its result came from ${existing.source === "manual" ? "a manual thread" : "an older prompt"})`);
  }

  if (harness.id === "claude-code") {
    try {
      assertClaudeAuth(config.timeoutMinutes + 5);
    } catch (err) {
      fail(`stop ${key}: ${err.message}`);
    }
  }
  const bin = resolveBin(harness.bin);
  const version = harnessVersion(bin);
  const { runDir, workdir, home, prompt } = prepareRun({ groupId, model, iteration, source: "runner", harnessVersion: version });
  fs.cpSync(path.join(templatesDir, harness.id), home, { recursive: true });
  console.log(`run  ${key} with ${harness.label} ${version} in ${workdir}`);

  const transcriptPath = path.join(runDir, "transcript.jsonl");
  const transcript = fs.openSync(transcriptPath, "w");
  const stderr = fs.openSync(path.join(runDir, "stderr.log"), "w");
  const command = harnessCommand(harness, model, prompt, workdir);
  const startedAt = Date.now();
  const child = spawnHarness(bin, command.args, {
    cwd: workdir,
    env: isolatedEnv(home, harness.id),
    stdio: [command.stdin === null ? "ignore" : "pipe", transcript, stderr],
  });
  current = child;
  const descendants = trackDescendants(child.pid);
  if (command.stdin !== null) child.stdin.end(command.stdin);
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    killTree(child, "SIGTERM");
    setTimeout(() => killTree(child), 10_000).unref();
  }, config.timeoutMinutes * 60_000);
  const { code: exitCode, signal } = await new Promise((resolve) => {
    child.on("error", (err) => {
      fs.writeSync(stderr, `\nrunner: could not start ${bin}: ${err.message}\n`);
      resolve({ code: -1, signal: null });
    });
    child.on("close", (code, sig) => resolve({ code, signal: sig }));
  });
  clearTimeout(timer);
  const wallSeconds = Math.round((Date.now() - startedAt) / 1000);
  // Anything the agent left running (dev servers, browsers) goes too, so it can't load the render.
  killTree(child);
  await descendants.killAll();
  current = null;
  fs.closeSync(transcript);
  fs.closeSync(stderr);

  syncAuthBack(harness.id, home);

  const { run } = await finishRun(runDir, { exitCode, signal, timedOut, wallSeconds, usage: readUsage(harness.id, transcriptPath) });
  const renderNote = run.render ? `, rendered in ${run.render.renderSeconds}s` : "";
  console.log(`done ${key}: ${run.status} after ${wallSeconds}s${renderNote}${run.failure ? ` (${run.failure})` : ""} (logs in ${runDir})`);
}

// Best-effort cost and turn totals from each harness's JSON event stream.
function readUsage(harnessId, transcriptPath) {
  const events = fs
    .readFileSync(transcriptPath, "utf8")
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line)];
      } catch {
        return [];
      }
    });
  if (harnessId === "claude-code") {
    const result = events.findLast((e) => e.type === "result");
    return result ? { costUsd: result.total_cost_usd ?? null, turns: result.num_turns ?? null } : null;
  }
  if (harnessId === "codex") {
    const done = events.findLast((e) => e.type === "turn.completed");
    return done?.usage ? { tokens: done.usage } : null;
  }
  if (harnessId === "grok-cli") {
    const end = events.findLast((e) => e.type === "end");
    return end ? { costUsd: end.total_cost_usd ?? null, turns: end.num_turns ?? null } : null;
  }
  return null;
}

function syncAuthBack(harnessId, home) {
  for (const rel of authFiles[harnessId] ?? []) {
    const runCopy = path.join(home, rel);
    const real = path.join(process.env.HOME ?? process.env.USERPROFILE ?? "", rel);
    const template = path.join(templatesDir, harnessId, rel);
    if (![runCopy, real, template].every((p) => fs.existsSync(p))) continue;
    const changed = fs.readFileSync(runCopy, "utf8") !== fs.readFileSync(template, "utf8");
    const realUntouched = fs.readFileSync(real, "utf8") === fs.readFileSync(template, "utf8");
    if (changed && realUntouched) {
      // The harness rotated its tokens during the run. Carry them back so the real login stays valid.
      fs.copyFileSync(runCopy, real);
      fs.copyFileSync(runCopy, template);
    }
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
