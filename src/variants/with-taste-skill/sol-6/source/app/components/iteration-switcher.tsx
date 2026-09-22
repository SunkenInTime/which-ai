"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const iterations = [
  { slug: "one", name: "Editorial" },
  { slug: "two", name: "After dark" },
  { slug: "three", name: "Playful" },
  { slug: "four", name: "Typographic" },
  { slug: "five", name: "Nature" },
];

export function IterationSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = Math.max(0, iterations.findIndex((item) => pathname === `/${item.slug}`));
  const previous = iterations[(current + iterations.length - 1) % iterations.length];
  const next = iterations[(current + 1) % iterations.length];

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <aside className="iteration-switcher" aria-label="Design iteration switcher">
        <div className="iteration-menu" id="iteration-menu" hidden={!open}>
          <span className="iteration-menu-heading">Explore directions</span>
          {iterations.map((item, index) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              onClick={() => setOpen(false)}
              className={index === current ? "iteration-option active" : "iteration-option"}
              aria-current={index === current ? "page" : undefined}
            >
              <span className="iteration-option-number">0{index + 1}</span>
              <span>{item.name}</span>
              <span aria-hidden="true">{index === current ? "●" : "↗"}</span>
            </Link>
          ))}
        </div>
      <div className="iteration-bar">
        <Link href={`/${previous.slug}`} className="iteration-arrow" aria-label={`Previous design: ${previous.name}`} onClick={() => setOpen(false)}>‹</Link>
        <button
          type="button"
          className="iteration-main"
          aria-expanded={open}
          aria-controls="iteration-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="iteration-count">0{current + 1} / 05</span>
          <span className="iteration-current">{iterations[current].name}</span>
          <span className="iteration-caret" aria-hidden="true">{open ? "⌄" : "⌃"}</span>
        </button>
        <Link href={`/${next.slug}`} className="iteration-arrow" aria-label={`Next design: ${next.name}`} onClick={() => setOpen(false)}>›</Link>
      </div>
    </aside>
  );
}
