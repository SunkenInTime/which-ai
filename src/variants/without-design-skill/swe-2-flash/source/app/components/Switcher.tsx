"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITERATIONS = [1, 2, 3, 4, 5];

export default function Switcher() {
  const pathname = usePathname();
  const active = Number(pathname.replace(/^\//, ""));

  if (!ITERATIONS.includes(active)) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <nav
        aria-label="Design iterations"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/85 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-md"
      >
        <span className="px-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Iter
        </span>
        {ITERATIONS.map((n) => {
          const isActive = n === active;
          return (
            <Link
              key={n}
              href={`/${n}`}
              aria-current={isActive ? "page" : undefined}
              className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-white text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {n}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
