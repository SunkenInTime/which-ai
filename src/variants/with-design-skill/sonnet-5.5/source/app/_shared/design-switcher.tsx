"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { designs } from "./designs";
import s from "./design-switcher.module.css";

function currentIndex(pathname: string) {
  const n = Number(pathname.split("/")[1]);
  const i = designs.findIndex((d) => d.n === n);
  return i === -1 ? 0 : i;
}

export function DesignSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const index = currentIndex(pathname);
  const current = designs[index];

  const go = useCallback(
    (delta: number) => {
      const next = designs[(index + delta + designs.length) % designs.length];
      router.push(`/${next.n}`);
    },
    [index, router],
  );

  // [ and ] flip between designs; Escape closes the menu.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return setOpen(false);
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "[") go(-1);
      if (e.key === "]") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (!open) return;
    function onDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div className={s.root} ref={rootRef} data-design-switcher>
      {open && (
        <ul className={s.menu} id={menuId} aria-label="Design iterations">
          {designs.map((d) => (
            <li key={d.n}>
              <Link
                href={`/${d.n}`}
                className={s.item}
                aria-current={d.n === current.n ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className={s.itemNum}>{d.n}</span>
                <span className={s.itemName}>{d.name}</span>
                <span className={s.swatches} aria-hidden>
                  {d.swatches.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </span>
              </Link>
            </li>
          ))}
          <li className={s.hint}>Press [ or ] to flip through</li>
        </ul>
      )}
      <div className={s.pill}>
        <button
          type="button"
          className={s.step}
          onClick={() => go(-1)}
          aria-label="Previous design"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
            <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className={s.label}
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={s.num}>{current.n}</span>
          <span>{current.name}</span>
        </button>
        <button
          type="button"
          className={s.step}
          onClick={() => go(1)}
          aria-label="Next design"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
            <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
