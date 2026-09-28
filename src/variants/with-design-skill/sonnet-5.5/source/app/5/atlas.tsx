"use client";

import { useState } from "react";
import { H, W, byId, places, roads } from "./places";
import s from "./page.module.css";

const radius = (notes: number) => 4.5 + Math.sqrt(notes) * 0.85;

function roadPath(a: string, b: string) {
  const p = byId(a);
  const q = byId(b);
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy);
  const bend = (a.length + b.length) % 2 ? 0.12 : -0.12;
  const cx = (p.x + q.x) / 2 - (dy / len) * len * bend;
  const cy = (p.y + q.y) / 2 + (dx / len) * len * bend;
  return `M${p.x} ${p.y}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${q.x} ${q.y}`;
}

/**
 * The interactive layer over the generated contours: places, roads, a caption.
 * The title panel and the contours come in as server-rendered slots.
 */
export function Atlas({
  contours,
  cartouche,
}: {
  contours: React.ReactNode;
  cartouche: React.ReactNode;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const activeId = hover ?? pinned;
  const active = activeId ? byId(activeId) : null;

  const toggle = (id: string) => setPinned((cur) => (cur === id ? null : id));

  return (
    <>
      <div className={s.mapWrap}>
        <div className={`${s.frame} ${s.cartouche}`}>{cartouche}</div>

        <div className={s.sheet}>
          {contours}
          <svg
            className={s.overlay}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid slice"
            role="group"
            aria-label="Map of the places in your notes"
          >
            <g className={s.roads}>
              {roads.map(([a, b]) => {
                const on = activeId === a || activeId === b;
                return (
                  <path
                    key={`${a}-${b}`}
                    d={roadPath(a, b)}
                    data-on={on ? "true" : undefined}
                    data-off={activeId && !on ? "true" : undefined}
                  />
                );
              })}
            </g>
            {places.map((p) => {
              const r = radius(p.notes);
              return (
                <g
                  key={p.id}
                  className={s.place}
                  transform={`translate(${p.x} ${p.y})`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={pinned === p.id}
                  aria-label={`${p.name}, ${p.notes} notes`}
                  data-active={activeId === p.id ? "true" : undefined}
                  onMouseEnter={() => setHover(p.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(p.id)}
                  onBlur={() => setHover(null)}
                  onClick={() => toggle(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(p.id);
                    }
                  }}
                >
                  <circle className={s.hit} r={38} />
                  <circle className={s.focusRing} r={r + 13} />
                  {p.heat > 0.4 && <circle className={s.heatRing} r={r + 6} />}
                  <circle className={s.dot} r={r} />
                  <text className={s.label} x={r + 10} y={6}>
                    {p.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className={s.under}>
          <div className={`${s.frame} ${s.info}`} aria-live="polite">
            {active ? (
              <>
                <p className={s.infoName}>{active.name}</p>
                <p>
                  {active.notes} notes, last touched {active.touched}.
                </p>
                <p>
                  {active.roads.length
                    ? `Roads to ${active.roads.map((r) => byId(r).name).join(", ")}.`
                    : "No roads yet. Link a note from here to draw one."}
                </p>
              </>
            ) : (
              <p>Point at a place to see where its roads lead.</p>
            )}
          </div>

          <dl className={`${s.frame} ${s.legend}`}>
            <div>
              <dt>
                <svg viewBox="0 0 32 20" width="32" height="20" aria-hidden>
                  <ellipse cx="16" cy="10" rx="14" ry="8" className={s.gBlue} />
                  <ellipse cx="16" cy="10" rx="8" ry="4.5" className={s.gBlue} />
                </svg>
              </dt>
              <dd>Height is how many notes live there</dd>
            </div>
            <div>
              <dt>
                <svg viewBox="0 0 32 20" width="32" height="20" aria-hidden>
                  <path d="M2 16Q16 0 30 4" className={s.gRoad} />
                </svg>
              </dt>
              <dd>A road is a link between notes</dd>
            </div>
            <div>
              <dt>
                <svg viewBox="0 0 32 20" width="32" height="20" aria-hidden>
                  <circle cx="16" cy="10" r="7" className={s.gPink} />
                </svg>
              </dt>
              <dd>Pink rings are this week</dd>
            </div>
          </dl>
        </div>
      </div>

      <ul className={s.chips} aria-label="Places">
        {places.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              aria-pressed={pinned === p.id}
              onClick={() => toggle(p.id)}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
            >
              {p.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
