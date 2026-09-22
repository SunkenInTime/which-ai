import Image from "next/image";
import {
  AndroidLogo,
  AppleLogo,
  Check,
  ClockCounterClockwise,
  FileMd,
  Globe,
  Keyboard,
  LinuxLogo,
  Microphone,
  Scissors,
  ShareNetwork,
  WindowsLogo,
} from "@phosphor-icons/react/ssr";
import { AskNotes } from "./_components/ask-notes";
import { Cta } from "./_components/cta";
import { Hero } from "./_components/hero";
import { MotionProvider } from "./_components/motion-provider";
import { Reveal } from "./_components/reveal";

const LOGOS = [
  { slug: "figma", name: "Figma" },
  { slug: "stripe", name: "Stripe" },
  { slug: "spotify", name: "Spotify" },
  { slug: "duolingo", name: "Duolingo" },
  { slug: "mozilla", name: "Mozilla" },
  { slug: "airbnb", name: "Airbnb" },
];

const PLATFORMS = [
  { icon: AppleLogo, label: "Mac and iPhone" },
  { icon: WindowsLogo, label: "Windows" },
  { icon: LinuxLogo, label: "Linux" },
  { icon: AndroidLogo, label: "Android" },
  { icon: Globe, label: "Web" },
];

const CAPTURE = [
  { icon: Keyboard, label: "Quick capture shortcut" },
  { icon: Scissors, label: "Web clipper" },
  { icon: ShareNetwork, label: "Share sheet" },
  { icon: Microphone, label: "Voice memos" },
];

const sectionTitle = "text-3xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-4xl";
const cell = "rounded-[12px] border border-(--k-line)";

