"use client";

import { useMemo, useState } from "react";

interface StarNote {
  id: string;
  title: string;
  date: string;
  x: number;
  y: number;
  brightness: number;
  body: string;
  links: string[];
}

const STARS: StarNote[] = [
  {
    id: "sleep",
    title: "Sleep & consolidation",
    date: "Written Oct 12, 2025",
    x: 118,
    y: 86,
    brightness: 1,
    body: "Leaving an unfinished question on your desk before bed works better than forcing a paragraph at midnight. By morning, two older notes usually turn out to answer it.",
    links: ["nocturnal", "anchors", "clocks"],
  },
  {
    id: "nocturnal",
    title: "Nocturnal writing",
    date: "Written Feb 04, 2026",
    x: 285,
    y: 70,
    brightness: 0.9,
    body: "After ten o'clock the inbox stops moving and the prose slows down. You stop writing for an imaginary audience and start noticing what you actually think.",
    links: ["sleep", "acoustic", "letters"],
  },
  {
    id: "acoustic",
    title: "Acoustic rooms",
    date: "Written Jun 19, 2025",
    x: 455,
    y: 112,
    brightness: 0.85,
    body: "Libraries with heavy timber ceilings soften footsteps without feeling dead. Digital workspaces need that same acoustic calm instead of red badges.",
    links: ["nocturnal", "marginalia"],
  },
  {
    id: "clocks",
    title: "Slow clocks",
    date: "Written Nov 28, 2024",
    x: 162,
    y: 222,
    brightness: 0.8,
    body: "A clock face shows how much evening remains in one glance. A good archive does the same for a decade of reading.",
    links: ["sleep", "anchors"],
  },
  {
    id: "anchors",
    title: "Memory anchors",
    date: "Written Aug 09, 2026",
    x: 310,
    y: 205,
    brightness: 1,
    body: "You rarely remember an entire chapter, yet one concrete image brings the whole argument back. Keep the image at the top of the note.",
    links: ["sleep", "clocks", "letters", "marginalia"],
  },
  {
    id: "marginalia",
    title: "Marginalia",
    date: "Written Mar 15, 2026",
    x: 472,
    y: 256,
    brightness: 0.9,
    body: "Writing in the margin turns a book into a dialogue with someone who cannot interrupt you. Copying those lines into Commonplace lets the books talk to each other.",
    links: ["acoustic", "anchors", "letters"],
  },
  {
    id: "letters",
    title: "Long letters",
    date: "Written Sep 03, 2026",
    x: 332,
    y: 318,
    brightness: 0.85,
    body: "The clearest explanations I have ever written started as emails to one curious friend. Saving those drafts into my vault paid off for years.",
    links: ["nocturnal", "anchors", "marginalia"],
  },
];

const TIME_LAYERS = [
  {
    step: 0,
    label: "Tonight",
    archiveDate: "November 19, 2026",
    noteTitle: "Drafting the talk on calm software",
    excerpt:
      "Most productivity apps treat your attention like a conveyor belt. What happens if a notebook assumes you will still be reading these same notes in 2036?",
    connection: "Matches active draft keywords: attention, calm, longevity",
  },
  {
    step: 1,
    label: "8 months ago",
    archiveDate: "March 15, 2026",
    noteTitle: "Marginalia in Stewart Brand's Pace Layers",
    excerpt:
      "Fast layers innovate; slow layers remember. Personal notes belong to the slow layer, insulated from whatever tool trend passes this quarter.",
    connection: "Resurfaced automatically via shared link: Longevity in design",
  },
  {
    step: 2,
    label: "3 years ago",
    archiveDate: "November 28, 2023",
    noteTitle: "First evening in the quiet reading room",
    excerpt:
      "Noticed how quickly my shoulders dropped when the room had only warm desk lamps and wooden tables. Remember this feeling next time we design an interface.",
    connection: "Resurfaced automatically via shared link: Acoustic rooms",
  },
];

