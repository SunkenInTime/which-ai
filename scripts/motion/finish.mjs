// Turns a finished session into published videos: checks each page against the contract, renders it with
// framekit, writes web encodes and a poster to public/motion, and records each video in src/lib/motion-runs.json.
// The full-quality masters stay in the run folder as <n>/final.mp4.
// The headless runner calls this after every session. For a run made by hand in an agent thread, call it directly:
//
//   node scripts/motion/finish.mjs <run-dir> [--wall-seconds <n>] [--cost <usd>]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { root, runsFile } from "./harness.mjs";
import { checkProject, ffmpegBin, renderVideo } from "./framekit/kit.mjs";
import { collectSandbox } from "./sandbox.mjs";

// Every run folder holds run.json (what was asked and how the session went) next to project/.
export function readRunMeta(runDir) {
  return JSON.parse(fs.readFileSync(path.join(runDir, "run.json"), "utf8"));
}

export function writeRunMeta(runDir, meta) {
  fs.writeFileSync(path.join(runDir, "run.json"), JSON.stringify(meta, null, 2) + "\n");
}

export async function finishRun(runDir, session = {}) {
  const meta = readRunMeta(runDir);
  if (!Number.isInteger(meta.iterations)) {
    throw new Error(`${runDir} is from before one session made all of a model's videos (it has one page, not one per folder). Rerun the model instead.`);
  }
  // The session is over, so its sandbox joins the run record.
  if (meta.sandbox && fs.existsSync(meta.sandbox)) await collectSandbox(meta.sandbox, runDir);
  const { exitCode = null, signal = null, timedOut = false } = session;

  // A session that didn't end on its own may have stopped partway through a page, so none of its videos count.
  let sessionFailure = null;
  if (timedOut) sessionFailure = "The session hit the time limit.";
  else if (signal) sessionFailure = `The harness was killed by ${signal}.`;
  else if (exitCode !== 0) sessionFailure = `The harness exited with code ${exitCode}.`;

  const results = [];
  for (let n = 1; n <= meta.iterations; n++) results.push(await finishVideo(runDir, meta, n, session, sessionFailure));
  writeRunMeta(runDir, { ...meta, results: Object.fromEntries(results.map(({ key, run }) => [key, run])) });

  // A model's published videos always come from one session, so a session replaces all of them or none. It
  // replaces them when it has at least as many good videos as the published set; videos from an older prompt
  // don't count, since the site shows the current prompt.
  const published = readRuns();
  const good = (runs) => runs.filter((run) => run?.status === "ok" && run.promptSha256 === meta.promptSha256).length;
  if (good(results.map((r) => r.run)) < good(results.map((r) => published[r.key]))) {
    console.log(`keep ${meta.group}/${meta.model}: the published session has more good videos; this one is recorded in ${runDir}`);
    return results;
  }
  const dir = path.join(root, "public/motion", meta.group, meta.model);
  // One publish for the whole set: every file is copied in before any replaces the old one, so a failed copy
  // (a full disk) leaves the earlier session's videos untouched.
  publish(results.flatMap(({ run, files }) => (run.status === "ok" ? files : [])), dir);
  // Drop an earlier session's files for a slot this session didn't fill, so public/motion matches the registry.
  for (const { n, run } of results) {
    if (run.status !== "ok") for (const name of [`${n}.mp4`, `${n}.preview.mp4`, `${n}.jpg`]) fs.rmSync(path.join(dir, name), { force: true });
  }
  writeRuns(Object.fromEntries(results.map(({ key, run }) => [key, run])));
  return results;
}

