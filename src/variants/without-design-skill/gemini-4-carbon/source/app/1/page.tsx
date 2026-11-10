"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CornerDownRight,
  Feather,
  FileText,
  GitBranch,
  History,
  Quote,
  Search,
  Sparkles,
} from "lucide-react";

type FolioId = "luhmann" | "atomic" | "resurfacing" | "combinatorial";

interface FolioNote {
  id: FolioId;
  code: string;
  title: string;
  created: string;
  source: string;
  excerpt: string;
  marginalia: string;
  backlinks: { code: string; title: string; target: FolioId }[];
}

const FOLIO_NOTES: Record<FolioId, FolioNote> = {
  luhmann: {
    id: "luhmann",
    code: "12a.4",
    title: "Luhmann's Slip-Box as a Conversation Partner",
    created: "14 Mar 2025 · Göttingen Archive",
    source: "Ahrens, How to Take Smart Notes (p. 42)",
    excerpt:
      "Niklas Luhmann published 70 books and 400 scholarly articles in thirty years—not by working harder, but by conversing with 90,000 cross-indexed paper slips. When you ask the slip-box a question, it returns juxtaposed thoughts you had forgotten writing.",
    marginalia:
      "Key insight: A second brain fails the moment it becomes a warehouse. It must surprise its author.",
    backlinks: [
      { code: "19c.1", title: "Atomic Notes & Single-Idea Density", target: "atomic" },
      { code: "31b.8", title: "Combinatorial Creativity Across Domains", target: "combinatorial" },
    ],
  },
  atomic: {
    id: "atomic",
    code: "19c.1",
    title: "Atomic Notes & Single-Idea Density",
    created: "02 Jun 2025 · Morning Desk",
    source: "Matuschak, Evergreen Notes Should Be Atomic",
    excerpt:
      "When a note captures exactly one durable concept in your own words, it becomes infinitely composable. Long meeting dumps stay buried; crisp atomic thoughts snap together across projects, years, and disciplines.",
    marginalia:
      "Test: Can I link to this note from three unrelated essays without dragging irrelevant baggage?",
    backlinks: [
      { code: "27d.2", title: "Spaced Resurfacing Beats Search", target: "resurfacing" },
      { code: "12a.4", title: "Luhmann's Slip-Box as a Conversation Partner", target: "luhmann" },
    ],
  },
  resurfacing: {
    id: "resurfacing",
    code: "27d.2",
    title: "Spaced Resurfacing Beats Search",
    created: "19 Sep 2025 · Train to Zurich",
    source: "Ebbinghaus Forgetting Curve · Field Observation",
    excerpt:
      "Search only works when you already remember what to search for. True recall requires unprompted resurfacing: Engram brings forgotten notes back to your morning desk the moment a new paragraph shares conceptual DNA.",
    marginalia:
      "Connected automatically to my 2024 voice memo on hippocampal memory consolidation during slow-wave sleep.",
    backlinks: [
      { code: "31b.8", title: "Combinatorial Creativity Across Domains", target: "combinatorial" },
      { code: "19c.1", title: "Atomic Notes & Single-Idea Density", target: "atomic" },
    ],
  },
  combinatorial: {
    id: "combinatorial",
    code: "31b.8",
    title: "Combinatorial Creativity Across Domains",
    created: "08 Nov 2026 · Reading Room",
    source: "Poincaré, Foundations of Science (1913)",
    excerpt:
      "Invention is discernment, choice—specifically the collision of distant ideas hooked together in quiet hours. A flat hierarchy lets a note on Venetian guild apprenticeships illuminate modern open-source governance.",
    marginalia:
      "Used directly in Ch. 3 draft! Never would have met inside a 'History/' vs 'Software/' folder tree.",
    backlinks: [
      { code: "12a.4", title: "Luhmann's Slip-Box as a Conversation Partner", target: "luhmann" },
      { code: "27d.2", title: "Spaced Resurfacing Beats Search", target: "resurfacing" },
    ],
  },
};

