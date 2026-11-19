"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookMarked,
  Check,
  Flower2,
  Leaf,
  Mic,
  RefreshCw,
  Sparkles,
  Sprout,
  Sun,
  Trees,
  Wind,
} from "lucide-react";

type Stage = "all" | "seedling" | "budding" | "evergreen";

interface GardenNote {
  id: string;
  stage: Exclude<Stage, "all">;
  title: string;
  summary: string;
  origin: string;
  connections: string[];
  tended: string;
}

const GARDEN_NOTES: GardenNote[] = [
  {
    id: "g1",
    stage: "seedling",
    title: "Why morning walks untangle design problems",
    summary:
      "Voice note from the park: unfocused walking shifts the brain into default-mode wandering, where distant memories cross-pollinate without effort.",
    origin: "Voice Memo · 07:42 AM",
    connections: ["Default Mode Network", "Slow Productivity"],
    tended: "Planted 3 hours ago",
  },
  {
    id: "g2",
    stage: "budding",
    title: "Pattern Languages in Everyday Software",
    summary:
      "Comparing Christopher Alexander's architectural patterns with calm digital tools. Good rooms—and good apps—give you light, shelter, and clear sightlines.",
    origin: "6 Highlights + 2 Journal Entries",
    connections: ["Calm Technology", "Warm Minimalism", "Tools for Thought"],
    tended: "Tended 2 days ago",
  },
  {
    id: "g3",
    stage: "evergreen",
    title: "Curiosity Compounds Faster Than Discipline",
    summary:
      "You don't need a rigid tagging taxonomy to keep a second brain alive. Follow what genuinely fascinates you today, link it to one older note, and leave the garden richer than you found it.",
    origin: "Synthesized across 19 notes",
    connections: ["Digital Gardening", "Intrinsic Motivation", "Spaced Recall"],
    tended: "Evergreen · Revisited 14 times",
  },
  {
    id: "g4",
    stage: "budding",
    title: "The Art of Reading Slowly with a Pencil",
    summary:
      "A book you annotate in your own words becomes a dialogue that lasts decades. Copying quotes verbatim is only half the harvest.",
    origin: "Kindle & Margin Notes",
    connections: ["Active Reading", "Marginalia Craft"],
    tended: "Tended 5 days ago",
  },
];

const RESURFACED_MEMORIES = [
  {
    age: "Planted 7 months ago · Spring Notebook",
    title: "Leave rough edges in your drafts",
    body: "Perfectionism kills half-formed ideas before they can meet their missing counterpart. Keep a sunlit corner for messy seedlings.",
    context: "Resurfaced because you wrote about 'creative rituals' today.",
  },
  {
    age: "Planted 1 year ago · Highlight from Braiding Sweetgrass",
    title: "Reciprocity as an organizing principle",
    body: "Attention is the doorway to gratitude. When we tend to our notes with patience rather than urgency, knowledge feels alive rather than transactional.",
    context: "Connected to 4 notes in your Ecology & Design cluster.",
  },
  {
    age: "Planted 4 months ago · Kyoto Train Sketch",
    title: "Small daily rituals outperform grand reorganizations",
    body: "Never spend a whole weekend reorganizing folders. Spend four minutes each morning connecting yesterday's spark to one older thought.",
    context: "Resurfaced via Gentle Weekly Review.",
  },
];

const STAGE_META = {
  seedling: {
    label: "Seedling",
    icon: Sprout,
    pill: "bg-[#FEF3D6] text-[#9A6513]",
  },
  budding: {
    label: "Budding",
    icon: Leaf,
    pill: "bg-[#E2EFE5] text-[#285437]",
  },
  evergreen: {
    label: "Evergreen",
    icon: Trees,
    pill: "bg-[#1A2E22] text-[#E9F2E8]",
  },
};

