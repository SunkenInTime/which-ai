"use client";

import { useState } from "react";

interface GraphNode {
  id: string;
  label: string;
  shortLabel: string;
  cluster: "Core" | "Synthesis" | "Capture" | "Systems";
  x: number;
  y: number;
  r: number;
  file: string;
  similarity: string;
  updated: string;
  tags: string[];
  excerpt: string;
  links: string[];
}

const GRAPH_NODES: GraphNode[] = [
  {
    id: "core",
    label: "Second Brain Core",
    shortLabel: "Second Brain",
    cluster: "Core",
    x: 310,
    y: 185,
    r: 16,
    file: "index/second-brain.md",
    similarity: "1.00",
    updated: "2m ago",
    tags: ["#core", "#graph", "#local-first"],
    excerpt:
      "A durable external cortex built from atomic Markdown nodes. Instead of filing information away to die in folders, every concept links into a live topology that compounds daily.",
    links: ["systems", "vector", "links", "daily", "models"],
  },
  {
    id: "systems",
    label: "Systems Thinking",
    shortLabel: "Systems Thinking",
    cluster: "Systems",
    x: 155,
    y: 95,
    r: 12,
    file: "mental-models/systems-thinking.md",
    similarity: "0.94",
    updated: "3h ago",
    tags: ["#meadows", "#feedback-loops"],
    excerpt:
      "Donella Meadows argues leverage points rarely sit where intuition expects. Feedback delays shape behavior far more than isolated parameters—mirroring how spaced note resurfacing works.",
    links: ["core", "models", "reading"],
  },
  {
    id: "vector",
    label: "Local Vector Recall",
    shortLabel: "Vector Recall",
    cluster: "Core",
    x: 475,
    y: 98,
    r: 12,
    file: "engine/local-vectors.md",
    similarity: "0.96",
    updated: "14m ago",
    tags: ["#embeddings", "#offline", "#rust"],
    excerpt:
      "Quantized 384-dim embeddings run entirely on-device via Rust + Metal/SIMD. Query 100,000 personal notes in 3.8ms with zero cloud round-trips and zero hallucinated citations.",
    links: ["core", "links", "spec"],
  },
  {
    id: "links",
    label: "Bi-Directional Topology",
    shortLabel: "Bi-Directional",
    cluster: "Synthesis",
    x: 488,
    y: 255,
    r: 11,
    file: "graph/backlinks.md",
    similarity: "0.91",
    updated: "1d ago",
    tags: ["#wikilinks", "#backlinks"],
    excerpt:
      "Every [[mention]] creates an instant two-way bridge. Unlinked references are detected continuously so forgotten notes from years ago surface as context in real time.",
    links: ["core", "vector", "daily"],
  },
  {
    id: "daily",
    label: "Daily Synthesis Log",
    shortLabel: "Daily Log",
    cluster: "Capture",
    x: 328,
    y: 315,
    r: 11,
    file: "journal/2026-11-18.md",
    similarity: "0.88",
    updated: "Just now",
    tags: ["#daily", "#journal"],
    excerpt:
      "Start every morning on a clean chronological canvas. Raw voice captures, meeting fragments, and reading quotes stream in automatically before graduating to evergreen notes.",
    links: ["core", "links", "voice"],
  },
  {
    id: "models",
    label: "Mental Models Lattice",
    shortLabel: "Mental Models",
    cluster: "Systems",
    x: 132,
    y: 235,
    r: 11,
    file: "mental-models/lattice.md",
    similarity: "0.92",
    updated: "4d ago",
    tags: ["#cognition", "#munger"],
    excerpt:
      "Cross-disciplinary ideas stick only when hung on a latticework of interconnected models. Linking physics, design, and history reveals analogies you could never search by keyword.",
    links: ["core", "systems", "reading", "voice"],
  },
  {
    id: "reading",
    label: "Book & PDF Excerpts",
    shortLabel: "Excerpts",
    cluster: "Capture",
    x: 68,
    y: 155,
    r: 9,
    file: "library/highlights.md",
    similarity: "0.85",
    updated: "2d ago",
    tags: ["#kindle", "#pdf", "#citations"],
    excerpt:
      "Highlights from Kindle, Readwise, and local PDFs land with exact page numbers and clean deep links, ready to be woven into original thinking.",
    links: ["systems", "models"],
  },
  {
    id: "spec",
    label: "Q4 Architecture Spec",
    shortLabel: "Q4 Spec",
    cluster: "Synthesis",
    x: 558,
    y: 175,
    r: 9,
    file: "projects/q4-architecture.md",
    similarity: "0.87",
    updated: "6h ago",
    tags: ["#shipping", "#rfc"],
    excerpt:
      "Assembled directly from 14 linked technical notes and past postmortems. Clicking any cited block jumps straight to the underlying engineering rationale.",
    links: ["vector", "links"],
  },
  {
    id: "voice",
    label: "Instant Voice Capture",
    shortLabel: "Voice Capture",
    cluster: "Capture",
    x: 196,
    y: 325,
    r: 9,
    file: "inbox/voice-092.md",
    similarity: "0.83",
    updated: "5h ago",
    tags: ["#whisper-local", "#mobile"],
    excerpt:
      "Press and hold on iOS or macOS while walking. On-device Whisper transcribes, extracts key entities, and links candidate notes before you sit back down.",
    links: ["daily", "models"],
  },
];

