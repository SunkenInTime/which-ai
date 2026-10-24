import Image from "next/image";
import Mark from "./_components/Mark";
import NotesApp from "./_components/NotesApp";
import ScrollEffects from "./_components/ScrollEffects";
import Linked from "./_components/Linked";
import Ask from "./_components/Ask";
import Resurface from "./_components/Resurface";
import Files from "./_components/Files";
import Journey from "./_components/Journey";
import Pricing from "./_components/Pricing";
import CtaDialog from "./_components/CtaDialog";
import Crossfade, { type Slide } from "./_components/Crossfade";
import LoopVideo from "./_components/LoopVideo";
import { FAQ, PRODUCT } from "../_shared/facts";
import styles from "./page.module.css";
import s from "./sections.module.css";

const PIC = {
  writing: "/variants/with-taste-skill/sonnet-5.5/p5/person-writing-in-a-notebook-while-sitting.jpg",
  desk: "/variants/with-taste-skill/sonnet-5.5/p5/reading-materials-on-a-desk-with-glasses.jpg",
  hahn: "/variants/with-taste-skill/sonnet-5.5/p5/otto-hahn-s-notebook-1938-deutsches-museum.jpg",
  weaver: "/variants/with-taste-skill/sonnet-5.5/p5/student-notebook-containing-notes-diagrams-and-swatches.jpg",
  leech: "/variants/with-taste-skill/sonnet-5.5/p5/leech-books-vi-ms-409-page-115.jpg",
  latin: "/variants/with-taste-skill/sonnet-5.5/p5/page-3-neo-latin-notes.jpg",
};

const SLIDES: Slide[] = [
  {
    src: PIC.hahn,
    w: 1920,
    h: 1440,
    alt: "A grid-paper notebook open on a wooden bench: handwriting on the left page, columns of figures on the right",
    caption: "Otto Hahn’s notebook, 1938. Deutsches Museum, Munich.",
  },
  {
    src: PIC.weaver,
    w: 2000,
    h: 1519,
    alt: "An open student notebook with weave diagrams, fabric swatches and handwritten notes",
    caption: "A student’s notebook of weaves, diagrams and swatches, about 1899.",
  },
  {
    src: PIC.leech,
    w: 1920,
    h: 1282,
    alt: "An open manuscript book with dense handwriting and red capital letters",
    caption: "A leech-book of remedies, Wellcome Collection MS 409.",
  },
  {
    src: PIC.latin,
    w: 1920,
    h: 1440,
    alt: "A single worn leaf covered in handwritten Latin notes",
    caption: "Handwritten Latin notes on a single leaf.",
  },
];

const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;
const delay = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

