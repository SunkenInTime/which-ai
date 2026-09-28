"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Switcher.module.css";

const iterations = [
  { href: "/1", name: "Poster" },
  { href: "/2", name: "Constellation" },
  { href: "/3", name: "Search first" },
  { href: "/4", name: "Strata" },
  { href: "/5", name: "Margin notes" },
];

export default function Switcher() {
  const pathname = usePathname();
  const index = Math.max(
    0,
    iterations.findIndex((i) => i.href === pathname),
  );
  const prev = iterations[(index + iterations.length - 1) % iterations.length];
  const next = iterations[(index + 1) % iterations.length];

  return (
    <nav className={styles.switcher} aria-label="Design iterations">
      <Link href={prev.href} className={styles.step} aria-label={`Previous: ${prev.name}`}>
        &lsaquo;
      </Link>
      <span className={styles.label} aria-live="polite">
        {index + 1} / {iterations.length} {iterations[index].name}
      </span>
      <Link href={next.href} className={styles.step} aria-label={`Next: ${next.name}`}>
        &rsaquo;
      </Link>
    </nav>
  );
}
