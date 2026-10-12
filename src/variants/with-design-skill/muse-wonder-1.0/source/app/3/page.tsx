import Switcher from "../components/Switcher";

export default function Page3() {
  const mono = { fontFamily: "'Space Mono',monospace" } as const;
  const arch = { fontFamily: "'Archivo',sans-serif" } as const;
  return (
    <main className="min-h-screen bg-white pb-36 text-[#101014]" style={arch}>
      <header className="border-b-2 border-[#101014]">
        <div className="mx-auto flex max-w-6xl items-stretch justify-between px-6">
          <a href="/with-design-skill/muse-wonder-1.0/3" className="flex items-center gap-3 py-4 text-xl font-black tracking-tight"><span className="grid size-8 place-items-center bg-[#2438FF] text-sm font-black text-white">N</span>NOEMA<span className="hidden text-xs font-bold text-[#2438FF] sm:inline" style={mono}>/ SECOND BRAIN v3</span></a>
          <nav className="hidden items-center gap-0 text-sm font-bold md:flex"><a className="border-l border-[#101014]/15 px-5 py-5 hover:bg-[#101014] hover:text-white" href="#specs">Specs</a><a className="border-l border-[#101014]/15 px-5 py-5 hover:bg-[#101014] hover:text-white" href="#method">Method</a><a className="border-l border-r border-[#101014]/15 px-5 py-5 hover:bg-[#101014] hover:text-white" href="#pricing">Pricing</a></nav>
          <a href="#cta" className="my-3 bg-[#FF3B30] px-5 py-2.5 text-sm font-black text-white transition hover:bg-[#101014]">START FREE →</a>
        </div>
      </header>

      <section className="border-b-2 border-[#101014]">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-[1.2fr_0.8fr]">
          <div className="px-6 py-16">
            <p className="inline-block bg-[#101014] px-3 py-1.5 text-xs font-bold text-white" style={mono}>NOTE-TAKING, ENGINEERED</p>
            <h1 className="mt-6 text-6xl font-black leading-[0.92] tracking-tight sm:text-7xl">THINK.<br />CAPTURE.<br /><span className="text-[#2438FF]">RETRIEVE.</span></h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#101014]/60">Noema is a precision instrument for your mind: sub-second capture, automatic linking, and retrieval so fast it feels like remembering. Measured, not marketed.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#cta" className="bg-[#2438FF] px-7 py-3.5 font-black text-white transition hover:bg-[#101014]">Start free — 60 seconds</a><a href="#specs" className="border-2 border-[#101014] px-7 py-3.5 font-black transition hover:bg-[#101014] hover:text-white">Read the specs</a></div>
          </div>
          <div className="border-t-2 border-[#101014] lg:border-l-2 lg:border-t-0" style={mono}>
            {[["Capture latency", "0.4 s"], ["Search across 10k notes", "38 ms"], ["Links suggested per note", "4.2"], ["Uptime, last 12 months", "99.99%"]].map(([k, v], i) => (
              <div key={k} className={`flex items-baseline justify-between px-6 py-5 ${i > 0 ? "border-t border-[#101014]/15" : ""}`}><span className="text-sm text-[#101014]/55">{k}</span><span className="text-2xl font-bold text-[#2438FF]">{v}</span></div>
            ))}
            <p className="border-t border-[#101014]/15 px-6 py-4 text-xs text-[#101014]/45">Benchmarks: M-series laptop, local index, Oct 2026.</p>
          </div>
        </div>
      </section>

      <section id="method" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black tracking-tight">THE METHOD</h2>
        <div className="mt-8 grid border-2 border-[#101014] md:grid-cols-3">
          {[["01", "CAPTURE", "One shortcut from anywhere. Text, voice, web, PDF — normalised into plain, portable notes you own."], ["02", "CONNECT", "Bi-directional links and a local graph engine surface relationships while you write, not after."], ["03", "RETRIEVE", "Full-text + semantic search over everything, offline. If you wrote it, you will find it."]].map(([n, t, d], i) => (
            <div key={t} className={`p-7 ${i > 0 ? "border-t-2 border-[#101014] md:border-l-2 md:border-t-0" : ""}`}><span className="text-sm font-bold text-[#FF3B30]" style={mono}>{n}</span><h3 className="mt-3 text-xl font-black">{t}</h3><p className="mt-2 leading-relaxed text-[#101014]/60">{d}</p></div>
          ))}
        </div>
      </section>

      <section id="specs" className="border-y-2 border-[#101014] bg-[#101014] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-black">SPECIFICATIONS</h2>
          <div className="mt-8 grid gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-4" style={mono}>
            {[["Format", "Markdown, forever"], ["Encryption", "End-to-end"], ["Sync", "Local-first, 3s"], ["Export", "One click, no lock-in"], ["Platforms", "Mac · Win · iOS · Android · Web"], ["Graph", "10k+ nodes, 60fps"], ["AI", "On-device by default"], ["Support", "Humans, < 4h reply"]].map(([k, v]) => (
              <div key={k} className="bg-[#101014] p-5"><p className="text-xs text-white/45">{k}</p><p className="mt-1.5 font-bold">{v}</p></div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">“We evaluated six tools over a quarter. Noema was the only one our engineers kept using after the trial ended.” — <span className="text-white">Priya Nair, Head of Research, Feldspar Labs</span></p>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-black">PRICING</h2>
        <div className="mt-8 grid border-2 border-[#101014] md:grid-cols-2">
          <div className="p-8"><p className="font-black">CORE</p><p className="mt-4"><span className="text-5xl font-black">$0</span></p><ul className="mt-5 space-y-2 text-[#101014]/65" style={mono}><li>— 1,000 notes</li><li>— Full-text search</li><li>— 2 devices</li></ul></div>
          <div className="border-t-2 border-[#101014] bg-[#2438FF] p-8 text-white md:border-l-2 md:border-t-0"><p className="font-black">PRO</p><p className="mt-4"><span className="text-5xl font-black">$10</span><span className="text-white/60"> /mo</span></p><ul className="mt-5 space-y-2 text-white/85" style={mono}><li>— Unlimited everything</li><li>— Semantic search + graph AI</li><li>— Priority support</li></ul></div>
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-6xl px-6 pb-4 text-center"><h2 className="text-4xl font-black">RUN THE EXPERIMENT.</h2><p className="mt-3 text-[#101014]/55">Thirty days. Your actual notes. Keep them either way.</p><a href="#cta" className="mt-7 inline-block bg-[#FF3B30] px-9 py-4 font-black text-white hover:bg-[#101014]">START FREE →</a></section>
      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-6 pt-14 text-xs text-[#101014]/45" style={mono}><span>© 2026 NOEMA — THE LABORATORY</span><span>PRIVACY / TERMS / CHANGELOG</span></footer>
      <Switcher />
    </main>
  );
}
