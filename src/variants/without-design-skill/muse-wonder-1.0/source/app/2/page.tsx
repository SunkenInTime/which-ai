import Link from "next/link";

export default function Page2() {
  return (
    <div className="min-h-screen bg-[#FFE500] font-mono text-black">
      {/* Nav */}
      <header className="border-b-[3px] border-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center border-[3px] border-black bg-black text-lg font-black text-[#FFE500] shadow-[4px_4px_0_rgba(0,0,0,0.9)]">S!</span>
            <span className="text-xl font-black uppercase tracking-tight">Synapse</span>
            <span className="hidden -rotate-3 border-2 border-black bg-[#FF6B6B] px-2 py-0.5 text-[11px] font-black uppercase sm:inline">02 · Brutal</span>
          </div>
          <nav className="hidden gap-6 text-[13px] font-bold uppercase md:flex">
            <a href="#pain" className="underline-offset-4 hover:underline">The problem</a>
            <a href="#fix" className="underline-offset-4 hover:underline">The fix</a>
            <a href="#price" className="underline-offset-4 hover:underline">Price</a>
          </nav>
          <Link href="/without-design-skill/muse-wonder-1.0/3" className="border-[3px] border-black bg-white px-4 py-2 text-[13px] font-black uppercase shadow-[4px_4px_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]">Start free →</Link>
        </div>
      </header>

      {/* Marquee */}
      <div className="overflow-hidden border-b-[3px] border-black bg-black py-2 text-[#FFE500]">
        <div className="animate-marquee flex w-max gap-0 whitespace-nowrap text-[13px] font-black uppercase tracking-widest">
          <span className="pr-2">Forget nothing ✕ Capture everything ✕ No folders ✕ No filing ✕ Just recall ✕&nbsp;</span>
          <span className="pr-2">Forget nothing ✕ Capture everything ✕ No folders ✕ No filing ✕ Just recall ✕&nbsp;</span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 lg:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-block border-[3px] border-black bg-white px-3 py-1.5 text-[12px] font-black uppercase shadow-[4px_4px_0_#000]">Note app? No. Second brain.</p>
            <h1 className="mt-6 text-[52px] font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-[92px]">
              Forget
              <br />
              <span className="bg-black px-3 text-[#FFE500]">Nothing.</span>
              <br />Ever.
            </h1>
            <p className="mt-6 max-w-lg font-sans text-lg font-medium leading-relaxed">
              Your brain is for having ideas — not storing them. Dump everything into Synapse. It links, tags, and resurfaces it the second you need it. Zero organizing required.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="border-[3px] border-black bg-black px-7 py-4 text-sm font-black uppercase text-[#FFE500] shadow-[6px_6px_0_rgba(0,0,0,0.35)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_rgba(0,0,0,0.35)]">Dump your brain — free</button>
              <button className="border-[3px] border-black bg-white px-7 py-4 text-sm font-black uppercase shadow-[6px_6px_0_#000] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#000]">See it work ↓</button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-bold uppercase">
              <span>★ 4.9/5 · 31k reviews</span><span>✓ No card needed</span><span>✓ 2-min setup</span>
            </div>
          </div>

          {/* Sticker stack */}
          <div className="relative mx-auto w-full max-w-md lg:mt-4">
            <div className="rotate-2 border-[3px] border-black bg-white p-5 shadow-[8px_8px_0_#000]">
              <p className="text-[11px] font-black uppercase text-zinc-500">Inbox · Just now</p>
              <p className="mt-2 font-sans text-[17px] font-bold leading-snug">“idea: app that reminds you what you already know”</p>
              <div className="mt-3 flex gap-2"><span className="border-2 border-black bg-[#FFE500] px-2 py-0.5 text-[11px] font-black">AUTO-LINKED ×6</span><span className="border-2 border-black px-2 py-0.5 text-[11px] font-black">NO FOLDER NEEDED</span></div>
            </div>
            <div className="-mt-3 ml-8 -rotate-2 border-[3px] border-black bg-black p-5 text-white shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
              <p className="text-[11px] font-black uppercase text-[#FFE500]">You asked →</p>
              <p className="mt-1.5 font-sans text-[16px] font-bold leading-snug">“What did I note about onboarding last March?”</p>
              <p className="mt-2 font-sans text-sm text-zinc-300">Found: 9 notes · 2 meetings · 1 decision. Answered in 0.4s.</p>
            </div>
            <div className="absolute -right-3 -top-5 rotate-12 border-[3px] border-black bg-[#FF6B6B] px-3 py-1.5 text-[12px] font-black uppercase shadow-[4px_4px_0_#000]">0 folders!</div>
            <div className="absolute -left-4 bottom-8 -rotate-6 border-[3px] border-black bg-white px-3 py-1.5 text-[12px] font-black uppercase shadow-[4px_4px_0_#000]">0 filing!</div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-14 grid grid-cols-2 border-[3px] border-black bg-white shadow-[8px_8px_0_#000] lg:grid-cols-4">
          {[["2.4B", "notes captured"], ["0.3s", "avg. recall"], ["0", "folders needed"], ["98%", "say “finally”"]].map(([v, l], i) => (
            <div key={l} className={`p-5 sm:p-6 ${i !== 0 ? "border-l-[3px] border-black max-lg:[&:nth-child(3)]:border-l-0 max-lg:[&:nth-child(n+3)]:border-t-[3px]" : ""} ${i === 1 ? "max-lg:border-l-[3px]" : ""}`}>
              <p className="text-3xl font-black sm:text-4xl">{v}</p><p className="mt-1 text-[11px] font-black uppercase tracking-wider text-zinc-600">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain / Fix */}
      <section id="pain" className="border-y-[3px] border-black bg-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="border-black p-8 sm:p-12 lg:border-r-[3px]">
            <p className="text-[12px] font-black uppercase text-[#E63946]">✕ The old way is broken</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none">Your notes app is a graveyard.</h2>
            <ul className="mt-7 space-y-4 font-sans text-[15px] font-medium leading-relaxed">
              <li className="flex gap-3"><span className="font-black">✕</span> 400 notes you&apos;ll never find again</li>
              <li className="flex gap-3"><span className="font-black">✕</span> Folder systems you maintain instead of using</li>
              <li className="flex gap-3"><span className="font-black">✕</span> “Where did I write that?” — daily</li>
              <li className="flex gap-3"><span className="font-black">✕</span> Great ideas, buried alive</li>
            </ul>
          </div>
          <div id="fix" className="bg-black p-8 text-white sm:p-12">
            <p className="text-[12px] font-black uppercase text-[#FFE500]">✓ The Synapse way</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none">Dump it. Find it. Done.</h2>
            <ul className="mt-7 space-y-4 font-sans text-[15px] font-medium leading-relaxed text-zinc-200">
              <li className="flex gap-3"><span className="font-black text-[#FFE500]">→</span> Capture in 2 seconds, from anywhere</li>
              <li className="flex gap-3"><span className="font-black text-[#FFE500]">→</span> AI links it to everything related — automatically</li>
              <li className="flex gap-3"><span className="font-black text-[#FFE500]">→</span> Ask questions, get answers from YOUR notes</li>
              <li className="flex gap-3"><span className="font-black text-[#FFE500]">→</span> Resurfaces before you even search</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <h2 className="text-4xl font-black uppercase">Built loud. Works quiet.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { t: "Capture anything", d: "Text, voice, links, PDFs, photos of whiteboards. If you saw it, Synapse keeps it.", bg: "bg-white" },
            { t: "Links itself", d: "No tags. No folders. Synapse reads meaning and builds the web for you.", bg: "bg-[#FF6B6B]" },
            { t: "Answers back", d: "“Summarize what I know about X.” Cited from your own brain. No hallucinated fluff.", bg: "bg-black text-white" },
          ].map((f) => (
            <article key={f.t} className={`border-[3px] border-black p-6 shadow-[6px_6px_0_#000] ${f.bg}`}>
              <h3 className="text-xl font-black uppercase">{f.t}</h3>
              <p className="mt-2 font-sans text-[15px] font-medium leading-relaxed opacity-80">{f.d}</p>
            </article>
          ))}
        </div>

        {/* Pricing */}
        <div id="price" className="mt-12 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="border-[3px] border-black bg-white p-7 shadow-[8px_8px_0_#000] sm:p-8">
            <p className="text-[12px] font-black uppercase">Pricing — no games</p>
            <div className="mt-4 flex flex-wrap gap-8">
              <p className="font-sans"><span className="text-4xl font-black">$0</span> <span className="font-bold">Free</span><br /><span className="text-sm text-zinc-600">1,000 notes · forever free</span></p>
              <p className="font-sans"><span className="text-4xl font-black">$8/mo</span> <span className="rounded-sm bg-black px-1.5 py-0.5 font-mono text-[11px] font-black text-[#FFE500]">PRO</span><br /><span className="text-sm text-zinc-600">Unlimited · AI recall · everywhere</span></p>
            </div>
          </div>
          <button className="border-[3px] border-black bg-black px-10 py-6 text-base font-black uppercase text-[#FFE500] shadow-[8px_8px_0_rgba(0,0,0,0.35)] transition hover:translate-x-[2px] hover:translate-y-[2px]">Stop forgetting →</button>
        </div>
        <p className="mt-12 pb-24 text-center text-[12px] font-black uppercase tracking-widest opacity-60">02 · Brutal — the loud direction. Pill below for the others ↓</p>
      </section>
    </div>
  );
}
