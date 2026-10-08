// Framekit: the renderer every motion run shares.
//
// The agent writes a static web page whose frames are a pure function of time: it sets `window.__ready = true`
// once assets have loaded and exposes `window.renderAt(t)`, which draws the whole frame for t seconds.
// Framekit serves the folder offline, steps through every frame in headless Chromium, and pipes screenshots
// straight into ffmpeg. Size, frame rate, duration, and encoding come from `render` in motion-config.json,
// so every model's video goes through the same pipeline no matter what tools it used to draw.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { spawn, execFileSync } from "node:child_process";
import { chromium } from "playwright-core";

// Each agent session gets its own copy of framekit with the render spec beside it (see sandbox.mjs), so nothing
// it runs points back into the repo. The copy in the repo reads the spec from the config.
const sandboxSpec = path.join(import.meta.dirname, "spec.json");
export const spec = fs.existsSync(sandboxSpec)
  ? JSON.parse(fs.readFileSync(sandboxSpec, "utf8"))
  : JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, "../../../src/lib/motion-config.json"), "utf8")).render;
export const ffmpegBin = process.env.MOTION_FFMPEG || "ffmpeg";
export const audioNames = ["audio.wav", "audio.mp3", "audio.m4a", "audio.ogg", "audio.flac"];

const READY_TIMEOUT_MS = 120_000;
const CRASHED_READY_TIMEOUT_MS = 10_000;
const FRAME_TIMEOUT_MS = 60_000;

// Injected before any page script. Freezes every clock at the frame being captured, so code that reads
// performance.now(), Date, requestAnimationFrame, CSS animations, or Math.random still renders deterministically.
function shim(render) {
  const epoch = Date.UTC(2026, 0, 1);
  let now = 0;
  let seed = 0x9e3779b9;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
  Math.random = random;

  // Date keeps both forms: `new Date()` gives the frozen time (subclasses still work) and `Date()` its string.
  const RealDate = Date;
  const frozenNow = () => epoch + now * 1000;
  function FrozenDate(...args) {
    if (!new.target) return new RealDate(frozenNow()).toString();
    return Reflect.construct(RealDate, args.length ? args : [frozenNow()], new.target);
  }
  FrozenDate.prototype = RealDate.prototype;
  FrozenDate.now = frozenNow;
  FrozenDate.parse = RealDate.parse;
  FrozenDate.UTC = RealDate.UTC;
  window.Date = FrozenDate;
  performance.now = () => now * 1000;

  const realRaf = window.requestAnimationFrame.bind(window);
  let queue = [];
  let nextId = 0;
  let rendering = false;
  let flushScheduled = false;
  window.requestAnimationFrame = (cb) => {
    queue.push({ id: ++nextId, cb });
    // renderAt may await an animation frame; answer it at the frozen time instead of waiting forever.
    if (rendering && !flushScheduled) {
      flushScheduled = true;
      realRaf(() => {
        flushScheduled = false;
        // However many real frames renderAt waits through, its randomness stays the same.
        const saved = seed;
        flush();
        seed = saved;
      });
    }
    return nextId;
  };
  window.cancelAnimationFrame = (id) => {
    queue = queue.filter((entry) => entry.id !== id);
  };
  const flush = () => {
    const due = queue;
    queue = [];
    for (const { cb } of due) cb(now * 1000);
  };
  const paint = () => new Promise((resolve) => realRaf(() => realRaf(resolve)));

  window.__motion = {
    ...render,
    frames: Math.round(render.durationSec * render.fps),
    flush,
    async frame(t) {
      now = t;
      // Reseed from the timestamp on the benchmark's frame grid, so a frame's randomness doesn't depend on
      // which frames ran before it, and a preview at 30fps matches the final render at the same t.
      const tick = Math.round(t * render.fps);
      seed = (Math.imul(tick + 1, 0x85ebca6b) ^ 0xc2b2ae35) | 0;
      // Run pending animation-frame callbacks at time t first, so state driven by a rAF loop is current.
      flush();
      rendering = true;
      try {
        await window.renderAt(t);
      } finally {
        rendering = false;
      }
      flush();
      for (const animation of document.getAnimations()) {
        animation.pause();
        animation.currentTime = t * 1000;
      }
      await document.fonts.ready;
      await paint();
    },
  };
}

