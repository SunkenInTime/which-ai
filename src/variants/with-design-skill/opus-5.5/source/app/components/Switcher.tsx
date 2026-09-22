"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Switcher.module.css";

const iterations = [
  { href: "/1", name: "Card catalogue" },
  { href: "/2", name: "Transit map" },
  { href: "/3", name: "Margins" },
  { href: "/4", name: "Strata" },
  { href: "/5", name: "Live editor" },
];

export default function Switcher() {
  const pathname = usePathname();
  const current = iterations.find((i) => i.href === pathname);

  return (
    <nav className={styles.switcher} aria-label="Design iterations">
      {current && <span className={styles.name}>{current.name}</span>}
      <ol className={styles.list}>
        {iterations.map((it, i) => {
          const active = it.href === pathname;
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={styles.link}
                aria-current={active ? "page" : undefined}
                aria-label={`Iteration ${i + 1}: ${it.name}`}
                title={it.name}
              >
                {i + 1}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
