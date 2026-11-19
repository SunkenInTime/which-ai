"use client";

import { useMemo, useState } from "react";

interface IndexCard {
  id: string;
  tab: "Reading" | "Field notes" | "Drafts" | "Quotes" | "Questions";
  title: string;
  date: string;
  body: string;
  source: string;
  relatedIds: string[];
}

const INITIAL_CARDS: IndexCard[] = [
  {
    id: "reading-1",
    tab: "Reading",
    title: "Why small cards beat long documents",
    date: "Oct 18, 2025",
    body: "When a note has to fit on one index card, you stop pasting whole chapters and start rewriting the claim in your own words. That single constraint turns passive highlights into actual thinking.",
    source: "From notes on Sönke Ahrens",
    relatedIds: ["drafts-1", "questions-1"],
  },
  {
    id: "field-1",
    tab: "Field notes",
    title: "Morning ferry harbor fog",
    date: "Nov 02, 2025",
    body: "Diesel engines carry farther across flat water than across open streets. You hear the horn three seconds before the white bow clears the channel marker.",
    source: "Bainbridge crossing, 6:40 am",
    relatedIds: ["quotes-1", "drafts-1"],
  },
  {
    id: "drafts-1",
    tab: "Drafts",
    title: "Opening paragraph for essay on memory tools",
    date: "Jan 11, 2026",
    body: "Software taught us to store notes the way warehouses store pallets: sealed inside nested folders nobody opens twice. A real second brain works more like a workbench where active pieces stay within reach.",
    source: "Working draft, revision 3",
    relatedIds: ["reading-1", "quotes-1"],
  },
  {
    id: "quotes-1",
    tab: "Quotes",
    title: "Dieter Rams on quiet design",
    date: "Feb 26, 2025",
    body: "Indifference toward people and the reality in which they live is actually the one and only cardinal sin in design. Good tools recede while you work.",
    source: "Less and More, page 118",
    relatedIds: ["field-1", "questions-1"],
  },
  {
    id: "questions-1",
    tab: "Questions",
    title: "How many links make a note useful?",
    date: "Apr 04, 2026",
    body: "Linking every noun creates visual spaghetti. Two or three deliberate bridges to contrasting subjects seem to spark far more ideas than twenty automatic keyword matches.",
    source: "Open question for weekend review",
    relatedIds: ["reading-1", "drafts-1"],
  },
];

const ARCHIVE_SLIPS = [
  {
    id: "s1",
    tab: "Reading",
    title: "Spaced repetition without flashcards",
    excerpt:
      "Surfacing an old note while drafting a new one refreshes memory naturally without daily review queues.",
    date: "Sep 2025",
  },
  {
    id: "s2",
    tab: "Field notes",
    title: "Library reading lamps in Stockholm",
    excerpt:
      "Green glass shades focus light onto the page while keeping the surrounding room calm enough to think.",
    date: "Nov 2025",
  },
  {
    id: "s3",
    tab: "Craft",
    title: "Pour-over bloom timing at high altitude",
    excerpt:
      "Water boils at 94 degrees in Denver, so extend the initial bloom by ten seconds for balanced extraction.",
    date: "Jan 2026",
  },
  {
    id: "s4",
    tab: "Drafts",
    title: "Why folders collapse after three hundred notes",
    excerpt:
      "Every interesting note belongs in two categories at once. Forcing one folder forces you to forget where it lives.",
    date: "Feb 2026",
  },
  {
    id: "s5",
    tab: "Questions",
    title: "What makes software feel durable?",
    excerpt:
      "Plain files on disk, predictable keyboard shortcuts, and zero features that require a remote server to open.",
    date: "Mar 2026",
  },
  {
    id: "s6",
    tab: "Quotes",
    title: "Richard Feynman on his notebooks",
    excerpt:
      "No, these aren't a record of my thinking process. They actually are my thinking process; I did the work on the paper.",
    date: "Aug 2025",
  },
];

