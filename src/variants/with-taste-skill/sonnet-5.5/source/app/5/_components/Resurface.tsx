"use client";

import { useState } from "react";
import styles from "./fragments.module.css";
import { RESURFACE_DAYS } from "../../_shared/facts";
import { dueToday, noteById } from "./data";

const START = dueToday();

type Result = { kind: "ok" | "again"; text: string };

export default function Resurface() {
  const [done, setDone] = useState<Record<string, Result>>({});
  const left = START.filter((d) => !done[d.id]).length;

  function mark(id: string, interval: number, kind: "ok" | "again") {
    const i = (RESURFACE_DAYS as readonly number[]).indexOf(interval);
    const next = RESURFACE_DAYS[i + 1];
    const text =
      kind === "again"
        ? "Back tomorrow"
        : next
          ? `Back in ${next - interval} days`
          : "Learned. It stays in your notes.";
    setDone((d) => ({ ...d, [id]: { kind, text } }));
  }

  return (
    <div className={styles.frag} data-ui>
      <div className={styles.fh}>
        <span>Resurface</span>
        <span className={styles.count}>{START.length} due today</span>
        <span className={styles.right} aria-live="polite">
          {left === 0 ? "That is all for today" : `${left} left`}
        </span>
      </div>
      <ul className={styles.rows}>
        {START.map((d) => {
          const n = noteById(d.id);
          const r = done[d.id];
          return (
            <li key={d.id} className={styles.due} data-done={r ? "" : undefined}>
              <div>
                <div className={styles.dueTitle}>{n.title}</div>
                <div className={styles.dueMeta}>
                  {d.interval === 1 ? "Opened yesterday" : `Last opened ${d.interval} days ago`}
                </div>
              </div>
              {r ? (
                <span className={styles.dueResult}>{r.text}</span>
              ) : (
                <div className={styles.dueBtns}>
                  <button type="button" className={styles.btnGhost} onClick={() => mark(d.id, d.interval, "again")}>
                    Again
                  </button>
                  <button type="button" className={styles.btn} onClick={() => mark(d.id, d.interval, "ok")}>
                    Remembered
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
