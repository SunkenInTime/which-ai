"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Cpu,
  Database,
  HardDrive,
  Keyboard,
  Lock,
  Plus,
  Radio,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";

interface MemoryEntry {
  id: string;
  timestamp: string;
  text: string;
  tags: string[];
  links: string[];
}

const INITIAL_ENTRIES: MemoryEntry[] = [
  {
    id: "ENG-4820",
    timestamp: "09:14:02",
    text: "External memory should operate like a precision synthesizer—instant capture, deterministic recall, zero cloud lag.",
    tags: ["#architecture", "#speed"],
    links: ["[[Local-First]]"],
  },
  {
    id: "ENG-4819",
    timestamp: "08:47:19",
    text: "CRDT merge benchmark passed: 100,000 encrypted markdown blocks reconciled in 0.41ms across 3 devices.",
    tags: ["#crdt", "#benchmark"],
    links: ["[[Sync Protocol]]"],
  },
  {
    id: "ENG-4818",
    timestamp: "YESTERDAY",
    text: "Note to self: connect [[Cybernetics]] feedback loops with [[Spaced Recall]] intervals before Thursday's lab seminar.",
    tags: ["#research"],
    links: ["[[Cybernetics]]", "[[Spaced Recall]]"],
  },
];

const SHORTCUTS = [
  {
    keys: "⌘ + K",
    name: "QUANTUM JUMP",
    latency: "0.6ms",
    detail:
      "Opens fuzzy + vector semantic recall across your entire local vault. Jump between any two concepts in under three keystrokes.",
  },
  {
    keys: "⌘ + ⇧ + N",
    name: "GLOBAL CAPTURE",
    latency: "0.2ms",
    detail:
      "Summons a lightweight floating scratchpad over any app—code editor, browser, or PDF—and stamps your note directly into today's tape.",
  },
  {
    keys: "[[ ... ]]",
    name: "NEURAL LINK",
    latency: "0.1ms",
    detail:
      "Instantly resolves existing engrams or spawns a linked stub node while registering the reverse backlink automatically.",
  },
  {
    keys: "⌘ + G",
    name: "CONSTELLATION",
    latency: "16ms",
    detail:
      "Switches the viewport to a hardware-accelerated spatial graph showing 1-hop and 2-hop conceptual neighborhoods.",
  },
  {
    keys: "⌥ + J",
    name: "DAILY LOG TAPE",
    latency: "0.3ms",
    detail:
      "Snaps straight to today's chronological log with unfinished tasks carried forward cleanly from yesterday.",
  },
];

