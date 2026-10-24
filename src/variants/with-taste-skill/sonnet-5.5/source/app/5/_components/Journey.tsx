"use client";

import { useState } from "react";
import styles from "../sections.module.css";
import { AskState, CaptureState, LinkState, ReturnState } from "./JourneyStates";

const STAGES = [
  {
    name: "Write",
    clause: "First, you|write it down",
    day: "Day 0",
    text: "Option+Space opens a blank note over whatever you are doing. Write the thought, press Enter, and it is in your folder as a Markdown file.",
    Fragment: CaptureState,
  },
  {
    name: "Link",
    clause: "Then it finds|its neighbours",
    day: "Day 0",
    text: "Engram suggests the notes it belongs with, and you accept or ignore. Every link works both ways, so the older notes now point to this one too.",
    Fragment: LinkState,
  },
  {
    name: "Return",
    clause: "Days later,|it comes back",
    day: "Day 60",
    text: "Resurface returns the note after 1, 3, 7, 21 and 60 days, unless you opened it since. Five notes a day, at most.",
    Fragment: ReturnState,
  },
  {
    name: "Ask",
    clause: "Months on,|you ask for it",
    day: "Day 223",
    text: "Seven months later you ask a question in your own words. The answer comes in sentences, with the notes it drew on.",
    Fragment: AskState,
  },
] as const;

export default function Journey() {
  const [i, setI] = useState(0);
  const stage = STAGES[i];
  const Fragment = stage.Fragment;

  return (
    <section className={styles.how} id="how" aria-labelledby="how-h">
      <div className={styles.howLeft}>
        <h2 id="how-h" className={styles.howClause} key={stage.clause} aria-live="polite">
          {stage.clause.split("|").map((l, n) => (
            <span key={n} style={{ display: "block" }}>
              {l}
            </span>
          ))}
        </h2>
        <p className={styles.howText} key={stage.text}>
          {stage.text}
        </p>
        <p className={styles.howDay} key={stage.day} aria-hidden="true">
          {stage.day}
        </p>
        <ul className={styles.howNames} aria-label="Stages">
          {STAGES.map((s, n) => (
            <li key={s.name}>
              <button type="button" className={styles.howName} aria-current={n === i || undefined} onClick={() => setI(n)}>
                {s.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.howRight}>
        <div className={styles.howFrag} key={i}>
          <Fragment />
        </div>
      </div>

      <div className={styles.howControl}>
        <div className={styles.track} style={{ "--p": i / (STAGES.length - 1) } as React.CSSProperties}>
          <div className={styles.rail} />
          <div className={styles.fill} />
          <input
            className={styles.range}
            type="range"
            min={0}
            max={STAGES.length - 1}
            step={1}
            value={i}
            aria-label="Stage of one note’s life"
            aria-valuetext={`${stage.name}: ${stage.clause.replace("|", " ")}`}
            onChange={(e) => setI(Number(e.target.value))}
          />
        </div>
        <div className={styles.stops} aria-hidden="true">
          {STAGES.map((s, n) => (
            <button
              key={s.name}
              type="button"
              tabIndex={-1}
              className={styles.stop}
              style={
                {
                  "--n": n,
                  "--tx": n === 0 ? "-16px" : n === STAGES.length - 1 ? "calc(-100% + 16px)" : "-50%",
                } as React.CSSProperties
              }
              data-on={n === i || undefined}
              onClick={() => setI(n)}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <noscript>
        <ol className={styles.noscript}>
          {STAGES.map((s) => (
            <li key={s.name}>
              {s.clause.replace("|", " ")}. {s.text}
            </li>
          ))}
        </ol>
      </noscript>
    </section>
  );
}
