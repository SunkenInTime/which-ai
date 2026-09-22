"use client";

import { useState } from "react";
import styles from "./styles.module.css";

type Card = { id: string; title: string; body: (string | [string, string])[]; source: string };

// Body segments: plain strings, or [linkText, targetId].
const cards: Record<string, Card> = {
  spacing: {
    id: "spacing",
    title: "Spacing beats rereading",
    body: [
      "Reviewing a note just as you’re about to forget it makes it stick far longer than rereading it five times in a row. The gaps do the work — see ",
      ["the forgetting curve", "curve"],
      ". Probably why ",
      ["sleep matters", "sleep"],
      " so much for exams.",
    ],
    source: "Make It Stick, ch. 3",
  },
  curve: {
    id: "curve",
    title: "The forgetting curve",
    body: [
      "Ebbinghaus, 1885: without review, about half of new material is gone within a day. Each review flattens the curve — ",
      ["spacing", "spacing"],
      " exploits exactly this. Question for later: ",
      ["what do I actually remember?", "question"],
    ],
    source: "Ebbinghaus, Über das Gedächtnis",
  },
  sleep: {
    id: "sleep",
    title: "Sleep does the filing",
    body: [
      "During deep sleep the brain replays the day and moves it into long-term memory. Explains why an idea is clearer the next morning. Pairs with ",
      ["spacing", "spacing"],
      " — review, sleep, review.",
    ],
    source: "Walker, Why We Sleep",
  },
  question: {
    id: "question",
    title: "Write the question, not the answer",
    body: [
      "A card that asks something gets reopened. Mine: why do I remember the books I argued with and forget the ones I agreed with? Maybe arguing is its own ",
      ["review", "spacing"],
      ". Check against ",
      ["the curve", "curve"],
      ".",
    ],
    source: "Own note, 14 March",
  },
};

const order = ["spacing", "curve", "sleep", "question"];

export default function CardStack() {
  const [trail, setTrail] = useState<string[]>(["spacing"]);
  const top = trail[trail.length - 1];
  const behind = order.filter((id) => id !== top).slice(0, 2);

  function open(id: string) {
    if (id === top) return;
    setTrail((t) => [...t.filter((x) => x !== id), id].slice(-4));
  }

  return (
    <div className={styles.stackWrap}>
      <div className={styles.stack} aria-live="polite">
        {behind.map((id, i) => (
          <div
            key={id}
            className={`${styles.card} ${styles.cardBehind}`}
            style={{ ["--i" as string]: i + 1 }}
            aria-hidden
          >
            <p className={styles.cardTitle}>{cards[id].title}</p>
          </div>
        ))}
        <article key={top} className={`${styles.card} ${styles.cardTop}`}>
          <h2 className={styles.cardTitle}>{cards[top].title}</h2>
          <p className={styles.cardBody}>
            {cards[top].body.map((seg, i) =>
              typeof seg === "string" ? (
                <span key={i}>{seg}</span>
              ) : (
                <button key={i} className={styles.cardLink} onClick={() => open(seg[1])}>
                  {seg[0]}
                </button>
              ),
            )}
          </p>
          <p className={styles.cardSource}>{cards[top].source}</p>
        </article>
      </div>
      <ol className={styles.trail} aria-label="Cards you've opened">
        {trail.map((id) => (
          <li key={id}>
            <button
              onClick={() => open(id)}
              aria-current={id === top ? "true" : undefined}
            >
              {cards[id].title}
            </button>
          </li>
        ))}
      </ol>
      <p className={styles.hint}>Follow a link on the card.</p>
    </div>
  );
}
