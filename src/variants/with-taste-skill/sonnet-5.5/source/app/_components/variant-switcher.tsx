"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  CaretLeft,
  CaretRight,
  Monitor,
  Moon,
  Sun,
} from "@phosphor-icons/react";
import { VARIANTS } from "../_lib/variants";

type ThemePref = "auto" | "light" | "dark";
const THEME_KEY = "pith-theme";
const NEXT_THEME: Record<ThemePref, ThemePref> = {
  auto: "light",
  light: "dark",
  dark: "auto",
};
const THEME_LABEL: Record<ThemePref, string> = {
  auto: "Theme: follows system",
  light: "Theme: light",
  dark: "Theme: dark",
};

function applyTheme(pref: ThemePref) {
  const root = document.documentElement;
  if (pref === "auto") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", pref);
}

/* The saved pick lives in localStorage; this is the small store React reads it through. */
const themeListeners = new Set<() => void>();

function subscribeTheme(listener: () => void) {
  themeListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    themeListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readTheme(): ThemePref {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : "auto";
  } catch {
    return "auto";
  }
}

function writeTheme(next: ThemePref) {
  applyTheme(next);
  try {
    if (next === "auto") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, next);
  } catch {}
  themeListeners.forEach((listener) => listener());
}

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

/**
 * Floating control for flipping between the five iterations.
 * Keys: left/right arrows step through, 1-5 jump straight to one.
 */
export function VariantSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useSyncExternalStore<ThemePref>(subscribeTheme, readTheme, () => "auto");

  const current = VARIANTS.find((v) => pathname === `/${v.n}`)?.n ?? null;

  const cycleTheme = useCallback(() => writeTheme(NEXT_THEME[readTheme()]), []);

  const go = useCallback(
    (n: number) => {
      const total = VARIANTS.length;
      const wrapped = ((n - 1 + total) % total) + 1;
      router.push(`/${wrapped}`);
    },
    [router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;
      if (e.key === "ArrowLeft" && current) go(current - 1);
      else if (e.key === "ArrowRight" && current) go(current + 1);
      else if (/^[1-5]$/.test(e.key)) go(Number(e.key));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  const ThemeIcon = theme === "auto" ? Monitor : theme === "light" ? Sun : Moon;

  return (
    <motion.nav
      aria-label="Design iterations"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.4 }}
      className="fixed inset-x-0 bottom-4 z-(--z-switcher) mx-auto flex w-fit items-center gap-1 rounded-full bg-zinc-950/85 p-1 font-[family-name:var(--v-mono)] text-[13px] text-zinc-100 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/15 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] print:hidden"
    >
      <button
        type="button"
        aria-label="Previous iteration"
        onClick={() => go((current ?? 1) - 1)}
        className="grid size-8 place-items-center rounded-full text-zinc-300 transition-[background-color,transform] duration-200 hover:bg-white/10 hover:text-white active:scale-95"
      >
        <CaretLeft size={14} weight="bold" />
      </button>

      <ul className="flex items-center gap-0.5">
        {VARIANTS.map((v) => {
          const active = v.n === current;
          return (
            <li key={v.n} className="group relative">
              <Link
                href={`/${v.n}`}
                aria-label={`Iteration ${v.n}: ${v.name}`}
                aria-current={active ? "page" : undefined}
                className="relative grid size-8 place-items-center rounded-full transition-colors duration-200 hover:text-white active:scale-95"
              >
                {active && (
                  <motion.span
                    layoutId="switcher-active"
                    className="absolute inset-0 rounded-full bg-zinc-100"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={
                    active
                      ? "relative font-semibold text-zinc-950"
                      : "relative text-zinc-300 group-hover:text-white"
                  }
                >
                  {v.n}
                </span>
              </Link>
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-zinc-950/95 px-3 py-1.5 text-xs text-zinc-100 opacity-0 ring-1 ring-white/15 transition-opacity duration-150 group-hover:opacity-100"
              >
                {v.name}
              </span>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        aria-label="Next iteration"
        onClick={() => go((current ?? 0) + 1)}
        className="grid size-8 place-items-center rounded-full text-zinc-300 transition-[background-color,transform] duration-200 hover:bg-white/10 hover:text-white active:scale-95"
      >
        <CaretRight size={14} weight="bold" />
      </button>

      <span aria-hidden className="mx-0.5 h-4 w-px bg-white/15" />

      <button
        type="button"
        onClick={cycleTheme}
        aria-label={THEME_LABEL[theme]}
        title={THEME_LABEL[theme]}
        className="grid size-8 place-items-center rounded-full text-zinc-300 transition-[background-color,transform] duration-200 hover:bg-white/10 hover:text-white active:scale-95"
      >
        <ThemeIcon size={16} weight="bold" />
      </button>
    </motion.nav>
  );
}
