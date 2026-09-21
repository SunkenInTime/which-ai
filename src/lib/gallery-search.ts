import type { GalleryEntry, GalleryGroupSlug, ModelSlug } from "@/lib/gallery-types";
import { getModelLab, type LabSlug } from "@/lib/model-labs";

/**
 * Undocumented search vocabulary. None of this appears in the UI; it exists so
 * that whatever someone types from memory ("openai", "claude", "theo", "5.6")
 * still lands on the right cards.
 */
const LAB_ALIASES: Record<LabSlug, string[]> = {
  anonymous: ["stealth", "unknown"],
  xiaomi: ["mimo", "mi mo"],
  gpt: ["openai", "open ai", "chatgpt", "codex"],
  anthropic: ["claude", "claude code"],
  google: ["deepmind", "google deepmind", "gemini"],
  meta: ["facebook", "fair", "llama"],
  "x-ai": ["xai", "x.ai", "grok", "elon"],
  moonshot: ["moonshot ai", "kimi"],
  "z-ai": ["zai", "zhipu", "zhipu ai", "glm"],
  cursor: ["anysphere", "composer"],
  cognition: ["devin", "swe", "swe bench", "swe-bench", "windsurf"],
};

const MODEL_ALIASES: Partial<Record<ModelSlug, string[]>> = {
  fable: ["fable 5", "fable5", "mythos"],
  "fable-5.1": ["fable5.1", "mythos", "mythos 5.1"],
  "opus-5": ["claude opus 5", "opus5"],
  "sonnet-5": ["claude sonnet 5", "sonnet5"],
  "gpt-5.5-low": ["gpt5.5", "gpt 5.5", "low reasoning", "5.5 low"],
  "gpt-5.5-high": ["gpt5.5", "gpt 5.5", "high reasoning", "5.5 high"],
  "gpt-6-astra": ["gpt6", "gpt 6", "astra"],
  sol: ["gpt 5.6", "gpt5.6", "codename"],
  luna: ["gpt 5.6", "gpt5.6", "codename"],
  terra: ["gpt 5.6", "gpt5.6", "codename"],
  gemini: ["gemini 3.1", "gemini pro", "3.1 pro"],
  "gemini-3.8-flash": ["gemini flash"],
  "grok-4.6": ["grok4.6"],
  "grok-4.7": ["grok4.7"],
  "kimi-k3": ["kimi k3", "k3"],
  "glm-5.3-flash": ["ox alpha", "ox-alpha", "ox"],
  "muse-spark-1.3": ["muse", "spark"],
  "swe-2": ["swe2", "swe 2", "swe-2 max"],
};

const GROUP_ALIASES: Record<GalleryGroupSlug, string[]> = {
  "with-design-skill": ["design skill", "frontend design", "frontend-design", "anthropic skill", "skill"],
  "with-taste-skill": ["taste", "taste skill", "tasteskill", "skill"],
  "with-ui-sh-skill": ["ui.sh", "ui sh", "uish", "skill"],
  "without-design-skill": ["baseline", "no skill", "raw", "vanilla", "plain"],
  miscellaneous: ["uncodexify", "misc", "skill"],
};

/**
 * Lowercases and strips punctuation so "gpt-5.5", "GPT 5.5" and "gpt5.5"
 * all collapse to the same tokens.
 */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[‐-―\-_/()]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function haystackFor(entry: GalleryEntry): string {
  const lab = getModelLab(entry.model);
  return normalize(
    [
      entry.modelLabel,
      entry.model,
      ...(MODEL_ALIASES[entry.model] ?? []),
      lab.label,
      lab.slug,
      ...LAB_ALIASES[lab.slug],
      entry.groupLabel,
      entry.group,
      ...GROUP_ALIASES[entry.group],
    ].join(" "),
  );
}

export function normalizeGalleryQuery(query: string): string {
  return normalize(query);
}

/**
 * Every whitespace-separated term has to appear somewhere in the entry's
 * model, lab, or group text (labels, slugs, and the hidden aliases above).
 * Matching is substring-based so "5.5" hits "GPT 5.5 low", "astra" hits the
 * Astra rows, and "claude" hits every Anthropic model.
 */
export function galleryEntryMatchesQuery(entry: GalleryEntry, query: string): boolean {
  const terms = normalize(query).split(" ").filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = haystackFor(entry);
  const compact = haystack.replace(/ /g, "");
  return terms.every((term) => haystack.includes(term) || compact.includes(term));
}

export function filterGalleryEntriesByQuery(
  entries: GalleryEntry[],
  query: string,
): GalleryEntry[] {
  if (normalize(query).length === 0) return entries;
  return entries.filter((entry) => galleryEntryMatchesQuery(entry, query));
}
