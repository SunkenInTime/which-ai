"use client";

import { useId, useMemo, useState, type CSSProperties } from "react";
import { NOTES, NOTE_BY_ID } from "../../_shared/facts";
import s from "../p4.module.css";

type Side = "r" | "l" | "t" | "b";
type Star = { x: number; y: number; name: string; greek?: string; side: Side };

/** Where each sample note sits on the plate (720 x 520), its short name and its Bayer letter. */
const STARS: Record<string, Star> = {
  writing: { x: 350, y: 330, name: "Writing", greek: "α", side: "b" },
  forgetting: { x: 190, y: 120, name: "Forgetting curve", greek: "β", side: "t" },
  spacing: { x: 330, y: 70, name: "Spaced repetition", greek: "γ", side: "r" },
  retrieval: { x: 350, y: 195, name: "Retrieval", greek: "δ", side: "r" },
  slipbox: { x: 85, y: 215, name: "Slip box", greek: "ε", side: "b" },
  atomic: { x: 190, y: 330, name: "One idea per note", greek: "ζ", side: "b" },
  trust: { x: 620, y: 195, name: "Trust", greek: "α", side: "l" },
  pricing: { x: 490, y: 275, name: "Pricing idea", greek: "β", side: "b" },
  "interview-maya": { x: 500, y: 100, name: "Maya, 14 March", greek: "γ", side: "t" },
  files: { x: 650, y: 330, name: "Plain text", greek: "δ", side: "t" },
  shelf: { x: 100, y: 440, name: "Kitchen shelf", greek: "α", side: "t" },
  oak: { x: 235, y: 470, name: "Oak finish", greek: "β", side: "r" },
  lisbon: { x: 470, y: 445, name: "Lisbon", side: "t" },
  sourdough: { x: 590, y: 465, name: "Sourdough", side: "t" },
};

