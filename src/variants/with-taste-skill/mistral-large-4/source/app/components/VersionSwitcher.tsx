"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

const versions = [
  { num: "1", label: "Linear Dark", href: "/1" },
  { num: "2", label: "Editorial", href: "/2" },
  { num: "3", label: "Brutalist", href: "/3" },
  { num: "4", label: "Premium Light", href: "/4" },
  { num: "5", label: "Kinetic", href: "/5" },
];

export function VersionSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = versions.find((v) => v.href === pathname);

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {open && (
        <div className="absolute bottom-14 right-0 flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          {versions.map((v) => (
            <Link
              key={v.num}
              href={v.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                pathname === v.href
                  ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded bg-zinc-200 text-xs font-bold dark:bg-zinc-700">
                {v.num}
              </span>
              {v.label}
            </Link>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900"
        aria-label={open ? "Close version switcher" : "Switch design version"}
      >
        {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
      </button>
      {current && (
        <div className="absolute bottom-14 right-0 mb-1 hidden">{current.label}</div>
      )}
    </div>
  );
}
