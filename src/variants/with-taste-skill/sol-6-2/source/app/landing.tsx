import type { Metadata } from "next";
import type { Edition } from "./editions";
import { Icon, type IconName } from "./icons";
import { Brand, Header, WorkspaceLink } from "./navigation";
import { GraphPreview, IndexPreview, JournalPreview, NotesGraph, ScratchPreview, SearchPreview } from "./previews";
import { Workspace } from "./workspace";

const previewByEdition = {
  "1": JournalPreview,
  "2": GraphPreview,
  "3": ScratchPreview,
  "4": IndexPreview,
  "5": SearchPreview,
};

export function landingMetadata(edition: Edition): Metadata {
  const title = edition.title.join(" ").replace(/[.]$/, "");
  const image = { url: `/variants/with-taste-skill/sol-6-2/images/share-${edition.id}.jpg`, width: 1440, height: 900, alt: edition.name + " landing page" };

  return {
    title,
    description: edition.description,
    openGraph: { title: title + " — Veybrin", description: edition.description, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: title + " — Veybrin", description: edition.description, images: [image] },
  };
}

function Hero({ edition }: { edition: Edition }) {
  const Preview = previewByEdition[edition.id];

  return (
    <section className={`hero hero--${edition.layout}`} data-enter="" aria-labelledby="hero-title">
      <div className="wrap"><div className="hero-text hero__wrap">
        <div className="hero__copy">
          <p className="hero__label"><span aria-hidden="true" />{edition.label}</p>
          <h1 id="hero-title" data-enter-whole=""><span>{edition.title[0]}</span>{" "}<span>{edition.title[1]}</span></h1>
          {edition.id !== "4" && edition.id !== "5" && <p className="hero__lead">{edition.description}</p>}
          {edition.id !== "4" && edition.id !== "5" && <HeroActions edition={edition} />}
        </div>
        {edition.id === "5" && <div className="hero__aside"><p className="hero__lead">{edition.description}</p><HeroActions edition={edition} /></div>}
        <Preview />
        {edition.id === "4" && <div className="hero__aside"><p className="hero__lead">{edition.description}</p><HeroActions edition={edition} /></div>}
      </div></div>
    </section>
  );
}

function HeroActions({ edition }: { edition: Edition }) {
  return (
    <div className="btn-row">
      <WorkspaceLink />
      {(edition.id === "1" || edition.id === "2") && <a href="#connections" className="btn btn--secondary">See connections <Icon name="diagonal" size={16} /></a>}
    </div>
  );
}

const chapters: { title: string; description: string; icon: IconName; label: string; note: string; detail: string }[] = [
  { title: "Write down what you noticed", description: "Start a note in the inbox while the detail is still fresh.", icon: "note", label: "New note", note: "The art of noticing", detail: "The light reached the ferns long before it touched the path." },
  { title: "Link a related note", description: "Connect the observation to a route or an older entry about the same place.", icon: "link", label: "Linked note", note: "The long way home", detail: "Take the path behind the station and follow the water to the old mill." },
  { title: "Return through a different page", description: "Open the route later and follow its link back to what you saw.", icon: "book", label: "Field notes", note: "The art of noticing", detail: "Come back here in the rain and see what stands out then." },
];

