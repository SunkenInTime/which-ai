"use client";

import { useState } from "react";
import s from "./page.module.css";

type Cycle = "monthly" | "yearly";

const PLANS = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    blurb: "For getting your thoughts out of your head.",
    items: ["Unlimited notes and web clips", "Automatic links and backlinks", "Sync across two devices", "Markdown export"],
    cta: "Start free",
  },
  {
    name: "Plus",
    monthly: 8,
    yearly: 6.67,
    blurb: "For people who think for a living.",
    items: ["Everything in Free", "Ask your notes, unlimited", "PDFs and voice memos with search", "Sync on every device", "Daily resurfacing"],
    cta: "Try Plus free for 14 days",
    featured: true,
  },
  {
    name: "Teams",
    monthly: 14,
    yearly: 11.67,
    blurb: "For teams that want one shared memory.",
    items: ["Everything in Plus", "Shared spaces with permissions", "Admin controls and SSO", "Priority support"],
    cta: "Talk to us",
  },
];

export default function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <section className={s.pricing} id="pricing" aria-labelledby="pricing-title">
      <div className={s.container}>
        <div className={s.pricingHead}>
          <h2 id="pricing-title" className={s.h2}>Free to start, fair when you grow</h2>
          <fieldset className={s.segment}>
            <legend className={s.srOnly}>Billing cycle</legend>
            {(["monthly", "yearly"] as Cycle[]).map((c) => (
              <label key={c} className={s.segmentOpt}>
                <input type="radio" name="cycle" value={c} checked={cycle === c} onChange={() => setCycle(c)} />
                <span>{c === "monthly" ? "Monthly" : "Yearly, 2 months free"}</span>
              </label>
            ))}
          </fieldset>
        </div>

        <div className={s.plans}>
          {PLANS.map((p) => {
            const price = cycle === "monthly" ? p.monthly : p.yearly;
            return (
              <article key={p.name} className={`${s.plan} ${p.featured ? s.planFeatured : ""}`}>
                <h3 className={s.planName}>{p.name}</h3>
                <p className={s.planPrice}>
                  <span className={s.planAmount}>${price % 1 === 0 ? price : price.toFixed(2)}</span>
                  <span className={s.paneMutedBody}>
                    {p.monthly === 0 ? "forever" : p.name === "Teams" ? "per person / month" : "per month"}
                  </span>
                </p>
                <p className={s.planBlurb}>{p.blurb}</p>
                <ul className={s.planList}>
                  {p.items.map((it) => (
                    <li key={it}>
                      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10.5l3.2 3L15 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {it}
                    </li>
                  ))}
                </ul>
                <a href="#signup" className={p.featured ? s.btnPrimary : s.textLink}>{p.cta}</a>
              </article>
            );
          })}
        </div>
        <p className={s.pricingNote}>
          {cycle === "yearly" ? "Yearly plans are billed once: Plus $80, Teams $140 per person." : "Cancel any time. Your notes export as plain markdown."}
        </p>
      </div>
    </section>
  );
}
