import type { ReactNode } from "react";

export type GalleryGroupSlug =
  | "with-design-skill"
  | "with-taste-skill"
  | "with-ui-sh-skill"
  | "without-design-skill"
  | "miscellaneous";
export type ModelSlug =
  | "union-alpha"
  | "mimo-x-flash-preview"
  | "mimo-x-pro-preview"
  | "composer-1.5"
  | "composer-2.0"
  | "composer-2.5"
  | "fable"
  | "fable-5.1"
  | "gemini"
  | "gemini-3.5-flash"
  | "gemini-3.7-flash"
  | "gemini-3.8-flash"
  | "glm-5-turbo"
  | "glm-5.1"
  | "glm-5.2"
  | "glm-5.3-flash"
  | "grok-4.5"
  | "grok-4.6"
  | "sol-6"
  | "luna-6"
  | "opus-5.5"
  | "grok-4.7"
  | "gpt-6-astra"
  | "gpt-5.4"
  | "gpt-5.5-low"
  | "gpt-5.5-high"
  | "kimi-k-2.5"
  | "kimi-k-2.6"
  | "kimi-k3"
  | "muse-spark-1.2"
  | "muse-spark-1.3"
  | "opus-4.6"
  | "opus-4.7"
  | "opus-4.8"
  | "opus-5"
  | "sonnet-5"
  | "sol"
  | "luna"
  | "terra"
  | "swe-2";
export type IterationId = "1" | "2" | "3" | "4" | "5";
export type SourceAppType = "next" | "vite";

export interface GalleryIteration {
  id: IterationId;
  title: string;
  sourceSlug: string;
  thumbnailPath: string;
}

export interface GalleryEntry {
  group: GalleryGroupSlug;
  groupLabel: string;
  model: ModelSlug;
  modelLabel: string;
  sourceDir: string;
  sourceAppType: SourceAppType;
  defaultIteration: IterationId;
  summary: string;
  iterations: GalleryIteration[];
}

export interface VariantRenderProps {
  entry: GalleryEntry;
  iteration: IterationId;
  preview: boolean;
}

export interface VariantModule {
  render(props: VariantRenderProps): ReactNode;
}
