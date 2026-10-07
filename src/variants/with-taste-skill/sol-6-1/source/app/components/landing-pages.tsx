import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Compass,
  Feather,
  Flower,
  Lightbulb,
  LockSimple,
  MagnifyingGlass,
  NotePencil,
  Sparkle,
  StackSimple,
  Student,
  PenNib,
  LinkSimple,
  Heart,
  Infinity as InfinityIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  LandingShell,
  StartButton,
  DemoButton,
  SpatialNotebook,
  ScrapbookNotebook,
  SearchPreview,
  KnowledgeGraph,
  CaptureNote,
  FeatureAccordion,
  Pricing,
  OpenNote,
} from "./interactive";

function Header({ variant }: { variant: number }) {
  return (
    <header className="site-header section-wrap">
      <a className="brand" href={`/${variant}`} aria-label="Recollect home">
        <StackSimple size={29} weight={variant === 5 ? "fill" : "bold"} />
        <span>
          recollect<span className="brand-period">.</span>
        </span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#how-it-works">
          {variant === 3 ? "The feeling" : "How it works"}
        </a>
        <a href="#about">
          {variant === 4 ? "Why Recollect" : "Our philosophy"}
        </a>
        <a href="#pricing">Pricing</a>
      </nav>
      <div className="header-cta">
        <StartButton icon={false} />
      </div>
    </header>
  );
}
function Footer({ variant }: { variant: number }) {
  return (
    <footer className="site-footer section-wrap">
      <div className="footer-top">
        <h2>Keep your ideas close.</h2>
        <StartButton />
      </div>
      <div className="footer-line">
        <a className="brand" href={`/${variant}`}>
          <StackSimple size={23} weight="bold" />
          recollect.
        </a>
        <p>A second brain. A little more you.</p>
        <span>© {new Date().getFullYear()} Recollect</span>
      </div>
    </footer>
  );
}
function HumanStrip({ words = false }: { words?: boolean }) {
  return (
    <section
      className={`human-strip section-wrap ${words ? "word-strip" : ""}`}
      aria-label="Who Recollect is for"
    >
      <p>For minds that never stop wandering.</p>
      <div>
        <span>
          <PenNib size={21} />
          Designers
        </span>
        <span>
          <Feather size={21} />
          Writers
        </span>
        <span>
          <Student size={23} />
          Students
        </span>
        <span>
          <Lightbulb size={22} />
          Curious people
        </span>
      </div>
    </section>
  );
}
function Philosophy({ children }: { children?: React.ReactNode }) {
  return (
    <section className="philosophy-strip section-wrap" id="about">
      <div className="philosophy-mark">
        <Brain size={38} weight="light" />
      </div>
      <h2>
        {children || (
          <>
            Your brain is for having ideas.
            <br />
            Not for holding on to all of them.
          </>
        )}
      </h2>
      <p>
        We believe a note-taking app should make thinking feel easier. A place
        to collect what matters and find your own connections.
      </p>
    </section>
  );
}

