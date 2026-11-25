import styles from "./IterationFive.module.css";

export default function IterationFive() {
  return (
    <div className={styles.page}>
      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#top" aria-label="Commonplace home">
          Commonplace
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#network">Network</a>
          <a href="#seasons">Seasons</a>
          <a href="#grow">Grow</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="mycelium-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>A second brain that behaves like a living network</p>
            <h1 id="mycelium-title">Knowledge grows by contact.</h1>
            <p className={styles.lede}>
              Commonplace lets notes cross-pollinate beneath the surface of your
              work, then sends up new growth when the conditions are right.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#grow">Plant your first note</a>
              <a className={styles.secondaryAction} href="#network">Follow the network</a>
            </div>
          </div>

          <div className={styles.colony} aria-label="Organic network of notes">
            <svg className={styles.hyphae} viewBox="0 0 640 610" aria-hidden="true">
              <path
                className={styles.mainHypha}
                d="M302 508 C 306 423, 320 354, 303 286 C 286 219, 296 149, 340 92"
              />
              <path
                className={styles.hyphaBranch}
                d="M310 367 C 235 342, 179 298, 133 217 C 111 178, 88 149, 51 128"
              />
              <path
                className={styles.hyphaBranch}
                d="M307 301 C 379 281, 439 235, 483 169 C 505 136, 536 111, 581 99"
              />
              <path
                className={styles.hyphaBranch}
                d="M303 443 C 230 440, 172 461, 112 515"
              />
              <path
                className={styles.hyphaBranch}
                d="M316 419 C 394 430, 467 463, 528 524"
              />
              <path
                className={styles.hyphaFine}
                d="M133 217 C 172 205, 205 203, 241 214"
              />
              <path
                className={styles.hyphaFine}
                d="M483 169 C 464 211, 459 249, 468 287"
              />
              <circle className={styles.spore} cx="51" cy="128" r="10" />
              <circle className={styles.spore} cx="581" cy="99" r="12" />
              <circle className={styles.sporeRose} cx="112" cy="515" r="11" />
              <circle className={styles.spore} cx="528" cy="524" r="9" />
              <circle className={styles.sporeRose} cx="340" cy="92" r="13" />
            </svg>

            <article className={styles.noteBloomOne}>
              <span>new capture</span>
              <p>“A garden path makes wandering feel intentional.”</p>
            </article>
            <article className={styles.noteBloomTwo}>
              <span>crossing</span>
              <p>Landscape note touches memory palace research.</p>
            </article>
            <article className={styles.noteBloomThree}>
              <span>fruiting idea</span>
              <p>Draft: “Why knowledge tools need seasons.”</p>
            </article>
            <article className={styles.noteBloomFour}>
              <span>dormant</span>
              <p>Walking meetings, attention, return visits.</p>
            </article>
          </div>
        </section>

        <section className={styles.network} id="network">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>The hidden work</p>
            <h2>Connections form slowly, underground, before they become visible.</h2>
          </div>

          <div className={styles.growthGrid}>
            <article>
              <span className={styles.growthGlyph} aria-hidden="true" />
              <h3>Capture spores</h3>
              <p>
                Small observations stay small. You do not need to turn every
                fragment into a project before it is allowed to exist.
              </p>
            </article>
            <article>
              <span className={styles.growthGlyph} aria-hidden="true" />
              <h3>Let strands meet</h3>
              <p>
                Shared references, recurring phrases, and your own explicit links
                create quiet pathways between distant notes.
              </p>
            </article>
            <article>
              <span className={styles.growthGlyph} aria-hidden="true" />
              <h3>Harvest what fruits</h3>
              <p>
                When several strands converge, Commonplace brings the cluster to
                the surface as a draft, question, or decision ready for attention.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.seasons} id="seasons">
          <div className={styles.rings} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={styles.seasonCopy}>
            <p className={styles.sectionLabel}>Seasonal knowledge</p>
            <h2>Some ideas need a winter before they can be used.</h2>
            <p>
              Commonplace treats dormancy as part of thinking. Notes can rest
              without being archived into oblivion; when your work changes season,
              they reappear with their original texture intact.
            </p>
          </div>
          <div className={styles.seasonList} aria-label="Seasonal review example">
            <div>
              <span>spring</span>
              <p>Three questions ready for research</p>
            </div>
            <div>
              <span>summer</span>
              <p>One cluster dense enough to draft</p>
            </div>
            <div>
              <span>winter</span>
              <p>Twelve notes intentionally resting</p>
            </div>
          </div>
        </section>

        <section className={styles.grow} id="grow">
          <p>Plant fragments now. Harvest understanding later.</p>
          <a href="#top">Plant your first note</a>
        </section>
      </main>
    </div>
  );
}
