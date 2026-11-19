"use client";

import { useState } from "react";

type GrowthStage = "seedling" | "budding" | "evergreen";

interface StageNote {
  id: GrowthStage;
  label: string;
  badge: string;
  accentBg: string;
  accentText: string;
  tendedText: string;
  title: string;
  body: string;
  roots: string[];
  branches: string[];
  words: number;
}

const STAGE_NOTES: Record<GrowthStage, StageNote> = {
  seedling: {
    id: "seedling",
    label: "Seedling",
    badge: "RAW CAPTURE",
    accentBg: "bg-[#E7F0E3]",
    accentText: "text-[#3B6A49]",
    tendedText: "Planted today · 07:42 morning walk",
    title: "Why walking untangles stuck thoughts",
    body: "Dictated by the river: whenever I step away from a screen for twenty minutes, two unrelated problems suddenly fit together. Is it the slow cadence of footsteps, or just letting the default mode network breathe without tabs?",
    roots: ["Voice Memo · Nov 18"],
    branches: ["Suggested link: Attention Restoration"],
    words: 41,
  },
  budding: {
    id: "budding",
    label: "Budding",
    badge: "TAKING SHAPE",
    accentBg: "bg-[#F5EBD8]",
    accentText: "text-[#A6631B]",
    tendedText: "Tended 4 times · Linked to 3 notes",
    title: "Slow movement expands associative memory",
    body: "Combining Oppezzo & Schwartz’s Stanford study with my own morning journals: divergent ideation rises ~60% during unhurried walks. A second brain shouldn’t force desk-bound outlining—it should catch sparks mid-stride and weave them gently when you return.",
    roots: [
      "Oppezzo (2014) · Give Your Ideas Some Legs",
      "Kaplan · Attention Restoration Theory",
    ],
    branches: ["[[Quiet Interfaces]]", "[[Morning Pages Ritual]]"],
    words: 98,
  },
  evergreen: {
    id: "evergreen",
    label: "Evergreen",
    badge: "MATURE INSIGHT",
    accentBg: "bg-[#1D3B2B]",
    accentText: "text-[#E6F1E8]",
    tendedText: "Tended 11 times · Cited in 2 essays",
    title: "Design creative workflows around rhythms of rest",
    body: "Original thinking follows an ecological cycle: wide open gathering, quiet incubation away from screens, and patient synthesis. Tools that celebrate uninterrupted deep focus—instead of red notification badges and streak pressure—turn raw curiosity into a lifelong body of work.",
    roots: [
      "Oppezzo (2014) · Walking & Creativity",
      "Cal Newport · Slow Productivity",
      "Kyoto Notebook · May 2025",
    ],
    branches: [
      "[[Essay: Calm Software]]",
      "[[Spaced Serendipity]]",
      "[[Digital Gardening]]",
    ],
    words: 214,
  },
};

const SERENDIPITY_CARDS = [
  {
    date: "May 14, 2025 · 18 months ago",
    source: "Kyoto Train Journal",
    stage: "Budding",
    quote:
      "“Notice how Japanese tea houses narrow the doorway so you must duck slightly—a tiny architectural threshold that separates hurry from attention.”",
    connection: "Resurfaced because you wrote about ‘quiet thresholds’ yesterday.",
  },
  {
    date: "January 08, 2026 · 10 months ago",
    source: "Reading Notes · Mary Oliver",
    stage: "Evergreen",
    quote:
      "“Attention is the beginning of devotion. Collecting highlights means nothing unless we sit quietly with one sentence long enough for it to change how we see.”",
    connection: "Resurfaced beside your note on Slow Reading Habits.",
  },
  {
    date: "September 22, 2025 · 14 months ago",
    source: "Studio Margin Note",
    stage: "Seedling",
    quote:
      "“What if our software aged gracefully like cedar and linen—calmer and more familiar in year five than on day one?”",
    connection: "Linked to 4 notes in your Craft & Software cluster.",
  },
  {
    date: "March 03, 2026 · 8 months ago",
    source: "Dinner Conversation with Maya",
    stage: "Budding",
    quote:
      "“We don’t suffer from a shortage of information; we suffer from never revisiting the best things we already discovered.”",
    connection: "Shared theme with your Spaced Synthesis note.",
  },
];

