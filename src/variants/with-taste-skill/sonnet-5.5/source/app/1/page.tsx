/* The pictures are pre-sized files in public/p1/img, so plain <img> is deliberate. */
/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from "react";
import { FAQ, PLANS, PRODUCT } from "../_shared/facts";
import { CtaDialog } from "./_components/CtaDialog";
import {
  CaptureFragment,
  ConnectFragment,
  OwnFragment,
  RecallFragment,
} from "./_components/Fragments";
import { FitWord, LoopVideo, Motion } from "./_components/Motion";
import { Showcase } from "./_components/Showcase";
import s from "./p1.module.css";

const v = (i: number) => ({ "--i": i }) as CSSProperties;

const SEE_ALSO = [
  ["Capture", "#capture", "in a second"],
  ["Connect", "#connect", "both ways"],
  ["Recall", "#recall", "by meaning"],
  ["Own", "#own", "plain files"],
  ["Prices", "#prices", "from $0"],
] as const;

type Sheet = {
  id: string;
  name: string;
  tone: "bone" | "jade" | "moss" | "mist";
  lead: string;
  text: string;
  fragment: ReactNode;
  media: ReactNode;
  caption: string;
};

const SHEETS: Sheet[] = [
  {
    id: "capture",
    name: "Capture",
    tone: "bone",
    lead: "Anything becomes a card in under a second.",
    text: "Press the shortcut and an empty card opens over whatever you are doing. Share from your phone, forward an email, clip a page, or talk: voice memos are written out on your device, never uploaded.",
    fragment: <CaptureFragment />,
    media: (
      <img
        src="/variants/with-taste-skill/sonnet-5.5/p1/img/shelf-writing-ledge.jpg"
        width={1200}
        height={1600}
        alt="A walnut card-catalogue cabinet with rows of brass label holders and a writing shelf pulled out"
        loading="lazy"
        decoding="async"
      />
    ),
    caption: "A catalogue cabinet with its writing shelf pulled out.",
  },
  {
    id: "connect",
    name: "Connect",
    tone: "jade",
    lead: "Every card points to its neighbours, and they point back.",
    text: "Type [[ and link any card. Links work both ways, so a card shows what points at it. Engram suggests links while you write; you accept or ignore them. Nothing is filed without you.",
    fragment: <ConnectFragment />,
    media: (
      <img
        src="/variants/with-taste-skill/sonnet-5.5/p1/img/card-with-rod.jpg"
        width={1200}
        height={1600}
        alt="A library catalogue card held on a brass rod, with the headings it is filed under printed at the foot"
        loading="lazy"
        decoding="async"
      />
    ),
    caption: "A catalogue card lists every heading it is filed under.",
  },
  {
    id: "recall",
    name: "Recall",
    tone: "moss",
    lead: "Find it by what it meant, not by what you typed.",
    text: "Search understands meaning. Ask your notes a question and read the answer with its sources. Resurface brings old cards back before you forget them, five a day at most.",
    fragment: <RecallFragment />,
    media: (
      <LoopVideo
        className={s.loop}
        poster="/variants/with-taste-skill/sonnet-5.5/p1/video/card-drawer-poster.jpg"
        webm="/variants/with-taste-skill/sonnet-5.5/p1/video/card-drawer.webm"
        mp4="/variants/with-taste-skill/sonnet-5.5/p1/video/card-drawer.mp4"
        width={640}
        height={480}
      />
    ),
    caption: "Fingers walking through a library drawer, from a 1951 film.",
  },
  {
    id: "own",
    name: "Own",
    tone: "mist",
    lead: "Plain Markdown files, in a folder on your disk.",
    text: "Open the folder in any editor. It works offline. Sync between devices is end-to-end encrypted, so Engram cannot read your notes. Leave whenever you like; your notes are already out.",
    fragment: <OwnFragment />,
    media: (
      <img
        src="/variants/with-taste-skill/sonnet-5.5/p1/img/catalogue-wall.jpg"
        width={1920}
        height={1280}
        alt="A long wall of wooden catalogue drawers with brass fittings in a library reading room"
        loading="lazy"
        decoding="async"
      />
    ),
    caption: "A wall of drawers, Indiana State Library.",
  },
];

const SLIP = [
  {
    h: "The day you write it",
    rows: [
      ["Write it down", "2 sec"],
      ["Link it to two cards", "30 sec"],
    ],
  },
  {
    h: "The first week",
    rows: [
      ["Day 1. Read it back, add what you forgot", "1 min"],
      ["Day 3. Link it to something new", "1 min"],
      ["Day 7. Say it in your own words", "1 min"],
    ],
  },
  {
    h: "The first two months",
    rows: [
      ["Day 21. Is it still true?", "1 min"],
      ["Day 60. Keep it, merge it, or let it go", "1 min"],
    ],
  },
] as const;

