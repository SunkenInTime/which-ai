"use client";

import { useMemo, useState } from "react";
import {
  Feather,
  HeartHandshake,
  Leaf,
  LockKeyhole,
  Moon,
  Sparkles,
  Sun,
  Sunrise,
} from "lucide-react";

interface SampleThought {
  id: string;
  label: string;
  text: string;
  entities: string[];
  echoes: {
    date: string;
    note: string;
    reason: string;
  }[];
}

const SAMPLE_THOUGHTS: SampleThought[] = [
  {
    id: "maya",
    label: "Coffee with Maya",
    text: "Coffee with Maya near the conservatory — she suggested Christopher Alexander’s A Pattern Language for how we design neighborhood public benches and shared courtyards.",
    entities: ["@Maya", "Christopher Alexander", "Civic Spaces", "Pattern Language"],
    echoes: [
      {
        date: "Aug 19, 2025",
        note: "“Jane Jacobs on ‘eyes on the street’ and why sunlit stoops invite lingering conversations.”",
        reason: "Shared theme: human-scale urban warmth",
      },
      {
        date: "Feb 04, 2026",
        note: "“Maya’s sketch of modular cedar planters outside the library steps.”",
        reason: "Connected person: @Maya",
      },
    ],
  },
  {
    id: "guitar",
    label: "Half-awake product hunch",
    text: "Woke up thinking: onboarding shouldn’t feel like a tax form. It should feel like picking up a tuned acoustic guitar and hearing a warm chord on your very first strum.",
    entities: ["Onboarding Craft", "First-Minute Joy", "Musical Metaphor"],
    echoes: [
      {
        date: "Nov 28, 2025",
        note: "“Nintendo’s World 1-1 teaches every movement mechanic without a single sentence of tutorial text.”",
        reason: "Shared intuition: learning by immediate play",
      },
      {
        date: "Jun 11, 2026",
        note: "“Cut 4 setup screens from our welcome flow—activation jumped 31% overnight.”",
        reason: "Related project: First-run experience",
      },
    ],
  },
  {
    id: "sacks",
    label: "Reading Oliver Sacks",
    text: "Finished Musicophilia tonight. Even when episodic memory fades completely, a childhood melody can still unlock an entire room of forgotten emotion and posture.",
    entities: ["Oliver Sacks", "Musicophilia", "Embodied Memory"],
    echoes: [
      {
        date: "Dec 24, 2024",
        note: "“Grandfather humming Chopin Nocturne Op. 9 No. 2 from memory at eighty-nine.”",
        reason: "Personal memory resonance",
      },
      {
        date: "Apr 15, 2026",
        note: "“Proust’s madeleine isn’t nostalgia—it’s sensory-cued involuntary retrieval.”",
        reason: "Conceptual bridge: involuntary recall",
      },
    ],
  },
];

