import type { GalleryEntry, GalleryEntryKey } from "@/lib/gallery-types";

/**
 * API spend in US dollars for the run that produced an entry's five iterations.
 * Prices come from saved token usage or matched Cursor events. Runs with no usage record
 * or a $0 free-route report are left out; those cards show no cost.
 */
const ENTRY_COST_USD: Partial<Record<GalleryEntryKey, number>> = {
  "without-design-skill/haiku-5-5": 0.27,
  "with-taste-skill/haiku-5-5": 1.27,
  "with-design-skill/haiku-5-5": 0.8,
  "without-design-skill/sol-6-1": 1.16,
  "with-taste-skill/sol-6-1": 1.21,
  "with-design-skill/sol-6-1": 0.84,
  "without-design-skill/mistral-large-4": 0.12,
  "with-taste-skill/mistral-large-4": 0.49,
  "with-design-skill/mistral-large-4": 1.72,
  "with-design-skill/sonnet-5.5": 6.8,
  "with-taste-skill/sonnet-5.5": 5.97,
  "without-design-skill/sonnet-5.5": 4.0,
  "with-design-skill/luna-6": 0.09,
  "without-design-skill/luna-6": 0.06,
  "with-design-skill/sol-6": 0.95,
  "with-taste-skill/sol-6": 3.52,
  "without-design-skill/sol-6": 0.97,
  "with-design-skill/opus-5.5": 3.3,
  "with-taste-skill/opus-5.5": 19.12,
  "without-design-skill/opus-5.5": 6.46,
  "with-design-skill/grok-4.7": 7.43,
  "with-taste-skill/grok-4.7": 6.48,
  "without-design-skill/grok-4.7": 6.42,
  "with-design-skill/composer-2.0": 0.01,
  "with-design-skill/composer-2.5": 3.07,
  "with-design-skill/fable": 22.35,
  "with-design-skill/fable-5.1": 12.29,
  "with-design-skill/gemini": 0.44,
  "with-design-skill/gemini-3.5-flash": 0.64,
  "with-design-skill/grok-4.5": 2.7,
  "with-design-skill/grok-4.6": 4.62,
  "with-design-skill/gpt-5.4": 0.76,
  "with-design-skill/kimi-k-2.5": 0.17,
  "with-design-skill/opus-4.8": 4.95,
  "with-design-skill/sonnet-5": 6.3,
  "with-taste-skill/fable": 22.79,
  "with-taste-skill/fable-5.1": 10.09,
  "with-taste-skill/grok-4.5": 2.24,
  "with-taste-skill/grok-4.6": 4.01,
  "with-taste-skill/sonnet-5": 7.65,
  "without-design-skill/composer-2.0": 0.06,
  "without-design-skill/composer-2.5": 0.74,
  "without-design-skill/fable": 8.96,
  "without-design-skill/fable-5.1": 4.95,
  "without-design-skill/gemini": 0.34,
  "without-design-skill/gemini-3.5-flash": 1.15,
  "without-design-skill/grok-4.5": 3.65,
  "without-design-skill/grok-4.6": 1.67,
  "without-design-skill/gpt-5.4": 0.35,
  "without-design-skill/kimi-k-2.5": 0.19,
  "without-design-skill/opus-4.8": 1.82,
  "without-design-skill/sonnet-5": 3.48,
  "with-design-skill/sol": 4.53,
  "with-taste-skill/sol": 9.61,
  "without-design-skill/sol": 4.74,
  "with-design-skill/luna": 0.27,
  "with-taste-skill/luna": 0.45,
  "without-design-skill/luna": 0.19,
  "with-design-skill/terra": 1.33,
  "with-taste-skill/terra": 2.81,
  "without-design-skill/terra": 0.98,
  "with-design-skill/gemini-3.8-flash": 0.63,
  "with-taste-skill/gemini-3.8-flash": 0.93,
  "without-design-skill/gemini-3.8-flash": 0.91,
  "with-design-skill/gpt-6-astra": 9.0,
  "with-taste-skill/gpt-6-astra": 11.19,
  "without-design-skill/gpt-6-astra": 8.94,
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function getGalleryEntryCost(entry: Pick<GalleryEntry, "group" | "model">): number | null {
  return ENTRY_COST_USD[`${entry.group}/${entry.model}`] ?? null;
}

/** `4.1` becomes `$4.10`. */
export function formatGalleryCost(cost: number): string {
  return usd.format(cost);
}
