import Image from "next/image";
import {
  AndroidLogo,
  AppleLogo,
  Check,
  DeviceMobile,
  Globe,
  Graph,
  LinuxLogo,
  LockKey,
  WindowsLogo,
} from "@phosphor-icons/react/ssr";
import { Z } from "../lib/z";
import { AskDemo } from "./_components/ask-demo";
import { GraphCanvas } from "./_components/graph-canvas";
import { HeroCopy } from "./_components/hero-copy";
import { KeyboardSection } from "./_components/keyboard";
import { ResurfacePan } from "./_components/resurface-pan";
import { Reveal } from "./_components/reveal";

const primaryBtn =
  "inline-flex h-11 items-center whitespace-nowrap rounded-lg bg-(--accent) px-5 text-[15px] font-medium text-(--accent-ink) transition-transform duration-200 hover:-translate-y-px active:translate-y-px";
const secondaryBtn =
  "inline-flex h-11 items-center whitespace-nowrap rounded-lg border border-(--line-strong) px-5 text-[15px] font-medium text-(--fg) transition-colors duration-200 hover:bg-(--bg-sunken) active:translate-y-px";

const LOGOS = [
  { slug: "github", name: "GitHub" },
  { slug: "mozilla", name: "Mozilla" },
  { slug: "wikipedia", name: "Wikipedia" },
  { slug: "zotero", name: "Zotero" },
  { slug: "figma", name: "Figma" },
  { slug: "stripe", name: "Stripe" },
];

const PLATFORMS = [
  { name: "Mac", Icon: AppleLogo },
  { name: "Windows", Icon: WindowsLogo },
  { name: "Linux", Icon: LinuxLogo },
  { name: "iPhone", Icon: DeviceMobile },
  { name: "Android", Icon: AndroidLogo },
  { name: "Web", Icon: Globe },
];

const QUOTES = [
  {
    quote: "Kept cited a 2019 field note I had completely forgotten. It was the missing piece of the paper.",
    name: "Ngozi Adeyemi",
    role: "Marine ecologist",
    big: true,
  },
  {
    quote: "Every scene links to its characters. When I rewrite, Related reminds me what Ilse already knows.",
    name: "Tomasz Wieczorek",
    role: "Novelist",
  },
  {
    quote: "My lit review lived in four apps. Now it is one folder of Markdown and a graph I actually open.",
    name: "Aiko Hayashi",
    role: "PhD student, computational linguistics",
  },
  {
    quote: "Last spring's interview notes came back while I wrote this quarter's plan. They changed the roadmap.",
    name: "Rafael Quintero",
    role: "Product lead",
  },
  {
    quote: "Local files and encryption got me to try it. The capture shortcut is why I stayed.",
    name: "Maren Lindqvist",
    role: "Investigative journalist",
  },
  {
    quote: "I link incident notes to design docs with two brackets. Six months later the postmortem finds me.",
    name: "Devika Raman",
    role: "Staff engineer",
  },
  {
    quote: "Book highlights arrive overnight and sit next to the lecture drafts they belong with.",
    name: "Emeka Obi",
    role: "Historian",
  },
];

const FILES = [
  "Daily 2026-09-22.md",
  "Desire paths.md",
  "Jacobs eyes on the street.md",
  "Local-first software.md",
  "Novel chapter 4 outline.md",
  "Third places.md",
  "Thesis chapter 2.md",
  "Weekly review.md",
  "Why our office floor feels empty.md",
];

const MARKDOWN = `---
created: 2023-03-14
---
# Jacobs: eyes on the street

> Sidewalk contacts are the small change from
> which a city's wealth of public life may grow.

Streets feel safe when people have reasons
to be on them at different times of day.

See also [[Third places]], [[Desire paths]]`;

function Nav() {
  return (
    <header
      style={{ zIndex: Z.nav }}
      className="sticky top-0 border-b border-(--line) bg-(--bg)/85 backdrop-blur-md"
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8"
      >
        <a href="#top" className="flex items-center gap-2 text-[17px] font-semibold tracking-tight">
          <Graph size={22} weight="bold" className="text-(--accent-text)" aria-hidden />
          Kept
        </a>
        <ul className="hidden items-center gap-8 text-sm text-(--fg-muted) md:flex">
          <li><a className="transition-colors hover:text-(--fg)" href="#keyboard">Keyboard</a></li>
          <li><a className="transition-colors hover:text-(--fg)" href="#resurfacing">Resurfacing</a></li>
          <li><a className="transition-colors hover:text-(--fg)" href="#ask">Ask</a></li>
          <li><a className="transition-colors hover:text-(--fg)" href="#sync">Your files</a></li>
          <li><a className="transition-colors hover:text-(--fg)" href="#pricing">Pricing</a></li>
        </ul>
        <a href="#pricing" className="inline-flex h-9 items-center whitespace-nowrap rounded-lg bg-(--accent) px-4 text-sm font-medium text-(--accent-ink) transition-transform active:translate-y-px">
          Start free
        </a>
      </nav>
    </header>
  );
}

