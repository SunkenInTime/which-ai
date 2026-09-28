import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { LogoRow } from "../_components/import-logos";
import { Magnetic } from "../_components/magnetic";
import { Mark } from "../_components/mark";
import { Reveal } from "../_components/reveal";
import {
  BRAND,
  CTA_PRIMARY,
  CTA_SECONDARY,
  FOOTER_LINKS,
  QUOTES,
} from "../_lib/pith";
import { HeroDesk } from "./hero-canvas";
import { HighlightDemo, NavLinks, Strips } from "./leaves";

/*
  Shape rule for this iteration:
  controls are pills, surfaces are 20px, paper items (notes, polaroids) are 6px.
*/
const PILL_PRIMARY =
  "group inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--accent)] px-6 text-[15px] font-semibold text-[color:var(--on-accent)] shadow-[0_10px_22px_-12px_rgb(120_92_0/0.7)] transition-[transform,filter] duration-200 hover:brightness-105 active:scale-[0.97]";
const PILL_OUTLINE =
  "inline-flex h-12 items-center whitespace-nowrap rounded-full border-2 border-[color:var(--fg)] px-6 text-[15px] font-semibold text-[color:var(--fg)] transition-[background-color,color,transform] duration-200 hover:bg-[color:var(--fg)] hover:text-[color:var(--bg)] active:scale-[0.97]";

