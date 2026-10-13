"use client";

import { useState } from "react";
import Link from "next/link";

type ViewMode = "board" | "manuscript";

interface StudioClipping {
  id: string;
  kind: "Book excerpt" | "Voice memo" | "Field diagram" | "Archive ledger" | "Draft claim";
  title: string;
  source: string;
  content: string;
  manuscriptParagraph: string;
  ink: "ultramarine" | "plum";
  includedInDraft: boolean;
}

const INITIAL_CLIPPINGS: StudioClipping[] = [
  {
    id: "clip-1",
    kind: "Book excerpt",
    title: "Daylight factor in North European weavers’ lofts",
    source: "Steen Eiler Rasmussen, Experiencing Architecture (1959), p. 194",
    content:
      "Tall ribbon windows flush with the ceiling plane bounce diffuse sky light deep across the timber floor, eliminating harsh contrast around the loom threads.",
    manuscriptParagraph:
      "Historically, pre-electric workshops solved glare not by dimming the room, but by raising the window head flush with the plaster ceiling. As Steen Eiler Rasmussen observed in nineteenth-century weavers’ lofts, light bouncing off a high whitewashed soffit reaches the center of the worktable without casting a shadow from the craftsperson’s own hand.",
    ink: "ultramarine",
    includedInDraft: true,
  },
  {
    id: "clip-2",
    kind: "Voice memo",
    title: "Site walk at the Zurich sawtooth foundry",
    source: "Recorded 14 Nov 2025, 08:42 (01:18 audio transcript)",
    content:
      "“Notice how the north-facing glass panes slope at sixty degrees. Even at noon in July, zero direct sun hits the drafting tables, yet our light meter reads 650 lux across every bay.”",
    manuscriptParagraph:
      "During our November site walk at the converted Zurich foundry, light-meter readings confirmed 650 lux of uniform illumination across the entire floor plate. Because the sawtooth glazing faces strictly north at a sixty-degree pitch, direct solar heat is rejected while diffuse zenith light floods the drafting bays below.",
    ink: "plum",
    includedInDraft: true,
  },
  {
    id: "clip-3",
    kind: "Field diagram",
    title: "Section geometry of a 60° north-light monitor roof",
    source: "Sketchbook VII, Sheet 14",
    content:
      "Reflective lime-painted sloped baffle redirects 74% of zenith sky luminance downward into a 9-meter structural bay.",
    manuscriptParagraph:
      "Geometric section modeling shows that an interior baffle painted in matte lime wash redirects nearly three-quarters of incoming sky luminance downward, allowing a single roof monitor to light a nine-meter structural span evenly.",
    ink: "ultramarine",
    includedInDraft: true,
  },
  {
    id: "clip-4",
    kind: "Archive ledger",
    title: "Glazing maintenance logs from the 1912 municipal printworks",
    source: "City Building Archive, Box 44, Folder 3",
    content:
      "Cast wired-glass panels on 1.2-meter mullions survived eighty winters with under two percent pane replacement.",
    manuscriptParagraph:
      "Municipal maintenance records from the 1912 printworks demonstrate the durability of narrow 1.2-meter glazing bays: small panes bedded in linseed putty absorbed thermal movement across eighty winters with negligible breakage.",
    ink: "plum",
    includedInDraft: true,
  },
];

