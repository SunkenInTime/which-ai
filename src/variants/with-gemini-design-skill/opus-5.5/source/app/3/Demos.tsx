"use client";

import { useId, useState } from "react";
import styles from "./page.module.css";

/* ---------- Quick capture ---------- */

const CAPTURE_TYPES = ["Note", "Web clip", "Voice memo", "PDF"] as const;
type CaptureType = (typeof CAPTURE_TYPES)[number];
type Captured = { id: number; type: CaptureType; text: string };

const SEED: Captured[] = [
  { id: 3, type: "Voice memo", text: "Call the plumber about the garden timer" },
  { id: 2, type: "Web clip", text: "The surprising math of traffic lights" },
  { id: 1, type: "PDF", text: "Lease renewal, page 4 highlighted" },
];

export function Capture() {
  const [type, setType] = useState<CaptureType>("Note");
  const [text, setText] = useState("");
  const [items, setItems] = useState<Captured[]>(SEED);
  const name = useId();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setItems((list) => [{ id: Date.now(), type, text: t }, ...list].slice(0, 5));
    setText("");
  };

  return (
    <div className={styles.captureDemo}>
      <form className={styles.captureForm} onSubmit={submit}>
        <fieldset className={styles.segmented}>
          <legend className={styles.srOnly}>What are you capturing?</legend>
          {CAPTURE_TYPES.map((t) => (
            <label key={t} className={styles.segment}>
              <input
                type="radio"
                name={name}
                value={t}
                checked={type === t}
                onChange={() => setType(t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </fieldset>
        <div className={styles.captureRow}>
          <label htmlFor={`${name}-text`} className={styles.srOnly}>
            Your thought
          </label>
          <input
            id={`${name}-text`}
            className={styles.captureInput}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a thought, press Enter"
            autoComplete="off"
          />
          <button type="submit" className={styles.captureSubmit}>
            Keep it
          </button>
        </div>
      </form>
      <ol className={styles.stack} aria-label="Your inbox">
        {items.slice(0, 4).map((item, i) => (
          <li
            key={item.id}
            className={styles.stackItem}
            style={
              {
                "--i": i,
                "--tilt": `${[-2, 1.5, -1, 2.5][i]}deg`,
                zIndex: 10 - i,
              } as React.CSSProperties
            }
          >
            <span className={styles.stackType}>{item.type}</span>
            <span className={styles.stackText}>{item.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Link graph ---------- */

type GNode = { id: string; label: string; x: number; y: number; note: string };

const GNODES: GNode[] = [
  { id: "loops", label: "Feedback loops", x: 50, y: 50, note: "Delays make loops overshoot. Shower knobs, thermostats, markets." },
  { id: "garden", label: "Garden floods", x: 20, y: 17, note: "The timer waters right after rain. Add a rain sensor?" },
  { id: "habits", label: "Habit tracker", x: 52, y: 13, note: "Streaks work until one miss. Then the loop flips." },
  { id: "thermo", label: "Thermostat pitch", x: 80, y: 22, note: "A thermostat that learns from overshooting." },
  { id: "q3", label: "Q3 planning", x: 80, y: 55, note: "Ship the learning thermostat prototype by October." },
  { id: "book", label: "Thinking in Systems", x: 74, y: 85, note: "Donella Meadows. Stocks, flows, and delays." },
  { id: "traffic", label: "City traffic", x: 22, y: 80, note: "Adaptive lights cut waiting by a fifth." },
];

const GEDGES: [string, string][] = [
  ["loops", "garden"],
  ["loops", "habits"],
  ["loops", "thermo"],
  ["loops", "book"],
  ["loops", "traffic"],
  ["thermo", "q3"],
  ["book", "traffic"],
  ["garden", "habits"],
  ["q3", "book"],
];

export function LinkGraph() {
  const [sel, setSel] = useState("loops");
  const byId = Object.fromEntries(GNODES.map((n) => [n.id, n]));
  const neighbors = GEDGES.filter(([a, b]) => a === sel || b === sel).map(([a, b]) => (a === sel ? b : a));
  const current = byId[sel];

  return (
    <div className={styles.graphWrap}>
      <div className={styles.graph}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.graphEdges} aria-hidden="true">
          {GEDGES.map(([a, b]) => {
            const on = a === sel || b === sel;
            return (
              <line
                key={`${a}-${b}`}
                x1={byId[a].x}
                y1={byId[a].y}
                x2={byId[b].x}
                y2={byId[b].y}
                className={on ? styles.edgeOn : styles.edge}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {GNODES.map((n) => (
          <button
            key={n.id}
            type="button"
            className={[
              styles.gnode,
              n.id === sel ? styles.gnodeSel : neighbors.includes(n.id) ? styles.gnodeNear : "",
            ].join(" ")}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            aria-pressed={n.id === sel}
            onClick={() => setSel(n.id)}
          >
            {n.label}
          </button>
        ))}
      </div>
      <aside className={styles.backlinks} aria-live="polite">
        <h3 className={styles.backlinksTitle}>{current.label}</h3>
        <p className={styles.backlinksNote}>{current.note}</p>
        <p className={styles.backlinksHead}>
          {neighbors.length} linked {neighbors.length === 1 ? "note" : "notes"}
        </p>
        <ul className={styles.backlinksList}>
          {neighbors.map((id) => (
            <li key={id}>
              <button type="button" onClick={() => setSel(id)}>
                {byId[id].label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

/* ---------- Ask your notes ---------- */

const QUESTIONS = [
  {
    q: "What did I learn about feedback loops?",
    a: [
      { t: "Delays are the trouble. When a response arrives late, the system overshoots, like a shower that swings from cold to scalding", c: 1 },
      { t: ". You saw the same pattern in your garden timer, which waters after rain has already fallen", c: 2 },
      { t: ".", c: 0 },
    ],
    sources: ["Thinking in Systems, p. 42", "Why the garden floods"],
  },
  {
    q: "When is the thermostat prototype due?",
    a: [
      { t: "October. The team agreed to ship a first learning prototype before the end of Q3", c: 1 },
      { t: ", and you noted it should reuse the overshoot idea from your voice memo", c: 2 },
      { t: ".", c: 0 },
    ],
    sources: ["Q3 planning, July 9", "Voice memo, 0:48"],
  },
  {
    q: "What gift ideas have I saved for Maya?",
    a: [
      { t: "Two so far: the ceramics class she mentioned at dinner", c: 1 },
      { t: ", and the out-of-print Le Guin paperback you clipped from a bookshop listing", c: 2 },
      { t: ".", c: 0 },
    ],
    sources: ["Dinner notes, March 3", "Web clip: Bookshop listing"],
  },
];

export function AskNotes() {
  const [i, setI] = useState(0);
  const id = useId();
  const cur = QUESTIONS[i];

  return (
    <div className={styles.ask}>
      <div className={styles.askTabs} role="tablist" aria-label="Example questions">
        {QUESTIONS.map((item, idx) => (
          <button
            key={item.q}
            type="button"
            role="tab"
            id={`${id}-tab-${idx}`}
            aria-selected={i === idx}
            aria-controls={`${id}-panel`}
            className={styles.askTab}
            onClick={() => setI(idx)}
          >
            {item.q}
          </button>
        ))}
      </div>
      <div
        key={i}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${i}`}
        className={styles.askPanel}
      >
        <p className={styles.askAnswer}>
          {cur.a.map((part, k) => (
            <span key={k}>
              {part.t}
              {part.c > 0 && <sup className={styles.cite}>{part.c}</sup>}
            </span>
          ))}
        </p>
        <ol className={styles.askSources}>
          {cur.sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------- Resurfacing flip card ---------- */

export function Resurface() {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className={`${styles.flip} ${flipped ? styles.flipped : ""}`}
      aria-pressed={flipped}
      aria-label={flipped ? "Show the date again" : "Open the note from this day last year"}
      onClick={() => setFlipped((f) => !f)}
    >
      <span className={styles.flipInner}>
        <span className={styles.flipFront} aria-hidden={flipped}>
          <span className={styles.flipDate}>Nov 24, 2025</span>
          <span className={styles.flipHint}>One year ago today. Tap to open.</span>
        </span>
        <span className={styles.flipBack} aria-hidden={!flipped}>
          <span className={styles.flipTitle}>Start a shared recipe box</span>
          <span className={styles.flipText}>
            Everyone keeps sending recipes in group chat and they vanish. One place, searchable, with who cooked
            it last.
          </span>
          <span className={styles.flipHint}>Linked to 2 notes you wrote this week</span>
        </span>
      </span>
    </button>
  );
}

/* ---------- Pricing ---------- */

const PLANS = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    unit: "forever",
    points: ["Unlimited notes", "Automatic links and graph", "Sync on 2 devices"],
  },
  {
    name: "Plus",
    monthly: 8,
    yearly: 80,
    unit: "per month",
    points: ["Everything in Free", "Ask your notes", "Unlimited devices", "Voice memo transcripts"],
  },
  {
    name: "Teams",
    monthly: 14,
    yearly: 140,
    unit: "per person, per month",
    points: ["Everything in Plus", "Shared spaces", "Admin and SSO", "Priority support"],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const name = useId();
  return (
    <>
      <fieldset className={`${styles.segmented} ${styles.segmentedInk}`}>
        <legend className={styles.srOnly}>Billing period</legend>
        <label className={styles.segment}>
          <input type="radio" name={name} checked={!yearly} onChange={() => setYearly(false)} />
          <span>Monthly</span>
        </label>
        <label className={styles.segment}>
          <input type="radio" name={name} checked={yearly} onChange={() => setYearly(true)} />
          <span>Yearly, 2 months free</span>
        </label>
      </fieldset>
      <div className={styles.plans}>
        {PLANS.map((p) => {
          const price = yearly ? p.yearly / 12 : p.monthly;
          const shown = price % 1 === 0 ? `$${price}` : `$${price.toFixed(2)}`;
          return (
            <div key={p.name} className={`${styles.plan} ${p.name === "Plus" ? styles.planHot : ""}`}>
              <h3 className={styles.planName}>{p.name}</h3>
              <p className={styles.planPrice}>{shown}</p>
              <p className={styles.planUnit}>
                {p.unit}
                {yearly && p.yearly > 0 ? `, billed $${p.yearly} yearly` : ""}
              </p>
              <ul className={styles.planPoints}>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