type Edge = readonly [string, string];
const key = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`);

const LINKS: Edge[] = (() => {
  const seen = new Set<string>();
  const out: Edge[] = [];
  for (const n of NOTES) {
    for (const l of n.links) {
      const k = key(n.id, l);
      if (seen.has(k) || !NOTE_BY_ID[l]) continue;
      seen.add(k);
      out.push([n.id, l]);
    }
  }
  return out;
})();

const STOP = new Set(
  "a an the of on in at to for and or but is are was were be do did does what why how who when where which about say said me my i it its with from by as that this there some something anything".split(
    " ",
  ),
);

/** A small hand-made map of meaning, so a question can find a note that never uses its words. */
const MEANING: Record<string, string[]> = {
  money: ["price", "pricing", "charge", "pay", "cost"],
  cost: ["price", "pricing", "charge"],
  pay: ["price", "pricing", "charge"],
  forget: ["forgetting", "curve", "spaced", "retrieval", "remember"],
  remember: ["forgetting", "spaced", "retrieval", "recall"],
  memory: ["forgetting", "spaced", "retrieval", "slip box"],
  learn: ["spaced", "retrieval", "repetition"],
  kitchen: ["shelf", "oak", "sourdough", "bake", "cook"],
  cook: ["sourdough", "bake", "kitchen"],
  bread: ["sourdough", "bake"],
  travel: ["lisbon", "train"],
  trip: ["lisbon", "train"],
  holiday: ["lisbon", "train"],
  essay: ["writing", "outline"],
  leave: ["export", "files", "plain"],
};

const SUGGESTIONS = ["money", "why do I forget", "something for the kitchen"];

const ago = (d: number) => (d < 60 ? `${d} days ago` : d < 730 ? `${Math.round(d / 30)} months ago` : `${Math.round(d / 365)} years ago`);

type Hit = { id: string; score: number; why: string };

function search(q: string): Hit[] {
  const typed = q.split(/[^A-Za-z0-9’']+/).filter((w) => w.length > 1 && !STOP.has(w.toLowerCase()));
  const tokens = typed.map((w) => w.toLowerCase());
  if (!tokens.length) return [];

  const scores = new Map<string, { score: number; direct: Set<string>; meant: Set<string> }>();
  const note = (id: string) => {
    if (!scores.has(id)) scores.set(id, { score: 0, direct: new Set(), meant: new Set() });
    return scores.get(id)!;
  };

  for (const t of tokens) {
    const forms = [t, t.replace(/(ing|ed|es|s)$/, "")].filter((f) => f.length > 2);
    const stemKey = Object.keys(MEANING).find((k) => t.startsWith(k.slice(0, 5)) || k.startsWith(t.slice(0, 5)));
    const extra = stemKey ? MEANING[stemKey] : [];
    for (const n of NOTES) {
      const title = n.title.toLowerCase();
      const body = n.body.toLowerCase();
      let hit = 0;
      for (const f of forms) {
        if (title.includes(f)) hit += 3;
        else if (body.includes(f)) hit += 1;
      }
      if (hit) {
        const r = note(n.id);
        r.score += hit;
        r.direct.add(typed[tokens.indexOf(t)]);
      }
      for (const e of extra) {
        const ti = title.includes(e);
        const bo = body.includes(e);
        if (ti || bo) {
          const r = note(n.id);
          r.score += ti ? 2 : 0.6;
          r.meant.add(`${t} → ${e}`);
        }
      }
    }
  }

  // A note that links to two or more of the matches belongs in the constellation too.
  const matched = new Set(scores.keys());
  if (matched.size >= 2) {
    for (const n of NOTES) {
      if (matched.has(n.id)) continue;
      const near = LINKS.filter(([a, b]) => (a === n.id && matched.has(b)) || (b === n.id && matched.has(a))).length;
      if (near >= 2) {
        const r = note(n.id);
        r.score += 0.3 + near * 0.1;
      }
    }
  }

  return [...scores.entries()]
    .map(([id, r]) => {
      const direct = [...r.direct];
      const meant = [...r.meant];
      const why = direct.length
        ? `Matches ${direct.map((d) => `“${d}”`).join(", ")}`
        : meant.length
          ? `Meaning: ${meant[0]}`
          : "Linked to the other matches";
      return { id, score: r.score, why };
    })
    .filter((h) => h.score >= 0.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function degree(id: string, extra: Edge[]) {
  return [...LINKS, ...extra].filter(([a, b]) => a === id || b === id).length;
}

export function Sky() {
  const inputId = useId();
  const [query, setQuery] = useState("Maya on pricing");
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [drawn, setDrawn] = useState<Edge[]>([]);
  const [message, setMessage] = useState("");

  const hits = useMemo(() => search(query), [query]);
  const lit = useMemo(() => new Set(hits.map((h) => h.id)), [hits]);
  const allEdges = useMemo(() => [...LINKS, ...drawn], [drawn]);
  const drawnKeys = useMemo(() => new Set(drawn.map(([a, b]) => key(a, b))), [drawn]);
  const litEdges = allEdges.filter(([a, b]) => lit.has(a) && lit.has(b));

  function pick(id: string) {
    if (selected === null) {
      setSelected(id);
      setMessage(`${STARS[id].name} is selected. Pick a second star to draw a line to it.`);
      return;
    }
    if (selected === id) {
      setSelected(null);
      setMessage("");
      return;
    }
    const k = key(selected, id);
    if (allEdges.some(([a, b]) => key(a, b) === k)) {
      setMessage(`${STARS[selected].name} and ${STARS[id].name} are already linked.`);
    } else {
      setDrawn((d) => [...d, [selected, id]]);
      setMessage(
        `Linked ${STARS[selected].name} and ${STARS[id].name}. Each note now lists the other under it, and the line is yours.`,
      );
    }
    setSelected(null);
  }

  const showName = (id: string) => lit.has(id) || selected === id || hover === id;
  const stars = Object.entries(STARS);

  const stat =
    hits.length === 0
      ? "No stars lit"
      : `${hits.length} ${hits.length === 1 ? "star" : "stars"}, ${litEdges.length} ${litEdges.length === 1 ? "line" : "lines"}`;

  return (
    <div className={s.skyGrid}>
      <div className={s.skyInput} data-ui>
        <label className={s.srOnly} htmlFor={inputId}>
          Ask your notes
        </label>
        <div className={s.inputWrap}>
          <input
            id={inputId}
            className={s.bigInput}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setMessage("");
            }}
            spellCheck={false}
            autoComplete="off"
            enterKeyHint="search"
            placeholder="Ask anything"
          />
          <span className={s.ghost} aria-hidden="true">
            {query}
            <span className={s.caretBlock} />
          </span>
        </div>
      </div>

      <div className={s.skyAnswer} data-ui>
        {hits.length > 0 ? (
          <ol className={s.hits} aria-label="Notes found">
            {hits.map((h, i) => {
              const n = NOTE_BY_ID[h.id];
              return (
                <li
                  key={h.id}
                  className={s.hit}
                  style={{ "--i": i } as CSSProperties}
                  onMouseEnter={() => setHover(h.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <p className={s.hitTitle}>{n.title}</p>
                  <p className={s.hitBody}>{n.body.length > 118 ? `${n.body.slice(0, 116).trimEnd()}…` : n.body}</p>
                  <p className={s.hitMeta}>
                    {h.why}. Written {ago(n.age)}.
                  </p>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className={s.noHit}>
            {query.trim()
              ? "Nothing in these notes says that, and Engram says so instead of guessing."
              : "Type a question. The notes that answer it light up as stars."}
          </p>
        )}

        <p className={s.live} aria-live="polite">
          {message}
          {drawn.length > 0 && (
            <>
              {" "}
              <button
                type="button"
                className={s.inlineBtn}
                onClick={() => {
                  setDrawn([]);
                  setMessage("");
                }}
              >
                Clear my lines
              </button>
            </>
          )}
        </p>

        <div className={s.tryRow}>
          <span className={s.tryLabel}>Or try</span>
          {SUGGESTIONS.map((t) => (
            <button
              key={t}
              type="button"
              className={s.tryBtn}
              onClick={() => {
                setQuery(t);
                setMessage("");
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <figure className={s.plate} data-ui data-reveal="settle">
        <p className={s.plateTitle} aria-hidden="true">
          {query.trim() ? <i>{query.trim()}</i> : <i>Your sky</i>}
          <span>{stat}</span>
        </p>
        <div className={s.plateSky}>
          <svg className={s.plateLines} viewBox="0 0 720 520" preserveAspectRatio="none" aria-hidden="true">
            {allEdges.map(([a, b]) => {
              const on = lit.has(a) && lit.has(b);
              const mine = drawnKeys.has(key(a, b));
              return (
                <line
                  key={key(a, b)}
                  x1={STARS[a].x}
                  y1={STARS[a].y}
                  x2={STARS[b].x}
                  y2={STARS[b].y}
                  className={`${s.edge} ${on ? s.edgeOn : ""} ${mine ? s.edgeMine : ""}`}
                />
              );
            })}
          </svg>

          {stars.map(([id, st]) => {
            const d = degree(id, drawn);
            const r = 3.4 + d * 1.9;
            const on = lit.has(id);
            const style = {
              left: `${(st.x / 720) * 100}%`,
              top: `${(st.y / 520) * 100}%`,
              "--r": r,
            } as CSSProperties;
            return (
              <div key={id} className={s.starWrap} style={style} data-side={st.side}>
                <button
                  type="button"
                  className={`${s.star} ${d === 0 ? s.starDot : ""} ${on ? s.starOn : ""} ${selected === id ? s.starSel : ""}`}
                  aria-pressed={selected === id}
                  aria-label={`${NOTE_BY_ID[id].title}, ${d} ${d === 1 ? "link" : "links"}${on ? ", found" : ""}`}
                  onClick={() => pick(id)}
                  onMouseEnter={() => setHover(id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(id)}
                  onBlur={() => setHover(null)}
                >
                  <span className={s.shape} />
                </button>
                {st.greek && !showName(id) && <span className={s.greek} aria-hidden="true">{st.greek}</span>}
                {showName(id) && (
                  <span className={s.starName} aria-hidden="true">
                    {st.greek && <i>{st.greek} </i>}
                    {st.name}
                  </span>
                )}
              </div>
            );
          })}

          <p className={s.plateInformes} aria-hidden="true">
            <i>Unformed stars</i>
          </p>
        </div>
        <figcaption className={s.plateCaption}>
          Fourteen sample notes. A star’s size is how many notes point to it. Tap one star, then another, to draw a
          line.
        </figcaption>
      </figure>
    </div>
  );
}
