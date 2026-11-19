"use client";

import { useState } from "react";

type NoteCategory = "ALL" | "THEORY" | "PROJECTS" | "EXCERPTS";
type MatrixView = "INDEX" | "OUTLINE" | "LINKS";

interface CatalogEntry {
  code: string;
  title: string;
  category: Exclude<NoteCategory, "ALL">;
  linksCount: number;
  updated: string;
  summary: string;
  outline: string[];
  connectedTo: string[];
}

const CATALOG_ENTRIES: CatalogEntry[] = [
  {
    code: "N-014",
    title: "Modular Information Architecture",
    category: "THEORY",
    linksCount: 9,
    updated: "2026-11-18",
    summary:
      "Atomic notes act like interchangeable typographic modules: each unit holds one complete claim and recombines freely across projects.",
    outline: [
      "1. Single concept per Markdown file",
      "2. Explicit bi-directional references",
      "3. Zero rigid folder hierarchy",
    ],
    connectedTo: ["N-027", "N-042", "N-088"],
  },
  {
    code: "N-027",
    title: "Rams — Ten Principles Applied to Software",
    category: "EXCERPTS",
    linksCount: 6,
    updated: "2026-11-16",
    summary:
      "Good software is unobtrusive. A second brain should disappear into the rhythm of thinking, exposing structure only when summoned.",
    outline: [
      "1. Honest plain-text storage format",
      "2. Zero ornamental visual noise",
      "3. Long-lasting archival legibility",
    ],
    connectedTo: ["N-014", "N-063"],
  },
  {
    code: "N-042",
    title: "Q4 Knowledge Graph Engine Spec",
    category: "PROJECTS",
    linksCount: 12,
    updated: "2026-11-17",
    summary:
      "Deterministic Rust indexing pipeline resolving 100k bidirectional links and semantic vectors in under 4ms on consumer hardware.",
    outline: [
      "1. Memory-mapped SQLite + FTS5 index",
      "2. On-device 384d quantized embeddings",
      "3. Conflict-free CRDT sync protocol",
    ],
    connectedTo: ["N-014", "N-088"],
  },
  {
    code: "N-063",
    title: "Müller-Brockmann Grid Proportion Study",
    category: "EXCERPTS",
    linksCount: 4,
    updated: "2026-11-12",
    summary:
      "Mathematical spatial rhythm lowers cognitive friction. Predictable columns let readers scan complex linked references effortlessly.",
    outline: [
      "1. Strict baseline & column modules",
      "2. High-contrast typographic hierarchy",
      "3. Purposeful single-accent signaling",
    ],
    connectedTo: ["N-027", "N-088"],
  },
  {
    code: "N-088",
    title: "Spaced Synthesis Protocol",
    category: "THEORY",
    linksCount: 8,
    updated: "2026-11-15",
    summary:
      "Reviewing five historical notes every morning converts passive highlights into active conceptual recall without gamified streaks.",
    outline: [
      "1. Morning 5-note resurfacing queue",
      "2. One-sentence progressive distillation",
      "3. Promote refined claims to Evergreen",
    ],
    connectedTo: ["N-014", "N-042", "N-063"],
  },
];

