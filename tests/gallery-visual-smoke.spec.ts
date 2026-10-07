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

// Integration regressions: CSS modules must stay styled and the preserved theme
// control must not inherit the gallery's unrelated .design-switcher positioning.
test("Haiku CSS-module design retains its typography", async ({ page }) => {
  await page.goto("/preview/with-design-skill/haiku-5-5/1");
  await expect(page.locator("h1")).toHaveCSS("font-family", /Newsreader/);
  expect(await page.locator("h1").evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThan(48);
});
test("Sol taste appearance control stays compact and toggles theme", async ({ page }) => {
  await page.goto("/preview/with-taste-skill/sol-6-1/1");
  const control = page.getByRole("navigation", { name: "Appearance" });
  expect((await control.boundingBox())!.height).toBeLessThan(80);
  const landing = page.locator(".landing");
  const before = await landing.getAttribute("data-theme");
  await control.getByRole("button").click();
  await expect(landing).not.toHaveAttribute("data-theme", before!);
});
