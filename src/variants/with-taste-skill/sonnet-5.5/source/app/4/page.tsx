import { ArrowRight, Check, Stack } from "@phosphor-icons/react/ssr";
import { Z } from "../lib/z";
import { DayPan } from "./_components/day-pan";
import { Reveal } from "./_components/reveal";
import { SpotlightCard } from "./_components/spotlight-card";

const MOMENTS = [
  {
    time: "Morning",
    title: "Clip an article",
    body: "One click saves the page and your highlights, tagged with the source.",
    img: "https://picsum.photos/seed/cairn-morning-coffee-window/800/640",
    alt: "A cup of coffee on a windowsill in morning light",
  },
  {
    time: "Midday",
    title: "Write up a meeting",
    body: "Cairn suggests earlier notes on the same project while you type.",
    img: "https://picsum.photos/seed/cairn-midday-meeting-table/800/640",
    alt: "A meeting table with notebooks and pens",
  },
  {
    time: "Afternoon",
    title: "Ask a question",
    body: "Get an answer built from your own notes, with every source listed.",
    img: "https://picsum.photos/seed/cairn-afternoon-desk-plants/800/640",
    alt: "A desk with a laptop and a small plant",
  },
  {
    time: "Evening",
    title: "Review the day",
    body: "Keep what mattered, archive the rest and let the links settle.",
    img: "https://picsum.photos/seed/cairn-evening-lamp-books/800/640",
    alt: "A lamp glowing beside a stack of books",
  },
];

const FREE = ["Up to 200 notes", "Web clipper", "Automatic links"];
const PRO = ["Unlimited notes", "Ask your notes", "Weekly review", "Sync on every device"];

const focus =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--c-accent)";
const primary = `inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[20px] bg-(--c-accent) px-6 text-[15px] font-semibold text-(--c-on-accent) transition-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${focus}`;
const ghostOnPhoto = `glass inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[20px] px-6 text-[15px] font-medium transition-transform active:scale-[0.98] ${focus}`;
const cell = "h-full p-7 md:p-9";

