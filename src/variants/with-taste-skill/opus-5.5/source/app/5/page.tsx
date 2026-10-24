/* eslint-disable @next/next/no-img-element -- pictures are pre-sized files in public/v5 with width, height and alt */
import type { Metadata } from "next";
import HeroRail from "./HeroRail";
import { LinkedSection, NoteLink } from "./LinkedProse";
import MarginDemo from "./MarginDemo";
import MorningNote from "./MorningNote";
import Questions from "./Questions";
import Reveal from "./Reveal";
import { NOTES, NOTE_ORDER, PRICES } from "./data";
import s from "./page.module.css";

// Gallery copy: the fonts come from app/fonts.css under "Opus v2" family names (see that file);
// this stands in for the next/font result and sets the same CSS variable.
const archivo = { variable: "opus-v2-archivo" };

export const metadata: Metadata = {
  title: "Engram, a second brain",
  description:
    "Engram is a note-taking app that brings your old notes back when they matter: in the margin while you write, and once each morning.",
};

const ROOMS = [
  {
    src: "/variants/with-taste-skill/opus-5.5/v5/loc-main-reading-room-highsmith.jpg",
    w: 2400,
    h: 1601,
    alt: "The Main Reading Room of the Library of Congress seen from the gallery: rings of wooden desks under arched windows and marble columns",
  },
  {
    src: "/variants/with-taste-skill/opus-5.5/v5/salle-labrouste-3.jpg",
    w: 2400,
    h: 1800,
    alt: "The Salle Labrouste in Paris: rows of reading desks with green lamps between slender iron columns and domed vaults",
  },
  {
    src: "/variants/with-taste-skill/opus-5.5/v5/long-room-interior-trinity-college-dublin-ireland.jpg",
    w: 2400,
    h: 1813,
    alt: "The Long Room of Trinity College Dublin: two storeys of dark wooden bookcases under a barrel-vaulted ceiling, busts along the aisle",
  },
  {
    src: "/variants/with-taste-skill/opus-5.5/v5/stockholms-stadsbibliotek-rotundan.jpg",
    w: 2400,
    h: 1596,
    alt: "The rotunda of Stockholm Public Library: three tiers of books curving round a reading floor",
  },
];

const CTA_MAIL =
  "mailto:hello@engram.app?subject=Download%20Engram&body=Please%20send%20me%20the%20Engram%20download%20for%20my%20computer.";

