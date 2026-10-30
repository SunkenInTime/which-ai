import EmailCapture from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/email-capture";
import { features, quotes, stats } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/lib/content";
import { ArrowIcon, CheckIcon, FeatureIcon, Mark } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/icons";
import { AppWindow } from "@/variants/without-design-skill/deepseek-v4-1-flash/source/components/app-window";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cortex — 3. Product First",
};


export default function ProductFirst() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#faf8f4] font-jakarta text-[#221e18]">
      {/* Announcement */}
      <div className="border-b border-[#eee9df] bg-[#221e18] px-4 py-2 text-center">
        <p className="font-mono text-[10.5px] tracking-[0.03em] text-[#f3efe5]/80">
          Cortex 4.2 is out — ask your notes anything, now with citations.{" "}
          <a href="#how" className="text-[#f3efe5] underline decoration-[#f3efe5]/30 underline-offset-2 hover:decoration-[#f3efe5]">
            Read the notes
          </a>
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#eee9df]/80 bg-[#faf8f4]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-3.5 md:px-8">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#221e18] text-[#faf8f4]">
              <Mark className="size-[15px]" />
            </span>
            <span className="text-[16px] font-semibold tracking-[-0.02em]">Cortex</span>
          </a>

          <nav className="hidden items-center gap-7 text-[13px] text-[#6b655a] md:flex">
            <a className="transition hover:text-[#221e18]" href="#features">Features</a>
            <a className="transition hover:text-[#221e18]" href="#how">How it works</a>
            <a className="transition hover:text-[#221e18]" href="#pricing">Pricing</a>
            <a className="transition hover:text-[#221e18]" href="#customers">Customers</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#pricing" className="hidden text-[13px] text-[#6b655a] transition hover:text-[#221e18] sm:block">
              Log in
            </a>
            <a
              href="#pricing"
              className="rounded-lg bg-[#221e18] px-3.5 py-2 text-[13px] font-medium text-[#faf8f4] transition hover:bg-[#c2643f]"
            >
              Download free
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative mx-auto max-w-[1120px] px-5 pt-14 pb-6 md:px-8 md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(194,100,63,0.10),transparent_70%)]"
        />
        <div className="mx-auto max-w-[720px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e6dfd0] bg-white py-1 pr-3 pl-1 shadow-sm">
            <span className="rounded-full bg-[#f6ece2] px-2 py-0.5 font-mono text-[9.5px] tracking-[0.08em] text-[#c2643f]">
              4.2
            </span>
            <span className="text-[12px] text-[#6b655a]">Now with citations on every answer</span>
          </div>

          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.15rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
            The notes app that
            <br />
            remembers{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">for you</span>
              <svg
                aria-hidden
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 z-0 h-3 w-full text-[#e9a888]"
              >
                <path d="M2 9c40-6 92-7 196-4" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          <p className="mx-auto mt-6 max-w-[52ch] text-[15.5px] leading-[1.7] text-[#6b655a]">
            Write the way you already do. Cortex links every note to the people,
            projects and decisions it mentions — then answers questions from your
            own archive, with the receipts.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <a
              href="#pricing"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#c2643f] px-5 py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(194,100,63,0.7)] transition hover:bg-[#ad5533] sm:w-auto"
            >
              Start free — 1,000 notes
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e2ddd3] bg-white px-5 py-3 text-[14px] font-medium text-[#4f4a41] transition hover:border-[#d3ccbe] hover:bg-[#fdfcfa] sm:w-auto"
            >
              Take the tour
            </a>
          </div>

          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[10.5px] text-[#a8a196]">
            <span className="flex items-center gap-1"><CheckIcon className="size-3 text-[#7d9a72]" /> macOS</span>
            <span className="flex items-center gap-1"><CheckIcon className="size-3 text-[#7d9a72]" /> Windows</span>
            <span className="flex items-center gap-1"><CheckIcon className="size-3 text-[#7d9a72]" /> iOS</span>
            <span className="flex items-center gap-1"><CheckIcon className="size-3 text-[#7d9a72]" /> Android</span>
            <span className="flex items-center gap-1"><CheckIcon className="size-3 text-[#7d9a72]" /> plain Markdown</span>
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-[980px] md:mt-16">
          <AppWindow />
          <div
            aria-hidden
            className="absolute -inset-x-6 -bottom-6 -z-10 h-24 rounded-[40px] bg-[radial-gradient(ellipse_at_center,rgba(34,30,24,0.14),transparent_70%)] blur-xl"
          />
        </div>

        {/* callout chips */}
        <div className="mx-auto mt-9 flex max-w-[860px] flex-wrap items-center justify-center gap-2">
          {[
            "links people automatically",
            "cites the exact line",
            "works offline",
            "exports to markdown",
            "no AI training on your data",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#e6dfd0] bg-white px-3 py-1.5 text-[11.5px] text-[#6b655a] shadow-[0_1px_2px_rgba(34,30,24,0.04)]"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-16 max-w-[1120px] px-5 md:px-8">
        <div className="grid grid-cols-2 gap-y-8 rounded-2xl border border-[#eee9df] bg-white px-6 py-8 md:grid-cols-4 md:px-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="text-[28px] leading-none font-semibold tracking-[-0.03em] tabular-nums">
                {s.value}
              </div>
              <div className="mt-1.5 text-[11.5px] leading-snug text-[#8b8478]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-28 mx-auto max-w-[1120px] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[560px] text-center">
          <p className="font-mono text-[10.5px] tracking-[0.16em] text-[#c2643f] uppercase">
            Why people stay
          </p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
            Four problems, quietly solved.
          </h2>
          <p className="mt-4 text-[14.5px] leading-[1.7] text-[#6b655a]">
            Nothing here is a gimmick. Each piece exists because a real archive
            stopped being useful without it.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <article
              key={f.kicker}
              className="group rounded-2xl border border-[#eee9df] bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[#dcd4c4] hover:shadow-[0_18px_40px_-24px_rgba(34,30,24,0.28)] md:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-[#f6ece2] text-[#c2643f]">
                  <FeatureIcon name={f.icon} className="size-[18px]" />
                </span>
                <span className="font-mono text-[10px] text-[#c2bbac]">{f.kicker} / 04</span>
              </div>
              <h3 className="mt-4 text-[16.5px] font-semibold tracking-[-0.015em]">{f.title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.7] text-[#6b655a]">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How it works — 3 steps */}
      <section id="how" className="scroll-mt-28 border-y border-[#eee9df] bg-white">
        <div className="mx-auto max-w-[1120px] px-5 py-24 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
            <div>
              <p className="font-mono text-[10.5px] tracking-[0.16em] text-[#c2643f] uppercase">
                How it works
              </p>
              <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.5rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
                Set up in a coffee break.
              </h2>
              <p className="mt-4 max-w-[42ch] text-[14.5px] leading-[1.7] text-[#6b655a]">
                Import what you already have, let Cortex index it, and get on with
                your day. No plugin ecosystem, no database to run.
              </p>
              <ol className="mt-8 space-y-5">
                {[
                  ["Import your archive", "Obsidian vault, Notion export, or a folder of .md files. Runs locally."],
                  ["Cortex builds the links", "Named entities, shared tags and semantic similarity become edges in your graph."],
                  ["Ask it anything", "Every answer quotes your notes and links back to the source line."],
                ].map(([title, body], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#e6dfd0] font-mono text-[11px] text-[#8b8478]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-[14px] font-semibold">{title}</h3>
                      <p className="mt-1 text-[13px] leading-[1.65] text-[#6b655a]">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-[#eee9df] bg-[#faf8f4] p-4 md:p-6">
              <div className="rounded-xl border border-[#e6dfd0] bg-white p-4 font-mono text-[11px] leading-[1.9]">
                <div className="flex items-center justify-between border-b border-[#f0ece3] pb-2 text-[9px] tracking-[0.1em] text-[#b0a897] uppercase">
                  <span>terminal</span>
                  <span className="text-[#7d9a72]">● importing</span>
                </div>
                <div className="mt-2 space-y-0.5">
                  <p className="text-[#8b8478]">
                    <span className="text-[#c2643f]">$</span> cortex import ~/vaults/main
                  </p>
                  <p className="text-[#6b655a]">→ 1,842 notes read</p>
                  <p className="text-[#6b655a]">→ 9,470 links discovered</p>
                  <p className="text-[#6b655a]">→ 214 people identified</p>
                  <p className="text-[#6b655a]">→ 38 collections built</p>
                  <p className="text-[#7d9a72]">✓ ready in 41s — nothing left your disk</p>
                  <p className="text-[#8b8478]">
                    <span className="text-[#c2643f]">$</span>{" "}
                    <span className="inline-block h-3 w-1.5 translate-y-0.5 bg-[#c2643f]/70 [animation:gallery-without-design-skill-deepseek-v4-1-flash-source-app-globals-cortex-twinkle_1.4s_steps(1,end)_infinite]" />
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  ["9,470", "links"],
                  ["214", "people"],
                  ["41s", "import"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-lg border border-[#e6dfd0] bg-white px-2.5 py-2 text-center">
                    <div className="text-[13px] font-semibold tabular-nums">{v}</div>
                    <div className="font-mono text-[8.5px] tracking-[0.1em] text-[#b0a897] uppercase">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="customers" className="scroll-mt-28 mx-auto max-w-[1120px] px-5 py-24 md:px-8 md:py-32">
        <h2 className="text-center text-[clamp(1.8rem,3.4vw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.035em]">
          People with a lot of thoughts.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="flex flex-col rounded-2xl border border-[#eee9df] bg-white p-6"
            >
              <blockquote className="flex-1 text-[13.5px] leading-[1.72] text-[#4f4a41]">
                “{q.body}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2.5 border-t border-[#f0ece3] pt-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-[#f6ece2] text-[11px] font-semibold text-[#c2643f]">
                  {q.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <span className="text-[11.5px] leading-tight">
                  <span className="block font-semibold">{q.name}</span>
                  <span className="block text-[#8b8478]">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-28 border-t border-[#eee9df] bg-white">
        <div className="mx-auto max-w-[1120px] px-5 py-24 md:px-8 md:py-28">
          <div className="mx-auto max-w-[520px] text-center">
            <h2 className="text-[clamp(1.8rem,3.4vw,2.5rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
              One price. Every platform.
            </h2>
            <p className="mt-3 text-[14px] text-[#6b655a]">
              No per-note billing — that would punish the exact behaviour we want
              you to keep doing.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-[820px] gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#eee9df] p-6 md:p-7">
              <h3 className="text-[14px] font-semibold">Free</h3>
              <p className="mt-1 text-[12px] text-[#8b8478]">For the first brain</p>
              <p className="mt-5 text-[34px] leading-none font-semibold tracking-[-0.03em]">
                $0
                <span className="ml-1 text-[12px] font-normal tracking-normal text-[#a8a196]">forever</span>
              </p>
              <ul className="mt-5 space-y-2 text-[12.5px] text-[#5d574d]">
                {["1,000 notes", "Local graph & backlinks", "Markdown export", "2 devices"].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-[#7d9a72]" />
                    {i}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-lg border border-[#e2ddd3] py-2.5 text-[13px] font-medium transition hover:bg-[#faf8f4]">
                Download free
              </button>
            </div>

            <div className="relative rounded-2xl border-2 border-[#221e18] bg-[#221e18] p-6 text-[#f3efe5] md:p-7">
              <span className="absolute -top-2.5 right-6 rounded-full bg-[#c2643f] px-2 py-0.5 font-mono text-[8.5px] tracking-[0.1em] uppercase">
                most picked
              </span>
              <h3 className="text-[14px] font-semibold">Pro</h3>
              <p className="mt-1 text-[12px] text-[#f3efe5]/55">For the working memory</p>
              <p className="mt-5 text-[34px] leading-none font-semibold tracking-[-0.03em]">
                $8
                <span className="ml-1 text-[12px] font-normal tracking-normal text-[#f3efe5]/50">/ month</span>
              </p>
              <ul className="mt-5 space-y-2 text-[12.5px] text-[#f3efe5]/85">
                {[
                  "Unlimited notes & history",
                  "Ask-your-archive with citations",
                  "Unlimited devices & sync",
                  "Shared brains (up to 5)",
                  "Priority support from humans",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-[#e9a888]" />
                    {i}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-lg bg-[#f3efe5] py-2.5 text-[13px] font-semibold text-[#221e18] transition hover:bg-white">
                Start 14-day trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#faf8f4]">
        <div className="mx-auto max-w-[1120px] px-5 py-24 md:px-8">
          <div className="overflow-hidden rounded-3xl border border-[#e6dfd0] bg-white px-6 py-14 text-center md:px-16">
            <h2 className="mx-auto max-w-[22ch] text-[clamp(1.8rem,3.6vw,2.7rem)] leading-[1.06] font-semibold tracking-[-0.04em]">
              Stop losing the good ideas to the folders.
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-[14px] leading-[1.7] text-[#6b655a]">
              Join 40,000 people whose notes now argue back, remind them of things,
              and occasionally finish a sentence.
            </p>
            <EmailCapture
              className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:flex-row"
              inputClassName="w-full rounded-lg border border-[#e2ddd3] px-4 py-2.5 text-[13.5px] placeholder:text-[#b8b0a2] focus:border-[#c2643f] focus:ring-2 focus:ring-[#c2643f]/15 focus:outline-none"
              buttonClassName="shrink-0 rounded-lg bg-[#c2643f] px-5 py-2.5 text-[13.5px] font-medium text-white transition hover:bg-[#ad5533]"
              buttonLabel="Get started"
              successClassName="mx-auto mt-7 max-w-md rounded-lg border border-[#c2643f]/25 bg-[#f6ece2] px-4 py-2.5 text-[13px] text-[#8a4526]"
              successMessage="Welcome aboard — we've sent your download link."
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#eee9df] bg-white">
        <div className="mx-auto max-w-[1120px] px-5 py-10 md:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="max-w-[26ch]">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-md bg-[#221e18] text-[#faf8f4]">
                  <Mark className="size-3" />
                </span>
                <span className="text-[14px] font-semibold tracking-[-0.02em]">Cortex</span>
              </div>
              <p className="mt-3 text-[11.5px] leading-relaxed text-[#8b8478]">
                Local-first. Encrypted. Yours to export, forever.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-[11.5px] sm:grid-cols-3">
              {[
                ["Product", ["Overview", "Sync", "Mobile", "Changelog"]],
                ["Company", ["About", "Manifesto", "Careers"]],
                ["Support", ["Docs", "Community", "Status"]],
              ].map(([title, items]) => (
                <div key={title as string}>
                  <p className="font-mono text-[9px] tracking-[0.14em] text-[#b8b0a2] uppercase">{title}</p>
                  <ul className="mt-2.5 space-y-1.5 text-[#6b655a]">
                    {(items as string[]).map((i) => (
                      <li key={i}>
                        <a className="transition hover:text-[#221e18]" href="#top">{i}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-[#f0ece3] pt-5 font-mono text-[10px] text-[#b8b0a2] sm:flex-row sm:justify-between">
            <span>© 2026 Cortex Labs Inc.</span>
            <div className="flex gap-5">
              <a className="hover:text-[#6b655a]" href="#top">Privacy</a>
              <a className="hover:text-[#6b655a]" href="#top">Terms</a>
              <a className="hover:text-[#6b655a]" href="#top">Security</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="h-24" />
    </div>
  );
}
