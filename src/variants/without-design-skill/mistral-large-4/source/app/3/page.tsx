import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-violet-100 via-rose-50 to-amber-50 text-zinc-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm text-white shadow-md">
            🧠
          </span>
          Mindscape
        </span>
        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex">
          <a href="#features" className="hover:text-zinc-900">Features</a>
          <a href="#magic" className="hover:text-zinc-900">The magic</a>
          <a href="#love" className="hover:text-zinc-900">Loved by</a>
        </nav>
        <Link
          href="./3"
          className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-105"
        >
          Try it free
        </Link>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <span className="rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-600 shadow-sm backdrop-blur">
          Meet your second brain
        </span>
        <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
          Never lose a{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
              great idea
            </span>
            <svg
              aria-hidden
              viewBox="0 0 220 14"
              className="absolute -bottom-2 left-0 h-3 w-full text-amber-400"
              fill="none"
            >
              <path
                d="M3 10 C 60 2, 160 2, 217 8"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          again
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
          Mindscape is the friendly home for your thoughts. Capture a note in
          seconds, and let your second brain connect, organize, and remind you
          — automatically.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="./3"
            className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-fuchsia-500/30 transition-transform hover:scale-105"
          >
            Start capturing — it&apos;s free
          </Link>
          <a
            href="#magic"
            className="rounded-full border-2 border-violet-200 bg-white/70 px-8 py-3.5 text-sm font-bold text-violet-700 backdrop-blur transition-colors hover:border-violet-400"
          >
            See the magic ✨
          </a>
        </div>
        <div className="mt-8 flex items-center gap-3 text-sm text-zinc-500">
          <div className="flex -space-x-2">
            {["bg-violet-400", "bg-fuchsia-400", "bg-amber-400", "bg-rose-400"].map(
              (c) => (
                <span
                  key={c}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${c}`}
                >
                  {c[3].toUpperCase()}
                </span>
              )
            )}
          </div>
          <span>Joined by 40,000+ curious minds</span>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              emoji: "⚡",
              color: "from-violet-400 to-violet-600",
              title: "Capture in a heartbeat",
              body: "Ideas move fast. Mindscape moves faster — one tap and your thought is safe.",
            },
            {
              emoji: "🕸️",
              color: "from-fuchsia-400 to-fuchsia-600",
              title: "Ideas that find each other",
              body: "Notes link themselves into a web of insight. You just write; your brain does the rest.",
            },
            {
              emoji: "🔮",
              color: "from-amber-400 to-amber-600",
              title: "Remember anything",
              body: "Describe it in your own words. Semantic search finds the note, even years later.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-3xl bg-white/80 p-7 shadow-lg shadow-violet-500/10 backdrop-blur transition-transform hover:-translate-y-1"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-2xl shadow-md`}
              >
                {f.emoji}
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="magic" className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="rounded-[2rem] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 p-1 shadow-2xl shadow-fuchsia-500/20">
          <div className="rounded-[1.8rem] bg-white/95 p-10 md:p-16">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                  The magic is in the remembering
                </h2>
                <p className="mt-4 leading-relaxed text-zinc-600">
                  Every note you save becomes part of a living memory. Ask
                  Mindscape &quot;what did I decide about the launch?&quot; and
                  watch the right note surface — context, date, and all.
                </p>
                <Link
                  href="./3"
                  className="mt-8 inline-block rounded-full bg-zinc-900 px-7 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
                >
                  Build your second brain
                </Link>
              </div>
              <div
                aria-hidden
                className="rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 p-6"
              >
                <div className="space-y-3">
                  {[
                    { t: "Ideas for the keynote", d: "outline · 2 days ago", c: "bg-violet-200" },
                    { t: "Coffee with Sam — follow up", d: "reminder · today", c: "bg-fuchsia-200" },
                    { t: "Book notes: Thinking, Fast and Slow", d: "12 highlights", c: "bg-amber-200" },
                  ].map((n) => (
                    <div
                      key={n.t}
                      className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
                    >
                      <span className={`h-9 w-9 rounded-lg ${n.c}`} />
                      <div>
                        <p className="text-sm font-semibold">{n.t}</p>
                        <p className="text-xs text-zinc-400">{n.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="love" className="mx-auto w-full max-w-6xl px-6 pb-24 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Loved by curious minds
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              q: "I stopped losing ideas the day I switched. It feels like my brain, but searchable.",
              a: "Priya, product designer",
            },
            {
              q: "My notes finally talk to each other. The auto-linking is uncanny.",
              a: "Marco, PhD student",
            },
            {
              q: "It's the first notes app I've kept for more than a month.",
              a: "June, writer",
            },
          ].map((t) => (
            <figure
              key={t.a}
              className="rounded-3xl bg-white/80 p-7 text-left shadow-lg shadow-violet-500/10 backdrop-blur"
            >
              <blockquote className="text-sm leading-relaxed text-zinc-700">
                &ldquo;{t.q}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs font-semibold uppercase tracking-widest text-violet-500">
                {t.a}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="border-t border-violet-200/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 text-sm text-zinc-500">
          <span>© 2026 Mindscape — think happy 🧠</span>
          <span>Version 3 · Bloom</span>
        </div>
      </footer>
    </main>
  );
}
