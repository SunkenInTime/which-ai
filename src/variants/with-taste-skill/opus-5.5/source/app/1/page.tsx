import type { Metadata } from "next";
import styles from "./page.module.css";
import Recall from "./Recall";
import Outputs from "./Outputs";
import Stages from "./Stages";
import Faq from "./Faq";
import StartDialog from "./StartDialog";
import Reveal from "./Reveal";
import Loop from "./Loop";

// Gallery copy: the fonts come from app/fonts.css under "Opus v2" family names (see that file);
// this stands in for the next/font result and sets the same CSS variable.
const hanken = { variable: "opus-v2-hanken-grotesk" };

export const metadata: Metadata = {
  title: "Engram: the notebook that writes back",
  description:
    "Engram is a second brain: a note-taking app that keeps everything you write and, as you type, brings back the older notes that matter.",
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const COMPARE = [
  ["Brings back a note you forgot you wrote", "No", "No, you have to ask", "Yes, in the margin as you write"],
  ["Finds it without the exact word", "Sometimes", "Rarely", "Yes, matched by meaning"],
  ["Shows every note that points to this one", "No", "In some apps", "Yes, with unlinked mentions"],
  ["Catches a thought in the middle of something else", "If you are lucky", "Open the app, find the note", "⌥ Space over any window"],
  ["Where the notes live", "In your head", "On someone’s server", "In a folder on your disk"],
  ["Readable in thirty years", "Fading", "If the company lasts", "Plain Markdown files"],
  ["Works on a plane", "Yes", "Often not", "Yes, everything but sync"],
  ["Costs", "Nothing", "Varies", "Free on one device"],
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    featured: false,
    rows: ["One", "Unlimited", "Included, on your device", "Not included", "Not included", "On your disk", "Not included"],
    action: "Download free",
  },
  {
    name: "Sync",
    price: "$6",
    period: "a month, or $60 a year",
    featured: true,
    rows: ["All of yours", "Unlimited", "Included, on each device", "End-to-end encrypted", "One year", "20 GB", "Not included"],
    action: "Choose Sync",
  },
  {
    name: "Family",
    price: "$10",
    period: "a month, or $100 a year",
    featured: false,
    rows: ["All, for five people", "Unlimited", "Included, on each device", "End-to-end encrypted", "One year", "20 GB each", "One shared vault"],
    action: "Choose Family",
  },
];

const PLAN_ROWS = ["Devices", "Notes and links", "Margin and search", "Sync", "Version history", "Attachments", "Shared vault"];

function Mark() {
  return (
    <svg className={styles.mark} viewBox="0 0 26 26" aria-hidden="true">
      <rect x="0" y="0" width="26" height="26" rx="6" fill="#1f3038" />
      <rect x="6" y="6" width="3" height="14" fill="#f7f9fa" />
      <rect x="6" y="6" width="6" height="3" fill="#f7f9fa" />
      <rect x="6" y="17" width="6" height="3" fill="#f7f9fa" />
      <rect x="17" y="6" width="3" height="14" fill="#5fc4cc" />
      <rect x="14" y="6" width="6" height="3" fill="#5fc4cc" />
      <rect x="14" y="17" width="6" height="3" fill="#5fc4cc" />
    </svg>
  );
}

