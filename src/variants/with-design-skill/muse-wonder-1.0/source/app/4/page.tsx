import Switcher from "../components/Switcher";

export default function Page4() {
  const serif = { fontFamily: "'Cormorant Garamond',serif" } as const;
  return (
    <main className="min-h-screen bg-[#1E1526] pb-36 text-[#F3EAD8]" style={{ fontFamily: "'Inter',sans-serif" }}>
      <header className="border-b border-[#C9A86A]/20">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <a href="/with-design-skill/muse-wonder-1.0/4" className="text-2xl font-semibold tracking-wide" style={serif}>Noema <span className="text-[#C9A86A]">·</span> <span className="text-base italic text-[#F3EAD8]/60">the midnight library</span></a>
          <nav className="hidden gap-8 text-sm text-[#F3EAD8]/60 md:flex"><a className="hover:text-[#C9A86A]" href="#shelves">The shelves</a><a className="hover:text-[#C9A86A]" href="#ritual">The ritual</a><a className="hover:text-[#C9A86A]" href="#membership">Membership</a></nav>
          <a href="#cta" className="rounded-full border border-[#C9A86A]/50 px-5 py-2 text-sm font-medium text-[#C9A86A] transition hover:bg-[#C9A86A] hover:text-[#1E1526]">Request an invitation</a>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 pt-20 text-center">
        <p className="text-sm italic text-[#C9A86A]" style={serif}>est. for the hours when thinking happens</p>
        <h1 className="mt-5 text-6xl font-semibold leading-[1.02] sm:text-7xl" style={serif}>Every book you’ve<br />ever meant<br />to <span className="italic text-[#C9A86A]">remember.</span></h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[#F3EAD8]/60">Noema is a private library for your own writing — every note shelved, cross-referenced and quietly waiting for the night you need it again.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3"><a href="#cta" className="rounded-full bg-[#C9A86A] px-7 py-3.5 font-semibold text-[#1E1526] transition hover:bg-[#F3EAD8]">Enter the library</a><a href="#ritual" className="rounded-full border border-[#F3EAD8]/25 px-7 py-3.5 font-medium transition hover:border-[#C9A86A] hover:text-[#C9A86A]">How evenings work</a></div>
        <div className="mx-auto mt-14 h-px max-w-md bg-gradient-to-r from-transparent via-[#C9A86A]/50 to-transparent" aria-hidden />
      </section>

      <section id="shelves" className="mx-auto max-w-5xl px-6 pt-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { shelf: "Shelf I — Reading", title: "“The notebook is part of the mind.”", meta: "Margin notes · 14 cross-references · revisited 6 evenings" },
            { shelf: "Shelf II — Work", title: "Draft: on attention & craft", meta: "In progress · linked to 9 entries · last opened Tuesday" },
            { shelf: "Shelf III — Private", title: "Letters I never sent", meta: "Sealed · only you hold the key · 32 entries" },
          ].map((b) => (
            <article key={b.title} className="rounded-2xl border border-[#C9A86A]/20 bg-[#F3EAD8]/[0.04] p-6 transition hover:border-[#C9A86A]/50">
              <p className="text-xs font-semibold tracking-wide text-[#C9A86A]">{b.shelf}</p>
              <h3 className="mt-4 text-[22px] font-semibold leading-snug" style={serif}>{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#F3EAD8]/50">{b.meta}</p>
              <div className="mt-6 h-1 rounded-full bg-[#C9A86A]/20"><div className="h-1 w-2/3 rounded-full bg-[#C9A86A]" /></div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-4 text-center">{[["19,400", "volumes shelved nightly"], ["11 yrs", "oldest note still in use"], ["0", "ads, ever"]].map(([v, l]) => (<p key={l} className="text-sm text-[#F3EAD8]/45"><span className="block text-3xl font-semibold text-[#F3EAD8]" style={serif}>{v}</span>{l}</p>))}</div>
      </section>

      <section id="ritual" className="mx-auto max-w-5xl px-6 pt-24">
        <h2 className="text-center text-4xl font-semibold" style={serif}>The evening ritual</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[["Shelve", "Write without organising. Noema catalogues each entry — author, subject, kin — while you simply think on paper."], ["Cross-reference", "In the margins, quiet suggestions: this page speaks to one you wrote three winters ago. Follow it, or don’t."], ["Revisit", "Each evening, five pages are left open on your desk, chosen for the hour. Reading them takes four minutes."]].map((t) => (
            <div key={t[0]} className="rounded-2xl bg-[#7A2E3F]/25 p-7"><h3 className="text-2xl font-semibold italic text-[#C9A86A]" style={serif}>{t[0]}</h3><p className="mt-3 leading-relaxed text-[#F3EAD8]/60">{t[1]}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 pt-20 text-center">
        <p className="text-[26px] font-medium italic leading-relaxed" style={serif}>“It is the first software that has ever felt like a room. I go there at night the way I used to go to a real library — to be among my own thoughts, in good order.”</p>
        <p className="mt-5 text-sm text-[#F3EAD8]/45">Eleanor Vance · Essayist, member since 2023 · 7,812 pages shelved</p>
      </section>

      <section id="membership" className="mx-auto max-w-5xl px-6 pt-20">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#F3EAD8]/15 p-8"><h3 className="text-2xl font-semibold" style={serif}>Reading Room</h3><p className="mt-1 text-[#F3EAD8]/50">For new members</p><p className="mt-5"><span className="text-4xl font-semibold" style={serif}>Free</span></p><ul className="mt-5 space-y-2 text-[#F3EAD8]/60"><li>— 1,000 pages</li><li>— Evening selection of five</li><li>— Two reading devices</li></ul></div>
          <div className="rounded-2xl bg-[#F3EAD8] p-8 text-[#1E1526]"><h3 className="text-2xl font-semibold" style={serif}>Full Membership</h3><p className="mt-1 text-[#1E1526]/55">The entire collection</p><p className="mt-5"><span className="text-4xl font-semibold" style={serif}>$11</span> / month</p><ul className="mt-5 space-y-2 text-[#1E1526]/65"><li>— Unlimited pages & cross-references</li><li>— Sealed shelves, encrypted</li><li>— Print your year in hardcover</li></ul></div>
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-3xl px-6 pt-20 text-center"><h2 className="text-4xl font-semibold" style={serif}>The lamps are lit.</h2><p className="mt-3 text-[#F3EAD8]/55">Your first shelf is prepared. It takes a minute to take your seat.</p><a href="#cta" className="mt-7 inline-block rounded-full bg-[#C9A86A] px-8 py-4 font-semibold text-[#1E1526]">Enter the library — free</a></section>
      <footer className="mx-auto flex max-w-5xl flex-wrap justify-between gap-3 px-6 pt-16 text-sm text-[#F3EAD8]/35"><span>© 2026 Noema · The Midnight Library</span><span>Privacy · Terms · Colophon</span></footer>
      <Switcher />
    </main>
  );
}
