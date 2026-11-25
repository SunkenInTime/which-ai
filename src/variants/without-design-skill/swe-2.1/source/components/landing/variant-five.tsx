const terminalLines = [
  ["00:00:01", "ingest", "voice.memo / walking hypothesis / 42s"],
  ["00:00:02", "embed", "semantic trace -> 17 existing memories"],
  ["00:00:03", "infer", "contradiction note.8841 / cadence"],
  ["00:00:04", "store", "encrypted packet -> private cortex"],
];

const capabilities = [
  {
    index: "01",
    title: "Private ingestion pipeline",
    body: "Audio, text, documents, browser fragments, and handwritten scans enter through one local-first memory pipeline.",
    meta: "latency < 300ms",
  },
  {
    index: "02",
    title: "Cognitive indexing",
    body: "Engram builds a temporal, semantic, and project-aware index so retrieval can reason across time and intent.",
    meta: "3 memory axes",
  },
  {
    index: "03",
    title: "Verifiable recall",
    body: "Every answer carries citations back to the exact source fragment, so machine memory remains inspectable.",
    meta: "100% provenance",
  },
];

const ledgerRows = [
  ["capture", "voice.memo.042", "indexed", "+17 links"],
  ["clip", "extended-mind.pdf", "embedded", "+42 links"],
  ["note", "strategy-collision.md", "flagged", "+3 conflicts"],
  ["query", "attention cadence", "answered", "4 citations"],
];

