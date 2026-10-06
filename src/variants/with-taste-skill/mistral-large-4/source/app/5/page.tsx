import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { KineticHero } from "./KineticHero";
import { ScrollReveal } from "./ScrollReveal";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkle,
  Graph,
  Waveform,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "MNEMOS - THINK IN MOTION",
  description:
    "A second brain that moves the way you think. Capture, connect, recall. Kinetic, fluid, alive.",
};

const works = [
  {
    tag: "CAPTURE",
    title: "Thought, caught mid-air",
    desc: "A capture layer that lives one keystroke away. Ideas never wait for you to find the right folder.",
    icon: Sparkle,
    seed: "mnemos-kinetic-capture",
  },
  {
    tag: "CONNECT",
    title: "Ideas find each other",
    desc: "Mnemos reads between the lines and links related notes as you write. Your graph grows itself.",
    icon: Graph,
    seed: "mnemos-kinetic-connect",
  },
  {
    tag: "RECALL",
    title: "Memory, on demand",
    desc: "Ask in plain language. Mnemos surfaces the exact thought you are looking for, from years back.",
    icon: Waveform,
    seed: "mnemos-kinetic-recall",
  },
];

export default function Page5() {
  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white selection:bg-rose-500 selection:text-white">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 text-white">
          <Link href="./5" className="text-lg font-bold uppercase tracking-tighter">
            MNEMOS
          </Link>
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] md:flex">
            <Link href="./5" className="opacity-70 transition-opacity hover:opacity-100">Work</Link>
            <Link href="./5" className="opacity-70 transition-opacity hover:opacity-100">Studio</Link>
            <Link href="./5" className="opacity-70 transition-opacity hover:opacity-100">Contact</Link>
          </nav>
          <Link
            href="./5"
            className="border border-white px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black active:scale-95"
          >
            Start
          </Link>
        </div>
      </header>

      {/* Kinetic hero */}
      <KineticHero />

      {/* Manifesto strip */}
      <section className="border-y border-white/10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              (01) - THE PREMISE
            </p>
            <h2 className="mt-8 text-4xl leading-[1.1] font-light tracking-tight md:text-6xl lg:text-7xl">
              Your mind is not a filing cabinet.
              <br />
              <span className="text-zinc-500">
                It is a living, moving thing.
              </span>
              <br />
              Mnemos moves with it.
            </h2>
          </ScrollReveal>
        </div>
      </section>

      {/* Selected work - horizontal-feel stacked rows */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              (02) - SELECTED WORK
            </p>
          </ScrollReveal>
          <div className="mt-12 space-y-0">
            {works.map((w, i) => (
              <ScrollReveal key={w.tag}>
                <Link
                  href="./5"
                  className="group relative block border-t border-white/10 py-10 transition-colors last:border-b hover:bg-white/5 md:py-14"
                >
                  <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[80px_1fr_2fr_60px] md:gap-10">
                    <span className="font-mono text-xs text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-rose-400">
                        {w.tag}
                      </span>
                      <h3 className="mt-2 text-3xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">
                        {w.title}
                      </h3>
                    </div>
                    <p className="max-w-md text-sm leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-300">
                      {w.desc}
                    </p>
                    <span className="justify-self-start md:justify-self-end">
                      <ArrowUpRight
                        size={32}
                        weight="thin"
                        className="text-zinc-600 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-rose-400"
                      />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Big image break */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-sm">
          <Image
            src="https://picsum.photos/seed/mnemos-kinetic-wide/1800/900?grayscale"
            alt="Abstract long-exposure light trails"
            width={1800}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 py-24 md:py-40">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl text-center">
            <blockquote className="text-3xl font-light leading-[1.2] tracking-tight md:text-5xl">
              &ldquo;It doesn&rsquo;t feel like software.
              <br />
              It feels like <em className="italic">memory</em>.&rdquo;
            </blockquote>
            <p className="mt-8 text-xs uppercase tracking-[0.25em] text-zinc-500">
              A. OKONKWO - DESIGNER
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32">
        <ScrollReveal>
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-5xl font-light tracking-tighter md:text-7xl lg:text-8xl">
              Think in motion.
            </h2>
            <Link
              href="./5"
              className="group mt-10 inline-flex items-center gap-3 border border-white px-8 py-4 text-sm uppercase tracking-[0.2em] transition-colors hover:bg-rose-500 hover:border-rose-500 active:scale-95"
            >
              Enter Mnemos
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          <span>MNEMOS - THINK IN MOTION</span>
          <div className="flex gap-6">
            <Link href="./5" className="transition-colors hover:text-white">Twitter</Link>
            <Link href="./5" className="transition-colors hover:text-white">Instagram</Link>
            <Link href="./5" className="transition-colors hover:text-white">Are.na</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
