"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Grid2X2,
  ListTree,
  Table2,
  Square,
  CheckSquare,
} from "lucide-react";

type ViewMode = "outline" | "cards" | "matrix";

interface OutlineBlock {
  id: string;
  code: string;
  title: string;
  domain: string;
  links: number;
  status: "EVERGREEN" | "ACTIVE" | "DRAFT";
  children: { id: string; text: string; done?: boolean; isTask?: boolean }[];
}

const INITIAL_BLOCKS: OutlineBlock[] = [
  {
    id: "b1",
    code: "IDX-01",
    title: "Capture Latency Protocol",
    domain: "COGNITION",
    links: 18,
    status: "EVERGREEN",
    children: [
      { id: "c1", text: "Any friction over 2 seconds destroys 60% of fleeting insights." },
      { id: "c2", text: "Bind global quick-capture chord to Shift+Space across OS.", isTask: true, done: true },
      { id: "c3", text: "Route voice transcripts directly into daily inbox block.", isTask: true, done: false },
    ],
  },
  {
    id: "b2",
    code: "IDX-02",
    title: "Atomic Note Granularity",
    domain: "STRUCTURE",
    links: 31,
    status: "EVERGREEN",
    children: [
      { id: "c4", text: "One claim per card enables clean recombination across essays." },
      { id: "c5", text: "Link concepts via [[bidirectional references]] instead of duplicating prose." },
    ],
  },
  {
    id: "b3",
    code: "IDX-03",
    title: "Q4 Architecture Synthesis",
    domain: "EXECUTION",
    links: 9,
    status: "ACTIVE",
    children: [
      { id: "c6", text: "Audit local SQLite FTS5 indexing on 150k blocks.", isTask: true, done: true },
      { id: "c7", text: "Publish public Markdown specification v2.0.", isTask: true, done: false },
    ],
  },
  {
    id: "b4",
    code: "IDX-04",
    title: "Anti-Library Reading Queue",
    domain: "RESEARCH",
    links: 14,
    status: "DRAFT",
    children: [
      { id: "c8", text: "Hofstadter — Fluid Concepts and Creative Analogies." },
      { id: "c9", text: "Müller-Brockmann — Grid Systems in Graphic Design." },
    ],
  },
];

