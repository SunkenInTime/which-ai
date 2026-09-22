import { Archivo } from "next/font/google";
import styles from "./styles.module.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-archivo" });

const W = 1440;
const H = 700;

const bands = [
  { year: "2026", count: 212, top: 24, fill: "#C3CBA8", ink: "#1F1D1B" },
  { year: "2025", count: 418, top: 112, fill: "#C9A861", ink: "#1F1D1B" },
  { year: "2024", count: 390, top: 216, fill: "#9C7450", ink: "#1F1D1B" },
  { year: "2023", count: 301, top: 332, fill: "#6E5541", ink: "#EAE6DA" },
  { year: "2022", count: 176, top: 444, fill: "#4A4642", ink: "#EAE6DA" },
  { year: "2021", count: 93, top: 562, fill: "#2A2826", ink: "#EAE6DA" },
];

function boundary(y: number, i: number) {
  const pts: [number, number][] = [];
  for (let x = 0; x <= W; x += 40) {
    const wave = Math.sin(x / 170 + i * 1.7) * 7 + Math.sin(x / 61 + i) * 2.5;
    pts.push([x, Math.round((y + (i === 0 ? wave * 0.6 : wave)) * 10) / 10]);
  }
  return pts;
}

function bandPath(i: number) {
  const top = boundary(bands[i].top, i);
  const bottom = i + 1 < bands.length ? boundary(bands[i + 1].top, i + 1).reverse() : [[W, H], [0, H]] as [number, number][];
  return "M" + [...top, ...bottom].map((p) => p.join(" ")).join(" L") + " Z";
}

const fossils = [
  { x: 180, y: 76, title: "Keep the bedroom cold", band: 0 },
  { x: 560, y: 82, title: "Morning pages, week 3", band: 0 },
  { x: 300, y: 172, title: "Caffeine lasts 5 hours", band: 1 },
  { x: 660, y: 186, title: "Naps under 20 minutes", band: 1 },
  { x: 250, y: 290, title: "Drafts rot in folders", band: 2 },
  { x: 440, y: 398, title: "Memento mori, weekly", band: 3 },
  { x: 560, y: 512, title: "The forgetting curve", band: 4 },
  { x: 1000, y: 520, title: "Practise being uncomfortable", band: 4 },
  { x: 300, y: 640, title: "Why I sleep badly in hotels", band: 5 },
  { x: 700, y: 656, title: "Reading list: Ebbinghaus", band: 5 },
];

const cores = [
  { x: 940, y: 282, title: "Write the question, not the answer", band: 2, written: "Written April 2024", delay: 0.4 },
  { x: 1100, y: 398, title: "Seneca’s letters were notes", band: 3, written: "Written June 2023", delay: 0.9 },
  { x: 1260, y: 640, title: "Spacing beats rereading", band: 5, written: "Written November 2021", delay: 1.4 },
];

export default function Strata() {
  return (
    <div className={`${styles.page} ${archivo.variable}`}>
      <div className={styles.surface}>
        <header className={styles.bar}>
          <a href="#" className={styles.wordmark}>
            Commonplace
          </a>
          <nav className={styles.nav}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#pricing" className={styles.navCta}>
              Download
            </a>
          </nav>
        </header>

        <div className={styles.heroText}>
          <h1 className={styles.h1}>Old notes, brought back up.</h1>
          <p className={styles.lede}>
            Commonplace keeps everything you write, year on year. Each morning
            it digs out a few older notes that bear on what you&rsquo;re
            working on today.
          </p>
          <a href="#pricing" className={styles.primary}>
            Download Commonplace
          </a>
        </div>

        <section className={styles.panel} aria-labelledby="today">
          <h2 id="today" className={styles.panelTitle}>
            This morning
          </h2>
          <p className={styles.panelWhy}>
            Because you&rsquo;ve been writing about how to study
          </p>
          <ol className={styles.panelList}>
            {cores.map((c) => (
              <li key={c.title} style={{ animationDelay: `${c.delay + 0.9}s` }}>
                <span className={styles.panelNote}>{c.title}</span>
                <span className={styles.panelMeta}>{c.written}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className={styles.strataWrap}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={styles.strata}
          role="img"
          aria-label="Your notes as layers, one per year. Three older notes are drawn up to this morning's review."
        >
          <rect x="0" y="0" width={W} height={H} fill="#DDE3D3" />
          {bands.map((b, i) => (
            <path key={b.year} d={bandPath(i)} fill={b.fill} />
          ))}
          {bands.map((b, i) => {
            const next = bands[i + 1]?.top ?? H;
            const mid = (b.top + next) / 2;
            return (
              <g key={b.year} fill={b.ink}>
                <text x={40} y={mid + 2} className={styles.year}>
                  {b.year}
                </text>
                <text x={40} y={mid + 24} className={styles.yearCount}>
                  {b.count} notes
                </text>
              </g>
            );
          })}
          {fossils.map((f) => (
            <g key={f.title} fill={bands[f.band].ink} className={styles.fossil}>
              <ellipse cx={f.x} cy={f.y - 5} rx={4} ry={3} />
              <text x={f.x + 12} y={f.y}>
                {f.title}
              </text>
            </g>
          ))}
          {cores.map((c) => (
            <g key={c.title}>
              <line
                x1={c.x}
                y1={c.y - 10}
                x2={c.x}
                y2={0}
                pathLength={1}
                className={styles.coreShadow}
                style={{ animationDelay: `${c.delay}s` }}
              />
              <line
                x1={c.x}
                y1={c.y - 10}
                x2={c.x}
                y2={0}
                pathLength={1}
                className={styles.core}
                style={{ animationDelay: `${c.delay}s` }}
              />
              <ellipse cx={c.x} cy={c.y - 4} rx={12} ry={8} className={styles.cavity} />
              <text
                x={c.x - 22}
                y={c.y + 1}
                textAnchor="end"
                fill={bands[c.band].ink}
                className={styles.coreLabel}
              >
                {c.title}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <main className={styles.bedrock}>
        <section id="features" className={styles.features}>
          <h2 className={styles.h2}>Everything goes in. Nothing gets lost.</h2>
          <dl>
            <div>
              <dt>Capture from anywhere</dt>
              <dd>
                Press ⌥ Space in any app to jot a note. Clip web pages, forward
                emails, record voice memos.
              </dd>
            </div>
            <div>
              <dt>Links as you write</dt>
              <dd>
                While you type, Commonplace lists older notes on the same idea.
                Link one with a keystroke.
              </dd>
            </div>
            <div>
              <dt>Search by meaning</dt>
              <dd>
                &ldquo;Why cramming fails&rdquo; finds the note you titled
                &ldquo;Spacing beats rereading.&rdquo;
              </dd>
            </div>
            <div>
              <dt>Files on your disk</dt>
              <dd>
                Plain Markdown in a folder you choose. Works offline. Ten years
                from now, still readable.
              </dd>
            </div>
          </dl>
        </section>

        <section id="pricing" className={styles.pricing}>
          <h2 className={styles.h2}>Pricing</h2>
          <div className={styles.plans}>
            <div>
              <p className={styles.price}>Free</p>
              <p>Unlimited notes and every feature, on one device.</p>
            </div>
            <div>
              <p className={styles.price}>$5 a month</p>
              <p>
                Sync across all your devices, end-to-end encrypted, with a year
                of version history.
              </p>
            </div>
          </div>
          <a href="#" className={styles.primary}>
            Download Commonplace
          </a>
          <p className={styles.platforms}>
            For Mac, Windows, Linux, iPhone and Android.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Commonplace</span>
        <span>Notes that keep working.</span>
      </footer>
    </div>
  );
}
