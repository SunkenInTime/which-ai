"use client";

import React, { useState } from "react";
import Link from "next/link";

interface SlipCard {
  folgezettel: string;
  title: string;
  sourceAuthor: string;
  sourceWork: string;
  sourceQuote: string;
  synthesis: string;
  linkedSlips: string[];
  tag: string;
  dateStamp: string;
}

const INITIAL_SLIPS: SlipCard[] = [
  {
    folgezettel: "21a1",
    title: "Associative Trails Outlast Taxonomies",
    sourceAuthor: "Vannevar Bush",
    sourceWork: "As We May Think, The Atlantic (1945)",
    sourceQuote:
      "The human mind does not work by alphabetical or numerical indexing. It operates by association. With one item in its grasp, it snaps instantly to the next that is suggested by the association of thoughts.",
    synthesis:
      "Traditional library classification decays because categories are rigid while inquiry is fluid. A true Memex—or digital slip-box—must record the trail of attention itself as a permanent, traversable artifact.",
    linkedSlips: ["21a2", "21b"],
    tag: "EPISTEMOLOGY",
    dateStamp: "14 OCT · ARCHIVE IV",
  },
  {
    folgezettel: "21a2",
    title: "The Slip-Box as an Independent Dialogue Partner",
    sourceAuthor: "Niklas Luhmann",
    sourceWork: "Kommunikation mit Zettelkästen (1981)",
    sourceQuote:
      "Without notes, without a secondary memory, one remains bound to immediate impressions. Only when the slip-box develops its own internal complexity can it surprise its author.",
    synthesis:
      "Folgezettel branching (21a → 21a1 → 21a2) creates local neighborhoods of thought. When you query the box years later, it returns combinations you never consciously planned—turning note-taking into genuine conversation.",
    linkedSlips: ["21a1", "21a2a", "21b"],
    tag: "ZETTELKASTEN",
    dateStamp: "18 OCT · ARCHIVE IV",
  },
  {
    folgezettel: "21a2a",
    title: "Evergreen Notes Must Be Concept-Oriented and Atomic",
    sourceAuthor: "Andy Matuschak",
    sourceWork: "Evergreen Note-Writing as Fundamental Unit (2020)",
    sourceQuote:
      "Evergreen notes should be atomic, concept-oriented, and densely linked. Rather than organizing by book or project, factor notes around single durable ideas.",
    synthesis:
      "If a note tries to capture three ideas at once, you cannot link to it cleanly from distant domains. Atomicity is what makes a thought composable across a lifetime of essays.",
    linkedSlips: ["21a2", "21b"],
    tag: "CRAFT",
    dateStamp: "22 OCT · ARCHIVE IV",
  },
  {
    folgezettel: "21b",
    title: "Writing Is Not the Outcome of Thinking; Writing Is Thinking",
    sourceAuthor: "Sönke Ahrens",
    sourceWork: "How to Take Smart Notes (2017)",
    sourceQuote:
      "Notes on paper are not a mere external storage for ideas already formed in the head; they are the medium in which complex thought happens in the first place.",
    synthesis:
      "Translating a highlighted passage into your own prose exposes gaps in comprehension immediately. Noema pairs your source text side-by-side with your slip-card so distillation is effortless.",
    linkedSlips: ["21a1", "21a2a"],
    tag: "COGNITION",
    dateStamp: "25 OCT · ARCHIVE IV",
  },
];