function One() {
  return (
    <>
      <Header variant={1} />
      <main id="main">
        <section className="hero hero-one section-wrap">
          <div className="hero-copy">
            <span className="eyebrow">A LITTLE SPACE FOR YOUR MIND</span>
            <h1>
              A home for
              <br />
              every thought.
            </h1>
            <p>
              Save what sparks something. Connect the dots. Make space for your
              next good idea.
            </p>
            <div className="hero-actions">
              <StartButton />
              <DemoButton />
            </div>
          </div>
          <SpatialNotebook />
        </section>
        <HumanStrip />
        <section className="features-one section-wrap" id="how-it-works">
          <div className="section-heading">
            <h2>
              Less searching.
              <br />
              More connecting.
            </h2>
            <p>
              All the bits of your life, together in a place that makes sense to
              you.
            </p>
          </div>
          <div className="features-one-grid">
            <article className="find-feature">
              <div className="feature-copy">
                <MagnifyingGlass size={26} weight="light" />
                <h3>
                  That thing you saved?
                  <br />
                  It’s right here.
                </h3>
                <p>
                  Find the idea, quote, or plan you need. Even when all you
                  remember is a feeling.
                </p>
              </div>
              <SearchPreview compact />
            </article>
            <article className="capture-feature">
              <Image
                src="/variants/with-taste-skill/sol-6-1/images/desk.webp"
                width={720}
                height={480}
                sizes="(max-width: 768px) 90vw, 40vw"
                alt="A sketchbook, a coffee, and a little space to think"
              />
              <div className="feature-copy">
                <NotePencil size={26} weight="light" />
                <h3>
                  Small thoughts.
                  <br />
                  Bigger possibilities.
                </h3>
                <p>
                  Capture a passing thought before it passes. You can make sense
                  of it later.
                </p>
                <OpenNote id="thought" className="inline-link">
                  Open a thought <ArrowUpRight size={17} />
                </OpenNote>
              </div>
            </article>
          </div>
        </section>
        <Philosophy />
        <Pricing />
      </main>
      <Footer variant={1} />
    </>
  );
}

function Two() {
  return (
    <>
      <Header variant={2} />
      <main id="main">
        <section className="hero hero-two section-wrap">
          <div className="hero-copy">
            <span className="eyebrow">THINKING, WITHOUT THE TAB OVERLOAD</span>
            <h1>
              Think freely.
              <br />
              <span>Keep everything.</span>
            </h1>
            <p>
              Your notes, links, and half-formed ideas. One place to turn them
              into something.
            </p>
            <div className="hero-actions">
              <StartButton />
              <DemoButton>See it in action</DemoButton>
            </div>
          </div>
          <div className="sculpture-hero">
            <Image
              src="/variants/with-taste-skill/sol-6-1/images/sculpture.webp"
              alt="An intricate blue paper sculpture, folding many layers into a single connected form"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              preload
            />
            <span className="sculpture-corner">
              <InfinityIcon size={39} weight="light" />
            </span>
          </div>
        </section>
        <section className="search-section-two section-wrap" id="how-it-works">
          <SearchPreview />
        </section>
        <section className="less-noise-section section-wrap">
          <div className="less-noise-title">
            <h2>
              Less noise.
              <br />
              <span>More signal.</span>
            </h2>
            <Image
              src="/variants/with-taste-skill/sol-6-1/images/desk.webp"
              width={680}
              height={450}
              sizes="(max-width: 768px) 90vw, 45vw"
              alt="An open sketchbook and coffee in the morning sun"
            />
          </div>
          <div className="less-noise-list">
            <article>
              <NotePencil size={28} />
              <h3>Catch it before it’s gone.</h3>
              <p>
                A good sentence. A random idea. The link you’ll need later.
                Saving it should be the easy part.
              </p>
            </article>
            <article>
              <LinkSimple size={28} />
              <h3>Put two and two together.</h3>
              <p>
                Connect thoughts across your notebook. Let a book become a
                project, and a thought become a plan.
              </p>
            </article>
            <article>
              <LockSimple size={28} />
              <h3>Your headspace. Your rules.</h3>
              <p>
                Keep your notes in your browser. Export them whenever you like.
                Your ideas belong to you.
              </p>
            </article>
          </div>
        </section>
        <Philosophy>
          Don’t organize your life.
          <br />
          <span>Make sense of it.</span>
        </Philosophy>
        <Pricing />
      </main>
      <Footer variant={2} />
    </>
  );
}

