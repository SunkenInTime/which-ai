/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { FontshareFonts } from "../fonts";
import { Motion } from "../motion";
import { SvgWord } from "../svg-word";
import { ChapterStrip, Stages } from "./live";
import { chapters } from "./chapters";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/(designs)/ui.css";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/(designs)/5/d5.css";

export const metadata: Metadata = { title: "Commonplace. Written once, found again." };

const v = (i: number) => ({ "--i": i }) as React.CSSProperties;

const tiles = [
  { name: "Write", fact: "A line, a quotation, a page: any length, in plain text.", tone: "white", src: "/variants/with-taste-skill/fable-5.1/assets/card-catalog-at-the-indiana-state-library.jpg", w: 1920, h: 2560, alt: "A typed library catalogue card standing in its drawer, held by the rod through its hole", pos: "50% 58%", wide: false },
  { name: "Link", fact: "Every note that mentions the same thing, listed beside it.", tone: "pink", src: "/variants/with-taste-skill/fable-5.1/assets/zettelkaesten-et-01.jpg", w: 1920, h: 1280, alt: "Rows of black-edged slip boxes on grey shelves, each labelled with the word et and a running number", pos: "50% 50%", wide: true },
  { name: "Remember", fact: "Returns on day 1, 3, 7, 21, 60 and 180, then yearly.", tone: "surface", src: "/variants/with-taste-skill/fable-5.1/assets/santiago-ramon-y-cajal-nerve-cells-in.jpg", w: 1920, h: 1268, alt: "Ink drawing of nerve cells with long branching fibres, lettered A to K", pos: "50% 50%", wide: false },
  { name: "Read", fact: "Your notes as pages, in your own order, not a feed.", tone: "pink", src: "/variants/with-taste-skill/fable-5.1/assets/robert-burns-s-commonplace-book-1783-1785.jpg", w: 1920, h: 1251, alt: "A handwritten page in eighteenth-century script, the introduction to Robert Burns’s commonplace book", pos: "50% 30%", wide: false },
  { name: "Find", fact: "Every word of every note, the newest first.", tone: "surface", src: "/variants/with-taste-skill/fable-5.1/assets/the-memex-3002477109.jpg", w: 1920, h: 1595, alt: "A magazine drawing of a man wearing glasses with a small camera strapped to his forehead", pos: "50% 25%", wide: false },
  { name: "Keep", fact: "Plain Markdown files in a folder of your own.", tone: "white", src: "/variants/with-taste-skill/fable-5.1/assets/the-brain-after-haller-and-ridley-engraving.jpg", w: 1600, h: 2488, alt: "An eighteenth-century engraving of the human brain seen from below", pos: "50% 60%", wide: false },
];

const portraits = [
  { tone: "ink", title: "A reader’s book, tenth century", text: "Israel the Grammarian’s notes on Porphyry, written in the margins and between the lines. The oldest habit this app has.", src: "/variants/with-taste-skill/fable-5.1/assets/israel-the-grammarian-s-commonplace-book.jpg", w: 1920, h: 2484, alt: "A manuscript page of close Latin script with notes crowded into the margins", page: "https://commons.wikimedia.org/wiki/File:Israel_the_Grammarian%27s_commonplace_book.jpg" },
  { tone: "surface", title: "The reading room, 1900", text: "The Library of Congress, where notes were made by hand before any of them could come back on their own.", src: "/variants/with-taste-skill/fable-5.1/assets/library-of-congress-main-reading-room-washington.jpg", w: 1920, h: 2396, alt: "The domed main reading room of the Library of Congress, photographed from above around 1900", page: "https://commons.wikimedia.org/wiki/File:Library_of_congress_main_reading_room.tif" },
  { tone: "ink", title: "Niklas Luhmann, 1989", text: "Ninety thousand slips, one set of drawers, and a notebook that, he said, answered back.", src: "/variants/with-taste-skill/fable-5.1/assets/hsgh-022-000941-niklas-luhmann-cropped.jpg", w: 1400, h: 1641, alt: "Niklas Luhmann speaking at a seminar table, in a suit and tie, gesturing with one hand", page: "https://commons.wikimedia.org/wiki/File:HSGH_022-000941_Niklas_Luhmann_(cropped).png" },
];

