import type { ReactNode } from "react";
import { Icon, type IconName } from "@/variants/without-design-skill/sonnet-5.5/source/app/_components/icons";
import { AppMock } from "./_components/app-mock";

const plans = [
  {
    name: "Free",
    price: "$0",
    note: "forever, for one vault",
    cta: "Get started",
    featured: false,
    features: ["Unlimited notes", "Backlinks and graph view", "Web clipper and quick capture", "Sync on 2 devices"],
  },
  {
    name: "Pro",
    price: "$8",
    note: "per month, billed yearly",
    cta: "Start 30-day free trial",
    featured: true,
    features: ["Everything in Free", "Ask Engram, with citations", "Daily resurfacing digest", "Unlimited vaults and devices", "1-year version history"],
  },
  {
    name: "Team",
    price: "$14",
    note: "per person, per month",
    cta: "Talk to us",
    featured: false,
    features: ["Everything in Pro", "Shared vaults and permissions", "SSO and audit log", "Admin and billing controls"],
  },
];

const quotes = [
  { q: "I stopped losing things. Every meeting, every article, every half-idea is one search away, and Ask finds connections I forgot I'd made.", n: "Priya Raman", r: "Product lead", c: "bg-pink-200" },
  { q: "It's the only notes app I've kept for more than a year. The backlinks turned my messy research into something I can actually write from.", n: "Tomás Ibarra", r: "PhD candidate", c: "bg-amber-200" },
  { q: "Local-first was the deciding factor. It's instant, it works on planes, and my notes are just Markdown files. No lock-in, no anxiety.", n: "Hannah Okafor", r: "Staff engineer", c: "bg-emerald-200" },
];

const faqs = [
  ["Where are my notes stored?", "On your device first, as plain Markdown files. If you turn on sync, notes are end-to-end encrypted before they leave your machine, so we can't read them."],
  ["Can I import from Notion, Obsidian or Evernote?", "Yes. Import from Notion, Obsidian, Evernote, Apple Notes and Roam takes a couple of minutes and keeps your links, tags and attachments."],
  ["How does Ask Engram work?", "It searches your notes by meaning, then writes an answer using only what it finds and cites each note it used. On Pro you can run it fully on-device."],
  ["What happens if I stop paying?", "You keep everything. Your vault is a folder of files that you own, and the free plan stays available for one vault."],
];

const palette: [IconName, string, string, boolean][] = [
  ["file", "New note", "⌘N", true],
  ["link", "Link to note…", "⌘L", false],
  ["sparkle", "Ask Engram", "⌘J", false],
  ["graph", "Open graph view", "⌘G", false],
  ["refresh", "Review today's resurfaced notes", "⌘R", false],
];

