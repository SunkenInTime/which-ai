// Runs the shared motion prompt through one or more (model, iteration) pairs and collects the rendered video.
//
//   node scripts/motion/run.mjs <model-id|all> [iteration|all] [--group baseline] [--force]
//
// Each run gets a fresh workdir and a fresh HOME that holds only the harness's credentials,
// so the harness starts from its stock configuration: no skills, plugins, MCP servers, or user instructions.
// Raw transcripts and the agent's source files stay under the work root (MOTION_WORK_ROOT); the repo gets
// the video, a poster, and one entry in src/lib/motion-runs.json.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawn, execFileSync } from "node:child_process";
import {
  assertCleanAncestors,
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
fs.mkdirSync(workRoot, { recursive: true });
assertCleanAncestors(workRoot);

acquireRunnerLock();

// The agent runs in its own process group, so the runner must take it down when the runner itself stops.
let active = null; // { killGroup }
let stopping = false;
for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(signal, () => {
    stopping = true;
    // Bind to the run that was live when the signal came, not whatever `active` points at later.
    const current = active;
    if (current) {
      current.killGroup("SIGTERM");
      setTimeout(() => current.killGroup("SIGKILL"), 2_000).unref();
    }
    console.error(`runner stopped by ${signal}`);
    setTimeout(() => process.exit(130), 2_500);
  });
}

// Once the runner is told to stop, start nothing new.
batch: for (const model of models) {
  for (const iteration of iterations) {
    if (stopping) break batch;
    await runOne(model, iteration);
  }
}

async function runOne(model, iteration) {
  const harness = config.harnesses.find((h) => h.id === model.harness);
  if (!harness) fail(`Model ${model.id} points at unknown harness ${model.harness}`);
  const key = `${groupId}/${model.id}/${iteration}`;
  if (readRuns()[key]?.status === "ok" && !force) {
    console.log(`skip ${key} (already has a video, pass --force to redo)`);
    return;
  }
  if (stopping) return;
  await execute(model, harness, iteration, key);
}

async function execute(model, harness, iteration, key) {
  const runDir = path.join(workRoot, groupId, model.id, `${iteration}-${Date.now()}`);
  const workdir = path.join(runDir, "project");
  const home = path.join(runDir, "home");
  fs.mkdirSync(workdir, { recursive: true });
  // Earlier agents run with approvals off and could have written config into the shared model folders.
  assertCleanAncestors(workdir);
  fs.cpSync(path.join(templatesDir, harness.id), home, { recursive: true });
  const authAtStart = snapshotAuth(harness.id, home);

  const bin = resolveBin(harness.bin);
  const version = harnessVersion(bin);
  if (stopping) return;
  const startedAt = new Date();
  console.log(`run  ${key} with ${harness.label} ${version} in ${workdir}`);

  const transcriptPath = path.join(runDir, "transcript.jsonl");
  const transcript = fs.openSync(transcriptPath, "w");
  const stderr = fs.openSync(path.join(runDir, "stderr.log"), "w");
  const child = spawn(bin, harnessCommand(harness, model, prompt, workdir), {
    cwd: workdir,
    env: isolatedEnv(home, harness.id),
    stdio: ["ignore", transcript, stderr],
    // Own process group, so a timeout also stops the renders and browsers the agent started.
    detached: true,
  });
  const killGroup = (signal) => {
    try {
      process.kill(-child.pid, signal);
    } catch {
      // Already gone.
    }
  };
  active = { killGroup };
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    killGroup("SIGTERM");
    setTimeout(() => killGroup("SIGKILL"), 10_000).unref();
  }, config.timeoutMinutes * 60_000);
  const exitCode = await new Promise((resolve) => child.on("close", resolve));
  clearTimeout(timer);
  killGroup("SIGKILL"); // Nothing the agent left running may keep writing into the workdir.
  active = null;
  fs.closeSync(transcript);
  fs.closeSync(stderr);
  const finishedAt = new Date();
  // A run cut short by stopping the runner isn't a result; leave no record so it runs again next time.
  if (stopping) return;

  syncAuthBack(harness.id, home, authAtStart);

  const sourceVideo = findVideo(workdir);
  let video = null;
  if (sourceVideo) {
    const videoDir = path.join(root, "public/motion", groupId, model.id);
    fs.mkdirSync(videoDir, { recursive: true });
    try {
      video = publishVideo(sourceVideo, path.join(videoDir, `${iteration}.mp4`), path.join(videoDir, `${iteration}.jpg`));
      video.sourceFile = path.relative(workdir, sourceVideo);
    } catch (err) {
      // A broken render still gets recorded, and the remaining runs keep going.
      console.error(`publish failed for ${key}: ${err.message}`);
    }
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
  try {
    writeRun(key, run);
  } catch (err) {
    // Keep the result recoverable rather than losing a long run to a metadata write.
    fs.writeFileSync(path.join(runDir, "run.json"), JSON.stringify({ key, run }, null, 2) + "\n");
    console.error(`could not record ${key} (${err.message}); saved to ${path.join(runDir, "run.json")}`);
    return;
  }
  console.log(`done ${key}: ${run.status} in ${run.wallSeconds}s (logs in ${runDir})`);
}

