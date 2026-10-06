import type { Metadata } from "next";
import Link from "next/link";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Mnemos — Grid",
};

const features = [
  { n: "01", t: "Capture", d: "Every thought, one keystroke away. No folders, no filing decisions." },
  { n: "02", t: "Connect", d: "Notes link to notes. Structure emerges from use, not upfront planning." },
  { n: "03", t: "Recall", d: "Full-text search across everything you have ever written. Instant." },
];

export default function Grid() {
  return (
    <div
      className={`${archivo.variable} min-h-full bg-white text-black`}
      style={{ fontFamily: "var(--font-archivo), Helvetica, Arial, sans-serif" }}
    >
      <header className="border-b-2 border-black">
        <div className="mx-auto grid max-w-6xl grid-cols-12 items-center px-6 py-5">
          <div className="col-span-4 flex items-baseline gap-3">
            <span className="text-2xl font-black tracking-tighter">MNEMOS®</span>
          </div>
          <nav className="col-span-5 flex gap-6 text-sm font-medium uppercase tracking-wide">
            <Link href="#" className="hover:text-[#e30613]">Capture</Link>
            <Link href="#" className="hover:text-[#e30613]">Connect</Link>
            <Link href="#" className="hover:text-[#e30613]">Recall</Link>
          </nav>
          <div className="col-span-3 text-right">
            <Link
              href="#"
              className="bg-[#e30613] px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e30613]"
            >
              Start free
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section className="grid grid-cols-12 border-b-2 border-black py-16">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-6xl font-black leading-[0.95] tracking-tighter md:text-8xl">
              THINK.
              <br />
              LINK.
              <br />
              <span className="text-[#e30613]">REMEMBER.</span>
            </h1>
          </div>
          <div className="col-span-12 mt-8 lg:col-span-4 lg:mt-0 lg:border-l-2 lg:border-black lg:pl-8">
            <p className="text-lg leading-snug">
              Mnemos is a second brain with one rule: nothing gets filed away.
              Capture, connect, recall — in that order, every time.
            </p>
            <p className="mt-6 text-sm font-medium uppercase tracking-wide text-[#e30613]">
              Free while in beta
            </p>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-0 border-b-2 border-black">
          {features.map((f) => (
            <article
              key={f.n}
              className="col-span-12 border-b-2 border-black p-8 md:col-span-4 md:border-b-0 md:border-r-2 md:last:border-r-0"
            >
              <span className="font-mono text-sm font-bold text-[#e30613]">
                {f.n}
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-tight">{f.t}</h2>
              <p className="mt-3 leading-relaxed text-zinc-700">{f.d}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-12 items-center border-b-2 border-black py-16">
          <div className="col-span-12 md:col-span-5">
            <p className="text-[12rem] font-black leading-none tracking-tighter text-[#e30613]">
              0
            </p>
            <p className="-mt-4 text-sm font-bold uppercase tracking-widest">
              Folders required
            </p>
          </div>
          <div className="col-span-12 mt-8 md:col-span-7 md:pl-8">
            <p className="text-2xl font-medium leading-tight md:text-3xl">
              “The best way to organize a second brain is not to organize it at
              all. Let the links do the work.”
            </p>
            <p className="mt-4 text-sm uppercase tracking-wide text-zinc-500">
              — The Mnemos principle, №1
            </p>
          </div>
        </section>

        <section className="grid grid-cols-12 py-16">
          <div className="col-span-12 md:col-span-8">
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Ready when you are.
            </h2>
            <p className="mt-4 max-w-md text-zinc-700">
              Join the beta. Import your existing notes in one step. Keep
              everything you have already written.
            </p>
          </div>
          <div className="col-span-12 mt-8 md:col-span-4 md:text-right">
            <Link
              href="#"
              className="inline-block bg-black px-8 py-4 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#e30613] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Get Mnemos
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-xs font-medium uppercase tracking-widest">
          <span>Mnemos — Second brain systems</span>
          <span className="text-[#e30613]">Grid 12 / Col 6 / Gutter 24</span>
        </div>
      </footer>
    </div>
  );
}
