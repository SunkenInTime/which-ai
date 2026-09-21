import { isGalleryModelArchivedWithinGroup } from "@/lib/gallery-archived";
import type { GalleryEntry, GalleryGroupSlug, ModelSlug } from "@/lib/gallery-types";

/** ISO calendar date such as `2026-09-21`, read as UTC midnight. */
export type GalleryIsoDate = `${number}-${number}-${number}`;

/**
 * New-arrival policy
 * ------------------
 * An entry is a "new arrival" when all of the following hold:
 *   1. it has an added-at date (model default, or a per-entry override below),
 *   2. the date is not in the future and fewer than `NEW_ARRIVAL_WINDOW_DAYS` have elapsed
 *      since it, measured against the reference time the home page was rendered with, and
 *   3. it is not archived within its group (archived rows are never badged).
 *
 * Maintenance: when a new model lands, add it to `MODEL_ADDED_AT` with the merge date.
 * When an existing model gains a new group later, add a `"{group}/{model}"` key to
 * `ENTRY_ADDED_AT` instead of bumping the model date, so only the new condition is badged.
 * Archived rows need no date. Dates are never removed; the window handles expiry.
 *
 * The home page passes one reference time to both the sort and the badge so they can
 * never disagree, and revalidates daily so badges expire without a redeploy.
 *
 * Dates are the git addition dates of `src/variants/{group}/{model}/index.tsx`.
 */
export const NEW_ARRIVAL_WINDOW_DAYS = 14;

const DAY_MS = 24 * 60 * 60 * 1000;

/** First day each model's generations landed in the gallery. */
const MODEL_ADDED_AT: Partial<Record<ModelSlug, GalleryIsoDate>> = {
  "grok-4.7": "2026-09-21",
  "union-alpha": "2026-09-16",
  "mimo-x-flash-preview": "2026-09-10",
  "mimo-x-pro-preview": "2026-09-10",
  "swe-2": "2026-09-10",
  "gpt-6-astra": "2026-09-04",
  "gemini-3.8-flash": "2026-09-02",
  "muse-spark-1.3": "2026-09-02",
  "fable-5.1": "2026-09-01",
  "glm-5.3-flash": "2026-08-27",
  "gemini-3.7-flash": "2026-08-13",
  "grok-4.6": "2026-08-12",
  "muse-spark-1.2": "2026-08-05",
  "opus-5": "2026-07-24",
  "kimi-k3": "2026-07-16",
  sol: "2026-07-09",
  luna: "2026-07-09",
  terra: "2026-07-09",
  "grok-4.5": "2026-07-08",
  "sonnet-5": "2026-06-30",
  "glm-5.2": "2026-06-19",
  fable: "2026-06-09",
  "opus-4.8": "2026-05-28",
  "gemini-3.5-flash": "2026-05-26",
  "composer-2.5": "2026-05-18",
  "gpt-5.5-low": "2026-04-24",
  "gpt-5.5-high": "2026-04-24",
  "kimi-k-2.6": "2026-04-20",
  "opus-4.7": "2026-04-16",
  "glm-5-turbo": "2026-04-07",
  "glm-5.1": "2026-04-07",
  "composer-1.5": "2026-03-21",
  "composer-2.0": "2026-03-21",
  gemini: "2026-03-21",
  "gpt-5.4": "2026-03-21",
  "kimi-k-2.5": "2026-03-21",
  "opus-4.6": "2026-03-21",
};

type GalleryEntryKey = `${GalleryGroupSlug}/${ModelSlug}`;

/** Conditions added after the model first arrived, e.g. a taste-skill run landing weeks later. */
const ENTRY_ADDED_AT: Partial<Record<GalleryEntryKey, GalleryIsoDate>> = {
  "with-ui-sh-skill/composer-2.0": "2026-04-30",
  "with-ui-sh-skill/gpt-5.5-low": "2026-04-30",
  "with-ui-sh-skill/gpt-5.5-high": "2026-04-30",
  "with-ui-sh-skill/opus-4.7": "2026-04-30",
  "miscellaneous/gpt-5.4": "2026-04-02",
};

/**
 * Reference clock for the home page. Read once per server render (the page revalidates
 * daily) and passed down, so the sort and every badge share one instant.
 */
export function getGalleryReferenceTime(): number {
  return Date.now();
}

export function isoDateToUtcMs(date: GalleryIsoDate): number {
  return Date.parse(`${date}T00:00:00Z`);
}

export function getGalleryEntryAddedAt(
  entry: Pick<GalleryEntry, "group" | "model">,
): GalleryIsoDate | null {
  const key: GalleryEntryKey = `${entry.group}/${entry.model}`;
  return ENTRY_ADDED_AT[key] ?? MODEL_ADDED_AT[entry.model] ?? null;
}

/**
 * Returns the added-at date when `entry` should carry the new-arrival treatment, otherwise null.
 * `entries` is the entry's full group so archive status can be resolved.
 */
export function getGalleryEntryNewArrival(
  entries: GalleryEntry[],
  entry: GalleryEntry,
  now: number,
): GalleryIsoDate | null {
  const addedAt = getGalleryEntryAddedAt(entry);
  if (!addedAt) return null;
  const elapsed = now - isoDateToUtcMs(addedAt);
  // A future date is a data error or clock skew, not an arrival; badge nothing.
  if (elapsed < 0 || elapsed >= NEW_ARRIVAL_WINDOW_DAYS * DAY_MS) return null;
  if (isGalleryModelArchivedWithinGroup(entries, entry)) return null;
  return addedAt;
}

export function isGalleryEntryNewArrival(
  entries: GalleryEntry[],
  entry: GalleryEntry,
  now: number,
): boolean {
  return getGalleryEntryNewArrival(entries, entry, now) !== null;
}

/**
 * Hoists new arrivals to the front, newest first; everything else keeps its incoming order.
 * Pass an already family-ordered list so ties inside and outside the new block stay stable.
 */
export function sortGalleryEntriesNewFirst(entries: GalleryEntry[], now: number): GalleryEntry[] {
  const fresh: { entry: GalleryEntry; addedMs: number; index: number }[] = [];
  const rest: GalleryEntry[] = [];
  entries.forEach((entry, index) => {
    const addedAt = getGalleryEntryNewArrival(entries, entry, now);
    if (addedAt) fresh.push({ entry, addedMs: isoDateToUtcMs(addedAt), index });
    else rest.push(entry);
  });
  fresh.sort((a, b) => b.addedMs - a.addedMs || a.index - b.index);
  return [...fresh.map(({ entry }) => entry), ...rest];
}

/** `2026-09-21` becomes `Sep 21`. Fixed to UTC so server and client agree. */
export function formatGalleryAddedDate(date: GalleryIsoDate): string {
  return new Date(isoDateToUtcMs(date)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
