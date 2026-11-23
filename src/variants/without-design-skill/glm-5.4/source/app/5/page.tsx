import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { ViewTransition, type ReactNode } from "react";
import { Icon } from "@/variants/without-design-skill/glm-5.4/source/components/icons";
import { LogoMark } from "@/variants/without-design-skill/glm-5.4/source/components/logo";
import { features, plans, testimonials } from "@/variants/without-design-skill/glm-5.4/source/lib/content";
import styles from "./iter5.module.css";

// Gallery adaptation: next/font/local with the Latin file the original next/font/google build served, under a GLM 5.4
// family name, so other entries' same-named Google faces can't stand in for it (see docs/benchmarks/glm-5-4). Not preloaded:
// the gallery registry imports every entry, so a preload would fetch these on every gallery page.
const glm54NoSkillsManrope = localFont({
  src: "../fonts/manrope-normal.woff2",
  variable: "--font-page",
  preload: false,
  weight: "200 800",
  style: "normal",
});
const glm54NoSkillsInstrumentSerif5 = localFont({
  src: [
    { path: "../fonts/instrument-serif-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-display",
  preload: false,
});

export const metadata: Metadata = { title: "Iteration 5 — Calm" };

const nav = [
  { href: "#features", label: "Features" },
  { href: "#day", label: "A day with Axon" },
  { href: "#pricing", label: "Pricing" },
];

const tints = [styles.tintMint, styles.tintPeach, styles.tintSky, styles.tintLilac, styles.tintPeach, styles.tintMint];

const day = [
  {
    time: "9:04",
    title: "Capture",
    body: "A voice memo from the walk in. Axon transcribes it, files it under Ideas and finds three related notes.",
  },
  {
    time: "11:30",
    title: "Connect",
    body: "While you write, a quiet suggestion appears: this paragraph echoes something you saved in March.",
  },
  {
    time: "15:12",
    title: "Ask",
    body: "Before the meeting, you ask what you decided about pricing. The answer arrives with two sources.",
  },
  {
    time: "21:30",
    title: "Resurface",
    body: "One note comes back tonight, the one you would have forgotten by Friday. You read it. It stays.",
  },
];

function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-10 ${className}`}>{children}</div>;
}

function Header() {
  return (
    <div className="sticky top-4 z-40 flex justify-center px-4">
      <header className={`${styles.glass} flex h-14 w-full max-w-3xl items-center justify-between rounded-full pl-4 pr-2`}>
        <Link href="/without-design-skill/glm-5.4/5" className="flex items-center gap-2 text-[17px] font-extrabold tracking-tight">
          <LogoMark className="rounded-full bg-accent text-white" />
          axon
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-semibold text-soft md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <a href="#" className="hidden h-9 items-center px-3 text-sm font-semibold text-soft transition-colors hover:text-ink sm:flex">
            Log in
          </a>
          <a
            href="#pricing"
            className="inline-flex h-9 items-center rounded-full bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-[#26685a]"
          >
            Start free
          </a>
        </div>
      </header>
    </div>
  );
}

function AppWindow() {
  const notebooks = [
    ["Inbox", "#e98a6a", "12"],
    ["Journal", "#2e7d6b", ""],
    ["Reading", "#4a8fc2", ""],
    ["Projects", "#8a6cc0", "3"],
  ];
  const connected = [
    ["Spacing effect", "echoes paragraph 2"],
    ["Walk notes, April", "same idea"],
    ["Lina on tools", "quoted here"],
  ];
  return (
    <div className={`${styles.window} overflow-hidden rounded-[2rem]`}>
      <div className="flex items-center justify-between border-b border-line/70 px-5 py-3">
        <div className="flex items-center gap-1.5">
          {["#f4b8a4", "#f6dfa0", "#bfe3cf"].map((color) => (
            <span key={color} className="size-3 rounded-full" style={{ background: color }} />
          ))}
        </div>
        <span className="text-sm font-semibold text-soft">axon · today</span>
        <span className="rounded-md bg-ink/5 px-2 py-0.5 font-mono text-xs text-soft">⌘K</span>
      </div>
      <div className="grid lg:grid-cols-[190px_minmax(0,1fr)_260px]">
        <aside className="hidden border-r border-line/70 p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-soft">Notebooks</p>
          <ul className="mt-4 space-y-1 text-sm font-medium">
            {notebooks.map(([name, color, count]) => (
              <li
                key={name}
                className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 ${
                  name === "Journal" ? "bg-white/80 text-ink" : "text-soft"
                }`}
              >
                <span className="size-2 rounded-full" style={{ background: color }} />
                <span className="flex-1">{name}</span>
                {count && <span className="font-mono text-xs text-soft">{count}</span>}
              </li>
            ))}
          </ul>
        </aside>
        <div className="p-6 lg:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-soft">Morning pages · Tuesday</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight lg:text-[28px]">Attention is a place</h3>
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-ink/80 lg:text-base lg:leading-8">
            <p>
              Today I keep coming back to the idea that attention is <em className={styles.serif}>a place you can visit</em>,
              not a thing you spend.
            </p>
            <p>The walk helped. So did not opening anything with a feed on it.</p>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Icon name="link" className="size-3.5" />
            Linked to 3 notes while you wrote
          </div>
        </div>
        <aside className="border-t border-line/70 p-5 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-soft">Connected</p>
          <ul className="mt-4 space-y-2">
            {connected.map(([title, meta]) => (
              <li key={title} className="rounded-2xl bg-white/70 px-3.5 py-3">
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-soft">{meta}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/70 px-3.5 py-2.5 text-sm text-soft">
            <Icon name="sparkles" className="size-4 text-accent" />
            Ask Axon anything
          </div>
        </aside>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className={`${styles.aurora} absolute inset-0 -z-10`}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>
      <Container className="flex flex-col items-center pb-24 pt-20 text-center lg:pb-32 lg:pt-28">
        <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-3.5 py-1.5 text-sm font-semibold text-soft backdrop-blur">
          <span className={`${styles.dot} size-2 rounded-full bg-accent`} />
          Offline-first, end-to-end encrypted
        </p>
        <h1 className="animate-rise mt-8 max-w-[15ch] text-[clamp(3rem,8vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.05em] [animation-delay:80ms]">
          A second brain that feels like a <span className={styles.serif}>deep breath.</span>
        </h1>
        <p className="animate-rise mt-7 max-w-xl text-lg leading-8 text-soft [animation-delay:160ms]">
          Axon quietly links every note you take, brings the right one back when you need it and
          never asks you to organise anything.
        </p>
        <div className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-4 [animation-delay:240ms]">
          <a
            href="#pricing"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-[15px] font-semibold text-white shadow-[0_18px_36px_-16px_rgba(46,125,107,0.7)] transition-transform hover:-translate-y-0.5"
          >
            Start free <Icon name="arrow-right" className="size-4" />
          </a>
          <a
            href="#features"
            className="inline-flex h-12 items-center rounded-full border border-ink/10 bg-white/60 px-7 text-[15px] font-semibold backdrop-blur transition-colors hover:border-ink/30"
          >
            See how it feels
          </a>
        </div>
        <div className="animate-rise relative mt-20 w-full [animation-delay:320ms]">
          <div className="absolute -inset-x-10 -bottom-16 -z-10 h-40 rounded-[100%] bg-accent/15 blur-3xl" />
          <AppWindow />
        </div>
      </Container>
    </section>
  );
}

function Trust() {
  return (
    <section>
      <Container className="flex flex-col items-center gap-4 pb-8 text-center">
        <div className="flex -space-x-2.5">
          {["MC", "DO", "SM", "JL", "AP"].map((initials, i) => (
            <span
              key={initials}
              className="grid size-10 place-items-center rounded-full border-2 border-canvas text-xs font-bold text-ink"
              style={{ background: ["#fbe0d3", "#d8ecdf", "#dbe9f6", "#e9e2f6", "#f6dcb0"][i] }}
            >
              {initials}
            </span>
          ))}
        </div>
        <p className="text-sm font-semibold text-soft">
          Loved by <span className="text-ink">48,000+ thinkers</span> · 4.9 average rating
        </p>
      </Container>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-28 py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Features</p>
          <h2 className="mt-4 text-[clamp(2rem,4.6vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            Gentle on you. <span className={styles.serif}>Ruthless</span> about your ideas.
          </h2>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <article key={feature.id} className={`${styles.softCard} rounded-[1.75rem] p-7`}>
              <span className={`grid size-12 place-items-center rounded-2xl ${tints[i]}`}>
                <Icon name={feature.icon} className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-soft">{feature.blurb}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Day() {
  return (
    <section id="day" className="scroll-mt-28 pb-24 lg:pb-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">A day with Axon</p>
          <h2 className="mt-4 text-[clamp(2rem,4.6vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            It works in the <span className={styles.serif}>background.</span> You stay in your day.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-soft">
            No folders to maintain, no tags to remember. Axon does the remembering so you can do
            the thinking.
          </p>
        </div>
        <ol className="relative space-y-8 lg:col-span-7 lg:mt-4">
          <span className={`${styles.spine} absolute bottom-6 left-[1.4rem] top-6 w-0.5`} aria-hidden="true" />
          {day.map((moment) => (
            <li key={moment.time} className="relative grid grid-cols-[2.75rem_1fr] gap-5">
              <span className={`${styles.dot} relative mt-1 grid size-6 place-items-center rounded-full bg-accent`}>
                <span className="size-2 rounded-full bg-white" />
              </span>
              <div>
                <p className="font-mono text-xs text-soft">{moment.time}</p>
                <h3 className="mt-1 text-xl font-bold tracking-tight">{moment.title}</h3>
                <p className="mt-1.5 text-[15px] leading-7 text-soft">{moment.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Testimonial() {
  const [first, second, third] = testimonials;
  return (
    <section className="py-24 lg:py-32">
      <Container className="max-w-4xl text-center">
        <figure>
          <blockquote className={`${styles.serif} text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.2] text-ink`}>
            “{first.quote}”
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-[#fbe0d3] text-xs font-bold">{first.initials}</span>
            <span className="text-left">
              <span className="block text-sm font-bold">{first.name}</span>
              <span className="block text-sm text-soft">{first.role}</span>
            </span>
          </figcaption>
        </figure>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {[second, third].map((testimonial, i) => (
            <figure key={testimonial.name} className={`${styles.softCard} rounded-[1.5rem] p-6 text-left`}>
              <blockquote className="text-[15px] leading-7 text-ink/85">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-sm">
                <span
                  className="grid size-9 place-items-center rounded-full text-xs font-bold"
                  style={{ background: ["#d8ecdf", "#dbe9f6"][i] }}
                >
                  {testimonial.initials}
                </span>
                <span>
                  <span className="block font-bold">{testimonial.name}</span>
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
    <section id="pricing" className="scroll-mt-28 pb-24 lg:pb-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Pricing</p>
          <h2 className="mt-4 text-[clamp(2rem,4.6vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            Simple, like a <span className={styles.serif}>clear desk.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[1.75rem] p-8 ${
                plan.featured ? `${styles.pro} lg:-mt-4 lg:p-9` : `${styles.softCard}`
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em]">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Most popular</span>
                )}
              </div>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-[-0.04em] tabular-nums">{plan.price}</span>
                <span className={`text-sm ${plan.featured ? "text-white/70" : "text-soft"}`}>{plan.period}</span>
              </p>
              <p className={`mt-4 text-[15px] leading-7 ${plan.featured ? "text-white/80" : "text-soft"}`}>{plan.blurb}</p>
              <ul className={`mt-7 space-y-3 text-[15px] font-medium ${plan.featured ? "text-white" : "text-ink"}`}>
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className={`grid size-5 shrink-0 place-items-center rounded-full ${plan.featured ? "bg-white/15" : "bg-accent/10 text-accent"}`}>
                      <Icon name="check" className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  plan.featured ? "bg-white text-accent" : "bg-ink/5 text-ink hover:bg-ink/10"
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
    <section className="pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-20 text-center text-white lg:px-20">
          <div className={`${styles.aurora} absolute inset-0`}>
            <div className={`${styles.blob} ${styles.glowTeal}`} />
            <div className={`${styles.blob} ${styles.glowPeach}`} />
          </div>
          <div className="relative">
            <h2 className="text-[clamp(2.25rem,5.5vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
              Clear mind. <span className={styles.serif}>Everything remembered.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-white/75">
              Free for your first hundred notes. No card required.
            </p>
            <a
              href="#pricing"
              className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Start free <Icon name="arrow-right" className="size-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

const footerColumns = [
  { title: "Product", links: ["Features", "Pricing", "Changelog", "Download"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "Status"] },
];

function Footer() {
  return (
    <footer className="border-t border-line/80 pb-28">
      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/without-design-skill/glm-5.4/5" className="flex items-center gap-2 text-[17px] font-extrabold tracking-tight">
              <LogoMark className="rounded-full bg-accent text-white" />
              axon
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-soft">
              Your second brain, in your own words. Made with care in Copenhagen and Toronto.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-soft">{column.title}</p>
                <ul className="mt-4 space-y-3 text-sm font-medium">
                  {column.links.map((label) => (
                    <li key={label}>
                      <a href="#" className="transition-colors hover:text-soft">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-line/80 pt-6 text-sm text-soft sm:flex-row sm:justify-between">
          <span>© 2026 Axon Labs</span>
          <span>Design iteration 5 of 5 — Calm</span>
        </div>
      </Container>
    </footer>
  );
}

export default function CalmPage() {
  return (
    <ViewTransition name="iteration" share="auto" default="none">
      <div
        data-iteration="5"
        className={`${glm54NoSkillsInstrumentSerif5.variable} ${glm54NoSkillsManrope.variable} min-h-dvh bg-canvas text-ink [font-family:var(--font-page)]`}
      >
        <Header />
        <main>
          <Hero />
          <Trust />
          <Features />
          <Day />
          <Testimonial />
          <Pricing />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </ViewTransition>
  );
}
