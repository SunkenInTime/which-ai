import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { ViewTransition, type ReactNode } from "react";
import { Icon } from "@/variants/without-design-skill/glm-5.4/source/components/icons";
import { LogoMark } from "@/variants/without-design-skill/glm-5.4/source/components/logo";
import { features, plans, steps, testimonials } from "@/variants/without-design-skill/glm-5.4/source/lib/content";
import styles from "./iter4.module.css";

// Gallery adaptation: next/font/local with the Latin file the original next/font/google build served, under a GLM 5.4
// family name, so other entries' same-named Google faces can't stand in for it (see docs/benchmarks/glm-5-4). Not preloaded:
// the gallery registry imports every entry, so a preload would fetch these on every gallery page.
const glm54NoSkillsNunito = localFont({
  src: "../fonts/nunito-normal.woff2",
  variable: "--font-page",
  preload: false,
  weight: "200 1000",
  style: "normal",
});
const glm54NoSkillsCaveat = localFont({
  src: "../fonts/caveat-normal.woff2",
  variable: "--font-hand",
  preload: false,
  weight: "400 700",
  style: "normal",
});

export const metadata: Metadata = { title: "Iteration 4 — Playful" };

const nav = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

const cardColors = ["#ffb3d4", "#a9dcff", "#cdf58a", "#ffd08a", "#b9f1de", "#d9c9ff"];
const stickers = ["So easy", "The magic", "New!", null, "Yours", "Zippy"];
const ticker = ["Capture", "Connect", "Recall", "Ask", "Sync", "Export"];

const starPoints = Array.from({ length: 28 }, (_, i) => {
  const r = i % 2 === 0 ? 50 : 41;
  const a = (i / 28) * Math.PI * 2;
  return `${(50 + r * Math.sin(a)).toFixed(2)},${(50 - r * Math.cos(a)).toFixed(2)}`;
}).join(" ");

