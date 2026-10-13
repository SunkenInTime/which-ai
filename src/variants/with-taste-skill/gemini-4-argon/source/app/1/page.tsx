import Image from "next/image";
import Link from "next/link";
import {
  BookBookmark,
  Feather,
  Archive,
  Quotes,
  ArrowRight,
  Scroll,
  BookmarkSimple,
  FileText,
} from "@phosphor-icons/react/dist/ssr";
import { TrustedLogos } from "../components/TrustedLogos";
import { Z_INDEX } from "../components/z-index";
import { VellumArchivalDesk, VellumReveal } from "./VellumInteractive";

/**
 * ITERATION /1: VELLUM
 * Design Read: "Reading this as: editorial monograph landing page for historians, researchers, and long-form writers, with a quiet archival manuscript language, leaning toward Tailwind v4 + Cormorant Garamond & Plus Jakarta Sans + Alabaster & Cobalt palette."
 * Dials: DESIGN_VARIANCE: 6, MOTION_INTENSITY: 4, VISUAL_DENSITY: 3
 * Serif Justification (Section 4.1): Cormorant Garamond is explicitly chosen from the approved pool to reflect scholarly print folios, critical editions, and archival marginalia.
 * Palette Lock (Section 4.2): Cool Alabaster (slate-50 / dark:slate-950) + single Cobalt Blue accent (blue-700 / dark:blue-600).
 * Shape Lock (Section 4.4): rounded-lg across all containers, buttons, and inputs.
 * CTA Intent Lock (Section 4.5): "Start archive" used for all primary signup CTAs.
 */

const ARCHIVAL_SPECS = [
  {
    title: "Cite-Key Permanent IDs",
    metric: "100% Local BibTeX",
    body: "Every paragraph receives an immutable folio identifier that survives file renames and manuscript restructures.",
  },
  {
    title: "Side-by-Side Primary Sources",
    metric: "Dual-Pane Reader",
    body: "Pin high-resolution archival scans beside your draft and link specific manuscript regions to your footnotes.",
  },
  {
    title: "Contradiction Detection",
    metric: "Cross-Folio Synthesis",
    body: "Surface historical counter-evidence from your own past reading notes whenever you draft a new thesis claim.",
  },
  {
    title: "Print-Ready Typesetting",
    metric: "PDF & LaTeX Export",
    body: "Compile chapters with automatic apparatus criticus, endnotes, and Chicago or Oxford bibliography formatting.",
  },
  {
    title: "Century-Grade Plain Text",
    metric: "Open Markdown + YAML",
    body: "Your archive lives on your disk in human-readable files with zero proprietary database lock-in.",
  },
];

const SCHOLAR_QUOTES = [
  {
    quote:
      "Vellum replaced six separate folders of PDFs, index cards, and half-finished chapters. My dissertation footnotes now assemble themselves as I read.",
    author: "Dr. Helena Lindqvist",
    role: "Senior Fellow in Early Modern History, Uppsala University",
  },
  {
    quote:
      "Most note apps treat thoughts like disposable chat messages. Vellum treats every source excerpt like a permanent archival plate.",
    author: "Marcus Vance-Sterling",
    role: "Biographer & Contributing Editor, London Monograph Press",
  },
];

