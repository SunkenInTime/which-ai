import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { Reveal, RisingHeadline } from "./_components/motion-bits";

const STAGES = [
  {
    name: "Capture",
    body: "Type, clip a page, forward an email or record a voice memo. It all lands in one inbox.",
    img: "https://picsum.photos/seed/cairn-capture-typewriter-hands/900/900",
    alt: "Hands typing on a laptop next to a paper notebook",
    tone: "bg-(--c-accent) text-(--c-on-accent)",
  },
  {
    name: "Connect",
    body: "Links appear on their own. Cairn reads each note and shows the ones it sits close to.",
    img: "https://picsum.photos/seed/cairn-connect-rope-knots/900/900",
    alt: "Ropes tied together on a wooden pier",
    tone: "bg-(--c-fg) text-(--c-bg)",
  },
  {
    name: "Resurface",
    body: "Start writing and related notes slide in beside your draft, including ones you forgot.",
    img: "https://picsum.photos/seed/cairn-resurface-library-stairs/900/900",
    alt: "A spiral staircase inside an old library",
    tone: "bg-(--c-surface-2) text-(--c-fg)",
  },
  {
    name: "Ask",
    body: "Ask a question and get an answer with sources. Every claim points to a note you wrote.",
    img: "https://picsum.photos/seed/cairn-ask-window-reading/900/900",
    alt: "A person reading beside a bright window",
    tone: "bg-(--c-surface) text-(--c-fg) border border-(--c-line)",
  },
];

const IMPORTS = ["Notion", "Evernote", "Obsidian", "Apple Notes", "Google Keep", "Readwise", "Markdown folders", "Plain text"];

const focus =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--c-accent)";
const primary = `inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[20px] bg-(--c-accent) px-7 text-[16px] font-semibold text-(--c-on-accent) transition-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${focus}`;
const secondary = `inline-flex h-12 items-center justify-center whitespace-nowrap rounded-[20px] border border-(--c-fg) px-7 text-[16px] font-semibold transition-colors hover:bg-(--c-surface-2) active:scale-[0.98] ${focus}`;

