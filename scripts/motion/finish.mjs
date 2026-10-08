// Turns a finished run folder into a published video: checks the page against the contract, renders it with
// framekit, writes the MP4 and poster to public/motion, and records the run in src/lib/motion-runs.json.
// The headless runner calls this after every session. For a run made by hand in an agent thread, call it directly:
//
//   node scripts/motion/finish.mjs <run-dir> [--wall-seconds <n>] [--cost <usd>]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { root, runsFile } from "./harness.mjs";
import { checkProject, ffmpegBin, renderVideo } from "./framekit/kit.mjs";

// Every run folder holds run.json (what was asked and how the session went) next to project/.
export function readRunMeta(runDir) {
  return JSON.parse(fs.readFileSync(path.join(runDir, "run.json"), "utf8"));
}

export function writeRunMeta(runDir, meta) {
  fs.writeFileSync(path.join(runDir, "run.json"), JSON.stringify(meta, null, 2) + "\n");
}

export async function finishRun(runDir, session = {}) {
  const meta = readRunMeta(runDir);
  const workdir = path.join(runDir, "project");
  const key = `${meta.group}/${meta.model}/${meta.iteration}`;
  const { exitCode = null, signal = null, timedOut = false } = session;

  let failure = null;
  let check = null;
  let rendered = null;
  if (timedOut) failure = "The session hit the time limit.";
  else if (signal) failure = `The harness was killed by ${signal}.`;
  else if (exitCode !== 0) failure = `The harness exited with code ${exitCode}.`;
  else {
    try {
      check = await checkProject(workdir);
      if (!check.ok) failure = `The page failed the contract check: ${check.errors.join(" ")}`;
    } catch (err) {
      failure = `The contract check crashed: ${err.message}`;
    }
  }

  if (!failure) {
    // Render into the run folder and publish only on success, so a failed rerun leaves the old video alone.
    const out = path.join(runDir, "final.mp4");
    const poster = path.join(runDir, "final.jpg");
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
        publish(out, poster, path.join(root, "public/motion", meta.group, meta.model), meta.iteration);
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
          sizeBytes: rendered.sizeBytes,
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

  // The run folder always keeps the full record. The registry keeps a published video over a failed retry.
  writeRunMeta(runDir, { ...meta, result: run });
  const published = readRuns()[key];
  if (run.status === "ok" || published?.status !== "ok") writeRun(key, run);
  else console.log(`keep ${key}: the earlier published video stays; this attempt is recorded in ${runDir}`);
  return { key, run };
}

// Copies both files next to their destinations first, then renames them into place, so a failure partway
// never leaves a new video paired with an old poster or replaces a published video with a failed attempt.
function publish(video, poster, dir, iteration) {
  fs.mkdirSync(dir, { recursive: true });
  const pairs = [
    [video, path.join(dir, `${iteration}.mp4`)],
    [poster, path.join(dir, `${iteration}.jpg`)],
  ];
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
function writeRun(key, run) {
  const runs = readRuns();
  runs[key] = run;
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
  const { key, run } = await finishRun(runDir, { exitCode: 0, wallSeconds, usage: cost === null ? null : { costUsd: cost } });
  console.log(`${run.status === "ok" ? "done" : "FAIL"} ${key}: ${run.status}${run.failure ? ` (${run.failure})` : ""}`);
  if (run.status !== "ok") process.exitCode = 1;
}
