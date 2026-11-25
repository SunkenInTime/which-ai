import { Fragment } from "react";
import styles from "./page.module.css";
import Header from "./Header";
import MyceliumCanvas from "./MyceliumCanvas";
import CaptureTabs from "./CaptureTabs";
import PinnedStory from "./PinnedStory";
import PricingTable from "./PricingTable";

const HEADLINE = ["A", "second", "brain", "that", "grows", "as", "you", "write."];

export default function Page() {
  return (
    <div className={styles.root} id="top">
      <Header />

      <main>
        <section className={styles.hero}>
          <MyceliumCanvas className={styles.heroCanvas} />
          <div className={styles.heroClearing}>
            <h1 className={styles.heroTitle}>
              {HEADLINE.map((w, i) => (
                <Fragment key={i}>
                  <span className={styles.word} style={{ animationDelay: `${120 + i * 70}ms` }}>
                    {w}
                  </span>{" "}
                </Fragment>
              ))}
            </h1>
            <p className={styles.heroLead}>
              Kept links every note, clip and voice memo to the ideas it belongs with, then brings them back when you
              need them.
            </p>
            <a href="#start" className={styles.button}>
              Start for free
            </a>
          </div>
        </section>

        <section className={styles.capture} id="capture">
          <div className={styles.captureCopy}>
            <h2 className={styles.h2}>Catch the thought before it leaves.</h2>
            <p>
              One shortcut opens a capture window over whatever you are doing. Type it, clip it, drop in a PDF or just
              talk. Kept saves it, makes it searchable and files it next to related notes.
            </p>
            <p className={styles.muted}>Works the same on Mac, Windows, iPhone, iPad, Android and the web.</p>
          </div>
          <CaptureTabs />
        </section>

        <section className={styles.story} id="story">
          <div className={styles.storyIntro}>
            <h2 className={styles.h2}>Write it once. Kept does the remembering.</h2>
            <p>Follow one note from the moment you save it to the day it answers a question you forgot you had.</p>
          </div>
          <PinnedStory />
        </section>

        <section className={styles.privacy} id="privacy">
          <div className={styles.fileView} aria-label="A note exported as a markdown file">
            <div className={styles.fileTree}>
              <p className={styles.fileFolder}>Kept</p>
              <ul>
                <li>Battery tests.md</li>
                <li data-open="true">Call with Mara.md</li>
                <li>Grant draft.md</li>
                <li>Mara 1:1 notes.md</li>
                <li>Soil moisture.md</li>
              </ul>
            </div>
            <div className={styles.fileBody}>
              <p className={styles.fileLine}>
                <span className={styles.mdMark}>#</span> Call with Mara
              </p>
              <p className={`${styles.fileLine} ${styles.muted}`}>2026-11-19, voice memo, 0:42</p>
              <p className={styles.fileLine}>&nbsp;</p>
              <p className={styles.fileLine}>Sensors drain batteries in about three weeks.</p>
              <p className={styles.fileLine}>
                Try sleep mode between readings, see <span className={styles.mdMark}>[[</span>Battery tests
                <span className={styles.mdMark}>]]</span>.
              </p>
              <p className={styles.fileLine}>
                Follow up in <span className={styles.mdMark}>[[</span>Mara 1:1 notes<span className={styles.mdMark}>]]</span>{" "}
                on Friday.
              </p>
            </div>
          </div>

          <div className={styles.privacyCopy}>
            <h2 className={styles.h2}>Your thinking stays yours.</h2>
            <dl className={styles.facts}>
              <div>
                <dt>Works offline</dt>
                <dd>Every note lives on your device first. Write on a plane and it syncs when you land.</dd>
              </div>
              <div>
                <dt>Encrypted end to end</dt>
                <dd>Notes are encrypted before they leave your device. We cannot read them, and nobody else can either.</dd>
              </div>
              <div>
                <dt>Plain markdown, always</dt>
                <dd>Export everything as markdown files with your links intact. Leave whenever you like.</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.quotes} aria-label="What people say">
          <figure className={styles.quote}>
            <blockquote>
              &ldquo;Kept found a link between two research threads I had kept apart for a year. That one connection
              became a paper.&rdquo;
            </blockquote>
            <figcaption>
              <strong>Priya Raman</strong>, soil ecologist, University of Leeds
            </figcaption>
          </figure>
          <figure className={`${styles.quote} ${styles.quoteRight}`}>
            <blockquote>
              &ldquo;Ask your notes is the first search that answers the way I would, and it shows me which meeting I
              said it in.&rdquo;
            </blockquote>
            <figcaption>
              <strong>Daniel Okafor</strong>, product lead at Fieldwork
            </figcaption>
          </figure>
        </section>

        <section className={styles.pricing} id="pricing">
          <div className={styles.pricingHead}>
            <h2 className={styles.h2}>Free to start. Fair as you grow.</h2>
            <p className={styles.muted}>Every plan includes encryption, offline access and markdown export.</p>
          </div>
          <PricingTable />
        </section>

        <section className={styles.final} id="start">
          <MyceliumCanvas
            className={styles.finalCanvas}
            areaPerNode={16000}
            labels={false}
            clearing={{ x: 0.5, y: 0.5, rx: 0.32, ry: 0.32 }}
            seed={21}
          />
          <div className={styles.finalInner}>
            <h2 className={styles.finalTitle}>Give your ideas somewhere to grow.</h2>
            <p>Free for personal notes. Bring an existing markdown folder and Kept links it for you in minutes.</p>
            <a href="#start" className={styles.button}>
              Start for free
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <p className={styles.footerMark}>Kept</p>
          <p className={styles.muted}>A second brain for everything you want to remember.</p>
        </div>
        <nav className={styles.footerCols} aria-label="Footer">
          <div>
            <p className={styles.footerHead}>Product</p>
            <a href="#capture">Capture</a>
            <a href="#story">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#start">Download</a>
          </div>
          <div>
            <p className={styles.footerHead}>Company</p>
            <a href="#top">About</a>
            <a href="#top">Changelog</a>
            <a href="#top">Careers</a>
          </div>
          <div>
            <p className={styles.footerHead}>Trust</p>
            <a href="#privacy">Security</a>
            <a href="#privacy">Privacy policy</a>
            <a href="#top">Terms</a>
          </div>
        </nav>
        <p className={styles.copyright}>© 2026 Kept Labs. Made for curious people.</p>
      </footer>
    </div>
  );
}
