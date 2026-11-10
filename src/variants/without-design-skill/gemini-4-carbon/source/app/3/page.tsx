"use client";

import { useState } from "react";
import { ArrowUpRight, Plus, Minus, Check } from "lucide-react";

type PhaseKey = "ingest" | "atomize" | "link" | "retrieve";

interface CognitivePhase {
  key: PhaseKey;
  code: string;
  label: string;
  headline: string;
  summary: string;
  inputLabel: string;
  inputArtifact: string;
  outputLabel: string;
  outputArtifact: string[];
  latency: string;
  retentionRate: string;
}

const PHASES: CognitivePhase[] = [
  {
    key: "ingest",
    code: "OP.01",
    label: "INGEST",
    headline: "Frictionless multi-modal capture into a single chronological inbox.",
    summary:
      "Biological working memory holds four items for twenty seconds. Engram intercepts raw thoughts from keyboard, voice, PDF margins, and browser selections before decay begins.",
    inputLabel: "RAW SIGNAL // UNSTRUCTURED",
    inputArtifact:
      "Voice capture (08:19): “Check Dieter Rams’ tenth principle against how we’re designing our API error messages—less noise, clearer state.”",
    outputLabel: "INDEXED RECORD // #2026-11-10-04",
    outputArtifact: [
      "TIMESTAMP: 2026-11-10T08:19:04Z",
      "ENTITIES: [Dieter Rams, API Ergonomics, Error State]",
      "STATUS: Queued in Daily Stream — 0 manual fields required",
    ],
    latency: "14 ms",
    retentionRate: "100%",
  },
  {
    key: "atomize",
    code: "OP.02",
    label: "ATOMIZE",
    headline: "Distill sprawling transcripts into durable, single-claim blocks.",
    summary:
      "Monolithic documents bury insight inside paragraphs you will never re-read. Engram splits highlights and notes into addressable, reusable claims with permanent IDs.",
    inputLabel: "SOURCE PASSAGE // 1,800 WORDS",
    inputArtifact:
      "Q4 Architecture Postmortem: 42-minute transcript covering cache stampedes, retry jitter, and on-call handoff checklists.",
    outputLabel: "EXTRACTED ATOMIC CLAIMS (3)",
    outputArtifact: [
      "ATOM 409A → Exponential backoff requires full jitter to prevent synchronized thundering herds.",
      "ATOM 409B → Stale-while-revalidate absorbs 98% of origin cold-start spikes.",
      "ATOM 409C → Runbooks belong inside error payloads, not separate wikis.",
    ],
    latency: "22 ms",
    retentionRate: "99.4%",
  },
  {
    key: "link",
    code: "OP.03",
    label: "CROSS-LINK",
    headline: "N-dimensional relational pointers replace brittle folder trees.",
    summary:
      "Folders force every file into a single box. Engram maintains a live adjacency matrix—linking ideas across engineering, philosophy, biology, and strategy automatically.",
    inputLabel: "NEW ATOM // #409A (RETRY JITTER)",
    inputArtifact:
      "“Synchronized retries collapse shared resources unless randomized.”",
    outputLabel: "BIDIRECTIONAL EDGES ESTABLISHED",
    outputArtifact: [
      "↔ [[118C · Millennium Bridge Crowd Synchronization (Physics, 2024)]]",
      "↔ [[204F · Pacemaker Neuron Phase Resetting (Neurobiology, 2025)]]",
      "↔ [[381A · Stripe Webhook Idempotency Notes (Systems, 2026)]]",
    ],
    latency: "0.8 ms",
    retentionRate: "∞ Hops",
  },
  {
    key: "retrieve",
    code: "OP.04",
    label: "RETRIEVE",
    headline: "Context-triggered recall delivers exact prior work before you search.",
    summary:
      "As you draft a specification or essay, Engram continuously queries your historical index against the active paragraph—placing verified past notes directly beside your cursor.",
    inputLabel: "ACTIVE CURSOR // RFC-028 DRAFT",
    inputArtifact:
      "Typing: “To prevent client reconnect storms after regional failover…”",
    outputLabel: "SURFACED IN MARGIN // 3 VERIFIED CITATIONS",
    outputArtifact: [
      "[MATCH 0.96] ATOM 409A — Full jitter math + simulation script (Oct 2026)",
      "[MATCH 0.91] ATOM 118C — Damping harmonic feedback loops (May 2024)",
      "[MATCH 0.88] LOG 2025-09-12 — Production incident #14 metrics",
    ],
    latency: "0.4 ms",
    retentionRate: "Zero Loss",
  },
];

