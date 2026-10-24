"use client";

import { useState } from "react";
import { notes, byId } from "../notes";

/* ---------- Locke's index, 1706: every heading filed by its first letter and the first vowel after it ---------- */

// Locke's alphabet merged I with J and U with V.
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
const VOWELS = ["a", "e", "i", "o", "u"];
const SKIP = new Set(["the", "a", "an", "why", "what", "how", "on", "in", "at"]);

export function lockeCell(word: string): { letter: string; vowel: string } | null {
  const w = word.trim().toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return null;
  let letter = w[0].toUpperCase();
  if (letter === "J") letter = "I";
  if (letter === "U") letter = "V";
  const m = w.slice(1).match(/[aeiouy]/);
  let vowel = m ? m[0] : "a";
  if (vowel === "y") vowel = "i";
  return { letter, vowel };
}

export function headingWord(title: string): string {
  const words = title.replace(/[’']s\b/g, "").split(/\s+/);
  for (const w of words) {
    const c = w.replace(/[^A-Za-z]/g, "");
    if (c && !SKIP.has(c.toLowerCase())) return c;
  }
  return words[0];
}

const filed = notes.map((n) => ({ n, cell: lockeCell(headingWord(n.title))! }));
const cellKey = (c: { letter: string; vowel: string }) => `${c.letter}${c.vowel}`;
const counts = new Map<string, number>();
for (const f of filed) counts.set(cellKey(f.cell), (counts.get(cellKey(f.cell)) || 0) + 1);

export function LockeIndex() {
  const [word, setWord] = useState("Seahorse");
  const cell = lockeCell(word);
  const key = cell ? cellKey(cell) : "";
  const neighbours = cell ? filed.filter((f) => cellKey(f.cell) === key).map((f) => f.n) : [];
  const rowLabel = (l: string) => (l === "I" ? "I J" : l === "V" ? "U V" : l);
  return (
    <div className="d2-index">
      <h2 className="d2-index__title">Filed the way Locke filed it in 1706</h2>
      <p className="d2-index__lead">Two pages of index, one cell for each first letter and the first vowel after it. Type a heading and see where it goes.</p>
      <div className="d2-index__ask" data-ui>
        <label className="ui-label" htmlFor="d2-heading">Heading</label>
        <input id="d2-heading" className="ui-field" value={word} onChange={(e) => setWord(e.target.value)} spellCheck={false} autoComplete="off" />
      </div>
      <p className="d2-index__answer" aria-live="polite">
        {cell ? (
          <>
            <strong>{word.trim() || "It"}</strong> goes under <strong className="d2-index__cell">{cell.letter} {cell.vowel}</strong>
            {neighbours.length ? <>, beside {neighbours.map((n) => n.title).join(" · ")}.</> : <>. Nothing is filed there yet; the first note about it will be.</>}
          </>
        ) : (
          <>Type a word to file it.</>
        )}
      </p>
      <table className="d2-index__grid">
        <caption className="sr-only">Locke’s index: rows are first letters, columns the first vowel after it; each cell holds the number of notes filed there</caption>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Letter</span></th>
            {VOWELS.map((v) => <th key={v} scope="col">{v}</th>)}
          </tr>
        </thead>
        <tbody>
          {LETTERS.map((l) => (
            <tr key={l}>
              <th scope="row">{rowLabel(l)}</th>
              {VOWELS.map((v) => {
                const k = `${l}${v}`;
                const c = counts.get(k) || 0;
                const on = k === key;
                return (
                  <td key={v} className={on ? "is-on" : c ? "has-notes" : undefined} aria-label={`${l} ${v}: ${c} ${c === 1 ? "note" : "notes"}`}>
                    {c ? c : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- the square plate with tabs: five centuries of second brains ---------- */

const plates = [
  { tab: "Burns, 1783", title: "A poet’s commonplace book", text: "Robert Burns opened his with a preface to whoever might read it: observations, hints, songs and scraps of poetry, kept in one book from 1783.", src: "/variants/with-taste-skill/fable-5.1/assets/robert-burns-s-commonplace-book-1783-1785.jpg", w: 1920, h: 1251, alt: "A handwritten page in eighteenth-century script, the introduction to Robert Burns’s commonplace book", pos: "50% 30%" },
  { tab: "The slip box", title: "A sociologist’s slip box", text: "Niklas Luhmann filed about 90,000 slips over forty-five years and said the box answered back. These shelves of slips in Münster are kept the same way.", src: "/variants/with-taste-skill/fable-5.1/assets/zettelkasten-514941699.jpg", w: 1920, h: 1280, alt: "Shelves crowded with shoe boxes and folders stuffed with handwritten slips of paper", pos: "40% 50%" },
  { tab: "The memex, 1945", title: "A desk that kept the trail", text: "Vannevar Bush’s memex: a desk of microfilm where any item could be tied to any other, and the trail itself was kept. The first description of a link.", src: "/variants/with-taste-skill/fable-5.1/assets/the-memex-3002477109.jpg", w: 1920, h: 1595, alt: "A magazine drawing of a man wearing glasses with a small camera strapped to his forehead, above the title As We May Think", pos: "50% 20%" },
  { tab: "Cajal, 1900", title: "The butterflies of the soul", text: "Santiago Ramón y Cajal drew nerve cells by hand from stained slides and gave them that name. A memory, we now know, is a change in how they touch.", src: "/variants/with-taste-skill/fable-5.1/assets/santiago-ramon-y-cajal-nerve-cells-in.jpg", w: 1920, h: 1268, alt: "Ink drawing of nerve cells with long branching fibres, lettered A to K", pos: "50% 50%" },
];

export function Plate() {
  const [i, setI] = useState(0);
  const p = plates[i];
  return (
    <section className="d2-plate" aria-labelledby="d2-plate-h">
      <div className="d2-plate__pic">
        {plates.map((pl, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={pl.src} src={pl.src} width={pl.w} height={pl.h} alt={pl.alt} decoding="async" hidden={k !== i} style={{ objectPosition: pl.pos }} />
        ))}
      </div>
      <div className="d2-plate__text">
        <div className="d2-plate__tabs" role="tablist" aria-label="Five centuries of second brains">
          {plates.map((pl, k) => (
            <button key={pl.tab} type="button" role="tab" aria-selected={k === i} className={k === i ? "is-on" : undefined} onClick={() => setI(k)}>{pl.tab}</button>
          ))}
        </div>
        <div className="d2-plate__mid" key={i}>
          <h2 id="d2-plate-h">{p.title}</h2>
          <p>{p.text}</p>
        </div>
        <div className="d2-plate__acts">
          <a className="d2-cell d2-cell--ink" href="#download">Download for Mac</a>
          <a className="d2-cell" href="#price">See the price</a>
        </div>
      </div>
    </section>
  );
}

export const plateNotes = byId;
