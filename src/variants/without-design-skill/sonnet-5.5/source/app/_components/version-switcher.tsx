"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VERSIONS = ["/1", "/2", "/3", "/4", "/5"];

export function VersionSwitcher() {
  const pathname = usePathname();
  const current = VERSIONS.indexOf(pathname);
  if (current === -1) return null;
  const prev = VERSIONS[(current + VERSIONS.length - 1) % VERSIONS.length];
  const next = VERSIONS[(current + 1) % VERSIONS.length];

  return (
    <nav
      aria-label="Design iterations"
      className="fixed bottom-4 right-4 z-[100] flex items-center gap-1 rounded-full bg-black/85 p-1 text-sm text-white shadow-lg backdrop-blur"
    >
      <Link href={prev} aria-label="Previous design" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15">
        &larr;
      </Link>
      {VERSIONS.map((href, i) => (
        <Link
          key={href}
          href={href}
          aria-current={i === current ? "page" : undefined}
          className={`flex h-8 w-8 items-center justify-center rounded-full tabular-nums ${
            i === current ? "bg-white text-black" : "hover:bg-white/15"
          }`}
        >
          {i + 1}
        </Link>
      ))}
      <Link href={next} aria-label="Next design" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15">
        &rarr;
      </Link>
    </nav>
  );
}
