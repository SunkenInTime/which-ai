import { test, expect } from "@playwright/test";
import { galleryManifest } from "@/lib/gallery-manifest";
import { getModelBrandLogoPath } from "@/lib/model-brand-logo";
import { getModelLab, LAB_OPTIONS } from "@/lib/model-labs";

const HOME_GALLERY_GROUPS = [
  "with-design-skill",
  "with-taste-skill",
  "with-ui-sh-skill",
  "without-design-skill",
  "miscellaneous",
] as const;

const LATEST_ROUTE_SMOKE_COUNT = 5;

const forceArchivedModels = [
  { model: "mimo-x-flash-preview", label: "MiMo X Flash" },
  { model: "union-alpha", label: "Union Alpha" },
  { model: "composer-2.5", label: "Composer 2.5" },
  { model: "gemini-3.5-flash", label: "Gemini 3.5 Flash" },
  { model: "luna", label: "GPT-5.6 Luna" },
  { model: "terra", label: "GPT-5.6 Terra" },
  { model: "opus-4.8", label: "Opus 4.8" },
] as const;

const latestRouteSmokeCases = galleryManifest
  .slice(-LATEST_ROUTE_SMOKE_COUNT)
  .map((entry) => ({
    group: entry.group,
    model: entry.model,
    iteration: entry.defaultIteration,
    source: "latest",
  }));

