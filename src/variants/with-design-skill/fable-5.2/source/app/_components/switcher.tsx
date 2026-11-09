"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./switcher.module.css";

const DESIGNS = [
  { n: 1, name: "Slip box" },
  { n: 2, name: "Golgi plate" },
  { n: 3, name: "Train of thought" },
  { n: 4, name: "The page is a note" },
  { n: 5, name: "Forgetting curve" },
];

export function Switcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = DESIGNS.find((d) => pathname === `/${d.n}`);

  // Number keys 1 to 5 jump between designs, unless the visitor is typing.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= DESIGNS.length) router.push(`/${n}`);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <nav className={styles.switcher} aria-label="Switch design">
      <span className={styles.name}>{current ? current.name : "Designs"}</span>
      <ul className={styles.list}>
        {DESIGNS.map((d) => (
          <li key={d.n}>
            <Link
              href={`/${d.n}`}
              className={styles.link}
              aria-current={current?.n === d.n ? "page" : undefined}
              aria-label={`Design ${d.n}: ${d.name}`}
              title={`${d.name} (press ${d.n})`}
            >
              {d.n}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
