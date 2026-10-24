"use client";

import { useState } from "react";
import styles from "./page.module.css";
import ui from "./ui.module.css";

const STAGES = [
  {
    name: "Write",
    clause: "First, write it down",
    about: "⌥ Space opens a blank note over whatever you are doing. Type, press Escape, and it is saved to your inbox.",
  },
  {
    name: "Link",
    clause: "Next, link what it touches",
    about: "Type [[ and choose a note. The link works both ways: the older note now lists this one in its backlinks.",
  },
  {
    name: "Forget",
    clause: "Then, let it go",
    about: "Nothing to file, tag or review. Most notes sit untouched for months, and that is how it should be.",
  },
  {
    name: "Return",
    clause: "Later, it finds you",
    about: "When you write about the same thing again, the old note comes back in the margin, with the line that matters.",
  },
];

const QUICK = "Daniel wants the report by the 28th. Ask about the budget line before then.";

function Write() {
  return (
    <div data-ui className={ui.panel}>
      <div className={ui.panelBar}>
        <span>Quick note</span>
        <span className={ui.kbd}>⌥ Space</span>
      </div>
      <div className={ui.panelBody}>
        <p className={ui.typed}>
          {QUICK}
          <span className={ui.caret} aria-hidden="true" />
        </p>
      </div>
      <div className={ui.panelFoot}>
        <span>Saves to Inbox</span>
        <span>Esc to close</span>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div data-ui className={ui.panel}>
      <div className={ui.panelBar}>
        <span>Inbox · Quick note</span>
        <span>Saved</span>
      </div>
      <div className={ui.panelBody}>
        <p className={ui.typed}>
          {QUICK} <span className={ui.wikilink}>[[Dan</span>
          <span className={ui.caret} aria-hidden="true" />
        </p>
        <ul className={ui.menu}>
          <li className={ui.menuActive}>
            <span>Meeting with Daniel, 14 March</span>
            <span className={ui.menuMeta}>Work</span>
          </li>
          <li>
            <span>Daniel Okafor</span>
            <span className={ui.menuMeta}>Person</span>
          </li>
          <li>
            <span>Budget 2027 draft</span>
            <span className={ui.menuMeta}>Work</span>
          </li>
          <li>
            <span>New note “Dan…”</span>
            <span className={ui.menuMeta}>↵</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Forget() {
  const rows = [
    ["Q3 planning: what slipped", "3 weeks ago", false],
    ["Budget 2027 draft", "2 months ago", false],
    ["Hiring plan", "5 months ago", false],
    ["Meeting with Daniel, 14 March", "7 months ago", true],
    ["Offsite in Ghent", "9 months ago", false],
    ["Roadmap notes", "11 months ago", false],
  ] as const;
  return (
    <div data-ui className={ui.panel}>
      <div className={ui.panelBar}>
        <span>Work · 461 notes</span>
        <span>Last opened</span>
      </div>
      <div>
        {rows.map(([t, w, here]) => (
          <div key={t} className={`${ui.listRow} ${here ? ui.listRowHere : ""}`}>
            <span>{t}</span>
            <span className={ui.listRowDim}>{w}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Return() {
  return (
    <div data-ui className={ui.panel}>
      <div className={ui.panelBar}>
        <span>Budget review, 23 October</span>
        <span>Writing</span>
      </div>
      <div className={ui.panelBody}>
        <p className={ui.typed}>
          Line 4, contractors: €18,400 and still nobody owns it
          <span className={ui.caret} aria-hidden="true" />
        </p>
      </div>
      <div className={ui.returnCard}>
        <div className={ui.cardTop}>
          <span className={ui.cardTitle}>Meeting with Daniel, 14 March</span>
          <span className={ui.when}>7 months ago</span>
        </div>
        <div className={ui.why} style={{ margin: "4px 0" }}>
          Also about work and money
        </div>
        <p className={ui.excerpt}>
          Ask about the <mark>budget</mark> line for contractors before then; nobody owns it.
        </p>
        <div className={ui.cardActions}>
          <button type="button" className={`${ui.small} ${ui.smallPrimary}`}>
            Link
          </button>
          <button type="button" className={ui.small}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

const FRAGMENTS = [Write, Link, Forget, Return];

/** How it works: one slider drives the clause on the left and the product's state on the right. */
export default function Stages() {
  const [step, setStep] = useState(0);
  return (
    <div className={styles.stages}>
      <div className={styles.stageClauseField}>
        <h2 className={`${styles.display} ${styles.clauseStack}`} data-reveal="">
          {STAGES.map((s, i) => (
            <span key={s.name} className={styles.clause} data-active={i === step} aria-hidden={i !== step}>
              {s.clause}
            </span>
          ))}
        </h2>
        <div className={`${styles.stageAbout} ${styles.lead}`} data-reveal="" style={{ "--d": "90ms" } as React.CSSProperties}>
          {STAGES.map((s, i) => (
            <p key={s.name} data-active={i === step} aria-hidden={i !== step}>
              {s.about}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.stageFragmentField}>
        <div className={styles.fragmentStack} data-reveal="" style={{ "--d": "160ms" } as React.CSSProperties}>
          {FRAGMENTS.map((F, i) => (
            <div key={i} className={styles.fragmentState} data-active={i === step} aria-hidden={i !== step}>
              <F />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.slider}>
        <div className={styles.sliderTrackWrap}>
        <div className={styles.track} aria-hidden="true">
          <div className={styles.trackFill} style={{ "--p": step / (STAGES.length - 1) } as React.CSSProperties} />
        </div>
        <input
          type="range"
          className={styles.range}
          min={0}
          max={STAGES.length - 1}
          step={1}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          aria-label="Stage of a note’s life"
          aria-valuetext={STAGES[step].name}
        />
        </div>
        <ul className={styles.stageNames}>
          {STAGES.map((s, i) => (
            <li key={s.name}>
              <button type="button" className={styles.stageName} aria-pressed={i === step} onClick={() => setStep(i)}>
                {s.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