export function Nav() {
  return (
    <header className="sticky top-0 z-(--z-nav) bg-[color:var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
          <Mark />
          {BRAND}
        </a>
        <NavLinks />
        <a href="#download" className={`${PILL_PRIMARY} h-10 px-5 text-sm`}>
          {CTA_PRIMARY}
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="flex flex-col xl:relative xl:min-h-[calc(100dvh-4rem)]">
      {/* First in the DOM so the copy paints above the desk on large screens; last on small ones. */}
      <div className="order-last xl:contents">
        <HeroDesk />
      </div>
      <div className="pointer-events-none relative mx-auto w-full max-w-7xl px-5 pb-12 pt-10 md:px-8 xl:pb-0 xl:pt-20">
        <div className="max-w-[44rem]">
          <h1 className="text-[2.9rem] font-semibold leading-[1] tracking-[-0.035em] sm:text-6xl xl:text-[clamp(3.2rem,4.4vw,4.4rem)]">
            <span className="block animate-fade-up">
              Notes that <span className="hl">remember</span>
            </span>
            <span className="block animate-fade-up [animation-delay:90ms]">for you.</span>
          </h1>
          <p className="mt-7 max-w-[42ch] text-lg leading-relaxed text-[color:var(--fg-2)] animate-fade-up [animation-delay:220ms]">
            Write freely. Pith links related notes, keeps them in plain files, and answers from them when you ask.
          </p>
          <div className="pointer-events-auto mt-9 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:340ms]">
            <Magnetic>
              <a href="#download" className={PILL_PRIMARY}>
                {CTA_PRIMARY}
                <ArrowRight size={17} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <a href="#features" className={PILL_OUTLINE}>
              {CTA_SECONDARY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImportStrip() {
  return (
    <section aria-label="Imports from" className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
      <div className="flex flex-col gap-5 rounded-[20px] bg-[color:var(--bg-2)] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="shrink-0 text-lg font-medium tracking-tight">Bring your old notes along.</p>
        <LogoRow
          className="md:justify-end"
          logoClassName="h-5 text-[color:var(--fg-2)] transition-colors duration-200 hover:text-[color:var(--fg)]"
        />
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 md:px-8 lg:py-32">
      <Reveal>
        <h2 className="max-w-[18ch] text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl">
          Everything you&apos;d hope a notebook did.
        </h2>
      </Reveal>
      <div className="mt-12">
        <Strips />
      </div>
    </section>
  );
}

export function Try() {
  return (
    <section id="try" className="scroll-mt-16 bg-[color:var(--bg-2)]">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <Reveal>
          <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl">
            Highlight it once. <span className="hl hl-static">Find it later.</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-[color:var(--fg-2)]">
            Click any sentence below. Pith saves it with where it came from.
          </p>
        </Reveal>
        <div className="mt-12">
          <HighlightDemo />
        </div>
      </div>
    </section>
  );
}

const NOTE_STYLES = [
  { tone: "bg-[color:var(--accent)] text-[color:var(--on-accent)]", rotate: "-rotate-[1.4deg]" },
  { tone: "bg-[color:var(--surface,var(--bg-2))] ring-1 ring-[color:var(--line)]", rotate: "rotate-[1.2deg]" },
  { tone: "bg-[color:var(--bg-2)] ring-1 ring-[color:var(--line)]", rotate: "rotate-[1.6deg]" },
  { tone: "bg-[color:var(--surface,var(--bg-2))] ring-1 ring-[color:var(--line)]", rotate: "-rotate-[1deg]" },
] as const;

export function Quotes() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
      <Reveal>
        <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl">
          What people write about Pith.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-x-10">
        {QUOTES.map((quote, i) => (
          <Reveal
            key={quote.name}
            as="figure"
            delay={(i % 2) * 0.1}
            className={i % 2 === 1 ? "md:mt-16" : undefined}
          >
            <div
              className={`rounded-md p-7 shadow-[0_22px_34px_-20px_rgb(22_22_34/0.4)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:rotate-0 md:p-9 ${NOTE_STYLES[i].tone} ${NOTE_STYLES[i].rotate}`}
            >
              <blockquote className="text-2xl font-medium leading-snug tracking-tight text-balance">
                &ldquo;{quote.body}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-[15px]">
                <span className="font-semibold">{quote.name}</span>, {quote.role.toLowerCase()}
              </figcaption>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const PRIVACY = [
  "Your notes are plain Markdown files.",
  "Sync is end-to-end encrypted.",
  "Ask answers from your notes only.",
  "No ads, and no training on your notes.",
  "Leave any time and take everything.",
] as const;

export function Privacy() {
  return (
    <section id="privacy" className="scroll-mt-16 border-t border-[color:var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-6xl lg:sticky lg:top-28">
            Yours, in plain words.
          </h2>
        </div>
        <ul className="space-y-7 md:space-y-10 lg:col-span-8">
          {PRIVACY.map((line, i) => (
            <Reveal key={line} as="li" delay={i * 0.05} className="flex items-start gap-4 md:gap-5">
              <span className="mt-1.5 grid size-8 shrink-0 place-items-center rounded-full bg-[color:var(--accent)] text-[color:var(--on-accent)] md:mt-3 md:size-10">
                <Check size={20} weight="bold" />
              </span>
              <p className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-balance md:text-5xl">
                {line}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section id="download" className="scroll-mt-16 px-5 pb-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[20px] bg-[color:var(--accent)] p-8 text-[color:var(--on-accent)] md:p-16">
        <Reveal>
          <h2 className="max-w-[10ch] text-5xl font-semibold leading-[0.98] tracking-[-0.04em] md:text-8xl">
            Start with one note.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Magnetic>
            <a
              href="#top"
              className="group inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--fg)] px-6 text-[15px] font-semibold text-[color:var(--bg)] transition-[transform,filter] duration-200 hover:brightness-125 active:scale-[0.97]"
            >
              {CTA_PRIMARY}
              <ArrowRight size={17} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          {/* mock pricing */}
          <p className="max-w-[34ch] text-base font-medium leading-snug">
            Free on one device. Sync and Ask are $8 a month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-28 pt-16 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a href="#top" className="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
            <Mark />
            {BRAND}
          </a>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-[color:var(--fg-2)]">
            A second brain for everything you read, write and want to remember.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-sm font-semibold">{group}</p>
              <ul className="mt-4 space-y-3 text-[15px] text-[color:var(--fg-2)]">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="transition-colors hover:text-[color:var(--fg)]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-[color:var(--fg-3)] lg:col-span-12">&copy; 2026 Pith Labs</p>
      </div>
    </footer>
  );
}
