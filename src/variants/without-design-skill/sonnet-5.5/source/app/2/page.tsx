import { Icon, type IconName } from "@/variants/without-design-skill/sonnet-5.5/source/app/_components/icons";
import { NeuralGraph } from "./_components/neural-graph";
import { WaitlistForm } from "./_components/waitlist-form";

const steps: { n: string; tag: string; title: string; body: string }[] = [
  {
    n: "01",
    tag: "capture",
    title: "Everything lands as a node.",
    body: "Type it, clip it, say it, forward it. Every thought becomes a note in under two seconds, with no folder to choose.",
  },
  {
    n: "02",
    tag: "connect",
    title: "Edges appear on their own.",
    body: "Link with [[double brackets]] or let Engram propose connections by meaning. Your graph grows while you work.",
  },
  {
    n: "03",
    tag: "recall",
    title: "Activation spreads to what matters.",
    body: "Search one idea and the notes around it light up. Ask a question and get an answer that cites your own writing.",
  },
];

const features: { icon: IconName; title: string; body: string }[] = [
  { icon: "link", title: "Bidirectional links", body: "Every link works both ways. Open any note and see everything that points back to it." },
  { icon: "graph", title: "Living graph", body: "A live map of your notes that you can fly through, filter, and rearrange. It stays smooth at 100k nodes." },
  { icon: "search", title: "Semantic search", body: "Find notes by what they mean. Typos, synonyms and half-remembered phrases all work." },
  { icon: "refresh", title: "Daily resurfacing", body: "Forgotten notes return on a spaced schedule, so old ideas meet new problems." },
  { icon: "lock", title: "Private by default", body: "Local-first storage with end-to-end encrypted sync. We can't read your notes, even if we wanted to." },
  { icon: "file", title: "Plain Markdown", body: "Your vault is a folder of .md files. Open it in any editor, back it up anywhere, leave any time." },
];

const sources = [
  ["Pricing v2", "Mar 12"],
  ["Call with Jo", "Mar 14"],
  ["Support load model", "Mar 19"],
];

function Mark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M6 7.5 17 6m-11 1.5L9.5 18M17 6l-7.5 12" stroke="#8b7bff" strokeWidth="1.4" />
      <circle cx="6" cy="7.5" r="2.4" fill="#5ef0ff" />
      <circle cx="17" cy="6" r="2.4" fill="#ff6ec7" />
      <circle cx="9.5" cy="18" r="2.4" fill="#8b7bff" />
    </svg>
  );
}

