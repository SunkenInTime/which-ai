import Image from "next/image";
import { initialNotes } from "./editions";
import { Icon, Mark, type IconName } from "./icons";

export function NoteImage({ image, eager = false }: { image: "forest" | "coast"; eager?: boolean }) {
  const forest = image === "forest";

  return (
    <Image
      src={forest ? "/variants/with-taste-skill/sol-6-2/images/forest.webp" : "/variants/with-taste-skill/sol-6-2/images/coast.webp"}
      alt={forest ? "Sunlight reaching ferns in a cedar forest" : "A path above a Ligurian village beside the sea"}
      width={forest ? 1152 : 720}
      height={forest ? 768 : 1080}
      unoptimized
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
    />
  );
}

export function Chrome({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="mock-chrome">
      <span className="mock-dots" aria-hidden="true"><i /><i /><i /></span>
      <span>{label}</span>
      {children}
    </div>
  );
}

export function SidebarItem({ icon, children, active }: { icon: IconName; children: React.ReactNode; active?: boolean }) {
  return <div className={active ? "mock-sideitem is-active" : "mock-sideitem"}><Icon name={icon} size={15} />{children}</div>;
}

export function JournalPreview() {
  return (
    <div className="hero-visual hero__stage journal-stage" data-visual="" data-enter-media="" role="img" aria-label="Veybrin workspace showing an open journal entry and its linked notes">
      <div className="app-frame mock-window journal-window">
        <aside className="journal-sidebar">
          <div className="mock-brand"><Mark size={17} /> My notebook <Icon name="down" size={12} /></div>
          <SidebarItem icon="search">Find a note</SidebarItem>
          <SidebarItem icon="inbox">Inbox</SidebarItem>
          <SidebarItem icon="book" active>Field notes</SidebarItem>
          <SidebarItem icon="graph">Connections</SidebarItem>
          <p className="mock-group">Recent pages</p>
          <SidebarItem icon="note">The art of noticing</SidebarItem>
          <SidebarItem icon="note">The long way home</SidebarItem>
          <SidebarItem icon="note">Ideas from the margins</SidebarItem>
        </aside>
        <div className="journal-document">
          <div className="mock-crumb"><Icon name="book" size={14} /> Field notes <span>/</span> The art of noticing <Icon name="more" size={16} /></div>
          <div className="journal-content">
            <div className="mock-date"><Icon name="clock" size={14} /> April 12 <span className="mock-tag">Observation</span></div>
            <div className="mock-note-title">The art of noticing</div>
            <p>On the walk through the cedars, the light reached the ferns long before it touched the path.</p>
            <NoteImage image="forest" eager />
          </div>
        </div>
        <aside className="journal-links">
          <span className="mock-pane-title"><Icon name="link" size={15} /> Linked notes</span>
          <div className="journal-linked"><Icon name="note" size={15} /><span><strong>The long way home</strong><small>Field notes</small></span></div>
          <div className="journal-linked"><Icon name="note" size={15} /><span><strong>Ideas from the margins</strong><small>Reading</small></span></div>
          <div className="journal-linked"><Icon name="note" size={15} /><span><strong>Things to look up</strong><small>Inbox</small></span></div>
        </aside>
      </div>
    </div>
  );
}

const graphNodes = [
  { x: 50, y: 43, label: "The art of noticing", kind: "main" },
  { x: 23, y: 30, label: "The long way home", kind: "note" },
  { x: 75, y: 22, label: "Notes from the desk", kind: "note" },
  { x: 72, y: 62, label: "Ideas from the margins", kind: "note" },
  { x: 30, y: 72, label: "Things to look up", kind: "note" },
  { x: 45, y: 17, kind: "small" },
  { x: 59, y: 13, kind: "faint" },
  { x: 13, y: 51, kind: "small" },
  { x: 12, y: 19, kind: "faint" },
  { x: 31, y: 12, kind: "faint" },
  { x: 57, y: 76, kind: "small" },
  { x: 45, y: 86, kind: "faint" },
  { x: 84, y: 45, kind: "small" },
  { x: 90, y: 12, kind: "faint" },
  { x: 89, y: 76, kind: "faint" },
  { x: 67, y: 89, kind: "faint" },
  { x: 12, y: 77, kind: "faint" },
  { x: 33, y: 52, kind: "small" },
  { x: 94, y: 56, kind: "faint" },
  { x: 67, y: 38, kind: "small" },
  { x: 48, y: 64, kind: "small" },
  { x: 82, y: 88, kind: "faint" },
] as const;

const edges = [
  [0,1], [0,3], [0,4], [0,5], [0,17], [0,19], [0,20],
  [1,5], [1,7], [1,8], [1,9], [1,17], [2,5], [2,6], [2,12], [2,13],
  [2,19], [2,3], [2,4], [3,10], [3,12], [3,14], [3,15], [3,19], [3,21], [4,7], [4,11],
  [4,16], [4,17], [4,20], [5,6], [7,16], [10,11], [10,15], [10,20],
  [12,13], [12,18], [14,18], [14,21], [15,21],
];

