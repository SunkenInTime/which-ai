import { sortGalleryEntriesNewFirst } from "@/lib/gallery-recency";
import type { GalleryEntry, ModelSlug } from "@/lib/gallery-types";

const MODEL_HOME_ORDER: Record<ModelSlug, { familyOrder: number; tier: number }> = {
  "union-alpha": { familyOrder: 9, tier: 1 },
  "mimo-x-flash-preview": { familyOrder: 8, tier: 0 },
  "mimo-x-pro-preview": { familyOrder: 8, tier: 1 },
  fable: { familyOrder: 0, tier: 50 },
  "fable-5.1": { familyOrder: 0, tier: 51 },
  "opus-4.6": { familyOrder: 1, tier: 46 },
  "opus-4.7": { familyOrder: 1, tier: 47 },
  "opus-4.8": { familyOrder: 1, tier: 48 },
  "opus-5": { familyOrder: 1, tier: 50 },
  "sonnet-5": { familyOrder: 1, tier: 50 },
  "gpt-5.4": { familyOrder: 2, tier: 54 },
  "gpt-5.5-low": { familyOrder: 2, tier: 55 },
  "gpt-5.5-high": { familyOrder: 2, tier: 56 },
  "gpt-6-astra": { familyOrder: 2, tier: 60 },
  sol: { familyOrder: 2, tier: 59 },
  luna: { familyOrder: 2, tier: 58 },
  terra: { familyOrder: 2, tier: 57 },
  gemini: { familyOrder: 3, tier: 31 },
  "gemini-3.5-flash": { familyOrder: 3, tier: 35 },
  "gemini-3.7-flash": { familyOrder: 3, tier: 37 },
  "gemini-3.8-flash": { familyOrder: 3, tier: 38 },
  "grok-4.5": { familyOrder: 4, tier: 45 },
  "grok-4.6": { familyOrder: 4, tier: 46 },
  "grok-4.7": { familyOrder: 4, tier: 47 },
  "muse-spark-1.2": { familyOrder: 4.5, tier: 12 },
  "muse-spark-1.3": { familyOrder: 4.5, tier: 13 },
  "composer-1.5": { familyOrder: 5, tier: 15 },
  "composer-2.0": { familyOrder: 5, tier: 20 },
  "composer-2.5": { familyOrder: 5, tier: 25 },
  "glm-5-turbo": { familyOrder: 6, tier: 50 },
  "glm-5.1": { familyOrder: 6, tier: 51 },
  "glm-5.2": { familyOrder: 6, tier: 52 },
  "glm-5.3-flash": { familyOrder: 6, tier: 53 },
  "kimi-k-2.5": { familyOrder: 7, tier: 25 },
  "kimi-k-2.6": { familyOrder: 7, tier: 26 },
  "kimi-k3": { familyOrder: 7, tier: 30 },
  "swe-2": { familyOrder: 8, tier: 20 },
};

/**
 * Family order (lab, then newest tier first). When `now` is given, new arrivals are hoisted
 * ahead of the family order, newest first; see `gallery-recency.ts` for the policy.
 * Callers that want a stable, time-independent order (e.g. the variant switcher) omit `now`.
 */
export function sortGalleryEntriesForHome(
  entries: GalleryEntry[],
  options: { now?: number } = {},
) {
  const byFamily = sortGalleryEntriesByFamily(entries);
  return options.now === undefined ? byFamily : sortGalleryEntriesNewFirst(byFamily, options.now);
}

export function sortGalleryEntriesByFamily(entries: GalleryEntry[]) {
  return entries.toSorted((a, b) => {
    const aOrder = MODEL_HOME_ORDER[a.model];
    const bOrder = MODEL_HOME_ORDER[b.model];
    return (
      aOrder.familyOrder - bOrder.familyOrder ||
      bOrder.tier - aOrder.tier ||
      a.modelLabel.localeCompare(b.modelLabel, undefined, { numeric: true })
    );
  });
}
