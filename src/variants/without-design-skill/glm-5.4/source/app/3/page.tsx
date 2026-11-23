import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import { Icon } from "@/variants/without-design-skill/glm-5.4/source/components/icons";
import { LogoMark } from "@/variants/without-design-skill/glm-5.4/source/components/logo";
import { features, logos, plans, stats, testimonials } from "@/variants/without-design-skill/glm-5.4/source/lib/content";
import { Graph } from "./graph";
import styles from "./iter3.module.css";

export const metadata: Metadata = { title: "Iteration 3 — Neural" };

const nav = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#", label: "Changelog" },
];

const footerColumns = [
  { title: "Product", links: ["Features", "Pricing", "Changelog", "Download"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "Status"] },
];

function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-10 ${className}`}>{children}</div>;
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/75 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/without-design-skill/glm-5.4/3" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
          <LogoMark className="rounded-lg bg-accent text-canvas" />
          axon
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-soft md:flex">
          {nav.map((item) => (
            <a key={item.label} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#pricing"
            className="hidden h-10 items-center px-3 text-sm font-medium text-soft transition-colors hover:text-ink sm:flex"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-semibold text-canvas transition-opacity hover:opacity-85"
          >
            Get started
          </a>
        </div>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[max(100svh,52rem)] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className={`${styles.grid} absolute inset-0`} />
        <div className="absolute left-1/2 top-[-10rem] h-[34rem] w-[64rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute bottom-[-6rem] right-[-6rem] h-[28rem] w-[40rem] rounded-full bg-accent-2/10 blur-[120px]" />
      </div>
      <Graph />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-28 text-center lg:pt-36">
        <div className="pointer-events-none absolute left-1/2 top-[34%] -z-10 h-[24rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-canvas/80 blur-3xl" />
        <p className="animate-rise rounded-full border border-line bg-surface/80 px-3 py-1 font-mono text-xs text-soft backdrop-blur">
          v2.0 · now with Ask
        </p>
        <h1 className="animate-rise mt-8 text-[clamp(3rem,8.5vw,7.75rem)] font-semibold leading-[0.95] tracking-[-0.055em] [animation-delay:80ms]">
          Your notes, <span className={styles.gradientText}>wired together.</span>
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-lg leading-8 text-soft [animation-delay:160ms]">
          Axon links every idea you save to everything you already know, so nothing you think
          is ever lost.
        </p>
        <div className="animate-rise mt-8 flex flex-wrap justify-center gap-3 [animation-delay:240ms]">
          <a
            href="#pricing"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-canvas transition-transform hover:-translate-y-0.5"
          >
            Start free <Icon name="arrow-right" className="size-4" />
          </a>
          <a
            href="#features"
            className="inline-flex h-12 items-center rounded-full border border-line bg-surface/60 px-6 text-sm font-medium text-ink backdrop-blur transition-colors hover:border-ink/40"
          >
            See what it does
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-canvas" />
    </section>
  );
}

function Logos() {
  return (
    <section className="border-y border-line">
      <Container className="flex flex-col items-center gap-6 py-10 lg:flex-row lg:justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-soft">
          Trusted by thinkers at
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-medium text-soft/80">
          {logos.map((logo) => (
            <li key={logo} className="transition-colors hover:text-ink">
              {logo}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function MiniGraph() {
  const nodes = [
    { x: 380, y: 150, label: "Meeting: pricing", r: 10, center: true },
    { x: 110, y: 70, label: "Pricing memo", r: 6, dx: 0, dy: 30 },
    { x: 650, y: 60, label: "Competitor notes", r: 6, dx: 0, dy: 30 },
    { x: 100, y: 240, label: "Founder notes", r: 6, dx: 0, dy: 30 },
    { x: 660, y: 245, label: "Annual vs monthly", r: 6, dx: 0, dy: 30 },
    { x: 380, y: 36, label: "March", r: 5, dx: 16, dy: 5 },
  ];
  const edges = [
    "M380 150 Q240 100 110 70",
    "M380 150 Q520 95 650 60",
    "M380 150 Q230 200 100 240",
    "M380 150 Q530 205 660 245",
    "M380 150 L380 36",
  ];
  return (
    <svg viewBox="0 0 760 300" className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="mini-edges" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {edges.map((d) => (
        <path key={d} d={d} stroke="url(#mini-edges)" strokeOpacity="0.45" fill="none" />
      ))}
      <path
        d="M110 70 Q380 340 660 245"
        stroke="var(--accent-2)"
        strokeDasharray="5 6"
        fill="none"
        className="animate-dash"
      />
      {nodes.map((node) => (
        <g key={node.label}>
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.center ? "url(#mini-edges)" : "var(--surface)"}
            stroke={node.center ? "none" : "var(--accent-2)"}
            strokeWidth="1.5"
          />
          <text
            x={node.x + (node.dx ?? 0)}
            y={node.y + (node.dy ?? 0)}
            textAnchor={node.dx ? "start" : "middle"}
            fontSize="13"
            fill="var(--soft)"
            fontFamily="var(--font-geist-sans)"
          >
            {node.label}
          </text>
        </g>
      ))}
      <rect
        x="330"
        y="236"
        width="100"
        height="24"
        rx="12"
        fill="var(--surface)"
        stroke="var(--accent-2)"
        strokeOpacity="0.5"
      />
      <text x="380" y="252" textAnchor="middle" fontSize="11" fill="var(--accent-2)" fontFamily="var(--font-geist-mono)">
        new link
      </text>
    </svg>
  );
}

function AskMock() {
  return (
    <div className="space-y-3 text-sm">
      <p className="ml-auto w-fit rounded-2xl rounded-br-md bg-accent/15 px-4 py-2.5 text-ink">
        What did I decide about pricing in March?
      </p>
      <div className="rounded-2xl rounded-tl-md border border-line bg-canvas p-4 leading-6 text-ink/85">
        You chose annual-first anchoring after two tests. It converted 38% better than
        monthly-first.
        <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-soft">
          <span className="rounded-md border border-line px-2 py-0.5">Pricing teardown</span>
          <span className="rounded-md border border-line px-2 py-0.5">Founder notes</span>
        </div>
        <p className={`${styles.caret} mt-3 text-accent-2`}>Summarise the two tests</p>
      </div>
    </div>
  );
}

function CaptureMock() {
  return (
    <div>
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-soft">
        <Icon name="pen" className="size-4 text-accent" />
        <span className={`${styles.caret} flex-1`}>Paste a link, drop a PDF, or just talk…</span>
        <Icon name="mic" className="size-4" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-soft">
        {["Link", "PDF", "Voice", "Email", "Screenshot"].map((kind) => (
          <span key={kind} className="rounded-md border border-line px-2 py-0.5">
            {kind}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs text-soft">
        Filed to <span className="text-accent-2">Ideas</span> · linked to 3 notes
      </p>
    </div>
  );
}

function ResurfaceMock() {
  const items = [
    ["Spacing effect", "last seen 12 days ago", true],
    ["Interview: Lina", "last seen 30 days ago", true],
    ["Pricing memo", "last seen 47 days ago", false],
  ];
  return (
    <ul className="space-y-2 text-sm">
      {items.map(([title, meta, done]) => (
        <li
          key={title as string}
          className={`flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 ${
            done ? "text-soft line-through decoration-accent/60" : "text-ink"
          }`}
        >
          <span
            className={`grid size-4 shrink-0 place-items-center rounded-full border ${
              done ? "border-accent bg-accent text-canvas" : "border-line"
            }`}
          >
            {done && <Icon name="check" className="size-3" strokeWidth={3} />}
          </span>
          <span className="flex-1 truncate">{title}</span>
          <span className="font-mono text-[11px] text-soft">{meta}</span>
        </li>
      ))}
    </ul>
  );
}

function YoursMock() {
  return (
    <div className="rounded-2xl border border-line bg-canvas p-4 font-mono text-xs leading-6">
      <p className="text-soft">
        <span className="text-accent-2">$</span> axon export --format markdown
      </p>
      <p className="text-ink/80">✓ 4,218 notes written to ~/axon</p>
      <p className="text-ink/80">✓ links and backlinks preserved</p>
      <p className="text-soft">
        <span className="text-accent">$</span> <span className={styles.caret} />
      </p>
    </div>
  );
}

function PaletteMock() {
  const rows = [
    ["Pricing teardown", "note"],
    ["Lina — interview", "note"],
    ["Berlin, March", "daily"],
    ["Ask: what changed?", "command"],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-canvas text-sm">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5 text-soft">
        <Icon name="search" className="size-4" />
        pri
        <span className={`${styles.caret} text-accent-2`} />
      </div>
      <ul>
        {rows.map(([title, kind], i) => (
          <li
            key={title}
            className={`flex items-center justify-between px-4 py-2.5 ${
              i === 0 ? "bg-accent/15 text-ink" : "text-soft"
            }`}
          >
            <span>{title}</span>
            <span className="font-mono text-[11px]">{kind}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bento({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <article className={`${styles.bento} flex flex-col rounded-3xl border border-line p-6 lg:p-8 ${className}`}>
      {children}
    </article>
  );
}

function BentoHead({ icon, title, blurb }: { icon: ReactNode; title: string; blurb: string }) {
  return (
    <div>
      <div className="grid size-10 place-items-center rounded-xl border border-line bg-canvas text-accent-2">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-md text-[15px] leading-7 text-soft">{blurb}</p>
    </div>
  );
}

function Features() {
  const [capture, connect, ask, resurface, yours, fast] = features;
  return (
    <section id="features" className="scroll-mt-20 py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Features</p>
          <h2 className="mt-4 text-[clamp(2rem,4.6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            Built to remember, not to organise.
          </h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Bento className="md:col-span-4">
            <BentoHead
              icon={<Icon name={connect.icon} className="size-5" />}
              title={connect.title}
              blurb={connect.blurb}
            />
            <div className="mt-8">
              <MiniGraph />
            </div>
          </Bento>
          <Bento className="md:col-span-2">
            <BentoHead
              icon={<Icon name={ask.icon} className="size-5" />}
              title={ask.title}
              blurb={ask.blurb}
            />
            <div className="mt-8">
              <AskMock />
            </div>
          </Bento>
          <Bento className="md:col-span-2">
            <BentoHead
              icon={<Icon name={capture.icon} className="size-5" />}
              title={capture.title}
              blurb={capture.blurb}
            />
            <div className="mt-8">
              <CaptureMock />
            </div>
          </Bento>
          <Bento className="md:col-span-2">
            <BentoHead
              icon={<Icon name={resurface.icon} className="size-5" />}
              title={resurface.title}
              blurb={resurface.blurb}
            />
            <div className="mt-8">
              <ResurfaceMock />
            </div>
          </Bento>
          <Bento className="md:col-span-2">
            <BentoHead
              icon={<Icon name={yours.icon} className="size-5" />}
              title={yours.title}
              blurb={yours.blurb}
            />
            <div className="mt-8">
              <YoursMock />
            </div>
          </Bento>
          <Bento className="md:col-span-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
            <BentoHead
              icon={<Icon name={fast.icon} className="size-5" />}
              title={fast.title}
              blurb={fast.blurb}
            />
            <div className="mt-8 lg:mt-0">
              <PaletteMock />
            </div>
          </Bento>
        </div>
      </Container>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-line">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-6 py-10 first:pl-0 lg:px-10 ${
                i % 2 === 1 ? "border-l border-line" : ""
              } ${i >= 2 ? "max-md:border-t max-md:border-line" : ""} ${i > 0 ? "md:border-l md:border-line" : ""}`}
            >
              <p className="font-mono text-4xl tracking-tight text-ink tabular-nums lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Quote() {
  const testimonial = testimonials[2];
  return (
    <section className="py-24 lg:py-32">
      <Container className="max-w-5xl">
        <div className="h-px w-24 bg-gradient-to-r from-accent to-accent-2" />
        <blockquote className="mt-10 text-[clamp(1.75rem,4vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.035em]">
          “{testimonial.quote}”
        </blockquote>
        <footer className="mt-10 flex items-center gap-4 text-sm">
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-semibold text-canvas">
            {testimonial.initials}
          </span>
          <div>
            <p className="font-medium">{testimonial.name}</p>
            <p className="text-soft">{testimonial.role}</p>
          </div>
        </footer>
      </Container>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 border-t border-line py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <h2 className="text-[clamp(2rem,4.6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            Simple pricing. No surprises.
          </h2>
          <p className="max-w-sm text-lg leading-8 text-soft">
            Start free. Upgrade when your brain outgrows the inbox.
          </p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-3xl border border-line p-8 lg:p-10 ${
                plan.featured ? styles.featured : "bg-surface"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-soft">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[11px] text-accent">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-[-0.04em] tabular-nums">{plan.price}</span>
                <span className="text-sm text-soft">{plan.period}</span>
              </p>
              <p className="mt-4 text-[15px] leading-7 text-soft">{plan.blurb}</p>
              <ul className="mt-8 space-y-3 text-sm">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Icon name="check" className="size-4 shrink-0 text-accent-2" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-10 inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold transition-opacity hover:opacity-85 ${
                  plan.featured ? "bg-ink text-canvas" : "border border-line text-ink hover:opacity-100 hover:border-ink/40"
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
    <section className="relative overflow-hidden border-t border-line px-6 py-28 text-center lg:py-40">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <h2 className="text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
        Give your ideas <span className={styles.gradientText}>somewhere to connect.</span>
      </h2>
      <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-soft">
        Free for your first hundred notes. No card required.
      </p>
      <a
        href="#pricing"
        className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-canvas transition-transform hover:-translate-y-0.5"
      >
        Start free <Icon name="arrow-right" className="size-4" />
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line pb-28">
      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/without-design-skill/glm-5.4/3" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
              <LogoMark className="rounded-lg bg-accent text-canvas" />
              axon
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-soft">
              Your second brain, in your own words. Made with care in Copenhagen and Toronto.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-soft">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
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
        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-soft sm:flex-row sm:justify-between">
          <span>© 2026 Axon Labs</span>
          <span>Design iteration 3 of 5 — Neural</span>
        </div>
      </Container>
    </footer>
  );
}

export default function NeuralPage() {
  return (
    <ViewTransition name="iteration" share="auto" default="none">
      <div data-iteration="3" className="min-h-dvh bg-canvas font-sans text-ink">
        <Header />
        <main>
          <Hero />
          <Logos />
          <Features />
          <Stats />
          <Quote />
          <Pricing />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </ViewTransition>
  );
}
