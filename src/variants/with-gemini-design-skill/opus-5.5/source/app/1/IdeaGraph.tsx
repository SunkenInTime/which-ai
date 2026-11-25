"use client";

import { useState } from "react";
import s from "./page.module.css";

const NODES: Record<string, { label: string; x: number; y: number }> = {
  focus: { label: "Focus", x: 48, y: 46 },
  deep: { label: "Deep work", x: 26, y: 22 },
  walks: { label: "Morning walks", x: 70, y: 18 },
  sleep: { label: "Sleep", x: 82, y: 50 },
  memory: { label: "Memory", x: 70, y: 82 },
  reading: { label: "Reading list", x: 20, y: 52 },
  q3: { label: "Q3 roadmap", x: 36, y: 76 },
  offsite: { label: "Offsite", x: 18, y: 88 },
  idea: { label: "Train idea", x: 56, y: 66 },
  coffee: { label: "Coffee", x: 88, y: 28 },
};

const EDGES: [string, string][] = [
  ["focus", "deep"],
  ["focus", "walks"],
  ["focus", "sleep"],
  ["focus", "reading"],
  ["focus", "q3"],
  ["deep", "reading"],
  ["walks", "idea"],
  ["walks", "coffee"],
  ["walks", "sleep"],
  ["sleep", "memory"],
  ["sleep", "coffee"],
  ["memory", "idea"],
  ["q3", "offsite"],
  ["q3", "idea"],
  ["reading", "offsite"],
];

export default function IdeaGraph() {
  const [active, setActive] = useState("focus");
  const neighbours = new Set(
    EDGES.filter(([a, b]) => a === active || b === active).map(([a, b]) => (a === active ? b : a)),
  );

  return (
    <div className={s.graphWrap}>
      <div className={s.graph}>
        <svg className={s.graphLines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {EDGES.map(([a, b]) => {
            const on = a === active || b === active;
            return (
              <line
                key={`${a}-${b}`}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                data-on={on || undefined}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
        {Object.entries(NODES).map(([id, n]) => (
          <button
            key={id}
            type="button"
            className={s.node}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            data-state={id === active ? "active" : neighbours.has(id) ? "near" : "far"}
            onMouseEnter={() => setActive(id)}
            onFocus={() => setActive(id)}
            onClick={() => setActive(id)}
            aria-pressed={id === active}
          >
            <span className={s.nodeDot} aria-hidden="true" />
            <span className={s.nodeLabel}>{n.label}</span>
          </button>
        ))}
      </div>
      <p className={s.graphCaption} aria-live="polite">
        <strong>{NODES[active].label}</strong> is linked to{" "}
        {[...neighbours].map((id, i, arr) => (
          <span key={id}>
            {i > 0 ? (i === arr.length - 1 ? " and " : ", ") : ""}
            {NODES[id].label.toLowerCase()}
          </span>
        ))}
        .
      </p>
    </div>
  );
}