const INDEX_DRAWERS = [
  {
    num: "01",
    title: "ZERO-FOLDER TAXONOMY",
    tag: "ARCHITECTURE",
    detail:
      "Traditional filing systems demand upfront categorization before you even know how an idea will be used. Engram stores notes flat on disk and constructs dynamic views from relational links, properties, and semantic neighborhoods.",
    codeSample: "SELECT * FROM notes WHERE links_to('systems-thinking') AND year >= 2024;",
  },
  {
    num: "02",
    title: "BIDIRECTIONAL CITATION LEDGER",
    tag: "PROVENANCE",
    detail:
      "Every reference is two-way and block-accurate. Quote a claim inside a new memo and the original source note immediately records where, when, and in what argument it was cited.",
    codeSample: "REF // atom_409a ← cited_in: [rfc_028.md:L44, book_ch4.md:L119]",
  },
  {
    num: "03",
    title: "DETERMINISTIC DAILY LOG",
    tag: "CHRONOLOGY",
    detail:
      "Time is the only universal coordinate. Every day generates an ISO-8601 ledger (2026-11-10.md) anchoring meetings, fleeting thoughts, and reading highlights to an immutable timeline.",
    codeSample: "2026-11-10 // 09:14 [CAPTURE] → 11:30 [LINKED: 3] → 16:45 [PUBLISHED]",
  },
  {
    num: "04",
    title: "50-YEAR OPEN FILE PROTOCOL",
    tag: "LONGEVITY",
    detail:
      "Proprietary databases go bankrupt. Plain UTF-8 Markdown files remain readable with cat, grep, or any text editor half a century from today. Your second brain outlives every vendor.",
    codeSample: "FORMAT: CommonMark + YAML · ENCRYPTION: Age / XChaCha20-Poly1305",
  },
];