function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-10 ${className}`}>{children}</div>;
}

function Brain({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M22.4 49.1 Q22.9 35.1 40 32.3 Q51.4 20.6 67 28.5 Q84.7 25.9 90.6 39.4 Q104 53.8 97.6 70.9 Q97.1 84.9 80 87.7 Q68.6 99.4 53 91.5 Q35.4 94.2 29.4 80.6 Q16 66.3 22.4 49.1 Z"
        fill="var(--accent)"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M44 34 C40 44 48 48 46 54 M76 32 C72 42 80 46 78 52 M38 76 C44 81 50 79 54 85"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="50" cy="61" r="3.6" fill="var(--ink)" />
      <circle cx="72" cy="61" r="3.6" fill="var(--ink)" />
      <path d="M55 72 Q61 78 67 72" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="41" cy="69" r="4" fill="var(--accent-2)" opacity="0.75" />
      <circle cx="81" cy="69" r="4" fill="var(--accent-2)" opacity="0.75" />
    </svg>
  );
}

function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 70" className={className} aria-hidden="true">
      <path
        d="M8 64 C 10 38, 30 16, 72 10"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeDasharray="7 7"
        strokeLinecap="round"
      />
      <path d="M58 4 L75 9 L68 26" fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Starburst({ children }: { children: ReactNode }) {
  return (
    <span className="relative grid h-28 w-28 rotate-12 place-items-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
        <polygon points={starPoints} fill="var(--accent)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      <span className="relative -rotate-12 text-center text-sm font-black leading-tight">{children}</span>
    </span>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-canvas/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/without-design-skill/glm-5.4/4" className="flex items-center gap-2.5 text-2xl font-black tracking-tight">
          <LogoMark className="rounded-xl bg-ink text-accent" />
          axon
        </Link>
        <nav aria-label="Primary" className="hidden gap-9 text-[17px] font-extrabold md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={styles.squiggle}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a href="#" className="hidden text-[17px] font-extrabold sm:block">
            Log in
          </a>
          <a href="#pricing" className={styles.btn}>
            Get Axon free
          </a>
        </div>
      </Container>
    </header>
  );
}

function AppWindow() {
  const linked = ["Spacing effect", "Lina interview", "Pricing memo"];
  return (
    <div className={`${styles.card} overflow-hidden bg-surface`}>
      <div className="flex items-center justify-between border-b-[3px] border-ink bg-canvas px-5 py-3">
        <div className="flex items-center gap-2">
          {["var(--accent)", "var(--accent-2)", "#cdf58a"].map((color) => (
            <span key={color} className="size-4 rounded-full border-[3px] border-ink" style={{ background: color }} />
          ))}
        </div>
        <span className="text-sm font-extrabold">axon · Tuesday</span>
        <span className="rounded-md border-[3px] border-ink bg-surface px-2 py-0.5 font-mono text-xs font-bold">⌘K</span>
      </div>
      <div className="p-6 lg:p-8">
        <p className="font-hand text-2xl leading-none text-soft">9:41 am · on the train</p>
        <h3 className="mt-2 text-3xl font-black tracking-tight">Ideas for the launch</h3>
        <p className="mt-4 text-[17px] leading-7 font-semibold text-ink/80">
          What if the graph showed <mark className="rounded-sm bg-accent px-1">time as depth</mark>? Older
          notes sink, new ones float to the top.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {linked.map((label, i) => (
            <span
              key={label}
              className={`rounded-full border-[3px] border-ink px-3 py-1 text-sm font-extrabold ${
                i === 1 ? "rotate-2 bg-accent" : i === 2 ? "-rotate-2 bg-accent-2" : "rotate-1 bg-[#cdf58a]"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-canvas px-4 py-3 text-[15px] font-bold text-soft">
          <Icon name="sparkles" className="size-5 text-ink" />
          Ask your notes anything…
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className={`${styles.dots} absolute inset-0 -z-10`} />
      <Container className="grid gap-14 pb-32 pt-16 lg:grid-cols-12 lg:items-center lg:pb-36 lg:pt-24">
        <div className="animate-rise lg:col-span-6">
          <span className={styles.sticker}>
            <Icon name="sparkles" className="size-4" /> New: Ask mode is here
          </span>
          <h1 className="mt-7 text-balance text-[clamp(3rem,7.5vw,6.75rem)] font-black leading-[0.94] tracking-[-0.045em]">
            Stop losing your <span className={styles.splash}>best ideas!</span>
          </h1>
          <p className="mt-7 max-w-lg text-xl leading-8 font-semibold text-soft">
            Axon is the notebook that remembers for you. Jot anything down and it sorts, links and
            brings it back before you forget it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href="#pricing" className={styles.btn}>
              Get Axon free <Icon name="arrow-right" className="size-5" />
            </a>
            <a href="#how" className={`text-lg font-extrabold ${styles.squiggle}`}>
              See it in action
            </a>
          </div>
          <p className="mt-10 -rotate-2 font-hand text-[26px] leading-none text-ink">
            Free for your first 100 notes. No card needed, promise.
          </p>
        </div>
        <div className="animate-rise relative lg:col-span-6 [animation-delay:120ms]">
          <span className="absolute -left-3 -top-7 z-10 rotate-[-8deg] rounded-lg border-[3px] border-ink bg-accent px-3 py-1 font-hand text-2xl leading-none">
            hi, I&apos;m Axon!
          </span>
          <Brain className="absolute -right-3 -top-16 z-10 w-36 rotate-12" />
          <AppWindow />
          <div className="absolute -bottom-24 left-2 flex items-end gap-2 lg:-left-10">
            <DoodleArrow className="w-20 shrink-0 -rotate-[24deg]" />
            <p className="-rotate-2 font-hand text-[26px] leading-tight text-ink">
              it links your notes for you!
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <section aria-label="What Axon does" className="overflow-hidden border-y-[3px] border-ink bg-ink py-4 text-white">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-6 pr-6 text-2xl font-black uppercase tracking-tight">
            {i % 2 === 0 ? item : <span className="text-accent">{item}</span>}
            <Icon name="star" className="size-5 fill-accent-2 text-accent-2" />
          </span>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-hand text-3xl text-soft">all the good stuff</p>
          <h2 className="mt-2 text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[0.98] tracking-[-0.04em]">
            Everything your brain wishes it had.
          </h2>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <article
              key={feature.id}
              className={`${styles.card} relative p-7 ${i % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"}`}
              style={{ background: cardColors[i] }}
            >
              {stickers[i] && (
                <span
                  className="absolute -top-5 right-6 rotate-6 rounded-full border-[3px] border-ink px-3 py-1 text-sm font-black shadow-[3px_3px_0_0_var(--ink)]"
                  style={{ background: i % 2 === 0 ? "var(--surface)" : "var(--accent)" }}
                >
                  {stickers[i]}
                </span>
              )}
              <span className="grid size-14 place-items-center rounded-2xl border-[3px] border-ink bg-surface">
                <Icon name={feature.icon} className="size-7" />
              </span>
              <h3 className="mt-6 text-2xl font-black tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-[17px] leading-7 font-semibold text-ink/75">{feature.blurb}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 border-y-[3px] border-ink bg-surface/60 py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-hand text-3xl text-soft">ready? it&apos;s three steps</p>
          <h2 className="mt-2 text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[0.98] tracking-[-0.04em]">
            How it works
          </h2>
        </div>
        <ol className="relative mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          <DoodleArrow className="absolute left-[calc(33.3%-2.25rem)] top-[40%] hidden w-24 rotate-[100deg] md:block" />
          <DoodleArrow className="absolute left-[calc(66.6%-2.25rem)] top-[40%] hidden w-24 rotate-[100deg] md:block" />
          {steps.map((step, i) => (
            <li
              key={step.title}
              className={`${styles.note} ${i % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"}`}
              style={{ background: ["#ffe56a", "#c7f2ff", "#ffd0e4"][i] }}
            >
              <span className="font-hand text-5xl leading-none text-ink">{i + 1}.</span>
              <h3 className="mt-3 text-3xl font-black tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[17px] leading-7 font-semibold text-ink/80">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-hand text-3xl text-soft">people love it</p>
          <h2 className="mt-2 text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[0.98] tracking-[-0.04em]">
            Brains are raving.
          </h2>
        </div>
        <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial, i) => (
            <figure
              key={testimonial.name}
              className={`${styles.bubble} ${styles.card} relative bg-surface p-7 ${i === 1 ? "rotate-[1.5deg]" : "rotate-[-1.5deg]"}`}
            >
              <blockquote className="text-lg leading-7 font-bold">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="grid size-11 place-items-center rounded-full border-[3px] border-ink font-black"
                  style={{ background: cardColors[i * 2] }}
                >
                  {testimonial.initials}
                </span>
                <span>
                  <span className="block font-black">{testimonial.name}</span>
                  <span className="text-sm font-semibold text-soft">{testimonial.role}</span>
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
    <section id="pricing" className="scroll-mt-24 pb-24 lg:pb-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-hand text-3xl text-soft">no sneaky stuff</p>
          <h2 className="mt-2 text-[clamp(2.25rem,5.5vw,5rem)] font-black leading-[0.98] tracking-[-0.04em]">
            Pick your plan
          </h2>
        </div>
        <div className="mt-20 grid gap-10 lg:grid-cols-3 lg:items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${styles.card} relative p-8 ${plan.featured ? "bg-ink text-white lg:-mt-6 lg:mb-6" : "bg-surface"}`}
            >
              {plan.featured && (
                <span className="absolute -top-12 right-0 lg:-right-6">
                  <Starburst>Most popular!</Starburst>
                </span>
              )}
              <h3 className="text-lg font-black uppercase tracking-wide">{plan.name}</h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-6xl font-black tracking-[-0.04em] tabular-nums">{plan.price}</span>
                <span className={`text-sm font-bold ${plan.featured ? "text-white/70" : "text-soft"}`}>
                  {plan.period}
                </span>
              </p>
              <p className={`mt-4 text-[15px] leading-7 font-semibold ${plan.featured ? "text-white/80" : "text-soft"}`}>
                {plan.blurb}
              </p>
              <ul className="mt-6 space-y-3 font-bold">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full border-[3px] border-current ${
                        plan.featured ? "bg-accent text-ink" : "bg-[#cdf58a]"
                      }`}
                    >
                      <Icon name="check" className="size-3.5" strokeWidth={3.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#" className={`${styles.btn} ${styles.btnWhite} mt-8 w-full`}>
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
        <div className="relative overflow-hidden rounded-[2.5rem] border-[3px] border-ink bg-ink px-6 py-20 text-white shadow-[10px_10px_0_0_var(--accent)] lg:px-20">
          <div className={`${styles.dots} absolute inset-0 opacity-20`} />
          <Brain className="absolute -right-4 -top-9 w-28 rotate-12 lg:-right-2 lg:-top-12 lg:w-72" />
          <div className="relative max-w-2xl pt-20 lg:pt-0">
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.95] tracking-[-0.04em]">
              Give your brain a <span className="text-accent">best friend.</span>
            </h2>
            <p className="mt-6 max-w-lg text-xl leading-8 font-semibold text-white/80">
              Start with 100 free notes and see how it feels to never lose a thought.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href="#pricing" className={styles.btn}>
                Get Axon free <Icon name="arrow-right" className="size-5" />
              </a>
              <span className="font-hand text-2xl text-white/90">seriously, it&apos;s free</span>
            </div>
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
    <footer className="border-t-[3px] border-ink pb-28">
      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/without-design-skill/glm-5.4/4" className="flex items-center gap-2.5 text-2xl font-black tracking-tight">
              <LogoMark className="rounded-xl bg-ink text-accent" />
              axon
            </Link>
            <p className="mt-4 max-w-xs text-[15px] leading-7 font-semibold text-soft">
              Your second brain, in your own words. Made with care in Copenhagen and Toronto.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="font-hand text-2xl leading-none text-soft">{column.title}</p>
                <ul className="mt-4 space-y-3 text-[15px] font-bold">
                  {column.links.map((label) => (
                    <li key={label}>
                      <a href="#" className={styles.squiggleHover}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t-[3px] border-ink pt-6 font-bold text-sm text-soft sm:flex-row sm:justify-between">
          <span>© 2026 Axon Labs</span>
          <span className="font-hand text-2xl leading-none">Design iteration 4 of 5 — Playful</span>
        </div>
      </Container>
    </footer>
  );
}

export default function PlayfulPage() {
  return (
    <ViewTransition name="iteration" share="auto" default="none">
      <div
        data-iteration="4"
        className={`${glm54NoSkillsCaveat.variable} ${glm54NoSkillsNunito.variable} min-h-dvh bg-canvas font-bold text-ink [font-family:var(--font-page)]`}
      >
        <Header />
        <main>
          <Hero />
          <Ticker />
          <Features />
          <HowItWorks />
          <Testimonials />
          <Pricing />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </ViewTransition>
  );
}
