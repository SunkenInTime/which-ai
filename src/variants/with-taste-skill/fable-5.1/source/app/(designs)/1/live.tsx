"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { byId, notes, schedule, shortDate, formatDate } from "../notes";

const v = (i: number) => ({ "--i": i }) as CSSProperties;

/* ---------- the hero: the sentence with the live note in it ---------- */

const pool = ["forgetting-curve", "olive", "calvino", "memex", "sourdough", "porto-bridge", "cajal", "green-tea", "luhmann", "miller", "garden-plan"];

export function HeroSentence() {
  const [idx, setIdx] = useState(0);
  const [day, setDay] = useState(2);
  const [links, setLinks] = useState(false);
  const [fading, setFading] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const gap = useRef<HTMLSpanElement>(null);
  const card = useRef<HTMLDivElement>(null);

  // A different note each visit.
  useEffect(() => {
    const t = window.setTimeout(() => setIdx(Math.floor(Math.random() * pool.length)), 0);
    return () => window.clearTimeout(t);
  }, []);

  // The card sits exactly in the gap the sentence leaves for it, measured, never guessed.
  useLayoutEffect(() => {
    const place = () => {
      const g = gap.current, c = card.current;
      if (!g || !c) return;
      c.style.left = `${g.offsetLeft}px`;
      c.style.top = `${g.offsetTop}px`;
      c.style.width = `${g.offsetWidth}px`;
      c.style.height = `${g.offsetHeight}px`;
      c.classList.add("is-placed");
    };
    place();
    document.fonts?.ready.then(place);
    const ro = new ResizeObserver(place);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  const note = byId[pool[idx]];
  const another = () => {
    setFading(true);
    window.setTimeout(() => {
      setIdx((i) => (i + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length);
      setFading(false);
    }, 180);
  };

  return (
    <div className="d1-hero__stage">
      <div className="d1-hero__wrap" ref={wrap}>
        <h1 className="d1-hero__line lines">
          <span className="line">
            <span data-line style={v(0)}>
              Every <span className="d1-gap" ref={gap} aria-hidden="true" /><span className="sr-only">note</span>
            </span>
          </span>
          <span className="line">
            <span data-line style={v(1)}>comes back.</span>
          </span>
        </h1>
        <div className="d1-card" data-ui ref={card} aria-live="polite">
          <div className={`d1-card__in${fading ? " is-fading" : ""}`}>
            <div className="d1-card__top">
              <span className="ui-chip is-on">Back today</span>
              <span className="ui-dim">Day {schedule[day]} · wrote it {shortDate(note.date)}</span>
            </div>
            <div className="d1-card__title">{note.title}</div>
            <div className="d1-card__text">
              {links ? <>Linked to {note.links.map((l) => byId[l].title).join(", ")}.</> : note.body}
            </div>
          </div>
        </div>
        <div className="d1-chips">
          <button type="button" className="d1-chip d1-chip--a" data-ui onClick={another}>
            <span className="d1-chip__label">Bring back</span>
            <span className="d1-chip__value">another note</span>
          </button>
          <div className="d1-chip d1-chip--b" data-ui role="group" aria-label="Returns on">
            <span className="d1-chip__label">Returns on</span>
            <span className="d1-chip__value d1-chip__stepper">
              <button type="button" aria-label="Sooner" onClick={() => setDay((d) => Math.max(0, d - 1))}>−</button>
              <span className="nums">day {schedule[day]}</span>
              <button type="button" aria-label="Later" onClick={() => setDay((d) => Math.min(schedule.length - 1, d + 1))}>+</button>
            </span>
          </div>
          <label className="d1-chip d1-chip--c" data-ui>
            <span className="d1-chip__label">Show its links</span>
            <span className="ui-toggle">
              <input type="checkbox" checked={links} onChange={(e) => setLinks(e.target.checked)} />
              <i />
            </span>
          </label>
        </div>
      </div>
      <p className="d1-hero__sub" data-rise style={v(3)}>
        Commonplace keeps what you read and think, links it to what you already know, and brings it back before you forget.
      </p>
    </div>
  );
}

/* ---------- how it works: drag through the stages ---------- */

const stages = [
  { word: "Write", clause: ["First,", "write it down."], note: "A line is enough. Commonplace keeps the date, the words and whatever you were reading at the time." },
  { word: "Link", clause: ["Then it", "links itself."], note: "Every note that mentions the same thing is listed beside it, whether you linked it or not." },
  { word: "Return", clause: ["Later, it", "comes back."], note: "On day 1, 3, 7, 21, 60 and 180 the note returns. You mark it still true, change it, or let it go." },
  { word: "Keep", clause: ["Always, it", "stays yours."], note: "Your notes are Markdown files in a folder you chose. Any app can read them, now or in twenty years." },
];

function StageFragment({ i }: { i: number }) {
  const sour = byId.sourdough;
  if (i === 0)
    return (
      <div className="d1-frag" data-ui>
        <div className="ui-top"><span className="ui-crumbs"><span>Kitchen notes</span><span>New note</span></span><span>Saved just now</span></div>
        <div className="ui-body">
          <div className="ui-title">{sour.title}</div>
          <div className="ui-meta">{formatDate(sour.date)} · Kitchen</div>
          <p className="ui-text">The kitchen is cold in March. 78% hydration, a twelve-hour cold proof, and the crumb finally opened<span className="ui-caret" /></p>
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div className="d1-frag" data-ui>
        <div className="ui-top"><span className="ui-crumbs"><span>Kitchen notes</span><span>{sour.title}</span></span><span>Saved</span></div>
        <div className="ui-body" style={{ paddingBottom: 14 }}>
          <div className="ui-title">{sour.title}</div>
          <p className="ui-text">…and the crumb finally opened. Next time, a little less salt and a hotter <span className="ui-link">oven</span>.</p>
        </div>
        <div className="ui-head"><b>Mentioned in</b><span>2 notes</span></div>
        <ul className="ui-list ui-rows-lined">
          <li className="ui-row is-selected"><span>Oven temperatures, checked</span><span className="ui-when">2 Mar</span></li>
          <li className="ui-row"><span>Kitchen notes</span><span className="ui-when">1 Aug</span></li>
        </ul>
        <div className="ui-head"><b>Not yet linked</b><span>1 note</span></div>
        <ul className="ui-list">
          <li className="ui-row"><span>Tea at 80 degrees</span><button type="button" className="ui-btn ui-btn--ghost" style={{ height: 26 }}>Link</button></li>
        </ul>
      </div>
    );
  if (i === 2)
    return (
      <div className="d1-frag" data-ui>
        <div className="ui-top"><strong>Back today</strong><span>2 of 4</span></div>
        <div className="ui-body">
          <span className="ui-chip">Day 21 · third return</span>
          <div className="ui-title" style={{ marginTop: 12 }}>{sour.title}</div>
          <div className="ui-meta">Written {formatDate(sour.date)} · Kitchen</div>
          <p className="ui-text">{sour.body}</p>
          <div className="ui-tag-row" style={{ marginTop: 16 }}>
            <button type="button" className="ui-btn">Still true</button>
            <button type="button" className="ui-btn ui-btn--ghost">Edit</button>
            <button type="button" className="ui-btn ui-btn--ghost">Let it go</button>
          </div>
        </div>
      </div>
    );
  return (
    <div className="d1-frag" data-ui>
      <div className="ui-top"><span className="ui-crumbs"><span>~/Notes</span><span>Kitchen</span></span><span>6 files</span></div>
      <ul className="ui-files">
        <li className="is-selected"><span>Sourdough at 78% hydration.md</span><span>1.1 KB</span></li>
        <li><span>Oven temperatures, checked.md</span><span>0.8 KB</span></li>
        <li><span>Tea at 80 degrees.md</span><span>0.6 KB</span></li>
        <li><span>Kitchen notes.md</span><span>0.4 KB</span></li>
        <li><span>Garden plan with Priya.md</span><span>0.9 KB</span></li>
        <li><span>Repot the olive in March.md</span><span>0.7 KB</span></li>
      </ul>
      <div className="ui-foot"><span>Plain Markdown, synced by your own folder</span><button type="button" className="ui-btn ui-btn--ghost">Export all</button></div>
    </div>
  );
}

export function Stages() {
  const [i, setI] = useState(0);
  const pct = (i / (stages.length - 1)) * 100;
  const s = stages[i];
  return (
    <section className="d1-stages" aria-labelledby="d1-stages-h">
      <div className="d1-stages__left">
        <h2 id="d1-stages-h" className="d1-stages__clause" key={`c${i}`}>
          {s.clause[0]}
          <br />
          {s.clause[1]}
        </h2>
        <p className="d1-stages__note" key={`n${i}`}>{s.note}</p>
      </div>
      <div className="d1-stages__right">
        <div className="d1-stages__fragwrap" key={`f${i}`}>
          <StageFragment i={i} />
        </div>
      </div>
      <div className="d1-stages__slider">
        <div className="d1-stages__trackwrap">
          <input
            className="d1-stages__range"
            type="range"
            min={0}
            max={stages.length - 1}
            step={1}
            value={i}
            onChange={(e) => setI(Number(e.target.value))}
            aria-label="Stage"
            aria-valuetext={s.word}
          />
          <div className="d1-stages__track" aria-hidden="true">
            <div className="d1-stages__fill" style={{ width: `${pct}%` }} />
            <div className="d1-stages__thumb" style={{ left: `${pct}%` }} />
          </div>
        </div>
        <ol className="d1-stages__names">
          {stages.map((st, k) => (
            <li key={st.word} className={k === i ? "is-on" : undefined}>
              <button type="button" onClick={() => setI(k)} aria-current={k === i ? "step" : undefined}>{st.word}</button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- showcase: the headline you can type ---------- */

function search(q: string) {
  const words = q.toLowerCase().split(/[^a-z0-9%°]+/).filter((w) => w.length >= 2);
  if (!words.length) return notes.filter((n) => n.kind !== "hub").slice(0, 3);
  return notes
    .map((n) => {
      const t = n.title.toLowerCase(), b = n.body.toLowerCase();
      const score = words.reduce((s, w) => s + (t.includes(w) ? 2 : 0) + (b.includes(w) ? 1 : 0), 0);
      return { n, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || b.n.date.localeCompare(a.n.date))
    .slice(0, 3)
    .map((r) => r.n);
}

const kindName: Record<string, string> = { reading: "Reading", kitchen: "Kitchen", garden: "Garden", travel: "Travel", idea: "Ideas", people: "People", hub: "Index" };

export function Ask() {
  const [q, setQ] = useState("oven temperature");
  const results = search(q);
  return (
    <section className="d1-ask" aria-labelledby="d1-ask-h">
      <div className="d1-ask__line ui-plain" data-ui>
        <input className="d1-ask__input" value={q} onChange={(e) => setQ(e.target.value)} aria-labelledby="d1-ask-h" spellCheck={false} autoComplete="off" />
      </div>
      <div className="grid d1-ask__row">
        <div className="d1-ask__text">
          <h2 id="d1-ask-h">Ask it anything you ever noted</h2>
          <p className="d1-ask__examples" data-reveal>
            The line above is a real search. Try <button type="button" onClick={() => setQ("olive tree")}>olive tree</button>, <button type="button" onClick={() => setQ("Porto")}>Porto</button> or <button type="button" onClick={() => setQ("Calvino")}>Calvino</button>.
          </p>
        </div>
        <div className="d1-ask__answer" data-ui data-reveal>
          <div className="ui-head"><b>{results.length === 1 ? "1 note" : `${results.length} notes`}</b><span>{q.trim() ? `for “${q.trim()}”` : "most recent"}</span></div>
          <ul className="ui-list ui-rows-lined ui-rows-tall">
            {results.length ? results.map((n, k) => (
              <li key={n.id} className={`ui-row${k === 0 ? " is-selected" : ""}`}><span>{n.title}</span><span className="ui-when">{shortDate(n.date)} · {kindName[n.kind]}</span></li>
            )) : <li className="ui-row"><span className="ui-dim">Nothing yet. It would be the first note about it.</span></li>}
          </ul>
        </div>
      </div>
    </section>
  );
}
