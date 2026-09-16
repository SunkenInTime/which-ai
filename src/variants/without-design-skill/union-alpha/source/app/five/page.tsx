import type { Metadata } from "next";
import NoteDemo from "../components/note-demo";

export const metadata: Metadata = {
  title: "Mycelium — Aurora",
  description: "Iteration 5: calm glassmorphism with aurora gradients.",
};

export default function Five() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 pb-28 text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/20 to-cyan-400/30 blur-3xl"
      />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold tracking-tight">Mycelium</span>
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-300 backdrop-blur">
          Iteration 5 · Aurora
        </span>
      </header>
      <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 text-center">
        <h1 className="mx-auto max-w-3xl bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-5xl leading-tight font-semibold tracking-tight text-transparent sm:text-7xl">
          Your memory, luminous.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
          A second brain that glows at the edges — quietly indexing everything
          you write, read, and think.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#start"
            className="rounded-full bg-white px-7 py-3 font-semibold text-slate-950 shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105"
          >
            Begin
          </a>
          <a
            href="#start"
            className="rounded-full border border-white/20 px-7 py-3 font-semibold text-slate-200 backdrop-blur transition-colors hover:bg-white/10"
          >
            Explore the vault
          </a>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-3">
          {[
            {
              t: "Ambient capture",
              d: "Clip anything from anywhere — it lands in your vault, already tagged.",
            },
            {
              t: "Living links",
              d: "Connections form themselves as you write. Discover notes you forgot.",
            },
            {
              t: "Daily recall",
              d: "A gentle morning digest resurfaces exactly what you need.",
            },
          ].map((f) => (
            <div
              key={f.t}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-md"
            >
              <h3 className="font-semibold text-white">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="start" className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Feel the flow
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-slate-400">
          A working slice of the vault — capture, search, and expand without leaving the page.
        </p>
        <div className="mt-8">
          <NoteDemo tone="dark" />
        </div>
      </section>
    </main>
  );
}