// Static file server bound to localhost. ES modules need real HTTP and correct MIME types, not file://.
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".wasm": "application/wasm",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".glsl": "text/plain",
  ".frag": "text/plain",
  ".vert": "text/plain",
  ".hdr": "application/octet-stream",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".bin": "application/octet-stream",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

export function serve(dir) {
  const base = path.resolve(dir);
  const server = http.createServer((req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    } catch {
      res.writeHead(400).end();
      return;
    }
    let file = path.resolve(base, "." + urlPath);
    if (file !== base && !file.startsWith(base + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!fs.existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, {
      "content-type": mime[path.extname(file).toLowerCase()] ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    fs.createReadStream(file)
      .on("error", () => res.destroy())
      .pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, origin: `http://127.0.0.1:${server.address().port}` }));
  });
}

// `gl: "gpu"` lets Chromium use the machine's GPU; `"swiftshader"` forces software WebGL, which is slower but
// identical across machines. Every final render in a batch should use the same setting.
export function launch({ gl = spec.gl } = {}) {
  const args = [
    "--ignore-gpu-blocklist",
    "--enable-gpu-rasterization",
    "--force-color-profile=srgb",
    "--font-render-hinting=none",
    "--disable-lcd-text",
    "--hide-scrollbars",
    "--mute-audio",
    // Second line of defence for offline rendering: anything that isn't localhost goes to a dead proxy.
    "--proxy-server=http://127.0.0.1:9",
    "--proxy-bypass-list=127.0.0.1",
  ];
  if (gl === "swiftshader") args.push("--use-angle=swiftshader", "--enable-unsafe-swiftshader");
  // Full Chromium in new headless mode; the stripped-down headless shell has no GPU WebGL.
  return chromium.launch({ channel: "chromium", args });
}

// Loads the project page with the clock shim, network cut off, and errors collected, then waits for __ready.
// Pages always lay out and draw at full size; smaller previews are scaled down by ffmpeg afterwards.
export async function openProject(browser, origin) {
  // Service workers could fetch past the route below, so they're off.
  const context = await browser.newContext({
    viewport: { width: spec.width, height: spec.height },
    deviceScaleFactor: 1,
    serviceWorkers: "block",
  });
  const issues = { errors: [], blocked: [] };
  // Rendering is offline: anything the page needs has to live in the project folder.
  await context.route("**/*", (route) => {
    const url = route.request().url();
    if (url.startsWith(origin) || url.startsWith("data:") || url.startsWith("blob:")) return route.continue();
    issues.blocked.push(url);
    return route.abort();
  });
  await context.addInitScript(shim, { width: spec.width, height: spec.height, fps: spec.fps, durationSec: spec.durationSec });
  const page = await context.newPage();
  page.on("pageerror", (err) => issues.errors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") issues.errors.push(msg.text());
  });
  const started = Date.now();
  await page.goto(origin + "/", { waitUntil: "load" });
  while (true) {
    const state = await withTimeout(
      page.evaluate(() => {
        window.__motion.flush();
        return { ready: window.__ready === true, hasRender: typeof window.renderAt === "function" };
      }),
      FRAME_TIMEOUT_MS,
      `The page stopped responding while loading (stuck for ${FRAME_TIMEOUT_MS / 1000}s).`,
    ).catch((err) => {
      throw new ContractError(err.message, issues);
    });
    if (state.ready && state.hasRender) break;
    // A script that crashed during load will never become ready, so don't wait out the full timeout.
    const crashed = issues.errors.length > 0 && Date.now() - started > CRASHED_READY_TIMEOUT_MS;
    if (crashed || Date.now() - started > READY_TIMEOUT_MS) {
      const missing = [!state.ready && "window.__ready = true", !state.hasRender && "window.renderAt(t)"].filter(Boolean);
      throw new ContractError(`Page never set ${missing.join(" or ")} (waited ${Math.round((Date.now() - started) / 1000)}s).`, issues);
    }
    await new Promise((r) => setTimeout(r, 50));
  }
  const cdp = await context.newCDPSession(page);
  return { context, page, cdp, issues, readyMs: Date.now() - started };
}

