// shoot.mjs <outDir> <name=url> ...  Viewport (1440x900) and full-page captures of each URL, with reduced motion,
// plus a JSON record of page height, console errors, failed requests and horizontal overflow at 1440 and 390.
// Run from the which-ai checkout so it uses that repo's Playwright.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const [outDir, ...targets] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const report = {};
for (const t of targets) {
  const [name, url] = t.split("=");
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    const errors = [];
    const failed = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("requestfailed", (r) => failed.push(`${r.failure()?.errorText} ${r.url()}`));
    page.on("response", (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url()}`));
    await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    // Walk down the page so scroll-triggered reveals fire, then come back up.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    await page.screenshot({ path: path.join(outDir, `${name}-${w}.png`) });
    await page.screenshot({ path: path.join(outDir, `${name}-${w}-full.png`), fullPage: true });
    const m = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      overflowX: document.documentElement.scrollWidth - window.innerWidth,
      h1: (() => {
        const e = document.querySelector("h1");
        if (!e) return null;
        const s = getComputedStyle(e);
        return { text: e.innerText.slice(0, 120), font: s.fontFamily.split(",")[0], size: s.fontSize, weight: s.fontWeight, width: Math.round(e.getBoundingClientRect().width) };
      })(),
    }));
    report[`${name}@${w}`] = { ...m, errors, failed };
    await ctx.close();
  }
}
await browser.close();
fs.writeFileSync(path.join(outDir, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 1));
