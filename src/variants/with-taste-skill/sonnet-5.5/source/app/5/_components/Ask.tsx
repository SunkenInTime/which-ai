"use client";

import { useState } from "react";
import styles from "./fragments.module.css";
import { QUESTIONS, ask, noteById, type Answer } from "./data";

export default function Ask() {
  const [answer, setAnswer] = useState<Answer>(() => ask(QUESTIONS[0]));
  const [text, setText] = useState("");
  const [run, setRun] = useState(0);

  function go(q: string) {
    const t = q.trim();
    if (!t) return;
    setAnswer(ask(t));
    setRun((n) => n + 1);
  }

  return (
    <div className={styles.frag} data-ui>
      <div className={styles.fh}>
        <span>Ask your notes</span>
      </div>
      <form
        className={styles.askForm}
        onSubmit={(e) => {
          e.preventDefault();
          go(text);
        }}
      >
        <input
          className={styles.askInput}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask anything you have written down"
          aria-label="Ask your notes"
          autoComplete="off"
        />
        <button type="submit" className={styles.btn} disabled={!text.trim()}>
          Ask
        </button>
      </form>
      <ul className={styles.chips} aria-label="Questions to try">
        {QUESTIONS.map((q) => (
          <li key={q}>
            <button
              type="button"
              className={styles.chip}
              aria-pressed={answer.question === q}
              onClick={() => {
                setText("");
                go(q);
              }}
            >
              {q}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.answer} key={run} aria-live="polite">
        <p className={styles.aq}>{answer.question}</p>
        <p className={styles.atext}>
          {answer.parts.map((p, i) =>
            typeof p === "number" ? (
              <sup key={i} className={styles.fn}>
                {p}
              </sup>
            ) : (
              <span key={i}>{p}</span>
            ),
          )}
        </p>
        {answer.sources.length > 0 ? (
          <ol className={styles.sources}>
            {answer.sources.map((s, i) => (
              <li key={s.id} className={styles.source}>
                <span className={styles.fn}>{i + 1}</span>
                <span>
                  <span className={styles.sourceTitle}>{noteById(s.id).title}</span>
                  <br />
                  <span className={styles.sourceQuote}>
                    {s.quote.length > 150 ? s.quote.slice(0, 149).trimEnd() + "…" : s.quote}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className={styles.nosrc}>No sources. Engram would rather say so than guess.</p>
        )}
      </div>
    </div>
  );
}