export class ContractError extends Error {
  constructor(message, issues) {
    super(message);
    this.issues = issues;
  }
}

export async function captureFrame({ page, cdp }, t) {
  try {
    await withTimeout(
      page.evaluate((time) => window.__motion.frame(time), t),
      FRAME_TIMEOUT_MS,
      `renderAt(${t}) did not finish within ${FRAME_TIMEOUT_MS / 1000}s`,
    );
  } catch (err) {
    // Playwright wraps page errors with a stack; the first line is the part an agent can act on.
    const message = err.message.split("\n")[0].replace(/^page\.evaluate: /, "");
    throw new Error(`renderAt(${t}) failed: ${message}`);
  }
  const shot = await cdp.send("Page.captureScreenshot", { format: "png", optimizeForSpeed: true });
  return Buffer.from(shot.data, "base64");
}

export async function webglRenderer(page) {
  return page.evaluate(() => {
    const gl = document.createElement("canvas").getContext("webgl2") ?? document.createElement("canvas").getContext("webgl");
    if (!gl) return "no WebGL";
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    return info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
  });
}

export const frameTime = (index, fps = spec.fps) => index / fps;

export function findAudio(dir) {
  const name = audioNames.find((n) => fs.existsSync(path.join(dir, n)));
  return name ? path.join(dir, name) : null;
}

export function defaultWorkers() {
  const byCpu = Math.floor(os.cpus().length / 4);
  const byMemory = Math.floor(os.totalmem() / 2 ** 30 / 6);
  return Math.max(1, Math.min(4, byCpu, byMemory));
}

// Same color handling for every encode: RGB screenshots become BT.709 limited-range YUV, tagged as such,
// so browsers don't guess and shift the colors.
const colorArgs = (outWidth, outHeight) => [
  "-vf",
  `scale=${outWidth}:${outHeight}:flags=lanczos:out_color_matrix=bt709:out_range=tv,format=yuv420p`,
  "-color_primaries",
  "bt709",
  "-color_trc",
  "bt709",
  "-colorspace",
  "bt709",
  "-color_range",
  "tv",
];

// Pipes PNG frames into x264. A failure at any point (ffmpeg missing, crashed, closed early) surfaces on the
// next write or on end(), and kill() stops it if capture fails first.
function encoder(out, { fps, width, height, quality }) {
  const x264 =
    quality === "final"
      ? ["-c:v", "libx264", "-preset", "slow", "-crf", "18", "-maxrate", "30M", "-bufsize", "60M"]
      : ["-c:v", "libx264", "-preset", "veryfast", "-crf", "23"];
  const proc = spawn(
    ffmpegBin,
    [
      "-y",
      "-v",
      "error",
      "-f",
      "image2pipe",
      "-framerate",
      String(fps),
      "-c:v",
      "png",
      "-i",
      "-",
      ...colorArgs(width, height),
      ...x264,
      "-profile:v",
      "high",
      "-g",
      String(fps),
      "-r",
      String(fps),
      out,
    ],
    { stdio: ["pipe", "ignore", "pipe"], windowsHide: true },
  );
  let stderr = "";
  let failure = null;
  proc.stderr.on("data", (d) => (stderr += d));
  proc.stdin.on("error", (err) => (failure ??= err));
  const done = new Promise((resolve, reject) => {
    proc.on("error", (err) => reject((failure = new Error(`Could not start ${ffmpegBin}: ${err.message}`))));
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject((failure ??= new Error(`ffmpeg exited ${code}: ${stderr.trim()}`)));
    });
  });
  done.catch(() => {});
  return {
    async write(buf) {
      if (failure) throw failure;
      if (!proc.stdin.write(buf)) {
        // Wait for ffmpeg to catch up, or for it to die; either way drop both listeners afterwards.
        await new Promise((resolve) => {
          const settle = () => {
            proc.stdin.off("drain", settle);
            proc.off("close", settle);
            resolve();
          };
          proc.stdin.on("drain", settle);
          proc.on("close", settle);
        });
      }
      if (failure) throw failure;
    },
    end() {
      proc.stdin.end();
      return done;
    },
    kill() {
      if (proc.exitCode === null) proc.kill("SIGKILL");
    },
  };
}