const TIMELINE_STEPS = [
  {
    stage: "STAGE I · FLEETING CAPTURE",
    date: "Oct 14, 2025 · 08:12 AM",
    medium: "Walking Voice Memo (19 sec)",
    title: "“Why do cathedral builders leave mason marks hidden inside pillars?”",
    detail:
      "Recorded walking home in the rain. Engram transcribes offline, strips filler, and places slip #08f in your Daily Ephemera tray without asking you to pick a folder.",
    linksCount: 1,
  },
  {
    stage: "STAGE II · QUIET CROSS-POLLINATION",
    date: "Feb 03, 2026 · 10:41 PM",
    medium: "Book Highlight · Richard Sennett, The Craftsman",
    title: "Linked automatically to [[Pride in Unseen Work]] & [[Software Architecture]]",
    detail:
      "Four months later, highlighting a passage on medieval guild craftsmanship surfaces your forgotten October voice note in the margin—revealing an unexpected bridge to invisible code quality.",
    linksCount: 6,
  },
  {
    stage: "STAGE III · EFFORTLESS SYNTHESIS",
    date: "Nov 10, 2026 · 09:05 AM",
    medium: "Published Essay · 2,400 words",
    title: "“Hidden Mason Marks: Ethics of Unseen Craft in Systems Design”",
    detail:
      "Instead of facing a blank page, you pull 9 linked slips onto the manuscript desk. Eighty percent of the essay is already written in your own voice over thirteen months.",
    linksCount: 14,
  },
];

