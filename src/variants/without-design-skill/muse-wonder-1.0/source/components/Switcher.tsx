"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ITEMS = [
  { n: 1, label: "Garden", desc: "Calm minimal" },
  { n: 2, label: "Brutal", desc: "Bold & raw" },
  { n: 3, label: "Graph", desc: "Neural map" },
  { n: 4, label: "Press", desc: "Editorial" },
  { n: 5, label: "Midnight", desc: "Glass dark" },
] as const;

export default function Switcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = ITEMS.find((i) => pathname === `/${i.n}`)?.n ?? 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["1", "2", "3", "4", "5"].includes(e.key)) router.push(`/${e.key}`);
      if (e.key === "ArrowRight" && current >= 1 && current < 5) router.push(`/${current + 1}`);
      if (e.key === "ArrowLeft" && current > 1) router.push(`/${current - 1}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, router]);

  const prev = current > 1 ? current - 1 : 5;
  const next = current >= 1 && current < 5 ? current + 1 : 1;

  return (
    <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-zinc-950/90 p-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <Link
          href={`/${prev}`}
          aria-label="Previous iteration"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg text-zinc-300 transition hover:bg-white/10 hover:text-white"
        >
          ←
        </Link>

        {ITEMS.map((item) => {
          const active = current === item.n;
          return (
            <Link
              key={item.n}
              href={`/${item.n}`}
              className={`group flex items-center gap-2 rounded-full px-3 py-2 text-[13px] font-medium transition-all sm:px-3.5 ${
                active
                  ? "bg-white text-zinc-950 shadow"
                  : "text-zinc-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold ${
                  active ? "bg-zinc-950 text-white" : "bg-white/15 text-white"
                }`}
              >
                {item.n}
              </span>
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}

        <Link
          href={`/${next}`}
          aria-label="Next iteration"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg text-zinc-300 transition hover:bg-white/10 hover:text-white"
        >
          →
        </Link>
      </div>
      <p className="mt-2 text-center text-[11px] font-medium tracking-wide text-zinc-500">
        <span className="rounded-full bg-white/80 px-2 py-0.5 shadow-sm backdrop-blur dark:bg-zinc-900/80">
          {current ? `Iteration ${current} of 5 — use ← → keys` : "Pick an iteration — or press 1–5"}
        </span>
      </p>
    </div>
  );
}
