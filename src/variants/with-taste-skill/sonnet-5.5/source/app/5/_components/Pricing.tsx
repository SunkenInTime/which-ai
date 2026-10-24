"use client";

import { useState } from "react";
import styles from "../sections.module.css";
import { PLANS, PRODUCT } from "../../_shared/facts";

type Plan = {
  name: string;
  line: string;
  includes: readonly string[];
  figure: (yearly: boolean) => { price: string; per: string; note: string };
  billing: boolean;
};

const PLAN_LIST: Plan[] = [
  {
    name: PLANS.free.name,
    line: PLANS.free.line,
    includes: PLANS.free.includes,
    billing: false,
    figure: () => ({ price: "$0", per: "forever", note: "No card, no time limit." }),
  },
  {
    name: PLANS.plus.name,
    line: PLANS.plus.line,
    includes: PLANS.plus.includes,
    billing: true,
    figure: (y) =>
      y
        ? { price: `$${PLANS.plus.pricePerMonthBilledYearly}`, per: "a month", note: `Billed yearly, $${PLANS.plus.pricePerYear}.` }
        : { price: `$${PLANS.plus.pricePerMonthBilledMonthly}`, per: "a month", note: "Billed monthly. Cancel any time." },
  },
  {
    name: "Student",
    line: "Plus at half price with a school address.",
    includes: [
      "Everything in Plus",
      "Write to us from your school address and we switch it on",
      "Renews each year with the same address",
    ],
    billing: true,
    figure: (y) =>
      y
        ? { price: `$${PLANS.plus.pricePerMonthBilledYearly / 2}`, per: "a month", note: `Billed yearly, $${PLANS.plus.pricePerYear / 2}.` }
        : { price: `$${PLANS.plus.pricePerMonthBilledMonthly / 2}`, per: "a month", note: "Billed monthly. Cancel any time." },
  },
];

export default function Pricing() {
  const [sel, setSel] = useState(1);
  const [yearly, setYearly] = useState(true);

  return (
    <section className={styles.pricing} id="pricing" aria-labelledby="pricing-h">
      <h2 id="pricing-h" className={styles.pricingH} data-rv>
        Pricing
      </h2>
      <div className={styles.plans} role="group" aria-label="Plans">
        {PLAN_LIST.map((p, n) => {
          const f = p.figure(yearly);
          const on = n === sel;
          return (
            <div key={p.name} className={styles.planItem} data-on={on || undefined}>
              <button
                type="button"
                className={styles.planName}
                aria-pressed={on}
                aria-controls={`plan-${n}`}
                onClick={() => setSel(n)}
                onFocus={() => setSel(n)}
              >
                <span className={styles.dot} aria-hidden="true" />
                {p.name}
              </button>
              <div className={styles.stage} id={`plan-${n}`} hidden={!on}>
                <div className={styles.stageIn} key={`${n}-${yearly}`}>
                  <p className={styles.figure}>
                    <span className={styles.price}>{f.price}</span>
                    <span className={styles.per}>{f.per}</span>
                  </p>
                  <p className={styles.billNote}>{f.note}</p>
                  {p.billing ? (
                    <div className={styles.seg} role="group" aria-label="Billing">
                      <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
                        Yearly
                      </button>
                      <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
                        Monthly
                      </button>
                    </div>
                  ) : (
                    <div className={styles.segSpace} aria-hidden="true" />
                  )}
                  <p className={styles.planLine}>{p.line}</p>
                  <ul className={styles.includes}>
                    {p.includes.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <a className={styles.planBtn} href={PRODUCT.primaryHref}>
                    {PRODUCT.primaryAction}
                  </a>
                  <p className={styles.trial}>{PLANS.trial}</p>
                </div>
              </div>
            </div>
          );
        })}
        <p className={styles.pricingNote} data-rv>
          Notes should be free and yours. We charge for the work that costs us something: sync, the model and storage.
        </p>
      </div>
    </section>
  );
}
