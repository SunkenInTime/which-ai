/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Archives from "./Archives";
import FileACard from "./FileACard";
import PageMotion from "./PageMotion";
import { scallops, zigzag } from "./edges";
import styles from "./page.module.css";

// Gallery copy: the fonts come from app/fonts.css under "Opus v2" family names (see that file);
// these stand in for the next/font result and sets the same CSS variable.
const display = { variable: "opus-v2-barlow-condensed" };
const text = { variable: "opus-v2-barlow" };

export const metadata: Metadata = {
  title: "Engram — a notebook that remembers for you",
  description:
    "Engram is a note-taking app that works as a second brain. Link notes with [[brackets]], and old ones come back beside whatever you’re writing.",
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;
const MENU_EDGE = { "--edge": scallops(24, 13), "--edge-phone": scallops(13, 11) } as React.CSSProperties;
const SLIP_EDGE = { "--edge": zigzag(16, 12), "--edge-phone": zigzag(13, 11) } as React.CSSProperties;
const STRIP_EDGE = { "--edge": scallops(30, 9, false, true), "--edge-phone": scallops(17, 9, false, true) } as React.CSSProperties;

const MENU = [
  {
    group: "Capture",
    items: [
      { name: "A card over anything", value: "⌥ Space", note: "A blank card opens over whatever you’re doing. Ctrl Space on Windows and Linux." },
      { name: "Web clipper", value: "Chrome, Firefox, Safari", note: "Keeps the page’s text, its address and the line you highlighted." },
      { name: "Email in", value: "your own address", note: "Forward anything to you@in.engram.app and it arrives as a card." },
      { name: "Voice notes", value: "on device", note: "Talk on the walk home, read it as text when you sit down." },
      { name: "Photos and PDFs", value: "searchable", note: "Text in scans, receipts and slides is recognised and indexed." },
    ],
  },
  {
    group: "Link",
    items: [
      { name: "Double brackets", value: "type [[", note: "Pick a card as you type and the two are linked both ways." },
      { name: "Backlinks", value: "on every card", note: "Every card that points here, and the ones that mention it without a link." },
    ],
  },
  {
    group: "Resurface",
    items: [
      { name: "Recall in the margin", value: "up to five", note: "Older cards about the same thing appear beside what you’re writing, matched by meaning." },
      { name: "From your past", value: "7:00 daily", note: "A card from a week, a month and a year ago, each morning at the hour you choose." },
      { name: "Search", value: "on device", note: "Every word of every card, found without anything leaving your computer." },
    ],
  },
  {
    group: "Keep",
    items: [
      { name: "Plain Markdown", value: "~/Engram", note: "Your cards are text files in a folder that any editor can open." },
      { name: "Offline", value: "always", note: "Everything works on a plane. Only sync needs a connection." },
      { name: "Import", value: "five sources", note: "Apple Notes, Evernote, Notion, Obsidian and any folder of Markdown." },
    ],
  },
];

const WEEK = [
  {
    day: "Monday",
    rows: [
      ["Install, import Apple Notes", "4 min"],
      ["First card with ⌥ Space", "2 sec"],
      ["Link it to two older notes", "as you type"],
    ],
  },
  {
    day: "Tuesday",
    rows: [
      ["Clip an article from Safari", "1 click"],
      ["Voice note on the walk home", "40 sec"],
    ],
  },
  {
    day: "Thursday",
    rows: [
      ["A March note comes back", "unasked"],
      ["“Boiler” finds a receipt", "on device"],
    ],
  },
  {
    day: "Sunday",
    rows: [
      ["Last Monday’s card returns", "7:00"],
      ["Nothing filed by hand", "0 min"],
    ],
  },
];

const FAQ = [
  ["Where are my notes kept?", "In a folder on your own disk, as plain Markdown: one file per card, readable by any text editor. Sync sends encrypted copies to our servers so your other devices can fetch them. We hold the boxes, not the keys."],
  ["How can it resurface notes without sending them anywhere?", "A small model, about 80 MB, runs on your computer and your phone. It reads your cards where they are and keeps its index beside them. Nothing you write is sent away to be read."],
  ["Can I bring my notes from another app?", "Yes: Apple Notes, Evernote (.enex files), a Notion export, an Obsidian vault or any folder of Markdown. Links between notes come across where the old app kept them."],
  ["What happens to my notes if Engram shuts down?", "They stay where they are, in a folder on your disk, as text. The free app keeps working without our servers, and any editor can open the files."],
  ["Does it work offline?", "Writing, linking, search and resurfacing all work offline. Only sync needs a connection, and it catches up when you’re back."],
  ["Is there a web version?", "Not yet. Engram runs on macOS, Windows, Linux, iPhone, iPad and Android. A web version means reading your notes on a server, so we are taking our time."],
  ["Can I share a card?", "Publish one card as a web page and take it down whenever you like. On the Family plan a shared drawer sits beside each person’s private one."],
  ["Is there a discount for students?", "Sync is free for students and teachers with a school email address. Write to hello@engram.app from that address."],
  ["How many cards can it hold?", "It is built for decades of them. Search and resurfacing run on your device, so a full drawer is as quick to look through as a new one."],
  ["Do I need to learn a method first?", "No. Write cards the way you already write notes. Link them with [[ and ]] when you feel like it; Engram does the filing and the remembering."],
];

export default function Page() {
  return (
    <div id="v2-root" className={`${styles.page} ${display.variable} ${text.variable}`}>
      <main className={styles.main}>
        {/* The first screen: Engram's own catalogue card, standing in its drawer. */}
        <header className={styles.hero}>
          <div className={styles.topRow}>
            <a className={styles.wordmark} href="#top" id="top">Engram</a>
            <a className={styles.button} href="#download" data-load style={i(5)}>Download Engram</a>
          </div>

          <div className={styles.cardStand}>
            <nav className={styles.guides} aria-label="Sections">
              <a className={styles.guide} href="#file" style={{ ...i(0), "--x": "0%" } as React.CSSProperties}>File a card</a>
              <a className={`${styles.guide} ${styles.guideWide}`} href="#features" style={{ ...i(1), "--x": "20%" } as React.CSSProperties}>What it does</a>
              <a className={`${styles.guide} ${styles.guideWide}`} href="#how" style={{ ...i(2), "--x": "40%" } as React.CSSProperties}>How it works</a>
              <a className={styles.guide} href="#pricing" style={{ ...i(3), "--x": "60%" } as React.CSSProperties}>Pricing</a>
              <a className={styles.guide} href="#questions" style={{ ...i(4), "--x": "80%" } as React.CSSProperties}>Questions</a>
            </nav>

            <article className={styles.card} aria-labelledby="v2-title-main">
              <p className={styles.callNumber} aria-label="Call number 153.12 E57">
                <span>153.12</span>
                <span>E57</span>
              </p>
              <div className={styles.entry}>
                <h1 className={styles.h1} id="v2-title-main">
                  <span className={styles.line}><span data-line style={i(0)}>A notebook that</span></span>
                  <span className={`${styles.line} ${styles.indent}`}><span data-line style={i(1)}>remembers for you</span></span>
                </h1>
                <p className={styles.lead} data-load style={i(4)}>
                  Engram is a note-taking app that works as a second brain. Link notes with [[brackets]], and old ones come back beside whatever you’re writing.
                </p>
                <p className={styles.imprint}>
                  <span className={styles.imprintLine}>For macOS, Windows, Linux, iPhone and Android.</span>
                  <span className={styles.imprintLine}>
                    <span>Free on one device</span>
                    <span className={styles.diamond} aria-hidden="true" />
                    <span>Plain Markdown files on your own disk</span>
                  </span>
                </p>
                <p className={styles.tracing}>Filed under memory, note-taking and commonplace books.</p>
              </div>
              <span className={styles.rodHole} aria-hidden="true" />
            </article>
          </div>
        </header>

        {/* The live thing: write a card and file it. */}
        <section className={styles.file} id="file" aria-labelledby="v2-file">
          <div className={styles.fileHead}>
            <h2 className={styles.h2} id="v2-file" data-reveal style={i(0)}>
              Every card finds<br /> its neighbours
            </h2>
            <p className={styles.fileLead} data-reveal style={i(1)}>
              Write a thought and file it. Engram puts it behind the cards it’s about, the way Niklas Luhmann filed his slip box, and brings those cards back the next time you write about the same thing.
            </p>
          </div>
          <FileACard />
        </section>

        {/* Capabilities, set as a printed menu card on a green field. */}
        <section className={styles.menuField} id="features" aria-labelledby="v2-menu">
          <figure className={`${styles.tipped} ${styles.tippedLeft}`} data-reveal style={i(1)}>
            <img src="/variants/with-taste-skill/opus-5.5/v2/bnf-card-rothschild.jpg" width={1456} height={872} loading="lazy" decoding="async"
              alt="A handwritten catalogue card in blue ink with a round punched hole near its foot, from the Bibliothèque nationale de France" />
            <figcaption className={styles.captionOnField}>A card from the Rothschild autograph file, Bibliothèque nationale de France.</figcaption>
          </figure>

          <div className={styles.menuSheet} style={MENU_EDGE}>
            <h2 className={styles.menuHeading} id="v2-menu" data-reveal style={i(0)}>What it does</h2>
            {MENU.map((g) => (
              <div className={styles.menuGroup} key={g.group}>
                <h3 className={styles.menuGroupName} data-reveal style={i(0)}>{g.group}</h3>
                <ul className={styles.menuList}>
                  {g.items.map((it, n) => (
                    <li className={styles.menuItem} key={it.name} data-reveal style={i(n + 1)}>
                      <span className={styles.menuName}>{it.name}</span>
                      <span className={styles.menuLeader} aria-hidden="true" />
                      <span className={styles.menuValue}>{it.value}</span>
                      <span className={styles.menuNote}>{it.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className={styles.menuFoot}>Everything on this card is in the free app. Sync is the only thing we charge for.</p>
          </div>

          <figure className={`${styles.tipped} ${styles.tippedRight}`} data-reveal style={i(2)}>
            <img src="/variants/with-taste-skill/opus-5.5/v2/catalog-drawer-1898.jpg" width={1304} height={612} loading="lazy" decoding="async"
              alt="Engraving of a two-drawer card catalogue cabinet with one drawer pulled out, labels A–E, F–K, L–Q and R–Z" />
            <figcaption className={styles.captionOnField}>A card catalogue, from a manual of library classification, 1898.</figcaption>
          </figure>
        </section>

        {/* Where the idea comes from: three real card archives. */}
        <section className={styles.history} id="history" aria-label="Card archives">
          <Archives />
        </section>

        {/* One full-bleed picture as the page's rest. */}
        <figure className={styles.band}>
          <div className={styles.bandFrame}>
            <img src="/variants/with-taste-skill/opus-5.5/v2/drawer-loc-2025.jpg" width={3840} height={2561} loading="lazy" decoding="async" className={styles.bandImg}
              alt="An open wooden catalogue drawer, packed with cream cards; the front card is a printed entry for the Congressional Record" />
          </div>
          <figcaption className={styles.bandCaption}>Serials card catalogue, Library of Congress, January 2025.</figcaption>
        </figure>

        {/* How it works: a first week printed on a slip, with the old way beside it. */}
        <section className={styles.week} id="how" aria-labelledby="v2-week">
          <div className={styles.weekText}>
            <h2 className={styles.h2Dark} id="v2-week" data-reveal style={i(0)}>A week with<br /> Engram</h2>
            <p className={styles.weekLead} data-reveal style={i(1)}>
              Nothing to set up and no method to learn first. This is a first week, day by day, and what you hold at the end of it.
            </p>
            <figure className={styles.film} data-reveal style={i(2)}>
              <video data-loop muted loop playsInline preload="metadata" poster="/variants/with-taste-skill/opus-5.5/v2/film-library-1951-poster.jpg" width={640} height={480} aria-hidden="true" className={styles.filmVideo}>
                <source src="/variants/with-taste-skill/opus-5.5/v2/film-library-1951.webm" type="video/webm" />
                <source src="/variants/with-taste-skill/opus-5.5/v2/film-library-1951.mp4" type="video/mp4" />
              </video>
              <figcaption className={styles.captionDark}>The old way: walking a drawer by hand, from the film Library Organization, 1951.</figcaption>
            </figure>
          </div>

          <div className={styles.slip} data-reveal style={{ ...i(1), ...SLIP_EDGE }}>
            <p className={styles.slipHead}>Engram, first week</p>
            {WEEK.map((d) => (
              <div className={styles.slipDay} key={d.day}>
                <h3 className={styles.slipDayName}>{d.day}</h3>
                <ul className={styles.slipRows}>
                  {d.rows.map(([what, time]) => (
                    <li className={styles.slipRow} key={what}>
                      <span>{what}</span>
                      <span className={styles.slipLeader} aria-hidden="true" />
                      <span className={styles.slipTime}>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className={styles.slipTotal}>
              <span>A drawer that answers back</span>
              <span>7 days</span>
            </p>
          </div>
        </section>

        {/* About: a letter, with a tear-off strip. */}
        <section className={styles.letterField} id="about" aria-labelledby="v2-letter">
          <div className={styles.letter} data-reveal style={i(0)}>
            <h2 className={styles.letterHeading} id="v2-letter">Why we built it</h2>
            <div className={styles.letterSheet}>
              <div className={styles.letterTop}>
                <span className={styles.monogram} aria-hidden="true">IV</span>
                <p className={styles.letterFrom}>From Ines Vandaele, who started Engram</p>
              </div>
              <figure className={styles.letterPlate}>
                <img src="/variants/with-taste-skill/opus-5.5/v2/mundaneum-cabinet.jpg" width={1920} height={2880} loading="lazy" decoding="async"
                  alt="A tall wooden cabinet of small card drawers with brass label holders, in the Mundaneum, Mons" />
                <figcaption className={styles.caption}>Card cabinet, Mundaneum, Mons.</figcaption>
              </figure>
              <p>
                In 2019 I spent an afternoon in the Mundaneum in Mons, in front of drawers Paul Otlet filled with cards a century ago. What stayed with me wasn’t the size of it. It was that every card had been put somewhere on purpose, next to the cards it belonged with.
              </p>
              <p>
                My own notes were the opposite: eleven years of them, in four apps, and I could find almost nothing I hadn’t written that week. The notes weren’t lost. <mark className={styles.marker}>They just never came back.</mark>
              </p>
              <p>
                Engram is the drawer I wanted. You write a card, it is filed beside its neighbours, and when you start writing about the same thing again, the old cards are waiting in the margin. It runs on your computer, the cards are plain files, and nothing you write is sent away to be read.
              </p>
              <p>
                We are a small team, and we charge for sync so that we never need to sell anything else. If something in Engram gets in your way, write to me. I read every email.
              </p>
              <p className={styles.signoff}>Ines Vandaele</p>
              <p className={styles.role}>Founder, Engram</p>
            </div>
            <a className={styles.tearOff} style={STRIP_EDGE} href="mailto:ines@engram.app?subject=About%20Engram">ines@engram.app</a>
          </div>
        </section>

        {/* Pricing: the ticket. */}
        <section className={styles.ticketField} id="pricing" aria-labelledby="v2-price">
          <div className={styles.ticket} data-reveal style={i(0)}>
            <div className={styles.ticketMain}>
              <h2 className={styles.ticketHeading} id="v2-price">What it costs</h2>
              <dl className={styles.ticketLines}>
                <div><dt>Free, forever</dt><dd>One device. Unlimited cards, links, resurfacing, search and import.</dd></div>
                <div><dt>Sync, $6 a month or $60 a year</dt><dd>Every device, end-to-end encrypted, a year of history, 20 GB for attachments.</dd></div>
                <div><dt>Family, $10 a month or $100 a year</dt><dd>Up to five people, each with a private drawer, and one drawer you share.</dd></div>
                <div><dt>Students and teachers</dt><dd>Sync costs nothing with a school email address, for as long as you study or teach.</dd></div>
              </dl>
            </div>
            <div className={styles.ticketStub}>
              <p className={styles.stubPrice}>$0</p>
              <p className={styles.stubNote}>to start, on one device</p>
              <a className={styles.stubAction} href="#download" id="download">Download Engram</a>
              <span className={`${styles.notch} ${styles.notchTop}`} aria-hidden="true" />
              <span className={`${styles.notch} ${styles.notchBottom}`} aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* FAQ: answers as reading text. */}
        <section className={styles.faq} id="questions" aria-labelledby="v2-faq">
          <h2 className={styles.h2} id="v2-faq" data-reveal style={i(0)}>Questions</h2>
          <div className={styles.faqText}>
            {FAQ.map(([q, a], n) => (
              <p className={styles.faqItem} key={q} data-reveal style={i(n % 4)}>
                <strong>{q}</strong> {a}
              </p>
            ))}
          </div>
        </section>
      </main>

      {/* The back of the card: revealed from under the page (curtain footer). */}
      <footer className={styles.footer} aria-labelledby="v2-contact">
        <div className={styles.cardBack}>
          <div className={styles.backTop}>
            <p className={styles.backWordmark}>Engram</p>
            <p className={styles.backNote}>A note-taking app that works as a second brain, for macOS, Windows, Linux, iPhone and Android.</p>
            <p className={styles.backNote}>Write to us about anything. A person answers within a working day.</p>
            <a className={styles.backTopLink} href="#top">Back to the front</a>
          </div>
          <h2 className={styles.srOnly} id="v2-contact">Contact</h2>
          <a className={styles.contact} href="mailto:hello@engram.app">
            <span className={styles.contactLine} data-fit="0.92">hello@engram.app</span>
          </a>
          <a className={`${styles.contact} ${styles.contactPhone}`} href="mailto:hello@engram.app">
            <span className={styles.contactLine} data-fit="0.94">hello</span>
            <span className={styles.contactLine} data-fit="0.94">@engram.app</span>
          </a>
          <div className={styles.backMeta}>
            <p className={styles.backLinks}>
              <a href="#download">Download</a>
              <a href="#pricing">Pricing</a>
              <a href="#questions">Questions</a>
              <a href="mailto:hello@engram.app?subject=Privacy">Privacy</a>
            </p>
            <p className={styles.backYear}>Engram, 2026</p>
          </div>
          <div className={styles.credits}>
            <p className={styles.creditsHead}>Pictures and film, all via Wikimedia Commons:</p>
            <ul className={styles.creditList}>
              <li><a href="https://commons.wikimedia.org/wiki/File:Le_R%C3%A9pertoire_Bibliographique_Universel_vers_1900.jpg">“Le Répertoire Bibliographique Universel vers 1900”</a>, Paul Otlet, public domain</li>
              <li><a href="https://commons.wikimedia.org/wiki/File:Zettelkaesten_et_01.jpg">“Zettelkästen et, Thesaurus linguae Latinae”</a>, Michiel Streijger, <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a></li>
              <li><a href="https://commons.wikimedia.org/wiki/File:Card_Division_of_the_Library_of_Congress_3c18631u_original.jpg">“Card Division of the Library of Congress”</a>, 1900–1920, public domain</li>
              <li><a href="https://commons.wikimedia.org/w/index.php?curid=162151910">“Library of Congress Serials Card Catalog”</a>, Library of Congress Life, <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a></li>
              <li><a href="https://commons.wikimedia.org/wiki/File:Card_catalog_from_page_167_of_%22Manual_of_library_classification_and_shelf_arrangement%22_(1898).jpg">Card catalogue from “Manual of library classification and shelf arrangement”</a>, 1898, Internet Archive Book Images, no known copyright restrictions</li>
              <li><a href="https://commons.wikimedia.org/wiki/File:Fichier_des_autographes_Rothschild._Fichier_des_autographes_Rothschild._Tiroir_4-4_-_btv1b10000503w_(084_of_667).jpg">“Fichier des autographes Rothschild”</a>, Bibliothèque nationale de France, public domain</li>
              <li><a href="https://commons.wikimedia.org/w/index.php?curid=20797362">“Meuble fichier Mundaneum”</a>, Zozormym, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a></li>
              <li>Film: <a href="https://commons.wikimedia.org/wiki/File:0044_Library_Organization_20_11_04_00.webm">“Library Organization”</a>, Coronet Instructional Films, 1951, public domain</li>
            </ul>
          </div>
          <span className={styles.rodHole} aria-hidden="true" />
        </div>
      </footer>

      <PageMotion rootId="v2-root" />
      {/* Gallery copy: the corner iteration switcher is not rendered; the gallery has its own iteration navigation. */}
    </div>
  );
}
