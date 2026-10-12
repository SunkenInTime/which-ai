import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, Graph, Lightning, LockKey, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Reveal, FadeIn } from "@/variants/with-taste-skill/muse-wonder-1.0/source/components/Reveal";

const NODES = [
  { label: "Deep work", x: 50, y: 18, r: 34 },
  { label: "Attention", x: 22, y: 42, r: 22 },
  { label: "Habits", x: 78, y: 38, r: 26 },
  { label: "Writing", x: 38, y: 68, r: 20 },
  { label: "Research", x: 66, y: 72, r: 28 },
  { label: "Focus rituals", x: 86, y: 64, r: 16 },
];

export default function Page2() {
  return (
    <div className="grain min-h-[100dvh] bg-[#0A0A0B] text-zinc-100">
      <header className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-5 md:px-8">
        <Link href="/with-taste-skill/muse-wonder-1.0/2" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-lime-400 text-zinc-900"><Brain size={17} weight="bold" /></span>
          <span className="text-[17px] font-semibold tracking-tight">Cortex</span>
          <span className="ml-1 hidden rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400 sm:block">Neural edition</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[14px] font-medium text-zinc-400 md:flex">
          <a href="#graph" className="transition hover:text-white">Graph</a>
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
        </nav>
        <a href="#cta" className="rounded-full bg-lime-400 px-4 py-2 text-[14px] font-semibold text-zinc-900 transition hover:bg-lime-300 active:scale-[0.98]">Get Cortex free</a>
      </header>

      {/* Hero - left copy, right live graph */}
      <section className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-5 pb-14 pt-8 md:px-8 lg:grid-cols-12 lg:pt-12">
        <div className="lg:col-span-5">
          <FadeIn>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime-400">Second brain, visualised</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-5 text-[44px] font-semibold leading-[0.98] tracking-[-0.03em] md:text-[60px]">
              See how your
              <br />ideas <span className="text-lime-400">connect.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-5 max-w-[44ch] text-[16px] leading-relaxed text-zinc-400">Cortex turns scattered notes into a living network you can explore, query, and trust.</p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#cta" className="inline-flex h-11 items-center gap-2 rounded-full bg-lime-400 px-5 text-[15px] font-semibold text-zinc-900 transition hover:bg-lime-300 active:scale-[0.98]">Start building your brain <ArrowRight size={16} weight="bold" /></a>
              <a href="#graph" className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/5 px-5 text-[15px] font-medium text-white transition hover:bg-white/10 active:scale-[0.98]">Explore the graph</a>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 flex gap-8 border-t border-white/10 pt-5">
              {[{ v: "12k+", l: "notes linked daily" }, { v: "0.4s", l: "median retrieval" }, { v: "100%", l: "private and local-first" }].map((s) => (
                <div key={s.l}><p className="font-mono text-[18px] font-semibold text-white">{s.v}</p><p className="mt-0.5 text-[12px] text-zinc-500">{s.l}</p></div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.18} className="lg:col-span-7">
          <div id="graph" className="relative overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900/60">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <span className="flex items-center gap-2 text-[13px] font-medium text-zinc-300"><Graph size={15} className="text-lime-400" /> Knowledge graph</span>
              <span className="font-mono text-[11px] text-zinc-500">1,284 notes - 4,021 links</span>
            </div>
            {/* Live graph visualisation - real SVG network */}
            <div className="relative h-[340px] md:h-[380px]">
              <svg viewBox="0 0 100 84" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <line x1="50" y1="18" x2="22" y2="42" stroke="rgba(163,230,53,0.35)" strokeWidth="0.4" />
                <line x1="50" y1="18" x2="78" y2="38" stroke="rgba(163,230,53,0.35)" strokeWidth="0.4" />
                <line x1="22" y1="42" x2="38" y2="68" stroke="rgba(255,255,255,0.14)" strokeWidth="0.4" />
                <line x1="78" y1="38" x2="66" y2="72" stroke="rgba(255,255,255,0.14)" strokeWidth="0.4" />
                <line x1="50" y1="18" x2="66" y2="72" stroke="rgba(255,255,255,0.10)" strokeWidth="0.4" />
                <line x1="38" y1="68" x2="66" y2="72" stroke="rgba(163,230,53,0.25)" strokeWidth="0.4" />
                <line x1="78" y1="38" x2="86" y2="64" stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" />
              </svg>
              {NODES.map((n, i) => (
                <div key={n.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${(n.y / 84) * 100}%` }}>
                  <div className={`flex items-center justify-center rounded-full border text-center font-medium leading-none ${i === 0 ? "border-lime-400/60 bg-lime-400 text-zinc-900 shadow-[0_0_40px_rgba(163,230,53,0.25)]" : "border-white/15 bg-zinc-800 text-zinc-200"}`} style={{ width: n.r * 2.2, height: n.r * 2.2, fontSize: i === 0 ? 11 : 10, padding: 6 }}>
                    {n.label}
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-[14px] border border-white/10 bg-black/50 px-3.5 py-2.5 backdrop-blur">
                <MagnifyingGlass size={15} className="shrink-0 text-lime-400" />
                <span className="truncate text-[13px] text-zinc-300">Ask your brain: what did I conclude about maker schedules?</span>
                <span className="ml-auto shrink-0 rounded-full bg-lime-400 px-2.5 py-1 text-[11px] font-bold text-zinc-900">Ask</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Features - asymmetric rows, not 3 equal cards */}
      <section id="features" className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 lg:py-20">
        <Reveal>
          <h2 className="max-w-[22ch] text-[32px] font-semibold tracking-tight md:text-[40px]">Not another folder. A network that works for you.</h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          <Reveal>
            <div className="grid overflow-hidden rounded-[20px] border border-white/10 bg-zinc-900/50 md:grid-cols-12">
              <div className="relative min-h-[220px] md:col-span-5">
                <Image src="https://picsum.photos/seed/cortex-neural/1000/700" alt="Abstract network of connected points" fill className="object-cover opacity-70" sizes="(max-width: 768px) 100vw, 40vw" />
              </div>
              <div className="flex flex-col justify-center p-6 md:col-span-7 md:p-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-lime-400/15 text-lime-400"><Lightning size={17} /></span>
                <h3 className="mt-4 text-[22px] font-semibold tracking-tight">Instant recall, cited</h3>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-zinc-400">Ask in natural language and get answers drawn only from your notes, with a link to the exact source paragraph every time.</p>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[20px] border border-white/10 bg-zinc-900/50 p-6 md:p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/8 text-white"><Graph size={17} /></span>
                <h3 className="mt-4 text-[20px] font-semibold tracking-tight">Backlinks without busywork</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">Every mention creates a two-way link. You see context coming in and going out, so no idea sits alone.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-[20px] border border-lime-400/20 bg-lime-400/[0.06] p-6 md:p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-lime-400 text-zinc-900"><LockKey size={17} /></span>
                <h3 className="mt-4 text-[20px] font-semibold tracking-tight">Yours, on your device</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">Local-first storage with end-to-end encrypted sync. Export everything as Markdown at any time, no lock-in.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quote + pricing split */}
      <section id="pricing" className="mx-auto max-w-[1240px] px-5 pb-20 md:px-8">
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex h-full flex-col justify-between rounded-[20px] border border-white/10 bg-zinc-900/50 p-7 md:p-8">
              <blockquote>
                <p className="text-[24px] font-medium leading-[1.3] tracking-tight">&ldquo;The graph showed me my thesis was hiding in notes I wrote eight months apart. I would never have found that link alone.&rdquo;</p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 text-[13px] font-bold text-zinc-900">JO</span>
                  <div><p className="text-[14px] font-semibold">Jonas Okafor</p><p className="text-[13px] text-zinc-500">PhD candidate, systems biology</p></div>
                </footer>
              </blockquote>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <div id="cta" className="flex h-full flex-col rounded-[20px] bg-lime-400 p-7 text-zinc-900 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em]">Simple pricing</p>
              <p className="mt-4 text-[36px] font-semibold leading-none tracking-tight">Free to start</p>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-800">1,000 notes free forever. Pro is $8 per month for unlimited notes, AI recall, and priority sync.</p>
              <a href="#cta" className="mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-zinc-900 px-5 text-[15px] font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]">Get Cortex free <ArrowRight size={16} weight="bold" /></a>
            </div>
          </Reveal>
        </div>
        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[13px] text-zinc-500 md:flex-row">
          <span className="font-semibold text-zinc-300">Cortex</span>
          <span>Your second brain, visualised.</span>
          <div className="flex gap-5"><a href="#graph" className="hover:text-white">Graph</a><a href="#features" className="hover:text-white">Features</a><a href="#pricing" className="hover:text-white">Pricing</a></div>
        </footer>
      </section>

      <div className="h-24" />
    </div>
  );
}
