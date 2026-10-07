"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DIRECTIONS = ["1", "2", "3", "4", "5"];

export function VariantSwitcher() {
  const current = usePathname().split("/")[1];

  return (
    <nav
      aria-label="Design directions"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/90 p-1 shadow-[0_16px_40px_-12px_rgb(9_9_11/0.55)] backdrop-blur-md"
    >
      {DIRECTIONS.map((id) => {
        const active = id === current;
        return (
          <Link
            key={id}
            href={`/${id}`}
            aria-label={`Direction ${id}`}
            aria-current={active ? "page" : undefined}
            className={`flex size-9 items-center justify-center rounded-full font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              active
                ? "bg-zinc-50 text-zinc-950"
                : "text-zinc-400 hover:text-zinc-50"
            }`}
          >
            {id}
          </Link>
        );
      })}
    </nav>
  );
}