const sampleRouteSmokeCases = [
  { group: "with-design-skill", model: "sol-6", iteration: "1" },
  { group: "with-design-skill", model: "sol-6", iteration: "2" },
  { group: "with-design-skill", model: "sol-6", iteration: "3" },
  { group: "with-design-skill", model: "sol-6", iteration: "4" },
  { group: "with-design-skill", model: "sol-6", iteration: "5" },
  { group: "with-taste-skill", model: "sol-6", iteration: "1" },
  { group: "with-taste-skill", model: "sol-6", iteration: "2" },
  { group: "with-taste-skill", model: "sol-6", iteration: "3" },
  { group: "with-taste-skill", model: "sol-6", iteration: "4" },
  { group: "with-taste-skill", model: "sol-6", iteration: "5" },
  { group: "without-design-skill", model: "sol-6", iteration: "1" },
  { group: "without-design-skill", model: "sol-6", iteration: "2" },
  { group: "without-design-skill", model: "sol-6", iteration: "3" },
  { group: "without-design-skill", model: "sol-6", iteration: "4" },
  { group: "without-design-skill", model: "sol-6", iteration: "5" },
  { group: "with-design-skill", model: "opus-5.5", iteration: "1" },
  { group: "with-design-skill", model: "opus-5.5", iteration: "2" },
  { group: "with-design-skill", model: "opus-5.5", iteration: "3" },
  { group: "with-design-skill", model: "opus-5.5", iteration: "4" },
  { group: "with-design-skill", model: "opus-5.5", iteration: "5" },
  { group: "with-taste-skill", model: "opus-5.5", iteration: "1" },
  { group: "with-taste-skill", model: "opus-5.5", iteration: "2" },
  { group: "with-taste-skill", model: "opus-5.5", iteration: "3" },
  { group: "with-taste-skill", model: "opus-5.5", iteration: "4" },
  { group: "with-taste-skill", model: "opus-5.5", iteration: "5" },
  { group: "without-design-skill", model: "opus-5.5", iteration: "1" },
  { group: "without-design-skill", model: "opus-5.5", iteration: "2" },
  { group: "without-design-skill", model: "opus-5.5", iteration: "3" },
  { group: "without-design-skill", model: "opus-5.5", iteration: "4" },
  { group: "without-design-skill", model: "opus-5.5", iteration: "5" },
  { group: "without-design-skill", model: "grok-4.7", iteration: "1" },
  { group: "without-design-skill", model: "grok-4.7", iteration: "2" },
  { group: "without-design-skill", model: "grok-4.7", iteration: "3" },
  { group: "without-design-skill", model: "grok-4.7", iteration: "4" },
  { group: "without-design-skill", model: "grok-4.7", iteration: "5" },
  { group: "with-taste-skill", model: "grok-4.7", iteration: "1" },
  { group: "with-taste-skill", model: "grok-4.7", iteration: "2" },
  { group: "with-taste-skill", model: "grok-4.7", iteration: "3" },
  { group: "with-taste-skill", model: "grok-4.7", iteration: "4" },
  { group: "with-taste-skill", model: "grok-4.7", iteration: "5" },
  { group: "with-design-skill", model: "grok-4.7", iteration: "1" },
  { group: "with-design-skill", model: "grok-4.7", iteration: "2" },
  { group: "with-design-skill", model: "grok-4.7", iteration: "3" },
  { group: "with-design-skill", model: "grok-4.7", iteration: "4" },
  { group: "with-design-skill", model: "grok-4.7", iteration: "5" },
  { group: "with-taste-skill", model: "mimo-x-flash-preview", iteration: "1" },
  { group: "with-taste-skill", model: "mimo-x-flash-preview", iteration: "2" },
  { group: "with-taste-skill", model: "mimo-x-flash-preview", iteration: "3" },
  { group: "with-taste-skill", model: "mimo-x-flash-preview", iteration: "4" },
  { group: "with-taste-skill", model: "mimo-x-flash-preview", iteration: "5" },
  { group: "with-design-skill", model: "mimo-x-flash-preview", iteration: "1" },
  { group: "with-design-skill", model: "mimo-x-flash-preview", iteration: "2" },
  { group: "with-design-skill", model: "mimo-x-flash-preview", iteration: "3" },
  { group: "with-design-skill", model: "mimo-x-flash-preview", iteration: "4" },
  { group: "with-design-skill", model: "mimo-x-flash-preview", iteration: "5" },
  { group: "without-design-skill", model: "mimo-x-flash-preview", iteration: "1" },
  { group: "without-design-skill", model: "mimo-x-flash-preview", iteration: "2" },
  { group: "without-design-skill", model: "mimo-x-flash-preview", iteration: "3" },
  { group: "without-design-skill", model: "mimo-x-flash-preview", iteration: "4" },
  { group: "without-design-skill", model: "mimo-x-flash-preview", iteration: "5" },
  { group: "with-taste-skill", model: "mimo-x-pro-preview", iteration: "1" },
  { group: "with-taste-skill", model: "mimo-x-pro-preview", iteration: "2" },
  { group: "with-taste-skill", model: "mimo-x-pro-preview", iteration: "3" },
  { group: "with-taste-skill", model: "mimo-x-pro-preview", iteration: "4" },
  { group: "with-taste-skill", model: "mimo-x-pro-preview", iteration: "5" },
  { group: "with-design-skill", model: "mimo-x-pro-preview", iteration: "1" },
  { group: "with-design-skill", model: "mimo-x-pro-preview", iteration: "2" },
  { group: "with-design-skill", model: "mimo-x-pro-preview", iteration: "3" },
  { group: "with-design-skill", model: "mimo-x-pro-preview", iteration: "4" },
  { group: "with-design-skill", model: "mimo-x-pro-preview", iteration: "5" },
  { group: "without-design-skill", model: "mimo-x-pro-preview", iteration: "1" },
  { group: "without-design-skill", model: "mimo-x-pro-preview", iteration: "2" },
  { group: "without-design-skill", model: "mimo-x-pro-preview", iteration: "3" },
  { group: "without-design-skill", model: "mimo-x-pro-preview", iteration: "4" },
  { group: "without-design-skill", model: "mimo-x-pro-preview", iteration: "5" },
  { group: "with-design-skill", model: "gpt-6-astra", iteration: "1" },
  { group: "with-design-skill", model: "gpt-6-astra", iteration: "2" },
  { group: "with-design-skill", model: "gpt-6-astra", iteration: "3" },
  { group: "with-design-skill", model: "gpt-6-astra", iteration: "4" },
  { group: "with-design-skill", model: "gpt-6-astra", iteration: "5" },
  { group: "with-taste-skill", model: "gpt-6-astra", iteration: "1" },
  { group: "with-taste-skill", model: "gpt-6-astra", iteration: "2" },
  { group: "with-taste-skill", model: "gpt-6-astra", iteration: "3" },
  { group: "with-taste-skill", model: "gpt-6-astra", iteration: "4" },
  { group: "with-taste-skill", model: "gpt-6-astra", iteration: "5" },
  { group: "without-design-skill", model: "gpt-6-astra", iteration: "1" },
  { group: "without-design-skill", model: "gpt-6-astra", iteration: "2" },
  { group: "without-design-skill", model: "gpt-6-astra", iteration: "3" },
  { group: "without-design-skill", model: "gpt-6-astra", iteration: "4" },
  { group: "without-design-skill", model: "gpt-6-astra", iteration: "5" },
  { group: "with-design-skill", model: "composer-2.5", iteration: "5" },
  { group: "with-design-skill", model: "grok-4.5", iteration: "3" },
  { group: "with-design-skill", model: "grok-4.6", iteration: "3" },
  { group: "with-taste-skill", model: "grok-4.6", iteration: "3" },
  { group: "without-design-skill", model: "grok-4.6", iteration: "3" },
  { group: "with-design-skill", model: "kimi-k3", iteration: "3" },
  { group: "with-taste-skill", model: "kimi-k3", iteration: "3" },
  { group: "without-design-skill", model: "kimi-k3", iteration: "3" },
  { group: "with-design-skill", model: "gpt-5.5-high", iteration: "3" },
  { group: "with-taste-skill", model: "fable", iteration: "4" },
  { group: "with-design-skill", model: "fable-5.1", iteration: "1" },
  { group: "with-taste-skill", model: "fable-5.1", iteration: "3" },
  { group: "without-design-skill", model: "fable-5.1", iteration: "5" },
  { group: "with-ui-sh-skill", model: "composer-2.0", iteration: "2" },
  { group: "miscellaneous", model: "gpt-5.4", iteration: "5" },
  { group: "with-design-skill", model: "sol", iteration: "1" },
  { group: "with-taste-skill", model: "sol", iteration: "3" },
  { group: "without-design-skill", model: "sol", iteration: "5" },
  { group: "with-design-skill", model: "luna", iteration: "1" },
  { group: "with-taste-skill", model: "luna", iteration: "3" },
  { group: "without-design-skill", model: "luna", iteration: "5" },
  { group: "with-design-skill", model: "terra", iteration: "1" },
  { group: "with-taste-skill", model: "terra", iteration: "3" },
  { group: "without-design-skill", model: "terra", iteration: "5" },
  { group: "with-design-skill", model: "opus-5", iteration: "1" },
  { group: "with-taste-skill", model: "opus-5", iteration: "3" },
  { group: "without-design-skill", model: "opus-5", iteration: "5" },
  { group: "with-design-skill", model: "muse-spark-1.2", iteration: "1" },
  { group: "with-taste-skill", model: "muse-spark-1.2", iteration: "3" },
  { group: "without-design-skill", model: "muse-spark-1.2", iteration: "5" },
  { group: "with-design-skill", model: "gemini-3.7-flash", iteration: "1" },
  { group: "with-taste-skill", model: "gemini-3.7-flash", iteration: "3" },
  { group: "without-design-skill", model: "gemini-3.7-flash", iteration: "5" },
  { group: "with-design-skill", model: "glm-5.3-flash", iteration: "1" },
  { group: "with-taste-skill", model: "glm-5.3-flash", iteration: "3" },
  { group: "without-design-skill", model: "glm-5.3-flash", iteration: "5" },
  { group: "with-design-skill", model: "gemini-3.8-flash", iteration: "1" },
  { group: "with-taste-skill", model: "gemini-3.8-flash", iteration: "3" },
  { group: "without-design-skill", model: "gemini-3.8-flash", iteration: "5" },
  { group: "with-design-skill", model: "muse-spark-1.3", iteration: "1" },
  { group: "with-taste-skill", model: "muse-spark-1.3", iteration: "3" },
  { group: "without-design-skill", model: "muse-spark-1.3", iteration: "5" },
  { group: "with-design-skill", model: "swe-2", iteration: "1" },
  { group: "with-taste-skill", model: "swe-2", iteration: "3" },
  { group: "without-design-skill", model: "swe-2", iteration: "5" },
] as const;

