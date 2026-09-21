import type { Metadata } from "next";
import Image from "next/image";
import { Geist } from "next/font/google";
import { Header } from "@/variants/with-taste-skill/grok-4.7/source/components/header";
import { BrandRow } from "@/variants/with-taste-skill/grok-4.7/source/components/brand-row";
import { EmailForm } from "@/variants/with-taste-skill/grok-4.7/source/components/email-form";
import { HeroEnter, Reveal } from "@/variants/with-taste-skill/grok-4.7/source/components/reveal";
import { primaryCta, secondaryCta } from "@/variants/with-taste-skill/grok-4.7/source/lib/cta";

const geist = Geist({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Instrument",
  description:
    "A quiet second brain. Capture a thought, link it, and find the sentence later.",
};

const links = [
  { href: "#notes", label: "Notes" },
  { href: "#plans", label: "Plans" },
];

export default function InstrumentPage() {
  return (
    <div className={`theme-instrument ${geist.className}`}>
      <Header links={links} />
      <main id="content">
        <section
          id="top"
          className="min-h-[100dvh] px-4 pt-20 md:px-8"
        >
          <div className="mx-auto grid max-w-[1400px] items-start gap-8 md:grid-cols-2">
            <div className="max-w-xl pt-4 md:pt-10">
              <HeroEnter>
                <h1 className="max-w-[12em] text-4xl leading-[1.05] tracking-tight md:text-5xl">
                  A second brain that stays close.
                </h1>
              </HeroEnter>
              <HeroEnter delay={0.08}>
                <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-[var(--muted)]">
                  Capture a thought, link it to an older note, and open that
                  sentence again later.
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
            <div className="relative h-[26dvh] min-h-40 overflow-hidden rounded-[var(--radius)] md:h-[calc(100dvh-6.5rem)]">
              <Image
                src="/variants/with-taste-skill/grok-4.7/images/one-hero.png"
                alt="Closed charcoal notebook and a blue pencil on a grey desk"
                fill
                priority
                loading="eager"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <h2 className="max-w-[18ch] text-3xl tracking-tight md:text-4xl">
                Bring an existing notebook.
              </h2>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[var(--muted)]">
                Halden reads the export and keeps the links you already made.
              </p>
            </Reveal>
            <Reveal delay={0.06} className="mt-10">
              <BrandRow />
            </Reveal>
          </div>
        </section>

        <section id="notes" className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <h2 className="max-w-[18ch] text-3xl tracking-tight md:text-5xl">
                What the notebook actually does.
              </h2>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[var(--muted)]">
                Links in both directions, a daily page, and search that opens
                on the sentence.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-4 md:grid-rows-2">
              <Reveal className="flex flex-col overflow-hidden rounded-[var(--radius)] bg-[var(--surface)] md:col-span-2 md:row-span-2">
                <div className="relative min-h-56 flex-1">
                  <Image
                    src="/variants/with-taste-skill/grok-4.7/images/one-cards.png"
                    alt="Blank index cards on a cool grey table"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl tracking-tight">Neighbors</h3>
                  <p className="mt-2 max-w-[36ch] text-base leading-relaxed text-[var(--muted)]">
                    A note lists the pages that cite it, and the pages it cites.
                  </p>
                </div>
              </Reveal>
              <Reveal
                delay={0.05}
                className="rounded-[var(--radius)] bg-[var(--surface)] p-6"
              >
                <h3 className="text-2xl tracking-tight">Capture</h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">
                  A shortcut from the app you are already in. The cursor stays
                  put.
                </p>
              </Reveal>
              <Reveal
                delay={0.08}
                className="rounded-[var(--radius)] bg-[var(--accent)] p-6 text-[var(--accent-fg)]"
              >
                <h3 className="text-2xl tracking-tight">Daily</h3>
                <p className="mt-2 text-base leading-relaxed">
                  Each morning starts blank, with links to yesterday&apos;s loose
                  ends.
                </p>
              </Reveal>
              <Reveal
                delay={0.1}
                className="rounded-[var(--radius)] bg-[var(--soft)] p-6"
              >
                <h3 className="text-2xl tracking-tight">Search</h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">
                  Results open on the sentence, not a list of file names.
                </p>
              </Reveal>
              <Reveal
                delay={0.12}
                className="rounded-[var(--radius)] bg-[var(--surface)] p-6"
              >
                <h3 className="text-2xl tracking-tight">On this device</h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">
                  Pages stay here until you choose to share a notebook.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-24">
          <Reveal className="mx-auto max-w-[1400px]">
            <blockquote className="max-w-[38ch] text-xl leading-snug tracking-tight md:text-3xl">
              “I stopped keeping quotes in a separate app. The interview and
              the line I need are in one thread.”
            </blockquote>
            <p className="mt-8 text-base font-medium">Amira Solano</p>
            <p className="text-sm text-[var(--muted)]">
              Research editor, Harbor Review
            </p>
          </Reveal>
        </section>

        <section id="plans" className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <h2 className="max-w-[16ch] text-3xl tracking-tight md:text-5xl">
                Two ways to keep a notebook.
              </h2>
              <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-[var(--muted)]">
                Solo is free on this device. Desk is for a team that shares one
                search.
              </p>
            </Reveal>
            <div className="mt-12 grid items-start gap-10 md:grid-cols-12">
              <Reveal className="md:col-span-4">
                <h3 className="text-3xl tracking-tight">Solo</h3>
                <p className="mt-3 text-4xl tracking-tight">$0</p>
                <p className="mt-4 max-w-[28ch] text-base leading-relaxed text-[var(--muted)]">
                  A private notebook on this device, with links and search.
                </p>
              </Reveal>
              <Reveal
                delay={0.06}
                className="rounded-[var(--radius)] bg-[var(--soft)] p-8 md:col-span-8 md:p-12"
              >
                <h3 className="text-3xl tracking-tight">Desk</h3>
                <p className="mt-3 text-4xl tracking-tight md:text-5xl">
                  $10 a month
                </p>
                <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-[var(--muted)]">
                  A shared notebook for a writing team, with one search across
                  it.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <footer id="start" className="border-t border-[var(--line)] px-4 py-16 pb-28 md:px-8">
          <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl tracking-tight md:text-5xl">
                Open a notebook today.
              </h2>
              <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-[var(--muted)]">
                Leave an email. This demo stores it in the browser and stops
                there.
              </p>
            </div>
            <EmailForm id="email-one" />
          </div>
        </footer>
      </main>
    </div>
  );
}