function StageIcon({ stage }: { stage: GrowthStage }) {
  if (stage === "seedling") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 20V11M12 11C12 7.5 14.5 5 18 5C18 8.5 15.5 11 12 11ZM12 13C12 10.5 10 8.5 7 8.5C7 11 9 13 12 13Z"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (stage === "budding") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21V6M12 6C12 3.5 15 3 17 5C17 7.5 14.5 8.5 12 8.5M12 11C9.5 11 6.5 9.5 6.5 7C9 7 12 8.5 12 11ZM12 15C14.5 15 17.5 13.5 17.5 11C15 11 12 12.5 12 15Z"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21V5M12 4L7.5 10H16.5L12 4ZM12 8.5L6.5 15H17.5L12 8.5ZM12 13L5.5 19H18.5L12 13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IterationFour() {
  const [stage, setStage] = useState<GrowthStage>("budding");
  const [memoryIdx, setMemoryIdx] = useState<number>(0);

  const activeStage = STAGE_NOTES[stage];
  const activeMemory = SERENDIPITY_CARDS[memoryIdx];

  function shuffleMemory() {
    setMemoryIdx((prev) => (prev + 1) % SERENDIPITY_CARDS.length);
  }

  return (
    <div className="min-h-screen bg-garden-linen text-[#15291E] font-humanist selection:bg-[#3D6B4F]/20 selection:text-[#15291E]">
      {/* Tranquil Floating Pill Navigation */}
      <div className="sticky top-0 z-30 px-4 pt-4 sm:px-6">
        <header className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-[#D4DFD1] bg-[#FCFDF9]/90 px-4 py-2.5 shadow-[0_10px_35px_-18px_rgba(21,41,30,0.2)] backdrop-blur-lg sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D3B2B] text-[#E6F1E8]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 20V8M12 8C12 4.5 15.5 3 19 4C19 8 16 11 12 11M12 12C9 12 6 9.5 6 6C9.5 6 12 8.5 12 12Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-organic text-xl font-medium tracking-tight text-[#15291E]">
              noema
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-[13.5px] font-medium text-[#475E50] md:flex">
            <a href="#garden" className="transition-colors hover:text-[#15291E]">
              Growth Cycle
            </a>
            <a href="#rituals" className="transition-colors hover:text-[#15291E]">
              Rituals
            </a>
            <a href="#serendipity" className="transition-colors hover:text-[#15291E]">
              Serendipity
            </a>
            <a href="#membership" className="transition-colors hover:text-[#15291E]">
              Membership
            </a>
          </nav>

          <a
            href="#membership"
            className="rounded-full bg-[#1D3B2B] px-4 py-2 text-[13px] font-medium text-[#F3F5EF] transition-all hover:bg-[#345E45]"
          >
            Plant your vault
          </a>
        </header>
      </div>

      {/* Serene Hero + Interactive Idea Growth Garden */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Calm Hero Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C9D8C5] bg-[#E8F0E5]/80 px-3.5 py-1.5 text-[12px] font-medium text-[#2F583E]">
              <span className="h-2 w-2 rounded-full bg-[#4B815D]" />
              A calm second brain · No streaks, no noise
            </div>

            <h1 className="mt-6 font-organic text-[3rem] font-normal leading-[1.03] tracking-[-0.025em] text-[#15291E] sm:text-[4.1rem]">
              A quiet garden where half-formed thoughts{" "}
              <span className="italic text-[#3D6B4F]">grow into clarity.</span>
            </h1>

            <p className="mt-6 max-w-lg text-[16.5px] leading-[1.78] text-[#455B4D]">
              Most note apps treat your mind like a warehouse to organize. Noema
              tends your ideas like a living garden—capturing sparks effortlessly,
              nurturing connections over seasons, and gently resurfacing forgotten
              wisdom right when you need it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#membership"
                className="inline-flex items-center gap-2 rounded-full bg-[#1D3B2B] px-6 py-3.5 text-[14.5px] font-medium text-[#F5F7F2] shadow-[0_12px_30px_-10px_rgba(29,59,43,0.45)] transition-all hover:bg-[#2F583E]"
              >
                Begin for free
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#serendipity"
                className="inline-flex items-center gap-2 rounded-full border border-[#C8D5C5] bg-[#FCFDF9] px-6 py-3.5 text-[14.5px] font-medium text-[#1D3B2B] transition-colors hover:border-[#3D6B4F]"
              >
                Try daily serendipity
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#5B7062]">
              <span className="flex items-center gap-1.5">
                <span className="text-[#3D6B4F]">●</span> Local Markdown files
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#3D6B4F]">●</span> Works offline forever
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#3D6B4F]">●</span> Private by design
              </span>
            </div>
          </div>

          {/* Right Interactive Growth Stage Card */}
          <div id="garden" className="lg:col-span-6">
            <div className="rounded-[30px] border border-[#D4DFD0] bg-[#FCFDF9] p-5 shadow-[0_28px_70px_-30px_rgba(21,41,30,0.18)] sm:p-7">
              {/* Stage Selector Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7EEE4] pb-5">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#667B6D]">
                  Watch a thought mature
                </span>
                <div className="flex rounded-full bg-[#EDF2EA] p-1">
                  {(["seedling", "budding", "evergreen"] as const).map((key) => {
                    const isSelected = stage === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setStage(key)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#1D3B2B] text-[#F5F7F2] shadow-xs"
                            : "text-[#4D6355] hover:text-[#15291E]"
                        }`}
                      >
                        <span className="capitalize">{key}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Note Foliage Body */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10.5px] font-medium tracking-wider ${activeStage.accentBg} ${activeStage.accentText}`}
                  >
                    <StageIcon stage={activeStage.id} />
                    {activeStage.badge}
                  </span>
                  <span className="font-mono text-[11px] text-[#728578]">
                    {activeStage.tendedText}
                  </span>
                </div>

                <h2 className="mt-5 font-organic text-[1.75rem] leading-[1.18] text-[#15291E] sm:text-[2rem]">
                  {activeStage.title}
                </h2>

                <p className="mt-4 text-[15px] leading-[1.82] text-[#43584B]">
                  {activeStage.body}
                </p>

                {/* Roots & Branches Grid */}
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#E4ECE1] bg-[#F5F8F3] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#667B6D]">
                      Roots (Sources)
                    </div>
                    <ul className="mt-2.5 space-y-1.5 text-[12.5px] font-medium text-[#2A4234]">
                      {activeStage.roots.map((r) => (
                        <li key={r} className="flex items-start gap-2">
                          <span className="text-[#C9812A]">↳</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-[#E4ECE1] bg-[#F5F8F3] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#667B6D]">
                      Branches (Links)
                    </div>
                    <ul className="mt-2.5 space-y-1.5 text-[12.5px] font-medium text-[#2F583E]">
                      {activeStage.branches.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="text-[#4B815D]">✦</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Gentle Growth Progress Bar */}
                <div className="mt-6 flex items-center justify-between border-t border-[#E7EEE4] pt-4 text-[12px] text-[#667B6D]">
                  <div className="flex items-center gap-2">
                    <span>Maturity:</span>
                    <div className="flex gap-1.5">
                      {(["seedling", "budding", "evergreen"] as const).map(
                        (s, i) => {
                          const stageOrder =
                            stage === "seedling" ? 0 : stage === "budding" ? 1 : 2;
                          return (
                            <span
                              key={s}
                              className={`h-2 w-7 rounded-full transition-colors ${
                                i <= stageOrder ? "bg-[#3D6B4F]" : "bg-[#DFE7DC]"
                              }`}
                            />
                          );
                        }
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-[11px]">
                    {activeStage.words} words
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Gentle Rituals */}
      <section id="rituals" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#3D6B4F]">
            Organic Workflow
          </span>
          <h2 className="mt-3 font-organic text-4xl leading-tight text-[#15291E] sm:text-5xl">
            Three quiet rituals for a clearer mind.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              step: "Ritual 01",
              title: "Gather without friction",
              desc: "Speak a thought on your morning walk, clip an essay passage, or drop a photo of a book page. No mandatory tags or folders to slow you down.",
              tone: "bg-[#FCFDF9]",
              icon: (
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <circle cx="21" cy="21" r="19" fill="#E9F1E6" />
                  <path
                    d="M21 29V16M21 16C21 12.5 24 10.5 27.5 11C27.5 14.5 24.5 17 21 17M21 19C18 19 15 17 15 13.5C18.5 13.5 21 16 21 19Z"
                    stroke="#2F583E"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
            {
              step: "Ritual 02",
              title: "Tend connections gently",
              desc: "When two thoughts echo each other, weave them together with a quick link. Over months, a rich underground root system connects your curiosity.",
              tone: "bg-[#FCFDF9]",
              icon: (
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <circle cx="21" cy="21" r="19" fill="#F6ECD9" />
                  <circle cx="15" cy="17" r="2.75" stroke="#B47222" strokeWidth="1.7" />
                  <circle cx="27" cy="16" r="2.75" stroke="#B47222" strokeWidth="1.7" />
                  <circle cx="21" cy="27" r="3" fill="#B47222" />
                  <path
                    d="M17.2 19.2L19.6 24.4M25.2 18.4L22.4 24.4M17.8 16.6L24.2 16.2"
                    stroke="#B47222"
                    strokeWidth="1.4"
                  />
                </svg>
              ),
            },
            {
              step: "Ritual 03",
              title: "Harvest original work",
              desc: "Writing an article, book, or talk becomes an act of gathering ripe fruit—assembling years of refined notes into clear prose in a fraction of the time.",
              tone: "bg-[#FCFDF9]",
              icon: (
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <circle cx="21" cy="21" r="19" fill="#E3EDE6" />
                  <path
                    d="M14 27.5C16.5 24 22.5 17.5 28 14C26.5 20.5 22.5 25.5 16 27.5H14Z"
                    stroke="#1D3B2B"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path d="M14 27.5L22 20" stroke="#1D3B2B" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-[26px] border border-[#D8E2D4] ${card.tone} p-8 shadow-[0_14px_40px_-24px_rgba(21,41,30,0.14)]`}
            >
              <div className="flex items-center justify-between">
                {card.icon}
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#728578]">
                  {card.step}
                </span>
              </div>
              <h3 className="mt-7 font-organic text-2xl text-[#15291E]">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.76] text-[#495F51]">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Morning Serendipity Section */}
      <section id="serendipity" className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[34px] border border-[#CFE0CC] bg-[#1D3B2B] p-8 text-[#F3F5EF] shadow-[0_30px_80px_-30px_rgba(21,41,30,0.45)] sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.15em] text-[#CFE3D2]">
                Daily Serendipity
              </span>
              <h2 className="mt-5 font-organic text-3xl leading-[1.1] text-white sm:text-5xl">
                Rediscover your own{" "}
                <span className="italic text-[#F2C382]">forgotten wisdom.</span>
              </h2>
              <p className="mt-5 text-[15.5px] leading-[1.78] text-[#C8D9CC]">
                Every morning, Noema softly places a single note from months or years
                ago beside your blank page—no streak counters, no guilt, just quiet
                creative delight.
              </p>
              <button
                type="button"
                onClick={shuffleMemory}
                className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#F2C382] px-5 py-3 text-[14px] font-semibold text-[#15291E] transition-transform hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <span>Resurface another memory</span>
                <span aria-hidden="true">↻</span>
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[26px] border border-white/15 bg-[#FCFDF9] p-7 text-[#15291E] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.35)] sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7EEE4] pb-4 font-mono text-[11px] text-[#667B6D]">
                  <span>{activeMemory.date}</span>
                  <span className="rounded-full bg-[#E8F0E5] px-2.5 py-0.5 text-[#2F583E]">
                    {activeMemory.stage}
                  </span>
                </div>

                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#B47222]">
                  {activeMemory.source}
                </p>

                <blockquote className="mt-3 font-organic text-2xl leading-[1.4] text-[#15291E] sm:text-[1.75rem]">
                  {activeMemory.quote}
                </blockquote>

                <div className="mt-7 flex items-center justify-between gap-4 rounded-2xl bg-[#F3F6F0] px-4 py-3 text-[13px] text-[#3B5544]">
                  <span>✦ {activeMemory.connection}</span>
                  <span className="shrink-0 font-mono text-[11px] text-[#728578]">
                    {memoryIdx + 1} / {SERENDIPITY_CARDS.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calm Voices */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "Opening Noema lowers my heart rate. Instead of drowning in 400 nested folders, I actually look forward to spending twenty minutes tending my notes with morning tea.",
              name: "Hannah Sorensen",
              role: "Botanical Illustrator & Author",
            },
            {
              quote:
                "The Seedling → Budding → Evergreen rhythm changed how I write. I no longer expect a first draft to be perfect—I just plant it and let it mature.",
              name: "Devon Park",
              role: "Design Director & Researcher",
            },
            {
              quote:
                "Daily Serendipity resurfaced a reading note from 2024 that became the thesis of my keynote. It feels like having a thoughtful archivist on my own laptop.",
              name: "Priya Natarajan",
              role: "Climate Policy Fellow",
            },
          ].map((voice) => (
            <figure
              key={voice.name}
              className="flex flex-col justify-between rounded-[26px] border border-[#D8E2D4] bg-[#FCFDF9] p-7"
            >
              <blockquote className="font-organic text-[20px] leading-[1.5] text-[#1E3527]">
                “{voice.quote}”
              </blockquote>
              <figcaption className="mt-7 border-t border-[#E8EFE5] pt-4">
                <div className="text-[14px] font-semibold text-[#15291E]">
                  {voice.name}
                </div>
                <div className="text-[12.5px] text-[#5D7364]">{voice.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Honest Sanctuary Pricing */}
      <section id="membership" className="mx-auto max-w-5xl px-6 py-16 pb-24">
        <div className="text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#3D6B4F]">
            Kind, Sustainable Pricing
          </span>
          <h2 className="mt-2 font-organic text-4xl text-[#15291E] sm:text-5xl">
            Plant your garden free. Grow at your own pace.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-[28px] border border-[#D6E1D2] bg-[#FCFDF9] p-9">
            <div>
              <span className="rounded-full bg-[#E8F0E5] px-3 py-1 font-mono text-[10.5px] text-[#2F583E]">
                PERSONAL GARDEN
              </span>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-organic text-5xl text-[#15291E]">$0</span>
                <span className="text-[14px] text-[#667B6D]">forever, locally</span>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#495F51]">
                Everything you need to cultivate a private, offline second brain on
                your computer in clean Markdown files.
              </p>
              <ul className="mt-7 space-y-3 text-[14.5px] text-[#273E30]">
                {[
                  "Unlimited seedlings, budding & evergreen notes",
                  "Morning Serendipity resurfacer",
                  "Bi-directional roots & branches view",
                  "100% private on-device semantic recall",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#3D6B4F]">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#top"
              className="mt-9 block rounded-full border border-[#1D3B2B] py-3 text-center text-[14px] font-semibold text-[#1D3B2B] transition-colors hover:bg-[#1D3B2B] hover:text-[#F5F7F2]"
            >
              Download Free App
            </a>
          </div>

          <div className="flex flex-col justify-between rounded-[28px] border border-[#1D3B2B] bg-[#1D3B2B] p-9 text-[#F3F5EF] shadow-[0_24px_60px_-24px_rgba(21,41,30,0.4)]">
            <div>
              <span className="rounded-full bg-[#F2C382]/20 px-3 py-1 font-mono text-[10.5px] text-[#F2C382]">
                KEEPER · SYNC &amp; PUBLISH
              </span>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-organic text-5xl text-white">$8</span>
                <span className="text-[14px] text-[#B8CBBF]">/ month</span>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#C8D9CC]">
                Carry your garden in your pocket with end-to-end encrypted sync,
                walking voice capture, and public digital garden publishing.
              </p>
              <ul className="mt-7 space-y-3 text-[14.5px] text-[#E6F0E8]">
                {[
                  "Everything in Personal Garden",
                  "Encrypted sync across Mac, Linux, iOS & iPad",
                  "Walking voice notes with calm local transcription",
                  "Publish selected evergreen notes as a web garden",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#F2C382]">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#top"
              className="mt-9 block rounded-full bg-[#F2C382] py-3 text-center text-[14px] font-semibold text-[#15291E] transition-colors hover:bg-[#F7D3A0]"
            >
              Start 14-day Free Trial
            </a>
          </div>
        </div>
      </section>

      {/* Warm Organic Footer */}
      <footer className="border-t border-[#D8E2D4] bg-[#ECF1E8]/80 py-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="font-organic text-2xl text-[#15291E]">noema</span>
            <span className="text-[13px] text-[#5D7364]">
              Cultivated calmly · Plain Markdown forever
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-[13px] font-medium text-[#475E50]">
            <a href="#garden" className="hover:text-[#15291E]">Digital Gardening</a>
            <a href="#rituals" className="hover:text-[#15291E]">Privacy</a>
            <a href="#serendipity" className="hover:text-[#15291E]">Changelog</a>
            <a href="#membership" className="hover:text-[#15291E]">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
