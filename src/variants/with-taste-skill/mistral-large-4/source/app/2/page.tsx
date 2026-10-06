import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Quotes,
  TreeStructure,
  Keyboard,
  Moon,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Mnemos - A quieter place to think",
  description:
    "A calm, editorial note-taking space. Write, link, and remember without the noise.",
};

const chapters = [
  {
    icon: TreeStructure,
    kicker: "Chapter one",
    title: "Notes that grow like a garden",
    body: "Plant an idea. Link it to another. Watch a body of thought take shape over months and years, not minutes.",
  },
  {
    icon: Keyboard,
    kicker: "Chapter two",
    title: "Writing, uninterrupted",
    body: "A distraction-free editor that gets out of your way. No toolbars shouting. Just you and the page.",
  },
  {
    icon: Moon,
    kicker: "Chapter three",
    title: "Read it back, years later",
    body: "Every note is yours, in plain text, forever. Export everything with one click. No lock-in, ever.",
  },
];

export default function Page2() {
  return (
    <div className="min-h-[100dvh] bg-[#faf9f6] text-stone-900">
      {/* Nav */}
      <header className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
        <Link
          href="./2"
          className="font-[family-name:var(--font-serif)] text-xl italic tracking-tight text-stone-900"
        >
          Mnemos
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-stone-600 md:flex">
          <Link href="./2" className="transition-colors hover:text-stone-900">The idea</Link>
          <Link href="./2" className="transition-colors hover:text-stone-900">Chapters</Link>
          <Link href="./2" className="transition-colors hover:text-stone-900">Journal</Link>
        </nav>
        <Link
          href="./2"
          className="rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-900 hover:text-stone-50 active:scale-[0.98]"
        >
          Begin
        </Link>
      </header>

      {/* Hero - editorial manifesto, centered, serif */}
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center md:pt-24">
        <p className="font-[family-name:var(--font-serif)] text-sm italic tracking-wide text-stone-500">
          A second brain, kept quietly
        </p>
        <h1 className="mt-6 font-[family-name:var(--font-serif)] text-5xl leading-[1.1] tracking-tight text-stone-900 md:text-7xl">
          A quieter place
          <br />
          <em className="italic">to think.</em>
        </h1>
        <p className="mx-auto mt-8 max-w-xl font-[family-name:var(--font-serif)] text-lg leading-relaxed text-stone-600">
          Mnemos is a note-taking space modelled on the way memory works.
          Capture a thought, link it to what you already know, and return to
          it years from now, exactly as you left it.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="./2"
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-700 active:scale-[0.98]"
          >
            Start writing
            <ArrowRight size={14} weight="bold" />
          </Link>
          <Link
            href="./2"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-stone-500 active:scale-[0.98]"
          >
            Read the manifesto
          </Link>
        </div>
      </section>

      {/* Hero image - wide editorial */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <figure>
          <Image
            src="https://picsum.photos/seed/mnemos-quiet-desk/1400/800?grayscale"
            alt="A sunlit desk with an open notebook and a cup of tea"
            width={1400}
            height={800}
            priority
            className="w-full rounded-sm border border-stone-200 object-cover"
          />
          <figcaption className="mt-3 text-center font-[family-name:var(--font-serif)] text-xs italic text-stone-400">
            The writing desk. Nothing else required.
          </figcaption>
        </figure>
      </section>

      {/* Chapters - vertical editorial list with hairlines */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl tracking-tight text-stone-900 md:text-4xl">
          Three ideas behind Mnemos
        </h2>
        <div className="mt-12">
          {chapters.map((c, i) => (
            <article
              key={c.title}
              className="grid grid-cols-1 gap-6 border-t border-stone-200 py-12 md:grid-cols-[120px_1fr_2fr] md:gap-10"
            >
              <div className="flex items-start gap-3 text-stone-400">
                <c.icon size={22} weight="thin" className="mt-1 shrink-0" />
                <span className="font-[family-name:var(--font-serif)] text-sm italic">{c.kicker}</span>
              </div>
              <h3 className="font-[family-name:var(--font-serif)] text-2xl leading-snug tracking-tight text-stone-900 md:text-3xl">
                {c.title}
              </h3>
              <p className="max-w-prose font-[family-name:var(--font-serif)] text-base leading-relaxed text-stone-600">
                {c.body}
              </p>
              {i === chapters.length - 1 && (
                <div className="hidden" aria-hidden />
              )}
            </article>
          ))}
          <div className="border-t border-stone-200" />
        </div>
      </section>

      {/* Quote - full width editorial */}
      <section className="border-y border-stone-200 bg-stone-100/60 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Quotes size={32} weight="fill" className="mx-auto text-stone-300" />
          <blockquote className="mt-6 font-[family-name:var(--font-serif)] text-2xl leading-relaxed text-stone-800 md:text-3xl">
            &ldquo;It feels less like software and more like a well-kept
            notebook. I write more, and I keep what I write.&rdquo;
          </blockquote>
          <p className="mt-8 text-sm text-stone-500">
            <span className="font-medium text-stone-700">Tomas Lindqvist</span>
            <span className="mx-2 text-stone-300">/</span>
            Essayist
          </p>
        </div>
      </section>

      {/* Gallery - asymmetric two images */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[3fr_2fr] md:items-end">
          <Image
            src="https://picsum.photos/seed/mnemos-pages/900/1100?grayscale"
            alt="Handwritten pages fanned across a table"
            width={900}
            height={1100}
            className="w-full rounded-sm border border-stone-200 object-cover"
          />
          <div className="space-y-6">
            <Image
              src="https://picsum.photos/seed/mnemos-ink/700/500?grayscale"
              alt="A fountain pen resting on blank paper"
              width={700}
              height={500}
              className="w-full rounded-sm border border-stone-200 object-cover"
            />
            <p className="font-[family-name:var(--font-serif)] text-sm leading-relaxed text-stone-500">
              Every note is plain text under the hood. Read it in fifty years
              with any tool you like.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl tracking-tight text-stone-900 md:text-5xl">
          Begin your notebook.
        </h2>
        <p className="mx-auto mt-4 max-w-md font-[family-name:var(--font-serif)] text-base text-stone-600">
          Free for personal use. No account required to try the editor.
        </p>
        <Link
          href="./2"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-700 active:scale-[0.98]"
        >
          Start writing
          <ArrowRight size={14} weight="bold" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 font-[family-name:var(--font-serif)] text-xs italic text-stone-400">
          <span>Mnemos, est. for thinkers.</span>
          <div className="flex gap-6 not-italic">
            <Link href="./2" className="transition-colors hover:text-stone-700">Privacy</Link>
            <Link href="./2" className="transition-colors hover:text-stone-700">Terms</Link>
            <Link href="./2" className="transition-colors hover:text-stone-700">RSS</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
