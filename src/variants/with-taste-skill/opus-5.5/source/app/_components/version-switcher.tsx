"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Z } from "../lib/z";

const VERSIONS = [
  { href: "/1", name: "Studio" },
  { href: "/2", name: "Commonplace" },
  { href: "/3", name: "Graph" },
  { href: "/4", name: "Loud" },
  { href: "/5", name: "Grove" },
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
  const index = VERSIONS.findIndex((v) => pathname.startsWith(v.href));
  const current = index === -1 ? 0 : index;
  const prev = VERSIONS[(current + VERSIONS.length - 1) % VERSIONS.length];
  const next = VERSIONS[(current + 1) % VERSIONS.length];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      const n = Number(e.key);
      if (n >= 1 && n <= VERSIONS.length) router.push(VERSIONS[n - 1].href);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  const btn =
    "grid size-8 place-items-center rounded-full text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95";

  return (
    <nav
      aria-label="Design versions"
      style={{ zIndex: Z.switcher }}
      className="fixed bottom-4 right-4 flex items-center gap-1 rounded-full border border-white/15 bg-zinc-900/90 p-1 font-[family-name:var(--font-geist-sans)] text-zinc-300 shadow-[0_8px_30px_rgb(9_9_11/0.35)] backdrop-blur-md"
    >
      <Link href={prev.href} aria-label={`Previous: ${prev.name}`} className={`${btn} hover:bg-white/10 hover:text-white`}>
        <CaretLeft size={14} weight="bold" />
      </Link>
      {VERSIONS.map((v, i) => (
        <Link
          key={v.href}
          href={v.href}
          title={`${v.name} (press ${i + 1})`}
          aria-current={i === current ? "page" : undefined}
          className={`${btn} ${
            i === current
              ? "bg-zinc-50 text-zinc-900"
              : "hover:bg-white/10 hover:text-white"
          }`}
        >
          {i + 1}
        </Link>
      ))}
      <Link href={next.href} aria-label={`Next: ${next.name}`} className={`${btn} hover:bg-white/10 hover:text-white`}>
        <CaretRight size={14} weight="bold" />
      </Link>
      <span className="hidden pl-1.5 pr-3 text-[12px] text-zinc-400 sm:block">
        {VERSIONS[current].name}
      </span>
    </nav>
  );
}
