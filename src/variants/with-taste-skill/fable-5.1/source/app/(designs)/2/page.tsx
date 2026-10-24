/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { FontshareFonts } from "../fonts";
import { Motion } from "../motion";
import { SvgWord } from "../svg-word";
import { LockeIndex, Plate } from "./live";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/(designs)/ui.css";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/(designs)/2/d2.css";

export const metadata: Metadata = { title: "Commonplace Book. A notebook that remembers for you." };

const v = (i: number) => ({ "--i": i }) as React.CSSProperties;

const sheets = [
  { name: "It links itself", tone: "surface", text: "Write a line and every note that mentions the same thing is listed beside it, whether or not you linked them. The book grows sideways, the way a slip box did.", pic: { src: "/variants/with-taste-skill/fable-5.1/assets/zettelkaesten-et-01.jpg", w: 1920, h: 1280, alt: "Rows of black-edged slip boxes on grey shelves, each labelled with the word et and a running number", pos: "50% 45%" } },
  { name: "It comes back", tone: "stone", text: "On day one, three, seven, twenty-one, sixty and a hundred and eighty the note returns for a look. You mark it still true, change it, or let it go.", pic: { src: "/variants/with-taste-skill/fable-5.1/assets/card-catalog-at-the-indiana-state-library.jpg", w: 1920, h: 2560, alt: "A typed library catalogue card standing in its drawer, held by the rod through its hole", pos: "50% 55%" } },
  { name: "It stays in plain files", tone: "paper", text: "Every note is a Markdown file in a folder you chose. Sync it with your own service, back it up by copying it, open it in any other app.", pic: null },
] as const;

const slip = [
  { when: "Today", rows: [["You write it down", "2 min"], ["It finds its neighbours", "at once"]] },
  { when: "This week", rows: [["First return", "day 1"], ["Second return", "day 3"], ["Third return", "day 7"]] },
  { when: "This month and after", rows: [["Fourth return", "day 21"], ["Fifth return", "day 60"], ["Sixth return", "day 180"], ["Then once a year", "for good"]] },
];

const menu = [
  { group: "The book", items: [["The first 500 notes", "0", "Everything below included. No card, no account, no clock running."], ["Every note after, each month", "6", "Cancel any month. The files stay yours."], ["Every note after, each year", "60", "Two months free against the monthly price."]] },
  { group: "Always included", items: [["Plain Markdown files", "0", "In a folder you choose, readable by any other app."], ["Sync by your own folder", "0", "iCloud, Dropbox or any service that syncs a folder."], ["The return schedule", "0", "Day 1, 3, 7, 21, 60 and 180, then yearly."], ["Export, whole or in part", "0", "A zip of the folder, or any one note as a file."]] },
  { group: "Devices", items: [["Mac, Windows, Linux", "0", "One download each, the same notebook."], ["iPhone and Android", "0", "For writing it down where you are."]] },
];

const faq = [
  ["Where are my notes stored?", "In a folder you choose, as Markdown files. Commonplace reads and writes them in place, so a backup is a copy of the folder."],
  ["What does “comes back” mean?", "Each note returns on day 1, 3, 7, 21, 60 and 180 after you wrote it, then once a year. You mark it still true, edit it, or let it go."],
  ["Why those days?", "They follow the forgetting curve Ebbinghaus measured in 1885: each return lands just before the next drop, so the gaps can grow."],
  ["Does it need an account?", "Not on one device. Sync uses your own iCloud, Dropbox or any folder-syncing service. There is no Commonplace cloud."],
  ["Can I bring notes from another app?", "Markdown and plain-text folders are read as they are. Exports from other apps are converted on import, links kept where a target exists."],
  ["What is Locke’s index?", "A two-page grid from his 1706 method: every heading filed under its first letter and the first vowel after it. Commonplace keeps one for your notes, and a full-text search besides."],
  ["What happens after 500 notes?", "Reading, searching and the returns keep working. Writing the 501st note asks you to subscribe; the files stay yours either way."],
  ["Is there a team version?", "No. Commonplace is one person’s notebook. Any note can be shared as a plain file, and that is the whole collaboration feature."],
  ["Can I turn the returns off?", "Yes, for any note or for a whole folder. Recipes rarely need to come back; ideas usually do."],
  ["What if I stop paying?", "The app keeps reading, searching and returning your notes. It only stops accepting new ones past the first 500."],
];

