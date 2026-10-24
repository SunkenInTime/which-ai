/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { FontshareFonts } from "../fonts";
import { Motion } from "../motion";
import { SvgWord } from "../svg-word";
import { HeroEditor, MorningPage, DarkRow, Plans } from "./live";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/(designs)/ui.css";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/(designs)/4/d4.css";

export const metadata: Metadata = { title: "Commonplace. Notes that find each other." };

const v = (i: number) => ({ "--i": i }) as React.CSSProperties;

const faq = [
  ["Where are my notes stored?", "In a folder you choose, as Markdown files. Commonplace reads and writes them in place, so a backup is a copy of the folder."],
  ["How does it know what a note is about?", "It reads the words. Any note that shares a name, a place or an unusual word with the one you are writing is listed beside it, and you decide whether to link them."],
  ["What does “comes back” mean?", "Each note returns on day 1, 3, 7, 21, 60 and 180 after you wrote it, then once a year. You mark it still true, edit it, or let it go."],
  ["Does it need an account?", "Not on one device. Sync uses your own iCloud, Dropbox or any folder-syncing service. There is no Commonplace cloud."],
  ["Can I bring notes from another app?", "Markdown and plain-text folders are read as they are. Exports from other apps are converted on import, links kept where a target exists."],
  ["What happens after 500 notes?", "Reading, searching and the returns keep working. Writing the 501st note asks you to subscribe; the files stay yours either way."],
  ["Is there a team version?", "No. Commonplace is one person’s notebook. Any note can be shared as a plain file, and that is the whole collaboration feature."],
];

