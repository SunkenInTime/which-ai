import { Atkinson_Hyperlegible } from "next/font/google";
import styles from "@/variants/with-design-skill/haiku-5-5/source/app/5/trail.module.css";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
});

const MAP_WIDTH = 800;
const MAP_HEIGHT = 520;

// Deterministic contour rings, so server and client render identical markup
function contourPath(ring: number) {
  const cx = 430;
  const cy = 262;
  const steps = 72;
  const base = 34 + ring * 24;
  const amplitude = 0.5 + ring * 0.1;
  let d = "";

  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wobble =
      13 * Math.sin(2 * t + ring * 0.7) +
      8 * Math.sin(3 * t + ring * 1.9) +
      4 * Math.sin(7 * t + ring * 0.3);
    const r = base + wobble * amplitude;
    const x = cx + r * Math.cos(t) * 1.4;
    const y = cy + r * Math.sin(t);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }

  return `${d}Z`;
}

const RINGS = Array.from({ length: 8 }, (_, ring) => ({
  ring,
  d: contourPath(ring),
}));

const TRAIL =
  "M 70 440 C 150 400 170 330 250 320 S 330 390 400 300 S 470 150 560 170 S 650 120 730 70";

// Waypoints sit exactly on the trail. Labels flip sides near the map edge.
const WAYPOINTS = [
  { id: "capture", name: "Capture", x: 70, y: 440, side: "right" },
  { id: "connect", name: "Connect", x: 400, y: 300, side: "right" },
  { id: "resurface", name: "Resurface", x: 730, y: 70, side: "left" },
] as const;

export default function TrailPage() {
  return (
    <div className={`${atkinson.variable} ${styles.page}`}>
      <header className={styles.header}>
        <span className={styles.wordmark}>Loam</span>
        <a className={styles.quietLink} href="#">
          Log in
        </a>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="trail-title">
          <div className={styles.heroText}>
            <h1 id="trail-title" className={styles.h1}>
              Leave a trail back to every idea.
            </h1>
            <p className={styles.lead}>
              Loam is the notebook that marks the way back. Capture what you
              find, connect it to what you already know, and resurface it when
              you pass that way again.
            </p>
            <a className={styles.primary} href="#">
              Start a note
            </a>
          </div>

          <figure className={styles.map}>
            <div className={styles.frame}>
              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className={styles.mapSvg}
                aria-hidden="true"
                focusable="false"
              >
                {RINGS.map(({ ring, d }) => (
                  <path
                    key={ring}
                    d={d}
                    className={ring % 4 === 0 ? styles.indexContour : styles.contour}
                  />
                ))}

                <path pathLength={1} d={TRAIL} className={styles.trail} />

                {WAYPOINTS.map((waypoint, index) => (
                  <g
                    key={waypoint.id}
                    transform={`translate(${waypoint.x} ${waypoint.y})`}
                    className={styles.cairn}
                    style={{ animationDelay: `${2000 + index * 400}ms` }}
                  >
                    <ellipse cx={0} cy={-2} rx={12} ry={6} />
                    <ellipse cx={0} cy={-12} rx={9} ry={5} />
                    <ellipse cx={0} cy={-20} rx={6} ry={4} />
                  </g>
                ))}
              </svg>

              {WAYPOINTS.map((waypoint, index) => (
                <a
                  key={waypoint.id}
                  href={`#${waypoint.id}`}
                  className={styles.waypoint}
                  data-side={waypoint.side}
                  style={{
                    left: `${(waypoint.x / MAP_WIDTH) * 100}%`,
                    top: `${(waypoint.y / MAP_HEIGHT) * 100}%`,
                    animationDelay: `${2000 + index * 400}ms`,
                  }}
                >
                  <span className={styles.sign}>{waypoint.name}</span>
                </a>
              ))}
            </div>

            <figcaption className={styles.key}>
              <span className={styles.keyItem}>
                <span className={styles.keyCairn} aria-hidden="true" />
                A place where notes gather
              </span>
              <span className={styles.keyItem}>
                <span className={styles.keyTrail} aria-hidden="true" />
                The path you took through them
              </span>
            </figcaption>
          </figure>
        </section>

        <section className={styles.stops} aria-label="Trail stops">
          <article id="capture" className={styles.stop} aria-labelledby="capture-title">
            <h2 id="capture-title" className={styles.h2}>
              Capture
            </h2>
            <p>
              Write, clip, or speak a thought the moment it appears. Loam keeps
              it with the time and place it came from, so you can always see
              where the path started.
            </p>
          </article>

          <article id="connect" className={styles.stop} aria-labelledby="connect-title">
            <h2 id="connect-title" className={styles.h2}>
              Connect
            </h2>
            <p>
              Links form as you write. Put a note name in double brackets and it
              connects to that note. Open any note and you see everything that
              points back to it.
            </p>
          </article>

          <article
            id="resurface"
            className={styles.stop}
            aria-labelledby="resurface-title"
          >
            <h2 id="resurface-title" className={styles.h2}>
              Resurface
            </h2>
            <p>
              Old notes return on the walk. Open a project and Loam shows the
              notes you wrote about it, so nothing you learned is left on a side
              path.
            </p>
          </article>
        </section>

        <section className={styles.quote} aria-label="Reader quote">
          <blockquote>
            <p>
              The map is the reason I came back. I found a note from March at
              exactly the junction I needed.
            </p>
            <footer>Reader, placeholder copy</footer>
          </blockquote>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <h2 id="closing-title" className={styles.h2}>
            Your trail starts with one note
          </h2>
          <p>Pick a direction and write down the first thing you see.</p>
          <a className={styles.primary} href="#">
            Start a note
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Loam. Keep your bearings.</span>
        <a href="#">Export your notes</a>
      </footer>
    </div>
  );
}
