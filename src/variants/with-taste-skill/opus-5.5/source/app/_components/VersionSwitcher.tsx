"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./VersionSwitcher.module.css";

const VERSIONS = [
  { n: 1, name: "Recall margin" },
  { n: 2, name: "Catalogue card" },
  { n: 3, name: "Kept things" },
  { n: 4, name: "Forgetting curve" },
  { n: 5, name: "Quiet note" },
];

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/**
 * One small button in the bottom-right corner; it opens a menu of the five iterations.
 * Rendered by each page inside its own root, so it takes that page's typeface and, through
 * --switch-bg / --switch-ink, that page's colours.
 * Keys: 1–5 jump to an iteration, [ and ] step back and forward (ignored while typing).
 */
export default function VersionSwitcher({ current }: { current: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        button.current?.focus();
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return;
      const count = VERSIONS.length;
      let next = 0;
      if (/^[1-5]$/.test(event.key)) next = Number(event.key);
      else if (event.key === "]") next = (current % count) + 1;
      else if (event.key === "[") next = ((current + count - 2) % count) + 1;
      if (next && next !== current) router.push(`/${next}`);
    };
    const onPointer = (event: PointerEvent) => {
      if (open && root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [current, open, router]);

  return (
    <div className={styles.switcher} ref={root}>
      <ul className={styles.menu} id={menuId} aria-label="Landing page iterations" hidden={!open}>
        {VERSIONS.map(({ n, name }) => (
          <li key={n}>
            <Link
              href={`/${n}`}
              className={styles.item}
              aria-current={n === current ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className={styles.number}>{n}</span>
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <button
        ref={button}
        type="button"
        className={styles.button}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Iteration ${current} of ${VERSIONS.length}. Switch iteration`}
        title="Switch iteration (keys 1–5)"
      >
        <span className={styles.number}>{current}</span>
        <svg className={styles.chevron} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
          <path d="M2 8 6 4l4 4" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}
