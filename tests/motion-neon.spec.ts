import { test, expect } from "@playwright/test";

for (const iteration of [1, 2, 3]) {
  test(`Neon motion video ${iteration} has a player and navigation`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`/motion/baseline/gemini-4-neon/${iteration}`);
    expect(response?.status()).toBe(200);
    const video = page.getByLabel(`Gemini 4 Neon, video ${iteration}`, { exact: true });
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute("src", new RegExp(`/baseline/gemini-4-neon/${iteration}\\.mp4`));
    await expect(page.getByRole("button", { name: `Compare Gemini 4 Neon video ${iteration}`, exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

// The Antigravity session ran headless and isolated, so its card names the harness and the day, with no "manual session" note.
test("Google motion search includes Neon from Antigravity with one session cost", async ({ page }) => {
  await page.goto("/motion?q=google");
  const card = page.locator("article").filter({ has: page.getByRole("heading", { name: "Gemini 4 Neon", exact: true }) });
  await expect(card).toHaveCount(1);
  await expect(card.locator("p", { hasText: "Antigravity" })).toHaveText("Antigravity · made Nov 19");
  await expect(card.getByText("Session cost: $3.23")).toBeVisible();
  await expect(card.locator('[title*="API-equivalent"]')).toBeVisible();
  for (const iteration of [1, 2, 3]) {
    await card.getByRole("button", { name: `Video ${iteration}`, exact: true }).click();
    await expect(card.getByRole("link", { name: `Gemini 4 Neon, video ${iteration}`, exact: true })).toBeVisible();
  }
});
