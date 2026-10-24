"use client";

import { useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { PRODUCT } from "../../_shared/facts";
import s from "../p4.module.css";
import { SkyVideo } from "./SkyVideo";

const VIDEO = [
  { src: "/variants/with-taste-skill/sonnet-5.5/p4/milky-way-glen-canyon.webm", type: "video/webm" },
  { src: "/variants/with-taste-skill/sonnet-5.5/p4/milky-way-glen-canyon.mp4", type: "video/mp4" },
];
const POSTER = "/variants/with-taste-skill/sonnet-5.5/p4/milky-way-glen-canyon-poster.jpg";

/** Brighter stars have lower magnitudes; here brightness is stroke weight. */
const weightFromMagnitude = (m: number) => Math.round(600 - (m - 1) * 80);

const fmt = (n: number, d = 2) => n.toFixed(d).replace("-", "−");

export function Hero() {
  const [mag, setMag] = useState(4.75); // weight 300, the display weight
  const [spread, setSpread] = useState(-0.05);
  const [caps, setCaps] = useState(false);
  const h1 = useRef<HTMLHeadingElement>(null);
  const capsId = useId();

  // Keep both lines inside the page margins whatever the controls are set to.
  useLayoutEffect(() => {
    const el = h1.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const fit = () => {
      el.style.setProperty("--fit", "1");
      const avail = box.clientWidth;
      const widest = Math.max(
        ...Array.from(el.querySelectorAll<HTMLElement>("[data-measure]")).map((m) => m.offsetWidth),
      );
      el.style.setProperty("--fit", widest > avail ? String(Math.floor((avail / widest) * 1000) / 1000) : "1");
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [mag, spread, caps]);

  const h1Style = {
    "--w": weightFromMagnitude(mag),
    "--ls": `${spread}em`,
    "--tt": caps ? "uppercase" : "none",
  } as CSSProperties;

  return (
    <header className={s.hero} id="top">
      <nav className={s.nav} aria-label="Main">
        <a className={s.mark} href="#top">
          Engram
        </a>
        <ul className={s.links}>
          <li><a href="#map">Map</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#questions">Questions</a></li>
        </ul>
        <a className={`${s.btn} ${s.btnNav}`} href={PRODUCT.primaryHref}>
          {PRODUCT.primaryAction}
        </a>
      </nav>

      <div className={s.heroBody}>
        <h1 className={s.h1} ref={h1} style={h1Style}>
          <span className={s.line}>
            <span data-line style={{ "--i": 0 } as CSSProperties}>
              <span className={s.measure} data-measure>Everything you know</span>
            </span>
          </span>
          <span className={s.line}>
            <span data-line style={{ "--i": 1 } as CSSProperties}>
              <span className={s.measure} data-measure>
                under one{" "}
                <span className={s.slot}>
                  <SkyVideo className={s.slotVideo} width={1280} height={720} poster={POSTER} sources={VIDEO} />
                  <span className={s.sr}>sky</span>
                </span>
              </span>
            </span>
          </span>
        </h1>

        <div className={s.heroUnder}>
          <div className={s.heroCopy}>
            <p className={s.support} data-load style={{ "--d": "520ms" } as CSSProperties}>
              Engram is a note-taking app that works as a second brain. Capture anything, draw the links
              between it all, and it comes back when it matters.
            </p>
            <div className={s.actions} data-load style={{ "--d": "620ms" } as CSSProperties}>
              <a className={s.btn} href={PRODUCT.primaryHref}>
                {PRODUCT.primaryAction}
              </a>
              <a className={s.textLink} href="#map">
                See the map
              </a>
            </div>
          </div>

          <div className={s.chips} role="group" aria-label="Try the headline: magnitude, spread, capitals">
            <label className={s.chip} data-ui data-load style={{ "--tilt": "-2.5deg", "--d": "700ms" } as CSSProperties}>
              <span className={s.chipTop}>
                <span>Magnitude</span>
                <output className={s.readout}>{fmt(mag)}</output>
              </span>
              <input
                className={s.range}
                type="range"
                min={1}
                max={6}
                step={0.25}
                value={mag}
                onChange={(e) => setMag(Number(e.target.value))}
                aria-label="Magnitude: lower is brighter and heavier"
              />
            </label>

            <label className={s.chip} data-ui data-load style={{ "--tilt": "2deg", "--d": "780ms" } as CSSProperties}>
              <span className={s.chipTop}>
                <span>Spread</span>
                <output className={s.readout}>{fmt(spread)}em</output>
              </span>
              <input
                className={s.range}
                type="range"
                min={-0.07}
                max={0.04}
                step={0.01}
                value={spread}
                onChange={(e) => setSpread(Number(e.target.value))}
                aria-label="Spread: letter spacing of the headline"
              />
            </label>

            <div className={`${s.chip} ${s.chipSwitch}`} data-ui data-load style={{ "--tilt": "-1.5deg", "--d": "860ms" } as CSSProperties}>
              <span className={s.chipTop} id={capsId}>
                <span>Atlas capitals</span>
                <output className={s.readout}>{caps ? "On" : "Off"}</output>
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={caps}
                aria-labelledby={capsId}
                className={s.switchBtn}
                onClick={() => setCaps((v) => !v)}
              >
                <span className={s.knob} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
