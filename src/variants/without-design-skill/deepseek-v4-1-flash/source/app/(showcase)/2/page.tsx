import EmailCapture from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/email-capture";
import { features, quotes, stats } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/lib/content";
import { ArrowIcon, FeatureIcon, Mark } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/icons";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cortex — 2. Night Graph",
};


const NODES = [
  { x: 50, y: 50, r: 7, label: "self", core: true },
  { x: 22, y: 27, r: 4.6, label: "reading" },
  { x: 78, y: 24, r: 4.2, label: "work" },
  { x: 84, y: 62, r: 4.8, label: "decisions" },
  { x: 58, y: 82, r: 4.2, label: "health" },
  { x: 19, y: 68, r: 4.4, label: "people" },
  { x: 38, y: 14, r: 3.2, label: "" },
  { x: 67, y: 43, r: 3, label: "" },
  { x: 33, y: 47, r: 3, label: "" },
  { x: 45, y: 90, r: 2.8, label: "" },
  { x: 92, y: 41, r: 2.6, label: "" },
  { x: 9, y: 44, r: 2.6, label: "" },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 7], [0, 8],
  [1, 6], [1, 8], [1, 11], [2, 6], [2, 7], [2, 10], [3, 7],
  [3, 10], [4, 9], [5, 9], [5, 11], [4, 8], [5, 8],
];

