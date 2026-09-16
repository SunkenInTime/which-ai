import type { Metadata } from "next";
import NoteDemo from "../components/note-demo";

export const metadata: Metadata = {
  title: "Mycelium — Playful",
  description: "Iteration 3: bright, colorful, sticky-note energy.",
};

export default function Three() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-b from-violet-50 via-white to-amber-50 pb-28 text-zinc-900">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-extrabold tracking-tight">Mycelium</span>
        <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
          Iteration 3 · Playful
        </span>
      </header>
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-24 text-center">
        <div className="inline-flex -rotate-2 rounded-xl bg-amber-300 px-4 py-1.5 text-sm font-bold text-amber-900 shadow-[3px_3px_0_#000]">
          Your brain, but tidier
        </div>
        <h1 className="mx-auto mt-8 max-w-3xl text-5xl leading-[1.1] font-black tracking-tight sm:text-7xl">
          Capture now.
          <br />
          <span className="text-violet-600">Find it forever.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-zinc-600">
          Jot it, tag it, forget it — Mycelium remembers so you don&apos;t have
          to. Instant search across everything you&apos;ve ever saved.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#start"
            className="rounded-xl bg-violet-600 px-7 py-3 font-bold text-white shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-0.5"
          >
            Try it free
          </a>
          <a
            href="#start"
            className="rounded-xl bg-white px-7 py-3 font-bold shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-0.5"
          >
            Take the tour
          </a>
        </div>
        <div className="relative mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { t: "Research", bg: "bg-amber-200", r: "-rotate-3" },
            { t: "Ideas", bg: "bg-emerald-200", r: "rotate-2" },
            { t: "To-dos", bg: "bg-sky-200", r: "-rotate-2" },
            { t: "Snippets", bg: "bg-rose-200", r: "rotate-3" },
          ].map((c) => (
            <div
              key={c.t}
              className={`${c.bg} ${c.r} rounded-xl p-4 text-left font-bold text-zinc-800 shadow-[3px_3px_0_#000] transition-transform hover:rotate-0`}
            >
              {c.t}
              <div className="mt-2 space-y-1.5">
                <div className="h-1.5 w-full rounded bg-black/15" />
                <div className="h-1.5 w-4/5 rounded bg-black/15" />
                <div className="h-1.5 w-3/5 rounded bg-black/15" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="start" className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="text-center text-3xl font-black tracking-tight">
          Poke the demo — it&apos;s real
        </h2>
        <div className="mt-8 rotate-1 rounded-2xl bg-white p-2 shadow-[6px_6px_0_#000] transition-transform hover:rotate-0">
          <NoteDemo />
        </div>
      </section>
    </main>
  );
}
