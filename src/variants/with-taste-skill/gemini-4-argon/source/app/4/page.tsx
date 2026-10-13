import Image from "next/image";
import Link from "next/link";
import {
  GridFour,
  TreeStructure,
  KeyReturn,
  ArrowsMerge,
  ArrowRight,
  Quotes,
} from "@phosphor-icons/react/dist/ssr";
import { TrustedLogos } from "../components/TrustedLogos";
import { Z_INDEX } from "../components/z-index";
import { ZettelSlipBoxIndex, ZettelReveal } from "./ZettelInteractive";

/**
 * ITERATION /4: ZETTEL
 * Design Read: "Reading this as: high-density index landing page for power note-takers and Zettelkasten practitioners, with a Swiss brutalist architectural language, leaning toward native CSS 1px hairlines + Geist & JetBrains Mono + Stone & Brick-Red palette."
 * Dials: DESIGN_VARIANCE: 8, MOTION_INTENSITY: 4, VISUAL_DENSITY: 8
 * High-Density Rules (Section 4.4 & Section 7):
 * - VISUAL_DENSITY > 7: No generic floating card boxes; 1px architectural hairlines separate data.
 * - Mandatory font-mono (JetBrains Mono) for all numerical metrics.
 * Palette Lock (Section 4.2): Stone architectural paper (stone-100 / dark:stone-950) + single Brick Red accent (red-600 / dark:red-500).
 * Shape Lock (Section 4.4): All-sharp rounded-none (0px radius) across the entire page.
 * CTA Intent Lock (Section 4.5): "Claim slip-box" used for all primary signup CTAs.
 */

const PRACTITIONER_QUOTES = [
  {
    quote:
      "Niklas Luhmann wrote seventy books out of a wooden slip-box because his numbering system forced ideas to collide. Zettel is the first software that implements true Folgezettel sequences without folder clutter.",
    author: "Prof. Lukas Baumgartner",
    role: "Chair of Media Sociology, ETH Zurich",
  },
  {
    quote:
      "Every action in Zettel is bound to a two-key chord. I can file an atomic note, branch a sequence, and cite three prior slips without touching the mouse.",
    author: "Claire Vance-Kowalski",
    role: "Investigative Journalist & Non-Fiction Author",
  },
];

