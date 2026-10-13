import { test, expect } from "@playwright/test";
import { galleryManifest } from "@/lib/gallery-manifest";
import { isGalleryModelArchivedWithinGroup } from "@/lib/gallery-archived";
import { sortGalleryEntriesByFamily, sortGalleryEntriesForHome } from "@/lib/gallery-model-order";
import {
  NEW_ARRIVAL_WINDOW_DAYS,
  formatGalleryAddedDate,
  getGalleryEntryAddedAt,
  getGalleryEntryNewArrival,
  isoDateToUtcMs,
  sortGalleryEntriesNewFirst,
} from "@/lib/gallery-recency";
import type { GalleryEntry } from "@/lib/gallery-types";

const DAY_MS = 24 * 60 * 60 * 1000;
const MUSE_WONDER_ADDED = isoDateToUtcMs("2026-10-12");

function groupEntries(group: GalleryEntry["group"]) {
  return galleryManifest.filter((entry) => entry.group === group);
}

test.describe("gallery recency data", () => {
  test("every manifest entry has an added-at date", () => {
    const missing = galleryManifest
      .filter((entry) => getGalleryEntryAddedAt(entry) === null)
      .map((entry) => `${entry.group}/${entry.model}`);
    expect(missing).toEqual([]);
  });

  test("formats added dates in UTC", () => {
    expect(formatGalleryAddedDate("2026-10-12")).toBe("Oct 12");
    expect(formatGalleryAddedDate("2026-03-01")).toBe("Mar 1");
  });
});

test.describe("new-arrival policy", () => {
  test("Muse Wonder 1.0 is new on the day it landed and expires after the window", () => {
    const entries = groupEntries("with-design-skill");
    const museWonder = entries.find((entry) => entry.model === "muse-wonder-1.0")!;

    expect(getGalleryEntryNewArrival(entries, museWonder, MUSE_WONDER_ADDED)).toBe("2026-10-12");
    const lastDay = MUSE_WONDER_ADDED + (NEW_ARRIVAL_WINDOW_DAYS - 1) * DAY_MS;
    expect(getGalleryEntryNewArrival(entries, museWonder, lastDay)).toBe("2026-10-12");
    const expired = MUSE_WONDER_ADDED + NEW_ARRIVAL_WINDOW_DAYS * DAY_MS;
    expect(getGalleryEntryNewArrival(entries, museWonder, expired)).toBeNull();
  });

  test("a future added date is not new", () => {
    const entries = groupEntries("with-design-skill");
    const museWonder = entries.find((entry) => entry.model === "muse-wonder-1.0")!;
    expect(getGalleryEntryNewArrival(entries, museWonder, MUSE_WONDER_ADDED - 1)).toBeNull();
    expect(getGalleryEntryNewArrival(entries, museWonder, MUSE_WONDER_ADDED - 3 * DAY_MS)).toBeNull();
  });

  test("archived entries are never new, even inside the window", () => {
    for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"] as const) {
      const entries = groupEntries(group);
      for (const entry of entries) {
        if (!isGalleryModelArchivedWithinGroup(entries, entry)) continue;
        const addedAt = getGalleryEntryAddedAt(entry);
        if (!addedAt) continue;
        // An archived entry must stay unbadged even on its own added day.
        expect(
          getGalleryEntryNewArrival(entries, entry, isoDateToUtcMs(addedAt)),
          `${group}/${entry.model}`,
        ).toBeNull();
      }
    }
  });

  test("only Muse Wonder 1.0 is new in every group", () => {
    for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"] as const) {
      const entries = groupEntries(group);
      const fresh = entries
        .filter((entry) => getGalleryEntryNewArrival(entries, entry, isoDateToUtcMs("2026-10-12")))
        .map((entry) => entry.model)
        .toSorted();
      expect(fresh).toEqual(["muse-wonder-1.0"]);
    }
  });
});

