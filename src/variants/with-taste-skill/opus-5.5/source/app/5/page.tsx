import Image from "next/image";
import {
  AndroidLogo,
  AppleLogo,
  ArrowRight,
  BookOpenText,
  CalendarBlank,
  Check,
  DeviceMobile,
  Globe,
  Graph,
  HardDrives,
  LinuxLogo,
  LockKey,
  MarkdownLogo,
  Plant,
  Waveform,
  WindowsLogo,
} from "@phosphor-icons/react/ssr";
import { Z } from "../lib/z";
import { Hero } from "./_components/hero";
import { RelatedNotes } from "./_components/related-notes";
import { Reveal } from "./_components/reveal";

/*
 * Shape rule: panels and images are 20px, every button and chip is a full pill.
 * Accent (amber) appears only on signup CTAs, the Pro plan and linked-state feedback.
 */

const SIGNUP = "#pricing";

const primaryBtnBase =
  "inline-flex h-12 items-center gap-2 rounded-full bg-(--accent) px-6 text-[15px] font-medium whitespace-nowrap text-(--on-accent) transition-[background-color,transform] duration-300 hover:bg-(--accent-hover) focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]";
// Primary CTAs only ever sit on photos or the deep-green Pro panel, so the focus ring is light.
const primaryBtn = `${primaryBtnBase} focus-visible:outline-white`;

const h2 =
  "text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance md:text-5xl lg:text-[3.5rem]";

const lead = "mt-5 max-w-[56ch] text-pretty text-lg leading-relaxed font-light text-(--muted) md:text-xl";

function Nav() {
  return (
    <header
      style={{ zIndex: Z.nav }}
      className="absolute inset-x-0 top-0 text-white"
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-4 sm:px-8"
      >
        <a
          href="#top"
          className="flex items-center gap-2 text-xl font-medium tracking-[-0.02em]"
        >
          <Plant size={22} weight="light" aria-hidden />
          Kept
        </a>
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 text-[15px] font-light text-white/85 md:flex">
            <li>
              <a href="#capture" className="transition-colors hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#privacy" className="transition-colors hover:text-white">
                Privacy
              </a>
            </li>
            <li>
              <a href="#pricing" className="transition-colors hover:text-white">
                Pricing
              </a>
            </li>
          </ul>
          <a
            href={SIGNUP}
            className="inline-flex h-10 items-center rounded-full bg-white/15 px-5 text-sm font-medium whitespace-nowrap backdrop-blur-md transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Start free
          </a>
        </div>
      </nav>
    </header>
  );
}

