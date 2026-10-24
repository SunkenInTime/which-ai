/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { GoogleFonts } from "../fonts";
import { Motion } from "../motion";
import { FitText } from "../fit-text";
import { HeroSentence, Stages, Ask } from "./live";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/(designs)/ui.css";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/(designs)/1/d1.css";

export const metadata: Metadata = { title: "Commonplace. Every note comes back." };

const v = (i: number) => ({ "--i": i }) as React.CSSProperties;

const faq = [
  { q: "Where are my notes stored?", a: "In a folder you choose, as Markdown files. Commonplace reads and writes them in place, so any other app can open them, and a backup is a copy of the folder." },
  { q: "What does “comes back” mean?", a: "Each note returns for a look on day 1, 3, 7, 21, 60 and 180 after you wrote it, then once a year. You mark it still true, edit it, or let it go. Nothing is ever shown twice in one day." },
  { q: "Does it need an account?", a: "Not on one device. Sync between devices uses your own iCloud, Dropbox or any folder-syncing service. There is no Commonplace cloud and no password to lose." },
  { q: "Can I bring notes from another app?", a: "Markdown and plain-text folders are read as they are. Exports from other apps are converted on import, with their links kept wherever a target can be found." },
  { q: "What happens after 500 notes?", a: "Reading, searching and the return schedule keep working. Writing the 501st note asks you to subscribe, and the files stay yours either way." },
  { q: "Is there a team version?", a: "No. Commonplace is one person’s notebook. You can share any note as a plain file, and that is the whole collaboration feature." },
];

