"use client";

import { useState } from "react";
import styles from "./fragments.module.css";
import { DEMO_NOTES, backlinks, contextFor, noteById } from "./data";

const TARGET = noteById("interview-maya");

/** A note that mentions Maya but does not link to her yet. It is the one thing in this fragment you can act on. */
const MENTION = {
  title: "Standup, 20 October",
  text: "Ask Maya whether the exported folder opened in her other editor.",
  age: "3 days ago",
};

const AGES: Record<string, string> = {
  spacing: "38 days ago",
  pricing: "200 days ago",
  trust: "180 days ago",
};

export default function Linked() {
  const [linked, setLinked] = useState(false);
  const from = backlinks(TARGET, DEMO_NOTES);
  const count = from.length + (linked ? 1 : 0);

  return (
    <div className={styles.frag} data-ui>
      <div className={styles.fh}>
        <span>Linked from</span>
        <span className={styles.count} aria-live="polite">
          {count}
        </span>
        <span className={styles.right}>{TARGET.title}</span>
      </div>

      <ul className={styles.rows}>
        {linked && (
          <li className={styles.lrow} data-fresh>
            <span className={styles.ltitle}>{MENTION.title}</span>
            <span className={styles.lctx}>
              Ask <span className={styles.hit}>Maya</span> whether the exported folder opened in her other editor.
            </span>
            <span className={styles.lage}>{MENTION.age}</span>
          </li>
        )}
        {from.map((n) => (
          <li key={n.id} className={styles.lrow}>
            <span className={styles.ltitle}>{n.title}</span>
            <span className={styles.lctx}>
              {contextFor(n, TARGET).map((p, i) =>
                p.hit ? (
                  <span key={i} className={styles.hit}>
                    {p.text}
                  </span>
                ) : (
                  <span key={i}>{p.text}</span>
                ),
              )}
            </span>
            <span className={styles.lage}>{AGES[n.id] ?? ""}</span>
          </li>
        ))}
      </ul>

      <div className={styles.fh}>
        <span>Mentions without a link</span>
        <span className={styles.count}>{linked ? 0 : 1}</span>
      </div>
      {linked ? (
        <p className={styles.emptyline}>Nothing left to link. Every note that mentions Maya now points to her.</p>
      ) : (
        <div className={styles.mention}>
          <span className={styles.ltitle}>{MENTION.title}</span>
          <span className={styles.lctx}>
            Ask <span className={styles.muted}>Maya</span> whether the exported folder opened in her other editor.
          </span>
          <button type="button" className={styles.btn} onClick={() => setLinked(true)}>
            Link it
          </button>
        </div>
      )}
    </div>
  );
}
