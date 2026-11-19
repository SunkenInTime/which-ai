import { notFound } from "next/navigation";
import { VariantSwitcher } from "@/components/gallery/variant-header";
import { getGalleryEntry } from "@/lib/gallery-manifest";
import { getVariantModule } from "@/lib/gallery-registry";
import { isGalleryGroup, isIterationId } from "@/lib/gallery-paths";
import type { VariantModule } from "@/lib/gallery-types";

export function GalleryIterationView({
  group,
  model,
  iteration,
  preview,
  variantModule,
}: {
  group: string;
  model: string;
  iteration: string;
  preview: boolean;
  variantModule?: VariantModule;
}) {
  if (!isGalleryGroup(group) || !isIterationId(iteration)) {
    notFound();
  }

  const entry = getGalleryEntry(group, model);
  const resolvedVariantModule =
    variantModule ?? (entry ? getVariantModule(entry.group, entry.model) : undefined);
  if (!entry || !resolvedVariantModule) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--gallery-body-bg)]">
      {!preview ? <VariantSwitcher entry={entry} iteration={iteration} /> : null}
      <div
        className="gallery-generation"
        data-gallery-generation
        data-gallery-group={entry.group}
        data-gallery-model={entry.model}
        data-gallery-iteration={iteration}
      >
        {resolvedVariantModule.render({ entry, iteration, preview })}
      </div>
      {/* Below xl the switcher is a bar along the bottom of the screen; this room lets the design's end scroll clear of it. */}
      {!preview ? <div aria-hidden className="h-[calc(4.5rem+env(safe-area-inset-bottom))] xl:hidden" /> : null}
    </main>
  );
}
