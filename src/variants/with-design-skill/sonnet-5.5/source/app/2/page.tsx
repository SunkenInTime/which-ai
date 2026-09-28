import { Instrument_Serif, Manrope } from "next/font/google";
import Graph from "./Graph";
import styles from "./styles.module.css";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-serif" });
const sans = Manrope({ subsets: ["latin"], variable: "--f-sans" });

export default function Constellation() {
  return (
    <div className={`${styles.page} ${serif.variable} ${sans.variable}`}>
      <header className={styles.bar}>
        <a href="#top" className={styles.mark}>
          Loam
        </a>
        <nav className={styles.nav} aria-label="Sections">
          <a href="#how">How it links</a>
          <a href="#plans">Plans</a>
          <a href="#top" className={styles.navCta}>
            Get Loam
          </a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <h1 className={styles.h1}>
            Your notes already know
            <br />
            each other. <i>Loam shows you how.</i>
          </h1>
          <p className={styles.lede}>
            Every note you write is a point. Every mention of a person, book or idea draws a line
            to the notes that came before it. Hover a note below.
          </p>
        </section>

        <section className={styles.stage} aria-label="Interactive note map">
          <Graph />
        </section>

        <section id="how" className={styles.how}>
          <div>
            <h2>Write normally</h2>
            <p>No folders to choose and no tags to remember. Type the note and move on.</p>
          </div>
          <div>
            <h2>See what it touches</h2>
            <p>
              A side panel lists every note that shares a person, place or idea with the one
              you’re writing.
            </p>
          </div>
          <div>
            <h2>Follow a thread</h2>
            <p>
              Click through from the harbour pilot to the book to the chapter you abandoned last
              spring.
            </p>
          </div>
        </section>

        <section id="plans" className={styles.plans}>
          <div className={styles.plan}>
            <h2>Free</h2>
            <p>Up to 500 notes, on one device, with the full map.</p>
            <a href="#top" className={styles.ghost}>
              Start free
            </a>
          </div>
          <div className={`${styles.plan} ${styles.planMain}`}>
            <h2>Loam Plus, $8 a month</h2>
            <p>Unlimited notes, every device, and suggestions for old notes worth revisiting.</p>
            <a href="#top" className={styles.solid}>
              Try Plus for 30 days
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
