"use client";

import { useState } from "react";

interface WorkspaceDoc {
  id: string;
  tab: string;
  title: string;
  date: string;
  paragraphs: Array<{
    text: string;
    link?: { label: string; targetId: string };
    after?: string;
  }>;
  backlinks: Array<{
    fromId: string;
    fromTitle: string;
    snippet: string;
  }>;
}

const DOCS: WorkspaceDoc[] = [
  {
    id: "daily",
    tab: "Daily log",
    title: "Tuesday, November 19",
    date: "Updated 09:14",
    paragraphs: [
      {
        text: "Finished rereading Christopher Alexander on quiet rooms and alcoves. Good software should borrow the same rule: ",
        link: { label: "Spatial memory in tools", targetId: "books" },
        after: " beats burying work behind nested menus.",
      },
      {
        text: "Pulled three older paragraphs into ",
        link: { label: "Why small notes travel further", targetId: "draft" },
        after: " before the afternoon review.",
      },
    ],
    backlinks: [
      {
        fromId: "books",
        fromTitle: "Spatial memory in tools",
        snippet: "Referenced during morning review on November 19.",
      },
      {
        fromId: "draft",
        fromTitle: "Why small notes travel further",
        snippet: "Three source passages moved from the daily log.",
      },
    ],
  },
  {
    id: "books",
    tab: "Book notes",
    title: "Spatial memory in tools",
    date: "Created May 08",
    paragraphs: [
      {
        text: "People recall where an object sits on a desk long after they forget its category name. Opening two linked documents side by side mirrors spreading papers on a drafting table.",
      },
      {
        text: "Compare with notes in ",
        link: { label: "Why small notes travel further", targetId: "draft" },
        after: " and this morning's daily log.",
      },
    ],
    backlinks: [
      {
        fromId: "daily",
        fromTitle: "Tuesday, November 19",
        snippet:
          "Good software should borrow the same rule: spatial memory in tools beats nested menus.",
      },
      {
        fromId: "draft",
        fromTitle: "Why small notes travel further",
        snippet:
          "Quoted in section two on drafting tables versus deep folder trees.",
      },
    ],
  },
  {
    id: "draft",
    tab: "Essay draft",
    title: "Why small notes travel further",
    date: "Draft revision 4",
    paragraphs: [
      {
        text: "Long documents lock ideas inside a single occasion. When a note captures one clear observation instead of an entire meeting, you can reuse it across memos, talks, and books.",
      },
      {
        text: "This connects directly to ",
        link: { label: "Spatial memory in tools", targetId: "books" },
        after: " and our running observations from Tuesday's log.",
      },
    ],
    backlinks: [
      {
        fromId: "daily",
        fromTitle: "Tuesday, November 19",
        snippet: "Pulled three older paragraphs into this essay draft.",
      },
      {
        fromId: "books",
        fromTitle: "Spatial memory in tools",
        snippet: "Paired as companion note on working across projects.",
      },
    ],
  },
];

const CAPABILITIES = [
  {
    id: "capture",
    title: "Capture in under two seconds",
    summary:
      "A global shortcut opens a blank entry above any window so a thought never interrupts your current work.",
    metric: "14 ms cold open",
    detailTitle: "Global quick-entry bar",
    detailLines: [
      "Shortcut: Command + Shift + N anywhere on desktop",
      "Saves straight into today's Markdown log",
      "Automatically suggests matching existing note titles as you type",
    ],
  },
  {
    id: "markdown",
    title: "Plain Markdown on your disk",
    summary:
      "Every note is a normal .md file inside a folder you choose. Open your archive in any editor, back it up with Git, and keep it forever.",
    metric: "Zero lock-in",
    detailTitle: "Standard file layout",
    detailLines: [
      "~/Commonplace/2026-11-19.md",
      "~/Commonplace/spatial-memory-in-tools.md",
      "Standard [[wikilinks]] and clean YAML frontmatter only when needed",
    ],
  },
  {
    id: "panes",
    title: "Side-by-side writing panes",
    summary:
      "Keep research notes open beside a fresh draft without juggling floating windows or losing your scroll position.",
    metric: "Up to 4 linked panes",
    detailTitle: "Split drafting table",
    detailLines: [
      "Pin any reference note while writing on the right",
      "Drag a paragraph link directly into your outline",
      "Keyboard navigation moves cleanly between panes without touching the mouse",
    ],
  },
  {
    id: "sync",
    title: "Private encrypted sync",
    summary:
      "Notes stay local by default. Turn on optional sync to mirror changes across desktop, tablet, and phone with zero-knowledge encryption.",
    metric: "End-to-end encrypted",
    detailTitle: "Device sync architecture",
    detailLines: [
      "Encrypted on your device before a single byte leaves",
      "Works offline on flights and merges edits cleanly on reconnect",
      "Full version history saved locally for 365 days",
    ],
  },
];

