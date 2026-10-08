"use client";

import clsx from "clsx";
import Link from "next/link";
import { Check, Clapperboard, PanelLeft, PanelRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ThemeAwareLogo } from "@/components/gallery/theme-aware-logo";
import { getPopoverClass, switcherButtonClass } from "@/components/gallery/variant-header";
import {
  getServerGallerySwitcherSide,
  getStoredGallerySwitcherSide,
  setStoredGallerySwitcherSide,
  subscribeGallerySwitcherSide,
} from "@/lib/gallery-switcher-side";

type Logo = { light: string; dark?: string } | null;

export interface MotionSwitcherOption {
  id: string;
  label: string;
  logo: Logo;
  /** Null when that model has no finished video for this iteration. */
  href: string | null;
}

export interface MotionSwitcherIteration {
  n: number;
  href: string;
  hasVideo: boolean;
}

type PickerMode = "compare" | "model" | null;

/** The gallery's docked switcher, for motion videos: home, compare, model, and the three tries. */
export function MotionSwitcher({
  modelId,
  modelLabel,
  logo,
  iteration,
  iterations,
  models,
  compares,
}: {
  modelId: string;
  modelLabel: string;
  logo: Logo;
  iteration: number;
  iterations: MotionSwitcherIteration[];
  models: MotionSwitcherOption[];
  /** Compare targets: every other finished video at this iteration, plus this model's other tries. */
  compares: MotionSwitcherOption[];
}) {
  const router = useRouter();
  const [openPicker, setOpenPicker] = useState<PickerMode>(null);
  const side = useSyncExternalStore(
    subscribeGallerySwitcherSide,
    getStoredGallerySwitcherSide,
    getServerGallerySwitcherSide,
  );
  const popoverClass = getPopoverClass(side);
  const pickerRef = useRef<HTMLElement | null>(null);
  const firstCompare = compares.find((option) => option.href)?.href ?? null;

  useEffect(() => {
    if (!openPicker) return;
    function handlePointerDown(event: MouseEvent) {
      if (pickerRef.current?.contains(event.target as Node)) return;
      setOpenPicker(null);
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPicker(null);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openPicker]);

  // Same shortcuts as the gallery: h home, c compare, 1-3 tries, ⌘K models.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenPicker((open) => (open === "model" ? null : "model"));
        return;
      }
      const target = e.target as HTMLElement | null;
      if (
        e.defaultPrevented ||
        e.isComposing ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === "h") {
        e.preventDefault();
        router.push("/motion");
        return;
      }
      if (key === "c" && firstCompare) {
        e.preventDefault();
        router.push(firstCompare);
        return;
      }
      const match = iterations.find((item) => String(item.n) === key);
      if (match) {
        e.preventDefault();
        router.push(match.href);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [firstCompare, iterations, router]);

  return (
    <nav
      ref={pickerRef}
      aria-label={`${modelLabel} motion navigation`}
      data-side={side}
      className={clsx(
        "gallery-variant-switcher gallery-elevated-surface fixed top-5 z-[100] flex w-auto flex-col items-center gap-1 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] px-1 py-1 text-[var(--gallery-text-tertiary)] shadow-[var(--gallery-shadow-sm)] backdrop-blur-[12px] sm:top-6",
        side === "left" ? "left-5 sm:left-6" : "right-5 sm:right-6",
      )}
    >
      <Link href="/motion" aria-label="Back to Motion" className={switcherButtonClass}>
        <Clapperboard className="size-4 shrink-0 opacity-80" aria-hidden="true" />
      </Link>
      <div className="h-px w-full shrink-0 bg-[var(--gallery-border)]" aria-hidden="true" />
      <span className="relative inline-flex">
        <button
          type="button"
          aria-label={`Compare ${modelLabel} video ${iteration}`}
          aria-expanded={openPicker === "compare"}
          className={clsx(switcherButtonClass, "text-[10px] font-semibold tracking-[0.12em]")}
          onClick={() => setOpenPicker((open) => (open === "compare" ? null : "compare"))}
        >
          VS
        </button>
        {openPicker === "compare" ? (
          <OptionList label="Compare with" options={compares} activeId={null} className={popoverClass} />
        ) : null}
      </span>
      <div className="h-px w-full shrink-0 bg-[var(--gallery-border)]" aria-hidden="true" />
      <span className="relative inline-flex">
        <button
          type="button"
          className={clsx(switcherButtonClass, "group/logo")}
          aria-label={`Switch model from ${modelLabel}`}
          aria-expanded={openPicker === "model"}
          onClick={() => setOpenPicker((open) => (open === "model" ? null : "model"))}
        >
          {logo ? (
            <ThemeAwareLogo
              lightSrc={logo.light}
              darkSrc={logo.dark}
              alt=""
              width={22}
              height={22}
              className="size-[1.375rem] object-contain opacity-90 transition-opacity duration-200 group-hover/logo:opacity-100"
              aria-hidden
            />
          ) : (
            <span className="text-[11px] font-semibold">{modelLabel.slice(0, 2)}</span>
          )}
        </button>
        {openPicker === "model" ? (
          <OptionList label="Switch model" options={models} activeId={modelId} className={popoverClass} />
        ) : null}
      </span>
      <div className="h-px w-full shrink-0 bg-[var(--gallery-border)]" aria-hidden="true" />
      <div className="flex flex-col items-center gap-1" role="group" aria-label="Videos">
        {iterations.map((item) => {
          const active = item.n === iteration;
          return (
            <Link
              key={item.n}
              href={item.href}
              aria-current={active ? "page" : undefined}
              aria-label={`Open video ${item.n}${item.hasVideo ? "" : " (no video)"}`}
              className={clsx(
                "gallery-variant-switcher__iteration inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-[11px] font-medium tabular-nums leading-none transition-colors",
                active
                  ? "bg-[var(--gallery-accent)] text-[var(--gallery-accent-foreground)]"
                  : item.hasVideo
                    ? "text-[var(--gallery-text-secondary)] hover:bg-[var(--gallery-hover-bg)] hover:text-[var(--gallery-text-primary)]"
                    : "text-[var(--gallery-text-quaternary)] hover:bg-[var(--gallery-hover-bg)]",
              )}
            >
              {item.n}
            </Link>
          );
        })}
      </div>
      <div className="h-px w-full shrink-0 bg-[var(--gallery-border)]" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setStoredGallerySwitcherSide(side === "left" ? "right" : "left")}
        aria-label={side === "left" ? "Dock sidebar on the right" : "Dock sidebar on the left"}
        title={side === "left" ? "Dock right" : "Dock left"}
        className={switcherButtonClass}
      >
        {side === "left" ? (
          <PanelRight className="size-4 shrink-0 opacity-80" aria-hidden="true" />
        ) : (
          <PanelLeft className="size-4 shrink-0 opacity-80" aria-hidden="true" />
        )}
      </button>
    </nav>
  );
}

