"use client";

import { useState } from "react";
import s from "./page.module.css";

type LineId = "work" | "cities" | "memory" | "kitchen";

type Station = {
  id: string;
  name: string;
  x: number;
  y: number;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
  date: string;
  text: string;
};

const LINES: { id: LineId; name: string; d: string; stops: string[] }[] = [
  {
    id: "work",
    name: "Work",
    d: "M60 340H420L500 260H960",
    stops: ["onboarding", "bulk", "desire", "cowpaths", "spacing", "mise"],
  },
  {
    id: "cities",
    name: "Cities",
    d: "M300 60V420L380 500H960",
    stops: ["buildings", "pace", "desire", "legibility", "loci", "chesterton"],
  },
  {
    id: "memory",
    name: "Memory",
    d: "M440 100H560L600 140V560L560 600H440",
    stops: ["forgetting", "generation", "spacing", "sleep", "loci", "zeigarnik"],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    d: "M760 120V380L800 420H960",
    stops: ["sourdough", "mise", "drybrine"],
  },
];

const STATIONS: Station[] = [
  {
    id: "onboarding",
    name: "Onboarding review",
    x: 60,
    y: 340,
    lx: 60,
    ly: 370,
    anchor: "start",
    date: "today",
    text: "The onboarding emails all land on day one, and nobody opens the fourth.",
  },
  {
    id: "bulk",
    name: "Bulk edit proposal",
    x: 180,
    y: 340,
    lx: 180,
    ly: 318,
    anchor: "middle",
    date: "3 Nov 2026",
    text: "People export to a spreadsheet, fix forty rows and import them again. Build the thing they are faking.",
  },
  {
    id: "desire",
    name: "Desire paths",
    x: 300,
    y: 340,
    lx: 328,
    ly: 316,
    anchor: "start",
    date: "14 Mar 2024",
    text: "People wear the route they want into the grass. Pave those.",
  },
  {
    id: "cowpaths",
    name: "Pave the cowpaths",
    x: 400,
    y: 340,
    lx: 400,
    ly: 370,
    anchor: "middle",
    date: "2 Feb 2026",
    text: "Watch what users already do, then make that the official way.",
  },
  {
    id: "spacing",
    name: "Spacing effect",
    x: 600,
    y: 260,
    lx: 622,
    ly: 240,
    anchor: "start",
    date: "2 Sep 2023",
    text: "Review just before you would forget, and the curve flattens.",
  },
  {
    id: "mise",
    name: "Mise en place",
    x: 760,
    y: 260,
    lx: 782,
    ly: 240,
    anchor: "start",
    date: "19 May 2025",
    text: "Everything measured and within reach before the heat goes on. Works for meetings too.",
  },
  {
    id: "buildings",
    name: "How Buildings Learn",
    x: 300,
    y: 60,
    lx: 280,
    ly: 65,
    anchor: "end",
    date: "30 Aug 2022",
    text: "Stewart Brand. The buildings that last are the ones cheap enough to change.",
  },
  {
    id: "pace",
    name: "Pace layers",
    x: 300,
    y: 180,
    lx: 320,
    ly: 185,
    anchor: "start",
    date: "30 Aug 2022",
    text: "Fast layers learn. Slow layers remember.",
  },
  {
    id: "legibility",
    name: "Legibility",
    x: 460,
    y: 500,
    lx: 460,
    ly: 478,
    anchor: "middle",
    date: "8 Jan 2025",
    text: "A plan that looks tidy from above often erases what made the place work.",
  },
  {
    id: "loci",
    name: "Method of loci",
    x: 600,
    y: 500,
    lx: 622,
    ly: 530,
    anchor: "start",
    date: "11 Oct 2023",
    text: "Put what you need to remember in rooms you already know.",
  },
  {
    id: "chesterton",
    name: "Chesterton’s fence",
    x: 760,
    y: 500,
    lx: 760,
    ly: 478,
    anchor: "middle",
    date: "21 Jun 2024",
    text: "Do not take a fence down until you know why it was put up.",
  },
  {
    id: "forgetting",
    name: "Forgetting curve",
    x: 440,
    y: 100,
    lx: 436,
    ly: 78,
    anchor: "start",
    date: "2 Sep 2023",
    text: "Ebbinghaus, 1885. Without review, most of a new thing is gone in days.",
  },
  {
    id: "generation",
    name: "Generation effect",
    x: 520,
    y: 100,
    lx: 530,
    ly: 130,
    anchor: "end",
    date: "9 Sep 2023",
    text: "You remember what you put in your own words.",
  },
  {
    id: "sleep",
    name: "Sleep and recall",
    x: 600,
    y: 380,
    lx: 580,
    ly: 385,
    anchor: "end",
    date: "4 Dec 2023",
    text: "Sleep after learning protects it. An all-nighter does the opposite.",
  },
  {
    id: "zeigarnik",
    name: "Zeigarnik effect",
    x: 440,
    y: 600,
    lx: 420,
    ly: 605,
    anchor: "end",
    date: "17 Feb 2024",
    text: "Unfinished things stay loud. Write them down and they quieten.",
  },
  {
    id: "sourdough",
    name: "Sourdough, 78%",
    x: 760,
    y: 120,
    lx: 740,
    ly: 125,
    anchor: "end",
    date: "6 Apr 2025",
    text: "Fold every half hour for two hours. The dough holds its shape after the third fold.",
  },
  {
    id: "drybrine",
    name: "Dry brine",
    x: 760,
    y: 350,
    lx: 780,
    ly: 355,
    anchor: "start",
    date: "23 Nov 2025",
    text: "Salt the day before and leave it uncovered in the fridge. Crisp skin, wet meat.",
  },
];

