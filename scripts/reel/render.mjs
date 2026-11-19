// Renders a side-by-side reel of two gallery pages for social posts.
//
//   node scripts/reel/render.mjs --left without-design-skill/gemini-4-neon/1 --right with-design-skill/gemini-4-neon/4
//
// Each side is a gallery preview page (`/preview/{group}/{model}/{iteration}`) at a 1440px desktop width, scaled to
// fill half of a 1848×1200 frame: the screen ratio of current MacBooks, within Twitter's 1920×1200 landscape limit.
// A slim header names each side with its model logo. Both pages hold at the top, then scroll at the same speed; a
// shorter page reaches its footer first and rests there. Frames are captured at 2x and downscaled by ffmpeg.
// The pages run on a fake clock advanced exactly one video frame per capture, so carousels, marquees and other
// timed animations play at real speed in the video however long each capture takes.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { parseArgs } from "node:util";
import { execFileSync, spawn } from "node:child_process";
import { chromium } from "playwright-core";

const root = path.resolve(import.meta.dirname, "../..");
const { values: opts } = parseArgs({
  options: {
    left: { type: "string" },
    right: { type: "string" },
    "left-label": { type: "string" },
    "right-label": { type: "string" },
    base: { type: "string", default: "https://www.whichai.dev" },
    out: { type: "string", default: "reel.mp4" },
    speed: { type: "string", default: "220" },
    fps: { type: "string", default: "60" },
    stills: { type: "string" },
  },
});
if (!opts.left || !opts.right) {
  console.error("Usage: node scripts/reel/render.mjs --left group/model/iteration --right group/model/iteration [--out reel.mp4]");
  process.exit(1);
}

const WIDTH = 1848, HEIGHT = 1200, HEADER = 52, PAGE_WIDTH = 1440;
const HOLD_TOP = 1.5, HOLD_END = 1.8, RAMP = 0.6, FADE = 0.35;
const SPEED = Number(opts.speed); // page pixels per second, the same for both sides
const FPS = Number(opts.fps);

// Wording for each gallery group in the header.
const GROUP_PHRASE = {
  "without-design-skill": "without skill",
  "with-design-skill": "with frontend-design skill",
  "with-taste-skill": "with taste skill",
};

const manifestSrc = fs.readFileSync(path.join(root, "src/lib/gallery-manifest.ts"), "utf8");
const logoSrc = fs.readFileSync(path.join(root, "src/lib/model-brand-logo.ts"), "utf8");
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function side(spec, labelOverride) {
  const [group, model, iteration] = spec.split("/");
  if (!group || !model || !iteration) throw new Error(`Expected group/model/iteration, got "${spec}"`);
  const entry = manifestSrc.match(
    new RegExp(`group: "${escapeRe(group)}",\\s*groupLabel: "([^"]+)",\\s*model: "${escapeRe(model)}",\\s*modelLabel: "([^"]+)"`),
  );
  if (!entry) throw new Error(`No gallery entry for ${group}/${model} in src/lib/gallery-manifest.ts`);
  // The header is dark, so a model's dark-theme logo wins when it has one.
  const logos = logoSrc.match(new RegExp(`"?${escapeRe(model)}"?: \\{ light: "([^"]+)"(?:, dark: "([^"]+)")?`));
  const logo = logos ? (logos[2] ?? logos[1]) : null;
  return {
    url: `${opts.base.replace(/\/$/, "")}/preview/${group}/${model}/${iteration}`,
    label: labelOverride ?? `${entry[2]} · ${GROUP_PHRASE[group] ?? entry[1].toLowerCase()}`,
    page: `page ${iteration}`,
    logo,
  };
}
const sides = [side(opts.left, opts["left-label"]), side(opts.right, opts["right-label"])];
for (const s of sides) {
  const res = await fetch(s.url);
  if (!res.ok) throw new Error(`${s.url} returned ${res.status}; is the entry deployed at --base?`);
}
fs.mkdirSync(path.dirname(path.resolve(opts.out)), { recursive: true });