export default function Page() {
  return (
    <div id="top" className="min-h-[100dvh] bg-(--bg) text-(--fg)">
      <Nav />

      <main>
        {/* Hero: copy on the left, live graph across the right and background */}
        <section className="relative flex flex-col lg:min-h-[calc(100dvh-4rem)]">
          <div
            style={{ zIndex: Z.raised }}
            className="relative mx-auto w-full max-w-7xl px-4 pt-14 sm:px-8 lg:pointer-events-none lg:flex lg:min-h-[calc(100dvh-4rem)] lg:items-center lg:pb-24 lg:pt-10"
          >
            <div className="lg:w-[42%]">
              <HeroCopy />
            </div>
          </div>
          <GraphCanvas className="relative mt-6 h-[58dvh] w-full lg:absolute lg:inset-0 lg:mt-0 lg:h-full" />
        </section>

        {/* Logo wall */}
        <section aria-label="Used by people at" className="border-t border-(--line)">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-8 md:flex-row md:items-center md:gap-12">
            <p className="shrink-0 text-sm text-(--fg-muted)">Used by people at</p>
            <ul className="grid grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-6">
              {LOGOS.map((l) => (
                <li key={l.slug} className="flex justify-center md:justify-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${l.slug}.svg`}
                    alt={l.name}
                    width={26}
                    height={26}
                    loading="lazy"
                    className="h-[26px] w-auto opacity-55 dark:opacity-60 dark:invert"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Keyboard-first */}
        <section id="keyboard" className="scroll-mt-16 border-t border-(--line)">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
            <Reveal>
              <h2 className="max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
                Your hands never leave the keyboard.
              </h2>
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-(--fg-muted)">
                Three shortcuts cover most of a working day. Press them on this page and the keys
                respond.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-14">
              <KeyboardSection />
            </Reveal>
          </div>
        </section>

        {/* Resurfacing: pinned horizontal pan on desktop */}
        <ResurfacePan />

        {/* Ask your notes */}
        <section id="ask" className="scroll-mt-16 border-t border-(--line)">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
            <Reveal>
              <p className="mono text-xs uppercase tracking-[0.14em] text-(--accent-text)">
                Ask your notes
              </p>
              <h2 className="mt-4 max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
                Answers in your own words, with sources.
              </h2>
              <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-(--fg-muted)">
                Ask in plain language. Kept answers only from your notes and links every claim to the
                note it came from.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-14">
              <AskDemo />
            </Reveal>
          </div>
        </section>

        {/* Ownership and sync: bento */}
        <section id="sync" className="scroll-mt-16 border-t border-(--line)">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
            <Reveal>
              <h2 className="max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
                Your notes are files you own.
              </h2>
              <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-(--fg-muted)">
                Every note is a Markdown file in a folder you choose. Sync is end-to-end encrypted, and
                optional.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-4 md:grid-cols-12">
              <Reveal className="md:col-span-7 md:row-span-2">
                <figure className="flex h-full flex-col overflow-hidden rounded-lg border border-(--line-strong) bg-(--bg-sunken)">
                  <figcaption className="flex items-center justify-between border-b border-(--line) px-5 py-3">
                    <span className="mono text-xs text-(--fg-muted)">
                      ~/Kept/Jacobs eyes on the street.md
                    </span>
                  </figcaption>
                  <div className="grid flex-1 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
                    <ul
                      aria-label="Files in the Kept folder"
                      className="hidden border-r border-(--line) py-3 text-[13px] sm:block"
                    >
                      {FILES.map((f) => (
                        <li
                          key={f}
                          className={`truncate px-5 py-1.5 ${
                            f === "Jacobs eyes on the street.md"
                              ? "text-(--fg)"
                              : "text-(--fg-faint)"
                          }`}
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                    <pre className="mono overflow-x-auto p-5 text-[13px] leading-[1.7] text-(--fg)">
                      {MARKDOWN}
                    </pre>
                  </div>
                  <p className="border-t border-(--line) px-5 py-4 text-[15px] leading-relaxed text-(--fg-muted)">
                    Open it in any editor, back it up with anything, grep it. If Kept disappeared
                    tomorrow, your notes would not.
                  </p>
                </figure>
              </Reveal>

              <Reveal delay={0.08} className="md:col-span-5">
                <div className="h-full rounded-lg border border-(--line-strong) bg-(--bg-raised) p-6">
                  <h3 className="text-xl font-medium tracking-tight">On every device you use</h3>
                  <ul className="mt-6 grid grid-cols-3 gap-3">
                    {PLATFORMS.map(({ name, Icon }) => (
                      <li
                        key={name}
                        className="flex flex-col items-center gap-2 rounded-lg border border-(--line) py-4 text-sm text-(--fg-muted)"
                      >
                        <Icon size={24} weight="regular" className="text-(--fg)" aria-hidden />
                        {name}
                      </li>
                    ))}
                  </ul>
                  <a href="#sync" className={`${secondaryBtn} mt-6`}>
                    Download
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.16} className="md:col-span-5">
                <div className="flex h-full flex-col overflow-hidden rounded-lg border border-(--line-strong) bg-(--bg-raised)">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="https://picsum.photos/seed/library-reading-table/960/540"
                      alt="Reading glasses resting on a laptop on a wooden desk"
                      fill
                      sizes="(min-width: 768px) 40vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-start gap-3 p-6">
                    <LockKey size={22} className="mt-0.5 shrink-0 text-(--accent-text)" aria-hidden />
                    <div>
                      <h3 className="text-xl font-medium tracking-tight">Encrypted before it leaves</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-(--fg-muted)">
                        Notes are encrypted on your device. Our servers only ever hold data they
                        cannot read.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Testimonials: masonry */}
        <section className="border-t border-(--line)">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
            <Reveal>
              <h2 className="max-w-[22ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
                How people use it.
              </h2>
            </Reveal>
            <div className="mt-14 columns-1 gap-4 md:columns-2 lg:columns-3">
              {QUOTES.map((q, i) => (
                <Reveal key={q.name} delay={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
                  <figure
                    className={`rounded-lg border p-6 ${
                      q.big
                        ? "border-(--line-strong) bg-(--bg-sunken)"
                        : "border-(--line-strong) bg-(--bg-raised)"
                    }`}
                  >
                    <blockquote
                      className={q.big ? "text-xl font-medium leading-snug tracking-tight" : "text-base leading-relaxed"}
                    >
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 text-sm">
                      <span className="font-medium">{q.name}</span>
                      <span className="block text-(--fg-muted)">
                        {q.role}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-16 border-t border-(--line)">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
            <Reveal>
              <h2 className="max-w-[22ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
                Free on one device. $8 for all of them.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <Reveal>
                <div className="flex h-full flex-col rounded-lg border border-(--line-strong) bg-(--bg-raised) p-7">
                  <h3 className="text-lg font-medium">Free</h3>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-semibold tracking-tight">$0</span>
                  </p>
                  <p className="mt-2 text-[15px] text-(--fg-muted)">For one device plus the web app.</p>
                  <ul className="mt-7 space-y-3 text-[15px]">
                    {["Unlimited notes", "Links, backlinks and the graph", "Quick capture and web clipper", "Plain Markdown files"].map((f) => (
                      <li key={f} className="flex gap-3">
                        <Check size={18} className="mt-0.5 shrink-0 text-(--fg-muted)" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#pricing" className={`${secondaryBtn} mt-auto self-start max-md:mt-8 md:mt-10`}>
                    Start free
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="flex h-full flex-col rounded-lg border border-(--accent) bg-(--bg-raised) p-7 shadow-[inset_0_0_0_1px_var(--accent)]">
                  <h3 className="text-lg font-medium">Pro</h3>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-semibold tracking-tight">$8</span>
                    <span className="text-(--fg-muted)">/ month, billed yearly</span>
                  </p>
                  <p className="mt-2 text-[15px] text-(--fg-muted)">
                    Everything in Free, on every device you own.
                  </p>
                  <ul className="mt-7 grid gap-3 text-[15px] sm:grid-cols-2">
                    {[
                      "Sync across all devices",
                      "End-to-end encryption",
                      "Ask your notes",
                      "Version history",
                      "Highlights from books and articles",
                      "Voice memos, transcribed",
                    ].map((f) => (
                      <li key={f} className="flex gap-3">
                        <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-(--accent-text)" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-10">
                    <a href="#pricing" className={primaryBtn}>
                      Start free
                    </a>
                    <p className="text-sm text-(--fg-muted)">Upgrade from inside the app when you want sync.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-(--line)">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-36">
            <Reveal>
              <h2 className="max-w-[16ch] text-5xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-7xl">
                Write it once. Find it when it matters.
              </h2>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#pricing" className={primaryBtn}>
                  Start free
                </a>
                <a href="#sync" className={secondaryBtn}>
                  Download
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-(--line)">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-28 pt-14 sm:px-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2 text-[17px] font-semibold tracking-tight">
              <Graph size={22} weight="bold" className="text-(--accent-text)" aria-hidden />
              Kept
            </a>
            <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-(--fg-muted)">
              A second brain made of plain files. Made for people who read, write and forget.
            </p>
          </div>
          {[
            { h: "Product", links: ["Download", "Pricing", "Web clipper", "Changelog"] },
            { h: "Resources", links: ["Guides", "Markdown format", "Keyboard shortcuts", "Security"] },
            { h: "Company", links: ["About", "Privacy", "Terms", "Contact"] },
          ].map((col) => (
            <div key={col.h}>
              <h3 className="text-sm font-medium">{col.h}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-(--fg-muted)">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="transition-colors hover:text-(--fg)">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-sm text-(--fg-muted) md:col-span-4">&copy; 2026 Kept</p>
        </div>
      </footer>
    </div>
  );
}
