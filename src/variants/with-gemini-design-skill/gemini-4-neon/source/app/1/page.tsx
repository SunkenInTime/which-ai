"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type NoteId = "reading" | "architecture" | "synthesis";

interface DemoNote {
  id: NoteId;
  title: string;
  updated: string;
  body: string[];
  linkedTo: NoteId[];
  backlinks: { source: string; excerpt: string }[];
}

const INITIAL_NOTES: Record<NoteId, DemoNote> = {
  reading: {
    id: "reading",
    title: "How Memory Holds Context",
    updated: "Edited 14 minutes ago",
    body: [
      "Isolated highlights fade within a week. A note stays useful only when you tie it to a question you are actively trying to answer.",
      "Every clipping saved into Cairn surfaces related passages from past books beside your cursor, turning scattered quotes into working material.",
    ],
    linkedTo: ["synthesis", "architecture"],
    backlinks: [
      {
        source: "Weekly Synthesis",
        excerpt: "Pull two examples from How Memory Holds Context into the essay outline.",
      },
      {
        source: "Studio Architecture",
        excerpt: "Spatial proximity between linked cards mirrors How Memory Holds Context.",
      },
    ],
  },
  architecture: {
    id: "architecture",
    title: "Studio Architecture",
    updated: "Edited yesterday",
    body: [
      "Good tools stay quiet until called. Open a blank sheet, write a sentence, and link an older concept without lifting your hands from the keyboard.",
      "Cairn stores every file locally as plain Markdown so your archive stays readable decades from now without vendor lock-in.",
    ],
    linkedTo: ["reading"],
    backlinks: [
      {
        source: "How Memory Holds Context",
        excerpt: "Compare physical index cards against the local graph in Studio Architecture.",
      },
      {
        source: "Weekly Synthesis",
        excerpt: "Review offline sync milestones logged under Studio Architecture.",
      },
    ],
  },
  synthesis: {
    id: "synthesis",
    title: "Weekly Synthesis",
    updated: "Edited 2 hours ago",
    body: [
      "Friday afternoon review: three conversations, four articles, and one lingering design problem merged into a single clear brief.",
      "Instead of digging through folders, backlinks gather every mention of your current topic in chronological order.",
    ],
    linkedTo: ["reading", "architecture"],
    backlinks: [
      {
        source: "How Memory Holds Context",
        excerpt: "Cited as the recurring cadence for turning highlights into permanent notes.",
      },
    ],
  },
};

const WORKFLOW_MODES = [
  {
    id: "capture",
    label: "Capture",
    headline: "Catch an idea before it slips away",
    description:
      "Open the quick capture bar from anywhere on your computer. Save a sentence, a web excerpt, or a voice memo in under a second without breaking focus.",
    detailTitle: "Instant global capture",
    detailLines: [
      "Works offline on macOS, Windows, iOS, and Linux.",
      "Automatically records source URLs and book page numbers.",
      "Drops rough thoughts into your daily journal until you refine them.",
    ],
  },
  {
    id: "connect",
    label: "Connect",
    headline: "Watch old notes meet new questions",
    description:
      "As you write, Cairn quietly checks your archive and suggests related passages from months or years ago so you never solve the same problem twice.",
    detailTitle: "Automatic context linking",
    detailLines: [
      "Type double brackets to link any note, person, or project.",
      "Unlinked mentions surface quietly in the margin without clutter.",
      "Rename a note once and every reference updates across your vault.",
    ],
  },
  {
    id: "recall",
    label: "Recall",
    headline: "Find the exact line you half remember",
    description:
      "Search by a rough phrase, a date range, or the project you were working on. Results appear keystroke by keystroke from a local on-device index.",
    detailTitle: "Instant local search",
    detailLines: [
      "Searches ten thousand notes in under 15 milliseconds.",
      "Finds text inside PDFs, book highlights, and meeting notes.",
      "Resurfaces forgotten excerpts when you open a related draft.",
    ],
  },
] as const;