export default function ZettelPage() {
  return (
    <div className="min-h-[100dvh] bg-stone-100 text-stone-900 dark:bg-stone-950 dark:text-stone-100 font-sans selection:bg-red-600 selection:text-white">
      {/* Sticky Single-Line Architectural Header (64px height <= 80px cap) */}
      <header
        className={`sticky top-0 ${Z_INDEX.stickyNav} h-16 border-b border-stone-300 bg-stone-100/95 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/95`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/with-taste-skill/gemini-4-argon/4" className="flex items-center gap-2.5">
            <GridFour
              size={22}
              weight="regular"
              className="text-red-600 dark:text-red-500"
            />
            <span className="font-jetbrains text-base font-bold tracking-tight">
              ZETTEL
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-jetbrains text-xs font-semibold text-stone-600 dark:text-stone-400">
            <a
              href="#metrics"
              className="transition-colors hover:text-red-600 dark:hover:text-red-400"
            >
              TELEMETRY
            </a>
            <a
              href="#index"
              className="transition-colors hover:text-red-600 dark:hover:text-red-400"
            >
              SLIP-BOX
            </a>
            <a
              href="#principles"
              className="transition-colors hover:text-red-600 dark:hover:text-red-400"
            >
              STRUCTURE
            </a>
            <a
              href="#practitioners"
              className="transition-colors hover:text-red-600 dark:hover:text-red-400"
            >
              AUTHORS
            </a>
          </nav>

          <a
            href="#claim"
            className="inline-flex h-10 items-center justify-center rounded-none bg-red-600 px-5 font-jetbrains text-xs font-bold text-white transition-colors hover:bg-red-700 active:scale-[0.98] whitespace-nowrap dark:bg-red-500 dark:text-stone-950 dark:hover:bg-red-400"
          >
            Claim slip-box
          </a>
        </div>
      </header>

      <main>
        {/* SECTION 1: Swiss Brutalist Asymmetric Split Hero (min-h-[100dvh], pt-12 md:pt-16 <= pt-24 cap, max 4 text elements) */}
        <section className="min-h-[calc(100dvh-4rem)] pt-12 pb-16 md:pt-16 md:pb-20 flex items-center border-b border-stone-300 dark:border-stone-800">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Left 7 Cols: Max 4 Text Elements (Eyebrow #1, Headline <= 2 lines, Subtext <= 20 words, CTAs) */}
              <div className="lg:col-span-7 space-y-6">
                <p className="font-jetbrains text-xs uppercase tracking-[0.18em] text-red-600 dark:text-red-400 font-bold">
                  Luhmann Folgezettel Engine
                </p>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-none">
                  Atomic thoughts, chained into{" "}
                  <span className="text-red-600 dark:text-red-500">
                    compound
                  </span>{" "}
                  intelligence.
                </h1>

                <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed max-w-[56ch]">
                  Build a lifelong Zettelkasten with alphanumeric Folgezettel branching, keyboard-only navigation, and zero folder hierarchy.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#claim"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-none bg-red-600 px-6 font-jetbrains text-xs font-bold text-white transition-colors hover:bg-red-700 active:scale-[0.98] whitespace-nowrap dark:bg-red-500 dark:text-stone-950 dark:hover:bg-red-400"
                  >
                    <span>Claim slip-box</span>
                    <ArrowRight size={15} weight="bold" />
                  </a>
                  <a
                    href="#index"
                    className="inline-flex h-12 items-center justify-center rounded-none border border-stone-400 bg-white px-6 font-jetbrains text-xs font-bold text-stone-900 transition-colors hover:bg-stone-200 active:scale-[0.98] whitespace-nowrap dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
                  >
                    Browse index
                  </a>
                </div>
              </div>

              {/* Right 5 Cols: Real Archival Index Photography in Sharp Hairline Frame */}
              <div className="lg:col-span-5">
                <ZettelReveal>
                  <div className="border border-stone-400 bg-white p-3 dark:border-stone-700 dark:bg-stone-900">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-stone-200 dark:bg-stone-800">
                      <Image
                        src="https://picsum.photos/seed/zettel-swiss-archival-cabinet/1000/750"
                        alt="Architectural index drawers and structured reference slips"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover contrast-105"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-stone-300 pt-2.5 font-jetbrains text-xs text-stone-700 dark:border-stone-800 dark:text-stone-300">
                      <span>REGISTER: 90,000 ATOMIC SLIPS</span>
                      <span className="font-bold text-red-600 dark:text-red-400">
                        14a1a2
                      </span>
                    </div>
                  </div>
                </ZettelReveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Logo Wall (Under Hero, Real SVG Marks, Logo-Only rule) */}
        <section
          aria-label="Universities and editorial teams using Zettel"
          className="border-b border-stone-300 bg-white py-10 dark:border-stone-800 dark:bg-stone-900/60"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TrustedLogos className="text-stone-700 dark:text-stone-400" />
          </div>
        </section>

        {/* SECTION 3: High-Density 1px Hairline Telemetry Strip (VISUAL_DENSITY: 8 - No card boxes, font-mono numbers) */}
        <section
          id="metrics"
          className="border-b border-stone-300 bg-stone-100 dark:border-stone-800 dark:bg-stone-950"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 divide-y divide-stone-300 border-x border-stone-300 md:grid-cols-4 md:divide-x md:divide-y-0 dark:divide-stone-800 dark:border-stone-800">
              <div className="p-6 sm:p-8">
                <p className="font-jetbrains text-3xl sm:text-4xl font-bold text-red-600 dark:text-red-400">
                  90,000
                </p>
                <p className="mt-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
                  Luhmann Archive Capacity
                </p>
                <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                  Tested with ninety thousand cross-linked slips at zero frame drop.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <p className="font-jetbrains text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                  0
                </p>
                <p className="mt-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
                  Nested Topic Folders
                </p>
                <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                  Structure emerges bottom-up from alphanumeric Folgezettel chains.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <p className="font-jetbrains text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                  100%
                </p>
                <p className="mt-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
                  Keyboard Chord Control
                </p>
                <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                  Branch, transclude, and split atomic notes without leaving home row.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <p className="font-jetbrains text-3xl sm:text-4xl font-bold text-red-600 dark:text-red-400">
                  1.2 ms
                </p>
                <p className="mt-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
                  Transclusion Resolution
                </p>
                <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                  Sample latency assembling a 40-slip outline into a continuous draft.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Interactive Slip-Box Linker (Client Leaf Component, Eyebrow #2 of 2) */}
        <section
          id="index"
          className="border-b border-stone-300 py-20 sm:py-24 dark:border-stone-800"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl space-y-3">
              <p className="font-jetbrains text-xs uppercase tracking-[0.18em] text-red-600 dark:text-red-400 font-bold">
                Interactive Folgezettel Register
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Inspect the slip-box and file an atomic proposition.
              </h2>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed max-w-[65ch]">
                Select any alphanumeric slip address below to inspect its argument, or file a new child slip into the sequence.
              </p>
            </div>

            <ZettelSlipBoxIndex />
          </div>
        </section>

        {/* SECTION 5: Asymmetric 4-Cell Architectural Hairline Grid (4 items = 4 cells, background diversity) */}
        <section
          id="principles"
          className="border-b border-stone-300 bg-white py-20 sm:py-24 dark:border-stone-800 dark:bg-stone-900/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Four rules of the Swiss slip-box.
              </h2>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed max-w-[65ch]">
                Designed around strict epistemic constraints that turn daily reading into published work.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 border border-stone-300 md:grid-cols-12 dark:border-stone-800">
              {/* Cell 1 (col-span-7): Brick-Red High-Contrast Cell */}
              <div className="md:col-span-7 flex flex-col justify-between border-b border-stone-300 bg-red-600 p-8 text-white md:border-r dark:border-stone-800 dark:bg-red-500 dark:text-stone-950">
                <div className="space-y-3">
                  <TreeStructure size={26} weight="regular" />
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Alphanumeric Folgezettel Chains
                  </h3>
                  <p className="text-sm opacity-95 leading-relaxed max-w-[55ch]">
                    When slip `14a` sparks a corollary, file it as `14a1`. When a rival interpretation appears, branch to `14b`. Your line of argument grows organically without reorganizing folders.
                  </p>
                </div>
                <p className="mt-8 border-t border-current/25 pt-4 font-jetbrains text-xs font-bold">
                  14a  14a1  14a1a  14a2  14b
                </p>
              </div>

              {/* Cell 2 (col-span-5): Real Architectural Photography Cell */}
              <div className="md:col-span-5 flex flex-col justify-between border-b border-stone-300 bg-stone-100 p-6 dark:border-stone-800 dark:bg-stone-900">
                <div className="relative h-48 w-full overflow-hidden rounded-none bg-stone-200 dark:bg-stone-800">
                  <Image
                    src="https://picsum.photos/seed/zettel-brutalist-library-concrete/800/550"
                    alt="Swiss brutalist library facade with strict modular grid"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 space-y-2">
                  <h3 className="text-xl font-bold tracking-tight">
                    Mandatory Single-Screen Atomicity
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    Slips are capped at 300 words so every note remains a sharp, reusable building block rather than an unfocused dump.
                  </p>
                </div>
              </div>

              {/* Cell 3 (col-span-5): Dark Stone Command Cell */}
              <div className="md:col-span-5 flex flex-col justify-between border-b border-stone-300 bg-stone-900 p-8 text-stone-100 md:border-b-0 md:border-r dark:border-stone-800">
                <div className="space-y-3">
                  <KeyReturn
                    size={26}
                    weight="regular"
                    className="text-red-500"
                  />
                  <h3 className="text-xl font-bold tracking-tight">
                    Modal Keyboard Ergonomics
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed">
                    Navigate parent, sibling, and child slips with `J`, `K`, `H`, `L`. Split a long note into two linked slips with a single keystroke.
                  </p>
                </div>
                <p className="mt-8 font-jetbrains text-xs text-red-400">
                  [g][f] Follow branch  [c][s] Split atomic slip
                </p>
              </div>

              {/* Cell 4 (col-span-7): Split Image + Manuscript Transclusion Cell */}
              <div className="md:col-span-7 grid grid-cols-1 gap-6 bg-white p-6 sm:grid-cols-2 sm:items-center dark:bg-stone-950">
                <div className="space-y-3">
                  <ArrowsMerge
                    size={26}
                    weight="regular"
                    className="text-red-600 dark:text-red-400"
                  />
                  <h3 className="text-xl font-bold tracking-tight">
                    Live Outline Transclusion
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    Pull any sequence of slips into an essay outline. Editing a transcluded paragraph updates the canonical atomic slip in place.
                  </p>
                </div>
                <div className="relative h-48 w-full overflow-hidden rounded-none bg-stone-200 dark:bg-stone-800">
                  <Image
                    src="https://picsum.photos/seed/zettel-typewriter-manuscript-grid/800/600"
                    alt="Monospace manuscript sheets arranged in sequential order"
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Practitioner Quotes (1px hairline grid, <= 3 lines of quote body, zero em-dashes) */}
        <section
          id="practitioners"
          className="border-b border-stone-300 py-20 sm:py-24 dark:border-stone-800"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Used by serious Zettelkasten practitioners.
              </h2>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed max-w-[65ch]">
                Writers and sociologists who publish from permanent slip-boxes.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 divide-y divide-stone-300 border border-stone-300 bg-white md:grid-cols-2 md:divide-x md:divide-y-0 dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900">
              {PRACTITIONER_QUOTES.map((item) => (
                <blockquote
                  key={item.author}
                  className="flex flex-col justify-between p-8"
                >
                  <div>
                    <Quotes
                      size={26}
                      weight="regular"
                      className="text-red-600 dark:text-red-400"
                    />
                    <p className="mt-4 text-base sm:text-lg font-medium leading-relaxed text-stone-900 dark:text-stone-100 line-clamp-3">
                      “{item.quote}”
                    </p>
                  </div>
                  <footer className="mt-6 border-t border-stone-300 pt-4 dark:border-stone-800">
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100">
                      {item.author}
                    </p>
                    <p className="font-jetbrains text-xs text-stone-600 dark:text-stone-400">
                      {item.role}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Conversion Section (All-sharp rounded-none, Label above input, locked CTA "Claim slip-box") */}
        <section id="claim" className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="border border-stone-400 bg-white p-8 sm:p-12 dark:border-stone-700 dark:bg-stone-900">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter leading-none">
                  Initialize your permanent slip-box.
                </h2>
                <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed max-w-[60ch]">
                  Local plain-text storage with strict Folgezettel indexing and keyboard-first navigation.
                </p>
              </div>

              <form
                action="#claim"
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-end"
              >
                <div className="sm:col-span-8 flex flex-col gap-2">
                  <label
                    htmlFor="zettel-claim-email"
                    className="text-xs font-bold text-stone-900 dark:text-stone-100"
                  >
                    Practitioner email address
                  </label>
                  <input
                    id="zettel-claim-email"
                    name="email"
                    type="email"
                    required
                    placeholder="baumgartner@ethz.ch"
                    className="h-12 rounded-none border border-stone-400 bg-stone-50 px-4 font-jetbrains text-xs text-stone-900 placeholder:text-stone-500 focus:border-red-600 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-400"
                  />
                </div>
                <div className="sm:col-span-4">
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-none bg-red-600 px-6 font-jetbrains text-xs font-bold text-white transition-colors hover:bg-red-700 active:scale-[0.98] whitespace-nowrap dark:bg-red-500 dark:text-stone-950 dark:hover:bg-red-400"
                  >
                    <span>Claim slip-box</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-300 bg-white py-12 dark:border-stone-800 dark:bg-stone-950">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <GridFour
              size={20}
              weight="regular"
              className="text-red-600 dark:text-red-500"
            />
            <span className="font-jetbrains text-sm font-bold">ZETTEL</span>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Swiss Brutalist Zettelkasten Engine
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6 font-jetbrains text-xs font-semibold text-stone-600 dark:text-stone-400">
            <a href="#metrics" className="hover:text-red-600 dark:hover:text-red-400">
              TELEMETRY
            </a>
            <a href="#index" className="hover:text-red-600 dark:hover:text-red-400">
              SLIP-BOX
            </a>
            <a href="#principles" className="hover:text-red-600 dark:hover:text-red-400">
              STRUCTURE
            </a>
            <a href="#claim" className="hover:text-red-600 dark:hover:text-red-400">
              Claim slip-box
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
