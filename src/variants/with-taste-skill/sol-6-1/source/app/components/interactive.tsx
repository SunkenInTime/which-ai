"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowsOutSimple,
  BookOpen,
  Check,
  CheckCircle,
  Circle,
  Compass,
  DownloadSimple,
  FileText,
  Lightbulb,
  MagnifyingGlass,
  Moon,
  NotePencil,
  Plus,
  StackSimple,
  Sun,
  Trash,
  Waveform,
  X,
  Play,
  LinkSimple,
  Flower,
} from "@phosphor-icons/react";

type Note = {
  id: string;
  title: string;
  body: string;
  category: string;
  image?: string;
};
const initialNotes: Note[] = [
  {
    id: "summer",
    title: "A little summer escape",
    body: "Somewhere slow, somewhere by the sea.\n\nA few things to remember:\n- Take the train along the coast\n- Find a little bookshop\n- Leave a whole afternoon unplanned\n\nSometimes the best plan is a little room for surprise.",
    category: "Life",
    image: "coast",
  },
  {
    id: "thought",
    title: "A thought worth keeping",
    body: "What if a second brain gave your first one a little breathing room?\n\nCreate a place for ideas before you know what they might become. Good ideas usually start as small observations.",
    category: "Ideas",
  },
  {
    id: "walk",
    title: "That idea on the walk",
    body: "Walking makes room for new connections.\n\nTry a small creative ritual: a walk, no headphones, and one note about something you noticed.\n\nConnected idea: The creative habit.",
    category: "Ideas",
    image: "forest",
  },
  {
    id: "books",
    title: "The creative habit",
    body: "Reading list\n\nThe Creative Act, Rick Rubin\nA Field Guide to Getting Lost, Rebecca Solnit\nWays of Seeing, John Berger\n\nA thought: pay attention first. The ideas will follow.",
    category: "Reading",
    image: "desk",
  },
  {
    id: "morning",
    title: "A better morning",
    body: "Coffee. An open notebook. A little less noise.\n\nBefore opening your inbox, write down one thing you want to make time for today.\n\nConnected ideas: That idea on the walk, The creative habit.",
    category: "Life",
    image: "desk",
  },
];

type BrainContext = {
  notes: Note[];
  open: (id?: string) => void;
  add: (text: string) => void;
};
const Brain = createContext<BrainContext>({
  notes: initialNotes,
  open: () => {},
  add: () => {},
});
const directions = [
  "Spatial notebook",
  "Bold & focused",
  "A calmer mind",
  "Connected thinking",
  "Creative scrapbook",
];

