"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const DESIGNS = [
  { id: "1", name: "Constellation" },
  { id: "2", name: "Poster" },
  { id: "3", name: "Commonplace" },
  { id: "4", name: "Workbench" },
  { id: "5", name: "Depth" },
];

export default function DesignSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = pathname.split("/")[1] ?? "";

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      const index = DESIGNS.findIndex((d) => d.id === current);
      if (DESIGNS.some((d) => d.id === event.key)) {
        router.push(`/${event.key}`);
      } else if (event.key === "ArrowRight" && index > -1) {
        router.push(`/${DESIGNS[(index + 1) % DESIGNS.length].id}`);
      } else if (event.key === "ArrowLeft" && index > -1) {
        router.push(
          `/${DESIGNS[(index + DESIGNS.length - 1) % DESIGNS.length].id}`,
        );
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, router]);

  return (
    <nav
      aria-label="Switch design iteration"
      className="fixed bottom-4 left-1/2 z-[1000] flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-neutral-950/90 p-1 font-sans text-[13px] font-medium text-white shadow-[0_6px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/25 backdrop-blur"
    >
      {DESIGNS.map((design) => {
        const active = design.id === current;
        return (
          <Link
            key={design.id}
            href={`/${design.id}`}
            title={`${design.id}. ${design.name}`}
            aria-label={`Design ${design.id}: ${design.name}`}
            aria-current={active ? "page" : undefined}
            className={`grid h-8 w-8 place-items-center rounded-full tabular-nums transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              active
                ? "bg-white text-neutral-950"
                : "text-white/75 hover:bg-white/15 hover:text-white"
            }`}
          >
            {design.id}
          </Link>
        );
      })}
    </nav>
  );
}
