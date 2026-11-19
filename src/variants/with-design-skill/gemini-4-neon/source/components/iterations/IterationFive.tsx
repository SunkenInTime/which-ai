"use client";

import { useState } from "react";

interface ThoughtTrail {
  id: string;
  tabLabel: string;
  phrase: string;
  entries: Array<{
    title: string;
    date: string;
    excerpt: string;
  }>;
}

const THOUGHT_TRAILS: Record<string, ThoughtTrail> = {
  fleeting: {
    id: "fleeting",
    tabLabel: "Observations",
    phrase: "fleeting observations",
    entries: [
      {
        title: "Train window note outside Basel",
        date: "October 2024",
        excerpt:
          "Orchard rows flash past like ruled ledger paper. Half of my useful writing starts as a two-line sentence caught before the moment blurs.",
      },
      {
        title: "Why voice memos rarely get revisited",
        date: "May 2025",
        excerpt:
          "Audio hides inside timelines. Plain text transcribed into a dated daily page surfaces whenever you search a single word months later.",
      },
    ],
  },
  notebooks: {
    id: "notebooks",
    tabLabel: "Old notebooks",
    phrase: "three notebooks ago",
    entries: [
      {
        title: "John Locke's commonplace index (1685)",
        date: "February 2025",
        excerpt:
          "Locke kept a two-page vowel index at the front of his blank books so disparate readings on medicine, law, and weather could converse across years.",
      },
      {
        title: "Paper notebooks vs searchable memory",
        date: "September 2025",
        excerpt:
          "Keep writing in ink when traveling, then type the three passages worth keeping into Cairn on Sunday morning. The rest can safely stay on the shelf.",
      },
    ],
  },
  markdown: {
    id: "markdown",
    tabLabel: "Plain files",
    phrase: "plain Markdown on your own drive",
    entries: [
      {
        title: "Format longevity note",
        date: "January 2026",
        excerpt:
          "Text files written in 1984 still open cleanly today without converters or subscriptions. Software should earn its place every year, never hold your library hostage.",
      },
      {
        title: "Backup checklist",
        date: "March 2026",
        excerpt:
          "Point Cairn at a standard folder. Back it up with an external drive, Git, or optional end-to-end encrypted sync when you want it on your phone.",
      },
    ],
  },
};

interface ClippableSentence {
  id: string;
  text: string;
  matchedNoteTitle: string;
  matchedNoteDate: string;
  matchedNoteText: string;
}

const READING_PASSAGE: ClippableSentence[] = [
  {
    id: "s1",
    text: "A commonplace book was never meant to be a polished encyclopedia; it was a conversation a reader held with their future self.",
    matchedNoteTitle: "Notes on Montaigne's essays",
    matchedNoteDate: "April 2025",
    matchedNoteText:
      "Montaigne treated quotations as kindling rather than authority, letting borrowed sentences spark his own digressions.",
  },
  {
    id: "s2",
    text: "When two passages copied four years apart sit side by side on a desk, a third idea almost always walks into the room unannounced.",
    matchedNoteTitle: "Serendipity in small archives",
    matchedNoteDate: "November 2025",
    matchedNoteText:
      "Unexpected links happen most often when notes stay short enough to scan in a single glance.",
  },
  {
    id: "s3",
    text: "The hard part of reading deeply is not finishing the chapter, but remembering why a single line stopped you mid-afternoon.",
    matchedNoteTitle: "Slow reading habit log",
    matchedNoteDate: "January 2026",
    matchedNoteText:
      "Pause for thirty seconds at the end of a chapter and write one plain sentence answering why it mattered today.",
  },
];

const SPECIFICATIONS = [
  {
    name: "Local files first",
    detail:
      "Every note is saved immediately as a standard Markdown file inside a normal folder on your computer. No proprietary database.",
  },
  {
    name: "Quiet backlinks",
    detail:
      "Mention another note by title or let Cairn suggest older pages that share themes with the paragraph you are drafting.",
  },
  {
    name: "Instant offline recall",
    detail:
      "Full-text search runs locally on your machine in milliseconds, even with tens of thousands of notes and zero internet connection.",
  },
  {
    name: "Daily scratch page",
    detail:
      "Open the app to a fresh dated sheet every morning. Jot meetings, book quotes, and half-baked ideas without inventing folder names.",
  },
  {
    name: "Optional encrypted sync",
    detail:
      "The desktop app is free forever. Add end-to-end encrypted sync across desktop and mobile for $6 a month when you want it.",
  },
  {
    name: "Calm reading typography",
    detail:
      "Measured line lengths, balanced margins, and zero notification badges so the screen feels closer to paper than to a dashboard.",
  },
];

