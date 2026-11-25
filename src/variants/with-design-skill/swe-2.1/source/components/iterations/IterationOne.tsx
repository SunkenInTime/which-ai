import styles from "./IterationOne.module.css";

export default function IterationOne() {
  return (
    <div className={styles.page}>
      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#top" aria-label="Commonplace home">
          Commonplace
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#annotations">Annotations</a>
          <a href="#practice">Practice</a>
          <a href="#begin">Begin</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="marginalia-title">
          <div className={styles.marginGloss} aria-hidden="true">
            <span />
            <p>every margin is a doorway</p>
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.kicker}>
              A second brain for readers, writers, and researchers
            </p>
            <h1 id="marginalia-title">Your thinking, kept in context.</h1>
            <p className={styles.lede}>
              Commonplace gathers the fragments you notice, keeps their sources
              attached, and shows each new idea beside the notes that shaped it.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#begin">
                Start your commonplace book
              </a>
              <a className={styles.secondaryAction} href="#annotations">
                Read the annotations
              </a>
            </div>
          </div>

          <div className={styles.paperStack} aria-label="Preview of connected notes">
            <svg
              className={styles.connectiveTissue}
              viewBox="0 0 620 620"
              aria-hidden="true"
            >
              <path d="M227 128 C 108 145, 103 214, 130 292" />
              <path d="M382 175 C 494 190, 497 285, 452 352" />
              <path d="M282 435 C 205 492, 154 485, 103 438" />
              <circle cx="227" cy="128" r="5" />
              <circle cx="452" cy="352" r="5" />
              <circle cx="103" cy="438" r="5" />
            </svg>

            <article className={styles.mainSlip}>
              <p className={styles.slipMeta}>Attention notebook</p>
              <h2>Attention is a form of quotation.</h2>
              <p>
                What we repeatedly notice becomes the invisible bibliography of
                our work. A note should preserve not only the thought, but the
                pressure that produced it.
              </p>
              <div className={styles.slipLinks}>
                <span>linked from</span>
                <a href="#annotations">reading rhythm</a>
                <a href="#practice">memory cues</a>
              </div>
            </article>

            <aside className={styles.marginCardOne}>
              <span>marginal note</span>
              <p>Capture the sentence before it becomes a summary.</p>
            </aside>

            <aside className={styles.marginCardTwo}>
              <span>resurfaced</span>
              <p>Three notes about attention mention “thresholds.”</p>
            </aside>

            <aside className={styles.marginCardThree}>
              <span>source intact</span>
              <p>Page, passage, and your response remain side by side.</p>
            </aside>
          </div>
        </section>

        <section className={styles.annotationSection} id="annotations">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Notes with a memory of their making</p>
            <h2>A commonplace book is not a warehouse. It is a correspondence.</h2>
          </div>

          <div className={styles.annotationsGrid}>
            <article className={styles.annotation}>
              <span className={styles.annotationRule} aria-hidden="true" />
              <h3>Capture without breaking the sentence</h3>
              <p>
                Save a passage, voice note, screenshot, or stray line in the
                moment it appears. Commonplace keeps the source and your first
                reaction together.
              </p>
            </article>
            <article className={styles.annotation}>
              <span className={styles.annotationRule} aria-hidden="true" />
              <h3>Let neighbors appear naturally</h3>
              <p>
                As you write, related notes surface in the margin. You decide
                whether the connection is a citation, a contradiction, or a
                question worth returning to.
              </p>
            </article>
            <article className={styles.annotation}>
              <span className={styles.annotationRule} aria-hidden="true" />
              <h3>Re-read instead of re-file</h3>
              <p>
                Search leads back to a trail of context: what you were reading,
                what you thought then, and which ideas changed your mind later.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.practice} id="practice">
          <div className={styles.practiceHeading}>
            <p className={styles.sectionLabel}>A daily practice</p>
            <h2>Small entries compound into an intellectual autobiography.</h2>
          </div>
          <ol className={styles.practiceList}>
            <li>
              <span>1</span>
              <div>
                <h3>Notice</h3>
                <p>Keep the fragment while it is still warm and specific.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Respond</h3>
                <p>Add the objection, association, or image it awakened.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Return</h3>
                <p>Let resurfaced notes alter the next thing you make.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className={styles.begin} id="begin">
          <p>Begin with one page. The connections will accumulate quietly.</p>
          <a href="#top">Start your commonplace book</a>
        </section>
      </main>
    </div>
  );
}
