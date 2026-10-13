import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Notebook, Compass } from "@phosphor-icons/react/dist/ssr";
import { ITERATIONS } from "./components/iterations-data";

const ITERATION_PREVIEWS: Record<
  string,
  { seed: string; read: string; accentBadge: string }
> = {
  "1": {
    seed: "vellum-archival-folio-desk",
    read: "Editorial monograph for long-form researchers, with Cormorant Garamond & Plus Jakarta Sans in Alabaster and Cobalt.",
    accentBadge: "bg-blue-700 text-white",
  },
  "2": {
    seed: "cortex-graph-workstation-dark",
    read: "Local-first technical SaaS for engineers, with Space Grotesk & JetBrains Mono in Zinc and Emerald.",
    accentBadge: "bg-emerald-600 text-white",
  },
  "3": {
    seed: "atelier-spatial-studio-table",
    read: "Tactile spatial studio for visual directors, with Outfit & GSAP ScrollTrigger sticky-stack in Silver-Smoke and Vermilion.",
    accentBadge: "bg-orange-600 text-white",
  },
  "4": {
    seed: "zettel-swiss-architectural-grid",
    read: "High-density Swiss brutalist slip-box for Zettelkasten practitioners, with Geist & JetBrains Mono in Stone and Brick Red.",
    accentBadge: "bg-red-600 text-white",
  },
  "5": {
    seed: "canopy-botanical-morning-journal",
    read: "Organic calm daily recall for reflective thinkers, with Plus Jakarta Sans & frosted glass in Forest Mist and Amber.",
    accentBadge: "bg-amber-600 text-white",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-jakarta">
      <header className="h-16 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <Notebook size={20} weight="regular" className="text-blue-700 dark:text-blue-400" />
            <span className="font-semibold tracking-tight text-sm">
              Second Brain Architecture
            </span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            {ITERATIONS.map((it) => (
              <Link
                key={it.id}
                href={it.path}
                className="rounded-lg px-2.5 py-1.5 font-mono text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200/70 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                /{it.id} {it.brand}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg bg-blue-700/10 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
            <Compass size={14} weight="regular" />
            <span>Five Distinct Design Directions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
            One second brain. Five bespoke design systems.
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[65ch]">
            Explore five complete landing page iterations for a second-brain note-taking application. Use the floating switcher in the bottom-right corner at any time to jump between pages.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
          {ITERATIONS.map((it, idx) => {
            const preview = ITERATION_PREVIEWS[it.id];
            const spanClass =
              idx === 0
                ? "md:col-span-7"
                : idx === 1
                ? "md:col-span-5"
                : idx === 2
                ? "md:col-span-5"
                : idx === 3
                ? "md:col-span-7"
                : "md:col-span-12";

            return (
              <Link
                key={it.id}
                href={it.path}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-600 ${spanClass}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex items-center rounded-lg px-2.5 py-1 font-mono text-xs font-semibold ${preview.accentBadge}`}
                      >
                        /{it.id}
                      </span>
                      <h2 className="text-xl font-bold tracking-tight">
                        {it.brand}: {it.title}
                      </h2>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:border-zinc-700 dark:text-zinc-300">
                      <ArrowUpRight size={18} weight="regular" />
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[65ch]">
                    {preview.read}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="relative h-48 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={`https://picsum.photos/seed/${preview.seed}/900/500`}
                      alt={`${it.brand} workspace preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    <span>
                      VARIANCE: {it.dials.variance} / MOTION: {it.dials.motion} / DENSITY: {it.dials.density}
                    </span>
                    <span>Palette: {it.palette}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
