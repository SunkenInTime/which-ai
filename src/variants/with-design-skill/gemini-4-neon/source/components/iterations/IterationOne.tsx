"use client";

import { useState } from "react";

interface SlipCard {
  id: string;
  shelfCode: string;
  title: string;
  thread: "Memory" | "Reading" | "Place";
  ruleColor: string;
  excerpt: string;
  highlighted: string;
  afterHighlight: string;
  source: string;
  linksTo: string[];
}

const SLIP_CARDS: SlipCard[] = [
  {
    id: "spaced-retrieval",
    shelfCode: "4b",
    title: "Forgetting helps you remember",
    thread: "Memory",
    ruleColor: "#D64550",
    excerpt: "When a note returns just as it begins to fade, ",
    highlighted: "the effort of pulling it back strengthens the link",
    afterHighlight:
      " far more than rereading a clean summary the same evening.",
    source: "Notes from Bjork on desirable difficulty, Oct 14",
    linksTo: ["walking-recall", "reading-pen"],
  },
  {
    id: "walking-recall",
    shelfCode: "4b1",
    title: "Why ideas arrive on a walk",
    thread: "Place",
    ruleColor: "#1D4ED8",
    excerpt: "Away from the desk, your mind stops sorting by folder. ",
    highlighted: "Two unrelated observations finally sit on the same table",
    afterHighlight:
      " and you notice they describe the same problem.",
    source: "Morning walk along the river path, Nov 02",
    linksTo: ["spaced-retrieval", "rooms-memory"],
  },
  {
    id: "reading-pen",
    shelfCode: "7a",
    title: "Read with a pen in hand",
    thread: "Reading",
    ruleColor: "#1D4ED8",
    excerpt: "Highlighting a paragraph feels productive, yet ",
    highlighted: "rewriting the claim in two plain sentences of your own",
    afterHighlight:
      " is the moment the idea actually becomes yours to reuse.",
    source: "Margin note in Montaigne's Essays, Sep 28",
    linksTo: ["spaced-retrieval", "rooms-memory"],
  },
  {
    id: "rooms-memory",
    shelfCode: "9c",
    title: "Rooms hold conversations",
    thread: "Place",
    ruleColor: "#D64550",
    excerpt: "Just as you remember which shelf a book lives on, ",
    highlighted: "a note placed beside its neighbors stays easy to find",
    afterHighlight:
      " years after you forget the exact phrase you typed.",
    source: "Sketchbook entry after visiting the city library, Nov 11",
    linksTo: ["walking-recall", "reading-pen"],
  },
];

const THREADS = ["All cards", "Memory", "Reading", "Place"] as const;

