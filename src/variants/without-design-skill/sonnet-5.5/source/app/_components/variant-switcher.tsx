"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { variants } from "@/variants/without-design-skill/sonnet-5.5/source/app/_lib/variants";

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

export function VariantSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const index = variants.findIndex((v) => `/${v.id}` === pathname);

  const prev = variants[(index - 1 + variants.length) % variants.length];
  const next = variants[(index + 1) % variants.length];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      // Read the live URL rather than render state, so rapid key presses stay in step.
      const at = variants.findIndex((v) => `/${v.id}` === window.location.pathname);
      if (at === -1) return;

      const jump = variants.find((v) => String(v.id) === e.key);
      if (jump) router.push(`/${jump.id}`);
      else if (e.key === "ArrowLeft") router.push(`/${variants[(at - 1 + variants.length) % variants.length].id}`);
      else if (e.key === "ArrowRight") router.push(`/${variants[(at + 1) % variants.length].id}`);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  if (index === -1) return null;

  const btn =
    "grid size-8 place-items-center rounded-full text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <nav
      aria-label="Design variants"
      className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full bg-neutral-950/90 p-1 font-[family-name:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/20 backdrop-blur-md"
    >
      <Link
        href={`/${prev.id}`}
        aria-label={`Previous: ${prev.name}`}
        className={`${btn} text-white/70 hover:bg-white/15 hover:text-white`}
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
          <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {variants.map((v) => {
        const active = v.id === variants[index].id;
        return (
          <Link
            key={v.id}
            href={`/${v.id}`}
            title={`${v.name} — ${v.blurb}`}
            aria-label={`${v.id}: ${v.name}`}
            aria-current={active ? "page" : undefined}
            className={`${btn} font-medium tabular-nums ${
              active
                ? "bg-white text-neutral-950"
                : "text-white/70 hover:bg-white/15 hover:text-white"
            }`}
          >
            {v.id}
          </Link>
        );
      })}

      <Link
        href={`/${next.id}`}
        aria-label={`Next: ${next.name}`}
        className={`${btn} text-white/70 hover:bg-white/15 hover:text-white`}
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
          <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <span className="mr-3 ml-1 hidden font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-[11px] tracking-wide text-white/60 uppercase sm:block">
        {variants[index].name}
      </span>
    </nav>
  );
}
