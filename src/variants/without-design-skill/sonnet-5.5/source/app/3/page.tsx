import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const tiles = [
  { t: "Capture anything", d: "Text, voice, web clips, PDFs and screenshots, all searchable.", c: "bg-[#ffe3ec]", span: "sm:col-span-2" },
  { t: "Auto-links", d: "Related notes find each other.", c: "bg-[#dff3ff]", span: "" },
  { t: "Daily resurface", d: "One forgotten idea, every morning.", c: "bg-[#fff2c7]", span: "" },
  { t: "Ask your brain", d: "Chat with everything you have ever written, with sources.", c: "bg-[#e3f7dc]", span: "sm:col-span-2" },
  { t: "Private by default", d: "End-to-end encrypted. Your notes are not training data.", c: "bg-[#ece4ff]", span: "sm:col-span-3" },
];

export default function Page() {
  return (
    <main className={`${jakarta.className} min-h-screen bg-white text-[#1d1b2e]`}>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="flex items-center gap-2 text-lg font-extrabold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1d1b2e] text-white">e</span>
          engram
        </span>
        <a href="#" className="rounded-xl bg-[#f1eefc] px-4 py-2 text-sm font-semibold hover:bg-[#e3dcfa]">Log in</a>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-12 text-center">
        <span className="inline-block rounded-full bg-[#ece4ff] px-4 py-1 text-xs font-bold text-[#5b3fd0]">New: Ask your brain</span>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
          The notes app that <span className="text-[#5b3fd0]">thinks with you</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[#5f5c78]">
          Build a second brain without the busywork. Engram organizes, connects and recalls, so you can just think.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a href="#" className="rounded-2xl bg-[#5b3fd0] px-7 py-3.5 font-bold text-white shadow-[0_8px_0_#3d27a0] active:translate-y-1 active:shadow-[0_4px_0_#3d27a0]">Get started free</a>
          <a href="#tiles" className="rounded-2xl bg-[#f1eefc] px-7 py-3.5 font-bold">Tour</a>
        </div>
      </section>

      <section id="tiles" className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-3">
        {tiles.map((x) => (
          <div key={x.t} className={`${x.c} ${x.span} rounded-3xl p-8`}>
            <h3 className="text-2xl font-extrabold">{x.t}</h3>
            <p className="mt-2 max-w-md text-[#4b4863]">{x.d}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-24 max-w-4xl px-6">
        <div className="rounded-[2rem] bg-[#1d1b2e] p-10 text-center text-white">
          <p className="text-3xl font-bold leading-snug">Join 120,000 people who never lose a thought.</p>
          <a href="#" className="mt-6 inline-block rounded-2xl bg-white px-6 py-3 font-bold text-[#1d1b2e]">Create your brain</a>
        </div>
      </section>
      <footer className="px-6 py-16 pb-24 text-center text-sm text-[#8a87a3]">&copy; Engram</footer>
    </main>
  );
}