const routeSmokeCases = [
  { group: "without-design-skill", model: "union-alpha", iteration: "1", source: "union-alpha" } as const,
  { group: "without-design-skill", model: "union-alpha", iteration: "2", source: "union-alpha" } as const,
  { group: "without-design-skill", model: "union-alpha", iteration: "3", source: "union-alpha" } as const,
  { group: "without-design-skill", model: "union-alpha", iteration: "4", source: "union-alpha" } as const,
  { group: "without-design-skill", model: "union-alpha", iteration: "5", source: "union-alpha" } as const,

  { group: "with-taste-skill", model: "union-alpha", iteration: "1", source: "union-alpha" } as const,
  { group: "with-taste-skill", model: "union-alpha", iteration: "2", source: "union-alpha" } as const,
  { group: "with-taste-skill", model: "union-alpha", iteration: "3", source: "union-alpha" } as const,
  { group: "with-taste-skill", model: "union-alpha", iteration: "4", source: "union-alpha" } as const,
  { group: "with-taste-skill", model: "union-alpha", iteration: "5", source: "union-alpha" } as const,

  { group: "with-design-skill", model: "union-alpha", iteration: "1", source: "union-alpha" } as const,
  { group: "with-design-skill", model: "union-alpha", iteration: "2", source: "union-alpha" } as const,
  { group: "with-design-skill", model: "union-alpha", iteration: "3", source: "union-alpha" } as const,
  { group: "with-design-skill", model: "union-alpha", iteration: "4", source: "union-alpha" } as const,
  { group: "with-design-skill", model: "union-alpha", iteration: "5", source: "union-alpha" } as const,

  ...latestRouteSmokeCases,
  ...sampleRouteSmokeCases.map((route) => ({ ...route, source: "sample" })),
];

