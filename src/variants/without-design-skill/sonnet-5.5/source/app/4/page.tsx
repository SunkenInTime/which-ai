import { Icon, type IconName } from "@/variants/without-design-skill/sonnet-5.5/source/app/_components/icons";
import { StickyDesk } from "./_components/sticky-desk";

const btn =
  "inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-black px-7 py-3.5 text-base font-extrabold shadow-[5px_5px_0_#000] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-black";

const features: { icon: IconName; title: string; body: string; color: string; tilt: string }[] = [
  { icon: "inbox", title: "Catch everything", body: "Type it, clip it, say it, forward it. Two seconds, tops, and it lands in one inbox.", color: "bg-[color:#ffd23f]", tilt: "md:-rotate-1" },
  { icon: "link", title: "Links that link back", body: "Type [[ to link any note. Every note shows who's pointing at it. Zero setup.", color: "bg-[color:#ff8fb8]", tilt: "md:rotate-1" },
  { icon: "graph", title: "A map of your mind", body: "See every idea as a dot and every connection as a line. Yes, it's a little bit hypnotic.", color: "bg-[color:#6bc5ff]", tilt: "md:-rotate-1" },
  { icon: "sparkle", title: "Ask, don't dig", body: "Ask a question in plain English. Get an answer from your own notes, with receipts.", color: "bg-[color:#7ee2a8]", tilt: "md:rotate-1" },
  { icon: "refresh", title: "Ideas come back", body: "Forgotten notes pop up when they're useful. Like a friend who remembers everything.", color: "bg-[color:#c3a6ff]", tilt: "md:-rotate-1" },
  { icon: "file", title: "Yours. Forever.", body: "Plain Markdown files on your own device. Leave any day and take everything with you.", color: "bg-[color:#ff9b42]", tilt: "md:rotate-1" },
];

const steps = [
  ["Dump", "Get the thought out of your head and into Engram. Messy is fine. Messy is the point.", "bg-[color:#ffd23f]"],
  ["Link", "Connect it to anything related. Or don't. Engram suggests links you probably missed.", "bg-[color:#ff8fb8]"],
  ["Find", "Search, ask, or wait for it to resurface. It's there, right where you left it.", "bg-[color:#6bc5ff]"],
];

const love = [
  ["Finally, a notes app that doesn't make me organize things first.", "Jules", "bg-[color:#ffd23f]"],
  ["I asked it about a meeting from 8 months ago and it just… knew. Then cited itself. Wild.", "Dev", "bg-[color:#7ee2a8]"],
  ["The graph view is my new favorite way to procrastinate productively.", "Marisol", "bg-[color:#ff8fb8]"],
  ["Plain Markdown means I'm not scared of it going away. That's rare.", "Kwame", "bg-[color:#6bc5ff]"],
  ["Quick capture is so fast I now write down ideas in the middle of arguments.", "Ines", "bg-[color:#c3a6ff]"],
  ["My brain has an actual backup. My partner is thrilled.", "Theo", "bg-[color:#ff9b42]"],
];

