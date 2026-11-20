import { test, expect } from "@playwright/test";

// Visitors read the Motion grid as "newest first"; the date on each card is what tells them so.
test("Motion cards run newest first by the date shown on each card", async ({ page }) => {
  await page.goto("/motion");
  const dates = await page.locator("article time[datetime]").evaluateAll((els) =>
    els.map((el) => el.getAttribute("datetime") ?? ""),
  );
  expect(dates.length).toBeGreaterThan(1);
  expect(dates).toEqual(dates.toSorted().reverse());
  expect(new Set(dates).size).toBeGreaterThan(1);
});
