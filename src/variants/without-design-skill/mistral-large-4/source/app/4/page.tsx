import Link from "next/link";

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

export default function Page() {
  return (
    <main
      className="flex min-h-screen flex-col bg-[#faf7f2] text-[#1c1917]"
      style={serif}
    >
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between border-b border-[#e7e0d5] px-6 py-6">
        <span className="text-xl font-bold italic tracking-tight">Mindscape</span>
        <nav className="flex items-center gap-8 text-sm">
          <a href="#essay" className="hover:underline">Essay</a>
          <a href="#principles" className="hover:underline">Principles</a>
          <Link
            href="./4"
            className="rounded-full border border-[#1c1917] px-5 py-2 text-sm transition-colors hover:bg-[#1c1917] hover:text-[#faf7f2]"
          >
            Subscribe
          </Link>
        </nav>
      </header>

      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-24">
        <p className="text-sm uppercase tracking-[0.2em] text-[#a8a29e]">
          A note-taking app · Est. 2026
        </p>
        <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
          A quieter place to think.
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#57534e]">
          Mindscape is a second brain with the manners of a paper notebook.
          No dashboards shouting for your attention. No infinite scroll of
          features. Just you, your words, and the slow, satisfying work of
          making sense of them.
        </p>
        <div className="mt-10 flex items-center gap-6">
          <Link
            href="./4"
            className="rounded-full bg-[#1c1917] px-7 py-3 text-sm text-[#faf7f2] transition-colors hover:bg-[#44403c]"
          >
            Begin writing
          </Link>
          <a href="#essay" className="text-sm italic underline underline-offset-4">
            Read the essay
          </a>
        </div>
      </section>

      <section
        id="essay"
        className="mx-auto w-full max-w-2xl px-6 pb-24 text-lg leading-[1.9] text-[#44403c]"
      >
        <p className="border-l-2 border-[#d6cfc2] pl-6 italic text-[#78716c]">
          &ldquo;The best note-taking app is the one that gets out of the way
          and lets the thinking happen.&rdquo;
        </p>
        <p className="mt-10">
          Most tools for thought are built like casinos — bright, loud, and
          engineered to keep you inside. Mindscape is built like a study: a
          desk by a window, a pen that never runs dry, and enough silence to
          hear yourself think.
        </p>
        <p className="mt-6">
          You write. Mindscape remembers. Years from now, a single sentence —
          half a memory, a name, a feeling — is enough to bring the whole note
          back.
        </p>
      </section>

      <section id="principles" className="border-t border-[#e7e0d5]">
        <div className="mx-auto w-full max-w-4xl px-6 py-24">
          <h2 className="text-3xl font-bold tracking-tight">Principles</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {[
              {
                n: "I.",
                t: "Calm by default",
                d: "No badges, no streaks, no noise. The app rewards thinking, not usage minutes.",
              },
              {
                n: "II.",
                t: "Your words, connected",
                d: "Ideas link themselves. A note is never an island; it is a doorway.",
              },
              {
                n: "III.",
                t: "Memory, not storage",
                d: "You should be able to forget where you put a thought. That is the point.",
              },
            ].map((p) => (
              <div key={p.n}>
                <span className="text-sm text-[#a8a29e]">{p.n}</span>
                <h3 className="mt-2 text-xl font-bold">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-[#57534e]">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e7e0d5]">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-24 text-center">
          <h2 className="text-3xl font-bold italic tracking-tight">
            Start your notebook
          </h2>
          <p className="mt-4 max-w-md text-[#57534e]">
            One email a month on thinking, writing, and remembering. No spam,
            ever.
          </p>
          <form className="mt-8 flex w-full max-w-md gap-3">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 rounded-full border border-[#d6cfc2] bg-white px-5 py-3 text-sm outline-none focus:border-[#1c1917]"
            />
            <button
              type="submit"
              className="rounded-full bg-[#1c1917] px-6 py-3 text-sm text-[#faf7f2] transition-colors hover:bg-[#44403c]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#e7e0d5]">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-8 text-sm text-[#a8a29e]">
          <span>© 2026 Mindscape. Set in serif, like all good thoughts.</span>
          <span>Version 4 · Editorial</span>
        </div>
      </footer>
    </main>
  );
}
