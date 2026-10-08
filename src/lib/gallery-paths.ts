import type { GalleryGroupSlug, IterationId, ModelSlug } from "@/lib/gallery-types";

export const iterationIds = ["1", "2", "3", "4", "5"] as const satisfies readonly IterationId[];

export function buildVariantHref(
  group: GalleryGroupSlug,
  model: ModelSlug,
  iteration: IterationId,
): string {
  return `/${group}/${model}/${iteration}`;
}

export function buildPreviewHref(
  group: GalleryGroupSlug,
  model: ModelSlug,
  iteration: IterationId,
): string {
  return `/preview/${group}/${model}/${iteration}`;
}

export function buildModelHref(group: GalleryGroupSlug, model: ModelSlug): string {
  return `/${group}/${model}`;
}

export function isGalleryGroup(value: string): value is GalleryGroupSlug {
  return (
    value === "with-design-skill" ||
    value === "with-taste-skill" ||
    value === "without-design-skill" ||
    value === "miscellaneous"
  );
}

export function isIterationId(value: string): value is IterationId {
  return iterationIds.includes(value as IterationId);
}
