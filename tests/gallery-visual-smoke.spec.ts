import { test, expect } from "@playwright/test";

test("variant header hides in preview mode", async ({ page }) => {
  await page.goto("/preview/with-design-skill/gpt-5.4/1");
  await expect(
    page.getByRole("navigation", { name: "GPT-5.4 gallery navigation" }),
  ).toHaveCount(0);
});

test("gallery header renders in normal mode", async ({ page }) => {
  await page.goto("/without-design-skill/composer-2.0/2");
  await expect(
    page.getByRole("navigation", { name: "Composer 2.0 gallery navigation" }),
  ).toBeVisible();
});

test("mobile layout stays navigable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Which AI Made This?" })).toBeVisible();
});

for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"]) {
  test(`Grok 4.7 ${group} preview renders on mobile`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/preview/${group}/grok-4.7/1`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Grok 4.7 gallery navigation" })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    expect(errors).toEqual([]);
  });
}

for (const model of ["sol-6", "opus-5.5", "sonnet-5.5"]) {
  for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"]) {
    for (const iteration of ["1", "2", "3", "4", "5"]) {
      test(`${model} ${group} iteration ${iteration} renders on mobile`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width: 390, height: 844 });
        const response = await page.goto(`/preview/${group}/${model}/${iteration}`);
        expect(response?.ok()).toBe(true);
        await expect(page.locator("h1").first()).toBeVisible();
        await expect(page.locator(".concept-switcher, .iteration-switcher, .switcher")).toHaveCount(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
        expect(errors).toEqual([]);
      });
    }
  }
}

// Sol 6.1 taste-skill v2 rerun: one shared page component, the source design switcher stays out.
for (const iteration of ["1", "2", "3", "4", "5"]) {
  test(`sol-6-1 with-taste-skill v2 iteration ${iteration} renders on mobile`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/preview/with-taste-skill/sol-6-1/${iteration}`);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("main h1").first()).toBeVisible();
    await expect(page.locator(".design-switcher")).toHaveCount(0);
    await expect(page.locator(".landing img").first()).toHaveJSProperty("complete", true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    expect(errors).toEqual([]);
  });
}

// Gemini 4 Argon taste-skill v2 rerun: the source's iteration bar stays out, local archive pictures load.
for (const iteration of ["1", "2", "3", "4", "5"]) {
  test(`gemini-4-argon with-taste-skill v2 iteration ${iteration} renders on mobile`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/preview/with-taste-skill/gemini-4-argon/${iteration}`);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("[data-source-body] h1").first()).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Switch landing page iteration" })).toHaveCount(0);
    const firstImage = page.locator('[data-source-body] img[src^="/variants/with-taste-skill/gemini-4-argon/assets/"]:visible').first();
    await firstImage.scrollIntoViewIfNeeded();
    await expect(firstImage).toHaveJSProperty("complete", true);
    expect(await firstImage.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    expect(errors).toEqual([]);
  });
}

// Sonnet 5.5 taste-skill v2 rerun: the source's corner design switcher stays out, local pictures load.
for (const iteration of ["1", "2", "3", "4", "5"]) {
  test(`sonnet-5.5 with-taste-skill v2 iteration ${iteration} renders on mobile`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/preview/with-taste-skill/sonnet-5.5/${iteration}`);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("[data-source-body] h1").first()).toBeVisible();
    await expect(page.locator("[data-design-switcher]")).toHaveCount(0);
    const firstImage = page.locator('[data-source-body] img[src^="/variants/with-taste-skill/sonnet-5.5/"]:visible').first();
    await firstImage.scrollIntoViewIfNeeded();
    await expect(firstImage).toHaveJSProperty("complete", true);
    expect(await firstImage.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    expect(errors).toEqual([]);
  });
}