export default function Page() {
  return (
    <>
      <a className={styles.skip} href="#how">
        Skip to the tour
      </a>
      <ScrollEffects />
      <main>
        {/* ---------- hero: the product, working ---------- */}
        <header className={styles.hero}>
          <nav className={styles.nav} aria-label="Main">
            <a className={styles.brand} href="#top">
              <Mark size={26} />
              Engram
            </a>
            <div className={styles.navLinks}>
              <a href="#how">How it works</a>
              <a href="#pricing">Pricing</a>
              <a href="#questions">Questions</a>
              <a href="#start">Sign in</a>
            </div>
          </nav>

          <div className={styles.heroGrid} id="top">
            <div className={styles.heroText}>
              <div>
                <h1 className={`${styles.h1} ${styles.rise}`} style={rise(0)}>
                  Notes that work like a second brain
                </h1>
                <p className={`${styles.lead} ${styles.rise}`} style={rise(1)}>
                  Engram links what you write to everything you already know, and brings it back when it matters.
                </p>
                <div className={`${styles.actions} ${styles.rise}`} style={rise(2)}>
                  <a className={styles.btn} href={PRODUCT.primaryHref}>
                    {PRODUCT.primaryAction}
                  </a>
                  <a className={styles.textLink} href="#how">
                    See how a note travels
                  </a>
                </div>
              </div>
              <ul className={`${styles.try} ${styles.rise}`} style={rise(4)}>
                <li>
                  <b>Try it.</b> Click into the note and type [[ to link it to another.
                </li>
                <li>Press Option+Space to capture a thought, wherever you are on this page.</li>
                <li>Open any link in the panel and see what points back.</li>
              </ul>
              <figure className={`${styles.heroPhoto} ${styles.rise}`} style={rise(5)}>
                <Image
                  src={PIC.writing}
                  alt="A person at a desk turning the page of a handwritten notebook, a laptop open beside it"
                  width={1920}
                  height={1280}
                  sizes="40vw"
                  priority
                />
              </figure>
            </div>
            <div className={`${styles.heroWin} ${styles.rise}`} style={rise(3)}>
              <NotesApp />
            </div>
          </div>
        </header>

        {/* ---------- what it does ---------- */}
        <section className={s.features} id="features" aria-labelledby="features-h">
          <h2 id="features-h" className={s.h2} data-rv>
            What Engram does
          </h2>
          <p className={s.statement} data-rv style={delay(80)}>
            Capture a thought{" "}
            <span className={`${s.slot} ${s.slotKey}`} aria-hidden="true">
              <span>⌥ Space</span>
            </span>{" "}
            in a second. Link it to the notes it belongs with{" "}
            <span className={`${s.slot} ${s.slotLink}`} aria-hidden="true">
              <span>[[Maya]]</span>
            </span>
            . Ask your notes{" "}
            <span className={s.slot}>
              <Image src={PIC.desk} alt="" width={160} height={86} sizes="80px" />
            </span>{" "}
            and read the answer with its sources. Keep every file{" "}
            <span className={s.slot}>
              <Image src={PIC.weaver} alt="" width={160} height={86} sizes="80px" />
            </span>{" "}
            in a folder you own.
          </p>
          <div className={`${s.support} ${s.grid}`}>
            <p className={s.supportP} data-rv style={delay(160)}>
              What you tried in the window is the whole idea: one note, linked to the rest, found again by what it meant.
              The apps for Mac, Windows, Linux, iPhone, iPad, Android and the web all work the same way.
            </p>
          </div>

          <div className={s.rows}>
            <article className={`${s.row} ${s.rowA}`}>
              <div className={s.rowText} data-rv>
                <h3>Every link works both ways</h3>
                <p>
                  Open a note and see every note that points to it, with the sentence that does. Engram suggests links
                  as you write. You accept or ignore them; nothing is linked without you.
                </p>
              </div>
              <div className={s.rowFrag} data-rv style={delay(120)}>
                <Linked />
              </div>
            </article>

            <article className={`${s.row} ${s.rowB}`}>
              <div className={s.rowText} data-rv>
                <h3>Ask your notes, and read the sources</h3>
                <p>
                  Search understands meaning, so “what did Maya say about pricing in March” finds the note without the
                  word pricing in it. Ask a question and the answer arrives with footnotes. When your notes do not say,
                  Engram says that.
                </p>
              </div>
              <div className={s.rowFrag} data-rv style={delay(120)}>
                <Ask />
              </div>
            </article>

            <article className={`${s.row} ${s.rowC}`}>
              <div className={s.rowText} data-rv>
                <h3>Five notes a day come back</h3>
                <p>
                  Resurface returns a note after 1, 3, 7, 21 and 60 days, unless you opened it since. Mark it
                  remembered, or ask for it again tomorrow.
                </p>
              </div>
              <div className={s.rowFrag} data-rv style={delay(120)}>
                <Resurface />
              </div>
            </article>

            <article className={`${s.row} ${s.rowD}`}>
              <div className={s.rowLeft}>
                <div className={s.rowText} data-rv>
                  <h3>Plain files you can leave with</h3>
                  <p>
                    Every note is a Markdown file in a folder on your disk, and it works offline. Sync between devices
                    is end-to-end encrypted, so Engram cannot read your notes. Handwriting from 1938 is still legible.
                    Your notes should last as long.
                  </p>
                </div>
                <div data-rv style={delay(120)}>
                  <Files />
                </div>
              </div>
              <div className={s.rowPic} data-rv style={delay(80)}>
                <Crossfade slides={SLIDES} />
              </div>
            </article>
          </div>
        </section>

        <Journey />
        <Pricing />

        {/* ---------- questions ---------- */}
        <section className={s.faq} id="questions" aria-labelledby="faq-h">
          <h2 id="faq-h" className={s.faqH}>
            Questions people ask
          </h2>
          <div className={s.tiles}>
            {FAQ.map((f, i) => (
              <details key={f.q} name="faq" className={s.tile} open={i === 0} data-rv style={delay(i * 50)}>
                <summary>
                  {f.q}
                  <span className={s.plus} aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------- the first step, already open ---------- */}
        <section className={s.cta} id="start" aria-labelledby="start-h">
          <div className={s.ctaLeft}>
            <figure className={s.ctaVideo} data-rv>
              <LoopVideo
                src="/variants/with-taste-skill/sonnet-5.5/p5/olivetti-dora-portable-typewriter.webm"
                poster="/variants/with-taste-skill/sonnet-5.5/p5/olivetti-dora-portable-typewriter-poster.jpg"
                label="A hand typing on a grey Olivetti portable typewriter"
              />
            </figure>
            <h2 id="start-h" className={s.ctaH} data-rv>
              Write your first note
            </h2>
            <p className={s.ctaP} data-rv style={delay(80)}>
              Pick a folder and start writing. Your first 30 days include Plus, and no card is asked for.
            </p>
            <ul className={s.platforms} id="download" data-rv style={delay(140)}>
              {PRODUCT.platforms.map((p) => (
                <li key={p}>
                  <a href="#download">{p}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.ctaRight} data-rv style={delay(120)}>
            <CtaDialog />
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className={s.footer}>
        <div className={s.tilesTop}>
          <div className={`${s.tile2} ${s.tStatement}`}>
            <p>Your notes, in plain files, for as long as you want them.</p>
            <p className={s.legal}>Engram is a design concept. Its name, prices and example notes are samples.</p>
          </div>
          <nav className={`${s.tile2} ${s.tNav}`} aria-label="Footer">
            <ul className={s.fList}>
              <li>
                <a href="#how">How it works</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#questions">Questions</a>
              </li>
              <li>
                <a href="#start">Sign in</a>
              </li>
            </ul>
          </nav>
          <div className={`${s.tile2} ${s.tPlat}`}>
            <ul className={s.fList}>
              {PRODUCT.platforms.map((p) => (
                <li key={p}>
                  <a href="#download">{p}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${s.tile2} ${s.tMail}`}>
            <a href={`mailto:${PRODUCT.contactEmail}`}>{PRODUCT.contactEmail}</a>
          </div>
        </div>
        <div className={s.tilesBottom}>
          <div className={s.tWord} aria-hidden="true">
            Engram
          </div>
          <a className={s.tCta} href="#start">
            {PRODUCT.primaryAction}
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden="true">
              <path d="M10 46 46 10M20 10h26v26" />
            </svg>
          </a>
        </div>
        <div className={s.credits}>
          <p className={s.creditsLead}>Pictures and footage</p>
          <ul className={s.creditsList}>
            <li>
              <a href="https://commons.wikimedia.org/w/index.php?curid=4294354">“Otto Hahn&apos;s notebook 1938 - Deutsches Museum - Munich”</a> by J Brew, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>, via Wikimedia Commons.
            </li>
            <li>
              <a href="https://www.artic.edu/artworks/230315">“Student Notebook Containing Notes, Diagrams and Swatches”</a> by Alfred Fehr, c. 1898–1900, <a href="https://creativecommons.org/publicdomain/zero/1.0/">public domain (CC0)</a>, via Art Institute of Chicago.
            </li>
            <li>
              <a href="https://commons.wikimedia.org/w/index.php?curid=36285044">“Leech-Books, VI (MS 409) page 115 Wellcome L0073622”</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>, via Wikimedia Commons.
            </li>
            <li>
              <a href="https://commons.wikimedia.org/w/index.php?curid=21476715">“Page 3, Neo-Latin Notes”</a> by Maekju, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>, via Wikimedia Commons.
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Person_writing_in_a_notebook_while_sitting_at_a_desk.jpg">“Person writing in a notebook while sitting at a desk”</a> and <a href="https://commons.wikimedia.org/wiki/File:Reading_materials_on_a_desk_with_glasses_a_pen_and_an_apple_nearby.jpg">“Reading materials on a desk with glasses a pen and an apple nearby”</a> by Shixart1985, <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>, via Wikimedia Commons.
            </li>
            <li>
              <a href="https://commons.wikimedia.org/wiki/File:Olivetti_Dora_portable_typewriter.webm">“Olivetti Dora portable typewriter”</a> (video) by Erik Pålsson, <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>, via Wikimedia Commons.
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