const GRAPH_EDGES: Array<[string, string]> = [
  ["core", "systems"],
  ["core", "vector"],
  ["core", "links"],
  ["core", "daily"],
  ["core", "models"],
  ["systems", "models"],
  ["systems", "reading"],
  ["models", "reading"],
  ["models", "voice"],
  ["daily", "voice"],
  ["daily", "links"],
  ["vector", "links"],
  ["vector", "spec"],
  ["links", "spec"],
];

const CLUSTER_COLORS: Record<GraphNode["cluster"], string> = {
  Core: "#818CF8",
  Systems: "#38BDF8",
  Synthesis: "#34D399",
  Capture: "#F59E0B",
};

const COMMAND_DEMOS = [
  {
    shortcut: "⌘K",
    cmd: "Semantic jump across vault",
    result: "Matched 4 notes in 2.4ms · Top: Local Vector Recall (0.96)",
  },
  {
    shortcut: "⌘⇧L",
    cmd: "Auto-link unlinked mentions",
    result: "Found 7 implicit references to [[Systems Thinking]]",
  },
  {
    shortcut: "⌘⇧G",
    cmd: "Isolate 2-hop neighborhood",
    result: "Focused 6 connected nodes around Second Brain Core",
  },
  {
    shortcut: "⌘J",
    cmd: "Append to Today’s Daily Synthesis",
    result: "Appended timestamped block to journal/2026-11-18.md",
  },
];

