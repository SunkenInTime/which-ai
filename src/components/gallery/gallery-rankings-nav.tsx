"use client";

import clsx from "clsx";
import { ArrowLeftRight, BarChart3, Clapperboard, Gamepad2, Home, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GalleryThemeToggle } from "@/components/gallery/gallery-theme-toggle";
import { buildCompareHref, DEFAULT_COMPARE_STATE } from "@/lib/compare";

const navLinkBase =
  "relative inline-flex h-9 shrink-0 items-center justify-center overflow-hidden rounded-md transition-colors duration-150";


function navLinkClass(active: boolean) {
  return clsx(
    navLinkBase,
    active
      ? "text-[var(--gallery-accent)] hover:bg-[color-mix(in_srgb,var(--gallery-accent)_10%,var(--gallery-accent-hover-mix))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--gallery-accent)_45%,transparent)]"
      : "text-[var(--gallery-text-secondary)] hover:bg-[color-mix(in_srgb,var(--gallery-accent)_12%,var(--gallery-accent-hover-mix))] hover:text-[var(--gallery-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--gallery-accent)_45%,transparent)]",
  );
}

// A link shows its icon when it's the current page, and its label otherwise. Phones always get the icon: with
// every label spelled out the bar is wider than a 390px screen and pushes the first link off the edge.
function NavItem({
  href,
  label,
  icon: Icon,
  active,
  showLabel,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  showLabel: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={clsx(navLinkClass(active), "min-w-9", showLabel && "sm:px-3")}
    >
      <span className={clsx("inline-flex size-9 items-center justify-center text-current", showLabel && "sm:hidden")}>
        <Icon className="size-4 shrink-0 opacity-90" aria-hidden />
      </span>
      {showLabel ? (
        <span className="hidden whitespace-nowrap text-sm font-medium tracking-tight sm:inline">{label}</span>
      ) : null}
    </Link>
  );
}

function NavDivider() {
  return <div className="h-6 w-px shrink-0 bg-[var(--gallery-divider)]/90" aria-hidden="true" />;
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
      <NavItem href="/" label="Gallery" icon={Home} active={onGalleryHome} showLabel={homeShowsGalleryLabel} />
      <NavDivider />
      <NavItem
        href={buildCompareHref(DEFAULT_COMPARE_STATE)}
        label="Compare"
        icon={ArrowLeftRight}
        active={onCompare}
        showLabel={!onCompare}
      />
      <NavDivider />
      <NavItem href="/lab-guess" label="Guess which" icon={Gamepad2} active={onLabGuess} showLabel={!onLabGuess} />
      <NavDivider />
      <NavItem href="/motion" label="Motion" icon={Clapperboard} active={onMotion} showLabel={!onMotion} />
      <NavDivider />
      <NavItem href="/rankings" label="Rankings" icon={BarChart3} active={onRankings} showLabel={!onRankings} />
      <NavDivider />
      <GalleryThemeToggle />
    </nav>
  );
}