export default function Page() {
  return (
    <MotionProvider>
    <div className="v1 min-h-[100dvh] bg-(--k-bg) font-sans text-(--k-fg) antialiased">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full text-[17px] font-semibold tracking-[-0.03em] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-accent)"
        >
          <span aria-hidden className="size-[18px] rounded-[5px] bg-(--k-accent)" />
          Kept
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 text-[14px] text-(--k-fg-2) md:flex">
          <a href="#features" className="transition-colors hover:text-(--k-fg)">
            Features
          </a>
          <a href="#ask" className="transition-colors hover:text-(--k-fg)">
            Ask your notes
          </a>
          <a href="#pricing" className="transition-colors hover:text-(--k-fg)">
            Pricing
          </a>
        </nav>
        <Cta href="#pricing" className="h-9 px-4 text-[14px]">
          Start free
        </Cta>
      </header>

      <main id="top">
        <Hero />

        {/* Logo strip */}
        <section aria-label="Used by people at" className="border-y border-(--k-line)">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-9 sm:px-6 md:flex-row md:items-center md:gap-12 lg:px-8">
            <p className="shrink-0 text-[14px] text-(--k-fg-3)">Used by people at</p>
            <ul className="grid flex-1 grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-6">
              {LOGOS.map((l) => (
                <li key={l.slug} className="flex justify-center md:justify-start">
                  {/* Simple Icons via jsDelivr (cdn.simpleicons.org rejects some clients). Black SVG, tinted by filter. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.jsdelivr.net/npm/simple-icons@16/icons/${l.slug}.svg`}
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

        {/* Features bento */}
        <section id="features" className="mx-auto max-w-7xl scroll-mt-6 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className={sectionTitle}>Everything you save stays useful.</h2>
            <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-(--k-fg-2)">
              Capture takes a second. After that, links and search do the remembering for you.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            {/* Ask your notes */}
            <Reveal
              className={`${cell} k-dots bg-(--k-surface-2) p-5 sm:p-8 md:col-span-2 lg:col-span-4 lg:row-span-2`}
            >
              <div id="ask" className="flex h-full scroll-mt-6 flex-col gap-7">
                <div className="max-w-md">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">Ask your notes</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-(--k-fg-2)">
                    Ask in plain words. Kept answers from what you wrote, and cites every note it used.
                  </p>
                </div>
                <AskNotes />
              </div>
            </Reveal>

            {/* Capture, image cell */}
            <Reveal delay={0.06} className={`${cell} flex flex-col overflow-hidden bg-(--k-surface) lg:col-span-2`}>
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="https://picsum.photos/seed/kept-capture-notebook-desk/800/500"
                  alt="An open notebook and a phone on a desk"
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale-[35%]"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold tracking-[-0.02em]">Capture from anywhere</h3>
                <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[13px] text-(--k-fg-2)">
                  {CAPTURE.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-2">
                      <Icon size={15} className="shrink-0 text-(--k-fg)" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Resurfacing, accent fill */}
            <Reveal
              delay={0.12}
              className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[12px] bg-(--k-accent) p-6 text-(--k-on-accent) lg:col-span-2"
            >
              <ClockCounterClockwise size={28} weight="bold" />
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.02em]">Old notes come back on their own</h3>
                <p className="mt-2 text-[14px] leading-relaxed">
                  As you write, the Related panel pulls up notes from months or years ago that touch the same
                  idea.
                </p>
              </div>
            </Reveal>

            {/* Platforms */}
            <Reveal className={`${cell} flex flex-col bg-(--k-surface) p-6 sm:p-8 lg:col-span-2`}>
              <h3 className="text-lg font-semibold tracking-[-0.02em]">On every device you use</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-(--k-fg-2)">
                The same notes on your laptop, your phone and the web.
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {PLATFORMS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-(--k-line) px-3 py-1.5 text-[13px]"
                  >
                    <Icon size={15} weight="fill" className="text-(--k-fg-2)" />
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Ownership, Markdown */}
            <Reveal
              delay={0.06}
              className={`${cell} k-hatch grid gap-6 bg-(--k-bg) p-6 sm:p-8 md:col-span-1 lg:col-span-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center`}
            >
              <div>
                <FileMd size={28} className="text-(--k-fg)" />
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">Plain Markdown, on your disk</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-(--k-fg-2)">
                  Kept is local-first. Every note is a .md file you can open in any editor. Sync is end-to-end
                  encrypted.
                </p>
              </div>
              <figure className="overflow-hidden rounded-[12px] border border-(--k-line) bg-(--k-surface)">
                <figcaption className="border-b border-(--k-line) px-4 py-2.5 font-mono text-[12px] text-(--k-fg-3)">
                  ~/Kept/Reading/The Overstory.md
                </figcaption>
                <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-6 text-(--k-fg-2)">
                  <code>
                    <span className="text-(--k-fg-3)">---</span>
                    {"\n"}tags: [books, trees]
                    {"\n"}
                    <span className="text-(--k-fg-3)">---</span>
                    {"\n"}
                    <span className="font-semibold text-(--k-fg)"># The Overstory</span>
                    {"\n\n"}Close to <span className="text-(--k-accent-ink)">[[Finding the Mother Tree]]</span>.
                    {"\n"}Same science, told as fiction.
                  </code>
                </pre>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* Testimonial */}
        <section className="border-t border-(--k-line)">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-10 px-4 py-20 sm:px-6 md:grid-cols-12 md:py-28 lg:px-8">
            <Reveal className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[12px] md:col-span-4">
              <Image
                src="https://picsum.photos/seed/kept-novelist-writing-desk/800/1000"
                alt="A writing desk with a stack of books by a window"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-8 md:pl-6 lg:pl-12">
              <figure>
                <blockquote className="text-pretty text-2xl font-medium leading-[1.3] tracking-[-0.025em] sm:text-[32px]">
                  &ldquo;Kept surfaced a note I wrote two years ago, and it solved a plot problem I had been stuck
                  on for a month.&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 text-[15px]">
                  <span className="h-px w-8 bg-(--k-accent)" aria-hidden />
                  <span className="font-medium">Aoife Brennan</span>
                  <span className="text-(--k-fg-3)">Novelist, working on her third book</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-6 border-t border-(--k-line) bg-(--k-surface-2)/50">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-8">
            <Reveal className="lg:col-span-4">
              <h2 className={sectionTitle}>Free on one device. $8 a month for all of them.</h2>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-8">
              <Reveal className={`${cell} flex flex-col bg-(--k-surface) p-6 sm:p-8`}>
                <h3 className="text-lg font-semibold">Free</h3>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-5xl font-semibold tracking-[-0.04em]">$0</span>
                </p>
                <p className="mt-2 text-[14px] text-(--k-fg-3)">For as long as you like</p>
                <ul className="mt-8 flex-1 space-y-3 text-[15px]">
                  {["Unlimited notes", "Links and backlinks", "One device, plus the web", "Plain Markdown files"].map(
                    (f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check size={17} weight="bold" className="mt-0.5 shrink-0 text-(--k-fg-3)" />
                        {f}
                      </li>
                    ),
                  )}
                </ul>
                <Cta href="#pricing" variant="secondary" className="mt-10 w-full">
                  Start free
                </Cta>
              </Reveal>

              <Reveal
                delay={0.08}
                className="relative flex flex-col rounded-[12px] border border-(--k-fg) bg-(--k-surface) p-6 shadow-(--k-shadow) sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Pro</h3>
                  <span className="rounded-full bg-(--k-accent-soft) px-2.5 py-1 text-[12px] font-medium text-(--k-accent-ink)">
                    Billed yearly
                  </span>
                </div>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-5xl font-semibold tracking-[-0.04em]">$8</span>
                  <span className="text-[15px] text-(--k-fg-3)">/ month</span>
                </p>
                <p className="mt-2 text-[14px] text-(--k-fg-3)">Everything in Free, and</p>
                <ul className="mt-8 flex-1 space-y-3 text-[15px]">
                  {["Sync across all your devices", "Ask your notes", "Version history"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={17} weight="bold" className="mt-0.5 shrink-0 text-(--k-accent-ink)" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Cta href="#pricing" className="mt-10 w-full">
                  Start free
                </Cta>
                <p className="mt-3 text-center text-[13px] text-(--k-fg-3)">Upgrade from the app when you need sync.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <Reveal className="k-dots flex flex-col gap-8 rounded-[12px] border border-(--k-line) bg-(--k-surface) px-6 py-12 sm:px-10 md:flex-row md:items-end md:justify-between md:py-16 lg:px-14">
            <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">
              Start with the note you&apos;re writing today.
            </h2>
            <Cta href="#pricing" className="self-start md:self-auto">
              Start free
            </Cta>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-(--k-line)">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-28 pt-10 text-[14px] text-(--k-fg-3) sm:px-6 md:flex-row md:items-center md:gap-10 lg:px-8">
          <span className="flex items-center gap-2 font-semibold text-(--k-fg)">
            <span aria-hidden className="size-3.5 rounded-[4px] bg-(--k-accent)" />
            Kept
          </span>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#features" className="hover:text-(--k-fg)">
              Features
            </a>
            <a href="#pricing" className="hover:text-(--k-fg)">
              Pricing
            </a>
            <a href="#top" className="hover:text-(--k-fg)">
              Privacy
            </a>
            <a href="#top" className="hover:text-(--k-fg)">
              Terms
            </a>
          </nav>
          <span>&copy; 2026 Kept</span>
        </div>
      </footer>
    </div>
    </MotionProvider>
  );
}
