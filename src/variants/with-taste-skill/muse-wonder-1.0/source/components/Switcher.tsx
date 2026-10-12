"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const ITEMS = [
  { n: 1, label: "Atelier", href: "/1" },
  { n: 2, label: "Neural", href: "/2" },
  { n: 3, label: "Index", href: "/3" },
  { n: 4, label: "Meadow", href: "/4" },
  { n: 5, label: "System", href: "/5" },
] as const;

export default function Switcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = ITEMS.find((i) => i.href === pathname)?.n ?? 1;

  const go = useCallback(
    (n: number) => {
      const clamped = Math.min(5, Math.max(1, n));
      router.push(`/${clamped}`);
    },
    [router]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
      if (e.key >= "1" && e.key <= "5") go(Number(e.key));
      if (e.key === "ArrowRight") go(current + 1);
      if (e.key === "ArrowLeft") go(current - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  return (
    <div className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/90 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.14)] backdrop-blur-xl dark:border-white/15 dark:bg-zinc-900/90">
        <button
          onClick={() => go(current - 1)}
          disabled={current === 1}
          aria-label="Previous iteration"
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-white/10"
        >
          <ArrowLeft size={15} weight="bold" />
        </button>

        <div className="flex items-center gap-0.5" role="tablist" aria-label="Design iterations">
          {ITEMS.map((item) => {
            const active = item.n === current;
            return (
              <Link
                key={item.n}
                href={item.href}
                role="tab"
                aria-selected={active}
                className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-all ${
                  active
                    ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <span className={`font-mono text-[11px] ${active ? "opacity-70" : "opacity-50"}`}>
                  {String(item.n).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => go(current + 1)}
          disabled={current === 5}
          aria-label="Next iteration"
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-white/10"
        >
          <ArrowRight size={15} weight="bold" />
        </button>
      </div>
      <p className="mt-2 text-center font-mono text-[10px] tracking-wide text-zinc-400">
        Press 1-5 to switch
      </p>
    </div>
  );
}
