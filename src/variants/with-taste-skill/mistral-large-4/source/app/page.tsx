import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Desktop,
  Newspaper,
  GridFour,
  Cube,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Mnemos - Design Iterations",
  description:
    "Five design iterations for Mnemos, a second-brain note-taking app. Pick a direction.",
};

const iterations = [
  {
    href: "/1",
    num: "01",
    name: "Linear",
    vibe: "Minimal dark SaaS",
    desc: "Asymmetric split hero, emerald accent on near-black. Restrained motion, Geist type. For technical buyers who want calm and speed.",
    icon: Desktop,
    bg: "bg-[#0a0a0b]",
    text: "text-zinc-100",
    accent: "text-emerald-400",
    border: "border-zinc-800",
  },
  {
    href: "/2",
    num: "02",
    name: "Editorial",
    vibe: "Serif, light, literary",
    desc: "Centered manifesto hero, Instrument Serif on warm paper. Hairline chapter list, generous whitespace. For writers and thinkers.",
    icon: Newspaper,
    bg: "bg-[#faf9f6]",
    text: "text-stone-900",
    accent: "text-stone-500",
    border: "border-stone-200",
  },
  {
    href: "/3",
    num: "03",
    name: "Brutalist",
    vibe: "Raw, mono, unapologetic",
    desc: "Hard 4px borders, Archivo Black display, safety-orange accent. Marquee ticker, spec-sheet grid. For people who hate SaaS.",
    icon: GridFour,
    bg: "bg-[#f2f0ea]",
    text: "text-black",
    accent: "text-[#ff4d00]",
    border: "border-black",
  },
  {
    href: "/4",
    num: "04",
    name: "Premium",
    vibe: "Apple-y bento, cold luxury",
    desc: "Centered hero, asymmetric bento grid with real imagery. Silver-on-charcoal with a single emerald accent. For mainstream consumers.",
    icon: Cube,
    bg: "bg-[#0c0e0d]",
    text: "text-zinc-100",
    accent: "text-emerald-400",
    border: "border-zinc-800",
  },
  {
    href: "/5",
    num: "05",
    name: "Kinetic",
    vibe: "Awwwards, experimental",
    desc: "Kinetic staggered headline, outlined type, mix-blend-difference nav. Rose accent on pure black. Scroll-reveal choreography.",
    icon: Lightning,
    bg: "bg-[#0a0a0a]",
    text: "text-white",
    accent: "text-rose-500",
    border: "border-white/10",
  },
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-xs font-bold text-zinc-900">
            M
          </span>
          Mnemos
        </span>
        <span className="text-xs text-zinc-500">Design iterations</span>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-24">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Second brain - note-taking app
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 md:text-6xl">
          Five ways to build a second brain.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
          Five complete landing-page iterations for Mnemos, each with a
          distinct design language. Use the switcher in the bottom-right
          corner to jump between them on any page.
        </p>
      </section>

      {/* Iteration cards */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {iterations.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`group relative overflow-hidden rounded-2xl border ${it.border} ${it.bg} p-8 transition-transform duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99]`}
            >
              {/* Preview strip */}
              <div
                className={`mb-8 h-28 rounded-xl border ${it.border} ${it.bg} p-4 opacity-80`}
              >
                <div className="flex h-full items-end gap-1.5">
                  <div className={`h-3 w-16 rounded-sm ${it.accent} opacity-40`} />
                  <div className={`h-6 w-10 rounded-sm ${it.accent} opacity-60`} />
                  <div className={`h-10 w-7 rounded-sm ${it.accent} opacity-80`} />
                  <div className={`h-4 w-12 rounded-sm ${it.accent} opacity-30`} />
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${it.accent}`}>
                      {it.num}
                    </span>
                    <it.icon size={18} className={it.accent} weight="duotone" />
                  </div>
                  <h2 className={`mt-3 text-2xl font-semibold tracking-tight ${it.text}`}>
                    {it.name}
                  </h2>
                  <p className={`mt-1 text-sm font-medium ${it.accent}`}>
                    {it.vibe}
                  </p>
                  <p
                    className={`mt-3 max-w-md text-sm leading-relaxed ${
                      it.bg.includes("faf9f6") || it.bg.includes("f2f0ea")
                        ? "text-stone-600"
                        : "text-zinc-400"
                    }`}
                  >
                    {it.desc}
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  weight="bold"
                  className={`shrink-0 ${it.accent} transition-transform duration-300 group-hover:translate-x-1`}
                />
              </div>

              <span
                className={`absolute right-6 top-6 rounded-full border ${it.border} px-3 py-1 text-[11px] font-medium uppercase tracking-widest ${
                  it.bg.includes("faf9f6") || it.bg.includes("f2f0ea")
                    ? "text-stone-500"
                    : "text-zinc-500"
                }`}
              >
                View
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs text-zinc-600">
          <span>Mnemos. Five iterations, one second brain.</span>
          <span>Use the pill switcher, bottom-right, on any page.</span>
        </div>
      </footer>
    </div>
  );
}
