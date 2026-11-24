"use client";

import { useMemo, useState } from "react";

interface WorkspaceNote {
  id: string;
  title: string;
  updated: string;
  content: string;
}

const INITIAL_WORKSPACE: WorkspaceNote[] = [
  {
    id: "second-brain-principles",
    title: "Second Brain Principles",
    updated: "Today, 14:02",
    content: `A second brain works best when capture takes under two seconds and retrieval requires zero folder hunting.

Keep each note focused on one clear idea, then link it to related pages like [[Q4 Product Architecture]] or [[Books to Revisit]].

When you open [[Daily Scratchpad]] tomorrow, every mention of this page appears automatically in the right inspector.`,
  },
  {
    id: "q4-product-architecture",
    title: "Q4 Product Architecture",
    updated: "Today, 11:30",
    content: `Core storage uses plain UTF-8 Markdown files watched by a lightweight local index.

Key decisions from [[Interview Notes: Elena]]:
1. Keep cold launch under 80 ms on vaults with 25,000 files.
2. Run full-text search locally before touching network sync.
3. Follow [[Second Brain Principles]] so backlinks update on every keystroke.`,
  },
  {
    id: "books-to-revisit",
    title: "Books to Revisit",
    updated: "Yesterday",
    content: `Short list of books that shaped how we think about tools for thought:

- How Buildings Learn by Stewart Brand
- A Pattern Language by Christopher Alexander
- Too Much to Know by Ann Blair

Pull two chapters into [[Second Brain Principles]] before publishing the handbook.`,
  },
  {
    id: "interview-notes-elena",
    title: "Interview Notes: Elena",
    updated: "Nov 21",
    content: `Elena manages research notes across six concurrent client engagements.

Her biggest bottleneck is losing context between meetings. Linking raw meeting notes directly to [[Q4 Product Architecture]] and [[Daily Scratchpad]] cut weekly review time in half.`,
  },
  {
    id: "daily-scratchpad",
    title: "Daily Scratchpad",
    updated: "Today, 09:05",
    content: `Morning priorities:
- Review backlink parser edge cases in [[Q4 Product Architecture]]
- Send follow-up questions after [[Interview Notes: Elena]]
- Add one new paragraph to [[Second Brain Principles]]

Try editing this note or typing [[Books to Revisit]] to see live connections update.`,
  },
];

type ShortcutCategory = "writing" | "linking" | "navigating";

const SHORTCUTS: Record<
  ShortcutCategory,
  { label: string; items: { keys: string; action: string; detail: string }[] }
> = {
  writing: {
    label: "Writing",
    items: [
      { keys: "Cmd + N", action: "Create blank note", detail: "Opens an untitled Markdown file inside your active vault." },
      { keys: "Cmd + Shift + D", action: "Open today's scratchpad", detail: "Creates or jumps straight to your dated daily note." },
      { keys: "Cmd + E", action: "Toggle reader and editor", detail: "Switch cleanly between formatted prose and raw Markdown." },
    ],
  },
  linking: {
    label: "Linking",
    items: [
      { keys: "[[", action: "Insert note link", detail: "Fuzzy-search any existing note title or create a new target inline." },
      { keys: "Cmd + Shift + B", action: "Toggle backlinks pane", detail: "Inspect every note and unlinked mention pointing to this document." },
      { keys: "Cmd + R", action: "Rename across vault", detail: "Updates the filename and rewrites every incoming link atomically." },
    ],
  },
  navigating: {
    label: "Navigating",
    items: [
      { keys: "Cmd + K", action: "Quick switcher", detail: "Jump to any note across 20,000 local files in milliseconds." },
      { keys: "Cmd + Shift + F", action: "Full-text vault search", detail: "Search inside notes, frontmatter, and indexed PDF attachments." },
      { keys: "Cmd + [", action: "Navigate history back", detail: "Step smoothly backward through your recent trail of linked thoughts." },
    ],
  },
};

