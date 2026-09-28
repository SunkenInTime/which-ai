import { ArrowRight, Check, Stack } from "@phosphor-icons/react/ssr";
import { CaptureDemo } from "./_components/capture-demo";
import { FeatureTabs } from "./_components/feature-tabs";
import { Reveal } from "./_components/reveal";

const LOGOS = [
  { slug: "figma", name: "Figma" },
  { slug: "stripe", name: "Stripe" },
  { slug: "linear", name: "Linear" },
  { slug: "spotify", name: "Spotify" },
  { slug: "mozilla", name: "Mozilla" },
  { slug: "github", name: "GitHub" },
];

const PLAN_FREE = ["Up to 200 notes", "Web clipper", "Automatic links"];
const PLAN_PRO = ["Unlimited notes", "Ask your notes", "Weekly review", "Sync on every device"];

const focus =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--c-accent)";
const primary = `inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-(--c-accent) px-6 text-[15px] font-medium text-(--c-on-accent) transition-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${focus}`;
const secondary = `inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-(--c-line) px-6 text-[15px] font-medium transition-colors hover:bg-(--c-surface-2) active:scale-[0.98] ${focus}`;

export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-(--c-bg) text-(--c-fg)">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className={`flex items-center gap-2 rounded-full text-[19px] font-semibold tracking-[-0.02em] ${focus}`}>
          <Stack size={22} weight="fill" className="text-(--c-accent-ink)" />
          Cairn
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 text-[15px] text-(--c-fg-2) md:flex">
          <a href="#try" className="transition-colors hover:text-(--c-fg)">Try it</a>
          <a href="#features" className="transition-colors hover:text-(--c-fg)">Features</a>
          <a href="#pricing" className="transition-colors hover:text-(--c-fg)">Pricing</a>
        </nav>
        <a href="#pricing" className={`${primary} h-9 px-4 text-[14px]`}>Start free</a>
      </header>

      <main id="top">
        {/* Hero: asymmetric split, real photo */}
        <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 md:pb-24 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-12">
          <div className="lg:col-span-6">
            <Reveal immediate>
              <h1 className="text-[42px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[68px]">
                Your notes, connected before you ask.
              </h1>
            </Reveal>
            <Reveal immediate delay={0.08}>
              <p className="mt-6 max-w-[46ch] text-[18px] leading-relaxed text-(--c-fg-2)">
                Cairn links every note you save to the ones that matter, then brings them back while you write.
              </p>
            </Reveal>
            <Reveal immediate delay={0.16} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#pricing" className={primary}>
                Start free <ArrowRight size={16} weight="bold" />
              </a>
              <a href="#try" className={secondary}>Try it below</a>
            </Reveal>
          </div>
          <Reveal immediate delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <div className="relative lg:ml-auto lg:max-w-[560px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/cairn-desk-notebook-window-light/1120/1200"
                alt="A desk by a window with an open notebook and a pen"
                width={1120}
                height={1200}
                fetchPriority="high"
                className="aspect-[14/15] w-full rounded-[14px] object-cover"
              />
            </div>
          </Reveal>
        </section>

        {/* Logo wall, under the hero */}
        <section aria-label="Used by people at" className="border-y border-(--c-line)">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-9 sm:px-6 md:flex-row md:items-center md:gap-12 lg:px-8">
            <p className="shrink-0 text-[15px] text-(--c-fg-3)">Used by people at</p>
            <ul className="grid flex-1 grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-6">
              {LOGOS.map((l) => (
                <li key={l.slug} className="flex justify-center md:justify-start">
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

        {/* Interactive demo */}
        <section id="try" className="mx-auto grid grid-cols-[minmax(0,1fr)] max-w-7xl scroll-mt-4 gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <Reveal className="min-w-0 lg:col-span-5">
            <h2 className="text-[34px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[44px]">
              Type a thought. See its neighbors.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-(--c-fg-2)">
              This is the real behavior, on a small sample library. Edit the note and the links change with it.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="min-w-0 lg:col-span-7">
            <CaptureDemo />
          </Reveal>
        </section>

        {/* Features as tabs */}
        <section id="features" className="border-t border-(--c-line) bg-(--c-surface)">
          <div className="mx-auto max-w-7xl scroll-mt-4 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <Reveal className="mb-12 max-w-2xl">
              <h2 className="text-[34px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[44px]">
                Save fast. Find everything.
              </h2>
            </Reveal>
            <FeatureTabs />
          </div>
        </section>

        {/* Quotes: one large, two small */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="min-w-0 lg:col-span-7">
              <blockquote className="text-[28px] font-medium leading-[1.2] tracking-[-0.03em] sm:text-[36px]">
                “I stopped organizing. I write things down, and Cairn shows me where they belong.”
              </blockquote>
              <p className="mt-6 text-[15px] text-(--c-fg-2)">Ingrid Halvorsen, product researcher at Lumen Health</p>
            </Reveal>
            <div className="grid content-start gap-10 lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.08}>
                <blockquote className="text-[18px] leading-relaxed">
                  “My thesis notes finally talk to each other.”
                </blockquote>
                <p className="mt-3 text-[15px] text-(--c-fg-2)">Tomás Reyes, PhD candidate in linguistics</p>
              </Reveal>
              <Reveal delay={0.14}>
                <blockquote className="text-[18px] leading-relaxed">
                  “Friday review is the only planning ritual I have kept.”
                </blockquote>
                <p className="mt-3 text-[15px] text-(--c-fg-2)">Amara Okafor, magazine editor</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t border-(--c-line) bg-(--c-surface-2)">
          <div className="mx-auto max-w-7xl scroll-mt-4 px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <h2 className="text-[34px] font-medium leading-[1.05] tracking-[-0.035em] sm:text-[44px]">
              Free to start. $8 a month when you want more.
            </h2>
            <div className="mt-12 grid gap-4 lg:grid-cols-12">
              <div className="rounded-[14px] border border-(--c-line) bg-(--c-bg) p-7 lg:col-span-5">
                <h3 className="text-[20px] font-medium">Free</h3>
                <ul className="mt-5 grid gap-3 text-[15px] text-(--c-fg-2)">
                  {PLAN_FREE.map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <Check size={16} weight="bold" className="text-(--c-accent-ink)" />
                      {x}
                    </li>
                  ))}
                </ul>
                <a href="#top" className={`${secondary} mt-8`}>Start free</a>
              </div>
              <div className="rounded-[14px] bg-(--c-accent) p-7 text-(--c-on-accent) lg:col-span-7">
                <h3 className="text-[20px] font-medium">Pro</h3>
                <p className="mt-1 text-[15px]">$8 a month, billed yearly</p>
                <ul className="mt-5 grid gap-3 text-[15px] sm:grid-cols-2">
                  {PLAN_PRO.map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <Check size={16} weight="bold" />
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  href="#top"
                  className="mt-8 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-(--c-on-accent) px-6 text-[15px] font-medium text-[#eef3f0] transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--c-on-accent)"
                >
                  Start free
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-[14px] text-(--c-fg-3) sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Cairn. Notes that connect.</p>
        <nav aria-label="Footer" className="flex gap-6">
          <a href="#top" className="hover:text-(--c-fg)">Privacy</a>
          <a href="#top" className="hover:text-(--c-fg)">Terms</a>
          <a href="#top" className="hover:text-(--c-fg)">Contact</a>
        </nav>
      </footer>
    </div>
  );
}
