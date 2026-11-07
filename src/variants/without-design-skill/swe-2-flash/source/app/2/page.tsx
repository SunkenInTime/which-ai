import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import {
  APP_NAME,
  testimonials,
  logos,
} from "../lib/content";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jbmono",
});

const display = grotesk.className;
const sans = `${grotesk.className} ${mono.variable}`;

const NODES = [
  { x: 60, y: 80, r: 5, c: "#8B7CFF", d: "0s", label: "seed" },
  { x: 180, y: 40, r: 3.5, c: "#4DE3FF", d: "0.6s" },
  { x: 300, y: 110, r: 4, c: "#8B7CFF", d: "1.1s", label: "idea" },
  { x: 420, y: 60, r: 3, c: "#4DE3FF", d: "1.6s" },
  { x: 540, y: 130, r: 5, c: "#7CFFB2", d: "0.3s", label: "hub" },
  { x: 660, y: 70, r: 3.5, c: "#8B7CFF", d: "0.9s" },
  { x: 740, y: 160, r: 4, c: "#4DE3FF", d: "1.3s" },
  { x: 140, y: 190, r: 4, c: "#7CFFB2", d: "2s" },
  { x: 260, y: 250, r: 5, c: "#8B7CFF", d: "0.4s", label: "link" },
  { x: 400, y: 230, r: 3, c: "#4DE3FF", d: "1.8s" },
  { x: 520, y: 290, r: 4, c: "#8B7CFF", d: "0.8s" },
  { x: 650, y: 260, r: 3.5, c: "#7CFFB2", d: "1.5s", label: "node" },
  { x: 90, y: 320, r: 3, c: "#4DE3FF", d: "2.2s" },
  { x: 220, y: 360, r: 4, c: "#8B7CFF", d: "1.2s" },
  { x: 380, y: 350, r: 5, c: "#7CFFB2", d: "0.5s", label: "synapse" },
  { x: 560, y: 370, r: 3, c: "#4DE3FF", d: "1.7s" },
  { x: 700, y: 340, r: 4, c: "#8B7CFF", d: "2.4s" },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 7], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [4, 6],
  [5, 6], [7, 8], [2, 8], [8, 9], [9, 10], [10, 11], [4, 10], [11, 12],
  [7, 12], [8, 13], [13, 14], [10, 14], [14, 15], [11, 15], [15, 16],
  [6, 16], [4, 8], [2, 9],
];

