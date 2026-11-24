"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Segment = string | { cite: number };
type Source = { title: string; meta: string };
type Question = { id: string; tab: string; q: string; answer: Segment[]; sources: Source[] };

const QUESTIONS: Question[] = [
  {
    id: "sleep",
    tab: "Sleep and memory",
    q: "What have I learned about sleep and memory?",
    answer: [
      "You noted that sleep strengthens whatever you rehearse in the evening, so rereading notes before bed helps them stick",
      { cite: 1 },
      ". You later linked this to the Ebbinghaus forgetting curve and wrote that a second look after a few days flattens it",
      { cite: 2 },
      ". In a voice memo at 2:14 a.m. you wondered whether your best drafts come from ideas you slept on twice",
      { cite: 3 },
      ".",
    ],
    sources: [
      { title: "Sleep consolidates what you rehearse", meta: "Web clip, 9 February 2025" },
      { title: "Forgetting curve, Ebbinghaus", meta: "Note, 3 March 2023" },
      { title: "Voice memo, 2:14 a.m.", meta: "Transcribed, 18 October 2026" },
    ],
  },
  {
    id: "books",
    tab: "Winter reading",
    q: "Which books did I want to read this winter?",
    answer: [
      "Your winter list has three: The Extended Mind by Annie Murphy Paul, which you saved as a PDF",
      { cite: 1 },
      ", Upstream by Mary Oliver, picked up from a friend's recommendation",
      { cite: 2 },
      ", and a reread of A Time of Gifts, which your night train essay mentions twice",
      { cite: 3 },
      ".",
    ],
    sources: [
      { title: "PDF: The Extended Mind", meta: "PDF with 14 highlights, 6 November 2026" },
      { title: "Reading list: winter", meta: "Note, 1 November 2026" },
      { title: "Idea: essay on night trains", meta: "Note, 12 September 2026" },
    ],
  },
  {
    id: "trains",
    tab: "Night trains",
    q: "What was my idea about night trains?",
    answer: [
      "You want to write an essay about trains after dark as a place where memory rearranges itself",
      { cite: 1 },
      ". The draft opens with your grandmother's phrase, the hour of accounts",
      { cite: 2 },
      ", and you flagged an interview on revision from The Paris Review as the frame for the ending",
      { cite: 3 },
      ".",
    ],
    sources: [
      { title: "Idea: essay on night trains", meta: "Note, 12 September 2026" },
      { title: "Grandmother's recipes, scanned", meta: "Scan, 30 December 2024" },
      { title: "Clip: The Paris Review on revision", meta: "Web clip, 4 April 2025" },
    ],
  },
];

function segLength(s: Segment) {
  return typeof s === "string" ? s.length : 1;
}

function Answer({ question }: { question: Question }) {
  const [typed, setTyped] = useState(0);
  const total = question.answer.reduce((n, s) => n + segLength(s), 0);
  const done = typed >= total;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => {
      setTyped((t) => {
        const next = reduce ? total : t + 3;
        if (next >= total) window.clearInterval(id);
        return Math.min(next, total);
      });
    }, 18);
    return () => window.clearInterval(id);
  }, [total]);

  const starts = question.answer.reduce<number[]>((acc, s, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + segLength(question.answer[i - 1]));
    return acc;
  }, []);

  const rendered = question.answer.map((s, i) => {
    const left = typed - starts[i];
    if (left <= 0) return null;
    if (typeof s === "string") return <span key={i}>{s.slice(0, left)}</span>;
    return (
      <sup key={i} className={styles.cite}>
        <a href={`#k5-src-${s.cite}`} aria-label={`Source ${s.cite}`}>
          {s.cite}
        </a>
      </sup>
    );
  });

  return (
    <>
      <p className={styles.askAnswer} aria-live="polite" aria-busy={!done}>
        {rendered}
        {!done && <span className={styles.caret} aria-hidden="true" />}
      </p>

      <ol className={styles.sources} data-ready={done}>
        {question.sources.map((s, i) => (
          <li key={s.title} id={`k5-src-${i + 1}`}>
            <span className={styles.sourceNum}>{i + 1}</span>
            <span className={styles.sourceTitle}>{s.title}</span>
            <span className={styles.sourceMeta}>{s.meta}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

export default function AskNotes() {
  const [index, setIndex] = useState(0);
  const question = QUESTIONS[index];

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : QUESTIONS.length - 1)) % QUESTIONS.length;
    setIndex(next);
    document.getElementById(`k5-tab-${QUESTIONS[next].id}`)?.focus();
  }

  return (
    <div className={styles.ask}>
      <div className={styles.segmented} role="tablist" aria-label="Example questions" onKeyDown={onKeyDown}>
        {QUESTIONS.map((q, i) => (
          <button
            key={q.id}
            id={`k5-tab-${q.id}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls="k5-answer"
            tabIndex={i === index ? 0 : -1}
            className={styles.segment}
            onClick={() => setIndex(i)}
          >
            {q.tab}
          </button>
        ))}
      </div>

      <div className={styles.askPanel} id="k5-answer" role="tabpanel" aria-labelledby={`k5-tab-${question.id}`}>
        <div className={styles.askQuery}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span>{question.q}</span>
        </div>
        <Answer key={question.id} question={question} />
      </div>
    </div>
  );
}
