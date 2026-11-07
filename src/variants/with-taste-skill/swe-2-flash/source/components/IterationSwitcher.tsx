"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITERATIONS = [
  { href: "/1", label: "Calm" },
  { href: "/2", label: "Journal" },
  { href: "/3", label: "Playful" },
  { href: "/4", label: "Grid" },
  { href: "/5", label: "Aurora" },
] as const;

export function IterationSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Design iterations"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/85 p-1 shadow-[0_8px_30px_rgb(0_0_0/0.35)] backdrop-blur-md">
        {ITERATIONS.map((iter) => {
          const active = pathname === iter.href;
          return (
            <Link
              key={iter.href}
              href={iter.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "bg-white text-zinc-950"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {iter.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
