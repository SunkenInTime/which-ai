import {
  ArrowRight,
  FolderSimple,
  LockKey,
} from "@phosphor-icons/react/dist/ssr";
import { LogoRow } from "../_components/import-logos";
import { Magnetic } from "../_components/magnetic";
import { Mark } from "../_components/mark";
import { Photo } from "../_components/photo";
import { Rail } from "../_components/rail";
import { Reveal } from "../_components/reveal";
import { BRAND, CTA_PRIMARY, CTA_SECONDARY, FOOTER_LINKS } from "../_lib/pith";
import { AskTile, Drift, QuoteCarousel, TiltPhoto } from "./leaves";

/*
  Shape rule for this iteration:
  buttons and chips are full pills, cards are 28px, nested panels 16px.
*/
const PILL_PRIMARY =
  "group inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--accent)] px-6 text-[15px] font-medium text-[color:var(--on-accent)] shadow-[0_10px_24px_-12px_var(--accent)] transition-[transform,filter] duration-200 hover:brightness-105 active:scale-[0.97]";
const PILL_GLASS =
  "glass inline-flex h-12 items-center whitespace-nowrap rounded-full px-6 text-[15px] font-medium text-[color:var(--fg)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]";
const CARD = "relative isolate overflow-hidden rounded-[28px]";

export function Nav() {
  return (
    <header className="sticky top-3 z-(--z-nav) px-3 pt-3 md:px-6">
      <div className="glass mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full pl-5 pr-2">
        <a href="#top" className="flex items-center gap-2.5 text-lg font-medium tracking-tight">
          <Mark />
          {BRAND}
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] text-[color:var(--fg-2)] md:flex">
          <a href="#features" className="transition-colors hover:text-[color:var(--fg)]">Features</a>
          <a href="#day" className="transition-colors hover:text-[color:var(--fg)]">A day with Pith</a>
          <a href="#voices" className="transition-colors hover:text-[color:var(--fg)]">Reviews</a>
        </nav>
        <a href="#download" className={`${PILL_PRIMARY} h-10 px-5 text-sm`}>
          {CTA_PRIMARY}
        </a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 md:px-8 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-12 lg:gap-8 lg:pb-10 lg:pt-10">
      <div className="lg:col-span-6">
        <h1 className="text-[2.9rem] font-light leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
          <span className="block animate-fade-up">A calmer place</span>
          <span className="block animate-fade-up font-medium [animation-delay:100ms]">to think.</span>
        </h1>
        <p className="mt-7 max-w-[42ch] text-lg leading-relaxed text-[color:var(--fg-2)] animate-fade-up [animation-delay:240ms]">
          Pith keeps what you write, links it for you, and brings it back when you need it.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up [animation-delay:360ms]">
          <Magnetic>
            <a href="#download" className={PILL_PRIMARY}>
              {CTA_PRIMARY}
              <ArrowRight size={17} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <a href="#features" className={PILL_GLASS}>
            {CTA_SECONDARY}
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[520px] animate-fade-up [animation-delay:200ms] lg:col-span-6 lg:max-w-none">
        <div className="grid grid-cols-12 items-start pb-10">
          <TiltPhoto
            id={306}
            alt="A white water lily floating on dark water among green pads"
            sizes="(min-width: 1024px) 34vw, 90vw"
            priority
            className="col-span-9 col-start-1 row-start-1 aspect-[4/5] rounded-[28px] shadow-[0_30px_60px_-30px_rgb(22_26_38/0.5)]"
          />
          <Drift distance={40} className="relative col-span-5 col-start-8 row-start-1 translate-y-[10%] self-end">
            <TiltPhoto
              id={239}
              alt="A hand holding a dandelion seed head against a dark background"
              sizes="(min-width: 1024px) 18vw, 40vw"
              strength={10}
              className="aspect-square rounded-[28px] ring-[6px] ring-[color:var(--bg)]"
            />
          </Drift>
        </div>
      </div>
    </section>
  );
}

export function ImportStrip() {
  return (
    <section aria-label="Imports from" className="px-5 md:px-8">
      <div className="glass mx-auto flex max-w-5xl flex-col items-start gap-5 rounded-[28px] px-7 py-6 md:flex-row md:items-center md:justify-between md:rounded-full md:px-10">
        <p className="shrink-0 text-[15px] text-[color:var(--fg-2)]">Imports from</p>
        <LogoRow
          className="md:justify-end"
          logoClassName="h-5 text-[color:var(--fg-3)] transition-colors duration-200 hover:text-[color:var(--fg)]"
        />
      </div>
    </section>
  );
}