export default function VariantFive() {
  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-[#080807] text-[#f2eee4]">
      <div className="pointer-events-none absolute inset-0">
        <div className="blueprint-grid absolute inset-0 opacity-35" />
        <div className="absolute left-[-12rem] top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-[#ff9f1c]/10 blur-3xl" />
        <div className="absolute bottom-[-18rem] right-[-12rem] h-[36rem] w-[36rem] rounded-full bg-[#f2eee4]/7 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/12 py-5">
          {/* Gallery adaptation: the source linked to "/5", reloading the page at its top; inside the gallery (and its
              compare and Lab Guess panes) that would load a whole gallery page, so it scrolls to the top instead. */}
          <a href="#top" className="flex items-center gap-3" aria-label="Engram home">
            <span className="flex h-10 w-10 items-center justify-center border border-[#ff9f1c]/60 bg-[#ff9f1c]/10 font-mono text-sm font-bold text-[#ffb545]">
              EN
            </span>
            <span className="font-mono text-sm font-bold uppercase tracking-[0.24em]">Engram</span>
          </a>
          <nav className="hidden items-center gap-8 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#969083] md:flex" aria-label="Primary navigation">
            <a className="transition hover:text-white" href="#console">Console</a>
            <a className="transition hover:text-white" href="#protocol">Protocol</a>
            <a className="transition hover:text-white" href="#access">Access</a>
          </nav>
          <a href="#access" className="border border-[#ff9f1c]/60 px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#ffb545] transition hover:bg-[#ff9f1c] hover:text-black">
            Request key
          </a>
        </header>

        <section id="console" className="grid gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
          <div>
            <div className="mb-7 flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-[#a69f8f]">
              <span className="border border-white/12 px-3 py-2">Private cortex</span>
              <span className="border border-[#ff9f1c]/40 px-3 py-2 text-[#ffb545]">AI-native recall</span>
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-[#f7f2e7] sm:text-7xl lg:text-[6.5rem]">
              A second brain with a memory console.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#aaa398]">
              Engram is a precision instrument for knowledge work: continuously ingesting what you notice, indexing what it means, and retrieving it with evidence when decisions depend on it.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#access" className="inline-flex items-center justify-center bg-[#f2eee4] px-6 py-4 font-mono text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-[#ffb545]">
                Initialize cortex
              </a>
              <a href="#protocol" className="inline-flex items-center justify-center border border-white/18 px-6 py-4 font-mono text-sm font-bold uppercase tracking-[0.16em] text-[#f2eee4] transition hover:border-[#ffb545] hover:text-[#ffb545]">
                Read protocol
              </a>
            </div>
            <div className="mt-12 max-w-xl border border-white/12">
              {[
                ["MODE", "local-first + encrypted sync"],
                ["INDEX", "semantic / temporal / project"],
                ["OUTPUT", "answers with citations"],
              ].map(([label, value], index) => (
                <div key={label} className={`grid grid-cols-[7rem_1fr] ${index < 2 ? "border-b border-white/12" : ""}`}>
                  <p className="border-r border-white/12 px-4 py-3 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[#8e887c]">{label}</p>
                  <p className="px-4 py-3 font-mono text-xs text-[#d9d2c3]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 hidden h-full w-full border border-[#ff9f1c]/25 lg:block" />
            <div className="terminal-scan relative border border-white/14 bg-[#11110f] shadow-2xl shadow-black/50">
              <div className="flex items-center justify-between border-b border-white/12 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffb545]" />
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#d9d2c3]">cortex.console</p>
                </div>
                <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#8e887c]">
                  <span>secure</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                </div>
              </div>

              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="border-b border-white/12 p-5 lg:border-b-0 lg:border-r">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#8e887c]">Ingestion trace</p>
                    <span className="bg-[#ff9f1c]/12 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#ffb545]">live</span>
                  </div>
                  <div className="space-y-4 font-mono text-[0.68rem] leading-5">
                    {terminalLines.map(([time, command, output]) => (
                      <div key={`${time}-${command}`} className="grid grid-cols-[3.8rem_3.7rem_1fr] gap-2">
                        <span className="text-[#696357]">{time}</span>
                        <span className="text-[#ffb545]">{command}</span>
                        <span className="text-[#c9c1b1]">{output}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 border border-[#ff9f1c]/30 bg-[#ff9f1c]/8 p-4">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#ffb545]">Active query</p>
                    <p className="mt-3 font-mono text-sm leading-7 text-[#f0eadc]">
                      retrieve: everything known about attention cadence, creative endurance, and morning deep work
                    </p>
                  </div>
                  <div className="mt-5 h-px overflow-hidden bg-white/10">
                    <div className="h-full w-1/3 bg-[#ffb545] animate-shimmer-line" />
                  </div>
                </div>

                <div className="p-5">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[#8e887c]">Retrieval packet</p>
                  <div className="mt-5 space-y-3">
                    {[
                      ["01", "Deep work is easier after capture, not before", "note.1187", "98%"],
                      ["02", "Walking increases associative distance", "memo.0421", "94%"],
                      ["03", "Mornings produce fewer but stronger hooks", "journal.0308", "91%"],
                    ].map(([index, text, source, confidence]) => (
                      <article key={source} className="border border-white/12 bg-white/[0.035] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-[0.62rem] text-[#ffb545]">{index}</span>
                          <span className="font-mono text-[0.62rem] text-emerald-300">{confidence}</span>
                        </div>
                        <p className="mt-3 text-sm font-medium leading-6 text-[#eee7d9]">{text}</p>
                        <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#777165]">{source}</p>
                      </article>
                    ))}
                  </div>
                  <div className="mt-5 border border-white/12 p-4">
                    <div className="mb-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#8e887c]">
                      <span>Confidence</span>
                      <span>0.94</span>
                    </div>
                    <div className="h-2 bg-white/10">
                      <div className="h-full w-[94%] bg-gradient-to-r from-[#ffb545] to-[#f2eee4]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="protocol" className="border-t border-white/12 py-16">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-[#ffb545]">Memory protocol</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#f7f2e7] sm:text-6xl">
                Machine memory, humanly inspectable.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#aaa398] lg:justify-self-end">
              The system is designed around a simple contract: nothing enters without consent, nothing is retrieved without provenance, and nothing becomes invisible to its owner.
            </p>
          </div>
          <div className="grid border border-white/12 lg:grid-cols-3">
            {capabilities.map((capability, index) => (
              <article key={capability.index} className={`p-7 ${index < 2 ? "border-b border-white/12 lg:border-b-0 lg:border-r" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-4xl font-semibold text-[#3f3b33]">{capability.index}</p>
                  <span className="border border-[#ff9f1c]/30 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#ffb545]">
                    {capability.meta}
                  </span>
                </div>
                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.025em] text-[#f2eee4]">{capability.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#9d9689]">{capability.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="border border-white/12 bg-white/[0.025] p-7">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#ffb545]">Operator note</p>
              <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-[-0.025em] text-[#f2eee4]">
                “It feels less like searching an archive and more like interrogating my own mind—with receipts.”
              </blockquote>
              <div className="mt-8 border-t border-white/12 pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#d9d2c3]">Ari Voss</p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#777165]">Independent researcher</p>
              </div>
            </div>
            <div className="terminal-scan border border-white/12 bg-[#11110f]">
              <div className="flex items-center justify-between border-b border-white/12 px-5 py-4">
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#d9d2c3]">memory.ledger</p>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#8e887c]">append-only</p>
              </div>
              <div className="overflow-x-auto p-5">
                <table className="w-full min-w-[620px] border-collapse font-mono text-xs">
                  <thead>
                    <tr className="text-left text-[#777165]">
                      <th className="border-b border-white/12 pb-3 font-normal uppercase tracking-[0.16em]">type</th>
                      <th className="border-b border-white/12 pb-3 font-normal uppercase tracking-[0.16em]">artifact</th>
                      <th className="border-b border-white/12 pb-3 font-normal uppercase tracking-[0.16em]">state</th>
                      <th className="border-b border-white/12 pb-3 font-normal uppercase tracking-[0.16em]">effect</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ledgerRows.map(([type, artifact, state, effect]) => (
                      <tr key={artifact} className="text-[#c9c1b1]">
                        <td className="border-b border-white/8 py-4 text-[#ffb545]">{type}</td>
                        <td className="border-b border-white/8 py-4">{artifact}</td>
                        <td className="border-b border-white/8 py-4">{state}</td>
                        <td className="border-b border-white/8 py-4 text-emerald-300">{effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="access" className="pb-14">
          <div className="relative overflow-hidden border border-[#ff9f1c]/35 bg-[#ff9f1c]/8 p-8 sm:p-12">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#ff9f1c]/12 to-transparent" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.26em] text-[#ffb545]">Access protocol</p>
                <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-[#f7f2e7] sm:text-6xl">
                  Install a memory you can audit.
                </h2>
              </div>
              <div>
                <label htmlFor="console-email" className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#ffb545]">
                  Operator email
                </label>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="console-email"
                    type="email"
                    placeholder="operator@private.net"
                    className="min-w-0 flex-1 border border-white/18 bg-black/35 px-4 py-4 font-mono text-sm text-white outline-none placeholder:text-[#6f6a60] focus:border-[#ffb545]"
                  />
                  <button type="button" className="bg-[#f2eee4] px-6 py-4 font-mono text-sm font-bold uppercase tracking-[0.14em] text-black transition hover:bg-[#ffb545]">
                    Request key
                  </button>
                </div>
                <p className="mt-4 font-mono text-[0.62rem] leading-6 text-[#8e887c]">
                  NO TRAINING ON PRIVATE MEMORY / EXPORT AT WILL / DELETE FOREVER
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
