"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface CapturedEntry {
  text: string;
  links: string[];
  time: string;
}

const DEFAULT_ENTRIES: CapturedEntry[] = [
  {
    text: "Compare Dieter Rams ten principles against our onboarding draft with Clara",
    links: ["Dieter Rams", "Onboarding Draft", "Clara"],
    time: "09:14",
  },
  {
    text: "Quote from How Buildings Learn on adaptive floor plans",
    links: ["How Buildings Learn", "Architecture Notes"],
    time: "11:42",
  },
];

type RecallHorizon = "today" | "week" | "sixMonths";

const RECALL_DATA: Record<
  RecallHorizon,
  {
    label: string;
    heading: string;
    context: string;
    notes: { title: string; date: string; summary: string }[];
  }
> = {
  today: {
    label: "Today",
    heading: "Active desk context",
    context: "Notes created or referenced since this morning stay pinned beside your active document.",
    notes: [
      {
        title: "Product Roadmap Q4",
        date: "Today, 08:40",
        summary: "Drafting milestone cutoffs for local PDF indexing and instant mobile capture.",
      },
      {
        title: "Call with Clara",
        date: "Today, 10:15",
        summary: "Agreed on removing nested folders in favor of clean automatic backlink views.",
      },
      {
        title: "Typography Scale Audit",
        date: "Today, 13:05",
        summary: "Locking body copy and lists to one consistent scale improves scanning speed.",
      },
    ],
  },
  week: {
    label: "Last week",
    heading: "Recent patterns surfaced",
    context: "Cairn highlights recurring people, books, and questions that appeared across multiple daily entries.",
    notes: [
      {
        title: "Sync Conflict Benchmarks",
        date: "Nov 18",
        summary: "CRDT merge testing across 14,000 plain Markdown documents completed with zero data loss.",
      },
      {
        title: "How Buildings Learn",
        date: "Nov 16",
        summary: "Six shearing layers of change explain why simple tools outlive rigid suites.",
      },
      {
        title: "Reader Interviews",
        date: "Nov 15",
        summary: "Writers consistently ask for fast capture without leaving their current window.",
      },
    ],
  },
  sixMonths: {
    label: "Six months ago",
    heading: "Long-term memory brought forward",
    context: "When you start a new brief, older research surfaces automatically so previous insights never go stale.",
    notes: [
      {
        title: "Index Card Study",
        date: "May 22",
        summary: "Notes from Niklas Luhmann archive showing why atomic notes link more cleanly than essays.",
      },
      {
        title: "Offline-First Architecture",
        date: "May 11",
        summary: "Local SQLite full-text index paired with plain folder storage keeps startup under 80 ms.",
      },
      {
        title: "Minimalist Interface Rules",
        date: "May 04",
        summary: "High contrast typography and crisp structural grids beat decorative surfaces every time.",
      },
    ],
  },
};

function extractLinks(input: string): string[] {
  const words = input
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9-]/g, ""))
    .filter((w) => w.length > 4);
  const unique = Array.from(new Set(words)).slice(0, 3);
  return unique.length > 0 ? unique : ["Daily Note", "Inbox"];
}