const PLATFORMS = ["macOS", "Windows", "Linux", "iOS"] as const;

export function IterationThree() {
  const [activeDocId, setActiveDocId] = useState<string>("daily");
  const [showBacklinks, setShowBacklinks] = useState<boolean>(true);
  const [scratchInput, setScratchInput] = useState<string>("");
  const [extraLines, setExtraLines] = useState<string[]>([]);
  const [activeCapId, setActiveCapId] = useState<string>("capture");
  const [selectedPlatform, setSelectedPlatform] =
    useState<(typeof PLATFORMS)[number]>("macOS");
  const [downloadAck, setDownloadAck] = useState<boolean>(false);

  const activeDoc = DOCS.find((d) => d.id === activeDocId) ?? DOCS[0];
  const activeCap =
    CAPABILITIES.find((c) => c.id === activeCapId) ?? CAPABILITIES[0];

  function handleAppendLine(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = scratchInput.trim();
    if (!cleaned) return;
    setExtraLines((prev) => [...prev, cleaned]);
    setScratchInput("");
  }

  return (
    <div
      className="min-h-screen bg-[#FFFFFF] text-[#000000]"
      style={{
        fontFamily: "var(--font-schibsted), system-ui, sans-serif",
      }}
    >
      {/* Swiss Precision Header */}
      <header className="border-b border-black/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
          <a
            href="#top"
            className="flex items-center gap-2.5 text-lg font-semibold tracking-[-0.02em] text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C81E1E]"
          >
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 bg-[#C81E1E]"
            />
            <span>Commonplace</span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm text-[#4D4D4D] md:flex"
          >
            <a
              href="#workspace"
              className="transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C81E1E]"
            >
              Workspace
            </a>
            <a
              href="#capabilities"
              className="transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C81E1E]"
            >
              Architecture
            </a>
            <a
              href="#pricing"
              className="transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C81E1E]"
            >
              Pricing
            </a>
          </nav>

          <a
            href="#pricing"
            className="bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#C81E1E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C81E1E]"
          >
            Download
          </a>
        </div>
      </header>

      <main id="top">
        {/* Monumental Typographic Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 lg:px-10 lg:pb-24 lg:pt-24">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-black sm:text-6xl lg:text-7xl">
                A quiet room for long-term thinking.
              </h1>
            </div>

            <div className="lg:col-span-5 lg:pb-1">
              <p className="max-w-[42ch] text-base leading-[1.65] text-[#4D4D4D] sm:text-lg">
                Write in plain Markdown. Link any thought to any other. Own
                every file on your machine without subscriptions holding your
                archive hostage.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#pricing"
                  className="bg-[#C81E1E] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C81E1E]"
                >
                  Download for macOS
                </a>
                <a
                  href="#workspace"
                  className="border border-black px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-[#F3F3F1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C81E1E]"
                >
                  Try the editor below
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Live Workspace */}
          <div
            id="workspace"
            className="mt-14 border border-black bg-[#FFFFFF]"
          >
            {/* Workspace top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/15 bg-[#F3F3F1] px-4 py-2.5 sm:px-5">
              <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label="Sample notes">
                {DOCS.map((doc) => {
                  const isActive = doc.id === activeDoc.id;
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveDocId(doc.id)}
                      className={`px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#C81E1E] ${
                        isActive
                          ? "bg-white text-black shadow-[inset_0_2px_0_0_#C81E1E]"
                          : "text-[#4D4D4D] hover:text-black"
                      }`}
                    >
                      {doc.tab}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowBacklinks((prev) => !prev)}
                className="border border-black/20 bg-white px-3 py-1 text-xs font-medium text-black transition-colors hover:border-black focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#C81E1E]"
              >
                {showBacklinks
                  ? `Hide backlinks (${activeDoc.backlinks.length})`
                  : `Show backlinks (${activeDoc.backlinks.length})`}
              </button>
            </div>

            {/* Split panes */}
            <div className="grid lg:grid-cols-12">
              {/* Editor pane */}
              <div
                className={`p-6 sm:p-10 ${
                  showBacklinks ? "lg:col-span-8 lg:border-r lg:border-black/15" : "lg:col-span-12"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-black/10 pb-4">
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-black sm:text-3xl">
                    {activeDoc.title}
                  </h2>
                  <span className="text-xs text-[#6B6B6B]">
                    {activeDoc.date}
                  </span>
                </div>

                <div className="mt-6 max-w-[60ch] space-y-4 text-base leading-[1.72] text-[#1A1A1A]">
                  {activeDoc.paragraphs.map((p, idx) => (
                    <p key={idx}>
                      {p.text}
                      {p.link && (
                        <button
                          type="button"
                          onClick={() => setActiveDocId(p.link!.targetId)}
                          className="border-b border-[#C81E1E] font-medium text-[#C81E1E] transition-colors hover:bg-[#C81E1E] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#C81E1E]"
                        >
                          {p.link.label}
                        </button>
                      )}
                      {p.after}
                    </p>
                  ))}

                  {activeDoc.id === "daily" &&
                    extraLines.map((line, i) => (
                      <p key={i} className="border-l-2 border-[#C81E1E] pl-3">
                        {line}
                      </p>
                    ))}
                </div>

                {/* Live quick-append form inside Daily log */}
                {activeDoc.id === "daily" && (
                  <form
                    onSubmit={handleAppendLine}
                    className="mt-8 flex flex-col gap-2 border-t border-black/10 pt-5 sm:flex-row"
                  >
                    <label htmlFor="swiss-scratch" className="sr-only">
                      Add a line to today&apos;s log
                    </label>
                    <input
                      id="swiss-scratch"
                      type="text"
                      value={scratchInput}
                      onChange={(e) => setScratchInput(e.target.value)}
                      placeholder="Type a line to add to today's log..."
                      className="flex-1 border border-black/20 bg-[#F3F3F1] px-3.5 py-2.5 text-sm text-black placeholder:text-[#6B6B6B] focus:border-black focus:bg-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#C81E1E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C81E1E]"
                    >
                      Add entry
                    </button>
                  </form>
                )}
              </div>

              {/* Backlinks pane */}
              {showBacklinks && (
                <aside className="border-t border-black/15 bg-[#F8F8F6] p-6 sm:p-8 lg:col-span-4 lg:border-t-0">
                  <h3 className="text-sm font-semibold text-black">
                    Linked mentions ({activeDoc.backlinks.length})
                  </h3>
                  <p className="mt-1 text-xs text-[#6B6B6B]">
                    Select a note to jump straight to it.
                  </p>

                  <ul className="mt-5 space-y-4">
                    {activeDoc.backlinks.map((item) => (
                      <li
                        key={item.fromId}
                        className="border-t border-black/12 pt-4"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveDocId(item.fromId)}
                          className="text-left group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C81E1E]"
                        >
                          <span className="block text-sm font-semibold text-black group-hover:text-[#C81E1E]">
                            {item.fromTitle}
                          </span>
                          <span className="mt-1 block text-xs leading-[1.6] text-[#4D4D4D]">
                            {item.snippet}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </div>
        </section>

        {/* Interactive Capability Matrix */}
        <section
          id="capabilities"
          className="border-t border-black/15 bg-[#F3F3F1] py-20 lg:py-28"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-[-0.025em] text-black sm:text-4xl">
                Designed to stay out of the way of your sentence.
              </h2>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-12">
              <div className="divide-y divide-black/15 border-y border-black/15 lg:col-span-6">
                {CAPABILITIES.map((cap) => {
                  const selected = cap.id === activeCap.id;
                  return (
                    <button
                      key={cap.id}
                      type="button"
                      onClick={() => setActiveCapId(cap.id)}
                      aria-pressed={selected}
                      className={`flex w-full items-start justify-between gap-4 py-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C81E1E] ${
                        selected ? "text-black" : "text-[#4D4D4D] hover:text-black"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <span
                          aria-hidden="true"
                          className={`mt-2 h-2 w-2 shrink-0 ${
                            selected ? "bg-[#C81E1E]" : "bg-black/20"
                          }`}
                        />
                        <div>
                          <span className="block text-lg font-semibold tracking-[-0.015em]">
                            {cap.title}
                          </span>
                          <span className="mt-1.5 block max-w-[44ch] text-sm leading-[1.6] text-[#4D4D4D]">
                            {cap.summary}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Architectural Spec Preview */}
              <div className="flex flex-col justify-between border border-black bg-white p-8 lg:col-span-6">
                <div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-black/12 pb-5">
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-black">
                      {activeCap.detailTitle}
                    </h3>
                    <span className="text-sm font-semibold text-[#C81E1E]">
                      {activeCap.metric}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-4">
                    {activeCap.detailLines.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-3 text-sm leading-[1.65] text-[#1A1A1A]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 bg-black"
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Architectural mini-diagram for the selected capability */}
                  <div className="mt-8 border border-black/15 bg-[#F8F8F6] p-5">
                    {activeCap.id === "capture" && (
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                          <span>Quick entry</span>
                          <span className="border border-black/20 bg-white px-2 py-0.5 font-medium text-black">
                            Cmd + Shift + N
                          </span>
                        </div>
                        <div className="mt-3 border border-black bg-white px-3.5 py-2.5 text-sm text-black">
                          Remember to cite Alexander on courtyard light
                          <span
                            aria-hidden="true"
                            className="ml-0.5 inline-block h-3.5 w-[2px] bg-[#C81E1E] align-middle"
                          />
                        </div>
                        <p className="mt-2 text-xs text-[#4D4D4D]">
                          Suggested link: Spatial memory in tools
                        </p>
                      </div>
                    )}

                    {activeCap.id === "markdown" && (
                      <div className="space-y-1.5 text-xs text-[#1A1A1A]">
                        <div className="font-semibold text-black">
                          Commonplace/
                        </div>
                        <div className="pl-4 text-[#4D4D4D]">
                          2026-11-19.md (1.4 KB)
                        </div>
                        <div className="pl-4 text-[#C81E1E] font-medium">
                          spatial-memory-in-tools.md (3.1 KB)
                        </div>
                        <div className="pl-4 text-[#4D4D4D]">
                          why-small-notes-travel-further.md (4.8 KB)
                        </div>
                      </div>
                    )}

                    {activeCap.id === "panes" && (
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="border border-black/20 bg-white p-3">
                          <div className="font-semibold text-black">
                            Pane 1 (Reference)
                          </div>
                          <div className="mt-1.5 text-[#4D4D4D]">
                            Spatial memory in tools
                          </div>
                        </div>
                        <div className="border border-[#C81E1E] bg-white p-3">
                          <div className="font-semibold text-[#C81E1E]">
                            Pane 2 (Active draft)
                          </div>
                          <div className="mt-1.5 text-[#4D4D4D]">
                            Why small notes travel further
                          </div>
                        </div>
                      </div>
                    )}

                    {activeCap.id === "sync" && (
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="border border-black bg-white px-3 py-2 font-medium text-black">
                          MacBook Pro (Local key)
                        </div>
                        <span className="font-medium text-[#C81E1E]">
                          Encrypted mirror
                        </span>
                        <div className="border border-black/30 bg-white px-3 py-2 text-[#4D4D4D]">
                          iPhone &amp; Linux Desktop
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 border-t border-black/12 pt-5 text-xs text-[#6B6B6B]">
                  Works identically offline. Zero cloud account required to
                  open, edit, or search your library.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plain Ownership & Platform Download */}
        <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-4xl font-semibold leading-[1.06] tracking-[-0.03em] text-black sm:text-5xl">
                Free locally.
                <br />
                Eight dollars a month to sync.
              </h2>
              <p className="mt-5 max-w-[48ch] text-base leading-[1.7] text-[#4D4D4D]">
                Download the complete desktop application at zero cost. Add
                encrypted multi-device sync and daily mobile capture only when
                you need your library in your pocket.
              </p>
            </div>

            <div className="border border-black p-6 sm:p-8 lg:col-span-5">
              <p className="text-sm font-semibold text-black">
                Choose your platform
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => {
                      setSelectedPlatform(platform);
                      setDownloadAck(false);
                    }}
                    className={`border py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#C81E1E] ${
                      selectedPlatform === platform
                        ? "border-black bg-black text-white"
                        : "border-black/20 bg-white text-black hover:border-black"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setDownloadAck(true)}
                className="mt-5 w-full bg-[#C81E1E] py-3.5 text-sm font-medium text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C81E1E]"
              >
                Download for {selectedPlatform}
              </button>

              {downloadAck && (
                <p role="status" className="mt-3 text-xs text-[#1A1A1A]">
                  Commonplace 2.4 for {selectedPlatform} is ready to install. No
                  sign-up needed.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/15 py-8 text-sm text-[#4D4D4D]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 sm:flex-row sm:items-center lg:px-10">
          <span className="font-semibold text-black">Commonplace</span>
          <span>Plain Markdown notes built to last decades</span>
        </div>
      </footer>
    </div>
  );
}
