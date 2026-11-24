"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Link = { title: string; date: string; snippet: string };
type Phrase = { key: string; text: string; links: Link[] };

const PHRASES: Record<string, Phrase> = {
  mirror: {
    key: "mirror",
    text: "the window turns into a mirror",
    links: [
      {
        title: "Idea: essay on night trains",
        date: "12 September 2026",
        snippet: "After dark the window stops showing the world and starts showing you.",
      },
      {
        title: "Notes on Mary Oliver",
        date: "2 January 2025",
        snippet: "Attention is the beginning of devotion. Copy this into the front of every notebook.",
      },
    ],
  },
  accounts: {
    key: "accounts",
    text: "the hour of accounts",
    links: [
      {
        title: "Grandmother's recipes, scanned",
        date: "30 December 2024",
        snippet: "Pencilled beside the plum cake: do the accounts at the hour of accounts, not before.",
      },
      {
        title: "Voice memo, 2:14 a.m.",
        date: "18 October 2026",
        snippet: "Why do I only remember her sayings when I can't sleep?",
      },
    ],
  },
  journals: {
    key: "journals",
    text: "old journals",
    links: [
      {
        title: "Why I reread old journals",
        date: "7 May 2024",
        snippet: "Past me keeps answering questions present me forgot to ask.",
      },
      {
        title: "Memory is a field, not a vault",
        date: "14 March 2023",
        snippet: "What you walk through often stays green.",
      },
      {
        title: "Zettelkasten, Luhmann's slips",
        date: "21 August 2023",
        snippet: "Ninety thousand cards, and the value was in the links between them.",
      },
    ],
  },
  curve: {
    key: "curve",
    text: "the forgetting curve",
    links: [
      {
        title: "Forgetting curve, Ebbinghaus",
        date: "3 March 2023",
        snippet: "Most of a new idea is gone in a day unless you meet it again.",
      },
      {
        title: "Sleep consolidates what you rehearse",
        date: "9 February 2025",
        snippet: "Review before bed. The brain keeps what it practised last.",
      },
    ],
  },
};

export default function MarginNotes() {
  const [active, setActive] = useState<keyof typeof PHRASES>("mirror");
  const phrase = PHRASES[active];

  const mark = (id: keyof typeof PHRASES) => (
    <button
      type="button"
      className={styles.mark}
      aria-pressed={active === id}
      onMouseEnter={() => setActive(id)}
      onFocus={() => setActive(id)}
      onClick={() => setActive(id)}
    >
      {PHRASES[id].text}
    </button>
  );

  return (
    <div className={styles.sheetGrid}>
      <article className={styles.sheet}>
        <h3 className={styles.sheetTitle}>The night train</h3>
        <p className={styles.sheetMeta}>Draft, edited tonight at 11:52 p.m.</p>
        <p className={styles.essay}>
          I have always written best on trains after dark, when {mark("mirror")} and the only landscape left is
          my own reflection. My grandmother called this {mark("accounts")}, the time you tally what the day gave
          you. Somewhere between stations the half thoughts from {mark("journals")} start to rearrange
          themselves, and {mark("curve")} bends back the other way.
        </p>
      </article>

      <aside className={styles.margin} aria-live="polite">
        <p className={styles.marginHead}>
          {phrase.links.length} notes link to <span className={styles.marginPhrase}>{phrase.text}</span>
        </p>
        <ul className={styles.marginList} key={phrase.key}>
          {phrase.links.map((l, i) => (
            <li key={l.title} style={{ animationDelay: `${i * 70}ms` }}>
              <span className={styles.marginTitle}>{l.title}</span>
              <span className={styles.marginSnippet}>{l.snippet}</span>
              <span className={styles.marginDate}>{l.date}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
