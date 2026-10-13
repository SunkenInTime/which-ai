import Image from "next/image";
import Link from "next/link";
import {
  Cpu,
  HardDrives,
  GitBranch,
  LockKey,
  ArrowRight,
  TerminalWindow,
  DownloadSimple,
  Quotes,
} from "@phosphor-icons/react/dist/ssr";
import { TrustedLogos } from "../components/TrustedLogos";
import { Z_INDEX } from "../components/z-index";
import { CortexRecallEngine, CortexReveal } from "./CortexInteractive";

/**
 * ITERATION /2: CORTEX
 * Design Read: "Reading this as: technical SaaS landing page for engineers and systems thinkers, with a dark-tech local-first precision language, leaning toward Tailwind v4 + Space Grotesk & JetBrains Mono + Zinc & Emerald palette."
 * Dials: DESIGN_VARIANCE: 7, MOTION_INTENSITY: 6, VISUAL_DENSITY: 5
 * Palette Lock (Section 4.2): Zinc neutrals (zinc-50 / dark:zinc-950) + single Emerald accent (emerald-600 / dark:emerald-500).
 * Shape Lock (Section 4.4): rounded-xl across all containers, buttons, and inputs.
 * CTA Intent Lock (Section 4.5): "Download local app" used for all primary action CTAs.
 */

/* Sample benchmark data explicitly labeled as mock/sample per Section 4.9 */
const BENCHMARK_CARDS = [
  {
    spec: "Full-Vault Trigram + Vector Search",
    value: "0.24 ms",
    note: "Sample benchmark across 100,000 local Markdown files on Apple M3 Max.",
  },
  {
    spec: "Cold Startup to First Keystroke",
    value: "18 ms",
    note: "Sample telemetry from native Rust + WebGPU shell with zero Electron overhead.",
  },
  {
    spec: "Memory Footprint at Idle",
    value: "42 MB",
    note: "Sample resident set size with 25,000 bidirectional graph edges loaded.",
  },
  {
    spec: "Offline Sync Conflict Resolution",
    value: "100% CRDT",
    note: "Deterministic block-level merges over Git or end-to-end encrypted relay.",
  },
];

const ENGINEER_QUOTES = [
  {
    quote:
      "Cortex is the only second brain that respects how systems engineers actually work. Every postmortem, SQL snippet, and RFC lives in plain Markdown with instant graph queries.",
    author: "Devon K. Takahashi",
    role: "Principal Distributed Systems Engineer, Oxide-scale Infra",
  },
  {
    quote:
      "Searching fifty thousand architecture notes takes less than a millisecond offline. It feels like ripgrep and a knowledge graph had a child.",
    author: "Soraia Mendes",
    role: "Staff Kernel Engineer, Kinetix Cloud",
  },
];