function OptionList({
  label,
  options,
  activeId,
  className,
}: {
  label: string;
  options: MotionSwitcherOption[];
  activeId: string | null;
  className: string;
}) {
  return (
    <div className={className} role="menu" aria-label={label}>
      <p className="px-3 pt-1 pb-0.5 text-[11px] font-medium text-[var(--gallery-text-quaternary)]">{label}</p>
      {options.map((option) => {
        const active = option.id === activeId;
        const content = (
          <>
            <span className="flex min-w-0 flex-1 items-center gap-3">
              {option.logo ? (
                <ThemeAwareLogo
                  lightSrc={option.logo.light}
                  darkSrc={option.logo.dark}
                  alt=""
                  width={18}
                  height={18}
                  className={clsx("size-[18px] rounded-sm object-contain", !option.href && "grayscale opacity-55")}
                />
              ) : null}
              <span className="min-w-0">
                <span className="block truncate font-medium">{option.label}</span>
                {!option.href ? (
                  <span className="block truncate text-[11px] text-[var(--gallery-text-quaternary)]">No video yet</span>
                ) : null}
              </span>
            </span>
            {active ? <Check className="size-3.5 shrink-0" aria-hidden /> : null}
          </>
        );
        const itemClass = clsx(
          "flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-150",
          active
            ? "bg-[var(--gallery-accent)]/12 text-[var(--gallery-text-primary)]"
            : option.href
              ? "bg-[var(--gallery-surface)] text-[var(--gallery-text-primary)] hover:bg-[var(--gallery-accent)]/10"
              : "cursor-not-allowed bg-[var(--gallery-surface-muted)] text-[var(--gallery-text-quaternary)] opacity-65",
        );
        return option.href ? (
          <Link key={option.id} href={option.href} className={itemClass} role="menuitem">
            {content}
          </Link>
        ) : (
          <button key={option.id} type="button" disabled className={itemClass} role="menuitem">
            {content}
          </button>
        );
      })}
    </div>
  );
}
