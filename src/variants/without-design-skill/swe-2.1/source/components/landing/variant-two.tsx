const principles = [
  {
    number: "01",
    title: "A quiet place to deposit thought",
    description:
      "Capture notes without choosing a folder, a format, or a final shape. Engram preserves the texture of the original moment.",
  },
  {
    number: "02",
    title: "An index that writes itself",
    description:
      "People, books, projects, questions, and recurring obsessions are gathered into a living table of contents.",
  },
  {
    number: "03",
    title: "Gentle resurfacing, never noise",
    description:
      "Relevant passages return when they can help you think—not as notifications competing for your attention.",
  },
];

const indexEntries = [
  ["Attention", "14 fragments", "in progress"],
  ["Walking", "8 fragments", "recurring"],
  ["Craft", "22 fragments", "deepening"],
  ["Solitude", "6 fragments", "new"],
];

export default function VariantTwo() {
  return (
    <main className="noise-texture min-h-screen overflow-hidden bg-[#f2ecdf] text-[#262118]">
      <div className="paper-grid pointer-events-none fixed inset-0 opacity-55" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10">
        <header className="grid grid-cols-2 items-center border-b border-[#2d261a]/15 py-5 md:grid-cols-3">
          <a href="/without-design-skill/swe-2.1/2" className="flex items-center gap-3" aria-label="Engram home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2d261a]/25 bg-[#fffaf0] font-serif-display text-lg italic shadow-sm">
              e
            </span>
            <span className="font-serif-display text-xl italic tracking-tight">Engram</span>
          </a>
          <nav className="hidden items-center justify-center gap-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#6f6656] md:flex" aria-label="Primary navigation">
            <a className="transition hover:text-[#262118]" href="#notebook">Notebook</a>
            <a className="transition hover:text-[#262118]" href="#method">Method</a>
            <a className="transition hover:text-[#262118]" href="#access">Access</a>
          </nav>
          <div className="flex justify-end">
            <a
              href="#access"
              className="rounded-full border border-[#2d261a]/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-[#2d261a] hover:text-[#fff8eb]"
            >
              Begin
            </a>
          </div>
        </header>

        <section className="mx-auto flex max-w-5xl flex-col items-center pb-16 pt-16 text-center sm:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#8c6f42]">
            A notebook that remembers with you
          </p>
          <h1 className="font-serif-display mt-7 max-w-5xl text-6xl leading-[0.92] tracking-[-0.055em] text-[#211c15] sm:text-7xl lg:text-[7.4rem]">
            Thinking is a place you can return to.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#6c6252] sm:text-xl sm:leading-9">
            Engram is a second brain for people who think in fragments, margins, questions, and quiet connections. Write once. Rediscover forever.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#access"
              className="rounded-full bg-[#272117] px-7 py-4 text-sm font-semibold text-[#fff8eb] shadow-xl shadow-[#6d5b38]/15 transition hover:bg-[#40362a]"
            >
              Open your notebook
            </a>
            <a
              href="#notebook"
              className="rounded-full border border-[#2d261a]/20 px-7 py-4 text-sm font-semibold text-[#3c3428] transition hover:border-[#2d261a]/45"
            >
              Read the method
            </a>
          </div>
          <div className="mt-12 flex w-full max-w-3xl items-center justify-between border-y border-[#2d261a]/15 py-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#887a64]">
            <span>Vol. 01</span>
            <span>Private by default</span>
            <span>Est. memory 2026</span>
          </div>
        </section>

        <section id="notebook" className="relative pb-20">
          <div className="absolute left-8 top-16 hidden h-24 w-24 rounded-full border border-[#b0925d]/30 lg:block" />
          <div className="absolute bottom-10 right-6 hidden h-36 w-36 rounded-full border border-[#b0925d]/20 lg:block" />
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#2d261a]/15 bg-[#fffaf0] shadow-[0_35px_90px_rgba(70,54,28,.18)]">
            <div className="flex items-center justify-between border-b border-[#2d261a]/12 px-5 py-4 sm:px-8">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#c7a96b]" />
                <span className="h-2 w-2 rounded-full bg-[#8fa383]" />
                <span className="h-2 w-2 rounded-full bg-[#b97868]" />
              </div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#8b7c65]">
                Commonplace book / live index
              </p>
            </div>
            <div className="grid md:grid-cols-2">
              <article className="relative min-h-[520px] border-b border-[#2d261a]/12 p-6 sm:p-10 md:border-b-0 md:border-r">
                <div className="absolute inset-y-0 right-5 hidden w-px bg-[#d8c9aa]/70 sm:block" />
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#9b8560]">
                  Tuesday · 7:12 AM
                </p>
                <h2 className="font-serif-display mt-6 text-4xl italic leading-tight tracking-[-0.025em] text-[#2b251b]">
                  On the usefulness of unfinished thoughts
                </h2>
                <div className="mt-8 space-y-6 text-[1.02rem] leading-8 text-[#5e5445]">
                  <p>
                    The note does not need to be complete to be valuable. A sentence can remain dormant for months and then become the missing edge of an essay.
                  </p>
                  <p>
                    Perhaps memory is less like a cabinet and more like a compost heap: fragments break down, combine, and quietly become fertile.
                  </p>
                </div>
                <div className="mt-10 inline-block -rotate-1 rounded-sm bg-[#f3df8f]/75 px-3 py-2 font-serif-display text-lg italic text-[#5f4a20] shadow-sm">
                  “A note is a future conversation.”
                </div>
                <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between sm:left-10 sm:right-10">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#9b8560]">Linked margin</p>
                    <p className="mt-2 max-w-56 text-sm leading-6 text-[#766a58]">
                      Connects to “Walking as cognition” and four notes on attention.
                    </p>
                  </div>
                  <span className="font-serif-display text-5xl italic text-[#d6c6a5]">27</span>
                </div>
              </article>

              <aside className="min-h-[520px] bg-[#f8f1e3] p-6 sm:p-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#9b8560]">
                      Self-writing index
                    </p>
                    <h3 className="font-serif-display mt-4 text-3xl italic tracking-[-0.02em] text-[#2b251b]">
                      What your mind keeps returning to
                    </h3>
                  </div>
                  <span className="rounded-full border border-[#2d261a]/15 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#7c6e58]">
                    Live
                  </span>
                </div>
                <div className="mt-9 space-y-4">
                  {indexEntries.map(([title, count, state], index) => (
                    <div key={title} className="group flex items-center gap-4 border-b border-[#2d261a]/10 pb-4">
                      <span className="font-serif-display text-2xl italic text-[#c1a878]">{String(index + 1).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-serif-display text-xl italic text-[#342b1e]">{title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#8b7c65]">{count}</p>
                      </div>
                      <span className="rounded-full bg-[#e7dcc5] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#756347]">
                        {state}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 rounded-3xl border border-[#b69c6b]/25 bg-[#fffaf0] p-5">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#9b8560]">Resurfaced for today</p>
                  <p className="font-serif-display mt-4 text-2xl italic leading-snug text-[#3b3124]">
                    “Solitude is not the absence of voices; it is the room where your own voice becomes legible.”
                  </p>
                  <p className="mt-4 text-sm text-[#7c6e58]">From a voice memo captured last March</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="method" className="mx-auto w-full max-w-6xl pb-20">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8c6f42]">The method</p>
              <h2 className="font-serif-display mt-4 max-w-xl text-4xl italic leading-tight tracking-[-0.03em] text-[#282217] sm:text-5xl">
                Less filing. More finding.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#786b57]">
              A second brain should feel less like software administration and more like a well-kept commonplace book.
            </p>
          </div>
          <div className="border-t border-[#2d261a]/18">
            {principles.map((principle) => (
              <article key={principle.number} className="grid gap-5 border-b border-[#2d261a]/18 py-8 md:grid-cols-[0.22fr_0.7fr_1fr] md:items-start">
                <p className="font-serif-display text-5xl italic text-[#c2a97a]">{principle.number}</p>
                <h3 className="font-serif-display text-3xl italic leading-tight tracking-[-0.02em] text-[#2c2519]">
                  {principle.title}
                </h3>
                <p className="max-w-xl text-base leading-8 text-[#6e6250]">{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="access" className="mx-auto w-full max-w-6xl pb-12">
          <div className="grid overflow-hidden rounded-[2rem] border border-[#2d261a]/15 bg-[#2b2419] text-[#fff8eb] shadow-2xl shadow-[#4d3e25]/20 lg:grid-cols-[1fr_0.8fr]">
            <div className="p-8 sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d6bd88]">Begin your archive</p>
              <h2 className="font-serif-display mt-5 text-4xl italic leading-tight tracking-[-0.03em] sm:text-5xl">
                Your future self is already reading.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#d9cbb2]">
                Join the private release and turn your fragments into a durable intellectual estate.
              </p>
            </div>
            <div className="flex flex-col justify-center border-t border-white/10 bg-white/[0.045] p-8 sm:p-12 lg:border-l lg:border-t-0">
              <label htmlFor="editorial-email" className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6bd88]">
                Email address
              </label>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  id="editorial-email"
                  type="email"
                  placeholder="reader@example.com"
                  className="min-w-0 flex-1 rounded-full border border-white/15 bg-transparent px-5 py-4 text-sm text-white outline-none placeholder:text-[#9f927c] focus:border-[#d6bd88]"
                />
                <button type="button" className="rounded-full bg-[#f0dfb9] px-6 py-4 text-sm font-bold text-[#2b2419] transition hover:bg-white">
                  Request invite
                </button>
              </div>
              <p className="mt-5 text-xs leading-6 text-[#aa9b81]">
                No feeds, no public graph, no noise. Your notes remain yours.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
