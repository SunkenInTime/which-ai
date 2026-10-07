"use client";

import { useState, type KeyboardEvent } from "react";
import styles from "@/variants/with-design-skill/haiku-5-5/source/app/3/plan.module.css";

type Room = {
  id: string;
  name: string;
  use: string;
  summary: string;
  count: number;
  notes: string[];
  links: string[];
  x: number;
  y: number;
  w: number;
  h: number;
};

const ROOMS: Room[] = [
  {
    id: "attic",
    name: "Attic",
    use: "Archive",
    summary:
      "Notes you have not opened in a long time. They drift back down when they become useful again.",
    count: 212,
    notes: [
      "2019 job search checklist",
      "First sourdough log",
      "Conference notes, 2021",
    ],
    links: ["workshop"],
    x: 20,
    y: 20,
    w: 240,
    h: 180,
  },
  {
    id: "study",
    name: "Study",
    use: "Research",
    summary:
      "Research and reading notes, grouped by the question they answer rather than by source.",
    count: 38,
    notes: [
      "Spaced repetition, literature review",
      "Source list for the essay",
      "Interview questions, round two",
    ],
    links: ["kitchen", "reading"],
    x: 260,
    y: 20,
    w: 240,
    h: 180,
  },
  {
    id: "workshop",
    name: "Workshop",
    use: "Projects",
    summary:
      "Active projects. Each one keeps its status and the notes it depends on in the same place.",
    count: 17,
    notes: ["Launch plan, draft 4", "Hiring rubric", "Q4 roadmap sketch"],
    links: ["journal", "attic"],
    x: 500,
    y: 20,
    w: 240,
    h: 180,
  },
  {
    id: "hall",
    name: "Hallway",
    use: "Inbox",
    summary:
      "Everything arrives here first. File a note into a room now, or leave it to link later.",
    count: 9,
    notes: [
      "Clipped: the slow reading essay",
      "Voice memo: bread proofing times",
      "Thought: the index is the book",
    ],
    links: [],
    x: 20,
    y: 200,
    w: 720,
    h: 80,
  },
  {
    id: "kitchen",
    name: "Kitchen",
    use: "Recipes",
    summary:
      "Recipes and experiments, with the dates you tried them and what changed.",
    count: 64,
    notes: [
      "Sourdough, week three",
      "Dal without soaking",
      "Fermentation and microbes",
    ],
    links: ["study"],
    x: 20,
    y: 280,
    w: 240,
    h: 220,
  },
  {
    id: "reading",
    name: "Reading nook",
    use: "Books",
    summary:
      "Books in progress, with the passages you marked and why you marked them.",
    count: 41,
    notes: ["Solaris, chapter 3", "Why some books stay with you"],
    links: ["study"],
    x: 260,
    y: 280,
    w: 240,
    h: 220,
  },
  {
    id: "journal",
    name: "Journal",
    use: "Daily",
    summary: "Daily notes and weekly reviews, kept in the order you wrote them.",
    count: 310,
    notes: ["Tuesday: walked the long way home", "Week 41 review"],
    links: ["workshop"],
    x: 500,
    y: 280,
    w: 240,
    h: 220,
  },
];

// Doorways sit on the hallway's two walls, centred on each room
const DOORS = [
  { x: 120, y: 200, swing: "up" },
  { x: 360, y: 200, swing: "up" },
  { x: 600, y: 200, swing: "up" },
  { x: 120, y: 280, swing: "down" },
  { x: 360, y: 280, swing: "down" },
  { x: 600, y: 280, swing: "down" },
] as const;

function centre(room: Room) {
  return { x: room.x + room.w / 2, y: room.y + room.h / 2 };
}

export function FloorPlan() {
  const [selectedId, setSelectedId] = useState("hall");
  const selected = ROOMS.find((room) => room.id === selectedId) ?? ROOMS[3];
  const linked = ROOMS.filter((room) => selected.links.includes(room.id));
  const from = centre(selected);

  function handleKey(event: KeyboardEvent<SVGGElement>, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedId(id);
    }
  }

  return (
    <div className={styles.plan}>
      <svg
        viewBox="0 0 760 520"
        role="group"
        aria-label="Floor plan of your notes. Select a room to see what is inside."
        className={styles.svg}
      >
        {ROOMS.map((room) => {
          const active = room.id === selectedId;
          const c = centre(room);

          return (
            <g
              key={room.id}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              aria-label={`${room.name}, ${room.count} notes`}
              className={styles.room}
              onClick={() => setSelectedId(room.id)}
              onKeyDown={(event) => handleKey(event, room.id)}
            >
              <rect
                className={`${styles.roomShape} ${room.id === "hall" ? styles.hallShape : ""} ${active ? styles.roomActive : ""}`}
                x={room.x}
                y={room.y}
                width={room.w}
                height={room.h}
              />
              <text
                className={styles.roomName}
                x={c.x}
                y={room.id === "hall" ? c.y - 4 : c.y - 6}
                textAnchor="middle"
              >
                {room.name}
              </text>
              <text
                className={styles.roomCount}
                x={c.x}
                y={room.id === "hall" ? c.y + 18 : c.y + 16}
                textAnchor="middle"
              >
                {room.count} notes
              </text>
            </g>
          );
        })}

        {DOORS.map((door) => {
          const sweep = door.swing === "up" ? "0" : "1";
          const endY = door.swing === "up" ? door.y - 28 : door.y + 28;
          return (
            <g key={`${door.x}-${door.y}`} className={styles.door} aria-hidden="true">
              <rect x={door.x} y={door.y - 3} width={28} height={6} />
              <path d={`M ${door.x + 28} ${door.y} A 28 28 0 0 ${sweep} ${door.x} ${endY}`} />
            </g>
          );
        })}

        <rect
          className={styles.outerWall}
          x={20}
          y={20}
          width={720}
          height={480}
          aria-hidden="true"
        />

        {linked.map((room) => {
          const to = centre(room);
          return (
            <line
              key={room.id}
              className={styles.corridor}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              aria-hidden="true"
            />
          );
        })}
      </svg>

      <div className={styles.panel} aria-live="polite">
        <h3 className={styles.panelTitle}>{selected.name}</h3>
        <p className={styles.panelSummary}>{selected.summary}</p>
        <ul className={styles.noteList}>
          {selected.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className={styles.panelLinks}>
          {linked.length > 0
            ? `Linked to ${linked.map((room) => room.name).join(" and ")}, through the dashed corridors.`
            : "Not linked to other rooms yet. It will be once you file it."}
        </p>
      </div>
    </div>
  );
}
