import { Fraunces, Inter } from "next/font/google";
import {
  APP_NAME,
  features,
  steps,
  testimonials,
  logos,
  tickerItems,
} from "../lib/content";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const display = fraunces.className;
const sans = inter.className;

function Marquee() {
  const row = [...tickerItems, ...tickerItems];
  return (
    <div className="overflow-hidden border-y border-[#17150F]/15 py-4">
      <div className="flex w-max animate-[marquee_36s_linear_infinite] items-center gap-8">
        {[...row, ...row].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#17150F]/60"
          >
            {item}
            <span className="text-[#D9480F]">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function NoteCard() {
  return (
    <div className="relative">
      {/* Graph card peeking behind */}
      <div className="absolute -right-4 -top-6 hidden w-44 rotate-3 rounded-lg border border-[#17150F]/10 bg-white p-4 shadow-lg sm:block">
        <svg viewBox="0 0 160 110" className="w-full">
          <g stroke="#17150F" strokeOpacity="0.25" strokeWidth="1">
            <line x1="30" y1="30" x2="80" y2="55" />
            <line x1="80" y1="55" x2="130" y2="25" />
            <line x1="80" y1="55" x2="70" y2="95" />
            <line x1="30" y1="30" x2="55" y2="85" />
          </g>
          <g fill="#D9480F">
            <circle cx="80" cy="55" r="5" />
            <circle cx="30" cy="30" r="3.5" />
            <circle cx="130" cy="25" r="3.5" />
            <circle cx="70" cy="95" r="3.5" />
            <circle cx="55" cy="85" r="3" />
          </g>
        </svg>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-[#17150F]/50">
          graph · 5 nodes
        </p>
      </div>

      {/* Main note card */}
      <div className="relative rotate-[-1.2deg] rounded-xl border border-[#17150F]/12 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(23,21,15,0.35)] sm:p-8">
        <div className="flex items-center justify-between border-b border-[#17150F]/10 pb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#17150F]/50">
            zettelkasten / ideas
          </p>
          <div className="flex gap-1.5">
            {["#D9480F", "#2B5CE6", "#1F8A4C"].map((c) => (
              <span
                key={c}
                className="h-2 w-2 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        <h3 className={`${display} mt-5 text-2xl leading-tight`}>
          On the topology of ideas
        </h3>

        <p className="mt-4 text-[15px] leading-7 text-[#17150F]/70">
          A note is not a destination — it&apos;s a junction. Every{" "}
          <span className="border-b-2 border-[#D9480F]/60 bg-[#D9480F]/5 px-0.5">
            [[link]]
          </span>{" "}
          you write is a promise to your future self. The best ideas don&apos;t
          live in folders; they live{" "}
          <span className="border-b-2 border-[#D9480F]/60 bg-[#D9480F]/5 px-0.5">
            [[between notes]]
          </span>
          .
        </p>

        <div className="mt-6 rounded-lg bg-[#F6F4EE] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#17150F]/45">
            Linked from · 14 notes
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-[#17150F]/75">
            <li className="flex items-center gap-2">
              <span className="text-[#D9480F]">←</span> The Memex, revisited
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#D9480F]">←</span> Why folders fail thinkers
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#D9480F]">←</span> Zettelkasten in practice
            </li>
          </ul>
        </div>

        {/* Margin note */}
        <p className="absolute -right-3 top-16 hidden rotate-6 font-mono text-[10px] uppercase tracking-widest text-[#D9480F] lg:block">
          ↳ connects 3 clusters
        </p>
      </div>
    </div>
  );
}

export default function IterationOne() {
  return (
    <div className={`${sans} min-h-screen bg-[#F6F4EE] text-[#17150F] antialiased`}>
      {/* Nav */}
      <header className="border-b border-[#17150F]/12">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className={`${display} text-2xl font-semibold`}>
            Synapse<span className="text-[#D9480F]">.</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#17150F]/70 md:flex">
            <a href="#features" className="transition-colors hover:text-[#17150F]">
              Product
            </a>
            <a href="#graph" className="transition-colors hover:text-[#17150F]">
              Graph
            </a>
            <a href="#pricing" className="transition-colors hover:text-[#17150F]">
              Pricing
            </a>
            <a href="#journal" className="transition-colors hover:text-[#17150F]">
              Journal
            </a>
          </nav>
          <a
            href="#"
            className="rounded-full bg-[#17150F] px-5 py-2.5 text-sm font-semibold text-[#F6F4EE] transition-transform hover:-translate-y-0.5"
          >
            Start free
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#17150F]/60">
              <span className="inline-block h-2 w-2 bg-[#D9480F]" />
              A second brain for your thinking
            </p>
            <h1
              className={`${display} mt-6 text-[2.9rem] leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.4rem]`}
            >
              Your mind,{" "}
              <em className="text-[#D9480F]">organized</em> into a living
              graph.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#17150F]/65">
              {APP_NAME} is a note-taking app that connects every idea,
              backlink, and stray thought — so nothing you learn is ever lost
              to a folder.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#"
                className="rounded-full bg-[#17150F] px-7 py-3.5 text-sm font-semibold text-[#F6F4EE] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Start free
              </a>
              <a
                href="#features"
                className="group flex items-center gap-2 text-sm font-semibold text-[#17150F]"
              >
                See how it works
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[#17150F]/45">
              Free plan forever · Syncs everywhere · End-to-end encrypted
            </p>
          </div>
          <div className="lg:col-span-5">
            <NoteCard />
          </div>
        </div>
      </section>

      <Marquee />

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex items-end justify-between">
          <h2 className={`${display} text-4xl tracking-tight sm:text-5xl`}>
            Everything a second brain needs.
          </h2>
          <p className="hidden max-w-xs text-sm leading-6 text-[#17150F]/55 md:block">
            Four primitives. Zero folders. One graph that quietly gets
            smarter every day.
          </p>
        </div>

        <div className="mt-14 border-t border-[#17150F]/15">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group grid gap-3 border-b border-[#17150F]/15 py-9 transition-colors hover:bg-white/60 sm:grid-cols-12 sm:gap-6 sm:px-4"
            >
              <p className="font-mono text-xs tracking-widest text-[#D9480F] sm:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className={`${display} text-2xl tracking-tight sm:col-span-4 sm:text-3xl`}
              >
                {f.title}
              </h3>
              <p className="text-[15px] leading-7 text-[#17150F]/60 sm:col-span-6">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="border-y border-[#17150F]/12 bg-white/50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#D9480F]">
            How it works
          </p>
          <h2 className={`${display} mt-4 max-w-2xl text-4xl tracking-tight sm:text-5xl`}>
            From stray thought to connected idea.
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="border-t-2 border-[#17150F] pt-6">
                <p className="font-mono text-xs tracking-widest text-[#17150F]/45">
                  STEP {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className={`${display} mt-3 text-2xl`}>{s.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-[#17150F]/60">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote + logos */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <blockquote className="mx-auto max-w-3xl text-center">
          <p className={`${display} text-3xl leading-snug tracking-tight sm:text-4xl`}>
            &ldquo;It feels less like software and more like a{" "}
            <em className="text-[#D9480F]">well-organized mind</em>.&rdquo;
          </p>
          <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#17150F]/50">
            {testimonials[2].name} — {testimonials[2].role}
          </footer>
        </blockquote>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((l) => (
            <span
              key={l}
              className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-[#17150F]/40 transition-colors hover:text-[#17150F]/70"
            >
              {l}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#17150F]/12">
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <h2 className={`${display} mx-auto max-w-3xl text-5xl leading-[1.05] tracking-tight sm:text-6xl`}>
            Start building your second brain.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-7 text-[#17150F]/60">
            Free forever for personal use. Import your notes in minutes — we
            handle the graph.
          </p>
          <a
            href="#"
            className="mt-10 inline-block rounded-full bg-[#D9480F] px-9 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get started — it&apos;s free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#17150F]/12 bg-white/40">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className={`${display} text-2xl font-semibold`}>
                Synapse<span className="text-[#D9480F]">.</span>
              </p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#17150F]/55">
                The note-taking app that thinks in connections, not folders.
              </p>
            </div>
            {[
              ["Product", ["Features", "Graph view", "Pricing", "Changelog"]],
              ["Company", ["About", "Journal", "Careers", "Contact"]],
              ["Resources", ["Docs", "Import guide", "API", "Status"]],
            ].map(([title, links]) => (
              <div key={title as string} className="md:col-span-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#17150F]/45">
                  {title}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-[#17150F]/70">
                  {(links as string[]).map((l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:text-[#D9480F]">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#17150F]/10 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#17150F]/40">
            <p>© 2026 {APP_NAME}, Inc.</p>
            <p>Made for thinkers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
