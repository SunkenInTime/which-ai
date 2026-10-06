import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cortex — Your Second Brain, Amplified",
  description: "AI-native note-taking that thinks with you.",
};

export default function VersionTwo() {
  return (
    <div className="min-h-screen bg-black text-white">

      <header className="mx-auto flex max-w-6xl items-center justify-between px-8 py-6">
        <span className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold">
            C
          </span>
          Cortex
        </span>
        <nav className="hidden gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#ai" className="hover:text-white">Intelligence</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
        </nav>
        <a
          href="#start"
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
        >
          Get started
        </a>
      </header>

      <main className="mx-auto max-w-6xl px-8">
        <section className="flex flex-col items-center py-28 text-center md:py-40">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            Now with Cortex Intelligence 2.0
          </div>
          <h1 className="max-w-4xl bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-5xl font-bold leading-[1.05] tracking-tight text-transparent md:text-7xl">
            Your second brain,
            <br />
            amplified by AI
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Cortex captures your notes, connects your ideas, and answers
            questions from everything you&apos;ve ever written. A mind that never
            forgets — and never stops thinking with you.
          </p>
          <div className="mt-10 flex gap-4">
            <a
              href="#start"
              className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition-transform hover:scale-105"
            >
              Start free
            </a>
            <a
              href="#features"
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
            >
              Watch the demo
            </a>
          </div>

          <div className="mt-20 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-2xl shadow-fuchsia-500/10">
            <div className="rounded-xl border border-white/5 bg-gradient-to-b from-zinc-900 to-black p-6 text-left">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold">
                  C
                </span>
                <span className="text-sm font-medium">Cortex Intelligence</span>
                <span className="ml-auto rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-xs text-fuchsia-300">
                  beta
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                “What did I decide about the pricing page last month?”
              </p>
              <div className="mt-4 rounded-lg border border-white/5 bg-white/5 p-4 text-sm leading-relaxed text-zinc-400">
                <span className="text-fuchsia-300">✦</span> You decided to lead
                with the free tier and gate team features. Found in 3 notes —
                “Pricing v3”, “Investor update”, and “Roadmap Q2”.
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="grid gap-6 py-20 md:grid-cols-3">
          {[
            {
              icon: "⚡",
              title: "Instant capture",
              body: "Voice, text, or paste — Cortex files every thought into the right place automatically.",
            },
            {
              icon: "🕸",
              title: "Living knowledge graph",
              body: "Every note links to related notes. Watch your second brain grow in real time.",
            },
            {
              icon: "🔍",
              title: "Ask your notes anything",
              body: "Semantic search across everything you've ever written. Answers, with sources.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-white/20"
            >
              <div className="mb-6 text-3xl">{f.icon}</div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.body}</p>
            </div>
          ))}
        </section>

        <section id="ai" className="py-20">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/50 to-fuchsia-950/50 p-12 text-center md:p-20">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Intelligence woven into every note
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-zinc-400">
              Summarize a hundred pages in one line. Turn messy meeting notes
              into action items. Cortex reads with you, so you can think
              faster.
            </p>
          </div>
        </section>

        <section id="start" className="py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Upgrade your mind
          </h2>
          <a
            href="#top"
            className="mt-10 inline-block rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Get Cortex free
          </a>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 text-sm text-zinc-500">
          <span className="font-semibold text-white">Cortex</span>
          <span>© 2026 Cortex Labs — Your second brain, amplified.</span>
        </div>
      </footer>
    </div>
  );
}
