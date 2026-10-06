"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const versions = [
  { href: "/1", label: "01", name: "Editorial" },
  { href: "/2", label: "02", name: "Noir" },
  { href: "/3", label: "03", name: "Paper" },
  { href: "/4", label: "04", name: "Prism" },
  { href: "/5", label: "05", name: "Graph" },
];

export default function VersionSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = versions.find((v) => v.href === pathname);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {open && (
        <div className="mb-3 flex flex-col gap-1 rounded-2xl border border-black/10 bg-white/90 p-2 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/90">
          {versions.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-2 text-sm transition-colors ${
                pathname === v.href
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-zinc-700 hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10"
              }`}
            >
              <span className="font-mono text-xs opacity-60">{v.label}</span>
              <span className="font-medium">{v.name}</span>
            </Link>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch design version"
        className="flex h-12 items-center gap-2 rounded-full bg-black px-5 text-sm font-medium text-white shadow-xl transition-transform hover:scale-105 dark:bg-white dark:text-black"
      >
        <span className="font-mono">{current?.label ?? "—"}</span>
        <span>{current?.name ?? "Versions"}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