function CaptureVisual() {
  return (
    <div className="flex flex-wrap gap-2 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-[11px]">
      {[
        ["mail", "email-in"],
        ["globe", "web clip"],
        ["mic", "voice"],
        ["bolt", "⌥ space"],
      ].map(([icon, label]) => (
        <span key={label} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[color:#8a90a8]">
          <Icon name={icon as IconName} className="size-3.5 text-[color:#5ef0ff]" /> {label}
        </span>
      ))}
    </div>
  );
}

function ConnectVisual() {
  return (
    <svg viewBox="0 0 240 70" className="h-[70px] w-full" fill="none" aria-hidden>
      <path d="M30 35C80 5 120 65 170 35S210 25 214 35" stroke="#8b7bff" strokeWidth="1.5" strokeDasharray="4 5" className="animate-dash" />
      <circle cx="30" cy="35" r="7" fill="#5ef0ff" />
      <circle cx="120" cy="38" r="5" fill="#8b7bff" />
      <circle cx="214" cy="35" r="7" fill="#ff6ec7" />
      <circle cx="30" cy="35" r="14" stroke="#5ef0ff" strokeOpacity=".3" />
      <circle cx="214" cy="35" r="14" stroke="#ff6ec7" strokeOpacity=".3" />
    </svg>
  );
}

function RecallVisual() {
  return (
    <div className="space-y-1.5 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-[11px]">
      <div className="flex items-center gap-2 rounded-lg border border-[color:#5ef0ff]/30 bg-[color:#5ef0ff]/5 px-3 py-2 text-[color:#5ef0ff]">
        <Icon name="search" className="size-3.5" /> compounding
      </div>
      {[
        ["Compounding habits", "98%"],
        ["Interest, but for ideas", "91%"],
        ["Book: Atomic Habits", "84%"],
      ].map(([t, s]) => (
        <div key={t} className="flex items-center justify-between rounded-lg px-3 py-1.5 text-[color:#8a90a8]">
          <span>{t}</span>
          <span className="text-[color:#8b7bff]">{s}</span>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[color:#05060a]/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2.5 font-[family-name:var(--f-sora),var(--font-geist-sans),sans-serif] text-lg font-semibold tracking-tight">
            <Mark /> engram
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-xs tracking-wide text-[color:#8a90a8] uppercase md:flex">
            <a href="#how" className="transition hover:text-white">How it thinks</a>
            <a href="#ask" className="transition hover:text-white">Ask</a>
            <a href="#features" className="transition hover:text-white">Features</a>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <a href="#" className="hidden text-[color:#8a90a8] transition hover:text-white sm:block">Sign in</a>
            <a href="#join" className="rounded-full border border-[color:#5ef0ff]/50 px-4 py-2 font-medium text-[color:#5ef0ff] transition hover:bg-[color:#5ef0ff] hover:text-[color:#05060a]">
              Get early access
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
        <NeuralGraph className="absolute inset-0 -z-20 size-full" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_48%,var(--color-void)_0%,rgba(5,6,10,0.85)_45%,transparent_100%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[color:#05060a] to-transparent" />

        <div className="pointer-events-none relative mx-auto w-full max-w-4xl px-6 pt-24 text-center">
          <p className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-[11px] tracking-wide text-[color:#8a90a8] uppercase backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-[color:#5ef0ff] shadow-[0_0_8px_var(--color-neon)]" />
            New · Ask your brain, now with citations
          </p>
          <h1 className="animate-rise font-[family-name:var(--f-sora),var(--font-geist-sans),sans-serif] text-[clamp(2.7rem,7.4vw,6.2rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
            Your notes,
            <br />
            <span className="bg-gradient-to-r from-[color:#5ef0ff] via-[color:#8b7bff] to-[color:#ff6ec7] bg-clip-text text-transparent">
              wired like a brain.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-[color:#8a90a8]">
            Engram is a second brain that links what you write, remembers what you
            forget, and answers in your own words.
          </p>
          <div className="pointer-events-auto mt-10">
            <WaitlistForm id="email-hero" />
            <p className="mt-4 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-[11px] tracking-wide text-[color:#8a90a8]/80 uppercase">
              Free for one vault · No credit card
            </p>
          </div>
        </div>

        <p className="pointer-events-none absolute inset-x-0 bottom-20 text-center font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-[11px] tracking-wide text-[color:#8a90a8]/70 uppercase">
          Move your cursor · every dot is a note
        </p>
      </section>

      {/* How it thinks */}
      <section id="how" className="mx-auto max-w-7xl scroll-mt-16 px-6 py-28">
        <p className="font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-xs tracking-wide text-[color:#5ef0ff] uppercase">{"// how it thinks"}</p>
        <h2 className="mt-4 max-w-2xl font-[family-name:var(--f-sora),var(--font-geist-sans),sans-serif] text-4xl font-semibold tracking-tight md:text-5xl">
          Three moves. Zero maintenance.
        </h2>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <article key={s.n} className="group relative flex flex-col rounded-2xl border border-white/10 bg-[color:#0b0d15] p-7 transition hover:border-[color:#8b7bff]/50">
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(400px_circle_at_50%_0%,rgba(139,123,255,0.14),transparent_70%)] opacity-0 transition group-hover:opacity-100" />
              <p className="relative font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-xs text-[color:#8a90a8]">
                <span className="text-[color:#5ef0ff]">{s.n}</span> / {s.tag}
              </p>
              <h3 className="relative mt-6 font-[family-name:var(--f-sora),var(--font-geist-sans),sans-serif] text-2xl leading-tight font-semibold tracking-tight">{s.title}</h3>
              <p className="relative mt-3 flex-1 text-sm leading-6 text-[color:#8a90a8]">{s.body}</p>
              <div className="relative mt-8 border-t border-white/5 pt-6">
                {i === 0 ? <CaptureVisual /> : i === 1 ? <ConnectVisual /> : <RecallVisual />}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Ask */}
      <section id="ask" className="relative scroll-mt-16 overflow-hidden border-y border-white/5 bg-[color:#0b0d15]/60">
        <div aria-hidden className="absolute -top-40 right-0 -z-0 size-[520px] rounded-full bg-[color:#8b7bff]/15 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 lg:grid-cols-2">
          <div>
            <p className="font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-xs tracking-wide text-[color:#5ef0ff] uppercase">{"// ask your brain"}</p>
            <h2 className="mt-4 font-[family-name:var(--f-sora),var(--font-geist-sans),sans-serif] text-4xl font-semibold tracking-tight md:text-5xl">
              Ask a question. Your own notes answer.
            </h2>
            <p className="mt-6 max-w-md leading-7 text-[color:#8a90a8]">
              No hallucinated sources and no guessing. Every answer is built from
              your writing and links back to the notes it came from.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {["Answers cite the exact notes used", "Runs on-device for private vaults", "Works across years of notes, not just today's"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid size-5 place-items-center rounded-full bg-[color:#5ef0ff]/15 text-[color:#5ef0ff]"><Icon name="check" className="size-3" strokeWidth={2.4} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[color:#05060a] shadow-[0_30px_80px_-20px_rgba(139,123,255,0.35)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-[11px] text-[color:#8a90a8]">ask.engram</span>
            </div>
            <div className="space-y-5 p-6">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[color:#8b7bff]/25 px-4 py-3 text-sm">
                What did I decide about pricing in March?
              </div>
              <div className="animate-rise [animation-delay:600ms]">
                <p className="mb-2 flex items-center gap-2 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-[11px] text-[color:#5ef0ff] uppercase">
                  <Icon name="sparkle" className="size-3.5" /> engram
                </p>
                <p className="text-sm leading-7 text-[#cdd1e2]">
                  You settled on <span className="text-white">$8/month for Pro</span> with a free single-vault tier.
                  The main worry was support load, so annual billing became the
                  default and refunds moved to 30 days.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-[11px]">
                  {sources.map(([t, d]) => (
                    <li key={t} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[color:#8a90a8]">
                      <Icon name="link" className="size-3 text-[color:#8b7bff]" /> {t}
                      <span className="text-white/30">· {d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-[color:#8a90a8]">
                Ask a follow-up…
                <span className="ml-auto font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-[11px]">↵</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-7xl gap-px px-6 py-20 sm:grid-cols-3">
        {[
          ["<50ms", "search across 100,000 notes"],
          ["100%", "local-first, works offline"],
          ["0", "lock-in. It's Markdown."],
        ].map(([n, l]) => (
          <div key={l} className="py-6 text-center">
            <p className="bg-gradient-to-b from-white to-[color:#8a90a8] bg-clip-text font-[family-name:var(--f-sora),var(--font-geist-sans),sans-serif] text-6xl font-semibold tracking-tight text-transparent">{n}</p>
            <p className="mt-2 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-xs tracking-wide text-[color:#8a90a8] uppercase">{l}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl scroll-mt-16 px-6 pb-28">
        <p className="font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-xs tracking-wide text-[color:#5ef0ff] uppercase">{"// under the hood"}</p>
        <h2 className="mt-4 max-w-2xl font-[family-name:var(--f-sora),var(--font-geist-sans),sans-serif] text-4xl font-semibold tracking-tight md:text-5xl">
          Built like a tool you&rsquo;ll keep for decades.
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article key={f.title} className="group bg-[color:#05060a] p-8 transition hover:bg-[color:#0b0d15]">
              <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[color:#5ef0ff] transition group-hover:border-[color:#5ef0ff]/40 group-hover:shadow-[0_0_24px_rgba(94,240,255,0.25)]">
                <Icon name={f.icon} />
              </span>
              <h3 className="mt-6 font-[family-name:var(--f-sora),var(--font-geist-sans),sans-serif] text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[color:#8a90a8]">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="relative isolate scroll-mt-16 overflow-hidden border-t border-white/5">
        <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(94,240,255,0.16),rgba(139,123,255,0.1)_40%,transparent_70%)]" />
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h2 className="font-[family-name:var(--f-sora),var(--font-geist-sans),sans-serif] text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
            Give your thoughts <span className="bg-gradient-to-r from-[color:#5ef0ff] to-[color:#ff6ec7] bg-clip-text text-transparent">somewhere to connect.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[color:#8a90a8]">Join 40,000 people building a second brain that actually remembers.</p>
          <div className="mt-10">
            <WaitlistForm id="email-cta" />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 pb-24">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-8 text-sm text-[color:#8a90a8]">
          <span className="flex items-center gap-2 font-[family-name:var(--f-sora),var(--font-geist-sans),sans-serif] font-semibold text-white"><Mark className="size-5" /> engram</span>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2 font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-xs uppercase">
            <a href="#" className="transition hover:text-white">Changelog</a>
            <a href="#" className="transition hover:text-white">Security</a>
            <a href="#" className="transition hover:text-white">Docs</a>
            <a href="#" className="transition hover:text-white">Privacy</a>
          </nav>
          <span className="font-[family-name:var(--f-jetbrains),ui-monospace,monospace] text-xs">© 2026 Engram Labs</span>
        </div>
      </footer>
    </>
  );
}
