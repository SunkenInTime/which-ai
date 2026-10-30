"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const VERSIONS = [
  { href: "/1", n: "1", name: "The product performs", dir: "Live interface, graphite and orange" },
  { href: "/2", n: "2", name: "The well-kept board", dir: "Tiled board, navy on white" },
  { href: "/3", n: "3", name: "The printed annual", dir: "Editorial axis, teal on paper" },
  { href: "/4", n: "4", name: "Colour chapters", dir: "Flat colour fields, blue and red" },
  { href: "/5", n: "5", name: "The quiet instrument", dir: "One picture, one rail, rose grey" },
];

export default function VersionSwitch() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const current = VERSIONS.find((v) => v.href === pathname) ?? VERSIONS[0];
  const open = openFor === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFor(null);
    };
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpenFor(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className="sw" ref={wrap}>
      {open && (
        <nav className="sw-panel" aria-label="Choose a design">
          {VERSIONS.map((v) => (
            <a
              key={v.href}
              href={v.href}
              aria-current={v.href === current.href ? "page" : undefined}
            >
              <span className="sw-name">
                <span className="sw-n" aria-hidden="true">
                  {v.n}
                </span>
                {v.name}
              </span>
              <span className="sw-dir">{v.dir}</span>
            </a>
          ))}
        </nav>
      )}
      <button
        type="button"
        aria-expanded={open}
        aria-label={`Design ${current.n} of 5, ${current.name}. Choose another design.`}
        onClick={() => setOpenFor(open ? null : pathname)}
      >
        <span className="sw-n">{current.n} / 5</span>
        <span>Designs</span>
      </button>
    </div>
  );
}
