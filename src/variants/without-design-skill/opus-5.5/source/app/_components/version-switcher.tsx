"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const VERSIONS = [
  { href: "/1", label: "Marginalia" },
  { href: "/2", label: "Constellation" },
  { href: "/3", label: "Workspace" },
  { href: "/4", label: "Pinboard" },
  { href: "/5", label: "Index" },
];

export function VersionSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = VERSIONS.findIndex((v) => v.href === pathname);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable=true]")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const step = e.key === "ArrowLeft" ? -1 : 1;
        const next = (Math.max(current, 0) + step + VERSIONS.length) % VERSIONS.length;
        router.push(VERSIONS[next].href);
      } else if (/^[1-5]$/.test(e.key)) {
        router.push(VERSIONS[Number(e.key) - 1].href);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, router]);

  if (current === -1) return null;

  return (
    <nav
      aria-label="Design iterations"
      className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-neutral-950/85 p-1 font-sans text-[13px] text-neutral-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
    >
      {VERSIONS.map((v, i) => {
        const active = i === current;
        return (
          <Link
            key={v.href}
            href={v.href}
            aria-current={active ? "page" : undefined}
            title={`${v.label} (press ${i + 1})`}
            className={`flex h-8 items-center gap-2 rounded-full px-3 tabular-nums transition-colors ${
              active ? "bg-white text-neutral-950" : "hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>{i + 1}</span>
            {active && <span className="font-medium">{v.label}</span>}
          </Link>
        );
      })}
      <span className="hidden pl-2 pr-3 text-[11px] text-neutral-500 sm:inline">← →</span>
    </nav>
  );
}
