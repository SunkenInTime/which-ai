"use client";

import { useId, useState } from "react";
import s from "./page.module.css";

const PLATFORMS = ["Mac", "Windows", "Linux", "iPhone", "iPad", "Android"];

/**
 * The closing sentence has a blank, and the blank is the form: pick a platform, press "now".
 * There is no download server yet, so the button opens an email with the platform filled in.
 */
export default function DownloadSentence() {
  const [platform, setPlatform] = useState("Mac");
  const id = useId();

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Engram for ${platform}`);
    const body = encodeURIComponent(`Please send me the Engram download for ${platform}.`);
    window.location.href = `mailto:hello@engram.app?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={send} action="mailto:hello@engram.app" method="post" encType="text/plain">
      <h2 className={s.ctaLine} data-reveal>
        <label htmlFor={id}>Download Engram for</label>{" "}
        <span className={s.blankWrap}>
          <select
            id={id}
            name="platform"
            className={s.blank}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            {PLATFORMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <svg className={s.chevron} viewBox="0 0 12 8" aria-hidden="true">
            <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>{" "}
        <button type="submit" className={s.go} aria-label={`Download Engram for ${platform} now`}>
          now
        </button>
      </h2>
      <p className={s.ctaNote} data-reveal style={{ "--d": "90ms" } as React.CSSProperties}>
        Opens an email to us with your platform filled in, and we reply with the link. Free on one device, and no
        account needed.
      </p>
    </form>
  );
}