function renderFormattedLines(
  content: string,
  notes: WorkspaceNote[],
  onSelectNote: (id: string) => void
) {
  const lines = content.split("\n");
  return lines.map((line, lineIdx) => {
    if (!line.trim()) {
      return <div key={lineIdx} className="h-4" />;
    }

    const parts = line.split(/(\[\[[^\]]+\]\])/g);
    return (
      <p
        key={lineIdx}
        className="text-[length:var(--text-body)] leading-relaxed text-[#1E222B]"
      >
        {parts.map((part, partIdx) => {
          const match = part.match(/^\[\[([^\]]+)\]\]$/);
          if (!match) {
            return <span key={partIdx}>{part}</span>;
          }
          const linkTitle = match[1];
          const target = notes.find(
            (n) => n.title.toLowerCase() === linkTitle.toLowerCase()
          );
          return (
            <button
              key={partIdx}
              type="button"
              onClick={() => target && onSelectNote(target.id)}
              className={`inline font-medium underline decoration-[#0D7A6F]/50 underline-offset-4 cursor-pointer transition-colors duration-150 ${
                target
                  ? "text-[#0D7A6F] hover:text-[#095C54]"
                  : "text-[#555C6B]"
              }`}
            >
              {linkTitle}
            </button>
          );
        })}
      </p>
    );
  });
}

