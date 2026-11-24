"use client";

import { useEffect, useRef, useState } from "react";
import s from "./page.module.css";

const STEPS = [
  {
    key: "capture",
    title: "Catch it before it slips",
    body: "Press one shortcut from anywhere to jot a thought, clip a page, drop in a PDF, or record a voice memo. It all lands in one inbox.",
  },
  {
    key: "link",
    title: "Related notes find each other",
    body: "As you write, Kept spots people, projects, and ideas you have saved before and links them, with backlinks on both sides.",
  },
  {
    key: "graph",
    title: "See the shape of your thinking",
    body: "Open the map to see how your notes cluster. Follow a thread from a meeting to the article that started it.",
  },
  {
    key: "ask",
    title: "Ask, and get your own words back",
    body: "Ask a question in plain language. Kept answers from your notes and shows exactly which ones it used.",
  },
];

export default function Stage() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      setProgress(p);
      setActive(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + (total * (i + 0.5)) / STEPS.length;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section ref={ref} className={s.stage} id="how" aria-labelledby="how-title">
      <div className={s.stagePin}>
        <div className={s.stageGrid}>
          <div className={s.stageText}>
            <h2 id="how-title" className={s.h2}>From scattered thoughts to answers</h2>
            <ol className={s.steps}>
              {STEPS.map((step, i) => (
                <li key={step.key} className={i === active ? s.stepActive : s.step}>
                  <button type="button" className={s.stepBtn} onClick={() => jump(i)} aria-current={i === active ? "step" : undefined}>
                    <span className={s.stepTitle}>{step.title}</span>
                  </button>
                  <p className={s.stepBody}>{step.body}</p>
                </li>
              ))}
            </ol>
            <div className={s.stageBar} aria-hidden="true">
              <i style={{ transform: `scaleX(${progress})` }} />
            </div>
          </div>

          <div className={s.app} aria-label={`Kept app preview: ${STEPS[active].title}`} role="img">
            <div className={s.appChrome}>
              <span /><span /><span />
              <p className={s.appTitle}>Kept</p>
            </div>
            <div className={s.appBody}>
              <aside className={s.appSide}>
                {["Inbox", "Daily notes", "Projects", "Map"].map((label, i) => (
                  <p
                    key={label}
                    className={s.sideItem}
                    data-on={i === [0, 2, 3, -1][active] ? "true" : undefined}
                  >
                    {label}
                  </p>
                ))}
              </aside>
              <div className={s.panes}>
                <PaneCapture on={active === 0} />
                <PaneLink on={active === 1} />
                <PaneGraph on={active === 2} />
                <PaneAsk on={active === 3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaneCapture({ on }: { on: boolean }) {
  return (
    <div className={`${s.pane} ${on ? s.paneOn : ""}`}>
      <div className={s.capture}>
        <p className={s.captureText}>Ask Maya about the riverside venue<span className={s.caret} /></p>
        <p className={s.paneMuted}>Saved to Inbox · Ctrl Shift K</p>
      </div>
      <ul className={s.inbox}>
        <li>
          <span className={s.kind} style={{ background: "#dbeafe" }}>
            <svg viewBox="0 0 20 20"><path d="M8.5 11.5l3-3M7 13.8l-1 1a2.6 2.6 0 01-3.7-3.7l2.6-2.6a2.6 2.6 0 013.7 0M13 6.2l1-1a2.6 2.6 0 013.7 3.7l-2.6 2.6a2.6 2.6 0 01-3.7 0" fill="none" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </span>
          <div><p className={s.rowTitle}>Running remote retros people enjoy</p><p className={s.paneMuted}>Web clip · 2 min ago</p></div>
        </li>
        <li>
          <span className={s.kind} style={{ background: "#ede9fe" }}>
            <svg viewBox="0 0 20 20"><rect x="4" y="2.5" width="12" height="15" rx="3" fill="none" stroke="#6d28d9" strokeWidth="1.6" /><path d="M7 7.5h6M7 10.5h6M7 13.5h3" stroke="#6d28d9" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </span>
          <div><p className={s.rowTitle}>Venue shortlist.pdf</p><p className={s.paneMuted}>PDF · 18 min ago</p></div>
        </li>
        <li>
          <span className={s.kind} style={{ background: "#ffe4d6" }}>
            <svg viewBox="0 0 20 20"><rect x="7.5" y="2.5" width="5" height="10" rx="2.5" fill="none" stroke="#c2410c" strokeWidth="1.6" /><path d="M5 10a5 5 0 0010 0M10 15v2.5" fill="none" stroke="#c2410c" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </span>
          <div><p className={s.rowTitle}>Voice memo from the walk home</p><p className={s.paneMuted}>0:42 · transcribed</p></div>
        </li>
      </ul>
    </div>
  );
}

function PaneLink({ on }: { on: boolean }) {
  return (
    <div className={`${s.pane} ${on ? s.paneOn : ""}`}>
      <p className={s.rowTitle}>Lisbon offsite</p>
      <p className={s.paneText}>
        Book the <mark className={s.mark}>riverside venue</mark> before Friday. <mark className={s.mark}>Maya</mark> liked
        the warm-up from the <mark className={s.mark}>March retro</mark>, so we will open with that.
      </p>
      <div className={s.backlinks}>
        <p className={s.paneMuted}>Linked mentions</p>
        <ul>
          <li><span className={s.rowTitle}>Venue shortlist.pdf</span><span className={s.paneMuted}>“...the riverside venue holds 40...”</span></li>
          <li><span className={s.rowTitle}>Maya, 1:1 notes</span><span className={s.paneMuted}>“...wants a slower first morning...”</span></li>
          <li><span className={s.rowTitle}>March retro</span><span className={s.paneMuted}>“...the two-word warm-up worked...”</span></li>
        </ul>
      </div>
    </div>
  );
}

const NODES = [
  { x: 210, y: 150, r: 16, c: "#2563eb", t: "Lisbon offsite" },
  { x: 90, y: 70, r: 9, c: "#93c5fd", t: "Venue shortlist" },
  { x: 330, y: 70, r: 10, c: "#93c5fd", t: "Maya 1:1" },
  { x: 345, y: 220, r: 9, c: "#93c5fd", t: "March retro" },
  { x: 80, y: 230, r: 8, c: "#c4b5fd", t: "Retro playbook" },
  { x: 200, y: 265, r: 6, c: "#c4b5fd", t: "" },
  { x: 40, y: 150, r: 5, c: "#fdba74", t: "" },
  { x: 400, y: 140, r: 6, c: "#fdba74", t: "" },
  { x: 150, y: 30, r: 5, c: "#c4b5fd", t: "" },
  { x: 270, y: 20, r: 5, c: "#fdba74", t: "" },
];
const EDGES = [[0, 1], [0, 2], [0, 3], [3, 4], [1, 4], [0, 5], [4, 6], [2, 7], [1, 8], [2, 9], [3, 7], [5, 4]];

function PaneGraph({ on }: { on: boolean }) {
  return (
    <div className={`${s.pane} ${s.paneGraph} ${on ? s.paneOn : ""}`}>
      <svg viewBox="0 0 440 290" className={s.graph}>
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
        ))}
        {NODES.map((n, i) => (
          <g key={i} className={s.node} style={{ transitionDelay: `${i * 40}ms` }}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} />
            {n.t && (
              <text x={n.x} y={n.y + n.r + 18} textAnchor="middle">{n.t}</text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

function PaneAsk({ on }: { on: boolean }) {
  return (
    <div className={`${s.pane} ${on ? s.paneOn : ""}`}>
      <div className={s.askBox}>
        <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M13.2 13.2L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        <span>What did we decide about the Lisbon venue?</span>
      </div>
      <p className={s.paneText}>
        You planned to book the riverside venue before Friday because it holds 40 people
        <sup className={s.cite}>1</sup>, and Maya asked for a slower first morning<sup className={s.cite}>2</sup>.
      </p>
      <ul className={s.sources}>
        <li><sup className={s.cite}>1</sup><span className={s.rowTitle}>Venue shortlist.pdf</span><span className={s.paneMuted}>page 2</span></li>
        <li><sup className={s.cite}>2</sup><span className={s.rowTitle}>Maya, 1:1 notes</span><span className={s.paneMuted}>12 Nov</span></li>
      </ul>
    </div>
  );
}
