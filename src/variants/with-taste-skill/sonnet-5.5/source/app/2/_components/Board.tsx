import { NOTES, NOTE_BY_ID, RESURFACE_DAYS } from "../../_shared/facts";

/** The notes that link to the note shown in the Connect tile, straight from the sample notes. */
const BACKLINK_IDS = NOTES.filter((n) => n.links.includes("interview-maya")).map((n) => n.id);
import s from "../p2.module.css";

/*
 * "Inside Engram": eight macro views of the real interface, each one small
 * element built in em and enlarged through the font-size of its data-ui root.
 * Two edges of every tile crop it.
 */

function Tile({
  className,
  tone,
  name,
  line,
  d,
  children,
}: {
  className: string;
  tone: "ink" | "surface" | "muted" | "tone";
  name: string;
  line: string;
  d: number;
  children: React.ReactNode;
}) {
  return (
    <article
      className={`${s.tile} ${s[`tile_${tone}`]} ${className}`}
      data-rv=""
      style={{ ["--d" as string]: d }}
    >
      <div className={s.tileArt} data-ui>
        {children}
      </div>
      <div className={s.tileCap}>
        <h3 className={s.tileName}>{name}</h3>
        <p className={s.tileLine}>{line}</p>
      </div>
    </article>
  );
}

export function Board() {
  return (
    <section className={s.board} id="features" aria-labelledby="features-h">
      <div className={`${s.tile} ${s.tileHead}`}>
        <h2 id="features-h" className={s.head} data-rv="" style={{ ["--d" as string]: 0 }}>
          Inside Engram
        </h2>
      </div>

      <Tile className={s.tSearch} tone="ink" name="Recall" line="Search by meaning, not by the words you typed." d={1}>
        <div className={s.uiSearch}>
          <span className={s.uiSearchText}>what did Maya say about pricing in March</span>
          <span className={s.uiCaret} />
        </div>
      </Tile>

      <Tile className={s.tKeys} tone="surface" name="Capture" line="A new note in under a second, from any app." d={2}>
        <div className={s.uiKeys}>
          <div className={s.uiKeyRow}>
            <kbd>⌥</kbd>
            <kbd>Space</kbd>
          </div>
          <div className={s.uiNew}>
            Untitled<span className={s.uiCaret} />
          </div>
        </div>
      </Tile>

      <Tile className={s.tLink} tone="muted" name="Connect" line="Every link works both ways." d={3}>
        <div className={s.uiLink}>
          <span className={s.uiBr}>[[</span>
          <span className={s.uiLinkText}>Maya</span>
          <span className={s.uiBr}>]]</span>
          <span className={s.uiBack}>3 notes link here</span>
          <ul className={s.uiRefs}>
            {BACKLINK_IDS.map((id) => (
              <li key={id}>{NOTE_BY_ID[id].title}</li>
            ))}
          </ul>
        </div>
      </Tile>

      <Tile className={s.tSlider} tone="ink" name="Resurface" line="Old notes return after 1, 3, 7, 21 and 60 days." d={4}>
        <div className={s.uiSlider}>
          <span className={s.uiTrack}>
            {RESURFACE_DAYS.map((d) => (
              <span key={d} className={s.uiStop} />
            ))}
            <span className={s.uiThumb} />
          </span>
          <span className={s.uiDays}>
            {RESURFACE_DAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </span>
          <span className={s.uiDue}>
            <b>Back today</b>
            <span>{NOTE_BY_ID.spacing.title}</span>
          </span>
        </div>
      </Tile>

      <Tile className={s.tAsk} tone="surface" name="Ask your notes" line="Answers cite their notes. Off until you switch it on." d={5}>
        <div className={s.uiToggle}>
          <span className={s.uiSwitch}>
            <span className={s.uiKnob} />
          </span>
        </div>
      </Tile>

      <Tile className={s.tSync} tone="tone" name="Sync" line="End-to-end encrypted. We cannot read your notes." d={6}>
        <div className={s.uiStatus}>
          Encrypted
        </div>
      </Tile>

      <Tile className={s.tFile} tone="ink" name="Own" line="Plain Markdown files, in a folder on your disk." d={7}>
        <div className={s.uiFile}>
          maya<span>.md</span>
        </div>
      </Tile>

      <Tile className={s.tVoice} tone="muted" name="Voice memo" line="Written out on your device, never uploaded." d={8}>
        <div className={s.uiVoice}>
          <span className={s.uiTime}>0:42</span>
        </div>
      </Tile>
    </section>
  );
}
