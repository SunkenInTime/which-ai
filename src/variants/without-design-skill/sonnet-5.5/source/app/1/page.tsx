const verbs = [
  {
    n: "01",
    title: "Capture",
    body: "A thought takes two seconds to catch. Hit ⌥Space anywhere on your machine, clip a page from the browser, forward an email, or talk to your phone. Everything lands in one inbox, ready to sort later, or never.",
    tags: ["Quick capture", "Web clipper", "Email-in", "Voice memos"],
  },
  {
    n: "02",
    title: "Connect",
    body: "Link notes by typing [[. Engram shows every place a note is mentioned and quietly suggests connections you haven't made yet. No folders to design, no tags to maintain.",
    tags: ["Backlinks", "Suggested links", "Graph view", "Transclusion"],
  },
  {
    n: "03",
    title: "Recall",
    body: "Search by meaning, not just keywords. Ask a question in plain language and get an answer with citations from your own notes. Each morning, a few forgotten ideas resurface on their own.",
    tags: ["Semantic search", "Ask your notes", "Daily resurfacing", "Timeline"],
  },
];

const margins = [
  ["Backlinks", "Every note knows who's talking about it.", "See each mention in context, without lifting a finger."],
  ["Graph view", "See the shape of what you know.", "Zoom out to find clusters, orphans and the ideas you keep returning to."],
  ["Ask your notes", "A question in, an answer out, with receipts.", "Every answer cites the notes it came from, so you can check the work."],
  ["Resurfacing", "Old ideas, back when they're useful.", "A small daily digest that spaces out what you'd otherwise forget."],
  ["Local-first", "Your notes live on your device, first.", "Fast offline, end-to-end encrypted sync, and no account needed to start."],
  ["Plain text", "Markdown files. Leave whenever you like.", "Open your vault in any editor. We don't hold your thinking hostage."],
];

const stats = [
  ["2.1s", "average time to capture a thought"],
  ["48ms", "to search 100,000 notes"],
  ["0", "proprietary file formats"],
  ["4.9", "average rating, 31,000 reviews"],
];

const freePlan = ["One vault, unlimited notes", "Backlinks and graph view", "Web clipper and quick capture", "Sync across two devices"];
const proPlan = ["Unlimited vaults and devices", "Ask your notes, with citations", "Daily resurfacing digest", "Version history, 1 year", "Priority support from humans"];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path d="M3 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-1 size-3.5 shrink-0 text-[color:#d4402a]" fill="none" aria-hidden>
      <path d="m3 8.5 3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Wikilink({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[color:#d4402a] underline decoration-[color:#d4402a]/40 decoration-1 underline-offset-4">
      [[{children}]]
    </span>
  );
}

