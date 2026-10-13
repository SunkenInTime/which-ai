"use client";

import { useMemo } from "react";
import { GalleryGroupSection } from "@/components/gallery/gallery-group-section";
import { GalleryModeSwitcher } from "@/components/gallery/gallery-mode-switcher";
import {
  GallerySearch,
  GallerySearchEmpty,
  useGallerySearchQuery,
} from "@/components/gallery/gallery-search";
import { filterGalleryEntriesByQuery, normalizeGalleryQuery } from "@/lib/gallery-search";
import type { GalleryEntry, GalleryGroupSlug } from "@/lib/gallery-types";

export function GalleryHomeGroups({
  groups,
  referenceTime,
}: {
  groups: { group: GalleryGroupSlug; entries: GalleryEntry[] }[];
  /** Server render time (ms) used for new-arrival badges; see `gallery-recency.ts`. */
  referenceTime: number;
}) {
  const [query, setQuery] = useGallerySearchQuery();

  const searching = normalizeGalleryQuery(query).length > 0;
  const totalCount = useMemo(
    () => groups.reduce((sum, { entries }) => sum + entries.length, 0),
    [groups],
  );
  const filtered = useMemo(
    () =>
      groups
        .map(({ group, entries }) => ({
          group,
          allEntries: entries,
          entries: filterGalleryEntriesByQuery(entries, query),
        }))
        .filter(({ entries }) => entries.length > 0),
    [groups, query],
  );
  const resultCount = filtered.reduce((sum, { entries }) => sum + entries.length, 0);

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
        <GalleryModeSwitcher active="frontend" now={referenceTime} />
      </div>

      {searching && filtered.length === 0 ? (
        <GallerySearchEmpty query={query} onClear={() => setQuery("")} />
      ) : (
        <div className="mt-8 space-y-12">
          {filtered.map(({ group, entries, allEntries }) => (
            <GalleryGroupSection
              key={group}
              group={group}
              entries={entries}
              allEntries={allEntries}
              searching={searching}
              referenceTime={referenceTime}
            />
          ))}
        </div>
      )}
    </>
  );
}
