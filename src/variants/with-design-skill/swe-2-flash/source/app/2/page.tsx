import type { CSSProperties } from "react";

/* deterministic pseudo-random from an index */
function rand(i: number, salt = 0) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const STAR_COUNT = 70;
const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
  x: rand(i, 1) * 400,
  y: rand(i, 2) * 300,
  r: 0.5 + rand(i, 3) * 1.3,
  o: 0.25 + rand(i, 4) * 0.75,
  dur: 2.5 + rand(i, 5) * 5,
  delay: -rand(i, 6) * 6,
}));

const CONSTELLATION: { x: number; y: number; label?: string; bright?: boolean }[] = [
  { x: 58, y: 218, label: "grief journal" },
  { x: 108, y: 186 },
  { x: 148, y: 198, label: "sourdough" },
  { x: 182, y: 158, label: "Q3 roadmap" },
  { x: 228, y: 172 },
  { x: 252, y: 128, label: "Maya's gift" },
  { x: 292, y: 148, bright: true, label: "you are here" },
  { x: 268, y: 92 },
  { x: 236, y: 78 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [3, 7],
  [7, 8],
  [8, 6],
];

function segLen(a: (typeof CONSTELLATION)[0], b: (typeof CONSTELLATION)[0]) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

const FEATURES = [
  {
    name: "Capture",
    latin: "Observatio",
    desc: "Clip anything — articles, PDFs, photos of napkins, voice memos. Every capture becomes a star fixed in your sky.",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Link",
    latin: "Nexus",
    desc: "Notes connect into constellations. Follow a trail from a recipe to a chemistry lesson to a dinner-party plan.",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="8" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M7.5 7.5 10.5 16M16.5 9.5l-3 6.5M8 6h8" />
      </svg>
    ),
  },
  {
    name: "Resurface",
    latin: "Redintegratio",
    desc: "The sky returns what you're forgetting — the right star rising again just before it would have set.",
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 4a8 8 0 1 0 8 8" />
        <path d="M12 8a4 4 0 1 0 4 4" />
        <path d="M20 3v5h-5" />
      </svg>
    ),
  },
];

const CATALOG = [
  { des: "CP-1042", name: "Sourdough, third attempt", mag: "1.2", note: "RA 05h 12m · linked ×6" },
  { des: "CP-1041", name: "Q3 roadmap — draft", mag: "2.8", note: "RA 10h 44m · linked ×11" },
  { des: "CP-1039", name: "Lisbon, someday", mag: "4.1", note: "RA 18h 03m · linked ×3" },
  { des: "CP-1036", name: "Gift for Maya's wedding", mag: "3.5", note: "RA 22h 31m · linked ×4" },
  { des: "CP-1031", name: "Tuesday meeting — raw", mag: "5.0", note: "RA 14h 57m · linked ×2" },
];

