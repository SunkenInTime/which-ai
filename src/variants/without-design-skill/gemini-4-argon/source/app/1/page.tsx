/* eslint-disable react/jsx-no-comment-textnodes -- The generated interface intentionally displays slash-prefixed labels. */
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface GraphNode {
  id: string;
  title: string;
  category: "neuroscience" | "methodology" | "architecture" | "synthesis";
  x: number;
  y: number;
  updatedAt: string;
  connections: string[];
  similarity: number;
  excerpt: string;
  body: string[];
  backlinks: { from: string; context: string; timestamp: string }[];
  synthesisWith: {
    partnerId: string;
    insightTitle: string;
    insightText: string;
  };
}

const INITIAL_NODES: GraphNode[] = [
  {
    id: "hebbian-plasticity",
    title: "Hebbian Plasticity",
    category: "neuroscience",
    x: 250,
    y: 165,
    updatedAt: "2m ago",
    connections: ["zettelkasten-method", "spaced-evergreen", "emergent-synthesis"],
    similarity: 0.96,
    excerpt: "Neurons that fire together wire together. Every traversed link strengthens conceptual recall.",
    body: [
      "Donald Hebb (1949) proposed that synaptic efficiency increases when presynaptic and postsynaptic neurons fire simultaneously.",
      "In a digital second brain, traversing [[Zettelkasten Method]] links acts as artificial myelin—weighting pathways you actively revisit during creative work.",
      "When paired with [[Spaced Evergreen]] prompts, dormant insights re-enter working memory right as creative synthesis peaks, feeding [[Emergent Synthesis]].",
    ],
    backlinks: [
      {
        from: "Zettelkasten Method",
        context: "...mirrors biological [[Hebbian Plasticity]] by favoring associative trails over rigid top-down folders...",
        timestamp: "Oct 11 · 09:14",
      },
      {
        from: "Spaced Evergreen",
        context: "...reinforces synaptic weight via [[Hebbian Plasticity]] without rote flashcard fatigue...",
        timestamp: "Oct 08 · 22:41",
      },
    ],
    synthesisWith: {
      partnerId: "zettelkasten-method",
      insightTitle: "Bio-Mimetic Indexing",
      insightText:
        "Folders force premature categorization (pre-frontal friction). Associative links mimic biological LTP (Long-Term Potentiation), letting structure emerge from usage frequency.",
    },
  },
  {
    id: "zettelkasten-method",
    title: "Zettelkasten Method",
    category: "methodology",
    x: 460,
    y: 120,
    updatedAt: "14m ago",
    connections: ["hebbian-plasticity", "collectors-fallacy", "emergent-synthesis", "vector-recall"],
    similarity: 0.94,
    excerpt: "Niklas Luhmann's 90,000-slip dialogue partner built on atomic notes and Folgezettel links.",
    body: [
      "A slip-box is not an archive for dead clippings; it is a communication partner that surprises you with combinatorial leaps.",
      "To avoid the [[Collector's Fallacy]], every note must be rewritten in your own voice as an atomic unit linked to [[Hebbian Plasticity]] and [[Vector Recall]].",
      "Once a cluster reaches critical mass, [[Emergent Synthesis]] assembles outlines virtually effortlessly.",
    ],
    backlinks: [
      {
        from: "Collector's Fallacy",
        context: "...Luhmann's [[Zettelkasten Method]] demands translation into your own words before filing...",
        timestamp: "Oct 12 · 16:05",
      },
      {
        from: "Emergent Synthesis",
        context: "...bottom-up clusters in the [[Zettelkasten Method]] eliminate the blank-page problem...",
        timestamp: "Oct 09 · 11:30",
      },
    ],
    synthesisWith: {
      partnerId: "vector-recall",
      insightTitle: "Hybrid Symbolic + Neural Graph",
      insightText:
        "Explicit [[wikilinks]] capture deliberate human intent, while dense vector embeddings uncover latent bridges you forgot to link manually.",
    },
  },
  {
    id: "emergent-synthesis",
    title: "Emergent Synthesis",
    category: "synthesis",
    x: 360,
    y: 265,
    updatedAt: "Just now",
    connections: [
      "hebbian-plasticity",
      "zettelkasten-method",
      "vector-recall",
      "spaced-evergreen",
      "local-first-crdt",
    ],
    similarity: 0.99,
    excerpt: "When atomic notes cross a connectivity threshold, essays and architectures self-assemble.",
    body: [
      "Creative breakthroughs rarely start from a blank cursor. They crystallize at the intersection of 4–6 previously unrelated notes.",
      "By combining manual [[Zettelkasten Method]] trails with automatic [[Vector Recall]], Noema detects high-density conceptual bridges.",
      "Your graph remains 100% private and instant via [[Local-First CRDT]] storage while reinforcing [[Hebbian Plasticity]].",
    ],
    backlinks: [
      {
        from: "Vector Recall",
        context: "...surfaces forgotten semantic neighbors to accelerate [[Emergent Synthesis]] during drafting...",
        timestamp: "Today · 08:20",
      },
      {
        from: "Hebbian Plasticity",
        context: "...repeatedly co-activated concepts culminate in [[Emergent Synthesis]]...",
        timestamp: "Oct 10 · 19:12",
      },
    ],
    synthesisWith: {
      partnerId: "spaced-evergreen",
      insightTitle: "Compound Knowledge Interest",
      insightText:
        "Notes that evolve over 5 years yield nonlinear returns: each new note doesn't add +1 value, it multiplies against every existing node.",
    },
  },
  {
    id: "vector-recall",
    title: "Vector Recall",
    category: "architecture",
    x: 565,
    y: 250,
    updatedAt: "1h ago",
    connections: ["zettelkasten-method", "emergent-synthesis", "local-first-crdt"],
    similarity: 0.91,
    excerpt: "On-device 1,536-dimensional embeddings find notes by meaning, even when zero keywords match.",
    body: [
      "Keyword search fails when your vocabulary evolves over years. You searched 'burnout', but three years ago you wrote about 'cognitive entropy'.",
      "Noema computes local embeddings via [[Local-First CRDT]] SQLite indexes, pairing seamlessly with [[Zettelkasten Method]] graphs.",
      "This feeds [[Emergent Synthesis]] by surfacing oblique connections in real time as you type.",
    ],
    backlinks: [
      {
        from: "Local-First CRDT",
        context: "...WebAssembly HNSW index powers sub-3ms [[Vector Recall]] completely offline...",
        timestamp: "Oct 07 · 14:50",
      },
    ],
    synthesisWith: {
      partnerId: "local-first-crdt",
      insightTitle: "Zero-Latency Private Intelligence",
      insightText:
        "Running embeddings on-device in WebAssembly means your most intimate journal entries never touch a third-party cloud API.",
    },
  },
  {
    id: "spaced-evergreen",
    title: "Spaced Evergreen",
    category: "neuroscience",
    x: 165,
    y: 315,
    updatedAt: "3h ago",
    connections: ["hebbian-plasticity", "emergent-synthesis", "collectors-fallacy"],
    similarity: 0.89,
    excerpt: "Algorithmic resurfacing along the Ebbinghaus forgetting curve turns fleeting notes into permanent wisdom.",
    body: [
      "Most note apps are write-only graveyards. You clip an article, feel a dopamine hit (see [[Collector's Fallacy]]), and never read it again.",
      "[[Spaced Evergreen]] schedules progressive refinement passes at 2 days, 7 days, 21 days, and 90 days.",
      "Each pass strengthens [[Hebbian Plasticity]] and matures seedlings into [[Emergent Synthesis]].",
    ],
    backlinks: [
      {
        from: "Hebbian Plasticity",
        context: "...spaced reactivation via [[Spaced Evergreen]] stabilizes long-term cortical traces...",
        timestamp: "Oct 05 · 20:15",
      },
    ],
    synthesisWith: {
      partnerId: "collectors-fallacy",
      insightTitle: "Antidote to Digital Hoarding",
      insightText:
        "Instead of dumping 500 unread bookmarks into a queue, resurfacing 3 high-signal notes every morning cultivates genuine mastery.",
    },
  },
  {
    id: "collectors-fallacy",
    title: "Collector's Fallacy",
    category: "methodology",
    x: 295,
    y: 390,
    updatedAt: "1d ago",
    connections: ["zettelkasten-method", "spaced-evergreen"],
    similarity: 0.85,
    excerpt: "Mistaking the accumulation of bookmarks and highlights for actual comprehension.",
    body: [
      "Coined by Christian Tietze: 'To know about a thing is not the same as knowing it.'",
      "Counteract the [[Collector's Fallacy]] by forcing every captured highlight through [[Spaced Evergreen]] distillation and linking it into your [[Zettelkasten Method]] web.",
    ],
    backlinks: [
      {
        from: "Zettelkasten Method",
        context: "...guards against the [[Collector's Fallacy]] by requiring active synthesis...",
        timestamp: "Oct 02 · 17:40",
      },
    ],
    synthesisWith: {
      partnerId: "zettelkasten-method",
      insightTitle: "Digestive vs. Accumulative Capture",
      insightText:
        "Noema's Ephemeral Inbox automatically expires unlinked clippings after 7 days unless you distill or connect them.",
    },
  },
  {
    id: "local-first-crdt",
    title: "Local-First CRDT",
    category: "architecture",
    x: 510,
    y: 380,
    updatedAt: "2d ago",
    connections: ["emergent-synthesis", "vector-recall"],
    similarity: 0.88,
    excerpt: "Conflict-free replicated data types + plain Markdown on disk. End-to-end encrypted.",
    body: [
      "Your second brain must outlive any startup. Every node in Noema is stored locally as plain UTF-8 Markdown alongside an embedded SQLite + HNSW index.",
      "State merges conflict-free across Mac, iOS, and Linux via [[Local-First CRDT]], powering instant [[Vector Recall]] and [[Emergent Synthesis]].",
    ],
    backlinks: [
      {
        from: "Vector Recall",
        context: "...indexed directly inside the [[Local-First CRDT]] storage engine...",
        timestamp: "Sep 29 · 12:08",
      },
    ],
    synthesisWith: {
      partnerId: "emergent-synthesis",
      insightTitle: "Sovereign Cognitive Infrastructure",
      insightText:
        "Zero spinners, zero cloud lock-in, sub-millisecond graph traversal—even at 35,000 feet on airplane mode.",
    },
  },
];

