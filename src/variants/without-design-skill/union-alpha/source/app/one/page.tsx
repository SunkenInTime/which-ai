import type { Metadata } from "next";
import NoteDemo from "../components/note-demo";

export const metadata: Metadata = {
  title: "Second Brain — Paper",
  description: "Iteration 1: warm editorial paper aesthetic.",
};

export default function One() {
  return (
    <main className="min-h-screen bg-[#faf7f2] pb-28 text-stone-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-serif text-xl font-bold tracking-tight">Mycelium</span>
        <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium uppercase tracking-widest text-stone-500">
          Iteration 1 · Paper
        </span>
      </header>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-24 text-center">
        <h1 className="font-serif text-5xl leading-tight font-medium tracking-tight sm:text-7xl">
          A quiet place to think.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
          Mycelium turns scattered notes into a living second brain — every capture
          weaves itself into what you already know.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#start"
            className="rounded-full bg-stone-900 px-7 py-3 font-medium text-white transition-colors hover:bg-stone-700"
          >
            Start thinking
          </a>
          <a
            href="#start"
            className="rounded-full border border-stone-300 px-7 py-3 font-medium transition-colors hover:bg-stone-100"
          >
            See how it works
          </a>
        </div>
      </section>
      <section id="start" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl font-medium tracking-tight">
              Try the capture loop
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone-600">
              Type a thought, press Enter, and watch your second brain index it
              instantly. Search everything you&apos;ve ever saved in one field.
            </p>
            <ul className="mt-6 space-y-3 text-stone-700">
              {[
                "Zero-friction capture — one field, no forms",
                "Full-text search across every note and tag",
                "Expandable cards keep the page calm",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-900" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <NoteDemo />
        </div>
      </section>
    </main>
  );
}
