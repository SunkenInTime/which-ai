import type { Metadata } from "next";
import Link from "next/link";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import s from "./constellation.module.css";
import { SkyGraph } from "./sky-graph";
import { AskDemo } from "./ask-demo";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--m-sans", weight: ["300", "400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--m-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Mneme — a note is a star. A link is a line.",
  description:
    "Mneme links your notes on its own, answers questions from what you’ve written, and brings old thoughts back when they matter. Plain Markdown, on your device.",
};

const GOLD = "#f2d9a0";

/* ------------------------------------------------------------------ */
/* small pieces                                                        */
/* ------------------------------------------------------------------ */

function StarMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 1.5 13.7 10.3 22.5 12l-8.8 1.7L12 22.5l-1.7-8.8L1.5 12l8.8-1.7Z" fill={GOLD} />
      <circle cx="12" cy="12" r="1.6" fill="#060913" />
    </svg>
  );
}

function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className={`${s.mono} flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#8f9ab4]`}>
      <span className="text-[#f2d9a0]">{n}</span>
      <span className="h-px w-8 bg-white/15" aria-hidden="true" />
      {children}
    </p>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-[3px] h-3.5 w-3.5 shrink-0">
      <path d="M8 2 9 7 14 8 9 9 8 14 7 9 2 8 7 7Z" fill={GOLD} fillOpacity="0.85" />
    </svg>
  );
}

