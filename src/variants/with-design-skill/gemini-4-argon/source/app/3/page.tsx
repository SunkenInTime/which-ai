"use client";

import { useState } from "react";
import Link from "next/link";

type ClusterCategory = "all" | "memory" | "civic" | "signals";

interface StarNode {
  id: string;
  title: string;
  shortLabel: string;
  category: Exclude<ClusterCategory, "all">;
  x: number;
  y: number;
  date: string;
  excerpt: string;
  body: string;
  connections: string[];
}

const CONSTELLATION_NODES: StarNode[] = [
  {
    id: "engram",
    title: "Synaptic consolidation requires sleep-spindle replay",
    shortLabel: "Sleep-spindle replay",
    category: "memory",
    x: 165,
    y: 120,
    date: "14 Oct 2025",
    excerpt:
      "Hippocampal traces are compressed and replayed at twenty-fold speed during slow-wave sleep to weave new experiences into neocortical schemas.",
    body: "Without offline replay, newly acquired associations overwrite older weights. Marrow mirrors this cycle by surfacing your unlinked weekly notes each Sunday for quiet synthesis.",
    connections: ["forgetting", "harmonics", "palimpsest"],
  },
  {
    id: "forgetting",
    title: "Selective forgetting sharpens generalization in biological memory",
    shortLabel: "Selective forgetting",
    category: "memory",
    x: 310,
    y: 88,
    date: "02 Nov 2025",
    excerpt:
      "Pruning incidental detail allows cortical networks to extract invariant structure rather than memorizing noisy episodes verbatim.",
    body: "An archive that treats every grocery list and half-read clipping with equal visual weight drowns signal in noise. Notes gain prominence in Marrow only as you cite and refine them.",
    connections: ["engram", "compression", "tidal"],
  },
  {
    id: "palimpsest",
    title: "Cities as stone palimpsests of reused foundations",
    shortLabel: "Urban palimpsests",
    category: "civic",
    x: 140,
    y: 270,
    date: "19 Nov 2025",
    excerpt:
      "Roman amphitheater rings in Lucca and Arles persisted as medieval housing blocks because foundations outlast the institutions that built them.",
    body: "Long-lived knowledge systems behave like adaptive reuse in architecture: early empirical notes become the load-bearing masonry for entirely new essays years later.",
    connections: ["engram", "desire-paths", "commons"],
  },
  {
    id: "desire-paths",
    title: "Desire paths reveal pedestrian intent better than master plans",
    shortLabel: "Desire paths",
    category: "civic",
    x: 335,
    y: 245,
    date: "08 Dec 2025",
    excerpt:
      "Trampled tracks across snowy campus lawns map the true least-energy routes between lecture halls before any paving stone is laid.",
    body: "Instead of forcing you to design a rigid taxonomy upfront, Marrow observes which notes you open together and paves those recurring trails into permanent index pages.",
    connections: ["palimpsest", "commons", "compression"],
  },
  {
    id: "commons",
    title: "Irrigation tribunals in Valencia governed water without central bureaucracy",
    shortLabel: "Water tribunals",
    category: "civic",
    x: 245,
    y: 365,
    date: "21 Dec 2025",
    excerpt:
      "Eight centuries of oral rulings at the Cathedral door balanced drought scarcity through transparent local feedback rules.",
    body: "Shared research libraries succeed when annotations carry clear attribution and local context rather than top-down permission hierarchies.",
    connections: ["palimpsest", "desire-paths", "tidal"],
  },
  {
    id: "compression",
    title: "Minimum description length as a measure of scientific insight",
    shortLabel: "Description length",
    category: "signals",
    x: 495,
    y: 155,
    date: "11 Jan 2026",
    excerpt:
      "To understand a phenomenon is to find a shorter program that generates the observed data alongside its exceptions.",
    body: "Writing a permanent summary note forces you to compress ten pages of highlights into three crisp sentences in your own voice.",
    connections: ["forgetting", "desire-paths", "harmonics"],
  },
  {
    id: "harmonics",
    title: "Overtones in bronze bells align through profile turning",
    shortLabel: "Bell harmonics",
    category: "signals",
    x: 560,
    y: 295,
    date: "29 Jan 2026",
    excerpt:
      "Founders tune five distinct partial frequencies inside a single cast bronze profile so that chords ring in consonance.",
    body: "When two notes from different years share underlying structural patterns, Marrow’s semantic resonance view brings them into the same chord.",
    connections: ["engram", "compression", "tidal"],
  },
  {
    id: "tidal",
    title: "Estuarine salt marshes buffer storm energy through fractal branching",
    shortLabel: "Fractal estuaries",
    category: "signals",
    x: 445,
    y: 375,
    date: "14 Feb 2026",
    excerpt:
      "Four orders of branching tidal creeks dissipate wave momentum across vast vegetative surface area.",
    body: "Associative graphs absorb sudden bursts of research reading without collapsing, distributing new clippings to the exact tributary where they belong.",
    connections: ["forgetting", "commons", "harmonics"],
  },
];

