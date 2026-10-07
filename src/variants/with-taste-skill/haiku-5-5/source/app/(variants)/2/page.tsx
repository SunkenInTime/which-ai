// Direction 2, "Commonplace": editorial reading-room page.
// Dials: VARIANCE 7, MOTION 4, DENSITY 3.
// Serif display (EB Garamond) is justified because the product is a reading and writing tool.
// Italic emphasis stays in the same family. One accent (ink blue), stone neutrals, square corners throughout.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/variants/with-taste-skill/haiku-5-5/source/components/reveal";
import { garamond } from "@/variants/with-taste-skill/haiku-5-5/source/app/fonts";

export const metadata: Metadata = {
  title: "Cairn, direction 2: Commonplace",
};

const serif = garamond.className;

const cta =
  "inline-flex h-12 items-center bg-blue-900 px-6 text-sm font-medium text-stone-50 transition-colors hover:bg-blue-800 active:scale-[0.98]";

const PEOPLE = [
  {
    name: "Essayists",
    body: "Gather the quotes and half-formed arguments that become a piece months later.",
  },
  {
    name: "Graduate students",
    body: "Keep reading notes tied to the chapters and papers that produced them.",
  },
  {
    name: "Researchers",
    body: "Keep sources, quotes, and questions linked to the drafts they feed.",
  },
  {
    name: "Technical writers",
    body: "Trace every claim in a long document back to the note that first made it.",
  },
];

export default function CommonplaceDirection() {
  return (
    <div className="flex w-full min-h-[100dvh] flex-1 flex-col bg-stone-50 font-sans text-stone-900 antialiased">
      <header className="border-b border-stone-200">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
          <Link href="/with-taste-skill/haiku-5-5/2" className={`${serif} text-2xl font-medium`}>
            Cairn
          </Link>
          <div className="hidden items-center gap-10 text-sm text-stone-600 md:flex">
            <a href="#method" className="transition-colors hover:text-stone-950">
              The method
            </a>
            <a href="#people" className="transition-colors hover:text-stone-950">
              Who it is for
            </a>
          </div>
          <a href="#start" className={`${cta} h-10 px-4 text-sm`}>
            Start writing
          </a>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-14 px-6 pt-16 pb-24 md:grid-cols-12 md:pt-20 md:pb-32">
        <div className="md:col-span-7 md:pt-10">
          <h1
            className={`${serif} text-5xl leading-[1.05] font-medium tracking-tight md:text-6xl`}
          >
            A commonplace book that keeps <em className="italic">itself</em>.
          </h1>
          <p className="mt-8 max-w-[36ch] text-lg leading-relaxed text-stone-600">
            Cairn gathers the passages and ideas you collect, links them
            together, and keeps them ready for your next essay.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <a href="#start" className={cta}>
              Start writing
            </a>
            <a
              href="#method"
              className="text-sm font-medium text-blue-900 underline decoration-blue-900/40 underline-offset-4 transition-colors hover:decoration-blue-900"
            >
              Read the method
            </a>
          </div>
        </div>
        <div className="relative h-[60dvh] min-h-[380px] max-h-[640px] overflow-hidden md:col-span-5 md:mt-16">
          <Image
            src="https://picsum.photos/seed/cairn-open-book/1000/1250?grayscale"
            alt="A wooden pier running out over grey water, in black and white"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-t border-stone-200">
        <Reveal className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p
            className={`${serif} max-w-[30ch] text-4xl leading-[1.2] md:text-5xl`}
          >
            Most notes apps are filing cabinets. Cairn points out which of your
            old notes matter to the page you are writing now.
          </p>
        </Reveal>
      </section>

      <section id="method" className="mx-auto grid w-full max-w-7xl gap-14 px-6 py-24 md:grid-cols-12 md:py-32">
        <div className="md:sticky md:top-24 md:col-span-4 md:self-start">
          <h2 className={`${serif} text-4xl font-medium tracking-tight`}>
            The method
          </h2>
          <p className="mt-4 max-w-[30ch] leading-relaxed text-stone-600">
            Three habits. None of them involve tagging.
          </p>
        </div>
        <ul className="space-y-16 md:col-span-7 md:col-start-6">
          <li>
            <Reveal>
              <h3 className={`${serif} text-3xl font-medium`}>Gather</h3>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-stone-600">
                Clip the passage, jot the question it raised, and move on. Cairn
                keeps the source attached, so the quote never loses its context.
              </p>
            </Reveal>
          </li>
          <li>
            <Reveal>
              <h3 className={`${serif} text-3xl font-medium`}>Link</h3>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-stone-600">
                When a new note mentions an idea you have written about before,
                the two notes connect. Nothing has to be filed first.
              </p>
            </Reveal>
          </li>
          <li>
            <Reveal>
              <h3 className={`${serif} text-3xl font-medium`}>Return</h3>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-stone-600">
                Each day Cairn brings back the notes most related to what you
                are writing, so the reading you did last spring can shape the
                draft you start today.
              </p>
            </Reveal>
          </li>
        </ul>
      </section>

      <section className="relative h-[70vh] min-h-[360px] overflow-hidden">
        <Image
          src="https://picsum.photos/seed/cairn-bookshelf-warm/2000/1100?grayscale"
          alt="Rooftops of an old city under a winter sky"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <section id="people" className="border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <h2 className={`${serif} text-4xl font-medium tracking-tight md:text-5xl`}>
            Who it is for
          </h2>
          <dl className="mt-16 grid gap-x-20 gap-y-14 md:grid-cols-2">
            {PEOPLE.map((person) => (
              <Reveal key={person.name}>
                <div>
                  <dt className={`${serif} text-3xl font-medium`}>{person.name}</dt>
                  <dd className="mt-3 max-w-[40ch] leading-relaxed text-stone-600">
                    {person.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section id="start" className="mx-auto w-full max-w-7xl px-6 pt-12 pb-28">
        <Reveal>
          <h2
            className={`${serif} max-w-[18ch] text-5xl leading-[1.05] font-medium tracking-tight md:text-6xl`}
          >
            Begin with one passage.
          </h2>
          <a href="#start" className={`${cta} mt-10`}>
            Start writing
          </a>
        </Reveal>
      </section>

      <footer className="mt-auto border-t border-stone-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-stone-500 md:flex-row md:items-center md:justify-between">
          <span className={`${serif} text-lg text-stone-900`}>Cairn</span>
          <div className="flex flex-wrap gap-8">
            <a href="#" className="transition-colors hover:text-stone-900">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-stone-900">
              Export your notes
            </a>
            <a href="#" className="transition-colors hover:text-stone-900">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
