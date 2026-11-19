"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Feather,
  Link2,
  Search,
  Sparkles,
  Check,
  FileText,
  Clock,
  Bookmark,
} from "lucide-react";

type ConceptKey = "spaced-recall" | "zettelkasten" | "quiet-synthesis" | "evergreen-notes";

interface SlipCard {
  key: ConceptKey;
  id: string;
  title: string;
  source: string;
  excerpt: string;
  backlinks: string[];
  updated: string;
}

const SLIP_CARDS: Record<ConceptKey, SlipCard> = {
  "spaced-recall": {
    key: "spaced-recall",
    id: "2026.04.C",
    title: "Spaced Recall as Creative Fuel",
    source: "Excerpt from M. Nielsen — Augmenting Long-Term Memory",
    excerpt:
      "Memory is not a filing cabinet; it is an associative loom. Resurfacing an old highlight just before you forget it sparks unexpected collisions with today's work.",
    backlinks: ["On Compounding Attention", "Reading Rituals", "Serendipity Engine"],
    updated: "Linked 14 times · Last revisited 2 days ago",
  },
  zettelkasten: {
    key: "zettelkasten",
    id: "2025.11.A",
    title: "Atomic Slip-Box Architecture",
    source: "Reading Notes — Niklas Luhmann's Index System",
    excerpt:
      "When every note holds a single, self-contained idea in your own words, your archive stops behaving like a dusty warehouse and begins answering back like a conversation partner.",
    backlinks: ["On Compounding Attention", "Against Nested Folders", "Writing from Notes"],
    updated: "Linked 29 times · Core evergreen slip",
  },
  "quiet-synthesis": {
    key: "quiet-synthesis",
    id: "2026.09.B",
    title: "Quiet Synthesis Over Constant Capture",
    source: "Journal Entry — Autumn Study, Kyoto",
    excerpt:
      "Collecting ten thousand bookmarks produces anxiety, not wisdom. Five minutes of morning synthesis turns yesterday's fragments into durable understanding.",
    backlinks: ["On Compounding Attention", "Weekly Digest Ritual", "Attention Economics"],
    updated: "Linked 8 times · Drafted 11 days ago",
  },
  "evergreen-notes": {
    key: "evergreen-notes",
    id: "2026.01.F",
    title: "Evergreen Notes Should Be Concept-Oriented",
    source: "Marginalia — Andy Matuschak's Working Notes",
    excerpt:
      "Organize by concept rather than by author or date. A single enduring page on 'Feedback Loops' gathers insights from cybernetics, biology, and design across decades.",
    backlinks: ["On Compounding Attention", "Systems Thinking", "Knowledge Compounding"],
    updated: "Linked 21 times · Mature note",
  },
};

const WORKFLOW_STAGES = [
  {
    id: "fleeting",
    step: "01",
    label: "Fleeting Capture",
    time: "08:14 AM · Mobile & Quick Bar",
    title: "Catch the spark before it dissolves",
    body: "Jot a half-formed sentence, clip a paragraph from an essay, or dictate a voice note on a morning walk. Zero folders to pick—everything lands gently in your Daily Folio.",
    sampleHeading: "Daily Folio — Nov 19",
    sampleLines: [
      "— Overheard on the train: 'Good tools shrink the distance between noticing and naming.'",
      "— Clip: Vannevar Bush's Memex imagined associative trails, not hierarchies.",
      "— TODO: connect this to [[Zettelkasten]] before Friday's draft.",
    ],
  },
  {
    id: "woven",
    step: "02",
    label: "Associative Weaving",
    time: "12:40 PM · Bidirectional Margin",
    title: "Let ideas find their own neighbors",
    body: "Type [[ anywhere to link a concept. Engram quietly surfaces unlinked mentions from months ago in the page margin, revealing threads you forgot you spun.",
    sampleHeading: "2026.11.D — Associative Trails",
    sampleLines: [
      "Unlike folders, which force an idea into a single drawer, associative links allow a thought to inhabit multiple essays simultaneously.",
      "↳ 3 unlinked mentions detected in your 2025 archive.",
      "↳ Connected to [[Spaced Recall]] & [[Evergreen Notes]].",
    ],
  },
  {
    id: "published",
    step: "03",
    label: "Effortless Synthesis",
    time: "06:05 PM · Manuscript Mode",
    title: "Write from abundance, never a blank page",
    body: "Pull linked slip cards straight onto your manuscript canvas. By the time you sit down to write an essay, memo, or book chapter, eighty percent of the thinking is already waiting for you.",
    sampleHeading: "Essay Draft — The Architecture of Remembering",
    sampleLines: [
      "I. We spend our lives reading brilliantly and forgetting silently.",
      "II. When notes become conversational—interlinked, dated, and resurfaced—every book you read compounds the next.",
      "↳ 12 citations auto-formatted · Export to Markdown, PDF, or Substack.",
    ],
  },
];

