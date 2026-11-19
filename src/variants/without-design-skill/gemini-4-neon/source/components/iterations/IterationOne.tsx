"use client";

import { useState } from "react";

interface SlipNote {
  id: string;
  code: string;
  title: string;
  category: string;
  updated: string;
  readTime: string;
  paragraphs: Array<{
    text: string;
    link?: { label: string; targetId: string };
    after?: string;
  }>;
  marginNote: string;
  backlinks: Array<{ id: string; code: string; title: string; context: string }>;
  tags: string[];
}

const SLIP_NOTES: SlipNote[] = [
  {
    id: "synthesis",
    code: "14a.1",
    title: "Memory is Associative, Never Hierarchical",
    category: "Core Thesis",
    updated: "Nov 14 · 09:42",
    readTime: "184 words",
    paragraphs: [
      {
        text: "Folders force every idea to live in exactly one drawer. Yet a single insight from cognitive psychology often belongs simultaneously to product craft, writing habits, and ",
        link: { label: "[[08f · Reading with a Pen]]", targetId: "reading" },
        after: ".",
      },
      {
        text: "When notes are atomic and densely linked, your archive behaves less like a filing cabinet and more like a quiet conversation partner. Revisit ",
        link: { label: "[[14b · Evergreen Notes]]", targetId: "evergreen" },
        after:
          " to see how small daily revisions compound over years into original essays.",
      },
    ],
    marginNote:
      "Luhmann produced 70 books and 400 scholarly articles from 90,000 handwritten index cards—never once using a folder tree.",
    backlinks: [
      {
        id: "evergreen",
        code: "14b.3",
        title: "Evergreen Notes Compound Quietly",
        context: "“…unlike hierarchical silos, associative memory lets…”",
      },
      {
        id: "recall",
        code: "22c.0",
        title: "Spaced Resurfacing Without Streaks",
        context: "“…surfaces forgotten slips at the moment of writing…”",
      },
    ],
    tags: ["#zettelkasten", "#cognition", "#architecture"],
  },
  {
    id: "evergreen",
    code: "14b.3",
    title: "Evergreen Notes Compound Quietly",
    category: "Practice",
    updated: "Nov 16 · 18:15",
    readTime: "156 words",
    paragraphs: [
      {
        text: "Most note apps become graveyards of half-copied transcripts. An evergreen note stays deliberately brief, written in your own voice, and refined each time a related source contradicts or sharpens it—echoing ",
        link: { label: "[[14a · Associative Memory]]", targetId: "synthesis" },
        after: ".",
      },
      {
        text: "Pair atomic notes with ",
        link: { label: "[[22c · Spaced Resurfacing]]", targetId: "recall" },
        after:
          " so ideas from eighteen months ago gently reappear right beside today’s morning draft.",
      },
    ],
    marginNote:
      "A great second brain rewards revisiting old paragraphs more than hoarding new bookmarks.",
    backlinks: [
      {
        id: "synthesis",
        code: "14a.1",
        title: "Memory is Associative, Never Hierarchical",
        context: "“…how small daily revisions compound over years…”",
      },
      {
        id: "reading",
        code: "08f.2",
        title: "Reading with a Pen in the Margin",
        context: "“…distilling a chapter into three evergreen slips…”",
      },
    ],
    tags: ["#evergreen", "#writing", "#compounding"],
  },
  {
    id: "recall",
    code: "22c.0",
    title: "Spaced Resurfacing Without Streaks",
    category: "Retrieval",
    updated: "Nov 17 · 07:30",
    readTime: "142 words",
    paragraphs: [
      {
        text: "Recall shouldn’t feel like flashcard homework. While you draft a new paragraph, Noema silently scans your local vault and whispers three relevant passages in the margin—grounded in ",
        link: { label: "[[14a · Associative Memory]]", targetId: "synthesis" },
        after: ".",
      },
      {
        text: "Nothing is sent to an external training server. Your semantic index stays encrypted on disk alongside plain Markdown, preserving the craft of ",
        link: { label: "[[08f · Reading with a Pen]]", targetId: "reading" },
        after: ".",
      },
    ],
    marginNote:
      "Local semantic embeddings run in < 14ms on Apple Silicon & modern laptops, completely offline.",
    backlinks: [
      {
        id: "evergreen",
        code: "14b.3",
        title: "Evergreen Notes Compound Quietly",
        context: "“…ideas from eighteen months ago gently reappear…”",
      },
    ],
    tags: ["#local-first", "#recall", "#privacy"],
  },
  {
    id: "reading",
    code: "08f.2",
    title: "Reading with a Pen in the Margin",
    category: "Literature",
    updated: "Nov 11 · 21:08",
    readTime: "168 words",
    paragraphs: [
      {
        text: "Highlighting alone creates the illusion of understanding. Real retention begins when you close the book and translate a chapter into two or three ",
        link: { label: "[[14b · Evergreen Notes]]", targetId: "evergreen" },
        after: " in plain prose.",
      },
      {
        text: "Noema imports PDF annotations, Kindle clippings, and web excerpts into a calm side-by-side literature folio, ready to weave into ",
        link: { label: "[[14a · Associative Memory]]", targetId: "synthesis" },
        after: ".",
      },
    ],
    marginNote:
      "Every clipping keeps its exact page citation and source permalink automatically.",
    backlinks: [
      {
        id: "synthesis",
        code: "14a.1",
        title: "Memory is Associative, Never Hierarchical",
        context: "“…belongs simultaneously to product craft, writing…”",
      },
      {
        id: "recall",
        code: "22c.0",
        title: "Spaced Resurfacing Without Streaks",
        context: "“…preserving the craft of reading with a pen…”",
      },
    ],
    tags: ["#marginalia", "#books", "#citations"],
  },
];

