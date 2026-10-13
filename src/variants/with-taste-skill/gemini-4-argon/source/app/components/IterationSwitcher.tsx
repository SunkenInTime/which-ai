"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Stack,
  CaretUp,
  CaretDown,
  ArrowLeft,
  ArrowRight,
  Sliders,
} from "@phosphor-icons/react";
import { Z_INDEX } from "./z-index";
import { ITERATIONS } from "./iterations-data";

export function IterationSwitcher() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const currentIndex = ITERATIONS.findIndex((it) => it.path === pathname);
  const current = currentIndex >= 0 ? ITERATIONS[currentIndex] : ITERATIONS[0];
  const prev =
    ITERATIONS[(currentIndex - 1 + ITERATIONS.length) % ITERATIONS.length];
  const next = ITERATIONS[(currentIndex + 1) % ITERATIONS.length];

  return (
    <aside
      aria-label="Design iteration switcher"
      className={`fixed bottom-4 right-4 ${Z_INDEX.switcher} font-sans`}
    >
      {expanded && (
        <div className="mb-2 w-80 rounded-2xl border border-zinc-200/90 bg-white/95 p-3.5 text-zinc-900 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95 dark:text-zinc-100">
          <div className="mb-2.5 flex items-center justify-between border-b border-zinc-200/80 pb-2 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <Sliders size={15} weight="regular" />
              <span>Second-Brain Design Iterations</span>
            </div>
            <Link
              href="/"
              onClick={() => setExpanded(false)}
              className="text-xs font-medium text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Overview
            </Link>
          </div>
          <div className="space-y-1.5">
            {ITERATIONS.map((it) => {
              const active = pathname === it.path;
              return (
                <Link
                  key={it.id}
                  href={it.path}
                  onClick={() => setExpanded(false)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-left transition-colors ${
                    active
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="font-mono">/{it.id}</span>
                      <span>{it.brand}</span>
                      <span
                        className={`text-[11px] font-normal ${
                          active
                            ? "text-zinc-300 dark:text-zinc-600"
                            : "text-zinc-500 dark:text-zinc-400"
                        }`}
                      >
                        ({it.title})
                      </span>
                    </div>
                    <p
                      className={`mt-0.5 text-[11px] ${
                        active
                          ? "text-zinc-300 dark:text-zinc-700"
                          : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {it.archetype}
                    </p>
                  </div>
                  <span
                    className={`font-mono text-[10px] ${
                      active
                        ? "text-zinc-200 dark:text-zinc-800"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {it.dials.variance}/{it.dials.motion}/{it.dials.density}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 rounded-full border border-zinc-300/90 bg-white/95 p-1.5 text-zinc-900 shadow-lg backdrop-blur-md dark:border-zinc-700/90 dark:bg-zinc-900/95 dark:text-zinc-100">
        <Link
          href={prev.path}
          aria-label={`Previous iteration (${prev.brand})`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-transform hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.96] dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          <ArrowLeft size={14} weight="bold" />
        </Link>

        <div className="flex items-center gap-1 px-1">
          {ITERATIONS.map((it) => {
            const active = pathname === it.path;
            return (
              <Link
                key={it.id}
                href={it.path}
                aria-label={`Iteration ${it.id}: ${it.brand}`}
                aria-current={active ? "page" : undefined}
                className={`flex h-8 min-w-8 items-center justify-center rounded-full px-2.5 font-mono text-xs font-semibold transition-all active:scale-[0.96] ${
                  active
                    ? "bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                }`}
              >
                /{it.id}
              </Link>
            );
          })}
        </div>

        <Link
          href={next.path}
          aria-label={`Next iteration (${next.brand})`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-transform hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.96] dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          <ArrowRight size={14} weight="bold" />
        </Link>

        <button
          type="button"
          onClick={() => setExpanded((prevVal) => !prevVal)}
          aria-expanded={expanded}
          aria-label="Toggle iteration details"
          className="ml-0.5 flex h-8 items-center gap-1.5 rounded-full bg-zinc-100 px-3 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-200 active:scale-[0.98] dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          <Stack size={14} weight="regular" />
          <span className="hidden sm:inline">{current.brand}</span>
          {expanded ? (
            <CaretDown size={12} weight="bold" />
          ) : (
            <CaretUp size={12} weight="bold" />
          )}
        </button>
      </div>
    </aside>
  );
}
