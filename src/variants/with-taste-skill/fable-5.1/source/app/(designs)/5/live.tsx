"use client";

import { useEffect, useRef, useState } from "react";
import { byId, formatDate } from "../notes";

/* ---------- the chapter strip: five squares that follow you, in the colours of the chapters ---------- */

import { chapters } from "./chapters";

export function ChapterStrip() {
  const [shown, setShown] = useState(false);
  const [current, setCurrent] = useState<string>("");
  useEffect(() => {
    const hero = document.querySelector(".d5-hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    const sections = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io2 = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => io2.observe(s));
    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, []);
  const cur = chapters.find((c) => c.id === current);
  return (
    <div className={`d5-strip${shown ? " is-shown" : ""}`} aria-hidden={!shown}>
      <span className="d5-strip__name" style={{ color: cur?.ink === "#f8f8f8" ? "#f8f8f8" : "#0a0a0a" }}>{cur?.name ?? ""}</span>
      {chapters.map((c) => (
        <a key={c.id} href={`#${c.id}`} className={`d5-strip__sq${c.id === current ? " is-on" : ""}`} style={{ background: c.bg }} aria-label={c.name} tabIndex={shown ? 0 : -1} />
      ))}
    </div>
  );
}

/* ---------- connect: drag through the stages ---------- */

const stages = [
  { word: "Write", clause: ["First,", "write it down."], note: "A line is enough. Commonplace keeps the date, the words and whatever you were reading at the time." },
  { word: "Link", clause: ["Then it", "links itself."], note: "Every note that mentions the same thing is listed beside it, whether you linked it or not." },
  { word: "Return", clause: ["Later, it", "comes back."], note: "On day 1, 3, 7, 21, 60 and 180 the note returns. You mark it still true, change it, or let it go." },
  { word: "Keep", clause: ["Always, it", "stays yours."], note: "Your notes are Markdown files in a folder you chose. Any app can read them, now or in twenty years." },
];

function Fragment({ i }: { i: number }) {
  const n = byId.calvino;
  if (i === 0)
    return (
      <div className="d5-frag" data-ui>
        <div className="ui-top"><span className="ui-crumbs"><span>Reading</span><span>New note</span></span><span>Saved just now</span></div>
        <div className="ui-body">
          <div className="ui-title">{n.title}</div>
          <div className="ui-meta">{formatDate(n.date)} · Reading</div>
          <p className="ui-text">“Lightness for me goes with precision and determination, not with vagueness.” Six Memos, the first lecture<span className="ui-caret" /></p>
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div className="d5-frag" data-ui>
        <div className="ui-top"><span className="ui-crumbs"><span>Reading</span><span>{n.title}</span></span><span>Saved</span></div>
        <div className="ui-body" style={{ paddingBottom: 14 }}>
          <div className="ui-title">{n.title}</div>
          <p className="ui-text">…Six Memos, the first lecture. See <span className="ui-link">Reading list</span>.</p>
        </div>
        <div className="ui-head"><b>Mentioned in</b><span>2 notes</span></div>
        <ul className="ui-list ui-rows-lined">
          <li className="ui-row is-selected"><span>Reading list</span><span className="ui-when">1 Aug</span></li>
          <li className="ui-row"><span>Seven, plus or minus two</span><span className="ui-when">20 Nov</span></li>
        </ul>
      </div>
    );
  if (i === 2)
    return (
      <div className="d5-frag" data-ui>
        <div className="ui-top"><strong>Back today</strong><span>3 of 4</span></div>
        <div className="ui-body">
          <span className="ui-chip">Day 60 · fifth return</span>
          <div className="ui-title" style={{ marginTop: 12 }}>{n.title}</div>
          <div className="ui-meta">Written {formatDate(n.date)} · Reading</div>
          <p className="ui-text">{n.body}</p>
          <div className="ui-tag-row" style={{ marginTop: 16 }}>
            <button type="button" className="ui-btn">Still true</button>
            <button type="button" className="ui-btn ui-btn--ghost">Edit</button>
            <button type="button" className="ui-btn ui-btn--ghost">Let it go</button>
          </div>
        </div>
      </div>
    );
  return (
    <div className="d5-frag" data-ui>
      <div className="ui-top"><span className="ui-crumbs"><span>~/Notes</span><span>Reading</span></span><span>5 files</span></div>
      <ul className="ui-files">
        <li className="is-selected"><span>Calvino on lightness.md</span><span>0.6 KB</span></li>
        <li><span>The forgetting curve.md</span><span>0.9 KB</span></li>
        <li><span>Luhmann’s 90,000 slips.md</span><span>0.7 KB</span></li>
        <li><span>Bush’s memex, 1945.md</span><span>0.8 KB</span></li>
        <li><span>Reading list.md</span><span>0.3 KB</span></li>
      </ul>
      <div className="ui-foot"><span>Plain Markdown, synced by your own folder</span><button type="button" className="ui-btn ui-btn--ghost">Export all</button></div>
    </div>
  );
}

export function Stages() {
  const [i, setI] = useState(0);
  const pct = (i / (stages.length - 1)) * 100;
  const s = stages[i];
  const first = useRef(true);
  useEffect(() => { first.current = false; }, []);
  return (
    <section className="d5-stages" id="connect" aria-labelledby="d5-stages-h" data-ink="#0a0a0a">
      <div className="d5-stages__left">
        <h2 id="d5-stages-h" className="d5-stages__clause" key={`c${i}`}>{s.clause[0]}<br />{s.clause[1]}</h2>
        <p className="d5-stages__note" key={`n${i}`}>{s.note}</p>
      </div>
      <div className="d5-stages__right">
        <div className="d5-stages__fragwrap" key={`f${i}`}><Fragment i={i} /></div>
      </div>
      <div className="d5-stages__slider">
        <div className="d5-stages__trackwrap">
          <input className="d5-stages__range" type="range" min={0} max={stages.length - 1} step={1} value={i} onChange={(e) => setI(Number(e.target.value))} aria-label="Stage" aria-valuetext={s.word} />
          <div className="d5-stages__track" aria-hidden="true">
            <div className="d5-stages__fill" style={{ width: `${pct}%` }} />
            <div className="d5-stages__thumb" style={{ left: `${pct}%` }} />
          </div>
        </div>
        <ol className="d5-stages__names">
          {stages.map((st, k) => (
            <li key={st.word} className={k === i ? "is-on" : undefined}><button type="button" onClick={() => setI(k)} aria-current={k === i ? "step" : undefined}>{st.word}</button></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
