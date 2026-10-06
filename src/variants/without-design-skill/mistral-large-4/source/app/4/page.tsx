import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neuron — Think Bigger",
  description: "The boldest way to build your second brain.",
};

export default function VersionFour() {
  return (
    <div className="min-h-screen bg-indigo-950 text-white">

      <header className="mx-auto flex max-w-6xl items-center justify-between px-8 py-6">
        <span className="text-xl font-extrabold uppercase tracking-tighter">
          Neuron<span className="text-fuchsia-400">.</span>
        </span>
        <nav className="hidden gap-8 text-sm font-medium text-indigo-200 md:flex">
          <a href="#power" className="hover:text-white">Power</a>
          <a href="#speed" className="hover:text-white">Speed</a>
          <a href="#team" className="hover:text-white">Teams</a>
        </nav>
        <a
          href="#start"
          className="rounded-full bg-fuchsia-400 px-5 py-2 text-sm font-bold text-indigo-950 transition-transform hover:scale-105"
        >
          Join now
        </a>
      </header>

      <main className="mx-auto max-w-6xl px-8">
        <section className="py-24 md:py-36">
          <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.95] tracking-tighter md:text-8xl">
            Think
            <br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
              bigger.
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-indigo-200">
            Neuron is the note-taking app for people who refuse to forget.
            Capture everything. Connect anything. Remember forever.
          </p>
          <div className="mt-10 flex gap-4">
            <a
              href="#start"
              className="rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-400 px-8 py-4 text-sm font-bold uppercase tracking-wide text-indigo-950 shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-105"
            >
              Start free
            </a>
            <a
              href="#power"
              className="rounded-full border-2 border-indigo-400 px-8 py-4 text-sm font-bold uppercase tracking-wide text-indigo-200 transition-colors hover:bg-indigo-400 hover:text-indigo-950"
            >
              See features
            </a>
          </div>
        </section>

        <section className="grid gap-6 pb-20 md:grid-cols-3">
          {[
            {
              stat: "10M+",
              label: "notes captured daily",
              color: "from-fuchsia-400 to-pink-500",
            },
            {
              stat: "0.4s",
              label: "average search time",
              color: "from-amber-300 to-yellow-400",
            },
            {
              stat: "∞",
              label: "ideas connected",
              color: "from-emerald-300 to-teal-400",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`rounded-3xl bg-gradient-to-br ${s.color} p-8 text-indigo-950`}
            >
              <div className="text-5xl font-black tracking-tighter">{s.stat}</div>
              <div className="mt-2 text-sm font-bold uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </section>

        <section id="power" className="grid gap-8 py-20 md:grid-cols-2">
          {[
            {
              title: "Capture everything",
              body: "Text, voice, images, PDFs, scribbles. If it's a thought, Neuron catches it — in under a second.",
              color: "bg-fuchsia-500",
            },
            {
              title: "Connect anything",
              body: "Bi-directional links turn scattered notes into a living network of ideas. Your second brain, wired.",
              color: "bg-amber-400",
            },
            {
              title: "Find it forever",
              body: "AI search that actually understands you. Ask in plain words, get the exact note, every time.",
              color: "bg-emerald-400",
            },
            {
              title: "Think together",
              body: "Shared spaces, live cursors, and comments. Build knowledge with your whole team.",
              color: "bg-sky-400",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-colors hover:bg-white/10"
            >
              <div className={`mb-6 h-12 w-12 rounded-2xl ${f.color}`} />
              <h3 className="text-2xl font-extrabold uppercase tracking-tight">
                {f.title}
              </h3>
              <p className="mt-3 leading-relaxed text-indigo-200">{f.body}</p>
            </div>
          ))}
        </section>

        <section id="start" className="py-24">
          <div className="rounded-[2.5rem] bg-gradient-to-r from-fuchsia-500 via-amber-400 to-emerald-400 p-12 text-center text-indigo-950 md:p-20">
            <h2 className="text-4xl font-black uppercase tracking-tighter md:text-6xl">
              Ready to think bigger?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg font-medium">
              Join millions building their second brain with Neuron. Free to
              start, impossible to outgrow.
            </p>
            <a
              href="#top"
              className="mt-10 inline-block rounded-full bg-indigo-950 px-10 py-4 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105"
            >
              Get Neuron free
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 text-sm text-indigo-300">
          <span className="font-extrabold uppercase tracking-tighter text-white">
            Neuron<span className="text-fuchsia-400">.</span>
          </span>
          <span>© 2026 Neuron — Think bigger.</span>
        </div>
      </footer>
    </div>
  );
}
