import { test, expect } from "@playwright/test";

for (const iteration of [1, 2, 3]) {
  test(`Argon motion video ${iteration} has a player and navigation`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`/motion/baseline/gemini-4-argon/${iteration}`);
    expect(response?.status()).toBe(200);
    const video = page.getByLabel(`Gemini 4 Argon, video ${iteration}`, { exact: true });
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute("src", new RegExp(`/baseline/gemini-4-argon/${iteration}\\.mp4`));
    await expect(page.getByRole("button", { name: `Compare Gemini 4 Argon video ${iteration}`, exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("Google motion search includes Argon with one session cost", async ({ page }) => {
  await page.goto("/motion?q=google");
  const card = page.locator("article").filter({ has: page.getByRole("heading", { name: "Gemini 4 Argon", exact: true }) });
  await expect(card).toHaveCount(1);
  await expect(card.getByText("Session cost: $4.44")).toBeVisible();
  await expect(card.locator('[title*="API-equivalent"]')).toBeVisible();
  for (const iteration of [1, 2, 3]) {
    await card.getByRole("button", { name: `Video ${iteration}`, exact: true }).click();
    await expect(card.getByRole("link", { name: `Gemini 4 Argon, video ${iteration}`, exact: true })).toBeVisible();
  }
});
