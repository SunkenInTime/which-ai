import type { Metadata } from "next";
import DownloadSentence from "./DownloadSentence";
import FitLine from "./FitLine";
import HeroReel, { type Frame } from "./HeroReel";
import Reveal from "./Reveal";
import VaultSearch from "./VaultSearch";
import s from "./page.module.css";

// Gallery copy: the fonts come from app/fonts.css under "Opus v2" family names (see that file);
// this stands in for the next/font result and sets the same CSS variable.
const newsreader = { variable: "opus-v2-newsreader" };

export const metadata: Metadata = {
  title: "Engram — every note you keep comes back",
  description:
    "Engram is a note-taking app that works as a second brain. Link notes with [[brackets]], and the old ones come back when they matter.",
};

const FRAMES: Frame[] = [
  {
    verb: "wrote",
    source: "Writing with a fountain pen, filmed by Wasiul Bahar, 2022",
    src: "/variants/with-taste-skill/opus-5.5/v3/reel-pen-poster.jpg",
    alt: "A hand writing a word with a fountain pen on white paper.",
    video: { webm: "/variants/with-taste-skill/opus-5.5/v3/reel-pen.webm", mp4: "/variants/with-taste-skill/opus-5.5/v3/reel-pen.mp4" },
  },
  {
    verb: "sketched",
    source: "Charles Darwin, Notebook B, 1837",
    src: "/variants/with-taste-skill/opus-5.5/v3/reel-darwin.jpg",
    alt: "Darwin’s notebook page headed “I think”, with his first sketch of a branching tree of life.",
  },
  {
    verb: "clipped",
    source: "Basilius Besler, Hortus Eystettensis, 1613",
    src: "/variants/with-taste-skill/opus-5.5/v3/reel-besler.jpg",
    alt: "Hand-coloured engraving of blue irises beside white flowers.",
  },
  {
    verb: "photographed",
    source: "Anna Atkins, cyanotype of Ptilota plumosa, about 1850",
    src: "/variants/with-taste-skill/opus-5.5/v3/reel-atkins.jpg",
    alt: "A pale, feathery seaweed printed by sunlight on deep blue paper.",
  },
  {
    verb: "mapped",
    source: "Dutch sea chart of the river at Lisbon, 1600s",
    src: "/variants/with-taste-skill/opus-5.5/v3/reel-lisbon.jpg",
    alt: "An old sea chart of the coast and river mouth at Lisbon, crossed with compass lines.",
  },
];

type Row = {
  title: string;
  text: string;
  src: string;
  alt: string;
  caption: string;
  w: number;
  ratio: string;
  pw: string;
  pj: "start" | "end";
};

const ROWS: Row[] = [
  {
    title: "Write it down in one keystroke",
    text: "⌥ Space opens a blank note over whatever you are doing, on a Mac, Windows or Linux. On a phone it sits in the share sheet. Forward an email to your own address and it arrives as a note.",
    src: "/variants/with-taste-skill/opus-5.5/v3/row-arundel.jpg",
    alt: "Two pages of Leonardo’s notebook, dense with mirror writing and small sketches of machines.",
    caption: "Leonardo da Vinci, Codex Arundel, about 1478–1518",
    w: 440,
    ratio: "3 / 2",
    pw: "100%",
    pj: "start",
  },
  {
    title: "Link with two brackets",
    text: "Type [[ and pick a note to link it. Every note lists what links back to it, and the notes that mention it without a link, so the connections you never made still show.",
    src: "/variants/with-taste-skill/opus-5.5/v3/row-jamieson.jpg",
    alt: "A star chart of the northern sky with the constellations drawn as figures.",
    caption: "Alexander Jamieson, Celestial Atlas, plate 1, 1822",
    w: 320,
    ratio: "4 / 5",
    pw: "70%",
    pj: "end",
  },
  {
    title: "Old notes come back on their own",
    text: "While you write, up to five older notes appear in the margin, matched by meaning. At seven each morning, Engram brings back what you wrote a week, a month and a year ago.",
    src: "/variants/with-taste-skill/opus-5.5/v3/row-fern.jpg",
    alt: "A fern frond pressed flat on a white herbarium sheet.",
    caption: "Saccoloma inaequale, pressed for the Intermountain Herbarium",
    w: 280,
    ratio: "1 / 1",
    pw: "55%",
    pj: "start",
  },
  {
    title: "It reads your photos and PDFs",
    text: "Words in scans, screenshots, receipts and photographed whiteboards are recognised on the device, so a search finds the word inside the picture.",
    src: "/variants/with-taste-skill/opus-5.5/v3/row-hellebore.jpg",
    alt: "A woodcut of a hellebore plant above its printed German name and description.",
    caption: "Hans Weiditz, hellebore from a herbal, 1532",
    w: 360,
    ratio: "4 / 5",
    pw: "100%",
    pj: "start",
  },
  {
    title: "Your notes are plain files",
    text: "Every note is a Markdown file in a folder on your own disk. Any text editor opens it. It works offline, syncs end-to-end encrypted, and leaving means copying a folder.",
    src: "/variants/with-taste-skill/opus-5.5/v3/row-newton.jpg",
    alt: "A handwritten page in Latin and Greek from Isaac Newton’s student notebook.",
    caption: "Isaac Newton’s student notebook, about 1661–65",
    w: 400,
    ratio: "3 / 2",
    pw: "70%",
    pj: "end",
  },
];

