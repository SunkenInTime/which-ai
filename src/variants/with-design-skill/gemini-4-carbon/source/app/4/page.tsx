"use client";

import { useState } from "react";

type SeasonKey = "2024" | "2025" | "2026";

interface SpecimenStage {
  key: SeasonKey;
  seasonLabel: string;
  specimenCode: string;
  collectedDate: string;
  location: string;
  title: string;
  observation: string;
  fieldMargin: string;
  linkedSpecimens: string[];
  maturityNote: string;
}

const SPECIMEN_TRAIL: Record<SeasonKey, SpecimenStage> = {
  "2024": {
    key: "2024",
    seasonLabel: "October 2024",
    specimenCode: "Entry 104",
    collectedDate: "14 October 2024, 07:18",
    location: "Kitchen bench, 16°C indoor temp",
    title: "Rye starter stalls below seventeen degrees",
    observation:
      "Left the country loaf on the north counter overnight after the first frost. Barely rose by dawn, yet the crust baked deeper chestnut with mild lactic sweetness instead of sharp vinegar.",
    fieldMargin:
      "Jotted in 25 seconds on phone with flour on thumb. No tags added.",
    linkedSpecimens: [
      " Flour water temperature log (Sep 2024)",
      " Maltose activity in cold doughs (clipped PDF)",
    ],
    maturityNote: "Stage 1: A raw two-sentence observation saved before breakfast.",
  },
  "2025": {
    key: "2025",
    seasonLabel: "March 2025",
    specimenCode: "Entry 289",
    collectedDate: "22 March 2025, 19:40",
    location: "Reading table, Tartine Book No. 3",
    title: "Cold retardation shifts yeast-to-bacteria ratio",
    observation:
      "At 15°C wild yeast slows faster than heterofermentative lactobacilli, except acetic acid drops when hydration stays above 78%. Cairn surfaced October's cold-counter note right beside this paragraph.",
    fieldMargin:
      "Connected automatically via shared temperature and fermentation notes.",
    linkedSpecimens: [
      " Entry 104: Rye starter stalls below seventeen degrees",
      " Baltic rye scalding ratios (Jan 2025)",
    ],
    maturityNote: "Stage 2: Six months later, a book excerpt explains October's accident.",
  },
  "2026": {
    key: "2026",
    seasonLabel: "November 2026",
    specimenCode: "Entry 612",
    collectedDate: "08 November 2026, 11:05",
    location: "Published winter baking guide",
    title: "Winter schedule for unheated home kitchens",
    observation:
      "Synthesized fourteen seasonal bake logs from 2024–2026 into a reliable winter table: warm 31°C mix water for the first ninety minutes, then sixteen hours on a cool windowsill.",
    fieldMargin:
      "Assembled by pulling fourteen linked entries onto one page.",
    linkedSpecimens: [
      " Entry 104: Rye starter stalls below seventeen degrees",
      " Entry 289: Cold retardation shifts yeast-to-bacteria ratio",
      " Twelve winter bake logs (2024–2026)",
    ],
    maturityNote:
      "Stage 3: Two years of tiny fragments mature into a repeatable craft guide.",
  },
};

const SEASONS: SeasonKey[] = ["2024", "2025", "2026"];