const PIPELINE_STAGES = [
  {
    roman: "I",
    stage: "Literature Stream",
    subtitle: "Read with a pencil in hand",
    description:
      "Ingest PDFs, EPUBs, academic preprints, and long-form essays in a distraction-free typeset reader. Highlight passages without leaving your reading flow.",
    artifactCode: "SOURCE // BUSH_1945.PDF · P. 106",
    sampleText:
      "“Wholly new forms of encyclopedias will appear, ready made with a mesh of associative trails running through them...”",
  },
  {
    roman: "II",
    stage: "Marginalia & Fleeting Notes",
    subtitle: "Converse in the margins",
    description:
      "Scribble immediate reactions, counter-arguments, and questions directly beside the paragraph. Fleeting notes stay anchored to their exact bibliographic citation.",
    artifactCode: "MARGINALIA // INK ANNOTATION #408",
    sampleText:
      "Margin note: Bush foresaw bidirectional hypertext 45 years before the Web—yet browsers omitted two-way links!",
  },
  {
    roman: "III",
    stage: "Atomic Zettel Distillation",
    subtitle: "Mint a permanent slip-card",
    description:
      "Promote your best marginalia into an atomic, self-contained slip-card with a Folgezettel branching address (e.g. 21a2b) and link it to existing concepts.",
    artifactCode: "ZETTEL // CARD 21a2b · PERMANENT",
    sampleText:
      "Card 21a2b: Bidirectional links restore the two-way associative trail Vannevar Bush originally envisioned for the Memex.",
  },
  {
    roman: "IV",
    stage: "Manuscript Assembly",
    subtitle: "Draft from abundance, never a blank page",
    description:
      "Drag a sequence of connected slip-cards onto the composition desk. Your citations, footnotes, and prose skeleton assemble into a publishable essay in seconds.",
    artifactCode: "MANUSCRIPT // DRAFT_CHAPTER_03.MD",
    sampleText:
      "Section 3.1 assembled from 6 Evergreen Slips (21a1 → 21b) with automatic Chicago-style footnotes.",
  },
];

