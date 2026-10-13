import Image from "next/image";
import Link from "next/link";
import {
  BoundingBox,
  CubeTransparent,
  Palette,
  Quotes,
  Camera,
} from "@phosphor-icons/react/dist/ssr";
import { TrustedLogos } from "../components/TrustedLogos";
import { Z_INDEX } from "../components/z-index";
import { AtelierStickyStack } from "./AtelierStickyStack";
import {
  AtelierSpatialBoard,
  MagneticStudioButton,
} from "./AtelierSpatialBoard";

/**
 * ITERATION /3: ATELIER
 * Design Read: "Reading this as: spatial studio landing page for creative directors, architects, and visual thinkers, with a tactile kinetic choreography language, leaning toward Tailwind v4 + Outfit + GSAP ScrollTrigger sticky-stack + Silver-Smoke & Vermilion palette."
 * Dials: DESIGN_VARIANCE: 9, MOTION_INTENSITY: 8, VISUAL_DENSITY: 3
 * Palette Lock (Section 4.2): Cold Luxury Silver-Smoke (zinc-100 / dark:zinc-950) + single Vermilion / Burnt Orange accent (orange-600 / dark:orange-500).
 * Shape Lock (Section 4.4): rounded-2xl across all containers, buttons, and inputs.
 * CTA Intent Lock (Section 4.5): "Open studio" used for all primary signup CTAs.
 */

const DIRECTOR_QUOTES = [
  {
    quote:
      "Linear documents flatten how our architecture studio thinks. Atelier lets us lay out two hundred facade studies, material samples, and structural notes on a single table.",
    author: "Kaspar Lindholm",
    role: "Founding Partner, Lindholm & Vestergaard Architects",
  },
  {
    quote:
      "Every film treatment begins as a chaotic wall of stills and lighting notes. Atelier remembers where every frame came from and turns the board into a pitch deck in seconds.",
    author: "Nadia Okafor",
    role: "Creative Director, Studio Monochrome",
  },
];

