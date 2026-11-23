"use client";

import { useState, type CSSProperties } from "react";
import styles from "./board.module.css";

type Tone = "chalk" | "yellow" | "pink" | "blue";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  tone: Tone;
  anchor?: "end";
};

const nodes: Node[] = [
  { id: "notes", label: "Note-taking", x: 300, y: 262, r: 11, tone: "chalk" },
  { id: "zettel", label: "Zettelkasten", x: 196, y: 178, r: 8, tone: "yellow" },
  { id: "common", label: "Commonplace books", x: 318, y: 120, r: 7, tone: "yellow" },
  { id: "marginalia", label: "Marginalia", x: 150, y: 92, r: 5, tone: "yellow" },
  { id: "spaced", label: "Spaced repetition", x: 236, y: 352, r: 9, tone: "yellow" },
  { id: "forget", label: "Forgetting curve", x: 120, y: 282, r: 6, tone: "yellow" },
  { id: "palace", label: "Memory palace", x: 410, y: 318, r: 6, tone: "yellow" },
  { id: "cities", label: "City planning", x: 452, y: 150, r: 9, tone: "pink" },
  { id: "blocks", label: "Block size", x: 548, y: 236, r: 6, tone: "pink", anchor: "end" },
  { id: "walk", label: "Walking", x: 500, y: 70, r: 6, tone: "pink" },
  { id: "street", label: "Street trees", x: 590, y: 120, r: 4, tone: "pink", anchor: "end" },
  { id: "writing", label: "Writing", x: 380, y: 420, r: 8, tone: "blue" },
  { id: "drafts", label: "Drafts", x: 290, y: 470, r: 5, tone: "blue" },
  { id: "reading", label: "Reading", x: 500, y: 392, r: 7, tone: "blue" },
  { id: "sourdough", label: "Sourdough", x: 170, y: 430, r: 5, tone: "blue" },
];

const edges: Array<[string, string]> = [
  ["notes", "zettel"],
  ["notes", "common"],
  ["zettel", "marginalia"],
  ["notes", "spaced"],
  ["spaced", "forget"],
  ["notes", "palace"],
  ["common", "spaced"],
  ["notes", "cities"],
  ["cities", "blocks"],
  ["cities", "walk"],
  ["walk", "street"],
  ["blocks", "street"],
  ["notes", "writing"],
  ["writing", "drafts"],
  ["writing", "reading"],
  ["reading", "cities"],
  ["drafts", "sourdough"],
  ["sourdough", "spaced"],
  ["palace", "writing"],
  ["marginalia", "writing"],
];

const byId = Object.fromEntries(nodes.map((node) => [node.id, node]));
const degree = (id: string) =>
  edges.filter(([a, b]) => a === id || b === id).length;

export default function Graph() {
  const [active, setActive] = useState<string | null>(null);

  const neighbors = active
    ? edges
        .filter(([a, b]) => a === active || b === active)
        .map(([a, b]) => (a === active ? b : a))
    : [];
  const current = active ? byId[active] : undefined;
  const lit = new Set(active ? [active, ...neighbors] : []);

  return (
    <figure className={styles.graphWrap}>
      <svg
        className={styles.graph}
        viewBox="0 0 640 540"
        role="group"
        aria-label="A map of notes drawn as connected dots"
      >
        <defs>
          <filter id="chalk-rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" />
          </filter>
        </defs>
        <g filter="url(#chalk-rough)">
          {edges.map(([a, b], index) => {
            const isLit = lit.has(a) && lit.has(b);
            return (
              <line
                key={`${a}-${b}`}
                x1={byId[a].x}
                y1={byId[a].y}
                x2={byId[b].x}
                y2={byId[b].y}
                className={styles.edge}
                data-lit={isLit || undefined}
                data-dim={active ? !isLit || undefined : undefined}
                style={{ "--i": index } as CSSProperties}
              />
            );
          })}
        </g>
        <g filter="url(#chalk-rough)">
          {nodes.map((node, index) => {
            const state = active
              ? lit.has(node.id)
                ? "lit"
                : "dim"
              : undefined;
            return (
              <g
                key={node.id}
                className={styles.node}
                data-tone={node.tone}
                data-state={state}
                style={{ "--i": index } as CSSProperties}
                role="button"
                tabIndex={0}
                aria-label={`${node.label}: ${degree(node.id)} links`}
                onPointerEnter={() => setActive(node.id)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(node.id)}
                onBlur={() => setActive(null)}
              >
                <circle
                  className={styles.dot}
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                />
                {node.id === active && (
                  <circle
                    className={styles.ring}
                    cx={node.x}
                    cy={node.y}
                    r={node.r + 7}
                  />
                )}
              </g>
            );
          })}
        </g>
        <g className={styles.labels}>
          {nodes.map((node) => {
            const state = active
              ? lit.has(node.id)
                ? "lit"
                : "dim"
              : undefined;
            return (
              <text
                key={node.id}
                className={styles.label}
                data-tone={node.tone}
                data-state={state}
                x={node.anchor === "end" ? node.x - node.r - 7 : node.x + node.r + 7}
                y={node.y + 4}
                textAnchor={node.anchor ?? "start"}
                style={{ "--i": nodes.indexOf(node) } as CSSProperties}
              >
                {node.label}
              </text>
            );
          })}
        </g>
      </svg>
      <figcaption className={styles.caption} aria-live="polite">
        {current ? (
          <>
            <strong className={styles.captionTitle}>{current.label}</strong>{" "}
            has {neighbors.length} {neighbors.length === 1 ? "link" : "links"}:{" "}
            {neighbors.map((id) => byId[id].label).join(", ")}.
          </>
        ) : (
          <>Point at a dot to see where it leads.</>
        )}
      </figcaption>
    </figure>
  );
}
