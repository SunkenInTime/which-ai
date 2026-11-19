"use client";

import { useMemo, useState } from "react";

interface GardenNode {
  id: string;
  label: string;
  stage: "Seedling" | "Growing" | "Evergreen";
  x: number;
  y: number;
  note: string;
  updated: string;
  roots: string[];
}

const GARDEN_NODES: GardenNode[] = [
  {
    id: "slow-reading",
    label: "Slow reading",
    stage: "Evergreen",
    x: 420,
    y: 78,
    note: "A book read slowly across three weeks leaves roots in half a dozen active projects. Reading faster only produces clean summaries you never open again.",
    updated: "Tended 4 days ago",
    roots: ["field-sketches", "mycelial-memory", "quiet-tools"],
  },
  {
    id: "city-shade",
    label: "City shade maps",
    stage: "Growing",
    x: 165,
    y: 165,
    note: "Old street trees cool a block by five degrees. Walking the shaded side of avenues changes which neighborhoods feel generous enough to linger in.",
    updated: "Tended 2 weeks ago",
    roots: ["field-sketches", "seasonal-routines"],
  },
  {
    id: "mycelial-memory",
    label: "Mycelial memory",
    stage: "Evergreen",
    x: 420,
    y: 215,
    note: "Ideas rarely travel in a straight hierarchy. They pass nutrients laterally between notes you wrote years apart when a shared question wakes them up.",
    updated: "Tended yesterday",
    roots: ["slow-reading", "field-sketches", "seasonal-routines", "quiet-tools"],
  },
  {
    id: "field-sketches",
    label: "Field sketches",
    stage: "Seedling",
    x: 685,
    y: 155,
    note: "Drawing a rough diagram from memory reveals every gap in your understanding faster than rereading ten pages of tidy prose.",
    updated: "Planted Nov 16",
    roots: ["slow-reading", "mycelial-memory", "city-shade"],
  },
  {
    id: "seasonal-routines",
    label: "Seasonal routines",
    stage: "Growing",
    x: 245,
    y: 318,
    note: "Winter mornings belong to long drafts; summer evenings belong to gathering scraps. Your notebook should welcome messy seasons without scolding you.",
    updated: "Tended 1 month ago",
    roots: ["city-shade", "mycelial-memory"],
  },
  {
    id: "quiet-tools",
    label: "Quiet tools",
    stage: "Evergreen",
    x: 610,
    y: 312,
    note: "The best software behaves like a well-oiled pruning knife: steady in the hand, silent when you pause to think, and faithful ten years later.",
    updated: "Tended 6 days ago",
    roots: ["slow-reading", "mycelial-memory"],
  },
];

const SEARCHABLE_NOTES = [
  {
    title: "Why notebooks work better than feeds",
    excerpt:
      "A feed pushes yesterday out of sight. A garden keeps every note near the surface whenever a connected word reappears.",
    backlinks: 7,
    keywords: "notebooks feeds memory garden recall",
  },
  {
    title: "Notes from walking through Kew Gardens",
    excerpt:
      "Labels on glasshouse plants carry two lines: where it came from and what helps it thrive. Good citations work the same way.",
    backlinks: 4,
    keywords: "walking trees plants labels citations reading",
  },
  {
    title: "Margin habits while reading nonfiction",
    excerpt:
      "Fold the bottom corner for a passage worth keeping, then copy only the sentence that surprised you once the chapter ends.",
    backlinks: 9,
    keywords: "reading books margin quotes habits memory",
  },
  {
    title: "How to prune old project folders",
    excerpt:
      "Never delete finished work. Move the best three observations into evergreen notes and let the rest sleep in the archive.",
    backlinks: 5,
    keywords: "folders prune archive evergreen work",
  },
  {
    title: "Listening for repeated questions",
    excerpt:
      "When the same question shows up in three unrelated conversations, open a dedicated page and gather every clue under one roof.",
    backlinks: 6,
    keywords: "questions conversations synthesis writing",
  },
  {
    title: "Keeping a ten-year commonplace book",
    excerpt:
      "Plain files age gracefully. Open a note written in 2016 and answer your younger self directly underneath.",
    backlinks: 11,
    keywords: "commonplace plain files archive years memory",
  },
];

const SAMPLE_QUERIES = ["memory", "reading", "archive", "trees"];

