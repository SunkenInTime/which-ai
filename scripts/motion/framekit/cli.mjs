// The `motion` command agents use inside their project folder. Each run's project gets a one-line motion.mjs
// that imports this file, so `node motion.mjs <command>` works the same in bash, zsh, PowerShell, and cmd.
//
//   node motion.mjs check              does the page meet the contract? estimates render time
//   node motion.mjs frame 0 7.5 14.9   saves frames/frame-<t>.png at full size
//   node motion.mjs sheet              saves sheet.png, 16 frames across the whole timeline
//   node motion.mjs preview            saves preview.mp4 at half size and 30fps
//   node motion.mjs render             saves output.mp4 exactly as the final render (slow)
import fs from "node:fs";
import path from "node:path";
import { checkProject, renderFrames, renderSheet, renderVideo, spec } from "./kit.mjs";

const args = process.argv.slice(2);
const command = args[0];
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const dir = path.resolve(flag("project") ?? process.cwd());
const gl = flag("gl") ?? spec.gl;
const workers = flag("workers") ? Number(flag("workers")) : undefined;
const json = args.includes("--json");

const usage = `Usage: node motion.mjs <check|frame|sheet|preview|render> [options]

  check                 Check the page meets the contract and estimate the final render time.
  frame <t> [<t> ...]   Save full-size frames at the given times (seconds) to frames/frame-<t>.png.
  sheet                 Save sheet.png: 16 evenly spaced frames tiled 4x4, to see the whole timeline.
  preview               Save preview.mp4 at half size and 30fps.
  render                Save output.mp4 exactly as the final render: ${spec.width}x${spec.height}, ${spec.fps}fps, ${spec.durationSec}s.

Options: --project <dir> (default: current folder), --json, --workers <n>, --gl gpu|swiftshader`;

const progress = (label) => {
  let last = 0;
  return (done, total) => {
    const now = Date.now();
    if (done === total || now - last > 2000) {
      last = now;
      process.stderr.write(`${label} ${done}/${total} frames\n`);
    }
  };
};

try {
  switch (command) {
    case "check": {
      const result = await checkProject(dir, { gl });
      if (json) console.log(JSON.stringify(result, null, 2));
      else {
        console.log(result.ok ? "PASS: the page meets the contract." : "FAIL: the page does not meet the contract.");
        for (const e of result.errors) console.log(`  error: ${e}`);
        for (const w of result.warnings) console.log(`  warning: ${w}`);
        if (result.msPerFrame !== undefined) {
          console.log(`  ready after ${result.readyMs}ms, ~${result.msPerFrame}ms per frame, final render ~${result.estimatedRenderSeconds}s`);
          console.log(`  WebGL: ${result.renderer}`);
        }
      }
      process.exitCode = result.ok ? 0 : 1;
      break;
    }
    case "frame": {
      const valued = new Set(["--project", "--gl", "--workers"]);
      const times = args.slice(1).filter((a, i, all) => !a.startsWith("--") && !valued.has(all[i - 1])).map(Number);
      if (!times.length || times.some((t) => !Number.isFinite(t) || t < 0 || t >= spec.durationSec)) {
        throw new Error(`Give one or more times in seconds, from 0 to under ${spec.durationSec}.`);
      }
      const { frames, issues } = await renderFrames(dir, times, { gl });
      fs.mkdirSync(path.join(dir, "frames"), { recursive: true });
      const written = frames.map(({ t, png }) => {
        const file = path.join(dir, "frames", `frame-${t}.png`);
        fs.writeFileSync(file, png);
        return path.relative(dir, file);
      });
      report({ written, errors: issues.errors });
      break;
    }
    case "sheet": {
      const { out, times, issues } = await renderSheet(dir, { gl });
      report({ written: [path.relative(dir, out)], times, errors: issues.errors }, `frames at t = ${times.join(", ")} (left to right, top to bottom)`);
      break;
    }
    case "preview": {
      const result = await renderVideo(dir, {
        out: path.join(dir, "preview.mp4"),
        fps: 30,
        scale: 0.5,
        quality: "draft",
        workers,
        gl,
        onProgress: progress("preview"),
      });
      report({ written: ["preview.mp4"], renderSeconds: result.renderSeconds, errors: result.pageErrors });
      break;
    }
    case "render": {
      const result = await renderVideo(dir, { workers, gl, onProgress: progress("render") });
      report({ written: [path.relative(dir, result.out)], ...result, errors: result.pageErrors });
      break;
    }
    default:
      console.log(usage);
      process.exitCode = command ? 1 : 0;
  }
} catch (err) {
  const errors = [err.message, ...(err.issues?.errors ?? [])];
  if (json) console.log(JSON.stringify({ ok: false, errors }, null, 2));
  else console.error(errors.map((e) => `error: ${e}`).join("\n"));
  process.exitCode = 1;
}

function report(result, note) {
  if (json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  console.log(`saved ${result.written.join(", ")}`);
  if (note) console.log(note);
  if (result.renderSeconds !== undefined) console.log(`took ${result.renderSeconds}s`);
  for (const e of result.errors ?? []) console.log(`  page error: ${e}`);
}
