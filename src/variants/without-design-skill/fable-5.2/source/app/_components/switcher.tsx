"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { designs } from "../_lib/designs";
import s from "./switcher.module.css";

/**
 * Floating control for moving between the five landing-page directions.
 * Lives in the root layout so it persists (and animates) across navigations.
 *
 * Keyboard: 1–5 jump to a direction, ← / → step through them.
 */
export function Switcher() {
  const pathname = usePathname();
  const router = useRouter();

  const current = designs.findIndex(
    (d) => pathname === d.href || pathname.startsWith(`${d.href}/`),
  );
  const count = designs.length;
  const prev = designs[(current <= 0 ? count : current) - 1];
  const next = designs[current < 0 ? 0 : (current + 1) % count];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      // Never steal keys from someone who is typing.
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= count) {
        router.push(designs[n - 1].href);
      } else if (e.key === "ArrowLeft") {
        router.push(prev.href);
      } else if (e.key === "ArrowRight") {
        router.push(next.href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prev.href, next.href, count]);

  return (
    <nav className={s.switcher} aria-label="Design directions">
      <Link
        href="/"
        className={s.home}
        aria-label="Overview of all five directions"
        aria-current={pathname === "/" ? "page" : undefined}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <rect x="1.5" y="1.5" width="5" height="5" rx="1.2" />
          <rect x="9.5" y="1.5" width="5" height="5" rx="1.2" />
          <rect x="1.5" y="9.5" width="5" height="5" rx="1.2" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="1.2" />
        </svg>
        <span className={s.tip}>Overview</span>
      </Link>

      <span className={s.rule} aria-hidden="true" />

      <Link href={prev.href} className={s.arrow} aria-label={`Previous: ${prev.name}`}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M9.5 3.5 5 8l4.5 4.5" />
        </svg>
      </Link>

      <ol className={s.list}>
        {designs.map((d, i) => {
          const active = i === current;
          return (
            <li key={d.id}>
              <Link
                href={d.href}
                className={s.item}
                data-active={active || undefined}
                aria-current={active ? "page" : undefined}
                aria-label={`${d.id}. ${d.name}`}
              >
                <span className={s.num}>{d.id}</span>
                <span className={s.name} aria-hidden="true">
                  <span>{d.name}</span>
                </span>
                {!active && <span className={s.tip}>{d.name}</span>}
              </Link>
            </li>
          );
        })}
      </ol>

      <Link href={next.href} className={s.arrow} aria-label={`Next: ${next.name}`}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M6.5 3.5 11 8l-4.5 4.5" />
        </svg>
      </Link>
    </nav>
  );
}
