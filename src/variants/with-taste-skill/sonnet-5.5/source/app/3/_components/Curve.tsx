"use client";

import { useEffect, useRef, useState } from "react";
import {
  AXIS_MAX_HOURS,
  POINTS,
  RESURFACE_DAYS,
  U,
  U_MAX,
  U_MIN,
  hoursFromU,
  schematicPath,
} from "../_data";
import styles from "../p3.module.css";

type Props = {
  /** cover: ink tile, every point labelled. figure: yellow page, one marker you move. */
  variant: "cover" | "figure";
  height: number;
  /** Selected delay in hours (figure only). */
  hours?: number;
  onChange?: (hours: number) => void;
  showSchematic?: boolean;
  label: string;
};

const TICKS = [
  { hours: 1, text: "1 hour", cover: true, figure: true },
  { hours: 24, text: "1 day", cover: true, figure: true },
  { hours: 24 * 7, text: "1 week", cover: true, figure: true },
  { hours: 24 * 31, text: "1 month", cover: true, figure: false },
  { hours: 24 * 60, text: "2 months", cover: false, figure: true },
];
const Y_TICKS = [0, 25, 50, 75, 100];

export function Curve({
  variant,
  height: heightProp,
  hours,
  onChange,
  showSchematic = false,
  label,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(760);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setW(Math.max(260, Math.round(el.clientWidth)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cover = variant === "cover";
  const height = w < 480 && !cover ? 340 : heightProp;
  const padL = 54;
  const padR = cover ? 20 : 12;
  const padT = cover ? 28 : 40;
  const padB = 38;
  const plotW = w - padL - padR;
  const plotH = height - padT - padB;
  const x = (h: number) => padL + (U(h) / U_MAX) * plotW;
  const y = (pct: number) => padT + (1 - pct / 100) * plotH;

  const line = POINTS.map((p, i) => `${i ? "L" : "M"}${x(p.hours).toFixed(1)} ${y(p.pct).toFixed(1)}`).join("");
  const sch = showSchematic
    ? schematicPath()
        .map((p, i) => `${i ? "L" : "M"}${x(p.hours).toFixed(1)} ${y(p.pct).toFixed(1)}`)
        .join("")
    : "";

  function fromPointer(e: React.PointerEvent<SVGSVGElement>) {
    if (!onChange) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * w;
    let u = ((px - padL) / plotW) * U_MAX;
    u = Math.min(U_MAX, Math.max(U_MIN, u));
    let h = hoursFromU(u);
    for (const p of POINTS) {
      if (Math.abs(x(p.hours) - px) < 9) h = p.hours;
    }
    onChange(h);
  }

  const interactive = Boolean(onChange);
  const marker = hours != null ? hours : null;

  return (
    <div ref={box} className={styles.curveBox} data-variant={variant}>
      <svg
        className={styles.curve}
        width={w}
        height={height}
        viewBox={`0 0 ${w} ${height}`}
        role="img"
        aria-label={label}
        data-interactive={interactive || undefined}
        onPointerDown={(e) => {
          if (!interactive) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => {
          if (interactive && e.buttons) fromPointer(e);
        }}
      >
        {Y_TICKS.map((t) => (
          <g key={t}>
            <line className={styles.cGrid} x1={padL} x2={w - padR} y1={y(t)} y2={y(t)} />
            <text className={styles.cTick} x={padL - 10} y={y(t) + 5} textAnchor="end">
              {t}%
            </text>
          </g>
        ))}
        {TICKS.filter((t) => (cover ? t.cover : t.figure)).filter((t) => w > 520 || t.hours !== 24 * 7).map((t) => (
          <text
            key={t.hours}
            className={styles.cTick}
            x={x(t.hours)}
            y={height - 10}
            textAnchor={t.hours === AXIS_MAX_HOURS ? "end" : "middle"}
          >
            {t.text}
          </text>
        ))}

        {showSchematic && (
          <>
            <path className={styles.cSchematic} d={sch} />
            {RESURFACE_DAYS.map((d) => (
              <rect
                key={d}
                className={styles.cReturn}
                x={x(d * 24) - 4}
                y={y(100) - 4}
                width={8}
                height={8}
                transform={`rotate(45 ${x(d * 24)} ${y(100)})`}
              />
            ))}
          </>
        )}

        <path className={styles.cLine} d={line} pathLength={1} />
        {POINTS.map((p, i) => (
          <g key={p.hours} className={styles.cPoint} style={{ ["--i" as string]: i }}>
            <rect className={styles.cDot} x={x(p.hours) - 4.5} y={y(p.pct) - 4.5} width={9} height={9} />
            {cover && (
              <text
                className={styles.cValue}
                x={x(p.hours) + (i === 0 ? 10 : 9)}
                y={y(p.pct) - 11}
                textAnchor={i === POINTS.length - 1 ? "end" : "start"}
              >
                {p.pct}
              </text>
            )}
          </g>
        ))}

        {marker != null && (
          <g className={styles.cMarker}>
            <line x1={x(marker)} x2={x(marker)} y1={padT - 8} y2={padT + plotH} />
            <rect x={x(marker) - 6} y={padT - 14} width={12} height={12} />
          </g>
        )}
      </svg>
    </div>
  );
}
