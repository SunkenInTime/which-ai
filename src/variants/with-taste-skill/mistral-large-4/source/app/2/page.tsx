import {
  ArrowRight,
  BookOpen,
  PenNib,
  TreeStructure,
  Quotes,
} from "@phosphor-icons/react/dist/ssr";

export default function Iteration2() {
  return (
    <div className="min-h-[100dvh] bg-[#faf9f6] text-stone-900">

      {/* Nav */}
      <nav className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <PenNib size={22} className="text-amber-700" weight="duotone" />
          <span className="font-serif text-xl tracking-tight">Mnemosyne</span>
        </div>
        <div className="hidden items-center gap-10 text-sm text-stone-600 md:flex">
          <a href="#features" className="transition-colors hover:text-stone-900">Features</a>
          <a href="#philosophy" className="transition-colors hover:text-stone-900">Philosophy</a>
          <a href="#pricing" className="transition-colors hover:text-stone-900">Pricing</a>
        </div>
        <a
          href="#start"
          className="rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-900 hover:text-stone-50 active:scale-[0.98]"
        >
          Get started
        </a>
      </nav>

      {/* Hero - Editorial centered */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center md:pt-24">
        <p className="mb-6 font-serif text-sm italic tracking-wide text-amber-700">
          A quieter place to think
        </p>
        <h1 className="font-serif text-5xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
          Your second brain,
          <br />
          <em className="text-stone-500">beautifully kept.</em>
        </h1>
        <p className="mx-auto mt-8 max-w-xl font-serif text-lg leading-relaxed text-stone-600">
          Mnemosyne is a writing space that grows with you. Capture a fleeting
          thought, develop a long idea, and find it again years later, exactly
          where you left it.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#start"
            className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-700 active:scale-[0.98]"
          >
            Begin writing
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#philosophy"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
          >
            Our philosophy
          </a>
        </div>
      </section>

      {/* Hero image */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-xl shadow-stone-900/5">
          <img
            src="https://picsum.photos/seed/mnemosyne-desk-writing/1200/700"
            alt="A clean writing desk with an open notebook"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </section>

      {/* Philosophy - Editorial two-column */}
      <section id="philosophy" className="border-t border-stone-200 py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
              Writing is thinking.
              <br />
              <em className="text-stone-500">We built a home for it.</em>
            </h2>
          </div>
          <div className="space-y-6">
            <p className="font-serif text-lg leading-relaxed text-stone-600">
              Most note apps are built for speed. Ours is built for depth. Every
              detail, from the typeface to the spacing, is chosen to help you
              settle in and stay a while.
            </p>
            <p className="font-serif text-lg leading-relaxed text-stone-600">
              No feeds. No notifications. No metrics. Just you, your words, and
              the slow accumulation of understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Features - Editorial list */}
      <section id="features" className="border-t border-stone-200 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-16 font-serif text-3xl tracking-tight md:text-4xl">
            What makes it different
          </h2>
          <div className="grid gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
            {[
              {
                icon: PenNib,
                title: "A page that feels like paper",
                body: "Thoughtful typography, generous margins, and zero chrome. Writing here feels like writing anywhere you love to write.",
              },
              {
                icon: TreeStructure,
                title: "Notes that grow into trees",
                body: "Nest pages inside pages. Build outlines, wikis, and long-form projects with a structure that mirrors your mind.",
              },
              {
                icon: BookOpen,
                title: "Rediscover what you forgot",
                body: "A gentle daily review surfaces old notes at the right moment, so past thinking keeps informing present work.",
              },
              {
                icon: Quotes,
                title: "Cite as you write",
                body: "Save quotes, clippings, and references inline. Everything you read becomes part of what you write.",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-amber-700">
                  <feature.icon size={20} weight="duotone" />
                </div>
                <div>
                  <h3 className="font-serif text-xl tracking-tight">{feature.title}</h3>
                  <p className="mt-2 leading-relaxed text-stone-600">{feature.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-t border-stone-200 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <blockquote className="font-serif text-2xl leading-snug tracking-tight text-stone-800 md:text-3xl">
            &ldquo;It&apos;s the first notes app that made me want to write more, not
            organize more.&rdquo;
          </blockquote>
          <div className="mt-8">
            <p className="text-sm font-medium text-stone-800">Elena Rodriguez</p>
            <p className="mt-1 font-serif text-sm italic text-stone-500">Essayist and author</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="border-t border-stone-200 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
            Start your notebook today
          </h2>
          <p className="mx-auto mt-4 max-w-md text-stone-600">
            Free for your first 1,000 notes. No credit card required.
          </p>
          <a
            href="#signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3 text-sm font-medium text-stone-50 transition-colors hover:bg-stone-700 active:scale-[0.98]"
          >
            Begin writing
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-stone-500">
          <span className="font-serif italic">Mnemosyne</span>
          <div className="flex gap-8">
            <a href="#privacy" className="transition-colors hover:text-stone-800">Privacy</a>
            <a href="#terms" className="transition-colors hover:text-stone-800">Terms</a>
            <a href="#contact" className="transition-colors hover:text-stone-800">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
