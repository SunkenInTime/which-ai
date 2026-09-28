"use client";

import { useState } from "react";
import s from "./page.module.css";

type Phrase = {
  id: string;
  text: string;
  title: string;
  related: string[];
};

const phrases: Record<string, Phrase> = {
  rebuild: {
    id: "rebuild",
    text: "Each time you recall something, you rebuild it",
    title: "Recalling a memory rebuilds it",
    related: ["Talk outline: memory and habit", "Thesis idea: forgetting curves"],
  },
  stored: {
    id: "stored",
    text: "the version you rebuild is the one that gets stored",
    title: "The rebuilt version is the one stored",
    related: ["Thesis idea: forgetting curves"],
  },
  sameday: {
    id: "sameday",
    text: "a note written the same day",
    title: "Write the note the same day",
    related: ["Talk outline: memory and habit", "Chapter 4 notes"],
  },
  clear: {
    id: "clear",
    text: "a clear memory of that day",
    title: "Clear memories still fade",
    related: ["Letter to Dad, draft"],
  },
  still: {
    id: "still",
    text: "Writing gives an idea somewhere to stay still",
    title: "Writing makes an idea stay still",
    related: ["Talk outline: memory and habit", "Chapter 4 notes"],
  },
};

const order = ["rebuild", "stored", "sameday", "clear", "still"];

/**
 * The hero demo. Fragment: the passage and the tray become sibling grid items
 * of the hero, so they can sit in two columns on wide screens.
 */
export function Capture() {
  const [saved, setSaved] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSaved((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );

  const phrase = (id: string) => {
    const on = saved.includes(id);
    return (
      <span
        role="button"
        tabIndex={0}
        aria-pressed={on}
        className={s.phrase}
        onClick={() => toggle(id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle(id);
          }
        }}
      >
        {phrases[id].text}
      </span>
    );
  };

  // Newest first, like a feed.
  const notes = [...saved].reverse().map((id) => phrases[id]);
  const linked = new Set(notes.flatMap((n) => n.related)).size;

  return (
    <>
      <div className={s.clip}>
        <p className={s.clipHint}>
          Clipped from a long read, <i>The Rebuilt Memory</i>. Click any phrase to
          highlight it.
        </p>
        <p className={s.passage}>
          Memory is not a recording. {phrase("rebuild")}, and {phrase("stored")}.
          That is why {phrase("sameday")} beats {phrase("clear")}.{" "}
          {phrase("still")} while you work out what it means.
        </p>
        <p className={s.clipActions}>
          <button
            type="button"
            onClick={() => setSaved(saved.length === order.length ? [] : order)}
          >
            {saved.length === order.length ? "Clear highlights" : "Highlight everything"}
          </button>
        </p>
      </div>

      <section className={s.tray} aria-labelledby="tray-title">
        <h2 id="tray-title">
          Saved to Today <span className={s.count}>{saved.length}</span>
        </h2>
        <div aria-live="polite">
          {notes.length === 0 ? (
            <p className={s.empty}>
              Nothing saved yet. Highlight a phrase and it lands here as its own
              note, already linked to what you&rsquo;ve written before.
            </p>
          ) : (
            <>
              <ul className={s.notes}>
                {notes.map((n) => (
                  <li key={n.id} className={s.note}>
                    <p className={s.noteTitle}>{n.title}</p>
                    <p className={s.noteMeta}>From The Rebuilt Memory, just now</p>
                    <p className={s.noteLinks}>
                      Linked to{" "}
                      {n.related.map((r, i) => (
                        <span key={r}>
                          {i > 0 && ", "}
                          <u>{r}</u>
                        </span>
                      ))}
                    </p>
                  </li>
                ))}
              </ul>
              <p className={s.summary}>
                {notes.length} {notes.length === 1 ? "note" : "notes"} saved,
                linked to {linked} older {linked === 1 ? "note" : "notes"}.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
