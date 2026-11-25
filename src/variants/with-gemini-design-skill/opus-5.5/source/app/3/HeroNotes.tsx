"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type Tone = "paper" | "blue" | "red" | "yellow";
type Note = { id: string; title: string; body: string; tone: Tone; tilt: number };
type Pos = Record<string, { x: number; y: number }>;

const NOTES: Note[] = [
  { id: "a", title: "Feedback loops", body: "Thinking in Systems, p. 42. Delays make loops overshoot.", tone: "paper", tilt: -4 },
  { id: "b", title: "Why the garden floods", body: "The timer waters right after rain. Same delay problem?", tone: "blue", tilt: 3 },
  { id: "c", title: "Voice memo, 0:48", body: "Pitch: a thermostat that learns from its mistakes.", tone: "yellow", tilt: -2 },
  { id: "d", title: "Web clip", body: "How cities tune traffic lights to rush hour.", tone: "red", tilt: 5 },
];

const WIDE: Pos = {
  a: { x: 0.7, y: 0.22 },
  b: { x: 0.86, y: 0.28 },
  c: { x: 0.91, y: 0.62 },
  d: { x: 0.74, y: 0.5 },
};

const NARROW: Pos = {
  a: { x: 0.3, y: 0.24 },
  b: { x: 0.68, y: 0.33 },
  c: { x: 0.3, y: 0.74 },
  d: { x: 0.73, y: 0.68 },
};

const toneClass: Record<Tone, string> = {
  paper: styles.notePaper,
  blue: styles.noteBlue,
  red: styles.noteRed,
  yellow: styles.noteYellow,
};

export default function HeroNotes() {
  const stageRef = useRef<HTMLDivElement>(null);
  const noteRefs = useRef<Record<string, HTMLElement | null>>({});
  const drag = useRef<{ id: string; px: number; py: number; x: number; y: number } | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [pos, setPos] = useState<Pos>(WIDE);
  const [order, setOrder] = useState<string[]>(NOTES.map((n) => n.id));
  const [dragging, setDragging] = useState<string | null>(null);
  const layoutRef = useRef<"wide" | "narrow">("wide");

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
      const next = width < 700 ? "narrow" : "wide";
      if (next !== layoutRef.current) {
        layoutRef.current = next;
        setPos(next === "narrow" ? NARROW : WIDE);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const clamp = useCallback(
    (id: string, x: number, y: number) => {
      const el = noteRefs.current[id];
      if (!el || !size.w || !size.h) return { x, y };
      const hx = el.offsetWidth / 2 / size.w;
      const hy = el.offsetHeight / 2 / size.h;
      return {
        x: Math.min(1 - hx, Math.max(hx, x)),
        y: Math.min(1 - hy, Math.max(hy, y)),
      };
    },
    [size]
  );

  const toFront = (id: string) => setOrder((o) => [...o.filter((i) => i !== id), id]);

  const onPointerDown = (e: React.PointerEvent<HTMLElement>, id: string) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id, px: e.clientX, py: e.clientY, x: pos[id].x, y: pos[id].y };
    setDragging(id);
    toFront(id);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d || !size.w) return;
    const nx = d.x + (e.clientX - d.px) / size.w;
    const ny = d.y + (e.clientY - d.py) / size.h;
    setPos((p) => ({ ...p, [d.id]: clamp(d.id, nx, ny) }));
  };

  const endDrag = () => {
    drag.current = null;
    setDragging(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>, id: string) => {
    const step = 0.025;
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const m = delta[e.key];
    if (!m) return;
    e.preventDefault();
    toFront(id);
    setPos((p) => ({ ...p, [id]: clamp(id, p[id].x + m[0], p[id].y + m[1]) }));
  };

  const threshold = size.w < 700 ? 165 : 250;
  const links: { a: string; b: string; x1: number; y1: number; x2: number; y2: number }[] = [];
  if (size.w) {
    for (let i = 0; i < NOTES.length; i++) {
      for (let j = i + 1; j < NOTES.length; j++) {
        const A = pos[NOTES[i].id];
        const B = pos[NOTES[j].id];
        const x1 = A.x * size.w, y1 = A.y * size.h, x2 = B.x * size.w, y2 = B.y * size.h;
        if (Math.hypot(x2 - x1, y2 - y1) < threshold) {
          links.push({ a: NOTES[i].id, b: NOTES[j].id, x1, y1, x2, y2 });
        }
      }
    }
  }

  const linked = new Set(links.flatMap((l) => [l.a, l.b]));

  return (
    <div ref={stageRef} className={styles.heroStage}>
      <svg className={styles.heroLinks} width={size.w} height={size.h} aria-hidden="true">
        {links.map((l) => (
          <g key={`${l.a}-${l.b}`} className={styles.heroLink}>
            <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            <circle cx={(l.x1 + l.x2) / 2} cy={(l.y1 + l.y2) / 2} r={11} />
          </g>
        ))}
      </svg>
      <p className={styles.srOnly} aria-live="polite">
        {links.length === 0
          ? "No notes linked. Move two notes close together to link them."
          : `${links.length} ${links.length === 1 ? "link" : "links"} between notes.`}
      </p>
      {NOTES.map((n) => (
        <article
          key={n.id}
          ref={(el) => {
            noteRefs.current[n.id] = el;
          }}
          tabIndex={0}
          aria-label={`Note: ${n.title}. Drag, or use arrow keys, to move it near another note.`}
          className={[
            styles.heroNote,
            toneClass[n.tone],
            dragging === n.id ? styles.isDragging : "",
            linked.has(n.id) ? styles.isLinked : "",
          ].join(" ")}
          style={
            {
              left: `${pos[n.id].x * 100}%`,
              top: `${pos[n.id].y * 100}%`,
              zIndex: 2 + order.indexOf(n.id),
              "--tilt": `${n.tilt}deg`,
            } as React.CSSProperties
          }
          onPointerDown={(e) => onPointerDown(e, n.id)}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(e) => onKeyDown(e, n.id)}
        >
          <h3 className={styles.noteTitle}>{n.title}</h3>
          <p className={styles.noteBody}>{n.body}</p>
          <p className={styles.noteMeta}>
            {linked.has(n.id) ? "Linked" : "Drag me"}
          </p>
        </article>
      ))}
    </div>
  );
}
