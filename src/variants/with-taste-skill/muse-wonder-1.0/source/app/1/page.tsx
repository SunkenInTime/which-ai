import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Brain, Link as LinkIcon, MagnifyingGlass, NotePencil, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { Reveal, FadeIn } from "@/variants/with-taste-skill/muse-wonder-1.0/source/components/Reveal";

export default function Page1() {
  return (
    <div className="min-h-[100dvh] bg-[#FDFCF9] text-zinc-900">
      {/* Nav - single line, 68px */}
      <header className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-5 md:px-8">
        <Link href="/with-taste-skill/muse-wonder-1.0/1" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white">
            <Brain size={17} weight="duotone" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">Cortex</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[14px] font-medium text-zinc-600 md:flex">
          <a href="#how" className="transition hover:text-zinc-900">How it works</a>
          <a href="#features" className="transition hover:text-zinc-900">Features</a>
          <a href="#stories" className="transition hover:text-zinc-900">Stories</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#cta" className="hidden text-[14px] font-medium text-zinc-600 transition hover:text-zinc-900 sm:block">Sign in</a>
          <a href="#cta" className="ml-2 rounded-full bg-zinc-900 px-4 py-2 text-[14px] font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98]">Get Cortex free</a>
        </div>
      </header>

      {/* Hero - asymmetric split, fits viewport */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-10 md:px-8 lg:grid-cols-12 lg:gap-6 lg:pt-14">
        <div className="lg:col-span-6">
          <FadeIn>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-700">For thinkers who outgrow folders</p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-5 text-[42px] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[56px] lg:text-[64px]">
              Your notes,
              <br />
              <span className="text-emerald-700">thinking back.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-zinc-600">
              Cortex links every idea you capture and resurfaces the right note at the moment you need it.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#cta" className="inline-flex h-11 items-center gap-2 rounded-full bg-emerald-700 px-5 text-[15px] font-medium text-white transition hover:bg-emerald-800 active:scale-[0.98]">
                Start building your brain <ArrowRight size={16} weight="bold" />
              </a>
              <a href="#how" className="inline-flex h-11 items-center rounded-full border border-zinc-300 bg-white px-5 text-[15px] font-medium text-zinc-800 transition hover:border-zinc-400 active:scale-[0.98]">
                See how it works
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Real component preview - live note graph, not a fake screenshot */}
        <FadeIn delay={0.2} className="lg:col-span-6">
          <div className="relative rounded-[20px] border border-zinc-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-2 text-[13px] font-medium text-zinc-700">
                <NotePencil size={15} className="text-emerald-700" /> On attention and deep work
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">12 links</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-700">
              Attention is not a resource to spend. It is a garden to tend. Every note here connects to a decision I made later.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["#deep-work", "#attention", "#cal Newport", "[[Weekly review]]"].map((t) => (
                <span key={t} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[12px] font-medium text-zinc-600">{t}</span>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { title: "The shallows", meta: "Linked 2d ago" },
                { title: "Maker schedule", meta: "Resurfaced today" },
                { title: "Reading list Q3", meta: "3 backlinks" },
              ].map((c) => (
                <div key={c.title} className="rounded-[14px] border border-zinc-100 bg-[#FDFCF9] p-3">
                  <p className="text-[13px] font-semibold leading-tight">{c.title}</p>
                  <p className="mt-1 text-[11px] text-zinc-500">{c.meta}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-[12px] bg-zinc-900 px-3.5 py-2.5 text-[13px] text-white">
              <Sparkle size={15} className="shrink-0 text-emerald-300" />
              <span className="truncate">Cortex found a connection to your draft on focus rituals.</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Logo wall - under hero, logos only */}
      <section className="border-y border-zinc-200/70 bg-white/60">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-6 md:justify-between md:px-8">
          {["Linear", "Figma", "Vercel", "Notion Labs", "Arc"].map((name) => (
            <span key={name} className="text-[14px] font-semibold tracking-tight text-zinc-400">{name}</span>
          ))}
          <span className="hidden text-[12px] text-zinc-400 lg:block">Teams thinking in Cortex</span>
        </div>
      </section>

      {/* How it works - vertical stack, no eyebrow */}
      <section id="how" className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 lg:py-24">
        <Reveal>
          <h2 className="max-w-[18ch] text-[32px] font-semibold leading-[1.05] tracking-tight md:text-[40px]">Capture fast. Connect automatically. Retrieve instantly.</h2>
          <p className="mt-4 max-w-[58ch] text-[16px] leading-relaxed text-zinc-600">No folders to maintain. You write in plain language and Cortex builds the links, so retrieval feels like remembering, not searching.</p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-zinc-200 bg-zinc-200 md:grid-cols-3">
          {[
            { icon: NotePencil, title: "Write without filing", body: "Dump a thought in two seconds. Cortex reads context, suggests links, and files it where future you will look." },
            { icon: LinkIcon, title: "Links form themselves", body: "Bidirectional links and a living graph show how ideas relate, without you drawing a single line by hand." },
            { icon: MagnifyingGlass, title: "Ask, do not hunt", body: "Ask a question in plain English. Cortex answers from your notes with citations back to the exact paragraph." },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="bg-white">
              <div className="flex h-full flex-col p-6 md:p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700/10 text-emerald-700"><f.icon size={19} /></span>
                <h3 className="mt-5 text-[18px] font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Bento - varied cells with real images */}
      <section id="features" className="mx-auto max-w-[1200px] px-5 pb-20 md:px-8 lg:pb-24">
        <Reveal>
          <h2 className="text-[32px] font-semibold tracking-tight md:text-[40px]">Built for a lifetime of ideas</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-[20px] bg-zinc-900">
              <Image src="https://picsum.photos/seed/cortex-desk/1200/700" alt="Writer desk with notebook and laptop" fill className="object-cover opacity-80" sizes="(max-width: 768px) 100vw, 58vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16">
                <p className="text-[20px] font-semibold text-white">Daily notes that compound</p>
                <p className="mt-1 max-w-[42ch] text-[14px] leading-relaxed text-white/80">Morning pages, meeting notes, and half-formed hunches live in one timeline and link forward on their own.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-[20px] border border-zinc-200 bg-white p-6">
              <div>
                <p className="text-[28px] font-semibold tracking-tight">Graph view</p>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">See clusters form around projects. Orphan notes surface before they are forgotten, not after.</p>
              </div>
              <div className="mt-6 flex items-end gap-1.5">
                {[18, 32, 24, 44, 38, 56, 48].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-[6px] bg-emerald-700/15" style={{ height: `${h}px` }}><div className="h-full rounded-t-[6px] bg-emerald-700" style={{ height: `${Math.max(28, h - 10)}%`, marginTop: "auto" }} /></div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal className="md:col-span-4">
            <div className="h-full rounded-[20px] border border-zinc-200 bg-emerald-700 p-6 text-white">
              <p className="text-[15px] font-medium text-emerald-100">Resurfacing</p>
              <p className="mt-3 text-[22px] font-semibold leading-snug">The right note, on the right morning.</p>
              <p className="mt-2 text-[14px] leading-relaxed text-emerald-100/90">Cortex brings back relevant notes before meetings and writing sessions, timed to your calendar.</p>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-4">
            <div className="h-full rounded-[20px] border border-zinc-200 bg-white p-6">
              <p className="text-[15px] font-medium text-zinc-500">Private by default</p>
              <p className="mt-3 text-[22px] font-semibold leading-snug tracking-tight">Local-first, encrypted sync.</p>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-600">Your brain stays yours. Notes live on your device first and sync end-to-end encrypted.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-4">
            <div className="relative h-full min-h-[220px] overflow-hidden rounded-[20px]">
              <Image src="https://picsum.photos/seed/cortex-library/800/600" alt="Library shelves with warm light" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-12">
                <p className="text-[16px] font-semibold text-white">Import in minutes</p>
                <p className="text-[13px] text-white/80">Notion, Obsidian, Apple Notes, plain Markdown.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonial - single quote */}
      <section id="stories" className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 lg:py-20">
          <Reveal>
            <blockquote className="max-w-[720px]">
              <p className="text-[26px] font-medium leading-[1.25] tracking-tight text-zinc-900 md:text-[30px]">&ldquo;I stopped re-reading my own notes to find things. Cortex just hands me the paragraph I need while I write.&rdquo;</p>
              <footer className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-[13px] font-bold text-white">MK</span>
                <div>
                  <p className="text-[14px] font-semibold">Maya Kowalski</p>
                  <p className="text-[13px] text-zinc-500">Research lead, independent studio</p>
                </div>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 lg:py-24">
        <Reveal>
          <div className="rounded-[24px] bg-zinc-900 px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="mx-auto max-w-[20ch] text-[32px] font-semibold leading-[1.05] tracking-tight text-white md:text-[42px]">Start remembering everything you learn</h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-[16px] leading-relaxed text-zinc-400">Free for your first 1,000 notes. No credit card. Import takes about four minutes.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#cta" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-zinc-900 transition hover:bg-zinc-100 active:scale-[0.98]">Get Cortex free <ArrowUpRight size={16} weight="bold" /></a>
              <a href="#how" className="inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-[15px] font-medium text-white transition hover:bg-white/10 active:scale-[0.98]">Watch 2-min tour</a>
            </div>
          </div>
        </Reveal>
        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 text-[13px] text-zinc-500 md:flex-row">
          <span className="font-semibold text-zinc-700">Cortex</span>
          <span>Built for people who think in notes.</span>
          <div className="flex gap-5"><a href="#how" className="hover:text-zinc-900">How it works</a><a href="#features" className="hover:text-zinc-900">Features</a><a href="#stories" className="hover:text-zinc-900">Stories</a></div>
        </footer>
      </section>

      <div className="h-24" />
    </div>
  );
}
