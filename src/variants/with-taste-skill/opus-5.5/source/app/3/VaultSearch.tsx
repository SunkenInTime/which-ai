"use client";

import { useId, useMemo, useState } from "react";
import s from "./page.module.css";
import { backlinks, byId, search, terms, type Hit, type Note } from "./vault";

const EXAMPLES = ["sleep and memory", "what did Daniel say about pricing", "how wet should the dough be"];

const stem = (w: string) => w.replace(/(ing|ed|es|s)$/u, "") || w;

/** Wraps the words of the query that appear in the text in <mark>. */
function Highlight({ text, words }: { text: string; words: string[] }) {
  const stems = words.map(stem).filter((w) => w.length > 2);
  if (!stems.length) return <>{text}</>;
  const pattern = new RegExp(`(${stems.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "giu");
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

/** A note's text, with [[links]] shown the way Engram shows them. */
function NoteText({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[[") ? (
          <span key={i} className={s.wikilink}>
            {part.slice(2, -2)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

const snippetOf = (note: Note, words: string[]) => {
  const stems = words.map(stem);
  const plain = note.body.map((b) => b.replace(/\[\[|\]\]/g, ""));
  return plain.find((b) => stems.some((w) => b.toLowerCase().includes(w))) ?? plain[0];
};

/**
 * The showcase's live thing: the section's headline is a real search line over a sample vault.
 * Results answer as the visitor types; the chosen result opens beside them with its backlinks.
 */
export default function VaultSearch({ initial }: { initial: string }) {
  const [query, setQuery] = useState(initial);
  const [picked, setPicked] = useState<string | null>(null);
  const inputId = useId();
  const hits: Hit[] = useMemo(() => search(query), [query]);
  const words = useMemo(() => terms(query), [query]);
  const openId = picked && hits.some((h) => h.note.id === picked) ? picked : hits[0]?.note.id;
  const open = openId ? byId(openId) : undefined;
  const linked = open ? backlinks(open.id) : [];

  const refill = (q: string) => {
    setQuery(q);
    setPicked(null);
  };

  return (
    <>
      <form className={s.searchForm} role="search" onSubmit={(e) => e.preventDefault()} data-reveal>
        <label htmlFor={inputId} className={s.srOnly}>
          Search the sample notes
        </label>
        <input
          id={inputId}
          className={s.searchInput}
          type="search"
          value={query}
          onChange={(e) => refill(e.target.value)}
          placeholder="Ask your notes anything"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
        />
      </form>

      <div className={s.answer}>
        <div className={`${s.results} ${s.panel}`} data-ui data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          <div className={s.panelBar}>
            <span>{hits.length ? `${hits.length} of 14 notes` : "No notes match yet"}</span>
            <span>Searched on this device</span>
          </div>
          <div aria-live="polite">
            {hits.length ? (
              hits.map((h) => {
                const why = h.related.filter((r) => !h.matched.includes(r));
                return (
                  <button
                    type="button"
                    key={h.note.id}
                    className={s.hit}
                    aria-pressed={h.note.id === openId}
                    onClick={() => setPicked(h.note.id)}
                  >
                    <span className={s.hitTop}>
                      <span className={s.hitTitle}>
                        <Highlight text={h.note.title} words={words} />
                      </span>
                      <span className={s.hitMeta}>
                        {h.note.folder}, {h.note.date}
                      </span>
                    </span>
                    <span className={s.hitSnippet}>
                      <Highlight text={snippetOf(h.note, words)} words={words} />
                    </span>
                    {why.length > 0 && <span className={s.hitWhy}>Matched by meaning: {why.join(", ")}</span>}
                  </button>
                );
              })
            ) : (
              <p className={s.empty}>
                Nothing in these fourteen notes yet. In your own vault Engram also looks inside PDFs and photos.
              </p>
            )}
          </div>
        </div>

        <div className={s.openNote} data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
        {open && (
          <article className={s.panel} data-ui>
            <div className={s.panelBar}>
              <span>{open.folder}</span>
              <span>{open.links.length ? `${open.links.length} link${open.links.length > 1 ? "s" : ""}` : "No links yet"}</span>
            </div>
            <div className={s.noteBody}>
              <h3 className={s.noteTitle}>{open.title}</h3>
              <p className={s.noteMeta}>Edited {open.date}</p>
              {open.body.map((b) => (
                <p key={b}>
                  <NoteText text={b} />
                </p>
              ))}
            </div>
            <div className={s.backlinks}>
              {linked.length ? `Linked from ${linked.length} note${linked.length > 1 ? "s" : ""}` : "No backlinks yet"}
              {linked.length > 0 && (
                <ul>
                  {linked.map((n) => (
                    <li key={n.id}>{n.title}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        )}
        </div>

        <ul className={s.examples} aria-label="Try another question" data-reveal style={{ "--d": "240ms" } as React.CSSProperties}>
          <li className={s.examplesLabel}>Try</li>
          {EXAMPLES.map((q) => (
            <li key={q}>
              <button type="button" className={s.example} onClick={() => refill(q)}>
                {q}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