export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-(--c-bg) text-(--c-fg)">
      <header className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="#top" className={`rounded-[10px] text-[24px] font-extrabold tracking-[-0.05em] ${focus}`}>
          cairn
        </a>
        <nav aria-label="Main" className="hidden items-center gap-9 text-[15px] font-medium md:flex">
          <a href="#how" className="hover:text-(--c-accent)">What it does</a>
          <a href="#imports" className="hover:text-(--c-accent)">Imports</a>
          <a href="#pricing" className="hover:text-(--c-accent)">Pricing</a>
        </nav>
        <a href="#pricing" className={`${primary} h-10 px-5 text-[14px]`}>Start free</a>
      </header>

      <main id="top">
        {/* Hero: oversized headline, tall portrait offset to the right */}
        <section className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pb-28">
          <div className="lg:col-span-8 lg:pt-10">
            <RisingHeadline
              text="Notes that read back to you."
              className="text-[52px] font-extrabold leading-[0.96] tracking-[-0.055em] sm:text-7xl lg:text-[104px]"
            />
            <Reveal delay={0.4} className="mt-8 max-w-[44ch]">
              <p className="text-[19px] leading-relaxed text-(--c-fg-2)">
                Cairn turns scattered notes into linked pages, then surfaces the right ones when you start writing.
              </p>
            </Reveal>
            <Reveal delay={0.5} className="mt-9 flex flex-wrap gap-3">
              <a href="#pricing" className={primary}>Start free</a>
              <a href="#how" className={secondary}>See what it does</a>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9 lg:row-span-1 lg:-mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/cairn-library-shelves-reading-light/800/1100"
              alt="Tall wooden library shelves with a reader in the aisle"
              width={800}
              height={1100}
              fetchPriority="high"
              className="aspect-[8/11] w-full rounded-[20px] object-cover"
            />
          </Reveal>
        </section>

        {/* Sticky stack */}
        <section id="how" className="mx-auto max-w-[1400px] scroll-mt-4 px-4 pb-24 sm:px-6 lg:px-10 md:pb-32">
          <Reveal>
            <h2 className="max-w-3xl text-[38px] font-extrabold leading-[1] tracking-[-0.05em] sm:text-6xl">
              What Cairn does with every note.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5">
            {STAGES.map((s, i) => (
              <article
                key={s.name}
                style={{ top: `calc(5rem + ${i} * 1.1rem)` }}
                className={`grid gap-8 overflow-hidden rounded-[20px] p-6 md:sticky md:min-h-[440px] md:grid-cols-12 md:gap-10 md:p-10 ${s.tone}`}
              >
                <div className="flex flex-col justify-between gap-10 md:col-span-6">
                  <h3 className="text-[44px] font-extrabold leading-none tracking-[-0.05em] sm:text-[64px]">{s.name}</h3>
                  <p className="max-w-[38ch] text-[18px] leading-relaxed opacity-90">{s.body}</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.alt}
                  width={900}
                  height={900}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[12px] object-cover md:col-span-6 md:aspect-auto md:h-full"
                />
              </article>
            ))}
          </div>
        </section>

        {/* Imports: scroll-snap pills */}
        <section id="imports" className="border-y border-(--c-line) bg-(--c-surface) py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] scroll-mt-4 px-4 sm:px-6 lg:px-10">
            <Reveal>
              <h2 className="max-w-2xl text-[34px] font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                Bring your old notes with you.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-(--c-fg-2)">
                Import from the apps you already use. Titles, tags and links come along.
              </p>
            </Reveal>
          </div>
          <ul
            tabIndex={0}
            aria-label="Supported imports"
            className="no-scrollbar mt-10 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-[max(2.5rem,calc((100vw-1400px)/2+2.5rem))]"
          >
            {IMPORTS.map((x) => (
              <li
                key={x}
                className="shrink-0 snap-start whitespace-nowrap rounded-[20px] border border-(--c-line) bg-(--c-bg) px-6 py-3 text-[17px] font-medium"
              >
                {x}
              </li>
            ))}
          </ul>
        </section>

        {/* Quote, offset */}
        <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-10 md:py-36">
          <Reveal className="lg:ml-[16.66%] lg:max-w-4xl">
            <blockquote className="text-[32px] font-bold leading-[1.1] tracking-[-0.04em] sm:text-[52px]">
              “It is the first notebook that asks me questions back.”
            </blockquote>
            <p className="mt-8 text-[16px] text-(--c-fg-2)">Ilse Brandt, features editor at a weekly magazine</p>
          </Reveal>
        </section>

        {/* Pricing, big type */}
        <section id="pricing" className="border-t border-(--c-line)">
          <div className="mx-auto grid max-w-[1400px] scroll-mt-4 gap-14 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:gap-8 lg:px-10">
            <div className="lg:col-span-5">
              <p className="text-[96px] font-extrabold leading-none tracking-[-0.06em] sm:text-[140px]">$0</p>
              <h3 className="mt-2 text-[24px] font-bold tracking-[-0.03em]">Free</h3>
              <p className="mt-3 max-w-[34ch] text-[16px] leading-relaxed text-(--c-fg-2)">
                Up to 200 notes, the web clipper and automatic links on one device.
              </p>
              <a href="#top" className={`${secondary} mt-7`}>Start free</a>
            </div>
            <div className="rounded-[20px] bg-(--c-accent) p-8 text-(--c-on-accent) lg:col-span-6 lg:col-start-7 md:p-12">
              <p className="text-[96px] font-extrabold leading-none tracking-[-0.06em] sm:text-[140px]">$8</p>
              <h3 className="mt-2 text-[24px] font-bold tracking-[-0.03em]">Pro, per month</h3>
              <p className="mt-3 max-w-[40ch] text-[16px] leading-relaxed">
                Unlimited notes, Ask your notes, the weekly review and sync on every device.
              </p>
              <a
                href="#top"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[20px] bg-(--c-on-accent) px-7 text-[16px] font-semibold text-(--c-accent) transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--c-on-accent)"
              >
                Start free <ArrowUpRight size={16} weight="bold" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-10 text-[14px] text-(--c-fg-3) sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <p>Cairn. Notes that read back.</p>
        <nav aria-label="Footer" className="flex gap-6">
          <a href="#top" className="hover:text-(--c-fg)">Privacy</a>
          <a href="#top" className="hover:text-(--c-fg)">Terms</a>
          <a href="#top" className="hover:text-(--c-fg)">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
