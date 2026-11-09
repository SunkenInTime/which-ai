"use client";

import { useEffect, useRef, useState } from "react";
import { CONSTELLATIONS, CROSSINGS, FIELD, GREEK } from "./sky";
import s from "./chart.module.css";

const HOURS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const RING_TICKS = Array.from({ length: 120 }, (_, i) => i * 3);
const SPOKES = Array.from({ length: 12 }, (_, i) => i * 30);

/** A four-pointed star, the way engravers drew the bright ones. */
function sparkle(x: number, y: number, r: number) {
  const k = r * 0.2;
  return `M${x} ${y - r}L${x + k} ${y - k}L${x + r} ${y}L${x + k} ${y + k}L${x} ${y + r}L${x - k} ${y + k}L${x - r} ${y}L${x - k} ${y - k}Z`;
}

/**
 * The explorable sky in the hero, plus the catalogue card that describes
 * whichever constellation is lit. Both are grid children of the hero.
 */
export function Chart() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const holding = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Drift through the constellations until someone points at one.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!holding.current) setActive((a) => (a + 1) % CONSTELLATIONS.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);

  // A little parallax, so the sky has depth.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const point = (i: number) => {
    holding.current = true;
    setTouched(true);
    setActive(i);
  };
  const release = () => {
    holding.current = false;
  };

  const current = CONSTELLATIONS[active];
  const linkCount = current.stars.reduce((n, st) => n + st.links, 0);

  return (
    <>
      <div className={s.wrap} ref={wrapRef}>
        <svg
          className={s.chart}
          viewBox="0 0 1000 1000"
          role="group"
          aria-label="A star chart of your notes. Each constellation is a subject."
        >
          <defs>
            <radialGradient id="atlas-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1c2c63" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#111c44" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0a1026" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="atlas-river" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fa6ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#8fa6ff" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#8fa6ff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="atlas-disc">
              <circle cx="500" cy="500" r="452" />
            </clipPath>
          </defs>

          <circle cx="500" cy="500" r="452" fill="url(#atlas-glow)" />

          {/* the river of faint stars */}
          <g clipPath="url(#atlas-disc)" aria-hidden="true">
            <rect
              x="-100"
              y="330"
              width="1200"
              height="340"
              fill="url(#atlas-river)"
              transform="rotate(-32 500 500)"
              className={s.river}
            />
          </g>

          {/* graticule */}
          <g className={s.grid} aria-hidden="true">
            <circle cx="500" cy="500" r="150" />
            <circle cx="500" cy="500" r="300" />
            {SPOKES.map((d) => (
              <line key={d} x1="500" y1="48" x2="500" y2="452" transform={`rotate(${d} 500 500)`} />
            ))}
            <circle className={s.ecliptic} cx="548" cy="470" r="322" />
          </g>

          {/* the turning outer ring */}
          <g className={s.ring} aria-hidden="true">
            <circle cx="500" cy="500" r="488" />
            <circle cx="500" cy="500" r="452" />
            {RING_TICKS.map((d) => (
              <line
                key={d}
                x1="500"
                y1="48"
                x2="500"
                y2={d % 30 === 0 ? 34 : d % 15 === 0 ? 39 : 43}
                transform={`rotate(${d} 500 500)`}
              />
            ))}
            {HOURS.map((h, i) => (
              <text key={h} x="500" y="29" transform={`rotate(${i * 30 + 15} 500 500)`}>
                {h}
              </text>
            ))}
          </g>

          {/* field stars */}
          <g className={s.field} aria-hidden="true">
            {FIELD.map(([x, y, r, o, tw], i) => (
              <circle key={i} cx={x} cy={y} r={r} opacity={o} data-tw={tw || undefined} />
            ))}
          </g>

          {/* links that jump between subjects */}
          <g className={s.crossings} aria-hidden="true">
            {CROSSINGS.map(([[ca, sa], [cb, sb]], i) => {
              const A = CONSTELLATIONS[ca].stars[sa];
              const B = CONSTELLATIONS[cb].stars[sb];
              return (
                <line
                  key={i}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  data-on={ca === active || cb === active || undefined}
                />
              );
            })}
          </g>

          {/* today, at the pole */}
          <g className={s.pole} aria-hidden="true">
            <circle cx="500" cy="500" r="13" />
            <path d={sparkle(500, 500, 9)} />
            <text x="500" y="531">
              today
            </text>
          </g>

          {/* constellations */}
          {CONSTELLATIONS.map((c, ci) => (
            <g
              key={c.id}
              className={s.figure}
              data-on={ci === active || undefined}
              tabIndex={0}
              role="button"
              aria-pressed={ci === active}
              aria-label={`${c.name}, ${c.gloss}: ${c.stars.length} notes`}
              onPointerEnter={() => point(ci)}
              onPointerLeave={release}
              onFocus={() => point(ci)}
              onBlur={release}
              onClick={() => point(ci)}
            >
              {/* generous, invisible hit area */}
              {c.edges.map(([a, b], i) => (
                <line
                  key={`h${i}`}
                  className={s.hit}
                  x1={c.stars[a].x}
                  y1={c.stars[a].y}
                  x2={c.stars[b].x}
                  y2={c.stars[b].y}
                />
              ))}
              {c.stars.map((st, i) => (
                <circle key={`c${i}`} className={s.hit} cx={st.x} cy={st.y} r="30" />
              ))}
              <rect className={s.hit} x={c.label[0] - 70} y={c.label[1] - 22} width="140" height="44" />

              {c.edges.map(([a, b], i) => (
                <line
                  key={i}
                  className={s.edge}
                  x1={c.stars[a].x}
                  y1={c.stars[a].y}
                  x2={c.stars[b].x}
                  y2={c.stars[b].y}
                />
              ))}

              {c.stars.map((st, i) => (
                <g key={i} className={s.star} data-mag={st.mag}>
                  <circle className={s.halo} cx={st.x} cy={st.y} r={st.mag === 1 ? 15 : st.mag === 2 ? 11 : 8} />
                  {st.mag === 1 ? (
                    <path d={sparkle(st.x, st.y, 9)} />
                  ) : (
                    <circle cx={st.x} cy={st.y} r={st.mag === 2 ? 3.4 : 2.4} />
                  )}
                  <text x={st.x + (st.dx ?? 9)} y={st.y + (st.dy ?? -8)}>
                    {GREEK[i]}
                  </text>
                </g>
              ))}

              <text className={s.name} x={c.label[0]} y={c.label[1]}>
                {c.name.toUpperCase()}
              </text>
              <text className={s.gloss} x={c.label[0]} y={c.label[1] + 17}>
                {c.gloss}
              </text>
            </g>
          ))}

          {/* one meteor, now and then */}
          <line className={s.meteor} x1="640" y1="80" x2="560" y2="150" aria-hidden="true" />
        </svg>
      </div>

      <aside className={s.legend} aria-live={touched ? "polite" : "off"}>
        <p className={s.legendHint}>
          <i />
          {touched ? "Now showing" : "Pick a constellation"}
        </p>
        <div className={s.legendCard} key={current.id}>
          <header>
            <h2>{current.name}</h2>
            <p>{current.gloss}</p>
            <span>
              {current.stars.length} notes · {linkCount} links
            </span>
          </header>
          <ol>
            {current.stars.slice(0, 4).map((st, i) => (
              <li key={st.title}>
                <b>{GREEK[i]}</b>
                <span>{st.title}</span>
                <em>{st.links}</em>
              </li>
            ))}
          </ol>
          <p className={s.legendMeta}>
            {current.stars.length > 4 ? <span>+ {current.stars.length - 4} fainter</span> : null}
            <span>first charted {current.since}</span>
          </p>
        </div>
      </aside>
    </>
  );
}
