"use client";

import { useState } from "react";

interface CaptureItem {
  id: string;
  tag: "Reading" | "Work" | "Life";
  text: string;
  linkedTo: string;
  time: string;
}

const INITIAL_CAPTURES: CaptureItem[] = [
  {
    id: "c1",
    tag: "Reading",
    text: "A great notebook invites rough handwriting; if it feels too precious, you stop bringing it everywhere.",
    linkedTo: "Why messy drafts move faster",
    time: "08:42",
  },
  {
    id: "c2",
    tag: "Work",
    text: "Ask the client what they already tried and disliked before sketching a single screen.",
    linkedTo: "Notes from studio critiques",
    time: "11:15",
  },
  {
    id: "c3",
    tag: "Life",
    text: "Roast carrots with cumin seeds and a squeeze of orange right after pulling them from the oven.",
    linkedTo: "Winter weeknight dinners",
    time: "Yesterday",
  },
];

const QUICK_PROMPTS: Array<{
  label: string;
  tag: CaptureItem["tag"];
  text: string;
}> = [
  {
    label: "Train thought",
    tag: "Life",
    text: "Notice how every conversation gets sharper when both people can sketch on the same napkin.",
  },
  {
    label: "Book quote",
    tag: "Reading",
    text: "Memory is not a recording device; it is a workshop that rebuilds a scene every time we visit.",
  },
  {
    label: "Project hunch",
    tag: "Work",
    text: "What if our onboarding started with one live example instead of three welcome slides?",
  },
];

const DAY_SPREADS = [
  {
    id: "morning",
    tab: "Morning capture",
    leftHeading: "08:15 at the kitchen table",
    leftBody:
      "You read four pages with coffee and spot a line worth keeping. Snap a photo or type two sentences into your daily page. No folder choice, no friction.",
    rightTitle: "Daily page for Nov 19",
    rightItems: [
      "Clipped passage on how bookbinders sew signatures so pages lie flat.",
      "Quick reminder to compare paper weights before ordering proofs.",
      "Auto-linked to: Tactile tools & physical craft",
    ],
  },
  {
    id: "midday",
    tab: "Midday links",
    leftHeading: "13:30 between meetings",
    leftBody:
      "A teammate mentions a tricky problem you read about last spring. Type two words, pull up the exact quote, and link today's decision right beside it.",
    rightTitle: "Connections surfaced automatically",
    rightItems: [
      "Matched note from April: Handling offline sync without conflict dialogs.",
      "Matched note from August: Plain-language error copy examples.",
      "Both added to the project index with one keystroke.",
    ],
  },
  {
    id: "evening",
    tab: "Evening draft",
    leftHeading: "20:00 turning notes into a piece",
    leftBody:
      "Instead of staring at a blinking cursor on a blank page, open the five notes you collected all week and stitch them into a finished letter or post.",
    rightTitle: "Draft assembled from 5 notes",
    rightItems: [
      "Opening anecdote pulled directly from Tuesday's train capture.",
      "Supporting quote already carries its book title and page number.",
      "Exported to clean Markdown with zero formatting cleanup.",
    ],
  },
];

function guessConnection(text: string, tag: CaptureItem["tag"]): string {
  const lower = text.toLowerCase();
  if (lower.includes("book") || lower.includes("read") || lower.includes("memory")) {
    return "Reading notes & memory craft";
  }
  if (lower.includes("design") || lower.includes("client") || lower.includes("project") || lower.includes("onboarding")) {
    return "Studio product sketches";
  }
  if (tag === "Reading") return "Books worth rereading";
  if (tag === "Work") return "Active project journal";
  return "Everyday observations";
}

