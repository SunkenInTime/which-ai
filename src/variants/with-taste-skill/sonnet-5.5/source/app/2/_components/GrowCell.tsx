"use client";

import { useId, useMemo, useState } from "react";
import { NOTES, NOTE_BY_ID, PRODUCT } from "../../_shared/facts";
import { CELL_PATH } from "./Cell";
import s from "../p2.module.css";

/* ------------------------------------------------------------------ */
/* Finding what a new thought belongs with                             */
/* ------------------------------------------------------------------ */

const STOP = new Set(
  "a an and are as at be because been but by for from had has have her his how i if in into is it its just me my not of on or our she so than that the their them then there they this to too up us was we were what when where which who why will with within you your said says say could would should about after all also any can did do does going got him one out some such very who".split(
    " ",
  ),
);

function stem(w: string) {
  let t = w.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (t.length > 5 && t.endsWith("ing")) t = t.slice(0, -3);
  else if (t.length > 4 && t.endsWith("ed")) t = t.slice(0, -2);
  else if (t.length > 4 && t.endsWith("es")) t = t.slice(0, -2);
  else if (t.length > 3 && t.endsWith("s")) t = t.slice(0, -1);
  if (t.length > 3 && t[t.length - 1] === t[t.length - 2]) t = t.slice(0, -1);
  return t;
}

function stems(text: string) {
  return new Set(
    text
      .split(/\s+/)
      .map(stem)
      .filter((t) => t.length > 1 && !STOP.has(t)),
  );
}

const INDEX = NOTES.map((n) => ({
  id: n.id,
  title: stems(n.title),
  body: stems(n.body),
}));

const BACKLINKS: Record<string, number> = Object.fromEntries(
  NOTES.map((n) => [n.id, NOTES.filter((m) => m.links.includes(n.id)).length]),
);

type Hit = { id: string; via: "words" | "link" };

/** Notes a thought belongs with: the notes that share its words, then the notes those already link to. */
export function related(text: string): Hit[] {
  const words = stems(text);
  if (words.size === 0) return [];
  const scored = INDEX.map((n) => {
    let score = 0;
    for (const w of words) {
      if (n.title.has(w)) score += 3;
      else if (n.body.has(w)) score += 1;
    }
    return { id: n.id, score };
  })
    .filter((n) => n.score >= 2)
    .sort((a, b) => b.score - a.score);

  const hits: Hit[] = scored.slice(0, 2).map((n) => ({ id: n.id, via: "words" }));
  for (const h of [...hits]) {
    for (const id of NOTE_BY_ID[h.id].links) {
      if (hits.length >= 4) break;
      if (!hits.some((x) => x.id === id)) hits.push({ id, via: "link" });
    }
  }
  return hits.slice(0, 4);
}

/* ------------------------------------------------------------------ */
/* Geometry of the plate (a 100 × 100 square, scaled by CSS)           */
/* ------------------------------------------------------------------ */

const SOMA = { x: 19, y: 54, r: 8.5 };
const GLYPH = 6.4; // width of a target cell
const SPOTS: Record<number, [number, number][]> = {
  0: [],
  1: [[64, 54]],
  2: [
    [62, 36],
    [62, 72],
  ],
  3: [
    [58, 24],
    [66, 54],
    [58, 84],
  ],
  4: [
    [58, 20],
    [66, 40],
    [66, 62],
    [58, 82],
  ],
};

type Pt = [number, number];

function bez(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const u = 1 - t;
  return [
    u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0],
    u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1],
  ];
}

