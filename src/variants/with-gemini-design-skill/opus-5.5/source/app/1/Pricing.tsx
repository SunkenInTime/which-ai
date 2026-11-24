"use client";

import { useId, useState } from "react";
import s from "./page.module.css";

const PLANS = [
  { name: "Free", monthly: 0, yearly: 0, line: "For getting your thoughts in one place." },
  { name: "Plus", monthly: 8, yearly: 6.67, line: "For people who think for a living." },
  { name: "Teams", monthly: 14, yearly: 11.67, line: "For teams with shared knowledge.", per: "per person" },
];

const ROWS: { label: string; values: (string | boolean)[] }[] = [
  { label: "Notes, clips and voice memos", values: ["Unlimited", "Unlimited", "Unlimited"] },
  { label: "Devices synced", values: ["2", "Unlimited", "Unlimited"] },
  { label: "Automatic links and graph", values: [true, true, true] },
  { label: "Ask your notes", values: ["20 a month", "Unlimited", "Unlimited"] },
  { label: "File storage", values: ["1 GB", "50 GB", "200 GB each"] },
  { label: "Version history", values: ["7 days", "1 year", "Forever"] },
  { label: "Shared spaces and admin controls", values: [false, false, true] },
];

function Mark({ on }: { on: boolean }) {
  return on ? (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-label="Included">
      <path d="M4 10.5 8 14.5 16 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <span aria-label="Not included" className={s.muted}>
      Not included
    </span>
  );
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const name = useId();

  return (
    <>
      <div className={s.pricingHead}>
        <h2 className={s.h2}>Start free. Upgrade when it clicks.</h2>
        <div className={s.segmented} role="radiogroup" aria-label="Billing period">
          {[
            { v: false, label: "Monthly" },
            { v: true, label: "Yearly, save 17%" },
          ].map((o) => (
            <label key={o.label} className={s.segment} data-active={yearly === o.v || undefined}>
              <input type="radio" name={name} checked={yearly === o.v} onChange={() => setYearly(o.v)} className={s.srOnly} />
              {o.label}
            </label>
          ))}
        </div>
      </div>

      <div className={s.priceTable} role="table" aria-label="Plans compared">
        <div className={s.priceRow} role="row" data-head>
          <span role="columnheader" className={s.priceCorner}>
            <span className={s.srOnly}>Feature</span>
          </span>
          {PLANS.map((p) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <div key={p.name} role="columnheader" className={s.planHead} data-featured={p.name === "Plus" || undefined}>
                <span className={s.planName}>{p.name}</span>
                <span className={s.planPrice}>
                  <span className={s.tabular}>${price % 1 ? price.toFixed(2) : price}</span>
                </span>
                <span className={s.muted}>
                  {price === 0 ? "forever" : `${p.per ? p.per + ", " : ""}per month${yearly ? ", billed yearly" : ""}`}
                </span>
                <span className={s.planLine}>{p.line}</span>
              </div>
            );
          })}
        </div>
        {ROWS.map((r) => (
          <div key={r.label} className={s.priceRow} role="row">
            <span role="rowheader" className={s.priceLabel}>
              {r.label}
            </span>
            {r.values.map((v, i) => (
              <span key={i} role="cell" className={s.priceCell} data-featured={i === 1 || undefined}>
                <span className={s.priceCellPlan} aria-hidden="true">
                  {PLANS[i].name}
                </span>
                {typeof v === "boolean" ? <Mark on={v} /> : <span className={s.tabular}>{v}</span>}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className={s.pricingFoot}>
        <a href="#start" className={s.button}>
          Start free
        </a>
        <p className={s.muted}>Plus and Teams include a 14 day trial. No card needed to start.</p>
      </div>
    </>
  );
}
