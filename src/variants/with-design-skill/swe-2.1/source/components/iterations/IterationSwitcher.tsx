import Link from "next/link";
import styles from "./IterationSwitcher.module.css";

const iterations = ["1", "2", "3", "4", "5"];

export default function IterationSwitcher({ current }: { current: string }) {
  return (
    <details className={styles.switcher}>
      <summary aria-label="Choose a landing page iteration">
        <span className={styles.dot} aria-hidden="true" />
        <span>Design {current}</span>
      </summary>
      <nav className={styles.menu} aria-label="Landing page iterations">
        {iterations.map((iteration) => (
          <Link
            key={iteration}
            href={`/${iteration}`}
            aria-current={iteration === current ? "page" : undefined}
            className={iteration === current ? styles.active : undefined}
          >
            {iteration}
          </Link>
        ))}
      </nav>
    </details>
  );
}
