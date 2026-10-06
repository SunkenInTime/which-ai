import {
  ArrowRight,
  Graph,
  MagnifyingGlass,
  NotePencil,
  LockKey,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

export default function Iteration1() {
  return (
    <div className="min-h-[100dvh] bg-[#08090a] text-zinc-100">

      {/* Nav */}
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/20 text-indigo-400">
            <NotePencil size={16} weight="duotone" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Mnemosyne</span>
        </div>
        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition-colors hover:text-zinc-100">Features</a>
          <a href="#security" className="transition-colors hover:text-zinc-100">Security</a>
          <a href="#pricing" className="transition-colors hover:text-zinc-100">Pricing</a>
        </div>
        <a
          href="#start"
          className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white active:scale-[0.98]"
        >
          Start free
        </a>
      </nav>

      {/* Hero - Asymmetric split */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Now with AI-powered connections
            </div>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
              Your mind,
              <br />
              <span className="text-zinc-500">finally organized.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
              Capture ideas the moment they strike. Mnemosyne connects your notes
              automatically, so nothing gets lost and everything resurfaces when you need it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#start"
                className="group inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-400 active:scale-[0.98]"
              >
                Start free
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100"
              >
                Watch demo
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-2xl" />
            <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur">
              <div className="mb-3 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                </div>
                <span className="ml-2 text-xs text-zinc-500">Today&apos;s notes</span>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Q3 product strategy", tag: "Work", color: "bg-blue-500/20 text-blue-300" },
                  { title: "Book ideas: Borges, Calvino", tag: "Reading", color: "bg-amber-500/20 text-amber-300" },
                  { title: "Trip planning: Lisbon", tag: "Travel", color: "bg-emerald-500/20 text-emerald-300" },
                ].map((note) => (
                  <div
                    key={note.title}
                    className="flex items-center justify-between rounded-lg border border-zinc-800/50 bg-zinc-800/30 px-3 py-2.5"
                  >
                    <span className="text-sm text-zinc-200">{note.title}</span>
                    <span className={`rounded px-2 py-0.5 text-[10px] font-medium ${note.color}`}>
                      {note.tag}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
                <div className="flex items-center gap-2 text-xs text-indigo-300">
                  <Sparkle size={14} weight="fill" />
                  <span className="font-medium">Connected automatically</span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  &ldquo;Trip planning&rdquo; linked to &ldquo;Book ideas&rdquo; (both mention Lisbon)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo wall */}
      <section className="border-t border-zinc-900 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs uppercase tracking-widest text-zinc-600">
            Trusted by thinkers at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-zinc-600">
            <span className="text-sm font-semibold tracking-tight">Arc</span>
            <span className="text-sm font-semibold tracking-tight">Linear</span>
            <span className="text-sm font-semibold tracking-tight">Vercel</span>
            <span className="text-sm font-semibold tracking-tight">Notion</span>
            <span className="text-sm font-semibold tracking-tight">Figma</span>
            <span className="text-sm font-semibold tracking-tight">Stripe</span>
          </div>
        </div>
      </section>

      {/* Features - Bento grid */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Everything you need to think better
          </h2>
          <p className="mt-4 text-zinc-400">
            A calm, fast workspace designed for deep focus. No clutter, no
            distractions, just your ideas.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 md:col-span-2">
            <Graph size={24} className="text-indigo-400" weight="duotone" />
            <h3 className="mt-4 text-lg font-medium text-zinc-100">Auto-linking</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Notes connect themselves. Mnemosyne detects references between your
              ideas and builds a living graph of your thinking, without any manual tagging.
            </p>
            <div className="mt-6 flex h-32 items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span className="rounded bg-zinc-800 px-2 py-1">Idea A</span>
                <span className="h-px w-8 bg-indigo-500/50" />
                <span className="rounded bg-zinc-800 px-2 py-1">Idea B</span>
                <span className="h-px w-8 bg-indigo-500/50" />
                <span className="rounded bg-indigo-500/20 px-2 py-1 text-indigo-300">Idea C</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-indigo-500/5 p-6">
            <MagnifyingGlass size={24} className="text-indigo-400" weight="duotone" />
            <h3 className="mt-4 text-lg font-medium text-zinc-100">Instant recall</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Search that understands meaning, not just keywords. Find any thought
              in milliseconds.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <NotePencil size={24} className="text-indigo-400" weight="duotone" />
            <h3 className="mt-4 text-lg font-medium text-zinc-100">Frictionless capture</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              A quick-capture shortcut from anywhere. Thoughts land in your inbox
              and get organized later.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 md:col-span-2">
            <LockKey size={24} className="text-indigo-400" weight="duotone" />
            <h3 className="mt-4 text-lg font-medium text-zinc-100">Private by design</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              End-to-end encrypted. Your notes are yours alone. We can&apos;t read them,
              and neither can anyone else.
            </p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-t border-zinc-900 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight text-zinc-200 md:text-3xl">
            &ldquo;Mnemosyne replaced three apps for me. It&apos;s the first tool that
            actually keeps up with how my brain works.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="text-sm font-medium text-zinc-300">Maya Chen</p>
            <p className="text-sm text-zinc-500">Research scientist, Arc</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-12 text-center md:p-16">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Start building your second brain
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            Free for personal use. No credit card required.
          </p>
          <a
            href="#signup"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-400 active:scale-[0.98]"
          >
            Start free
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-zinc-500">
          <span>Mnemosyne</span>
          <div className="flex gap-6">
            <a href="#privacy" className="transition-colors hover:text-zinc-300">Privacy</a>
            <a href="#terms" className="transition-colors hover:text-zinc-300">Terms</a>
            <a href="#twitter" className="transition-colors hover:text-zinc-300">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
