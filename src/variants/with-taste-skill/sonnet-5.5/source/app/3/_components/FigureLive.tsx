"use client";

import { useState } from "react";
import { Curve } from "./Curve";
import {
  POINTS,
  RESURFACE_DAYS,
  U,
  U_MAX,
  formatDelay,
  hoursFromU,
  savingsAt,
} from "../_data";
import styles from "../p3.module.css";

const LAST = POINTS[POINTS.length - 1];

function returnsLine(hours: number) {
  const done = RESURFACE_DAYS.filter((d) => d * 24 <= hours + 1e-6);
  const next = RESURFACE_DAYS.find((d) => d * 24 > hours + 1e-6);
  const list = (ds: readonly number[]) =>
    ds.length === 1
      ? `day ${ds[0]}`
      : `days ${ds.slice(0, -1).join(", ")} and ${ds[ds.length - 1]}`;
  if (!done.length) return `Engram would bring it back on day ${next}.`;
  if (!next) return `Engram would have brought it back on ${list(done)}.`;
  return `Engram would have brought it back on ${list(done)}, and next on day ${next}.`;
}

export function FigureLive() {
  const [hours, setHours] = useState(24);
  const result = savingsAt(hours);
  const pastData = hours > LAST.hours + 1e-6;
  const sliderValue = Math.round((U(hours) / U_MAX) * 1000);
  const delay = formatDelay(hours);
  const pct = result ? Math.round(result.pct) : null;

  const valueText = pastData
    ? `${delay} after learning. Ebbinghaus did not measure beyond 31 days. ${returnsLine(hours)}`
    : `${delay} after learning, ${pct} per cent of the effort still saved. ${returnsLine(hours)}`;

  return (
    <>
      <div className={styles.figLeft}>
        <h2 className={styles.h2} data-reveal>
          Drag to any day.
        </h2>
        <p className={styles.lead} data-reveal style={{ ["--d" as string]: "80ms" }}>
          The solid line is what Ebbinghaus measured. The dashed line is where
          Engram would bring a note back.
        </p>
        <div className={styles.readout} data-reveal style={{ ["--d" as string]: "160ms" }}>
          <p className={styles.readTime}>{delay} after you learn it</p>
          <p className={styles.readValue}>
            <span className={styles.readFig} aria-hidden="true">
              {pastData ? "–" : pct}
            </span>
            <span className={styles.readUnit}>
              {pastData
                ? "He did not measure past 31 days."
                : result?.measured
                  ? "per cent of the effort saved. Measured, 1885."
                  : "per cent of the effort saved. Read between two of his measurements."}
            </span>
          </p>
          <p className={styles.readEngram}>{returnsLine(hours)}</p>
        </div>
      </div>

      <div className={styles.figRight} data-reveal style={{ ["--d" as string]: "120ms" }}>
        <Curve
          variant="figure"
          height={420}
          hours={hours}
          onChange={setHours}
          showSchematic
          label="Chart of Ebbinghaus's 1885 savings by delay, falling from 58 per cent after 20 minutes to 21 per cent after 31 days, with a dashed schematic of Engram's returns on days 1, 3, 7, 21 and 60."
        />
        <div className={styles.sliderWrap}>
          <input
            className={styles.slider}
            type="range"
            min={0}
            max={1000}
            step={1}
            value={sliderValue}
            aria-label="Time since you learned it"
            aria-valuetext={valueText}
            onChange={(e) => {
              const u = (Number(e.target.value) / 1000) * U_MAX;
              let h = Math.max(hoursFromU(u), POINTS[0].hours);
              for (const p of POINTS) {
                const pu = U(p.hours);
                if (Math.abs(pu - u) / U_MAX < 0.012) h = p.hours;
              }
              setHours(h);
            }}
          />
        </div>
        <ul className={styles.legend}>
          <li>
            <svg width="36" height="12" aria-hidden="true">
              <line x1="0" y1="6" x2="36" y2="6" className={styles.lgSolid} />
            </svg>
            Measured by Ebbinghaus on himself, 1885
          </li>
          <li>
            <svg width="36" height="12" aria-hidden="true">
              <line x1="0" y1="6" x2="36" y2="6" className={styles.lgDash} />
            </svg>
            Schematic of Engram’s returns. Not measured data.
          </li>
        </ul>
      </div>
    </>
  );
}
