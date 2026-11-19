"use client";

import { useMemo, useState } from "react";

interface ArchiveNote {
  id: string;
  title: string;
  date: string;
  folder: string;
  keywords: string[];
  excerpt: string;
  body: string;
}

const ARCHIVE_NOTES: ArchiveNote[] = [
  {
    id: "courtyard-echo",
    title: "Courtyard echo in November rain",
    date: "Nov 14, 2024",
    folder: "field-notes/acoustics.md",
    keywords: ["sound", "echo", "courtyard", "rain", "acoustic", "room", "quiet"],
    excerpt:
      "Wet limestone softens high frequencies while keeping footsteps distinct at twenty paces.",
    body: "Recorded three minutes outside the brick archway at 7:10 am. Wet limestone softens high frequencies while keeping footsteps distinct at twenty paces. Compare with the cedar library reading room.",
  },
  {
    id: "pattern-languages",
    title: "Notes on Christopher Alexander",
    date: "Mar 08, 2025",
    folder: "reading/timeless-way.md",
    keywords: ["light", "room", "window", "pattern", "space", "design", "paper"],
    excerpt:
      "Rooms with light from two sides remove glare and let faces stay readable all afternoon.",
    body: "Chapter 159: Light on Two Sides of Every Room. When daylight enters from a single wall, silhouettes flatten and people squint. Two openings balance the wall plane and steady attention.",
  },
  {
    id: "north-light",
    title: "North-facing desk measurements",
    date: "Jan 19, 2026",
    folder: "studio/winter-light.md",
    keywords: ["light", "north", "desk", "winter", "paper", "morning", "study"],
    excerpt:
      "Cool sky light stays even from nine until three, making pencil marks easier to read on rag stock.",
    body: "Moved the drafting table ninety centimeters closer to the north sash. Cool sky light stays even from nine until three, making pencil marks easier to read on rag stock without a lamp.",
  },
  {
    id: "memory-trails",
    title: "Vannevar Bush on associative trails",
    date: "Aug 22, 2025",
    folder: "reading/memex-1945.md",
    keywords: ["memory", "trail", "link", "note", "folder", "index", "brain", "idea"],
    excerpt:
      "The human mind does not work by alphabetical cabinets; it jumps by association from one item to the next.",
    body: "Bush argued in 1945 that filing systems force every idea into a single drawer. Associative trails let one paragraph belong to three arguments at once without duplicating the file.",
  },
];

const FEATURED_NOTES = [
  {
    id: "urban-acoustics",
    title: "Draft: Quiet rooms in loud cities",
    updated: "Edited 12 minutes ago",
    paragraphs: [
      {
        before: "Most modern offices treat quiet as the absence of noise, yet an overly deadened box feels uneasy. Looking back at my ",
        linkId: "courtyard-echo",
        linkLabel: "courtyard echo",
        after: " recordings, subtle low reflection actually calms the ear.",
      },
      {
        before: "The same balance shows up in daylight. In ",
        linkId: "pattern-languages",
        linkLabel: "Notes on Christopher Alexander",
        after: ", light arriving from two surfaces keeps the eye relaxed longer than a single bright lamp.",
      },
      {
        before: "Before starting the full essay, check the measurements from ",
        linkId: "north-light",
        linkLabel: "north-facing desk",
        after: " and pull the passage on ",
      },
    ],
    trailingLinkId: "memory-trails",
    trailingLinkLabel: "associative trails",
    trailingAfter: " for the closing section.",
  },
  {
    id: "study-light",
    title: "Winter reading room checklist",
    updated: "Edited yesterday",
    paragraphs: [
      {
        before: "Keep the main table parallel to the tall window as recorded in ",
        linkId: "north-light",
        linkLabel: "north-facing desk measurements",
        after: ". Direct afternoon sun washes out faint annotations.",
      },
      {
        before: "Cross-reference ",
        linkId: "pattern-languages",
        linkLabel: "light on two sides",
        after: " before ordering blinds for the east corner.",
      },
    ],
    trailingLinkId: "courtyard-echo",
    trailingLinkLabel: "courtyard acoustics",
    trailingAfter: " still needs one evening measurement after snow.",
  },
];

