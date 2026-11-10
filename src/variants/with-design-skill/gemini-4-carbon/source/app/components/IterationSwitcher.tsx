"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ITERATIONS = [
  {
    id: "1",
    href: "/1",
    name: "Slip-box tray",
    note: "Ruled index cards & tabs",
    swatch: "#EDE2C4",
    accent: "#123536",
  },
  {
    id: "2",
    href: "/2",
    name: "Reading lamp",
    note: "Night study & marginalia",
    swatch: "#191624",
    accent: "#E4A84A",
  },
  {
    id: "3",
    href: "/3",
    name: "Blueprint table",
    note: "Spatial pinboard canvas",
    swatch: "#153259",
    accent: "#F2C14E",
  },
  {
    id: "4",
    href: "/4",
    name: "Field herbarium",
    note: "Pressed specimens & time",
    swatch: "#DCE3D8",
    accent: "#4D43A3",
  },
  {
    id: "5",
    href: "/5",
    name: "Pocket recorder",
    note: "Live capture scratchpad",
    swatch: "#F4F6F9",
    accent: "#1849D6",
  },
] as const;

export function IterationSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIndex = Math.max(
    0,
    ITERATIONS.findIndex((item) => pathname === item.href)
  );
  const current = ITERATIONS[currentIndex] ?? ITERATIONS[0];
  const prev =
    ITERATIONS[(currentIndex - 1 + ITERATIONS.length) % ITERATIONS.length];
  const next = ITERATIONS[(currentIndex + 1) % ITERATIONS.length];

  useEffect(() => {
    ITERATIONS.forEach((item) => {
      router.prefetch(item.href);
    });
  }, [router]);

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
      if (event.altKey && ["1", "2", "3", "4", "5"].includes(event.key)) {
        event.preventDefault();
        router.push(`/${event.key}`);
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 z-50"
      style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
    >
      {open && (
        <div
          role="menu"
          aria-label="Design iterations"
          className="mb-2.5 w-64 rounded-2xl border border-[#242933]/15 bg-[#FBFCFE]/96 p-1.5 text-[#18202C] shadow-[0_14px_34px_-10px_rgba(18,26,38,0.28)] backdrop-blur-md"
        >
          <div className="flex items-center justify-between px-2.5 py-1.5 text-xs text-[#546070]">
            <span>Choose landing page</span>
            <span>Alt + 1–5</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {ITERATIONS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1849D6] ${
                    active
                      ? "bg-[#18202C] text-[#F8FAFC]"
                      : "text-[#18202C] hover:bg-[#ECEFF4]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/15 text-[11px] font-semibold"
                    style={{
                      backgroundColor: item.swatch,
                      color:
                        item.id === "2" || item.id === "3"
                          ? "#F4F7FB"
                          : "#18202C",
                    }}
                  >
                    {item.id}
                    <span
                      className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-1 ring-white"
                      style={{ backgroundColor: item.accent }}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium leading-tight">
                      {item.name}
                    </span>
                    <span
                      className={`block truncate text-[11px] leading-tight mt-0.5 ${
                        active ? "text-[#C9D2DF]" : "text-[#5C6878]"
                      }`}
                    >
                      {item.note}
                    </span>
                  </span>
                  <span
                    className={`text-[11px] ${
                      active ? "text-[#A7B6CC]" : "text-[#7A8699]"
                    }`}
                  >
                    /{item.id}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="inline-flex items-center rounded-full border border-white/20 bg-[#18202C]/92 p-1 text-[#F8FAFC] shadow-[0_10px_28px_-8px_rgba(12,18,28,0.45)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            router.push(prev.href);
          }}
          aria-label={`Previous iteration: /${prev.id} ${prev.name}`}
          title={`Previous: /${prev.id} ${prev.name}`}
          className="inline-flex items-center justify-center rounded-full p-1.5 text-[#CFD8E6] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9CC0E7]"
        >
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M7.5 2.5L4 6L7.5 9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span aria-hidden="true" className="h-4 w-px bg-white/15" />

        <button
          type="button"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          aria-expanded={open}
          aria-haspopup="menu"
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium leading-none text-[#F8FAFC] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9CC0E7]"
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full ring-1 ring-white/40"
            style={{ backgroundColor: current.accent }}
          />
          <span>
            {current.id}/5 {current.name}
          </span>
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`transition-transform duration-150 ${
              open ? "rotate-180" : ""
            }`}
          >
            <path
              d="M2.5 7.5L6 4L9.5 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span aria-hidden="true" className="h-4 w-px bg-white/15" />

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            router.push(next.href);
          }}
          aria-label={`Next iteration: /${next.id} ${next.name}`}
          title={`Next: /${next.id} ${next.name}`}
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[12px] font-medium leading-none text-[#CFD8E6] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9CC0E7]"
        >
          <span>Next</span>
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M4.5 2.5L8 6L4.5 9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
