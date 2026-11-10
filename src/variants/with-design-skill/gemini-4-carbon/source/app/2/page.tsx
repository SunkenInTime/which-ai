"use client";

import { useState } from "react";

type HighlightKey = "reverberation" | "threshold" | "attention";

interface MarginRecall {
  id: HighlightKey;
  quoteLabel: string;
  myMarginNote: string;
  recalledTitle: string;
  recalledDate: string;
  recalledSource: string;
  recalledExcerpt: string;
}

const MARGIN_RECALLS: Record<HighlightKey, MarginRecall> = {
  reverberation: {
    id: "reverberation",
    quoteLabel: "Selected passage on room decay",
    myMarginNote:
      "Silence in a hall isn't zero decibels; it is hearing the room let go of the last violin note.",
    recalledTitle: "Shoebox proportions in Vienna's Musikverein",
    recalledDate: "18 October 2024",
    recalledSource: "Beranek, Concert Halls and Opera Houses, p. 92",
    recalledExcerpt:
      "Plaster ornament along narrow side walls scatters high frequencies early while holding a two-second warm decay, letting listeners feel enveloped without muddying speech.",
  },
  threshold: {
    id: "threshold",
    quoteLabel: "Selected passage on entryways",
    myMarginNote:
      "Compare this to stepping off a loud avenue into a courtyard garden before entering the studio.",
    recalledTitle: "Gravel paths as acoustic decompression",
    recalledDate: "4 May 2025",
    recalledSource: "Walking notes in Kanazawa",
    recalledExcerpt:
      "Three turns of wet stepping stones drop street traffic by twelve decibels and force your stride to slow down so your eyes adjust before reaching the threshold.",
  },
  attention: {
    id: "attention",
    quoteLabel: "Selected passage on uninterrupted hours",
    myMarginNote:
      "Software interfaces need acoustic thresholds too: no badges, no unread counters waiting at the door.",
    recalledTitle: "Why notebooks never ask what you missed",
    recalledDate: "9 January 2026",
    recalledSource: "Personal journal",
    recalledExcerpt:
      "A paper notebook looks identical whether you opened it yesterday or three summers ago. Returning to your own thoughts should carry zero guilt.",
  },
};

