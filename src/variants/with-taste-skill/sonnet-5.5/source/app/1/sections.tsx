import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { LogoRow } from "../_components/import-logos";
import { Mark } from "../_components/mark";
import { Photo } from "../_components/photo";
import { Reveal } from "../_components/reveal";
import {
  BRAND,
  CTA_PRIMARY,
  CTA_SECONDARY,
  FOOTER_LINKS,
  QUOTES,
} from "../_lib/pith";
import { AskDemo, ParallaxPhoto, ScrollText } from "./leaves";

const PRIMARY_BUTTON =
  "group inline-flex h-12 items-center gap-2 bg-[color:var(--accent)] px-6 text-[15px] font-medium text-[color:var(--on-accent)] transition-[transform,filter] duration-200 hover:brightness-110 active:translate-y-px whitespace-nowrap";

export function Nav() {
  return (
    <header className="sticky top-0 z-(--z-nav) border-b border-[color:var(--line)] bg-[color:var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
          <Mark shape="square" />
          {BRAND}
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] text-[color:var(--fg-2)] md:flex">
          <a href="#features" className="transition-colors hover:text-[color:var(--fg)]">Features</a>
          <a href="#ask" className="transition-colors hover:text-[color:var(--fg)]">Ask</a>
          <a href="#pricing" className="transition-colors hover:text-[color:var(--fg)]">Pricing</a>
        </nav>
        <a href="#pricing" className={`${PRIMARY_BUTTON} h-10 px-4 text-sm`}>
          {CTA_PRIMARY}
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 md:px-8 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-12 lg:items-center lg:gap-6 lg:pb-12 lg:pt-8">
      <div className="lg:col-span-7">
        <h1 className="text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[clamp(3rem,4.7vw,4.25rem)]">
          <span className="block overflow-y-clip overflow-x-visible pb-[0.14em] -mb-[0.14em]">
            <span className="block animate-rise lg:whitespace-nowrap">Remember everything</span>
          </span>
          <span className="block overflow-y-clip overflow-x-visible pb-[0.14em] -mb-[0.14em]">
            <span className="block animate-rise text-[color:var(--accent)] [animation-delay:120ms]">
              you read.
            </span>
          </span>
        </h1>
        <p className="mt-7 max-w-[44ch] text-lg leading-relaxed text-[color:var(--fg-2)] animate-fade-up [animation-delay:450ms]">
          Pith is a notes app that links your ideas as you write, so nothing you&apos;ve learned gets lost.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 animate-fade-up [animation-delay:600ms]">
          <a href="#pricing" className={PRIMARY_BUTTON}>
            {CTA_PRIMARY}
            <ArrowRight size={18} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#features"
            className="whitespace-nowrap text-[15px] font-medium underline decoration-[color:var(--line)] decoration-2 underline-offset-[6px] transition-colors hover:decoration-[color:var(--accent)]"
          >
            {CTA_SECONDARY}
          </a>
        </div>
      </div>

      <div className="relative lg:col-span-5">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--bg-2)] lg:aspect-auto lg:h-[min(72dvh,660px)]">
          <div className="absolute inset-0 animate-settle">
            <Photo
              id={192}
              alt="Silhouettes of people working at long tables in front of tall windows"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
              className="grayscale contrast-[1.08]"
            />
          </div>
          <span aria-hidden className="absolute inset-0 origin-bottom animate-wipe bg-[color:var(--bg)] [animation-delay:150ms]" />
        </div>
      </div>
    </section>
  );
}

