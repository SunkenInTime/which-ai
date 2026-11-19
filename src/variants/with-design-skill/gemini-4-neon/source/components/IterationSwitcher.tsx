"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ITERATIONS = [
  { id: 1, href: "/1", name: "Drafting desk", note: "Cool rag paper & live margin" },
  { id: 2, href: "/2", name: "Botanical archive", note: "Deep pine & memory web" },
  { id: 3, href: "/3", name: "Index drawer", note: "Putty & manila slip-box" },
  { id: 4, href: "/4", name: "Cobalt studio", note: "Ultramarine & live app" },
  { id: 5, href: "/5", name: "Reading room", note: "Wisteria commonplace essay" },
] as const;

export function IterationSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeIndex = Math.max(
    0,
    ITERATIONS.findIndex((item) => pathname === item.href)
  );
  const active = ITERATIONS[activeIndex] ?? ITERATIONS[0];
  const prev = ITERATIONS[(activeIndex + ITERATIONS.length - 1) % ITERATIONS.length];
  const next = ITERATIONS[(activeIndex + 1) % ITERATIONS.length];

  const isDarkSurface = active.id === 2;

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isEditable =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (isEditable) return;

      if (event.key === "[") {
        router.push(prev.href);
      } else if (event.key === "]") {
        router.push(next.href);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [next.href, prev.href, router]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2"
      style={{ fontFamily: "var(--font-hanken), system-ui, sans-serif" }}
    >
      {open && (
        <nav
          aria-label="Design iterations"
          className={`w-64 rounded-xl border p-1.5 backdrop-blur-md transition-opacity ${
            isDarkSurface
              ? "border-[#2B4942] bg-[#132622]/95 text-[#F0EDE5] shadow-lg shadow-black/40"
              : "border-[#D5D8DC] bg-white/95 text-[#182026] shadow-lg shadow-slate-900/12"
          }`}
        >
          <div
            className={`px-2.5 py-1.5 text-xs ${
              isDarkSurface ? "text-[#9BB8AD]" : "text-[#5A6570]"
            }`}
          >
            Switch design iteration
          </div>
          <ul className="space-y-0.5">
            {ITERATIONS.map((item) => {
              const isCurrent = item.id === active.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      isCurrent
                        ? isDarkSurface
                          ? "bg-[#D6A954] text-[#0F1F1C] font-medium"
                          : "bg-[#182026] text-white font-medium"
                        : isDarkSurface
                          ? "hover:bg-[#1E3B34] text-[#E6E2D8]"
                          : "hover:bg-[#EFF1F4] text-[#182026]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded text-xs font-medium ${
                          isCurrent
                            ? isDarkSurface
                              ? "bg-[#0F1F1C]/15 text-[#0F1F1C]"
                              : "bg-white/20 text-white"
                            : isDarkSurface
                              ? "bg-[#23433B] text-[#B9D0C6]"
                              : "bg-[#E9ECEF] text-[#45505B]"
                        }`}
                      >
                        {item.id}
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span>{item.name}</span>
                        <span
                          className={`text-[11px] font-normal ${
                            isCurrent
                              ? isDarkSurface
                                ? "text-[#0F1F1C]/75"
                                : "text-white/75"
                              : isDarkSurface
                                ? "text-[#8BA99E]"
                                : "text-[#636F7B]"
                          }`}
                        >
                          {item.note}
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <div
        className={`inline-flex items-center rounded-full border p-0.5 backdrop-blur-md ${
          isDarkSurface
            ? "border-[#2F524A] bg-[#152B26]/95 text-[#F0EDE5] shadow-md shadow-black/40"
            : "border-[#182026]/15 bg-[#182026]/92 text-white shadow-md shadow-slate-900/15"
        }`}
      >
        <Link
          href={prev.href}
          aria-label={`Previous design (${prev.name})`}
          title={`Previous: ${prev.name} ([)`}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            isDarkSurface ? "hover:bg-[#23443C]" : "hover:bg-white/15"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 3.5L5.5 8L10 12.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={`Design ${active.id} of 5: ${active.name}. Open design switcher`}
          className={`inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium tracking-tight transition-colors cursor-pointer ${
            isDarkSurface ? "hover:bg-[#23443C]" : "hover:bg-white/15"
          }`}
        >
          <span className="tabular-nums">
            {active.id} / {ITERATIONS.length}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M4.5 9.5L8 6L11.5 9.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Link
          href={next.href}
          aria-label={`Next design (${next.name})`}
          title={`Next: ${next.name} (])`}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
            isDarkSurface ? "hover:bg-[#23443C]" : "hover:bg-white/15"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 3.5L10.5 8L6 12.5"
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
