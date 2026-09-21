import type { Metadata } from "next";
import { Commissioner, Petrona } from "next/font/google";
import { StartButton } from "../components/start-button";
import styles from "./three.module.css";

const label = Commissioner({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const prose = Petrona({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Map",
  description:
    "Notes laid out by how they touch, with a trail from a chapter to the talk that came from it.",
};

export default function MapPage() {
  return (
    <main className={`${styles.page} ${label.className}`}>
      <svg
        className={styles.terrain}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g fill="none" stroke="#aeb9b0" strokeWidth="1.25">
          <path d="M-40 150 C 180 110, 360 210, 620 160 S 980 90, 1260 150" />
          <path d="M-40 210 C 200 170, 380 270, 650 220 S 1000 150, 1260 210" />
          <path d="M-40 280 C 220 240, 420 340, 700 290 S 1040 220, 1260 280" />
          <path d="M-40 470 C 160 430, 400 540, 680 480 S 1020 420, 1260 490" />
          <path d="M-40 540 C 180 500, 420 610, 720 550 S 1040 490, 1260 560" />
          <path d="M-40 620 C 200 580, 440 690, 760 630 S 1060 570, 1260 640" />
        </g>
      </svg>
      <div className={styles.wash} aria-hidden="true" />

      <div className={styles.stage}>
        <header className={styles.titleBlock}>
          <h1 className={styles.product}>Commonplace</h1>
          <p className={`${styles.deck} ${prose.className}`}>
            Notes from one spring, laid out by how they touch.
          </p>
          <StartButton
            className={`${styles.start} ${label.className}`}
            statusClassName={`${styles.status} ${prose.className}`}
            stackClassName={styles.action}
          />
        </header>

        <article className={`${styles.place} ${styles.morning}`}>
          <h2 className={styles.placeName}>Morning pages</h2>
          <p className={`${styles.placeDetail} ${prose.className}`}>
            Three lines before anything else.
          </p>
        </article>

        <article className={`${styles.place} ${styles.oranges}`}>
          <h2 className={styles.placeName}>The sad oranges</h2>
          <p className={`${styles.placeDetail} ${prose.className}`}>
            Soft, and still the best cake. Tied to the recipe card.
          </p>
        </article>

        <p className={`${styles.regionWrap} ${styles.region} ${prose.className}`}>
          Reading
        </p>

        <div className={styles.band}>
          <article className={`${styles.place} ${styles.chapter}`}>
            <h2 className={styles.placeName}>
              <span className={styles.mark} aria-hidden="true" />
              Chapter on attention
            </h2>
            <p className={`${styles.placeDetail} ${prose.className}`}>
              The Blue Book, page 41. Attention is a place you return to.
            </p>
          </article>

          <div>
            <svg
              className={styles.path}
              viewBox="0 0 160 72"
              aria-hidden="true"
            >
              <path
                d="M8 58 C 48 58, 70 18, 152 16"
                fill="none"
                stroke="#b8430f"
                strokeWidth="2.5"
              />
            </svg>
            <p className={`${styles.pathLabel} ${prose.className}`}>
              from the chapter
            </p>
          </div>

          <article className={`${styles.place} ${styles.talk}`}>
            <h2 className={styles.placeName}>
              <span className={styles.mark} aria-hidden="true" />
              Talk I want to give
            </h2>
            <p className={`${styles.placeDetail} ${prose.className}`}>
              The chapter, said out loud.
            </p>
          </article>
        </div>

        <article className={`${styles.place} ${styles.nia}`}>
          <h2 className={styles.placeName}>Call with Nia</h2>
          <p className={`${styles.placeDetail} ${prose.className}`}>
            She finds a thought by the chair she was sitting in.
          </p>
        </article>
      </div>
    </main>
  );
}