export default function TerminalLanding() {
  const [entries, setEntries] = useState<MemoryEntry[]>(INITIAL_ENTRIES);
  const [draft, setDraft] = useState("");
  const [switches, setSwitches] = useState({
    autoLink: true,
    localEncrypt: true,
    backlinkRadar: true,
    dailyDigest: false,
  });
  const [activeShortcut, setActiveShortcut] = useState(0);

  const toggleSwitch = (key: keyof typeof switches) => {
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStore = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    const tags = Array.from(trimmed.matchAll(/#[\w-]+/g)).map((m) => m[0]);
    const links = Array.from(trimmed.matchAll(/\[\[[^\]]+\]\]/g)).map(
      (m) => m[0]
    );

    const newEntry: MemoryEntry = {
      id: `ENG-${4821 + entries.length - INITIAL_ENTRIES.length}`,
      timestamp: "JUST NOW",
      text: trimmed,
      tags: tags.length > 0 ? tags : ["#fleeting"],
      links: links.length > 0 ? links : switches.autoLink ? ["[[Daily Tape]]"] : [],
    };

    setEntries((prev) => [newEntry, ...prev]);
    setDraft("");
  };

  const currentShortcut = SHORTCUTS[activeShortcut];

  return (
    <div className="min-h-screen bg-[#E8E6E0] text-[#18191D] font-[family-name:var(--font-grotesk)] selection:bg-[#EA580C] selection:text-white">
      {/* Precision Hardware Top Strip */}
      <header className="sticky top-0 z-30 border-b border-[#C9C6BE] bg-[#E8E6E0]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#18191D] text-[#F59E0B] shadow-inner">
              <Terminal className="h-4 w-4" />
            </span>
            <div className="leading-none">
              <div className="text-sm font-bold tracking-wider uppercase">
                ENGRAM <span className="text-[#EA580C]">MK-II</span>
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-[#66645E]">
                COGNITIVE SYNTHESIZER // REV 4.2
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 font-mono text-xs font-medium text-[#52504B] md:flex">
            <a href="#deck" className="hover:text-[#18191D]">
              [01] DECK
            </a>
            <a href="#pipeline" className="hover:text-[#18191D]">
              [02] PIPELINE
            </a>
            <a href="#keydeck" className="hover:text-[#18191D]">
              [03] CHORDS
            </a>
            <a href="#pricing" className="hover:text-[#18191D]">
              [04] SPECS
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-md border border-[#C9C6BE] bg-[#DFDDD6] px-2.5 py-1.5 font-mono text-[11px] sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
              <span>VAULT ONLINE</span>
            </div>
            <a
              href="#pricing"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#EA580C] px-4 py-2 font-mono text-xs font-bold tracking-wider text-white uppercase shadow-[0_2px_0_#9A3412] transition-transform active:translate-y-0.5"
            >
              DEPLOY
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero + Interactive Hardware Synthesizer Deck */}
      <section id="top" className="bg-dot-grid text-[#18191D]/10">
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-20 text-[#18191D] lg:pt-20">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-md border border-[#C9C6BE] bg-[#F4F3EF] px-3 py-1 font-mono text-[11px] font-semibold text-[#52504B] uppercase">
                <Radio className="h-3.5 w-3.5 text-[#EA580C]" />
                <span>INSTRUMENT FOR EXTERNALIZED MEMORY</span>
              </div>
              <h1 className="mt-5 text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
                A tactile second brain built like a{" "}
                <span className="text-[#EA580C]">field instrument</span>.
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base leading-relaxed text-[#4E4C47]">
                No sluggish web wrappers. No algorithmic clutter. Engram MK-II
                pairs a native local database with precision keyboard ergonomics
                so capturing and synthesizing ideas feels unmistakably crisp.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-md bg-[#18191D] px-5 py-3 font-mono text-xs font-bold tracking-wider text-[#F59E0B] uppercase shadow-[0_3px_0_#000] transition-colors hover:bg-[#25272E]"
                >
                  DOWNLOAD v4.2 BINARY
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#deck"
                  className="inline-flex items-center gap-2 rounded-md border border-[#B8B4AA] bg-[#F4F3EF] px-5 py-3 font-mono text-xs font-bold tracking-wider text-[#18191D] uppercase hover:bg-white"
                >
                  TEST LIVE DECK ↓
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Hardware Enclosure ("Thought Synthesizer") */}
          <div
            id="deck"
            className="mt-12 overflow-hidden rounded-2xl border-2 border-[#2B2D34] bg-[#18191D] text-[#E5E7EB] shadow-[0_28px_70px_-20px_rgba(24,25,29,0.55)]"
          >
            {/* Top Telemetry Readout Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2B2D34] bg-[#111216] px-5 py-3 font-mono text-[11px]">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                <span className="text-[#F59E0B]">ENGRAM.SYNTH // LIVE CAPTURE CONSOLE</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[#9CA3AF]">
                <span>
                  NODES:{" "}
                  <strong className="text-white">
                    {14817 + entries.length}
                  </strong>
                </span>
                <span>
                  CRYPTO:{" "}
                  <strong
                    className={
                      switches.localEncrypt ? "text-[#10B981]" : "text-[#F59E0B]"
                    }
                  >
                    {switches.localEncrypt ? "AES-256 ON" : "PLAIN MD"}
                  </strong>
                </span>
                <span>LATENCY: <strong className="text-white">0.3ms</strong></span>
              </div>
            </div>

            <div className="grid lg:grid-cols-12">
              {/* Left Hardware Toggle Bank */}
              <div className="border-b border-[#2B2D34] bg-[#141519] p-5 lg:col-span-4 lg:border-r lg:border-b-0">
                <div className="font-mono text-[10px] tracking-widest text-[#9CA3AF] uppercase">
                  HARDWARE MODULE SWITCHES
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(
                    [
                      { key: "autoLink", label: "AUTO-LINK", sub: "Wikilink parse" },
                      { key: "localEncrypt", label: "E2E VAULT", sub: "Zero-knowledge" },
                      { key: "backlinkRadar", label: "RADAR", sub: "Surface past" },
                      { key: "dailyDigest", label: "DIGEST", sub: "08:00 review" },
                    ] as const
                  ).map((sw) => {
                    const on = switches[sw.key];
                    return (
                      <button
                        key={sw.key}
                        type="button"
                        onClick={() => toggleSwitch(sw.key)}
                        className={`flex cursor-pointer flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                          on
                            ? "border-[#F59E0B]/45 bg-[#1F2128] shadow-inner"
                            : "border-[#2B2D34] bg-[#18191D] opacity-75 hover:opacity-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`h-2.5 w-2.5 rounded-full transition-all ${
                              on
                                ? "bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]"
                                : "bg-[#3F424D]"
                            }`}
                          />
                          <span className="font-mono text-[10px] text-[#9CA3AF]">
                            {on ? "ON" : "OFF"}
                          </span>
                        </div>
                        <div className="mt-4">
                          <div className="font-mono text-xs font-bold text-white">
                            {sw.label}
                          </div>
                          <div className="text-[11px] text-[#9CA3AF]">
                            {sw.sub}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-xl border border-[#2B2D34] bg-[#0E0F12] p-3.5 font-mono text-[11px] text-[#9CA3AF]">
                  <div className="text-[#10B981]">$ engram status --vault</div>
                  <div className="mt-1">storage: ~/.engram/vault.sqlite</div>
                  <div>
                    auto_link: {switches.autoLink ? "enabled" : "manual"} ·
                    radar: {switches.backlinkRadar ? "active" : "paused"}
                  </div>
                </div>
              </div>

              {/* Right Live Thought Capture & Memory Tape */}
              <div className="flex flex-col justify-between p-5 lg:col-span-8">
                <form onSubmit={handleStore} className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Type a thought with #tags or [[Links]] and store it live..."
                      className="w-full rounded-lg border border-[#343741] bg-[#0F1014] px-4 py-3 font-mono text-xs text-[#F3F4F6] placeholder:text-[#6B7280] focus:border-[#F59E0B] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#EA580C] px-5 py-3 font-mono text-xs font-bold tracking-wider text-white uppercase shadow-[0_2px_0_#9A3412] transition-colors hover:bg-[#F97316]"
                  >
                    <Plus className="h-4 w-4" />
                    STORE ENGRAM
                  </button>
                </form>

                {/* Chronological Memory Tape */}
                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-[#9CA3AF] uppercase">
                    <span>CHRONOLOGICAL MEMORY TAPE</span>
                    <span>TRY TYPING A NOTE ABOVE</span>
                  </div>

                  {entries.slice(0, 4).map((entry, idx) => (
                    <div
                      key={entry.id}
                      className={`rounded-xl border p-3.5 transition-all ${
                        idx === 0 && entry.timestamp === "JUST NOW"
                          ? "border-[#10B981]/50 bg-[#10B981]/8"
                          : "border-[#2B2D34] bg-[#121318]"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-[#9CA3AF]">
                        <span className="text-[#F59E0B]">{entry.id}</span>
                        <span>{entry.timestamp}</span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#E5E7EB]">
                        {entry.text}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono text-[10px]">
                        {entry.links.map((lk) => (
                          <span
                            key={lk}
                            className="rounded bg-[#F59E0B]/15 px-2 py-0.5 text-[#FBBF24]"
                          >
                            {lk}
                          </span>
                        ))}
                        {entry.tags.map((tg) => (
                          <span
                            key={tg}
                            className="rounded bg-[#262932] px-2 py-0.5 text-[#9CA3AF]"
                          >
                            {tg}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local-First CRDT Sync Blueprint */}
      <section id="pipeline" className="border-y border-[#C9C6BE] bg-[#DFDDD6] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs font-bold tracking-widest text-[#EA580C] uppercase">
                SCHEMATIC 02 // DATA PIPELINE
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Engineered for offline longevity.
              </h2>
            </div>
            <span className="font-mono text-xs text-[#52504B]">
              ZERO CLOUD DEPENDENCY · OPEN SPECIFICATION
            </span>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              {
                step: "01",
                icon: Zap,
                title: "INSTANT WRITE",
                metric: "0.2ms",
                desc: "Keystrokes commit directly to memory-mapped local files—never waiting on a network round-trip.",
              },
              {
                step: "02",
                icon: Database,
                title: "SQLITE + FTS5",
                metric: "0.6ms",
                desc: "Full-text and local vector index updates asynchronously for instant fuzzy & semantic retrieval.",
              },
              {
                step: "03",
                icon: Shield,
                title: "CLIENT CRYPTO",
                metric: "AES-256",
                desc: "Every delta packet is sealed with your hardware-backed recovery key before touching a wire.",
              },
              {
                step: "04",
                icon: HardDrive,
                title: "CRDT MESH",
                metric: "0 CONFLICTS",
                desc: "Edit the same outline on a flight and on your desk—deterministic merges reconcile cleanly.",
              },
            ].map((node) => (
              <div
                key={node.step}
                className="flex flex-col justify-between rounded-xl border border-[#C9C6BE] bg-[#F4F3EF] p-5 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="font-bold text-[#EA580C]">
                      STAGE {node.step}
                    </span>
                    <span className="rounded bg-[#18191D] px-2 py-0.5 text-[#10B981]">
                      {node.metric}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2.5">
                    <node.icon className="h-4 w-4 text-[#18191D]" />
                    <h3 className="font-mono text-sm font-bold tracking-wide">
                      {node.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-[#52504B]">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Keyboard Chord Mastery Deck */}
      <section id="keydeck" className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#EA580C] uppercase">
                <Keyboard className="h-4 w-4" />
                <span>SCHEMATIC 03 // TACTILE CHORDS</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Operate your entire mind without touching a mouse.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#52504B]">
                Press any physical keycap on the right to inspect Engram&apos;s
                zero-latency command bindings. Every command is remappable via a
                plain TOML config file.
              </p>

              {/* Keycap Selector Grid */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {SHORTCUTS.map((sc, i) => {
                  const active = i === activeShortcut;
                  return (
                    <button
                      key={sc.keys}
                      type="button"
                      onClick={() => setActiveShortcut(i)}
                      className={`cursor-pointer rounded-lg border px-4 py-2.5 font-mono text-xs font-bold transition-all ${
                        active
                          ? "translate-y-0.5 border-[#EA580C] bg-[#EA580C] text-white shadow-none"
                          : "border-[#B8B4AA] bg-[#F7F6F2] text-[#18191D] shadow-[0_3px_0_#B8B4AA] hover:bg-white"
                      }`}
                    >
                      {sc.keys}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border-2 border-[#2B2D34] bg-[#18191D] p-6 text-[#E5E7EB] shadow-xl sm:p-8">
                <div className="flex items-center justify-between border-b border-[#2B2D34] pb-4 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#F59E0B]" />
                    <span className="text-[#F59E0B]">
                      CHORD // {currentShortcut.name}
                    </span>
                  </div>
                  <span className="rounded bg-[#10B981]/15 px-2 py-0.5 text-[#10B981]">
                    EXEC {currentShortcut.latency}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="rounded-xl border border-[#3F424D] bg-[#0F1014] px-5 py-3 font-mono text-xl font-bold text-[#F59E0B] shadow-inner">
                    {currentShortcut.keys}
                  </div>
                  <div className="font-mono text-xs text-[#9CA3AF]">
                    BINDING ACTIVE · MACOS / LINUX / WIN
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#D1D5DB]">
                  {currentShortcut.detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Spec-Sheet Pricing */}
      <section id="pricing" className="border-t border-[#C9C6BE] bg-[#DFDDD6] py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <span className="font-mono text-xs font-bold tracking-widest text-[#EA580C] uppercase">
              SCHEMATIC 04 // HARDWARE & SYNC LICENSING
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Precision editions for solo thinkers and labs.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                code: "UNIT 01",
                name: "FIELD EDITION",
                price: "$0",
                period: "LOCAL FOREVER",
                dark: false,
                features: [
                  "Unlimited local Markdown & SQLite vault",
                  "Live Thought Synthesizer & daily tape",
                  "Full keyboard chord customization (TOML)",
                  "Offline semantic search & graph view",
                ],
                cta: "DOWNLOAD FREE",
              },
              {
                code: "UNIT 02 // RECOMMENDED",
                name: "LAB EDITION",
                price: "$11",
                period: "/ MONTH",
                dark: true,
                features: [
                  "Everything in Field Edition",
                  "Zero-knowledge CRDT sync across all devices",
                  "Encrypted voice memo & PDF ingestion",
                  "Instant snapshots + CLI automation API",
                ],
                cta: "ACTIVATE 14-DAY TRIAL",
              },
              {
                code: "UNIT 03",
                name: "INSTITUTE",
                price: "$24",
                period: "/ SEAT / MO",
                dark: false,
                features: [
                  "Shared encrypted research vaults",
                  "Peer-to-peer LAN sync for air-gapped teams",
                  "Citation & BibTeX graph pipeline",
                  "Dedicated engineering support",
                ],
                cta: "CONTACT LAB TEAM",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col justify-between rounded-2xl border p-7 ${
                  tier.dark
                    ? "border-[#2B2D34] bg-[#18191D] text-white shadow-2xl"
                    : "border-[#C9C6BE] bg-[#F4F3EF] text-[#18191D]"
                }`}
              >
                <div>
                  <div
                    className={`font-mono text-[11px] font-bold uppercase ${
                      tier.dark ? "text-[#F59E0B]" : "text-[#66645E]"
                    }`}
                  >
                    {tier.code}
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-bold">
                      {tier.price}
                    </span>
                    <span
                      className={`font-mono text-[11px] ${
                        tier.dark ? "text-[#9CA3AF]" : "text-[#66645E]"
                      }`}
                    >
                      {tier.period}
                    </span>
                  </div>

                  <ul
                    className={`mt-6 space-y-3 border-t pt-6 text-xs ${
                      tier.dark
                        ? "border-[#2B2D34] text-[#D1D5DB]"
                        : "border-[#D4D1C8] text-[#4E4C47]"
                    }`}
                  >
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check
                          className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                            tier.dark ? "text-[#10B981]" : "text-[#EA580C]"
                          }`}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`mt-8 w-full cursor-pointer rounded-lg py-3 font-mono text-xs font-bold tracking-wider uppercase transition-colors ${
                    tier.dark
                      ? "bg-[#EA580C] text-white shadow-[0_2px_0_#9A3412] hover:bg-[#F97316]"
                      : "border border-[#18191D] bg-transparent text-[#18191D] hover:bg-[#18191D] hover:text-white"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serial-Plate Footer */}
      <footer className="bg-[#18191D] py-10 text-[#9CA3AF]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 font-mono text-xs sm:flex-row">
          <div className="flex items-center gap-2.5 text-white">
            <Lock className="h-3.5 w-3.5 text-[#10B981]" />
            <span>ENGRAM MK-II // SERIAL NO. 2026-05-BRAIN</span>
          </div>
          <div className="flex gap-6">
            <a href="#deck" className="hover:text-[#F59E0B]">
              CLI DOCS
            </a>
            <a href="#pipeline" className="hover:text-[#F59E0B]">
              CRYPTO WHITEPAPER
            </a>
            <a href="#pricing" className="hover:text-[#F59E0B]">
              RELEASES
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