const KEY_SPECS = [
  {
    keys: "⌘ K",
    name: "COMMAND INDEX",
    input: "Type any concept, tag, or slip code",
    action: "Fuzzy full-text + semantic jump across entire vault",
    output: "Opens N-014 in 2.1ms (0 mouse movement)",
  },
  {
    keys: "[[",
    name: "LINK INSERT",
    input: "Type [[ followed by two characters",
    action: "Autocomplete existing atomic notes or spawn new slip",
    output: "Writes standard Markdown wikilink + updates backlink index",
  },
  {
    keys: "⌥ SPACE",
    name: "RAPID CAPTURE",
    input: "Invoke from any macOS / Linux / Windows window",
    action: "Opens floating minimalist capture bar immediately",
    output: "Appends timestamped entry to /daily/2026-11-18.md",
  },
  {
    keys: "⌘ ⇧ G",
    name: "TOPOLOGY VIEW",
    input: "Toggle local 2-hop link matrix",
    action: "Renders incoming & outgoing links for active document",
    output: "Highlights 9 direct bridges across 3 domains",
  },
  {
    keys: "/DAILY",
    name: "JOURNAL SHEET",
    input: "Switch to today’s structured chronological log",
    action: "Pulls 3 resurfaced historical notes into right margin",
    output: "Creates /daily/2026-11-18.md from template",
  },
  {
    keys: "⌘ E",
    name: "PUBLISH EXPORT",
    input: "Select any cluster of linked notes",
    action: "Compiles ordered manuscript with resolved footnotes",
    output: "Exports clean HTML, PDF, or plain Markdown bundle",
  },
];

