"use client";

import { useState } from "react";
import styles from "./styles.module.css";

type Node = { id: string; title: string; body: string; x: number; y: number; r: number; hue: string };

const nodes: Node[] = [
  { id: "sleep", title: "Sleep", body: "Cold room, no screens after 10. Wake time matters more than bedtime.", x: 130, y: 120, r: 16, hue: "#7de0c3" },
  { id: "focus", title: "Deep work", body: "Two hours, phone in another room. Best output comes before 11.", x: 330, y: 200, r: 22, hue: "#ffb86b" },
  { id: "book", title: "The book", body: "Chapter 3 is really two chapters. Split at the harbour pilot interview.", x: 560, y: 110, r: 26, hue: "#ff7a9c" },
  { id: "pilot", title: "Harbour pilot", body: "Interviewed 14 March. Says the job is 90% waiting and 10% not panicking.", x: 700, y: 250, r: 14, hue: "#ff7a9c" },
  { id: "run", title: "Running", body: "Zone 2 for 45 minutes. Thinks better afterwards, so schedule it before writing.", x: 170, y: 330, r: 18, hue: "#7de0c3" },
  { id: "habit", title: "Habits", body: "Attach the new habit to an existing one. Never to a time of day.", x: 400, y: 380, r: 20, hue: "#b9a2ff" },
  { id: "priya", title: "Priya", body: "Runs launches at a fintech. Ask about the first hour after a slip.", x: 620, y: 400, r: 16, hue: "#b9a2ff" },
];

const edges: [string, string][] = [
  ["sleep", "focus"], ["sleep", "run"], ["focus", "book"], ["focus", "habit"], ["run", "habit"],
  ["run", "focus"], ["book", "pilot"], ["habit", "priya"], ["book", "habit"], ["pilot", "priya"],
];

export default function Graph() {
  const [active, setActive] = useState("book");
  const cur = nodes.find((n) => n.id === active) ?? nodes[0];
  const linked = new Set(
    edges.flatMap(([a, b]) => (a === active ? [b] : b === active ? [a] : [])),
  );
  const byId = (id: string) => nodes.find((n) => n.id === id) ?? nodes[0];

  return (
    <div className={styles.graph}>
      <svg viewBox="0 0 820 480" className={styles.svg} role="group" aria-label="A map of seven linked notes">
        {edges.map(([a, b]) => {
          const A = byId(a);
          const B = byId(b);
          const lit = a === active || b === active;
          return (
            <line
              key={a + b}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              className={lit ? styles.edgeLit : styles.edge}
            />
          );
        })}
        {nodes.map((n) => {
          const on = n.id === active;
          const near = linked.has(n.id);
          return (
            <g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-pressed={on}
              aria-label={`${n.title}: ${n.body}`}
              className={styles.node}
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              onClick={() => setActive(n.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActive(n.id);
              }}
            >
              <circle cx={n.x} cy={n.y} r={n.r + 12} fill={n.hue} opacity={on ? 0.25 : 0} />
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.hue} opacity={on || near ? 1 : 0.45} />
              <text x={n.x} y={n.y + n.r + 18} textAnchor="middle" className={styles.nodeLabel}>
                {n.title}
              </text>
            </g>
          );
        })}
      </svg>
      <div className={styles.readout} aria-live="polite">
        <h3 className={styles.readoutH}>{cur.title}</h3>
        <p>{cur.body}</p>
        <p className={styles.readoutLinks}>
          Linked to {[...linked].map((id) => byId(id).title).join(", ") || "nothing yet"}.
        </p>
      </div>
    </div>
  );
}
