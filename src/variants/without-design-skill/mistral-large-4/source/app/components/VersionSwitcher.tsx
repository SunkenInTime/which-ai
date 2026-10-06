"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const versions = [
  { href: "/1", label: "1", name: "Minimal" },
  { href: "/2", label: "2", name: "Noir" },
  { href: "/3", label: "3", name: "Bloom" },
  { href: "/4", label: "4", name: "Editorial" },
  { href: "/5", label: "5", name: "Atlas" },
];

export default function VersionSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = versions.find((v) => v.href === pathname);

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      <div className="relative">
        {open && (
          <div className="absolute bottom-12 right-0 flex w-44 flex-col gap-1 rounded-xl border border-black/10 bg-white/90 p-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/90">
            {versions.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  pathname === v.href
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <span>{v.name}</span>
                <span className="text-xs opacity-60">v{v.label}</span>
              </Link>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Switch landing page version"
          className="flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-4 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 dark:bg-white dark:text-zinc-900"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs dark:bg-black/10">
            {current ? current.label : "?"}
          </span>
          Switch version
        </button>
      </div>
    </div>
  );
}
