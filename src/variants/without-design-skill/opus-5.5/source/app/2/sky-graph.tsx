"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import s from "./constellation.module.css";

type Star = {
  title: string;
  date: string;
  x: number;
  y: number;
  mag: number; // visual magnitude: 1 (bright) .. 3 (faint)
};

const W = 1200;
const H = 560;

const STARS: Star[] = [
  { title: "Daily — Tue 22 Sep 2026", date: "today, 07:48", x: 604, y: 286, mag: 1 },
  { title: "Lisbon offsite — budget", date: "2 Sep 2026", x: 430, y: 186, mag: 1 },
  { title: "Offsite venue shortlist", date: "28 Aug 2026", x: 330, y: 118, mag: 2 },
  { title: "Call w/ Inês — catering", date: "4 Sep 2026", x: 306, y: 238, mag: 2 },
  { title: "Q4 planning — three themes", date: "11 Sep 2026", x: 528, y: 104, mag: 2 },
  { title: "Team retro, August", date: "30 Aug 2026", x: 470, y: 318, mag: 3 },
  { title: "The Extended Mind — A. M. Paul", date: "14 Jul 2026", x: 812, y: 150, mag: 1 },
  { title: "Notes on “Tools for Thought”", date: "3 Jun 2026", x: 912, y: 226, mag: 2 },
  { title: "Zettelkasten, honestly", date: "19 Apr 2025", x: 756, y: 246, mag: 2 },
  { title: "Quote — Vannevar Bush, 1945", date: "8 Jul 2026", x: 968, y: 112, mag: 3 },
  { title: "Memex, but it files itself?", date: "16 Sep 2026", x: 868, y: 330, mag: 2 },
  { title: "Long run — 18 km, easy", date: "13 Sep 2026", x: 222, y: 404, mag: 2 },
  { title: "Knee: left, lateral, again", date: "17 May 2026", x: 150, y: 470, mag: 2 },
  { title: "Physio — Dr. Okafor", date: "24 May 2026", x: 286, y: 496, mag: 3 },
  { title: "Sleep log, September", date: "21 Sep 2026", x: 376, y: 424, mag: 3 },
  { title: "San Marzano, week 14", date: "6 Aug 2026", x: 822, y: 454, mag: 2 },
  { title: "First frost dates", date: "1 Sep 2026", x: 948, y: 482, mag: 3 },
  { title: "Compost ratios that worked", date: "12 Oct 2025", x: 1016, y: 398, mag: 3 },
  { title: "Seed order — Real Seeds", date: "20 Feb 2026", x: 726, y: 506, mag: 3 },
  { title: "Idea: a quieter calendar", date: "18 Sep 2026", x: 642, y: 424, mag: 2 },
  { title: "Why I stopped using folders", date: "9 Mar 2024", x: 690, y: 176, mag: 1 },
  { title: "Voice memo — walking home, 23:10", date: "20 Sep 2026", x: 540, y: 476, mag: 3 },
  { title: "Mum’s 70th — ideas", date: "15 Sep 2026", x: 1084, y: 262, mag: 2 },
  { title: "Books to reread", date: "2 Jan 2026", x: 1060, y: 150, mag: 3 },
  { title: "Recipe: miso aubergine", date: "27 Aug 2026", x: 1108, y: 470, mag: 3 },
  { title: "Lecture — memory palaces", date: "22 Sep 2025", x: 1000, y: 318, mag: 3 },
  { title: "Kyoto, day 4 — onsen rules", date: "22 Sep 2025", x: 118, y: 302, mag: 2 },
  { title: "Kyoto — reading list", date: "10 Sep 2025", x: 64, y: 214, mag: 3 },
  { title: "Hiring — design lead", date: "7 Sep 2026", x: 186, y: 150, mag: 2 },
  { title: "Interview: Priya S.", date: "15 Sep 2026", x: 96, y: 92, mag: 3 },
  { title: "1:1 — Marco", date: "21 Sep 2026", x: 250, y: 58, mag: 3 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 4], [0, 5], [0, 19], [0, 20], [0, 14], [0, 8],
  [1, 2], [1, 3], [1, 4], [2, 3], [4, 20], [5, 1],
  [6, 7], [6, 8], [6, 9], [7, 9], [7, 10], [8, 20], [6, 20], [10, 25],
  [11, 12], [12, 13], [11, 14], [13, 11],
  [15, 16], [15, 18], [16, 17], [15, 17],
  [19, 21], [22, 23], [22, 24], [23, 9], [25, 7],
  [26, 27], [26, 25], [28, 29], [28, 30], [28, 2], [30, 4],
];

