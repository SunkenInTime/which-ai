"use client";

import { useState } from "react";
import styles from "./styles.module.css";

type LineId = "sleep" | "memory" | "writing" | "stoicism";

const lines: Record<LineId, { name: string; color: string; points: [number, number][] }> = {
  sleep: {
    name: "Sleep",
    color: "#E1251B",
    points: [[60, 160], [340, 160], [540, 360], [1140, 360]],
  },
  memory: {
    name: "Memory",
    color: "#0A6CB5",
    points: [[640, 70], [640, 560]],
  },
  writing: {
    name: "Writing",
    color: "#009B48",
    points: [[60, 240], [1160, 240]],
  },
  stoicism: {
    name: "Stoicism",
    color: "#F4A300",
    points: [[760, 600], [1000, 360], [1120, 240], [1120, 70]],
  },
};

type Station = {
  id: string;
  x: number;
  y: number;
  title: string;
  note: string;
  lines: LineId[];
  label: { dx: number; dy: number; anchor: "start" | "middle" | "end" };
};

const stations: Station[] = [
  { id: "caffeine", x: 140, y: 160, title: "Caffeine lasts 5 hours", note: "A 4pm coffee is still half there at 9pm. Cut-off moved to noon.", lines: ["sleep"], label: { dx: 0, dy: -20, anchor: "middle" } },
  { id: "naps", x: 260, y: 160, title: "Naps under 20 minutes", note: "Longer and you wake from deep sleep feeling worse. Set a timer for 18.", lines: ["sleep"], label: { dx: 0, dy: 32, anchor: "middle" } },
  { id: "halfasleep", x: 420, y: 240, title: "Ideas arrive half-asleep", note: "Edison napped holding steel balls so he'd wake at the edge of sleep. Keep a notebook by the bed.", lines: ["sleep", "writing"], label: { dx: 16, dy: -16, anchor: "start" } },
  { id: "pages", x: 200, y: 240, title: "Morning pages", note: "Three pages, longhand, before anything else. Most of it is noise; that's the point.", lines: ["writing"], label: { dx: 0, dy: -18, anchor: "middle" } },
  { id: "question", x: 640, y: 240, title: "Write the question, not the answer", note: "A note that asks something gets reopened. One that answers gets filed and forgotten.", lines: ["memory", "writing"], label: { dx: 16, dy: -16, anchor: "start" } },
  { id: "filing", x: 640, y: 360, title: "Sleep does the filing", note: "Deep sleep replays the day and moves it into long-term memory. Why an idea is clearer the next morning.", lines: ["sleep", "memory"], label: { dx: 16, dy: 30, anchor: "start" } },
  { id: "curve", x: 640, y: 140, title: "The forgetting curve", note: "Ebbinghaus, 1885: without review, half of new material is gone in a day.", lines: ["memory"], label: { dx: 16, dy: 5, anchor: "start" } },
  { id: "spacing", x: 640, y: 480, title: "Spacing beats rereading", note: "Review just before you'd forget. Five spaced reviews beat twenty in a row.", lines: ["memory"], label: { dx: -16, dy: 5, anchor: "end" } },
  { id: "cold", x: 820, y: 360, title: "Keep the bedroom cold", note: "Around 18°C. Core temperature has to drop for sleep to start.", lines: ["sleep"], label: { dx: 0, dy: -18, anchor: "middle" } },
  { id: "drafts", x: 940, y: 240, title: "Drafts rot in folders", note: "Anything unpublished for a month never ships. Link it to something live or delete it.", lines: ["writing"], label: { dx: 0, dy: 32, anchor: "middle" } },
  { id: "evening", x: 1000, y: 360, title: "The evening review", note: "Seneca asked himself three questions each night. Also the best time to jot tomorrow's first task.", lines: ["sleep", "stoicism"], label: { dx: 16, dy: 32, anchor: "start" } },
  { id: "seneca", x: 1120, y: 240, title: "Seneca's letters were notes", note: "124 letters, each one idea, each linking back to others. A commonplace book in disguise.", lines: ["writing", "stoicism"], label: { dx: -16, dy: -16, anchor: "end" } },
  { id: "mori", x: 880, y: 480, title: "Memento mori, weekly", note: "Not morbid, practical: what would I stop doing if this were my last year?", lines: ["stoicism"], label: { dx: 16, dy: 5, anchor: "start" } },
  { id: "discomfort", x: 1120, y: 140, title: "Practise being uncomfortable", note: "Cold showers, a day of plain food. Makes the fear smaller than the thing.", lines: ["stoicism"], label: { dx: -16, dy: 5, anchor: "end" } },
];

const lineIds = Object.keys(lines) as LineId[];

export default function NoteMap() {
  const [activeStation, setActiveStation] = useState("filing");
  const [activeLine, setActiveLine] = useState<LineId | null>(null);
  const station = stations.find((s) => s.id === activeStation)!;

  const dimLine = (id: LineId) => activeLine !== null && activeLine !== id;
  const dimStation = (s: Station) => activeLine !== null && !s.lines.includes(activeLine);

  return (
    <div className={styles.mapArea}>
      <div className={styles.legend}>
        <p className={styles.legendTitle}>Topics</p>
        <ul>
          {lineIds.map((id) => {
            const count = stations.filter((s) => s.lines.includes(id)).length;
            return (
              <li key={id}>
                <button
                  className={styles.legendBtn}
                  aria-pressed={activeLine === id}
                  onClick={() => setActiveLine(activeLine === id ? null : id)}
                >
                  <span className={styles.swatch} style={{ background: lines[id].color }} />
                  {lines[id].name}
                  <span className={styles.count}>{count} notes</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className={styles.sign} aria-live="polite">
          <p className={styles.signTitle}>{station.title}</p>
          <p className={styles.signNote}>{station.note}</p>
          <p className={styles.signLines}>
            {station.lines.map((id) => (
              <span key={id}>
                <span className={styles.swatch} style={{ background: lines[id].color }} />
                {lines[id].name}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className={styles.mapScroll}>
        <div className={styles.mapInner}>
          <svg viewBox="0 0 1200 620" className={styles.map} role="group" aria-label="Map of notes by topic">
            {lineIds.map((id) => (
              <polyline
                key={id}
                points={lines[id].points.map((p) => p.join(",")).join(" ")}
                fill="none"
                stroke={lines[id].color}
                strokeWidth={10}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.line}
                opacity={dimLine(id) ? 0.12 : 1}
              />
            ))}
            {stations.map((s) => {
              const interchange = s.lines.length > 1;
              const active = s.id === activeStation;
              return (
                <g
                  key={s.id}
                  tabIndex={0}
                  role="button"
                  aria-label={s.title}
                  aria-pressed={active}
                  className={styles.station}
                  opacity={dimStation(s) ? 0.2 : 1}
                  onMouseEnter={() => setActiveStation(s.id)}
                  onFocus={() => setActiveStation(s.id)}
                  onClick={() => setActiveStation(s.id)}
                >
                  <circle cx={s.x} cy={s.y} r={22} fill="transparent" />
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={interchange ? 11 : 7}
                    fill="#fff"
                    stroke={interchange ? "#000" : lines[s.lines[0]].color}
                    strokeWidth={4}
                    className={active ? styles.stationActive : undefined}
                  />
                  <text
                    x={s.x + s.label.dx}
                    y={s.y + s.label.dy}
                    textAnchor={s.label.anchor}
                    className={`${styles.label} ${interchange ? styles.labelBold : ""}`}
                  >
                    {s.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