test("GLM 5.3 Flash uses the revealed Z.ai identity", () => {
  const entries = galleryManifest.filter((entry) => entry.model === "glm-5.3-flash");

  expect(entries).toHaveLength(3);
  expect(entries.every((entry) => entry.modelLabel === "GLM 5.3 Flash")).toBe(true);
  expect(getModelLab("glm-5.3-flash")).toEqual({ slug: "z-ai", label: "Z.ai" });
  expect(getModelBrandLogoPath("glm-5.3-flash")).toBe("/glm.webp");
});

test("Grok 4.7 is visible in each group and supersedes Grok 4.6", async ({ page }) => {
  await page.goto("/");
  for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"]) {
    await expect(page.locator(`a[href="/${group}/grok-4.7/1"]`).first()).toBeVisible();
    await expect(page.locator(`a[href="/${group}/grok-4.6/1"]`)).toHaveCount(0);
  }
  expect(getModelLab("grok-4.7")).toEqual({ slug: "x-ai", label: "X AI" });
  expect(getModelBrandLogoPath("grok-4.7")).toBe("/xai-light.svg");
});

test("Union Alpha has fifteen generations and anonymous branding", () => {
  const entries = galleryManifest.filter((entry) => entry.model === "union-alpha");
  expect(entries).toHaveLength(3);
  expect(entries.flatMap((entry) => entry.iterations)).toHaveLength(15);
  expect(entries.every((entry) => entry.modelLabel === "Union Alpha")).toBe(true);
  expect(LAB_OPTIONS.map((lab) => lab.label)).toContain("Anonymous");
  expect(getModelLab("union-alpha")).toEqual({ slug: "anonymous", label: "Anonymous" });
  expect(getModelBrandLogoPath("union-alpha")).toBe("/anonymous-light.svg");
});

test("legacy Ox Alpha routes redirect to GLM 5.3 Flash", async ({ page }) => {
  await page.goto("/with-design-skill/ox-alpha/1");
  await expect(page).toHaveURL("/with-design-skill/glm-5.3-flash/1");
  await expect(page.getByRole("main").first()).toBeVisible();

  await page.goto("/preview/with-taste-skill/ox-alpha/3");
  await expect(page).toHaveURL("/preview/with-taste-skill/glm-5.3-flash/3");
});