const TABS: IndexCard["tab"][] = [
  "Reading",
  "Field notes",
  "Drafts",
  "Quotes",
  "Questions",
];

export function IterationThree() {
  const [cards, setCards] = useState<IndexCard[]>(INITIAL_CARDS);
  const [activeCardId, setActiveCardId] = useState<string>("reading-1");
  const [addingSlip, setAddingSlip] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newTab, setNewTab] = useState<IndexCard["tab"]>("Questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const activeCard =
    cards.find((card) => card.id === activeCardId) ?? cards[0];

  const filteredSlips = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ARCHIVE_SLIPS;
    return ARCHIVE_SLIPS.filter((slip) =>
      `${slip.title} ${slip.excerpt} ${slip.tab} ${slip.date}`
        .toLowerCase()
        .includes(q)
    );
  }, [searchQuery]);

  function handleSelectTab(tab: IndexCard["tab"]) {
    setAddingSlip(false);
    const match = cards.find((c) => c.tab === tab);
    if (match) {
      setActiveCardId(match.id);
    }
  }

  function handleAddCard(event: React.FormEvent) {
    event.preventDefault();
    const title = newTitle.trim();
    const body = newBody.trim();
    if (!title || !body) return;
    const created: IndexCard = {
      id: `slip-${Date.now()}`,
      tab: newTab,
      title,
      date: "Added today",
      body,
      source: "Created in live drawer",
      relatedIds: ["reading-1"],
    };
    setCards((prev) => [created, ...prev]);
    setActiveCardId(created.id);
    setNewTitle("");
    setNewBody("");
    setAddingSlip(false);
  }

  return (
    <div
      className="min-h-screen bg-[#E4E2DC] text-[#161E2E]"
      style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}
    >
      {/* Top navigation */}
      <header className="border-b border-[#C8C5BC] bg-[#E4E2DC]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <a href="#top" className="inline-flex items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-[#161E2E] bg-[#EBC96E] text-sm font-bold text-[#161E2E]">
              C
            </span>
            <span className="text-xl font-semibold tracking-[-0.03em] text-[#161E2E]">
              Cairn
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-[#4A5468] md:flex">
            <a href="#workflow" className="hover:text-[#161E2E] transition-colors">
              How it works
            </a>
            <a href="#finder" className="hover:text-[#161E2E] transition-colors">
              Instant recall
            </a>
            <a href="#pricing" className="hover:text-[#161E2E] transition-colors">
              Pricing
            </a>
          </nav>

          <button
            type="button"
            onClick={() =>
              setDownloadNotice(
                "Cairn desktop installer queued for macOS, Windows, and Linux."
              )
            }
            className="rounded-sm bg-[#1F44A8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#173585] cursor-pointer"
          >
            Download Cairn
          </button>
        </div>
      </header>

      {downloadNotice && (
        <div
          role="status"
          className="border-b border-[#161E2E] bg-[#EBC96E] px-6 py-2.5 text-sm text-[#161E2E]"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <span className="font-medium">{downloadNotice}</span>
            <button
              type="button"
              onClick={() => setDownloadNotice(null)}
              className="text-xs underline underline-offset-4 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <main id="top">
        {/* Hero: Asymmetric Swiss layout with tactile manila-tab index drawer */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 sm:px-8 lg:pb-24 lg:pt-20">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left typographic authority */}
            <div className="lg:col-span-5">
              <h1 className="text-[2.75rem] leading-[1.03] font-semibold tracking-[-0.035em] text-[#161E2E] sm:text-[3.75rem]">
                Think on cards that link themselves.
              </h1>

              <p className="mt-6 max-w-[44ch] text-lg leading-[1.6] text-[#354055]">
                Cairn gives you the physical clarity of a wooden slip-box with
                the speed of local software. Capture short ideas, connect them
                across topics, and lay them out whenever you sit down to write.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setDownloadNotice(
                      "Prepared Cairn 2.4 for macOS. Local folder storage, zero account required."
                    )
                  }
                  className="rounded-sm bg-[#1F44A8] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#173585] cursor-pointer"
                >
                  Download for desktop
                </button>
                <a
                  href="#finder"
                  className="rounded-sm border border-[#161E2E] bg-[#E4E2DC] px-5 py-3 text-sm font-medium text-[#161E2E] transition-colors hover:bg-white"
                >
                  Try card search
                </a>
              </div>

              <div className="mt-8 border-t border-[#C5C2B8] pt-5 text-sm text-[#4A5468]">
                Free for unlimited local cards on macOS, Windows, and Linux.
                Stored as standard Markdown files in any folder you choose.
              </div>
            </div>

            {/* Right Signature Bold Element: Physical Manila-Tabbed 3x5 Index Card Drawer */}
            <div className="min-w-0 lg:col-span-7">
              <div className="relative">
                {/* Physical protruding manila folder tabs */}
                <div
                  role="tablist"
                  aria-label="Index card tabs"
                  className="flex flex-nowrap items-end gap-1 overflow-x-auto pl-2"
                >
                  {TABS.map((tab) => {
                    const isSelected = !addingSlip && activeCard.tab === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => handleSelectTab(tab)}
                        className={`shrink-0 whitespace-nowrap rounded-t-md border border-b-0 px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? "relative z-10 -mb-px border-[#161E2E] bg-white text-[#161E2E] pb-2.5"
                            : "border-[#BFA869] bg-[#EBC96E] text-[#161E2E] hover:bg-[#F1D484]"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setAddingSlip((v) => !v)}
                    className={`ml-auto shrink-0 whitespace-nowrap rounded-t-md border border-b-0 px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                      addingSlip
                        ? "relative z-10 -mb-px border-[#161E2E] bg-white text-[#1F44A8] pb-2.5"
                        : "border-[#B9B6AC] bg-[#D6D3CB] text-[#161E2E] hover:bg-[#ECEAE4]"
                    }`}
                  >
                    {addingSlip ? "Cancel slip" : "+ Add a slip"}
                  </button>
                </div>

                {/* Main crisp ruled index card */}
                <div className="relative z-10 rounded-b-md rounded-tr-md border border-[#161E2E] bg-white">
                  {/* Classic red-pink top ruling line of an index card, shifted to archival cobalt-slate */}
                  <div className="flex items-center justify-between border-b-2 border-[#1F44A8]/30 px-6 py-3.5">
                    <span className="text-xs font-medium text-[#1F44A8]">
                      {addingSlip ? "New slip" : activeCard.tab}
                    </span>
                    <span className="text-xs text-[#4A5468]">
                      {addingSlip ? "Saved straight to this stack" : activeCard.date}
                    </span>
                  </div>

                  {addingSlip ? (
                    <form onSubmit={handleAddCard} className="space-y-4 p-6 sm:p-7">
                      <div>
                        <label
                          htmlFor="slip-tab"
                          className="block text-xs font-medium text-[#4A5468]"
                        >
                          Drawer tab
                        </label>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {TABS.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setNewTab(t)}
                              className={`rounded-sm border px-2.5 py-1 text-xs cursor-pointer ${
                                newTab === t
                                  ? "border-[#161E2E] bg-[#EBC96E] font-medium text-[#161E2E]"
                                  : "border-[#D4D2CA] bg-[#F7F6F3] text-[#4A5468]"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="slip-title"
                          className="block text-xs font-medium text-[#4A5468]"
                        >
                          Card headline
                        </label>
                        <input
                          id="slip-title"
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="One concise thought..."
                          required
                          className="mt-1 w-full rounded-sm border border-[#B9B6AC] px-3 py-2 text-sm text-[#161E2E]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="slip-body"
                          className="block text-xs font-medium text-[#4A5468]"
                        >
                          Note
                        </label>
                        <textarea
                          id="slip-body"
                          rows={3}
                          value={newBody}
                          onChange={(e) => setNewBody(e.target.value)}
                          placeholder="Write two or three plain sentences in your own words."
                          required
                          className="mt-1 w-full rounded-sm border border-[#B9B6AC] px-3 py-2 text-sm text-[#161E2E]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="rounded-sm bg-[#1F44A8] px-4 py-2 text-xs font-medium text-white hover:bg-[#173585] cursor-pointer"
                      >
                        File card in drawer
                      </button>
                    </form>
                  ) : (
                    <div
                      className="p-6 sm:p-8"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, #EEF1F6 31px, #EEF1F6 32px)",
                        backgroundPosition: "0 18px",
                      }}
                    >
                      <h2 className="text-2xl leading-snug font-semibold tracking-[-0.02em] text-[#161E2E]">
                        {activeCard.title}
                      </h2>

                      <p className="mt-4 max-w-[54ch] text-[1.03rem] leading-[2rem] text-[#242F42]">
                        {activeCard.body}
                      </p>

                      <div className="mt-6 text-xs text-[#4A5468]">
                        {activeCard.source}
                      </div>

                      <div className="mt-6 border-t border-[#DCE0E8] bg-white pt-4">
                        <div className="text-xs font-medium text-[#4A5468]">
                          Linked slips in this drawer
                        </div>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {activeCard.relatedIds.map((relId) => {
                            const target = cards.find((c) => c.id === relId);
                            if (!target) return null;
                            return (
                              <button
                                key={target.id}
                                type="button"
                                onClick={() => setActiveCardId(target.id)}
                                className="rounded-sm border border-[#C7CEDB] bg-[#F4F6FA] px-3 py-1.5 text-xs font-medium text-[#1F44A8] transition-colors hover:border-[#1F44A8] hover:bg-[#E7EEFC] cursor-pointer"
                              >
                                {target.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Physical stacked index cards peeking cleanly underneath (no generic soft shadow) */}
                <div
                  aria-hidden="true"
                  className="mx-2.5 h-2.5 rounded-b-sm border border-t-0 border-[#9FA29A] bg-[#F7F6F2]"
                />
                <div
                  aria-hidden="true"
                  className="mx-5 h-2 rounded-b-sm border border-t-0 border-[#B2B0A7] bg-[#EFECE5]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Genuine 3-step sequential workflow */}
        <section
          id="workflow"
          className="border-t border-[#C8C5BC] bg-white py-20"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <h2 className="max-w-xl text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-[#161E2E] sm:text-4xl">
              From a pocket note to a clear draft in three habits.
            </h2>

            <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              <li className="border-t-2 border-[#161E2E] pt-5">
                <div className="text-xs font-semibold text-[#1F44A8]">Step 1</div>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#161E2E]">
                  Keep one idea per slip
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4A5468]">
                  Hit Command+N from anywhere and jot down a single claim,
                  measurement, or book passage. Short notes are far easier to
                  recombine later than sprawling 30-page documents.
                </p>
              </li>

              <li className="border-t-2 border-[#161E2E] pt-5">
                <div className="text-xs font-semibold text-[#1F44A8]">Step 2</div>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#161E2E]">
                  Link to what it reminds you of
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4A5468]">
                  Type two brackets to connect your new slip to an older note.
                  Cairn keeps backlinks updated in both directions automatically
                  even if you rename files on disk.
                </p>
              </li>

              <li className="border-t-2 border-[#161E2E] pt-5">
                <div className="text-xs font-semibold text-[#1F44A8]">Step 3</div>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#161E2E]">
                  Spread cards out when drafting
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4A5468]">
                  Pull a trail of linked slips onto a side-by-side table view,
                  arrange their order until the argument clicks, and merge them
                  into one clean Markdown document.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* Section 2: Interactive Live Drawer Search */}
        <section
          id="finder"
          className="border-t border-[#C8C5BC] bg-[#E4E2DC] py-20"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-[#161E2E] sm:text-4xl">
                  Find any card before you finish typing.
                </h2>
                <p className="mt-3 max-w-xl text-base text-[#354055]">
                  Every word in your local folder stays indexed in memory. Try
                  filtering these six sample slips right now.
                </p>
              </div>

              <div className="w-full md:w-80">
                <label htmlFor="slip-search" className="sr-only">
                  Filter sample cards
                </label>
                <input
                  id="slip-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try lamp, folders, coffee, Feynman..."
                  className="w-full rounded-sm border border-[#161E2E] bg-white px-4 py-2.5 text-sm text-[#161E2E] placeholder:text-[#697386]"
                />
              </div>
            </div>

            {filteredSlips.length === 0 ? (
              <div className="mt-8 rounded-sm border border-dashed border-[#8E929B] bg-[#EFECE6] p-8 text-sm text-[#354055]">
                No slips match &ldquo;{searchQuery}&rdquo;. Clear the search box
                or try words like folders, Stockholm, coffee, or durable.
              </div>
            ) : (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSlips.map((slip) => (
                  <article
                    key={slip.id}
                    className="flex flex-col justify-between overflow-hidden rounded-sm border border-[#161E2E]/30 bg-white"
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-[#1F44A8]/25 px-4 py-2.5">
                      <span className="inline-block rounded-sm bg-[#EBC96E] px-2 py-0.5 text-xs font-medium text-[#161E2E]">
                        {slip.tab}
                      </span>
                      <span className="text-xs text-[#596377]">
                        {slip.date}
                      </span>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-[#161E2E]">
                        {slip.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#424D61]">
                        {slip.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 3: High-contrast archival cabinet closing & pricing */}
        <section
          id="pricing"
          className="border-t border-[#161E2E] bg-[#161E2E] py-20 text-white"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-4xl">
                  Own the software. Own the files.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#BCC4D4]">
                  Use Cairn free on your desktop forever. Add encrypted sync
                  only if you want the same slip-box on your phone and laptop.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
                <div className="flex flex-col justify-between rounded-sm border border-white/20 p-6">
                  <div>
                    <div className="text-sm text-[#EBC96E]">Desktop app</div>
                    <div className="mt-2 text-3xl font-semibold">$0 forever</div>
                    <p className="mt-3 text-sm leading-relaxed text-[#C8D0DF]">
                      Unlimited cards, backlinks, table layout, offline instant
                      search, and plain Markdown storage in your own folder.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setDownloadNotice("Downloading Cairn Desktop (Free forever).")
                    }
                    className="mt-6 w-full rounded-sm border border-white/40 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#161E2E] cursor-pointer"
                  >
                    Download desktop app
                  </button>
                </div>

                <div className="flex flex-col justify-between rounded-sm bg-[#EBC96E] p-6 text-[#161E2E]">
                  <div>
                    <div className="text-sm font-medium">Encrypted sync</div>
                    <div className="mt-2 text-3xl font-semibold">$6 a month</div>
                    <p className="mt-3 text-sm leading-relaxed text-[#252E42]">
                      End-to-end encrypted sync for Mac, Windows, Linux, iPhone,
                      and Android, plus 365-day card version history.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setDownloadNotice(
                        "Sync includes a 30-day free trial inside the desktop app."
                      )
                    }
                    className="mt-6 w-full rounded-sm bg-[#161E2E] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1F44A8] cursor-pointer"
                  >
                    Start 30-day sync trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#161E2E] py-8 pb-20 text-sm text-[#A5B0C4]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 sm:flex-row sm:items-center sm:px-8">
          <p>Cairn. Plain-text index cards for independent thinkers.</p>
          <div className="flex gap-6">
            <a href="#workflow" className="hover:text-white">
              Manual
            </a>
            <a href="#finder" className="hover:text-white">
              Import guide
            </a>
            <a href="#pricing" className="hover:text-white">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
