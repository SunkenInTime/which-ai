"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Backlink = { title: string; snippet: string; meta: string; fresh?: boolean };
type Suggestion = { id: string; title: string; reason: string; snippet: string };

const INITIAL_BACKLINKS: Backlink[] = [
  {
    title: "Q4 roadmap bets",
    snippet: "Any pricing change is gated on the interview synthesis. No annual push until…",
    meta: "Sep 19",
  },
  {
    title: "1:1 — Tomás",
    snippet: "Wants the synthesis before Thursday’s review. Keep it to one page.",
    meta: "Sep 17",
  },
  {
    title: "Daily note — Sep 16",
    snippet: "Last two calls done. Priya’s gym-membership line is the headline.",
    meta: "Sep 16",
  },
];

const INITIAL_SUGGESTIONS: Suggestion[] = [
  {
    id: "churn",
    title: "Churn survey — Aug 2026",
    reason: "“trial” and “commit” appear in both",
    snippet: "Top reason for leaving: ‘not ready to commit yet’. 41% of responses.",
  },
  {
    id: "momtest",
    title: "Reading: The Mom Test",
    reason: "You quote it in 3 interviews",
    snippet: "Compliments are noise. Ask about the last time it happened.",
  },
  {
    id: "onboarding",
    title: "Onboarding — week 1 drop-off",
    reason: "Same cohort, same fortnight",
    snippet: "Day-3 retention dips for users who skip the daily note.",
  },
];

function Kbd({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <kbd
      className={
        dark
          ? "inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-white/15 bg-white/10 px-1 font-mono text-[10.5px] leading-none text-white/80"
          : "inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-[#DEDFE3] bg-white px-1 font-mono text-[10.5px] leading-none text-[#555B67] shadow-[0_1px_0_#DEDFE3]"
      }
    >
      {children}
    </kbd>
  );
}

function WikiLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[4px] bg-[#FFEDE6] px-[3px] py-px font-medium text-[#B83A15] decoration-[#F2542D]/40 underline-offset-2 hover:underline">
      <span className="text-[#E7A58F]" aria-hidden>
        [[
      </span>
      {children}
      <span className="text-[#E7A58F]" aria-hidden>
        ]]
      </span>
    </span>
  );
}

