// Gallery adaptation: fonts come from app/fonts.css (self-hosted, prefixed names) instead of next/font.
import CaptureWall from "./CaptureWall";
import styles from "./page.module.css";

const RIBBON = [
  "Meeting notes",
  "Book highlights",
  "Shower ideas",
  "Recipes",
  "Quotes",
  "Half-finished plans",
];

export default function Page() {
  return (
    <div className={`${styles.page} gf-archivo-archivo`}>
      <header className={styles.header}>
        <a href="#top" className={styles.brand}>
          Engram
        </a>
        <nav className={styles.nav} aria-label="Main">
          <a href="#how">How it works</a>
          <a href="#try">Try it</a>
          <a href="#pricing">Pricing</a>
          <a href="#pricing">Sign in</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.sun} aria-hidden="true" />
          <h1 className={styles.poster}>
            <span>Never</span> <br className={styles.brMobile} />
            <span>lose</span> <br className={styles.brDesktop} />
            <span>a</span> <br className={styles.brMobile} />
            <mark>thought</mark> <br />
            <span>again.</span>
          </h1>
          <div className={styles.heroNote}>
            <p>
              Engram is the note app that works like a second brain. Write things
              down once and it keeps them connected and easy to find.
            </p>
            <a href="#pricing" className={styles.buttonInk}>
              Get Engram free
            </a>
          </div>
        </section>

        <div className={styles.ribbon} aria-hidden="true">
          <p>
            {[...RIBBON, ...RIBBON].map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </p>
        </div>

        <section id="how" className={`${styles.band} ${styles.bandPaper}`}>
          <div className={styles.bandCopy}>
            <h2>Get it down in two seconds.</h2>
            <p>
              Press Option and Space from any app, type the thought, hit Return.
              On your phone, say it out loud. Engram takes it from there.
            </p>
          </div>
          <div className={styles.keys} aria-hidden="true">
            <div className={styles.keyRow}>
              <span>option</span>
              <span>space</span>
            </div>
            <p>Ragù needs three hours, not two</p>
          </div>
        </section>

        <section className={`${styles.band} ${styles.bandTomato}`}>
          <div className={styles.linked} aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="22" y1="24" x2="76" y2="36" />
              <line x1="76" y1="36" x2="42" y2="80" />
              <line x1="22" y1="24" x2="42" y2="80" />
            </svg>
            <span>Naps and memory</span>
            <span>Spaced repetition</span>
            <span>Exam plan</span>
          </div>
          <div className={styles.bandCopy}>
            <h2>It files itself.</h2>
            <p>
              No folders, no tags. Engram reads each new note and links it to the
              ones that cover the same ground, so related ideas sit side by side.
            </p>
          </div>
        </section>

        <section className={`${styles.band} ${styles.bandInk}`}>
          <div className={styles.bandCopy}>
            <h2>Ask what you once knew.</h2>
            <p>
              Type a question the way you would ask a friend. Engram answers from
              your own notes and points to where each part came from.
            </p>
          </div>
          <div className={styles.answer} aria-hidden="true">
            <p>What did I decide about pricing?</p>
            <p>
              You picked the $8 plan on March 4, after the call with Dana.
              <span>From “Call with Dana” and “Pricing test”</span>
            </p>
          </div>
        </section>

        <section id="try" className={styles.try}>
          <h2>Try it. What is on your mind?</h2>
          <CaptureWall />
        </section>

        <section id="pricing" className={styles.pricing}>
          <div className={styles.planFree}>
            <h2>Free on one device, forever.</h2>
            <p className={styles.price}>$0</p>
            <ul>
              <li>Unlimited notes and links</li>
              <li>Search and questions that run on your device</li>
              <li>Plain Markdown files you can take anywhere</li>
            </ul>
            <a href="#top" className={styles.buttonInk}>
              Download Engram
            </a>
          </div>
          <div className={styles.planSync}>
            <h2>Every device, always in step.</h2>
            <p className={styles.price}>
              $8 <span>a month</span>
            </p>
            <ul>
              <li>End-to-end encrypted sync</li>
              <li>Phone, tablet, laptop and web</li>
              <li>Voice capture with transcription</li>
            </ul>
            <a href="#top" className={styles.planLink}>
              Start a 14 day trial
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.signoff}>Go ahead, forget it. Engram remembers.</p>
        <div className={styles.footRow}>
          <span className={styles.footBrand}>Engram</span>
          <nav aria-label="Footer">
            <a href="#how">How it works</a>
            <a href="#try">Try it</a>
            <a href="#pricing">Pricing</a>
            <a href="#top">Privacy</a>
          </nav>
          <span>© 2026 Engram Labs</span>
        </div>
      </footer>
    </div>
  );
}
