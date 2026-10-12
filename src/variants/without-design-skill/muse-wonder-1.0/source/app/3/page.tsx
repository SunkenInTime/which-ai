import Link from "next/link";

const NODES = [
  { x: 90, y: 150, r: 22, label: "Learning", hot: true },
  { x: 250, y: 60, r: 16, label: "Books" },
  { x: 430, y: 130, r: 26, label: "Second Brain", hot: true },
  { x: 600, y: 55, r: 14, label: "PKM" },
  { x: 660, y: 190, r: 18, label: "Projects" },
  { x: 330, y: 220, r: 14, label: "People" },
  { x: 150, y: 300, r: 15, label: "Ideas" },
  { x: 480, y: 300, r: 20, label: "Recall" },
];

export default function Page3() {
  return (
    <div className="min-h-screen bg-[#F4F6FF] text-[#14205A]">
      {/* Nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <div className="flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-[#3B5BFD] text-white shadow-lg shadow-[#3B5BFD]/30">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="8" r="2.5" /><circle cx="10" cy="18" r="2.5" /><path d="M8 7l7 1M7 8l2 7M16 10l-4 6" /></svg>
          </span>
          <span className="text-[17px] font-bold tracking-tight">Synapse</span>
          <span className="ml-1 rounded-full bg-[#3B5BFD]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#3B5BFD]">03 · Graph</span>
        </div>
        <nav className="hidden gap-7 text-sm font-medium text-[#5A6AB0] md:flex">
          <a href="#graph" className="hover:text-[#14205A]">Graph</a><a href="#features" className="hover:text-[#14205A]">Features</a><a href="#stories" className="hover:text-[#14205A]">Stories</a>
        </nav>
        <Link href="/without-design-skill/muse-wonder-1.0/4" className="rounded-full bg-[#14205A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3B5BFD]">Open your graph</Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-10 lg:px-10 lg:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-[#3B5BFD] shadow-sm ring-1 ring-[#DDE4FF]">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-[#3B5BFD]" /> 1,284 notes · 4,912 connections · live
            </p>
            <h1 className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[68px]">
              See how
              <br />you <span className="bg-gradient-to-r from-[#3B5BFD] to-[#8AA8FF] bg-clip-text text-transparent">think.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[#4A5AA8]">
              Every note is a node. Every idea, a connection waiting to be seen. Synapse turns scattered notes into a living map of your mind — so patterns find you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="rounded-full bg-[#3B5BFD] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3B5BFD]/30 transition hover:bg-[#2E4AE0]">Map my mind — free</button>
              <button className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#14205A] ring-1 ring-[#DDE4FF] transition hover:ring-[#3B5BFD]/40">Explore live demo</button>
            </div>
            <div className="mt-7 flex gap-8 text-sm">
              <p><span className="text-xl font-bold">4.9×</span><br /><span className="text-[#7A8AD0]">more ideas reused</span></p>
              <p><span className="text-xl font-bold">0.3s</span><br /><span className="text-[#7A8AD0]">to any memory</span></p>
              <p><span className="text-xl font-bold">Zero</span><br /><span className="text-[#7A8AD0]">folders to manage</span></p>
            </div>
          </div>

          {/* Graph visual */}
          <div id="graph" className="relative overflow-hidden rounded-[28px] bg-[#101A4E] p-2 shadow-2xl shadow-[#3B5BFD]/20 ring-1 ring-[#2A3AA0]/40">
            <div className="flex items-center justify-between px-4 py-3 text-[12px] font-medium text-[#9DB1FF]">
              <span>✦ Your knowledge graph</span><span className="rounded-full bg-white/10 px-2.5 py-1">Zoom to explore</span>
            </div>
            <svg viewBox="0 0 760 380" className="w-full">
              <defs>
                <radialGradient id="glow"><stop offset="0%" stopColor="#3B5BFD" stopOpacity="0.35" /><stop offset="100%" stopColor="#3B5BFD" stopOpacity="0" /></radialGradient>
              </defs>
              <circle cx="430" cy="140" r="150" fill="url(#glow)" />
              {[[90,150,430,130],[250,60,430,130],[430,130,600,55],[430,130,660,190],[250,60,600,55],[90,150,330,220],[330,220,430,130],[330,220,480,300],[150,300,330,220],[150,300,90,150],[480,300,660,190],[480,300,430,130]].map(([x1,y1,x2,y2],i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5B7CFF" strokeWidth="1.4" opacity="0.45" className="graph-line" />
              ))}
              {NODES.map((n) => (
                <g key={n.label}>
                  <circle cx={n.x} cy={n.y} r={n.r + 10} fill="#3B5BFD" opacity="0.12" />
                  <circle cx={n.x} cy={n.y} r={n.r} fill={n.hot ? "#3B5BFD" : "#1E2E7A"} stroke="#8AA8FF" strokeWidth="1.5" />
                  <text x={n.x} y={n.y + n.r + 18} textAnchor="middle" fill="#C6D2FF" fontSize="12" fontWeight="600">{n.label}</text>
                </g>
              ))}
            </svg>
            <div className="mx-3 mb-3 flex items-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/10 backdrop-blur">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#3B5BFD] text-sm text-white">⌕</span>
              <p className="text-sm text-[#D6DEFF]">Ask: <span className="font-semibold text-white">“How does ‘spaced repetition’ connect to my product ideas?”</span></p>
              <span className="ml-auto hidden shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#14205A] sm:inline">7 paths found</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-md text-4xl font-bold leading-tight tracking-tight">Not a list of notes.<br />A map of meaning.</h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#5A6AB0]">Lists hide connections. Graphs reveal them. Every feature below exists to make the invisible structure of your thinking visible.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: "◉", title: "Living graph view", body: "Zoom from 10,000 notes down to a single thought. Clusters form around what matters — watch your interests take shape in real time.", tag: "Visual" },
            { icon: "⛓", title: "Automatic linking", body: "Synapse reads for meaning, not keywords. A book note from 2021 links itself to today's project — before you remember either exists.", tag: "AI" },
            { icon: "✧", title: "Ask the graph", body: "Questions traverse connections, not just files. Get answers that synthesize across everything you've ever saved, with paths shown.", tag: "Recall" },
          ].map((f) => (
            <article key={f.title} className="group rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#E2E8FF] transition hover:shadow-xl hover:shadow-[#3B5BFD]/10">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#EEF2FF] text-lg text-[#3B5BFD] transition group-hover:bg-[#3B5BFD] group-hover:text-white">{f.icon}</span>
                <span className="rounded-full bg-[#F4F6FF] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#7A8AD0]">{f.tag}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#5A6AB0]">{f.body}</p>
            </article>
          ))}
        </div>

        {/* Node cards */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {[
            { label: "Strongest cluster", title: "Learning science", meta: "86 notes · 214 links", w: "92%" },
            { label: "Newest connection", title: "“Habits” ↔ “Onboarding”", meta: "Linked 12 min ago · you", w: "64%" },
            { label: "Ready to resurface", title: "Decision from March", meta: "Relevant to open project", w: "78%" },
          ].map((c) => (
            <div key={c.title} className="rounded-3xl bg-[#14205A] p-6 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8AA8FF]">{c.label}</p>
              <p className="mt-2 text-lg font-bold">{c.title}</p>
              <p className="mt-1 text-sm text-[#9DB1FF]">{c.meta}</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gradient-to-r from-[#3B5BFD] to-[#8AA8FF]" style={{ width: c.w }} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* Stories + CTA */}
      <section id="stories" className="border-t border-[#E2E8FF] bg-white py-20 pb-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#3B5BFD]">Thinkers on Synapse</p>
              <blockquote className="mt-4 text-3xl font-bold leading-snug tracking-tight">“I didn&apos;t find a note. I found a pattern in my own thinking I&apos;d never seen.”</blockquote>
              <p className="mt-4 text-sm font-medium text-[#7A8AD0]">— Elena V., Systems researcher · 21,000 notes mapped</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="rounded-full bg-[#3B5BFD] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3B5BFD]/30">Start mapping — free</button>
                <p className="self-center text-sm text-[#7A8AD0]">Free to 1,000 notes · Pro $8/mo unlimited</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["21k", "notes, one map"], ["340%", "more cross-links found"], ["12 min", "weekly review, done"], ["0", "folders maintained"]].map(([v, l]) => (
                <div key={l} className="rounded-3xl bg-[#F4F6FF] p-6 ring-1 ring-[#E2E8FF]">
                  <p className="text-3xl font-bold">{v}</p><p className="mt-1 text-sm text-[#5A6AB0]">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-14 text-center text-xs font-medium text-[#9DB1D6]">03 · Graph — the visual direction. Use the pill below to compare →</p>
        </div>
      </section>
    </div>
  );
}
