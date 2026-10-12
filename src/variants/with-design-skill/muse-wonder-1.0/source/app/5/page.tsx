import Switcher from "../components/Switcher";

export default function Page5() {
  const sora = { fontFamily: "'Sora',sans-serif" } as const;
  const shadow = "shadow-[6px_6px_0_#171717]";
  return (
    <main className="min-h-screen bg-[#FFD93D] pb-36 text-[#171717]" style={sora}>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/with-design-skill/muse-wonder-1.0/5" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight"><span className="grid size-9 rotate-[-6deg] place-items-center rounded-xl border-2 border-[#171717] bg-[#FF6B9D] text-base shadow-[3px_3px_0_#171717]">🧠</span>Noema!</a>
        <nav className="hidden gap-6 text-[15px] font-bold md:flex"><a className="hover:underline" href="#fun">The fun stuff</a><a className="hover:underline" href="#proof">Proof</a><a className="hover:underline" href="#pricing">Pricing</a></nav>
        <a href="#cta" className={`rounded-full border-2 border-[#171717] bg-[#171717] px-5 py-2.5 text-sm font-bold text-white ${shadow}`}>Let’s gooo</a>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-10">
        <div className="relative text-center">
          <span className="absolute left-2 top-6 hidden rotate-[-10deg] rounded-full border-2 border-[#171717] bg-white px-3 py-1 text-xs font-extrabold lg:inline-block">no folders!!</span>
          <span className="absolute right-2 top-16 hidden rotate-[8deg] rounded-full border-2 border-[#171717] bg-[#2EC4B6] px-3 py-1 text-xs font-extrabold text-white lg:inline-block">it links itself ✨</span>
          <span className="inline-block rotate-[-2deg] rounded-full border-2 border-[#171717] bg-white px-4 py-1.5 text-sm font-extrabold">Your second brain, but make it fun 🎈</span>
          <h1 className="mx-auto mt-6 max-w-3xl text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">Your brain,<br />but it <span className="bg-[#FF6B9D] px-2 text-white">remembers</span><br />everything.</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-[#171717]/65">Dump every wild idea into Noema. It connects the dots, finds the thing you swore you saved, and high-fives you with it later. Zero filing. All vibes, actually organised.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#cta" className={`rounded-full border-2 border-[#171717] bg-[#171717] px-7 py-3.5 font-bold text-white ${shadow} transition hover:-translate-y-0.5`}>Start free — 30 seconds</a><a href="#fun" className={`rounded-full border-2 border-[#171717] bg-white px-7 py-3.5 font-bold ${shadow}`}>Show me the fun ↓</a></div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            { c: "#FF6B9D", r: "rotate-[-2deg]", e: "💡", t: "“Startup idea??”", d: "Captured at 2am. Linked itself to your April notes by morning." },
            { c: "#2EC4B6", r: "rotate-[1.5deg] sm:translate-y-4", e: "🔗", t: "47 links, zero effort", d: "You wrote. Noema connected. That’s the whole workflow." },
            { c: "#7B61FF", r: "rotate-[-1deg]", e: "🎉", t: "Found it in 0.8s", d: "“That quote about attention…” — yep, here it is. You’re welcome." },
          ].map((n) => (
            <article key={n.t} className={`rounded-3xl border-2 border-[#171717] bg-white p-6 ${shadow} ${n.r}`}><span className="inline-block rounded-full px-3 py-1 text-sm" style={{ background: n.c }} aria-hidden>{n.e}</span><h3 className="mt-4 text-lg font-extrabold">{n.t}</h3><p className="mt-1.5 font-medium leading-relaxed text-[#171717]/60">{n.d}</p></article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">{[["120k", "happy brains"], ["4.9 ★", "and counting"], ["0", "folders needed"]].map(([v, l]) => (<p key={l} className={`rounded-full border-2 border-[#171717] bg-white px-5 py-2.5 font-extrabold ${shadow}`}><span className="mr-1.5">{v}</span><span className="font-semibold text-[#171717]/55">{l}</span></p>))}</div>
      </section>

      <section id="fun" className="mx-auto max-w-6xl px-6 pt-24">
        <h2 className="text-center text-4xl font-extrabold tracking-tight">The fun stuff</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[["⚡", "#FF6B9D", "Capture in a blink", "Hotkey, voice, share-sheet, scribble. If it’s in your head, it’s in Noema before the thought cools down."], ["🕸️", "#2EC4B6", "Links that link themselves", "Your notes find their friends automatically. Watch a beautiful web of your own genius grow."], ["🔮", "#7B61FF", "It finds future-you’s answer", "Ask in plain words. Noema digs through everything you’ve ever saved and just… hands it over."]].map(([e, c, t, d]) => (
            <div key={t} className={`rounded-3xl border-2 border-[#171717] bg-white p-7 ${shadow}`}><span className="inline-block rounded-2xl border-2 border-[#171717] px-3 py-2 text-xl" style={{ background: c }} aria-hidden>{e}</span><h3 className="mt-4 text-xl font-extrabold">{t}</h3><p className="mt-2 font-medium leading-relaxed text-[#171717]/60">{d}</p></div>
          ))}
        </div>
      </section>

      <section id="proof" className="mx-auto max-w-3xl px-6 pt-20 text-center">
        <p className="text-3xl font-extrabold leading-snug">“I have the memory of a goldfish and the note count of a librarian. Noema is the only reason those two facts get along.”</p>
        <p className="mt-4 font-bold text-[#171717]/50">— Samira K. · Product designer, 9,431 notes & zero regrets</p>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 pt-20">
        <div className="grid gap-4 md:grid-cols-2">
          <div className={`rounded-3xl border-2 border-[#171717] bg-white p-8 ${shadow}`}><h3 className="text-xl font-extrabold">Free brain</h3><p className="mt-1 font-semibold text-[#171717]/50">Dip a toe in</p><p className="mt-5"><span className="text-5xl font-extrabold">$0</span></p><ul className="mt-5 space-y-2 font-medium text-[#171717]/60"><li>• 500 notes</li><li>• Auto-links</li><li>• 2 devices</li></ul></div>
          <div className={`rounded-3xl border-2 border-[#171717] bg-[#171717] p-8 text-white ${shadow}`}><h3 className="text-xl font-extrabold">Big brain 🎓</h3><p className="mt-1 font-semibold text-white/55">The whole shebang</p><p className="mt-5"><span className="text-5xl font-extrabold">$8</span> /mo</p><ul className="mt-5 space-y-2 font-medium text-white/75"><li>• Unlimited notes & links</li><li>• Ask-anything search</li><li>• Every device, offline too</li></ul></div>
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-6xl px-6 pt-20 text-center"><h2 className="text-4xl font-extrabold">Future you says thanks. 🙏</h2><a href="#cta" className={`mt-6 inline-block rounded-full border-2 border-[#171717] bg-[#FF6B9D] px-8 py-4 font-extrabold text-white ${shadow}`}>Give me the second brain</a></section>
      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-6 pt-16 text-sm font-semibold text-[#171717]/45"><span>© 2026 Noema · The Pop Studio</span><span>Privacy · Terms · Be nice</span></footer>
      <Switcher />
    </main>
  );
}
