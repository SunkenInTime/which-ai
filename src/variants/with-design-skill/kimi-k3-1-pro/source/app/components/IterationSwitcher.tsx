"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, GridIcon } from "./Icons";

const designs = [
  { id: 1, name: "Memory atlas", color: "#625df5" },
  { id: 2, name: "Commonplace book", color: "#d46b48" },
  { id: 3, name: "Thought stream", color: "#f0cc68" },
  { id: 4, name: "Working memory", color: "#176b52" },
  { id: 5, name: "Mind garden", color: "#ed5f91" },
];

export function IterationSwitcher() {
  const pathname = usePathname();
  const current = Number(pathname.split("/")[1]) || 1;
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="iteration-switcher" ref={container}>
      {open && (
        <nav className="iteration-menu" id="iteration-menu" aria-label="Landing page concepts">
          <div className="iteration-menu-heading">
            <span>Five ways to think</span>
            <span>Choose a concept</span>
          </div>
          {designs.map((design) => (
            <Link
              href={`/${design.id}`}
              key={design.id}
              className={current === design.id ? "is-current" : ""}
              aria-current={current === design.id ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="iteration-number">0{design.id}</span>
              <span className="iteration-dot" style={{ background: design.color }} />
              <span>{design.name}</span>
              <ArrowUpRight width={16} height={16} />
            </Link>
          ))}
        </nav>
      )}
      <button
        className="iteration-trigger"
        type="button"
        aria-label="Switch landing page design"
        aria-expanded={open}
        aria-controls="iteration-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <GridIcon width={18} height={18} />
        <span>Design {String(current).padStart(2, "0")}</span>
        <span className="iteration-count">/ 05</span>
      </button>
    </div>
  );
}
