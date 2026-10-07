import { Barlow } from "next/font/google";
import { FloorPlan } from "./floor-plan";
import styles from "@/variants/with-design-skill/haiku-5-5/source/app/3/plan.module.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

export default function FloorPlanPage() {
  return (
    <div className={`${barlow.variable} ${styles.page}`}>
      <header className={styles.header}>
        <span className={styles.wordmark}>Loam</span>
        <a className={styles.quietLink} href="#">
          Log in
        </a>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="plan-title">
          <div className={styles.heroText}>
            <h1 id="plan-title" className={styles.h1}>
              Give every idea a room.
            </h1>
            <p className={styles.lead}>
              Loam arranges your notes the way you already know how to find
              things in a house. Nothing needs filing before you can keep it.
              The hallway holds what arrives, and the attic keeps what you have
              not opened in years.
            </p>
            <a className={styles.primary} href="#">
              Move your notes in
            </a>
          </div>

          <FloorPlan />
        </section>

        <section className={styles.block} aria-labelledby="hall-title">
          <h2 id="hall-title" className={styles.h2}>
            Hallway, where things arrive
          </h2>
          <p>
            Captures land in the hallway from the web, voice, and email. You
            can read them there, file them into a room, or leave them until you
            need them. Unfiled notes are still searchable from the start.
          </p>
        </section>

        <section className={styles.block} aria-labelledby="doors-title">
          <h2 id="doors-title" className={styles.h2}>
            Doors, where ideas connect
          </h2>
          <p>
            A dashed corridor appears when one note links to another, even when
            the two live in different rooms. Open a room and you see the doors
            that lead out of it, so the kitchen and the study can share a
            question.
          </p>
        </section>

        <section className={styles.block} aria-labelledby="attic-title">
          <h2 id="attic-title" className={styles.h2}>
            Attic, where old notes wait
          </h2>
          <p>
            Notes you have not opened in a while move up to the attic. When a
            project in the workshop needs them, they come back down the stairs
            with the date they were written still on them.
          </p>
        </section>

        <section className={styles.quote} aria-label="Reader quote">
          <blockquote>
            <p>
              I stopped searching for my notes. I know which room the idea
              lives in, so I just walk there.
            </p>
            <footer>Reader, placeholder copy</footer>
          </blockquote>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <h2 id="closing-title" className={styles.h2}>
            Your first room is free to set up
          </h2>
          <p>Start in the hallway. You can build the rest of the house later.</p>
          <a className={styles.primary} href="#">
            Move your notes in
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Loam. Floor plan, not to scale.</span>
        <a href="#">Export your notes</a>
      </footer>
    </div>
  );
}