function inferEntitiesFromCustomText(text: string): string[] {
  const words = text
    .replace(/[^\w\s@-]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const capitalized = words.filter(
    (w, i) => i > 0 && /^[A-Z][a-z]{2,}/.test(w) || w.startsWith("@")
  );
  const longWords = words
    .filter((w) => w.length >= 6)
    .slice(0, 3)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

  const combined = Array.from(new Set([...capitalized, ...longWords])).slice(0, 4);
  return combined.length > 0 ? combined : ["Personal Reflection", "Today’s Stream"];
}

export default function IterationFiveSanctuary() {
  const [selectedId, setSelectedId] = useState<string>("maya");
  const [customDraft, setCustomDraft] = useState<string>(SAMPLE_THOUGHTS[0].text);

  const activeData = useMemo(() => {
    const preset = SAMPLE_THOUGHTS.find((s) => s.text === customDraft.trim());
    if (preset) return preset;

    const clean = customDraft.trim();
    if (!clean) return SAMPLE_THOUGHTS[0];

    const entities = inferEntitiesFromCustomText(clean);
    return {
      id: "custom",
      label: "Your Live Entry",
      text: clean,
      entities,
      echoes: [
        {
          date: "3 months ago",
          note: `“Earlier reflection touching on ${entities[0]?.toLowerCase() ?? "this thread"} during a quiet Sunday review.”`,
          reason: `Quietly linked via “${entities[0] ?? "meaning"}”`,
        },
        {
          date: "Last autumn",
          note: "“The ideas worth keeping always return in slightly different clothes until we write them down.”",
          reason: "Semantic kinship · 0 folders needed",
        },
      ],
    };
  }, [customDraft]);

  return (
    <div className="min-h-screen bg-[#F5F7F2] font-jakarta text-[#14281D] selection:bg-[#24543B]/15 selection:text-[#14281D]">
      {/* Gentle Botanical Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#24543B] text-[#F5F7F2]">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-instrument text-3xl tracking-tight text-[#14281D]">
            Engram
          </span>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-[#485E50] md:flex">
          <a href="#stream" className="transition-colors hover:text-[#14281D]">
            Quiet Stream
          </a>
          <a href="#promises" className="transition-colors hover:text-[#14281D]">
            Zero Folders
          </a>
          <a href="#rhythm" className="transition-colors hover:text-[#14281D]">
            Daily Rhythm
          </a>
          <a href="#sanctuary-plan" className="transition-colors hover:text-[#14281D]">
            Sanctuary
          </a>
        </nav>

        <a
          href="#sanctuary-plan"
          className="rounded-full bg-[#14281D] px-5 py-2.5 text-xs font-medium text-[#F5F7F2] transition-colors hover:bg-[#24543B]"
        >
          Begin Quietly
        </a>
      </header>

      {/* Poetic Sanctuary Hero */}
      <section id="stream" className="mx-auto max-w-5xl px-6 pt-10 pb-24 text-center sm:pt-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4DFCF] bg-[#FCFDFB] px-4 py-1.5 font-plex-mono text-[11px] text-[#485E50]">
          <Feather className="h-3.5 w-3.5 text-[#B6822A]" />
          <span>THE ZERO-MAINTENANCE SECOND BRAIN</span>
        </div>

        <h1 className="mx-auto mt-6 max-w-4xl font-instrument text-5xl font-normal leading-[1.04] tracking-[-0.015em] text-[#14281D] sm:text-7xl">
          Stop organizing your notes.{" "}
          <em className="italic text-[#24543B]">Start remembering your life.</em>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#485E50] sm:text-lg">
          Your second brain shouldn&apos;t feel like a second job. Just write into one
          peaceful daily page—books, conversations, half-formed wonders—and let
          Engram quietly weave connections in the background.
        </p>

        {/* Interactive Self-Organizing Sanctuary Journal */}
        <div className="mt-12 rounded-[28px] border border-[#D7E1D2] bg-[#FCFDFB] p-6 text-left shadow-[0_24px_70px_rgba(20,40,29,0.06)] sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8EEE4] pb-4">
            <div className="font-plex-mono text-xs text-[#5E7466]">
              TUESDAY, NOV 10 · MORNING STREAM · TYPE OR TRY A SAMPLE MEMORY
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_THOUGHTS.map((sample) => {
                const active = selectedId === sample.id && customDraft === sample.text;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(sample.id);
                      setCustomDraft(sample.text);
                    }}
                    className={`rounded-full px-3 py-1 text-xs transition-colors cursor-pointer ${
                      active
                        ? "bg-[#24543B] text-[#F5F7F2]"
                        : "bg-[#EBF0E7] text-[#354C3E] hover:bg-[#DCE6D6]"
                    }`}
                  >
                    {sample.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Calm Writing Surface */}
            <div className="lg:col-span-7">
              <label
                htmlFor="sanctuary-input"
                className="block font-plex-mono text-[11px] uppercase tracking-wider text-[#6A8072]"
              >
                Write freely — no tags, folders, or templates needed
              </label>
              <textarea
                id="sanctuary-input"
                rows={5}
                value={customDraft}
                onChange={(e) => {
                  setSelectedId("custom");
                  setCustomDraft(e.target.value);
                }}
                placeholder="Write any fleeting thought, book quote, or conversation..."
                className="mt-3 w-full resize-none rounded-2xl border border-[#DCE5D8] bg-[#F7F9F5] p-5 font-instrument text-2xl leading-relaxed text-[#14281D] placeholder:text-[#8FA396] focus:border-[#24543B] focus:bg-white focus:outline-none"
              />

              {/* Quietly Recognized Threads */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="font-plex-mono text-[11px] text-[#6A8072]">
                  Quietly recognized:
                </span>
                {activeData.entities.map((entity) => (
                  <span
                    key={entity}
                    className="rounded-full border border-[#D5E0D0] bg-[#F2F6EF] px-3 py-0.5 text-xs font-medium text-[#24543B]"
                  >
                    {entity}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Gentle Past Echoes */}
            <div className="flex flex-col justify-between rounded-2xl bg-[#F2F6EF] p-6 lg:col-span-5">
              <div>
                <div className="flex items-center gap-2 font-plex-mono text-[11px] uppercase tracking-wider text-[#B6822A]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Past Memories Quietly Gathered</span>
                </div>

                <div className="mt-4 space-y-3.5">
                  {activeData.echoes.map((echo, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-[#DDE6D8] bg-[#FCFDFB] p-4 shadow-2xs"
                    >
                      <div className="font-plex-mono text-[10px] text-[#6A8072]">
                        {echo.date}
                      </div>
                      <p className="mt-1.5 font-instrument text-xl leading-snug text-[#14281D]">
                        {echo.note}
                      </p>
                      <div className="mt-2 text-[11px] text-[#24543B]">
                        ↳ {echo.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-5 font-plex-mono text-[11px] text-[#5E7466]">
                ✓ Saved locally &amp; encrypted. Zero manual filing required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Quiet Promises */}
      <section id="promises" className="border-y border-[#DCE5D7] bg-[#EBF0E6]/65 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-plex-mono text-xs uppercase tracking-widest text-[#24543B]">
              HUMANE BY DESIGN
            </span>
            <h2 className="mt-3 font-instrument text-4xl text-[#14281D] sm:text-5xl">
              Three promises against cognitive clutter.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-[#D8E2D3] bg-[#FCFDFB] p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EBF0E6] text-[#24543B]">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-instrument text-3xl text-[#14281D]">
                No Taxonomy Tax
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#485E50]">
                Never spend another Sunday night reorganizing folders or fixing broken
                databases. Drop thoughts as messy as real life; meaning clusters them
                organically over time.
              </p>
            </div>

            <div className="rounded-3xl border border-[#D8E2D3] bg-[#FCFDFB] p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FAF3E3] text-[#B6822A]">
                <Sunrise className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-instrument text-3xl text-[#14281D]">
                Morning Serendipity
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#485E50]">
                Alongside your morning coffee, Engram surfaces three gentle notes from
                past seasons that echo what you&apos;re working through this week—turning
                old journals into living counsel.
              </p>
            </div>

            <div className="rounded-3xl border border-[#D8E2D3] bg-[#FCFDFB] p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EBF0E6] text-[#24543B]">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-instrument text-3xl text-[#14281D]">
                Private as Paper
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#485E50]">
                You can only think honestly in a room with the door closed. Your diary,
                voice walks, and unfinished drafts are sealed with keys that never
                leave your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Rhythm: Dawn, Midday, Dusk */}
      <section id="rhythm" className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <span className="font-plex-mono text-xs uppercase tracking-widest text-[#B6822A]">
            A DAY IN QUIET COMPANIONSHIP
          </span>
          <h2 className="mt-3 font-instrument text-4xl text-[#14281D] sm:text-5xl">
            Fits gently around your day, then steps out of the way.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: Sunrise,
              time: "7:30 AM · DAWN",
              title: "Three Forgotten Seeds",
              body: "Open a calm blank page greeted by three brief memories from last year that quietly connect to today’s calendar.",
            },
            {
              icon: Sun,
              time: "1:15 PM · MIDDAY WALK",
              title: "Speak & Keep Walking",
              body: "Tap your watch or phone once to murmur a passing realization. Put your phone right back in your pocket—Engram handles the rest.",
            },
            {
              icon: Moon,
              time: "9:45 PM · DUSK",
              title: "Unburden Your Working Mind",
              body: "Set down open loops, book highlights, and gratitude lines in two quiet minutes so your mind can rest deeply overnight.",
            },
          ].map((slot) => {
            const Icon = slot.icon;
            return (
              <div
                key={slot.time}
                className="flex flex-col justify-between rounded-3xl border border-[#DCE5D7] bg-[#FCFDFB] p-8"
              >
                <div>
                  <div className="flex items-center justify-between font-plex-mono text-xs text-[#6A8072]">
                    <span>{slot.time}</span>
                    <Icon className="h-4 w-4 text-[#B6822A]" />
                  </div>
                  <h3 className="mt-5 font-instrument text-3xl text-[#14281D]">
                    {slot.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#485E50]">
                    {slot.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Calm Sanctuary CTA / Membership */}
      <section id="sanctuary-plan" className="mx-auto max-w-4xl px-6 pb-28">
        <div className="rounded-[36px] bg-[#14281D] px-8 py-14 text-center text-[#F5F7F2] sm:px-16">
          <span className="font-plex-mono text-xs uppercase tracking-widest text-[#A7C4B2]">
            YOUR QUIET ROOM AWAITS
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-instrument text-4xl font-normal leading-tight sm:text-6xl">
            Give your best thoughts a peaceful place to grow old.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#C2D6C9] sm:text-base">
            Free forever on a single device with local Markdown files. $6/month for
            end-to-end encrypted sync across Mac, iPhone, and iPad.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full bg-[#F5F7F2] px-7 py-3.5 text-sm font-semibold text-[#14281D] transition-colors hover:bg-[#DCE8DF] cursor-pointer"
            >
              Begin Your Quiet Stream — Free
            </button>
            <button
              type="button"
              className="rounded-full border border-[#3B5E4A] px-6 py-3.5 text-sm font-medium text-[#E4EDE7] transition-colors hover:bg-[#1E3A2B] cursor-pointer"
            >
              Read Our Privacy Promise
            </button>
          </div>
        </div>
      </section>

      {/* Peaceful Footer */}
      <footer className="border-t border-[#DCE5D7] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-xs text-[#5E7466] sm:flex-row sm:items-center">
          <span className="font-instrument text-xl text-[#14281D]">
            Engram Sanctuary — Iteration 05 of 05
          </span>
          <span className="font-plex-mono text-[11px]">
            SET IN INSTRUMENT SERIF &amp; PLUS JAKARTA SANS
          </span>
        </div>
      </footer>
    </div>
  );
}
