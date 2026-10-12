import Link from "next/link";

export default function Page4() {
  return (
    <div className="min-h-screen bg-[#FDFBF5] font-[Georgia,'Times_New_Roman',serif] text-[#1A1712]">
      {/* Masthead */}
      <header className="border-b-4 border-double border-[#1A1712]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-[#1A1712]/20 py-2 text-[11px] uppercase tracking-[0.18em] text-[#6B5E4A]">
            <span>Vol. I — No. 04</span><span className="hidden sm:inline">The Second Brain Gazette</span><span>Est. 2026</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-4 py-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9A8B73]">Synapse presents</p>
              <h2 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">The Daily Mind</h2>
            </div>
            <div className="text-right">
              <p className="text-sm italic text-[#6B5E4A]">“All the thoughts, fit to recall.”</p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-[#9A8B73]">04 · Press — Editorial Edition</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-2 border-t border-[#1A1712] py-3 text-[13px] font-bold uppercase tracking-wider">
            <a href="#lead" className="hover:underline">Lead Story</a><a href="#sections" className="hover:underline">Sections</a><a href="#voices" className="hover:underline">Voices</a><a href="#subscribe" className="hover:underline">Subscribe</a>
            <span className="ml-auto hidden font-normal normal-case tracking-normal text-[#6B5E4A] sm:inline">Price: Free to begin</span>
          </nav>
        </div>
      </header>

      {/* Lead story */}
      <main id="lead" className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <article>
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#9A3B2E]">Lead Story · Knowledge</p>
            <h1 className="mt-3 text-[42px] font-bold leading-[1.02] tracking-tight sm:text-6xl">
              The Mind, Properly Filed at Last
            </h1>
            <p className="mt-4 border-l-[3px] border-[#1A1712] pl-4 text-lg italic leading-relaxed text-[#4A4033]">
              For decades we stored notes the way we store newspapers in an attic — hopefully, and never to be seen again. A new kind of notebook proposes we stop filing, and start remembering.
            </p>
            <div className="mt-5 flex gap-3 font-sans">
              <Link href="/without-design-skill/muse-wonder-1.0/5" className="bg-[#1A1712] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3A332A]">Begin reading — free</Link>
              <button className="border border-[#1A1712] px-6 py-3 text-sm font-semibold transition hover:bg-[#1A1712] hover:text-white">Browse the archive</button>
            </div>

            <div className="mt-8 grid gap-6 text-[15.5px] leading-[1.75] text-[#332D24] sm:grid-cols-2">
              <p><span className="float-left mr-2 mt-1 text-[44px] font-bold leading-[0.8]">S</span>ynapse begins from a simple editorial principle: a note unpublished to your future self might as well not exist. So it publishes everything — to you, at the moment of need. Capture takes two seconds. The system reads, links, and indexes by meaning.</p>
              <p>The result reads less like a folder and more like a well-kept newspaper morgue: every clipping cross-referenced, every fact checkable, every half-remembered idea retrievable by asking the question aloud. No folders were harmed. None were needed.</p>
            </div>

            {/* Index box */}
            <div className="mt-8 border-2 border-[#1A1712] bg-white p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em]">In this edition — your brain, indexed</p>
              <div className="mt-4 grid gap-x-8 gap-y-2.5 font-sans text-sm sm:grid-cols-2">
                {[["Capture", "Page 01 — two-second intake"], ["Connections", "Page 02 — notes that cite each other"], ["Recall", "Page 03 — ask, and be answered"], ["Review", "Page 04 — a Sunday edition of you"]].map(([t, d]) => (
                  <p key={t} className="flex justify-between gap-3 border-b border-dotted border-[#9A8B73] pb-2"><span className="font-bold">{t}</span><span className="text-right text-[#6B5E4A]">{d}</span></p>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-[#1A1712]/25 bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A8B73]">By the numbers</p>
              <dl className="mt-4 divide-y divide-[#1A1712]/10">
                {[["0.3 sec", "to recall any note, ever"], ["2 sec", "to capture a thought"], ["0", "folders to maintain"], ["24 / 7", "your archive, awake"]].map(([v, l]) => (
                  <div key={l} className="flex items-baseline justify-between py-3"><dt className="font-sans text-sm text-[#6B5E4A]">{l}</dt><dd className="text-xl font-bold">{v}</dd></div>
                ))}
              </dl>
            </div>
            <figure className="border border-[#1A1712]/25 bg-[#1A1712] p-6 text-[#FDFBF5]">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9B99A]">Pull quote</p>
              <blockquote className="mt-3 text-[22px] font-bold leading-snug">“It is the first notebook that reads back.”</blockquote>
              <figcaption className="mt-3 font-sans text-xs uppercase tracking-widest text-[#C9B99A]">— The Review of Minds, on Synapse</figcaption>
            </figure>
            <div className="border border-[#1A1712]/25 p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A8B73]">Late edition</p>
              <ul className="mt-3 space-y-3 font-sans text-sm leading-relaxed">
                <li><b>New:</b> Ask-your-brain now cites its sources, line by line.</li>
                <li><b>New:</b> Sunday Review — your week, typeset automatically.</li>
                <li><b>Always:</b> Your words stay yours. Export anytime.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Sections */}
      <section id="sections" className="border-y border-[#1A1712]/20 bg-white py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-4"><h2 className="text-2xl font-bold uppercase tracking-wide">Sections</h2><span className="h-px flex-1 bg-[#1A1712]" /><span className="text-[11px] uppercase tracking-widest text-[#9A8B73]">Everything, cross-referenced</span></div>
          <div className="mt-8 grid gap-px overflow-hidden border border-[#1A1712]/25 bg-[#1A1712]/25 md:grid-cols-3">
            {[
              { s: "§ A — Capture", t: "File under: everything", b: "Voice, clipping, scan, or scribble. Two seconds, no decisions. If it mattered enough to save, it is saved properly." },
              { s: "§ B — Connect", t: "Notes that cite each other", b: "Synapse links by meaning across years and projects. An old book note footnotes today's meeting — automatically." },
              { s: "§ C — Recall", t: "Ask the archive anything", b: "Put a question to your own record. Answers arrive with citations to the exact notes you wrote, when you wrote them." },
            ].map((f) => (
              <article key={f.s} className="bg-[#FDFBF5] p-7">
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A3B2E]">{f.s}</p>
                <h3 className="mt-3 text-xl font-bold leading-tight">{f.t}</h3>
                <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-[#4A4033]">{f.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Voices + Subscribe */}
      <section id="voices" className="mx-auto max-w-6xl px-6 py-16 pb-36">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="text-3xl font-bold">Letters to the Editor</h2>
            <div className="mt-7 space-y-6">
              {[
                { q: "Sir — I have kept commonplace books for thirty years. Synapse is the first that keeps them back. My marginalia finally answer when called.", a: "Prof. H. Okafor, Historian" },
                { q: "Madam — Our newsroom runs on it. Every interview since 2023, retrievable mid-sentence. It has changed what a deadline feels like.", a: "R. Alvarez, Editor-at-large" },
              ].map((l) => (
                <blockquote key={l.a} className="border-l-[3px] border-[#9A8B73] pl-5">
                  <p className="text-[17px] italic leading-relaxed">“{l.q}”</p>
                  <cite className="mt-2 block font-sans text-xs font-bold uppercase tracking-widest not-italic text-[#6B5E4A]">{l.a}</cite>
                </blockquote>
              ))}
            </div>
          </div>
          <div id="subscribe" className="h-fit border-2 border-[#1A1712] bg-white p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em]">Subscribe</p>
            <h3 className="mt-2 text-2xl font-bold leading-tight">Take The Daily Mind home.</h3>
            <div className="mt-5 space-y-3 font-sans text-sm">
              <p className="flex justify-between border-b border-dotted border-[#9A8B73] pb-2"><span>Home delivery (Free)</span><b>$0</b></p>
              <p className="flex justify-between border-b border-dotted border-[#9A8B73] pb-2"><span>Full archive (Pro)</span><b>$8 / mo</b></p>
              <p className="text-[#6B5E4A]">Unlimited notes · cited AI recall · every device. Cancel anytime; your archive remains yours.</p>
            </div>
            <button className="mt-6 w-full bg-[#1A1712] py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-[#3A332A]">Subscribe — begin free</button>
            <p className="mt-3 text-center font-sans text-[11px] text-[#9A8B73]">04 · Press — the editorial direction. Pill below for more →</p>
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-double border-[#1A1712] py-5 text-center font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B5E4A]">The Daily Mind · Set in serif · Printed by Synapse</footer>
    </div>
  );
}
