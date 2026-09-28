import { Space_Grotesk } from "next/font/google";
import { VersionSwitcher } from "../_components/version-switcher";

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"] });

const steps = [
  ["01", "DUMP IT", "Every thought, link and half-idea into one pile."],
  ["02", "LINK IT", "Engram ties notes together. You do nothing."],
  ["03", "FIND IT", "Ask a question. Get your own answer back."],
];

export default function Page() {
  return (
    <main className={`${grotesk.className} min-h-screen bg-[#ffe500] text-black`}>
      <header className="flex items-center justify-between border-b-4 border-black px-6 py-4">
        <span className="text-2xl font-bold uppercase tracking-tighter">ENGRAM*</span>
        <a href="#" className="border-4 border-black bg-white px-4 py-1 font-bold uppercase shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]">Sign up</a>
      </header>

      <section className="border-b-4 border-black px-6 py-16">
        <h1 className="text-[clamp(3rem,13vw,11rem)] font-bold uppercase leading-[0.85] tracking-tighter">
          Your brain<br />is full.<br /><span className="bg-black px-3 text-[#ffe500]">Dump it.</span>
        </h1>
        <p className="mt-8 max-w-xl text-xl font-medium">
          A note-taking app that remembers everything so you do not have to. No folders. No fuss. No forgetting.
        </p>
        <a href="#" className="mt-8 inline-block border-4 border-black bg-[#ff4fa3] px-8 py-4 text-xl font-bold uppercase shadow-[8px_8px_0_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0_#000]">
          Start free &rarr;
        </a>
      </section>

      <div className="overflow-hidden whitespace-nowrap border-b-4 border-black bg-black py-2 text-lg font-bold uppercase text-[#ffe500]">
        CAPTURE &bull; CONNECT &bull; RECALL &bull; CAPTURE &bull; CONNECT &bull; RECALL &bull; CAPTURE &bull; CONNECT &bull; RECALL &bull; CAPTURE &bull; CONNECT &bull; RECALL
      </div>

      <section className="grid border-b-4 border-black md:grid-cols-3">
        {steps.map(([n, t, d], i) => (
          <div key={n} className={`p-8 ${i < 2 ? "border-b-4 md:border-b-0 md:border-r-4" : ""} border-black ${i === 1 ? "bg-white" : ""}`}>
            <span className="text-6xl font-bold">{n}</span>
            <h2 className="mt-4 text-3xl font-bold">{t}</h2>
            <p className="mt-2 text-lg font-medium">{d}</p>
          </div>
        ))}
      </section>

      <section className="px-6 py-20 pb-32 text-center">
        <p className="mx-auto max-w-3xl text-4xl font-bold uppercase leading-tight">
          Forgetting is a bug. <span className="underline decoration-8">We fixed it.</span>
        </p>
      </section>
      <VersionSwitcher />
    </main>
  );
}