function Capture() {
  return (
    <section id="capture" className="mx-auto max-w-[1400px] px-4 py-28 sm:px-8 md:py-40">
      <Reveal className="max-w-3xl">
        <h2 className={h2}>One place for everything you notice.</h2>
        <p className={lead}>
          Save a thought, a page, a voice memo or a highlight in seconds. Kept
          files it away so you can get back to your day.
        </p>
      </Reveal>

      {/* 5 items, 5 cells: tall photo + two small tiles, then a small photo tile and a wide photo tile. */}
      <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-6 md:gap-5">
        <Reveal className="md:col-span-4 md:row-span-2">
          <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-(--surface)">
            <div className="relative aspect-[4/3] w-full md:aspect-auto md:flex-1">
              <Image
                src="https://picsum.photos/seed/kept-grove-open-book-36/1400/1000"
                alt="Hands writing in a notebook beside an open laptop"
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-7 sm:p-9">
              <h3 className="text-2xl font-medium tracking-[-0.02em]">Clip the web</h3>
              <p className="mt-2 max-w-[44ch] font-light text-(--muted)">
                Save a whole article, or only the paragraph that made you stop
                scrolling.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.08}>
          <article className="flex h-full flex-col justify-between gap-10 rounded-[20px] border border-(--line) p-7">
            <div className="flex gap-2" aria-hidden>
              <kbd className="grid h-11 min-w-11 place-items-center rounded-full border border-(--line) bg-(--surface) px-3 font-sans text-base">
                ⌥
              </kbd>
              <kbd className="grid h-11 place-items-center rounded-full border border-(--line) bg-(--surface) px-5 font-sans text-sm">
                Space
              </kbd>
            </div>
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em]">Quick capture</h3>
              <p className="mt-2 font-light text-(--muted)">
                One shortcut from any app. The note is saved before you look up.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.16}>
          <article className="flex h-full flex-col justify-between gap-10 rounded-[20px] bg-(--deep) p-7 text-(--on-deep)">
            <Waveform size={40} weight="light" aria-hidden />
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em]">Say it out loud</h3>
              <p className="mt-2 font-light text-(--on-deep-muted)">
                Voice memos are transcribed, so a long walk can turn into a note.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal className="md:col-span-2">
          <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-(--surface)">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="https://picsum.photos/seed/kept-grove-morning-desk-18/800/600"
                alt="Pages from old books laid out side by side"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-start gap-3 p-7">
              <BookOpenText size={22} weight="light" className="mt-1 shrink-0" aria-hidden />
              <div>
                <h3 className="text-xl font-medium tracking-[-0.02em]">Your highlights</h3>
                <p className="mt-2 font-light text-(--muted)">
                  Highlights from books and articles sync in on their own.
                </p>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal className="md:col-span-4" delay={0.08}>
          <article className="grid h-full overflow-hidden rounded-[20px] bg-(--surface) sm:grid-cols-2">
            <div className="relative aspect-[4/3] w-full sm:aspect-auto sm:min-h-[20rem]">
              <Image
                src="https://picsum.photos/seed/kept-grove-forest-morning-7/1000/900"
                alt="A phone held up to photograph the sea at dusk"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-end gap-2 p-7 sm:p-9">
              <DeviceMobile size={26} weight="light" className="mb-auto" aria-hidden />
              <h3 className="mt-10 text-xl font-medium tracking-[-0.02em]">From your phone</h3>
              <p className="font-light text-(--muted)">
                Share anything to Kept from the share sheet on iPhone or Android.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Resurfacing() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-8 py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <Reveal className="max-w-3xl">
          <h2 className={h2}>Notes that come back to you.</h2>
          <p className={lead}>
            As you write, Kept looks through everything you have saved and offers
            the older notes that belong nearby. Pick a note to try it.
          </p>
        </Reveal>
        <Reveal className="mt-14 md:mt-16" delay={0.1}>
          <RelatedNotes />
        </Reveal>
      </div>
    </section>
  );
}

function DailyNote() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-28 sm:px-8 md:py-40">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-7">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] md:aspect-[5/6]">
            <Image
              src="https://picsum.photos/seed/kept-grove-morning-desk-13/1400/1680"
              alt="A cup of tea and an open book on a bed in soft morning light"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal className="md:col-span-5" delay={0.1}>
          <h2 className={h2}>Start each day on a fresh page.</h2>
          <p className={lead}>
            Kept opens to today&rsquo;s note. Write what is on your mind, and the
            people and projects you mention link to what you already know.
          </p>
          <ul className="mt-10 grid gap-6">
            <li className="flex gap-4">
              <CalendarBlank size={24} weight="light" className="mt-0.5 shrink-0" aria-hidden />
              <p className="font-light">
                <span className="font-medium">A new page every morning.</span>{" "}
                <span className="text-(--muted)">Yesterday is one tap away.</span>
              </p>
            </li>
            <li className="flex gap-4">
              <Graph size={24} weight="light" className="mt-0.5 shrink-0" aria-hidden />
              <p className="font-light">
                <span className="font-medium">Type [[ to link any note.</span>{" "}
                <span className="text-(--muted)">
                  Backlinks and the graph show how ideas connect.
                </span>
              </p>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function InlineIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-2 inline-grid size-[1.35em] translate-y-[0.18em] place-items-center rounded-full bg-(--deep) align-baseline text-(--on-deep)">
      {children}
    </span>
  );
}

