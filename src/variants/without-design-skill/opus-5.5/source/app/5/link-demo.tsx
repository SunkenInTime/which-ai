"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Note = {
  id: string;
  terms: string[];
  title: string;
  path: string;
  date: string;
  excerpt: string;
};

const NOTES: Note[] = [
  {
    id: "priya",
    terms: ["Priya"],
    title: "Priya Raman",
    path: "people/priya-raman.md",
    date: "15 Sep 2026",
    excerpt: "Design lead, growth. Prefers async. Last 1:1: wants fewer nudges, better ones.",
  },
  {
    id: "onboarding",
    terms: ["onboarding"],
    title: "Onboarding redesign — synthesis",
    path: "projects/onboarding/synthesis.md",
    date: "02 Sep 2026",
    excerpt: "14 interviews. Most drop-off happens between the first note and the second session.",
  },
  {
    id: "retention",
    terms: ["retention", "day-7"],
    title: "Q3 retention — weekly numbers",
    path: "metrics/q3-retention.md",
    date: "19 Sep 2026",
    excerpt: "D1 58% · D7 31% · D30 19%. Flat for six weeks.",
  },
  {
    id: "spaced",
    terms: ["spaced repetition"],
    title: "Spaced repetition, and why it works",
    path: "reading/spaced-repetition.md",
    date: "11 Nov 2024",
    excerpt: "Review just before you would forget. Intervals widen: 1, 3, 7, 16 days.",
  },
  {
    id: "ebbinghaus",
    terms: ["Ebbinghaus", "forgetting curve"],
    title: "Ebbinghaus — Über das Gedächtnis (1885)",
    path: "reading/ebbinghaus-1885.md",
    date: "04 Mar 2023",
    excerpt: "Without review, over half of new material is gone within the hour.",
  },
  {
    id: "marco",
    terms: ["Marco"],
    title: "Marco Bellini",
    path: "people/marco-bellini.md",
    date: "08 Aug 2026",
    excerpt: "User research. Ran the Lisbon sessions. Owns the recordings.",
  },
  {
    id: "lisbon",
    terms: ["Lisbon"],
    title: "Lisbon field interviews — May 2026",
    path: "research/lisbon-2026.md",
    date: "21 May 2026",
    excerpt: "Six sessions, recorded. “I forget I even wrote it down” came up four times.",
  },
  {
    id: "zettel",
    terms: ["Zettelkasten", "slip box"],
    title: "Luhmann’s slip box",
    path: "reading/zettelkasten.md",
    date: "17 Jan 2022",
    excerpt: "90,000 cards, one idea each, linked by number. The links were the point.",
  },
  {
    id: "sourdough",
    terms: ["sourdough"],
    title: "Sourdough — hydration log",
    path: "home/sourdough.md",
    date: "30 Aug 2026",
    excerpt: "78% hydration, 4h bulk at 24°C. Best loaf so far. Starter fed Sundays.",
  },
  {
    id: "board",
    terms: ["board deck"],
    title: "Q3 board deck — outline",
    path: "projects/board/q3-outline.md",
    date: "12 Sep 2026",
    excerpt: "Slide 6: activation. Needs one chart, not four.",
  },
  {
    id: "habits",
    terms: ["Tiny Habits"],
    title: "Tiny Habits — BJ Fogg",
    path: "reading/tiny-habits.md",
    date: "09 Jun 2025",
    excerpt: "Behaviour = motivation × ability × prompt. Anchor to an existing routine.",
  },
];

const BODY =
  "Call with Priya about onboarding. Day-7 retention still flat at 31%. Her idea: borrow from spaced repetition — nudge on day 1, 3 and 7 instead of every morning. Reread the Ebbinghaus notes before Friday. Ask Marco for the Lisbon recordings.";

const SUGGESTIONS: { term: string; sentence: string }[] = [
  { term: "Zettelkasten", sentence: "Is this just a Zettelkasten with reminders?" },
  { term: "board deck", sentence: "The day-7 chart goes in the board deck." },
  { term: "Tiny Habits", sentence: "See Tiny Habits on prompts." },
  { term: "sourdough", sentence: "Feed the sourdough starter tonight." },
];

