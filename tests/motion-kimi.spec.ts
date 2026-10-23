import { test, expect } from "@playwright/test";

for (const iteration of [1, 2, 3]) {
  test(`Kimi motion video ${iteration} has a player and navigation`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(`/motion/baseline/kimi-k3-1-pro/${iteration}`);
    expect(response?.status()).toBe(200);
    const video = page.getByLabel(`Kimi K3.1 Pro, video ${iteration}`, { exact: true });
    await expect(video).toBeVisible();
    await expect(video).toHaveAttribute("src", new RegExp(`/baseline/kimi-k3-1-pro/${iteration}\\.mp4`));
    await expect(page.getByRole("button", { name: `Compare Kimi K3.1 Pro video ${iteration}`, exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("Moonshot motion search includes Kimi with one session cost", async ({ page }) => {
  await page.goto("/motion?q=moonshot");
  const card = page.locator("article").filter({ has: page.getByRole("heading", { name: "Kimi K3.1 Pro", exact: true }) });
  await expect(card).toHaveCount(1);
  await expect(card.getByText("Session cost: $2.27")).toBeVisible();
  for (const iteration of [1, 2, 3]) {
    await card.getByRole("button", { name: `Video ${iteration}`, exact: true }).click();
    await expect(card.getByRole("link", { name: `Kimi K3.1 Pro, video ${iteration}`, exact: true })).toBeVisible();
  }
});
