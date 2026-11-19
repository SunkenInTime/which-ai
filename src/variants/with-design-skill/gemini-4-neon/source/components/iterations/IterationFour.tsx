"use client";

import { useMemo, useState } from "react";

interface WorkspaceNote {
  id: string;
  folder: string;
  title: string;
  updated: string;
  content: string;
  keywords: string[];
}

const INITIAL_WORKSPACE_NOTES: WorkspaceNote[] = [
  {
    id: "architecture",
    folder: "Engineering",
    title: "Local-first sync tradeoffs",
    updated: "Today, 9:42 am",
    content:
      "When state lives on disk first, the interface never blocks on a spinning loader. Sync becomes a quiet background replicate step rather than a gatekeeper for opening your own thoughts.\n\nCross-check with Elena's benchmark notes on full-text indexing and chapter 5 of Designing Data-Intensive Applications before finalizing the conflict merge view.",
    keywords: ["sync", "disk", "indexing", "elena", "conflict", "local", "merge"],
  },
  {
    id: "ddia",
    folder: "Reading",
    title: "Notes on Kleppmann, chapter 5",
    updated: "Yesterday",
    content:
      "Multi-leader replication shines for offline-capable tools because every laptop acts as its own leader while disconnected on a flight.\n\nKeep merges predictable for human prose: line-level three-way merge plus automatic conflict copies when two edits touch the exact same paragraph.",
    keywords: ["replication", "offline", "merge", "conflict", "sync", "kleppmann"],
  },
  {
    id: "elena-meeting",
    folder: "Meetings",
    title: "Indexing review with Elena",
    updated: "Nov 12, 2026",
    content:
      "Tested a synthetic vault of 45,000 Markdown files on a 2021 MacBook Air. Cold startup indexing finished in 620 milliseconds; incremental saves stayed under 4 milliseconds.\n\nNext step: verify unicode stemmers for French and German reading archives.",
    keywords: ["indexing", "elena", "benchmark", "markdown", "vault", "search"],
  },
  {
    id: "carpentry",
    folder: "Personal",
    title: "Ash bookshelf joinery sketch",
    updated: "Nov 03, 2026",
    content:
      "Three bays at 76 cm clear span using 24 mm solid ash boards so heavy art monographs never sag over winter.\n\nFinish with matte hardwax oil instead of polyurethane so small scratches blend in gracefully over time.",
    keywords: ["ash", "wood", "bookshelf", "joinery", "winter", "sketch"],
  },
];

