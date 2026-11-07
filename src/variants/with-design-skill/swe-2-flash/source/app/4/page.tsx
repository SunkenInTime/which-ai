/* Botanical plates — stroke-only line art */

function Eucalyptus() {
  const ys = [218, 190, 162, 134, 106, 80];
  return (
    <svg viewBox="0 0 200 260" className="mx-auto h-64 w-auto" aria-hidden="true">
      <g fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M100,252 C97,212 103,162 99,44" />
        {ys.map((y, i) => (
          <g key={i}>
            <path d={`M100,${y} Q88,${y - 6} 74,${y - 22}`} strokeWidth="1" />
            <path d={`M100,${y} Q112,${y - 6} 126,${y - 22}`} strokeWidth="1" />
            <path
              d="M0 0 Q15 -6 32 0 Q15 6 0 0 Z"
              transform={`translate(72,${y - 24}) rotate(215)`}
              strokeWidth="1.2"
            />
            <path
              d="M0 0 Q15 -6 32 0 Q15 6 0 0 Z"
              transform={`translate(126,${y - 24}) rotate(-35)`}
              strokeWidth="1.2"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

function SeedHead() {
  const seeds = [-62, -45, -28, -12, 12, 28, 45, 62];
  return (
    <svg viewBox="0 0 200 260" className="mx-auto h-56 w-auto" aria-hidden="true">
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M100,252 C99,210 101,160 100,96" />
        <path d="M100,140 C96,160 92,180 88,205" />
        <path d="M100,170 C104,190 110,210 116,230" />
        {seeds.map((a) => {
          const rad = (a * Math.PI) / 180;
          const len = 52 + Math.abs(a) * -0.18;
          const tx = 100 + len * Math.sin(rad);
          const ty = 92 - len * Math.cos(rad) * 0.92;
          const cx = 100 + (tx - 100) * 0.45;
          const cy = 92 + (ty - 92) * 0.4 - 14;
          return (
            <g key={a}>
              <path d={`M100,92 Q${cx},${cy} ${tx},${ty}`} strokeWidth="1.1" />
              <ellipse
                cx={tx}
                cy={ty - 8}
                rx="4.5"
                ry="9"
                transform={`rotate(${a} ${tx} ${ty - 8})`}
                fill="var(--wash)"
                strokeWidth="1.1"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function Roots() {
  return (
    <svg viewBox="0 0 200 260" className="mx-auto h-56 w-auto" aria-hidden="true">
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round">
        {/* canopy hint */}
        <path d="M100,14 C96,30 104,44 100,58" strokeWidth="1" />
        <path d="M92,22 Q80,18 72,26" strokeWidth="1" />
        <path d="M108,22 Q120,18 128,26" strokeWidth="1" />
        {/* taproot */}
        <path d="M100,58 C98,110 102,170 100,252" />
        {/* laterals */}
        <path d="M100,120 C84,132 62,148 38,168" strokeWidth="1.2" />
        <path d="M100,120 C118,134 142,150 168,166" strokeWidth="1.2" />
        <path d="M99,168 C82,182 60,200 44,224" strokeWidth="1.1" />
        <path d="M101,168 C120,184 142,202 160,220" strokeWidth="1.1" />
        <path d="M100,212 C96,228 90,244 78,256" strokeWidth="1" />
        <path d="M101,212 C108,230 122,244 136,252" strokeWidth="1" />
        {/* node dots = links */}
        <g fill="var(--accent)" stroke="none">
          <circle cx="38" cy="168" r="3" />
          <circle cx="168" cy="166" r="3" />
          <circle cx="44" cy="224" r="2.4" />
          <circle cx="160" cy="220" r="2.4" />
          <circle cx="78" cy="256" r="2" />
        </g>
      </g>
    </svg>
  );
}

function Bulb() {
  return (
    <svg viewBox="0 0 200 260" className="mx-auto h-56 w-auto" aria-hidden="true">
      <g fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round">
        {/* soil line */}
        <line x1="30" y1="150" x2="170" y2="150" strokeWidth="1" strokeDasharray="5 5" />
        <text
          x="164"
          y="144"
          fontFamily="var(--font-plex)"
          fontSize="9"
          fill="var(--ink-soft)"
          stroke="none"
          letterSpacing="1"
        >
          SOIL
        </text>
        {/* shoot */}
        <path d="M100,148 C98,116 102,84 100,44" />
        <path d="M100,96 C88,88 74,80 58,74 Q76,92 98,102 Z" />
        <path d="M100,76 C112,68 126,60 142,56 Q124,74 102,84 Z" />
        {/* bulb */}
        <ellipse cx="100" cy="196" rx="26" ry="34" />
        <path d="M88,176 Q100,168 112,176" strokeWidth="1" />
        {/* roots */}
        <path d="M88,224 C82,238 74,246 62,252" strokeWidth="1.1" />
        <path d="M100,230 C100,244 100,252 100,258" strokeWidth="1.1" />
        <path d="M112,224 C118,238 126,246 138,250" strokeWidth="1.1" />
        <circle cx="100" cy="42" r="4" fill="var(--accent)" stroke="none" />
      </g>
    </svg>
  );
}

const PLATES = [
  {
    no: "PL. II",
    latin: "Semen notae",
    name: "Note seed",
    desc: "Clip anything — articles, photos of napkins, voice memos. Every capture is pressed flat and filed by date and habitat.",
    Art: SeedHead,
  },
  {
    no: "PL. III",
    latin: "Mycelium notus",
    name: "The linking fungus",
    desc: "Notes send out hyphae. Follow any thread through the collection and the whole network answers at once.",
    Art: Roots,
  },
  {
    no: "PL. IV",
    latin: "Bulbus memorius",
    name: "The returning bulb",
    desc: "Perennial notes come back on schedule — the ones you need, surfacing just as the season calls for them.",
    Art: Bulb,
  },
];

const ACCESSIONS: [string, string, string, string][] = [
  ["CP-1042", "Sourdough, third attempt", "kitchen · counter", "ACCESSIONED"],
  ["CP-1041", "Q3 roadmap — draft", "desk · drawer", "PRESSING"],
  ["CP-1039", "Lisbon, someday", "window light", "ACCESSIONED"],
  ["CP-1036", "Gift for Maya's wedding", "studio shelf", "MOUNTED"],
  ["CP-1031", "Tuesday meeting — raw", "field jacket", "IN PRESS"],
];

export default function Page4() {
  return (
    <div className="herbarium min-h-screen">
      {/* nav */}
      <header className="border-b border-(--rule)">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-baseline gap-3">
            <span className="hb-serif text-xl font-medium">Commonplace</span>
            <span className="hb-mono hidden sm:inline" style={{ color: "var(--ink-soft)" }}>
              A FIELD GUIDE TO YOUR MIND
            </span>
          </a>
          <nav className="hb-mono hidden items-center gap-6 md:flex" style={{ color: "var(--ink-soft)" }}>
            <a href="#plates" className="transition-colors hover:text-(--accent)">PLATES</a>
            <a href="#accessions" className="transition-colors hover:text-(--accent)">ACCESSIONS</a>
            <a href="#start" className="transition-colors hover:text-(--accent)">COLLECTING NOTES</a>
          </nav>
          <a href="#start" className="hb-btn hb-btn-solid !px-4 !py-2 text-sm">Begin collecting</a>
        </div>
      </header>

      {/* hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-14 pb-20 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="hb-mono mb-6" style={{ color: "var(--ink-soft)" }}>
              VOL. I · THE COMMONPLACE COLLECTION
            </p>
            <h1 className="hb-serif text-[clamp(2.7rem,5.6vw,4.6rem)] font-medium leading-[1.05]">
              A field guide
              <br />
              to your mind.
            </h1>
            <p className="hb-serif mt-7 max-w-md text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Commonplace presses everything you capture into a permanent
              collection — notes as specimens, links as root systems, and
              memories that return each season.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#start" className="hb-btn hb-btn-solid">Open the guide</a>
              <a href="#plates" className="hb-btn hb-btn-ghost">Browse the plates</a>
            </div>
          </div>

          {/* hero plate */}
          <div className="hb-plate hb-press rotate-1 px-8 pb-8 pt-12">
            <span className="hb-tape" />
            <p className="hb-mono text-center" style={{ color: "var(--accent)" }}>PL. I</p>
            <Eucalyptus />
            <div className="mt-2 text-center">
              <p className="hb-serif text-xl italic">Eucalyptus mentis</p>
              <p className="hb-serif text-sm" style={{ color: "var(--ink-soft)" }}>
                the thinking spray
              </p>
              <p className="hb-mono mt-3" style={{ color: "var(--ink-soft)" }}>
                COLL. COMMONPLACE · 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* plates */}
      <section id="plates" className="border-t border-(--rule) bg-(--paper-2)">
        <div className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
          <div className="mb-14 flex items-end justify-between">
            <h2 className="hb-serif text-4xl font-medium">Specimen plates</h2>
            <p className="hb-mono hidden md:block" style={{ color: "var(--ink-soft)" }}>
              HANDLE WITH CLEAN HANDS
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {PLATES.map((p, i) => (
              <article
                key={p.no}
                className={`hb-plate hb-press px-6 pb-7 pt-10 ${i === 1 ? "md:-translate-y-4" : i === 2 ? "md:translate-y-3" : ""}`}
              >
                <span className="hb-tape" />
                <p className="hb-mono text-center" style={{ color: "var(--accent)" }}>{p.no}</p>
                <div className="my-4">
                  <p.Art />
                </div>
                <h3 className="hb-serif text-center text-xl italic">{p.latin}</h3>
                <p className="hb-serif mt-1 text-center font-medium">{p.name}</p>
                <p className="hb-serif mt-4 text-[15px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* accessions */}
      <section id="accessions" className="border-t border-(--rule)">
        <div className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="hb-serif text-4xl font-medium">Recent accessions</h2>
            <p className="hb-mono hidden md:block" style={{ color: "var(--ink-soft)" }}>
              LOG · LAST 30 DAYS
            </p>
          </div>
          <div className="hb-plate overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-(--rule)">
                  {["ACC. NO.", "SPECIMEN", "HABITAT", "STATUS"].map((h) => (
                    <th key={h} className="hb-mono px-5 py-3 font-medium" style={{ color: "var(--ink-soft)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACCESSIONS.map((a) => (
                  <tr key={a[0]} className="border-b border-(--rule) last:border-0">
                    <td className="hb-mono px-5 py-4" style={{ color: "var(--faint, var(--ink-soft))" }}>{a[0]}</td>
                    <td className="hb-serif px-5 py-4 text-lg">{a[1]}</td>
                    <td className="hb-serif px-5 py-4 italic" style={{ color: "var(--ink-soft)" }}>{a[2]}</td>
                    <td className="hb-mono px-5 py-4 font-medium" style={{ color: "var(--accent)" }}>{a[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* field notebook */}
      <section className="border-t border-(--rule) bg-(--paper-2)">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="hb-mono mb-12 text-center" style={{ color: "var(--ink-soft)" }}>
            — FROM THE FIELD NOTEBOOK —
          </p>
          <div className="grid gap-10 md:grid-cols-2">
            {[
              {
                text: "every idea i ever had is pressed in here somewhere. i just have to remember which page — except i don't have to, because it resurfaces the page.",
                who: "J. MERRILL · FIELD BOTANIST",
                rot: "-rotate-1",
              },
              {
                text: "my notes finally behave like a garden. things i plant in january are still alive in june — and the paths between them are visible.",
                who: "T. IBARRA · GARDENER & NOVELIST",
                rot: "rotate-1",
              },
            ].map((q) => (
              <figure key={q.who} className={`relative mx-auto w-full max-w-md ${q.rot}`}>
                <span className="hb-tape" />
                <div className="hb-notebook hb-plate px-8 py-8">
                  <blockquote className="hb-hand text-[1.7rem] leading-[31px]" style={{ color: "var(--ink)" }}>
                    {q.text}
                  </blockquote>
                  <figcaption className="hb-mono mt-4" style={{ color: "var(--ink-soft)" }}>
                    — {q.who}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="scroll-mt-8 bg-(--ink) text-(--paper)">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="hb-mono mb-6" style={{ color: "var(--wash)" }}>
            THE SEASON IS OPEN · NO EXPERIENCE REQUIRED
          </p>
          <h2 className="hb-serif mx-auto max-w-3xl text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium leading-[1.1]">
            Start your collection.
          </h2>
          <p className="hb-serif mx-auto mt-6 max-w-md text-lg" style={{ color: "var(--wash)" }}>
            Free while in beta. Pressed on your own devices, exported anytime —
            a herbarium you actually own.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#top" className="hb-btn !border-(--paper) !text-(--paper) hover:!bg-(--paper) hover:!text-(--ink)">
              Begin pressing — free
            </a>
            <a href="#plates" className="hb-btn !border-(--wash) !text-(--wash) hover:!bg-(--wash) hover:!text-(--ink)">
              Read the collecting notes
            </a>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-(--rule)">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="hb-serif text-lg font-medium">Commonplace</p>
          <p className="hb-mono" style={{ color: "var(--ink-soft)" }}>
            PRESSED &amp; MOUNTED MMXXVI · VOL. I · SET IN NEWSREADER &amp; PLEX MONO
          </p>
          <div className="hb-mono flex gap-6" style={{ color: "var(--ink-soft)" }}>
            <a href="#plates" className="hover:text-(--accent)">PLATES</a>
            <a href="#accessions" className="hover:text-(--accent)">ACCESSIONS</a>
            <a href="#start" className="hover:text-(--accent)">COLLECTING NOTES</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
