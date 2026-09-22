import { Caveat, EB_Garamond } from "next/font/google";
import styles from "./styles.module.css";

const garamond = EB_Garamond({ subsets: ["latin"], style: ["normal", "italic"], variable: "--f-book" });
const caveat = Caveat({ subsets: ["latin"], variable: "--f-hand" });

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 40" aria-hidden>
      <path d="M86 8 C 60 2, 30 6, 8 26" />
      <path d="M8 26 L 20 24 M8 26 L 11 14" />
    </svg>
  );
}

export default function Margins() {
  return (
    <div className={`${styles.page} ${garamond.variable} ${caveat.variable}`}>
      <header className={styles.head}>
        <a href="#" className={styles.wordmark}>
          Commonplace
        </a>
        <nav className={styles.nav}>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#pricing">Download</a>
        </nav>
      </header>

      <main className={styles.book}>
        <section className={styles.row}>
          <div className={styles.text}>
            <h1 className={styles.h1}>Keep what you read.</h1>
            <p className={styles.lede}>
              Commonplace collects what you highlight in books, articles and
              PDFs, keeps your own notes beside each passage, and{" "}
              <mark className={styles.mark}>
                brings a passage back when it&rsquo;s useful to what
                you&rsquo;re writing now.
              </mark>
            </p>
            <div className={styles.actions}>
              <a href="#pricing" className={styles.primary}>
                Download Commonplace
              </a>
              <span className={styles.aside}>Free on one device</span>
            </div>
          </div>
          <aside className={styles.margin}>
            <Arrow className={styles.arrow} />
            <p className={`${styles.hand} ${styles.handFirst}`}>
              Kindle, Apple Books, Readwise, Instapaper, PDFs, any web page
            </p>
            <p className={`${styles.hand} ${styles.handSecond}`}>
              five a morning, picked for what you&rsquo;re working on
            </p>
          </aside>
        </section>

        <section className={styles.row} id="how">
          <div className={styles.text}>
            <h2 className={styles.h2}>Every highlight becomes a note</h2>
            <p>
              When you highlight a line, Commonplace saves it with the book,
              page and date. Write a thought beside it and the two stay
              together &mdash; in search, in links, and when you export.
            </p>
            <figure className={styles.clipping}>
              <blockquote>
                We are what we repeatedly do. Excellence, then, is not an act
                but a habit.
              </blockquote>
              <figcaption>
                Will Durant, <cite>The Story of Philosophy</cite>, p.&nbsp;76
                &nbsp;&middot;&nbsp; highlighted 3 Feb 2024
              </figcaption>
              <p className={styles.clippingNote}>
                Durant paraphrasing Aristotle, not Aristotle. Same idea as
                Clear&rsquo;s &ldquo;every action is a vote&rdquo; &mdash;
                link them.
              </p>
            </figure>
          </div>
          <aside className={styles.margin}>
            <p className={styles.hand}>your note, kept with the passage</p>
          </aside>
        </section>

        <section className={styles.row}>
          <div className={styles.text}>
            <h2 className={styles.h2}>Passages find each other</h2>
            <p>
              As you write, Commonplace shows highlights from other books that
              say something close. Durant and James Clear, two shelves and
              ninety years apart, end up one click from each other.
            </p>
          </div>
          <aside className={styles.margin}>
            <p className={styles.hand}>
              links are plain [[wiki links]], so they work in any Markdown app
            </p>
          </aside>
        </section>

        <section className={styles.row}>
          <div className={styles.text}>
            <h2 className={styles.h2}>Old passages come back</h2>
            <p>
              Each morning you get five passages you saved months or years
              ago, chosen for what you&rsquo;ve been writing about lately.
              Reread one, add a thought, or send it back to the shelf.
            </p>
          </div>
        </section>

        <section className={styles.row}>
          <div className={styles.text}>
            <h2 className={styles.h2}>Your library stays yours</h2>
            <p>
              Highlights and notes are Markdown files in a folder you choose.
              Commonplace works offline and doesn&rsquo;t need an account.
            </p>
          </div>
        </section>

        <section className={`${styles.row} ${styles.pricing}`} id="pricing">
          <div className={styles.text}>
            <h2 className={styles.h2}>Pricing</h2>
            <dl className={styles.plans}>
              <dt>Free</dt>
              <dd>Everything, on one device, for as many books as you read.</dd>
              <dt>$5 a month</dt>
              <dd>
                Sync across your phone, tablet and computers, end-to-end
                encrypted.
              </dd>
            </dl>
            <div className={styles.actions}>
              <a href="#" className={styles.primary}>
                Download Commonplace
              </a>
              <span className={styles.aside}>
                Mac, Windows, Linux, iPhone, Android
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.foot}>
        <span>Commonplace</span>
        <span>For people who read with a pencil.</span>
      </footer>
    </div>
  );
}