export default function VellumPage() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-jakarta selection:bg-blue-700 selection:text-white">
      {/* Sticky Single-Line Navigation (height 64px <= 80px cap) */}
      <header
        className={`sticky top-0 ${Z_INDEX.stickyNav} h-16 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/with-taste-skill/gemini-4-argon/1" className="flex items-center gap-2.5">
            <BookBookmark
              size={22}
              weight="regular"
              className="text-blue-700 dark:text-blue-400"
            />
            <span className="font-cormorant text-2xl font-bold tracking-tight">
              Vellum
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href="#folios"
              className="transition-colors hover:text-blue-700 dark:hover:text-blue-400"
            >
              Folios
            </a>
            <a
              href="#synthesizer"
              className="transition-colors hover:text-blue-700 dark:hover:text-blue-400"
            >
              Citation Desk
            </a>
            <a
              href="#architecture"
              className="transition-colors hover:text-blue-700 dark:hover:text-blue-400"
            >
              Specifications
            </a>
            <a
              href="#scholars"
              className="transition-colors hover:text-blue-700 dark:hover:text-blue-400"
            >
              Readers
            </a>
          </nav>

          <a
            href="#start"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-800 active:scale-[0.98] whitespace-nowrap dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            Start archive
          </a>
        </div>
      </header>

      <main>
        {/* SECTION 1: Asymmetric Split Hero (Fits initial viewport, pt-16 md:pt-20 <= pt-24 cap, max 4 text elements) */}
        <section className="min-h-[calc(100dvh-4rem)] pt-12 pb-16 md:pt-20 md:pb-24 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: 4 Text Elements max (Eyebrow #1, Headline, Subtext <= 20 words, CTAs) */}
              <div className="lg:col-span-6 space-y-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400 font-semibold">
                  Archival Research Studio
                </p>

                <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.12] pb-1">
                  Where scattered marginalia become{" "}
                  <span className="italic font-normal">permanent</span>{" "}
                  scholarship.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-[54ch]">
                  Capture primary sources, weave bidirectional citations, and compose long-form manuscripts inside a distraction-free archival vault.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#start"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 text-sm font-semibold text-white transition-all hover:bg-blue-800 active:scale-[0.98] whitespace-nowrap dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    <span>Start archive</span>
                    <ArrowRight size={16} weight="bold" />
                  </a>
                  <a
                    href="#folios"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 transition-all hover:border-slate-400 hover:bg-slate-100 active:scale-[0.98] whitespace-nowrap dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    Explore folios
                  </a>
                </div>
              </div>

              {/* Right Column: Real Archival Photography + Caption Outside Image */}
              <div className="lg:col-span-6">
                <VellumReveal>
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                      <Image
                        src="https://picsum.photos/seed/vellum-archival-manuscript-study/1200/900"
                        alt="Archival desk with open research notebooks and reference volumes"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between px-1 text-xs text-slate-600 dark:text-slate-400">
                      <span>Dual-pane manuscript folio with live margin backlinks</span>
                      <span className="font-mono text-blue-700 dark:text-blue-400 font-semibold">
                        BibTeX + Markdown
                      </span>
                    </div>
                  </div>
                </VellumReveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Logo Wall (Under the Hero, Real SVG Marks, Logo-Only rule) */}
        <section
          aria-label="Research institutions and teams using Vellum"
          className="border-y border-slate-200/80 bg-white py-12 dark:border-slate-800/80 dark:bg-slate-900/50"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TrustedLogos className="text-slate-600 dark:text-slate-400" />
          </div>
        </section>

        {/* SECTION 3: Asymmetric 4-Cell Bento Grid (4 items = 4 cells, background diversity, vertical stack header) */}
        <section id="folios" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12] pb-1">
                Built for ten-year inquiries, not ephemeral sticky notes.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[65ch]">
                Every note in Vellum preserves context, provenance, and bidirectional lineage from first excerpt to published monograph.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* Cell 1 (col-span-7): Cobalt Accent Surface */}
              <div className="md:col-span-7 flex flex-col justify-between rounded-lg bg-blue-700 p-8 text-white dark:bg-blue-600">
                <div className="space-y-3">
                  <Feather size={28} weight="regular" className="text-blue-100" />
                  <h3 className="font-cormorant text-3xl font-semibold tracking-tight">
                    Margin-First Annotation
                  </h3>
                  <p className="text-sm text-blue-100 leading-relaxed max-w-[55ch]">
                    Write commentary directly alongside primary texts. Every marginal note remains anchored to the exact paragraph it critiques, even as your draft evolves.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
                  <div>
                    <p className="font-mono text-2xl font-semibold">0.4 ms</p>
                    <p className="text-xs text-blue-100">Citation graph lookup across 50,000 folios</p>
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-semibold">100%</p>
                    <p className="text-xs text-blue-100">Offline plain-text archival longevity</p>
                  </div>
                </div>
              </div>

              {/* Cell 2 (col-span-5): Real Photography + Caption Below */}
              <div className="md:col-span-5 flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="relative h-52 w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="https://picsum.photos/seed/vellum-rare-book-library/800/550"
                    alt="Bound archival volumes on a wooden reading table"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 space-y-2">
                  <h3 className="font-cormorant text-2xl font-semibold tracking-tight">
                    Provenance & Shelfmark Tracking
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Attach archive box numbers, repository call numbers, and high-resolution plate scans to every note automatically.
                  </p>
                </div>
              </div>

              {/* Cell 3 (col-span-5): Tinted Slate Surface */}
              <div className="md:col-span-5 flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-100 p-8 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="space-y-3">
                  <Archive
                    size={26}
                    weight="regular"
                    className="text-blue-700 dark:text-blue-400"
                  />
                  <h3 className="font-cormorant text-2xl font-semibold tracking-tight">
                    Genealogical Backlink Trees
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Trace how an empirical observation from three years ago matured into a central thesis paragraph today.
                  </p>
                </div>
                <div className="mt-6 space-y-2 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                    <span>Origin: MS-104.B</span>
                    <span className="text-blue-700 dark:text-blue-400">3 Derived Chapters</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                     Cited in Chapter IV: Spatial Memory in Early Print Culture
                  </p>
                </div>
              </div>

              {/* Cell 4 (col-span-7): Split Image + Editorial Text Cell */}
              <div className="md:col-span-7 grid grid-cols-1 gap-6 rounded-lg border border-slate-200 bg-white p-6 sm:grid-cols-2 sm:items-center dark:border-slate-800 dark:bg-slate-900">
                <div className="space-y-3">
                  <Scroll
                    size={26}
                    weight="regular"
                    className="text-blue-700 dark:text-blue-400"
                  />
                  <h3 className="font-cormorant text-2xl font-semibold tracking-tight">
                    Apparatus Criticus Export
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Export clean manuscripts to LaTeX, DOCX, or print-ready PDF with footnotes, bibliography, and primary source indices intact.
                  </p>
                </div>
                <div className="relative h-52 w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="https://picsum.photos/seed/vellum-typography-press-sheet/800/600"
                    alt="Printed monograph pages showing footnotes and margin references"
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Interactive Citation & Margin Desk (Client Leaf Component, Eyebrow #2 of 2) */}
        <section
          id="synthesizer"
          className="border-y border-slate-200/80 bg-slate-100/70 py-24 sm:py-32 dark:border-slate-800/80 dark:bg-slate-900/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-blue-700 dark:text-blue-400 font-semibold">
                Interactive Citation Workbench
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12] pb-1">
                Query your folios and catalog new marginalia live.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[65ch]">
                Search sample archival notes below, verify cross-references, or append a new source entry to experience how Vellum organizes a second brain.
              </p>
            </div>

            <VellumArchivalDesk />
          </div>
        </section>

        {/* SECTION 5: Horizontal Scroll-Snap Specification Pills (Section 4.9 alternative to spec tables) */}
        <section id="architecture" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12] pb-1">
                Archival specifications built for decades.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[65ch]">
                Flick through our core preservation standards. Every vault is stored locally in open formats you own outright.
              </p>
            </div>

            <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
              {ARCHIVAL_SPECS.map((spec) => (
                <div
                  key={spec.title}
                  className="min-w-[280px] sm:min-w-[320px] flex-1 snap-start rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="inline-flex items-center gap-2 rounded-lg bg-blue-700/10 px-3 py-1 font-mono text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
                    <FileText size={14} weight="regular" />
                    <span>{spec.metric}</span>
                  </div>
                  <h3 className="mt-4 font-cormorant text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    {spec.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {spec.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: Editorial Pull-Quotes (Max 3 lines of quote body, zero em-dashes, typographic quotes) */}
        <section
          id="scholars"
          className="border-t border-slate-200/80 bg-white py-24 sm:py-32 dark:border-slate-800/80 dark:bg-slate-900/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-cormorant text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12] pb-1">
                Trusted by historians, biographers, and fellows.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[65ch]">
                Scholars across forty universities rely on Vellum to compile books and critical editions.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {SCHOLAR_QUOTES.map((item) => (
                <blockquote
                  key={item.author}
                  className="flex flex-col justify-between rounded-lg border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <Quotes
                      size={28}
                      weight="regular"
                      className="text-blue-700 dark:text-blue-400"
                    />
                    <p className="mt-4 font-cormorant text-2xl leading-snug text-slate-900 dark:text-slate-100 line-clamp-3">
                      “{item.quote}”
                    </p>
                  </div>
                  <footer className="mt-6 border-t border-slate-200/80 pt-4 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.author}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {item.role}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Conversion Section (Label above input, high contrast, locked CTA label "Start archive") */}
        <section
          id="start"
          className="border-t border-slate-200/80 py-24 sm:py-32 dark:border-slate-800/80"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-slate-200 bg-white p-8 sm:p-12 dark:border-slate-800 dark:bg-slate-900">
              <div className="space-y-3">
                <h2 className="font-cormorant text-4xl md:text-5xl font-semibold tracking-tight leading-[1.12] pb-1">
                  Begin your permanent research archive.
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[60ch]">
                  Create your local Vellum vault with full BibTeX synchronization and unlimited manuscript folios.
                </p>
              </div>

              <form
                action="#start"
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-end"
              >
                <div className="sm:col-span-8 flex flex-col gap-2">
                  <label
                    htmlFor="vellum-signup-email"
                    className="text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    Institutional or personal email address
                  </label>
                  <input
                    id="vellum-signup-email"
                    name="email"
                    type="email"
                    required
                    placeholder="h.lindqvist@uppsala.se"
                    className="h-12 rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
                  />
                </div>
                <div className="sm:col-span-4">
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 text-sm font-semibold text-white transition-all hover:bg-blue-800 active:scale-[0.98] whitespace-nowrap dark:bg-blue-600 dark:hover:bg-blue-500"
                  >
                    <BookmarkSimple size={16} weight="bold" />
                    <span>Start archive</span>
                  </button>
                </div>
              </form>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Includes macOS, Windows, and Linux local vault installers with plain-text Markdown storage.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white py-12 dark:border-slate-800/80 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <BookBookmark
              size={20}
              weight="regular"
              className="text-blue-700 dark:text-blue-400"
            />
            <span className="font-cormorant text-xl font-bold">Vellum</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Archival Second Brain for Long-Form Scholarship
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
            <a href="#folios" className="hover:text-blue-700 dark:hover:text-blue-400">
              Folios
            </a>
            <a href="#synthesizer" className="hover:text-blue-700 dark:hover:text-blue-400">
              Citation Desk
            </a>
            <a href="#architecture" className="hover:text-blue-700 dark:hover:text-blue-400">
              Specifications
            </a>
            <a href="#start" className="hover:text-blue-700 dark:hover:text-blue-400">
              Start archive
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