export default function GardenLanding() {
  const [stageFilter, setStageFilter] = useState<Stage>("all");
  const [selectedNoteId, setSelectedNoteId] = useState<string>("g3");
  const [memoryIdx, setMemoryIdx] = useState(0);

  const visibleNotes =
    stageFilter === "all"
      ? GARDEN_NOTES
      : GARDEN_NOTES.filter((n) => n.stage === stageFilter);

  const activeNote =
    visibleNotes.find((n) => n.id === selectedNoteId) ?? visibleNotes[0];

  const currentMemory = RESURFACED_MEMORIES[memoryIdx];

  return (
    <div className="min-h-screen bg-[#F4F6F0] text-[#1A2E22] font-[family-name:var(--font-jakarta)] selection:bg-[#3B6B4C]/20 selection:text-[#1A2E22]">
      {/* Soft Sunlit Floating Pill Navigation */}
      <div className="sticky top-0 z-30 px-4 pt-4">
        <header className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-[#1A2E22]/10 bg-[#FCFDF9]/90 px-5 py-3 shadow-[0_8px_30px_rgba(26,46,34,0.06)] backdrop-blur-md">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B6B4C] text-[#FCFDF9]">
              <Sprout className="h-4 w-4" />
            </span>
            <span className="font-[family-name:var(--font-serif-garden)] text-xl font-semibold tracking-tight text-[#1A2E22]">
              Engram
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#465C4E] md:flex">
            <a href="#garden" className="transition-colors hover:text-[#1A2E22]">
              The Garden
            </a>
            <a href="#capture" className="transition-colors hover:text-[#1A2E22]">
              Capture
            </a>
            <a href="#resurface" className="transition-colors hover:text-[#1A2E22]">
              Resurfacing
            </a>
            <a href="#pricing" className="transition-colors hover:text-[#1A2E22]">
              Membership
            </a>
          </nav>

          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-[#1A2E22] px-4 py-2 text-xs font-semibold text-[#F4F6F0] transition-colors hover:bg-[#3B6B4C]"
          >
            Plant Your Space
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </header>
      </div>

      {/* Organic Hero */}
      <section id="top" className="relative pt-14 pb-20 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3B6B4C]/20 bg-[#E7EFE4] px-4 py-1.5 text-xs font-medium text-[#2A4D36]">
              <Sun className="h-3.5 w-3.5 text-[#D4942A]" />
              <span>A calm, living second brain for unhurried minds</span>
            </div>

            <h1 className="mt-6 font-[family-name:var(--font-serif-garden)] text-5xl leading-[1.08] font-medium tracking-tight text-[#1A2E22] sm:text-6xl lg:text-[68px]">
              Tend your ideas like a{" "}
              <span className="italic text-[#3B6B4C]">living garden</span>.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#4C6153] sm:text-lg">
              Good ideas rarely arrive finished. Engram gives your fleeting
              sparks, voice notes, and book highlights a gentle place to take
              root, cross-pollinate, and grow into evergreen wisdom.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-[#3B6B4C] px-7 py-3.5 text-sm font-semibold text-[#FCFDF9] shadow-[0_12px_28px_-8px_rgba(59,107,76,0.45)] transition-all hover:bg-[#2F583D]"
              >
                Start Growing Free
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#garden"
                className="inline-flex items-center gap-2 rounded-full border border-[#1A2E22]/15 bg-[#FCFDF9] px-6 py-3.5 text-sm font-medium text-[#1A2E22] transition-colors hover:border-[#3B6B4C]/40"
              >
                Explore Sample Garden
              </a>
            </div>
          </div>

          {/* Interactive Digital Garden Maturity Explorer */}
          <div
            id="garden"
            className="mt-14 rounded-[32px] border border-[#1A2E22]/10 bg-[#FCFDF9] p-5 shadow-[0_24px_60px_-24px_rgba(26,46,34,0.12)] sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A2E22]/8 pb-5">
              <div>
                <div className="text-xs font-semibold tracking-wider text-[#3B6B4C] uppercase">
                  Interactive Digital Garden
                </div>
                <div className="mt-0.5 font-[family-name:var(--font-serif-garden)] text-xl text-[#1A2E22]">
                  Watch notes evolve from seedling to evergreen
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 rounded-full bg-[#EFF3EB] p-1">
                {(
                  [
                    { id: "all", label: "All Notes" },
                    { id: "seedling", label: "Seedlings" },
                    { id: "budding", label: "Budding" },
                    { id: "evergreen", label: "Evergreen" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setStageFilter(tab.id);
                      const nextList =
                        tab.id === "all"
                          ? GARDEN_NOTES
                          : GARDEN_NOTES.filter((n) => n.stage === tab.id);
                      if (nextList[0]) setSelectedNoteId(nextList[0].id);
                    }}
                    className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      stageFilter === tab.id
                        ? "bg-[#1A2E22] text-[#FCFDF9] shadow-xs"
                        : "text-[#4C6153] hover:text-[#1A2E22]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-12">
              {/* Garden Cards */}
              <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
                {visibleNotes.map((note) => {
                  const meta = STAGE_META[note.stage];
                  const Icon = meta.icon;
                  const active = activeNote?.id === note.id;

                  return (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => setSelectedNoteId(note.id)}
                      className={`flex cursor-pointer flex-col justify-between rounded-3xl border p-5 text-left transition-all ${
                        active
                          ? "border-[#3B6B4C] bg-[#F1F6EE] shadow-sm"
                          : "border-[#1A2E22]/8 bg-[#FAFBF7] hover:border-[#3B6B4C]/35"
                      }`}
                    >
                      <div>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.pill}`}
                        >
                          <Icon className="h-3 w-3" />
                          {meta.label}
                        </span>
                        <h3 className="mt-3.5 font-[family-name:var(--font-serif-garden)] text-lg leading-snug text-[#1A2E22]">
                          {note.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#526859]">
                          {note.summary}
                        </p>
                      </div>
                      <div className="mt-4 text-[11px] text-[#6D8274]">
                        {note.tended}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Note Botanical Detail */}
              {activeNote && (
                <div className="flex flex-col justify-between rounded-3xl border border-[#3B6B4C]/18 bg-[#E7EFE4]/60 p-6 lg:col-span-5">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#4C6153]">
                      <span className="font-medium">{activeNote.origin}</span>
                      <Flower2 className="h-4 w-4 text-[#D4942A]" />
                    </div>
                    <h3 className="mt-4 font-[family-name:var(--font-serif-garden)] text-2xl leading-snug text-[#1A2E22]">
                      {activeNote.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#32493B]">
                      {activeNote.summary}
                    </p>

                    <div className="mt-6">
                      <div className="text-[11px] font-semibold tracking-wider text-[#3B6B4C] uppercase">
                        Cross-Pollinated Links
                      </div>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {activeNote.connections.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-[#3B6B4C]/20 bg-[#FCFDF9] px-3 py-1 text-xs font-medium text-[#1A2E22]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#1A2E22]/10 pt-4 text-xs text-[#4C6153]">
                    <span>{activeNote.tended}</span>
                    <span className="font-medium text-[#3B6B4C]">
                      Private · Local First
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Natural Capture Streams */}
      <section id="capture" className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider text-[#3B6B4C] uppercase">
              Effortless Gathering
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-serif-garden)] text-4xl text-[#1A2E22]">
              Every spark finds its way home without folders.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Mic,
                title: "Whisper-to-Note Walks",
                desc: "Speak a half-formed thought on your phone. Engram transcribes it cleanly on-device and suggests three older notes it belongs beside.",
                tint: "bg-[#FEF6E4] text-[#9A6513]",
              },
              {
                icon: BookMarked,
                title: "Gentle Reading Harvest",
                desc: "Sync highlights from Kindle, PDFs, and web articles. Turn passive quotes into personal reflections with side-by-side margin cards.",
                tint: "bg-[#E7EFE4] text-[#2D5A3D]",
              },
              {
                icon: Wind,
                title: "Zero-Guilt Inbox",
                desc: "No red notification badges, no overdue review counters. Ideas rest quietly until you feel curious enough to revisit them.",
                tint: "bg-[#F4EAE4] text-[#9B4C32]",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-[28px] border border-[#1A2E22]/8 bg-[#FCFDF9] p-7 transition-transform hover:-translate-y-1"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${card.tint}`}
                >
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-[family-name:var(--font-serif-garden)] text-2xl text-[#1A2E22]">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4C6153]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Spaced Resurfacing Section */}
      <section id="resurface" className="px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-[36px] bg-[#1A2E22] p-8 text-[#F4F6F0] sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-[#D9E8D4]">
                <Sparkles className="h-3.5 w-3.5 text-[#E8B85C]" />
                <span>Gentle Resurfacing</span>
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-serif-garden)] text-3xl leading-tight sm:text-4xl">
                Rediscover forgotten gems at the exact moment you need them.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#C4D4C7]">
                Each morning, Engram surfaces two past notes related to what you
                wrote yesterday—turning your archive into a warm, ongoing
                conversation with your past self.
              </p>

              <button
                type="button"
                onClick={() =>
                  setMemoryIdx((i) => (i + 1) % RESURFACED_MEMORIES.length)
                }
                className="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#E8B85C] px-5 py-3 text-xs font-bold text-[#1A2E22] transition-transform hover:scale-[1.02]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Surface Another Memory
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/12 bg-[#233B2C] p-7 shadow-xl">
                <div className="text-xs font-medium text-[#A8C4AF]">
                  {currentMemory.age}
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-serif-garden)] text-2xl text-[#FCFDF9]">
                  &ldquo;{currentMemory.title}&rdquo;
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#D8E5DA]">
                  {currentMemory.body}
                </p>
                <div className="mt-6 flex items-center gap-2 rounded-2xl bg-[#1A2E22]/70 px-4 py-3 text-xs text-[#E8B85C]">
                  <Sprout className="h-4 w-4 shrink-0" />
                  <span>{currentMemory.context}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership / Pricing */}
      <section id="pricing" className="py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <span className="text-xs font-semibold tracking-wider text-[#3B6B4C] uppercase">
              Sustainable Membership
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-serif-garden)] text-4xl text-[#1A2E22]">
              Built slowly, funded by readers—never ads.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-[32px] border border-[#1A2E22]/10 bg-[#FCFDF9] p-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EFF3EB] px-3 py-1 text-xs font-semibold text-[#3B6B4C]">
                  <Sprout className="h-3.5 w-3.5" />
                  Seedling
                </div>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--font-serif-garden)] text-5xl text-[#1A2E22]">
                    $0
                  </span>
                  <span className="text-xs text-[#5B7062]">forever</span>
                </div>
                <p className="mt-3 text-sm text-[#4C6153]">
                  Plant and tend unlimited notes privately on your own computer.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[#2D4435]">
                  {[
                    "Unlimited local notes & growth stages",
                    "Bidirectional links & visual garden view",
                    "Plain Markdown files you own completely",
                    "Calm morning journal & weekly prompts",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#3B6B4C]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-8 w-full cursor-pointer rounded-full border border-[#1A2E22]/20 bg-[#F4F6F0] py-3.5 text-sm font-semibold text-[#1A2E22] transition-colors hover:bg-[#1A2E22] hover:text-[#FCFDF9]"
              >
                Download Seedling Free
              </button>
            </div>

            <div className="flex flex-col justify-between rounded-[32px] border-2 border-[#3B6B4C] bg-[#FCFDF9] p-8 shadow-[0_20px_50px_-24px_rgba(59,107,76,0.3)]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#3B6B4C] px-3 py-1 text-xs font-semibold text-[#FCFDF9]">
                    <Trees className="h-3.5 w-3.5" />
                    Cultivator
                  </span>
                  <span className="text-xs font-semibold text-[#C76D4A]">
                    14-day free trial
                  </span>
                </div>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-[family-name:var(--font-serif-garden)] text-5xl text-[#1A2E22]">
                    $8
                  </span>
                  <span className="text-xs text-[#5B7062]">/ month</span>
                </div>
                <p className="mt-3 text-sm text-[#4C6153]">
                  Sync privately across phone, tablet, and desktop with voice
                  capture and digital garden publishing.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[#2D4435]">
                  {[
                    "Everything in Seedling",
                    "Private encrypted sync across iOS & Desktop",
                    "On-device voice transcription & Kindle harvest",
                    "Publish selected evergreen notes as a public garden",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 text-[#3B6B4C]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-8 w-full cursor-pointer rounded-full bg-[#3B6B4C] py-3.5 text-sm font-semibold text-[#FCFDF9] transition-colors hover:bg-[#1A2E22]"
              >
                Become a Cultivator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Peaceful Footer */}
      <footer className="border-t border-[#1A2E22]/10 bg-[#EBF0E7] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-[#4C6153] sm:flex-row">
          <div className="flex items-center gap-2 font-[family-name:var(--font-serif-garden)] text-base font-medium text-[#1A2E22]">
            <Sprout className="h-4 w-4 text-[#3B6B4C]" />
            <span>Engram Digital Garden</span>
          </div>
          <div className="flex gap-6">
            <a href="#garden" className="hover:text-[#1A2E22]">
              Field Guide
            </a>
            <a href="#resurface" className="hover:text-[#1A2E22]">
              Calm Manifesto
            </a>
            <a href="#pricing" className="hover:text-[#1A2E22]">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
