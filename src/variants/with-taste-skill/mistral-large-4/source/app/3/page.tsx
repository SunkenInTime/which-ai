import {
  ArrowRight,
  Graph,
  Lightning,
  Terminal,
  LockKey,
} from "@phosphor-icons/react/dist/ssr";

export default function Iteration3() {
  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] font-mono text-lime-400">

      {/* Marquee strip */}
      <div className="overflow-hidden border-b-2 border-lime-400 bg-lime-400 py-2 text-black">
        <div className="whitespace-nowrap text-sm font-bold uppercase tracking-widest">
          CAPTURE * CONNECT * RECALL * CAPTURE * CONNECT * RECALL * CAPTURE * CONNECT * RECALL * CAPTURE * CONNECT * RECALL *
        </div>
      </div>

      {/* Nav */}
      <nav className="flex h-16 items-center justify-between border-b-2 border-lime-400 px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center bg-lime-400 text-lg font-black text-black">
            M
          </span>
          <span className="text-lg font-black uppercase tracking-tighter">
            MNEMOSYNE.SYS
          </span>
        </div>
        <div className="hidden items-center gap-6 text-sm uppercase md:flex">
          <a href="#features" className="transition-colors hover:text-white">[FEATURES]</a>
          <a href="#security" className="transition-colors hover:text-white">[SECURITY]</a>
          <a href="#pricing" className="transition-colors hover:text-white">[PRICING]</a>
        </div>
        <a
          href="#start"
          className="border-2 border-lime-400 bg-lime-400 px-4 py-2 text-sm font-bold uppercase text-black transition-colors hover:bg-transparent hover:text-lime-400 active:translate-y-[1px]"
        >
          RUN &gt;
        </a>
      </nav>

      {/* Hero - Brutalist */}
      <section className="border-b-2 border-lime-400 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-sm uppercase tracking-widest text-zinc-500">
            {"// SECOND_BRAIN.EXE v2.4.1"}
          </div>
          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl lg:text-8xl">
            THINK
            <br />
            <span className="bg-lime-400 text-black">LOUDER.</span>
          </h1>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <p className="max-w-md text-base leading-relaxed text-zinc-400">
              {">"} A note-taking system for people who think in systems. Capture
              raw. Connect automatically. Recall instantly. No friction. No
              mercy for lost ideas.
            </p>
            <div className="flex flex-col items-start justify-center gap-4 md:items-end">
              <a
                href="#start"
                className="group inline-flex items-center gap-3 border-2 border-lime-400 px-6 py-3 text-base font-bold uppercase transition-colors hover:bg-lime-400 hover:text-black active:translate-y-[1px]"
              >
                INITIALIZE
                <ArrowRight size={20} weight="bold" />
              </a>
              <span className="text-xs uppercase tracking-widest text-zinc-600">
                NO SIGNUP WALL. NO NONSENSE.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Terminal-style preview */}
      <section className="border-b-2 border-lime-400 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="border-2 border-lime-400">
            <div className="flex items-center gap-2 border-b-2 border-lime-400 bg-lime-400 px-4 py-2 text-sm font-bold uppercase text-black">
              <Terminal size={16} weight="bold" />
              <span>mnemosyne --interactive</span>
            </div>
            <div className="space-y-2 p-6 text-sm">
              <p>
                <span className="text-zinc-500">$</span> capture &ldquo;idea: graph-based recall&rdquo;
              </p>
              <p className="text-lime-300">OK. stored. 3 connections found.</p>
              <p>
                <span className="text-zinc-500">$</span> recall &ldquo;that thing about memory&rdquo;
              </p>
              <p className="text-lime-300">
                FOUND: &ldquo;idea: graph-based recall&rdquo; (confidence: 0.94)
              </p>
              <p>
                <span className="text-zinc-500">$</span> connect &ldquo;idea&rdquo; {"<->"} &ldquo;essay draft&rdquo;
              </p>
              <p className="text-lime-300">LINKED. graph updated.</p>
              <p>
                <span className="text-zinc-500">$</span>
                <span className="animate-pulse">_</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Grid with borders */}
      <section id="features" className="border-b-2 border-lime-400">
        <div className="grid md:grid-cols-2">
          {[
            {
              icon: Graph,
              title: "AUTO-GRAPH",
              desc: "Every note links itself. Your knowledge base builds itself while you type. Zero manual tagging.",
            },
            {
              icon: Lightning,
              title: "ZERO-LATENCY",
              desc: "Sub-50ms capture from any device. Your thought lands before it evaporates.",
            },
            {
              icon: LockKey,
              title: "LOCKED DOWN",
              desc: "AES-256 end-to-end. We literally cannot read your notes. Neither can anyone else.",
            },
            {
              icon: Terminal,
              title: "CLI NATIVE",
              desc: "Pipe thoughts from your terminal. Script your second brain. Automate everything.",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className={`border-lime-400 p-8 ${
                i % 2 === 0 ? "border-r-2 md:border-r-2" : ""
              } ${i < 2 ? "border-b-2" : ""}`}
            >
              <f.icon size={32} weight="bold" />
              <h3 className="mt-4 text-xl font-black uppercase tracking-tight">
                {f.title}
              </h3>
              <p className="mt-3 leading-relaxed text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b-2 border-lime-400 px-6 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "50ms", label: "CAPTURE LATENCY" },
            { value: "256-bit", label: "ENCRYPTION" },
            { value: "0", label: "TRACKERS" },
            { value: "100%", label: "YOURS" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-black md:text-5xl">{stat.value}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-zinc-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="px-6 py-20">
        <div className="mx-auto max-w-3xl border-2 border-lime-400 p-10 text-center md:p-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter md:text-5xl">
            STOP LOSING
            <br />
            <span className="bg-lime-400 text-black">YOUR IDEAS.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-zinc-400">
            Free tier includes unlimited notes. Upgrade only if you outgrow it.
          </p>
          <a
            href="#signup"
            className="mt-8 inline-flex items-center gap-3 bg-lime-400 px-8 py-4 text-base font-black uppercase text-black transition-colors hover:bg-white active:translate-y-[1px]"
          >
            DEPLOY NOW
            <ArrowRight size={20} weight="bold" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-lime-400 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-widest text-zinc-500">
          <span>MNEMOSYNE.SYS {"//"} EST. 2024</span>
          <div className="flex gap-6">
            <a href="#privacy" className="transition-colors hover:text-lime-400">PRIVACY</a>
            <a href="#terms" className="transition-colors hover:text-lime-400">TERMS</a>
            <a href="#github" className="transition-colors hover:text-lime-400">GITHUB</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