const PLATFORMS = ["macOS", "Windows", "Linux", "iOS", "Android", "Web"];

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <div className={`${sans.variable} ${mono.variable} ${s.root} min-h-screen w-full flex-1 overflow-x-clip`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#f2d9a0] focus:px-3 focus:py-2 focus:text-[#060913]"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Manifesto />
        <Features />
        <Observatory />
        <Ask />
        <Private />
        <Voices />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#060913]/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8"
      >
        <Link href="#" className="flex items-center gap-2.5" aria-label="Mneme, home">
          <StarMark />
          <span className="text-[17px] font-medium tracking-[-0.01em] text-white">Mneme</span>
        </Link>
        <ul className="hidden items-center gap-8 text-[14px] text-[#aab4cc] md:flex">
          {[
            ["How it works", "#features"],
            ["Ask", "#ask"],
            ["Privacy", "#private"],
            ["Pricing", "#pricing"],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} className="transition-colors hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="hidden text-[14px] text-[#aab4cc] hover:text-white sm:inline">
            Sign in
          </a>
          <a
            href="#download"
            className="rounded-full bg-[#f2d9a0] px-4 py-2 text-[13.5px] font-medium text-[#0a0f1f] transition hover:bg-[#f7e5bb]"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className={`${s.starfield} pointer-events-none absolute inset-0 opacity-60`} aria-hidden="true" />
      <div className="relative mx-auto max-w-[1240px] px-5 pt-16 sm:px-8 sm:pt-24">
        <p className={`${s.mono} text-[11px] uppercase tracking-[0.2em] text-[#8f9ab4]`}>
          <span className="text-[#f2d9a0]">Mneme 4.2</span> · a second brain · pronounced{" "}
          <span className="normal-case">“nee-mee”</span>
        </p>
        <h1
          id="hero-title"
          className="mt-6 max-w-[14ch] text-[46px] font-normal leading-[0.98] tracking-[-0.04em] text-white sm:text-[72px] lg:text-[92px]"
        >
          Write it down.{" "}
          <span className="text-[#8f9ab4]">Mneme draws the lines.</span>
        </h1>
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[46ch] text-[17px] leading-[1.6] text-[#b4bdd1] sm:text-[18px]">
            A note-taking app that links your thoughts on its own, answers questions from what you’ve
            written, and brings the right note back on the right day. Plain Markdown, on your device,
            entirely yours.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#download"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f2d9a0] px-6 py-3.5 text-[15px] font-medium text-[#0a0f1f] transition hover:bg-[#f7e5bb]"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
                <path d="M8 2v8m0 0 3.5-3.5M8 10 4.5 6.5M3 13.5h10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
              Download for macOS
            </a>
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-[15px] text-white transition hover:border-white/35"
            >
              Open in the browser
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1320px] px-2 sm:mt-6 sm:px-6">
        <SkyGraph />
        <div
          className={`${s.mono} mx-auto flex max-w-[1240px] flex-col gap-3 border-t px-3 pt-4 text-[10.5px] tracking-wide text-[#7d88a3] sm:flex-row sm:items-center sm:justify-between sm:px-2 ${s.hairline}`}
        >
          <p>Fig. 1 — One person’s September. 31 notes, 40 links, drawn by nobody. Hover or tab to a star.</p>
          <p className="flex items-center gap-4" aria-hidden="true">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#eef2ff]" /> note
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-px w-4 bg-[#9fb2e0]/50" /> link
            </span>
            <span className="flex items-center gap-1.5 text-[#f2d9a0]">
              <span className="h-px w-4 bg-[#f2d9a0]" /> suggested just now
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Manifesto() {
  return (
    <section aria-label="Idea" className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8 sm:py-40">
      <p className="max-w-[22ch] text-[34px] font-light leading-[1.12] tracking-[-0.03em] text-white sm:text-[52px] lg:text-[64px]">
        A note is a star. <span className="text-[#8f9ab4]">A link is a line.</span>{" "}
        <span className={s.goldText}>Over time, you get a sky.</span>
      </p>
      <p className="mt-10 max-w-[56ch] text-[17px] leading-[1.7] text-[#9aa4bd]">
        Most note apps are drawers. You put things in; they stay put; you forget which drawer. Mneme
        treats every note as a point of light and keeps quietly working out which ones belong
        together — so the thing you wrote in March is there, already connected, when you need it in
        November.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FeatureRow({
  n,
  kicker,
  title,
  body,
  children,
  id,
}: {
  n: string;
  kicker: string;
  title: string;
  body: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <article
      id={id}
      className={`grid gap-10 border-t py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 ${s.hairline}`}
    >
      <div>
        <Eyebrow n={n}>{kicker}</Eyebrow>
        <h3 className="mt-6 max-w-[16ch] text-[30px] font-normal leading-[1.08] tracking-[-0.03em] text-white sm:text-[40px]">
          {title}
        </h3>
        <div className="mt-5 max-w-[46ch] space-y-4 text-[16px] leading-[1.7] text-[#9aa4bd]">{body}</div>
      </div>
      <div className="min-w-0">{children}</div>
    </article>
  );
}

function Features() {
  const captures = [
    { src: "menubar", key: "⌥ Space", text: "Ask Marco re: Q4 headcount before Thursday", time: "09:14" },
    { src: "email", key: "fwd", text: "Fwd: Hotel Lisboa Plaza — confirmation #48213", time: "11:02" },
    { src: "clipper", key: "web", text: "“As We May Think” — The Atlantic, July 1945", time: "13:40" },
    { src: "phone", key: "share", text: "Photo of the whiteboard after retro, 3 highlights", time: "16:25" },
    { src: "voice", key: "0:42", text: "Walking home — memex, but it files itself?", time: "23:10" },
  ];

  return (
    <section id="features" aria-labelledby="features-title" className="mx-auto max-w-[1240px] px-5 sm:px-8">
      <h2 id="features-title" className="sr-only">
        How a thought becomes a constellation
      </h2>

      <FeatureRow
        n="I"
        kicker="First light · capture"
        title="Catch it before it fades."
        body={
          <>
            <p>
              A thought doesn’t wait for you to open the right app. Mneme takes it from wherever you
              are — the menubar, your phone’s share sheet, a forwarded email, a web page, a voice memo
              on the walk home — and files it into today.
            </p>
            <p className={`${s.mono} text-[12px] text-[#7d88a3]`}>
              menubar · share sheet · you@in.mneme.app · web clipper · voice, transcribed on-device
            </p>
          </>
        }
      >
        <div className={`${s.glass} rounded-2xl p-2`}>
          <div className={`${s.mono} flex items-center justify-between px-4 py-3 text-[10.5px] uppercase tracking-[0.16em] text-[#7d88a3]`}>
            <span>Inbox → daily/2026-09-22.md</span>
            <span className="text-[#f2d9a0]">5 captured</span>
          </div>
          <ul className="space-y-1">
            {captures.map((c, i) => (
              <li
                key={c.src}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 ${i === 4 ? "bg-[#f2d9a0]/[0.06]" : "bg-white/[0.02]"}`}
              >
                <span
                  className={`${s.mono} w-[74px] shrink-0 rounded-md border border-white/10 px-2 py-1 text-center text-[10.5px] text-[#aab4cc]`}
                >
                  {c.key}
                </span>
                <span className="min-w-0 flex-1 truncate text-[14px] text-[#e2e6f0]">{c.text}</span>
                <span className={`${s.mono} hidden text-[10.5px] text-[#7d88a3] sm:inline`}>
                  {c.src} · {c.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </FeatureRow>

      <FeatureRow
        n="II"
        kicker="Lines · links itself"
        title="It notices what belongs together."
        body={
          <>
            <p>
              As you write, Mneme reads alongside you and proposes links to related notes — by meaning,
              not just matching words. Accept with a keystroke, or ignore it. Every note carries its
              backlinks, so nothing is ever only in one place.
            </p>
            <p>You never file anything. The structure just appears, the way constellations do.</p>
          </>
        }
      >
        <div className={`${s.glass} overflow-hidden rounded-2xl`}>
          <div className={`${s.mono} border-b px-5 py-3 text-[10.5px] text-[#7d88a3] ${s.hairline}`}>
            ideas/a-quieter-calendar.md
          </div>
          <div className="px-5 py-5 text-[15px] leading-[1.75] text-[#d3d9e8] sm:px-6">
            <p>
              What if the calendar defended evenings the way it defends meetings? Block 19:00–22:00 by
              default, make people ask. I noticed I sleep worse on days with{" "}
              <span className="rounded bg-[#f2d9a0]/10 px-1 text-[#f2d9a0] underline decoration-[#f2d9a0]/40 decoration-dotted underline-offset-4">
                late calls
              </span>
              <span className={`${s.caret} ml-0.5 inline-block h-[1.1em] w-px translate-y-[3px] bg-[#f2d9a0]`} aria-hidden="true" />
            </p>
          </div>
          <div className="mx-4 mb-4 rounded-xl border border-[#f2d9a0]/25 bg-[#0a0f1f] p-4 sm:mx-5">
            <p className={`${s.mono} text-[10.5px] uppercase tracking-[0.16em] text-[#f2d9a0]`}>
              Mneme noticed
            </p>
            <p className="mt-2 text-[14px] leading-snug text-[#dfe4f0]">
              “late calls” relates to <span className="font-medium text-white">Sleep log, September</span> —
              you wrote “bad night after the 21:30 call with Sydney” on 14 Sep.
            </p>
            <div className="mt-3 flex gap-2">
              <span className={`${s.mono} rounded-md bg-[#f2d9a0] px-2.5 py-1 text-[11px] text-[#0a0f1f]`}>
                ↵ Link
              </span>
              <span className={`${s.mono} rounded-md border border-white/15 px-2.5 py-1 text-[11px] text-[#aab4cc]`}>
                esc Not now
              </span>
            </div>
          </div>
          <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 border-t px-5 py-3 ${s.hairline}`}>
            <span className={`${s.mono} text-[10.5px] uppercase tracking-[0.16em] text-[#7d88a3]`}>
              4 backlinks
            </span>
            {["Daily — 18 Sep", "Why I stopped using folders", "Q4 planning"].map((b) => (
              <span key={b} className="text-[13px] text-[#aab4cc]">
                ↳ {b}
              </span>
            ))}
          </div>
        </div>
      </FeatureRow>

      <FeatureRow
        n="III"
        kicker="Return · resurfacing"
        title="Old light, arriving on time."
        body={
          <>
            <p>
              Each morning, Mneme brings back a handful of notes: what you wrote a year ago today, and
              what quietly relates to what you’re working on now. A few minutes with your own past
              thinking, instead of none.
            </p>
            <p className={`${s.mono} text-[12px] text-[#7d88a3]`}>Pro · never more than five a day · never a push notification unless you ask</p>
          </>
        }
      >
        <div className="space-y-3">
          {[
            {
              tag: "1 year ago today",
              when: "22 Sep 2025",
              title: "Kyoto, day 4 — onsen rules",
              snip: "Wash first, sitting down. Towel on your head, never in the water. Nobody explains this; everybody knows.",
            },
            {
              tag: "Relates to what you’re writing",
              when: "9 Mar 2024",
              title: "Why I stopped using folders",
              snip: "Every folder is a guess about the future. I’m bad at guessing. Links are a record of the past, which I’m better at.",
              lit: true,
            },
            {
              tag: "You flagged this to revisit",
              when: "2 Jan 2026",
              title: "Books to reread",
              snip: "The Extended Mind (again, slower). Gödel, Escher, Bach — just the dialogues. Pilgrim at Tinker Creek.",
            },
          ].map((c, i) => (
            <div
              key={c.title}
              className={`${s.glass} rounded-2xl p-5 ${c.lit ? "border-[#f2d9a0]/30" : ""}`}
              style={{ marginLeft: `${i * 5}%` }}
            >
              <div className={`${s.mono} flex items-center justify-between text-[10.5px] uppercase tracking-[0.14em]`}>
                <span className={c.lit ? "text-[#f2d9a0]" : "text-[#8f9ab4]"}>{c.tag}</span>
                <span className="text-[#7d88a3]">{c.when}</span>
              </div>
              <p className="mt-2.5 text-[16px] font-medium text-white">{c.title}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#9aa4bd]">{c.snip}</p>
            </div>
          ))}
        </div>
      </FeatureRow>

      <FeatureRow
        n="IV"
        kicker="The instruments"
        title="Daily notes, the whole graph, instant search."
        body={
          <p>
            The fundamentals, done carefully. A fresh page every morning. A graph you can actually
            navigate, filtered by time or tag. Full-text search across years of notes that returns
            before you finish typing.
          </p>
        }
      >
        <div className={`${s.glass} rounded-2xl p-2`}>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4 text-[#8f9ab4]">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
              <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="text-[15px] text-white">onsen</span>
            <span className={`${s.mono} ml-auto text-[10.5px] text-[#7d88a3]`}>3 results · 4 ms</span>
          </div>
          <ul className="mt-1">
            {[
              ["Kyoto, day 4 — onsen rules", "Wash first, sitting down. Towel on your head…", "22 Sep 2025"],
              ["Kyoto — reading list", "…Kawabata, and that essay on onsen architecture", "10 Sep 2025"],
              ["Daily — 3 Feb 2026", "Mum asked about the onsen trip for her 70th?", "3 Feb 2026"],
            ].map(([t, sn, d]) => (
              <li key={t} className="flex items-baseline gap-4 rounded-lg px-4 py-3 hover:bg-white/[0.03]">
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] text-white">{t}</p>
                  <p className="truncate text-[13px] text-[#8f9ab4]">{sn}</p>
                </div>
                <span className={`${s.mono} shrink-0 text-[10.5px] text-[#7d88a3]`}>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </FeatureRow>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Observatory() {
  const tree = [
    { t: "Today", k: "⌘T", active: false },
    { t: "Ask", k: "⌘J", active: false },
    { t: "Graph", k: "⌘G", active: false },
  ];
  const notes = [
    "Idea: a quieter calendar",
    "Sleep log, September",
    "Lisbon offsite — budget",
    "1:1 — Marco",
    "Memex, but it files itself?",
    "Mum’s 70th — ideas",
    "San Marzano, week 14",
  ];

  return (
    <section aria-labelledby="obs-title" className="relative mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={`${s.mono} text-[11px] uppercase tracking-[0.2em] text-[#8f9ab4]`}>The app</p>
            <h2
              id="obs-title"
              className="mt-5 max-w-[18ch] text-[36px] font-normal leading-[1.05] tracking-[-0.035em] text-white sm:text-[52px]"
            >
              Quiet on the surface. Busy underneath.
            </h2>
          </div>
          <p className="max-w-[40ch] text-[16px] leading-[1.7] text-[#9aa4bd]">
            A calm writing surface in the middle. Your links, backlinks and a local map of the sky at
            the edges — there when you glance, gone when you don’t.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1320px] px-3 sm:px-6">
        <div
          className="overflow-hidden rounded-[18px] border border-white/10 bg-[#0a0e1c] shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(242,217,160,0.04)]"
          role="img"
          aria-label="The Mneme desktop app: a sidebar of notes, an open note titled ‘Idea: a quieter calendar’, and a panel showing backlinks, a suggested link, and a small local graph."
        >
          {/* title bar */}
          <div className="flex h-11 items-center gap-2 border-b border-white/[0.07] bg-[#0c1122] px-4">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
            <span className={`${s.mono} mx-auto truncate pl-4 text-[11px] text-[#7d88a3]`}>
              ~/Mneme/ideas/a-quieter-calendar.md
            </span>
            <span className={`${s.mono} hidden items-center gap-1.5 text-[10.5px] text-[#7d88a3] sm:flex`}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#7fd1a8]" /> synced · encrypted
            </span>
          </div>

          <div className="grid min-h-[560px] grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[230px_1fr_300px]">
            {/* sidebar */}
            <aside className="hidden border-r border-white/[0.06] bg-[#090d1a] p-4 md:block">
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2 text-[12.5px] text-[#7d88a3]">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Search
                <span className={`${s.mono} ml-auto text-[10px]`}>⌘K</span>
              </div>
              <ul className="mt-4 space-y-0.5 text-[13px]">
                {tree.map((x) => (
                  <li key={x.t} className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-[#b4bdd1]">
                    {x.t}
                    <span className={`${s.mono} text-[10px] text-[#5f6982]`}>{x.k}</span>
                  </li>
                ))}
              </ul>
              <p className={`${s.mono} mt-6 px-2.5 text-[10px] uppercase tracking-[0.16em] text-[#5f6982]`}>Recent</p>
              <ul className="mt-2 space-y-0.5 text-[13px]">
                {notes.map((n, i) => (
                  <li
                    key={n}
                    className={`truncate rounded-md px-2.5 py-1.5 ${i === 0 ? "bg-white/[0.06] text-white" : "text-[#9aa4bd]"}`}
                  >
                    {n}
                  </li>
                ))}
              </ul>
              <p className={`${s.mono} mt-6 px-2.5 text-[10px] uppercase tracking-[0.16em] text-[#5f6982]`}>Daily</p>
              <div className="mt-2 grid grid-cols-7 gap-1 px-2.5">
                {Array.from({ length: 28 }, (_, i) => {
                  const v = [2, 0, 1, 3, 1, 0, 2, 3, 2, 1, 0, 2, 3, 1, 1, 2, 0, 3, 2, 1, 3, 2, 1, 2, 3, 0, 2, 3][i];
                  return (
                    <span
                      key={i}
                      className="aspect-square rounded-[3px]"
                      style={{
                        background: i === 27 ? GOLD : `rgba(159,178,224,${0.06 + v * 0.1})`,
                      }}
                    />
                  );
                })}
              </div>
            </aside>

            {/* editor */}
            <div className="px-6 py-8 sm:px-12 sm:py-12">
              <p className={`${s.mono} text-[11px] text-[#7d88a3]`}>18 Sep 2026 · edited 2 min ago · 312 words</p>
              <h3 className="mt-3 text-[28px] font-medium tracking-[-0.02em] text-white sm:text-[32px]">
                Idea: a quieter calendar
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {["#ideas", "#work", "#sleep"].map((t) => (
                  <span key={t} className={`${s.mono} rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-[#9aa4bd]`}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-7 max-w-[62ch] space-y-5 text-[15.5px] leading-[1.75] text-[#cdd4e4]">
                <p>
                  What if the calendar defended evenings the way it defends meetings? Block 19:00–22:00
                  by default and make people ask. Came out of the{" "}
                  <span className="text-[#f2d9a0] underline decoration-[#f2d9a0]/35 underline-offset-4">Team retro, August</span>{" "}
                  — three of five people said “evening calls” unprompted.
                </p>
                <h4 className="pt-2 text-[17px] font-medium text-white">Why it might work</h4>
                <ul className="space-y-2 pl-1">
                  <li className="flex gap-3">
                    <span className="text-[#5f6982]">–</span>
                    <span>
                      Defaults beat willpower. See{" "}
                      <span className="text-[#f2d9a0] underline decoration-[#f2d9a0]/35 underline-offset-4">Why I stopped using folders</span>.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#5f6982]">–</span>
                    <span>Sydney and Lisbon overlap 08:00–09:00 their time. Use mornings.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#5f6982]">–</span>
                    <span>Sleep is measurably worse after late calls (4 of 5 nights in Sept).</span>
                  </li>
                </ul>
                <h4 className="pt-2 text-[17px] font-medium text-white">Next</h4>
                <ul className="space-y-2 pl-1">
                  <li className="flex items-center gap-3">
                    <span className="flex h-4 w-4 items-center justify-center rounded border border-[#f2d9a0]/60 bg-[#f2d9a0]/15 text-[10px] text-[#f2d9a0]">✓</span>
                    <span className="text-[#8f9ab4] line-through decoration-[#5f6982]">Draft a one-pager for Marco</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-4 w-4 rounded border border-white/25" />
                    <span>Try it on my own calendar for two weeks, starting 28 Sep</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* right panel */}
            <aside className="hidden border-l border-white/[0.06] bg-[#090d1a] p-5 lg:block">
              <p className={`${s.mono} text-[10px] uppercase tracking-[0.16em] text-[#5f6982]`}>Local sky</p>
              <svg viewBox="0 0 260 170" className="mt-3 w-full rounded-lg border border-white/[0.06] bg-[#070a15]">
                {[
                  [130, 85, 60, 40],
                  [130, 85, 205, 50],
                  [130, 85, 70, 130],
                  [130, 85, 190, 135],
                  [130, 85, 130, 25],
                  [60, 40, 130, 25],
                  [190, 135, 225, 100],
                ].map(([a, b, c, d], i) => (
                  <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#9fb2e0" strokeOpacity="0.25" />
                ))}
                <line x1="130" y1="85" x2="225" y2="100" stroke={GOLD} strokeOpacity="0.8" strokeDasharray="3 3" />
                {[
                  [60, 40],
                  [205, 50],
                  [70, 130],
                  [190, 135],
                  [130, 25],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#dfe6fb" />
                ))}
                <circle cx="225" cy="100" r="3.2" fill={GOLD} />
                <circle cx="130" cy="85" r="14" fill={GOLD} fillOpacity="0.12" />
                <circle cx="130" cy="85" r="5" fill="#fbecc6" />
              </svg>

              <p className={`${s.mono} mt-6 text-[10px] uppercase tracking-[0.16em] text-[#5f6982]`}>Backlinks · 4</p>
              <ul className="mt-2 space-y-2">
                {[
                  ["Daily — 18 Sep 2026", "…started a note on a quieter calendar…"],
                  ["Q4 planning — three themes", "…theme 3: protect focus, see calendar idea"],
                  ["1:1 — Marco", "…he’s in if it’s opt-out, not opt-in"],
                ].map(([t, sn]) => (
                  <li key={t} className="rounded-lg border border-white/[0.06] px-3 py-2">
                    <p className="text-[12.5px] text-white">{t}</p>
                    <p className="truncate text-[12px] text-[#7d88a3]">{sn}</p>
                  </li>
                ))}
              </ul>

              <p className={`${s.mono} mt-6 text-[10px] uppercase tracking-[0.16em] text-[#f2d9a0]`}>Suggested · 1</p>
              <div className="mt-2 rounded-lg border border-[#f2d9a0]/25 bg-[#f2d9a0]/[0.05] px-3 py-2">
                <p className="text-[12.5px] text-white">Sleep log, September</p>
                <p className="text-[12px] text-[#9aa4bd]">Mentions late calls on 4 nights</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Ask() {
  return (
    <section id="ask" aria-labelledby="ask-title" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <Eyebrow n="V">Ask your notes</Eyebrow>
          <h2
            id="ask-title"
            className="mt-6 max-w-[15ch] text-[36px] font-normal leading-[1.05] tracking-[-0.035em] text-white sm:text-[52px]"
          >
            Ask a question. Get your own answer back.
          </h2>
        </div>
        <p className="max-w-[46ch] text-[16px] leading-[1.7] text-[#9aa4bd] lg:justify-self-end">
          Ask in plain language. Mneme answers only from what you’ve written, and cites the exact notes
          it used — so you can see where every sentence came from, and check it. If your notes don’t
          know, neither does Mneme. It says so.
        </p>
      </div>
      <div className="mt-14">
        <AskDemo />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Private() {
  const specs = [
    {
      h: "Plain Markdown files",
      p: "Every note is a .md file in a folder you choose. Open them in any editor. Leave any time and take everything.",
    },
    {
      h: "End-to-end encrypted sync",
      p: "Notes are encrypted on your device before they travel. Your keys never leave your devices; we can’t read them, and neither can anyone who asks us.",
    },
    {
      h: "Offline, fully",
      p: "Writing, search, links and the graph all work on a plane. Sync catches up when you land.",
    },
  ];
  return (
    <section id="private" aria-labelledby="private-title" className={`border-y ${s.hairline} bg-[#050811]`}>
      <div className="mx-auto grid max-w-[1240px] gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Eyebrow n="VI">Local-first & private</Eyebrow>
          <h2
            id="private-title"
            className="mt-6 max-w-[14ch] text-[36px] font-normal leading-[1.05] tracking-[-0.035em] text-white sm:text-[52px]"
          >
            Your sky stays over your house.
          </h2>
          <dl className="mt-10 space-y-8">
            {specs.map((x) => (
              <div key={x.h} className="grid gap-2 sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="text-[15px] font-medium text-white">{x.h}</dt>
                <dd className="text-[15px] leading-[1.65] text-[#9aa4bd]">{x.p}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={`${s.glass} self-center rounded-2xl p-6 sm:p-8`}>
          <p className={`${s.mono} text-[10.5px] uppercase tracking-[0.16em] text-[#7d88a3]`}>
            Finder → ~/Mneme
          </p>
          <pre className={`${s.mono} mt-5 overflow-x-auto text-[12.5px] leading-[1.9] text-[#b4bdd1]`}>
{`~/Mneme
├── daily/
│   ├── 2026-09-21.md
│   └── 2026-09-22.md        `}<span className="text-[#f2d9a0]">{`← today`}</span>{`
├── ideas/
│   └── a-quieter-calendar.md
├── work/
│   ├── lisbon-offsite-budget.md
│   └── 1-1-marco.md
├── garden/
│   └── san-marzano-week-14.md
└── .mneme/                  `}<span className="text-[#7d88a3]">{`← local index`}</span>
          </pre>
          <div className={`mt-6 border-t pt-5 ${s.hairline}`}>
            <pre className={`${s.mono} overflow-x-auto text-[12px] leading-[1.8] text-[#8f9ab4]`}>
{`$ head -4 ideas/a-quieter-calendar.md
---
created: 2026-09-18T22:41
links: [team-retro-august, sleep-log-september]
---`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Voices() {
  const quotes = [
    {
      q: "I’ve tried every graph app. Mneme is the first where the graph showed me something I didn’t already know: two research threads, eleven months apart, about the same question.",
      n: "Hana Kovač",
      r: "PhD candidate, cognitive science",
    },
    {
      q: "Before a board meeting I asked it what we’d promised investors in Q1. It answered in four sentences and cited six of my own notes. I checked every one.",
      n: "Tomás Ferreira",
      r: "COO, 40-person design studio",
    },
    {
      q: "The morning resurfacing is the only notification I look forward to. Some days it’s a recipe. Some days it’s a whole chapter I’d forgotten I’d started.",
      n: "Adaeze Obi",
      r: "Novelist",
    },
  ];
  return (
    <section aria-labelledby="voices-title" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
      <h2 id="voices-title" className={`${s.mono} text-[11px] uppercase tracking-[0.2em] text-[#8f9ab4]`}>
        From people with a few thousand stars
      </h2>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
        {quotes.map((x) => (
          <figure key={x.n} className="flex flex-col justify-between gap-10 bg-[#060913] p-7 sm:p-9">
            <blockquote className="text-[18px] leading-[1.55] tracking-[-0.01em] text-[#dfe4f0]">
              “{x.q}”
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <StarMark className="h-3.5 w-3.5" />
              <span className="text-[14px] text-white">{x.n}</span>
              <span className={`${s.mono} text-[10.5px] text-[#7d88a3]`}>{x.r}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      unit: "forever",
      blurb: "For one person on one device.",
      items: [
        "Unlimited notes",
        "Automatic links & backlinks",
        "Daily notes, graph view, instant search",
        "Capture from menubar, email, web, voice",
        "Plain Markdown, local-first",
        "1 device",
      ],
      cta: "Download free",
    },
    {
      name: "Pro",
      price: "$8",
      unit: "per month",
      blurb: "Your whole sky, on every device.",
      items: [
        "Everything in Free",
        "End-to-end encrypted sync, unlimited devices",
        "Ask your notes, with citations",
        "Daily resurfacing feed",
        "Priority support from people who use it",
      ],
      cta: "Start 14 days free",
      featured: true,
    },
    {
      name: "Teams",
      price: "$14",
      unit: "per user / month",
      blurb: "Shared constellations for small teams.",
      items: [
        "Everything in Pro",
        "Shared spaces with per-space access",
        "Links across personal and shared notes — only you see your side",
        "Ask across a shared space",
        "Central billing & admin",
      ],
      cta: "Talk to us",
    },
  ];

  return (
    <section id="pricing" aria-labelledby="pricing-title" className={`border-t ${s.hairline}`}>
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="pricing-title"
            className="max-w-[16ch] text-[36px] font-normal leading-[1.05] tracking-[-0.035em] text-white sm:text-[52px]"
          >
            Free to begin. Fair when it grows.
          </h2>
          <p className="max-w-[40ch] text-[16px] leading-[1.7] text-[#9aa4bd]">
            Notes are never capped and never held hostage. Downgrade any time — your files stay exactly
            where they are.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl p-7 sm:p-8 ${
                t.featured
                  ? "border border-[#f2d9a0]/40 bg-[linear-gradient(180deg,rgba(242,217,160,0.07),rgba(242,217,160,0.01)_40%)]"
                  : "border border-white/[0.09] bg-white/[0.015]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-medium text-white">{t.name}</h3>
                {t.featured && (
                  <span className={`${s.mono} rounded-full border border-[#f2d9a0]/40 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#f2d9a0]`}>
                    Most chosen
                  </span>
                )}
              </div>
              <p className="mt-2 text-[14px] text-[#9aa4bd]">{t.blurb}</p>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-[52px] font-light leading-none tracking-[-0.04em] text-white">{t.price}</span>
                <span className={`${s.mono} text-[11px] text-[#8f9ab4]`}>{t.unit}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-[14.5px] text-[#cdd4e4]">
                {t.items.map((i) => (
                  <li key={i} className="flex gap-3">
                    <Check />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#download"
                className={`mt-10 inline-flex items-center justify-center rounded-full px-5 py-3 text-[14.5px] font-medium transition ${
                  t.featured
                    ? "bg-[#f2d9a0] text-[#0a0f1f] hover:bg-[#f7e5bb]"
                    : "border border-white/15 text-white hover:border-white/35"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section id="download" aria-labelledby="cta-title" className="relative overflow-hidden">
      <div className={`${s.starfield} pointer-events-none absolute inset-0`} aria-hidden="true" />
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 400"
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto w-full max-w-[1200px] opacity-50"
      >
        <polyline
          points="120,300 260,220 380,250 520,140 640,170 760,90 900,130 1080,60"
          fill="none"
          stroke="#9fb2e0"
          strokeOpacity="0.25"
        />
        {[
          [120, 300],
          [260, 220],
          [380, 250],
          [520, 140],
          [640, 170],
          [760, 90],
          [900, 130],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="2.5" fill="#dfe6fb" />
        ))}
        <circle cx="1080" cy="60" r="16" fill={GOLD} fillOpacity="0.12" />
        <circle cx="1080" cy="60" r="4" fill={GOLD} />
      </svg>
      <div className="relative mx-auto max-w-[1240px] px-5 py-32 text-center sm:px-8 sm:py-44">
        <h2
          id="cta-title"
          className="mx-auto max-w-[16ch] text-[44px] font-normal leading-[1] tracking-[-0.04em] text-white sm:text-[72px]"
        >
          Start with one note tonight.
        </h2>
        <p className="mx-auto mt-6 max-w-[40ch] text-[18px] leading-[1.6] text-[#9aa4bd]">
          In a year, you’ll look up and find a sky.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#download"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#f2d9a0] px-7 py-3.5 text-[15px] font-medium text-[#0a0f1f] transition hover:bg-[#f7e5bb] sm:w-auto"
          >
            Download Mneme — free
          </a>
          <a
            href="#pricing"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-[15px] text-white transition hover:border-white/35 sm:w-auto"
          >
            Compare plans
          </a>
        </div>
        <ul className={`${s.mono} mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-[#7d88a3]`}>
          {PLATFORMS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Footer() {
  const cols = [
    { h: "Product", l: ["Download", "Pricing", "Changelog", "Roadmap"] },
    { h: "Learn", l: ["Guides", "Markdown format", "Security whitepaper", "Import from other apps"] },
    { h: "Company", l: ["About", "Manifesto", "Careers", "Contact"] },
  ];
  return (
    <footer className={`border-t ${s.hairline} bg-[#04060d]`}>
      <div className="mx-auto max-w-[1240px] px-5 pb-[120px] pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <StarMark />
              <span className="text-[17px] font-medium text-white">Mneme</span>
            </div>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.65] text-[#8f9ab4]">
              Named for the Greek muse of memory, and pronounced “nee-mee.” Made by a small team who
              kept losing their own good ideas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.h}>
                <h3 className={`${s.mono} text-[10.5px] uppercase tracking-[0.18em] text-[#7d88a3]`}>{c.h}</h3>
                <ul className="mt-4 space-y-2.5 text-[14px] text-[#b4bdd1]">
                  {c.l.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`${s.mono} mt-16 flex flex-col gap-2 border-t pt-6 text-[10.5px] tracking-wide text-[#7d88a3] sm:flex-row sm:justify-between ${s.hairline}`}
        >
          <p>© 2026 Mneme Labs. Your notes are yours.</p>
          <p>Sky over this page rendered from 31 sample notes.</p>
        </div>
      </div>
    </footer>
  );
}
