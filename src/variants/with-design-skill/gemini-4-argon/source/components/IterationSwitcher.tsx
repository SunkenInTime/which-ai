"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ITERATIONS = [
  {
    id: 1,
    path: "/1",
    title: "Field Herbarium",
    subtitle: "Specimen sheet & live margin transclusion",
    swatch: "#254689",
    bg: "#EAECE6",
  },
  {
    id: 2,
    path: "/2",
    title: "Luhmann's Slipbox",
    subtitle: "Cascading index cards & branching chains",
    swatch: "#C88A1E",
    bg: "#DCE0E6",
  },
  {
    id: 3,
    path: "/3",
    title: "Nocturnal Observatory",
    subtitle: "Prussian blueprint & semantic constellation",
    swatch: "#E8B954",
    bg: "#0F1A2C",
  },
  {
    id: 4,
    path: "/4",
    title: "Riso Studio Wall",
    subtitle: "Ultramarine ink & spatial-to-linear toggle",
    swatch: "#1D35A6",
    bg: "#E6E2DC",
  },
  {
    id: 5,
    path: "/5",
    title: "Quiet Scriptorium",
    subtitle: "Live daily chronicle & automatic concept index",
    swatch: "#C84B31",
    bg: "#F3F5F7",
  },
];

export function IterationSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const currentIndex = ITERATIONS.findIndex((item) => pathname.startsWith(item.path));
  const activeIteration = currentIndex >= 0 ? ITERATIONS[currentIndex] : ITERATIONS[0];
  const nextIteration = ITERATIONS[(currentIndex + 1) % ITERATIONS.length];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key >= "1" && e.key <= "5" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        router.push(`/${e.key}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 font-sans"
      role="navigation"
      aria-label="Design iteration switcher"
    >
      {expanded && (
        <div className="mb-1 w-80 rounded-2xl border border-black/15 bg-white/95 p-3 text-zinc-900 shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-zinc-700">
              Five Second-Brain Directions
            </span>
            <span className="text-[11px] text-zinc-400">Keys 1–5</span>
          </div>
          <div className="flex flex-col gap-1">
            {ITERATIONS.map((item) => {
              const isActive = item.id === activeIteration.id;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  onClick={() => setExpanded(false)}
                  className={`flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "hover:bg-zinc-100 text-zinc-800"
                  }`}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold border border-black/10"
                    style={{
                      backgroundColor: item.bg,
                      color: item.id === 3 ? "#ECF1F8" : "#18221D",
                    }}
                  >
                    {item.id}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-semibold">
                      {item.title}
                    </div>
                    <div
                      className={`truncate text-[11px] ${
                        isActive ? "text-zinc-300" : "text-zinc-500"
                      }`}
                    >
                      {item.subtitle}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 rounded-full border border-black/15 bg-zinc-950/90 p-1.5 text-white shadow-xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          title="View all 5 design iterations"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: activeIteration.swatch }}
          />
          <span>{activeIteration.title}</span>
        </button>

        <div className="h-3.5 w-px bg-white/15" />

        <div className="flex items-center gap-0.5" role="group" aria-label="Iteration pages">
          {ITERATIONS.map((item) => {
            const isActive = item.id === activeIteration.id;
            return (
              <Link
                key={item.id}
                href={item.path}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isActive
                    ? "bg-white text-zinc-950 shadow-xs"
                    : "text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.id}
              </Link>
            );
          })}
        </div>

        <div className="h-3.5 w-px bg-white/15" />

        <Link
          href={nextIteration.path}
          className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-zinc-100 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          title={`Switch to iteration ${nextIteration.id}: ${nextIteration.title}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
