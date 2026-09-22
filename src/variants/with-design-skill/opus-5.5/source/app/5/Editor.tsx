"use client";

import { useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";

type Note = { title: string; excerpt: string; age: string; words: string[] };

const notebook: Note[] = [
  { title: "Spacing beats rereading", excerpt: "Review just before you'd forget. Five spaced reviews beat twenty in a row.", age: "2 years ago", words: ["reread", "rereading", "review", "reviewing", "cramming", "cram", "exam", "study", "studying", "remember"] },
  { title: "Sleep does the filing", excerpt: "Deep sleep moves the day into long-term memory.", age: "8 months ago", words: ["sleep", "sleeping", "slept", "memory", "morning", "night"] },
  { title: "The forgetting curve", excerpt: "Half of new material is gone within a day without review.", age: "3 years ago", words: ["forget", "forgot", "forgetting", "blank", "remember", "memory"] },
  { title: "Tests are for learning, not grading", excerpt: "Trying to recall beats looking it up again — even when you get it wrong.", age: "1 year ago", words: ["exam", "exams", "test", "tests", "quiz", "recall", "study"] },
  { title: "Habits hide in the cue", excerpt: "Change what you see first thing and the routine follows.", age: "5 months ago", words: ["habit", "habits", "routine", "routines", "cue", "daily"] },
  { title: "Every action is a vote", excerpt: "Clear: each time you do the thing, you vote for who you are.", age: "2 years ago", words: ["habit", "habits", "identity", "vote", "daily"] },
  { title: "Seneca's letters were notes", excerpt: "124 letters, one idea each, all linking back to each other.", age: "3 years ago", words: ["seneca", "stoic", "stoicism", "letters", "writing"] },
  { title: "The evening review", excerpt: "Seneca's three questions: what did I do badly, well, and what's left?", age: "1 year ago", words: ["seneca", "evening", "night", "review", "journal"] },
  { title: "Read with a question", excerpt: "Books stick when I'm reading to answer something.", age: "4 months ago", words: ["reading", "read", "book", "books", "question"] },
  { title: "Anti-library", excerpt: "Eco's unread books are more useful than the read ones.", age: "2 years ago", words: ["reading", "read", "book", "books", "unread"] },
  { title: "Keep the bedroom cold", excerpt: "Around 18°C. Core temperature has to drop for sleep to start.", age: "6 months ago", words: ["sleep", "bedroom", "night", "insomnia", "tired"] },
];

const initial = `The night before an exam I'd reread everything three times and still go blank in the morning.

What finally worked was reviewing a little every few days — and actually sleeping.`;

function tokens(text: string) {
  return new Set(text.toLowerCase().match(/[a-z]+/g) ?? []);
}

export default function Editor() {
  const [title, setTitle] = useState("Why I stopped cramming");
  const [text, setText] = useState(initial);
  const area = useRef<HTMLTextAreaElement>(null);
  // Caret position once the reader has clicked into the note; until then, links append.
  const caret = useRef<[number, number] | null>(null);

  const related = useMemo(() => {
    const words = tokens(title + " " + text);
    return notebook
      .map((n) => ({ ...n, hits: n.words.filter((w) => words.has(w)) }))
      .filter((n) => n.hits.length > 0)
      .sort((a, b) => b.hits.length - a.hits.length)
      .slice(0, 4);
  }, [title, text]);

  function link(noteTitle: string) {
    const el = area.current;
    const insert = `[[${noteTitle}]]`;
    if (!el) return;
    const [start, end] = caret.current ?? [text.length, text.length];
    const atEnd = start === text.length && end === text.length;
    const piece = atEnd ? `${text.endsWith(" ") || text.endsWith("\n") ? "" : " "}${insert}` : insert;
    const next = text.slice(0, start) + piece + text.slice(end);
    setText(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + piece.length;
      el.setSelectionRange(pos, pos);
      caret.current = [pos, pos];
    });
  }

  return (
    <div className={styles.window}>
      <div className={styles.sheet}>
        <label className={styles.srOnly} htmlFor="note-title">
          Note title
        </label>
        <input
          id="note-title"
          className={styles.noteTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={styles.srOnly} htmlFor="note-body">
          Note
        </label>
        <textarea
          id="note-body"
          ref={area}
          className={styles.noteBody}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSelect={(e) => {
            const t = e.currentTarget;
            caret.current = [t.selectionStart, t.selectionEnd];
          }}
          spellCheck={false}
        />
      </div>
      <aside className={styles.related} aria-live="polite">
        <h2 className={styles.relatedTitle}>You&rsquo;ve written about this before</h2>
        {related.length === 0 ? (
          <p className={styles.empty}>
            Nothing related in this notebook yet. Try a sentence about sleep,
            habits, reading or Seneca.
          </p>
        ) : (
          <ul className={styles.relatedList}>
            {related.map((n) => {
              const linked = text.includes(`[[${n.title}]]`);
              return (
                <li key={n.title} className={styles.relatedItem}>
                  <p className={styles.relatedNote}>{n.title}</p>
                  <p className={styles.relatedExcerpt}>{n.excerpt}</p>
                  <div className={styles.relatedFoot}>
                    <span>
                      {n.age}, shares{" "}
                      {n.hits.slice(0, 2).map((h, i) => (
                        <span key={h}>
                          {i > 0 && " and "}
                          <mark className={styles.hit}>{h}</mark>
                        </span>
                      ))}
                    </span>
                    <button
                      className={styles.linkBtn}
                      onClick={() => link(n.title)}
                      disabled={linked}
                    >
                      {linked ? "Linked" : "Link"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </aside>
    </div>
  );
}