export default function IterationOneArchivist() {
  const [activeFolio, setActiveFolio] = useState<FolioId>("luhmann");
  const [showMarginalia, setShowMarginalia] = useState(true);
  const [activeStage, setActiveStage] = useState(1);

  const selectedNote = FOLIO_NOTES[activeFolio];

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#191715] selection:bg-[#C84B31]/20 selection:text-[#191715]">
      {/* Editorial Top Ribbon */}
      <div className="border-b border-[#DCD4C2] bg-[#EFE9DA]/70 px-6 py-2">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 font-plex-mono text-[11px] tracking-wide text-[#5C564E]">
          <span>FOLIO EDITION NO. 01 — ARCHIVAL SECOND BRAIN</span>
          <span className="hidden sm:inline">
            LOCAL MARKDOWN · BIDIRECTIONAL FOLGEZETTEL · ZERO FOLDERS
          </span>
          <span className="text-[#C84B31]">RELEASE 4.2 · MACOS, IOS & LINUX</span>
        </div>
      </div>

      {/* Masthead Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#DCD4C2] bg-[#F7F3EA]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[#191715] bg-[#191715] font-newsreader text-lg italic text-[#F7F3EA]">
              e
            </span>
            <span className="font-newsreader text-2xl font-medium tracking-tight text-[#191715]">
              Engram
            </span>
            <span className="hidden font-plex-mono text-[11px] text-[#6E675D] md:inline">
              /ˈɛn.ɡræm/ n. physical trace of memory
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-[#4A453E] md:flex">
            <a href="#slipbox" className="transition-colors hover:text-[#C84B31]">
              The Slip-Box
            </a>
            <a href="#method" className="transition-colors hover:text-[#C84B31]">
              Methodology
            </a>
            <a href="#compounding" className="transition-colors hover:text-[#C84B31]">
              Compounding Recall
            </a>
            <a href="#patronage" className="transition-colors hover:text-[#C84B31]">
              Membership
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#patronage"
              className="hidden font-plex-mono text-xs text-[#4A453E] underline-offset-4 hover:underline sm:inline-block"
            >
              Read Manifesto
            </a>
            <a
              href="#patronage"
              className="inline-flex items-center gap-2 rounded-sm border border-[#191715] bg-[#191715] px-4 py-2 text-xs font-medium tracking-wide text-[#F7F3EA] transition-colors hover:bg-[#C84B31] hover:border-[#C84B31]"
            >
              <span>Open Your Archive</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="slipbox" className="mx-auto max-w-7xl px-6 pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5 lg:pr-4">
            <div className="inline-flex items-center gap-2 border-b border-[#C84B31]/40 pb-1 font-plex-mono text-xs uppercase tracking-widest text-[#C84B31]">
              <Feather className="h-3.5 w-3.5" />
              <span>A Second Brain Built for Decades</span>
            </div>

            <h1 className="mt-6 font-newsreader text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-[#191715] sm:text-6xl">
              Every fleeting thought, woven into{" "}
              <em className="font-newsreader italic text-[#C84B31]">
                permanent memory.
              </em>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-[#4A453E]">
              Most note apps are digital attics where good ideas go to gather dust.
              Engram pairs the centuries-old craft of the{" "}
              <span className="font-newsreader italic text-[#191715]">Zettelkasten</span>{" "}
              slip-box with quiet, automatic resurfacing—so nothing you read, hear,
              or ponder is ever lost to the forgetting curve.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#patronage"
                className="inline-flex items-center gap-2.5 rounded-sm bg-[#C84B31] px-6 py-3.5 text-sm font-medium text-[#FCFBF7] shadow-[3px_3px_0px_#191715] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Begin Your Commonplace Book</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => setShowMarginalia((v) => !v)}
                className="inline-flex items-center gap-2 rounded-sm border border-[#BEB5A2] bg-[#FCFBF7] px-4 py-3.5 font-plex-mono text-xs text-[#3D3831] transition-colors hover:border-[#191715] cursor-pointer"
              >
                <span>{showMarginalia ? "✓ Marginalia Visible" : "Show Marginalia"}</span>
              </button>
            </div>

            {/* Editorial Footnotes */}
            <div className="mt-10 border-t border-[#DCD4C2] pt-6">
              <dl className="grid grid-cols-3 gap-4">
                <div>
                  <dt className="font-plex-mono text-[10px] uppercase tracking-wider text-[#6E675D]">
                    Storage Format
                  </dt>
                  <dd className="mt-1 font-newsreader text-xl text-[#191715]">
                    Plain <code className="font-plex-mono text-sm">.md</code>
                  </dd>
                </div>
                <div className="border-l border-[#DCD4C2] pl-4">
                  <dt className="font-plex-mono text-[10px] uppercase tracking-wider text-[#6E675D]">
                    Recall Latency
                  </dt>
                  <dd className="mt-1 font-newsreader text-xl text-[#191715]">
                    &lt; 2 ms local
                  </dd>
                </div>
                <div className="border-l border-[#DCD4C2] pl-4">
                  <dt className="font-plex-mono text-[10px] uppercase tracking-wider text-[#6E675D]">
                    Folder Trees
                  </dt>
                  <dd className="mt-1 font-newsreader text-xl italic text-[#C84B31]">
                    None required
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Interactive Slip-Box Stack */}
          <div className="lg:col-span-7">
            <div className="rounded-sm border border-[#191715] bg-[#FCFBF7] shadow-[8px_8px_0px_#DFD7C5]">
              {/* Desk Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCD4C2] bg-[#EFE9DA] px-4 py-2.5">
                <div className="flex items-center gap-2 font-plex-mono text-[11px] text-[#4A453E]">
                  <BookOpen className="h-3.5 w-3.5 text-[#C84B31]" />
                  <span>SLIP-BOX DESK · CLICK ANY [[WIKI-LINK]] TO TRAVERSE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {(Object.keys(FOLIO_NOTES) as FolioId[]).map((key) => {
                    const item = FOLIO_NOTES[key];
                    const isActive = key === activeFolio;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveFolio(key)}
                        className={`rounded-xs px-2 py-0.5 font-plex-mono text-[11px] transition-colors cursor-pointer ${
                          isActive
                            ? "bg-[#191715] text-[#F7F3EA]"
                            : "bg-[#E4DEC9] text-[#4A453E] hover:bg-[#D5CEB8]"
                        }`}
                      >
                        {item.code}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stacked Two-Pane Folio View */}
              <div className="grid grid-cols-1 divide-y divide-[#DCD4C2] md:grid-cols-12 md:divide-x md:divide-y-0">
                {/* Primary Manuscript Slip */}
                <div className="p-6 md:col-span-7">
                  <div className="flex items-center justify-between font-plex-mono text-[11px] text-[#6E675D]">
                    <span>PRIMARY SLIP · 24a.1</span>
                    <span>UPDATED TODAY, 09:42</span>
                  </div>

                  <h2 className="mt-3 font-newsreader text-2xl font-medium leading-snug text-[#191715]">
                    Why Hierarchical Folders Quietly Strangle Serendipity
                  </h2>

                  <div className="mt-4 space-y-4 font-newsreader text-[17px] leading-[1.68] text-[#2B2723]">
                    <p>
                      Filing a note into a folder forces a premature decision: does an
                      observation on ant-colony foraging belong under{" "}
                      <em className="italic">Biology</em> or{" "}
                      <em className="italic">Distributed Systems</em>? In{" "}
                      <button
                        type="button"
                        onClick={() => setActiveFolio("luhmann")}
                        className={`inline font-medium underline decoration-[#C84B31] decoration-dotted underline-offset-4 transition-colors cursor-pointer ${
                          activeFolio === "luhmann"
                            ? "bg-[#C84B31]/15 px-1 text-[#C84B31]"
                            : "text-[#191715] hover:text-[#C84B31]"
                        }`}
                      >
                        [[Luhmann&apos;s Slip-Box]]
                      </button>
                      , a thought lives everywhere its links reach.
                    </p>

                    <p>
                      When you compose{" "}
                      <button
                        type="button"
                        onClick={() => setActiveFolio("atomic")}
                        className={`inline font-medium underline decoration-[#C84B31] decoration-dotted underline-offset-4 transition-colors cursor-pointer ${
                          activeFolio === "atomic"
                            ? "bg-[#C84B31]/15 px-1 text-[#C84B31]"
                            : "text-[#191715] hover:text-[#C84B31]"
                        }`}
                      >
                        [[Atomic Notes]]
                      </button>{" "}
                      paired with{" "}
                      <button
                        type="button"
                        onClick={() => setActiveFolio("resurfacing")}
                        className={`inline font-medium underline decoration-[#C84B31] decoration-dotted underline-offset-4 transition-colors cursor-pointer ${
                          activeFolio === "resurfacing"
                            ? "bg-[#C84B31]/15 px-1 text-[#C84B31]"
                            : "text-[#191715] hover:text-[#C84B31]"
                        }`}
                      >
                        [[Spaced Resurfacing]]
                      </button>
                      , writing ceases to be linear assembly. You unlock{" "}
                      <button
                        type="button"
                        onClick={() => setActiveFolio("combinatorial")}
                        className={`inline font-medium underline decoration-[#C84B31] decoration-dotted underline-offset-4 transition-colors cursor-pointer ${
                          activeFolio === "combinatorial"
                            ? "bg-[#C84B31]/15 px-1 text-[#C84B31]"
                            : "text-[#191715] hover:text-[#C84B31]"
                        }`}
                      >
                        [[Combinatorial Creativity]]
                      </button>{" "}
                      across years of reading.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-dashed border-[#DCD4C2] pt-4 font-plex-mono text-[11px] text-[#5C564E]">
                    <span className="rounded-xs bg-[#EFE9DA] px-2 py-0.5 text-[#3A5A40]">
                      #epistemology
                    </span>
                    <span className="rounded-xs bg-[#EFE9DA] px-2 py-0.5 text-[#3A5A40]">
                      #second-brain
                    </span>
                    <span className="ml-auto text-[#C84B31]">4 outgoing · 9 backlinks</span>
                  </div>
                </div>

                {/* Linked Folio Inspection Drawer */}
                <div className=" flex flex-col justify-between bg-[#F4EFE2]/75 p-6 md:col-span-5">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-xs bg-[#C84B31] px-2 py-0.5 font-plex-mono text-[10px] font-medium text-[#FCFBF7]">
                        LINKED SLIP · {selectedNote.code}
                      </span>
                      <span className="font-plex-mono text-[10px] text-[#6E675D]">
                        1-HOP NEIGHBOR
                      </span>
                    </div>

                    <h3 className="mt-3 font-newsreader text-xl font-medium leading-snug text-[#191715]">
                      {selectedNote.title}
                    </h3>
                    <p className="mt-1 font-plex-mono text-[11px] text-[#6E675D]">
                      {selectedNote.created}
                    </p>

                    <p className="mt-3.5 font-newsreader text-[15.5px] leading-relaxed text-[#332E29]">
                      {selectedNote.excerpt}
                    </p>

                    {showMarginalia && (
                      <div className="mt-4 border-l-2 border-[#C84B31] bg-[#FCFBF7] p-3">
                        <div className="font-plex-mono text-[10px] uppercase tracking-wider text-[#C84B31]">
                          Author&apos;s Marginalia
                        </div>
                        <p className="mt-1 font-newsreader text-sm italic text-[#2B2723]">
                          “{selectedNote.marginalia}”
                        </p>
                        <div className="mt-1.5 font-plex-mono text-[10px] text-[#6E675D]">
                          Source: {selectedNote.source}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bidirectional Backlinks */}
                  <div className="mt-6 border-t border-[#DCD4C2] pt-3.5">
                    <div className="font-plex-mono text-[10px] uppercase tracking-wider text-[#6E675D]">
                      Cited By (Traverse Deeper)
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {selectedNote.backlinks.map((bl) => (
                        <button
                          key={bl.code}
                          type="button"
                          onClick={() => setActiveFolio(bl.target)}
                          className="flex w-full items-center justify-between rounded-xs border border-[#DCD4C2] bg-[#FCFBF7] px-2.5 py-1.5 text-left transition-colors hover:border-[#C84B31] cursor-pointer"
                        >
                          <span className="truncate font-newsreader text-sm text-[#191715]">
                            <CornerDownRight className="mr-1.5 inline h-3 w-3 text-[#C84B31]" />
                            {bl.title}
                          </span>
                          <span className="ml-2 shrink-0 font-plex-mono text-[10px] text-[#6E675D]">
                            {bl.code}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Column Editorial Architecture ("Methodology") */}
      <section id="method" className="border-y border-[#DCD4C2] bg-[#FCFBF7] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 border-b border-[#DCD4C2] pb-10 md:flex-row md:items-end">
            <div>
              <span className="font-plex-mono text-xs uppercase tracking-widest text-[#3A5A40]">
                § I — The Anatomy of Permanent Recall
              </span>
              <h2 className="mt-3 font-newsreader text-4xl font-normal tracking-tight text-[#191715] sm:text-5xl">
                Designed like a scholar&apos;s study,{" "}
                <em className="italic">not a chat feed.</em>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#5C564E]">
              Every surface in Engram honors calm concentration. No notification
              badges, no nested sub-pages seven levels deep, no proprietary cloud
              lock-in.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:divide-x md:divide-[#DCD4C2]">
            <div className="md:pr-8">
              <div className="flex items-center justify-between font-plex-mono text-xs text-[#C84B31]">
                <span>PRINCIPLE 01</span>
                <FileText className="h-4 w-4" />
              </div>
              <h3 className="mt-4 font-newsreader text-2xl text-[#191715]">
                Daily Ephemera &amp; Margin Capture
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4A453E]">
                Every morning opens a fresh dated sheet. Jot rough call notes, clip
                Kindle passages, or dictate walking thoughts. At week&apos;s end, promote
                what endures into permanent slips and let the rest fade guilt-free.
              </p>
              <div className="mt-6 rounded-sm border border-[#DCD4C2] bg-[#F7F3EA] p-3.5 font-plex-mono text-xs text-[#3D3831]">
                <div className="text-[10px] text-[#6E675D]">⌘ + SHIFT + SPACE · GLOBAL</div>
                <div className="mt-1 font-newsreader text-base italic text-[#191715]">
                  “Read Borges on Funes the Memorious—total recall without abstraction
                  paralyzes thought.”
                </div>
              </div>
            </div>

            <div className="md:px-8">
              <div className="flex items-center justify-between font-plex-mono text-xs text-[#C84B31]">
                <span>PRINCIPLE 02</span>
                <GitBranch className="h-4 w-4" />
              </div>
              <h3 className="mt-4 font-newsreader text-2xl text-[#191715]">
                Unlinked Mentions &amp; Folgezettel
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4A453E]">
                Even when you forget to add brackets, Engram quietly detects conceptual
                kinship across years of notes—suggesting scholarly cross-references in
                the right margin without ever rewriting a word of your prose.
              </p>
              <div className="mt-6 rounded-sm border border-[#DCD4C2] bg-[#F7F3EA] p-3.5">
                <div className="flex items-center justify-between font-plex-mono text-[10px] text-[#3A5A40]">
                  <span>QUIET SUGGESTION · 94% KINSHIP</span>
                  <span>+ LINK</span>
                </div>
                <div className="mt-1.5 font-newsreader text-sm text-[#191715]">
                  Matches slip <strong>14b.2</strong>: “Abstraction requires selective
                  forgetting” (written Nov 2024)
                </div>
              </div>
            </div>

            <div className="md:pl-8">
              <div className="flex items-center justify-between font-plex-mono text-xs text-[#C84B31]">
                <span>PRINCIPLE 03</span>
                <Search className="h-4 w-4" />
              </div>
              <h3 className="mt-4 font-newsreader text-2xl text-[#191715]">
                Side-by-Side Manuscript Desk
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4A453E]">
                Spread four linked notes beside your draft like index cards on oak.
                Drag any slip into your outline and Engram preserves full source
                citations, page numbers, and provenance automatically.
              </p>
              <div className="mt-6 rounded-sm border border-[#DCD4C2] bg-[#F7F3EA] p-3.5 font-plex-mono text-xs">
                <div className="flex items-center justify-between text-[10px] text-[#6E675D]">
                  <span>EXPORT TARGETS</span>
                  <span>LATEX · DOCX · MD</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <span className="border border-[#BEB5A2] bg-[#FCFBF7] px-2 py-1 text-[11px]">
                    Footnote [14] Ready
                  </span>
                  <span className="border border-[#BEB5A2] bg-[#FCFBF7] px-2 py-1 text-[11px]">
                    BibTeX Synced
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compounding Recall Interactive Timeline */}
      <section id="compounding" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="font-plex-mono text-xs uppercase tracking-widest text-[#C84B31]">
            § II — Thirteen Months in the Life of an Idea
          </span>
          <h2 className="mt-3 font-newsreader text-4xl font-normal leading-tight text-[#191715] sm:text-5xl">
            Watch a 19-second walk memo mature into a finished essay.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-5">
            {TIMELINE_STEPS.map((item, idx) => {
              const selected = idx === activeStage;
              return (
                <button
                  key={item.stage}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`w-full rounded-sm border p-5 text-left transition-all cursor-pointer ${
                    selected
                      ? "border-[#191715] bg-[#FCFBF7] shadow-[4px_4px_0px_#C84B31]"
                      : "border-[#DCD4C2] bg-[#EFE9DA]/50 hover:bg-[#FCFBF7]"
                  }`}
                >
                  <div className="flex items-center justify-between font-plex-mono text-[11px] text-[#6E675D]">
                    <span className={selected ? "text-[#C84B31] font-semibold" : ""}>
                      {item.stage}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <div className="mt-2 font-newsreader text-xl text-[#191715]">
                    {item.title}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div className="flex h-full flex-col justify-between rounded-sm border border-[#191715] bg-[#FCFBF7] p-8">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCD4C2] pb-4">
                  <div className="inline-flex items-center gap-2 font-plex-mono text-xs text-[#3A5A40]">
                    <History className="h-4 w-4" />
                    <span>{TIMELINE_STEPS[activeStage].medium}</span>
                  </div>
                  <span className="rounded-xs bg-[#EFE9DA] px-2.5 py-1 font-plex-mono text-xs text-[#191715]">
                    {TIMELINE_STEPS[activeStage].linksCount} Connected Slips
                  </span>
                </div>

                <h3 className="mt-6 font-newsreader text-3xl leading-snug text-[#191715]">
                  {TIMELINE_STEPS[activeStage].title}
                </h3>

                <p className="mt-4 font-newsreader text-xl leading-relaxed text-[#4A453E]">
                  {TIMELINE_STEPS[activeStage].detail}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[#DCD4C2] pt-6 font-plex-mono text-xs">
                <div className="rounded-xs bg-[#F7F3EA] p-3">
                  <div className="text-[10px] text-[#6E675D]">RETENTION</div>
                  <div className="mt-1 text-sm font-semibold text-[#191715]">
                    100% Verbatim
                  </div>
                </div>
                <div className="rounded-xs bg-[#F7F3EA] p-3">
                  <div className="text-[10px] text-[#6E675D]">MANUAL TAGGING</div>
                  <div className="mt-1 text-sm font-semibold text-[#3A5A40]">
                    0 Seconds Spent
                  </div>
                </div>
                <div className="rounded-xs bg-[#F7F3EA] p-3">
                  <div className="text-[10px] text-[#6E675D]">PROVENANCE</div>
                  <div className="mt-1 text-sm font-semibold text-[#C84B31]">
                    Audio + Page Pin
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reader Endorsements */}
      <section className="border-t border-[#DCD4C2] bg-[#EFE9DA]/60 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "I moved 11,400 notes out of nested cloud folders into Engram. Within a week it surfaced three forgotten dissertation interviews that became the spine of my new book.",
                author: "Dr. Clara Lindqvist",
                role: "Historian of Science, Uppsala",
              },
              {
                quote:
                  "It feels like writing in a clothbound notebook that happens to possess photographic recall of every paper, conversation, and margin scribble I’ve ever made.",
                author: "Marcus Vance",
                role: "Principal Systems Architect",
              },
              {
                quote:
                  "Because every note is a plain Markdown file on my own disk, I trust Engram with thirty-year research projects I would never hand to an ephemeral SaaS database.",
                author: "Haruki Takahashi",
                role: "Investigative Essayist, Kyoto",
              },
            ].map((item) => (
              <blockquote
                key={item.author}
                className="flex flex-col justify-between rounded-sm border border-[#DCD4C2] bg-[#FCFBF7] p-7"
              >
                <div>
                  <Quote className="h-5 w-5 text-[#C84B31]" />
                  <p className="mt-4 font-newsreader text-lg leading-relaxed text-[#191715]">
                    “{item.quote}”
                  </p>
                </div>
                <footer className="mt-6 border-t border-[#EFE9DA] pt-4">
                  <div className="font-medium text-sm text-[#191715]">{item.author}</div>
                  <div className="font-plex-mono text-[11px] text-[#6E675D]">
                    {item.role}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Library Card Membership / CTA */}
      <section id="patronage" className="border-t border-[#DCD4C2] bg-[#F7F3EA] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="font-plex-mono text-xs uppercase tracking-widest text-[#C84B31]">
              § III — Library Card &amp; Stewardship
            </span>
            <h2 className="mt-3 font-newsreader text-4xl text-[#191715] sm:text-5xl">
              Your thoughts belong to you—even if we vanish tomorrow.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#5C564E]">
              Every note lives locally as open Markdown with YAML frontmatter. Pay
              only if you want zero-knowledge encrypted sync across devices and
              archival PDF/audio indexing.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Free Tier */}
            <div className="flex flex-col justify-between rounded-sm border border-[#BEB5A2] bg-[#FCFBF7] p-8">
              <div>
                <div className="flex items-center justify-between border-b border-dashed border-[#DCD4C2] pb-4 font-plex-mono text-xs text-[#6E675D]">
                  <span>CARD NO. 001 · LOCAL EDITION</span>
                  <span>PERPETUAL</span>
                </div>
                <h3 className="mt-5 font-newsreader text-3xl text-[#191715]">
                  The Commonplace Book
                </h3>
                <div className="mt-2 font-newsreader text-4xl text-[#191715]">
                  $0{" "}
                  <span className="font-plex-mono text-xs text-[#6E675D]">
                    / forever offline
                  </span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-[#3D3831]">
                  <li>• Unlimited permanent slips, daily notes &amp; backlinks</li>
                  <li>• Side-by-side stacked folio manuscript desk</li>
                  <li>• Local semantic recall &amp; instant full-text index</li>
                  <li>• 100% open Markdown files in any folder on your disk</li>
                </ul>
              </div>
              <button
                type="button"
                className="mt-8 w-full rounded-sm border border-[#191715] bg-transparent py-3 text-sm font-medium text-[#191715] transition-colors hover:bg-[#191715] hover:text-[#FCFBF7] cursor-pointer"
              >
                Download for macOS, Windows &amp; Linux
              </button>
            </div>

            {/* Patron Tier */}
            <div className="flex flex-col justify-between rounded-sm border-2 border-[#191715] bg-[#FCFBF7] p-8 shadow-[6px_6px_0px_#C84B31]">
              <div>
                <div className="flex items-center justify-between border-b border-dashed border-[#DCD4C2] pb-4 font-plex-mono text-xs text-[#C84B31]">
                  <span>CARD NO. 002 · ARCHIVIST PATRON</span>
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> MOST CHOSEN
                  </span>
                </div>
                <h3 className="mt-5 font-newsreader text-3xl text-[#191715]">
                  The Complete Scriptorium
                </h3>
                <div className="mt-2 font-newsreader text-4xl text-[#191715]">
                  $7{" "}
                  <span className="font-plex-mono text-xs text-[#6E675D]">
                    / month, billed annually
                  </span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-[#3D3831]">
                  <li>• End-to-end encrypted sync across Mac, iPhone &amp; iPad</li>
                  <li>• Offline voice memo transcription &amp; Kindle/Readwise bridge</li>
                  <li>• PDF deep-page citation pinning &amp; handwritten OCR</li>
                  <li>• 1-year version history &amp; publishable digital garden</li>
                </ul>
              </div>
              <button
                type="button"
                className="mt-8 w-full rounded-sm bg-[#191715] py-3 text-sm font-medium text-[#FCFBF7] transition-colors hover:bg-[#C84B31] cursor-pointer"
              >
                Start 14-Day Scriptorium Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Colophon Footer */}
      <footer className="border-t border-[#DCD4C2] bg-[#EFE9DA] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <div>
            <div className="font-newsreader text-xl text-[#191715]">
              Engram — Set in Newsreader &amp; IBM Plex Mono.
            </div>
            <p className="mt-1 font-plex-mono text-xs text-[#6E675D]">
              Iteration 01 / 05 · Crafted for long-horizon thinkers.
            </p>
          </div>
          <div className="flex gap-6 font-plex-mono text-xs text-[#4A453E]">
            <a href="#slipbox" className="hover:text-[#C84B31]">
              Slip-Box Demo
            </a>
            <a href="#method" className="hover:text-[#C84B31]">
              File Longevity
            </a>
            <a href="#patronage" className="hover:text-[#C84B31]">
              Security Whitepaper
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
