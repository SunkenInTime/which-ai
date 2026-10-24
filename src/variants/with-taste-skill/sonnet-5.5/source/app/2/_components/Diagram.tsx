import { CELL_PATH } from "./Cell";
import s from "../p2.module.css";

/* Many notes, one brain: the same 150 cells, loose, then pulled into a ribbon, then fanned into rows. */

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Dot = { x: number; y: number; size: number; angle: number; tone: "a" | "b" | "ribbon" | "ink" };

const EAST = -135; // base cell has its reach at the south-west; this turns it to point east

function build(): Dot[] {
  const r = rng(1852);
  const dots: Dot[] = [];

  // Left third: loose, every way up, in two pale tones.
  const pts: [number, number][] = [];
  let guard = 0;
  while (pts.length < 42 && guard++ < 4000) {
    const x = 14 + r() * 372;
    const y = 14 + r() * 242;
    if (pts.every(([px, py]) => Math.hypot(px - x, py - y) > 30)) pts.push([x, y]);
  }
  pts.forEach(([x, y], i) =>
    dots.push({ x, y, size: 15 + r() * 7, angle: r() * 360, tone: i % 2 ? "a" : "b" }),
  );

  // Middle third: a tight ribbon, three cells high, leaning the same way.
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 20; col++) {
      dots.push({
        x: 410 + col * 19.5,
        y: 135 + (row - 1) * 18,
        size: 16,
        angle: EAST + (r() - 0.5) * 50,
        tone: "ribbon",
      });
    }
  }

  // Right third: the ribbon fans out into rows of even spacing.
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 10; col++) {
      const x = 828 + col * 36;
      const spread = 18 + ((x - 800) / 400) * 40;
      dots.push({ x, y: 135 + (row - 2) * spread, size: 18, angle: EAST, tone: "ink" });
    }
  }
  return dots;
}

const DOTS = build();

function Plate({ vertical }: { vertical?: boolean }) {
  return (
    <svg
      className={vertical ? s.diagramV : s.diagramH}
      viewBox={vertical ? "0 0 270 1200" : "0 0 1200 270"}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={vertical ? "translate(270 0) rotate(90)" : undefined}>
        {DOTS.map((d, i) => (
          <g
            key={i}
            transform={`translate(${d.x.toFixed(1)} ${d.y.toFixed(1)}) rotate(${d.angle.toFixed(0)}) scale(${(d.size / 24).toFixed(3)}) translate(-12 -12)`}
          >
            <path
              d={CELL_PATH}
              className={`${s.dot} ${s[`dot_${d.tone}`]}`}
              style={{ ["--i" as string]: i }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Diagram() {
  return (
    <section className={s.how} id="how" aria-labelledby="how-h">
      <div className={s.howIntro}>
        <h2 id="how-h" className={s.head} data-rv="" style={{ ["--d" as string]: 0 }}>
          Many notes, one brain
        </h2>
        <p className={s.body} data-rv="" style={{ ["--d" as string]: 1 }}>
          Notes arrive scattered. Engram lines them up by what they mean, then gives them back in order.
        </p>
      </div>

      <div className={s.howBody}>
        <div className={s.howPlate} data-dots="" data-rv="">
          <Plate />
          <Plate vertical />
        </div>
        <ol className={s.howSteps}>
          <li className={s.howStep}>
            <h3>Capture</h3>
            <p>
              Anything you jot, clip, forward or say becomes a note. Nothing is sorted on the way in.
            </p>
          </li>
          <li className={s.howStep}>
            <h3>Connect</h3>
            <p>
              Type [[ to link by hand. Engram suggests the rest and links nothing without you.
            </p>
          </li>
          <li className={s.howStep}>
            <h3>Recall</h3>
            <p>
              Search by meaning, ask your notes, or let old ones come back on their own.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
