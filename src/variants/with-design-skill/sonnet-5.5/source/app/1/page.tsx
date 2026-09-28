import { Bricolage_Grotesque } from "next/font/google";
import styles from "./styles.module.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-main" });

const pile = [
  { cls: "n1", text: "Ask Priya what she does when a launch slips. Not the process. The first hour.", links: 4 },
  { cls: "n2", text: "Rye starter: 50g flour, 50g water, every 12 hours. Smells like green apple when ready.", links: 1 },
  { cls: "n3", text: "People rarely ask for a feature. They describe a Tuesday that went badly.", links: 9 },
  { cls: "n4", text: "Flight to Lisbon, 6 June. Passport expires in July: renew first.", links: 0 },
  { cls: "n5", text: "Chapter 3 is really two chapters. Split at the interview with the harbour pilot.", links: 3 },
  { cls: "n6", text: "Interval training: the last rep is the only one that counts.", links: 2 },
];

export default function Poster() {
  return (
    <div className={`${styles.page} ${bricolage.variable}`}>
      <header className={styles.bar}>
        <a href="#top" className={styles.mark}>
          Loam
        </a>
        <nav className={styles.nav} aria-label="Sections">
          <a href="#pile">The pile</a>
          <a href="#what">What it does</a>
          <a href="#start" className={styles.navCta}>
            Start free
          </a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <h1 className={styles.h1}>
            Write it down once.
            <br />
            Find it in ten years.
          </h1>
          <p className={styles.lede}>
            Loam is a notebook that links everything you write to everything else you wrote. Your
            notes stop being a pile and start being a second brain.
          </p>
          <div className={styles.actions}>
            <a href="#start" className={styles.primary}>
              Start a notebook
            </a>
            <a href="#pile" className={styles.secondary}>
              See a real pile
            </a>
          </div>
        </section>

        <section id="pile" className={styles.pileSection} aria-labelledby="pile-h">
          <h2 id="pile-h" className={styles.pileH}>
            Six notes from one week. Loam found the links between them.
          </h2>
          <ul className={styles.pile}>
            {pile.map((n) => (
              <li key={n.cls} className={`${styles.note} ${styles[n.cls]}`}>
                <p>{n.text}</p>
                <span className={styles.count}>
                  {n.links === 0 ? "No links yet" : `${n.links} linked ${n.links === 1 ? "note" : "notes"}`}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="what" className={styles.what}>
          <article>
            <h3>Capture in a second</h3>
            <p>
              Press one key from anywhere, type the thought, close the window. It lands in today’s
              page, ready to sort later or never.
            </p>
          </article>
          <article>
            <h3>Links write themselves</h3>
            <p>
              Mention a person, a book or a project you’ve written about before and Loam connects
              the two notes. You can accept or ignore each suggestion.
            </p>
          </article>
          <article>
            <h3>Old notes come back</h3>
            <p>
              When you start writing about something, Loam shows what you already know about it,
              including the note you forgot in 2021.
            </p>
          </article>
        </section>

        <section id="start" className={styles.cta}>
          <h2>Your first hundred notes are free to import.</h2>
          <p>Bring Markdown files, Apple Notes or a folder of text. Nothing is locked in.</p>
          <a href="#top" className={styles.ctaBtn}>
            Import my notes
          </a>
        </section>
      </main>
    </div>
  );
}
