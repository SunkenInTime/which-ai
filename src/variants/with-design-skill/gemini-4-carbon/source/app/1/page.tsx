"use client";

import { useState } from "react";

type SlipId = "14a" | "14b" | "27a" | "08d" | "31c";

interface SlipCard {
  id: SlipId;
  tabLabel: string;
  tabColor: string;
  tabTextColor: string;
  date: string;
  source: string;
  title: string;
  bodyBefore: string;
  linkOneId: SlipId;
  linkOneText: string;
  bodyMiddle: string;
  linkTwoId: SlipId;
  linkTwoText: string;
  bodyAfter: string;
  footnote: string;
}

const SLIPS: Record<SlipId, SlipCard> = {
  "14a": {
    id: "14a",
    tabLabel: "14a Concrete",
    tabColor: "#E8BE48",
    tabTextColor: "#123536",
    date: "12 Jan 2025",
    source: "Seymour et al., Science Advances",
    title: "Roman breakwaters strengthen in seawater",
    bodyBefore:
      "Harbor piers poured at Pozzuoli two thousand years ago still resist wave impact while modern Portland piers spall within fifty years. What engineers long dismissed as sloppy mixing turned out to be ",
    linkOneId: "14b",
    linkOneText: "unslaked quicklime clasts",
    bodyMiddle:
      " left intact inside the mortar. It reframes durability around ",
    linkTwoId: "27a",
    linkTwoText: "materials that mend themselves",
    bodyAfter: " instead of coatings meant to seal water out forever.",
    footnote: "Cited in harbor infrastructure essay draft, p. 4",
  },
  "14b": {
    id: "14b",
    tabLabel: "14b Quicklime",
    tabColor: "#79B497",
    tabTextColor: "#123536",
    date: "14 Jan 2025",
    source: "Lab bench notebook",
    title: "Hot-mixing traps brittle calcium reservoirs",
    bodyBefore:
      "Because quicklime reacts exothermically during hot mixing, porous lime pockets survive inside ",
    linkOneId: "14a",
    linkOneText: "Roman marine concrete",
    bodyMiddle:
      ". As hairlines open centuries later, rainwater dissolves that calcium and recrystallizes it right inside the gap. This only works when we treat ",
    linkTwoId: "31c",
    linkTwoText: "early micro-cracks as triggers",
    bodyAfter: " rather than structural failures to hide.",
    footnote: "Filed beside kiln temperature notes",
  },
  "27a": {
    id: "27a",
    tabLabel: "27a Mending",
    tabColor: "#6BA2D6",
    tabTextColor: "#123536",
    date: "03 Aug 2025",
    source: "Visit to Kyoto joinery workshop",
    title: "Objects designed to be opened, not sealed shut",
    bodyBefore:
      "Japanese temple sills use sacrificial cedar splices so damp rot can be planed out every forty years without lifting the roof. It shares a quiet philosophy with ",
    linkOneId: "08d",
    linkOneText: "snap-open appliance housings",
    bodyMiddle: " and with ",
    linkTwoId: "14a",
    linkTwoText: "self-recrystallizing harbor mortar",
    bodyAfter:
      ": longevity comes from making maintenance ordinary, never heroic.",
    footnote: "Used in talk for industrial design seminar",
  },
  "08d": {
    id: "08d",
    tabLabel: "08d Housings",
    tabColor: "#DE7A68",
    tabTextColor: "#123536",
    date: "19 Nov 2024",
    source: "Flea market teardown, Frankfurt",
    title: "Four brass machine screws on the back cover",
    bodyBefore:
      "Opened a 1958 pocket radio on the kitchen table with a coin. No solvent glue, no hidden plastic clips meant to snap once. Inside the lid was a paper schematic folded for whoever would own it forty years later, a direct cousin to ",
    linkOneId: "27a",
    linkOneText: "joinery built for future hands",
    bodyMiddle: " and ",
    linkTwoId: "31c",
    linkTwoText: "visible wear indicators",
    bodyAfter: " in mechanical bridges.",
    footnote: "Cross-linked to local-first software longevity",
  },
  "31c": {
    id: "31c",
    tabLabel: "31c Stress lines",
    tabColor: "#C8B8DB",
    tabTextColor: "#123536",
    date: "28 Feb 2026",
    source: "Conversation with structural inspector",
    title: "Whitewash reveals where the load actually travels",
    bodyBefore:
      "Old masonry vaults were lime-washed pale not for decoration, but so new hairline fissures showed immediately during spring thaw. Combine that legibility with ",
    linkOneId: "14b",
    linkOneText: "dormant quicklime pockets",
    bodyMiddle: " or ",
    linkTwoId: "08d",
    linkTwoText: "honest service access",
    bodyAfter:
      ", and aging stops being a surprise emergency.",
    footnote: "Sparked opening paragraph on software file formats",
  },
};

