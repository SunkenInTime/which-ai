import type { Metadata } from "next";
import NoteDemo from "../components/note-demo";

export const metadata: Metadata = {
  title: "Mycelium — Graph",
  description: "Iteration 2: dark, connected knowledge graph.",
};

export default function Two() {
  return (
    <main className="min-h-screen bg-zinc-950 pb-28 text-zinc-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-bold tracking-tight">Mycelium</span>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-emerald-400">
          Iteration 2 · Graph
        </span>
      </header>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-24 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-5xl leading-tight font-semibold tracking-tight sm:text-6xl">
            Every thought,
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              connected.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
            Notes link to notes. Ideas surface when you need them. Your second
            brain grows stronger with every capture.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#start"
              className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
            >
              Plant a thought
            </a>
            <a
              href="#start"
              className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-zinc-200 transition-colors hover:bg-zinc-800"
            >
              Watch it grow
            </a>
          </div>
        </div>
        <div className="relative aspect-square w-full max-w-md justify-self-center">
          <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
            <g stroke="#10b981" strokeOpacity="0.35" strokeWidth="1.5">
              <line x1="200" y1="200" x2="90" y2="110" />
              <line x1="200" y1="200" x2="310" y2="90" />
              <line x1="200" y1="200" x2="330" y2="230" />
              <line x1="200" y1="200" x2="120" y2="320" />
              <line x1="200" y1="200" x2="280" y2="330" />
              <line x1="90" y1="110" x2="310" y2="90" />
              <line x1="330" y1="230" x2="280" y2="330" />
              <line x1="120" y1="320" x2="90" y2="110" />
            </g>
            <g>
              <circle cx="200" cy="200" r="26" fill="#10b981" />
              <circle cx="90" cy="110" r="12" fill="#34d399" />
              <circle cx="310" cy="90" r="16" fill="#6ee7b7" />
              <circle cx="330" cy="230" r="10" fill="#a7f3d0" />
              <circle cx="120" cy="320" r="14" fill="#34d399" />
              <circle cx="280" cy="330" r="9" fill="#6ee7b7" />
            </g>
          </svg>
          <div className="absolute inset-0 -z-10 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>
      </section>
      <section id="start" className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Feed the graph
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-zinc-400">
          Every note you add becomes a node. Search finds the threads between them.
        </p>
        <div className="mt-8">
          <NoteDemo tone="dark" />
        </div>
      </section>
    </main>
  );
}