export function Bento() {
  return (
    <section id="features" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8 lg:py-36">
      <Reveal>
        <h2 className="max-w-[16ch] text-4xl font-light leading-[1.04] tracking-[-0.03em] md:text-6xl">
          Everything in one <span className="font-medium">quiet place.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:grid-rows-[300px_300px_auto]">
        {/* Capture: photo */}
        <Reveal className={`${CARD} min-h-[380px] text-zinc-50 lg:col-span-7 lg:row-span-2`}>
          <div className="group absolute inset-0">
            <Photo
              id={302}
              alt="A still sea under a pale sky with a single marker post standing in the water"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          </div>
          <span aria-hidden className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
            <h3 className="text-3xl font-medium tracking-tight">Capture from anywhere</h3>
            <p className="mt-3 max-w-[42ch] text-lg leading-relaxed text-zinc-100">
              One shortcut opens a note over any app. Clip a page, dictate, or forward an email.
            </p>
          </div>
        </Reveal>

        {/* Links: gradient */}
        <Reveal
          delay={0.08}
          className={`${CARD} flex flex-col justify-between bg-linear-to-br from-[color:var(--accent)] to-[color:var(--accent-2,var(--accent))] p-8 text-[color:var(--on-accent)] lg:col-span-5`}
        >
          <p aria-hidden className="text-6xl font-light tracking-tight md:text-7xl">
            [[ ]]
          </p>
          <div>
            <h3 className="text-2xl font-medium tracking-tight">Links, both ways</h3>
            <p className="mt-2 max-w-[34ch] leading-relaxed">
              Type [[ to link. The other note gets a backlink on its own.
            </p>
          </div>
        </Reveal>

        {/* Resurface: photo */}
        <Reveal delay={0.16} className={`${CARD} min-h-[300px] text-zinc-50 lg:col-span-5`}>
          <div className="group absolute inset-0">
            <Photo
              id={311}
              alt="A wooden chair beside a window with a pale curtain at dusk"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          </div>
          <span aria-hidden className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-8">
            <h3 className="text-2xl font-medium tracking-tight">Old notes return</h3>
            <p className="mt-2 max-w-[34ch] leading-relaxed text-zinc-100">
              A few forgotten notes come back each morning, picked to fit your day.
            </p>
          </div>
        </Reveal>

        {/* Yours: neutral */}
        <Reveal delay={0.08} className={`${CARD} flex flex-col justify-between border border-[color:var(--line)] bg-[color:var(--bg-2)] p-8 lg:col-span-5`}>
          <div className="flex gap-3 text-[color:var(--accent)]">
            <FolderSimple size={30} weight="light" />
            <LockKey size={30} weight="light" />
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-medium tracking-tight">Yours to keep</h3>
            <p className="mt-2 max-w-[36ch] leading-relaxed text-[color:var(--fg-2)]">
              Plain files in a folder you own. Encrypted sync when you want it, and never when you do not.
            </p>
          </div>
        </Reveal>

        {/* Ask: interactive */}
        <Reveal delay={0.16} className={`${CARD} border border-[color:var(--line)] bg-[color:var(--bg-2)] p-8 lg:col-span-7`}>
          <AskTile />
        </Reveal>
      </div>
    </section>
  );
}

const DAY = [
  {
    title: "Review over coffee",
    body: "Three old notes come back, each one related to today.",
    photo: 311,
    alt: "A chair by a window in soft evening light",
  },
  {
    title: "Capture between meetings",
    body: "Hit the shortcut, type the thought, close it, and keep going.",
    photo: 293,
    alt: "A wooden pier stretching into calm water under a pale sky",
  },
  {
    title: "Link while you write",
    body: "Pick a note as you go. The link shows up on both sides.",
    photo: 305,
    alt: "A small vase of green sprigs on a table on a balcony",
  },
  {
    title: "Ask before you decide",
    body: "Check what you already know, with the notes to prove it.",
    photo: 279,
    alt: "A calm grey sea meeting a soft pink sky",
  },
] as const;

export function Day() {
  return (
    <section id="day" className="scroll-mt-24 overflow-hidden pb-24 lg:pb-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-[14ch] text-4xl font-light leading-[1.04] tracking-[-0.03em] md:text-6xl">
            A day in <span className="font-medium">your notes.</span>
          </h2>
        </Reveal>
      </div>
      <Rail
        label="A day with Pith"
        className="mt-12"
        buttonClassName="glass rounded-full text-[color:var(--fg)] hover:-translate-y-0.5"
        step={360}
      >
        {DAY.map((item) => (
          <li key={item.title} className="group w-[min(78vw,340px)] shrink-0 snap-start">
            <div className={`${CARD} aspect-[3/4]`}>
              <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-105">
                <Photo id={item.photo} alt={item.alt} sizes="340px" />
              </div>
            </div>
            <h3 className="mt-5 text-xl font-medium tracking-tight">{item.title}</h3>
            <p className="mt-1.5 max-w-[30ch] leading-relaxed text-[color:var(--fg-2)]">{item.body}</p>
          </li>
        ))}
      </Rail>
    </section>
  );
}

export function Voices() {
  return (
    <section id="voices" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-24 md:px-8 lg:pb-36">
      <QuoteCarousel />
    </section>
  );
}

export function Closing() {
  return (
    <section id="download" className="scroll-mt-24 px-5 pb-8 md:px-8">
      <div className={`${CARD} mx-auto max-w-7xl text-zinc-50`}>
        <Photo
          id={279}
          alt="A calm grey sea meeting a soft pink sky"
          sizes="100vw"
          dim={false}
        />
        <span aria-hidden className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-950/45 to-slate-950/10" />
        <div className="relative flex min-h-[min(72dvh,560px)] flex-col justify-end gap-8 p-8 md:p-14">
          <Reveal>
            <h2 className="max-w-[14ch] text-5xl font-light leading-[1.02] tracking-[-0.035em] md:text-7xl">
              Bring your notes <span className="font-medium">home.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#top" className={PILL_PRIMARY}>
              {CTA_PRIMARY}
              <ArrowRight size={17} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            {/* mock pricing */}
            <p className="text-[15px] text-zinc-100">Free on one device. Sync and Ask are $8 a month.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-28 pt-16 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <a href="#top" className="flex items-center gap-2.5 text-lg font-medium tracking-tight">
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
