"use client";

import { useState } from "react";
import { Literata } from "next/font/google";
import styles from "./one.module.css";

const literata = Literata({
  subsets: ["latin"],
  display: "swap",
});

const sentences = [
  {
    text: "I passed the bakery again and almost went in.",
    margin:
      "See the January note on repetition. You keep returning to the same corner.",
  },
  {
    text: "The woman at the counter recognized me and did not say so.",
    margin:
      "This sits beside the note about being known slightly by strangers.",
  },
  {
    text: "I wrote this down so I would remember the warmth, not the purchase.",
    margin:
      "Linked to Sunday soup. Both keep the feeling and leave the object.",
  },
];

export function MarginPage() {
  const [selected, setSelected] = useState(0);
  const [started, setStarted] = useState(false);

  return (
    <main className={`${styles.page} ${literata.className}`}>
      <div className={styles.layout}>
        <article className={styles.sheet}>
          <div className={styles.writing}>
            <h1 className={styles.title}>Passing the bakery</h1>
            <div role="group" aria-label="Sentences in this note">
              {sentences.map((sentence, index) => {
                const active = index === selected;
                return (
                  <button
                    key={sentence.text}
                    type="button"
                    className={
                      active ? styles.sentenceActive : styles.sentence
                    }
                    aria-pressed={active}
                    onClick={() => setSelected(index)}
                  >
                    {sentence.text}
                  </button>
                );
              })}
            </div>
          </div>
          <aside className={styles.margin} aria-live="polite">
            <p className={styles.marginText}>{sentences[selected].margin}</p>
          </aside>
        </article>
        <div className={styles.aside}>
          <p className={styles.name}>Quire</p>
          <p className={styles.pitch}>
            Quire keeps a second brain in the margin. Select a sentence to see
            the note it calls back.
          </p>
          {started ? (
            <p className={styles.status} role="status">
              Notebook started. This preview keeps it on this page only.
            </p>
          ) : (
            <button
              type="button"
              className={styles.start}
              onClick={() => setStarted(true)}
            >
              Start a notebook
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
