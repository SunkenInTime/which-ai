import EmailCapture from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/email-capture";
import { features, quotes, stats } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/lib/content";
import { ArrowIcon, Mark } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/icons";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cortex — 4. Loud Type",
};


export default function LoudType() {
  return (
    <div className="min-h-screen bg-[#f2f2ee] font-sans text-[#0a0a0a] selection:bg-[#0a0a0a] selection:text-[#f2f2ee]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b-2 border-[#0a0a0a] bg-[#f2f2ee]">
        <div className="flex items-stretch justify-between">
          <div className="flex items-center gap-2.5 border-r-2 border-[#0a0a0a] px-4 py-3 md:px-6">
            <Mark className="size-5" />
            <span className="text-[15px] leading-none font-black tracking-[-0.05em] uppercase">
              Cortex
            </span>
          </div>

          <nav className="hidden items-center divide-x-2 divide-[#0a0a0a] border-r-2 border-[#0a0a0a] text-[11px] font-bold tracking-[0.04em] uppercase md:flex">
            {["Thesis", "Machine", "Ledger", "FAQ"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="px-5 py-4 transition hover:bg-[#0a0a0a] hover:text-[#f2f2ee]"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-0 divide-x-2 divide-[#0a0a0a]">
            <a href="#ledger" className="hidden px-4 py-4 text-[11px] font-bold tracking-[0.04em] uppercase transition hover:bg-[#0a0a0a] hover:text-[#f2f2ee] sm:block">
              Log in
            </a>
            <a
              href="#start"
              className="group flex items-center gap-1.5 bg-[#d8ff3e] px-4 py-4 text-[12px] leading-none font-black tracking-[-0.01em] uppercase transition hover:bg-[#0a0a0a] hover:text-[#d8ff3e] md:px-6"
            >
              Get it
              <ArrowIcon className="size-3.5" strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="thesis" className="scroll-mt-20 border-b-2 border-[#0a0a0a]">
        <div className="grid lg:grid-cols-[1fr_320px]">
          <div className="border-b-2 border-[#0a0a0a] px-4 pt-10 pb-8 md:px-8 md:pt-14 lg:border-r-2 lg:border-b-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border-2 border-[#0a0a0a] px-2 py-0.5 font-mono text-[9.5px] font-bold tracking-[0.14em] uppercase">
                v4.2
              </span>
              <span className="border-2 border-[#0a0a0a] px-2 py-0.5 font-mono text-[9.5px] font-bold tracking-[0.14em] uppercase">
                local-first
              </span>
              <span className="bg-[#0a0a0a] px-2 py-0.5 font-mono text-[9.5px] font-bold tracking-[0.14em] text-[#d8ff3e] uppercase">
                no subscription to your own memory
              </span>
            </div>

            <h1 className="mt-8 text-[clamp(3rem,10.2vw,8.6rem)] leading-[0.82] font-black tracking-[-0.055em] uppercase">
              <span className="block">Notes</span>
              <span className="block">
                that{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">bite</span>
                  <span aria-hidden className="absolute inset-x-0 bottom-[0.09em] -z-0 h-[0.2em] bg-[#d8ff3e]" />
                </span>
              </span>
              <span className="block">back.</span>
            </h1>

            <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-[46ch] border-l-2 border-[#0a0a0a] pl-4 text-[14.5px] leading-[1.6] font-medium">
                Cortex is a second brain that refuses to be a junk drawer. It links
                every note to everything it touches, then hands the whole archive
                back to you as answers — not thirty blue links.
              </p>

              <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
                <a
                  href="#start"
                  className="group flex items-center justify-center gap-2 bg-[#0a0a0a] px-6 py-3.5 text-[12.5px] font-black tracking-[0.02em] text-[#f2f2ee] uppercase transition hover:bg-[#d8ff3e] hover:text-[#0a0a0a]"
                >
                  Start now
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
                </a>
                <a
                  href="#machine"
                  className="flex items-center justify-center border-2 border-[#0a0a0a] px-6 py-3.5 text-[12.5px] font-black tracking-[0.02em] uppercase transition hover:bg-[#0a0a0a] hover:text-[#f2f2ee]"
                >
                  See the machine
                </a>
              </div>
            </div>
          </div>

          {/* Manifesto side panel */}
          <aside className="flex flex-col justify-between bg-[#0a0a0a] p-6 text-[#f2f2ee] md:p-8">
            <div>
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-[#d8ff3e] uppercase">
                Manifesto / 001
              </p>
              <p className="mt-5 text-[clamp(1.35rem,2.4vw,1.7rem)] leading-[1.14] font-bold tracking-[-0.03em]">
                Folders are a filing cabinet. Your brain isn&apos;t one.
              </p>
              <p className="mt-4 text-[12.5px] leading-[1.65] text-[#f2f2ee]/55">
                You don&apos;t think in hierarchy. You think in sparks between things.
                So we built the app around the sparks.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px bg-[#f2f2ee]/20">
              {stats.slice(0, 4).map((s) => (
                <div key={s.label} className="bg-[#0a0a0a] px-1 py-3">
                  <div className="text-[22px] leading-none font-black tracking-[-0.04em] tabular-nums">{s.value}</div>
                  <div className="mt-1.5 font-mono text-[8.5px] leading-[1.35] tracking-[0.06em] text-[#f2f2ee]/40 uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-b-2 border-[#0a0a0a] bg-[#d8ff3e] py-2.5">
        <div className="flex w-max [animation:gallery-without-design-skill-deepseek-v4-1-flash-source-app-globals-cortex-marquee_38s_linear_infinite]">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-5 pr-5">
              {[
                "9,470 LINKS PER BRAIN",
                "NO FOLDERS",
                "MARKDOWN OUT",
                "ZERO TRACKERS",
                "OFFLINE FIRST",
                "CITES ITS SOURCES",
                "YOUR DISK, YOUR RULES",
              ].map((t) => (
                <span key={t} className="flex items-center gap-5 text-[12px] font-black tracking-[0.06em] whitespace-nowrap uppercase">
                  {t}
                  <span className="text-[10px]">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Machine / features */}
      <section id="machine" className="scroll-mt-20 border-b-2 border-[#0a0a0a]">
        <div className="flex items-baseline justify-between border-b-2 border-[#0a0a0a] px-4 py-4 md:px-8">
          <h2 className="text-[clamp(1.6rem,4vw,2.6rem)] leading-none font-black tracking-[-0.045em] uppercase">
            The machine
          </h2>
          <span className="font-mono text-[9.5px] tracking-[0.14em] text-[#0a0a0a]/45 uppercase">
            four moving parts
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <article
              key={f.kicker}
              className={`group relative flex flex-col justify-between gap-8 border-[#0a0a0a] p-6 transition-colors hover:bg-[#e7e7e1] md:p-7 ${
                i % 2 === 0 ? "md:border-r-2" : ""
              } ${i < 2 ? "border-b-2" : ""} ${i >= 2 ? "md:border-b-0" : ""} ${
                i < 3 ? "lg:border-r-2" : ""
              } lg:border-b-0`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-[#0a0a0a]/35">
                    /{f.kicker}
                  </span>
                  <span className="flex size-8 items-center justify-center border-2 border-[#0a0a0a] bg-[#d8ff3e] transition group-hover:bg-[#0a0a0a] group-hover:text-[#d8ff3e]">
                    <ArrowIcon className="size-3.5" strokeWidth={2.2} />
                  </span>
                </div>
                <h3 className="mt-6 text-[19px] leading-[1.08] font-black tracking-[-0.035em] uppercase">
                  {f.title}
                </h3>
                <p className="mt-3 text-[12.5px] leading-[1.62] text-[#0a0a0a]/65">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Ledger / quote */}
      <section id="ledger" className="scroll-mt-20 border-b-2 border-[#0a0a0a]">
        <div className="grid lg:grid-cols-[220px_1fr]">
          <div className="flex items-center gap-3 border-b-2 border-[#0a0a0a] px-4 py-6 lg:border-r-2 lg:border-b-0 md:px-6">
            <span className="font-mono text-[9.5px] leading-[1.6] tracking-[0.14em] text-[#0a0a0a]/50 uppercase">
              Ledger
              <br />
              Entry 042
            </span>
          </div>
          <div className="p-6 md:p-12">
            <blockquote className="max-w-[30ch] text-[clamp(1.7rem,4.4vw,3.3rem)] leading-[0.98] font-black tracking-[-0.05em] uppercase">
              “{quotes[1].body}”
            </blockquote>
            <p className="mt-6 font-mono text-[10.5px] tracking-[0.1em] uppercase">
              {quotes[1].name} <span className="text-[#0a0a0a]/40">/ {quotes[1].role}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-b-2 border-[#0a0a0a]">
        <div className="grid grid-cols-3 border-b-2 border-[#0a0a0a] bg-[#0a0a0a] font-mono text-[9.5px] font-bold tracking-[0.14em] text-[#f2f2ee] uppercase">
          <span className="px-3 py-2.5 md:px-6">capability</span>
          <span className="border-l border-[#f2f2ee]/20 px-3 py-2.5 md:px-6">others</span>
          <span className="border-l border-[#f2f2ee]/20 bg-[#d8ff3e] px-3 py-2.5 text-[#0a0a0a] md:px-6">cortex</span>
        </div>
        {[
          ["Finds a note you forgot", "keyword luck", "semantic + links"],
          ["Answers a question", "a list of files", "a cited sentence"],
          ["Works on a plane", "sometimes", "always"],
          ["Exports your brain", "pdf-ish", "plain markdown"],
          ["Trains on your notes", "often", "never"],
        ].map(([cap, them, us], i) => (
          <div
            key={cap}
            className={`grid grid-cols-3 items-center border-b border-[#0a0a0a]/15 text-[12px] last:border-0 md:text-[13px] ${
              i % 2 ? "bg-[#eaeae4]" : ""
            }`}
          >
            <span className="px-3 py-3 font-bold md:px-6">{cap}</span>
            <span className="border-l border-[#0a0a0a]/15 px-3 py-3 text-[#0a0a0a]/50 md:px-6">{them}</span>
            <span className="border-l border-[#0a0a0a]/15 bg-[#d8ff3e]/35 px-3 py-3 font-black uppercase md:px-6">{us}</span>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section id="start" className="scroll-mt-20 bg-[#0a0a0a] px-4 py-16 text-[#f2f2ee] md:px-8 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <p className="font-mono text-[9.5px] tracking-[0.18em] text-[#d8ff3e] uppercase">
            Last call
          </p>
          <h2 className="mt-5 text-[clamp(2.2rem,7vw,5.2rem)] leading-[0.86] font-black tracking-[-0.055em] uppercase">
            Stop writing
            <br />
            things down.
            <br />
            <span className="text-[#d8ff3e]">Start writing them in.</span>
          </h2>

          <div className="mt-10 border-t-2 border-[#f2f2ee]/25 pt-8">
            <p className="font-mono text-[9.5px] tracking-[0.16em] text-[#f2f2ee]/45 uppercase">
              your email
            </p>
            <EmailCapture
              className="mt-2 grid gap-4 md:grid-cols-[1fr_auto] md:items-end"
              inputClassName="w-full border-b-2 border-[#f2f2ee]/30 bg-transparent pb-2 text-[15px] font-bold tracking-[0.02em] uppercase placeholder:text-[#f2f2ee]/25 focus:border-[#d8ff3e] focus:outline-none"
              buttonClassName="bg-[#d8ff3e] px-7 py-4 text-[13px] font-black tracking-[0.04em] text-[#0a0a0a] uppercase transition hover:bg-[#f2f2ee]"
              buttonLabel="Claim your brain →"
              placeholder="YOU@WORK.COM"
              successClassName="border-b-2 border-[#d8ff3e] pb-2 text-[15px] font-black tracking-[0.02em] text-[#d8ff3e] uppercase"
              successMessage="✓ Done — check your inbox"
            />
          </div>
          <p className="mt-4 font-mono text-[9.5px] tracking-[0.08em] text-[#f2f2ee]/35 uppercase">
            free tier / 1,000 notes / no card / delete anytime
          </p>
        </div>
      </section>

      <footer id="faq" className="scroll-mt-20 bg-[#0a0a0a] text-[#f2f2ee]">
        <div className="mx-auto grid max-w-[1000px] gap-6 border-t border-[#f2f2ee]/15 px-4 py-8 text-[11px] font-bold tracking-[0.04em] uppercase md:grid-cols-4 md:px-8">
          {[
            ["Product", ["Overview", "Sync", "Mobile"]],
            ["Company", ["Manifesto", "Careers", "Press"]],
            ["Legal", ["Privacy", "Terms", "Security"]],
            ["Elsewhere", ["GitHub", "Mastodon", "RSS"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <p className="text-[#d8ff3e]/70">{title}</p>
              <ul className="mt-2.5 space-y-1.5 text-[#f2f2ee]/45">
                {(items as string[]).map((it) => (
                  <li key={it}>
                    <a className="transition hover:text-[#f2f2ee]" href="#start">{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-[1000px] px-4 pb-8 font-mono text-[9.5px] tracking-[0.1em] text-[#f2f2ee]/25 uppercase md:px-8">
          © 2026 cortex labs — built loud
        </div>
      </footer>

      <div className="h-20" />
    </div>
  );
}
