"use client";

import { useId, useState, type KeyboardEvent } from "react";
import styles from "./page.module.css";

const MODES = ["Typed note", "Web clip", "PDF", "Voice memo"] as const;
type Mode = (typeof MODES)[number];

const BARS = [
  6, 12, 20, 14, 26, 32, 18, 10, 22, 30, 36, 24, 14, 8, 16, 28, 34, 20, 12, 18, 26, 14, 8, 12, 22, 30, 18, 10, 6, 14, 24, 16,
];

function Preview({ mode }: { mode: Mode }) {
  if (mode === "Typed note") {
    return (
      <div className={styles.previewBody}>
        <p className={styles.previewTitle}>Why the seedlings stalled</p>
        <p>
          Night temperature dipped below 12°C twice this week. Compare with{" "}
          <span className={styles.wikilink}>Soil moisture</span> readings before blaming the new compost.
        </p>
        <p className={styles.previewMeta}>Linked to 3 notes as you typed</p>
      </div>
    );
  }
  if (mode === "Web clip") {
    return (
      <div className={styles.previewBody}>
        <p className={styles.previewTitle}>Low power modes for ESP32 sensors</p>
        <p className={styles.previewMeta}>espressif.com, saved with your highlight</p>
        <p>
          <mark className={styles.highlight}>
            Deep sleep draws around 10 µA, so waking once every five minutes can stretch a battery to months.
          </mark>
        </p>
      </div>
    );
  }
  if (mode === "PDF") {
    return (
      <div className={`${styles.previewBody} ${styles.previewPdf}`}>
        <div className={styles.pdfPage} aria-hidden="true">
          <span />
          <span />
          <span className={styles.pdfMark} />
          <span />
          <span />
          <span className={styles.pdfShort} />
        </div>
        <div>
          <p className={styles.previewTitle}>Greenhouse grant guidelines.pdf</p>
          <p className={styles.previewMeta}>38 pages, every word searchable</p>
          <p>Kept found the deadline, 14 March, and added it to your daily note.</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.previewBody}>
      <p className={styles.previewTitle}>Call with Mara</p>
      <div className={styles.wave} aria-hidden="true">
        {BARS.map((b, i) => (
          <span key={i} style={{ height: `${b}px`, animationDelay: `${(i % 8) * 90}ms` }} />
        ))}
      </div>
      <p>&ldquo;The sensors are draining in about three weeks. Can we try sleep mode between readings?&rdquo;</p>
      <p className={styles.previewMeta}>0:42, transcribed in 3 seconds</p>
    </div>
  );
}

export default function CaptureTabs() {
  const [mode, setMode] = useState<Mode>("Voice memo");
  const id = useId();

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const i = MODES.indexOf(mode);
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = MODES[(i + (e.key === "ArrowRight" ? 1 : MODES.length - 1)) % MODES.length];
      setMode(next);
      document.getElementById(`${id}-${MODES.indexOf(next)}`)?.focus();
    }
  }

  return (
    <div className={styles.captureTool}>
      <div role="tablist" aria-label="Capture type" className={styles.segmented} onKeyDown={onKey}>
        {MODES.map((m, i) => (
          <button
            key={m}
            id={`${id}-${i}`}
            role="tab"
            type="button"
            aria-selected={m === mode}
            aria-controls={`${id}-panel`}
            tabIndex={m === mode ? 0 : -1}
            className={styles.segment}
            onClick={() => setMode(m)}
          >
            {m}
          </button>
        ))}
      </div>
      <div
        className={styles.capturePanel}
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-${MODES.indexOf(mode)}`}
      >
        <div className={styles.captureBar}>
          <kbd className={styles.kbd}>⌥</kbd>
          <kbd className={styles.kbd}>Space</kbd>
          <span className={styles.captureHint}>Quick capture, from any app</span>
        </div>
        <div key={mode} className={styles.previewSwap}>
          <Preview mode={mode} />
        </div>
      </div>
    </div>
  );
}
