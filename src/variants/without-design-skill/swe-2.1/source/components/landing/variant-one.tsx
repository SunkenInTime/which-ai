import type { CSSProperties } from "react";

const featureCards = [
  {
    title: "Capture at the speed of thought",
    description:
      "Drop in voice notes, web clippings, PDFs, meeting fragments, and half-formed ideas before they disappear.",
    accent: "from-cyan-300 to-blue-500",
  },
  {
    title: "Let connections emerge",
    description:
      "Engram maps entities, concepts, projects, and people into a living graph that gets more useful every day.",
    accent: "from-violet-300 to-fuchsia-500",
  },
  {
    title: "Recall with context",
    description:
      "Ask a question and receive the note, the source, the surrounding thinking, and the next useful association.",
    accent: "from-emerald-300 to-cyan-500",
  },
];

const graphNodes = [
  { cx: 154, cy: 92, r: 8, label: "Focus" },
  { cx: 88, cy: 148, r: 5, label: "Deep work" },
  { cx: 211, cy: 158, r: 6, label: "Writing" },
  { cx: 143, cy: 219, r: 5, label: "Habits" },
  { cx: 242, cy: 92, r: 4, label: "Research" },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M2 8h11M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KnowledgeGraph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 280"
      className="h-full w-full"
      fill="none"
    >
      <path
        d="M154 92 88 148M154 92l57 66M154 92l88 0M88 148l55 71M211 158l-68 61M211 158l31-66"
        stroke="url(#graph-line)"
        strokeWidth="1.2"
        strokeDasharray="4 7"
      />
      <path
        d="M154 92C126 117 115 153 143 219"
        stroke="rgba(103,232,249,.32)"
        strokeWidth="8"
        strokeLinecap="round"
        className="animate-glow-breathe"
      />
      {graphNodes.map((node, index) => (
        <g key={node.label}>
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r + 9}
            fill={index === 0 ? "rgba(103,232,249,.16)" : "rgba(167,139,250,.11)"}
            className="animate-pulse-node"
            style={{ animationDelay: `${index * 0.34}s` }}
          />
          <circle
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={index === 0 ? "#67e8f9" : "#a78bfa"}
          />
          <text
            x={node.cx + 12}
            y={node.cy + 4}
            fill="rgba(226,232,240,.78)"
            fontSize="10"
            fontFamily="var(--font-geist-mono)"
          >
            {node.label}
          </text>
        </g>
      ))}
      <defs>
        <linearGradient id="graph-line" x1="70" x2="250" y1="80" y2="220">
          <stop stopColor="#67e8f9" stopOpacity=".7" />
          <stop offset="1" stopColor="#c084fc" stopOpacity=".55" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function VariantOne() {
  return (
    <main className="noise-texture dark-noise relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="blueprint-grid absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-cyan-500/16 blur-3xl" />
        <div className="absolute bottom-[-16rem] right-[-10rem] h-[36rem] w-[36rem] rounded-full bg-violet-600/18 blur-3xl" />
        <div className="absolute left-[-12rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-700/12 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between py-6">
          <a href="/without-design-skill/swe-2.1/1" className="flex items-center gap-3" aria-label="Engram home">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 shadow-lg shadow-cyan-500/10">
              <span className="h-3.5 w-3.5 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,.9)]" />
              <span className="absolute h-6 w-6 rounded-full border border-cyan-200/30" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Engram</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-slate-400 md:flex" aria-label="Primary navigation">
            <a className="transition hover:text-white" href="#capture">Capture</a>
            <a className="transition hover:text-white" href="#graph">Graph</a>
            <a className="transition hover:text-white" href="#recall">Recall</a>
          </nav>
          <a
            href="#access"
            className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:border-cyan-200/50 hover:bg-cyan-300/10"
          >
            Request access
          </a>
        </header>

        <section className="grid flex-1 items-center gap-14 pb-20 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:pt-4">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-200/20 bg-cyan-300/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,1)]" />
              Associative memory engine
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
              Your second brain should think in{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                connections.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl sm:leading-9">
              Engram turns scattered notes into an intelligent memory mesh—capturing fragments, revealing relationships, and resurfacing exactly what matters when your work needs it.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#access"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-cyan-300 px-6 py-4 text-sm font-bold text-slate-950 shadow-2xl shadow-cyan-500/25 transition hover:bg-cyan-200"
              >
                Build your memory mesh
                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>
              <a
                href="#graph"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/8"
              >
                Explore the graph
              </a>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-7">
              {[
                ["12k", "ideas linked"],
                ["94%", "faster recall"],
                ["0", "folders needed"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-mono text-2xl font-semibold text-white">{value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto h-[620px] w-full max-w-xl lg:h-[650px]" id="graph">
            <div className="absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/16 blur-3xl" />
            <div className="absolute inset-x-3 top-4 h-[440px] overflow-hidden rounded-[2rem] border border-white/12 bg-slate-950/72 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl sm:inset-x-8">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.65rem] text-slate-400">
                  memory.mesh
                </div>
              </div>
              <div className="grid h-[calc(100%-61px)] grid-cols-[0.78fr_1.22fr]">
                <aside className="border-r border-white/10 p-4">
                  <div className="mb-4 rounded-2xl border border-cyan-200/20 bg-cyan-300/8 p-3">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-200">Live capture</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      “Attention is not scarce when context is immediate.”
                    </p>
                  </div>
                  {[
                    ["Meeting fragment", "2m ago"],
                    ["Book highlight", "18m ago"],
                    ["Voice memo", "1h ago"],
                  ].map(([title, time]) => (
                    <div key={title} className="mb-3 rounded-xl border border-white/8 bg-white/[0.035] p-3">
                      <p className="text-xs font-medium text-slate-300">{title}</p>
                      <p className="mt-1 font-mono text-[0.62rem] text-slate-500">{time}</p>
                    </div>
                  ))}
                </aside>
                <div className="relative p-3">
                  <KnowledgeGraph />
                  <div className="absolute bottom-4 left-4 right-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/88 p-3 backdrop-blur">
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent animate-shimmer-line" />
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cyan-200">Suggested association</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Link “Focus” with your February essay on attention residue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-float-slow absolute bottom-28 left-0 w-56 rounded-3xl border border-violet-200/20 bg-violet-950/55 p-4 shadow-2xl shadow-violet-950/40 backdrop-blur-xl" style={{ "--float-rotate": "-3deg" } as CSSProperties}>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-violet-200">AI synthesis</p>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                Three notes this week point to the same thesis: your best ideas emerge after uninterrupted mornings.
              </p>
            </div>

            <div className="animate-float-slow absolute bottom-5 right-0 w-64 rounded-3xl border border-cyan-200/20 bg-cyan-950/52 p-4 shadow-2xl shadow-cyan-950/35 backdrop-blur-xl" style={{ "--float-rotate": "2deg", animationDelay: "1.2s" } as CSSProperties}>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cyan-200">Recall query</p>
                <span className="rounded-full bg-cyan-300/15 px-2 py-1 font-mono text-[0.6rem] text-cyan-100">4 sources</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                “What did I learn about creative endurance?”
              </p>
              <div className="mt-4 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-300 to-violet-300" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="capture" className="relative z-10 border-t border-white/10 bg-white/[0.025] px-5 py-20 backdrop-blur sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200">Memory infrastructure</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Notes stop being storage. They become cognition.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-400">
              Instead of forcing you to organize every thought, Engram observes structure as it emerges and keeps your original context intact.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featureCards.map((feature, index) => (
              <article key={feature.title} className="group rounded-[1.75rem] border border-white/10 bg-slate-950/62 p-6 shadow-xl shadow-black/20 transition hover:border-cyan-200/25 hover:bg-slate-900/70">
                <div className={`mb-8 h-1.5 w-16 rounded-full bg-gradient-to-r ${feature.accent}`} />
                <p className="font-mono text-xs text-slate-500">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="recall" className="relative z-10 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/9 to-white/[0.025] p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-violet-200">Field note</p>
            <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-[-0.02em] text-white sm:text-3xl">
              “I stopped searching for notes. The right ones started appearing inside the work I was already doing.”
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 font-mono text-sm font-bold text-slate-950">MK</div>
              <div>
                <p className="text-sm font-semibold text-white">Mina Kim</p>
                <p className="text-sm text-slate-500">Research lead, Northstar Labs</p>
              </div>
            </div>
          </div>
          <div id="access" className="flex flex-col justify-center rounded-[2rem] border border-cyan-200/18 bg-cyan-300/8 p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-100">Private beta</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white">Remember everything. Organize nothing.</h2>
            <div className="mt-8 flex overflow-hidden rounded-full border border-white/14 bg-slate-950/70 p-1.5">
              <label htmlFor="neural-email" className="sr-only">Email address</label>
              <input
                id="neural-email"
                type="email"
                placeholder="you@work.com"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-100" type="button">
                Join
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
