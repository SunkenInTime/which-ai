import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import { Icon } from "@/variants/without-design-skill/glm-5.4/source/components/icons";
import { faqs, features, plans, stats, steps, testimonials } from "@/variants/without-design-skill/glm-5.4/source/lib/content";
import styles from "./iter1.module.css";

export const metadata: Metadata = { title: "Iteration 1 — Minimal" };

const nav = [
  { href: "#features", label: "Product" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const footerColumns = [
  { title: "Product", links: ["Features", "Pricing", "Changelog", "Download"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "Status"] },
];

function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 lg:px-10 ${className}`}>{children}</div>;
}

function Logo() {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-ink text-accent">
      <svg
        viewBox="0 0 16 16"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="3" cy="3.5" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="13" cy="4" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="12" cy="13" r="1.3" fill="currentColor" stroke="none" />
        <path d="M4 4.6 6.5 6.8M12 5.2 9.8 7M11.2 12.2 9.4 9.8" />
      </svg>
    </span>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/without-design-skill/glm-5.4/1" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
          <Logo />
          axon
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-soft md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#pricing"
            className="hidden h-10 items-center px-3 text-sm font-medium text-soft transition-colors hover:text-ink sm:flex"
          >
            Log in
          </a>
          <a
            href="#pricing"
            className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-ink/85"
          >
            Get started
          </a>
        </div>
      </Container>
    </header>
  );
}

function AppWindow() {
  const linked = [
    ["Spacing effect", "8 links"],
    ["Interview: Lina on tools", "2 links"],
    ["On memory and forgetting", "3 links"],
  ];
  const notebooks = ["Inbox", "Daily notes", "Reading", "People", "Ideas"];

  return (
    <div className="border border-line bg-surface shadow-[0_50px_100px_-50px_rgba(20,20,20,0.35)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full border border-line" />
          ))}
        </div>
        <span className="font-mono text-xs text-soft">axon — today</span>
        <span className="font-mono text-xs text-soft">⌘K</span>
      </div>
      <div className="grid lg:grid-cols-[200px_minmax(0,1fr)_300px]">
        <aside className="hidden border-r border-line p-4 lg:block">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-soft">Notebooks</p>
          <ul className="mt-4 space-y-1 text-sm">
            {notebooks.map((name, i) => (
              <li
                key={name}
                className={`flex justify-between rounded-md px-2 py-1.5 ${
                  i === 4 ? "bg-canvas font-medium text-ink" : "text-soft"
                }`}
              >
                {name}
                {i === 0 && <span className="font-mono text-xs">12</span>}
              </li>
            ))}
          </ul>
        </aside>
        <div className="p-6 lg:p-10">
          <p className="font-mono text-xs text-soft">Tuesday 14 May · 9:41</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">Product ideas</h3>
          <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/80 lg:text-base lg:leading-8">
            <p>
              What if the graph showed <span className={styles.mark}>time as depth</span>, so older
              notes sink and recent ones float to the top?
            </p>
            <p>Ask mode should cite the exact paragraph, not just the note it came from.</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {["#ideas", "#graph", "#ask-mode"].map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs text-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <aside className="border-t border-line p-6 lg:border-l lg:border-t-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-soft">
            Linked automatically
          </p>
          <ul className="mt-4 divide-y divide-line">
            {linked.map(([title, meta]) => (
              <li key={title} className="flex items-center justify-between gap-4 py-3 text-sm">
                <span className="font-medium">{title}</span>
                <span className="shrink-0 font-mono text-xs text-soft">{meta}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border border-line px-3 py-2.5 text-sm text-soft">
            Ask your notes…
            <Icon name="search" className="size-4" />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="pb-20 pt-16 lg:pb-28 lg:pt-24">
        <p className="animate-rise font-mono text-xs uppercase tracking-[0.18em] text-soft">
          A second brain for people who make things
        </p>
        <h1 className="animate-rise mt-8 max-w-[13ch] text-[clamp(3.25rem,10vw,10rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-ink [animation-delay:80ms]">
          Think out loud. <span className={styles.mark}>Remember everything.</span>
        </h1>
        <div className="animate-rise mt-12 grid gap-8 lg:grid-cols-12 lg:items-end [animation-delay:160ms]">
          <p className="max-w-md text-lg leading-8 text-soft lg:col-span-5">
            Axon links every note you take to everything you already know, and hands the right idea
            back at the right moment.
          </p>
          <div className="flex flex-wrap items-center gap-3 lg:col-span-7 lg:justify-end">
            <a
              href="#pricing"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-on-accent transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Start for free <Icon name="arrow-right" className="size-4" />
            </a>
            <a
              href="#how"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 text-[15px] font-medium text-ink transition-colors hover:border-ink"
            >
              See how it works
              <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
        <div className="animate-rise relative mt-16 lg:mt-20 [animation-delay:240ms]">
          <div
            className={`${styles.dots} absolute -inset-x-10 -top-10 bottom-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]`}
          />
          <AppWindow />
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
              className={`px-6 py-8 first:pl-0 lg:px-10 lg:py-10 ${
                i % 2 === 1 ? "border-l border-line" : ""
              } ${i >= 2 ? "max-md:border-t max-md:border-line" : ""} ${i > 0 ? "md:border-l md:border-line" : ""}`}
            >
              <p className="text-4xl font-semibold tracking-[-0.04em] tabular-nums lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24 lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="text-[clamp(2rem,4.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] lg:col-span-7">
            Everything you write, working together.
          </h2>
          <p className="max-w-md text-lg leading-8 text-soft lg:col-span-5 lg:justify-self-end">
            Six reasons people stop taking notes in five different apps.
          </p>
        </div>
        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <article key={feature.id} className="bg-canvas p-8 transition-colors hover:bg-surface lg:p-10">
              <div className="flex items-center justify-between">
                <Icon name={feature.icon} className="size-6 text-ink" />
                <span className="font-mono text-xs text-soft">0{i + 1}</span>
              </div>
              <h3 className="mt-12 text-xl font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-soft">{feature.blurb}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-line py-24 lg:py-32">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-soft">How it works</p>
        <ol className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-3">
          {steps.map((item, i) => (
            <li key={item.title} className="bg-canvas p-8 lg:p-10">
              <span className="block text-8xl font-semibold leading-none tracking-[-0.07em] text-line tabular-nums">
                0{i + 1}
              </span>
              <h3 className="mt-10 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 max-w-sm text-[15px] leading-7 text-soft">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Quote() {
  const testimonial = testimonials[0];
  return (
    <section className="border-t border-line py-24 lg:py-32">
      <Container className="max-w-5xl">
        <blockquote className="text-[clamp(1.75rem,4vw,3.5rem)] font-medium leading-[1.12] tracking-[-0.035em]">
          “{testimonial.quote}”
        </blockquote>
        <footer className="mt-10 flex items-center gap-4 text-sm">
          <span className="grid size-10 place-items-center rounded-full bg-ink font-mono text-xs text-white">
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
          <h2 className="text-[clamp(2rem,4.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            Simple pricing. No surprises.
          </h2>
          <p className="max-w-sm text-lg leading-8 text-soft">
            Start free. Upgrade when your brain outgrows the inbox.
          </p>
        </div>
        <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-8 lg:p-10 ${plan.featured ? "bg-ink text-white" : "bg-canvas"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{plan.name}</h3>
                {plan.featured && (
                  <span className="bg-accent px-2 py-0.5 text-xs font-semibold text-on-accent">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-[-0.04em] tabular-nums">
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.featured ? "text-white/60" : "text-soft"}`}>
                  {plan.period}
                </span>
              </p>
              <p className={`mt-4 text-[15px] leading-7 ${plan.featured ? "text-white/80" : "text-soft"}`}>
                {plan.blurb}
              </p>
              <ul
                className={`mt-8 space-y-3 text-sm ${
                  plan.featured ? "divide-y divide-white/15" : "divide-y divide-line"
                }`}
              >
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <Icon name="check" className="size-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-10 inline-flex h-11 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  plan.featured
                    ? "bg-accent text-on-accent hover:bg-white"
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

