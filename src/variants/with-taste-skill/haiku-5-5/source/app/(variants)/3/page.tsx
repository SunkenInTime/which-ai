// Direction 3, "Night Desk": dark, keyboard-first, search as the hero.
// Dials: VARIANCE 7, MOTION 6, DENSITY 4.
// Theme locked to dark for the whole page. Schibsted Grotesk with JetBrains Mono for metadata.
// One accent (amber-300). Radius 12px for panels and buttons, 6px for keycaps.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/variants/with-taste-skill/haiku-5-5/source/components/reveal";
import { NoteSearch } from "@/variants/with-taste-skill/haiku-5-5/source/components/note-search";
import { jetbrains, schibsted } from "@/variants/with-taste-skill/haiku-5-5/source/app/fonts";

export const metadata: Metadata = {
  title: "Cairn, direction 3: Night Desk",
};

const cta =
  "inline-flex items-center justify-center rounded-xl bg-amber-300 font-semibold text-zinc-950 transition-colors hover:bg-amber-200 active:scale-[0.98]";

const SHORTCUTS = [
  {
    action: "Search everything",
    detail: "Opens search from any screen, with the cursor already in the field.",
    keys: ["Cmd", "K"],
  },
  {
    action: "New note",
    detail: "Starts a blank note with the cursor ready for the first line.",
    keys: ["Cmd", "N"],
  },
  {
    action: "Link to a note",
    detail: "Type two brackets to find an existing note and connect to it.",
    keys: ["Cmd", "L"],
  },
  {
    action: "Resurface today",
    detail: "Shows the notes most related to what you opened today.",
    keys: ["Cmd", "Shift", "R"],
  },
];

const REVIEW = [
  {
    when: "Tuesday",
    title: "Captured from a paper",
    body: "The highlight, the page number, and a link back to the source land in one note.",
  },
  {
    when: "Friday",
    title: "Linked to a draft",
    body: "The note appears beside the draft, because the draft mentions the same idea.",
  },
  {
    when: "Next spring",
    title: "Resurfaced",
    body: "Cairn shows it again when you open a document about the same subject.",
  },
];

export default function NightDeskDirection() {
  return (
    <div
      className={`${schibsted.className} scheme-dark flex w-full min-h-[100dvh] flex-1 flex-col bg-zinc-950 text-zinc-100 antialiased`}
    >
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
          <Link href="/with-taste-skill/haiku-5-5/3" className="text-lg font-semibold tracking-tight">
            Cairn
          </Link>
          <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#keyboard" className="transition-colors hover:text-zinc-100">
              Keyboard
            </a>
            <a href="#review" className="transition-colors hover:text-zinc-100">
              Review
            </a>
          </div>
          <a href="#start" className={`${cta} h-10 px-4 text-sm`}>
            Start writing
          </a>
        </nav>
      </header>

      <section className="mx-auto w-full max-w-7xl px-6 pt-16 pb-20 md:pt-20">
        <Reveal>
          <h1 className="max-w-[24ch] text-5xl leading-[1.02] font-semibold tracking-tight md:text-6xl">
            Find the note you wrote three months ago.
          </h1>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-start">
          <Reveal className="md:col-span-5 md:pt-4">
            <p className="max-w-[40ch] text-lg leading-relaxed text-zinc-300">
              Cairn searches across everything you write and clip, so ideas
              return even when the words have changed.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#start" className={`${cta} h-12 px-6 text-sm`}>
                Start writing
              </a>
              <a
                href="#keyboard"
                className="text-sm font-medium text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-zinc-50"
              >
                See the shortcuts
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <NoteSearch />
          </Reveal>
        </div>
      </section>

      <section id="keyboard" className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Reveal>
            <h2 className="max-w-[20ch] text-4xl font-semibold tracking-tight md:text-5xl">
              Everything runs from the keyboard.
            </h2>
          </Reveal>
          <dl className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {SHORTCUTS.map((shortcut) => (
              <Reveal key={shortcut.action}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <dt className="text-lg font-medium text-zinc-100">
                      {shortcut.action}
                    </dt>
                    <dd className="mt-1 max-w-[36ch] text-sm leading-relaxed text-zinc-400">
                      {shortcut.detail}
                    </dd>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    {shortcut.keys.map((key) => (
                      <kbd
                        key={key}
                        className={`${jetbrains.className} rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-200`}
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative h-[60vh] min-h-[360px] overflow-hidden border-y border-zinc-800">
        <Image
          src="https://picsum.photos/seed/cairn-open-notebook/2400/1200"
          alt="Stars over a dark mountain and its reflection in still water"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      <section id="review" className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-24 md:grid-cols-12 md:items-center md:py-32">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-xl md:col-span-5">
          <Image
            src="https://picsum.photos/seed/cairn-field-notes/1000/1250"
            alt="A person facing a bonfire at dusk"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Old notes come back on a schedule.
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-zinc-300">
              Cairn tracks when you last opened each note and brings it back
              when it is likely to be useful again. Nothing is deleted, and
              nothing needs tagging.
            </p>
          </Reveal>
          <ul className="mt-12 space-y-8">
            {REVIEW.map((item) => (
              <li key={item.title}>
                <Reveal className="grid grid-cols-[8rem_1fr] gap-6">
                  <time
                    className={`${jetbrains.className} text-sm text-amber-300`}
                  >
                    {item.when}
                  </time>
                  <div>
                    <p className="font-medium text-zinc-100">{item.title}</p>
                    <p className="mt-1 leading-relaxed text-zinc-400">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="start" className="mx-auto w-full max-w-7xl px-6 pb-24">
        <Reveal>
          <div className="flex flex-col gap-10 rounded-xl border border-zinc-800 bg-zinc-900 px-8 py-14 md:flex-row md:items-end md:justify-between md:px-14 md:py-16">
            <h2 className="max-w-[24ch] text-4xl font-semibold tracking-tight md:text-5xl">
              Put the next idea somewhere you can find it.
            </h2>
            <a href="#start" className={`${cta} h-12 shrink-0 px-6 text-sm`}>
              Start writing
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="mt-auto border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <span className="font-medium text-zinc-100">Cairn</span>
          <div className="flex flex-wrap gap-8">
            <a href="#" className="transition-colors hover:text-zinc-100">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-zinc-100">
              Export your notes
            </a>
            <a href="#" className="transition-colors hover:text-zinc-100">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