const STAGES = [
  { time: "Two seconds", clause: "First, press ⌥ Space and write the thought down.", grow: 14, tone: "segOne" },
  { time: "A few keystrokes", clause: "Then link it to what it is about with [[.", grow: 14, tone: "segTwo" },
  { time: "Weeks, months, years", clause: "Meanwhile, forget it. Engram holds it on your disk, indexed.", grow: 52, tone: "segThree" },
  { time: "The moment it matters", clause: "Last, it comes back: in the margin, or at seven one morning.", grow: 20, tone: "segFour" },
] as const;

const FAQ = [
  {
    q: "Where do my notes live?",
    a: "In a folder on your own disk, as plain Markdown files, one per note. With Sync, an encrypted copy goes to our servers so your other devices can fetch it. We hold the files but not the key, so we cannot read them.",
  },
  {
    q: "How does it find old notes without reading them?",
    a: "A small model, about 80 MB, runs on your device and indexes your notes there. Nothing is sent away to be read, and resurfacing works on a plane.",
  },
  {
    q: "Can I bring my notes from Notion or Evernote?",
    a: "Yes. Engram imports Apple Notes, Evernote (.enex), Notion exports, Obsidian vaults and any folder of Markdown, and keeps links and attachments where the source has them.",
  },
  {
    q: "What happens to my notes if Engram shuts down?",
    a: "You keep them: they are files in a folder you own. The free app never needs our servers, so it carries on working.",
  },
  {
    q: "Is there a web version?",
    a: "Not yet. Engram runs on macOS, Windows, Linux, iPhone, iPad and Android. To share something, publish a single note as a web page.",
  },
  {
    q: "Can I share notes with someone?",
    a: "Publish one note as a web page, or, on the Family plan, keep a shared vault beside each person’s private one.",
  },
  {
    q: "Is it free for students?",
    a: "Sync is free for students and teachers with a school email address. Everything else is free for everyone, on one device, for as long as you like.",
  },
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Page() {
  return (
    <div className={`${s.page} ${newsreader.variable}`}>
      <HeroReel frames={FRAMES} />

      <section className={s.showcase} id="search" aria-labelledby="search-title">
        <div className={`${s.wrap} ${s.grid}`}>
          <div className={s.showcaseHead}>
            <h2 className={s.sectionHeading} id="search-title" data-reveal>
              Search by what you meant
            </h2>
            <p className={s.sectionIntro} data-reveal style={d(80)}>
              Engram reads your notes on your own device, so the right one turns up even when you have forgotten every
              word in it. Try it on fourteen sample notes.
            </p>
          </div>
          <VaultSearch initial="why do I forget what I read" />
        </div>
      </section>

      <div className={s.paper}>
        <section className={`${s.features} ${s.wrap}`} id="features" aria-labelledby="features-title">
          <div className={s.grid}>
            <h2 className={`${s.sectionHeading} ${s.featuresHead}`} id="features-title" data-reveal>
              What it does for you
            </h2>
          </div>
          <ol className={s.rows}>
            {ROWS.map((r) => (
              <li className={s.row} key={r.title}>
                <div className={s.rowText}>
                  <h3 className={s.rowTitle} data-reveal>
                    {r.title}
                  </h3>
                  <p data-reveal style={d(80)}>
                    {r.text}
                  </p>
                </div>
                <figure
                  className={s.rowFigure}
                  data-reveal
                  style={
                    {
                      "--d": "160ms",
                      "--w": `${r.w}px`,
                      "--ratio": r.ratio,
                      "--pw": r.pw,
                      "--pj": r.pj,
                    } as React.CSSProperties
                  }
                >
                  <div className={s.rowFrame}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.src} alt={r.alt} width={r.ratio === "3 / 2" ? 960 : 640} height={r.ratio === "1 / 1" ? 640 : r.ratio === "3 / 2" ? 640 : 800} loading="lazy" decoding="async" />
                  </div>
                  <figcaption className={s.caption}>{r.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${s.how} ${s.wrap}`} id="how" aria-labelledby="how-title">
          <h2 className={s.howHeading} id="how-title" data-reveal>
            Your part takes seconds
          </h2>
          <div className={s.bar} data-ui role="list" aria-label="How long each stage takes">
            {STAGES.map((st, i) => (
              <div
                key={st.time}
                role="listitem"
                className={`${s.segment} ${s[st.tone]}`}
                data-grow
                style={{ "--grow": st.grow, "--d": `${i * 90}ms` } as React.CSSProperties}
              >
                {st.time}
                <span className={s.segClause}>{st.clause}</span>
              </div>
            ))}
          </div>
          <ol className={s.clauses} aria-hidden="true">
            {STAGES.map((st, i) => (
              <li key={st.time} style={{ "--grow": st.grow } as React.CSSProperties} data-reveal>
                <span style={d(200 + i * 80)}>{st.clause}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className={`${s.about} ${s.wrap}`} id="name" aria-labelledby="name-title">
        <div className={s.grid}>
          <h2 className={`${s.sectionHeading} ${s.aboutHead}`} id="name-title" data-reveal>
            Why it’s called Engram
          </h2>
          <dl className={s.facts} data-reveal style={d(80)}>
            <div>
              <dt>Coined</dt>
              <dd>1904, by Richard Semon</dd>
            </div>
            <div>
              <dt>Kept</dt>
              <dd>On your disk, as Markdown</dd>
            </div>
            <div>
              <dt>Write to</dt>
              <dd>
                <a href="mailto:hello@engram.app">hello@engram.app</a>
              </dd>
            </div>
          </dl>
          <div className={s.aboutText} data-reveal style={d(140)}>
            <p>
              <span className={s.portrait}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/variants/with-taste-skill/opus-5.5/v3/semon.jpg"
                  alt="Portrait photograph of Richard Semon, a man with a heavy moustache, in a dark suit."
                  width={480}
                  height={480}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              Richard Semon, a German zoologist, gave the name engram in 1904 to the trace an experience leaves in the
              brain: the physical stuff a memory is made of. Karl Lashley spent thirty years looking for one and never
              found it. We borrowed the word for something plainer, a trace you can open, search and link, kept in a
              folder on your own computer.
            </p>
            <p>
              Engram makes its money from Sync, not from your notes. There are no ads, and nothing you write is used to
              train anything.
            </p>
          </div>
        </div>
      </section>

      <div className={s.paper}>
        <section className={`${s.pricing} ${s.wrap}`} id="pricing" aria-labelledby="pricing-title">
          {/* Gallery copy: the explicit {" "} keeps the space before "a month", which the gallery's compiler drops when JSX text starts with a space and holds &nbsp;. */}
          <h2 className={s.priceLine} id="pricing-title" data-reveal>
            Every device for <span className={s.priceTag}>$6</span>{" "}a&nbsp;month
          </h2>
          <div className={s.priceFoot}>
            <p data-reveal style={d(90)}>
              Engram is free forever on one device, with every feature except sync. Sync adds end-to-end encrypted
              copies on all your devices, a year of version history and 20 GB for attachments. It is $60 if you pay for
              the year.
            </p>
            <div className={s.priceAction} data-reveal style={d(170)}>
              <a className={s.button} href="#download">
                Download Engram
              </a>
              <ul className={s.otherPlans}>
                <li>
                  <a href="mailto:hello@engram.app?subject=Engram%20Family">Family: $10 a month for five people</a>
                </li>
                <li>
                  <a href="mailto:hello@engram.app?subject=Engram%20for%20students">
                    Students and teachers: Sync is free
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={`${s.faq} ${s.wrap}`} id="questions" aria-labelledby="questions-title">
          <div className={s.faqList}>
            <div className={s.faqRow}>
              <h2 className={s.faqHeading} id="questions-title" data-reveal>
                Questions
              </h2>
            </div>
            {FAQ.map((f) => (
              <div className={s.faqRow} key={f.q}>
                <h3 className={s.faqQ} data-reveal>
                  {f.q}
                </h3>
                <p className={s.faqA} data-reveal style={d(90)}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className={`${s.cta} ${s.wrap}`} id="download">
        <DownloadSentence />
      </section>

      <footer className={`${s.footer} ${s.wrap}`}>
        <div className={s.footerTop}>
          <div className={s.footerNotes}>
            <p className={s.footerMark}>Engram</p>
            <p>A note-taking app that works as a second brain. Free on one device; Sync is $6 a month.</p>
            <p>For macOS, Windows, Linux, iPhone, iPad and Android.</p>
          </div>
          <a className={s.backTop} href="#top">
            Back to top
          </a>
        </div>
        <div className={s.footerMain}>
          <FitLine className={s.contactLine} guess="13.2vw">
            <a href="mailto:hello@engram.app">hello@engram.app</a>
          </FitLine>
          <div className={s.footerMeta}>
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#questions">Questions</a>
              </li>
              <li>
                <a href="mailto:hello@engram.app?subject=Privacy">Privacy</a>
              </li>
            </ul>
            <p className={s.credits}>
              Pictures:{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Writing_with_fountain_pen.mpg">Writing with fountain pen</a>{" "}
              by Wasiul Bahar, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>;{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Darwin_Tree_1837.png">Darwin Tree 1837</a>, Charles Darwin;{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Hortus_Eystettensis_vol1_page_260.jpg">Hortus Eystettensis</a>,
              Basilius Besler;{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Ptilota_plumosa,_RP-F-2016-133-256.jpg">Ptilota plumosa</a>,
              Anna Atkins, Rijksmuseum, CC0;{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Zeecaart_van_de_Rivier_van_Lisbon_en_de_bancken_voor_St._Uves_-_btv1b53056729b.jpg">
                Zeecaart van de Rivier van Lisbon
              </a>
              , BnF;{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Codex_Arundel_263_ff.174v-175r.jpg">Codex Arundel</a>,
              Leonardo da Vinci;{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Alexander_Jamieson_Celestial_Atlas-Plate_1.jpg">Celestial Atlas, plate 1</a>,
              Alexander Jamieson;{" "}
              <a href="https://commons.wikimedia.org/w/index.php?curid=42813398">Saccoloma inaequale</a>, Intermountain
              Herbarium, CC0;{" "}
              <a href="https://www.artic.edu/artworks/132241">Christwurz (Hellebore)</a>, Hans Weiditz, Art Institute of
              Chicago, CC0;{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Newton-Organon.jpg">Newton’s Organon notebook</a>, Cambridge
              Digital Library;{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Richard_Semon_(cropped).jpg">Richard Semon</a>, photographer
              unknown. All public domain unless marked, via Wikimedia Commons.
            </p>
            <p className={s.right}>© 2026 Engram</p>
          </div>
        </div>
      </footer>

      <Reveal />
      {/* Gallery copy: the corner iteration switcher is not rendered; the gallery has its own iteration navigation. */}
    </div>
  );
}