export default function StudioWallIterationPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("board");
  const [clippings, setClippings] = useState<StudioClipping[]>(INITIAL_CLIPPINGS);
  const [focusedId, setFocusedId] = useState<string>("clip-2");
  const [isPlayingMemo, setIsPlayingMemo] = useState(false);

  const toggleClippingInDraft = (id: string) => {
    setClippings((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, includedInDraft: !c.includedInDraft } : c
      )
    );
  };

  const activeDraftClippings = clippings.filter((c) => c.includedInDraft);

  return (
    <div className="min-h-screen bg-[#E6E2DC] text-[#363C48] font-bricolage selection:bg-[#1D35A6]/15 selection:text-[#1D35A6]">
      {/* Top Studio Header */}
      <header className="border-b-2 border-[#1D35A6] bg-[#E6E2DC]/95 backdrop-blur-xs sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/with-design-skill/gemini-4-argon/4"
              className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-[#1D35A6]"
            >
              <span className="inline-block h-4 w-4 rounded-xs bg-[#8A2452] shadow-[3px_3px_0px_#1D35A6]" />
              <span>Marrow</span>
            </Link>
            <span className="hidden md:inline text-sm font-medium text-[#363C48]">
              Studio pinboard and manuscript loom for multi-modal research
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex rounded-lg border-2 border-[#1D35A6] bg-[#FAF8F5] p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode("board")}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  viewMode === "board"
                    ? "bg-[#1D35A6] text-[#FAF8F5]"
                    : "text-[#1D35A6] hover:bg-[#1D35A6]/10"
                }`}
              >
                Spatial pinboard
              </button>
              <button
                type="button"
                onClick={() => setViewMode("manuscript")}
                className={`rounded-md px-3 py-1.5 transition-colors ${
                  viewMode === "manuscript"
                    ? "bg-[#8A2452] text-[#FAF8F5]"
                    : "text-[#8A2452] hover:bg-[#8A2452]/10"
                }`}
              >
                Linear manuscript ({activeDraftClippings.length})
              </button>
            </div>

            <a
              href="#open-board"
              className="rounded-lg border-2 border-[#1D35A6] bg-[#1D35A6] px-4 py-2 text-xs font-semibold text-[#FAF8F5] shadow-[3px_3px_0px_#8A2452] hover:translate-y-px transition-all"
            >
              Start a studio board
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-12 pb-28">
        {/* Bold Asymmetric Hero Header */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-[#1D35A6]">
              Pin voice memos, sketches, and book clippings to one wall, then
              read them as a finished draft.
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-base sm:text-lg leading-[1.6] text-[#363C48]">
              Research begins as a messy collage of photos, audio interviews,
              and torn quotes. Marrow lets you arrange raw materials spatially
              on a canvas and flip into a structured linear essay with a single
              click.
            </p>
          </div>
        </section>

        {/* Interactive Hero Workbench: Toggle between Spatial Pinboard and Linear Manuscript */}
        <section
          aria-label="Interactive spatial pinboard and linear manuscript switcher"
          className="rounded-2xl border-2 border-[#1D35A6] bg-[#DED9D0] p-5 sm:p-8 shadow-[6px_6px_0px_#1D35A6]"
        >
          {/* Workbench Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#1D35A6]/25 pb-5 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1D35A6]">
                Project board: Daylight geometry in industrial workshops
              </h2>
              <p className="text-xs sm:text-sm text-[#363C48]">
                Toggle checkboxes on any clipping to include or exclude it from
                the compiled manuscript, then switch views on the right.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border-2 border-[#1D35A6] bg-[#FAF8F5] p-1">
              <button
                type="button"
                onClick={() => setViewMode("board")}
                className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  viewMode === "board"
                    ? "bg-[#1D35A6] text-[#FAF8F5]"
                    : "text-[#1D35A6] hover:bg-[#1D35A6]/10"
                }`}
              >
                View as spatial pinboard
              </button>
              <button
                type="button"
                onClick={() => setViewMode("manuscript")}
                className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  viewMode === "manuscript"
                    ? "bg-[#8A2452] text-[#FAF8F5]"
                    : "text-[#8A2452] hover:bg-[#8A2452]/10"
                }`}
              >
                Read as linear draft ({activeDraftClippings.length} cards)
              </button>
            </div>
          </div>

          {viewMode === "board" ? (
            /* SPATIAL PINBOARD VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {clippings.map((clip, idx) => {
                const isFocused = focusedId === clip.id;
                const isUltramarine = clip.ink === "ultramarine";
                return (
                  <article
                    key={clip.id}
                    onClick={() => setFocusedId(clip.id)}
                    className={`rounded-xl border-2 bg-[#FAF8F5] p-6 transition-all cursor-pointer flex flex-col justify-between ${
                      isUltramarine
                        ? "border-[#1D35A6]"
                        : "border-[#8A2452]"
                    } ${
                      isFocused
                        ? isUltramarine
                          ? "shadow-[5px_5px_0px_#1D35A6]"
                          : "shadow-[5px_5px_0px_#8A2452]"
                        : "opacity-95 hover:opacity-100"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-[#1D35A6]/15 pb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-2.5 py-0.5 text-xs font-semibold text-white ${
                              isUltramarine ? "bg-[#1D35A6]" : "bg-[#8A2452]"
                            }`}
                          >
                            {clip.kind}
                          </span>
                          <span className="text-xs font-medium text-[#363C48]">
                            Pin #{idx + 1}
                          </span>
                        </div>

                        <label
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-medium text-[#1D35A6] cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={clip.includedInDraft}
                            onChange={() => toggleClippingInDraft(clip.id)}
                            className="h-4 w-4 accent-[#1D35A6] rounded"
                          />
                          <span>Include in essay</span>
                        </label>
                      </div>

                      <h3 className="mt-4 text-xl font-bold text-[#1D35A6] leading-snug">
                        {clip.title}
                      </h3>

                      {/* Special visual content per media type */}
                      {clip.kind === "Voice memo" && (
                        <div className="mt-3 rounded-lg border border-[#8A2452]/30 bg-[#8A2452]/8 p-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPlayingMemo((p) => !p);
                            }}
                            className="shrink-0 rounded-full bg-[#8A2452] px-3 py-1 text-xs font-semibold text-white hover:bg-[#6e1b40]"
                          >
                            {isPlayingMemo ? "Pause audio" : "Play 01:18"}
                          </button>
                          <svg
                            viewBox="0 0 200 28"
                            className="h-7 flex-1"
                            aria-hidden="true"
                          >
                            {[
                              8, 16, 22, 12, 25, 18, 9, 14, 24, 20, 11, 19, 26,
                              15, 10, 21, 17, 23, 13, 8, 18, 24, 14, 10,
                            ].map((h, i) => (
                              <rect
                                key={i}
                                x={i * 8 + 2}
                                y={(28 - h) / 2}
                                width="4"
                                height={h}
                                rx="2"
                                fill={
                                  isPlayingMemo && i < 12
                                    ? "#1D35A6"
                                    : "#8A2452"
                                }
                              />
                            ))}
                          </svg>
                        </div>
                      )}

                      {clip.kind === "Field diagram" && (
                        <div className="mt-3 rounded-lg border border-[#1D35A6]/30 bg-[#1D35A6]/5 p-3">
                          <svg
                            viewBox="0 0 280 74"
                            className="w-full h-16"
                            aria-hidden="true"
                          >
                            <path
                              d="M 20 64 L 95 16 L 95 64 L 170 16 L 170 64 L 245 16 L 245 64"
                              fill="none"
                              stroke="#1D35A6"
                              strokeWidth="2"
                            />
                            <line
                              x1="95"
                              y1="16"
                              x2="65"
                              y2="58"
                              stroke="#8A2452"
                              strokeWidth="1.5"
                              strokeDasharray="3 3"
                            />
                            <line
                              x1="170"
                              y1="16"
                              x2="140"
                              y2="58"
                              stroke="#8A2452"
                              strokeWidth="1.5"
                              strokeDasharray="3 3"
                            />
                            <text
                              x="182"
                              y="44"
                              fill="#1D35A6"
                              fontSize="10"
                              fontWeight="600"
                            >
                              60° North glazing
                            </text>
                          </svg>
                        </div>
                      )}

                      <p className="mt-3 text-sm sm:text-base leading-[1.6] text-[#363C48]">
                        {clip.content}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-[#1D35A6]/15 pt-3 flex items-center justify-between text-xs text-[#363C48]/80">
                      <span>{clip.source}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewMode("manuscript");
                        }}
                        className="font-semibold text-[#8A2452] underline underline-offset-2"
                      >
                        Read in draft
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* LINEAR MANUSCRIPT VIEW */
            <div className="mx-auto max-w-3xl rounded-xl border-2 border-[#1D35A6] bg-[#FAF8F5] p-6 sm:p-12 shadow-[4px_4px_0px_#8A2452]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1D35A6]/15 pb-4 mb-6">
                <div>
                  <span className="rounded bg-[#8A2452] px-2.5 py-1 text-xs font-semibold text-white">
                    Compiled Manuscript View
                  </span>
                </div>
                <span className="text-xs font-medium text-[#363C48]">
                  Assembled live from {activeDraftClippings.length} pinned studio
                  cards
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#1D35A6] leading-tight">
                Sawtooth roof geometry and shadowless daylight in historic
                workshops
              </h3>

              {activeDraftClippings.length === 0 ? (
                <p className="mt-6 text-base text-[#8A2452]">
                  All cards are currently unchecked. Switch back to the spatial
                  pinboard and check at least one clipping to assemble the
                  manuscript.
                </p>
              ) : (
                <div className="mt-6 space-y-5 text-base sm:text-lg leading-[1.7] text-[#363C48]">
                  {activeDraftClippings.map((clip, i) => (
                    <div
                      key={clip.id}
                      className="group relative rounded-lg border border-transparent hover:border-[#1D35A6]/30 hover:bg-[#E6E2DC]/40 p-3 -mx-3 transition-colors"
                    >
                      <p>{clip.manuscriptParagraph}</p>
                      <div className="mt-1.5 flex items-center justify-between text-xs text-[#1D35A6] font-medium">
                        <span>
                          Citation [{i + 1}]: {clip.source} ({clip.kind})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setFocusedId(clip.id);
                            setViewMode("board");
                          }}
                          className="underline hover:text-[#8A2452]"
                        >
                          Locate on pinboard
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Multi-Modal Capture Breakdown */}
        <section className="mt-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D35A6] leading-tight">
              Every medium is a first-class note on the same table
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-[1.6] text-[#363C48]">
              You shouldn’t need one app for PDF highlights, another for voice
              memos, and a third for spatial moodboards.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border-2 border-[#1D35A6] bg-[#FAF8F5] p-6 shadow-[4px_4px_0px_#1D35A6]">
              <div className="inline-block rounded bg-[#8A2452] px-2.5 py-1 text-xs font-semibold text-white">
                Field audio & transcripts
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#1D35A6]">
                 Whisper-accurate local transcription linked to waveform timestamps
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-[1.6] text-[#363C48]">
                Record a walk-through on your phone. Marrow transcribes it
                offline on your machine and lets you highlight any sentence to
                create a playable audio clipping on your board.
              </p>
            </div>

            <div className="rounded-xl border-2 border-[#1D35A6] bg-[#FAF8F5] p-6 shadow-[4px_4px_0px_#1D35A6]">
              <div className="inline-block rounded bg-[#1D35A6] px-2.5 py-1 text-xs font-semibold text-white">
                PDFs & archival scans
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#1D35A6]">
                Crop a figure from a 400-page monograph and keep its page number
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-[1.6] text-[#363C48]">
                Drag any region of a PDF onto your canvas. Clicking the clipping
                years later opens the original source page at the exact
                paragraph you highlighted.
              </p>
            </div>

            <div className="rounded-xl border-2 border-[#1D35A6] bg-[#FAF8F5] p-6 shadow-[4px_4px_0px_#1D35A6]">
              <div className="inline-block rounded bg-[#8A2452] px-2.5 py-1 text-xs font-semibold text-white">
                Two-way outline sync
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#1D35A6]">
                Rearrange cards on the wall to reorder paragraphs in your draft
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-[1.6] text-[#363C48]">
                Spatial arrangement and linear writing are two views of the same
                underlying files. Edit a sentence in the manuscript and the card
                on your studio wall updates immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          id="open-board"
          className="mt-24 rounded-2xl border-2 border-[#1D35A6] bg-[#FAF8F5] p-8 sm:p-12 shadow-[6px_6px_0px_#8A2452] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-[#1D35A6]">
              Turn scattered clippings into finished work
            </h2>
            <p className="mt-2 text-base text-[#363C48] leading-[1.6]">
              Download Marrow Studio for macOS, Linux, and iPadOS. Free for
              personal local vaults, with optional end-to-end encrypted sync
              between your desk and field devices.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setViewMode(viewMode === "board" ? "manuscript" : "board");
                window.scrollTo({ top: 220, behavior: "smooth" });
              }}
              className="rounded-lg border-2 border-[#1D35A6] bg-[#1D35A6] px-5 py-3 text-sm font-semibold text-[#FAF8F5] shadow-[3px_3px_0px_#8A2452] hover:translate-y-px transition-all"
            >
              Toggle the live studio demo
            </button>
            <a
              href="#open-board"
              className="rounded-lg border-2 border-[#1D35A6] bg-transparent px-5 py-3 text-sm font-semibold text-[#1D35A6] hover:bg-[#1D35A6]/10 transition-colors"
            >
              Download for macOS & iPad
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
