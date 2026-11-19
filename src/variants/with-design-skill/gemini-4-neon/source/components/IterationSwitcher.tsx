"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ITERATIONS = [
  { id: 1, path: "/1", name: "Index-Card Desk", swatch: "#1D4ED8" },
  { id: 2, path: "/2", name: "Botanical Garden", swatch: "#0F241D" },
  { id: 3, path: "/3", name: "Swiss Spatial", swatch: "#C81E1E" },
  { id: 4, path: "/4", name: "Midnight Observatory", swatch: "#0C1324" },
  { id: 5, path: "/5", name: "Risograph Notebook", swatch: "#4C3AE3" },
] as const;

export function IterationSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current =
    ITERATIONS.find((item) => pathname === item.path) ?? ITERATIONS[0];
  const nextItem =
    ITERATIONS[current.id % ITERATIONS.length];

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2"
      style={{ fontFamily: "var(--font-instrument-sans), system-ui, sans-serif" }}
    >
      {open && (
        <nav
          aria-label="Design iterations"
          className="w-60 rounded-xl border border-neutral-800/15 bg-white/95 p-1.5 text-neutral-900 shadow-lg backdrop-blur-md"
        >
          <div className="px-2.5 py-1.5 text-xs font-medium text-neutral-500">
            Switch design iteration
          </div>
          <ul className="space-y-0.5">
            {ITERATIONS.map((item) => {
              const isActive = item.id === current.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-900 ${
                      isActive
                        ? "bg-neutral-900 font-medium text-white"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full border border-black/15"
                        style={{ backgroundColor: item.swatch }}
                      />
                      <span>{item.name}</span>
                    </span>
                    <span
                      className={`text-xs ${
                        isActive ? "text-neutral-300" : "text-neutral-400"
                      }`}
                    >
                      /{item.id}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <div className="flex items-center rounded-full border border-white/20 bg-neutral-950/90 p-1 text-white shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-haspopup="true"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium tracking-normal text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full ring-1 ring-white/40"
            style={{ backgroundColor: current.swatch }}
          />
          <span>
            {current.id} / {ITERATIONS.length}
          </span>
          <span className="hidden text-neutral-300 sm:inline">
            {current.name}
          </span>
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`text-neutral-300 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            <path
              d="M3 7.5L6 4.5L9 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span aria-hidden="true" className="mx-0.5 h-4 w-px bg-white/15" />

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            router.push(nextItem.path);
          }}
          title={`Next design: ${nextItem.name}`}
          aria-label={`Switch to next design: ${nextItem.name}`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-200 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M5.25 3.5L8.75 7L5.25 10.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