export default function IterationTwoPage() {
  const [slips, setSlips] = useState<SlipCard[]>(INITIAL_SLIPS);
  const [activeCode, setActiveCode] = useState<string>("21a2");
  const [activeStage, setActiveStage] = useState<number>(2);
  const [marginDraft, setMarginDraft] = useState<string>("");
  const [marginTitle, setMarginTitle] = useState<string>("");

  const activeSlip =
    slips.find((s) => s.folgezettel === activeCode) || slips[0];

  const handleMintSlip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marginDraft.trim()) return;
    const nextCode = `21c${slips.length - 3}`;
    const newSlip: SlipCard = {
      folgezettel: nextCode,
      title:
        marginTitle.trim() ||
        (marginDraft.length > 38
          ? marginDraft.slice(0, 38) + "…"
          : marginDraft),
      sourceAuthor: "Reader's Marginalia",
      sourceWork: "Personal Inquiry Notebook (2026)",
      sourceQuote:
        "Annotated directly from the Scholar's Atelier workbench during live reading.",
      synthesis: marginDraft.trim(),
      linkedSlips: [activeSlip.folgezettel, "21a2"],
      tag: "MARGINALIA",
      dateStamp: "MINTED TODAY · ARCHIVE V",
    };
    setSlips((prev) => [...prev, newSlip]);
    setActiveCode(nextCode);
    setMarginDraft("");
    setMarginTitle("");
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#191613] font-lora selection:bg-[#C84B31]/20 selection:text-[#191613]">
      {/* Subtle Paper Grain & Editorial Rule Frame */}
      <div className="border-b border-[#D8CFC0] bg-[#F3EDE0] px-6 py-2">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 font-ibm-mono text-[11px] tracking-wider text-[#5C5346]">
          <span>VOL. II — THE SCHOLAR&apos;S ATELIER (ITERATION /2)</span>
          <span className="hidden md:inline">
            FOLGEZETTEL CATALOGUE • MARGINALIA • EVERGREEN SYNTHESIS
          </span>
          <span>PLAIN-TEXT LONGEVITY GUARANTEED</span>
        </div>
      </div>

      {/* Editorial Masthead Navigation */}
      <header className="sticky top-0 z-30 border-b border-[#D8CFC0] bg-[#FAF6EE]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#191613] bg-[#191613] text-[#FAF6EE] font-newsreader italic text-lg">
              N
            </div>
            <div>
              <span className="font-newsreader text-2xl font-medium tracking-tight text-[#191613]">
                Noema{" "}
                <span className="italic font-normal text-[#C84B31]">
                  Atelier
                </span>
              </span>
              <span className="ml-3 hidden sm:inline-block rounded border border-[#C84B31]/40 bg-[#C84B31]/10 px-2 py-0.5 font-ibm-mono text-[10px] text-[#C84B31]">
                ZETTELKASTEN EDITION
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 font-ibm-mono text-xs uppercase tracking-widest text-[#4A4338]">
            <a href="#slipbox-desk" className="hover:text-[#C84B31] transition-colors">
              I. Slip-Box Desk
            </a>
            <a href="#alchemy" className="hover:text-[#C84B31] transition-colors">
              II. Distillation
            </a>
            <a href="#anatomy" className="hover:text-[#C84B31] transition-colors">
              III. Card Anatomy
            </a>
            <a href="#covenant" className="hover:text-[#C84B31] transition-colors">
              IV. 100-Year Format
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#covenant"
              className="rounded-full border border-[#191613] bg-[#191613] px-5 py-2 font-ibm-mono text-xs uppercase tracking-wider text-[#FAF6EE] hover:bg-[#C84B31] hover:border-[#C84B31] transition-colors"
            >
              Open Your Slip-Box →
            </a>
          </div>
        </div>
      </header>

      {/* EDITORIAL HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end border-b border-[#D8CFC0] pb-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 font-ibm-mono text-xs uppercase tracking-[0.2em] text-[#C84B31] mb-4">
              <span>§ 01 — A DIALOGUE PARTNER FOR DEEP THINKERS</span>
            </div>
            <h1 className="font-newsreader text-4xl sm:text-6xl lg:text-[66px] leading-[1.04] tracking-tight text-[#191613]">
              Turn everything you read into{" "}
              <span className="italic text-[#C84B31]">compounding wisdom.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 space-y-4">
            <p className="text-base leading-relaxed text-[#4A4338]">
              Inspired by Niklas Luhmann’s 90,000-card{" "}
              <em>Zettelkasten</em> and centuries of humanistic marginalia.
              Noema is a quiet study where fleeting highlights mature into
              interconnected manuscripts.
            </p>
            <div className="flex items-center gap-4 pt-1 font-ibm-mono text-xs text-[#285948]">
              <span>● FOLGEZETTEL INDEXING</span>
              <span>● SIDE-BY-SIDE MARGINALIA</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE SLIP-BOX & MARGINALIA WORKBENCH */}
        <div
          id="slipbox-desk"
          className="mt-12 rounded-2xl border border-[#CFC5B4] bg-[#F3EDE0] p-4 sm:p-8 shadow-[0_24px_60px_rgba(25,22,19,0.08)]"
        >
          {/* Workbench Top Index Tab Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D8CFC0] pb-4 mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-ibm-mono text-xs uppercase tracking-wider text-[#6E6455] mr-2">
                SLIP-BOX TRAY:
              </span>
              {slips.map((slip) => {
                const isActive = slip.folgezettel === activeCode;
                return (
                  <button
                    key={slip.folgezettel}
                    type="button"
                    onClick={() => setActiveCode(slip.folgezettel)}
                    className={`rounded-lg border px-3 py-1.5 font-ibm-mono text-xs transition-all cursor-pointer ${
                      isActive
                        ? "border-[#C84B31] bg-[#C84B31] text-[#FAF6EE] font-semibold shadow-sm"
                        : "border-[#CFC5B4] bg-[#FAF6EE] text-[#3B352C] hover:border-[#191613]"
                    }`}
                  >
                    № {slip.folgezettel}
                  </button>
                );
              })}
            </div>
            <span className="font-ibm-mono text-[11px] text-[#6E6455]">
              SELECT ANY FOLGEZETTEL CARD TO INSPECT SOURCE & SYNTHESIS
            </span>
          </div>

          {/* Two-Pane Reading & Zettelkasten Desk */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Pane: Primary Source & Highlighted Passage */}
            <div className="lg:col-span-5 rounded-xl border border-[#D8CFC0] bg-[#FAF6EE] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-3 font-ibm-mono text-[11px] text-[#6E6455]">
                  <span>PRIMARY LITERATURE SOURCE</span>
                  <span className="text-[#285948]">BIBLIOGRAPHIC LINKED</span>
                </div>

                <p className="mt-4 font-ibm-mono text-xs uppercase tracking-wider text-[#C84B31]">
                  {activeSlip.sourceAuthor}
                </p>
                <h3 className="font-newsreader italic text-lg text-[#191613]">
                  {activeSlip.sourceWork}
                </h3>

                <blockquote className="mt-5 border-l-2 border-[#C84B31] bg-[#F5EFE2] p-4 font-lora text-sm leading-relaxed text-[#24201C] italic">
                  “{activeSlip.sourceQuote}”
                </blockquote>

                <p className="mt-4 text-xs text-[#6E6455] leading-relaxed">
                  Click other Folgezettel tabs above or linked cards on the right
                  to trace how this highlight branches into your slip-box.
                </p>
              </div>

              {/* Interactive Mint New Slip Form */}
              <form
                onSubmit={handleMintSlip}
                className="mt-6 border-t border-[#E5DEC9] pt-4 space-y-2.5"
              >
                <div className="flex items-center justify-between font-ibm-mono text-[11px] text-[#4A4338]">
                  <span>+ WRITE MARGINALIA & MINT SLIP CARD</span>
                  <span className="text-[#C84B31]">NEW ID: 21c{slips.length - 3}</span>
                </div>
                <input
                  type="text"
                  value={marginTitle}
                  onChange={(e) => setMarginTitle(e.target.value)}
                  placeholder="Concept title (optional)..."
                  className="w-full rounded-lg border border-[#D8CFC0] bg-white px-3 py-1.5 text-xs text-[#191613] placeholder-[#8C8273] focus:border-[#C84B31] focus:outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={marginDraft}
                    onChange={(e) => setMarginDraft(e.target.value)}
                    placeholder="Distill an atomic thought in your own words..."
                    className="w-full rounded-lg border border-[#D8CFC0] bg-white px-3 py-2 text-xs text-[#191613] placeholder-[#8C8273] focus:border-[#C84B31] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-[#191613] px-3.5 py-2 font-ibm-mono text-xs text-[#FAF6EE] hover:bg-[#C84B31] transition-colors cursor-pointer"
                  >
                    File Card
                  </button>
                </div>
              </form>
            </div>

            {/* Right Pane: The Physical-Tactile Zettelkasten Index Card */}
            <div className="lg:col-span-7 relative">
              {/* Background stacked card illusion */}
              <div className="pointer-events-none absolute -right-2 top-2 hidden sm:block h-full w-full rounded-xl border border-[#D8CFC0] bg-[#EFE8D8]" />

              <div className="relative h-full rounded-xl border-2 border-[#191613] bg-[#FFFDF9] p-6 sm:p-8 flex flex-col justify-between shadow-[0_12px_30px_rgba(25,22,19,0.08)]">
                <div>
                  {/* Index Card Header with Folgezettel Call Number */}
                  <div className="flex items-start justify-between gap-4 border-b-2 border-[#191613] pb-4">
                    <div>
                      <span className="inline-block rounded bg-[#C84B31] px-2.5 py-0.5 font-ibm-mono text-xs font-semibold text-[#FAF6EE]">
                        INDEX № {activeSlip.folgezettel}
                      </span>
                      <span className="ml-2.5 font-ibm-mono text-xs text-[#6E6455]">
                        [{activeSlip.tag}]
                      </span>
                    </div>
                    <span className="font-ibm-mono text-xs text-[#6E6455]">
                      {activeSlip.dateStamp}
                    </span>
                  </div>

                  {/* Atomic Concept Title */}
                  <h2 className="mt-5 font-newsreader text-2xl sm:text-3xl font-medium text-[#191613] leading-snug">
                    {activeSlip.title}
                  </h2>

                  {/* Synthesis Prose on Ruled Lines */}
                  <div
                    className="mt-5 py-3 text-base leading-[2rem] text-[#24201C]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom, transparent 31px, #EBE4D5 32px)",
                      backgroundSize: "100% 32px",
                    }}
                  >
                    <p>{activeSlip.synthesis}</p>
                  </div>
                </div>

                {/* Card Footer: Folgezettel Branching Links */}
                <div className="mt-8 border-t border-[#D8CFC0] pt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-ibm-mono text-xs uppercase text-[#6E6455]">
                      Folgezettel Branches:
                    </span>
                    {activeSlip.linkedSlips.map((code) => {
                      const target = slips.find((s) => s.folgezettel === code);
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => target && setActiveCode(code)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-[#191613]/30 bg-[#F3EDE0] px-2.5 py-1 font-ibm-mono text-xs font-medium text-[#191613] hover:border-[#C84B31] hover:text-[#C84B31] transition-colors cursor-pointer"
                        >
                          <span>→ Card {code}</span>
                          {target && (
                            <span className="hidden sm:inline text-[#6E6455] truncate max-w-[140px]">
                              ({target.title})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <span className="font-ibm-mono text-[11px] text-[#285948]">
                    ✓ VERIFIED EVERGREEN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 4-STAGE ALCHEMICAL PIPELINE */}
      <section id="alchemy" className="mx-auto max-w-7xl px-6 py-16 border-b border-[#D8CFC0]">
        <div className="max-w-2xl">
          <span className="font-ibm-mono text-xs uppercase tracking-[0.2em] text-[#C84B31]">
            § 02 — PROGRESSIVE DISTILLATION
          </span>
          <h2 className="mt-2 font-newsreader text-3xl sm:text-5xl text-[#191613]">
            From fleeting highlight to{" "}
            <span className="italic text-[#285948]">finished manuscript.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A4338]">
            Step through the four stages of scholarly synthesis below to see how
            Noema turns passive reading into active authorship.
          </p>
        </div>

        {/* Interactive Stage Selector */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          {PIPELINE_STAGES.map((item, idx) => {
            const isSelected = idx === activeStage;
            return (
              <button
                key={item.roman}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`rounded-xl border p-5 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#191613] bg-[#191613] text-[#FAF6EE] shadow-md"
                    : "border-[#D8CFC0] bg-[#F3EDE0]/70 text-[#191613] hover:border-[#191613]"
                }`}
              >
                <div className="flex items-center justify-between font-ibm-mono text-xs">
                  <span className={isSelected ? "text-[#C84B31]" : "text-[#C84B31]"}>
                    STAGE {item.roman}
                  </span>
                  <span>0{idx + 1} / 04</span>
                </div>
                <h3 className="mt-3 font-newsreader text-xl font-medium">
                  {item.stage}
                </h3>
                <p
                  className={`mt-1 text-xs ${
                    isSelected ? "text-[#D8CFC0]" : "text-[#6E6455]"
                  }`}
                >
                  {item.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Inspection Panel */}
        <div className="mt-6 rounded-2xl border border-[#D8CFC0] bg-[#FFFDF9] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="font-ibm-mono text-xs uppercase tracking-widest text-[#285948]">
              STAGE {PIPELINE_STAGES[activeStage].roman} —{" "}
              {PIPELINE_STAGES[activeStage].subtitle}
            </span>
            <h3 className="font-newsreader text-3xl text-[#191613]">
              {PIPELINE_STAGES[activeStage].stage}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#4A4338]">
              {PIPELINE_STAGES[activeStage].description}
            </p>
          </div>
          <div className="lg:col-span-6 rounded-xl border border-[#D8CFC0] bg-[#F3EDE0] p-6">
            <div className="font-ibm-mono text-[11px] text-[#6E6455] border-b border-[#D8CFC0] pb-2 mb-3">
              {PIPELINE_STAGES[activeStage].artifactCode}
            </div>
            <p className="font-newsreader italic text-lg text-[#191613] leading-relaxed">
              {PIPELINE_STAGES[activeStage].sampleText}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: ANATOMY OF AN ATOMIC SLIP & 100-YEAR COVENANT */}
      <section id="anatomy" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-[#D8CFC0] bg-[#F3EDE0]/60 p-7">
            <span className="font-ibm-mono text-xs text-[#C84B31]">
              01 // FOLGEZETTEL ADDRESSING
            </span>
            <h3 className="mt-3 font-newsreader text-2xl text-[#191613]">
              Alphanumeric Threads (`21a1b`)
            </h3>
            <p className="mt-2 text-sm text-[#4A4338] leading-relaxed">
              Unlike flat tags that turn into noisy clouds of 400 items,
              Folgezettel numbering gives every thought a tactile neighborhood
              and branching lineage.
            </p>
          </div>

          <div className="rounded-2xl border border-[#D8CFC0] bg-[#F3EDE0]/60 p-7">
            <span className="font-ibm-mono text-xs text-[#285948]">
              02 // AUTOMATIC BIBLIOGRAPHY
            </span>
            <h3 className="mt-3 font-newsreader text-2xl text-[#191613]">
              BibTeX, DOI & Page Anchors
            </h3>
            <p className="mt-2 text-sm text-[#4A4338] leading-relaxed">
              Every highlight remembers the exact page number, PDF coordinate,
              and DOI of its parent work. Export to LaTeX, Pandoc, or Word with
              zero broken citations.
            </p>
          </div>

          <div className="rounded-2xl border border-[#D8CFC0] bg-[#F3EDE0]/60 p-7">
            <span className="font-ibm-mono text-xs text-[#191613]">
              03 // ARCHIVAL SOVEREIGNTY
            </span>
            <h3 className="mt-3 font-newsreader text-2xl text-[#191613]">
              The 100-Year File Guarantee
            </h3>
            <p className="mt-2 text-sm text-[#4A4338] leading-relaxed">
              Luhmann’s physical paper slips are still readable 60 years later.
              Your Noema vault is pure UTF-8 Markdown + YAML frontmatter on your
              hard drive—readable in 2126.
            </p>
          </div>
        </div>

        {/* Colophon CTA */}
        <div
          id="covenant"
          className="mt-16 rounded-2xl border-2 border-[#191613] bg-[#F3EDE0] p-8 sm:p-12 text-center"
        >
          <span className="font-ibm-mono text-xs uppercase tracking-[0.2em] text-[#C84B31]">
            EX LIBRIS • PERSONAL INTELLECTUAL ARCHIVE
          </span>
          <h2 className="mt-3 font-newsreader text-3xl sm:text-5xl text-[#191613]">
            Begin your lifelong{" "}
            <span className="italic text-[#C84B31]">Zettelkasten</span> today.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#4A4338]">
            Includes the full Folgezettel desk, PDF/EPUB marginalia reader,
            Readwise & Zotero two-way sync, and local Markdown vault.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full bg-[#191613] px-7 py-3.5 font-ibm-mono text-xs uppercase tracking-wider text-[#FAF6EE] hover:bg-[#C84B31] transition-colors cursor-pointer"
            >
              Claim Your Archival Desk
            </button>
            <Link
              href="/without-design-skill/gemini-4-argon/3"
              className="rounded-full border border-[#191613] px-6 py-3.5 font-ibm-mono text-xs uppercase tracking-wider text-[#191613] hover:bg-[#191613] hover:text-[#FAF6EE] transition-colors"
            >
              Explore Iteration /3 (Swiss Cognitive OS) →
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="border-t border-[#D8CFC0] bg-[#F3EDE0] py-10 px-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 font-ibm-mono text-xs text-[#5C5346]">
          <span>NOEMA ATELIER // ITERATION 02 OF 05 (ARCHIVAL ZETTELKASTEN)</span>
          <div className="flex items-center gap-3">
            <span>Switch Iteration:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <Link
                key={n}
                href={`/without-design-skill/gemini-4-argon/${n}`}
                className={`rounded px-2 py-1 ${
                  n === 2
                    ? "bg-[#C84B31] text-[#FAF6EE] font-bold"
                    : "hover:text-[#191613]"
                }`}
              >
                /{n}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
