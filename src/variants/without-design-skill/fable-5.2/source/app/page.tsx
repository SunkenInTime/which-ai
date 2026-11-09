import Link from "next/link";
import type { ReactNode } from "react";
import { designs } from "./_lib/designs";
import s from "./page.module.css";

/* A postage-stamp sketch of each direction, drawn rather than screenshotted. */
const thumbs: Record<number, ReactNode> = {
  1: (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <rect width="320" height="200" fill="#f5f5f1" />
      <g fill="#0d0e12" opacity="0.12">
        {Array.from({ length: 9 }, (_, r) =>
          Array.from({ length: 8 }, (_, c) => (
            <circle key={`${r}-${c}`} cx={172 + c * 18} cy={14 + r * 18} r="0.9" />
          )),
        )}
      </g>
      <rect x="22" y="26" width="118" height="13" rx="2" fill="#0d0e12" />
      <rect x="22" y="45" width="74" height="13" rx="2" fill="#2a45f5" />
      <rect x="102" y="45" width="56" height="13" rx="2" fill="#0d0e12" />
      <rect x="22" y="84" width="276" height="96" rx="8" fill="#fff" stroke="#d0d0c9" />
      <path d="M72 84v96M216 84v96M22 100h276" stroke="#e4e4de" />
      <rect x="84" y="112" width="92" height="6" rx="3" fill="#0d0e12" />
      <rect x="84" y="126" width="118" height="4" rx="2" fill="#c9c9c2" />
      <rect x="84" y="136" width="96" height="4" rx="2" fill="#c9c9c2" />
      <rect x="226" y="110" width="62" height="18" rx="4" fill="#e9ecff" stroke="#2a45f5" strokeWidth="0.75" />
      <rect x="226" y="134" width="62" height="18" rx="4" fill="#fff" stroke="#e4e4de" />
      <rect x="226" y="158" width="62" height="14" rx="4" fill="#fff" stroke="#e4e4de" />
    </svg>
  ),
  2: (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <rect width="320" height="200" fill="#f4f1e9" />
      <rect x="28" y="28" width="150" height="9" fill="#1b1a17" />
      <rect x="28" y="43" width="118" height="9" fill="#1b1a17" />
      <path d="M96 58c18-3 34 2 52 0" stroke="#cf3a29" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g fill="#1b1a17" opacity="0.5">
        <rect x="28" y="82" width="170" height="3" />
        <rect x="28" y="92" width="158" height="3" />
        <rect x="28" y="122" width="166" height="3" />
        <rect x="28" y="132" width="120" height="3" />
        <rect x="28" y="152" width="170" height="3" />
        <rect x="28" y="162" width="140" height="3" />
      </g>
      <rect x="26" y="99" width="134" height="10" fill="#ffe566" />
      <rect x="28" y="102" width="130" height="3" fill="#1b1a17" opacity="0.6" />
      <rect x="222" y="80" width="72" height="34" fill="#fbf9f3" stroke="#1b1a17" />
      <rect x="222" y="120" width="72" height="34" fill="#fbf9f3" stroke="#1b1a17" />
      <path d="M228 90h40M228 98h58M228 130h34M228 138h56" stroke="#1b1a17" strokeWidth="2" opacity="0.5" />
      <path d="M216 170c-10 2-20-2-26-10M196 158l-7 1 2 8" stroke="#cf3a29" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  3: (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <rect width="320" height="200" fill="#0a1026" />
      <circle cx="214" cy="100" r="120" fill="#16224b" opacity="0.7" />
      <circle cx="214" cy="100" r="92" fill="none" stroke="#d6b56c" strokeWidth="0.75" opacity="0.7" />
      <circle cx="214" cy="100" r="84" fill="none" stroke="#d6b56c" strokeWidth="0.5" opacity="0.5" />
      <circle cx="214" cy="100" r="46" fill="none" stroke="#ede6d3" strokeWidth="0.5" strokeDasharray="1 4" opacity="0.5" />
      <path d="M170 62l26-10 22 20-8 26-30-4zM236 122l30 6 10 26-28 8z" fill="none" stroke="#d6b56c" strokeWidth="0.9" />
      <g fill="#fff6dc">
        <circle cx="170" cy="62" r="2.2" />
        <circle cx="196" cy="52" r="3" />
        <circle cx="218" cy="72" r="2.2" />
        <circle cx="210" cy="98" r="1.8" />
        <circle cx="180" cy="94" r="2.2" />
        <circle cx="236" cy="122" r="2.6" />
        <circle cx="266" cy="128" r="1.8" />
        <circle cx="276" cy="154" r="2.2" />
        <circle cx="248" cy="162" r="1.8" />
      </g>
      <g fill="#dfe7ff" opacity="0.6">
        <circle cx="150" cy="130" r="0.9" />
        <circle cx="240" cy="48" r="0.9" />
        <circle cx="286" cy="90" r="0.9" />
        <circle cx="198" cy="150" r="0.9" />
        <circle cx="262" cy="76" r="0.9" />
        <circle cx="160" cy="100" r="0.9" />
      </g>
      <rect x="24" y="70" width="78" height="7" fill="#ede6d3" />
      <rect x="24" y="84" width="96" height="7" fill="#ede6d3" />
      <rect x="24" y="98" width="62" height="7" fill="#d6b56c" />
      <rect x="24" y="124" width="54" height="14" fill="#d6b56c" />
    </svg>
  ),
  4: (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <rect width="320" height="200" fill="#ff4a1c" />
      <rect x="0" y="22" width="320" height="2.5" fill="#0d0d0d" />
      <g fill="#0d0d0d" fontWeight="900" fontSize="64">
        <text x="18" y="90" textLength="146" lengthAdjust="spacingAndGlyphs">
          FORGET
        </text>
        <text x="18" y="146" textLength="284" lengthAdjust="spacingAndGlyphs">
          EVERYTHING.
        </text>
      </g>
      <g transform="rotate(-5 236 78)">
        <rect x="178" y="44" width="124" height="76" rx="2" fill="#fbf8ef" />
        <path d="M178 62h124" stroke="#e98374" strokeWidth="1" />
        <path d="M178 76h124M178 88h124M178 100h124" stroke="#b6d0e8" strokeWidth="0.75" />
        <rect x="188" y="68" width="78" height="4" fill="#17130f" />
        <rect x="188" y="80" width="96" height="3" fill="#17130f" opacity="0.6" />
        <rect x="188" y="92" width="64" height="3" fill="#17130f" opacity="0.6" />
        <circle cx="240" cy="112" r="2.4" fill="#17130f" />
      </g>
      <rect x="0" y="176" width="320" height="24" fill="#0d0d0d" />
    </svg>
  ),
  5: (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <rect width="320" height="200" fill="#e9eee8" />
      <g fill="none" stroke="#3f5a49" strokeWidth="0.75">
        <circle cx="160" cy="96" r="150" opacity="0.1" />
        <circle cx="160" cy="96" r="110" opacity="0.14" />
        <circle cx="160" cy="96" r="70" opacity="0.18" />
        <circle cx="60" cy="150" r="22" opacity="0.45" />
        <circle cx="60" cy="150" r="12" opacity="0.7" />
        <circle cx="264" cy="48" r="18" opacity="0.45" />
      </g>
      <ellipse cx="60" cy="150" rx="5" ry="3.6" fill="#7c8881" />
      <ellipse cx="264" cy="48" rx="4.4" ry="3.2" fill="#c9a58e" />
      <rect x="104" y="64" width="112" height="5" rx="2.5" fill="#2c3531" />
      <rect x="118" y="82" width="84" height="3" rx="1.5" fill="#58645e" opacity="0.6" />
      <rect x="92" y="104" width="136" height="26" rx="13" fill="#f9f8f3" stroke="#2c3531" strokeOpacity="0.12" />
      <rect x="178" y="108" width="46" height="18" rx="9" fill="#3f5a49" />
    </svg>
  ),
};

export default function Overview() {
  return (
    <main className={s.page}>
      <header className={s.head}>
        <p className={s.kicker}>Landing page exploration</p>
        <h1>
          Engram <span>— five directions</span>
        </h1>
        <p className={s.intro}>
          One product, five ways to say it. Engram is a note-taking app that works like a second
          brain; each direction below picks a different thing about that to be true to, and commits
          to it all the way down to the type.
        </p>
        <p className={s.hint}>
          <kbd>1</kbd>–<kbd>5</kbd> or <kbd>←</kbd> <kbd>→</kbd> switch directions from anywhere. The
          pill at the bottom of every page does the same.
        </p>
      </header>

      <ol className={s.list}>
        {designs.map((d) => (
          <li key={d.id}>
            <Link href={d.href} className={s.row}>
              <span className={s.thumb}>{thumbs[d.id]}</span>
              <span className={s.body}>
                <span className={s.num}>/{d.id}</span>
                <span className={s.name}>{d.name}</span>
                <span className={s.tagline}>{d.tagline}</span>
                <span className={s.rationale}>{d.rationale}</span>
              </span>
              <span className={s.meta}>
                <span className={s.swatches} aria-hidden="true">
                  {d.swatches.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </span>
                <span className={s.type}>{d.type}</span>
                <span className={s.open}>
                  Open
                  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                    <path d="M3 8h9.5M8.5 4l4 4-4 4" />
                  </svg>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
