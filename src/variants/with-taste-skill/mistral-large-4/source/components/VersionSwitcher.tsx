"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const versions = [
  { href: "/1", label: "01", name: "Linear" },
  { href: "/2", label: "02", name: "Editorial" },
  { href: "/3", label: "03", name: "Brutalist" },
  { href: "/4", label: "04", name: "Premium" },
  { href: "/5", label: "05", name: "Kinetic" },
];

export function VersionSwitcher() {
  const pathname = usePathname();
  const current = versions.find((v) => v.href === pathname);

  return (
    <nav
      aria-label="Design iterations"
      className="fixed bottom-5 right-5 z-[100] flex items-center gap-1 rounded-full border border-zinc-300 bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/90"
    >
      <span className="px-2 text-[11px] font-medium uppercase tracking-widest text-zinc-400">
        V.
      </span>
      {versions.map((v) => {
        const active = pathname === v.href;
        return (
          <Link
            key={v.href}
            href={v.href}
            aria-current={active ? "page" : undefined}
            title={`${v.label} - ${v.name}`}
            className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-semibold transition-all active:scale-95 ${
              active
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            }`}
          >
            {v.label}
          </Link>
        );
      })}
      {current && (
        <span className="hidden pl-1 pr-1 text-[11px] text-zinc-400 sm:inline">
          {current.name}
        </span>
      )}
    </nav>
  );
}
