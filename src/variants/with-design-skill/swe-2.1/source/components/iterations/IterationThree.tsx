import styles from "./IterationThree.module.css";

export default function IterationThree() {
  return (
    <div className={styles.page}>
      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#top" aria-label="Commonplace home">
          Commonplace
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#constellation">Constellation</a>
          <a href="#drift">Drift</a>
          <a href="#launch">Launch</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="observatory-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>A second brain mapped as a living constellation</p>
            <h1 id="observatory-title">See the shape of what you know.</h1>
            <p className={styles.lede}>
              Commonplace turns notes into a navigable night sky: bright clusters
              for active work, faint trails for older ideas, and new stars wherever
              your attention lands.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#launch">Open the observatory</a>
              <a className={styles.secondaryAction} href="#constellation">Read the sky</a>
            </div>
          </div>

          <figure className={styles.observatory} aria-labelledby="orbit-caption">
            <svg className={styles.starMap} viewBox="0 0 700 700" role="img">
              <title>Constellation of connected notes</title>
              <circle className={styles.orbitLine} cx="350" cy="350" r="104" />
              <circle className={styles.orbitLine} cx="350" cy="350" r="184" />
              <circle className={styles.orbitLine} cx="350" cy="350" r="270" />
              <g className={styles.orbitSpin}>
                <path
                  className={styles.connection}
                  d="M349 244 C420 170 504 176 549 240 C602 314 553 392 493 418 C421 450 360 409 316 365"
                />
                <path
                  className={styles.connectionSoft}
                  d="M186 307 C174 220 245 148 337 144 C445 139 541 216 565 314 C590 420 529 520 430 552"
                />
                <path
                  className={styles.connectionSoft}
                  d="M250 504 C185 464 143 400 145 319 C148 209 234 116 351 104 C492 89 610 204 617 344"
                />
              </g>
              <circle className={styles.centerGlow} cx="350" cy="350" r="72" />
              <circle className={styles.centerNode} cx="350" cy="350" r="31" />
              <text className={styles.centerLabel} x="350" y="356" textAnchor="middle">you</text>

              <g className={styles.nodeBright}>
                <circle cx="549" cy="240" r="16" />
                <text x="579" y="246">draft orbit</text>
              </g>
              <g className={styles.nodeWarm}>
                <circle cx="493" cy="418" r="12" />
                <text x="514" y="424">evidence</text>
              </g>
              <g className={styles.nodeDim}>
                <circle cx="250" cy="504" r="10" />
                <text x="268" y="510">old question</text>
              </g>
              <g className={styles.nodeDim}>
                <circle cx="186" cy="307" r="9" />
                <text x="204" y="312">quotation</text>
              </g>
              <g className={styles.nodeBright}>
                <circle cx="349" cy="144" r="13" />
                <text x="370" y="150">project mass</text>
              </g>
              <g className={styles.nodeWarm}>
                <circle cx="617" cy="344" r="11" />
                <text x="594" y="382">new capture</text>
              </g>
              <g className={styles.starPin}>
                <circle cx="438" cy="216" r="4" />
                <circle cx="143" cy="402" r="4" />
                <circle cx="430" cy="552" r="4" />
                <circle cx="337" cy="104" r="4" />
                <circle cx="565" cy="314" r="4" />
              </g>
            </svg>
            <figcaption id="orbit-caption">
              Notes gain gravity as they gather links, citations, and return visits.
            </figcaption>
          </figure>
        </section>

        <section className={styles.constellation} id="constellation">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Navigation by gravity</p>
            <h2>Your knowledge is not a list. It has mass, distance, and motion.</h2>
          </div>
          <div className={styles.featureRows}>
            <article>
              <span className={styles.featureGlyph} aria-hidden="true" />
              <div>
                <h3>Clusters reveal active thinking</h3>
                <p>
                  Notes that cite, contradict, or extend one another gather into
                  visible constellations, so a project’s intellectual center is easy to find.
                </p>
              </div>
            </article>
            <article>
              <span className={styles.featureGlyphAmber} aria-hidden="true" />
              <div>
                <h3>Faint stars stay recoverable</h3>
                <p>
                  Older notes dim instead of disappearing. When a new capture is
                  related, the old trail brightens and returns to view.
                </p>
              </div>
            </article>
            <article>
              <span className={styles.featureGlyphRose} aria-hidden="true" />
              <div>
                <h3>Distance explains itself</h3>
                <p>
                  The map is generated from explicit links and shared context, not
                  a mystery score. You can inspect why two ideas are close.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.drift} id="drift">
          <div className={styles.driftCopy}>
            <p className={styles.sectionLabel}>Resurfacing as orbital drift</p>
            <h2>The right note comes back around when your work enters its path.</h2>
            <p>
              Commonplace watches the shape of your current draft, then brings a
              small set of relevant fragments into view. No feed, no noise, just a
              timely alignment.
            </p>
          </div>
          <div className={styles.alignmentPanel} aria-label="Example resurfacing panel">
            <div className={styles.currentDraft}>
              <span>current draft</span>
              <h3>Memory tools should create places, not piles.</h3>
              <p>Two matching fragments are entering this orbit.</p>
            </div>
            <div className={styles.alignments}>
              <p><span /> “Spatial memory depends on sequence.”</p>
              <p><span /> “A note’s neighbors are part of its meaning.”</p>
            </div>
          </div>
        </section>

        <section className={styles.launch} id="launch">
          <p>Chart the mind you have been building all along.</p>
          <a href="#top">Open the observatory</a>
        </section>
      </main>
    </div>
  );
}
