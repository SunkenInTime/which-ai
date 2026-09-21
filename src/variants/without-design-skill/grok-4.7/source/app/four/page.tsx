import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { StartButton } from "../components/start-button";
import styles from "./four.module.css";

const face = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lamp",
  description:
    "One note in the light. The rest of the commonplace waits in the dark, still readable.",
};

const distant = [
  { className: styles.a, text: "Trains in Lisbon" },
  { className: styles.b, text: "Rice the way she made it" },
  { className: styles.c, text: "Why the argument failed" },
  { className: styles.d, text: "A sentence from the blue book" },
  { className: styles.e, text: "Rent, and the month it changed" },
  { className: styles.f, text: "The word for the smell of rain" },
];

export default function LampPage() {
  return (
    <main className={`${styles.room} ${face.className}`}>
      <article className={styles.note}>
        <p className={styles.name}>Commonplace</p>
        <h1 className={styles.title}>
          Most of what you want to remember is already written down.
        </h1>
        <p className={styles.body}>
          It is sitting in the dark, next to the note that would help you find
          it.
        </p>
        <StartButton
          className={styles.start}
          statusClassName={styles.status}
          stackClassName={styles.action}
        />
      </article>

      <div className={styles.orbit}>
        {distant.map((item) => (
          <p key={item.text} className={`${styles.distant} ${item.className}`}>
            {item.text}
          </p>
        ))}
      </div>
    </main>
  );
}
