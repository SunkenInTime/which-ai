"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const STEPS = [
  {
    title: "It starts as a voice memo",
    body: "You record forty seconds after a call. Kept transcribes it and picks out the people, projects and decisions you mentioned.",
  },
  {
    title: "It finds its neighbors",
    body: "Kept links the memo to related notes on its own. Backlinks show up on both sides, and the map shows exactly where the idea fits.",
  },
  {
    title: "Old ideas come back on time",
    body: "A test you ran last spring resurfaces in today’s daily note, right when it matters. Spaced reminders bring back ideas worth a second look.",
  },
  {
    title: "Ask, and get your own answer",
    body: "Ask in plain language. Kept answers from your notes only, and every sentence links to the note it came from.",
  },
];

const NEIGHBORS = [
  { id: "battery", title: "Battery tests", when: "March 2025", x: 20, y: 20 },
  { id: "soil", title: "Soil moisture", when: "4 notes", x: 80, y: 24 },
  { id: "mara", title: "Mara 1:1 notes", when: "Weekly", x: 18, y: 80 },
  { id: "grant", title: "Grant draft", when: "Due 14 March", x: 82, y: 76 },
];

export default function PinnedStory() {
  const stageRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(1);

  useEffect(() => {
    let raf = 0;
    let current = 1;
    function update() {
      raf = 0;
      const vh = window.innerHeight;
      let next = 1;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        const p = Math.max(0, Math.min(1, (vh * 0.85 - top) / (vh * 0.5)));
        stageRef.current?.style.setProperty(`--p${i + 1}`, p.toFixed(3));
        if (p > 0.5) next = i + 1;
      });
      if (next !== current) {
        current = next;
        setActive(next);
      }
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={styles.storyGrid}>
      <div className={styles.storyStageWrap}>
        <div ref={stageRef} className={styles.stage} data-step={active} aria-hidden="true">
          <svg className={styles.stageLines} viewBox="0 0 100 100" preserveAspectRatio="none">
            {NEIGHBORS.map((n, i) => {
              const mx = (50 + n.x) / 2 + (i % 2 ? 6 : -6);
              const my = (50 + n.y) / 2 + (i < 2 ? 6 : -6);
              return (
                <path
                  key={n.id}
                  d={`M50 50 Q ${mx} ${my} ${n.x} ${n.y}`}
                  pathLength={1}
                  className={styles.stageLine}
                  data-id={n.id}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {NEIGHBORS.map((n) => (
            <div
              key={n.id}
              className={styles.neighbor}
              data-id={n.id}
              data-pos={n.y < 50 ? "top" : "bottom"}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span className={styles.neighborDot} />
              <span className={styles.neighborTitle}>{n.title}</span>
              <span className={styles.neighborWhen}>{n.id === "battery" ? "From March 2025" : n.when}</span>
            </div>
          ))}

          <div className={styles.memo}>
            <p className={styles.memoTitle}>Call with Mara</p>
            <div className={styles.memoWave}>
              {[8, 14, 22, 12, 26, 18, 10, 20, 28, 16, 9, 18, 24, 12, 7, 15, 22, 13].map((b, i) => (
                <span key={i} style={{ height: `${b}px` }} />
              ))}
            </div>
            <p className={styles.memoText}>Sensors drain in three weeks. Try sleep mode between readings.</p>
            <p className={styles.memoMeta}>
              <span className={styles.memoLinks}>4 backlinks</span>
              <span className={styles.memoDate}>Today, 16:20</span>
            </p>
          </div>

          <div className={styles.resurface}>
            <p className={styles.memoMeta}>On this day, 2025</p>
            <p className={styles.memoText}>Lithium cells lasted 19 days at five minute readings.</p>
          </div>

          <div className={styles.answer}>
            <p className={styles.question}>What did we decide about sensor batteries?</p>
            <p className={styles.memoText}>
              Switch to sleep mode between readings <span className={styles.cite}>[1]</span>. Last spring, lithium cells
              lasted 19 days at five minute intervals <span className={styles.cite}>[2]</span>.
            </p>
            <p className={styles.sources}>
              <span>[1] Call with Mara</span>
              <span>[2] Battery tests</span>
            </p>
          </div>
        </div>
      </div>

      <ol className={styles.steps}>
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className={styles.step}
            data-active={active === i + 1 ? "true" : "false"}
          >
            <h3 className={styles.stepTitle}>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