export default function IterationFourPage() {
  const [season, setSeason] = useState<SeasonKey>("2025");
  const current = SPECIMEN_TRAIL[season];

  return (
    <div
      className="min-h-screen bg-[#DCE3D8] text-[#182920] selection:bg-[#4D43A3] selection:text-[#F2F5EF]"
      style={{ fontFamily: "var(--font-hanken), system-ui, sans-serif" }}
    >
      {/* Top Bar */}
      <header className="border-b border-[#182920]/12">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
          <div className="flex items-baseline gap-3.5">
            <span
              className="text-2xl font-medium tracking-tight text-[#182920]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Cairn
            </span>
            <span className="hidden text-sm text-[#496053] sm:inline">
              Long-horizon notebook for patient thinkers
            </span>
          </div>

          <nav aria-label="Primary" className="flex items-center gap-6 text-sm font-medium">
            <a
              href="#compounding"
              className="hidden text-[#354B3F] hover:text-[#182920] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4D43A3] sm:inline"
            >
              Organic organization
            </a>
            <a
              href="#practitioners"
              className="hidden text-[#354B3F] hover:text-[#182920] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4D43A3] sm:inline"
            >
              Field notebooks
            </a>
            <a
              href="#begin"
              className="rounded-full bg-[#4D43A3] px-4 py-2 text-[#F2F5EF] transition-colors hover:bg-[#3F368C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D43A3]"
            >
              Download Cairn
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Asymmetric Herbarium Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 sm:px-10 lg:pt-20 lg:pb-28">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Left 5 Columns: Calm Thesis */}
            <div className="lg:col-span-5 lg:pt-4">
              <h1
                className="text-4xl font-medium leading-[1.12] tracking-[-0.02em] text-[#182920] sm:text-5xl"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Keep rough field notes today. Let time reveal how they belong
                together.
              </h1>

              <p className="mt-6 max-w-[50ch] text-lg leading-[1.65] text-[#334A3D]">
                Most second-brain systems collapse because they demand tidy
                hierarchies on day one. Cairn treats every note like a pressed
                field specimen: stamped with when and where you found it, free
                to send roots to later notes across the years.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#begin"
                  className="rounded-full bg-[#4D43A3] px-6 py-3.5 text-base font-medium text-[#F2F5EF] transition-colors hover:bg-[#3E358A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D43A3]"
                >
                  Start your archive on Mac
                </a>
                <a
                  href="#compounding"
                  className="rounded-full border border-[#182920]/25 bg-[#F2F5EF]/70 px-5 py-3.5 text-base font-medium text-[#182920] transition-colors hover:bg-[#F2F5EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D43A3]"
                >
                  See how notes mature
                </a>
              </div>

              <p className="mt-6 max-w-[44ch] text-sm leading-relaxed text-[#496053]">
                Plain local Markdown files, zero forced folders, and gentle
                seasonal recall that works completely offline.
              </p>
            </div>

            {/* Right 7 Columns: Mounted Herbarium Specimen Sheet */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#182920]/18 bg-[#CFD8CA] p-4 sm:p-6">
                {/* Season Switcher above Mounting Sheet */}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-medium text-[#354B3F]">
                    Follow one idea across three seasons:
                  </span>
                  <div
                    role="tablist"
                    aria-label="Follow specimen across three years"
                    className="inline-flex rounded-full border border-[#182920]/15 bg-[#DCE3D8] p-1"
                  >
                    {SEASONS.map((yr) => {
                      const stage = SPECIMEN_TRAIL[yr];
                      const active = season === yr;
                      return (
                        <button
                          key={yr}
                          role="tab"
                          type="button"
                          aria-selected={active}
                          onClick={() => setSeason(yr)}
                          className={`rounded-full px-3.5 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4D43A3] ${
                            active
                              ? "bg-[#4D43A3] text-[#F2F5EF]"
                              : "text-[#2E4438] hover:text-[#182920]"
                          }`}
                        >
                          {stage.seasonLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pressed Specimen Sheet with Botanical Mounting Tape Marks */}
                <article
                  role="tabpanel"
                  aria-live="polite"
                  className="relative rounded-xl border border-[#182920]/20 bg-[#F2F5EF] p-6 sm:p-8"
                >
                  {/* Subtle Botanical Gummed-Tape Corner Strips */}
                  <span
                    aria-hidden="true"
                    className="absolute top-3 left-3 h-1.5 w-6 -rotate-12 bg-[#C8D3C2]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 h-1.5 w-6 rotate-12 bg-[#C8D3C2]"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#182920]/12 pb-4 text-xs text-[#496053]">
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-full border border-[#4D43A3]/35 bg-[#4D43A3]/10 px-2.5 py-0.5 font-semibold text-[#4D43A3]">
                        {current.specimenCode}
                      </span>
                      <span>{current.collectedDate}</span>
                    </div>
                    <span>{current.location}</span>
                  </div>

                  {/* Subtle Botanical Stolon Diagram + Note Content */}
                  <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-12">
                    <div className="sm:col-span-8">
                      <h2
                        className="text-2xl font-medium leading-snug text-[#182920]"
                        style={{
                          fontFamily: "var(--font-fraunces), Georgia, serif",
                        }}
                      >
                        {current.title}
                      </h2>

                      <p className="mt-3 text-[16px] leading-[1.7] text-[#283E31]">
                        {current.observation}
                      </p>

                      <p className="mt-4 border-l-2 border-[#4D43A3]/50 pl-3.5 text-xs leading-relaxed text-[#496053]">
                        {current.fieldMargin}
                      </p>
                    </div>

                    {/* Organic Root/Stolon Graphic showing growth stage */}
                    <div className="flex flex-col justify-between rounded-lg border border-[#182920]/12 bg-[#E7EDE3] p-4 sm:col-span-4">
                      <span className="text-xs font-medium text-[#354B3F]">
                        Root network ({season})
                      </span>

                      <svg
                        aria-hidden="true"
                        viewBox="0 0 140 110"
                        className="my-2 h-24 w-full"
                        fill="none"
                      >
                        {/* Base stem */}
                        <path
                          d="M25 85 C 45 65, 60 55, 72 30"
                          stroke="#182920"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />
                        <circle cx="25" cy="85" r="5" fill="#4D43A3" />
                        <circle
                          cx="72"
                          cy="30"
                          r="4.5"
                          fill={season !== "2024" ? "#4D43A3" : "#9FB0A4"}
                        />
                        {season !== "2024" && (
                          <path
                            d="M52 58 C 75 56, 95 66, 115 48"
                            stroke="#4D43A3"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                          />
                        )}
                        {season !== "2024" && (
                          <circle cx="115" cy="48" r="4.5" fill="#4D43A3" />
                        )}
                        {season === "2026" && (
                          <>
                            <path
                              d="M52 58 C 68 78, 92 86, 118 82"
                              stroke="#4D43A3"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                            />
                            <circle cx="118" cy="82" r="4.5" fill="#182920" />
                            <path
                              d="M72 30 C 88 18, 102 18, 116 22"
                              stroke="#182920"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <circle cx="116" cy="22" r="3.5" fill="#4D43A3" />
                          </>
                        )}
                      </svg>

                      <span className="text-[11px] leading-snug text-[#354B3F]">
                        {current.maturityNote}
                      </span>
                    </div>
                  </div>

                  {/* Herbarium Label Stamp at Bottom Right */}
                  <div className="mt-6 border-t border-[#182920]/12 pt-4">
                    <p className="text-xs font-semibold text-[#182920]">
                      Connected specimens surfaced by Cairn:
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {current.linkedSpecimens.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-[#182920]/15 bg-[#E7EDE3] px-3 py-1 text-xs text-[#283E31]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Ledger: Filing Cabinets vs Living Field Press */}
        <section
          id="compounding"
          className="border-y border-[#182920]/12 bg-[#CFD8CA] py-20 lg:py-24"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className="max-w-2xl">
              <h2
                className="text-3xl font-medium leading-snug text-[#182920] sm:text-4xl"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Stop spending Sunday afternoons reorganizing old folders.
              </h2>
              <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-[#334A3D]">
                When software forces you to build dashboards and database
                schemas before taking a note, you end up maintaining the cabinet
                instead of doing the work.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 border-t border-[#182920]/15 md:grid-cols-2">
              <div className="border-b border-[#182920]/15 py-8 md:border-r md:border-b-0 md:pr-10">
                <h3
                  className="text-xl font-medium text-[#496053]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Rigid wiki hierarchies
                </h3>
                <ul className="mt-5 space-y-3.5 text-[15px] leading-relaxed text-[#3D5346]">
                  <li>
                    Requires naming a folder before you know whether an idea
                    matters.
                  </li>
                  <li>
                    Half-finished observations feel messy alongside formal
                    project docs, so you hesitate to write them down.
                  </li>
                  <li>
                    Notes from two years ago never resurface unless you remember
                    the exact keyword to search.
                  </li>
                </ul>
              </div>

              <div className="py-8 md:pl-10">
                <h3
                  className="text-xl font-medium text-[#4D43A3]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Cairn&apos;s field archive
                </h3>
                <ul className="mt-5 space-y-3.5 text-[15px] leading-relaxed text-[#182920]">
                  <li>
                    Every entry enters a calm chronological stream stamped with
                    date, source, and optional place.
                  </li>
                  <li>
                    Voice transcripts, quick kitchen measurements, and book
                    clippings live comfortably side by side.
                  </li>
                  <li>
                    Important themes earn density naturally as new entries link
                    back to older ones over months.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real Practitioners Section */}
        <section id="practitioners" className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:py-24">
          <h2
            className="max-w-xl text-3xl font-medium leading-snug text-[#182920]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Kept by people whose curiosity outlasts any single project
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-[#182920]/15 pt-10 md:grid-cols-3">
            <div>
              <h3
                className="text-lg font-medium text-[#182920]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Violin maker in Cremona
              </h3>
              <p className="mt-2.5 max-w-[40ch] text-[15px] leading-relaxed text-[#334A3D]">
                Logs spruce tap-tones, varnish drying humidity, and recordings
                of finished instruments so a bench decision from four winters
                ago guides the current soundboard.
              </p>
            </div>

            <div>
              <h3
                className="text-lg font-medium text-[#182920]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Teaching physician in Boston
              </h3>
              <p className="mt-2.5 max-w-[40ch] text-[15px] leading-relaxed text-[#334A3D]">
                Keeps de-identified diagnostic pearls and journal clippings
                offline on a personal laptop, pulling decades of rare
                presentations into morning rounds teaching.
              </p>
            </div>

            <div>
              <h3
                className="text-lg font-medium text-[#182920]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Landscape historian in Oslo
              </h3>
              <p className="mt-2.5 max-w-[40ch] text-[15px] leading-relaxed text-[#334A3D]">
                Stores parish archive transcriptions, lichen photographs, and
                interview snippets in one local directory backed up with Git and
                Time Machine.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Download Section */}
        <section
          id="begin"
          className="bg-[#182920] py-20 text-[#EBF0E8]"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2
                  className="text-3xl font-medium leading-snug text-[#F2F5EF] sm:text-4xl"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Plant your first handful of notes this afternoon.
                </h2>
                <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-[#C2D1C6]">
                  Download Cairn free for macOS, Windows, or Linux with no time
                  limits and no cloud account required. Add encrypted mobile
                  sync whenever you want field capture on your phone.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:col-span-5 lg:justify-end">
                <a
                  href="#begin"
                  className="rounded-full bg-[#DCE3D8] px-6 py-3.5 text-base font-semibold text-[#182920] transition-colors hover:bg-[#F2F5EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCE3D8]"
                >
                  Download for macOS
                </a>
                <a
                  href="#begin"
                  className="rounded-full border border-[#DCE3D8]/35 px-5 py-3.5 text-base font-medium text-[#F2F5EF] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCE3D8]"
                >
                  iOS, Linux & Windows
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#182920] py-7 text-xs text-[#9BB0A2]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 sm:flex-row sm:px-10">
          <span>Cairn Field Archive, plain Markdown on your own machine</span>
          <div className="flex flex-wrap gap-6">
            <a href="#compounding" className="hover:text-white">
              Import from Obsidian or Bear
            </a>
            <a href="#practitioners" className="hover:text-white">
              Offline guarantee
            </a>
            <a href="#begin" className="hover:text-white">
              Download v2.4
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
