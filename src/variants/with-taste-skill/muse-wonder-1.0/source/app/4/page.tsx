import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, Leaf, MagnifyingGlass, NotePencil, Sun } from "@phosphor-icons/react/dist/ssr";
import { Reveal, FadeIn } from "@/variants/with-taste-skill/muse-wonder-1.0/source/components/Reveal";

export default function Page4() {
  return (
    <div className="min-h-[100dvh] bg-[#F2F5EF] text-[#1A2E1F]">
      <header className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-5 md:px-8">
        <Link href="/with-taste-skill/muse-wonder-1.0/4" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B4332] text-white"><Brain size={18} weight="duotone" /></span>
          <span className="text-[18px] font-semibold tracking-tight">Cortex</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[14px] font-medium text-[#41584A] md:flex">
          <a href="#rhythm" className="transition hover:text-[#1A2E1F]">Rhythm</a>
          <a href="#garden" className="transition hover:text-[#1A2E1F]">Garden</a>
          <a href="#pricing" className="transition hover:text-[#1A2E1F]">Pricing</a>
        </nav>
        <a href="#pricing" className="rounded-full bg-[#1B4332] px-4 py-2 text-[14px] font-medium text-white transition hover:bg-[#143326] active:scale-[0.98]">Get Cortex free</a>
      </header>

      {/* Hero - calm split with rounded photo */}
      <section className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-8 md:px-8 lg:grid-cols-12 lg:pt-12">
        <div className="lg:col-span-6">
          <FadeIn>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-[#2D5A3D] shadow-sm"><Leaf size={13} /> A calmer way to remember</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-6 text-[42px] font-semibold leading-[1.04] tracking-[-0.03em] md:text-[56px]">Notes that grow with you.</h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-[#41584A]">Cortex tends your ideas like a garden, linking new notes to old ones so nothing you learn goes to waste.</p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#pricing" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1B4332] px-5 text-[15px] font-medium text-white transition hover:bg-[#143326] active:scale-[0.98]">Start building your brain <ArrowRight size={16} weight="bold" /></a>
              <a href="#rhythm" className="inline-flex h-11 items-center rounded-full bg-white px-5 text-[15px] font-medium text-[#1A2E1F] shadow-sm transition hover:shadow active:scale-[0.98]">See the daily rhythm</a>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.18} className="lg:col-span-6">
          <div className="grid grid-cols-12 gap-3">
            <div className="relative col-span-7 min-h-[320px] overflow-hidden rounded-[24px]">
              <Image src="https://picsum.photos/seed/cortex-meadow/900/1100" alt="Sunlit desk with plants and an open notebook" fill className="object-cover" sizes="(max-width: 1024px) 60vw, 30vw" />
            </div>
            <div className="col-span-5 flex flex-col gap-3">
              <div className="rounded-[20px] bg-[#1B4332] p-5 text-white">
                <Sun size={20} className="text-amber-300" />
                <p className="mt-3 text-[15px] font-semibold leading-snug">Good morning. Three notes are ready to revisit.</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/70">Timed before your 9am writing block.</p>
              </div>
              <div className="flex-1 rounded-[20px] border border-[#D8E2D3] bg-white p-5">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#7A8F7E]">This week</p>
                <p className="mt-2 text-[28px] font-semibold leading-none">24 notes</p>
                <p className="mt-1 text-[13px] text-[#41584A]">linked into 6 growing threads</p>
                <div className="mt-4 space-y-2">
                  {[{ l: "On slowness", w: "82%" }, { l: "Garden cities", w: "64%" }, { l: "Reading ritual", w: "48%" }].map((r) => (
                    <div key={r.l}><div className="flex justify-between text-[12px]"><span className="font-medium">{r.l}</span><span className="text-[#7A8F7E]">{r.w}</span></div><div className="mt-1 h-1.5 rounded-full bg-[#EAF0E6]"><div className="h-full rounded-full bg-[#2D5A3D]" style={{ width: r.w }} /></div></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Rhythm - horizontal cards */}
      <section id="rhythm" className="mx-auto max-w-[1180px] px-5 pb-16 md:px-8 lg:pb-20">
        <Reveal>
          <h2 className="max-w-[24ch] text-[32px] font-semibold tracking-tight md:text-[38px]">A gentle rhythm, not another inbox to clear</h2>
          <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-[#41584A]">Cortex asks little and gives back a lot. Two minutes in the morning, two seconds whenever a thought arrives.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: NotePencil, time: "Anytime", title: "Capture in seconds", body: "A thought, a quote, a photo of a whiteboard. Drop it in and keep moving. Cortex files and links it for you." },
            { icon: Sun, time: "Morning", title: "Revisit what matters", body: "Five notes resurface each morning, chosen for what you are working on today, not what is newest." },
            { icon: MagnifyingGlass, time: "When writing", title: "Ask and keep flowing", body: "Ask a question mid-draft and get a cited answer from your own notes without leaving the page." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.07}>
              <div className="h-full rounded-[20px] border border-[#DCE5D8] bg-white p-6">
                <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF3E8] text-[#1B4332]"><c.icon size={18} /></span><span className="text-[12px] font-semibold uppercase tracking-wider text-[#7A8F7E]">{c.time}</span></div>
                <h3 className="mt-5 text-[19px] font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#41584A]">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Garden - split with image */}
      <section id="garden" className="border-y border-[#DCE5D8] bg-white">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-5 py-16 md:px-8 lg:grid-cols-2 lg:py-20">
          <Reveal>
            <div className="relative min-h-[340px] overflow-hidden rounded-[24px]">
              <Image src="https://picsum.photos/seed/cortex-garden/1000/800" alt="Greenhouse with plants in soft daylight" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <h2 className="text-[32px] font-semibold leading-[1.08] tracking-tight md:text-[38px]">Watch threads take root</h2>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-[#41584A]">Ideas that keep returning become threads. Cortex shows you which threads are growing, which need water, and which are ready to become writing.</p>
              <ul className="mt-6 space-y-3">
                {["Automatic backlinks show where each idea came from", "Orphan notes surface gently before they fade", "Threads export to a draft in one click"].map((li) => (
                  <li key={li} className="flex items-start gap-3 text-[15px] leading-relaxed"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-white"><Leaf size={11} weight="bold" /></span>{li}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quote + pricing */}
      <section id="pricing" className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex h-full flex-col justify-center rounded-[24px] bg-[#1B4332] p-7 text-white md:p-9">
              <blockquote>
                <p className="text-[24px] font-medium leading-[1.3] tracking-tight">&ldquo;It feels less like software and more like tending something. My research finally lives in one place I enjoy opening.&rdquo;</p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[13px] font-bold text-[#1B4332]">AR</span>
                  <div><p className="text-[14px] font-semibold">Ana Ruiz</p><p className="text-[13px] text-white/70">Essayist and researcher, Lisbon</p></div>
                </footer>
              </blockquote>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-[24px] border border-[#DCE5D8] bg-white p-7 md:p-8">
              <p className="text-[13px] font-semibold uppercase tracking-wider text-[#7A8F7E]">Start free</p>
              <p className="mt-3 text-[36px] font-semibold leading-none tracking-tight">$0</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#41584A]">1,000 notes free. Pro at $8 per month adds AI recall and unlimited history.</p>
              <a href="#pricing" className="mt-7 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[#1B4332] px-5 text-[15px] font-medium text-white transition hover:bg-[#143326] active:scale-[0.98]">Get Cortex free <ArrowRight size={16} weight="bold" /></a>
              <p className="mt-3 text-[12px] text-[#7A8F7E]">Works on Mac, Windows, iOS, and Android</p>
            </div>
          </Reveal>
        </div>
        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#DCE5D8] pt-8 text-[13px] text-[#7A8F7E] md:flex-row">
          <span className="font-semibold text-[#1A2E1F]">Cortex</span>
          <span>Notes that grow with you.</span>
          <div className="flex gap-5"><a href="#rhythm" className="hover:text-[#1A2E1F]">Rhythm</a><a href="#garden" className="hover:text-[#1A2E1F]">Garden</a><a href="#pricing" className="hover:text-[#1A2E1F]">Pricing</a></div>
        </footer>
      </section>

      <div className="h-24" />
    </div>
  );
}
