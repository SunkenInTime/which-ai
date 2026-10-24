"use client";

import { useId, useState } from "react";
import { PRODUCT } from "../../_shared/facts";
import s from "../p2.module.css";

export function Cta() {
  const id = useId();
  const [email, setEmail] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Send me the Engram download link");
    const body = encodeURIComponent(
      `Please send the Engram download link to ${email || "this address"}.`,
    );
    window.location.href = `mailto:${PRODUCT.contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <section className={s.cta} id="start" aria-labelledby="cta-h">
      <form
        className={s.ctaForm}
        onSubmit={send}
        action={`mailto:${PRODUCT.contactEmail}`}
        method="get"
        data-rv=""
      >
        <h2 id="cta-h" className={s.display}>
          Send the download link to
        </h2>
        <div className={s.ctaRow}>
          <label className={s.srOnly} htmlFor={id}>
            Your email address
          </label>
          <input
            id={id}
            className={s.ctaInput}
            type="email"
            name="body"
            placeholder="you@email.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={s.ctaButton} type="submit">
            {PRODUCT.primaryAction}
          </button>
        </div>
        <p className={s.ctaNote} id="download">
          One email, with a link for your device: {PRODUCT.platforms.slice(0, -1).join(", ")} and the web. Thirty days of Plus first, then Free. No card.
        </p>
      </form>
    </section>
  );
}
