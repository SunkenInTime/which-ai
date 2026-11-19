"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Command,
  Cpu,
  GitBranch,
  Lock,
  Network,
  Search,
  Sparkles,
  Zap,
  Check,
  Hash,
  FileCode2,
} from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  cluster: string;
  x: number;
  y: number;
  color: string;
  connections: string[];
  tags: string[];
  updated: string;
  snippet: string[];
}

const NODES: GraphNode[] = [
  {
    id: "systems",
    label: "Systems Thinking",
    cluster: "Core Mental Model",
    x: 260,
    y: 170,
    color: "#22D3EE",
    connections: ["first-principles", "cognitive-load", "geb", "horizon"],
    tags: ["#mental-models", "#feedback-loops", "#evergreen"],
    updated: "Edited 14m ago · 19 backlinks",
    snippet: [
      "# Systems Thinking",
      "A system's behavior emerges from the relationships between parts—never from inspecting components in isolation.",
      "↳ Connected to [[First Principles]] for decomposition and [[Cognitive Load]] for interface clarity.",
      "Key lever: shorten the feedback delay between noticing an anomaly and adjusting the loop.",
    ],
  },
  {
    id: "first-principles",
    label: "First Principles",
    cluster: "Reasoning",
    x: 115,
    y: 95,
    color: "#818CF8",
    connections: ["systems", "design-axioms", "geb"],
    tags: ["#reasoning", "#strategy"],
    updated: "Edited 2d ago · 11 backlinks",
    snippet: [
      "# First Principles",
      "Boil a problem down to physical and mathematical truths, then reason upward instead of copying conventions.",
      "↳ Applied in [[Design Axioms]] to eliminate nested folder trees in favor of flat associative graphs.",
    ],
  },
  {
    id: "sleep",
    label: "Sleep & Consolidation",
    cluster: "Neuroscience",
    x: 410,
    y: 95,
    color: "#A855F7",
    connections: ["cognitive-load", "horizon"],
    tags: ["#neuroscience", "#memory", "#paper"],
    updated: "Edited 5d ago · 8 backlinks",
    snippet: [
      "# Sleep & Memory Consolidation",
      "During slow-wave sleep, the hippocampus replays daytime fragments into neocortical networks—pruning noise and strengthening cross-domain links.",
      "↳ Engram's nightly link-suggestion pass mirrors this biological replay.",
    ],
  },
  {
    id: "cognitive-load",
    label: "Cognitive Load",
    cluster: "Human Factors",
    x: 390,
    y: 255,
    color: "#38BDF8",
    connections: ["systems", "sleep", "design-axioms"],
    tags: ["#ux", "#psychology", "#focus"],
    updated: "Edited yesterday · 14 backlinks",
    snippet: [
      "# Working Memory & Cognitive Load",
      "Working memory holds roughly 4±1 chunks. Offloading open loops to a trusted external brain immediately restores creative bandwidth.",
      "↳ See [[Design Axioms]] on why capture must take under 400ms.",
    ],
  },
  {
    id: "geb",
    label: "Gödel, Escher, Bach",
    cluster: "Library",
    x: 95,
    y: 250,
    color: "#F472B6",
    connections: ["systems", "first-principles"],
    tags: ["#books", "#strange-loops", "#highlights"],
    updated: "47 Kindle highlights imported",
    snippet: [
      "# Gödel, Escher, Bach — Douglas Hofstadter",
      "Strange loops arise when moving up or down through levels of a hierarchical system unexpectedly brings you back to where you started.",
      "↳ Directly echoes recursive linking inside [[Systems Thinking]].",
    ],
  },
  {
    id: "horizon",
    label: "Project Horizon",
    cluster: "Active Work",
    x: 270,
    y: 55,
    color: "#34D399",
    connections: ["systems", "sleep"],
    tags: ["#project", "#q4-roadmap"],
    updated: "Active sprint · 6 open tasks",
    snippet: [
      "# Project Horizon — Q4 Architecture",
      "- [x] Benchmark Rust CRDT merge on 100k local nodes (0.38ms)",
      "- [ ] Ship offline vector embeddings for semantic ⌘K recall",
      "↳ Research grounded in [[Systems Thinking]] & [[Sleep & Consolidation]].",
    ],
  },
  {
    id: "design-axioms",
    label: "Design Axioms",
    cluster: "Craft",
    x: 235,
    y: 295,
    color: "#FBBF24",
    connections: ["first-principles", "cognitive-load"],
    tags: ["#craft", "#speed", "#principles"],
    updated: "Edited 3h ago · 16 backlinks",
    snippet: [
      "# Design Axioms for Tools of Thought",
      "1. Latency under 16ms feels like physical ink.",
      "2. Links should never break when a file is renamed.",
      "3. Your second brain must work on a 12-hour flight with zero Wi-Fi.",
    ],
  },
];

