"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowUp, BookmarkSimple } from "@phosphor-icons/react";

type Answer = { keys: string[]; q: string; a: string; cites: string[] };

const SAMPLE: Answer[] = [
  {
    keys: ["memory", "remember", "recall", "revision", "exam"],
    q: "What have I written about memory?",
    a: "Two notes cover it. Your lecture notes say memory is rebuilt each time you recall it, and an article you clipped says testing yourself beats rereading.",
    cites: ["Week 7: memory is rebuilt", "Clipped: testing beats rereading"],
  },
  {
    keys: ["harbour", "chapter", "boat", "opening", "novel"],
    q: "Where did the harbour opening come from?",
    a: "A late-night voice memo about opening chapter 3 at the harbour, linked to a screenshot of fishing boats you saved.",
    cites: ["Voice memo, 11:42pm", "Screenshot: fishing boats"],
  },
  {
    keys: ["underline", "book", "highlight", "essay", "reading"],
    q: "Why did I start the underlining essay?",
    a: "It began as a question in your idea list, and your book highlights are what kept feeding it.",
    cites: ["Essay idea: underlining", "Highlights: 4 books"],
  },
];

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "done"; answer: Answer }
  | { kind: "empty"; query: string };

/**
 * A working mini version of "Ask your notes", running on a fixed set of
 * sample notes. Plain React state and CSS transitions (no Motion, since this
 * renders inside the GSAP sticky stack).
 */
export function AskDemo() {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    setQuery(q);
    setStatus({ kind: "loading" });
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const lower = q.toLowerCase();
      const hit = SAMPLE.find((s) => s.keys.some((k) => lower.includes(k)));
      setStatus(hit ? { kind: "done", answer: hit } : { kind: "empty", query: q });
    }, 650);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(query);
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-sm font-semibold">
          Ask the sample notes
        </label>
        <div className="flex items-center gap-2 rounded-full bg-[#f4f4f1]/10 p-1.5 pl-5 ring-1 ring-[#f4f4f1]/20 focus-within:ring-2 focus-within:ring-[#8193ff]">
          <input
            id={inputId}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. what did I note about memory?"
            className="min-w-0 flex-1 bg-transparent text-base text-(--v4-on-ink) outline-none placeholder:text-[#b4b4bd]"
          />
          <button
            type="submit"
            aria-label="Ask"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-(--v4-accent) text-(--v4-on-accent) transition-transform active:scale-[0.96]"
          >
            <ArrowUp size={20} weight="bold" />
          </button>
        </div>
        <p className="text-sm text-[#b4b4bd]">Or pick a question:</p>
      </form>

      <div className="flex flex-wrap gap-2">
        {SAMPLE.map((s) => (
          <button
            key={s.q}
            type="button"
            onClick={() => ask(s.q)}
            className="rounded-full px-4 py-2 text-left text-sm ring-1 ring-[#f4f4f1]/25 transition-colors hover:bg-[#f4f4f1]/10 active:scale-[0.98]"
          >
            {s.q}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="min-h-[9.5rem] rounded-[28px] bg-[#f4f4f1]/[0.07] p-5">
        {status.kind === "idle" && (
          <p className="text-sm text-[#b4b4bd]">
            Answers come from your own notes, with every source cited.
          </p>
        )}
        {status.kind === "loading" && (
          <div className="flex flex-col gap-3" aria-label="Searching your notes">
            <span className="h-3.5 w-11/12 animate-pulse rounded-full bg-[#f4f4f1]/15 motion-reduce:animate-none" />
            <span className="h-3.5 w-9/12 animate-pulse rounded-full bg-[#f4f4f1]/15 motion-reduce:animate-none" />
            <span className="mt-2 h-7 w-40 animate-pulse rounded-full bg-[#f4f4f1]/10 motion-reduce:animate-none" />
          </div>
        )}
        {status.kind === "done" && (
          <div>
            <p className="leading-relaxed">{status.answer.a}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {status.answer.cites.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full bg-(--v4-accent) px-3 py-1.5 text-xs font-semibold text-(--v4-on-accent)"
                >
                  <BookmarkSimple size={13} weight="fill" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
        {status.kind === "empty" && (
          <p className="leading-relaxed">
            Nothing in these sample notes mentions &ldquo;{status.query}&rdquo;. Try memory,
            the harbour chapter or underlining.
          </p>
        )}
      </div>
    </div>
  );
}