interface LifecycleStep {
  step: string;
  label: string;
  heading: string;
  summary: string;
  artifactTitle: string;
  artifactBody: string;
  meta: string;
}

const LIFECYCLE_STEPS: LifecycleStep[] = [
  {
    step: "01",
    label: "Fleeting Spark",
    heading: "Catch the half-sentence before it evaporates.",
    summary:
      "A global quick-capture sheet opens in 30 milliseconds from anywhere—macOS, iOS, or the command line. Voice memos transcribe locally without interrupting your train of thought.",
    artifactTitle: "Inbox · Today 08:14",
    artifactBody:
      "“Why do physical desks preserve spatial memory so much better than nested browser tabs? Look into Kirsh’s paper on intelligent use of space.”",
    meta: "Captured via ⌥ Space · 0.03s · Unfiled",
  },
  {
    step: "02",
    label: "Literature Note",
    heading: "Distill books, PDFs, and essays side by side.",
    summary:
      "Bring highlights from Kindle, Readwise, PDFs, and web articles into a dual-pane reading desk. Annotate in the margins with automatic bibliographic provenance.",
    artifactTitle: "Ref · David Kirsh (1995) — The Intelligent Use of Space",
    artifactBody:
      "Kirsh shows chefs and architects rearrange physical tools to reduce working-memory load. Spatial arrangement is itself a form of computation, not merely storage.",
    meta: "p. 34–39 · 3 excerpts linked · Artificial Intelligence Journal",
  },
  {
    step: "03",
    label: "Permanent Slip",
    heading: "Forge atomic concepts linked across domains.",
    summary:
      "Promote insights into concise, timeless slips. Type [[ to connect existing thoughts; Noema automatically detects unlinked mentions and renders crisp bi-directional margins.",
    artifactTitle: "Slip 19d.4 · Spatial Arrangement as External Cognition",
    artifactBody:
      "Placing related notes within immediate visual reach turns recall into recognition. Connects [[14a · Associative Memory]] with [[31a · Calm Interface Design]].",
    meta: "7 backlinks · Updated 3 times · Plain .md file",
  },
  {
    step: "04",
    label: "Finished Manuscript",
    heading: "Assemble essays from an already-rich lattice.",
    summary:
      "Never face a blinking blank page again. Drag a cluster of connected slips into Manuscript Mode, weave transitions, and export clean Markdown, PDF, or Substack HTML.",
    artifactTitle: "Draft · Designing Tools That Respect Quiet Attention",
    artifactBody:
      "Section II assembled from 6 linked slips (1,480 words). Every footnote and source citation resolves automatically to its original literature card.",
    meta: "Ready to publish · 6 source slips · 0 broken citations",
  },
];

