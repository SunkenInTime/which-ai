"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { jetbrains } from "@/variants/with-taste-skill/haiku-5-5/source/app/fonts";

const NOTES = [
  {
    id: "maps",
    title: "Maps copied from maps",
    excerpt:
      "Surveyors repeated the same coastline errors for decades. The mistake lasted because every copy looked authoritative.",
    date: "Mar 14",
  },
  {
    id: "onboarding",
    title: "Interview notes, onboarding",
    excerpt:
      "Three people stopped at the same step: naming the workspace. Defaults mattered more than the setup guide.",
    date: "Apr 2",
  },
  {
    id: "memory",
    title: "Lecture 6, memory and retrieval",
    excerpt:
      "Spaced returns feel harder than cramming, and that difficulty is what makes them stick.",
    date: "May 9",
  },
  {
    id: "attention",
    title: "Draft, essay on attention",
    excerpt:
      "A notification costs more than the seconds it takes to read. The real cost is the trip back to the task.",
    date: "Jun 21",
  },
  {
    id: "reading",
    title: "Reading list, autumn",
    excerpt:
      "Three books about rivers and one about bridges. The thread is how people argued with the landscape.",
    date: "Sep 3",
  },
  {
    id: "bench",
    title: "Notes from the bench",
    excerpt:
      "Log the failed run before the fix. The next person will hit the same wall.",
    date: "Sep 28",
  },
];

export function NoteSearch() {
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return NOTES.slice(0, 4);

    return NOTES.map((note) => {
      const text = `${note.title} ${note.excerpt}`.toLowerCase();
      const score = words.filter((word) => text.includes(word)).length;
      return { note, score };
    })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.note);
  }, [query]);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 md:p-5">
      <label htmlFor="note-search" className="sr-only">
        Search your notes
      </label>
      <div className="flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 transition-colors focus-within:border-amber-300">
        <MagnifyingGlass
          size={18}
          aria-hidden="true"
          className="shrink-0 text-zinc-400"
        />
        <input
          id="note-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type a word you remember"
          autoComplete="off"
          className="w-full bg-transparent text-base text-zinc-100 outline-none placeholder:text-zinc-400"
        />
      </div>

      <p
        aria-live="polite"
        className={`${jetbrains.className} mt-4 px-1 text-xs text-zinc-400`}
      >
        {results.length} {results.length === 1 ? "note" : "notes"}
      </p>

      {results.length === 0 ? (
        <p className="px-1 py-10 text-center text-zinc-400">
          Nothing matches &ldquo;{query.trim()}&rdquo;. Try a shorter word.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {results.map((note) => (
            <motion.li
              key={note.id}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-lg bg-zinc-950/70 p-4"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-medium text-zinc-100">{note.title}</p>
                <time
                  className={`${jetbrains.className} shrink-0 text-xs text-zinc-400`}
                >
                  {note.date}
                </time>
              </div>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                {note.excerpt}
              </p>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