const SYNTHESIS_BRIDGES: Record<string, string> = {
  "engram-palimpsest":
    "Both biological sleep replay and medieval towns reuse existing structural foundations to house new inhabitants without starting from bare ground.",
  "forgetting-compression":
    "Selective forgetting in neural circuits is the biological implementation of Minimum Description Length: discarding noise so invariant laws remain compact.",
  "desire-paths-commons":
    "Both pedestrian footpaths and customary water courts emerge from repeated daily practice rather than top-down legislative blueprints.",
  "harmonics-tidal":
    "Wave energy in bronze acoustics and estuarine hydrodynamics is governed by boundary geometry across multiple scales.",
};

export default function ObservatoryIterationPage() {
  const [selectedId, setSelectedId] = useState<string>("desire-paths");
  const [compareId, setCompareId] = useState<string | null>("forgetting");
  const [filter, setFilter] = useState<ClusterCategory>("all");

  const selectedNode =
    CONSTELLATION_NODES.find((n) => n.id === selectedId) ??
    CONSTELLATION_NODES[0];
  const compareNode = compareId
    ? CONSTELLATION_NODES.find((n) => n.id === compareId) ?? null
    : null;

  const getBridgeInsight = (a: StarNode, b: StarNode) => {
    const key1 = `${a.id}-${b.id}`;
    const key2 = `${b.id}-${a.id}`;
    if (SYNTHESIS_BRIDGES[key1]) return SYNTHESIS_BRIDGES[key1];
    if (SYNTHESIS_BRIDGES[key2]) return SYNTHESIS_BRIDGES[key2];
    return `Connecting "${a.shortLabel}" with "${b.shortLabel}" links ${a.category} patterns directly with ${b.category} observations, revealing how feedback loops preserve structure across time.`;
  };

  return (
    <div className="min-h-screen bg-[#0F1A2C] text-[#ECF1F8] font-space selection:bg-[#E8B954]/30 selection:text-[#ECF1F8]">
      {/* Top Blueprint Navigation */}
      <header className="border-b border-[#283C5C] bg-[#0F1A2C]/90 backdrop-blur-xs sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/with-design-skill/gemini-4-argon/3"
              className="flex items-center gap-2.5 text-xl font-medium tracking-tight text-[#ECF1F8]"
            >
              <span className="h-3 w-3 rounded-full bg-[#E8B954] ring-4 ring-[#E8B954]/20" />
              <span>Marrow</span>
            </Link>
            <span className="hidden md:inline text-sm text-[#8FA6C9]">
              Spatial observatory for associative memory
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-[#8FA6C9]">
            <a
              href="#constellation"
              className="hover:text-[#ECF1F8] transition-colors"
            >
              Constellation canvas
            </a>
            <a
              href="#resonance"
              className="hover:text-[#ECF1F8] transition-colors hidden sm:inline"
            >
              Semantic gravity
            </a>
            <a
              href="#download-observatory"
              className="rounded-lg bg-[#E8B954] px-4 py-2 text-xs font-semibold text-[#0F1A2C] hover:bg-[#f2ca6d] transition-colors"
            >
              Launch the canvas
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-10 pb-28">
        {/* Hero Headline + Domain Cluster Filter */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight leading-[1.12] text-[#ECF1F8]">
              See the hidden geometry connecting five years of reading.
            </h1>
            <p className="mt-4 font-literata text-base sm:text-lg leading-[1.65] text-[#8FA6C9] max-w-[62ch]">
              Ideas rarely respect the folder names you invented three years
              ago. Marrow plots your notes on a cyanotype light table where
              related observations pull toward one another by shared concepts and
              explicit links.
            </p>
          </div>

          {/* Cluster Filter Controls */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[#8FA6C9]">
              Highlight constellation cluster:
            </span>
            <div className="flex flex-wrap gap-1.5 rounded-xl border border-[#283C5C] bg-[#172640] p-1.5">
              {(
                [
                  { id: "all", label: "All 8 notes" },
                  { id: "memory", label: "Biological memory" },
                  { id: "civic", label: "Civic architecture" },
                  { id: "signals", label: "Wave & information" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    filter === tab.id
                      ? "bg-[#E8B954] text-[#0F1A2C]"
                      : "text-[#8FA6C9] hover:text-[#ECF1F8]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Hero: Prussian Blueprint Constellation + Live Note Inspector */}
        <section
          id="constellation"
          aria-label="Interactive semantic constellation map"
          className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-[#283C5C] bg-[#172640] overflow-hidden shadow-xl"
        >
          {/* Left 7 Cols: Interactive SVG Star Map */}
          <div className="lg:col-span-7 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#283C5C] bg-[#111E34] p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#8FA6C9] mb-2">
              <span>
                Click any star node to inspect its note; Shift-click or use the
                bridge button to synthesize two notes
              </span>
              <span className="text-[#E8B954]">
                Active: {selectedNode.shortLabel}
              </span>
            </div>

            <div className="relative w-full aspect-[16/11] min-h-[340px]">
              <svg
                viewBox="0 0 680 450"
                className="w-full h-full select-none"
                role="img"
                aria-label="Constellation of interconnected research notes"
              >
                {/* Subtle Cyanotype Coordinate Grid & Orbital Rings */}
                <defs>
                  <pattern
                    id="cyanotype-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#1E3354"
                      strokeWidth="0.75"
                    />
                  </pattern>
                </defs>
                <rect width="680" height="450" fill="url(#cyanotype-grid)" />
                <circle
                  cx="340"
                  cy="225"
                  r="185"
                  fill="none"
                  stroke="#243B61"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <circle
                  cx="340"
                  cy="225"
                  r="105"
                  fill="none"
                  stroke="#243B61"
                  strokeWidth="1"
                  strokeDasharray="2 5"
                />

                {/* Associative Edges */}
                {CONSTELLATION_NODES.map((node) =>
                  node.connections.map((targetId) => {
                    if (node.id > targetId) return null;
                    const target = CONSTELLATION_NODES.find(
                      (n) => n.id === targetId
                    );
                    if (!target) return null;
                    const isPrimaryEdge =
                      node.id === selectedId || target.id === selectedId;
                    const isBridgeEdge =
                      (node.id === selectedId && target.id === compareId) ||
                      (node.id === compareId && target.id === selectedId);

                    return (
                      <line
                        key={`${node.id}-${target.id}`}
                        x1={node.x}
                        y1={node.y}
                        x2={target.x}
                        y2={target.y}
                        stroke={
                          isBridgeEdge
                            ? "#E8B954"
                            : isPrimaryEdge
                            ? "#8FA6C9"
                            : "#29426B"
                        }
                        strokeWidth={
                          isBridgeEdge ? "2.4" : isPrimaryEdge ? "1.6" : "1"
                        }
                        strokeDasharray={isPrimaryEdge ? undefined : "3 3"}
                      />
                    );
                  })
                )}

                {/* Custom Synthesis Line between Selected and Compare Node if not directly linked */}
                {compareNode && compareNode.id !== selectedNode.id && (
                  <line
                    x1={selectedNode.x}
                    y1={selectedNode.y}
                    x2={compareNode.x}
                    y2={compareNode.y}
                    stroke="#E8B954"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                )}

                {/* Star Nodes */}
                {CONSTELLATION_NODES.map((node) => {
                  const isSelected = node.id === selectedId;
                  const isCompared = node.id === compareId;
                  const isConnected =
                    selectedNode.connections.includes(node.id);
                  const matchesFilter =
                    filter === "all" || node.category === filter;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={(e) => {
                        if (e.shiftKey && node.id !== selectedId) {
                          setCompareId(node.id);
                        } else {
                          setSelectedId(node.id);
                        }
                      }}
                      className="cursor-pointer"
                      style={{ opacity: matchesFilter ? 1 : 0.32 }}
                    >
                      {/* Outer halo for selected or compared */}
                      {(isSelected || isCompared) && (
                        <circle
                          r={isSelected ? 22 : 17}
                          fill={isSelected ? "#E8B954" : "#8FA6C9"}
                          fillOpacity="0.16"
                          stroke={isSelected ? "#E8B954" : "#8FA6C9"}
                          strokeWidth="1.2"
                        />
                      )}

                      {/* Core Star Point */}
                      <circle
                        r={isSelected ? 8 : isConnected ? 6.5 : 5}
                        fill={
                          isSelected
                            ? "#E8B954"
                            : isCompared
                            ? "#ECF1F8"
                            : isConnected
                            ? "#8FA6C9"
                            : "#4A6896"
                        }
                        stroke="#0F1A2C"
                        strokeWidth="2"
                      />

                      {/* Label Pill */}
                      <g transform="translate(0, 22)">
                        <rect
                          x="-66"
                          y="-10"
                          width="132"
                          height="22"
                          rx="6"
                          fill={isSelected ? "#E8B954" : "#0F1A2C"}
                          fillOpacity={isSelected ? "1" : "0.88"}
                          stroke={
                            isSelected
                              ? "#E8B954"
                              : isConnected
                              ? "#8FA6C9"
                              : "#283C5C"
                          }
                          strokeWidth="1"
                        />
                        <text
                          textAnchor="middle"
                          y="4"
                          fontSize="11"
                          fontWeight={isSelected ? "600" : "400"}
                          fill={isSelected ? "#0F1A2C" : "#ECF1F8"}
                        >
                          {node.shortLabel}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Bottom Legend & Bridge Control */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#283C5C] pt-3 text-xs text-[#8FA6C9]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E8B954]" />
                  <span>Primary focus</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ECF1F8]" />
                  <span>Bridge target</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8FA6C9]" />
                  <span>First-degree link</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>Bridge with:</span>
                <select
                  aria-label="Select a second note to bridge with the active note"
                  value={compareId ?? ""}
                  onChange={(e) => setCompareId(e.target.value || null)}
                  className="rounded border border-[#283C5C] bg-[#0F1A2C] px-2.5 py-1 text-xs text-[#ECF1F8] focus:border-[#E8B954] focus:outline-hidden"
                >
                  <option value="">None</option>
                  {CONSTELLATION_NODES.filter((n) => n.id !== selectedId).map(
                    (n) => (
                      <option key={n.id} value={n.id}>
                        {n.shortLabel}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Live Note Inspector & Synthesis Bridge */}
          <aside className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#172640]">
            <div>
              <div className="flex items-center justify-between border-b border-[#283C5C] pb-3 text-xs text-[#8FA6C9]">
                <span className="text-[#E8B954] font-medium">
                  Selected Observatory Note
                </span>
                <span>Recorded {selectedNode.date}</span>
              </div>

              <h2 className="mt-4 text-2xl font-medium leading-snug text-[#ECF1F8]">
                {selectedNode.title}
              </h2>

              <blockquote className="mt-4 border-l-2 border-[#E8B954] pl-4 font-literata text-sm italic leading-[1.65] text-[#ECF1F8]/90">
                “{selectedNode.excerpt}”
              </blockquote>

              <p className="mt-4 font-literata text-sm sm:text-base leading-[1.7] text-[#8FA6C9]">
                {selectedNode.body}
              </p>

              {/* First-degree connected notes */}
              <div className="mt-6 border-t border-[#283C5C] pt-4">
                <div className="text-xs text-[#8FA6C9] mb-2.5">
                  Direct filaments from this note (click to traverse):
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.connections.map((connId) => {
                    const target = CONSTELLATION_NODES.find(
                      (n) => n.id === connId
                    );
                    if (!target) return null;
                    return (
                      <button
                        key={connId}
                        type="button"
                        onClick={() => setSelectedId(connId)}
                        className="rounded-lg border border-[#283C5C] bg-[#0F1A2C] px-3 py-1.5 text-xs text-[#ECF1F8] hover:border-[#E8B954] hover:text-[#E8B954] transition-colors"
                      >
                        {target.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Synthesis Bridge Box */}
            {compareNode && compareNode.id !== selectedNode.id && (
              <div className="mt-6 rounded-xl border border-[#E8B954]/40 bg-[#0F1A2C] p-4">
                <div className="flex items-center justify-between text-xs text-[#E8B954] mb-1.5">
                  <span className="font-medium">
                    Bridge: {selectedNode.shortLabel} + {compareNode.shortLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedId(compareNode.id)}
                    className="underline hover:text-[#ECF1F8]"
                  >
                    Focus target
                  </button>
                </div>
                <p className="font-literata text-xs sm:text-sm leading-[1.6] text-[#ECF1F8]/90">
                  {getBridgeInsight(selectedNode, compareNode)}
                </p>
              </div>
            )}
          </aside>
        </section>

        {/* Editorial Section: How Spatial Gravity Works Without Folders */}
        <section id="resonance" className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl border border-[#283C5C] bg-[#172640] p-7">
            <h2 className="text-xl font-medium text-[#ECF1F8]">
              Proximity reflects shared vocabulary
            </h2>
            <p className="mt-3 font-literata text-sm leading-[1.7] text-[#8FA6C9]">
              Even before you add a manual link, Marrow computes local term
              overlap on your device. Notes about room reverberation and bronze
              bell partials drift into neighboring orbits automatically.
            </p>
          </div>

          <div className="rounded-xl border border-[#283C5C] bg-[#172640] p-7">
            <h2 className="text-xl font-medium text-[#ECF1F8]">
              Structural holes become visible at a glance
            </h2>
            <p className="mt-3 font-literata text-sm leading-[1.7] text-[#8FA6C9]">
              When two dense clusters of research sit close together with only a
              single bridge between them, the constellation reveals exactly where
              your next essay or experiment lies waiting.
            </p>
          </div>

          <div className="rounded-xl border border-[#283C5C] bg-[#172640] p-7">
            <h2 className="text-xl font-medium text-[#ECF1F8]">
              Pin any spatial arrangement as a working map
            </h2>
            <p className="mt-3 font-literata text-sm leading-[1.7] text-[#8FA6C9]">
              Freeze a constellation view for a specific book chapter or design
              sprint. Drag nodes into custom positions and annotate the empty
              space between them like an architect’s blueprint.
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          id="download-observatory"
          className="mt-24 rounded-2xl border border-[#283C5C] bg-[#172640] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-medium text-[#ECF1F8]">
              Map your existing notes in thirty seconds
            </h2>
            <p className="mt-3 font-literata text-base text-[#8FA6C9] leading-[1.65]">
              Import any folder of Markdown notes, Roam JSON, or Obsidian vaults.
              All embeddings and graph calculations run 100% locally on Apple
              Silicon and modern x86 processors.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#constellation"
              className="rounded-lg bg-[#E8B954] px-5 py-3 text-sm font-semibold text-[#0F1A2C] hover:bg-[#f2ca6d] transition-colors"
            >
              Download Observatory Edition
            </a>
            <button
              type="button"
              onClick={() => {
                setSelectedId("harmonics");
                setCompareId("engram");
                window.scrollTo({ top: 180, behavior: "smooth" });
              }}
              className="rounded-lg border border-[#8FA6C9]/40 bg-[#0F1A2C] px-5 py-3 text-sm font-medium text-[#ECF1F8] hover:border-[#E8B954] transition-colors"
            >
              Inspect another synthesis bridge
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
