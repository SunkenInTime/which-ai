"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import ui from "./ui.module.css";
import { PICTURES, type Picture } from "./data";

const OUTPUTS = [
  {
    id: "morning",
    name: "This morning",
    about: "Every day at 7:00, three notes from a week, a month and a year ago. Open them, link them, or let them sleep again.",
  },
  {
    id: "backlinks",
    name: "Backlinks",
    about: "Every note lists the notes that link to it, and the ones that mention it without a link yet. One click makes the link.",
  },
  {
    id: "file",
    name: "The file itself",
    about: "Each note is a plain Markdown file in a folder on your disk. Open it in any editor, back it up however you like.",
  },
  {
    id: "week",
    name: "This week",
    about: "On Sunday, a page of what you wrote and what it connected to. Nothing to fill in, nothing to keep up.",
  },
];

const PAST = [
  {
    when: "A week ago · Friday 17 October 2026",
    title: "Kitchen: three quotes compared",
    line: "Oak worktop, fitted: Hartley €4,850, Brandt €5,200, Ostrowski €4,400 without fitting. Beech is €600 less but marks easily.",
    meta: "Home · 1 picture · links to Call with the fitter",
    picture: PICTURES.woods,
  },
  {
    when: "A month ago · Wednesday 24 September 2026",
    title: "Balcony: what grows in shade",
    line: "The balcony gets two hours of sun. Ferns do well: hart’s tongue and maidenhair. Water once a week from October.",
    meta: "Home · 1 picture · you watered them on Tuesday",
    picture: PICTURES.fern,
  },
  {
    when: "A year ago · Friday 24 October 2025",
    title: "Sourdough starter log",
    line: "Day nine: the starter doubled in six hours at 24 °C. Feed at 1:5:5. First loaf tonight.",
    meta: "Kitchen · 1 picture · not opened since",
    picture: PICTURES.loaf,
  },
];

/** Holds each of the three pictures for about six seconds and crossfades over 1.6 s. */
function useCycle(length: number, hold = 6200) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    let visible = false;
    const start = () => {
      if (timer || !visible || document.visibilityState !== "visible") return;
      timer = window.setInterval(() => setIndex((i) => (i + 1) % length), hold);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(el);
    const onVis = () => (document.visibilityState === "visible" ? start() : stop());
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [length, hold]);
  return { index, ref };
}

function Morning({ index }: { index: number }) {
  return (
    <div data-ui className={ui.paper}>
      <div className={ui.paperTop}>
        <span>From your past</span>
        <span>7:00</span>
      </div>
      <div className={ui.paperTitle}>Friday 24 October</div>
      <div className={ui.paperMeta}>Three notes came back this morning</div>
      <ol className={ui.past}>
        {PAST.map((p, i) => (
          <li key={p.title} className={ui.pastItem} data-active={i === index}>
            <div className={ui.pastWhen}>{p.when}</div>
            <div className={ui.pastTitle}>{p.title}</div>
            <p className={ui.pastLine}>{p.line}</p>
            <div className={ui.pastMeta}>{p.meta}</div>
          </li>
        ))}
      </ol>
      <div className={ui.sub}>
        <span>Also written on 24 October</span>
      </div>
      <div className={ui.backlink}>
        <div className={ui.backlinkTitle}>Offsite in Ghent: what we decided</div>
        <p>2024 · Work · “Ship the import first; nobody switches apps without their old notes.”</p>
      </div>
      <div className={ui.backlink}>
        <div className={ui.backlinkTitle}>Moving day</div>
        <p>2023 · Home · “Boxes labelled by room, not by contents. Keys to Noor on Saturday.”</p>
      </div>
      <div className={ui.paperActions}>
        <button type="button" className={`${ui.small} ${ui.smallPrimary}`}>
          Open all three
        </button>
        <button type="button" className={ui.small}>
          Not today
        </button>
      </div>
    </div>
  );
}

