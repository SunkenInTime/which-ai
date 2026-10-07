import Link from "next/link";

const reviewItems = [
  { label: "Revisit: Ostrom on commons", done: true },
  { label: "Follow up: hiring rubric draft", done: true },
  { label: "Merge duplicate: onboarding ideas", done: false },
];

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-3xl border border-stone-200/80 bg-white p-7 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default function VariantThree() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-stone-100 font-sans text-stone-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid h-8 w-8 grid-cols-2 gap-[3px] rounded-lg bg-blue-600 p-[7px]">
            <span className="rounded-[2px] bg-white" />
            <span className="rounded-[2px] bg-white/60" />
            <span className="rounded-[2px] bg-white/60" />
            <span className="rounded-[2px] bg-white" />
          </span>
          Synapse
        </div>
        <nav className="hidden items-center gap-7 text-sm text-stone-500 md:flex">
          <a href="#features" className="hover:text-stone-900">Features</a>
          <a href="#" className="hover:text-stone-900">Teams</a>
          <a href="#" className="hover:text-stone-900">Pricing</a>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <a href="#" className="hidden px-3 py-2 text-stone-600 hover:text-stone-900 sm:block">Sign in</a>
          <Link href="#" className="rounded-full bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
            Try free
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6">
        <section className="flex flex-col items-start gap-6 pb-14 pt-12 md:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Now with recall that cites its sources
          </span>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Everything you know, <span className="text-blue-600">one search away.</span>
          </h1>
          <p className="max-w-xl text-lg leading-8 text-stone-600">
            Synapse keeps the articles, meeting notes and half-formed ideas you collect, and
            brings back the right ones before you realise you need them.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#" className="rounded-full bg-stone-900 px-6 py-3 font-medium text-white transition-colors hover:bg-stone-700">
              Get started free
            </Link>
            <a href="#" className="rounded-full border border-stone-300 bg-white px-6 py-3 font-medium text-stone-800 transition-colors hover:bg-stone-50">
              Book a walkthrough
            </a>
          </div>
        </section>

        <section id="features" className="grid grid-cols-1 gap-4 pb-20 md:grid-cols-6 md:auto-rows-[minmax(220px,auto)]">
          {/* Capture */}
          <Card className="md:col-span-4">
            <p className="text-sm font-medium text-blue-600">Capture</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Save anything, from anywhere</h2>
            <p className="mt-2 max-w-md text-stone-600">Browser clipper, email forwarding, voice memos. No format decisions.</p>
            <div className="mt-6 space-y-2.5">
              {[
                ["Clipped from web", "Why interest rates lag the economy"],
                ["Forwarded email", "Q3 planning — notes from Priya"],
                ["Voice memo · 2:14", "Idea for onboarding checklist"],
              ].map(([kind, title]) => (
                <div key={title} className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3">
                  <span className="rounded-md bg-white px-2 py-0.5 text-xs text-stone-500 ring-1 ring-stone-200">{kind}</span>
                  <span className="truncate text-sm">{title}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Ask */}
          <Card className="md:col-span-2 md:row-span-2 flex flex-col">
            <p className="text-sm font-medium text-blue-600">Ask</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Question your notes</h2>
            <div className="mt-8 flex flex-1 flex-col gap-3 text-sm">
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-stone-900 px-4 py-3 text-white">
                What did we decide about pricing in March?
              </div>
              <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-blue-50 px-4 py-3 leading-6 text-stone-800">
                Usage-based pricing, with a seat floor for teams. Two notes support this.
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  <span className="rounded-full bg-white px-2.5 py-1 text-blue-700 ring-1 ring-blue-200">Decision · Mar 12</span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-blue-700 ring-1 ring-blue-200">Pricing test results</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Backlinks */}
          <Card className="md:col-span-4">
            <p className="text-sm font-medium text-blue-600">Connect</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Backlinks you didn&apos;t have to make</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Pricing experiments", "4 links"],
                ["Customer interviews", "7 links"],
                ["Reading: Hard Things", "2 links"],
              ].map(([title, count]) => (
                <div key={title} className="rounded-2xl border border-stone-200 p-4">
                  <p className="text-sm font-medium">{title}</p>
                  <p className="mt-1 text-xs text-stone-500">{count}</p>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${40 + title.length * 3}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tags */}
          <Card className="md:col-span-2">
            <p className="text-sm font-medium text-blue-600">Organise</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">Tags that stay out of the way</h2>
            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              {["research", "product", "reading", "q3", "hiring", "ideas"].map((t) => (
                <span key={t} className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">#{t}</span>
              ))}
            </div>
          </Card>

          {/* Review */}
          <Card className="md:col-span-2">
            <p className="text-sm font-medium text-blue-600">Review</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">A five-minute morning review</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {reviewItems.map(({ label, done }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className={`grid h-5 w-5 place-items-center rounded-md ${done ? "bg-blue-600 text-white" : "border border-stone-300"}`}>
                    {done && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                    )}
                  </span>
                  <span className={done ? "text-stone-500 line-through" : ""}>{label}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Sync */}
          <Card className="md:col-span-2">
            <p className="text-sm font-medium text-blue-600">Everywhere</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">Works offline, syncs everywhere</h2>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-stone-600">
              {["Mac", "iPhone", "Web", "Android", "Chrome", "Obsidian export"].map((d) => (
                <span key={d} className="rounded-lg bg-stone-100 px-2.5 py-1.5">{d}</span>
              ))}
            </div>
          </Card>
        </section>

        <section className="pb-24">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-blue-600 p-10 text-white md:flex-row md:items-center md:p-14">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Stop searching. Start remembering.</h2>
              <p className="mt-3 max-w-md text-blue-100">Import your existing notes in one click. Free for individuals.</p>
            </div>
            <Link href="#" className="shrink-0 rounded-full bg-white px-6 py-3 font-medium text-blue-700 transition-colors hover:bg-blue-50">
              Import and start
            </Link>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 pb-28 pt-6 text-sm text-stone-500 md:flex-row md:justify-between">
        <p>© 2026 Synapse</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-stone-800">Security</a>
          <a href="#" className="hover:text-stone-800">Help</a>
          <a href="#" className="hover:text-stone-800">Status</a>
        </div>
      </footer>
    </div>
  );
}