export function IterationOne() {
  const [activeSlipId, setActiveSlipId] = useState<string>("synthesis");
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const activeSlip =
    SLIP_NOTES.find((n) => n.id === activeSlipId) ?? SLIP_NOTES[0];
  const activeStep = LIFECYCLE_STEPS[activeStepIdx];

  function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-paper-grain text-[#1C1917] font-humanist selection:bg-[#B84A27]/15 selection:text-[#8A3115]">
      {/* Archival Top Ledger Bar */}
      <div className="border-b border-[#E3DACB] bg-[#F5EFE5]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#786E63]">
          <span>Folio 01 · Local-First Knowledge Archive</span>
          <span className="hidden sm:inline">
            Plain Markdown · Offline Semantic Recall · macOS, Linux &amp; iOS
          </span>
        </div>
      </div>

      {/* Editorial Navigation */}
      <header className="sticky top-0 z-30 border-b border-[#E3DACB]/90 bg-[#FAF7F2]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#1C1917] bg-[#1C1917] text-[#FAF7F2] transition-transform duration-300 group-hover:rotate-3">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <circle cx="5.5" cy="5.5" r="2" fill="currentColor" />
                <circle cx="14.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="14.5" r="2.2" fill="#E07A5F" />
                <path
                  d="M7.2 6.5L9.1 12.4M13.2 7.1L11.1 12.4M7.6 5.5H12.4"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
              </svg>
            </span>
            <span className="font-editorial text-2xl tracking-tight text-[#1C1917]">
              Noema
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#575049] md:flex">
            <a href="#desk" className="transition-colors hover:text-[#1C1917]">
              Slip-Box
            </a>
            <a href="#method" className="transition-colors hover:text-[#1C1917]">
              Philosophy
            </a>
            <a href="#lifecycle" className="transition-colors hover:text-[#1C1917]">
              Workflow
            </a>
            <a href="#colophon" className="transition-colors hover:text-[#1C1917]">
              Membership
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#colophon"
              className="hidden text-[13px] font-medium text-[#575049] transition-colors hover:text-[#1C1917] sm:inline"
            >
              Sign in
            </a>
            <a
              href="#download"
              className="rounded-full bg-[#1C1917] px-4 py-2 text-[13px] font-medium text-[#FAF7F2] transition-all hover:bg-[#B84A27]"
            >
              Download Beta
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="mb-6 inline-flex items-center gap-2.5 border-b border-[#B84A27]/40 pb-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#B84A27]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B84A27]" />
              A Quiet Second Brain for Deep Work
            </div>
            <h1 className="font-editorial text-[3.5rem] leading-[0.96] tracking-[-0.02em] text-[#1C1917] sm:text-[4.85rem] lg:text-[5.75rem]">
              Think in threads,{" "}
              <span className="italic text-[#B84A27]">not folders.</span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-[16px] leading-[1.68] text-[#575049]">
              Noema is a calm, local-first slip-box that weaves your fleeting notes,
              book marginalia, and half-formed essays into a living memory you own
              forever.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#download"
                className="inline-flex items-center gap-2 rounded-full bg-[#1C1917] px-5 py-2.5 text-[14px] font-medium text-[#FAF7F2] transition-all hover:bg-[#B84A27]"
              >
                Begin your archive
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#desk"
                className="inline-flex items-center gap-2 rounded-full border border-[#D4C9B8] bg-[#FFFDF9] px-5 py-2.5 text-[14px] font-medium text-[#1C1917] transition-colors hover:border-[#1C1917]"
              >
                Try the live slip-box
              </a>
            </div>
            <p className="mt-3 font-mono text-[11px] text-[#8A8076]">
              Free personal vault · 100% plain .md files · Zero lock-in
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Zettelkasten Slip-Box Desk */}
      <section id="desk" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="overflow-hidden rounded-xl border border-[#DDD3C3] bg-[#FFFDF9] shadow-[0_24px_70px_-28px_rgba(44,32,20,0.2)]">
          {/* App Chrome Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE2D4] bg-[#F7F2E8] px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8CEBE]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8CEBE]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8CEBE]" />
              </div>
              <span className="h-3.5 w-px bg-[#DFD6C7]" />
              <span className="font-mono text-[11px] text-[#786E63]">
                ~/Vault/SecondBrain/{activeSlip.code}.md
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-[#786E63]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4A6751]/10 px-2.5 py-0.5 text-[#3B5541]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4A6751]" />
                Saved locally
              </span>
              <span className="hidden sm:inline">
                Click any{" "}
                <span className="text-[#B84A27] underline decoration-[#B84A27]/40 underline-offset-2">
                  [[wikilink]]
                </span>{" "}
                to traverse
              </span>
            </div>
          </div>

          {/* 3-Column Editorial Workspace */}
          <div className="grid lg:grid-cols-12">
            {/* Left Index Drawer */}
            <aside className="border-b border-[#EAE2D4] bg-[#FBF8F2] p-4 lg:col-span-3 lg:border-r lg:border-b-0">
              <div className="mb-3 flex items-center justify-between px-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8A8076]">
                  Slip Index (4)
                </span>
                <span className="font-mono text-[10px] text-[#B84A27]">⌘K</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
                {SLIP_NOTES.map((note) => {
                  const isSelected = note.id === activeSlip.id;
                  return (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => setActiveSlipId(note.id)}
                      className={`group w-full rounded-lg border px-3 py-2.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#D6C7B2] bg-[#FFFDF9] shadow-[0_2px_10px_rgba(28,25,23,0.05)]"
                          : "border-transparent hover:border-[#E6DEC8] hover:bg-[#FFFDF9]/70"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span
                          className={
                            isSelected ? "text-[#B84A27] font-medium" : "text-[#8A8076]"
                          }
                        >
                          {note.code}
                        </span>
                        <span className="text-[#A3988C]">{note.category}</span>
                      </div>
                      <p
                        className={`mt-1 text-[13px] leading-snug ${
                          isSelected
                            ? "font-semibold text-[#1C1917]"
                            : "font-medium text-[#575049] group-hover:text-[#1C1917]"
                        }`}
                      >
                        {note.title}
                      </p>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Center Reading & Writing Sheet */}
            <article className="p-6 sm:p-9 lg:col-span-6 lg:border-r lg:border-[#EAE2D4]">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#8A8076]">
                <span className="rounded bg-[#B84A27]/10 px-2 py-0.5 text-[#B84A27]">
                  SLIP {activeSlip.code}
                </span>
                <span>{activeSlip.updated}</span>
                <span>·</span>
                <span>{activeSlip.readTime}</span>
              </div>

              <h2 className="mt-4 font-editorial text-3xl leading-[1.08] text-[#1C1917] sm:text-[2.5rem]">
                {activeSlip.title}
              </h2>

              <div className="mt-6 space-y-5 text-[15.5px] leading-[1.82] text-[#3B3530]">
                {activeSlip.paragraphs.map((p, idx) => (
                  <p key={idx}>
                    {p.text}
                    {p.link && (
                      <button
                        type="button"
                        onClick={() => setActiveSlipId(p.link!.targetId)}
                        className="inline rounded bg-[#B84A27]/8 px-1.5 py-0.5 font-mono text-[13px] text-[#B84A27] underline decoration-[#B84A27]/40 underline-offset-4 transition-colors hover:bg-[#B84A27] hover:text-[#FAF7F2] cursor-pointer"
                      >
                        {p.link.label}
                      </button>
                    )}
                    {p.after}
                  </p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-[#EFE8DC] pt-5">
                {activeSlip.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#E5DDD0] bg-[#FAF7F2] px-2.5 py-1 font-mono text-[11px] text-[#6B6258]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Right Margin Notes & Backlinks */}
            <aside className="bg-[#FDFBF7] p-6 lg:col-span-3">
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8A8076]">
                  Marginalia
                </h3>
                <blockquote className="mt-3 border-l-2 border-[#B84A27] pl-3.5 font-editorial text-[19px] italic leading-[1.35] text-[#433C36]">
                  “{activeSlip.marginNote}”
                </blockquote>
              </div>

              <div className="mt-8 border-t border-[#EAE2D4] pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8A8076]">
                    Linked References
                  </h3>
                  <span className="font-mono text-[10px] text-[#4A6751]">
                    {activeSlip.backlinks.length} incoming
                  </span>
                </div>

                <div className="mt-3 space-y-2.5">
                  {activeSlip.backlinks.map((bl) => (
                    <button
                      key={bl.id}
                      type="button"
                      onClick={() => setActiveSlipId(bl.id)}
                      className="w-full rounded-lg border border-[#EAE2D4] bg-[#FFFDF9] p-3 text-left transition-all hover:border-[#B84A27]/50 hover:shadow-xs cursor-pointer"
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#B84A27]">
                        <span>{bl.code}</span>
                        <span>Jump →</span>
                      </div>
                      <p className="mt-1 text-[12.5px] font-semibold text-[#1C1917]">
                        {bl.title}
                      </p>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-[#786E63]">
                        {bl.context}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Three Editorial Pillars */}
      <section id="method" className="border-t border-[#E3DACB] bg-[#F6F1E8]/60 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 pb-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#B84A27]">
                The Method
              </span>
              <h2 className="mt-3 font-editorial text-4xl leading-[1.04] text-[#1C1917] sm:text-5xl">
                Built for the slow work of{" "}
                <span className="italic">understanding.</span>
              </h2>
            </div>
            <p className="text-[16px] leading-[1.75] text-[#575049] lg:col-span-6 lg:col-start-7 lg:self-end">
              Most productivity tools reward busyness—nested databases, dashboards,
              and endless color tags. Noema removes everything between a fleeting
              thought and its permanent place in your intellectual lineage.
            </p>
          </div>

          <div className="grid border-t border-[#DDD3C3] md:grid-cols-3">
            {/* Pillar 1 */}
            <div className="border-b border-[#DDD3C3] py-10 md:border-r md:border-b-0 md:pr-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-[#B84A27]">I. CAPTURE</span>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#1C1917]">
                  <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M11 18H15L17 12L19.5 24L21.5 16L23 18H25" stroke="#B84A27" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-7 font-editorial text-3xl text-[#1C1917]">
                Frictionless entry, anywhere
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#575049]">
                Clip book highlights, dictate walks-in-the-park voice notes, or jot a
                midnight phrase with a single keystroke. Everything lands gently in
                your daily ledger—never demanding a folder name upfront.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="border-b border-[#DDD3C3] py-10 md:border-r md:border-b-0 md:px-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-[#B84A27]">II. CONNECT</span>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#1C1917]">
                  <circle cx="9" cy="11" r="3" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="27" cy="11" r="3" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="18" cy="26" r="3.5" fill="#B84A27" />
                  <path d="M11.6 12.6L16.1 23M24.4 12.6L19.9 23M12 11H24" stroke="currentColor" strokeWidth="1.1" />
                </svg>
              </div>
              <h3 className="mt-7 font-editorial text-3xl text-[#1C1917]">
                Bi-directional margin threads
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#575049]">
                Link concepts with effortless <code className="font-mono text-[13px] text-[#B84A27]">[[brackets]]</code>.
                Backlinks appear beside your text like classic scholarly marginalia,
                revealing hidden bridges across years of reading.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="py-10 md:pl-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-[#B84A27]">III. RESURFACE</span>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#1C1917]">
                  <path d="M7 25C11 25 12 11 18 11C24 11 25 22 29 22" stroke="#B84A27" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M6 28H30" stroke="currentColor" strokeWidth="1" />
                  <circle cx="18" cy="11" r="2.2" fill="#1C1917" />
                </svg>
              </div>
              <h3 className="mt-7 font-editorial text-3xl text-[#1C1917]">
                Serendipity while you write
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#575049]">
                Our on-device semantic index quietly surfaces pertinent passages from
                your own past writing as you compose—so your second brain actively
                thinks beside you without ever leaving your machine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Idea Lifecycle Ledger */}
      <section id="lifecycle" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#B84A27]">
              Anatomy of a Thought
            </span>
            <h2 className="mt-2 font-editorial text-4xl leading-tight text-[#1C1917] sm:text-5xl">
              From fleeting spark to finished manuscript.
            </h2>
          </div>
          <p className="font-mono text-[12px] text-[#8A8076]">
            Select a stage to inspect the artifact →
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col divide-y divide-[#E3DACB] border-y border-[#E3DACB] lg:col-span-5">
            {LIFECYCLE_STEPS.map((item, idx) => {
              const isActive = idx === activeStepIdx;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveStepIdx(idx)}
                  className={`flex items-start gap-4 px-3 py-5 text-left transition-colors cursor-pointer ${
                    isActive ? "bg-[#F4EDE1]" : "hover:bg-[#F8F3EA]"
                  }`}
                >
                  <span
                    className={`mt-0.5 font-mono text-[12px] ${
                      isActive ? "text-[#B84A27] font-semibold" : "text-[#9A8F83]"
                    }`}
                  >
                    {item.step}
                  </span>
                  <div>
                    <p
                      className={`font-editorial text-2xl leading-none ${
                        isActive ? "text-[#1C1917]" : "text-[#6D645B]"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6B6258]">
                      {item.heading}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-[#DDD3C3] bg-[#FFFDF9] p-7 sm:p-10 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-[#EFE8DC] pb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8A8076]">
                <span>Stage {activeStep.step} · {activeStep.label}</span>
                <span className="text-[#B84A27]">Live Preview</span>
              </div>
              <p className="mt-6 text-[15.5px] leading-[1.78] text-[#575049]">
                {activeStep.summary}
              </p>

              <div className="mt-7 rounded-lg border border-[#E6DEC8] bg-[#FAF7F2] p-6">
                <p className="font-mono text-[11px] text-[#B84A27]">
                  {activeStep.artifactTitle}
                </p>
                <p className="mt-3 font-editorial text-[24px] leading-[1.35] text-[#1C1917]">
                  {activeStep.artifactBody}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#EFE8DC] pt-4 font-mono text-[11px] text-[#8A8076]">
              <span>{activeStep.meta}</span>
              <span>Noema Engine v2.4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Testimonials Spread */}
      <section className="border-t border-[#E3DACB] bg-[#1C1917] py-24 text-[#FAF7F2]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#E07A5F]">
                Notes from the Archive
              </span>
              <h2 className="mt-2 font-editorial text-4xl sm:text-5xl">
                Trusted by writers, historians &amp; builders.
              </h2>
            </div>
            <span className="font-mono text-[12px] text-[#A8A095]">
              42,000+ local vaults cultivated
            </span>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                quote:
                  "For the first time in fifteen years of book research, my notes talk back to me while I draft. I found a 2022 margin note that unlocked Chapter Four.",
                author: "Dr. Clara Lindholm",
                role: "Architectural Historian, Zurich",
                slips: "6,412 linked slips",
              },
              {
                quote:
                  "Every file is plain Markdown sitting right in my home directory. If Noema vanished tomorrow, my entire intellectual life remains completely readable.",
                author: "Marcus Chen",
                role: "Staff Systems Engineer",
                slips: "3,190 linked slips",
              },
              {
                quote:
                  "Other apps felt like configuring an enterprise spreadsheet. Opening Noema feels like sitting at a sunlit wooden desk with fresh paper.",
                author: "Elena Rostova",
                role: "Essayist & Biographer",
                slips: "4,875 linked slips",
              },
            ].map((item) => (
              <figure
                key={item.author}
                className="flex flex-col justify-between border-t border-white/15 pt-7"
              >
                <blockquote className="font-editorial text-[24px] leading-[1.35] text-[#F5EFE5]">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[14px] font-semibold text-[#FAF7F2]">
                      {item.author}
                    </div>
                    <div className="text-[12.5px] text-[#A8A095]">{item.role}</div>
                  </div>
                  <span className="font-mono text-[10.5px] text-[#E07A5F]">
                    {item.slips}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Colophon Membership */}
      <section id="colophon" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 max-w-xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#B84A27]">
            Membership
          </span>
          <h2 className="mt-2 font-editorial text-4xl leading-tight text-[#1C1917] sm:text-5xl">
            Honest pricing for a tool meant to last decades.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Commonplace",
              price: "$0",
              cadence: "forever",
              desc: "Full local-first desktop app with unlimited Markdown slips, bi-directional links, and instant search.",
              features: [
                "Unlimited local vaults & .md slips",
                "Bi-directional marginalia & backlinks",
                "Offline semantic recall on-device",
                "Markdown, PDF & BibTeX export",
              ],
              cta: "Download Free",
              featured: false,
            },
            {
              name: "Archivist",
              price: "$9",
              cadence: "/ month",
              desc: "For thinkers who read and capture across every device with end-to-end encrypted sync.",
              features: [
                "Everything in Commonplace",
                "Zero-knowledge E2E sync (Mac, iOS, Linux)",
                "Kindle, PDF & web clipper auto-ingest",
                "Version history & snapshot archives",
              ],
              cta: "Start 14-day trial",
              featured: true,
            },
            {
              name: "Monograph",
              price: "$18",
              cadence: "/ month",
              desc: "For authors, research labs, and small studios publishing directly from their shared vault.",
              features: [
                "Everything in Archivist",
                "Publish custom digital gardens on your domain",
                "Shared research slip-boxes (up to 5 seats)",
                "Priority email support from the founders",
              ],
              cta: "Create Studio Vault",
              featured: false,
            },
          ].map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-xl border p-8 ${
                tier.featured
                  ? "border-[#1C1917] bg-[#FFFDF9] shadow-[0_18px_50px_-24px_rgba(28,25,23,0.22)]"
                  : "border-[#E3DACB] bg-[#FAF7F2]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-3xl text-[#1C1917]">
                    {tier.name}
                  </h3>
                  {tier.featured && (
                    <span className="rounded-full bg-[#B84A27]/12 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#B84A27]">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-editorial text-5xl text-[#1C1917]">
                    {tier.price}
                  </span>
                  <span className="font-mono text-[12px] text-[#8A8076]">
                    {tier.cadence}
                  </span>
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-[#575049]">
                  {tier.desc}
                </p>

                <ul className="mt-7 space-y-3 border-t border-[#E6DEC8] pt-6 text-[14px] text-[#3B3530]">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <span className="mt-1 text-[#B84A27]">✦</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#download"
                className={`mt-8 block rounded-full py-2.5 text-center text-[14px] font-medium transition-colors ${
                  tier.featured
                    ? "bg-[#1C1917] text-[#FAF7F2] hover:bg-[#B84A27]"
                    : "border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF7F2]"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Final Download & Newsletter Colophon */}
      <footer id="download" className="border-t border-[#DDD3C3] bg-[#F4EDE1]/80 pt-20 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 border-b border-[#DDD3C3] pb-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="font-editorial text-4xl leading-[1.04] text-[#1C1917] sm:text-6xl">
                Give your best thoughts a room of their own.
              </h2>
              <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-[#575049]">
                Receive the desktop installer for macOS, Linux, and Windows—plus our
                concise field guide to building a calm second brain.
              </p>
            </div>
            <div className="lg:col-span-5">
              {submitted ? (
                <div className="rounded-xl border border-[#4A6751]/30 bg-[#FFFDF9] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#4A6751]">
                    Dispatch Sent
                  </p>
                  <p className="mt-2 font-editorial text-2xl text-[#1C1917]">
                    Check {email} for your Noema installer &amp; field guide.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlist} className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    aria-label="Email address"
                    className="flex-1 rounded-full border border-[#D4C9B8] bg-[#FFFDF9] px-5 py-3 text-[14px] text-[#1C1917] placeholder:text-[#9A8F83] focus:border-[#1C1917] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#1C1917] px-6 py-3 text-[14px] font-medium text-[#FAF7F2] transition-colors hover:bg-[#B84A27] cursor-pointer"
                  >
                    Get Noema
                  </button>
                </form>
              )}
              <p className="mt-3 font-mono text-[11px] text-[#8A8076]">
                v2.4.1 · Universal Apple Silicon, Intel, Linux AppImage &amp; iOS TestFlight
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-4 text-[12.5px] text-[#786E63] sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="font-editorial text-2xl text-[#1C1917]">Noema</span>
              <span className="font-mono text-[11px]">· Est. 2026 · Plain Text Forever</span>
            </div>
            <div className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-wider">
              <a href="#desk" className="hover:text-[#1C1917]">Manifesto</a>
              <a href="#method" className="hover:text-[#1C1917]">Privacy Pledge</a>
              <a href="#lifecycle" className="hover:text-[#1C1917]">Changelog</a>
              <a href="#colophon" className="hover:text-[#1C1917]">Pricing</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
