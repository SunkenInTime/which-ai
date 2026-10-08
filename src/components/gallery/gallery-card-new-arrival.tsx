import { formatGalleryAddedDate, type GalleryIsoDate } from "@/lib/gallery-recency";

/** Corner tag on the thumbnail, carrying the added date so the card body stays clean. */
export function GalleryCardNewArrivalTag({ addedAt }: { addedAt: GalleryIsoDate }) {
  return (
    <div className="pointer-events-none absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
      <span
        data-testid="gallery-card-new-arrival"
        className="gallery-new-arrival-tag inline-flex h-6 items-center gap-1.5 rounded-full bg-[var(--gallery-accent)] pl-2.5 pr-3 text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-[var(--gallery-accent-foreground)] sm:text-[11px]"
      >
        <span className="size-1.5 rounded-full bg-current opacity-80" aria-hidden />
        <span aria-hidden>New</span>
        <span className="opacity-60" aria-hidden>
          ·
        </span>
        <span className="sr-only">New arrival, added </span>
        <time dateTime={addedAt}>{formatGalleryAddedDate(addedAt)}</time>
      </span>
    </div>
  );
}
