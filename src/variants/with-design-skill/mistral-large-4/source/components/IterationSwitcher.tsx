"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ITERATIONS = [
  { href: "/1", label: "01", name: "Archive" },
  { href: "/2", label: "02", name: "Observatory" },
  { href: "/3", label: "03", name: "Field Journal" },
  { href: "/4", label: "04", name: "Modernist" },
  { href: "/5", label: "05", name: "Tape Desk" },
];

export default function IterationSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = ITERATIONS.find((i) => i.href === pathname);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="iter-switcher">
      <button
        type="button"
        className="iter-switcher__btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Switch design iteration"
      >
        <span className="iter-switcher__dot" aria-hidden="true" />
        Iteration {current ? current.label : "—"} · {current ? current.name : "Select"}
      </button>
      {open && (
        <>
          <div
            className="iter-switcher__scrim"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav className="iter-switcher__menu" aria-label="Design iterations">
            {ITERATIONS.map((it) => {
              const active = it.href === pathname;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`iter-switcher__item${active ? " iter-switcher__item--active" : ""}`}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="iter-switcher__num">{it.label}</span>
                  <span className="iter-switcher__name">{it.name}</span>
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </div>
  );
}
