import { PRODUCT } from "../../_shared/facts";
import { CellBand } from "./CellBand";
import { Wordmark } from "./Wordmark";
import s from "../p2.module.css";

const PLATES = [
  {
    src: "/variants/with-taste-skill/sonnet-5.5/p2/cells-neg.jpg",
    w: 1800,
    h: 1188,
    pos: "38% 55%",
    alt: "Ink drawing of nerve cells by Santiago Ramón y Cajal: dark round cell bodies, each with one long tail, among a tangle of fibres. Printed in sand on cobalt.",
    caption: "Nerve cells of the brain, drawn by Santiago Ramón y Cajal",
  },
  {
    src: "/variants/with-taste-skill/sonnet-5.5/p2/purkinje-neg.jpg",
    w: 1440,
    h: 2048,
    pos: "50% 42%",
    alt: "Cajal’s drawing of a single Purkinje cell from the human cerebellum, a dense tree of branches rising from one cell body. Printed in sand on cobalt.",
    caption: "A Purkinje cell of the human cerebellum, by Cajal",
  },
  {
    src: "/variants/with-taste-skill/sonnet-5.5/p2/retina-neg.jpg",
    w: 1700,
    h: 1116,
    pos: "50% 50%",
    alt: "Cajal’s diagram of the layers of the mammalian retina, rows of cells linked top to bottom. Printed in sand on cobalt.",
    caption: "The layers of the mammalian retina, by Cajal, 1901",
  },
  {
    src: "/variants/with-taste-skill/sonnet-5.5/p2/hippo-neg.jpg",
    w: 1300,
    h: 2421,
    pos: "50% 52%",
    alt: "Cajal’s drawing of the hippocampus with arrows showing how signals travel between its cells. Printed in sand on cobalt.",
    caption: "The hippocampus, where memories are laid down, by Cajal",
  },
];

const LINKS = [
  { href: "#try", label: "Try it" },
  { href: "#features", label: "Features" },
  { href: "#plans", label: "Plans" },
  { href: "#questions", label: "Questions" },
];

export function Hero() {
  return (
    <header className={s.hero} id="top">
      <div className={s.heroCard}>
        <CellBand id="hero-band" cell={40} gap={20} className={s.heroBand} />
        <div className={s.heroNav}>
          <Wordmark />
          <nav aria-label="Sections" className={s.nav}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className={s.heroCopy}>
          <h1 className={s.display}>
            A second brain
            <br />
            for your notes
          </h1>
          <p className={s.heroLead}>
            Every note you write reaches toward the ones it belongs with.
            Engram links them, and brings them back when they matter.
          </p>
          <div className={s.heroActions}>
            <a className={s.button} href={PRODUCT.primaryHref}>
              {PRODUCT.primaryAction}
            </a>
            <a className={s.textLink} href="#try">
              Watch a note connect
            </a>
          </div>
        </div>

        <p className={s.heroCaption}>
          {PLATES.map((p, i) => (
            <span key={p.src} className={s.heroCap} style={{ ["--i" as string]: i }}>
              {p.caption}
            </span>
          ))}
        </p>
      </div>

      <div className={s.heroStage}>
        <div className={s.heroCell}>
          {PLATES.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.src}
              className={s.heroPlate}
              style={{ ["--i" as string]: i, objectPosition: p.pos }}
              src={p.src}
              width={p.w}
              height={p.h}
              alt={i === 0 ? p.alt : ""}
              aria-hidden={i === 0 ? undefined : true}
              fetchPriority={i === 0 ? "high" : undefined}
              decoding="async"
            />
          ))}
        </div>
      </div>
    </header>
  );
}
