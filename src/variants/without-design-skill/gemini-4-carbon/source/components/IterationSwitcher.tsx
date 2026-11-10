"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Layers, Check } from "lucide-react";

const ITERATIONS = [
  {
    id: 1,
    href: "/1",
    name: "The Archivist's Desk",
    subtitle: "Editorial Zettelkasten & Slip-Box",
    swatch: "#C84B31",
    bgSwatch: "#F7F4EC",
  },
  {
    id: 2,
    href: "/2",
    name: "Neural Obsidian",
    subtitle: "Dark Synaptic Graph & ⌘K Engine",
    swatch: "#34D399",
    bgSwatch: "#090B0E",
  },
  {
    id: 3,
    href: "/3",
    name: "Swiss Cognitive Index",
    subtitle: "Modular Grid & Signal Vermilion",
    swatch: "#FF3B1D",
    bgSwatch: "#F4F4F2",
  },
  {
    id: 4,
    href: "/4",
    name: "Spatial Studio Desk",
    subtitle: "Infinite Canvas & Connected Cards",
    swatch: "#1D4ED8",
    bgSwatch: "#EFECE6",
  },
  {
    id: 5,
    href: "/5",
    name: "Quiet Sanctuary",
    subtitle: "Mindful Stream & Zero Folders",
    swatch: "#2D6A4F",
    bgSwatch: "#F5F7F2",
  },
] as const;

export default function IterationSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentNumber = (() => {
    const match = pathname?.match(/^\/([1-5])(?:\b|\/|$)/);
    return match ? Number(match[1]) : 1;
  })();

  const currentIndex = currentNumber - 1;
  const current = ITERATIONS[currentIndex] ?? ITERATIONS[0];
  const prev = ITERATIONS[(currentIndex - 1 + ITERATIONS.length) % ITERATIONS.length];
  const next = ITERATIONS[(currentIndex + 1) % ITERATIONS.length];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key >= "1" && e.key <= "5") {
        router.push(`/${e.key}`);
        setOpen(false);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 z-[9999] font-sans select-none"
    >
      {/* Hidden prefetch links so all 5 routes transition instantaneously */}
      <div className="sr-only" aria-hidden="true">
        {ITERATIONS.map((item) => (
          <Link key={item.id} href={item.href} tabIndex={-1}>
            Iteration {item.id}
          </Link>
        ))}
      </div>

      {/* Expandable Iteration Menu */}
      {open && (
        <div
          role="menu"
          aria-label="Choose landing page iteration"
          className="mb-2.5 w-72 rounded-2xl border border-white/15 bg-neutral-950/95 p-2 text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between px-2.5 py-1.5 text-[11px] font-medium tracking-wider text-neutral-400 uppercase">
            <span>Design Iterations</span>
            <span className="font-mono text-[10px] text-neutral-500">Keys 1–5</span>
          </div>
          <div className="mt-1 space-y-1">
            {ITERATIONS.map((item) => {
              const active = item.id === current.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors ${
                    active
                      ? "bg-white/12 text-white"
                      : "text-neutral-300 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/15 font-mono text-xs font-semibold"
                    style={{
                      backgroundColor: item.bgSwatch,
                      color: item.bgSwatch === "#090B0E" ? "#34D399" : "#171717",
                    }}
                  >
                    {item.id}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium leading-tight">
                      <span className="truncate">{item.name}</span>
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.swatch }}
                      />
                    </div>
                    <div className="truncate text-[11px] text-neutral-400">
                      {item.subtitle}
                    </div>
                  </div>
                  {active && <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Compact Floating Switcher Pill */}
      <div className="flex items-center rounded-full border border-white/15 bg-neutral-950/90 p-1 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <Link
          href={prev.href}
          onClick={() => setOpen(false)}
          aria-label={`Previous iteration (${prev.id}: ${prev.name})`}
          title={`Previous: ${prev.id}. ${prev.name}`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/12 hover:text-white"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Switch landing page iteration"
          className="flex h-7 items-center gap-2 rounded-full px-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10 cursor-pointer"
        >
          <Layers className="h-3.5 w-3.5 text-neutral-400" />
          <span className="font-mono text-[11px] tracking-tight">
            {current.id}
            <span className="text-neutral-500">/5</span>
          </span>
          <span
            className="h-2 w-2 rounded-full ring-1 ring-white/25"
            style={{ backgroundColor: current.swatch }}
          />
        </button>

        <Link
          href={next.href}
          onClick={() => setOpen(false)}
          aria-label={`Next iteration (${next.id}: ${next.name})`}
          title={`Next: ${next.id}. ${next.name}`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/12 hover:text-white"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
