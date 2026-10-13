import Image from "next/image";
import Link from "next/link";
import {
  Leaf,
  SunHorizon,
  MicrophoneStage,
  ShieldCheck,
  ArrowRight,
  Quotes,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { TrustedLogos } from "../components/TrustedLogos";
import { Z_INDEX } from "../components/z-index";
import { CanopyMemorySanctuary, CanopyReveal } from "./CanopyInteractive";

/**
 * ITERATION /5: CANOPY
 * Design Read: "Reading this as: calm consumer landing page for reflective thinkers and daily journalers, with an organic frosted-glass and botanical language, leaning toward Tailwind v4 + Plus Jakarta Sans + honest web glassmorphism approximation + Forest & Amber palette."
 * Dials: DESIGN_VARIANCE: 7, MOTION_INTENSITY: 6, VISUAL_DENSITY: 3
 * Palette Lock (Section 4.2): Forest Mist (#f2f6f3 / dark:#09110d) + single Warm Amber accent (amber-600 / dark:amber-500).
 * Shape Lock (Section 4.4): Documented system followed everywhere:
 *   - Interactive buttons & pills: rounded-full
 *   - Cards & glass panels: rounded-2xl
 *   - Text inputs: rounded-xl
 * Glassmorphism Honesty (Section 2.B & Appendix C): Uses .liquid-glass-web-approx with prefers-reduced-transparency fallback.
 * CTA Intent Lock (Section 4.5): "Begin journaling" used for all primary signup CTAs.
 */

const PRIVACY_CLUSTERS = [
  {
    heading: "On-Device Acoustic & Text Processing",
    items: [
      "Whisper-class voice transcription runs locally on Apple Neural Engine and modern mobile NPUs.",
      "Semantic memory echoes are computed on your device without sending journal entries to external training servers.",
    ],
  },
  {
    heading: "End-to-End Encrypted Sanctuary Sync",
    items: [
      "Your recovery passphrase derives a 256-bit key in hardware memory before any byte leaves your phone or laptop.",
      "Zero unread counters, zero streak-shaming notifications, and zero social feeds by design.",
    ],
  },
  {
    heading: "Heirloom Export & Longevity",
    items: [
      "Export your entire life journal at any moment as a typeset linen-book PDF or standard Markdown folder.",
      "Audio recordings remain paired with their transcripts in lossless M4A archives.",
    ],
  },
];

const JOURNALER_QUOTES = [
  {
    quote:
      "Every other productivity tool made my head feel louder. Canopy feels like stepping into a quiet conservatory where my past thoughts gently greet me when I need perspective.",
    author: "Clara Lindström",
    role: "Botanical Illustrator & Essayist, Stockholm",
  },
  {
    quote:
      "I record a three-minute voice note on my morning walk. By the time I pour coffee, Canopy has connected it to reflections I wrote three winters ago.",
    author: "Mateo Valenzuela",
    role: "Ceramicist & Industrial Designer",
  },
];

export default function CanopyPage() {
  return (
    <div className="min-h-[100dvh] bg-[#f2f6f3] text-[#111c16] dark:bg-[#09110d] dark:text-[#ecf3ef] font-jakarta selection:bg-amber-600 selection:text-white">
      {/* Sticky Single-Line Navigation (64px height <= 80px cap) */}
      <header
        className={`sticky top-0 ${Z_INDEX.stickyNav} h-16 border-b border-emerald-900/10 bg-[#f2f6f3]/85 backdrop-blur-md dark:border-emerald-100/10 dark:bg-[#09110d]/85`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/with-taste-skill/gemini-4-argon/5" className="flex items-center gap-2.5">
            <Leaf
              size={22}
              weight="regular"
              className="text-amber-600 dark:text-amber-400"
            />
            <span className="text-lg font-bold tracking-tight">Canopy</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-900/75 dark:text-emerald-100/75">
            <a
              href="#reflection"
              className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
            >
              Sanctuary
            </a>
            <a
              href="#rituals"
              className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
            >
              Daily Rituals
            </a>
            <a
              href="#privacy"
              className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
            >
              Privacy
            </a>
            <a
              href="#voices"
              className="transition-colors hover:text-amber-700 dark:hover:text-amber-400"
            >
              Stories
            </a>
          </nav>

          <a
            href="#begin"
            className="inline-flex h-10 items-center justify-center rounded-full bg-amber-600 px-5 text-sm font-semibold text-white transition-all hover:bg-amber-700 active:scale-[0.98] whitespace-nowrap dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
          >
            Begin journaling
          </a>
        </div>
      </header>

      <main>
        {/* SECTION 1: Asymmetric Split Hero (min-h-[100dvh], pt-16 <= pt-24 cap, max 4 text elements) */}
        <section className="min-h-[calc(100dvh-4rem)] pt-12 pb-16 md:pt-20 md:pb-24 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left 6 Cols: Max 4 Text Elements (Eyebrow #1, Headline <= 2 lines, Subtext <= 20 words, CTAs) */}
              <div className="lg:col-span-6 space-y-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400 font-semibold">
                  Calm Personal Memory
                </p>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.12] pb-1">
                  A quiet sanctuary where{" "}
                  <span className="italic font-normal">fleeting</span> thoughts
                  take root.
                </h1>

                <p className="text-base sm:text-lg text-emerald-900/80 dark:text-emerald-100/80 leading-relaxed max-w-[54ch]">
                  Speak or write daily reflections that gently resurface across seasons when your mind needs them most.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#begin"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-600 px-6 text-sm font-semibold text-white transition-all hover:bg-amber-700 active:scale-[0.98] whitespace-nowrap dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
                  >
                    <span>Begin journaling</span>
                    <ArrowRight size={16} weight="bold" />
                  </a>
                  <a
                    href="#reflection"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-emerald-900/20 bg-white/80 px-6 text-sm font-semibold text-emerald-950 transition-all hover:bg-white active:scale-[0.98] whitespace-nowrap dark:border-emerald-100/20 dark:bg-emerald-950/60 dark:text-emerald-50 dark:hover:bg-emerald-900"
                  >
                    Hear daily reflection
                  </a>
                </div>
              </div>

              {/* Right 6 Cols: Botanical Photography + Frosted Glass Caption Card Below */}
              <div className="lg:col-span-6">
                <CanopyReveal>
                  <div className="liquid-glass-web-approx rounded-2xl p-3">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-emerald-900/10">
                      <Image
                        src="https://picsum.photos/seed/canopy-sunlit-botanical-journal/1100/825"
                        alt="Sunlit wooden table with linen notebook and botanical foliage"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between px-2 py-1 text-xs text-emerald-950 dark:text-emerald-100">
                      <span>Morning voice walk transcribed on-device</span>
                      <span className="font-semibold text-amber-700 dark:text-amber-400">
                        3 Seasonal Echoes
                      </span>
                    </div>
                  </div>
                </CanopyReveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Logo Wall (Under Hero, Real SVG Marks, Logo-Only rule) */}
        <section
          aria-label="Teams and writers practicing calm reflection with Canopy"
          className="border-y border-emerald-900/10 bg-white/60 py-12 dark:border-emerald-100/10 dark:bg-emerald-950/30"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TrustedLogos className="text-emerald-900/70 dark:text-emerald-200/70" />
          </div>
        </section>

        {/* SECTION 3: Interactive Seasonal Memory Sanctuary (Client Leaf Component, Eyebrow #2 of 2) */}
        <section id="reflection" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400 font-semibold">
                Interactive Seasonal Recall
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Explore how past seasons resurface today.
              </h2>
              <p className="text-base text-emerald-900/80 dark:text-emerald-100/80 leading-relaxed max-w-[65ch]">
                Filter journal entries by season, test local voice recall, or plant a new reflection in the frosted-glass sanctuary below.
              </p>
            </div>

            <CanopyMemorySanctuary />
          </div>
        </section>

        {/* SECTION 4: Asymmetric 4-Cell Bento Grid (4 items = 4 cells, background diversity) */}
        <section
          id="rituals"
          className="border-y border-emerald-900/10 bg-emerald-950/5 py-24 sm:py-32 dark:border-emerald-100/10 dark:bg-emerald-950/20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Rhythms that respect your attention.
              </h2>
              <p className="text-base text-emerald-900/80 dark:text-emerald-100/80 leading-relaxed max-w-[65ch]">
                Canopy replaces rigid databases and notification badges with gentle seasonal cadences.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* Cell 1 (col-span-7): Warm Amber Accent Surface */}
              <div className="md:col-span-7 flex flex-col justify-between rounded-2xl bg-amber-600 p-8 text-white dark:bg-amber-500 dark:text-stone-950">
                <div className="space-y-3">
                  <SunHorizon size={28} weight="regular" />
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    On-This-Season Serendipity Digest
                  </h3>
                  <p className="text-sm opacity-95 leading-relaxed max-w-[55ch]">
                    Instead of overwhelming search results, Canopy prepares a Sunday morning folio pairing three notes from prior autumns or springs with your current inquiry.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 border-t border-current/20 pt-5 text-xs font-semibold">
                  <span className="rounded-full bg-black/15 px-4 py-1.5">
                    Sunday Morning Digest
                  </span>
                  <span className="rounded-full bg-black/15 px-4 py-1.5">
                    Zero Unread Badges
                  </span>
                </div>
              </div>

              {/* Cell 2 (col-span-5): Real Botanical Photography Cell */}
              <div className="md:col-span-5 flex flex-col justify-between rounded-2xl border border-emerald-900/15 bg-white p-6 dark:border-emerald-100/15 dark:bg-[#0e1a14]">
                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-emerald-900/10">
                  <Image
                    src="https://picsum.photos/seed/canopy-forest-trail-mist/800/550"
                    alt="Morning mist over a quiet forest walking trail"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 space-y-2">
                  <h3 className="text-xl font-bold tracking-tight">
                    Hands-Free Walking Memos
                  </h3>
                  <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 leading-relaxed">
                    Speak naturally while walking outdoors. Canopy removes filler pauses, formats clean paragraphs, and links mentioned people or books automatically.
                  </p>
                </div>
              </div>

              {/* Cell 3 (col-span-5): Deep Forest Surface Cell */}
              <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-[#13241b] p-8 text-[#ecf3ef] dark:border dark:border-emerald-100/15">
                <div className="space-y-3">
                  <MicrophoneStage
                    size={26}
                    weight="regular"
                    className="text-amber-400"
                  />
                  <h3 className="text-xl font-bold tracking-tight">
                    Ambient Audio Preservation
                  </h3>
                  <p className="text-sm text-emerald-100/80 leading-relaxed">
                    Tap any sentence in a transcribed note to hear the original voice recording and ambient birdsong from the moment you spoke it.
                  </p>
                </div>
                <p className="mt-8 text-xs font-semibold text-amber-400">
                  Word-level audio timestamp alignment
                </p>
              </div>

              {/* Cell 4 (col-span-7): Split Image + Tactile Print Export */}
              <div className="md:col-span-7 grid grid-cols-1 gap-6 rounded-2xl border border-emerald-900/15 bg-white p-6 sm:grid-cols-2 sm:items-center dark:border-emerald-100/15 dark:bg-[#0e1a14]">
                <div className="space-y-3">
                  <Sparkle
                    size={26}
                    weight="regular"
                    className="text-amber-600 dark:text-amber-400"
                  />
                  <h3 className="text-xl font-bold tracking-tight">
                    Annual Linen Almanac Printing
                  </h3>
                  <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 leading-relaxed">
                    At the winter solstice, compile your year’s favorite reflections and photographs into a typeset physical edition for your bookshelf.
                  </p>
                </div>
                <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-emerald-900/10">
                  <Image
                    src="https://picsum.photos/seed/canopy-linen-printed-almanac/800/600"
                    alt="Linen-bound printed journal resting on a wooden shelf"
                    fill
                    sizes="(max-width: 768px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: 3-Cluster Grouped Specifications (Section 4.9 grouped chunks pattern) */}
        <section id="privacy" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Private by architecture, yours for life.
              </h2>
              <p className="text-base text-emerald-900/80 dark:text-emerald-100/80 leading-relaxed max-w-[65ch]">
                Your second brain holds your most private reflections. We built Canopy so not even our engineers can read a single word.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {PRIVACY_CLUSTERS.map((cluster) => (
                <div
                  key={cluster.heading}
                  className="rounded-2xl border border-emerald-900/15 bg-white/80 p-8 dark:border-emerald-100/15 dark:bg-[#0e1a14]"
                >
                  <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400">
                    <ShieldCheck size={22} weight="regular" />
                    <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-50">
                      {cluster.heading}
                    </h3>
                  </div>
                  <div className="mt-5 border-t border-emerald-900/10 pt-5 space-y-4 dark:border-emerald-100/10">
                    {cluster.items.map((point) => (
                      <p
                        key={point}
                        className="text-sm text-emerald-900/85 dark:text-emerald-100/85 leading-relaxed"
                      >
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: Journaler Testimonials (Max 3 lines of quote body, zero em-dashes) */}
        <section
          id="voices"
          className="border-t border-emerald-900/10 bg-white/60 py-24 sm:py-32 dark:border-emerald-100/10 dark:bg-emerald-950/20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Kept by writers, illustrators, and quiet thinkers.
              </h2>
              <p className="text-base text-emerald-900/80 dark:text-emerald-100/80 leading-relaxed max-w-[65ch]">
                How daily reflection becomes a lifelong companion.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {JOURNALER_QUOTES.map((item) => (
                <blockquote
                  key={item.author}
                  className="flex flex-col justify-between rounded-2xl border border-emerald-900/15 bg-white p-8 dark:border-emerald-100/15 dark:bg-[#0e1a14]"
                >
                  <div>
                    <Quotes
                      size={28}
                      weight="regular"
                      className="text-amber-600 dark:text-amber-400"
                    />
                    <p className="mt-4 text-lg leading-relaxed text-emerald-950 dark:text-emerald-50 line-clamp-3">
                      “{item.quote}”
                    </p>
                  </div>
                  <footer className="mt-6 border-t border-emerald-900/10 pt-4 dark:border-emerald-100/10">
                    <p className="text-sm font-bold text-emerald-950 dark:text-emerald-50">
                      {item.author}
                    </p>
                    <p className="text-xs text-emerald-800/80 dark:text-emerald-200/80">
                      {item.role}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Sanctuary Conversion Section (Label above input, locked CTA "Begin journaling") */}
        <section
          id="begin"
          className="border-t border-emerald-900/10 py-24 sm:py-32 dark:border-emerald-100/10"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="liquid-glass-web-approx rounded-2xl p-8 sm:p-12">
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter leading-none">
                  Open your quiet sanctuary.
                </h2>
                <p className="text-base text-emerald-900/80 dark:text-emerald-100/80 leading-relaxed max-w-[60ch]">
                  Available on macOS, iOS, and Web with local voice transcription and end-to-end encrypted seasonal sync.
                </p>
              </div>

              <form
                action="#begin"
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-end"
              >
                <div className="sm:col-span-8 flex flex-col gap-2">
                  <label
                    htmlFor="canopy-signup-email"
                    className="text-xs font-semibold text-emerald-950 dark:text-emerald-100"
                  >
                    Personal email address
                  </label>
                  <input
                    id="canopy-signup-email"
                    name="email"
                    type="email"
                    required
                    placeholder="clara@botanical-studio.se"
                    className="h-12 rounded-xl border border-emerald-900/20 bg-white/90 px-4 text-sm text-emerald-950 placeholder:text-emerald-800/60 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/20 dark:border-emerald-200/20 dark:bg-emerald-950/80 dark:text-emerald-50 dark:placeholder:text-emerald-200/60"
                  />
                </div>
                <div className="sm:col-span-4">
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-600 px-6 text-sm font-semibold text-white transition-all hover:bg-amber-700 active:scale-[0.98] whitespace-nowrap dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
                  >
                    <span>Begin journaling</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-emerald-900/10 bg-white/80 py-12 dark:border-emerald-100/10 dark:bg-[#070d0a]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Leaf
              size={20}
              weight="regular"
              className="text-amber-600 dark:text-amber-400"
            />
            <span className="text-base font-bold">Canopy</span>
            <span className="text-xs text-emerald-800/75 dark:text-emerald-200/75">
              Calm Seasonal Second Brain
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-emerald-900/80 dark:text-emerald-100/80">
            <a href="#reflection" className="hover:text-amber-700 dark:hover:text-amber-400">
              Sanctuary
            </a>
            <a href="#rituals" className="hover:text-amber-700 dark:hover:text-amber-400">
              Daily Rituals
            </a>
            <a href="#privacy" className="hover:text-amber-700 dark:hover:text-amber-400">
              Privacy
            </a>
            <a href="#begin" className="hover:text-amber-700 dark:hover:text-amber-400">
              Begin journaling
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
