"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Note = { id: number; text: string; linked: string | null };

const STOP = new Set([
  "about", "after", "again", "have", "into", "just", "need", "needs", "next",
  "that", "than", "them", "then", "there", "this", "three", "with", "what",
  "when", "your", "from", "book", "idea",
]);

const START: Note[] = [
  { id: 5, text: "Ask Dana how the pricing test went", linked: null },
  { id: 4, text: "Naps after studying help memory stick", linked: null },
  { id: 3, text: "Ragù needs three hours, not two", linked: null },
  { id: 2, text: "Lisbon in May. Book the tram tour early", linked: null },
  { id: 1, text: "Essay idea: a field guide to forgetting", linked: null },
];

const TONES = [styles.toneWhite, styles.toneCobalt, styles.toneTomato, styles.toneInk];
const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5];

function keywords(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-zà-ÿ]+/)
    .filter((word) => word.length > 3 && !STOP.has(word));
}

export default function CaptureWall() {
  const [notes, setNotes] = useState(START);
  const [value, setValue] = useState("");

  function save(event: React.FormEvent) {
    event.preventDefault();
    const text = value.trim();
    if (!text) return;
    const words = keywords(text);
    const match = notes.find((note) => {
      const theirs = keywords(note.text);
      return words.some((word) =>
        theirs.some((other) => other.startsWith(word.slice(0, 5)) || word.startsWith(other.slice(0, 5))),
      );
    });
    const next: Note = {
      id: notes[0].id + 1,
      text,
      linked: match ? match.text : null,
    };
    setNotes([next, ...notes].slice(0, 8));
    setValue("");
  }

  return (
    <div className={styles.wall}>
      <form className={styles.wallForm} onSubmit={save}>
        <label htmlFor="thought">A thought you want to keep</label>
        <div>
          <input
            id="thought"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Try: studying tip from the podcast"
            maxLength={70}
            autoComplete="off"
          />
          <button type="submit">Save note</button>
        </div>
      </form>
      <ul className={styles.wallNotes} aria-live="polite">
        {notes.map((note) => (
          <li
            key={note.id}
            className={`${styles.sticky} ${TONES[note.id % TONES.length]}`}
            style={{ "--tilt": `${TILTS[note.id % TILTS.length]}deg` } as React.CSSProperties}
          >
            <p>{note.text}</p>
            {note.id > START.length && (
              <span>
                {note.linked ? `Linked to “${note.linked}”` : "Starts a new topic"}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
