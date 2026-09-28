import type { ReactNode } from "react";
import { Icon, type IconName } from "@/variants/without-design-skill/sonnet-5.5/source/app/_components/icons";
import { GardenDemo } from "./_components/garden-demo";
import { Plant } from "./_components/plant";

const seasons: { verb: string; body: string; tone: string; visual: ReactNode }[] = [
  { verb: "Plant", body: "Capture a rough thought the second it shows up. Type it, clip it, say it out loud.", tone: "bg-[color:#f4e3a1]", visual: <Plant stage={0} className="size-16" /> },
  { verb: "Tend", body: "Link it to its neighbours, rewrite it, let it change. Each visit makes it stronger.", tone: "bg-[color:#f4c3b9]", visual: <Plant stage={1} className="size-16" /> },
  { verb: "Prune", body: "Merge duplicates and archive what's gone stale, so the garden stays a joy to walk through.", tone: "bg-[color:#dfe8d2]", visual: <span className="grid size-16 place-items-center text-[color:#1f3a2b]"><Icon name="scissors" className="size-9" strokeWidth={1.4} /></span> },
  { verb: "Harvest", body: "Publish it, export it, or ask a question and pick the best ideas from a whole season of notes.", tone: "bg-[#f0d4b8]", visual: <span className="grid size-16 place-items-center text-[color:#c8623b]"><Icon name="sun" className="size-9" strokeWidth={1.4} /></span> },
];

const growth: { icon: IconName; title: string; body: string; tone: string }[] = [
  { icon: "graph", title: "Bird's-eye view", body: "Zoom out to see clusters, clearings and the paths you keep walking.", tone: "bg-[color:#f4e3a1]" },
  { icon: "sparkle", title: "Ask the gardener", body: "Ask a question and get an answer built only from your own notes, with every source cited.", tone: "bg-[color:#f4c3b9]" },
  { icon: "refresh", title: "Every morning", body: "A gentle digest of notes that haven't seen the sun in a while.", tone: "bg-[color:#dfe8d2]" },
  { icon: "lock", title: "Fenced in", body: "Local-first and end-to-end encrypted. Only you hold the key to the gate.", tone: "bg-[#f0d4b8]" },
];

const voices = [
  { q: "It stopped feeling like a filing cabinet and started feeling like somewhere I actually want to spend time.", n: "Odette Marchetti", r: "Illustrator", tone: "bg-[color:#f4e3a1]" },
  { q: "I published my garden last month. Strangers now find my rough notes and send me the nicest emails.", n: "Rahul Verma", r: "Indie developer", tone: "bg-[color:#f4c3b9]" },
  { q: "The morning digest is my favourite ritual. Old ideas come back at exactly the right moment.", n: "Signe Lindqvist", r: "Researcher", tone: "bg-[color:#dfe8d2]" },
];

const plans = [
  { name: "Seed", price: "$0", note: "free forever", stage: 0 as const, features: ["One garden, unlimited notes", "Backlinks and graph", "Sync on two devices"], cta: "Start planting", featured: false },
  { name: "Grove", price: "$8", note: "per month, billed yearly", stage: 1 as const, features: ["Everything in Seed", "Ask the gardener", "Publish to the web", "Unlimited gardens and devices"], cta: "Try Grove free for 30 days", featured: true },
  { name: "Orchard", price: "$14", note: "per person, per month", stage: 2 as const, features: ["Everything in Grove", "Shared gardens", "SSO and audit log"], cta: "Talk to us", featured: false },
];

