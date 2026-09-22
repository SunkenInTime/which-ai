"use client";

import { useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  BookOpenText,
  Check,
  Globe,
  Microphone,
  NotePencil,
  Plus,
} from "@phosphor-icons/react";
import { SPRING } from "./reveal";

type Source = "note" | "highlight" | "clip" | "voice";

type Related = {
  id: string;
  title: string;
  when: string;
  source: Source;
  reason: string;
};

type Draft = {
  id: string;
  tab: string;
  title: string;
  body: string;
  related: Related[];
};

const DRAFTS: Draft[] = [
  {
    id: "sourdough",
    tab: "Sourdough",
    title: "Sourdough, attempt four",
    body: "The crumb was tighter again. I think the kitchen was too cold overnight, so the starter never really peaked before I mixed the dough.",
    related: [
      {
        id: "starter",
        title: "Starter feeding schedule",
        when: "March 2025",
        source: "note",
        reason: "You wrote that a cold kitchen slowed the rise.",
      },
      {
        id: "tartine",
        title: "Tartine Bread, chapter 2",
        when: "November 2024",
        source: "highlight",
        reason: "A highlight about dough temperature.",
      },
      {
        id: "bakery",
        title: "The bakery near Nørrebro",
        when: "August 2024",
        source: "voice",
        reason: "Mentions the open crumb you wanted to copy.",
      },
    ],
  },
  {
    id: "overstory",
    tab: "Book club",
    title: "Book club: The Overstory",
    body: "Everyone kept coming back to the idea that trees talk through their roots. I want to bring something to next month that goes further than the book.",
    related: [
      {
        id: "fungi",
        title: "How trees share food",
        when: "May 2025",
        source: "clip",
        reason: "An article you clipped on fungal networks.",
      },
      {
        id: "muir",
        title: "Walk in Muir Woods",
        when: "October 2023",
        source: "voice",
        reason: "You described the same old redwoods.",
      },
      {
        id: "reading",
        title: "Books to read next",
        when: "January 2025",
        source: "note",
        reason: "Lists Suzanne Simard, who the book draws on.",
      },
    ],
  },
  {
    id: "porto",
    tab: "Porto trip",
    title: "Planning the Porto trip",
    body: "Four days in May. Mostly I want to walk, eat well, and finally find the tiled church Ana told me about.",
    related: [
      {
        id: "ana",
        title: "Dinner with Ana",
        when: "February 2025",
        source: "note",
        reason: "She named the church: Santo Ildefonso.",
      },
      {
        id: "cafes",
        title: "Slow mornings in Porto",
        when: "September 2024",
        source: "clip",
        reason: "A clipped guide to cafés near Bolhão.",
      },
    ],
  },
];

const SOURCE_ICON = {
  note: NotePencil,
  highlight: BookOpenText,
  clip: Globe,
  voice: Microphone,
} as const;

const SOURCE_LABEL = {
  note: "Note",
  highlight: "Highlight",
  clip: "Web clip",
  voice: "Voice memo",
} as const;

export function RelatedNotes() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(DRAFTS[0].id);
  const [linked, setLinked] = useState<Record<string, string[]>>({});
  const draft = DRAFTS.find((d) => d.id === active) ?? DRAFTS[0];
  const draftLinks = linked[draft.id] ?? [];

  function toggleLink(title: string) {
    setLinked((prev) => {
      const current = prev[draft.id] ?? [];
      const next = current.includes(title)
        ? current.filter((t) => t !== title)
        : [...current, title];
      return { ...prev, [draft.id]: next };
    });
  }

  const spring = reduce ? { duration: 0 } : SPRING;

  return (
    <LayoutGroup>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
        {/* The note being written */}
        <div className="rounded-[20px] bg-(--surface) p-6 sm:p-9 md:col-span-7">
          <div
            role="tablist"
            aria-label="Notes you are writing"
            className="inline-flex flex-wrap gap-1 rounded-full bg-(--bg) p-1"
          >
            {DRAFTS.map((d) => {
              const selected = d.id === active;
              return (
                <button
                  key={d.id}
                  role="tab"
                  id={`v5-tab-${d.id}`}
                  aria-selected={selected}
                  aria-controls="v5-draft-panel"
                  onClick={() => setActive(d.id)}
                  className={`relative h-10 rounded-full px-4 text-sm whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ink) ${
                    selected
                      ? "text-(--bg)"
                      : "text-(--muted) hover:text-(--ink)"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="v5-tab-pill"
                      className="absolute inset-0 rounded-full bg-(--ink)"
                      transition={spring}
                    />
                  )}
                  <span className="relative">{d.tab}</span>
                </button>
              );
            })}
          </div>

          <div
            id="v5-draft-panel"
            role="tabpanel"
            aria-labelledby={`v5-tab-${draft.id}`}
            className="mt-10 min-h-[15rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={draft.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={reduce ? { duration: 0 } : { ...SPRING, stiffness: 140 }}
              >
                <h3 className="text-2xl font-medium tracking-[-0.02em] sm:text-[1.75rem]">
                  {draft.title}
                </h3>
                <p className="mt-4 max-w-[52ch] text-lg leading-relaxed font-light text-(--muted)">
                  {draft.body}
                </p>
                <motion.div layout="position" className="mt-5 flex flex-wrap gap-2">
                  <AnimatePresence initial={false}>
                    {draftLinks.map((title) => (
                      <motion.span
                        key={title}
                        layout
                        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={spring}
                        className="rounded-full border border-(--line) bg-(--bg) px-3 py-1 text-[15px] text-(--ink)"
                      >
                        [[{title}]]
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </motion.div>
                {draftLinks.length === 0 && (
                  <p className="mt-1 text-sm text-(--muted)">
                    Link a related note and it appears here, with a backlink on
                    the other side.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Related panel */}
        <aside
          aria-label="Related notes"
          aria-live="polite"
          className="rounded-[20px] border border-(--line) p-6 sm:p-8 md:col-span-5"
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-lg font-medium tracking-[-0.01em]">Related</p>
            <p className="text-sm text-(--muted)">
              {draft.related.length} older notes
            </p>
          </div>

          <motion.ul layout className="mt-6 grid gap-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {draft.related.map((r, i) => {
                const Icon = SOURCE_ICON[r.source];
                const isLinked = draftLinks.includes(r.title);
                return (
                  <motion.li
                    key={`${draft.id}-${r.id}`}
                    layout
                    initial={reduce ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                    transition={
                      reduce ? { duration: 0 } : { ...SPRING, delay: 0.08 + i * 0.09 }
                    }
                    className="rounded-[20px] bg-(--surface) p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-(--bg) text-(--ink)">
                        <Icon size={18} weight="light" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{r.title}</p>
                        <p className="mt-0.5 text-sm text-(--muted)">
                          {SOURCE_LABEL[r.source]}, {r.when}
                        </p>
                        <p className="mt-2 text-[15px] leading-snug">
                          {r.reason}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleLink(r.title)}
                        aria-pressed={isLinked}
                        aria-label={`${isLinked ? "Unlink" : "Link"} ${r.title}`}
                        className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ink) active:scale-95 ${
                          isLinked
                            ? "border-transparent bg-(--accent) text-(--on-accent)"
                            : "border-(--line) text-(--ink) hover:bg-(--bg)"
                        }`}
                      >
                        {isLinked ? (
                          <Check size={16} weight="bold" aria-hidden />
                        ) : (
                          <Plus size={16} aria-hidden />
                        )}
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        </aside>
      </div>
    </LayoutGroup>
  );
}
