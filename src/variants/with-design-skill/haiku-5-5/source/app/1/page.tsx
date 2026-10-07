import { Newsreader } from "next/font/google";
import styles from "@/variants/with-design-skill/haiku-5-5/source/app/1/lexicon.module.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  axes: ["opsz"],
});

export default function LexiconPage() {
  return (
    <div className={`${newsreader.variable} ${styles.page}`}>
      <header className={styles.header}>
        <span className={styles.wordmark}>Loam</span>
        <a className={styles.quietLink} href="#">
          Log in
        </a>
      </header>

      <main className={styles.main}>
        <section className={styles.entry} aria-labelledby="headword">
          <h1 id="headword" className={styles.headword}>
            Loam
          </h1>

          <div className={styles.meta}>
            <p className={styles.pronunciation}>/lōm/</p>
            <p className={styles.partOfSpeech}>noun</p>
          </div>

          <div className={styles.body}>
            <ol className={styles.senses}>
              <li>Rich, crumbly soil in which things take root and grow.</li>
              <li>
                A notebook that treats every note as soil. What you write today
                feeds what you think about next year.
              </li>
            </ol>
            <p className={styles.etymology}>[Old English lām, clay]</p>

            <div className={styles.actions}>
              <a className={styles.primary} href="#">
                Start your notebook
              </a>
              <a className={styles.secondary} href="#sample">
                Read a sample note
              </a>
            </div>
          </div>
        </section>

        <section className={styles.related} aria-labelledby="related-title">
          <h2 id="related-title" className={styles.sectionTitle}>
            Related entries
          </h2>

          <dl className={styles.entries}>
            <div className={styles.entryItem}>
              <dt>
                <span className={styles.term}>capture</span>{" "}
                <span className={styles.partOfSpeech}>verb</span>
              </dt>
              <dd>
                To write a thought down the moment it arrives, in whatever
                form it takes: a line, a link, a voice note.
              </dd>
            </div>
            <div className={styles.entryItem}>
              <dt>
                <span className={styles.term}>connect</span>{" "}
                <span className={styles.partOfSpeech}>verb</span>
              </dt>
              <dd>
                To link one note to another as you write, so the connection
                exists before you go looking for it.
              </dd>
            </div>
            <div className={styles.entryItem}>
              <dt>
                <span className={styles.term}>resurface</span>{" "}
                <span className={styles.partOfSpeech}>verb</span>
              </dt>
              <dd>
                To come back into view, unprompted, when a note is relevant
                again.
              </dd>
            </div>
          </dl>
        </section>

        <section id="sample" className={styles.sample} aria-labelledby="sample-title">
          <h2 id="sample-title" className={styles.sectionTitle}>
            In use
          </h2>

          <article className={styles.note}>
            <h3 className={styles.noteTitle}>Soil is a food web, not a substrate</h3>
            <p>
              The decomposers are the whole point. Whatever is left over feeds
              the next season, so the compost bin deserves the same care as the
              beds.
            </p>
            <p className={styles.noteMeta}>
              Linked from Garden plan 2027 and Reading, spring. Resurfaced on
              14 October, when you opened Garden plan 2027.
            </p>
          </article>
        </section>

        <section className={styles.close} aria-labelledby="close-title">
          <h2 id="close-title" className={styles.sectionTitle}>
            Start with one word
          </h2>
          <div className={styles.closeBody}>
            <p>
              Write the first note, then the second. By the time you have ten,
              the entries start pointing at each other.
            </p>
            <a className={styles.primary} href="#">
              Start your notebook
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Loam. Notes that feed each other.</span>
        <nav aria-label="Footer" className={styles.footerLinks}>
          <a href="#">Export as plain text</a>
          <a href="#">Privacy</a>
        </nav>
      </footer>
    </div>
  );
}