// Fable 5.1 taste-skill v2 rerun: the source's corner switcher stays out, local pictures load, and with
// reduced motion (where the gallery shortens every transition) the fitted footer address on /1 still fits.
for (const iteration of ["1", "2", "3", "4", "5"]) {
  test(`fable-5.1 with-taste-skill v2 iteration ${iteration} renders on mobile`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/preview/with-taste-skill/fable-5.1/${iteration}`);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("[data-source-body] h1").first()).toBeVisible();
    await expect(page.locator("[data-source-body] .switcher")).toHaveCount(0);
    const firstImage = page.locator('[data-source-body] img[src^="/variants/with-taste-skill/fable-5.1/"]').first();
    await firstImage.scrollIntoViewIfNeeded();
    await expect(firstImage).toHaveJSProperty("complete", true);
    expect(await firstImage.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    expect(errors).toEqual([]);
  });
}

// Opus 5.5 taste-skill v2 rerun: the source's corner iteration switcher stays out, local pictures load.
for (const iteration of ["1", "2", "3", "4", "5"]) {
  test(`opus-5.5 with-taste-skill v2 iteration ${iteration} renders on mobile`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`/preview/with-taste-skill/opus-5.5/${iteration}`);
    expect(response?.ok()).toBe(true);
    await expect(page.locator("[data-source-body] h1").first()).toBeVisible();
    await expect(page.getByRole("button", { name: /Switch iteration/ })).toHaveCount(0);
    const firstImage = page.locator('[data-source-body] img[src^="/variants/with-taste-skill/opus-5.5/"]:visible').first();
    await firstImage.scrollIntoViewIfNeeded();
    await expect(firstImage).toHaveJSProperty("complete", true);
    expect(await firstImage.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    expect(errors).toEqual([]);
  });
}

for (const model of ["luna-6"]) {
  for (const group of ["with-design-skill", "without-design-skill"]) {
    for (const iteration of ["1", "2", "3", "4", "5"]) {
      test(`${model} ${group} iteration ${iteration} renders on mobile`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize({ width: 390, height: 844 });
        const response = await page.goto(`/preview/${group}/${model}/${iteration}`);
        expect(response?.ok()).toBe(true);
        await expect(page.locator("h1").first()).toBeVisible();
        await expect(page.locator(".concept-switcher, .iteration-switcher, .switcher")).toHaveCount(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
        expect(errors).toEqual([]);
      });
    }
  }
}

// Preserve the benchmark's known mobile overflow in design-skill iterations 3 and 4.
for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"]) {
  for (const iteration of ["1", "2", "3", "4", "5"]) {
    test(`Mistral Large 4 ${group}/${iteration} renders inside the gallery`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.setViewportSize({ width: 390, height: 844 });
      const response = await page.goto(`/preview/${group}/mistral-large-4/${iteration}`);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Mistral Large 4 gallery navigation" })).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  }
}

for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"]) {
  for (const iteration of ["1", "2", "3", "4", "5"]) {
    test(`Sol 6.1 ${group}/${iteration} renders inside the gallery`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.setViewportSize({ width: 390, height: 844 });
      const response = await page.goto(`/preview/${group}/sol-6-1/${iteration}`);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Sol 6.1 gallery navigation" })).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  }
}


for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"]) {
  for (const iteration of ["1", "2", "3", "4", "5"]) {
    test(`Haiku 5.5 ${group}/${iteration} renders inside the gallery`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.setViewportSize({ width: 390, height: 844 });
      const response = await page.goto(`/preview/${group}/haiku-5-5/${iteration}`);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Haiku 5.5 gallery navigation" })).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  }
}

// Integration regression: CSS modules must stay styled.
// (The v1 Sol 6.1 taste appearance-control test left with that source; the v2 rerun is covered above.)
test("Haiku CSS-module design retains its typography", async ({ page }) => {
  await page.goto("/preview/with-design-skill/haiku-5-5/1");
  await expect(page.locator("h1")).toHaveCSS("font-family", /Newsreader/);
  expect(await page.locator("h1").evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThan(48);
});

for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"]) {
  for (const iteration of ["1", "2", "3", "4", "5"]) {
    test(`Gemini 4 Argon ${group}/${iteration} renders inside the gallery`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.setViewportSize({ width: 390, height: 844 });
      const response = await page.goto(`/preview/${group}/gemini-4-argon/${iteration}`);
      expect(response?.ok()).toBe(true);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.getByRole("navigation", { name: "Gemini 4 Argon gallery navigation" })).toHaveCount(0);
      await expect(page.getByRole("navigation", { name: "Design Iteration Switcher" })).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  }
}
