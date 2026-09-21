"use client";

import { useState } from "react";
import { Atkinson_Hyperlegible, Source_Serif_4 } from "next/font/google";
import styles from "./five.module.css";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-atkinson",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: "italic",
  display: "swap",
  variable: "--font-source-serif",
});

export function WalkPage() {
  const [started, setStarted] = useState(false);

  return (
    <main className={`${styles.page} ${atkinson.variable} ${sourceSerif.variable}`}>
      <div className={styles.binding} aria-hidden="true" />
      <div className={styles.column}>
        <h1 className={styles.title}>Quire</h1>
        <p className={styles.pitch}>
          A second brain you walk through later. The notes below were written
          weeks apart. Quire laid them side by side.
        </p>
        <nav className={styles.turns} aria-label="Entries">
          <a className={styles.turn} href="#morning">
            Morning
          </a>
          <a className={styles.turn} href="#weeks">
            Weeks later
          </a>
          <a className={styles.turn} href="#today">
            Today
          </a>
        </nav>
        <article id="morning" className={styles.entry}>
          <h2 className={styles.entryTitle}>Morning</h2>
          <p className={styles.entryBody}>
            Saw the same dog at the corner. I did not write the breed. I wrote
            the pause before I crossed.
          </p>
        </article>
        <article id="weeks" className={styles.entry}>
          <h2 className={styles.entryTitle}>Weeks later</h2>
          <p className={styles.recall}>
            The pause showed up again while I was writing about my mother on
            the phone.
          </p>
          <p className={styles.entryBody}>
            I had not gone looking for the dog. The earlier note was already
            there.
          </p>
        </article>
        <article id="today" className={styles.entry}>
          <h2 className={styles.entryTitle}>Today</h2>
          <p className={styles.entryBody}>
            Quire laid the two notes side by side. The dog and the phone call
            were the same kind of waiting.
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
        </article>
      </div>
    </main>
  );
}
