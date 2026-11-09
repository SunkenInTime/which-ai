import type { Metadata } from "next";
import { Cormorant, DM_Mono, EB_Garamond } from "next/font/google";
import { Chart } from "./chart";
import s from "./page.module.css";

const display = Cormorant({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atlas",
  description:
    "Every idea you’ve ever had is still up there. Engram charts your notes like a night sky, so you can navigate by what you already know.",
};

function Mark() {
  return (
    <svg viewBox="0 0 28 28" width="22" height="22" aria-hidden="true" className={s.mark}>
      <circle cx="14" cy="14" r="12.5" />
      <path d="M14 4.5 15.9 12.1 23.5 14 15.9 15.9 14 23.5 12.1 15.9 4.5 14 12.1 12.1Z" />
    </svg>
  );
}

const catalogue = [
  ["0001", "α Mem", "The forgetting curve", "Memoria", "1.2", "9", "yesterday"],
  ["0002", "α Amb", "Walking makes ideas", "Ambulatio", "1.6", "5", "3 days ago"],
  ["0003", "β Off", "Meeting notes are not notes", "Officina", "2.1", "8", "this morning"],
  ["0004", "α Pan", "Sourdough, attempt nine", "Panis", "1.9", "3", "Sunday"],
  ["0005", "α Fab", "Dad’s ferry story, recorded", "Fabula", "1.4", "2", "2 years ago"],
  ["0006", "γ Mem", "Why I forget what I read", "Memoria", "2.4", "5", "tonight"],
  ["0007", "α Hor", "Tomatoes want deeper water", "Hortus", "1.8", "3", "4 months ago"],
];

export default function Atlas() {
  return (
    <div className={`${s.page} ${display.variable} ${body.variable} ${mono.variable}`}>
      {/* ------------------------------------------------------------ hero */}
      <section className={s.hero} id="top">
        <div className={s.frame} aria-hidden="true" />

        <header className={s.nav}>
          <a href="#top" className={s.logo} aria-label="Engram home">
            <Mark />
            Engram
          </a>
          <nav aria-label="Primary">
            <a href="#method">The method</a>
            <a href="#tonight">Tonight’s sky</a>
            <a href="#catalogue">The catalogue</a>
            <a href="#passage">Passage</a>
          </nav>
          <a href="#passage" className={s.navCta}>
            Begin
          </a>
        </header>

        <div className={s.heroGrid}>
          <div className={s.copy}>
            <p className={s.plateNo}>Plate I — The whole sky</p>
            <h1>
              Every idea you’ve ever had is <em>still up there.</em>
            </h1>
            <p className={s.lede}>
              Engram is a note-taking app that works like a second brain. It charts your notes like
              a night sky — each thought a star, each link a line — so nothing you know is lost.
            </p>
            <div className={s.actions}>
              <a href="#passage" className={s.primary}>
                Begin your atlas
              </a>
              <a href="#method" className={s.textLink}>
                How a sky gets drawn
              </a>
            </div>
          </div>

          <Chart />
        </div>

        <p className={s.corner} aria-hidden="true">
          1,284 notes · 3,906 links · 6 of 41 constellations shown
        </p>
      </section>

      <main>
        {/* -------------------------------------------------------- method */}
        <section id="method" className={s.section}>
          <header className={s.sectionHead}>
            <p className={s.over}>The method</p>
            <h2>
              Nobody draws a constellation on purpose.
              <br />
              <em>You add stars; the figures arrive.</em>
            </h2>
          </header>

          <div className={s.plates}>
            <article className={s.plate}>
              <svg viewBox="0 0 320 210" aria-hidden="true" className={s.diagram}>
                <circle className={s.dash} cx="160" cy="105" r="72" />
                <path className={s.thin} d="M160 12v30M160 168v30M67 105h30M223 105h30" />
                <circle className={s.glow} cx="160" cy="105" r="22" />
                <path
                  className={s.fill}
                  d="M160 91l2.8 11.2 11.2 2.8-11.2 2.8L160 119l-2.8-11.2-11.2-2.8 11.2-2.8Z"
                />
                <path className={s.thin} d="M176 118l30 28h98" />
                <text className={s.cap} x="304" y="164" textAnchor="end">
                  09:41 — ask Ines about
                </text>
                <text className={s.cap} x="304" y="181" textAnchor="end">
                  the ’74 ferry logs
                </text>
                <text className={s.tag} x="18" y="26">
                  ⌥ SPACE
                </text>
              </svg>
              <p className={s.plateNo}>Plate II · Punctum</p>
              <h3>A thought becomes a point of light.</h3>
              <p>
                One shortcut from anywhere, one tap on your phone, a voice memo on a walk. It’s in
                your sky before you’ve switched windows. No folder to choose, no title to invent.
              </p>
            </article>

            <article className={s.plate}>
              <svg viewBox="0 0 320 210" aria-hidden="true" className={s.diagram}>
                <path className={s.line} d="M62 158 126 84l78 42" />
                <path className={s.line} d="M62 158l142-32" opacity="0.5" />
                <path className={s.dot} d="M204 126l58-66" />
                <circle className={s.glow} cx="126" cy="84" r="16" />
                <path className={s.fill} d="M126 73l2.2 8.8 8.8 2.2-8.8 2.2L126 95l-2.2-8.8-8.8-2.2 8.8-2.2Z" />
                <circle className={s.fill} cx="62" cy="158" r="3.6" />
                <circle className={s.fill} cx="204" cy="126" r="3.6" />
                <circle className={s.ringed} cx="262" cy="60" r="3" />
                <circle className={s.thin} cx="262" cy="60" r="11" />
                <text className={s.cap} x="138" y="74">
                  α
                </text>
                <text className={s.cap} x="42" y="150">
                  β
                </text>
                <text className={s.cap} x="212" y="146">
                  γ
                </text>
                <text className={s.tag} x="222" y="34">
                  SUGGESTED
                </text>
                <text className={s.tag} x="18" y="26">
                  [[ ]]
                </text>
              </svg>
              <p className={s.plateNo}>Plate III · Linea</p>
              <h3>Points become figures.</h3>
              <p>
                Link notes by hand with double brackets, or let Engram propose the lines it can
                see. Every link runs both ways. One day you look up and there’s a shape you never
                planned.
              </p>
            </article>

            <article className={s.plate}>
              <svg viewBox="0 0 320 210" aria-hidden="true" className={s.diagram}>
                <path className={s.dash} d="M40 186a120 120 0 0 1 240 0" />
                <path className={s.thin} d="M160 186 84 92M160 186l6-128M160 186l88-86" />
                <circle className={s.fill} cx="160" cy="186" r="3" />
                <circle className={s.glow} cx="166" cy="58" r="15" />
                <path className={s.fill} d="M166 47l2.2 8.8 8.8 2.2-8.8 2.2L166 69l-2.2-8.8-8.8-2.2 8.8-2.2Z" />
                <circle className={s.fill} cx="84" cy="92" r="3.6" />
                <circle className={s.fill} cx="248" cy="100" r="3.6" />
                <text className={s.num} x="68" y="86">
                  1
                </text>
                <text className={s.num} x="182" y="52">
                  2
                </text>
                <text className={s.num} x="260" y="96">
                  3
                </text>
                <text className={s.cap} x="160" y="24" textAnchor="middle">
                  “what did I decide about pricing?”
                </text>
              </svg>
              <p className={s.plateNo}>Plate IV · Navigatio</p>
              <h3>And figures become a way home.</h3>
              <p>
                Ask a question in plain words. Engram answers from your own notes, in your own
                phrasing, and shows you exactly which stars it steered by.
              </p>
            </article>
          </div>
        </section>

        {/* -------------------------------------------------- tonight's sky */}
        <section id="tonight" className={`${s.section} ${s.tonight}`}>
          <div className={s.tonightCopy}>
            <p className={s.over}>Tonight’s sky</p>
            <h2>
              Old notes rise <em>on their own.</em>
            </h2>
            <p>
              You never have to remember that a note exists. While you write, Engram quietly raises
              the ones that bear on it. And each evening it lifts three above the horizon — chosen
              by what you’ve been thinking about that day.
            </p>
            <ul>
              <li>
                <b>As you type.</b> Related notes appear beside the page, unasked.
              </li>
              <li>
                <b>Each evening.</b> Three risings, with the reason each one was chosen.
              </li>
              <li>
                <b>Never a nag.</b> No streaks, no badges. The sky doesn’t mind if you’re busy.
              </li>
            </ul>
          </div>

          <figure className={s.horizon}>
            <svg viewBox="0 0 640 380" aria-hidden="true">
              <path className={s.dash} d="M30 322a290 290 0 0 1 580 0" />
              <path className={s.dash} d="M130 322a190 190 0 0 1 380 0" opacity="0.6" />

              <path className={s.dot} d="M58 318c10-86 30-166 62-222" />
              <path className={s.dot} d="M196 322c10-60 28-112 54-150" />
              <path className={s.dot} d="M340 322c8-26 20-50 38-70" />

              <path className={s.line} d="M8 324q312-22 624 0" />
              <path className={s.hatch} d="M8 333q312-22 624 0" />

              <circle className={s.glow} cx="120" cy="96" r="24" />
              <path className={s.fill} d="M120 82l2.8 11.2 11.2 2.8-11.2 2.8L120 110l-2.8-11.2-11.2-2.8 11.2-2.8Z" />
              <circle className={s.glow} cx="250" cy="172" r="18" />
              <circle className={s.fill} cx="250" cy="172" r="4" />
              <circle className={s.glow} cx="378" cy="252" r="16" />
              <circle className={s.fill} cx="378" cy="252" r="3.4" />

              <g className={s.small}>
                <text className={s.num} x="150" y="104">
                  1
                </text>
                <text className={s.num} x="274" y="180">
                  2
                </text>
                <text className={s.num} x="400" y="260">
                  3
                </text>
              </g>

              <g className={s.wide}>
              <text className={s.capBig} x="150" y="92">
                Questions to ask before saying yes
              </text>
              <text className={s.tag} x="151" y="111">
                YOU WROTE “OVERCOMMITTED” TWICE THIS WEEK
              </text>
              <text className={s.capBig} x="276" y="168">
                Jane Jacobs on sidewalks
              </text>
              <text className={s.tag} x="277" y="187">
                THREE YEARS AGO TODAY
              </text>
              <text className={s.capBig} x="402" y="248">
                Talk idea: tools for forgetting
              </text>
              <text className={s.tag} x="403" y="267">
                LEFT HALF-FINISHED IN JULY
              </text>
              </g>

              <text className={s.tag} x="320" y="362" textAnchor="middle">
                EAST · 21:30
              </text>
              <text className={s.tag} x="592" y="306" textAnchor="end" opacity="0.7">
                10°
              </text>
              <text className={s.tag} x="496" y="306" textAnchor="end" opacity="0.7">
                40°
              </text>
            </svg>
            <ol className={s.risings}>
              <li>
                <b>Questions to ask before saying yes</b>
                You wrote “overcommitted” twice this week
              </li>
              <li>
                <b>Jane Jacobs on sidewalks</b>
                Three years ago today
              </li>
              <li>
                <b>Talk idea: tools for forgetting</b>
                Left half-finished in July
              </li>
            </ol>
            <figcaption>Fig. 5. Three notes rising, the evening of 9 November.</figcaption>
          </figure>
        </section>

        {/* ------------------------------------------------------ catalogue */}
        <section id="catalogue" className={s.section}>
          <header className={s.sectionHead}>
            <p className={s.over}>The catalogue</p>
            <h2>
              Under the romance, <em>plain text.</em>
            </h2>
            <p>
              Every star is a Markdown file in a folder on your own machine. Sync is end-to-end
              encrypted. If you leave, you take the sky with you — there is nothing to export.
            </p>
          </header>

          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Desig.</th>
                  <th>Note</th>
                  <th>Figure</th>
                  <th>Mag.</th>
                  <th>Links</th>
                  <th>Last seen</th>
                </tr>
              </thead>
              <tbody>
                {catalogue.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={7}>
                    … and 1,277 more, each one a file: <span>~/Engram/notes/the-forgetting-curve.md</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <ul className={s.pledges}>
            <li>
              <b>Local first</b>
              Works with no account and no network. On a plane. On a mountain.
            </li>
            <li>
              <b>Encrypted in flight</b>
              We hold ciphertext. We couldn’t read your sky if we wanted to.
            </li>
            <li>
              <b>Brings its own telescope</b>
              Imports from Notion, Evernote, Obsidian, Apple Notes and paper scans.
            </li>
          </ul>
        </section>

        {/* --------------------------------------------------- observations */}
        <section className={s.section}>
          <header className={s.sectionHead}>
            <p className={s.over}>Observations</p>
            <h2>
              From other people’s <em>logbooks.</em>
            </h2>
          </header>
          <div className={s.logs}>
            <figure>
              <p className={s.stamp}>14 Mar · Lisbon · 23:10</p>
              <blockquote>
                I asked what I’d thought of a book I read in 2019. It told me — in my own words,
                with the page numbers.
              </blockquote>
              <figcaption>Inês Ferreira, historian</figcaption>
            </figure>
            <figure>
              <p className={s.stamp}>02 Jun · Pune · 07:45</p>
              <blockquote>
                The dotted lines between subjects are the whole point. My best essay this year
                started as one.
              </blockquote>
              <figcaption>Dev Malhotra, engineer and essayist</figcaption>
            </figure>
            <figure>
              <p className={s.stamp}>21 Oct · Uppsala · 16:30</p>
              <blockquote>
                I’ve stopped filing things. I add a star and trust the sky. It hasn’t lost one
                yet.
              </blockquote>
              <figcaption>Hanne Lindqvist, novelist</figcaption>
            </figure>
          </div>
        </section>

        {/* -------------------------------------------------------- passage */}
        <section id="passage" className={s.section}>
          <header className={s.sectionHead}>
            <p className={s.over}>Passage</p>
            <h2>
              Free to look up.
              <br />
              <em>Eight dollars to take it everywhere.</em>
            </h2>
          </header>
          <div className={s.fares}>
            <article>
              <p className={s.plateNo}>I</p>
              <h3>Naked eye</h3>
              <p className={s.fare}>
                <b>Free</b> forever
              </p>
              <p>One device. Every note, link and constellation. No account, no card.</p>
              <a href="#top" className={s.secondary}>
                Download
              </a>
            </article>
            <article data-featured>
              <p className={s.plateNo}>II</p>
              <h3>Telescope</h3>
              <p className={s.fare}>
                <b>$8</b> a month, billed yearly
              </p>
              <p>
                All your devices, encrypted. Ask the sky questions. Evening risings. A year of
                version history.
              </p>
              <a href="#top" className={s.primary}>
                Begin your atlas
              </a>
            </article>
            <article>
              <p className={s.plateNo}>III</p>
              <h3>Observatory</h3>
              <p className={s.fare}>
                <b>$12</b> a person, a month
              </p>
              <p>A shared sky for people who work together, with a private sky inside each.</p>
              <a href="#top" className={s.secondary}>
                Talk to us
              </a>
            </article>
          </div>
        </section>

        {/* ------------------------------------------------------------ cta */}
        <section className={s.cta}>
          <Mark />
          <h2>
            The sky was always there.
            <br />
            <em>Start charting it.</em>
          </h2>
          <a href="#top" className={s.primary}>
            Begin your atlas
          </a>
          <p>Free on one device · macOS, Windows, Linux, iOS, Android</p>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.motto}>Ad astra per notas</p>
        <nav aria-label="Footer">
          <a href="#method">The method</a>
          <a href="#catalogue">File format</a>
          <a href="#passage">Pricing</a>
          <a href="#top">Manual</a>
          <a href="#top">Privacy</a>
          <a href="#top">Contact</a>
        </nav>
        <p className={s.fine}>© 2026 Engram Labs · Charted by nine people who forget things for a living</p>
      </footer>
    </div>
  );
}