const TERMS = NOTES.flatMap((n) => n.terms.map((t) => ({ term: t, id: n.id }))).sort(
  (a, b) => b.term.length - a.term.length,
);
const LOOKUP = new Map(TERMS.map((t) => [t.term.toLowerCase(), t.id]));
const PATTERN = new RegExp(
  `\\b(${TERMS.map((t) => t.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "gi",
);
const BY_ID = new Map(NOTES.map((n) => [n.id, n]));

type Segment = { text: string; id?: string };
type Hit = { id: string; term: string; count: number };

function analyse(text: string) {
  const segments: Segment[] = [];
  const hits = new Map<string, Hit>();
  let last = 0;
  for (const m of text.matchAll(PATTERN)) {
    const i = m.index ?? 0;
    const id = LOOKUP.get(m[0].toLowerCase());
    if (!id) continue;
    if (i > last) segments.push({ text: text.slice(last, i) });
    segments.push({ text: m[0], id });
    const h = hits.get(id);
    if (h) h.count += 1;
    else hits.set(id, { id, term: m[0], count: 1 });
    last = i + m[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last) });
  return { segments, hits: [...hits.values()] };
}

// Shared metrics so the mirror and the textarea wrap identically.
const TYPE =
  "m-0 p-0 border-0 text-[17px] leading-[1.65] md:text-[19px] tracking-[-0.006em] whitespace-pre-wrap [overflow-wrap:break-word]";

export function LinkDemo() {
  const [text, setText] = useState(BODY);
  const [mode, setMode] = useState<"idle" | "typing" | "user">("idle");
  const timer = useRef<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const area = useRef<HTMLTextAreaElement>(null);
  const touched = useRef(false);

  const stop = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const play = useCallback(() => {
    stop();
    let i = 0;
    setText("");
    setMode("typing");
    const tick = () => {
      i += 1;
      setText(BODY.slice(0, i));
      if (i >= BODY.length) {
        timer.current = null;
        setMode("user");
        return;
      }
      const ch = BODY[i - 1];
      const delay =
        ch === "."
          ? 340
          : ch === "," || ch === ":" || ch === "—"
            ? 170
            : 20 + Math.random() * 42;
      timer.current = window.setTimeout(tick, delay);
    };
    timer.current = window.setTimeout(tick, 450);
  }, [stop]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          if (!touched.current) play();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [play, stop]);

  const takeOver = () => {
    touched.current = true;
    if (mode === "typing") {
      stop();
      setText(BODY);
    }
    setMode("user");
  };

  const append = (sentence: string) => {
    touched.current = true;
    stop();
    setMode("user");
    setText((t) => {
      const base = mode === "typing" ? BODY : t;
      return `${base.trimEnd()}${base.trim() ? " " : ""}${sentence}`;
    });
  };

  const { segments, hits } = analyse(text);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const unused = SUGGESTIONS.filter((s) => !hits.some((h) => BY_ID.get(h.id)?.terms.includes(s.term)));

  return (
    <div ref={root} className="grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6">
      <style>{`
        @keyframes idx-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .idx-in { animation: idx-in .38s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes idx-blink { 50% { opacity: 0; } }
        .idx-blink { animation: idx-blink 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) { .idx-in, .idx-blink { animation: none; } }
      `}</style>

      {/* Editor */}
      <div className="col-span-4 md:col-span-7">
        <div className="flex items-center justify-between border-y border-black py-2 font-[family-name:var(--font-index-mono)] text-[11px] uppercase tracking-[0.08em]">
          <span>Daily / 2026-09-22.md</span>
          <span className="flex items-center gap-2" aria-hidden="true">
            <span
              className={`inline-block size-2 ${mode === "typing" ? "idx-blink bg-[#FF4F00]" : "bg-black"}`}
            />
            {mode === "typing" ? "Typing" : "Your turn"}
          </span>
        </div>

        <p className="mt-8 font-[family-name:var(--font-index-mono)] text-[11px] uppercase tracking-[0.08em] text-black/60">
          Tue 22 Sep 2026 · 09:41
        </p>
        <h3 className="mt-2 text-[28px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[36px]">
          Onboarding sync
        </h3>

        <div className="relative mt-6 min-h-[13rem]">
          <div aria-hidden="true" className={`${TYPE} text-black`}>
            {segments.map((s, i) =>
              s.id ? (
                <span
                  key={i}
                  className="underline decoration-[#FF4F00] decoration-2 underline-offset-[5px]"
                >
                  {s.text}
                </span>
              ) : (
                <span key={i}>{s.text}</span>
              ),
            )}
            {"​"}
          </div>
          <textarea
            ref={area}
            value={text}
            onChange={(e) => {
              touched.current = true;
              stop();
              setMode("user");
              setText(e.target.value);
            }}
            onFocus={takeOver}
            spellCheck={false}
            aria-label="Demo note. Type to see Mneme link it to existing notes."
            placeholder="Mention a person, a project, a book…"
            className={`${TYPE} absolute inset-0 block h-full w-full resize-none overflow-hidden bg-transparent text-transparent caret-[#FF4F00] outline-none placeholder:text-black/40 selection:bg-[#FF4F00]/25 focus-visible:outline-none`}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/15 pt-3 font-[family-name:var(--font-index-mono)] text-[11px] uppercase tracking-[0.08em] text-black/60">
          <span>{words} words</span>
          <span>
            {hits.length} {hits.length === 1 ? "link" : "links"}
          </span>
          <span>Saved to disk</span>
          <span className="ml-auto flex gap-4">
            <button
              type="button"
              onClick={() => {
                touched.current = true;
                play();
              }}
              className="uppercase underline-offset-4 hover:text-black hover:underline focus-visible:text-black focus-visible:underline focus-visible:outline-none"
            >
              Replay
            </button>
            <button
              type="button"
              onClick={() => {
                touched.current = true;
                stop();
                setMode("user");
                setText("");
                area.current?.focus();
              }}
              className="uppercase underline-offset-4 hover:text-black hover:underline focus-visible:text-black focus-visible:underline focus-visible:outline-none"
            >
              Clear
            </button>
          </span>
        </div>

        {unused.length > 0 && (
          <div className="mt-6 flex flex-wrap items-baseline gap-2">
            <span className="mr-2 font-[family-name:var(--font-index-mono)] text-[11px] uppercase tracking-[0.08em] text-black/60">
              Also in this library →
            </span>
            {unused.map((s) => (
              <button
                key={s.term}
                type="button"
                onClick={() => append(s.sentence)}
                className="border border-black px-2.5 py-1 text-[14px] font-medium transition-colors hover:bg-black hover:text-[#F2F1EC] focus-visible:bg-black focus-visible:text-[#F2F1EC] focus-visible:outline-none"
              >
                + {s.term}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Linked notes */}
      <aside
        aria-labelledby="linked-heading"
        className="col-span-4 mt-14 md:col-span-5 md:mt-0 md:border-l md:border-black/15 md:pl-6"
      >
        <div className="flex items-center justify-between border-y border-black py-2 font-[family-name:var(--font-index-mono)] text-[11px] uppercase tracking-[0.08em]">
          <h3 id="linked-heading" className="font-medium">
            Linked notes
          </h3>
          <span aria-hidden="true">{String(hits.length).padStart(2, "0")}</span>
          <span className="sr-only" aria-live="polite">
            {hits.length} linked {hits.length === 1 ? "note" : "notes"}
          </span>
        </div>

        {hits.length === 0 ? (
          <p className="mt-6 max-w-[34ch] text-[15px] leading-[1.5] text-black/60">
            Nothing linked yet. Mention a person, a project or an idea you have written about before.
          </p>
        ) : (
          <ol>
            {hits.map((h, i) => {
              const n = BY_ID.get(h.id);
              if (!n) return null;
              return (
                <li
                  key={h.id}
                  className="idx-in grid grid-cols-[2.25rem_1fr] border-b border-black/15 py-4"
                >
                  <span className="font-[family-name:var(--font-index-mono)] text-[11px] leading-[1.9] text-black/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline justify-between gap-3 font-[family-name:var(--font-index-mono)] text-[11px] uppercase tracking-[0.06em]">
                      <span className="truncate">
                        <span className="text-black/60">via </span>
                        <span className="underline decoration-[#FF4F00] decoration-2 underline-offset-[3px]">
                          {h.term}
                        </span>
                        {h.count > 1 && <span className="text-black/60"> ×{h.count}</span>}
                      </span>
                      <span className="shrink-0 text-black/60">{n.date}</span>
                    </div>
                    <p className="mt-1.5 text-[17px] font-semibold leading-tight tracking-[-0.015em]">
                      {n.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-[1.45] text-black/70">{n.excerpt}</p>
                    <p className="mt-2 truncate font-[family-name:var(--font-index-mono)] text-[11px] text-black/60">
                      {n.path}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </aside>
    </div>
  );
}
