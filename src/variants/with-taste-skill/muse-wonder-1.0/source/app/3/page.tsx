import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Brain, FileText, Link as LinkIcon, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Reveal, FadeIn } from "@/variants/with-taste-skill/muse-wonder-1.0/source/components/Reveal";

export default function Page3() {
  return (
    <div className="min-h-[100dvh] bg-[#FFFEF9] font-mono text-zinc-900">
      {/* Brutalist header - sharp, bordered */}
      <header className="border-b-2 border-zinc-900">
        <div className="mx-auto flex h-[64px] max-w-[1240px] items-center justify-between px-5 md:px-8">
          <Link href="/with-taste-skill/muse-wonder-1.0/3" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center border-2 border-zinc-900 bg-zinc-900 text-white"><Brain size={16} weight="bold" /></span>
            <span className="text-[16px] font-bold uppercase tracking-tight">Cortex</span>
            <span className="hidden border border-zinc-900 px-1.5 py-0.5 text-[10px] font-bold uppercase sm:block">Index ed.</span>
          </Link>
          <nav className="hidden items-center gap-7 text-[13px] font-bold uppercase tracking-wide md:flex">
            <a href="#method" className="underline-offset-4 hover:underline">Method</a>
            <a href="#features" className="underline-offset-4 hover:underline">Features</a>
            <a href="#access" className="underline-offset-4 hover:underline">Access</a>
          </nav>
          <a href="#access" className="border-2 border-zinc-900 bg-[#FF5C28] px-4 py-2 text-[13px] font-bold uppercase text-white shadow-[3px_3px_0_#111] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#111] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">Get Cortex free</a>
        </div>
      </header>

      {/* Hero - oversized type, offset grid */}
      <section className="border-b-2 border-zinc-900">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 lg:grid-cols-12">
          <div className="border-b-2 border-zinc-900 px-5 py-10 md:px-8 lg:col-span-7 lg:border-b-0 lg:border-r-2 lg:py-14">
            <FadeIn>
              <p className="inline-block border border-zinc-900 bg-zinc-900 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">No folders. No filing. Just thinking.</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="mt-6 font-sans text-[52px] font-bold leading-[0.92] tracking-[-0.04em] uppercase md:text-[76px] lg:text-[84px]">
                Think
                <br />in the
                <br /><span className="bg-[#FF5C28] px-2 text-white">open.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 max-w-[44ch] font-sans text-[17px] leading-relaxed text-zinc-700">Cortex captures raw notes and wires them into a second brain you can actually search, link, and reuse.</p>
            </FadeIn>
            <FadeIn delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#access" className="inline-flex h-12 items-center gap-2 border-2 border-zinc-900 bg-zinc-900 px-6 font-sans text-[15px] font-bold text-white shadow-[4px_4px_0_#FF5C28] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#FF5C28] active:scale-[0.98]">Start free <ArrowRight size={16} weight="bold" /></a>
                <a href="#method" className="inline-flex h-12 items-center border-2 border-zinc-900 bg-white px-6 font-sans text-[15px] font-bold transition hover:bg-zinc-100 active:scale-[0.98]">Read the method</a>
              </div>
            </FadeIn>
          </div>
          <div className="flex flex-col lg:col-span-5">
            <div className="relative min-h-[240px] flex-1 border-b-2 border-zinc-900 lg:min-h-[300px]">
              <Image src="https://picsum.photos/seed/cortex-index/1000/700" alt="Stack of notebooks and index cards on a desk" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            <div className="grid grid-cols-3 divide-x-2 divide-zinc-900 text-center">
              {[{ v: "2 sec", l: "to capture" }, { v: "Auto", l: "linking" }, { v: "0", l: "folders" }].map((s) => (
                <div key={s.l} className="px-2 py-4"><p className="font-sans text-[20px] font-bold leading-none">{s.v}</p><p className="mt-1 text-[11px] uppercase tracking-wide text-zinc-500">{s.l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Method - numbered rows, single divider style */}
      <section id="method" className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 lg:py-20">
        <Reveal>
          <h2 className="font-sans text-[34px] font-bold leading-[1] tracking-tight uppercase md:text-[44px]">The method is simple</h2>
          <p className="mt-3 max-w-[56ch] font-sans text-[16px] leading-relaxed text-zinc-600">Three moves, repeated daily. Cortex handles the wiring so you keep the thinking.</p>
        </Reveal>
        <div className="mt-10 border-2 border-zinc-900">
          {[
            { n: "A", icon: FileText, title: "Capture without sorting", body: "Write the note as it arrives. Title optional. Cortex reads it, tags it, and suggests where it connects." },
            { n: "B", icon: LinkIcon, title: "Review the links, not the archive", body: "Each morning you get five suggested connections. Accept, edit, or ignore. The graph sharpens in minutes, not weekends." },
            { n: "C", icon: MagnifyingGlass, title: "Retrieve by asking", body: "Type a question the way you would ask a colleague. Get a cited answer built only from your own notes." },
          ].map((row, i) => (
            <Reveal key={row.n}>
              <div className={`grid grid-cols-[52px_1fr] gap-4 p-5 md:grid-cols-[72px_1fr_auto] md:items-center md:p-6 ${i !== 0 ? "border-t-2 border-zinc-900" : ""}`}>
                <span className="flex h-10 w-10 items-center justify-center border-2 border-zinc-900 font-sans text-[16px] font-bold md:h-12 md:w-12">{row.n}</span>
                <div>
                  <h3 className="flex items-center gap-2 font-sans text-[19px] font-bold tracking-tight"><row.icon size={18} className="text-[#FF5C28]" /> {row.title}</h3>
                  <p className="mt-1 max-w-[62ch] font-sans text-[15px] leading-relaxed text-zinc-600">{row.body}</p>
                </div>
                <ArrowUpRight size={20} className="hidden text-zinc-400 md:block" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features - dense table-like grid */}
      <section id="features" className="border-y-2 border-zinc-900 bg-zinc-900 text-white">
        <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-8">
          <Reveal>
            <h2 className="font-sans text-[32px] font-bold tracking-tight uppercase md:text-[40px]">What you get</h2>
          </Reveal>
          <div className="mt-8 grid gap-px border border-white/20 bg-white/20 md:grid-cols-2">
            {[
              { title: "Bidirectional links", body: "Every note shows what it references and what references it. Context travels both ways." },
              { title: "Daily resurfacing", body: "Notes return before meetings and writing blocks, timed to when they are useful again." },
              { title: "Markdown native", body: "Your notes are plain files. Export, back up, or leave at any time without a converter." },
              { title: "Encrypted sync", body: "Local-first storage, end-to-end encrypted across phone, tablet, and desktop." },
            ].map((f) => (
              <div key={f.title} className="bg-zinc-900 p-6">
                <h3 className="font-sans text-[18px] font-bold">{f.title}</h3>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-zinc-400">{f.body}</p>
              </div>
            ))}
          </div>
          <Reveal>
            <blockquote className="mt-10 border-l-4 border-[#FF5C28] pl-5">
              <p className="max-w-[62ch] font-sans text-[22px] font-medium leading-snug">&ldquo;It is the first notes app that did not ask me to become its librarian. I write, it organises.&rdquo;</p>
              <footer className="mt-3 font-sans text-[13px] text-zinc-400">Tomas Lindqvist - Product designer, Stockholm</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Access / CTA */}
      <section id="access" className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-sans text-[36px] font-bold leading-[0.95] tracking-tight uppercase md:text-[48px]">Your second brain starts with one note.</h2>
            <p className="mt-4 max-w-[50ch] font-sans text-[16px] leading-relaxed text-zinc-600">Free for 1,000 notes. Set up in four minutes. Bring your existing notes with you.</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="border-2 border-zinc-900 bg-white p-6 shadow-[6px_6px_0_#111]">
              <p className="text-[12px] font-bold uppercase tracking-wider text-zinc-500">Get started</p>
              <p className="mt-2 font-sans text-[28px] font-bold leading-none">Free</p>
              <p className="mt-2 font-sans text-[14px] leading-relaxed text-zinc-600">Then $8 per month for unlimited notes and AI recall. Cancel anytime, keep your files.</p>
              <a href="#access" className="mt-6 flex h-12 w-full items-center justify-center gap-2 border-2 border-zinc-900 bg-[#FF5C28] font-sans text-[15px] font-bold text-white transition hover:bg-[#E64A1F] active:scale-[0.99]">Create your brain <ArrowRight size={16} weight="bold" /></a>
              <p className="mt-3 text-center text-[12px] text-zinc-500">No credit card required</p>
            </div>
          </Reveal>
        </div>
        <footer className="mt-14 flex flex-col items-center justify-between gap-3 border-t-2 border-zinc-900 pt-6 text-[12px] font-bold uppercase tracking-wide md:flex-row">
          <span>Cortex - Index edition</span>
          <span className="font-normal normal-case tracking-normal text-zinc-500">Five design studies. One second brain.</span>
          <div className="flex gap-5"><a href="#method" className="hover:underline">Method</a><a href="#features" className="hover:underline">Features</a></div>
        </footer>
      </section>

      <div className="h-24" />
    </div>
  );
}