export default function Page() {
  return (
    <div className={`${hanken.variable} ${styles.page}`}>
      <header className={styles.top}>
        <a className={styles.wordmark} href="#top" aria-label="Engram, home">
          <Mark />
          Engram
        </a>
        <nav className={styles.nav} aria-label="Main">
          <a className={`${styles.link} ${styles.navLink}`} href="#how">
            How it works
          </a>
          <a className={`${styles.link} ${styles.navLink}`} href="#pricing">
            Pricing
          </a>
          <a className={`${styles.link} ${styles.navLink}`} href="#questions">
            Questions
          </a>
          <a className={styles.link} href="mailto:hello@engram.app?subject=Sign%20in">
            Sign in
          </a>
        </nav>
      </header>

      <main id="top">
        <section className={`${styles.grid} ${styles.hero}`} aria-labelledby="v1-h1">
          <div className={styles.heroText}>
            <h1 id="v1-h1" className={`${styles.display} ${styles.h1}`}>
              <span className={styles.line}>
                <span style={{ "--i": 0 } as React.CSSProperties}>The notebook</span>
              </span>
              <span className={styles.line}>
                <span style={{ "--i": 1 } as React.CSSProperties}>that writes back</span>
              </span>
            </h1>
          </div>
          <div className={styles.heroRow}>
            <p className={`${styles.lead} ${styles.heroSentence} ${styles.load}`} style={d(420)}>
              Engram is a second brain: a note-taking app that keeps everything you write and, as you type, brings back the older notes that matter.
            </p>
            <div className={`${styles.heroActions} ${styles.load}`} style={d(500)}>
              <a className={styles.button} href="#download">
                Download Engram
              </a>
              <a className={`${styles.link} ${styles.linkArrow}`} href="#download">
                Mac, Windows, Linux, iPhone, Android
              </a>
            </div>
          </div>
          <Recall className={`${styles.heroApp} ${styles.loadApp}`} />
        </section>

        <section className={`${styles.grid} ${styles.section} ${styles.outputs}`} id="outputs" aria-label="What comes back to you">
          <Outputs />
        </section>

        <section className={`${styles.grid} ${styles.section}`} id="compare" aria-labelledby="v1-compare">
          <h2 id="v1-compare" className={`${styles.display} ${styles.compareHead}`} data-reveal="">
            Finding it again
          </h2>
          <div className={styles.compare} role="table" aria-label="Three ways to find an old note" data-reveal="" style={d(90)}>
            <div className={styles.compareColumn} aria-hidden="true" />
            <div className={`${styles.compareRow} ${styles.compareHeader}`} role="row">
              <span className={styles.compareName} role="columnheader">
                <span className="sr-only">What you need</span>
              </span>
              <span className={styles.compareCell} role="columnheader">
                From memory
              </span>
              <span className={styles.compareCell} role="columnheader">
                With search
              </span>
              <span className={styles.compareCell} role="columnheader">
                With Engram
              </span>
            </div>
            {COMPARE.map(([name, a, b, c]) => (
              <div className={styles.compareRow} role="row" key={name}>
                <span className={styles.compareName} role="rowheader">
                  {name}
                </span>
                <span className={styles.compareCell} role="cell" data-label="From memory">
                  {a}
                </span>
                <span className={styles.compareCell} role="cell" data-label="With search">
                  {b}
                </span>
                <span className={styles.compareCell} role="cell" data-label="With Engram">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="how" aria-label="How it works">
          <Stages />
        </section>

        <section className={`${styles.grid} ${styles.section} ${styles.letter}`} id="letter" aria-labelledby="v1-letter">
          <figure className={styles.letterFigure} data-reveal="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/variants/with-taste-skill/opus-5.5/v1/thomas-edison-in-the-chemistry-laboratory-writing.jpg"
              width={1600}
              height={2025}
              alt="Thomas Edison, white-haired, sitting on a wooden chair at a laboratory bench, writing in an open notebook on his knee"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Thomas Edison writing up rubber experiments in his laboratory notebook, 1928.</figcaption>
          </figure>
          <div className={styles.letterColumn}>
            <div className={styles.letterHead} data-reveal="">
              <span className={styles.monogram} aria-hidden="true">
                ML
              </span>
              <h2 id="v1-letter" className={styles.letterTitle}>
                Why we made Engram
              </h2>
            </div>
            <div className={styles.letterBody} data-reveal="" style={d(90)}>
              <p>
                I kept notes for twelve years and almost never read them again. They were all there, across three apps and a shelf of notebooks, and none of it came back when I needed it.
              </p>
              <p>
                Writing things down was never the hard part. A note only helps if it finds you at the right moment, and search only works when you already remember what to look for.
              </p>
              <p>
                So Engram reads along as you write, on your own machine, and puts the older notes that matter beside you. <span className={styles.marker}>Nothing leaves your device to be read.</span> The notes stay plain files you can open with anything, tomorrow or in thirty years.
              </p>
              <p>We are a small team, paid by the people who use Engram and by nobody else. That is why sync costs money and your attention does not.</p>
              <p>If something works differently from how you think it should, write to me at hello@engram.app. I read every email.</p>
            </div>
            <p className={styles.signoff} data-reveal="" style={d(180)}>
              Mara Lind
              <small>Founder, Engram</small>
            </p>
          </div>
        </section>

        <section className={`${styles.grid} ${styles.section}`} id="pricing" aria-labelledby="v1-pricing">
          <div className={styles.pricing} role="table" aria-labelledby="v1-pricing" data-reveal="">
            <div className={styles.priceColumn} aria-hidden="true" />
            <div className={`${styles.priceRow} ${styles.priceHeadRow}`} role="row">
              <div className={styles.priceLabel} role="columnheader">
                <h2 id="v1-pricing" className={styles.display}>
                  What it costs
                </h2>
              </div>
              {PLANS.map((p) => (
                <div className={styles.priceCell} role="columnheader" key={p.name}>
                  <span className={styles.planName}>{p.name}</span>
                  <span className={styles.planPrice}>{p.price}</span>
                  <span className={styles.planPeriod}>{p.period}</span>
                </div>
              ))}
            </div>
            {PLAN_ROWS.map((label, r) => (
              <div className={`${styles.priceRow} ${styles.priceBody}`} role="row" key={label}>
                <div className={styles.priceLabel} role="rowheader">
                  {label}
                </div>
                {PLANS.map((p) => (
                  <div className={styles.priceCell} role="cell" key={p.name}>
                    {p.rows[r]}
                  </div>
                ))}
              </div>
            ))}
            <div className={`${styles.priceRow} ${styles.priceFoot}`} role="row">
              <div className={styles.priceLabel} role="cell" />
              {PLANS.map((p) => (
                <div className={styles.priceCell} role="cell" key={p.name}>
                  <a className={styles.button} href="#download" style={p.featured ? { background: "var(--bg)", color: "var(--ink)" } : undefined}>
                    {p.action}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.plans}>
            <h2 className={styles.display} style={{ padding: "0 var(--margin) 16px" }}>
              What it costs
            </h2>
            {PLANS.map((p) => (
              <div className={`${styles.plan} ${p.featured ? styles.planFeatured : ""}`} key={p.name}>
                <span className={styles.planName}>{p.name}</span>
                <span className={styles.planPrice}>{p.price}</span>
                <span className={styles.planPeriod}>{p.period}</span>
                <dl className={styles.planRows}>
                  {PLAN_ROWS.map((label, r) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{p.rows[r]}</dd>
                    </div>
                  ))}
                </dl>
                <a className={styles.button} href="#download" style={p.featured ? { background: "var(--bg)", color: "var(--ink)" } : undefined}>
                  {p.action}
                </a>
              </div>
            ))}
          </div>

          <div className={styles.priceNote} data-reveal="" style={d(90)}>
            <p>Sync is free for students and teachers: sign up with a school email address. Prices in US dollars; local prices at checkout.</p>
          </div>
        </section>

        <section className={`${styles.grid} ${styles.section} ${styles.faq}`} id="questions" aria-labelledby="v1-questions">
          <Faq />
        </section>

        <section className={`${styles.grid} ${styles.cta}`} id="download" aria-labelledby="v1-start">
          <div className={styles.ctaText}>
            <h2 id="v1-start" className={styles.ctaLine} data-reveal="">
              Start with
              <br />
              one note
            </h2>
            <p data-reveal="" style={d(90)}>
              Name your vault and choose where it lives. We email you the download link with your vault set up; Engram opens on a blank note and the margin fills as you write.
            </p>
          </div>
          <div className={styles.ctaDialog} data-reveal="" style={d(160)}>
            <StartDialog />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.tile} ${styles.tileStatement}`}>
          <p>Engram keeps what you write and brings it back when it matters.</p>
          <p className={styles.legal}>© 2026 Engram. Your notes are yours; we never read them.</p>
        </div>
        <div className={`${styles.tile} ${styles.tileNav}`}>
          <span className={styles.tileLabel}>Pages</span>
          <ul>
            <li>
              <a className={styles.link} href="#how">
                How it works
              </a>
            </li>
            <li>
              <a className={styles.link} href="#pricing">
                Pricing
              </a>
            </li>
            <li>
              <a className={styles.link} href="#questions">
                Questions
              </a>
            </li>
            <li>
              <a className={styles.link} href="mailto:hello@engram.app?subject=Privacy">
                Privacy
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.tile} ${styles.tilePlatforms}`}>
          <span className={styles.tileLabel}>Runs on</span>
          <ul>
            <li>macOS</li>
            <li>Windows</li>
            <li>Linux</li>
            <li>iPhone and iPad</li>
            <li>Android</li>
          </ul>
        </div>
        <div className={`${styles.tile} ${styles.tileEmail}`}>
          <span className={styles.tileLabel}>Write to us</span>
          <a className={styles.link} href="mailto:hello@engram.app">
            hello@engram.app
          </a>
        </div>
        <div className={styles.tileWord} aria-hidden="true">
          <span>Engram</span>
        </div>
        <figure className={styles.tileClip}>
          <Loop
            src="/variants/with-taste-skill/opus-5.5/v1/lisbon-tram-28-night.webm"
            poster="/variants/with-taste-skill/opus-5.5/v1/lisbon-tram-28-night-poster.jpg"
            width={854}
            height={480}
            label="A night ride on tram 28 through Lisbon, filmed from the window and sped up"
          />
          <figcaption>Tram 28, Lisbon, at night. A clip from “Lisbon in May”.</figcaption>
        </figure>
        <a className={styles.tileGo} href="#download">
          <span>Download Engram</span>
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M14 50 L50 14 M22 14 H50 V42" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
          </svg>
        </a>
        <div className={`${styles.tile} ${styles.tileCredits}`}>
          <p>
            Photograph beside the letter:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Thomas_Edison_in_the_Chemistry_Laboratory_writing_in_his_notebook_about_rubber_experiments._(d1857f0fb1de47f0b31dd6ca657964f5).jpg">
              Thomas Edison in the Chemistry Laboratory writing in his notebook
            </a>
            , 1928, public domain. Pictures in the sample notes:{" "}
            <a href="https://www.metmuseum.org/art/collection/search/45434">Under the Wave off Kanagawa</a>, Katsushika Hokusai, about 1830–32, public domain (CC0), The Metropolitan Museum of Art;{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Le_tram_28.jpg">Le tram 28</a> by Yvesdebxl, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>;{" "}
            <a href="https://commons.wikimedia.org/w/index.php?curid=97550579">Lissabon-Strassenbahn-28, Alfama</a> by Gerd Eichmann, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>;{" "}
            <a href="https://commons.wikimedia.org/wiki/File:LAROUSSE_-_BOIS_H%C3%AAtre...Tilleul_Nouveau_Larousse_illustre_Supplement_1906_H_Grisard_del_(French_encyclopedia_colour_plate_WOOD_grain_types_patterns_textures_fibres_lines_samples_timber_carpentry)_No_copyright.jpg">
              Bois, Nouveau Larousse illustré
            </a>
            , H. Grisard, 1906, public domain; <a href="https://www.artic.edu/artworks/13634">Nature Print of Moonwort and Adder’s Tongue Ferns</a>, Henry Bradbury, 1855, public domain (CC0), Art Institute of Chicago;{" "}
            <a href="https://commons.wikimedia.org/w/index.php?curid=99470541">Sourdough bread</a> by Anasuyas, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; footage{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Lisbon_tram_28_-_fast_forward.webm">Lisbon tram 28, fast forward</a> by laurentiun, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>, trimmed. All but the Met and Art Institute pictures via Wikimedia Commons.
          </p>
        </div>
      </footer>

      <Reveal />
      {/* Gallery copy: the corner iteration switcher is not rendered; the gallery has its own iteration navigation. */}
    </div>
  );
}
