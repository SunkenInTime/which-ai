"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "./use-reduced-motion-safe";
import { FileText, MagnifyingGlass } from "@phosphor-icons/react";

const QUESTIONS = [
  {
    q: "What have I written about slow reading?",
    a: "You keep returning to reading fewer books, more closely. In January you set a goal of one long novel a month, and your notes on The Overstory say the slow pace is the point.",
    cites: ["Reading goals 2026", "The Overstory"],
  },
  {
    q: "Which books connect to systems thinking?",
    a: "Three notes link to Thinking in Systems: The Overstory, Finding the Mother Tree, and your notes on city water networks. All three describe feedback loops.",
    cites: ["Thinking in Systems", "Finding the Mother Tree", "City water networks"],
  },
  {
    q: "When did I first write about fungal networks?",
    a: "Your first note on mycorrhizal networks is a podcast clip you saved in March 2025. You linked it to Finding the Mother Tree two weeks later.",
    cites: ["Podcast clips, March 2025", "Mycorrhizal networks"],
  },
];

export function AskNotes() {
  const reduce = useReducedMotionSafe();
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function ask(i: number) {
    if (timer.current) clearTimeout(timer.current);
    setActive(i);
    if (reduce) {
      setLoading(false);
      return;
    }
    setLoading(true);
    timer.current = setTimeout(() => setLoading(false), 700);
  }

  const current = QUESTIONS[active];

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Sample questions">
        {QUESTIONS.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.q}
              type="button"
              aria-pressed={selected}
              onClick={() => ask(i)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-left text-[13px] font-medium transition-[background-color,border-color,transform] duration-200 active:scale-[0.98] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--k-accent) ${
                selected
                  ? "border-(--k-fg) bg-(--k-fg) text-(--k-bg)"
                  : "border-(--k-line-strong) bg-(--k-surface) text-(--k-fg) hover:border-(--k-fg-3)"
              }`}
            >
              <MagnifyingGlass size={14} weight="bold" className="shrink-0" />
              {item.q}
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        aria-busy={loading}
        className="flex min-h-64 flex-1 flex-col rounded-[12px] border border-(--k-line) bg-(--k-surface) p-5 sm:p-6"
      >
        <p className="text-[13px] text-(--k-fg-3)">{current.q}</p>
        <AnimatePresence mode="wait" initial={false}>
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="mt-4 flex flex-1 flex-col gap-2.5"
              aria-label="Searching your notes"
            >
              {["w-full", "w-[92%]", "w-[64%]"].map((w) => (
                <div key={w} className={`h-3.5 animate-pulse rounded-full bg-(--k-surface-2) ${w}`} />
              ))}
              <div className="mt-auto flex gap-2 pt-5">
                <div className="h-7 w-32 animate-pulse rounded-full bg-(--k-surface-2)" />
                <div className="h-7 w-24 animate-pulse rounded-full bg-(--k-surface-2)" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-1 flex-col"
            >
              <p className="mt-3 max-w-[60ch] text-[17px] leading-relaxed tracking-[-0.01em] text-(--k-fg)">
                {current.a}
              </p>
              <div className="mt-auto pt-6">
              <p className="border-t border-(--k-line) pt-4 text-[12px] text-(--k-fg-3)">
                Answered from {current.cites.length} of your notes
              </p>
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Cited notes">
                {current.cites.map((c, i) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full bg-(--k-accent-soft) py-1 pl-1.5 pr-3 text-[13px] font-medium text-(--k-accent-ink)"
                  >
                    <span className="grid size-5 place-items-center rounded-full bg-(--k-accent) font-mono text-[11px] text-(--k-on-accent)">
                      {i + 1}
                    </span>
                    <FileText size={13} aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