function Backlinks() {
  return (
    <div data-ui className={ui.paper}>
      <div className={ui.paperTop}>
        <span>Travel</span>
        <span>30 May 2025</span>
      </div>
      <div className={ui.paperTitle}>Lisbon in May</div>
      <div className={ui.banner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PICTURES.tram.src} width={PICTURES.tram.width} height={PICTURES.tram.height} alt={PICTURES.tram.alt} loading="lazy" />
      </div>
      <div className={ui.sub}>
        <span>Linked from 4 notes</span>
      </div>
      {[
        ["Gift ideas for Mira", "Or something blue from ", "Lisbon in May", ": the tiles she photographed in Alfama."],
        ["Restaurants worth going back to", "The taberna on Rua das Flores, from ", "Lisbon in May", ". Book two days ahead."],
        ["Packing list", "The thin rain jacket. Learned that in ", "Lisbon in May", "."],
        ["2025 in review", "Best week of the year: ", "Lisbon in May", ", and the night tram back."],
      ].map(([t, a, l, b]) => (
        <div className={ui.backlink} key={t}>
          <div className={ui.backlinkTitle}>{t}</div>
          <p>
            {a}
            <span className={ui.wikilink}>[[{l}]]</span>
            {b}
          </p>
        </div>
      ))}
      <div className={ui.sub}>
        <span>Mentioned without a link · 1</span>
      </div>
      <div className={ui.unlinked}>
        <div>
          <div className={ui.backlinkTitle}>Mira, 2 November</div>
          <p style={{ margin: "4px 0 0" }}>Something from our trip, maybe, or that wave print.</p>
        </div>
        <button type="button" className={`${ui.small} ${ui.smallPrimary}`}>
          Link
        </button>
      </div>
    </div>
  );
}

function File() {
  return (
    <div data-ui className={`${ui.paper} ${ui.paperNarrow}`}>
      <div className={ui.path}>
        <span>~/Engram/Travel/Lisbon in May.md</span>
        <span>1.2 KB</span>
      </div>
      <pre className={ui.codeBlock}>
        <code>
          <span className={ui.codeDim}>{"---\ncreated: 2025-05-30 21:14\ntags: [travel, lisbon]\n---\n\n"}</span>
          {"# Lisbon in May\n\nTram 28 before nine, or it is full by\nthe second stop.\n\nMiradouro da Graça at sunset; take a\njumper.\n\nDinner at the taberna on Rua das Flores,\nbooked two days ahead.\n\nMira loved the tiles in Alfama.\nSee [[Gift ideas for Mira]].\n\n![Tram 28 in Alfama](attachments/alfama.jpg)\n"}
        </code>
      </pre>
      <div className={ui.attachment}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PICTURES.alfama.src} width={PICTURES.alfama.width} height={PICTURES.alfama.height} alt={PICTURES.alfama.alt} loading="lazy" />
        <div>
          <div className={ui.backlinkTitle}>attachments/alfama.jpg</div>
          <div className={ui.paperMeta}>Saved beside the note, 484 KB</div>
        </div>
      </div>
    </div>
  );
}

const WEEK = [
  ["Fri", "Mira, 2 November", "Gift ideas for Mira, Lisbon in May", true],
  ["Thu", "Budget review, 23 October", "Meeting with Daniel, 14 March", true],
  ["Thu", "Call with the fitter", "Kitchen: three quotes compared", false],
  ["Wed", "Reading: a book on sleep, ch. 6", "Sleep and memory", true],
  ["Wed", "Ideas for the onboarding talk", "", false],
  ["Tue", "Balcony: moved the ferns", "Balcony: what grows in shade", false],
  ["Tue", "Groceries", "", false],
  ["Mon", "Q4 goals", "Q3 planning: what slipped", false],
  ["Mon", "Run, 8 km", "Running: the knee", true],
] as const;

