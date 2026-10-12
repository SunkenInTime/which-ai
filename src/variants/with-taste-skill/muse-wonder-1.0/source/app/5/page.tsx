import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, MagnifyingGlass, NotePencil, PlugsConnected } from "@phosphor-icons/react/dist/ssr";
import { Reveal, FadeIn } from "@/variants/with-taste-skill/muse-wonder-1.0/source/components/Reveal";

export default function Page5() {
  return (
    <div className="min-h-[100dvh] bg-[#FFFFF8] text-zinc-900">
      {/* Swiss header - grid aligned */}
      <header className="border-b border-zinc-200">
        <div className="mx-auto grid h-[68px] max-w-[1240px] grid-cols-12 items-center px-5 md:px-8">
          <Link href="/with-taste-skill/muse-wonder-1.0/5" className="col-span-6 flex items-center gap-2.5 md:col-span-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#002FA7] text-white"><Brain size={16} weight="bold" /></span>
            <span className="text-[17px] font-semibold tracking-tight">Cortex</span>
          </Link>
          <nav className="hidden items-center justify-center gap-8 text-[14px] font-medium text-zinc-600 md:col-span-6 md:flex">
            <a href="#system" className="transition hover:text-zinc-900">System</a>
            <a href="#modules" className="transition hover:text-zinc-900">Modules</a>
            <a href="#access" className="transition hover:text-zinc-900">Access</a>
          </nav>
          <div className="col-span-6 flex justify-end md:col-span-3">
            <a href="#access" className="rounded-full bg-[#002FA7] px-4 py-2 text-[14px] font-medium text-white transition hover:bg-[#002584] active:scale-[0.98]">Get Cortex free</a>
          </div>
        </div>
      </header>

      {/* Hero - strict 12-col grid */}
      <section className="mx-auto max-w-[1240px] px-5 pt-10 md:px-8 lg:pt-14">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <FadeIn>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#002FA7]">A system for second brains</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="mt-5 text-[44px] font-semibold leading-[1.0] tracking-[-0.03em] md:text-[60px] lg:text-[68px]">Every note in its place. Every place connected.</h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-zinc-600">Cortex gives scattered notes a clear structure and the links between them, so retrieval is exact.</p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#access" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#002FA7] px-5 text-[15px] font-medium text-white transition hover:bg-[#002584] active:scale-[0.98]">Start building your brain <ArrowRight size={16} weight="bold" /></a>
                <a href="#system" className="inline-flex h-11 items-center rounded-full border border-zinc-300 px-5 text-[15px] font-medium transition hover:border-zinc-400 active:scale-[0.98]">View the system</a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.18} className="col-span-12 lg:col-span-5">
            <div className="overflow-hidden rounded-[16px] border border-zinc-200">
              <div className="relative h-[220px]">
                <Image src="https://picsum.photos/seed/cortex-swiss/1000/620" alt="Ordered workspace with grid notebooks" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
              <div className="grid grid-cols-3 divide-x divide-zinc-200 bg-white text-center">
                {[{ v: "Capture", d: "2 sec" }, { v: "Connect", d: "Auto" }, { v: "Retrieve", d: "0.4 sec" }].map((c) => (
                  <div key={c.v} className="px-2 py-3.5"><p className="text-[13px] font-semibold">{c.v}</p><p className="font-mono text-[11px] text-zinc-500">{c.d}</p></div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* System strip - mono spec row */}
        <FadeIn delay={0.28}>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-zinc-200 bg-zinc-200 md:grid-cols-4">
            {[
              { k: "Input", v: "Text, voice, web, PDF" },
              { k: "Structure", v: "Links, not folders" },
              { k: "Retrieval", v: "Search plus cited AI" },
              { k: "Storage", v: "Local-first, Markdown" },
            ].map((s) => (
              <div key={s.k} className="bg-white px-4 py-3.5"><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">{s.k}</p><p className="mt-1 text-[13px] font-medium">{s.v}</p></div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* System - two-column stacked header (not split-header) */}
      <section id="system" className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 lg:py-20">
        <Reveal>
          <h2 className="max-w-[20ch] text-[32px] font-semibold tracking-tight md:text-[40px]">Three modules. One clear flow.</h2>
          <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-zinc-600">Each module does one job well. Together they turn a pile of notes into a brain you can query.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            { icon: NotePencil, num: "Capture", title: "Write first, file never", body: "Quick capture from any device. Cortex reads the note, extracts entities, and proposes links you can accept in one tap." },
            { icon: PlugsConnected, num: "Connect", title: "Links build the structure", body: "Bidirectional links and typed relationships replace folder trees. The graph view shows clusters, bridges, and gaps." },
            { icon: MagnifyingGlass, num: "Retrieve", title: "Answers with receipts", body: "Full-text search plus a cited answer layer. Every AI answer points to the exact notes it drew from." },
          ].map((m, i) => (
            <Reveal key={m.title} delay={i * 0.07}>
              <div className="flex h-full flex-col rounded-[16px] border border-zinc-200 bg-white p-6">
                <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#002FA7]/[0.08] text-[#002FA7]"><m.icon size={19} /></span><span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">{m.num}</span></div>
                <h3 className="mt-5 text-[19px] font-semibold tracking-tight">{m.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-zinc-600">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Modules table alternative - grouped chunks, not hairline rows */}
      <section id="modules" className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-8">
          <Reveal>
            <h2 className="text-[30px] font-semibold tracking-tight md:text-[36px]">What is included</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: "Core", items: ["Unlimited capture on free tier to 1,000 notes", "Bidirectional links and graph view", "Full-text search across everything"] },
              { title: "Recall", items: ["Daily resurfacing before your work blocks", "Cited AI answers from your notes only", "Meeting briefs built from linked notes"] },
              { title: "Trust", items: ["Local-first storage, Markdown export", "End-to-end encrypted sync", "Works offline, syncs when you return"] },
            ].map((g) => (
              <Reveal key={g.title}>
                <div className="h-full rounded-[16px] border border-zinc-200 bg-white p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#002FA7]">{g.title}</p>
                  <ul className="mt-4 space-y-3">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-zinc-700"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#002FA7]" />{it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <blockquote className="mt-10 max-w-[760px]">
              <p className="text-[24px] font-medium leading-[1.3] tracking-tight">&ldquo;The structure is visible. I can see why a note is where it is, and I can get to any answer in two clicks.&rdquo;</p>
              <footer className="mt-4 text-[14px] text-zinc-500">Clara Hoffmann - Operations lead, Berlin</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Access */}
      <section id="access" className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 lg:py-20">
        <Reveal>
          <div className="grid overflow-hidden rounded-[20px] bg-[#002FA7] lg:grid-cols-12">
            <div className="p-7 text-white md:p-10 lg:col-span-7">
              <h2 className="max-w-[18ch] text-[32px] font-semibold leading-[1.05] tracking-tight md:text-[40px]">Give your notes a system that lasts</h2>
              <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-white/80">Start free, import in minutes, and keep every file as portable Markdown from day one.</p>
              <a href="#access" className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[15px] font-semibold text-[#002FA7] transition hover:bg-zinc-100 active:scale-[0.98]">Get Cortex free <ArrowRight size={16} weight="bold" /></a>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/15 text-center text-white lg:col-span-5">
              {[{ v: "Free", l: "1,000 notes" }, { v: "$8/mo", l: "Pro unlimited" }, { v: "4 min", l: "to import" }].map((s) => (
                <div key={s.l} className="flex flex-col items-center justify-center px-2 py-8"><p className="text-[20px] font-semibold leading-none">{s.v}</p><p className="mt-1.5 text-[12px] text-white/70">{s.l}</p></div>
              ))}
            </div>
          </div>
        </Reveal>
        <footer className="mt-12 grid grid-cols-12 items-center gap-4 border-t border-zinc-200 pt-8 text-[13px] text-zinc-500">
          <span className="col-span-6 font-semibold text-zinc-800 md:col-span-3">Cortex</span>
          <span className="hidden text-center md:col-span-6 md:block">Every note in its place. Every place connected.</span>
          <div className="col-span-6 flex justify-end gap-5 md:col-span-3"><a href="#system" className="hover:text-zinc-900">System</a><a href="#modules" className="hover:text-zinc-900">Modules</a></div>
        </footer>
      </section>

      <div className="h-24" />
    </div>
  );
}
