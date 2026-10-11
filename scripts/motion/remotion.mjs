// Renders a session's Remotion project with the project's own Remotion CLI, for groups whose prompt asks for
// Remotion instead of the framekit contract. Every project is rendered the same way, `remotion render Video`,
// whatever the model set up, and the result has to match the render spec (size, frame rate, length).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execFileSync, spawn } from "node:child_process";
import { config, killTree } from "./harness.mjs";
import { ffmpegBin } from "./framekit/kit.mjs";

export const remotionComposition = "Video";
const renderTimeoutMs = 30 * 60_000;

// The CLI the project installed, run with Node directly, so no npx or shell sits in between.
function remotionCli(workdir) {
  const packageJson = path.join(workdir, "package.json");
  if (!fs.existsSync(packageJson)) return null;
  try {
    const cliPackage = createRequire(packageJson).resolve("@remotion/cli/package.json");
    const { bin } = JSON.parse(fs.readFileSync(cliPackage, "utf8"));
    const script = typeof bin === "string" ? bin : bin?.remotion;
    return script ? path.join(path.dirname(cliPackage), script) : null;
  } catch {
    return null;
  }
}

export function hasRemotionProject(workdir) {
  return fs.existsSync(path.join(workdir, "package.json"));
}

export async function renderRemotion(workdir, out, { log }) {
  const cli = remotionCli(workdir);
  if (!cli) throw new Error("The folder has no Remotion CLI (@remotion/cli) installed.");
  const started = Date.now();
  const logFile = fs.openSync(log, "w");
  const code = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [cli, "render", remotionComposition, out, "--overwrite"], {
      cwd: workdir,
      stdio: ["ignore", logFile, logFile],
      // Its own process group off Windows, so killTree can stop Chrome and ffmpeg with it.
      detached: process.platform !== "win32",
      windowsHide: true,
    });
    const timer = setTimeout(() => {
      killTree(child);
      reject(new Error(`Remotion's render took longer than ${renderTimeoutMs / 60_000} minutes.`));
    }, renderTimeoutMs);
    child.on("error", reject);
    child.on("close", (exitCode) => {
      clearTimeout(timer);
      resolve(exitCode);
    });
  });
  fs.closeSync(logFile);
  if (code !== 0 || !fs.existsSync(out)) {
    const tail = fs.readFileSync(log, "utf8").trim().split("\n").slice(-5).join(" ");
    throw new Error(`remotion render exited with code ${code}: ${tail}`);
  }
  const video = probeVideo(out);
  const { width, height, fps, durationSec } = config.render;
  const wrong = [];
  if (video.width !== width || video.height !== height) wrong.push(`${video.width}x${video.height}, not ${width}x${height}`);
  if (Math.abs(video.fps - fps) > 0.01) wrong.push(`${video.fps} fps, not ${fps}`);
  if (Math.abs(video.durationSec - durationSec) > 1 / fps) wrong.push(`${video.durationSec.toFixed(3)} s, not ${durationSec}`);
  if (wrong.length) throw new Error(`The rendered video is ${wrong.join(", ")}.`);
  return { ...video, sizeBytes: fs.statSync(out).size, renderSeconds: Math.round((Date.now() - started) / 100) / 10 };
}

function probeVideo(file) {
  const ffprobe = ffmpegBin.replace(/ffmpeg(\.exe)?$/i, "ffprobe$1");
  const { streams, format } = JSON.parse(
    execFileSync(ffprobe, ["-v", "error", "-show_streams", "-show_format", "-of", "json", file], { encoding: "utf8", windowsHide: true }),
  );
  const v = streams.find((s) => s.codec_type === "video");
  const [num, den] = (v?.r_frame_rate ?? "0/1").split("/").map(Number);
  return {
    width: v?.width ?? null,
    height: v?.height ?? null,
    fps: den ? Math.round((num / den) * 1000) / 1000 : null,
    durationSec: Number(format.duration),
    audio: streams.some((s) => s.codec_type === "audio"),
  };
}