export default function EditorialLanding() {
  const [activeConcept, setActiveConcept] = useState<ConceptKey>("zettelkasten");
  const [activeStage, setActiveStage] = useState(0);
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const currentSlip = SLIP_CARDS[activeConcept];
  const stage = WORKFLOW_STAGES[activeStage];

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setJoined(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] selection:bg-[#C84B31]/20 selection:text-[#1C1917]">
      {/* Masthead Navigation */}
      <header className="sticky top-0 z-30 border-b border-[#1C1917]/12 bg-[#FAF7F2]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#1C1917] bg-[#1C1917] text-[#FAF7F2]">
                <Feather className="h-4 w-4" />
              </span>
              <span className="font-[family-name:var(--font-serif-editorial)] text-2xl tracking-tight">
                Engram
              </span>
            </a>
            <span className="hidden h-4 w-px bg-[#1C1917]/20 sm:inline-block" />
            <span className="hidden font-mono text-[11px] tracking-widest text-[#78716C] uppercase sm:inline-block">
              Vol. IV · A Second Brain for Thinkers
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-[#44403C] md:flex">
            <a href="#philosophy" className="transition-colors hover:text-[#C84B31]">
              Philosophy
            </a>
            <a href="#workflow" className="transition-colors hover:text-[#C84B31]">
              The Craft
            </a>
            <a href="#endorsements" className="transition-colors hover:text-[#C84B31]">
              Readers
            </a>
            <a href="#pricing" className="transition-colors hover:text-[#C84B31]">
              Editions
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="hidden text-sm font-medium text-[#44403C] transition-colors hover:text-[#1C1917] sm:inline-block"
            >
              Sign in
            </a>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-sm bg-[#1C1917] px-4 py-2 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#C84B31]"
            >
              Open Your Folio
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative border-b border-[#1C1917]/12">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-5">
              <div className="mb-6 inline-flex items-center gap-2 border-y border-[#1C1917]/20 py-1.5 font-mono text-[11px] tracking-widest text-[#78716C] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C84B31]" />
                Local-First · Plain Markdown · Timeless
              </div>

              <h1 className="font-[family-name:var(--font-serif-editorial)] text-5xl leading-[1.04] tracking-tight text-[#1C1917] sm:text-6xl">
                A quiet room for{" "}
                <span className="italic text-[#C84B31]">everything</span> you
                think.
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-[#57534E]">
                Engram is a contemplative second brain built for writers,
                researchers, and lifelong readers. Capture fleeting thoughts,
                weave them with bidirectional marginalia, and watch decades of
                reading compound into original work.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#cta"
                  className="inline-flex items-center gap-2.5 rounded-sm bg-[#C84B31] px-6 py-3.5 text-sm font-medium text-[#FAF7F2] shadow-sm transition-all hover:bg-[#AD3E26]"
                >
                  Start Writing Free
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#workflow"
                  className="inline-flex items-center gap-2 rounded-sm border border-[#1C1917]/25 px-5 py-3.5 text-sm font-medium text-[#1C1917] transition-colors hover:border-[#1C1917] hover:bg-[#1C1917]/4"
                >
                  <BookOpen className="h-4 w-4 text-[#78716C]" />
                  Read the Manifesto
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#1C1917]/12 pt-6">
                <div>
                  <div className="font-[family-name:var(--font-serif-editorial)] text-2xl text-[#1C1917]">
                    100%
                  </div>
                  <div className="mt-0.5 text-xs text-[#78716C]">
                    Local Markdown files
                  </div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-serif-editorial)] text-2xl text-[#1C1917]">
                    14ms
                  </div>
                  <div className="mt-0.5 text-xs text-[#78716C]">
                    Full-library search
                  </div>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-serif-editorial)] text-2xl text-[#1C1917]">
                    50 yrs
                  </div>
                  <div className="mt-0.5 text-xs text-[#78716C]">
                    Format durability
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Slip-Box Workbench */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-md border border-[#1C1917]/18 bg-[#FFFDF9] shadow-[0_24px_60px_-20px_rgba(28,25,23,0.14)]">
                {/* Paper Window Bar */}
                <div className="flex items-center justify-between border-b border-[#1C1917]/10 bg-[#F3EEE5] px-4 py-2.5">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#57534E]">
                    <FileText className="h-3.5 w-3.5 text-[#C84B31]" />
                    <span>folio / essays / on-compounding-attention.md</span>
                  </div>
                  <span className="rounded-sm bg-[#FAF7F2] px-2 py-0.5 font-mono text-[10px] tracking-wider text-[#78716C] uppercase border border-[#1C1917]/10">
                    Click highlighted links
                  </span>
                </div>

                <div className="grid divide-y divide-[#1C1917]/10 md:grid-cols-12 md:divide-x md:divide-y-0">
                  {/* Manuscript Pane */}
                  <div className="p-6 md:col-span-7">
                    <div className="font-mono text-[11px] tracking-wider text-[#78716C] uppercase">
                      DRAFT NO. 42 · NOVEMBER 19
                    </div>
                    <h2 className="mt-2 font-[family-name:var(--font-serif-editorial)] text-2xl text-[#1C1917]">
                      On Compounding Attention
                    </h2>

                    <div className="mt-4 space-y-4 font-[family-name:var(--font-serif-editorial)] text-[16.5px] leading-relaxed text-[#292524]">
                      <p>
                        Most note apps are cemeteries for good intentions. We
                        hoard articles in deep folders and never meet them again.
                        True thinking requires an{" "}
                        <button
                          type="button"
                          onClick={() => setActiveConcept("zettelkasten")}
                          className={`inline cursor-pointer rounded-xs px-1 py-0.5 transition-colors ${
                            activeConcept === "zettelkasten"
                              ? "bg-[#C84B31] text-[#FAF7F2]"
                              : "bg-[#C84B31]/12 text-[#9F3620] hover:bg-[#C84B31]/22"
                          }`}
                        >
                          [[Zettelkasten]]
                        </button>{" "}
                        where ideas talk to one another across time.
                      </p>
                      <p>
                        When you pair{" "}
                        <button
                          type="button"
                          onClick={() => setActiveConcept("quiet-synthesis")}
                          className={`inline cursor-pointer rounded-xs px-1 py-0.5 transition-colors ${
                            activeConcept === "quiet-synthesis"
                              ? "bg-[#C84B31] text-[#FAF7F2]"
                              : "bg-[#C84B31]/12 text-[#9F3620] hover:bg-[#C84B31]/22"
                          }`}
                        >
                          [[Quiet Synthesis]]
                        </button>{" "}
                        with gentle{" "}
                        <button
                          type="button"
                          onClick={() => setActiveConcept("spaced-recall")}
                          className={`inline cursor-pointer rounded-xs px-1 py-0.5 transition-colors ${
                            activeConcept === "spaced-recall"
                              ? "bg-[#C84B31] text-[#FAF7F2]"
                              : "bg-[#C84B31]/12 text-[#9F3620] hover:bg-[#C84B31]/22"
                          }`}
                        >
                          [[Spaced Recall]]
                        </button>
                        , reading ceases to be consumption and becomes dialogue.
                      </p>
                      <p>
                        Over months, small observations mature into{" "}
                        <button
                          type="button"
                          onClick={() => setActiveConcept("evergreen-notes")}
                          className={`inline cursor-pointer rounded-xs px-1 py-0.5 transition-colors ${
                            activeConcept === "evergreen-notes"
                              ? "bg-[#C84B31] text-[#FAF7F2]"
                              : "bg-[#C84B31]/12 text-[#9F3620] hover:bg-[#C84B31]/22"
                          }`}
                        >
                          [[Evergreen Notes]]
                        </button>
                        —a personal canon that grows sharper every year you live.
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-dashed border-[#1C1917]/15 pt-4 font-mono text-[11px] text-[#78716C]">
                      <span>482 words · 4 links</span>
                      <span className="text-[#3F5E4D]">● Saved locally</span>
                    </div>
                  </div>

                  {/* Marginalia / Slip Inspector Pane */}
                  <div className="flex flex-col justify-between bg-[#F7F3EB] p-5 md:col-span-5">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] tracking-widest text-[#C84B31] uppercase">
                          MARGINALIA SLIP
                        </span>
                        <span className="font-mono text-[11px] text-[#78716C]">
                          #{currentSlip.id}
                        </span>
                      </div>

                      <h3 className="mt-3 font-[family-name:var(--font-serif-editorial)] text-lg leading-snug text-[#1C1917]">
                        {currentSlip.title}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] text-[#78716C]">
                        {currentSlip.source}
                      </p>

                      <blockquote className="mt-4 border-l-2 border-[#C84B31] pl-3 text-sm leading-relaxed text-[#44403C] italic">
                        &ldquo;{currentSlip.excerpt}&rdquo;
                      </blockquote>

                      <div className="mt-5">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-[#78716C] uppercase">
                          <Link2 className="h-3 w-3" />
                          Backlinks ({currentSlip.backlinks.length})
                        </div>
                        <ul className="mt-2 space-y-1.5">
                          {currentSlip.backlinks.map((bl) => (
                            <li
                              key={bl}
                              className="flex items-center gap-2 rounded-xs bg-[#FAF7F2] px-2.5 py-1.5 text-xs text-[#292524] border border-[#1C1917]/8"
                            >
                              <Bookmark className="h-3 w-3 shrink-0 text-[#3F5E4D]" />
                              <span className="truncate">{bl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-1.5 border-t border-[#1C1917]/10 pt-3 font-mono text-[10px] text-[#78716C]">
                      <Clock className="h-3 w-3" />
                      <span>{currentSlip.updated}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Chapter Philosophy Spread */}
      <section id="philosophy" className="border-b border-[#1C1917]/12 bg-[#F4EFE6]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="flex flex-col justify-between gap-6 border-b border-[#1C1917]/15 pb-8 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs tracking-widest text-[#C84B31] uppercase">
                I — Architecture of Thought
              </span>
              <h2 className="mt-2 font-[family-name:var(--font-serif-editorial)] text-4xl tracking-tight text-[#1C1917]">
                Designed to mirror how memory actually works.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#57534E]">
              Human minds do not think in nested folders. We think by association,
              margin scribbles, and serendipitous rediscovery.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              {
                numeral: "I.",
                icon: Feather,
                title: "Frictionless Daily Folios",
                desc: "Every morning opens a fresh sheet of digital paper. Capture quotes, meeting sketches, and stray questions without deciding where they belong.",
              },
              {
                numeral: "II.",
                icon: Link2,
                title: "Living Marginalia & Backlinks",
                desc: "Link any phrase with double brackets. As your library grows, Engram displays relevant passages from past years in a serene side margin.",
              },
              {
                numeral: "III.",
                icon: Search,
                title: "Semantic & Instant Recall",
                desc: "Search by fuzzy memory—even if you forgot the exact word. Your entire lifetime of notes stays encrypted on your disk and opens in milliseconds.",
              },
            ].map((item) => (
              <article key={item.numeral} className="flex flex-col">
                <div className="flex items-center justify-between border-b border-[#1C1917]/12 pb-3">
                  <span className="font-[family-name:var(--font-serif-editorial)] text-3xl italic text-[#C84B31]">
                    {item.numeral}
                  </span>
                  <item.icon className="h-4 w-4 text-[#78716C]" />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-serif-editorial)] text-2xl text-[#1C1917]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#57534E]">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Workflow Chapter */}
      <section id="workflow" className="border-b border-[#1C1917]/12">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-[#3F5E4D] uppercase">
              II — From Fragment to Canon
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-serif-editorial)] text-4xl text-[#1C1917]">
              Follow one idea through a single day in Engram.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-3 lg:col-span-5">
              {WORKFLOW_STAGES.map((item, idx) => {
                const active = idx === activeStage;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={`cursor-pointer rounded-sm border p-5 text-left transition-all ${
                      active
                        ? "border-[#1C1917] bg-[#FFFDF9] shadow-sm"
                        : "border-[#1C1917]/12 bg-transparent hover:border-[#1C1917]/30 hover:bg-[#FFFDF9]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[11px] tracking-wider uppercase">
                      <span className={active ? "text-[#C84B31]" : "text-[#78716C]"}>
                        Stage {item.step} · {item.label}
                      </span>
                      <span className="text-[#78716C]">{item.time.split("·")[0]}</span>
                    </div>
                    <div className="mt-2 font-[family-name:var(--font-serif-editorial)] text-xl text-[#1C1917]">
                      {item.title}
                    </div>
                    {active && (
                      <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                        {item.body}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              <div className="flex h-full flex-col justify-between rounded-sm border border-[#1C1917]/18 bg-[#FFFDF9] p-8 shadow-sm">
                <div>
                  <div className="flex items-center justify-between border-b border-[#1C1917]/10 pb-4">
                    <span className="font-mono text-xs text-[#78716C]">
                      {stage.time}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#3F5E4D]">
                      <Sparkles className="h-3.5 w-3.5" />
                      Active Folio
                    </span>
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-serif-editorial)] text-2xl text-[#1C1917]">
                    {stage.sampleHeading}
                  </h3>
                  <div className="mt-6 space-y-4">
                    {stage.sampleLines.map((line, i) => (
                      <div
                        key={i}
                        className="border-l-2 border-[#1C1917]/15 pl-4 font-[family-name:var(--font-serif-editorial)] text-lg leading-relaxed text-[#292524]"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-[#1C1917]/10 pt-4 font-mono text-xs text-[#78716C]">
                  <span>Stored as standard UTF-8 Markdown</span>
                  <span>Zero vendor lock-in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book-Jacket Endorsements */}
      <section id="endorsements" className="border-b border-[#1C1917]/12 bg-[#1C1917] text-[#FAF7F2]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <div className="mb-12 flex items-center justify-between border-b border-white/15 pb-6">
            <span className="font-mono text-xs tracking-widest text-[#E07A5F] uppercase">
              III — Notes from the Desk
            </span>
            <span className="font-mono text-xs text-stone-400">
              42,000+ researchers, essayists & engineers
            </span>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                quote:
                  "Engram replaced three folders, a read-it-later queue, and forty paper notebooks. My last book virtually assembled itself from my marginalia.",
                author: "Dr. Clara Lindqvist",
                role: "Historian of Science, Uppsala",
              },
              {
                quote:
                  "It feels less like software and more like a quiet wooden desk with an impossible memory. Every morning I rediscover an idea I needed today.",
                author: "Julian Mercer",
                role: "Staff Architect & Essayist",
              },
              {
                quote:
                  "Because every file is plain Markdown on my own drive, I finally trust a second brain enough to put twenty years of research inside it.",
                author: "Nadia Okafor",
                role: "Investigative Journalist",
              },
            ].map((item) => (
              <figure key={item.author} className="flex flex-col justify-between">
                <blockquote className="font-[family-name:var(--font-serif-editorial)] text-xl leading-relaxed text-[#FAF7F2]/92 italic">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-white/12 pt-4">
                  <div className="text-sm font-medium text-[#FAF7F2]">
                    {item.author}
                  </div>
                  <div className="font-mono text-[11px] text-stone-400">
                    {item.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Editions / Pricing */}
      <section id="pricing" className="border-b border-[#1C1917]/12">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs tracking-widest text-[#C84B31] uppercase">
                IV — Editions
              </span>
              <h2 className="mt-2 font-[family-name:var(--font-serif-editorial)] text-4xl text-[#1C1917]">
                Honest pricing for a lifetime library.
              </h2>
            </div>

            <div className="inline-flex rounded-sm border border-[#1C1917]/20 bg-[#F3EEE5] p-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => setBilling("annual")}
                className={`cursor-pointer rounded-xs px-3 py-1.5 transition-colors ${
                  billing === "annual"
                    ? "bg-[#1C1917] text-[#FAF7F2]"
                    : "text-[#57534E]"
                }`}
              >
                Annual (Save 25%)
              </button>
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`cursor-pointer rounded-xs px-3 py-1.5 transition-colors ${
                  billing === "monthly"
                    ? "bg-[#1C1917] text-[#FAF7F2]"
                    : "text-[#57534E]"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Free Edition */}
            <div className="flex flex-col justify-between rounded-sm border border-[#1C1917]/15 bg-[#FFFDF9] p-8">
              <div>
                <div className="font-mono text-xs tracking-wider text-[#78716C] uppercase">
                  Edition 01
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-serif-editorial)] text-3xl text-[#1C1917]">
                  Personal Folio
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-serif-editorial)] text-4xl">
                    $0
                  </span>
                  <span className="font-mono text-xs text-[#78716C]">
                    / forever on desktop
                  </span>
                </div>
                <p className="mt-4 text-sm text-[#57534E]">
                  Everything you need to build a durable local-first second brain
                  on macOS, Windows, and Linux.
                </p>
                <ul className="mt-6 space-y-3 border-t border-[#1C1917]/10 pt-6 text-sm text-[#292524]">
                  {[
                    "Unlimited local Markdown notes & slip cards",
                    "Bidirectional [[wikilinks]] & marginalia view",
                    "Daily Folio journal & full-text instant search",
                    "Complete offline ownership & open export",
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3F5E4D]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#cta"
                className="mt-8 block rounded-sm border border-[#1C1917] py-3 text-center text-sm font-medium text-[#1C1917] transition-colors hover:bg-[#1C1917] hover:text-[#FAF7F2]"
              >
                Download Personal Folio
              </a>
            </div>

            {/* Scholar Edition */}
            <div className="flex flex-col justify-between rounded-sm border-2 border-[#1C1917] bg-[#FFFDF9] p-8 shadow-[8px_8px_0px_0px_rgba(28,25,23,0.08)]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-[#C84B31] uppercase">
                    Edition 02 · Most Beloved
                  </span>
                  <span className="rounded-xs bg-[#C84B31]/12 px-2 py-0.5 font-mono text-[10px] text-[#C84B31]">
                    E2E SYNC
                  </span>
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-serif-editorial)] text-3xl text-[#1C1917]">
                  Archival Scholar
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-serif-editorial)] text-4xl">
                    ${billing === "annual" ? "9" : "12"}
                  </span>
                  <span className="font-mono text-xs text-[#78716C]">
                    / month {billing === "annual" ? "billed annually" : ""}
                  </span>
                </div>
                <p className="mt-4 text-sm text-[#57534E]">
                  Zero-knowledge sync across all devices, PDF & Kindle highlight
                  importers, and private semantic resurfacing.
                </p>
                <ul className="mt-6 space-y-3 border-t border-[#1C1917]/10 pt-6 text-sm text-[#292524]">
                  {[
                    "Everything in Personal Folio",
                    "End-to-end encrypted sync (iOS, iPad, Desktop)",
                    "PDF annotation, Kindle & web-clipper bridge",
                    "Daily Spaced Resurfacing digest & semantic recall",
                    "Publish clean digital essays with custom domains",
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C84B31]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#cta"
                className="mt-8 block rounded-sm bg-[#C84B31] py-3 text-center text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#AD3E26]"
              >
                Begin 14-Day Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA & Colophon Footer */}
      <footer id="cta" className="bg-[#F3EEE5]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <span className="font-mono text-xs tracking-widest text-[#78716C] uppercase">
            Colophon · Begin Your Archive
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-serif-editorial)] text-4xl text-[#1C1917] sm:text-5xl">
            Stop letting your best ideas evaporate.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#57534E]">
            Download Engram for macOS, Windows, Linux, or iOS—or leave your
            email for our monthly essay on tools for thought.
          </p>

          <form
            onSubmit={handleJoin}
            className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reader@atelier.org"
              className="flex-1 rounded-sm border border-[#1C1917]/20 bg-[#FAF7F2] px-4 py-3 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#C84B31] focus:outline-none"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-sm bg-[#1C1917] px-6 py-3 text-sm font-medium text-[#FAF7F2] transition-colors hover:bg-[#C84B31]"
            >
              {joined ? "Welcome Aboard" : "Get Download Link"}
            </button>
          </form>

          {joined && (
            <p className="mt-3 font-mono text-xs text-[#3F5E4D]">
              Check your inbox — your personal Engram installer link is on the way.
            </p>
          )}

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#1C1917]/12 pt-8 font-mono text-[11px] text-[#78716C] sm:flex-row">
            <span>© 2026 ENGRAM PRESS · SET IN NEWSREADER & GEIST</span>
            <div className="flex gap-6">
              <a href="#philosophy" className="hover:text-[#1C1917]">
                PRIVACY PLEDGE
              </a>
              <a href="#workflow" className="hover:text-[#1C1917]">
                MARKDOWN SPEC
              </a>
              <a href="#pricing" className="hover:text-[#1C1917]">
                CHANGELOG
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