test.describe("home sort", () => {
  test("hoists new arrivals ahead of the family order, newest first", () => {
    const entries = groupEntries("with-design-skill");
    const sorted = sortGalleryEntriesForHome(entries, { now: MUSE_WONDER_ADDED });
    const models = sorted.map((entry) => entry.model);

    expect(models[0]).toBe("muse-wonder-1.0");
    const rest = sorted.slice(1);
    expect(rest.map((entry) => entry.model)).toEqual(
      sortGalleryEntriesByFamily(rest).map((entry) => entry.model),
    );
  });

  test("falls back to family order when no reference time is given", () => {
    const entries = groupEntries("with-design-skill");
    expect(sortGalleryEntriesForHome(entries).map((entry) => entry.model)).toEqual(
      sortGalleryEntriesByFamily(entries).map((entry) => entry.model),
    );
  });

  test("keeps the incoming order once every arrival has expired", () => {
    const entries = sortGalleryEntriesByFamily(groupEntries("without-design-skill"));
    const farFuture = MUSE_WONDER_ADDED + 365 * DAY_MS;
    expect(sortGalleryEntriesNewFirst(entries, farFuture)).toEqual(entries);
  });
});

test.describe("home page new-arrival treatment", () => {
  test("new cards lead their section and archived rows are never badged", async ({ page }) => {
    await page.goto("/");
    const sections = page.locator("main section[aria-labelledby]");
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      const cards = sections.nth(i).getByTestId("gallery-card");
      const flags = await cards.evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute("data-new-arrival") === "true"),
      );
      const firstOld = flags.indexOf(false);
      const lastNew = flags.lastIndexOf(true);
      if (firstOld !== -1 && lastNew !== -1) expect(lastNew).toBeLessThan(firstOld);
    }

    const newCards = page.locator('[data-testid="gallery-card"][data-new-arrival="true"]');
    const newCount = await newCards.count();
    for (let i = 0; i < newCount; i += 1) {
      const card = newCards.nth(i);
      await expect(card.getByTestId("gallery-card-new-arrival")).toContainText(/added \w{3} \d{1,2}/i);
      await expect(card.getByText("Archived", { exact: true })).toHaveCount(0);
    }
  });

  test("archived search results are not badged as new", async ({ page }) => {
    await page.goto("/?q=Union%20Alpha");
    const cards = page.getByTestId("gallery-card");
    await expect(cards.first()).toBeVisible();
    await expect(cards.first().getByText("Archived", { exact: true })).toBeVisible();
    await expect(page.locator('[data-testid="gallery-card"][data-new-arrival="true"]')).toHaveCount(0);
  });
});

test("Luna 6 no longer has a new badge", () => {
  for (const group of ["with-design-skill", "without-design-skill"] as const) {
    const entries = groupEntries(group);
    const luna = entries.find((entry) => entry.model === "luna-6")!;
    expect(getGalleryEntryNewArrival(entries, luna, isoDateToUtcMs("2026-09-23"))).toBeNull();
  }
  expect(groupEntries("with-taste-skill").some((entry) => entry.model === "luna-6")).toBe(false);
});

test("Sonnet 5.5 no longer has a new badge", () => {
  for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"] as const) {
    const entries = groupEntries(group);
    const sonnet = entries.find((entry) => entry.model === "sonnet-5.5")!;
    expect(getGalleryEntryNewArrival(entries, sonnet, isoDateToUtcMs("2026-09-28"))).toBeNull();
  }
});

test("all previous models stay unbadged even on their addition dates", () => {
  for (const entry of galleryManifest.filter(entry => !(["muse-wonder-1.0", "gemini-4-argon"] as string[]).includes(entry.model))) {
    const date = getGalleryEntryAddedAt(entry)!;
    expect(getGalleryEntryNewArrival(groupEntries(entry.group), entry, isoDateToUtcMs(date))).toBeNull();
  }
});

test("Argon joins Muse as a new arrival on October 13 and leads every group", () => {
  for (const group of ["with-design-skill", "with-taste-skill", "without-design-skill"] as const) {
    const entries = groupEntries(group);
    const now = isoDateToUtcMs("2026-10-13");
    const arrivals = entries.filter(entry => getGalleryEntryNewArrival(entries, entry, now)).map(entry => entry.model).sort();
    expect(arrivals).toEqual(["gemini-4-argon", "muse-wonder-1.0"]);
    expect(sortGalleryEntriesForHome(entries, { now })[0].model).toBe("gemini-4-argon");
  }
});