// One video of the session: the page in project/<n>, rendered to <n>/ in the run folder.
async function finishVideo(runDir, meta, n, session, sessionFailure) {
  const workdir = path.join(runDir, "project", String(n));
  const outDir = path.join(runDir, String(n));
  const key = `${meta.group}/${meta.model}/${n}`;
  const { exitCode = null, signal = null, timedOut = false } = session;

  let failure = sessionFailure;
  let check = null;
  let rendered = null;
  let files = null;
  if (!failure) {
    try {
      check = await checkProject(workdir);
      if (!check.ok) failure = `The page failed the contract check: ${check.errors.join(" ")}`;
    } catch (err) {
      failure = `The contract check crashed: ${err.message}`;
    }
  }

  if (!failure) {
    // Render into the run folder; finishRun decides whether the session's videos get published.
    fs.mkdirSync(outDir, { recursive: true });
    const out = path.join(outDir, "final.mp4");
    const poster = path.join(outDir, "final.jpg");
    const web = path.join(outDir, "web.mp4");
    const preview = path.join(outDir, "preview.mp4");
    try {
      console.log(`render ${key}`);
      rendered = await renderVideo(workdir, {
        out,
        onProgress: (done, total) => {
          if (done % 150 === 0 || done === total) console.log(`render ${key}: ${done}/${total} frames`);
        },
      });
      // The check samples a few frames; errors on any other frame still disqualify the render.
      if (rendered.pageErrors.length) failure = `The page threw errors during the render: ${rendered.pageErrors.join(" ")}`;
      else {
        execFileSync(ffmpegBin, ["-y", "-v", "error", "-ss", "1", "-i", out, "-frames:v", "1", "-q:v", "3", poster], { windowsHide: true });
        encodeForWeb(out, web, preview);
        rendered.web = { sizeBytes: fs.statSync(web).size, previewSizeBytes: fs.statSync(preview).size };
        files = [
          [web, `${n}.mp4`],
          [preview, `${n}.preview.mp4`],
          [poster, `${n}.jpg`],
        ];
      }
    } catch (err) {
      failure = `The render failed: ${err.message}`;
    }
  }

  const status = !failure ? "ok" : check && !check.ok && check.errors[0]?.startsWith("No index.html") ? "no-video" : "failed";
  const run = {
    source: meta.source,
    harnessVersion: meta.harnessVersion ?? null,
    modelArg: meta.modelArg,
    effort: meta.effort,
    promptSha256: meta.promptSha256,
    startedAt: meta.startedAt,
    // The session made every video, so its time and cost cover all of them.
    wallSeconds: session.wallSeconds ?? null,
    exitCode,
    ...(signal ? { signal } : {}),
    timedOut,
    status,
    ...(failure ? { failure } : {}),
    video: rendered && !failure
      ? {
          durationSec: rendered.durationSec,
          width: rendered.width,
          height: rendered.height,
          fps: rendered.fps,
          audio: rendered.audio,
          sizeBytes: rendered.web.sizeBytes,
          previewSizeBytes: rendered.web.previewSizeBytes,
          masterSizeBytes: rendered.sizeBytes,
        }
      : null,
    render: rendered && !failure
      ? {
          renderSeconds: rendered.renderSeconds,
          workers: rendered.workers,
          gl: rendered.gl,
          renderer: rendered.renderer,
          warnings: check?.warnings ?? [],
          pageErrors: rendered.pageErrors,
        }
      : null,
    machine: { platform: process.platform, cpu: os.cpus()[0]?.model ?? "unknown", memoryGb: Math.round(os.totalmem() / 2 ** 30) },
    usage: session.usage ?? null,
  };

  return { key, n, run, files };
}

// The master is encoded for archiving (CRF 18, up to 30 Mbps). The site gets a full-size, full-frame-rate
// H.264 encode that every browser plays, plus a small silent clip that cards play on hover. The cap is high on
// purpose: these pieces are often dense particles, and at 10 Mbps they smeared into mush (VMAF ~40 against the
// master in those scenes); 25 Mbps keeps them intact. Both keep the BT.709 tags so browsers show the page's colors.
const colorTags = ["-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv"];

function encodeForWeb(master, web, preview) {
  const run = (args) => execFileSync(ffmpegBin, ["-y", "-v", "error", "-i", master, ...args], { stdio: ["ignore", "ignore", "pipe"], windowsHide: true });
  run([
    "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-maxrate", "25M", "-bufsize", "50M", "-profile:v", "high",
    "-pix_fmt", "yuv420p", "-g", "120", ...colorTags, "-c:a", "copy", "-movflags", "+faststart", web,
  ]);
  run([
    "-vf", "fps=30,scale=640:-2:flags=lanczos", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "26",
    "-profile:v", "high", "-pix_fmt", "yuv420p", "-g", "60", ...colorTags, "-movflags", "+faststart", preview,
  ]);
}

// Copies every file next to its destination first, then renames them into place, so a failure partway never
// leaves a new video paired with an old poster or replaces a published video with a failed attempt.
function publish(files, dir) {
  fs.mkdirSync(dir, { recursive: true });
  const pairs = files.map(([src, name]) => [src, path.join(dir, name)]);
  try {
    for (const [src, dest] of pairs) fs.copyFileSync(src, `${dest}.incoming`);
  } catch (err) {
    for (const [, dest] of pairs) fs.rmSync(`${dest}.incoming`, { force: true });
    throw err;
  }
  for (const [, dest] of pairs) fs.renameSync(`${dest}.incoming`, dest);
}

export function readRuns() {
  return JSON.parse(fs.readFileSync(runsFile, "utf8"));
}

// Re-read before writing so runner processes working on different models don't drop each other's entries.
function writeRuns(entries) {
  const runs = { ...readRuns(), ...entries };
  const sorted = Object.fromEntries(Object.entries(runs).sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true })));
  fs.writeFileSync(runsFile, JSON.stringify(sorted, null, 2) + "\n");
}

if (import.meta.filename === path.resolve(process.argv[1] ?? "")) {
  const args = process.argv.slice(2);
  const flag = (name) => {
    const i = args.indexOf(`--${name}`);
    return i === -1 ? undefined : args[i + 1];
  };
  const runDir = args[0] && !args[0].startsWith("--") ? path.resolve(args[0]) : null;
  if (!runDir || !fs.existsSync(path.join(runDir, "run.json"))) {
    console.error("Usage: node scripts/motion/finish.mjs <run-dir> [--wall-seconds <n>] [--cost <usd>]");
    process.exit(1);
  }
  const wallSeconds = flag("wall-seconds") ? Number(flag("wall-seconds")) : null;
  const cost = flag("cost") ? Number(flag("cost")) : null;
  const results = await finishRun(runDir, { exitCode: 0, wallSeconds, usage: cost === null ? null : { costUsd: cost } });
  for (const { key, run } of results) {
    console.log(`${run.status === "ok" ? "done" : "FAIL"} ${key}: ${run.status}${run.failure ? ` (${run.failure})` : ""}`);
    if (run.status !== "ok") process.exitCode = 1;
  }
}
