"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookMarked,
  Compass,
  Highlighter,
  LayoutGrid,
  ListTree,
  Mic,
  Pause,
  Play,
  Sparkles,
  StickyNote,
} from "lucide-react";

type BoardKey = "product" | "film" | "architecture";

interface SpatialBoard {
  key: BoardKey;
  title: string;
  coords: string;
  clipping: {
    source: string;
    quote: string;
    highlight: string;
  };
  voiceNote: {
    duration: string;
    location: string;
    transcript: string;
  };
  sketch: {
    caption: string;
    nodes: [string, string, string];
  };
  synthesis: {
    title: string;
    summary: string;
    readyPercent: string;
  };
}

const BOARDS: Record<BoardKey, SpatialBoard> = {
  product: {
    key: "product",
    title: "Calm Computing Thesis",
    coords: "X: 412 · Y: -84 · 100%",
    clipping: {
      source: "Mark Weiser & John Seely Brown · Xerox PARC (1996)",
      quote: "The most profound technologies are those that disappear.",
      highlight:
        "Calm technology engages both the center and the periphery of our attention, moving back and forth naturally.",
    },
    voiceNote: {
      duration: "0:38",
      location: " Ferry Terminal · Yesterday",
      transcript:
        "“What if our second brain never sent push alerts—instead, peripheral margin cards gently glow only when you open a related draft?”",
    },
    sketch: {
      caption: "Attention Spectrum Sketch",
      nodes: ["Peripheral Calm", "Contextual Bridge", "Deep Focus"],
    },
    synthesis: {
      title: "Draft: Designing Peripheral Memory",
      summary:
        "Combining PARC’s 1996 calm-tech paper with yesterday’s ferry voice memo: software memory should act like peripheral vision, not an alarm clock.",
      readyPercent: "84% outlined from 6 cards",
    },
  },
  film: {
    key: "film",
    title: "Oceanic Acoustic Atlas (Doc)",
    coords: "X: -120 · Y: 290 · 100%",
    clipping: {
      source: "Field Journal · Hydrophone Station 04, Azores",
      quote: "At 800 meters depth, the SOFAR channel carries whale song across entire ocean basins.",
      highlight:
        "Low-frequency 20Hz calls traveled 1,900 miles before attenuation—nature’s original long-distance fiber optic.",
    },
    voiceNote: {
      duration: "0:52",
      location: "Lisbon Edit Bay · Tue",
      transcript:
        "“Open Act II not with narration, but 14 seconds of raw 20Hz hydrophone spectrogram fading into shipping-lane interference.”",
    },
    sketch: {
      caption: "Act II Sonic Arc",
      nodes: ["20Hz Silence", "SOFAR Resonance", "Engine Noise"],
    },
    synthesis: {
      title: "Scene 07 Treatment: The Deep Channel",
      summary:
        "Woven from hydrophone logs, acoustic physics clippings, and edit-bay voice notes—every timecode and archival source stays pinned.",
      readyPercent: "91% scripted from 11 cards",
    },
  },
  architecture: {
    key: "architecture",
    title: "Courtyard Microclimates",
    coords: "X: 880 · Y: 145 · 100%",
    clipping: {
      source: "Hassan Fathy · Natural Energy & Vernacular Architecture",
      quote: "Aerodynamic courtyard proportions cool desert air by 11°C without mechanical power.",
      highlight:
        "Nighttime radiative cooling traps dense cool air at floor level until midday thermal convection begins.",
    },
    voiceNote: {
      duration: "0:29",
      location: "Cordoba Site Walk · Oct",
      transcript:
        "“Measure fountain evaporative drop vs limestone thermal mass—pair this with our civic library atrium competition brief.”",
    },
    sketch: {
      caption: "Convection Loop Section",
      nodes: ["Night Sky Sink", "Courtyard Basin", "Stack Vent"],
    },
    synthesis: {
      title: "Competition Brief: Passive Atrium",
      summary:
        "Links Fathy’s vernacular thermodynamics with Cordoba site measurements into a unified passive-cooling narrative.",
      readyPercent: "78% assembled from 9 cards",
    },
  },
};

