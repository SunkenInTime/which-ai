import Link from "next/link";

const CARDS = [
  {
    n: 1,
    name: "Garden",
    tagline: "Calm, minimal",
    desc: "Warm ivory, soft sage, and breathing room. A second brain that feels like a quiet garden — capture gently, wander freely.",
    palette: ["#FAF8F2", "#5A7A5A", "#E8EDE3"],
    accent: "bg-[#5A7A5A]",
    text: "text-[#2B3324]",
    card: "bg-[#FAF8F2] border-[#E2E8D8]",
  },
  {
    n: 2,
    name: "Brutal",
    tagline: "Bold & unapologetic",
    desc: "Highlighter yellow, hard shadows, mono type. For minds that move fast and refuse to forget a single thing.",
    palette: ["#FFE500", "#0A0A0A", "#FF6B6B"],
    accent: "bg-black",
    text: "text-black",
    card: "bg-[#FFE500] border-black",
  },
  {
    n: 3,
    name: "Graph",
    tagline: "See how you think",
    desc: "Every note is a node. Watch ideas connect in a living map — your knowledge, visualized as a constellation.",
    palette: ["#EFF3FF", "#3B5BFD", "#8AA8FF"],
    accent: "bg-[#3B5BFD]",
    text: "text-[#16205A]",
    card: "bg-[#EFF3FF] border-[#D4DEFF]",
  },
  {
    n: 4,
    name: "Press",
    tagline: "Editorial, timeless",
    desc: "Set like a broadsheet. Serif columns, ruled lines, and the quiet authority of print — for deep, deliberate thinking.",
    palette: ["#FDFBF6", "#1A1712", "#9A8B73"],
    accent: "bg-[#1A1712]",
    text: "text-[#1A1712]",
    card: "bg-[#FDFBF6] border-[#E6DFD0]",
  },
  {
    n: 5,
    name: "Midnight",
    tagline: "Dark glass command",
    desc: "A nocturnal cockpit for your mind. Glowing recall, instant search, and focus that feels cinematic after dark.",
    palette: ["#070714", "#7C5CFF", "#22D3EE"],
    accent: "bg-[#7C5CFF]",
    text: "text-white",
    card: "bg-[#0B0B1C] border-white/15",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-lg font-black text-zinc-950">S</div>
          <div>
            <p className="text-[15px] font-bold leading-none tracking-tight">Synapse</p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-zinc-400">Second brain · 5 directions</p>
          </div>
        </div>
        <p className="hidden text-sm text-zinc-400 sm:block">
          One product, five personalities. <span className="text-white">Pick a world to step into.</span>
        </p>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-8 lg:px-10 lg:pt-14">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-zinc-400">Synapse — Note-taking as a second brain</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
          Your mind,
          <br />
          <span className="text-zinc-400">five ways to</span> keep it.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
          The same second-brain app — capture anything, connect everything, recall instantly — art-directed five different ways. Open each iteration and feel which brain is yours.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/1" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200">
            Start with 01 · Garden →
          </Link>
          <span className="rounded-full border border-white/15 px-4 py-3 text-sm text-zinc-300">Tip: use the pill below or press 1–5</span>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-36 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <Link
              key={c.n}
              href={`/${c.n}`}
              className={`group relative overflow-hidden rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${c.card} ${c.n === 5 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="flex items-start justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${c.n === 5 ? "text-zinc-400" : "opacity-50"}`}>
                  Iteration 0{c.n}
                </span>
                <span className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-white transition group-hover:scale-110 ${c.accent}`}>
                  {c.n}
                </span>
              </div>

              {/* Mini visual */}
              <div className="mt-6 flex h-28 items-end gap-2">
                {c.n === 1 && (
                  <div className="flex w-full gap-2">
                    <div className="h-20 flex-1 rounded-2xl bg-white shadow-sm ring-1 ring-black/5" />
                    <div className="h-28 flex-1 rounded-2xl bg-[#DCE8D5] ring-1 ring-black/5" />
                    <div className="h-16 flex-1 rounded-2xl bg-white shadow-sm ring-1 ring-black/5" />
                  </div>
                )}
                {c.n === 2 && (
                  <div className="flex w-full gap-2">
                    <div className="h-24 flex-1 border-[3px] border-black bg-white shadow-[5px_5px_0_#000]" />
                    <div className="h-16 flex-1 border-[3px] border-black bg-black shadow-[5px_5px_0_rgba(0,0,0,0.25)]" />
                    <div className="h-20 w-14 border-[3px] border-black bg-[#FF6B6B] shadow-[5px_5px_0_#000]" />
                  </div>
                )}
                {c.n === 3 && (
                  <svg viewBox="0 0 300 110" className="h-full w-full">
                    <line x1="40" y1="80" x2="130" y2="30" stroke="#3B5BFD" strokeWidth="1.5" opacity="0.5" />
                    <line x1="130" y1="30" x2="220" y2="70" stroke="#3B5BFD" strokeWidth="1.5" opacity="0.5" />
                    <line x1="130" y1="30" x2="260" y2="20" stroke="#8AA8FF" strokeWidth="1.5" opacity="0.6" />
                    <line x1="40" y1="80" x2="150" y2="90" stroke="#8AA8FF" strokeWidth="1.5" opacity="0.5" />
                    <circle cx="40" cy="80" r="10" fill="#3B5BFD" /><circle cx="130" cy="30" r="14" fill="#16205A" />
                    <circle cx="220" cy="70" r="9" fill="#8AA8FF" /><circle cx="260" cy="20" r="7" fill="#3B5BFD" />
                    <circle cx="150" cy="90" r="6" fill="#B9C9FF" />
                  </svg>
                )}
                {c.n === 4 && (
                  <div className="w-full space-y-2">
                    <div className="h-3 w-3/4 bg-[#1A1712]" />
                    <div className="h-px w-full bg-[#1A1712]/25" />
                    <div className="flex gap-3"><div className="h-14 flex-1 bg-[#1A1712]/10" /><div className="h-14 flex-1 bg-[#1A1712]/10" /><div className="h-14 flex-1 bg-[#1A1712]/10" /></div>
                  </div>
                )}
                {c.n === 5 && (
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                    <div className="absolute -left-4 top-3 h-16 w-16 rounded-full bg-[#7C5CFF]/50 blur-xl" />
                    <div className="absolute right-4 top-6 h-12 w-12 rounded-full bg-cyan-400/40 blur-lg" />
                    <div className="absolute inset-x-4 bottom-3 space-y-1.5"><div className="h-2 w-2/3 rounded bg-white/50" /><div className="h-2 w-1/2 rounded bg-white/25" /></div>
                  </div>
                )}
              </div>

              <h2 className={`mt-6 text-2xl font-bold tracking-tight ${c.text}`}>{c.name}</h2>
              <p className={`text-sm font-medium ${c.n === 5 ? "text-zinc-400" : "opacity-60"}`}>{c.tagline}</p>
              <p className={`mt-2 text-[14px] leading-relaxed ${c.n === 5 ? "text-zinc-300" : "opacity-75"}`}>{c.desc}</p>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {c.palette.map((hex) => (
                    <span key={hex} className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: hex }} />
                  ))}
                </div>
                <span className={`text-sm font-semibold ${c.text}`}>Open /{c.n} →</span>
              </div>
            </Link>
          ))}

          {/* How to use card */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">How to explore</p>
              <h3 className="mt-3 text-xl font-bold">One pill, five worlds.</h3>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-zinc-300">
                <li>• Use the floating pill at the bottom to jump between /1 – /5.</li>
                <li>• Press <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px]">1</kbd>–<kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px]">5</kbd> or <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px]">←</kbd><kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px]">→</kbd> to switch.</li>
                <li>• Each page is a complete landing page for the same app, Synapse.</li>
              </ul>
            </div>
            <p className="mt-6 text-xs text-zinc-500">All pages share one switcher — no dead ends, ever.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-zinc-500">Synapse — your second brain, five ways. Built for exploration.</footer>
    </div>
  );
}
