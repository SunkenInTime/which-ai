"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const ITERATIONS = [
  { n: 1, name: "Paper & Ink", note: "Editorial ledger" },
  { n: 2, name: "Night Graph", note: "Dark knowledge web" },
  { n: 3, name: "Product First", note: "App-led, friendly" },
  { n: 4, name: "Loud Type", note: "Brutalist grid" },
  { n: 5, name: "Quiet Thread", note: "Ambient minimalism" },
] as const;

export default function IterationSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState({ path: pathname, open: false });
  const rootRef = useRef<HTMLDivElement>(null);

  const current = Number(pathname?.match(/^\/([1-5])(?:\/|$)/)?.[1] ?? 0);
  const active = ITERATIONS.find((i) => i.n === current);

  // The menu remembers which route it was opened on, so a route change closes it
  // without needing an effect to reset state.
  const open = menu.open && menu.path === pathname;
  const setOpen = useCallback(
    (value: boolean) => setMenu({ path: pathname, open: value }),
    [pathname],
  );

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)) return;

      if (/^[1-5]$/.test(e.key)) router.push(`/${e.key}`);
      if (e.key === "ArrowRight" && current) {
        router.push(`/${current === 5 ? 1 : current + 1}`);
      }
      if (e.key === "ArrowLeft" && current) {
        router.push(`/${current === 1 ? 5 : current - 1}`);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, router]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4"
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/15 bg-[#0d0d10]/90 p-1 pl-1.5 font-mono text-[11px] text-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur-md">
        <span className="hidden pr-1.5 pl-1 text-[10px] tracking-[0.16em] text-white/40 uppercase sm:block">
          Iteration
        </span>

        <button
          type="button"
          aria-label="Previous iteration"
          onClick={() => router.push(`/${current === 1 || !current ? 5 : current - 1}`)}
          className="flex size-6 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M7.5 2.5 4 6l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {ITERATIONS.map(({ n }) => (
          <Link
            key={n}
            href={`/${n}`}
            aria-current={n === current ? "page" : undefined}
            className={`flex size-6 items-center justify-center rounded-full tabular-nums transition ${
              n === current
                ? "bg-white text-[#0d0d10] font-semibold"
                : "text-white/55 hover:bg-white/10 hover:text-white"
            }`}
          >
            {n}
          </Link>
        ))}

        <button
          type="button"
          aria-label="Next iteration"
          onClick={() => router.push(`/${!current || current === 5 ? 1 : current + 1}`)}
          className="flex size-6 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="mx-1 h-4 w-px bg-white/15" />

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-expanded={open}
        >
          <span className="hidden text-[10px] tracking-[0.12em] uppercase sm:block">
            {active ? active.name : "Style"}
          </span>
          <span className="sm:hidden">{active ? `#${active.n}` : "Style"}</span>
          <svg
            width="9"
            height="9"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden
            className={`transition ${open ? "rotate-180" : ""}`}
          >
            <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="pointer-events-auto absolute bottom-[calc(100%+10px)] left-1/2 w-[min(92vw,26rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/12 bg-[#0d0d10]/95 p-1.5 text-white shadow-2xl backdrop-blur-md">
          {ITERATIONS.map(({ n, name, note }) => (
            <Link
              key={n}
              href={`/${n}`}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                n === current ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white/10 font-mono text-[10px] tabular-nums">
                {n}
              </span>
              <span className="flex-1">
                <span className="block font-sans text-[13px] leading-tight font-medium">{name}</span>
                <span className="block text-[11px] text-white/45">{note}</span>
              </span>
              {n === current && (
                <span className="font-mono text-[9px] tracking-[0.14em] text-white/40 uppercase">here</span>
              )}
            </Link>
          ))}
          <p className="px-3 pt-1.5 pb-2 font-mono text-[10px] text-white/30">
            keys 1–5 · ← → to cycle
          </p>
        </div>
      )}
    </div>
  );
}