export function ImportStrip() {
  return (
    <section aria-label="Imports from" className="border-y border-[color:var(--line)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-9 md:px-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-[24ch] text-[15px] leading-snug text-[color:var(--fg-2)]">
          Bring your existing notes in one step.
        </p>
        <LogoRow
          className="lg:justify-end"
          logoClassName="text-[color:var(--fg-3)] transition-colors duration-200 hover:text-[color:var(--fg)]"
        />
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: "Capture in a second",
    body: "A global shortcut opens a blank note over any app. Clip pages, dictate, or forward an email and it all lands in one inbox.",
    photo: 252,
    alt: "Typewriter parts laid out in rows on a white surface",
  },
  {
    title: "Links that go both ways",
    body: "Type [[ to link to a note you already wrote. Every link also shows on the other note, so ideas meet without you arranging them.",
    photo: 119,
    alt: "A laptop and a book on a white desk",
  },
  {
    title: "Old notes come back",
    body: "Each morning Pith resurfaces a few notes related to what you're working on now. Reviewing them takes about a minute.",
    photo: 240,
    alt: "A person sitting alone on stone steps beside the water",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 md:px-8 lg:py-36">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance md:text-5xl">
              Notes that find each other.
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-[color:var(--fg-2)]">
              Write the way you think. Pith connects each note to the ones around it and keeps them where you can reach them.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-20 lg:col-span-6 lg:col-start-7 lg:gap-28">
          {FEATURES.map((feature) => (
            <Reveal key={feature.title} as="article">
              <ParallaxPhoto
                id={feature.photo}
                alt={feature.alt}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full"
              />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed text-[color:var(--fg-2)]">
                {feature.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Statement() {
  return (
    <section className="border-t border-[color:var(--line)] bg-[color:var(--bg-2)]">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-8 lg:py-44">
        <ScrollText
          text="Folders ask where a note belongs before you know why it matters. Links let it belong everywhere it is useful."
          className="max-w-[20ch] text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:max-w-[26ch] sm:text-5xl lg:max-w-[28ch] lg:text-[4rem]"
        />
      </div>
    </section>
  );
}

export function Ask() {
  return (
    <section id="ask" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 md:px-8 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-balance md:text-5xl">
            Ask your notes anything.
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-[color:var(--fg-2)]">
            Answers come only from what you have written, and each one lists the notes behind it.
          </p>
        </div>
        <div className="lg:col-span-8">
          <AskDemo />
        </div>
      </div>
    </section>
  );
}

export function Quotes() {
  const [first, second, third] = QUOTES;
  return (
    <section className="border-t border-[color:var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:px-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24 lg:py-36">
        {[
          { q: first, cls: "lg:col-span-6" },
          { q: second, cls: "lg:col-span-5 lg:col-start-8 lg:mt-28" },
          { q: third, cls: "lg:col-span-6 lg:col-start-3" },
        ].map(({ q, cls }) => (
          <Reveal key={q.name} as="blockquote" className={cls}>
            <p className="text-2xl font-medium leading-snug tracking-[-0.02em] text-balance md:text-[1.75rem]">
              &ldquo;{q.body}&rdquo;
            </p>
            <footer className="mt-6 text-[15px]">
              <span className="font-medium">{q.name}</span>
              <span className="text-[color:var(--fg-2)]">, {q.role.toLowerCase()}</span>
            </footer>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section id="pricing" className="relative isolate scroll-mt-16 overflow-hidden text-zinc-50">
      <div className="absolute inset-0 -z-10 bg-zinc-950">
        <Photo
          id={302}
          alt="A still sea under a pale sky with one marker post in the water"
          sizes="100vw"
          className="grayscale"
          dim={false}
        />
        <span aria-hidden className="absolute inset-0 bg-linear-to-t from-zinc-950/85 via-zinc-950/45 to-zinc-950/20" />
      </div>
      <div className="mx-auto flex min-h-[min(80dvh,720px)] max-w-7xl flex-col justify-end gap-8 px-5 py-20 md:px-8 lg:py-28">
        <Reveal>
          <h2 className="max-w-[12ch] text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5.5rem]">
            Start with one note.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <a href="#top" className={PRIMARY_BUTTON}>
            {CTA_PRIMARY}
            <ArrowRight size={18} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          {/* mock pricing */}
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-zinc-200">
            Free on one device. Sync and Ask are $8 a month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-28 pt-16 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a href="#top" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
            <Mark shape="square" />
            {BRAND}
          </a>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-[color:var(--fg-2)]">
            A second brain for everything you read, write and want to remember.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-sm font-medium">{group}</p>
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