// Layer scale: content 0, navigation 10, design switcher 20, native dialog top layer.
export function LandingShell({
  variant,
  children,
}: {
  variant: number;
  children: ReactNode;
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState("thought");
  const [isOpen, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [theme, setTheme] = useState(variant === 4 ? "dark" : "system");
  const [storageError, setStorageError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Read browser storage after hydration; the timeout is canceled on unmount.
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("recollect-notes");
        if (stored) {
          const data: unknown = JSON.parse(stored);
          if (
            Array.isArray(data) &&
            data.every(
              (n) =>
                n &&
                typeof n.id === "string" &&
                typeof n.title === "string" &&
                typeof n.body === "string" &&
                typeof n.category === "string",
            )
          )
            setNotes(data);
        }
      } catch {
        setStorageError(
          "Browser storage is unavailable. Notes will last for this session.",
        );
      }
      setReady(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    let canceled = false;
    try {
      localStorage.setItem("recollect-notes", JSON.stringify(notes));
    } catch {
      queueMicrotask(() => {
        if (!canceled)
          setStorageError(
            "Couldn't save in this browser. You can still export your notes.",
          );
      });
    }
    return () => {
      canceled = true;
    };
  }, [notes, ready]);

  useEffect(() => {
    if (isOpen) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function open(id?: string) {
    setActive(id || notes[0]?.id || "");
    setFilter("");
    setOpen(true);
  }
  function add(text = "") {
    const id = `note-${Date.now()}`;
    setNotes((current) => [
      {
        id,
        title: text ? text.split("\n")[0].slice(0, 80) : "Untitled thought",
        body: text,
        category: "Ideas",
      },
      ...current,
    ]);
    setActive(id);
    setFilter("");
    setOpen(true);
  }
  const selected = notes.find((n) => n.id === active);
  function update(field: "title" | "body", value: string) {
    setNotes((ns) =>
      ns.map((n) => (n.id === active ? { ...n, [field]: value } : n)),
    );
  }
  function remove() {
    setNotes((ns) => ns.filter((n) => n.id !== active));
    setActive(notes.find((n) => n.id !== active)?.id || "");
  }
  function exportNotes() {
    const content = notes
      .map((n) => `# ${n.title}\n\n${n.body}`)
      .join("\n\n---\n\n");
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/markdown" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-recollect-notes.md";
    a.click();
    URL.revokeObjectURL(url);
  }
  function toggleTheme() {
    const dark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(dark ? "light" : "dark");
  }

  return (
    <Brain.Provider value={{ notes, open, add }}>
      <div className={`landing v${variant}`} data-theme={theme}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <nav
          className="recollect-appearance"
          aria-label="Appearance"
        >
          <button
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            title="Switch theme"
            className="theme-toggle"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </nav>
        <dialog
          ref={dialog}
          aria-label="Your Recollect notebook"
          className="notebook-dialog"
          onCancel={() => setOpen(false)}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="workspace">
            <div className="workspace-top">
              <span className="brand">
                <StackSimple weight="bold" size={24} />
                recollect<span className="demo-tag">Your browser notebook</span>
              </span>
              <button
                className="icon-button"
                aria-label="Close notebook"
                onClick={() => setOpen(false)}
              >
                <X size={22} />
              </button>
            </div>
            <div className="workspace-inner">
              <aside className="workspace-sidebar">
                <button
                  className="button primary new-note"
                  onClick={() => add()}
                >
                  <Plus size={18} /> New note
                </button>
                <label htmlFor="workspace-search" className="sr-only">
                  Search your notes
                </label>
                <div className="workspace-search">
                  <MagnifyingGlass size={17} />
                  <input
                    id="workspace-search"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Find a thought..."
                  />
                </div>
                <div className="note-list">
                  {notes
                    .filter((n) =>
                      `${n.title} ${n.body}`
                        .toLowerCase()
                        .includes(filter.toLowerCase()),
                    )
                    .map((note) => (
                      <button
                        className={note.id === active ? "selected" : ""}
                        key={note.id}
                        onClick={() => setActive(note.id)}
                      >
                        <FileText size={17} />
                        <span>
                          {note.title || "Untitled thought"}
                          <small>{note.category}</small>
                        </span>
                      </button>
                    ))}
                  {notes.filter((n) =>
                    `${n.title} ${n.body}`
                      .toLowerCase()
                      .includes(filter.toLowerCase()),
                  ).length === 0 && (
                    <p className="empty-result">
                      No thoughts found. Try another search or create a new
                      note.
                    </p>
                  )}
                </div>
                <button className="export-notes" onClick={exportNotes}>
                  <DownloadSimple size={17} /> Export notes
                </button>
              </aside>
              <div className="workspace-editor">
                {selected ? (
                  <>
                    <div className="editor-meta">
                      <span>
                        <NotePencil size={16} /> {selected.category}
                      </span>
                      <button
                        aria-label="Delete this note"
                        className="icon-button"
                        onClick={remove}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                    <label htmlFor="note-title" className="sr-only">
                      Note title
                    </label>
                    <input
                      id="note-title"
                      className="note-title-input"
                      value={selected.title}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="Untitled thought"
                    />
                    <label htmlFor="note-body" className="sr-only">
                      Note content
                    </label>
                    <textarea
                      id="note-body"
                      value={selected.body}
                      onChange={(e) => update("body", e.target.value)}
                      placeholder="What's on your mind?"
                    />
                    <p
                      className={`save-status ${storageError ? "error" : ""}`}
                      role="status"
                    >
                      {storageError || (
                        <>
                          <CheckCircle size={15} /> Saved in this browser. No
                          account needed.
                        </>
                      )}
                    </p>
                  </>
                ) : (
                  <div className="editor-empty">
                    <NotePencil size={44} />
                    <h2>A little room for an idea.</h2>
                    <p>Start with a thought. See where it takes you.</p>
                    <button className="button primary" onClick={() => add()}>
                      New note <Plus size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </Brain.Provider>
  );
}

export function StartButton({
  className = "primary",
  children,
  icon = true,
}: {
  className?: string;
  children?: ReactNode;
  icon?: boolean;
}) {
  const { open } = useContext(Brain);
  return (
    <button className={`button ${className}`} onClick={() => open()}>
      {children || "Try Recollect"}
      {icon && <ArrowRight size={18} />}
    </button>
  );
}
export function DemoButton({
  children = "Take a look",
  className = "text-button",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { open } = useContext(Brain);
  return (
    <button className={className} onClick={() => open("thought")}>
      <Play size={16} weight="fill" />
      {children}
    </button>
  );
}
export function OpenNote({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const { open } = useContext(Brain);
  return (
    <button className={className} onClick={() => open(id)}>
      {children}
    </button>
  );
}

export function SpatialNotebook({ playful = false }: { playful?: boolean }) {
  const [done, setDone] = useState([true, false, false]);
  const { open } = useContext(Brain);
  return (
    <div
      className={`spatial-notebook ${playful ? "playful-notebook" : ""}`}
      aria-label="Interactive sample notebook"
    >
      <div className="notebook-orbit" />
      <OpenNote id="summer" className="photo-note">
        <div className="photo-note-image">
          <Image
            src="/variants/with-taste-skill/sol-6-1/images/coast.webp"
            alt="A sunlit village on the Mediterranean coast"
            fill
            sizes="(max-width: 768px) 166px, 223px"
            preload
          />
        </div>
        <div className="photo-note-caption">
          <span>Somewhere by the sea.</span>
          <ArrowUpRight size={17} />
        </div>
      </OpenNote>
      <OpenNote id="thought" className="thought-note">
        <Lightbulb size={26} weight="light" />
        <span className="note-eyebrow">A thought worth keeping</span>
        <p>
          Good ideas need
          <br />a place to land.
        </p>
        <span className="note-small">Even the not-quite-formed ones.</span>
      </OpenNote>
      <div className="checklist-note">
        <div className="checklist-top">
          <Compass size={25} weight="light" />
          <button
            className="icon-button"
            aria-label="Open summer escape note"
            onClick={() => open("summer")}
          >
            <ArrowsOutSimple size={16} />
          </button>
        </div>
        <h2 className="checklist-title">A little summer escape</h2>
        <p>Less planning. More possibility.</p>
        <div className="checklist-items">
          {[
            "Somewhere by the water",
            "A book I can't put down",
            "Absolutely no notifications",
          ].map((text, i) => (
            <button
              key={text}
              onClick={() =>
                setDone((values) =>
                  values.map((v, index) => (index === i ? !v : v)),
                )
              }
              aria-pressed={done[i]}
            >
              {done[i] ? (
                <CheckCircle size={18} weight="fill" />
              ) : (
                <Circle size={18} />
              )}
              <span className={done[i] ? "is-checked" : ""}>{text}</span>
            </button>
          ))}
        </div>
        <span className="note-folder">
          <StackSimple size={14} /> Life, lately
        </span>
      </div>
      <OpenNote id="walk" className="voice-note">
        <span className="voice-icon">
          <Waveform size={23} />
        </span>
        <span>
          That idea on the walk<small>Voice note transcript</small>
        </span>
        <ArrowUpRight size={18} />
      </OpenNote>
      <OpenNote id="books" className="reading-note">
        <div>
          <BookOpen size={20} />
          <span>The creative habit</span>
          <ArrowUpRight size={15} />
        </div>
        <Image
          src={playful ? "/variants/with-taste-skill/sol-6-1/images/desk.webp" : "/variants/with-taste-skill/sol-6-1/images/forest.webp"}
          width={230}
          height={150}
          sizes="(max-width: 768px) 134px, (max-width: 1200px) 155px, 182px"
          preload
          alt={
            playful
              ? "A sketchbook and morning coffee on a sunlit desk"
              : "Morning light in a redwood forest"
          }
        />
      </OpenNote>
      <span className="notebook-cursor">
        <NotePencil size={16} /> Your next good idea
      </span>
    </div>
  );
}

export function ScrapbookNotebook() {
  return (
    <div
      className="scrapbook-notebook"
      aria-label="Explore a personal scrapbook of sample notes"
    >
      <OpenNote id="summer" className="scrapbook-polaroid polaroid-coast">
        <div>
          <Image
            src="/variants/with-taste-skill/sol-6-1/images/coast.webp"
            alt="Sunlit houses on the Mediterranean coast"
            fill
            sizes="(max-width: 768px) 180px, 270px"
            preload
          />
        </div>
        <span>
          Places for someday.
          <ArrowUpRight size={16} />
        </span>
      </OpenNote>
      <OpenNote id="thought" className="scrapbook-jot">
        <NotePencil size={22} weight="light" />
        <span>Note to self</span>
        <p>
          Make time for
          <br />
          the small things.
        </p>
        <small>The good ideas usually follow.</small>
      </OpenNote>
      <OpenNote id="morning" className="scrapbook-polaroid polaroid-desk">
        <div>
          <Image
            src="/variants/with-taste-skill/sol-6-1/images/desk.webp"
            alt="Coffee and an open sketchbook in the morning sun"
            fill
            sizes="(max-width: 768px) 190px, 250px"
          />
        </div>
        <span>
          A slower kind of morning.
          <ArrowUpRight size={16} />
        </span>
      </OpenNote>
      <OpenNote id="books" className="scrapbook-reading">
        <BookOpen size={23} weight="light" />
        <span>Books I keep coming back to</span>
        <p>The creative habit</p>
        <small>Reading, thinking, making.</small>
        <ArrowUpRight size={17} />
      </OpenNote>
      <Flower
        className="scrapbook-flower"
        size={105}
        weight="light"
        aria-hidden="true"
      />
    </div>
  );
}

export function SearchPreview({ compact = false }: { compact?: boolean }) {
  const { notes, open } = useContext(Brain);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Everything");
  const results = notes
    .filter(
      (n) =>
        (category === "Everything" || n.category === category) &&
        `${n.title} ${n.body}`.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, compact ? 3 : 4);
  return (
    <div className={`search-preview ${compact ? "compact" : ""}`}>
      <label htmlFor={compact ? "compact-search" : "brain-search"}>
        {compact
          ? "Find the thought you're looking for"
          : "Try searching your second brain"}
      </label>
      <div className="preview-search-input">
        <MagnifyingGlass size={22} />
        <input
          id={compact ? "compact-search" : "brain-search"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try ‘creative’, ‘summer’ or ‘morning’"
        />
        <span>
          <ArrowRight size={18} />
        </span>
      </div>
      <div className="search-categories" aria-label="Filter sample notes">
        {["Everything", "Ideas", "Life", "Reading"].map((cat) => (
          <button
            key={cat}
            className={category === cat ? "selected" : ""}
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="search-results">
        {results.map((note) => (
          <button
            onClick={() => open(note.id)}
            key={note.id}
            className="search-result"
          >
            {note.image ? (
              <Image
                src={`/variants/with-taste-skill/sol-6-1/images/${note.image}.webp`}
                width={300}
                height={180}
                sizes={
                  compact
                    ? "(max-width: 768px) 90px, 165px"
                    : "(max-width: 768px) 43vw, 22vw"
                }
                alt=""
              />
            ) : (
              <div className="idea-thumbnail">
                <Lightbulb size={36} weight="light" />
              </div>
            )}
            <span>
              {note.title}
              <ArrowUpRight size={16} />
            </span>
            <small>{note.category}</small>
          </button>
        ))}
        {results.length === 0 && (
          <p className="empty-result">
            Nothing here just yet. Try another thought.
          </p>
        )}
      </div>
    </div>
  );
}

const graphNotes = [
  { id: "books", title: "The creative habit", icon: BookOpen, x: 15, y: 17 },
  { id: "thought", title: "Next big thing", icon: Lightbulb, x: 71, y: 11 },
  { id: "morning", title: "A better morning", icon: Flower, x: 82, y: 51 },
  { id: "walk", title: "Long walks", icon: Compass, x: 59, y: 85 },
  { id: "summer", title: "Sunday thoughts", icon: NotePencil, x: 15, y: 65 },
];
export function KnowledgeGraph() {
  const [selected, setSelected] = useState("books");
  const { open, notes } = useContext(Brain);
  const chosen = notes.find((n) => n.id === selected);
  return (
    <div className="knowledge-demo">
      <div
        className="knowledge-graph"
        aria-label="Explore connected sample notes"
      >
        <div className="graph-ring ring-one" />
        <div className="graph-ring ring-two" />
        {graphNotes.map((node) => {
          const dx = (node.x - 47) * 5.1;
          const dy = (node.y - 46) * 3.7;
          return (
            <span
              key={`line-${node.id}`}
              className={`graph-edge ${selected === node.id ? "selected" : ""}`}
              style={{
                width: `${Math.sqrt(dx * dx + dy * dy)}px`,
                transform: `rotate(${Math.atan2(dy, dx)}rad)`,
              }}
            />
          );
        })}
        <button className="graph-center" onClick={() => open()}>
          <StackSimple size={30} weight="light" />
          <span>Your second brain</span>
        </button>
        {graphNotes.map(({ id, title, icon: Icon, x, y }) => (
          <button
            style={{ left: `${x}%`, top: `${y}%` }}
            key={id}
            className={`graph-node ${selected === id ? "selected" : ""}`}
            aria-pressed={selected === id}
            onClick={() => setSelected(id)}
          >
            <Icon size={20} weight="light" />
            <span>{title}</span>
          </button>
        ))}
      </div>
      <button className="graph-insight" onClick={() => open(selected)}>
        <span className="insight-icon">
          <LinkSimple size={21} />
        </span>
        <span>
          <small>Follow a connection</small>
          <strong>{chosen?.title || "A new connection"}</strong>
          <span>
            {selected === "books"
              ? "Reading, daily rituals, and the ideas in between."
              : selected === "walk"
                ? "A little movement. A different perspective."
                : "A small thought connected to something bigger."}
          </span>
        </span>
        <ArrowUpRight size={20} />
      </button>
    </div>
  );
}

export function CaptureNote() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { add } = useContext(Brain);
  return (
    <form
      className="capture-note"
      onSubmit={(e) => {
        e.preventDefault();
        if (!value.trim()) {
          setError("Give your idea a few words first.");
          return;
        }
        add(value.trim());
        setValue("");
        setError("");
      }}
    >
      <label htmlFor="quick-thought">Got something on your mind?</label>
      <div>
        <input
          id="quick-thought"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          placeholder="A tiny idea is a good place to start..."
          aria-describedby={error ? "capture-error" : undefined}
        />
        <button type="submit" aria-label="Save your thought">
          <ArrowRight size={23} />
        </button>
      </div>
      {error && (
        <p className="form-error" id="capture-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export function FeatureAccordion() {
  const [active, setActive] = useState(0);
  const features = [
    [
      "Catch a passing thought",
      "A line from a book, an idea on a walk, something you don't want to forget. Give it a home.",
    ],
    [
      "See things in a new way",
      "Bring your notes together. Notice the ideas, themes, and connections that keep coming back.",
    ],
    [
      "Find it when you need it",
      "Less rummaging through apps and tabs. A simple search brings the right thought back into view.",
    ],
  ];
  return (
    <div className="feature-accordion">
      {features.map(([title, body], i) => (
        <div key={title} className={i === active ? "active" : ""}>
          <button
            onClick={() => setActive(active === i ? -1 : i)}
            aria-expanded={active === i}
            aria-controls={`feature-panel-${i}`}
          >
            <h3>{title}</h3>
            {active === i ? <X size={19} /> : <Plus size={19} />}
          </button>
          <div id={`feature-panel-${i}`} hidden={active !== i}>
            <p>{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <section className="pricing-section section-wrap" id="pricing">
      <div className="pricing-heading">
        <h2>
          Room to start.
          <br />
          Space to grow.
        </h2>
        <p>A notebook for today. A second brain for whatever comes next.</p>
        <div className="billing-toggle" aria-label="Billing frequency">
          <button
            onClick={() => setYearly(false)}
            className={!yearly ? "selected" : ""}
            aria-pressed={!yearly}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={yearly ? "selected" : ""}
            aria-pressed={yearly}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="pricing-plans">
        <div className="pricing-plan">
          <h3>A little space</h3>
          <span className="price">Free</span>
          <p>For the first thought and the next hundred.</p>
          <ul>
            <li>
              <Check size={17} /> Notes, links, and images
            </li>
            <li>
              <Check size={17} /> Search your whole notebook
            </li>
            <li>
              <Check size={17} /> Markdown export
            </li>
          </ul>
          <StartButton className="secondary" />
        </div>
        <div className="pricing-plan featured">
          <h3>A bigger world</h3>
          <span className="price">
            ${yearly ? "8" : "10"}
            <small> / month</small>
          </span>
          <p>
            {yearly
              ? "Billed yearly. More room for your ideas."
              : "Billed monthly. More room for your ideas."}
          </p>
          <ul>
            <li>
              <Check size={17} /> Everything in A little space
            </li>
            <li>
              <Check size={17} /> Connected idea collections
            </li>
            <li>
              <Check size={17} /> An expanded personal library
            </li>
          </ul>
          <StartButton />
        </div>
      </div>
      <p className="pricing-disclaimer">
        Concept pricing. Try the browser notebook for free; no payments are
        processed.
      </p>
    </section>
  );
}