export default function IterationThreeSwiss() {
  const [activePhase, setActivePhase] = useState<PhaseKey>("link");
  const [openDrawer, setOpenDrawer] = useState<string>("01");

  const currentPhase = PHASES.find((p) => p.key === activePhase) ?? PHASES[2];

  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#0D0D0D] selection:bg-[#FF3B1D] selection:text-white">
      {/* Outer Swiss Structural Frame */}
      <div className="mx-auto max-w-[1400px] border-x border-[#0D0D0D]">
        {/* Top Specification Strip */}
        <div className="grid grid-cols-2 border-b border-[#0D0D0D] font-plex-mono text-[11px] uppercase tracking-wider sm:grid-cols-4">
          <div className="border-r border-[#0D0D0D] px-4 py-2.5">
            SYS // ENGRAM SECOND BRAIN
          </div>
          <div className="border-b border-[#0D0D0D] px-4 py-2.5 sm:border-r sm:border-b-0">
            DOC // EDITION 03 — SWISS INDEX
          </div>
          <div className="border-r border-[#0D0D0D] px-4 py-2.5 text-[#FF3B1D] font-semibold">
            STATUS // LOCAL ENGINE ACTIVE
          </div>
          <div className="px-4 py-2.5 text-right">REV 2026.11</div>
        </div>

        {/* Navigation Row */}
        <header className="sticky top-0 z-40 grid grid-cols-12 items-center border-b border-[#0D0D0D] bg-[#F4F4F1]/95 backdrop-blur-sm">
          <div className="col-span-6 flex items-center gap-3 border-r border-[#0D0D0D] px-6 py-4 sm:col-span-3">
            <span className="inline-block h-4 w-4 bg-[#FF3B1D]" />
            <span className="font-space text-xl font-bold tracking-tight uppercase">
              ENGRAM®
            </span>
          </div>

          <nav className="hidden col-span-6 items-center justify-around px-4 py-4 font-plex-mono text-xs uppercase tracking-wider sm:flex border-r border-[#0D0D0D]">
            <a href="#matrix" className="hover:text-[#FF3B1D]">
              [01] Matrix
            </a>
            <a href="#comparison" className="hover:text-[#FF3B1D]">
              [02] Spec
            </a>
            <a href="#catalog" className="hover:text-[#FF3B1D]">
              [03] Architecture
            </a>
            <a href="#license" className="hover:text-[#FF3B1D]">
              [04] License
            </a>
          </nav>

          <div className="col-span-6 flex justify-end sm:col-span-3">
            <a
              href="#license"
              className="flex w-full items-center justify-between bg-[#0D0D0D] px-6 py-4 font-plex-mono text-xs font-medium uppercase tracking-wider text-[#F4F4F1] transition-colors hover:bg-[#FF3B1D]"
            >
              <span>Install v4.2</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </header>

        {/* Monumental Typographic Hero */}
        <section className="grid grid-cols-1 border-b border-[#0D0D0D] lg:grid-cols-12">
          <div className="border-b border-[#0D0D0D] p-6 sm:p-10 lg:col-span-8 lg:border-r lg:border-b-0 lg:p-14">
            <div className="inline-flex items-center gap-2 font-plex-mono text-xs uppercase tracking-widest text-[#FF3B1D]">
              <span>FIG. 01 — COGNITIVE INFRASTRUCTURE</span>
            </div>

            <h1 className="mt-5 font-space text-5xl font-bold uppercase leading-[0.94] tracking-[-0.04em] text-[#0D0D0D] sm:text-7xl xl:text-[84px]">
              DO NOT TRUST MEMORY.{" "}
              <span className="text-[#FF3B1D]">INDEX IT.</span>
            </h1>

            <p className="mt-8 max-w-2xl font-space text-lg leading-snug text-[#262626] sm:text-xl">
              Human brains evolved to generate ideas, not store them. Engram is a
              precision second-brain instrument that captures every fleeting signal,
              cross-links claims across disciplines, and retrieves exact context on
              command.
            </p>
          </div>

          {/* Right Metric Column */}
          <div className="grid grid-cols-2 divide-x divide-[#0D0D0D] lg:col-span-4 lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <span className="font-plex-mono text-xs uppercase text-[#595959]">
                METRIC 01 // FORGETTING CURVE
              </span>
              <div className="mt-4">
                <div className="font-space text-5xl font-bold tracking-tight">
                  0.00%
                </div>
                <p className="mt-1 font-plex-mono text-xs text-[#404040]">
                  Information decay across indexed permanent claims.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-[#0D0D0D] p-6 text-[#F4F4F1] sm:p-8">
              <span className="font-plex-mono text-xs uppercase text-[#FF3B1D]">
                ACTION // IMMEDIATE DEPLOYMENT
              </span>
              <div className="mt-6">
                <p className="font-plex-mono text-xs leading-relaxed text-neutral-300">
                  Local Markdown vault. Zero mandatory cloud account. Instant import
                  from Obsidian, Notion, Roam, and Apple Notes.
                </p>
                <a
                  href="#license"
                  className="mt-5 inline-flex w-full items-center justify-between border border-[#F4F4F1] bg-[#FF3B1D] px-4 py-3 font-plex-mono text-xs font-semibold uppercase text-white transition-transform hover:-translate-y-0.5"
                >
                  <span>INITIALIZE SECOND BRAIN</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Cognitive Operations Matrix */}
        <section id="matrix" className="border-b border-[#0D0D0D]">
          {/* Selector Tabs */}
          <div className="grid grid-cols-2 border-b border-[#0D0D0D] sm:grid-cols-4">
            {PHASES.map((phase, idx) => {
              const active = phase.key === activePhase;
              return (
                <button
                  key={phase.key}
                  type="button"
                  onClick={() => setActivePhase(phase.key)}
                  className={`flex flex-col justify-between p-5 text-left transition-colors cursor-pointer ${
                    idx < 3 ? "sm:border-r sm:border-[#0D0D0D]" : ""
                  } ${idx % 2 === 0 ? "border-r border-[#0D0D0D] sm:border-r" : ""} ${
                    idx < 2 ? "border-b border-[#0D0D0D] sm:border-b-0" : ""
                  } ${
                    active
                      ? "bg-[#FF3B1D] text-white"
                      : "bg-[#F4F4F1] text-[#0D0D0D] hover:bg-[#E7E7E2]"
                  }`}
                >
                  <div className="flex w-full items-center justify-between font-plex-mono text-xs">
                    <span>{phase.code}</span>
                    <span>{active ? "● ACTIVE" : "○ SELECT"}</span>
                  </div>
                  <div className="mt-4 font-space text-2xl font-bold tracking-tight">
                    {phase.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Matrix Schematic Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="border-b border-[#0D0D0D] p-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:p-10">
              <div className="font-plex-mono text-xs uppercase text-[#FF3B1D]">
                ACTIVE SUBSYSTEM // {currentPhase.code} — {currentPhase.label}
              </div>
              <h2 className="mt-3 font-space text-3xl font-bold leading-tight tracking-tight">
                {currentPhase.headline}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#333333]">
                {currentPhase.summary}
              </p>

              <div className="mt-8 grid grid-cols-2 border border-[#0D0D0D] bg-white">
                <div className="border-r border-[#0D0D0D] p-4">
                  <div className="font-plex-mono text-[10px] uppercase text-[#666]">
                    EXECUTION TIME
                  </div>
                  <div className="mt-1 font-space text-2xl font-bold">
                    {currentPhase.latency}
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-plex-mono text-[10px] uppercase text-[#666]">
                    FIDELITY
                  </div>
                  <div className="mt-1 font-space text-2xl font-bold text-[#FF3B1D]">
                    {currentPhase.retentionRate}
                  </div>
                </div>
              </div>
            </div>

            {/* Input -> Output Transformation Schematic */}
            <div className="bg-white p-8 lg:col-span-7 lg:p-10">
              <div className="border border-[#0D0D0D] bg-[#F4F4F1] p-5">
                <div className="font-plex-mono text-[11px] font-semibold uppercase tracking-wider text-[#595959]">
                  {currentPhase.inputLabel}
                </div>
                <p className="mt-2 font-plex-mono text-sm leading-relaxed text-[#0D0D0D]">
                  {currentPhase.inputArtifact}
                </p>
              </div>

              <div className="my-4 flex items-center gap-3 font-plex-mono text-xs text-[#FF3B1D]">
                <span>↓ ENGRAM RELATIONAL COMPILER</span>
                <span className="h-px flex-1 bg-[#0D0D0D]" />
              </div>

              <div className="border-2 border-[#0D0D0D] bg-[#0D0D0D] p-5 text-[#F4F4F1]">
                <div className="font-plex-mono text-[11px] font-semibold uppercase tracking-wider text-[#FF3B1D]">
                  {currentPhase.outputLabel}
                </div>
                <ul className="mt-3 space-y-2.5 font-plex-mono text-xs leading-relaxed">
                  {currentPhase.outputArtifact.map((line) => (
                    <li
                      key={line}
                      className="border-l-2 border-[#FF3B1D] pl-3 text-[#F4F4F1]"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparative Specification Table */}
        <section id="comparison" className="border-b border-[#0D0D0D]">
          <div className="border-b border-[#0D0D0D] px-6 py-8 sm:px-10">
            <span className="font-plex-mono text-xs uppercase text-[#FF3B1D]">
              FIG. 02 — COMPARATIVE BENCHMARK
            </span>
            <h2 className="mt-2 font-space text-3xl font-bold uppercase tracking-tight sm:text-5xl">
              WHY NOTES DIE IN TRADITIONAL TOOLS.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left font-plex-mono text-xs">
              <thead>
                <tr className="border-b border-[#0D0D0D] bg-[#E8E8E3] uppercase">
                  <th className="border-r border-[#0D0D0D] p-4">DIMENSION</th>
                  <th className="border-r border-[#0D0D0D] p-4 text-[#595959]">
                    UNASSISTED MEMORY
                  </th>
                  <th className="border-r border-[#0D0D0D] p-4 text-[#595959]">
                    CLOUD FOLDER WIKIS
                  </th>
                  <th className="bg-[#0D0D0D] p-4 text-[#F4F4F1]">
                    ENGRAM SECOND BRAIN
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0D0D0D]">
                {[
                  [
                    "30-DAY RETENTION",
                    "~11% (Ebbinghaus decay)",
                    "Buried in subfolder trees",
                    "100% + active margin resurfacing",
                  ],
                  [
                    "STRUCTURE MODEL",
                    "Associative but volatile",
                    "Rigid single-parent hierarchy",
                    "Bidirectional graph + daily ledger",
                  ],
                  [
                    "SEARCH SPEED",
                    "Tip-of-the-tongue stalls",
                    "800ms–2,400ms cloud spinner",
                    "0.4ms local hybrid index",
                  ],
                  [
                    "DATA OWNERSHIP",
                    "Private, unsearchable",
                    "Vendor database lock-in",
                    "Plain UTF-8 Markdown on your disk",
                  ],
                ].map(([dim, bio, wiki, engram]) => (
                  <tr key={dim} className="bg-[#F4F4F1]">
                    <td className="border-r border-[#0D0D0D] p-4 font-semibold">
                      {dim}
                    </td>
                    <td className="border-r border-[#0D0D0D] p-4 text-[#595959]">
                      {bio}
                    </td>
                    <td className="border-r border-[#0D0D0D] p-4 text-[#595959]">
                      {wiki}
                    </td>
                    <td className="bg-white p-4 font-semibold text-[#0D0D0D]">
                      <span className="mr-2 inline-block h-2 w-2 bg-[#FF3B1D]" />
                      {engram}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Expandable Architectural Index Catalog */}
        <section id="catalog" className="border-b border-[#0D0D0D]">
          <div className="border-b border-[#0D0D0D] px-6 py-8 sm:px-10">
            <span className="font-plex-mono text-xs uppercase text-[#FF3B1D]">
              FIG. 03 — ARCHITECTURAL SPECIFICATIONS
            </span>
            <h2 className="mt-2 font-space text-3xl font-bold uppercase tracking-tight sm:text-5xl">
              FOUR PILLARS OF TOTAL RECALL.
            </h2>
          </div>

          <div className="divide-y divide-[#0D0D0D]">
            {INDEX_DRAWERS.map((item) => {
              const isOpen = openDrawer === item.num;
              return (
                <div key={item.num} className={isOpen ? "bg-white" : "bg-[#F4F4F1]"}>
                  <button
                    type="button"
                    onClick={() => setOpenDrawer(isOpen ? "" : item.num)}
                    className="grid w-full grid-cols-12 items-center px-6 py-6 text-left transition-colors hover:bg-white sm:px-10 cursor-pointer"
                  >
                    <span className="col-span-2 font-plex-mono text-lg font-semibold text-[#FF3B1D] sm:col-span-1">
                      {item.num}
                    </span>
                    <span className="col-span-8 font-space text-xl font-bold tracking-tight sm:col-span-8 sm:text-3xl">
                      {item.title}
                    </span>
                    <span className="hidden font-plex-mono text-xs text-[#595959] sm:col-span-2 sm:block">
                      [{item.tag}]
                    </span>
                    <span className="col-span-2 flex justify-end sm:col-span-1">
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="grid grid-cols-1 gap-6 border-t border-[#0D0D0D] px-6 py-8 sm:px-10 lg:grid-cols-12">
                      <div className="lg:col-span-1" />
                      <p className="text-base leading-relaxed text-[#262626] lg:col-span-6">
                        {item.detail}
                      </p>
                      <div className="border border-[#0D0D0D] bg-[#F4F4F1] p-4 font-plex-mono text-xs text-[#0D0D0D] lg:col-span-5">
                        <div className="text-[10px] text-[#FF3B1D]">
                          PROTOCOL TRACE //
                        </div>
                        <div className="mt-1.5 break-all">{item.codeSample}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Licensing / Pricing */}
        <section id="license" className="grid grid-cols-1 border-b border-[#0D0D0D] lg:grid-cols-12">
          <div className="border-b border-[#0D0D0D] p-8 sm:p-12 lg:col-span-4 lg:border-r lg:border-b-0">
            <span className="font-plex-mono text-xs uppercase text-[#FF3B1D]">
              FIG. 04 — LICENSING
            </span>
            <h2 className="mt-3 font-space text-4xl font-bold uppercase leading-none tracking-tight">
              HONEST SPECIFICATION PRICING.
            </h2>
            <p className="mt-4 font-plex-mono text-xs leading-relaxed text-[#4D4D4D]">
              No dark patterns. Your local files never expire and never require a
              subscription to open, search, or export.
            </p>
          </div>

          <div className="border-b border-[#0D0D0D] p-8 sm:p-12 lg:col-span-4 lg:border-r lg:border-b-0">
            <div className="flex items-center justify-between font-plex-mono text-xs">
              <span>EDITION A // WORKSTATION</span>
              <span>LOCAL</span>
            </div>
            <div className="mt-4 font-space text-5xl font-bold">$0</div>
            <div className="mt-1 font-plex-mono text-xs text-[#595959]">
              PERPETUAL PERSONAL LICENSE
            </div>
            <ul className="mt-8 space-y-3 font-plex-mono text-xs">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#FF3B1D]" /> Unlimited notes &amp;
                relational graph
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#FF3B1D]" /> Offline semantic + FTS5
                index
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#FF3B1D]" /> Open Markdown storage
              </li>
            </ul>
            <button
              type="button"
              className="mt-10 w-full border border-[#0D0D0D] bg-white py-3.5 font-plex-mono text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#0D0D0D] hover:text-white cursor-pointer"
            >
              DOWNLOAD WORKSTATION
            </button>
          </div>

          <div className="bg-white p-8 sm:p-12 lg:col-span-4">
            <div className="flex items-center justify-between font-plex-mono text-xs text-[#FF3B1D]">
              <span>EDITION B // CONTINUITY</span>
              <span>SYNC + MOBILE</span>
            </div>
            <div className="mt-4 font-space text-5xl font-bold">
              $8<span className="text-xl font-normal">/MO</span>
            </div>
            <div className="mt-1 font-plex-mono text-xs text-[#595959]">
              END-TO-END ENCRYPTED MULTI-DEVICE
            </div>
            <ul className="mt-8 space-y-3 font-plex-mono text-xs">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#FF3B1D]" /> Everything in Workstation
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#FF3B1D]" /> Instant encrypted iOS,
                Android &amp; Desktop sync
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#FF3B1D]" /> PDF OCR + Voice
                transcription pipeline
              </li>
            </ul>
            <button
              type="button"
              className="mt-10 w-full bg-[#FF3B1D] py-3.5 font-plex-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#0D0D0D] cursor-pointer"
            >
              START CONTINUITY TRIAL →
            </button>
          </div>
        </section>

        {/* Swiss Colophon */}
        <footer className="grid grid-cols-1 gap-4 px-6 py-8 font-plex-mono text-xs uppercase text-[#4D4D4D] sm:grid-cols-2 sm:px-10">
          <div>ENGRAM® // ITERATION 03 — INTERNATIONAL TYPOGRAPHIC GRID</div>
          <div className="sm:text-right">
            TYPESET IN SPACE GROTESK &amp; IBM PLEX MONO
          </div>
        </footer>
      </div>
    </div>
  );
}
