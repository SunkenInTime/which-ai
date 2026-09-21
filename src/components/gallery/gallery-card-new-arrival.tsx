/** Corner tag on the thumbnail. Decorative: the card's meta row carries the accessible text. */
export function GalleryCardNewArrivalTag() {
  return (
    <div className="pointer-events-none absolute left-3 top-3 z-10 sm:left-4 sm:top-4" aria-hidden>
      <span className="gallery-new-arrival-tag inline-flex h-6 items-center gap-1.5 rounded-full bg-[var(--gallery-accent)] pl-2.5 pr-3 text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-[var(--gallery-accent-foreground)] sm:text-[11px]">
        <span className="size-1.5 rounded-full bg-current opacity-80" />
        New
      </span>
    </div>
  );
}
