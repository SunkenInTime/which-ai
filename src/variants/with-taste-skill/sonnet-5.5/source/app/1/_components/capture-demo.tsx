"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LinkSimple } from "@phosphor-icons/react";

type Note = { title: string; keys: string[] };

const LIBRARY: Note[] = [
  { title: "Spaced repetition beats rereading", keys: ["memory", "learning", "review", "study", "forget"] },
  { title: "Interview with Marta on onboarding", keys: ["onboarding", "users", "interview", "research", "email"] },
  { title: "Why the Zettelkasten works", keys: ["notes", "links", "ideas", "writing", "connect"] },
  { title: "Reading list on attention and focus", keys: ["focus", "attention", "reading", "distraction"] },
  { title: "Draft: spring launch email", keys: ["email", "launch", "writing", "marketing", "subject"] },
  { title: "Notes from the pricing workshop", keys: ["pricing", "users", "marketing", "plans"] },
  { title: "Kitchen renovation quotes", keys: ["home", "budget", "contractor", "quotes"] },
];

const INITIAL =
  "Idea for the onboarding email: people forget what they read, so add a short review at the end.";

function neighbors(text: string) {
  const words = Array.from(
    new Set(
      text
        .toLowerCase()
        .split(/[^a-z]+/)
        .filter((w) => w.length > 3),
    ),
  );
  return LIBRARY.map((note) => {
    const hits = words.filter((w) =>
      note.keys.some((k) => k === w || (w.length > 4 && k.startsWith(w.slice(0, 5)))),
    );
    return { note, hits };
  })
    .filter((r) => r.hits.length > 0)
    .sort((a, b) => b.hits.length - a.hits.length)
    .slice(0, 3);
}

export function CaptureDemo() {
  const [text, setText] = useState(INITIAL);
  const reduce = useReducedMotion();
  const id = useId();
  const results = useMemo(() => neighbors(text), [text]);

  return (
    <div className="rounded-[14px] border border-(--c-line) bg-(--c-surface) p-4 shadow-(--c-shadow) sm:p-6">
      <label htmlFor={id} className="text-[14px] font-medium">
        New note
      </label>
      <textarea
        id={id}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="grain-grid mt-2 block w-full resize-none rounded-[10px] border border-(--c-line) bg-(--c-bg) px-4 py-[5px] text-[16px] leading-[28px] text-(--c-fg) outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-(--c-accent)"
      />
      <p className="mt-2 text-[13px] text-(--c-fg-3)">
        Cairn compares what you type with your other notes as you go.
      </p>

      <h3 className="mt-6 text-[15px] font-semibold">Related notes</h3>
      <ul className="mt-3 grid min-h-[228px] grid-cols-[minmax(0,1fr)] content-start gap-2" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {results.map(({ note, hits }) => (
            <motion.li
              key={note.title}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="flex items-center justify-between gap-4 rounded-[10px] border border-(--c-line) bg-(--c-surface-2) px-4 py-3"
            >
              <span className="flex min-w-0 items-center gap-3 text-[15px]">
                <LinkSimple size={16} weight="bold" className="shrink-0 text-(--c-accent-ink)" />
                <span className="truncate">{note.title}</span>
              </span>
              <span className="shrink-0 text-[13px] text-(--c-fg-3)">{hits.slice(0, 2).join(", ")}</span>
            </motion.li>
          ))}
        </AnimatePresence>
        {results.length === 0 && (
          <li className="rounded-[10px] border border-dashed border-(--c-line) px-4 py-6 text-[15px] text-(--c-fg-2)">
            No neighbors yet. Try words like writing, pricing or focus.
          </li>
        )}
      </ul>
    </div>
  );
}
