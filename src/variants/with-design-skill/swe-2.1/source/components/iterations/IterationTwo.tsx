import styles from "./IterationTwo.module.css";

export default function IterationTwo() {
  return (
    <div className={styles.page}>
      <header className={styles.siteHeader}>
        <a className={styles.wordmark} href="#top" aria-label="Commonplace home">
          Commonplace
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#rooms">Rooms</a>
          <a href="#route">Route</a>
          <a href="#enter">Enter</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="palace-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>A second brain arranged like a memory palace</p>
            <h1 id="palace-title">Give every thought a room of its own.</h1>
            <p className={styles.lede}>
              Commonplace turns notes into places you can revisit: project rooms,
              reference shelves, open questions, and the corridors that connect them.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#enter">Enter your memory palace</a>
              <a className={styles.secondaryAction} href="#rooms">Inspect the rooms</a>
            </div>
          </div>

          <figure className={styles.planFigure} aria-labelledby="plan-caption">
            <svg className={styles.floorPlan} viewBox="0 0 720 560" role="img">
              <title>Floor plan of connected notes</title>
              <rect className={styles.wall} x="28" y="28" width="664" height="504" />
              <path className={styles.wall} d="M236 28v178H28" />
              <path className={styles.wall} d="M236 206v326" />
              <path className={styles.wall} d="M236 352h184v180" />
              <path className={styles.wall} d="M420 206V28" />
              <path className={styles.wall} d="M420 206h272" />
              <path className={styles.wall} d="M548 206v326" />
              <path className={styles.opening} d="M236 96v54" />
              <path className={styles.opening} d="M122 206h62" />
              <path className={styles.opening} d="M420 112v58" />
              <path className={styles.opening} d="M548 302v62" />
              <path
                className={styles.route}
                d="M92 420 L92 258 L300 258 L300 110 L494 110 L494 292 L624 292 L624 448"
              />
              <circle className={styles.routeNode} cx="92" cy="420" r="10" />
              <circle className={styles.routeNode} cx="300" cy="110" r="10" />
              <circle className={styles.routeNode} cx="494" cy="292" r="10" />
              <circle className={styles.routeNode} cx="624" cy="448" r="10" />
              <text className={styles.roomLabel} x="72" y="88">inbox</text>
              <text className={styles.roomLabel} x="278" y="88">library</text>
              <text className={styles.roomLabel} x="458" y="88">projects</text>
              <text className={styles.roomLabel} x="72" y="318">questions</text>
              <text className={styles.roomLabel} x="268" y="438">study</text>
              <text className={styles.roomLabel} x="462" y="438">people</text>
              <text className={styles.roomLabel} x="586" y="250">archive</text>
              <text className={styles.scaleLabel} x="462" y="518">scale: one note per step</text>
            </svg>
            <figcaption id="plan-caption">
              A note enters through the vestibule, then finds its room and its neighbors.
            </figcaption>
          </figure>
        </section>

        <section className={styles.rooms} id="rooms">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionLabel}>Spatial organization, not folder anxiety</p>
            <h2>The structure is memorable because you can walk through it.</h2>
          </div>

          <div className={styles.roomGrid}>
            <article className={styles.roomLarge}>
              <p className={styles.roomKind}>threshold</p>
              <h3>Capture at the door</h3>
              <p>
                Quick notes land in the vestibule with their time, source, and
                first impression intact. Nothing needs a perfect destination on arrival.
              </p>
            </article>
            <article>
              <p className={styles.roomKind}>corridors</p>
              <h3>Follow associations</h3>
              <p>
                Links read as passages between rooms: this idea depends on that
                source, contradicts that hunch, or answers an old question.
              </p>
            </article>
            <article>
              <p className={styles.roomKind}>rooms</p>
              <h3>Return with intent</h3>
              <p>
                Enter the study when you are drafting, the archive when
                you need evidence, or the questions wing when the work is stuck.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.routeSection} id="route">
          <div className={styles.routeCopy}>
            <p className={styles.sectionLabel}>A daily walk</p>
            <h2>Review becomes a route through what you know.</h2>
            <p>
              Each morning Commonplace lays out a short walk: one unresolved
              question, two related fragments, and one note ready to become prose.
              You are never staring at an endless feed.
            </p>
          </div>
          <div className={styles.routeBoard} aria-label="Example review route">
            <div>
              <span>first stop</span>
              <p>What makes a tool feel like a place?</p>
            </div>
            <div>
              <span>then through</span>
              <p>Architecture notes, habit loops, spatial memory</p>
            </div>
            <div>
              <span>end in the study</span>
              <p>Draft: “Software that gives memory a floor plan”</p>
            </div>
          </div>
        </section>

        <section className={styles.enter} id="enter">
          <p>Build the house your future self will know how to enter.</p>
          <a href="#top">Enter your memory palace</a>
        </section>
      </main>
    </div>
  );
}