function readRuns() {
  return JSON.parse(fs.readFileSync(runsFile, "utf8"));
}

// One runner at a time: runs are heavy enough that parallel agents make a laptop unusable, and a single
// writer keeps motion-runs.json, the published videos, and credential sync free of races. A lock left by a
// killed runner is never taken over automatically; the message says how to clear it.
function acquireRunnerLock() {
  const lock = path.join(workRoot, ".runner.lock");
  try {
    fs.writeFileSync(lock, String(process.pid), { flag: "wx" });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
    const owner = fs.readFileSync(lock, "utf8").trim() || "unknown";
    fail(`Another runner holds ${lock} (pid ${owner}). If no runner is running, delete that file.`);
  }
  process.on("exit", () => {
    try {
      if (fs.readFileSync(lock, "utf8").trim() === String(process.pid)) fs.rmSync(lock);
    } catch {
      // Already gone.
    }
  });
}

// Replace motion-runs.json by rename, so the dev server or an editor never reads half a file.
function writeRun(key, run) {
  const runs = readRuns();
  runs[key] = run;
  const sorted = Object.fromEntries(Object.entries(runs).sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true })));
  const tmp = `${runsFile}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(sorted, null, 2) + "\n");
  fs.renameSync(tmp, runsFile);
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
// Both are written to temp files first, so a failed --force redo leaves the previous video intact.
function publishVideo(src, dest, poster) {
  const probe = JSON.parse(
    execFileSync("ffprobe", ["-v", "error", "-print_format", "json", "-show_streams", "-show_format", src], { encoding: "utf8" }),
  );
  const stream = probe.streams.find((s) => s.codec_type === "video");
  const durationSec = Number(probe.format.duration);
  if (!Number.isFinite(durationSec) || durationSec <= 0) throw new Error(`ffprobe found no duration in ${src}`);
  const [num, den] = String(stream?.r_frame_rate ?? "0/1").split("/").map(Number);
  const webReady = stream?.codec_name === "h264" && stream?.pix_fmt === "yuv420p" && /\.mp4$/i.test(src);
  const codecArgs = webReady
    ? ["-c", "copy"]
    : ["-c:v", "libx264", "-crf", "18", "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac"];
  const tmpVideo = `${dest}.${process.pid}.tmp.mp4`;
  const tmpPoster = `${poster}.${process.pid}.tmp.jpg`;
  try {
    execFileSync("ffmpeg", ["-y", "-v", "error", "-i", src, ...codecArgs, "-movflags", "+faststart", tmpVideo]);
    execFileSync("ffmpeg", ["-y", "-v", "error", "-ss", String(Math.min(1, durationSec / 4)), "-i", tmpVideo, "-frames:v", "1", "-q:v", "3", tmpPoster]);
    fs.renameSync(tmpVideo, dest);
    fs.renameSync(tmpPoster, poster);
  } finally {
    fs.rmSync(tmpVideo, { force: true });
    fs.rmSync(tmpPoster, { force: true });
  }
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

/** The credentials each run started from, so the sync-back can tell its own refresh from another run's. */
function snapshotAuth(harnessId, home) {
  return Object.fromEntries(
    (authFiles[harnessId] ?? [])
      .map((rel) => [rel, path.join(home, rel)])
      .filter(([, file]) => fs.existsSync(file))
      .map(([rel, file]) => [rel, fs.readFileSync(file, "utf8")]),
  );
}

// If this run's harness rotated its tokens, carry them back so the real login stays valid. Only write when the
// real file still holds what this run started from; otherwise the user's own session already moved it on.
function syncAuthBack(harnessId, home, atStart) {
  for (const [rel, start] of Object.entries(atStart)) {
    const runCopy = path.join(home, rel);
    const real = path.join(process.env.HOME ?? "", rel);
    const template = path.join(templatesDir, harnessId, rel);
    if (![runCopy, real].every((p) => fs.existsSync(p))) continue;
    const current = fs.readFileSync(runCopy, "utf8");
    if (current === start || fs.readFileSync(real, "utf8") !== start) continue;
    fs.writeFileSync(real, current, { mode: 0o600 });
    fs.writeFileSync(template, current, { mode: 0o600 });
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
