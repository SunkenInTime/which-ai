import type { ModelSlug } from "@/lib/gallery-types";

export type LabSlug =
  | "anonymous"
  | "xiaomi"
  | "gpt"
  | "anthropic"
  | "google"
  | "meta"
  | "x-ai"
  | "moonshot"
  | "z-ai"
  | "cursor"
  | "cognition";

export interface ModelLab {
  slug: LabSlug;
  label: string;
}

const MODEL_TO_LAB: Record<ModelSlug, ModelLab> = {
  "union-alpha": { slug: "anonymous", label: "Anonymous" },
  "mimo-x-flash-preview": { slug: "xiaomi", label: "Xiaomi" },
  "mimo-x-pro-preview": { slug: "xiaomi", label: "Xiaomi" },
  "composer-1.5": { slug: "cursor", label: "Cursor" },
  "composer-2.0": { slug: "cursor", label: "Cursor" },
  "composer-2.5": { slug: "cursor", label: "Cursor" },
  fable: { slug: "anthropic", label: "Anthropic" },
  "fable-5.1": { slug: "anthropic", label: "Anthropic" },
  gemini: { slug: "google", label: "Google" },
  "gemini-3.5-flash": { slug: "google", label: "Google" },
  "gemini-3.7-flash": { slug: "google", label: "Google" },
  "gemini-3.8-flash": { slug: "google", label: "Google" },
  "glm-5-turbo": { slug: "z-ai", label: "Z.ai" },
  "glm-5.1": { slug: "z-ai", label: "Z.ai" },
  "glm-5.2": { slug: "z-ai", label: "Z.ai" },
  "glm-5.3-flash": { slug: "z-ai", label: "Z.ai" },
  "grok-4.5": { slug: "x-ai", label: "X AI" },
  "grok-4.6": { slug: "x-ai", label: "X AI" },
  "grok-4.7": { slug: "x-ai", label: "X AI" },
  "gpt-5.4": { slug: "gpt", label: "GPT" },
  "gpt-5.5-low": { slug: "gpt", label: "GPT" },
  "gpt-5.5-high": { slug: "gpt", label: "GPT" },
  "gpt-6-astra": { slug: "gpt", label: "GPT" },
  sol: { slug: "gpt", label: "GPT" },
  luna: { slug: "gpt", label: "GPT" },
  terra: { slug: "gpt", label: "GPT" },
  "kimi-k-2.5": { slug: "moonshot", label: "Moonshot" },
  "kimi-k-2.6": { slug: "moonshot", label: "Moonshot" },
  "kimi-k3": { slug: "moonshot", label: "Moonshot" },
  "muse-spark-1.2": { slug: "meta", label: "Meta" },
  "muse-spark-1.3": { slug: "meta", label: "Meta" },
  "opus-4.6": { slug: "anthropic", label: "Anthropic" },
  "opus-4.7": { slug: "anthropic", label: "Anthropic" },
  "opus-4.8": { slug: "anthropic", label: "Anthropic" },
  "opus-5": { slug: "anthropic", label: "Anthropic" },
  "sonnet-5": { slug: "anthropic", label: "Anthropic" },
  "swe-2": { slug: "cognition", label: "Cognition" },
};

export const LAB_OPTIONS: ModelLab[] = [
  { slug: "anonymous", label: "Anonymous" },
  { slug: "xiaomi", label: "Xiaomi" },
  { slug: "gpt", label: "GPT" },
  { slug: "anthropic", label: "Anthropic" },
  { slug: "google", label: "Google" },
  { slug: "meta", label: "Meta" },
  { slug: "x-ai", label: "X AI" },
  { slug: "moonshot", label: "Moonshot" },
  { slug: "z-ai", label: "Z.ai" },
  { slug: "cursor", label: "Cursor" },
  { slug: "cognition", label: "Cognition" },
];

export function getModelLab(model: ModelSlug): ModelLab {
  return MODEL_TO_LAB[model];
}
