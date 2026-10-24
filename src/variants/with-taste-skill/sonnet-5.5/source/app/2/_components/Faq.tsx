import { FAQ } from "../../_shared/facts";
import s from "../p2.module.css";

export function Faq() {
  return (
    <section className={s.faq} id="questions" aria-labelledby="faq-h">
      <div className={s.faqHead}>
        <h2 id="faq-h" className={s.head} data-rv="" style={{ ["--d" as string]: 0 }}>
          Questions
        </h2>
      </div>
      <div className={s.faqList}>
        {FAQ.map((f, i) => (
          <details
            key={f.q}
            name="faq"
            className={s.faqItem}
            open={i === 0}
            data-rv=""
            style={{ ["--d" as string]: Math.min(i, 4) }}
          >
            <summary>
              <span>{f.q}</span>
              <span className={s.plus} aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