test("home page archives Opus 4.7 cards", async ({ page }) => {
  await page.goto("/");
  const opus47Cards = page.getByTestId("gallery-card").filter({ hasText: "Opus 4.7" });
  await expect(opus47Cards).toHaveCount(0);

  while ((await page.getByRole("button", { name: "Show Archived" }).count()) > 0) {
    await page.getByRole("button", { name: "Show Archived" }).first().click();
  }

  const archivedOpus47Count = galleryManifest.filter((e) => e.model === "opus-4.7").length;
  await expect(opus47Cards).toHaveCount(archivedOpus47Count);
  await expect(opus47Cards.first().getByLabel("Archiving soon")).toHaveCount(0);
});

test("home page hides superseded-generation cards until Show Archived", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Which AI Made This?" })).toBeVisible();
  const initialCardCount = await page.getByTestId("gallery-card").count();
  expect(initialCardCount).toBeGreaterThan(0);
  await expect(page.getByTestId("gallery-card").filter({ hasText: "Sonnet 5" })).toHaveCount(
    galleryManifest.filter((e) => HOME_GALLERY_GROUPS.includes(e.group) && e.model === "sonnet-5").length,
  );
  await expect(page.getByTestId("gallery-card").filter({ hasText: "GPT 5.5 low" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Opus 5", exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Opus 5.5", exact: true })).toHaveCount(3);
  for (const { label } of forceArchivedModels) {
    await expect(page.getByTestId("gallery-card").filter({ hasText: label })).toHaveCount(0);
  }
  await expect(page.getByTestId("gallery-card").filter({ hasText: "Opus 4.7" })).toHaveCount(0);

  while ((await page.getByRole("button", { name: "Show Archived" }).count()) > 0) {
    await page.getByRole("button", { name: "Show Archived" }).first().click();
  }

  await expect.poll(() => page.getByTestId("gallery-card").count()).toBeGreaterThan(initialCardCount);
  await expect(page.getByTestId("gallery-card").filter({ hasText: "GPT 5.5 low" })).toHaveCount(
    galleryManifest.filter((e) => HOME_GALLERY_GROUPS.includes(e.group) && e.model === "gpt-5.5-low").length,
  );
  for (const { model, label } of forceArchivedModels) {
    await expect(page.getByTestId("gallery-card").filter({ hasText: label })).toHaveCount(
      galleryManifest.filter((entry) => HOME_GALLERY_GROUPS.includes(entry.group) && entry.model === model).length,
    );
  }
  await expect(page.locator('a[title="Compare"]')).toHaveCount(await page.getByTestId("gallery-card").count());
});

test("home search surfaces archived rows and syncs the URL", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("gallery-card").filter({ hasText: "GPT 5.5 low" })).toHaveCount(0);

  const search = page.getByRole("searchbox", { name: "Search models" });
  await search.fill("5.5");

  const lowCards = page.getByTestId("gallery-card").filter({ hasText: "GPT 5.5 low" });
  await expect(lowCards).toHaveCount(3);
  await expect(lowCards.first()).toContainText("Archived");
  await expect(page.getByRole("heading", { name: "Opus 5", exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Opus 5.5", exact: true })).toHaveCount(3);
  await expect(page.getByRole("button", { name: "Show Archived" })).toHaveCount(0);
  await expect(page).toHaveURL(/\?q=5\.5$/);

  await search.fill("no such model");
  await expect(page.getByTestId("gallery-card")).toHaveCount(0);
  await expect(page.getByText("No models match")).toBeVisible();

  await page.getByRole("button", { name: "Clear search" }).last().click();
  await expect(page.getByRole("heading", { name: "Opus 5.5", exact: true })).toHaveCount(3);
  await expect(page).toHaveURL(/\/$/);
});

test("home search understands hidden aliases", async ({ page }) => {
  const cards = page.getByTestId("gallery-card");
  const search = page.getByRole("searchbox", { name: "Search models" });
  await page.goto("/");

  await search.fill("openai");
  await expect(cards.filter({ hasText: "GPT" })).not.toHaveCount(0);
  await expect(cards.filter({ hasText: "Opus" })).toHaveCount(0);

  await search.fill("claude");
  await expect(cards.filter({ hasText: "Opus 5" })).not.toHaveCount(0);
  await expect(cards.filter({ hasText: "Gemini" })).toHaveCount(0);

  await search.fill("uncodexify");
  await expect(cards).not.toHaveCount(0);
  const groupLabels = await cards.locator("p > span:first-child").allInnerTexts();
  expect(new Set(groupLabels)).toEqual(new Set(["With Uncodexify skill"]));
});

test("home search opens from a ?q= link and the slash key focuses it", async ({ page }) => {
  await page.goto("/?q=astra");
  const search = page.getByRole("searchbox", { name: "Search models" });
  await expect(search).toHaveValue("astra");
  await expect(page.getByTestId("gallery-card").filter({ hasText: "GPT-6 Astra" })).not.toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Opus 5", exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Opus 5.5", exact: true })).toHaveCount(0);

  await page.getByRole("heading", { level: 1 }).click();
  await page.keyboard.press("/");
  await expect(search).toBeFocused();
});

