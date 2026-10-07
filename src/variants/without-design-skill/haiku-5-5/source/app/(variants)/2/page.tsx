import Link from "next/link";

// Fixed positions (percent of the hero box) so the constellation renders identically on server and client.
const nodes = [
  { x: 8, y: 18 }, { x: 22, y: 40 }, { x: 14, y: 68 }, { x: 33, y: 22 },
  { x: 41, y: 58 }, { x: 52, y: 14 }, { x: 60, y: 46 }, { x: 72, y: 26 },
  { x: 80, y: 62 }, { x: 90, y: 20 }, { x: 88, y: 84 }, { x: 64, y: 80 },
  { x: 48, y: 88 }, { x: 28, y: 90 }, { x: 4, y: 88 }, { x: 96, y: 48 },
];

const edges: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [4, 6], [5, 7], [6, 7], [6, 8],
  [7, 9], [8, 10], [11, 8], [11, 12], [12, 13], [13, 2], [14, 2], [9, 15],
  [15, 8], [4, 12], [10, 11],
];

const features = [
  {
    tag: "LINK",
    title: "Backlinks, automatically",
    body: "Mention an idea once and Synapse wires it to every note that touches it. No tagging, no folders.",
  },
  {
    tag: "SURFACE",
    title: "Forgotten notes, resurfaced",
    body: "Your graph is weighted by what you revisit. The threads you've let go of tug back at the right time.",
  },
  {
    tag: "ASK",
    title: "Question your own graph",
    body: "Ask in plain language and get an answer stitched from your notes, with every source one click away.",
  },
];

export default function VariantTwo() {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden bg-[#05060a] text-zinc-100">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-80">
        <div className="absolute left-1/2 top-24 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {edges.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="rgba(139,123,255,0.25)"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        {nodes.map((n, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-node rounded-full bg-violet-300 shadow-[0_0_12px_3px_rgba(167,139,250,0.6)]"
            style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${(i * 0.37) % 3.6}s` }}
          />
        ))}
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5 font-medium tracking-tight">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(167,139,250,0.9)]" />
          Synapse
        </div>
        <nav className="hidden gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#" className="hover:text-white">Graph</a>
          <a href="#" className="hover:text-white">Changelog</a>
        </nav>
        <Link
          href="#"
          className="rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-100 shadow-[0_0_24px_-6px_rgba(139,123,255,0.8)] transition-colors hover:bg-violet-500/25"
        >
          Open Synapse
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 flex-col">
        <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-20 text-center md:pt-28">
          <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-xs text-zinc-300">
            NEW · Graph view 2.0
          </span>
          <h1 className="mt-8 bg-gradient-to-b from-white via-zinc-200 to-violet-300 bg-clip-text text-6xl font-semibold leading-[1.02] tracking-tight text-transparent md:text-8xl">
            Your mind, mapped.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
            Synapse turns scattered notes into a living graph of everything you know, so you can see how
            your ideas connect and where the gaps are.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#"
              className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-7 py-3.5 text-base font-medium text-white shadow-[0_0_40px_-8px_rgba(139,123,255,0.9)] transition-transform hover:-translate-y-0.5"
            >
              Build your graph
            </Link>
            <a
              href="#features"
              className="rounded-full border border-white/15 px-7 py-3.5 text-base font-medium text-zinc-200 transition-colors hover:bg-white/5"
            >
              See the features
            </a>
          </div>

          <dl className="mt-20 grid w-full max-w-3xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[.03] backdrop-blur">
            {[
              ["2.4k", "notes linked daily"],
              ["38%", "fewer duplicate notes"],
              ["5 min", "to review your week"],
            ].map(([value, label]) => (
              <div key={label} className="px-4 py-6">
                <dt className="font-mono text-2xl text-white md:text-3xl">{value}</dt>
                <dd className="mt-1 text-xs text-zinc-500 md:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((f) => (
              <article
                key={f.tag}
                className="group rounded-2xl border border-white/10 bg-white/[.02] p-7 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[.04]"
              >
                <span className="font-mono text-xs tracking-widest text-violet-300">[ {f.tag} ]</span>
                <h3 className="mt-6 text-xl font-semibold text-white">{f.title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{f.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-6 pb-28">
          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-8 font-mono text-sm leading-8 text-zinc-400 shadow-2xl">
            <p className="mb-4 text-xs text-zinc-600">~/second-brain/spaced-repetition.md</p>
            <p>
              Retrieval beats rereading. The biggest gains come from{" "}
              <span className="text-violet-300">[[Retrieval practice]]</span> done on a schedule,
              which I first saw in <span className="text-violet-300">[[Make It Stick]]</span>.
            </p>
            <p>
              It pairs well with the <span className="text-violet-300">[[Memory palace]]</span> idea
              and explains why the <span className="text-violet-300">[[Reading log 2025]]</span> entries
              I never revisited went cold.
            </p>
            <p className="mt-4 text-xs text-emerald-300/80">↳ 4 backlinks · 2 unlinked mentions found</p>
          </div>
        </section>

        <section className="mx-auto mb-24 w-full max-w-4xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent p-10 text-center md:p-16">
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Start with one note.</h2>
            <p className="mx-auto mt-4 max-w-md text-zinc-400">
              The graph builds itself. Synapse is free for your first 500 notes.
            </p>
            <Link
              href="#"
              className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-base font-medium text-zinc-950 transition-transform hover:-translate-y-0.5"
            >
              Create your first node
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-4 border-t border-white/10 px-6 py-8 pb-28 text-sm text-zinc-500 md:flex-row md:justify-between">
        <p>© 2026 Synapse</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-200">Docs</a>
          <a href="#" className="hover:text-zinc-200">Status</a>
          <a href="#" className="hover:text-zinc-200">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
