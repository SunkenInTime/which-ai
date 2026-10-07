"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const VARIANTS = [
  { id: 1, name: "Paper" },
  { id: 2, name: "Constellation" },
  { id: 3, name: "Bento" },
  { id: 4, name: "Workbench" },
  { id: 5, name: "Loud" },
];

export function VariantSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentIndex = VARIANTS.findIndex((v) => pathname === `/${v.id}`);
  const current = VARIANTS[currentIndex];
  const prev = VARIANTS[(currentIndex - 1 + VARIANTS.length) % VARIANTS.length];
  const next = VARIANTS[(currentIndex + 1) % VARIANTS.length];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        router.push(`/${next.id}`);
      } else if (event.key === "ArrowLeft") {
        router.push(`/${prev.id}`);
      } else {
        const direct = VARIANTS.find((v) => String(v.id) === event.key);
        if (direct) router.push(`/${direct.id}`);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, next.id, prev.id]);

  const arrowClass =
    "flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white";

  return (
    <nav
      aria-label="Switch landing page variant"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-0.5 rounded-full bg-zinc-950/90 p-1.5 text-sm text-white shadow-2xl shadow-black/30 ring-1 ring-white/10 backdrop-blur-md">
        <Link href={`/${prev.id}`} aria-label={`Previous: ${prev.name}`} className={arrowClass}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>

        {VARIANTS.map((v) => {
          const active = v.id === current?.id;
          return (
            <Link
              key={v.id}
              href={`/${v.id}`}
              title={v.name}
              aria-label={`Variant ${v.id}: ${v.name}`}
              aria-current={active ? "page" : undefined}
              className={`flex h-8 w-8 items-center justify-center rounded-full font-medium tabular-nums transition-colors ${
                active ? "bg-white text-zinc-950" : "text-zinc-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {v.id}
            </Link>
          );
        })}

        <Link href={`/${next.id}`} aria-label={`Next: ${next.name}`} className={arrowClass}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>

        {current && (
          <span className="hidden min-w-32 px-3 text-xs text-zinc-400 sm:block">{current.name}</span>
        )}
      </div>
    </nav>
  );
}