export function IterationThree() {
  const [category, setCategory] = useState<NoteCategory>("ALL");
  const [viewMode, setViewMode] = useState<MatrixView>("INDEX");
  const [selectedCode, setSelectedCode] = useState<string>("N-014");
  const [activeKeyIdx, setActiveKeyIdx] = useState<number>(0);

  const filteredEntries =
    category === "ALL"
      ? CATALOG_ENTRIES
      : CATALOG_ENTRIES.filter((entry) => entry.category === category);

  const activeEntry =
    filteredEntries.find((e) => e.code === selectedCode) ??
    filteredEntries[0] ??
    CATALOG_ENTRIES[0];

  const activeKey = KEY_SPECS[activeKeyIdx];

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#0E0E0E] font-neo selection:bg-[#FF3D00] selection:text-white">
      {/* Strict Architectural Grid Header */}
      <header className="sticky top-0 z-30 border-b border-[#0E0E0E] bg-[#F4F4F0]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-stretch">
          <a
            href="#top"
            className="col-span-6 flex items-center gap-3 border-r border-[#0E0E0E] px-5 py-4 sm:col-span-4 lg:col-span-3"
          >
            <span className="inline-block h-3.5 w-3.5 bg-[#FF3D00]" />
            <span className="font-studio text-lg font-bold tracking-[-0.03em] uppercase">
              NOEMA
            </span>
            <span className="font-mono text-[11px] text-[#5C5C57]">
              {"// 03"}
            </span>
          </a>

          <nav className="hidden items-center divide-x divide-[#0E0E0E]/15 border-r border-[#0E0E0E] lg:col-span-6 lg:grid lg:grid-cols-4">
            {[
              { href: "#principles", label: "01 PRINCIPLES" },
              { href: "#shortcuts", label: "02 INTERFACE" },
              { href: "#comparison", label: "03 SPEC TABLE" },
              { href: "#license", label: "04 LICENSE" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex h-full items-center justify-center px-3 font-mono text-[11px] tracking-[0.08em] text-[#2A2A28] transition-colors hover:bg-[#0E0E0E] hover:text-[#F4F4F0]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="col-span-6 flex items-stretch justify-end sm:col-span-8 lg:col-span-3">
            <a
              href="#license"
              className="flex w-full items-center justify-between bg-[#FF3D00] px-5 py-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#0E0E0E]"
            >
              <span>Download v2.4</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Architectural Frame */}
      <main className="mx-auto max-w-[1400px] border-x border-[#0E0E0E]/15 bg-[#F4F4F0]">
        {/* Hero Split Grid */}
        <section id="top" className="grid border-b border-[#0E0E0E] lg:grid-cols-12">
          {/* Left Poster Typographic Block */}
          <div className="flex flex-col justify-between border-b border-[#0E0E0E] p-6 sm:p-10 lg:col-span-7 lg:border-r lg:border-b-0 lg:p-14">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0E0E0E]/20 pb-4 font-mono text-[11px] uppercase tracking-[0.12em]">
                <span className="text-[#FF3D00] font-semibold">
                  SYS.01 — SECOND BRAIN ARCHITECTURE
                </span>
                <span className="text-[#5C5C57]">MACOS · LINUX · WINDOWS</span>
              </div>

              <h1 className="mt-8 font-studio text-[3.25rem] font-extrabold leading-[0.9] tracking-[-0.045em] uppercase text-[#0E0E0E] sm:text-[4.8rem] xl:text-[5.8rem]">
                Externalize
                <br />
                every
                <br />
                <span className="inline-flex items-baseline gap-3">
                  thought
                  <span className="inline-block h-4 w-4 bg-[#FF3D00] sm:h-6 sm:w-6" />
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-[#333330]">
                Noema is a precision instrument for personal knowledge. Capture raw
                notes in plain Markdown, bind concepts through bi-directional links,
                and retrieve any idea in milliseconds—with zero visual clutter.
              </p>
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap gap-3">
                <a
                  href="#license"
                  className="inline-flex items-center gap-3 bg-[#0E0E0E] px-6 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-[#F4F4F0] transition-colors hover:bg-[#FF3D00]"
                >
                  <span>Install Desktop App</span>
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#shortcuts"
                  className="inline-flex items-center gap-3 border border-[#0E0E0E] bg-white px-6 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-[#0E0E0E] transition-colors hover:bg-[#0E0E0E] hover:text-white"
                >
                  <span>Inspect Keymap</span>
                </a>
              </div>

              <div className="mt-8 grid grid-cols-3 border-t border-[#0E0E0E]/20 pt-5 font-mono">
                <div>
                  <div className="text-[10px] uppercase text-[#666660]">SEARCH</div>
                  <div className="mt-1 text-[16px] font-bold">3.8 ms</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#666660]">FORMAT</div>
                  <div className="mt-1 text-[16px] font-bold">UTF-8 .MD</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#666660]">CLOUD LOCK</div>
                  <div className="mt-1 text-[16px] font-bold text-[#FF3D00]">NONE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Swiss Knowledge Index Matrix */}
          <div className="flex flex-col bg-white lg:col-span-5">
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0E0E0E] bg-[#ECECE6] px-4 py-3">
              <div className="flex flex-wrap gap-1">
                {(["ALL", "THEORY", "PROJECTS", "EXCERPTS"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      category === cat
                        ? "bg-[#0E0E0E] text-white"
                        : "bg-white text-[#4A4A46] hover:bg-[#0E0E0E]/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[10px] text-[#5C5C57]">
                {filteredEntries.length} UNITS
              </span>
            </div>

            {/* Selectable Tabular Index List */}
            <div className="divide-y divide-[#0E0E0E]/15 border-b border-[#0E0E0E]">
              {filteredEntries.map((entry) => {
                const isSelected = entry.code === activeEntry.code;
                return (
                  <button
                    key={entry.code}
                    type="button"
                    onClick={() => setSelectedCode(entry.code)}
                    className={`grid w-full grid-cols-12 items-center px-4 py-3 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#0E0E0E] text-white"
                        : "bg-white text-[#0E0E0E] hover:bg-[#F4F4F0]"
                    }`}
                  >
                    <span
                      className={`col-span-3 font-mono text-[11px] font-bold ${
                        isSelected ? "text-[#FF3D00]" : "text-[#5C5C57]"
                      }`}
                    >
                      {entry.code}
                    </span>
                    <span className="col-span-7 truncate pr-2 text-[13.5px] font-medium">
                      {entry.title}
                    </span>
                    <span
                      className={`col-span-2 text-right font-mono text-[10.5px] ${
                        isSelected ? "text-zinc-300" : "text-[#666660]"
                      }`}
                    >
                      {entry.linksCount}L
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle + Live Inspector */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between border-b border-[#0E0E0E]/15 pb-3">
                  <span className="font-mono text-[11px] font-bold text-[#FF3D00]">
                    INSPECT // {activeEntry.code}
                  </span>
                  <div className="flex border border-[#0E0E0E]">
                    {(["INDEX", "OUTLINE", "LINKS"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setViewMode(mode)}
                        className={`px-2 py-0.5 font-mono text-[10px] font-semibold transition-colors cursor-pointer ${
                          viewMode === mode
                            ? "bg-[#0E0E0E] text-white"
                            : "bg-white text-[#0E0E0E] hover:bg-[#F4F4F0]"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <h2 className="mt-5 font-studio text-2xl font-bold leading-tight tracking-tight text-[#0E0E0E]">
                  {activeEntry.title}
                </h2>

                {viewMode === "INDEX" && (
                  <div className="mt-3 space-y-5">
                    <p className="text-[14.5px] leading-[1.7] text-[#3B3B37]">
                      {activeEntry.summary}
                    </p>
                    <dl className="grid grid-cols-2 gap-3 border-t border-[#0E0E0E]/15 pt-4 font-mono text-[11px]">
                      <div className="border border-[#0E0E0E]/15 bg-[#F4F4F0] p-3">
                        <dt className="text-[9.5px] uppercase text-[#666660]">
                          STORAGE PATH
                        </dt>
                        <dd className="mt-1 truncate font-semibold text-[#0E0E0E]">
                          /{activeEntry.category.toLowerCase()}/{activeEntry.code.toLowerCase()}.md
                        </dd>
                      </div>
                      <div className="border border-[#0E0E0E]/15 bg-[#F4F4F0] p-3">
                        <dt className="text-[9.5px] uppercase text-[#666660]">
                          GRAPH DEGREE
                        </dt>
                        <dd className="mt-1 font-semibold text-[#FF3D00]">
                          {activeEntry.linksCount} ACTIVE LINKS
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}

                {viewMode === "OUTLINE" && (
                  <ul className="mt-4 space-y-2 border-l-2 border-[#FF3D00] pl-4 font-mono text-[12.5px] text-[#222220]">
                    {activeEntry.outline.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {viewMode === "LINKS" && (
                  <div className="mt-4 space-y-2">
                    <p className="font-mono text-[11px] uppercase text-[#666660]">
                      Direct Bi-Directional Targets:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeEntry.connectedTo.map((targetCode) => {
                        const target = CATALOG_ENTRIES.find(
                          (e) => e.code === targetCode
                        );
                        return (
                          <button
                            key={targetCode}
                            type="button"
                            onClick={() => {
                              setCategory("ALL");
                              setSelectedCode(targetCode);
                            }}
                            className="border border-[#0E0E0E] bg-[#F4F4F0] px-2.5 py-1.5 font-mono text-[11px] font-semibold transition-colors hover:bg-[#FF3D00] hover:border-[#FF3D00] hover:text-white cursor-pointer"
                          >
                            {targetCode} · {target?.title.split(" ").slice(0, 2).join(" ")} →
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#0E0E0E]/15 pt-4 font-mono text-[11px] text-[#666660]">
                <span>CAT: {activeEntry.category}</span>
                <span>REV: {activeEntry.updated}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Column Numbered Architectural Principles */}
        <section id="principles" className="border-b border-[#0E0E0E]">
          <div className="flex flex-col justify-between gap-4 border-b border-[#0E0E0E] px-6 py-8 sm:flex-row sm:items-end sm:px-10">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF3D00]">
                SECTION 01 // ARCHITECTURAL PRINCIPLES
              </span>
              <h2 className="mt-2 font-studio text-3xl font-extrabold uppercase tracking-[-0.03em] sm:text-5xl">
                Four rules of durable thought.
              </h2>
            </div>
            <span className="font-mono text-[11px] uppercase text-[#5C5C57]">
              ZERO ORNAMENT · MAXIMUM RECALL
            </span>
          </div>

          <div className="grid divide-y divide-[#0E0E0E] sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
            {[
              {
                num: "01",
                title: "ATOMIC NOTES",
                body: "Every concept lives as a concise, standalone Markdown file. Small units link cleanly and never bloat into unreadable mega-docs.",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="6" width="14" height="14" stroke="#0E0E0E" strokeWidth="1.75" />
                    <rect x="28" y="6" width="14" height="14" stroke="#0E0E0E" strokeWidth="1.75" />
                    <rect x="6" y="28" width="14" height="14" stroke="#0E0E0E" strokeWidth="1.75" />
                    <rect x="28" y="28" width="14" height="14" fill="#FF3D00" />
                  </svg>
                ),
              },
              {
                num: "02",
                title: "TWO-WAY LINKS",
                body: "Mention any note with [[brackets]] to forge an automatic backlink. Structure emerges organically from what you write.",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="11" cy="24" r="5" fill="#0E0E0E" />
                    <circle cx="37" cy="24" r="5" fill="#FF3D00" />
                    <path d="M18 20H30M30 20L26 16M30 28H18M18 28L22 32" stroke="#0E0E0E" strokeWidth="1.75" />
                  </svg>
                ),
              },
              {
                num: "03",
                title: "INSTANT RECALL",
                body: "Hybrid full-text and local vector indexing queries 100,000 notes in under four milliseconds—even on an airplane.",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="21" cy="21" r="13" stroke="#0E0E0E" strokeWidth="1.75" />
                    <path d="M31 31L42 42" stroke="#FF3D00" strokeWidth="2.5" />
                    <path d="M15 21H27M21 15V27" stroke="#0E0E0E" strokeWidth="1.5" />
                  </svg>
                ),
              },
              {
                num: "04",
                title: "LOCAL OWNERSHIP",
                body: "Plain UTF-8 files inside a standard directory on your hard drive. Sync with E2E encryption, Git, or Syncthing.",
                svg: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M8 10H22L26 15H40V38H8V10Z" stroke="#0E0E0E" strokeWidth="1.75" />
                    <rect x="14" y="23" width="20" height="3" fill="#FF3D00" />
                    <rect x="14" y="29" width="12" height="3" fill="#0E0E0E" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.num} className="flex flex-col justify-between bg-white p-7 sm:p-8">
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-4xl font-bold tracking-tighter text-[#0E0E0E]">
                      {item.num}
                    </span>
                    {item.svg}
                  </div>
                  <h3 className="mt-10 font-mono text-[13px] font-bold tracking-[0.1em] text-[#0E0E0E]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.68] text-[#454540]">
                    {item.body}
                  </p>
                </div>
                <div className="mt-8 h-1 w-8 bg-[#0E0E0E]" />
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Keyboard Control Deck */}
        <section id="shortcuts" className="grid border-b border-[#0E0E0E] lg:grid-cols-12">
          <div className="border-b border-[#0E0E0E] p-6 sm:p-10 lg:col-span-5 lg:border-r lg:border-b-0">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF3D00]">
              SECTION 02 // KEYBOARD INSTRUMENT
            </span>
            <h2 className="mt-3 font-studio text-3xl font-extrabold uppercase leading-[0.98] tracking-[-0.03em] sm:text-4xl">
              Operated completely from the home row.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#454540]">
              Select any command module to inspect how Noema converts keystrokes
              into structured plain-text knowledge operations.
            </p>

            <div className="mt-8 border border-[#0E0E0E] bg-[#0E0E0E] p-6 text-[#F4F4F0]">
              <div className="flex items-center justify-between border-b border-white/15 pb-3 font-mono text-[11px]">
                <span className="text-[#FF3D00]">{activeKey.name}</span>
                <span className="bg-white/10 px-2 py-0.5 text-white">
                  {activeKey.keys}
                </span>
              </div>
              <dl className="mt-4 space-y-3.5 font-mono text-[12px]">
                <div>
                  <dt className="text-[10px] uppercase text-zinc-500">INPUT</dt>
                  <dd className="mt-0.5 text-zinc-200">{activeKey.input}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase text-zinc-500">OPERATION</dt>
                  <dd className="mt-0.5 text-zinc-200">{activeKey.action}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase text-zinc-500">RESULT</dt>
                  <dd className="mt-0.5 text-[#FF6D42]">{activeKey.output}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-y divide-[#0E0E0E] bg-white sm:grid-cols-3 lg:col-span-7">
            {KEY_SPECS.map((spec, idx) => {
              const active = idx === activeKeyIdx;
              return (
                <button
                  key={spec.name}
                  type="button"
                  onClick={() => setActiveKeyIdx(idx)}
                  className={`flex flex-col justify-between p-6 text-left transition-colors cursor-pointer ${
                    active
                      ? "bg-[#FF3D00] text-white"
                      : "bg-white text-[#0E0E0E] hover:bg-[#F4F4F0]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`h-2.5 w-2.5 ${
                        active ? "bg-white" : "bg-[#0E0E0E]/20"
                      }`}
                    />
                    <span
                      className={`font-mono text-[10px] ${
                        active ? "text-white/80" : "text-[#666660]"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="my-7">
                    <kbd
                      className={`inline-block border px-3 py-1.5 font-mono text-lg font-bold ${
                        active
                          ? "border-white bg-white text-[#0E0E0E]"
                          : "border-[#0E0E0E] bg-[#F4F4F0] text-[#0E0E0E]"
                      }`}
                    >
                      {spec.keys}
                    </kbd>
                  </div>

                  <div>
                    <div className="font-mono text-[11px] font-bold tracking-[0.08em]">
                      {spec.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Swiss Specification Comparison Table */}
        <section id="comparison" className="border-b border-[#0E0E0E] bg-white">
          <div className="border-b border-[#0E0E0E] px-6 py-8 sm:px-10">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF3D00]">
              SECTION 03 // ARCHITECTURAL COMPARISON
            </span>
            <h2 className="mt-2 font-studio text-3xl font-extrabold uppercase tracking-[-0.03em] sm:text-4xl">
              Folders vs. Second Brain Lattice
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#0E0E0E] bg-[#ECECE6] font-mono text-[11px] uppercase tracking-[0.1em]">
                  <th className="border-r border-[#0E0E0E]/20 px-6 py-4">DIMENSION</th>
                  <th className="border-r border-[#0E0E0E]/20 px-6 py-4 text-[#666660]">
                    LEGACY FOLDER APPS
                  </th>
                  <th className="px-6 py-4 text-[#FF3D00]">NOEMA SYSTEM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0E0E0E]/15 text-[14.5px]">
                {[
                  [
                    "Organization",
                    "Rigid single-location folder trees",
                    "Multi-contextual bi-directional graph & tags",
                  ],
                  [
                    "Capture Latency",
                    "2–4 seconds waiting for web app boot",
                    "30ms native quick-capture from any window",
                  ],
                  [
                    "Data Format",
                    "Proprietary cloud database & JSON blobs",
                    "100% plain UTF-8 Markdown files on local disk",
                  ],
                  [
                    "Retrieval",
                    "Exact filename or slow keyword search",
                    "3.8ms hybrid keyword + on-device semantic recall",
                  ],
                  [
                    "Long-Term Longevity",
                    "Tied to SaaS subscription & vendor survival",
                    "Readable in any text editor 50 years from now",
                  ],
                ].map(([dim, legacy, noema]) => (
                  <tr key={dim}>
                    <td className="border-r border-[#0E0E0E]/20 px-6 py-4 font-mono text-[12px] font-bold uppercase">
                      {dim}
                    </td>
                    <td className="border-r border-[#0E0E0E]/20 px-6 py-4 text-[#666660]">
                      {legacy}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#0E0E0E]">
                      {noema}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modular Pricing Grid */}
        <section id="license" className="border-b border-[#0E0E0E]">
          <div className="border-b border-[#0E0E0E] px-6 py-8 sm:px-10">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF3D00]">
              SECTION 04 // LICENSING
            </span>
            <h2 className="mt-2 font-studio text-3xl font-extrabold uppercase tracking-[-0.03em] sm:text-5xl">
              Clear terms. Zero dark patterns.
            </h2>
          </div>

          <div className="grid divide-y divide-[#0E0E0E] md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              {
                id: "TIER 01",
                name: "PERSONAL",
                price: "$0",
                period: "LOCAL FOREVER",
                items: [
                  "Unlimited local Markdown vaults",
                  "Full bi-directional linking & graph",
                  "Offline semantic search engine",
                  "macOS, Linux & Windows apps",
                ],
                cta: "DOWNLOAD FREE",
                accent: false,
              },
              {
                id: "TIER 02",
                name: "PRACTITIONER",
                price: "$9",
                period: "PER MONTH",
                items: [
                  "Everything in Personal",
                  "End-to-end encrypted multi-device sync",
                  "iOS mobile capture + Whisper voice",
                  "Kindle, PDF & web clipper pipelines",
                ],
                cta: "START 14-DAY TRIAL",
                accent: true,
              },
              {
                id: "TIER 03",
                name: "STUDIO",
                price: "$18",
                period: "PER SEAT / MO",
                items: [
                  "Everything in Practitioner",
                  "Shared encrypted research libraries",
                  "Static web garden publishing",
                  "Direct engineering support",
                ],
                cta: "ACTIVATE STUDIO",
                accent: false,
              },
            ].map((tier) => (
              <div
                key={tier.id}
                className={`flex flex-col justify-between p-8 sm:p-10 ${
                  tier.accent ? "bg-[#0E0E0E] text-[#F4F4F0]" : "bg-white text-[#0E0E0E]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className={tier.accent ? "text-[#FF3D00]" : "text-[#666660]"}>
                      {tier.id}
                    </span>
                    <span className={tier.accent ? "text-zinc-400" : "text-[#666660]"}>
                      {tier.period}
                    </span>
                  </div>
                  <h3 className="mt-4 font-studio text-2xl font-bold uppercase tracking-tight">
                    {tier.name}
                  </h3>
                  <div className="mt-4 font-studio text-6xl font-extrabold tracking-tighter">
                    {tier.price}
                  </div>
                  <ul
                    className={`mt-8 space-y-3 border-t pt-6 text-[14px] ${
                      tier.accent
                        ? "border-white/15 text-zinc-300"
                        : "border-[#0E0E0E]/15 text-[#3B3B37]"
                    }`}
                  >
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="font-mono text-[#FF3D00]">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#top"
                  className={`mt-10 block py-3.5 text-center font-mono text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    tier.accent
                      ? "bg-[#FF3D00] text-white hover:bg-white hover:text-[#0E0E0E]"
                      : "border border-[#0E0E0E] bg-[#F4F4F0] text-[#0E0E0E] hover:bg-[#0E0E0E] hover:text-white"
                  }`}
                >
                  {tier.cta} →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Monumental Swiss Poster Colophon Footer */}
        <footer className="bg-[#F4F4F0] px-6 pt-12 pb-10 sm:px-10">
          <div className="flex flex-col justify-between gap-6 border-b border-[#0E0E0E]/20 pb-8 sm:flex-row sm:items-end">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5C5C57]">
              NOEMA SYSTEMS · ZÜRICH / SAN FRANCISCO · PLAIN TEXT ARCHIVE SPEC 2.4
            </div>
            <div className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.1em]">
              <a href="#principles" className="hover:text-[#FF3D00]">Principles</a>
              <a href="#shortcuts" className="hover:text-[#FF3D00]">Keymap</a>
              <a href="#comparison" className="hover:text-[#FF3D00]">Spec</a>
              <a href="#license" className="hover:text-[#FF3D00]">License</a>
            </div>
          </div>
          <div className="mt-6 overflow-hidden">
            <div className="font-studio text-[4.5rem] font-extrabold leading-[0.84] tracking-[-0.06em] uppercase text-[#0E0E0E] sm:text-[9rem] lg:text-[13rem]">
              NOEMA<span className="text-[#FF3D00]">.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
