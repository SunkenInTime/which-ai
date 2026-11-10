"use client";

import { useMemo, useState } from "react";

interface StoredMemory {
  id: string;
  title: string;
  body: string;
  recordedAt: string;
  source: string;
  keywords: string[];
}

const INITIAL_MEMORIES: StoredMemory[] = [
  {
    id: "m1",
    title: "Calvino on lightness as precision, not vagueness",
    body: "In Six Memos for the Next Millennium (p. 16), Calvino insists lightness comes from exact language and removing dead weight, never from hazy impressionism.",
    recordedAt: "11 months ago",
    source: "Book note, p. 16",
    keywords: [
      "calvino",
      "lightness",
      "quickness",
      "precision",
      "weight",
      "prose",
      "writing",
      "memos",
    ],
  },
  {
    id: "m2",
    title: "Footbridge stay-cable dampers in crosswinds",
    body: "Rain-wind rivulets along inclined steel cables trigger vortex oscillation unless spiral fillets break up the water bead before resonance builds.",
    recordedAt: "4 months ago",
    source: "Structural engineering lecture",
    keywords: [
      "bridge",
      "cable",
      "vibration",
      "wind",
      "winter",
      "span",
      "steel",
      "lightness",
      "resonance",
    ],
  },
  {
    id: "m3",
    title: "Why heavy prose slows down technical postmortems",
    body: "Teams skip reading forty-page incident reports; a crisp 300-word timeline with linked command logs gets read before the next deploy.",
    recordedAt: "6 weeks ago",
    source: "Engineering journal",
    keywords: [
      "quickness",
      "writing",
      "prose",
      "lightness",
      "timeline",
      "calvino",
      "clarity",
    ],
  },
  {
    id: "m4",
    title: "Pozzuoli harbor concrete and unslaked lime pockets",
    body: "Seawater percolating through micro-fissures dissolves calcium reservoirs from hot-mixed quicklime, sealing cracks automatically over centuries.",
    recordedAt: "8 months ago",
    source: "Science Advances clipping",
    keywords: [
      "concrete",
      "harbor",
      "water",
      "cold",
      "piers",
      "lime",
      "roman",
      "repair",
    ],
  },
  {
    id: "m5",
    title: "Cold-water curing schedules for winter bridge decks",
    body: "Insulated blankets hold hydration heat during the first 48 hours so surface pores close tightly before road salt exposure.",
    recordedAt: "2 months ago",
    source: "Site visit, Montreal",
    keywords: [
      "cold",
      "water",
      "concrete",
      "winter",
      "bridge",
      "curing",
      "harbor",
      "piers",
    ],
  },
  {
    id: "m6",
    title: "Pocket voice memo from ferry deck",
    body: "Timber pilings flex eighteen centimeters when the ferry docks instead of shattering like rigid seawalls. Absorb the load rather than fighting it.",
    recordedAt: "3 weeks ago",
    source: "Offline voice transcript",
    keywords: [
      "harbor",
      "piers",
      "water",
      "bridge",
      "wind",
      "timber",
      "flex",
    ],
  },
];

const STOPWORDS = new Set([
  "and",
  "the",
  "for",
  "with",
  "from",
  "into",
  "that",
  "this",
  "how",
  "why",
  "when",
  "are",
  "was",
  "were",
  "have",
  "has",
  "had",
  "not",
  "but",
  "you",
  "your",
  "our",
  "out",
  "all",
  "any",
  "can",
  "check",
  "compare",
  "short",
]);

const QUICK_PROMPTS = [
  {
    label: "Try: Calvino & lightness",
    text: "Re-reading Calvino on lightness and quickness in short essays",
  },
  {
    label: "Try: Bridge wind vibration",
    text: "Check how bridge cable vibration behaves in winter crosswinds",
  },
  {
    label: "Try: Cold harbor concrete",
    text: "Compare cold-water concrete curing on exposed harbor piers",
  },
];

