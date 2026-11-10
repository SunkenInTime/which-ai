"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Command,
  Cpu,
  Database,
  Lock,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  cluster: "systems" | "cognition" | "strategy";
  x: number;
  y: number;
  updatedAt: string;
  similarity: string;
  file: string;
  snippet: string;
  tags: string[];
  neighbors: string[];
}

const GRAPH_NODES: GraphNode[] = [
  {
    id: "crdt",
    label: "Local-First CRDTs",
    cluster: "systems",
    x: 190,
    y: 120,
    updatedAt: "2h ago",
    similarity: "0.97 cos",
    file: "systems/local-first-crdt.md",
    snippet:
      "Conflict-free replicated data types let devices merge concurrent offline edits deterministically without a central coordinator. Latency drops to zero because disk is truth.",
    tags: ["#distributed", "#offline", "#architecture"],
    neighbors: ["raft", "sqlite", "latency", "secondbrain"],
  },
  {
    id: "raft",
    label: "Consensus Tradeoffs",
    cluster: "systems",
    x: 95,
    y: 235,
    updatedAt: "5d ago",
    similarity: "0.91 cos",
    file: "systems/consensus-cap-pacelc.md",
    snippet:
      "PACELC extends CAP: even when there is no network partition (E), systems still trade latency (L) against strict consistency (C). Human memory favors availability first, consolidation later.",
    tags: ["#consensus", "#pacelc"],
    neighbors: ["crdt", "sleep"],
  },
  {
    id: "sqlite",
    label: "Embedded Vector Index",
    cluster: "systems",
    x: 295,
    y: 230,
    updatedAt: "1d ago",
    similarity: "0.95 cos",
    file: "eng/sqlite-vec-hybrid.md",
    snippet:
      "Combining BM25 lexical FTS5 with quantized 384-dim embeddings inside a single local SQLite file yields sub-millisecond hybrid recall across 85,000 markdown notes.",
    tags: ["#sqlite", "#embeddings", "#search"],
    neighbors: ["crdt", "recall", "secondbrain"],
  },
  {
    id: "secondbrain",
    label: "Second Brain Topology",
    cluster: "cognition",
    x: 340,
    y: 125,
    updatedAt: "Today",
    similarity: "0.99 cos",
    file: "core/second-brain-topology.md",
    snippet:
      "Small-world networks exhibit short path lengths and high clustering. Your best breakthroughs live on weak-tie bridge edges connecting two dense topic clusters.",
    tags: ["#graph-theory", "#synthesis"],
    neighbors: ["crdt", "sqlite", "sleep", "pricing", "recall"],
  },
  {
    id: "sleep",
    label: "Sleep Spindle Replay",
    cluster: "cognition",
    x: 215,
    y: 330,
    updatedAt: "2w ago",
    similarity: "0.89 cos",
    file: "neuro/hippocampal-replay.md",
    snippet:
      "During NREM slow-wave sleep, hippocampal sharp-wave ripples replay daytime experiences at 10x speed to integrate them into neocortical long-term schemas.",
    tags: ["#neuroscience", "#consolidation"],
    neighbors: ["raft", "secondbrain", "recall"],
  },
  {
    id: "recall",
    label: "Retrieval Practice",
    cluster: "cognition",
    x: 445,
    y: 255,
    updatedAt: "3d ago",
    similarity: "0.94 cos",
    file: "neuro/active-retrieval.md",
    snippet:
      "Re-reading creates an illusion of competence. Effortful retrieval rewrites and strengthens the synaptic trace each time a forgotten note is pulled into active working memory.",
    tags: ["#memory", "#spaced-recall"],
    neighbors: ["sqlite", "secondbrain", "sleep", "writing"],
  },
  {
    id: "latency",
    label: "100ms Flow Threshold",
    cluster: "strategy",
    x: 475,
    y: 110,
    updatedAt: "6d ago",
    similarity: "0.92 cos",
    file: "product/flow-state-latency.md",
    snippet:
      "Every 200ms spinner fractures working memory. When capture and recall happen under 50ms, the tool disappears and becomes a literal extension of prefrontal cortex.",
    tags: ["#ergonomics", "#ux", "#speed"],
    neighbors: ["crdt", "pricing", "writing"],
  },
  {
    id: "pricing",
    label: "Trust & Longevity",
    cluster: "strategy",
    x: 565,
    y: 200,
    updatedAt: "1w ago",
    similarity: "0.87 cos",
    file: "strategy/file-over-app.md",
    snippet:
      "File over app: if you want your digital artifacts to remain readable in 2060, store them in open plaintext protocols rather than opaque cloud schemas.",
    tags: ["#longevity", "#markdown"],
    neighbors: ["secondbrain", "latency", "writing"],
  },
  {
    id: "writing",
    label: "Emergent Outlines",
    cluster: "strategy",
    x: 545,
    y: 325,
    updatedAt: "4h ago",
    similarity: "0.93 cos",
    file: "essays/bottom-up-writing.md",
    snippet:
      "Never start from a blank cursor. Query a cluster of 12 atomic notes, sort by causal tension, and let the argument assemble itself from verified citations.",
    tags: ["#writing", "#synthesis"],
    neighbors: ["recall", "latency", "pricing"],
  },
];

