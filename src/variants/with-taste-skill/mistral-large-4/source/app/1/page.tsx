import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Graph,
  MagnifyingGlass,
  LockKey,
  ArrowRight,
  Sparkle,
  NotePencil,
  Bell,
} from "@phosphor-icons/react/dist/ssr";
import { HeroReveal } from "./HeroReveal";

export const metadata: Metadata = {
  title: "Mnemos - Think at the speed of thought",
  description:
    "A second brain that captures, connects, and recalls everything you know.",
};

const features = [
  {
    icon: Graph,
    title: "Connected by default",
    body: "Every note links to something. Your ideas form a graph, not a pile of files.",
  },
  {
    icon: MagnifyingGlass,
    title: "Recall anything",
    body: "Semantic search finds the note you half-remember, even when you can't.",
  },
  {
    icon: LockKey,
    title: "Private by design",
    body: "End-to-end encrypted. Your second brain belongs to you alone.",
  },
];

const stats = [
  { value: "12ms", label: "average capture latency" },
  { value: "0", label: "ads, ever" },
  { value: "100%", label: "your data, exportable" },
];

export default function Page1() {
  return (
    <div className="min-h-[100dvh] bg-[#0a0a0b] text-zinc-100">
      {/* Nav */}
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="./1" className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-xs font-bold text-zinc-900">
            M
          </span>
          Mnemos
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
          <Link href="./1" className="transition-colors hover:text-zinc-100">Features</Link>
          <Link href="./1" className="transition-colors hover:text-zinc-100">Method</Link>
          <Link href="./1" className="transition-colors hover:text-zinc-100">Pricing</Link>
        </nav>
        <Link
          href="./1"
          className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white active:scale-[0.98]"
        >
          Start free
        </Link>
      </header>

      {/* Hero - asymmetric split */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-16 pb-24 md:grid-cols-2 md:items-center md:pt-24">
        <div>
          <HeroReveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400">
              <Sparkle size={12} weight="fill" className="text-emerald-400" />
              Now with semantic recall
            </div>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-50 md:text-6xl">
              Think at the speed
              <br />
              of thought.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
              Mnemos is a second brain that captures, connects, and recalls
              everything you know. No folders. No friction. Just memory.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="./1"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white active:scale-[0.98]"
              >
                Start free
                <ArrowRight size={14} weight="bold" />
              </Link>
              <Link
                href="./1"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100 active:scale-[0.98]"
              >
                See how it works
              </Link>
            </div>
          </HeroReveal>
        </div>
        <HeroReveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent blur-2xl" />
            <Image
              src="https://picsum.photos/seed/mnemos-dark-desk/900/700?grayscale"
              alt="A quiet desk with a notebook and laptop, in low light"
              width={900}
              height={700}
              priority
              className="relative rounded-2xl border border-zinc-800 object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-300 backdrop-blur-md">
              <NotePencil size={14} className="text-emerald-400" />
              <span className="font-mono">capture: 12ms</span>
            </div>
          </div>
        </HeroReveal>
      </section>

      {/* Logo wall */}
      <section className="border-t border-zinc-900 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-600">
            Trusted by thinkers at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-zinc-600">
            <span className="tracking-tight">Northwind</span>
            <span className="tracking-tight">Helios Labs</span>
            <span className="tracking-tight">Fieldnote</span>
            <span className="tracking-tight">Arcadia</span>
            <span className="tracking-tight">Meridian</span>
          </div>
        </div>
      </section>

      {/* Features - asymmetric 2-col, not 3 equal cards */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
          Built for the way minds actually work.
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 ${
                i === 0 ? "md:col-span-2 md:p-12" : ""
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800">
                <f.icon size={18} className="text-emerald-400" weight="duotone" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-100">
                {f.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-zinc-900 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-mono text-4xl font-semibold tracking-tight text-zinc-50">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <blockquote className="text-xl leading-relaxed text-zinc-300 md:text-2xl">
          &ldquo;I stopped losing ideas the week I switched. It&rsquo;s the
          closest thing to remembering everything.&rdquo;
        </blockquote>
        <p className="mt-6 text-sm text-zinc-500">
          <span className="font-medium text-zinc-300">Ines Okafor</span>
          <span className="mx-2 text-zinc-700">/</span>
          Research lead, Helios Labs
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-12 text-center md:p-20">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Start building your second brain.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-zinc-400">
            Free for personal use. No credit card. Your notes stay yours.
          </p>
          <Link
            href="./1"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-white active:scale-[0.98]"
          >
            <Bell size={14} weight="bold" />
            Start free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs text-zinc-600">
          <span>Mnemos. Your second brain.</span>
          <div className="flex gap-6">
            <Link href="./1" className="transition-colors hover:text-zinc-300">Privacy</Link>
            <Link href="./1" className="transition-colors hover:text-zinc-300">Terms</Link>
            <Link href="./1" className="transition-colors hover:text-zinc-300">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
