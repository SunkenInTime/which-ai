import EmailCapture from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/email-capture";
import { features, quotes, stats } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/lib/content";
import { ArrowIcon, Mark } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/icons";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cortex — 1. Paper & Ink",
};


const rules = {
  hair: "border-[#17150f]/15",
};

export default function PaperAndInk() {
  return (
    <div className="min-h-screen bg-[#f3f0e7] font-dm text-[#17150f] selection:bg-[#17150f] selection:text-[#f3f0e7]">
      {/* Masthead */}
      <header className="mx-auto max-w-[1180px] px-6 pt-7 pb-6 md:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <Mark className="size-[18px] translate-y-[2px]" />
            <span className="font-serif text-[26px] leading-none tracking-[-0.01em]">
              Cortex
            </span>
          </div>
          <nav className="hidden items-center gap-7 text-[12px] tracking-[0.02em] text-[#4a463c] md:flex">
            <a className="transition hover:text-[#17150f]" href="#how">The mechanics</a>
            <a className="transition hover:text-[#17150f]" href="#notes">Field note</a>
            <a className="transition hover:text-[#17150f]" href="#start">Begin</a>
          </nav>
          <a
            href="#start"
            className="group flex items-center gap-2 border border-[#17150f] px-4 py-2 text-[12px] tracking-[0.01em] transition-colors hover:bg-[#17150f] hover:text-[#f3f0e7]"
          >
            Open the app
            <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      <div className={`mx-auto max-w-[1180px] border-t ${rules.hair} px-6 md:px-10`} />

      {/* Hero */}
      <section className="mx-auto max-w-[1180px] px-6 pt-12 pb-14 md:px-10 md:pt-16">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.22em] text-[#7a7365] uppercase">
          <span>A notebook that keeps up</span>
          <span className="h-px flex-1 bg-[#17150f]/15" />
          <span className="tabular-nums">Vol. IV — Edition 42</span>
        </div>

        <div className="mt-9 grid gap-10 md:grid-cols-12 md:gap-8">
          <h1 className="md:col-span-8 font-serif text-[clamp(3.1rem,8.4vw,6.6rem)] leading-[0.9] tracking-[-0.025em]">
            Your notes
            <br />
            should{" "}
            <em className="italic text-[#8a3b1f]">remember</em>
            <br />
            for you.
          </h1>

          <div className="flex flex-col justify-end md:col-span-4 md:pb-3">
            <p className="max-w-[34ch] text-[15px] leading-[1.65] text-[#3d392f]">
              Cortex is a notebook that connects what you write. Every idea you drop
              in becomes linked, searchable and answerable — so half a decade of
              thinking is never buried in a folder you have forgotten about.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#start"
                className="group inline-flex items-center gap-2 bg-[#17150f] px-5 py-3 text-[13px] text-[#f3f0e7] transition hover:bg-[#8a3b1f]"
              >
                Start your brain
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#how"
                className="group inline-flex items-center gap-2 px-2 py-3 text-[13px] text-[#3d392f] underline decoration-[#17150f]/25 decoration-1 underline-offset-[5px] transition hover:decoration-[#17150f]"
              >
                How linking works
              </a>
            </div>
            <p className="mt-5 border-t border-[#17150f]/15 pt-3 text-[11.5px] leading-relaxed text-[#8b8474]">
              Free for your first 1,000 notes. No account needed to try.
            </p>
          </div>
        </div>
      </section>

      {/* Ledger of numbers */}
      <section className="border-y border-[#17150f]/15 bg-[#eeeade]">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <dl className="grid grid-cols-2 gap-px bg-[#17150f]/15 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#eeeade] py-7 md:px-7 md:py-8">
                <dt className="text-[10.5px] tracking-[0.16em] text-[#8b8474] uppercase">
                  {s.label}
                </dt>
                <dd className="mt-2 font-serif text-[2.4rem] leading-none tabular-nums tracking-[-0.02em] md:text-[2.9rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The argument */}
      <section id="how" className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <h2 className="text-[11px] tracking-[0.22em] text-[#8b8474] uppercase">
              The mechanics
            </h2>
            <p className="mt-4 font-serif text-[26px] leading-[1.15] tracking-[-0.01em]">
              Four things happen
              <br />
              <em className="italic">after</em> you hit save.
            </p>
          </div>

          <ol className="md:col-span-9">
            {features.map((f) => (
              <li
                key={f.kicker}
                className="group grid gap-3 border-t border-[#17150f]/15 py-7 last:border-b md:grid-cols-12 md:gap-6 md:py-8"
              >
                <span className="font-mono text-[11px] tabular-nums text-[#a89f8b] md:col-span-1 md:pt-1.5">
                  {f.kicker}
                </span>
                <h3 className="font-serif text-[27px] leading-[1.1] tracking-[-0.015em] md:col-span-4 md:text-[30px]">
                  {f.title}
                </h3>
                <p className="max-w-[46ch] text-[14.5px] leading-[1.7] text-[#4a463c] md:col-span-7">
                  {f.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pull quote */}
      <section id="notes" className="border-y border-[#17150f]/15 bg-[#17150f] text-[#f3f0e7]">
        <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-2">
              <span className="text-[10.5px] tracking-[0.2em] text-[#f3f0e7]/40 uppercase">
                Field note
                <br />
                No. 07
              </span>
            </div>
            <figure className="md:col-span-10">
              <blockquote className="font-serif text-[clamp(1.75rem,3.9vw,3.1rem)] leading-[1.16] tracking-[-0.02em]">
                “{quotes[0].body}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 text-[12px] text-[#f3f0e7]/55">
                <span className="h-px w-8 bg-[#f3f0e7]/30" />
                <span className="text-[#f3f0e7]/85">{quotes[0].name}</span>
                <span>·</span>
                <span>{quotes[0].role}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Closing note / CTA */}
      <section id="start" className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2 className="font-serif text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[1] tracking-[-0.025em]">
              Begin with one note.
              <br />
              It will find the others.
            </h2>
          </div>
          <div className="md:col-span-5">
            <EmailCapture
              className="flex items-center gap-0 border-b border-[#17150f]/30 pb-2"
              inputClassName="w-full bg-transparent text-[14px] placeholder:text-[#a89f8b] focus:outline-none"
              buttonClassName="flex shrink-0 items-center gap-2 text-[13px] whitespace-nowrap transition hover:text-[#8a3b1f]"
              buttonLabel={
                <>
                  Request access
                  <ArrowIcon className="size-3.5" />
                </>
              }
              successClassName="border-b border-[#8a3b1f]/30 pb-2 text-[14px] text-[#8a3b1f]"
              successMessage="Noted. We'll write to you when your invite is ready."
            />
            <p className="mt-3 text-[11.5px] text-[#8b8474]">
              macOS, Windows, iOS, Android and a plain-text folder. Your call.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#17150f]/15">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-6 py-8 text-[11.5px] text-[#8b8474] md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 Cortex Labs — set in Instrument Serif & DM Sans</span>
          <div className="flex gap-6">
            <a className="transition hover:text-[#17150f]" href="#start">Privacy</a>
            <a className="transition hover:text-[#17150f]" href="#start">Terms</a>
            <a className="transition hover:text-[#17150f]" href="#start">Markdown export</a>
          </div>
        </div>
      </footer>

      <div className="h-24" />
    </div>
  );
}