const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const stage = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
@font-face{font-family:Geist;src:url(/geist/Geist-Medium.woff2) format("woff2");font-weight:500}
@font-face{font-family:GeistMono;src:url(/geist/GeistMono-Regular.woff2) format("woff2");font-weight:400}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${WIDTH}px;height:${HEIGHT}px;background:#0e0e10;overflow:hidden;font-family:Geist,system-ui,sans-serif;color:#f5f5f5;-webkit-font-smoothing:antialiased}
.row{position:absolute;inset:0;display:flex;gap:4px}
.col{flex:1;display:flex;flex-direction:column;min-width:0}
.label{height:${HEADER}px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 22px}
.label b{display:flex;align-items:center;gap:11px;font-weight:500;font-size:23px;letter-spacing:-.015em}
.label img{width:26px;height:26px;object-fit:contain}
.label span{font-family:GeistMono,monospace;font-size:15px;color:#8a8a8a;letter-spacing:.04em}
.screen{flex:1;position:relative;overflow:hidden;background:#fff}
.screen iframe{position:absolute;left:0;top:0;width:${PAGE_WIDTH}px;border:0;transform-origin:0 0}
#fade{position:absolute;inset:0;background:#0e0e10;opacity:0;pointer-events:none}
</style></head><body>
<div class="row">${sides
  .map(
    (s) => `
  <div class="col">
    <div class="label"><b>${s.logo ? `<img src="/public${s.logo}" alt="">` : ""}${escapeHtml(s.label)}</b><span>${escapeHtml(s.page)}</span></div>
    <div class="screen"><iframe scrolling="no"></iframe></div>
  </div>`,
  )
  .join("")}
</div>
<div id="fade"></div>
<script>
for (const f of document.querySelectorAll("iframe")) {
  const box = f.parentElement.getBoundingClientRect(), s = box.width / ${PAGE_WIDTH};
  f.style.height = Math.ceil(box.height / s) + "px";
  f.style.transform = "scale(" + s + ")";
}
</script>
</body></html>`;

// Serves the stage, the Geist fonts and the repo's public/ folder (for model logos) on localhost.
const types = { ".woff2": "font/woff2", ".webp": "image/webp", ".svg": "image/svg+xml", ".png": "image/png" };
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (url === "/") return res.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(stage);
  const [base, prefix] = url.startsWith("/geist/")
    ? [path.join(root, "node_modules/geist/dist/fonts"), "/geist/"]
    : url.startsWith("/public/")
      ? [path.join(root, "public"), "/public/"]
      : [null, null];
  if (!base) return res.writeHead(404).end();
  const name = url.slice(prefix.length);
  const file = path.resolve(base, prefix === "/geist/" ? (name.startsWith("GeistMono") ? "geist-mono/" : "geist-sans/") + name : name);
  if (!file.startsWith(base + path.sep) || !fs.existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" }).end(fs.readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));

const browser = await chromium.launch({
  channel: "chromium",
  args: ["--hide-scrollbars", "--force-color-profile=srgb", "--font-render-hinting=none", "--disable-lcd-text"],
});
try {
  const ctx = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 2 });
  // Fakes Date, timers and requestAnimationFrame in every frame; CSS animations are stepped separately below.
  // The real requestAnimationFrame is kept first, to wait for each scroll to be painted before a capture.
  await ctx.addInitScript(() => {
    const raf = window.requestAnimationFrame.bind(window);
    window.__painted = () => new Promise((r) => raf(() => raf(r)));
  });
  await ctx.clock.install();
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  const frames = [];
  for (const [i, s] of sides.entries()) {
    const iframe = page.locator("iframe").nth(i);
    await iframe.evaluate((el, src) => (el.src = src), s.url);
    const frame = await (await iframe.elementHandle()).contentFrame();
    if (!frame) throw new Error(`${s.url} did not load in its frame`);
    await frame.waitForURL(s.url, { waitUntil: "load" });
    await frame.waitForLoadState("networkidle");
    await frame.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
    await frame.evaluate(() => document.fonts.ready);
    frames.push(frame);
  }
  // Every step advances the fake clock and every page's CSS animations and transitions by the same amount.
  const step = async (seconds) => {
    await ctx.clock.runFor(Math.round(seconds * 1000));
    await Promise.all(
      frames.map((f) =>
        f.evaluate((ms) => {
          // Scroll-driven animations follow the scroll position on their own; only time-based ones are stepped.
          for (const a of document.getAnimations()) {
            if (!(a.timeline instanceof DocumentTimeline)) continue;
            const t = Number(a.currentTime ?? 0);
            a.pause();
            a.currentTime = (Number.isFinite(t) ? t : 0) + ms;
          }
        }, seconds * 1000),
      ),
    );
  };
  // Let entrance animations settle before the first frame.
  await step(2.5);
  const ranges = await Promise.all(frames.map((f) => f.evaluate(() => document.documentElement.scrollHeight - innerHeight)));

  // Same speed for both: ramp up, cruise at SPEED, ramp down at each page's own end. A page shorter than one
  // ramp's worth of travel gets shorter ramps, so it never overshoots and comes back.
  const ramp = (d) => Math.min(RAMP, d / SPEED);
  const travel = (d) => d / SPEED + ramp(d);
  const scrolled = (t, d) => {
    const r = ramp(d), T = travel(d), a = SPEED / r;
    if (t <= 0 || d <= 0) return 0;
    if (t >= T) return d;
    if (t < r) return 0.5 * a * t * t;
    if (t > T - r) return d - 0.5 * a * (T - t) ** 2;
    return 0.5 * SPEED * r + SPEED * (t - r);
  };
  const duration = HOLD_TOP + Math.max(...ranges.map(travel)) + HOLD_END;
  console.log(`scroll: ${sides.map((s, i) => `${s.label} ${ranges[i]}px in ${travel(ranges[i]).toFixed(1)}s`).join(", ")}; video ${duration.toFixed(1)}s`);

  let now = 0;
  const draw = async (t) => {
    if (t > now) await step(t - now);
    now = t;
    await Promise.all(
      frames.map((f, i) =>
        f.evaluate((y) => {
          window.scrollTo({ top: y, behavior: "instant" });
          return window.__painted();
        }, Math.round(scrolled(t - HOLD_TOP, ranges[i]) * 2) / 2),
      ),
    );
    const fade = Math.max(0, 1 - t / FADE, (t - (duration - FADE)) / FADE);
    await page.evaluate((o) => {
      document.getElementById("fade").style.opacity = o;
      return window.__painted();
    }, fade);
  };

  if (opts.stills) {
    for (const t of opts.stills.split(",").map(Number).sort((a, b) => a - b)) {
      await draw(t);
      const file = opts.out.replace(/\.mp4$/, "") + `-still-${t}.png`;
      await page.screenshot({ path: file });
      console.log(file);
    }
  } else {
    const ff = spawn(
      process.env.MOTION_FFMPEG || "ffmpeg",
      [
        "-y", "-v", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-",
        "-vf", `scale=${WIDTH}:${HEIGHT}:flags=lanczos:out_color_matrix=bt709:out_range=tv,format=yuv420p`,
        "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-color_range", "tv",
        "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-maxrate", "20M", "-bufsize", "40M",
        "-profile:v", "high", "-g", String(FPS * 2), "-r", String(FPS), "-movflags", "+faststart", opts.out,
      ],
      { stdio: ["pipe", "inherit", "inherit"] },
    );
    let failure = null;
    ff.stdin.on("error", (err) => (failure ??= err));
    ff.on("error", (err) => (failure ??= new Error(`Could not start ffmpeg: ${err.message}`)));
    const closed = new Promise((r, j) =>
      ff.on("close", (c) => (c ? j((failure ??= new Error(`ffmpeg exited ${c}`))) : r())),
    );
    closed.catch(() => {});
    const cdp = await ctx.newCDPSession(page);
    const n = Math.round(duration * FPS);
    for (let i = 0; i < n; i++) {
      await draw(i / FPS);
      const shot = await cdp.send("Page.captureScreenshot", { format: "png", optimizeForSpeed: true });
      if (failure) break;
      if (!ff.stdin.write(Buffer.from(shot.data, "base64"))) {
        await new Promise((r) => {
          ff.stdin.once("drain", r);
          ff.once("close", r);
        });
      }
      if (i % 300 === 0) console.log(`frame ${i}/${n}`);
    }
    ff.stdin.end();
    await closed.catch((err) => {
      throw failure ?? err;
    });
    // Nine frames spread across the whole video, skipping the fades, for checking the result at a glance.
    const sheet = opts.out.replace(/\.mp4$/, "") + "-sheet.png";
    execFileSync(process.env.MOTION_FFMPEG || "ffmpeg", [
      "-v", "error", "-y", "-ss", "0.5", "-i", opts.out,
      "-vf", `fps=9/${(duration - 1).toFixed(2)},scale=616:-1,tile=3x3`, "-frames:v", "1", sheet,
    ]);
    console.log(opts.out);
    console.log(sheet);
  }
  if (errors.length) console.warn("page errors:", errors);
} finally {
  await browser.close();
  server.close();
}