// Launches a browser with the project open, closing everything again if loading fails.
async function withProject(dir, gl, fn) {
  const { server, origin } = await serve(dir);
  let browser;
  try {
    browser = await launch({ gl });
    return await fn(browser, origin);
  } finally {
    await browser?.close().catch(() => {});
    server.close();
  }
}

// Renders the project to an MP4. Frames are pure functions of time, so the timeline splits into contiguous
// ranges rendered by separate browsers in parallel, each encoded as its own segment, then joined losslessly.
export async function renderVideo(dir, options = {}) {
  const {
    out = path.join(dir, "output.mp4"),
    fps = spec.fps,
    scale = 1,
    quality = "final",
    workers = defaultWorkers(),
    gl = spec.gl,
    onProgress = () => {},
  } = options;
  const total = Math.round(spec.durationSec * fps);
  const width = Math.round(spec.width * scale);
  const height = Math.round(spec.height * scale);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "framekit-"));
  const { server, origin } = await serve(dir);
  const browsers = [];
  const encoders = [];
  const started = Date.now();
  const pageErrors = [];
  let done = 0;
  let renderer = null;
  let aborted = false;
  let firstError = null;
  try {
    const count = Math.min(workers, total);
    const ranges = Array.from({ length: count }, (_, w) => [Math.floor((w * total) / count), Math.floor(((w + 1) * total) / count)]);
    const results = await Promise.allSettled(
      ranges.map(async ([from, to], w) => {
        const browser = await launch({ gl });
        browsers.push(browser);
        const session = await openProject(browser, origin);
        if (w === 0) renderer = await webglRenderer(session.page);
        const segment = path.join(tmp, `segment-${w}.mp4`);
        const enc = encoder(segment, { fps, width, height, quality });
        encoders.push(enc);
        try {
          for (let i = from; i < to && !aborted; i++) {
            await enc.write(await captureFrame(session, frameTime(i, fps)));
            onProgress(++done, total);
          }
          if (aborted) throw new Error("Stopped because another render worker failed.");
          await enc.end();
        } finally {
          pageErrors.push(...session.issues.errors);
          if (session.issues.blocked.length) pageErrors.push(`Blocked network requests: ${unique(session.issues.blocked).join(", ")}`);
        }
        return segment;
      }).map((p) => p.catch((err) => {
        // The first worker to fail stops the rest; report its error, not theirs.
        firstError ??= err;
        aborted = true;
        throw err;
      })),
    );
    if (firstError) throw firstError;
    const segments = results.map((r) => r.value);
    const list = path.join(tmp, "segments.txt");
    fs.writeFileSync(list, segments.map((s) => `file '${s.replace(/\\/g, "/").replace(/'/g, "'\\''")}'`).join("\n"));
    const audio = findAudio(dir);
    execFileSync(
      ffmpegBin,
      [
        "-y",
        "-v",
        "error",
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        list,
        ...(audio ? ["-i", audio, "-map", "0:v:0", "-map", "1:a:0", "-c:a", "aac", "-b:a", "192k", "-af", "apad"] : []),
        "-c:v",
        "copy",
        "-t",
        String(spec.durationSec),
        "-movflags",
        "+faststart",
        out,
      ],
      { stdio: ["ignore", "ignore", "pipe"], windowsHide: true },
    );
    return {
      out,
      frames: total,
      fps,
      width,
      height,
      durationSec: spec.durationSec,
      audio: Boolean(audio),
      workers: count,
      gl,
      renderer,
      renderSeconds: Math.round((Date.now() - started) / 100) / 10,
      sizeBytes: fs.statSync(out).size,
      pageErrors: unique(pageErrors),
    };
  } finally {
    for (const enc of encoders) enc.kill();
    await Promise.all(browsers.map((b) => b.close().catch(() => {})));
    server.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

// Captures individual frames as PNGs, for the agent to look at its own work.
export async function renderFrames(dir, times, { gl = spec.gl } = {}) {
  return withProject(dir, gl, async (browser, origin) => {
    const session = await openProject(browser, origin);
    const frames = [];
    for (const t of times) frames.push({ t, png: await captureFrame(session, t) });
    return { frames, issues: session.issues };
  });
}

// Tiles evenly spaced frames into one image so the whole timeline can be seen at a glance.
export async function renderSheet(dir, { cols = 4, rows = 4, out = path.join(dir, "sheet.png"), gl = spec.gl } = {}) {
  const count = cols * rows;
  const times = Array.from({ length: count }, (_, i) => round3((i * (spec.durationSec - 1 / spec.fps)) / (count - 1)));
  const { frames, issues } = await renderFrames(dir, times, { gl });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "framekit-sheet-"));
  try {
    frames.forEach((f, i) => fs.writeFileSync(path.join(tmp, `${String(i).padStart(3, "0")}.png`), f.png));
    execFileSync(
      ffmpegBin,
      ["-y", "-v", "error", "-i", path.join(tmp, "%03d.png"), "-vf", `scale=${spec.width / 4}:-1:flags=lanczos,tile=${cols}x${rows}:padding=4:color=white`, "-frames:v", "1", out],
      { stdio: ["ignore", "ignore", "pipe"], windowsHide: true },
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  return { out, times, issues };
}

// How far apart two renders of the same frame are. GPUs don't always round the same way twice: a heavy shader can
// come out a few levels off in scattered pixels between page loads (seen on Windows, where the driver recompiles
// shaders in the background). That's invisible, and no agent can fix it, so frames are compared as 16px-area
// averages. Real nondeterminism is far bigger: a circle drifting 3px between renders moves a 16px area by about
// 46 levels, while GPU rounding stayed at 1. Anything over 6 levels (of 255) fails.
const AREA = 16;
const AREA_TOLERANCE = 6;

function frameDifference(a, b) {
  if (a.equals(b)) return { changed: false };
  const average = (png) =>
    execFileSync(
      ffmpegBin,
      ["-v", "error", "-i", "pipe:0", "-vf", `scale=${Math.ceil(spec.width / AREA)}:${Math.ceil(spec.height / AREA)}:flags=area`, "-f", "rawvideo", "-pix_fmt", "rgb24", "pipe:1"],
      { input: png, maxBuffer: 16 * 1024 * 1024, windowsHide: true },
    );
  const [x, y] = [average(a), average(b)];
  let worst = 0;
  let areas = 0;
  for (let i = 0; i < x.length; i += 3) {
    const d = Math.max(Math.abs(x[i] - y[i]), Math.abs(x[i + 1] - y[i + 1]), Math.abs(x[i + 2] - y[i + 2]));
    if (d > AREA_TOLERANCE) areas++;
    worst = Math.max(worst, d);
  }
  return {
    changed: worst > AREA_TOLERANCE,
    summary: `${areas} of ${x.length / 3} ${AREA}px areas changed, by up to ${worst} of 255 levels`,
  };
}

// Verifies the project meets the contract and estimates how long the final render will take.
// Never throws for problems with the page itself; those come back as errors.
export async function checkProject(dir, { gl = spec.gl } = {}) {
  const errors = [];
  const warnings = [];
  const result = { ok: false, errors, warnings };
  if (!fs.existsSync(path.join(dir, "index.html"))) {
    errors.push("No index.html in the project folder.");
    return result;
  }
  const last = round3(spec.durationSec - 1 / spec.fps);
  const mid = round3(spec.durationSec / 2);
  try {
    await withProject(dir, gl, async (browser, origin) => {
      let session;
      try {
        session = await openProject(browser, origin);
      } catch (err) {
        errors.push(err.message, ...unique(err.issues?.errors ?? []));
        if (err.issues?.blocked.length) errors.push(`Blocked network requests: ${unique(err.issues.blocked).join(", ")}`);
        return;
      }
      result.readyMs = session.readyMs;
      result.renderer = await webglRenderer(session.page);

      const t0 = Date.now();
      const first = await captureFrame(session, 0);
      const middle = await captureFrame(session, mid);
      const end = await captureFrame(session, last);
      const middleAgain = await captureFrame(session, mid);
      result.msPerFrame = Math.round((Date.now() - t0) / 4);
      const frames = Math.round(spec.durationSec * spec.fps);
      result.estimatedRenderSeconds = Math.round((result.msPerFrame * frames) / 1000 / defaultWorkers());

      // Parallel render workers each load the page fresh, so a frame must also match across fresh loads.
      const fresh = await openProject(browser, origin);
      const middleFresh = await captureFrame(fresh, mid);
      session.issues.errors.push(...fresh.issues.errors);
      session.issues.blocked.push(...fresh.issues.blocked);

      const rule = "renderAt(t) must draw the same pixels for the same t: no real clock, no state carried between frames, no unseeded randomness";
      const again = frameDifference(middle, middleAgain);
      const reloaded = frameDifference(middle, middleFresh);
      if (again.changed) errors.push(`Frame at t=${mid}s came out different on a second render (${again.summary}). ${rule}.`);
      else if (reloaded.changed) {
        errors.push(`Frame at t=${mid}s came out different after reloading the page (${reloaded.summary}). ${rule}, including during setup and in workers.`);
      }
      if (first.equals(middle) && middle.equals(end)) warnings.push("The first, middle, and last frames are identical. Nothing seems to move.");
      if (session.issues.errors.length) errors.push(...unique(session.issues.errors).map((e) => `Page error: ${e}`));
      if (session.issues.blocked.length) {
        errors.push(`Blocked network requests (rendering is offline, keep assets in the project): ${unique(session.issues.blocked).join(", ")}`);
      }
    });
  } catch (err) {
    errors.push(err.message, ...unique(err.issues?.errors ?? []));
  }

  const audio = findAudio(dir);
  if (audio) {
    result.audio = path.basename(audio);
    const seconds = probeDuration(audio);
    if (seconds === null) errors.push(`${path.basename(audio)} could not be read by ffmpeg.`);
    else if (Math.abs(seconds - spec.durationSec) > 0.5) {
      warnings.push(`${path.basename(audio)} is ${seconds.toFixed(2)}s; it will be cut or padded with silence to ${spec.durationSec}s.`);
    }
  }
  result.ok = errors.length === 0;
  return result;
}

export function probeDuration(file) {
  try {
    const out = execFileSync(ffmpegBin.replace(/ffmpeg(\.exe)?$/i, "ffprobe$1"), ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], {
      encoding: "utf8",
    });
    const n = Number(out.trim());
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function withTimeout(promise, ms, message) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => (timer = setTimeout(() => reject(new Error(message)), ms)))]).finally(() =>
    clearTimeout(timer),
  );
}

const unique = (list) => [...new Set(list)];
const round3 = (n) => Math.round(n * 1000) / 1000;