const EDGES: [string, string][] = [
  ["systems", "first-principles"],
  ["systems", "cognitive-load"],
  ["systems", "geb"],
  ["systems", "horizon"],
  ["first-principles", "design-axioms"],
  ["first-principles", "geb"],
  ["sleep", "cognitive-load"],
  ["sleep", "horizon"],
  ["cognitive-load", "design-axioms"],
];

const VAULT_SEARCH_ITEMS = [
  {
    title: "Sleep & Memory Consolidation",
    path: "neuroscience/sleep-consolidation.md",
    score: "99%",
    excerpt: "Hippocampal replay strengthens cross-domain associative links overnight.",
    keywords: "sleep memory neuroscience replay brain recall",
  },
  {
    title: "Systems Thinking & Feedback Loops",
    path: "models/systems-thinking.md",
    score: "96%",
    excerpt: "Behavior emerges from relationships between parts, not isolated folders.",
    keywords: "systems feedback loops mental models complexity",
  },
  {
    title: "Design Axioms for Speed",
    path: "craft/design-axioms.md",
    score: "94%",
    excerpt: "Sub-16ms input latency makes digital thought feel as natural as ink.",
    keywords: "design speed latency ui craft ux axioms",
  },
  {
    title: "Working Memory & Cognitive Load",
    path: "psychology/cognitive-load.md",
    score: "92%",
    excerpt: "Externalizing open loops frees working memory for deep synthesis.",
    keywords: "memory cognitive load focus psychology brain",
  },
  {
    title: "Project Horizon — Rust CRDT Sync",
    path: "work/project-horizon.md",
    score: "89%",
    excerpt: "Zero-conflict local-first sync merges 100k encrypted nodes in 0.38ms.",
    keywords: "sync rust local project roadmap horizon",
  },
];