function Week() {
  return (
    <div data-ui className={ui.paper}>
      <div className={ui.paperTop}>
        <span>Weekly page</span>
        <span>Sunday 25 October</span>
      </div>
      <div className={ui.paperTitle}>19–25 October 2026</div>
      <div className={ui.weekStats}>
        <div>
          <span className={ui.statValue}>9</span>
          <span className={ui.statLabel}>notes written</span>
        </div>
        <div>
          <span className={ui.statValue}>4</span>
          <span className={ui.statLabel}>link to notes older than a month</span>
        </div>
      </div>
      <table className={ui.week}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Note</th>
            <th>Links to</th>
          </tr>
        </thead>
        <tbody>
          {WEEK.map(([d, t, l, old]) => (
            <tr key={t}>
              <td>{d}</td>
              <td>{t}</td>
              <td className={old ? ui.older : undefined}>{l || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SHOWN: Record<string, { picture: Picture; caption: string }[]> = {
  morning: PAST.map((p) => ({ picture: p.picture, caption: `${p.when.split(" · ")[0]}: “${p.title}”` })),
  backlinks: [{ picture: PICTURES.tram, caption: "From “Lisbon in May”, saved 30 May 2025" }],
  file: [{ picture: PICTURES.alfama, caption: "attachments/alfama.jpg, beside “Lisbon in May.md”" }],
  week: [{ picture: PICTURES.wave, caption: "From “Gift ideas for Mira”, linked this Friday" }],
};

/** Showcase: the names of what Engram hands back, and the selected one lying on the stage at true size. */
export default function Outputs() {
  const [selected, setSelected] = useState("morning");
  const { index, ref } = useCycle(PAST.length);
  const current = OUTPUTS.find((o) => o.id === selected)!;
  const shownKey = (id: string, i: number) => (id === "morning" ? i === index : true);
  const caption = SHOWN[selected][selected === "morning" ? index : 0].caption;

  return (
    <>
      <h2 className={`${styles.display} ${styles.outputsHead}`} data-reveal="">
        What comes back to you
      </h2>
      <div className={styles.outputsText}>
        <ul className={styles.outputsList} role="tablist" aria-label="What Engram hands back" data-reveal="" style={{ "--d": "90ms" } as React.CSSProperties}>
          {OUTPUTS.map((o) => (
            <li key={o.id} role="presentation">
              <button
                type="button"
                role="tab"
                id={`v1-tab-${o.id}`}
                aria-controls={`v1-sheet-${o.id}`}
                aria-selected={selected === o.id}
                className={styles.outputName}
                onClick={() => setSelected(o.id)}
                onKeyDown={(e) => {
                  const i = OUTPUTS.findIndex((x) => x.id === selected);
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") setSelected(OUTPUTS[(i + 1) % OUTPUTS.length].id);
                  if (e.key === "ArrowUp" || e.key === "ArrowLeft") setSelected(OUTPUTS[(i + OUTPUTS.length - 1) % OUTPUTS.length].id);
                }}
              >
                {o.name}
              </button>
            </li>
          ))}
        </ul>
        <p className={styles.outputsAbout} aria-live="polite" data-reveal="" style={{ "--d": "180ms" } as React.CSSProperties}>
          {current.about}
        </p>
        <figure className={styles.outputsFigure} ref={ref as React.Ref<HTMLElement>} data-reveal="" style={{ "--d": "240ms" } as React.CSSProperties}>
          <div className={styles.fade}>
            {Object.entries(SHOWN).flatMap(([id, list]) =>
              list.map((item, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${id}-${i}`}
                  src={item.picture.src}
                  width={item.picture.width}
                  height={item.picture.height}
                  alt={selected === id && shownKey(id, i) ? item.picture.alt : ""}
                  data-active={selected === id && shownKey(id, i)}
                  loading="lazy"
                  decoding="async"
                />
              )),
            )}
          </div>
          <figcaption className={styles.fadeCaption}>{caption}</figcaption>
        </figure>
      </div>
      <div className={styles.stage} data-reveal="" style={{ "--d": "120ms" } as React.CSSProperties}>
        {OUTPUTS.map((o) => (
          <div
            key={o.id}
            id={`v1-sheet-${o.id}`}
            role="tabpanel"
            aria-labelledby={`v1-tab-${o.id}`}
            className={styles.sheetSlot}
            data-active={selected === o.id}
          >
            {o.id === "morning" ? <Morning index={index} /> : o.id === "backlinks" ? <Backlinks /> : o.id === "file" ? <File /> : <Week />}
          </div>
        ))}
      </div>
    </>
  );
}