export function IterationTwo() {
  const [selectedId, setSelectedId] = useState<string>("core");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [annual, setAnnual] = useState<boolean>(true);
  const [copiedBrew, setCopiedBrew] = useState<boolean>(false);
  const [activeCmdIdx, setActiveCmdIdx] = useState<number>(0);

  const activeFocusId = hoveredId ?? selectedId;
  const selectedNode =
    GRAPH_NODES.find((n) => n.id === selectedId) ?? GRAPH_NODES[0];

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchingIds = new Set(
    normalizedQuery
      ? GRAPH_NODES.filter(
          (n) =>
            n.label.toLowerCase().includes(normalizedQuery) ||
            n.excerpt.toLowerCase().includes(normalizedQuery) ||
            n.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
        ).map((n) => n.id)
      : []
  );

  function isNeighbor(nodeId: string, focusId: string) {
    if (nodeId === focusId) return true;
    return GRAPH_EDGES.some(
      ([a, b]) => (a === nodeId && b === focusId) || (b === nodeId && a === focusId)
    );
  }

  function handleCopyBrew() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("brew install --cask noema").catch(() => {});
    }
    setCopiedBrew(true);
    setTimeout(() => setCopiedBrew(false), 2000);
  }

  return (
    <div className="min-h-screen bg-obsidian-grid text-zinc-100 font-neo selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Subtle Top Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(99,102,241,0.22),transparent_70%)]"
      />

      {/* Sleek Floating Dark Nav */}
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#07080C]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/15 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="2.6" fill="#818CF8" />
                <circle cx="4" cy="5.5" r="1.6" fill="#38BDF8" />
                <circle cx="16" cy="6" r="1.6" fill="#34D399" />
                <circle cx="15" cy="15.5" r="1.6" fill="#818CF8" />
                <path
                  d="M5.4 6.5L8.2 8.6M14.5 7L11.9 8.7M13.8 14.3L11.7 11.9"
                  stroke="#A5B4FC"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="font-geo text-lg font-semibold tracking-tight text-white">
              noema
            </span>
            <span className="hidden rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 sm:inline">
              v2.4
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-[13px] font-medium text-zinc-400 md:flex">
            <a href="#workbench" className="transition-colors hover:text-white">
              Graph Workbench
            </a>
            <a href="#architecture" className="transition-colors hover:text-white">
              Architecture
            </a>
            <a href="#pricing" className="transition-colors hover:text-white">
              Pricing
            </a>
            <a href="#docs" className="transition-colors hover:text-white">
              Local-First Spec
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="#workbench"
              className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[11px] text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-200 sm:flex"
            >
              <span>Search</span>
              <kbd className="rounded bg-white/10 px-1 py-0.5 text-[10px] text-zinc-300">
                ⌘K
              </kbd>
            </a>
            <a
              href="#pricing"
              className="rounded-lg bg-indigo-500 px-3.5 py-1.5 text-[13px] font-medium text-white shadow-[0_0_24px_rgba(99,102,241,0.45)] transition-all hover:bg-indigo-400"
            >
              Download
            </a>
          </div>
        </div>
      </header>

      {/* Centered Hero */}
      <section id="top" className="relative mx-auto max-w-5xl px-6 pt-14 pb-10 text-center md:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3.5 py-1 text-[12px] font-medium text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
          <span>Local Rust Graph Engine · Zero Cloud Lock-in</span>
        </div>

        <h1 className="mx-auto mt-7 max-w-4xl font-geo text-[2.9rem] font-semibold leading-[1.03] tracking-[-0.035em] text-white sm:text-[4.25rem] lg:text-[5rem]">
          A neural operating system for{" "}
          <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
            everything you know.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[16.5px] leading-[1.7] text-zinc-400 sm:text-[18px]">
          Capture thoughts at keyboard speed, map ideas in a living bi-directional
          graph, and retrieve forgotten context in under 4 milliseconds—backed
          entirely by plain Markdown files on your device.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#pricing"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-6 text-[14px] font-semibold text-zinc-950 transition-all hover:bg-indigo-100"
          >
            Download for macOS
            <span aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            onClick={handleCopyBrew}
            className="inline-flex h-11 items-center gap-3 rounded-xl border border-white/12 bg-[#0F111A] px-4 font-mono text-[12.5px] text-zinc-300 transition-colors hover:border-indigo-400/40 hover:text-white cursor-pointer"
          >
            <span className="text-indigo-400">$</span>
            <span>brew install --cask noema</span>
            <span className="rounded bg-white/8 px-1.5 py-0.5 text-[10px] text-zinc-400">
              {copiedBrew ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>
      </section>

      {/* Interactive Neural Graph Workbench */}
      <section id="workbench" className="relative mx-auto max-w-6xl px-6 pb-20">
        <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0B0D14]/95 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.85),0_0_80px_-30px_rgba(99,102,241,0.3)] backdrop-blur-md">
          {/* Workbench Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#0F121C] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              </div>
              <span className="font-mono text-[11px] text-zinc-400">
                vault://cortex-main · 9 active nodes · 14 synapses
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="pointer-events-none absolute left-2.5 text-zinc-500"
                >
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter graph (e.g. vector, systems)..."
                  aria-label="Filter knowledge graph nodes"
                  className="w-56 rounded-lg border border-white/10 bg-[#07080C] py-1.5 pr-3 pl-8 font-mono text-[11.5px] text-zinc-200 placeholder:text-zinc-500 focus:border-indigo-400/60 focus:outline-none sm:w-64"
                />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-zinc-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Graph Canvas + Live Inspector */}
          <div className="grid lg:grid-cols-12">
            {/* Interactive SVG Constellation */}
            <div className="relative border-b border-white/[0.08] bg-[radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.12),transparent_65%)] p-4 lg:col-span-7 lg:border-r lg:border-b-0">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-2">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[10.5px] text-zinc-400">
                  {(["Core", "Systems", "Synthesis", "Capture"] as const).map(
                    (cluster) => (
                      <span key={cluster} className="inline-flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: CLUSTER_COLORS[cluster] }}
                        />
                        {cluster}
                      </span>
                    )
                  )}
                </div>
                <span className="font-mono text-[10px] text-zinc-500">
                  Click any node to inspect
                </span>
              </div>

              <svg
                viewBox="0 0 620 375"
                className="h-[320px] w-full sm:h-[380px]"
                role="img"
                aria-label="Interactive knowledge graph visualization"
              >
                <defs>
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Synaptic Edges */}
                {GRAPH_EDGES.map(([aId, bId]) => {
                  const a = GRAPH_NODES.find((n) => n.id === aId)!;
                  const b = GRAPH_NODES.find((n) => n.id === bId)!;
                  const connected =
                    aId === activeFocusId || bId === activeFocusId;
                  const matchDimmed =
                    normalizedQuery.length > 0 &&
                    !matchingIds.has(aId) &&
                    !matchingIds.has(bId);
                  return (
                    <line
                      key={`${aId}-${bId}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={connected ? "#818CF8" : "#3F435A"}
                      strokeWidth={connected ? 1.8 : 1}
                      strokeOpacity={matchDimmed ? 0.12 : connected ? 0.85 : 0.35}
                      strokeDasharray={connected ? undefined : "3 3"}
                    />
                  );
                })}

                {/* Nodes */}
                {GRAPH_NODES.map((node) => {
                  const isSelected = node.id === selectedId;
                  const isDirect = isNeighbor(node.id, activeFocusId);
                  const isSearchMatch =
                    normalizedQuery.length > 0 && matchingIds.has(node.id);
                  const dimmed =
                    normalizedQuery.length > 0
                      ? !isSearchMatch
                      : !isDirect;
                  const color = CLUSTER_COLORS[node.cluster];

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedId(node.id)}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="cursor-pointer"
                      style={{
                        opacity: dimmed ? 0.28 : 1,
                        transition: "opacity 180ms ease",
                      }}
                    >
                      {(isSelected || isSearchMatch) && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.r + 9}
                          fill={color}
                          fillOpacity={0.16}
                          stroke={color}
                          strokeOpacity={0.5}
                          strokeWidth={1}
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r}
                        fill={isSelected ? color : "#121522"}
                        stroke={color}
                        strokeWidth={isSelected ? 2.5 : 1.75}
                        filter={isSelected ? "url(#nodeGlow)" : undefined}
                      />
                      <text
                        x={node.x}
                        y={node.y + node.r + 16}
                        textAnchor="middle"
                        fill={isSelected ? "#FFFFFF" : "#A1A1AA"}
                        fontSize={isSelected ? "11.5" : "10.5"}
                        fontWeight={isSelected ? "600" : "400"}
                        className="font-mono select-none"
                      >
                        {node.shortLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right Markdown & Semantic Inspector */}
            <div className="flex flex-col justify-between bg-[#0D1018] p-6 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
                  <span className="font-mono text-[11px] text-indigo-300">
                    {selectedNode.file}
                  </span>
                  <span className="rounded-md border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                    cos {selectedNode.similarity}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2 font-mono text-[10.5px] text-zinc-500">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: CLUSTER_COLORS[selectedNode.cluster],
                    }}
                  />
                  <span>{selectedNode.cluster} Cluster</span>
                  <span>·</span>
                  <span>Edited {selectedNode.updated}</span>
                </div>

                <h3 className="mt-2.5 font-geo text-2xl font-semibold tracking-tight text-white">
                  {selectedNode.label}
                </h3>

                <p className="mt-4 text-[14.5px] leading-[1.75] text-zinc-300">
                  {selectedNode.excerpt}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {selectedNode.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 border-t border-white/[0.08] pt-5">
                <div className="mb-2.5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-zinc-500">
                  <span>Connected Synapses</span>
                  <span>{selectedNode.links.length} links</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.links.map((targetId) => {
                    const target = GRAPH_NODES.find((n) => n.id === targetId);
                    if (!target) return null;
                    return (
                      <button
                        key={target.id}
                        type="button"
                        onClick={() => setSelectedId(target.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/20 bg-indigo-500/10 px-2.5 py-1 font-mono text-[11px] text-indigo-200 transition-colors hover:border-indigo-400/50 hover:bg-indigo-500/20 cursor-pointer"
                      >
                        <span>[[{target.shortLabel}]]</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware-Grade Telemetry Strip */}
      <section className="border-y border-white/[0.07] bg-[#0A0C12]/80">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-white/[0.07] sm:grid-cols-4 sm:divide-y-0">
          {[
            { value: "3.8ms", label: "Local semantic + full-text query" },
            { value: "100k+", label: "Markdown nodes indexed in RAM" },
            { value: "AES-256", label: "End-to-end encrypted vault sync" },
            { value: "0%", label: "Proprietary lock-in — pure .md" },
          ].map((stat) => (
            <div key={stat.label} className="px-6 py-8">
              <div className="font-geo text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1.5 font-mono text-[11.5px] text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Precision Architecture Grid */}
      <section id="architecture" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-indigo-400">
            Engineered for Velocity
          </span>
          <h2 className="mt-3 font-geo text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Think at the speed of your nervous system.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* Card 1: Semantic Recall */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0D1018] p-7 lg:col-span-7">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-indigo-500/15 px-2.5 py-1 font-mono text-[11px] text-indigo-300">
                ON-DEVICE VECTOR SEARCH
              </span>
              <span className="font-mono text-[11px] text-emerald-400">
                ● 100% Offline
              </span>
            </div>
            <h3 className="mt-5 font-geo text-2xl font-semibold text-white">
              Recall by meaning, not exact phrasing.
            </h3>
            <p className="mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-zinc-400">
              Search how your brain remembers—vague concepts, half-remembered quotes,
              or cross-domain analogies—without sending private journals to the cloud.
            </p>

            <div className="mt-6 rounded-xl border border-white/[0.07] bg-[#07090F] p-4 font-mono text-[12px]">
              <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 text-zinc-300">
                <span className="text-indigo-400">?</span>
                <span>&ldquo;why do physical workspaces improve memory&rdquo;</span>
              </div>
              <div className="mt-3 space-y-2.5">
                {[
                  {
                    score: "0.95",
                    title: "Spatial Arrangement as External Cognition",
                    path: "notes/spatial-cognition.md",
                  },
                  {
                    score: "0.89",
                    title: "Kirsh (1995) — Intelligent Use of Space",
                    path: "library/kirsh-1995.md",
                  },
                  {
                    score: "0.84",
                    title: "Zero-Friction Canvas Design Notes",
                    path: "design/calm-ui.md",
                  },
                ].map((hit) => (
                  <div
                    key={hit.path}
                    className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.025] px-3 py-2"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-zinc-100">{hit.title}</div>
                      <div className="truncate text-[10.5px] text-zinc-500">
                        {hit.path}
                      </div>
                    </div>
                    <span className="shrink-0 rounded bg-emerald-400/10 px-1.5 py-0.5 text-[10.5px] text-emerald-300">
                      {hit.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Instant Capture */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0D1018] p-7 lg:col-span-5">
            <div>
              <span className="rounded-md bg-sky-500/15 px-2.5 py-1 font-mono text-[11px] text-sky-300">
                GLOBAL QUICK-CAPTURE
              </span>
              <h3 className="mt-5 font-geo text-2xl font-semibold text-white">
                30ms from thought to disk.
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-zinc-400">
                Invoke Noema from any app, browser tab, or terminal. Drop text,
                screenshots, or local Whisper voice notes without breaking flow.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-[#07090F] px-6 py-8">
              <div className="flex items-center gap-2.5">
                {["⌘", "⇧", "Space"].map((key) => (
                  <kbd
                    key={key}
                    className="flex h-12 min-w-12 items-center justify-center rounded-xl border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.03] px-3.5 font-mono text-[14px] font-medium text-white shadow-[0_4px_0_rgba(0,0,0,0.6)]"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
              <span className="mt-4 font-mono text-[11px] text-zinc-500">
                Native Swift &amp; Rust binary · 42MB RAM footprint
              </span>
            </div>
          </div>

          {/* Card 3: Plain Markdown Sovereignty */}
          <div id="docs" className="rounded-2xl border border-white/[0.08] bg-[#0D1018] p-7 lg:col-span-5">
            <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 font-mono text-[11px] text-emerald-300">
              PLAIN-TEXT SOVEREIGNTY
            </span>
            <h3 className="mt-5 font-geo text-2xl font-semibold text-white">
              Your mind, stored as future-proof Markdown.
            </h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-zinc-400">
              No opaque proprietary database. Version your vault with Git, script it
              with Python, or open any note in Neovim forty years from now.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-xl border border-white/[0.07] bg-[#07090F] p-4 font-mono text-[11.5px] leading-relaxed text-zinc-300">
              <code>{`---
id: 20261118-systems
links: [second-brain, meadows]
---

# Leverage Points
Small shifts in [[Feedback Loops]]
outperform brute-force effort.`}</code>
            </pre>
          </div>

          {/* Card 4: Interactive Command Palette */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0D1018] p-7 lg:col-span-7">
            <span className="rounded-md bg-amber-500/15 px-2.5 py-1 font-mono text-[11px] text-amber-300">
              KEYBOARD-FIRST PALETTE
            </span>
            <h3 className="mt-5 font-geo text-2xl font-semibold text-white">
              Every action one chord away.
            </h3>
            <p className="mt-2.5 text-[14.5px] leading-relaxed text-zinc-400">
              Click a command below to preview how Noema responds without lifting
              your fingers from the home row.
            </p>

            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {COMMAND_DEMOS.map((item, idx) => {
                const active = idx === activeCmdIdx;
                return (
                  <button
                    key={item.shortcut}
                    type="button"
                    onClick={() => setActiveCmdIdx(idx)}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-3 text-left transition-all cursor-pointer ${
                      active
                        ? "border-indigo-400/50 bg-indigo-500/15 text-white"
                        : "border-white/[0.07] bg-[#07090F] text-zinc-400 hover:border-white/15 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-[13px] font-medium">{item.cmd}</span>
                    <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10.5px] text-indigo-200">
                      {item.shortcut}
                    </kbd>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] px-4 py-3 font-mono text-[12px] text-emerald-200">
              <span className="text-emerald-400">▸</span>
              <span>{COMMAND_DEMOS[activeCmdIdx].result}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Pricing Section with Billing Toggle */}
      <section id="pricing" className="border-t border-white/[0.07] bg-[#090B11] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-indigo-400">
                Simple Licensing
              </span>
              <h2 className="mt-2 font-geo text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Free locally. Sync when you want.
              </h2>
            </div>

            <div className="inline-flex items-center rounded-xl border border-white/10 bg-[#0F121B] p-1 text-[13px]">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`rounded-lg px-3.5 py-1.5 font-medium transition-colors cursor-pointer ${
                  !annual ? "bg-white text-zinc-950" : "text-zinc-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-medium transition-colors cursor-pointer ${
                  annual ? "bg-white text-zinc-950" : "text-zinc-400 hover:text-white"
                }`}
              >
                Annual
                <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-indigo-700">
                  -20%
                </span>
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Local Core",
                price: "$0",
                sub: "Forever free for personal vaults",
                features: [
                  "Unlimited local Markdown notes",
                  "2D Graph Workbench & backlinks",
                  "On-device local semantic search",
                  "macOS, Linux & Windows binaries",
                ],
                highlight: false,
                cta: "Download Local Core",
              },
              {
                name: "Constellation Pro",
                price: annual ? "$8" : "$10",
                sub: "per month · E2E encrypted sync",
                features: [
                  "Everything in Local Core",
                  "Zero-knowledge sync across all devices",
                  "iOS & iPadOS companion with voice capture",
                  "Automated Readwise, Kindle & PDF ingest",
                  "1-year point-in-time vault snapshots",
                ],
                highlight: true,
                cta: "Start 14-day Free Trial",
              },
              {
                name: "Research Lab",
                price: annual ? "$18" : "$22",
                sub: "per seat / month · Shared graphs",
                features: [
                  "Everything in Constellation Pro",
                  "Multiplayer encrypted team vaults",
                  "Custom domain knowledge publishing",
                  "SSO, audit logs & dedicated support",
                ],
                highlight: false,
                cta: "Deploy Team Vault",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col justify-between rounded-2xl border p-7 ${
                  plan.highlight
                    ? "border-indigo-400/45 bg-gradient-to-b from-indigo-500/[0.12] to-[#0D1018] shadow-[0_0_50px_-20px_rgba(99,102,241,0.5)]"
                    : "border-white/[0.08] bg-[#0D1018]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-geo text-xl font-semibold text-white">
                      {plan.name}
                    </h3>
                    {plan.highlight && (
                      <span className="rounded-full bg-indigo-500/25 px-2.5 py-0.5 font-mono text-[10px] text-indigo-200">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-geo text-5xl font-semibold tracking-tight text-white">
                      {plan.price}
                    </span>
                    <span className="font-mono text-[11.5px] text-zinc-400">
                      {plan.sub}
                    </span>
                  </div>

                  <ul className="mt-7 space-y-3 border-t border-white/[0.08] pt-6 text-[14px] text-zinc-300">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-indigo-400">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#top"
                  className={`mt-8 block rounded-xl py-2.5 text-center text-[13.5px] font-semibold transition-all ${
                    plan.highlight
                      ? "bg-indigo-500 text-white shadow-[0_0_24px_rgba(99,102,241,0.4)] hover:bg-indigo-400"
                      : "border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.09]"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Dark Footer */}
      <footer className="border-t border-white/[0.07] bg-[#06070A] py-14">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="font-geo text-lg font-semibold text-white">
              noema
            </span>
            <span className="font-mono text-[11px] text-zinc-500">
              {"// Built in Rust & Swift · Zero telemetry"}
            </span>
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-[11px] text-zinc-400">
            <a href="#workbench" className="hover:text-white">Graph</a>
            <a href="#architecture" className="hover:text-white">Security Audit</a>
            <a href="#docs" className="hover:text-white">Markdown Spec</a>
            <a href="#pricing" className="hover:text-white">Changelog</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
