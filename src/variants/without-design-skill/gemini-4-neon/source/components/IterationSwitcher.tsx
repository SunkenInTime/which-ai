"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Layers, Check } from "lucide-react";

export interface IterationMeta {
  id: number;
  path: string;
  name: string;
  subtitle: string;
  bgSwatch: string;
  accentSwatch: string;
}

export const ITERATIONS: IterationMeta[] = [
  {
    id: 1,
    path: "/1",
    name: "Editorial Atelier",
    subtitle: "Paper, Ink & Marginalia",
    bgSwatch: "#FAF7F2",
    accentSwatch: "#C84B31",
  },
  {
    id: 2,
    path: "/2",
    name: "Neural Cosmos",
    subtitle: "Dark Spatial Graph",
    bgSwatch: "#07080D",
    accentSwatch: "#22D3EE",
  },
  {
    id: 3,
    path: "/3",
    name: "Swiss Index",
    subtitle: "Brutalist Grid System",
    bgSwatch: "#FFFFFF",
    accentSwatch: "#FF4D00",
  },
  {
    id: 4,
    path: "/4",
    name: "Digital Garden",
    subtitle: "Botanical Calm Craft",
    bgSwatch: "#F4F6F0",
    accentSwatch: "#3B6B4C",
  },
  {
    id: 5,
    path: "/5",
    name: "Cognitive Deck",
    subtitle: "Tactile Hardware Lab",
    bgSwatch: "#1A1B1E",
    accentSwatch: "#F59E0B",
  },
];

export default function IterationSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIndex = Math.max(
    0,
    ITERATIONS.findIndex((it) => pathname === it.path || pathname.startsWith(`${it.path}/`))
  );
  const current = ITERATIONS[currentIndex] ?? ITERATIONS[0];

  const prev = ITERATIONS[(currentIndex - 1 + ITERATIONS.length) % ITERATIONS.length];
  const next = ITERATIONS[(currentIndex + 1) % ITERATIONS.length];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (isTyping) return;

      if (e.key === "[") {
        router.push(prev.path);
      } else if (e.key === "]") {
        router.push(next.path);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [prev.path, next.path, router]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end font-sans select-none"
    >
      {open && (
        <div
          role="menu"
          aria-label="Design iterations"
          className="mb-2.5 w-68 rounded-2xl border border-white/15 bg-zinc-950/95 p-2 text-zinc-100 shadow-2xl shadow-black/40 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between px-2.5 py-1.5 text-[11px] font-medium tracking-wider text-zinc-400 uppercase">
            <span>Design Iterations</span>
            <span className="font-mono text-[10px] text-zinc-500">[ / ] keys</span>
          </div>
          <div className="mt-1 flex flex-col gap-1">
            {ITERATIONS.map((it) => {
              const active = it.id === current.id;
              return (
                <Link
                  key={it.id}
                  href={it.path}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-2.5 py-2 transition-colors ${
                    active
                      ? "bg-white/12 text-white"
                      : "text-zinc-300 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/15 font-mono text-[11px] font-semibold shadow-inner"
                      style={{
                        backgroundColor: it.bgSwatch,
                        color:
                          it.bgSwatch === "#07080D" || it.bgSwatch === "#1A1B1E"
                            ? "#FFFFFF"
                            : "#111111",
                      }}
                    >
                      {it.id}
                      <span
                        className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full ring-1 ring-zinc-950"
                        style={{ backgroundColor: it.accentSwatch }}
                      />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium leading-tight">
                        {it.name}
                      </span>
                      <span className="text-[11px] text-zinc-400 leading-tight">
                        {it.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] text-zinc-500 group-hover:text-zinc-300">
                      {it.path}
                    </span>
                    {active && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-zinc-950/92 p-1 text-zinc-100 shadow-2xl shadow-black/35 backdrop-blur-xl ring-1 ring-black/15">
        <Link
          href={prev.path}
          aria-label={`Previous iteration (${prev.name})`}
          title={`Previous: ${prev.name} (${prev.path})`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
          className="flex h-8 items-center gap-2 rounded-full px-2.5 text-xs font-medium transition-colors hover:bg-white/10 cursor-pointer"
        >
          <span
            className="h-2.5 w-2.5 rounded-full ring-2 ring-white/20"
            style={{ backgroundColor: current.accentSwatch }}
          />
          <span className="font-mono text-[11px] text-zinc-400">
            /{current.id}
          </span>
          <span className="max-w-[110px] truncate text-zinc-100">
            {current.name}
          </span>
          <Layers className="h-3.5 w-3.5 text-zinc-400" />
        </button>

        <Link
          href={next.path}
          aria-label={`Next iteration (${next.name})`}
          title={`Next: ${next.name} (${next.path})`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
