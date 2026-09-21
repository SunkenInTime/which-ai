"use client";

import { useState } from "react";
import { Petrona, Schibsted_Grotesk } from "next/font/google";
import styles from "./two.module.css";

const petrona = Petrona({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-petrona",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted",
});

const notes = [
  {
    id: "slow",
    title: "What I meant by slow",
    body: "Slow is not empty time. It is time with one thing in it. The other notes can wait in the dark.",
  },
  {
    id: "soup",
    title: "Sunday soup",
    body: "Onion, then quiet. I wrote the recipe so I would remember the weather, not the measurements.",
  },
  {
    id: "home",
    title: "The long way home",
    body: "I took the street with the trees because the short way had nothing to notice.",
  },
  {
    id: "letter",
    title: "A letter I didn’t send",
    body: "It says what the other notes only walk around. It still belongs with them.",
  },
];

export function LampPage() {
  const [activeId, setActiveId] = useState(notes[0].id);
  const [started, setStarted] = useState(false);
  const active = notes.find((note) => note.id === activeId) ?? notes[0];
  const waiting = notes.filter((note) => note.id !== active.id);

  return (
    <main className={`${styles.page} ${petrona.variable} ${schibsted.variable}`}>
      <div className={styles.layout}>
        <p className={styles.name}>Quire</p>
        <p className={styles.pitch}>
          Choose a note to bring it into the light. Quire keeps the rest until
          you ask.
        </p>
        <article className={styles.lamp} aria-live="polite">
          <h1 className={styles.title}>{active.title}</h1>
          <p className={styles.body}>{active.body}</p>
        </article>
        <div className={styles.side}>
          <h2 className={styles.sideTitle}>Other notes</h2>
          <ul className={styles.list}>
            {waiting.map((note) => (
              <li key={note.id}>
                <button
                  type="button"
                  className={styles.noteButton}
                  onClick={() => setActiveId(note.id)}
                >
                  {note.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.action}>
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
