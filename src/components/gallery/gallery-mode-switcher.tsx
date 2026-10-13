"use client";

import clsx from "clsx";
import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { type GalleryIsoDate, isGalleryDateRecent } from "@/lib/gallery-recency";

/** The day the motion gallery went live; the Motion tab carries a New dot for the new-arrival window after it. */
const MOTION_LAUNCHED_AT: GalleryIsoDate = "2026-10-12";

const PILL_SPRING = { type: "spring" as const, stiffness: 520, damping: 42 };

const modes = [
  { id: "frontend", href: "/", label: "Frontend" },
  { id: "motion", href: "/motion", label: "Motion" },
] as const;

export type GalleryMode = (typeof modes)[number]["id"];

/**
 * Switches between the frontend and motion galleries. `now` is the page's reference time, for the New dot.
 * The pill slides to a tab as soon as it's clicked; both pages put the switcher in the same spot, so the next
 * page's switcher picks up where the slide ends.
 */
export function GalleryModeSwitcher({ active, now }: { active: GalleryMode; now?: number }) {
  const [selected, setSelected] = useState<GalleryMode>(active);
  const motionIsNew = now !== undefined && isGalleryDateRecent(MOTION_LAUNCHED_AT, now);

  return (
    <MotionConfig reducedMotion="user">
      <nav
        aria-label="Gallery type"
        className="gallery-elevated-surface inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] p-1 shadow-[var(--gallery-shadow-sm)]"
      >
        {modes.map((mode) => {
          const current = mode.id === active;
          const lit = mode.id === selected;
          return (
            <Link
              key={mode.id}
              href={mode.href}
              aria-current={current ? "page" : undefined}
              onClick={(event) => {
                // A modified click opens the other gallery in a new tab, so this page's pill stays put.
                if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                  setSelected(mode.id);
                }
              }}
              className={clsx(
                "relative inline-flex h-8 items-center rounded-md px-3 text-sm font-medium tracking-tight transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--gallery-accent)_45%,transparent)]",
                lit
                  ? "text-[var(--gallery-accent)]"
                  : "text-[var(--gallery-text-secondary)] hover:bg-[var(--gallery-hover-bg)] hover:text-[var(--gallery-text-primary)]",
              )}
            >
              {lit ? (
                <motion.span
                  layoutId="gallery-mode-pill"
                  transition={PILL_SPRING}
                  className="absolute inset-0 rounded-md bg-[color-mix(in_srgb,var(--gallery-accent)_10%,var(--gallery-accent-hover-mix))]"
                  aria-hidden
                />
              ) : null}
              <span className="relative">{mode.label}</span>
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
    </MotionConfig>
  );
}