export default function IterationFourSpatial() {
  const [activeBoard, setActiveBoard] = useState<BoardKey>("product");
  const [viewMode, setViewMode] = useState<"canvas" | "outline">("canvas");
  const [playingVoice, setPlayingVoice] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number>(4);

  const board = BOARDS[activeBoard];

  return (
    <div className="min-h-screen bg-[#EFECE6] font-jakarta text-[#18181B] selection:bg-[#1D4ED8]/15 selection:text-[#1D4ED8]">
      {/* Floating Studio Pill Header */}
      <header className="sticky top-4 z-40 px-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[#DCD6CA] bg-white/90 px-5 py-2.5 shadow-[0_8px_30px_rgba(24,24,27,0.06)] backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D4ED8] text-white">
              <Compass className="h-4 w-4" />
            </div>
            <span className="font-fraunces text-xl font-semibold tracking-tight text-[#18181B]">
              Engram <span className="font-normal italic text-[#1D4ED8]">Canvas</span>
            </span>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#52525B] md:flex">
            <a href="#desk" className="transition-colors hover:text-[#18181B]">
              Spatial Desk
            </a>
            <a href="#capture" className="transition-colors hover:text-[#18181B]">
              Web &amp; Voice Clipper
            </a>
            <a href="#bridge" className="transition-colors hover:text-[#18181B]">
              2D → 1D Outline
            </a>
            <a href="#studio-plan" className="transition-colors hover:text-[#18181B]">
              Pricing
            </a>
          </nav>

          <a
            href="#studio-plan"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#18181B] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
          >
            <span>Try Spatial Desk</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Hero + Interactive Spatial Canvas */}
      <section id="desk" className="mx-auto max-w-7xl px-6 pt-14 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D5CFC2] bg-white px-3.5 py-1 text-xs font-semibold text-[#E05A37] shadow-2xs">
            <StickyNote className="h-3.5 w-3.5" />
            <span>A SECOND BRAIN FOR VISUAL &amp; SPATIAL THINKERS</span>
          </span>

          <h1 className="mt-5 font-fraunces text-4xl font-normal leading-[1.06] tracking-[-0.02em] text-[#18181B] sm:text-6xl">
            Ideas don&apos;t arrive in bullet points.{" "}
            <em className="italic text-[#1D4ED8]">Spread them on an infinite desk.</em>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#52525B] sm:text-lg">
            Pin book highlights beside voice memos, rough sketches, and PDF clippings.
            Draw threads between hunches in 2D space—then flip into a clean manuscript
            outline in one click.
          </p>
        </div>

        {/* Interactive Canvas Toolbar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-t-3xl border border-b-0 border-[#D6D0C4] bg-white px-5 py-3.5">
          {/* Board Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-jetbrains text-[11px] uppercase tracking-wider text-[#71717A]">
              WORKSPACE:
            </span>
            {(Object.keys(BOARDS) as BoardKey[]).map((key) => {
              const b = BOARDS[key];
              const active = key === activeBoard;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveBoard(key);
                    setPlayingVoice(false);
                  }}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-[#1D4ED8] text-white shadow-sm"
                      : "bg-[#F4F2EC] text-[#52525B] hover:bg-[#E7E3D8]"
                  }`}
                >
                  {b.title}
                </button>
              );
            })}
          </div>

          {/* 2D Canvas vs 1D Outline Toggle */}
          <div className="flex items-center gap-3">
            <span className="hidden font-jetbrains text-[11px] text-[#71717A] lg:inline">
              {board.coords}
            </span>
            <div className="inline-flex rounded-full border border-[#DDD7CB] bg-[#F5F3EE] p-1">
              <button
                type="button"
                onClick={() => setViewMode("canvas")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === "canvas"
                    ? "bg-white text-[#18181B] shadow-xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5 text-[#1D4ED8]" />
                <span>2D Spatial</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("outline")}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === "outline"
                    ? "bg-white text-[#18181B] shadow-xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                <ListTree className="h-3.5 w-3.5 text-[#E05A37]" />
                <span>1D Outline</span>
              </button>
            </div>
          </div>
        </div>

        {/* Spatial Canvas Surface OR Structured 1D Outline */}
        <div className="relative overflow-hidden rounded-b-3xl border border-[#D6D0C4] bg-[#F6F4EF] bg-studio-dots p-6 shadow-[0_24px_70px_rgba(24,24,27,0.08)] sm:p-10">
          {viewMode === "canvas" ? (
            <div className="relative">
              {/* Decorative Bezier Connection SVG Threads (Desktop) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 1000 500"
                className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              >
                <path
                  d="M 310 130 C 430 130, 440 245, 560 245"
                  fill="none"
                  stroke="#1D4ED8"
                  strokeWidth="2.2"
                  strokeDasharray="6 5"
                />
                <path
                  d="M 310 375 C 430 375, 440 275, 560 275"
                  fill="none"
                  stroke="#E05A37"
                  strokeWidth="2.2"
                />
                <path
                  d="M 690 120 C 690 175, 690 190, 690 215"
                  fill="none"
                  stroke="#15803D"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                {/* Left Column of Source Cards */}
                <div className="space-y-6 lg:col-span-5">
                  {/* Card 1: Book / Paper Highlight */}
                  <div
                    onClick={() => setSelectedCard(1)}
                    className={`rounded-2xl border bg-white p-5 transition-all cursor-pointer ${
                      selectedCard === 1
                        ? "border-[#1D4ED8] ring-4 ring-[#1D4ED8]/10 shadow-xl"
                        : "border-[#DFDAD0] shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#B45309]">
                        <Highlighter className="h-3.5 w-3.5" />
                        READING CLIPPING
                      </span>
                      <span className="font-jetbrains text-[10px] text-[#71717A]">
                        PIN #01
                      </span>
                    </div>
                    <p className="mt-3 font-fraunces text-lg text-[#18181B]">
                      “{board.clipping.quote}”
                    </p>
                    <p className="mt-2 rounded-lg bg-[#FEF9C3] px-3 py-2 text-xs leading-relaxed text-[#3F3F46]">
                      {board.clipping.highlight}
                    </p>
                    <div className="mt-3 font-jetbrains text-[11px] text-[#71717A]">
                      {board.clipping.source}
                    </div>
                  </div>

                  {/* Card 2: Playable Voice Memo Card */}
                  <div
                    onClick={() => setSelectedCard(2)}
                    className={`rounded-2xl border bg-white p-5 transition-all cursor-pointer ${
                      selectedCard === 2
                        ? "border-[#E05A37] ring-4 ring-[#E05A37]/10 shadow-xl"
                        : "border-[#DFDAD0] shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E05A37]">
                        <Mic className="h-3.5 w-3.5" />
                        VOICE MEMO · AUTO-TRANSCRIBED
                      </span>
                      <span className="font-jetbrains text-[11px] text-[#71717A]">
                        {board.voiceNote.duration}
                      </span>
                    </div>

                    {/* Interactive Waveform Bar */}
                    <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#F6F4EF] px-3.5 py-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVoice((v) => !v);
                        }}
                        aria-label={playingVoice ? "Pause voice note" : "Play voice note"}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E05A37] text-white transition-transform hover:scale-105 cursor-pointer"
                      >
                        {playingVoice ? (
                          <Pause className="h-3.5 w-3.5" />
                        ) : (
                          <Play className="h-3.5 w-3.5 translate-x-0.5" />
                        )}
                      </button>
                      <div className="flex flex-1 items-center gap-1">
                        {[14, 24, 18, 28, 12, 26, 20, 30, 16, 22, 28, 15, 25, 19, 12, 22].map(
                          (h, idx) => (
                            <span
                              key={idx}
                              style={{ height: `${h}px` }}
                              className={`w-1.5 rounded-full transition-colors ${
                                playingVoice && idx < 9
                                  ? "bg-[#E05A37]"
                                  : "bg-[#D4CEC3]"
                              }`}
                            />
                          )
                        )}
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#3F3F46] italic">
                      {board.voiceNote.transcript}
                    </p>
                    <div className="mt-2 font-jetbrains text-[10px] text-[#71717A]">
                      {board.voiceNote.location}
                    </div>
                  </div>
                </div>

                {/* Center Spacer / Connector Column */}
                <div className="hidden lg:col-span-1 lg:flex lg:flex-col lg:items-center lg:justify-center">
                  <span className="rounded-full border border-[#1D4ED8]/30 bg-white px-2.5 py-1 font-jetbrains text-[10px] font-semibold text-[#1D4ED8] shadow-xs">
                    LINKED
                  </span>
                </div>

                {/* Right Column: Sketch Card + Emergent Synthesis Note */}
                <div className="space-y-6 lg:col-span-6">
                  {/* Card 3: Concept Diagram / Sketch Card */}
                  <div
                    onClick={() => setSelectedCard(3)}
                    className={`rounded-2xl border bg-white p-5 transition-all cursor-pointer ${
                      selectedCard === 3
                        ? "border-[#15803D] ring-4 ring-[#15803D]/10 shadow-xl"
                        : "border-[#DFDAD0] shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#15803D]">
                        NAPKIN DIAGRAM · {board.sketch.caption.toUpperCase()}
                      </span>
                      <span className="font-jetbrains text-[10px] text-[#71717A]">
                        INK + SVG
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-dashed border-[#D6D0C4] bg-[#FAF9F5] p-4">
                      {board.sketch.nodes.map((node, i) => (
                        <div key={node} className="flex items-center gap-2">
                          <span className="rounded-lg border border-[#18181B] bg-white px-3 py-1.5 font-fraunces text-xs font-medium text-[#18181B] shadow-[2px_2px_0px_#18181B]">
                            {node}
                          </span>
                          {i < 2 && (
                            <span className="font-jetbrains text-xs text-[#71717A]">
                              →
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 4: Synthesis Manuscript Card */}
                  <div
                    onClick={() => setSelectedCard(4)}
                    className={`rounded-2xl border-2 bg-white p-6 transition-all cursor-pointer ${
                      selectedCard === 4
                        ? "border-[#1D4ED8] ring-4 ring-[#1D4ED8]/15 shadow-2xl"
                        : "border-[#18181B] shadow-lg"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1D4ED8]/10 px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                        <Sparkles className="h-3.5 w-3.5" />
                        SYNTHESIS NOTE
                      </span>
                      <span className="font-jetbrains text-[11px] font-medium text-[#15803D]">
                        {board.synthesis.readyPercent}
                      </span>
                    </div>

                    <h2 className="mt-3 font-fraunces text-2xl font-medium text-[#18181B]">
                      {board.synthesis.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#3F3F46]">
                      {board.synthesis.summary}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#ECE8DF] pt-3.5 text-xs">
                      <span className="text-[#71717A]">
                        3 upstream sources cited automatically
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewMode("outline");
                        }}
                        className="font-semibold text-[#1D4ED8] hover:underline cursor-pointer"
                      >
                        View as Linear Outline →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 1D Linear Manuscript Outline View */
            <div className="mx-auto max-w-3xl rounded-2xl border border-[#DFDAD0] bg-white p-8 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#ECE8DF] pb-4">
                <div>
                  <span className="font-jetbrains text-xs text-[#E05A37]">
                    1D MANUSCRIPT PROJECTION · LIVE SYNCED WITH CANVAS
                  </span>
                  <h2 className="mt-1 font-fraunces text-3xl text-[#18181B]">
                    {board.synthesis.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setViewMode("canvas")}
                  className="rounded-full border border-[#DDD7CB] px-3.5 py-1.5 text-xs font-semibold text-[#18181B] hover:bg-[#F5F3EE] cursor-pointer"
                >
                  ← Back to 2D Canvas
                </button>
              </div>

              <ol className="mt-6 space-y-5">
                <li className="border-l-2 border-[#B45309] pl-4">
                  <div className="font-jetbrains text-[11px] text-[#B45309]">
                    I. LITERATURE ANCHOR
                  </div>
                  <p className="mt-1 font-fraunces text-lg text-[#18181B]">
                    “{board.clipping.quote}”
                  </p>
                  <p className="mt-1 text-xs text-[#71717A]">{board.clipping.source}</p>
                </li>
                <li className="border-l-2 border-[#E05A37] pl-4">
                  <div className="font-jetbrains text-[11px] text-[#E05A37]">
                    II. FIELD OBSERVATION ({board.voiceNote.duration} AUDIO)
                  </div>
                  <p className="mt-1 text-sm text-[#27272A]">
                    {board.voiceNote.transcript}
                  </p>
                </li>
                <li className="border-l-2 border-[#15803D] pl-4">
                  <div className="font-jetbrains text-[11px] text-[#15803D]">
                    III. STRUCTURAL MODEL — {board.sketch.caption.toUpperCase()}
                  </div>
                  <p className="mt-1 text-sm text-[#27272A]">
                    Progression: {board.sketch.nodes.join(" → ")}
                  </p>
                </li>
                <li className="border-l-2 border-[#1D4ED8] bg-[#F8FAFC] p-4 rounded-r-xl">
                  <div className="font-jetbrains text-[11px] text-[#1D4ED8]">
                    IV. SYNTHESIS ARGUMENT
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-[#18181B]">
                    {board.synthesis.summary}
                  </p>
                </li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* Multi-Modal Capture Section */}
      <section id="capture" className="border-y border-[#DDD7CB] bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="font-jetbrains text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">
              COLLECT WITHOUT FRICTION
            </span>
            <h2 className="mt-3 font-fraunces text-4xl text-[#18181B] sm:text-5xl">
              Every medium is a first-class citizen on your desk.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                badge: "SAFARI · CHROME · ARC",
                color: "#1D4ED8",
                title: "One-Click Visual Clipper",
                desc: "Grab paragraphs, images, or live tweets with full URL + timestamp provenance preserved automatically.",
              },
              {
                badge: "APPLE WATCH · IPHONE",
                color: "#E05A37",
                title: "Walking Voice Notes",
                desc: "Whisper an idea mid-walk. Whisper-large transcribes locally and drops a playable audio card onto today’s desk.",
              },
              {
                badge: "IPAD PENCIL · SVG",
                color: "#15803D",
                title: "Handwritten Margin Ink",
                desc: "Sketch diagrams directly over PDFs or blank index cards—every handwritten word becomes searchable.",
              },
              {
                badge: "KINDLE · EPUB · PDF",
                color: "#B45309",
                title: "Deep Page Anchors",
                desc: "Click any quote card six months later and jump straight back to the exact highlighted page in the original PDF.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col justify-between rounded-3xl border border-[#E4E0D6] bg-[#FAF8F4] p-6 transition-transform hover:-translate-y-1"
              >
                <div>
                  <span
                    className="font-jetbrains text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: card.color }}
                  >
                    {card.badge}
                  </span>
                  <h3 className="mt-3 font-fraunces text-2xl text-[#18181B]">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#52525B]">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-6 h-1 w-12 rounded-full" style={{ backgroundColor: card.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge Section: 2D Messy to 1D Clarity */}
      <section id="bridge" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-jetbrains text-xs font-semibold uppercase tracking-wider text-[#E05A37]">
              NO MORE DEAD WHITEBOARDS
            </span>
            <h2 className="mt-3 font-fraunces text-4xl leading-tight text-[#18181B]">
              Whiteboards forget text. Text editors flatten space.{" "}
              <em className="italic text-[#1D4ED8]">Engram unites both.</em>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#52525B]">
              In most visual canvas apps, cards are trapped inside proprietary shapes
              that never become real writing. In Engram, every card on your canvas{" "}
              <strong>is</strong> a real Markdown note—reusable across hundreds of
              boards without duplicating data.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm font-medium text-[#18181B]">
              <BookMarked className="h-5 w-5 text-[#1D4ED8]" />
              <span>One note can live on 10 canvases simultaneously</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-3xl border border-[#DCD6CA] bg-white p-7 shadow-sm">
              <div className="font-jetbrains text-xs text-[#71717A]">
                CREATIVE STUDIO STORY · 01
              </div>
              <p className="mt-4 font-fraunces text-xl leading-relaxed text-[#18181B]">
                “I mapped 300 archival photos, interview clips, and architectural
                sketches on one canvas—then exported our book’s chapter outline in
                ten minutes.”
              </p>
              <div className="mt-5 text-xs font-semibold text-[#52525B]">
                Elena Rostova — Author &amp; Exhibition Curator
              </div>
            </div>

            <div className="rounded-3xl border border-[#DCD6CA] bg-white p-7 shadow-sm">
              <div className="font-jetbrains text-xs text-[#71717A]">
                CREATIVE STUDIO STORY · 02
              </div>
              <p className="mt-4 font-fraunces text-xl leading-relaxed text-[#18181B]">
                “Seeing customer call snippets spatially clustered right next to our
                Figma prototypes revealed product patterns our linear docs hid for
                months.”
              </p>
              <div className="mt-5 text-xs font-semibold text-[#52525B]">
                Devon Park — Head of Design, Fieldwork
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Pricing */}
      <section id="studio-plan" className="mx-auto max-w-5xl px-6 pb-28">
        <div className="rounded-[32px] border border-[#D6D0C4] bg-white p-8 shadow-[0_20px_60px_rgba(24,24,27,0.07)] sm:p-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="rounded-full bg-[#1D4ED8]/10 px-3 py-1 font-jetbrains text-xs font-semibold text-[#1D4ED8]">
                START YOUR STUDIO DESK
              </span>
              <h2 className="mt-4 font-fraunces text-4xl text-[#18181B]">
                Free for solo local desks. $9/mo for limitless cloud media &amp; iPad
                Pencil sync.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#52525B]">
                Includes unlimited infinite canvases, local Markdown vault ownership,
                offline voice transcription, and PDF deep-citation pinning.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-5">
              <button
                type="button"
                className="w-full rounded-2xl bg-[#1D4ED8] px-6 py-4 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#1E40AF] cursor-pointer"
              >
                Open Your First Spatial Canvas — Free
              </button>
              <button
                type="button"
                className="w-full rounded-2xl border border-[#DDD7CB] bg-[#FAF8F4] px-6 py-3.5 text-xs font-semibold text-[#3F3F46] transition-colors hover:bg-[#EFECE6] cursor-pointer"
              >
                Download for macOS + iPadOS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#DDD7CB] bg-[#E7E2D8] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 text-xs text-[#52525B] sm:flex-row sm:items-center">
          <span className="font-fraunces text-base text-[#18181B]">
            Engram Canvas · Iteration 04 of 05
          </span>
          <span className="font-jetbrains text-[11px]">
            SET IN FRAUNCES &amp; PLUS JAKARTA SANS
          </span>
        </div>
      </footer>
    </div>
  );
}