function Icon({ d, className = "" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[15px] w-[15px] shrink-0 ${className}`}
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  calendar: "M3 4.5h10v8.5H3zM3 7h10M5.5 3v2.5M10.5 3v2.5",
  inbox: "M2.5 9l1.8-5.5h7.4L13.5 9v3.5h-11zM2.5 9h3l1 1.5h3l1-1.5h3",
  sparkle: "M8 2.5l1.3 3.2 3.2 1.3-3.2 1.3L8 11.5 6.7 8.3 3.5 7l3.2-1.3zM12.5 11l.5 1.3 1.3.5-1.3.5-.5 1.2-.5-1.2-1.3-.5 1.3-.5z",
  graph: "M4 4.5a1.5 1.5 0 1 0 0-.01M12 6a1.5 1.5 0 1 0 0-.01M7 12.5a1.5 1.5 0 1 0 0-.01M5.3 5.2l5.3 1.3M4.6 6l1.9 5M11 7.2l-3.1 4.3",
  pin: "M9.5 2.5l4 4-2 .8-2.3 2.3.3 2.9-1 1-2.3-2.3L3 14l2.8-3.2-2.3-2.3 1-1 2.9.3 2.3-2.3z",
  hash: "M6 2.5L5 13.5M11 2.5l-1 11M3 6h10.5M2.5 10H13",
  search: "M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM10.7 10.7L14 14",
  lock: "M4 7.5h8v6H4zM5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2",
  link: "M6.8 9.2a2.6 2.6 0 0 0 3.7 0l2-2a2.6 2.6 0 0 0-3.7-3.7l-.6.6M9.2 6.8a2.6 2.6 0 0 0-3.7 0l-2 2a2.6 2.6 0 0 0 3.7 3.7l.6-.6",
  back: "M10 3.5L5.5 8l4.5 4.5",
  doc: "M4 2.5h5.5L12.5 5.5v8H4zM9.5 2.5v3h3",
};

export function Workspace() {
  const [backlinks, setBacklinks] = useState<Backlink[]>(INITIAL_BACKLINKS);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(INITIAL_SUGGESTIONS);
  const [related, setRelated] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("What did people say about annual billing?");
  const [answerState, setAnswerState] = useState<"idle" | "thinking" | "done">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  const ask = useCallback(() => {
    setAnswerState("thinking");
    timers.current.push(window.setTimeout(() => setAnswerState("done"), 750));
  }, []);

  const openPalette = useCallback(() => {
    setPaletteOpen(true);
    ask();
  }, [ask]);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    setAnswerState("idle");
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (paletteOpen) closePalette();
        else openPalette();
      } else if (e.key === "Escape" && paletteOpen) {
        closePalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, openPalette, closePalette]);

  useEffect(() => {
    if (paletteOpen) inputRef.current?.focus();
  }, [paletteOpen]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  function linkSuggestion(s: Suggestion) {
    setSuggestions((prev) => prev.filter((x) => x.id !== s.id));
    setBacklinks((prev) => [
      { title: s.title, snippet: s.snippet, meta: "now", fresh: true },
      ...prev.map((b) => ({ ...b, fresh: false })),
    ]);
    setRelated((prev) => [...prev, s.title]);
    setToast(`Linked “${s.title}”. Backlink added on both notes.`);
    timers.current.push(window.setTimeout(() => setToast(null), 2600));
  }

  function reset() {
    setBacklinks(INITIAL_BACKLINKS);
    setSuggestions(INITIAL_SUGGESTIONS);
    setRelated([]);
  }

  return (
    <div className="relative">
      {/* window */}
      <div
        className="relative overflow-hidden rounded-[14px] border border-[#DADCE0] bg-white shadow-[0_1px_0_rgba(255,255,255,.8)_inset,0_1px_2px_rgba(16,18,24,.04),0_12px_32px_-8px_rgba(16,18,24,.14),0_48px_96px_-32px_rgba(16,18,24,.22)]"
        role="group"
        aria-label="Interactive preview of the Mneme app"
      >
        {/* title bar */}
        <div className="flex h-11 items-center gap-3 border-b border-[#ECEDF0] bg-[#FBFBFC] px-4">
          <div className="flex gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#FF5F57] ring-1 ring-black/5 ring-inset" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E] ring-1 ring-black/5 ring-inset" />
            <span className="h-3 w-3 rounded-full bg-[#28C840] ring-1 ring-black/5 ring-inset" />
          </div>
          <div className="ml-2 hidden items-center gap-1 text-[#9AA0AB] sm:flex" aria-hidden>
            <Icon d={ICONS.back} />
            <Icon d={ICONS.back} className="rotate-180 opacity-50" />
          </div>
          <button
            ref={triggerRef}
            type="button"
            onClick={openPalette}
            className="mx-auto flex h-7 w-full max-w-[340px] items-center gap-2 rounded-[7px] border border-[#E3E4E8] bg-white px-2.5 text-left text-[12.5px] text-[#6B717D] transition-colors hover:border-[#CFD1D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2542D]"
          >
            <Icon d={ICONS.search} className="h-[13px] w-[13px]" />
            <span className="flex-1 truncate">Search or ask your notes…</span>
            <span className="flex gap-0.5">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </button>
          <div className="hidden w-[76px] items-center justify-end gap-1.5 text-[11.5px] text-[#6B717D] md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22A06B]" aria-hidden />
            Synced
          </div>
        </div>

        <div className="grid md:grid-cols-[208px_1fr] lg:grid-cols-[208px_1fr_292px]">
          {/* sidebar */}
          <nav
            aria-label="Sample sidebar"
            className="hidden border-r border-[#ECEDF0] bg-[#F8F8F9] px-2.5 py-3 text-[13px] text-[#3A3F4A] md:block"
          >
            <ul className="space-y-px">
              <SideItem icon={ICONS.calendar} label="Today" hint="Sep 22" />
              <SideItem icon={ICONS.inbox} label="Inbox" count={3} />
              <SideItem icon={ICONS.sparkle} label="Ask" hint="⌘K" />
              <SideItem icon={ICONS.graph} label="Graph" />
            </ul>
            <p className="mt-5 mb-1.5 px-2 text-[11px] font-medium tracking-wide text-[#8A909B] uppercase">
              Pinned
            </p>
            <ul className="space-y-px">
              <SideItem icon={ICONS.doc} label="Pricing interviews — synthesis" active />
              <SideItem icon={ICONS.doc} label="Q4 roadmap bets" />
              <SideItem icon={ICONS.doc} label="Reading list 2026" />
              <SideItem icon={ICONS.doc} label="Hiring loop — design eng" />
            </ul>
            <p className="mt-5 mb-1.5 px-2 text-[11px] font-medium tracking-wide text-[#8A909B] uppercase">
              Tags
            </p>
            <ul className="space-y-px">
              <SideItem icon={ICONS.hash} label="research" count={48} />
              <SideItem icon={ICONS.hash} label="product" count={112} />
              <SideItem icon={ICONS.hash} label="1on1" count={37} />
              <SideItem icon={ICONS.hash} label="reading" count={29} />
            </ul>
            <div className="mt-6 flex items-center gap-1.5 px-2 text-[11.5px] text-[#6B717D]">
              <Icon d={ICONS.lock} className="h-[13px] w-[13px]" />
              1,284 notes · encrypted
            </div>
          </nav>

          {/* editor */}
          <article className="min-w-0 px-5 py-6 sm:px-10 sm:py-8 lg:min-h-[560px]">
            <div className="flex items-center gap-1.5 text-[12px] text-[#7A808B]">
              <span>Research</span>
              <span aria-hidden>/</span>
              <span>Pricing</span>
              <span className="ml-auto hidden font-mono text-[11px] sm:inline">pricing-interviews.md</span>
            </div>
            <h3 className="mt-3 text-[24px] leading-tight font-semibold tracking-[-0.02em] text-[#0F1115] sm:text-[28px]">
              Pricing interviews — synthesis
            </h3>
            <p className="mt-1.5 text-[12px] text-[#7A808B]">
              Edited 2 min ago · 11 interviews · <span className="text-[#B83A15]">#research</span>
            </p>

            <div className="mt-6 space-y-4 text-[14.5px] leading-[1.7] text-[#2A2E37]">
              <p>
                Eleven calls over two weeks. The pattern is loud: nobody objects to the price. They object to
                committing before they’ve built the habit.
              </p>
              <h4 className="pt-1 text-[15px] font-semibold text-[#0F1115]">What we heard</h4>
              <ul className="space-y-2 pl-4 marker:text-[#B6BAC2] [&>li]:list-disc [&>li]:pl-1">
                <li>
                  Annual billing reads as a trap until week three. <WikiLink>Interview — Priya Raman</WikiLink>{" "}
                  called it “a gym membership for my brain.”
                </li>
                <li>
                  Teams want shared spaces long before admin controls. Feeds straight into{" "}
                  <WikiLink>Q4 roadmap bets</WikiLink>.
                </li>
                <li>No one asked for a cheaper tier. Four asked for a longer trial.</li>
              </ul>
              <h4 className="pt-1 text-[15px] font-semibold text-[#0F1115]">Next</h4>
              <ul className="space-y-1.5">
                <Task done>
                  Tag every transcript <span className="text-[#B83A15]">#research</span>
                </Task>
                <Task>
                  Draft a 30-day trial test in <WikiLink>Growth experiments</WikiLink>
                </Task>
                <Task>
                  Send to Tomás before Thursday<span className="mn-caret" aria-hidden />
                </Task>
              </ul>
              {related.length > 0 && (
                <p className="mn-in border-t border-dashed border-[#E6E7EA] pt-3 text-[13.5px] text-[#555B67]">
                  Related:{" "}
                  {related.map((r, i) => (
                    <span key={r}>
                      <WikiLink>{r}</WikiLink>
                      {i < related.length - 1 ? " " : ""}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </article>

          {/* right panel */}
          <aside
            aria-label="Links for this note"
            className="border-t border-[#ECEDF0] bg-[#FCFCFD] px-4 py-5 md:col-span-2 lg:col-span-1 lg:border-t-0 lg:border-l"
          >
            <section aria-labelledby="mn-suggested">
              <div className="flex items-center justify-between px-1">
                <h4 id="mn-suggested" className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0F1115]">
                  <Icon d={ICONS.sparkle} className="h-[13px] w-[13px] text-[#E0461F]" />
                  Suggested links
                </h4>
                <span className="text-[11.5px] text-[#7A808B]">{suggestions.length}</span>
              </div>
              {suggestions.length > 0 ? (
                <ul className="mt-2.5 space-y-2">
                  {suggestions.map((s) => (
                    <li
                      key={s.id}
                      className="group rounded-[9px] border border-[#ECEDF0] bg-white p-3 transition-colors hover:border-[#F6C3B2]"
                    >
                      <div className="flex items-start gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-medium text-[#1B1E25]">{s.title}</p>
                          <p className="mt-0.5 text-[11.5px] leading-snug text-[#6B717D]">{s.reason}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => linkSuggestion(s)}
                          className="inline-flex h-6 shrink-0 items-center gap-1 rounded-[6px] bg-[#0F1115] px-2 text-[11.5px] font-medium text-white transition-colors hover:bg-[#E0461F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2542D]"
                          aria-label={`Link ${s.title}`}
                        >
                          <Icon d={ICONS.link} className="h-3 w-3" />
                          Link
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mn-in mt-2.5 rounded-[9px] border border-dashed border-[#E3E4E8] px-3 py-3 text-[12px] text-[#6B717D]">
                  All caught up. Mneme will suggest more as you write.{" "}
                  <button
                    type="button"
                    onClick={reset}
                    className="font-medium text-[#B83A15] underline-offset-2 hover:underline"
                  >
                    Reset demo
                  </button>
                </div>
              )}
            </section>

            <section aria-labelledby="mn-backlinks" className="mt-6">
              <div className="flex items-center justify-between px-1">
                <h4 id="mn-backlinks" className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0F1115]">
                  <Icon d={ICONS.link} className="h-[13px] w-[13px] text-[#6B717D]" />
                  Backlinks
                </h4>
                <span className="text-[11.5px] text-[#7A808B]">{backlinks.length}</span>
              </div>
              <ul className="mt-2 divide-y divide-[#F0F1F3]">
                {backlinks.map((b) => (
                  <li
                    key={b.title}
                    className={`px-1 py-2.5 ${b.fresh ? "mn-in rounded-[8px] bg-[#FFF4EF]" : ""}`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-[13px] font-medium text-[#1B1E25]">{b.title}</p>
                      <span className={`shrink-0 text-[11px] ${b.fresh ? "font-medium text-[#B83A15]" : "text-[#8A909B]"}`}>
                        {b.meta}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-[#6B717D]">{b.snippet}</p>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        {/* command palette */}
        {paletteOpen && (
          <div className="absolute inset-0 z-20 flex items-start justify-center bg-[#0F1115]/20 px-3 pt-14 backdrop-blur-[2px] sm:pt-20">
            <button
              type="button"
              aria-label="Close command palette"
              className="absolute inset-0 cursor-default"
              onClick={closePalette}
              tabIndex={-1}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Ask your notes"
              className="mn-pop relative w-full max-w-[560px] overflow-hidden rounded-[12px] border border-[#DADCE0] bg-white shadow-[0_24px_64px_-12px_rgba(16,18,24,.35)]"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask();
                }}
                className="flex items-center gap-2.5 border-b border-[#ECEDF0] px-4"
              >
                <Icon d={ICONS.sparkle} className="text-[#E0461F]" />
                <label htmlFor="mn-ask" className="sr-only">
                  Ask your notes
                </label>
                <input
                  id="mn-ask"
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 flex-1 bg-transparent text-[14.5px] text-[#0F1115] outline-none placeholder:text-[#9AA0AB]"
                  placeholder="Ask anything you’ve written down…"
                  autoComplete="off"
                />
                <Kbd>esc</Kbd>
              </form>
              <div className="px-4 py-4" aria-live="polite">
                <p className="text-[11px] font-medium tracking-wide text-[#8A909B] uppercase">Answer from your notes</p>
                {answerState !== "done" ? (
                  <div className="mt-3 space-y-2" aria-label="Searching 1,284 notes">
                    <div className="mn-shimmer h-3 w-[92%] rounded bg-[#F0F1F3]" />
                    <div className="mn-shimmer h-3 w-[78%] rounded bg-[#F0F1F3]" />
                    <div className="mn-shimmer h-3 w-[54%] rounded bg-[#F0F1F3]" />
                    <p className="pt-1 text-[12px] text-[#7A808B]">Reading 1,284 notes…</p>
                  </div>
                ) : (
                  <div className="mn-in">
                    <p className="mt-2 text-[14px] leading-[1.65] text-[#2A2E37]">
                      Most people were fine with $8 a month but balked at paying annually before they’d formed a
                      habit<Cite n={1} />. Two asked for a longer trial instead of a discount<Cite n={2} />, and
                      August’s churn survey says the same thing in different words: “not ready to commit yet.”
                      <Cite n={3} />
                    </p>
                    <ul className="mt-4 space-y-1">
                      {[
                        ["Pricing interviews — synthesis", "Sep 22"],
                        ["Interview — Priya Raman", "Sep 9"],
                        ["Churn survey — Aug 2026", "Aug 30"],
                      ].map(([t, d], i) => (
                        <li
                          key={t}
                          className={`flex items-center gap-2.5 rounded-[7px] px-2 py-1.5 text-[13px] ${i === 0 ? "bg-[#F5F5F7]" : ""}`}
                        >
                          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-[#FFEDE6] font-mono text-[10.5px] font-medium text-[#B83A15]">
                            {i + 1}
                          </span>
                          <span className="flex-1 truncate text-[#1B1E25]">{t}</span>
                          <span className="text-[11.5px] text-[#8A909B]">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-[#ECEDF0] bg-[#FAFAFB] px-4 py-2 text-[11.5px] text-[#6B717D]">
                <span className="flex items-center gap-1.5">
                  <Icon d={ICONS.lock} className="h-3 w-3" />
                  Answered on-device from your notes only
                </span>
                <span className="hidden items-center gap-1 sm:flex">
                  <Kbd>↵</Kbd> ask again
                </span>
              </div>
            </div>
          </div>
        )}

        {/* toast */}
        <div aria-live="polite" className="pointer-events-none absolute right-4 bottom-4 left-4 flex justify-center sm:left-auto">
          {toast && (
            <div className="mn-in flex items-center gap-2 rounded-[9px] bg-[#0F1115] px-3.5 py-2.5 text-[12.5px] text-white shadow-lg">
              <Icon d={ICONS.link} className="h-3.5 w-3.5 text-[#FF8A66]" />
              {toast}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 inline-flex h-[15px] min-w-[15px] -translate-y-px items-center justify-center rounded-[4px] bg-[#FFEDE6] px-[3px] font-mono text-[9.5px] font-medium text-[#B83A15]">
      {n}
    </sup>
  );
}

function Task({ children, done = false }: { children: React.ReactNode; done?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        aria-hidden
        className={`mt-[5px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[4px] border ${
          done ? "border-[#E0461F] bg-[#E0461F]" : "border-[#C9CCD2] bg-white"
        }`}
      >
        {done && (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="white" strokeWidth="2">
            <path d="M2.5 6.2l2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={done ? "text-[#8A909B] line-through decoration-[#C9CCD2]" : ""}>
        <span className="sr-only">{done ? "Done: " : "To do: "}</span>
        {children}
      </span>
    </li>
  );
}

function SideItem({
  icon,
  label,
  count,
  hint,
  active = false,
}: {
  icon: string;
  label: string;
  count?: number;
  hint?: string;
  active?: boolean;
}) {
  return (
    <li
      className={`flex h-7 items-center gap-2 rounded-[6px] px-2 ${
        active ? "bg-white font-medium text-[#0F1115] shadow-[0_0_0_1px_#E6E7EA,0_1px_2px_rgba(16,18,24,.05)]" : ""
      }`}
    >
      <Icon d={icon} className={active ? "text-[#E0461F]" : "text-[#8A909B]"} />
      <span className="flex-1 truncate">{label}</span>
      {count !== undefined && <span className="text-[11px] text-[#8A909B]">{count}</span>}
      {hint && <span className="font-mono text-[10.5px] text-[#8A909B]">{hint}</span>}
    </li>
  );
}
