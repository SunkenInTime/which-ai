import { ENGRAM_TEETH, retentionAt } from "./motif";
import s from "./page.module.css";

const LETTERS = ["e", "n", "g", "r", "a", "m"];
const GAP = 4;
const round = (n: number) => Math.round(n * 10) / 10;

/** Height of a block at x (0–1 across the whole name): the curve, mapped so its lowest point is 60%. */
const heightAt = (x: number) => {
  const r = retentionAt(ENGRAM_TEETH, Math.min(Math.max(x, 0.0001), 0.9999));
  return 0.6 + ((r - 0.34) / (1 - 0.34)) * 0.4;
};

type Row = { letters: number[]; y: number; h: number };

function blocks(width: number, rows: Row[], perRow: number) {
  const bw = (width - GAP * (perRow - 1)) / perRow;
  return rows.flatMap((row) =>
    row.letters.map((li, k) => {
      const x0 = k * (bw + GAP);
      const from = li / LETTERS.length;
      const to = (li + 1) / LETTERS.length;
      const pts: string[] = [];
      for (let i = 0; i <= 10; i++) {
        // stop just short of the ends so a block never takes the next tooth's peak
        const f = Math.min(Math.max(i / 10, 0.002), 0.998);
        const hx = heightAt(from + (to - from) * f);
        pts.push(`${round(x0 + bw * (i / 10))},${round(row.y + row.h * (1 - hx))}`);
      }
      pts.push(`${round(x0 + bw)},${row.y + row.h}`, `${round(x0)},${row.y + row.h}`);
      const size = Math.min(row.h * 0.72, bw * 0.95);
      return { key: `${li}`, points: pts.join(" "), letter: LETTERS[li], cx: round(x0 + bw / 2), base: round(row.y + row.h - size * 0.2), size: round(size) };
    }),
  );
}

const WIDE = { w: 1376, h: 344 };
const NARROW = { w: 358, h: 252 };
const wide = blocks(WIDE.w, [{ letters: [0, 1, 2, 3, 4, 5], y: 0, h: WIDE.h }], 6);
const narrow = blocks(
  NARROW.w,
  [
    { letters: [0, 1, 2], y: 0, h: (NARROW.h - GAP) / 2 },
    { letters: [3, 4, 5], y: (NARROW.h + GAP) / 2, h: (NARROW.h - GAP) / 2 },
  ],
  3,
);

/** The footer's mark: each letter knocked out of a block whose top edge is the stretch of the curve above it. */
export default function Mark() {
  return (
    <div className={s.mark}>
      {[
        { set: wide, box: WIDE, cls: s.markWide },
        { set: narrow, box: NARROW, cls: s.markNarrow },
      ].map(({ set, box, cls }) => (
        <svg key={cls} className={cls} viewBox={`0 0 ${box.w} ${box.h}`} role="img" aria-label="engram">
          {set.map((b) => (
            <g key={b.key}>
              <polygon points={b.points} />
              <text x={b.cx} y={b.base} fontSize={b.size} textAnchor="middle">
                {b.letter}
              </text>
            </g>
          ))}
        </svg>
      ))}
    </div>
  );
}