const PLACES = [
  ["Mac", "#download"],
  ["Windows", "#download"],
  ["Linux", "#download"],
  ["iPhone and iPad", "#download"],
  ["Android", "#download"],
  ["Web", "#download"],
] as const;

export default function Page() {
  return (
    <div className={s.page}>
      <Motion />
      <main className={s.main} id="main">
        {/* ───────── hero: the first card in the drawer ───────── */}
        <header className={s.hero} id="top">
          <div className={s.nav}>
            <a className={s.mark} href="#top">
              Engram
            </a>
            <a className={s.navBtn} href={PRODUCT.primaryHref}>
              {PRODUCT.primaryAction}
            </a>
          </div>

          <div className={s.stage}>
            <figure className={`${s.plate} ${s.plateL}`} data-load style={{ "--d": "900ms" } as CSSProperties}>
              <img
                src="/variants/with-taste-skill/sonnet-5.5/p1/img/luhmann-1989.jpg"
                width={1100}
                height={1290}
                alt="Niklas Luhmann in 1989, speaking and gesturing, in a black-and-white photograph"
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>
                Niklas Luhmann, 1989. He wrote more than seventy books from a
                wooden box of about 90,000 numbered cards.
              </figcaption>
            </figure>

            <div className={s.deck}>
              <nav className={s.tabs} aria-label="The four jobs and the price">
                {SEE_ALSO.map(([label, href], i) => (
                  <a key={label} href={href} style={v(i)}>
                    {label}
                  </a>
                ))}
              </nav>

              <div className={s.heroCard}>
                <i className={`${s.cut} ${s.tl}`} aria-hidden="true" />
                <i className={`${s.cut} ${s.tr}`} aria-hidden="true" />
                <i className={`${s.cut} ${s.bl}`} aria-hidden="true" />
                <i className={`${s.cut} ${s.br}`} aria-hidden="true" />

                <div className={s.cardHead} aria-hidden="true" />

                <h1 className={s.h1}>
                  <span className={s.line}>
                    <span data-line style={v(0)}>
                      A second brain
                    </span>
                  </span>{" "}
                  <span className={`${s.line} ${s.lineR}`}>
                    <span data-line style={v(1)}>
                      in numbered cards
                    </span>
                  </span>
                </h1>

                <p className={s.lead} data-load style={{ "--d": "520ms" } as CSSProperties}>
                  Engram numbers every note, links it to the ones it belongs
                  with, and brings it back before you forget it.
                </p>

                <div className={s.actions} data-load style={{ "--d": "600ms" } as CSSProperties}>
                  <a className={s.btn} href={PRODUCT.primaryHref}>
                    {PRODUCT.primaryAction}
                  </a>
                  <a className={s.textLink} href="#returns">
                    How a card comes back
                  </a>
                </div>

                <div className={s.seeAlso}>
                  <p className={s.seeHead}>See also</p>
                  <ul>
                    {SEE_ALSO.map(([label, href, note]) => (
                      <li key={label}>
                        <a href={href}>
                          <span>{label}</span>
                          <i aria-hidden="true" />
                          <span>{note}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className={s.cardFoot}>
                    <span>Filed under second brain</span>
                    <span>21/3a2</span>
                  </p>
                </div>
                <span className={s.hole} aria-hidden="true" />
              </div>
            </div>

            <figure className={`${s.plate} ${s.plateR}`} data-load style={{ "--d": "980ms" } as CSSProperties}>
              <img
                src="/variants/with-taste-skill/sonnet-5.5/p1/img/search-room-1940.jpg"
                width={1200}
                height={1468}
                alt="A woman in a suit pulls a drawer from a tall wall of card-catalogue drawers in a search room, in a 1940 black-and-white photograph"
                decoding="async"
              />
              <figcaption>
                A card catalogue in a search room, 1940. Every card had an
                address, and pointed to its neighbours.
              </figcaption>
            </figure>
          </div>
        </header>

        {/* ───────── showcase: the live card ───────── */}
        <Showcase />

        {/* ───────── features: guide cards stacked in the drawer ───────── */}
        <section className={s.features} aria-labelledby="jobs-h">
          <div className={`${s.wrap} ${s.featHead}`}>
            <h2 id="jobs-h" className={s.h2} data-reveal>
              Four jobs for every card
            </h2>
          </div>
          <div className={s.sheets}>
            {SHEETS.map((sh, k) => (
              <article
                key={sh.id}
                id={sh.id}
                className={`${s.sheet} ${s[sh.tone]}`}
                style={{ "--k": k } as CSSProperties}
              >
                <div className={s.tabRow}>
                  <h3 className={s.tab} style={{ "--k": k } as CSSProperties}>
                    {sh.name}
                  </h3>
                </div>
                <div className={s.sheetBody}>
                  <div className={s.sheetText}>
                    <div className={s.sheetFrag} data-reveal>
                      {sh.fragment}
                    </div>
                    <p className={s.sheetPara} data-reveal style={v(1)}>
                      <strong>{sh.lead}</strong> {sh.text}
                    </p>
                  </div>
                  <figure className={s.sheetFig}>
                    <div className={s.sheetPic} data-open>
                      {sh.media}
                    </div>
                    <figcaption>{sh.caption}</figcaption>
                  </figure>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ───────── how it works: a date-due slip ───────── */}
        <section className={s.returns} id="returns" aria-labelledby="returns-h">
          <div className={`${s.wrap} ${s.grid}`}>
            <div className={s.returnsText}>
              <h2 id="returns-h" className={s.h2} data-reveal>
                How a card comes back
              </h2>
              <p className={s.returnsLead} data-reveal style={v(1)}>
                A card returns after 1, 3, 7, 21 and 60 days, unless you have
                opened it since. At most five a day, so it stays a pleasure.
              </p>
              <figure className={s.dow} data-reveal style={v(2)}>
                <div>
                  <img
                    src="/variants/with-taste-skill/sonnet-5.5/p1/img/dow-note-system.jpg"
                    width={1400}
                    height={1400}
                    alt="Pen-and-ink diagrams of stacks of index cards with their headings, from a 1924 handbook for historians"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>
                  Card files drawn for historians in Earle W. Dow’s
                  Principles of a Note-System, 1924.
                </figcaption>
              </figure>
            </div>

            <div className={s.slip}>
              <p className={s.slipTitle} data-reveal>
                Due back, in five visits
              </p>
              {SLIP.map((g, gi) => (
                <div key={g.h} className={s.slipGroup}>
                  <h3 data-reveal style={v(gi + 1)}>
                    {g.h}
                  </h3>
                  <ul>
                    {g.rows.map(([what, time], ri) => (
                      <li key={what} data-reveal style={v(gi + ri + 2)}>
                        <span>{what}</span>
                        <i aria-hidden="true" />
                        <span className={s.time}>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className={s.slipEnd}>
                <span>Filed for good</span>
                <span>Five returns, under six minutes</span>
              </p>
            </div>
          </div>
        </section>

        {/* ───────── pricing: set like a menu ───────── */}
        <section className={s.prices} id="prices" aria-labelledby="prices-h">
          <div className={`${s.wrap} ${s.grid}`}>
            <div className={s.pricesHead}>
              <h2 id="prices-h" className={s.h2} data-reveal>
                What it costs
              </h2>
              <figure className={s.plate4} data-reveal style={v(1)}>
                <img
                  src="/variants/with-taste-skill/sonnet-5.5/p1/img/label-holders.jpg"
                  width={1200}
                  height={1600}
                  alt="Two catalogue drawers with brass label holders and pulls"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Brass label holders, Indiana State Library.</figcaption>
              </figure>
            </div>

            <div className={s.menu}>
              <div className={s.menuCol}>
                <div className={s.group} data-reveal>
                  <h3>
                    <span>{PLANS.free.name}</span>
                    <span>$0</span>
                  </h3>
                  <p className={s.groupNote}>{PLANS.free.line}</p>
                  <ul>
                    {PLANS.free.includes.map((t, i) => (
                      <li key={t} data-reveal style={v(i + 1)}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.group} data-reveal>
                  <h3>
                    <span>To begin</span>
                  </h3>
                  <ul>
                    <li>
                      <span>30 days of Plus</span>
                      <span className={s.price}>$0</span>
                      <small>No card to start. Every new account gets it.</small>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={s.menuCol}>
                <div className={s.group} data-reveal>
                  <h3>
                    <span>{PLANS.plus.name}</span>
                    <span>$8 a month</span>
                  </h3>
                  <p className={s.groupNote}>{PLANS.plus.line}</p>
                  <ul>
                    {PLANS.plus.includes.map((t, i) => (
                      <li key={t} data-reveal style={v(i + 1)}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.group} data-reveal>
                  <h3>
                    <span>Other ways to pay for Plus</span>
                  </h3>
                  <ul>
                    <li>
                      <span>Billed yearly</span>
                      <span className={s.price}>$96 a year</span>
                      <small>The same as $8 a month.</small>
                    </li>
                    <li>
                      <span>Billed monthly</span>
                      <span className={s.price}>$10 a month</span>
                    </li>
                    <li>
                      <span>With a school address</span>
                      <span className={s.price}>$4 a month</span>
                      <small>Half price, billed yearly. Write to us from it.</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── faq: reading text ───────── */}
        <section className={s.faq} id="questions" aria-labelledby="faq-h">
          <div className={`${s.wrap} ${s.grid}`}>
            <div className={s.faqHead}>
              <h2 id="faq-h" className={s.h2} data-reveal>
                Questions
              </h2>
              <figure className={s.guide} data-reveal style={v(1)}>
                <img
                  src="/variants/with-taste-skill/sonnet-5.5/p1/img/guide-card.jpg"
                  width={1400}
                  height={1050}
                  alt="A blue guide card in a catalogue drawer reading: if you do not find here what you want, ask the librarian"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  A guide card from a library catalogue.
                </figcaption>
              </figure>
            </div>
            <div className={s.faqText}>
              {[FAQ.slice(0, 3), FAQ.slice(3, 5), FAQ.slice(5)].map((col, ci) => (
                <div key={ci} className={s.faqCol}>
                  {col.map((f, i) => (
                    <p key={f.q} data-reveal style={v(ci + i)}>
                      <strong>{f.q}</strong> {f.a}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── cta: the first step, already open ───────── */}
        <section className={s.start} id="start" aria-labelledby="start-h">
          <div className={`${s.wrap} ${s.grid} ${s.startGrid}`}>
            <div className={s.startText}>
              <h2 id="start-h" className={s.h2Big} data-reveal>
                <span>Start your</span>
                <span>drawer</span>
              </h2>
              <p data-reveal style={v(1)}>
                Name it, and Engram opens an empty card. Free on one device
                for as long as you like, and every new account begins with 30
                days of Plus.
              </p>
            </div>
            <div className={s.startDialog} data-reveal style={v(1)}>
              <CtaDialog />
            </div>
          </div>
        </section>
      </main>

      {/* ───────── footer: the back of the card, revealed from under the page ───────── */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <p className={s.bigName}>
            <FitWord>ENGRAM</FitWord>
          </p>
          <div className={`${s.grid} ${s.footGrid}`} id="download">
            <div className={s.places}>
              <a className={s.mail} href={`mailto:${PRODUCT.contactEmail}`}>
                {PRODUCT.contactEmail}
              </a>
              <ul>
                {PLACES.map(([label, href]) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.footLinks}>
              <div>
                <p>The four jobs</p>
                <ul>
                  <li><a href="#capture">Capture</a></li>
                  <li><a href="#connect">Connect</a></li>
                  <li><a href="#recall">Recall</a></li>
                  <li><a href="#own">Own</a></li>
                </ul>
              </div>
              <div>
                <p>On this page</p>
                <ul>
                  <li><a href="#write">Write a card</a></li>
                  <li><a href="#returns">How a card comes back</a></li>
                  <li><a href="#prices">What it costs</a></li>
                  <li><a href="#questions">Questions</a></li>
                </ul>
              </div>
              <div>
                <p>Reach us</p>
                <ul>
                  <li><a href={`mailto:${PRODUCT.contactEmail}`}>Write to us</a></li>
                  <li><a href={PRODUCT.primaryHref}>{PRODUCT.primaryAction}</a></li>
                </ul>
              </div>
            </div>
          </div>
          <p className={s.credits}>
            Pictures from Wikimedia Commons:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Card_catalog_at_the_Indiana_State_Library_-_cabinet_exterior.jpg">“Card catalog at the Indiana State Library - cabinet exterior”</a>,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Card_catalog_at_the_Indiana_State_Library_-_interior_view_of_catalog_cards.jpg">“… interior view of catalog cards”</a>,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Card_catalog_at_the_Indiana_State_Library_-_headings_Lover_through_Luma.jpg">“… headings Lover through Luma”</a> and{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Inside_a_card_catalog_at_the_Indiana_State_Library_-_ask_the_librarian.jpg">“Inside a card catalog … ask the librarian”</a> by TBurmeister (WMF);{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Indiana_State_Library_2024be.jpg">“Indiana State Library 2024be”</a> by Antony-22;{" "}
            <a href="https://commons.wikimedia.org/wiki/File:HSGH_022-000941_Niklas_Luhmann_(cropped).png">“Niklas Luhmann”</a> by Universitätsarchiv St.Gallen (HSG), all{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>. In the public domain:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Photograph_of_Card_Catalog_in_Central_Search_Room_-_DPLA_-_5be4fa7f7ec7f58594a5dc6765659025.jpg">“Photograph of Card Catalog in Central Search Room”</a> (1940), General Services Administration, National Archives;{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Card_file_examples_from_Principles_of_a_Note-System_for_Historical_Studies_by_Earle_W._Dow_1924.png">card files from Principles of a Note-System for Historical Studies</a> (1924), Earle W. Dow; and an excerpt of the film{" "}
            <a href="https://commons.wikimedia.org/wiki/File:0044_Library_Organization_20_11_04_00.webm">“Library Organization”</a> (1951), Coronet Instructional Films.
          </p>
          <p className={s.legal}>
            <span>Engram is a concept. Names, prices and examples are samples.</span>
            <a href="#top">Back to the top</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
