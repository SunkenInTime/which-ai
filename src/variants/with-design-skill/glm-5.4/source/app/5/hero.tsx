"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import styles from "./split.module.css";

const MIN = 12;
const MAX = 88;
const STEP = 2;

const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));

export default function SplitHero({ children }: { children: ReactNode }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const root = useRef<HTMLElement>(null);

  const moveTo = (clientX: number) => {
    const rect = root.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(clamp(Math.round(((clientX - rect.left) / rect.width) * 100)));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    moveTo(event.clientX);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging) moveTo(event.clientX);
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const delta: Record<string, number> = { ArrowLeft: -STEP, ArrowRight: STEP };
    if (event.key in delta) {
      event.preventDefault();
      setPos((value) => clamp(value + delta[event.key]));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPos(MIN);
    } else if (event.key === "End") {
      event.preventDefault();
      setPos(MAX);
    }
  };

  return (
    <section
      ref={root}
      className={styles.hero}
      data-dragging={dragging || undefined}
      style={{ "--split": `${pos}%` } as CSSProperties}
    >
      <div className={styles.dark} aria-hidden="true" />
      <div className={styles.blend}>{children}</div>
      <div
        className={styles.handle}
        role="separator"
        aria-orientation="vertical"
        aria-label="Drag to compare your first brain with your second brain"
        aria-valuenow={pos}
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <span className={styles.grip} aria-hidden="true">
          <svg viewBox="0 0 28 16" width="28" height="16">
            <path
              d="M11 2 5 8l6 6"
              fill="none"
              stroke="#000000"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m17 2 6 6-6 6"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </section>
  );
}
