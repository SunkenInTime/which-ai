"use client";

import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import styles from "./NotesApp.module.css";
import {
  DEMO_NOTES,
  HERO_NOTE_ID,
  assertLinksMatchFacts,
  backlinks,
  noteById,
  outgoing,
  slug,
  suggestions,
  type DemoNote,
} from "./data";

type Picker = { start: number; caret: number; query: string; index: number } | null;

const LINK_RE = /\[\[([^[\]\n]+)\]\]/g;

/** The Markdown, drawn the way the editor draws it: links in the one hue. */
function highlight(text: string, known: Set<string>): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    const ok = known.has(m[1].trim().toLowerCase());
    out.push(
      <span key={k++} className={ok ? styles.link : styles.dead}>
        {m[0]}
      </span>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function NotesApp() {
  const [notes, setNotes] = useState<DemoNote[]>(DEMO_NOTES);
  const [currentId, setCurrentId] = useState(HERO_NOTE_ID);
  const [trail, setTrail] = useState<string[]>([]);
  const [picker, setPicker] = useState<Picker>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; up: boolean } | null>(null);
  const [status, setStatus] = useState("");
  const [fresh, setFresh] = useState<string | null>(null);
  const [capture, setCapture] = useState(false);
  const [draft, setDraft] = useState("");

  const winRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLElement>(null);
  const captureRef = useRef<HTMLTextAreaElement>(null);
  const captureBtn = useRef<HTMLButtonElement>(null);
  const playing = useRef<number[]>([]);
  const played = useRef(false);
  const original = useRef(noteById(HERO_NOTE_ID).body);

  const current = notes.find((n) => n.id === currentId) ?? notes[0];
  const known = useMemo(() => new Set(notes.map((n) => n.title.toLowerCase())), [notes]);
  const links = useMemo(() => outgoing(current.body, notes), [current.body, notes]);
  const linkedFrom = useMemo(() => backlinks(current, notes), [current, notes]);
  const suggested = useMemo(
    () => suggestions(current, current.body, notes, 2),
    [current, notes],
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") assertLinksMatchFacts();
  }, []);

  const setBody = useCallback((id: string, body: string) => {
    setNotes((all) => all.map((n) => (n.id === id ? { ...n, body } : n)));
  }, []);

  /* ---------- the [[ picker ---------- */

  const matches = useMemo(() => {
    if (!picker) return [];
    const q = picker.query.trim().toLowerCase();
    return notes
      .filter((n) => n.id !== current.id && (!q || n.title.toLowerCase().includes(q)))
      .slice(0, 5);
  }, [picker, notes, current.id]);

  const syncPicker = useCallback((value: string, caret: number) => {
    const before = value.slice(0, caret);
    const m = /\[\[([^[\]\n]{0,40})$/.exec(before);
    setPicker((prev) =>
      m
        ? { start: caret - m[0].length, caret, query: m[1], index: prev && prev.start === caret - m[0].length ? prev.index : 0 }
        : null,
    );
  }, []);

  // Place the menu under the line the caret is on (or above it when the line is low).
  useLayoutEffect(() => {
    const marker = markerRef.current;
    const ta = taRef.current;
    if (!picker || !marker || !ta) {
      setMenuPos(null);
      return;
    }
    const line = 24;
    const top = marker.offsetTop - ta.scrollTop;
    const room = ta.clientHeight - top - line;
    const up = room < 210 && top > 210;
    const width = ta.clientWidth;
    setMenuPos({
      top: up ? top - 8 : top + line + 4,
      left: Math.max(8, Math.min(marker.offsetLeft - 8, width - 300)),
      up,
    });
  }, [picker, current.body]);

  const insert = useCallback(
    (note: DemoNote) => {
      if (!picker) return;
      const body = current.body;
      const before = body.slice(0, picker.start) + `[[${note.title}]]`;
      const next = before + body.slice(picker.caret);
      setBody(current.id, next);
      setPicker(null);
      setFresh(note.id);
      setStatus(`Linked. ${note.title} now lists this note under Linked from.`);
      requestAnimationFrame(() => {
        const ta = taRef.current;
        if (ta && !playing.current.length) {
          ta.focus();
          ta.setSelectionRange(before.length, before.length);
        }
      });
    },
    [picker, current, setBody],
  );

  const addSuggested = useCallback(
    (note: DemoNote) => {
      const body = current.body.replace(/\s*$/, "");
      setBody(current.id, `${body}\n\nSee also ${`[[${note.title}]]`}.`);
      setFresh(note.id);
      setStatus(`Linked. ${note.title} now lists this note under Linked from.`);
    },
    [current, setBody],
  );

  const stopPlayback = useCallback((restore: boolean) => {
    if (!playing.current.length) return;
    playing.current.forEach((t) => window.clearTimeout(t));
    playing.current = [];
    if (restore) {
      setBody(HERO_NOTE_ID, original.current);
      setPicker(null);
      setFresh(null);
      setStatus("");
    }
  }, [setBody]);

  const open = useCallback(
    (id: string) => {
      stopPlayback(true);
      setTrail((t) => [...t, currentId]);
      setCurrentId(id);
      setPicker(null);
      setFresh(null);
      setStatus("");
      requestAnimationFrame(() => taRef.current && (taRef.current.scrollTop = 0));
    },
    [currentId, stopPlayback],
  );

  const back = useCallback(() => {
    setTrail((t) => {
      const prev = t[t.length - 1];
      if (prev) {
        setCurrentId(prev);
        setPicker(null);
        setFresh(null);
        setStatus("");
      }
      return t.slice(0, -1);
    });
  }, []);

  function onKeyDown(e: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (!picker) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.max(1, matches.length);
      setPicker({ ...picker, index: (picker.index + (e.key === "ArrowDown" ? 1 : n - 1)) % n });
    } else if ((e.key === "Enter" || e.key === "Tab") && matches[picker.index]) {
      e.preventDefault();
      insert(matches[picker.index]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setPicker(null);
    }
  }

  function linkButton() {
    const ta = taRef.current;
    if (!ta) return;
    stopPlayback(true);
    ta.focus();
    const at = ta.selectionStart ?? current.body.length;
    const body = current.body;
    const lead = at > 0 && !/\s$/.test(body.slice(0, at)) ? " " : "";
    const next = body.slice(0, at) + lead + "[[" + body.slice(at);
    const caret = at + lead.length + 2;
    setBody(current.id, next);
    requestAnimationFrame(() => {
      ta.setSelectionRange(caret, caret);
      syncPicker(next, caret);
    });
  }

  /* ---------- capture (Option+Space) ---------- */

  const openCapture = useCallback(() => {
    stopPlayback(true);
    setCapture(true);
  }, [stopPlayback]);

  const closeCapture = useCallback(() => {
    setCapture(false);
    requestAnimationFrame(() => captureBtn.current?.focus());
  }, []);

  const saveCapture = useCallback(() => {
    const text = draft.trim();
    if (!text) return;
    const first = text.split("\n")[0].trim();
    const title = first.length > 56 ? first.slice(0, 55).trimEnd() + "…" : first;
    const id = `capture-${Date.now().toString(36)}`;
    const note: DemoNote = { id, title, body: text, tags: [], lastOpened: 0, age: 0 };
    setNotes((all) => [...all, note]);
    setTrail((t) => [...t, currentId]);
    setCurrentId(id);
    setDraft("");
    setCapture(false);
    setPicker(null);
    setFresh(null);
    setStatus(`Captured. Saved as ${slug(title) || "untitled"}.md in your folder.`);
  }, [draft, currentId]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.altKey && e.code === "Space") {
        e.preventDefault();
        openCapture();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openCapture]);

  useEffect(() => {
    if (capture) requestAnimationFrame(() => captureRef.current?.focus());
  }, [capture]);

  /* ---------- the first-visit demonstration ---------- */

  useEffect(() => {
    const el = winRef.current;
    if (!el || played.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      playing.current.push(id);
    };

    const run = () => {
      if (played.current) return;
      played.current = true;
      const base = original.current;
      const lead = "\n\nAlso: [[";
      let t = 0;
      for (let i = 1; i <= lead.length; i++) {
        t += 45;
        later(() => {
          const typed = base + lead.slice(0, i);
          setBody(HERO_NOTE_ID, typed);
          if (i === lead.length) setPicker({ start: typed.length - 2, caret: typed.length, query: "", index: 0 });
        }, t);
      }
      const query = "forg";
      t += 700;
      for (let i = 1; i <= query.length; i++) {
        t += 160;
        later(() => {
          const typed = base + lead + query.slice(0, i);
          setBody(HERO_NOTE_ID, typed);
          setPicker({ start: base.length + lead.length - 2, caret: typed.length, query: query.slice(0, i), index: 0 });
        }, t);
      }
      t += 900;
      later(() => {
        const title = "The forgetting curve";
        const done = base + lead.slice(0, -2) + `[[${title}]]`;
        setBody(HERO_NOTE_ID, done);
        setPicker(null);
        setFresh("forgetting");
        setStatus(`Linked. ${title} now lists this note under Linked from.`);
        playing.current = [];
      }, t);
    };

    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          timer = window.setTimeout(run, 1600);
        } else window.clearTimeout(timer);
      },
      { threshold: [0, 0.5] },
    );
    io.observe(el);

    const abort = () => {
      window.clearTimeout(timer);
      played.current = true;
      stopPlayback(true);
    };
    el.addEventListener("pointerdown", abort);
    el.addEventListener("keydown", abort);
    el.addEventListener("focusin", abort);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      el.removeEventListener("pointerdown", abort);
      el.removeEventListener("keydown", abort);
      el.removeEventListener("focusin", abort);
    };
  }, [setBody, stopPlayback]);

  useEffect(() => {
    if (!fresh) return;
    const t = window.setTimeout(() => setFresh(null), 2400);
    return () => window.clearTimeout(t);
  }, [fresh]);

  /* ---------- render ---------- */

  const caret = picker ? picker.caret : null;
  const mirror =
    caret === null ? (
      highlight(current.body, known)
    ) : (
      <>
        {highlight(current.body.slice(0, caret), known)}
        <i ref={markerRef} className={styles.marker} />
        {highlight(current.body.slice(caret), known)}
      </>
    );

  const ageLabel =
    current.age === 0 ? "Written just now" : `Written ${current.age} days ago`;

  return (
    <div ref={winRef} className={styles.win} data-ui>
      <header className={styles.bar}>
        <span className={styles.mark} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M4 3h3v18H4z M7 3h13v3H7z M7 10.5h8v3H7z M7 18h13v3H7z" fill="currentColor" />
            <circle cx="19" cy="12" r="2.4" fill="currentColor" />
          </svg>
        </span>
        {trail.length > 0 ? (
          <button type="button" className={styles.back} onClick={back}>
            <span aria-hidden="true">‹</span> Back
          </button>
        ) : (
          <span className={styles.crumb}>Notes</span>
        )}
        <span className={styles.crumbTitle}>{current.title}</span>
        <button ref={captureBtn} type="button" className={styles.capture} onClick={openCapture}>
          Capture <kbd>⌥ Space</kbd>
        </button>
      </header>

      <div className={styles.body}>
        <section className={styles.doc} aria-label="Note">
          <h2 className={styles.title}>{current.title}</h2>
          <p className={styles.meta}>
            {ageLabel}. {links.length} {links.length === 1 ? "link" : "links"}, {linkedFrom.length} linked from.
          </p>
          <div className={styles.ed}>
            <div ref={mirrorRef} className={styles.mirror} aria-hidden="true">
              {mirror}
              {"​"}
            </div>
            <textarea
              ref={taRef}
              className={styles.input}
              value={current.body}
              spellCheck={false}
              aria-label={`Text of the note ${current.title}`}
              onChange={(e) => {
                stopPlayback(true);
                setBody(current.id, e.target.value);
                syncPicker(e.target.value, e.target.selectionStart);
              }}
              onKeyDown={onKeyDown}
              onKeyUp={(e) => {
                if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
                  syncPicker(e.currentTarget.value, e.currentTarget.selectionStart);
                }
              }}
              onClick={(e) => syncPicker(e.currentTarget.value, e.currentTarget.selectionStart)}
              onBlur={() => !playing.current.length && setPicker(null)}
              onScroll={(e) => {
                if (mirrorRef.current) mirrorRef.current.scrollTop = e.currentTarget.scrollTop;
              }}
            />
            {picker && menuPos && (
              <ul
                className={styles.menu}
                role="listbox"
                aria-label="Link to a note"
                style={{
                  left: menuPos.left,
                  top: menuPos.top,
                  transform: menuPos.up ? "translateY(-100%)" : undefined,
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                {matches.length === 0 && <li className={styles.none}>No note matches “{picker.query}”</li>}
                {matches.map((n, i) => (
                  <li key={n.id} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={i === picker.index}
                      className={styles.opt}
                      data-active={i === picker.index || undefined}
                      onClick={() => insert(n)}
                    >
                      {n.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.foot}>
            <button type="button" className={styles.linkBtn} onClick={linkButton}>
              <span aria-hidden="true">[[</span> Link a note
            </button>
            <span className={styles.hint}>Type [[ in the text to do the same.</span>
          </div>
        </section>

        <aside className={styles.side} aria-label="Connections">
          <h3 className={styles.sh}>
            Links <span className={styles.count}>{links.length}</span>
          </h3>
          {links.length === 0 ? (
            <p className={styles.empty}>No links yet.</p>
          ) : (
            <ul className={styles.list}>
              {links.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    className={styles.item}
                    data-fresh={fresh === n.id || undefined}
                    onClick={() => open(n.id)}
                  >
                    {n.title}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <h3 className={styles.sh}>
            Linked from <span className={styles.count}>{linkedFrom.length}</span>
          </h3>
          {linkedFrom.length === 0 ? (
            <p className={styles.empty}>Nothing points here yet.</p>
          ) : (
            <ul className={styles.list}>
              {linkedFrom.map((n) => (
                <li key={n.id}>
                  <button type="button" className={styles.item} onClick={() => open(n.id)}>
                    {n.title}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {suggested.length > 0 && (
            <>
              <h3 className={styles.sh}>Suggested</h3>
              <ul className={styles.list}>
                {suggested.map((n) => (
                  <li key={n.id} className={styles.sug}>
                    <span>{n.title}</span>
                    <button type="button" className={styles.add} onClick={() => addSuggested(n)}>
                      Link
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className={styles.file}>
            ~/Engram/{slug(current.title) || "untitled"}.md
          </p>
          <p className={styles.status} role="status" aria-live="polite">
            {status}
          </p>
        </aside>
      </div>

      {capture &&
        createPortal(
        <div
          className={styles.scrim}
          onMouseDown={(e) => e.target === e.currentTarget && closeCapture()}
        >
          <div
            className={styles.dialog}
            data-ui
            role="dialog"
            aria-modal="true"
            aria-label="Capture a note"
            onKeyDown={(e) => {
              if (e.key === "Escape") closeCapture();
            }}
          >
            <textarea
              ref={captureRef}
              className={styles.cap}
              value={draft}
              placeholder="What are you thinking?"
              aria-label="What are you thinking?"
              rows={3}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  saveCapture();
                }
              }}
            />
            <div className={styles.capFoot}>
              <span className={styles.hint}>Enter saves. Esc closes.</span>
              <button type="button" className={styles.ghost} onClick={closeCapture}>
                Cancel
              </button>
              <button type="button" className={styles.save} onClick={saveCapture} disabled={!draft.trim()}>
                Save note
              </button>
            </div>
          </div>
        </div>,
        document.querySelector("[data-p5-root]") ?? document.body,
      )}
    </div>
  );
}
