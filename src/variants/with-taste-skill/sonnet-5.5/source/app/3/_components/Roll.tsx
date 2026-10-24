import styles from "../p3.module.css";

/** A figure that rises from behind its own baseline once, as it comes into view. */
export function Roll({ value, delay = 0 }: { value: string; delay?: number }) {
  return (
    <span
      className={styles.riseMask}
      data-roll
      style={{ ["--ri" as string]: delay }}
    >
      <span className={styles.riseIn}>{value}</span>
    </span>
  );
}
