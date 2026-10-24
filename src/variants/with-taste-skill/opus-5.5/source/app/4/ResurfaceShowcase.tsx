"use client";
/* eslint-disable @next/next/no-img-element -- a pre-sized scan from public/v4 */

import { useState } from "react";
import { EBBINGHAUS, ebbinghausFit } from "./motif";
import s from "./page.module.css";

// The chart: days since you learned it (0–33) across, how much is kept (0–100%) up.
const W = 600;
const H = 280;
const TOP = 14;
const BOTTOM = 236;
const DAYS = 33;
const xAt = (days: number) => (days / DAYS) * W;
const yAt = (kept: number) => BOTTOM - (kept / 100) * (BOTTOM - TOP);
const r1 = (n: number) => Math.round(n * 10) / 10;
const toDays = (minutes: number) => minutes / 1440;

function curve(points: [number, number][]) {
  return points.map(([d, k], i) => `${i ? "L" : "M"}${r1(xAt(d))} ${r1(yAt(k))}`).join(" ");
}

// Ebbinghaus's own fit through his measurements, sampled densely near the start where it falls fastest.
const FIT: [number, number][] = [[0, 100]];
for (let i = 1; i <= 140; i++) {
  const d = DAYS * Math.pow(i / 140, 3);
  FIT.push([d, Math.min(100, ebbinghausFit(Math.max(1, d * 1440)))]);
}

// With Engram (an illustration, not a measurement): the note comes back after a day, a week and a month,
// and each time it is relearned it fades more slowly, as Ebbinghaus found of relearning.
const RETURNS = [1, 7, 30, DAYS];
const SLOW = [1, 0.00045, 0.0000725, 0.00002];
const ENGRAM: [number, number][] = [];
{
  let start = 0;
  RETURNS.forEach((end, n) => {
    for (let i = 0; i <= 60; i++) {
      const d = start + (end - start) * Math.pow(i / 60, n === 0 ? 3 : 1);
      const minutes = (d - start) * 1440 * SLOW[n];
      ENGRAM.push([d, Math.min(100, ebbinghausFit(Math.max(1, 1 + minutes)))]);
    }
    if (end < DAYS) ENGRAM.push([end, 100]);
    start = end;
  });
}

const LABELLED: Record<string, string> = { "1 day": "1 day", "6 days": "6 days", "31 days": "31 days" };

type Plate = { src: string; width: number; height: number };

export default function ResurfaceShowcase({ plate }: { plate: Plate }) {
  const [on, setOn] = useState(true);

  return (
    <section
      className={`${s.showcase} ${on ? s.isOn : s.isOff}`}
      aria-labelledby="showcase-title"
      data-state={on ? "on" : "off"}
    >
      <div className={s.showcaseText}>
        <h2 id="showcase-title" className={s.showcaseTitle} aria-live="polite">
          a month later, it’s{" "}
          <span key={on ? "back" : "gone"} className={s.swapWord}>
            {on ? "back" : "gone"}
          </span>
        </h2>
        <p>
          In 1885 Hermann Ebbinghaus tested his own memory and found that a month after learning something, about a
          fifth of it was left. Engram brings each note back before that happens: after a day, a week and a month, and
          whenever you write something close to it.
        </p>
      </div>

      <figure className={s.chart}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-labelledby="chart-desc">
          <desc id="chart-desc">
            Ebbinghaus’s measurements: 58% kept after 20 minutes, 44% after an hour, 36% after 9 hours, 34% after a
            day, 28% after two days, 25% after six days and 21% after 31 days.
            {on ? " With Engram the note returns after a day, a week and a month, and the curve is lifted back each time." : ""}
          </desc>
          <path className={s.chartEngram} d={curve(ENGRAM)} />
          <path className={s.chartFit} d={curve(FIT)} />
          {EBBINGHAUS.map((p) => (
            <circle key={p.label} className={s.chartDot} cx={r1(xAt(toDays(p.minutes)))} cy={r1(yAt(p.kept))} r={5} />
          ))}
          <text className={s.chartValue} x={26} y={r1(yAt(58.2)) + 5}>
            58% after 20 minutes
          </text>
          {EBBINGHAUS.filter((p) => LABELLED[p.label]).map((p) => (
            <text
              key={p.label}
              className={s.chartValue}
              x={r1(xAt(toDays(p.minutes)))}
              y={r1(yAt(p.kept)) + 26}
              textAnchor={p.label === "31 days" ? "end" : "middle"}
            >
              {Math.round(p.kept)}%
            </text>
          ))}
          {[
            ["0", "you learn it", "start"],
            ["7", "a week", "middle"],
            ["30", "a month", "middle"],
          ].map(([d, label, anchor]) => (
            <text
              key={label}
              className={`${s.chartTick} ${label === "a week" ? s.chartTickWeek : ""}`}
              x={r1(xAt(Number(d)))}
              y={H - 4}
              textAnchor={anchor as "start" | "middle"}
            >
              {label}
            </text>
          ))}
        </svg>
        <figcaption className={s.chartKey}>
          <span className={s.keyFit}>measured by Ebbinghaus, 1885</span>
          <span className={s.keyEngram}>with Engram, an illustration</span>
        </figcaption>
      </figure>

      <figure className={s.plate}>
        <img
          src={plate.src}
          width={plate.width}
          height={plate.height}
          alt="Ebbinghaus’s hand-drawn line chart from 1885, a jagged line plotted over a dashed average"
          loading="lazy"
          decoding="async"
        />
        <figcaption>His own figure, from Über das Gedächtnis, 1885.</figcaption>
      </figure>

      <div className={s.control} data-ui>
        <button type="button" role="switch" aria-checked={on} className={s.switchRow} onClick={() => setOn((v) => !v)}>
          <span className={s.switchLabel}>Resurface old notes</span>
          <span className={s.switchHint}>after a day, a week, a month</span>
          <span className={s.track} aria-hidden="true">
            <span className={s.trackValue}>{on ? "on" : "off"}</span>
            <span className={s.thumb} />
          </span>
        </button>
      </div>
    </section>
  );
}
