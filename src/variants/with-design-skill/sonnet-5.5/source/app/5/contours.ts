/**
 * Contour lines for the hero map, computed once on the server.
 * Blue: how many notes live in each place. Pink: what got attention this week.
 */
import { H, W, places } from "./places";

type Pt = [number, number];

function hash(ix: number, iy: number, seed: number) {
  let h = (ix * 374761393 + iy * 668265263 + seed * 2246822519) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const ease = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function vnoise(x: number, y: number, seed: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = ease(x - x0);
  const fy = ease(y - y0);
  return mix(
    mix(hash(x0, y0, seed), hash(x0 + 1, y0, seed), fx),
    mix(hash(x0, y0 + 1, seed), hash(x0 + 1, y0 + 1, seed), fx),
    fy,
  );
}

function fbm(x: number, y: number, seed: number) {
  return (
    0.6 * vnoise(x / 210, y / 210, seed) +
    0.3 * vnoise(x / 95, y / 95, seed + 1) +
    0.1 * vnoise(x / 45, y / 45, seed + 2)
  );
}

function elevation(x: number, y: number) {
  let e = 0;
  for (const p of places) {
    const s = 55 + p.notes * 1.55;
    const dx = x - p.x;
    const dy = y - p.y;
    e += (p.notes / 61) * Math.exp(-(dx * dx + dy * dy) / (2 * s * s));
  }
  return e + (fbm(x, y, 7) - 0.5) * 0.24;
}

function heat(x: number, y: number) {
  let e = 0;
  for (const p of places) {
    const s = 42 + p.notes * 1.05;
    const dx = x - p.x;
    const dy = y - p.y;
    e += p.heat * Math.exp(-(dx * dx + dy * dy) / (2 * s * s));
  }
  return e + (fbm(x + 400, y + 130, 21) - 0.5) * 0.2;
}

const STEP = 11;
const COLS = Math.ceil(W / STEP);
const ROWS = Math.ceil(H / STEP);

function sample(fn: (x: number, y: number) => number) {
  const grid: number[][] = [];
  for (let j = 0; j <= ROWS; j++) {
    const row: number[] = [];
    for (let i = 0; i <= COLS; i++) row.push(fn(i * STEP, j * STEP));
    grid.push(row);
  }
  return grid;
}

/** Marching squares, then chain the segments into polylines. */
function contour(field: number[][], level: number): Pt[][] {
  const pos = new Map<string, Pt>();
  const adj = new Map<string, string[]>();
  const link = (a: string, b: string) => {
    if (!adj.has(a)) adj.set(a, []);
    if (!adj.has(b)) adj.set(b, []);
    adj.get(a)!.push(b);
    adj.get(b)!.push(a);
  };
  const t = (v0: number, v1: number) => (level - v0) / (v1 - v0);

  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      const tl = field[j][i];
      const tr = field[j][i + 1];
      const br = field[j + 1][i + 1];
      const bl = field[j + 1][i];
      const idx =
        (tl >= level ? 8 : 0) | (tr >= level ? 4 : 0) | (br >= level ? 2 : 0) | (bl >= level ? 1 : 0);
      if (idx === 0 || idx === 15) continue;
      const x0 = i * STEP;
      const y0 = j * STEP;

      const edge = (name: "top" | "right" | "bottom" | "left") => {
        let id: string;
        let p: Pt;
        if (name === "top") {
          id = `h${i},${j}`;
          p = [x0 + STEP * t(tl, tr), y0];
        } else if (name === "bottom") {
          id = `h${i},${j + 1}`;
          p = [x0 + STEP * t(bl, br), y0 + STEP];
        } else if (name === "left") {
          id = `v${i},${j}`;
          p = [x0, y0 + STEP * t(tl, bl)];
        } else {
          id = `v${i + 1},${j}`;
          p = [x0 + STEP, y0 + STEP * t(tr, br)];
        }
        pos.set(id, p);
        return id;
      };
      const seg = (a: "top" | "right" | "bottom" | "left", b: "top" | "right" | "bottom" | "left") =>
        link(edge(a), edge(b));

      const centre = (tl + tr + br + bl) / 4 >= level;
      switch (idx) {
        case 1: seg("left", "bottom"); break;
        case 2: seg("bottom", "right"); break;
        case 3: seg("left", "right"); break;
        case 4: seg("top", "right"); break;
        case 5:
          if (centre) { seg("left", "top"); seg("bottom", "right"); }
          else { seg("top", "right"); seg("left", "bottom"); }
          break;
        case 6: seg("top", "bottom"); break;
        case 7: seg("top", "left"); break;
        case 8: seg("top", "left"); break;
        case 9: seg("top", "bottom"); break;
        case 10:
          if (centre) { seg("top", "right"); seg("left", "bottom"); }
          else { seg("top", "left"); seg("bottom", "right"); }
          break;
        case 11: seg("top", "right"); break;
        case 12: seg("left", "right"); break;
        case 13: seg("bottom", "right"); break;
        case 14: seg("left", "bottom"); break;
      }
    }
  }

  const lines: Pt[][] = [];
  const seen = new Set<string>();
  const walk = (start: string, close: boolean) => {
    const pts: Pt[] = [];
    let prev: string | null = null;
    let cur: string | undefined = start;
    while (cur && !seen.has(cur)) {
      seen.add(cur);
      pts.push(pos.get(cur)!);
      const from: string = cur;
      const next: string | undefined = adj.get(from)!.find((n) => n !== prev && !seen.has(n));
      prev = from;
      cur = next;
    }
    if (close && pts.length > 2) pts.push(pts[0]);
    return pts;
  };
  for (const [k, v] of adj) if (v.length === 1 && !seen.has(k)) lines.push(walk(k, false));
  for (const [k] of adj) if (!seen.has(k)) lines.push(walk(k, true));
  return lines.filter((l) => l.length > 3);
}

/** Half-pixel precision keeps the path data small without visible steps. */
const f = (n: number) => {
  const r = Math.round(n * 2) / 2;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
};

/** Smooth path through the midpoints of the polyline. */
function toPath(pts: Pt[]) {
  const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const m0 = mid(pts[0], pts[1]);
  const parts: string[] = [];
  // One Q command with repeated coordinate sets; the command letter is implied after the first.
  for (let k = 1; k < pts.length - 1; k++) {
    const m = mid(pts[k], pts[k + 1]);
    parts.push(`${f(pts[k][0])} ${f(pts[k][1])} ${f(m[0])} ${f(m[1])}`);
  }
  const last = pts[pts.length - 1];
  return `M${f(pts[0][0])} ${f(pts[0][1])}L${f(m0[0])} ${f(m0[1])}Q${parts.join(" ")}L${f(last[0])} ${f(last[1])}`;
}

function build(fn: (x: number, y: number) => number, levels: number[]) {
  const grid = sample(fn);
  return levels.map((lv) => contour(grid, lv).map(toPath).join(""));
}

const blueLevels = Array.from({ length: 15 }, (_, i) => 0.07 + i * 0.065);
const pinkLevels = [0.22, 0.4, 0.58, 0.76, 0.94];

const blue = build(elevation, blueLevels);
const pink = build(heat, pinkLevels);

export const contours = {
  /** Every fourth line is drawn heavier, like index contours on a survey map. */
  blueMinor: blue.filter((_, i) => i % 4 !== 0).join(""),
  blueMajor: blue.filter((_, i) => i % 4 === 0).join(""),
  pink: pink.join(""),
};