const EVOLUTION_STAGES = [
  {
    id: "capture",
    when: "Tuesday, 8:14 am",
    heading: "A sentence jotted down on the train",
    summary:
      "Open the quick capture window from any app, type two lines, and hit Return. No folders to choose and no tags to invent before the thought cools.",
    filename: "inbox/2026-02-10.md",
    content: [
      "# Morning observation",
      "",
      "Why do older train halls stay calm even when crowded? High vaulted plaster breaks up voices before they bounce back at ear height.",
    ],
    backlinks: ["Unlinked capture waiting in your daily stream"],
  },
  {
    id: "connect",
    when: "Three weeks later",
    heading: "Older passages surface as you write",
    summary:
      "When you revisit acoustics during a reading session, Cairn surfaces the train note alongside your 2024 courtyard recording automatically.",
    filename: "field-notes/quiet-rooms.md",
    content: [
      "# Quiet rooms in loud cities",
      "",
      "High vaulted plaster breaks up voices before they bounce back. Compare with [[courtyard-echo]] from November 2024.",
      "",
      "See also [[pattern-languages]] on how daylight and sound share the same room geometry.",
    ],
    backlinks: [
      "Linked to field-notes/acoustics.md (Nov 2024)",
      "Linked to reading/timeless-way.md (Mar 2025)",
    ],
  },
  {
    id: "publish",
    when: "Next autumn",
    heading: "An essay assembled from real trails",
    summary:
      "Instead of staring at a blank page, open the graph of connected notes, pull excerpts into one draft, and export clean Markdown or PDF.",
    filename: "essays/architecture-of-attention.md",
    content: [
      "# The architecture of attention",
      "",
      "A room teaches you how to think before you open a book. Softened reflections, light from two walls, and quiet proportions lower cognitive friction.",
      "",
      "Sources woven from 6 personal notes collected over 22 months.",
    ],
    backlinks: [
      "Draws from 6 linked notes (2024 to 2026)",
      "Exported cleanly to plain Markdown",
    ],
  },
];

const VAULT_FILES = [
  {
    path: "notes/2026-11-winter-light.md",
    size: "2.4 KB",
    lines: [
      "# Winter light in the north studio",
      "",
      "Measured at 10:30 am under overcast sky.",
      "Rag paper stays legible without overhead lamps until 15:15.",
      "",
      "Related: [[pattern-languages]], [[courtyard-echo]]",
    ],
  },
  {
    path: "notes/field-notes/acoustics.md",
    size: "3.1 KB",
    lines: [
      "# Courtyard echo in November rain",
      "",
      "Wet limestone absorbs treble hiss while preserving",
      "distant footsteps. Notice how conversation feels",
      "private even six meters from another bench.",
    ],
  },
  {
    path: "notes/reading/memex-1945.md",
    size: "4.8 KB",
    lines: [
      "# As We May Think (Vannevar Bush, 1945)",
      "",
      "> The human mind operates by association. With one",
      "> item in its grasp, it snaps instantly to the next.",
      "",
      "Why rigid folder trees break after ~400 notes.",
    ],
  },
  {
    path: "notes/projects/cairn-reading-list.md",
    size: "1.9 KB",
    lines: [
      "# Autumn reading queue",
      "",
      "- Robert Bringhurst — The Elements of Typographic Style",
      "- Christopher Alexander — A Pattern Language",
      "- Frances Yates — The Art of Memory",
    ],
  },
];