const CATEGORY_COLORS: Record<
  GraphNode["category"],
  { dot: string; ring: string; badge: string; text: string }
> = {
  neuroscience: {
    dot: "#38BDF8",
    ring: "rgba(56, 189, 248, 0.35)",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    text: "text-sky-400",
  },
  methodology: {
    dot: "#A78BFA",
    ring: "rgba(167, 139, 250, 0.35)",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    text: "text-violet-400",
  },
  architecture: {
    dot: "#34D399",
    ring: "rgba(52, 211, 153, 0.35)",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    text: "text-emerald-400",
  },
  synthesis: {
    dot: "#F59E0B",
    ring: "rgba(245, 158, 11, 0.4)",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    text: "text-amber-400",
  },
};

export default function IterationOnePage() {
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_NODES);
  const [selectedId, setSelectedId] = useState<string>("emergent-synthesis");
  const [showSynthesisCard, setShowSynthesisCard] = useState<boolean>(true);
  const [quickThought, setQuickThought] = useState<string>("");
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(86);
  const [comparisonMode, setComparisonMode] = useState<"folders" | "noema">("noema");
  const [cmdOpen, setCmdOpen] = useState<boolean>(false);
  const [cmdQuery, setCmdQuery] = useState<string>("");

  const activeNode = useMemo(
    () => nodes.find((n) => n.id === selectedId) || nodes[0],
    [nodes, selectedId]
  );

  const filteredCmdNodes = useMemo(() => {
    if (!cmdQuery.trim()) return nodes;
    const q = cmdQuery.toLowerCase();
    return nodes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
    );
  }, [nodes, cmdQuery]);

  const handleCaptureThought = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickThought.trim();
    if (!trimmed) return;
    const newId = `thought-${Date.now()}`;
    const newNode: GraphNode = {
      id: newId,
      title: trimmed.length > 26 ? trimmed.slice(0, 26) + "…" : trimmed,
      category: "synthesis",
      x: Math.floor(190 + Math.random() * 340),
      y: Math.floor(140 + Math.random() * 220),
      updatedAt: "Just captured",
      connections: [selectedId, "emergent-synthesis"],
      similarity: 0.97,
      excerpt: trimmed,
      body: [
        `Captured fleeting note: "${trimmed}"`,
        `Automatically linked by Noema Semantic Engine to [[${activeNode.title}]] and [[Emergent Synthesis]] (cosine similarity 0.97).`,
      ],
      backlinks: [
        {
          from: activeNode.title,
          context: `...auto-linked via neural embedding match on capture...`,
          timestamp: "Just now",
        },
      ],
      synthesisWith: {
        partnerId: selectedId,
        insightTitle: "Live Synaptic Integration",
        insightText: `Your newly captured thought "${trimmed}" has been woven directly into the ${activeNode.title} cluster.`,
      },
    };
    setNodes((prev) =>
      prev.map((n) =>
        n.id === selectedId
          ? { ...n, connections: [...n.connections, newId] }
          : n
      ).concat(newNode)
    );
    setSelectedId(newId);
    setQuickThought("");
  };

  // Parse [[Wikilinks]] inside body paragraphs so clicking them traverses the graph
  const renderRichParagraph = (text: string) => {
    const parts = text.split(/(\[\[.*?\]\])/g);
    return parts.map((part, idx) => {
      if (part.startsWith("[[") && part.endsWith("]]")) {
        const linkTitle = part.slice(2, -2);
        const target = nodes.find(
          (n) => n.title.toLowerCase() === linkTitle.toLowerCase()
        );
        return (
          <button
            key={idx}
            type="button"
            onClick={() => target && setSelectedId(target.id)}
            className="mx-0.5 inline-flex items-center gap-1 rounded-md border border-sky-400/30 bg-sky-400/10 px-1.5 py-0.5 font-jetbrains text-xs font-medium text-sky-300 hover:bg-sky-400/20 hover:border-sky-400/60 transition-all cursor-pointer"
          >
            <span className="text-sky-400/70">[[</span>
            <span>{linkTitle}</span>
            <span className="text-sky-400/70">]]</span>
          </button>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-[#06080E] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200 relative overflow-x-hidden">
      {/* Ambient Bioluminescent Background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 18%, rgba(56, 189, 248, 0.11) 0%, transparent 42%),
            radial-gradient(circle at 82% 26%, rgba(167, 139, 250, 0.10) 0%, transparent 45%),
            radial-gradient(circle at 50% 80%, rgba(245, 158, 11, 0.06) 0%, transparent 50%),
            radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 28px 28px",
        }}
      />

      {/* Command Palette Modal (⌘K) */}
      {cmdOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 pt-24 px-4 backdrop-blur-md"
          onClick={() => setCmdOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#0B0F1A] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <span className="font-jetbrains text-xs text-sky-400">⌘K</span>
              <input
                type="text"
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                placeholder="Jump to any node in your Second Brain..."
                autoFocus
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setCmdOpen(false)}
                className="rounded border border-white/10 px-2 py-0.5 font-jetbrains text-[10px] text-slate-400 hover:text-white"
              >
                ESC
              </button>
            </div>
            <div className="mt-3 max-h-64 overflow-y-auto space-y-1">
              {filteredCmdNodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setSelectedId(n.id);
                    setCmdOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-white/8 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[n.category].dot }}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">[[{n.title}]]</p>
                      <p className="text-xs text-slate-400 line-clamp-1">{n.excerpt}</p>
                    </div>
                  </div>
                  <span className="font-jetbrains text-[11px] text-sky-400">
                    cos {n.similarity.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation HUD */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#06080E]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-sky-400/40 bg-sky-500/10">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8]" />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-violet-400" />
              </div>
              <span className="font-space text-lg font-bold tracking-tight text-white">
                NOEMA
              </span>
            </div>
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-jetbrains text-[11px] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ITERATION 01 // NEURAL OBSERVATORY
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-slate-300">
            <a href="#interactive-graph" className="hover:text-white transition-colors">
              Synaptic Graph
            </a>
            <a href="#cognitive-laws" className="hover:text-white transition-colors">
              Cognitive Engine
            </a>
            <a href="#paradigm-shift" className="hover:text-white transition-colors">
              Why Not Folders
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">
              Local-First Spec
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 hover:border-sky-400/40 hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <span>Search Second Brain</span>
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-jetbrains text-[10px] text-sky-300">
                ⌘K
              </kbd>
            </button>
            <a
              href="#initialize"
              className="rounded-xl bg-sky-400 px-4 py-2 font-space text-xs font-semibold text-slate-950 shadow-[0_0_24px_rgba(56,189,248,0.35)] hover:bg-sky-300 transition-all"
            >
              Initialize Cortex →
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-14 pb-20 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3.5 py-1 font-jetbrains text-xs text-sky-300">
            <span>SYNAPTIC KNOWLEDGE OS v4.2</span>
            <span className="text-sky-400/50">•</span>
            <span>LOCAL WASM VECTOR ENGINE</span>
          </div>

          <h1 className="font-space text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-[64px] lg:leading-[1.06]">
            Your mind doesn’t think in folders.{" "}
            <span className="font-instrument italic font-normal text-sky-300">
              Neither should your notes.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Noema is a bioluminescent second brain that captures fleeting intuitions,
            maps bidirectional <code className="font-jetbrains text-sky-300">[[wikilinks]]</code>, and
            surfaces forgotten ideas across decades using on-device neural embeddings.
          </p>

          {/* Live Ephemeral Capture Bar right in the Hero */}
          <form
            onSubmit={handleCaptureThought}
            className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-white/15 bg-[#0C101C]/90 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)] focus-within:border-sky-400/60 transition-all"
          >
            <span className="pl-3 font-jetbrains text-xs text-sky-400">
              + [[
            </span>
            <input
              type="text"
              value={quickThought}
              onChange={(e) => setQuickThought(e.target.value)}
              placeholder="Plant a live thought into the graph below (e.g. 'Lucid Dreaming Protocol')..."
              className="w-full bg-transparent px-1 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            <span className="font-jetbrains text-xs text-sky-400">]]</span>
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-white/10 px-3.5 py-2 font-jetbrains text-xs font-semibold text-sky-300 hover:bg-sky-400 hover:text-slate-950 transition-all cursor-pointer"
            >
              Inject Node ↵
            </button>
          </form>
        </div>

        {/* INTERACTIVE HERO ARTIFACT: Live Knowledge Graph + Bidirectional Note Workbench */}
        <div
          id="interactive-graph"
          className="mt-12 rounded-3xl border border-white/12 bg-[#090D18]/90 shadow-[0_32px_90px_rgba(0,0,0,0.75)] backdrop-blur-2xl overflow-hidden"
        >
          {/* Workbench Window Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0D1322] px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-jetbrains text-xs text-slate-400">
                vault://noema-core/synaptic-graph.db — {nodes.length} Active Nodes
              </span>
            </div>
            <div className="flex items-center gap-4 font-jetbrains text-[11px]">
              <span className="text-slate-400">
                ACTIVE FOCUS:{" "}
                <strong className="text-sky-300">[[{activeNode.title}]]</strong>
              </span>
              <span className="hidden sm:inline text-emerald-400">
                ● 0.3ms HNSW Recall
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 7 Cols: Interactive SVG Constellation Canvas */}
            <div className="relative lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10 p-4 sm:p-6 flex flex-col justify-between bg-[#070A12]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-3 text-[11px] font-jetbrains">
                  {(
                    Object.keys(CATEGORY_COLORS) as Array<GraphNode["category"]>
                  ).map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1.5 capitalize text-slate-300"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[cat].dot }}
                      />
                      {cat}
                    </span>
                  ))}
                </div>
                <span className="font-jetbrains text-[11px] text-slate-400">
                  Click any node to traverse synapses
                </span>
              </div>

              {/* Interactive SVG Graph */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#05070C]">
                <svg
                  viewBox="0 0 720 470"
                  className="w-full h-[340px] sm:h-[410px] select-none"
                >
                  <defs>
                    <radialGradient id="activeHalo" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Subtle coordinate crosshairs */}
                  <line
                    x1="360"
                    y1="0"
                    x2="360"
                    y2="470"
                    stroke="rgba(255,255,255,0.03)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="0"
                    y1="235"
                    x2="720"
                    y2="235"
                    stroke="rgba(255,255,255,0.03)"
                    strokeDasharray="4 4"
                  />

                  {/* Synaptic Edges */}
                  {nodes.map((source) =>
                    source.connections.map((targetId) => {
                      const target = nodes.find((n) => n.id === targetId);
                      if (!target || source.id > target.id) return null;
                      const isConnectedToActive =
                        source.id === selectedId || target.id === selectedId;
                      return (
                        <g key={`${source.id}-${target.id}`}>
                          <line
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke={
                              isConnectedToActive
                                ? "#38BDF8"
                                : "rgba(148, 163, 184, 0.16)"
                            }
                            strokeWidth={isConnectedToActive ? 2.2 : 1}
                            strokeDasharray={isConnectedToActive ? undefined : "3 3"}
                          />
                          {isConnectedToActive && (
                            <circle
                              cx={(source.x + target.x) / 2}
                              cy={(source.y + target.y) / 2}
                              r="3.5"
                              fill="#38BDF8"
                            />
                          )}
                        </g>
                      );
                    })
                  )}

                  {/* Graph Nodes */}
                  {nodes.map((node) => {
                    const isSelected = node.id === selectedId;
                    const isNeighbor =
                      activeNode.connections.includes(node.id) ||
                      node.connections.includes(selectedId);
                    const colorSpec = CATEGORY_COLORS[node.category];

                    return (
                      <g
                        key={node.id}
                        onClick={() => setSelectedId(node.id)}
                        className="cursor-pointer transition-transform"
                      >
                        {isSelected && (
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="42"
                            fill="url(#activeHalo)"
                          />
                        )}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected ? 16 : isNeighbor ? 12 : 9}
                          fill={isSelected ? colorSpec.dot : "#0F172A"}
                          stroke={colorSpec.dot}
                          strokeWidth={isSelected ? 3.5 : isNeighbor ? 2.2 : 1.5}
                        />
                        <text
                          x={node.x}
                          y={node.y + (isSelected ? 30 : 24)}
                          textAnchor="middle"
                          fill={
                            isSelected
                              ? "#FFFFFF"
                              : isNeighbor
                              ? "#E2E8F0"
                              : "#94A3B8"
                          }
                          fontSize={isSelected ? "13" : "11"}
                          fontWeight={isSelected ? "700" : "500"}
                          fontFamily="monospace"
                        >
                          [[{node.title}]]
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Bottom Graph Telemetry Strip */}
                <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#080C15] px-4 py-2.5 font-jetbrains text-[11px] text-slate-400">
                  <span>
                    DEGREE CENTRALITY: {activeNode.connections.length} SYNAPSES
                  </span>
                  <span className="text-sky-300">
                    SEMANTIC MATCH: {(activeNode.similarity * 100).toFixed(0)}% COSINE
                  </span>
                </div>
              </div>

              {/* AI Synaptic Synthesis Bridge Card */}
              <div className="mt-4 rounded-2xl border border-amber-400/25 bg-amber-500/[0.06] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span className="font-jetbrains text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                      Emergent Bridge Detected // {activeNode.synthesisWith.insightTitle}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSynthesisCard((v) => !v)}
                    className="font-jetbrains text-[11px] text-amber-300/80 hover:text-amber-200 cursor-pointer"
                  >
                    {showSynthesisCard ? " Collapse" : "Expand"}
                  </button>
                </div>
                {showSynthesisCard && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-200">
                    {activeNode.synthesisWith.insightText}
                  </p>
                )}
              </div>
            </div>

            {/* Right 5 Cols: Live Bidirectional Note Editor & Backlinks */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-[#0B101D]">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 font-jetbrains text-[10px] uppercase ${
                      CATEGORY_COLORS[activeNode.category].badge
                    }`}
                  >
                    #{activeNode.category}
                  </span>
                  <span className="font-jetbrains text-xs text-slate-400">
                    Edited {activeNode.updatedAt}
                  </span>
                </div>

                <h2 className="mt-3 font-space text-2xl font-bold text-white">
                  {activeNode.title}
                </h2>
                <p className="mt-1 text-xs text-slate-400 italic font-instrument text-base">
                  “{activeNode.excerpt}”
                </p>

                {/* Note Body with clickable [[Wikilinks]] */}
                <div className="mt-5 space-y-3.5 border-t border-white/10 pt-4 text-sm leading-relaxed text-slate-200">
                  {activeNode.body.map((paragraph, i) => (
                    <p key={i}>{renderRichParagraph(paragraph)}</p>
                  ))}
                </div>
              </div>

              {/* Bidirectional Backlinks Inspector */}
              <div className="mt-8 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-jetbrains text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Bidirectional Backlinks ({activeNode.backlinks.length})
                  </span>
                  <span className="font-jetbrains text-[11px] text-sky-400">
                    Auto-indexed
                  </span>
                </div>
                <div className="space-y-2.5">
                  {activeNode.backlinks.map((bl, idx) => {
                    const sourceNode = nodes.find(
                      (n) => n.title.toLowerCase() === bl.from.toLowerCase()
                    );
                    return (
                      <div
                        key={idx}
                        onClick={() => sourceNode && setSelectedId(sourceNode.id)}
                        className="group rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 hover:border-sky-400/40 hover:bg-white/[0.05] transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-jetbrains text-xs font-semibold text-sky-300 group-hover:underline">
                            ← [[{bl.from}]]
                          </span>
                          <span className="font-jetbrains text-[10px] text-slate-500">
                            {bl.timestamp}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{bl.context}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THREE LAWS OF COGNITIVE CAPTURE (Interactive Bento) */}
      <section id="cognitive-laws" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-jetbrains text-xs uppercase tracking-[0.2em] text-sky-400">
              // COGNITIVE ARCHITECTURE
            </span>
            <h2 className="mt-2 font-space text-3xl font-bold text-white sm:text-4xl">
              Engineered for how biological memory{" "}
              <span className="font-instrument italic font-normal text-violet-300">
                actually consolidates.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400">
            Most tools force you to become a full-time librarian. Noema automates
            indexing, semantic backlinking, and spaced resurfacing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card 1: Semantic Radar with Interactive Slider */}
          <div className="rounded-3xl border border-white/10 bg-[#0B101C]/90 p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-sky-500/15 px-2.5 py-1 font-jetbrains text-xs text-sky-300">
                  01 // VECTOR BACKLINKS
                </span>
                <span className="font-jetbrains text-xs text-slate-400">
                  cos θ ≥ {(similarityThreshold / 100).toFixed(2)}
                </span>
              </div>
              <h3 className="mt-4 font-space text-xl font-bold text-white">
                Unlinked Mentions by Meaning
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Even if you never type a <code className="font-jetbrains text-sky-300">[[wikilink]]</code>,
                Noema’s local embedding engine computes cosine similarity across every paragraph you’ve ever written.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#070A12] p-4">
              <div className="flex items-center justify-between text-xs font-jetbrains mb-2">
                <span className="text-slate-400">Sensitivity Threshold</span>
                <span className="text-sky-400">{similarityThreshold}% Match</span>
              </div>
              <input
                type="range"
                min={70}
                max={96}
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <div className="mt-3 space-y-2">
                {[
                  { title: "Sleep Spindle Memory Consolidation", score: 95 },
                  { title: "Default Mode Network On Walks", score: 89 },
                  { title: "Borges' Library of Babel Essay", score: 78 },
                ]
                  .filter((item) => item.score >= similarityThreshold)
                  .map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-xs"
                    >
                      <span className="text-slate-200 truncate">{item.title}</span>
                      <span className="font-jetbrains text-emerald-400">
                        0.{item.score}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Card 2: Ebbinghaus Spaced Resurfacing */}
          <div className="rounded-3xl border border-white/10 bg-[#0B101C]/90 p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-violet-500/15 px-2.5 py-1 font-jetbrains text-xs text-violet-300">
                  02 // SPACED EVERGREEN
                </span>
                <span className="font-jetbrains text-xs text-violet-300">
                  Ebbinghaus Curve
                </span>
              </div>
              <h3 className="mt-4 font-space text-xl font-bold text-white">
                Resurfaces Right Before Decay
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Notes aren’t static files; they have a half-life. Noema gently resurfaces
                high-potential seedlings in your Daily Pulse right as biological recall dips.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-[#070A12] p-4">
              <svg viewBox="0 0 280 110" className="w-full h-28">
                <path
                  d="M 10 20 Q 45 85, 85 92 M 85 92 L 85 22 Q 130 75, 175 82 M 175 82 L 175 18 Q 225 45, 270 50"
                  fill="none"
                  stroke="#A78BFA"
                  strokeWidth="2.5"
                />
                <line
                  x1="0"
                  y1="95"
                  x2="280"
                  y2="95"
                  stroke="rgba(255,255,255,0.1)"
                />
                <circle cx="85" cy="22" r="4" fill="#38BDF8" />
                <circle cx="175" cy="18" r="4" fill="#38BDF8" />
                <text x="12" y="106" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                  Day 1
                </text>
                <text x="72" y="106" fill="#38BDF8" fontSize="9" fontFamily="monospace">
                  Day 7 (Pulse)
                </text>
                <text x="160" y="106" fill="#38BDF8" fontSize="9" fontFamily="monospace">
                  Day 30 (Evergreen)
                </text>
              </svg>
            </div>
          </div>

          {/* Card 3: Instant Multimodal Ingestion */}
          <div className="rounded-3xl border border-white/10 bg-[#0B101C]/90 p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 font-jetbrains text-xs text-emerald-300">
                  03 // ZERO-LATENCY CAPTURE
                </span>
                <span className="font-jetbrains text-xs text-emerald-400">
                  &lt; 12ms Global Hotkey
                </span>
              </div>
              <h3 className="mt-4 font-space text-xl font-bold text-white">
                Whisper-to-Graph & Kindle Sync
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Speak a 30-second voice memo on an evening run, highlight a PDF paper,
                or clip a thread. On-device Whisper transcribes and links it into your graph before you unlock your laptop.
              </p>
            </div>

            <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-[#070A12] p-4 font-jetbrains text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>🎙️ Voice Memo (00:42)</span>
                <span className="text-sky-400">→ 3 [[Nodes]] Linked</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>📚 Readwise / PDF Highlight</span>
                <span className="text-violet-400">→ Citation Indexed</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>⚡ Global ⌘+Shift+Space</span>
                <span className="text-emerald-400">→ 0.4ms Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOLDERS VS NETWORKED THOUGHT INTERACTIVE COMPARISON */}
      <section id="paradigm-shift" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-[#090D18] p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <span className="font-jetbrains text-xs uppercase tracking-widest text-amber-400">
                // PARADIGM SHIFT
              </span>
              <h2 className="mt-2 font-space text-3xl font-bold text-white">
                Why hierarchical folders kill serendipity
              </h2>
            </div>

            <div className="inline-flex rounded-xl border border-white/15 bg-black/40 p-1">
              <button
                type="button"
                onClick={() => setComparisonMode("folders")}
                className={`rounded-lg px-4 py-2 font-jetbrains text-xs font-medium transition-all cursor-pointer ${
                  comparisonMode === "folders"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Legacy Folder Silos
              </button>
              <button
                type="button"
                onClick={() => setComparisonMode("noema")}
                className={`rounded-lg px-4 py-2 font-jetbrains text-xs font-medium transition-all cursor-pointer ${
                  comparisonMode === "noema"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Noema Synaptic Graph
              </button>
            </div>
          </div>

          {comparisonMode === "folders" ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl border border-rose-500/25 bg-rose-950/10 p-6 font-jetbrains text-xs text-slate-300 space-y-2">
                <p className="text-rose-400 font-semibold mb-3">
                  ❌ WHERE DOES THIS NOTE BELONG? (DECISION FATIGUE)
                </p>
                <p>📁 /Work/Projects/2025/Q3/Archive/Notes_Final_v2.md</p>
                <p className="pl-4 text-slate-500">
                  └── Buried 5 levels deep. Zero visibility from your Psychology or
                  Architecture folders.
                </p>
                <p>📁 /Personal/Books/Neuroscience/Hebb_1949.md</p>
                <p className="pl-4 text-slate-500">
                  └── Siloed forever from your Product Design notes.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-space text-xl font-bold text-rose-300">
                  The Filing Cabinet Trap
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Folders force you to decide where an idea belongs <em>before</em> you
                  know what it will become. An insight about biological neural networks
                  can only live in one folder—starving your software architecture and
                  philosophy projects of cross-pollination.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl border border-sky-500/25 bg-sky-950/10 p-6 font-jetbrains text-xs text-slate-200 space-y-2.5">
                <p className="text-sky-400 font-semibold mb-3">
                  ✓ ONE ATOMIC NOTE, INFINITE CONTEXTS
                </p>
                <p>
                  <span className="text-sky-300">[[Hebbian Plasticity]]</span> ↔{" "}
                  <span className="text-violet-300">[[Onboarding UX Loops]]</span>
                </p>
                <p>
                  <span className="text-sky-300">[[Hebbian Plasticity]]</span> ↔{" "}
                  <span className="text-emerald-300">[[Graph Database Weights]]</span>
                </p>
                <p>
                  <span className="text-sky-300">[[Hebbian Plasticity]]</span> ↔{" "}
                  <span className="text-amber-300">[[Piano Muscle Memory]]</span>
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-space text-xl font-bold text-sky-300">
                  Associative Poly-Hierarchy
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  In Noema, a single atomic note participates simultaneously in your
                  neuroscience research, your product design system, and your personal
                  essays. Structure emerges organically from the bottom up.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: LOCAL-FIRST ARCHITECTURE & CTA */}
      <section id="architecture" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div
          id="initialize"
          className="rounded-3xl border border-sky-400/25 bg-gradient-to-br from-[#0B1325] via-[#090D18] to-[#120E24] p-8 sm:p-14 text-center"
        >
          <span className="font-jetbrains text-xs uppercase tracking-[0.25em] text-sky-400">
            100-YEAR MARKDOWN LONGEVITY • E2E ZERO-KNOWLEDGE SYNC
          </span>
          <h2 className="mt-4 font-space text-3xl font-bold text-white sm:text-5xl">
            Start building a mind that{" "}
            <span className="font-instrument italic font-normal text-sky-300">
              compounds for decades.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-300">
            Plain <code className="font-jetbrains text-sky-300">.md</code> files on your
            local disk. Sub-millisecond SQLite + WASM vector graph. End-to-end
            encrypted CRDT sync across macOS, Windows, Linux, and iOS.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-2xl bg-sky-400 px-7 py-3.5 font-space text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:bg-sky-300 transition-all cursor-pointer"
            >
              Download Noema for macOS & Linux
            </button>
            <Link
              href="/without-design-skill/gemini-4-argon/2"
              className="rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-3.5 font-jetbrains text-xs text-slate-200 hover:bg-white/10 transition-all"
            >
              Explore Iteration /2 (Scholar&apos;s Atelier) →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with direct links to all 5 iterations */}
      <footer className="relative z-10 border-t border-white/10 bg-[#05070B] py-10 px-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-jetbrains">
          <span>NOEMA COGNITIVE SYSTEMS // ITERATION 01 OF 05</span>
          <div className="flex items-center gap-3">
            <span>Jump to Iteration:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <Link
                key={n}
                href={`/without-design-skill/gemini-4-argon/${n}`}
                className={`rounded px-2 py-1 ${
                  n === 1
                    ? "bg-sky-400/20 text-sky-300 font-bold"
                    : "hover:text-white"
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