function branch(to: [number, number], i: number) {
  const p0: Pt = [SOMA.x + SOMA.r, SOMA.y];
  const p3: Pt = [to[0] - GLYPH / 2 - 0.4, to[1]];
  const dx = p3[0] - p0[0];
  const dir = i % 2 === 0 ? 1 : -1;
  const p1: Pt = [p0[0] + dx * 0.5, p0[1] + dir * 5];
  const p2: Pt = [p3[0] - dx * 0.4, p3[1] + (p0[1] - p3[1]) * 0.12];
  const d = `M${p0[0]} ${p0[1]}C${p1[0].toFixed(2)} ${p1[1].toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} ${p3[0].toFixed(2)} ${p3[1].toFixed(2)}`;
  const twigs: string[] = [];
  [0.24, 0.46, 0.68].forEach((t, k) => {
    const a = bez(p0, p1, p2, p3, t);
    const b = bez(p0, p1, p2, p3, t + 0.02);
    const tx = b[0] - a[0];
    const ty = b[1] - a[1];
    const len = Math.hypot(tx, ty) || 1;
    const side = (k + i) % 2 === 0 ? 1 : -1;
    const nx = (-ty / len) * side;
    const ny = (tx / len) * side;
    const l = 3.4 - k * 0.5;
    const ex = a[0] + (tx / len) * l * 0.6 + nx * l;
    const ey = a[1] + (ty / len) * l * 0.6 + ny * l;
    twigs.push(`M${a[0].toFixed(2)} ${a[1].toFixed(2)}L${ex.toFixed(2)} ${ey.toFixed(2)}`);
    const fx = ex + (tx / len) * 1.4 + nx * 0.6;
    const fy = ey + (ty / len) * 1.4 + ny * 0.6;
    twigs.push(`M${ex.toFixed(2)} ${ey.toFixed(2)}L${fx.toFixed(2)} ${fy.toFixed(2)}`);
  });
  return { d, twigs: twigs.join("") };
}

/* ------------------------------------------------------------------ */
/* The live thing                                                      */
/* ------------------------------------------------------------------ */

const PRESETS = [
  {
    tab: "Research",
    text: "Maya says she stopped using her old app because she couldn’t find anything she had written.",
  },
  {
    tab: "Home",
    text: "Oak shelf for the alcove: hardwax oil, two thin coats, brackets every 40 cm.",
  },
  {
    tab: "Reading",
    text: "We forget most of what we learn within a week unless we go back to it.",
  },
];

function firstLinked(text: string) {
  const h = related(text);
  return h.length ? [h[0].id] : [];
}

