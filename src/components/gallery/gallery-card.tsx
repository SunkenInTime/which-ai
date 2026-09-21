import Image from "next/image";
import Link from "next/link";
import { Archive, ArrowLeftRight } from "lucide-react";
import { GalleryCardLeavingSoonBookmark } from "@/components/gallery/gallery-card-leaving-soon";
import { GalleryCardNewArrivalTag } from "@/components/gallery/gallery-card-new-arrival";
import { ModelBrandLogo } from "@/components/gallery/model-brand-logo";
import { buildCompareHrefForSelection } from "@/lib/compare";
import { isGalleryModelLeavingSoon } from "@/lib/gallery-archived";
import { formatGalleryAddedDate, type GalleryIsoDate } from "@/lib/gallery-recency";
import type { GalleryEntry } from "@/lib/gallery-types";
import { buildVariantHref } from "@/lib/gallery-paths";

export function GalleryCard({
  entry,
  archived = false,
  newSince = null,
}: {
  entry: GalleryEntry;
  /** Shown when an archived row surfaces outside its "Show Archived" fold, e.g. in search results. */
  archived?: boolean;
  /** Added-at date when the entry is a new arrival; drives the "hey, I'm here" treatment. */
  newSince?: GalleryIsoDate | null;
}) {
  const leavingSoon = isGalleryModelLeavingSoon(entry.model);
  const isNew = newSince !== null && !archived;
  return (
    <article
      data-testid="gallery-card"
      data-new-arrival={isNew ? "true" : undefined}
      className="group gallery-card-shell gallery-elevated-surface relative flex flex-col overflow-hidden rounded-lg border bg-[var(--gallery-surface)] transition-transform duration-300 ease-out hover:-translate-y-1.5"
    >
      <Link
        href={buildVariantHref(entry.group, entry.model, entry.defaultIteration)}
        className="block bg-[var(--gallery-surface-muted)]"
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={entry.iterations[0].thumbnailPath}
            alt={`${entry.modelLabel} preview`}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-95"
          />
          {/* Box-shadow paints beneath the filled Image; overlay gradient is visible on top. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0_/_0.05)_0%,transparent_38%)]"
          />
          {isNew ? <GalleryCardNewArrivalTag /> : null}
          {leavingSoon ? <GalleryCardLeavingSoonBookmark /> : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="space-y-1">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--gallery-text-tertiary)]">
            <span>{entry.groupLabel}</span>
            {isNew ? (
              <span
                data-testid="gallery-card-new-arrival"
                className="inline-flex items-center gap-1 font-medium text-[var(--gallery-accent)]"
              >
                <span className="sr-only">New arrival, </span>
                <time dateTime={newSince}>Added {formatGalleryAddedDate(newSince)}</time>
              </span>
            ) : null}
            {archived ? (
              <span className="inline-flex items-center gap-1 rounded border border-[var(--gallery-border)] bg-[var(--gallery-surface-subtle)] px-1.5 py-px text-[11px] font-medium text-[var(--gallery-text-quaternary)]">
                <Archive className="size-3 opacity-80" aria-hidden />
                Archived
              </span>
            ) : null}
          </p>
          <h3 className="flex flex-wrap items-center gap-2 text-lg font-medium tracking-tight text-[var(--gallery-text-primary)]">
            <span>{entry.modelLabel}</span>
            <ModelBrandLogo
              model={entry.model}
              alt=""
              width={28}
              height={28}
              className="h-[1em] w-auto shrink-0 object-contain"
              aria-hidden
            />
          </h3>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {entry.iterations.map((iteration) => (
              <Link
                key={iteration.id}
                href={buildVariantHref(entry.group, entry.model, iteration.id)}
                className="inline-flex size-8 items-center justify-center rounded-md border border-[var(--gallery-border)] bg-[var(--gallery-surface-subtle)] text-xs font-medium tabular-nums leading-none text-[var(--gallery-text-secondary)] transition-colors hover:border-[var(--gallery-divider-strong)] hover:bg-[var(--gallery-surface)] hover:text-[var(--gallery-text-primary)]"
              >
                {iteration.id}
              </Link>
            ))}
          </div>
          <Link
            href={buildCompareHrefForSelection({
              group: entry.group,
              model: entry.model,
              iteration: "1",
            })}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-[var(--gallery-border)] bg-[var(--gallery-surface-subtle)] text-[var(--gallery-text-secondary)] transition-colors hover:border-[var(--gallery-divider-strong)] hover:bg-[var(--gallery-surface)] hover:text-[var(--gallery-text-primary)]"
            aria-label={`Compare ${entry.groupLabel} ${entry.modelLabel}`}
            title="Compare"
          >
            <ArrowLeftRight className="size-4" strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
