import Link from "next/link";
import { Workbench } from "./workbench";

const differences = [
  {
    title: "Links are written, not filed",
    body: "Type [[ and point at an idea. Your notes stay in the flow of thought instead of a tree of folders.",
  },
  {
    title: "Every note knows who points to it",
    body: "Backlinks appear beside each note, so you see where an idea has travelled, not just where you left it.",
  },
  {
    title: "Suggestions come from meaning",
    body: "Synapse proposes connections based on shared concepts and tags, and you decide which ones are worth keeping.",
  },
];

export default function VariantFour() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[#faf9f6] text-stone-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="h-5 w-5 rounded-md bg-orange-600" />
          Synapse
        </div>
        <nav className="hidden gap-8 text-sm text-stone-500 md:flex">
          <a href="#demo" className="hover:text-stone-900">Demo</a>
          <a href="#why" className="hover:text-stone-900">Why it&apos;s different</a>
          <a href="#" className="hover:text-stone-900">Pricing</a>
        </nav>
        <Link href="#" className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700">
          Get started
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6">
        <section className="mx-auto max-w-4xl pb-16 pt-12 text-center md:pt-20">
          <p className="text-sm font-medium text-orange-700">A workbench for connected thinking</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Stop filing notes. <span className="text-orange-600">Start connecting them.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-stone-600">
            Synapse is a second brain built around links. Write an idea, connect it to the others, and
            watch your notes start to explain each other.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#demo" className="rounded-md bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700">
              Try the live demo
            </a>
            <Link href="#" className="rounded-md border border-stone-300 bg-white px-6 py-3 font-medium text-stone-800 transition-colors hover:bg-stone-50">
              Start for free
            </Link>
          </div>
        </section>

        <section id="demo" className="scroll-mt-8 pb-24">
          <Workbench />
          <p className="mt-4 text-center text-sm text-stone-500">
            This is a working sample. Everything you click here is a real link between notes.
          </p>
        </section>

        <section id="why" className="grid gap-12 border-t border-stone-200 py-20 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Built for thinking in threads.</h2>
            <p className="mt-4 leading-7 text-stone-600">
              Most note apps optimise for storage. Synapse optimises for the moment an idea meets its
              neighbour.
            </p>
          </div>
          <ol className="space-y-8 md:col-span-7 md:col-start-6">
            {differences.map((d, i) => (
              <li key={d.title} className="grid grid-cols-[auto_1fr] gap-5">
                <span className="font-mono text-sm text-orange-600">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 leading-7 text-stone-600">{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-24 flex flex-col items-start justify-between gap-6 rounded-2xl border border-stone-200 bg-white p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Bring your existing notes.</h2>
            <p className="mt-2 text-stone-600">Import from Markdown, Notion or Apple Notes. Links are preserved.</p>
          </div>
          <Link href="#" className="shrink-0 rounded-md bg-stone-900 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700">
            Import my notes
          </Link>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 border-t border-stone-200 px-6 py-8 pb-28 text-sm text-stone-500 md:flex-row md:justify-between">
        <p>© 2026 Synapse</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-stone-800">Docs</a>
          <a href="#" className="hover:text-stone-800">Changelog</a>
          <a href="#" className="hover:text-stone-800">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
