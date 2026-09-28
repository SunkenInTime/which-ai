import { Fraunces, Inter } from "next/font/google";

const serif = Fraunces({ subsets: ["latin"] });
const sans = Inter({ subsets: ["latin"] });

const features = [
  ["Capture without friction", "Type, paste, clip or dictate. Everything lands in one inbox, ready to be sorted later."],
  ["Links that write themselves", "Engram notices when two notes are about the same thing and introduces them."],
  ["Ask your own notes", "Question your archive in plain language and get answers with citations to your own words."],
  ["Resurfaced at the right time", "Old ideas return when a new note makes them relevant again."],
];

export default function Page() {
  return (
    <main className={`${sans.className} min-h-screen bg-[#f6f1e7] text-[#2b2620]`}>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className={`${serif.className} text-2xl italic`}>Engram</span>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#quote" className="hover:underline">Stories</a>
          <a href="#start" className="rounded-full border border-[#2b2620] px-4 py-1.5 hover:bg-[#2b2620] hover:text-[#f6f1e7]">Sign in</a>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-24 pt-16 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.25em] text-[#8a7a5c]">A second brain, in ink</p>
        <h1 className={`${serif.className} text-5xl font-light leading-[1.05] sm:text-7xl`}>
          Think it once. <em className="text-[#a4452c]">Remember it forever.</em>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#5a5245]">
          Engram is a quiet notebook that keeps everything you learn, connects it for you and brings it back when it matters.
        </p>
        <div id="start" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#" className="rounded-full bg-[#2b2620] px-7 py-3 text-[#f6f1e7] hover:bg-[#a4452c]">Start writing, free</a>
          <a href="#features" className="px-4 py-3 text-sm underline underline-offset-4">See how it works</a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6">
        <div className="rotate-[-1deg] rounded-sm border border-[#d9ceb5] bg-[#fffdf7] p-8 shadow-[6px_8px_0_#e3d9c0]">
          <p className="text-xs uppercase tracking-widest text-[#8a7a5c]">Tuesday, 9:41</p>
          <h2 className={`${serif.className} mt-2 text-3xl`}>Why spaced repetition works</h2>
          <p className="mt-4 leading-relaxed text-[#4a4338]">
            Forgetting is not failure, it is the signal. Each recall resets the curve, and{" "}
            <span className="bg-[#f3d9a4] px-1">[[Ebbinghaus curve]]</span> shows the gap widening. Related:{" "}
            <span className="bg-[#f3d9a4] px-1">[[Deliberate practice]]</span>,{" "}
            <span className="bg-[#f3d9a4] px-1">[[Reading list 2025]]</span>.
          </p>
          <p className="mt-6 border-t border-dashed border-[#d9ceb5] pt-3 text-sm italic text-[#8a7a5c]">
            Engram surfaced 3 older notes you had forgotten about.
          </p>
        </div>
      </section>

      <section id="features" className="mx-auto mt-28 max-w-5xl px-6">
        <h2 className={`${serif.className} text-4xl`}>Made for the long run</h2>
        <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {features.map(([t, d], i) => (
            <div key={t} className="border-t border-[#2b2620] pt-4">
              <span className={`${serif.className} text-sm italic text-[#a4452c]`}>No. {i + 1}</span>
              <h3 className={`${serif.className} mt-1 text-2xl`}>{t}</h3>
              <p className="mt-2 leading-relaxed text-[#5a5245]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="quote" className="mx-auto mt-28 max-w-3xl px-6 text-center">
        <blockquote className={`${serif.className} text-3xl font-light italic leading-snug`}>
          &ldquo;I stopped losing ideas. Three years of reading now feels like one conversation with myself.&rdquo;
        </blockquote>
        <p className="mt-4 text-sm text-[#8a7a5c]">Mara Ellison, research librarian</p>
      </section>

      <footer className="mx-auto mt-28 max-w-5xl border-t border-[#d9ceb5] px-6 py-10 pb-24 text-sm text-[#8a7a5c]">
        &copy; Engram. Written by hand, remembered by machine.
      </footer>
    </main>
  );
}
