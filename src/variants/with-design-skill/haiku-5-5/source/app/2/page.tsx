import { Archivo } from "next/font/google";
import styles from "@/variants/with-design-skill/haiku-5-5/source/app/2/riso.module.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

export default function RisoPage() {
  return (
    <div className={`${archivo.variable} ${styles.page}`}>
      <header className={styles.top}>
        <span className={styles.logo}>Loam</span>
        <span className={styles.issue}>Issue 01</span>
      </header>

      <main>
        <section className={styles.cover} aria-labelledby="cover-title">
          <h1 id="cover-title" className={styles.headline}>
            <span aria-hidden="true" className={styles.platePink}>
              Stop relearning the same things.
            </span>
            <span className={styles.plateBlue}>
              Stop relearning the same things.
            </span>
          </h1>

          <div className={styles.coverBody}>
            <p className={styles.lead}>
              Loam is a notebook that links what you write and brings it back
              when you need it. Capture a thought, connect it to what you
              already know, and it finds you again.
            </p>
            <a className={styles.button} href="#">
              Start your notebook
            </a>
          </div>

          <ol className={styles.contents} aria-label="Contents">
            <li>
              <span className={styles.pageNumber}>p. 02</span>
              <span>
                <strong>Capture.</strong> Write it down, wherever you are.
              </span>
            </li>
            <li>
              <span className={styles.pageNumber}>p. 04</span>
              <span>
                <strong>Connect.</strong> Notes link themselves as you write.
              </span>
            </li>
            <li>
              <span className={styles.pageNumber}>p. 06</span>
              <span>
                <strong>Resurface.</strong> Old notes come back when they
                matter.
              </span>
            </li>
          </ol>
        </section>

        <section className={styles.spread} aria-labelledby="capture-title">
          <div className={styles.spreadText}>
            <h2 id="capture-title" className={styles.h2}>
              Capture
            </h2>
            <p>
              Type a line, paste a link, or dictate on the train. It lands in
              the inbox with the time and the place attached, and nothing needs
              a folder before it can be kept.
            </p>
          </div>

          <div className={styles.capture} aria-hidden="true">
            <div className={styles.captureField}>
              <p className={styles.captureText}>
                The index is the book. Read the notes, not the chapters.
              </p>
              <div className={styles.captureFoot}>
                <span>Saved to Inbox, 08:14</span>
                <span className={styles.captureKeep}>Keep</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.spread} aria-labelledby="connect-title">
          <div className={styles.spreadText}>
            <h2 id="connect-title" className={styles.h2}>
              Connect
            </h2>
            <p>
              Notes that touch two subjects end up in the overlap. Loam finds
              those overlaps as you write, so the note you wrote about reading
              is also the note about writing.
            </p>
          </div>

          <div className={styles.venn} role="img" aria-label="Two overlapping circles labeled Reading and Writing. Notes in the overlap connect the two subjects.">
            <div className={`${styles.circle} ${styles.circlePink}`} />
            <div className={`${styles.circle} ${styles.circleBlue}`} />
            <span className={`${styles.vennLabel} ${styles.labelReading}`}>Reading</span>
            <span className={`${styles.vennLabel} ${styles.labelWriting}`}>Writing</span>
            <span className={`${styles.vennLabel} ${styles.labelOverlap}`}>
              Notes that touch both
            </span>
          </div>
        </section>

        <section className={styles.spread} aria-labelledby="resurface-title">
          <div className={styles.spreadText}>
            <h2 id="resurface-title" className={styles.h2}>
              Resurface
            </h2>
            <p>
              Loam brings old notes back when they become relevant again. Open
              a project and the notes you wrote about it arrive with it, dated,
              so you can see how your thinking changed.
            </p>
          </div>

          <ul className={styles.resurface}>
            <li>
              <span>Brine ratios for cucumbers</span>
              <span className={styles.date}>Last seen 3 Mar 2024</span>
            </li>
            <li>
              <span>Launch plan, draft 2</span>
              <span className={styles.date}>Last seen 19 Jun 2025</span>
            </li>
            <li>
              <span>Why some books stay with you</span>
              <span className={styles.date}>Last seen 7 Sep 2026</span>
            </li>
          </ul>
        </section>

        <section className={styles.letter} aria-label="Reader letter">
          <blockquote className={styles.quote}>
            <p>
              I stopped searching for my own notes. They turn up when I need
              them, which is the only thing I wanted from a notebook.
            </p>
            <footer>Reader, placeholder copy</footer>
          </blockquote>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <h2 id="closing-title" className={styles.h2}>
            Start issue two
          </h2>
          <p>
            Your first issue is one thought long. Every issue after it gets
            easier to make.
          </p>
          <a className={styles.buttonInk} href="#">
            Start your notebook
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Loam, issue 01. Printed in two inks.</span>
        <a href="#">Export your notes</a>
      </footer>
    </div>
  );
}
