"use client";

import { useEffect, useState, type CSSProperties } from "react";
import s from "./page.module.css";

const SENTENCE = "You will forget most of this sentence by tomorrow morning.";
const WORDS = SENTENCE.split(" ");

/* How much of each word is left by morning: weight and ink both drain toward the end. */
function faded(i: number) {
  const t = i / (WORDS.length - 1);
  return {
    weight: Math.round(900 - 800 * Math.pow(t, 0.85)),
    alpha: Number((1 - 0.68 * Math.pow(t, 1.3)).toFixed(2)),
  };
}

/* Ebbinghaus, Über das Gedächtnis (1885): share of a list still known after each delay. */
const MEASURED = [
  { at: "Start", kept: 100 },
  { at: "20 min", kept: 58.2, crowded: true },
  { at: "1 hour", kept: 44.2, minor: true },
  { at: "9 hours", kept: 35.8, minor: true },
  { at: "1 day", kept: 33.7 },
  { at: "2 days", kept: 27.8, minor: true },
  { at: "6 days", kept: 25.4, crowded: true },
  { at: "31 days", kept: 21.1 },
];

const STEP = 100;
const px = (i: number) => i * STEP;
const py = (kept: number) => 100 - kept;

function smooth(points: [number, number][]) {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const MEASURED_PATH = smooth(MEASURED.map((m, i) => [px(i), py(m.kept)]));

/* Illustration only: each return resets the curve and it falls more slowly afterwards. */
const REVIEWS = [4, 6, 7];
const REVIEW_PATH =
  `M${px(4)} ${py(33.7)}V0` +
  `C${px(4) + 22} 11 ${px(4) + 62} 19 ${px(5)} 22` +
  `C${px(5) + 40} 27 ${px(5) + 72} 34 ${px(6)} 38V0` +
  `C${px(6) + 26} 8 ${px(6) + 66} 15 ${px(7)} 19V0`;

const WIDTH = px(MEASURED.length - 1);
const pct = (i: number) => `${(px(i) / WIDTH) * 100}%`;

function Toggle({
  kept,
  started,
  onChange,
  dark = false,
}: {
  kept: boolean;
  started: boolean;
  onChange: (kept: boolean) => void;
  dark?: boolean;
}) {
  return (
    <div className={s.toggleRow}>
      <span className={s.toggleLabel}>Tomorrow morning</span>
      <div
        className={`${s.toggle} ${dark ? s.toggleDark : ""}`}
        role="group"
        aria-label="Tomorrow morning, with or without Mull"
      >
        <button type="button" aria-pressed={started && !kept} onClick={() => onChange(false)}>
          Without Mull
        </button>
        <button type="button" aria-pressed={started && kept} onClick={() => onChange(true)}>
          With Mull
        </button>
      </div>
    </div>
  );
}

export function Memory() {
  const [started, setStarted] = useState(false);
  const [kept, setKept] = useState(false);

  // The one unprompted moment: the sentence is whole, then it goes.
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setStarted(true), calm ? 0 : 1300);
    return () => window.clearTimeout(timer);
  }, []);

  const gone = started && !kept;
  const choose = (next: boolean) => {
    setStarted(true);
    setKept(next);
  };

  return (
    <>
      <section className={s.hero}>
        <h1 className={s.headline} aria-label={SENTENCE}>
          {WORDS.map((word, i) => {
            const f = faded(i);
            return [
              <span key={i} className={s.word} data-word={word} aria-hidden="true">
                <span
                  className={s.ink}
                  style={
                    {
                      "--i": i,
                      "--weight": gone ? f.weight : 900,
                      "--alpha": gone ? f.alpha : 1,
                    } as CSSProperties
                  }
                >
                  {word}
                </span>
              </span>,
              " ",
            ];
          })}
        </h1>

        <div className={s.heroFoot}>
          <Toggle kept={kept} started={started} onChange={choose} />
          <div className={s.pitch}>
            <p className={s.lede}>
              Mull is a note-taking app that keeps what you learn within reach. Write it down
              once. Mull links it to what you already know and brings it back before it fades.
            </p>
            <p className={s.actions}>
              <a className={s.button} href="#download">
                Download Mull
              </a>
              <span className={s.small}>Free on one device.</span>
            </p>
          </div>
        </div>
      </section>

      <section id="curve" className={s.dark}>
        <div className={s.curveHead}>
          <h2 className={s.h2}>The curve was measured in 1885.</h2>
          <div className={s.curveText}>
            <p>
              Hermann Ebbinghaus memorised lists of nonsense syllables, then tested how much he
              could recall. Twenty minutes later he had lost 42%. A day later, two thirds.
            </p>
            <p>
              Meeting a thing again at the right moment resets the curve and flattens it. That is
              the part Mull does for you.
            </p>
          </div>
        </div>

        <figure className={s.figure}>
          <div className={s.chart}>
            <svg
              className={s.chartSvg}
              viewBox={`0 0 ${WIDTH} 100`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path className={s.axis} d={`M0 100H${WIDTH}`} />
              <path className={s.axis} d={`M0 50H${WIDTH}`} strokeDasharray="2 6" />
              <path className={s.measured} d={MEASURED_PATH} />
            </svg>

            <span className={s.half}>Half</span>

            {MEASURED.map((m, i) => (
              <span
                key={m.at}
                data-minor={m.minor ? "" : undefined}
                data-crowded={m.crowded ? "" : undefined}
              >
                <span className={s.dot} style={{ left: pct(i), top: `${py(m.kept)}%` }} />
                <span className={s.value} style={{ left: pct(i), top: `${py(m.kept)}%` }}>
                  {Math.round(m.kept)}%
                </span>
                <span className={s.tick} style={{ left: pct(i) }}>
                  {m.at}
                </span>
              </span>
            ))}

            <div className={s.reviews} data-on={started && kept ? "" : undefined}>
              <svg
                className={s.chartSvg}
                viewBox={`0 0 ${WIDTH} 100`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path className={s.reviewed} d={REVIEW_PATH} />
              </svg>
              {REVIEWS.map((i) => (
                <span key={i} className={s.peak} style={{ left: pct(i) }} />
              ))}
              <span className={s.peakLabel} style={{ left: pct(REVIEWS[0]) }}>
                Mull brings the note back
              </span>
            </div>
          </div>
          <figcaption className={s.figcaption}>
            <Toggle kept={kept} started={started} onChange={choose} dark />
            <p>
              Pink line: what Ebbinghaus still knew of a list, from his own results in{" "}
              <cite>Über das Gedächtnis</cite>. White line: an illustration of what review does,
              not a measurement.
            </p>
          </figcaption>
        </figure>
      </section>
    </>
  );
}