export default function SwissLanding() {
  const [viewMode, setViewMode] = useState<ViewMode>("outline");
  const [blocks, setBlocks] = useState<OutlineBlock[]>(INITIAL_BLOCKS);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTask = (blockId: string, childId: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id !== blockId
          ? b
          : {
              ...b,
              children: b.children.map((ch) =>
                ch.id === childId ? { ...ch, done: !ch.done } : ch
              ),
            }
      )
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-[family-name:var(--font-grotesk)] selection:bg-[#FF4D00] selection:text-white">
      {/* Top Swiss Grid Bar */}
      <header className="sticky top-0 z-30 border-b-2 border-[#0A0A0A] bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-stretch">
          <a
            href="#top"
            className="col-span-6 flex items-center gap-3 border-r-2 border-[#0A0A0A] px-5 py-4 md:col-span-3"
          >
            <span className="inline-block h-4 w-4 bg-[#FF4D00]" />
            <span className="text-xl font-bold tracking-tight uppercase">
              ENGRAM
            </span>
          </a>

          <div className="hidden items-center border-r-2 border-[#0A0A0A] px-5 font-mono text-xs uppercase md:col-span-4 md:flex">
            SYS.03 // SECOND BRAIN OPERATING INDEX
          </div>

          <nav className="hidden items-center justify-around border-r-2 border-[#0A0A0A] px-4 text-xs font-bold tracking-wider uppercase lg:col-span-3 lg:flex">
            <a href="#simulator" className="hover:text-[#FF4D00]">
              INDEX
            </a>
            <a href="#spec" className="hover:text-[#FF4D00]">
              SPEC
            </a>
            <a href="#pricing" className="hover:text-[#FF4D00]">
              LICENSE
            </a>
          </nav>

          <a
            href="#pricing"
            className="col-span-6 flex items-center justify-center gap-2 bg-[#0A0A0A] px-5 py-4 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#FF4D00] md:col-span-5 lg:col-span-2"
          >
            INSTALL NOW
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Massive Typographic Poster Hero */}
      <section id="top" className="border-b-2 border-[#0A0A0A] bg-line-grid">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid border-b-2 border-[#0A0A0A] lg:grid-cols-12">
            <div className="p-6 sm:p-10 lg:col-span-8 lg:border-r-2 lg:border-[#0A0A0A] lg:p-14">
              <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase">
                <span className="bg-[#FF4D00] px-2.5 py-1 text-white">
                  EDITION 03
                </span>
                <span className="border-2 border-[#0A0A0A] bg-white px-2.5 py-0.5">
                  ZERO FOLDERS
                </span>
                <span className="border-2 border-[#0A0A0A] bg-white px-2.5 py-0.5">
                  LOCAL SQLITE + MARKDOWN
                </span>
              </div>

              <h1 className="text-5xl leading-[0.94] font-bold tracking-[-0.04em] uppercase sm:text-7xl lg:text-[84px]">
                YOUR MIND IS FOR{" "}
                <span className="text-[#FF4D00]">THINKING</span>, NOT STORAGE.
              </h1>
            </div>

            <div className="flex flex-col justify-between bg-[#F2F2EE] p-6 sm:p-10 lg:col-span-4">
              <div>
                <div className="font-mono text-xs font-bold tracking-widest text-[#0047FF] uppercase">
                  ABSTRACT / 001
                </div>
                <p className="mt-4 text-lg leading-snug font-medium">
                  Engram is a high-precision second brain engineered on Swiss
                  information principles: atomic blocks, strict bidirectional
                  indexing, and instant structural views.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href="#pricing"
                  className="flex w-full items-center justify-between border-2 border-[#0A0A0A] bg-[#FF4D00] px-5 py-4 text-sm font-bold tracking-wider text-white uppercase shadow-[4px_4px_0px_#0A0A0A] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  <span>DOWNLOAD DESKTOP APP</span>
                  <ArrowUpRight className="h-5 w-5" />
                </a>
                <div className="flex items-center justify-between font-mono text-[11px] uppercase">
                  <span>MACOS / WIN / LINUX</span>
                  <span>v4.2.0 · 18.4 MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Multi-Lens Second Brain Simulator */}
          <div id="simulator" className="bg-white">
            {/* Simulator Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#0A0A0A] bg-[#0A0A0A] px-6 py-3 text-white">
              <div className="flex items-center gap-3 font-mono text-xs uppercase">
                <span className="inline-block h-2.5 w-2.5 bg-[#FF4D00]" />
                <span>LIVE WORKSPACE DEMO — SAME NOTES, THREE STRUCTURAL LENSES</span>
              </div>

              <div className="flex border-2 border-white">
                {(
                  [
                    { id: "outline", label: "OUTLINE", icon: ListTree },
                    { id: "cards", label: "INDEX CARDS", icon: Grid2X2 },
                    { id: "matrix", label: "TABLE", icon: Table2 },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setViewMode(tab.id)}
                    className={`flex cursor-pointer items-center gap-1.5 px-3.5 py-1.5 font-mono text-xs font-bold uppercase transition-colors ${
                      viewMode === tab.id
                        ? "bg-[#FF4D00] text-white"
                        : "bg-[#0A0A0A] text-white hover:bg-white/15"
                    }`}
                  >
                    <tab.icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulator Content */}
            <div className="p-6 sm:p-10">
              {viewMode === "outline" && (
                <div className="divide-y-2 divide-[#0A0A0A] border-2 border-[#0A0A0A]">
                  {blocks.map((block) => {
                    const isCollapsed = !!collapsed[block.id];
                    return (
                      <div key={block.id} className="bg-white">
                        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F2F2EE] px-4 py-3">
                          <button
                            type="button"
                            onClick={() => toggleCollapse(block.id)}
                            className="flex cursor-pointer items-center gap-2.5 text-left font-bold"
                          >
                            {isCollapsed ? (
                              <ChevronRight className="h-4 w-4 text-[#FF4D00]" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-[#FF4D00]" />
                            )}
                            <span className="font-mono text-xs text-[#0047FF]">
                              {block.code}
                            </span>
                            <span className="text-base uppercase tracking-tight">
                              {block.title}
                            </span>
                          </button>

                          <div className="flex items-center gap-2 font-mono text-[11px]">
                            <span className="border border-[#0A0A0A] bg-white px-2 py-0.5">
                              {block.domain}
                            </span>
                            <span className="bg-[#0A0A0A] px-2 py-0.5 text-white">
                              {block.links} LINKS
                            </span>
                          </div>
                        </div>

                        {!isCollapsed && (
                          <div className="space-y-2 px-6 py-4 pl-10">
                            {block.children.map((ch) => (
                              <div
                                key={ch.id}
                                className="flex items-start gap-3 text-sm"
                              >
                                {ch.isTask ? (
                                  <button
                                    type="button"
                                    onClick={() => toggleTask(block.id, ch.id)}
                                    className="mt-0.5 cursor-pointer text-[#0A0A0A] hover:text-[#FF4D00]"
                                    aria-label="Toggle task"
                                  >
                                    {ch.done ? (
                                      <CheckSquare className="h-4 w-4 text-[#FF4D00]" />
                                    ) : (
                                      <Square className="h-4 w-4" />
                                    )}
                                  </button>
                                ) : (
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#0A0A0A]" />
                                )}
                                <span
                                  className={
                                    ch.done
                                      ? "line-through opacity-50"
                                      : "font-medium"
                                  }
                                >
                                  {ch.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {viewMode === "cards" && (
                <div className="grid gap-5 md:grid-cols-2">
                  {blocks.map((block) => (
                    <div
                      key={block.id}
                      className="flex flex-col justify-between border-2 border-[#0A0A0A] bg-[#F2F2EE] p-5 shadow-[5px_5px_0px_#0A0A0A]"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-2 font-mono text-xs font-bold">
                          <span className="text-[#0047FF]">{block.code}</span>
                          <span className="bg-[#0A0A0A] px-2 py-0.5 text-white">
                            {block.status}
                          </span>
                        </div>
                        <h3 className="mt-4 text-xl font-bold uppercase tracking-tight">
                          {block.title}
                        </h3>
                        <ul className="mt-3 space-y-1.5 text-sm">
                          {block.children.map((c) => (
                            <li key={c.id} className="leading-snug">
                              — {c.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-[#0A0A0A]/30 pt-3 font-mono text-xs">
                        <span>{block.domain}</span>
                        <span className="font-bold text-[#FF4D00]">
                          {block.links} BACKLINKS
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === "matrix" && (
                <div className="overflow-x-auto border-2 border-[#0A0A0A]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b-2 border-[#0A0A0A] bg-[#F2F2EE] uppercase">
                        <th className="border-r-2 border-[#0A0A0A] px-4 py-3">
                          ID
                        </th>
                        <th className="border-r-2 border-[#0A0A0A] px-4 py-3">
                          NOTE TITLE
                        </th>
                        <th className="border-r-2 border-[#0A0A0A] px-4 py-3">
                          DOMAIN
                        </th>
                        <th className="border-r-2 border-[#0A0A0A] px-4 py-3">
                          STATUS
                        </th>
                        <th className="px-4 py-3">BACKLINKS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-[#0A0A0A]">
                      {blocks.map((b) => (
                        <tr key={b.id} className="hover:bg-[#FF4D00]/10">
                          <td className="border-r-2 border-[#0A0A0A] px-4 py-3 font-bold text-[#0047FF]">
                            {b.code}
                          </td>
                          <td className="border-r-2 border-[#0A0A0A] px-4 py-3 font-sans text-sm font-bold">
                            {b.title}
                          </td>
                          <td className="border-r-2 border-[#0A0A0A] px-4 py-3">
                            {b.domain}
                          </td>
                          <td className="border-r-2 border-[#0A0A0A] px-4 py-3">
                            <span
                              className={`px-2 py-0.5 font-bold ${
                                b.status === "EVERGREEN"
                                  ? "bg-[#0A0A0A] text-white"
                                  : b.status === "ACTIVE"
                                  ? "bg-[#FF4D00] text-white"
                                  : "border border-[#0A0A0A] bg-white"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-bold">{b.links}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6-Cell Structural Feature Matrix */}
      <section className="border-b-2 border-[#0A0A0A]">
        <div className="mx-auto max-w-[1400px]">
          <div className="border-b-2 border-[#0A0A0A] bg-[#F2F2EE] px-6 py-8 sm:px-10">
            <span className="font-mono text-xs font-bold text-[#FF4D00] uppercase">
              SECTION 02 // SYSTEM PRIMITIVES
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight uppercase sm:text-5xl">
              SIX INSTRUMENTS. ZERO BLOAT.
            </h2>
          </div>

          <div className="grid divide-y-2 divide-[#0A0A0A] md:grid-cols-3 md:divide-x-2 md:divide-y-0">
            {[
              {
                num: "01",
                title: "BLOCK-LEVEL LINKS",
                desc: "Reference an entire page or a single bullet point. Transclude live blocks across projects without copy-pasting.",
              },
              {
                num: "02",
                title: "INSTANT KEYBOARD NAV",
                desc: "Every action has a deterministic chord. Move, indent, hoist, and link ideas without lifting your palms.",
              },
              {
                num: "03",
                title: "FLAT FILE SOVEREIGNTY",
                desc: "Your second brain lives as clean UTF-8 Markdown files on your filesystem. Read them in any editor fifty years from now.",
              },
              {
                num: "04",
                title: "DAILY LOG ENGINE",
                desc: "A chronological spine for meetings, reading notes, and fleeting ideas—automatically cross-indexed by tag and entity.",
              },
              {
                num: "05",
                title: "STRUCTURED QUERIES",
                desc: "Assemble live tables of open tasks, unread papers, or project notes using readable query syntax.",
              },
              {
                num: "06",
                title: "OFFLINE DETERMINISM",
                desc: "Sub-millisecond writes with zero spinner states. Sync resumes automatically the instant you reconnect.",
              },
            ].map((item, idx) => (
              <div
                key={item.num}
                className={`group flex flex-col justify-between p-8 transition-colors hover:bg-[#0A0A0A] hover:text-white ${
                  idx >= 3 ? "md:border-t-2 md:border-[#0A0A0A]" : ""
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs font-bold">
                  <span className="text-[#FF4D00]">{item.num}</span>
                  <span className="opacity-40 group-hover:opacity-80">
                    SPEC.OK
                  </span>
                </div>
                <div className="mt-10">
                  <h3 className="text-xl font-bold tracking-tight uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-80">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Comparison Table */}
      <section id="spec" className="border-b-2 border-[#0A0A0A] bg-[#F2F2EE]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 lg:py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs font-bold text-[#0047FF] uppercase">
                SECTION 03 // BENCHMARK
              </span>
              <h2 className="mt-2 text-3xl font-bold uppercase sm:text-4xl">
                LEGACY FOLDERS VS. ATOMIC INDEX
              </h2>
            </div>
            <span className="font-mono text-xs uppercase">
              MEASURED ON 100,000 NOTES
            </span>
          </div>

          <div className="overflow-x-auto border-2 border-[#0A0A0A] bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-[#0A0A0A] bg-[#0A0A0A] font-mono text-xs text-white uppercase">
                  <th className="px-5 py-4">DIMENSION</th>
                  <th className="px-5 py-4">CONVENTIONAL CLOUD DOCS</th>
                  <th className="bg-[#FF4D00] px-5 py-4">ENGRAM INDEX</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#0A0A0A]">
                {[
                  ["Organization Model", "Rigid single-parent folders", "Multi-linked atomic graph + outlines"],
                  ["Search Latency (100k notes)", "900ms – 2,400ms (network)", "0.8ms (local SQLite FTS5)"],
                  ["Offline Reliability", "Read-only cache or broken", "100% native local-first"],
                  ["Data Ownership", "Proprietary cloud database", "Plain Markdown + open JSON schema"],
                ].map(([dim, legacy, engram]) => (
                  <tr key={dim}>
                    <td className="border-r-2 border-[#0A0A0A] px-5 py-4 font-bold uppercase">
                      {dim}
                    </td>
                    <td className="border-r-2 border-[#0A0A0A] px-5 py-4 text-neutral-500">
                      {legacy}
                    </td>
                    <td className="px-5 py-4 font-bold text-[#0A0A0A]">
                      {engram}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Licensing / Pricing */}
      <section id="pricing" className="border-b-2 border-[#0A0A0A]">
        <div className="mx-auto max-w-[1400px] grid md:grid-cols-2">
          <div className="flex flex-col justify-between border-b-2 border-[#0A0A0A] p-8 sm:p-12 md:border-r-2 md:border-b-0">
            <div>
              <div className="font-mono text-xs font-bold uppercase text-neutral-500">
                LICENSE 01 // INDIVIDUAL LOCAL
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-6xl font-bold tracking-tighter">$0</span>
                <span className="font-mono text-xs uppercase">PERPETUAL FREE</span>
              </div>
              <ul className="mt-8 space-y-3 border-t-2 border-[#0A0A0A] pt-6 text-sm font-medium">
                {[
                  "Unlimited atomic blocks & local vaults",
                  "Outline, Index Card, and Query Table views",
                  "Keyboard-first navigation & Markdown export",
                  "Zero telemetry, zero account required",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-[#0047FF]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="mt-10 w-full cursor-pointer border-2 border-[#0A0A0A] bg-white py-4 font-mono text-xs font-bold tracking-wider uppercase transition-colors hover:bg-[#0A0A0A] hover:text-white"
            >
              DOWNLOAD FREE BINARY
            </button>
          </div>

          <div className="flex flex-col justify-between bg-[#0A0A0A] p-8 text-white sm:p-12">
            <div>
              <div className="flex items-center justify-between font-mono text-xs font-bold uppercase">
                <span className="text-[#FF4D00]">LICENSE 02 // PRO SYNC</span>
                <span className="border border-white px-2 py-0.5 text-[10px]">
                  E2EE MESH
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-6xl font-bold tracking-tighter">$8</span>
                <span className="font-mono text-xs uppercase text-neutral-400">
                  / MONTH BILLED ANNUALLY
                </span>
              </div>
              <ul className="mt-8 space-y-3 border-t-2 border-white/25 pt-6 text-sm font-medium">
                {[
                  "Everything in Individual Local",
                  "Encrypted instant sync across desktop & mobile",
                  "Automated PDF, Readwise & Web Clipper ingestion",
                  "Publish structured knowledge indices to custom URLs",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-[#FF4D00]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="mt-10 w-full cursor-pointer border-2 border-[#FF4D00] bg-[#FF4D00] py-4 font-mono text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-white hover:text-[#0A0A0A]"
            >
              START 14-DAY PRO LICENSE
            </button>
          </div>
        </div>
      </section>

      {/* Bold Architectural Footer */}
      <footer className="bg-[#FF4D00] text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
          <div className="text-5xl font-bold leading-none tracking-[-0.04em] uppercase sm:text-7xl lg:text-8xl">
            BUILD YOUR PERMANENT INDEX.
          </div>
          <div className="mt-12 flex flex-col justify-between gap-4 border-t-2 border-white/40 pt-6 font-mono text-xs uppercase sm:flex-row">
            <span>ENGRAM SYSTEMS ZÜRICH / SF · EDITION 03</span>
            <div className="flex gap-6">
              <a href="#simulator" className="hover:underline">
                MANUAL
              </a>
              <a href="#spec" className="hover:underline">
                BENCHMARKS
              </a>
              <a href="#pricing" className="hover:underline">
                CHANGELOG
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
