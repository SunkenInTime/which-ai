import { AtlasMap } from "@/variants/with-design-skill/swe-2-flash/source/components/atlas-map";

const LEGEND = [
  {
    name: "Capture",
    spec: "INPUT: ANY FORMAT",
    desc: "Clip web pages, snap photos of napkins, dictate voice memos. Everything lands on the map the moment you catch it.",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.4 12 21 12 21Z" />
        <circle cx="12" cy="10.5" r="2.2" />
      </svg>
    ),
  },
  {
    name: "Traverse",
    spec: "OUTPUT: ROUTES",
    desc: "Notes link into trails you can wander. Ask why two ideas are connected and the map shows you every path between them.",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 19 C8 18 6 12 11 11 S17 10 20 5" strokeDasharray="3 3" />
        <rect x="2.5" y="16.5" width="4" height="4" />
        <rect x="18" y="2.5" width="4" height="4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Resurface",
    spec: "CYCLE: WHEN IT MATTERS",
    desc: "The survey resurfaces what you're forgetting — the right note, at the right contour, before it drifts off the map.",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <ellipse cx="12" cy="12" rx="9" ry="6" />
        <ellipse cx="12" cy="12" rx="5.5" ry="3.6" />
        <ellipse cx="12" cy="12" rx="2.4" ry="1.5" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const FILINGS = [
  { ref: "CP-1042", note: "Sourdough, third attempt", route: "→ bread science", status: "CHARTED" },
  { ref: "CP-1041", note: "Q3 roadmap — draft", route: "→ hiring plan", status: "CHARTED" },
  { ref: "CP-1039", note: "Lisbon, someday", route: "→ rail pass research", status: "FILED" },
  { ref: "CP-1036", note: "Gift for Maya's wedding", route: "→ ceramics studio", status: "CHARTED" },
  { ref: "CP-1031", note: "Tuesday meeting — raw", route: "4 routes drawn", status: "IN TRANSIT" },
];

export default function Page1() {
  return (
    <div className="atlas min-h-screen">
      {/* nav */}
      <header className="border-b border-(--rule)">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="atlas-display text-lg tracking-wide">COMMONPLACE</span>
            <span className="atlas-mono hidden sm:inline" style={{ color: "var(--faint)" }}>
              FIELD ATLAS
            </span>
          </a>
          <nav className="atlas-mono hidden items-center gap-6 md:flex" style={{ color: "var(--ink-soft)" }}>
            <a href="#survey" className="transition-colors hover:text-(--accent)">THE SURVEY</a>
            <a href="#catalog" className="transition-colors hover:text-(--accent)">RECENT FILINGS</a>
            <a href="#start" className="transition-colors hover:text-(--accent)">PRICING</a>
          </nav>
          <a href="#start" className="atlas-btn atlas-btn-solid !py-2 !px-4">
            Begin survey
          </a>
        </div>
      </header>

      {/* hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-14 pb-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr]">
          <div>
            <p className="atlas-mono mb-6" style={{ color: "var(--ink-soft)" }}>
              41°52′N · 87°37′W — CHICAGO FIELD OFFICE
            </p>
            <h1 className="atlas-display text-[clamp(2.9rem,6.2vw,5.2rem)] leading-[0.98]">
              Every thought
              <br />
              has a
              <br />
              <span className="relative inline-block">
                location.
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 220 14"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2,10 C40,4 70,13 110,8 S180,5 218,9"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="atlas-serif mt-8 max-w-md text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Commonplace is a second brain for everything you capture. It charts your
              notes the way a survey charts land — every idea placed, every route
              between them drawn.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#start" className="atlas-btn atlas-btn-solid">Begin the survey</a>
              <a href="#catalog" className="atlas-btn atlas-btn-ghost">See recent filings</a>
            </div>
            <p className="atlas-hand mt-10 -rotate-1 text-2xl" style={{ color: "var(--accent)" }}>
              you are here →
            </p>
          </div>

          <div className="atlas-frame bg-(--paper-deep) p-3">
            <AtlasMap />
          </div>
        </div>
      </section>

      {/* survey data strip */}
      <section className="border-y border-(--rule) bg-(--paper-deep)">
        <div className="atlas-mono mx-auto grid max-w-6xl grid-cols-3 divide-x divide-(--rule) px-6 py-5 text-center">
          <div>
            <div className="atlas-display text-2xl" style={{ color: "var(--ink)" }}>12,408</div>
            <div className="mt-1" style={{ color: "var(--ink-soft)" }}>NOTES CHARTED</div>
          </div>
          <div>
            <div className="atlas-display text-2xl" style={{ color: "var(--ink)" }}>3,102</div>
            <div className="mt-1" style={{ color: "var(--ink-soft)" }}>ROUTES DRAWN</div>
          </div>
          <div>
            <div className="atlas-display text-2xl" style={{ color: "var(--accent)" }}>0</div>
            <div className="mt-1" style={{ color: "var(--ink-soft)" }}>NOTES LOST</div>
          </div>
        </div>
      </section>

      {/* legend / features */}
      <section id="survey" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="atlas-display text-4xl">The survey</h2>
          <p className="atlas-mono hidden md:block" style={{ color: "var(--ink-soft)" }}>
            SHEET 02 · FIELD PROCEDURES
          </p>
        </div>
        <div className="border-t border-(--ink)">
          {LEGEND.map((item) => (
            <div
              key={item.name}
              className="grid gap-6 border-b border-(--rule) py-10 md:grid-cols-[64px_220px_1fr] md:items-start"
            >
              <div className="h-12 w-12" style={{ color: "var(--accent)" }}>{item.glyph}</div>
              <div>
                <h3 className="atlas-display text-2xl tracking-wide">{item.name}</h3>
                <p className="atlas-mono mt-2" style={{ color: "var(--faint)" }}>{item.spec}</p>
              </div>
              <p className="atlas-serif max-w-xl text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* catalog */}
      <section id="catalog" className="border-t border-(--rule) bg-(--paper-deep)">
        <div className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="atlas-display text-4xl">Recent filings</h2>
            <p className="atlas-mono hidden md:block" style={{ color: "var(--ink-soft)" }}>
              EXTRACT · SURVEY LOG
            </p>
          </div>
          <div className="atlas-frame overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-(--ink)">
                  {["REF", "NOTE", "ROUTE", "STATUS"].map((h) => (
                    <th key={h} className="atlas-mono px-5 py-3 font-medium" style={{ color: "var(--ink-soft)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FILINGS.map((f) => (
                  <tr key={f.ref} className="border-b border-(--rule) last:border-0">
                    <td className="atlas-mono px-5 py-4" style={{ color: "var(--faint)" }}>{f.ref}</td>
                    <td className="atlas-serif px-5 py-4 text-lg">{f.note}</td>
                    <td className="atlas-mono px-5 py-4" style={{ color: "var(--ink-soft)" }}>{f.route}</td>
                    <td className="atlas-mono px-5 py-4 font-medium" style={{ color: "var(--accent)" }}>{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* field note */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <figure className="atlas-frame mx-auto max-w-2xl -rotate-1 bg-(--paper-deep) px-8 py-10 text-center">
          <blockquote className="atlas-hand text-4xl leading-snug" style={{ color: "var(--ink)" }}>
            “It replaced three apps and a filing cabinet. I stopped losing
            ideas somewhere around month two.”
          </blockquote>
          <figcaption className="atlas-mono mt-6" style={{ color: "var(--ink-soft)" }}>
            — R. OKAFOR · URBAN PLANNER · SURVEYED SINCE 2024
          </figcaption>
        </figure>
      </section>

      {/* CTA */}
      <section id="start" className="scroll-mt-8 bg-(--ink) text-(--paper)">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="atlas-mono mb-6" style={{ color: "var(--faint)" }}>
            TERRITORY OPEN · NO EXPERIENCE REQUIRED
          </p>
          <h2 className="atlas-display mx-auto max-w-3xl text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02]">
            Your second brain is uncharted territory.
          </h2>
          <p className="atlas-serif mx-auto mt-6 max-w-md text-lg" style={{ color: "var(--rule)" }}>
            Free while in beta. Export everything, anytime. No ads, ever.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#top"
              className="atlas-btn border-(--paper) !text-(--paper) hover:!bg-(--paper) hover:!text-(--ink)"
            >
              Start charting — free
            </a>
            <a
              href="#survey"
              className="atlas-btn border-(--rule) !text-(--rule) hover:!bg-(--paper-deep)"
            >
              Read the field manual
            </a>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-(--rule)">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="atlas-display tracking-wide">COMMONPLACE</p>
          <p className="atlas-mono" style={{ color: "var(--ink-soft)" }}>
            SURVEYED &amp; BOUND 2026 · SET IN OSWALD, NEWSREADER &amp; PLEX MONO
          </p>
          <div className="atlas-mono flex gap-6" style={{ color: "var(--ink-soft)" }}>
            <a href="#survey" className="hover:text-(--accent)">SURVEY</a>
            <a href="#catalog" className="hover:text-(--accent)">FILINGS</a>
            <a href="#start" className="hover:text-(--accent)">PRICING</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
