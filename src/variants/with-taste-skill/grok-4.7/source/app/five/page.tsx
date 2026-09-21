import type { Metadata } from "next";
import Image from "next/image";
import { Schibsted_Grotesk } from "next/font/google";
import { Header } from "@/variants/with-taste-skill/grok-4.7/source/components/header";
import { EmailForm } from "@/variants/with-taste-skill/grok-4.7/source/components/email-form";
import { ThreadPan } from "@/variants/with-taste-skill/grok-4.7/source/components/thread-pan";
import { MagneticLink } from "@/variants/with-taste-skill/grok-4.7/source/components/magnetic-link";
import { HeroEnter, Reveal } from "@/variants/with-taste-skill/grok-4.7/source/components/reveal";
import { secondaryCta } from "@/variants/with-taste-skill/grok-4.7/source/lib/cta";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thread",
  description:
    "Follow one research thread from the source to the page you ship.",
};

const links = [{ href: "#thread", label: "Thread" }];

const panels = [
  {
    src: "/variants/with-taste-skill/grok-4.7/images/five-source.png",
    alt: "Printed pages with a rust pencil on a concrete surface",
    title: "Source",
    body: "The harbor report, clipped to the page you are writing.",
  },
  {
    src: "/variants/with-taste-skill/grok-4.7/images/five-question.png",
    alt: "Two grey cards pinned to a slate wall",
    title: "Question",
    body: "What arrives before the train is visible?",
  },
  {
    src: "/variants/with-taste-skill/grok-4.7/images/five-source.png",
    alt: "Printed pages with a rust pencil on a concrete surface",
    title: "Note",
    body: "The salt smell arrives before the engine. That sentence stays attached.",
  },
  {
    src: "/variants/with-taste-skill/grok-4.7/images/five-return.png",
    alt: "Hands closing a grey notebook on a concrete desk",
    title: "Return",
    body: "The lede still points at the sentence you started with.",
  },
];

export default function ThreadPage() {
  return (
    <div className={`theme-thread ${grotesk.className}`}>
      <Header links={links} />
      <main id="content">
        <section id="top" className="flex min-h-[100dvh] flex-col px-4 pt-20 md:px-8">
          <div className="mx-auto w-full max-w-[1400px] pt-2">
            <HeroEnter>
              <h1 className="max-w-[14em] text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                A desk for unfinished thinking.
              </h1>
            </HeroEnter>
            <HeroEnter delay={0.08}>
              <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-[var(--muted)]">
                Pin a source, branch a question, and return to the sentence
                that started the thread.
              </p>
            </HeroEnter>
            <HeroEnter delay={0.16} className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticLink href="#start">Start writing</MagneticLink>
              <a href="#thread" className={secondaryCta}>
                See a sample
              </a>
            </HeroEnter>
          </div>
          <div className="relative mx-auto mt-8 h-[30dvh] w-full max-w-[1400px] min-h-36 flex-1">
            <Image
              src="/variants/with-taste-skill/grok-4.7/images/five-hero.png"
              alt="Grey notebook and rust cloth on a concrete table"
              fill
              priority
              loading="eager"
              sizes="(min-width: 768px) 90vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <section id="thread" className="pt-16 md:pt-24">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <Reveal>
              <h2 className="max-w-[16ch] text-3xl tracking-tight md:text-5xl">
                Follow one harbor thread.
              </h2>
              <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-[var(--muted)]">
                The note moves from the source to the page you ship.
              </p>
            </Reveal>
          </div>
          <div className="mt-8">
            <ThreadPan panels={panels} />
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-24">
          <Reveal className="mx-auto max-w-[1400px] bg-[var(--soft)] p-6 md:p-14">
            <blockquote className="max-w-[38ch] text-xl leading-snug tracking-tight md:text-3xl">
              “I can leave a question open for a month and still find the
              sentence that posed it.”
            </blockquote>
            <p className="mt-8 text-base font-medium">Priya Raman</p>
            <p className="text-sm text-[var(--muted)]">
              Documentary producer, Glass Kiln
            </p>
          </Reveal>
        </section>

        <footer
          id="start"
          className="border-t border-[var(--line)] px-4 py-16 pb-28 md:px-8"
        >
          <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="max-w-[14ch] text-3xl tracking-tight md:text-5xl">
                Keep the relationship between pages.
              </h2>
              <p className="mt-4 max-w-[38ch] text-base leading-relaxed text-[var(--muted)]">
                You write. Halden remembers which note made this one possible.
              </p>
            </div>
            <EmailForm id="email-five" />
          </div>
        </footer>
      </main>
    </div>
  );
}