export function IterationFive() {
  const [captures, setCaptures] = useState<CaptureItem[]>(INITIAL_CAPTURES);
  const [draftText, setDraftText] = useState<string>("");
  const [draftTag, setDraftTag] = useState<CaptureItem["tag"]>("Reading");
  const [activeSpreadId, setActiveSpreadId] = useState<string>("morning");
  const [installedNote, setInstalledNote] = useState<boolean>(false);

  const activeSpread =
    DAY_SPREADS.find((s) => s.id === activeSpreadId) ?? DAY_SPREADS[0];

  function handleSaveCapture(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = draftText.trim();
    if (!trimmed) return;
    const next: CaptureItem = {
      id: `user-${Date.now()}`,
      tag: draftTag,
      text: trimmed,
      linkedTo: guessConnection(trimmed, draftTag),
      time: "Just now",
    };
    setCaptures((prev) => [next, ...prev]);
    setDraftText("");
  }

  return (
    <div
      className="riso-paper min-h-screen text-[#1E1338]"
      style={{
        fontFamily: "var(--font-source-serif), Georgia, serif",
      }}
    >
      {/* Header */}
      <header className="border-b-2 border-[#1E1338] bg-[#F4F2FA]/95 backdrop-blur-sm">
        <div
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10"
          style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C3AE3]"
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-[#1E1338] bg-[#DCF56B] text-sm font-extrabold text-[#1E1338]"
            >
              C
            </span>
            <span className="text-xl font-bold tracking-[-0.02em] text-[#1E1338]">
              Commonplace
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm font-medium text-[#574B75] md:flex"
          >
            <a
              href="#playground"
              className="transition-colors hover:text-[#1E1338] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C3AE3]"
            >
              Try capture
            </a>
            <a
              href="#day-spread"
              className="transition-colors hover:text-[#1E1338] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C3AE3]"
            >
              A day in notes
            </a>
            <a
              href="#get-app"
              className="transition-colors hover:text-[#1E1338] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C3AE3]"
            >
              Pricing
            </a>
          </nav>

          <a
            href="#get-app"
            className="rounded-lg border-2 border-[#1E1338] bg-[#4C3AE3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1E1338] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C3AE3]"
          >
            Get the app
          </a>
        </div>
      </header>

      <main id="top">
        {/* Expressive Hero + Live Quick-Capture Playground */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="max-w-3xl">
            <h1
              className="text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] text-[#1E1338] sm:text-6xl lg:text-7xl"
              style={{
                fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              }}
            >
              Your mind makes sparks. Catch them before they cool.
            </h1>

            <p className="mt-6 max-w-[54ch] text-lg leading-[1.7] text-[#453960] sm:text-xl">
              Commonplace feels like your favorite pocket notebook, except every
              page remembers what it connects to and stays safely saved in plain
              files on your own device.
            </p>
          </div>

          {/* Interactive Live Capture Notebook */}
          <div
            id="playground"
            className="mt-12 grid gap-6 lg:grid-cols-12"
          >
            {/* Left Capture Form */}
            <div className="rounded-xl border-2 border-[#1E1338] bg-white p-6 shadow-[5px_5px_0_0_#1E1338] sm:p-7 lg:col-span-5">
              <div
                className="flex items-center justify-between"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                }}
              >
                <h2 className="text-lg font-bold text-[#1E1338]">
                  Try jotting a real note
                </h2>
                <span className="rounded-full bg-[#DCF56B] px-2.5 py-0.5 text-xs font-bold text-[#1E1338]">
                  Live notebook
                </span>
              </div>

              <form onSubmit={handleSaveCapture} className="mt-4">
                <label htmlFor="riso-capture" className="sr-only">
                  Write a fleeting note
                </label>
                <textarea
                  id="riso-capture"
                  rows={4}
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  placeholder="Write a quote, a hunch, or a sentence from today..."
                  className="w-full resize-none rounded-lg border-2 border-[#1E1338]/20 bg-[#F9F8FD] p-3.5 text-base leading-relaxed text-[#1E1338] placeholder:text-[#7D7199] focus:border-[#4C3AE3] focus:bg-white focus:outline-none"
                />

                {/* Tag selector */}
                <div
                  className="mt-4 flex flex-wrap items-center justify-between gap-3"
                  style={{
                    fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                  }}
                >
                  <div className="flex items-center gap-1.5" role="group" aria-label="Choose note tag">
                    {(["Reading", "Work", "Life"] as const).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setDraftTag(tag)}
                        aria-pressed={draftTag === tag}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4C3AE3] ${
                          draftTag === tag
                            ? "border-[#1E1338] bg-[#1E1338] text-[#DCF56B]"
                            : "border-[#1E1338]/25 bg-white text-[#574B75] hover:border-[#1E1338]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="rounded-lg border-2 border-[#1E1338] bg-[#4C3AE3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1E1338] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C3AE3]"
                  >
                    Tuck into notebook
                  </button>
                </div>
              </form>

              {/* One-click prompts */}
              <div
                className="mt-6 border-t border-[#1E1338]/12 pt-4"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                }}
              >
                <p className="text-xs font-medium text-[#574B75]">
                  Or load a sample prompt:
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.label}
                      type="button"
                      onClick={() => {
                        setDraftText(prompt.text);
                        setDraftTag(prompt.tag);
                      }}
                      className="rounded-md border border-[#4C3AE3]/35 bg-[#F4F2FA] px-2.5 py-1 text-xs font-medium text-[#4C3AE3] transition-colors hover:bg-[#4C3AE3] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4C3AE3]"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Live Notebook Stream */}
            <div className="rounded-xl border-2 border-[#1E1338] bg-white p-6 shadow-[5px_5px_0_0_#4C3AE3] sm:p-7 lg:col-span-7">
              <div
                className="flex items-baseline justify-between border-b-2 border-[#1E1338]/10 pb-3.5"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                }}
              >
                <h2 className="text-lg font-bold text-[#1E1338]">
                  Recent pages in your notebook
                </h2>
                <span className="text-xs font-medium text-[#574B75]">
                  {captures.length} notes saved
                </span>
              </div>

              <ul className="mt-4 divide-y divide-[#1E1338]/12">
                {captures.slice(0, 4).map((item) => (
                  <li key={item.id} className="py-4 first:pt-2 last:pb-1">
                    <div
                      className="flex items-center justify-between gap-2"
                      style={{
                        fontFamily:
                          "var(--font-bricolage), system-ui, sans-serif",
                      }}
                    >
                      <span className="rounded-full border border-[#1E1338] bg-[#DCF56B] px-2.5 py-0.5 text-[11px] font-bold text-[#1E1338]">
                        {item.tag}
                      </span>
                      <span className="text-xs text-[#6E628B]">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-2.5 text-base leading-[1.65] text-[#1E1338]">
                      {item.text}
                    </p>
                    <p
                      className="mt-2 text-xs font-medium text-[#4C3AE3]"
                      style={{
                        fontFamily:
                          "var(--font-bricolage), system-ui, sans-serif",
                      }}
                    >
                      Linked automatically to: {item.linkedTo}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tabbed Open-Notebook Day Spread */}
        <section
          id="day-spread"
          className="border-y-2 border-[#1E1338] bg-white py-20 lg:py-24"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2
                  className="text-3xl font-extrabold tracking-[-0.025em] text-[#1E1338] sm:text-4xl"
                  style={{
                    fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                  }}
                >
                  How one ordinary day fits together.
                </h2>
              </div>

              {/* Physical Divider Tabs */}
              <div
                className="relative z-10 flex flex-wrap gap-2 md:-mb-[2px]"
                role="tablist"
                aria-label="Parts of the day"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                }}
              >
                {DAY_SPREADS.map((spread) => {
                  const selected = spread.id === activeSpread.id;
                  return (
                    <button
                      key={spread.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveSpreadId(spread.id)}
                      className={`rounded-t-lg border-2 border-[#1E1338] px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C3AE3] ${
                        selected
                          ? "bg-[#DCF56B] text-[#1E1338] md:border-b-[#DCF56B]"
                          : "bg-[#F4F2FA] text-[#574B75] hover:text-[#1E1338]"
                      }`}
                    >
                      {spread.tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Open Notebook Two-Page Spread */}
            <div className="mt-3 grid overflow-hidden rounded-xl border-2 border-[#1E1338] bg-[#F4F2FA] md:mt-0 md:rounded-tr-none md:grid-cols-2">
              <div className="border-b-2 border-[#1E1338] p-7 sm:p-10 md:border-b-0 md:border-r-2">
                <h3
                  className="text-2xl font-bold text-[#1E1338]"
                  style={{
                    fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                  }}
                >
                  {activeSpread.leftHeading}
                </h3>
                <p className="mt-4 max-w-[44ch] text-base leading-[1.78] text-[#3B3054]">
                  {activeSpread.leftBody}
                </p>
              </div>

              <div className="bg-white p-7 sm:p-10">
                <h4
                  className="text-lg font-bold text-[#4C3AE3]"
                  style={{
                    fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                  }}
                >
                  {activeSpread.rightTitle}
                </h4>
                <ul className="mt-5 space-y-3.5">
                  {activeSpread.rightItems.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-base leading-[1.65] text-[#1E1338]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border border-[#1E1338] bg-[#DCF56B]"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Plain-Spoken Ownership List */}
        <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h3
                className="text-xl font-bold text-[#1E1338]"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                }}
              >
                Opens faster than a paper cover
              </h3>
              <p className="mt-3 text-base leading-[1.72] text-[#453960]">
                Native on macOS, Windows, Linux, and iOS so you are writing
                before the thought slips away.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-bold text-[#1E1338]"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                }}
              >
                Zero lock-in, ever
              </h3>
              <p className="mt-3 text-base leading-[1.72] text-[#453960]">
                Every page is plain Markdown sitting in your own folder. Take
                your entire second brain anywhere with a simple copy and paste.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-bold text-[#1E1338]"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                }}
              >
                Private by default
              </h3>
              <p className="mt-3 text-base leading-[1.72] text-[#453960]">
                No ad tracking, no model training on your journals, and optional
                end-to-end encrypted sync when you want it on your phone.
              </p>
            </div>
          </div>
        </section>

        {/* Bold Plum-Ink CTA Press Block */}
        <section id="get-app" className="px-6 pb-20 lg:px-10">
          <div className="mx-auto max-w-6xl rounded-2xl border-2 border-[#1E1338] bg-[#1E1338] px-7 py-14 text-white sm:px-12 sm:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2
                  className="text-3xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-5xl"
                  style={{
                    fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                  }}
                >
                  Keep your desktop notebook free forever.
                </h2>
                <p className="mt-4 max-w-[48ch] text-base leading-[1.7] text-[#D7CFE8] sm:text-lg">
                  Add encrypted sync across laptop, phone, and tablet for $8 a
                  month whenever you want your pages in your pocket.
                </p>
              </div>

              <div
                className="lg:col-span-5 lg:text-right"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                }}
              >
                <button
                  type="button"
                  onClick={() => setInstalledNote(true)}
                  className="rounded-xl border-2 border-[#DCF56B] bg-[#DCF56B] px-7 py-4 text-base font-bold text-[#1E1338] transition-colors hover:bg-white hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCF56B]"
                >
                  Download Commonplace
                </button>
                {installedNote && (
                  <p role="status" className="mt-3.5 text-sm text-[#DCF56B]">
                    Installer ready for Mac, Windows, and Linux. Start writing
                    offline right away.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="border-t-2 border-[#1E1338]/15 py-8 text-sm text-[#574B75]"
        style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
          <span className="font-bold text-[#1E1338]">Commonplace</span>
          <span>Made for everyday thinkers who keep notebooks everywhere</span>
        </div>
      </footer>
    </div>
  );
}
