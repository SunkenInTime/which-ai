"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const iterations = [
  {
    id: "1",
    name: "Neural Noir",
    description: "Graph-first intelligence in a cinematic dark interface",
  },
  {
    id: "2",
    name: "Editorial Zen",
    description: "A quiet, paper-like home for deep thinking",
  },
  {
    id: "3",
    name: "Command Center",
    description: "High-density modular productivity with brutalist energy",
  },
  {
    id: "4",
    name: "Ambient Memory",
    description: "Soft, emotional, human-centered memory capture",
  },
  {
    id: "5",
    name: "Cortex Console",
    description: "Precision AI research lab meets private memory terminal",
  },
];

export default function IterationSwitcher() {
  const pathname = usePathname();
  const active = /^\/([1-5])(\/|$)/.exec(pathname)?.[1] ?? "1";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {open ? (
        <button
          type="button"
          aria-label="Close iteration switcher"
          className="pointer-events-auto absolute inset-0 cursor-default bg-black/10 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="pointer-events-auto absolute bottom-5 right-5 flex flex-col items-end gap-3">
        {open ? (
          <div className="w-[min(21rem,calc(100vw-2.5rem))] overflow-hidden rounded-3xl border border-white/12 bg-zinc-950/94 text-white shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                Design iterations
              </p>
              <p className="mt-1 text-sm text-zinc-300">
                Five distinct landing systems for Engram
              </p>
            </div>
            <nav aria-label="Landing page iterations" className="p-2">
              {iterations.map((iteration) => {
                const isActive = iteration.id === active;

                return (
                  <Link
                    key={iteration.id}
                    href={`/${iteration.id}`}
                    onClick={() => setOpen(false)}
                    className={`group flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors ${
                      isActive
                        ? "bg-white text-zinc-950"
                        : "text-zinc-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-zinc-950 text-white"
                          : "bg-white/10 text-white group-hover:bg-white/15"
                      }`}
                    >
                      {iteration.id}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">
                        {iteration.name}
                      </span>
                      <span
                        className={`mt-0.5 block text-xs leading-5 ${
                          isActive ? "text-zinc-600" : "text-zinc-500"
                        }`}
                      >
                        {iteration.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}

        <button
          type="button"
          aria-label={`Switch landing page iteration. Current iteration ${active} of 5`}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-zinc-950/10 bg-white text-zinc-950 shadow-xl shadow-black/18 ring-1 ring-white/50 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
        >
          <span className="flex items-baseline font-mono font-bold">
            <span className="text-base">{active}</span>
            <span className="text-[0.58rem] text-zinc-500">/5</span>
          </span>
          <span className="sr-only">Open iteration switcher</span>
        </button>
      </div>
    </div>
  );
}
