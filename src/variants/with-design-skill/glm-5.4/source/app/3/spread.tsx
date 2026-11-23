"use client";

import { useLayoutEffect, useRef, useState } from "react";
import styles from "./book.module.css";

type Mark = {
  key: string;
  tone: "yellow" | "pink" | "green";
  text: string;
  note: string;
  meta: string;
};

const marks: Mark[] = [
  {
    key: "q",
    tone: "yellow",
    text: "a good memory is mostly a good index",
    note: "The sentence I keep forgetting. It is the whole argument in ten words.",
    meta: "Linked from 14 notes",
  },
  {
    key: "p",
    tone: "pink",
    text: "years later",
    note: "How many years, for me? Three so far. Look for the second pass in my own margins.",
    meta: "Open question",
  },
  {
    key: "g",
    tone: "green",
    text: "a reliable way back to them",
    note: "Backlinks are the way back. Build the index while reading, not after.",
    meta: "Your idea, from today",
  },
];

const passage: Array<string | { mark: Mark }> = [
  "Anyone who reads seriously reads twice. The first pass is for the story; the second, ",
  { mark: marks[1] },
  ", is for the sentences that survived. What we call ",
  { mark: marks[0] },
  ": not the words themselves but ",
  { mark: marks[2] },
  ". The margin is where that index begins.",
];

export default function Spread() {
  const [active, setActive] = useState<string | null>(null);
  const [paths, setPaths] = useState<Record<string, string>>({});
  const root = useRef<HTMLDivElement>(null);
  const markRefs = useRef<Record<string, HTMLElement | null>>({});
  const noteRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useLayoutEffect(() => {
    const draw = () => {
      const box = root.current?.getBoundingClientRect();
      if (!box) return;
      if (window.matchMedia("(max-width: 900px)").matches) {
        setPaths({});
        return;
      }
      const next: Record<string, string> = {};
      for (const mark of marks) {
        const m = markRefs.current[mark.key]?.getBoundingClientRect();
        const n = noteRefs.current[mark.key]?.getBoundingClientRect();
        if (!m || !n) continue;
        const x1 = m.right - box.left + 6;
        const y1 = m.top - box.top + m.height / 2;
        const x2 = n.left - box.left - 14;
        const y2 = n.top - box.top + 18;
        const bend = (x2 - x1) * 0.55;
        next[mark.key] = `M${x1} ${y1} C${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
      }
      setPaths(next);
    };
    draw();
    const observer = new ResizeObserver(draw);
    if (root.current) observer.observe(root.current);
    window.addEventListener("resize", draw);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, []);

  return (
    <div
      ref={root}
      className={styles.spread}
      data-active={active ?? undefined}
      onPointerLeave={() => setActive(null)}
    >
      <div className={styles.passage}>
        <p className={styles.passageText}>
          {passage.map((part) =>
            typeof part === "string" ? (
              part
            ) : (
              <mark
                key={part.mark.key}
                ref={(element) => {
                  markRefs.current[part.mark.key] = element;
                }}
                className={styles.mark}
                data-tone={part.mark.tone}
                data-key={part.mark.key}
                data-active={active === part.mark.key || undefined}
                tabIndex={0}
                onPointerEnter={() => setActive(part.mark.key)}
                onFocus={() => setActive(part.mark.key)}
                onBlur={() => setActive(null)}
              >
                {part.mark.text}
              </mark>
            ),
          )}
        </p>
        <p className={styles.source}>On Reading Twice, chapter 3</p>
      </div>

      <aside className={styles.margin} aria-label="Margin notes">
        {marks.map((mark) => (
          <div
            key={mark.key}
            ref={(element) => {
              noteRefs.current[mark.key] = element;
            }}
            className={styles.note}
            data-tone={mark.tone}
            data-key={mark.key}
            data-active={active === mark.key || undefined}
            tabIndex={0}
            onPointerEnter={() => setActive(mark.key)}
            onFocus={() => setActive(mark.key)}
            onBlur={() => setActive(null)}
          >
            <p className={styles.noteText}>{mark.note}</p>
            <p className={styles.noteMeta}>{mark.meta}</p>
          </div>
        ))}
      </aside>

      <svg className={styles.links} aria-hidden="true">
        {Object.entries(paths).map(([key, d]) => (
          <path
            key={key}
            d={d}
            className={styles.link}
            data-key={key}
            data-active={active === key || undefined}
          />
        ))}
      </svg>
    </div>
  );
}