export function IterationFour() {
  const [selectedStarId, setSelectedStarId] = useState<string>("anchors");
  const [timeStep, setTimeStep] = useState<number>(1);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const selectedStar =
    STARS.find((s) => s.id === selectedStarId) ?? STARS[4];

  const constellationLines = useMemo(() => {
    const seen = new Set<string>();
    const pairs: Array<{ from: StarNote; to: StarNote; key: string }> = [];
    for (const star of STARS) {
      for (const linkId of star.links) {
        const key = [star.id, linkId].sort().join("--");
        if (seen.has(key)) continue;
        const target = STARS.find((s) => s.id === linkId);
        if (target) {
          seen.add(key);
          pairs.push({ from: star, to: target, key });
        }
      }
    }
    return pairs;
  }, []);

  const resurfaced = TIME_LAYERS[timeStep] ?? TIME_LAYERS[1];

  return (
    <div
      className="observatory-bg min-h-screen text-[#F1F5FB]"
      style={{
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header className="border-b border-[#F1F5FB]/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
          <a
            href="#top"
            className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B971]"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-[#F5B971]"
            >
              <circle cx="10" cy="10" r="2.2" fill="currentColor" />
              <circle
                cx="10"
                cy="10"
                r="7.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeOpacity="0.55"
              />
              <circle cx="15.3" cy="4.7" r="1.4" fill="#7DD3FC" />
            </svg>
            <span
              className="text-xl font-normal tracking-tight text-[#F1F5FB]"
              style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
            >
              Commonplace
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm text-[#9FB1D1] md:flex"
          >
            <a
              href="#constellation"
              className="transition-colors hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B971]"
            >
              Constellation
            </a>
            <a
              href="#resurface"
              className="transition-colors hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B971]"
            >
              Resurfacing
            </a>
            <a
              href="#essay"
              className="transition-colors hover:text-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5B971]"
            >
              Philosophy
            </a>
          </nav>

          <a
            href="#begin"
            className="rounded-md border border-[#F5B971]/60 bg-[#F5B971]/10 px-4 py-2 text-sm font-medium text-[#F5B971] transition-colors hover:bg-[#F5B971] hover:text-[#0C1324] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B971]"
          >
            Start writing
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero with Interactive Constellation Star Chart */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 lg:px-10 lg:pb-28 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h1
                className="text-4xl font-normal leading-[1.09] tracking-[-0.02em] text-[#F1F5FB] sm:text-5xl lg:text-[54px]"
                style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
              >
                Think past the noise of the present hour.
              </h1>

              <p className="mt-6 max-w-[44ch] text-base leading-[1.72] text-[#9FB1D1] sm:text-lg">
                Commonplace holds your reading notes, late-night hunches, and
                unfinished drafts in a quiet sky where distant thoughts line up
                when you need them.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#begin"
                  className="rounded-md bg-[#F5B971] px-5 py-3 text-sm font-semibold text-[#0C1324] transition-colors hover:bg-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B971]"
                >
                  Download desktop app
                </a>
                <a
                  href="#resurface"
                  className="rounded-md border border-[#F1F5FB]/20 px-5 py-3 text-sm font-medium text-[#F1F5FB] transition-colors hover:border-[#7DD3FC] hover:text-[#7DD3FC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DD3FC]"
                >
                  See memory resurfacing
                </a>
              </div>

              <p className="mt-6 text-sm text-[#7F95BC]">
                Offline-first Markdown library. End-to-end encrypted sync
                optional.
              </p>
            </div>

            {/* Right Interactive Constellation Map */}
            <div id="constellation" className="lg:col-span-7">
              <div className="overflow-hidden rounded-xl border border-[#7DD3FC]/20 bg-[#131E36]/90">
                <div className="flex items-center justify-between border-b border-[#F1F5FB]/10 px-5 py-3.5 text-xs text-[#9FB1D1]">
                  <span>Select a star to read its note and sight-lines</span>
                  <span className="text-[#7DD3FC]">
                    {selectedStar.links.length} linked stars
                  </span>
                </div>

                <div className="p-3 sm:p-5">
                  <svg
                    viewBox="0 0 580 365"
                    role="img"
                    aria-label="Interactive constellation of seven connected notes"
                    className="h-auto w-full select-none"
                  >
                    {/* Subtle celestial grid rings */}
                    <circle
                      cx="300"
                      cy="190"
                      r="145"
                      fill="none"
                      stroke="#7DD3FC"
                      strokeOpacity="0.08"
                      strokeDasharray="3 6"
                    />
                    <circle
                      cx="300"
                      cy="190"
                      r="80"
                      fill="none"
                      stroke="#7DD3FC"
                      strokeOpacity="0.08"
                    />

                    {/* Sight-line connections */}
                    {constellationLines.map(({ from, to, key }) => {
                      const active =
                        from.id === selectedStar.id || to.id === selectedStar.id;
                      return (
                        <line
                          key={key}
                          x1={from.x}
                          y1={from.y}
                          x2={to.x}
                          y2={to.y}
                          stroke={active ? "#7DD3FC" : "#9FB1D1"}
                          strokeOpacity={active ? 0.85 : 0.18}
                          strokeWidth={active ? 1.8 : 1}
                        />
                      );
                    })}

                    {/* Clickable star nodes */}
                    {STARS.map((star) => {
                      const isSelected = star.id === selectedStar.id;
                      const isLinked = selectedStar.links.includes(star.id);
                      return (
                        <g
                          key={star.id}
                          transform={`translate(${star.x}, ${star.y})`}
                          onClick={() => setSelectedStarId(star.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedStarId(star.id);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={`Read star note: ${star.title}`}
                          aria-pressed={isSelected}
                          className="cursor-pointer focus:outline-none"
                        >
                          <circle
                            r={isSelected ? 18 : 12}
                            fill={
                              isSelected
                                ? "#F5B971"
                                : isLinked
                                  ? "#7DD3FC"
                                  : "#F1F5FB"
                            }
                            fillOpacity={
                              isSelected ? 0.2 : isLinked ? 0.14 : 0.04
                            }
                          />
                          <circle
                            r={isSelected ? 5.5 : isLinked ? 4.2 : 3.2}
                            fill={
                              isSelected
                                ? "#F5B971"
                                : isLinked
                                  ? "#7DD3FC"
                                  : "#CBD7EC"
                            }
                          />
                          <text
                            y={
                              star.id === "letters" ||
                              star.id === "clocks" ||
                              star.id === "marginalia"
                                ? 24
                                : isSelected
                                  ? -16
                                  : -13
                            }
                            textAnchor="middle"
                            fill={
                              isSelected
                                ? "#F5B971"
                                : isLinked
                                  ? "#F1F5FB"
                                  : "#9FB1D1"
                            }
                            fontSize="12.5"
                            fontWeight={isSelected ? "600" : "400"}
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                            }}
                          >
                            {star.title}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Selected star reading drawer */}
                <div className="border-t border-[#F1F5FB]/10 bg-[#192746] px-6 py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2
                      className="text-xl font-normal text-[#F5B971]"
                      style={{
                        fontFamily: "var(--font-newsreader), Georgia, serif",
                      }}
                    >
                      {selectedStar.title}
                    </h2>
                    <span className="text-xs text-[#9FB1D1]">
                      {selectedStar.date}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-[60ch] text-sm leading-[1.7] text-[#E1EAF8]">
                    {selectedStar.body}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-[#9FB1D1]">Connected to:</span>
                    {selectedStar.links.map((id) => {
                      const neighbor = STARS.find((s) => s.id === id);
                      if (!neighbor) return null;
                      return (
                        <button
                          key={neighbor.id}
                          type="button"
                          onClick={() => setSelectedStarId(neighbor.id)}
                          className="rounded border border-[#7DD3FC]/35 bg-[#0C1324]/60 px-2.5 py-1 text-xs text-[#7DD3FC] transition-colors hover:border-[#F5B971] hover:text-[#F5B971] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B971]"
                        >
                          {neighbor.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Time-Travel Resurfacing Band */}
        <section
          id="resurface"
          className="border-y border-[#F1F5FB]/10 bg-[#131E36]/75 py-20 lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <h2
                className="text-3xl font-normal leading-tight text-[#F1F5FB] sm:text-4xl"
                style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
              >
                Your past self already solved half of tonight&apos;s problem.
              </h2>
              <p className="mt-4 text-base leading-[1.7] text-[#9FB1D1]">
                Move through the archive horizon below to see how Commonplace
                surfaces relevant passages from months or years ago right beside
                your active page.
              </p>
            </div>

            {/* Horizon controls */}
            <div className="mt-10 rounded-xl border border-[#F1F5FB]/12 bg-[#0C1324] p-6 sm:p-8">
              <div className="flex flex-col gap-4 border-b border-[#F1F5FB]/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {TIME_LAYERS.map((layer) => (
                    <button
                      key={layer.step}
                      type="button"
                      onClick={() => setTimeStep(layer.step)}
                      className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5B971] ${
                        timeStep === layer.step
                          ? "bg-[#F5B971] text-[#0C1324]"
                          : "border border-[#F1F5FB]/15 text-[#9FB1D1] hover:text-[#F1F5FB]"
                      }`}
                    >
                      {layer.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="horizon-range"
                    className="text-xs text-[#9FB1D1]"
                  >
                    Memory depth
                  </label>
                  <input
                    id="horizon-range"
                    type="range"
                    min={0}
                    max={2}
                    step={1}
                    value={timeStep}
                    onChange={(e) => setTimeStep(Number(e.target.value))}
                    className="w-36 accent-[#F5B971]"
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {/* Active evening page */}
                <div className="border-l-2 border-[#7DD3FC] pl-5">
                  <p className="text-xs text-[#7DD3FC]">
                    Open on your desk right now
                  </p>
                  <h3
                    className="mt-2 text-2xl font-normal text-[#F1F5FB]"
                    style={{
                      fontFamily: "var(--font-newsreader), Georgia, serif",
                    }}
                  >
                    Notes for a calmer workspace
                  </h3>
                  <p className="mt-3 text-sm leading-[1.72] text-[#C8D6EE]">
                    Every tool I admire shares one quality: it gets quieter the
                    longer you use it. When I open my notes at 11 p.m., I want a
                    lamp on the page and the three relevant ideas I wrote over
                    the past few years waiting calmly in the margin.
                  </p>
                </div>

                {/* Resurfaced memory pane */}
                <div className="rounded-lg border border-[#F5B971]/30 bg-[#192746] p-5">
                  <div className="flex items-baseline justify-between gap-2 text-xs text-[#F5B971]">
                    <span>Resurfaced from {resurfaced.archiveDate}</span>
                  </div>
                  <h3
                    className="mt-2 text-xl font-normal text-[#F1F5FB]"
                    style={{
                      fontFamily: "var(--font-newsreader), Georgia, serif",
                    }}
                  >
                    {resurfaced.noteTitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.7] text-[#DCE6F7]">
                    {resurfaced.excerpt}
                  </p>
                  <p className="mt-4 border-t border-[#F1F5FB]/10 pt-3 text-xs text-[#9FB1D1]">
                    {resurfaced.connection}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiet Single-Column Philosophy */}
        <section id="essay" className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
          <h2
            className="text-3xl font-normal leading-snug text-[#F1F5FB] sm:text-4xl"
            style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
          >
            Why most notes vanish a week after you take them.
          </h2>

          <div className="mt-7 space-y-5 text-base leading-[1.82] text-[#B7C7E3] sm:text-lg">
            <p>
              Standard note apps are built like filing cabinets: once a page is
              tucked into a folder, you never cross paths with it again unless
              you already remember it exists.
            </p>
            <p>
              Commonplace reverses that gravity. Every note sits inside a local
              plain-text folder on your computer, linked by plain words and
              concepts. When a familiar idea returns in a new project, the older
              pages step forward automatically without algorithms tracking you
              or cloud servers mining your thoughts.
            </p>
            <p>
              Your writing stays private, encrypted if you sync, and readable in
              any plain-text editor fifty years from now.
            </p>
          </div>

          <div
            id="begin"
            className="mt-14 border-t border-[#F1F5FB]/15 pt-10"
          >
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h3
                  className="text-2xl font-normal text-[#F1F5FB]"
                  style={{
                    fontFamily: "var(--font-newsreader), Georgia, serif",
                  }}
                >
                  Free on your computer. $8 a month for encrypted sync.
                </h3>
                <p className="mt-2 text-sm text-[#9FB1D1]">
                  Available for macOS, Windows, Linux, and iOS.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDownloaded(true)}
                className="shrink-0 rounded-md bg-[#F5B971] px-6 py-3 text-sm font-semibold text-[#0C1324] transition-colors hover:bg-[#F1F5FB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B971]"
              >
                Download Commonplace
              </button>
            </div>
            {downloaded && (
              <p role="status" className="mt-4 text-sm text-[#7DD3FC]">
                Desktop build ready. Open your existing Markdown folder or start
                a fresh local vault in seconds.
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#F1F5FB]/10 py-8 text-sm text-[#7F95BC]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
          <span
            className="text-base text-[#F1F5FB]"
            style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
          >
            Commonplace
          </span>
          <span>Quiet local-first note-taking for long arcs of thought</span>
        </div>
      </footer>
    </div>
  );
}
