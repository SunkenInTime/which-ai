import type { GalleryEntry, ModelSlug } from "@/lib/gallery-types";

/** Always hidden on the home page until "Show Archived" (all groups). */
const FORCE_ARCHIVED_MODELS = new Set<ModelSlug>([
  "composer-2.0",
  "composer-2.5",
  "gemini-3.5-flash",
  "kimi-k-2.6",
  "luna",
  "mimo-x-flash-preview",
  "opus-4.7",
  "opus-4.8",
  "terra",
  "union-alpha",
]);

/** Visible on the home page with a sunset bookmark on gallery cards. */
const LEAVING_SOON_MODELS = new Set<ModelSlug>();

export function isGalleryModelLeavingSoon(model: ModelSlug): boolean {
  return LEAVING_SOON_MODELS.has(model);
}

/**
 * Defines model lineages for the gallery home page only. Within a gallery group section,
 * a model is "archived" when another model shares the same `family` with a strictly higher tier.
 */
const MODEL_GALLERY_GENERATION = {
  "composer-1.5": { family: "composer", tier: 1 },
  "composer-2.0": { family: "composer", tier: 2 },
  "composer-2.5": { family: "composer", tier: 3 },
  gemini: { family: "gemini", tier: 1 },
  "gemini-3.5-flash": { family: "gemini", tier: 2 },
  "gemini-3.7-flash": { family: "gemini", tier: 3 },
  "gemini-3.8-flash": { family: "gemini", tier: 4 },
  "gpt-5.4": { family: "gpt", tier: 1 },
  "gpt-5.5-low": { family: "gpt", tier: 2 },
  "gpt-5.5-high": { family: "gpt", tier: 3 },
  "gpt-6-astra": { family: "gpt", tier: 6 },
  sol: { family: "gpt", tier: 4 },
  "sol-6": { family: "gpt", tier: 6 },
  "luna-6": { family: "gpt", tier: 6 },
  luna: { family: "gpt", tier: 4 },
  terra: { family: "gpt", tier: 4 },
  "kimi-k-2.5": { family: "kimi", tier: 1 },
  "kimi-k-2.6": { family: "kimi", tier: 2 },
  "kimi-k3": { family: "kimi", tier: 3 },
  "opus-4.6": { family: "anthropic-opus", tier: 46 },
  "opus-4.7": { family: "anthropic-opus", tier: 47 },
  "opus-4.8": { family: "anthropic-opus", tier: 48 },
  "opus-5": { family: "anthropic-opus", tier: 50 },
  "opus-5.5": { family: "anthropic-opus", tier: 55 },
  "sonnet-5": { family: "anthropic-sonnet", tier: 50 },
  fable: { family: "anthropic-fable", tier: 50 },
  "fable-5.1": { family: "anthropic-fable", tier: 51 },
  "glm-5-turbo": { family: "glm", tier: 1 },
  "glm-5.1": { family: "glm", tier: 2 },
  "glm-5.2": { family: "glm", tier: 3 },
  "grok-4.5": { family: "x-ai-grok", tier: 45 },
  "grok-4.6": { family: "x-ai-grok", tier: 46 },
  "grok-4.7": { family: "x-ai-grok", tier: 47 },
  "muse-spark-1.2": { family: "meta-muse-spark", tier: 12 },
  "muse-spark-1.3": { family: "meta-muse-spark", tier: 13 },
  "swe-2": { family: "cognition-swe", tier: 2 },
} as const satisfies Partial<
  Record<ModelSlug, { family: string; tier: number }>
>;

function maxTierInFamily(entries: GalleryEntry[], family: string): number {
  let max = 0;
  for (const entry of entries) {
    const gen = MODEL_GALLERY_GENERATION[entry.model as keyof typeof MODEL_GALLERY_GENERATION];
    if (gen?.family !== family) continue;
    max = Math.max(max, gen.tier);
  }
  return max;
}

export function isGalleryModelArchivedWithinGroup(entries: GalleryEntry[], entry: GalleryEntry): boolean {
  if (FORCE_ARCHIVED_MODELS.has(entry.model)) return true;
  if (isGalleryModelLeavingSoon(entry.model)) return false;
  const gen = MODEL_GALLERY_GENERATION[entry.model as keyof typeof MODEL_GALLERY_GENERATION];
  if (!gen) return false;
  const cap = maxTierInFamily(entries, gen.family);
  return gen.tier < cap;
}

export function filterGalleryEntriesForArchiveVisibility(
  entries: GalleryEntry[],
  showArchived: boolean,
): GalleryEntry[] {
  if (showArchived) return entries;
  return entries.filter((entry) => !isGalleryModelArchivedWithinGroup(entries, entry));
}