export default function IterationFivePage() {
  const [draft, setDraft] = useState(
    "Re-reading Calvino on lightness and quickness in short essays"
  );
  const [memories, setMemories] = useState<StoredMemory[]>(INITIAL_MEMORIES);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const surfaced = useMemo(() => {
    const tokens = draft
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length >= 3 && !STOPWORDS.has(word));

    if (tokens.length === 0) {
      return memories.slice(0, 2).map((item) => ({ item, matched: [] as string[] }));
    }

    const scored = memories
      .map((item) => {
        const haystack = `${item.title} ${item.body} ${item.keywords.join(" ")}`.toLowerCase();
        const matched = Array.from(
          new Set(tokens.filter((tok) => haystack.includes(tok)))
        );
        return { item, matched, score: matched.length };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
      return memories.slice(0, 2).map((item) => ({ item, matched: [] as string[] }));
    }

    return scored.slice(0, 3);
  }, [draft, memories]);

  function handleSaveNote() {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const words = trimmed.split(/\s+/);
    const generatedTitle =
      words.slice(0, 8).join(" ") + (words.length > 8 ? "..." : "");
    const extractedKeywords = trimmed
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3);

    const newEntry: StoredMemory = {
      id: `user-${Date.now()}`,
      title: generatedTitle,
      body: trimmed,
      recordedAt: "Saved just now",
      source: "Live scratchpad",
      keywords: extractedKeywords,
    };

    setMemories((prev) => [newEntry, ...prev]);
    setDraft("");
    setSavedNotice("Saved to local vault. Type a related word to recall it.");
  }

  return (
    <div
      className="min-h-screen bg-[#F4F6F9] text-[#141923] selection:bg-[#1849D6] selection:text-white"
      style={{ fontFamily: "var(--font-schibsted), system-ui, sans-serif" }}
    >
      {/* Top Instrument Bar */}
      <header className="border-b border-[#CFD6E0] bg-[#F4F6F9]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-3 w-3 rounded-full bg-[#E87411]"
            />
            <span className="text-xl font-bold tracking-tight text-[#141923]">
              Cairn
            </span>
            <span className="hidden rounded border border-[#C7D0DC] bg-[#E8ECF2] px-2 py-0.5 text-xs font-medium text-[#475366] sm:inline">
              12ms global capture
            </span>
          </div>

          <nav aria-label="Primary" className="flex items-center gap-6 text-sm font-medium">
            <a
              href="#hardware-feel"
              className="hidden text-[#434F63] hover:text-[#141923] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1849D6] sm:inline"
            >
              How capture works
            </a>
            <a
              href="#download-recorder"
              className="rounded-lg border-b-2 border-[#0E3199] bg-[#1849D6] px-4 py-2 text-white transition-colors hover:bg-[#1E54EC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1849D6]"
            >
              Download Cairn
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Headline + Working Live Scratchpad Instrument */}
        <section className="mx-auto max-w-4xl px-6 pt-12 pb-20 sm:px-10 sm:pt-16">
          <div className="text-center">
            <h1 className="mx-auto max-w-[20ch] text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#141923] sm:text-5xl lg:text-[3.5rem]">
              Catch the thought before you have to name the folder.
            </h1>
            <p className="mx-auto mt-5 max-w-[54ch] text-lg leading-[1.6] text-[#434F63]">
              Good ideas vanish while heavyweight workspace apps are still
              loading their sidebar. Cairn opens instantaneously over any window
              and recalls matching notes as you type.
            </p>
          </div>

          {/* Physical-Feeling Polycarbonate Capture Chassis */}
          <div className="mt-10 rounded-2xl border border-[#C2CBD8] bg-[#E2E6EC] p-3 sm:p-5">
            {/* Chassis Top Plate */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-medium text-[#475366]">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[#E87411]"
                />
                <span>Live capture buffer (type anything below to test recall)</span>
              </div>
              <span>Vault size: {memories.length} sample notes</span>
            </div>

            {/* Tactile White Input Well */}
            <div className="rounded-xl border border-[#BCC6D4] bg-white p-4 sm:p-5">
              <label htmlFor="cairn-live-capture" className="sr-only">
                Write a note to test live recall
              </label>
              <textarea
                id="cairn-live-capture"
                rows={3}
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  if (savedNotice) setSavedNotice(null);
                }}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    handleSaveNote();
                  }
                }}
                placeholder="Type a rough thought, book quote, or question..."
                className="w-full resize-none bg-transparent text-base leading-relaxed text-[#141923] placeholder:text-[#7B879B] focus:outline-none sm:text-[17px]"
                style={{ fontFamily: "var(--font-recursive), monospace" }}
              />

              {/* Mechanical Keycap Action Row */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#E6EAF0] pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setDraft(preset.text);
                        setSavedNotice(null);
                      }}
                      className="rounded-md border border-[#CBD3DF] border-b-2 bg-[#F4F6F9] px-2.5 py-1 text-xs font-medium text-[#2E3848] transition-colors hover:bg-[#E8ECF2] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1849D6]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="hidden text-xs text-[#687588] sm:inline">
                    Cmd + Enter
                  </span>
                  <button
                    type="button"
                    onClick={handleSaveNote}
                    className="rounded-lg border-b-2 border-[#B35306] bg-[#E87411] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#F3811F] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1849D6]"
                  >
                    Save note to vault
                  </button>
                </div>
              </div>
            </div>

            {savedNotice && (
              <p
                role="status"
                className="mt-3 rounded-lg border border-[#1849D6]/25 bg-[#1849D6]/10 px-3.5 py-2 text-xs font-medium text-[#143AA8]"
              >
                {savedNotice}
              </p>
            )}

            {/* Instantaneous Recall Readout Bay */}
            <div className="mt-4" aria-live="polite">
              <div className="mb-2 flex items-center justify-between px-1 text-xs font-semibold text-[#364153]">
                <span>
                  {draft.trim()
                    ? "Surfaced from your past notes while you type:"
                    : "Recent notes in local vault:"}
                </span>
                <span>0.4ms local lookup</span>
              </div>

              <div className="space-y-2">
                {surfaced.map(({ item, matched }) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-[#C7D0DC] bg-[#FAFBFD] p-4 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5B677A]">
                      <span className="font-semibold text-[#1849D6]">
                        {item.source}
                      </span>
                      <div className="flex items-center gap-2">
                        {matched.length > 0 && (
                          <span className="rounded bg-[#E87411]/15 px-2 py-0.5 font-medium text-[#B85704]">
                            Matched: {matched.slice(0, 3).join(", ")}
                          </span>
                        )}
                        <span>{item.recordedAt}</span>
                      </div>
                    </div>
                    <h2 className="mt-1.5 text-base font-semibold text-[#141923]">
                      {item.title}
                    </h2>
                    <p className="mt-1 max-w-[66ch] text-sm leading-relaxed text-[#434F63]">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industrial Specification Chassis Modules */}
        <section
          id="hardware-feel"
          className="border-y border-[#CFD6E0] bg-[#E8ECF2] py-20 lg:py-24"
        >
          <div className="mx-auto max-w-5xl px-6 sm:px-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#141923] sm:text-4xl">
                Built with the responsiveness of a dedicated pocket recorder.
              </h2>
              <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-[#434F63]">
                Every millisecond of friction between having an idea and writing
                it down costs you notes you meant to keep. Cairn removes logins,
                spinners, and mandatory filing steps.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#C2CBD8] bg-[#C2CBD8] md:grid-cols-2">
              <div className="bg-[#F8FAFC] p-7 sm:p-9">
                <div className="inline-flex items-center gap-1.5 rounded border border-[#CBD3DF] border-b-2 bg-[#EEF1F6] px-2.5 py-1 text-xs font-semibold text-[#141923]">
                  Option + Space
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#141923]">
                  Summon over any fullscreen app
                </h3>
                <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-[#434F63]">
                  Jot a realization mid-call or clip the active browser tab with
                  its URL and selected quote, then press Escape to return right
                  to where your cursor was.
                </p>
              </div>

              <div className="bg-[#F8FAFC] p-7 sm:p-9">
                <div className="inline-flex items-center gap-1.5 rounded border border-[#CBD3DF] border-b-2 bg-[#EEF1F6] px-2.5 py-1 text-xs font-semibold text-[#141923]">
                  On-device Whisper
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#141923]">
                  Speak on a walk, read clean prose at your desk
                </h3>
                <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-[#434F63]">
                  Hold the side button on your phone or watch to record a
                  forty-second voice memo offline. Cairn transcribes it locally
                  and links it to related written notes automatically.
                </p>
              </div>

              <div className="bg-[#F8FAFC] p-7 sm:p-9">
                <div className="inline-flex items-center gap-1.5 rounded border border-[#CBD3DF] border-b-2 bg-[#EEF1F6] px-2.5 py-1 text-xs font-semibold text-[#141923]">
                  Plain `.md` storage
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#141923]">
                  Zero lock-in, readable by any text editor
                </h3>
                <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-[#434F63]">
                  Every note lands in an ordinary folder on your drive. Back it
                  up with Time Machine, grep it from your terminal, or edit
                  files side-by-side in Zed or Vim.
                </p>
              </div>

              <div className="bg-[#F8FAFC] p-7 sm:p-9">
                <div className="inline-flex items-center gap-1.5 rounded border border-[#CBD3DF] border-b-2 bg-[#EEF1F6] px-2.5 py-1 text-xs font-semibold text-[#141923]">
                  XChaCha20 sync
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#141923]">
                  End-to-end encrypted across all your devices
                </h3>
                <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-[#434F63]">
                  Keys never leave your hardware. Sync ten thousand notes and
                  audio clips between Mac, iPhone, Linux, and Windows without
                  exposing a single word to our servers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tactile Bottom Download Plate */}
        <section id="download-recorder" className="mx-auto max-w-5xl px-6 py-20 sm:px-10">
          <div className="rounded-2xl border border-[#C2CBD8] bg-[#141923] p-8 text-[#F4F6F9] sm:p-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
                  Ready the next time an idea crosses your mind.
                </h2>
                <p className="mt-3 max-w-[50ch] text-base leading-relaxed text-[#B6C0D0]">
                  Download the native 14 MB app for free. Unlimited local notes
                  forever, or $5/month for encrypted pocket sync.
                </p>
              </div>
              <div className="flex flex-wrap gap-3.5 lg:col-span-5 lg:justify-end">
                <a
                  href="#download-recorder"
                  className="rounded-lg border-b-2 border-[#0E3199] bg-[#1849D6] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#2155EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Download for macOS
                </a>
                <a
                  href="#download-recorder"
                  className="rounded-lg border border-white/25 bg-white/10 px-5 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  iOS, Windows & Linux
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#CFD6E0] bg-[#E8ECF2] py-7 text-xs text-[#546073]">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-4 px-6 sm:flex-row sm:px-10">
          <span>Cairn Native Recorder & Vault (v2.4, 14.2 MB universal binary)</span>
          <div className="flex flex-wrap gap-6">
            <a href="#hardware-feel" className="hover:text-[#141923]">
              Encryption whitepaper
            </a>
            <a href="#hardware-feel" className="hover:text-[#141923]">
              CLI companion
            </a>
            <a href="#download-recorder" className="hover:text-[#141923]">
              All downloads
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
