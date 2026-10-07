import Link from "next/link";

const words = ["CAPTURE", "CONNECT", "RESURFACE", "REMEMBER EVERYTHING", "NO MORE LOST IDEAS"];

const steps = [
  { no: "01", title: "DUMP IT", body: "Jot it, clip it, speak it. Messy is fine. Synapse keeps the mess safe.", color: "bg-[#FF6FB5]" },
  { no: "02", title: "LINK IT", body: "Mention an idea and Synapse wires it to everything related. Zero folders.", color: "bg-[#5CE1E6]" },
  { no: "03", title: "FIND IT", body: "Ask a question in plain English and get your own notes back, sourced.", color: "bg-[#A8F06A]" },
];

const box = "border-[4px] border-black shadow-[8px_8px_0_0_#000]";

export default function VariantFive() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[#FFE14D] font-sans text-black">
      <div className="overflow-hidden border-b-[4px] border-black bg-black py-3 text-[#FFE14D]">
        <div className="flex w-max animate-marquee whitespace-nowrap font-black uppercase tracking-tight text-lg">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0">
              {Array.from({ length: 3 }).flatMap((_, j) =>
                words.map((w) => (
                  <span key={`${rep}-${j}-${w}`} className="px-6">
                    {w} <span className="text-[#FF6FB5]">✱</span>
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-6">
        <span className={`${box} -rotate-2 bg-white px-4 py-1.5 text-2xl font-black tracking-tight`}>SYNAPSE!</span>
        <nav className="hidden gap-8 text-sm font-bold uppercase md:flex">
          <a href="#how" className="hover:underline decoration-4 underline-offset-4">How</a>
          <a href="#" className="hover:underline decoration-4 underline-offset-4">Pricing</a>
          <a href="#" className="hover:underline decoration-4 underline-offset-4">Blog</a>
        </nav>
        <Link href="#" className={`${box} bg-[#FF6FB5] px-5 py-2.5 text-sm font-black uppercase transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[10px_10px_0_0_#000]`}>
          Sign up free
        </Link>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6">
        <section className="relative py-16 md:py-24">
          <div className="absolute -right-2 top-8 hidden h-36 w-36 -rotate-12 items-center justify-center rounded-full border-[4px] border-black bg-[#5CE1E6] text-center text-sm font-black uppercase leading-tight shadow-[6px_6px_0_0_#000] md:flex md:animate-float">
            Free<br />forever<br />plan ✱
          </div>

          <h1 className="max-w-5xl text-[3.25rem] font-black uppercase leading-[0.92] tracking-tighter sm:text-7xl md:text-[7.5rem]">
            Your brain,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-[#FF6FB5] px-3 [box-decoration-break:clone]">but tidy.</span>
            </span>
          </h1>

          <p className="mt-10 max-w-xl text-xl font-bold leading-snug md:text-2xl">
            Synapse is the second brain for people with too many tabs and too many good ideas.
          </p>

          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Link href="#" className={`${box} bg-black px-8 py-4 text-center text-lg font-black uppercase text-[#FFE14D] transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#FF6FB5]`}>
              Start my brain →
            </Link>
            <a href="#how" className="text-lg font-black uppercase underline decoration-[#FF6FB5] decoration-[6px] underline-offset-4">
              Show me how
            </a>
          </div>
        </section>

        <section id="how" className="scroll-mt-8 pb-24">
          <h2 className="mb-12 text-4xl font-black uppercase tracking-tight md:text-6xl">
            Three moves. <span className="bg-[#5CE1E6] px-2">Done.</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.no}
                className={`${box} ${s.color} p-7 ${i === 1 ? "md:-translate-y-6" : ""}`}
              >
                <p className="text-6xl font-black tracking-tighter">{s.no}</p>
                <h3 className="mt-6 text-3xl font-black tracking-tight">{s.title}</h3>
                <p className="mt-4 text-lg font-semibold leading-snug">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 pb-24 md:grid-cols-2">
          <blockquote className={`${box} bg-white p-8`}>
            <p className="text-2xl font-black leading-tight md:text-3xl">
              &ldquo;I found a note from 2023 that solved my problem today. I cried a little.&rdquo;
            </p>
            <footer className="mt-6 font-bold uppercase">— Early user, design lead</footer>
          </blockquote>
          <div className={`${box} flex flex-col justify-between bg-black p-8 text-white`}>
            <p className="text-2xl font-black uppercase leading-tight md:text-3xl">
              Built for ideas that refuse to stay in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-black uppercase">
              {["Offline", "Private", "Exportable", "Fast"].map((t) => (
                <span key={t} className="border-[3px] border-[#FFE14D] px-3 py-1 text-[#FFE14D]">{t}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={`${box} mb-24 bg-[#FF6FB5] p-10 text-center md:p-20`}>
          <h2 className="mx-auto max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-8xl">
            Stop losing good ideas.
          </h2>
          <Link href="#" className={`${box} mt-12 inline-block bg-white px-10 py-5 text-xl font-black uppercase transition-transform hover:-translate-x-1 hover:-translate-y-1`}>
            Get Synapse free
          </Link>
        </section>
      </main>

      <footer className="border-t-[4px] border-black bg-black px-6 pb-28 pt-10 text-[#FFE14D]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-2xl font-black uppercase tracking-tight">Synapse!</p>
          <div className="flex flex-wrap gap-6 text-sm font-bold uppercase">
            <a href="#" className="hover:text-white">Docs</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <p className="text-sm font-bold">© 2026</p>
        </div>
      </footer>
    </div>
  );
}
