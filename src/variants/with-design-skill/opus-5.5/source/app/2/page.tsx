import { Overpass } from "next/font/google";
import NoteMap from "./NoteMap";
import styles from "./styles.module.css";

const overpass = Overpass({ subsets: ["latin"], variable: "--f-sign" });

const journey = [
  {
    name: "Capture",
    text: "Press ⌥ Space in any app and type. Clip pages, forward emails, record voice memos.",
  },
  {
    name: "Connect",
    text: "Commonplace suggests the topics a note belongs to and the notes it should link to.",
  },
  {
    name: "Review",
    text: "Each morning, five older notes come back — the ones near what you're working on.",
  },
  {
    name: "Find",
    text: "Search by meaning. “Why cramming fails” finds a note titled “Spacing beats rereading.”",
  },
];

export default function TransitMap() {
  return (
    <div className={`${styles.page} ${overpass.variable}`}>
      <header className={styles.bar}>
        <a href="#" className={styles.wordmark}>
          <span className={styles.roundel} aria-hidden />
          Commonplace
        </a>
        <nav className={styles.nav}>
          <a href="#journey">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#download" className={styles.navCta}>
            Download
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.h1}>See where your ideas meet.</h1>
            <p className={styles.lede}>
              Commonplace files every note under the topics it touches. Topics
              become lines, notes become stops, and the interchanges are where
              your best thinking tends to be.
            </p>
          </div>
          <NoteMap />
        </section>

        <section className={styles.journey} id="journey">
          <h2 className={styles.h2}>How a note travels</h2>
          <ol className={styles.route}>
            {journey.map((stop) => (
              <li key={stop.name} className={styles.stop}>
                <h3>{stop.name}</h3>
                <p>{stop.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.local}>
          <h2 className={styles.h2}>Your map lives on your disk</h2>
          <p>
            Every note is a plain Markdown file in a folder you choose.
            Commonplace works offline, opens in under a second with 50,000
            notes, and never needs an account. If you stop using it, your
            notes are still just files.
          </p>
        </section>

        <section className={styles.pricing} id="pricing">
          <h2 className={styles.h2}>Pricing</h2>
          <div className={styles.plans}>
            <div className={styles.plan}>
              <h3>Personal</h3>
              <p className={styles.price}>Free</p>
              <p>Unlimited notes and every feature, on one device.</p>
            </div>
            <div className={styles.plan}>
              <h3>Sync</h3>
              <p className={styles.price}>$5 a month</p>
              <p>
                All your devices, end-to-end encrypted, with a year of version
                history.
              </p>
            </div>
          </div>
          <div className={styles.download} id="download">
            <a href="#" className={styles.primary}>
              Download for Mac
            </a>
            <span>Also on Windows, Linux, iPhone and Android.</span>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Commonplace</span>
        <span>Markdown files, drawn as a map.</span>
      </footer>
    </div>
  );
}