export default function IterationThreePage() {
  const [scrolled, setScrolled] = useState(false);
  const [scratchInput, setScratchInput] = useState("");
  const [entries, setEntries] = useState<CapturedEntry[]>(DEFAULT_ENTRIES);
  const [horizon, setHorizon] = useState<RecallHorizon>("today");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCapture = (event: React.FormEvent) => {
    event.preventDefault();
    const cleaned = scratchInput.trim();
    if (!cleaned) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    setEntries((prev) => [
      {
        text: cleaned,
        links: extractLinks(cleaned),
        time: `${hh}:${mm}`,
      },
      ...prev.slice(0, 2),
    ]);
    setScratchInput("");
  };

  const activeRecall = RECALL_DATA[horizon];

  return (
    <div className="min-h-screen bg-white text-[#0D0D0F]">
      {/* Borderless header over vermilion poster, switches cleanly to crisp white on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#D8DBE0] text-[#0D0D0F]"
            : "bg-transparent border-b border-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            className="text-[1.75rem] font-bold leading-none tracking-[-0.04em]"
          >
            Cairn
          </a>

          <nav
            aria-label="Primary"
            className={`hidden md:flex items-center gap-8 text-[length:var(--text-sm)] font-medium ${
              scrolled ? "text-[#4E5058]" : "text-white/85"
            }`}
          >
            <a
              href="#recall"
              className={`transition-colors duration-150 ${
                scrolled ? "hover:text-[#0D0D0F]" : "hover:text-white"
              }`}
            >
              Recall
            </a>
            <a
              href="#structure"
              className={`transition-colors duration-150 ${
                scrolled ? "hover:text-[#0D0D0F]" : "hover:text-white"
              }`}
            >
              Structure
            </a>
            <a
              href="#plans"
              className={`transition-colors duration-150 ${
                scrolled ? "hover:text-[#0D0D0F]" : "hover:text-white"
              }`}
            >
              Pricing
            </a>
          </nav>

          <a
            href="#plans"
            className={`px-5 py-2.5 text-[length:var(--text-sm)] font-semibold transition-colors duration-150 ${
              scrolled
                ? "bg-[#0D0D0F] text-white hover:bg-[#2A2B30]"
                : "bg-[#0D0D0F] text-white hover:bg-[#1E1F24]"
            }`}
          >
            Get Cairn
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero: Wall-to-wall vermilion color-block poster with diagonal choreography */}
        <section className="relative min-h-[100dvh] w-full bg-[#E12D1B] text-white flex flex-col justify-between pt-28 pb-12 md:pt-32 md:pb-16 px-6">
          <div className="mx-auto w-full max-w-6xl">
            <h1 className="text-[clamp(3.6rem,10.5vw,9.2rem)] font-bold leading-[0.88] tracking-[-0.045em] text-white max-w-[12ch] animate-reveal">
              Think once, recall forever
            </h1>
          </div>

          {/* Lower diagonal anchor: concise statement + live instant-capture scratchpad */}
          <div className="mx-auto w-full max-w-6xl mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-5 animate-reveal-delay-1">
              <p className="text-[length:var(--text-body)] leading-relaxed text-white/92 max-w-[38ch]">
                Type a raw thought and let Cairn link people, books, and projects automatically into your permanent archive.
              </p>
              <div className="mt-7">
                <a
                  href="#plans"
                  className="inline-flex items-center gap-3 bg-[#0D0D0F] px-7 py-4 text-[length:var(--text-body)] font-semibold text-white hover:bg-[#1F2026] transition-colors duration-150"
                >
                  <span>Download for desktop</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Interactive Swiss scratchpad anchored bottom-right */}
            <div className="lg:col-span-7 bg-white text-[#0D0D0F] p-6 md:p-7 shadow-[0_28px_60px_-24px_rgba(13,13,15,0.4)] animate-reveal-delay-2">
              <form
                onSubmit={handleCapture}
                className="flex flex-col sm:flex-row gap-3 pb-5 border-b border-[#E3E5E9]"
              >
                <input
                  type="text"
                  value={scratchInput}
                  onChange={(e) => setScratchInput(e.target.value)}
                  placeholder="Try typing a note: Summarize grid lecture for Friday..."
                  aria-label="Capture a quick note"
                  className="flex-1 text-[length:var(--text-body)] text-[#0D0D0F] placeholder:text-[#6B6E77] bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#E12D1B] px-5 py-2.5 text-[length:var(--text-sm)] font-semibold text-white hover:bg-[#C42313] cursor-pointer transition-colors duration-150 shrink-0"
                >
                  Save note
                </button>
              </form>

              <div className="mt-4 divide-y divide-[#ECEEF1]">
                {entries.map((entry, idx) => (
                  <div
                    key={`${entry.time}-${idx}`}
                    className="py-3.5 first:pt-1 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                  >
                    <div>
                      <p className="text-[length:var(--text-body)] text-[#0D0D0F] leading-snug">
                        {entry.text}
                      </p>
                      <p className="mt-1 text-[length:var(--text-sm)] text-[#4E5058]">
                        Linked to {entry.links.join(", ")}
                      </p>
                    </div>
                    <span className="text-[length:var(--text-sm)] text-[#4E5058] tabular-nums shrink-0">
                      {entry.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Swiss Grid Recall Timeline */}
        <section id="recall" className="py-24 md:py-32 px-6 bg-white border-b border-[#0D0D0F]">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[#D8DBE0]">
              <div className="lg:col-span-7">
                <h2 className="text-[length:var(--text-heading)] font-bold leading-[1.04] tracking-[-0.03em] text-[#0D0D0F]">
                  Your past research arrives right when you need it
                </h2>
              </div>
              <div className="lg:col-span-5 flex lg:justify-end">
                {/* Connected segmented selector */}
                <div
                  role="tablist"
                  aria-label="Time horizon"
                  className="inline-flex border border-[#0D0D0F]"
                >
                  {(["today", "week", "sixMonths"] as RecallHorizon[]).map((key) => {
                    const active = key === horizon;
                    return (
                      <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setHorizon(key)}
                        className={`px-4 py-2.5 text-[length:var(--text-sm)] font-semibold cursor-pointer transition-colors duration-150 ${
                          active
                            ? "bg-[#0D0D0F] text-white"
                            : "bg-white text-[#0D0D0F] hover:bg-[#F2F3F5]"
                        }`}
                      >
                        {RECALL_DATA[key].label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <h3 className="text-[length:var(--text-body)] font-bold text-[#E12D1B]">
                  {activeRecall.heading}
                </h3>
                <p className="mt-3 text-[length:var(--text-body)] leading-relaxed text-[#4E5058]">
                  {activeRecall.context}
                </p>
              </div>

              <div className="lg:col-span-8 divide-y divide-[#D8DBE0] border-t border-b border-[#D8DBE0]">
                {activeRecall.notes.map((note) => (
                  <div
                    key={note.title}
                    className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                  >
                    <div className="sm:col-span-4 font-bold text-[length:var(--text-body)] text-[#0D0D0F]">
                      {note.title}
                    </div>
                    <div className="sm:col-span-6 text-[length:var(--text-body)] leading-relaxed text-[#4E5058]">
                      {note.summary}
                    </div>
                    <div className="sm:col-span-2 sm:text-right text-[length:var(--text-sm)] text-[#4E5058] tabular-nums">
                      {note.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: High-contrast Black Band + Architectural Swiss Still Life */}
        <section id="structure" className="py-24 md:py-32 px-6 bg-[#0D0D0F] text-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <h2 className="text-[length:var(--text-heading)] font-bold leading-[1.04] tracking-[-0.03em] text-white">
                  Zero folder maintenance required
                </h2>
                <p className="mt-5 text-[length:var(--text-body)] leading-relaxed text-[#C2C5CE] max-w-[46ch]">
                  Filing systems collapse the moment work gets busy. Write in one chronological stream and connect concepts by name so your second brain organizes itself.
                </p>

                <div className="mt-10 divide-y divide-[#282A30] border-t border-[#282A30]">
                  <div className="py-5">
                    <h3 className="text-[length:var(--text-body)] font-bold text-white">
                      Instant keyboard navigation
                    </h3>
                    <p className="mt-1.5 text-[length:var(--text-body)] text-[#B5B8C2]">
                      Jump between any two notes in two keystrokes without reaching for the trackpad.
                    </p>
                  </div>
                  <div className="py-5">
                    <h3 className="text-[length:var(--text-body)] font-bold text-white">
                      Plain Markdown storage
                    </h3>
                    <p className="mt-1.5 text-[length:var(--text-body)] text-[#B5B8C2]">
                      Every file stays cleanly formatted in a regular folder you control and back up freely.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Image
                  src="/variants/with-gemini-design-skill/gemini-4-neon/images/iter3-blocks.jpg"
                  alt="High-contrast vermilion, white, and black modular blocks arranged in a Swiss architectural grid"
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Clean Structural Pricing Band */}
        <section id="plans" className="py-24 md:py-32 px-6 bg-[#F2F3F5]">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-[length:var(--text-heading)] font-bold leading-[1.04] tracking-[-0.03em] text-[#0D0D0F] max-w-2xl">
              Clear software with one straightforward price
            </h2>

            <div className="mt-12 border-t border-[#0D0D0F] divide-y divide-[#0D0D0F]">
              <div className="py-9 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-4">
                  <h3 className="text-[length:var(--text-body)] font-bold text-[#0D0D0F]">
                    Desktop Local
                  </h3>
                  <p className="mt-1 text-[length:var(--text-sm)] text-[#4E5058]">
                    For solo work on one machine
                  </p>
                </div>
                <div className="md:col-span-5 text-[length:var(--text-body)] text-[#0D0D0F]">
                  Unlimited notes, instant local search, automatic backlinks, and plain Markdown export.
                </div>
                <div className="md:col-span-3 md:text-right text-[length:var(--text-heading)] font-bold text-[#0D0D0F] tabular-nums">
                  Free
                </div>
              </div>

              <div className="py-9 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-4">
                  <h3 className="text-[length:var(--text-body)] font-bold text-[#E12D1B]">
                    All-Device Sync
                  </h3>
                  <p className="mt-1 text-[length:var(--text-sm)] text-[#4E5058]">
                    Desktop, iOS, and encrypted history
                  </p>
                </div>
                <div className="md:col-span-5 text-[length:var(--text-body)] text-[#0D0D0F]">
                  Zero-knowledge sync across unlimited devices, web clipper, PDF indexing, and two-year version snapshots.
                </div>
                <div className="md:col-span-3 md:text-right text-[length:var(--text-heading)] font-bold text-[#0D0D0F] tabular-nums">
                  $8 / mo
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="#top"
                className="inline-flex items-center justify-center bg-[#E12D1B] px-8 py-4 text-[length:var(--text-body)] font-semibold text-white hover:bg-[#C42313] transition-colors duration-150"
              >
                Download Cairn for macOS, Windows, and Linux
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0D0D0F] text-white py-12 px-6 border-t border-[#282A30]">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-[1.75rem] font-bold tracking-[-0.04em]">Cairn</div>
          <div className="flex flex-wrap gap-7 text-[length:var(--text-sm)] text-[#B5B8C2]">
            <a href="#recall" className="hover:text-white transition-colors duration-150">
              Recall
            </a>
            <a href="#structure" className="hover:text-white transition-colors duration-150">
              Structure
            </a>
            <a href="#plans" className="hover:text-white transition-colors duration-150">
              Pricing
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
