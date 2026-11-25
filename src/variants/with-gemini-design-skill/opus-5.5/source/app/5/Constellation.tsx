"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

type Star = { id: number; title: string; x: number; y: number; r: number };

const STARS: Star[] = [
  { id: 0, title: "Memory is a field, not a vault", x: 1040, y: 300, r: 7 },
  { id: 1, title: "Sleep consolidates what you rehearse", x: 1210, y: 196, r: 5 },
  { id: 2, title: "Forgetting curve, Ebbinghaus", x: 1310, y: 380, r: 5 },
  { id: 3, title: "Why I reread old journals", x: 860, y: 226, r: 5 },
  { id: 4, title: "Voice memo, 2:14 a.m.", x: 1150, y: 470, r: 4 },
  { id: 5, title: "Draft: chapter three, the tide", x: 1290, y: 610, r: 5 },
  { id: 6, title: "Notes on Mary Oliver", x: 690, y: 300, r: 4 },
  { id: 7, title: "Clip: The Paris Review on revision", x: 520, y: 236, r: 4 },
  { id: 8, title: "Idea: essay on night trains", x: 970, y: 560, r: 6 },
  { id: 9, title: "PDF: The Extended Mind", x: 1380, y: 246, r: 4 },
  { id: 10, title: "Zettelkasten, Luhmann's slips", x: 380, y: 262, r: 3.5 },
  { id: 11, title: "Reading list: winter", x: 1110, y: 700, r: 4 },
  { id: 12, title: "Grandmother's recipes, scanned", x: 1340, y: 770, r: 3.5 },
  { id: 13, title: "Interview: the lighthouse keeper", x: 650, y: 176, r: 3.5 },
  { id: 14, title: "Walking helps me draft", x: 880, y: 420, r: 4 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 8], [0, 6],
  [1, 9], [1, 2], [2, 5], [3, 7], [3, 6], [3, 13],
  [4, 8], [4, 5], [5, 11], [6, 7], [7, 10], [8, 14],
  [14, 3], [11, 12], [5, 12], [9, 2], [10, 13], [8, 11],
];

// Deterministic star dust so server and client render the same sky.
function dust(count: number) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, () => ({
    x: +(rand() * 1440).toFixed(1),
    y: +(rand() * 900).toFixed(1),
    r: +(0.4 + rand() * 1.1).toFixed(2),
    o: +(0.15 + rand() * 0.45).toFixed(2),
  }));
}

const DUST = dust(170);

const RIBBON =
  "“Memory is not a vault but a field. What you walk through often stays green.”   ·   from a note kept on 14 March 2023, linked to six others   ·   ";

export default function Constellation() {
  const [active, setActive] = useState(0);
  const animRef = useRef<SVGAnimateElement>(null);

  const neighbours = useMemo(() => {
    const set = new Set<number>();
    EDGES.forEach(([a, b]) => {
      if (a === active) set.add(b);
      if (b === active) set.add(a);
    });
    return set;
  }, [active]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) animRef.current?.beginElement();
  }, []);

  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const star = STARS[active];
  // On narrow screens the sliced viewBox only shows roughly x 320 to 1120.
  const anchorEnd = star.x > (narrow ? 760 : 1180);
  const labelX = anchorEnd ? star.x - 16 : star.x + 16;

  return (
    <svg
      className={styles.sky}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      role="group"
      aria-label="A map of linked notes. Focus a star to read its title."
    >
      <defs>
        <radialGradient id="k5-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffb547" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffb547" stopOpacity="0" />
        </radialGradient>
        <path id="k5-ribbon" d="M -80 214 C 280 70, 820 40, 1180 120 S 1480 250, 1560 300" />
      </defs>

      <g aria-hidden="true">
        {DUST.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#d9dde3" opacity={d.o} />
        ))}
      </g>

      <text className={styles.ribbon} aria-hidden="true">
        <textPath href="#k5-ribbon" startOffset="0%">
          {RIBBON}
          {RIBBON}
          <animate
            ref={animRef}
            attributeName="startOffset"
            from="24%"
            to="0%"
            dur="3.2s"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keySplines="0.22 1 0.36 1"
            keyTimes="0;1"
          />
        </textPath>
      </text>

      <g aria-hidden="true">
        {EDGES.map(([a, b], i) => {
          const lit = a === active || b === active;
          return (
            <line
              key={i}
              x1={STARS[a].x}
              y1={STARS[a].y}
              x2={STARS[b].x}
              y2={STARS[b].y}
              className={lit ? `${styles.edge} ${styles.edgeLit}` : styles.edge}
              style={{ animationDelay: `${300 + i * 45}ms` }}
              pathLength={1}
            />
          );
        })}
      </g>

      {STARS.map((s, i) => {
        const isActive = s.id === active;
        const isNear = neighbours.has(s.id);
        return (
          <g
            key={s.id}
            className={styles.star}
            data-state={isActive ? "active" : isNear ? "near" : "idle"}
            style={{ animationDelay: `${i * 60}ms` }}
            tabIndex={0}
            role="button"
            aria-label={`${s.title}, linked to ${EDGES.filter(([a, b]) => a === s.id || b === s.id).length} notes`}
            aria-pressed={isActive}
            onMouseEnter={() => setActive(s.id)}
            onFocus={() => setActive(s.id)}
            onClick={() => setActive(s.id)}
          >
            <circle cx={s.x} cy={s.y} r={s.r * 5} fill="url(#k5-glow)" className={styles.halo} />
            <circle cx={s.x} cy={s.y} r={s.r} className={styles.core} />
            <circle cx={s.x} cy={s.y} r={22} fill="transparent" />
          </g>
        );
      })}

      <g className={styles.label} key={active} aria-hidden="true">
        <text x={labelX} y={star.y - 6} textAnchor={anchorEnd ? "end" : "start"} className={styles.labelTitle}>
          {star.title}
        </text>
        <text x={labelX} y={star.y + 16} textAnchor={anchorEnd ? "end" : "start"} className={styles.labelMeta}>
          {`Linked to ${neighbours.size} notes`}
        </text>
      </g>
    </svg>
  );
}