export default function NightGraph() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080c] font-sans text-[#e8e9f2] selection:bg-[#7c6cf6] selection:text-white">
      {/* ambient field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% -10%, rgba(94,77,214,0.20), transparent 55%), radial-gradient(circle at 88% 18%, rgba(34,197,180,0.13), transparent 45%), radial-gradient(circle at 6% 65%, rgba(124,108,246,0.12), transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      <div className="relative">
        {/* Nav */}
        <header className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-6 md:px-10">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative flex size-8 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04]">
              <Mark className="size-4 text-[#a99cff]" />
            </span>
            <span className="font-grotesk text-[17px] font-medium tracking-[-0.01em]">Cortex</span>
            <span className="ml-1 rounded-full border border-white/10 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-white/40">
              BETA
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-[13px] text-white/55 md:flex">
            <a className="transition hover:text-white" href="#graph">The graph</a>
            <a className="transition hover:text-white" href="#features">Capabilities</a>
            <a className="transition hover:text-white" href="#voices">Voices</a>
            <a className="transition hover:text-white" href="#download">Early access</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#download" className="hidden text-[13px] text-white/55 transition hover:text-white sm:block">
              Sign in
            </a>
            <a
              href="#download"
              className="group flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-[13px] font-medium text-[#0a0b10] transition hover:bg-[#c9c2ff]"
            >
              Get Cortex
              <ArrowIcon className="size-3.5" />
            </a>
          </div>
        </header>

        {/* Hero */}
        <section id="top" className="mx-auto max-w-[1240px] px-6 pt-10 pb-8 md:px-10 md:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pr-3 pl-1">
                <span className="rounded-full bg-[#7c6cf6]/18 px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] text-[#b7acff]">
                  NEW
                </span>
                <span className="text-[12px] text-white/60">Ask-your-archive is out of beta</span>
              </div>

              <h1 className="mt-6 font-grotesk text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[0.98] tracking-[-0.035em]">
                Think in
                <br />
                <span className="bg-gradient-to-r from-[#b7acff] via-[#8f7dff] to-[#4fd6c2] bg-clip-text text-transparent">
                  connected
                </span>
                <br />
                fragments.
              </h1>

              <p className="mt-7 max-w-[46ch] text-[15.5px] leading-[1.7] text-white/55">
                Cortex turns scattered notes into a living graph. Drop in a thought and it
                finds the neighbours — the meeting, the book, the person, the decision —
                without you building a single folder.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#download"
                  className="group flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#8f7dff] to-[#6d5ae8] px-5 py-3 text-[14px] font-medium text-white shadow-[0_10px_30px_-8px_rgba(124,108,246,0.65)] transition hover:brightness-110"
                >
                  Build your graph
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#graph"
                  className="flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.03] px-5 py-3 text-[14px] text-white/75 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
                >
                  Watch a graph form
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-white/35">
                <span>local-first</span>
                <span className="size-1 rounded-full bg-white/20" />
                <span>end-to-end encrypted</span>
                <span className="size-1 rounded-full bg-white/20" />
                <span>markdown out, always</span>
              </div>
            </div>

            {/* Graph visual */}
            <div id="graph" className="relative">
              <div
                aria-hidden
                className="absolute inset-6 rounded-full bg-[#7c6cf6]/20 blur-[70px] [animation:gallery-without-design-skill-deepseek-v4-1-flash-source-app-globals-cortex-glow_9s_ease-in-out_infinite]"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d14]/80 p-2 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-sm">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#ff5f57]/70" />
                    <span className="size-2 rounded-full bg-[#febc2e]/70" />
                    <span className="size-2 rounded-full bg-[#28c840]/70" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.06em] text-white/30">
                    graph / today
                  </span>
                </div>

                <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_50%,#101322,#070810_72%)]">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
                    <defs>
                      <radialGradient id="nodeCore" cx="50%" cy="50%">
                        <stop offset="0%" stopColor="#c9c0ff" />
                        <stop offset="55%" stopColor="#8f7dff" />
                        <stop offset="100%" stopColor="#5a44d8" />
                      </radialGradient>
                      <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#8f7dff" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#4fd6c2" stopOpacity="0.30" />
                      </linearGradient>
                    </defs>

                    {EDGES.map(([a, b], i) => (
                      <line
                        key={i}
                        x1={NODES[a].x}
                        y1={NODES[a].y}
                        x2={NODES[b].x}
                        y2={NODES[b].y}
                        stroke="url(#edge)"
                        strokeWidth={a === 0 || b === 0 ? 0.42 : 0.28}
                        strokeDasharray={i % 3 === 0 ? "2 3" : undefined}
                        style={
                          i % 3 === 0
                            ? { animation: `gallery-without-design-skill-deepseek-v4-1-flash-source-app-globals-cortex-dash ${6 + (i % 5)}s linear infinite` }
                            : undefined
                        }
                      />
                    ))}

                    {NODES.map((n, i) => (
                      <g key={i}>
                        {n.core && (
                          <circle cx={n.x} cy={n.y} r={13} fill="#8f7dff" opacity={0.12}>
                            <animate attributeName="r" values="11;15;11" dur="6s" repeatCount="indefinite" />
                          </circle>
                        )}
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r={n.r}
                          fill={n.core ? "url(#nodeCore)" : i % 3 === 0 ? "#4fd6c2" : "#8f7dff"}
                          opacity={n.core ? 1 : 0.85}
                        />
                      </g>
                    ))}

                    {NODES.filter((n) => n.label).map((n) => (
                      <text
                        key={n.label}
                        x={n.x}
                        y={n.y + n.r + 5.4}
                        textAnchor="middle"
                        fill="#ffffff"
                        fillOpacity={n.core ? 0.85 : 0.42}
                        fontSize="3.1"
                        fontFamily="var(--font-jetbrains), monospace"
                        letterSpacing="0.12"
                      >
                        {n.label}
                      </text>
                    ))}
                  </svg>

                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-lg border border-white/8 bg-[#0a0c14]/85 px-3 py-2 backdrop-blur">
                    <span className="font-mono text-[10px] text-white/45">
                      <span className="text-[#9d8dff]">38,214</span> links
                    </span>
                    <span className="hidden font-mono text-[10px] text-white/[0.18] sm:inline">
                      ⌘K to search the brain
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stat strip */}
        <section className="mx-auto max-w-[1240px] px-6 md:px-10">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/8 bg-white/[0.06] md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#07080c] px-5 py-5">
                <div className="font-grotesk text-[22px] leading-none tracking-[-0.02em] text-white">
                  {s.value}
                </div>
                <div className="mt-2 font-mono text-[10px] leading-relaxed tracking-[0.04em] text-white/35">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-[1240px] px-6 pt-24 pb-6 md:px-10 md:pt-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-[20ch] font-grotesk text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] tracking-[-0.03em]">
              Four loops that keep the graph alive.
            </h2>
            <p className="max-w-[38ch] text-[14px] leading-[1.7] text-white/45">
              Every feature exists to answer one question: can you find the thought
              again, three years later, without remembering where you put it?
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-white/8 bg-white/[0.06] md:grid-cols-2">
            {features.map((f) => (
              <article
                key={f.kicker}
                className="group relative bg-[#08090e] p-7 transition-colors hover:bg-[#0c0e17] md:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#a99cff] transition group-hover:border-[#7c6cf6]/40 group-hover:bg-[#7c6cf6]/10">
                    <FeatureIcon name={f.icon} className="size-5" />
                  </span>
                  <span className="font-mono text-[10px] text-white/20">{f.kicker}</span>
                </div>
                <h3 className="mt-6 font-grotesk text-[19px] tracking-[-0.01em] text-white">
                  {f.title}
                </h3>
                <p className="mt-2.5 max-w-[42ch] text-[13.5px] leading-[1.7] text-white/45">
                  {f.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Quotes */}
        <section id="voices" className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-6 md:grid-cols-3">
            {quotes.map((q, i) => (
              <figure
                key={q.name}
                className={`rounded-xl border border-white/8 bg-gradient-to-b from-white/[0.05] to-transparent p-6 ${
                  i === 1 ? "md:translate-y-5" : ""
                }`}
              >
                <div className="flex gap-0.5 text-[#a99cff]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                      <path d="M6 0l1.6 3.9L11.7 4 8.6 6.6l1 4.2L6 8.5 2.4 10.8l1-4.2L.3 4l4.1-.1z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-[13.5px] leading-[1.7] text-white/70">
                  “{q.body}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2.5 border-t border-white/8 pt-4">
                  <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7c6cf6] to-[#4fd6c2] font-mono text-[10px] font-semibold text-[#07080c]">
                    {q.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span className="text-[11.5px] leading-tight">
                    <span className="block text-white/80">{q.name}</span>
                    <span className="block text-white/35">{q.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="download" className="mx-auto max-w-[1240px] px-6 pb-24 md:px-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d15] px-6 py-14 text-center md:px-16 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-[#6d5ae8]/25 blur-[90px]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-[24ch] font-grotesk text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.03em]">
                Your next thought should have a neighbour.
              </h2>
              <p className="mx-auto mt-4 max-w-[44ch] text-[14px] leading-[1.7] text-white/45">
                Import from Obsidian, Notion or plain files in about ninety seconds.
                Nothing is ever locked away.
              </p>
              <EmailCapture
                className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row"
                inputClassName="w-full rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:border-[#7c6cf6]/60 focus:outline-none"
                buttonClassName="w-full shrink-0 rounded-lg bg-white px-5 py-3 text-[14px] font-medium text-[#0a0b10] transition hover:bg-[#c9c2ff] sm:w-auto"
                buttonLabel="Get early access"
                successClassName="mx-auto mt-8 max-w-md rounded-lg border border-[#4fd6c2]/30 bg-[#4fd6c2]/10 px-4 py-3 text-[13.5px] text-[#a9f0e4]"
                successMessage="You're in. We'll email a build link shortly."
              />
              <p className="mt-4 font-mono text-[10.5px] text-white/25">
                free tier · 1,000 notes · no credit card
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/8">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-6 py-9 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="flex items-center gap-2.5">
              <Mark className="size-4 text-white/25" />
              <span className="font-mono text-[11px] text-white/30">
                Cortex Labs · built for people with too many tabs open
              </span>
            </div>
            <div className="flex flex-wrap gap-6 font-mono text-[11px] text-white/30">
              <a className="transition hover:text-white/70" href="#features">Capabilities</a>
              <a className="transition hover:text-white/70" href="#voices">Voices</a>
              <a className="transition hover:text-white/70" href="#download">Early access</a>
              <a className="transition hover:text-white/70" href="#top">Back to top</a>
            </div>
          </div>
        </footer>

        <div className="h-24" />
      </div>
    </div>
  );
}