function Privacy() {
  return (
    <section id="privacy" className="scroll-mt-8 px-4 py-28 sm:px-8 md:py-44">
      <Reveal className="mx-auto max-w-4xl text-center">
        <h2 className="text-lg font-medium text-(--muted)">Your notes stay yours.</h2>
        <p className="mt-8 text-[1.7rem] leading-[1.45] font-light tracking-[-0.015em] text-balance md:text-[2.4rem] md:leading-[1.4]">
          Kept is{" "}
          <span className="whitespace-nowrap">
            local-first
            <InlineIcon>
              <HardDrives size="0.62em" weight="regular" aria-hidden />
            </InlineIcon>
          </span>
          , so every note lives on your own device and works offline. Each one
          is a plain{" "}
          <span className="whitespace-nowrap">
            Markdown file
            <InlineIcon>
              <MarkdownLogo size="0.62em" weight="regular" aria-hidden />
            </InlineIcon>
          </span>{" "}
          you can open anywhere. Sync is end-to-end{" "}
          <span className="whitespace-nowrap">
            encrypted
            <InlineIcon>
              <LockKey size="0.62em" weight="regular" aria-hidden />
            </InlineIcon>
          </span>
          , so nobody else can read it, including us.
        </p>
      </Reveal>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-28 sm:px-8 md:pb-40">
      <Reveal>
        <figure className="grid grid-cols-1 items-end gap-10 rounded-[20px] bg-(--surface) p-7 sm:p-12 md:grid-cols-12 md:gap-12 md:p-16">
          <div className="relative aspect-[4/5] w-full max-w-[20rem] overflow-hidden rounded-[20px] md:col-span-4 md:-mt-32 md:max-w-none">
            <Image
              src="https://picsum.photos/seed/kept-grove-phone-walk-24/800/1000"
              alt="Portrait of Ingrid Solberg"
              fill
              sizes="(min-width: 768px) 30vw, 20rem"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-8 md:pb-2">
            <blockquote className="text-[1.6rem] leading-[1.3] font-normal tracking-[-0.02em] md:text-[2.1rem]">
              &ldquo;Kept brought back a note from three years ago, right when my
              chapter needed it. My notebooks finally talk to each other.&rdquo;
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-medium">Ingrid Solberg</p>
              <p className="font-light text-(--muted)">PhD student in marine ecology</p>
            </figcaption>
          </div>
        </figure>
      </Reveal>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-8 mx-auto max-w-[1400px] px-4 py-28 sm:px-8 md:py-36">
      <Reveal className="max-w-3xl">
        <h2 className={h2}>Free to start, and to stay.</h2>
        <p className={lead}>
          Free has no limit on notes. Pro adds sync across every device.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 items-stretch gap-4 md:mt-16 md:grid-cols-12 md:gap-5">
        <Reveal className="md:col-span-5">
          <div className="flex h-full flex-col rounded-[20px] border border-(--line) p-8 sm:p-10">
            <h3 className="text-xl font-medium">Free</h3>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-medium tracking-[-0.03em]">$0</span>
            </p>
            <ul className="mt-8 grid gap-3 font-light">
              {["Unlimited notes", "One device, plus the web", "Links, backlinks and the graph", "Daily notes and highlights"].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check size={18} weight="regular" className="shrink-0 text-(--muted)" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={SIGNUP}
              className="mt-auto inline-flex h-12 items-center justify-center self-start rounded-full border border-(--ink)/25 px-6 text-[15px] font-medium whitespace-nowrap transition-[background-color,transform] duration-300 hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ink) active:scale-[0.98] max-md:mt-10 md:mt-12"
            >
              Start free
            </a>
          </div>
        </Reveal>

        <Reveal className="md:col-span-7" delay={0.1}>
          <div className="flex h-full flex-col rounded-[20px] bg-(--deep) p-8 text-(--on-deep) shadow-[0_30px_80px_-30px_var(--shadow)] ring-1 ring-(--accent)/40 sm:p-12">
            <h3 className="text-xl font-medium">Pro</h3>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="text-6xl font-medium tracking-[-0.035em] md:text-7xl">$8</span>
              <span className="font-light text-(--on-deep-muted)">a month, billed yearly</span>
            </p>
            <p className="mt-4 font-light text-(--on-deep-muted)">Everything in Free, plus:</p>
            <ul className="mt-5 grid gap-4 text-lg font-light">
              {["Sync across all your devices, end-to-end encrypted", "Ask your notes, with answers that cite them", "Version history for every note"].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check size={20} weight="bold" className="mt-1 shrink-0 text-(--accent)" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <a href={SIGNUP} className={primaryBtn}>
                Start free
                <ArrowRight size={16} weight="bold" aria-hidden />
              </a>
              <p className="mt-3 text-sm font-light text-(--on-deep-muted)">
                Upgrade to Pro from inside the app, whenever you are ready.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8">
      <Reveal>
        <div className="relative isolate flex min-h-[32rem] items-center justify-center overflow-hidden rounded-[20px] px-6 py-20 text-center text-[#f3f6f0]">
          <Image
            src="https://picsum.photos/seed/kept-grove-closing-canopy-19/2000/1100"
            alt=""
            fill
            sizes="(min-width: 1400px) 1400px, 100vw"
            className="-z-10 object-cover"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[rgb(10_22_14/0.58)]" />
          <div className="max-w-2xl">
            <h2 className="text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance md:text-6xl">
              Give your ideas room to grow.
            </h2>
            <p className="mx-auto mt-5 max-w-[40ch] text-lg font-light text-[#dce4da] md:text-xl">
              Your first note takes a few seconds. The rest can wait.
            </p>
            <div className="mt-9 flex justify-center">
              <a href={SIGNUP} className={primaryBtn}>
                Start free
                <ArrowRight size={16} weight="bold" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const PLATFORMS = [
  { name: "Mac", Icon: AppleLogo },
  { name: "Windows", Icon: WindowsLogo },
  { name: "Linux", Icon: LinuxLogo },
  { name: "iPhone", Icon: DeviceMobile },
  { name: "Android", Icon: AndroidLogo },
  { name: "Web", Icon: Globe },
] as const;

function Footer() {
  return (
    <footer className="border-t border-(--line)">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 pt-16 pb-32 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <a href="#top" className="flex items-center gap-2 text-xl font-medium tracking-[-0.02em]">
            <Plant size={22} weight="light" aria-hidden />
            Kept
          </a>
          <p className="mt-3 max-w-[30ch] font-light text-(--muted)">
            A calm place for notes, and the ideas that grow out of them.
          </p>
        </div>
        <div className="md:col-span-8">
          <h2 className="text-sm font-medium">Download</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PLATFORMS.map(({ name, Icon }) => (
              <li key={name}>
                <a
                  href="#"
                  className="flex h-12 items-center gap-3 rounded-full border border-(--line) px-5 font-light transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ink)"
                >
                  <Icon size={18} weight="regular" aria-hidden />
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-sm font-light text-(--muted)">
            <span>&copy; 2026 Kept</span>
            <a href="#" className="hover:text-(--ink)">Privacy policy</a>
            <a href="#" className="hover:text-(--ink)">Terms</a>
            <a href="#" className="hover:text-(--ink)">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <main id="top" className="relative overflow-x-clip">
      <Nav />
      <Hero />
      <Capture />
      <Resurfacing />
      <DailyNote />
      <Privacy />
      <Testimonial />
      <Pricing />
      <ClosingCta />
      <Footer />
    </main>
  );
}
