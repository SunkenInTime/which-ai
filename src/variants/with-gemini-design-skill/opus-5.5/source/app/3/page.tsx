import styles from "./page.module.css";
import HeroNotes from "./HeroNotes";
import { AskNotes, Capture, LinkGraph, Pricing, Resurface } from "./Demos";

export default function PosterPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="#top" className={styles.wordmark} aria-label="Kept home">
          Kept
        </a>
        <nav aria-label="Main" className={styles.nav}>
          <a href="#capture">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#own">Download</a>
          <a href="#start" className={styles.navSignin}>
            Sign in
          </a>
        </nav>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className={styles.heroTitle}>
            <span className={`${styles.band} ${styles.bandYellow}`}>
              <span className={styles.bandText}>Never lose</span>
            </span>
            <span className={`${styles.band} ${styles.bandBlue}`}>
              <span className={styles.bandText}>a good idea</span>
            </span>
            <span className={`${styles.band} ${styles.bandRed}`}>
              <span className={styles.bandText}>again.</span>
            </span>
          </h1>
          <div className={styles.heroCopy}>
            <p>
              Kept saves what you type, clip, and record, then links related notes for you. Drag two notes together
              to try it.
            </p>
            <a href="#start" className={styles.btn}>
              Start free
            </a>
          </div>
          <HeroNotes />
        </section>

        {/* ---------- Capture ---------- */}
        <section id="capture" className={`${styles.section} ${styles.sBlue}`} aria-labelledby="capture-title">
          <div className={styles.captureGrid}>
            <div>
              <h2 id="capture-title" className={styles.h2}>
                Catch it before it’s gone.
              </h2>
              <p className={styles.body}>
                Typed notes, web clips, PDFs, and voice memos all land in one inbox. Press Option + Space from any
                app, write a line, and get back to what you were doing.
              </p>
              <p className={styles.small}>Voice memos are transcribed on your device, so they’re searchable too.</p>
            </div>
            <Capture />
          </div>
        </section>

        {/* ---------- Links + graph ---------- */}
        <section className={`${styles.section} ${styles.sPaper}`} aria-labelledby="links-title">
          <div className={styles.linksHead}>
            <h2 id="links-title" className={styles.h2}>
              Notes that find each other.
            </h2>
            <p className={styles.body}>
              Kept spots when notes share an idea and links them, with backlinks on both sides. Open the map to see
              how your thinking connects. Pick a note to follow its links.
            </p>
          </div>
          <LinkGraph />
        </section>

        {/* ---------- Ask ---------- */}
        <section className={`${styles.section} ${styles.sRed}`} aria-labelledby="ask-title">
          <div className={styles.askGrid}>
            <div>
              <h2 id="ask-title" className={styles.h2}>
                Ask your notes. Get answers with sources.
              </h2>
              <p className={styles.body}>
                Ask in plain words. Kept answers only from what you’ve saved and shows exactly which notes it used,
                so you can check every line.
              </p>
            </div>
            <AskNotes />
          </div>
        </section>

        {/* ---------- Resurface ---------- */}
        <section className={`${styles.section} ${styles.sYellow}`} aria-labelledby="resurface-title">
          <div className={styles.resurfaceGrid}>
            <Resurface />
            <div>
              <h2 id="resurface-title" className={styles.h2}>
                Old ideas come back when they matter.
              </h2>
              <p className={styles.body}>
                Every morning starts with a fresh daily note. Kept brings back what you wrote on this day, plus older
                notes on a spaced schedule and whenever they relate to what you’re writing now.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Ownership ---------- */}
        <section id="own" className={`${styles.section} ${styles.sInk}`} aria-labelledby="own-title">
          <h2 id="own-title" className={styles.h2}>
            Your brain stays yours.
          </h2>
          <dl className={styles.ownList}>
            <div className={styles.ownRow}>
              <dt>Works offline</dt>
              <dd>Every note lives on your device first. Write on a plane, sync when you land.</dd>
            </div>
            <div className={styles.ownRow}>
              <dt>End-to-end encrypted</dt>
              <dd>Notes are locked with a key only you hold. We can’t read them, and neither can anyone else.</dd>
            </div>
            <div className={styles.ownRow}>
              <dt>Plain markdown export</dt>
              <dd>Take everything with you in one click, as ordinary files any editor can open.</dd>
            </div>
            <div className={styles.ownRow}>
              <dt>On every device</dt>
              <dd>Mac, Windows, iPhone, iPad, Android, and the web, all in sync.</dd>
            </div>
          </dl>
        </section>

        {/* ---------- Testimonials ---------- */}
        <section className={styles.quotes} aria-label="What people say">
          <figure className={`${styles.quote} ${styles.quoteBlue}`}>
            <blockquote>“I stopped losing ideas in twelve different apps.”</blockquote>
            <figcaption>Priya Raman, product designer</figcaption>
          </figure>
          <figure className={`${styles.quote} ${styles.quotePaper}`}>
            <blockquote>“Kept linked my thesis notes before I knew they belonged together.”</blockquote>
            <figcaption>Tomás Okafor, PhD candidate in ecology</figcaption>
          </figure>
        </section>

        {/* ---------- Pricing ---------- */}
        <section id="pricing" className={`${styles.section} ${styles.sPaper}`} aria-labelledby="pricing-title">
          <div className={styles.pricingHead}>
            <h2 id="pricing-title" className={styles.h2}>
              Free to start. Cheap to keep.
            </h2>
            <p className={styles.body}>Every plan includes offline mode, encryption, and markdown export.</p>
          </div>
          <Pricing />
        </section>

        {/* ---------- Final CTA ---------- */}
        <section id="start" className={styles.final} aria-labelledby="final-title">
          <h2 id="final-title" className={styles.finalTitle}>
            Start keeping.
          </h2>
          <div className={styles.finalCopy}>
            <p className={styles.body}>Free on every device. Bring your notes from Notion, Evernote, or plain files.</p>
            <a href="#top" className={styles.btn}>
              Get Kept free
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerMark}>Kept</p>
        <nav aria-label="Footer" className={styles.footerNav}>
          <ul>
            <li><a href="#capture">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#own">Security</a></li>
          </ul>
          <ul>
            <li><a href="#own">Download</a></li>
            <li><a href="#top">Changelog</a></li>
            <li><a href="#top">Help</a></li>
          </ul>
          <ul>
            <li><a href="#top">Privacy</a></li>
            <li><a href="#top">Terms</a></li>
            <li><a href="#top">Contact</a></li>
          </ul>
        </nav>
        <p className={styles.footerFine}>© 2026 Kept Labs. Made for people who think in notes.</p>
      </footer>
    </div>
  );
}
