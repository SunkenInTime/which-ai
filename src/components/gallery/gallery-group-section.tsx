"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Archive } from "lucide-react";
import type { GalleryEntry, GalleryGroupSlug } from "@/lib/gallery-types";
import {
  ANTHROPIC_FRONTEND_DESIGN_SKILL_URL,
  UNCODEXIFY_SKILL_URL,
} from "@/lib/gallery-anthropic-skill";
import { GalleryCard } from "@/components/gallery/gallery-card";
import {
  filterGalleryEntriesForArchiveVisibility,
  isGalleryModelArchivedWithinGroup,
} from "@/lib/gallery-archived";
import { getGalleryEntryNewArrival } from "@/lib/gallery-recency";

function groupHasArchivedRow(entries: GalleryEntry[]): boolean {
  const visibleWhenHidden = filterGalleryEntriesForArchiveVisibility(entries, false);
  return visibleWhenHidden.length < entries.length;
}

export function GalleryGroupSection({
  group,
  entries,
  allEntries = entries,
  searching = false,
  referenceTime,
}: {
  group: GalleryGroupSlug;
  entries: GalleryEntry[];
  /** Full group membership, used to decide archive status when `entries` is a filtered subset. */
  allEntries?: GalleryEntry[];
  /** While a search is active every match is shown, archived or not, and the toggle is hidden. */
  searching?: boolean;
  /** Server render time (ms). Shared with the sort so badges and order never disagree. */
  referenceTime: number;
}) {
  const [showArchived, setShowArchived] = useState(false);
  const visibleEntries = searching
    ? entries
    : filterGalleryEntriesForArchiveVisibility(entries, showArchived);
  const labelId = useId();
  const hasArchived = !searching && groupHasArchivedRow(entries);

  const label =
    group === "with-design-skill" ? (
      <>
        With{" "}
        <Link
          href={ANTHROPIC_FRONTEND_DESIGN_SKILL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 decoration-[var(--gallery-text-tertiary)] underline-offset-[6px] transition-colors hover:text-[var(--gallery-accent)] hover:decoration-[var(--gallery-accent)]"
        >
          Design Skill
        </Link>
      </>
    ) : group === "without-design-skill" ? (
      <>
        Without{" "}
        <Link
          href={ANTHROPIC_FRONTEND_DESIGN_SKILL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 decoration-[var(--gallery-text-tertiary)] underline-offset-[6px] transition-colors hover:text-[var(--gallery-accent)] hover:decoration-[var(--gallery-accent)]"
        >
          Design Skill
        </Link>
      </>
    ) : group === "with-taste-skill" ? (
      <>
        With{" "}
        <Link
          href="https://www.tasteskill.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 decoration-[var(--gallery-text-tertiary)] underline-offset-[6px] transition-colors hover:text-[var(--gallery-accent)] hover:decoration-[var(--gallery-accent)]"
        >
          Taste Skill
        </Link>
      </>
    ) : group === "with-ui-sh-skill" ? (
      "With UI SH Skill"
    ) : group === "miscellaneous" ? (
      <>
        With{" "}
        <Link
          href={UNCODEXIFY_SKILL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 decoration-[var(--gallery-text-tertiary)] underline-offset-[6px] transition-colors hover:text-[var(--gallery-accent)] hover:decoration-[var(--gallery-accent)]"
        >
          Uncodexify skill
        </Link>
      </>
    ) : (
      entries[0]?.groupLabel ?? group
    );

  return (
    <section aria-labelledby={labelId} className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <h2 id={labelId} className="text-xl font-medium tracking-tight text-[var(--gallery-text-primary)]">
          {label}
        </h2>
        {hasArchived ? (
          <button
            type="button"
            onClick={() => setShowArchived((v) => !v)}
            aria-pressed={showArchived}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[var(--gallery-divider-strong)] bg-[var(--gallery-surface)] px-3 py-1.5 text-sm font-medium tracking-tight text-[var(--gallery-text-primary)] shadow-[var(--gallery-shadow-sm)] transition-colors hover:border-[var(--gallery-text-quaternary)] hover:bg-[var(--gallery-surface-subtle)]"
          >
            <Archive className="size-4 shrink-0 opacity-80" aria-hidden />
            <span>{showArchived ? "Hide Archived" : "Show Archived"}</span>
          </button>
        ) : null}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {visibleEntries.map((entry) => (
          <GalleryCard
            key={`${entry.group}-${entry.model}`}
            entry={entry}
            archived={searching && isGalleryModelArchivedWithinGroup(allEntries, entry)}
            newSince={getGalleryEntryNewArrival(allEntries, entry, referenceTime)}
          />
        ))}
      </div>
    </section>
  );
}
