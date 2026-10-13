"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export interface IterationMeta {
  id: number;
  path: string;
  name: string;
  subtitle: string;
  tag: string;
  accent: string;
  bgPreview: string;
}

export const ITERATIONS: IterationMeta[] = [
  {
    id: 1,
    path: "/1",
    name: "Neural Observatory",
    subtitle: "Bioluminescent Graph & Bidirectional Links",
    tag: "Dark Graph",
    accent: "#38BDF8",
    bgPreview: "from-slate-950 via-indigo-950 to-slate-900",
  },
  {
    id: 2,
    path: "/2",
    name: "Scholar's Atelier",
    subtitle: "Warm Archival Zettelkasten & Marginalia",
    tag: "Editorial Paper",
    accent: "#C84B31",
    bgPreview: "from-[#FBF8F3] via-[#F2ECE1] to-[#E8DFD1]",
  },
  {
    id: 3,
    path: "/3",
    name: "Swiss Cognitive OS",
    subtitle: "Sub-Millisecond Command Bar & Exposed Grid",
    tag: "Brutalist Precision",
    accent: "#FF3B00",
    bgPreview: "from-zinc-100 via-white to-zinc-200",
  },
  {
    id: 4,
    path: "/4",
    name: "The Spatial Canvas",
    subtitle: "Infinite Mind-Palace & Visual Node Cables",
    tag: "Infinite Studio",
    accent: "#C084FC",
    bgPreview: "from-[#121316] via-[#1B1D24] to-[#181A20]",
  },
  {
    id: 5,
    path: "/5",
    name: "Ambient Companion",
    subtitle: "Biophilic Calm & Conversational Recall",
    tag: "Organic Sanctuary",
    accent: "#2E5A44",
    bgPreview: "from-[#F3F5F0] via-[#E6EBE2] to-[#DCE4D7]",
  },
];

export default function IterationSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentId = React.useMemo(() => {
    const match = pathname?.match(/^\/([1-5])/);
    if (match) return parseInt(match[1], 10);
    return 1;
  }, [pathname]);

  const currentMeta =
    ITERATIONS.find((item) => item.id === currentId) || ITERATIONS[0];
  const nextId = currentId >= 5 ? 1 : currentId + 1;
  const prevId = currentId <= 1 ? 5 : currentId - 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.altKey && ["1", "2", "3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        router.push(`/${e.key}`);
      } else if (e.key === "]" && !e.metaKey && !e.ctrlKey) {
        router.push(`/${nextId}`);
      } else if (e.key === "[" && !e.metaKey && !e.ctrlKey) {
        router.push(`/${prevId}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextId, prevId, router]);

  return (
    <div
      className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-2.5 font-sans select-none"
      aria-label="Design Iteration Switcher"
    >
      {/* Expanded Iteration Picker Menu */}
      {drawerOpen && (
        <div className="w-80 rounded-2xl border border-white/15 bg-zinc-950/95 p-3 text-white shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all">
          <div className="mb-2.5 flex items-center justify-between border-b border-white/10 pb-2 px-1">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                Noema // Second Brain
              </span>
              <h3 className="text-xs font-semibold text-white">
                5 Landing Page Iterations
              </h3>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close iteration menu"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            {ITERATIONS.map((item) => {
              const isActive = item.id === currentId;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setDrawerOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl p-2 text-left transition-all ${
                    isActive
                      ? "bg-white/15 ring-1 ring-white/30"
                      : "hover:bg-white/8"
                  }`}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: isActive ? item.accent : "rgba(255,255,255,0.08)",
                      color: isActive ? "#050505" : "#fff",
                    }}
                  >
                    /{item.id}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-semibold text-white">
                        {item.name}
                      </p>
                      <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 font-mono text-[9px] text-zinc-300">
                        {item.tag}
                      </span>
                    </div>
                    <p className="truncate text-[11px] text-zinc-400">
                      {item.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 px-1 font-mono text-[10px] text-zinc-400">
            <span>Keys: [ / ] or Alt+1..5</span>
            <span>Route: /{currentId}</span>
          </div>
        </div>
      )}

      {/* Compact Floating Switcher Pill */}
      <div className="flex items-center gap-1 rounded-full border border-white/20 bg-zinc-950/90 p-1.5 text-white shadow-[0_12px_36px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        {/* Drawer Toggle Button */}
        <button
          type="button"
          onClick={() => setDrawerOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/15 transition-colors cursor-pointer"
          title="View all 5 design iterations"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: currentMeta.accent }}
          />
          <span className="hidden sm:inline font-medium tracking-tight">
            {currentMeta.name}
          </span>
          <span className="font-mono text-[10px] text-zinc-400">
            ({currentId}/5)
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className={`text-zinc-400 transition-transform duration-200 ${
              drawerOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>

        <div className="h-4 w-px bg-white/15 mx-0.5" />

        {/* Direct /1 /2 /3 /4 /5 Number Buttons */}
        <div className="flex items-center gap-0.5" role="navigation" aria-label="Iteration pages">
          {ITERATIONS.map((item) => {
            const isActive = item.id === currentId;
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-white text-zinc-950 shadow-sm scale-105"
                    : "text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
                title={`Switch to /${item.id}: ${item.name}`}
              >
                {item.id}
              </Link>
            );
          })}
        </div>

        <div className="h-4 w-px bg-white/15 mx-0.5" />

        {/* Quick Cycle "Next Iteration" Button */}
        <Link
          href={`/${nextId}`}
          className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 font-mono text-[11px] font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors"
          title={`Switch to next iteration (/${nextId})`}
        >
          <span>Switch</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
