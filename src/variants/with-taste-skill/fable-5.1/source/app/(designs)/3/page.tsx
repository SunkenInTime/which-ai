/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { GoogleFonts } from "../fonts";
import { Motion } from "../motion";
import { SvgWord } from "../svg-word";
import { Controls, Figures } from "./live";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/(designs)/ui.css";
import "@/generated/scoped-variant-css/with-taste-skill/fable-5.1/source/app/(designs)/3/d3.css";

export const metadata: Metadata = { title: "Commonplace. Why you forget, and how not to." };

const v = (i: number) => ({ "--i": i }) as React.CSSProperties;

const stages = [
  { w: 12, when: "Two minutes", clause: "First, you write it down: a line, a quotation, a thought.", tone: "ink" },
  { w: 12, when: "At once", clause: "Then it finds the notes that mention the same thing.", tone: "white" },
  { w: 60, when: "Six looks over six months", clause: "Later it comes back, six times, each just before you would have forgotten.", tone: "surface" },
  { w: 16, when: "For good", clause: "Always, it stays a plain file in a folder of your own.", tone: "ink" },
];

const plans = [
  { name: "Free", price: "€0", period: "for the first 500 notes", rec: false },
  { name: "Monthly", price: "€6", period: "a month, cancel any month", rec: false },
  { name: "Yearly", price: "€60", period: "a year, two months free", rec: true },
];
const rows: [string, string, string, string][] = [
  ["Notes", "Up to 500", "Unlimited", "Unlimited"],
  ["Returns", "Day 1, 3, 7, 21, 60, 180", "The same", "The same"],
  ["Files", "Plain Markdown, yours", "Plain Markdown, yours", "Plain Markdown, yours"],
  ["Sync", "By your own folder", "By your own folder", "By your own folder"],
  ["Devices", "Mac, Windows, Linux, iPhone, Android", "All of them", "All of them"],
  ["Support", "By email", "By email, within a day", "By email, within a day"],
  ["Per month", "Nothing", "€6", "€5"],
];

const faq = [
  ["Where are my notes stored?", "In a folder you choose, as Markdown files. Commonplace reads and writes them in place, so a backup is a copy of the folder."],
  ["What does “comes back” mean?", "Each note returns on day 1, 3, 7, 21, 60 and 180 after you wrote it, then once a year. You mark it still true, edit it, or let it go."],
  ["Why those days?", "They follow the curve Ebbinghaus measured in 1885: each return lands just before the next drop, so the gaps can grow."],
  ["Does it need an account?", "Not on one device. Sync uses your own iCloud, Dropbox or any folder-syncing service. There is no Commonplace cloud."],
  ["Can I bring notes from another app?", "Markdown and plain-text folders are read as they are. Exports from other apps are converted on import, links kept where a target exists."],
  ["Can I turn the returns off?", "Yes, for any note or for a whole folder. Recipes rarely need to come back; ideas usually do."],
  ["What happens after 500 notes?", "Reading, searching and the returns keep working. Writing the 501st note asks you to subscribe; the files stay yours either way."],
  ["Is there a team version?", "No. Commonplace is one person’s notebook. Any note can be shared as a plain file, and that is the whole collaboration feature."],
  ["What if I stop paying?", "The app keeps reading, searching and returning your notes. It only stops accepting new ones past the first 500."],
  ["Who makes it?", "A small team in Lisbon. Questions, bugs and ideas go to hello@commonplace.app and are read by the people who make it."],
];

