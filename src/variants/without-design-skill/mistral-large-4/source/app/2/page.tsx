import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500 text-xs font-bold text-white">
            M
          </span>
          Mindscape
        </span>
        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#graph" className="hover:text-white">Knowledge graph</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
        </nav>
        <Link
          href="./2"
          className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition-colors hover:bg-indigo-400"
        >
          Open your brain
        </Link>
      </header>

      <section className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-28 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute left-1/4 top-2/3 h-[300px] w-[300px] rounded-full bg-fuchsia-600/10 blur-[100px]" />
        </div>
        <span className="relative rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-indigo-300 backdrop-blur">
          The second brain for builders
        </span>
        <h1 className="relative mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Your mind,{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            amplified
          </span>
        </h1>
        <p className="relative mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Mindscape is where your notes stop being files and start being
          knowledge. Capture everything, connect the dots automatically, and
          recall any idea in seconds.
        </p>
        <div className="relative mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="./2"
            className="rounded-full bg-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition-colors hover:bg-indigo-400"
          >
            Start building your brain
          </Link>
          <a
            href="#graph"
            className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/40"
          >
            Explore the graph
          </a>
        </div>
        <p className="relative mt-6 text-xs text-zinc-500">
          Free for personal use · No credit card required
        </p>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "✦",
              title: "Frictionless capture",
              body: "A global quick-capture shortcut dumps any thought into your inbox before it evaporates.",
            },
            {
              icon: "⬡",
              title: "Auto-linking",
              body: "Every note you write is woven into a living graph of your ideas — no manual tagging.",
            },
            {
              icon: "◈",
              title: "Semantic recall",
              body: "Ask in plain language. Your second brain finds the note you forgot you wrote.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:bg-white/[0.06]"
            >
              <span className="text-2xl text-indigo-400">{f.icon}</span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="graph" className="border-t border-white/10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Watch your thinking take shape
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              The knowledge graph turns scattered notes into a map of how you
              think. Zoom out to see the big picture, zoom in to revisit a
              single idea.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Backlinks created automatically as you write
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Daily notes that stitch your days together
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Graph view of every connection you&apos;ve made
              </li>
            </ul>
          </div>
          <div
            aria-hidden
            className="relative aspect-square w-full rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/60 to-fuchsia-950/40 p-8"
          >
            <svg viewBox="0 0 400 400" className="h-full w-full">
              <g stroke="rgba(165,180,252,0.35)" strokeWidth="1.5">
                <line x1="200" y1="200" x2="90" y2="110" />
                <line x1="200" y1="200" x2="310" y2="90" />
                <line x1="200" y1="200" x2="330" y2="260" />
                <line x1="200" y1="200" x2="120" y2="310" />
                <line x1="200" y1="200" x2="230" y2="340" />
                <line x1="90" y1="110" x2="310" y2="90" />
                <line x1="120" y1="310" x2="230" y2="340" />
                <line x1="310" y1="90" x2="330" y2="260" />
              </g>
              <g fill="#1e1b4b" stroke="#818cf8" strokeWidth="2">
                <circle cx="200" cy="200" r="26" fill="#4f46e5" />
                <circle cx="90" cy="110" r="16" />
                <circle cx="310" cy="90" r="16" />
                <circle cx="330" cy="260" r="16" />
                <circle cx="120" cy="310" r="16" />
                <circle cx="230" cy="340" r="16" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Simple pricing
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-8">
            <h3 className="text-lg font-semibold">Explorer</h3>
            <p className="mt-2 text-4xl font-bold">
              Free<span className="text-base font-normal text-zinc-500"> forever</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Unlimited notes, auto-linking, and semantic search for personal
              use.
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-500/50 bg-indigo-500/10 p-8">
            <h3 className="text-lg font-semibold">Architect</h3>
            <p className="mt-2 text-4xl font-bold">
              $8<span className="text-base font-normal text-zinc-400"> / month</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              Everything in Explorer, plus team spaces, version history, and
              priority recall.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 text-sm text-zinc-500">
          <span>© 2026 Mindscape</span>
          <span>Version 2 · Noir</span>
        </div>
      </footer>
    </main>
  );
}