export default function IterationTwoPage() {
  const [selected, setSelected] = useState<HighlightKey>("reverberation");
  const [keptIds, setKeptIds] = useState<Record<HighlightKey, boolean>>({
    reverberation: true,
    threshold: false,
    attention: false,
  });

  const activeRecall = MARGIN_RECALLS[selected];
  const isKept = keptIds[selected];

  function toggleKeep(key: HighlightKey) {
    setKeptIds((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div
      className="min-h-screen bg-[#191624] text-[#EDE6D6] selection:bg-[#E4A84A] selection:text-[#191624]"
      style={{ fontFamily: "var(--font-literata), Georgia, serif" }}
    >
      {/* Subtle Tungsten Lamp Glow at Top of Desk */}
      <div
        aria-hidden="true"
        className="pointer-events-none h-1 w-full bg-gradient-to-r from-transparent via-[#E4A84A]/55 to-transparent"
      />

      {/* Quiet Header */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-7 sm:px-10">
        <div className="flex items-baseline gap-4">
          <span className="text-2xl font-medium tracking-tight text-[#F5EFE2]">
            Cairn
          </span>
          <span className="hidden text-sm text-[#A39AB8] sm:inline">
            A quiet room for what you read and write
          </span>
        </div>

        <nav aria-label="Primary" className="flex items-center gap-7 text-sm text-[#C7BEDA]">
          <a
            href="#marginalia-essay"
            className="hidden hover:text-[#F5EFE2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E4A84A] sm:inline"
          >
            Why highlights vanish
          </a>
          <a
            href="#colophon"
            className="rounded-full border border-[#E4A84A]/50 bg-[#E4A84A]/12 px-4 py-1.5 text-[#F4CA80] transition-colors hover:bg-[#E4A84A] hover:text-[#191624] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4A84A]"
          >
            Download Cairn
          </a>
        </nav>
      </header>

      <main>
        {/* Literary Masthead */}
        <section className="mx-auto max-w-4xl px-6 pt-8 pb-12 text-center sm:px-10 sm:pt-12">
          <h1 className="mx-auto max-w-[22ch] text-4xl font-normal leading-[1.16] tracking-[-0.025em] text-[#F6F0E4] sm:text-5xl lg:text-[3.4rem]">
            Everything you underline stays awake beside what you write next.
          </h1>
          <p className="mx-auto mt-6 max-w-[54ch] text-lg leading-[1.72] text-[#BEB6D2]">
            Highlights usually sink to the bottom of a reading app, severed from
            the drafts that need them. Cairn keeps your books, PDFs, and working
            notes in one lamp-lit margin.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#colophon"
              className="rounded-full bg-[#E4A84A] px-6 py-3 text-base font-medium text-[#191624] transition-colors hover:bg-[#EEB862] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4A84A]"
            >
              Download for macOS
            </a>
            <a
              href="#open-spread"
              className="rounded-full border border-[#A39AB8]/35 px-6 py-3 text-base text-[#EDE6D6] transition-colors hover:border-[#EDE6D6]/60 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4A84A]"
            >
              Read the interactive margin
            </a>
          </div>
        </section>

        {/* Hero Centerpiece: Open Book Folio & Living Margin */}
        <section id="open-spread" className="mx-auto max-w-5xl px-6 pb-20 sm:px-10">
          <div className="overflow-hidden rounded-2xl border border-[#A39AB8]/20 bg-[#242033]">
            {/* Folio Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A39AB8]/15 bg-[#1E1A2B] px-6 py-3 text-xs text-[#A39AB8] sm:px-8">
              <span>Reading: Rasmussen, Experiencing Architecture (Chapter 9)</span>
              <span>Click any amber-underlined sentence to inspect its margin</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Page: Book Passage with Interactive Highlights */}
              <div className="border-b border-[#A39AB8]/15 p-7 sm:p-10 lg:col-span-7 lg:border-r lg:border-b-0">
                <p className="text-xs text-[#9C93B3]">Page 224</p>

                <div className="mt-5 space-y-6 text-[17px] leading-[1.82] text-[#E6DFCE]">
                  <p>
                    We seldom notice that we hear architecture just as surely as
                    we see it. Walk into a vaulted stone baptistery after rain
                    and{" "}
                    <button
                      type="button"
                      onClick={() => setSelected("reverberation")}
                      aria-pressed={selected === "reverberation"}
                      className={`inline cursor-pointer rounded px-1 py-0.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4A84A] ${
                        selected === "reverberation"
                          ? "bg-[#E4A84A]/28 text-[#FFF8EB] underline decoration-[#E4A84A] decoration-2 underline-offset-4"
                          : "bg-[#E4A84A]/10 text-[#F2E9D8] underline decoration-[#E4A84A]/55 decoration-1 underline-offset-4 hover:bg-[#E4A84A]/20"
                      }`}
                    >
                      the room answers even the rustle of a coat with a long,
                      patient decay
                    </button>
                    , teaching every visitor to lower their voice without a
                    single sign on the wall.
                  </p>

                  <p>
                    Builders of older cloisters understood that{" "}
                    <button
                      type="button"
                      onClick={() => setSelected("threshold")}
                      aria-pressed={selected === "threshold"}
                      aria-label="Inspect margin note on entryways"
                      className={`inline cursor-pointer rounded px-1 py-0.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4A84A] ${
                        selected === "threshold"
                          ? "bg-[#E4A84A]/28 text-[#FFF8EB] underline decoration-[#E4A84A] decoration-2 underline-offset-4"
                          : "bg-[#E4A84A]/10 text-[#F2E9D8] underline decoration-[#E4A84A]/55 decoration-1 underline-offset-4 hover:bg-[#E4A84A]/20"
                      }`}
                    >
                      a narrow stone passage between street and courtyard washes
                      city noise from the ear
                    </button>{" "}
                    before one reaches the study door. Transition is a physical
                    medium, not wasted floor area.
                  </p>

                  <p>
                    When modern rooms strip away texture in pursuit of flatness,
                    they flatten concentration as well;{" "}
                    <button
                      type="button"
                      onClick={() => setSelected("attention")}
                      aria-pressed={selected === "attention"}
                      className={`inline cursor-pointer rounded px-1 py-0.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4A84A] ${
                        selected === "attention"
                          ? "bg-[#E4A84A]/28 text-[#FFF8EB] underline decoration-[#E4A84A] decoration-2 underline-offset-4"
                          : "bg-[#E4A84A]/10 text-[#F2E9D8] underline decoration-[#E4A84A]/55 decoration-1 underline-offset-4 hover:bg-[#E4A84A]/20"
                      }`}
                    >
                      sustained thought asks for shelter from sudden glare and
                      uninvited interruption
                    </button>
                    .
                  </p>
                </div>
              </div>

              {/* Right Margin: Handwritten/Typed Marginalia + Surfaced Old Note */}
              <aside
                aria-live="polite"
                className="flex flex-col justify-between bg-[#1F1B2C] p-7 sm:p-9 lg:col-span-5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#E4A84A]">
                    <span>{activeRecall.quoteLabel}</span>
                    <span>Margin note</span>
                  </div>

                  {/* Tonight's Margin Note */}
                  <blockquote className="mt-4 border-l-2 border-[#E4A84A] pl-4 text-base leading-[1.7] text-[#F4EEE0]">
                    “{activeRecall.myMarginNote}”
                  </blockquote>

                  {/* Surfaced Past Note */}
                  <div className="mt-7 rounded-xl border border-[#A39AB8]/20 bg-[#282338] p-5">
                    <div className="flex items-center justify-between text-xs text-[#B6ADD0]">
                      <span>Recalled from your archive</span>
                      <span>{activeRecall.recalledDate}</span>
                    </div>

                    <h2 className="mt-2.5 text-base font-medium text-[#F6F0E4]">
                      {activeRecall.recalledTitle}
                    </h2>

                    <p className="mt-2 text-sm leading-[1.68] text-[#CFC8DF]">
                      {activeRecall.recalledExcerpt}
                    </p>

                    <p className="mt-3 text-xs text-[#9C93B3]">
                      Source: {activeRecall.recalledSource}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#A39AB8]/15 pt-4">
                  <span className="text-xs text-[#A39AB8]">
                    {isKept
                      ? "Pinned to this passage with page citation"
                      : "Suggested kinship in local vault"}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleKeep(selected)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4A84A] ${
                      isKept
                        ? "bg-[#E4A84A]/20 text-[#F4CA80] border border-[#E4A84A]/45"
                        : "bg-[#E4A84A] text-[#191624] hover:bg-[#EEB862]"
                    }`}
                  >
                    {isKept ? "Pinned in margin" : "Pin link in margin"}
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Essayistic Column with Outdented Marginalia (Renaissance Scholarly Layout) */}
        <section
          id="marginalia-essay"
          className="border-t border-[#A39AB8]/15 py-20 lg:py-24"
        >
          <div className="mx-auto max-w-5xl px-6 sm:px-10">
            <div className="space-y-16">
              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <h2 className="text-2xl font-normal leading-snug text-[#F6F0E4] sm:text-3xl">
                    Memory forms in conversation with a page, not inside an
                    empty database table.
                  </h2>
                  <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.78] text-[#C8C0DA]">
                    Think of the books on your shelf whose margins you penciled
                    five years ago. Flipping one open restores not just the
                    author&apos;s argument, but who you were when you read it
                    and what problem you were wrestling with that month. Cairn
                    preserves that exact spatial bond for PDFs, EPUBs, and saved
                    web essays.
                  </p>
                </div>
                <aside className="self-end border-l border-[#E4A84A]/40 pl-5 text-sm leading-[1.7] text-[#A9A0BF] lg:col-span-5">
                  <p className="font-medium text-[#E4A84A]">
                    Exact page numbers survive
                  </p>
                  <p className="mt-1">
                    Drag any highlighted sentence from a PDF into a draft and
                    Cairn carries the author, title, and page number quietly
                    underneath so you never hunt for a citation at midnight.
                  </p>
                </aside>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <h2 className="text-2xl font-normal leading-snug text-[#F6F0E4] sm:text-3xl">
                    No red notification dots, no daily streaks, no guilt after
                    a quiet summer away.
                  </h2>
                  <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.78] text-[#C8C0DA]">
                    Productivity software treats an unvisited inbox like a debt.
                    A library never scolds you for taking August off. Open Cairn
                    after six months of fieldwork and your reading table sits
                    exactly where you left the lamp switched off, ready to pick
                    up mid-sentence.
                  </p>
                </div>
                <aside className="self-end border-l border-[#A39AB8]/35 pl-5 text-sm leading-[1.7] text-[#A9A0BF] lg:col-span-5">
                  <p className="font-medium text-[#EDE6D6]">
                    Private on your own disk
                  </p>
                  <p className="mt-1">
                    Your marginalia and unfinished thoughts are never sent to
                    external model servers. Every recall index runs locally on
                    Apple Silicon, Windows, or Linux.
                  </p>
                </aside>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <h2 className="text-2xl font-normal leading-snug text-[#F6F0E4] sm:text-3xl">
                    Import ten years of Kindle clippings, Readwise exports, or
                    plain Markdown folders in a minute.
                  </h2>
                  <p className="mt-4 max-w-[58ch] text-[17px] leading-[1.78] text-[#C8C0DA]">
                    Point Cairn at your existing notes folder or drop in your
                    `My Clippings.txt` file from an e-reader. Within moments,
                    scattered highlights from hundreds of half-remembered books
                    begin surfacing beside this week&apos;s writing.
                  </p>
                </div>
                <aside className="self-end border-l border-[#A39AB8]/35 pl-5 text-sm leading-[1.7] text-[#A9A0BF] lg:col-span-5">
                  <p className="font-medium text-[#EDE6D6]">
                    Open formats in and out
                  </p>
                  <p className="mt-1">
                    Every book note saves as clean Markdown alongside your
                    original PDF or EPUB file, readable by any future tool.
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* Quiet Colophon CTA */}
        <section
          id="colophon"
          className="border-t border-[#A39AB8]/15 bg-[#1F1B2C] py-20"
        >
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
            <h2 className="text-3xl font-normal leading-snug text-[#F6F0E4] sm:text-4xl">
              Pull up a chair to everything you have ever read.
            </h2>
            <p className="mx-auto mt-4 max-w-[50ch] text-base leading-[1.75] text-[#BEB6D2]">
              Free forever for local vaults on macOS, Windows, and Linux.
              Optional encrypted sync with our iPad and iPhone reader is $48 a
              year.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#colophon"
                className="rounded-full bg-[#E4A84A] px-7 py-3.5 text-base font-medium text-[#191624] transition-colors hover:bg-[#EEB862] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4A84A]"
              >
                Download Cairn 2.4 for macOS
              </a>
              <a
                href="#colophon"
                className="rounded-full border border-[#A39AB8]/35 px-6 py-3.5 text-base text-[#EDE6D6] transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4A84A]"
              >
                Windows & Linux installers
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#A39AB8]/15 bg-[#191624] py-8 text-xs text-[#9188A8]">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row sm:px-10">
          <span>Cairn Reader and Notebook, crafted for long-term thinkers</span>
          <div className="flex flex-wrap gap-6">
            <a href="#open-spread" className="hover:text-[#EDE6D6]">
              Kindle & PDF importer
            </a>
            <a href="#marginalia-essay" className="hover:text-[#EDE6D6]">
              Local privacy promise
            </a>
            <a href="#colophon" className="hover:text-[#EDE6D6]">
              Changelog
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