export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-(--c-bg) text-(--c-fg)">
      {/* Hero, full-bleed photo */}
      <section className="relative flex min-h-[100dvh] flex-col overflow-hidden text-(--c-photo-text)">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/cairn-night-library-lamp-shelves/2000/1300"
          alt="A dim library at night with a lit reading lamp"
          width={2000}
          height={1300}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-[#0d1217] via-[#0d1217]/55 to-[#0d1217]/25" />

        <header
          style={{ zIndex: Z.nav }}
          className="glass relative mx-4 mt-4 flex h-14 items-center justify-between rounded-full pl-5 pr-2 sm:mx-6 lg:mx-auto lg:w-full lg:max-w-5xl"
        >
          <a href="#top" className={`flex items-center gap-2 rounded-full text-[18px] font-semibold tracking-[-0.02em] ${focus}`}>
            <Stack size={20} weight="fill" className="text-(--c-accent)" />
            Cairn
          </a>
          <nav aria-label="Main" className="hidden items-center gap-8 text-[14px] text-(--c-photo-text-2) md:flex">
            <a href="#features" className="hover:text-(--c-photo-text)">Features</a>
            <a href="#day" className="hover:text-(--c-photo-text)">A day with Cairn</a>
            <a href="#pricing" className="hover:text-(--c-photo-text)">Pricing</a>
          </nav>
          <a href="#pricing" className={`${primary} h-10 px-5 text-[14px]`}>Start free</a>
        </header>

        <div id="top" className="relative mx-auto mt-auto flex w-full max-w-7xl flex-col px-4 pb-14 pt-24 sm:px-6 lg:px-8 lg:pb-20">
          <Reveal immediate>
            <h1 className="max-w-4xl text-[44px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
              A quiet library for everything you know.
            </h1>
          </Reveal>
          <Reveal immediate delay={0.1}>
            <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-(--c-photo-text-2)">
              Cairn keeps your notes, links them together and finds the right one when you need it.
            </p>
          </Reveal>
          <Reveal immediate delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <a href="#pricing" className={primary}>
              Start free <ArrowRight size={16} weight="bold" />
            </a>
            <a href="#features" className={ghostOnPhoto}>See the features</a>
          </Reveal>
        </div>
      </section>

      <main>
        {/* Bento: 5 items, 5 cells */}
        <section id="features" className="mx-auto max-w-7xl scroll-mt-4 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <Reveal>
            <h2 className="max-w-2xl text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              Built for keeping, made for finding.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <SpotlightCard className="relative h-full min-h-[380px] text-(--c-photo-text)">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://picsum.photos/seed/cairn-ask-night-desk-notes/1200/800"
                  alt="Handwritten notes and a lamp on a dark desk"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-[#0d1217] via-[#0d1217]/60 to-[#0d1217]/20" />
                <div className={`${cell} relative flex flex-col justify-end`}>
                  <h3 className="text-[28px] font-semibold tracking-[-0.03em]">Ask your notes</h3>
                  <p className="mt-2 max-w-[44ch] text-[16px] leading-relaxed text-(--c-photo-text-2)">
                    Ask “What did Marta say about the first week?” and read an answer built from three of your notes.
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-5">
              <SpotlightCard className="h-full min-h-[280px] bg-(--c-accent) text-(--c-on-accent)">
                <div className={`${cell} flex flex-col justify-between gap-16`}>
                  <h3 className="text-[28px] font-semibold tracking-[-0.03em]">Web clipper</h3>
                  <p className="max-w-[34ch] text-[16px] leading-relaxed">
                    Save an article or a single highlight. It arrives tagged with where it came from.
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.04} className="lg:col-span-3">
              <SpotlightCard className="dots h-full min-h-[260px] border border-(--c-line) bg-(--c-surface)">
                <div className={`${cell} flex flex-col justify-between gap-12`}>
                  <h3 className="text-[24px] font-semibold tracking-[-0.03em]">Backlinks</h3>
                  <p className="text-[15px] leading-relaxed text-(--c-fg-2)">
                    See every note that points to the one you are reading.
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <SpotlightCard className="h-full min-h-[260px] border border-(--c-line) bg-(--c-surface-2)">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://picsum.photos/seed/cairn-review-notebook-friday/900/420"
                  alt="An open notebook with a pen on a table"
                  width={900}
                  height={420}
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
                <div className="p-7">
                  <h3 className="text-[24px] font-semibold tracking-[-0.03em]">Weekly review</h3>
                  <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-(--c-fg-2)">
                    Friday, Cairn gathers what you wrote and asks what to keep.
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.16} className="lg:col-span-4">
              <SpotlightCard className="h-full min-h-[260px] border border-(--c-line) bg-(--c-surface)">
                <div className={`${cell} flex flex-col justify-between gap-12`}>
                  <h3 className="text-[24px] font-semibold tracking-[-0.03em]">Works offline</h3>
                  <p className="text-[15px] leading-relaxed text-(--c-fg-2)">
                    Write on a train. Notes sync when you are back online.
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>

        {/* Pinned horizontal pan */}
        <DayPan moments={MOMENTS} />

        {/* Quote with portrait */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <Reveal className="lg:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/cairn-portrait-researcher-glasses/640/800"
              alt="Portrait of Dilnoza Rakhimova"
              width={640}
              height={800}
              loading="lazy"
              className="aspect-[4/5] w-full max-w-sm rounded-[20px] object-cover"
            />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <blockquote className="text-[28px] font-medium leading-[1.2] tracking-[-0.03em] sm:text-[40px]">
              “I wrote for a year without organizing anything. Cairn found the structure I did not know was there.”
            </blockquote>
            <p className="mt-6 text-[16px] text-(--c-fg-2)">Dilnoza Rakhimova, research lead at a public library</p>
          </Reveal>
        </section>

        {/* Pricing over a photo, so the glass has something to refract */}
        <section id="pricing" className="relative overflow-hidden text-(--c-photo-text)">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/cairn-pricing-dark-reading-room/2000/1200"
            alt=""
            width={2000}
            height={1200}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-[#0d1217]/70" />
          <div className="relative mx-auto max-w-7xl scroll-mt-4 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <h2 className="max-w-2xl text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              Start free. Upgrade when your library grows.
            </h2>
            <div className="mt-12 grid gap-4 lg:grid-cols-12">
              <div className="glass rounded-[20px] p-8 lg:col-span-5">
                <h3 className="text-[22px] font-semibold">Free</h3>
                <ul className="mt-5 grid gap-3 text-[15px] text-(--c-photo-text-2)">
                  {FREE.map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <Check size={16} weight="bold" className="text-(--c-accent)" />
                      {x}
                    </li>
                  ))}
                </ul>
                <a href="#top" className={`${ghostOnPhoto} mt-8`}>Start free</a>
              </div>
              <div className="glass rounded-[20px] p-8 lg:col-span-7">
                <h3 className="text-[22px] font-semibold">Pro</h3>
                <p className="mt-1 text-[15px] text-(--c-photo-text-2)">$8 a month, billed yearly</p>
                <ul className="mt-5 grid gap-3 text-[15px] text-(--c-photo-text-2) sm:grid-cols-2">
                  {PRO.map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <Check size={16} weight="bold" className="text-(--c-accent)" />
                      {x}
                    </li>
                  ))}
                </ul>
                <a href="#top" className={`${primary} mt-8`}>Start free</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-[14px] text-(--c-fg-3) sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Cairn. A quiet library for your notes.</p>
        <nav aria-label="Footer" className="flex gap-6">
          <a href="#top" className="hover:text-(--c-fg)">Privacy</a>
          <a href="#top" className="hover:text-(--c-fg)">Terms</a>
          <a href="#top" className="hover:text-(--c-fg)">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