export default function IterationFivePage() {
  const [notes, setNotes] = useState<WorkspaceNote[]>(INITIAL_WORKSPACE);
  const [activeId, setActiveId] = useState<string>(INITIAL_WORKSPACE[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [editorMode, setEditorMode] = useState<"read" | "write">("read");
  const [newTitle, setNewTitle] = useState("");
  const [shortcutTab, setShortcutTab] = useState<ShortcutCategory>("writing");

  const activeNote =
    notes.find((note) => note.id === activeId) ?? notes[0];

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }, [notes, searchQuery]);

  // Dynamically compute incoming backlinks from live note contents
  const backlinks = useMemo(() => {
    const token = `[[${activeNote.title}]]`.toLowerCase();
    return notes
      .filter(
        (n) =>
          n.id !== activeNote.id &&
          n.content.toLowerCase().includes(token)
      )
      .map((source) => {
        const matchingLine =
          source.content
            .split("\n")
            .find((line) => line.toLowerCase().includes(token)) ??
          source.content.slice(0, 110);
        return {
          id: source.id,
          title: source.title,
          excerpt: matchingLine.replace(/\[\[|\]\]/g, ""),
        };
      });
  }, [activeNote, notes]);

  // Dynamically compute outgoing links
  const outgoingLinks = useMemo(() => {
    const matches = Array.from(
      activeNote.content.matchAll(/\[\[([^\]]+)\]\]/g)
    ).map((m) => m[1]);
    const uniqueTitles = Array.from(new Set(matches));
    return uniqueTitles
      .map((title) =>
        notes.find((n) => n.title.toLowerCase() === title.toLowerCase())
      )
      .filter((n): n is WorkspaceNote => Boolean(n));
  }, [activeNote, notes]);

  const wordCount = useMemo(() => {
    return activeNote.content
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }, [activeNote.content]);

  const handleUpdateContent = (value: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === activeNote.id
          ? { ...note, content: value, updated: "Edited just now" }
          : note
      )
    );
  };

  const handleCreateNote = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    const id = `${trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    const created: WorkspaceNote = {
      id,
      title: trimmed,
      updated: "Just created",
      content: `Linked from [[${activeNote.title}]].\n\nStart writing your note here...`,
    };
    setNotes((prev) => [created, ...prev]);
    setActiveId(id);
    setNewTitle("");
    setEditorMode("write");
  };

  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#14171F]">
      {/* Compact single-line utility masthead opening directly into live workspace */}
      <header className="sticky top-0 z-40 bg-[#F3F5F7]/95 backdrop-blur-md border-b border-[#D9DFE6]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 gap-4">
          <div className="flex items-baseline gap-4 min-w-0">
            <a
              href="#workspace"
              className="text-[1.45rem] font-bold leading-none tracking-[-0.03em] text-[#14171F] shrink-0"
            >
              Cairn
            </a>
            <span className="hidden lg:inline text-[length:var(--text-sm)] text-[#555C6B] truncate">
              Local Markdown second brain with instant bidirectional links
            </span>
          </div>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7 text-[length:var(--text-sm)] text-[#555C6B]"
          >
            <a href="#workspace" className="hover:text-[#14171F] transition-colors duration-150">
              Live sandbox
            </a>
            <a href="#shortcuts" className="hover:text-[#14171F] transition-colors duration-150">
              Shortcuts
            </a>
            <a href="#architecture" className="hover:text-[#14171F] transition-colors duration-150">
              Local storage
            </a>
          </nav>

          <a
            href="#download"
            className="rounded-lg bg-[#0D7A6F] px-4 py-2 text-[length:var(--text-sm)] font-semibold text-white hover:bg-[#0A6259] transition-colors duration-150 shrink-0"
          >
            Download for macOS
          </a>
        </div>
      </header>

      <main>
        {/* Immediate Live Interactive Workspace opening viewport */}
        <section id="workspace" className="px-4 sm:px-6 pt-6 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
              <div>
                <h1 className="text-[clamp(1.75rem,3.2vw,2.65rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#14171F]">
                  Try the workspace right here
                </h1>
                <p className="mt-1.5 text-[length:var(--text-body)] text-[#555C6B]">
                  Click any linked title, switch to write mode, or add a new note to watch backlinks update live.
                </p>
              </div>

              {/* Connected Read / Write segmented control */}
              <div
                role="tablist"
                aria-label="Editor view mode"
                className="inline-flex self-start rounded-lg bg-[#E4E8EE] p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={editorMode === "read"}
                  onClick={() => setEditorMode("read")}
                  className={`rounded-md px-4 py-1.5 text-[length:var(--text-sm)] font-medium cursor-pointer transition-colors duration-150 ${
                    editorMode === "read"
                      ? "bg-white text-[#14171F] shadow-xs"
                      : "text-[#555C6B] hover:text-[#14171F]"
                  }`}
                >
                  Read
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={editorMode === "write"}
                  onClick={() => setEditorMode("write")}
                  className={`rounded-md px-4 py-1.5 text-[length:var(--text-sm)] font-medium cursor-pointer transition-colors duration-150 ${
                    editorMode === "write"
                      ? "bg-white text-[#14171F] shadow-xs"
                      : "text-[#555C6B] hover:text-[#14171F]"
                  }`}
                >
                  Edit Markdown
                </button>
              </div>
            </div>

            {/* Live Three-Pane Application Surface */}
            <div className="rounded-xl border border-[#D4DBE3] bg-white shadow-[0_18px_50px_-24px_rgba(20,23,31,0.14)] overflow-hidden grid grid-cols-1 lg:grid-cols-[260px_1fr_290px] min-h-[540px] divide-y lg:divide-y-0 lg:divide-x divide-[#E3E7ED]">
              {/* Left Vault Explorer */}
              <aside className="bg-[#FAFBFD] p-4 flex flex-col justify-between">
                <div>
                  <div className="mb-3">
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter notes..."
                      aria-label="Filter notes"
                      className="w-full rounded-lg border border-[#D8DFE8] bg-white px-3 py-2 text-[length:var(--text-sm)] text-[#14171F] placeholder:text-[#6B7280] focus:border-[#0D7A6F] focus:outline-none"
                    />
                  </div>

                  <div
                    role="listbox"
                    aria-label="Vault notes"
                    className="space-y-1"
                  >
                    {filteredNotes.map((note) => {
                      const active = note.id === activeNote.id;
                      return (
                        <button
                          key={note.id}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => setActiveId(note.id)}
                          className={`w-full text-left rounded-lg px-3 py-2.5 cursor-pointer transition-colors duration-150 ${
                            active
                              ? "bg-[#E6F2F0] text-[#0A5C54] font-semibold"
                              : "text-[#323846] hover:bg-[#EFF2F6]"
                          }`}
                        >
                          <div className="text-[length:var(--text-sm)] truncate">
                            {note.title}
                          </div>
                          <div className="text-[length:var(--text-sm)] font-normal text-[#555C6B] mt-0.5 tabular-nums">
                            {note.updated}
                          </div>
                        </button>
                      );
                    })}
                    {filteredNotes.length === 0 && (
                      <p className="px-3 py-4 text-[length:var(--text-sm)] text-[#555C6B]">
                        No notes match your filter.
                      </p>
                    )}
                  </div>
                </div>

                <form
                  onSubmit={handleCreateNote}
                  className="mt-4 pt-3 border-t border-[#E3E7ED] flex gap-2"
                >
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="New note title..."
                    aria-label="New note title"
                    className="min-w-0 flex-1 rounded-md border border-[#D8DFE8] bg-white px-2.5 py-1.5 text-[length:var(--text-sm)] text-[#14171F] placeholder:text-[#6B7280] focus:border-[#0D7A6F] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-[#14171F] px-3 py-1.5 text-[length:var(--text-sm)] font-medium text-white hover:bg-[#2A2F3D] cursor-pointer transition-colors duration-150"
                  >
                    Add
                  </button>
                </form>
              </aside>

              {/* Center Document Canvas */}
              <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-[#ECEFF3]">
                    <h2 className="text-[length:var(--text-heading)] font-bold tracking-[-0.025em] text-[#14171F] leading-tight">
                      {activeNote.title}
                    </h2>
                    <span
                      className="text-[length:var(--text-sm)] text-[#555C6B] tabular-nums"
                      style={{ fontFamily: "var(--font-iter5-mono), monospace" }}
                    >
                      {activeNote.id}.md
                    </span>
                  </div>

                  <div className="mt-6">
                    {editorMode === "read" ? (
                      <div className="space-y-1 max-w-[62ch]">
                        {renderFormattedLines(
                          activeNote.content,
                          notes,
                          setActiveId
                        )}
                      </div>
                    ) : (
                      <textarea
                        value={activeNote.content}
                        onChange={(e) => handleUpdateContent(e.target.value)}
                        aria-label="Markdown editor"
                        rows={11}
                        className="w-full resize-y rounded-lg border border-[#D8DFE8] bg-[#FAFBFD] p-4 text-[length:var(--text-body)] leading-relaxed text-[#14171F] focus:border-[#0D7A6F] focus:outline-none"
                        style={{
                          fontFamily: "var(--font-iter5-mono), monospace",
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#ECEFF3] flex flex-wrap items-center justify-between gap-3 text-[length:var(--text-sm)] text-[#555C6B] tabular-nums">
                  <span>{wordCount} words</span>
                  <span>
                    {backlinks.length} incoming, {outgoingLinks.length} outgoing links
                  </span>
                </div>
              </div>

              {/* Right Live Backlinks Inspector */}
              <aside className="bg-[#FAFBFD] p-5 flex flex-col gap-6">
                <div>
                  <h3 className="text-[length:var(--text-sm)] font-semibold text-[#14171F] pb-2.5 border-b border-[#E3E7ED]">
                    Incoming backlinks ({backlinks.length})
                  </h3>

                  {backlinks.length > 0 ? (
                    <div className="mt-3 divide-y divide-[#E6EAF0]">
                      {backlinks.map((item) => (
                        <div key={item.id} className="py-3 first:pt-0">
                          <button
                            type="button"
                            onClick={() => setActiveId(item.id)}
                            className="text-left text-[length:var(--text-sm)] font-semibold text-[#0D7A6F] hover:underline cursor-pointer"
                          >
                            {item.title}
                          </button>
                          <p className="mt-1 text-[length:var(--text-sm)] leading-relaxed text-[#555C6B]">
                            {item.excerpt}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 text-[length:var(--text-sm)] text-[#555C6B]">
                      No other notes link here yet. Reference this title inside double brackets from another note.
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-[length:var(--text-sm)] font-semibold text-[#14171F] pb-2.5 border-b border-[#E3E7ED]">
                    Outgoing links ({outgoingLinks.length})
                  </h3>
                  {outgoingLinks.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {outgoingLinks.map((target) => (
                        <li key={target.id}>
                          <button
                            type="button"
                            onClick={() => setActiveId(target.id)}
                            className="text-[length:var(--text-sm)] font-medium text-[#14171F] hover:text-[#0D7A6F] cursor-pointer transition-colors duration-150"
                          >
                            {target.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-[length:var(--text-sm)] text-[#555C6B]">
                      Add [[Note Title]] in edit mode to create a link.
                    </p>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Keyboard Shortcut Reference */}
        <section id="shortcuts" className="py-20 md:py-28 px-6 bg-white border-t border-[#DCE1E8]">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E3E7ED]">
              <div>
                <h2 className="text-[length:var(--text-heading)] font-bold leading-[1.1] tracking-[-0.025em] text-[#14171F]">
                  Built for hands on the keyboard
                </h2>
                <p className="mt-3 text-[length:var(--text-body)] text-[#555C6B] max-w-[54ch]">
                  Every command is reachable from a consistent chord so writing and linking happen without breaking stride.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Shortcut categories"
                className="inline-flex self-start rounded-lg bg-[#EFF2F6] p-1"
              >
                {(Object.keys(SHORTCUTS) as ShortcutCategory[]).map((cat) => {
                  const active = cat === shortcutTab;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setShortcutTab(cat)}
                      className={`rounded-md px-4 py-2 text-[length:var(--text-sm)] font-medium cursor-pointer transition-colors duration-150 ${
                        active
                          ? "bg-white text-[#14171F] shadow-xs"
                          : "text-[#555C6B] hover:text-[#14171F]"
                      }`}
                    >
                      {SHORTCUTS[cat].label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="divide-y divide-[#E3E7ED]">
              {SHORTCUTS[shortcutTab].items.map((item) => (
                <div
                  key={item.keys}
                  className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-3">
                    <kbd
                      className="inline-block rounded-md border border-[#CFD6E0] bg-[#F5F7FA] px-2.5 py-1 text-[length:var(--text-sm)] font-medium text-[#14171F]"
                      style={{ fontFamily: "var(--font-iter5-mono), monospace" }}
                    >
                      {item.keys}
                    </kbd>
                  </div>
                  <div className="sm:col-span-4 font-semibold text-[length:var(--text-body)] text-[#14171F]">
                    {item.action}
                  </div>
                  <div className="sm:col-span-5 text-[length:var(--text-body)] text-[#555C6B]">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Local Storage Engineering Breakdown */}
        <section id="architecture" className="py-20 md:py-28 px-6 bg-[#F3F5F7] border-t border-[#DCE1E8]">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-[length:var(--text-heading)] font-bold leading-[1.1] tracking-[-0.025em] text-[#14171F] max-w-2xl">
              Plain files on disk, encrypted sync when you want it
            </h2>
            <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-[#555C6B] max-w-[58ch]">
              Cairn never traps your thinking inside a remote database. Point the app at any folder on your drive and your entire library stays versionable with Git, Time Machine, or your preferred backup tool.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 pt-8 border-t border-[#D6DCE5]">
              <div>
                <h3 className="text-[length:var(--text-body)] font-semibold text-[#14171F]">
                  Instant local indexing
                </h3>
                <p className="mt-2.5 text-[length:var(--text-body)] leading-relaxed text-[#555C6B]">
                  Search across twenty thousand Markdown notes and attached PDFs with sub-20 millisecond latency offline.
                </p>
              </div>
              <div>
                <h3 className="text-[length:var(--text-body)] font-semibold text-[#14171F]">
                  Zero-knowledge mobile sync
                </h3>
                <p className="mt-2.5 text-[length:var(--text-body)] leading-relaxed text-[#555C6B]">
                  Optional sync encrypts every file locally with your own recovery key before transferring delta updates.
                </p>
              </div>
              <div>
                <h3 className="text-[length:var(--text-body)] font-semibold text-[#14171F]">
                  Readable fifty years from now
                </h3>
                <p className="mt-2.5 text-[length:var(--text-body)] leading-relaxed text-[#555C6B]">
                  Standard Markdown syntax and human-readable wiki-links ensure your archive remains usable in any editor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Direct Download & Pricing Band */}
        <section id="download" className="py-20 md:py-24 px-6 bg-[#14171F] text-white">
          <div className="mx-auto max-w-5xl flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="text-[length:var(--text-heading)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
                Start your local vault in sixty seconds
              </h2>
              <p className="mt-3 text-[length:var(--text-body)] text-[#B8C0CE] max-w-[52ch]">
                Free forever for local desktop vaults on macOS, Windows, and Linux. Add encrypted multi-device sync for $8 per month.
              </p>
            </div>
            <a
              href="#workspace"
              className="inline-flex self-start md:self-auto items-center justify-center rounded-lg bg-[#0D7A6F] px-7 py-4 text-[length:var(--text-body)] font-semibold text-white hover:bg-[#109386] transition-colors duration-150 shrink-0"
            >
              Download Cairn 2.4
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#14171F] text-[#9BA4B5] border-t border-[#252B37] py-10 px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-[1.25rem] font-bold text-white tracking-[-0.03em]">
            Cairn
          </div>
          <div className="flex flex-wrap gap-7 text-[length:var(--text-sm)]">
            <a href="#workspace" className="hover:text-white transition-colors duration-150">
              Live sandbox
            </a>
            <a href="#shortcuts" className="hover:text-white transition-colors duration-150">
              Shortcuts
            </a>
            <a href="#architecture" className="hover:text-white transition-colors duration-150">
              Local storage
            </a>
            <a href="#download" className="hover:text-white transition-colors duration-150">
              Download
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
