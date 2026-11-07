const NODES: { x: number; y: number; hub?: boolean; fill?: boolean }[] = [
  { x: 168, y: 138 },
  { x: 238, y: 106 },
  { x: 318, y: 120 },
  { x: 362, y: 178 },
  { x: 330, y: 252 },
  { x: 258, y: 272 },
  { x: 178, y: 258 },
  { x: 128, y: 192 },
  { x: 252, y: 186, hub: true },
  { x: 205, y: 215, fill: true },
];

const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [8, 1], [8, 4], [8, 7], [8, 9], [9, 5], [9, 6],
];

const BLOB =
  "M255,62 C320,60 385,95 398,160 C410,220 380,275 320,292 " +
  "C270,306 200,300 155,278 C100,252 92,200 105,150 C118,95 180,64 255,62 Z";

function Schematic() {
  return (
    <svg
      viewBox="0 0 520 400"
      className="block h-auto w-full"
      role="img"
      aria-label="Technical schematic of a note-taking brain: a blob containing ten linked nodes"
    >
      {/* sheet border */}
      <rect x="14" y="14" width="492" height="372" fill="none" stroke="var(--ink)" strokeWidth="1.5" />

      {/* registration marks */}
      {[
        [30, 30], [490, 30], [30, 370], [490, 370],
      ].map(([x, y], i) => (
        <g key={i} stroke="var(--ink-soft)" strokeWidth="0.8">
          <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
          <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
        </g>
      ))}

      {/* construction centerlines */}
      <g stroke="var(--ink-soft)" strokeWidth="0.7" strokeDasharray="7 5" opacity="0.7">
        <line x1="255" y1="36" x2="255" y2="352" />
        <line x1="88" y1="186" x2="432" y2="186" />
      </g>

      {/* the organism outline */}
      <path d={BLOB} fill="none" stroke="var(--ink)" strokeWidth="1.8" />
      <path
        d={BLOB}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="0.7"
        transform="translate(3,3)"
        opacity="0.5"
      />

      {/* links */}
      <g stroke="var(--ink)" strokeWidth="0.9">
        {LINKS.map(([a, b], i) => (
          <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
        ))}
      </g>

      {/* nodes */}
      {NODES.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.hub ? 5.5 : 3.6}
            fill={n.hub ? "var(--accent)" : n.fill ? "var(--ink)" : "var(--sheet)"}
            stroke="var(--ink)"
            strokeWidth={n.hub ? 0 : 1.2}
          />
          {n.hub && <circle cx={n.x} cy={n.y} r="9" fill="none" stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="2 3" />}
        </g>
      ))}

      {/* dimensions */}
      <g stroke="var(--ink)" strokeWidth="0.9">
        <line x1="118" y1="46" x2="398" y2="46" />
        <line x1="118" y1="40" x2="118" y2="52" />
        <line x1="398" y1="40" x2="398" y2="52" />
        <line x1="424" y1="72" x2="424" y2="308" />
        <line x1="418" y1="72" x2="430" y2="72" />
        <line x1="418" y1="308" x2="430" y2="308" />
      </g>
      <g fontFamily="var(--font-plex)" fontSize="9" fill="var(--ink)" letterSpacing="1">
        <text x="258" y="40" textAnchor="middle">≈280</text>
        <text x="436" y="194" textAnchor="middle" transform="rotate(90 436 194)">≈225</text>
      </g>

      {/* callouts */}
      <g stroke="var(--ink-soft)" strokeWidth="0.8" fill="none">
        <path d="M150,112 L92,72" />
        <path d="M352,158 L420,132 L496,118" />
        <path d="M196,252 L176,292 L84,314" />
        <path d="M306,128 L368,92 L498,70" />
      </g>
      <g fontFamily="var(--font-plex)" fontSize="9" fill="var(--ink)" letterSpacing="1.2">
        <text x="60" y="62">A — CAPTURE</text>
        <text x="500" y="116" textAnchor="end">B — LINK</text>
        <text x="60" y="330">C — RESURFACE</text>
        <text x="500" y="66" textAnchor="end">D — QUERY</text>
      </g>

      {/* title block */}
      <g stroke="var(--ink)" strokeWidth="1">
        <rect x="336" y="320" width="168" height="64" fill="none" />
        <line x1="336" y1="342" x2="504" y2="342" />
        <line x1="336" y1="364" x2="504" y2="364" />
        <line x1="420" y1="320" x2="420" y2="384" />
      </g>
      <g fontFamily="var(--font-plex)" fontSize="8" fill="var(--ink)" letterSpacing="0.8">
        <text x="343" y="336">DWG NO.</text>
        <text x="343" y="358" fontWeight="600">CP-001</text>
        <text x="343" y="378">SCALE 1:1</text>
        <text x="427" y="336">TITLE</text>
        <text x="427" y="354">COMMONPLACE —</text>
        <text x="427" y="366">GENERAL ARRANGEMENT</text>
        <text x="427" y="380">REV C · 2026</text>
      </g>
    </svg>
  );
}

