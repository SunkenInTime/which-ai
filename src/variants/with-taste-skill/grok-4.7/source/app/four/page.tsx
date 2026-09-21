import type { Metadata } from "next";
import Image from "next/image";
import { Sora } from "next/font/google";
import { Header } from "@/variants/with-taste-skill/grok-4.7/source/components/header";
import { EmailForm } from "@/variants/with-taste-skill/grok-4.7/source/components/email-form";
import { HeroEnter, Reveal } from "@/variants/with-taste-skill/grok-4.7/source/components/reveal";
import { primaryCta, secondaryCta } from "@/variants/with-taste-skill/grok-4.7/source/lib/cta";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Studio",
  description:
    "File the scrap, the quote, and the decision in the same place.",
};

const links = [
  { href: "#week", label: "Week" },
  { href: "#notes", label: "Notes" },
];

const days = [
  {
    title: "Monday interview",
    body: "The dock master scrap, filed before the wording fades.",
    image: true,
  },
  {
    title: "Thursday lede",
    body: "The opening paragraph sits next to the quotes that support it.",
    image: false,
  },
  {
    title: "Friday gaps",
    body: "Three questions still open, each linked to the note that posed it.",
    image: false,
  },
  {
    title: "Sunday reread",
    body: "You return to the sentence that started the week.",
    image: false,
  },
];

export default function StudioPage() {
  return (
    <div className={`theme-studio ${sora.className}`}>
      <Header links={links} />
      <main id="content">
        <section id="top" className="min-h-[100dvh] px-4 pt-20 md:px-8">
          <div className="mx-auto grid max-w-[1400px] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
            <div className="max-w-xl pt-4 lg:pt-8">
              <HeroEnter>
                <h1 className="max-w-[14em] text-4xl leading-[1.05] tracking-tight md:text-5xl">
                  Write once. Find it in context.
                </h1>
              </HeroEnter>
              <HeroEnter delay={0.08}>
                <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-[var(--muted)]">
                  Halden files the scrap, the quote, and the decision in the
                  same place you will look.
                </p>
              </HeroEnter>
              <HeroEnter delay={0.16} className="mt-8 flex flex-wrap gap-3">
                <a href="#start" className={primaryCta}>
                  Start writing
                </a>
                <a href="#notes" className={secondaryCta}>
                  See a sample
                </a>
              </HeroEnter>
            </div>
            <div className="relative h-[26dvh] min-h-40 overflow-hidden rounded-[var(--radius)] lg:h-[calc(100dvh-7rem)] lg:translate-x-4">
              <Image
                src="/variants/with-taste-skill/grok-4.7/images/four-hero.png"
                alt="Open blue notebook and a chrome lamp on a grey desk"
                fill
                priority
                loading="eager"
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section id="week" className="py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <Reveal>
              <h2 className="max-w-[16ch] text-3xl tracking-tight md:text-5xl">
                A week in one notebook.
              </h2>
              <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-[var(--muted)]">
                Flick through four days. Each one still points at the others.
              </p>
            </Reveal>
          </div>
          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:px-8">
            {days.map((day, index) => (
              <article
                key={day.title}
                className={`w-[80vw] shrink-0 snap-start overflow-hidden rounded-[var(--radius)] md:w-[24rem] ${
                  index === 1 ? "bg-[var(--soft)]" : "bg-[var(--surface)]"
                }`}
              >
                {day.image ? (
                  <div className="relative h-44">
                    <Image
                      src="/variants/with-taste-skill/grok-4.7/images/four-row.png"
                      alt="Grey and cobalt notebooks lined up on a pale table"
                      fill
                      sizes="24rem"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <h3 className="text-2xl tracking-tight">{day.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-base leading-relaxed text-[var(--muted)]">
                    {day.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="notes" className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <h2 className="max-w-[16ch] text-3xl tracking-tight md:text-5xl">
                Three kinds of page.
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-5">
              <Reveal className="overflow-hidden rounded-[var(--radius)] bg-[var(--surface)] md:col-span-3 md:row-span-2">
                <div className="relative h-64 md:h-80">
                  <Image
                    src="/variants/with-taste-skill/grok-4.7/images/four-row.png"
                    alt="Grey and cobalt notebooks lined up on a pale table"
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl tracking-tight">Read later</h3>
                  <p className="mt-2 max-w-[36ch] text-base leading-relaxed text-[var(--muted)]">
                    Sources wait beside the claim they are meant to support.
                  </p>
                </div>
              </Reveal>
              <Reveal className="rounded-[var(--radius)] bg-[var(--soft)] p-6 md:col-span-2">
                <h3 className="text-2xl tracking-tight">Meetings</h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">
                  A scrap lands on the daily page before the wording slips.
                </p>
              </Reveal>
              <Reveal className="rounded-[var(--radius)] bg-[var(--accent)] p-6 text-[var(--accent-fg)] md:col-span-2">
                <h3 className="text-2xl tracking-tight">Decisions</h3>
                <p className="mt-2 text-base leading-relaxed">
                  The choice and the note that justified it stay linked.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-24">
          <Reveal className="mx-auto max-w-[1400px]">
            <blockquote className="max-w-[38ch] text-xl leading-snug tracking-tight md:text-3xl">
              “We stopped pasting quotes into a document we never reopen.”
            </blockquote>
            <p className="mt-8 text-base font-medium">Ellis Marchetti</p>
            <p className="text-sm text-[var(--muted)]">
              Graduate advisor, Calder Institute
            </p>
          </Reveal>
        </section>

        <footer
          id="start"
          className="px-4 py-16 pb-28 md:px-8"
        >
          <div className="mx-auto max-w-[1400px] rounded-[var(--radius)] bg-[var(--soft)] px-6 py-10 md:px-12 md:py-14">
            <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] md:items-end">
              <h2 className="text-3xl tracking-tight md:text-5xl">
                Put the week in one place.
              </h2>
              <EmailForm id="email-four" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
