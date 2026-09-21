"use client";

import { useEffect, useMemo, useState } from "react";
import { GalleryGroupSection } from "@/components/gallery/gallery-group-section";
import { GallerySearch } from "@/components/gallery/gallery-search";
import { filterGalleryEntriesByQuery, normalizeGalleryQuery } from "@/lib/gallery-search";
import type { GalleryEntry, GalleryGroupSlug } from "@/lib/gallery-types";

const QUERY_PARAM = "q";

export function GalleryHomeGroups({
  groups,
  referenceTime,
}: {
  groups: { group: GalleryGroupSlug; entries: GalleryEntry[] }[];
  /** Server render time (ms) used for new-arrival badges; see `gallery-recency.ts`. */
  referenceTime: number;
}) {
  const [query, setQuery] = useState("");

  // Hydrate from ?q= after mount so server and client markup agree.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get(QUERY_PARAM);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL, an external system
    if (initial) setQuery(initial);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const current = url.searchParams.get(QUERY_PARAM) ?? "";
    const next = query.trim();
    if (current === next) return;
    if (next) url.searchParams.set(QUERY_PARAM, next);
    else url.searchParams.delete(QUERY_PARAM);
    window.history.replaceState(window.history.state, "", url);
  }, [query]);

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
      <div className="mt-8">
        <GallerySearch
          query={query}
          onQueryChange={setQuery}
          resultCount={resultCount}
          totalCount={totalCount}
        />
      </div>

      {searching && filtered.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-[var(--gallery-divider-strong)] px-6 py-12 text-center">
          <p className="text-base font-medium tracking-tight text-[var(--gallery-text-primary)]">
            No models match &ldquo;{query.trim()}&rdquo;
          </p>
          <p className="mt-2 text-sm text-[var(--gallery-text-tertiary)]">
            Try a model name like &ldquo;Opus&rdquo;, a version like &ldquo;5.5&rdquo;, or a lab like
            &ldquo;Google&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-5 inline-flex items-center rounded-md border border-[var(--gallery-divider-strong)] bg-[var(--gallery-surface)] px-3 py-1.5 text-sm font-medium tracking-tight text-[var(--gallery-text-primary)] shadow-[var(--gallery-shadow-sm)] transition-colors hover:border-[var(--gallery-text-quaternary)] hover:bg-[var(--gallery-surface-subtle)]"
          >
            Clear search
          </button>
        </div>
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
