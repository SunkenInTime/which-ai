"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/variants/with-design-skill/haiku-5-5/source/app/_components/design-switcher.module.css";

const DESIGNS = ["1", "2", "3", "4", "5"];

export function DesignSwitcher() {
  const pathname = usePathname();

  return (
    <nav aria-label="Switch design" className={styles.switcher}>
      <ul className={styles.list}>
        {DESIGNS.map((id) => {
          const href = `/${id}`;
          const current = pathname === href;

          return (
            <li key={id}>
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                aria-label={`Design ${id} of 5`}
                className={styles.item}
              >
                {id}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
