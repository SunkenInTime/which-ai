const memoryTypes = [
  {
    title: "A sentence in passing",
    detail: "Captured before the feeling around it evaporates.",
    color: "bg-[#ffd8c7]",
  },
  {
    title: "A voice note on a walk",
    detail: "Transcribed, linked, and waiting beside related ideas.",
    color: "bg-[#dcd4ff]",
  },
  {
    title: "A question worth keeping",
    detail: "Resurfaced when new evidence gives it somewhere to land.",
    color: "bg-[#cbeedc]",
  },
];

const qualities = [
  {
    title: "Tender capture",
    description: "No blank-page ceremony. Save fragments exactly as they arrive—messy, luminous, incomplete.",
  },
  {
    title: "Emotional context",
    description: "Engram keeps the moment around the note: where you were, what you were reading, what you were trying to understand.",
  },
  {
    title: "Serendipitous return",
    description: "Old thoughts reappear as gentle invitations, not another inbox demanding to be cleared.",
  },
  {
    title: "Private by design",
    description: "Your inner life is encrypted, exportable, and never converted into an advertising profile.",
  },
];

export default function VariantFour() {
  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fbf0e5] via-[#eee9fb] to-[#e3f3eb] text-[#2d3140]">
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora-blob animate-drift absolute left-[-8rem] top-[-9rem] h-[28rem] w-[28rem] rounded-full bg-[#ffd0bd]/60 blur-3xl" />
        <div className="aurora-blob animate-drift absolute right-[-10rem] top-[20%] h-[32rem] w-[32rem] rounded-full bg-[#c9bcff]/50 blur-3xl" style={{ animationDelay: "1.8s" }} />
        <div className="aurora-blob animate-drift absolute bottom-[-12rem] left-[25%] h-[30rem] w-[30rem] rounded-full bg-[#bfe8d2]/60 blur-3xl" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10">
        <header className="pt-6">
          <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/65 bg-white/45 px-4 py-3 shadow-lg shadow-[#8874aa]/10 backdrop-blur-xl">
            {/* Gallery adaptation: the source linked to "/4", reloading the page at its top; inside the gallery (and its
                compare and Lab Guess panes) that would load a whole gallery page, so it scrolls to the top instead. */}
            <a href="#top" className="flex items-center gap-3" aria-label="Engram home">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ffc9b2] to-[#beb0ff] shadow-inner">
                <span className="h-3 w-3 rounded-full bg-white/85" />
              </span>
              <span className="font-semibold tracking-tight">Engram</span>
            </a>
            <nav className="hidden items-center gap-7 text-sm font-medium text-[#68677a] md:flex" aria-label="Primary navigation">
              <a className="transition hover:text-[#2d3140]" href="#memories">Memories</a>
              <a className="transition hover:text-[#2d3140]" href="#care">Care</a>
              <a className="transition hover:text-[#2d3140]" href="#access">Access</a>
            </nav>
            <a href="#access" className="rounded-full bg-[#2f3040] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#514f68]/20 transition hover:bg-[#454659]">
              Begin softly
            </a>
          </div>
        </header>

        <section className="mx-auto flex max-w-4xl flex-col items-center pb-12 pt-16 text-center sm:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#77738c] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#9f8cff]" />
            A gentler kind of intelligence
          </div>
          <h1 className="mt-7 text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-[#282b3a] sm:text-7xl lg:text-[6.4rem]">
            Your mind, softly extended.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#69697d] sm:text-xl sm:leading-9">
            Engram keeps the thoughts you cannot hold yet—fragments, questions, voices, and small revelations—until they are ready to become part of you.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#access" className="rounded-full bg-[#2f3040] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-[#514f68]/22 transition hover:-translate-y-0.5 hover:bg-[#424355]">
              Start remembering
            </a>
            <a href="#memories" className="rounded-full border border-white/75 bg-white/45 px-7 py-4 text-sm font-semibold text-[#4d4d61] backdrop-blur transition hover:bg-white/70">
              See how it feels
            </a>
          </div>
        </section>

        <section id="memories" className="relative mx-auto h-[690px] w-full max-w-6xl sm:h-[650px]">
          <div className="animate-float-slow absolute left-1/2 top-0 w-[min(46rem,94%)] -translate-x-1/2 overflow-hidden rounded-[2rem] border border-white/70 bg-white/58 shadow-2xl shadow-[#716398]/16 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/70 px-5 py-4">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffad94]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f8d985]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#9edeb9]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b87a0]">Today’s memory field</p>
            </div>
            <div className="grid min-h-[430px] md:grid-cols-[1.08fr_0.92fr]">
              <article className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9892aa]">Recovered this morning</p>
                <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#303244]">
                  “What if attention is a form of care?”
                </h2>
                <p className="mt-5 text-base leading-8 text-[#6b6a7e]">
                  You wrote this after reading late one night in March. Since then, it has quietly gathered connections to your notes on parenting, deep work, and the design of calm software.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {['attention', 'care', 'deep work', 'parenting', 'letters', 'calm software'].map((tag, index) => (
                    <span key={`${tag}-${index}`} className={`rounded-full px-3 py-1.5 text-xs font-semibold text-[#5b576f] ${index % 3 === 0 ? 'bg-[#ffe0d3]' : index % 3 === 1 ? 'bg-[#e4dfff]' : 'bg-[#d8f1e4]'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-9 rounded-3xl bg-[#f8f5ef] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b91a8]">A gentle prompt</p>
                  <p className="mt-3 text-sm leading-7 text-[#656477]">
                    Would you like to revisit the letter you started to your future daughter? Three related memories are ready.
                  </p>
                </div>
              </article>
              <aside className="relative overflow-hidden border-t border-white/70 bg-gradient-to-br from-white/35 to-white/10 p-6 md:border-l md:border-t-0">
                <div className="absolute left-8 top-9 h-24 w-24 rounded-full bg-[#ffc9b2]/65 blur-sm" />
                <div className="absolute bottom-16 right-8 h-28 w-28 rounded-full bg-[#bfb3ff]/55 blur-sm" />
                <div className="absolute bottom-8 left-12 h-16 w-16 rounded-full bg-[#aee6c8]/60 blur-sm" />
                {[
                  ["left-[10%] top-[12%]", "March letter", "w-32"],
                  ["right-[10%] top-[28%]", "Walk audio", "w-28"],
                  ["left-[22%] bottom-[25%]", "Calm software", "w-36"],
                  ["right-[18%] bottom-[9%]", "Future self", "w-28"],
                ].map(([position, label, width], index) => (
                  <div key={label} className={`animate-float-slow absolute ${position} ${width} rounded-3xl border border-white/70 bg-white/66 p-3 shadow-lg shadow-[#716398]/12 backdrop-blur`} style={{ animationDelay: `${index * 0.65}s` }}>
                    <div className="mb-2 h-1.5 w-10 rounded-full bg-[#b9b0e8]/60" />
                    <p className="text-xs font-semibold text-[#555467]">{label}</p>
                  </div>
                ))}
                <div className="absolute inset-x-8 bottom-6 rounded-full border border-white/70 bg-white/60 px-4 py-3 text-center text-xs font-semibold text-[#6d687f] backdrop-blur">
                  43 related memories · arranged by feeling
                </div>
              </aside>
            </div>
          </div>

          <div className="animate-float-slow absolute bottom-3 right-0 w-64 rounded-[2.2rem] border border-white/70 bg-[#333344] p-3 shadow-2xl shadow-[#4c4868]/30 sm:right-8" style={{ animationDelay: "1.1s" }}>
            <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#f7edf3] to-[#ded9f6] p-4">
              <div className="mx-auto h-1.5 w-16 rounded-full bg-[#3c3c4e]/20" />
              <p className="mt-7 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#7f7898]">Engram</p>
              <h3 className="mt-4 text-center text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#353648]">
                A thought is ready to return
              </h3>
              <div className="mt-6 rounded-3xl bg-white/66 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a91aa]">From last spring</p>
                <p className="mt-2 text-sm leading-6 text-[#5c5b70]">
                  “The best systems make room for who you are becoming.”
                </p>
              </div>
              <div className="mt-5 rounded-full bg-[#333344] py-3 text-center text-xs font-semibold text-white">
                Open memory
              </div>
            </div>
          </div>

          <div className="animate-float-slow absolute bottom-16 left-0 hidden w-56 rotate-[-4deg] rounded-[1.75rem] border border-white/70 bg-white/60 p-5 shadow-xl shadow-[#716398]/14 backdrop-blur-xl md:block" style={{ animationDelay: "2s" }}>
            <div className="h-2 w-12 rounded-full bg-[#ffb9a0]" />
            <p className="mt-4 text-sm font-semibold leading-6 text-[#555467]">
              “I don’t need to remember everything. I need to trust that nothing meaningful is lost.”
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto w-full max-w-6xl py-16">
          <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b7bb8]">Memory timeline</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#2f3040] sm:text-5xl">
                Small thoughts become a continuous self.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#706f82]">
              Engram treats memory as a living timeline rather than a cabinet of isolated documents.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {memoryTypes.map((memory, index) => (
              <article key={memory.title} className="memory-card-shadow rounded-[2rem] border border-white/70 bg-white/52 p-6 backdrop-blur-xl">
                <div className={`h-24 rounded-[1.5rem] ${memory.color} p-4`}>
                  <span className="inline-block rounded-full bg-white/55 px-3 py-1 text-xs font-semibold text-[#5d5a70]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[#333448]">{memory.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#707083]">{memory.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="care" className="relative z-10 mx-auto w-full max-w-6xl pb-16">
          <div className="grid overflow-hidden rounded-[2.4rem] border border-white/70 bg-white/46 shadow-2xl shadow-[#716398]/14 backdrop-blur-2xl lg:grid-cols-[0.88fr_1.12fr]">
            <div className="p-8 sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8b7bb8]">Designed with care</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#2f3040] sm:text-5xl">
                Technology that protects the fragile beginnings of ideas.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#6f6e81]">
                A second brain is not just a database. It is a promise you make to your future attention.
              </p>
            </div>
            <div className="grid border-t border-white/70 sm:grid-cols-2 lg:border-l lg:border-t-0">
              {qualities.map((quality, index) => (
                <article key={quality.title} className={`p-7 ${index % 2 === 0 ? "sm:border-r" : ""} ${index < 2 ? "border-b" : ""} border-white/70`}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-sm font-semibold text-[#756fa0]">
                    {index + 1}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-[#333448]">{quality.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#707083]">{quality.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="access" className="relative z-10 mx-auto w-full max-w-4xl pb-14 text-center">
          <div className="rounded-[2.4rem] border border-white/70 bg-[#303144] p-8 text-white shadow-2xl shadow-[#514f68]/24 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#cfc6ff]">Private beta</p>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
              Keep what matters. Release what you no longer need to carry.
            </h2>
            <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <label htmlFor="ambient-email" className="sr-only">Email address</label>
              <input
                id="ambient-email"
                type="email"
                placeholder="you@memory.com"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-4 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#cfc6ff]"
              />
              <button type="button" className="rounded-full bg-white px-7 py-4 text-sm font-bold text-[#303144] transition hover:bg-[#e8e2ff]">
                Join gently
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