function BentoCard({ className = "", title, body, children }: { className?: string; title: string; body: string; children: ReactNode }) {
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 transition hover:border-zinc-300 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)] ${className}`}>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 max-w-md text-sm leading-6 text-zinc-500">{body}</p>
      <div className="mt-6 flex-1">{children}</div>
    </article>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2 text-[17px] font-semibold tracking-tight">
      <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-sm">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
          <path d="M6 8l11-2M6 8l4 10M17 6l-7 12" stroke="white" strokeOpacity=".7" strokeWidth="1.5" />
          <circle cx="6" cy="8" r="2.4" fill="white" />
          <circle cx="17" cy="6" r="2.4" fill="white" />
          <circle cx="10" cy="18" r="2.4" fill="white" />
        </svg>
      </span>
      Engram
    </span>
  );
}

function GraphVisual() {
  const edges = [
    [160, 150, 70, 80], [160, 150, 250, 70], [160, 150, 60, 210], [160, 150, 255, 215], [160, 150, 160, 50],
    [160, 150, 160, 255], [160, 150, 105, 150], [160, 150, 215, 140], [70, 80, 160, 50], [250, 70, 160, 50],
    [250, 70, 300, 140], [60, 210, 20, 140], [60, 210, 160, 255], [255, 215, 160, 255], [255, 215, 215, 140],
    [70, 80, 20, 140], [105, 150, 70, 80], [215, 140, 250, 70],
  ];
  const nodes: [number, number, number, string][] = [
    [160, 150, 11, "#6366f1"], [70, 80, 7, "#f472b6"], [250, 70, 8, "#fbbf24"], [60, 210, 6, "#34d399"],
    [255, 215, 9, "#6366f1"], [160, 50, 6, "#f472b6"], [160, 255, 7, "#fbbf24"], [105, 150, 4.5, "#a1a1aa"],
    [215, 140, 4.5, "#a1a1aa"], [300, 140, 3.5, "#a1a1aa"], [20, 140, 3.5, "#a1a1aa"],
  ];
  return (
    <svg viewBox="0 0 320 300" className="h-full max-h-[300px] w-full" aria-hidden>
      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d4d4d8" strokeWidth="1.2" />
      ))}
      <circle cx="160" cy="150" r="22" fill="#6366f1" fillOpacity=".12" className="animate-pulse" />
      <circle cx="255" cy="215" r="18" fill="#6366f1" fillOpacity=".1" className="animate-pulse [animation-delay:700ms]" />
      {nodes.map(([cx, cy, r, fill], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />
      ))}
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" aria-label="Engram home"><Logo /></a>
          <nav aria-label="Primary" className="hidden items-center gap-1 text-sm text-zinc-600 md:flex">
            {[["Product", "#product"], ["Shortcuts", "#keys"], ["Reviews", "#reviews"], ["Pricing", "#pricing"], ["FAQ", "#faq"]].map(([l, h]) => (
              <a key={l} href={h} className="rounded-lg px-3 py-1.5 transition hover:bg-zinc-200/60 hover:text-zinc-950">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-sm">
            <a href="#" className="hidden rounded-lg px-3 py-1.5 text-zinc-600 transition hover:text-zinc-950 sm:block">Log in</a>
            <a href="#pricing" className="rounded-full bg-zinc-950 px-4 py-2 font-medium text-white transition hover:bg-zinc-700">Get started</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[820px] bg-[radial-gradient(55%_50%_at_18%_0%,rgba(99,102,241,0.2),transparent),radial-gradient(45%_45%_at_88%_8%,rgba(244,114,182,0.18),transparent),radial-gradient(40%_40%_at_55%_45%,rgba(251,191,36,0.12),transparent)]" />
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[700px] bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 text-center">
          <a href="#ask" className="animate-rise inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 py-1 pr-3 pl-1 text-sm text-zinc-600 shadow-sm backdrop-blur transition hover:border-zinc-300">
            <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-medium text-white">New</span>
            Ask Engram: answers from your own notes
            <Icon name="arrow" className="size-3.5 text-zinc-400" />
          </a>
          <h1 className="animate-rise mx-auto mt-7 max-w-4xl text-[clamp(2.6rem,6.6vw,5.6rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance [animation-delay:80ms]">
            The second brain that{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">keeps up</span>{" "}
            with you.
          </h1>
          <p className="animate-rise mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600 [animation-delay:160ms]">
            Capture anything in a second, link it without thinking, and get it
            back exactly when it matters. Fast, private, and yours forever.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
            <a href="#pricing" className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-zinc-950/20 transition hover:bg-zinc-700">
              Download for Mac
            </a>
            <a href="#product" className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium transition hover:border-zinc-400">
              Try it in your browser
            </a>
          </div>
          <p className="mt-4 text-xs text-zinc-500">Also for Windows, iOS and Android · Free plan, no credit card</p>

          <div className="animate-rise mt-16 [animation-delay:320ms]">
            <AppMock />
            <p className="mt-4 text-xs text-zinc-400">This is a live demo. Click a note, a link, or a tab.</p>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section aria-label="Ratings" className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 pb-24 sm:flex-row sm:justify-center sm:gap-6">
        <div className="flex -space-x-2" aria-hidden>
          {["bg-pink-300", "bg-amber-300", "bg-emerald-300", "bg-sky-300", "bg-indigo-300"].map((c, i) => (
            <span key={i} className={`size-9 rounded-full border-2 border-zinc-50 ${c}`} />
          ))}
        </div>
        <p className="text-sm text-zinc-600">
          <span className="font-semibold text-zinc-950">4.9 / 5</span> from 31,000 reviews · trusted by 200,000+ thinkers, writers and teams
        </p>
      </section>

      {/* Bento */}
      <section id="product" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-indigo-600">Everything a second brain needs</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-balance md:text-5xl">One place for every thought, wired together.</h2>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <BentoCard className="lg:col-span-7" title="Capture from anywhere" body="Web clipper, email-in, voice memos, share sheet, or ⌥Space from any app. It all lands in one inbox.">
            <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <ul className="grid grid-cols-2 gap-2 text-xs font-medium">
                {([["globe", "Web clip"], ["mail", "Email-in"], ["mic", "Voice memo"], ["bolt", "⌥ Space"]] as [IconName, string][]).map(([i, l]) => (
                  <li key={l} className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5">
                    <Icon name={i} className="size-4 text-indigo-600" /> {l}
                  </li>
                ))}
              </ul>
              <Icon name="arrow" className="mx-auto hidden size-5 text-zinc-300 sm:block" />
              <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-zinc-400 uppercase"><Icon name="inbox" className="size-3.5" /> Inbox · 3</p>
                {["How memory consolidates during sleep", "Voice memo · 0:42", "Re: launch checklist"].map((t) => (
                  <p key={t} className="truncate border-t border-zinc-100 py-1.5 text-xs text-zinc-600">{t}</p>
                ))}
              </div>
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-5" title="Backlinks, automatically" body="Every note shows where it's mentioned, with context, so ideas find each other.">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold">Compounding ideas</p>
              <p className="mt-3 text-[11px] font-medium tracking-wide text-zinc-400 uppercase">3 linked mentions</p>
              {[["Pricing v2", "…reasoning on retention"], ["Call with Jo", "…related thinking in"], ["Essay draft", "…the core metaphor is"]].map(([a, b]) => (
                <p key={a} className="mt-2 rounded-lg bg-white px-3 py-2 text-xs text-zinc-500 ring-1 ring-zinc-200">
                  <span className="font-medium text-zinc-900">{a}</span> {b} <span className="rounded bg-indigo-50 px-1 text-indigo-700">[[Compounding ideas]]</span>
                </p>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-4 lg:row-span-2" title="See the shape of what you know" body="A live graph of your notes. Filter, zoom and find the clusters you keep returning to.">
            <div className="grid h-full place-items-center rounded-2xl bg-zinc-50 p-2 ring-1 ring-zinc-200">
              <GraphVisual />
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-8" title="Ask Engram" body="Ask in plain language. Answers come from your notes and cite every source.">
            <div id="ask" className="scroll-mt-24 space-y-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-zinc-950 px-4 py-2.5 text-sm text-white">What were the main risks we flagged for launch?</p>
              <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm leading-6 shadow-sm ring-1 ring-zinc-200">
                <p className="flex items-center gap-1.5 text-xs font-medium text-indigo-600"><Icon name="sparkle" className="size-3.5" /> Engram</p>
                <p className="mt-1 text-zinc-700">Three risks came up: <b>support load</b> from annual billing, <b>sync conflicts</b> on mobile, and a <b>tight import timeline</b> for Notion users.</p>
                <p className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                  {["Launch plan", "Support load model", "Weekly review · Mar 22"].map((s) => (
                    <span key={s} className="rounded-md bg-indigo-50 px-2 py-0.5 text-indigo-700">{s}</span>
                  ))}
                </p>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-4" title="Daily resurfacing" body="Old notes return on a spaced schedule.">
            <div className="relative h-28">
              <div className="absolute inset-x-4 top-0 h-20 rounded-2xl border border-zinc-200 bg-zinc-50" />
              <div className="absolute inset-x-2 top-3 h-20 rounded-2xl border border-zinc-200 bg-zinc-100" />
              <div className="absolute inset-x-0 top-6 rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
                <p className="text-[11px] text-zinc-400">From 8 months ago</p>
                <p className="text-sm font-medium">Idea: garden of notes</p>
                <p className="mt-1 text-xs text-indigo-600">Revisit →</p>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-4" title="Private by design" body="Local-first, end-to-end encrypted, plain Markdown.">
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"><Icon name="lock" className="size-7" /></span>
              <ul className="space-y-1 text-xs text-zinc-600">
                {["Works offline", "Zero-knowledge sync", "Export any time"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5"><Icon name="check" className="size-3.5 text-emerald-600" strokeWidth={2.4} /> {t}</li>
                ))}
              </ul>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Keyboard */}
      <section id="keys" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-28">
        <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] bg-zinc-950 p-8 text-white md:p-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-indigo-300">Keyboard-first</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-balance md:text-5xl">Every action is one shortcut away.</h2>
            <p className="mt-5 max-w-md leading-7 text-zinc-400">
              A command palette for everything: jump to any note, link two ideas,
              ask a question. Your hands never leave the keys.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-900 p-2 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 text-sm text-zinc-400">
              <Icon name="command" className="size-4" /> Search notes or run a command…
            </div>
            <ul className="p-1.5">
              {palette.map(([icon, label, key, active]) => (
                <li key={label} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${active ? "bg-indigo-500/20 text-white" : "text-zinc-300"}`}>
                  <Icon name={icon} className={`size-4 ${active ? "text-indigo-300" : "text-zinc-500"}`} />
                  {label}
                  <kbd className="ml-auto rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-[11px] text-zinc-400">{key}</kbd>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-28">
        <h2 className="mx-auto max-w-2xl text-center text-4xl font-semibold tracking-[-0.035em] text-balance md:text-5xl">People keep it for years.</h2>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {quotes.map((t) => (
            <figure key={t.n} className="flex flex-col rounded-3xl border border-zinc-200 bg-white p-7">
              <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <blockquote className="mt-4 flex-1 leading-7 text-zinc-700">&ldquo;{t.q}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span className={`grid size-10 place-items-center rounded-full font-semibold text-zinc-800 ${t.c}`}>{t.n[0]}</span>
                <span><span className="block font-medium">{t.n}</span><span className="text-zinc-500">{t.r}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-indigo-600">Pricing</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-balance md:text-5xl">Start free. Upgrade when it&rsquo;s indispensable.</h2>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <article key={p.name} className={`relative flex flex-col rounded-3xl p-8 ${p.featured ? "bg-zinc-950 text-white shadow-2xl shadow-indigo-500/20 ring-1 ring-zinc-800" : "border border-zinc-200 bg-white"}`}>
              {p.featured && <span className="absolute top-6 right-6 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-xs font-medium text-white">Most popular</span>}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-5 flex items-baseline gap-2"><span className="text-5xl font-semibold tracking-tight">{p.price}</span><span className={`text-sm ${p.featured ? "text-zinc-400" : "text-zinc-500"}`}>{p.note}</span></p>
              <ul className="mt-7 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5"><Icon name="check" className={`mt-0.5 size-4 shrink-0 ${p.featured ? "text-indigo-300" : "text-indigo-600"}`} strokeWidth={2.4} /> {f}</li>
                ))}
              </ul>
              <a href="#" className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-medium transition ${p.featured ? "bg-white text-zinc-950 hover:bg-zinc-200" : "border border-zinc-300 hover:border-zinc-400"}`}>{p.cta}</a>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-6 pb-28">
        <h2 className="text-center text-4xl font-semibold tracking-[-0.035em]">Questions, answered.</h2>
        <div className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {q}
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-zinc-200/70 text-zinc-600 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl leading-7 text-zinc-600">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-600 to-fuchsia-600 px-8 py-20 text-center text-white">
          <div aria-hidden className="absolute -top-24 -right-16 -z-10 size-72 rounded-full bg-white/15 blur-3xl" />
          <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-[-0.035em] text-balance md:text-5xl">Start building your second brain today.</h2>
          <p className="mx-auto mt-4 max-w-md text-indigo-100">It takes about two minutes to import your old notes and feel the difference.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50">Download Engram</a>
            <a href="#" className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium transition hover:bg-white/10">Import your notes</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 pb-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 text-sm sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-zinc-500">A calm, fast home for everything you think and learn.</p>
          </div>
          {[
            ["Product", ["Features", "Changelog", "Roadmap", "Download"]],
            ["Company", ["About", "Careers", "Press", "Contact"]],
            ["Resources", ["Docs", "Templates", "Security", "Privacy"]],
          ].map(([h, links]) => (
            <div key={h as string}>
              <p className="font-medium">{h as string}</p>
              <ul className="mt-3 space-y-2 text-zinc-500">
                {(links as string[]).map((l) => <li key={l}><a href="#" className="transition hover:text-zinc-950">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto max-w-6xl px-6 pb-2 text-xs text-zinc-400">© 2026 Engram Labs. All rights reserved.</p>
      </footer>
    </>
  );
}
