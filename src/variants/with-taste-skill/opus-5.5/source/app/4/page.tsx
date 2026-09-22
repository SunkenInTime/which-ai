import { Hero } from "./_components/hero";
import { CaptureMarquee } from "./_components/capture-marquee";
import { ScatterToOrder } from "./_components/scatter-to-order";
import { StickyStack } from "./_components/sticky-stack";
import { FEATURE_CARDS } from "./_components/feature-cards";
import { Testimonials } from "./_components/testimonials";
import { Pricing } from "./_components/pricing";
import { MagneticCta } from "./_components/magnetic-cta";

// Design read: consumer landing for students, writers and creative people,
// loud kinetic-type language, Tailwind v4 + Bricolage Grotesque + Motion/GSAP.
// Dials: VARIANCE 9, MOTION 8, DENSITY 3.
// Radius rule: 28px on every card and photo container, full pill on every button and the hero photo.

function Nav() {
  return (
    <header className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
      <a href="#" className="v4-display text-3xl font-[800] tracking-[-0.05em]">
        Kept<span className="text-(--v4-accent-ink)">.</span>
      </a>
      <nav aria-label="Main" className="flex items-center gap-8">
        <ul className="hidden items-center gap-8 font-medium md:flex">
          <li><a href="#features" className="hover:text-(--v4-accent-ink)">Features</a></li>
          <li><a href="#pricing" className="hover:text-(--v4-accent-ink)">Pricing</a></li>
        </ul>
        <a
          href="#pricing"
          className="inline-flex h-11 items-center rounded-full bg-(--v4-fg) px-6 font-semibold text-(--v4-bg) transition-transform active:scale-[0.97]"
        >
          Start free
        </a>
      </nav>
    </header>
  );
}

function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="pt-24 md:pt-32">
      <h2
        id="features-title"
        className="v4-display mx-auto max-w-[1400px] px-5 text-5xl font-[700] leading-[1] tracking-[-0.04em] md:px-10 md:pl-[22vw] md:text-7xl"
      >
        What happens after you hit save.
      </h2>
      <div className="mt-6 md:mt-10">
        <StickyStack cards={FEATURE_CARDS} />
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section aria-labelledby="closing-title" className="px-3 md:px-10">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-(--v4-accent) px-6 pb-14 pt-20 text-(--v4-on-accent) md:px-14 md:pb-20 md:pt-32">
        <h2
          id="closing-title"
          className="v4-display text-[15vw] font-[800] leading-[0.9] tracking-[-0.055em] md:text-[10vw] xl:text-[9.5rem]"
        >
          Don&rsquo;t lose the next good one.
        </h2>
        <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[34ch] text-lg leading-relaxed md:text-xl">
            Your notes stay plain Markdown files on your own disk, with end-to-end
            encrypted sync. Leave any time and take everything.
          </p>
          <MagneticCta href="#" tone="light" size="lg">
            Start free
          </MagneticCta>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-[1400px] px-5 pb-32 pt-20 md:px-10">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="v4-display text-6xl font-[800] tracking-[-0.05em]">
            Kept<span className="text-(--v4-accent-ink)">.</span>
          </p>
          <p className="mt-4 max-w-[30ch] text-(--v4-muted)">
            A second brain for everything you read, hear and half-think.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-6 md:col-start-7">
          <div>
            <p className="font-semibold">Product</p>
            <ul className="mt-4 grid gap-2 text-(--v4-muted)">
              <li><a href="#features" className="hover:text-(--v4-fg)">Features</a></li>
              <li><a href="#pricing" className="hover:text-(--v4-fg)">Pricing</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Works on</p>
            <p className="mt-4 leading-relaxed text-(--v4-muted)">
              Mac, Windows, Linux, iPhone, Android and the web.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-wrap gap-x-8 gap-y-2 text-sm text-(--v4-muted)">
        <p>&copy; 2026 Kept</p>
        <a href="#" className="hover:text-(--v4-fg)">Privacy</a>
        <a href="#" className="hover:text-(--v4-fg)">Terms</a>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CaptureMarquee />
        <ScatterToOrder />
        <Features />
        <Testimonials />
        <Pricing />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
