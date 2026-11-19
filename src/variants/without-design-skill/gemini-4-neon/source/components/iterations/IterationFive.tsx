"use client";

import { useState } from "react";

interface StudioCard {
  id: string;
  tag: string;
  title: string;
  body: string;
  bg: string;
  tilt: string;
  links: string;
}

const INITIAL_CARDS: StudioCard[] = [
  {
    id: "sticky-1",
    tag: "QUICK SPARK",
    title: "Spatial memory beats nested folders",
    body: "You remember exactly where on a table you left a book even when you forget its title. Why doesn’t software work the same way?",
    bg: "bg-[#FEF08A]",
    tilt: "-rotate-1",
    links: "Linked to 3 cards",
  },
  {
    id: "clip-2",
    tag: "WEB CLIPPING",
    title: "Bret Victor — Magic Ink (2006)",
    body: "“Information software should reveal patterns at a glance, not bury them behind nested menus and tiny search boxes.”",
    bg: "bg-[#DBEAFE]",
    tilt: "rotate-1",
    links: "Linked to 4 cards",
  },
  {
    id: "draft-3",
    tag: "ESSAY DRAFT",
    title: "Why Creative People Need Messy Desks",
    body: "Section 1 pulls [[Spatial memory]] + [[Magic Ink]] straight into a clean Markdown outline. Zero blank-page panic.",
    bg: "bg-white",
    tilt: "rotate-0",
    links: "Ready to export",
  },
  {
    id: "voice-4",
    tag: "VOICE MEMO · 0:34",
    title: "Podcast idea: Tools that spark joy",
    body: "Interview indie toolmakers building local-first apps with strong opinions, tactile feedback, and fast keyboard chords.",
    bg: "bg-[#A7F3D0]",
    tilt: "-rotate-1",
    links: "Linked to 2 cards",
  },
];

const EXTRA_COLORS = ["bg-[#FECDD3]", "bg-[#FEF08A]", "bg-[#A7F3D0]", "bg-[#DBEAFE]"];

