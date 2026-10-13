/* eslint-disable react/jsx-no-comment-textnodes -- The generated interface intentionally displays slash-prefixed labels. */
"use client";

import React, { useState } from "react";
import Link from "next/link";

interface MemoryPrompt {
  id: string;
  question: string;
  themeBadge: string;
  synthesisTitle: string;
  synthesisBody: string;
  patternDetected: string;
  citations: {
    id: string;
    date: string;
    kind: "Voice Walk" | "Book Highlight" | "Evening Journal" | "Conversation Note";
    title: string;
    excerpt: string;
    mood: string;
  }[];
}

const MEMORY_PROMPTS: MemoryPrompt[] = [
  {
    id: "energy",
    question: "When do I feel most creatively energized?",
    themeBadge: "PERSONAL RHYTHMS • 14 MONTHS OF NOTES",
    synthesisTitle: "Unstructured mornings + walking without headphones",
    synthesisBody:
      "Across 19 journal entries and voice reflections since last autumn, your sharpest breakthroughs consistently occurred between 7:30 AM and 10:00 AM on days when you delayed checking messages and took a 25-minute walk without podcasts.",
    patternDetected:
      "91% correlation between headphone-free morning walks and high-output writing sessions.",
    citations: [
      {
        id: "mem-1",
        date: "Oct 4 · 08:19 AM",
        kind: "Voice Walk",
        title: "Canal path walk after rain",
        excerpt:
          "“Left my phone in my coat pocket. Solved the entire onboarding state machine in ten minutes just watching the water.”",
        mood: "Clear & Grounded",
      },
      {
        id: "mem-2",
        date: "Aug 17 · 09:40 PM",
        kind: "Evening Journal",
        title: "Why Tuesday felt so effortless",
        excerpt:
          "“Didn't open Slack until 11am. Three hours of uninterrupted deep drafting felt like ten hours of normal work.”",
        mood: "Fulfilled",
      },
      {
        id: "mem-3",
        date: "May 12 · 07:55 AM",
        kind: "Book Highlight",
        title: "Solitude and Leadership — William Deresiewicz",
        excerpt:
          "“Thinking means concentrating on one thing long enough to develop an idea about it, not learning other people’s ideas.”",
        mood: "Contemplative",
      },
    ],
  },
  {
    id: "calm-tech",
    question: "What have I gathered on designing calm technology?",
    themeBadge: "DESIGN PHILOSOPHY • 28 CONNECTED NOTES",
    synthesisTitle: "Software should behave like a sunlit room, not a casino",
    synthesisBody:
      "Your notes return repeatedly to Mark Weiser’s 1995 Xerox PARC paper and Dieter Rams’ principle of quietness: tools should inform from the periphery and step back the moment their job is done.",
    patternDetected:
      "Bridges 4 book highlights, 2 museum visits, and your Q4 product manifesto.",
    citations: [
      {
        id: "mem-4",
        date: "Sep 28 · 04:12 PM",
        kind: "Book Highlight",
        title: "Designing Calm Technology — Weiser & Brown",
        excerpt:
          "“The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life.”",
        mood: "Inspired",
      },
      {
        id: "mem-5",
        date: "Jul 09 · 02:30 PM",
        kind: "Voice Walk",
        title: "Leaving the Kronberg Braun Archive",
        excerpt:
          "“Notice how none of Rams’ radios shout at you. Every dial has a tactile stop. Software notifications have lost all respect for silence.”",
        mood: "Observant",
      },
      {
        id: "mem-6",
        date: "Jun 03 · 10:15 PM",
        kind: "Evening Journal",
        title: "Why I quit my old workspace app",
        excerpt:
          "“I spent more time coloring status badges and reorganizing nested databases than actually writing.”",
        mood: "Clarity",
      },
    ],
  },
  {
    id: "maya-recs",
    question: "Remind me of the books and places Maya recommended",
    themeBadge: "RELATIONSHIPS & GIFT IDEAS • 6 MENTIONS",
    synthesisTitle: "Kyoto kissaten cafes, ‘The Makioka Sisters’, and ceramic studios",
    synthesisBody:
      "Over three dinners between March and September, Maya mentioned her favorite novel (Tanizaki’s The Makioka Sisters), a tiny vinyl cafe in Kyoto (Rokujian), and a potter in Mashiko whose glazes she loves.",
    patternDetected:
      "Helpful reminder: Maya’s birthday is November 14 (4 weeks away).",
    citations: [
      {
        id: "mem-7",
        date: "Sep 14 · 10:05 PM",
        kind: "Conversation Note",
        title: "Dinner with Maya & Leo at Bar Basso",
        excerpt:
          "“Maya lit up talking about Jun'ichirō Tanizaki’s The Makioka Sisters—said the autumn translation is her comfort read.”",
        mood: "Warm",
      },
      {
        id: "mem-8",
        date: "Apr 22 · 01:15 PM",
        kind: "Conversation Note",
        title: "Coffee catch-up — travel notes",
        excerpt:
          "“Save for Kyoto trip: Maya says never skip the morning toast and siphon coffee at Smart Coffee or Rokujian.”",
        mood: "Curious",
      },
      {
        id: "mem-9",
        date: "Mar 08 · 06:40 PM",
        kind: "Voice Walk",
        title: "Gift idea for Maya's autumn birthday",
        excerpt:
          "“Look for hand-thrown stoneware matcha bowls with iron-rich ash glaze.”",
        mood: "Thoughtful",
      },
    ],
  },
];

