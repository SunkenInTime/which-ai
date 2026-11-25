import styles from "./IterationFour.module.css";

export default function IterationFour() {
  return (
    <div className={styles.page}>
      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#top" aria-label="Commonplace home">
          Commonplace <span>field book</span>
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#protocol">Protocol</a>
          <a href="#evidence">Evidence</a>
          <a href="#record">Record</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="field-title">
          <div className={styles.ruler} aria-hidden="true">
            {Array.from({ length: 15 }, (_, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Field system for notes worth verifying</p>
            <h1 id="field-title">Ideas, observed in the wild.</h1>
            <p className={styles.lede}>
              Commonplace is a second brain for people who collect evidence:
              quick observations, exact sources, connected specimens, and the
              conclusions they eventually support.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#record">Open a field book</a>
              <a className={styles.secondaryAction} href="#protocol">Read the protocol</a>
            </div>
          </div>

          <aside className={styles.fieldSheet} aria-label="Example field notes">
            <div className={styles.tapeOne} aria-hidden="true" />
            <div className={styles.tapeTwo} aria-hidden="true" />
            <div className={styles.sheetHeader}>
              <span>field log</span>
              <strong>25 November</strong>
            </div>
            <article className={styles.entry}>
              <time>07:12</time>
              <div>
                <h2>Train platform</h2>
                <p>People annotate space with routines. The same shoes pause at the same yellow line.</p>
                <span>tags: behavior, place</span>
              </div>
            </article>
            <article className={styles.entryPinned}>
              <time>11:40</time>
              <div>
                <h2>Margin of essay</h2>
                <p>Memory improves when retrieval has a cost. Connect to note 118.</p>
                <span>links: learning, friction</span>
              </div>
            </article>
            <article className={styles.entry}>
              <time>18:03</time>
              <div>
                <h2>Kitchen table</h2>
                <p>What if search results showed the observation before the summary?</p>
                <span>question</span>
              </div>
            </article>
          </aside>
        </section>

        <section className={styles.protocol} id="protocol">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Observation protocol</p>
            <h2>Capture first. Classify lightly. Connect when evidence appears.</h2>
          </div>

          <ol className={styles.protocolList}>
            <li>
              <div className={styles.specimenTab}>entry</div>
              <h3>Record the specimen</h3>
              <p>
                Type, dictate, photograph, or clip the moment. Every entry keeps
                time, place, and source without asking you to choose a folder.
              </p>
            </li>
            <li>
              <div className={styles.specimenTab}>compare</div>
              <h3>Lay specimens side by side</h3>
              <p>
                Commonplace suggests neighboring observations, making repetition,
                contradiction, and pattern visible before you draw conclusions.
              </p>
            </li>
            <li>
              <div className={styles.specimenTab}>infer</div>
              <h3>Attach the inference</h3>
              <p>
                When a claim emerges, it carries its chain of observations with it.
                Months later you can still inspect how you arrived there.
              </p>
            </li>
          </ol>
        </section>

        <section className={styles.evidence} id="evidence">
          <div className={styles.evidenceIntro}>
            <p className={styles.sectionLabel}>Chain of custody</p>
            <h2>A conclusion is only as useful as the evidence it can show.</h2>
          </div>

          <div className={styles.evidenceTable} aria-label="Example chain of evidence">
            <div className={styles.tableHead}>
              <span>claim</span>
              <span>supporting observations</span>
              <span>status</span>
            </div>
            <div className={styles.tableRow}>
              <p>Retrieval cues work better when tied to place.</p>
              <p>Commute note, museum visit, spaced repetition essay</p>
              <strong>supported</strong>
            </div>
            <div className={styles.tableRow}>
              <p>Capture friction changes what kinds of ideas survive.</p>
              <p>Kitchen question, voice memo, abandoned draft</p>
              <strong>in review</strong>
            </div>
            <div className={styles.tableRow}>
              <p>Projects become legible when evidence stays attached.</p>
              <p>Research log, interview excerpt, outline revision</p>
              <strong>supported</strong>
            </div>
          </div>
        </section>

        <section className={styles.record} id="record">
          <p>Keep the evidence. Keep the questions. Keep thinking.</p>
          <a href="#top">Open a field book</a>
        </section>
      </main>
    </div>
  );
}
