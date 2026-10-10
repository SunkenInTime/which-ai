// Runs the shared motion prompt through one or more models, one session each, then renders the results.
//
//   node scripts/motion/run.mjs <model-id|all> [--group baseline] [--force]
//
// One session makes all of a model's videos (one folder each), the way the UI gallery asks for every iteration
// in one prompt: the model knows it is making several, so whether they differ is up to it.
// Each session gets a fresh sandbox and a fresh HOME that holds only the harness's credentials,
// so the harness starts from its stock configuration: no skills, plugins, MCP servers, or user instructions.
// The agent builds pages that follow the framekit contract (see the prompt); once its session ends,
// finish.mjs renders each page the same way for every model. Agent time and render time are recorded apart.
// Raw transcripts and the agent's source files stay in the work root (see harness.mjs); the repo gets each video,
// a poster, and one entry per video in src/lib/motion-runs.json.
import fs from "node:fs";
import os from "node:os";
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
const [modelArg = ""] = positional;

if (!config.groups.some((g) => g.id === groupId)) fail(`Unknown group ${groupId}`);
const models = modelArg === "all" ? config.models : config.models.filter((m) => m.id === modelArg);
if (!models.length) fail(`Usage: node scripts/motion/run.mjs <${config.models.map((m) => m.id).join("|")}|all>`);

const { promptSha256 } = loadPrompt(groupId);

// Ctrl-C stops the current agent and everything it started, not just the runner.
let current = null;
process.on("SIGINT", () => {
  if (current) killTree(current);
  process.exit(130);
});

for (const model of models) await runSession(model);

async function runSession(model) {
  const harness = config.harnesses.find((h) => h.id === model.harness);
  if (!harness) fail(`Model ${model.id} points at unknown harness ${model.harness}`);
  const key = `${groupId}/${model.id}`;
  const runs = readRuns();
  const existing = Array.from({ length: config.iterations }, (_, i) => runs[`${key}/${i + 1}`]);
  // A model is done when an isolated session under the current prompt made all its videos. Anything less gets a
  // new session, which replaces the published videos only if it does at least as well (see finish.mjs).
  if (!force && existing.every((run) => run?.promptSha256 === promptSha256 && run.source === "runner" && run.status === "ok")) {
    console.log(`skip ${key} (already ran, pass --force to redo)`);
    return;
  }
  if (existing.some(Boolean)) console.log(`redo ${key} (its videos came from an older prompt, a manual thread, or a session that didn't make all of them, or --force)`);

  if (harness.id === "claude-code") {
    try {
      assertClaudeAuth(config.timeoutMinutes + 5);
    } catch (err) {
      fail(`stop ${key}: ${err.message}`);
    }
  }
  const bin = resolveBin(harness.bin);
  const version = harnessVersion(bin);
  const { runDir, workdir, home, prompt } = prepareRun({ groupId, model, source: "runner", harnessVersion: version });
  refreshTemplateAuth(harness.id);
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

  console.log(`session ${key} ended after ${wallSeconds}s (logs in ${runDir})`);
  const results = await finishRun(runDir, { exitCode, signal, timedOut, wallSeconds, usage: readUsage(harness.id, transcriptPath) });
  for (const { key: videoKey, run } of results) {
    const renderNote = run.render ? `, rendered in ${run.render.renderSeconds}s` : "";
    console.log(`done ${videoKey}: ${run.status}${renderNote}${run.failure ? ` (${run.failure})` : ""}`);
  }
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

// The real login may have moved on since setup-homes or the last run (a fresh login, a refresh by the CLI itself),
// so each run starts from its current credentials. That also keeps syncAuthBack's "real login untouched" test true.
function refreshTemplateAuth(harnessId) {
  for (const rel of authFiles[harnessId] ?? []) {
    const real = path.join(os.homedir(), rel);
    const template = path.join(templatesDir, harnessId, rel);
    if (!fs.existsSync(real)) continue;
    fs.mkdirSync(path.dirname(template), { recursive: true });
    fs.copyFileSync(real, template);
  }
}

function syncAuthBack(harnessId, home) {
  for (const rel of authFiles[harnessId] ?? []) {
    const runCopy = path.join(home, rel);
    const real = path.join(os.homedir(), rel);
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