export default function IterationFivePage() {
  const [selectedPromptId, setSelectedPromptId] = useState<string>("energy");
  const [quietThought, setQuietThought] = useState<string>("");
  const [capturedStream, setCapturedStream] = useState<
    { text: string; time: string; inferredTag: string }[]
  >([
    {
      text: "The sound of rain on the skylight always makes long-form editing feel twice as easy.",
      time: "Today · 09:12 AM",
      inferredTag: "Auto-woven → #Creative-Rhythms & #Environment",
    },
  ]);

  const activePrompt =
    MEMORY_PROMPTS.find((p) => p.id === selectedPromptId) || MEMORY_PROMPTS[0];

  const handleDropThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quietThought.trim()) return;
    setCapturedStream((prev) => [
      {
        text: quietThought.trim(),
        time: "Just now · Gently archived",
        inferredTag: "Auto-woven → #Personal-Reflection (Zero folders needed)",
      },
      ...prev,
    ]);
    setQuietThought("");
  };

  return (
    <div className="min-h-screen bg-[#F2F5EF] text-[#14221B] font-sans selection:bg-[#2E5A44]/20 selection:text-[#14221B]">
      {/* Soft Biophilic Radial Aura */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(46, 90, 68, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 85% 25%, rgba(217, 119, 66, 0.07) 0%, transparent 45%)
          `,
        }}
      />

      {/* Calm Floating Header */}
      <header className="sticky top-0 z-30 border-b border-[#D6DFD0] bg-[#F2F5EF]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2E5A44] text-[#F2F5EF] font-fraunces italic text-lg">
              n
            </div>
            <div>
              <span className="font-fraunces text-xl font-medium tracking-tight text-[#14221B]">
                noema{" "}
                <span className="italic font-normal text-[#2E5A44]">
                  sanctuary
                </span>
              </span>
              <span className="ml-3 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#E3EBE0] px-2.5 py-0.5 font-ibm-mono text-[10px] text-[#2E5A44]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2E5A44]" />
                ITERATION /5 • AMBIENT SECOND BRAIN
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm text-[#3D5247]">
            <a href="#past-self" className="hover:text-[#14221B] transition-colors">
              Conversational Recall
            </a>
            <a href="#zero-guilt" className="hover:text-[#14221B] transition-colors">
              Zero Maintenance
            </a>
            <a href="#sanctuary-privacy" className="hover:text-[#14221B] transition-colors">
              On-Device Sanctuary
            </a>
          </nav>

          <a
            href="#begin-calm"
            className="rounded-full bg-[#14221B] px-5 py-2 text-xs font-medium text-[#F2F5EF] hover:bg-[#2E5A44] transition-colors"
          >
            Enter Quiet Space →
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-14 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2E5A44]/25 bg-[#E3EBE0] px-4 py-1 font-ibm-mono text-xs text-[#2E5A44]">
            <span>CALM TECHNOLOGY</span>
            <span>•</span>
            <span>NO FOLDERS, NO TAG ANXIETY</span>
          </span>

          <h1 className="mt-6 font-fraunces text-4xl sm:text-6xl lg:text-[62px] font-normal tracking-tight text-[#14221B] leading-[1.07]">
            A second brain that{" "}
            <span className="italic text-[#2E5A44]">organizes itself</span>{" "}
            while you live your life.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#42584D]">
            You shouldn’t need a weekend course in database architecture just to
            remember what matters. Speak a thought on a walk or jot a sentence
            before sleep—Noema’s private memory engine weaves the threads
            silently in the background.
          </p>
        </div>

        {/* INTERACTIVE HERO ARTIFACT: "Ask Your Past Self" Conversational Memory Stream */}
        <div
          id="past-self"
          className="mt-12 rounded-3xl border border-[#CBD6C4] bg-[#FAFBF8] p-6 sm:p-10 shadow-[0_24px_60px_rgba(20,34,27,0.06)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E9DD] pb-5">
            <div>
              <span className="font-ibm-mono text-xs uppercase tracking-wider text-[#2E5A44]">
                // CONVERSE WITH YOUR PAST SELF
              </span>
              <h2 className="mt-1 font-fraunces text-2xl text-[#14221B]">
                Ask a question across years of moments
              </h2>
            </div>
            <span className="font-ibm-mono text-xs text-[#5E7468]">
              100% On-Device Apple Neural Engine
            </span>
          </div>

          {/* Interactive Question Pills */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            {MEMORY_PROMPTS.map((prompt) => {
              const isSelected = prompt.id === selectedPromptId;
              return (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => setSelectedPromptId(prompt.id)}
                  className={`rounded-full px-4 py-2.5 text-xs sm:text-sm transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#2E5A44] text-[#FAFBF8] font-medium shadow-sm"
                      : "border border-[#CBD6C4] bg-[#F2F5EF] text-[#2B3E34] hover:border-[#2E5A44]"
                  }`}
                >
                  “{prompt.question}”
                </button>
              );
            })}
          </div>

          {/* Synthesized Reflection + Cited Episodic Memories */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 Cols: Calm Synthesized Answer */}
            <div className="lg:col-span-6 rounded-2xl border border-[#D5E0CF] bg-[#F2F5EF] p-6 sm:p-8">
              <span className="inline-block rounded-full bg-[#2E5A44]/10 px-3 py-1 font-ibm-mono text-[11px] font-medium text-[#2E5A44]">
                {activePrompt.themeBadge}
              </span>

              <h3 className="mt-4 font-fraunces text-2xl sm:text-3xl text-[#14221B] leading-snug">
                {activePrompt.synthesisTitle}
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#2F4439]">
                {activePrompt.synthesisBody}
              </p>

              <div className="mt-6 rounded-xl border border-[#D97742]/30 bg-[#D97742]/10 p-4">
                <div className="font-ibm-mono text-[11px] uppercase tracking-wider text-[#B35827]">
                  ✦ Gentle Pattern Noticed
                </div>
                <p className="mt-1 text-xs sm:text-sm font-medium text-[#14221B]">
                  {activePrompt.patternDetected}
                </p>
              </div>
            </div>

            {/* Right 6 Cols: Source Moments Woven Across Time */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="flex items-center justify-between font-ibm-mono text-xs text-[#5E7468] px-1">
                <span>WOVEN FROM THESE RAW MOMENTS:</span>
                <span>ZERO MANUAL TAGGING</span>
              </div>

              {activePrompt.citations.map((cit) => (
                <div
                  key={cit.id}
                  className="rounded-2xl border border-[#DCE5D7] bg-white p-5 shadow-xs transition-all hover:border-[#2E5A44]/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 font-ibm-mono text-[11px]">
                    <span className="rounded-md bg-[#E6EDE2] px-2.5 py-0.5 text-[#2E5A44] font-medium">
                      {cit.kind}
                    </span>
                    <span className="text-[#6B7F73]">{cit.date}</span>
                  </div>
                  <h4 className="mt-2.5 font-fraunces text-lg text-[#14221B]">
                    {cit.title}
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#3D5247] leading-relaxed italic">
                    {cit.excerpt}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-[#EEF2EB] pt-2 font-ibm-mono text-[10px] text-[#6B7F73]">
                    <span>Felt tone: {cit.mood}</span>
                    <span className="text-[#2E5A44]">● Connected automatically</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive "Drop a Quiet Thought" Zero-Friction Input */}
          <div className="mt-8 border-t border-[#E2E9DD] pt-6">
            <form
              onSubmit={handleDropThought}
              className="flex flex-col sm:flex-row items-center gap-3"
            >
              <input
                type="text"
                value={quietThought}
                onChange={(e) => setQuietThought(e.target.value)}
                placeholder="Drop an unformatted thought here (no folders or #tags needed)..."
                className="w-full rounded-2xl border border-[#CBD6C4] bg-white px-4 py-3 text-sm text-[#14221B] placeholder-[#7C8F84] focus:border-[#2E5A44] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 rounded-2xl bg-[#2E5A44] px-6 py-3 text-xs font-medium text-[#FAFBF8] hover:bg-[#14221B] transition-colors cursor-pointer"
              >
                Let Noema Remember ↵
              </button>
            </form>

            <div className="mt-3 space-y-2">
              {capturedStream.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-[#EEF3EB] px-4 py-2.5 text-xs"
                >
                  <span className="text-[#14221B] font-medium">
                    “{item.text}”
                  </span>
                  <div className="flex items-center gap-3 font-ibm-mono text-[11px]">
                    <span className="text-[#2E5A44]">{item.inferredTag}</span>
                    <span className="text-[#6B7F73]">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ZERO MAINTENANCE / ANTI-GUILT MANIFESTO */}
      <section id="zero-guilt" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-[#CBD6C4] bg-[#FAFBF8] p-7">
            <span className="font-ibm-mono text-xs text-[#D97742]">
              01 // END SYSTEM FATIGUE
            </span>
            <h3 className="mt-3 font-fraunces text-2xl text-[#14221B]">
              Never reorganize a folder again
            </h3>
            <p className="mt-2 text-sm text-[#42584D] leading-relaxed">
              Most note apps fail because life gets busy and your carefully
              curated taxonomy falls behind. In Noema Sanctuary, there is nothing
              to fall behind on.
            </p>
          </div>

          <div className="rounded-3xl border border-[#CBD6C4] bg-[#FAFBF8] p-7">
            <span className="font-ibm-mono text-xs text-[#2E5A44]">
              02 // EPISODIC CONTEXT
            </span>
            <h3 className="mt-3 font-fraunces text-2xl text-[#14221B]">
              Weather, Season & Walk Trails
            </h3>
            <p className="mt-2 text-sm text-[#42584D] leading-relaxed">
              Human memory is deeply contextual. Noema softly attaches the
              season, light, and neighborhood walk to your voice notes so you
              can recall <em>how</em> a moment felt.
            </p>
          </div>

          <div
            id="sanctuary-privacy"
            className="rounded-3xl border border-[#CBD6C4] bg-[#FAFBF8] p-7"
          >
            <span className="font-ibm-mono text-xs text-[#14221B]">
              03 // INTIMATE PRIVACY
            </span>
            <h3 className="mt-3 font-fraunces text-2xl text-[#14221B]">
              Your inner life is never cloud training data
            </h3>
            <p className="mt-2 text-sm text-[#42584D] leading-relaxed">
              A second brain only works when you can be completely honest. All
              transcription, embedding, and synthesis run locally on your
              device’s silicon, locked behind FaceID.
            </p>
          </div>
        </div>

        {/* Serene Closing CTA */}
        <div
          id="begin-calm"
          className="mt-16 rounded-3xl border border-[#B8C7B0] bg-[#E5EDE0] p-8 sm:p-14 text-center"
        >
          <span className="font-ibm-mono text-xs uppercase tracking-[0.2em] text-[#2E5A44]">
            A QUIET HOME FOR YOUR MIND
          </span>
          <h2 className="mt-3 font-fraunces text-3xl sm:text-5xl text-[#14221B]">
            Stop managing notes.{" "}
            <span className="italic text-[#2E5A44]">Start remembering life.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base text-[#42584D]">
            Available on macOS, iOS, and Apple Watch for instant voice-walk
            capture.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full bg-[#14221B] px-7 py-3.5 text-sm font-medium text-[#FAFBF8] hover:bg-[#2E5A44] transition-colors cursor-pointer"
            >
              Begin Your Quiet Archive
            </button>
            <Link
              href="/without-design-skill/gemini-4-argon/1"
              className="rounded-full border border-[#14221B]/30 bg-[#FAFBF8] px-6 py-3.5 font-ibm-mono text-xs text-[#14221B] hover:bg-[#14221B] hover:text-[#FAFBF8] transition-colors"
            >
              Cycle Back to Iteration /1 (Neural Observatory) →
            </Link>
          </div>
        </div>
      </section>

      {/* Calm Footer */}
      <footer className="relative z-10 border-t border-[#D6DFD0] bg-[#E9EFE5] py-8 px-6 font-ibm-mono text-xs text-[#4E6357]">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4">
          <span>NOEMA SANCTUARY // ITERATION 05 OF 05 — BIOPHILIC CALM</span>
          <div className="flex items-center gap-2">
            <span>Switch Iteration:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <Link
                key={n}
                href={`/without-design-skill/gemini-4-argon/${n}`}
                className={`rounded-full px-2.5 py-1 ${
                  n === 5
                    ? "bg-[#2E5A44] text-white font-bold"
                    : "hover:text-[#14221B]"
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
