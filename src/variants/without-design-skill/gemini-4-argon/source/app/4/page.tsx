/* eslint-disable react/jsx-no-comment-textnodes -- The generated interface intentionally displays slash-prefixed labels. */
"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CanvasCard {
  id: string;
  type: "markdown" | "voice" | "pdf" | "synthesis" | "sketch";
  title: string;
  badge: string;
  accent: string;
  x: number;
  y: number;
  w: number;
  content: string;
  meta: string;
  connectedTo: string[];
}

const PRESET_LAYOUTS: Record<
  "mindpalace" | "clustered" | "storyarc",
  Record<string, { x: number; y: number }>
> = {
  mindpalace: {
    "card-alexander": { x: 45, y: 45 },
    "card-voice": { x: 45, y: 270 },
    "card-metabolism": { x: 365, y: 35 },
    "card-synthesis": { x: 355, y: 235 },
    "card-sketch": { x: 675, y: 125 },
  },
  clustered: {
    "card-alexander": { x: 40, y: 50 },
    "card-metabolism": { x: 40, y: 265 },
    "card-voice": { x: 365, y: 50 },
    "card-sketch": { x: 365, y: 265 },
    "card-synthesis": { x: 675, y: 150 },
  },
  storyarc: {
    "card-alexander": { x: 30, y: 140 },
    "card-voice": { x: 245, y: 60 },
    "card-metabolism": { x: 460, y: 140 },
    "card-sketch": { x: 460, y: 305 },
    "card-synthesis": { x: 685, y: 140 },
  },
};

const INITIAL_CARDS: CanvasCard[] = [
  {
    id: "card-alexander",
    type: "pdf",
    title: "A City is Not a Tree (1965)",
    badge: "PDF HIGHLIGHT • P. 14",
    accent: "#38BDF8",
    x: 45,
    y: 45,
    w: 270,
    content:
      "“Natural cities have the organization of a semi-lattice; artificial cities have the organization of a tree. The tree axiom severs overlapping neighborhoods.”",
    meta: "Christopher Alexander · Architectural Forum",
    connectedTo: ["card-metabolism", "card-synthesis"],
  },
  {
    id: "card-voice",
    type: "voice",
    title: "Kyoto Walk — Spatial Memory",
    badge: "VOICE MEMO • 00:42",
    accent: "#FB7185",
    x: 45,
    y: 270,
    w: 270,
    content:
      "“I always remember which corner of a notebook page an idea was on, never the folder name. Spatial coordinates anchor episodic recall.”",
    meta: "Transcribed on-device via Whisper-Large",
    connectedTo: ["card-synthesis"],
  },
  {
    id: "card-metabolism",
    type: "markdown",
    title: "Method of Loci (Mind Palace)",
    badge: "EVERGREEN NOTE",
    accent: "#34D399",
    x: 365,
    y: 35,
    w: 270,
    content:
      "Ancient rhetoricians stored speeches inside imagined architectural rooms. A 2D spatial canvas restores the hippocampus’s native place-cell navigation.",
    meta: "Linked to 8 spatial boards",
    connectedTo: ["card-synthesis", "card-sketch"],
  },
  {
    id: "card-synthesis",
    type: "synthesis",
    title: "Thesis: Semi-Lattice Interfaces",
    badge: "AI CLUSTER SYNTHESIS",
    accent: "#C084FC",
    x: 355,
    y: 235,
    w: 285,
    content:
      "Combining Alexander’s semi-lattice urbanism with hippocampal place cells: digital second brains must allow spatial neighborhoods that overlap freely.",
    meta: "Auto-synthesized from 3 connected cards",
    connectedTo: ["card-sketch"],
  },
  {
    id: "card-sketch",
    type: "sketch",
    title: "Chapter 1: Beyond File Trees",
    badge: "MANUSCRIPT EXPORT",
    accent: "#FBBF24",
    x: 675,
    y: 125,
    w: 255,
    content:
      "1. The Tyranny of Tree Folders\n2. Hippocampal Place Cells in UI\n3. Semi-Lattice Knowledge Graphs\n4. Designing the Infinite Desk",
    meta: "Ready to compile → 2,450 words",
    connectedTo: [],
  },
];

