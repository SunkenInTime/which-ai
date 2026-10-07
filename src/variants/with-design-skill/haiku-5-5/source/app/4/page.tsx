import { Zilla_Slab } from "next/font/google";
import { Shelf } from "./shelf";
import styles from "@/variants/with-design-skill/haiku-5-5/source/app/4/pantry.module.css";

const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zilla",
});

export default function PantryPage() {
  return (
    <div className={`${zilla.variable} ${styles.page}`}>
      <header className={styles.header}>
        <span className={styles.wordmark}>Loam</span>
        <a className={styles.quietLink} href="#">
          Log in
        </a>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="pantry-title">
          <h1 id="pantry-title" className={styles.h1}>
            Put it up. Find it in February.
          </h1>
          <p className={styles.lead}>
            Loam keeps your notes the way a good pantry keeps food: labeled,
            dated, and easy to reach when the season changes. Capture what you
            have now, and open it when you need it.
          </p>
          <a className={styles.primary} href="#">
            Start your shelf
          </a>
        </section>

        <Shelf />

        <section className={styles.block} aria-labelledby="capture-title">
          <h2 id="capture-title" className={styles.h2}>
            Fill the jar when you have it
          </h2>
          <p>
            Clip a page, speak a line, or type a sentence. It goes on the shelf
            with today&rsquo;s date and nothing else to fill in. You can label
            it later, or never.
          </p>
        </section>

        <section className={styles.block} aria-labelledby="connect-title">
          <h2 id="connect-title" className={styles.h2}>
            Keep like things together
          </h2>
          <p>
            Notes that belong together sit side by side. Loam links them as you
            write, so the brine ratios and the fermentation paper are one shelf
            apart without any sorting on your part.
          </p>
        </section>

        <section className={styles.block} aria-labelledby="resurface-title">
          <h2 id="resurface-title" className={styles.h2}>
            Check the back of the pantry
          </h2>
          <p>
            Loam notices what has sat on the shelf the longest and brings it
            forward. The date stays on the label, so you always know how old a
            note is before you decide to use it.
          </p>
          <ul className={styles.oldest} aria-label="Oldest notes on the shelf">
            <li>
              <span>Brine ratios</span>
              <span>Last opened March 2022</span>
            </li>
            <li>
              <span>Lisbon in May</span>
              <span>Last opened June 2023</span>
            </li>
            <li>
              <span>Dal without soaking</span>
              <span>Last opened January 2025</span>
            </li>
          </ul>
        </section>

        <section className={styles.quote} aria-label="Reader quote">
          <blockquote>
            <p>
              Every autumn I find something I wrote in spring and had completely
              forgotten. It is like finding a jar at the back of the cupboard.
            </p>
            <footer>Reader, placeholder copy</footer>
          </blockquote>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <h2 id="closing-title" className={styles.h2}>
            Start the shelf this week
          </h2>
          <p>Fill one jar. You will want a second one by the weekend.</p>
          <a className={styles.primary} href="#">
            Start your shelf
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Loam. Labeled, dated, and easy to reach.</span>
        <a href="#">Export your notes</a>
      </footer>
    </div>
  );
}
