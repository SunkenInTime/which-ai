"use client";

import { useState } from "react";
import styles from "./page.module.css";

const QUESTIONS = [
  {
    q: "What helps me learn faster?",
    a: "Three things keep coming up in your notes: resting right after you study, reviewing just before you would forget, and protecting sleep the night before.",
    sources: ["Why naps help learning", "Spaced repetition", "Sleep and memory"],
  },
  {
    q: "What did I decide about pricing?",
    a: "You chose the $8 plan on March 4. The call with Dana settled it: the cheaper tier brought in people who never came back.",
    sources: ["Call with Dana", "Pricing test"],
  },
  {
    q: "Where did we eat in Lisbon?",
    a: "Your favorite was the small seafood place by the tram stop. You wrote that the long lunch there was the best part of the trip.",
    sources: ["Lisbon trip", "What made the trip good"],
  },
];

export default function Ask() {
  const [active, setActive] = useState(0);
  const item = QUESTIONS[active];

  return (
    <div className={styles.ask}>
      <div className={styles.askTabs} role="tablist" aria-label="Example questions">
        {QUESTIONS.map((question, index) => (
          <button
            key={question.q}
            type="button"
            role="tab"
            id={`ask-tab-${index}`}
            aria-selected={index === active}
            aria-controls="ask-panel"
            onClick={() => setActive(index)}
          >
            {question.q}
          </button>
        ))}
      </div>
      <div
        key={active}
        className={styles.askPanel}
        role="tabpanel"
        id="ask-panel"
        aria-labelledby={`ask-tab-${active}`}
      >
        <p>{item.a}</p>
        <p className={styles.askFrom}>From your notes</p>
        <ul>
          {item.sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
