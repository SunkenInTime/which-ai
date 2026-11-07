const TICKER_ITEMS = [
  "SOURDOUGH STARTER",
  "Q3 ROADMAP",
  "MAYA'S WEDDING GIFT",
  "LISBON, SOMEDAY",
  "GRIEF JOURNAL",
  "TAXES 2025",
  "BOOK CLUB PICK",
  "MEETING — TUESDAY",
  "FATHER'S DAY",
  "THE LEAP YEAR LIST",
];

const FEATURES = [
  {
    word: "CAPTURE.",
    desc: "Clip pages, snap photos of napkins, dictate voice memos. Everything lands in one place — nothing goes in a drawer.",
    mark: "✳",
  },
  {
    word: "LINK.",
    desc: "Every note points at every other. The connections you didn't know you were making show up on their own.",
    mark: "✳",
  },
  {
    word: "REMEMBER.",
    desc: "Notes resurface on schedule — the right idea, at the right moment, before it goes cold.",
    mark: "✳",
  },
];

export default function Page5() {
  const ticker = TICKER_ITEMS.map((t) => `${t} ✳`).join(" ");
  return (
    <div className="broadside min-h-screen">
      {/* masthead */}
      <header className="border-b-[3px] border-(--ink)">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="bs-display text-2xl tracking-wide">
            COMMONPLACE<span style={{ color: "var(--accent)" }}>✳</span>
          </a>
          <nav className="bs-mono hidden items-center gap-7 md:flex" style={{ color: "var(--ink)" }}>
            <a href="#features" className="transition-colors hover:text-(--accent)">WHAT IT DOES</a>
            <a href="#numbers" className="transition-colors hover:text-(--accent)">NUMBERS</a>
            <a href="#price" className="transition-colors hover:text-(--accent)">PRICE</a>
          </nav>
          <a href="#price" className="bs-btn bs-btn-solid !px-5 !py-2.5">Get it free</a>
        </div>
      </header>

      {/* hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-14 pb-16 lg:pt-20">
        <div className="grid items-end gap-12 lg:grid-cols-[1.5fr_1fr]">
          <h1 className="bs-display text-[clamp(3.4rem,10.5vw,9rem)]">
            STOP
            <br />
            TAKING
            <br />
            NOTES.
          </h1>
          <div className="pb-2 lg:pb-8">
            <h2 className="bs-display text-[clamp(2rem,4.5vw,3.6rem)]" style={{ color: "var(--accent)" }}>
              START
              <br />
              REMEMBERING.
            </h2>
            <p className="bs-mono mt-6 max-w-xs leading-relaxed" style={{ color: "var(--grey)" }}>
              A SECOND BRAIN THAT CAPTURES EVERYTHING,
              LINKS WHAT BELONGS TOGETHER, AND HANDS IT
              BACK WHEN YOU NEED IT.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#price" className="bs-btn bs-btn-solid">Start free</a>
              <a href="#features" className="bs-btn bs-btn-ghost">What it does</a>
            </div>
            <span className="bs-sticker bs-sticker-accent mt-10">NEW ✳ IN BETA</span>
          </div>
        </div>
      </section>

      {/* ticker */}
      <div className="bs-ticker border-y-[3px] border-(--ink) bg-(--ink) py-3 text-(--paper)">
        <div className="bs-ticker-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="bs-mono pr-8" aria-hidden={copy === 1}>
              {ticker}
            </span>
          ))}
        </div>
      </div>

      {/* features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
        <p className="bs-mono mb-4" style={{ color: "var(--grey)" }}>WHAT IT DOES — THREE MOVES</p>
        <h2 className="bs-display mb-14 text-[clamp(2.4rem,6vw,4.8rem)]">
          THAT&rsquo;S THE WHOLE TRICK.
        </h2>
        <div className="border-t-[3px] border-(--ink)">
          {FEATURES.map((f) => (
            <div
              key={f.word}
              className="grid gap-4 border-b-[3px] border-(--ink) py-10 md:grid-cols-[280px_1fr_auto] md:items-baseline"
            >
              <h3 className="bs-display text-5xl md:text-6xl">{f.word}</h3>
              <p className="max-w-xl text-lg leading-relaxed" style={{ color: "var(--ink)" }}>
                {f.desc}
              </p>
              <span className="bs-display hidden text-4xl md:block" style={{ color: "var(--accent)" }} aria-hidden="true">
                {f.mark}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* numbers */}
      <section id="numbers" className="border-y-[3px] border-(--ink) bg-(--ink) text-(--paper)">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x-2 divide-(--paper)/20 px-6 py-14 text-center">
          <div>
            <div className="bs-display text-[clamp(2rem,5vw,4rem)]">12,408</div>
            <div className="bs-mono mt-2" style={{ color: "var(--grey)" }}>NOTES CAPTURED</div>
          </div>
          <div>
            <div className="bs-display text-[clamp(2rem,5vw,4rem)]">3,102</div>
            <div className="bs-mono mt-2" style={{ color: "var(--grey)" }}>LINKS DRAWN</div>
          </div>
          <div>
            <div className="bs-display text-[clamp(2rem,5vw,4rem)]" style={{ color: "var(--accent)" }}>0</div>
            <div className="bs-mono mt-2" style={{ color: "var(--grey)" }}>NOTES LOST</div>
          </div>
        </div>
      </section>

      {/* proof quote */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <blockquote className="bs-display mx-auto max-w-4xl text-center text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.05]">
          “I STOPPED BEING THE PERSON WHO
          <span style={{ color: "var(--accent)" }}> FORGETS THINGS.</span>”
        </blockquote>
        <p className="bs-mono mt-8 text-center" style={{ color: "var(--grey)" }}>
          — R. OKAFOR · URBAN PLANNER · CUSTOMER SINCE 2024
        </p>
      </section>

      {/* price */}
      <section id="price" className="border-t-[3px] border-(--ink) px-6 pb-24">
        <div className="mx-auto max-w-6xl scroll-mt-8">
          <p className="bs-mono mb-4" style={{ color: "var(--grey)" }}>THE PRICE — BOTH PLANS, NO TRICKS</p>
          <div className="grid border-[3px] border-(--ink) md:grid-cols-2">
            <div className="border-b-[3px] border-(--ink) p-10 md:border-b-0 md:border-r-[3px]">
              <h3 className="bs-display text-4xl">FREE</h3>
              <p className="bs-display mt-4 text-6xl">
                $0<span className="text-2xl" style={{ color: "var(--grey)" }}>/FOREVER</span>
              </p>
              <ul className="bs-mono mt-8 space-y-3 leading-relaxed" style={{ color: "var(--ink)" }}>
                <li>✳ UNLIMITED NOTES</li>
                <li>✳ LINKING &amp; SEARCH</li>
                <li>✳ RESURFACING</li>
                <li>✳ EXPORT EVERYTHING</li>
              </ul>
              <a href="#top" className="bs-btn bs-btn-solid mt-10">Start free</a>
            </div>
            <div className="relative p-10">
              <span className="bs-sticker bs-sticker-accent absolute right-6 top-6">PRO</span>
              <h3 className="bs-display text-4xl">PRO</h3>
              <p className="bs-display mt-4 text-6xl">
                $8<span className="text-2xl" style={{ color: "var(--grey)" }}>/MONTH</span>
              </p>
              <ul className="bs-mono mt-8 space-y-3 leading-relaxed" style={{ color: "var(--ink)" }}>
                <li>✳ EVERYTHING IN FREE</li>
                <li>✳ ASK YOUR BRAIN ANYTHING</li>
                <li>✳ VERSION HISTORY</li>
                <li>✳ PRIORITY RESURFACING</li>
              </ul>
              <a href="#top" className="bs-btn bs-btn-ghost mt-10">Go pro</a>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t-[3px] border-(--ink)">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-10">
          <p className="bs-display text-[clamp(3rem,12vw,10rem)] leading-none">
            COMMONPLACE<span style={{ color: "var(--accent)" }}>.</span>
          </p>
          <div className="mt-10 flex flex-col gap-4 border-t-[3px] border-(--ink) pt-6 md:flex-row md:items-center md:justify-between">
            <p className="bs-mono" style={{ color: "var(--grey)" }}>
              A SECOND BRAIN FOR PEOPLE WHO HATE LOSING THINGS · EST. 2026
            </p>
            <div className="bs-mono flex gap-7" style={{ color: "var(--ink)" }}>
              <a href="#features" className="hover:text-(--accent)">WHAT IT DOES</a>
              <a href="#numbers" className="hover:text-(--accent)">NUMBERS</a>
              <a href="#price" className="hover:text-(--accent)">PRICE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