function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-line py-24 lg:py-32">
      <Container className="grid gap-10 lg:grid-cols-12">
        <h2 className="text-[clamp(2rem,4.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] lg:col-span-4">
          Questions, answered.
        </h2>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
                {faq.q}
                <span className="font-mono text-xl text-soft transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-soft">{faq.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-line py-28 text-center lg:py-40">
      <Container>
        <h2 className="text-[clamp(2.75rem,9vw,9rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
          Start <span className={styles.mark}>remembering.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-soft">
          Free for your first hundred notes. No card required.
        </p>
        <a
          href="#pricing"
          className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-[15px] font-semibold text-on-accent transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Start for free <Icon name="arrow-right" className="size-4" />
        </a>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line pb-28">
      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/without-design-skill/glm-5.4/1" className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight">
              <Logo />
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
          <span>Design iteration 1 of 5 — Minimal</span>
        </div>
      </Container>
    </footer>
  );
}

export default function MinimalPage() {
  return (
    <ViewTransition name="iteration" share="auto" default="none">
      <div data-iteration="1" className="min-h-dvh bg-canvas font-sans text-ink">
        <Header />
        <main>
          <Hero />
          <Stats />
          <Features />
          <HowItWorks />
          <Quote />
          <Pricing />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </ViewTransition>
  );
}
