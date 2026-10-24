"use client";

import { useId, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import styles from "./page.module.css";

type Card = { kind: "card"; id: string; title: string; date: string; keys: string[]; fresh?: boolean };
type Guide = { kind: "guide"; id: string; label: string; pos: number };
type Item = Card | Guide;

/* A sample drawer, in Luhmann's order: each card stands behind the one it continues, not in alphabetical order. */
const DRAWER: Item[] = [
  { kind: "guide", id: "g-memory", label: "Memory", pos: 0 },
  { kind: "card", id: "ebbinghaus", title: "Ebbinghaus: the forgetting curve", date: "3 Feb", keys: ["forget", "rememb", "memor", "curve", "ebbinghaus", "review", "recall"] },
  { kind: "card", id: "spaced", title: "Spaced repetition, in practice", date: "9 Feb", keys: ["spaced", "repet", "review", "revis", "exam", "stud", "test", "flashcard", "learn"] },
  { kind: "card", id: "sleep", title: "Sleep and memory", date: "21 Feb", keys: ["sleep", "night", "nap", "dream", "bed", "rest", "memor", "evening"] },
  { kind: "card", id: "walk", title: "Walk before writing", date: "2 Mar", keys: ["walk", "writ", "think", "outside", "idea", "draft", "morning"] },
  { kind: "card", id: "commonplace", title: "Why I keep a commonplace book", date: "8 Mar", keys: ["commonplace", "quot", "read", "book", "copy", "notebook"] },
  { kind: "guide", id: "g-home", label: "Home", pos: 1 },
  { kind: "card", id: "kitchen", title: "Kitchen: three quotes compared", date: "11 Mar", keys: ["kitchen", "builder", "cabinet", "renovat", "worktop", "cost", "price", "estimate"] },
  { kind: "card", id: "sourdough", title: "Sourdough starter log", date: "16 Mar", keys: ["sourdough", "bread", "starter", "flour", "bak", "rye", "loaf"] },
  { kind: "guide", id: "g-work", label: "Work", pos: 2 },
  { kind: "card", id: "q3", title: "Q3 planning: what slipped", date: "24 Mar", keys: ["plan", "deadline", "launch", "slip", "q3", "quarter", "roadmap", "project"] },
  { kind: "card", id: "daniel", title: "Meeting with Daniel, 14 March", date: "14 Mar", keys: ["meeting", "daniel", "agenda", "call", "follow", "minutes"] },
];

const START_TITLE = "Revise the night before";
const START_BODY = "Go over the notes once in the evening, then sleep on it. See [[Sleep and memory]].";

const words = (text: string) => text.toLowerCase().match(/[a-z0-9]{2,}/g) ?? [];

function score(card: Card, text: string) {
  const lower = text.toLowerCase();
  const links = [...lower.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1].trim());
  let s = links.includes(card.title.toLowerCase()) ? 6 : 0;
  const ws = words(lower.replace(/\[\[[^\]]+\]\]/g, " "));
  for (const key of card.keys) if (ws.some((w) => w.startsWith(key))) s += 1;
  return s;
}

function guideOf(items: Item[], index: number) {
  for (let i = index; i >= 0; i--) {
    const it = items[i];
    if (it.kind === "guide") return it.label;
  }
  return "the drawer";
}

