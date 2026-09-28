"use client";

import { useState } from "react";
import styles from "./styles.module.css";

const known = [
  { title: "Harbour pilot", gist: "Interviewed 14 March. 90% waiting, 10% not panicking." },
  { title: "Deep work", gist: "Two hours, phone in another room, before 11." },
  { title: "Priya", gist: "Runs launches at a fintech. Ask about the first hour." },
  { title: "Sleep", gist: "Wake time matters more than bedtime." },
];

const start =
  "Chapter 3 is really two chapters. The first half is the [[Harbour pilot]] interview. The second is about how I write: Deep work in the morning, and Sleep protecting it.";

export default function Editor() {
  const [text, setText] = useState(start);
  const lower = text.toLowerCase();

  const rows = known.map((k) => {
    const linked = lower.includes(`[[${k.title.toLowerCase()}]]`);
    const mentioned = !linked && lower.includes(k.title.toLowerCase());
    return { ...k, linked, mentioned };
  });
  const linkedRows = rows.filter((r) => r.linked);
  const suggested = rows.filter((r) => r.mentioned);

  function link(title: string) {
    const i = text.toLowerCase().indexOf(title.toLowerCase());
    if (i < 0) return;
    setText(text.slice(0, i) + "[[" + text.slice(i, i + title.length) + "]]" + text.slice(i + title.length));
  }

  return (
    <div className={styles.editor}>
      <div className={styles.sheet}>
        <label htmlFor="note-body" className={styles.sheetTitle}>
          Chapter 3, notes to self
        </label>
        <textarea
          id="note-body"
          className={styles.area}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={9}
          spellCheck={false}
        />
      </div>
      <aside className={styles.margin} aria-label="Related notes" aria-live="polite">
        <h3 className={styles.marginH}>Linked from this note</h3>
        {linkedRows.length === 0 ? (
          <p className={styles.empty}>Nothing linked yet. Wrap a name in double brackets, or accept a suggestion.</p>
        ) : (
          <ul className={styles.rel}>
            {linkedRows.map((r) => (
              <li key={r.title}>
                <strong>{r.title}</strong>
                <span>{r.gist}</span>
              </li>
            ))}
          </ul>
        )}
        <h3 className={styles.marginH}>Loam noticed</h3>
        {suggested.length === 0 ? (
          <p className={styles.empty}>No unlinked mentions. Try typing “Priya”.</p>
        ) : (
          <ul className={styles.rel}>
            {suggested.map((r) => (
              <li key={r.title}>
                <strong>{r.title}</strong>
                <span>{r.gist}</span>
                <button type="button" className={styles.linkBtn} onClick={() => link(r.title)}>
                  Link “{r.title}”
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
