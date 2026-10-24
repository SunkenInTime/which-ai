"use client";

import { useState } from "react";
import styles from "./page.module.css";

const QUESTIONS = [
  {
    q: "Where are my notes stored?",
    a: "In a folder on your own disk, as plain Markdown files: ~/Engram on a Mac, Documents\\Engram on Windows. If you turn on Sync, an encrypted copy travels between your devices; we cannot read it.",
  },
  {
    q: "How does it find related notes without sending them anywhere?",
    a: "A small language model, about 80 MB, runs on your device. It reads your notes there, keeps its index there, and matches what you are writing by meaning, not only by shared words.",
  },
  {
    q: "Can I bring my notes from another app?",
    a: "Yes. Engram imports Apple Notes, Evernote (.enex), Notion exports, Obsidian vaults and any folder of Markdown files. Links between notes come across as links.",
  },
  {
    q: "What happens to my notes if Engram shuts down?",
    a: "Nothing. They are files on your disk that any text editor opens. The free app needs none of our servers, so it keeps working whatever happens to us.",
  },
  {
    q: "Does it work offline?",
    a: "Everything works offline: writing, linking, search and the margin. Only Sync needs a connection, and it catches up when you are back.",
  },
  {
    q: "Is there a web version?",
    a: "Not yet. Engram runs on macOS, Windows, Linux, iPhone and iPad, and Android. Your vault opens on each of them.",
  },
  {
    q: "Can I share a note with someone?",
    a: "Publish any single note as a web page with its own link, and take it down again whenever you like. On the Family plan, everyone also shares one vault.",
  },
  {
    q: "Is there a discount for students?",
    a: "Sync is free for students and teachers. Sign up with your school email address and it switches on.",
  },
];

/** Questions on the left; the selected answer, set large, in a pane on the right. On a phone, answers open in place. */
export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <h2 className={`${styles.display} ${styles.faqHead}`} data-reveal="">
        Questions
      </h2>
      <ul className={styles.faqList} data-reveal="" style={{ "--d": "90ms" } as React.CSSProperties}>
        {QUESTIONS.map((item, i) => (
          <li key={item.q}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={open === i}
              aria-controls={`v1-answer-${i}`}
              onClick={() => setOpen(i)}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
            >
              <span>{item.q}</span>
            </button>
            <p id={`v1-answer-${i}`} className={styles.inlineAnswer} hidden={open !== i}>
              {item.a}
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.answerPane} aria-hidden="true" data-reveal="" style={{ "--d": "180ms" } as React.CSSProperties}>
        {QUESTIONS.map((item, i) => (
          <p key={item.q} className={styles.answer} data-active={open === i}>
            {item.a}
          </p>
        ))}
      </div>
    </>
  );
}
