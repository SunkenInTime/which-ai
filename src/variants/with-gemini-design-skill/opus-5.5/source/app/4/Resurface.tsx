"use client";

import { useRef, useState } from "react";
import s from "./page.module.css";

const DAYS = [
  { d: "Wed", n: 18, note: "Sketched the onboarding flow on the train. Three screens feels right.", back: "One year ago", old: "Onboarding should ask one question, not five." },
  { d: "Thu", n: 19, note: "Read half of the book on habits Tom lent me. Underlined the bit about cues.", back: "Two years ago", old: "Habits stick when the cue is already part of your day." },
  { d: "Fri", n: 20, note: "Team lunch. Priya suggested a shared reading list for the quarter.", back: "Six months ago", old: "Idea: a reading club that meets once a month, no slides." },
  { d: "Sat", n: 21, note: "Farmers market. Bought quince for the first time. Recipe saved from the stall.", back: "One year ago", old: "Quince paste: equal weight of sugar, cook it low for hours." },
  { d: "Sun", n: 22, note: "Slow morning. Wrote out what I want from next year, mostly fewer meetings.", back: "Three months ago", old: "Block Wednesday mornings for deep work. Protect them." },
  { d: "Mon", n: 23, note: "Kickoff for the Lisbon offsite. Maya owns the agenda, I own the venue.", back: "Eight months ago", old: "March retro: the two-word warm-up got everyone talking." },
  { d: "Tue", n: 24, note: "Venue shortlist is in. Riverside option holds 40 and has a terrace.", back: "One year ago", old: "Last offsite felt rushed. Next time, leave the first morning open." },
];

export default function Resurface() {
  const [sel, setSel] = useState(DAYS.length - 1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const day = DAYS[sel];

  const onKey = (e: React.KeyboardEvent) => {
    let next = sel;
    if (e.key === "ArrowRight") next = Math.min(DAYS.length - 1, sel + 1);
    else if (e.key === "ArrowLeft") next = Math.max(0, sel - 1);
    else return;
    e.preventDefault();
    setSel(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className={s.resurface} aria-labelledby="resurface-title">
      <div className={s.container}>
        <div className={s.resurfaceHead}>
          <h2 id="resurface-title" className={s.h2}>Old ideas come back when they matter</h2>
          <p className={s.body}>
            Every day gets its own note. Kept pairs it with something you wrote months or years ago, so good ideas
            get a second chance instead of a slow fade.
          </p>
        </div>

        <div className={s.daySheet}>
          <div className={s.calendar} role="tablist" aria-label="November 2026" onKeyDown={onKey}>
            {DAYS.map((x, i) => (
              <button
                key={x.n}
                ref={(el) => { tabs.current[i] = el; }}
                type="button"
                role="tab"
                id={`day-${x.n}`}
                aria-selected={i === sel}
                aria-controls="day-panel"
                tabIndex={i === sel ? 0 : -1}
                className={s.day}
                onClick={() => setSel(i)}
              >
                <span className={s.dayName}>{x.d}</span>
                <span className={s.dayNum}>{x.n}</span>
              </button>
            ))}
          </div>

          <div className={s.dayPanel} id="day-panel" role="tabpanel" aria-labelledby={`day-${day.n}`} key={day.n}>
            <div className={s.dayToday}>
              <p className={s.rowTitle}>{day.d === "Tue" ? "Tuesday" : fullDay(day.d)}, {day.n} November</p>
              <p className={s.body}>{day.note}</p>
            </div>
            <div className={s.dayBack}>
              <p className={s.rowTitle}>
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10a6 6 0 106-6 6.3 6.3 0 00-4.4 1.8L4 7.5M4 4v3.5h3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {day.back}
              </p>
              <p className={s.body}>{day.old}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function fullDay(d: string) {
  return ({ Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" } as Record<string, string>)[d];
}
