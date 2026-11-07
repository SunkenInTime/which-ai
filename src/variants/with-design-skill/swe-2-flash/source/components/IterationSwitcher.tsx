"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DIRECTIONS = [
  { n: 1, name: "Atlas" },
  { n: 2, name: "Constellation" },
  { n: 3, name: "Blueprint" },
  { n: 4, name: "Herbarium" },
  { n: 5, name: "Broadside" },
] as const;

export function IterationSwitcher() {
  const pathname = usePathname();
  const match = pathname.match(/^\/(\d)/);
  const current = match ? Number(match[1]) : 1;
  const prev = current === 1 ? 5 : current - 1;
  const next = current === 5 ? 1 : current + 1;

  return (
    <nav
      aria-label="Design iterations"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-1 rounded-full border border-white/15 bg-neutral-900/90 px-2 py-1.5 text-neutral-200 shadow-lg backdrop-blur-md"
    >
      <Link
        href={`/${prev}`}
        aria-label={`Previous direction (${prev})`}
        className="flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors hover:bg-white/10"
      >
        ‹
      </Link>
      {DIRECTIONS.map((d) => (
        <Link
          key={d.n}
          href={`/${d.n}`}
          aria-label={`Direction ${d.n}: ${d.name}`}
          aria-current={d.n === current ? "page" : undefined}
          title={d.name}
          className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] transition-colors ${
            d.n === current
              ? "bg-amber-400 font-semibold text-neutral-900"
              : "hover:bg-white/10"
          }`}
        >
          {d.n}
        </Link>
      ))}
      <Link
        href={`/${next}`}
        aria-label={`Next direction (${next})`}
        className="flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors hover:bg-white/10"
      >
        ›
      </Link>
    </nav>
  );
}
