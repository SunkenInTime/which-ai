import type { Metadata } from "next";
import Image from "next/image";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Header } from "@/variants/with-taste-skill/grok-4.7/source/components/header";
import { BrandRow } from "@/variants/with-taste-skill/grok-4.7/source/components/brand-row";
import { EmailForm } from "@/variants/with-taste-skill/grok-4.7/source/components/email-form";
import { HeroEnter, Reveal } from "@/variants/with-taste-skill/grok-4.7/source/components/reveal";
import { primaryCta, secondaryCta } from "@/variants/with-taste-skill/grok-4.7/source/lib/cta";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-note-mono",
});

export const metadata: Metadata = {
  title: "Graph",
  description: "Backlinks, a daily page, and a graph you can read at night.",
};

const links = [
  { href: "#notes", label: "Note" },
  { href: "#map", label: "Map" },
];

const stops = [
  {
    title: "Backlink",
    body: "The page that mentioned this one is one click away.",
    tone: "surface",
  },
  {
    title: "Daily page",
    body: "Today starts empty. Loose ends from yesterday sit at the top.",
    tone: "soft",
  },
  {
    title: "Source",
    body: "A clipped paragraph stays attached to the claim you wrote.",
    tone: "image",
  },
  {
    title: "Graph",
    body: "See which notes share a source, without a second window.",
    tone: "accent",
  },
];

export default function GraphPage() {
  return (
    <div className={`theme-graph ${plex.className} ${mono.variable}`}>
      <Header links={links} />
      <main id="content">
        <section id="top" className="relative min-h-[100dvh]">
          <Image
            src="/variants/with-taste-skill/grok-4.7/images/three-hero.png"
            alt="Desk lamp, index cards, and a teal cup in a dark study"
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative flex min-h-[100dvh] items-end px-4 pt-20 pb-24 md:px-8 md:pb-20">
            <div className="max-w-xl bg-[var(--bg)] p-6 md:p-10">
              <HeroEnter>
                <h1 className="max-w-[14em] text-4xl leading-[1.05] tracking-tight md:text-5xl">
                  Every note knows its neighbors.
                </h1>
              </HeroEnter>
              <HeroEnter delay={0.08}>
                <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-[var(--muted)]">
                  Backlinks, a daily page, and a graph you can read at the end
                  of the night.
                </p>
              </HeroEnter>
              <HeroEnter delay={0.16} className="mt-6 flex flex-wrap gap-3">
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

        <section id="notes" className="px-4 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-[1400px] items-start gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Reveal>
              <h2 className="max-w-[16ch] text-3xl tracking-tight md:text-5xl">
                A link is a sentence, not a tag.
              </h2>
              <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-[var(--muted)]">
                Point at the line that matters. Halden keeps that line attached
                when the source moves.
              </p>
            </Reveal>
            <Reveal className="bg-[var(--surface)] p-6 md:p-8">
              <p className="font-[family-name:var(--font-note-mono)] text-sm text-[var(--muted)]">
                12 March
              </p>
              <h3 className="mt-4 text-2xl tracking-tight">
                Salt and the night train
              </h3>
              <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[var(--muted)]">
                The dock master said the salt smell arrives before the engine.
                Keep this next to the line about attention.
              </p>
              <p className="mt-8 text-sm">
                Linked to{" "}
                <span className="underline decoration-[var(--line)] underline-offset-4">
                  Line about attention
                </span>
              </p>
            </Reveal>
          </div>
        </section>

        <section id="map" className="py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <Reveal>
              <h2 className="max-w-[14ch] text-3xl tracking-tight md:text-5xl">
                Four stops on the map.
              </h2>
            </Reveal>
          </div>
          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:px-8">
            {stops.map((stop) => (
              <article
                key={stop.title}
                className={`w-[78vw] shrink-0 snap-start md:w-[26rem] ${
                  stop.tone === "accent"
                    ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                    : stop.tone === "soft"
                      ? "bg-[var(--soft)]"
                      : "bg-[var(--surface)]"
                }`}
              >
                {stop.tone === "image" ? (
                  <div className="relative h-48">
                    <Image
                      src="/variants/with-taste-skill/grok-4.7/images/three-threads.png"
                      alt="Index cards connected by teal thread on a black table"
                      fill
                      sizes="26rem"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <h3 className="text-3xl tracking-tight">{stop.title}</h3>
                  <p
                    className={`mt-3 max-w-[30ch] text-base leading-relaxed ${
                      stop.tone === "accent" ? "" : "text-[var(--muted)]"
                    }`}
                  >
                    {stop.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-24">
          <Reveal className="mx-auto max-w-[1400px]">
            <blockquote className="max-w-[38ch] text-xl leading-snug tracking-tight md:text-3xl">
              “I can see which interview a paragraph came from without opening
              a second app.”
            </blockquote>
            <p className="mt-8 text-base font-medium">Nia Okonkwo</p>
            <p className="text-sm text-[var(--muted)]">
              Product counsel, Sable and Wren
            </p>
          </Reveal>
        </section>

        <section className="px-4 py-16 md:px-8">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-2xl tracking-tight">
              Bring an existing notebook.
            </h2>
            <div className="mt-8">
              <BrandRow />
            </div>
          </div>
        </section>

        <footer
          id="start"
          className="border-t border-[var(--line)] px-4 py-16 pb-28 md:px-8"
        >
          <div className="mx-auto max-w-[1400px] md:max-w-lg md:mr-auto">
            <h2 className="text-3xl tracking-tight md:text-5xl">
              Read the graph tonight.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Leave an email. This demo stores it in the browser and stops
              there.
            </p>
            <div className="mt-8">
              <EmailForm id="email-three" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
