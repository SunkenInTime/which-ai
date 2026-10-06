import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500 text-xs font-bold text-white">
              M
            </span>
            Mindscape
          </span>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#product" className="hover:text-slate-900">Product</a>
            <a href="#teams" className="hover:text-slate-900">Teams</a>
            <a href="#security" className="hover:text-slate-900">Security</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#signin" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Sign in
            </a>
            <Link
              href="./5"
              className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-teal-500/30 transition-colors hover:bg-teal-600"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-20 text-center">
        <span className="rounded-full bg-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-700">
          Now with team spaces
        </span>
        <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          The second brain your whole team can share
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Mindscape turns scattered notes into a shared source of truth.
          Capture knowledge once, find it forever — alone or together.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="./5"
            className="rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/30 transition-colors hover:bg-teal-600"
          >
            Start free
          </Link>
          <a
            href="#product"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
          >
            Watch the tour
          </a>
        </div>

        <div
          id="product"
          className="mt-14 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10"
        >
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 rounded-md bg-white px-3 py-1 text-xs text-slate-400">
                mindscape.app/notes
              </span>
            </div>
            <div className="grid grid-cols-[180px_1fr] bg-white text-left text-sm">
              <aside className="border-r border-slate-200 bg-slate-50 p-4">
                <p className="px-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Spaces
                </p>
                <ul className="mt-3 space-y-1">
                  {[
                    ["📥 Inbox", true],
                    ["⭐ Starred", false],
                    ["🚀 Product launch", false],
                    ["📚 Research", false],
                    ["🧠 Team wiki", false],
                  ].map(([label, active]) => (
                    <li
                      key={label as string}
                      className={`rounded-md px-2 py-1.5 ${
                        active
                          ? "bg-teal-100 font-semibold text-teal-800"
                          : "text-slate-600"
                      }`}
                    >
                      {label}
                    </li>
                  ))}
                </ul>
              </aside>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Q3 launch plan</h2>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Synced
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Finalize positioning, ship the onboarding flow, and brief the
                  support team.{" "}
                  <span className="rounded bg-amber-100 px-1 text-amber-800">
                    @sam to review pricing page
                  </span>{" "}
                  See also:{" "}
                  <span className="font-medium text-teal-600 underline">
                    Brand guidelines
                  </span>
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    ["Backlinks", "12"],
                    ["Highlights", "34"],
                    ["Shared with", "5 people"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                    >
                      <p className="text-lg font-bold text-slate-900">{v}</p>
                      <p className="text-xs text-slate-500">{k}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Unlimited notes", "No caps, no tiers of storage anxiety."],
            ["Semantic search", "Find notes by meaning, not exact words."],
            ["Auto-linking", "Backlinks and graph built as you write."],
            ["Offline first", "Your brain works on a plane, a train, a mountain."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="teams" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Built for teams that think together
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Shared spaces keep everyone on the same page — literally. Comment
              on notes, mention teammates, and turn decisions into searchable
              knowledge.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">✓</span>
                Real-time collaboration
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">✓</span>
                Granular sharing permissions
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">✓</span>
                Full version history
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Notes created", "1.2M"],
              ["Teams onboard", "8,400"],
              ["Avg. recall time", "3 sec"],
              ["Uptime", "99.99%"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center"
              >
                <p className="text-2xl font-bold text-teal-600">{v}</p>
                <p className="mt-1 text-xs text-slate-500">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Your thoughts are yours
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          End-to-end encryption at rest and in transit, SOC 2 Type II
          compliance, and export-anytime. Your second brain belongs to you.
        </p>
        <div className="mt-8">
          <Link
            href="./5"
            className="rounded-lg bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Create your account
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 text-sm text-slate-500">
          <span>© 2026 Mindscape Inc.</span>
          <span>Version 5 · Atlas</span>
        </div>
      </footer>
    </main>
  );
}
