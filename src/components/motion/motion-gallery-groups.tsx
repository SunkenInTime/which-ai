"use client";

import { useMemo } from "react";
import { GalleryModeSwitcher } from "@/components/gallery/gallery-mode-switcher";
import {
  GallerySearch,
  GallerySearchEmpty,
  useGallerySearchQuery,
} from "@/components/gallery/gallery-search";
import { MotionCard } from "@/components/motion/motion-card";
import { galleryModelMatchesQuery, normalizeGalleryQuery } from "@/lib/gallery-search";
import { getMotionModelLab, type MotionClip, type MotionGroup } from "@/lib/motion";

/** The motion gallery's search row and groups, laid out like the frontend gallery's `GalleryHomeGroups`. */
export function MotionGalleryGroups({
  groups,
}: {
  /** One entry per model in each group: that model's clips, in iteration order. */
  groups: { group: MotionGroup; models: MotionClip[][] }[];
}) {
  const [query, setQuery] = useGallerySearchQuery();

  const searching = normalizeGalleryQuery(query).length > 0;
  const totalCount = useMemo(() => groups.reduce((sum, { models }) => sum + models.length, 0), [groups]);
  const filtered = useMemo(
    () =>
      groups
        .map(({ group, models }) => ({
          group,
          models: models.filter(([clip]) =>
            galleryModelMatchesQuery(
              { id: clip.model.id, label: clip.model.label, lab: getMotionModelLab(clip.model) },
              query,
            ),
          ),
        }))
        .filter(({ models }) => models.length > 0),
    [groups, query],
  );
  const resultCount = filtered.reduce((sum, { models }) => sum + models.length, 0);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-64 flex-1">
          <GallerySearch
            query={query}
            onQueryChange={setQuery}
            resultCount={resultCount}
            totalCount={totalCount}
          />
        </div>
        <GalleryModeSwitcher active="motion" />
      </div>

      {searching && filtered.length === 0 ? (
        <GallerySearchEmpty query={query} onClear={() => setQuery("")} />
      ) : (
        <div className="mt-8 space-y-12">
          {filtered.map(({ group, models }) => (
            <section key={group.id} aria-labelledby={`motion-${group.id}`} className="space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                <h2
                  id={`motion-${group.id}`}
                  className="text-xl font-medium tracking-tight text-[var(--gallery-text-primary)]"
                >
                  {group.label}
                </h2>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                {models.map((clips) => (
                  <MotionCard key={clips[0].model.id} clips={clips} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
