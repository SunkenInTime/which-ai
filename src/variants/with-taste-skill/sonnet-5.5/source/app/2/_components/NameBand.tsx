import { CellBand } from "./CellBand";
import { LoopVideo } from "./LoopVideo";
import s from "../p2.module.css";

export function NameBand() {
  return (
    <section className={s.name} id="name" aria-labelledby="name-h">
      <CellBand id="name-band" cell={56} gap={28} className={s.nameBand} />
      <div className={s.nameGrid}>
        <figure className={s.namePortrait} data-rv="" style={{ ["--d" as string]: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/variants/with-taste-skill/sonnet-5.5/p2/portrait-pos.jpg"
            width={1100}
            height={1495}
            alt="Portrait of Santiago Ramón y Cajal at about forty-seven, bearded, in a dark jacket and bow tie. Printed in cobalt."
            loading="lazy"
            decoding="async"
          />
          <figcaption>Santiago Ramón y Cajal, 1899</figcaption>
        </figure>

        <div className={s.nameText}>
          <h2 id="name-h" className={s.head} data-rv="" style={{ ["--d" as string]: 0 }}>
            Why it’s called Engram
          </h2>
          <p className={s.statement} data-rv="" style={{ ["--d" as string]: 1 }}>
            An engram is the trace a memory leaves in the brain. Cajal drew what it is made of: cells reaching for each other.
          </p>
          <p className={s.body} data-rv="" style={{ ["--d" as string]: 2 }}>
            Richard Semon gave the trace its name in 1904. Santiago Ramón y Cajal shared the 1906 Nobel Prize for showing that the nervous system is made of separate cells that reach across tiny gaps, and drew them in ink for decades. Your notes work the same way: each one separate, each one reaching for the others.
          </p>
          <figure className={s.nameClip} data-rv="" style={{ ["--d" as string]: 3 }}>
            <LoopVideo
              className={s.nameVideo}
              src="/variants/with-taste-skill/sonnet-5.5/p2/clips/growth-cone-ink.webm"
              poster="/variants/with-taste-skill/sonnet-5.5/p2/clips/growth-cone-ink-poster.jpg"
              width={408}
              height={400}
            />
            <figcaption>
              The tip of a growing neuron, filmed under a microscope. It reaches by feeling its way with fine filaments.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
