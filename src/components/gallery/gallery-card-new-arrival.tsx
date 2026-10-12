import { formatGalleryAddedDate, type GalleryIsoDate } from "@/lib/gallery-recency";

/** Corner tag on the thumbnail, carrying the added date so the card body stays clean. */
export function GalleryCardNewArrivalTag({ addedAt }: { addedAt: GalleryIsoDate }) {
  return (
    <div className="pointer-events-none absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
      <span
        data-testid="gallery-card-new-arrival"
        className="inline-flex h-6 items-center gap-1.5 rounded-md border border-[var(--gallery-border)] bg-[var(--gallery-tooltip-bg)] px-2 text-xs font-medium leading-none tracking-tight text-[var(--gallery-text-primary)] shadow-[var(--gallery-shadow-sm)] backdrop-blur-md"
      >
        <span className="gallery-new-dot" aria-hidden />
        <span aria-hidden>New</span>
        <span className="sr-only">New arrival, added </span>
        <time dateTime={addedAt} className="text-[var(--gallery-text-tertiary)]">
          {formatGalleryAddedDate(addedAt)}
        </time>
      </span>
    </div>
  );
}
