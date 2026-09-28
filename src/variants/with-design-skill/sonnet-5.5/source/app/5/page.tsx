import { Caveat, Literata } from "next/font/google";
import Editor from "./Editor";
import styles from "./styles.module.css";

const lit = Literata({ subsets: ["latin"], variable: "--f-lit" });
const hand = Caveat({ subsets: ["latin"], variable: "--f-hand" });

export default function MarginNotes() {
  return (
    <div className={`${styles.page} ${lit.variable} ${hand.variable}`}>
      <header className={styles.bar}>
        <a href="#top" className={styles.wordmark}>
          Loam
        </a>
        <a href="#try" className={styles.barLink}>
          Try the editor
        </a>
      </header>

      <main id="top" className={styles.main}>
        <div className={styles.head}>
          <h1 className={styles.h1}>Write like it’s paper. Read like it’s a library.</h1>
          <p className={styles.lede}>
            Loam is a plain, quiet editor. As you write, the margin fills with the notes you
            already have on the same people and ideas.
          </p>
          <span className={styles.scribble} aria-hidden="true">
            try it, it’s live
          </span>
        </div>

        <section id="try" className={styles.try} aria-label="Live editor demo">
          <Editor />
        </section>

        <section className={styles.notes}>
          <article>
            <h2>Double brackets make a link</h2>
            <p>
              Type a note’s name in [[double brackets]] and the two notes are connected in both
              directions. Rename a note and every link follows.
            </p>
          </article>
          <article>
            <h2>Mentions are found for you</h2>
            <p>
              If you write a name you have a note for, Loam offers to link it. You decide each
              time; nothing changes without you.
            </p>
          </article>
          <article>
            <h2>It’s just text underneath</h2>
            <p>
              Every note is a Markdown file you can open in any other app. If you leave, your notes
              leave with you.
            </p>
          </article>
        </section>

        <section className={styles.cta}>
          <h2>Open a blank page.</h2>
          <a href="#top" className={styles.ctaBtn}>
            Start writing in Loam
          </a>
        </section>
      </main>
    </div>
  );
}