export function IterationFour() {
  const [notes, setNotes] = useState<WorkspaceNote[]>(INITIAL_WORKSPACE_NOTES);
  const [activeId, setActiveId] = useState<string>("architecture");
  const [viewMode, setViewMode] = useState<"write" | "links">("write");
  const [quickCaptureText, setQuickCaptureText] = useState("");
  const [capturedToast, setCapturedToast] = useState<string | null>(null);
  const [downloadBanner, setDownloadBanner] = useState<string | null>(null);

  const activeNote = notes.find((n) => n.id === activeId) ?? notes[0];

  const liveConnections = useMemo(() => {
    const activeWords = new Set(
      `${activeNote.title} ${activeNote.content}`
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 4)
    );

    return notes
      .filter((n) => n.id !== activeNote.id)
      .map((candidate) => {
        const shared = candidate.keywords.filter((kw) => activeWords.has(kw));
        return { note: candidate, shared };
      })
      .filter((entry) => entry.shared.length > 0)
      .sort((a, b) => b.shared.length - a.shared.length);
  }, [activeNote, notes]);

  const wordCount = useMemo(() => {
    const trimmed = activeNote.content.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [activeNote.content]);

  function handleUpdateContent(nextValue: string) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === activeNote.id
          ? { ...note, content: nextValue, updated: "Edited just now" }
          : note
      )
    );
  }

  function handleCreateBlankNote() {
    const id = `note-${Date.now()}`;
    const created: WorkspaceNote = {
      id,
      folder: "Inbox",
      title: "Untitled scratch note",
      updated: "Just now",
      content:
        "Start typing here. Mention sync, indexing, Elena, or offline to watch related notes surface on the right.",
      keywords: ["scratch", "inbox", "draft"],
    };
    setNotes((prev) => [created, ...prev]);
    setActiveId(id);
    setViewMode("write");
  }

  function handleQuickCapture(event: React.FormEvent) {
    event.preventDefault();
    const cleaned = quickCaptureText.trim();
    if (!cleaned) return;
    const id = `capture-${Date.now()}`;
    const created: WorkspaceNote = {
      id,
      folder: "Daily stream",
      title: cleaned.length > 38 ? `${cleaned.slice(0, 38)}...` : cleaned,
      updated: "Captured just now",
      content: cleaned,
      keywords: cleaned
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 4),
    };
    setNotes((prev) => [created, ...prev]);
    setQuickCaptureText("");
    setCapturedToast("Saved to your workspace above as a new Daily stream note.");
  }

  return (
    <div
      className="min-h-screen bg-white text-[#0F1833]"
      style={{ fontFamily: "var(--font-archivo), system-ui, sans-serif" }}
    >
      {/* Full-bleed Ultramarine Architectural Opening */}
      <div className="bg-[#1635B5] text-white">
        <header className="border-b border-white/15">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
            <a href="#top" className="inline-flex items-center gap-2.5 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 18H20" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M7 12H17" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M10 6H14" stroke="#B8C7FA" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
              <span className="text-lg font-semibold tracking-[-0.02em]">
                Cairn
              </span>
            </a>

            <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-[#D5E0FF] md:flex">
              <a href="#workspace" className="hover:text-white transition-colors">
                Workspace
              </a>
              <a href="#capture" className="hover:text-white transition-colors">
                Quick capture
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
            </nav>

            <button
              type="button"
              onClick={() =>
                setDownloadBanner(
                  "Cairn 2.4 installer ready for macOS, Windows, and Linux."
                )
              }
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#1635B5] transition-colors hover:bg-[#EEF2FF] cursor-pointer"
            >
              Download
            </button>
          </div>
        </header>

        {downloadBanner && (
          <div
            role="status"
            className="border-b border-white/15 bg-[#0E237A] px-6 py-2.5 text-sm text-white"
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <span>{downloadBanner}</span>
              <button
                type="button"
                onClick={() => setDownloadBanner(null)}
                className="text-xs text-[#B8C7FA] underline underline-offset-4 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <section id="top" className="mx-auto max-w-6xl px-6 pb-28 pt-14 sm:px-8 lg:pt-20">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-[2.7rem] leading-[1.03] font-semibold tracking-[-0.035em] text-white sm:text-[4.1rem]">
                One calm room for everything you read, notice, and build.
              </h1>
            </div>

            <div className="lg:col-span-5 lg:pb-1">
              <p className="max-w-[42ch] text-base leading-[1.65] text-[#DCE5FF]">
                Cairn turns a local folder of plain Markdown files into a fast
                second brain. Write without friction while older research,
                meetings, and quotes connect quietly beside your cursor.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setDownloadBanner(
                      "Prepared Cairn 2.4 for macOS (Universal). Free for unlimited local notes."
                    )
                  }
                  className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#1635B5] transition-colors hover:bg-[#EEF2FF] cursor-pointer"
                >
                  Download for macOS
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setDownloadBanner(
                      "Prepared Cairn 2.4 for Windows and Linux (.exe and .AppImage)."
                    )
                  }
                  className="rounded-md border border-white/35 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-white cursor-pointer"
                >
                  Windows and Linux
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Signature Bold Element: Live Editable 3-Pane Cairn Workspace bridging ultramarine & white */}
      <main>
        <section
          id="workspace"
          aria-label="Interactive Cairn workspace preview"
          className="mx-auto -mt-20 max-w-6xl px-6 pb-20 sm:px-8"
        >
          <div className="overflow-hidden rounded-xl border border-[#CBD4EC] bg-white shadow-xl shadow-[#0E237A]/12">
            {/* Minimal app titlebar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E3E8F5] bg-[#F5F7FC] px-4 py-2.5 text-xs text-[#4C5875]">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[#0F1833]">
                  Personal Vault
                </span>
                <span>{notes.length} notes on disk</span>
              </div>

              <div className="flex items-center gap-1 rounded-md border border-[#D4DCF0] bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("write")}
                  className={`rounded px-2.5 py-1 text-xs font-medium cursor-pointer ${
                    viewMode === "write"
                      ? "bg-[#1635B5] text-white"
                      : "text-[#4C5875] hover:text-[#0F1833]"
                  }`}
                >
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("links")}
                  className={`rounded px-2.5 py-1 text-xs font-medium cursor-pointer ${
                    viewMode === "links"
                      ? "bg-[#1635B5] text-white"
                      : "text-[#4C5875] hover:text-[#0F1833]"
                  }`}
                >
                  Connections ({liveConnections.length})
                </button>
              </div>
            </div>

            {/* 3-pane live workspace */}
            <div className="grid min-h-[430px] divide-y divide-[#E3E8F5] lg:grid-cols-12 lg:divide-x lg:divide-y-0">
              {/* Pane 1: Note sidebar */}
              <div className="bg-[#FAFBFD] p-4 lg:col-span-3">
                <div className="flex items-center justify-between pb-3">
                  <span className="text-xs font-semibold text-[#4C5875]">
                    Recent notes
                  </span>
                  <button
                    type="button"
                    onClick={handleCreateBlankNote}
                    className="rounded border border-[#CBD4EC] bg-white px-2 py-1 text-xs font-medium text-[#1635B5] hover:border-[#1635B5] cursor-pointer"
                  >
                    New note
                  </button>
                </div>

                <ul className="space-y-1">
                  {notes.map((note) => {
                    const isActive = note.id === activeNote.id;
                    return (
                      <li key={note.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(note.id)}
                          className={`w-full rounded-md px-3 py-2.5 text-left transition-colors cursor-pointer ${
                            isActive
                              ? "bg-[#1635B5] text-white"
                              : "text-[#1E2947] hover:bg-[#ECEFF9]"
                          }`}
                        >
                          <div className="text-sm font-medium leading-snug">
                            {note.title}
                          </div>
                          <div
                            className={`mt-1 text-xs ${
                              isActive ? "text-[#C5D3FF]" : "text-[#636F8C]"
                            }`}
                          >
                            {note.folder}, {note.updated}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Pane 2: Editable note document in Source Serif 4 */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6">
                {viewMode === "write" ? (
                  <>
                    <div>
                      <div className="text-xs font-medium text-[#1635B5]">
                        {activeNote.folder}
                      </div>
                      <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#0F1833]">
                        {activeNote.title}
                      </h2>

                      <label htmlFor="live-note-editor" className="sr-only">
                        Edit current note
                      </label>
                      <textarea
                        id="live-note-editor"
                        value={activeNote.content}
                        onChange={(e) => handleUpdateContent(e.target.value)}
                        rows={8}
                        className="mt-5 w-full resize-none border-0 bg-transparent text-[1.0625rem] leading-[1.78] text-[#1D2742] focus:outline-none"
                        style={{
                          fontFamily: "var(--font-source-serif), Georgia, serif",
                        }}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#E8ECF7] pt-3 text-xs text-[#636F8C]">
                      <span>Editable preview: type to update live connections</span>
                      <span>{wordCount} words</span>
                    </div>
                  </>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold text-[#0F1833]">
                      Notes linked to {activeNote.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#4C5875]">
                      Cairn pairs terms and references across your folder
                      without requiring manual tags.
                    </p>

                    {liveConnections.length === 0 ? (
                      <div className="mt-6 rounded-lg border border-dashed border-[#CBD4EC] p-5 text-sm text-[#4C5875]">
                        No linked notes detected for this text yet. Switch to
                        Write and mention words like sync, indexing, Elena, or
                        merge.
                      </div>
                    ) : (
                      <div className="mt-6 space-y-3">
                        {liveConnections.map(({ note, shared }) => (
                          <button
                            key={note.id}
                            type="button"
                            onClick={() => {
                              setActiveId(note.id);
                              setViewMode("write");
                            }}
                            className="w-full rounded-lg border border-[#DCE3F5] bg-[#F8FAFF] p-4 text-left transition-colors hover:border-[#1635B5] cursor-pointer"
                          >
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-base font-semibold text-[#0F1833]">
                                {note.title}
                              </span>
                              <span className="text-xs text-[#1635B5]">
                                Open note
                              </span>
                            </div>
                            <p
                              className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#384361]"
                              style={{
                                fontFamily:
                                  "var(--font-source-serif), Georgia, serif",
                              }}
                            >
                              {note.content}
                            </p>
                            <div className="mt-2.5 text-xs text-[#596582]">
                              Shared concepts: {shared.join(", ")}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Pane 3: Live context & backlinks */}
              <aside
                aria-label="Live backlinks"
                className="bg-[#F7F9FE] p-5 lg:col-span-3"
              >
                <div className="text-xs font-semibold text-[#4C5875]">
                  Related in vault
                </div>

                {liveConnections.length === 0 ? (
                  <p className="mt-4 text-xs leading-relaxed text-[#5D6985]">
                    No related notes surfaced yet. Add a keyword from another
                    note on the left to watch links appear here.
                  </p>
                ) : (
                  <ul className="mt-3 space-y-2.5">
                    {liveConnections.map(({ note, shared }) => (
                      <li key={note.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(note.id)}
                          className="w-full rounded-md border border-[#DCE3F5] bg-white p-3 text-left transition-colors hover:border-[#1635B5] cursor-pointer"
                        >
                          <div className="text-sm font-semibold text-[#0F1833]">
                            {note.title}
                          </div>
                          <div className="mt-1 text-xs text-[#1635B5]">
                            Matches: {shared.slice(0, 3).join(", ")}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 border-t border-[#E2E7F4] pt-4 text-xs text-[#5D6985]">
                  <div className="font-medium text-[#0F1833]">File on disk</div>
                  <div className="mt-1 break-all">
                    ~/Cairn/{activeNote.folder.toLowerCase()}/{activeNote.id}.md
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Story Band A: Interactive Quick Capture */}
        <section
          id="capture"
          className="border-t border-[#E5EBF8] bg-[#F2F5FC] py-20"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] text-[#0F1833] sm:text-4xl">
                Catch an idea in two seconds without switching windows.
              </h2>
              <p className="mt-4 text-base leading-[1.68] text-[#3B4663]">
                Press Command+Shift+Space from a paper, call, or terminal. Drop
                in a sentence, hit Return, and stay right where you were. Cairn
                files it into today&apos;s stream and links it automatically.
              </p>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleQuickCapture}
                className="rounded-xl border border-[#CBD4EC] bg-white p-6"
              >
                <div className="flex items-center justify-between text-xs text-[#586480]">
                  <label htmlFor="quick-capture-input" className="font-semibold text-[#0F1833]">
                    Quick capture bar
                  </label>
                  <span>Shortcut: Command+Shift+Space</span>
                </div>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="quick-capture-input"
                    type="text"
                    value={quickCaptureText}
                    onChange={(e) => setQuickCaptureText(e.target.value)}
                    placeholder="Jot down a thought to drop into the workspace above..."
                    className="w-full rounded-md border border-[#CBD4EC] bg-[#FAFBFD] px-4 py-3 text-sm text-[#0F1833] placeholder:text-[#6E7A96] focus:border-[#1635B5]"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-md bg-[#1635B5] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0E237A] cursor-pointer"
                  >
                    Save to stream
                  </button>
                </div>
                {capturedToast && (
                  <p className="mt-3 text-xs font-medium text-[#1635B5]">
                    {capturedToast}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Story Band B: Plain contrast without SaaS card clutter */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <h2 className="max-w-xl text-3xl leading-[1.12] font-semibold tracking-[-0.03em] text-[#0F1833] sm:text-4xl">
              Why a linked folder outlasts every cloud notebook.
            </h2>

            <div className="mt-12 grid gap-10 border-t border-[#DCE3F4] pt-10 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-[#586480]">
                  Typical cloud note apps
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#4C5875]">
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-[#9BA5BD]" />
                    <span>Wait for remote tabs to load before searching your own notes.</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-[#9BA5BD]" />
                    <span>Trapped inside proprietary databases that export broken HTML.</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-[#9BA5BD]" />
                    <span>Force every note into one folder before you know where it belongs.</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-[#9BA5BD]" />
                    <span>Turn quiet writing space into team dashboards and AI sidebars.</span>
                  </li>
                </ul>
              </div>

              <div className="md:border-l md:border-[#DCE3F4] md:pl-10">
                <h3 className="text-lg font-semibold text-[#1635B5]">
                  Inside Cairn
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#0F1833]">
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-xs bg-[#1635B5]" />
                    <span>Opens in under 100 ms and searches 50,000 notes offline.</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-xs bg-[#1635B5]" />
                    <span>Every note is a clean Markdown file sitting in your own directory.</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-xs bg-[#1635B5]" />
                    <span>Links and backlinks connect notes across topics automatically.</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-xs bg-[#1635B5]" />
                    <span>Zero team noise, zero pop-ups, and end-to-end encrypted sync when you want it.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quiet reader quote */}
            <figure className="mt-16 rounded-xl bg-[#F2F5FC] p-8 sm:p-10">
              <blockquote
                className="max-w-3xl text-xl leading-[1.6] text-[#0F1833] sm:text-2xl"
                style={{ fontFamily: "var(--font-source-serif), Georgia, serif" }}
              >
                &ldquo;I moved nine years of research notes into Cairn in one
                afternoon. Within a week it surfaced a reading note from 2019
                that solved a chapter transition I had been stuck on for two
                months.&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-[#4C5875]">
                Dr. Hannah Lindqvist, urban historian in Gothenburg
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Closing Ultramarine Pricing & Download Band */}
        <section id="pricing" className="bg-[#1635B5] py-20 text-white">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-4xl">
                  Simple pricing that respects your archive.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#D5E0FF]">
                  Write offline on your computer for free forever. Pay six
                  dollars a month only if you want Cairn to sync your encrypted
                  vault to your phone and second machine.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
                <div className="flex flex-col justify-between rounded-lg border border-white/25 bg-[#112B99] p-6">
                  <div>
                    <h3 className="text-lg font-semibold">Local Desktop</h3>
                    <div className="mt-2 text-3xl font-semibold">$0</div>
                    <p className="mt-3 text-sm leading-relaxed text-[#D5E0FF]">
                      macOS, Windows, and Linux apps, instant search, live
                      backlinks, and unlimited Markdown files on your drive.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setDownloadBanner("Started download for Cairn Local Desktop ($0).")
                    }
                    className="mt-6 w-full rounded-md border border-white/40 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#1635B5] cursor-pointer"
                  >
                    Download free
                  </button>
                </div>

                <div className="flex flex-col justify-between rounded-lg bg-white p-6 text-[#0F1833]">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1635B5]">
                      Encrypted Sync
                    </h3>
                    <div className="mt-2 text-3xl font-semibold">$6 / month</div>
                    <p className="mt-3 text-sm leading-relaxed text-[#3B4663]">
                      End-to-end encrypted sync across desktop, iOS, and
                      Android, plus one-year revision history and web clipper.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setDownloadBanner(
                        "Enable Encrypted Sync inside Cairn Preferences with a 30-day free trial."
                      )
                    }
                    className="mt-6 w-full rounded-md bg-[#1635B5] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0E237A] cursor-pointer"
                  >
                    Start 30-day sync trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/15 bg-[#0E237A] py-8 pb-20 text-sm text-[#B8C7FA]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 sm:flex-row sm:items-center sm:px-8">
          <p>Cairn Software. Fast local notes built for decades.</p>
          <div className="flex gap-6">
            <a href="#workspace" className="hover:text-white">
              Workspace
            </a>
            <a href="#capture" className="hover:text-white">
              Security
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
