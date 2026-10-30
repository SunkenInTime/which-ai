/* A cyanotype star chart of one person's notes. Links draw themselves in once
   on load, then hold still. Purely declarative: no client JS. */

import s from "./page.module.css";

type Node = {
  x: number;
  y: number;
  r: number;
  label?: string;
  anchor?: "start" | "end";
  hub?: boolean;
};

const NODES: Node[] = [
  { x: 212, y: 158, r: 4.5, label: "sync rewrite" },
  { x: 276, y: 112, r: 2.6 },
  { x: 168, y: 224, r: 3.2 },
  { x: 302, y: 198, r: 2.4 },
  { x: 246, y: 258, r: 3.4 },
  { x: 336, y: 146, r: 2.2 },
  { x: 522, y: 108, r: 4.2, label: "commonplace book", anchor: "end" },
  { x: 584, y: 166, r: 3 },
  { x: 490, y: 176, r: 2.4 },
  { x: 626, y: 112, r: 2.2 },
  { x: 556, y: 214, r: 2.8 },
  { x: 722, y: 330, r: 4.4, label: "Marisol" },
  { x: 660, y: 398, r: 2.8 },
  { x: 780, y: 424, r: 2.4 },
  { x: 702, y: 476, r: 3.2 },
  { x: 252, y: 472, r: 4.2, label: "hydration table" },
  { x: 322, y: 524, r: 2.6 },
  { x: 192, y: 522, r: 2.4 },
  { x: 282, y: 418, r: 3 },
  { x: 430, y: 302, r: 7, label: "the merge bug", hub: true },
  { x: 442, y: 208, r: 2.6 },
  { x: 484, y: 382, r: 2.4 },
  { x: 380, y: 178, r: 2.4 },
  { x: 604, y: 292, r: 2.8 },
  { x: 140, y: 336, r: 2.4 },
  { x: 862, y: 296, r: 2.2 },
  { x: 96, y: 108, r: 1.8 },
  { x: 852, y: 132, r: 1.8 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 4],
  [1, 3],
  [3, 5],
  [4, 19],
  [2, 24],
  [24, 19],
  [5, 23],
  [23, 19],
  [6, 7],
  [6, 8],
  [7, 10],
  [8, 10],
  [7, 9],
  [10, 19],
  [8, 19],
  [19, 20],
  [20, 23],
  [19, 21],
  [21, 11],
  [19, 25],
  [19, 11],
  [11, 12],
  [12, 13],
  [11, 24],
  [24, 26],
  [13, 14],
  [12, 14],
  [16, 15],
  [15, 18],
  [18, 17],
  [17, 25],
  [15, 21],
  [18, 21],
  [4, 18],
  [6, 27],
  [26, 27],
];

export function NoteMap() {
  return (
    <svg
      viewBox="0 0 940 580"
      role="img"
      aria-label="A map of twenty-eight notes and the thirty-eight links between them, clustered around a central note called the merge bug."
      className={s.mapSvg}
    >
      <g className={s.mapLinks}>
        {LINKS.map(([a, b], i) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            style={{ animationDelay: `${160 + i * 26}ms` }}
          />
        ))}
      </g>

      <g>
        {NODES.map((n, i) => (
          <g key={i} className={s.mapNode} style={{ animationDelay: `${i * 34}ms` }}>
            {n.hub ? (
              <>
                <circle cx={n.x} cy={n.y} r={n.r + 9} className={s.mapHubRing} />
                <circle cx={n.x} cy={n.y} r={n.r + 16} className={s.mapHubHalo} />
              </>
            ) : null}
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              className={n.hub ? s.mapDotHub : s.mapDot}
            />
            {n.label ? (
              <text
                x={n.anchor === "end" ? n.x - n.r - 9 : n.x + n.r + 9}
                y={n.y + 4}
                textAnchor={n.anchor ?? "start"}
                className={s.mapLabel}
              >
                {n.label}
              </text>
            ) : null}
          </g>
        ))}
      </g>
    </svg>
  );
}
