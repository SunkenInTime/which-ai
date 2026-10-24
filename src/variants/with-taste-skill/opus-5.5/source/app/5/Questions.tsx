"use client";

import { useState } from "react";
import { QUESTIONS } from "./data";
import s from "./page.module.css";

/** Questions on the left, the chosen answer large on the right. On a phone the answer opens under its question. */
export default function Questions() {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <h2 id="h-questions" className={`${s.h2} ${s.side}`} data-reveal="">
        Questions
      </h2>
      <div className={s.faqList}>
        <ul className={s.faqItems}>
          {QUESTIONS.map((item, i) => (
            <li key={item.q} className={s.faqItem} data-open={selected === i ? "" : undefined} data-reveal="" style={{ ["--i" as string]: Math.min(i, 4) }}>
              <button
                type="button"
                className={s.faqQ}
                aria-expanded={selected === i}
                onMouseEnter={() => {
                  if (window.matchMedia("(min-width: 1100px) and (hover: hover)").matches) setSelected(i);
                }}
                onFocus={() => setSelected(i)}
                onClick={() => setSelected(i)}
              >
                <span className={s.faqDot} aria-hidden="true" />
                {item.q}
              </button>
              <p className={s.faqInline}>{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.faqPane} aria-live="polite">
        <p key={selected} className={s.faqAnswer}>
          {QUESTIONS[selected].a}
        </p>
      </div>
    </>
  );
}
