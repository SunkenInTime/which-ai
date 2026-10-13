"use client";

import { useState } from "react";
import Link from "next/link";

interface SlipNode {
  address: string;
  title: string;
  date: string;
  body: string;
  quote: string;
  source: string;
  branches: {
    address: string;
    title: string;
    date: string;
    body: string;
    leaf: {
      address: string;
      title: string;
      date: string;
      body: string;
      synthesis: string;
    };
  }[];
}

const SLIP_TRAILS: Record<string, SlipNode> = {
  resilience: {
    address: "14",
    title: "Tightly coupled schedules hide localized drift until cascade failure",
    date: "19 Nov 2025",
    body: "When every slack buffer is removed from a timetable to maximize nominal throughput, small local delays can no longer dissipate locally. They propagate downstream as hard dependencies.",
    quote:
      "Efficiency removes the very margin that allows operators to improvise when sensors disagree.",
    source: "Richard Cook, How Complex Systems Fail (1998)",
    branches: [
      {
        address: "14a",
        title: "Slack acts as an epistemic buffer, not wasted capacity",
        date: "22 Nov 2025",
        body: "In biological and civic networks, reserve capacity gives neighboring nodes time to detect overload and reroute traffic before thresholds are breached.",
        leaf: {
          address: "14a1",
          title: "Tidal wetlands vs concrete flood channels",
          date: "04 Dec 2025",
          body: "Channelized rivers accelerate peak surge velocity downstream, whereas floodplain marshes absorb volume across thousands of micro-basins.",
          synthesis:
            "Used in Chapter 3 of the Urban Resilience monograph to compare grid transformer buffering with estuarine marshes.",
        },
      },
      {
        address: "14b",
        title: "Human operators mask brittle automation through informal workarounds",
        date: "01 Dec 2025",
        body: "Systems often appear stable in metrics only because experienced staff quietly patch edge cases before they reach automated tripwires.",
        leaf: {
          address: "14b1",
          title: "Paper flight strips in air traffic control towers",
          date: "15 Dec 2025",
          body: "Physical handoffs of paper strips forced shared spatial awareness between controllers that purely digital silent updates initially eroded.",
          synthesis:
            "Linked to interface design principles for collaborative cockpit checklists.",
        },
      },
    ],
  },
  ecology: {
    address: "27",
    title: "Mycorrhizal networks trade phosphorus along carbon price gradients",
    date: "08 Oct 2025",
    body: "Fungal hyphae do not distribute nutrients uniformly; they preferentially allocate mineral phosphorus to host roots that supply higher carbohydrate surpluses.",
    quote:
      "Underground exchange resembles a decentralized clearinghouse with local price discovery.",
    source: "Toby Kiers et al., Reciprocal rewards in symbiosis (2011)",
    branches: [
      {
        address: "27a",
        title: "Shaded seedlings receive subsidies from canopy elders via shared fungi",
        date: "14 Oct 2025",
        body: "Isotope tracing shows net carbon movement toward understory saplings during autumn senescence when canopy trees shed foliar demand.",
        leaf: {
          address: "27a1",
          title: "Selective thinning preserves multi-aged root topology",
          date: "03 Nov 2025",
          body: "Clear-cutting severs the fungal hub nodes, delaying soil microbiome recovery by two decades compared with shelterwood harvesting.",
          synthesis:
            "Cited in forestry policy memo on mixed-conifer watershed recovery.",
        },
      },
      {
        address: "27b",
        title: "Drought shifts fungal partner selection toward drought-tolerant strains",
        date: "29 Oct 2025",
        body: "When soil moisture drops below twelve percent, host trees prune connections to high-cost fungal symbionts in favor of deep-foraging morphotypes.",
        leaf: {
          address: "27b1",
          title: "Dynamic re-weighting in decentralized routing protocols",
          date: "18 Nov 2025",
          body: "Packet networks that penalize high-latency links without severing fallback paths mirror biological partner switching under stress.",
          synthesis:
            "Cross-disciplinary bridge connecting botany notes with peer-to-peer mesh routing.",
        },
      },
    ],
  },
  acoustics: {
    address: "39",
    title: "Early lateral reflections govern intimacy in shoebox concert halls",
    date: "12 Jan 2026",
    body: "Listeners judge a hall’s warmth not by total reverberation time alone, but by sound arriving from side walls within the first eighty milliseconds.",
    quote:
      "A narrow room wraps the ear in early reflections before the ceiling decay blooms.",
    source: "Leo Beranek, Concert Halls and Opera Houses (2004)",
    branches: [
      {
        address: "39a",
        title: "Plaster relief ornament diffuses high frequencies without deadening brass",
        date: "19 Jan 2026",
        body: "Irregular Baroque niches and statues break up flutter echoes while keeping acoustic energy alive in the room.",
        leaf: {
          address: "39a1",
          title: "Why flat drywall classrooms fatigue the human voice",
          date: "02 Feb 2026",
          body: "Parallel smooth gypsum walls create harsh slap-back reflections that force speakers to raise vocal effort, increasing listener fatigue.",
          synthesis:
            "Applied to acoustic retrofit guidelines for municipal reading rooms.",
        },
      },
      {
        address: "39b",
        title: "Stage floor resonance couples cello vibrations directly to the hall",
        date: "27 Jan 2026",
        body: "Thin Norway spruce risers supported on timber joists act as a secondary soundboard for bowed string instruments.",
        leaf: {
          address: "39b1",
          title: "Tactile feedback loops in musical instrument design",
          date: "09 Feb 2026",
          body: "Performers adjust bow pressure within milliseconds when they feel floor vibration returning through the endpin.",
          synthesis:
            "Connected to haptic feedback notes in hardware synthesizer keys.",
        },
      },
    ],
  },
};