const faq = [
  ["Where are my notes stored?", "In a folder you choose, as Markdown files. Commonplace reads and writes them in place, so a backup is a copy of the folder."],
  ["What does “comes back” mean?", "Each note returns on day 1, 3, 7, 21, 60 and 180 after you wrote it, then once a year. You mark it still true, edit it, or let it go."],
  ["Why mint and pink?", "Mint is what is new: a note just written, a link just found. Pink is what returns. The app uses the two the same way, so you always know which you are looking at."],
  ["Does it need an account?", "Not on one device. Sync uses your own iCloud, Dropbox or any folder-syncing service. There is no Commonplace cloud."],
  ["Can I bring notes from another app?", "Markdown and plain-text folders are read as they are. Exports from other apps are converted on import, links kept where a target exists."],
  ["What happens after 500 notes?", "Reading, searching and the returns keep working. Writing the 501st note asks you to subscribe; the files stay yours either way."],
  ["Is there a team version?", "No. Commonplace is one person’s notebook. Any note can be shared as a plain file, and that is the whole collaboration feature."],
];

export default function Page() {
  return (
    <main className="page d5" id="top">
      <FontshareFonts fonts={["cabinet-grotesk@400,500,800"]} />
      <Motion />
      <ChapterStrip />

      <header className="d5-hero">
        <div className="d5-hero__panel">
          <img src="/variants/with-taste-skill/fable-5.1/assets/card-catalogue-drawers.jpg" width="1920" height="1285" alt="A wall of dark wooden catalogue drawers with brass pulls and paper labels" fetchPriority="high" decoding="async" />
          <a className="d5-wordmark" href="#top">Commonplace</a>
          <h1 className="lines">
            <span className="line"><span data-line style={v(0)}>Written once,</span></span>
            <span className="line"><span data-line style={v(1)}>found again.</span></span>
          </h1>
          <p className="d5-hero__sub" data-rise style={v(2)}>Commonplace is a notebook that links what you write to what you already know, and brings every note back before you forget it.</p>
          <a className="button d5-hero__act" href="#download" data-rise style={v(3)}>Download for Mac</a>
        </div>
        <nav className="d5-swatches" aria-label="Chapters">
          {chapters.map((c, i) => (
            <a key={c.id} href={`#${c.id}`} style={{ background: c.bg, color: c.ink, ...v(i) }} data-rise>{c.name}</a>
          ))}
        </nav>
      </header>

      <section className="d5-collect" id="collect" aria-labelledby="d5-collect-h" data-ink="#0a0a0a">
        <div className="d5-collect__text">
          <h2 id="d5-collect-h">What it collects</h2>
          <p data-reveal>Six things a commonplace book always did, drawn as specimens: the card, the box, the cells that keep a memory, the page, the desk that kept the trail, and the brain it all stands in for.</p>
        </div>
        <ul className="d5-tiles">
          {tiles.map((t, i) => (
            <li key={t.name} className={`d5-tile${t.wide ? " d5-tile--wide" : ""}`} data-reveal style={v(i)}>
              <div className={`d5-tile__plate d5-tile__plate--${t.tone}`}>
                <img src={t.src} width={t.w} height={t.h} alt={t.alt} decoding="async" style={{ objectPosition: t.pos }} />
              </div>
              <h3>{t.name}</h3>
              <p>{t.fact}</p>
            </li>
          ))}
        </ul>
      </section>

      <Stages />

      <section className="d5-return" id="return" aria-labelledby="d5-return-h">
        {portraits.map((p, i) => (
          <article key={p.title} className={`d5-portrait d5-portrait--${p.tone}`} data-ink={p.tone === "ink" ? "#f8f8f8" : "#0a0a0a"}>
            {i === 0 ? <h2 id="d5-return-h" className="d5-portrait__title">{p.title}</h2> : <h3 className="d5-portrait__title">{p.title}</h3>}
            <figure className="d5-portrait__pic" data-reveal>
              <img src={p.src} width={p.w} height={p.h} alt={p.alt} decoding="async" />
            </figure>
            <p className="d5-portrait__text">{p.text}</p>
            <a className="d5-portrait__link link-plain" href={p.page}>The picture’s source</a>
          </article>
        ))}
      </section>

      <section className="d5-price" id="price" aria-labelledby="d5-price-h" data-ink="#0a0a0a">
        <div className="d5-ticket">
          <div className="d5-ticket__main">
            <h2 id="d5-price-h">Commonplace, every note</h2>
            <div className="d5-ticket__lines">
              <p>Free for the first 500 notes</p>
              <p>Then €6 a month or €60 a year</p>
              <p>Mac, Windows, Linux, iPhone, Android</p>
              <p>Plain files, export any time</p>
            </div>
          </div>
          <div className="d5-ticket__perf" aria-hidden="true" />
          <div className="d5-ticket__stub">
            <p className="d5-ticket__price nums">€6<span>a month</span></p>
            <a className="d5-ticket__act" href="#download" id="download">Download for Mac</a>
          </div>
          <span className="d5-ticket__notch d5-ticket__notch--top" aria-hidden="true" />
          <span className="d5-ticket__notch d5-ticket__notch--bottom" aria-hidden="true" />
        </div>
      </section>

      <section className="d5-faq" id="questions" aria-labelledby="d5-faq-h" data-ink="#0a0a0a">
        <h2 id="d5-faq-h">Questions</h2>
        <div className="d5-faq__list">
          {faq.map(([q, a], i) => (
            <details key={q} name="d5-faq" data-reveal style={v(i)}>
              <summary>{q}<svg className="d5-faq__plus" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M0 8h16" stroke="currentColor" strokeWidth="3" /><path className="d5-faq__bar" d="M8 0v16" stroke="currentColor" strokeWidth="3" /></svg></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="d5-foot" data-ink="#f8f8f8">
        <div className="d5-foot__mark"><SvgWord text="Commonplace" font="'Fable v2 Cabinet Grotesk', Helvetica Neue, Arial, sans-serif" weight={800} /></div>
        <div className="d5-foot__row">
          <div className="d5-foot__places">
            <a href="mailto:hello@commonplace.app">hello@commonplace.app</a>
            <a href="#top">Mastodon</a>
            <a href="#top">GitHub</a>
          </div>
          <div className="d5-foot__links">
            <div><strong>On this page</strong><a className="link-plain" href="#collect">Collect</a><a className="link-plain" href="#connect">Connect</a><a className="link-plain" href="#return">Return</a></div>
            <div><strong>The app</strong><a className="link-plain" href="#price">The price</a><a className="link-plain" href="#questions">Questions</a><a className="link-plain" href="#download">Download</a></div>
            <div><strong>Made in</strong><span>Lisbon</span><span>Support answers within a day, Monday to Friday.</span></div>
          </div>
        </div>
        <div className="d5-foot__legal">
          <p>© 2026 Commonplace. Pictures: <a href="https://commons.wikimedia.org/wiki/File:Card_catalogue_drawers.jpg">Card catalogue drawers</a> by Carolina Prysyazhnyuk, <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA 2.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Card_catalog_at_the_Indiana_State_Library_-_interior_view_of_catalog_cards.jpg">Card catalog at the Indiana State Library</a> by TBurmeister, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Zettelkaesten_et_01.jpg">Zettelkästen et</a> by Michiel Streijger, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:The_brain,_after_Haller_and_Ridley._Engraving_by_Benard,_lat_Wellcome_V0007844EL.jpg">The brain, after Haller and Ridley</a>, Wellcome Collection, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:HSGH_022-000941_Niklas_Luhmann_(cropped).png">Niklas Luhmann</a>, Universitätsarchiv St. Gallen, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>; Cajal’s nerve cells, Burns’s commonplace book, the memex drawing, Israel the Grammarian’s book and the Library of Congress reading room, public domain; all via Wikimedia Commons.</p>
          <a className="link-plain" href="#top">Back to top</a>
        </div>
      </footer>
    </main>
  );
}