test("home page sorts newer same-family models first", async ({ page }) => {
  await page.goto("/");
  while ((await page.getByRole("button", { name: "Show Archived" }).count()) > 0) {
    await page.getByRole("button", { name: "Show Archived" }).first().click();
  }

  const withDesignSection = page.locator("section").filter({ has: page.getByRole("heading", { name: "With Design Skill" }) });
  const cardLabels = await withDesignSection.getByTestId("gallery-card").locator("h3 span").allInnerTexts();

  expect(cardLabels.indexOf("Fable 5")).toBeLessThan(cardLabels.indexOf("Opus 4.8"));
});

test("rankings page lists eight models with previews", async ({ page }) => {
  await page.goto("/rankings");
  await expect(page.getByRole("heading", { name: "Model rankings" })).toBeVisible();
  await expect(page.getByRole("listitem")).toHaveCount(8);
  await expect(page.locator("main ol h2")).toHaveText([
    "Fable 5.1",
    "Opus 5",
    "Kimi K3",
    "GLM 5.3 Flash",
    "Gemini 3.8 Flash",
    "Grok 4.6",
    "GPT-5.6 Sol",
    "Sonnet 5",
  ]);
});

test("gallery shell background stays consistent after client navigation into a variant", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("gallery-color-scheme", "dark");
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect
    .poll(() => page.evaluate(() => document.documentElement.classList.contains("dark")))
    .toBe(true);

  const initialShellStyles = await page.evaluate(() => ({
    htmlBackgroundColor: window.getComputedStyle(document.documentElement).backgroundColor,
    bodyBackgroundColor: window.getComputedStyle(document.body).backgroundColor,
    isDark: document.documentElement.classList.contains("dark"),
  }));

  expect(initialShellStyles.isDark).toBe(true);

  await page.locator("a[href='/without-design-skill/fable-5.1/1']").first().click();
  await expect(page).toHaveURL("/without-design-skill/fable-5.1/1");
  await page.getByRole("link", { name: /Back to Which AI Made This/ }).click();
  await expect(page).toHaveURL("/");

  const shellStylesAfterReturn = await page.evaluate(() => ({
    htmlBackgroundColor: window.getComputedStyle(document.documentElement).backgroundColor,
    bodyBackgroundColor: window.getComputedStyle(document.body).backgroundColor,
    isDark: document.documentElement.classList.contains("dark"),
  }));

  expect(shellStylesAfterReturn).toEqual(initialShellStyles);
});

