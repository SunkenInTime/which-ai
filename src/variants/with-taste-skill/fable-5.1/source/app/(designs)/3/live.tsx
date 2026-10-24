"use client";

import { useState } from "react";
import { byId, ebbinghaus, backlinks, formatDate } from "../notes";

/* ---------- the forgetting curve, with the returns drawn on it ---------- */

const RETURNS: Record<number, number[]> = { 3: [1, 7, 60], 6: [1, 3, 7, 21, 60, 180], 9: [1, 2, 3, 5, 7, 14, 21, 60, 180] };
const MAX_H = 745; // 31 days, Ebbinghaus's last point
const xOf = (hours: number) => Math.log10(hours + 1) / Math.log10(MAX_H + 1);

export function Curve({ returns, hue = "#1d5fbf" }: { returns: number; hue?: string }) {
  const W = 400, H = 170, L = 8, R = 8, T = 10, B = 30;
  const px = (h: number) => L + xOf(h) * (W - L - R);
  const py = (keep: number) => T + (1 - keep / 100) * (H - T - B);
  const pts = [{ hours: 0, keep: 100 }, ...ebbinghaus].map((p) => `${px(p.hours).toFixed(1)},${py(p.keep).toFixed(1)}`).join(" ");
  const days = RETURNS[returns] ?? RETURNS[6];
  return (
    <svg className="ui-graph" viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={`The forgetting curve with ${returns} returns marked`}>
      <line x1={L} y1={py(0)} x2={W - R} y2={py(0)} />
      <line x1={L} y1={py(50)} x2={W - R} y2={py(50)} />
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2" />
      {days.filter((d) => d <= 31).map((d) => (
        <g key={d}>
          <line className="is-hot" x1={px(d * 24)} y1={py(0)} x2={px(d * 24)} y2={py(0) - 10} />
          <circle className="is-hot" cx={px(d * 24)} cy={py(0) - 14} r="4" />
        </g>
      ))}
      <text x={px(1)} y={H - 8} textAnchor="middle">1 hour</text>
      <text x={px(24)} y={H - 8} textAnchor="middle">1 day</text>
      <text x={px(168)} y={H - 8} textAnchor="middle">1 week</text>
      <text x={px(744)} y={H - 8} textAnchor="end">1 month</text>
      <text x={L} y={py(100) + 4}>100%</text>
      <text x={L} y={py(50) - 4}>50%</text>
      <text x={W - R} y={py(21) - 6} textAnchor="end" fill={hue}>{returns} returns</text>
    </svg>
  );
}

/* ---------- fixed output, live controls ---------- */

type Scope = "all" | "ideas" | "quiet";

