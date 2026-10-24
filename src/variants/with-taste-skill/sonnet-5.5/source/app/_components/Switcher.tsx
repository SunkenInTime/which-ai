"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./Switcher.module.css";

const DESIGNS = [
  { href: "/1", name: "Index cards" },
  { href: "/2", name: "Neurons" },
  { href: "/3", name: "Forgetting curve" },
  { href: "/4", name: "Star atlas" },
  { href: "/5", name: "Live editor" },
];

const subscribeNever = () => () => {};

function isTyping(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return (
    el.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)
  );
}

/**
 * A small button, fixed to the corner, that jumps between the five designs.
 * Keys: 1–5 jump to a design, [ and ] step back and forward.
 * Add ?sw=0 to a URL to hide it (used when the pages are inspected).
 */
export function Switcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  // ?sw=0 hides the button (used when the pages are inspected). Read after hydration, never on the server.
  const hidden = useSyncExternalStore(
    subscribeNever,
    () => new URLSearchParams(window.location.search).get("sw") === "0",
    () => false,
  );
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const current = DESIGNS.findIndex((d) => d.href === pathname);

  // Close the menu whenever the route changes.
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      const n = Number(e.key);
      if (n >= 1 && n <= DESIGNS.length) router.push(DESIGNS[n - 1].href);
      if (current === -1) return;
      if (e.key === "]") router.push(DESIGNS[(current + 1) % DESIGNS.length].href);
      if (e.key === "[")
        router.push(DESIGNS[(current + DESIGNS.length - 1) % DESIGNS.length].href);
    }
    function onPointer(e: PointerEvent) {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [current, router]);

  if (hidden || current === -1) return null;

  return (
    <div className={styles.root} ref={root} data-design-switcher>
      {open && (
        <ul className={styles.menu} id="design-switcher-menu">
          {DESIGNS.map((d, i) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className={styles.item}
                aria-current={i === current ? "page" : undefined}
              >
                <span className={styles.num}>{i + 1}</span>
                <span>{d.name}</span>
              </Link>
            </li>
          ))}
          <li className={styles.hint} aria-hidden="true">
            Keys 1–5, [ and ]
          </li>
        </ul>
      )}
      <button
        type="button"
        className={styles.button}
        aria-expanded={open}
        aria-controls="design-switcher-menu"
        aria-label={`Switch design, now showing ${current + 1} of ${DESIGNS.length}`}
        onClick={() => setOpen((v) => !v)}
      >
        {current + 1}
      </button>
    </div>
  );
}