export function IterationOne() {
  const [selectedThread, setSelectedThread] =
    useState<(typeof THREADS)[number]>("All cards");
  const [activeCardId, setActiveCardId] = useState<string>("spaced-retrieval");
  const [downloadChoice, setDownloadChoice] = useState<string | null>(null);

  const visibleCards =
    selectedThread === "All cards"
      ? SLIP_CARDS
      : SLIP_CARDS.filter((c) => c.thread === selectedThread);

  const activeCard =
    SLIP_CARDS.find((c) => c.id === activeCardId) ?? SLIP_CARDS[0];

  return (
    <div
      className="desk-grid-bg min-h-screen text-[#14213D]"
      style={{
        fontFamily: "var(--font-instrument-sans), system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header className="border-b border-[#14213D]/12 bg-[#F5F7FA]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
          <a
            href="#top"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
          >
            <span
              aria-hidden="true"
              className="flex h-6 w-7 flex-col justify-start overflow-hidden border border-[#14213D] bg-white"
            >
              <span className="mt-1.5 h-[2px] w-full bg-[#D64550]" />
              <span className="mt-1 h-px w-full bg-[#1D4ED8]/35" />
              <span className="mt-1 h-px w-full bg-[#1D4ED8]/35" />
            </span>
            <span
              className="text-lg font-medium tracking-tight text-[#14213D]"
              style={{ fontFamily: "var(--font-literata), Georgia, serif" }}
            >
              Commonplace
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm text-[#475569] md:flex"
          >
            <a
              href="#sequence"
              className="transition-colors hover:text-[#14213D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
            >
              How it works
            </a>
            <a
              href="#principles"
              className="transition-colors hover:text-[#14213D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
            >
              Why index cards
            </a>
            <a
              href="#download"
              className="transition-colors hover:text-[#14213D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
            >
              Pricing
            </a>
          </nav>

          <a
            href="#download"
            className="border border-[#14213D] bg-[#14213D] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8] hover:border-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            Download app
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero Split with Interactive Slip-Box */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 lg:px-10 lg:pb-28 lg:pt-20">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Copy Column */}
            <div className="lg:col-span-5 lg:pt-6">
              <h1
                className="text-4xl font-normal leading-[1.12] tracking-[-0.02em] text-[#14213D] sm:text-5xl"
                style={{ fontFamily: "var(--font-literata), Georgia, serif" }}
              >
                Keep every useful thought within arm&apos;s reach.
              </h1>

              <p className="mt-6 max-w-[44ch] text-base leading-[1.68] text-[#475569] sm:text-lg">
                Commonplace is a quiet second brain modeled on a physical
                slip-box. Jot a note in seconds, tie it to related cards, and
                let older reading resurface right when you sit down to write.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#download"
                  className="bg-[#1D4ED8] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#14213D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  Start a free vault
                </a>
                <a
                  href="#sequence"
                  className="border border-[#14213D]/25 bg-white px-5 py-3 text-sm font-medium text-[#14213D] transition-colors hover:border-[#14213D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  See how notes connect
                </a>
              </div>

              <p className="mt-6 text-sm text-[#475569]">
                Plain Markdown files on your drive. Works offline on Mac,
                Windows, Linux, and iOS.
              </p>
            </div>

            {/* Right Interactive Slip-Box Desk */}
            <div className="lg:col-span-7">
              <div className="border border-[#14213D]/18 bg-[#E9EEF5]/75 p-4 sm:p-6">
                {/* Desk toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#14213D]/12 pb-4">
                  <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter slip-box by thread">
                    {THREADS.map((thread) => {
                      const active = selectedThread === thread;
                      return (
                        <button
                          key={thread}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => {
                            setSelectedThread(thread);
                            if (thread !== "All cards") {
                              const first = SLIP_CARDS.find(
                                (c) => c.thread === thread
                              );
                              if (first) setActiveCardId(first.id);
                            }
                          }}
                          className={`px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1D4ED8] ${
                            active
                              ? "bg-[#14213D] text-white"
                              : "bg-white/80 text-[#475569] hover:bg-white hover:text-[#14213D]"
                          }`}
                        >
                          {thread}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs text-[#475569]">
                    Click any card to trace its links
                  </span>
                </div>

                {/* Index cards grid */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {visibleCards.map((card) => {
                    const isSelected = card.id === activeCard.id;
                    const isLinked = activeCard.linksTo.includes(card.id);
                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => setActiveCardId(card.id)}
                        className={`index-card-rules group relative flex flex-col justify-between border bg-white p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                          isSelected
                            ? "border-[#1D4ED8] ring-1 ring-[#1D4ED8]"
                            : isLinked
                              ? "border-[#14213D]/55"
                              : "border-[#CBD5E1] hover:border-[#14213D]/45"
                        }`}
                      >
                        {/* Classic index card colored top ruling stripe */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-[3px]"
                          style={{ backgroundColor: card.ruleColor }}
                        />

                        <div>
                          <div className="flex items-baseline justify-between gap-2 pt-1">
                            <span className="text-xs font-medium text-[#1D4ED8]">
                              Card {card.shelfCode}
                            </span>
                            {isSelected ? (
                              <span className="bg-[#1D4ED8] px-1.5 py-0.5 text-[11px] font-medium text-white">
                                Open
                              </span>
                            ) : isLinked ? (
                              <span className="bg-[#FEF08A] px-1.5 py-0.5 text-[11px] font-medium text-[#14213D]">
                                Linked
                              </span>
                            ) : (
                              <span className="text-[11px] text-[#64748B]">
                                {card.thread}
                              </span>
                            )}
                          </div>

                          <h2
                            className="mt-2.5 text-base font-medium leading-snug text-[#14213D]"
                            style={{
                              fontFamily: "var(--font-literata), Georgia, serif",
                            }}
                          >
                            {card.title}
                          </h2>

                          <p
                            className="mt-2 text-[13px] leading-[1.6] text-[#334155]"
                            style={{
                              fontFamily: "var(--font-literata), Georgia, serif",
                            }}
                          >
                            {card.excerpt}
                            <mark className="bg-[#FEF08A] px-0.5 text-[#14213D]">
                              {card.highlighted}
                            </mark>
                            {card.afterHighlight}
                          </p>
                        </div>

                        <div className="mt-4 border-t border-[#14213D]/10 pt-2.5 text-[11px] text-[#64748B]">
                          {card.source}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active card backlinks bar */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border border-[#14213D]/15 bg-white px-4 py-3 text-xs">
                  <span className="text-[#475569]">
                    Card <strong className="font-medium text-[#14213D]">{activeCard.shelfCode}</strong> links directly to:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeCard.linksTo.map((targetId) => {
                      const target = SLIP_CARDS.find((c) => c.id === targetId);
                      if (!target) return null;
                      return (
                        <button
                          key={target.id}
                          type="button"
                          onClick={() => {
                            setSelectedThread("All cards");
                            setActiveCardId(target.id);
                          }}
                          className="border border-[#1D4ED8]/30 bg-[#EFF6FF] px-2.5 py-1 font-medium text-[#1D4ED8] hover:border-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1D4ED8]"
                        >
                          {target.shelfCode} {target.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* True Sequential Section: How a note matures */}
        <section
          id="sequence"
          className="border-y border-[#14213D]/12 bg-white py-20 lg:py-24"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <h2
                className="text-3xl font-normal tracking-[-0.015em] text-[#14213D] sm:text-4xl"
                style={{ fontFamily: "var(--font-literata), Georgia, serif" }}
              >
                From a fleeting sentence to an essay you can stand behind.
              </h2>
              <p className="mt-4 text-base leading-[1.65] text-[#475569]">
                Every finished piece starts as a half-remembered line from a
                book or a walk. Commonplace guides a note through three quiet
                stages without asking you to maintain folders.
              </p>
            </div>

            <ol className="mt-14 grid gap-10 border-t border-[#14213D]/12 pt-10 md:grid-cols-3 md:gap-8">
              <li>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center border border-[#1D4ED8] text-xs font-semibold text-[#1D4ED8]">
                    1
                  </span>
                  <h3 className="text-lg font-medium text-[#14213D]">
                    Capture without sorting
                  </h3>
                </div>
                <p className="mt-4 max-w-[34ch] text-sm leading-[1.7] text-[#475569]">
                  Press one shortcut anywhere on your computer to open a blank
                  card. Type the thought, clip a quote, or drop in a photo of a
                  book page, then return to what you were doing.
                </p>
              </li>

              <li>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center border border-[#1D4ED8] text-xs font-semibold text-[#1D4ED8]">
                    2
                  </span>
                  <h3 className="text-lg font-medium text-[#14213D]">
                    Connect while it is fresh
                  </h3>
                </div>
                <p className="mt-4 max-w-[34ch] text-sm leading-[1.7] text-[#475569]">
                  As you write, Commonplace quietly places older cards with
                  shared terms in the right margin. Link two cards with a click
                  so both remember why they belong together.
                </p>
              </li>

              <li>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center border border-[#1D4ED8] text-xs font-semibold text-[#1D4ED8]">
                    3
                  </span>
                  <h3 className="text-lg font-medium text-[#14213D]">
                    Compose from a full table
                  </h3>
                </div>
                <p className="mt-4 max-w-[34ch] text-sm leading-[1.7] text-[#475569]">
                  When a memo, chapter, or talk is due, spread a thread of
                  linked cards onto a single writing desk. Arrange the order
                  and export straight to clean Markdown or PDF.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Editorial Prose + Margin Annotations */}
        <section id="principles" className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="space-y-16">
            <article className="grid gap-6 border-b border-[#14213D]/12 pb-14 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <h2
                  className="text-2xl font-normal text-[#14213D] sm:text-3xl"
                  style={{ fontFamily: "var(--font-literata), Georgia, serif" }}
                >
                  Folders ask you to decide the future too early.
                </h2>
                <p className="mt-4 max-w-[58ch] text-base leading-[1.75] text-[#334155]">
                  When you file a note about Venetian canals under Travel, you
                  never see it again when you write about urban drainage three
                  winters later. A slip-box lets one note belong to every line
                  of inquiry it touches, without duplicating a single word.
                </p>
              </div>
              <aside className="border-l-2 border-[#D64550] bg-white px-5 py-4 lg:col-span-5 lg:self-center">
                <p
                  className="text-sm leading-[1.65] text-[#14213D]"
                  style={{ fontFamily: "var(--font-literata), Georgia, serif" }}
                >
                  &ldquo;A slip-box becomes a conversation partner once it holds
                  more connections than you can recall unaided.&rdquo;
                </p>
                <p className="mt-2 text-xs text-[#64748B]">
                  Margin note from Niklas Luhmann, Communicating with Slip Boxes
                </p>
              </aside>
            </article>

            <article className="grid gap-6 border-b border-[#14213D]/12 pb-14 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <h2
                  className="text-2xl font-normal text-[#14213D] sm:text-3xl"
                  style={{ fontFamily: "var(--font-literata), Georgia, serif" }}
                >
                  Your archive outlives the software that opened it.
                </h2>
                <p className="mt-4 max-w-[58ch] text-base leading-[1.75] text-[#334155]">
                  Every card in Commonplace is saved immediately as a plain text
                  file inside a regular folder on your hard drive. No
                  proprietary database lock-in, no account required to read your
                  own history twenty years from now.
                </p>
              </div>
              <aside className="border-l-2 border-[#1D4ED8] bg-white px-5 py-4 lg:col-span-5 lg:self-center">
                <p className="text-sm font-medium text-[#14213D]">
                  Open vault layout
                </p>
                <p className="mt-1.5 text-sm leading-[1.6] text-[#475569]">
                  ~/Documents/Commonplace/cards/spaced-retrieval.md
                </p>
                <p className="mt-2 text-xs text-[#64748B]">
                  Readable in any text editor, synced with end-to-end encryption
                  only if you turn sync on.
                </p>
              </aside>
            </article>
          </div>
        </section>

        {/* Download & Pricing Strip */}
        <section
          id="download"
          className="border-t border-[#14213D]/15 bg-[#14213D] py-20 text-white"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2
                  className="text-3xl font-normal leading-tight sm:text-4xl"
                  style={{ fontFamily: "var(--font-literata), Georgia, serif" }}
                >
                  Free on your desk. Eight dollars a month when you want sync.
                </h2>
                <p className="mt-4 max-w-[52ch] text-base leading-[1.68] text-[#CBD5E1]">
                  Use the full desktop app with unlimited local cards at no
                  cost. Add encrypted sync across phone, tablet, and second
                  machines whenever you are ready.
                </p>
              </div>

              <div className="lg:col-span-5 lg:text-right">
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setDownloadChoice("Commonplace-2.4-macOS.dmg ready")
                    }
                    className="bg-[#FEF08A] px-5 py-3 text-sm font-semibold text-[#14213D] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEF08A]"
                  >
                    Download for Mac
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDownloadChoice("Commonplace-2.4-Linux-Win.zip ready")
                    }
                    className="border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Windows &amp; Linux
                  </button>
                </div>

                {downloadChoice && (
                  <p
                    role="status"
                    className="mt-3 text-sm text-[#FEF08A]"
                  >
                    {downloadChoice} (18 MB offline installer, no account
                    needed).
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#14213D]/12 bg-[#F5F7FA] py-8 text-sm text-[#475569]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
          <span
            className="text-base text-[#14213D]"
            style={{ fontFamily: "var(--font-literata), Georgia, serif" }}
          >
            Commonplace
          </span>
          <div className="flex flex-wrap gap-6">
            <a href="#sequence" className="hover:text-[#14213D]">
              Method
            </a>
            <a href="#principles" className="hover:text-[#14213D]">
              Plain text promise
            </a>
            <a href="#download" className="hover:text-[#14213D]">
              Download
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
