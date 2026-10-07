// Direction 5, "Loud Index": expressive, motion-led, large type.
// Dials: VARIANCE 9, MOTION 8, DENSITY 3.
// Bricolage Grotesque only. Off-white and off-black with one acid accent (lime), always used as a fill with dark text.
// Shape rule: arch for the hero photo, 40px for cards and panels, pills for controls.
// Motion has a job on every section: kinetic headline (hierarchy), parallax photo (depth),
// sticky stack (sequence), marquee (summary of features), hover fill (feedback).

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Asterisk } from "@/variants/with-taste-skill/haiku-5-5/source/components/icons";
import { KineticLine } from "@/variants/with-taste-skill/haiku-5-5/source/components/kinetic-line";
import { ParallaxFrame } from "@/variants/with-taste-skill/haiku-5-5/source/components/parallax-frame";
import { Reveal } from "@/variants/with-taste-skill/haiku-5-5/source/components/reveal";
import { StickyStack } from "@/variants/with-taste-skill/haiku-5-5/source/components/sticky-stack";
import { bricolage } from "@/variants/with-taste-skill/haiku-5-5/source/app/fonts";

export const metadata: Metadata = {
  title: "Cairn, direction 5: Loud Index",
};

const MARQUEE = [
  "Capture",
  "Connect",
  "Resurface",
  "Search by meaning",
  "Own your files",
];

const PEOPLE = [
  {
    name: "Writers",
    body: "Essays, drafts, and the half-finished ideas between them.",
  },
  {
    name: "Researchers",
    body: "Sources, quotes, and questions that feed the paper.",
  },
  {
    name: "Students",
    body: "Lectures and readings, reviewed before the exam.",
  },
  {
    name: "Builders",
    body: "Research, decisions, and customer notes for whoever comes next.",
  },
];