// Links Mneme "discovers" while you watch.
const SUGGESTED: { edge: [number, number]; reason: string }[] = [
  { edge: [21, 10], reason: "both mention “a memex that files itself”" },
  { edge: [19, 14], reason: "both circle back to protecting evenings" },
  { edge: [24, 22], reason: "Mum asked for the aubergine recipe" },
  { edge: [12, 11], reason: "knee pain after runs over 16 km" },
  { edge: [26, 0], reason: "one year ago today" },
];

// Deterministic background dust
function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = seeded(22);
const DUST = Array.from({ length: 140 }, () => ({
  x: rand() * W,
  y: rand() * H,
  r: rand() * 0.9 + 0.3,
  d: rand() * 6,
}));

function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
}

const slug = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 26)
    .replace(/-$/, "");

const edgeKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);

export function SkyGraph() {
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [sIdx, setSIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = 0;
    const start = performance.now();
    const loop = (now: number) => {
      if (now - last > 33) {
        last = now;
        setT((now - start) / 1000);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    const id = window.setInterval(() => setSIdx((i) => (i + 1) % SUGGESTED.length), 5200);
    return () => window.clearInterval(id);
  }, []);

  const pos = useMemo(
    () =>
      STARS.map((n, i) => ({
        x: n.x + Math.sin(t * (0.21 + (i % 5) * 0.035) + i * 1.7) * (4 + (i % 3) * 1.5),
        y: n.y + Math.cos(t * (0.17 + (i % 4) * 0.04) + i * 2.3) * (3 + (i % 4)),
      })),
    [t],
  );

  const suggestion = SUGGESTED[sIdx];
  const [sa, sb] = suggestion.edge;

  const neighbours = useMemo(() => {
    if (active === null) return null;
    const set = new Set<number>([active]);
    for (const [a, b] of EDGES) {
      if (a === active) set.add(b);
      if (b === active) set.add(a);
    }
    if (sa === active) set.add(sb);
    if (sb === active) set.add(sa);
    return set;
  }, [active, sa, sb]);

  const linkCount = active === null ? 0 : (neighbours?.size ?? 1) - 1;
  const activeStar = active === null ? null : STARS[active];
  const activePos = active === null ? null : pos[active];
  const mid = { x: (pos[sa].x + pos[sb].x) / 2, y: (pos[sa].y + pos[sb].y) / 2 };

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full overflow-visible"
        role="group"
        aria-label="An animated knowledge graph of 31 sample notes. Each star is a note; each line is a link between two notes."
        onPointerLeave={() => setActive(null)}
      >
        <defs>
          <radialGradient id="sg-halo">
            <stop offset="0%" stopColor="#f6e2b3" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#f2d9a0" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f2d9a0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sg-halo-cool">
            <stop offset="0%" stopColor="#cfdcff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#cfdcff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g aria-hidden="true">
          {DUST.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill="#c9d4f0"
              className={i % 3 === 0 ? s.twinkle : undefined}
              style={{ animationDelay: `${d.d}s`, opacity: 0.35 }}
            />
          ))}
        </g>

        <g aria-hidden="true">
          {EDGES.map(([a, b], i) => {
            const lit = neighbours && neighbours.has(a) && neighbours.has(b) && (a === active || b === active);
            const dim = neighbours && !lit;
            return (
              <line
                key={edgeKey(a, b)}
                x1={pos[a].x}
                y1={pos[a].y}
                x2={pos[b].x}
                y2={pos[b].y}
                pathLength={1}
                stroke={lit ? "#f2d9a0" : "#9fb2e0"}
                strokeOpacity={lit ? 0.85 : dim ? 0.06 : 0.2}
                strokeWidth={lit ? 1.4 : 1}
                className={s.edgeDraw}
                style={{ animationDelay: `${0.3 + i * 0.045}s`, transition: "stroke-opacity .3s, stroke .3s" }}
              />
            );
          })}

          <line
            key={`sugg-${sIdx}`}
            x1={pos[sa].x}
            y1={pos[sa].y}
            x2={pos[sb].x}
            y2={pos[sb].y}
            pathLength={1}
            stroke="#f2d9a0"
            strokeOpacity={neighbours && !(neighbours.has(sa) && neighbours.has(sb)) ? 0.15 : 0.9}
            strokeWidth={1.3}
            className={s.suggested}
          />
        </g>

        {STARS.map((n, i) => {
          const p = pos[i];
          const r = n.mag === 1 ? 4.2 : n.mag === 2 ? 3.1 : 2.3;
          const isActive = active === i;
          const dim = neighbours ? !neighbours.has(i) : false;
          const isSugg = i === sa || i === sb;
          return (
            <g
              key={i}
              transform={`translate(${p.x} ${p.y})`}
              tabIndex={0}
              role="button"
              aria-label={`${n.title}, ${n.date}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(i)}
              className="cursor-pointer outline-none"
              style={{ opacity: dim ? 0.22 : 1, transition: "opacity .35s" }}
            >
              <circle r={22} fill="transparent" />
              <circle
                r={r * (isActive ? 9 : n.mag === 1 ? 6 : 4.5)}
                fill={isActive || isSugg ? "url(#sg-halo)" : "url(#sg-halo-cool)"}
                style={{ transition: "r .3s" }}
              />
              {isActive && (
                <circle r={r * 3.2} fill="none" stroke="#f2d9a0" strokeOpacity={0.6} strokeWidth={0.8} />
              )}
              <circle r={isActive ? r + 1.2 : r} fill={isActive || isSugg ? "#fbecc6" : "#eef2ff"} />
            </g>
          );
        })}

        {/* constant labels on the brightest stars, for large screens */}
        <g aria-hidden="true" className="hidden md:block">
          {STARS.map((n, i) =>
            n.mag === 1 && active === null ? (
              <text
                key={i}
                x={pos[i].x + 12}
                y={pos[i].y - 10}
                fill="#aab4cc"
                fontSize={11}
                className={`${s.mono} ${s.fadeIn}`}
                style={{ animationDelay: "2.2s" }}
              >
                {n.title}
              </text>
            ) : null,
          )}
        </g>
      </svg>

      {/* suggestion ticker */}
      <div
        key={`tick-${sIdx}`}
        className={`pointer-events-none absolute hidden -translate-x-1/2 sm:block ${s.fadeIn}`}
        style={{ left: `${(mid.x / W) * 100}%`, top: `${(mid.y / H) * 100}%`, animationDelay: "1.2s" }}
        aria-hidden="true"
      >
        <div
          className={`${s.mono} mt-3 whitespace-nowrap rounded-full border border-[#f2d9a0]/25 bg-[#0a0f1f]/85 px-2.5 py-1 text-[10.5px] tracking-wide text-[#f2d9a0] transition-opacity`}
          style={{ opacity: active === null ? 1 : 0 }}
        >
          + link suggested · {suggestion.reason}
        </div>
      </div>

      {/* hover card */}
      {activeStar && activePos && (
        <div
          className="pointer-events-none absolute z-10"
          style={{
            left: `${(activePos.x / W) * 100}%`,
            top: `${(activePos.y / H) * 100}%`,
            transform: `translate(${activePos.x > W * 0.62 ? "calc(-100% - 18px)" : "18px"}, -50%)`,
          }}
          role="status"
        >
          <div className={`${s.glass} w-60 rounded-xl px-4 py-3`}>
            <p className={`${s.mono} text-[10.5px] uppercase tracking-[0.14em] text-[#8f9ab4]`}>
              {activeStar.date}
            </p>
            <p className="mt-1 text-[15px] leading-snug font-medium text-white">{activeStar.title}</p>
            <p className={`${s.mono} mt-2 text-[10.5px] text-[#f2d9a0]`}>
              {linkCount} {linkCount === 1 ? "link" : "links"} · {slug(activeStar.title)}.md
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