const SPECS: [string, string][] = [
  ["SYSTEM", "COMMONPLACE-01"],
  ["INPUT", "TEXT · IMAGE · AUDIO · LINK"],
  ["THROUGHPUT", "UNLIMITED NOTES"],
  ["STORAGE", "YOURS — EXPORT ALWAYS"],
  ["POWER", "ANY DEVICE, ANYWHERE"],
  ["REVISION", "C — CURRENT"],
];

const DETAILS = [
  {
    tag: "DETAIL A",
    name: "Capture",
    desc: "Clip pages, snap photos of napkins, dictate voice memos. Input arrives in any format and leaves as a note.",
  },
  {
    tag: "DETAIL B",
    name: "Link",
    desc: "Every note can point at every other. The graph grows the way your thinking actually does — sideways.",
  },
  {
    tag: "DETAIL C",
    name: "Resurface",
    desc: "Notes return on a schedule tuned to forgetting. The right idea resurfaces before it would have gone cold.",
  },
];

const REVISIONS: [string, string, string][] = [
  ["A", "Initial release — capture & search", "2024-03"],
  ["B", "Added link graph & backlinks", "2024-09"],
  ["C", "Added resurfacing engine", "2025-06"],
];

export default function Page3() {
  return (
    <div className="blueprint min-h-screen">
      {/* nav */}
      <header className="border-b border-(--ink)">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="bp-display text-lg tracking-wide">
            COMMONPLACE<span style={{ color: "var(--accent)" }}>®</span>
          </a>
          <nav className="bp-mono hidden items-center gap-7 text-[11px] font-medium tracking-[0.12em] md:flex" style={{ color: "var(--ink-soft)" }}>
            <a href="#specs" className="transition-colors hover:text-(--accent)">SPECIFICATIONS</a>
            <a href="#details" className="transition-colors hover:text-(--accent)">DETAILS</a>
            <a href="#revisions" className="transition-colors hover:text-(--accent)">REVISIONS</a>
          </nav>
          <a href="#start" className="bp-btn bp-btn-solid">Request survey</a>
        </div>
      </header>

      {/* hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-14 pb-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="bp-mono mb-6 text-[11px] font-medium tracking-[0.18em]" style={{ color: "var(--ink-soft)" }}>
              DWG NO. CP-001 · GENERAL ARRANGEMENT
            </p>
            <h1 className="bp-display text-[clamp(2.5rem,5.4vw,4.6rem)] leading-[1.02]">
              Your second brain,
              <br />
              drafted to scale.
            </h1>
            <p className="bp-mono mt-7 max-w-md text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Capture anything. Link everything. Resurface what matters.
              Below: the general arrangement — dimensions not to scale,
              ideas very much so.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#start" className="bp-btn bp-btn-solid">Request a survey</a>
              <a href="#specs" className="bp-btn bp-btn-ghost">See the spec sheet</a>
            </div>
          </div>

          <figure>
            <div className="bp-frame bg-(--sheet-2) p-2">
              <Schematic />
            </div>
            <figcaption className="bp-mono mt-3 flex justify-between text-[10px] tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
              <span>FIG. 1 — THE SECOND BRAIN</span>
              <span>DWG CP-001 · REV C</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* specs */}
      <section id="specs" className="border-t border-(--ink)">
        <div className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="bp-display text-4xl">Specifications</h2>
            <p className="bp-mono text-[11px] tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
              TABLE 1 · PERFORMANCE DATA
            </p>
          </div>
          <div className="bp-frame overflow-hidden bg-(--sheet)">
            {SPECS.map(([k, v], i) => (
              <div
                key={k}
                className={`grid grid-cols-[140px_1fr] items-baseline gap-4 px-6 py-4 md:grid-cols-[200px_1fr] ${i > 0 ? "border-t border-(--hair)" : ""}`}
              >
                <span className="bp-mono text-[11px] font-semibold tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                  {k}
                </span>
                <span className="bp-mono text-[13px] tracking-wide" style={{ color: "var(--ink)" }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* details */}
      <section id="details" className="border-t border-(--ink) bg-(--sheet-2)">
        <div className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="bp-display text-4xl">Details</h2>
            <p className="bp-mono text-[11px] tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
              FIGS. 2–4 · ENLARGED VIEWS
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {DETAILS.map((d, i) => (
              <div key={d.tag} className="bp-frame bg-(--sheet) p-7">
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className="bp-display flex h-10 w-10 items-center justify-center border-2 text-lg"
                    style={{ borderColor: "var(--ink)", background: i === 0 ? "var(--accent)" : "transparent", color: i === 0 ? "var(--sheet)" : "var(--ink)" }}
                  >
                    {"ABC"[i]}
                  </span>
                  <span className="bp-mono text-[10px] tracking-[0.16em]" style={{ color: "var(--ink-soft)" }}>
                    {d.tag}
                  </span>
                </div>
                <h3 className="bp-display text-2xl">{d.name}</h3>
                <p className="bp-mono mt-4 text-[12px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {d.desc}
                </p>
                <svg viewBox="0 0 120 40" className="mt-6 h-12 w-full" aria-hidden="true">
                  <g stroke="var(--ink)" strokeWidth="1" fill="none">
                    <rect x="8" y="14" width="10" height="10" />
                    <rect x="55" y="4" width="10" height="10" />
                    <rect x="102" y="22" width="10" height="10" fill="var(--accent)" stroke="none" />
                    <path d="M18 19 H55 M65 9 H97 M107 27 H60" strokeDasharray="3 3" />
                  </g>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* revisions */}
      <section id="revisions" className="border-t border-(--ink)">
        <div className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="bp-display text-4xl">Revision history</h2>
            <p className="bp-mono text-[11px] tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
              TABLE 2 · CHANGES
            </p>
          </div>
          <div className="bp-frame overflow-hidden">
            {REVISIONS.map(([rev, desc, date], i) => (
              <div
                key={rev}
                className={`grid grid-cols-[60px_1fr_90px] gap-4 px-6 py-4 ${i > 0 ? "border-t border-(--hair)" : ""}`}
              >
                <span className="bp-display text-xl" style={{ color: "var(--accent)" }}>{rev}</span>
                <span className="bp-mono text-[12px] tracking-wide" style={{ color: "var(--ink)" }}>{desc}</span>
                <span className="bp-mono text-right text-[11px]" style={{ color: "var(--ink-soft)" }}>{date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="scroll-mt-8 bg-(--ink) text-(--sheet)">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="bp-frame border-(--sheet) p-10 text-center md:p-16">
            <p className="bp-mono mb-6 text-[11px] tracking-[0.18em]" style={{ color: "var(--accent)" }}>
              STATUS: APPROVED FOR PRODUCTION
            </p>
            <h2 className="bp-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.03]">
              Ready to draft yours?
            </h2>
            <p className="bp-mono mx-auto mt-6 max-w-md text-[13px] leading-relaxed" style={{ color: "var(--sheet-2)" }}>
              Free while in beta. Export the full drawing set anytime —
              your notes are the property you signed for.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#top" className="bp-btn !border-(--sheet) !text-(--sheet) hover:!bg-(--sheet) hover:!text-(--ink)">
                Start the survey — free
              </a>
              <a href="#details" className="bp-btn !border-(--ink-soft) !text-(--sheet-2) hover:!bg-(--sheet-2) hover:!text-(--ink)">
                Review details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-(--ink)">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="bp-display tracking-wide">COMMONPLACE</p>
          <p className="bp-mono text-[10px] tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
            DWG NO. CP-001 · DO NOT SCALE DRAWING · © 2026 COMMONPLACE SYSTEMS
          </p>
          <div className="bp-mono flex gap-6 text-[10px] tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
            <a href="#specs" className="hover:text-(--accent)">SPECIFICATIONS</a>
            <a href="#details" className="hover:text-(--accent)">DETAILS</a>
            <a href="#revisions" className="hover:text-(--accent)">REVISIONS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
