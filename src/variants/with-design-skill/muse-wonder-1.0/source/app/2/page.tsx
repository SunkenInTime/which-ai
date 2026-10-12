import Switcher from "../components/Switcher";

export default function Page2() {
  return (
    <main className="min-h-screen bg-[#0B1026] pb-36 text-[#E8EAF6]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
      <div aria-hidden className="pointer-events-none fixed inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(1px 1px at 12% 22%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 78% 12%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 62% 38%, #B9C2FF 50%, transparent 51%), radial-gradient(1px 1px at 34% 66%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 88% 58%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 22% 84%, #8B7CF0 50%, transparent 51%)" }} />
      <div className="relative">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a href="/with-design-skill/muse-wonder-1.0/2" className="flex items-center gap-2 text-xl font-bold tracking-tight"><span className="grid size-8 place-items-center rounded-full bg-[#8B7CF0] text-sm">✦</span>Noema</a>
          <nav className="hidden gap-7 text-[15px] text-white/60 md:flex"><a className="hover:text-white" href="#map">Star map</a><a className="hover:text-white" href="#features">Features</a><a className="hover:text-white" href="#pricing">Pricing</a></nav>
          <a href="#cta" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1026] transition hover:bg-[#C9C2FF]">Launch your universe</a>
        </header>

        <section className="mx-auto max-w-6xl px-6 pt-12 text-center">
          <p className="text-sm font-semibold text-[#9AA6FF]">Every note is a star. Every link, a constellation.</p>
          <h1 className="mx-auto mt-5 max-w-3xl text-6xl font-bold leading-[0.98] tracking-tight sm:text-7xl">Your mind,<br />mapped like<br /><span className="text-[#8B7CF0]">the night sky.</span></h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/55">Noema turns scattered notes into a living star map. Zoom out to see the shape of your thinking; zoom in and every idea is exactly where you left it.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#cta" className="rounded-full bg-[#8B7CF0] px-7 py-3.5 font-semibold text-white shadow-[0_12px_32px_rgba(139,124,240,0.45)] transition hover:-translate-y-0.5">Chart your first stars</a><a href="#map" className="rounded-full border border-white/20 px-7 py-3.5 font-semibold transition hover:bg-white/10">Explore the map</a></div>
        </section>

        <section id="map" className="mx-auto max-w-5xl px-6 pt-14">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#121A3D] px-6 py-10">
            <svg viewBox="0 0 800 340" className="mx-auto w-full max-w-3xl" role="img" aria-label="Constellation graph of connected notes">
              <g stroke="#8B7CF0" strokeOpacity="0.45" strokeWidth="1.2"><path d="M120 240 L280 140 L430 200 L560 90 L690 160" fill="none" /><path d="M280 140 L390 60 L560 90" fill="none" /><path d="M430 200 L540 270 L690 160" fill="none" /></g>
              {[[120,240,7,"#67E8F9","Habit loop"],[280,140,9,"#8B7CF0","Deep work"],[430,200,6,"#FFD166","Talk draft"],[560,90,8,"#FF8FAB","Novel idea"],[690,160,6,"#67E8F9","Research"],[390,60,5,"#fff","Focus"],[540,270,5,"#fff","Outline"]].map(([cx,cy,r,fill,label]) => (
                <g key={label as string}><circle cx={cx as number} cy={cy as number} r={r as number} fill={fill as string} /><circle cx={cx as number} cy={cy as number} r={(r as number) * 2.4} fill={fill as string} opacity="0.14" /><text x={(cx as number) + 14} y={(cy as number) + 4} fill="#C9CFF5" fontSize="13" fontFamily="Space Grotesk">{label as string}</text></g>
              ))}
            </svg>
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-[13px]" style={{ fontFamily: "'IBM Plex Mono',monospace" }}><span className="rounded-full bg-white/8 px-3 py-1.5 text-white/70">2,847 stars</span><span className="rounded-full bg-white/8 px-3 py-1.5 text-white/70">6,102 links</span><span className="rounded-full bg-[#8B7CF0]/25 px-3 py-1.5 text-[#C9C2FF]">New cluster forming: “attention”</span></div>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-4 text-center">{[["2.8k", "notes per power user"], ["38%", "more ideas connected"], ["<1s", "to find anything"]].map(([v,l]) => (<p key={l} className="text-sm text-white/45"><span className="block text-3xl font-bold text-white">{v}</span>{l}</p>))}</div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 pt-24">
          <h2 className="text-center text-4xl font-bold tracking-tight">Built for the way<br />thoughts actually connect</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[["◎", "Star map", "Your whole second brain as one navigable sky. Clusters glow as topics heat up; cold stars fade until you need them."], ["⌁", "Instant links", "Type [[ and Noema suggests the note you meant. Backlinks appear everywhere, automatically."], ["☾", "Recall at dusk", "A nightly review resurfaces 5 stars worth revisiting, spaced to when you’ll forget them."]].map(([i,t,d]) => (
              <div key={t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:border-[#8B7CF0]/50"><span className="text-2xl text-[#9AA6FF]" aria-hidden>{i}</span><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="mt-2 leading-relaxed text-white/55">{d}</p></div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pt-20 text-center">
          <p className="text-2xl font-medium leading-relaxed">“I opened the star map after a month and literally saw the shape of my thesis. Three clusters I hadn’t realised were one idea.”</p>
          <p className="mt-4 text-sm text-white/40">Jonas Weber · PhD researcher, 5,900 stars charted</p>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-6 pt-20">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"><h3 className="text-xl font-bold">Stargazer</h3><p className="mt-1 text-white/50">Start charting</p><p className="mt-5"><span className="text-4xl font-bold">$0</span> forever</p><ul className="mt-5 space-y-2 text-white/60"><li>• 500 stars</li><li>• Star map view</li><li>• Nightly recall</li></ul></div>
            <div className="rounded-3xl bg-[#8B7CF0] p-8"><h3 className="text-xl font-bold">Cosmos</h3><p className="mt-1 text-white/70">The full universe</p><p className="mt-5"><span className="text-4xl font-bold">$9</span> / month</p><ul className="mt-5 space-y-2 text-white/85"><li>• Unlimited stars & links</li><li>• AI cluster detection</li><li>• Offline, every device</li></ul></div>
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-6xl px-6 pt-20 text-center"><h2 className="text-4xl font-bold">Begin your constellation.</h2><a href="#cta" className="mt-6 inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#0B1026]">Chart your first stars — free</a></section>
        <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-6 pt-16 text-sm text-white/35"><span>© 2026 Noema · The Constellation</span><span>Privacy · Terms</span></footer>
      </div>
      <Switcher />
    </main>
  );
}
