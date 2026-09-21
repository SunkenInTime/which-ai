import type { Metadata } from "next";
import Image from "next/image";
import { Outfit } from "next/font/google";
import { Header } from "@/variants/with-taste-skill/grok-4.7/source/components/header";
import { EmailForm } from "@/variants/with-taste-skill/grok-4.7/source/components/email-form";
import { NoteMarquee } from "@/variants/with-taste-skill/grok-4.7/source/components/note-marquee";
import { HeroEnter, Reveal } from "@/variants/with-taste-skill/grok-4.7/source/components/reveal";
import { primaryCta, secondaryCta } from "@/variants/with-taste-skill/grok-4.7/source/lib/cta";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Field",
  description:
    "A field notebook that still connects when you get back to the desk.",
};

const links = [
  { href: "#week", label: "Week" },
  { href: "#notes", label: "Notes" },
];

const moves = [
  {
    title: "Capture",
    body: "Write the scrap before it cools. Halden files it on today's page.",
  },
  {
    title: "Relate",
    body: "Draw a link to the note that made you write this one.",
  },
  {
    title: "Return",
    body: "Search lands on the sentence, with the links still attached.",
  },
];

export default function FieldPage() {
  return (
    <div className={`theme-field ${outfit.className}`}>
      <Header links={links} />
      <main id="content">
        <section id="top" className="min-h-[100dvh] px-4 pt-20 md:px-8">
          <div className="mx-auto grid max-w-[1400px] items-start gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="relative order-2 h-[28dvh] min-h-44 md:order-1 md:h-[calc(100dvh-6.5rem)]">
              <Image
                src="/variants/with-taste-skill/grok-4.7/images/two-hero.png"
                alt="Green cloth notebook on a mossy stump"
                fill
                priority
                loading="eager"
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 max-w-xl pt-4 md:order-2 md:pt-16">
              <HeroEnter>
                <h1 className="max-w-[14em] text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                  Think on paper. Keep the thread.
                </h1>
              </HeroEnter>
              <HeroEnter delay={0.08}>
                <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-[var(--muted)]">
                  A field notebook for research that still connects when you
                  get back to the desk.
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
          </div>
        </section>

        <NoteMarquee />

        <section className="px-4 py-16 md:px-8 md:py-28">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <h2 className="max-w-[16ch] text-3xl tracking-tight md:text-5xl">
                The whole loop is three moves.
              </h2>
            </Reveal>
            <div className="mt-12 flex max-w-2xl flex-col gap-10">
              {moves.map((move, index) => (
                <Reveal key={move.title} delay={index * 0.06}>
                  <h3 className="text-4xl tracking-tight">{move.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-[var(--muted)]">
                    {move.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1400px] items-center gap-10 md:grid-cols-2">
            <Reveal>
              <blockquote className="max-w-[38ch] text-xl leading-snug tracking-tight md:text-3xl">
                “I write while I walk, and the desk still has the thread when I
                sit down.”
              </blockquote>
              <p className="mt-8 text-base font-medium">Jonah Veld</p>
              <p className="text-sm text-[var(--muted)]">
                Staff writer, North Line
              </p>
            </Reveal>
            <Reveal className="relative h-[48dvh] min-h-64">
              <Image
                src="/variants/with-taste-skill/grok-4.7/images/two-path.png"
                alt="Person in a green coat walking a wet forest path, face turned away"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>

        <section id="notes" className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <h2 className="max-w-[14ch] text-3xl tracking-tight md:text-5xl">
                Where a week of research goes.
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
              <Reveal className="relative min-h-72">
                <Image
                  src="/variants/with-taste-skill/grok-4.7/images/two-path.png"
                  alt="Person in a green coat walking a wet forest path, face turned away"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </Reveal>
              <Reveal className="flex flex-col justify-end bg-[var(--surface)] p-8">
                <h3 className="text-3xl tracking-tight">Reading</h3>
                <p className="mt-3 max-w-[32ch] text-base leading-relaxed text-[var(--muted)]">
                  Keep a source next to the claim it supports.
                </p>
              </Reveal>
              <Reveal className="flex flex-col justify-end bg-[var(--soft)] p-8">
                <h3 className="text-3xl tracking-tight">Meetings</h3>
                <p className="mt-3 max-w-[32ch] text-base leading-relaxed text-[var(--muted)]">
                  A scrap from a call lands on the daily page.
                </p>
              </Reveal>
              <Reveal className="flex flex-col justify-end bg-[var(--accent)] p-8 text-[var(--accent-fg)]">
                <h3 className="text-3xl tracking-tight">Recall</h3>
                <p className="mt-3 max-w-[32ch] text-base leading-relaxed">
                  Ask for a sentence you wrote last month.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <footer
          id="start"
          className="border-t border-[var(--line)] px-4 py-16 pb-28 md:px-8"
        >
          <div className="mx-auto max-w-xl">
            <h2 className="text-3xl tracking-tight md:text-5xl">
              Take the notebook outside.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Leave an email. This demo stores it in the browser and stops
              there.
            </p>
            <div className="mt-8">
              <EmailForm id="email-two" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
