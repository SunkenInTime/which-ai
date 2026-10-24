import styles from "./fragments.module.css";
import { DEMO_NOTES, MAP_POS, edges, noteById, outgoing } from "./data";

const SHORT: Record<string, string> = {
  forgetting: "Forgetting curve",
  spacing: "Spaced repetition",
  retrieval: "Retrieval",
  slipbox: "Slip box",
  atomic: "One idea",
  writing: "Writing",
  pricing: "Pricing",
  "interview-maya": "Maya, 14 March",
  trust: "Trust",
  files: "Plain text",
  shelf: "Kitchen shelf",
  oak: "Oak finish",
  lisbon: "Lisbon",
  sourdough: "Sourdough",
};

/** Label placement per node: where the words sit so no two collide. */
const LABEL: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  forgetting: { dx: 0, dy: 26, anchor: "middle" },
  spacing: { dx: 0, dy: 26, anchor: "middle" },
  retrieval: { dx: 0, dy: 26, anchor: "middle" },
  slipbox: { dx: 0, dy: -16, anchor: "middle" },
  atomic: { dx: 0, dy: -16, anchor: "middle" },
  writing: { dx: 0, dy: -16, anchor: "middle" },
  pricing: { dx: 16, dy: 5, anchor: "start" },
  "interview-maya": { dx: 0, dy: 28, anchor: "middle" },
  trust: { dx: 16, dy: 5, anchor: "start" },
  files: { dx: -16, dy: 5, anchor: "end" },
  shelf: { dx: 0, dy: 26, anchor: "middle" },
  oak: { dx: 0, dy: 26, anchor: "middle" },
  lisbon: { dx: 0, dy: 26, anchor: "middle" },
  sourdough: { dx: 0, dy: 26, anchor: "middle" },
};

/** The map of the sample second brain, with one note lit and its neighbours drawn in the one hue. */
export default function NoteMap({ focus = "interview-maya" }: { focus?: string }) {
  const notes = DEMO_NOTES;
  const e = edges(notes);
  const near = new Set(outgoing(noteById(focus).body, notes).map((n) => n.id));
  notes.forEach((n) => outgoing(n.body, notes).some((o) => o.id === focus) && near.add(n.id));
  const linked = new Set(e.flat());
  const lone = notes.filter((n) => !linked.has(n.id));

  return (
    <div className={styles.frag} data-ui>
      <div className={styles.fh}>
        <span>Map</span>
        <span className={styles.count}>{notes.length} notes</span>
        <span className={styles.right}>{noteById(focus).title}</span>
      </div>
      <div className={styles.mapWrap}>
        <svg className={styles.map} viewBox="0 0 460 360" role="img" aria-label={`Map of ${notes.length} notes. ${noteById(focus).title} is linked to ${near.size} others.`}>
          {e.map(([a, b]) => {
            const [x1, y1] = MAP_POS[a];
            const [x2, y2] = MAP_POS[b];
            const on = a === focus || b === focus;
            return <line key={a + b} className={styles.edge} data-on={on || undefined} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
          {notes.map((n) => {
            const [x, y] = MAP_POS[n.id];
            const l = LABEL[n.id];
            const isFocus = n.id === focus;
            const isNear = near.has(n.id);
            const isLone = !linked.has(n.id);
            return (
              <g
                key={n.id}
                className={styles.node}
                data-on={isFocus || undefined}
                data-near={isNear || undefined}
                data-lone={isLone || undefined}
                data-dim={!isFocus && !isNear || undefined}
              >
                <circle cx={x} cy={y} r={isFocus ? 10 : 7} />
                <text x={x + l.dx} y={y + l.dy} textAnchor={l.anchor}>
                  {SHORT[n.id]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className={styles.mapNote}>
        <span>
          {near.size} notes connect to this one.
        </span>
        <span>{lone.length} notes have no links yet.</span>
      </div>
    </div>
  );
}
