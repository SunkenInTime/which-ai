/* eslint-disable @next/next/no-img-element -- found pictures are pre-sized files in public/v4 */
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { pilcrow } from "./fonts";
import { ENGRAM_TEETH, sawtooth, tooth } from "./motif";
import Mark from "./Mark";
import ResurfaceShowcase from "./ResurfaceShowcase";
import FaqCards from "./FaqCards";
import FitWord from "./FitWord";
import Motion from "./Motion";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Engram — notes that come back",
  description:
    "Engram is a note-taking app that works as a second brain: link notes with [[brackets]] and the old ones come back in the margin just before you would forget them.",
};

const DOWNLOAD = "#download";
const MAILTO =
  "mailto:hello@engram.app?subject=Send%20me%20Engram&body=Hello%2C%20please%20send%20me%20the%20Engram%20download%20for%20my%20computer%20and%20phone.";

// The hero mass: Engram's curve, Ebbinghaus's fall lifted back up by each return.
const HERO_SHAPE = sawtooth(ENGRAM_TEETH, { top: 0, depth: 100 });
// The full-width picture band and the closing band take the same curve on their top edge.
const BAND_EDGE = sawtooth(ENGRAM_TEETH, { top: 0, depth: 26 });
const CTA_EDGE = tooth(22, 24, 0.35);
const BUTTON = tooth(34, 12, 0.3);
const MASK = tooth(24, 18, 0.3);
const BULLET = tooth(58, 8, 0.3);

const shape = (clip: string): CSSProperties => ({ clipPath: clip });

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    lines: ["One device", "Unlimited notes and links", "Resurfacing and search", "Import from anywhere"],
    action: "Start free",
    tone: s.planFree,
  },
  {
    name: "Sync",
    price: "$6",
    period: "a month, or $60 a year",
    lines: [
      "Every device you own",
      "End-to-end encrypted sync",
      "A year of version history",
      "20 GB for attachments",
      "Free for students and teachers",
    ],
    action: "Choose Sync",
    tone: s.planSync,
  },
  {
    name: "Family",
    price: "$10",
    period: "a month, or $100 a year",
    lines: [
      "Up to five people",
      "A private vault each",
      "One shared vault for the house",
      "Everything in Sync",
      "One bill, cancel any month",
    ],
    action: "Choose Family",
    tone: s.planFamily,
  },
];

// Under each tooth of the band's curve, one drawing of where memory is made and kept.
const BAND = [
  {
    src: "/variants/with-taste-skill/opus-5.5/v4/celula-gigante-de-la-porcion-inferior-del.jpg",
    width: 1200,
    height: 1609,
    grow: 30,
    position: "50% 30%",
    view: "inset(4% 0% 12% 0%)",
    alt: "Ink drawing of a single nerve cell from the hippocampus, its branches spreading upward like a tree",
    caption: "A cell of the hippocampus, where new memories are made. Santiago Ramón y Cajal.",
  },
  {
    src: "/variants/with-taste-skill/opus-5.5/v4/santiago-ramon-y-cajal-nerve-cells-in.jpg",
    width: 1600,
    height: 1057,
    grow: 32,
    position: "38% 40%",
    view: "inset(0% 9% 15% 0%)",
    alt: "Ink drawing of dark, round nerve cells trailing long fibres through a fine tangle",
    caption: "Nerve cells of the cerebellum, drawn in ink around 1900.",
  },
  {
    src: "/variants/with-taste-skill/opus-5.5/v4/brain-and-spinal-cord-seven-figures-stipple.jpg",
    width: 1200,
    height: 1966,
    grow: 38,
    position: "50% 22%",
    view: "inset(6% 4% 30% 4%)",
    alt: "Engraved plate of the human brain and spinal cord, with five smaller views of the brain around it",
    caption: "The brain and spinal cord, a stipple engraving from an early 19th-century atlas.",
  },
];

const STAGES = [
  { name: "write it", time: "Two seconds", grow: 13, clause: "First, press ⌥ Space and write the thought down.", tone: s.stageInk },
  { name: "link it", time: "A few keystrokes", grow: 13, clause: "Then type [[ and link it to what it belongs with.", tone: s.stageMuted },
  {
    name: "let it go",
    time: "Weeks, or years",
    grow: 61,
    clause: "After that, forget it. Engram keeps it on your disk, in plain text, and watches for the moment it matters again.",
    note: "It fades from your mind, not from your disk.",
    tone: s.stageSurface,
  },
  { name: "it comes back", time: "When it matters", grow: 13, clause: "Finally, it returns beside whatever you are writing.", tone: s.stageAccent },
];

