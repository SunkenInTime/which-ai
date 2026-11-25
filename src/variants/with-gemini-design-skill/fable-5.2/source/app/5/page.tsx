// Gallery adaptation: fonts come from app/fonts.css (self-hosted, prefixed names) instead of next/font.
import CardStack from "./CardStack";
import styles from "./page.module.css";

const SOURCES = [
  {
    title: "Typed in two seconds",
    text: "Press Option and Space in any app, write the thought, hit Return.",
    tone: styles.toneWhite,
    icon: "M6 14h28v14H6zM11 19h2M17 19h2M23 19h2M29 19h0M13 24h14",
  },
  {
    title: "Said out loud",
    text: "Talk on a walk. Engram writes it down and keeps the recording.",
    tone: styles.toneLime,
    icon: "M20 6a5 5 0 0 1 5 5v8a5 5 0 0 1-10 0v-8a5 5 0 0 1 5-5zM10 19a10 10 0 0 0 20 0M20 29v6",
  },
  {
    title: "Clipped while reading",
    text: "Highlight a passage in your browser or e-reader. The source comes along.",
    tone: styles.tonePink,
    icon: "M11 6h18v28l-9-7-9 7zM16 14h8M16 19h8",
  },
  {
    title: "Forwarded from email",
    text: "Send a message to your private address and it turns into a note.",
    tone: styles.toneButter,
    icon: "M5 10h30v20H5zM5 11l15 11 15-11",
  },
];

export default function Page() {
  return (
    <div className={`${styles.page} gf-syne-display gf-dm-sans-body`}>
      <header className={styles.header}>
        <a href="#top" className={styles.brand}>
          engram
        </a>
        <nav className={styles.nav} aria-label="Main">
          <a href="#capture">Capture</a>
          <a href="#connect">Connect</a>
          <a href="#recall">Recall</a>
          <a href="#start">Pricing</a>
        </nav>
        <a href="#start" className={styles.signin}>
          Sign in
        </a>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <h1 className={styles.mega}>
            <span className={styles.megaBack}>Total</span>
            <span className={styles.megaFront}>recall</span>
          </h1>
          <CardStack />
          <div className={styles.horizon}>
            <p>
              Engram is a note-taking app that works as your second brain. Capture
              anything, and it links, sorts and resurfaces your notes for you.
            </p>
            <a href="#start" className={styles.button}>
              Start your second brain
            </a>
          </div>
        </section>

        <section id="capture" className={styles.spread}>
          <div className={styles.spreadSticky}>
            <div className={styles.spreadCopy}>
              <h2>Everything lands in one stack.</h2>
              <p>
                However a thought reaches you, it ends up in the same place. No
                inboxes to check, no apps to keep in step.
              </p>
            </div>
            <ul className={styles.spreadCards}>
              {SOURCES.map((source, index) => (
                <li
                  key={source.title}
                  className={source.tone}
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <svg viewBox="0 0 40 40" aria-hidden="true">
                    <path d={source.icon} />
                  </svg>
                  <h3>{source.title}</h3>
                  <p>{source.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="connect" className={styles.connect}>
          <div className={styles.connectPanel}>
            <div className={styles.connectCopy}>
              <h2>Each note finds its neighbors.</h2>
              <p>
                Engram reads what you write and links it to notes that cover the same
                ground. Open any note and the related ones are already beside it.
              </p>
            </div>
            <div className={styles.layers} aria-hidden="true">
              <div className={`${styles.layer} ${styles.layerBack}`}>
                <strong>Spaced repetition</strong>
                <p>Review just before you would forget. Each review pushes the next one further out.</p>
              </div>
              <div className={`${styles.layer} ${styles.layerMid}`}>
                <strong>Sleep and memory</strong>
                <p>Deep sleep moves the day&apos;s learning into long-term storage.</p>
              </div>
              <div className={`${styles.layer} ${styles.layerFront}`}>
                <strong>Exam plan</strong>
                <p>
                  Three weeks left. Study in the morning, <u>review</u> at night and
                  protect <u>sleep</u>.
                </p>
                <span>2 related notes found</span>
              </div>
            </div>
          </div>
        </section>

        <section id="recall" className={styles.recall}>
          <h2>Ask it what you decided in March.</h2>
          <div className={styles.recallStage}>
            <p className={styles.query}>What did I decide about pricing?</p>
            <div className={styles.reply}>
              <p>
                You chose the $8 plan on March 4. The call with Dana settled it: the
                cheaper tier brought in people who never came back.
              </p>
              <span>From “Call with Dana” and “Pricing test”</span>
            </div>
          </div>
          <p className={styles.recallText}>
            Ask in your own words. Engram answers from your notes and shows exactly
            which ones it used, so you can check it.
          </p>
        </section>

        <section className={styles.yours}>
          <h2>Your notes stay yours.</h2>
          <div>
            <p>
              Every note is a plain Markdown file on your device, so it opens in any
              app and works without a connection.
            </p>
            <p>
              Sync is end-to-end encrypted. Nobody at Engram can read your notes, and
              they are never used to train a model.
            </p>
          </div>
        </section>

        <section id="start" className={styles.start}>
          <h2>Start your stack today.</h2>
          <p>
            Free on one device for as long as you like. Encrypted sync across all of
            them is $8 a month.
          </p>
          <a href="#top" className={styles.button}>
            Download Engram
          </a>
          <p className={`${styles.mega} ${styles.megaFoot}`} aria-hidden="true">
            engram
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <nav aria-label="Footer">
          <a href="#capture">Capture</a>
          <a href="#connect">Connect</a>
          <a href="#recall">Recall</a>
          <a href="#top">Privacy</a>
        </nav>
        <span>© 2026 Engram Labs</span>
      </footer>
    </div>
  );
}
