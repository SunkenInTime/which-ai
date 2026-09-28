/** Deterministic geology: wavy layer edges, generated once on the server. */

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = [number, number];

function smooth(pts: Pt[]) {
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

function ridge(seed: number, base: number, amp: number, tilt: number, count = 11, width = 1440): Pt[] {
  const r = rng(seed);
  const pts: Pt[] = [];
  for (let i = 0; i < count; i++) {
    const x = (i / (count - 1)) * width;
    const y = base + (r() - 0.5) * 2 * amp + tilt * (i / (count - 1) - 0.5);
    pts.push([x, y]);
  }
  return pts;
}

/** Closed shape under a wavy ridge; fill it with the colour of the layer below. */
export function edgeFill(seed: number, height = 90, amp = 20, tilt = 0) {
  return `${smooth(ridge(seed, height * 0.45, amp, tilt))} L1440,${height} L0,${height} Z`;
}

/** Open wavy line for the faint bedding planes inside a layer (viewBox 1440 x 100). */
export function beddingLine(seed: number, base: number, amp = 3, tilt = 0) {
  return smooth(ridge(seed, base, amp, tilt, 9));
}