const display = "font-[family-name:var(--f-fraunces),Georgia,serif] [font-variation-settings:'SOFT'_100,'WONK'_1]";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${display} text-[1.7rem] leading-none font-medium italic`}>
      <span className={`grid size-9 place-items-center rounded-full ${light ? "bg-[color:#dfe8d2] text-[color:#1f3a2b]" : "bg-[color:#1f3a2b] text-[color:#dfe8d2]"}`}>
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
          <path d="M12 21c-.5-4 .2-8 3.5-11.5C18 7 20 6.5 21 6.5c0 3.3-1 6-3.3 8.3C16 16.5 14 17.3 12.4 17.3" />
          <path d="M12 21c0-3-.8-5.8-3.2-8C6.900 11.400 5 11 3.500 11c0 2.500.8 4.700 2.500 6.300 1.600 1.500 3.500 2.300 6 3.700Z" />
        </svg>
      </span>
      engram
    </span>
  );
}

export default function Page() {
  return (
    <>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" aria-label="Engram home"><Logo /></a>
        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-[color:#1f3a2b]/10 bg-white/60 p-1 text-sm font-medium backdrop-blur md:flex">
          {[["The seasons", "#seasons"], ["What grows here", "#grows"], ["Publish", "#publish"], ["Pricing", "#pricing"]].map(([l, h]) => (
            <a key={l} href={h} className="rounded-full px-4 py-2 transition hover:bg-[color:#dfe8d2]">{l}</a>
          ))}
        </nav>
        <a href="#pricing" className="rounded-full bg-[color:#c8623b] px-5 py-2.5 text-sm font-medium text-white shadow-[0_6px_16px_-6px_rgba(200,98,59,0.7)] transition hover:bg-[color:#1f3a2b]">Start planting</a>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-10 pb-28 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
        <div aria-hidden className="absolute -top-10 -left-24 -z-10 size-96 rounded-full bg-[color:#f4e3a1]/70 blur-3xl" />
        <div aria-hidden className="absolute top-40 right-0 -z-10 size-96 rounded-full bg-[color:#f4c3b9]/60 blur-3xl" />

        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[color:#1f3a2b]/10 bg-white/70 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <span className="size-2 rounded-full bg-[color:#5f9b5d]" /> A second brain that grows with you
          </p>
          <h1 className={`${display} animate-rise mt-7 text-[clamp(3.4rem,8vw,7rem)] leading-[0.95] font-medium tracking-[-0.03em]`}>
            Let your ideas <em className="text-[color:#c8623b]">grow.</em>
          </h1>
          <p className="mt-8 max-w-lg text-xl leading-9 text-[color:#4c6656]">
            Engram is a second brain shaped like a garden. Plant rough thoughts,
            tend them over time, and watch them become your best work.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#pricing" className="inline-flex items-center gap-2.5 rounded-full bg-[color:#1f3a2b] px-8 py-4 font-medium text-[color:#eef2e4] shadow-[0_14px_30px_-12px_rgba(31,58,43,0.6)] transition hover:-translate-y-0.5 hover:bg-[color:#c8623b]">
              Start planting, it&rsquo;s free <Icon name="arrow" className="size-4" />
            </a>
            <a href="#publish" className="font-medium underline decoration-[color:#c8623b] decoration-2 underline-offset-[6px] transition hover:text-[color:#c8623b]">See a published garden</a>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-[color:#4c6656]">
            <span className="flex -space-x-2">
              <Plant stage={0} className="size-9 rounded-full bg-[color:#f4e3a1] ring-2 ring-[color:#eef2e4]" />
              <Plant stage={1} className="size-9 rounded-full bg-[color:#f4c3b9] ring-2 ring-[color:#eef2e4]" />
              <Plant stage={2} className="size-9 rounded-full bg-[color:#dfe8d2] ring-2 ring-[color:#eef2e4]" />
            </span>
            Over 40 million notes planted this year
          </div>
        </div>

        <GardenDemo />
      </section>

      {/* Seasons */}
      <section id="seasons" className="mx-auto max-w-7xl scroll-mt-6 px-6 pb-28">
        <div className="max-w-2xl">
          <p className="font-medium text-[color:#c8623b]">The four seasons of a note</p>
          <h2 className={`${display} mt-3 text-5xl leading-[1.02] font-medium tracking-[-0.02em] md:text-6xl`}>Every idea has a life cycle. Engram follows it.</h2>
        </div>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {seasons.map((s, i) => (
            <li key={s.verb} className={`flex flex-col rounded-[2rem] p-7 transition duration-300 hover:-translate-y-1.5 ${s.tone} ${i % 2 ? "lg:mt-10" : ""}`}>
              <span className="grid size-20 place-items-center rounded-full bg-white/60">{s.visual}</span>
              <p className="mt-8 font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-xs text-[color:#4c6656]">0{i + 1}</p>
              <h3 className={`${display} text-4xl font-medium`}>{s.verb}</h3>
              <p className="mt-3 leading-7 text-[color:#1f3a2b]/80">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* What grows here */}
      <section id="grows" className="mx-auto max-w-7xl scroll-mt-6 px-6 pb-28">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <article className="relative isolate flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[color:#1f3a2b] p-9 text-[color:#eef2e4] md:p-12">
            <svg aria-hidden viewBox="0 0 400 300" className="absolute -right-10 bottom-0 -z-10 w-[85%] opacity-40 [mask-image:linear-gradient(to_top,black_35%,transparent_75%)]" fill="none" stroke="#9fd09b" strokeWidth="1.5" strokeLinecap="round">
              <path d="M200 300C200 230 150 200 100 160S40 80 60 20" />
              <path d="M200 300C210 240 260 210 300 170S360 90 340 30" />
              <path d="M200 300C195 250 210 190 200 130S180 50 190 0" />
              <path d="M150 218C110 210 70 220 30 250M262 214c30-10 60-8 100 10M200 180c-20-25-50-35-80-35M205 160c25-15 50-18 80-10" />
              {[[100, 160], [60, 20], [340, 30], [300, 170], [190, 0], [120, 145], [285, 150]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="5" fill="#dfe8d2" stroke="none" />
              ))}
            </svg>
            <div>
              <span className="grid size-12 place-items-center rounded-full bg-[color:#dfe8d2]/15"><Icon name="link" className="size-6" /></span>
              <h3 className={`${display} mt-8 max-w-sm text-4xl leading-[1.05] font-medium md:text-5xl`}>Wild links, growing underground.</h3>
              <p className="mt-5 max-w-sm leading-7 text-[color:#eef2e4]/80">
                Type [[ to link any two notes. Engram maps the roots for you, showing
                every place an idea is mentioned and suggesting connections you
                haven&rsquo;t made yet.
              </p>
            </div>
            <ul className="mt-14 flex flex-wrap gap-2 text-sm">
              {["Backlinks", "Suggested links", "Transclusion", "Unlinked mentions"].map((t) => (
                <li key={t} className="rounded-full border border-[color:#dfe8d2]/25 px-4 py-1.5">{t}</li>
              ))}
            </ul>
          </article>

          <div className="grid gap-5 sm:grid-cols-2">
            {growth.map((g) => (
              <article key={g.title} className={`flex flex-col rounded-[2rem] p-7 ${g.tone}`}>
                <span className="grid size-12 place-items-center rounded-full bg-white/60"><Icon name={g.icon} className="size-6" /></span>
                <h3 className={`${display} mt-8 text-2xl leading-tight font-medium`}>{g.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:#1f3a2b]/80">{g.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Publish */}
      <section id="publish" className="mx-auto grid max-w-7xl scroll-mt-6 items-center gap-14 px-6 pb-28 lg:grid-cols-2">
        <div>
          <p className="font-medium text-[color:#c8623b]">Publish your garden</p>
          <h2 className={`${display} mt-3 text-5xl leading-[1.02] font-medium tracking-[-0.02em] md:text-6xl`}>Open the gate when you&rsquo;re ready.</h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-[color:#4c6656]">
            Turn any evergreen note into a page on the web with one click.
            Backlinks, growth stages and all. Private notes stay behind the fence.
          </p>
          <ul className="mt-8 space-y-3">
            {["One-click publishing, on your own domain", "Readers can follow links between your notes", "Unpublish any time. It's your garden."].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-[color:#5f9b5d] text-white"><Icon name="check" className="size-3.5" strokeWidth={3} /></span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute -inset-4 -z-10 rotate-2 rounded-[2.5rem] bg-[color:#f4c3b9]/60" />
          <div className="overflow-hidden rounded-3xl border border-[color:#1f3a2b]/10 bg-white shadow-[0_30px_60px_-30px_rgba(31,58,43,0.4)]">
            <div className="flex items-center gap-3 border-b border-[color:#1f3a2b]/10 bg-[color:#eef2e4] px-4 py-3">
              <span className="flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-[color:#1f3a2b]/20" /><i className="size-2.5 rounded-full bg-[color:#1f3a2b]/20" /><i className="size-2.5 rounded-full bg-[color:#1f3a2b]/20" /></span>
              <span className="mx-auto flex items-center gap-1.5 rounded-full bg-white px-4 py-1 text-xs text-[color:#4c6656]"><Icon name="lock" className="size-3" /> garden.odette.me/on-slow-ideas</span>
            </div>
            <div className="p-8 sm:p-10">
              <p className="flex items-center gap-2 text-xs font-medium"><span className="rounded-full bg-[color:#dfe8d2] px-2.5 py-1">Evergreen</span><span className="text-[color:#4c6656]">Planted Mar 2024 · Tended 31 times</span></p>
              <h3 className={`${display} mt-5 text-4xl leading-tight font-medium`}>On slow ideas</h3>
              <p className="mt-4 leading-8 text-[color:#1f3a2b]/85">
                The best ideas I&rsquo;ve had arrived years apart. Rereading my{" "}
                <span className="rounded-md bg-[color:#f4e3a1] px-1.5">commonplace books</span> I saw that two of them were the same idea in different clothes.
              </p>
              <p className="mt-6 text-xs font-medium tracking-wide text-[color:#4c6656] uppercase">Linked from</p>
              <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                {["Why I journal", "Essay: patience", "Reading list"].map((t) => <li key={t} className="rounded-full border border-[color:#1f3a2b]/15 px-3 py-1">{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <h2 className={`${display} max-w-2xl text-5xl leading-[1.02] font-medium tracking-[-0.02em] md:text-6xl`}>Tended by people who care about their thinking.</h2>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {voices.map((v, i) => (
            <figure key={v.n} className={`flex flex-col rounded-[2rem] p-8 ${v.tone} ${i === 1 ? "md:mt-8" : ""}`}>
              <blockquote className={`${display} flex-1 text-2xl leading-snug italic`}>&ldquo;{v.q}&rdquo;</blockquote>
              <figcaption className="mt-8 text-sm"><span className="block font-medium">{v.n}</span><span className="text-[color:#4c6656]">{v.r}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl scroll-mt-6 px-6 pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-medium text-[color:#c8623b]">Pricing</p>
          <h2 className={`${display} mt-3 text-5xl leading-[1.02] font-medium tracking-[-0.02em] md:text-6xl`}>Start with a seed. Grow when you&rsquo;re ready.</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {plans.map((p) => (
            <article key={p.name} className={`relative flex flex-col rounded-[2.5rem] p-9 ${p.featured ? "bg-[color:#1f3a2b] text-[color:#eef2e4] shadow-[0_30px_60px_-24px_rgba(31,58,43,0.6)]" : "border border-[color:#1f3a2b]/10 bg-white/70 backdrop-blur"}`}>
              {p.featured && <span className="absolute top-7 right-7 rounded-full bg-[color:#f4e3a1] px-3 py-1 text-xs font-medium text-[color:#1f3a2b]">Most loved</span>}
              <span className={`grid size-16 place-items-center rounded-full ${p.featured ? "bg-[color:#dfe8d2]/15" : "bg-[color:#dfe8d2]"}`}><Plant stage={p.stage} className="size-11" /></span>
              <h3 className={`${display} mt-6 text-3xl font-medium`}>{p.name}</h3>
              <p className="mt-2 flex items-baseline gap-2"><span className={`${display} text-6xl leading-none font-medium`}>{p.price}</span><span className={`text-sm ${p.featured ? "text-[color:#eef2e4]/70" : "text-[color:#4c6656]"}`}>{p.note}</span></p>
              <ul className="mt-8 flex-1 space-y-3 text-[15px]">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3"><Icon name="check" className={`mt-0.5 size-4 shrink-0 ${p.featured ? "text-[color:#f4e3a1]" : "text-[color:#5f9b5d]"}`} strokeWidth={2.6} />{f}</li>
                ))}
              </ul>
              <a href="#" className={`mt-9 rounded-full px-6 py-3.5 text-center font-medium transition ${p.featured ? "bg-[color:#f4e3a1] text-[color:#1f3a2b] hover:bg-white" : "bg-[color:#1f3a2b] text-[color:#eef2e4] hover:bg-[color:#c8623b]"}`}>{p.cta}</a>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative isolate overflow-hidden rounded-[3rem] bg-[color:#c8623b] px-8 py-24 text-center text-white">
          <div aria-hidden className="absolute -top-20 -left-16 -z-10 size-72 rounded-full bg-[#dd7d55]" />
          <div aria-hidden className="absolute -right-10 -bottom-24 -z-10 size-80 rounded-full bg-[#b5502c]" />
          <div aria-hidden className="absolute top-10 right-[18%] -z-10 size-24 rounded-full bg-[color:#f4e3a1]/80" />
          <h2 className={`${display} mx-auto max-w-3xl text-5xl leading-[1] font-medium tracking-[-0.02em] md:text-7xl`}>Plant your first thought today.</h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-white/85">It takes about a minute. Your future self will thank you.</p>
          <a href="#pricing" className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-[color:#1f3a2b] px-8 py-4 font-medium text-[color:#eef2e4] transition hover:-translate-y-0.5 hover:bg-white hover:text-[color:#1f3a2b]">
            Start planting, it&rsquo;s free <Icon name="arrow" className="size-4" />
          </a>
        </div>
      </section>

      <footer className="pb-28">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-8 text-sm text-[color:#4c6656]">
          <Logo />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
            {["Changelog", "Security", "Field notes", "Privacy"].map((l) => <a key={l} href="#" className="transition hover:text-[color:#1f3a2b]">{l}</a>)}
          </nav>
          <span>© 2026 Engram Labs. Grown with care.</span>
        </div>
      </footer>
    </>
  );
}
