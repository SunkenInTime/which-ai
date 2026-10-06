"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const versions = [
  { n: "1", label: "Broadsheet" },
  { n: "2", label: "Terminal" },
  { n: "3", label: "Ink" },
  { n: "4", label: "Grid" },
  { n: "5", label: "Garden" },
];

export default function VersionSwitch() {
  const pathname = usePathname();
  const current = versions.find((v) => pathname === `/${v.n}`);
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {open && (
        <div
          className="absolute bottom-14 right-0 flex flex-col gap-1 rounded-lg border border-black/15 bg-white/95 p-2 shadow-lg backdrop-blur dark:border-white/15 dark:bg-zinc-900/95"
          role="menu"
          aria-label="Design versions"
        >
          {versions.map((v) => (
            <Link
              key={v.n}
              href={`/${v.n}`}
              role="menuitem"
              onClick={() => setOpen(false)}
              aria-current={current?.n === v.n ? "page" : undefined}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                current?.n === v.n
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              <span className="font-mono text-xs opacity-60">/{v.n}</span>
              {v.label}
            </Link>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full border border-black/15 bg-white/95 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg backdrop-blur transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:border-white/15 dark:bg-zinc-900/95 dark:text-zinc-200 dark:focus-visible:outline-white"
      >
        <span className="font-mono text-xs opacity-60">
          {current ? `/${current.n}` : "v?"}
        </span>
        <span>{current ? current.label : "Versions"}</span>
        <span aria-hidden>{open ? "▴" : "▾"}</span>
      </button>
    </div>
  );
}
