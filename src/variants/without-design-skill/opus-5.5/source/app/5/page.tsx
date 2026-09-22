import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { grotesk, mono } from "./fonts";
import { LinkDemo } from "./link-demo";

export const metadata: Metadata = {
  title: "Mneme — Write. Mneme links. You remember.",
  description:
    "A notebook that links itself. Plain Markdown on your device, end-to-end encrypted sync, and answers cited from your own notes.",
};

const SIGNAL = "#FF4F00";
const GRID = "grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6";
const WRAP = "mx-auto w-full max-w-[1440px] px-5 md:px-10";
const MONO = "font-[family-name:var(--font-index-mono)] text-[11px] uppercase tracking-[0.08em]";

const PLATFORMS = ["macOS", "Windows", "Linux", "iOS", "Android", "Web"];

const FEATURES = [
  {
    name: "Capture anywhere",
    body: "Menubar, phone, email forwarding, web clipper, voice memo. Everything lands in one inbox, as text.",
    key: ["⌃", "Space"],
    note: "5 inputs",
  },
  {
    name: "Links itself",
    body: "Mneme reads what you write and links it to what you have already written. Every note shows its backlinks.",
    key: null,
    note: "Automatic",
  },
  {
    name: "Ask your notes",
    body: "Ask in plain language. Answers come only from your notes, and every claim cites the note it came from.",
    key: ["⌘", "J"],
    note: "Cited",
  },
  {
    name: "Resurfacing",
    body: "Each morning: what you wrote a year ago today, and older notes that relate to what you are writing now.",
    key: null,
    note: "07:00 daily",
  },
  {
    name: "Local-first, private",
    body: "Plain Markdown files in a folder you own. End-to-end encrypted sync. Works fully offline.",
    key: null,
    note: ".md · E2EE",
  },
  {
    name: "Daily notes, graph, search",
    body: "A page for every day. A map of everything. Full-text search that returns before you finish typing.",
    key: ["⌘", "K"],
    note: "< 50 ms",
  },
];

const QUOTES = [
  {
    quote:
      "I stopped filing things. I write, and last spring’s notes turn up exactly when they matter.",
    name: "Hana Okafor",
    role: "PhD candidate, cognitive neuroscience",
  },
  {
    quote:
      "Ask cited a meeting note from 2023 I had completely forgotten. It settled the argument in one message.",
    name: "Tomás Reyes",
    role: "Engineering manager",
  },
  {
    quote: "Markdown files in a folder I own. That was the whole reason I switched. The links are why I stayed.",
    name: "Ines Vandermeer",
    role: "Technical writer",
  },
];

type Cell = boolean | string;
const PLANS = [
  { name: "Free", price: "$0", unit: "forever", cta: "Download" },
  { name: "Pro", price: "$8", unit: "per month", cta: "Start Pro" },
  { name: "Teams", price: "$14", unit: "per user / month", cta: "Start a team" },
];
const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "Notes", cells: ["Unlimited", "Unlimited", "Unlimited"] },
  { label: "Devices", cells: ["1", "Unlimited", "Unlimited"] },
  { label: "Automatic links & backlinks", cells: [true, true, true] },
  { label: "Daily notes, graph, search", cells: [true, true, true] },
  { label: "Plain Markdown on your disk", cells: [true, true, true] },
  { label: "End-to-end encrypted sync", cells: [false, true, true] },
  { label: "Ask your notes", cells: [false, true, true] },
  { label: "Resurfacing", cells: [false, true, true] },
  { label: "Shared spaces", cells: [false, false, true] },
];