export default function CortexPage() {
  return (
    <div className="min-h-[100dvh] bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-emerald-500 selection:text-zinc-950">
      {/* Sticky Single-Line Navigation (64px height <= 80px cap) */}
      <header
        className={`sticky top-0 ${Z_INDEX.stickyNav} h-16 border-b border-zinc-200/80 bg-zinc-50/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/with-taste-skill/gemini-4-argon/2" className="flex items-center gap-2.5">
            <Cpu
              size={22}
              weight="regular"
              className="text-emerald-600 dark:text-emerald-400"
            />
            <span className="font-space text-lg font-bold tracking-tight">
              CORTEX
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href="#engine"
              className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Recall Engine
            </a>
            <a
              href="#architecture"
              className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Architecture
            </a>
            <a
              href="#benchmarks"
              className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Benchmarks
            </a>
            <a
              href="#teams"
              className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Engineers
            </a>
          </nav>

          <a
            href="#download"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:scale-[0.98] whitespace-nowrap dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
          >
            Download local app
          </a>
        </div>
      </header>

      <main>
        {/* SECTION 1: Asymmetric 7/5 Split Hero (min-h-[100dvh], pt-16 <= pt-24 cap, max 4 text elements) */}
        <section className="min-h-[calc(100dvh-4rem)] pt-12 pb-16 md:pt-20 md:pb-24 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left 7 Cols: Max 4 Text Elements (Eyebrow #1, Headline <= 2 lines, Subtext <= 20 words, CTAs) */}
              <div className="lg:col-span-7 space-y-6">
                <p className="font-jetbrains text-xs uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Local-First Knowledge Graph
                </p>

                <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
                  Your engineering memory, indexed at{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    native speed.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[58ch]">
                  Capture architecture decisions, postmortems, and terminal snippets into a local SQLite graph with sub-millisecond semantic recall.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#download"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:scale-[0.98] whitespace-nowrap dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
                  >
                    <DownloadSimple size={17} weight="bold" />
                    <span>Download local app</span>
                  </a>
                  <a
                    href="#engine"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900 transition-all hover:border-zinc-400 hover:bg-zinc-100 active:scale-[0.98] whitespace-nowrap dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <span>Test recall engine</span>
                    <ArrowRight size={16} weight="bold" />
                  </a>
                </div>
              </div>

              {/* Right 5 Cols: Real Hardware/Workstation Photography + Caption Below */}
              <div className="lg:col-span-5">
                <CortexReveal>
                  <div className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
                      <Image
                        src="https://picsum.photos/seed/cortex-engineering-workstation-minimal/1000/750"
                        alt="Minimalist engineering workstation running local knowledge graph"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between px-1 font-jetbrains text-xs text-zinc-600 dark:text-zinc-400">
                      <span>SQLite WAL + FTS5 Vector Graph</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        Offline-Ready
                      </span>
                    </div>
                  </div>
                </CortexReveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Logo Wall (Under Hero, Real SVG Marks, Logo-Only rule) */}
        <section
          aria-label="Engineering organizations using Cortex"
          className="border-y border-zinc-200/80 bg-white py-12 dark:border-zinc-800/80 dark:bg-zinc-900/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TrustedLogos className="text-zinc-600 dark:text-zinc-400" />
          </div>
        </section>

        {/* SECTION 3: Interactive Semantic Recall & Graph Inspector (Client Leaf Component, Eyebrow #2 of 2) */}
        <section id="engine" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-2xl space-y-3">
              <p className="font-jetbrains text-xs uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 font-semibold">
                Interactive Graph Sandbox
              </p>
              <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Query your architecture graph in real time.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[65ch]">
                Filter ADRs, postmortems, and RFCs below, or commit a new markdown node to see how Cortex builds bidirectional backlinks.
              </p>
            </div>

            <CortexRecallEngine />
          </div>
        </section>

        {/* SECTION 4: Asymmetric 4-Cell Bento Grid (4 items = 4 cells, background diversity, no 3-equal cards) */}
        <section
          id="architecture"
          className="border-y border-zinc-200/80 bg-zinc-100/70 py-24 sm:py-32 dark:border-zinc-800/80 dark:bg-zinc-900/30"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Engineered like a database, edited like plain text.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[65ch]">
                No proprietary cloud blobs. Cortex indexes your existing folder of Markdown files using an embedded Rust + SQLite engine.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* Cell 1 (col-span-7): Emerald High-Contrast Surface */}
              <div className="md:col-span-7 flex flex-col justify-between rounded-xl bg-emerald-600 p-8 text-white dark:bg-emerald-500 dark:text-zinc-950">
                <div className="space-y-3">
                  <HardDrives size={28} weight="regular" />
                  <h3 className="font-space text-2xl sm:text-3xl font-bold tracking-tight">
                    Filesystem-Native Markdown + SQLite Index
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed max-w-[56ch]">
                    Every note is a standard `.md` file on your local drive. Edit with Cortex, Neovim, or VS Code simultaneously while the background file-watcher updates graph edges in under a millisecond.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-current/20 pt-5 font-jetbrains text-xs font-semibold">
                  <span className="rounded-xl bg-black/15 px-3 py-1.5">
                    ~/vault/adr/*.md
                  </span>
                  <span className="rounded-xl bg-black/15 px-3 py-1.5">
                    .cortex/graph.sqlite3
                  </span>
                </div>
              </div>

              {/* Cell 2 (col-span-5): Real Photography + Caption Below */}
              <div className="md:col-span-5 flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="relative h-48 w-full overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src="https://picsum.photos/seed/cortex-server-rack-fiber/800/550"
                    alt="Precision hardware infrastructure representing local-first storage"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 space-y-2">
                  <h3 className="font-space text-xl font-bold tracking-tight">
                    AST-Aware Code Block Indexing
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Tree-sitter parses fenced code blocks across 40 languages so you can search by function signature, struct name, or SQL table.
                  </p>
                </div>
              </div>

              {/* Cell 3 (col-span-5): Dark Tinted Technical Card */}
              <div className="md:col-span-5 flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-900 p-8 text-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="space-y-3">
                  <GitBranch
                    size={26}
                    weight="regular"
                    className="text-emerald-400"
                  />
                  <h3 className="font-space text-xl font-bold tracking-tight">
                    Git-Backed Branching & Blame
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Snapshot your knowledge base alongside code releases. Diff architectural assumptions across quarters with native Git history.
                  </p>
                </div>
                <p className="mt-6 font-jetbrains text-xs text-emerald-400">
                  git log --graph --oneline notes/adr/
                </p>
              </div>

              {/* Cell 4 (col-span-7): Split Image + Security Details */}
              <div className="md:col-span-7 grid grid-cols-1 gap-6 rounded-xl border border-zinc-200 bg-white p-6 sm:grid-cols-2 sm:items-center dark:border-zinc-800 dark:bg-zinc-900">
                <div className="space-y-3">
                  <LockKey
                    size={26}
                    weight="regular"
                    className="text-emerald-600 dark:text-emerald-400"
                  />
                  <h3 className="font-space text-xl font-bold tracking-tight">
                    Zero-Knowledge Peer Sync
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Keys never leave your hardware keychain. Sync encrypted CRDT deltas across macOS, Linux, and iOS without exposing plaintext to any server.
                  </p>
                </div>
                <div className="relative h-48 w-full overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src="https://picsum.photos/seed/cortex-terminal-keyboard-desk/800/600"
                    alt="Mechanical keyboard and dark terminal display on desk"
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: 2-Column Spec Card Grid (Section 4.9 pattern instead of border-b spec table) */}
        <section id="benchmarks" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Measured in microseconds, not spinners.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[65ch]">
                Sample performance metrics recorded on a 100,000-note local engineering vault.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {BENCHMARK_CARDS.map((card) => (
                <div
                  key={card.spec}
                  className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    {card.spec}
                  </span>
                  <p className="mt-3 font-jetbrains text-4xl sm:text-5xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                    {card.value}
                  </p>
                  <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {card.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: Engineer Testimonials (Max 3 lines of quote body, zero em-dashes) */}
        <section
          id="teams"
          className="border-t border-zinc-200/80 bg-white py-24 sm:py-32 dark:border-zinc-800/80 dark:bg-zinc-900/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-space text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Built for staff engineers and systems teams.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[65ch]">
                Read why infrastructure teams standardize their runbooks and ADRs in Cortex.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {ENGINEER_QUOTES.map((item) => (
                <blockquote
                  key={item.author}
                  className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div>
                    <Quotes
                      size={28}
                      weight="regular"
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                    <p className="mt-4 text-base sm:text-lg font-medium leading-relaxed text-zinc-900 dark:text-zinc-100 line-clamp-3">
                      “{item.quote}”
                    </p>
                  </div>
                  <footer className="mt-6 border-t border-zinc-200/80 pt-4 dark:border-zinc-800">
                    <p className="font-space text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {item.author}
                    </p>
                    <p className="font-jetbrains text-xs text-zinc-500 dark:text-zinc-400">
                      {item.role}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Conversion Section (Label above input, locked CTA "Download local app") */}
        <section
          id="download"
          className="border-t border-zinc-200/80 py-24 sm:py-32 dark:border-zinc-800/80"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-zinc-200 bg-white p-8 sm:p-12 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="space-y-3">
                <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tighter leading-none">
                  Initialize your local Cortex graph today.
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[60ch]">
                  Download the native binary for macOS (Apple Silicon & Intel), Linux AppImage, or Windows.
                </p>
              </div>

              <form
                action="#download"
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-end"
              >
                <div className="sm:col-span-7 flex flex-col gap-2">
                  <label
                    htmlFor="cortex-release-email"
                    className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    Work or GitHub email for release checksums
                  </label>
                  <input
                    id="cortex-release-email"
                    name="email"
                    type="email"
                    required
                    placeholder="devon@systems-infra.dev"
                    className="h-12 rounded-xl border border-zinc-300 bg-zinc-50 px-4 font-jetbrains text-xs text-zinc-900 placeholder:text-zinc-500 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-400"
                  />
                </div>
                <div className="sm:col-span-5">
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:scale-[0.98] whitespace-nowrap dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
                  >
                    <TerminalWindow size={17} weight="bold" />
                    <span>Download local app</span>
                  </button>
                </div>
              </form>
              <p className="mt-3 font-jetbrains text-xs text-zinc-500 dark:text-zinc-400">
                Or install via Homebrew: brew install --cask cortex-notes
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200/80 bg-white py-12 dark:border-zinc-800/80 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Cpu
              size={20}
              weight="regular"
              className="text-emerald-600 dark:text-emerald-400"
            />
            <span className="font-space text-base font-bold">CORTEX</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Local-First Engineering Second Brain
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#engine" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Recall Engine
            </a>
            <a href="#architecture" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Architecture
            </a>
            <a href="#benchmarks" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Benchmarks
            </a>
            <a href="#download" className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Download local app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