export default function Page() {
  return (
    <main className="page d3" id="top">
      <GoogleFonts families={["Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,500", "Jost:wght@400;500"]} />
      <Motion />

      <header className="d3-hero">
        <div className="d3-top">
          <a className="d3-wordmark" href="#top">Commonplace</a>
          <nav className="d3-top__links" aria-label="Site">
            <a className="link" href="#plans">The plans</a>
            <a className="link" href="#faq">Questions</a>
          </nav>
          <a className="button" href="#download">Download for Mac</a>
        </div>
        <div className="d3-masthead" data-reveal>
          <img src="/variants/with-taste-skill/fable-5.1/assets/robert-burns-s-commonplace-book-1783-1785.jpg" width="1920" height="1251" alt="A handwritten page in eighteenth-century script, the introduction to Robert Burns’s commonplace book" fetchPriority="high" decoding="async" style={{ objectPosition: "50% 30%" }} data-drift />
          <span className="d3-masthead__ink" aria-hidden="true" />
          <img src="/variants/with-taste-skill/fable-5.1/assets/zettelkaesten-et-01.jpg" width="1920" height="1280" alt="Rows of black-edged slip boxes on grey shelves, each labelled with the word et and a running number" decoding="async" style={{ objectPosition: "50% 50%" }} />
          <img src="/variants/with-taste-skill/fable-5.1/assets/santiago-ramon-y-cajal-nerve-cells-in.jpg" width="1920" height="1268" alt="Ink drawing of nerve cells with long branching fibres, lettered A to K" decoding="async" style={{ objectPosition: "50% 50%" }} />
          <span className="d3-masthead__white" aria-hidden="true" />
          <img src="/variants/with-taste-skill/fable-5.1/assets/card-catalog-at-the-indiana-state-library.jpg" width="1920" height="2560" alt="A typed library catalogue card standing in its drawer, held by the rod through its hole" decoding="async" style={{ objectPosition: "50% 55%" }} />
        </div>
        <div className="d3-title">
          <p className="d3-title__aside" data-rise style={v(2)}>The case for a notebook that remembers, in figures from 1885 and a slip box of ninety thousand cards.</p>
          <div className="d3-title__main">
            <h1 className="lines">
              <span className="line"><span data-line style={v(0)}>Why you forget,</span></span>
              <span className="line"><span data-line style={v(1)}>and how not to.</span></span>
            </h1>
            <p className="d3-standfirst" data-rise style={v(3)}>Commonplace is a notebook that links every note to what you already know and brings it back before it fades. Free for 500 notes, then €6 a month, in plain files on your own disk.</p>
          </div>
        </div>
      </header>

      <Controls />

      <section className="d3-bar" aria-labelledby="d3-bar-h">
        <h2 id="d3-bar-h">Where the time goes</h2>
        <ul className="d3-bar__bar" data-ui aria-label="Four stages of a note, drawn as a bar in proportion to the time each takes">
          {stages.map((s) => (
            <li key={s.when} className={`d3-seg d3-seg--${s.tone}`} style={{ "--w": s.w } as React.CSSProperties}>
              {s.when}
            </li>
          ))}
        </ul>
        <ol className="d3-bar__clauses">
          {stages.map((s, i) => (
            <li key={s.when} style={{ ...v(i), "--w": s.w } as React.CSSProperties} data-reveal>{s.clause}</li>
          ))}
        </ol>
      </section>

      <Figures />

      <section className="d3-plans" id="plans" aria-labelledby="d3-plans-h">
        <table className="d3-table only-wide">
          <thead>
            <tr>
              <th scope="col" className="d3-table__lead"><h2 id="d3-plans-h">The plans</h2></th>
              {plans.map((p) => (
                <th key={p.name} scope="col" className={p.rec ? "is-rec" : undefined}>
                  <span className="d3-table__name">{p.name}</span>
                  <span className="d3-table__price">{p.price}</span>
                  <span className="d3-table__period">{p.period}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([what, ...cells]) => (
              <tr key={what}>
                <th scope="row">{what}</th>
                {cells.map((c, i) => <td key={i} className={plans[i].rec ? "is-rec" : undefined}>{c}</td>)}
              </tr>
            ))}
            <tr className="d3-table__acts">
              <td />
              {plans.map((p) => (
                <td key={p.name} className={p.rec ? "is-rec" : undefined}>
                  <a className={`button${p.rec ? " button--inv" : ""}`} href="#download" id={p.rec ? "download" : undefined}>{p.name === "Free" ? "Download for Mac" : `Choose ${p.name.toLowerCase()}`}</a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="d3-plans__stack only-narrow">
          <h2>The plans</h2>
          {plans.map((p) => (
            <div key={p.name} className={`d3-plan${p.rec ? " is-rec" : ""}`}>
              <div className="d3-plan__head"><span className="d3-plan__name">{p.name}</span><span className="d3-plan__price">{p.price}</span></div>
              <p className="d3-plan__period">{p.period}</p>
              <dl>
                {rows.map(([what, ...cells]) => (
                  <div key={what}><dt>{what}</dt><dd>{cells[plans.indexOf(p)]}</dd></div>
                ))}
              </dl>
              <a className={`button${p.rec ? " button--inv" : ""}`} href="#download">{p.name === "Free" ? "Download for Mac" : `Choose ${p.name.toLowerCase()}`}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="d3-faq" id="faq" aria-labelledby="d3-faq-h">
        <div className="d3-ax">
          <h2 id="d3-faq-h">Questions</h2>
          <div className="d3-faq__text">
            {faq.map(([q, a], i) => (
              <p key={q} data-reveal style={v(i % 4)}><strong>{q}</strong> {a}</p>
            ))}
          </div>
        </div>
      </section>

      <footer className="d3-foot">
        <div className="d3-foot__cols">
          <div><strong>Commonplace</strong><span>Made in Lisbon</span><a className="link-plain" href="mailto:hello@commonplace.app">hello@commonplace.app</a></div>
          <div><strong>On this page</strong><a className="link-plain" href="#plans">The plans</a><a className="link-plain" href="#faq">Questions</a><a className="link-plain" href="#top">Top</a></div>
          <div><strong>Elsewhere</strong><a className="link-plain" href="#top">Mastodon</a><a className="link-plain" href="#top">GitHub</a><a className="link-plain" href="#top">Newsletter</a></div>
          <div><strong>Hours</strong><span>Support answers within a day,</span><span>Monday to Friday.</span></div>
        </div>
        <div className="d3-foot__mark"><SvgWord text="Commonplace" font="'Fable v2 Bodoni Moda', Didot, Georgia, serif" weight={500} /></div>
        <p className="d3-foot__legal">
          © 2026 Commonplace. Pictures: <a href="https://commons.wikimedia.org/wiki/File:Zettelkaesten_et_01.jpg">Zettelkästen et</a> by Michiel Streijger, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:Card_catalog_at_the_Indiana_State_Library_-_interior_view_of_catalog_cards.jpg">Card catalog at the Indiana State Library</a> by TBurmeister, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; <a href="https://commons.wikimedia.org/wiki/File:The_brain,_after_Haller_and_Ridley._Engraving_by_Benard,_lat_Wellcome_V0007844EL.jpg">The brain, after Haller and Ridley</a>, Wellcome Collection, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>; Robert Burns’s commonplace book and Cajal’s nerve cells, public domain; all via Wikimedia Commons.
        </p>
      </footer>
    </main>
  );
}
