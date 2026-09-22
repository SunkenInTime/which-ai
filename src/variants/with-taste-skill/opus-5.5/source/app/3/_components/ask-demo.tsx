"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

type Source = { title: string; date: string; excerpt: string };
type Part = string | { cite: number };
type Answer = { q: string; keywords: string[]; parts: Part[]; sources: Source[] };

const ANSWERS: Answer[] = [
  {
    q: "Why did the office stop feeling social?",
    keywords: ["office", "social", "empty", "quiet", "floor"],
    parts: [
      "You traced it to lost casual contact. After the move, the kitchen and the lifts ended up on opposite sides, so people stopped crossing paths ",
      { cite: 0 },
      ". Your 2023 reading notes make the same point about streets: public life grows from small, repeated encounters ",
      { cite: 1 },
      ". You also noted that third places work because nobody has to plan to be there ",
      { cite: 2 },
      ".",
    ],
    sources: [
      {
        title: "Why our office floor feels empty",
        date: "Today",
        excerpt: "Kitchen moved to the east wing. Nobody walks past the design pod anymore.",
      },
      {
        title: "Jacobs: eyes on the street",
        date: "March 2023",
        excerpt: "Sidewalk contacts are the small change from which a city's wealth of public life may grow.",
      },
      {
        title: "Third places",
        date: "November 2024",
        excerpt: "Oldenburg: neutral ground, regulars, conversation as the main activity.",
      },
    ],
  },
  {
    q: "Where did I land on CRDTs versus server sync?",
    keywords: ["crdt", "sync", "server", "local", "conflict"],
    parts: [
      "You leaned toward CRDTs for text and a server-ordered log for settings. The Kleppmann paper convinced you offline edits should never block ",
      { cite: 0 },
      ", but your conflict list shows two cases a CRDT merges silently in a way users would not expect ",
      { cite: 1 },
      ". The June incident is why settings stay server-ordered ",
      { cite: 2 },
      ".",
    ],
    sources: [
      {
        title: "Local-first software (Kleppmann)",
        date: "January 2025",
        excerpt: "Seven ideals. The one that matters to us: the network is optional.",
      },
      {
        title: "Sync conflict cases",
        date: "May 2026",
        excerpt: "Concurrent rename plus delete. Both clients think they won.",
      },
      {
        title: "Incident 2026-06 postmortem",
        date: "June 2026",
        excerpt: "Two devices wrote the default theme back and forth for an hour.",
      },
    ],
  },
  {
    q: "What did my advisor say about chapter 2?",
    keywords: ["advisor", "chapter", "thesis", "phd"],
    parts: [
      "She asked you to lead with the interleaving results and move the history of the field to an appendix ",
      { cite: 0 },
      ". She also flagged that your framing of desirable difficulties needs the 1994 source, not the review paper ",
      { cite: 1 },
      ". Your current outline still opens with the history section ",
      { cite: 2 },
      ".",
    ],
    sources: [
      {
        title: "Meeting with advisor 09-12",
        date: "12 September",
        excerpt: "Lead with the result. Nobody needs twelve pages of history first.",
      },
      {
        title: "Desirable difficulties",
        date: "February 2026",
        excerpt: "Bjork 1994 is the primary source. Cite it directly.",
      },
      {
        title: "Thesis chapter 2",
        date: "Last edited 3 days ago",
        excerpt: "2.1 A short history of memory research",
      },
    ],
  },
];

type Status = "idle" | "loading" | "streaming" | "done" | "empty";

function tokenize(parts: Part[]) {
  const out: Part[] = [];
  for (const p of parts) {
    if (typeof p === "string") out.push(...(p.match(/\S+\s*|\s+/g) ?? []));
    else out.push(p);
  }
  return out;
}

function match(input: string) {
  const q = input.toLowerCase();
  let best: Answer | null = null;
  let score = 0;
  for (const a of ANSWERS) {
    const s = a.keywords.filter((k) => q.includes(k)).length;
    if (s > score) {
      best = a;
      score = s;
    }
  }
  return best;
}