function Three() {
  return (
    <>
      <Header variant={3} />
      <main id="main">
        <section className="hero hero-three section-wrap">
          <div className="hero-copy">
            <span className="editorial-eyebrow">
              <Flower size={20} weight="light" /> A place for what matters
            </span>
            <h1>
              A clearer mind
              <br />
              starts here.
            </h1>
            <p>
              Somewhere for your thoughts to settle, your ideas to grow, and
              your mind to wander.
            </p>
            <div className="hero-actions">
              <StartButton />
              <a href="#how-it-works" className="text-button">
                Meet your second brain <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="forest-hero">
            <Image
              src="/variants/with-taste-skill/sol-6-1/images/forest.webp"
              alt="Sunlight falling through a quiet forest of tall redwood trees"
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              preload
            />
          </div>
        </section>
        <section className="editorial-intro section-wrap" id="about">
          <Flower size={31} weight="light" />
          <h2>
            You don’t need to
            <br />
            remember everything.
          </h2>
          <p>
            Just the things that feel like you. A sentence that stayed with you.
            An idea on a long walk. A plan for someday.
          </p>
          <span className="editorial-signoff">
            Give them somewhere to belong.
          </span>
        </section>
        <section className="editorial-features section-wrap" id="how-it-works">
          <div className="editorial-photo">
            <Image
              src="/variants/with-taste-skill/sol-6-1/images/desk.webp"
              width={850}
              height={660}
              sizes="(max-width: 768px) 90vw, 45vw"
              alt="A quiet morning with a notebook and a cup of coffee"
            />
            <p>Make a little room for your own thoughts.</p>
          </div>
          <div className="editorial-features-copy">
            <h2>
              A little less in your head.
              <br />A little more possibility.
            </h2>
            <FeatureAccordion />
            <DemoButton>Take a look inside</DemoButton>
          </div>
        </section>
        <section className="editorial-collection section-wrap">
          <div className="collection-image">
            <Image
              src="/variants/with-taste-skill/sol-6-1/images/coast.webp"
              alt="An unhurried afternoon along the Mediterranean coast"
              fill
              sizes="(max-width: 768px) 90vw, 65vw"
            />
          </div>
          <div>
            <Compass size={35} weight="light" />
            <h2>
              For the things
              <br />
              you’ll come back to.
            </h2>
            <p>
              Books to read. Places to go. The life you’re imagining, one note
              at a time.
            </p>
            <OpenNote id="summer" className="inline-link">
              Explore a collection <ArrowRight size={18} />
            </OpenNote>
          </div>
        </section>
        <Pricing />
      </main>
      <Footer variant={3} />
    </>
  );
}

function Four() {
  return (
    <>
      <Header variant={4} />
      <main id="main">
        <section className="hero hero-four section-wrap">
          <div className="hero-copy">
            <span className="eyebrow">
              <LinkSimple size={15} /> NOT JUST NOTES. CONNECTIONS.
            </span>
            <h1>
              Your mind,
              <br />
              <span>connected.</span>
            </h1>
            <p>
              A second brain for your notes, knowledge, and the unexpected
              connections between them.
            </p>
            <div className="hero-actions">
              <StartButton />
              <DemoButton>Explore the app</DemoButton>
            </div>
          </div>
          <KnowledgeGraph />
        </section>
        <section className="connected-strip section-wrap">
          <span>
            <StackSimple size={20} />A home for your knowledge
          </span>
          <span>
            <LinkSimple size={20} />
            Ideas that connect
          </span>
          <span>
            <LockSimple size={20} />
            Yours to keep
          </span>
        </section>
        <section className="network-section section-wrap" id="about">
          <div className="network-visual">
            <Image
              src="/variants/with-taste-skill/sol-6-1/images/network.webp"
              alt="An intricate silver mesh sculpture, where many threads form one continuous knot"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="network-copy">
            <span className="eyebrow">GOOD IDEAS ARE CONNECTED</span>
            <h2>
              Go beyond
              <br />
              the blank page.
            </h2>
            <p>
              Your best ideas rarely arrive fully formed. Recollect gives the
              small thoughts somewhere to meet.
            </p>
            <div className="network-benefits">
              <span>
                <LinkSimple size={19} /> Link what belongs together
              </span>
              <span>
                <MagnifyingGlass size={19} /> Rediscover what you’ve forgotten
              </span>
              <span>
                <Sparkle size={19} /> Find a new way to think
              </span>
            </div>
          </div>
        </section>
        <section
          className="graph-search-section section-wrap"
          id="how-it-works"
        >
          <div className="section-heading">
            <h2>
              Every thought.
              <br />
              Within reach.
            </h2>
            <p>
              Less retracing your steps. More picking up where you left off.
            </p>
          </div>
          <SearchPreview />
        </section>
        <Pricing />
      </main>
      <Footer variant={4} />
    </>
  );
}

