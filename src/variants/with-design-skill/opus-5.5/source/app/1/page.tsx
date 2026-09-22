import { Courier_Prime, Libre_Franklin } from "next/font/google";
import CardStack from "./CardStack";
import styles from "./styles.module.css";

const franklin = Libre_Franklin({ subsets: ["latin"], variable: "--f-sans" });
const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--f-type",
});

export default function CardCatalogue() {
  return (
    <div className={`${styles.page} ${franklin.variable} ${courier.variable}`}>
      <header className={styles.bar}>
        <a href="#" className={styles.wordmark}>
          Commonplace
        </a>
        <nav className={styles.nav}>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#download" className={styles.navCta}>
            Download
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.h1}>
              Write it on a card. We&rsquo;ll file it next to everything it
              relates to.
            </h1>
            <p className={styles.lede}>
              Commonplace is a notebook built like a card index. Every note is
              short, every note links to others, and the links show up as you
              write.
            </p>
            <div className={styles.actions} id="download">
              <a href="#" className={styles.primary}>
                Download for Mac
              </a>
              <a href="#" className={styles.secondary}>
                Windows, Linux &amp; iPhone
              </a>
            </div>
          </div>
          <CardStack />
        </section>

        <section className={styles.drawer} id="how">
          <h2 className={styles.h2}>What the index does for you</h2>
          <dl className={styles.features}>
            <div>
              <dt>Capture from anywhere</dt>
              <dd>
                Press <kbd>⌥ Space</kbd> in any app to jot a card. Clip a web
                page, forward an email, or record a voice memo &mdash; each
                becomes a card.
              </dd>
            </div>
            <div>
              <dt>Links as you write</dt>
              <dd>
                While you type, Commonplace lists cards you&rsquo;ve already
                written about the same idea. Link one with a keystroke.
              </dd>
            </div>
            <div>
              <dt>Old cards come back</dt>
              <dd>
                Each morning you get five older cards related to what
                you&rsquo;re working on. Keep them, link them, or let them go
                back in the drawer.
              </dd>
            </div>
            <div>
              <dt>Find by meaning</dt>
              <dd>
                Search for &ldquo;why cramming fails&rdquo; and find the card
                you titled &ldquo;Spacing beats rereading.&rdquo;
              </dd>
            </div>
            <div>
              <dt>Your files, on your disk</dt>
              <dd>
                Every card is a plain Markdown file in a folder you choose.
                Works offline. Leaving means copying a folder.
              </dd>
            </div>
          </dl>
        </section>

        <section className={styles.pricing} id="pricing">
          <h2 className={styles.h2}>Pricing</h2>
          <div className={styles.plans}>
            <article className={styles.plan}>
              <h3>Personal</h3>
              <p className={styles.price}>Free</p>
              <p>
                Unlimited cards on one device. Every feature, including links,
                review, and search.
              </p>
            </article>
            <article className={`${styles.plan} ${styles.planSync}`}>
              <h3>Sync</h3>
              <p className={styles.price}>$5 a month</p>
              <p>
                Everything in Personal, on all your devices. End-to-end
                encrypted, with a year of version history.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Commonplace</span>
        <span>Made for people who read with a pencil.</span>
      </footer>
    </div>
  );
}
