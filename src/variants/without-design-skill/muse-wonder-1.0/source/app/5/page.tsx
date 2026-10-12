import Link from "next/link";

export default function Page5() {
  return (
    <div className="min-h-screen bg-[#060613] text-zinc-100">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-glow absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-[#7C5CFF]/25 blur-[110px]" />
        <div className="animate-glow absolute right-1/5 top-1/3 h-80 w-80 rounded-full bg-cyan-400/15 blur-[100px]" style={{ animationDelay: "1.5s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_45%,#060613_90%)]" />
      </div>

      <div className="relative">
        {/* Nav */}
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#7C5CFF] to-cyan-400 text-sm font-black text-white shadow-lg shadow-[#7C5CFF]/40">S</span>
            <span className="text-[17px] font-bold tracking-tight">Synapse</span>
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-zinc-300 backdrop-blur">05 · Midnight</span>
          </div>
          <nav className="hidden gap-7 text-sm text-zinc-400 md:flex">
            <a href="#console" className="transition hover:text-white">Console</a><a href="#powers" className="transition hover:text-white">Powers</a><a href="#access" className="transition hover:text-white">Access</a>
          </nav>
          <Link href="/without-design-skill/muse-wonder-1.0/1" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200">Enter Synapse</Link>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6 pt-12 text-center lg:px-10 lg:pt-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-[12px] font-medium text-zinc-300 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-400" /> Neural index online · 12,408 memories synced
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
            Your second brain,
            <br />
            <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C5CFF] to-cyan-300 bg-clip-text text-transparent">awake at midnight.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            A dark, quiet command center for everything you know. Capture at the speed of thought — recall at the speed of light. Built for deep work after dark.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF0] px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#7C5CFF]/35 transition hover:brightness-110">Activate your brain — free</button>
            <button className="rounded-full border border-white/15 bg-white/[0.05] px-7 py-3.5 text-sm font-medium backdrop-blur transition hover:bg-white/10">Watch the film · 90s</button>
          </div>

          {/* Command console */}
          <div id="console" className="relative mx-auto mt-14 max-w-4xl text-left">
            <div className="absolute -inset-px rounded-[26px] bg-gradient-to-b from-white/20 via-white/[0.06] to-transparent" />
            <div className="relative overflow-hidden rounded-[25px] bg-[#0B0B1E]/90 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" /><span className="h-3 w-3 rounded-full bg-[#FEBC2E]" /><span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 font-mono text-xs text-zinc-500">synapse — command</span>
                <span className="ml-auto rounded-full bg-emerald-400/10 px-2.5 py-1 font-mono text-[11px] text-emerald-300 ring-1 ring-emerald-400/20">● LIVE</span>
              </div>
              <div className="grid md:grid-cols-[1fr_290px]">
                <div className="p-6">
                  <p className="font-mono text-[13px] text-zinc-500"><span className="text-[#A78BFA]">›</span> ask anything you&apos;ve ever saved</p>
                  <p className="mt-3 text-xl font-semibold leading-snug">“What&apos;s my best thinking on pricing psychology?”</p>
                  <div className="mt-5 space-y-3">
                    {[
                      { t: "Synthesis from 14 notes", d: "Anchor high, frame monthly, cite value before cost — your position since Mar 2024.", c: "border-[#7C5CFF]/40 bg-[#7C5CFF]/[0.08]" },
                      { t: "Strongest source", d: "“Pricing notes — Cialdini re-read” · linked to 6 projects", c: "border-white/[0.08] bg-white/[0.03]" },
                    ].map((r) => (
                      <div key={r.t} className={`rounded-2xl border p-4 ${r.c}`}>
                        <p className="text-sm font-semibold">{r.t}</p><p className="mt-1 text-sm leading-relaxed text-zinc-400">{r.d}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3">
                    <span className="font-mono text-[#A78BFA]">›</span>
                    <span className="text-sm text-zinc-500">Ask your brain anything…</span>
                    <kbd className="ml-auto rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 font-mono text-[11px] text-zinc-400">⌘ K</kbd>
                  </div>
                </div>
                <aside className="border-t border-white/[0.07] p-5 md:border-l md:border-t-0">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Resurfacing now</p>
                  <div className="mt-3 space-y-2.5">
                    {[["Decision log · Mar 12", "Relevant to open task", "#7C5CFF"], ["Book: Thinking in Systems", "Cited 4× this week", "#22D3EE"], ["Voice memo · Yesterday", "Transcribed · linked ×3", "#34D399"]].map(([t, d, c]) => (
                      <div key={t} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5">
                        <p className="flex items-center gap-2 text-[13px] font-semibold"><span className="h-2 w-2 rounded-full" style={{ background: c }} />{t}</p>
                        <p className="mt-1 pl-4 text-xs text-zinc-500">{d}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl bg-gradient-to-br from-[#7C5CFF]/25 to-cyan-400/10 p-4 ring-1 ring-white/10">
                    <p className="text-sm font-semibold">Recall streak</p>
                    <p className="mt-1 font-mono text-2xl font-bold">128 days</p>
                    <p className="text-xs text-zinc-400">Every day, something old became useful again.</p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* Powers */}
        <section id="powers" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="text-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-[#A78BFA]">Capabilities</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Powers of a mind<br className="sm:hidden" /> that forgets nothing.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: "⚡", title: "Instant capture", body: "⌘K from anywhere. Voice, clip, scan, share-sheet — two seconds, zero sorting. The inbox that empties itself.", glow: "group-hover:shadow-[#7C5CFF]/20" },
              { icon: "◎", title: "Neural linking", body: "Meaning-based connections across your entire history. Your past thinking clocks in for today's work, uninvited and exactly on time.", glow: "group-hover:shadow-cyan-400/20" },
              { icon: "✦", title: "Cited recall", body: "Answers synthesized only from your notes — every claim traceable to the line you wrote. No generic AI soup.", glow: "group-hover:shadow-emerald-400/20" },
            ].map((f) => (
              <article key={f.title} className={`group rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.05] hover:shadow-2xl ${f.glow}`}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl">{f.icon}</span>
                <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">{f.body}</p>
              </article>
            ))}
          </div>

          {/* Metrics band */}
          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
            {[["0.3s", "median recall"], ["2.4B", "notes indexed"], ["4.9 / 5", "31,204 reviews"], ["100%", "yours — export anytime"]].map(([v, l]) => (
              <div key={l} className="bg-[#0A0A1C] p-6 text-center"><p className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-3xl font-bold text-transparent">{v}</p><p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">{l}</p></div>
            ))}
          </div>
        </section>

        {/* Access / CTA */}
        <section id="access" className="mx-auto max-w-7xl px-6 pb-40 lg:px-10">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-6 py-14 text-center backdrop-blur sm:px-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[560px] -translate-x-1/2 rounded-full bg-[#7C5CFF]/25 blur-[90px]" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Turn the lights down.<br />Turn your memory up.</h2>
              <p className="mx-auto mt-4 max-w-md text-zinc-400">Free for your first 1,000 notes. Pro is $8/mo for unlimited everything — cancel anytime, keep everything.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button className="rounded-full bg-white px-8 py-4 text-sm font-bold text-zinc-950 shadow-xl transition hover:bg-zinc-200">Start free — 2 minutes</button>
                <span className="self-center font-mono text-xs text-zinc-500">No card · ⌘K included</span>
              </div>
              <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-600">05 · Midnight — the dark direction · Compare all five with the pill below</p>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/[0.07] py-6 text-center font-mono text-xs text-zinc-600">SYNAPSE © 2026 — YOUR MIND, INDEXED.</footer>
      </div>
    </div>
  );
}
