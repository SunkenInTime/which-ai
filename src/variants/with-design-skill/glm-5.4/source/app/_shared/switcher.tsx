"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { variants } from "./variants";

export default function VariantSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = variants.find((v) => v.href === pathname);
  const [open, setOpen] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    root.current
      ?.querySelector<HTMLElement>('a[aria-current="page"], a')
      ?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      const target = event.target as HTMLElement | null;
      if (
        target?.closest(
          "input, textarea, select, [contenteditable]:not([contenteditable=\"false\"])",
        )
      ) {
        return;
      }
      const next = variants[Number(event.key) - 1];
      if (next && next.href !== pathname) router.push(next.href);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [pathname, router]);

  const position = current ? current.n : 0;

  return (
    <div className="vs" ref={root}>
      <button
        ref={trigger}
        type="button"
        className="vs-trigger"
        aria-expanded={open}
        aria-controls="vs-panel"
        aria-haspopup="dialog"
        aria-label={`Switch iteration. Showing ${position} of ${variants.length}.`}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M8 2.5 14 5.5 8 8.5 2 5.5Z" />
          <path d="M2 8.5 8 11.5 14 8.5" />
          <path d="M2 11.5 8 14.5 14 11.5" />
        </svg>
        <span className="vs-count">
          {position}
          <span className="vs-of"> / {variants.length}</span>
        </span>
      </button>
      {open && (
        <div
          id="vs-panel"
          className="vs-panel"
          role="dialog"
          aria-label="Landing page iterations"
        >
          <p className="vs-title">Five takes on one brief</p>
          <ol className="vs-list">
            {variants.map((variant) => {
              const here = variant.href === pathname;
              return (
                <li key={variant.href}>
                  <Link
                    className="vs-item"
                    href={variant.href}
                    aria-current={here ? "page" : undefined}
                  >
                    <span
                      className="vs-swatch"
                      style={{ background: variant.swatch }}
                      aria-hidden="true"
                    />
                    <span className="vs-n">{variant.n}</span>
                    <span className="vs-name">{variant.name}</span>
                    {here && <span className="vs-here">you’re here</span>}
                    <span className="vs-blurb">{variant.blurb}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <p className="vs-hint">Press 1 to 5 on any page to jump.</p>
        </div>
      )}
    </div>
  );
}
