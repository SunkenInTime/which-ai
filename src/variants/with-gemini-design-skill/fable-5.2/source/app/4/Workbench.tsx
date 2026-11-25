"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

type Note = { id: string; title: string; text: string };

const NOTES: Note[] = [
  {
    id: "naps",
    title: "Why naps help learning",
    text: "A 20 minute nap right after studying seems to lock things in. Rest counts as part of the work.\n\nSame idea as [[Sleep and memory]]. Worth trying before the exam, with flashcards in the evening.",
  },
  {
    id: "sleep",
    title: "Sleep and memory",
    text: "Deep sleep moves the day's learning into long-term storage. Short on sleep means short on memory.\n\nSource: lecture on consolidation.",
  },
  {
    id: "spaced",
    title: "Spaced repetition",
    text: "Review flashcards just before you would forget them. Each review pushes the next one further out.\n\nPairs well with [[Sleep and memory]]: study, sleep, review.",
  },
  {
    id: "exam",
    title: "Exam plan",
    text: "Three weeks left. Study in the morning, review flashcards at night, protect sleep.\n\nUse [[Spaced repetition]] to set the dates.",
  },
  {
    id: "talk",
    title: "Talk outline: learning faster",
    text: "Open with a question: what did you read last month, and what did you keep?\n\nThree points: rest, review, writing things down.",
  },
];

const STOP = new Set([
  "about", "after", "before", "with", "that", "this", "them", "then", "from",
  "have", "just", "what", "when", "would", "seems", "same", "idea", "each",
  "next", "well", "last", "month", "three", "things", "worth", "right",
  "part", "into", "means", "short", "down", "further", "pushes", "counts",
]);

const SPOTS = [
  { x: 36, y: 42, lx: 10, ly: 24, anchor: "start" as const },
  { x: 244, y: 42, lx: 270, ly: 24, anchor: "end" as const },
  { x: 36, y: 108, lx: 10, ly: 136, anchor: "start" as const },
  { x: 244, y: 108, lx: 270, ly: 136, anchor: "end" as const },
];

function stems(text: string) {
  return new Set(
    text
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((word) => word.length > 3 && !STOP.has(word))
      .map((word) => word.replace(/(ing|ed|es|s)$/, "")),
  );
}

function linkedTitles(text: string) {
  return [...text.matchAll(/\[\[([^\[\]\n]+)\]\]/g)].map((m) => m[1].trim().toLowerCase());
}