export function IterationFive() {
  const [openTrailId, setOpenTrailId] = useState<string>("notebooks");
  const [clippedIds, setClippedIds] = useState<string[]>(["s2"]);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const openTrail = THOUGHT_TRAILS[openTrailId];

  function toggleClip(sentenceId: string) {
    setClippedIds((prev) =>
      prev.includes(sentenceId)
        ? prev.filter((id) => id !== sentenceId)
        : [...prev, sentenceId]
    );
  }

  const clippedItems = READING_PASSAGE.filter((s) => clippedIds.includes(s.id));

  return (
    <div
      className="min-h-screen bg-[#F3F0F7] text-[#26122B]"
      style={{ fontFamily: "var(--font-literata), Georgia, serif" }}
    >
      {/* Quiet book-like top bar */}
      <header className="border-b border-[#DCD5E4] bg-[#F3F0F7]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5 sm:px-8">
          <a href="#top" className="inline-flex items-center gap-2.5 text-[#26122B]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 19.5C5 18.1 6.1 17 7.5 17H19V4H7.5C6.1 4 5 5.1 5 6.5V19.5Z"
                stroke="#26122B"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M5 19.5C5 20.3 5.7 21 6.5 21H19"
                stroke="#3B541E"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path d="M9.5 8.5H15.5M9.5 12H13.5" stroke="#3B541E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-lg font-medium tracking-[-0.015em]">Cairn</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-[#5E4B63] sm:flex">
            <a href="#essay" className="hover:text-[#26122B] transition-colors">
              Letter
            </a>
            <a href="#clipper" className="hover:text-[#26122B] transition-colors">
              Try clipping
            </a>
            <a href="#details" className="hover:text-[#26122B] transition-colors">
              Details
            </a>
            <a href="#download" className="hover:text-[#26122B] transition-colors">
              Pricing
            </a>
          </nav>

          <button
            type="button"
            onClick={() =>
              setDownloadMessage(
                "Prepared Cairn 2.4 for macOS, Windows, and Linux. Free for local libraries."
              )
            }
            className="rounded-full bg-[#3B541E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2E4217] cursor-pointer"
          >
            Download
          </button>
        </div>
      </header>

      {downloadMessage && (
        <div
          role="status"
          className="border-b border-[#DFC77A] bg-[#F6E2A2] px-6 py-2.5 text-sm text-[#26122B]"
        >
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
            <span>{downloadMessage}</span>
            <button
              type="button"
              onClick={() => setDownloadMessage(null)}
              className="text-xs font-medium underline underline-offset-4 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <main id="top">
        {/* Signature Bold Element: Intimate Literary Essay with Interactive Marigold Thought Trails */}
        <article
          id="essay"
          className="mx-auto max-w-[44rem] px-6 pb-20 pt-16 sm:px-8 sm:pt-24"
        >
          <h1
            className="text-[2.35rem] leading-[1.12] font-normal tracking-[-0.022em] text-[#26122B] sm:text-[3.35rem]"
            style={{ fontVariationSettings: "'opsz' 60" }}
          >
            Your mind is for having ideas, not trying to hold onto all of them.
          </h1>

          <p className="mt-4 text-sm text-[#5E4B63]">
            Select any marigold phrase below to see how Cairn unfolds older
            connected notes directly inside your reading flow.
          </p>

          <div className="mt-10 space-y-6 text-[1.15rem] leading-[1.82] text-[#2E1A33]">
            <p>
              Most days you come across a dozen{" "}
              <button
                type="button"
                onClick={() => setOpenTrailId("fleeting")}
                aria-expanded={openTrailId === "fleeting"}
                className={`rounded-sm px-1 py-0.5 text-left transition-colors cursor-pointer ${
                  openTrailId === "fleeting"
                    ? "bg-[#F3D478] text-[#26122B] underline decoration-[#9B6B09] decoration-2 underline-offset-4"
                    : "bg-[#F6E2A2]/85 text-[#26122B] hover:bg-[#F3D478]"
                }`}
              >
                fleeting observations
              </button>{" "}
              worth keeping: a sentence in a book, a number from a paper, a
              question overheard on a walk. You promise yourself you will
              remember it when the right project arrives.
            </p>

            <p>
              Cairn is a digital commonplace book that keeps that promise for
              you. When you write a new paragraph, it quietly surfaces the
              related passage you saved{" "}
              <button
                type="button"
                onClick={() => setOpenTrailId("notebooks")}
                aria-expanded={openTrailId === "notebooks"}
                className={`rounded-sm px-0.5 py-0.5 text-left transition-colors cursor-pointer ${
                  openTrailId === "notebooks"
                    ? "bg-[#F3D478] text-[#26122B] underline decoration-[#9B6B09] decoration-2 underline-offset-4"
                    : "bg-[#F6E2A2]/85 text-[#26122B] hover:bg-[#F3D478]"
                }`}
              >
                three notebooks ago
              </button>, without asking you to maintain rigid folder hierarchies or tag
              taxonomies.
            </p>

            {/* Unfolded Inline Memory Shelf right inside the literary column */}
            {openTrail && (
              <aside
                aria-label={`Linked notes for ${openTrail.phrase}`}
                className="my-8 rounded-lg border border-[#D8CFE2] bg-white p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#EAE4F1] pb-3">
                  <span className="text-sm font-medium text-[#3B541E]">
                    Connected notes surfaced for &ldquo;{openTrail.phrase}&rdquo;
                  </span>
                  <div className="flex gap-1.5 text-xs">
                    {Object.values(THOUGHT_TRAILS).map((trail) => (
                      <button
                        key={trail.id}
                        type="button"
                        onClick={() => setOpenTrailId(trail.id)}
                        className={`rounded-full px-2.5 py-1 transition-colors cursor-pointer ${
                          trail.id === openTrailId
                            ? "bg-[#26122B] text-white"
                            : "bg-[#F3F0F7] text-[#5E4B63] hover:text-[#26122B]"
                        }`}
                      >
                        {trail.tabLabel}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 divide-y divide-[#EFEAF4]">
                  {openTrail.entries.map((entry) => (
                    <div key={entry.title} className="py-4 first:pt-1 last:pb-0">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="text-base font-medium text-[#26122B]">
                          {entry.title}
                        </h2>
                        <span className="text-xs text-[#6B5770]">
                          {entry.date}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[0.97rem] leading-[1.7] text-[#45314B]">
                        {entry.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </aside>
            )}

            <p>
              Just as important is what happens to your library ten years from
              now. Every page you write in Cairn lives as{" "}
              <button
                type="button"
                onClick={() => setOpenTrailId("markdown")}
                aria-expanded={openTrailId === "markdown"}
                className={`rounded-sm px-0.5 py-0.5 text-left transition-colors cursor-pointer ${
                  openTrailId === "markdown"
                    ? "bg-[#F3D478] text-[#26122B] underline decoration-[#9B6B09] decoration-2 underline-offset-4"
                    : "bg-[#F6E2A2]/85 text-[#26122B] hover:bg-[#F3D478]"
                }`}
              >
                plain Markdown on your own drive
              </button>. Your second brain should belong to you, never to a software
              company&apos;s server.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[#DCD5E4] pt-8">
            <button
              type="button"
              onClick={() =>
                setDownloadMessage(
                  "Downloading Cairn 2.4 for macOS. Free forever for local notebooks."
                )
              }
              className="rounded-full bg-[#3B541E] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2E4217] cursor-pointer"
            >
              Download Cairn for desktop
            </button>
            <a
              href="#clipper"
              className="text-sm font-medium text-[#3B541E] underline decoration-[#3B541E]/40 underline-offset-4 hover:decoration-[#3B541E]"
            >
              Try clipping a passage below
            </a>
          </div>
        </article>

        {/* Interactive Highlight-to-Clip Reading Playground */}
        <section
          id="clipper"
          className="border-t border-[#DCD5E4] bg-white py-20"
        >
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <div className="max-w-xl">
              <h2 className="text-2xl leading-snug font-normal tracking-[-0.02em] text-[#26122B] sm:text-3xl">
                Click any sentence to clip it into your second brain.
              </h2>
              <p className="mt-3 text-base leading-[1.7] text-[#5E4B63]">
                When you highlight a passage while reading, Cairn saves the
                excerpt and immediately pulls up older notes that echo the same
                idea.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-12">
              <div className="rounded-lg border border-[#E4DDEC] bg-[#FAF8FC] p-6 sm:p-8 lg:col-span-7">
                <div className="text-xs italic text-[#6B5770]">
                  Excerpt: On keeping a commonplace book
                </div>
                <p className="mt-4 text-[1.08rem] leading-[1.88] text-[#26122B]">
                  {READING_PASSAGE.map((sentence) => {
                    const isClipped = clippedIds.includes(sentence.id);
                    return (
                      <span key={sentence.id}>
                        <button
                          type="button"
                          onClick={() => toggleClip(sentence.id)}
                          aria-pressed={isClipped}
                          className={`inline rounded-sm px-0.5 text-left transition-colors cursor-pointer ${
                            isClipped
                              ? "bg-[#F6E2A2] text-[#26122B]"
                              : "hover:bg-[#EFE9F5]"
                          }`}
                        >
                          {sentence.text}
                        </button>{" "}
                      </span>
                    );
                  })}
                </p>
                <p className="mt-5 text-xs text-[#6B5770]">
                  Click a highlighted line again to remove it from the notebook tray.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="flex items-baseline justify-between border-b border-[#E4DDEC] pb-2.5">
                  <h3 className="text-sm font-medium text-[#26122B]">
                    Clipped and paired
                  </h3>
                  <span className="text-xs text-[#5E4B63]">
                    {clippedItems.length} saved
                  </span>
                </div>

                {clippedItems.length === 0 ? (
                  <div className="mt-4 rounded-lg border border-dashed border-[#D3C9DF] p-5 text-sm leading-relaxed text-[#5E4B63]">
                    Your tray is empty. Select any sentence on the left to clip
                    it and reveal its matching archive note.
                  </div>
                ) : (
                  <ul className="mt-4 space-y-4">
                    {clippedItems.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-lg border border-[#E4DDEC] bg-[#FAF8FC] p-4"
                      >
                        <div className="text-xs font-medium text-[#3B541E]">
                          Paired with {item.matchedNoteTitle} ({item.matchedNoteDate})
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#39243F]">
                          {item.matchedNoteText}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quiet open specification ledger (no card grid) */}
        <section
          id="details"
          className="border-t border-[#DCD5E4] bg-[#F3F0F7] py-20"
        >
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <h2 className="text-2xl font-normal tracking-[-0.02em] text-[#26122B] sm:text-3xl">
              What stays quiet under the surface
            </h2>

            <dl className="mt-10 grid gap-x-12 gap-y-8 border-t border-[#DCD5E4] pt-10 sm:grid-cols-2">
              {SPECIFICATIONS.map((item) => (
                <div key={item.name}>
                  <dt className="text-lg font-medium text-[#26122B]">
                    {item.name}
                  </dt>
                  <dd className="mt-2 text-[0.97rem] leading-[1.72] text-[#4C3952]">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Calm prose pricing & closing download bar */}
        <section
          id="download"
          className="border-t border-[#DCD5E4] bg-white py-20"
        >
          <div className="mx-auto max-w-[44rem] px-6 sm:px-8">
            <h2 className="text-2xl font-normal tracking-[-0.02em] text-[#26122B] sm:text-3xl">
              Free to keep on your computer. Six dollars a month for encrypted sync.
            </h2>

            <p className="mt-5 text-[1.05rem] leading-[1.78] text-[#433049]">
              Download Cairn for macOS, Windows, or Linux and write as many
              notes as you wish without creating an account. If you want your
              library synced end-to-end across desktop, iPhone, and Android with
              a full year of version history, turn on Cairn Sync for $6 a month
              or $60 a year.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setDownloadMessage(
                    "Prepared Cairn 2.4 for macOS (Apple Silicon & Intel)."
                  )
                }
                className="rounded-full bg-[#3B541E] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2E4217] cursor-pointer"
              >
                Download for macOS
              </button>
              <button
                type="button"
                onClick={() =>
                  setDownloadMessage("Prepared Cairn 2.4 for Windows (.exe).")
                }
                className="rounded-full border border-[#C9BDD8] bg-[#FAF8FC] px-5 py-3 text-sm font-medium text-[#26122B] transition-colors hover:border-[#26122B] cursor-pointer"
              >
                Windows
              </button>
              <button
                type="button"
                onClick={() =>
                  setDownloadMessage("Prepared Cairn 2.4 for Linux (.AppImage).")
                }
                className="rounded-full border border-[#C9BDD8] bg-[#FAF8FC] px-5 py-3 text-sm font-medium text-[#26122B] transition-colors hover:border-[#26122B] cursor-pointer"
              >
                Linux
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#DCD5E4] bg-[#F3F0F7] py-10 pb-20">
        <div className="mx-auto flex max-w-4xl flex-col justify-between gap-4 px-6 text-sm text-[#5E4B63] sm:flex-row sm:items-center sm:px-8">
          <p>Cairn. Set in Literata, built for libraries that age well.</p>
          <div className="flex gap-6">
            <a href="#essay" className="hover:text-[#26122B]">
              Letter
            </a>
            <a href="#details" className="hover:text-[#26122B]">
              Plain files
            </a>
            <a href="#download" className="hover:text-[#26122B]">
              Download
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
