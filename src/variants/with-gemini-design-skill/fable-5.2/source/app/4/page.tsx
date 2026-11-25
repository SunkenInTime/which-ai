import Ask from "./Ask";
import Workbench from "./Workbench";
import styles from "./page.module.css";

const TRUST = [
  {
    name: "Capture without breaking focus",
    text: "Press Option and Space in any app, type, hit Return. The note is saved and linked before you are back in your document.",
  },
  {
    name: "Find a note by what it meant",
    text: "Search “that thing about resting after study” and get the nap note, even though you never used those words.",
  },
  {
    name: "Keep working on a plane",
    text: "Writing, linking, search and questions all run on your device. A connection is only needed to sync.",
  },
  {
    name: "Open your notes in any app",
    text: "Every note is a Markdown file in a normal folder. Nothing is locked inside Engram.",
  },
  {
    name: "Stay the only reader",
    text: "Sync is end-to-end encrypted, and your notes are never used to train a model.",
  },
];

export default function Page() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="#top" className={styles.brand}>
          <span aria-hidden="true">[[</span>Engram<span aria-hidden="true">]]</span>
        </a>
        <nav className={styles.nav} aria-label="Main">
          <a href="#ask">Ask</a>
          <a href="#trust">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#pricing">Sign in</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <h1>
            <span>Write a note.</span> <span>Watch it connect.</span>
          </h1>
          <p>
            Engram is a second brain for your notes. Type in the editor below and
            related notes surface while you write.
          </p>
          <a href="#pricing" className={styles.button}>
            Download for free
          </a>
          <Workbench />
        </section>

        <section id="ask" className={styles.askSection}>
          <h2>Ask a question. Get the answer you already wrote.</h2>
          <Ask />
        </section>

        <section id="trust" className={styles.trust}>
          <h2>Built to hold everything you know.</h2>
          <ul>
            {TRUST.map((item) => (
              <li key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="pricing" className={styles.pricing}>
          <h2>Free to start. Fair when you grow.</h2>
          <div className={styles.plans}>
            <div>
              <h3>Personal</h3>
              <p className={styles.price}>$0</p>
              <p>
                Unlimited notes, links, search and questions on one device. Free for
                as long as you use it.
              </p>
              <a href="#top" className={styles.button}>
                Download Engram
              </a>
            </div>
            <div>
              <h3>Sync</h3>
              <p className={styles.price}>
                $8 <span>a month</span>
              </p>
              <p>
                Everything in Personal, plus encrypted sync across phone, tablet,
                computer and web, and voice notes with transcripts.
              </p>
              <a href="#top" className={styles.textLink}>
                Try Sync free for 14 days
              </a>
            </div>
          </div>
        </section>

        <section className={styles.closing}>
          <h2>Your first note takes ten seconds.</h2>
          <a href="#top" className={styles.buttonLight}>
            Get Engram
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <span className={styles.footBrand}>Engram</span>
        <nav aria-label="Footer">
          <a href="#ask">Ask</a>
          <a href="#trust">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#top">Privacy</a>
        </nav>
        <span>© 2026 Engram Labs</span>
      </footer>
    </div>
  );
}