export default function IterationOnePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<NoteId>("reading");
  const [quickThought, setQuickThought] = useState("");
  const [addedThoughts, setAddedThoughts] = useState<Record<NoteId, string[]>>({
    reading: [],
    architecture: [],
    synthesis: [],
  });
  const [activeWorkflow, setActiveWorkflow] = useState<"capture" | "connect" | "recall">(
    "capture"
  );
  const [billingPeriod, setBillingPeriod] = useState<"annual" | "monthly">("annual");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentNote = INITIAL_NOTES[activeNoteId];
  const currentWorkflow =
    WORKFLOW_MODES.find((item) => item.id === activeWorkflow) ?? WORKFLOW_MODES[0];

  const handleAddThought = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = quickThought.trim();
    if (!trimmed) return;
    setAddedThoughts((prev) => ({
      ...prev,
      [activeNoteId]: [...prev[activeNoteId], trimmed],
    }));
    setQuickThought("");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111317]">
      {/* Borderless top header that gains clean separation on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "bg-[#F8F9FA]/92 backdrop-blur-md border-b border-[#DFE3EA]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            className="text-[2rem] leading-none tracking-[-0.03em] text-[#111317]"
            style={{ fontFamily: "var(--font-iter1-display), Georgia, serif" }}
          >
            Cairn
          </a>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-8 text-[length:var(--text-sm)] text-[#525866]"
          >
            <a
              href="#workbench"
              className="hover:text-[#111317] transition-colors duration-150"
            >
              Workbench
            </a>
            <a
              href="#workflow"
              className="hover:text-[#111317] transition-colors duration-150"
            >
              How it works
            </a>
            <a
              href="#privacy"
              className="hover:text-[#111317] transition-colors duration-150"
            >
              Local files
            </a>
            <a
              href="#pricing"
              className="hover:text-[#111317] transition-colors duration-150"
            >
              Pricing
            </a>
          </nav>

          <a
            href="#pricing"
            className="rounded-full bg-[#1D4ED8] px-5 py-2.5 text-[length:var(--text-sm)] font-medium text-white hover:bg-[#1E40AF] transition-colors duration-150"
          >
            Download Cairn
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero: Centered monumental headline + wide interactive workbench bleeding from y=0 */}
        <section
          className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-6"
          style={{
            background:
              "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(29, 78, 216, 0.09) 0%, rgba(248, 249, 250, 0) 72%)",
          }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center animate-reveal">
              <h1
                className="text-[clamp(3.3rem,7.8vw,6.8rem)] leading-[0.94] tracking-[-0.035em] text-[#111317] font-normal"
                style={{ fontFamily: "var(--font-iter1-display), Georgia, serif" }}
              >
                Keep every{" "}
                <span
                  aria-hidden="true"
                  className="inline-flex align-middle mx-1.5 h-[0.62em] w-[0.95em] items-center justify-center rounded-full bg-[#1D4ED8] text-white shadow-sm -translate-y-[0.06em]"
                >
                  <svg
                    width="54%"
                    height="54%"
                    viewBox="0 0 28 18"
                    fill="none"
                  >
                    <circle cx="6" cy="9" r="3" fill="currentColor" />
                    <circle cx="22" cy="9" r="3" fill="currentColor" />
                    <path
                      d="M9 9H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                thought within reach
              </h1>

              <p className="mx-auto mt-6 max-w-[46ch] text-[length:var(--text-body)] leading-relaxed text-[#525866]">
                A quiet second brain that links your reading, meeting notes, and long-term ideas automatically on your own device.
              </p>

              <div className="mt-8 flex justify-center">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#1D4ED8] px-7 py-3.5 text-[length:var(--text-body)] font-medium text-white shadow-sm hover:bg-[#1E40AF] transition-colors duration-150"
                >
                  <span>Download for macOS</span>
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
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Wide interactive Second Brain Workbench visible above the fold */}
            <div
              id="workbench"
              className="mt-14 md:mt-16 rounded-2xl border border-[#DCE0E8] bg-white shadow-[0_24px_70px_-28px_rgba(17,19,23,0.16)] overflow-hidden animate-reveal-delay-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_270px] divide-y md:divide-y-0 md:divide-x divide-[#E6E9EF]">
                {/* Left note list */}
                <div className="bg-[#F4F6F9] p-5">
                  <div className="text-[length:var(--text-sm)] font-semibold text-[#525866] mb-3">
                    Active notebook
                  </div>
                  <div role="tablist" aria-label="Sample notes" className="flex flex-col gap-1">
                    {(Object.values(INITIAL_NOTES) as DemoNote[]).map((note) => {
                      const isActive = note.id === activeNoteId;
                      return (
                        <button
                          key={note.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setActiveNoteId(note.id)}
                          className={`w-full text-left rounded-lg px-3.5 py-2.5 text-[length:var(--text-sm)] cursor-pointer transition-colors duration-150 ${
                            isActive
                              ? "bg-white text-[#111317] font-semibold shadow-xs"
                              : "text-[#525866] hover:text-[#111317] hover:bg-white/60"
                          }`}
                        >
                          {note.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Center active note canvas */}
                <div className="p-6 md:p-8 flex flex-col justify-between min-h-[340px]">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-[#EEF0F3]">
                      <h2
                        className="text-[length:var(--text-heading)] leading-tight tracking-[-0.02em] text-[#111317] font-normal"
                        style={{
                          fontFamily: "var(--font-iter1-display), Georgia, serif",
                        }}
                      >
                        {currentNote.title}
                      </h2>
                      <span className="text-[length:var(--text-sm)] text-[#525866]">
                        {currentNote.updated}
                      </span>
                    </div>

                    <div className="mt-5 space-y-4 max-w-[60ch]">
                      {currentNote.body.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-[length:var(--text-body)] leading-relaxed text-[#252A34]"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {addedThoughts[activeNoteId].map((thought, idx) => (
                        <p
                          key={`added-${idx}`}
                          className="text-[length:var(--text-body)] leading-relaxed text-[#1D4ED8] pl-3.5 border-l-2 border-[#1D4ED8]"
                        >
                          {thought}
                        </p>
                      ))}
                    </div>
                  </div>

                  <form
                    onSubmit={handleAddThought}
                    className="mt-6 pt-4 border-t border-[#EEF0F3] flex items-center gap-3"
                  >
                    <input
                      type="text"
                      value={quickThought}
                      onChange={(e) => setQuickThought(e.target.value)}
                      placeholder="Add a line to this note and press Enter..."
                      aria-label="Add a line to this note"
                      className="flex-1 bg-transparent text-[length:var(--text-sm)] text-[#111317] placeholder:text-[#6B7280] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="text-[length:var(--text-sm)] font-semibold text-[#1D4ED8] hover:text-[#1E40AF] cursor-pointer transition-colors duration-150"
                    >
                      Append
                    </button>
                  </form>
                </div>

                {/* Right live backlinks column */}
                <div className="bg-[#FAFBFD] p-5 md:p-6">
                  <div className="text-[length:var(--text-sm)] font-semibold text-[#111317] pb-3 border-b border-[#E6E9EF]">
                    Connected notes ({currentNote.backlinks.length})
                  </div>

                  <div className="mt-4 divide-y divide-[#E6E9EF]">
                    {currentNote.backlinks.map((link) => {
                      const targetId = (Object.values(INITIAL_NOTES) as DemoNote[]).find(
                        (n) => n.title === link.source
                      )?.id;
                      return (
                        <div key={link.source} className="py-3.5 first:pt-0">
                          <button
                            type="button"
                            onClick={() => targetId && setActiveNoteId(targetId)}
                            className="text-left text-[length:var(--text-sm)] font-semibold text-[#1D4ED8] hover:underline cursor-pointer"
                          >
                            {link.source}
                          </button>
                          <p className="mt-1.5 text-[length:var(--text-sm)] leading-relaxed text-[#525866]">
                            {link.excerpt}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Workflow Explorer with segmented tab control */}
        <section id="workflow" className="py-24 md:py-32 px-6 border-t border-[#E2E6ED]">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-xl">
                <h2
                  className="text-[length:var(--text-heading)] leading-[1.08] tracking-[-0.025em] text-[#111317] font-normal"
                  style={{ fontFamily: "var(--font-iter1-display), Georgia, serif" }}
                >
                  Built for the full life of an idea
                </h2>
                <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[#525866] max-w-[54ch]">
                  Switch between the three stages of thinking to see how Cairn keeps your notes moving from rough capture to clear recall.
                </p>
              </div>

              {/* Connected segmented toggle (non-button cluster) */}
              <div
                role="tablist"
                aria-label="Workflow stages"
                className="inline-flex self-start rounded-full bg-[#EAECEF] p-1"
              >
                {WORKFLOW_MODES.map((mode) => {
                  const active = mode.id === activeWorkflow;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveWorkflow(mode.id)}
                      className={`rounded-full px-5 py-2 text-[length:var(--text-sm)] font-medium cursor-pointer transition-colors duration-150 ${
                        active
                          ? "bg-white text-[#111317] shadow-xs"
                          : "text-[#525866] hover:text-[#111317]"
                      }`}
                    >
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5 space-y-5">
                <h3 className="text-[length:var(--text-body)] font-semibold text-[#111317]">
                  {currentWorkflow.headline}
                </h3>
                <p className="text-[length:var(--text-body)] leading-relaxed text-[#525866]">
                  {currentWorkflow.description}
                </p>
              </div>

              <div className="lg:col-span-7 border-t border-[#D8DDE6] pt-6">
                <div className="text-[length:var(--text-sm)] font-semibold text-[#1D4ED8] mb-4">
                  {currentWorkflow.detailTitle}
                </div>
                <ul className="space-y-4">
                  {currentWorkflow.detailLines.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3.5 text-[length:var(--text-body)] leading-relaxed text-[#111317]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D4ED8]"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Asymmetric editorial visual showcase */}
        <section id="privacy" className="py-24 md:py-32 px-6 bg-[#EEF0F3]">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 overflow-hidden rounded-2xl bg-white">
              <Image
                src="/variants/with-gemini-design-skill/gemini-4-neon/images/iter1-studio.jpg"
                alt="Architectural white studio desk with translucent cobalt glass paperweight and neatly aligned notebooks"
                width={1600}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <h2
                className="text-[length:var(--text-heading)] leading-[1.08] tracking-[-0.025em] text-[#111317] font-normal"
                style={{ fontFamily: "var(--font-iter1-display), Georgia, serif" }}
              >
                Your archive stays in your hands
              </h2>
              <p className="text-[length:var(--text-body)] leading-relaxed text-[#525866] max-w-[52ch]">
                Every note lives as a standard Markdown file on your hard drive. Sync across devices with end-to-end encryption, or keep everything strictly offline.
              </p>

              <div className="pt-4 border-t border-[#D5DAE2] space-y-4">
                <div>
                  <h3 className="text-[length:var(--text-body)] font-semibold text-[#111317]">
                    Zero proprietary lock-in
                  </h3>
                  <p className="mt-1 text-[length:var(--text-body)] leading-relaxed text-[#525866]">
                    Open your vault folder in any text editor at any time. Your links remain plain human-readable text.
                  </p>
                </div>
                <div>
                  <h3 className="text-[length:var(--text-body)] font-semibold text-[#111317]">
                    Encrypted cross-device sync
                  </h3>
                  <p className="mt-1 text-[length:var(--text-body)] leading-relaxed text-[#525866]">
                    Notes encrypt on your laptop before leaving the machine, so only your devices can read them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Calm Pricing with clean hairline dividers */}
        <section id="pricing" className="py-24 md:py-32 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#DCE0E8]">
              <div>
                <h2
                  className="text-[length:var(--text-heading)] leading-[1.08] tracking-[-0.025em] text-[#111317] font-normal"
                  style={{ fontFamily: "var(--font-iter1-display), Georgia, serif" }}
                >
                  Simple pricing that respects your library
                </h2>
                <p className="mt-3 text-[length:var(--text-body)] text-[#525866] max-w-[50ch]">
                  Start locally for free, and add encrypted sync whenever you want your notes on every screen.
                </p>
              </div>

              <div
                role="radiogroup"
                aria-label="Billing interval"
                className="inline-flex self-start rounded-full bg-[#EAECEF] p-1"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={billingPeriod === "annual"}
                  onClick={() => setBillingPeriod("annual")}
                  className={`rounded-full px-4 py-2 text-[length:var(--text-sm)] font-medium cursor-pointer transition-colors duration-150 ${
                    billingPeriod === "annual"
                      ? "bg-white text-[#111317] shadow-xs"
                      : "text-[#525866] hover:text-[#111317]"
                  }`}
                >
                  Annual
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={billingPeriod === "monthly"}
                  onClick={() => setBillingPeriod("monthly")}
                  className={`rounded-full px-4 py-2 text-[length:var(--text-sm)] font-medium cursor-pointer transition-colors duration-150 ${
                    billingPeriod === "monthly"
                      ? "bg-white text-[#111317] shadow-xs"
                      : "text-[#525866] hover:text-[#111317]"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#DCE0E8]">
              <div className="py-10 md:pr-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-[length:var(--text-body)] font-semibold text-[#111317]">
                    Local Archive
                  </h3>
                  <p className="mt-3 text-[length:var(--text-heading)] font-normal text-[#111317] tabular-nums">
                    $0
                  </p>
                  <p className="mt-2 text-[length:var(--text-sm)] text-[#525866]">
                    Free forever on one desktop computer
                  </p>
                  <ul className="mt-8 space-y-3 text-[length:var(--text-body)] text-[#252A34]">
                    <li>Unlimited local Markdown notes and backlinks</li>
                    <li>Instant full-text search across notes and PDFs</li>
                    <li>Full graph navigation and daily journals</li>
                  </ul>
                </div>
              </div>

              <div className="py-10 md:pl-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-[length:var(--text-body)] font-semibold text-[#1D4ED8]">
                    Synced Second Brain
                  </h3>
                  <p className="mt-3 text-[length:var(--text-heading)] font-normal text-[#111317] tabular-nums">
                    {billingPeriod === "annual" ? "$8 / month" : "$11 / month"}
                  </p>
                  <p className="mt-2 text-[length:var(--text-sm)] text-[#525866]">
                    {billingPeriod === "annual"
                      ? "Billed $96 yearly across all your devices"
                      : "Billed monthly, cancel anytime"}
                  </p>
                  <ul className="mt-8 space-y-3 text-[length:var(--text-body)] text-[#252A34]">
                    <li>End-to-end encrypted sync on desktop and mobile</li>
                    <li>Automatic web clipper and reading highlight import</li>
                    <li>Two-year encrypted version history for every file</li>
                  </ul>
                </div>

                <div className="mt-10">
                  <a
                    href="#top"
                    className="inline-flex items-center justify-center rounded-full bg-[#1D4ED8] px-7 py-3.5 text-[length:var(--text-body)] font-medium text-white hover:bg-[#1E40AF] transition-colors duration-150"
                  >
                    Start 14-day free trial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#DCE0E8] py-14 px-6 bg-[#F8F9FA]">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div
              className="text-[2rem] leading-none tracking-[-0.03em] text-[#111317]"
              style={{ fontFamily: "var(--font-iter1-display), Georgia, serif" }}
            >
              Cairn
            </div>
            <p className="mt-2 text-[length:var(--text-sm)] text-[#525866]">
              Calm, local-first software for clear long-term memory.
            </p>
          </div>
          <div className="flex flex-wrap gap-7 text-[length:var(--text-sm)] text-[#525866]">
            <a href="#workbench" className="hover:text-[#111317] transition-colors duration-150">
              Workbench
            </a>
            <a href="#workflow" className="hover:text-[#111317] transition-colors duration-150">
              How it works
            </a>
            <a href="#privacy" className="hover:text-[#111317] transition-colors duration-150">
              Security
            </a>
            <a href="#pricing" className="hover:text-[#111317] transition-colors duration-150">
              Pricing
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
