"use client";

import { useState } from "react";
import Link from "next/link";

interface LogEntry {
  id: string;
  time: string;
  text: string;
  concepts: string[];
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: "log-1",
    time: "08:30",
    text: "Finished reading Christopher Alexander’s essay on why [[Living Cities]] grow as overlapping semi-lattices rather than isolated tree hierarchies.",
    concepts: ["Living Cities"],
  },
  {
    id: "log-2",
    time: "11:15",
    text: "Measured a 42-hour fermentation curve on the rye levain; cooler cellar temperatures shift [[Microbial Succession]] toward milder lactic acid bacteria.",
    concepts: ["Microbial Succession"],
  },
  {
    id: "log-3",
    time: "14:05",
    text: "Walked through the timber market hall in Kyoto. The cedar eaves dampen street noise so effectively that [[Quiet Architecture]] becomes a public utility inside [[Living Cities]].",
    concepts: ["Quiet Architecture", "Living Cities"],
  },
];

const QUICK_THOUGHTS = [
  "Street trees along narrow canals cool [[Living Cities]] while sheltering songbirds in [[Quiet Architecture]].",
  "Traditional miso barrels rely on century-old rafters to seed [[Microbial Succession]] across seasons.",
  "Library reading alcoves lined in wool felt show how [[Quiet Architecture]] lowers heart rate within minutes.",
];

function extractConcepts(text: string): string[] {
  const matches = text.match(/\[\[([^\]]+)\]\]/g);
  if (!matches) return ["Daily Reflections"];
  const cleaned = matches
    .map((m) => m.replace(/^\[\[|\]\]$/g, "").trim())
    .filter(Boolean);
  return cleaned.length > 0 ? Array.from(new Set(cleaned)) : ["Daily Reflections"];
}

