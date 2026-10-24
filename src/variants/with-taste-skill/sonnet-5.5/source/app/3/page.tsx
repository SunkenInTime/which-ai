import Image from "next/image";
import {
  FAQ,
  PLANS,
  PRODUCT,
} from "../_shared/facts";
import { POINTS } from "./_data";
import { Curve } from "./_components/Curve";
import { FigureLive } from "./_components/FigureLive";
import {
  CaptureCall,
  LinkCall,
  PANEL_ROWS,
  PanelCell,
  PickerResponse,
  ResurfaceCall,
  ResurfaceResponse,
  SavedResponse,
} from "./_components/Fragments";
import { Motion } from "./_components/Motion";
import { Roll } from "./_components/Roll";
import styles from "./p3.module.css";
import ui from "./ui.module.css";

const LINKS = [
  { href: "#findings", text: "Findings" },
  { href: "#figure", text: "The figure" },
  { href: "#how", text: "How it works" },
  { href: "#plans", text: "Pricing" },
  { href: "#questions", text: "Questions" },
];

const SYLLABLES = [
  "DAX", "BOK", "ZUP", "LAN", "WID",
  "ZOF", "KEB", "MUR", "NUS", "TAF",
  "GEB", "PUV", "HOZ", "YAT", "CIL",
  "JEM", "VOR", "FUV", "QUP", "RAK",
  "SIK", "TOZ", "NEP", "LUK", "BIX",
];

const signUp = `mailto:${PRODUCT.contactEmail}?subject=${encodeURIComponent(
  "Start free with Engram",
)}&body=${encodeURIComponent(
  "Hello, I would like to start free with Engram.\n\nMy computer or phone:\n",
)}`;

const NOTES_L = [
  {
    row: 0,
    name: "A file you own",
    text: "Every note is a Markdown file in a folder on your disk. Open that folder in any other editor.",
  },
  {
    row: 2,
    name: "Suggestions you can refuse",
    text: "While you write, Engram suggests notes to link. You accept or ignore. Nothing is linked without you.",
  },
  {
    row: 4,
    name: "It comes back",
    text: "After 1, 3, 7, 21 and 60 days, unless you opened it since. Five notes a day at most.",
  },
];
const NOTES_R = [
  {
    row: 1,
    name: "Double brackets",
    text: "Type [[ and pick a note. The link works in both directions.",
  },
  {
    row: 3,
    name: "Backlinks",
    text: "Open a note and see every note that points to it, right under it.",
  },
  {
    row: 5,
    name: "Ask your notes",
    text: "Answers in sentences, with the notes it drew on as footnotes. If your notes don’t say, it says so.",
  },
];

const COMPARE = [
  ["Notes, links and the map", "Unlimited", "Unlimited"],
  ["Devices", "One", "All of yours, synced"],
  ["Search", "By keyword, on your device", "By meaning, on your device"],
  ["Ask your notes, with sources", "Not included", "Included"],
  ["Resurface", "Not included", "Days 1, 3, 7, 21 and 60"],
  ["Web clipper and email capture", "Not included", "Included"],
  ["Attachments", "On your own disk", "50 GB"],
  ["Version history", "Not included", "30 days"],
  ["Your notes as files", "Markdown, always", "Markdown, always"],
] as const;

