import ui from "../ui.module.css";

/* Interface fragments of Engram, built in HTML at true size. Each root carries data-ui. */

export function CaptureCall() {
  return (
    <div className={ui.frag} data-ui>
      <div className={ui.bar}>
        <span className={ui.barTitle}>New note</span>
        <span className={ui.keys}>
          <kbd>Option</kbd>
          <kbd>Space</kbd>
        </span>
      </div>
      <div className={ui.editor}>
        <p className={ui.typed}>
          Luhmann’s slip box: about 90,000 index cards, each with a number,
          each pointing to its neighbours.
          <span className={ui.caret} aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}

export function SavedResponse() {
  return (
    <div className={ui.frag} data-ui>
      <div className={ui.bar}>
        <span className={ui.barTitle}>luhmanns-slip-box.md</span>
        <span className={ui.meta}>Saved just now</span>
      </div>
      <div className={ui.editor}>
        <h4 className={ui.noteTitle}>Luhmann’s slip box</h4>
        <p className={ui.body}>
          About 90,000 index cards, each with a number, each pointing to its
          neighbours.
        </p>
      </div>
      <div className={ui.suggest}>
        <p className={ui.suggestHead}>Engram suggests linking to</p>
        <ul className={ui.chips}>
          <li>
            <span>Writing starts from notes</span>
            <button type="button" className={ui.chipBtn}>
              Link
            </button>
          </li>
          <li>
            <span>One idea per note</span>
            <button type="button" className={ui.chipBtn}>
              Link
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function LinkCall() {
  return (
    <div className={ui.frag} data-ui>
      <div className={ui.bar}>
        <span className={ui.barTitle}>The forgetting curve</span>
        <span className={ui.meta}>Editing</span>
      </div>
      <div className={ui.editor}>
        <p className={ui.typed}>
          Return to an idea at widening intervals and the curve flattens. See{" "}
          <span className={ui.typedLink}>[[spa</span>
          <span className={ui.caret} aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}

export function PickerResponse() {
  return (
    <div className={ui.frag} data-ui>
      <ul className={ui.menu} role="listbox" aria-label="Notes matching spa">
        <li className={ui.menuOn} role="option" aria-selected="true">
          <span>Spaced repetition</span>
          <span className={ui.meta}>38 days ago</span>
        </li>
        <li role="option" aria-selected="false">
          <span>Spaces in file names</span>
          <span className={ui.meta}>2 years ago</span>
        </li>
        <li role="option" aria-selected="false">
          <span>Spain, train times</span>
          <span className={ui.meta}>1 year ago</span>
        </li>
      </ul>
      <div className={ui.backlinks}>
        <p className={ui.backHead}>Spaced repetition is linked from 3 notes</p>
        <ul className={ui.backList}>
          <li>The forgetting curve</li>
          <li>Retrieval beats rereading</li>
          <li>Interview with Maya, 14 March</li>
        </ul>
      </div>
    </div>
  );
}

export function ResurfaceCall() {
  return (
    <div className={ui.frag} data-ui>
      <div className={ui.bar}>
        <span className={ui.barTitle}>Settings</span>
        <span className={ui.meta}>Resurface</span>
      </div>
      <div className={ui.setting}>
        <div>
          <p className={ui.settingName}>Bring old notes back</p>
          <p className={ui.meta}>Five notes a day at most.</p>
        </div>
        <span className={ui.switch} role="img" aria-label="On">
          <span />
        </span>
      </div>
    </div>
  );
}

const BACK = [
  { t: "Luhmann’s slip box", w: "Written yesterday", n: "Back again on day 3" },
  { t: "One idea per note", w: "Written 3 days ago", n: "Back again on day 7" },
  { t: "Retrieval beats rereading", w: "Written 7 days ago", n: "Back again on day 21" },
  {
    t: "Pricing idea: charge for sync, not for notes",
    w: "Written 21 days ago",
    n: "Back again on day 60",
  },
  { t: "Interview with Maya, 14 March", w: "Written 60 days ago", n: "Last return" },
];

export function ResurfaceResponse() {
  return (
    <div className={ui.frag} data-ui>
      <div className={ui.bar}>
        <span className={ui.barTitle}>Back today</span>
        <span className={ui.meta}>5 notes</span>
      </div>
      <ul className={ui.rows}>
        {BACK.map((r, i) => (
          <li key={r.t} className={i === 2 ? ui.rowOn : undefined}>
            <div>
              <p className={ui.rowTitle}>{r.t}</p>
              <p className={ui.meta}>{r.w}</p>
            </div>
            <p className={ui.rowNext}>{r.n}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* The plate: one note, opened up, in six parts. Rows are separate cells so the margin notes can sit level with them. */

export const PANEL_ROWS = [
  "title",
  "body",
  "suggest",
  "back",
  "resurface",
  "ask",
] as const;

export function PanelCell({ row }: { row: (typeof PANEL_ROWS)[number] }) {
  switch (row) {
    case "title":
      return (
        <>
          <p className={ui.file}>forgetting-curve.md</p>
          <h4 className={ui.panelTitle}>The forgetting curve</h4>
          <p className={ui.meta}>Written 41 days ago</p>
        </>
      );
    case "body":
      return (
        <p className={ui.panelBody}>
          Ebbinghaus, 1885: most of what we learn is gone within a week unless
          we return to it. The loss is steepest in the first hour. The fix is{" "}
          <span className={ui.wiki}>Spaced repetition</span>, and the test is{" "}
          <span className={ui.wiki}>Retrieval beats rereading</span>.
        </p>
      );
    case "suggest":
      return (
        <div className={ui.panelSuggest}>
          <p className={ui.suggestHead}>Suggested link</p>
          <div className={ui.suggestRow}>
            <span>Luhmann’s slip box</span>
            <span className={ui.btnPair}>
              <button type="button" className={ui.chipBtn}>
                Link
              </button>
              <button type="button" className={ui.ghostBtn}>
                Ignore
              </button>
            </span>
          </div>
        </div>
      );
    case "back":
      return (
        <>
          <p className={ui.backHead}>Linked from 3 notes</p>
          <ul className={ui.backList}>
            <li>Spaced repetition</li>
            <li>Writing starts from notes</li>
            <li>Luhmann’s slip box</li>
          </ul>
        </>
      );
    case "resurface":
      return (
        <>
          <p className={ui.backHead}>Back on day 21, in 14 days</p>
          <ol className={ui.steps} aria-label="Return days 1, 3, 7, 21 and 60">
            {[1, 3, 7, 21, 60].map((d) => (
              <li
                key={d}
                className={d < 21 ? ui.stepDone : d === 21 ? ui.stepNext : undefined}
              >
                {d}
              </li>
            ))}
          </ol>
        </>
      );
    case "ask":
      return (
        <>
          <p className={ui.askQ}>Why did Maya leave her old app?</p>
          <p className={ui.askA}>
            She couldn’t find anything she had written. Price wasn’t the
            reason; she no longer trusted that her notes were retrievable.
          </p>
          <ul className={ui.sources}>
            <li>Interview with Maya, 14 March</li>
            <li>Trust comes from being able to leave</li>
          </ul>
        </>
      );
  }
}
