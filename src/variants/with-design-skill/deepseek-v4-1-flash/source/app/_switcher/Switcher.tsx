"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./switcher.module.css";

const ROUTES = [
  { href: "/1", label: "Catalogue", note: "Library card drawer" },
  { href: "/2", label: "Constellation", note: "Living note graph" },
  { href: "/3", label: "Field ledger", note: "Ruled record" },
  { href: "/4", label: "Highlighter", note: "Cobalt manifesto" },
  { href: "/5", label: "The desk", note: "Product first" },
];

export function Switcher() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= 5) {
        router.push(`/${n}`);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <nav className={styles.nav} aria-label="Design iterations">
      <span className={styles.caption}>Direction</span>
      <ul className={styles.list}>
        {ROUTES.map((route, i) => {
          const current = pathname === route.href;
          return (
            <li key={route.href}>
              <Link
                href={route.href}
                aria-current={current ? "page" : undefined}
                className={styles.item}
                data-current={current || undefined}
              >
                <span className={styles.num}>{i + 1}</span>
                <span className={styles.name}>{route.label}</span>
                <span className={styles.tip} aria-hidden="true">
                  {route.note}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