function Five() {
  return (
    <>
      <Header variant={5} />
      <main id="main">
        <section className="hero hero-five section-wrap">
          <div className="hero-copy">
            <span className="eyebrow">FOR YOUR VERY HUMAN BRAIN</span>
            <h1>
              Keep what
              <br />
              makes you, you<span className="headline-period">.</span>
            </h1>
            <p>
              Your big ideas, little obsessions, and everything in between. A
              second brain that’s entirely yours.
            </p>
            <div className="hero-actions">
              <StartButton />
              <DemoButton>Peek inside</DemoButton>
            </div>
          </div>
          <ScrapbookNotebook />
        </section>
        <section className="capture-section section-wrap">
          <CaptureNote />
          <span className="capture-aside">
            <NotePencil size={19} /> Less overthinking.
            <br />
            More getting it down.
          </span>
        </section>
        <section className="scrapbook-features section-wrap" id="how-it-works">
          <div className="scrapbook-heading">
            <h2>
              Not everything
              <br />
              fits in a folder.
            </h2>
            <p>
              Your ideas aren’t all the same. Your notebook shouldn’t make them
              feel that way.
            </p>
          </div>
          <div className="scrapbook-bento">
            <article className="scrapbook-main">
              <div>
                <StackSimple size={31} weight="light" />
                <h3>
                  A home for the whole
                  <br />
                  beautiful jumble.
                </h3>
                <p>
                  Save the good stuff. A picture, a paragraph, a place, a
                  possibility.
                </p>
              </div>
              <div className="scrapbook-photos">
                <Image
                  src="/variants/with-taste-skill/sol-6-1/images/desk.webp"
                  width={400}
                  height={280}
                  sizes="(max-width: 768px) 145px, 220px"
                  alt="A sketchbook with drawings on a sunlit creative desk"
                />
                <Image
                  src="/variants/with-taste-skill/sol-6-1/images/forest.webp"
                  width={400}
                  height={280}
                  sizes="(max-width: 768px) 145px, 220px"
                  alt="Sunlight and ferns in a redwood forest"
                />
              </div>
            </article>
            <article className="scrapbook-side">
              <div className="big-star">
                <Flower size={86} weight="light" />
              </div>
              <h3>
                One idea leads
                <br />
                to another.
              </h3>
              <p>
                Follow your curiosity. Connect a few thoughts. See what happens
                next.
              </p>
              <OpenNote id="books" className="inline-link">
                Follow a thought <ArrowUpRight size={18} />
              </OpenNote>
            </article>
          </div>
        </section>
        <section className="scrapbook-philosophy section-wrap" id="about">
          <span className="philosophy-doodle">
            <Heart size={43} weight="light" />
          </span>
          <h2>
            A useful place for
            <br />a wonderfully busy mind.
          </h2>
          <p>
            Not a productivity contest. Not another thing to keep up with. Just
            a little room to think, remember, and be yourself.
          </p>
        </section>
        <Pricing />
      </main>
      <Footer variant={5} />
    </>
  );
}

export function LandingPage({ variant }: { variant: number }) {
  const pages = [One, Two, Three, Four, Five];
  const Page = pages[variant - 1];
  return (
    <LandingShell key={variant} variant={variant}>
      <Page />
    </LandingShell>
  );
}
