import { Atlas } from "./atlas";
import { contours } from "./contours";
import { H, W } from "./places";
import s from "./page.module.css";

const legend = [
  {
    title: "Places rise on their own",
    body: "Write about something often and it grows into a hill. You never file a note. Engram places it by what it says.",
    glyph: (
      <svg viewBox="0 0 56 56" aria-hidden>
        <ellipse cx="28" cy="28" rx="24" ry="19" className={s.gBlue} />
        <ellipse cx="28" cy="28" rx="16" ry="12" className={s.gBlue} />
        <ellipse cx="28" cy="28" rx="8" ry="6" className={s.gBlueHeavy} />
      </svg>
    ),
  },
  {
    title: "Roads are links",
    body: "Put double brackets around a name and a road appears. Engram also suggests roads you haven't drawn, and you choose which to keep.",
    glyph: (
      <svg viewBox="0 0 56 56" aria-hidden>
        <path d="M6 44Q26 10 50 14" className={s.gRoad} />
        <circle cx="6" cy="44" r="4.5" className={s.gDot} />
        <circle cx="50" cy="14" r="4.5" className={s.gDot} />
      </svg>
    ),
  },
  {
    title: "Pink is this week",
    body: "The places you've touched lately glow. Each morning Engram uses them to pick older notes worth bringing back, and tells you why.",
    glyph: (
      <svg viewBox="0 0 56 56" aria-hidden>
        <circle cx="28" cy="28" r="22" className={s.gPinkThin} />
        <circle cx="28" cy="28" r="14" className={s.gPinkThin} />
        <circle cx="28" cy="28" r="6" className={s.gPinkHeavy} />
      </svg>
    ),
  },
  {
    title: "Ask, and follow the route",
    body: "Ask a question and Engram walks the roads for you. It answers from your notes only and shows the route it took, so you can check it.",
    glyph: (
      <svg viewBox="0 0 56 56" aria-hidden>
        <path d="M8 46Q20 40 26 28T48 10" className={s.gRoute} />
        <circle cx="8" cy="46" r="4.5" className={s.gDot} />
        <circle cx="26" cy="28" r="4.5" className={s.gDot} />
        <circle cx="48" cy="10" r="4.5" className={s.gDot} />
      </svg>
    ),
    figure: true,
  },
  {
    title: "The survey is yours",
    body: "The map is drawn from Markdown files in a folder on your device. Move the folder, edit it anywhere, keep it for decades. Sync is optional and end-to-end encrypted.",
    glyph: (
      <svg viewBox="0 0 56 56" aria-hidden>
        <path d="M8 16h16l4 5h20v25H8z" className={s.gBlue} />
        <path d="M8 26h40" className={s.gBlue} />
      </svg>
    ),
  },
];

export default function Page() {
  return (
    <main className={s.page}>
      <header className={s.top}>
        <a href="#top" className={s.brand}>
          Engram
        </a>
        <nav aria-label="Primary" className={s.nav}>
          <a href="#legend">How it works</a>
          <a href="#plans">Pricing</a>
          <a className={s.btnSmall} href="#plans">
            Download
          </a>
        </nav>
      </header>

      <section id="top" className={s.hero}>
        <Atlas
          contours={
            <svg
              className={s.contours}
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              <path className={s.cMinor} d={contours.blueMinor} />
              <path className={s.cMajor} d={contours.blueMajor} />
              <path className={s.cPink} d={contours.pink} />
            </svg>
          }
          cartouche={
            <>
              <h1>A map of everything you know</h1>
              <p>
                Engram draws it as you write. Topics rise into hills, links become
                roads, and what you touched this week glows pink.
              </p>
              <p className={s.actions}>
                <a className={s.btn} href="#plans">
                  Download for Mac
                </a>
                <a className={s.textLink} href="#plans">
                  Open in browser
                </a>
              </p>
            </>
          }
        />
      </section>

      <section id="legend" className={s.legendSection}>
        <div className={s.legendIntro}>
          <h2>What the map is made of</h2>
          <p>
            Nothing on it is drawn by hand. Every line comes from notes you
            wrote and the links between them.
          </p>
        </div>
        <ol className={s.entries}>
          {legend.map((e) => (
            <li key={e.title}>
              <span className={s.glyph}>{e.glyph}</span>
              <div>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
                {e.figure && (
                  <figure className={s.route}>
                    <svg viewBox="0 0 420 96" role="img" aria-label="A question travels along roads from Family to Kitchen renovation to Sourdough.">
                      <path d="M40 66Q120 76 200 48T382 34" className={s.routeLine} />
                      <path d="M40 66Q120 76 200 48T382 34" className={s.routeGhost} />
                      <circle cx="40" cy="66" r="6" className={s.gDot} />
                      <circle cx="200" cy="48" r="6" className={s.gDot} />
                      <circle cx="382" cy="34" r="6" className={s.gDot} />
                      <text x="40" y="90" textAnchor="start" className={s.routeText}>Family</text>
                      <text x="200" y="28" textAnchor="middle" className={s.routeText}>Kitchen renovation</text>
                      <text x="382" y="14" textAnchor="end" className={s.routeText}>Sourdough</text>
                    </svg>
                  </figure>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="plans" className={s.plansSection}>
        <div className={`${s.frame} ${s.plans}`}>
          <div>
            <h2>Free</h2>
            <p className={s.price}>$0</p>
            <p>One device, unlimited notes. Everything stays on your device.</p>
          </div>
          <div>
            <h2>Plus</h2>
            <p className={s.price}>
              $8 <span>a month</span>
            </p>
            <p>Sync across devices, Ask and the web clipper. $72 if you pay for a year.</p>
          </div>
        </div>

        <div className={s.closing}>
          <h2>Start your map with one note</h2>
          <p className={s.actions}>
            <a className={s.btnLg} href="#top">
              Download for Mac
            </a>
            <a className={s.textLink} href="#top">
              Open in browser
            </a>
          </p>
          <p className={s.fine}>
            In public beta for Mac, Windows, iPhone, Android and the browser.
          </p>
        </div>
      </section>
    </main>
  );
}
