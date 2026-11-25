const modules = [
  {
    code: "CAPTURE",
    title: "Omnibox input",
    description: "One keystroke for notes, clips, tasks, references, and voice transcription.",
    metric: "0.4s",
  },
  {
    code: "CONNECT",
    title: "Auto-linking graph",
    description: "Entities and ideas are matched across your archive without manual tagging.",
    metric: "38k",
  },
  {
    code: "SYNTH",
    title: "Daily intelligence brief",
    description: "A compressed morning readout of patterns, contradictions, and open loops.",
    metric: "7am",
  },
  {
    code: "RECALL",
    title: "Contextual retrieval",
    description: "Answers arrive with citations, provenance, and adjacent knowledge attached.",
    metric: "96%",
  },
];

const inboxItems = [
  ["Voice memo", "Ideas compound when capture friction approaches zero", "NOW"],
  ["Web clip", "The extended mind and tools for thought", "09:41"],
  ["Meeting", "Q3 research roadmap / memory retrieval", "08:15"],
];

function ModuleCard({ module, index }: { module: (typeof modules)[number]; index: number }) {
  return (
    <article className="border-2 border-[#11140f] bg-white p-5 neo-shadow-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#526047]">
          {module.code}
        </p>
        <span className="border border-[#11140f] bg-[#d9ff4d] px-2 py-1 font-mono text-[0.62rem] font-bold">
          {module.metric}
        </span>
      </div>
      <h3 className="mt-7 text-xl font-black uppercase leading-none tracking-[-0.03em]">
        {module.title}
      </h3>
      <p className="mt-4 text-sm leading-6 text-[#596153]">{module.description}</p>
      <div className="mt-6 flex items-center justify-between border-t-2 border-[#11140f] pt-4">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#77806f]">
          Module {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-3 w-3 bg-[#11140f]" />
      </div>
    </article>
  );
}

export default function VariantThree() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-[#e8ebe4] text-[#11140f]">
      <div className="overflow-hidden border-b-2 border-[#11140f] bg-[#11140f] py-2 text-[#d9ff4d]">
        <div className="animate-ticker-x flex w-max whitespace-nowrap font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em]">
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden={copy === 1} className="flex items-center">
              {Array.from({ length: 8 }).map((_, index) => (
                <span key={index} className="mx-5">
                  Capture everything / connect anything / recall instantly
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b-2 border-[#11140f] py-5">
          {/* Gallery adaptation: the source linked to "/3", reloading the page at its top; inside the gallery (and its
              compare and Lab Guess panes) that would load a whole gallery page, so it scrolls to the top instead. */}
          <a href="#top" className="flex items-center gap-3" aria-label="Engram home">
            <span className="flex h-10 w-10 items-center justify-center border-2 border-[#11140f] bg-[#d9ff4d] font-mono text-lg font-black neo-shadow-sm">
              E
            </span>
            <span className="text-lg font-black uppercase tracking-[-0.03em]">Engram</span>
          </a>
          <nav className="hidden items-center gap-7 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#4f5848] md:flex" aria-label="Primary navigation">
            <a className="hover:text-[#11140f]" href="#system">System</a>
            <a className="hover:text-[#11140f]" href="#modules">Modules</a>
            <a className="hover:text-[#11140f]" href="#access">Access</a>
          </nav>
          <a href="#access" className="border-2 border-[#11140f] bg-white px-4 py-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] neo-shadow-sm transition hover:bg-[#d9ff4d]">
            Get access
          </a>
        </header>

        <section id="system" className="grid gap-12 py-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-20">
          <div>
            <div className="inline-flex border-2 border-[#11140f] bg-white px-3 py-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] neo-shadow-sm">
              Memory operating system / v5
            </div>
            <h1 className="mt-7 max-w-3xl text-6xl font-black uppercase leading-[0.84] tracking-[-0.075em] sm:text-7xl lg:text-[6.8rem]">
              Total recall for compound thinking
            </h1>
            <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-[#4f5848]">
              Engram converts notes into operational intelligence. Capture inputs, expose dependencies, and retrieve the exact fragment your current project needs.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#access" className="border-2 border-[#11140f] bg-[#d9ff4d] px-6 py-4 text-center font-mono text-sm font-black uppercase tracking-[0.16em] neo-shadow transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                Initialize brain
              </a>
              <a href="#modules" className="border-2 border-[#11140f] bg-white px-6 py-4 text-center font-mono text-sm font-black uppercase tracking-[0.16em] neo-shadow transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                View system
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 border-2 border-[#11140f] bg-white neo-shadow-sm">
              {[
                ["38k", "links"],
                ["0.4s", "capture"],
                ["24/7", "synthesis"],
              ].map(([value, label], index) => (
                <div key={label} className={`p-4 ${index < 2 ? "border-r-2 border-[#11140f]" : ""}`}>
                  <p className="font-mono text-2xl font-black">{value}</p>
                  <p className="mt-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#6b7463]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-4 -top-5 hidden h-24 w-24 border-2 border-[#11140f] bg-[#ff8a3d] md:block" />
            <div className="relative border-2 border-[#11140f] bg-white neo-shadow">
              <div className="flex items-center justify-between border-b-2 border-[#11140f] bg-[#f6f8f1] px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em]">
                  <span className="h-3 w-3 bg-[#d9ff4d] ring-1 ring-[#11140f]" />
                  Engram command deck
                </div>
                <span className="font-mono text-[0.65rem] font-bold text-[#687160]">SYNC 99.98%</span>
              </div>

              <div className="grid min-h-[560px] lg:grid-cols-[0.9fr_1.1fr]">
                <aside className="border-b-2 border-[#11140f] lg:border-b-0 lg:border-r-2">
                  <div className="border-b-2 border-[#11140f] p-4">
                    <label htmlFor="command-input" className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#687160]">
                      Omnibox
                    </label>
                    <div className="mt-3 flex border-2 border-[#11140f] bg-white">
                      <input
                        id="command-input"
                        value="capture: compounding ideas"
                        readOnly
                        className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-xs outline-none"
                      />
                      <span className="bg-[#11140f] px-3 py-3 font-mono text-xs font-bold text-[#d9ff4d]">RUN</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#687160]">Input stream</p>
                      <span className="bg-[#d9ff4d] px-2 py-1 font-mono text-[0.6rem] font-bold">LIVE</span>
                    </div>
                    <div className="space-y-3">
                      {inboxItems.map(([type, text, time]) => (
                        <article key={text} className="border-2 border-[#11140f] bg-[#f8f9f4] p-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#67705f]">{type}</p>
                            <p className="font-mono text-[0.62rem] font-bold">{time}</p>
                          </div>
                          <p className="mt-2 text-sm font-semibold leading-5">{text}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                  <div className="mx-4 mb-4 border-2 border-[#11140f] bg-[#11140f] p-4 text-white">
                    <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#d9ff4d]">Daily brief</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">
                      Pattern detected: “compound ideas” appears in 7 notes, 2 projects, and 1 deferred essay.
                    </p>
                  </div>
                </aside>

                <div className="relative bg-[#eef1e8] p-4 sm:p-5">
                  <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
                    <div className="grid grid-cols-3 border-2 border-[#11140f] bg-white">
                      {[
                        ["Notes", "12,408"],
                        ["Links", "38,912"],
                        ["Open loops", "17"],
                      ].map(([label, value], index) => (
                        <div key={label} className={`p-3 ${index < 2 ? "border-r-2 border-[#11140f]" : ""}`}>
                          <p className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-[#6f7868]">{label}</p>
                          <p className="mt-1 font-mono text-lg font-black">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="relative overflow-hidden border-2 border-[#11140f] bg-white p-4">
                      <div className="paper-grid absolute inset-0 opacity-70" />
                      <div className="relative h-full min-h-[240px]">
                        <div className="absolute left-[6%] top-[6%] w-24 border-2 border-[#11140f] bg-[#d9ff4d] p-3 neo-shadow-sm">
                          <p className="font-mono text-[0.58rem] font-bold uppercase">Essay</p>
                          <p className="mt-1 text-sm font-black leading-4">Compound ideas</p>
                        </div>
                        <div className="absolute right-[6%] top-[28%] w-24 border-2 border-[#11140f] bg-white p-3 neo-shadow-sm">
                          <p className="font-mono text-[0.58rem] font-bold uppercase">Source</p>
                          <p className="mt-1 text-sm font-black leading-4">Extended mind</p>
                        </div>
                        <div className="absolute bottom-[8%] left-1/2 w-32 -translate-x-1/2 border-2 border-[#11140f] bg-[#ff8a3d] p-3 neo-shadow-sm">
                          <p className="font-mono text-[0.58rem] font-bold uppercase">Project</p>
                          <p className="mt-1 text-sm font-black leading-4">Memory OS launch</p>
                        </div>
                        <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 420 280" fill="none">
                          <path d="M82 60 320 118M86 82 210 202M320 140 222 202" stroke="#11140f" strokeWidth="2" strokeDasharray="7 7" />
                          <circle cx="82" cy="60" r="5" fill="#11140f" />
                          <circle cx="320" cy="118" r="5" fill="#11140f" />
                          <circle cx="210" cy="202" r="5" fill="#11140f" />
                        </svg>
                      </div>
                    </div>

                    <div className="border-2 border-[#11140f] bg-[#d9ff4d] p-4">
                      <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em]">Contextual recall</p>
                      <p className="mt-2 text-sm font-black leading-5">
                        “Show every note connecting knowledge compounding to the launch narrative.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="modules" className="border-t-2 border-[#11140f] py-16">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#607018]">System modules</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.055em] sm:text-6xl">
                Built for cognitive throughput
              </h2>
            </div>
            <p className="max-w-md text-sm font-medium leading-7 text-[#596153]">
              Every module removes friction between a passing thought and a useful future artifact.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {modules.map((module, index) => (
              <ModuleCard key={module.code} module={module} index={index} />
            ))}
          </div>
        </section>

        <section id="access" className="pb-16">
          <div className="grid border-2 border-[#11140f] bg-[#11140f] text-white neo-shadow lg:grid-cols-[1fr_0.9fr]">
            <div className="p-8 sm:p-12">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[#d9ff4d]">Deployment queue</p>
              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl">
                Put your mind on system.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
                Join the beta cohort building a high-leverage external memory for research, writing, strategy, and creative work.
              </p>
            </div>
            <div className="flex flex-col justify-center border-t-2 border-[#d9ff4d] bg-[#1b1f18] p-8 sm:p-12 lg:border-l-2 lg:border-t-0">
              <label htmlFor="command-email" className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#d9ff4d]">
                Operator email
              </label>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  id="command-email"
                  type="email"
                  placeholder="operator@future.com"
                  className="min-w-0 flex-1 border-2 border-white/25 bg-transparent px-4 py-4 font-mono text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#d9ff4d]"
                />
                <button type="button" className="border-2 border-[#d9ff4d] bg-[#d9ff4d] px-6 py-4 font-mono text-sm font-black uppercase tracking-[0.14em] text-[#11140f] transition hover:bg-white hover:border-white">
                  Enlist
                </button>
              </div>
              <p className="mt-5 font-mono text-[0.65rem] leading-6 text-zinc-500">
                LOCAL-FIRST / END-TO-END ENCRYPTED / EXPORTABLE FOREVER
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