export default function Page() {
  return (
    <div className={`${archivo.variable} ${s.page}`}>
      {/* The pictures behind the rail: four reading rooms crossfading, then a closer look up into one vault. */}
      <div className={s.heroPics}>
        <div className={s.fade} data-crossfade="">
          {ROOMS.map((room, i) => (
            <img
              key={room.src}
              className={s.slide}
              src={room.src}
              width={room.w}
              height={room.h}
              alt={room.alt}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
            />
          ))}
        </div>
        <figure className={s.detail}>
          <img
            className={s.detailImg}
            src="/variants/with-taste-skill/opus-5.5/v5/bibliotheque-nationale-de-france-site-richelieu-louvois.jpg"
            width={2400}
            height={1800}
            alt="Looking up into the Salle Labrouste: nine shallow domes with round skylights on iron arches, painted trees in the lunettes below"
            loading="lazy"
            decoding="async"
          />
          <figcaption className={s.detailCaption}>The vaults of the Salle Labrouste, Paris.</figcaption>
        </figure>
        <div id="hero-end" className={s.heroEnd} />
      </div>

      <div className={s.heroTop} />
      <HeroRail />
      <div className={s.heroBottom}>
        <div className={s.heroRest}>
          <div className={s.heroPhone}>
            <p className={s.heroPhoneLine}>Notes that come back when you need them.</p>
            <a className={s.buttonPaper} href="#download">
              Download Engram
            </a>
          </div>
        </div>
        <div className={s.heroDetailSpace} />
      </div>

      <main className={s.main}>
        {/* The page is an Engram note: its [[links]] open the note they name in the margin. */}
        <section className={`${s.section} ${s.linked}`} aria-labelledby="h-intro">
          <h2 id="h-intro" className={`${s.h2} ${s.side}`} data-reveal="">
            A notebook that remembers
          </h2>
          <LinkedSection initial="daniel">
            <p className={s.body} data-reveal="">
              Engram is a place for everything you want to keep: what you read, what you decided, what someone told you{" "}
              <NoteLink slug="daniel">two years ago</NoteLink>. Write a note, link it to others with{" "}
              <NoteLink slug="brackets">double brackets</NoteLink>, and stop worrying about it.
            </p>
            <p className={s.body} data-reveal="" style={{ ["--i" as string]: 2 }}>
              When a note matters again, Engram puts it back in front of you, in the margin while you write and once each
              morning. The notes are plain files <NoteLink slug="disk">on your own disk</NoteLink>, and nothing is sent away
              to be read.
            </p>
            <p className={s.body} data-reveal="" style={{ ["--i" as string]: 3 }}>
              Most of what we write down is forgotten within a month. Hermann Ebbinghaus measured it on himself in 1885 (
              <NoteLink slug="curve">the forgetting curve</NoteLink>). A second brain is only worth keeping if it gives
              things back.
            </p>
          </LinkedSection>
        </section>

        <section id="margin" className={`${s.section} ${s.showcase}`} aria-labelledby="h-margin">
          <h2 id="h-margin" className={`${s.h2} ${s.side}`} data-reveal="">
            Try the margin
          </h2>
          <p className={`${s.body} ${s.showcaseHead}`} data-reveal="" style={{ ["--i" as string]: 1 }}>
            This is a note being written in Engram. The older notes in its margin are the ones Engram brought back, and
            the settings beside them are the app’s own.
          </p>
          <div className={s.showcasePanel} data-reveal="" style={{ ["--i" as string]: 2 }}>
            <MarginDemo />
          </div>
          <p className={s.showcaseFoot} data-reveal="" style={{ ["--i" as string]: 3 }}>
            Change any setting and the margin answers at once, as it does in the app.
          </p>
        </section>

        <section id="morning" className={s.morningSec} aria-label="The morning note">
          <MorningNote />
        </section>

        <section id="how" className={`${s.section} ${s.how}`} aria-labelledby="h-how">
          <h2 id="h-how" className={`${s.h2} ${s.side}`} data-reveal="">
            How it works
          </h2>

          <div className={s.howBody}>
          <div className={s.exchange}>
            <h3 className={s.exLead} data-reveal="">
              First, write it down.
            </h3>
            <div className={s.call} data-ui="" data-reveal="" style={{ ["--i" as string]: 1 }}>
              <div className={s.captureTop}>
                <span>Quick note</span>
                <span className={s.keys}>⌥ Space</span>
              </div>
              <p className={s.captureText}>
                Daniel: the hiring plan goes first at the budget review on the 18th. He wants numbers by Friday.
                <span className={s.caret} aria-hidden="true" />
              </p>
              <div className={s.captureBottom}>
                <span>Saves to Inbox</span>
                <span className={s.uiButton}>Save</span>
              </div>
            </div>
            <div className={s.response} data-ui="" data-reveal="" style={{ ["--i" as string]: 2 }}>
              <p className={s.uiHead}>Inbox</p>
              <div className={s.inboxRow} data-selected="">
                <p className={s.inboxTitle}>
                  Meeting with Daniel, 14 October <span className={s.pill}>New</span>
                </p>
                <p className={s.inboxMeta}>Today at 16:02</p>
                <p className={s.inboxText}>The hiring plan goes first at the budget review on the 18th.</p>
              </div>
              <div className={s.inboxRow}>
                <p className={s.inboxTitle}>Call the joiner about the worktop</p>
                <p className={s.inboxMeta}>Yesterday at 08:40</p>
                <p className={s.inboxText}>Ask whether oak can be fitted before the 30th.</p>
              </div>
            </div>
          </div>

          <div className={s.exchange}>
            <h3 className={s.exLead} data-reveal="">
              Then, link it with two brackets.
            </h3>
            <div className={s.call} data-ui="" data-reveal="" style={{ ["--i" as string]: 1 }}>
              <p className={s.captureText}>
                Bring this to <span className={s.typedLink}>[[Q3</span>
                <span className={s.caret} aria-hidden="true" />
              </p>
              <div className={s.menu} role="presentation">
                <p className={s.menuItem} data-selected="">
                  Q3 planning: what slipped <span className={s.menuMeta}>Work</span>
                </p>
                <p className={s.menuItem}>
                  Q3 hiring plan <span className={s.menuMeta}>Work</span>
                </p>
                <p className={s.menuItem}>
                  Create a note called “Q3” <span className={s.menuMeta}>Enter</span>
                </p>
              </div>
            </div>
            <div className={s.response} data-ui="" data-reveal="" style={{ ["--i" as string]: 2 }}>
              <p className={s.uiHead}>Q3 planning: what slipped</p>
              <p className={s.uiSub}>Linked from 3 notes</p>
              <div className={s.backRow} data-selected="">
                <p className={s.inboxTitle}>
                  Meeting with Daniel, 14 October <span className={s.pill}>New</span>
                </p>
                <p className={s.inboxText}>Bring this to Q3 planning: what slipped.</p>
              </div>
              <div className={s.backRow}>
                <p className={s.inboxTitle}>Budget review prep, 30 September</p>
                <p className={s.inboxText}>Carry over the two roles from Q3 planning.</p>
              </div>
              <div className={s.backRow}>
                <p className={s.inboxTitle}>Team offsite, 11 July</p>
                <p className={s.inboxText}>Everyone agreed the hiring plan comes before the tools budget.</p>
              </div>
            </div>
          </div>

          <div className={`${s.exchange} ${s.exchangeWide}`}>
            <h3 className={s.exLead} data-reveal="">
              Later, it comes back on its own.
            </h3>
            <div className={s.result} data-ui="" data-reveal="" style={{ ["--i" as string]: 1 }}>
              <div className={s.resultMain}>
                <p className={s.editorMeta}>Work, edited 2 December at 10:31</p>
                <p className={s.editorTitle}>Budget review, 18 December</p>
                <p className={s.editorText}>
                  Agenda: headcount for Q1, the <mark className={s.match}>hiring plan</mark>, travel. Ask finance for the
                  revised <mark className={s.match}>budget review</mark> template.
                  <span className={s.caret} aria-hidden="true" />
                </p>
              </div>
              <div className={s.recall}>
                <p className={s.recallHead}>2 older notes brought back</p>
                <div className={s.recallItem}>
                  <p className={s.recallTitle}>Meeting with Daniel, 14 October</p>
                  <p className={s.recallAge}>7 weeks ago</p>
                  <p className={s.recallText}>The hiring plan goes first at the budget review on the 18th. He wants numbers by Friday.</p>
                  <p className={s.recallWhy}>Shares hiring plan, budget review</p>
                </div>
                <div className={s.recallItem}>
                  <p className={s.recallTitle}>Q3 planning: what slipped</p>
                  <p className={s.recallAge}>4 months ago</p>
                  <p className={s.recallText}>The hiring plan slipped twice. Both times we were waiting on the budget review.</p>
                  <p className={s.recallWhy}>Shares hiring plan, budget review</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        <section className={`${s.section} ${s.letterSec}`} aria-labelledby="h-letter">
          <h2 id="h-letter" className={`${s.h2} ${s.side}`} data-reveal="">
            Why we built Engram
          </h2>
          <div className={s.letter}>
            <div className={s.monogram} aria-hidden="true" data-reveal="">
              IB
            </div>
            <p className={s.body} data-reveal="">
              I have kept notes for twenty years: in paper notebooks, in four different apps, in emails to myself. I could
              always find a note if I remembered that it existed. The trouble was all the notes I had forgotten.
            </p>
            <p className={s.body} data-reveal="">
              Writing something down is easy. Meeting it again at the moment it matters is the hard part, and none of the
              apps I used even tried. They were filing cabinets, good at keeping and silent about what they kept.
            </p>
            <p className={s.body} data-reveal="">
              Engram began as a small script that read my notes every morning and sent me three from the past. Within a
              month it had reminded me of a promise to a friend, a supplier we had already tried, and{" "}
              <NoteLink slug="commonplace">a commonplace book</NoteLink> I had let lapse.
            </p>
            <p className={s.body} data-reveal="">
              So we built the rest around that: a margin that answers while you write, links you make with two brackets,
              and plain files you can take anywhere. Your notes stay on your disk. We would rather not read them, and we
              built Engram so that we cannot.
            </p>
            <p className={s.body} data-reveal="">
              Write one thing down today. Some morning next year, it will come back to you.
            </p>
            <p className={s.signName} data-reveal="">
              Ilse Brandt
            </p>
            <p className={s.signRole}>Wrote the first version of Engram</p>
          </div>
          <figure className={s.letterFig} data-reveal="" style={{ ["--i" as string]: 1 }}>
            <img
              src="/variants/with-taste-skill/opus-5.5/v5/british-museum-reading-room-reading-desk-f1.jpg"
              width={1600}
              height={1200}
              alt="Reading desk F1 in the British Museum Reading Room: a leather-topped desk with a brass lamp, a chair and curved bookcases behind"
              loading="lazy"
              decoding="async"
            />
            <figcaption className={s.caption}>Reading desk F1, British Museum Reading Room, London.</figcaption>
          </figure>
        </section>

        <section id="pricing" className={`${s.section} ${s.pricing}`} aria-labelledby="h-pricing">
          <div className={s.priceLead}>
            <h2 id="h-pricing" className={s.h2} data-reveal="">
              Pricing
            </h2>
            <figure className={s.priceFig} data-reveal="" style={{ ["--i" as string]: 1 }}>
              <img
                src="/variants/with-taste-skill/opus-5.5/v5/flanagan-clock-in-the-library-of-congress.jpg"
                width={1600}
                height={1011}
                alt="The Flanagan clock above the Main Reading Room of the Library of Congress: a bronze Father Time with his scythe over the dial"
                loading="lazy"
                decoding="async"
              />
              <figcaption className={s.caption}>The Flanagan clock, Library of Congress.</figcaption>
            </figure>
          </div>
          <div className={s.priceCols}>
            {PRICES.map((col, c) => (
              <div key={c} className={s.priceCol}>
                {col.map((group, g) => (
                  <div key={group.name} className={s.priceGroup} data-reveal="" style={{ ["--i" as string]: c + g }}>
                    <h3 className={s.priceGroupName}>{group.name}</h3>
                    <ul className={s.priceItems}>
                      {group.items.map((item) => (
                        <li key={item.name + item.price} className={s.priceItem}>
                          <span className={s.priceRow}>
                            <span>{item.name}</span>
                            <span className={s.priceFigure}>{item.price}</span>
                          </span>
                          <span className={s.priceNote}>{item.note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
            <div className={s.priceAction} data-reveal="">
              <a className={s.button} href={CTA_MAIL}>
                Download Engram
              </a>
              <p className={s.priceActionNote}>Start on the free plan. Add Sync when your phone should have the same notes.</p>
            </div>
          </div>
        </section>

        <section id="questions" className={`${s.section} ${s.faqSec}`} aria-labelledby="h-questions">
          <Questions />
        </section>

        <section id="linked" className={`${s.section} ${s.notesSec}`} aria-labelledby="h-linked">
          <h2 id="h-linked" className={`${s.h2} ${s.side}`} data-reveal="">
            Every note this page links to
          </h2>
          <ul className={s.noteList}>
            {NOTE_ORDER.map((slug, i) => {
              const note = NOTES[slug];
              return (
                <li key={slug} id={`note-${slug}`} className={s.noteItem} data-reveal="" style={{ ["--i" as string]: i % 2 }}>
                  <p className={s.noteTitle}>{note.title}</p>
                  <p className={s.noteMeta}>
                    {note.folder}, edited {note.edited}. Linked from {note.backlinks} {note.backlinks === 1 ? "note" : "notes"}.
                  </p>
                  {note.body.map((line) => (
                    <p key={line} className={s.noteBody}>
                      {line}
                    </p>
                  ))}
                  {slug === "bm" && (
                    <img
                      className={s.noteImg}
                      src="/variants/with-taste-skill/opus-5.5/v5/british-museum-reading-room.jpg"
                      width={1600}
                      height={1200}
                      alt="The round British Museum Reading Room: two tiers of bookcases curving under the windows of the dome, desks on the floor below"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="download" className={s.cta} aria-labelledby="h-cta">
          <h2 id="h-cta" className={s.ctaLine} data-reveal="">
            Write one thing down today, and see what Engram brings back.
          </h2>
          <a className={s.button} href={CTA_MAIL} data-reveal="" style={{ ["--i" as string]: 1 }}>
            Download Engram
          </a>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.credits}>
          Pictures:{" "}
          <a href="https://commons.wikimedia.org/wiki/File:LOC_Main_Reading_Room_Highsmith.jpg">“LOC Main Reading Room”</a> by
          Carol M. Highsmith, <a href="https://creativecommons.org/publicdomain/mark/1.0/">public domain</a>;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Salle_Labrouste_3.jpg">“Salle Labrouste 3”</a> by Peccadille,{" "}
          <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Long_Room_Interior,_Trinity_College_Dublin,_Ireland_-_Diliff.jpg">
            “Long Room Interior, Trinity College Dublin”
          </a>{" "}
          by Diliff, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Stockholms_stadsbibliotek_rotundan.jpg">“Stockholms stadsbibliotek rotundan”</a>{" "}
          by Bermax, <a href="https://creativecommons.org/publicdomain/mark/1.0/">public domain</a>;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Biblioth%C3%A8que_nationale_de_France_-_Site_Richelieu-Louvois_-_Salle_Labrouste_-_Ensemble_-2.JPG">
            “Salle Labrouste, Ensemble 2”
          </a>{" "}
          by MOSSOT, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:British_Museum_Reading_Room,_reading_desk_F1.jpg">
            “British Museum Reading Room, reading desk F1”
          </a>{" "}
          by Bobulous, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>;{" "}
          <a href="https://commons.wikimedia.org/w/index.php?curid=163125400">“Flanagan clock in the Library of Congress Main Reading Room”</a> by
          Library of Congress Life, <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en/">CC0</a>;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:British_Museum_Reading_Room.jpg">“British Museum Reading Room”</a> by J Brew,{" "}
          <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA 2.0</a>. All via Wikimedia Commons.
        </p>
        <div className={s.footLine}>
          <span className={s.footWhat}>Engram, a second brain</span>
          <nav className={s.footLinks} aria-label="Footer">
            <a href={CTA_MAIL}>Download</a>
            <a href="#pricing">Pricing</a>
            <a href="#questions">Questions</a>
            <a href="mailto:hello@engram.app">Contact</a>
          </nav>
          <span className={s.footYear}>
            © 2026 Engram <a href="mailto:hello@engram.app?subject=Privacy">Privacy</a>
          </span>
        </div>
      </footer>

      <Reveal />
      {/* Gallery copy: the corner iteration switcher is not rendered; the gallery has its own iteration navigation. */}
    </div>
  );
}
