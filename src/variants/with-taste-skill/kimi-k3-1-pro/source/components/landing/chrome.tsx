"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { capabilities, faqs } from "./data";

export function VersionSwitcher({ current }: { current: number }) {
  return (
    <details className="version-switcher">
      <summary aria-label="Switch landing page design">
        <span>Design</span><strong>{current}/5</strong>
      </summary>
      <nav aria-label="Landing page iterations">
        <p>Choose an iteration</p>
        <div>
          {[1, 2, 3, 4, 5].map((version) => (
            <Link
              href={`./${version}`}
              key={version}
              aria-current={current === version ? "page" : undefined}
              aria-label={`View design ${version}`}
            >
              {version}
            </Link>
          ))}
        </div>
      </nav>
    </details>
  );
}

export function MotionController({ current }: { current: number }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, [current]);
  return null;
}

export function SiteNav({ current, inverted = false }: { current: number; inverted?: boolean }) {
  return (
    <header className={`site-nav${inverted ? " site-nav--inverted" : ""}`}>
      <Link className="wordmark" href={`./${current}`} aria-label="Morrow home"><span className="memory-mark" />Morrow</Link>
      <nav aria-label="Main navigation">
        <a href="#how">How it works</a>
        <a href="#pricing">Pricing</a>
        <a className="nav-action" href="#start">Start for free</a>
      </nav>
    </header>
  );
}

export function FaqList() {
  return (
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <details key={faq.question} open={index === 0}>
          <summary><span>{faq.question}</span><span className="faq-plus" aria-hidden="true" /></summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function CapabilitySwitches() {
  const [enabled, setEnabled] = useState([true, true, false, false]);
  return (
    <div className="capability-switches" data-ui>
      {capabilities.map((capability, index) => (
        <div className={`capability-band${enabled[index] ? " is-on" : ""}`} key={capability.title}>
          <div>
            <h3>{capability.title}</h3>
            <p>{enabled[index] ? capability.detail : capability.body}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enabled[index]}
            aria-label={capability.title}
            onClick={() => setEnabled((current) => current.map((value, item) => item === index ? !value : value))}
          ><span /></button>
        </div>
      ))}
    </div>
  );
}

export function WaitlistForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    window.location.href = `mailto:hello@morrow.so?subject=${encodeURIComponent("Start my Morrow space")}&body=${encodeURIComponent(`Please send a Morrow invitation to ${email}.`)}`;
  }
  return (
    <form className="waitlist-form" onSubmit={submit}>
      <label htmlFor="waitlist-email">Your email</label>
      <div>
        <input id="waitlist-email" name="email" type="email" placeholder="you@example.com" required />
        <button type="submit">Request an invite</button>
      </div>
      <p>We’ll open your email app with a ready-to-send request. No account is created here.</p>
    </form>
  );
}

export function Footer({ current }: { current: number }) {
  return (
    <footer className="site-footer">
      <h2>Morrow</h2>
      <div className="site-footer__bottom">
        <p>A second brain for the thoughts<br />you are not ready to lose.</p>
        <nav aria-label="Footer navigation">
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="mailto:hello@morrow.so">Contact</a>
          <Link href={`./${current}`}>Back to top</Link>
        </nav>
        <p className="site-footer__small">A fictional product concept.<br />Sample notes and prices for demonstration.</p>
      </div>
    </footer>
  );
}
