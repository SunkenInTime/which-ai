"use client";

import { Fragment, useState } from "react";
import { RECALLS, type Recall } from "./data";
import s from "./page.module.css";

type Match = "meaning" | "words";
type Look = "month" | "year" | "all";

// The note being written, split so the words the margin matches can be marked.
const BODY: (string | { w: string })[][] = [
  ["Flights booked for 14–21 ", { w: "May" }, ". Ride ", { w: "tram 28" }, " early, before the ", { w: "crowds" }, " at ", { w: "Martim Moniz" }, "."],
  ["Ask Sofia which ", { w: "bookshop" }, " she meant in ", { w: "Chiado" }, ". One ", { w: "dinner" }, " in ", { w: "Alfama" }, ", somewhere ", { w: "quiet" }, " without a view."],
];

const MEANING_WORDS: Record<string, string> = { "a quiet dinner": "quiet" };

function visibleRecalls(o: { on: boolean; match: Match; look: Look; count: number; clipped: boolean }) {
  if (!o.on) return [];
  return RECALLS.filter((r) => (o.match === "words" ? r.words.length > 0 : true))
    .filter((r) => (o.look === "month" ? r.days <= 31 : o.look === "year" ? r.days <= 365 : true))
    .filter((r) => o.clipped || !r.clipped)
    .sort((a, b) => (o.match === "words" ? b.words.length - a.words.length || b.score - a.score : b.score - a.score))
    .slice(0, o.count);
}

function sharedWords(r: Recall, match: Match) {
  const meaning = match === "meaning" ? r.meaning.map((m) => MEANING_WORDS[m] ?? m) : [];
  return [...r.words, ...meaning];
}

function Switch({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className={s.ctlRow}>
      <span className={s.ctlName}>{label}</span>
      <button type="button" role="switch" aria-checked={on} aria-label={label} className={s.switch} onClick={() => onChange(!on)}>
        <span className={s.switchKnob} />
      </button>
    </div>
  );
}

function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className={s.ctlRow}>
      <span className={s.ctlName}>{label}</span>
      <div className={s.segmented} role="group" aria-label={label}>
        {options.map(([v, text]) => (
          <button key={v} type="button" aria-pressed={value === v} className={s.segment} onClick={() => onChange(v)}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MarginDemo() {
  const [on, setOn] = useState(true);
  const [match, setMatch] = useState<Match>("meaning");
  const [look, setLook] = useState<Look>("all");
  const [count, setCount] = useState(4);
  const [clipped, setClipped] = useState(true);
  const [backlinks, setBacklinks] = useState(true);
  const [mentions, setMentions] = useState(false);
  const [highlight, setHighlight] = useState(true);

  const shown = visibleRecalls({ on, match, look, count, clipped });
  const marked = new Set(highlight ? shown.flatMap((r) => sharedWords(r, match)) : []);

  return (
    <div className={s.demo}>
      <div className={s.demoStage} data-ui="">
        <div className={s.editor}>
          <div className={s.editorMain}>
            <p className={s.editorMeta}>Trips, edited today at 09:14</p>
            <p className={s.editorTitle}>Lisbon in May</p>
            {BODY.map((para, i) => (
              <p key={i} className={s.editorText}>
                {para.map((part, j) =>
                  typeof part === "string" ? (
                    <Fragment key={j}>{part}</Fragment>
                  ) : (
                    <mark key={j} className={marked.has(part.w) ? s.match : s.noMatch}>
                      {part.w}
                    </mark>
                  ),
                )}
                {i === BODY.length - 1 && <span className={s.caret} aria-hidden="true" />}
              </p>
            ))}
            {backlinks && (
              <p className={s.editorAside}>
                <span className={s.editorAsideHead}>Linked from 2 notes</span> Trips 2026, Sofia’s Lisbon list
              </p>
            )}
            {mentions && (
              <p className={s.editorAside}>
                <span className={s.editorAsideHead}>Mentioned without a link in 3 notes</span> Packing for warm weather, Books to buy, Holidays 2026
              </p>
            )}
          </div>
          <div className={s.recall} aria-live="polite">
            <p className={s.recallHead}>
              {!on ? "Resurfacing is off" : shown.length ? `${shown.length} older ${shown.length === 1 ? "note" : "notes"} brought back` : "Nothing older matches"}
            </p>
            {!on && <p className={s.recallEmpty}>Notes stay where you filed them until you search.</p>}
            {on && !shown.length && <p className={s.recallEmpty}>Look further back, or let clipped pages in.</p>}
            {shown.map((r) => {
              const shared = sharedWords(r, match);
              return (
                <div key={r.id} className={s.recallItem}>
                  <p className={s.recallTitle}>{r.title}</p>
                  <p className={s.recallAge}>
                    {r.age}
                    {r.clipped ? ", clipped" : ""}
                  </p>
                  <p className={s.recallText}>{r.excerpt}</p>
                  <p className={s.recallWhy}>
                    {r.words.length ? "Shares " : "Close in meaning: "}
                    {shared.join(", ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={s.controls} data-ui="">
        <p className={s.controlsHead}>Margin settings</p>
        <Switch label="Bring back older notes" on={on} onChange={setOn} />
        <Segmented label="Match by" value={match} onChange={setMatch} options={[["meaning", "Meaning"], ["words", "Words"]]} />
        <Segmented label="Look back" value={look} onChange={setLook} options={[["month", "Month"], ["year", "Year"], ["all", "All"]]} />
        <div className={s.ctlRow}>
          <span className={s.ctlName}>Notes in the margin</span>
          <div className={s.stepper}>
            <button type="button" aria-label="Fewer notes" onClick={() => setCount((c) => Math.max(1, c - 1))} disabled={count <= 1}>
              −
            </button>
            <output aria-live="polite">{count}</output>
            <button type="button" aria-label="More notes" onClick={() => setCount((c) => Math.min(5, c + 1))} disabled={count >= 5}>
              +
            </button>
          </div>
        </div>
        <Switch label="Include clipped pages" on={clipped} onChange={setClipped} />
        <Switch label="Mark shared words" on={highlight} onChange={setHighlight} />
        <Switch label="Show backlinks" on={backlinks} onChange={setBacklinks} />
        <Switch label="Show unlinked mentions" on={mentions} onChange={setMentions} />
        <a className={s.controlsLink} href="#questions">
          How the margin works
        </a>
      </div>
    </div>
  );
}
