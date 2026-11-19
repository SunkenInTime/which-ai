"use client";

import { useMemo, useState } from "react";

interface ConstellationNode {
  id: string;
  label: string;
  shortLabel: string;
  x: number;
  y: number;
  date: string;
  topic: string;
  prose: string;
  cueTerms: string[];
  links: string[];
}

const CONSTELLATION: ConstellationNode[] = [
  {
    id: "walking",
    label: "Walking as a thinking tool",
    shortLabel: "Walking as thinking",
    x: 165,
    y: 96,
    date: "October 2024",
    topic: "Habits",
    prose:
      "Rebecca Solnit notes that the mind works at roughly three miles an hour. Most knots in an essay loosen within fifteen minutes of leaving the desk without headphones.",
    cueTerms: ["walk", "walking", "pace", "miles", "solnit", "essay", "book"],
    links: ["pocket-notebooks", "snow-sound", "slow-reading"],
  },
  {
    id: "pocket-notebooks",
    label: "Pocket field notebooks",
    shortLabel: "Field notebooks",
    x: 345,
    y: 62,
    date: "January 2025",
    topic: "Tools",
    prose:
      "Carry one small sewn notebook for a month, then transcribe only the sentences that still feel alive on Sunday night. Friction filters out noise before it ever reaches the archive.",
    cueTerms: ["notebook", "pocket", "paper", "capture", "sunday", "pen"],
    links: ["walking", "slip-box", "night-rituals"],
  },
  {
    id: "slip-box",
    label: "Luhmann and the slip-box",
    shortLabel: "The slip-box",
    x: 560,
    y: 78,
    date: "March 2025",
    topic: "Archives",
    prose:
      "Niklas Luhmann wrote seventy books not because he filed notes neatly by subject, but because every slip pointed directly to another slip across unrelated disciplines.",
    cueTerms: ["luhmann", "slip", "books", "file", "folder", "connect", "index"],
    links: ["pocket-notebooks", "slow-reading", "joinery", "night-rituals"],
  },
  {
    id: "snow-sound",
    label: "Why cities grow quiet in snow",
    shortLabel: "Snow acoustics",
    x: 135,
    y: 222,
    date: "December 2024",
    topic: "Observation",
    prose:
      "Fresh snow traps tiny pockets of air between ice crystals, absorbing street traffic at the exact frequencies that make human speech tiring.",
    cueTerms: ["snow", "winter", "sound", "quiet", "city", "traffic", "acoustic"],
    links: ["walking", "acoustic-ecology"],
  },
  {
    id: "slow-reading",
    label: "Marginalia and slow reading",
    shortLabel: "Slow reading",
    x: 385,
    y: 168,
    date: "May 2025",
    topic: "Reading",
    prose:
      "Copying a paragraph by hand takes forty seconds longer than highlighting it, and that forty seconds is usually when your own counter-argument arrives.",
    cueTerms: ["reading", "book", "highlight", "margin", "quote", "slow"],
    links: ["walking", "slip-box", "acoustic-ecology", "fermentation"],
  },
  {
    id: "night-rituals",
    label: "Writing after ten at night",
    shortLabel: "Night writing",
    x: 750,
    y: 100,
    date: "August 2025",
    topic: "Habits",
    prose:
      "Late evening lowers the urge to polish every sentence prematurely. Keep one warm desk lamp on and leave structural edits for morning light.",
    cueTerms: ["night", "evening", "lamp", "write", "draft", "calm", "late"],
    links: ["pocket-notebooks", "slip-box", "joinery"],
  },
  {
    id: "acoustic-ecology",
    label: "Acoustic ecology notes",
    shortLabel: "Acoustic ecology",
    x: 295,
    y: 274,
    date: "November 2025",
    topic: "Observation",
    prose:
      "R. Murray Schafer drew a line between hi-fi soundscapes, where distant details stay distinct, and lo-fi soundscapes blurred by a constant mechanical hum.",
    cueTerms: ["sound", "acoustic", "schafer", "listen", "noise", "winter"],
    links: ["snow-sound", "slow-reading"],
  },
  {
    id: "fermentation",
    label: "Country loaf hydration log",
    shortLabel: "Bread hydration",
    x: 560,
    y: 262,
    date: "February 2026",
    topic: "Craft",
    prose:
      "At 78 percent hydration with cool tap water and a four-hour bulk rise at 20 degrees, the crust blisters evenly without tearing along the score.",
    cueTerms: ["bread", "dough", "ratio", "loaf", "hydration", "sourdough", "kitchen"],
    links: ["slow-reading", "joinery"],
  },
  {
    id: "joinery",
    label: "Tolerance in cedar joinery",
    shortLabel: "Cedar joinery",
    x: 775,
    y: 228,
    date: "April 2026",
    topic: "Craft",
    prose:
      "Wood moves with the seasons. A good joint allows a millimeter of winter shrinkage without loosening the whole frame, much like a durable note system.",
    cueTerms: ["wood", "cedar", "joinery", "craft", "tolerance", "frame"],
    links: ["slip-box", "night-rituals", "fermentation"],
  },
];

