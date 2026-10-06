import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synapse — Map Your Mind",
  description: "Visual note-taking where every idea connects.",
};

const nodes = [
  { id: "memory", label: "Memory", x: 50, y: 50, size: 28, color: "bg-rose-400" },
  { id: "ideas", label: "Ideas", x: 22, y: 28, size: 20, color: "bg-amber-400" },
  { id: "projects", label: "Projects", x: 78, y: 24, size: 22, color: "bg-emerald-400" },
  { id: "people", label: "People", x: 18, y: 72, size: 18, color: "bg-sky-400" },
  { id: "reading", label: "Reading", x: 80, y: 74, size: 20, color: "bg-violet-400" },
  { id: "habits", label: "Habits", x: 50, y: 16, size: 14, color: "bg-teal-300" },
  { id: "goals", label: "Goals", x: 50, y: 86, size: 16, color: "bg-orange-400" },
  { id: "journal", label: "Journal", x: 34, y: 60, size: 12, color: "bg-zinc-400" },
  { id: "books", label: "Books", x: 66, y: 58, size: 12, color: "bg-zinc-400" },
];

const links: [string, string][] = [
  ["memory", "ideas"],
  ["memory", "projects"],
  ["memory", "people"],
  ["memory", "reading"],
  ["ideas", "projects"],
  ["ideas", "habits"],
  ["projects", "goals"],
  ["people", "journal"],
  ["reading", "books"],
  ["reading", "ideas"],
  ["habits", "goals"],
  ["journal", "goals"],
];

export default function VersionFive() {
  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      <header className="mx-auto flex max-w-6xl items-center justify-between px-8 py-6">
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="4" className="fill-rose-400" />
            <circle cx="3" cy="5" r="2" className="fill-amber-400" />
            <circle cx="19" cy="6" r="2" className="fill-emerald-400" />
            <circle cx="4" cy="18" r="2" className="fill-sky-400" />
            <circle cx="18" cy="17" r="2" className="fill-violet-400" />
            <path d="M11 11L3 5M11 11L19 6M11 11L4 18M11 11L18 17" stroke="rgb(148 163 184 / 0.4)" strokeWidth="1" />
          </svg>
          Synapse
        </span>
        <nav className="hidden gap-8 text-sm text-slate-400 md:flex">
          <a href="#graph" className="hover:text-white">The graph</a>
          <a href="#canvas" className="hover:text-white">Canvas</a>
          <a href="#start" className="hover:text-white">Start</a>
        </nav>
        <a
          href="#start"
          className="rounded-full bg-rose-400 px-5 py-2 text-sm font-semibold text-slate-950 transition-transform hover:scale-105"
        >
          Open your graph
        </a>
      </header>

      <main className="mx-auto max-w-6xl px-8">
        <section className="py-20 text-center md:py-28">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
            Visual second brain
          </p>
          <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Map your mind,{" "}
            <span className="text-rose-400">see it think</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
            Synapse turns notes into nodes and thoughts into edges. Watch your
            knowledge grow as a living graph — every idea connected to the
            ideas that sparked it.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#start"
              className="rounded-full bg-rose-400 px-7 py-3 text-sm font-semibold text-slate-950 transition-transform hover:scale-105"
            >
              Build your graph
            </a>
            <a
              href="#graph"
              className="rounded-full border border-slate-700 px-7 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500"
            >
              Explore a demo
            </a>
          </div>
        </section>

        <section id="graph" className="pb-20">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {links.map(([a, b]) => {
                const na = nodeById[a];
                const nb = nodeById[b];
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke="rgb(148 163 184 / 0.25)"
                    strokeWidth="0.3"
                  />
                );
              })}
            </svg>
            {nodes.map((n) => (
              <div
                key={n.id}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div
                  className={`rounded-full ${n.color} shadow-lg`}
                  style={{
                    width: `${n.size}px`,
                    height: `${n.size}px`,
                    boxShadow: "0 0 24px rgb(148 163 184 / 0.25)",
                  }}
                />
                <span className="mt-2 rounded-full bg-slate-800/90 px-2 py-0.5 text-[10px] font-medium text-slate-300 backdrop-blur">
                  {n.label}
                </span>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs text-slate-400 backdrop-blur">
              9 nodes · 12 connections · growing every day
            </div>
          </div>
        </section>

        <section id="canvas" className="grid gap-6 py-20 md:grid-cols-3">
          {[
            {
              title: "Infinite canvas",
              body: "Place notes anywhere. Zoom out to see the shape of your thinking, zoom in to write.",
              dot: "bg-rose-400",
            },
            {
              title: "Edges, not folders",
              body: "Connect any two notes with a line. Knowledge organizes itself around relationships.",
              dot: "bg-amber-400",
            },
            {
              title: "Backlink everything",
              body: "Every connection is two-way. Open any note and see exactly what led to it.",
              dot: "bg-emerald-400",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition-colors hover:border-slate-600"
            >
              <div className={`mb-6 h-3 w-3 rounded-full ${f.dot}`} />
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.body}</p>
            </div>
          ))}
        </section>

        <section id="start" className="py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Start mapping your mind
          </h2>
          <p className="mx-auto mt-6 max-w-md text-slate-400">
            Free while your graph is small. Your second brain will thank you.
          </p>
          <a
            href="#top"
            className="mt-10 inline-block rounded-full bg-rose-400 px-8 py-4 text-sm font-semibold text-slate-950 transition-transform hover:scale-105"
          >
            Create your first node
          </a>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 text-sm text-slate-500">
          <span className="font-semibold text-slate-200">Synapse</span>
          <span>© 2026 Synapse — Map your mind.</span>
        </div>
      </footer>
    </div>
  );
}
