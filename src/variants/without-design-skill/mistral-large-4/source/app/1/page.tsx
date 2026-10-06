import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mnemos — Your Second Brain",
  description: "A calm home for every thought.",
};

export default function VersionOne() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900">

      <header className="mx-auto flex max-w-5xl items-center justify-between px-8 py-8">
        <span className="font-serif text-2xl tracking-tight">Mnemos</span>
        <nav className="hidden gap-8 text-sm text-zinc-500 md:flex">
          <a href="#ideas" className="hover:text-zinc-900">Ideas</a>
          <a href="#memory" className="hover:text-zinc-900">Memory</a>
          <a href="#writing" className="hover:text-zinc-900">Writing</a>
        </nav>
        <a
          href="#start"
          className="rounded-full border border-zinc-900 px-5 py-2 text-sm font-medium transition-colors hover:bg-zinc-900 hover:text-white"
        >
          Start free
        </a>
      </header>

      <main className="mx-auto max-w-5xl px-8">
        <section className="py-24 md:py-36">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            A second brain, finally quiet
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Every thought,
            <br />
            <em className="italic text-zinc-500">kept.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-500">
            Mnemos is a note-taking app built like a mind: ideas link to ideas,
            nothing is ever lost, and everything is exactly where you left it.
          </p>
          <div className="mt-10 flex gap-4">
            <a
              href="#start"
              className="rounded-full bg-zinc-900 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            >
              Start capturing
            </a>
            <a
              href="#ideas"
              className="rounded-full border border-zinc-300 px-7 py-3 text-sm font-medium transition-colors hover:border-zinc-900"
            >
              See how it works
            </a>
          </div>
        </section>

        <section id="ideas" className="grid gap-12 border-t border-zinc-200 py-20 md:grid-cols-3">
          {[
            {
              title: "Capture at the speed of thought",
              body: "A single keystroke opens a fresh note. No folders to decide on, no friction — just you and the idea.",
            },
            {
              title: "Ideas find each other",
              body: "Backlinks form automatically. Mnemos surfaces related notes so your thinking connects itself.",
            },
            {
              title: "Recall anything, instantly",
              body: "Search across every note, image, and scribble. If you wrote it, you'll find it in seconds.",
            },
          ].map((f) => (
            <div key={f.title}>
              <div className="mb-4 h-px w-10 bg-zinc-900" />
              <h3 className="font-serif text-2xl">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-zinc-500">{f.body}</p>
            </div>
          ))}
        </section>

        <section id="memory" className="border-t border-zinc-200 py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-4xl leading-tight">
                Memory that outlasts the moment
              </h2>
              <p className="mt-6 leading-relaxed text-zinc-500">
                Daily notes, project docs, half-formed ideas at 2am — Mnemos
                keeps all of it in one flowing timeline, tagged and searchable
                forever.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-zinc-300" />
                <span className="h-3 w-3 rounded-full bg-zinc-300" />
                <span className="h-3 w-3 rounded-full bg-zinc-300" />
              </div>
              <p className="font-serif text-xl">The meeting notes</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                Q3 roadmap — ship the sync engine first. Talk to Priya about
                the onboarding flow. Remember to look at the churn dashboard
                before Friday. [[See: Q2 retro]]
              </p>
              <div className="mt-4 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-500">
                linked to 12 other notes
              </div>
            </div>
          </div>
        </section>

        <section id="start" className="border-t border-zinc-200 py-24 text-center">
          <h2 className="font-serif text-4xl md:text-5xl">
            Begin your second brain today
          </h2>
          <p className="mx-auto mt-6 max-w-md text-zinc-500">
            Free for personal use. No credit card, no clutter — just a quieter
            place to think.
          </p>
          <a
            href="#top"
            className="mt-10 inline-block rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Get Mnemos free
          </a>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 text-sm text-zinc-400">
          <span className="font-serif text-lg text-zinc-900">Mnemos</span>
          <span>© 2026 Mnemos — Think once, remember forever.</span>
        </div>
      </footer>
    </div>
  );
}
