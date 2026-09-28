"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import s from "./page.module.css";

/**
 * An inline [[link]] that opens a peek of the note it points to.
 * Opens on hover and focus; a click toggles it so touch works too.
 */
export function Wikilink({
  children,
  title,
  footer,
  peek,
}: {
  children: React.ReactNode;
  title: string;
  footer: string;
  peek: React.ReactNode;
}) {
  // Hover and focus peek; a click pins the peek open (that's how touch opens it).
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hover || pinned;
  const [shift, setShift] = useState(0);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const popRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const id = useId();

  const show = useCallback(() => {
    window.clearTimeout(timer.current);
    setHover(true);
  }, []);
  const hide = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHover(false), 120);
  }, []);
  const close = useCallback(() => {
    window.clearTimeout(timer.current);
    setHover(false);
    setPinned(false);
  }, []);

  // Keep the peek inside the viewport.
  useLayoutEffect(() => {
    if (!open || !popRef.current) return;
    const r = popRef.current.getBoundingClientRect();
    const margin = 16;
    const base = r.left - shift;
    let next = 0;
    if (base + r.width > window.innerWidth - margin) {
      next = window.innerWidth - margin - (base + r.width);
    }
    if (base + next < margin) next = margin - base;
    if (next !== shift) setShift(next);
  }, [open, shift]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onDown(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  return (
    <span
      ref={wrapRef}
      className={s.linkWrap}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        type="button"
        className={s.wikilink}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onFocus={show}
        onBlur={hide}
        onClick={() => setPinned((v) => !v)}
      >
        {children}
      </button>
      {open && (
        <span
          ref={popRef}
          id={id}
          role="tooltip"
          className={s.peek}
          style={{ transform: `translateX(${shift}px)` }}
        >
          <span className={s.peekTitle}>{title}</span>
          <span className={s.peekBody}>{peek}</span>
          <span className={s.peekFoot}>{footer}</span>
        </span>
      )}
    </span>
  );
}
