import { NOTE_BY_ID, SAMPLE_QUESTION } from "../../_shared/facts";
import { ADDR } from "../addresses";
import s from "./fragments.module.css";

/** Small, true pieces of the product, one per job. Static, marked data-ui. */

export function CaptureFragment() {
  const rows = [
    ["Call the dentist about the crown", "Option+Space", "9:41"],
    ["Fwd: Lisbon, train times", "Email", "9:12"],
    ["The slip box and its numbers", "Web clipper", "Mon"],
    ["Idea for the pricing page", "Voice memo", "Mon"],
    ["Whiteboard, Thursday’s meeting", "Photo, text read out", "Thu"],
    ["Recipe: sourdough, what worked", "Share sheet", "Thu"],
  ];
  return (
    <div className={s.frag} data-ui>
      <p className={s.fh}>Inbox</p>
      <ul className={s.rows}>
        {rows.map(([t, how, when]) => (
          <li key={t}>
            <span className={s.rt}>{t}</span>
            <span className={s.rs}>{how}</span>
            <span className={s.rw}>{when}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConnectFragment() {
  const from = ["interview-maya", "pricing", "files"];
  return (
    <div className={s.frag} data-ui>
      <p className={s.fh}>
        Trust comes from being able to leave <span>{ADDR.trust}</span>
      </p>
      <p className={s.fm}>Linked from {from.length} cards</p>
      <ul className={s.rows}>
        {from.map((id) => (
          <li key={id}>
            <span className={s.ra}>{ADDR[id]}</span>
            <span className={s.rt}>{NOTE_BY_ID[id].title}</span>
          </li>
        ))}
      </ul>
      <p className={`${s.fm} ${s.gap}`}>Nothing points to these yet</p>
      <ul className={s.rows}>
        {["lisbon", "sourdough"].map((id) => (
          <li key={id}>
            <span className={s.ra}>{ADDR[id]}</span>
            <span className={s.rt}>{NOTE_BY_ID[id].title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RecallFragment() {
  return (
    <div className={s.frag} data-ui>
      <p className={s.ask}>{SAMPLE_QUESTION.q}</p>
      <p className={s.ans}>{SAMPLE_QUESTION.a}</p>
      <ul className={s.src}>
        {SAMPLE_QUESTION.sources.map((id) => (
          <li key={id}>
            <span className={s.ra}>{ADDR[id]}</span>
            {NOTE_BY_ID[id].title}
          </li>
        ))}
      </ul>
      <p className={`${s.fm} ${s.gap}`}>Coming back today</p>
      <ul className={s.rows}>
        {[
          ["forgetting", "Day 7"],
          ["atomic", "Day 3"],
          ["pricing", "Day 21"],
        ].map(([id, day]) => (
          <li key={id}>
            <span className={s.rt}>{NOTE_BY_ID[id].title}</span>
            <span className={s.rs}>{ADDR[id]}</span>
            <span className={s.rw}>{day}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function OwnFragment() {
  return (
    <div className={s.frag} data-ui>
      <p className={s.fh}>Engram/Things I read/</p>
      <pre className={s.code}>
        <code>{`21-3-the-forgetting-curve.md
21-3a-spaced-repetition.md
21-3a1-retrieval-beats-rereading.md
21-4-luhmanns-slip-box.md
21-4a-one-idea-per-note.md
7-2-interview-with-maya.md

# The forgetting curve
Most of what we learn is gone within a week
unless we return to it. See [[Spaced repetition]].`}</code>
      </pre>
    </div>
  );
}
