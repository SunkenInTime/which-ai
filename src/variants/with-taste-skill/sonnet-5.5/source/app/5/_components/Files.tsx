import styles from "./fragments.module.css";
import { DEMO_NOTES, noteById, slug } from "./data";

const SHOW = ["interview-maya", "pricing", "trust", "spacing", "forgetting", "shelf"];
const WHEN: Record<string, string> = {
  "interview-maya": "14 Mar",
  pricing: "6 Apr",
  trust: "26 Apr",
  spacing: "15 Sep",
  forgetting: "12 Sep",
  shelf: "11 Oct",
};

const bytes = (s: string) => new TextEncoder().encode(s).length;
const kb = (n: number) => (n < 1000 ? `${n} B` : `${(n / 1000).toFixed(1)} KB`);

export default function Files() {
  const maya = noteById("interview-maya");
  return (
    <div className={styles.frag} data-ui>
      <div className={styles.fh}>
        <span>~/Engram</span>
        <span className={styles.count}>{DEMO_NOTES.length} files</span>
        <span className={styles.right}>Any editor opens them</span>
      </div>
      <ul className={styles.files}>
        {SHOW.map((id) => {
          const n = noteById(id);
          return (
            <li key={id} className={styles.file} data-open={id === "interview-maya" ? "" : undefined}>
              <span>{slug(n.title)}.md</span>
              <span className={styles.size}>{kb(bytes(n.body))}</span>
              <span className={styles.when}>{WHEN[id]}</span>
            </li>
          );
        })}
      </ul>
      <pre className={styles.src}>
        <code>
          <span className={styles.y}>{`---\ntitle: ${maya.title}\ncreated: 2026-03-14\n---\n\n`}</span>
          {maya.body.split("\n\n")[0]}
        </code>
      </pre>
    </div>
  );
}
