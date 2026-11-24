// clickthrough.mjs <origBase> <galleryBase> <name> : for /1-/5, clicks every visible button (outside the model's own
// design switcher) in turn on both sides with reduced motion and a fixed Math.random, and compares the page text after
// each click. Prints steps where the text differs and any page errors. Run from the which-ai checkout.
import { chromium } from "playwright";
const [orig, gal, name] = process.argv.slice(2);
const browser = await chromium.launch();
const init = () => { let s = 42; Math.random = () => ((s = (s * 16807) % 2147483647) / 2147483647); };
async function open(url, root) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await ctx.addInitScript(init);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: "networkidle" });
  return { page, errors, ctx, root };
}
// Text of the design itself: the gallery wraps it in [data-source-body]; the original is the body minus the
// model's switcher (the last fixed-position element holding links or buttons 1-5).
const textOf = (p, root) => p.evaluate((root) => {
  // Live innerText (a detached clone would include script text); the marked switcher is hidden while reading.
  const sw = [...document.querySelectorAll("[data-bench-switcher]")];
  for (const n of sw) n.style.setProperty("display", "none", "important");
  const t = document.querySelector(root).innerText.replace(/\s+/g, " ").trim();
  for (const n of sw) n.style.removeProperty("display");
  return t;
}, root);
const markSwitcher = (p) => p.evaluate(() => {
  for (const el of document.querySelectorAll("body *")) {
    const s = getComputedStyle(el);
    const t = (el.innerText || "").trim();
    if (s.position === "fixed" && t.length < 80 && (/\b[1-5]\s*\/\s*5\b/.test(t) || (/\b1\b/.test(t) && /\b5\b/.test(t))) && el.querySelector("a,button") && !el.closest("[data-bench-switcher]")) el.setAttribute("data-bench-switcher", "");
  }
});
let total = 0, mismatched = 0;
for (const i of [1, 2, 3, 4, 5]) {
  const a = await open(`${orig}/${i}`, "body");
  const b = await open(`${gal}/${i}`, "[data-source-body]");
  await markSwitcher(a.page); await markSwitcher(b.page);
  const sel = "button:visible:not([data-bench-switcher] *), [role=tab]:visible:not([data-bench-switcher] *), [role=radio]:visible:not([data-bench-switcher] *), summary:visible";
  const n = Math.min(await a.page.locator(sel).count(), await b.page.locator(sel).count());
  const na = await a.page.locator(sel).count(), nb = await b.page.locator(sel).count();
  if (na !== nb) console.log(`${name} /${i}: button count differs ${na} vs ${nb}`);
  let t0a = await textOf(a.page, "body"), t0b = await textOf(b.page, "[data-source-body]");
  if (t0a !== t0b) { mismatched++; console.log(`${name} /${i} initial text differs`); }
  for (let k = 0; k < n; k++) {
    const la = a.page.locator(sel).nth(k), lb = b.page.locator(sel).nth(k);
    const label = ((await la.innerText({ timeout: 2000 }).catch(() => "")) || (await la.getAttribute("aria-label", { timeout: 2000 }).catch(() => "")) || "").slice(0, 40);
    try {
      await la.click({ timeout: 3000 }); await lb.click({ timeout: 3000 });
    } catch { continue; }
    await a.page.waitForTimeout(250); await b.page.waitForTimeout(250);
    total++;
    // Leave any dialog or menu the click opened.
    const ta = await textOf(a.page, "body"), tb = await textOf(b.page, "[data-source-body]");
    if (ta !== tb) { mismatched++; console.log(`${name} /${i} after "${label}": text differs (${ta.length} vs ${tb.length} chars)`); }
    await a.page.keyboard.press("Escape"); await b.page.keyboard.press("Escape");
    if (!a.page.url().startsWith(`${orig}/${i}`)) await a.page.goto(`${orig}/${i}`);
    if (!b.page.url().startsWith(`${gal}/${i}`)) await b.page.goto(`${gal}/${i}`);
  }
  if (a.errors.length || b.errors.length) console.log(`${name} /${i} errors orig=${a.errors.length} gallery=${b.errors.length}`, b.errors.slice(0, 2));
  await a.ctx.close(); await b.ctx.close();
}
console.log(`${name}: ${total} clicks, ${mismatched} text mismatches`);
await browser.close();