const byId = Object.fromEntries(STATIONS.map((st) => [st.id, st]));
const linesAt = (id: string) => LINES.filter((l) => l.stops.includes(id));

function listNames(names: string[]) {
  if (names.length < 2) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export function Network() {
  const [here, setHere] = useState("desire");
  const [hovered, setHovered] = useState<LineId | null>(null);
  const [pinned, setPinned] = useState<LineId | null>(null);
  const active = hovered ?? pinned;

  const station = byId[here];
  const stationLines = linesAt(here);
  const nextStops: { id: string; line: LineId }[] = [];
  for (const l of stationLines) {
    const i = l.stops.indexOf(here);
    for (const id of [l.stops[i - 1], l.stops[i + 1]]) {
      if (id && !nextStops.some((n) => n.id === id)) nextStops.push({ id, line: l.id });
    }
  }

  return (
    <>
      <div className={s.mapArea}>
        <div className={s.mapScroll}>
          <svg
            className={s.map}
            viewBox="0 20 880 620"
            role="group"
            aria-label="Map of seventeen notes on four lines. Choose a note to read it."
          >
            {LINES.map((l, i) => (
              <path
                key={l.id}
                className={s.line}
                data-line={l.id}
                data-dim={active !== null && active !== l.id ? "" : undefined}
                d={l.d}
                pathLength={1}
                style={{ animationDelay: `${0.15 + i * 0.22}s` }}
              />
            ))}

            <circle
              className={s.ring}
              r={21}
              style={{ transform: `translate(${station.x}px, ${station.y}px)` }}
            />

            {STATIONS.map((st, i) => {
              const on = linesAt(st.id);
              const dim = active !== null && !on.some((l) => l.id === active);
              return (
                <g
                  key={st.id}
                  className={s.station}
                  data-dim={dim ? "" : undefined}
                  data-here={st.id === here ? "" : undefined}
                  role="button"
                  tabIndex={0}
                  aria-pressed={st.id === here}
                  aria-label={`${st.name}, ${listNames(on.map((l) => l.name))} line${on.length > 1 ? "s" : ""}`}
                  style={{ animationDelay: `${0.9 + i * 0.03}s` }}
                  onClick={() => setHere(st.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setHere(st.id);
                    }
                  }}
                >
                  <circle className={s.hit} cx={st.x} cy={st.y} r={22} />
                  <circle
                    className={s.dot}
                    cx={st.x}
                    cy={st.y}
                    r={on.length > 1 ? 11 : 6.5}
                    strokeWidth={on.length > 1 ? 4.5 : 3.5}
                  />
                  <text className={s.stationName} x={st.lx} y={st.ly} textAnchor={st.anchor}>
                    {st.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className={s.legend}>
          {LINES.map((l) => (
            <button
              key={l.id}
              type="button"
              className={s.legendItem}
              data-line={l.id}
              aria-pressed={pinned === l.id}
              onMouseEnter={() => setHovered(l.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(l.id)}
              onBlur={() => setHovered(null)}
              onClick={() => setPinned(pinned === l.id ? null : l.id)}
            >
              <span className={s.legendBar} />
              {l.name} line
            </button>
          ))}
          <p className={s.mapHint}>Drag the map sideways to see all of it.</p>
        </div>
      </div>

      <aside className={s.sign} aria-live="polite" aria-label="Selected note">
        <p className={s.signHere}>You are at</p>
        <h2 className={s.signName}>
          <span className={s.bullets}>
            {stationLines.map((l) => (
              <span key={l.id} className={s.bullet} data-line={l.id} />
            ))}
          </span>
          {station.name}
        </h2>
        <p className={s.signText}>{station.text}</p>
        <p className={s.signMeta}>
          Written {station.date}. On the {listNames(stationLines.map((l) => l.name))} line
          {stationLines.length > 1 ? "s" : ""}.
        </p>
        <div className={s.next}>
          <p className={s.nextLabel}>Next stops</p>
          <ul className={s.nextList}>
            {nextStops.map((n) => (
              <li key={n.id}>
                <button type="button" className={s.nextStop} onClick={() => setHere(n.id)}>
                  <span className={s.bullet} data-line={n.line} />
                  {byId[n.id].name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
