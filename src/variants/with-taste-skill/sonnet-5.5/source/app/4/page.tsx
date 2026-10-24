import type { CSSProperties } from "react";
import Image from "next/image";
import { FAQ, PLANS, PRODUCT } from "../_shared/facts";
import s from "./p4.module.css";
import { Features } from "./_components/Features";
import { Hero } from "./_components/Hero";
import { Motion } from "./_components/Motion";
import { SkyVideo } from "./_components/SkyVideo";
import { Sky } from "./_components/Sky";

const VIDEO = [
  { src: "/variants/with-taste-skill/sonnet-5.5/p4/milky-way-glen-canyon.webm", type: "video/webm" },
  { src: "/variants/with-taste-skill/sonnet-5.5/p4/milky-way-glen-canyon.mp4", type: "video/mp4" },
];
const POSTER = "/variants/with-taste-skill/sonnet-5.5/p4/milky-way-glen-canyon-poster.jpg";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Authored line: the inner span rises from behind its own baseline. */
function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <span className={s.mask}>
      <span className={s.maskIn} data-reveal="line" style={i(n)}>
        {children}
      </span>
    </span>
  );
}

const STAIRS = [
  {
    line: "First, you write it down.",
    text: "Press the shortcut, type, and stop. There is no folder to choose and no title to invent.",
  },
  {
    line: "Then you draw the line.",
    text: "Type [[ and pick a note. Engram offers links while you write; every one is your decision.",
  },
  {
    line: "Later, it finds you.",
    text: "Resurface returns a note after 1, 3, 7, 21 and 60 days. Ask a question and it answers with sources.",
  },
  {
    line: "Always, it’s yours.",
    text: "Plain Markdown in a folder on your disk. Take it anywhere, whenever you like.",
  },
];

const FAQ_ROWS = [FAQ[0], FAQ[1], FAQ[2], FAQ[3], FAQ[5], FAQ[6], FAQ[4]];

