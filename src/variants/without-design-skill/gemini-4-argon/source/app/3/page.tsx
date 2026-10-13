/* eslint-disable react/jsx-no-comment-textnodes -- The generated interface intentionally displays slash-prefixed labels. */
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

interface IndexedRecord {
  id: string;
  code: string;
  title: string;
  domain: string;
  latencyMs: string;
  tokens: number;
  backlinks: number;
  snippet: string;
  tags: string[];
}

const RECORDS: IndexedRecord[] = [
  {
    id: "rec-01",
    code: "SYS-0041",
    title: "Zero-Latency Thought Capture Protocol",
    domain: "COGNITIVE_ERGONOMICS",
    latencyMs: "0.24ms",
    tokens: 412,
    backlinks: 19,
    snippet:
      "Working memory decays within 18 seconds (Peterson & Peterson, 1959). If opening your note app takes 4 seconds, 40% of nuances evaporate before the cursor blinks.",
    tags: ["#working-memory", "#latency", "@miller-1956"],
  },
  {
    id: "rec-02",
    code: "SYS-0089",
    title: "Interstitial Journaling vs. To-Do Lists",
    domain: "EXECUTION_LOOP",
    latencyMs: "0.31ms",
    tokens: 680,
    backlinks: 27,
    snippet:
      "By logging exact timestamps (09:42, 11:15) alongside context switches, your daily note becomes both an automatic time-audit and an evergreen project ledger.",
    tags: ["#interstitial", "#daily-log", "#time-block"],
  },
  {
    id: "rec-03",
    code: "SYS-0112",
    title: "SQLite + HNSW Vector Index in WebAssembly",
    domain: "STORAGE_ENGINE",
    latencyMs: "0.42ms",
    tokens: 950,
    backlinks: 34,
    snippet:
      "Noema compiles a custom SQLite FTS5 + HNSW vector index directly to WASM. 50,000 markdown notes query in under 1 millisecond with zero network hops.",
    tags: ["#sqlite", "#wasm", "#local-first"],
  },
  {
    id: "rec-04",
    code: "SYS-0154",
    title: "Cloze Deletion Extraction from Markdown",
    domain: "MEMORY_RETENTION",
    latencyMs: "0.19ms",
    tokens: 530,
    backlinks: 14,
    snippet:
      "Wrap any key phrase in {curly braces} inside a regular note to automatically register an FSRS-5 spaced repetition prompt without switching apps.",
    tags: ["#fsrs-5", "#spaced-repetition", "#cloze"],
  },
  {
    id: "rec-05",
    code: "SYS-0208",
    title: "Bi-Directional AST Graph Compiler",
    domain: "COMPILER_SPEC",
    latencyMs: "0.29ms",
    tokens: 820,
    backlinks: 41,
    snippet:
      "Every save triggers an incremental Remark AST parse, updating backlink pointers, @person mentions, and #project transclusions across the entire vault.",
    tags: ["#ast", "#transclusion", "#graph"],
  },
];

interface LogEntry {
  time: string;
  raw: string;
  entities: string[];
}

const INITIAL_LOGS: LogEntry[] = [
  {
    time: "09:14:02",
    raw: "Reviewed [[SQLite + HNSW Vector Index in WebAssembly]] with @Marcus for #Core-Engine v4.2 release.",
    entities: ["[[SQLite + HNSW]]", "@Marcus", "#Core-Engine"],
  },
  {
    time: "11:38:45",
    raw: "Synthesized insight on [[Zero-Latency Thought Capture Protocol]] — sub-16ms frame budget is mandatory.",
    entities: ["[[Zero-Latency]]", "16ms"],
  },
  {
    time: "14:22:10",
    raw: "Scheduled FSRS review pass on [[Cloze Deletion Extraction from Markdown]] before #Q4-Architecture review.",
    entities: ["[[Cloze Deletion]]", "#Q4-Architecture"],
  },
];

