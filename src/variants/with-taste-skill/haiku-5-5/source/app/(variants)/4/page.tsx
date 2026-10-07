// Direction 4, "Field Grid": bento layout on a light neutral field.
// Dials: VARIANCE 8, MOTION 6, DENSITY 4.
// Instrument Sans for text, IBM Plex Mono for small labels.
// One accent (burnt orange), used on the primary action and one feature cell.
// Shape rule: feature cells 24px, media inside cells 18px, all controls are pills.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "@/variants/with-taste-skill/haiku-5-5/source/components/icons";
import { Reveal } from "@/variants/with-taste-skill/haiku-5-5/source/components/reveal";
import { instrument, plexMono } from "@/variants/with-taste-skill/haiku-5-5/source/app/fonts";

export const metadata: Metadata = {
  title: "Cairn, direction 4: Field Grid",
};

const primary =
  "inline-flex items-center justify-center rounded-full bg-orange-700 font-medium text-zinc-50 transition-colors hover:bg-orange-800 active:scale-[0.98]";

const secondary =
  "inline-flex items-center justify-center rounded-full border border-zinc-400 font-medium text-zinc-900 transition-colors hover:border-zinc-900";

const FAQ = [
  {
    q: "Does Cairn work offline?",
    a: "Yes. Notes you have opened stay available without a connection, and changes sync when you are back online.",
  },
  {
    q: "Where are my notes kept?",
    a: "On your device, as plain Markdown files. Cairn keeps a search index next to them.",
  },
  {
    q: "Can I bring in notes from other apps?",
    a: "Yes. Markdown folders, exported notes, and clipped web pages can all be imported.",
  },
  {
    q: "Who can read my notes?",
    a: "Only you, unless you choose to share a note.",
  },
];

export default function FieldGridDirection() {
  return (
    <div
      className={`${instrument.className} flex w-full min-h-[100dvh] flex-1 flex-col bg-zinc-100 text-zinc-950 antialiased`}
    >
      <header className="sticky top-0 z-20 bg-zinc-100/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
          <Link href="/with-taste-skill/haiku-5-5/4" className="text-xl font-semibold tracking-tight">
            Cairn
          </Link>
          <div className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
            <a href="#features" className="transition-colors hover:text-zinc-950">
              Features
            </a>
            <a href="#questions" className="transition-colors hover:text-zinc-950">
              Questions
            </a>
          </div>
          <a href="#start" className={`${primary} h-10 px-5 text-sm`}>
            Start writing
          </a>
        </nav>
      </header>

      <section className="mx-auto w-full max-w-7xl px-6 pt-16 md:pt-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <h1 className="text-balance text-5xl leading-[1.02] font-semibold tracking-tight md:col-span-8 md:text-6xl">
            Capture it once. Use it for years.
          </h1>
          <div className="md:col-span-4 md:pb-2">
            <p className="text-lg leading-relaxed text-zinc-600">
              Cairn keeps what you read and write in one place, links it
              together, and brings it back when useful.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#start" className={`${primary} h-12 px-6 text-sm`}>
                Start writing
              </a>
              <a href="#features" className={`${secondary} h-12 px-6 text-sm`}>
                See how it works
              </a>
            </div>
          </div>
        </div>
        <div className="relative mt-14 h-[38vh] min-h-[260px] max-h-[460px] overflow-hidden rounded-[24px]">
          <Image
            src="https://picsum.photos/seed/cairn-library-stacks/2400/900"
            alt="A calm bay with a small boat and a city skyline in the distance"
            fill
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-7xl px-6 pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="grid gap-4 md:grid-cols-12">
          <Reveal className="flex flex-col gap-10 rounded-[24px] bg-zinc-50 p-8 md:col-span-7 md:row-span-2 md:p-10">
            <div>
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Save what you read, wherever you read it.
              </h2>
              <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-zinc-600">
                Browser clips, highlights from PDFs, and voice notes all land in
                one inbox.
              </p>
            </div>
            <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[18px]">
              <Image
                src="https://picsum.photos/seed/cairn-arch-doorway/1200/900"
                alt="Hands writing in a notebook beside a laptop"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-[24px] bg-zinc-900 p-8 text-zinc-50 md:col-span-5">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Links appear as you type.
            </h3>
            <p className="mt-4 leading-relaxed text-zinc-300">
              Mention an idea and it connects to every note about it, in both
              directions.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="rounded-[24px] bg-zinc-50 p-8 md:col-span-5">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Old notes come back each morning.
            </h3>
            <p className="mt-4 leading-relaxed text-zinc-600">
              Cairn shows the notes most related to what you opened yesterday.
            </p>
          </Reveal>

          <Reveal className="rounded-[24px] bg-zinc-50 p-8 md:col-span-5">
            <div className="relative mb-8 h-44 overflow-hidden rounded-[18px]">
              <Image
                src="https://picsum.photos/seed/cairn-search-street/1000/600"
                alt="Close view of rippling blue water"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Search by meaning.
            </h3>
            <p className="mt-4 leading-relaxed text-zinc-600">
              Type the idea, not the exact words. Results include notes that
              said it differently.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col justify-end rounded-[24px] bg-orange-700 p-8 text-zinc-50 md:col-span-7 md:p-10">
            <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Your files stay plain text.
            </h3>
            <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-orange-50">
              Notes are saved as Markdown on your device, so you can read, move,
              or back them up with any tool.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="questions" className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-28 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <h2 className="text-4xl font-semibold tracking-tight">Questions</h2>
        </Reveal>
        <Reveal className="rounded-[24px] bg-zinc-50 px-8 py-2 md:col-span-8">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 max-w-[60ch] leading-relaxed text-zinc-600">
                {item.a}
              </p>
            </details>
          ))}
        </Reveal>
      </section>

      <section id="start" className="mx-auto w-full max-w-7xl px-6 pb-24">
        <Reveal className="rounded-[24px] bg-zinc-900 px-8 py-16 text-zinc-50 md:px-16">
          <h2 className="max-w-[20ch] text-4xl font-semibold tracking-tight md:text-5xl">
            Start with the note you are writing now.
          </h2>
          <a href="#start" className={`${primary} mt-10 h-12 px-6 text-sm`}>
            Start writing
          </a>
        </Reveal>
      </section>

      <footer className="mt-auto border-t border-zinc-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between">
          <span className="font-semibold text-zinc-900">Cairn</span>
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
          <span className={`${plexMono.className} text-xs text-zinc-500`}>
            © 2026 Cairn
          </span>
        </div>
      </footer>
    </div>
  );
}
