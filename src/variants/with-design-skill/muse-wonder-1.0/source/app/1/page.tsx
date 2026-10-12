import Switcher from "../components/Switcher";

const notes = [
  { tag: "Seed", title: "Morning pages — Oct 12", body: "Three pages before phone. The idea about linked thinking kept returning…", x: "sm:rotate-[-2deg]" },
  { tag: "Sprout", title: "Reading: The Extended Mind", body: "Clark & Chalmers — the notebook is part of the mind, not a record of it.", x: "sm:rotate-[1.5deg] sm:translate-y-6" },
  { tag: "In bloom", title: "Talk prep: second brains", body: "12 links · resurfaced 4 times this month · connected to 3 projects", x: "sm:rotate-[-1deg]" },
];

export default function Page1() {
  return (
    <main className="min-h-screen bg-[#EDF2E4] pb-36 text-[#21301F]" style={{ fontFamily: "'Inter',sans-serif" }}>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/with-design-skill/muse-wonder-1.0/1" className="flex items-center gap-2 text-xl font-black tracking-tight" style={{ fontFamily: "'Fraunces',serif" }}><span className="grid size-8 place-items-center rounded-full bg-[#5A7D4F] text-base text-white">✿</span>Noema</a>
        <nav className="hidden items-center gap-7 text-[15px] font-medium text-[#21301F]/70 md:flex"><a className="hover:text-[#21301F]" href="#how">How it grows</a><a className="hover:text-[#21301F]" href="#features">Features</a><a className="hover:text-[#21301F]" href="#pricing">Pricing</a></nav>
        <a href="#cta" className="rounded-full bg-[#21301F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5A7D4F]">Plant your first note</a>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-14 text-center">
        <span className="inline-block rounded-full border border-[#5A7D4F]/30 bg-white/60 px-4 py-1.5 text-sm font-semibold text-[#5A7D4F]">🌱 Your second brain, tended daily</span>
        <h1 className="mx-auto mt-6 max-w-3xl text-6xl font-black leading-[0.98] tracking-tight sm:text-7xl" style={{ fontFamily: "'Fraunces',serif" }}>Plant a thought.<br />Watch it <span className="italic text-[#5A7D4F]">grow.</span></h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#21301F]/65">Noema is a note-taking garden for your mind. Capture seeds in seconds, link them as they sprout, and harvest ideas when they bloom — nothing wilts, nothing gets lost.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#cta" className="rounded-full bg-[#E86A7A] px-7 py-3.5 font-semibold text-white shadow-[0_10px_24px_rgba(232,106,122,0.35)] transition hover:-translate-y-0.5">Start growing free</a>
          <a href="#how" className="rounded-full border border-[#21301F]/15 bg-white/70 px-7 py-3.5 font-semibold transition hover:bg-white">See how it works</a>
        </div>
        <p className="mt-4 text-sm text-[#21301F]/45">Free for your first 100 notes · No card needed</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <div className="relative">
          <div className="absolute -top-8 left-10 text-5xl" aria-hidden>🌿</div>
          <div className="absolute -top-4 right-12 text-4xl" aria-hidden>🌸</div>
          <div className="grid gap-5 sm:grid-cols-3">
            {notes.map((n) => (
              <article key={n.title} className={`rounded-[28px] bg-white p-6 text-left shadow-[0_18px_36px_rgba(33,48,31,0.08)] ${n.x}`}>
                <span className="rounded-full bg-[#EDF2E4] px-3 py-1 text-xs font-bold text-[#5A7D4F]">{n.tag}</span>
                <h3 className="mt-4 text-lg font-bold leading-snug" style={{ fontFamily: "'Fraunces',serif" }}>{n.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#21301F]/60">{n.body}</p>
                <div className="mt-5 flex gap-1.5" aria-hidden><span className="h-1.5 flex-1 rounded-full bg-[#5A7D4F]" /><span className="h-1.5 flex-1 rounded-full bg-[#E9B44C]" /><span className="h-1.5 flex-1 rounded-full bg-[#EDF2E4]" /></div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-3 text-center">
          {[["48k", "gardeners"], ["12M", "notes planted"], ["4.9★", "average rating"]].map(([v, l]) => (<p key={l} className="text-sm text-[#21301F]/55"><span className="block text-2xl font-black text-[#21301F]" style={{ fontFamily: "'Fraunces',serif" }}>{v}</span>{l}</p>))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 pt-24">
        <h2 className="text-center text-4xl font-black tracking-tight" style={{ fontFamily: "'Fraunces',serif" }}>From seed to harvest</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[["🌱", "Plant", "Drop a thought in one tap — text, voice, link or photo. No folders, no filing."], ["🪴", "Tend", "Noema links related notes for you and resurfaces the right one at the right moment."], ["🌻", "Harvest", "Turn clusters of notes into essays, talks and projects with one click."]].map(([e, t, d]) => (
            <div key={t} className="rounded-[28px] border border-[#5A7D4F]/15 bg-white/60 p-7"><span className="text-3xl" aria-hidden>{e}</span><h3 className="mt-4 text-xl font-bold" style={{ fontFamily: "'Fraunces',serif" }}>{t}</h3><p className="mt-2 leading-relaxed text-[#21301F]/60">{d}</p></div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 pt-20">
        <div className="grid items-center gap-10 rounded-[36px] bg-[#21301F] p-8 text-[#EDF2E4] sm:p-12 lg:grid-cols-2">
          <div><h2 className="text-4xl font-black leading-tight" style={{ fontFamily: "'Fraunces',serif" }}>A garden that<br />tends itself.</h2><p className="mt-4 leading-relaxed text-[#EDF2E4]/65">Gentle reminders, automatic links and daily resurfacing keep every idea alive — so returning to your notes always feels like coming home, not digging through a drawer.</p><a href="#cta" className="mt-7 inline-block rounded-full bg-[#E9B44C] px-6 py-3 font-semibold text-[#21301F]">Try it free</a></div>
          <ul className="space-y-3">{["Bi-directional links that form on their own", "Daily digest: 5 notes worth revisiting", "Voice capture, transcribed as you speak", "Private by default — your garden, your keys"].map((f) => (<li key={f} className="flex gap-3 rounded-2xl bg-white/8 px-5 py-4"><span aria-hidden>✿</span><span>{f}</span></li>))}</ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-20 text-center">
        <p className="text-2xl font-semibold leading-relaxed" style={{ fontFamily: "'Fraunces',serif" }}>“I stopped losing ideas. Noema is the first app that feels like it’s thinking alongside me, not just storing for me.”</p>
        <p className="mt-4 text-sm font-semibold text-[#21301F]/50">Mara Ellison · Writer, 3,214 notes planted</p>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 pt-20">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] bg-white p-8"><h3 className="text-xl font-bold" style={{ fontFamily: "'Fraunces',serif" }}>Seedling</h3><p className="mt-1 text-[#21301F]/55">For getting started</p><p className="mt-5"><span className="text-4xl font-black">$0</span> forever</p><ul className="mt-5 space-y-2 text-[15px] text-[#21301F]/65"><li>✓ 100 notes</li><li>✓ Daily digest</li><li>✓ 2 devices</li></ul></div>
          <div className="rounded-[28px] bg-[#5A7D4F] p-8 text-white"><h3 className="text-xl font-bold" style={{ fontFamily: "'Fraunces',serif" }}>Full Garden</h3><p className="mt-1 text-white/70">For serious thinkers</p><p className="mt-5"><span className="text-4xl font-black">$8</span> / month</p><ul className="mt-5 space-y-2 text-[15px] text-white/85"><li>✓ Unlimited notes & links</li><li>✓ AI resurfacing & search</li><li>✓ Every device, offline</li></ul></div>
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-6xl px-6 pt-20 text-center">
        <h2 className="text-4xl font-black" style={{ fontFamily: "'Fraunces',serif" }}>Your first seed is waiting.</h2>
        <a href="#cta" className="mt-6 inline-block rounded-full bg-[#E86A7A] px-8 py-4 font-semibold text-white">Plant it in Noema — free</a>
      </section>
      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-6 pt-16 text-sm text-[#21301F]/45"><span>© 2026 Noema · The Garden</span><span>Privacy · Terms · Made for thinkers</span></footer>
      <Switcher />
    </main>
  );
}
