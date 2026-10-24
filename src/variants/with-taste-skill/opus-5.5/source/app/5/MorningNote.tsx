"use client";

import { useState } from "react";
import { MORNING } from "./data";
import s from "./page.module.css";

type When = "week" | "month" | "year";
type Delivery = "app" | "notification" | "email";

const GROUPS: { when: When; label: string }[] = [
  { when: "week", label: "A week ago, Saturday 17 October" },
  { when: "month", label: "A month ago, Thursday 24 September" },
  { when: "year", label: "A year ago, Friday 24 October 2025" },
];

const TIMES = ["6:30", "7:00", "8:00", "9:00"];
const DELIVERY: [Delivery, string][] = [
  ["app", "In the app"],
  ["notification", "Notification"],
  ["email", "Email"],
];

/** The pinned split: the morning note holds still on the left while the reader sets it up on the right. */
export default function MorningNote() {
  const [time, setTime] = useState("7:00");
  const [when, setWhen] = useState<Record<When, boolean>>({ week: true, month: true, year: true });
  const [onlyMine, setOnlyMine] = useState(false);
  const [count, setCount] = useState(5);
  const [delivery, setDelivery] = useState<Delivery>("app");

  const entries = MORNING.filter((e) => when[e.when] && (!onlyMine || !e.clipped)).slice(0, count);
  const footer =
    delivery === "app"
      ? `Waiting in Engram from ${time}`
      : delivery === "notification"
        ? `Sent as a notification at ${time}`
        : `Emailed to you at ${time}`;

  const toggleWhen = (w: When) =>
    setWhen((prev) => {
      const next = { ...prev, [w]: !prev[w] };
      return Object.values(next).some(Boolean) ? next : prev;
    });

  return (
    <div className={s.morning}>
      <h2 className={`${s.h2} ${s.morningHead}`} data-reveal="">
        The morning note
      </h2>
      <div className={s.morningField}>
        <div className={s.morningSheet} data-ui="" aria-live="polite">
          <p className={s.morningDate}>Saturday 24 October, {time}</p>
          <p className={s.morningTitle}>From your past</p>
          {GROUPS.filter((g) => when[g.when]).map((g) => {
            const items = entries.filter((e) => e.when === g.when);
            if (!items.length) return null;
            return (
              <div key={g.when} className={s.morningGroup}>
                <p className={s.morningGroupHead}>{g.label}</p>
                {items.map((e) => (
                  <div key={e.id} className={s.morningItem}>
                    <p className={s.morningItemTitle}>{e.title}</p>
                    <p className={s.morningItemText}>{e.excerpt}</p>
                  </div>
                ))}
              </div>
            );
          })}
          <p className={s.morningFoot}>
            {entries.length} {entries.length === 1 ? "note" : "notes"}. {footer}.
          </p>
        </div>
      </div>

      <div className={s.morningCopy}>
        <div className={`${s.block} ${s.blockFirst}`} data-reveal="">
          <h3 className={s.blockHead}>It arrives when you wake.</h3>
          <p className={s.blockText}>
            Each morning Engram writes you one short note from what you wrote a week, a month and a year ago. Choose the
            time it turns up.
          </p>
          <div className={s.pageSegmented} role="group" aria-label="Time it arrives">
            {TIMES.map((t) => (
              <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={s.block} data-reveal="">
          <h3 className={s.blockHead}>It looks back as far as you like.</h3>
          <p className={s.blockText}>
            Most people keep all three. Some keep only last year, which is the one that still surprises them.
          </p>
          <div className={s.pageSegmented} role="group" aria-label="How far back it looks">
            {GROUPS.map((g) => (
              <button key={g.when} type="button" aria-pressed={when[g.when]} onClick={() => toggleWhen(g.when)}>
                {g.when === "week" ? "A week" : g.when === "month" ? "A month" : "A year"}
              </button>
            ))}
          </div>
        </div>

        <div className={s.block} data-reveal="">
          <h3 className={s.blockHead}>It can leave out what you only saved.</h3>
          <p className={s.blockText}>
            Clipped pages and PDFs can crowd out your own thinking. Leave them out and the note holds only what you wrote
            yourself.
          </p>
          <label className={s.pageSwitch}>
            <input type="checkbox" checked={onlyMine} onChange={(e) => setOnlyMine(e.target.checked)} />
            <span className={s.pageSwitchTrack} aria-hidden="true" />
            Only notes I wrote
          </label>
        </div>

        <div className={s.block} data-reveal="">
          <h3 className={s.blockHead}>It stays short.</h3>
          <p className={s.blockText}>One note to read with your coffee, not another inbox. Choose how many entries it may hold.</p>
          <label className={s.pageRange}>
            <span>
              Up to <output>{count}</output> {count === 1 ? "entry" : "entries"}
            </span>
            <input type="range" min={1} max={6} value={count} onChange={(e) => setCount(Number(e.target.value))} />
          </label>
        </div>

        <div className={s.block} data-reveal="">
          <h3 className={s.blockHead}>It comes to you.</h3>
          <p className={s.blockText}>Read it in the app, get a notification at that time, or have it sent to your email.</p>
          <div className={s.pageSegmented} role="group" aria-label="How it reaches you">
            {DELIVERY.map(([d, label]) => (
              <button key={d} type="button" aria-pressed={delivery === d} onClick={() => setDelivery(d)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