export default function IndexPage() {
  return (
    <div
      className={`${grotesk.variable} ${mono.variable} relative min-h-screen w-full bg-[#F2F1EC] text-[#0B0B0B] antialiased selection:bg-[#FF4F00] selection:text-black`}
      style={{ fontFamily: "var(--font-index-sans), system-ui, sans-serif" }}
    >
      <GridOverlay />

      <Nav />

      <main className="relative">
        <Hero />

        <Section id="demo" n="01" title="Live demo" meta="No account · Runs in your browser">
          <div className="col-span-4 mb-12 md:col-span-6 md:col-start-4">
            <p className="text-[19px] leading-[1.45] tracking-[-0.01em] md:text-[22px]">
              A sample library of eleven notes, and one new note. Watch Mneme find every note it
              mentions—then type a sentence of your own. Nothing leaves this page.
            </p>
          </div>
          <div className="col-span-4 md:col-span-12">
            <LinkDemo />
          </div>
        </Section>

        <Section id="index" n="02" title="Index" meta="Six features · No plugins required">
          <FeatureIndex />
        </Section>

        <Section id="ask" n="03" title="Ask, with sources" meta="Pro · Answers from your notes only">
          <div className="col-span-4 mb-12 grid grid-cols-subgrid md:col-span-12">
            <p className="col-span-4 text-[19px] leading-[1.45] tracking-[-0.01em] md:col-span-6 md:col-start-4 md:text-[22px]">
              Ask a question the way you would ask a colleague. Mneme answers from what you wrote,
              and numbers every source. If your notes don’t say, it says so.
            </p>
          </div>
          <div className="col-span-4 md:col-span-12">
            <AppMock />
          </div>
        </Section>

        <Section id="proof" n="04" title="Evidence" meta="From people who write a lot">
          <Evidence />
        </Section>

        <Section id="pricing" n="05" title="Pricing" meta="USD · Cancel any time · Files stay yours">
          <Pricing />
        </Section>

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

/* ——— Structure ——— */

function GridOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <div className={`${WRAP} ${GRID} h-full`}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={`h-full border-x border-black/[0.055] ${i >= 4 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

function Nav() {
  const links = [
    ["01", "Demo", "#demo"],
    ["02", "Index", "#index"],
    ["03", "Ask", "#ask"],
    ["05", "Pricing", "#pricing"],
  ];
  return (
    <header className="sticky top-0 z-30 border-b border-black bg-[#F2F1EC]/92 backdrop-blur-sm">
      <nav aria-label="Primary" className={`${WRAP} ${GRID} h-14 items-center`}>
        <Link
          href="#"
          className="col-span-2 flex items-center gap-2 text-[19px] font-bold tracking-[-0.04em] md:col-span-3"
        >
          <span aria-hidden="true" className="size-3" style={{ background: SIGNAL }} />
          Mneme
        </Link>
        <ul className={`${MONO} hidden gap-8 md:col-span-6 md:flex`}>
          {links.map(([n, label, href]) => (
            <li key={href}>
              <a href={href} className="group flex gap-2 hover:text-black">
                <span className="text-black/60">{n}</span>
                <span className="underline-offset-4 group-hover:underline">{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="col-span-2 flex justify-end md:col-span-3">
          <a
            href="#download"
            className={`${MONO} bg-black px-3.5 py-2 text-[#F2F1EC] transition-colors hover:bg-[#FF4F00] hover:text-black`}
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  );
}

function Section({
  id,
  n,
  title,
  meta,
  children,
}: {
  id: string;
  n: string;
  title: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative scroll-mt-14 pt-24 md:pt-36">
      <div className={`${WRAP} ${GRID}`}>
        <div className="col-span-4 grid grid-cols-subgrid border-t border-black pt-3 pb-10 md:col-span-12 md:pb-16">
          <span className={`${MONO} col-span-1 md:col-span-3`}>§ {n}</span>
          <h2
            id={`${id}-title`}
            className="col-span-3 text-[34px] font-bold leading-[0.95] tracking-[-0.045em] md:col-span-6 md:text-[56px]"
          >
            {title}
          </h2>
          <p className={`${MONO} hidden text-right text-black/60 md:col-span-3 md:block`}>{meta}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ——— Hero ——— */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className={`${WRAP} ${GRID} pt-6 md:pt-8`}>
        <dl className={`${MONO} col-span-4 grid grid-cols-subgrid gap-y-3 md:col-span-12`}>
          <div className="col-span-2 md:col-span-3">
            <dt className="text-black/60">Name</dt>
            <dd className="mt-1 normal-case tracking-normal">Mneme /ˈniː.miː/</dd>
          </div>
          <div className="col-span-2 md:col-span-3">
            <dt className="text-black/60">From</dt>
            <dd className="mt-1">Greek muse of memory</dd>
          </div>
          <div className="col-span-2 md:col-span-3">
            <dt className="text-black/60">Kind</dt>
            <dd className="mt-1">Notes · Second brain</dd>
          </div>
          <div className="col-span-2 md:col-span-3">
            <dt className="text-black/60">Runs on</dt>
            <dd className="mt-1">{PLATFORMS.length} platforms, offline</dd>
          </div>
        </dl>

        <h1
          id="hero-title"
          className="col-span-4 mt-16 text-[clamp(3rem,12.2vw,12rem)] font-extrabold leading-[0.84] tracking-[-0.062em] md:col-span-12 md:mt-24"
        >
          <span className="block">Write.</span>
          <span className="block">
            Mneme{" "}
            <span
              className="underline decoration-[0.07em] underline-offset-[0.09em]"
              style={{ textDecorationColor: SIGNAL }}
            >
              links
            </span>
            .
          </span>
          <span className="block">You remember.</span>
        </h1>

        <div className="col-span-4 mt-14 grid grid-cols-subgrid gap-y-8 border-t border-black pt-5 md:col-span-12 md:mt-20">
          <p className={`${MONO} col-span-4 text-black/60 md:col-span-3`}>§ 00 — Summary</p>
          <p className="col-span-4 text-[21px] leading-[1.35] tracking-[-0.015em] md:col-span-5 md:text-[26px]">
            A notebook that connects itself. You write plain Markdown. Mneme finds what you have
            already written about the same thing, links it, and hands it back when it matters.
          </p>
          <div className="col-span-4 flex flex-col gap-3 md:col-span-3 md:col-start-10">
            <a
              href="#download"
              className="flex items-center justify-between bg-black px-4 py-3.5 text-[16px] font-semibold text-[#F2F1EC] transition-colors hover:bg-[#FF4F00] hover:text-black"
            >
              Download for macOS <span aria-hidden="true">↓</span>
            </a>
            <a
              href="#demo"
              className="flex items-center justify-between border border-black px-4 py-3.5 text-[16px] font-semibold transition-colors hover:bg-black hover:text-[#F2F1EC]"
            >
              Try the live demo <span aria-hidden="true">→</span>
            </a>
            <p className={`${MONO} text-black/60`}>Free · Unlimited notes · No account</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— 02 Index ——— */

function FeatureIndex() {
  return (
    <div className="col-span-4 md:col-span-12">
      <div
        className={`${MONO} hidden border-b border-black pb-2 text-black/60 md:grid md:grid-cols-12 md:gap-x-6`}
        aria-hidden="true"
      >
        <span className="col-span-1">No.</span>
        <span className="col-span-4">Feature</span>
        <span className="col-span-5">Description</span>
        <span className="col-span-2 text-right">Key / Metric</span>
      </div>
      <ol>
        {FEATURES.map((f, i) => (
          <li
            key={f.name}
            className="group grid grid-cols-4 gap-x-5 border-b border-black/20 py-6 transition-colors md:grid-cols-12 md:gap-x-6 md:py-8"
          >
            <span className={`${MONO} col-span-1 pt-2 text-black/60 group-hover:text-black`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="col-span-3 text-[26px] font-bold leading-[1] tracking-[-0.035em] md:col-span-4 md:text-[38px]">
              {f.name}
            </h3>
            <p className="col-span-3 col-start-2 mt-3 max-w-[48ch] text-[16px] leading-[1.5] text-black/75 md:col-span-5 md:col-start-auto md:mt-1 md:text-[17px]">
              {f.body}
            </p>
            <div className="col-span-3 col-start-2 mt-4 flex items-start gap-3 md:col-span-2 md:col-start-auto md:mt-1 md:flex-col md:items-end">
              {f.key && (
                <span className="flex gap-1" aria-label={`Shortcut ${f.key.join(" ")}`}>
                  {f.key.map((k) => (
                    <kbd
                      key={k}
                      className="min-w-7 border border-black bg-[#F2F1EC] px-1.5 py-0.5 text-center font-[family-name:var(--font-index-mono)] text-[12px]"
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
              )}
              <span className={`${MONO} pt-1`}>{f.note}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ——— 03 App mock ——— */

function AppMock() {
  return (
    <figure className="border border-black bg-[#FBFAF7]">
      <figcaption className="sr-only">
        The Mneme app: a sidebar with daily notes and a resurfaced note from a year ago, an Ask panel
        answering a question with three numbered citations, and a backlinks panel with a small graph.
      </figcaption>

      <div
        aria-hidden="true"
        className={`${MONO} flex items-center justify-between border-b border-black px-4 py-2.5`}
      >
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full border border-black" />
          <span className="size-2.5 rounded-full border border-black" />
          <span className="size-2.5 rounded-full border border-black" />
          <span className="ml-4 hidden sm:inline">~/Mneme / Ask</span>
        </span>
        <span className="text-black/60">4,812 notes · Synced · E2EE</span>
      </div>

      <div aria-hidden="true" className="grid md:grid-cols-12">
        {/* Sidebar */}
        <div className="hidden border-r border-black/20 p-5 md:col-span-3 md:block">
          <div className="flex items-center justify-between border border-black/30 px-2.5 py-2 text-[13px] text-black/60">
            <span>Search</span>
            <span className="font-[family-name:var(--font-index-mono)] text-[11px]">⌘K</span>
          </div>

          <p className={`${MONO} mt-6 text-black/60`}>Daily</p>
          <ul className="mt-2 space-y-1.5 text-[14px]">
            <li className="flex justify-between font-semibold">
              <span>Today</span>
              <span className="font-[family-name:var(--font-index-mono)] text-[11px] font-normal text-black/60">22.09</span>
            </li>
            <li className="flex justify-between">
              <span>Monday</span>
              <span className="font-[family-name:var(--font-index-mono)] text-[11px] text-black/60">21.09</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="font-[family-name:var(--font-index-mono)] text-[11px] text-black/60">20.09</span>
            </li>
          </ul>

          <p className={`${MONO} mt-6 text-black/60`}>Folders</p>
          <ul className="mt-2 space-y-1.5 text-[14px]">
            {[
              ["people", 38],
              ["projects", 12],
              ["reading", 214],
              ["research", 41],
              ["inbox", 7],
            ].map(([f, c]) => (
              <li key={f} className="flex justify-between">
                <span>{f}/</span>
                <span className="font-[family-name:var(--font-index-mono)] text-[11px] text-black/60">{c}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 border-t-2 pt-3" style={{ borderColor: SIGNAL }}>
            <p className={`${MONO} text-black/60`}>Resurfaced · 1 yr ago</p>
            <p className="mt-1.5 text-[14px] font-semibold leading-snug">Pricing page teardown: Things, Bear, Linear</p>
            <p className="mt-1 text-[13px] leading-snug text-black/65">
              “Nobody reads the comparison table until the second visit.”
            </p>
            <p className={`${MONO} mt-2 text-black/60`}>Relates to: Onboarding redesign</p>
          </div>
        </div>

        {/* Ask */}
        <div className="p-5 md:col-span-6 md:p-8">
          <p className={`${MONO} text-black/60`}>Ask · ⌘J</p>
          <p className="mt-3 border-b border-black pb-4 text-[22px] font-semibold leading-tight tracking-[-0.025em] md:text-[28px]">
            Why do people stop using the app after day one?
          </p>
          <div className="mt-5 space-y-4 text-[16px] leading-[1.6] md:text-[17px]">
            <p>
              Three reasons recur in your notes. First-session users rarely write a second note, so
              nothing links and the library feels empty<Cite n={1} />. Daily reminders get
              dismissed after about four days<Cite n={2} />.
            </p>
            <p>
              The people who stayed had imported existing notes on day one—their D7 is 2.4× the
              average<Cite n={3} />.
            </p>
          </div>
          <ol className="mt-7 border-t border-black/20">
            {[
              ["Onboarding redesign — synthesis", "projects/onboarding", "02 Sep 2026"],
              ["Lisbon field interviews — May 2026", "research/lisbon-2026", "21 May 2026"],
              ["Q3 retention — weekly numbers", "metrics/q3-retention", "19 Sep 2026"],
            ].map(([t, p, d], i) => (
              <li key={t} className="grid grid-cols-[1.75rem_1fr_auto] items-baseline gap-2 border-b border-black/20 py-2.5">
                <span className="font-[family-name:var(--font-index-mono)] text-[11px] font-medium" style={{ color: SIGNAL }}>
                  [{i + 1}]
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-semibold">{t}</span>
                  <span className="block truncate font-[family-name:var(--font-index-mono)] text-[11px] text-black/60">{p}.md</span>
                </span>
                <span className="font-[family-name:var(--font-index-mono)] text-[11px] text-black/60">{d}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Backlinks + graph */}
        <div className="border-t border-black/20 p-5 md:col-span-3 md:border-t-0 md:border-l">
          <p className={`${MONO} text-black/60`}>Backlinks · 5</p>
          <ul className="mt-3 space-y-3 text-[13px] leading-snug">
            {[
              ["Daily / 2026-09-22", "…call with Priya about onboarding…"],
              ["Daily / 2026-09-15", "…fewer nudges, better ones…"],
              ["Q3 board deck — outline", "…slide 6: activation…"],
              ["Priya Raman", "…owns the onboarding redesign…"],
              ["Tiny Habits — BJ Fogg", "…anchor to an existing routine…"],
            ].map(([t, s]) => (
              <li key={t}>
                <span className="block font-semibold">{t}</span>
                <span className="block text-black/60">{s}</span>
              </li>
            ))}
          </ul>
          <p className={`${MONO} mt-6 text-black/60`}>Graph · 2 hops</p>
          <MiniGraph />
        </div>
      </div>
    </figure>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 font-[family-name:var(--font-index-mono)] text-[10px] font-medium" style={{ color: SIGNAL }}>
      [{n}]
    </sup>
  );
}

function MiniGraph() {
  const nodes: [number, number, number][] = [
    [110, 70, 7],
    [40, 30, 3.5],
    [60, 118, 3.5],
    [180, 40, 3.5],
    [190, 110, 3.5],
    [120, 140, 3],
    [20, 80, 2.5],
    [150, 10, 2.5],
    [215, 75, 2.5],
    [85, 18, 2.5],
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [3, 7], [4, 8], [1, 9], [2, 5], [3, 8],
  ];
  return (
    <svg viewBox="0 0 230 150" className="mt-2 w-full" role="presentation">
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#0B0B0B"
          strokeOpacity={a === 0 ? 0.6 : 0.25}
          strokeWidth={0.75}
        />
      ))}
      {nodes.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i === 0 ? SIGNAL : "#0B0B0B"} />
      ))}
    </svg>
  );
}

/* ——— 04 Evidence ——— */

function Evidence() {
  const facts = [
    ["0", "bytes of your plaintext on our servers"],
    [".md", "the only file format. Open it in anything"],
    ["6", "platforms, one library"],
    ["1", "keystroke to capture, from anywhere"],
  ];
  return (
    <>
      <dl className="col-span-4 grid grid-cols-2 border-t border-black md:col-span-12 md:grid-cols-4">
        {facts.map(([k, v], i) => (
          <div
            key={k}
            className={`border-b border-black/20 py-6 pr-4 md:border-b-0 ${i % 2 === 1 ? "pl-4 md:pl-6" : ""} ${i > 0 ? "md:border-l md:border-black/20 md:pl-6" : ""}`}
          >
            <dt className="text-[56px] font-extrabold leading-none tracking-[-0.06em] md:text-[80px]">{k}</dt>
            <dd className="mt-3 max-w-[22ch] text-[15px] leading-snug text-black/70">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="col-span-4 mt-16 grid grid-cols-subgrid gap-y-12 md:col-span-12 md:mt-24">
        {QUOTES.map((q, i) => (
          <figure key={q.name} className="col-span-4 border-t border-black pt-4">
            <p className={`${MONO} text-black/60`}>Q.{String(i + 1).padStart(2, "0")}</p>
            <blockquote className="mt-4 text-[22px] font-medium leading-[1.25] tracking-[-0.02em] md:text-[24px]">
              “{q.quote}”
            </blockquote>
            <figcaption className="mt-6 text-[14px]">
              <span className="font-semibold">{q.name}</span>
              <span className="block text-black/60">{q.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

/* ——— 05 Pricing ——— */

function Pricing() {
  return (
    <div className="relative col-span-4 -mx-5 min-w-0 overflow-x-auto px-5 md:col-span-12 md:mx-0 md:px-0">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <caption className="sr-only">Mneme plans compared</caption>
        <thead>
          <tr className="align-bottom">
            <th scope="col" className={`${MONO} w-[34%] pb-5 font-normal text-black/60`}>
              Plan
            </th>
            {PLANS.map((p) => (
              <th
                key={p.name}
                scope="col"
                className={`w-[22%] border-t-4 pt-4 pb-5 pl-4 align-top font-normal ${p.name === "Pro" ? "" : "border-black"}`}
                style={p.name === "Pro" ? { borderColor: SIGNAL } : undefined}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-[20px] font-bold tracking-[-0.03em] md:text-[24px]">{p.name}</span>
                  {p.name === "Pro" && <span className={`${MONO} hidden sm:inline`}>Most chosen</span>}
                </span>
                <span className="mt-4 block text-[44px] font-extrabold leading-none tracking-[-0.06em] md:text-[64px]">
                  {p.price}
                </span>
                <span className={`${MONO} mt-2 block text-black/60`}>{p.unit}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-t border-black">
          {ROWS.map((r) => (
            <tr key={r.label} className="border-b border-black/20">
              <th scope="row" className="py-3.5 pr-4 text-[15px] font-medium md:text-[16px]">
                {r.label}
              </th>
              {r.cells.map((c, i) => (
                <td key={i} className="py-3.5 pl-4 text-[15px] md:text-[16px]">
                  {c === true ? (
                    <>
                      <span aria-hidden="true" className="inline-block size-2.5 bg-black" />
                      <span className="sr-only">Included</span>
                    </>
                  ) : c === false ? (
                    <>
                      <span aria-hidden="true" className="text-black/35">—</span>
                      <span className="sr-only">Not included</span>
                    </>
                  ) : (
                    c
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td />
            {PLANS.map((p) => (
              <td key={p.name} className="pt-6 pl-4">
                <a
                  href="#download"
                  className={`block px-3 py-3 text-center text-[15px] font-semibold transition-colors ${
                    p.name === "Pro"
                      ? "bg-black text-[#F2F1EC] hover:bg-[#FF4F00] hover:text-black"
                      : "border border-black hover:bg-black hover:text-[#F2F1EC]"
                  }`}
                >
                  {p.cta}
                  <span className="sr-only"> — {p.name}</span>
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ——— Final CTA + footer ——— */

function FinalCTA() {
  return (
    <section id="download" aria-labelledby="download-title" className="relative scroll-mt-14 pt-28 md:pt-44">
      <div className={`${WRAP} ${GRID}`}>
        <div className="col-span-4 grid grid-cols-subgrid border-t border-black pt-3 md:col-span-12">
          <span className={`${MONO} col-span-4 md:col-span-3`}>§ 06 — Download</span>
        </div>
        <h2
          id="download-title"
          className="col-span-4 mt-10 text-[clamp(3rem,12.2vw,12rem)] font-extrabold leading-[0.84] tracking-[-0.062em] md:col-span-12"
        >
          Forget less<span style={{ color: SIGNAL }}>.</span>
        </h2>
        <p className="col-span-4 mt-10 text-[21px] leading-[1.35] tracking-[-0.015em] md:col-span-5 md:col-start-4 md:text-[26px]">
          Free for one device, unlimited notes. Your library is a folder of Markdown files—take it
          with you whenever you like.
        </p>
        <ul className="col-span-4 mt-12 grid grid-cols-2 border-t border-black sm:grid-cols-3 md:col-span-12 md:grid-cols-6">
          {PLATFORMS.map((p, i) => (
            <li key={p} className="border-b border-black/20 md:border-b-0">
              <a
                href="#download"
                className={`group flex h-full flex-col justify-between gap-6 py-4 pr-3 transition-colors hover:bg-black hover:text-[#F2F1EC] md:py-5 ${i > 0 ? "md:border-l md:border-black/20" : ""} md:pl-3`}
              >
                <span className={`${MONO} text-black/60 group-hover:text-[#F2F1EC]/60`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex items-baseline justify-between text-[20px] font-bold tracking-[-0.03em] md:text-[22px]">
                  {p}
                  <span aria-hidden="true" className="text-[16px]">↓</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-28 border-t border-black md:mt-40">
      <div className={`${WRAP} ${GRID} gap-y-10 pt-8 pb-[120px]`}>
        <div className="col-span-4 md:col-span-3">
          <p className="flex items-center gap-2 text-[19px] font-bold tracking-[-0.04em]">
            <span aria-hidden="true" className="size-3" style={{ background: SIGNAL }} />
            Mneme
          </p>
          <p className="mt-3 max-w-[28ch] text-[14px] leading-snug text-black/65">
            Write. Mneme links. You remember.
          </p>
        </div>
        {[
          ["Product", ["Live demo", "Index", "Ask", "Pricing"]],
          ["Platforms", PLATFORMS],
          ["Company", ["Manifesto", "Security", "Changelog", "Contact"]],
        ].map(([h, items]) => (
          <nav key={h as string} aria-label={h as string} className="col-span-2 md:col-span-2">
            <p className={`${MONO} text-black/60`}>{h as string}</p>
            <ul className="mt-3 space-y-1.5 text-[14px]">
              {(items as string[]).map((it) => (
                <li key={it}>
                  <a href="#" className="underline-offset-4 hover:underline">
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <p className={`${MONO} col-span-4 text-black/60 md:col-span-3 md:text-right`}>
          © 2026 Mneme · Set in Inter Tight &amp; JetBrains Mono
        </p>
      </div>
    </footer>
  );
}