export default function Page() {
  return (
    <div className={`${pilcrow.variable} ${s.page}`}>
      <Motion />
      <header className={s.nav}>
        <a className={s.wordmark} href="#top" aria-label="Engram, back to the top">
          <span className={s.markShape} style={shape(HERO_SHAPE)} aria-hidden="true" />
          engram
        </a>
        <nav className={s.navLinks} aria-label="Sections">
          <a href="#how">how it works</a>
          <a href="#pricing">pricing</a>
          <a href="#questions" className={s.navWide}>
            questions
          </a>
        </nav>
      </header>

      <main id="top">
        {/* HERO — the giant cropped shape: what you keep of a note, with Engram */}
        <section className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroText}>
            <h1 id="hero-title" className={s.display}>
              <span className={s.line}>
                <span data-line style={{ "--i": 0 } as CSSProperties}>
                  notes that
                </span>
              </span>
              <span className={s.line}>
                <span data-line style={{ "--i": 1 } as CSSProperties}>
                  come back
                </span>
              </span>
            </h1>
            <p className={s.heroSub} data-load style={{ "--d": "420ms" } as CSSProperties}>
              Engram is a note-taking app that works as a second brain. Link your notes with [[brackets]], and the old
              ones come back in the margin just before you’d forget them.
            </p>
            <a className={s.button} href={DOWNLOAD} data-load style={{ ...shape(BUTTON), "--d": "500ms" } as CSSProperties}>
              Download Engram
            </a>
          </div>
          <div className={s.heroShape} aria-hidden="true">
            <div className={s.heroMass} data-grow style={shape(HERO_SHAPE)} />
            <p className={`${s.heroLabel} ${s.label1}`}>you write it</p>
            <p className={`${s.heroLabel} ${s.label2}`}>a day later, it comes back</p>
            <p className={`${s.heroLabel} ${s.label3}`}>a week later, again</p>
          </div>
          <p className={s.heroCaption}>
            What you keep of a note, with Engram: Ebbinghaus’s forgetting curve, lifted each time the note returns.
          </p>
        </section>

        {/* SHOWCASE — one control, blown up: the Resurface switch */}
        <ResurfaceShowcase
          plate={{
            src: "/variants/with-taste-skill/opus-5.5/v4/uber-das-gedachtnis-untersuchungen-zur-experimentellen-psych.png",
            width: 1243,
            height: 853,
          }}
        />

        {/* FEATURES — one paragraph with picture words */}
        <section className={s.features} aria-labelledby="features-title">
          <h2 id="features-title" className={s.visuallyHidden}>
            What Engram does
          </h2>
          <p className={s.statement} data-reveal>
            Press{" "}
            <span className={s.slotKey} data-ui>
              <kbd>⌥</kbd>
              <kbd>Space</kbd>
            </span>{" "}
            and a note opens over anything. Type{" "}
            <span className={s.slotLink} data-ui>
              <span className={s.slotBracket}>[[</span>Sleep and memory<span className={s.slotBracket}>]]</span>
            </span>{" "}
            to link it to another. As you write, older notes on the same thought{" "}
            <span className={s.slotPic} style={shape(MASK)}>
              <img
                src="/variants/with-taste-skill/opus-5.5/v4/anatomy-brain-explained-series-engravings.webp"
                width={821}
                height={1024}
                alt="Charles Bell’s engraving of the human brain seen from above, from 1802"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: "50% 45%" }}
              />
            </span>{" "}
            rise in the margin. And each one is plain Markdown, as lasting as a printed page{" "}
            <span className={s.slotPic} style={shape(MASK)}>
              <img
                src="/variants/with-taste-skill/opus-5.5/v4/de-humani-corporis-fabrica-libri.webp"
                width={663}
                height={1024}
                alt="A printed page of Vesalius’s anatomy book from 1543, with a woodcut of a head"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: "50% 60%" }}
              />
            </span>
            .
          </p>
          <div className={s.featuresFoot} data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            <p>
              Engram runs on Mac, Windows, Linux, iPhone and Android, and imports your notes from Notion, Evernote,
              Apple Notes and Obsidian.
            </p>
            <a className={s.button} href={DOWNLOAD} style={shape(BUTTON)}>
              Download Engram
            </a>
          </div>
        </section>

        {/* HOW IT WORKS — the stages as one bar, widths from true durations */}
        <section className={s.how} id="how" aria-labelledby="how-title">
          <h2 id="how-title" className={s.headLarge} data-reveal>
            you’re allowed to forget
          </h2>
          <ol className={s.bar} data-ui>
            {STAGES.map((st, i) => (
              <li
                key={st.name}
                className={`${s.segment} ${st.tone}`}
                style={{ flexGrow: st.grow, "--d": `${i * 80}ms` } as CSSProperties}
                data-reveal
              >
                <div className={s.segmentBlock} style={st.name === "let it go" ? shape(tooth(46, 20, 0.28)) : undefined}>
                  <span className={s.segmentTime}>{st.time}</span>
                  {"note" in st && st.note ? <span className={s.segmentNote}>{st.note}</span> : null}
                  <span className={s.segmentName}>{st.name}</span>
                </div>
                <p className={s.segmentClause}>{st.clause}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* THE BAND — three of Cajal's ink drawings, one under each tooth of the curve, full width */}
        <section className={s.band} aria-labelledby="band-title">
          <h2 id="band-title" className={s.visuallyHidden}>
            Where memory lives
          </h2>
          <div className={s.bandFrame} style={shape(BAND_EDGE)}>
            <figure className={s.shutter} data-shutter>
              {BAND.map((b) => (
                <div key={b.src} className={s.bandPanel} style={{ flexGrow: b.grow }}>
                  <img
                    src={b.src}
                    width={b.width}
                    height={b.height}
                    alt={b.alt}
                    loading="eager"
                    decoding="async"
                    style={{ objectPosition: b.position, objectViewBox: b.view } as CSSProperties}
                  />
                </div>
              ))}
            </figure>
          </div>
          <div className={s.bandCaption}>
            {BAND.map((b) => (
              <p key={b.src} style={{ flexGrow: b.grow }}>
                {b.caption}
              </p>
            ))}
          </div>
        </section>

        {/* ABOUT — the name, in an inset ink panel with a shaped picture */}
        <section className={s.about} aria-labelledby="about-title">
          <div className={s.aboutPanel}>
            <h2 id="about-title" className={s.aboutTitle} data-reveal>
              named after
              <br /> a memory trace
            </h2>
            <div className={s.aboutText}>
              <div data-reveal>
                <h3>The word</h3>
                <p>
                  An engram is the physical trace a memory leaves in the brain. The biologist Richard Semon coined the
                  word in 1904; Karl Lashley spent thirty years looking for one and never found it. A note is a trace
                  you can keep.
                </p>
              </div>
              <div data-reveal style={{ "--d": "90ms" } as CSSProperties}>
                <h3>The notes stay yours</h3>
                <p>
                  Your notes are Markdown files in a folder on your own disk. Resurfacing runs on a small model on your
                  machine, about 80 MB, so nothing you write is sent away to be read. Sync, if you want it, is
                  end-to-end encrypted.
                </p>
              </div>
              <a className={`${s.button} ${s.buttonOnInk}`} href={DOWNLOAD} style={shape(BUTTON)} data-reveal>
                Download Engram
              </a>
              <p className={s.aboutCaption}>
                In the curve: a branch of a rat’s nerve cell before and five hours after it learned, growing new
                spines (De Roo, Klauser and Muller, 2008). It is the nearest thing to an engram anyone has filmed.
              </p>
            </div>
            <figure className={s.aboutPicture} style={shape(MASK)}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/variants/with-taste-skill/opus-5.5/v4/ltp-promotes-a-selective-long-term-stabilization-poster.jpg"
                width={640}
                height={480}
                aria-label="Two rotating branches of a nerve cell, the second with new spines marked"
                data-autoplay
              >
                <source src="/variants/with-taste-skill/opus-5.5/v4/ltp-promotes-a-selective-long-term-stabilization.webm" type="video/webm" />
              </video>
            </figure>
          </div>
        </section>

        {/* PRICING — plans that step up */}
        <section className={s.pricing} id="pricing" aria-labelledby="pricing-title">
          <h2 id="pricing-title" className={s.headLarge} data-reveal>
            free until
            <br /> you sync
          </h2>
          <div className={s.plans}>
            {PLANS.map((p, i) => (
              <article
                key={p.name}
                className={`${s.plan} ${p.tone}`}
                data-reveal
                style={{ "--d": `${i * 80}ms` } as CSSProperties}
                aria-labelledby={`plan-${p.name}`}
              >
                <div className={s.planBody}>
                  <h3 id={`plan-${p.name}`} className={s.planName}>
                    {p.name}
                  </h3>
                  <p className={s.planPrice}>
                    {p.price} <span>{p.period}</span>
                  </p>
                  <ul className={s.planLines}>
                    {p.lines.map((l) => (
                      <li key={l}>
                        <span className={s.bullet} style={shape(BULLET)} aria-hidden="true" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
                <a className={s.planAction} href={DOWNLOAD}>
                  {p.action}
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ — tabbed index cards */}
        <FaqCards />

        {/* CTA — one word is the button */}
        <section className={s.cta} id="download" aria-labelledby="cta-title" style={shape(CTA_EDGE)}>
          <h2 id="cta-title" className={s.visuallyHidden}>
            Download Engram
          </h2>
          <a className={s.ctaLink} href={MAILTO} aria-label="Download Engram: ask us for the download link by email">
            <span className={s.ctaSentence}>Free on one device, forever. $6 a month when you want it everywhere.</span>
            <svg className={s.ctaArrow} viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
              <path d="M12 36 L36 12 M16 12 H36 V32" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <FitWord className={s.ctaWord} text="download" />
          </a>
        </section>
      </main>

      {/* FOOTER — the mark, built from the curve */}
      <footer className={s.footer}>
        <Mark />
        <div className={s.footerGrid}>
          <div>
            <h2 className={s.footerHead}>Engram</h2>
            <ul>
              <li><a href="#how">How it works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#questions">Questions</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footerHead}>Download</h2>
            <ul>
              <li><a href={DOWNLOAD}>Mac</a></li>
              <li><a href={DOWNLOAD}>Windows and Linux</a></li>
              <li><a href={DOWNLOAD}>iPhone and iPad</a></li>
              <li><a href={DOWNLOAD}>Android</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footerHead}>Moving in</h2>
            <ul>
              <li><a href="#questions">From Notion</a></li>
              <li><a href="#questions">From Evernote</a></li>
              <li><a href="#questions">From Apple Notes</a></li>
              <li><a href="#questions">From Obsidian</a></li>
            </ul>
          </div>
          <div>
            <h2 className={s.footerHead}>Promises</h2>
            <ul>
              <li><a href="#questions">Your files stay yours</a></li>
              <li><a href="#questions">Privacy</a></li>
              <li><a href="#pricing">Students free</a></li>
            </ul>
          </div>
          <div className={s.footerContact}>
            <p>Write to us</p>
            <a href="mailto:hello@engram.app">hello@engram.app</a>
            <p>Made by a small independent team. No ads, no investors, no reading your notes.</p>
          </div>
        </div>
        <p className={s.credits}>
          Pictures: Hermann Ebbinghaus,{" "}
          <a href="https://commons.wikimedia.org/wiki/File:%C3%9Cber_das_Ged%C3%A4chtnis._Untersuchungen_zur_experimentellen_Psychologie,_Fig_2.png">
            figure 2 of Über das Gedächtnis
          </a>{" "}
          (1885, public domain); Santiago Ramón y Cajal,{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Santiago_Ramon_y_Cajal_nerve_cells_in_the_brain.jpg">
            nerve cells in the brain
          </a>{" "}
          (about 1900, public domain) and{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Celula_gigante_de_la_porcion_inferior_del_asta_de_ammon_Wellcome_L0040799.jpg">
            giant cell of Ammon’s horn
          </a>{" "}
          (Wellcome Collection, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>);{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Brain_and_spinal_cord;_seven_figures._Stipple_engraving_by_S_Wellcome_V0008420.jpg">
            brain and spinal cord, seven figures
          </a>{" "}
          (stipple engraving, Wellcome Collection, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>); Charles
          Bell,{" "}
          <a href="https://www.rawpixel.com/image/13970754/image-paper-person-art">the anatomy of the brain</a> (1802, CC0, via
          rawpixel); Andreas Vesalius,{" "}
          <a href="https://www.rawpixel.com/image/13995939/humani-corporis-fabrica-libri-septem-andreas-vesalius">
            De humani corporis fabrica
          </a>{" "}
          (1543, CC0, via rawpixel); film:{" "}
          <a href="https://commons.wikimedia.org/wiki/File:LTP-Promotes-a-Selective-Long-Term-Stabilization-and-Clustering-of-Dendritic-Spines-pbio.0060219.sv001.ogv">
            dendritic spines after LTP
          </a>{" "}
          by De Roo, Klauser and Muller (<a href="https://creativecommons.org/licenses/by/2.5/">CC BY 2.5</a>), via
          Wikimedia Commons.
        </p>
        <div className={s.footerLast}>
          <p>© 2026 Engram. Notes that come back.</p>
          <a className={s.smallButton} href="#top" style={shape(BUTTON)}>
            Back to the top
          </a>
        </div>
      </footer>
      {/* Gallery copy: the corner iteration switcher is not rendered; the gallery has its own iteration navigation. */}
    </div>
  );
}