export function AskDemo() {
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [shown, setShown] = useState(0);
  const [openCite, setOpenCite] = useState<number | null>(null);
  const timers = useRef<number[]>([]);
  const inputId = useId();
  const errorId = useId();

  const tokens = answer ? tokenize(answer.parts) : [];

  function clearTimers() {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }

  useEffect(() => clearTimers, []);

  function ask(question: string) {
    const q = question.trim();
    clearTimers();
    setOpenCite(null);
    if (!q) {
      setError("Type a question, or pick one of the examples.");
      return;
    }
    setError(null);
    setValue(q);
    const found = match(q);
    setAnswer(found);
    setShown(0);
    setStatus("loading");
    const all = found ? tokenize(found.parts).length : 0;
    const think = reduce ? 0 : 700;
    timers.current.push(
      window.setTimeout(() => {
        if (!found) {
          setStatus("empty");
          return;
        }
        if (reduce) {
          setShown(all);
          setStatus("done");
          return;
        }
        setStatus("streaming");
        let i = 0;
        const step = () => {
          i += 1;
          setShown(i);
          if (i >= all) setStatus("done");
          else timers.current.push(window.setTimeout(step, 28 + (i % 5) * 6));
        };
        step();
      }, think),
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(value);
          }}
          noValidate
          className="flex flex-col gap-2"
        >
          <label htmlFor={inputId} className="text-sm font-medium">
            Ask a question about the sample notes
          </label>
          <div className="flex gap-2">
            <input
              id={inputId}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              placeholder="What did I decide about..."
              autoComplete="off"
              className="h-11 min-w-0 flex-1 rounded-lg border border-(--line-strong) bg-(--bg-raised) px-3.5 text-[15px] text-(--fg) placeholder:text-(--fg-faint) focus-visible:border-(--focus)"
            />
            <button
              type="submit"
              className="inline-flex h-11 shrink-0 items-center rounded-lg bg-(--accent) px-4 text-[15px] font-medium text-(--accent-ink) transition-transform active:translate-y-px"
            >
              Ask
            </button>
          </div>
          {error ? (
            <p id={errorId} role="alert" className="text-sm text-(--fg)">
              {error}
            </p>
          ) : (
            <p className="text-sm text-(--fg-muted)">Answers only come from notes in this demo vault.</p>
          )}
        </form>
        <div className="mt-8 flex flex-col items-start gap-2">
          {ANSWERS.map((a) => (
            <button
              key={a.q}
              type="button"
              onClick={() => ask(a.q)}
              className="rounded-lg border border-(--line) px-3 py-2 text-left text-sm text-(--fg-muted) transition-colors hover:border-(--line-strong) hover:text-(--fg) active:translate-y-px"
            >
              {a.q}
            </button>
          ))}
        </div>
      </div>

      <div
        className="min-h-[340px] rounded-lg border border-(--line-strong) bg-(--bg-raised) p-6"
        aria-live="polite"
        aria-busy={status === "loading" || status === "streaming"}
      >
        {status === "idle" && (
          <div className="flex h-full min-h-[290px] flex-col justify-center">
            <p className="text-lg font-medium tracking-tight">Nothing asked yet.</p>
            <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-(--fg-muted)">
              Pick a question on the left. The answer cites the notes it came from, and each
              citation opens the note.
            </p>
          </div>
        )}
        {status === "loading" && (
          <div className="space-y-3" aria-label="Searching your notes">
            <p className="mono text-xs text-(--fg-faint)">Reading your notes</p>
            {[92, 100, 84, 60].map((wd, i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded-lg bg-(--bg-sunken) motion-reduce:animate-none"
                style={{ width: `${wd}%` }}
              />
            ))}
          </div>
        )}
        {status === "empty" && (
          <div>
            <p className="text-lg font-medium tracking-tight">No notes mention that.</p>
            <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-(--fg-muted)">
              Kept only answers from what you have written, so it says so instead of guessing.
              This demo vault knows about the office, sync and a thesis.
            </p>
          </div>
        )}
        {answer && (status === "streaming" || status === "done") && (
          <div>
            <p className="text-sm font-medium text-(--fg-muted)">{answer.q}</p>
            <p className="mt-4 text-[17px] leading-relaxed">
              {tokens.slice(0, shown).map((t, i) =>
                typeof t === "string" ? (
                  <span key={i}>{t}</span>
                ) : (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setOpenCite(openCite === t.cite ? null : t.cite)}
                    aria-expanded={openCite === t.cite}
                    aria-label={`Source: ${answer.sources[t.cite].title}`}
                    className={`mono mx-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-lg px-1 align-[2px] text-[11px] transition-colors ${
                      openCite === t.cite
                        ? "bg-(--accent) text-(--accent-ink)"
                        : "bg-(--bg-sunken) text-(--fg) hover:bg-(--accent) hover:text-(--accent-ink)"
                    }`}
                  >
                    {t.cite + 1}
                  </button>
                ),
              )}
              {status === "streaming" && (
                <span className="v3-caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-(--fg)" />
              )}
            </p>
            <AnimatePresence initial={false}>
              {status === "done" && (
                <motion.ul
                  key="sources"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 border-t border-(--line) pt-4"
                >
                  {answer.sources.map((s, i) => (
                    <li key={s.title}>
                      <button
                        type="button"
                        onClick={() => setOpenCite(openCite === i ? null : i)}
                        aria-expanded={openCite === i}
                        className="flex w-full items-baseline gap-3 rounded-lg py-1.5 text-left text-sm"
                      >
                        <span className="mono w-4 shrink-0 text-xs text-(--fg-faint)">{i + 1}</span>
                        <span
                          className={`font-medium underline decoration-(--line-strong) underline-offset-4 hover:decoration-(--accent-text) ${
                            openCite === i ? "text-(--accent-text)" : ""
                          }`}
                        >
                          {s.title}
                        </span>
                        <span className="ml-auto shrink-0 text-xs text-(--fg-faint)">{s.date}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {openCite === i && (
                          <motion.p
                            initial={reduce ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden pl-7 text-sm leading-relaxed text-(--fg-muted)"
                          >
                            <span className="block pb-2">{s.excerpt}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
