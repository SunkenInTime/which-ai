// Grows a pyramidal neuron as SVG paths. Seeded, so the server and the
// browser always agree on the same drawing.

export type Limb = { d: string; w: number; delay: number; dur: number };
export type SpineSet = { d: string; delay: number };
export type Tip = { x: number; y: number; a: number; t: number; region: string };
export type Bouton = { x: number; y: number; t: number };

type Pt = [number, number];

type GrowOptions = {
  region: string;
  wander: number;
  maxDepth: number;
  fork: number;
  shrink: [number, number];
  spines: boolean;
  speed: number;
  heading?: number;
  pull?: number;
};

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => n.toFixed(1);

function pathThrough(pts: Pt[]) {
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(mx)} ${f(my)}`;
  }
  const last = pts[pts.length - 1];
  return `${d}L${f(last[0])} ${f(last[1])}`;
}

export const SOMA = { x: 500, y: 800 };
export const VIEW = { x: 0, y: -260, w: 1000, h: 1560 };
const FLOOR = VIEW.y + VIEW.h;

export function growNeuron(seed: number) {
  const rand = seeded(seed);
  const limbs: Limb[] = [];
  const spines: SpineSet[] = [];
  const tips: Tip[] = [];
  const boutons: Bouton[] = [];

  function addSpines(pts: Pt[], delay: number, w: number) {
    let d = "";
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const dx = x1 - x0;
      const dy = y1 - y0;
      const len = Math.hypot(dx, dy);
      const nx = -dy / len;
      const ny = dx / len;
      const count = Math.max(1, Math.round(len / 8));
      for (let k = 0; k < count; k++) {
        if (rand() < 0.3) continue;
        const u = (k + rand()) / count;
        const side = rand() < 0.5 ? 1 : -1;
        const h = 3 + rand() * 4.5;
        const px = x0 + dx * u + nx * side * w * 0.4;
        const py = y0 + dy * u + ny * side * w * 0.4;
        d += `M${f(px)} ${f(py)}l${f(nx * side * h)} ${f(ny * side * h)}`;
      }
    }
    if (d) spines.push({ d, delay });
  }

  function grow(
    x: number,
    y: number,
    a: number,
    len: number,
    w: number,
    depth: number,
    t0: number,
    o: GrowOptions,
  ) {
    const steps = Math.max(3, Math.round(len / 16));
    const stepLen = len / steps;
    const pts: Pt[] = [[x, y]];
    for (let i = 0; i < steps; i++) {
      a += (rand() - 0.5) * o.wander;
      if (o.heading !== undefined) a += (o.heading - a) * (o.pull ?? 0);
      x += Math.cos(a) * stepLen;
      y += Math.sin(a) * stepLen;
      pts.push([x, y]);
    }
    const dur = len / o.speed;
    limbs.push({ d: pathThrough(pts), w, delay: t0, dur });
    if (o.spines && w <= 4.4) addSpines(pts, t0 + dur * 0.7, w);

    const t1 = t0 + dur;
    if (depth >= o.maxDepth || len < 34) {
      tips.push({ x, y, a, t: t1, region: o.region });
      return;
    }
    const forks = rand() < o.fork ? 2 : 1;
    const lean = (rand() - 0.5) * 0.3;
    for (let k = 0; k < forks; k++) {
      const side = forks === 1 ? (rand() < 0.5 ? -0.3 : 0.3) : k === 0 ? -1 : 1;
      const spread = side * (0.3 + rand() * 0.42) + lean;
      const next = len * (o.shrink[0] + rand() * (o.shrink[1] - o.shrink[0]));
      grow(x, y, a + spread, next, Math.max(1.1, w * 0.7), depth + 1, t1, o);
    }
  }

  const dendrite: Omit<GrowOptions, "region" | "maxDepth"> = {
    wander: 0.5,
    fork: 0.82,
    shrink: [0.62, 0.86],
    spines: true,
    speed: 430,
  };

  // Apical dendrite: one thick trunk climbing from the top of the cell body,
  // throwing off oblique branches, ending in a tuft.
  let ax = SOMA.x;
  let ay = SOMA.y - 46;
  let aa = -Math.PI / 2;
  let at = 0.25;
  const pieces = 6;
  for (let i = 0; i < pieces; i++) {
    const len = 74 + rand() * 24;
    const steps = 5;
    const pts: Pt[] = [[ax, ay]];
    for (let k = 0; k < steps; k++) {
      aa += (rand() - 0.5) * 0.14;
      aa += (-Math.PI / 2 - aa) * 0.3;
      ax += (Math.cos(aa) * len) / steps;
      ay += (Math.sin(aa) * len) / steps;
      pts.push([ax, ay]);
    }
    const dur = len / 430;
    limbs.push({ d: pathThrough(pts), w: 10.5 - i * 1.15, delay: at, dur: dur + 0.02 });
    at += dur;
    if (i < pieces - 1) {
      const side = i % 2 === 0 ? -1 : 1;
      grow(
        ax,
        ay,
        aa + side * (0.95 + rand() * 0.4),
        170 - i * 14 + rand() * 40,
        3.6,
        0,
        at,
        { ...dendrite, region: side < 0 ? "left" : "right", maxDepth: 2 },
      );
    }
  }
  const tuft = [-0.95, -0.34, 0.3, 0.9];
  for (const lean of tuft) {
    grow(ax, ay, aa + lean + (rand() - 0.5) * 0.2, 150 + rand() * 50, 3.8, 0, at, {
      ...dendrite,
      region: "tuft",
      maxDepth: 3,
    });
  }

  // Basal dendrites: a skirt spreading from the base of the cell body.
  const basal: [number, number, number][] = [
    [-0.05, 30, 20],
    [0.72, 22, 34],
    [Math.PI - 0.72, -22, 34],
    [Math.PI + 0.05, -30, 20],
    [Math.PI + 0.62, -20, -6],
  ];
  for (const [angle, ox, oy] of basal) {
    grow(SOMA.x + ox, SOMA.y + oy, angle, 135 + rand() * 45, 5.2, 0, 0.3, {
      ...dendrite,
      region: Math.cos(angle) < 0 ? "left" : "right",
      maxDepth: 3,
      heading: angle,
      pull: 0.06,
    });
  }

  // Axon: thin, smooth, straight down and out of the frame, with collaterals.
  const axonTop = SOMA.y + 62;
  const axonSpeed = 520;
  limbs.push({
    d: `M500 ${axonTop}C503 ${axonTop + 90} 497 ${axonTop + 190} 500 ${axonTop + 290}L500 ${FLOOR}`,
    w: 2.4,
    delay: 0.35,
    dur: (FLOOR - axonTop) / axonSpeed,
  });
  const collaterals: [number, number][] = [
    [1000, 0.42],
    [1170, 0.3],
  ];
  for (const [cy, angle] of collaterals) {
    const before = tips.length;
    grow(500, cy, angle + (Math.cos(angle) > 0 ? 0.5 : -0.5), 150 + rand() * 40, 1.5, 0, 0.35 + (cy - axonTop) / axonSpeed, {
      region: "axon",
      wander: 0.22,
      maxDepth: 1,
      fork: 1,
      shrink: [0.5, 0.7],
      spines: false,
      speed: axonSpeed,
      heading: angle,
      pull: 0.22,
    });
    for (const tip of tips.splice(before)) boutons.push({ x: tip.x, y: tip.y, t: tip.t });
  }

  return { limbs, spines, tips, boutons };
}

/** Picks four well-separated branch tips to carry the figure's letters. */
export function pickLabelled(tips: Tip[]) {
  const by = (list: Tip[], score: (t: Tip) => number) =>
    list.reduce((best, t) => (score(t) > score(best) ? t : best), list[0]);
  const tuftTips = tips.filter((t) => t.region === "tuft");
  const left = tips.filter((t) => t.region === "left");
  const right = tips.filter((t) => t.region === "right");
  return [
    by(tuftTips, (t) => -t.x - t.y * 0.2),
    by(tuftTips, (t) => t.x - t.y * 0.2),
    by(left, (t) => -t.x - Math.abs(t.y - 620) * 0.6),
    by(right, (t) => t.x + t.y * 0.5),
  ];
}