const SLIP_ORDER: SlipId[] = ["14a", "14b", "27a", "08d", "31c"];

export default function IterationOnePage() {
  const [activeId, setActiveId] = useState<SlipId>("14a");
  const activeSlip = SLIPS[activeId];
  const linkedFirst = SLIPS[activeSlip.linkOneId];
  const linkedSecond = SLIPS[activeSlip.linkTwoId];

  return (
    <div
      className="min-h-screen bg-[#EDE2C4] text-[#123536] selection:bg-[#E8BE48] selection:text-[#123536]"
      style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
    >
      {/* Top Navigation */}
      <header className="border-b border-[#123536]/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
          <div className="flex items-baseline gap-3">
            <span
              className="text-2xl font-bold tracking-tight text-[#123536]"
              style={{ fontFamily: "var(--font-besley), Georgia, serif" }}
            >
              Cairn
            </span>
            <span className="hidden text-sm text-[#3B5B5D] sm:inline">
              Personal slip-box for Mac, iOS, and Linux
            </span>
          </div>

          <nav aria-label="Primary" className="flex items-center gap-6 text-sm font-medium">
            <a
              href="#how-it-works"
              className="hidden text-[#25494B] hover:text-[#123536] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123536] sm:inline"
            >
              How slips connect
            </a>
            <a
              href="#plain-files"
              className="hidden text-[#25494B] hover:text-[#123536] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123536] sm:inline"
            >
              Plain files
            </a>
            <a
              href="#download"
              className="rounded-lg bg-[#123536] px-4 py-2 text-[#FFFDF7] transition-colors hover:bg-[#1B4A4C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123536]"
            >
              Download Cairn
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section: Thesis + Interactive Tabbed Slip-Card Tray */}
        <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 sm:px-10 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Column */}
            <div className="lg:col-span-5 lg:pt-4">
              <h1
                className="text-4xl font-semibold leading-[1.12] tracking-[-0.02em] text-[#123536] sm:text-5xl"
                style={{ fontFamily: "var(--font-besley), Georgia, serif" }}
              >
                Keep one thought per card. Let past reading finish the sentence.
              </h1>

              <p className="mt-6 max-w-[54ch] text-lg leading-[1.6] text-[#294A4C]">
                Folders ask you to predict where an idea belongs before you know
                what it means. Cairn keeps every note as a plain index slip and
                pulls older slips onto your desk the moment a new sentence
                touches them.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#download"
                  className="rounded-lg bg-[#123536] px-5 py-3 text-base font-medium text-[#FFFDF7] transition-colors hover:bg-[#1C4D4F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123536]"
                >
                  Download for macOS
                </a>
                <a
                  href="#plain-files"
                  className="rounded-lg border border-[#123536]/30 bg-[#FFFDF7]/60 px-5 py-3 text-base font-medium text-[#123536] transition-colors hover:bg-[#FFFDF7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123536]"
                >
                  Inspect a file on disk
                </a>
              </div>

              <p className="mt-5 text-sm text-[#3B5B5D]">
                Works offline forever. Reads and writes standard Markdown in any
                folder you choose.
              </p>
            </div>

            {/* Right Column: Physical Tabbed Slip-Box Tray */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#123536]/20 bg-[#DFD2AE] p-4 sm:p-6">
                <div className="mb-3 flex items-center justify-between text-xs font-medium text-[#345456]">
                  <span>Click any divider tab or underlined phrase to pull a linked slip</span>
                  <span>5 connected slips in tray</span>
                </div>

                {/* Protruding Die-Cut Index Tabs */}
                <div
                  role="tablist"
                  aria-label="Sample slip-box cards"
                  className="flex flex-wrap gap-1.5 pl-1"
                >
                  {SLIP_ORDER.map((id) => {
                    const slip = SLIPS[id];
                    const isSelected = id === activeId;
                    return (
                      <button
                        key={id}
                        role="tab"
                        type="button"
                        aria-selected={isSelected}
                        onClick={() => setActiveId(id)}
                        style={{
                          backgroundColor: slip.tabColor,
                          color: slip.tabTextColor,
                        }}
                        className={`whitespace-nowrap rounded-t-lg border border-b-0 border-[#123536]/30 px-3 py-1.5 text-xs font-semibold transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123536] ${
                          isSelected
                            ? "translate-y-0 ring-1 ring-[#123536]/35"
                            : "translate-y-1 opacity-85 hover:translate-y-0.5 hover:opacity-100"
                        }`}
                      >
                        {slip.tabLabel}
                      </button>
                    );
                  })}
                </div>

                {/* Stacked Card Effect + Active Ruled 3x5 Index Card */}
                <div className="relative">
                  {/* Rear stacked card edge */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-2 -bottom-2 h-full rounded-b-xl rounded-tr-xl border border-[#123536]/20 bg-[#F5F0E1]"
                  />

                  <article
                    role="tabpanel"
                    aria-live="polite"
                    className="index-card-ruled relative rounded-b-xl rounded-tr-xl border border-[#123536]/30 px-6 pt-3 pb-6 sm:px-8"
                  >
                    {/* Card Header above Crimson Ledger Line */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 text-xs font-medium text-[#3B5B5D]">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="inline-block rounded px-1.5 py-0.5 font-bold text-[#123536]"
                          style={{ backgroundColor: activeSlip.tabColor }}
                        >
                          Slip {activeSlip.id}
                        </span>
                        <span>{activeSlip.date}</span>
                      </div>
                      <span className="text-[#4A686A]">{activeSlip.source}</span>
                    </div>

                    {/* Card Title & Body on Ruled Lines */}
                    <h2
                      className="mt-3 text-xl font-semibold leading-snug text-[#123536] sm:text-2xl"
                      style={{ fontFamily: "var(--font-besley), Georgia, serif" }}
                    >
                      {activeSlip.title}
                    </h2>

                    <p className="mt-3 max-w-[60ch] text-[16px] leading-[2rem] text-[#173D3E]">
                      {activeSlip.bodyBefore}
                      <button
                        type="button"
                        onClick={() => setActiveId(activeSlip.linkOneId)}
                        style={{
                          backgroundColor: `${linkedFirst.tabColor}55`,
                        }}
                        className="inline cursor-pointer rounded px-1.5 py-0.5 font-semibold text-[#123536] underline decoration-[#C84646] decoration-2 underline-offset-4 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123536]"
                      >
                        [{activeSlip.linkOneId}] {activeSlip.linkOneText}
                      </button>
                      {activeSlip.bodyMiddle}
                      <button
                        type="button"
                        onClick={() => setActiveId(activeSlip.linkTwoId)}
                        style={{
                          backgroundColor: `${linkedSecond.tabColor}55`,
                        }}
                        className="inline cursor-pointer rounded px-1.5 py-0.5 font-semibold text-[#123536] underline decoration-[#123536] decoration-2 underline-offset-4 transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123536]"
                      >
                        [{activeSlip.linkTwoId}] {activeSlip.linkTwoText}
                      </button>
                      {activeSlip.bodyAfter}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#123536]/15 pt-3 text-xs text-[#3B5B5D]">
                      <span>{activeSlip.footnote}</span>
                      <span>~/Notes/Cairn/{activeSlip.id}.md</span>
                    </div>
                  </article>
                </div>

                {/* Surfaced Neighbors Drawer inside Tray */}
                <div className="mt-6">
                  <p className="mb-2.5 text-xs font-semibold text-[#2B4B4D]">
                    Pulled forward automatically beside Slip {activeSlip.id}:
                  </p>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {[linkedFirst, linkedSecond].map((neighbor) => (
                      <button
                        key={neighbor.id}
                        type="button"
                        onClick={() => setActiveId(neighbor.id)}
                        className="group flex flex-col justify-between rounded-xl border border-[#123536]/20 bg-[#FBF7EA] p-3.5 text-left transition-colors hover:border-[#123536]/50 hover:bg-[#FFFDF7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123536]"
                      >
                        <div className="flex items-center justify-between text-xs text-[#3B5B5D]">
                          <span className="font-semibold text-[#123536]">
                            Slip {neighbor.id}
                          </span>
                          <span>{neighbor.date}</span>
                        </div>
                        <p
                          className="mt-1.5 text-sm font-semibold text-[#123536] group-hover:underline"
                          style={{ fontFamily: "var(--font-besley), Georgia, serif" }}
                        >
                          {neighbor.title}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chronological 3-Step Sequence (Genuinely sequential!) */}
        <section
          id="how-it-works"
          className="border-y border-[#123536]/15 bg-[#E3D6B4]"
        >
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:py-20">
            <h2
              className="max-w-2xl text-2xl font-semibold leading-snug text-[#123536] sm:text-3xl"
              style={{ fontFamily: "var(--font-besley), Georgia, serif" }}
            >
              How a passing observation becomes a finished piece of writing
            </h2>

            <ol className="mt-10 grid grid-cols-1 divide-y divide-[#123536]/15 border-t border-[#123536]/15 md:grid-cols-3 md:divide-x md:divide-y-0">
              <li className="py-6 md:pt-8 md:pr-8 md:pb-2">
                <span className="inline-block rounded bg-[#E8BE48] px-2 py-0.5 text-xs font-semibold text-[#123536]">
                  Step 1
                </span>
                <h3
                  className="mt-3 text-lg font-semibold text-[#123536]"
                  style={{ fontFamily: "var(--font-besley), Georgia, serif" }}
                >
                  Write one slip before you tidy it
                </h3>
                <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-[#294A4C]">
                  Press the shortcut from any window, jot down a quote or
                  observation in two sentences, and close it. Cairn stamps the
                  date and source URL without asking you to pick a category.
                </p>
              </li>

              <li className="py-6 md:px-8 md:pt-8 md:pb-2">
                <span className="inline-block rounded bg-[#79B497] px-2 py-0.5 text-xs font-semibold text-[#123536]">
                  Step 2
                </span>
                <h3
                  className="mt-3 text-lg font-semibold text-[#123536]"
                  style={{ fontFamily: "var(--font-besley), Georgia, serif" }}
                >
                  Notice quiet kinships months later
                </h3>
                <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-[#294A4C]">
                  While you type a new note next winter, Cairn checks shared
                  vocabulary and concepts entirely on your machine, sliding two
                  or three forgotten slips into the side tray.
                </p>
              </li>

              <li className="py-6 md:pt-8 md:pb-2 md:pl-8">
                <span className="inline-block rounded bg-[#6BA2D6] px-2 py-0.5 text-xs font-semibold text-[#123536]">
                  Step 3
                </span>
                <h3
                  className="mt-3 text-lg font-semibold text-[#123536]"
                  style={{ fontFamily: "var(--font-besley), Georgia, serif" }}
                >
                  Spread linked slips into an outline
                </h3>
                <p className="mt-2.5 max-w-[42ch] text-[15px] leading-relaxed text-[#294A4C]">
                  Pin five connected cards onto the composition desk, reorder
                  them with your keyboard, and export a clean draft with every
                  source citation intact.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Plain File Longevity Section */}
        <section id="plain-files" className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2
                className="text-3xl font-semibold leading-tight text-[#123536]"
                style={{ fontFamily: "var(--font-besley), Georgia, serif" }}
              >
                Built so you can still read your notes in thirty years.
              </h2>
              <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-[#294A4C]">
                Most note apps trap years of thinking inside an opaque database
                that breaks the day a startup pivots. Cairn is an index over
                ordinary UTF-8 Markdown files sitting in a folder on your own
                hard drive.
              </p>

              <dl className="mt-8 space-y-5 border-t border-[#123536]/15 pt-6">
                <div>
                  <dt className="font-semibold text-[#123536]">
                    No account required to begin
                  </dt>
                  <dd className="mt-1 max-w-[54ch] text-sm leading-relaxed text-[#345456]">
                    Open any existing folder of Markdown notes and Cairn builds
                    its local slip index in under two seconds for ten thousand
                    files.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#123536]">
                    Edit with any text tool alongside Cairn
                  </dt>
                  <dd className="mt-1 max-w-[54ch] text-sm leading-relaxed text-[#345456]">
                    Use Vim, VS Code, Git, or Spotlight search on the same
                    directory. File changes appear immediately in your tray
                    without import or export steps.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Honest Plain File Sheet */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-[#123536]/25 bg-[#FFFDF7] p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-[#123536]/15 pb-3 text-xs font-medium text-[#3B5B5D]">
                  <span>~/Notes/Cairn/14a-roman-marine-concrete.md</span>
                  <span>Plain UTF-8 file (418 bytes)</span>
                </div>
                <pre
                  className="mt-4 overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed text-[#123536]"
                  style={{ fontFamily: "var(--font-recursive), monospace" }}
                >{`---
slip: 14a
created: 2025-01-12
source: Seymour et al., Science Advances
---

# Roman breakwaters strengthen in seawater

Harbor piers poured at Pozzuoli still resist wave impact
because of [[14b|unslaked quicklime clasts]] left intact
inside the mortar.

See also [[27a|materials that mend themselves]].`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Download & Pricing Band */}
        <section
          id="download"
          className="border-t border-[#123536]/15 bg-[#123536] text-[#FAF5E8]"
        >
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:py-20">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2
                  className="text-3xl font-semibold leading-tight text-[#FFFDF7]"
                  style={{ fontFamily: "var(--font-besley), Georgia, serif" }}
                >
                  Start an archive you will never have to migrate.
                </h2>
                <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-[#CBE0E0]">
                  Cairn is free to use forever on your computer with unlimited
                  slips. Add optional end-to-end encrypted sync across Mac,
                  iPhone, and iPad for $5 a month whenever you want your tray in
                  your pocket.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                <a
                  href="#download"
                  className="inline-flex items-center justify-center rounded-lg bg-[#E8BE48] px-6 py-3.5 text-base font-semibold text-[#123536] transition-colors hover:bg-[#F2CB5C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8BE48]"
                >
                  Download for macOS (Universal)
                </a>
                <a
                  href="#download"
                  className="inline-flex items-center justify-center rounded-lg border border-[#FAF5E8]/30 px-5 py-3.5 text-base font-medium text-[#FAF5E8] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF5E8]"
                >
                  Linux & Windows
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#123536] border-t border-white/10 text-xs text-[#9DC0C1]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 py-6 sm:flex-row sm:px-10">
          <span>Cairn Software, independent studio in Portland and Zurich</span>
          <div className="flex flex-wrap gap-6">
            <a href="#plain-files" className="hover:text-white">
              Markdown specification
            </a>
            <a href="#download" className="hover:text-white">
              Security audit
            </a>
            <a href="#download" className="hover:text-white">
              Release notes (v2.4)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
