import { PLANS, PRODUCT } from "../../_shared/facts";
import s from "../p2.module.css";

export function Plans() {
  return (
    <section className={s.plans} id="plans" aria-labelledby="plans-h">
      <div className={s.plansIntro}>
        <h2 id="plans-h" className={s.head} data-rv="" style={{ ["--d" as string]: 0 }}>
          What it costs
        </h2>
        <p className={s.body} data-rv="" style={{ ["--d" as string]: 1 }}>
          Notes are free and stay yours. You pay for the work that costs us something: sync, the model and the storage. {PLANS.trial}
        </p>
      </div>

      <div className={s.plansFigure}>
        <div className={s.price} data-rv="" style={{ ["--d" as string]: 0 }}>
          <span className={s.priceCur} aria-hidden="true">$</span>
          <span className={s.priceFig}>
            <span className={s.priceNum}>{PLANS.plus.pricePerMonthBilledYearly}</span>
            <span className={s.priceCell} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/variants/with-taste-skill/sonnet-5.5/p2/purkinje-pos.jpg" width={1440} height={2048} alt="" loading="lazy" decoding="async" />
            </span>
          </span>
          <span className={s.pricePer}>a month for Plus, billed yearly</span>
        </div>

        <ul className={s.included} data-rv="" style={{ ["--d" as string]: 1 }}>
          <li>Encrypted sync on every device</li>
          <li>Ask your notes, with sources</li>
          <li>Resurface, the web clipper and email capture</li>
          <li>50 GB of attachments and 30 days of history</li>
        </ul>

        <div className={s.plansAction} data-rv="" style={{ ["--d" as string]: 2 }}>
          <a className={s.button} href={PRODUCT.primaryHref}>
            {PRODUCT.primaryAction}
          </a>
          <p className={s.freeLine}>
            Or stay on Free: every note, link and the map, on one device, for as long as you like. Plus is ${PLANS.plus.pricePerMonthBilledMonthly} if you pay monthly.
          </p>
        </div>
      </div>
    </section>
  );
}
