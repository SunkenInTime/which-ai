// The one shape of this page: Ebbinghaus's forgetting curve, and the same curve lifted back up
// each time Engram resurfaces a note (a sawtooth). Everything here returns CSS polygon() strings in
// percentages, so a shape scales with whatever box it masks: the hero mass, a button, a picture, a tab.

/** Hermann Ebbinghaus, Über das Gedächtnis (1885): savings after each interval. */
export const EBBINGHAUS = [
  { label: "20 min", minutes: 20, kept: 58.2 },
  { label: "1 hour", minutes: 60, kept: 44.2 },
  { label: "9 hours", minutes: 528, kept: 35.8 },
  { label: "1 day", minutes: 1440, kept: 33.7 },
  { label: "2 days", minutes: 2880, kept: 27.8 },
  { label: "6 days", minutes: 8640, kept: 25.4 },
  { label: "31 days", minutes: 44640, kept: 21.1 },
] as const;

/** His own fit: b = 100k / ((log t)^c + k), t in minutes, k = 1.84, c = 1.25. */
export function ebbinghausFit(minutes: number) {
  const k = 1.84;
  const c = 1.25;
  const l = Math.log10(Math.max(minutes, 1.0001));
  return (100 * k) / (Math.pow(l, c) + k);
}

const round = (n: number) => Math.round(n * 100) / 100;

/** One tooth: a box whose top edge falls along the curve from its top-left corner to `depth`% at the right. */
export function tooth(depth = 30, steps = 18, tau = 0.3) {
  const norm = 1 - Math.exp(-1 / tau);
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = i / steps;
    const y = (depth * (1 - Math.exp(-x / tau))) / norm;
    pts.push(`${round(x * 100)}% ${round(y)}%`);
  }
  pts.push("100% 100%", "0% 100%");
  return `polygon(${pts.join(", ")})`;
}

export type Tooth = {
  /** where the tooth starts and ends, 0–1 across the box */
  from: number;
  to: number;
  /** retention at the start (1 = all of it) and the level it decays towards */
  peak: number;
  floor: number;
  /** how slowly it decays, as a share of the box width */
  tau: number;
};

/** Engram's curve: Ebbinghaus's fall, then each return lifts it back and it falls more slowly. */
export const ENGRAM_TEETH: Tooth[] = [
  { from: 0, to: 0.3, peak: 1, floor: 0.34, tau: 0.075 },
  { from: 0.3, to: 0.62, peak: 0.95, floor: 0.6, tau: 0.13 },
  { from: 0.62, to: 1, peak: 0.97, floor: 0.78, tau: 0.22 },
];

export function retentionAt(teeth: Tooth[], x: number) {
  const t = teeth.find((th) => x >= th.from && x <= th.to) ?? teeth[teeth.length - 1];
  return t.floor + (t.peak - t.floor) * Math.exp(-(x - t.from) / t.tau);
}

/**
 * The area under a sawtooth as a polygon. Retention r maps to y = top + (1 − r) × depth (in % of the box),
 * so `top`/`depth` decide how much of the box the curve's travel takes.
 */
export function sawtooth(teeth: Tooth[] = ENGRAM_TEETH, { top = 0, depth = 100, steps = 22 } = {}) {
  const y = (r: number) => round(top + (1 - r) * depth);
  const pts: string[] = [`0% 100%`];
  for (const t of teeth) {
    for (let i = 0; i <= steps; i++) {
      const x = t.from + ((t.to - t.from) * i) / steps;
      const r = t.floor + (t.peak - t.floor) * Math.exp(-(x - t.from) / t.tau);
      pts.push(`${round(x * 100)}% ${y(r)}%`);
    }
  }
  pts.push(`100% 100%`);
  return `polygon(${pts.join(", ")})`;
}

/** The same sawtooth as an SVG path in a w × h box (for the chart). */
export function sawtoothPath(teeth: Tooth[], w: number, h: number, steps = 30) {
  let d = "";
  for (const t of teeth) {
    for (let i = 0; i <= steps; i++) {
      const x = t.from + ((t.to - t.from) * i) / steps;
      const r = t.floor + (t.peak - t.floor) * Math.exp(-(x - t.from) / t.tau);
      d += `${d ? "L" : "M"}${round(x * w)} ${round((1 - r) * h)} `;
    }
  }
  return d.trim();
}