const FUZZY_PROMPTS = [
  "that book about walking",
  "something about winter sound",
  "bread dough ratio",
  "writing late at night",
];

export function IterationTwo() {
  const [selectedId, setSelectedId] = useState<string>("slow-reading");
  const [recallQuery, setRecallQuery] = useState<string>("something about winter sound");
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  const selectedNode =
    CONSTELLATION.find((node) => node.id === selectedId) ?? CONSTELLATION[0];

  const connectedSet = useMemo(() => {
    return new Set([selectedNode.id, ...selectedNode.links]);
  }, [selectedNode]);

  const edges = useMemo(() => {
    const seen = new Set<string>();
    const list: Array<{ from: ConstellationNode; to: ConstellationNode; key: string }> = [];
    for (const node of CONSTELLATION) {
      for (const targetId of node.links) {
        const key = [node.id, targetId].sort().join("--");
        if (seen.has(key)) continue;
        seen.add(key);
        const target = CONSTELLATION.find((n) => n.id === targetId);
        if (target) {
          list.push({ from: node, to: target, key });
        }
      }
    }
    return list;
  }, []);

  const recallMatches = useMemo(() => {
    const q = recallQuery.trim().toLowerCase();
    if (!q) return CONSTELLATION.slice(0, 3);
    const words = q.split(/\s+/).filter((w) => w.length >= 3);
    const scored = CONSTELLATION.map((node) => {
      const text = `${node.label} ${node.prose} ${node.topic} ${node.cueTerms.join(" ")}`.toLowerCase();
      let score = 0;
      for (const word of words) {
        if (text.includes(word)) score += 1;
      }
      return { node, score };
    })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.map((entry) => entry.node);
  }, [recallQuery]);

  return (
    <div
      className="min-h-screen bg-[#0F1F1C] text-[#F0EDE5]"
      style={{ fontFamily: "var(--font-instrument), system-ui, sans-serif" }}
    >
      {/* Top navigation */}
      <header className="border-b border-[#1E3731]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <a href="#top" className="inline-flex items-center gap-2.5 text-[#F0EDE5]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="3" fill="#D6A954" />
              <circle cx="5" cy="7" r="2" fill="#A3BEB3" />
              <circle cx="19" cy="8" r="2" fill="#A3BEB3" />
              <circle cx="17" cy="18" r="2" fill="#A3BEB3" />
              <path
                d="M6.8 8.1L10 10.6M17.2 9.1L14.2 10.8M15.7 16.5L13.6 14"
                stroke="#638578"
                strokeWidth="1.4"
              />
            </svg>
            <span
              className="text-xl tracking-tight"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontVariationSettings: "'SOFT' 50, 'opsz' 32",
              }}
            >
              Cairn
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-[#A3BEB3] md:flex">
            <a href="#constellation" className="hover:text-[#F0EDE5] transition-colors">
              Memory map
            </a>
            <a href="#recall" className="hover:text-[#F0EDE5] transition-colors">
              Recall
            </a>
            <a href="#membership" className="hover:text-[#F0EDE5] transition-colors">
              Pricing
            </a>
          </nav>

          <button
            type="button"
            onClick={() =>
              setStatusBanner(
                "Cairn 2.4 for macOS, Windows, and Linux is ready. Free for local vaults."
              )
            }
            className="rounded-full bg-[#D6A954] px-4 py-2 text-sm font-medium text-[#0F1F1C] transition-colors hover:bg-[#E1B96B] cursor-pointer"
          >
            Download Cairn
          </button>
        </div>
      </header>

      {statusBanner && (
        <div
          role="status"
          className="border-b border-[#2E5249] bg-[#162D28] px-6 py-2.5 text-sm text-[#F0EDE5]"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <span>{statusBanner}</span>
            <button
              type="button"
              onClick={() => setStatusBanner(null)}
              className="text-xs text-[#D6A954] underline underline-offset-4 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <main id="top">
        {/* Centered monumental opening */}
        <section className="mx-auto max-w-5xl px-6 pb-8 pt-10 text-center sm:px-8 lg:pt-12">
          <h1
            className="mx-auto max-w-[20ch] text-[2.45rem] leading-[1.06] font-normal tracking-[-0.025em] text-[#F0EDE5] sm:text-[3.55rem]"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontVariationSettings: "'SOFT' 55, 'opsz' 72",
            }}
          >
            Keep every thought within reach, years after you wrote it.
          </h1>

          <p className="mx-auto mt-4 max-w-[54ch] text-base leading-[1.65] text-[#A3BEB3] sm:text-lg">
            Cairn is a quiet second brain built for people who read deeply and
            think across seasons. Capture a note in two seconds, and let related
            memories link themselves into a living map on your own drive.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() =>
                setStatusBanner(
                  "Downloading Cairn for macOS (Universal). Local-first Markdown storage."
                )
              }
              className="rounded-full bg-[#D6A954] px-6 py-2.5 text-sm font-medium text-[#0F1F1C] transition-colors hover:bg-[#E2BA6C] cursor-pointer"
            >
              Download for desktop
            </button>
            <a
              href="#constellation"
              className="rounded-full border border-[#2D4E46] px-6 py-2.5 text-sm font-medium text-[#F0EDE5] transition-colors hover:border-[#A3BEB3]"
            >
              Walk the sample vault
            </a>
          </div>
        </section>

        {/* Signature Bold Element: Interactive Botanical Memory Constellation */}
        <section
          id="constellation"
          aria-label="Interactive memory constellation"
          className="mx-auto max-w-6xl px-6 pb-20 pt-2 sm:px-8"
        >
          <div className="overflow-hidden rounded-2xl border border-[#25433C] bg-[#132521]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#203B34] px-6 py-3 text-xs text-[#A3BEB3]">
              <span>Sample personal vault with 9 connected notes (2024 to 2026)</span>
              <span>Select any point to trace its linked memories</span>
            </div>

            <div className="relative px-2 py-3 sm:px-6">
              <svg
                viewBox="0 0 920 330"
                className="h-auto w-full select-none"
                role="img"
                aria-label="Interactive graph of nine connected notes"
              >
                {/* Subtle orbital rings for observatory grounding */}
                <ellipse
                  cx="460"
                  cy="168"
                  rx="360"
                  ry="124"
                  fill="none"
                  stroke="#1C362F"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                />
                <ellipse
                  cx="460"
                  cy="168"
                  rx="215"
                  ry="78"
                  fill="none"
                  stroke="#1C362F"
                  strokeWidth="1"
                />

                {/* Connection threads */}
                {edges.map(({ from, to, key }) => {
                  const touchesSelected =
                    from.id === selectedNode.id || to.id === selectedNode.id;
                  return (
                    <line
                      key={key}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={touchesSelected ? "#D6A954" : "#2D4F46"}
                      strokeWidth={touchesSelected ? 2 : 1.1}
                      strokeOpacity={touchesSelected ? 0.92 : 0.65}
                    />
                  );
                })}

                {/* Interactive note nodes */}
                {CONSTELLATION.map((node) => {
                  const isActive = node.id === selectedNode.id;
                  const isNeighbor = connectedSet.has(node.id);
                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedId(node.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedId(node.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isActive}
                      aria-label={`Inspect note: ${node.label}`}
                      className="cursor-pointer outline-none"
                    >
                      {isActive && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={20}
                          fill="#D6A954"
                          fillOpacity={0.14}
                          stroke="#D6A954"
                          strokeWidth={1}
                          strokeOpacity={0.5}
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 8.5 : isNeighbor ? 6 : 4.5}
                        fill={
                          isActive
                            ? "#D6A954"
                            : isNeighbor
                              ? "#F0EDE5"
                              : "#5A7D71"
                        }
                      />
                      <text
                        x={node.x}
                        y={node.y + (node.y > 215 ? 24 : -15)}
                        textAnchor="middle"
                        fill={
                          isActive
                            ? "#F0EDE5"
                            : isNeighbor
                              ? "#D7DFD8"
                              : "#7D9C90"
                        }
                        fontSize={isActive ? "13.5" : "12"}
                        fontWeight={isActive ? "600" : "400"}
                        style={{
                          fontFamily: "var(--font-instrument), system-ui, sans-serif",
                        }}
                      >
                        {node.shortLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Integrated reading alcove for the selected note */}
            <div className="grid gap-6 border-t border-[#223F38] bg-[#162C27] p-6 sm:p-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="text-xs text-[#D6A954]">
                  {selectedNode.topic}, saved {selectedNode.date}
                </div>
                <h2
                  className="mt-1.5 text-2xl font-normal text-[#F0EDE5] sm:text-3xl"
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontVariationSettings: "'SOFT' 45, 'opsz' 36",
                  }}
                >
                  {selectedNode.label}
                </h2>
                <p className="mt-3 max-w-[58ch] text-base leading-[1.7] text-[#D7E0DB]">
                  {selectedNode.prose}
                </p>
              </div>

              <div className="border-t border-[#25433C] pt-5 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                <div className="text-xs text-[#A3BEB3]">
                  Jump along connected thoughts
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedNode.links.map((neighborId) => {
                    const neighbor = CONSTELLATION.find((n) => n.id === neighborId);
                    if (!neighbor) return null;
                    return (
                      <button
                        key={neighbor.id}
                        type="button"
                        onClick={() => setSelectedId(neighbor.id)}
                        className="rounded-full border border-[#31584E] bg-[#0F1F1C] px-3.5 py-1.5 text-sm text-[#F0EDE5] transition-colors hover:border-[#D6A954] hover:text-[#D6A954] cursor-pointer"
                      >
                        {neighbor.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Band 1: Live fuzzy memory recall */}
        <section
          id="recall"
          className="border-t border-[#1F3A33] bg-[#162B26] py-20"
        >
          <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2
                className="text-3xl leading-[1.14] font-normal tracking-[-0.02em] text-[#F0EDE5] sm:text-4xl"
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontVariationSettings: "'SOFT' 50, 'opsz' 48",
                }}
              >
                Write first. Never maintain a folder tree again.
              </h2>
              <p className="mt-5 max-w-[46ch] text-base leading-[1.7] text-[#B3CBC1]">
                Folders ask you to predict the future on the day you write a
                note. Cairn lets you drop notes into one calm stream and find
                them later with half-remembered phrases, dates, or connected
                titles.
              </p>

              <div className="mt-7">
                <div className="text-xs text-[#A3BEB3]">Try a vague memory</div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {FUZZY_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => setRecallQuery(prompt)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors cursor-pointer ${
                        recallQuery === prompt
                          ? "border-[#D6A954] bg-[#D6A954] text-[#0F1F1C] font-medium"
                          : "border-[#2D4F46] bg-[#0F1F1C] text-[#D7E0DB] hover:border-[#89A89C]"
                      }`}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl border border-[#284840] bg-[#0F1F1C] p-6">
                <label
                  htmlFor="archive-recall"
                  className="block text-xs text-[#A3BEB3]"
                >
                  Search this sample second brain
                </label>
                <input
                  id="archive-recall"
                  type="text"
                  value={recallQuery}
                  onChange={(e) => setRecallQuery(e.target.value)}
                  placeholder="Type a half-remembered word..."
                  className="mt-2 w-full rounded-lg border border-[#2C4F46] bg-[#152924] px-4 py-3 text-base text-[#F0EDE5] placeholder:text-[#739186] focus:border-[#D6A954]"
                />

                <div className="mt-5 space-y-3">
                  {recallMatches.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-[#2C4F46] p-4 text-sm text-[#A3BEB3]">
                      No matching note in this sample vault. Try words like
                      walking, snow, bread, cedar, or night.
                    </p>
                  ) : (
                    recallMatches.slice(0, 2).map((match) => (
                      <div
                        key={match.id}
                        className="rounded-lg border border-[#223F38] bg-[#132622] p-4"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <h3
                            className="text-lg text-[#F0EDE5]"
                            style={{
                              fontFamily: "var(--font-fraunces), Georgia, serif",
                            }}
                          >
                            {match.label}
                          </h3>
                          <span className="shrink-0 text-xs text-[#D6A954]">
                            {match.date}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#B7CEC4]">
                          {match.prose}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Band 2: Three quiet typographic columns (no boxed cards) */}
        <section className="border-t border-[#1F3A33] bg-[#0F1F1C] py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <h2
              className="max-w-xl text-3xl leading-[1.15] font-normal text-[#F0EDE5] sm:text-4xl"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontVariationSettings: "'SOFT' 50, 'opsz' 48",
              }}
            >
              Built to stay legible after twenty years of writing.
            </h2>

            <div className="mt-12 grid gap-10 border-t border-[#223F38] pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#223F38]">
              <div className="md:pr-8">
                <h3
                  className="text-xl font-normal text-[#F0EDE5]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Stored as plain files
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-[#A3BEB3]">
                  Every note lives on your disk as standard Markdown alongside
                  images and PDFs. Move folders, back them up with Time Machine,
                  or read them decades from now without Cairn installed.
                </p>
              </div>

              <div className="md:px-8">
                <h3
                  className="text-xl font-normal text-[#F0EDE5]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Private by architecture
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-[#A3BEB3]">
                  Search indexing happens entirely on your own computer. When
                  you enable sync, notes leave your device encrypted with a key
                  only you hold.
                </p>
              </div>

              <div className="md:pl-8">
                <h3
                  className="text-xl font-normal text-[#F0EDE5]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Calm under heavy load
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-[#A3BEB3]">
                  Whether your archive holds forty notes or forty thousand,
                  opening a file takes less than a frame. No spinners, no
                  notification badges, and no algorithmic feed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Band 3: Quiet pricing & closing call */}
        <section
          id="membership"
          className="border-t border-[#1F3A33] bg-[#162B26] py-20"
        >
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2
                  className="text-3xl leading-[1.15] font-normal text-[#F0EDE5] sm:text-4xl"
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontVariationSettings: "'SOFT' 50, 'opsz' 48",
                  }}
                >
                  Free on your desk. Six dollars a month to sync everywhere.
                </h2>
                <p className="mt-4 text-sm leading-[1.7] text-[#A3BEB3]">
                  No enterprise upsells, no AI credit meters, and no lock-in
                  when you stop paying.
                </p>
              </div>

              <div className="space-y-6 lg:col-span-7">
                <div className="flex flex-col justify-between gap-4 border-b border-[#284840] pb-6 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3
                        className="text-xl text-[#F0EDE5]"
                        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                      >
                        Local vault
                      </h3>
                      <span className="text-sm text-[#D6A954]">Free forever</span>
                    </div>
                    <p className="mt-1 text-sm text-[#A3BEB3]">
                      Full Mac, Windows, and Linux apps, memory map, backlinks,
                      and unlimited local Markdown files.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setStatusBanner("Started download for Cairn Local Vault (Free).")
                    }
                    className="shrink-0 rounded-full border border-[#D6A954] px-5 py-2.5 text-sm font-medium text-[#D6A954] transition-colors hover:bg-[#D6A954] hover:text-[#0F1F1C] cursor-pointer"
                  >
                    Download free
                  </button>
                </div>

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3
                        className="text-xl text-[#F0EDE5]"
                        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                      >
                        Encrypted sync
                      </h3>
                      <span className="text-sm text-[#D6A954]">$6 a month</span>
                    </div>
                    <p className="mt-1 text-sm text-[#A3BEB3]">
                      End-to-end encrypted desktop and mobile sync, version
                      snapshots, and offline web clipping.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setStatusBanner(
                        "Turn on Encrypted Sync anytime from Settings after installing Cairn."
                      )
                    }
                    className="shrink-0 rounded-full bg-[#D6A954] px-5 py-2.5 text-sm font-medium text-[#0F1F1C] transition-colors hover:bg-[#E1B96B] cursor-pointer"
                  >
                    Try sync 30 days
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1F3A33] bg-[#0F1F1C] py-10 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 text-sm text-[#89A89C] sm:flex-row sm:items-center sm:px-8">
          <p>Cairn. Quiet software for long-term memory.</p>
          <div className="flex gap-6">
            <a href="#constellation" className="hover:text-[#F0EDE5]">
              Memory map
            </a>
            <a href="#recall" className="hover:text-[#F0EDE5]">
              Privacy notes
            </a>
            <a href="#membership" className="hover:text-[#F0EDE5]">
              Changelog
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
