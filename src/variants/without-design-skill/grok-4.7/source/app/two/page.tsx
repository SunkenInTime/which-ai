import type { Metadata } from "next";
import { Literata, Sora } from "next/font/google";
import { StartButton } from "../components/start-button";
import styles from "./two.module.css";

const reading = Literata({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ui = Sora({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Thread",
  description:
    "A thread of notes across months. Later notes stay tied to the ones that caused them.",
};

export default function ThreadPage() {
  return (
    <main className={`${styles.page} ${reading.className}`}>
      <div className={styles.sheet}>
        <div className={styles.spine} aria-hidden="true" />

        <article className={styles.entry}>
          <p className={`${styles.date} ${ui.className}`}>12 May</p>
          <div>
            <p className={styles.note}>
              Attention is not a spotlight. It is a place you return to.
            </p>
            <p className={styles.source}>The Blue Book, page 41.</p>
          </div>
        </article>

        <article className={styles.entry}>
          <p className={`${styles.date} ${ui.className}`}>3 September</p>
          <div>
            <p className={styles.note}>
              Nia finds a thought again by remembering where she was sitting,
              not which folder she chose.
            </p>
          </div>
        </article>

        <article className={styles.entry}>
          <p className={`${styles.date} ${ui.className}`}>21 September</p>
          <div>
            <h1 className={styles.title}>
              Commonplace keeps the sentence, the page, and the conversation
              together.
            </h1>
            <p className={styles.note}>
              Search for the idea, and the notes linked to it come too.
            </p>
            <StartButton
              className={`${styles.start} ${ui.className}`}
              statusClassName={`${styles.status} ${ui.className}`}
              stackClassName={styles.action}
            />
          </div>
        </article>
      </div>
    </main>
  );
}