export default function Page() {
  return (
    <>
      {/* Masthead */}
      <div className="border-b border-[color:#1b1a17]/15">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-[11px] tracking-wider text-[color:#6b665a] uppercase">
          <span>Nº 001 · A second brain for people who think in writing</span>
          <span className="hidden sm:block">Autumn 2026 edition</span>
        </div>
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="font-[family-name:var(--f-instrument),Georgia,serif] text-4xl leading-none italic">
          Engram<span className="text-[color:#d4402a]">.</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-9 text-sm md:flex">
          <a href="#method" className="hover:text-[color:#d4402a]">Method</a>
          <a href="#margins" className="hover:text-[color:#d4402a]">Features</a>
          <a href="#rates" className="hover:text-[color:#d4402a]">Rates</a>
        </nav>
        <div className="flex items-center gap-5 text-sm">
          <a href="#" className="hidden hover:text-[color:#d4402a] sm:block">Sign in</a>
          <a href="#rates" className="rounded-full border border-[color:#1b1a17] px-5 py-2 font-medium transition hover:bg-[color:#1b1a17] hover:text-[color:#f3eee4]">
            Get Engram
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-16 px-6 pt-10 pb-24 lg:grid-cols-12 lg:pt-16">
        <div className="lg:col-span-7">
          <p className="mb-8 flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-xs tracking-wider uppercase">
            <span className="h-px w-10 bg-[color:#1b1a17]" /> Introducing the second brain
          </p>
          <h1 className="animate-rise font-[family-name:var(--f-instrument),Georgia,serif] text-[clamp(3.6rem,9.5vw,8.4rem)] leading-[0.9] tracking-tight">
            Think it once.
            <br />
            <em className="text-[color:#d4402a]">Find it</em>{" "}
            <em className="bg-[linear-gradient(transparent_62%,var(--color-marker)_62%,var(--color-marker)_92%,transparent_92%)] px-1">
              forever.
            </em>
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-8 text-[color:#6b665a]">
            Engram is a home for your notes, reading and half-formed ideas.
            Write freely; it quietly links, remembers and resurfaces everything,
            so tomorrow&rsquo;s you never starts from zero.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#rates" className="group inline-flex items-center gap-3 rounded-full bg-[color:#1b1a17] px-7 py-4 text-sm font-medium text-[color:#f3eee4] transition hover:bg-[color:#d4402a]">
              Start writing — it&rsquo;s free
              <span className="transition group-hover:translate-x-1"><Arrow /></span>
            </a>
            <a href="#method" className="inline-flex items-center gap-2 border-b border-[color:#1b1a17] pb-0.5 text-sm font-medium hover:text-[color:#d4402a] hover:border-[color:#d4402a]">
              See how it works
            </a>
          </div>
          <p className="mt-6 text-xs text-[color:#6b665a]">
            Free for one vault, forever · macOS, Windows, iOS, Android &amp; web
          </p>
        </div>

        {/* The notebook page */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[440px] rotate-[1.4deg]">
            <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 -rotate-[2.5deg] rounded-sm bg-[color:#1b1a17]/10" />
            <article className="relative rounded-sm border border-[color:#d6cdb9] bg-[color:#fbf8f1] px-8 pt-7 pb-8 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
              <div className="mb-5 flex items-center justify-between font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-[11px] tracking-wider text-[color:#6b665a] uppercase">
                <span>Note · 28 Sep</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[color:#d4402a]" /> Synced
                </span>
              </div>
              <h2 className="font-[family-name:var(--f-instrument),Georgia,serif] text-4xl leading-none">On slow ideas</h2>
              <div
                className="mt-5 text-[15px] leading-8"
                style={{ backgroundImage: "repeating-linear-gradient(transparent 0 31px, #e6dfcd 31px 32px)" }}
              >
                <p>
                  The best ideas I&rsquo;ve had arrived years apart. Rereading my{" "}
                  <Wikilink>Commonplace books</Wikilink> I saw two of them were the
                  same idea, and <Wikilink>Slow reading</Wikilink> explained why.
                </p>
                <p>Write it down. Let it wait.</p>
              </div>
              <div className="mt-6 border-t border-dashed border-[color:#d6cdb9] pt-4">
                <p className="mb-2 font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-[11px] tracking-wider text-[color:#6b665a] uppercase">Linked from 3 notes</p>
                <ul className="flex flex-wrap gap-2 text-xs">
                  {["Reading list 2024", "Why I journal", "Essay: patience"].map((t) => (
                    <li key={t} className="rounded-full border border-[color:#d6cdb9] bg-[color:#f3eee4] px-3 py-1">{t}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
          <p className="mx-auto mt-10 flex max-w-[440px] items-start gap-3 font-[family-name:var(--f-instrument),Georgia,serif] text-2xl leading-tight text-[color:#d4402a] italic">
            <svg viewBox="0 0 48 40" className="mt-1 h-9 w-11 shrink-0" fill="none" aria-hidden>
              <path d="M5 36C8 20 20 10 40 6M40 6l-9-3m9 3-6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Engram noticed these two were related, before I did.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[color:#1b1a17]/15">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-[color:#1b1a17]/15 md:grid-cols-4 md:divide-x">
          {stats.map(([num, label]) => (
            <div key={label} className="px-6 py-10">
              <dt className="font-[family-name:var(--f-instrument),Georgia,serif] text-6xl leading-none">{num}</dt>
              <dd className="mt-3 max-w-[16ch] text-sm text-[color:#6b665a]">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Method */}
      <section id="method" className="mx-auto max-w-7xl scroll-mt-8 px-6 py-28">
        <p className="font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-xs tracking-wider text-[color:#d4402a] uppercase">§ 1 — The method</p>
        <h2 className="mt-4 max-w-3xl font-[family-name:var(--f-instrument),Georgia,serif] text-5xl leading-[1.02] md:text-7xl">
          Capture, connect, recall. <em className="text-[color:#6b665a]">Nothing else to manage.</em>
        </h2>
        <div className="mt-16 border-t border-[color:#1b1a17]">
          {verbs.map((v) => (
            <div key={v.n} className="grid gap-6 border-b border-[color:#d6cdb9] py-12 md:grid-cols-12 md:gap-10">
              <div className="font-[family-name:var(--f-instrument),Georgia,serif] text-7xl leading-none text-[color:#d4402a] italic md:col-span-2 md:text-8xl">{v.n}</div>
              <div className="md:col-span-6">
                <h3 className="font-[family-name:var(--f-instrument),Georgia,serif] text-5xl leading-none">{v.title}</h3>
                <p className="mt-5 max-w-xl leading-7 text-[color:#6b665a]">{v.body}</p>
              </div>
              <ul className="font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-xs tracking-wider uppercase md:col-span-4">
                {v.tags.map((t) => (
                  <li key={t} className="flex items-center justify-between border-b border-[color:#d6cdb9] py-3 first:pt-0">
                    {t} <span className="text-[color:#d4402a]">↗</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-[color:#1b1a17] text-[color:#f3eee4]">
        <figure className="mx-auto max-w-5xl px-6 py-28 text-center">
          <blockquote className="font-[family-name:var(--f-instrument),Georgia,serif] text-4xl leading-[1.12] italic md:text-6xl">
            &ldquo;It&rsquo;s the first tool that made me feel like my past self was{" "}
            <span className="text-[color:#f7dc6f]">on my team</span>.&rdquo;
          </blockquote>
          <figcaption className="mt-10 flex items-center justify-center gap-4 text-sm">
            <span className="grid size-11 place-items-center rounded-full bg-[color:#f3eee4] font-[family-name:var(--f-instrument),Georgia,serif] text-xl text-[color:#1b1a17]">ME</span>
            <span className="text-left">
              <span className="block font-medium">Maren Ellsworth</span>
              <span className="text-[color:#f3eee4]/60">Science writer, three books in</span>
            </span>
          </figcaption>
        </figure>
      </section>

      {/* Margins / features */}
      <section id="margins" className="mx-auto max-w-7xl scroll-mt-8 px-6 py-28">
        <p className="font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-xs tracking-wider text-[color:#d4402a] uppercase">§ 2 — In the margins</p>
        <h2 className="mt-4 max-w-3xl font-[family-name:var(--f-instrument),Georgia,serif] text-5xl leading-[1.02] md:text-7xl">
          Small details that add up to <em className="text-[color:#6b665a]">a better memory.</em>
        </h2>
        <div className="mt-16 grid border-t border-l border-[color:#1b1a17]/20 md:grid-cols-2 lg:grid-cols-3">
          {margins.map(([label, title, body]) => (
            <article key={label} className="group border-r border-b border-[color:#1b1a17]/20 p-8 transition hover:bg-[color:#fbf8f1]">
              <p className="font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-[11px] tracking-wider text-[color:#6b665a] uppercase">{label}</p>
              <h3 className="mt-10 font-[family-name:var(--f-instrument),Georgia,serif] text-3xl leading-[1.05]">{title}</h3>
              <p className="mt-4 text-sm leading-6 text-[color:#6b665a]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Rates */}
      <section id="rates" className="mx-auto max-w-7xl scroll-mt-8 px-6 pb-28">
        <p className="font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-xs tracking-wider text-[color:#d4402a] uppercase">§ 3 — Rates</p>
        <h2 className="mt-4 font-[family-name:var(--f-instrument),Georgia,serif] text-5xl leading-[1.02] md:text-7xl">Simple, like the rest of it.</h2>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-[color:#1b1a17] bg-[color:#1b1a17] md:grid-cols-2">
          <div className="bg-[color:#f3eee4] p-10">
            <h3 className="font-[family-name:var(--f-instrument),Georgia,serif] text-4xl">Notebook</h3>
            <p className="mt-2 flex items-baseline gap-2"><span className="font-[family-name:var(--f-instrument),Georgia,serif] text-7xl leading-none">$0</span><span className="text-sm text-[color:#6b665a]">forever</span></p>
            <ul className="mt-8 space-y-3 text-sm">
              {freePlan.map((f) => <li key={f} className="flex gap-3"><Check />{f}</li>)}
            </ul>
            <a href="#" className="mt-10 inline-flex rounded-full border border-[color:#1b1a17] px-6 py-3 text-sm font-medium transition hover:bg-[color:#1b1a17] hover:text-[color:#f3eee4]">Start for free</a>
          </div>
          <div className="bg-[color:#fbf8f1] p-10">
            <div className="flex items-center justify-between">
              <h3 className="font-[family-name:var(--f-instrument),Georgia,serif] text-4xl">Library</h3>
              <span className="rounded-full bg-[color:#d4402a] px-3 py-1 font-[family-name:var(--font-geist-mono),ui-monospace,monospace] text-[11px] tracking-wider text-[color:#f3eee4] uppercase">Most read</span>
            </div>
            <p className="mt-2 flex items-baseline gap-2"><span className="font-[family-name:var(--f-instrument),Georgia,serif] text-7xl leading-none">$8</span><span className="text-sm text-[color:#6b665a]">per month, billed yearly</span></p>
            <ul className="mt-8 space-y-3 text-sm">
              {proPlan.map((f) => <li key={f} className="flex gap-3"><Check />{f}</li>)}
            </ul>
            <a href="#" className="mt-10 inline-flex rounded-full bg-[color:#1b1a17] px-6 py-3 text-sm font-medium text-[color:#f3eee4] transition hover:bg-[color:#d4402a]">Try Library free for 30 days</a>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-[color:#1b1a17]">
        <div className="mx-auto max-w-7xl px-6 py-28 text-center">
          <h2 className="mx-auto max-w-4xl font-[family-name:var(--f-instrument),Georgia,serif] text-6xl leading-[0.95] md:text-8xl">
            Your future self is <em className="text-[color:#d4402a]">already grateful.</em>
          </h2>
          <a href="#rates" className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[color:#1b1a17] px-8 py-4 text-sm font-medium text-[color:#f3eee4] transition hover:bg-[color:#d4402a]">
            Start writing — it&rsquo;s free
            <span className="transition group-hover:translate-x-1"><Arrow /></span>
          </a>
        </div>
      </section>

      <footer className="border-t border-[color:#1b1a17]/15 pb-28">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-8 text-sm text-[color:#6b665a]">
          <span className="font-[family-name:var(--f-instrument),Georgia,serif] text-3xl text-[color:#1b1a17] italic">Engram<span className="text-[color:#d4402a]">.</span></span>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
            <a href="#" className="hover:text-[color:#1b1a17]">Changelog</a>
            <a href="#" className="hover:text-[color:#1b1a17]">Security</a>
            <a href="#" className="hover:text-[color:#1b1a17]">Journal</a>
            <a href="#" className="hover:text-[color:#1b1a17]">Privacy</a>
          </nav>
          <span>© 2026 Engram Labs</span>
        </div>
      </footer>
    </>
  );
}