export function NotesGraph() {
  return (
    <div className="notes-graph">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={graphNodes[a].x} y1={graphNodes[a].y} x2={graphNodes[b].x} y2={graphNodes[b].y} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {graphNodes.map((node, index) => (
        <div key={index} className={`graph-node graph-node--${node.kind}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
          <i />{"label" in node && <span>{node.label}</span>}
        </div>
      ))}
    </div>
  );
}

export function GraphPreview() {
  return (
    <div className="hero-visual hero__stage graph-stage" data-visual="" data-enter-media="" role="img" aria-label="Connections view with a graph linking a journal entry to reading, walking, and research notes">
      <div className="app-frame mock-window graph-window">
        <Chrome label="My notebook / Connections"><Icon name="focus" size={15} /></Chrome>
        <div className="graph-toolbar"><span><Icon name="graph" size={16} /> Connections</span><span><Icon name="layers" size={15} /> All notes</span></div>
        <NotesGraph />
        <div className="graph-detail">
          <span className="graph-detail__icon"><Icon name="note" size={19} /></span>
          <div><strong>The art of noticing</strong><small>Field notes · 3 linked pages</small></div>
          <Icon name="diagonal" size={15} />
        </div>
      </div>
    </div>
  );
}

export function ScratchPreview() {
  return (
    <div className="hero-visual hero__stage scratch-stage" data-visual="" data-enter-media="" role="img" aria-label="Veybrin inbox with a quick-capture note about something seen at the station">
      <div className="app-frame mock-window scratch-window">
        <Chrome label="My notebook / Inbox"><Icon name="more" size={16} /></Chrome>
        <div className="scratch-window__content">
          <div className="scratch-window__title"><Icon name="inbox" size={27} /><strong>Inbox</strong><span><Icon name="plus" size={17} /></span></div>
          {initialNotes.filter(({ collection }) => collection === "Inbox").map((note) => (
            <div key={note.id} className="scratch-row"><Icon name="note" size={17} /><div><strong>{note.title}</strong><small>{note.text}</small></div><span>{note.date}</span></div>
          ))}
          <div className="scratch-row"><Icon name="note" size={17} /><div><strong>Books to borrow</strong><small>Check the library shelf by the window.</small></div><span>Apr 11</span></div>
        </div>
      </div>
      <div className="scratch-composer">
        <div className="scratch-composer__top"><Icon name="plus" size={18} /> Quick capture <span>Inbox</span></div>
        <div className="scratch-composer__body">
          <strong>Things to look up</strong>
          <p>Why rain smells stronger on warm pavement.</p>
          <span className="scratch-caret" />
        </div>
        <div className="scratch-composer__footer">
          <span><Icon name="link" size={15} /> Link a note</span>
          <strong>Save note <Icon name="arrow" size={15} /></strong>
        </div>
      </div>
    </div>
  );
}

export function IndexPreview() {
  return (
    <div className="hero-visual hero__stage index-stage" data-visual="" data-enter-media="" role="img" aria-label="An open travel note about Liguria with a photograph and a linked packing list">
      <div className="app-frame index-dossier">
        <div className="index-dossier__top"><Mark size={17} /> <span>My notebook / Trips</span><Icon name="more" size={17} /></div>
        <div className="index-dossier__title">Liguria on foot</div>
        <NoteImage image="coast" eager />
        <div className="index-dossier__bottom"><Icon name="link" size={15} /> A weekend bag <Icon name="diagonal" size={15} /></div>
      </div>
      <div className="index-bookmark"><Icon name="book" size={18} /><span>Trips</span><Icon name="diagonal" size={15} /></div>
    </div>
  );
}

export function SearchPreview() {
  return (
    <div className="hero-visual hero__stage recall-stage" data-visual="" data-enter-media="" role="img" aria-label="Workspace search for rain showing matching text across several notes">
      <div className="app-frame mock-window recall-window">
        <aside className="recall-sidebar">
          <div className="mock-brand"><Mark size={18} /> My notebook</div>
          <SidebarItem icon="search" active>Search</SidebarItem>
          <SidebarItem icon="inbox">Inbox</SidebarItem>
          <SidebarItem icon="book">Collections</SidebarItem>
          <SidebarItem icon="graph">Connections</SidebarItem>
          <p className="mock-group">Collections</p>
          <SidebarItem icon="tag">Field notes</SidebarItem>
          <SidebarItem icon="tag">Trips</SidebarItem>
        </aside>
        <div className="recall-results">
          <div className="recall-query"><Icon name="search" size={21} /><span>rain<i /></span><kbd>Esc</kbd></div>
          <div className="recall-count">Notes matching “rain”</div>
          <div className="recall-result is-active"><Icon name="note" size={19} /><div><strong>Things to look up</strong><small>Why <mark>rain</mark> smells stronger on warm pavement.</small></div><Icon name="diagonal" size={16} /></div>
          <div className="recall-result"><Icon name="note" size={19} /><div><strong>Plans for Saturday</strong><small>If the <mark>rain</mark> holds, take the afternoon train out to the hills.</small></div></div>
          <div className="recall-result"><Icon name="note" size={19} /><div><strong>The art of noticing</strong><small>Come back here in the <mark>rain</mark> and see what stands out then.</small></div></div>
        </div>
        <div className="recall-related">
          <span className="mock-pane-title"><Icon name="link" size={15} /> Linked notes</span>
          <div className="journal-linked"><Icon name="note" size={15} /><span><strong>Notes from the desk</strong><small>Projects</small></span></div>
          <div className="journal-linked"><Icon name="note" size={15} /><span><strong>The art of noticing</strong><small>Field notes</small></span></div>
        </div>
      </div>
    </div>
  );
}
