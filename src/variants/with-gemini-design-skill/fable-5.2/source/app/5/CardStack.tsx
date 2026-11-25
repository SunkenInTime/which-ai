"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

const CARDS = [
  { title: "Ragù recipe", text: "Three hours, not two. Milk before the wine.", tone: styles.toneButter },
  { title: "Lisbon trip", text: "One plan per day. Long lunches.", tone: styles.tonePink },
  { title: "Q3 planning", text: "Ask Dana for the no early.", tone: styles.toneLime },
  { title: "Sleep and memory", text: "Deep sleep files the day away.", tone: styles.toneWhite },
];

export default function CardStack() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    function onMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el!.style.setProperty("--px", (event.clientX / window.innerWidth - 0.5).toFixed(3));
        el!.style.setProperty("--py", (event.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={styles.stack} aria-hidden="true">
      <div className={styles.stackTilt}>
        {CARDS.map((card, index) => (
          <div key={card.title} className={`${styles.stackCard} ${card.tone}`} data-n={index}>
            <strong>{card.title}</strong>
            <p>{card.text}</p>
          </div>
        ))}
        <div className={`${styles.stackCard} ${styles.toneWhite} ${styles.stackTop}`} data-n="4">
          <strong>Why naps help learning</strong>
          <p>
            A 20 minute nap right after studying seems to lock things in. Rest counts
            as part of the work.
          </p>
          <ul>
            <li>Sleep and memory</li>
            <li>Spaced repetition</li>
            <li>Exam plan</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