export default function Page() {
  return (
    <main className="page d2" id="top">
      <FontshareFonts fonts={["gambarino@400", "general-sans@400,500"]} />
      <Motion />
      <div className="d2-body">
        <header className="d2-hero">
          <div className="d2-top">
            <a className="d2-mono" href="#top" aria-label="Commonplace">
              <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="currentColor" /><text x="20" y="27" textAnchor="middle" fontFamily="'Fable v2 Gambarino', Georgia, serif" fontSize="24" fill="#eeecea">C</text></svg>
            </a>
            <nav className="d2-links" aria-label="Site">
              <a className="link" href="#does">What it does</a>
              <a className="link" href="#price">The price</a>
              <a className="link" href="#faq">Questions</a>
            </nav>
            <a className="button" href="#download">Download for Mac</a>
          </div>

          <div className="d2-field">
            <img className="d2-field__photo" src="/variants/with-taste-skill/fable-5.1/assets/reading-room-university-of-pennsylvania-library-philadelphia.jpg" width="1920" height="1562" alt="A high reading room photographed around 1900, long desks with lamps under arched windows" fetchPriority="high" decoding="async" />
          <div className="d2-card">
            <span className="d2-corner d2-corner--tl" aria-hidden="true" /><span className="d2-corner d2-corner--tr" aria-hidden="true" /><span className="d2-corner d2-corner--bl" aria-hidden="true" /><span className="d2-corner d2-corner--br" aria-hidden="true" />
            <h1 className="d2-card__title lines">
              <span className="line d2-card__l1"><span data-line style={v(0)}>Commonplace</span></span>
              <span className="line d2-card__l2"><span data-line style={v(1)}>Book</span></span>
            </h1>
            <p className="d2-card__sub" data-rise style={v(2)}>A notebook that keeps what you read and think, links it to what you already know, and brings it back before you forget.</p>
            <LockeIndex />
            <p className="d2-card__facts" data-rise style={v(3)}>
              <span>Free for 500 notes</span><i aria-hidden="true" /><span>then €6 a month</span><i aria-hidden="true" /><span>Mac, Windows, Linux, iPhone</span>
            </p>
          </div>
          </div>
        </header>

        <section className="d2-stack" id="does" aria-labelledby="d2-does-h">
          <h2 id="d2-does-h" className="d2-stack__title">What the book does</h2>
          <div className="d2-sheets">
            {sheets.map((s, i) => (
              <article key={s.name} className={`d2-sheet d2-sheet--${s.tone}`} style={{ "--n": i } as React.CSSProperties}>
                <h3 className="d2-sheet__name">{s.name}</h3>
                <p className="d2-sheet__text" data-reveal>{s.text}</p>
                <div className="d2-sheet__pic">
                  {s.pic ? (
                    <img src={s.pic.src} width={s.pic.w} height={s.pic.h} alt={s.pic.alt} decoding="async" style={{ objectPosition: s.pic.pos }} data-drift={i === 0 ? "" : undefined} />
                  ) : (
                    <div className="d2-files" data-ui>
                      <div className="ui-top"><span className="ui-crumbs"><span>~/Notes</span><span>Kitchen</span></span><span>6 files</span></div>
                      <ul className="ui-files">
                        <li className="is-selected"><span>Sourdough at 78% hydration.md</span><span>1.1 KB</span></li>
                        <li><span>Oven temperatures, checked.md</span><span>0.8 KB</span></li>
                        <li><span>Tea at 80 degrees.md</span><span>0.6 KB</span></li>
                        <li><span>Kitchen notes.md</span><span>0.4 KB</span></li>
                        <li><span>Garden plan with Priya.md</span><span>0.9 KB</span></li>
                        <li><span>Repot the olive in March.md</span><span>0.7 KB</span></li>
                      </ul>
                      <div className="ui-foot"><span>Plain Markdown, synced by your own folder</span><button type="button" className="ui-btn ui-btn--ghost">Export all</button></div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="d2-slip" aria-labelledby="d2-slip-h">
          <div className="grid">
            <div className="d2-slip__text">
              <h2 id="d2-slip-h">The return schedule</h2>
              <p data-reveal>Ebbinghaus measured it in 1885: without a second look, two thirds of what you read is gone within a day. Each return lands just before the next drop, so the gaps can grow.</p>
            </div>
            <div className="d2-slip__paper nums" data-reveal style={v(1)}>
              {slip.map((g) => (
                <div key={g.when} className="d2-slip__group">
                  <h3>{g.when}</h3>
                  {g.rows.map(([what, when]) => (
                    <div key={what} className="d2-slip__row"><span>{what}</span><span className="d2-slip__dots" aria-hidden="true" /><span>{when}</span></div>
                  ))}
                </div>
              ))}
              <div className="d2-slip__total"><span>Remembered, in your own words</span><span>six looks, ten minutes</span></div>
            </div>
          </div>
        </section>

        <Plate />

        <section className="d2-menu" id="price" aria-labelledby="d2-price-h">
          <div className="grid">
            <div className="d2-menu__head">
              <h2 id="d2-price-h">The price</h2>
              <figure data-reveal>
                <img src="/variants/with-taste-skill/fable-5.1/assets/schlagwortkatalog.jpg" width="1920" height="1624" alt="An open drawer of a wooden subject catalogue, one typed card pulled forward" decoding="async" />
                <figcaption>The subject catalogue of the University Library of Graz</figcaption>
              </figure>
            </div>
            <div className="d2-menu__list">
              {menu.map((g, gi) => (
                <div key={g.group} className="d2-menu__group" data-reveal style={v(gi + 1)}>
                  <h3>{g.group} <span className="d2-menu__cur">€</span></h3>
                  {g.items.map(([name, price, desc]) => (
                    <div key={name} className="d2-menu__item">
                      <div className="d2-menu__line"><span>{name}</span><span className="nums">{price}</span></div>
                      <p>{desc}</p>
                    </div>
                  ))}
                </div>
              ))}
              <a className="button" href="#download" id="download" data-reveal style={v(4)}>Download for Mac</a>
            </div>
          </div>
        </section>

        <section className="d2-faq" id="faq" aria-labelledby="d2-faq-h">
          <div className="grid">
            <h2 id="d2-faq-h">Questions</h2>
            <div className="d2-faq__text">
              {faq.map(([q, a], i) => (
                <p key={q} data-reveal style={v(i % 4)}><strong>{q}</strong> {a}</p>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="d2-foot">
        <div className="d2-foot__cols">
          <div><strong>Commonplace</strong><span>Made in Lisbon</span><a className="link-plain" href="mailto:hello@commonplace.app">hello@commonplace.app</a></div>
          <div><strong>On this page</strong><a className="link-plain" href="#does">What the book does</a><a className="link-plain" href="#price">The price</a><a className="link-plain" href="#faq">Questions</a></div>
          <div><strong>Elsewhere</strong><a className="link-plain" href="#top">Mastodon</a><a className="link-plain" href="#top">GitHub</a><a className="link-plain" href="#top">Newsletter</a></div>
          <div><strong>Hours</strong><span>Support answers within a day,</span><span>Monday to Friday.</span></div>
        </div>
        <div className="d2-foot__mark"><SvgWord text="Commonplace" font="'Fable v2 Gambarino', Georgia, serif" /></div>
        <p className="d2-foot__legal">
          © 2026 Commonplace. Pictures: <a href="https://commons.wikimedia.org/wiki/File:Zettelkaesten_et_01.jpg">Zettelkästen et</a> by Michiel Streijger, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Card_catalog_at_the_Indiana_State_Library_-_interior_view_of_catalog_cards.jpg">Card catalog at the Indiana State Library</a> by TBurmeister, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Zettelkasten_(514941699).jpg">Zettelkasten</a> by Kai Schreiber, <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA 2.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Schlagwortkatalog.jpg">Schlagwortkatalog</a> by Marcus Gossler, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>; the Pennsylvania reading room, Burns’s commonplace book, the memex drawing and Cajal’s nerve cells, public domain; all via Wikimedia Commons.
        </p>
      </footer>
    </main>
  );
}
