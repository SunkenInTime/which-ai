// Runs the shared motion prompt through one or more (model, iteration) pairs and collects the rendered video.
//
//   node scripts/motion/run.mjs <model-id|all> [iteration|all] [--group baseline] [--force]
//
// Each run gets a fresh workdir and a fresh HOME that holds only the harness's credentials,
// so the harness starts from its stock configuration: no skills, plugins, MCP servers, or user instructions.
// Raw transcripts and the agent's source files stay in ~/.motionbench/work; the repo gets the video,
// a poster, and one entry in src/lib/motion-runs.json.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawn, execFileSync } from "node:child_process";
import {
  authFiles,
  config,
  harnessCommand,
  harnessVersion,
  isolatedEnv,
  resolveBin,
  root,
  runsFile,
  templatesDir,
  workRoot,
} from "./harness.mjs";

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

const promptFile = path.join(root, "docs/benchmarks/motion", `${groupId}.prompt.txt`);
const prompt = fs.readFileSync(promptFile, "utf8").trim();
if (prompt.includes("PLACEHOLDER")) fail(`${path.relative(root, promptFile)} still holds the placeholder.`);
const promptSha256 = crypto.createHash("sha256").update(prompt).digest("hex");

for (const model of models) {
  for (const iteration of iterations) {
    await runOne(model, iteration);
  }
}

async function runOne(model, iteration) {
  const harness = config.harnesses.find((h) => h.id === model.harness);
  if (!harness) fail(`Model ${model.id} points at unknown harness ${model.harness}`);
  const key = `${groupId}/${model.id}/${iteration}`;
  if (readRuns()[key] && !force) {
    console.log(`skip ${key} (already ran, pass --force to redo)`);
    return;
  }

  const runDir = path.join(workRoot, groupId, model.id, `${iteration}-${Date.now()}`);
  const workdir = path.join(runDir, "project");
  const home = path.join(runDir, "home");
  fs.mkdirSync(workdir, { recursive: true });
  fs.cpSync(path.join(templatesDir, harness.id), home, { recursive: true });

  const bin = resolveBin(harness.bin);
  const version = harnessVersion(bin);
  const startedAt = new Date();
  console.log(`run  ${key} with ${harness.label} ${version} in ${workdir}`);

  const transcriptPath = path.join(runDir, "transcript.jsonl");
  const transcript = fs.openSync(transcriptPath, "w");
  const stderr = fs.openSync(path.join(runDir, "stderr.log"), "w");
  const child = spawn(bin, harnessCommand(harness, model, prompt, workdir), {
    cwd: workdir,
    env: isolatedEnv(home),
    stdio: ["ignore", transcript, stderr],
  });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    child.kill("SIGTERM");
    setTimeout(() => child.kill("SIGKILL"), 10_000).unref();
  }, config.timeoutMinutes * 60_000);
  const exitCode = await new Promise((resolve) => child.on("close", resolve));
  clearTimeout(timer);
  fs.closeSync(transcript);
  fs.closeSync(stderr);
  const finishedAt = new Date();

  syncAuthBack(harness.id, home);

  const sourceVideo = findVideo(workdir);
  let video = null;
  if (sourceVideo) {
    const videoDir = path.join(root, "public/motion", groupId, model.id);
    fs.mkdirSync(videoDir, { recursive: true });
    video = publishVideo(sourceVideo, path.join(videoDir, `${iteration}.mp4`), path.join(videoDir, `${iteration}.jpg`));
    video.sourceFile = path.relative(workdir, sourceVideo);
  }

  const run = {
    harnessVersion: version,
    modelArg: model.modelArg,
    effort: model.effort ?? config.effort,
    promptSha256,
    startedAt: startedAt.toISOString(),
    wallSeconds: Math.round((finishedAt.getTime() - startedAt.getTime()) / 1000),
    exitCode,
    timedOut,
    status: video ? "ok" : exitCode === 0 ? "no-video" : "failed",
    video,
    usage: readUsage(harness.id, transcriptPath),
  };
  writeRun(key, run);
  console.log(`done ${key}: ${run.status} in ${run.wallSeconds}s (logs in ${runDir})`);
}

function readRuns() {
  return JSON.parse(fs.readFileSync(runsFile, "utf8"));
}

// Re-read before writing so parallel runner processes don't drop each other's entries.
function writeRun(key, run) {
  const runs = readRuns();
  runs[key] = run;
  const sorted = Object.fromEntries(Object.entries(runs).sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true })));
  fs.writeFileSync(runsFile, JSON.stringify(sorted, null, 2) + "\n");
}

// Prefer output.mp4 at the project root; otherwise the newest video anywhere outside node_modules.
function findVideo(dir) {
  const preferred = path.join(dir, "output.mp4");
  if (fs.existsSync(preferred)) return preferred;
  const found = [];
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(mp4|mov|webm|mkv)$/i.test(entry.name)) found.push(p);
    }
  };
  walk(dir);
  found.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return found[0] ?? null;
}

// Normalize to H.264 MP4 with faststart so every browser can play it, and grab a poster frame.
function publishVideo(src, dest, poster) {
  const probe = JSON.parse(
    execFileSync("ffprobe", ["-v", "error", "-print_format", "json", "-show_streams", "-show_format", src], { encoding: "utf8" }),
  );
  const stream = probe.streams.find((s) => s.codec_type === "video");
  const durationSec = Number(probe.format.duration);
  const [num, den] = String(stream?.r_frame_rate ?? "0/1").split("/").map(Number);
  const webReady = stream?.codec_name === "h264" && stream?.pix_fmt === "yuv420p" && /\.mp4$/i.test(src);
  const codecArgs = webReady
    ? ["-c", "copy"]
    : ["-c:v", "libx264", "-crf", "18", "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac"];
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", src, ...codecArgs, "-movflags", "+faststart", dest]);
  execFileSync("ffmpeg", ["-y", "-v", "error", "-ss", String(Math.min(1, durationSec / 4)), "-i", dest, "-frames:v", "1", "-q:v", "3", poster]);
  return {
    durationSec: Math.round(durationSec * 100) / 100,
    width: stream?.width ?? null,
    height: stream?.height ?? null,
    fps: den ? Math.round((num / den) * 100) / 100 : null,
    originalCodec: stream?.codec_name ?? null,
    transcoded: !webReady,
    sizeBytes: fs.statSync(dest).size,
  };
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
    const real = path.join(process.env.HOME ?? "", rel);
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