export function Controls() {
  const [returns, setReturns] = useState(6);
  const [scope, setScope] = useState<Scope>("all");
  const [links, setLinks] = useState(true);
  const [title, setTitle] = useState("");
  const note = scope === "ideas" ? byId.spacing : scope === "quiet" ? byId["forgetting-curve"] : byId.sourdough;
  const back = backlinks(note.id);
  const stage = Math.min(2, returns - 1);
  return (
    <section className="d3-pin" aria-labelledby="d3-pin-h">
      <div className="d3-pin__field">
        <div className="d3-card" data-ui aria-live="polite">
          <div className="ui-top"><strong>Back today</strong><span>return {stage} of {returns}</span></div>
          <div className="ui-body">
            <div className="ui-title">{title.trim() || note.title}</div>
            <div className="ui-meta">Written {formatDate(note.date)} · {scope === "ideas" ? "Ideas" : scope === "quiet" ? "Reading" : "Kitchen"}</div>
            <p className="ui-text">{note.body}</p>
            <div className="d3-card__curve"><Curve returns={returns} /></div>
            <div className="ui-tag-row" style={{ marginTop: 14 }}>
              <button type="button" className="ui-btn">Still true</button>
              <button type="button" className="ui-btn ui-btn--ghost">Edit</button>
              <button type="button" className="ui-btn ui-btn--ghost">Let it go</button>
            </div>
          </div>
          {links && (
            <>
              <div className="ui-head"><b>Mentioned in</b><span>{back.length} {back.length === 1 ? "note" : "notes"}</span></div>
              <ul className="ui-list ui-rows-lined">
                {back.slice(0, 3).map((b) => (
                  <li key={b.id} className="ui-row"><span>{b.title}</span><span className="ui-when">{formatDate(b.date).replace(/ \d{4}$/, "")}</span></li>
                ))}
                {!back.length && <li className="ui-row"><span className="ui-dim">Nothing mentions it yet.</span></li>}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="d3-pin__col">
        <h2 id="d3-pin-h">What it does for one note</h2>

        <div className="d3-block">
          <h3>It comes back before you forget.</h3>
          <p>Six returns in half a year is the usual rhythm. Fewer suits recipes and addresses; more suits a language or an exam.</p>
          <div className="ui-seg" data-ui role="group" aria-label="How many returns">
            {[3, 6, 9].map((n) => (
              <button key={n} type="button" aria-pressed={returns === n} onClick={() => setReturns(n)}>{n === 3 ? "Three" : n === 6 ? "Six" : "Nine"}</button>
            ))}
          </div>
        </div>

        <div className="d3-block">
          <h3>Only the notes that deserve it.</h3>
          <p>A folder can be set to return or to stay quiet. The kitchen rarely needs a second look; ideas and reading usually do.</p>
          <div className="ui-seg" data-ui role="group" aria-label="Which notes return">
            <button type="button" aria-pressed={scope === "all"} onClick={() => setScope("all")}>All notes</button>
            <button type="button" aria-pressed={scope === "ideas"} onClick={() => setScope("ideas")}>Ideas</button>
            <button type="button" aria-pressed={scope === "quiet"} onClick={() => setScope("quiet")}>Not the kitchen</button>
          </div>
        </div>

        <div className="d3-block">
          <h3>With its neighbours beside it.</h3>
          <p>Every return shows the notes that mention the same thing, so the memory is rebuilt as a web, not a flashcard.</p>
          <label className="ui-toggle d3-toggle" data-ui>
            <input type="checkbox" checked={links} onChange={(e) => setLinks(e.target.checked)} />
            <i />
            <span>Show the neighbours</span>
          </label>
        </div>

        <div className="d3-block">
          <h3>In your own words.</h3>
          <p>Type a title the way you would write it. The card is yours, not a template’s.</p>
          <div className="d3-field" data-ui>
            <label className="ui-label" htmlFor="d3-title">Title of the note</label>
            <input id="d3-title" className="ui-field" value={title} placeholder={note.title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- the square plate: the figures of the report ---------- */

const plates = [
  { tab: "1885", title: "A third is gone by tomorrow", text: "Hermann Ebbinghaus learned lists of syllables and measured what it took to learn them again: 44% kept after an hour, 34% after a day, 21% after a month.", src: "/variants/with-taste-skill/fable-5.1/assets/the-brain-after-haller-and-ridley-engraving.jpg", w: 1600, h: 2488, alt: "An eighteenth-century engraving of the human brain seen from below, on a plate titled Anatomie", pos: "50% 62%" },
  { tab: "1956", title: "Seven, give or take two", text: "George Miller counted what working memory holds at once: about seven things. Everything past that has to be written down, or it is gone.", src: "/variants/with-taste-skill/fable-5.1/assets/santiago-ramon-y-cajal-nerve-cells-in.jpg", w: 1920, h: 1268, alt: "Ink drawing of nerve cells with long branching fibres, lettered A to K", pos: "50% 50%" },
  { tab: "1952", title: "Ninety thousand slips", text: "Niklas Luhmann’s slip box grew for forty-five years and, he said, answered back. These are slip boxes of the Thesaurus Linguae Latinae, kept the same way.", src: "/variants/with-taste-skill/fable-5.1/assets/zettelkaesten-et-01.jpg", w: 1920, h: 1280, alt: "Rows of black-edged slip boxes on grey shelves, each labelled with the word et and a running number", pos: "50% 50%" },
  { tab: "1706", title: "A hundred small cells", text: "John Locke’s method for a commonplace book: two pages of index, every heading filed by its first letter and the first vowel after it.", src: "/variants/with-taste-skill/fable-5.1/assets/robert-burns-s-commonplace-book-1783-1785.jpg", w: 1920, h: 1251, alt: "A handwritten page in eighteenth-century script, the introduction to Robert Burns’s commonplace book", pos: "50% 30%" },
];

export function Figures() {
  const [i, setI] = useState(0);
  const p = plates[i];
  return (
    <section className="d3-plate" aria-labelledby="d3-plate-h">
      <div className="d3-plate__pic">
        {plates.map((pl, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={pl.src} src={pl.src} width={pl.w} height={pl.h} alt={pl.alt} decoding="async" hidden={k !== i} style={{ objectPosition: pl.pos }} />
        ))}
      </div>
      <div className="d3-plate__text">
        <div className="d3-plate__tabs" role="tablist" aria-label="The figures">
          {plates.map((pl, k) => (
            <button key={pl.tab} type="button" role="tab" aria-selected={k === i} className={k === i ? "is-on" : undefined} onClick={() => setI(k)}>{pl.tab}</button>
          ))}
        </div>
        <div className="d3-plate__mid" key={i}>
          <h2 id="d3-plate-h">{p.title}</h2>
          <p>{p.text}</p>
        </div>
        <div className="d3-plate__acts">
          <a className="d3-cell d3-cell--ink" href="#download">Download for Mac</a>
          <a className="d3-cell" href="#plans">See the plans</a>
        </div>
      </div>
    </section>
  );
}