export default function SlipboxIterationPage() {
  const [selectedTrailKey, setSelectedTrailKey] = useState<string>("resilience");
  const [selectedBranchIdx, setSelectedBranchIdx] = useState<number>(0);
  const [activePane, setActivePane] = useState<1 | 2 | 3>(3);
  const [customSlips, setCustomSlips] = useState<
    { address: string; title: string; parentAddress: string }[]
  >([
    {
      address: "14a2",
      title: "Grain reserves in medieval city-states as civic shock absorbers",
      parentAddress: "14a",
    },
  ]);
  const [newSlipTitle, setNewSlipTitle] = useState("");

  const trail = SLIP_TRAILS[selectedTrailKey];
  const branch = trail.branches[selectedBranchIdx] ?? trail.branches[0];
  const leaf = branch.leaf;

  const handleTrailSwitch = (key: string) => {
    setSelectedTrailKey(key);
    setSelectedBranchIdx(0);
    setActivePane(3);
  };

  const handleCreateBranchSlip = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newSlipTitle.trim();
    if (!trimmed) return;
    const nextNumber = customSlips.filter(
      (s) => s.parentAddress === branch.address
    ).length + 2;
    setCustomSlips((prev) => [
      ...prev,
      {
        address: `${branch.address}${nextNumber}`,
        title: trimmed,
        parentAddress: branch.address,
      },
    ]);
    setNewSlipTitle("");
  };

  const matchingCustomSlips = customSlips.filter(
    (s) => s.parentAddress === branch.address
  );

  return (
    <div className="min-h-screen bg-[#DCE0E6] text-[#141923] font-plex selection:bg-[#C88A1E]/25 selection:text-[#141923]">
      {/* Top Archival Navigation */}
      <header className="border-b border-[#B8C0CC] bg-[#DCE0E6]/90 backdrop-blur-xs sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/with-design-skill/gemini-4-argon/2"
              className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-[#141923]"
            >
              <span className="inline-flex h-6 w-7 items-center justify-center rounded-xs bg-[#141923] text-xs font-semibold text-[#F7F8FA]">
                14a
              </span>
              <span>Marrow</span>
            </Link>
            <span className="hidden md:inline text-sm text-[#526075]">
              Associative slipbox and cascading desk for permanent notes
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-[#526075]">
            <a
              href="#slip-stack"
              className="hover:text-[#141923] transition-colors"
            >
              Cascading stack
            </a>
            <a
              href="#addressing"
              className="hover:text-[#141923] transition-colors hidden sm:inline"
            >
              Branching addresses
            </a>
            <a
              href="#storage"
              className="hover:text-[#141923] transition-colors hidden sm:inline"
            >
              Local files
            </a>
            <a
              href="#get-marrow"
              className="rounded bg-[#141923] px-4 py-2 text-xs font-medium text-[#F7F8FA] hover:bg-[#2A3346] transition-colors"
            >
              Create your first slip
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-10 pb-28">
        {/* Compact Left-Aligned Header + Drawer Selector */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.12] text-[#141923]">
              Follow a chain of thought across three open cards at once.
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-[1.6] text-[#526075] max-w-[62ch]">
              Most note apps force you to close one idea to read the next.
              Marrow arranges your permanent notes like Niklas Luhmann’s wooden
              slip drawers: clicking a link slides the branching card open right
              beside its parent so you can see the entire argument on one desk.
            </p>
          </div>

          {/* Drawer Tab Switcher */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-[#526075]">
              Select an index drawer to inspect its branching chain:
            </span>
            <div className="inline-flex flex-wrap gap-1.5 rounded-lg border border-[#B8C0CC] bg-[#CFD5DE] p-1.5">
              <button
                type="button"
                onClick={() => handleTrailSwitch("resilience")}
                className={`rounded-md px-3.5 py-2 text-xs font-medium transition-all ${
                  selectedTrailKey === "resilience"
                    ? "bg-[#F7F8FA] text-[#141923] shadow-xs border-l-4 border-[#C88A1E]"
                    : "text-[#526075] hover:text-[#141923]"
                }`}
              >
                Drawer 14: Systems resilience
              </button>
              <button
                type="button"
                onClick={() => handleTrailSwitch("ecology")}
                className={`rounded-md px-3.5 py-2 text-xs font-medium transition-all ${
                  selectedTrailKey === "ecology"
                    ? "bg-[#F7F8FA] text-[#141923] shadow-xs border-l-4 border-[#C88A1E]"
                    : "text-[#526075] hover:text-[#141923]"
                }`}
              >
                Drawer 27: Fungal economics
              </button>
              <button
                type="button"
                onClick={() => handleTrailSwitch("acoustics")}
                className={`rounded-md px-3.5 py-2 text-xs font-medium transition-all ${
                  selectedTrailKey === "acoustics"
                    ? "bg-[#F7F8FA] text-[#141923] shadow-xs border-l-4 border-[#C88A1E]"
                    : "text-[#526075] hover:text-[#141923]"
                }`}
              >
                Drawer 39: Room acoustics
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Hero: Horizontal 3-Pane Cascading Slip Stack */}
        <section
          id="slip-stack"
          aria-label="Interactive cascading slip stack"
          className="rounded-xl border border-[#B8C0CC] bg-[#CFD5DE] p-4 sm:p-6 shadow-sm"
        >
          {/* Breadcrumb Trail Bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-[#526075]">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#141923]">Active chain:</span>
              <span className="rounded bg-[#F7F8FA] px-2 py-0.5 font-medium text-[#141923] border border-[#B8C0CC]">
                Slip {trail.address}
              </span>
              <span>/</span>
              <span className="rounded bg-[#F7F8FA] px-2 py-0.5 font-medium text-[#141923] border border-[#B8C0CC]">
                Slip {branch.address}
              </span>
              <span>/</span>
              <span className="rounded bg-[#C88A1E]/20 px-2 py-0.5 font-semibold text-[#141923] border border-[#C88A1E]">
                Slip {leaf.address}
              </span>
            </div>
            <div>
              Click any branch button on Slip {trail.address} to pivot the downstream
              cards
            </div>
          </div>

          {/* 3 Horizontal Panes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* PANE 1: Origin Slip */}
            <article
              onClick={() => setActivePane(1)}
              className={`rounded-lg border transition-all bg-[#F7F8FA] flex flex-col justify-between p-6 cursor-pointer ${
                activePane === 1
                  ? "border-[#141923] ring-2 ring-[#C88A1E]/50"
                  : "border-[#B8C0CC] hover:border-[#526075]"
              }`}
            >
              <div>
                {/* Physical Die-Cut Tab Header */}
                <div className="flex items-center justify-between border-b border-[#DCE0E6] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-xs bg-[#141923] px-2.5 py-1 text-xs font-semibold text-[#F7F8FA]">
                      Slip {trail.address}
                    </span>
                    <span className="text-xs text-[#526075]">Origin note</span>
                  </div>
                  <span className="text-xs text-[#526075]">{trail.date}</span>
                </div>

                <h2 className="mt-4 text-xl font-semibold leading-snug text-[#141923]">
                  {trail.title}
                </h2>

                <p className="mt-3 text-sm leading-[1.65] text-[#2A3346]">
                  {trail.body}
                </p>

                <blockquote className="mt-4 rounded border-l-3 border-[#C88A1E] bg-[#DCE0E6]/45 p-3.5 font-fraunces text-sm italic leading-[1.6] text-[#141923]">
                  “{trail.quote}”
                  <footer className="mt-1.5 font-plex not-italic text-xs text-[#526075]">
                    Source: {trail.source}
                  </footer>
                </blockquote>
              </div>

              {/* Branch Selector Controls */}
              <div className="mt-6 border-t border-[#DCE0E6] pt-4">
                <div className="text-xs font-medium text-[#526075] mb-2">
                  Outgoing branches from Slip {trail.address} (click to switch pane 2):
                </div>
                <div className="space-y-2">
                  {trail.branches.map((b, idx) => {
                    const isSelected = idx === selectedBranchIdx;
                    return (
                      <button
                        key={b.address}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBranchIdx(idx);
                          setActivePane(2);
                        }}
                        className={`w-full text-left rounded-md border px-3 py-2.5 text-xs transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? "border-[#C88A1E] bg-[#C88A1E]/12 text-[#141923] font-medium"
                            : "border-[#DCE0E6] bg-white text-[#526075] hover:border-[#B8C0CC] hover:text-[#141923]"
                        }`}
                      >
                        <span className="shrink-0 rounded-xs bg-[#141923] px-1.5 py-0.5 text-[11px] font-semibold text-white">
                          {b.address}
                        </span>
                        <span className="line-clamp-2">{b.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </article>

            {/* PANE 2: Branching Argument Slip */}
            <article
              onClick={() => setActivePane(2)}
              className={`rounded-lg border transition-all bg-[#F7F8FA] flex flex-col justify-between p-6 cursor-pointer ${
                activePane === 2
                  ? "border-[#141923] ring-2 ring-[#C88A1E]/50"
                  : "border-[#B8C0CC] hover:border-[#526075]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#DCE0E6] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-xs bg-[#C88A1E] px-2.5 py-1 text-xs font-semibold text-[#141923]">
                      Slip {branch.address}
                    </span>
                    <span className="text-xs text-[#526075]">
                      Branches from {trail.address}
                    </span>
                  </div>
                  <span className="text-xs text-[#526075]">{branch.date}</span>
                </div>

                <h2 className="mt-4 text-xl font-semibold leading-snug text-[#141923]">
                  {branch.title}
                </h2>

                <p className="mt-3 text-sm leading-[1.65] text-[#2A3346]">
                  {branch.body}
                </p>

                {/* Interactive: Add a new sibling branch slip right here */}
                <div className="mt-5 rounded-md border border-[#DCE0E6] bg-[#DCE0E6]/35 p-3.5">
                  <div className="text-xs font-medium text-[#141923] mb-2">
                    Branching sequence under {branch.address}:
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-[#141923] font-medium">
                      <span className="rounded-xs bg-[#141923] px-1.5 py-0.5 text-[10px] text-white">
                        {leaf.address}
                      </span>
                      <span className="truncate">{leaf.title}</span>
                    </li>
                    {matchingCustomSlips.map((cs) => (
                      <li
                        key={cs.address}
                        className="flex items-center gap-2 text-[#141923]"
                      >
                        <span className="rounded-xs bg-[#C88A1E] px-1.5 py-0.5 text-[10px] font-semibold text-[#141923]">
                          {cs.address}
                        </span>
                        <span className="truncate">{cs.title}</span>
                      </li>
                    ))}
                  </ul>

                  <form onSubmit={handleCreateBranchSlip} className="mt-3 flex gap-1.5">
                    <input
                      type="text"
                      value={newSlipTitle}
                      onChange={(e) => setNewSlipTitle(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      placeholder={`File a new slip under ${branch.address}...`}
                      aria-label={`File a new slip under ${branch.address}`}
                      className="min-w-0 flex-1 rounded border border-[#B8C0CC] bg-white px-2.5 py-1.5 text-xs text-[#141923] placeholder:text-[#526075]/70 focus:border-[#141923] focus:outline-hidden"
                    />
                    <button
                      type="submit"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 rounded bg-[#141923] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-[#2A3346]"
                    >
                      Insert slip
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-6 border-t border-[#DCE0E6] pt-4 flex items-center justify-between text-xs text-[#526075]">
                <span>Backlink: Slip {trail.address}</span>
                <span className="font-medium text-[#141923]">
                  Continues in Slip {leaf.address}
                </span>
              </div>
            </article>

            {/* PANE 3: Concrete Case / Synthesis Slip */}
            <article
              onClick={() => setActivePane(3)}
              className={`rounded-lg border transition-all bg-[#F7F8FA] flex flex-col justify-between p-6 cursor-pointer ${
                activePane === 3
                  ? "border-[#141923] ring-2 ring-[#C88A1E]/50"
                  : "border-[#B8C0CC] hover:border-[#526075]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#DCE0E6] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-xs bg-[#141923] px-2.5 py-1 text-xs font-semibold text-[#F7F8FA]">
                      Slip {leaf.address}
                    </span>
                    <span className="text-xs text-[#526075]">
                      Empirical evidence
                    </span>
                  </div>
                  <span className="text-xs text-[#526075]">{leaf.date}</span>
                </div>

                <h2 className="mt-4 text-xl font-semibold leading-snug text-[#141923]">
                  {leaf.title}
                </h2>

                <p className="mt-3 text-sm leading-[1.65] text-[#2A3346]">
                  {leaf.body}
                </p>

                <div className="mt-5 rounded-md border border-[#C88A1E]/50 bg-[#C88A1E]/10 p-4">
                  <div className="text-xs font-semibold text-[#141923]">
                    Where this chain appears in your writing
                  </div>
                  <p className="mt-1.5 font-fraunces text-sm leading-[1.6] text-[#141923]">
                    {leaf.synthesis}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-[#DCE0E6] pt-4 flex items-center justify-between text-xs">
                <span className="text-[#526075]">
                  Lineage: {trail.address} / {branch.address} / {leaf.address}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBranchIdx(
                      (selectedBranchIdx + 1) % trail.branches.length
                    );
                  }}
                  className="font-medium text-[#141923] underline decoration-[#C88A1E] decoration-2 underline-offset-4 hover:text-[#C88A1E]"
                >
                  Compare sibling branch
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* Architectural Explanation: Why Alphanumeric Branching Beats Folders */}
        <section
          id="addressing"
          className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-semibold tracking-tight text-[#141923] leading-tight">
              Why branching addresses outlive rigid folder trees
            </h2>
            <p className="mt-4 text-base leading-[1.65] text-[#526075]">
              When you file a document inside a folder, you have to guess where
              future-you will look for it. When you place a slip next to a note it
              directly extends or contradicts, the structure grows organically
              from the ideas themselves.
            </p>
            <p className="mt-4 text-base leading-[1.65] text-[#526075]">
              Niklas Luhmann wrote seventy books and four hundred scholarly
              articles out of a single wooden slipbox organized by alternating
              numbers and letters. Marrow brings that exact spatial permanence to
              your keyboard.
            </p>
          </div>

          <div className="lg:col-span-7 rounded-xl border border-[#B8C0CC] bg-[#F7F8FA] p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-[#141923]">
              Anatomy of a branching sequence
            </h3>
            <p className="mt-1 text-sm text-[#526075]">
              Every slip can continue linearly or fork infinitely in place without
              renaming existing files.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-4 rounded-lg border border-[#DCE0E6] bg-white p-4">
                <span className="shrink-0 rounded bg-[#141923] px-2.5 py-1 text-xs font-semibold text-white">
                  21
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#141923]">
                    Primary claim or observation
                  </div>
                  <div className="mt-0.5 text-xs text-[#526075]">
                    Starts a new line of inquiry in the drawer.
                  </div>
                </div>
              </div>

              <div className="ml-6 flex items-start gap-4 rounded-lg border border-[#C88A1E] bg-[#C88A1E]/10 p-4">
                <span className="shrink-0 rounded bg-[#C88A1E] px-2.5 py-1 text-xs font-semibold text-[#141923]">
                  21a
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#141923]">
                    Direct counter-example or qualification
                  </div>
                  <div className="mt-0.5 text-xs text-[#526075]">
                    Inserted immediately behind Slip 21 without disturbing Slip 22.
                  </div>
                </div>
              </div>

              <div className="ml-12 flex items-start gap-4 rounded-lg border border-[#DCE0E6] bg-white p-4">
                <span className="shrink-0 rounded bg-[#141923] px-2.5 py-1 text-xs font-semibold text-white">
                  21a1
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#141923]">
                    Empirical study supporting the qualification
                  </div>
                  <div className="mt-0.5 text-xs text-[#526075]">
                    Branches as deeply as your research requires while keeping its
                    exact provenance in the address.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-[#DCE0E6] bg-white p-4">
                <span className="shrink-0 rounded bg-[#526075] px-2.5 py-1 text-xs font-semibold text-white">
                  22
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#141923]">
                    Next sequential thought on the original theme
                  </div>
                  <div className="mt-0.5 text-xs text-[#526075]">
                    Picks up the main thread right where Slip 21 left off.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plain-text Longevity & Keyboard Workflow */}
        <section
          id="storage"
          className="mt-20 rounded-xl border border-[#B8C0CC] bg-[#F7F8FA] p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#141923] leading-snug">
                Built to remain readable forty years from now
              </h2>
              <p className="mt-3 text-base leading-[1.65] text-[#526075]">
                A second brain is only useful if it survives software eras. Marrow
                stores every card as an individual UTF-8 Markdown file on your
                local drive. There is no proprietary database, no mandatory cloud
                account, and no lock-in.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[#141923]">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#C88A1E]" />
                  <span>
                    Instant offline search across 100,000+ slips in under 8
                    milliseconds
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#C88A1E]" />
                  <span>
                    Works seamlessly with Git, Syncthing, iCloud Drive, or rsync
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#C88A1E]" />
                  <span>
                    Automatic BibTeX citation keys and pandoc manuscript export
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[#B8C0CC] bg-[#141923] p-6 text-[#F7F8FA] font-mono text-xs leading-relaxed">
              <div className="border-b border-white/15 pb-2 mb-3 text-[#8FA6C9] flex justify-between">
                <span>~/slipbox/14a-slack-as-epistemic-buffer.md</span>
                <span>UTF-8</span>
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap text-[#DCE0E6]">
{`---
address: 14a
title: Slack acts as an epistemic buffer, not wasted capacity
created: 2025-11-22
parent: [[14]]
branches:
  - [[14a1]]
  - [[14a2]]
---

In biological and civic networks, reserve capacity gives
neighboring nodes time to detect overload and reroute
traffic before thresholds are breached.

See also [[27b1]] on decentralized routing under stress.`}
              </pre>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          id="get-marrow"
          className="mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#B8C0CC] pt-12"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#141923]">
              Start filing permanent notes on your machine
            </h2>
            <p className="mt-2 text-base text-[#526075]">
              Point Marrow at any existing folder of Markdown files or open a
              fresh slipbox in ten seconds.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#slip-stack"
              className="rounded-md bg-[#141923] px-5 py-3 text-sm font-medium text-[#F7F8FA] hover:bg-[#2A3346] transition-colors"
            >
              Download for macOS and Linux
            </a>
            <button
              type="button"
              onClick={() => {
                handleTrailSwitch("ecology");
                window.scrollTo({ top: 180, behavior: "smooth" });
              }}
              className="rounded-md border border-[#526075] bg-[#F7F8FA] px-5 py-3 text-sm font-medium text-[#141923] hover:bg-white transition-colors"
            >
              Test another drawer chain
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
