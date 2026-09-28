import { Hanken_Grotesk, Young_Serif } from "next/font/google";
import styles from "./styles.module.css";

const serif = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--f-serif" });
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--f-sans" });

const layers = [
  {
    cls: "l1",
    year: "2026",
    title: "This week",
    notes: ["Split chapter 3 at the harbour pilot interview.", "Renew passport before June."],
    surfaced: null,
  },
  {
    cls: "l2",
    year: "2025",
    title: "Last year",
    notes: ["Priya: write the status update before the postmortem.", "Pricing: charge for the archive, not the editor."],
    surfaced: "Came back on 12 March, while you were writing about launches.",
  },
  {
    cls: "l3",
    year: "2024",
    title: "Two years down",
    notes: ["Rye starter: 50g flour, 50g water, every 12 hours.", "Attach a new habit to an old one."],
    surfaced: "Came back last Sunday, when you wrote “bake”.",
  },
  {
    cls: "l4",
    year: "2023",
    title: "Three years down",
    notes: ["Wake time beats bedtime.", "The best ideas arrive while walking, so carry a pen."],
    surfaced: "Came back after you started a note called “Sleep”.",
  },
  {
    cls: "l5",
    year: "2021",
    title: "Bedrock",
    notes: ["People rarely ask for a feature. They describe a Tuesday that went badly."],
    surfaced: "Came back 9 times. It is your most linked note.",
  },
];

export default function Strata() {
  return (
    <div className={`${styles.page} ${serif.variable} ${sans.variable}`}>
      <header className={styles.sky}>
        <div className={styles.bar}>
          <a href="#top" className={styles.mark}>
            Loam
          </a>
          <a href="#layers" className={styles.barLink}>
            Dig in
          </a>
        </div>
        <div id="top" className={styles.heroWrap}>
          <h1 className={styles.h1}>
            Notes don’t get old.
            <br />
            They get deeper.
          </h1>
          <p className={styles.lede}>
            Loam keeps every note you have written and lifts the right one back to the surface
            when you need it again. The longer you use it, the more it holds.
          </p>
          <a href="#start" className={styles.cta}>
            Start a notebook
          </a>
        </div>
      </header>

      <main id="layers">
        {layers.map((l) => (
          <section key={l.cls} className={`${styles.layer} ${styles[l.cls]}`} aria-label={l.title}>
            <div className={styles.inner}>
              <div className={styles.year}>
                <span className={styles.yearNum}>{l.year}</span>
                <span>{l.title}</span>
              </div>
              <div className={styles.body}>
                <ul className={styles.notes}>
                  {l.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                {l.surfaced && <p className={styles.surfaced}>{l.surfaced}</p>}
              </div>
            </div>
          </section>
        ))}

        <section id="start" className={styles.core}>
          <div className={styles.inner}>
            <h2 className={styles.coreH}>Start digging.</h2>
            <p>
              Import your old notes and see what surfaces first. Loam reads Markdown, plain text
              and Apple Notes exports.
            </p>
            <a href="#top" className={styles.coreBtn}>
              Import my notes
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