export function IterationTwo() {
  const [selectedId, setSelectedId] = useState<string>("mycelial-memory");
  const [query, setQuery] = useState<string>("");
  const [statusNote, setStatusNote] = useState<string | null>(null);

  const selectedNode =
    GARDEN_NODES.find((n) => n.id === selectedId) ?? GARDEN_NODES[2];

  const edges = useMemo(() => {
    const seen = new Set<string>();
    const list: Array<{ from: GardenNode; to: GardenNode; key: string }> = [];
    for (const node of GARDEN_NODES) {
      for (const targetId of node.roots) {
        const key = [node.id, targetId].sort().join("--");
        if (seen.has(key)) continue;
        const target = GARDEN_NODES.find((n) => n.id === targetId);
        if (target) {
          seen.add(key);
          list.push({ from: node, to: target, key });
        }
      }
    }
    return list;
  }, []);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCHABLE_NOTES.slice(0, 4);
    return SEARCHABLE_NOTES.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.keywords.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div
      className="min-h-screen bg-[#0F241D] text-[#EDF4EF]"
      style={{
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
      }}
    >
      {/* Navigation */}
      <header className="border-b border-[#EDF4EF]/12">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
          <a
            href="#top"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#86C596]"
          >
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#86C596]"
            >
              <path
                d="M12 21V11M12 11C12 6.5 16 4 20 4C20 8.5 17 11.5 12 11ZM12 14C12 10 8.5 7.5 4 7.5C4 11.5 7 14.5 12 14Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-xl font-medium tracking-tight text-[#EDF4EF]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Commonplace
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm text-[#A6BEB0] md:flex"
          >
            <a
              href="#garden-map"
              className="transition-colors hover:text-[#EDF4EF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#86C596]"
            >
              Living map
            </a>
            <a
              href="#recall"
              className="transition-colors hover:text-[#EDF4EF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#86C596]"
            >
              Instant recall
            </a>
            <a
              href="#seasons"
              className="transition-colors hover:text-[#EDF4EF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#86C596]"
            >
              How it grows
            </a>
          </nav>

          <a
            href="#plant"
            className="rounded-full bg-[#86C596] px-4 py-2 text-sm font-semibold text-[#0F241D] transition-colors hover:bg-[#E9C46A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#86C596]"
          >
            Open your garden
          </a>
        </div>
      </header>

      <main id="top">
        {/* Centered Hero + Interactive Botanical Graph */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-[#EDF4EF] sm:text-6xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Grow your thinking over decades, not just for a deadline.
            </h1>

            <p className="mx-auto mt-6 max-w-[54ch] text-base leading-[1.7] text-[#B7CEC0] sm:text-lg">
              Commonplace is a calm second brain built like a botanical garden.
              Plant rough scraps today, link them as they take root, and return
              years later to find ideas already talking to each other.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="#plant"
                className="rounded-full bg-[#E9C46A] px-6 py-3 text-sm font-semibold text-[#0F241D] transition-colors hover:bg-[#EDF4EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9C46A]"
              >
                Start planting free
              </a>
              <a
                href="#recall"
                className="rounded-full border border-[#86C596]/40 px-6 py-3 text-sm font-medium text-[#EDF4EF] transition-colors hover:border-[#86C596] hover:bg-[#173329] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#86C596]"
              >
                Try live search
              </a>
            </div>
          </div>

          {/* Interactive Botanical Root Network */}
          <div
            id="garden-map"
            className="mt-14 overflow-hidden rounded-2xl border border-[#86C596]/22 bg-[#132B22]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EDF4EF]/10 px-6 py-4 text-xs text-[#A6BEB0]">
              <span>Select any specimen in this garden to follow its roots</span>
              <span className="text-[#86C596]">
                {selectedNode.roots.length} connected notes active
              </span>
            </div>

            <div className="grid lg:grid-cols-12">
              {/* SVG Root Canvas */}
              <div className="relative border-b border-[#EDF4EF]/10 p-4 sm:p-6 lg:col-span-7 lg:border-b-0 lg:border-r">
                <svg
                  viewBox="0 0 840 385"
                  role="img"
                  aria-label="Interactive graph of six connected notes"
                  className="h-auto w-full select-none"
                >
                  {/* Organic curved root connections */}
                  {edges.map(({ from, to, key }) => {
                    const isHighlighted =
                      from.id === selectedNode.id || to.id === selectedNode.id;
                    const midX = (from.x + to.x) / 2;
                    const midY = (from.y + to.y) / 2 - 28;
                    return (
                      <path
                        key={key}
                        d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                        fill="none"
                        stroke={isHighlighted ? "#E9C46A" : "#86C596"}
                        strokeOpacity={isHighlighted ? 0.92 : 0.24}
                        strokeWidth={isHighlighted ? 2.4 : 1.3}
                      />
                    );
                  })}

                  {/* Clickable nodes */}
                  {GARDEN_NODES.map((node) => {
                    const isSelected = node.id === selectedNode.id;
                    const isConnected = selectedNode.roots.includes(node.id);
                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedId(node.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedId(node.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Inspect note: ${node.label}`}
                        aria-pressed={isSelected}
                        className="cursor-pointer focus:outline-none"
                      >
                        <circle
                          r={isSelected ? 22 : 16}
                          fill={
                            isSelected
                              ? "#E9C46A"
                              : isConnected
                                ? "#86C596"
                                : "#1C4033"
                          }
                          fillOpacity={isSelected ? 0.22 : isConnected ? 0.2 : 0.9}
                          stroke={
                            isSelected
                              ? "#E9C46A"
                              : isConnected
                                ? "#86C596"
                                : "#4A7460"
                          }
                          strokeWidth={isSelected ? 2 : 1.2}
                        />
                        <circle
                          r={isSelected ? 7 : 5}
                          fill={
                            isSelected
                              ? "#E9C46A"
                              : isConnected
                                ? "#86C596"
                                : "#A6BEB0"
                          }
                        />
                        <text
                          y={
                            node.id === "slow-reading"
                              ? -26
                              : node.id === "mycelial-memory"
                                ? 44
                                : 36
                          }
                          textAnchor="middle"
                          fill={isSelected ? "#EDF4EF" : "#CBE0D2"}
                          fontSize="15"
                          fontWeight={isSelected ? "600" : "500"}
                          style={{
                            fontFamily: "var(--font-plus-jakarta), sans-serif",
                          }}
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Mobile-friendly direct pills for easy tapping */}
                <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
                  {GARDEN_NODES.map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelectedId(node.id)}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        node.id === selectedNode.id
                          ? "bg-[#E9C46A] text-[#0F241D]"
                          : "bg-[#1C3D31] text-[#CBE0D2]"
                      }`}
                    >
                      {node.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Specimen Sheet */}
              <div className="flex flex-col justify-between bg-[#173329] p-6 sm:p-8 lg:col-span-5">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#A6BEB0]">
                    <span className="rounded-full border border-[#86C596]/35 px-2.5 py-0.5 text-[#86C596]">
                      {selectedNode.stage}
                    </span>
                    <span>{selectedNode.updated}</span>
                  </div>

                  <h2
                    className="mt-4 text-2xl font-normal text-[#EDF4EF] sm:text-3xl"
                    style={{
                      fontFamily: "var(--font-fraunces), Georgia, serif",
                    }}
                  >
                    {selectedNode.label}
                  </h2>

                  <p className="mt-4 text-base leading-[1.72] text-[#D3E3D8]">
                    {selectedNode.note}
                  </p>
                </div>

                <div className="mt-8 border-t border-[#EDF4EF]/12 pt-5">
                  <p className="text-xs font-medium text-[#A6BEB0]">
                    Connected roots
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedNode.roots.map((rootId) => {
                      const target = GARDEN_NODES.find((n) => n.id === rootId);
                      if (!target) return null;
                      return (
                        <button
                          key={target.id}
                          type="button"
                          onClick={() => setSelectedId(target.id)}
                          className="rounded-full border border-[#86C596]/35 bg-[#0F241D]/60 px-3 py-1.5 text-xs font-medium text-[#EDF4EF] transition-colors hover:border-[#E9C46A] hover:text-[#E9C46A] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E9C46A]"
                        >
                          {target.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Herbarium Pressed Paper Section: Live Search Sandbox */}
        <section
          id="recall"
          className="bg-[#E8EFEA] py-20 text-[#12261F] lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="grid items-start gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2
                  className="text-3xl font-normal leading-tight tracking-[-0.015em] text-[#12261F] sm:text-4xl"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  Recall anything you read three summers ago in a heartbeat.
                </h2>
                <p className="mt-5 max-w-[44ch] text-base leading-[1.72] text-[#3B5449]">
                  You should never have to remember which folder holds a good
                  quote. Search by a half-remembered word, a date, or a linked
                  idea, and Commonplace pulls up the exact line with its
                  surrounding context.
                </p>

                <div className="mt-8 border-t border-[#12261F]/15 pt-6">
                  <p className="text-sm font-medium text-[#12261F]">
                    Try a sample search term
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SAMPLE_QUERIES.map((word) => (
                      <button
                        key={word}
                        type="button"
                        onClick={() => setQuery(word)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#12261F] ${
                          query.toLowerCase() === word
                            ? "border-[#12261F] bg-[#12261F] text-[#E8EFEA]"
                            : "border-[#12261F]/25 bg-white/70 text-[#12261F] hover:border-[#12261F]"
                        }`}
                      >
                        {word}
                      </button>
                    ))}
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="px-2.5 py-1.5 text-xs text-[#3B5449] underline hover:text-[#12261F]"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Live Search Panel */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-[#12261F]/15 bg-white p-5 sm:p-7">
                  <label htmlFor="garden-search" className="sr-only">
                    Search sample garden notes
                  </label>
                  <div className="flex items-center gap-3 border-b border-[#12261F]/15 pb-4">
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="shrink-0 text-[#3B5449]"
                    >
                      <circle
                        cx="9"
                        cy="9"
                        r="6.25"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M13.8 13.8L17.5 17.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    <input
                      id="garden-search"
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Type a word like memory, reading, or archive..."
                      className="w-full bg-transparent text-base text-[#12261F] placeholder:text-[#6B8478] focus:outline-none"
                    />
                  </div>

                  <div className="mt-4 divide-y divide-[#12261F]/10">
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <article key={item.title} className="py-4 first:pt-2 last:pb-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3
                              className="text-lg font-medium text-[#12261F]"
                              style={{
                                fontFamily: "var(--font-fraunces), Georgia, serif",
                              }}
                            >
                              {item.title}
                            </h3>
                            <span className="text-xs font-medium text-[#2F6849]">
                              {item.backlinks} linked notes
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm leading-[1.65] text-[#415B4F]">
                            {item.excerpt}
                          </p>
                        </article>
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-sm font-medium text-[#12261F]">
                          No notes match &ldquo;{query}&rdquo; in this sample garden.
                        </p>
                        <p className="mt-1 text-xs text-[#415B4F]">
                          In the desktop app, pressing Enter here would plant a
                          fresh note titled &ldquo;{query}&rdquo; immediately.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Ruled Columns: How a garden grows */}
        <section id="seasons" className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <h2
              className="text-3xl font-normal leading-tight text-[#EDF4EF] sm:text-4xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Built for messy beginnings and patient returns.
            </h2>
          </div>

          <div className="mt-14 grid gap-12 border-t border-[#EDF4EF]/15 pt-10 md:grid-cols-3 md:gap-10">
            <div>
              <h3
                className="text-xl font-normal text-[#86C596]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Plant unfinished thoughts
              </h3>
              <p className="mt-3 text-sm leading-[1.72] text-[#B7CEC0]">
                Drop in a half-sentence, a book highlight, or a voice memo
                transcript without naming a folder or picking a template first.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-normal text-[#86C596]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Watch quiet patterns emerge
              </h3>
              <p className="mt-3 text-sm leading-[1.72] text-[#B7CEC0]">
                As your notes accumulate, backlinks gather automatically at the
                foot of each page, showing every place an idea reappeared.
              </p>
            </div>

            <div>
              <h3
                className="text-xl font-normal text-[#86C596]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                Keep the soil on your own drive
              </h3>
              <p className="mt-3 text-sm leading-[1.72] text-[#B7CEC0]">
                Your entire garden lives in standard Markdown files on your
                machine. Export, back up, or read them offline anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section
          id="plant"
          className="border-t border-[#EDF4EF]/12 bg-[#132B22] py-20"
        >
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
            <h2
              className="text-3xl font-normal text-[#EDF4EF] sm:text-5xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Begin your garden today.
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-base leading-[1.7] text-[#B7CEC0]">
              Free forever for local writing on Mac, Windows, and Linux. Add
              private encrypted sync across your phone and tablet for $8 a
              month.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setStatusNote(
                    "Installer queued for macOS, Windows, and Linux. Local vaults need no account."
                  )
                }
                className="rounded-full bg-[#E9C46A] px-7 py-3.5 text-sm font-semibold text-[#0F241D] transition-colors hover:bg-[#EDF4EF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E9C46A]"
              >
                Download Commonplace
              </button>
            </div>
            {statusNote && (
              <p role="status" className="mt-4 text-sm text-[#86C596]">
                {statusNote}
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#EDF4EF]/10 py-8 text-sm text-[#8DA999]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
          <span
            className="text-base text-[#EDF4EF]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Commonplace
          </span>
          <p>Local-first personal knowledge garden</p>
        </div>
      </footer>
    </div>
  );
}
