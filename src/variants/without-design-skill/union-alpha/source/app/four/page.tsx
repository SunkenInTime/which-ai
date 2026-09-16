import type { Metadata } from "next";
import NoteDemo from "../components/note-demo";

export const metadata: Metadata = {
  title: "Mycelium — Brutal",
  description: "Iteration 4: bold brutalist type-driven design.",
};

export default function Four() {
  return (
    <main className="min-h-screen bg-black pb-28 text-white">
      <header className="flex items-center justify-between border-b border-white/15 px-6 py-5">
        <span className="text-lg font-black uppercase tracking-tight">
          Mycelium
        </span>
        <span className="border border-white/30 px-3 py-1 text-xs font-bold uppercase tracking-widest">
          Iteration 4 · Brutal
        </span>
      </header>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-lime-400">
          Second brain software
        </p>
        <h1 className="text-6xl leading-[0.95] font-black uppercase tracking-tight sm:text-8xl">
          Think
          <br />
          <span className="text-lime-400">harder.</span>
          <br />
          Write
          <br />
          <span className="text-lime-400">lighter.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
          No folders. No friction. Dump every idea into one inbox and let
          Mycelium file, link, and resurface it at the right moment.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#start"
            className="bg-lime-400 px-8 py-4 font-black uppercase text-black transition-colors hover:bg-lime-300"
          >
            Get access
          </a>
          <a
            href="#start"
            className="border-2 border-white px-8 py-4 font-black uppercase transition-colors hover:bg-white hover:text-black"
          >
            Read the manifesto
          </a>
        </div>
        <dl className="mt-20 grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-3">
          {[
            ["12k+", "minds upgraded"],
            ["0", "folders required"],
            ["∞", "connections made"],
          ].map(([v, l]) => (
            <div key={l} className="bg-black p-8">
              <dt className="text-4xl font-black text-lime-400">{v}</dt>
              <dd className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-400">
                {l}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section id="start" className="mx-auto max-w-3xl border-2 border-white px-6 py-10">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight">
          Test it. Right here.
        </h2>
        <div className="mt-8">
          <NoteDemo tone="dark" />
        </div>
      </section>
    </main>
  );
}
