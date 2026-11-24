"use client";

import { useMemo, useState } from "react";
import s from "./page.module.css";

type Note = {
  id: string;
  title: string;
  kind: string;
  date: string;
  keywords: string[];
};

const NOTES: Note[] = [
  {
    id: "deep-work",
    title: "Deep Work, chapter notes",
    kind: "Book note",
    date: "Mar 2",
    keywords: ["deep work", "focus", "distraction", "attention", "concentrate"],
  },
  {
    id: "walking",
    title: "Why walking helps us think",
    kind: "Web clip",
    date: "Jan 18",
    keywords: ["walk", "walking", "think", "thinking", "creative", "ideas"],
  },
  {
    id: "morning",
    title: "Morning routine experiments",
    kind: "Note",
    date: "Oct 30",
    keywords: ["morning", "routine", "coffee", "early", "before 11", "wake"],
  },
  {
    id: "sleep",
    title: "Sleep and memory consolidation",
    kind: "PDF",
    date: "Aug 12",
    keywords: ["sleep", "memory", "remember", "rest", "tired", "nap"],
  },
  {
    id: "roadmap",
    title: "Q3 roadmap decisions",
    kind: "Meeting note",
    date: "Jun 4",
    keywords: ["roadmap", "q3", "planning", "priorities", "launch", "team"],
  },
  {
    id: "train",
    title: "Idea on the train home",
    kind: "Voice memo",
    date: "Nov 9",
    keywords: ["idea", "product", "train", "commute", "voice"],
  },
  {
    id: "reading",
    title: "Reading list for winter",
    kind: "Note",
    date: "Nov 1",
    keywords: ["reading", "book", "books", "read", "newport", "chapter"],
  },
];

const STARTER =
  "Two weeks of protecting focus time before 11. The best ideas still show up on my morning walk, not at the desk. Worth reading more about this.";

function escape(k: string) {
  return k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function Workbench() {
  const [title, setTitle] = useState("Thinking better in the morning");
  const [body, setBody] = useState(STARTER);

  const matches = useMemo(() => {
    const text = `${title} ${body}`.toLowerCase();
    return NOTES.map((n) => ({
      note: n,
      hits: n.keywords.filter((k) => new RegExp(`\\b${escape(k)}`, "i").test(text)),
    }))
      .filter((m) => m.hits.length > 0)
      .sort((a, b) => b.hits.length - a.hits.length);
  }, [title, body]);

  const linked = new Set(matches.map((m) => m.note.id));
  const words = body.trim() ? body.trim().split(/\s+/).length : 0;

  return (
    <div className={s.bench} aria-label="Try the Kept editor">
      <div className={s.benchBar}>
        <span className={s.benchCrumb}>
          My notes <span aria-hidden="true">/</span> <strong>{title || "Untitled"}</strong>
        </span>
        <span className={s.benchStatus}>Saved on this device</span>
      </div>

      <div className={s.benchGrid}>
        <aside className={s.benchSide} aria-label="Your notes">
          <p className={s.benchSideTitle}>Your notes</p>
          <ul>
            {NOTES.map((n) => (
              <li key={n.id} data-linked={linked.has(n.id) || undefined}>
                <span className={s.benchSideName}>{n.title}</span>
                <span className={s.benchSideMeta}>
                  {n.kind}, {n.date}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <div className={s.benchEditor}>
          <label className={s.benchTitleRow}>
            <span className={s.benchHash} aria-hidden="true">
              #
            </span>
            <span className={s.srOnly}>Note title</span>
            <input
              className={s.benchTitle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              spellCheck={false}
            />
          </label>
          <label className={s.benchBodyLabel}>
            <span className={s.srOnly}>Note body</span>
            <textarea
              className={s.benchBody}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              placeholder="Write anything. Try sleep, roadmap or a book you are reading."
            />
          </label>
          <p className={s.benchFoot}>
            <span className={s.tabular}>{words} words</span>
            <span>Try typing sleep, roadmap or a book title</span>
          </p>
        </div>

        <section className={s.benchLinks} aria-live="polite" aria-label="Linked notes">
          <p className={s.benchSideTitle}>
            Linked notes <span className={s.tabular}>{matches.length}</span>
          </p>
          {matches.length === 0 ? (
            <p className={s.benchEmpty}>Keep writing. Related notes will appear here as you type.</p>
          ) : (
            <ul>
              {matches.slice(0, 4).map(({ note, hits }) => (
                <li key={note.id} className={s.benchLink}>
                  <span className={s.benchLinkTitle}>{note.title}</span>
                  <span className={s.benchLinkWhy}>
                    Mentions {hits.slice(0, 2).map((h, i) => (
                      <span key={h}>
                        {i > 0 ? " and " : ""}
                        <em>{h}</em>
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
