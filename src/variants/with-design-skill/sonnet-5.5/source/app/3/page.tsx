import { Work_Sans } from "next/font/google";
import Search from "./Search";
import styles from "./styles.module.css";

const work = Work_Sans({ subsets: ["latin"], variable: "--f-work" });

const asks = [
  { q: "What did Priya say about launches?", a: "Loam pulls the call notes and the two other notes that mention her." },
  { q: "Where did I put that soup recipe?", a: "Even if you filed it under “Sunday” and never gave it a title." },
  { q: "What was I thinking about in March?", a: "Browse by date, or ask for everything that touches one idea." },
];

export default function SearchFirst() {
  return (
    <div className={`${styles.page} ${work.variable}`}>
      <header className={styles.bar}>
        <a href="#top" className={styles.wordmark}>
          Loam
        </a>
        <a href="#ask" className={styles.barLink}>
          What you can ask
        </a>
      </header>

      <main id="top" className={styles.main}>
        <h1 className={styles.h1}>Stop filing. Just ask your notes.</h1>
        <p className={styles.lede}>
          Loam keeps everything you write in one place and finds it by meaning, not by the folder
          you guessed. This is a live search of six sample notes.
        </p>
        <Search />

        <section id="ask" className={styles.ask}>
          <h2 className={styles.askH}>Ask it like you’d ask a friend who read everything</h2>
          <dl className={styles.asks}>
            {asks.map((a) => (
              <div key={a.q} className={styles.askRow}>
                <dt>{a.q}</dt>
                <dd>{a.a}</dd>
              </div>
            ))}
          </dl>
          <a href="#top" className={styles.cta}>
            Start your notebook
          </a>
        </section>
      </main>
    </div>
  );
}