export default function AtelierPage() {
  return (
    <div className="min-h-[100dvh] bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-orange-600 selection:text-white">
      {/* Sticky Single-Line Navigation (64px height <= 80px cap) */}
      <header
        className={`sticky top-0 ${Z_INDEX.stickyNav} h-16 border-b border-zinc-300/80 bg-zinc-100/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/with-taste-skill/gemini-4-argon/3" className="flex items-center gap-2.5">
            <BoundingBox
              size={22}
              weight="regular"
              className="text-orange-600 dark:text-orange-400"
            />
            <span className="font-outfit text-xl font-bold tracking-tight">
              ATELIER
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href="#layers"
              className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
            >
              Spatial Stack
            </a>
            <a
              href="#canvas"
              className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
            >
              Interactive Table
            </a>
            <a
              href="#materials"
              className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
            >
              Materiality
            </a>
            <a
              href="#directors"
              className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
            >
              Studios
            </a>
          </nav>

          <a
            href="#join"
            className="inline-flex h-10 items-center justify-center rounded-2xl bg-orange-600 px-4 text-sm font-semibold text-white transition-all hover:bg-orange-700 active:scale-[0.98] whitespace-nowrap dark:bg-orange-500 dark:text-zinc-950 dark:hover:bg-orange-400"
          >
            Open studio
          </a>
        </div>
      </header>

      <main>
        {/* SECTION 1: Asymmetric High-Variance Split Hero (min-h-[100dvh], pt-16 <= pt-24 cap, max 4 text elements) */}
        <section className="min-h-[calc(100dvh-4rem)] pt-12 pb-16 md:pt-20 md:pb-24 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left 6 Cols: Max 4 Text Elements (Eyebrow #1, Headline <= 2 lines, Subtext <= 20 words, CTAs) */}
              <div className="lg:col-span-6 space-y-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400 font-semibold">
                  Spatial Second Brain
                </p>

                <h1 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] pb-1">
                  Think across infinite canvases, not{" "}
                  <span className="italic font-normal">rigid</span> folders.
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[54ch]">
                  Arrange architectural references, film frames, and handwritten sketches on an infinite spatial table that remembers how ideas connect.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <MagneticStudioButton href="#join" label="Open studio" />
                  <a
                    href="#canvas"
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900 transition-all hover:border-zinc-400 hover:bg-zinc-200/60 active:scale-[0.98] whitespace-nowrap dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Inspect board
                  </a>
                </div>
              </div>

              {/* Right 6 Cols: High-Variance Offset Multi-Aspect Composition (4:3 next to 16:9 per Section 7) */}
              <div className="lg:col-span-6 grid grid-cols-1 gap-4 sm:grid-cols-12">
                <div className="sm:col-span-7 rounded-2xl border border-zinc-300 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src="https://picsum.photos/seed/atelier-hero-architectural-table/900/675"
                      alt="Curated architectural models and tactile material swatches on studio desk"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2.5 px-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    North Pavilion Material Board (240 linked notes)
                  </p>
                </div>

                <div className="sm:col-span-5 sm:mt-8 rounded-2xl border border-zinc-300 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src="https://picsum.photos/seed/atelier-hero-color-optics/700/450"
                      alt="Color optics and lighting study pinned on spatial canvas"
                      fill
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2.5 px-1 font-mono text-xs text-orange-600 dark:text-orange-400 font-semibold">
                    Optical Palette Extraction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Logo Wall (Under Hero, Real SVG Marks, Logo-Only rule) */}
        <section
          aria-label="Design studios and creative teams using Atelier"
          className="border-y border-zinc-300/80 bg-white py-12 dark:border-zinc-800/80 dark:bg-zinc-900/50"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TrustedLogos className="text-zinc-600 dark:text-zinc-400" />
          </div>
        </section>

        {/* SECTION 3: GSAP ScrollTrigger Sticky-Stack Choreography (Section 5.A canonical skeleton) */}
        <section id="layers" className="py-16">
          <div className="mx-auto max-w-7xl px-4 pt-12 pb-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-outfit text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Three spatial layers for visual recall.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[65ch]">
                Scroll through how Atelier takes raw creative fragments from first capture to finished client folio.
              </p>
            </div>
          </div>

          <AtelierStickyStack />
        </section>

        {/* SECTION 4: Interactive Spatial Moodboard Workbench (Client Leaf Component, Eyebrow #2 of 2) */}
        <section
          id="canvas"
          className="border-y border-zinc-300/80 bg-zinc-200/50 py-24 sm:py-32 dark:border-zinc-800/80 dark:bg-zinc-900/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400 font-semibold">
                Interactive Studio Canvas
              </p>
              <h2 className="font-outfit text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Filter your spatial board and pin new swatches.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[65ch]">
                Test live hue clustering, medium filtering, and coordinate pinning on an interactive Atelier board.
              </p>
            </div>

            <AtelierSpatialBoard />
          </div>
        </section>

        {/* SECTION 5: Asymmetric 3-Cell Bento Grid (3 items = 3 cells, background diversity) */}
        <section id="materials" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-outfit text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Built for high-resolution visual memory.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[65ch]">
                Every pixel, colour profile, and margin sketch remains sharp at any zoom level.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* Cell 1 (col-span-7): Vermilion Accent Surface */}
              <div className="md:col-span-7 flex flex-col justify-between rounded-2xl bg-orange-600 p-8 text-white dark:bg-orange-500 dark:text-zinc-950">
                <div className="space-y-3">
                  <Palette size={28} weight="regular" />
                  <h3 className="font-outfit text-3xl font-bold tracking-tight">
                    Automatic Perceptual Color Indexing
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed max-w-[55ch]">
                    Search your second brain by Oklch color harmony, lighting temperature, or surface texture without manually tagging a single image.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 border-t border-current/20 pt-5 font-mono text-xs font-semibold">
                  <span className="rounded-2xl bg-black/15 px-3.5 py-1.5">
                    Oklch Gamut
                  </span>
                  <span className="rounded-2xl bg-black/15 px-3.5 py-1.5">
                    Display P3 Native
                  </span>
                  <span className="rounded-2xl bg-black/15 px-3.5 py-1.5">
                    RAW + EXIF
                  </span>
                </div>
              </div>

              {/* Cell 2 (col-span-5): Dark Chrome Surface */}
              <div className="md:col-span-5 flex flex-col justify-between rounded-2xl bg-zinc-900 p-8 text-zinc-100 dark:border dark:border-zinc-800">
                <div className="space-y-3">
                  <CubeTransparent
                    size={28}
                    weight="regular"
                    className="text-orange-500"
                  />
                  <h3 className="font-outfit text-2xl font-bold tracking-tight">
                    Infinite Zoom Without Blur
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Tiled mipmap streaming lets you zoom from a 5,000-item bird’s-eye project overview down to individual pencil strokes at 120 frames per second.
                  </p>
                </div>
                <p className="mt-8 font-mono text-xs text-orange-400">
                  Zoom range: 2% overview to 6400% detail
                </p>
              </div>

              {/* Cell 3 (col-span-12): Full-Width Split Image + Feature Row */}
              <div className="md:col-span-12 grid grid-cols-1 gap-8 rounded-2xl border border-zinc-300 bg-white p-6 sm:p-8 lg:grid-cols-12 lg:items-center dark:border-zinc-800 dark:bg-zinc-900">
                <div className="lg:col-span-5 space-y-3">
                  <Camera
                    size={28}
                    weight="regular"
                    className="text-orange-600 dark:text-orange-400"
                  />
                  <h3 className="font-outfit text-2xl sm:text-3xl font-bold tracking-tight">
                    iOS Companion Loupe for Field Capture
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Snap architectural details, fabric weaves, or exhibition plaques on your phone. They land directly on your active desktop table with GPS and compass orientation preserved.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src="https://picsum.photos/seed/atelier-field-photography-loupe/1100/550"
                      alt="Architectural facade detail captured during site visit"
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Creative Director Testimonials (Max 3 lines of quote body, zero em-dashes) */}
        <section
          id="directors"
          className="border-t border-zinc-300/80 bg-white py-24 sm:py-32 dark:border-zinc-800/80 dark:bg-zinc-900/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-outfit text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                Adopted by visual directors and architects.
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[65ch]">
                How multi-disciplinary studios replace scattered reference folders with Atelier.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {DIRECTOR_QUOTES.map((item) => (
                <blockquote
                  key={item.author}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-100/80 p-8 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div>
                    <Quotes
                      size={28}
                      weight="regular"
                      className="text-orange-600 dark:text-orange-400"
                    />
                    <p className="mt-4 font-outfit text-xl leading-snug text-zinc-900 dark:text-zinc-100 line-clamp-3">
                      “{item.quote}”
                    </p>
                  </div>
                  <footer className="mt-6 border-t border-zinc-300/80 pt-4 dark:border-zinc-800">
                    <p className="font-outfit text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {item.author}
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {item.role}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Conversion Section (Label above input, locked CTA "Open studio") */}
        <section
          id="join"
          className="border-t border-zinc-300/80 py-24 sm:py-32 dark:border-zinc-800/80"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-zinc-300 bg-white p-8 sm:p-12 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="space-y-3">
                <h2 className="font-outfit text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                  Set up your spatial studio table.
                </h2>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[60ch]">
                  Start with unlimited spatial boards, Display P3 color indexing, and native macOS & iPadOS sync.
                </p>
              </div>

              <form
                action="#join"
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-end"
              >
                <div className="sm:col-span-8 flex flex-col gap-2">
                  <label
                    htmlFor="atelier-studio-email"
                    className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    Studio or personal email address
                  </label>
                  <input
                    id="atelier-studio-email"
                    name="email"
                    type="email"
                    required
                    placeholder="kaspar@lindholm-architects.dk"
                    className="h-12 rounded-2xl border border-zinc-300 bg-zinc-100 px-4 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-400"
                  />
                </div>
                <div className="sm:col-span-4">
                  <button
                    type="submit"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 px-6 text-sm font-semibold text-white transition-all hover:bg-orange-700 active:scale-[0.98] whitespace-nowrap dark:bg-orange-500 dark:text-zinc-950 dark:hover:bg-orange-400"
                  >
                    <span>Open studio</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-300/80 bg-white py-12 dark:border-zinc-800/80 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <BoundingBox
              size={20}
              weight="regular"
              className="text-orange-600 dark:text-orange-400"
            />
            <span className="font-outfit text-base font-bold">ATELIER</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Spatial Second Brain for Visual Thinkers
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <a href="#layers" className="hover:text-orange-600 dark:hover:text-orange-400">
              Spatial Stack
            </a>
            <a href="#canvas" className="hover:text-orange-600 dark:hover:text-orange-400">
              Interactive Table
            </a>
            <a href="#materials" className="hover:text-orange-600 dark:hover:text-orange-400">
              Materiality
            </a>
            <a href="#join" className="hover:text-orange-600 dark:hover:text-orange-400">
              Open studio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