export default function CosmosLanding() {
  const [selectedId, setSelectedId] = useState<string>("systems");
  const [query, setQuery] = useState<string>("");

  const activeNode = useMemo(
    () => NODES.find((n) => n.id === selectedId) ?? NODES[0],
    [selectedId]
  );

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return VAULT_SEARCH_ITEMS;
    return VAULT_SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.keywords.includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-[#07080D] text-[#F4F6FB] font-[family-name:var(--font-jakarta)] selection:bg-cyan-400/25 selection:text-cyan-100">
      {/* Ambient Radial Aura */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-indigo-600/18 blur-[130px]" />
        <div className="absolute top-[36%] right-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Floating Glass Navbar */}
      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#07080D]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/35 bg-gradient-to-br from-indigo-500/30 to-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Network className="h-4 w-4 text-cyan-300" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">
              Engram
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
              v4.2
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a href="#constellation" className="transition-colors hover:text-white">
              Graph Engine
            </a>
            <a href="#recall" className="transition-colors hover:text-white">
              Semantic ⌘K
            </a>
            <a href="#capabilities" className="transition-colors hover:text-white">
              Architecture
            </a>
            <a href="#pricing" className="transition-colors hover:text-white">
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#recall"
              className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/4 px-2.5 py-1.5 font-mono text-xs text-slate-400 transition-colors hover:border-white/20 hover:text-white sm:inline-flex"
            >
              <Command className="h-3 w-3" />
              <span>K</span>
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.3)] transition-transform hover:scale-[1.02]"
            >
              Launch Vault
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative pt-16 pb-20 lg:pt-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-3.5 py-1.5 text-xs font-medium text-cyan-200">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span>Local-first neural workspace · Zero-latency Rust core</span>
            </div>

            <h1 className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl lg:leading-[1.05]">
              Think in constellations, not folders.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              Engram maps every note, highlight, and fleeting idea into a
              living, encrypted neural graph on your device. Traverse ten years
              of knowledge at the speed of thought.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:bg-cyan-100"
              >
                Download for macOS & Linux
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#constellation"
                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-400/40 hover:bg-white/8"
              >
                Explore Live Graph Below
              </a>
            </div>
          </div>

          {/* Interactive Spatial Knowledge Graph + Inspector */}
          <div
            id="constellation"
            className="mt-16 overflow-hidden rounded-2xl border border-white/12 bg-[#0D101B]/90 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            {/* App Chrome */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 bg-[#0A0C15] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 font-mono text-xs text-slate-400">
                  engram://vault/second-brain · 1,428 nodes · 4,912 synapses
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                Click any node to inspect its links
              </div>
            </div>

            <div className="grid lg:grid-cols-12">
              {/* Left Interactive SVG Constellation */}
              <div className="relative bg-line-grid-dark p-4 lg:col-span-7 lg:border-r lg:border-white/8">
                <svg
                  viewBox="0 0 510 345"
                  className="h-[340px] w-full sm:h-[380px]"
                  role="img"
                  aria-label="Interactive Second Brain Knowledge Graph"
                >
                  <defs>
                    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Edges */}
                  {EDGES.map(([fromId, toId]) => {
                    const from = NODES.find((n) => n.id === fromId)!;
                    const to = NODES.find((n) => n.id === toId)!;
                    const isHighlighted =
                      fromId === selectedId || toId === selectedId;

                    return (
                      <line
                        key={`${fromId}-${toId}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isHighlighted ? "#22D3EE" : "rgba(148,163,184,0.22)"}
                        strokeWidth={isHighlighted ? 2 : 1.1}
                        strokeDasharray={isHighlighted ? undefined : "3 3"}
                        className="transition-all duration-300"
                      />
                    );
                  })}

                  {/* Nodes */}
                  {NODES.map((node) => {
                    const isSelected = node.id === selectedId;
                    const isNeighbor = activeNode.connections.includes(node.id);

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedId(node.id)}
                        className="cursor-pointer"
                      >
                        {isSelected && (
                          <circle
                            r="24"
                            fill="none"
                            stroke={node.color}
                            strokeOpacity="0.4"
                            strokeWidth="1.5"
                            className="animate-pulse-slow"
                          />
                        )}
                        <circle
                          r={isSelected ? 11 : isNeighbor ? 8 : 6.5}
                          fill={
                            isSelected || isNeighbor
                              ? node.color
                              : "rgba(148,163,184,0.45)"
                          }
                          filter={isSelected ? "url(#glow)" : undefined}
                          className="transition-all duration-200"
                        />
                        <circle
                          r={isSelected ? 4 : 2.5}
                          fill="#07080D"
                        />
                        <rect
                          x="-58"
                          y="16"
                          width="116"
                          height="22"
                          rx="6"
                          fill={
                            isSelected
                              ? "rgba(34,211,238,0.16)"
                              : "rgba(13,16,27,0.82)"
                          }
                          stroke={
                            isSelected
                              ? "rgba(34,211,238,0.55)"
                              : "rgba(255,255,255,0.08)"
                          }
                        />
                        <text
                          y="30"
                          textAnchor="middle"
                          fill={isSelected || isNeighbor ? "#F8FAFC" : "#94A3B8"}
                          fontSize="10.5"
                          fontWeight={isSelected ? "600" : "500"}
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Quick Node Pills */}
                <div className="mt-2 flex flex-wrap gap-1.5 border-t border-white/8 pt-3">
                  {NODES.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setSelectedId(n.id)}
                      className={`cursor-pointer rounded-md px-2.5 py-1 font-mono text-[11px] transition-all ${
                        n.id === selectedId
                          ? "bg-cyan-400/20 text-cyan-200 ring-1 ring-cyan-400/50"
                          : "bg-white/4 text-slate-400 hover:bg-white/8 hover:text-slate-200"
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Live Note Inspector */}
              <div className="flex flex-col justify-between p-6 lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-white/6 px-2.5 py-1 font-mono text-[11px] text-cyan-300">
                      <FileCode2 className="h-3.5 w-3.5" />
                      {activeNode.cluster}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      {activeNode.updated}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 rounded-xl border border-white/8 bg-[#080A12] p-4 font-mono text-[13px] leading-relaxed">
                    {activeNode.snippet.map((line, i) => (
                      <p
                        key={i}
                        className={
                          i === 0
                            ? "font-sans text-base font-semibold text-white"
                            : line.startsWith("↳")
                            ? "text-cyan-300/90"
                            : "text-slate-300"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {activeNode.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[11px] text-indigo-300"
                      >
                        <Hash className="h-2.5 w-2.5" />
                        {tag.replace("#", "")}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-white/8 pt-4">
                  <div className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                    Direct Neural Links ({activeNode.connections.length})
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {activeNode.connections.map((connId) => {
                      const target = NODES.find((n) => n.id === connId);
                      if (!target) return null;
                      return (
                        <button
                          key={connId}
                          type="button"
                          onClick={() => setSelectedId(connId)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 bg-white/4 px-2.5 py-1.5 text-xs text-slate-200 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10"
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: target.color }}
                          />
                          {target.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="border-y border-white/8 bg-[#0B0D16]/70">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {[
            { value: "0.4ms", label: "Local graph traversal" },
            { value: "250k+", label: "Notes per vault at 60fps" },
            { value: "E2EE", label: "Zero-knowledge AES-256 sync" },
            { value: "100%", label: "Offline-first Markdown files" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text font-mono text-3xl font-bold text-transparent">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Semantic ⌘K Recall Demo */}
      <section id="recall" className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
                Instant Semantic Recall
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ask by vague memory. Find the exact thought.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                On-device neural embeddings index your vault privately—never
                sending a single sentence to third-party servers. Hit{" "}
                <kbd className="rounded border border-white/15 bg-white/8 px-1.5 py-0.5 font-mono text-xs text-slate-200">
                  ⌘K
                </kbd>{" "}
                and retrieve ideas even when you forget the keywords.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["memory", "systems", "design", "sync"].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setQuery(chip)}
                    className="cursor-pointer rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                  >
                    Try &ldquo;{chip}&rdquo;
                  </button>
                ))}
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="cursor-pointer rounded-full px-3 py-1 font-mono text-xs text-slate-500 hover:text-slate-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0D111E] shadow-2xl shadow-cyan-950/30">
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
                  <Search className="h-4 w-4 text-cyan-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search your second brain semantically..."
                    className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                  />
                  <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                    LOCAL AI
                  </span>
                </div>

                <div className="divide-y divide-white/6">
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <div
                        key={item.path}
                        className="flex items-start justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-white/4"
                      >
                        <div>
                          <div className="text-sm font-medium text-white">
                            {item.title}
                          </div>
                          <div className="mt-0.5 text-xs text-slate-400">
                            {item.excerpt}
                          </div>
                          <div className="mt-1 font-mono text-[10px] text-slate-500">
                            {item.path}
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-cyan-400/12 px-2 py-0.5 font-mono text-[11px] text-cyan-300">
                          {item.score}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center font-mono text-xs text-slate-500">
                      No matching notes for &ldquo;{query}&rdquo; — press Enter to create a new node.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Architecture Grid */}
      <section id="capabilities" className="border-t border-white/8 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-xs tracking-widest text-indigo-400 uppercase">
              Core Architecture
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Engineered like a developer tool. Felt like an extension of mind.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Cpu,
                title: "Native Rust & WebGL Core",
                desc: "Cold start in 120ms. Navigate 250,000 linked nodes at a locked 60fps without spinning up a browser tab.",
                accent: "text-cyan-400",
                span: "md:col-span-2",
              },
              {
                icon: Lock,
                title: "Zero-Knowledge Vault",
                desc: "Every block is encrypted on your device before syncing. Not even our engineers can read a single thought.",
                accent: "text-indigo-400",
                span: "",
              },
              {
                icon: GitBranch,
                title: "Git-Friendly Markdown",
                desc: "Standard `.md` files with YAML frontmatter and lossless Wikilinks. Version control your knowledge effortlessly.",
                accent: "text-emerald-400",
                span: "",
              },
              {
                icon: Zap,
                title: "Spatial Infinite Canvas",
                desc: "Break out of linear pages. Pin notes, PDFs, diagrams, and live web embeds side-by-side on an endless dark board.",
                accent: "text-purple-400",
                span: "md:col-span-2",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`group rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.045] to-transparent p-7 transition-colors hover:border-cyan-400/30 ${card.span}`}
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <card.icon className={`h-5 w-5 ${card.accent}`} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Pricing */}
      <section id="pricing" className="border-t border-white/8 py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
              Simple Plans
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Own your mind. Pay only for encrypted sync.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#0D101B] p-8">
              <div className="font-mono text-xs text-slate-400 uppercase">
                Local Core
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-xs text-slate-400">forever</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                Full graph engine, infinite canvas, and local semantic search on
                unlimited notes.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {[
                  "Unlimited local vaults & graph views",
                  "On-device semantic ⌘K embeddings",
                  "Plugin API & custom keyboard chords",
                  "macOS, Windows & Linux native binaries",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-cyan-400" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-8 w-full cursor-pointer rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Download Free Binary
              </button>
            </div>

            <div className="relative rounded-2xl border border-cyan-400/40 bg-gradient-to-b from-indigo-950/40 to-[#0D101B] p-8 shadow-[0_0_50px_-15px_rgba(34,211,238,0.25)]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-300 uppercase">
                  Cosmos Sync Pro
                </span>
                <span className="rounded-full bg-cyan-400/15 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300">
                  RECOMMENDED
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">$10</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Sub-second encrypted sync across desktop & mobile, version
                snapshots, and published knowledge graphs.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                {[
                  "Everything in Local Core",
                  "End-to-end encrypted multi-device sync",
                  "1-year point-in-time vault history",
                  "Publish interactive graphs to the web",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-cyan-300" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-8 w-full cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-3 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-95"
              >
                Start 14-Day Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 bg-[#05060A] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 font-mono text-xs text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2 text-slate-300">
            <Network className="h-4 w-4 text-cyan-400" />
            <span>ENGRAM // NEURAL COSMOS</span>
          </div>
          <div className="flex gap-6">
            <a href="#constellation" className="hover:text-cyan-300">
              DOCS
            </a>
            <a href="#recall" className="hover:text-cyan-300">
              SECURITY AUDIT
            </a>
            <a href="#pricing" className="hover:text-cyan-300">
              GITHUB
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