export default function Page() {
  return (
    <main className="page d1" id="top">
      <GoogleFonts families={["Imbue:opsz,wght@10..100,400", "Albert+Sans:wght@400;500"]} />
      <Motion />

      <header className="d1-hero">
        <nav className="d1-nav" aria-label="Site">
          <a className="d1-wordmark" href="#top">Commonplace</a>
          <a className="button" href="#download">Download for Mac</a>
        </nav>
        <HeroSentence />
      </header>

      <section className="d1-words" aria-labelledby="d1-words-h">
        <h2 id="d1-words-h">What it does</h2>
        <div className="grid">
          <p className="d1-words__p" data-reveal>
            Write a note{" "}
            <span className="d1-slot"><img src="/variants/with-taste-skill/fable-5.1/assets/william-shenstone-quotations-robert-burns-s-commonplace.jpg" alt="" width="1920" height="977" decoding="async" /></span>{" "}
            and it files itself with the notes it mentions{" "}
            <span className="d1-slot"><img src="/variants/with-taste-skill/fable-5.1/assets/zettelkaesten-et-01.jpg" alt="" width="1920" height="1280" decoding="async" /></span>.
            It comes back{" "}
            <span className="d1-slot"><img src="/variants/with-taste-skill/fable-5.1/assets/card-catalog-at-the-indiana-state-library.jpg" alt="" width="1920" height="2560" decoding="async" /></span>{" "}
            on a schedule shaped by how memory fades{" "}
            <span className="d1-slot"><img src="/variants/with-taste-skill/fable-5.1/assets/santiago-ramon-y-cajal-nerve-cells-in.jpg" alt="" width="1920" height="1268" decoding="async" /></span>.
            Everything stays in plain files on your own disk.
          </p>
          <div className="d1-words__sub">
            <p data-reveal style={v(1)}>Mac, Windows, Linux, iPhone and Android. Your notes are Markdown files in a folder you choose, so nothing is ever held hostage.</p>
            <a className="button" href="#download" data-reveal style={v(2)}>Download for Mac</a>
          </div>
        </div>
      </section>

      <figure className="d1-band" data-reveal>
        <div className="d1-band__frame">
          <img src="/variants/with-taste-skill/fable-5.1/assets/zettelkaesten-et-01.jpg" alt="Rows of black-edged slip boxes on grey shelves, each labelled with the word et and a running number" width="1920" height="1280" decoding="async" data-drift />
        </div>
        <figcaption>Slip boxes of the Thesaurus Linguae Latinae in Munich. Every slip is one quotation, filed where it will be found again.</figcaption>
      </figure>

      <Stages />

      <Ask />

      <section className="d1-lineage" aria-labelledby="d1-lin-h">
        <div className="grid">
          <div className="d1-lineage__text">
            <h2 id="d1-lin-h">Five centuries of second brains</h2>
            <p data-reveal style={v(1)}>
              Readers have always kept a book of what they read. The commonplace book had headings and an index. Luhmann’s slip box held about 90,000 cards and, he said, answered back. Bush’s memex of 1945 was a desk that kept the trail from one thing to the next. Commonplace is that book, kept by software that never forgets to look something up.
            </p>
          </div>
          <ul className="d1-lineage__mosaic">
            <li data-reveal style={v(2)}><figure><img src="/variants/with-taste-skill/fable-5.1/assets/robert-burns-s-commonplace-book-1783-1785.jpg" alt="A handwritten page in eighteenth-century script, the introduction to Robert Burns’s commonplace book" width="1920" height="1251" decoding="async" /><figcaption>Robert Burns’s commonplace book, 1783</figcaption></figure></li>
            <li data-reveal style={v(3)}><figure><img src="/variants/with-taste-skill/fable-5.1/assets/the-memex-3002477109.jpg" alt="A magazine drawing of a man wearing glasses with a small camera strapped to his forehead, above the title As We May Think" width="1920" height="1595" decoding="async" /><figcaption>Life magazine’s drawing for Bush’s memex, 1945</figcaption></figure></li>
            <li data-reveal style={v(4)}><figure><img src="/variants/with-taste-skill/fable-5.1/assets/santiago-ramon-y-cajal-nerve-cells-in.jpg" alt="Ink drawing of nerve cells with long branching fibres, lettered A to K" width="1920" height="1268" decoding="async" /><figcaption>Cajal’s drawing of nerve cells, about 1900</figcaption></figure></li>
            <li data-reveal style={v(5)}><figure><img src="/variants/with-taste-skill/fable-5.1/assets/copyright-card-catalog-drawer.jpg" alt="A long catalogue drawer full of typed index cards, pulled out onto an oak desk" width="1800" height="1200" decoding="async" /><figcaption>A catalogue drawer at the Library of Congress</figcaption></figure></li>
          </ul>
        </div>
      </section>

      <section className="d1-price" id="pricing" aria-labelledby="d1-price-h">
        <h2 id="d1-price-h" className="d1-price__line">
          Free for 500 notes,<br />then <span className="d1-price__tag">€6</span> a month.
        </h2>
        <div className="grid d1-price__row">
          <p className="d1-price__inc" data-reveal style={v(1)}>One plan. Unlimited notes, sync between your devices and the return schedule. The files, the export and the first 500 notes are yours already.</p>
          <div className="d1-price__act" data-reveal style={v(2)}>
            <a className="button" href="#download" id="download">Download for Mac</a>
            <a className="link-plain" href="#download">or €60 a year</a>
          </div>
        </div>
      </section>

      <section className="d1-faq" aria-labelledby="d1-faq-h">
        <h2 id="d1-faq-h">Things people ask</h2>
        <div className="grid">
          <div className="d1-faq__list">
            {faq.map((item, i) => (
              <details key={item.q} name="d1-faq" data-reveal style={v(i + 1)}>
                <summary>
                  {item.q}
                  <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2 6l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="d1-foot" id="contact">
        <div className="d1-foot__top">
          <span className="d1-wordmark">Commonplace</span>
          <p>Questions, bugs and ideas are read by the people who make it.</p>
          <p>Mac, Windows, Linux, iPhone, Android.</p>
          <a className="link-plain" href="#top">Back to top</a>
        </div>
        <a className="d1-foot__mail" href="mailto:hello@commonplace.app" aria-label="hello at commonplace dot app">
          <FitText lines={["hello@", "commonplace.app"]} max={260} />
        </a>
        <div className="d1-foot__meta">
          <nav aria-label="Footer">
            <a className="link-plain" href="#download">Download</a>
            <a className="link-plain" href="#pricing">Pricing</a>
            <a className="link-plain" href="#top">Top</a>
          </nav>
          <p className="d1-credits">
            Pictures: <a href="https://commons.wikimedia.org/wiki/File:Zettelkaesten_et_01.jpg">Zettelkästen et</a> by Michiel Streijger, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Card_catalog_at_the_Indiana_State_Library_-_interior_view_of_catalog_cards.jpg">Card catalog at the Indiana State Library</a> by TBurmeister, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; Robert Burns’s commonplace book, Life magazine’s memex drawing, Cajal’s nerve cells and the Library of Congress catalogue drawer, public domain; all via Wikimedia Commons.
          </p>
          <p>Lisbon, 2026</p>
        </div>
      </footer>
    </main>
  );
}
