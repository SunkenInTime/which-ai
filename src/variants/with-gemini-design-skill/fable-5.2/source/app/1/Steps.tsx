"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const STEPS = [
  {
    title: "Write it down the way it arrives.",
    body: "Open Engram and type. There are no folders to pick, no tags to choose and no template to fill in before the thought gets away.",
  },
  {
    title: "Engram finds where it belongs.",
    body: "While you write, Engram spots the notes that cover the same ground and links them. Accept a link with one keystroke, or keep typing and ignore it.",
  },
  {
    title: "Ask later. Get your own answer back.",
    body: "Months on, ask a question in plain words. Engram answers from what you wrote and shows you every note it drew from.",
  },
];

function Diagram({ step }: { step: number }) {
  return (
    <div className={styles.diagram} data-step={step} aria-hidden="true">
      <svg className={styles.wires} viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="50" y1="48" x2="20" y2="13" />
        <line x1="50" y1="48" x2="81" y2="18" />
        <line x1="50" y1="48" x2="79" y2="76" />
        <line className={styles.askWire} x1="50" y1="48" x2="28" y2="88" />
      </svg>
      <div className={`${styles.card} ${styles.cardA}`}>
        <strong>Sleep and memory</strong>
        <span>Deep sleep moves the day&apos;s learning into long-term storage.</span>
      </div>
      <div className={`${styles.card} ${styles.cardB}`}>
        <strong>Spaced repetition</strong>
        <span>Review just before you would forget.</span>
      </div>
      <div className={`${styles.card} ${styles.cardC}`}>
        <strong>Lecture: consolidation</strong>
        <span>Rest right after study beats more study.</span>
      </div>
      <div className={`${styles.card} ${styles.cardNew}`}>
        <strong>Why naps help learning</strong>
        <span>
          A 20 minute nap after studying seems to lock things in. Same idea as{" "}
          <i className={styles.autoLink}>Sleep and memory.</i>
          <i className={styles.caret} />
        </span>
      </div>
      <div className={styles.ask}>
        <strong>What helps me learn faster?</strong>
        <span>Answered from 4 of your notes</span>
      </div>
    </div>
  );
}

export default function Steps() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.steps}>
      <div className={styles.stepList}>
        {STEPS.map((step, index) => (
          <article
            key={step.title}
            ref={(el) => {
              refs.current[index] = el;
            }}
            data-index={index}
            className={styles.step}
            data-active={active === index}
          >
            <div className={styles.stepInline}>
              <Diagram step={index} />
            </div>
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
      <div className={styles.stage}>
        <Diagram step={active} />
      </div>
    </div>
  );
}
