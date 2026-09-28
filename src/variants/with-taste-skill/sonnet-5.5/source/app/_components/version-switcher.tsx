"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Z } from "../lib/z";

const VERSIONS = [
  { n: 1, name: "Daylight" },
  { n: 2, name: "Keys" },
  { n: 3, name: "Issue" },
  { n: 4, name: "Night library" },
  { n: 5, name: "Pinboard" },
] as const;

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

export function VersionSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  // Works at "/3" and under any prefix such as "/some/prefix/3".
  const match = pathname.match(/^(.*)\/([1-5])\/?$/);
  const base = match ? match[1] : "";
  const current = match ? Number(match[2]) - 1 : 0;
  const hrefFor = (n: number) => `${base}/${n}`;
  const prev = VERSIONS[(current + VERSIONS.length - 1) % VERSIONS.length];
  const next = VERSIONS[(current + 1) % VERSIONS.length];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      const n = Number(e.key);
      if (n >= 1 && n <= VERSIONS.length) router.push(hrefFor(n));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, base]);

  const btn =
    "grid size-8 place-items-center rounded-full text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95";

  return (
    <nav
      aria-label="Design versions"
      style={{ zIndex: Z.switcher }}
      className="fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-zinc-900/90 p-1 font-[family-name:var(--font-geist-sans)] text-zinc-300 shadow-[0_8px_30px_rgb(9_9_11/0.35)] backdrop-blur-md"
    >
      <Link href={hrefFor(prev.n)} aria-label={`Previous: ${prev.name}`} className={`${btn} hover:bg-white/10 hover:text-white`}>
        <CaretLeft size={14} weight="bold" />
      </Link>
      {VERSIONS.map((v, i) => (
        <Link
          key={v.n}
          href={hrefFor(v.n)}
          title={`${v.name} (press ${v.n})`}
          aria-current={i === current ? "page" : undefined}
          className={`${btn} ${
            i === current ? "bg-zinc-50 text-zinc-900" : "hover:bg-white/10 hover:text-white"
          }`}
        >
          {v.n}
        </Link>
      ))}
      <Link href={hrefFor(next.n)} aria-label={`Next: ${next.name}`} className={`${btn} hover:bg-white/10 hover:text-white`}>
        <CaretRight size={14} weight="bold" />
      </Link>
      <span className="hidden pl-1.5 pr-3 text-[12px] text-zinc-400 sm:block">
        {VERSIONS[current].name}
      </span>
    </nav>
  );
}