const EDGES: [string, string][] = [
  ["crdt", "raft"],
  ["crdt", "sqlite"],
  ["crdt", "secondbrain"],
  ["crdt", "latency"],
  ["raft", "sleep"],
  ["sqlite", "secondbrain"],
  ["sqlite", "recall"],
  ["secondbrain", "sleep"],
  ["secondbrain", "recall"],
  ["secondbrain", "pricing"],
  ["sleep", "recall"],
  ["recall", "writing"],
  ["latency", "pricing"],
  ["latency", "writing"],
  ["pricing", "writing"],
];

const PRESET_QUERIES = [
  { label: "consensus & sleep", query: "consensus", focusNode: "raft" },
  { label: "vector sqlite", query: "sqlite", focusNode: "sqlite" },
  { label: "100ms flow state", query: "100ms", focusNode: "latency" },
  { label: "weak-tie bridges", query: "topology", focusNode: "secondbrain" },
];

export default function IterationTwoObsidian() {
  const [selectedId, setSelectedId] = useState<string>("secondbrain");
  const [query, setQuery] = useState<string>("");

  const activeNode = useMemo(
    () => GRAPH_NODES.find((n) => n.id === selectedId) ?? GRAPH_NODES[3],
    [selectedId]
  );

  const filteredNodes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GRAPH_NODES;
    return GRAPH_NODES.filter(
      (n) =>
        n.label.toLowerCase().includes(q) ||
        n.snippet.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const matchedIds = useMemo(
    () => new Set(filteredNodes.map((n) => n.id)),
    [filteredNodes]
  );

  return (
    <div className="min-h-screen bg-[#080A0E] text-[#F2F5F9] selection:bg-emerald-400/25 selection:text-emerald-200">
      {/* Ambient Grid + Top Radial Glow */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-obsidian-grid opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-44 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]"
        />

        {/* Navigation */}
        <header className="relative z-30 border-b border-white/8 bg-[#080A0E]/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.2)]">
                <Network className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                engram<span className="text-emerald-400">.sh</span>
              </span>
              <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-jetbrains text-[11px] text-emerald-300 sm:inline-block">
                v4.2 · 0.4ms SQLite-Vec
              </span>
            </div>

            <nav className="hidden items-center gap-7 text-sm text-[#94A0B4] md:flex">
              <a href="#graph-engine" className="transition-colors hover:text-white">
                Synaptic Graph
              </a>
              <a href="#architecture" className="transition-colors hover:text-white">
                Architecture
              </a>
              <a href="#shortcuts" className="transition-colors hover:text-white">
                Ergonomics
              </a>
              <a href="#pricing" className="transition-colors hover:text-white">
                Pricing
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-1.5 font-jetbrains text-xs text-[#8A94A6] lg:inline-flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                E2EE VAULT READY
              </span>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2 text-xs font-semibold text-[#06110C] transition-all hover:bg-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.25)]"
              >
                <span>Download Binary</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section id="graph-engine" className="relative z-20 mx-auto max-w-7xl px-6 pt-16 pb-20 lg:pt-22">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-3.5 py-1 font-jetbrains text-xs text-emerald-300">
              <Zap className="h-3.5 w-3.5" />
              <span>THOUGHT AT KEYBOARD SPEED · ZERO CLOUD LATENCY</span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-6xl lg:text-[64px]">
              Externalize your cortex.{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                Query every memory in 0.4ms.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#94A0B4] sm:text-lg">
              Engram indexes every Markdown note, code snippet, paper highlight, and
              meeting transcript into a local hybrid vector graph—surfacing exact
              connections the millisecond you type.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#080A0E] transition-colors hover:bg-emerald-300"
              >
                <Terminal className="h-4 w-4" />
                <span>brew install --cask engram</span>
              </a>
              <a
                href="#architecture"
                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-medium text-[#D0D7E2] transition-colors hover:border-white/25 hover:bg-white/[0.06]"
              >
                <span>Inspect Local-First Spec</span>
              </a>
            </div>
          </div>

          {/* Interactive Neural Obsidian Workspace */}
          <div className="mt-14 rounded-2xl border border-white/12 bg-[#0C1016]/95 shadow-[0_30px_90px_rgba(0,0,0,0.75)] backdrop-blur-xl">
            {/* Window Top Chrome + Command Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="ml-2 font-jetbrains text-xs text-[#7D889B]">
                  ~/vaults/cortex — 14,820 notes indexed
                </span>
              </div>

              {/* Interactive Command / Semantic Filter Input */}
              <div className="flex flex-1 items-center justify-end gap-2 sm:max-w-md">
                <div className="relative flex w-full items-center">
                  <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-emerald-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Filter synaptic graph (e.g. consensus, sleep, sqlite)..."
                    aria-label="Filter synaptic knowledge graph"
                    className="w-full rounded-lg border border-white/12 bg-[#07090D] py-1.5 pr-14 pl-8 font-jetbrains text-xs text-white placeholder:text-[#5E6879] focus:border-emerald-400/60 focus:outline-none"
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-2 rounded bg-white/10 px-1.5 py-0.5 font-jetbrains text-[10px] text-neutral-300 hover:bg-white/20 cursor-pointer"
                    >
                      ESC
                    </button>
                  ) : (
                    <kbd className="pointer-events-none absolute right-2.5 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-jetbrains text-[10px] text-[#7D889B]">
                      ⌘K
                    </kbd>
                  )}
                </div>
              </div>
            </div>

            {/* Preset Recall Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/8 bg-[#090C11] px-4 py-2">
              <span className="font-jetbrains text-[11px] text-[#6D788A]">
                QUICK RECALL:
              </span>
              {PRESET_QUERIES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setQuery(preset.query);
                    setSelectedId(preset.focusNode);
                  }}
                  className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 font-jetbrains text-[11px] text-[#B8C2D4] transition-colors hover:border-emerald-400/40 hover:text-emerald-300 cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="ml-auto font-jetbrains text-[11px] text-amber-300 hover:underline cursor-pointer"
                >
                  Reset filter ({filteredNodes.length}/{GRAPH_NODES.length} nodes)
                </button>
              )}
            </div>

            {/* Split Graph + Markdown Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Interactive SVG Constellation */}
              <div className="relative border-b border-white/8 p-4 lg:col-span-7 lg:border-r lg:border-b-0">
                <div className="mb-2 flex items-center justify-between font-jetbrains text-[11px] text-[#6D788A]">
                  <span>INTERACTIVE SYNAPTIC TOPOLOGY · CLICK ANY NODE</span>
                  <span className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" /> Active
                    </span>
                    <span className="inline-flex items-center gap-1 text-amber-300">
                      <span className="h-2 w-2 rounded-full bg-amber-400" /> 1-Hop Link
                    </span>
                  </span>
                </div>

                <svg
                  viewBox="0 0 660 410"
                  className="h-[340px] w-full rounded-xl bg-[#07090D] border border-white/[0.05] sm:h-[380px]"
                  role="img"
                  aria-label="Interactive second brain node graph"
                >
                  <defs>
                    <radialGradient id="activeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#34D399" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Edges */}
                  {EDGES.map(([a, b]) => {
                    const nodeA = GRAPH_NODES.find((n) => n.id === a)!;
                    const nodeB = GRAPH_NODES.find((n) => n.id === b)!;
                    const touchesSelected = a === activeNode.id || b === activeNode.id;
                    const bothVisible = matchedIds.has(a) && matchedIds.has(b);

                    return (
                      <line
                        key={`${a}-${b}`}
                        x1={nodeA.x}
                        y1={nodeA.y}
                        x2={nodeB.x}
                        y2={nodeB.y}
                        stroke={
                          touchesSelected
                            ? "#34D399"
                            : bothVisible
                              ? "rgba(255,255,255,0.13)"
                              : "rgba(255,255,255,0.04)"
                        }
                        strokeWidth={touchesSelected ? 2 : 1}
                        strokeDasharray={touchesSelected ? undefined : "3 3"}
                      />
                    );
                  })}

                  {/* Nodes */}
                  {GRAPH_NODES.map((node) => {
                    const isSelected = node.id === activeNode.id;
                    const isNeighbor = activeNode.neighbors.includes(node.id);
                    const isMatched = matchedIds.has(node.id);

                    return (
                      <g
                        key={node.id}
                        onClick={() => setSelectedId(node.id)}
                        className="cursor-pointer"
                        opacity={isMatched ? 1 : 0.25}
                      >
                        {isSelected && (
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={34}
                            fill="url(#activeGlow)"
                          />
                        )}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 10 : isNeighbor ? 7.5 : 6}
                          fill={
                            isSelected
                              ? "#34D399"
                              : isNeighbor
                                ? "#F59E0B"
                                : "#334155"
                          }
                          stroke={isSelected ? "#ECFDF5" : "#0F172A"}
                          strokeWidth={2}
                        />
                        <text
                          x={node.x}
                          y={node.y + 23}
                          textAnchor="middle"
                          fill={
                            isSelected
                              ? "#6EE7B7"
                              : isNeighbor
                                ? "#FDE68A"
                                : "#94A3B8"
                          }
                          fontSize="11.5"
                          fontFamily="var(--font-jetbrains-var), monospace"
                          fontWeight={isSelected ? "600" : "400"}
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Right Live Note & Synaptic Context Inspector */}
              <div className="flex flex-col justify-between p-6 lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between font-jetbrains text-xs">
                    <span className="text-emerald-400">{activeNode.file}</span>
                    <span className="rounded bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300">
                      {activeNode.similarity}
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    {activeNode.label}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-2 font-jetbrains text-[11px] text-[#7D889B]">
                    <span>Modified {activeNode.updatedAt}</span>
                    <span>·</span>
                    {activeNode.tags.map((tag) => (
                      <span key={tag} className="text-teal-300/90">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-white/8 bg-[#080A0E] p-4 font-jetbrains text-xs leading-relaxed text-[#CBD5E1]">
                    <span className="text-emerald-400">## Core Insight</span>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-[#E2E8F0]">
                      {activeNode.snippet}
                    </p>
                  </div>

                  {/* Connected Synapses */}
                  <div className="mt-5">
                    <div className="font-jetbrains text-[11px] uppercase tracking-wider text-[#7D889B]">
                      1-Hop Synaptic Bridges ({activeNode.neighbors.length})
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {activeNode.neighbors.map((nId) => {
                        const neighbor = GRAPH_NODES.find((item) => item.id === nId);
                        if (!neighbor) return null;
                        return (
                          <button
                            key={nId}
                            type="button"
                            onClick={() => setSelectedId(neighbor.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/25 bg-amber-400/[0.07] px-2.5 py-1.5 font-jetbrains text-xs text-amber-200 transition-colors hover:border-amber-400/60 hover:bg-amber-400/15 cursor-pointer"
                          >
                            <span>[[{neighbor.label}]]</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Grounded AI Synthesis Strip */}
                <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-3.5">
                  <div className="flex items-center gap-1.5 font-jetbrains text-[11px] text-emerald-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>GROUNDED SYNTHESIS · ZERO EXTERNAL HALLUCINATION</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#B8C2D4]">
                    Links <code className="text-white">{activeNode.label}</code> across{" "}
                    {activeNode.neighbors.length} adjacent notes using local embeddings
                    computed on Apple Silicon / WebGPU.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Telemetry Benchmark Bar */}
      <section className="border-y border-white/8 bg-[#0B0E14] py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {[
            { metric: "0.4 ms", label: "Hybrid FTS5 + Vector Query" },
            { metric: "100,000+", label: "Markdown Notes @ 60fps" },
            { metric: "XChaCha20", label: "Zero-Knowledge Sync Cipher" },
            { metric: "0 Bytes", label: "Sent to Third-Party LLMs" },
          ].map((stat) => (
            <div key={stat.label} className="border-l border-emerald-400/30 pl-4">
              <div className="font-jetbrains text-2xl font-semibold text-white sm:text-3xl">
                {stat.metric}
              </div>
              <div className="mt-1 text-xs text-[#8A94A6]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Architecture Section */}
      <section id="architecture" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="font-jetbrains text-xs uppercase tracking-widest text-emerald-400">
            {"// COGNITIVE ENGINE ARCHITECTURE"}
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Engineered like a database. Feels like telepathy.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Card 1 */}
          <div className="rounded-2xl border border-white/10 bg-[#0E131B] p-7 md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-md bg-emerald-400/10 px-2.5 py-1 font-jetbrains text-xs text-emerald-300">
              <Cpu className="h-3.5 w-3.5" />
              <span>ON-DEVICE SEMANTIC ENGINE</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Ask your vault complex questions. Get cited line numbers, never guesswork.
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#94A0B4]">
              Every answer is strictly constrained to notes you actually wrote or
              saved, with clickable citations jumping straight to exact paragraphs and
              timestamps.
            </p>
            <div className="mt-6 rounded-xl border border-white/8 bg-[#080A0E] p-4 font-jetbrains text-xs">
              <div className="text-[#7D889B]">
                &gt; query: &quot;Why did we reject event sourcing in Q2?&quot;
              </div>
              <div className="mt-2.5 text-emerald-300">
                Found 3 notes · Synthesized in 18ms:
              </div>
              <p className="mt-1.5 text-[#D0D7E2]">
                Schema migration overhead outweighed audit gains for single-tenant
                nodes{" "}
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-amber-300">
                  [[adr-019-storage.md#L48]]
                </span>{" "}
                and snapshot compaction spiked p99 tail latency{" "}
                <span className="rounded bg-white/10 px-1.5 py-0.5 text-amber-300">
                  [[2026-05-14-bench.md#L12]]
                </span>
                .
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-white/10 bg-[#0E131B] p-7 md:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-md bg-amber-400/10 px-2.5 py-1 font-jetbrains text-xs text-amber-300">
              <Database className="h-3.5 w-3.5" />
              <span>PLAIN FILES ON DISK</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              Git-friendly Markdown. Zero lock-in.
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#94A0B4]">
              Edit simultaneously in Vim, Cursor, or Engram. File-watcher re-indexes
              changed Markdown buffers in under 3 milliseconds without corrupting
              frontmatter.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-xl border border-white/8 bg-[#080A0E] p-4 font-jetbrains text-[11px] leading-relaxed text-[#B8C2D4]">
{`---
id: 01J9X8K2
links: [[second-brain-topology]]
updated: 2026-11-10T11:42Z
---
# Atomic Thought
Plain UTF-8 forever.`}
            </pre>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-white/10 bg-[#0E131B] p-7 md:col-span-4">
            <Lock className="h-5 w-5 text-emerald-400" />
            <h3 className="mt-4 text-xl font-semibold text-white">
              Zero-Knowledge CRDT Sync
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#94A0B4]">
              Keys are derived locally via Argon2id. Even our relay servers see only
              encrypted ciphertext deltas.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-white/10 bg-[#0E131B] p-7 md:col-span-4">
            <Activity className="h-5 w-5 text-emerald-400" />
            <h3 className="mt-4 text-xl font-semibold text-white">
              Automatic Unlinked Mentions
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#94A0B4]">
              Write naturally. Background AST + vector pass detects implicit references
              across five years of daily logs.
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl border border-white/10 bg-[#0E131B] p-7 md:col-span-4">
            <Command className="h-5 w-5 text-emerald-400" />
            <h3 className="mt-4 text-xl font-semibold text-white">
              Global Raycast &amp; CLI Capture
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#94A0B4]">
              Pipe stdout directly into today&apos;s note:{" "}
              <code className="font-jetbrains text-xs text-emerald-300">
                pbpaste | engram jot --link
              </code>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Keyboard Ergonomics Strip */}
      <section id="shortcuts" className="border-y border-white/8 bg-[#0B0E14] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-jetbrains text-xs text-emerald-400">
                {"// MUSCLE MEMORY FIRST"}
              </span>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                Never touch the mouse while thinking.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#8A94A6]">
              Full Vim modal bindings optional out of the box, plus chorded shortcuts
              for graph hopping and split-stack refactoring.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { keys: ["⌘", "K"], action: "Hybrid Semantic + Exact Recall" },
              { keys: ["⌘", "⇧", "Space"], action: "Global Fleeting Thought HUD" },
              { keys: ["⌘", "G"], action: "Open 2-Hop Local Graph Lens" },
              { keys: ["⌘", "⇧", "M"], action: "Extract Selection to Atomic Note" },
            ].map((item) => (
              <div
                key={item.action}
                className="flex items-center justify-between rounded-xl border border-white/8 bg-[#0F141D] p-4"
              >
                <span className="text-xs font-medium text-[#D0D7E2]">{item.action}</span>
                <div className="ml-3 flex shrink-0 gap-1">
                  {item.keys.map((k) => (
                    <kbd
                      key={k}
                      className="rounded border border-white/15 bg-[#080A0E] px-2 py-1 font-jetbrains text-xs text-emerald-300 shadow-inner"
                    >
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-5xl">
            Local core is free forever. Pay only for encrypted relay.
          </h2>
          <p className="mt-3 text-sm text-[#8A94A6]">
            No seat minimums, no AI token upsells, no telemetry.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0E131B] p-8">
            <div>
              <div className="font-jetbrains text-xs text-[#8A94A6]">CORE BINARY</div>
              <div className="mt-3 text-4xl font-semibold text-white">$0</div>
              <p className="mt-2 text-xs text-[#8A94A6]">
                Unlimited local vaults, graph visualization &amp; on-device embeddings.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-[#CBD5E1]">
                <li>✓ Unlimited Markdown files &amp; bidirectional graph</li>
                <li>✓ Local SQLite-Vec semantic search &amp; CLI tool</li>
                <li>✓ Bring your own Git / Syncthing / iCloud folder</li>
              </ul>
            </div>
            <button
              type="button"
              className="mt-8 w-full rounded-xl border border-white/15 bg-white/[0.04] py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer"
            >
              Download Universal macOS / Linux
            </button>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-emerald-400/40 bg-gradient-to-b from-emerald-500/[0.09] to-[#0E131B] p-8 shadow-[0_0_50px_rgba(52,211,153,0.1)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-jetbrains text-xs text-emerald-300">
                  SYNAPTIC SYNC
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-0.5 font-jetbrains text-[10px] text-emerald-300">
                  <ShieldCheck className="h-3 w-3" /> E2EE VERIFIED
                </span>
              </div>
              <div className="mt-3 text-4xl font-semibold text-white">
                $8 <span className="text-base font-normal text-[#8A94A6]">/ mo</span>
              </div>
              <p className="mt-2 text-xs text-[#8A94A6]">
                Instant sub-second CRDT sync across desktop &amp; mobile.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-[#E2E8F0]">
                <li>✓ Sub-100ms encrypted CRDT sync across 10 devices</li>
                <li>✓ Encrypted attachment vault (50 GB PDFs, audio, images)</li>
                <li>✓ Infinite snapshot rollback &amp; static web publishing</li>
              </ul>
            </div>
            <button
              type="button"
              className="mt-8 w-full rounded-xl bg-emerald-400 py-3 text-sm font-semibold text-[#06110C] transition-colors hover:bg-emerald-300 cursor-pointer"
            >
              Initialize Encrypted Sync →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 bg-[#06080B] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 font-jetbrains text-xs text-[#6D788A] sm:flex-row sm:items-center">
          <span>ENGRAM // ITERATION 02 OF 05 · NEURAL OBSIDIAN</span>
          <div className="flex gap-6">
            <a href="#graph-engine" className="hover:text-emerald-300">
              GRAPH
            </a>
            <a href="#architecture" className="hover:text-emerald-300">
              SPEC
            </a>
            <a href="#pricing" className="hover:text-emerald-300">
              DOWNLOAD
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
