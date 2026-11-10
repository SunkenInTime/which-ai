"use client";

import { useState } from "react";

type NodeId =
  | "canopy"
  | "courtyard"
  | "fountain"
  | "albedo"
  | "nightwind"
  | "thesis";

type ClusterFilter = "all" | "shade" | "water";

interface SpatialNode {
  id: NodeId;
  title: string;
  kind: string;
  date: string;
  cluster: "shade" | "water" | "both";
  x: number; // percentage 0..100 for SVG + absolute layout
  y: number; // percentage 0..100
  snippet: string;
  detail: string;
  connections: NodeId[];
}

const NODES: SpatialNode[] = [
  {
    id: "canopy",
    title: "Canvas street awnings in Seville",
    kind: "Field photo note",
    date: "Jul 2025",
    cluster: "shade",
    x: 17,
    y: 24,
    snippet: "Taut sailcloth rigged between third-floor balconies drops asphalt temp by 14°C.",
    detail:
      "Measured at 2:30 PM along Calle Sierpes: shaded pedestrian stone stays near morning air temperature because direct solar gain never reaches the thermal mass.",
    connections: ["albedo", "courtyard", "thesis"],
  },
  {
    id: "albedo",
    title: "Limewash roofs vs dark membrane",
    kind: "PDF excerpt, p. 41",
    date: "Sep 2025",
    cluster: "shade",
    x: 52,
    y: 18,
    snippet: "High-reflectance slaked lime reflects 78% of summer shortwave radiation.",
    detail:
      "Annual recoating was historically timed for late April across Mediterranean port towns, pairing seasonal maintenance with passive cooling.",
    connections: ["canopy", "nightwind"],
  },
  {
    id: "courtyard",
    title: "Narrow patio thermal stack",
    kind: "Sketchbook scan",
    date: "Oct 2025",
    cluster: "both",
    x: 22,
    y: 68,
    snippet: "Cool night air pools at stone floor level and holds until mid-afternoon.",
    detail:
      "Proportions matter more than floor area: when wall height exceeds courtyard width by 1.6x, midday sun only grazes the upper parapet.",
    connections: ["canopy", "fountain", "thesis"],
  },
  {
    id: "fountain",
    title: "Unglazed clay evaporation bowls",
    kind: "Museum note, Cordoba",
    date: "Nov 2025",
    cluster: "water",
    x: 56,
    y: 74,
    snippet: "Slow seepage through porous terracotta cools passing courtyard drafts.",
    detail:
      "Unlike high-spray jets that waste water to wind, shallow stone runnels maximize wetted surface area right where people sit.",
    connections: ["courtyard", "nightwind", "thesis"],
  },
  {
    id: "nightwind",
    title: "Night-flush transom vents",
    kind: "Interview transcript",
    date: "Jan 2026",
    cluster: "water",
    x: 83,
    y: 30,
    snippet: "Operable wooden louvers purge trapped daytime heat between 11 PM and dawn.",
    detail:
      "Coupled with stone interior partitions and courtyard water bowls, night flushing resets indoor comfort without compressor load.",
    connections: ["albedo", "fountain", "thesis"],
  },
  {
    id: "thesis",
    title: "Draft: Cooling cities before air conditioning",
    kind: "Working essay",
    date: "Edited today",
    cluster: "both",
    x: 81,
    y: 70,
    snippet: "Synthesizing fabric shade, thermal mass, and evaporative courtyards.",
    detail:
      "Pulls five field notes from three cities into a single municipal street-retrofit proposal, keeping every original measurement one click away.",
    connections: ["canopy", "courtyard", "fountain", "nightwind"],
  },
];

const EDGES: Array<[NodeId, NodeId, string]> = [
  ["canopy", "albedo", "Block solar gain"],
  ["canopy", "courtyard", "Shaded street section"],
  ["albedo", "nightwind", "Roof heat release"],
  ["courtyard", "fountain", "Microclimate core"],
  ["fountain", "nightwind", "Evaporative draft"],
  ["canopy", "thesis", "Section 1"],
  ["courtyard", "thesis", "Section 2"],
  ["fountain", "thesis", "Section 3"],
  ["nightwind", "thesis", "Conclusion"],
];

