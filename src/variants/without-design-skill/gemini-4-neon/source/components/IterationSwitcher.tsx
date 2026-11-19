"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface IterationItem {
  id: number;
  path: string;
  name: string;
  tagline: string;
  swatch: string;
  accent: string;
}

const ITERATIONS: IterationItem[] = [
  {
    id: 1,
    path: "/1",
    name: "Editorial Paper",
    tagline: "Warm Zettelkasten archive",
    swatch: "#FAF7F2",
    accent: "#B84A27",
  },
  {
    id: 2,
    path: "/2",
    name: "Obsidian Graph",
    tagline: "Dark neural workbench",
    swatch: "#07080C",
    accent: "#6366F1",
  },
  {
    id: 3,
    path: "/3",
    name: "Swiss Grid",
    tagline: "Architectural modernism",
    swatch: "#F6F6F4",
    accent: "#FF3D00",
  },
  {
    id: 4,
    path: "/4",
    name: "Mind Garden",
    tagline: "Botanical calm sanctuary",
    swatch: "#F3F5EF",
    accent: "#3D6B4F",
  },
  {
    id: 5,
    path: "/5",
    name: "Tactile Studio",
    tagline: "Playful spatial desk",
    swatch: "#FFFDF5",
    accent: "#FACC15",
  },
];

export function IterationSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIdx = Math.max(
    0,
    ITERATIONS.findIndex((item) => pathname === item.path)
  );
  const current = ITERATIONS[currentIdx] ?? ITERATIONS[0];
  const prevItem =
    ITERATIONS[(currentIdx - 1 + ITERATIONS.length) % ITERATIONS.length];
  const nextItem = ITERATIONS[(currentIdx + 1) % ITERATIONS.length];

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isEditing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (isEditing) return;

      if (event.key === "[") {
        router.push(prevItem.path);
      } else if (event.key === "]") {
        router.push(nextItem.path);
      } else if (
        event.altKey &&
        event.key >= "1" &&
        event.key <= "5"
      ) {
        event.preventDefault();
        router.push(`/${event.key}`);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextItem.path, prevItem.path, router]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end font-neo select-none"
      aria-label="Design iteration switcher"
    >
      {open && (
        <div
          role="menu"
          className="mb-2.5 w-64 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 p-1.5 text-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-400">
            <span>Landing Iterations</span>
            <span className="text-zinc-500">[ / ]</span>
          </div>

          <div className="mt-0.5 flex flex-col gap-0.5">
            {ITERATIONS.map((item) => {
              const isActive = item.id === current.id;
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors ${
                    isActive
                      ? "bg-white/12 text-white"
                      : "text-zinc-300 hover:bg-white/7 hover:text-white"
                  }`}
                >
                  <span
                    className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-white/15 text-[11px] font-mono font-semibold"
                    style={{
                      backgroundColor: item.swatch,
                      color: item.swatch === "#07080C" ? "#F4F4F5" : "#18181B",
                    }}
                  >
                    {item.id}
                    <span
                      className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full ring-2 ring-zinc-950"
                      style={{ backgroundColor: item.accent }}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[13px] font-medium leading-tight">
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500">
                        {item.path}
                      </span>
                    </div>
                    <p className="truncate text-[11px] text-zinc-400 leading-tight mt-0.5">
                      {item.tagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-zinc-950/90 p-1 text-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <Link
          href={prevItem.path}
          aria-label={`Previous iteration: ${prevItem.name}`}
          title={`Previous (${prevItem.path})`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9.75 3.75L5.5 8L9.75 12.25"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="menu"
          className="flex h-8 items-center gap-2 rounded-full px-2.5 text-xs font-medium tracking-tight text-zinc-100 transition-colors hover:bg-white/10 cursor-pointer"
        >
          <span
            className="h-2.5 w-2.5 rounded-full ring-2 ring-white/20"
            style={{ backgroundColor: current.accent }}
          />
          <span className="font-mono text-[11px] text-zinc-400">
            {current.id}/5
          </span>
          <span className="text-[12px] font-medium text-white">
            {current.name}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={`text-zinc-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <path
              d="M4.25 10L8 6.25L11.75 10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Link
          href={nextItem.path}
          aria-label={`Next iteration: ${nextItem.name}`}
          title={`Next (${nextItem.path})`}
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6.25 3.75L10.5 8L6.25 12.25"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
