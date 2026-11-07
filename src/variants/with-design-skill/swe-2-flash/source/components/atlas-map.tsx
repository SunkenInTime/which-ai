/* Deterministic wobbly-blob path generator for topo contours. */
function contourPath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  scale: number,
  seed: number,
  points = 56,
): string {
  const a1 = 0.05 + ((seed * 37) % 10) / 100;
  const a2 = 0.04 + ((seed * 53) % 10) / 120;
  const a3 = 0.03 + ((seed * 71) % 10) / 140;
  const s1 = seed * 1.7;
  const s2 = seed * 2.9;
  const s3 = seed * 4.1;
  const pts: string[] = [];
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * Math.PI * 2;
    const wobble =
      1 +
      a1 * Math.sin(3 * t + s1) +
      a2 * Math.sin(5 * t + s2) +
      a3 * Math.sin(2 * t + s3);
    const x = cx + rx * scale * wobble * Math.cos(t);
    const y = cy + ry * scale * wobble * Math.sin(t);
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ") + " Z";
}

function Hill({
  cx,
  cy,
  rx,
  ry,
  count,
  step,
  seed,
  stroke,
  strokeWidth = 1,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  count: number;
  step: number;
  seed: number;
  stroke: string;
  strokeWidth?: number;
}) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={strokeWidth}>
      {Array.from({ length: count }, (_, i) => (
        <path
          key={i}
          d={contourPath(cx, cy, rx, ry, 1 - i * step, seed + i * 3.3)}
        />
      ))}
    </g>
  );
}

const WAYPOINTS: { x: number; y: number; label: string; dx: number; dy: number }[] = [
  { x: 62, y: 366, label: "field office", dx: -8, dy: 18 },
  { x: 138, y: 312, label: "sourdough, 09:12", dx: -30, dy: 22 },
  { x: 214, y: 252, label: "roadmap · Q3", dx: 10, dy: -12 },
  { x: 272, y: 176, label: "Maya's gift", dx: 12, dy: 4 },
  { x: 306, y: 108, label: "Lisbon, someday", dx: -64, dy: -10 },
];

export function AtlasMap() {
  const routeD = WAYPOINTS.map((w, i) => `${i === 0 ? "M" : "L"}${w.x},${w.y}`).join(" ");
  return (
    <svg
      viewBox="0 0 400 420"
      className="block h-auto w-full"
      role="img"
      aria-label="Stylized survey map with contour lines and a route connecting five notes"
    >
      {/* graticule */}
      <g stroke="var(--rule)" strokeWidth="0.75">
        {[80, 160, 240, 320].map((x) => (
          <line key={`v${x}`} x1={x} y1="8" x2={x} y2="412" strokeDasharray="2 5" />
        ))}
        {[84, 168, 252, 336].map((y) => (
          <line key={`h${y}`} x1="8" y1={y} x2="392" y2={y} strokeDasharray="2 5" />
        ))}
      </g>

      {/* hills */}
      <Hill cx={148} cy={138} rx={118} ry={92} count={6} step={0.17} seed={11} stroke="var(--faint)" />
      <Hill cx={318} cy={298} rx={86} ry={70} count={4} step={0.2} seed={47} stroke="var(--faint)" />
      <Hill cx={330} cy={90} rx={52} ry={44} count={3} step={0.24} seed={83} stroke="var(--rule)" strokeWidth={0.75} />

      {/* river */}
      <path
        d="M-10,392 C60,360 90,330 150,318 C210,306 230,340 290,330 C350,320 380,300 410,288"
        fill="none"
        stroke="var(--sage)"
        strokeWidth="1.6"
        opacity="0.8"
      />

      {/* route */}
      <path
        d={routeD}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.8"
        strokeDasharray="6 5"
      />
      {WAYPOINTS.map((w, i) => (
        <g key={i}>
          <rect
            x={w.x - 3.5}
            y={w.y - 3.5}
            width="7"
            height="7"
            fill={i === WAYPOINTS.length - 1 ? "var(--accent)" : "var(--paper)"}
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={w.x + w.dx}
            y={w.y + w.dy}
            fontFamily="var(--font-plex)"
            fontSize="9"
            fill="var(--ink-soft)"
            letterSpacing="0.5"
          >
            {w.label}
          </text>
        </g>
      ))}

      {/* flag at terminus */}
      <g transform="translate(306,108)">
        <line x1="0" y1="0" x2="0" y2="-16" stroke="var(--ink)" strokeWidth="1.6" />
        <path d="M0,-16 L14,-11 L0,-6 Z" fill="var(--accent)" />
      </g>

      {/* compass rose */}
      <g transform="translate(352,52)" stroke="var(--ink)" fill="none">
        <circle r="17" strokeWidth="1" />
        <circle r="12" strokeWidth="0.5" strokeDasharray="1 3" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          const long = i % 2 === 0;
          const r1 = long ? 12 : 14;
          return (
            <line
              key={i}
              x1={Math.cos(a) * r1}
              y1={Math.sin(a) * r1}
              x2={Math.cos(a) * 17}
              y2={Math.sin(a) * 17}
              strokeWidth={long ? 1 : 0.5}
            />
          );
        })}
        <path d="M0,-10 L3,3 L0,1 L-3,3 Z" fill="var(--accent)" stroke="none" />
        <text
          x="0"
          y="-21"
          textAnchor="middle"
          fontFamily="var(--font-plex)"
          fontSize="9"
          fill="var(--ink)"
          stroke="none"
        >
          N
        </text>
      </g>

      {/* edge coordinate labels */}
      <g fontFamily="var(--font-plex)" fontSize="8" fill="var(--faint)" letterSpacing="1">
        <text x="14" y="20">41°52′N</text>
        <text x="14" y="414">41°51′N</text>
        <text x="14" y="212" transform="rotate(-90 14 212)">87°38′W</text>
        <text x="392" y="212" textAnchor="end" transform="rotate(90 392 212)">87°36′W</text>
      </g>

      {/* title block */}
      <g fontFamily="var(--font-plex)" fontSize="8.5" fill="var(--ink-soft)" letterSpacing="1">
        <rect x="8" y="388" width="150" height="24" fill="none" stroke="var(--rule)" />
        <line x1="8" y1="400" x2="158" y2="400" stroke="var(--rule)" />
        <text x="14" y="396">COMMONPLACE SURVEY</text>
        <text x="14" y="410">SHEET 01 · SCALE —</text>
      </g>
    </svg>
  );
}