function NetworkGraph() {
  return (
    <svg
      viewBox="0 0 800 420"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B7CFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4DE3FF" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {EDGES.map(([a, b], i) => {
        const na = NODES[a];
        const nb = NODES[b];
        return (
          <line
            key={i}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="url(#edgeGrad)"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="4 6"
            className="animate-[dash-flow_1.4s_linear_infinite]"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        );
      })}
      {NODES.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r + 8}
            fill={n.c}
            opacity="0.12"
            className="animate-[pulse-dot_3s_ease-in-out_infinite]"
            style={{ animationDelay: n.d }}
          />
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} />
          {n.label && (
            <text
              x={n.x}
              y={n.y - n.r - 8}
              textAnchor="middle"
              fill="#E8ECF8"
              fillOpacity="0.55"
              fontSize="10"
              fontFamily="var(--font-jbmono), monospace"
            >
              {n.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

function LogoMarquee() {
  const row = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] py-6">
      <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-14">
        {[...row, ...row].map((l, i) => (
          <span
            key={i}
            className="font-mono text-sm tracking-[0.25em] text-white/30 uppercase"
          >
            {l}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#05070F] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#05070F] to-transparent" />
    </div>
  );
}

const bentoIcons = [
  // graph
  <svg key="g" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <circle cx="5" cy="6" r="2.5" /><circle cx="19" cy="6" r="2.5" />
    <circle cx="12" cy="18" r="2.5" /><path d="M7.2 7.5l3.6 8M16.8 7.5l-3.6 8M7.5 6h9" />
  </svg>,
  // links
  <svg key="l" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
    <path d="M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
  </svg>,
  // sync
  <svg key="s" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v6h-6" />
  </svg>,
  // shield
  <svg key="p" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  // command
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <rect x="3" y="3" width="18" height="18" rx="4" /><path d="M8 11h.01M16 11h.01M9.5 15.5a3.5 3.5 0 0 0 5 0" />
  </svg>,
  // spark
  <svg key="d" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1M7.7 16.3l-2.1 2.1" />
  </svg>,
];

const bentoTitles = [
  "Graph view",
  "Bidirectional links",
  "Offline-first sync",
  "Private by default",
  "Command palette",
  "Daily notes",
];

const bentoBodies = [
  "Watch ideas cluster and connect in real time. Zoom from a single note to your entire second brain.",
  "Every note knows what points to it. Navigate your thinking in both directions, forever.",
  "Capture anywhere, sync everywhere. Works in tunnels, on planes, and in dead zones.",
  "End-to-end encryption on every note. Not even we can read your mind.",
  "⌘K to do anything — link notes, search the graph, or jump to today's page in milliseconds.",
  "A fresh page every morning, templates for everything else. Structure without the friction.",
];

export default function IterationTwo() {
  return (
    <div
      className={`${sans} min-h-screen overflow-x-clip bg-[#05070F] text-[#E8ECF8] antialiased`}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] animate-[drift_22s_ease-in-out_infinite] rounded-full bg-[#7C6CFF]/15 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] animate-[drift_26s_ease-in-out_infinite_reverse] rounded-full bg-[#4DE3FF]/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[350px] w-[350px] animate-[drift_30s_ease-in-out_infinite] rounded-full bg-[#7CFFB2]/8 blur-[140px]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className={`${display} flex items-center gap-2.5 text-xl font-bold tracking-tight`}>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B7CFF] opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-br from-[#8B7CFF] to-[#4DE3FF]" />
          </span>
          {APP_NAME}
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.18em] text-white/50 md:flex">
          <a href="#features" className="transition-colors hover:text-white">Product</a>
          <a href="#graph" className="transition-colors hover:text-white">Graph</a>
          <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
        </nav>
        <a
          href="#"
          className="rounded-full bg-gradient-to-r from-[#7C6CFF] to-[#4DB8FF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#7C6CFF]/25 transition-transform hover:-translate-y-0.5"
        >
          Start free
        </a>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-14 text-center md:pt-20">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7CFFB2]" />
          Second brain OS · v2.0
        </p>
        <h1
          className={`${display} mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl`}
        >
          Your thoughts,{" "}
          <span className="bg-gradient-to-r from-[#8B7CFF] via-[#6EA8FF] to-[#4DE3FF] bg-clip-text text-transparent">
            wired together
          </span>
          .
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/55">
          {APP_NAME} turns scattered notes into a living knowledge graph.
          Every idea you capture is automatically linked to everything it
          connects to.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="rounded-full bg-gradient-to-r from-[#7C6CFF] to-[#4DB8FF] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#7C6CFF]/30 transition-all hover:-translate-y-0.5"
          >
            Start building
          </a>
          <a
            href="#graph"
            className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
          >
            Explore the graph
          </a>
        </div>

        {/* Network visual */}
        <div id="graph" className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute inset-0 -z-10 scale-110 rounded-[2rem] bg-gradient-to-tr from-[#8B7CFF]/25 via-transparent to-[#4DE3FF]/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl shadow-black/60 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                synapse://graph/live
              </p>
              <p className="font-mono text-[10px] text-[#7CFFB2]">● live</p>
            </div>
            <div className="relative h-[340px] sm:h-[420px]">
              <NetworkGraph />
            </div>
          </div>
          {/* Floating chips */}
          <div className="absolute -left-2 top-16 hidden animate-[float-y_6s_ease-in-out_infinite] rounded-xl border border-white/10 bg-[#0B1024]/90 px-4 py-2.5 font-mono text-[11px] text-white/70 shadow-xl backdrop-blur md:block">
            <span className="text-[#8B7CFF]">⟲</span> 14 backlinks
          </div>
          <div className="absolute -right-2 top-1/3 hidden animate-[float-y_7s_ease-in-out_infinite_1s] rounded-xl border border-white/10 bg-[#0B1024]/90 px-4 py-2.5 font-mono text-[11px] text-white/70 shadow-xl backdrop-blur md:block">
            <span className="text-[#4DE3FF]">⚡</span> synced 38ms ago
          </div>
          <div className="absolute bottom-16 left-8 hidden animate-[float-y_8s_ease-in-out_infinite_0.5s] rounded-xl border border-white/10 bg-[#0B1024]/90 px-4 py-2.5 font-mono text-[11px] text-white/70 shadow-xl backdrop-blur lg:block">
            <span className="text-[#7CFFB2]">✦</span> cluster: “memory”
          </div>
        </div>
      </section>

      <LogoMarquee />

      {/* Stats */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            ["2.4M+", "notes linked daily"],
            ["38ms", "median sync time"],
            ["99.99%", "uptime, 4 years running"],
            ["AES-256", "encryption everywhere"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className={`${display} bg-gradient-to-r from-white to-white/60 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl`}>
                {v}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bento features */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8B7CFF]">
          {"// Capabilities"}
        </p>
        <h2 className={`${display} mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl`}>
          A nervous system for your notes.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bentoTitles.map((t, i) => (
            <div
              key={t}
              className={`group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] ${
                i === 0 ? "lg:col-span-2 lg:row-span-2 flex flex-col" : ""
              }`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B7CFF]/20 to-[#4DE3FF]/20 text-[#9DB4FF] transition-colors group-hover:text-white">
                {bentoIcons[i]}
              </div>
              <h3 className={`${display} mt-5 text-lg font-semibold`}>{t}</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">{bentoBodies[i]}</p>
              {i === 0 && (
                <div className="relative mt-6 flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-black/30">
                  <svg viewBox="0 0 300 160" className="h-full w-full">
                    <g stroke="#8B7CFF" strokeOpacity="0.4" strokeWidth="1">
                      <line x1="40" y1="40" x2="150" y2="80" />
                      <line x1="150" y1="80" x2="250" y2="50" />
                      <line x1="150" y1="80" x2="140" y2="130" />
                      <line x1="40" y1="40" x2="70" y2="120" />
                    </g>
                    <g fill="#8B7CFF">
                      <circle cx="150" cy="80" r="5" />
                      <circle cx="40" cy="40" r="3" />
                      <circle cx="250" cy="50" r="3" />
                      <circle cx="140" cy="130" r="3" />
                      <circle cx="70" cy="120" r="2.5" />
                    </g>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Signal / log section */}
      <section className="relative z-10 border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#4DE3FF]">
              {"// Under the hood"}
            </p>
            <h2 className={`${display} mt-4 text-4xl font-bold tracking-tight sm:text-5xl`}>
              Every note is a signal.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-white/55">
              {APP_NAME} doesn&apos;t just store text — it indexes meaning.
              Semantic links surface connections you didn&apos;t know you
              made.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#8B7CFF] transition-colors hover:text-white"
            >
              Read the engineering blog →
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 font-mono text-[13px] leading-7">
            {[
              ["12:04:31", "note://ideas/topology", "linked → 14 notes"],
              ["12:04:32", "graph.sync", "cluster “memory” merged"],
              ["12:04:33", "note://reading/memex", "backlink discovered"],
              ["12:04:35", "embed.index", "128 vectors updated"],
              ["12:04:36", "note://daily/2026-11-06", "auto-linked 3 items"],
              ["12:04:38", "graph.sync", "layout recomputed · 0.8ms"],
              ["12:04:40", "search.query", "“distributed cognition” → 6 hits"],
            ].map(([t, src, msg], i) => (
              <div
                key={i}
                className="flex items-baseline gap-4 border-b border-white/[0.05] px-5 py-2.5 last:border-0"
              >
                <span className="text-white/30">{t}</span>
                <span className="text-[#8B7CFF]">{src}</span>
                <span className="ml-auto text-white/45">{msg}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 px-5 py-3 text-[#7CFFB2]">
              <span className="animate-pulse">▊</span>
              <span className="text-white/30">listening…</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
        <p className={`${display} text-3xl font-medium leading-snug tracking-tight text-white/90 sm:text-4xl`}>
          &ldquo;The graph view alone is worth it. I can finally see which
          ideas are overgrown — and which are lonely.&rdquo;
        </p>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
          {testimonials[1].name} — {testimonials[1].role}
        </p>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#8B7CFF]/15 via-[#0B1024] to-[#4DE3FF]/10 px-8 py-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,124,255,0.15),transparent_60%)]" />
          <h2 className={`${display} relative text-4xl font-bold tracking-tight sm:text-5xl`}>
            Give your mind a network.
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-[15px] leading-7 text-white/55">
            Free forever for personal use. Import everything you have — the
            graph does the rest.
          </p>
          <a
            href="#"
            className="relative mt-9 inline-block rounded-full bg-gradient-to-r from-[#7C6CFF] to-[#4DB8FF] px-9 py-4 text-sm font-semibold text-white shadow-xl shadow-[#7C6CFF]/30 transition-all hover:-translate-y-0.5"
          >
            Start free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <p className={`${display} font-bold`}>
            {APP_NAME}
            <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-widest text-white/30">
              second brain os
            </span>
          </p>
          <div className="flex gap-8 font-mono text-xs uppercase tracking-[0.18em] text-white/40">
            <a href="#" className="transition-colors hover:text-white">Docs</a>
            <a href="#" className="transition-colors hover:text-white">API</a>
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/25">
            © 2026 {APP_NAME}
          </p>
        </div>
      </footer>
    </div>
  );
}