const ticker = ["CAPTURE", "CONNECT", "REMEMBER", "REPEAT", "NO FOLDERS", "NO STRESS"];

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 1l2.7 7.3L22 11l-7.3 2.7L12 21l-2.7-7.3L2 11l7.3-2.7z" fill="currentColor" stroke="#000" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      {/* Ticker */}
      <div className="overflow-hidden border-b-4 border-black bg-black py-2 text-[color:#ffd23f]" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-xs font-bold whitespace-nowrap">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10">
              {Array.from({ length: 4 }).flatMap(() => ["FREE FOREVER FOR ONE VAULT", "NO CREDIT CARD", "200,000 BRAINS AND COUNTING"]).map((t, i) => (
                <span key={i}>✱ {t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="border-b-4 border-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="#" className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight">
            <span className="grid size-10 -rotate-6 place-items-center rounded-xl border-[3px] border-black bg-[color:#ffd23f] text-xl shadow-[3px_3px_0_#000]">E</span>
            engram
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-1 font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-sm font-bold md:flex">
            {[["Stuff it does", "#features"], ["How", "#how"], ["Love", "#love"], ["Pricing", "#pricing"]].map(([l, h]) => (
              <a key={l} href={h} className="rounded-full border-[3px] border-transparent px-4 py-1.5 transition hover:border-black hover:bg-white">{l}</a>
            ))}
          </nav>
          <a href="#pricing" className={`${btn} bg-[color:#ffd23f] !px-5 !py-2.5 !text-sm`}>Get Engram</a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 pt-14 pb-24 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        <div>
          <p className="inline-block -rotate-2 border-[3px] border-black bg-[color:#ff8fb8] px-4 py-1.5 font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-xs font-bold uppercase shadow-[4px_4px_0_#000]">
            the second brain ✱ but fun
          </p>
          <h1 className="mt-7 text-[clamp(3.2rem,8.2vw,7.4rem)] leading-[0.9] font-extrabold tracking-[-0.045em] [font-stretch:88%]">
            Your brain has{" "}
            <span className="inline-block -rotate-2 border-4 border-black bg-[color:#ffd23f] px-3 shadow-[6px_6px_0_#000]">too many tabs</span>{" "}
            open.
          </h1>
          <p className="mt-9 max-w-lg text-xl leading-8 font-medium">
            Engram is the second brain that holds the overflow: notes, links,
            half-baked ideas. Then it hands them back exactly when you need them.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#pricing" className={`${btn} bg-[color:#ffd23f]`}>Get Engram, it&rsquo;s free</a>
            <a href="#how" className={`${btn} bg-white`}>
              <span aria-hidden>▶</span> 60-second tour
            </a>
          </div>
          <p className="mt-6 font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-xs font-bold uppercase">Mac · Windows · iOS · Android · Web</p>
        </div>

        <StickyDesk />
      </section>

      {/* Marquee band */}
      <div aria-hidden className="-rotate-1 overflow-hidden border-y-4 border-black bg-[color:#ffd23f] py-4">
        <div className="flex w-max animate-marquee gap-8 text-4xl font-extrabold tracking-tight whitespace-nowrap uppercase md:text-5xl">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center gap-8">
              {Array.from({ length: 3 }).flatMap(() => ticker).map((t, i) => (
                <span key={i} className="flex items-center gap-8">{t} <Star className="size-9 text-white" /></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl scroll-mt-4 px-5 py-28">
        <p className="font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-sm font-bold uppercase">✱ stuff it does</p>
        <h2 className="mt-3 max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] md:text-7xl">
          Catch it. Link it. <span className="underline decoration-[color:#ff8fb8] decoration-[10px] underline-offset-[6px]">Find it.</span>
        </h2>
        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.title}
              className={`group relative rounded-3xl border-4 border-black p-7 shadow-[7px_7px_0_#000] transition hover:-translate-x-1 hover:-translate-y-1 hover:rotate-0 hover:shadow-[11px_11px_0_#000] ${f.color} ${f.tilt}`}
            >
              <span className="absolute -top-5 -left-3 grid size-12 -rotate-12 place-items-center rounded-full border-[3px] border-black bg-white font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-lg font-bold">{i + 1}</span>
              <span className="grid size-14 place-items-center rounded-2xl border-[3px] border-black bg-white"><Icon name={f.icon} className="size-7" strokeWidth={2.2} /></span>
              <h3 className="mt-6 text-3xl leading-none font-extrabold tracking-tight">{f.title}</h3>
              <p className="mt-3 text-lg leading-7 font-medium">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="scroll-mt-4 border-y-4 border-black bg-black text-[color:#fff6dc]">
        <div className="mx-auto max-w-7xl px-5 py-28">
          <p className="font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-sm font-bold text-[color:#ffd23f] uppercase">✱ how it works</p>
          <h2 className="mt-3 max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] md:text-7xl">
            It&rsquo;s basically <span className="text-[color:#ffd23f]">nothing</span>.
          </h2>
          <ol className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map(([t, b, c], i) => (
              <li key={t} className={`relative rounded-3xl border-4 border-[color:#fff6dc] p-8 text-black ${c}`}>
                <span className="block text-[9rem] leading-[0.8] font-extrabold tracking-tighter text-transparent [-webkit-text-stroke:4px_#000]">{i + 1}</span>
                <h3 className="mt-6 text-4xl font-extrabold tracking-tight">{t}</h3>
                <p className="mt-3 text-lg leading-7 font-medium">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Love */}
      <section id="love" className="mx-auto max-w-7xl scroll-mt-4 px-5 py-28">
        <p className="font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-sm font-bold uppercase">✱ the love wall</p>
        <h2 className="mt-3 max-w-3xl text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] md:text-7xl">People are being weird about it (nicely).</h2>
        <ul className="mt-16 grid gap-x-7 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {love.map(([q, n, c], i) => (
            <li key={n} className={`relative ${i % 2 ? "md:translate-y-4" : ""}`}>
              <figure className="relative rounded-3xl border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000]">
                <blockquote className="text-xl leading-snug font-semibold">&ldquo;{q}&rdquo;</blockquote>
                <span aria-hidden className="absolute -bottom-[14px] left-10 size-6 rotate-45 border-r-4 border-b-4 border-black bg-white" />
                <figcaption className={`absolute -bottom-9 left-6 -rotate-2 border-[3px] border-black px-3 py-0.5 font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-xs font-bold uppercase ${c}`}>{n}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-4 border-t-4 border-black bg-[color:#7ee2a8]">
        <div className="mx-auto max-w-5xl px-5 py-28">
          <h2 className="text-center text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] md:text-7xl">Cheap. Like, really.</h2>
          <div className="mt-16 grid gap-9 md:grid-cols-2">
            <article className="rounded-3xl border-4 border-black bg-white p-8 shadow-[9px_9px_0_#000]">
              <h3 className="text-3xl font-extrabold">Free-ish</h3>
              <p className="mt-4 flex items-baseline gap-2"><span className="text-8xl leading-none font-extrabold tracking-tighter">$0</span><span className="font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-sm font-bold uppercase">forever</span></p>
              <ul className="mt-8 space-y-3 text-lg font-medium">
                {["Unlimited notes", "One vault", "Backlinks + graph", "Sync on 2 devices"].map((f) => (
                  <li key={f} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full border-[3px] border-black bg-[color:#ffd23f]"><Icon name="check" className="size-3.5" strokeWidth={3.4} /></span>{f}</li>
                ))}
              </ul>
              <a href="#" className={`${btn} mt-10 w-full bg-white`}>Start free</a>
            </article>

            <article className="relative rounded-3xl border-4 border-black bg-[color:#ffd23f] p-8 shadow-[9px_9px_0_#000] md:-rotate-1">
              <span className="absolute -top-8 -right-2 grid size-24 md:-right-5 rotate-12 place-items-center rounded-full border-4 border-black bg-[color:#ff8fb8] text-center font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-[11px] leading-tight font-bold uppercase shadow-[4px_4px_0_#000]">Most<br />popular</span>
              <h3 className="text-3xl font-extrabold">Big Brain</h3>
              <p className="mt-4 flex items-baseline gap-2"><span className="text-8xl leading-none font-extrabold tracking-tighter">$8</span><span className="font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-sm font-bold uppercase">/ month, yearly</span></p>
              <ul className="mt-8 space-y-3 text-lg font-medium">
                {["Everything in Free-ish", "Ask Engram + citations", "Daily resurfacing", "Unlimited vaults + devices", "1 year of version history"].map((f) => (
                  <li key={f} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full border-[3px] border-black bg-white"><Icon name="check" className="size-3.5" strokeWidth={3.4} /></span>{f}</li>
                ))}
              </ul>
              <a href="#" className={`${btn} mt-10 w-full bg-black text-[color:#ffd23f]`}>Try it free for 30 days</a>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-y-4 border-black bg-[color:#ff8fb8]">
        <Star className="absolute top-10 left-[8%] size-14 rotate-12 text-[color:#ffd23f]" />
        <Star className="absolute right-[10%] bottom-12 size-20 -rotate-12 text-[color:#6bc5ff]" />
        <Star className="absolute top-16 right-[22%] hidden size-10 rotate-6 text-white md:block" />
        <div className="relative mx-auto max-w-4xl px-5 py-32 text-center">
          <h2 className="text-6xl leading-[0.9] font-extrabold tracking-[-0.045em] md:text-8xl">
            Empty your head.
            <br />
            We&rsquo;ll hold that.
          </h2>
          <a href="#pricing" className={`${btn} mt-12 bg-black text-[color:#ffd23f]`}>Get Engram, it&rsquo;s free →</a>
        </div>
      </section>

      <footer className="bg-black pb-28 text-[color:#fff6dc]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <span className="flex items-center gap-2.5 text-2xl font-extrabold"><span className="grid size-8 -rotate-6 place-items-center rounded-lg border-2 border-[color:#fff6dc] bg-[color:#ffd23f] text-base text-black">E</span>engram</span>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-2 font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-xs font-bold uppercase">
            {["Changelog", "Security", "Docs", "Privacy"].map((l) => <a key={l} href="#" className="hover:text-[color:#ffd23f] hover:underline">{l}</a>)}
          </nav>
          <span className="font-[family-name:var(--f-space-mono),ui-monospace,monospace] text-xs">© 2026 Engram Labs. Go write something down.</span>
        </div>
      </footer>
    </>
  );
}