export default function Page() {
  return (
    <main className="page d4" id="top">
      <FontshareFonts fonts={["switzer@400,500,600"]} />
      <Motion />

      <header className="d4-hero">
        <nav className="d4-nav" aria-label="Site">
          <a className="d4-wordmark" href="#top">Commonplace</a>
          <div className="d4-nav__links">
            <a className="link" href="#morning">The morning page</a>
            <a className="link" href="#panels">Panels</a>
            <a className="link" href="#plans">Plans</a>
            <a className="link" href="#faq">Questions</a>
          </div>
        </nav>
        <div className="d4-hero__copy">
          <h1 className="lines">
            <span className="line"><span data-line style={v(0)}>Notes that find</span></span>
            <span className="line"><span data-line style={v(1)}>each other.</span></span>
          </h1>
          <p data-rise style={v(2)}>Commonplace is a notebook that links every line you write to the notes that already mention it, and brings each one back before you forget.</p>
          <a className="button" href="#download" data-rise style={v(3)}>Download for Mac</a>
        </div>
        <div className="d4-stage">
          <div className="d4-stage__in">
            <div data-rise style={v(4)}><HeroEditor /></div>
            <p className="d4-stage__note" data-rise style={v(5)}>Type into it. The notes it finds are real sample notes from one notebook.</p>
          </div>
        </div>
      </header>

      <div id="morning">
        <MorningPage />
      </div>

      <section className="d4-calls" aria-labelledby="d4-calls-h">
        <div className="d4-calls__side">
          <h2 id="d4-calls-h">What you give, what comes back</h2>
          <figure data-reveal>
            <img src="/variants/with-taste-skill/fable-5.1/assets/zettelkaesten-et-01.jpg" width="1920" height="1280" alt="Rows of black-edged slip boxes on grey shelves, each labelled with the word et and a running number" decoding="async" />
            <figcaption>Slip boxes of the Thesaurus Linguae Latinae in Munich. Luhmann said his own box answered back: a note filed beside its neighbours is a note that gets found.</figcaption>
          </figure>
        </div>
        <div className="d4-calls__col">

          <div className="d4-ex" data-reveal>
            <p className="d4-ex__lead">First, write a line.</p>
            <div className="d4-call" data-ui>
              <label className="ui-label" htmlFor="d4-c1">New note</label>
              <input id="d4-c1" className="ui-field" defaultValue="Green tea scalds above 80°. Let the kettle stand for three minutes." readOnly />
            </div>
            <div className="d4-resp" data-ui>
              <div className="ui-top"><span className="ui-crumbs"><span>Kitchen</span><span>Tea at 80 degrees</span></span><span>Saved</span></div>
              <div className="ui-head"><b>Mentioned in</b><span>2 notes</span></div>
              <ul className="ui-list ui-rows-lined">
                <li className="ui-row is-selected"><span>Kitchen notes</span><span className="ui-when">kitchen · 1 Aug</span></li>
                <li className="ui-row"><span>Oven temperatures, checked</span><span className="ui-when">degrees · 2 Mar</span></li>
              </ul>
            </div>
          </div>

          <div className="d4-ex" data-reveal>
            <p className="d4-ex__lead">Then ask for something you half remember.</p>
            <div className="d4-call" data-ui>
              <label className="ui-label" htmlFor="d4-c2">Search</label>
              <input id="d4-c2" className="ui-field" defaultValue="what did I decide about the olive" readOnly />
            </div>
            <div className="d4-resp" data-ui>
              <div className="ui-head"><b>3 notes</b><span>newest first</span></div>
              <ul className="ui-list ui-rows-lined ui-rows-tall">
                <li className="ui-row is-selected"><span>Garden plan with Priya</span><span className="ui-when">11 May · People</span></li>
                <li className="ui-row"><span>Repot the olive in March</span><span className="ui-when">7 Feb · Garden</span></li>
                <li className="ui-row"><span>The balcony</span><span className="ui-when">3 Aug · Index</span></li>
              </ul>
            </div>
          </div>

          <div className="d4-ex d4-ex--wide" data-reveal>
            <p className="d4-ex__lead">Later, read what came back on its own.</p>
            <div className="d4-call" data-ui>
              <span className="ui-label">Every morning at 7:00</span>
              <span className="ui-chip is-on">Today</span>
            </div>
            <div className="d4-resp d4-resp--wide" data-ui>
              <div className="ui-top"><strong>Good morning</strong><span>Thursday · 4 to look at</span></div>
              <div className="d4-resp__grid">
                <ul className="ui-stack">
                  <li className="ui-item is-selected"><b>The forgetting curve</b><small>180 days since you wrote it</small></li>
                  <li className="ui-item"><b>Repot the olive in March</b><small>You linked it from Garden plan with Priya</small></li>
                  <li className="ui-item"><b>Calvino on lightness</b><small>Due today, third return</small></li>
                  <li className="ui-item"><b>Bush’s memex, 1945</b><small>Mentioned in Cajal’s butterflies</small></li>
                </ul>
                <div className="d4-resp__read">
                  <div className="ui-title">The forgetting curve</div>
                  <div className="ui-meta">Written 2 November 2025 · Reading · sixth return</div>
                  <p className="ui-text">Ebbinghaus, 1885. After twenty minutes about 58% is left, after an hour 44%, after a day 34%, after a month 21%. Every review flattens the curve.</p>
                  <div className="ui-tag-row" style={{ marginTop: 14 }}><button type="button" className="ui-btn">Still true</button><button type="button" className="ui-btn ui-btn--ghost">Edit</button><button type="button" className="ui-btn ui-btn--ghost">Let it go</button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="panels">
        <DarkRow />
      </div>

      <Plans />

      <section className="d4-faq" id="faq" aria-labelledby="d4-faq-h">
        <div className="d4-faq__side">
          <h2 id="d4-faq-h">Questions people ask</h2>
          <figure data-reveal>
            <img src="/variants/with-taste-skill/fable-5.1/assets/card-catalog-at-the-indiana-state-library.jpg" width="1920" height="2560" alt="A typed library catalogue card standing in its drawer, held by the rod through its hole" decoding="async" />
            <figcaption>A catalogue card of 1964: one fact per card, and a rod so none is lost.</figcaption>
          </figure>
        </div>
        <div className="d4-faq__list">
          {faq.map(([q, a], i) => (
            <details key={q} name="d4-faq" data-reveal style={v(i)}>
              <summary>{q}<svg className="d4-faq__plus" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M0 8h16" stroke="currentColor" strokeWidth="3" /><path className="d4-faq__bar" d="M8 0v16" stroke="currentColor" strokeWidth="3" /></svg></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="d4-foot">
        <div className="d4-tile d4-tile--say">
          <p>A notebook that links what you write to what you already know, and brings it back before you forget.</p>
          <p className="d4-tile__legal">© 2026 Commonplace. Pictures: <a href="https://commons.wikimedia.org/wiki/File:Zettelkaesten_et_01.jpg">Zettelkästen et</a> by Michiel Streijger, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Card_catalog_at_the_Indiana_State_Library_-_interior_view_of_catalog_cards.jpg">Card catalog at the Indiana State Library</a> by TBurmeister, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; via Wikimedia Commons.</p>
        </div>
        <nav className="d4-tile d4-tile--nav" aria-label="Footer">
          <a className="link-plain" href="#morning">The morning page</a>
          <a className="link-plain" href="#panels">Panels</a>
          <a className="link-plain" href="#plans">Plans</a>
          <a className="link-plain" href="#faq">Questions</a>
        </nav>
        <div className="d4-tile d4-tile--where">
          <p>Lisbon</p>
          <p>Support answers within a day, Monday to Friday.</p>
        </div>
        <div className="d4-tile d4-tile--mail">
          <a className="link-plain" href="mailto:hello@commonplace.app">hello@commonplace.app</a>
        </div>
        <div className="d4-tile d4-tile--mark"><SvgWord text="Commonplace" font="'Fable v2 Switzer', Helvetica Neue, Arial, sans-serif" weight={600} /></div>
        <a className="d4-tile d4-tile--go" href="#download">
          <span>Download for Mac</span>
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true"><path d="M8 24h30M26 12l12 12-12 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </footer>
    </main>
  );
}
