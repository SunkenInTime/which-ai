"use client";

import clsx from "clsx";
import { ArrowLeftRight, BarChart3, Clapperboard, Gamepad2, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GalleryThemeToggle } from "@/components/gallery/gallery-theme-toggle";
import { buildCompareHref, DEFAULT_COMPARE_STATE } from "@/lib/compare";

const navLinkBase =
  "relative inline-flex h-9 shrink-0 items-center justify-center overflow-hidden rounded-md transition-colors duration-150";

// Below sm the labelled links collapse to icons so the fixed nav fits a phone; labels stay for screen readers.
const navLinkTextPad = "min-w-9 sm:px-3";

function navLinkClass(active: boolean) {
  return clsx(
    navLinkBase,
    active
      ? "text-[var(--gallery-accent)] hover:bg-[color-mix(in_srgb,var(--gallery-accent)_10%,var(--gallery-accent-hover-mix))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--gallery-accent)_45%,transparent)]"
      : "text-[var(--gallery-text-secondary)] hover:bg-[color-mix(in_srgb,var(--gallery-accent)_12%,var(--gallery-accent-hover-mix))] hover:text-[var(--gallery-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--gallery-accent)_45%,transparent)]",
  );
}

export function GalleryRankingsNav() {
  const pathname = usePathname();
  const onRankings = pathname === "/rankings";
  const onCompare = pathname === "/compare";
  const onLabGuess = pathname === "/lab-guess";
  const onMotion = pathname === "/motion" || pathname.startsWith("/motion/");
  const onGalleryHome = pathname === "/";
  const homeShowsGalleryLabel = onRankings || onCompare || onLabGuess || onMotion;

  return (
    <nav
      aria-label="Site navigation"
      className="fixed top-5 right-5 z-[110] flex items-center gap-0.5 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] px-1 py-1 text-[var(--gallery-text-secondary)] shadow-[var(--gallery-shadow-sm)] backdrop-blur-[12px] sm:top-6 sm:right-6 gallery-elevated-surface"
    >
      <Link
        href="/"
        aria-label={homeShowsGalleryLabel ? undefined : "Gallery"}
        aria-current={onGalleryHome ? "page" : undefined}
        className={clsx(
          navLinkClass(onGalleryHome),
          homeShowsGalleryLabel ? navLinkTextPad : "min-w-9",
        )}
      >
        {homeShowsGalleryLabel ? (
          <>
            <Home className="size-4 shrink-0 sm:hidden" aria-hidden />
            <span className="sr-only text-sm font-medium tracking-tight sm:not-sr-only">Gallery</span>
          </>
        ) : (
          <span className="inline-flex size-9 items-center justify-center text-current">
            <Home className="size-4 shrink-0" aria-hidden />
          </span>
        )}
      </Link>

      <div
        className="h-6 w-px shrink-0 bg-[var(--gallery-divider)]/90"
        aria-hidden="true"
      />

      <Link
        href={buildCompareHref(DEFAULT_COMPARE_STATE)}
        aria-label={onCompare ? "Compare" : undefined}
        aria-current={onCompare ? "page" : undefined}
        className={clsx(
          navLinkClass(onCompare),
          onCompare ? "min-w-9" : navLinkTextPad,
        )}
      >
        {onCompare ? (
          <span className="inline-flex size-9 items-center justify-center text-current">
            <ArrowLeftRight className="size-4 shrink-0 opacity-90" aria-hidden />
          </span>
        ) : (
          <>
            <ArrowLeftRight className="size-4 shrink-0 opacity-90 sm:hidden" aria-hidden />
            <span className="sr-only whitespace-nowrap text-sm font-medium tracking-tight sm:not-sr-only">
              Compare
            </span>
          </>
        )}
      </Link>

      <div
        className="h-6 w-px shrink-0 bg-[var(--gallery-divider)]/90"
        aria-hidden="true"
      />

      <Link
        href="/lab-guess"
        aria-label={onLabGuess ? "Guess which" : undefined}
        aria-current={onLabGuess ? "page" : undefined}
        className={clsx(
          navLinkClass(onLabGuess),
          onLabGuess ? "min-w-9" : navLinkTextPad,
        )}
      >
        {onLabGuess ? (
          <span className="inline-flex size-9 items-center justify-center text-current">
            <Gamepad2 className="size-4 shrink-0 opacity-90" aria-hidden />
          </span>
        ) : (
          <>
            <Gamepad2 className="size-4 shrink-0 opacity-90 sm:hidden" aria-hidden />
            <span className="sr-only whitespace-nowrap text-sm font-medium tracking-tight sm:not-sr-only">
              Guess which
            </span>
          </>
        )}
      </Link>

      <div
        className="h-6 w-px shrink-0 bg-[var(--gallery-divider)]/90"
        aria-hidden="true"
      />

      <Link
        href="/motion"
        aria-label={onMotion ? "Motion" : undefined}
        aria-current={onMotion ? "page" : undefined}
        className={clsx(
          navLinkClass(onMotion),
          onMotion ? "min-w-9" : navLinkTextPad,
        )}
      >
        {onMotion ? (
          <span className="inline-flex size-9 items-center justify-center text-current">
            <Clapperboard className="size-4 shrink-0 opacity-90" aria-hidden />
          </span>
        ) : (
          <>
            <Clapperboard className="size-4 shrink-0 opacity-90 sm:hidden" aria-hidden />
            <span className="sr-only whitespace-nowrap text-sm font-medium tracking-tight sm:not-sr-only">
              Motion
            </span>
          </>
        )}
      </Link>

      <div
        className="h-6 w-px shrink-0 bg-[var(--gallery-divider)]/90"
        aria-hidden="true"
      />

      <Link
        href="/rankings"
        aria-label={onRankings ? "Rankings" : undefined}
        aria-current={onRankings ? "page" : undefined}
        className={clsx(
          navLinkClass(onRankings),
          onRankings ? "min-w-9" : navLinkTextPad,
        )}
      >
        {onRankings ? (
          <span className="inline-flex size-9 items-center justify-center text-current">
            <BarChart3 className="size-4 shrink-0 opacity-90" aria-hidden />
          </span>
        ) : (
          <>
            <BarChart3 className="size-4 shrink-0 opacity-90 sm:hidden" aria-hidden />
            <span className="sr-only whitespace-nowrap text-sm font-medium tracking-tight sm:not-sr-only">
              Rankings
            </span>
          </>
        )}
      </Link>

      <div
        className="h-6 w-px shrink-0 bg-[var(--gallery-divider)]/90"
        aria-hidden="true"
      />

      <GalleryThemeToggle />
    </nav>
  );
}
