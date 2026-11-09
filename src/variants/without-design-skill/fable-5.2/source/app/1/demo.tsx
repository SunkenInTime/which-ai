"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { NOTES, THREADS, type Note } from "./notes";
import s from "./demo.module.css";

/* ------------------------------------------------------------------ */
/* The note that types itself until the visitor takes over.            */
/* ------------------------------------------------------------------ */

const OPENING = "Finished the chapter on memory last night.";
const REST =
  " Strange how little of a book survives the month after I read it.\n\nMaybe the fix isn’t reading more. Maybe it’s a long walk, and trying to explain the idea to myself out loud.";

const PROMPTS = [
  { label: "sourdough", text: " Unrelated: the sourdough starter needs feeding before the weekend." },
  { label: "my dad", text: " Dad told the ferry story at dinner. I should record it properly this time." },
];

/* ------------------------------------------------------------------ */
/* Recall: a deliberately tiny stand-in for the real thing.            */
/* ------------------------------------------------------------------ */

const TOKEN = /\[\[[^\[\]\n]+\]\]|[A-Za-zÀ-ɏ][A-Za-zÀ-ɏ'’-]*/g;

const hit = (kw: string, token: string) =>
  kw.endsWith("*") ? token.startsWith(kw.slice(0, -1)) : token === kw;

type Recalled = { note: Note; linked: boolean; trig: string[]; score: number };

function recall(text: string) {
  const linkedTitles: string[] = [];
  const tokens: string[] = [];
  let linkWords = 0;
  for (const m of text.matchAll(TOKEN)) {
    const t = m[0];
    if (t.startsWith("[[")) {
      const title = t.slice(2, -2).trim();
      linkedTitles.push(title.toLowerCase());
      linkWords += title.split(/\s+/).length;
    } else {
      tokens.push(t.toLowerCase().replace(/’/g, "'"));
    }
  }
  const unique = new Set(tokens);
  const hot = new Set<string>();

  const results: Recalled[] = [];
  NOTES.forEach((note) => {
    const linked = linkedTitles.includes(note.title.toLowerCase());
    const trig: string[] = [];
    const matched: string[] = [];
    for (const kw of note.kw) {
      for (const t of unique) {
        if (hit(kw, t)) {
          if (!trig.includes(kw)) trig.push(kw);
          if (!matched.includes(t)) matched.push(t);
        }
      }
    }
    if (linked || matched.length > 0) {
      results.push({ note, linked, trig, score: matched.length + (linked ? 100 : 0) });
    }
  });

  // Array.prototype.sort is stable, so ties keep the corpus order.
  const top = results.sort((a, b) => b.score - a.score).slice(0, 3);
  top.forEach((r) =>
    unique.forEach((t) => {
      if (r.trig.some((kw) => hit(kw, t))) hot.add(t);
    }),
  );

  return { top, hot, words: tokens.length + linkWords, links: linkedTitles.length };
}

/** Paints `[[links]]` and the words that are pulling old notes back. */
function rich(text: string, hot: Set<string>, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    const t = m[0];
    if (idx > last) out.push(text.slice(last, idx));
    if (t.startsWith("[[")) {
      out.push(
        <span key={`${keyPrefix}${k++}`} className={s.wl}>
          <span className={s.br}>[[</span>
          {t.slice(2, -2)}
          <span className={s.br}>]]</span>
        </span>,
      );
    } else if (hot.has(t.toLowerCase().replace(/’/g, "'"))) {
      out.push(
        <span key={`${keyPrefix}${k++}`} className={s.hot}>
          {t}
        </span>,
      );
    } else {
      out.push(t);
    }
    last = idx + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function markBody(body: string, trig: string[]): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of body.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    const t = m[0];
    if (trig.some((kw) => hit(kw, t.toLowerCase()))) {
      if (idx > last) out.push(body.slice(last, idx));
      out.push(<mark key={k++}>{t}</mark>);
      last = idx + t.length;
    }
  }
  if (last < body.length) out.push(body.slice(last));
  return out;
}