export default function Page() {
  return (
    <main className={styles.page}>
      <Motion />

      {/* ───────── Cover: the two-by-two board ───────── */}
      <header className={styles.hero}>
        <nav className={styles.nav} aria-label="Sections">
          <a className={styles.mark} href="#top" aria-label="Engram, back to top">
            E
          </a>
          <ul className={styles.navLinks}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.text}</a>
              </li>
            ))}
          </ul>
          <details className={styles.menu}>
            <summary>Menu</summary>
            <ul>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.text}</a>
                </li>
              ))}
            </ul>
          </details>
          <a className={styles.navAction} href={PRODUCT.primaryHref}>
            {PRODUCT.primaryAction}
          </a>
        </nav>

        <div className={styles.board} id="top">
          <div className={styles.tName}>
            <h1 className={styles.name}>
              <span className={styles.nameMask}>
                <span data-line>Engram</span>
              </span>
            </h1>
            <p className={styles.lead} data-load style={{ ["--d" as string]: "420ms" }}>
              A second brain for your notes: it links what you capture and
              brings it back before you forget it.
            </p>
            <a
              className={`${styles.btn} ${styles.heroBtn}`}
              href={PRODUCT.primaryHref}
              data-load
              style={{ ["--d"as string]: "480ms" }}
            >
              {PRODUCT.primaryAction}
            </a>
          </div>

          <figure className={styles.tFigure} data-draw-group>
            <Curve
              variant="cover"
              height={300}
              label="Chart of Ebbinghaus's 1885 savings by delay: 58 per cent after 20 minutes, 44 after an hour, 36 after 9 hours, 34 after a day, 28 after 2 days, 25 after 6 days and 21 after 31 days."
            />
            <figcaption className={styles.capLight}>
              Effort saved on relearning a list, by delay. Hermann Ebbinghaus,
              on himself, 1885.
            </figcaption>
          </figure>

          <figure className={`${styles.tPortrait} ${styles.shutter}`} data-open>
            <div className={styles.clip}>
            <Image
              src="/variants/with-taste-skill/sonnet-5.5/p3/ebbinghaus-portrait.jpg"
              alt="Hermann Ebbinghaus, a bearded man in a pince-nez and dark coat, photographed around 1909"
              width={990}
              height={1510}
              sizes="(max-width: 760px) 100vw, 50vw"
              priority
              className={styles.photo}
              unoptimized
            />
            </div>
            <figcaption className={styles.capTab}>
              Hermann Ebbinghaus, 1850–1909
            </figcaption>
          </figure>

          <div className={styles.tClaim} data-load style={{ ["--d"as string]: "520ms" }}>
            <p>
              Hermann Ebbinghaus measured how fast we forget. More than half
              was gone within the hour.
            </p>
            <p className={styles.tileFig}>1885</p>
          </div>
          <div className={styles.tAccent} data-load style={{ ["--d"as string]: "600ms" }}>
            <p>Engram brings a note back on these days.</p>
            <p className={styles.tileFig} aria-label="Days 1, 3, 7, 21 and 60">
              <span>1</span>
              <span>3</span>
              <span>7</span>
              <span>21</span>
              <span>60</span>
            </p>
          </div>
        </div>
      </header>

      {/* ───────── Findings: a column of figures on the decimal ───────── */}
      <section className={`${styles.sec} ${styles.stats}`} id="findings" aria-labelledby="findings-h">
        <div className={styles.statsLeft}>
          <h2 id="findings-h" className={styles.h2} data-reveal>
            More than half is gone in an hour.
          </h2>
          <p className={styles.note} data-reveal style={{ ["--d"as string]: "60ms" }}>
            Ebbinghaus tested only himself, with about 2,300 nonsense syllables
            such as DAX and ZUP, so that meaning could not help him. Each figure
            is a saving: the share of the first effort he did not have to spend
            again when he relearned the list.
          </p>
          <figure className={`${styles.plate} ${styles.multiply}`} data-reveal style={{ ["--d"as string]: "120ms" }}>
            <Image
              src="/variants/with-taste-skill/sonnet-5.5/p3/ebbinghaus-fig2.png"
              alt="A line chart from Ebbinghaus's book: a rising and falling line plotted over eight numbered series"
              width={1400}
              height={961}
              sizes="(max-width: 760px) 100vw, 40vw"
              className={styles.plateImg}
              unoptimized
            />
            <figcaption className={styles.cap}>
              A figure from <i>Über das Gedächtnis</i>, 1885, drawn by Ebbinghaus.
            </figcaption>
          </figure>
        </div>

        <div className={styles.ledgerWrap}>
          <p className={styles.ledgerTitle} data-reveal>
            Effort saved, in per cent, after relearning a list
          </p>
          <ol className={styles.ledger} data-bars>
            {POINTS.map((p, i) => (
              <li key={p.label} className={styles.ledgerRow}>
                <span className={styles.ledgerFig}>
                  <Roll value={String(p.pct)} delay={i} />
                </span>
                <span className={styles.ledgerCap}>after {p.label}</span>
                <span className={styles.ledgerBar} aria-hidden="true">
                  <span style={{ ["--w"as string]: `${(p.pct / 60) * 100}%`, ["--ri"as string]: i }} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── The figure: the whole page in yellow ───────── */}
      <section className={`${styles.sec} ${styles.figure}`} id="figure" aria-labelledby="figure-h">
        <FigureLive />
      </section>

      {/* ───────── How it works: what you give, what comes back ───────── */}
      <section className={`${styles.sec} ${styles.how}`} id="how" aria-labelledby="how-h">
        <div className={styles.howHead}>
          <h2 id="how-h" className={styles.h2} data-reveal>
            Give it a thought, get it back.
          </h2>
        </div>

        <div className={styles.exchange}>
          <div className={styles.call}>
            <p className={styles.step} data-reveal>First, write it down.</p>
            <div data-reveal style={{ ["--d"as string]: "60ms" }}><CaptureCall /></div>
          </div>
          <div className={styles.response} data-reveal style={{ ["--d"as string]: "120ms" }}>
            <SavedResponse />
            <p className={styles.cap}>
              Saved as a file, and offered two links. Nothing is linked without you.
            </p>
          </div>
        </div>

        <div className={styles.exchange}>
          <div className={styles.call}>
            <p className={styles.step} data-reveal>Then link it to what you know.</p>
            <div data-reveal style={{ ["--d"as string]: "60ms" }}><LinkCall /></div>
          </div>
          <div className={styles.response} data-reveal style={{ ["--d"as string]: "120ms" }}>
            <PickerResponse />
            <p className={styles.cap}>
              The link works both ways: the other note now shows this one.
            </p>
          </div>
        </div>

        <div className={styles.exchange}>
          <div className={styles.call}>
            <p className={styles.step} data-reveal>Then let it go.</p>
            <div data-reveal style={{ ["--d"as string]: "60ms" }}><ResurfaceCall /></div>
          </div>
          <div className={`${styles.response} ${styles.responseWide}`} data-reveal style={{ ["--d"as string]: "120ms" }}>
            <ResurfaceResponse />
            <p className={styles.cap}>
              Days later, the notes you have not touched come back, a few at a time.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Measured on one man: a gutterless mosaic ───────── */}
      <section className={styles.mosaic} id="name" aria-labelledby="name-h">
        <figure className={`${styles.mCell} ${styles.mChrono} ${styles.shutter}`} data-open>
          <div className={styles.clip}>
          <Image
            src="/variants/with-taste-skill/sonnet-5.5/p3/hipp-chronoscope-dials.jpg"
            alt="The two brass dials of a Hipp chronoscope under a glass dome, with their fine engraved scales"
            width={1600}
            height={1067}
            sizes="(max-width: 760px) 100vw, 33vw"
            className={styles.photo}
            unoptimized
            loading="eager"
          />
          </div>
          <figcaption className={styles.capTab}>
            Hipp chronoscope, about 1890: a clockwork timer for mental reactions
          </figcaption>
        </figure>

        <div className={`${styles.mCell} ${styles.mText}`}>
          <h2 id="name-h" className={styles.h2} data-reveal>
            The curve is older than the word.
          </h2>
          <p className={styles.body} data-reveal style={{ ["--d"as string]: "60ms" }}>
            Richard Semon coined “engram” in 1904 for the trace a memory leaves
            behind. Nineteen years earlier, Ebbinghaus had measured how fast
            that trace fades, alone, with about 2,300 nonsense syllables. The
            product is named for the trace. Its schedule is built against the
            fade.
          </p>
        </div>

        <figure className={`${styles.mCell} ${styles.mKymo} ${styles.shutter}`} data-open>
          <div className={styles.clip}>
          <Image
            src="/variants/with-taste-skill/sonnet-5.5/p3/kymograph.jpg"
            alt="A brass kymograph on a wooden base: a rotating drum with a stylus arm and clockwork behind it"
            width={1200}
            height={1717}
            sizes="(max-width: 760px) 100vw, 25vw"
            className={styles.photo}
            unoptimized
            loading="eager"
          />
          </div>
          <figcaption className={styles.capTab}>
            Kymograph, 1880–1930: a drum on which a stylus draws a curve
          </figcaption>
        </figure>

        <figure className={`${styles.mCell} ${styles.mColumn} ${styles.shutter}`} data-open>
          <div className={styles.clip}>
          <Image
            src="/variants/with-taste-skill/sonnet-5.5/p3/hipp-chronoscope-column.jpg"
            alt="The whole Hipp chronoscope: a glass dome on four turned columns, with two weights hanging on chains below the clockwork"
            width={1100}
            height={1650}
            sizes="(max-width: 900px) 100vw, 29vw"
            className={styles.photo}
            unoptimized
            loading="eager"
          />
          </div>
          <figcaption className={styles.capTab}>
            The same chronoscope, driven by hanging weights
          </figcaption>
        </figure>

        <div className={`${styles.mCell} ${styles.mSyll}`}>
          <ul className={styles.syllables} aria-label="Nonsense syllables of the kind Ebbinghaus used">
            {SYLLABLES.slice(0, 24).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className={styles.capInk}>
            Syllables of his kind: consonant, vowel, consonant, so that meaning
            could not help.
          </p>
        </div>
      </section>

      {/* ───────── Inside one note: a plate with margin notes ───────── */}
      <section className={`${styles.sec} ${styles.features}`} id="inside" aria-labelledby="inside-h">
        <h2 id="inside-h" className={styles.h2} data-reveal>
          Inside one note.
        </h2>
        <div className={styles.plateGrid}>
          {PANEL_ROWS.map((row, i) => {
            const left = NOTES_L.find((n) => n.row === i);
            const right = NOTES_R.find((n) => n.row === i);
            const n = left ?? right!;
            return (
              <div className={styles.plateRow} key={row} data-n={i} style={{ ["--ri"as string]: i }}>
                {left ? (
                  <div className={`${styles.marginNote} ${styles.noteLeft}`} tabIndex={0} data-reveal data-n={i}>
                    <h3 className={styles.noteName}>{left.name}</h3>
                    <p>{left.text}</p>
                  </div>
                ) : (
                  <span className={styles.noteGap} />
                )}
                <div className={`${styles.cell} ${ui.cell}`} data-ui data-n={i} role="group" aria-label={n.name}>
                  <PanelCell row={row} />
                </div>
                {right ? (
                  <div className={`${styles.marginNote} ${styles.noteRight}`} tabIndex={0} data-reveal data-n={i}>
                    <h3 className={styles.noteName}>{right.name}</h3>
                    <p>{right.text}</p>
                  </div>
                ) : (
                  <span className={styles.noteGap} />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────── Pricing: plans as a large table ───────── */}
      <section className={`${styles.sec} ${styles.plans}`} id="plans" aria-labelledby="plans-h">
        <div className={styles.tableOnly}>
          <table className={styles.table} data-reveal>
            <colgroup>
              <col className={styles.colItem} />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className={styles.tHead}>
                  <h2 id="plans-h" className={styles.h2}>
                    What it costs.
                  </h2>
                </th>
                <th scope="col" className={styles.tPlan}>
                  <span className={styles.planName}>{PLANS.free.name}</span>
                  <span className={styles.planPrice}>$0</span>
                  <span className={styles.planPer}>for as long as you like</span>
                </th>
                <th scope="col" className={`${styles.tPlan} ${styles.pick}`}>
                  <span className={styles.planName}>{PLANS.plus.name}</span>
                  <span className={styles.planPrice}>${PLANS.plus.pricePerMonthBilledYearly}</span>
                  <span className={styles.planPer}>
                    a month, billed yearly (${PLANS.plus.pricePerYear}). ${PLANS.plus.pricePerMonthBilledMonthly} if billed monthly.
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([item, free, plus]) => (
                <tr key={item}>
                  <th scope="row">{item}</th>
                  <td>{free}</td>
                  <td className={styles.pick}>{plus}</td>
                </tr>
              ))}
              <tr className={styles.buttons}>
                <td />
                <td>
                  <a className={styles.btn} href={PRODUCT.primaryHref}>{PRODUCT.primaryAction}</a>
                </td>
                <td className={styles.pick}>
                  <a className={`${styles.btn} ${styles.btnInk}`} href={PRODUCT.primaryHref}>{PRODUCT.primaryAction}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.planBlocks}>
          <h2 className={styles.h2} id="plans-h-phone">What it costs.</h2>
          {[
            { key: "free", name: PLANS.free.name, price: "$0", per: "for as long as you like", idx: 1, pick: false, foot: "Stays free on one device." },
            {
              key: "plus",
              name: PLANS.plus.name,
              price: `$${PLANS.plus.pricePerMonthBilledYearly}`,
              per: `a month, billed yearly ($${PLANS.plus.pricePerYear}). $${PLANS.plus.pricePerMonthBilledMonthly} if billed monthly.`,
              idx: 2,
              pick: true,
              foot: "Starts with 30 days of Plus. No card.",
            },
          ].map((p) => (
            <article key={p.key} className={`${styles.planBlock} ${p.pick ? styles.pickBlock : ""}`}>
              <h3 className={styles.planName}>{p.name}</h3>
              <p className={styles.planPrice}>{p.price}</p>
              <p className={styles.planPer}>{p.per}</p>
              <dl>
                {COMPARE.map((row) => (
                  <div key={row[0]}>
                    <dt>{row[0]}</dt>
                    <dd>{row[p.idx]}</dd>
                  </div>
                ))}
              </dl>
              <a className={`${styles.btn} ${p.pick ? styles.btnInk : ""}`} href={PRODUCT.primaryHref}>
                {PRODUCT.primaryAction}
              </a>
              <p className={styles.cap}>{p.foot}</p>
            </article>
          ))}
        </div>
        <p className={styles.planNote} data-reveal>
          {PLANS.trial}
        </p>
      </section>

      {/* ───────── Questions: a band for each ───────── */}
      <section className={styles.faq} id="questions" aria-labelledby="questions-h">
        <div className={styles.faqHead}>
          <h2 id="questions-h" className={styles.h2Big}>
            Questions
          </h2>
        </div>
        {FAQ.slice(0, 7).map((f, i) => (
          <article key={f.q} className={`${styles.band} ${i % 2 ? styles.bandB : styles.bandA}`}>
            <h3 className={styles.q}>{f.q}</h3>
            <p className={styles.a}>{f.a}</p>
          </article>
        ))}
      </section>

      {/* ───────── Close: the idea again, inverted ───────── */}
      <section className={styles.cta} id="start" aria-labelledby="start-h">
        <h2 id="start-h" className={styles.ctaHead}>
          <span className={styles.nameMask} data-reveal><span>Start before</span></span>
          <span className={styles.nameMask} data-reveal style={{ ["--d"as string]: "70ms" }}><span>you forget.</span></span>
        </h2>
        <p className={styles.ctaLine} data-reveal style={{ ["--d"as string]: "140ms" }}>
          Free on one device for as long as you like. {PLANS.trial}
        </p>
        <a className={`${styles.btn} ${styles.btnAccent} ${styles.ctaBtn}`} href={signUp} data-reveal style={{ ["--d"as string]: "180ms" }}>
          {PRODUCT.primaryAction}
        </a>
      </section>

      {/* ───────── Footer: the name first ───────── */}
      <footer className={styles.footer} id="download">
        <p className={styles.wordmark} aria-label="Engram">
          <span aria-hidden="true">Engram</span>
        </p>
        <div className={styles.footRow}>
          <ul className={styles.places}>
            <li><a href={`mailto:${PRODUCT.contactEmail}`}>{PRODUCT.contactEmail}</a></li>
            <li><a href="#download">Download for Mac</a></li>
            <li><a href="#download">Download for Windows</a></li>
            <li><a href="#download">Download for Linux</a></li>
            <li><a href="#download">iPhone, iPad, Android</a></li>
            <li><a href="#download">Open on the web</a></li>
          </ul>
          <div className={styles.footLinks}>
            <ul>
              <li><a href="#findings">Findings</a></li>
              <li><a href="#figure">The figure</a></li>
              <li><a href="#how">How it works</a></li>
            </ul>
            <ul>
              <li><a href="#inside">Inside a note</a></li>
              <li><a href="#plans">Pricing</a></li>
              <li><a href="#questions">Questions</a></li>
            </ul>
            <ul>
              <li><a href="#start">Start free</a></li>
              <li><a href={`mailto:${PRODUCT.contactEmail}`}>Write to us</a></li>
              <li><a href="#top">Back to top</a></li>
            </ul>
          </div>
        </div>
        <p className={styles.credits}>
          Pictures: Hermann Ebbinghaus, portrait from{" "}
          <i>Zeitschrift für Psychologie</i>, 1909, Wellcome Collection,{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Zeitschrift_fur_Psychologie,_1909;_Herman_Ebbinghaus._Wellcome_L0003734.jpg">CC BY 4.0</a>
          . Kymograph, Europe, 1880–1930, Wellcome Collection,{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Kymograph,_cased,_Europe,_1880-1930._Full_view,_graduated_ma_Wellcome_L0057894.jpg">CC BY 4.0</a>
          . Hipp chronoscope (two views) by Daderot,{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Hipp_Chronoscope,_c._1890,_view_2_-_Museum_of_Science_and_Industry_(Chicago)_-_DSC06508.JPG">CC0</a>
          . Figure 2 from Ebbinghaus, <i>Über das Gedächtnis</i> (1885),{" "}
          <a href="https://commons.wikimedia.org/wiki/File:%C3%9Cber_das_Ged%C3%A4chtnis._Untersuchungen_zur_experimentellen_Psychologie,_Fig_2.png">public domain</a>
          , all via Wikimedia Commons. Portrait and kymograph cropped and set in greyscale.
        </p>
        <p className={styles.legal}>© 2026 Engram</p>
      </footer>
    </main>
  );
}