function renderHighlightedLogText(
  text: string,
  activeConcept: string | null,
  onSelectConcept: (c: string) => void
) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return parts.map((part, index) => {
    if (part.startsWith("[[") && part.endsWith("]]")) {
      const conceptName = part.slice(2, -2).trim();
      const isSelected = activeConcept === conceptName;
      return (
        <button
          key={index}
          type="button"
          onClick={() => onSelectConcept(conceptName)}
          className={`inline rounded px-1.5 py-0.5 text-sm font-medium transition-colors ${
            isSelected
              ? "bg-[#C84B31] text-white"
              : "bg-[#DCE1E7]/70 text-[#1A1D20] hover:bg-[#C84B31]/15 hover:text-[#C84B31]"
          }`}
        >
          [[{conceptName}]]
        </button>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function ScriptoriumIterationPage() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [inputText, setInputText] = useState(
    "Old stone cisterns beneath [[Living Cities]] act as thermal reservoirs for [[Quiet Architecture]]."
  );
  const [selectedConcept, setSelectedConcept] = useState<string | null>(
    "Living Cities"
  );

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;
    const concepts = extractConcepts(trimmed);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    const newEntry: LogEntry = {
      id: `log-${Date.now()}`,
      time: timeStr,
      text: trimmed,
      concepts,
    };

    setLogs((prev) => [newEntry, ...prev]);
    setSelectedConcept(concepts[0]);
    setInputText("");
  };

  // Build dynamic concept index from all logs
  const conceptMap = new Map<string, LogEntry[]>();
  for (const entry of logs) {
    for (const c of entry.concepts) {
      const existing = conceptMap.get(c) ?? [];
      existing.push(entry);
      conceptMap.set(c, existing);
    }
  }
  const allConcepts = Array.from(conceptMap.entries());

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#1A1D20] font-sans selection:bg-[#C84B31]/15 selection:text-[#C84B31]">
      {/* Minimalist Top Bar */}
      <header className="border-b border-[#DCE1E7] bg-[#F3F5F7]/90 backdrop-blur-xs sticky top-0 z-30">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/with-design-skill/gemini-4-argon/5" className="flex items-center gap-3">
            <span
              className="inline-flex h-5 w-5 items-center justify-center rounded-xs bg-[#C84B31] text-[11px] font-serif text-white"
              aria-hidden="true"
            >
              M
            </span>
            <span className="font-instrument text-2xl tracking-tight text-[#1A1D20]">
              Marrow
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm text-[#5C646D]">
            <a
              href="#daily-sheet"
              className="hover:text-[#1A1D20] transition-colors"
            >
              Daily log
            </a>
            <a
              href="#evergreen-index"
              className="hover:text-[#1A1D20] transition-colors hidden sm:inline"
            >
              Concept pages
            </a>
            <a
              href="#calm-principles"
              className="hover:text-[#1A1D20] transition-colors hidden sm:inline"
            >
              Philosophy
            </a>
            <a
              href="#start-writing"
              className="rounded-md bg-[#1A1D20] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#C84B31] transition-colors"
            >
              Start today’s page
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pt-14 pb-28">
        {/* Serene Centered Headline */}
        <section className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-instrument text-4xl sm:text-6xl font-normal leading-[1.08] tracking-tight text-[#1A1D20]">
            Write only in today’s page. Let your archive organize itself.
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-[1.65] text-[#5C646D]">
            Stop spending your mornings deciding where a note belongs. In
            Marrow, you open a single blank sheet every morning, jot down what
            you are learning, and bracket any recurring subject. Every mention
            gathers automatically into permanent topic pages below.
          </p>
        </section>

        {/* Interactive Hero: Working Daily Chronicle + Live Concept Compiler */}
        <section
          id="daily-sheet"
          aria-label="Interactive daily logbook and automatic concept indexer"
          className="rounded-2xl border border-[#DCE1E7] bg-white shadow-xs overflow-hidden"
        >
          {/* Today's Sheet Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE1E7] bg-[#F8FAFC] px-6 sm:px-8 py-4">
            <div className="flex items-baseline gap-3">
              <h2 className="font-instrument text-2xl sm:text-3xl text-[#1A1D20]">
                Tuesday, October 13
              </h2>
              <span className="text-xs text-[#5C646D]">
                {logs.length} entries recorded today
              </span>
            </div>
            <span className="text-xs text-[#5C646D]">
              Wrap any phrase in [[double brackets]] to file it automatically
            </span>
          </div>

          {/* Live Entry Composer */}
          <div className="p-6 sm:p-8 border-b border-[#DCE1E7]">
            <form onSubmit={handleAddLog} className="space-y-3">
              <label
                htmlFor="journal-composer"
                className="block text-xs font-medium text-[#5C646D]"
              >
                Write a new observation in today’s log (or edit the sample
                below):
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  id="journal-composer"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Jot a thought and include a [[Concept Name]]..."
                  className="flex-1 rounded-lg border border-[#DCE1E7] bg-[#F3F5F7]/60 px-4 py-2.5 text-sm text-[#1A1D20] placeholder:text-[#5C646D]/60 focus:border-[#1A1D20] focus:bg-white focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-[#C84B31] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#a83b24] transition-colors"
                >
                  Append to today’s log
                </button>
              </div>
            </form>

            {/* Sample prompts for one-click testing */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#5C646D]">
              <span>Or insert a sample note:</span>
              {QUICK_THOUGHTS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputText(sample)}
                  className="rounded border border-[#DCE1E7] bg-[#F3F5F7] px-2.5 py-1 text-xs text-[#1A1D20] hover:border-[#1A1D20] transition-colors"
                >
                  Sample {idx + 1}
                </button>
              ))}
            </div>

            {/* Chronological Stream of Today's Entries */}
            <div className="mt-8 space-y-4">
              {logs.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-baseline gap-4 border-l-2 border-[#DCE1E7] pl-4 py-1 hover:border-[#C84B31] transition-colors"
                >
                  <time className="shrink-0 text-xs text-[#5C646D] w-11">
                    {entry.time}
                  </time>
                  <p className="text-sm sm:text-base leading-[1.65] text-[#1A1D20]">
                    {renderHighlightedLogText(
                      entry.text,
                      selectedConcept,
                      setSelectedConcept
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Automatic Evergreen Concept Index (Updates Live as User Appends) */}
          <div
            id="evergreen-index"
            className="bg-[#F8FAFC] p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-instrument text-2xl text-[#1A1D20]">
                  Automatically compiled concept pages ({allConcepts.length})
                </h3>
                <p className="text-xs sm:text-sm text-[#5C646D]">
                  Every bracketed topic above maintains its own self-updating
                  dossier of dated citations. Click any topic to inspect its
                  collected entries.
                </p>
              </div>
            </div>

            {/* Concept Selector Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {allConcepts.map(([conceptName, entries]) => {
                const isSelected = selectedConcept === conceptName;
                return (
                  <button
                    key={conceptName}
                    type="button"
                    onClick={() => setSelectedConcept(conceptName)}
                    className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-all flex items-center gap-2 ${
                      isSelected
                        ? "border-[#1A1D20] bg-[#1A1D20] text-white"
                        : "border-[#DCE1E7] bg-white text-[#1A1D20] hover:border-[#1A1D20]"
                    }`}
                  >
                    <span>{conceptName}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                        isSelected
                          ? "bg-[#C84B31] text-white"
                          : "bg-[#F3F5F7] text-[#5C646D]"
                      }`}
                    >
                      {entries.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Concept Dossier Card */}
            {selectedConcept && conceptMap.has(selectedConcept) && (
              <div className="rounded-xl border border-[#DCE1E7] bg-white p-6">
                <div className="flex items-baseline justify-between border-b border-[#DCE1E7] pb-3">
                  <div>
                    <span className="text-xs text-[#C84B31] font-medium">
                      Evergreen Topic Dossier
                    </span>
                    <h4 className="font-instrument text-3xl text-[#1A1D20] mt-0.5">
                      {selectedConcept}
                    </h4>
                  </div>
                  <span className="text-xs text-[#5C646D]">
                    {conceptMap.get(selectedConcept)?.length} linked journal
                    passages
                  </span>
                </div>

                <div className="mt-4 divide-y divide-[#DCE1E7]">
                  {conceptMap.get(selectedConcept)?.map((item) => (
                    <div
                      key={item.id}
                      className="py-3.5 flex items-baseline gap-4"
                    >
                      <span className="shrink-0 text-xs text-[#5C646D]">
                        Oct 13, {item.time}
                      </span>
                      <p className="text-sm sm:text-base text-[#1A1D20] leading-[1.6]">
                        {item.text.replace(/\[\[|\]\]/g, "")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quiet Restraint Section: Why Less Machinery Means More Thinking */}
        <section id="calm-principles" className="mt-24 space-y-12">
          <div className="max-w-xl">
            <h2 className="font-instrument text-3xl sm:text-4xl text-[#1A1D20] leading-tight">
              Designed like a quiet paper notebook, not an enterprise dashboard
            </h2>
            <p className="mt-3 text-base leading-[1.65] text-[#5C646D]">
              Many knowledge tools collapse under the weight of their own
              templates, plugins, and maintenance rituals. Marrow removes every
              distraction between waking up with an idea and writing it down.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#DCE1E7] pt-10">
            <div>
              <h3 className="font-instrument text-2xl text-[#1A1D20]">
                Zero inbox guilt when you step away
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-[1.65] text-[#5C646D]">
                There are no overdue badges, unfiled note counters, or broken
                database schemas. If you take a month off in the mountains, you
                return to a clean sheet dated with the morning of your return.
              </p>
            </div>

            <div>
              <h3 className="font-instrument text-2xl text-[#1A1D20]">
                On-this-day serendipity across years
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-[1.65] text-[#5C646D]">
                At the foot of each daily sheet, Marrow quietly shows what you
                were reading and questioning on the same calendar date one, two,
                and five years ago.
              </p>
            </div>

            <div>
              <h3 className="font-instrument text-2xl text-[#1A1D20]">
                Keyboard-first speed with zero formatting clutter
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-[1.65] text-[#5C646D]">
                Press Command-K from anywhere on your computer to jot a quick
                sentence into today’s log without leaving the book or paper you
                are reading.
              </p>
            </div>

            <div>
              <h3 className="font-instrument text-2xl text-[#1A1D20]">
                One folder of dated plain-text files
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-[1.65] text-[#5C646D]">
                Every daily log is saved as `2026-10-13.md` on your own disk.
                Your lifetime chronicle stays portable, private, and readable in
                any text editor on earth.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Call to Action */}
        <section
          id="start-writing"
          className="mt-24 rounded-2xl border border-[#DCE1E7] bg-white p-8 sm:p-12 text-center"
        >
          <h2 className="font-instrument text-3xl sm:text-4xl text-[#1A1D20]">
            Open today’s page and write your first line.
          </h2>
          <p className="mt-3 text-base text-[#5C646D] max-w-lg mx-auto leading-[1.65]">
            Download Marrow for macOS, iOS, and Linux, or try the live daily
            sheet above. No sign-up, no telemetry, and no cloud lock-in.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 200, behavior: "smooth" });
                const el = document.getElementById("journal-composer");
                el?.focus();
              }}
              className="rounded-lg bg-[#1A1D20] px-5 py-3 text-sm font-medium text-white hover:bg-[#C84B31] transition-colors"
            >
              Write in today’s live log
            </button>
            <a
              href="#daily-sheet"
              className="rounded-lg border border-[#DCE1E7] bg-[#F3F5F7] px-5 py-3 text-sm font-medium text-[#1A1D20] hover:border-[#1A1D20] transition-colors"
            >
              Download for macOS (Universal)
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