/* ------------------------------------------------------------------ */

type Autocomplete = { start: number; end: number; query: string; index: number };

export function Demo() {
  const [text, setText] = useState(OPENING);
  const [auto, setAuto] = useState(true);
  const [ac, setAc] = useState<Autocomplete | null>(null);

  const taRef = useRef<HTMLTextAreaElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const popRef = useRef<HTMLUListElement>(null);
  const pendingCaret = useRef<number | null>(null);

  const { top, hot, words, links } = useMemo(() => recall(text), [text]);
  const activeIds = useMemo(() => new Map(top.map((r) => [r.note.id, r.linked])), [top]);

  /* --- self-typing intro ------------------------------------------ */
  useEffect(() => {
    if (!auto) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;
    let timer: number;
    const tick = () => {
      i = reduce ? REST.length : i + 1;
      setText(OPENING + REST.slice(0, i));
      if (i >= REST.length) {
        setAuto(false);
        return;
      }
      const ch = REST[i - 1];
      const pause = ch === "\n" ? 320 : /[.,?]/.test(ch) ? 240 : 24 + Math.random() * 44;
      timer = window.setTimeout(tick, pause);
    };
    timer = window.setTimeout(tick, reduce ? 0 : 1500);
    return () => window.clearTimeout(timer);
  }, [auto]);

  /* --- restore the caret after programmatic edits ------------------ */
  useLayoutEffect(() => {
    const ta = taRef.current;
    if (ta && pendingCaret.current !== null) {
      const p = pendingCaret.current;
      pendingCaret.current = null;
      ta.focus({ preventScroll: true });
      ta.setSelectionRange(p, p);
    }
  });

  /* --- park the [[ menu under the brackets ------------------------- */
  useLayoutEffect(() => {
    const marker = markerRef.current;
    const pop = popRef.current;
    const field = fieldRef.current;
    if (!marker || !pop || !field) return;
    const left = Math.max(0, Math.min(marker.offsetLeft, field.clientWidth - pop.offsetWidth));
    pop.style.left = `${left}px`;
    pop.style.top = `${marker.offsetTop + marker.offsetHeight + 6}px`;
  });

  const suggestions = useMemo(() => {
    if (!ac) return [];
    const q = ac.query.trim().toLowerCase();
    return NOTES.filter((n) => n.title.toLowerCase().includes(q)).slice(0, 5);
  }, [ac]);

  const syncAc = (value: string, caret: number) => {
    const m = /\[\[([^\[\]\n]{0,40})$/.exec(value.slice(0, caret));
    setAc((prev) => {
      if (!m) return null;
      const start = caret - m[0].length;
      const same = prev && prev.start === start && prev.query === m[1];
      return { start, end: caret, query: m[1], index: same ? prev.index : 0 };
    });
  };

  const accept = (note: Note) => {
    if (!ac) return;
    const insert = `[[${note.title}]]`;
    const rest = text.slice(ac.end);
    const tail = rest.startsWith("]]") ? rest.slice(2) : rest;
    pendingCaret.current = ac.start + insert.length;
    setText(text.slice(0, ac.start) + insert + tail);
    setAc(null);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!ac || suggestions.length === 0) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      const n = suggestions.length;
      setAc({ ...ac, index: (ac.index + step + n) % n });
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      accept(suggestions[Math.min(ac.index, suggestions.length - 1)]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setAc(null);
    }
  };

  const append = (extra: string) => {
    setAuto(false);
    const base = text.replace(/\s+$/, "");
    const next = base + extra;
    pendingCaret.current = next.length;
    setText(next);
    setAc(null);
  };

  const startLink = () => {
    setAuto(false);
    const next = `${text.replace(/\s+$/, "")} See also [[`;
    pendingCaret.current = next.length;
    setText(next);
    setAc({ start: next.length - 2, end: next.length, query: "", index: 0 });
  };

  const menuOpen = ac !== null && suggestions.length > 0;
  const activeIndex = ac ? Math.min(ac.index, Math.max(0, suggestions.length - 1)) : 0;

  return (
    <div className={s.window}>
      {/* window chrome */}
      <div className={s.chrome} aria-hidden="true">
        <div className={s.dots}>
          <i />
          <i />
          <i />
        </div>
        <div className={s.path}>
          <span>Inbox</span>
          <b>/</b>
          <span className={s.pathHere}>Why I forget what I read</span>
        </div>
        <div className={s.tools}>
          <span className={s.search}>
            Search <kbd>⌘K</kbd>
          </span>
          <span className={s.sync}>
            <i /> Saved locally
          </span>
        </div>
      </div>

      <div className={s.body}>
        {/* sidebar — set dressing */}
        <aside className={s.sidebar} aria-hidden="true">
          <ul className={s.navList}>
            <li data-on>
              <svg viewBox="0 0 16 16">
                <path d="M2 9.5 3.6 3.6A1 1 0 0 1 4.6 3h6.8a1 1 0 0 1 1 .6L14 9.5M2 9.5V12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5M2 9.5h3.5l.8 1.5h3.4l.8-1.5H14" />
              </svg>
              Inbox <em>3</em>
            </li>
            <li>
              <svg viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="2.6" />
                <path d="M8 1.8v1.6M8 12.6v1.6M1.8 8h1.6M12.6 8h1.6M3.6 3.6l1.1 1.1M11.3 11.3l1.1 1.1M3.6 12.4l1.1-1.1M11.3 4.7l1.1-1.1" />
              </svg>
              Today
            </li>
            <li>
              <svg viewBox="0 0 16 16">
                <path d="M3 4.5h10M3 8h10M3 11.5h6" />
              </svg>
              All notes <em>1,284</em>
            </li>
            <li>
              <svg viewBox="0 0 16 16">
                <circle cx="4" cy="4.5" r="1.6" />
                <circle cx="12" cy="6" r="1.6" />
                <circle cx="6.5" cy="12" r="1.6" />
                <path d="M5.5 5 10.4 5.8M4.6 6 6 10.5M10.9 7.2 7.6 10.9" />
              </svg>
              Map
            </li>
          </ul>

          <p className={s.sideLabel}>Recent</p>
          <ul className={s.noteList}>
            {NOTES.slice(0, 8).map((n) => (
              <li key={n.id} data-on={activeIds.has(n.id) || undefined}>
                <i />
                <span>{n.short}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* editor — real, editable */}
        <section
          className={s.editor}
          aria-label="Live demo: a note in Engram"
          onMouseDown={(e) => {
            // Like a real editor: clicking the empty page puts the caret at the end.
            if (e.target !== e.currentTarget) return;
            e.preventDefault();
            setAuto(false);
            setAc(null);
            taRef.current?.focus({ preventScroll: true });
            taRef.current?.setSelectionRange(text.length, text.length);
          }}
        >
          <p className={s.docMeta}>
            <span>Today, 9:41</span>
            <span>Untitled thought → Inbox</span>
          </p>
          <h3 className={s.docTitle}>Why I forget what I read</h3>

          <div className={s.field} ref={fieldRef}>
            <div className={s.mirror} aria-hidden="true">
              {ac ? (
                <>
                  {rich(text.slice(0, ac.start), hot, "a")}
                  <span ref={markerRef} className={s.pending}>
                    {text.slice(ac.start, ac.end)}
                  </span>
                  {rich(text.slice(ac.end), hot, "b")}
                </>
              ) : (
                rich(text, hot, "a")
              )}
              {auto && <span className={s.caret} />}
              {"​"}
            </div>
            <textarea
              ref={taRef}
              className={s.input}
              value={text}
              spellCheck={false}
              autoCapitalize="sentences"
              aria-label="Demo note. Type here to see related notes appear."
              aria-autocomplete="list"
              onChange={(e) => {
                setText(e.target.value);
                syncAc(e.target.value, e.target.selectionStart);
              }}
              onSelect={(e) => syncAc(e.currentTarget.value, e.currentTarget.selectionStart)}
              onKeyDown={onKeyDown}
              onFocus={() => setAuto(false)}
              onPointerDown={() => setAuto(false)}
              onBlur={() => setAc(null)}
            />
            {menuOpen && (
              <ul className={s.menu} ref={popRef} role="listbox" aria-label="Link to a note">
                <li className={s.menuHead} role="presentation">
                  Link to…
                </li>
                {suggestions.map((n, i) => (
                  <li
                    key={n.id}
                    role="option"
                    aria-selected={i === activeIndex}
                    data-on={i === activeIndex || undefined}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      accept(n);
                    }}
                  >
                    <span>{n.title}</span>
                    <em>{n.when}</em>
                  </li>
                ))}
                <li className={s.menuFoot} role="presentation">
                  <kbd>↑</kbd>
                  <kbd>↓</kbd> choose <kbd>↵</kbd> link
                </li>
              </ul>
            )}
          </div>

          <div className={s.prompts}>
            <span className={s.promptsLabel}>{auto ? "Typing…" : "Your turn. Keep typing, or add"}</span>
            {PROMPTS.map((p) => (
              <button key={p.label} type="button" onClick={() => append(p.text)}>
                + {p.label}
              </button>
            ))}
            <button type="button" className={s.linkChip} onClick={startLink}>
              [[ a link
            </button>
          </div>

          <p className={s.status}>
            <span>{words} words</span>
            <span>
              {links} {links === 1 ? "link" : "links"}
            </span>
            <span>{top.length} related</span>
            <span className={s.statusPath}>~/Engram/inbox/why-i-forget.md</span>
          </p>
        </section>

        {/* recall — the point of the whole thing */}
        <aside className={s.related} aria-label="Related notes" aria-live="polite">
          <header className={s.relHead}>
            <h4>Related</h4>
            <span>
              <i /> reading along
            </span>
          </header>

          {top.length === 0 ? (
            <p className={s.empty}>
              Nothing yet. Keep writing — Engram brings notes back when what you’re typing starts to
              sound like them.
            </p>
          ) : (
            <ul className={s.relList}>
              {top.map(({ note, linked, trig }) => (
                <li key={note.id} className={s.rel} data-linked={linked || undefined}>
                  <p className={s.relMeta}>
                    <span>{linked ? "Linked" : `You, ${note.when}`}</span>
                    <span>{note.links} links</span>
                  </p>
                  <h5>{note.title}</h5>
                  <p className={s.relBody}>{markBody(note.body, trig)}</p>
                </li>
              ))}
            </ul>
          )}

          <figure className={s.map} aria-hidden="true">
            <svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
              {THREADS.map(([a, b]) => {
                const A = NOTES.find((n) => n.id === a);
                const B = NOTES.find((n) => n.id === b);
                if (!A || !B) return null;
                return <line key={`${a}-${b}`} className={s.thread} x1={A.x} y1={A.y} x2={B.x} y2={B.y} />;
              })}
              {NOTES.map((n) => (
                <line
                  key={n.id}
                  className={s.edge}
                  data-on={activeIds.has(n.id) || undefined}
                  data-linked={activeIds.get(n.id) || undefined}
                  x1={150}
                  y1={76}
                  x2={n.x}
                  y2={n.y}
                />
              ))}
              {NOTES.map((n) => (
                <g key={n.id} className={s.node} data-on={activeIds.has(n.id) || undefined}>
                  <circle className={s.halo} cx={n.x} cy={n.y} r="8" />
                  <circle className={s.dot} cx={n.x} cy={n.y} r="2.6" />
                </g>
              ))}
              <circle className={s.meRing} cx="150" cy="76" r="9" />
              <circle className={s.me} cx="150" cy="76" r="4" />
            </svg>
            <figcaption>
              <span>
                <i data-kind="me" /> this note
              </span>
              <span>
                <i data-kind="on" /> surfaced
              </span>
              <span>1,284 notes</span>
            </figcaption>
          </figure>
        </aside>
      </div>
    </div>
  );
}
