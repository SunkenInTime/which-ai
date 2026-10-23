"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";

const iterations = [
  { id: 1, name: "Editorial calm" },
  { id: 2, name: "Connected cosmos" },
  { id: 3, name: "Bold & modular" },
  { id: 4, name: "Quiet utility" },
  { id: 5, name: "Organic ideas" },
];

export function IterationSwitcher() {
  const pathname = usePathname();
  const current = Number(pathname.split("/")[1]) || 1;
  const previous = current === 1 ? 5 : current - 1;
  const next = current === 5 ? 1 : current + 1;
  return (
    <aside className="iteration-switcher" aria-label="Switch landing page iteration">
      <span className="switcher-label">EXPLORE</span>
      <Link href={`/${previous}`} className="switcher-arrow" aria-label={`Previous design, iteration ${previous}`}><Icon name="chevron-right" size={15} style={{ transform: "rotate(180deg)" }} /></Link>
      <div className="switcher-numbers">
        {iterations.map((iteration) => (
          <Link key={iteration.id} href={`/${iteration.id}`} className={current === iteration.id ? "active" : ""} aria-current={current === iteration.id ? "page" : undefined} aria-label={`Iteration ${iteration.id}: ${iteration.name}`} title={iteration.name}>
            {String(iteration.id).padStart(2, "0")}
          </Link>
        ))}
      </div>
      <Link href={`/${next}`} className="switcher-arrow" aria-label={`Next design, iteration ${next}`}><Icon name="chevron-right" size={15} /></Link>
    </aside>
  );
}
