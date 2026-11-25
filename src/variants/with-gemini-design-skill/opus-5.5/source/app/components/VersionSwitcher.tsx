"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./VersionSwitcher.module.css";

const VERSIONS = [
  { n: 1, name: "Gallery" },
  { n: 2, name: "Mycelium" },
  { n: 3, name: "Poster" },
  { n: 4, name: "Daylight" },
  { n: 5, name: "Night shift" },
];

export default function VersionSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = Number(pathname.split("/")[1]) || 0;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^[1-5]$/.test(e.key)) router.push(`/${e.key}`);
      if (e.key === "[" && current > 1) router.push(`/${current - 1}`);
      if (e.key === "]" && current < 5) router.push(`/${current + 1}`);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, router]);

  return (
    <nav className={styles.switcher} aria-label="Design iterations">
      <span className={styles.label}>
        {VERSIONS.find((v) => v.n === current)?.name ?? "Pick a design"}
      </span>
      <ul className={styles.list}>
        {VERSIONS.map((v) => (
          <li key={v.n}>
            <Link
              href={`/${v.n}`}
              className={styles.item}
              aria-current={v.n === current ? "page" : undefined}
              title={`${v.n}: ${v.name} (press ${v.n})`}
            >
              {v.n}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
