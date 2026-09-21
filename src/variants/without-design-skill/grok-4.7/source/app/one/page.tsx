import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { StartButton } from "../components/start-button";
import styles from "./one.module.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const text = Figtree({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Desk",
  description:
    "Paper slips on a desk. Each note stays next to the one that led to it.",
};

export default function DeskPage() {
  return (
    <main className={`${styles.desk} ${display.className}`}>
      <div className={styles.pile}>
        <article className={`${styles.slip} ${styles.question}`}>
          <p className={styles.body}>What did I mean by place?</p>
          <p className={`${styles.date} ${text.className}`}>12 May</p>
        </article>

        <article className={`${styles.slip} ${styles.main}`}>
          <span className={styles.tape} aria-hidden="true" />
          <p className={`${styles.name} ${text.className}`}>Commonplace</p>
          <h1 className={styles.title}>
            Keep the thought, and the reason you had it.
          </h1>
          <p className={styles.lead}>
            A private notebook. A note stays next to the one that led you to
            write it.
          </p>
          <StartButton
            className={`${styles.start} ${text.className}`}
            statusClassName={`${styles.status} ${text.className}`}
            stackClassName={styles.action}
          />
        </article>

        <article className={`${styles.slip} ${styles.green}`}>
          <p className={styles.body}>
            The oranges were soft and still made the best cake.
          </p>
          <p className={styles.body}>Tied to the recipe card.</p>
          <p className={`${styles.date} ${text.className}`}>18 May</p>
        </article>

        <article className={`${styles.slip} ${styles.quote}`}>
          <p className={styles.body}>
            Write to the person who was not in the room. Include who was, and
            the page if there was a page.
          </p>
          <p className={`${styles.date} ${text.className}`}>2 June</p>
        </article>
      </div>
    </main>
  );
}
