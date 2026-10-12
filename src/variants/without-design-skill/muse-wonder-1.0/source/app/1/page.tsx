import Link from "next/link";

export default function Page1() {
  return (
    <div className="min-h-screen bg-[#FAF8F1] font-[Georgia,serif] text-[#2B3324]">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5 font-sans">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#5A7A5A] text-sm font-bold text-white">✦</span>
          <span className="text-[17px] font-semibold tracking-tight">Synapse</span>
          <span className="ml-2 hidden rounded-full bg-[#EAF0E2] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#5A7A5A] sm:inline">01 · Garden</span>
        </div>
        <nav className="hidden items-center gap-7 font-sans text-sm text-[#5A6650] md:flex">
          <a href="#how" className="hover:text-[#2B3324]">How it works</a>
          <a href="#notes" className="hover:text-[#2B3324]">Notes</a>
          <a href="#pricing" className="hover:text-[#2B3324]">Pricing</a>
        </nav>
        <Link href="/without-design-skill/muse-wonder-1.0/5" className="rounded-full bg-[#2B3324] px-5 py-2.5 font-sans text-sm font-medium text-white transition hover:bg-[#3D4A34]">Start free</Link>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 text-center lg:pt-16">
        <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#7A8A6E]">A calmer second brain</p>
        <h1 className="mx-auto mt-5 max-w-3xl text-[44px] leading-[1.05] font-normal tracking-tight sm:text-6xl lg:text-[72px]">
          Your mind,
          <br />
          <em className="text-[#5A7A5A]">at rest.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-[#5A6650]">
          Synapse holds everything you learn, so your brain can stop holding it all at once. Capture in seconds, find it forever — in a space that breathes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-sans">
          <button className="rounded-full bg-[#5A7A5A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5A7A5A]/25 transition hover:bg-[#4C6A4C]">Plant your first note — free</button>
          <button className="rounded-full border border-[#D8DEC9] bg-white px-7 py-3.5 text-sm font-medium text-[#2B3324] transition hover:border-[#B9C4A6]">Watch 2-min tour</button>
        </div>
        <p className="mt-4 font-sans text-xs text-[#8A9680]">No credit card · Free for your first 1,000 notes</p>

        {/* Hero visual — garden of notes */}
        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute -left-6 top-10 hidden rotate-[-4deg] lg:block animate-float">
            <div className="w-52 rounded-2xl bg-white p-4 text-left shadow-xl shadow-black/[0.06] ring-1 ring-black/[0.04]">
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#7A8A6E]">🌱 Idea</p>
              <p className="mt-1.5 text-[15px] leading-snug">Morning pages work because the brain dumps, then connects.</p>
              <p className="mt-2 font-sans text-[11px] text-[#9AA88E]">linked to 4 notes</p>
            </div>
          </div>
          <div className="absolute -right-4 bottom-16 hidden rotate-[3deg] lg:block animate-float-delay">
            <div className="w-48 rounded-2xl bg-[#2B3324] p-4 text-left shadow-xl">
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8BE9A]">Recall</p>
              <p className="mt-1.5 font-sans text-[14px] leading-snug text-white">“What did I read about spaced repetition?”</p>
              <p className="mt-2 font-sans text-[11px] text-[#A8BE9A]">Found in 0.3s · 12 notes</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] bg-[#EDF2E6] p-6 ring-1 ring-[#DCE5D2] sm:p-8">
            <div className="rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-black/[0.04] sm:p-7">
              <div className="flex items-center justify-between font-sans">
                <span className="flex items-center gap-2 text-sm font-medium"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Today · Apr 18</span>
                <span className="text-xs text-[#9AA88E]">All changes saved</span>
              </div>
              <h3 className="mt-5 text-[22px] leading-snug">Notes are not files. They are <span className="bg-[#EAF0E2] px-1.5 py-0.5 rounded-md">plants</span>.</h3>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-[#5A6650]">
                Capture a thought. Synapse links it to everything related — people, books, projects — and resurfaces it exactly when you need it. No folders. No filing. Just growth.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 font-sans">
                {["#learning", "#second-brain", "🪴 24 connections"].map((t) => (
                  <span key={t} className="rounded-full bg-[#F3F5EC] px-3 py-1.5 text-xs font-medium text-[#5A7A5A] ring-1 ring-[#E2E8D8]">{t}</span>
                ))}
              </div>
              {/* gentle graph */}
              <svg viewBox="0 0 640 90" className="mt-6 w-full">
                <path d="M40 70 C160 20, 260 80, 380 35 S560 55, 610 30" fill="none" stroke="#C4D3B2" strokeWidth="2" strokeLinecap="round" />
                <circle cx="40" cy="70" r="7" fill="#5A7A5A" /><circle cx="210" cy="52" r="5" fill="#A8BE9A" />
                <circle cx="380" cy="35" r="7" fill="#5A7A5A" /><circle cx="505" cy="48" r="5" fill="#A8BE9A" /><circle cx="610" cy="30" r="6" fill="#2B3324" />
              </svg>
              <p className="text-center font-sans text-[11px] text-[#9AA88E]">How this note connects to your garden →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-[#E8EDE0] bg-white/60 py-7">
        <p className="text-center font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9AA88E]">Trusted by thoughtful teams at</p>
        <div className="mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 font-sans text-[15px] font-semibold text-[#8A9680]">
          <span>Linear</span><span>Notion</span><span>Arc</span><span>Raycast</span><span className="hidden sm:inline">Readwise</span>
        </div>
      </section>

      {/* How */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-xl">
          <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7A8A6E]">How Synapse works</p>
          <h2 className="mt-3 text-4xl leading-tight">Three gentle habits.<br />One calmer mind.</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { n: "01", icon: "🌿", title: "Capture without friction", body: "Voice, web clip, photo, quick note — anything lands in one inbox. No deciding where it goes. Synapse files it by meaning, not folder." },
            { n: "02", icon: "🔗", title: "Connect automatically", body: "Every note links to related people, topics, and projects. Your garden grows connections while you sleep — you just notice them." },
            { n: "03", icon: "🌤️", title: "Recall in a breath", body: "Ask in plain words. Synapse answers from your own notes with sources cited — like asking a version of you who read everything." },
          ].map((f) => (
            <article key={f.n} className="rounded-3xl bg-white p-7 ring-1 ring-[#E8EDE0] transition hover:shadow-lg hover:shadow-black/[0.04]">
              <div className="flex items-center justify-between"><span className="text-2xl">{f.icon}</span><span className="font-sans text-xs font-bold text-[#C4D3B2]">{f.n}</span></div>
              <h3 className="mt-5 text-xl">{f.title}</h3>
              <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#5A6650]">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Note wall */}
      <section id="notes" className="bg-[#2B3324] py-20 text-[#EEF2E6]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#A8BE9A]">From real gardens</p>
              <h2 className="mt-3 max-w-md text-4xl leading-tight">People don&apos;t organize anymore. They just remember more.</h2>
            </div>
            <p className="max-w-sm font-sans text-[15px] leading-relaxed text-[#C2CEB2]">“I stopped maintaining my note system. Synapse maintains it — I just think.” — every review, basically.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { q: "I found a quote from 2022 in two seconds. It felt like time travel.", a: "Maya R. — PhD researcher", m: "12,400 notes" },
              { q: "My meeting notes write their own follow-ups now. I just approve them.", a: "Daniel K. — Product lead", m: "3,180 notes" },
              { q: "The first app that made my scattered thoughts feel like one mind.", a: "Sofia L. — Author", m: "8,930 notes" },
            ].map((t) => (
              <figure key={t.a} className="rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur">
                <blockquote className="text-[17px] leading-relaxed">“{t.q}”</blockquote>
                <figcaption className="mt-5 font-sans text-sm"><span className="font-semibold text-white">{t.a}</span><span className="block text-[#A8BE9A]">{t.m} · ★★★★★</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing + CTA */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 pb-36">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] bg-white p-8 ring-1 ring-[#E8EDE0] sm:p-10">
            <h2 className="text-3xl leading-tight">Begin free.<br />Grow when you&apos;re ready.</h2>
            <div className="mt-8 grid gap-4 font-sans sm:grid-cols-2">
              <div className="rounded-2xl bg-[#F7F8F2] p-5 ring-1 ring-[#E8EDE0]">
                <p className="text-sm font-semibold">Seedling</p><p className="mt-1 text-3xl font-bold">$0</p>
                <ul className="mt-3 space-y-1.5 text-sm text-[#5A6650]"><li>✓ 1,000 notes</li><li>✓ Auto-linking</li><li>✓ 2 devices</li></ul>
              </div>
              <div className="rounded-2xl bg-[#2B3324] p-5 text-white">
                <p className="flex items-center justify-between text-sm font-semibold">Garden <span className="rounded-full bg-[#A8BE9A] px-2 py-0.5 text-[10px] font-bold text-[#2B3324]">POPULAR</span></p>
                <p className="mt-1 text-3xl font-bold">$8<span className="text-sm font-normal text-[#A8BE9A]">/mo</span></p>
                <ul className="mt-3 space-y-1.5 text-sm text-[#D6E0C8]"><li>✓ Unlimited notes</li><li>✓ Ask-your-brain AI</li><li>✓ Everywhere sync</li></ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-[28px] bg-[#EAF0E2] p-8 sm:p-10">
            <div>
              <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#5A7A5A]">Your first minute</p>
              <ol className="mt-5 space-y-4 font-sans text-[15px] leading-relaxed">
                <li><b>1.</b> Paste anything — a link, a voice memo, a half-thought.</li>
                <li><b>2.</b> Watch Synapse link it to what you already know.</li>
                <li><b>3.</b> Ask it a question. Feel the click.</li>
              </ol>
            </div>
            <button className="mt-8 w-full rounded-full bg-[#2B3324] py-4 font-sans text-sm font-semibold text-white transition hover:bg-[#3D4A34]">Start growing — it&apos;s free →</button>
          </div>
        </div>
        <p className="mt-10 text-center font-sans text-xs text-[#9AA88E]">01 · Garden — the calm direction. Try the pill below for bolder takes →</p>
      </section>
    </div>
  );
}