export default function FileACard() {
  const [items, setItems] = useState<Item[]>(DRAWER);
  const [title, setTitle] = useState(START_TITLE);
  const [body, setBody] = useState(START_BODY);
  const [when, setWhen] = useState<"week" | "month">("week");
  const [filedId, setFiledId] = useState<string | null>(null);
  const [cameBack, setCameBack] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [query, setQuery] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const counter = useRef(0);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const listId = useId();

  const cards = items.filter((i): i is Card => i.kind === "card" && !i.fresh);
  const suggestions = useMemo(() => {
    if (query === null) return [];
    const q = query.toLowerCase();
    return cards.filter((c) => c.title.toLowerCase().includes(q)).slice(0, 4);
  }, [query, cards]);

  function updateQuery(el: HTMLTextAreaElement) {
    const before = el.value.slice(0, el.selectionStart ?? el.value.length);
    const m = before.match(/\[\[([^\]\n]*)$/);
    setQuery(m ? m[1] : null);
    setActive(0);
  }

  function pick(card: Card) {
    const el = bodyRef.current;
    if (!el) return;
    const caret = el.selectionStart ?? el.value.length;
    const before = el.value.slice(0, caret).replace(/\[\[([^\]\n]*)$/, `[[${card.title}]]`);
    const next = before + el.value.slice(caret);
    setBody(next);
    setQuery(null);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(before.length, before.length);
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % suggestions.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + suggestions.length) % suggestions.length); }
    else if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); pick(suggestions[active]); }
    else if (e.key === "Escape") { setQuery(null); }
  }

  function file(e: FormEvent) {
    e.preventDefault();
    const name = title.trim() || "Untitled card";
    const text = `${name} ${body}`;
    const ranked = cards
      .map((c) => ({ c, s: score(c, text) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s);
    counter.current += 1;
    const fresh: Card = { kind: "card", id: `new-${counter.current}`, title: name, date: "Today", keys: [], fresh: true };
    const base = items.filter((i) => !(i.kind === "card" && i.fresh && counter.current - Number(i.id.slice(4)) >= 3));
    let next: Item[];
    let message: string;
    const back = when === "week" ? "a week from today" : "a month from today";
    if (ranked.length) {
      const best = ranked[0].c;
      const at = base.findIndex((i) => i.id === best.id);
      next = [...base.slice(0, at + 1), fresh, ...base.slice(at + 1)];
      const others = ranked.slice(1, 3).map((r) => r.c);
      setCameBack([best.id, ...others.map((o) => o.id)]);
      message =
        `Filed behind “${best.title}”, under ${guideOf(base, at)}. ` +
        (others.length
          ? `${others.length === 1 ? "One older card" : "Two older cards"} came back with it: ${others.map((o) => `“${o.title}”`).join(" and ")}. `
          : "") +
        `It returns with your morning cards ${back}, at 7:00.`;
    } else {
      next = [...base, fresh];
      setCameBack([]);
      message = `No neighbours yet, so it waits at the back of the drawer. It comes back ${back}, or the first time you write about the same thing.`;
    }
    setItems(next);
    setFiledId(fresh.id);
    setStatus(message);
    setTitle("");
    setBody("");
    setQuery(null);
  }

  return (
    <div className={styles.fileWork}>
      <form data-ui className={styles.dialog} onSubmit={file} aria-label="Write a card">
        <div className={styles.dlgHead}>
          <span className={styles.dlgTitle}>New card</span>
          <span className={styles.dlgMeta}>Drawer: Everything</span>
        </div>
        <label className={styles.dlgLabel} htmlFor="v2-title">Title</label>
        <input
          id="v2-title"
          className={styles.dlgInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What is this card about?"
          autoComplete="off"
        />
        <label className={styles.dlgLabel} htmlFor="v2-body">Card</label>
        <div className={styles.dlgArea}>
          <textarea
            id="v2-body"
            ref={bodyRef}
            className={styles.dlgText}
            value={body}
            rows={5}
            placeholder="Write a thought. Type [[ to link another card."
            onChange={(e) => { setBody(e.target.value); updateQuery(e.target); }}
            onKeyDown={onKeyDown}
            onClick={(e) => updateQuery(e.currentTarget)}
            onBlur={() => setTimeout(() => setQuery(null), 150)}
            role="combobox"
            aria-expanded={suggestions.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={suggestions.length ? `${listId}-${active}` : undefined}
          />
          {suggestions.length > 0 && (
            <ul id={listId} role="listbox" className={styles.dlgMenu} aria-label="Link a card">
              {suggestions.map((s, i) => (
                <li
                  key={s.id}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={styles.dlgOption}
                  onMouseDown={(e) => { e.preventDefault(); pick(s); }}
                >
                  {s.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.dlgRow}>
          <span className={styles.dlgLabelInline} id="v2-when">Bring it back</span>
          <div className={styles.segment} role="radiogroup" aria-labelledby="v2-when">
            <button type="button" role="radio" aria-checked={when === "week"} onClick={() => setWhen("week")}>In a week</button>
            <button type="button" role="radio" aria-checked={when === "month"} onClick={() => setWhen("month")}>In a month</button>
          </div>
        </div>
        <button type="submit" className={styles.dlgFile} disabled={!title.trim() && !body.trim()}>
          File the card
        </button>
      </form>

      <p className={styles.fileStatus} aria-live="polite">
        {status || "Type [[ in the card to link it to one already in the drawer, then file it."}
      </p>

      <div data-ui className={styles.drawerBox} aria-label="The drawer">
        <ol className={styles.drawerList}>
          {items.map((it) =>
            it.kind === "guide" ? (
              <li key={it.id} className={styles.dGuide} style={{ "--pos": it.pos } as React.CSSProperties}>
                <span className={styles.dGuideTab}>{it.label}</span>
                <span className={styles.dGuideStrip} />
              </li>
            ) : (
              <li
                key={it.id}
                className={`${styles.dCard} ${it.id === filedId ? styles.dCardNew : ""} ${cameBack.includes(it.id) ? styles.dCardBack : ""}`}
              >
                <span className={styles.dCardTitle}>{it.title}</span>
                <span className={styles.dCardDate}>
                  {it.id === filedId ? "Filed just now" : cameBack.includes(it.id) ? "Came back" : it.date}
                </span>
                {cameBack.includes(it.id) && <span className={styles.dSignal} aria-hidden="true" />}
              </li>
            ),
          )}
        </ol>
        <div className={styles.drawerFront} aria-hidden="true">
          <span className={styles.drawerLabel}>Everything, filed by thought</span>
        </div>
      </div>
    </div>
  );
}
