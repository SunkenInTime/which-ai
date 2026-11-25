"use client";

import { useId, useState } from "react";
import s from "./page.module.css";

type Source = { title: string; date: string };
type QA = { q: string; short: string; answer: { text: string; cite?: number }[]; sources: Source[] };

const QAS: QA[] = [
  {
    short: "Q3 roadmap",
    q: "What did we decide about the Q3 roadmap?",
    answer: [
      { text: "You agreed to ship offline mode before the redesign, because support tickets about lost edits doubled in May.", cite: 1 },
      { text: " Search improvements moved to Q4 after the offsite, and Priya owns the beta list.", cite: 2 },
    ],
    sources: [
      { title: "Q3 roadmap decisions", date: "June 4" },
      { title: "Offsite notes, day two", date: "June 19" },
    ],
  },
  {
    short: "Books",
    q: "Which books changed how I work this year?",
    answer: [
      { text: "Deep Work comes up most. You started blocking mornings for writing two weeks after finishing it.", cite: 1 },
      { text: " You also highlighted eleven passages from Four Thousand Weeks and linked three of them to your planning notes.", cite: 2 },
    ],
    sources: [
      { title: "Deep Work, chapter notes", date: "March 2" },
      { title: "Four Thousand Weeks highlights", date: "April 27" },
    ],
  },
  {
    short: "Best thinking",
    q: "When do I do my best thinking?",
    answer: [
      { text: "Mostly on foot. Seven of your voice memos tagged as ideas were recorded on morning walks.", cite: 1 },
      { text: " Your journal also notes clearer writing on days you slept more than seven hours.", cite: 2 },
    ],
    sources: [
      { title: "Idea on the train home", date: "November 9" },
      { title: "Sleep and memory consolidation", date: "August 12" },
    ],
  },
];

export default function AskDemo() {
  const [i, setI] = useState(0);
  const name = useId();
  const qa = QAS[i];

  return (
    <div className={s.ask}>
      <div className={s.segmented} role="radiogroup" aria-label="Example questions">
        {QAS.map((item, idx) => (
          <label key={item.short} className={s.segment} data-active={idx === i || undefined}>
            <input
              type="radio"
              name={name}
              checked={idx === i}
              onChange={() => setI(idx)}
              className={s.srOnly}
            />
            {item.short}
          </label>
        ))}
      </div>

      <div className={s.askPanel} key={i}>
        <p className={s.askQuestion}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {qa.q}
        </p>
        <p className={s.askAnswer}>
          {qa.answer.map((part, idx) => (
            <span key={idx}>
              {part.text}
              {part.cite ? <sup className={s.cite}>[{part.cite}]</sup> : null}
            </span>
          ))}
        </p>
        <ol className={s.askSources}>
          {qa.sources.map((src, idx) => (
            <li key={src.title}>
              <span className={s.cite}>[{idx + 1}]</span>
              <span className={s.askSourceTitle}>{src.title}</span>
              <span className={s.muted}>{src.date}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