export function IterationOne() {
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const [selectedArchiveId, setSelectedArchiveId] = useState<string>("courtyard-echo");
  const [scratchInput, setScratchInput] = useState("");
  const [userNotes, setUserNotes] = useState<ArchiveNote[]>([]);
  const [activeStageIndex, setActiveStageIndex] = useState(1);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const allArchiveNotes = useMemo(
    () => [...userNotes, ...ARCHIVE_NOTES],
    [userNotes]
  );

  const matchedNotes = useMemo(() => {
    const query = scratchInput.trim().toLowerCase();
    if (!query) {
      return allArchiveNotes;
    }
    const tokens = query.split(/\s+/).filter((t) => t.length >= 2);
    if (tokens.length === 0) return allArchiveNotes;

    return allArchiveNotes.filter((note) => {
      const haystack = `${note.title} ${note.excerpt} ${note.body} ${note.keywords.join(" ")}`.toLowerCase();
      return tokens.some((token) => haystack.includes(token));
    });
  }, [allArchiveNotes, scratchInput]);

  const selectedNote =
    allArchiveNotes.find((n) => n.id === selectedArchiveId) ?? allArchiveNotes[0];

  const activeDoc = FEATURED_NOTES[activeDocIndex];
  const activeStage = EVOLUTION_STAGES[activeStageIndex];
  const activeFile = VAULT_FILES[activeFileIndex];

  function handleSaveScratch(event: React.FormEvent) {
    event.preventDefault();
    const cleaned = scratchInput.trim();
    if (!cleaned) return;
    const newNote: ArchiveNote = {
      id: `user-${Date.now()}`,
      title: cleaned.length > 44 ? `${cleaned.slice(0, 44)}...` : cleaned,
      date: "Just now",
      folder: "inbox/scratchpad.md",
      keywords: cleaned.toLowerCase().split(/\s+/),
      excerpt: cleaned,
      body: cleaned,
    };
    setUserNotes((prev) => [newNote, ...prev]);
    setSelectedArchiveId(newNote.id);
    setScratchInput("");
  }

  function triggerDownload(platform: string) {
    setDownloadMessage(
      `Prepared Cairn 2.4 installer for ${platform}. Local-first, signed, 18 MB.`
    );
  }

  return (
    <div
      className="min-h-screen bg-[#F7F8F5] text-[#182026]"
      style={{ fontFamily: "var(--font-hanken), system-ui, sans-serif" }}
    >
      {/* Top navigation */}
      <header className="border-b border-[#D5DBD2] bg-[#F7F8F5]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 text-[#182026]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect x="4" y="16" width="16" height="4" rx="2" fill="#182026" />
              <rect x="6.5" y="10.5" width="11" height="4" rx="2" fill="#182026" />
              <rect x="9" y="5" width="6" height="4" rx="2" fill="#1B4FD8" />
            </svg>
            <span
              className="text-xl font-medium tracking-tight"
              style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
            >
              Cairn
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-[#4D5863] md:flex">
            <a href="#how-it-works" className="hover:text-[#182026] transition-colors">
              How notes grow
            </a>
            <a href="#plain-files" className="hover:text-[#182026] transition-colors">
              Plain files
            </a>
            <a href="#pricing" className="hover:text-[#182026] transition-colors">
              Pricing
            </a>
          </nav>

          <button
            type="button"
            onClick={() => triggerDownload("macOS")}
            className="rounded-md bg-[#1B4FD8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#143EB0] cursor-pointer"
          >
            Download for Mac
          </button>
        </div>
      </header>

      {downloadMessage && (
        <div
          role="status"
          className="border-b border-[#C6D5FB] bg-[#E8EFFD] px-6 py-2.5 text-sm text-[#14378F]"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 sm:px-2">
            <span>{downloadMessage}</span>
            <button
              type="button"
              onClick={() => setDownloadMessage(null)}
              className="text-xs font-medium underline underline-offset-4 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Hero: Drafting desk split with live marginalia notebook */}
      <main id="top">
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-14 sm:px-8 lg:pb-24 lg:pt-20">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left reading column */}
            <div className="lg:col-span-5 lg:pt-4">
              <h1
                className="text-[2.6rem] leading-[1.07] font-normal tracking-[-0.025em] text-[#182026] sm:text-[3.35rem]"
                style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
              >
                A notebook that remembers what you already know.
              </h1>

              <p
                className="mt-6 max-w-[46ch] text-[1.125rem] leading-[1.68] text-[#3B4650]"
                style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
              >
                Write down a half-finished thought today, and Cairn brings back
                the passage, field recording, or book excerpt you saved two
                winters ago. Every note stays a plain Markdown file in a folder
                on your computer.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => triggerDownload("macOS (Apple Silicon & Intel)")}
                  className="rounded-md bg-[#1B4FD8] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#143EB0] cursor-pointer"
                >
                  Download for Mac
                </button>
                <button
                  type="button"
                  onClick={() => triggerDownload("Windows and Linux")}
                  className="rounded-md border border-[#C6CEC2] bg-white px-4 py-3 text-sm font-medium text-[#182026] transition-colors hover:border-[#182026] cursor-pointer"
                >
                  Windows and Linux
                </button>
              </div>

              <p className="mt-4 text-sm text-[#4D5863]">
                Free forever for local notebooks. No account needed to start writing.
              </p>

              <p className="mt-10 border-t border-[#D5DBD2] pt-5 text-sm leading-relaxed text-[#4D5863]">
                Works offline on macOS, Windows, and Linux. Instant search
                across forty thousand Markdown files without leaving your disk.
              </p>
            </div>

            {/* Right signature element: Live interactive drafting sheet + margin */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-lg border border-[#CED5CA] bg-white">
                {/* Cobalt top fountain-pen rule */}
                <div className="h-[3px] w-full bg-[#1B4FD8]" />

                {/* Sheet header tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E3E7E0] bg-[#F3F5F0] px-4 py-2.5">
                  <div className="flex items-center gap-1" role="tablist" aria-label="Sample notes">
                    {FEATURED_NOTES.map((doc, idx) => (
                      <button
                        key={doc.id}
                        type="button"
                        role="tab"
                        aria-selected={activeDocIndex === idx}
                        onClick={() => setActiveDocIndex(idx)}
                        className={`rounded px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          activeDocIndex === idx
                            ? "bg-white text-[#182026] border border-[#D5DBD2]"
                            : "text-[#4D5863] hover:text-[#182026]"
                        }`}
                      >
                        {doc.title}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-[#5A6570]">{activeDoc.updated}</span>
                </div>

                {/* Split sheet: Note prose on left, live connected margin on right */}
                <div className="grid divide-y divide-[#E3E7E0] md:grid-cols-12 md:divide-x md:divide-y-0">
                  {/* Note prose + live scratchpad */}
                  <div className="p-6 md:col-span-7">
                    <h2
                      className="text-xl font-medium text-[#182026]"
                      style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
                    >
                      {activeDoc.title}
                    </h2>

                    <div
                      className="mt-4 space-y-4 text-[0.98rem] leading-[1.72] text-[#26313A]"
                      style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
                    >
                      {activeDoc.paragraphs.map((p, index) => {
                        const isSelected = selectedArchiveId === p.linkId;
                        return (
                          <p key={index}>
                            {p.before}
                            <button
                              type="button"
                              onClick={() => {
                                setScratchInput("");
                                setSelectedArchiveId(p.linkId);
                              }}
                              className={`rounded px-1 py-0.5 text-left underline decoration-[#1B4FD8]/40 underline-offset-4 transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-[#E5ECFD] text-[#133CB0] decoration-[#1B4FD8]"
                                  : "text-[#1B4FD8] hover:bg-[#EFF3FE]"
                              }`}
                            >
                              {p.linkLabel}
                            </button>
                            {p.after}
                            {index === activeDoc.paragraphs.length - 1 && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setScratchInput("");
                                    setSelectedArchiveId(activeDoc.trailingLinkId);
                                  }}
                                  className={`rounded px-1 py-0.5 text-left underline decoration-[#1B4FD8]/40 underline-offset-4 transition-colors cursor-pointer ${
                                    selectedArchiveId === activeDoc.trailingLinkId
                                      ? "bg-[#E5ECFD] text-[#133CB0] decoration-[#1B4FD8]"
                                      : "text-[#1B4FD8] hover:bg-[#EFF3FE]"
                                  }`}
                                >
                                  {activeDoc.trailingLinkLabel}
                                </button>
                                {activeDoc.trailingAfter}
                              </>
                            )}
                          </p>
                        );
                      })}
                    </div>

                    {/* Interactive live scratchpad */}
                    <form
                      onSubmit={handleSaveScratch}
                      className="mt-6 border-t border-[#E6EAE3] pt-4"
                    >
                      <label
                        htmlFor="desk-scratch"
                        className="block text-xs font-medium text-[#4D5863]"
                      >
                        Try typing a thought (try words like light, rain, memory, or room)
                      </label>
                      <div className="mt-2 flex gap-2">
                        <input
                          id="desk-scratch"
                          type="text"
                          value={scratchInput}
                          onChange={(e) => setScratchInput(e.target.value)}
                          placeholder="Type a thought (light, rain, memory)..."
                          className="w-full rounded border border-[#CED5CA] bg-[#FAFBF9] px-3 py-2 text-sm text-[#182026] placeholder:text-[#78848F] focus:border-[#1B4FD8]"
                        />
                        <button
                          type="submit"
                          className="shrink-0 rounded border border-[#182026] bg-[#182026] px-3.5 py-2 text-xs font-medium text-white hover:bg-[#2A3640] cursor-pointer"
                        >
                          Save note
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Live connected margin rail */}
                  <aside
                    aria-label="Related notes from your archive"
                    className="bg-[#F9FAF7] p-5 md:col-span-5"
                  >
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-xs font-medium text-[#4D5863]">
                        {scratchInput.trim()
                          ? "Matching earlier notes"
                          : "Connected in the margin"}
                      </h3>
                      <span className="text-xs text-[#64707B]">
                        {matchedNotes.length} found
                      </span>
                    </div>

                    {matchedNotes.length === 0 ? (
                      <div className="mt-4 rounded border border-dashed border-[#C7CFC3] bg-white p-4 text-sm text-[#4D5863]">
                        No earlier notes match yet. Press Save note to start a
                        fresh trail on this subject.
                      </div>
                    ) : (
                      <ul className="mt-3 space-y-2">
                        {matchedNotes.slice(0, 3).map((note) => {
                          const isSelected = selectedNote?.id === note.id;
                          return (
                            <li key={note.id}>
                              <button
                                type="button"
                                onClick={() => setSelectedArchiveId(note.id)}
                                className={`w-full rounded border p-2.5 text-left transition-colors cursor-pointer ${
                                  isSelected
                                    ? "border-[#1B4FD8] bg-[#EEF3FE]"
                                    : "border-[#E1E6DE] bg-white hover:border-[#B8C2B4]"
                                }`}
                              >
                                <div className="flex items-baseline justify-between gap-2">
                                  <span className="text-sm font-medium text-[#182026]">
                                    {note.title}
                                  </span>
                                </div>
                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#4D5863]">
                                  {note.excerpt}
                                </p>
                                <div className="mt-1.5 text-[11px] text-[#64707B]">
                                  {note.date}
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {selectedNote && matchedNotes.length > 0 && (
                      <div className="mt-4 border-t border-[#DFE4DC] pt-3.5">
                        <div className="text-xs font-medium text-[#1B4FD8]">
                          Full excerpt from {selectedNote.date}
                        </div>
                        <p
                          className="mt-1.5 text-sm leading-relaxed text-[#26313A]"
                          style={{
                            fontFamily: "var(--font-newsreader), Georgia, serif",
                          }}
                        >
                          {selectedNote.body}
                        </p>
                      </div>
                    )}
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Genuine chronological sequence of how a note grows */}
        <section
          id="how-it-works"
          className="border-t border-[#D5DBD2] bg-[#ECEFE9] py-20"
        >
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="max-w-2xl">
              <h2
                className="text-3xl leading-[1.15] font-normal tracking-[-0.02em] text-[#182026] sm:text-4xl"
                style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
              >
                How a rough line on Tuesday turns into finished work by autumn.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#3E4954]">
                Most note apps bury yesterday&apos;s thoughts inside nested folders
                you never reopen. Cairn treats time as an ally, stitching older
                entries into view whenever you return to an idea.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-5">
                {EVOLUTION_STAGES.map((stage, index) => {
                  const active = index === activeStageIndex;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStageIndex(index)}
                      className={`w-full rounded-md border p-5 text-left transition-colors cursor-pointer ${
                        active
                          ? "border-[#1B4FD8] bg-white"
                          : "border-[#D2D8CE] bg-[#F5F7F2] hover:bg-white"
                      }`}
                    >
                      <div className="text-xs font-medium text-[#1B4FD8]">
                        {stage.when}
                      </div>
                      <h3
                        className="mt-1 text-xl font-normal text-[#182026]"
                        style={{
                          fontFamily: "var(--font-newsreader), Georgia, serif",
                        }}
                      >
                        {stage.heading}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4A5560]">
                        {stage.summary}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-7">
                <div className="flex h-full flex-col justify-between rounded-md border border-[#C9D1C5] bg-white p-7 sm:p-9">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E4E8E1] pb-3 text-sm text-[#4D5863]">
                      <span>{activeStage.filename}</span>
                      <span>{activeStage.when}</span>
                    </div>
                    <div
                      className="mt-6 space-y-3 text-base leading-[1.72] text-[#182026]"
                      style={{
                        fontFamily: "var(--font-newsreader), Georgia, serif",
                      }}
                    >
                      {activeStage.content.map((line, i) =>
                        line === "" ? (
                          <div key={i} className="h-2" />
                        ) : line.startsWith("# ") ? (
                          <h4 key={i} className="text-2xl font-normal text-[#182026]">
                            {line.slice(2)}
                          </h4>
                        ) : (
                          <p key={i} className="text-[#29343E]">
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-[#E4E8E1] pt-4">
                    <div className="text-xs font-medium text-[#4D5863]">
                      Margin connections at this stage
                    </div>
                    <ul className="mt-2 space-y-1.5 text-sm text-[#1B4FD8]">
                      {activeStage.backlinks.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Plain Markdown file explorer */}
        <section id="plain-files" className="border-t border-[#D5DBD2] bg-[#F7F8F5] py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2
                  className="text-3xl leading-[1.15] font-normal tracking-[-0.02em] text-[#182026] sm:text-4xl"
                  style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
                >
                  Your library sits on your drive, readable fifty years from now.
                </h2>
                <p
                  className="mt-5 text-[1.0625rem] leading-[1.7] text-[#3B4650]"
                  style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
                >
                  Cairn never locks your thinking inside a proprietary cloud
                  database. Open your notebook folder in Finder, back it up with
                  Git, or edit a page in any text editor you like. Cairn indexes
                  changes the instant you hit Save.
                </p>

                <ul className="mt-8 space-y-3 border-t border-[#D5DBD2] pt-6 text-sm text-[#2A353F]">
                  <li>Works on airplanes and trains with full-text search offline.</li>
                  <li>End-to-end encryption keys stay on your devices when you turn on sync.</li>
                  <li>Import folders from Obsidian, Bear, Notion, or Apple Notes in seconds.</li>
                </ul>
              </div>

              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-md border border-[#CED5CA] bg-white">
                  <div className="grid divide-y divide-[#E3E7E0] sm:grid-cols-12 sm:divide-x sm:divide-y-0">
                    <div className="bg-[#F3F5F0] p-4 sm:col-span-5">
                      <div className="px-2 pb-2 text-xs font-medium text-[#4D5863]">
                        ~/Documents/Cairn
                      </div>
                      <ul className="space-y-1">
                        {VAULT_FILES.map((file, idx) => (
                          <li key={file.path}>
                            <button
                              type="button"
                              onClick={() => setActiveFileIndex(idx)}
                              className={`flex w-full items-center justify-between rounded px-2.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                                activeFileIndex === idx
                                  ? "bg-[#1B4FD8] text-white"
                                  : "text-[#29343E] hover:bg-[#E5E9E1]"
                              }`}
                            >
                              <span className="truncate pr-2">{file.path}</span>
                              <span
                                className={
                                  activeFileIndex === idx
                                    ? "text-white/80 shrink-0"
                                    : "text-[#636F7B] shrink-0"
                                }
                              >
                                {file.size}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 sm:col-span-7">
                      <div className="border-b border-[#E4E8E1] pb-2.5 text-xs text-[#5A6570]">
                        {activeFile.path}
                      </div>
                      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#222C34]">
                        {activeFile.lines.join("\n")}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Quiet horizontal pricing ledger */}
        <section id="pricing" className="border-t border-[#D5DBD2] bg-white py-20">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <h2
              className="text-3xl font-normal tracking-[-0.02em] text-[#182026] sm:text-4xl"
              style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
            >
              Pay only if you want encrypted sync.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#4A5560]">
              The desktop app is free without artificial note caps, time trials,
              or reminder banners.
            </p>

            <div className="mt-10 divide-y divide-[#DCE1D9] border-y border-[#DCE1D9]">
              <div className="grid gap-4 py-7 sm:grid-cols-12 sm:items-baseline">
                <div className="sm:col-span-4">
                  <h3
                    className="text-2xl font-normal text-[#182026]"
                    style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
                  >
                    Local notebook
                  </h3>
                  <p className="mt-1 text-sm text-[#4D5863]">$0 forever</p>
                </div>
                <p className="text-sm leading-relaxed text-[#3B4650] sm:col-span-5">
                  Unlimited local notes, live backlink margin, instant full-text
                  search, PDF and Markdown export, and iCloud or Git folder sync
                  you manage yourself.
                </p>
                <div className="sm:col-span-3 sm:text-right">
                  <button
                    type="button"
                    onClick={() => triggerDownload("macOS (Free Local Edition)")}
                    className="rounded-md border border-[#182026] px-4 py-2 text-sm font-medium text-[#182026] transition-colors hover:bg-[#182026] hover:text-white cursor-pointer"
                  >
                    Download free
                  </button>
                </div>
              </div>

              <div className="grid gap-4 py-7 sm:grid-cols-12 sm:items-baseline">
                <div className="sm:col-span-4">
                  <h3
                    className="text-2xl font-normal text-[#182026]"
                    style={{ fontFamily: "var(--font-newsreader), Georgia, serif" }}
                  >
                    Cairn Sync
                  </h3>
                  <p className="mt-1 text-sm text-[#4D5863]">$6 a month, or $60 a year</p>
                </div>
                <p className="text-sm leading-relaxed text-[#3B4650] sm:col-span-5">
                  Zero-knowledge encrypted sync across Mac, Windows, Linux, iOS,
                  and Android, plus one-year note revision history and web
                  article clipping.
                </p>
                <div className="sm:col-span-3 sm:text-right">
                  <button
                    type="button"
                    onClick={() =>
                      setDownloadMessage(
                        "Cairn Sync trial activates inside the desktop app after download. No card required for 30 days."
                      )
                    }
                    className="rounded-md bg-[#1B4FD8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#143EB0] cursor-pointer"
                  >
                    Start 30-day sync
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet colophon footer */}
      <footer className="border-t border-[#D5DBD2] bg-[#F7F8F5] py-10 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 text-sm text-[#4D5863] sm:flex-row sm:items-center sm:px-8">
          <p>Cairn Software, Portland. Built for notebooks that outlive software companies.</p>
          <div className="flex flex-wrap gap-6">
            <a href="#how-it-works" className="hover:text-[#182026]">
              Release notes
            </a>
            <a href="#plain-files" className="hover:text-[#182026]">
              Security audit
            </a>
            <a href="#pricing" className="hover:text-[#182026]">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