export default function IterationThreePage() {
  const [selectedId, setSelectedId] = useState<NodeId>("thesis");
  const [cluster, setCluster] = useState<ClusterFilter>("all");
  const [viewMode, setViewMode] = useState<"spatial" | "linear">("spatial");

  const selectedNode = NODES.find((n) => n.id === selectedId) ?? NODES[5];

  function isNodeInCluster(node: SpatialNode) {
    if (cluster === "all") return true;
    return node.cluster === cluster || node.cluster === "both";
  }

  return (
    <div
      className="blueprint-grid min-h-screen text-[#F4F7FB] selection:bg-[#F2C14E] selection:text-[#102644]"
      style={{ fontFamily: "var(--font-spline), system-ui, sans-serif" }}
    >
      {/* Top Blueprint Header */}
      <header className="border-b border-[#9FC0E6]/25 bg-[#153259]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <div className="flex items-center gap-3.5">
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded border border-[#F2C14E] bg-[#F2C14E]/15 text-sm font-bold text-[#F2C14E]"
              style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
            >
              C
            </span>
            <span
              className="text-xl font-semibold tracking-tight text-[#F4F7FB]"
              style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
            >
              Cairn
            </span>
            <span className="hidden border-l border-[#9FC0E6]/25 pl-3.5 text-sm text-[#A9C6EB] md:inline">
              Spatial note table and local vault
            </span>
          </div>

          <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
            <a
              href="#spatial-board"
              className="hidden text-[#C7DCF5] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2C14E] sm:inline"
            >
              Interactive table
            </a>
            <a
              href="#architecture"
              className="hidden text-[#C7DCF5] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2C14E] sm:inline"
            >
              Specifications
            </a>
            <a
              href="#get-cairn"
              className="rounded-md bg-[#F2C14E] px-4 py-2 font-semibold text-[#102644] transition-colors hover:bg-[#F7CF6D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E]"
            >
              Download Cairn
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Intro */}
        <section className="mx-auto max-w-6xl px-6 pt-12 pb-10 sm:px-10 lg:pt-16">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1
                className="max-w-[20ch] text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-[#F4F7FB] sm:text-5xl lg:text-[3.5rem]"
                style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
              >
                Spread scattered notes across one wide table until the pattern
                appears.
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="max-w-[44ch] text-base leading-relaxed text-[#C2D8F2]">
                Alphabetical folders bury good thinking out of sight. Cairn lets
                you pin clippings, photos, PDFs, and rough drafts onto a 2D
                drafting surface where connections stay visible.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#get-cairn"
                  className="rounded-md bg-[#F2C14E] px-5 py-2.5 text-sm font-semibold text-[#102644] transition-colors hover:bg-[#F7CF6D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E]"
                >
                  Download for macOS
                </a>
                <a
                  href="#architecture"
                  className="rounded-md border border-[#9FC0E6]/40 bg-[#1D3F6E]/60 px-4 py-2.5 text-sm font-medium text-[#F4F7FB] transition-colors hover:bg-[#1D3F6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E]"
                >
                  Read technical specs
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Spatial Drafting Board */}
        <section id="spatial-board" className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
          <div className="rounded-xl border border-[#9FC0E6]/35 bg-[#102644]/85 backdrop-blur-xs">
            {/* Board Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#9FC0E6]/25 px-5 py-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium text-[#A9C6EB]">
                  Filter cluster:
                </span>
                {(
                  [
                    ["all", "All 6 notes"],
                    ["shade", "Solar & shade"],
                    ["water", "Courtyards & airflow"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCluster(key)}
                    aria-pressed={cluster === key}
                    className={`rounded px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E] ${
                      cluster === key
                        ? "bg-[#F2C14E] text-[#102644]"
                        : "border border-[#9FC0E6]/25 bg-[#183761] text-[#D7E6F8] hover:border-[#9FC0E6]/50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Spatial vs Linear Comparison Toggle */}
              <div className="flex items-center gap-1.5 rounded-md border border-[#9FC0E6]/25 bg-[#153259] p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("spatial")}
                  aria-pressed={viewMode === "spatial"}
                  className={`rounded px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E] ${
                    viewMode === "spatial"
                      ? "bg-[#F4F7FB] text-[#102644]"
                      : "text-[#B8D1EE] hover:text-white"
                  }`}
                >
                  Spatial table
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("linear")}
                  aria-pressed={viewMode === "linear"}
                  className={`rounded px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E] ${
                    viewMode === "linear"
                      ? "bg-[#F4F7FB] text-[#102644]"
                      : "text-[#B8D1EE] hover:text-white"
                  }`}
                >
                  Ordinary folder list
                </button>
              </div>
            </div>

            {viewMode === "spatial" ? (
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* 2D Canvas */}
                <div className="blueprint-grid relative min-h-[540px] border-b border-[#9FC0E6]/25 p-5 lg:col-span-8 lg:border-r lg:border-b-0">
                  {/* Desktop Positioned Canvas with SVG Connector Threads */}
                  <div className="hidden h-[500px] w-full md:block relative">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 1000 500"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                    >
                      {EDGES.map(([fromId, toId]) => {
                        const from = NODES.find((n) => n.id === fromId)!;
                        const to = NODES.find((n) => n.id === toId)!;
                        const activeEdge =
                          selectedId === fromId || selectedId === toId;
                        const visibleCluster =
                          isNodeInCluster(from) && isNodeInCluster(to);

                        return (
                          <g key={`${fromId}-${toId}`}>
                            <line
                              x1={from.x * 10}
                              y1={from.y * 5}
                              x2={to.x * 10}
                              y2={to.y * 5}
                              stroke={activeEdge ? "#F2C14E" : "#8AB4E6"}
                              strokeWidth={activeEdge ? "2.4" : "1.2"}
                              strokeDasharray={activeEdge ? undefined : "5 5"}
                              opacity={
                                !visibleCluster
                                  ? 0.12
                                  : activeEdge
                                  ? 0.95
                                  : 0.35
                              }
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {NODES.map((node) => {
                      const isSelected = node.id === selectedId;
                      const isNeighbor = selectedNode.connections.includes(
                        node.id
                      );
                      const inCluster = isNodeInCluster(node);

                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => setSelectedId(node.id)}
                          style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                          }}
                          className={`absolute w-52 -translate-x-1/2 -translate-y-1/2 rounded-lg border p-3 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E] ${
                            isSelected
                              ? "z-20 border-[#F2C14E] bg-[#1D3F6E] ring-2 ring-[#F2C14E]/40"
                              : isNeighbor
                              ? "z-10 border-[#9FC0E6]/65 bg-[#173660] hover:border-[#F2C14E]/80"
                              : "z-0 border-[#9FC0E6]/25 bg-[#132E52]/90 hover:border-[#9FC0E6]/55"
                          } ${inCluster ? "opacity-100" : "opacity-30"}`}
                        >
                          <div className="flex items-center justify-between gap-2 text-[11px] text-[#A9C6EB]">
                            <span className="flex items-center gap-1.5">
                              <span
                                aria-hidden="true"
                                className={`h-2 w-2 rounded-full ${
                                  isSelected
                                    ? "bg-[#F2C14E]"
                                    : isNeighbor
                                    ? "bg-[#9FC0E6]"
                                    : "bg-[#567FB0]"
                                }`}
                              />
                              {node.kind}
                            </span>
                            <span>{node.date}</span>
                          </div>
                          <p
                            className="mt-1.5 text-sm font-semibold leading-snug text-[#F4F7FB]"
                            style={{
                              fontFamily: "var(--font-bricolage), sans-serif",
                            }}
                          >
                            {node.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#C2D8F2]">
                            {node.snippet}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile Responsive Grid Fallback */}
                  <div className="grid grid-cols-1 gap-3 md:hidden">
                    {NODES.filter(isNodeInCluster).map((node) => {
                      const isSelected = node.id === selectedId;
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => setSelectedId(node.id)}
                          className={`rounded-lg border p-4 text-left ${
                            isSelected
                              ? "border-[#F2C14E] bg-[#1D3F6E]"
                              : "border-[#9FC0E6]/30 bg-[#153259]"
                          }`}
                        >
                          <div className="flex justify-between text-xs text-[#A9C6EB]">
                            <span>{node.kind}</span>
                            <span>{node.date}</span>
                          </div>
                          <p className="mt-1 font-semibold text-white">
                            {node.title}
                          </p>
                          <p className="mt-1 text-xs text-[#C2D8F2]">
                            {node.snippet}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Inspector Panel */}
                <aside
                  aria-live="polite"
                  className="flex flex-col justify-between bg-[#102644] p-6 sm:p-7 lg:col-span-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#F2C14E]">
                      <span>Selected pin ({selectedNode.kind})</span>
                      <span>{selectedNode.date}</span>
                    </div>

                    <h2
                      className="mt-2.5 text-xl font-semibold leading-snug text-[#F4F7FB]"
                      style={{
                        fontFamily: "var(--font-bricolage), sans-serif",
                      }}
                    >
                      {selectedNode.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-[#D2E3F7]">
                      {selectedNode.detail}
                    </p>

                    <div className="mt-6 border-t border-[#9FC0E6]/20 pt-5">
                      <p className="text-xs font-medium text-[#A9C6EB]">
                        Connected directly on this board (
                        {selectedNode.connections.length}):
                      </p>
                      <ul className="mt-3 space-y-2">
                        {selectedNode.connections.map((targetId) => {
                          const target = NODES.find((n) => n.id === targetId)!;
                          return (
                            <li key={targetId}>
                              <button
                                type="button"
                                onClick={() => setSelectedId(targetId)}
                                className="flex w-full items-center justify-between rounded border border-[#9FC0E6]/20 bg-[#17355E] px-3 py-2 text-left text-xs text-[#F4F7FB] transition-colors hover:border-[#F2C14E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E]"
                              >
                                <span className="font-medium">
                                  {target.title}
                                </span>
                                <span className="shrink-0 pl-2 text-[#A9C6EB]">
                                  {target.date}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-6 border-t border-[#9FC0E6]/20 pt-4 text-xs leading-relaxed text-[#9FC0E6]">
                    Click any pinned note on the blueprint to trace how field
                    measurements feed into the working draft.
                  </p>
                </aside>
              </div>
            ) : (
              /* Linear List Comparison Mode */
              <div className="p-6 sm:p-10">
                <div className="mx-auto max-w-2xl">
                  <p className="mb-4 rounded-md border border-[#F2C14E]/40 bg-[#F2C14E]/10 px-4 py-3 text-sm text-[#F7DF94]">
                    In an ordinary folder list, these six notes sit months apart
                    by date. You see file names, not how Seville awnings,
                    Cordoba clay bowls, and night vents form a single argument.
                  </p>
                  <ul className="divide-y divide-[#9FC0E6]/20 border-y border-[#9FC0E6]/20">
                    {NODES.filter(isNodeInCluster).map((node) => (
                      <li
                        key={node.id}
                        className="flex items-center justify-between py-3.5 text-sm"
                      >
                        <div>
                          <p className="font-medium text-[#F4F7FB]">
                            {node.title}
                          </p>
                          <p className="text-xs text-[#9FC0E6]">{node.kind}</p>
                        </div>
                        <span className="text-xs text-[#9FC0E6]">
                          {node.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setViewMode("spatial")}
                    className="mt-5 rounded-md bg-[#F2C14E] px-4 py-2 text-xs font-semibold text-[#102644] hover:bg-[#F7CF6D]"
                  >
                    Return to spatial table
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Asymmetric Specification Table */}
        <section
          id="architecture"
          className="border-t border-[#9FC0E6]/25 bg-[#102644] py-20 lg:py-24"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2
                  className="text-3xl font-semibold leading-tight text-[#F4F7FB] sm:text-4xl"
                  style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
                >
                  Engineered like a drafting instrument, not a slide deck.
                </h2>
                <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[#B8D1EE]">
                  Many canvas apps choke past fifty sticky notes or trap your
                  diagrams in proprietary blobs. Cairn renders ten thousand
                  cards at 120 frames per second and saves every board as human-readable JSON beside your Markdown files.
                </p>
              </div>

              <div className="divide-y divide-[#9FC0E6]/20 border-t border-[#9FC0E6]/20 lg:col-span-7">
                <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-12">
                  <h3
                    className="text-lg font-semibold text-[#F2C14E] sm:col-span-4"
                    style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
                  >
                    Same note, ten boards
                  </h3>
                  <p className="max-w-[52ch] text-sm leading-relaxed text-[#D2E3F7] sm:col-span-8">
                    Place a single note onto three different project tables
                    without duplicating the file. Edit a sentence on one board
                    and every table updates immediately.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-12">
                  <h3
                    className="text-lg font-semibold text-[#F2C14E] sm:col-span-4"
                    style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
                  >
                    Deep PDF & image pinning
                  </h3>
                  <p className="max-w-[52ch] text-sm leading-relaxed text-[#D2E3F7] sm:col-span-8">
                    Crop a floor plan, circuit diagram, or table straight out of
                    a 300-page PDF onto the canvas. Double-clicking the crop
                    opens the exact source page beside it.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-12">
                  <h3
                    className="text-lg font-semibold text-[#F2C14E] sm:col-span-4"
                    style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
                  >
                    Open `.canvas` + `.md` storage
                  </h3>
                  <p className="max-w-[52ch] text-sm leading-relaxed text-[#D2E3F7] sm:col-span-8">
                    Every spatial coordinate and connector line is stored in an
                    open JSON Canvas file right inside your local folder, ready
                    for Git version control or offline archival.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-12">
                  <h3
                    className="text-lg font-semibold text-[#F2C14E] sm:col-span-4"
                    style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
                  >
                    Keyboard spatial jumps
                  </h3>
                  <p className="max-w-[52ch] text-sm leading-relaxed text-[#D2E3F7] sm:col-span-8">
                    Navigate across linked clusters with arrow keys, press Space
                    to peek inside a long document, or lasso ten pinned notes
                    into a clean linear Markdown draft in one keystroke.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Blueprint CTA */}
        <section
          id="get-cairn"
          className="border-t border-[#9FC0E6]/25 py-16 sm:py-20"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 sm:px-10 lg:flex-row lg:items-center">
            <div>
              <h2
                className="text-3xl font-semibold text-[#F4F7FB]"
                style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
              >
                Clear space on the table for your next big question.
              </h2>
              <p className="mt-2 max-w-[56ch] text-base text-[#C2D8F2]">
                Free local edition for macOS, Windows, and Linux. Optional
                multi-device encrypted sync for $5/month.
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5">
              <a
                href="#get-cairn"
                className="rounded-md bg-[#F2C14E] px-6 py-3.5 text-base font-semibold text-[#102644] transition-colors hover:bg-[#F7CF6D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E]"
              >
                Download Cairn for macOS
              </a>
              <a
                href="#get-cairn"
                className="rounded-md border border-[#9FC0E6]/45 bg-[#102644]/70 px-5 py-3.5 text-base font-medium text-[#F4F7FB] transition-colors hover:bg-[#102644] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2C14E]"
              >
                Download JSON Canvas sample
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#9FC0E6]/20 bg-[#0D1F38] py-7 text-xs text-[#9FC0E6]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 sm:flex-row sm:px-10">
          <span>Cairn Spatial Notebook (v2.4, native Metal & Vulkan canvas)</span>
          <div className="flex flex-wrap gap-6">
            <a href="#spatial-board" className="hover:text-white">
              Open Canvas spec
            </a>
            <a href="#architecture" className="hover:text-white">
              Keyboard shortcuts
            </a>
            <a href="#get-cairn" className="hover:text-white">
              All platforms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
