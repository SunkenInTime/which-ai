import clsx from "clsx";
import Link from "next/link";
import { type GalleryIsoDate, isGalleryDateRecent } from "@/lib/gallery-recency";

/** The day the motion gallery went live; the Motion tab carries a New dot for the new-arrival window after it. */
const MOTION_LAUNCHED_AT: GalleryIsoDate = "2026-10-12";

const modes = [
  { id: "frontend", href: "/", label: "Frontend" },
  { id: "motion", href: "/motion", label: "Motion" },
] as const;

export type GalleryMode = (typeof modes)[number]["id"];

/** Switches between the frontend and motion galleries. `now` is the page's reference time, for the New dot. */
export function GalleryModeSwitcher({ active, now }: { active: GalleryMode; now?: number }) {
  const motionIsNew = now !== undefined && isGalleryDateRecent(MOTION_LAUNCHED_AT, now);

  return (
    <nav
      aria-label="Gallery type"
      className="gallery-elevated-surface inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] p-1 shadow-[var(--gallery-shadow-sm)]"
    >
      {modes.map((mode) => {
        const current = mode.id === active;
        return (
          <Link
            key={mode.id}
            href={mode.href}
            aria-current={current ? "page" : undefined}
            className={clsx(
              "relative inline-flex h-8 items-center rounded-md px-3 text-sm font-medium tracking-tight transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--gallery-accent)_45%,transparent)]",
              current
                ? "bg-[color-mix(in_srgb,var(--gallery-accent)_10%,var(--gallery-accent-hover-mix))] text-[var(--gallery-accent)]"
                : "text-[var(--gallery-text-secondary)] hover:bg-[var(--gallery-hover-bg)] hover:text-[var(--gallery-text-primary)]",
            )}
          >
            {mode.label}
            {mode.id === "motion" && motionIsNew && !current ? (
              <>
                <span className="absolute top-1.5 right-1.5 flex" aria-hidden>
                  <span className="gallery-new-dot" />
                </span>
                <span className="sr-only">, new</span>
              </>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
