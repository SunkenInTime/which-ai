"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

type Sticky = {
  id: string;
  text: string;
  color: string;
  rotate: number;
  x: number;
  y: number;
};

const initial: Sticky[] = [
  { id: "mom", text: "call mom (actually this time)", color: "bg-[color:#ffd23f]", rotate: -5, x: 0.05, y: 0.08 },
  { id: "idea", text: "idea: an app for ideas. wait. that's this.", color: "bg-[color:#ff8fb8]", rotate: 4, x: 0.5, y: 0.05 },
  { id: "read", text: "read: Building a Second Brain\n→ re-read ch. 4", color: "bg-[color:#6bc5ff]", rotate: -2, x: 0.08, y: 0.42 },
  { id: "shower", text: "why is my best idea always in the shower", color: "bg-[color:#7ee2a8]", rotate: 6, x: 0.5, y: 0.38 },
  { id: "sam", text: "the thing Sam said!!!\n→ [[pricing rant]]", color: "bg-[color:#c3a6ff]", rotate: -4, x: 0.27, y: 0.66 },
  { id: "milk", text: "oat milk. also the good pens.", color: "bg-[color:#ff9b42]", rotate: 3, x: 0.56, y: 0.72 },
];

const clamp = (n: number) => Math.max(-0.02, Math.min(0.86, n));

export function StickyDesk() {
  const deskRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; px: number; py: number; x: number; y: number } | null>(null);
  const [pos, setPos] = useState(() => Object.fromEntries(initial.map((s) => [s.id, { x: s.x, y: s.y }])));
  const [order, setOrder] = useState(() => initial.map((s) => s.id));
  const [active, setActive] = useState<string | null>(null);
  const [moved, setMoved] = useState(false);

  function raise(id: string) {
    setOrder((o) => [...o.filter((i) => i !== id), id]);
  }

  function onDown(e: PointerEvent<HTMLDivElement>, id: string) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id, px: e.clientX, py: e.clientY, x: pos[id].x, y: pos[id].y };
    setActive(id);
    raise(id);
  }

  function onMove(e: PointerEvent<HTMLDivElement>, id: string) {
    const d = drag.current;
    const desk = deskRef.current;
    if (!d || d.id !== id || !desk) return;
    const rect = desk.getBoundingClientRect();
    setPos((p) => ({
      ...p,
      [id]: { x: clamp(d.x + (e.clientX - d.px) / rect.width), y: clamp(d.y + (e.clientY - d.py) / rect.height) },
    }));
    setMoved(true);
  }

  function onUp() {
    drag.current = null;
    setActive(null);
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>, id: string) {
    const step = 0.03;
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const d = delta[e.key];
    if (!d) return;
    e.preventDefault();
    e.stopPropagation();
    raise(id);
    setPos((p) => ({ ...p, [id]: { x: clamp(p[id].x + d[0]), y: clamp(p[id].y + d[1]) } }));
    setMoved(true);
  }

  return (
    <div
      ref={deskRef}
      className="relative h-[440px] touch-manipulation overflow-hidden rounded-[2rem] border-4 border-black bg-white bg-[radial-gradient(rgba(0,0,0,0.18)_1.5px,transparent_1.5px)] bg-[size:22px_22px] shadow-[10px_10px_0_#000] sm:h-[520px]"
    >
      {initial.map((s) => {
        const isActive = active === s.id;
        return (
          <div
            key={s.id}
            role="group"
            tabIndex={0}
            aria-label={`Sticky note: ${s.text.replace(/\n/g, " ")}. Use arrow keys to move.`}
            onPointerDown={(e) => onDown(e, s.id)}
            onPointerMove={(e) => onMove(e, s.id)}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={(e) => onKey(e, s.id)}
            style={{
              left: `${pos[s.id].x * 100}%`,
              top: `${pos[s.id].y * 100}%`,
              zIndex: order.indexOf(s.id) + 1,
              transform: `rotate(${isActive ? 0 : s.rotate}deg) scale(${isActive ? 1.06 : 1})`,
            }}
            className={`absolute w-[9.5rem] touch-none border-[3px] border-black p-4 pt-6 text-[15px] leading-tight font-semibold whitespace-pre-line select-none sm:w-44 sm:text-base ${s.color} ${
              isActive ? "cursor-grabbing shadow-[10px_10px_0_#000]" : "cursor-grab shadow-[5px_5px_0_#000] transition-[transform,box-shadow] duration-150 hover:shadow-[7px_7px_0_#000]"
            } focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black`}
          >
            <span aria-hidden className="absolute -top-3 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-2 border-2 border-black/30 bg-white/70" />
            {s.text}
          </div>
        );
      })}

      <div
        aria-hidden
        className={`pointer-events-none absolute right-4 bottom-4 z-[100] flex items-center gap-2 rounded-full border-[3px] border-black bg-white px-4 py-2 font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-xs font-bold uppercase transition-opacity duration-500 ${moved ? "opacity-0" : "opacity-100"}`}
      >
        <span className="inline-block animate-bounce">☜</span> drag the notes
      </div>
    </div>
  );
}