test("gallery switcher text colors stay isolated from generated variant CSS", async ({ page }) => {
  await page.goto("/with-design-skill/gpt-5.5-high/1");

  const homeLink = page.getByRole("link", { name: /Back to Which AI Made This/ });
  const activeIteration = page.getByRole("link", { name: "Open iteration 1" });
  const inactiveIteration = page.getByRole("link", { name: "Open iteration 2" });

  await expect(homeLink).toBeVisible();
  await expect(activeIteration).toBeVisible();
  await expect(inactiveIteration).toBeVisible();

  const switcherColors = await page.evaluate(() => {
    const home = document.querySelector<HTMLAnchorElement>('nav[aria-label$="gallery navigation"] a[href="/"]');
    const active = document.querySelector<HTMLAnchorElement>(
      'nav[aria-label$="gallery navigation"] a[aria-current="page"]',
    );
    const inactive = document.querySelector<HTMLAnchorElement>(
      'nav[aria-label$="gallery navigation"] a[aria-label="Open iteration 2"]',
    );

    if (!home || !active || !inactive) {
      throw new Error("Missing gallery switcher controls");
    }

    return {
      active: window.getComputedStyle(active).color,
      inactive: window.getComputedStyle(inactive).color,
      home: window.getComputedStyle(home).color,
    };
  });

  expect(switcherColors).toEqual({
    active: "rgb(250, 250, 250)",
    inactive: "rgb(82, 82, 82)",
    home: "rgb(82, 82, 82)",
  });

  const cssVariables = await page.evaluate(() => {
    const generation = document.querySelector<HTMLElement>("[data-gallery-generation]");
    if (!generation) {
      throw new Error("Missing generation scope");
    }

    return {
      rootBackground: window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim(),
      generationBackground: window
        .getComputedStyle(generation)
        .getPropertyValue("--background")
        .trim(),
    };
  });

  expect(cssVariables.rootBackground).toBe("");
  expect(["#fff", "#ffffff"]).toContain(cssVariables.generationBackground);
});

test("gallery switcher can dock on the left and remembers the side", async ({ page }) => {
  await page.goto("/with-design-skill/gpt-5.5-high/1");

  const switcher = page.getByRole("navigation", { name: /gallery navigation/ });
  await expect(switcher).toBeVisible();
  await expect(switcher).toHaveAttribute("data-side", "right");

  const viewportWidth = page.viewportSize()?.width ?? 0;
  const rightBox = await switcher.boundingBox();
  expect(rightBox).not.toBeNull();
  expect(rightBox!.x).toBeGreaterThan(viewportWidth / 2);

  await page.getByRole("button", { name: "Dock sidebar on the left" }).click();
  await expect(switcher).toHaveAttribute("data-side", "left");

  const leftBox = await switcher.boundingBox();
  expect(leftBox).not.toBeNull();
  expect(leftBox!.x).toBeLessThan(viewportWidth / 2);

  // Popovers open away from the docked edge so they stay on screen.
  await page.getByRole("button", { name: /Switch model from/ }).click();
  const menu = page.getByRole("menu", { name: "Switch model" });
  await expect(menu).toBeVisible();
  const menuBox = await menu.boundingBox();
  expect(menuBox).not.toBeNull();
  expect(menuBox!.x).toBeGreaterThan(leftBox!.x + leftBox!.width);
  await page.keyboard.press("Escape");

  await page.reload();
  await expect(switcher).toHaveAttribute("data-side", "left");
  await expect(
    page.getByRole("link", { name: "Open iteration 2" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Dock sidebar on the right" }).click();
  await expect(switcher).toHaveAttribute("data-side", "right");
});

for (const { group, model, iteration, source } of routeSmokeCases) {
  const entry = galleryManifest.find((item) => item.group === group && item.model === model);
  if (!entry) {
    throw new Error(`Missing gallery manifest entry for ${group}/${model}`);
  }

  const routeIteration = entry.iterations.find((item) => item.id === iteration);
  if (!routeIteration) {
    throw new Error(`Missing gallery manifest iteration for ${group}/${model}/${iteration}`);
  }

  test(`${source} iteration page renders for ${group}/${model}/${iteration}`, async ({ page }) => {
    await page.goto(`/${group}/${model}/${iteration}`);
    await expect(page.getByRole("main").first()).toBeVisible();
  });
}

test("Sol 6 and Opus 5.5 appear in all groups with the correct labs", async ({ page }) => {
  await page.goto("/");
  for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"]) {
    for (const model of ["sol-6", "opus-5.5"]) {
      await expect(page.locator(`a[href="/${group}/${model}/1"]`).first()).toBeVisible();
    }
  }
  expect(getModelLab("sol-6")).toEqual({ slug: "gpt", label: "GPT" });
  expect(getModelLab("opus-5.5")).toEqual({ slug: "anthropic", label: "Anthropic" });
  expect(getModelBrandLogoPath("sol-6")).toBe("/openai-gpt.svg");
  expect(getModelBrandLogoPath("opus-5.5")).toBe("/anthropic-claude.webp");
});
