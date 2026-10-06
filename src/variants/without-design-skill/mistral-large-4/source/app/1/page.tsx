import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-zinc-900">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold tracking-tight">Mindscape</span>
        <nav className="flex items-center gap-6 text-sm text-zinc-500">
          <a href="#features" className="hover:text-zinc-900">Features</a>
          <a href="#how" className="hover:text-zinc-900">How it works</a>
          <Link
            href="./1"
            className="rounded-full bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700"
          >
            Get started
          </Link>
        </nav>
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-400">
          Your second brain
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
          Thinking, organized.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-500">
          Mindscape captures every note, connects every idea, and helps you
          rediscover what you already know. No folders to maintain. No
          thoughts lost.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="./1"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Start free
          </Link>
          <a
            href="#how"
            className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-700 hover:border-zinc-400"
          >
            See how it works
          </a>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-5xl px-6 pb-24"
      >
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Capture instantly",
              body: "Jot ideas the moment they arrive — text, links, images, and voice memos land in one inbox.",
            },
            {
              title: "Connect automatically",
              body: "Mindscape links related notes for you, so your thinking builds a web instead of a pile.",
            },
            {
              title: "Recall effortlessly",
              body: "Search by meaning, not keywords. Ask a question and find the note you half-remember.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-zinc-100 p-6">
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="border-t border-zinc-100 bg-zinc-50">
        <div className="mx-auto w-full max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-semibold tracking-tight">
            Three steps to a clearer mind
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              ["01", "Capture", "Dump everything into your inbox. No structure required."],
              ["02", "Connect", "Mindscape suggests links between your notes as you write."],
              ["03", "Recall", "Search, browse your graph, or ask — your second brain answers."],
            ].map(([n, t, d]) => (
              <li key={n}>
                <span className="text-sm font-medium text-zinc-400">{n}</span>
                <h3 className="mt-2 text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8 text-sm text-zinc-400">
        <span>Mindscape — think once, remember forever.</span>
        <span>Version 1 · Minimal</span>
      </footer>
    </main>
  );
}