export default function Workbench() {
  const [notes, setNotes] = useState(NOTES);
  const [currentId, setCurrentId] = useState("naps");
  const [caret, setCaret] = useState(0);
  const [pick, setPick] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const pendingCaret = useRef<number | null>(null);

  const current = notes.find((note) => note.id === currentId)!;
  const others = notes.filter((note) => note.id !== currentId);

  const { outgoing, backlinks, related } = useMemo(() => {
    const titles = linkedTitles(current.text);
    const outgoingNotes = others.filter((note) => titles.includes(note.title.toLowerCase()));
    const backlinkNotes = others.filter(
      (note) =>
        !outgoingNotes.includes(note) &&
        linkedTitles(note.text).includes(current.title.toLowerCase()),
    );
    const mine = stems(current.text);
    const relatedNotes = others
      .filter((note) => !outgoingNotes.includes(note) && !backlinkNotes.includes(note))
      .map((note) => {
        const shared = [...stems(`${note.title} ${note.text}`)].filter((word) => mine.has(word));
        return { note, shared };
      })
      .filter((entry) => entry.shared.length > 0)
      .sort((a, b) => b.shared.length - a.shared.length);
    return { outgoing: outgoingNotes, backlinks: backlinkNotes, related: relatedNotes };
  }, [current, others]);

  const open = /\[\[([^\[\]\n]*)$/.exec(current.text.slice(0, caret));
  const suggestions =
    open && !dismissed
      ? others.filter((note) => note.title.toLowerCase().includes(open[1].toLowerCase())).slice(0, 4)
      : [];
  const picked = Math.min(pick, Math.max(suggestions.length - 1, 0));

  useEffect(() => {
    if (pendingCaret.current !== null && input.current) {
      input.current.focus();
      input.current.setSelectionRange(pendingCaret.current, pendingCaret.current);
      pendingCaret.current = null;
    }
  });

  function setText(text: string) {
    setNotes((all) => all.map((note) => (note.id === currentId ? { ...note, text } : note)));
  }

  function choose(note: Note) {
    if (!open) return;
    const start = caret - open[1].length - 2;
    const rest = current.text.slice(caret).replace(/^\]\]/, "");
    const inserted = `[[${note.title}]]`;
    setText(current.text.slice(0, start) + inserted + rest);
    pendingCaret.current = start + inserted.length;
    setCaret(start + inserted.length);
    setPick(0);
  }

  function linkRelated(note: Note) {
    const text = `${current.text.trimEnd()}\n\nSee also [[${note.title}]].`;
    setText(text);
    pendingCaret.current = text.length;
    setCaret(text.length);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!suggestions.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : suggestions.length - 1;
      setPick((picked + step) % suggestions.length);
    } else if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      choose(suggestions[picked]);
    } else if (event.key === "Escape") {
      setDismissed(true);
    }
  }

  const parts = current.text.split(/(\[\[[^\[\]\n]+\]\])/);

  return (
    <div className={styles.bench}>
      <div className={styles.side}>
        <p className={styles.paneLabel}>Notes</p>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <button
                type="button"
                aria-current={note.id === currentId}
                onClick={() => {
                  setCurrentId(note.id);
                  setCaret(0);
                }}
              >
                {note.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.write}>
        <p className={styles.noteTitle}>{current.title}</p>
        <div className={styles.editor}>
          <pre className={styles.mirror} aria-hidden="true">
            {parts.map((part, index) =>
              part.startsWith("[[") ? (
                <span key={index} className={styles.wikilink}>
                  {part}
                </span>
              ) : (
                part
              ),
            )}
            {"\u200b"}
          </pre>
          <textarea
            ref={input}
            className={styles.input}
            aria-label={`Text of the note “${current.title}”`}
            value={current.text}
            spellCheck={false}
            onChange={(event) => {
              setText(event.target.value);
              setCaret(event.target.selectionStart);
              setDismissed(false);
            }}
            onSelect={(event) => {
              if (pendingCaret.current === null) setCaret(event.currentTarget.selectionStart);
            }}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className={styles.assist}>
          {suggestions.length > 0 ? (
            <ul role="listbox" aria-label="Link to a note">
              {suggestions.map((note, index) => (
                <li key={note.id} role="option" aria-selected={index === picked}>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => choose(note)}>
                    {note.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Keep typing, or type <kbd>[[</kbd> to link another note.
            </p>
          )}
        </div>
      </div>

      <div className={styles.context}>
        <svg className={styles.map} viewBox="0 0 280 146" role="img" aria-label="Map of notes connected to this one">
          {others.map((note, index) => {
            const spot = SPOTS[index];
            const linked = outgoing.includes(note) || backlinks.includes(note);
            const near = related.some((entry) => entry.note === note);
            return (
              <g key={note.id} data-state={linked ? "linked" : near ? "near" : "far"}>
                <line x1="140" y1="75" x2={spot.x} y2={spot.y} />
                <circle cx={spot.x} cy={spot.y} r="5" />
                <text x={spot.lx} y={spot.ly} textAnchor={spot.anchor}>
                  {note.title.length > 17 ? `${note.title.slice(0, 16)}…` : note.title}
                </text>
              </g>
            );
          })}
          <circle className={styles.mapSelf} cx="140" cy="75" r="8" />
        </svg>

        <p className={styles.paneLabel}>Linked</p>
        {outgoing.length + backlinks.length === 0 ? (
          <p className={styles.empty}>No links yet.</p>
        ) : (
          <ul className={styles.refs}>
            {[...outgoing, ...backlinks].map((note) => (
              <li key={note.id}>
                <button type="button" onClick={() => setCurrentId(note.id)}>
                  {note.title}
                </button>
                <span>{outgoing.includes(note) ? "Linked from this note" : "Mentions this note"}</span>
              </li>
            ))}
          </ul>
        )}

        <p className={styles.paneLabel}>Related, not linked yet</p>
        {related.length === 0 ? (
          <p className={styles.empty}>Nothing else overlaps. Keep writing.</p>
        ) : (
          <ul className={styles.refs}>
            {related.slice(0, 3).map(({ note, shared }) => (
              <li key={note.id}>
                <button type="button" onClick={() => setCurrentId(note.id)}>
                  {note.title}
                </button>
                <span>Shares: {shared.slice(0, 3).join(", ")}</span>
                <button type="button" className={styles.linkIt} onClick={() => linkRelated(note)}>
                  Link
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
