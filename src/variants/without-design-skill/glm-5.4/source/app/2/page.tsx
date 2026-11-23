import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { ViewTransition, type ReactNode } from "react";
import { Icon } from "@/variants/without-design-skill/glm-5.4/source/components/icons";
import { plans, testimonials } from "@/variants/without-design-skill/glm-5.4/source/lib/content";
import styles from "./iter2.module.css";

// Gallery adaptation: next/font/local with the Latin file the original next/font/google build served, under a GLM 5.4
// family name, so other entries' same-named Google faces can't stand in for it (see docs/benchmarks/glm-5-4). Not preloaded:
// the gallery registry imports every entry, so a preload would fetch these on every gallery page.
const glm54NoSkillsInstrumentSerif2 = localFont({
  src: [
    { path: "../fonts/instrument-serif-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
  preload: false,
});

export const metadata: Metadata = { title: "Iteration 2 — Editorial" };

const nav = [
  { href: "#method", label: "Method" },
  { href: "#letters", label: "Letters" },
  { href: "#pricing", label: "Subscriptions" },
];

const chapters = [
  {
    numeral: "I",
    title: "Capture",
    body: "A note worth taking should take seconds. Axon keeps an open page for whatever crosses your mind — a sentence, a clipping, a recording from the walk home — and files it without asking where.",
    art: "cards",
  },
  {
    numeral: "II",
    title: "Connect",
    body: "Behind the page, Axon reads every entry and quietly draws the threads: this paragraph echoes a paper from March; this meeting belongs beside the pricing memo. Your archive becomes an argument.",
    art: "threads",
  },
  {
    numeral: "III",
    title: "Recall",
    body: "When you need it, ask in plain words. Axon answers from your own writing and cites the exact passage, so you can trust the memory and follow the thought back to its source.",
    art: "ask",
  },
] as const;

const cards = [
  {
    text: "“The faintest ink outlives the sharpest memory.”",
    meta: "Clipped · 14 May",
    className: styles.card1,
  },
  {
    text: "Call Lina about slow tools. She mentioned a thesis on attention.",
    meta: "Voice memo · 13 May",
    className: styles.card2,
  },
  {
    text: "Pricing page: anchor annual first, then show monthly.",
    meta: "Typed · 12 May",
    className: styles.card3,
  },
];

function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-10 ${className}`}>{children}</div>;
}

function Pill({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex h-12 items-center rounded-full bg-accent px-8 text-xs font-medium uppercase tracking-[0.2em] text-on-accent transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-accent-2"
    >
      {children}
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link href="/without-design-skill/glm-5.4/2" className="font-display text-3xl italic leading-none tracking-tight">
          Axon
        </Link>
        <nav aria-label="Primary" className="hidden gap-10 text-xs uppercase tracking-[0.22em] text-soft md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.underlineRust}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <a href="#" className="hidden text-xs uppercase tracking-[0.22em] sm:block">
            Sign in
          </a>
          <Pill href="#pricing">Begin writing</Pill>
        </div>
      </Container>
    </header>
  );
}

function Spread() {
  return (
    <div className={styles.spread} aria-label="An open notebook showing a note and its linked notes">
      <div className={`${styles.page} ${styles.pageLeft}`}>
        <p className="font-mono text-xs text-soft">Thursday, 14 May</p>
        <p className="mt-4 font-display text-[22px]">On forgetting</p>
        <p className="mt-4 text-[17px] text-ink/85">
          We forget on a curve, not all at once. The first review matters more than the
          tenth, and <em className="font-display text-[21px]">the right moment to return is just before the slip.</em>
        </p>
        <p className="mt-4 text-[17px] text-ink/85">Ask mode should cite the paragraph, not the page.</p>
      </div>
      <div className={`${styles.page} ${styles.pageRight}`}>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-soft">See also</p>
        <ul className="mt-4 font-display text-[22px]">
          <li>
            <a href="#" className={styles.underlineRust}>Spacing effect</a>
            <span className="ml-3 font-mono text-xs text-soft">8 links</span>
          </li>
          <li>
            <a href="#" className={styles.underlineRust}>Interview: Lina on tools</a>
            <span className="ml-3 font-mono text-xs text-soft">2 links</span>
          </li>
          <li>
            <a href="#" className={styles.underlineRust}>Reading: Kahneman</a>
            <span className="ml-3 font-mono text-xs text-soft">3 links</span>
          </li>
        </ul>
        <p className="mt-6 font-display text-xl italic text-accent-2">
          “What did I decide about asking for citations?”
        </p>
        <p className="mt-2 text-[15px] text-soft">
          You decided yes, on 12 May. Source: Product ideas.
        </p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="px-6 pb-24 pt-16 text-center lg:pb-32 lg:pt-24">
      <p className={`${styles.kicker} animate-rise font-mono text-xs uppercase tracking-[0.22em]`}>
        Vol. II · A second brain for people who read
      </p>
      <h1 className="animate-rise mx-auto mt-8 max-w-[16ch] font-display text-[clamp(3.5rem,10.5vw,10rem)] leading-[0.92] tracking-[-0.03em] [animation-delay:80ms]">
        A quieter place for your <em className="text-accent-2">loudest</em> ideas.
      </h1>
      <p className="animate-rise mx-auto mt-10 max-w-[46ch] text-lg leading-8 text-soft [animation-delay:160ms]">
        Axon keeps every note you take, finds the threads between them, and brings the right one
        back before you knew you needed it.
      </p>
      <div className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-8 [animation-delay:240ms]">
        <Pill href="#pricing">Start writing</Pill>
        <a href="#method" className={`${styles.link} text-xs uppercase tracking-[0.22em]`}>
          Read the method <Icon name="arrow-right" className="size-3.5" />
        </a>
      </div>
      <div className="animate-rise [animation-delay:320ms]">
        <Spread />
      </div>
    </section>
  );
}

function PullQuote() {
  const testimonial = testimonials[0];
  return (
    <section className="bg-accent text-on-accent">
      <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
        <blockquote className="font-display text-[clamp(2rem,4.6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] lg:col-span-9">
          “I had four thousand notes and no memory of any of them. Axon is the first tool that
          remembers <em>with</em> me.”
        </blockquote>
        <p className="font-mono text-xs uppercase leading-6 tracking-[0.2em] text-on-accent/75 lg:col-span-3 lg:self-end lg:text-right">
          {testimonial.name}
          <br />
          {testimonial.role}
        </p>
      </Container>
    </section>
  );
}

function CardsArt() {
  return (
    <div className={`${styles.fan} relative mx-auto flex max-w-xl flex-col gap-4 md:h-80 md:block`}>
      {cards.map((card) => (
        <div key={card.text} className={`${styles.card} ${card.className}`}>
          <p className="font-display text-[22px] leading-snug">{card.text}</p>
          <div className="mt-5 h-px bg-line" />
          <div className="mt-3 h-px bg-line" />
          <p className="mt-4 font-mono text-xs text-soft">{card.meta}</p>
        </div>
      ))}
    </div>
  );
}

function ThreadsArt() {
  return (
    <svg viewBox="0 0 520 320" className="mx-auto w-full max-w-xl" role="img" aria-label="Notes connected by threads">
      <path className={styles.edge} d="M110 80 C 170 80, 200 160, 225 160" />
      <path className={styles.edge} d="M410 80 C 350 80, 320 160, 295 160" />
      <path className={styles.edge} d="M105 245 C 160 245, 195 175, 225 170" />
      <path className={styles.edge} d="M415 245 C 360 245, 325 175, 295 170" />
      <path className={styles.edge} d="M260 60 L 260 135" />
      <path className={styles.edge} d="M150 70 C 220 20, 300 20, 370 70" />
      <path className={styles.edgeNew} d="M110 95 C 130 160, 110 200, 105 225" />
      <g fill="var(--surface)" stroke="var(--ink)">
        <circle cx="260" cy="160" r="26" strokeWidth="1.25" />
        <circle cx="110" cy="80" r="16" />
        <circle cx="410" cy="80" r="16" />
        <circle cx="105" cy="245" r="16" />
        <circle cx="415" cy="245" r="16" />
        <circle cx="260" cy="55" r="9" />
      </g>
      <circle cx="260" cy="160" r="5" fill="var(--ink)" />
      <text x="260" y="208" textAnchor="middle" className={styles.svgLabel}>
        Today: Pricing
      </text>
      <text x="110" y="44" textAnchor="middle" className={styles.svgLabel}>
        Interview: Lina
      </text>
      <text x="410" y="44" textAnchor="middle" className={styles.svgLabel}>
        Spacing effect
      </text>
      <text x="105" y="290" textAnchor="middle" className={styles.svgLabel}>
        Pricing memo
      </text>
      <text x="415" y="290" textAnchor="middle" className={styles.svgLabel}>
        On memory
      </text>
      <text x="260" y="30" textAnchor="middle" className={styles.svgLabel}>
        Berlin
      </text>
      <g fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent-2)">
        <rect x="118" y="150" width="78" height="20" fill="var(--surface)" stroke="var(--accent-2)" />
        <text x="157" y="164" textAnchor="middle">new link</text>
      </g>
    </svg>
  );
}

function AskArt() {
  return (
    <div className="mx-auto max-w-xl border border-line bg-surface p-8 lg:p-10">
      <p className="font-display text-[32px] italic leading-tight">
        “What did I learn about pricing in March?”
      </p>
      <div className="mt-8 h-px bg-line" />
      <p className="mt-6 text-[17px] leading-8 text-ink/85">
        You ran two pricing tests. The annual-first page converted 38% better, and you noted that
        anchoring on the yearly plan made monthly feel like an upgrade.
        <sup className={styles.cite}>1</sup>
        <sup className={styles.cite}>2</sup>
      </p>
      <ul className="mt-6 space-y-2 font-mono text-xs text-soft">
        <li>
          <span className="text-accent-2">1</span> Pricing teardown · 4 March
        </li>
        <li>
          <span className="text-accent-2">2</span> Founder notes · 18 March
        </li>
      </ul>
    </div>
  );
}

const art = { cards: CardsArt, threads: ThreadsArt, ask: AskArt };

function Method() {
  return (
    <section id="method" className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="flex items-end justify-between border-b border-line pb-6">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none">The method</h2>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-soft">Three chapters</p>
        </div>
        {chapters.map((chapter, i) => {
          const Art = art[chapter.art];
          return (
            <article
              key={chapter.numeral}
              className="grid gap-10 border-b border-line py-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-24"
            >
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <span className={`${styles.chapterNum} block`}>{chapter.numeral}</span>
                <h3 className="mt-6 font-display text-5xl leading-none">{chapter.title}</h3>
                <p className="mt-6 max-w-md text-[17px] leading-8 text-soft">{chapter.body}</p>
              </div>
              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <Art />
              </div>
            </article>
          );
        })}
      </Container>
    </section>
  );
}

function Letters() {
  return (
    <section id="letters" className="scroll-mt-24 border-t border-line bg-surface py-24 lg:py-32">
      <Container>
        <p className={`${styles.kicker} font-mono text-xs uppercase tracking-[0.22em]`}>From the letters</p>
        <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-10">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="border-t border-line pt-8">
              <blockquote className={`${styles.drop} font-display text-[26px] leading-[1.3]`}>
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="grid size-10 place-items-center rounded-full border border-line font-display text-lg italic">
                  {testimonial.initials}
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{testimonial.name}</span>
                  <span className="text-soft">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="text-center">
          <p className={`${styles.kicker} font-mono text-xs uppercase tracking-[0.22em]`}>Subscriptions</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]">
            Keep the archive going.
          </h2>
        </div>
        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-10 ${plan.featured ? "bg-accent text-on-accent" : "bg-canvas"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em]">{plan.name}</h3>
                {plan.featured && (
                  <span className="font-display text-lg italic text-on-accent/85">Most popular</span>
                )}
              </div>
              <p className="mt-8 font-display text-6xl leading-none tabular-nums">
                {plan.price}
                <span className={`ml-2 font-sans text-sm ${plan.featured ? "text-on-accent/70" : "text-soft"}`}>
                  {plan.period}
                </span>
              </p>
              <p className={`mt-6 text-[15px] leading-7 ${plan.featured ? "text-on-accent/85" : "text-soft"}`}>
                {plan.blurb}
              </p>
              <ul
                className={`mt-8 space-y-3 text-[15px] ${
                  plan.featured ? "divide-y divide-on-accent/15" : "divide-y divide-line"
                }`}
              >
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${
                        plan.featured ? "bg-on-accent/70" : "bg-accent-2"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-10 inline-flex h-12 items-center justify-center rounded-full text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                  plan.featured
                    ? "bg-accent-2 text-on-accent-2 hover:bg-canvas hover:text-ink"
                    : "border border-line hover:border-ink"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-line px-6 py-28 text-center lg:py-40">
      <p className={`${styles.kicker} font-mono text-xs uppercase tracking-[0.22em]`}>Begin today</p>
      <h2 className="mx-auto mt-8 max-w-[14ch] font-display text-[clamp(3.25rem,9vw,9rem)] leading-[0.92] tracking-[-0.03em]">
        Begin your <em className="text-accent-2">archive.</em>
      </h2>
      <p className="mx-auto mt-8 max-w-md text-lg leading-8 text-soft">
        Your first hundred pages are free. No card, no commitment, no lost notes.
      </p>
      <div className="mt-10">
        <Pill href="#pricing">Start writing</Pill>
      </div>
    </section>
  );
}

const footerColumns = [
  { title: "The journal", links: ["Features", "Method", "Changelog"] },
  { title: "The house", links: ["About", "Careers", "Press"] },
  { title: "The fine print", links: ["Privacy", "Terms", "Security"] },
];

function Footer() {
  return (
    <footer className="border-t border-line pb-28">
      <Container className="pt-16">
        <p className="font-display text-[clamp(5rem,20vw,19rem)] leading-[0.8] tracking-[-0.03em]">Axon</p>
        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <p className="max-w-xs text-[15px] leading-7 text-soft md:col-span-5">
            A second brain for people who read. Made with care in Copenhagen and Toronto.
          </p>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-soft">{column.title}</p>
                <ul className="mt-4 space-y-3 font-display text-xl">
                  {column.links.map((label) => (
                    <li key={label}>
                      <a href="#" className={styles.underlineRust}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-soft sm:flex-row sm:justify-between">
          <span>© 2026 Axon Labs</span>
          <span>Set in Instrument Serif and Geist · Design iteration 2 of 5</span>
        </div>
      </Container>
    </footer>
  );
}

export default function EditorialPage() {
  return (
    <ViewTransition name="iteration" share="auto" default="none">
      <div data-iteration="2" className={`${glm54NoSkillsInstrumentSerif2.variable} min-h-dvh bg-canvas font-sans text-ink`}>
        <Header />
        <main>
          <Hero />
          <PullQuote />
          <Method />
          <Letters />
          <Pricing />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </ViewTransition>
  );
}