export default function IterationFourPage() {
  const [cards, setCards] = useState<CanvasCard[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string>("card-synthesis");
  const [viewMode, setViewMode] = useState<"spatial" | "linear">("spatial");
  const [layoutPreset, setLayoutPreset] = useState<
    "mindpalace" | "clustered" | "storyarc"
  >("mindpalace");
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [newStickyText, setNewStickyText] = useState<string>("");

  const activeCard =
    cards.find((c) => c.id === selectedCardId) || cards[0];

  const applyPresetLayout = (preset: "mindpalace" | "clustered" | "storyarc") => {
    setLayoutPreset(preset);
    const coords = PRESET_LAYOUTS[preset];
    setCards((prev) =>
      prev.map((card) =>
        coords[card.id]
          ? { ...card, x: coords[card.id].x, y: coords[card.id].y }
          : card
      )
    );
  };

  const nudgeSelectedCard = (dx: number, dy: number) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === selectedCardId
          ? {
              ...c,
              x: Math.max(15, Math.min(700, c.x + dx)),
              y: Math.max(15, Math.min(310, c.y + dy)),
            }
          : c
      )
    );
  };

  const handleAddSticky = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStickyText.trim()) return;
    const newId = `card-custom-${Date.now()}`;
    const newCard: CanvasCard = {
      id: newId,
      type: "markdown",
      title:
        newStickyText.length > 24
          ? newStickyText.slice(0, 24) + "…"
          : newStickyText,
      badge: "SPATIAL STICKY",
      accent: "#34D399",
      x: 665,
      y: 295,
      w: 260,
      content: newStickyText.trim(),
      meta: "Pinned just now at (665, 295)",
      connectedTo: ["card-synthesis"],
    };
    setCards((prev) => [...prev, newCard]);
    setSelectedCardId(newId);
    setNewStickyText("");
  };

  return (
    <div
      className="min-h-screen bg-[#111318] text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-purple-200"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255, 255, 255, 0.11) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Floating Studio Top Bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#111318]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 via-pink-400 to-amber-300 text-zinc-950 font-bricolage font-bold text-lg shadow-md">
              N4
            </div>
            <div>
              <span className="font-bricolage text-lg font-bold tracking-tight text-white">
                Noema{" "}
                <span className="text-purple-300 font-normal">Canvas</span>
              </span>
              <span className="ml-3 hidden md:inline-block rounded-full border border-purple-400/30 bg-purple-400/10 px-2.5 py-0.5 font-jetbrains text-[10px] text-purple-300">
                ITERATION /4 • INFINITE MIND-PALACE
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-[#191C24] p-1 font-jetbrains text-xs">
            <button
              type="button"
              onClick={() => setViewMode("spatial")}
              className={`rounded-full px-3.5 py-1 transition-all cursor-pointer ${
                viewMode === "spatial"
                  ? "bg-purple-400 text-zinc-950 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ✥ 2D Spatial Board
            </button>
            <button
              type="button"
              onClick={() => setViewMode("linear")}
              className={`rounded-full px-3.5 py-1 transition-all cursor-pointer ${
                viewMode === "linear"
                  ? "bg-emerald-400 text-zinc-950 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ≡ Linear Document
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-jetbrains text-xs text-zinc-400">
              POS: ({activeCard.x}, {activeCard.y})
            </span>
            <a
              href="#canvas-cta"
              className="rounded-xl bg-purple-400 px-4 py-2 font-bricolage text-xs font-bold text-zinc-950 hover:bg-purple-300 transition-colors"
            >
              Create Spatial Board →
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3.5 py-1 font-jetbrains text-xs text-purple-300 mb-4">
              <span>SPATIAL MEMORY ENGINE</span>
              <span>•</span>
              <span>METHOD OF LOCI FOR DIGITAL MINDS</span>
            </div>
            <h1 className="font-bricolage text-4xl sm:text-6xl lg:text-[62px] font-bold tracking-tight text-white leading-[1.05]">
              Remember{" "}
              <span className="underline decoration-purple-400 decoration-wavy decoration-2 underline-offset-8 text-purple-300">
                where
              </span>{" "}
              an idea lives, not just what you named it.
            </h1>
          </div>

          <div className="max-w-md space-y-3">
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Your hippocampus evolved to navigate rooms and landscapes—not
              nested folder trees. Arrange PDFs, voice memos, sketches, and
              Markdown notes on an infinite table, then compile them into linear
              prose in one click.
            </p>
          </div>
        </div>

        {/* INTERACTIVE SPATIAL CANVAS WORKBENCH */}
        <div className="rounded-3xl border border-white/15 bg-[#151821]/95 shadow-[0_30px_90px_rgba(0,0,0,0.75)] overflow-hidden">
          {/* Canvas Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#1B1F2B] px-5 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-jetbrains text-xs text-zinc-400 mr-1">
                LAYOUT:
              </span>
              {(
                [
                  { id: "mindpalace", label: "Mind Palace" },
                  { id: "clustered", label: "Theme Clusters" },
                  { id: "storyarc", label: "Linear Story Arc" },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPresetLayout(preset.id)}
                  className={`rounded-lg px-3 py-1 font-jetbrains text-xs transition-all cursor-pointer ${
                    layoutPreset === preset.id
                      ? "bg-purple-400 text-zinc-950 font-semibold"
                      : "bg-white/5 text-zinc-300 hover:bg-white/10"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Nudge Selected Card Controls & View Switcher */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 rounded-lg border border-white/10 bg-black/30 px-2 py-1 font-jetbrains text-[11px] text-zinc-300">
                <span className="mr-1 text-zinc-400">Move Selected:</span>
                <button
                  type="button"
                  onClick={() => nudgeSelectedCard(-25, 0)}
                  className="rounded px-1.5 hover:bg-white/15 cursor-pointer"
                  title="Move Left"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => nudgeSelectedCard(0, -20)}
                  className="rounded px-1.5 hover:bg-white/15 cursor-pointer"
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => nudgeSelectedCard(0, 20)}
                  className="rounded px-1.5 hover:bg-white/15 cursor-pointer"
                  title="Move Down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => nudgeSelectedCard(25, 0)}
                  className="rounded px-1.5 hover:bg-white/15 cursor-pointer"
                  title="Move Right"
                >
                  →
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  setViewMode((v) => (v === "spatial" ? "linear" : "spatial"))
                }
                className="rounded-lg border border-purple-400/40 bg-purple-400/15 px-3 py-1 font-jetbrains text-xs text-purple-200 hover:bg-purple-400 hover:text-zinc-950 transition-all cursor-pointer"
              >
                {viewMode === "spatial"
                  ? "Transform → Linear Manuscript"
                  : "Return → 2D Spatial Canvas"}
              </button>
            </div>
          </div>

          {viewMode === "spatial" ? (
            <div className="relative">
              {/* Desktop 2D Spatial Board with Bezier Connector Cables */}
              <div
                className="relative w-full overflow-x-auto"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div className="relative min-w-[960px] h-[475px] p-4">
                  {/* SVG Bezier Cables Layer */}
                  <svg className="pointer-events-none absolute inset-0 h-full w-full">
                    {cards.map((source) =>
                      source.connectedTo.map((targetId) => {
                        const target = cards.find((c) => c.id === targetId);
                        if (!target) return null;
                        const sx = source.x + source.w / 2;
                        const sy = source.y + 70;
                        const tx = target.x + target.w / 2;
                        const ty = target.y + 70;
                        const cx1 = sx + (tx - sx) * 0.5;
                        const cy1 = sy;
                        const cx2 = sx + (tx - sx) * 0.5;
                        const cy2 = ty;
                        const isHighlighted =
                          source.id === selectedCardId ||
                          target.id === selectedCardId;

                        return (
                          <g key={`${source.id}->${target.id}`}>
                            <path
                              d={`M ${sx} ${sy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}`}
                              fill="none"
                              stroke={
                                isHighlighted
                                  ? source.accent
                                  : "rgba(255,255,255,0.16)"
                              }
                              strokeWidth={isHighlighted ? 2.5 : 1.5}
                              strokeDasharray={isHighlighted ? undefined : "5 5"}
                            />
                            <circle
                              cx={(sx + tx) / 2}
                              cy={(sy + ty) / 2}
                              r="4"
                              fill={source.accent}
                            />
                          </g>
                        );
                      })
                    )}
                  </svg>

                  {/* Spatial Cards */}
                  {cards.map((card) => {
                    const isSelected = card.id === selectedCardId;
                    return (
                      <div
                        key={card.id}
                        onClick={() => setSelectedCardId(card.id)}
                        style={{
                          left: `${card.x}px`,
                          top: `${card.y}px`,
                          width: `${card.w}px`,
                          borderColor: isSelected
                            ? card.accent
                            : "rgba(255,255,255,0.12)",
                        }}
                        className={`absolute rounded-2xl border-2 bg-[#1D212D]/95 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 cursor-pointer ${
                          isSelected ? "scale-[1.03] z-20" : "z-10 hover:border-white/30"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className="rounded px-2 py-0.5 font-jetbrains text-[10px] font-semibold text-zinc-950"
                            style={{ backgroundColor: card.accent }}
                          >
                            {card.badge}
                          </span>
                          <span className="font-jetbrains text-[10px] text-zinc-500">
                            ({card.x},{card.y})
                          </span>
                        </div>

                        <h3 className="font-bricolage text-base font-bold text-white">
                          {card.title}
                        </h3>

                        <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-zinc-300">
                          {card.content}
                        </p>

                        {card.type === "voice" && (
                          <div className="mt-3 flex items-center gap-2 rounded-lg bg-black/30 px-2.5 py-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsPlayingAudio((v) => !v);
                              }}
                              className="rounded bg-rose-400 px-2 py-0.5 font-jetbrains text-[10px] font-bold text-zinc-950 cursor-pointer"
                            >
                              {isPlayingAudio ? "❚❚ PAUSE" : "▶ PLAY"}
                            </button>
                            <div className="flex flex-1 items-center gap-1">
                              {[8, 16, 12, 20, 10, 18, 14, 9, 15, 11].map(
                                (h, i) => (
                                  <span
                                    key={i}
                                    style={{ height: `${h}px` }}
                                    className={`w-1 rounded-full ${
                                      isPlayingAudio
                                        ? "bg-rose-400 animate-pulse"
                                        : "bg-zinc-600"
                                    }`}
                                  />
                                )
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mt-3 border-t border-white/10 pt-2 font-jetbrains text-[10px] text-zinc-400">
                          {card.meta}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Sticky Card Creator Bar */}
              <form
                onSubmit={handleAddSticky}
                className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 bg-[#1B1F2B] px-5 py-3"
              >
                <div className="flex items-center gap-2 text-xs font-jetbrains text-zinc-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: activeCard.accent }}
                  />
                  <span>
                    SELECTED: <strong>{activeCard.title}</strong>
                  </span>
                </div>

                <div className="flex w-full sm:w-auto items-center gap-2">
                  <input
                    type="text"
                    value={newStickyText}
                    onChange={(e) => setNewStickyText(e.target.value)}
                    placeholder="Pin a new sticky card to this spatial board..."
                    className="w-full sm:w-72 rounded-xl border border-white/15 bg-black/30 px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-purple-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-emerald-400 px-3.5 py-1.5 font-jetbrains text-xs font-semibold text-zinc-950 hover:bg-emerald-300 transition-colors cursor-pointer"
                  >
                    + Pin Card
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Linear Document View compiled from the exact same Spatial Cards */
            <div className="p-8 sm:p-12 bg-[#141720] max-w-3xl mx-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-jetbrains text-xs text-emerald-300">
                <span>COMPILED LINEAR MANUSCRIPT FROM {cards.length} SPATIAL CARDS</span>
                <span>MARKDOWN READY</span>
              </div>
              <h2 className="font-bricolage text-3xl font-bold text-white mb-6">
                Semi-Lattice Interfaces & Spatial Memory
              </h2>
              <div className="space-y-6">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex items-center justify-between font-jetbrains text-xs text-zinc-400 mb-2">
                      <span style={{ color: card.accent }}>
                        § 0{index + 1} // {card.title}
                      </span>
                      <span>{card.badge}</span>
                    </div>
                    <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
                      {card.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: MULTIMODAL MEDIA BENTO */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-jetbrains text-xs uppercase tracking-widest text-purple-300">
            // MULTIMODAL BY DESIGN
          </span>
          <h2 className="mt-2 font-bricolage text-3xl sm:text-4xl font-bold text-white">
            Every medium of thought on one infinite table
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#181B24] p-7">
            <span className="inline-block rounded-lg bg-sky-400/15 px-3 py-1 font-jetbrains text-xs text-sky-300">
              PDF & WEB CLIPPER
            </span>
            <h3 className="mt-4 font-bricolage text-xl font-bold text-white">
              Drag Highlights Straight onto the Canvas
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Open a 90-page research paper alongside your spatial board. Drag
              any paragraph or diagram out of the PDF to create a live linked
              card that snaps back to the exact page.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#181B24] p-7">
            <span className="inline-block rounded-lg bg-rose-400/15 px-3 py-1 font-jetbrains text-xs text-rose-300">
              VOICE & SKETCH CARDS
            </span>
            <h3 className="mt-4 font-bricolage text-xl font-bold text-white">
              Apple Pencil & Whisper Audio Nodes
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Sketch a quick system diagram or drop a voice memo right next to
              your Markdown notes. Noema indexes handwritten OCR and audio
              transcripts automatically.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#181B24] p-7">
            <span className="inline-block rounded-lg bg-amber-400/15 px-3 py-1 font-jetbrains text-xs text-amber-300">
              SPATIAL-TO-PROSE
            </span>
            <h3 className="mt-4 font-bricolage text-xl font-bold text-white">
              One-Click Manuscript Compiler
            </h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Draw a cable thread through 10 cards on your canvas and hit
              Compile. Noema turns your spatial sequence into a clean hierarchical
              Markdown draft.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          id="canvas-cta"
          className="mt-16 rounded-3xl border border-purple-400/30 bg-gradient-to-r from-[#1E1633] via-[#181B28] to-[#142524] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div>
            <span className="font-jetbrains text-xs text-purple-300 uppercase">
              INFINITE SPATIAL SECOND BRAIN
            </span>
            <h2 className="mt-2 font-bricolage text-3xl sm:text-4xl font-bold text-white">
              Give your ideas room to breathe.
            </h2>
            <p className="mt-2 text-sm text-zinc-300 max-w-xl">
              60fps Metal/WebGL spatial canvas, bidirectional Markdown sync, and
              offline AI clustering.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-2xl bg-purple-400 px-6 py-3.5 font-bricolage text-sm font-bold text-zinc-950 hover:bg-purple-300 transition-colors cursor-pointer"
            >
              Open Spatial Studio
            </button>
            <Link
              href="/without-design-skill/gemini-4-argon/5"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 font-jetbrains text-xs text-white hover:bg-white/15 transition-colors"
            >
              Explore Iteration /5 (Ambient Companion) →
            </Link>
          </div>
        </div>
      </section>

      {/* Studio Footer */}
      <footer className="border-t border-white/10 bg-[#0E1015] py-8 px-6 font-jetbrains text-xs text-zinc-500">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4">
          <span>NOEMA CANVAS // ITERATION 04 OF 05 — SPATIAL MIND-PALACE</span>
          <div className="flex items-center gap-2">
            <span>Switch Iteration:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <Link
                key={n}
                href={`/without-design-skill/gemini-4-argon/${n}`}
                className={`rounded px-2 py-1 ${
                  n === 4
                    ? "bg-purple-400 text-zinc-950 font-bold"
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
