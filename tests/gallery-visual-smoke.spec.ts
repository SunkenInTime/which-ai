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