function NoteChapters() {
  return (
    <section className="section connections-section chapter-section" id="connections" data-moment="pinned-chapters" aria-labelledby="connection-title">
      <div className="wrap mo-pc__grid">
        <div className="mo-pc__text">
          <h2 id="connection-title">One note leads to another.</h2>
          <ol className="mo-pc__steps">
            {chapters.map((chapter) => (
              <li className="mo-pc__step" key={chapter.title}>
                <h3>{chapter.title}</h3><p>{chapter.description}</p>
                <div className="mo-pc__visual chapter-illustration" data-visual="">
                  <article className="chapter-note">
                    <span><Icon name={chapter.icon} size={19} />{chapter.label}</span>
                    <strong>{chapter.note}</strong><p>{chapter.detail}</p>
                  </article>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mo-pc__visuals frame" />
      </div>
    </section>
  );
}

function GraphSection() {
  return (
    <section className="section connections-section" id="connections" aria-labelledby="connection-title">
      <div className="wrap graph-story">
        <div className="section-head">
          <h2 id="connection-title">A map you make by writing.</h2>
          <p>Each dot is a note. A line means one page links to the other, so you can see which ideas keep coming up together.</p>
        </div>
        <div className="graph-story__frame" data-visual="" data-moment="cursor-spotlight" data-moment-opts='{"rest":[0.55,0.43],"radius":325}' role="img" aria-label="Map of a notebook with five named notes and their connections">
          <NotesGraph />
        </div>
      </div>
    </section>
  );
}

function ScratchStatement() {
  return (
    <section className="section connections-section scratch-statement" id="connections" data-moment="word-highlight" aria-labelledby="connection-title">
      <div className="wrap">
        <h2 className="mo-wh__text" id="connection-title">Give each thought its own note. <strong>Link it</strong> when you know where it belongs.</h2>
        <div className="statement-links" data-visual="">
          <div><Icon name="note" size={21} /><span>Things to look up</span></div>
          <span className="statement-links__line"><Icon name="link" size={18} /></span>
          <div><Icon name="note" size={21} /><span>Notes from the desk</span></div>
        </div>
      </div>
    </section>
  );
}

const collections = [
  { name: "Trips", icon: "book", notes: ["Liguria on foot", "A weekend bag"] },
  { name: "Field notes", icon: "note", notes: ["The art of noticing", "The long way home"] },
  { name: "Inbox", icon: "inbox", notes: ["Things to look up", "Plans for Saturday"] },
] as const;

function IndexSection() {
  return (
    <section className="section connections-section index-collections" id="connections" aria-labelledby="connection-title">
      <div className="wrap">
        <h2 id="connection-title">A shelf for each subject.</h2>
        <p>Keep the pages you need for a trip in one collection. A link can still take you to a page on another shelf.</p>
        <div className="collection-shelf" data-visual="">
          {collections.map((collection) => (
            <article key={collection.name} className="collection-card">
              <Icon name={collection.icon} size={25} />
              <h3>{collection.name}</h3>
              <ul>{collection.notes.map((note) => <li key={note}><Icon name="note" size={15} /> {note}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="index-marquee" data-moment="marquee-row" data-moment-opts='{"speed":30}'>
          <ul className="mo-mq__track"><li>Trips</li><li>Field notes</li><li>Reading</li><li>Inbox</li><li>Projects</li></ul>
        </div>
      </div>
    </section>
  );
}

function RecallSection() {
  return (
    <section className="section connections-section recall-story" id="connections" aria-labelledby="connection-title" data-moment="line-carries-colour" data-moment-opts='{"from":"base"}'>
      <div className="wrap">
        <div className="section-head">
          <h2 id="connection-title">A word is enough to find a note.</h2>
          <p>Search reads the body of every note as well as its title. A phrase from the middle of a page can take you straight back to it.</p>
        </div>
        <div className="recall-extract" data-visual="" aria-label="Search result for the word ferns">
          <span><Icon name="search" size={23} /> ferns</span>
          <article>
            <Icon name="note" size={23} />
            <div><h3>The art of noticing</h3><p>The light reached the <mark>ferns</mark> long before it touched the path.</p></div>
          </article>
        </div>
      </div>
    </section>
  );
}

const sectionByEdition = {
  "1": NoteChapters,
  "2": GraphSection,
  "3": ScratchStatement,
  "4": IndexSection,
  "5": RecallSection,
};

export function Landing({ edition }: { edition: Edition }) {
  const Connections = sectionByEdition[edition.id];

  return (
    <>
      <Header edition={edition.id} />
      <main id="top" tabIndex={-1}>
        <Hero edition={edition} />
        <section className="section workspace-section" id="workspace" aria-labelledby="workspace-title">
          <div className="wrap">
            <div className="section-head workspace-section__head">
              <h2 id="workspace-title">{edition.workspaceTitle}</h2>
              <p>{edition.workspaceCopy}</p>
            </div>
            <Workspace edition={edition.id} />
          </div>
        </section>
        <Connections />
      </main>
      <footer className="closing">
        <div className="wrap">
          <div className="closing__head"><h2>{edition.close}</h2><WorkspaceLink /></div>
          <div className="closing__bottom"><Brand /><a href="#top" className="link">Back to overview <Icon name="diagonal" size={15} /></a></div>
        </div>
      </footer>
      {/* Gallery adaptation: the skill's motion.js and moments.js start through TasteSkillRuntime in the entry's
          wrapper, once per design (see src/components/gallery/taste-skill-runtime.tsx). */}
    </>
  );
}