export function IterationFive() {
  const [cards, setCards] = useState<StudioCard[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string>("draft-3");
  const [showThreads, setShowThreads] = useState<boolean>(true);
  const [newThought, setNewThought] = useState<string>("");
  const [chaosMode, setChaosMode] = useState<boolean>(false);

  const selectedCard =
    cards.find((c) => c.id === selectedCardId) ?? cards[0];

  function handleAddCard(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = newThought.trim();
    if (!trimmed) return;
    const id = `custom-${Date.now()}`;
    const color = EXTRA_COLORS[cards.length % EXTRA_COLORS.length];
    const nextCard: StudioCard = {
      id,
      tag: "PINNED JUST NOW",
      title: trimmed.length > 42 ? `${trimmed.slice(0, 42)}…` : trimmed,
      body: trimmed,
      bg: color,
      tilt: cards.length % 2 === 0 ? "rotate-1" : "-rotate-1",
      links: "Auto-linked to [[Spatial memory]]",
    };
    setCards((prev) => [nextCard, ...prev.slice(0, 3)]);
    setSelectedCardId(id);
    setNewThought("");
  }

  return (
    <div className="min-h-screen bg-studio-dots text-[#18181B] font-neo selection:bg-[#FDE047] selection:text-[#18181B]">
      {/* Punchy Framed Studio Navbar */}
      <header className="sticky top-0 z-30 border-b-2 border-[#18181B] bg-[#FFFDF5]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#18181B] bg-[#FDE047] font-studio text-lg font-extrabold shadow-[3px_3px_0_#18181B]">
              N
            </span>
            <span className="font-studio text-2xl font-extrabold tracking-tight">
              Noema
            </span>
            <span className="hidden -rotate-2 rounded-md border-2 border-[#18181B] bg-[#FB7185] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white sm:inline-block">
              Studio 5.0
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-[14px] font-bold md:flex">
            <a href="#canvas" className="hover:text-[#2563EB]">
              Canvas
            </a>
            <a href="#toolkit" className="hover:text-[#2563EB]">
              Toolkit
            </a>
            <a href="#compare" className="hover:text-[#2563EB]">
              Chaos → Flow
            </a>
            <a href="#passes" className="hover:text-[#2563EB]">
              Pricing
            </a>
          </nav>

          <a
            href="#passes"
            className="rounded-xl border-2 border-[#18181B] bg-[#2563EB] px-4 py-2 text-[13.5px] font-bold text-white shadow-[3px_3px_0_#18181B] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B]"
          >
            Get Free App →
          </a>
        </div>
      </header>

      {/* Hero Headline Block */}
      <section id="top" className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-6 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#18181B] bg-[#A7F3D0] px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider shadow-[3px_3px_0_#18181B]">
              <span>✦</span>
              <span>The Second Brain That Feels Like a Real Desk</span>
            </div>

            <h1 className="mt-6 font-studio text-[3.2rem] font-extrabold leading-[0.95] tracking-[-0.035em] text-[#18181B] sm:text-[4.6rem] lg:text-[5.25rem]">
              Your brain,{" "}
              <span className="inline-block -rotate-1 rounded-2xl border-2 border-[#18181B] bg-[#FDE047] px-3.5 py-0.5 shadow-[5px_5px_0_#18181B]">
                unfolded.
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-[16.5px] font-medium leading-[1.65] text-[#3F3F46]">
              Pin half-baked sparks, clip articles, draw threads between ideas, and
              turn messy curiosity into sharp finished essays—all saved locally as
              plain Markdown.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#passes"
                className="rounded-xl border-2 border-[#18181B] bg-[#18181B] px-5 py-3 text-[14px] font-bold text-[#FFFDF5] shadow-[4px_4px_0_#2563EB] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Download for Free
              </a>
              <a
                href="#canvas"
                className="rounded-xl border-2 border-[#18181B] bg-white px-5 py-3 text-[14px] font-bold text-[#18181B] shadow-[4px_4px_0_#18181B] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Play with Desk ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tactile Spatial Desk */}
      <section id="canvas" className="mx-auto max-w-6xl px-5 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl border-2 border-[#18181B] bg-white shadow-[8px_8px_0_#18181B]">
          {/* Desk Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#18181B] bg-[#F4F2EA] px-5 py-3.5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-lg border-2 border-[#18181B] bg-[#2563EB] px-2.5 py-1 font-mono text-[11px] font-bold text-white">
                DESK // SECOND BRAIN
              </span>
              <button
                type="button"
                onClick={() => setShowThreads((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-lg border-2 border-[#18181B] px-3 py-1 font-mono text-[11px] font-bold transition-colors cursor-pointer ${
                  showThreads
                    ? "bg-[#FDE047] text-[#18181B]"
                    : "bg-white text-[#52525B]"
                }`}
              >
                <span>{showThreads ? "●" : "○"}</span>
                <span>Synaptic Threads: {showThreads ? "ON" : "OFF"}</span>
              </button>
            </div>

            {/* Interactive Pin-a-Thought Form */}
            <form
              onSubmit={handleAddCard}
              className="flex w-full items-center gap-2 sm:w-auto"
            >
              <input
                type="text"
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                placeholder="Type a quick thought to pin..."
                aria-label="Add a quick note to the spatial canvas"
                className="w-full rounded-lg border-2 border-[#18181B] bg-white px-3 py-1.5 text-[13px] font-medium placeholder:text-[#71717A] focus:outline-none sm:w-64"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg border-2 border-[#18181B] bg-[#34D399] px-3.5 py-1.5 font-mono text-[11.5px] font-bold text-[#18181B] shadow-[2px_2px_0_#18181B] transition-transform active:translate-y-0.5 cursor-pointer"
              >
                + Pin Card
              </button>
            </form>
          </div>

          {/* Interactive Pinned Board Area */}
          <div className="relative bg-studio-dots p-6 sm:p-9">
            {/* Decorative Synaptic SVG Threads */}
            {showThreads && (
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
                preserveAspectRatio="none"
                viewBox="0 0 1000 420"
              >
                <path
                  d="M 240 130 C 380 80, 460 220, 560 150"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                />
                <path
                  d="M 260 290 C 420 330, 520 190, 740 240"
                  fill="none"
                  stroke="#FB7185"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                />
                <path
                  d="M 520 130 C 610 180, 680 120, 790 140"
                  fill="none"
                  stroke="#18181B"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  strokeOpacity="0.45"
                />
              </svg>
            )}

            <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card) => {
                const isSelected = card.id === selectedCard.id;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelectedCardId(card.id)}
                    className={`group flex flex-col justify-between rounded-2xl border-2 border-[#18181B] ${card.bg} ${card.tilt} p-5 text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "rotate-0 -translate-y-1 shadow-[7px_7px_0_#2563EB] ring-2 ring-[#2563EB]"
                        : "shadow-[4px_4px_0_#18181B] hover:rotate-0 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#18181B]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-md border border-[#18181B] bg-white/90 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider">
                          {card.tag}
                        </span>
                        <span
                          className={`h-3 w-3 rounded-full border-2 border-[#18181B] ${
                            isSelected ? "bg-[#2563EB]" : "bg-[#FB7185]"
                          }`}
                        />
                      </div>

                      <h2 className="mt-4 font-studio text-lg font-extrabold leading-snug text-[#18181B]">
                        {card.title}
                      </h2>

                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#27272A]">
                        {card.body}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#18181B]/20 pt-3 font-mono text-[10.5px] font-bold text-[#18181B]">
                      <span>{card.links}</span>
                      <span>↗</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Card Bottom Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#18181B] bg-[#18181B] px-5 py-3 text-[#FFFDF5]">
            <div className="flex items-center gap-3 font-mono text-[11.5px]">
              <span className="rounded bg-[#FDE047] px-2 py-0.5 font-bold text-[#18181B]">
                ACTIVE CARD
              </span>
              <span className="font-semibold">{selectedCard.title}</span>
            </div>
            <span className="font-mono text-[11px] text-[#A7F3D0]">
              {selectedCard.links} · Stored locally as plain .md
            </span>
          </div>
        </div>
      </section>

      {/* Chunky 3-Card Toolkit Grid */}
      <section id="toolkit" className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-md border-2 border-[#18181B] bg-[#FECDD3] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase">
              Studio Toolkit
            </span>
            <h2 className="mt-3 font-studio text-4xl font-extrabold tracking-tight sm:text-5xl">
              Built for messy thinkers who ship.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] font-medium text-[#52525B]">
            Fast enough for a shower thought. Structured enough to write your next
            book or product launch.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              badge: "01 · CAPTURE",
              color: "bg-[#FEF08A]",
              title: "Dump ideas in 0.3 seconds",
              copy: "Global shortcut, voice-to-note, screenshot clipper, and Kindle highlights. Toss raw ideas onto your board now; sort them never.",
            },
            {
              badge: "02 · CONNECT",
              color: "bg-[#DBEAFE]",
              title: "Snap thoughts into threads",
              copy: "Draw visual lines on your spatial board or type [[wikilinks]] in Markdown—both views stay 100% synced in real time.",
            },
            {
              badge: "03 · RESURFACE",
              color: "bg-[#A7F3D0]",
              title: "Instant on-device recall",
              copy: "Forget what you named a note? Search by vibe or concept locally on your laptop and watch forgotten cards jump back to the desk.",
            },
          ].map((tool) => (
            <div
              key={tool.badge}
              className="rounded-3xl border-2 border-[#18181B] bg-white p-7 shadow-[6px_6px_0_#18181B] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#18181B]"
            >
              <span
                className={`inline-block rounded-lg border-2 border-[#18181B] ${tool.color} px-3 py-1 font-mono text-[11px] font-bold`}
              >
                {tool.badge}
              </span>
              <h3 className="mt-6 font-studio text-2xl font-extrabold leading-tight">
                {tool.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#3F3F46]">
                {tool.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Chaos vs Flow Toggle Section */}
      <section id="compare" className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div className="rounded-3xl border-2 border-[#18181B] bg-[#2563EB] p-7 text-white shadow-[8px_8px_0_#18181B] sm:p-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="rounded-md border-2 border-[#18181B] bg-[#FDE047] px-2.5 py-1 font-mono text-[11px] font-bold uppercase text-[#18181B]">
                Flip the Switch
              </span>
              <h2 className="mt-4 font-studio text-3xl font-extrabold tracking-tight sm:text-5xl">
                {chaosMode
                  ? "Before Noema: 47 tabs & lost stickies."
                  : "With Noema: One calm, linked brain."}
              </h2>
            </div>

            <div className="inline-flex shrink-0 self-start rounded-2xl border-2 border-[#18181B] bg-[#FFFDF5] p-1.5 shadow-[4px_4px_0_#18181B] md:self-auto">
              <button
                type="button"
                onClick={() => setChaosMode(true)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 font-mono text-[12px] font-bold transition-colors cursor-pointer ${
                  chaosMode
                    ? "bg-[#FB7185] text-white"
                    : "text-[#18181B] hover:bg-zinc-100"
                }`}
              >
                Chaos Mode
              </button>
              <button
                type="button"
                onClick={() => setChaosMode(false)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 font-mono text-[12px] font-bold transition-colors cursor-pointer ${
                  !chaosMode
                    ? "bg-[#18181B] text-[#FDE047]"
                    : "text-[#18181B] hover:bg-zinc-100"
                }`}
              >
                Noema Brain
              </button>
            </div>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {(chaosMode
              ? [
                  {
                    label: "BROWSER TABS",
                    stat: "47 open",
                    note: "“I’ll definitely read this 4,000-word essay later.” (Narrator: they didn’t.)",
                    bg: "bg-[#FECDD3]",
                  },
                  {
                    label: "NOTES APP",
                    stat: "Untitled (84)",
                    note: "Half-finished paragraphs scattered across Apple Notes, Slack DMs to yourself, and Notion.",
                    bg: "bg-[#FEF08A]",
                  },
                  {
                    label: "WRITING DAY",
                    stat: "Blank page",
                    note: "You know you read the perfect quote six months ago, yet you spend 40 minutes hunting for it.",
                    bg: "bg-white",
                  },
                ]
              : [
                  {
                    label: "INSTANT CAPTURE",
                    stat: "1 inbox",
                    note: "Web clips, voice notes, and quotes stream into one fast daily stream with zero friction.",
                    bg: "bg-[#A7F3D0]",
                  },
                  {
                    label: "LINKED CLUSTERS",
                    stat: "Auto-threaded",
                    note: "Related ideas surface right next to what you’re drafting—both visually and via [[wikilinks]].",
                    bg: "bg-[#FEF08A]",
                  },
                  {
                    label: "SHIPPING WORK",
                    stat: "3× faster",
                    note: "Drag 6 linked studio cards into Manuscript View and publish with citations already attached.",
                    bg: "bg-white",
                  },
                ]
            ).map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border-2 border-[#18181B] ${item.bg} p-6 text-[#18181B] shadow-[4px_4px_0_#18181B]`}
              >
                <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#52525B]">
                  {item.label}
                </div>
                <div className="mt-2 font-studio text-3xl font-extrabold">
                  {item.stat}
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-[#27272A]">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Pinboard Testimonials */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <h2 className="text-center font-studio text-3xl font-extrabold tracking-tight sm:text-4xl">
          Pinned by designers, indie founders &amp; writers
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "Finally a second brain that doesn’t feel like filing taxes. Pinning cards on the board and toggling straight to Markdown is pure magic.",
              author: "Toby Alvarez",
              role: "Product Designer & Indie Maker",
              tape: "bg-[#FDE047]",
              tilt: "-rotate-1",
            },
            {
              quote:
                "I planned an entire YouTube documentary series on one Noema canvas. Having all my research clips visually threaded saved weeks.",
              author: "Nadia Okafor",
              role: "Video Essayist · 420k subscribers",
              tape: "bg-[#34D399]",
              tilt: "rotate-1",
            },
            {
              quote:
                "Fast, local-first, and actually fun to open every morning. My team ditched three bloated wiki tools after trying Studio vaults.",
              author: "Samir Patel",
              role: "Co-founder, Signal Craft",
              tape: "bg-[#FB7185]",
              tilt: "-rotate-1",
            },
          ].map((item) => (
            <figure
              key={item.author}
              className={`relative rounded-2xl border-2 border-[#18181B] bg-white p-7 shadow-[5px_5px_0_#18181B] ${item.tilt}`}
            >
              <span
                aria-hidden="true"
                className={`absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2 rounded-sm border-2 border-[#18181B] ${item.tape}`}
              />
              <blockquote className="mt-2 text-[15.5px] font-medium leading-[1.68] text-[#18181B]">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t-2 border-dashed border-[#18181B]/20 pt-4">
                <div className="font-studio text-[15px] font-extrabold">
                  {item.author}
                </div>
                <div className="font-mono text-[11px] text-[#52525B]">
                  {item.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Playful Bold Studio Passes (Pricing) */}
      <section id="passes" className="mx-auto max-w-6xl px-5 py-16 pb-24 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-md border-2 border-[#18181B] bg-[#FDE047] px-3 py-1 font-mono text-[11px] font-bold uppercase shadow-[3px_3px_0_#18181B]">
            Studio Passes
          </span>
          <h2 className="mt-4 font-studio text-4xl font-extrabold tracking-tight sm:text-5xl">
            Start free. Upgrade when your desk grows.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Sketchbook",
              price: "$0",
              cadence: "forever",
              bg: "bg-white",
              badge: "LOCAL FREE",
              perks: [
                "Unlimited spatial desks & Markdown notes",
                "Visual threads + [[wikilink]] sync",
                "Offline semantic search on your laptop",
                "Plain .md export anytime",
              ],
              btnBg: "bg-[#18181B] text-white",
              cta: "Download Free",
            },
            {
              name: "Pro Thinker",
              price: "$10",
              cadence: "/ month",
              bg: "bg-[#FEF08A]",
              badge: "MOST LOVED",
              perks: [
                "Everything in Sketchbook",
                "Encrypted sync across Mac, Linux & iOS",
                "Instant voice-note pinning on mobile",
                "Kindle, YouTube & PDF auto-clipper",
              ],
              btnBg: "bg-[#2563EB] text-white",
              cta: "Start 14-Day Trial",
            },
            {
              name: "Team Workshop",
              price: "$20",
              cadence: "/ seat / mo",
              bg: "bg-[#A7F3D0]",
              badge: "MULTIPLAYER",
              perks: [
                "Everything in Pro Thinker",
                "Live multiplayer research canvases",
                "Publish interactive boards to the web",
                "Priority founder chat support",
              ],
              btnBg: "bg-[#18181B] text-white",
              cta: "Launch Team Desk",
            },
          ].map((pass) => (
            <div
              key={pass.name}
              className={`flex flex-col justify-between rounded-3xl border-2 border-[#18181B] ${pass.bg} p-8 shadow-[6px_6px_0_#18181B]`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md border-2 border-[#18181B] bg-white px-2.5 py-0.5 font-mono text-[10px] font-bold">
                    {pass.badge}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-[#52525B]">
                    NO LOCK-IN
                  </span>
                </div>
                <h3 className="mt-5 font-studio text-3xl font-extrabold">
                  {pass.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-studio text-5xl font-extrabold">
                    {pass.price}
                  </span>
                  <span className="font-mono text-[12px] font-bold text-[#52525B]">
                    {pass.cadence}
                  </span>
                </div>

                <ul className="mt-7 space-y-3 border-t-2 border-dashed border-[#18181B]/25 pt-6 text-[14.5px] font-medium">
                  {pass.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                      <span className="font-mono font-bold text-[#2563EB]">✓</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#top"
                className={`mt-8 block rounded-xl border-2 border-[#18181B] ${pass.btnBg} py-3 text-center text-[14px] font-bold shadow-[3px_3px_0_#18181B] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181B]`}
              >
                {pass.cta} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Bold Stamp Footer */}
      <footer className="border-t-2 border-[#18181B] bg-[#18181B] py-12 text-[#FFFDF5]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FDE047] font-studio font-extrabold text-[#18181B]">
              N
            </span>
            <span className="font-studio text-xl font-extrabold">Noema Studio</span>
            <span className="font-mono text-[11px] text-zinc-400">
              · Made for curious minds
            </span>
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-[11.5px] font-bold uppercase text-zinc-300">
            <a href="#canvas" className="hover:text-[#FDE047]">Canvas</a>
            <a href="#toolkit" className="hover:text-[#FDE047]">Toolkit</a>
            <a href="#compare" className="hover:text-[#FDE047]">Chaos → Flow</a>
            <a href="#passes" className="hover:text-[#FDE047]">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
