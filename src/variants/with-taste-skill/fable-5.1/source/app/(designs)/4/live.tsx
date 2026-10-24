"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { notes, byId, backlinks, shortDate, resurfaced } from "../notes";

const v = (i: number) => ({ "--i": i }) as CSSProperties;
const STOP = new Set(["the", "and", "that", "this", "with", "from", "have", "what", "when", "your", "will", "before", "after", "about", "into", "than", "then", "them", "they", "were", "been", "just", "over", "under", "near", "very", "some", "more", "most"]);

function mentionsFor(text: string) {
  const words = [...new Set(text.toLowerCase().split(/[^a-z0-9°%]+/).filter((w) => w.length >= 4 && !STOP.has(w)))];
  return notes
    .map((n) => {
      const hay = `${n.title} ${n.body}`.toLowerCase();
      const hits = words.filter((w) => hay.includes(w));
      return { n, hits };
    })
    .filter((r) => r.hits.length)
    .sort((a, b) => b.hits.length - a.hits.length || b.n.date.localeCompare(a.n.date));
}

/* ---------- hero: the editor that links as you type ---------- */

export function HeroEditor() {
  const [text, setText] = useState("Priya wants the herbs nearest the kitchen door, so the raised beds go along the south wall.");
  const found = mentionsFor(text);
  const linked = found.slice(0, 3);
  const rest = found.slice(3, 5);
  return (
    <div className="d4-editor" data-ui>
      <div className="ui-top"><span className="ui-crumbs"><span>The balcony</span><span>New note</span></span><span>{text.trim() ? "Saved just now" : "Empty"}</span></div>
      <div className="ui-body">
        <label className="ui-label" htmlFor="d4-note">Write a line</label>
        <textarea id="d4-note" className="ui-field ui-area" rows={3} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} />
      </div>
      <div className="ui-head"><b>Mentioned in</b><span>{linked.length ? `${linked.length} ${linked.length === 1 ? "note" : "notes"}` : "nothing yet"}</span></div>
      <ul className="ui-list ui-rows-lined" aria-live="polite">
        {linked.length ? linked.map((r, k) => (
          <li key={r.n.id} className={`ui-row${k === 0 ? " is-selected" : ""}`}><span>{r.n.title}</span><span className="ui-when">{r.hits.slice(0, 2).join(", ")} · {shortDate(r.n.date)}</span></li>
        )) : <li className="ui-row"><span className="ui-dim">Keep typing. Links appear as the words match.</span></li>}
      </ul>
      {rest.length > 0 && (
        <>
          <div className="ui-head"><b>Might also be about</b><span>{rest.length} {rest.length === 1 ? "note" : "notes"}</span></div>
          <ul className="ui-list">
            {rest.map((r) => (
              <li key={r.n.id} className="ui-row"><span>{r.n.title}</span><button type="button" className="ui-btn ui-btn--ghost" style={{ height: 26 }}>Link</button></li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/* ---------- features: the morning page, fixed on the left, set by controls on the right ---------- */

const folders = ["Reading", "Kitchen", "Garden", "Ideas", "People"] as const;
const kindOf: Record<string, string> = { reading: "Reading", kitchen: "Kitchen", garden: "Garden", idea: "Ideas", people: "People", travel: "Reading", hub: "Ideas" };

function Today({ count, on, hour, links }: { count: number; on: Set<string>; hour: number; links: boolean }) {
  const pool = resurfaced.map((r) => ({ ...byId[r.id], reason: r.reason })).concat(
    notes.filter((n) => !resurfaced.some((r) => r.id === n.id) && n.kind !== "hub").map((n) => ({ ...n, reason: "Due today" })),
  );
  const list = pool.filter((n) => on.has(kindOf[n.kind])).slice(0, count);
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return (
    <div className="d4-today" data-ui aria-live="polite">
      <div className="ui-top"><strong>{greeting}</strong><span>{hour}:00 · {list.length} to look at</span></div>
      {list.length ? (
        <ul className="ui-stack">
          {list.map((n, k) => (
            <li key={n.id} className={`ui-item${k === 0 ? " is-selected" : ""}`}>
              <b>{n.title}</b>
              <small>{n.reason}{links ? ` · mentioned in ${backlinks(n.id).length}` : ""}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="ui-text" style={{ padding: "14px" }}>Nothing from those folders today. The next return is tomorrow.</p>
      )}
      <div className="ui-foot"><span>Day 1, 3, 7, 21, 60, 180, then yearly</span><button type="button" className="ui-btn">Start</button></div>
    </div>
  );
}

export function MorningPage() {
  const [count, setCount] = useState(3);
  const [on, setOn] = useState<Set<string>>(new Set(folders));
  const [hour, setHour] = useState(7);
  const [links, setLinks] = useState(false);
  const toggle = (f: string) => setOn((s) => { const n = new Set(s); if (n.has(f)) n.delete(f); else n.add(f); return n; });
  return (
    <section className="d4-pin" aria-labelledby="d4-pin-h">
      <div className="d4-pin__field">
        <Today count={count} on={on} hour={hour} links={links} />
      </div>
      <div className="d4-pin__col">
        <h2 id="d4-pin-h">Your morning page</h2>
        <div className="d4-block">
          <h3>How many come back a day.</h3>
          <p>Three is enough to keep a notebook alive. Eight is for an exam.</p>
          <div className="d4-control" data-ui>
            <label className="ui-label" htmlFor="d4-count">{count} {count === 1 ? "note" : "notes"} a day</label>
            <input id="d4-count" className="ui-range" type="range" min={1} max={8} value={count} onChange={(e) => setCount(Number(e.target.value))} />
          </div>
        </div>
        <div className="d4-block">
          <h3>From which folders.</h3>
          <p>The kitchen can stay quiet. Reading and ideas usually want to come back.</p>
          <div className="d4-control d4-chips" data-ui role="group" aria-label="Folders that return">
            {folders.map((f) => (
              <button key={f} type="button" className={`ui-chip${on.has(f) ? " is-on" : ""}`} aria-pressed={on.has(f)} onClick={() => toggle(f)}>{f}</button>
            ))}
          </div>
        </div>
        <div className="d4-block">
          <h3>At what hour.</h3>
          <p>The page is built once a day and waits. Nothing buzzes.</p>
          <div className="ui-seg" data-ui role="group" aria-label="Hour of the day">
            {[7, 12, 21].map((h) => (
              <button key={h} type="button" aria-pressed={hour === h} onClick={() => setHour(h)}>{h}:00</button>
            ))}
          </div>
        </div>
        <div className="d4-block">
          <h3>With the neighbours counted.</h3>
          <p>A note that many others mention is worth a longer look.</p>
          <label className="ui-toggle d4-toggle" data-ui>
            <input type="checkbox" checked={links} onChange={(e) => setLinks(e.target.checked)} />
            <i />
            <span>Show how many notes mention it</span>
          </label>
        </div>
      </div>
    </section>
  );
}

/* ---------- showcase: lit panel, dark row ---------- */

const panels = [
  { id: "search", name: "Search", lines: "Every word of every note, with the newest first. Results narrow as you type." },
  { id: "editor", name: "The editor", lines: "Plain text with links in double brackets. The links panel fills as you write." },
  { id: "graph", name: "The map", lines: "Notes as dots, links as lines. Pull one and its neighbours come with it." },
  { id: "today", name: "Today", lines: "The returns for the day, with the reason each one is back." },
  { id: "settings", name: "Returns", lines: "Which folders come back and how often. Set once, forgotten." },
  { id: "export", name: "Export", lines: "A zip of the folder, or one note as a file. Nothing is locked in." },
];

function Panel({ id, lit }: { id: string; lit: boolean }) {
  const cls = `d4-panel${lit ? "" : " ui-dark"}`;
  switch (id) {
    case "search":
      return (
        <div className={cls} data-ui>
          <div className="ui-body" style={{ paddingBottom: 10 }}><label className="ui-label" htmlFor={`p-${id}`}>Search</label><input id={`p-${id}`} className="ui-field" defaultValue="olive" readOnly tabIndex={-1} /></div>
          <div className="ui-head"><b>2 notes</b><span>for “olive”</span></div>
          <ul className="ui-list ui-rows-lined ui-rows-tall">
            <li className="ui-row is-selected"><span>Repot the olive in March</span><span className="ui-when">7 Feb · Garden</span></li>
            <li className="ui-row"><span>The balcony</span><span className="ui-when">3 Aug · Index</span></li>
          </ul>
        </div>
      );
    case "editor":
      return (
        <div className={cls} data-ui>
          <div className="ui-top"><span className="ui-crumbs"><span>Reading</span><span>Calvino on lightness</span></span><span>Saved</span></div>
          <div className="ui-body">
            <div className="ui-title">Calvino on lightness</div>
            <div className="ui-meta">12 December 2025 · Reading</div>
            <p className="ui-text">“Lightness for me goes with precision and determination, not with vagueness.” Six Memos, the first lecture. See <span className="ui-link">Reading list</span>.</p>
          </div>
        </div>
      );
    case "graph":
      return (
        <div className={cls} data-ui>
          <div className="ui-top"><strong>The map</strong><span>22 notes · 24 links</span></div>
          <svg className="ui-graph" viewBox="0 0 400 240" width="400" height="240" role="img" aria-label="A map of notes as dots joined by lines">
            {[[200, 120, 90, 60], [200, 120, 310, 70], [200, 120, 120, 200], [200, 120, 300, 190], [90, 60, 40, 130], [310, 70, 360, 150], [120, 200, 60, 220], [300, 190, 340, 230], [90, 60, 150, 20], [310, 70, 250, 20]].map(([x1, y1, x2, y2], k) => (
              <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} className={k < 4 ? "is-hot" : undefined} />
            ))}
            {[[200, 120, "Second brain", true], [90, 60, "Luhmann", false], [310, 70, "Memex", false], [120, 200, "Forgetting curve", false], [300, 190, "Cajal", false], [40, 130, "Index cards", false], [360, 150, "Hippocampus", false], [60, 220, "Spacing", false], [340, 230, "Seahorse", false], [150, 20, "Locke", false], [250, 20, "Miller", false]].map(([x, y, label, hot]) => (
              <g key={String(label)}>
                <circle cx={Number(x)} cy={Number(y)} r={hot ? 7 : 5} className={hot ? "is-hot" : undefined} />
                <text x={Number(x) + 10} y={Number(y) + 4}>{String(label)}</text>
              </g>
            ))}
          </svg>
        </div>
      );
    case "today":
      return (
        <div className={cls} data-ui>
          <div className="ui-top"><strong>Good morning</strong><span>3 to look at</span></div>
          <ul className="ui-stack">
            {resurfaced.slice(0, 3).map((r, k) => (
              <li key={r.id} className={`ui-item${k === 0 ? " is-selected" : ""}`}><b>{byId[r.id].title}</b><small>{r.reason}</small></li>
            ))}
          </ul>
        </div>
      );
    case "settings":
      return (
        <div className={cls} data-ui>
          <div className="ui-top"><strong>Returns</strong><span>5 folders</span></div>
          <ul className="ui-list ui-rows-lined ui-rows-tall">
            {[["Reading", true], ["Ideas", true], ["Garden", true], ["People", true], ["Kitchen", false]].map(([f, on]) => (
              <li key={String(f)} className="ui-row"><span>{String(f)}</span><span className="ui-toggle" aria-hidden="true"><input type="checkbox" defaultChecked={Boolean(on)} tabIndex={-1} readOnly /><i /></span></li>
            ))}
          </ul>
          <div className="ui-foot"><span>Day 1, 3, 7, 21, 60, 180</span><span>then yearly</span></div>
        </div>
      );
    default:
      return (
        <div className={cls} data-ui>
          <div className="ui-top"><strong>Export</strong><span>22 notes</span></div>
          <div className="ui-body">
            <dl className="ui-kv">
              <dt>Format</dt><dd>Markdown, as written</dd>
              <dt>Links</dt><dd>Kept as [[titles]]</dd>
              <dt>Size</dt><dd>41 KB</dd>
              <dt>Goes to</dt><dd>~/Downloads/Notes.zip</dd>
            </dl>
            <div className="ui-tag-row" style={{ marginTop: 16 }}><button type="button" className="ui-btn">Export everything</button><button type="button" className="ui-btn ui-btn--ghost">One note</button></div>
          </div>
        </div>
      );
  }
}

export function DarkRow() {
  const [lit, setLit] = useState(1);
  const track = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting && e.intersectionRatio > 0.6) setLit(items.indexOf(e.target as HTMLElement));
      },
      { root: el, threshold: [0.6, 0.9], rootMargin: "0px -30% 0px -30%" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);
  const p = panels[lit];
  return (
    <section className="d4-row" aria-labelledby="d4-row-h">
      <h2 id="d4-row-h">Every panel, at its true size</h2>
      <ul className="d4-row__track" ref={track}>
        {panels.map((pl, k) => (
          <li key={pl.id} className={`d4-row__item${k === lit ? " is-lit" : ""}`} style={v(k)}>
            <Panel id={pl.id} lit={k === lit} />
          </li>
        ))}
      </ul>
      <div className="d4-row__name" key={lit} aria-live="polite">
        <h3>{p.name}</h3>
        <p>{p.lines}</p>
        <p className="d4-row__count">{lit + 1} of {panels.length}</p>
      </div>
    </section>
  );
}

/* ---------- pricing: plan names, one live figure ---------- */

const plans = [
  { name: "Free", price: "€0", period: "for the first 500 notes", text: "Everything, until the five-hundred-and-first note: links, returns, search, plain files, every device. No card and no clock.", label: "Download free" },
  { name: "Monthly", price: "€6", period: "a month", text: "Unlimited notes and the same everything. Cancel any month; the files were always in your own folder.", label: "Choose monthly" },
  { name: "Yearly", price: "€60", period: "a year", text: "Two months free against the monthly price, and one invoice a year to forget about.", label: "Choose yearly" },
];

export function Plans() {
  const [i, setI] = useState(1);
  const p = plans[i];
  return (
    <section className="d4-plans" id="plans" aria-label="The plans">
      <div className="d4-plans__names" role="tablist" aria-label="Plans">
        {plans.map((pl, k) => (
          <button key={pl.name} type="button" role="tab" aria-selected={k === i} className={k === i ? "is-on" : undefined} onClick={() => setI(k)} onFocus={() => setI(k)}>
            {pl.name}
          </button>
        ))}
      </div>
      <div className="d4-plans__stage">
        <div key={i} className="d4-plans__in">
          <p className="d4-plans__price nums"><span>{p.price}</span><span className="d4-plans__period">{p.period}</span></p>
          <p className="d4-plans__text">{p.text}</p>
          <a className="button" href="#download" id={i === 1 ? "download" : undefined}>{p.label}</a>
        </div>
      </div>
    </section>
  );
}
