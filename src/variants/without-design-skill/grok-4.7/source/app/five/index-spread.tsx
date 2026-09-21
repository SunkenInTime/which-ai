"use client";

import { useState } from "react";
import { StartButton } from "../components/start-button";
import styles from "./five.module.css";

type Entry = {
  id: string;
  head: string;
  gloss: string;
  note: string;
};

const sections: Record<string, Entry[]> = {
  C: [
    {
      id: "nia",
      head: "Nia, on chairs",
      gloss: "Finding a thought by where she was sitting",
      note: "On 3 September she said a folder is the wrong shape for a conversation. She remembers the chair, then the sentence.",
    },
    {
      id: "argument",
      head: "the argument",
      gloss: "The sentence that survived it",
      note: "Everything else from that hour can go. The sentence that mattered was about returning to a place, not winning.",
    },
  ],
  M: [
    {
      id: "memory",
      head: "memory",
      gloss: "What a note owes the person who will read it later",
      note: "Write to the person who was not in the room. Include who was, and the page if there was a page.",
    },
    {
      id: "mornings",
      head: "mornings",
      gloss: "Three lines before anything else",
      note: "Morning pages stay short so they actually happen. They are how the box gets fed.",
    },
  ],
  R: [
    {
      id: "blue",
      head: "The Blue Book",
      gloss: "Page 41, attention as a place",
      note: "Attention is not a spotlight. It is a place you return to.",
    },
    {
      id: "talk",
      head: "a talk from the chapter",
      gloss: "From the chapter on attention",
      note: "The talk is not a new idea. It is the chapter, said out loud to people who have not read the book.",
    },
  ],
  W: [
    {
      id: "rain",
      head: "the smell of rain",
      gloss: "The word, so it stops getting lost",
      note: "Petrichor. Written down so the word stays with the walk it came from.",
    },
    {
      id: "oranges",
      head: "oranges",
      gloss: "Soft, and still the best cake",
      note: "Tied to the recipe card. The walk home is part of the recipe.",
    },
  ],
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function IndexSpread({
  sansClass,
  serifClass,
}: {
  sansClass: string;
  serifClass: string;
}) {
  const [letter, setLetter] = useState("M");
  const [openId, setOpenId] = useState("memory");
  const entries = sections[letter];

  function chooseLetter(next: string) {
    setLetter(next);
    setOpenId(sections[next][0].id);
  }

  return (
    <main className={`${styles.page} ${sansClass}`}>
      <nav className={styles.thumb} aria-label="Index letters">
        {alphabet.map((item) =>
          sections[item] ? (
            <button
              key={item}
              type="button"
              className={styles.letterBtn}
              aria-current={item === letter ? "true" : undefined}
              aria-label={`Letter ${item}`}
              onClick={() => chooseLetter(item)}
            >
              {item}
            </button>
          ) : (
            <span key={item} className={styles.quiet} aria-hidden="true">
              {item}
            </span>
          ),
        )}
      </nav>

      <div className={styles.spread}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.product}>Commonplace</h1>
            <p className={`${styles.deck} ${serifClass}`}>
              Look up the idea. The note brings what it was linked to.
            </p>
          </div>
          <StartButton
            className={styles.start}
            statusClassName={`${styles.status} ${serifClass}`}
            stackClassName={styles.action}
          />
        </header>

        <p className={styles.mark} aria-hidden="true">
          {letter}
        </p>

        <ul className={styles.list}>
          {entries.map((entry) => {
            const open = entry.id === openId;
            return (
              <li key={entry.id} className={styles.item}>
                <button
                  type="button"
                  className={`${styles.head} ${serifClass}`}
                  aria-expanded={open}
                  onClick={() => setOpenId(entry.id)}
                >
                  {entry.head}
                </button>
                <p className={styles.gloss}>{entry.gloss}</p>
                {open ? (
                  <p className={`${styles.note} ${serifClass}`}>{entry.note}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
