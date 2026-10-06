import Link from "next/link";
import {
  ArrowRight,
  Sparkle,
  Newspaper,
  Terminal,
  Leaf,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";

const versions = [
  {
    num: "1",
    href: "/1",
    label: "Linear Dark",
    description: "Minimalist dark SaaS. Restrained motion, indigo accent, asymmetric split hero with bento features.",
    vibe: "For technical buyers who value speed and clarity",
    icon: Sparkle,
    bg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    border: "border-indigo-500/20",
  },
  {
    num: "2",
    href: "/2",
    label: "Editorial",
    description: "Warm paper tones, serif display type, centered manifesto hero. Feels like a literary magazine.",
    vibe: "For writers, essayists, and deep thinkers",
    icon: Newspaper,
    bg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    border: "border-amber-500/20",
  },
  {
    num: "3",
    href: "/3",
    label: "Brutalist",
    description: "Raw monospace, hard borders, terminal aesthetics, marquee strip. Loud, fast, unapologetic.",
    vibe: "For developers and hackers who want zero friction",
    icon: Terminal,
    bg: "bg-lime-500/10",
    iconColor: "text-lime-400",
    border: "border-lime-500/20",
  },
  {
    num: "4",
    href: "/4",
    label: "Premium Light",
    description: "Apple-inspired warmth, soft emerald accent, generous whitespace, editorial photography.",
    vibe: "For design-conscious consumers who value calm",
    icon: Leaf,
    bg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    border: "border-emerald-500/20",
  },
  {
    num: "5",
    href: "/5",
    label: "Kinetic",
    description: "Animated gradient blobs, kinetic typography, floating glass cards, scroll reveals. Pure motion.",
    vibe: "For creatives who want to feel something",
    icon: Lightning,
    bg: "bg-rose-500/10",
    iconColor: "text-rose-400",
    border: "border-rose-500/20",
  },
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center md:pt-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          5 design directions for Mnemosyne
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
          One product.
          <br />
          <span className="text-zinc-500">Five personalities.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
          Mnemosyne is a second-brain note-taking app. We designed five distinct
          landing pages, each with its own visual language, motion style, and
          audience. Pick a direction to explore.
        </p>
      </header>

      {/* Version cards */}
      <main className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {versions.map((v) => (
            <Link
              key={v.num}
              href={v.href}
              className={`group relative overflow-hidden rounded-2xl border ${v.border} bg-zinc-900/50 p-7 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900 hover:shadow-xl hover:shadow-zinc-950/50 hover:-translate-y-1`}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${v.bg}`}>
                  <v.icon size={24} weight="duotone" className={v.iconColor} />
                </div>
                <span className="font-mono text-sm text-zinc-600">/{v.num}</span>
              </div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
                {v.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {v.description}
              </p>
              <p className="mt-4 text-xs italic text-zinc-500">{v.vibe}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors group-hover:text-white">
                View design
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-zinc-600">
          Mnemosyne - Your second brain. Five design iterations, one product.
        </div>
      </footer>
    </div>
  );
}
