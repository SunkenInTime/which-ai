import {
  ArrowRight,
  Feather,
  MagnifyingGlass,
  MoonStars,
  TreeEvergreen,
} from "@phosphor-icons/react/dist/ssr";

export default function Iteration4() {
  return (
    <div className="min-h-[100dvh] bg-[#f5f3ef] text-stone-900">

      {/* Nav */}
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white">
            <Feather size={16} weight="fill" />
          </div>
          <span className="text-[17px] font-semibold tracking-tight">Mnemosyne</span>
        </div>
        <div className="hidden items-center gap-9 text-[15px] text-stone-600 md:flex">
          <a href="#features" className="transition-colors hover:text-stone-900">Features</a>
          <a href="#calm" className="transition-colors hover:text-stone-900">Design</a>
          <a href="#pricing" className="transition-colors hover:text-stone-900">Pricing</a>
        </div>
        <a
          href="#start"
          className="rounded-full bg-stone-900 px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-stone-700 active:scale-[0.98]"
        >
          Get the app
        </a>
      </nav>

      {/* Hero - Split with image */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-stone-900 md:text-5xl lg:text-[56px]">
              Thinking,
              <br />
              <span className="text-stone-400">made effortless.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-600">
              Mnemosyne is a quiet home for your ideas. Capture a thought in
              seconds, find it again in years. Designed to feel like nothing at
              all.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#start"
                className="group inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-emerald-600 active:scale-[0.98]"
              >
                Try it free
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#calm"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium text-stone-600 transition-colors hover:text-stone-900"
              >
                See how it feels
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[24px] shadow-2xl shadow-stone-900/10">
              <img
                src="https://picsum.photos/seed/mnemosyne-calm-morning-light/800/900"
                alt="Soft morning light on a minimal desk"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl shadow-stone-900/10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <TreeEvergreen size={18} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">Morning pages</p>
                  <p className="text-xs text-stone-500">3 min ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Feather,
              title: "Light as air",
              body: "Opens in under a second. Every interaction is tuned to feel instant and weightless.",
            },
            {
              icon: MagnifyingGlass,
              title: "Find anything",
              body: "Search that understands what you mean, not just what you typed. Results appear as you think.",
            },
            {
              icon: MoonStars,
              title: "Easy on the eyes",
              body: "A warm, paper-like canvas that adapts from bright daylight to late-night sessions.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-[20px] border border-stone-200 bg-white p-8 shadow-sm shadow-stone-900/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <f.icon size={24} weight="duotone" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-stone-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design philosophy - Full-width image + text */}
      <section id="calm" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-[28px] bg-stone-900 text-stone-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-16 lg:p-20">
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-emerald-400">
                  Designed for calm
                </p>
                <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  Technology should disappear. Only your thinking should remain.
                </h2>
                <p className="mt-6 leading-relaxed text-stone-400">
                  We obsess over every pixel so you never have to think about the
                  tool. Mnemosyne gets out of the way and lets you settle into
                  your own thoughts.
                </p>
              </div>
              <div className="relative min-h-[320px] lg:min-h-full">
                <img
                  src="https://picsum.photos/seed/mnemosyne-peaceful-nature/800/800"
                  alt="Peaceful natural landscape"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <blockquote className="text-2xl font-medium leading-snug tracking-tight text-stone-800 md:text-[28px]">
          &ldquo;The first app that feels like it was made by people who actually
          write things down.&rdquo;
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <img
            src="https://picsum.photos/seed/mnemosyne-avatar-sarah/80/80"
            alt="Portrait of Sarah Kim"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-stone-900">Sarah Kim</p>
            <p className="text-sm text-stone-500">Product designer, Figma</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[28px] bg-emerald-800 px-8 py-16 text-center text-white md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Begin your practice
          </h2>
          <p className="mx-auto mt-4 max-w-md text-emerald-100/80">
            Free for personal use. Syncs across all your devices.
          </p>
          <a
            href="#signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[15px] font-medium text-emerald-900 transition-colors hover:bg-emerald-50 active:scale-[0.98]"
          >
            Get Mnemosyne
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-stone-500">
          <span className="font-medium text-stone-700">Mnemosyne</span>
          <div className="flex gap-8">
            <a href="#privacy" className="transition-colors hover:text-stone-900">Privacy</a>
            <a href="#terms" className="transition-colors hover:text-stone-900">Terms</a>
            <a href="#support" className="transition-colors hover:text-stone-900">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
