// Gallery adaptation: fonts come from app/fonts.css (self-hosted, prefixed names) instead of next/font.
import GraphCanvas from "./GraphCanvas";
import Steps from "./Steps";
import styles from "./page.module.css";

const CAPTURE = [
  {
    name: "Quick capture",
    text: "Press Option and Space in any app. Type, hit Return, and you are back to what you were doing.",
  },
  {
    name: "Voice",
    text: "Talk it through on a walk. Engram transcribes the recording and files it as a note.",
  },
  {
    name: "Web and books",
    text: "Highlight a passage in your browser or e-reader and it arrives with its source attached.",
  },
  {
    name: "Email",
    text: "Forward a message to your private Engram address and it becomes a note you can link.",
  },
];

export default function Page() {
  return (
    <div className={`${styles.page} gf-bricolage-grotesque-display gf-instrument-sans-body`}>
      <header className={styles.header}>
        <a href="#top" className={styles.brand}>
          <svg viewBox="0 0 28 28" aria-hidden="true">
            <path d="M7 20 14 7l8 10z" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="7" cy="20" r="3.4" fill="currentColor" />
            <circle cx="14" cy="7" r="3.4" fill="currentColor" />
            <circle cx="22" cy="17" r="3.4" fill="var(--accent)" />
          </svg>
          Engram
        </a>
        <nav className={styles.nav} aria-label="Main">
          <a href="#how">How it works</a>
          <a href="#capture">Capture</a>
          <a href="#yours">Privacy</a>
          <a href="#start">Pricing</a>
        </nav>
        <a href="#start" className={styles.signin}>
          Sign in
        </a>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <GraphCanvas className={styles.canvas} />
          <div className={styles.heroCopy}>
            <h1>
              <span>Notes that link</span> <span>themselves.</span>
            </h1>
            <p>
              Engram connects each thing you write to what you already know, so the
              right idea comes back when you need it.
            </p>
            <a href="#start" className={styles.button}>
              Start for free
            </a>
          </div>
        </section>

        <section id="how" className={styles.how} aria-label="How it works">
          <Steps />
        </section>

        <section id="capture" className={styles.capture}>
          <h2>Catch a thought wherever you happen to be.</h2>
          <ul className={styles.rows}>
            {CAPTURE.map((item) => (
              <li key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="yours" className={styles.yours}>
          <div className={styles.yoursInner}>
            <div className={styles.files} aria-hidden="true">
              <p>Engram</p>
              <ul>
                <li>Why naps help learning.md</li>
                <li>Sleep and memory.md</li>
                <li>Spaced repetition.md</li>
                <li>Q3 planning.md</li>
                <li>Ragù recipe.md</li>
                <li>Lisbon trip.md</li>
              </ul>
            </div>
            <div className={styles.yoursCopy}>
              <h2>Your second brain stays in your hands.</h2>
              <dl>
                <div>
                  <dt>Plain files you can open anywhere</dt>
                  <dd>
                    Every note is a Markdown file in a folder on your device. Leave
                    whenever you like and take all of it with you.
                  </dd>
                </div>
                <div>
                  <dt>Works without a connection</dt>
                  <dd>
                    Writing, linking and search all run on your device, on a plane or
                    in a basement.
                  </dd>
                </div>
                <div>
                  <dt>Private by default</dt>
                  <dd>
                    Sync is end-to-end encrypted. We cannot read your notes, and they
                    are never used to train a model.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className={styles.quote}>
          <blockquote>
            <p>
              I stopped organizing my notes two years ago. I just write, and Engram
              hands me the right one when I need it.
            </p>
            <footer>Mira Okafor, doctoral researcher</footer>
          </blockquote>
        </section>

        <section id="start" className={styles.start}>
          <h2>Start with a single note.</h2>
          <p>
            Free for personal use on Mac, Windows, iOS and Android. Add encrypted sync
            across devices for $8 a month.
          </p>
          <a href="#top" className={styles.button}>
            Download Engram
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footBrand}>Engram</span>
        <nav aria-label="Footer">
          <a href="#how">How it works</a>
          <a href="#yours">Privacy</a>
          <a href="#start">Pricing</a>
          <a href="#top">Changelog</a>
        </nav>
        <span>© 2026 Engram Labs</span>
      </footer>
    </div>
  );
}