const SHORTCUT_SPECS = [
  {
    chord: "⌘ + K",
    action: "Universal Command & Semantic Recall",
    speed: "0.38ms",
    detail:
      "Fuzzy-search titles, full-text FTS5, and 1,536-d vector embeddings from a single unified input bar.",
  },
  {
    chord: "⌘ + J",
    action: "Global Interstitial Capture",
    speed: "0.15ms",
    detail:
      "Summon an overlay anywhere in your OS. Appends a timestamped entry to today's Daily Note and auto-links entities.",
  },
  {
    chord: "⌘ + \\",
    action: "Split-Pane Transclusion Stack",
    speed: "60 FPS",
    detail:
      "Open up to 6 linked notes side-by-side with live bidirectional block transclusion—edit once, update everywhere.",
  },
  {
    chord: "⌘ + ⇧ + R",
    action: "FSRS-5 Spaced Recall Queue",
    speed: "Auto-Scheduled",
    detail:
      "Review atomic concepts and {cloze} blocks right inside your daily workflow using the Free Spaced Repetition Scheduler.",
  },
];

export default function IterationThreePage() {
  const [mode, setMode] = useState<"recall" | "interstitial" | "flashcard">("recall");
  const [query, setQuery] = useState<string>("");
  const [selectedRecordId, setSelectedRecordId] = useState<string>("rec-01");
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [logInput, setLogInput] = useState<string>("");
  const [clozeRevealed, setClozeRevealed] = useState<boolean>(false);
  const [selectedShortcut, setSelectedShortcut] = useState<number>(0);

  const filteredRecords = useMemo(() => {
    if (!query.trim()) return RECORDS;
    const q = query.toLowerCase();
    return RECORDS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.snippet.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const activeRecord =
    filteredRecords.find((r) => r.id === selectedRecordId) ||
    filteredRecords[0] ||
    RECORDS[0];

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logInput.trim()) return;
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
      now.getSeconds()
    )}`;
    const extracted =
      logInput.match(/(\[\[.*?\]\]|@[a-zA-Z0-9_-]+|#[a-zA-Z0-9_-]+)/g) || [
        "#fleeting-note",
        "[[Auto-Indexed]]",
      ];
    setLogs((prev) => [
      {
        time: timeStr,
        raw: logInput.trim(),
        entities: extracted,
      },
      ...prev,
    ]);
    setLogInput("");
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#0A0A0A] font-space selection:bg-[#FF3B00] selection:text-white">
      {/* Top Industrial Telemetry Bar */}
      <div className="border-b border-[#0A0A0A] bg-[#0A0A0A] text-[#F4F4F0] px-6 py-2 font-jetbrains text-[11px]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 bg-[#FF3B00]" />
            <span>NOEMA // SWISS COGNITIVE OS (ITERATION /3)</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-zinc-400">
            <span>INDEXED_NODES: 14,892</span>
            <span>QUERY_P99: 0.38ms</span>
            <span>ENGINE: SQLITE_WASM_FTS5</span>
          </div>
          <span className="text-[#FF3B00] font-semibold">
            [KEYBOARD-FIRST ARCHITECTURE]
          </span>
        </div>
      </div>

      {/* Exposed Grid Header */}
      <header className="sticky top-0 z-30 border-b border-[#0A0A0A] bg-[#F4F4F0]/95 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-12 items-center">
          <div className="col-span-6 sm:col-span-3 border-r border-[#0A0A0A] px-6 py-4 flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center bg-[#FF3B00] font-jetbrains text-xs font-bold text-white">
              N/3
            </div>
            <span className="font-space text-lg font-bold tracking-tight uppercase">
              Noema.OS
            </span>
          </div>

          <nav className="hidden sm:flex sm:col-span-6 border-r border-[#0A0A0A] px-6 py-4 items-center justify-around font-jetbrains text-xs uppercase">
            <a href="#command-engine" className="hover:text-[#FF3B00] transition-colors">
              01_Command_Bar
            </a>
            <a href="#specs" className="hover:text-[#FF3B00] transition-colors">
              02_Benchmarks
            </a>
            <a href="#shortcuts" className="hover:text-[#FF3B00] transition-colors">
              03_Key_Matrix
            </a>
          </nav>

          <div className="col-span-6 sm:col-span-3 px-6 py-4 flex justify-end">
            <a
              href="#deploy"
              className="bg-[#0A0A0A] px-4 py-2 font-jetbrains text-xs font-bold uppercase text-white hover:bg-[#FF3B00] transition-colors"
            >
              INSTALL CLI + APP →
            </a>
          </div>
        </div>
      </header>

      {/* ARCHITECTURAL GRID HERO */}
      <section className="mx-auto max-w-7xl border-x border-b border-[#0A0A0A] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#0A0A0A]">
          <div className="lg:col-span-8 p-8 sm:p-12 lg:border-r border-[#0A0A0A]">
            <div className="inline-flex items-center gap-2 border border-[#0A0A0A] bg-[#F4F4F0] px-3 py-1 font-jetbrains text-xs uppercase mb-6">
              <span className="text-[#FF3B00] font-bold">SPEC // 16.67MS FRAME BUDGET</span>
              <span>•</span>
              <span>ZERO MOUSE REQUIRED</span>
            </div>
            <h1 className="font-space text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-tight leading-[1.02] uppercase">
              Thought moves at 120 WPM.{" "}
              <span className="text-[#FF3B00]">Your second brain</span> must
              respond in 0.4ms.
            </h1>
          </div>

          <div className="lg:col-span-4 p-8 sm:p-12 bg-[#F4F4F0] flex flex-col justify-between">
            <div className="space-y-4">
              <p className="font-jetbrains text-xs uppercase tracking-wider text-zinc-500">
                // DESIGN THESIS
              </p>
              <p className="text-sm leading-relaxed text-zinc-800">
                Bloated electron wrappers and cloud spinners break cognitive flow.
                Noema OS treats personal knowledge as a high-frequency compiler:
                instant capture, deterministic AST backlinks, and FSRS-5 memory
                scheduling.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 border border-[#0A0A0A] bg-white font-jetbrains">
              <div className="border-r border-[#0A0A0A] p-3">
                <span className="block text-[10px] text-zinc-500">COLD BOOT</span>
                <span className="text-xl font-bold text-[#0A0A0A]">18 ms</span>
              </div>
              <div className="p-3">
                <span className="block text-[10px] text-zinc-500">50K SEARCH</span>
                <span className="text-xl font-bold text-[#FF3B00]">0.38 ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE COMMAND ENGINE WORKBENCH */}
        <div id="command-engine" className="p-6 sm:p-10 bg-[#F4F4F0]">
          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex border border-[#0A0A0A] bg-white">
              <button
                type="button"
                onClick={() => setMode("recall")}
                className={`px-4 py-2.5 font-jetbrains text-xs font-bold uppercase transition-colors cursor-pointer ${
                  mode === "recall"
                    ? "bg-[#0A0A0A] text-white"
                    : "text-[#0A0A0A] hover:bg-zinc-100"
                }`}
              >
                [⌘K] INSTANT RECALL ({RECORDS.length})
              </button>
              <button
                type="button"
                onClick={() => setMode("interstitial")}
                className={`border-l border-[#0A0A0A] px-4 py-2.5 font-jetbrains text-xs font-bold uppercase transition-colors cursor-pointer ${
                  mode === "interstitial"
                    ? "bg-[#FF3B00] text-white"
                    : "text-[#0A0A0A] hover:bg-zinc-100"
                }`}
              >
                [⌘J] INTERSTITIAL LOG ({logs.length})
              </button>
              <button
                type="button"
                onClick={() => setMode("flashcard")}
                className={`border-l border-[#0A0A0A] px-4 py-2.5 font-jetbrains text-xs font-bold uppercase transition-colors cursor-pointer ${
                  mode === "flashcard"
                    ? "bg-[#0047FF] text-white"
                    : "text-[#0A0A0A] hover:bg-zinc-100"
                }`}
              >
                [⌘R] FSRS-5 CLOZE DRILL
              </button>
            </div>

            <span className="font-jetbrains text-xs text-zinc-600">
              STATUS: <strong className="text-emerald-700">ONLINE // LOCAL WASM</strong>
            </span>
          </div>

          {/* MODE 1: [⌘K] INSTANT RECALL */}
          {mode === "recall" && (
            <div className="border-2 border-[#0A0A0A] bg-white shadow-[8px_8px_0px_#0A0A0A]">
              {/* Command Input Bar */}
              <div className="flex items-center gap-3 border-b-2 border-[#0A0A0A] bg-[#0A0A0A] px-4 py-3.5 text-white">
                <span className="bg-[#FF3B00] px-2 py-0.5 font-jetbrains text-xs font-bold">
                  ⌘K
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter 14,892 notes by title, #tag, @person, or semantic concept..."
                  className="w-full bg-transparent font-jetbrains text-sm text-white placeholder-zinc-400 focus:outline-none"
                />
                <span className="shrink-0 font-jetbrains text-xs text-[#FF3B00]">
                  {filteredRecords.length} HITS IN 0.28ms
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Table of Hits */}
                <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#0A0A0A] divide-y divide-[#0A0A0A]">
                  {filteredRecords.map((rec) => {
                    const isSelected = rec.id === activeRecord.id;
                    return (
                      <button
                        key={rec.id}
                        type="button"
                        onClick={() => setSelectedRecordId(rec.id)}
                        className={`w-full p-4 text-left transition-colors flex items-center justify-between gap-4 cursor-pointer ${
                          isSelected
                            ? "bg-[#FF3B00]/10 border-l-4 border-l-[#FF3B00]"
                            : "hover:bg-zinc-50"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 font-jetbrains text-[11px] text-zinc-500">
                            <span className="font-bold text-[#0A0A0A]">
                              {rec.code}
                            </span>
                            <span>//</span>
                            <span>{rec.domain}</span>
                          </div>
                          <p className="mt-1 font-space text-base font-bold text-[#0A0A0A]">
                            {rec.title}
                          </p>
                        </div>
                        <div className="text-right font-jetbrains text-xs shrink-0">
                          <span className="block font-bold text-[#0047FF]">
                            {rec.latencyMs}
                          </span>
                          <span className="text-[11px] text-zinc-500">
                            {rec.backlinks} links
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right AST Note Inspector */}
                <div className="lg:col-span-5 p-6 bg-[#F9F9F6] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-3 font-jetbrains text-xs">
                      <span className="font-bold text-[#FF3B00]">
                        AST_NODE // {activeRecord.code}
                      </span>
                      <span>TOKENS: {activeRecord.tokens}</span>
                    </div>

                    <h3 className="mt-4 font-space text-2xl font-bold text-[#0A0A0A]">
                      {activeRecord.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                      {activeRecord.snippet}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {activeRecord.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-[#0A0A0A] bg-white px-2.5 py-1 font-jetbrains text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-[#0A0A0A] pt-4 font-jetbrains text-xs flex items-center justify-between">
                    <span>BACKLINK_DEGREE: {activeRecord.backlinks} NODES</span>
                    <span className="text-[#0047FF] font-bold">
                      [ENTER TO TRANSCLUDE]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: [⌘J] INTERSTITIAL JOURNALING STREAM */}
          {mode === "interstitial" && (
            <div className="border-2 border-[#0A0A0A] bg-white p-6 shadow-[8px_8px_0px_#0A0A0A]">
              <form onSubmit={handleAddLog} className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="text"
                  value={logInput}
                  onChange={(e) => setLogInput(e.target.value)}
                  placeholder="Type a timestamped thought with [[Links]], @People, or #Projects..."
                  className="flex-1 border-2 border-[#0A0A0A] bg-[#F4F4F0] px-4 py-3 font-jetbrains text-sm text-[#0A0A0A] placeholder-zinc-500 focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#FF3B00] px-6 py-3 font-jetbrains text-xs font-bold uppercase text-white hover:bg-[#0A0A0A] transition-colors cursor-pointer"
                >
                  APPEND LOG ↵
                </button>
              </form>

              <div className="divide-y divide-[#0A0A0A] border border-[#0A0A0A]">
                {logs.map((entry, idx) => (
                  <div
                    key={idx}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-zinc-50"
                  >
                    <div className="flex items-start gap-4">
                      <span className="bg-[#0A0A0A] px-2 py-1 font-jetbrains text-xs font-bold text-white">
                        {entry.time}
                      </span>
                      <p className="text-sm font-medium text-[#0A0A0A]">
                        {entry.raw}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {entry.entities.map((ent, i) => (
                        <span
                          key={i}
                          className="border border-[#0A0A0A] bg-[#F4F4F0] px-2 py-0.5 font-jetbrains text-[11px] font-semibold text-[#0047FF]"
                        >
                          {ent}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE 3: [⌘R] FSRS-5 CLOZE FLASHCARD DRILL */}
          {mode === "flashcard" && (
            <div className="border-2 border-[#0A0A0A] bg-white p-8 shadow-[8px_8px_0px_#0A0A0A]">
              <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-4 font-jetbrains text-xs">
                <span className="font-bold text-[#0047FF]">
                  FSRS-5 SCHEDULER // STABILITY: 42 DAYS
                </span>
                <span>SOURCE: SYS-0041 (WORKING MEMORY)</span>
              </div>

              <div className="py-8">
                <p className="font-space text-2xl sm:text-3xl font-bold leading-snug text-[#0A0A0A]">
                  According to Peterson & Peterson (1959), uncaptured working
                  memory traces decay within{" "}
                  {clozeRevealed ? (
                    <span className="bg-[#0047FF] px-3 py-1 text-white font-jetbrains">
                      18 to 30 seconds
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setClozeRevealed(true)}
                      className="border-2 border-dashed border-[#FF3B00] bg-[#FF3B00]/10 px-4 py-1 font-jetbrains text-lg text-[#FF3B00] hover:bg-[#FF3B00] hover:text-white transition-colors cursor-pointer"
                    >
                      [CLICK TO REVEAL CLOZE]
                    </button>
                  )}{" "}
                  unless externalized into an associative note.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#0A0A0A] pt-4 font-jetbrains text-xs">
                <button
                  type="button"
                  onClick={() => setClozeRevealed((v) => !v)}
                  className="border border-[#0A0A0A] bg-[#F4F4F0] px-4 py-2 font-bold uppercase hover:bg-[#0A0A0A] hover:text-white transition-colors cursor-pointer"
                >
                  {clozeRevealed ? "HIDE ANSWER" : "REVEAL ANSWER"}
                </button>
                <div className="flex items-center gap-2">
                  <span>GRADE RECALL:</span>
                  {["1_AGAIN (10m)", "2_HARD (3d)", "3_GOOD (14d)", "4_EASY (48d)"].map(
                    (label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setClozeRevealed(false)}
                        className="border border-[#0A0A0A] px-3 py-1.5 hover:bg-[#0047FF] hover:text-white transition-colors cursor-pointer"
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: BENCHMARKS & KEYBOARD MATRIX */}
      <section id="specs" className="mx-auto max-w-7xl border-x border-b border-[#0A0A0A] bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left 6 Cols: Latency Benchmarks */}
          <div className="lg:col-span-6 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#0A0A0A]">
            <span className="font-jetbrains text-xs font-bold uppercase text-[#FF3B00]">
              02 // EMPIRICAL LATENCY BENCHMARKS
            </span>
            <h2 className="mt-2 font-space text-3xl font-bold uppercase">
              50,000 Notes. Zero Cloud Spinners.
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Measured on Apple M3 Max with a 50,000-file Markdown vault + 1536-d
              local embeddings.
            </p>

            <div className="mt-8 space-y-5 font-jetbrains text-xs">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="font-bold text-[#0A0A0A]">
                    NOEMA OS (LOCAL SQLITE + HNSW)
                  </span>
                  <span className="font-bold text-[#FF3B00]">0.38 ms</span>
                </div>
                <div className="h-4 w-full border border-[#0A0A0A] bg-[#F4F4F0]">
                  <div className="h-full w-[4%] bg-[#FF3B00]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-zinc-600">LOCAL ELECTRON GRAPH APPS</span>
                  <span>48.00 ms</span>
                </div>
                <div className="h-4 w-full border border-[#0A0A0A] bg-[#F4F4F0]">
                  <div className="h-full w-[38%] bg-zinc-800" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-zinc-600">CLOUD BLOCK-BASED WIKIS</span>
                  <span>640.00 ms</span>
                </div>
                <div className="h-4 w-full border border-[#0A0A0A] bg-[#F4F4F0]">
                  <div className="h-full w-[94%] bg-zinc-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Interactive Keyboard Chord Explorer */}
          <div id="shortcuts" className="lg:col-span-6 p-8 sm:p-12 bg-[#F4F4F0]">
            <span className="font-jetbrains text-xs font-bold uppercase text-[#0047FF]">
              03 // ERGONOMIC KEY CHORDS
            </span>
            <h2 className="mt-2 font-space text-3xl font-bold uppercase">
              Muscle Memory First
            </h2>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SHORTCUT_SPECS.map((s, idx) => (
                <button
                  key={s.chord}
                  type="button"
                  onClick={() => setSelectedShortcut(idx)}
                  className={`border border-[#0A0A0A] p-3 font-jetbrains text-xs font-bold transition-all cursor-pointer ${
                    selectedShortcut === idx
                      ? "bg-[#0A0A0A] text-white shadow-[4px_4px_0px_#FF3B00]"
                      : "bg-white text-[#0A0A0A] hover:bg-zinc-100"
                  }`}
                >
                  {s.chord}
                </button>
              ))}
            </div>

            <div className="mt-6 border-2 border-[#0A0A0A] bg-white p-6">
              <div className="flex items-center justify-between font-jetbrains text-xs border-b border-[#0A0A0A] pb-3">
                <span className="font-bold text-[#FF3B00]">
                  CHORD: {SHORTCUT_SPECS[selectedShortcut].chord}
                </span>
                <span className="bg-[#0A0A0A] px-2 py-0.5 text-white">
                  {SHORTCUT_SPECS[selectedShortcut].speed}
                </span>
              </div>
              <h3 className="mt-4 font-space text-xl font-bold">
                {SHORTCUT_SPECS[selectedShortcut].action}
              </h3>
              <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                {SHORTCUT_SPECS[selectedShortcut].detail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DEPLOYMENT CTA */}
      <section id="deploy" className="mx-auto max-w-7xl border-x border-b border-[#0A0A0A] bg-[#0A0A0A] text-white p-8 sm:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="font-jetbrains text-xs text-[#FF3B00] uppercase">
              // READY FOR PRODUCTION MINDS
            </span>
            <h2 className="mt-2 font-space text-3xl sm:text-5xl font-bold uppercase tracking-tight">
              Compile your thoughts at native speed.
            </h2>
            <p className="mt-3 font-jetbrains text-xs sm:text-sm text-zinc-400">
              $ brew install --cask noema-os &nbsp;&nbsp;// or explore the next
              design iteration
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-[#FF3B00] px-6 py-3.5 font-jetbrains text-xs font-bold uppercase text-white hover:bg-white hover:text-[#0A0A0A] transition-colors cursor-pointer"
            >
              LAUNCH COMMAND BAR ↑
            </button>
            <Link
              href="/without-design-skill/gemini-4-argon/4"
              className="border border-white/30 px-5 py-3.5 font-jetbrains text-xs uppercase text-white hover:bg-white hover:text-[#0A0A0A] transition-colors"
            >
              NEXT: /4 SPATIAL CANVAS →
            </Link>
          </div>
        </div>
      </section>

      {/* Industrial Footer */}
      <footer className="mx-auto max-w-7xl px-6 py-8 font-jetbrains text-xs text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>NOEMA.OS // ITERATION 03 OF 05 — SWISS BRUTALIST PRECISION</span>
        <div className="flex items-center gap-2">
          <span>ROUTE_INDEX:</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <Link
              key={n}
              href={`/without-design-skill/gemini-4-argon/${n}`}
              className={`border border-[#0A0A0A] px-2.5 py-1 ${
                n === 3 ? "bg-[#FF3B00] text-white font-bold" : "bg-white hover:bg-zinc-200"
              }`}
            >
              /{n}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
