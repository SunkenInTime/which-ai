// Direction 1, "Index": quiet light product page.
// Dials: VARIANCE 5, MOTION 3, DENSITY 3.
// One accent (emerald), Geist throughout, pills for controls, 28px radius for media.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cairn, direction 1: Index",
};

const primary =
  "inline-flex items-center justify-center rounded-full bg-emerald-700 font-medium text-zinc-50 transition-colors hover:bg-emerald-800 active:scale-[0.98]";

const secondary =
  "inline-flex items-center justify-center rounded-full border border-zinc-300 font-medium text-zinc-900 transition-colors hover:border-zinc-950";

const PEOPLE = [
  {
    name: "Researchers",
    body: "Keep sources, quotes, and open questions linked to the drafts they feed.",
  },
  {
    name: "Writers",
    body: "Gather material for essays and books without losing track of where it came from.",
  },
  {
    name: "Students",
    body: "Turn lectures and readings into notes you can review before the exam.",
  },
  {
    name: "Product teams",
    body: "Keep research, decisions, and customer quotes findable for whoever inherits the work.",
  },
];

export default function IndexDirection() {
  return (
    <div className="flex w-full min-h-[100dvh] flex-1 flex-col bg-zinc-50 font-sans text-zinc-950 antialiased">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-zinc-50/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
          <Link href="/with-taste-skill/haiku-5-5/1" className="text-lg font-semibold tracking-tight">
            Cairn
          </Link>
          <div className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
            <a href="#how" className="transition-colors hover:text-zinc-950">
              How it works
            </a>
            <a href="#people" className="transition-colors hover:text-zinc-950">
              Who it is for
            </a>
          </div>
          <a href="#start" className={`${primary} h-10 px-4 text-sm`}>
            Start writing
          </a>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 pt-14 pb-20 md:grid-cols-12 md:items-center md:pt-16 md:pb-24">
        <div className="md:col-span-6">
          <h1 className="text-5xl leading-[1.02] font-semibold tracking-tighter md:text-6xl">
            A second brain for everything you learn.
          </h1>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-zinc-600">
            Cairn links what you read and write to what you already know, then
            brings it back when it matters.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#start" className={`${primary} h-12 px-6 text-sm`}>
              Start writing
            </a>
            <a href="#how" className={`${secondary} h-12 px-6 text-sm`}>
              See how it works
            </a>
          </div>
        </div>
        <div className="relative h-[56vh] min-h-[340px] max-h-[600px] overflow-hidden rounded-[28px] md:col-span-6 md:h-[min(64dvh,600px)]">
          <Image
            src="https://picsum.photos/seed/cairn-arch-doorway/1600/1200"
            alt="Hands writing in a notebook beside a laptop"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="max-w-4xl text-4xl leading-[1.1] font-medium tracking-tight md:text-6xl">
            Most of what you read is forgotten within a week. Cairn keeps it
            connected to what you are working on now.
          </p>
        </div>
      </section>

      <section id="how" className="border-t border-zinc-200">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-12 md:items-center md:py-32">
          <div className="md:col-span-5">
            <h2 className="text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
              Capture without filing.
            </h2>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-zinc-600">
              Clip articles, paste highlights, and drop in PDFs. Every source
              keeps a link back to its page, so you can always check where an
              idea came from.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] md:col-span-6 md:col-start-7">
            <Image
              src="https://picsum.photos/seed/cairn-highlights-page/1200/900"
              alt="A stone embankment beside calm grey water"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
          <div className="max-w-3xl">
            <h3 className="text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
              Links form as you write.
            </h3>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-zinc-600">
              Mention an idea in one note and every other note about it
              connects, in both directions. Nothing needs a tag.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:grid-cols-12 md:items-center md:pb-32">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] md:col-span-6">
            <Image
              src="https://picsum.photos/seed/cairn-study-table/1200/900"
              alt="Sunlight through tall pines in a forest"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <h3 className="text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
              Old notes come back on their own.
            </h3>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-zinc-600">
              Each morning Cairn lists the notes related to what you opened
              yesterday. Read them, ignore them, or start a draft from them.
            </p>
          </div>
        </div>
      </section>

      <section
        id="people"
        className="border-t border-zinc-200"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-12 md:py-32">
          <h2 className="text-3xl font-semibold tracking-tight md:col-span-4 md:text-4xl">
            Who it is for
          </h2>
          <dl className="grid gap-x-16 gap-y-12 sm:grid-cols-2 md:col-span-8">
            {PEOPLE.map((person) => (
              <div key={person.name}>
                <dt className="text-xl font-medium tracking-tight">
                  {person.name}
                </dt>
                <dd className="mt-2 max-w-[36ch] leading-relaxed text-zinc-600">
                  {person.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="start" className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="rounded-[28px] bg-zinc-950 px-8 py-20 text-zinc-50 md:px-16">
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Start with one note.
          </h2>
          <p className="mt-4 max-w-[52ch] text-zinc-400">
            Bring the notes you already have. Cairn starts linking them as you
            go.
          </p>
          <a href="#start" className={`${primary} mt-10 h-12 px-6 text-sm`}>
            Start writing
          </a>
        </div>
      </section>

      <footer className="mt-auto border-t border-zinc-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span className="font-medium text-zinc-900">Cairn</span>
          <div className="flex flex-wrap gap-6">
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
