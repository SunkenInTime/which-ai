import { Hanken_Grotesk, Newsreader } from "next/font/google";
import Editor from "./Editor";
import styles from "./styles.module.css";

const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--f-ui" });
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--f-note",
});

const shortcuts = [
  { keys: ["⌥", "Space"], action: "Jot a note from any app" },
  { keys: ["⌘", "K"], action: "Search by meaning" },
  { keys: ["[", "["], action: "Link to another note" },
  { keys: ["⌘", "⇧", "R"], action: "Open this morning’s review" },
];

export default function LiveEditor() {
  return (
    <div className={`${styles.page} ${hanken.variable} ${newsreader.variable}`}>
      <div className={styles.hero}>
        <header className={styles.bar}>
          <a href="#" className={styles.wordmark}>
            Commonplace
          </a>
          <nav className={styles.nav}>
            <a href="#keys">Shortcuts</a>
            <a href="#pricing">Pricing</a>
            <a href="#pricing" className={styles.navCta}>
              Download
            </a>
          </nav>
        </header>
        <div className={styles.heroText}>
          <h1 className={styles.h1}>
            Write a note. See what you&rsquo;ve already written about it.
          </h1>
          <p className={styles.lede}>
            As you type, Commonplace finds your older notes on the same idea.
            This is the real editor, loaded with a sample notebook &mdash; try
            writing about sleep, habits, reading or Seneca.
          </p>
        </div>
        <Editor />
      </div>

      <main className={styles.main}>
        <section id="keys" className={styles.keys}>
          <h2 className={styles.h2}>Four shortcuts cover most of it</h2>
          <table className={styles.table}>
            <tbody>
              {shortcuts.map((s) => (
                <tr key={s.action}>
                  <td>
                    {s.keys.map((k, i) => (
                      <kbd key={i}>{k}</kbd>
                    ))}
                  </td>
                  <td>{s.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.more}>
          <div>
            <h3>Old notes come back</h3>
            <p>
              Each morning, five older notes related to what you&rsquo;re
              writing now. Keep one in rotation or send it back.
            </p>
          </div>
          <div>
            <h3>Plain files, yours</h3>
            <p>
              Every note is a Markdown file in a folder you pick. Works
              offline. No account needed.
            </p>
          </div>
          <div>
            <h3>Fast with 50,000 notes</h3>
            <p>
              Opens in under a second and searches everything as you type,
              because it all lives on your machine.
            </p>
          </div>
        </section>

        <section id="pricing" className={styles.pricing}>
          <h2 className={styles.h2}>Free on one device. $5 a month to sync.</h2>
          <p>
            Every feature is in the free version. Sync adds your phone and
            other computers, end-to-end encrypted, with a year of history.
          </p>
          <div className={styles.actions}>
            <a href="#" className={styles.primary}>
              Download for Mac
            </a>
            <a href="#" className={styles.secondary}>
              Windows, Linux, iPhone &amp; Android
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Commonplace</span>
        <span>A notebook that remembers what you wrote.</span>
      </footer>
    </div>
  );
}
