"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, ReactNode } from "react";
import s from "./pond.module.css";

/* Things a head is usually holding. They drift in on their own. */
const AMBIENT = [
  "call Mum back",
  "the bridge metaphor for chapter 3",
  "renew passport — March",
  "why did the launch slip?",
  "that line about attention",
  "tomatoes: deeper water",
  "ask Sam about the ferry story",
  "book: The Overstory",
  "idea — walking one-on-ones",
  "dentist. really, this time",
];

/* Where a thought may land, as % of the hero. The middle is kept clear. */
const WIDE: [number, number][] = [
  [14, 25],
  [84, 21],
  [10, 67],
  [89, 63],
  [23, 87],
  [78, 86],
  [31, 12],
  [68, 10],
  [7, 45],
  [93, 42],
];
const NARROW: [number, number][] = [
  [27, 11],
  [73, 14],
  [22, 92],
  [78, 93],
  [50, 8],
];
/* A visitor’s own thoughts land just below the field, where they can see them. */
const MINE_WIDE: [number, number][] = [
  [50, 83],
  [31, 81],
  [69, 82],
];
const MINE_NARROW: [number, number][] = [
  [50, 83],
  [28, 86],
  [72, 86],
];

type Drop = { id: number; x: number; y: number; text: string; mine: boolean };

/**
 * The hero. Thoughts fall into still water, ripple, and stay put.
 * Visitors can set down one of their own; nothing leaves the page.
 */
export function Pond({ children }: { children: ReactNode }) {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [value, setValue] = useState("");
  const [kept, setKept] = useState(0);
  const seq = useRef(0);
  const turn = useRef(0);
  const mineTurn = useRef(0);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 760px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fall = () => {
      const slots = narrow.matches ? NARROW : WIDE;
      const i = turn.current++;
      const [x, y] = slots[i % slots.length];
      const text = AMBIENT[i % AMBIENT.length];
      const id = ++seq.current;
      setDrops((d) => [...d.slice(narrow.matches ? -4 : -7), { id, x, y, text, mine: false }]);
    };

    if (still) {
      // No motion wanted: lay a few down once and leave them be.
      const t = window.setTimeout(() => {
        for (let k = 0; k < (narrow.matches ? 3 : 5); k++) fall();
      }, 0);
      return () => window.clearTimeout(t);
    }

    const first = window.setTimeout(fall, 700);
    const every = window.setInterval(() => {
      if (!document.hidden) fall();
    }, 3600);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(every);
    };
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = value.trim().slice(0, 64);
    if (!text) return;
    const narrow = window.matchMedia("(max-width: 760px)").matches;
    const slots = narrow ? MINE_NARROW : MINE_WIDE;
    const [x, y] = slots[mineTurn.current++ % slots.length];
    const id = ++seq.current;
    setDrops((d) => [...d.slice(-7), { id, x, y, text, mine: true }]);
    setKept((k) => k + 1);
    setValue("");
  };

  return (
    <>
      <div className={s.water} aria-hidden="true">
        {drops.map((d) => (
          <div
            key={d.id}
            className={s.drop}
            data-mine={d.mine || undefined}
            style={{ "--x": `${d.x}%`, "--y": `${d.y}%` } as CSSProperties}
          >
            <i className={s.ring} />
            <i className={s.ring} />
            <i className={s.ring} />
            <i className={s.pebble} />
            <span>{d.text}</span>
          </div>
        ))}
      </div>

      <div className={s.center}>
        {children}

        <form className={s.form} onSubmit={onSubmit}>
          <label htmlFor="thought" className={s.srOnly}>
            Something on your mind
          </label>
          <input
            id="thought"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="What’s on your mind?"
            autoComplete="off"
            maxLength={64}
            enterKeyHint="done"
          />
          <button type="submit">Set it down</button>
        </form>

        <p className={s.status} aria-live="polite">
          {kept === 0
            ? "Go on, try it. Nothing you type leaves this page."
            : kept === 1
              ? "Kept. You can stop holding that one."
              : `Kept. That’s ${kept} you’re no longer carrying.`}
        </p>
      </div>
    </>
  );
}
