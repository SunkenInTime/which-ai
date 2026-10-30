import EmailCapture from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/email-capture";
import { features, quotes, stats } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/lib/content";
import { ArrowIcon, Mark } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/icons";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cortex — 5. Quiet Thread",
};


const thread = [
  { time: "07:40", kind: "capture", label: "Rode past the old studio. Remembered why we left." },
  { time: "09:15", kind: "link", label: "→ linked to “Lease renewal, spring” + 3 others" },
  { time: "11:02", kind: "capture", label: "Note to self: the pricing flat-fee idea keeps returning." },
  { time: "14:30", kind: "ask", label: "“What did I decide about pricing in March?” answered, 2 citations" },
  { time: "18:55", kind: "capture", label: "Quiet evening. Rewrote the opening paragraph." },
];

export default function QuietThread() {
  return (
    <div className="relative min-h-screen bg-[#fbfbf9] font-grotesk text-[#1f211e] selection:bg-[#dfe5d8] selection:text-[#1f211e]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(160,175,146,0.14),transparent_72%)]"
      />

      {/* Nav */}
      <header className="relative mx-auto flex max-w-[1080px] items-center justify-between px-6 py-7 md:px-10">
        <a href="#top" className="flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em]">
          <Mark className="size-[17px] text-[#7d8b70]" />
          Cortex
        </a>
        <nav className="hidden items-center gap-9 text-[12.5px] font-light text-[#6f736c] md:flex">
          <a className="transition hover:text-[#1f211e]" href="#thread">The thread</a>
          <a className="transition hover:text-[#1f211e]" href="#how">Method</a>
          <a className="transition hover:text-[#1f211e]" href="#letters">Letters</a>
        </nav>
        <a
          href="#begin"
          className="group flex items-center gap-1.5 text-[12.5px] font-light text-[#4d514a] transition hover:text-[#1f211e]"
        >
          Begin quietly
          <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.2} />
        </a>
      </header>

      <main className="relative">
        {/* Hero */}
        <section id="top" className="mx-auto max-w-[1080px] px-6 pt-16 pb-20 md:px-10 md:pt-28 md:pb-28">
          <p className="font-mono text-[10px] tracking-[0.24em] text-[#9aa193] uppercase">
            A place for the thoughts you don&apos;t want to lose
          </p>

          <h1 className="mt-9 max-w-[19ch] text-[clamp(2.4rem,5.4vw,4.05rem)] leading-[1.06] font-light tracking-[-0.032em]">
            Everything you noticed,
            <br />
            <span className="text-[#7d8b70] italic">still connected.</span>
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:gap-16">
            <p className="max-w-[46ch] text-[14.5px] leading-[1.78] font-light text-[#5b5f58]">
              Cortex keeps a quiet record of your thinking. It doesn&apos;t sort, score
              or gamify anything — it simply holds the thread between one note and
              the next, so a passing thought can find its way back to you years
              later.
            </p>
            <div className="md:pt-1">
              <a
                href="#begin"
                className="group inline-flex items-center gap-2 border-b border-[#1f211e]/25 pb-1 text-[13px] font-normal transition hover:border-[#1f211e]"
              >
                Start with one note
                <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.2} />
              </a>
              <p className="mt-3 text-[11.5px] leading-relaxed font-light text-[#9aa193]">
                Free for 1,000 notes. Yours as plain text, always.
              </p>
            </div>
          </div>

          {/* Thread visual — vertical on phones, a wavy thread on wider screens */}
          <div id="thread" className="relative mt-16 md:mt-24">
            <ol className="relative border-l border-[#d5d9cd] pl-5 md:hidden">
              {[
                "a walk, a sentence, someone's aside",
                "and the meeting it belonged to",
                "three years later, still here",
              ].map((t) => (
                <li key={t} className="relative py-3 text-[11.5px] leading-[1.6] font-light text-[#8b9184]">
                  <span className="absolute top-[1.15rem] -left-[1.4rem] size-1.5 rounded-full bg-[#fbfbf9] ring-1 ring-[#a9b89b]" />
                  {t}
                </li>
              ))}
            </ol>

            <svg
              viewBox="0 0 1000 300"
              preserveAspectRatio="none"
              className="hidden h-[clamp(180px,26vw,300px)] w-full md:block"
              aria-hidden
            >
              <defs>
                <linearGradient id="quietLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7d8b70" stopOpacity="0" />
                  <stop offset="18%" stopColor="#7d8b70" stopOpacity="0.55" />
                  <stop offset="82%" stopColor="#7d8b70" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#7d8b70" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 210 C 120 210, 150 92, 285 92 S 430 236, 560 236 S 700 106, 830 106 S 930 178, 1000 178"
                stroke="url(#quietLine)"
                strokeWidth="1.1"
                fill="none"
              />
              {[
                [285, 92],
                [560, 236],
                [830, 106],
              ].map(([cx, cy]) => (
                <g key={`${cx}`}>
                  <circle cx={cx} cy={cy} r="4" fill="#fbfbf9" stroke="#7d8b70" strokeWidth="1.1" />
                  <circle cx={cx} cy={cy} r="1.4" fill="#7d8b70" />
                </g>
              ))}
            </svg>

            <div className="pointer-events-none absolute inset-0 hidden md:block">
              <div className="absolute top-[8%] left-[10%] max-w-[38%] text-[11.5px] leading-[1.6] font-light text-[#8b9184]">
                a walk, a sentence,
                <br />
                someone&apos;s aside
              </div>
              <div className="absolute top-[62%] left-[40%] max-w-[30%] text-[11.5px] leading-[1.6] font-light text-[#8b9184]">
                and the meeting
                <br />
                it belonged to
              </div>
              <div className="absolute top-[6%] right-[4%] max-w-[26%] text-right text-[11.5px] leading-[1.6] font-light text-[#8b9184]">
                three years later,
                <br />
                still here
              </div>
            </div>
          </div>
        </section>

        {/* Soft stats */}
        <section className="border-y border-[#e4e6df] bg-[#f7f8f4]">
          <dl className="mx-auto grid max-w-[1080px] grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-4 md:px-10">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="text-[24px] leading-none font-light tracking-[-0.02em] tabular-nums">{s.value}</dd>
                <dt className="mt-2 max-w-[16ch] text-[11px] leading-snug font-light text-[#8b9184]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* Method */}
        <section id="how" className="mx-auto max-w-[1080px] px-6 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 md:grid-cols-[200px_minmax(0,1fr)] md:gap-20">
            <div className="md:sticky md:top-16 md:self-start">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#9aa193] uppercase">Method</p>
              <h2 className="mt-4 text-[19px] leading-[1.28] font-light tracking-[-0.015em]">
                Nothing shouts.
                <br />
                It just stays.
              </h2>
            </div>

            <div className="divide-y divide-[#e4e6df] border-t border-[#e4e6df]">
              {features.map((f) => (
                <article key={f.kicker} className="grid gap-3 py-9 first:pt-8 last:pb-0 md:grid-cols-[minmax(0,168px)_minmax(0,1fr)] md:gap-10">
                  <h3 className="text-[14.5px] leading-snug font-normal tracking-[-0.005em]">
                    <span className="mr-2.5 font-mono text-[10px] text-[#b3b9ac] tabular-nums">{f.kicker}</span>
                    {f.title}
                  </h3>
                  <p className="max-w-[52ch] text-[13.5px] leading-[1.8] font-light text-[#5b5f58]">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* A day in the archive */}
        <section className="border-y border-[#e4e6df] bg-[#f7f8f4]">
          <div className="mx-auto grid max-w-[1080px] gap-12 px-6 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:px-10 md:py-28">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#9aa193] uppercase">A day, quietly</p>
              <h2 className="mt-4 max-w-[24ch] text-[clamp(1.6rem,3vw,2.15rem)] leading-[1.18] font-light tracking-[-0.025em]">
                What it feels like to write here.
              </h2>
              <p className="mt-5 max-w-[44ch] text-[13.5px] leading-[1.8] font-light text-[#5b5f58]">
                No counts, no streaks, no notification to write. You open it when
                you have something, and it keeps the rest for later.
              </p>
            </div>

            <div className="rounded-xl border border-[#e4e6df] bg-[#fdfdfb] p-5 md:p-6">
              <div className="flex items-center justify-between border-b border-[#eceee8] pb-3">
                <span className="font-mono text-[9.5px] tracking-[0.14em] text-[#a8aea2] uppercase">
                  Tuesday, 29 October
                </span>
                <span className="size-1.5 rounded-full bg-[#a9b89b] [animation:gallery-without-design-skill-deepseek-v4-1-flash-source-app-globals-cortex-twinkle_4s_ease-in-out_infinite]" />
              </div>
              <ul className="mt-4 space-y-4">
                {thread.map((t) => (
                  <li key={t.time} className="flex gap-3.5">
                    <span className="w-9 shrink-0 pt-0.5 font-mono text-[9.5px] text-[#b3b9ac] tabular-nums">
                      {t.time}
                    </span>
                    <span
                      className={`text-[12.5px] leading-[1.6] font-light ${
                        t.kind === "link"
                          ? "text-[#8b9184]"
                          : t.kind === "ask"
                            ? "text-[#5f7a58]"
                            : "text-[#3f433d]"
                      }`}
                    >
                      {t.label}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2 border-t border-[#eceee8] pt-3 text-[11px] font-light text-[#b3b9ac]">
                <span className="h-px flex-1 bg-[#e4e6df]" />
                nothing else demanded your attention today
                <span className="h-px flex-1 bg-[#e4e6df]" />
              </div>
            </div>
          </div>
        </section>

        {/* Letters */}
        <section id="letters" className="mx-auto max-w-[1080px] px-6 py-24 md:px-10 md:py-32">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#9aa193] uppercase">Letters</p>
          <div className="mt-9 grid gap-y-14 md:grid-cols-3 md:gap-x-10">
            {quotes.map((q, i) => (
              <figure key={q.name} className={i === 1 ? "md:mt-14" : i === 2 ? "md:mt-28" : ""}>
                <blockquote className="text-[15px] leading-[1.72] font-light text-[#3f433d]">
                  “{q.body}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-2 text-[11px] font-light text-[#9aa193]">
                  <span className="h-px w-5 bg-[#d5d9cd]" />
                  {q.name}, {q.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Begin */}
        <section id="begin" className="relative overflow-hidden border-t border-[#e4e6df]">
          <div className="mx-auto max-w-[1080px] px-6 py-24 md:px-10 md:py-32">
            <div className="mx-auto max-w-[420px] text-center">
              <Mark className="mx-auto size-5 text-[#a9b89b]" />
              <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.4rem)] leading-[1.16] font-light tracking-[-0.03em]">
                One note is enough
                <br />
                to begin the thread.
              </h2>
              <EmailCapture
                className="mt-8 flex flex-col gap-2.5 sm:flex-row"
                inputClassName="w-full rounded-full border border-[#dcdfd5] bg-white/70 px-4 py-2.5 text-center text-[12.5px] font-light placeholder:text-[#b3b9ac] focus:border-[#a9b89b] focus:outline-none sm:text-left"
                buttonClassName="shrink-0 rounded-full bg-[#1f211e] px-5 py-2.5 text-[12.5px] font-light text-[#fbfbf9] transition hover:bg-[#3d4239]"
                buttonLabel="Begin"
                placeholder="your email"
                successClassName="mt-8 rounded-full border border-[#a9b89b]/40 bg-[#eef1e8] px-5 py-2.5 text-[12.5px] font-light text-[#5f7a58]"
                successMessage="A quiet start. We've sent a link."
              />
              <p className="mt-4 font-mono text-[9.5px] tracking-[0.1em] text-[#b3b9ac] uppercase">
                no card · no onboarding tour · no noise
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e4e6df]">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-4 px-6 py-8 text-[11px] font-light text-[#9aa193] md:flex-row md:items-center md:justify-between md:px-10">
          <span>Cortex — built to be forgotten about, in the good way.</span>
          <div className="flex gap-6">
            <a className="transition hover:text-[#1f211e]" href="#begin">Privacy</a>
            <a className="transition hover:text-[#1f211e]" href="#begin">Plain text</a>
            <a className="transition hover:text-[#1f211e]" href="#begin">Status</a>
          </div>
        </div>
      </footer>

      <div className="h-24" />
    </div>
  );
}
