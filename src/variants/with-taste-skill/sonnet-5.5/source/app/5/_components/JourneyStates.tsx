import styles from "./fragments.module.css";
import { QUESTIONS, ask, noteById, slug } from "./data";
import NoteMap from "./NoteMap";

const MAYA = noteById("interview-maya");

const DAYS = [1, 3, 7, 21, 60] as const;
const fmt = (offset: number) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(Date.UTC(2026, 2, 14 + offset)),
  );

/** Stage 1: the capture window, with Maya's sentence typed into it. */
export function CaptureState() {
  return (
    <div className={styles.frag} data-ui>
      <div className={styles.fh}>
        <span>Capture</span>
        <span className={styles.right}>14 March</span>
      </div>
      <p className={styles.capText}>
        Maya stopped using her old app because she could not find anything. “I wrote it down. I just can’t say where.”
      </p>
      <div className={styles.capRow}>
        <span style={{ flex: 1 }}>Enter saves. Esc closes.</span>
        <span className={styles.btn} aria-hidden="true">
          Save note
        </span>
      </div>
      <div className={styles.capSaved}>Saved as {slug(MAYA.title)}.md</div>
      <div className={styles.sugRow}>
        <span className={styles.muted} style={{ width: "100%" }}>
          Suggested links
        </span>
        <span className={styles.sugChip}>Spaced repetition</span>
        <span className={styles.sugChip}>Trust comes from being able to leave</span>
      </div>
    </div>
  );
}

/** Stage 2: the map, with the new note joined to what it belongs with. */
export function LinkState() {
  return <NoteMap focus="interview-maya" />;
}

/** Stage 3: the five days it came back. */
export function ReturnState() {
  return (
    <div className={styles.frag} data-ui>
      <div className={styles.fh}>
        <span>Resurface</span>
        <span className={styles.right}>{MAYA.title}</span>
      </div>
      <ul className={styles.rows}>
        {DAYS.map((d, i) => (
          <li key={d} className={styles.ret}>
            <b>{fmt(d)}</b>
            <span className={styles.retDay}>Day {d}</span>
            <span className={styles.retOk}>{i === DAYS.length - 1 ? "Learned" : "Remembered"}</span>
          </li>
        ))}
        <li className={styles.ret}>
          <b>23 Oct</b>
          <span className={styles.retDay}>Day 223</span>
          <span className={styles.muted}>Not due. It waits to be asked for.</span>
        </li>
      </ul>
      <div className={styles.capSaved}>Five visits in 60 days. After that, only when you ask.</div>
    </div>
  );
}

/** Stage 4: the question, seven months later. */
export function AskState() {
  const a = ask(QUESTIONS[0]);
  return (
    <div className={styles.frag} data-ui>
      <div className={styles.fh}>
        <span>Ask your notes</span>
        <span className={styles.right}>23 October</span>
      </div>
      <div className={styles.answer}>
        <p className={styles.aq}>{a.question}</p>
        <p className={styles.atext}>
          {a.parts.map((p, i) =>
            typeof p === "number" ? (
              <sup key={i} className={styles.fn}>
                {p}
              </sup>
            ) : (
              <span key={i}>{p}</span>
            ),
          )}
        </p>
        <ol className={styles.sources}>
          {a.sources.map((s, i) => (
            <li key={s.id} className={styles.source}>
              <span className={styles.fn}>{i + 1}</span>
              <span>
                <span className={styles.sourceTitle}>{noteById(s.id).title}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
