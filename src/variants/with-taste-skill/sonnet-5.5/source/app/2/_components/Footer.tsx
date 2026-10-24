import { PRODUCT } from "../../_shared/facts";
import { CellBand } from "./CellBand";
import s from "../p2.module.css";

/* The wordmark, built: each letter knocked out of its own block, blocks of different heights, bottoms on one line. */
const BLOCKS = [
  { ch: "e", h: 74, w: 1, tone: "sand" },
  { ch: "n", h: 96, w: 1, tone: "surface" },
  { ch: "g", h: 82, w: 1, tone: "sand" },
  { ch: "r", h: 100, w: 0.8, tone: "surface" },
  { ch: "a", h: 68, w: 1, tone: "sand" },
  { ch: "m", h: 90, w: 1.35, tone: "surface" },
] as const;

const COLUMNS = [
  {
    title: "Engram",
    links: [
      { href: "#try", label: "Try it" },
      { href: "#features", label: "Inside Engram" },
      { href: "#name", label: "The name" },
      { href: "#how", label: "How it works" },
    ],
  },
  {
    title: "Plans",
    links: [
      { href: "#plans", label: "Free" },
      { href: "#plans", label: "Plus" },
      { href: "#questions", label: "Student price" },
      { href: "#questions", label: "Questions" },
    ],
  },
  {
    title: "Download",
    links: [
      { href: "#download", label: "Mac and Windows" },
      { href: "#download", label: "Linux" },
      { href: "#download", label: "iPhone and iPad" },
      { href: "#download", label: "Android and the web" },
    ],
  },
];

export function Footer() {
  return (
    <footer className={s.footer}>
      <CellBand id="foot-band" cell={16} gap={12} className={s.footBand} />
      <div className={s.footInner}>
        <div className={s.mark} role="img" aria-label="engram">
          {BLOCKS.map((b, i) => (
            <span
              key={i}
              className={`${s.markBlock} ${b.tone === "sand" ? s.markSand : s.markSurface}`}
              style={{ ["--h" as string]: `${b.h}%`, ["--k" as string]: b.h / 100, ["--w" as string]: b.w }}
            >
              <svg className={s.markGlyph} viewBox="0 0 100 100" focusable="false">
                <text x="50" y="73" textAnchor="middle">
                  {b.ch}
                </text>
              </svg>
            </span>
          ))}
        </div>

        <div className={s.footGrid}>
          <div className={s.footCols}>
            {COLUMNS.map((c) => (
              <div key={c.title}>
                <h2 className={s.footTitle}>{c.title}</h2>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={s.footContact}>
            <h2 className={s.footTitle}>Write to us</h2>
            <p>
              <a href={`mailto:${PRODUCT.contactEmail}`}>{PRODUCT.contactEmail}</a>
            </p>
            <p>Writing from a school address? Plus is half price. We switch it on by hand.</p>
          </div>
        </div>

        <p className={s.credits}>
          Pictures: Santiago Ramón y Cajal’s drawings, “<a href="https://commons.wikimedia.org/wiki/File:Santiago_Ramon_y_Cajal_nerve_cells_in_the_brain.jpg">nerve cells in the brain</a>”, “<a href="https://commons.wikimedia.org/wiki/File:Cajal_-_a_purkinje_neuron_from_the_human_cerebellum.jpg">a Purkinje neuron from the human cerebellum</a>”, “<a href="https://commons.wikimedia.org/wiki/File:CajalMammalianRetina.tif">the mammalian retina</a>” (1901) and “<a href="https://commons.wikimedia.org/wiki/File:CajalHippocampus.jpeg">the hippocampus</a>”, and the 1899 <a href="https://commons.wikimedia.org/wiki/File:Santiago_Ram%C3%B3n_y_Cajal_(1852-1934)_portrait_(restored).jpg">portrait of Cajal</a> (restored by Garrondo), all <a href="https://creativecommons.org/publicdomain/mark/1.0/">public domain</a> via Wikimedia Commons. Film: “<a href="https://commons.wikimedia.org/wiki/File:Two-Distinct-Filopodia-Populations-at-the-Growth-Cone-Allow-to-Sense-Nanotopographical-pone.0015966.s007.ogv">Two distinct filopodia populations at the growth cone</a>” by Jang, Kim, Feltrin, Jeon, Suh and Pertz (PLOS ONE, 2010), <a href="https://creativecommons.org/licenses/by/2.5">CC BY 2.5</a>, cropped and smoothed. Everything is reprinted here in one ink.
        </p>

        <div className={s.footLast}>
          <p>© Engram. A concept; every name, price and note on this page is a sample.</p>
          <a className={s.smallButton} href="#top">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