export default function Page() {
  return (
    <main className={s.page}>
      <Motion />
      <Hero />

      {/* The slot's window, opened to the whole sky */}
      <div className={s.windowWrap}>
        <figure className={s.window}>
          <div className={s.windowFrame}>
            <SkyVideo className={s.windowVideo} width={1280} height={720} poster={POSTER} sources={VIDEO} />
          </div>
          <figcaption className={s.caption}>The Milky Way over Glen Canyon, Utah, in time-lapse.</figcaption>
        </figure>
      </div>

      <section className={`${s.section} ${s.claim}`} id="lines" aria-labelledby="lines-title">
        <div className={s.claimText}>
          <h2 className={s.head} id="lines-title">
            <Line n={0}>A constellation</Line>
            <Line n={1}>is a link</Line>
          </h2>
          <p className={s.body} data-reveal="rise" style={i(1)}>
            Nothing in the sky joins those stars. People drew the lines to remember where things were: forty-eight
            figures in Ptolemy’s list, eighty-eight in the sky today.
          </p>
          <p className={s.body} data-reveal="rise" style={i(2)}>
            A link between two notes is the same act. Engram suggests links while you write and never makes one
            without you, so every line on your map is yours.
          </p>
        </div>
        <figure className={s.claimBayer} data-reveal="open">
          <Image
            src="/variants/with-taste-skill/sonnet-5.5/p4/uranometria-orion.jpg"
            width={1920}
            height={2608}
            alt="Engraving from Bayer’s Uranometria of Orion’s shoulder and club, with stars drawn as many-pointed suns and marked with Greek and Latin letters"
            sizes="(max-width: 760px) 92vw, 34vw"
          />
          <figcaption className={s.caption}>
            Bayer’s Uranometria, 1603, letters the stars of each constellation α, β, γ, brightest first. So does the map
            below.
          </figcaption>
        </figure>
        <figure className={s.claimPlate} data-reveal="open">
          <Image
            src="/variants/with-taste-skill/sonnet-5.5/p4/sidney-hall-urania-s-mirror-ursa-major.jpg"
            width={1920}
            height={1349}
            alt="Hand-coloured engraving of Ursa Major, a tawny bear with its stars marked on its body and tail"
            sizes="(max-width: 760px) 92vw, 50vw"
          />
          <figcaption className={s.caption}>
            Ursa Major, from Urania’s Mirror, 1825. Seven bright stars, one bear: the figure is the line someone
            drew.
          </figcaption>
        </figure>
      </section>

      <section className={`${s.section} ${s.sky}`} id="map" aria-labelledby="map-title">
        <h2 className={s.head} id="map-title">
          <Line n={0}>Ask your notes</Line>
        </h2>
        <Sky />
      </section>

      <Features />

      <section className={`${s.section} ${s.how}`} id="how" aria-labelledby="how-first">
        <figure className={`${s.howPlate} ${s.howPlateA}`} data-reveal="open">
          <Image
            src="/variants/with-taste-skill/sonnet-5.5/p4/sidney-hall-urania-s-mirror-lacerta-cygnus.jpg"
            width={1920}
            height={1348}
            alt="Hand-coloured engraving of the Lizard, Swan, Lyre, Fox and Goose, five constellations on one card"
            sizes="(max-width: 760px) 92vw, 34vw"
          />
        </figure>
        <ol className={s.stairs}>
          {STAIRS.map((st, n) => {
            const Tag = n === 0 ? "h2" : "h3";
            return (
              <li key={st.line} className={s.stair} style={{ "--n": n, "--i": n } as CSSProperties} data-reveal="step">
                <Tag className={s.stairLine} id={n === 0 ? "how-first" : undefined}>
                  {st.line}
                </Tag>
                <p className={s.stairText}>{st.text}</p>
              </li>
            );
          })}
        </ol>
        <figure className={`${s.howPlate} ${s.howPlateB}`} data-reveal="open">
          <Image
            src="/variants/with-taste-skill/sonnet-5.5/p4/sidney-hall-urania-s-mirror-taurus.jpg"
            width={1920}
            height={1350}
            alt="Hand-coloured engraving of Taurus, a grey bull with its stars marked on its body and horns"
            sizes="(max-width: 760px) 92vw, 34vw"
          />
          <figcaption className={s.caption}>Urania’s Mirror, 1825: each figure is drawn over the stars it joins.</figcaption>
        </figure>
      </section>

      <section className={s.pricing} id="pricing" aria-labelledby="pricing-title">
        <h2 className={s.display} id="pricing-title">
          <Line n={0}>Free on one device.</Line>
          <Line n={1}>
            <span className={s.price} data-reveal="fill">
              <span className={s.priceIn}>$8</span>
            </span>{" "}
            a month on all.
          </Line>
        </h2>
        <div className={s.priceRow}>
          <p className={s.lead} data-reveal="rise">
            Plus is $8 a month on every device you own, billed yearly at $96. Month to month it is $10.{" "}
            {PLANS.trial}
          </p>
          <div className={s.priceAction} data-reveal="rise" style={i(1)}>
            <a className={`${s.btn} ${s.btnInk}`} href={PRODUCT.primaryHref}>
              {PRODUCT.primaryAction}
            </a>
            <a className={s.textLink} href="#start">
              Pay month to month, $10
            </a>
          </div>
        </div>
        <div className={s.includes}>
          <div data-reveal="rise">
            <h3 className={s.lead}>{PLANS.free.name}</h3>
            <p className={s.includeLine}>{PLANS.free.line}</p>
            <ul className={s.includeList}>
              {PLANS.free.includes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div data-reveal="rise" style={i(1)}>
            <h3 className={s.lead}>{PLANS.plus.name}</h3>
            <p className={s.includeLine}>{PLANS.plus.line}</p>
            <ul className={s.includeList}>
              {PLANS.plus.includes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.faq}`} id="questions" aria-labelledby="faq-title">
        <div className={s.faqRow}>
          <h2 className={`${s.lead} ${s.faqHead}`} id="faq-title">
            <Line n={0}>Questions</Line>
          </h2>
        </div>
        {FAQ_ROWS.map((f, n) => (
          <div className={s.faqRow} key={f.q} data-reveal="rise" style={i(n % 2)}>
            <h3 className={`${s.lead} ${s.faqQ}`}>{f.q}</h3>
            <p className={`${s.body} ${s.faqA}`}>{f.a}</p>
          </div>
        ))}
      </section>

      <section className={s.cta} id="start" aria-labelledby="cta-title">
        <h2 className={s.display} id="cta-title">
          <Line n={0}>Start with</Line>
          <Line n={1}>one star.</Line>
        </h2>
        <div className={s.ctaRow}>
          <p className={s.lead} data-reveal="rise">
            Write one note. Type [[ and link it to another. That is your first constellation.
          </p>
          <a className={`${s.btn} ${s.btnPaper}`} href="#download" data-reveal="rise" style={i(1)}>
            {PRODUCT.primaryAction}
          </a>
        </div>
      </section>

      <footer className={s.footer}>
        <div className={s.footTop}>
          <p className={s.footNote}>
            <strong>Engram</strong> is a note-taking app that works as a second brain. Your notes are plain Markdown
            files on your own disk.
          </p>
          <p className={s.footNote} id="download">
            Download for{" "}
            {PRODUCT.platforms.map((p, n) => (
              <span key={p}>
                <a href="#download">{p}</a>
                {n < PRODUCT.platforms.length - 2 ? ", " : n === PRODUCT.platforms.length - 2 ? " and " : "."}
              </span>
            ))}
          </p>
          <a className={s.backTop} href="#top">
            Back to top
          </a>
        </div>

        <a className={s.contact} href={`mailto:${PRODUCT.contactEmail}`}>
          <span className={s.mask}>
            <span className={s.maskIn} data-reveal="line">
              <span className={s.contactPart}>{PRODUCT.contactEmail.split("@")[0]}</span>
              <span className={s.contactPart}>@{PRODUCT.contactEmail.split("@")[1]}</span>
            </span>
          </span>
        </a>

        <div className={s.footMeta}>
          <p className={s.credits}>
            Pictures:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Milky_Way_in_Glen_Canyon_National_Recreation_Area.webm">
              “Milky Way in Glen Canyon National Recreation Area”
            </a>{" "}
            by Mike Wetzel,{" "}
            <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>, resized and re-encoded; Sidney Hall,
            Urania’s Mirror, 1825, restored by Adam Cuerden:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Sidney_Hall_-_Urania%27s_Mirror_-_Ursa_Major.jpg">
              Ursa Major
            </a>
            ,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Sidney_Hall_-_Urania%27s_Mirror_-_Lacerta,_Cygnus,_Lyra,_Vulpecula_and_Anser.jpg">
              Lacerta, Cygnus, Lyra, Vulpecula and Anser
            </a>{" "}
            and{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Sidney_Hall_-_Urania%27s_Mirror_-_Taurus.jpg">Taurus</a>;
            Johann Bayer,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Uranometria_orion.jpg">Uranometria, Orion</a>, 1603;{" "}
            <a href="https://creativecommons.org/publicdomain/mark/1.0/">public domain</a>, via Wikimedia Commons.
          </p>
          <p className={s.legal}>Engram is a concept. Names, prices and notes shown are samples.</p>
        </div>
      </footer>
    </main>
  );
}