const STACK = [
  {
    id: "capture",
    className: "bg-zinc-50 text-zinc-950 ring-1 ring-zinc-200",
    children: (
      <div className="grid h-full gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h3 className="text-5xl font-bold tracking-tight md:text-6xl">
            Capture
          </h3>
          <p className="mt-6 max-w-[36ch] text-xl leading-relaxed text-zinc-700">
            Clip articles, paste highlights, and drop in PDFs. Every source
            keeps a link back to its page.
          </p>
        </div>
        <div className="relative h-[40dvh] min-h-[260px] overflow-hidden rounded-[28px]">
          <Image
            src="https://picsum.photos/seed/cairn-reading-chair/1200/900"
            alt="A road curving along a hillside at sunset"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    id: "connect",
    className: "bg-[#d9ff4f] text-zinc-950",
    children: (
      <div className="flex h-full flex-col justify-between gap-12">
        <h3 className="text-5xl font-bold tracking-tight md:text-6xl">
          Connect
        </h3>
        <p className="max-w-[22ch] text-4xl leading-[1.1] font-semibold tracking-tight md:text-6xl">
          Mention an idea and every note about it connects to it.
        </p>
      </div>
    ),
  },
  {
    id: "resurface",
    className: "bg-zinc-950 text-zinc-50",
    children: (
      <div className="grid h-full gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h3 className="text-5xl font-bold tracking-tight md:text-6xl">
            Resurface
          </h3>
          <p className="mt-6 max-w-[36ch] text-xl leading-relaxed text-zinc-300">
            Each morning, notes related to the work in front of you come back,
            so old reading can shape the draft you start now.
          </p>
        </div>
        <div className="relative h-[40dvh] min-h-[260px] overflow-hidden rounded-[28px]">
          <Image
            src="https://picsum.photos/seed/cairn-library-aisle/1200/900"
            alt="Snow-covered mountains above a valley"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    ),
  },
];

export default function LoudIndexDirection() {
  return (
    <div
      className={`${bricolage.className} flex w-full min-h-[100dvh] flex-1 flex-col bg-zinc-100 text-zinc-950 antialiased`}
    >
      <header className="sticky top-4 z-20 mx-auto mt-4 flex w-[min(92%,64rem)] items-center justify-between rounded-full bg-zinc-950 py-2 pr-2 pl-6 text-zinc-100">
        <Link href="/with-taste-skill/haiku-5-5/5" className="text-lg font-bold tracking-tight">
          Cairn
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#capture" className="transition-colors hover:text-[#d9ff4f]">
            Capture
          </a>
          <a href="#people" className="transition-colors hover:text-[#d9ff4f]">
            Who it is for
          </a>
        </div>
        <a
          href="#start"
          className="inline-flex h-10 items-center rounded-full bg-[#d9ff4f] px-5 text-sm font-semibold text-zinc-950 transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Start writing
        </a>
      </header>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pt-20 pb-24 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-7">
          <h1 className="text-5xl leading-[1.02] font-bold tracking-[-0.03em] sm:text-6xl md:text-7xl">
            <KineticLine text="Remember what" />
            <KineticLine text="you read." delay={0.3} />
          </h1>
          <p className="mt-8 max-w-[34ch] text-xl leading-relaxed text-zinc-700">
            Cairn links what you read and write, then brings it back at the
            moment you need it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <a
              href="#start"
              className="inline-flex h-14 items-center rounded-full bg-[#d9ff4f] px-8 text-lg font-semibold text-zinc-950 transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Start writing
            </a>
            <a
              href="#capture"
              className="inline-flex items-center gap-2 text-lg font-semibold underline decoration-2 underline-offset-8 transition-colors hover:text-zinc-600"
            >
              How it works
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="md:col-span-5">
          <ParallaxFrame
            src="https://picsum.photos/seed/cairn-typing-laptop/1000/1300"
            alt="Glass office towers seen from street level"
            priority
            className="h-[min(62dvh,640px)] w-full rounded-t-[999px]"
          />
        </div>
      </section>

      <div aria-hidden="true" className="overflow-hidden bg-zinc-950 py-6 text-zinc-50">
        <div className="cairn-marquee flex w-max items-center whitespace-nowrap text-5xl font-bold tracking-tight md:text-6xl">
          {[...MARQUEE, ...MARQUEE].map((word, index) => (
            <span key={`${word}-${index}`} className="flex items-center">
              <span className="px-8">{word}</span>
              <Asterisk size={36} weight="fill" className="text-[#d9ff4f]" />
            </span>
          ))}
        </div>
      </div>

      <section id="capture" className="mx-auto w-full max-w-7xl px-6 py-28 md:py-36">
        <h2 className="max-w-[16ch] text-5xl leading-[1.02] font-bold tracking-tight md:text-6xl">
          Notes that do the remembering.
        </h2>
        <div className="mt-20">
          <StickyStack items={STACK} />
        </div>
      </section>

      <section id="people" className="mx-auto w-full max-w-7xl px-6 pb-28">
        <Reveal>
          <h2 className="text-5xl font-bold tracking-tight md:text-6xl">
            Who it is for
          </h2>
        </Reveal>
        <ul className="mt-14 border-t border-zinc-300">
          {PEOPLE.map((person) => (
            <li key={person.name}>
              <Reveal>
                <div className="group flex flex-col gap-3 rounded-[40px] px-6 py-8 transition-colors duration-300 hover:bg-[#d9ff4f] md:flex-row md:items-baseline md:justify-between md:gap-12 md:px-10">
                  <p className="text-5xl font-bold tracking-tight md:text-6xl">
                    {person.name}
                  </p>
                  <p className="max-w-[40ch] text-lg leading-relaxed text-zinc-700 group-hover:text-zinc-950">
                    {person.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section id="start" className="px-6 pb-28">
        <Reveal className="mx-auto max-w-7xl rounded-[40px] bg-[#d9ff4f] px-8 py-20 md:px-16 md:py-28">
          <h2 className="max-w-[16ch] text-5xl leading-[1.02] font-bold tracking-tight text-zinc-950 md:text-6xl">
            Start with what you read today.
          </h2>
          <a
            href="#start"
            className="mt-12 inline-flex h-14 items-center rounded-full bg-zinc-950 px-8 text-lg font-semibold text-[#d9ff4f] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Start writing
          </a>
        </Reveal>
      </section>

      <footer className="mt-auto px-6 pb-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between">
          <span className="font-bold text-zinc-950">Cairn</span>
          <div className="flex flex-wrap gap-8">
            <a href="#" className="transition-colors hover:text-zinc-950">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-zinc-950">
              Export your notes
            </a>
            <a href="#" className="transition-colors hover:text-zinc-950">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