export function GrowCell() {
  const fieldId = useId();
  const [tab, setTab] = useState(0);
  const [text, setText] = useState(PRESETS[0].text);
  const [linked, setLinked] = useState<string[]>(() => firstLinked(PRESETS[0].text));

  const hits = useMemo(() => related(text), [text]);
  const spots = SPOTS[hits.length] ?? SPOTS[4];
  const shapes = useMemo(() => hits.map((_, i) => branch(spots[i], i)), [hits, spots]);

  function choose(i: number) {
    setTab(i);
    setText(PRESETS[i].text);
    setLinked(firstLinked(PRESETS[i].text));
  }

  function edit(v: string) {
    setText(v);
    setTab(-1);
    setLinked([]);
  }

  function toggle(id: string) {
    setLinked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }

  const excerpt = text.trim() === "" ? "Start writing…" : text.trim();
  const lastLinked = linked.length ? NOTE_BY_ID[linked[linked.length - 1]] : null;

  let status: string;
  if (text.trim() === "") status = "Write a thought, or pick an example above.";
  else if (hits.length === 0)
    status = "Nothing in the sample notes matches yet. This one starts a new cell, and Engram suggests nothing.";
  else
    status = `${hits.length} ${hits.length === 1 ? "note looks" : "notes look"} related. ${linked.length} linked. Tap a note to link it; nothing links until you do.`;

  return (
    <section className={s.try} id="try" aria-labelledby="try-h">
      <div className={s.tryPlate}>
        <div className={s.stage} data-ui data-rv="" style={{ ["--d" as string]: 0 }}>
          <svg className={s.stageSvg} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
            {/* The new note */}
            <g transform={`translate(${SOMA.x - SOMA.r} ${SOMA.y - SOMA.r}) scale(${(SOMA.r * 2) / 24})`}>
              <path d={CELL_PATH} className={s.somaFill} />
            </g>
            {hits.length === 0 && (
              <path className={s.reachStub} d={`M${SOMA.x + SOMA.r} ${SOMA.y}c6 -1 9 2 12 -2`} />
            )}
            {hits.map((h, i) => {
              const on = linked.includes(h.id);
              const [x, y] = spots[i];
              return (
                <g key={h.id}>
                  <path className={s.suggest} d={shapes[i].d} />
                  <path
                    className={`${s.linkPath} ${on ? s.linkOn : ""}`}
                    d={shapes[i].d}
                    pathLength={1}
                  />
                  <path className={`${s.twigs} ${on ? s.twigsOn : ""}`} d={shapes[i].twigs} />
                  <g transform={`translate(${x - GLYPH / 2} ${y - GLYPH / 2}) scale(${GLYPH / 24})`}>
                    <path d={CELL_PATH} className={`${s.targetCell} ${on ? s.targetOn : ""}`} />
                  </g>
                </g>
              );
            })}
          </svg>

          <div className={s.somaLabel}>
            <span className={s.somaTitle}>New note</span>
            <span className={s.somaText}>{excerpt}</span>
          </div>

          {hits.map((h, i) => {
            const [x, y] = spots[i];
            const note = NOTE_BY_ID[h.id];
            const on = linked.includes(h.id);
            const count = BACKLINKS[h.id] + (on ? 1 : 0);
            return (
              <button
                key={h.id}
                type="button"
                className={`${s.target} ${on ? s.targetLinked : ""}`}
                style={{
                  left: `${x - GLYPH / 2 - 1.5}%`,
                  top: `${y}%`,
                  width: `${96 - x + GLYPH / 2}%`,
                  paddingLeft: `${GLYPH + 2.8}%`,
                }}
                aria-pressed={on}
                title={h.via === "link" ? "Suggested: a note your match already links to" : "Suggested: shares words with your thought"}
                onClick={() => toggle(h.id)}
              >
                <span className={s.targetTitle}>{note.title}</span>
                <span className={s.targetMeta}>
                  {on ? "Linked · " : ""}
                  {count} {count === 1 ? "link" : "links"} in
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={s.tryCol}>
        <div className={s.tabs} role="group" aria-label="Example thoughts">
          {PRESETS.map((p, i) => (
            <button
              key={p.tab}
              type="button"
              className={`${s.tab} ${tab === i ? s.tabOn : ""}`}
              aria-pressed={tab === i}
              onClick={() => choose(i)}
            >
              {p.tab}
            </button>
          ))}
        </div>

        <div className={s.tryBody}>
          <h2 id="try-h" className={s.head} data-rv="" style={{ ["--d" as string]: 0 }}>
            Watch a note connect
          </h2>
          <p className={s.body} data-rv="" style={{ ["--d" as string]: 1 }}>
            Write a thought. Engram reaches through your notes for the ones it belongs with. Tap one to link it, and the link works both ways.
          </p>
          <div data-rv="" style={{ ["--d" as string]: 2 }}>
            <label className={s.fieldLabel} htmlFor={fieldId}>
              Your thought
            </label>
            <textarea
              id={fieldId}
              className={s.field}
              rows={3}
              maxLength={220}
              value={text}
              onChange={(e) => edit(e.target.value)}
              spellCheck={false}
            />
            <p className={s.status} aria-live="polite">
              {status}
              {lastLinked ? (
                <>
                  {" "}
                  <strong>{lastLinked.title}</strong> now lists this note under its backlinks.
                </>
              ) : null}
            </p>
          </div>
        </div>

        <div className={s.cells}>
          <a className={`${s.cellButton} ${s.cellInk}`} href={PRODUCT.primaryHref}>
            {PRODUCT.primaryAction}
          </a>
          <a className={`${s.cellButton} ${s.cellTone}`} href="#plans">
            See plans
          </a>
        </div>
      </div>
    </section>
  );
}