function StarChart() {
  return (
    <svg viewBox="0 0 400 300" className="block h-auto w-full" role="img" aria-label="Star chart showing a constellation connecting five notes">
      <defs>
        <radialGradient id="milky" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#f2e8cf" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#f2e8cf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#milky)" />

      {/* faint graticule */}
      <g stroke="var(--line)" strokeWidth="0.5" opacity="0.6">
        {[60, 120, 180, 240, 300, 360].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" strokeDasharray="1 4" />
        ))}
        {[50, 100, 150, 200, 250].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} strokeDasharray="1 4" />
        ))}
      </g>

      {/* background stars */}
      {stars.map((s, i) => (
        <circle
          key={i}
          className="const-star"
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="var(--star)"
          style={
            {
              "--star-o": s.o,
              "--tw-dur": `${s.dur}s`,
              "--tw-delay": `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}

      {/* constellation lines */}
      {LINKS.map(([a, b], i) => {
        const A = CONSTELLATION[a];
        const B = CONSTELLATION[b];
        return (
          <line
            key={i}
            className="const-draw"
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke="var(--amber)"
            strokeWidth="0.9"
            opacity="0.75"
            style={{ "--line-len": segLen(A, B) + 40 } as CSSProperties}
          />
        );
      })}

      {/* constellation stars + labels */}
      {CONSTELLATION.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.bright ? 4 : 3}
            fill={n.bright ? "var(--amber)" : "var(--star)"}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.bright ? 7 : 5}
            fill="none"
            stroke={n.bright ? "var(--amber)" : "var(--star)"}
            strokeWidth="0.6"
            opacity="0.5"
          />
          {n.label && (
            <text
              x={n.x + 9}
              y={n.y - 7}
              fontFamily="var(--font-plex)"
              fontSize="8.5"
              letterSpacing="0.8"
              fill="var(--dim)"
            >
              {n.label.toUpperCase()}
            </text>
          )}
        </g>
      ))}

      {/* chart furniture */}
      <text x="16" y="24" fontFamily="var(--font-plex)" fontSize="9" letterSpacing="2" fill="var(--dim)">
        SKY CHART · COMMONPLACE
      </text>
      <text x="384" y="24" textAnchor="end" fontFamily="var(--font-plex)" fontSize="9" letterSpacing="1" fill="var(--dim)">
        FIG. 02
      </text>
    </svg>
  );
}

export default function Page2() {
  return (
    <div className="constellation min-h-screen">
      {/* nav */}
      <header className="border-b border-(--line)">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M9 0 L10.6 7.4 L18 9 L10.6 10.6 L9 18 L7.4 10.6 L0 9 L7.4 7.4 Z" fill="var(--amber)" />
            </svg>
            <span className="const-display text-xl">commonplace</span>
          </a>
          <nav className="const-mono hidden items-center gap-7 md:flex" style={{ color: "var(--dim)" }}>
            <a href="#features" className="transition-colors hover:text-(--star)">FEATURES</a>
            <a href="#catalog" className="transition-colors hover:text-(--star)">CATALOG</a>
            <a href="#start" className="transition-colors hover:text-(--star)">PRICING</a>
          </nav>
          <a href="#start" className="const-btn">Start observing</a>
        </div>
      </header>

      {/* hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-20 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="const-mono mb-7" style={{ color: "var(--amber)" }}>
              A SECOND BRAIN, CHARTED
            </p>
            <h1 className="const-display text-[clamp(2.8rem,6vw,4.8rem)] leading-[1.02]">
              Think in
              <br />
              constellations.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed" style={{ color: "var(--dim)" }}>
              Commonplace captures everything you come across and links it into
              patterns you can actually navigate — a second brain you can see.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#start" className="const-btn">Chart your sky — free</a>
              <a href="#catalog" className="const-btn const-btn-ghost">Browse the catalog</a>
            </div>
            <p className="const-mono mt-10" style={{ color: "var(--dim)" }}>
              12,408 STARS CHARTED · 3,102 CONSTELLATIONS FORMED · 0 LOST
            </p>
          </div>

          <div className="const-panel p-2">
            <StarChart />
          </div>
        </div>
      </section>

      {/* features */}
      <section id="features" className="border-t border-(--line) bg-(--sky-2)">
        <div className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
          <div className="mb-14 flex items-end justify-between">
            <h2 className="const-display text-4xl">Tonight&rsquo;s observing list</h2>
            <p className="const-mono hidden md:block" style={{ color: "var(--dim)" }}>
              BEST VIEWED AFTER CAPTURE
            </p>
          </div>
          <div className="grid gap-px border border-(--line) bg-(--line) md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.name} className="const-panel p-8">
                <div className="mb-6 flex h-10 w-10 items-center justify-center" style={{ color: "var(--amber)" }}>
                  {f.glyph}
                </div>
                <p className="const-serif-i text-lg" style={{ color: "var(--amber)" }}>{f.latin}</p>
                <h3 className="const-display mt-1 text-2xl">{f.name}</h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "var(--dim)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* catalog */}
      <section id="catalog" className="border-t border-(--line)">
        <div className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="const-display text-4xl">The star catalog</h2>
            <p className="const-mono hidden md:block" style={{ color: "var(--dim)" }}>
              RECENTLY CHARTED OBJECTS
            </p>
          </div>
          <div className="overflow-x-auto border border-(--line)">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="border-b border-(--line)">
                  {["DESIGNATION", "OBJECT", "MAG", "POSITION"].map((h) => (
                    <th key={h} className="const-mono px-5 py-3 font-medium" style={{ color: "var(--dim)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATALOG.map((c) => (
                  <tr key={c.des} className="border-b border-(--line) last:border-0 transition-colors hover:bg-(--sky-2)">
                    <td className="const-mono px-5 py-4" style={{ color: "var(--amber)" }}>{c.des}</td>
                    <td className="const-display px-5 py-4 text-lg">{c.name}</td>
                    <td className="const-mono px-5 py-4" style={{ color: "var(--dim)" }}>{c.mag}</td>
                    <td className="const-mono px-5 py-4" style={{ color: "var(--dim)" }}>{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* quote */}
      <section className="border-t border-(--line) bg-(--sky-2)">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="const-mono mb-8" style={{ color: "var(--dim)" }}>— FIELD REPORT —</p>
          <blockquote className="const-display text-[clamp(1.5rem,3vw,2.1rem)] leading-snug">
            “I used to write things down and never see them again. Now my notes
            find each other — I just follow the light.”
          </blockquote>
          <p className="const-mono mt-8" style={{ color: "var(--dim)" }}>
            DR. AMARA CHEN · ASTROPHYSICIST · OBSERVING SINCE 2023
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="scroll-mt-8 border-t border-(--line)">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="const-display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02]">
            Clear skies ahead.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg" style={{ color: "var(--dim)" }}>
            Free while in beta. Your data stays yours — export the whole sky,
            anytime.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#top" className="const-btn">Begin observing — free</a>
            <a href="#features" className="const-btn const-btn-ghost">How it works</a>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-(--line)">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="const-display text-lg">commonplace</p>
          <p className="const-mono" style={{ color: "var(--dim)" }}>
            OBSERVED FROM 41.8°N · SET IN FRAUNCES &amp; PLEX MONO
          </p>
          <div className="const-mono flex gap-7" style={{ color: "var(--dim)" }}>
            <a href="#features" className="hover:text-(--star)">FEATURES</a>
            <a href="#catalog" className="hover:text-(--star)">CATALOG</a>
            <a href="#start" className="hover:text-(--star)">PRICING</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
