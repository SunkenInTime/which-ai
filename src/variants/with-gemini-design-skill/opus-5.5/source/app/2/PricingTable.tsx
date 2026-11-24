"use client";

import { useState } from "react";
import styles from "./page.module.css";

const PLANS = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    unit: "forever",
    blurb: "For getting your own head in order.",
    features: ["Unlimited notes and web clips", "Automatic links and backlinks", "Sync across two devices", "Markdown export"],
    action: { label: "Start free", primary: false },
  },
  {
    name: "Plus",
    monthly: 8,
    yearly: 80,
    unit: "per month",
    blurb: "For people who think for a living.",
    features: [
      "Everything in Free",
      "Ask your notes",
      "Voice memo transcription",
      "Resurfacing and daily review",
      "Unlimited devices",
    ],
    action: { label: "Try Plus free for 14 days", primary: true },
  },
  {
    name: "Teams",
    monthly: 14,
    yearly: 140,
    unit: "per person, per month",
    blurb: "For teams that want to share what they know.",
    features: ["Everything in Plus", "Shared spaces with permissions", "SSO and admin controls", "Priority support"],
    action: { label: "Set up a team", primary: false },
  },
];

export default function PricingTable() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div role="radiogroup" aria-label="Billing period" className={`${styles.segmented} ${styles.billing}`}>
        {[false, true].map((y) => (
          <button
            key={String(y)}
            type="button"
            role="radio"
            aria-checked={yearly === y}
            className={styles.segment}
            onClick={() => setYearly(y)}
          >
            {y ? "Yearly, 2 months free" : "Monthly"}
          </button>
        ))}
      </div>
      <div className={styles.plans}>
        {PLANS.map((p) => {
          const price = yearly ? p.yearly / 12 : p.monthly;
          const shown = Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
          const unit = p.monthly === 0 ? p.unit : yearly ? `${p.unit}, billed yearly` : p.unit;
          return (
            <div key={p.name} className={styles.plan} data-featured={p.action.primary ? "true" : "false"}>
              <h3 className={styles.planName}>{p.name}</h3>
              <p className={styles.planPrice}>{shown}</p>
              <p className={styles.planUnit}>{unit}</p>
              <p className={styles.muted}>{p.blurb}</p>
              <ul className={styles.planList}>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#start" className={p.action.primary ? styles.button : styles.textLink}>
                {p.action.label}
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}
