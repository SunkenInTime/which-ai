"use client";

import { useMemo, useState } from "react";
import ui from "./ui.module.css";
import Loop from "./Loop";
import { ago, recall, reasonFor } from "./data";

const START_TITLE = "Mira, 2 November";
const START_TEXT =
  "Mira’s birthday is on the 2nd. Something from our trip, maybe, or that wave print she kept talking about. Book somewhere for dinner by Friday.";

const SIDEBAR = [
  { label: "Today", rows: [{ t: "Mira, 2 November", active: true }, { t: "Inbox", n: "2" }, { t: "From your past", n: "3" }] },
  {
    label: "Recent",
    rows: [
      { t: "Budget review, 23 October" },
      { t: "Call with the fitter" },
      { t: "Kitchen: three quotes compared" },
      { t: "Q3 planning: what slipped" },
      { t: "Balcony: what grows in shade" },
    ],
  },
  { label: "Folders", rows: [{ t: "Personal", n: "214" }, { t: "Work", n: "461" }, { t: "Reading", n: "158" }, { t: "Home", n: "97" }] },
];

/** The hero: a working note with Engram's recall margin beside it. */
export default function Recall({ className = "" }: { className?: string }) {
  const [title, setTitle] = useState(START_TITLE);
  const [text, setText] = useState(START_TEXT);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [typed, setTyped] = useState(false);

  const matches = useMemo(() => recall(`${title} ${text}`, dismissed), [title, text, dismissed]);
  const linked = useMemo(() => [...text.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]), [text]);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const link = (target: string) => {
    if (linked.includes(target)) return;
    setTyped(true);
    setText((prev) => `${prev.replace(/\s+$/, "")} [[${target}]]`);
  };

  return (
    <div data-ui className={`${ui.app} ${className}`} aria-label="Engram, a note being written with related older notes in the margin">
      <div className={ui.topbar}>
        <div className={ui.vault}>
          <span className={ui.vaultMark} aria-hidden="true">
            A
          </span>
          Ana’s notes
        </div>
        <div className={ui.search} aria-hidden="true">
          <span>Search or jump to a note</span>
          <span className={ui.kbd}>⌘ K</span>
        </div>
        <div className={ui.sync}>
          <span className={ui.dot} aria-hidden="true" />
          Synced, 2 devices
        </div>
      </div>

      <nav className={ui.sidebar} aria-label="Vault (sample)">
        {SIDEBAR.map((g) => (
          <div className={ui.group} key={g.label}>
            <div className={ui.groupLabel}>{g.label}</div>
            {g.rows.map((r) => (
              <div key={r.t} className={`${ui.navRow} ${"active" in r && r.active ? ui.navActive : ""}`}>
                <span>{r.t}</span>
                {"n" in r && r.n ? <span className={ui.count}>{r.n}</span> : null}
              </div>
            ))}
          </div>
        ))}
      </nav>

      <div className={ui.sheet}>
        <article className={ui.note}>
          <div className={ui.crumb}>Personal</div>
          <label htmlFor="v1-title" className="sr-only">
            Note title
          </label>
          <input
            id="v1-title"
            className={ui.title}
            value={title}
            onChange={(e) => {
              setTyped(true);
              setTitle(e.target.value);
            }}
            spellCheck={false}
          />
          <div className={ui.meta}>Friday 24 October 2026 · {words} words</div>
          <label htmlFor="v1-body" className="sr-only">
            Note text. Type here and related older notes appear in the margin.
          </label>
          <textarea
            id="v1-body"
            className={ui.body}
            value={text}
            placeholder="Write anything. Try “the kitchen quotes” or “I slept badly”."
            onChange={(e) => {
              setTyped(true);
              setText(e.target.value);
            }}
            spellCheck={false}
          />
          <div className={ui.linksIn} aria-live="polite">
            {linked.length ? (
              <>
                <span>Links in this note</span>
                {linked.map((l) => (
                  <span key={l} className={ui.chip}>
                    {l}
                  </span>
                ))}
              </>
            ) : (
              <span>Type [[ to link a note, or use Link in the margin.</span>
            )}
          </div>
        </article>

        <aside className={ui.margin} aria-label="Related older notes">
          <div className={ui.marginHead}>
            <span className={ui.marginTitle}>From your notes</span>
            <span className={ui.count}>{matches.length ? `${matches.length} related` : "Listening"}</span>
          </div>
          <div className={ui.marginHint}>Type in the note. What you wrote before answers here.</div>
          <ul className={ui.cards} aria-live="polite">
            {matches.map((m, i) => {
              const isLinked = linked.includes(m.note.title);
              return (
                <li
                  key={m.note.id}
                  className={`${ui.card} ${ui.cardEnter}`}
                  style={{ "--d": `${typed ? i * 50 : 760 + i * 90}ms` } as React.CSSProperties}
                >
                  {m.note.clip ? (
                    <div className={ui.cardPicture}>
                      <Loop {...m.note.clip} />
                    </div>
                  ) : m.note.picture ? (
                    <div className={ui.cardPicture}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.note.picture.src} width={m.note.picture.width} height={m.note.picture.height} alt={m.note.picture.alt} />
                    </div>
                  ) : null}
                  <div className={ui.cardTop}>
                    <span className={ui.cardTitle}>{m.note.title}</span>
                    <span className={ui.when}>{ago(m.note.date)}</span>
                  </div>
                  <div className={ui.why}>{reasonFor(m.shared)}</div>
                  <p className={ui.excerpt}>
                    {m.excerpt.map((part, j) => (part.hit ? <mark key={j}>{part.text}</mark> : <span key={j}>{part.text}</span>))}
                  </p>
                  <div className={ui.cardActions}>
                    <button
                      type="button"
                      className={`${ui.small} ${isLinked ? ui.smallDone : ui.smallPrimary}`}
                      onClick={() => link(m.note.title)}
                      aria-pressed={isLinked}
                    >
                      {isLinked ? "Linked" : "Link"}
                    </button>
                    <button type="button" className={ui.small} onClick={() => setDismissed((d) => [...d, m.note.id])}>
                      Not now
                    </button>
                  </div>
                </li>
              );
            })}
            {!matches.length ? <li className={ui.empty}>Nothing older matches yet. Keep writing.</li> : null}
          </ul>
        </aside>
      </div>
    </div>
  );
}
