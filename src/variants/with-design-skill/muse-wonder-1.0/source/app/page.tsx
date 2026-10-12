import Link from "next/link";
import Switcher from "./components/Switcher";

const cards = [
  { href: "/1", n: "01", name: "The Garden", desc: "Notes that grow. Organic, calm, botanical.", bg: "#EDF2E4", ink: "#21301F", accent: "#5A7D4F" },
  { href: "/2", n: "02", name: "The Constellation", desc: "Your thoughts, mapped like stars.", bg: "#0B1026", ink: "#E8EAF6", accent: "#8B7CF0" },
  { href: "/3", n: "03", name: "The Laboratory", desc: "Precision instruments for ideas.", bg: "#FFFFFF", ink: "#101014", accent: "#2438FF" },
  { href: "/4", n: "04", name: "The Midnight Library", desc: "A quiet archive that remembers.", bg: "#1E1526", ink: "#F3EAD8", accent: "#C9A86A" },
  { href: "/5", n: "05", name: "The Pop Studio", desc: "Loud, joyful, impossible to forget.", bg: "#FFD93D", ink: "#171717", accent: "#FF6B9D" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F2ED] px-6 py-16 pb-36 text-[#171717]" style={{ fontFamily: "'Inter',sans-serif" }}>
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold text-black/50">Noema — your second brain</p>
        <h1 className="mt-3 max-w-2xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl">Five ways to remember everything.</h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/60">One product, five distinct landing pages. Pick a direction to explore it in full, or use the switcher at the bottom to jump between them.</p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="group rounded-3xl p-6 transition hover:-translate-y-1" style={{ background: c.bg, color: c.ink }}>
              <span className="text-sm font-bold opacity-50">{c.n}</span>
              <span className="mt-8 block text-2xl font-black tracking-tight">{c.name}</span>
              <span className="mt-2 block text-[15px] leading-relaxed opacity-70">{c.desc}</span>
              <span className="mt-6 inline-block rounded-full px-4 py-2 text-sm font-bold text-white" style={{ background: c.accent }}>View iteration {c.n} →</span>
            </Link>
          ))}
          <div className="rounded-3xl border-2 border-dashed border-black/15 p-6">
            <span className="text-2xl font-black tracking-tight">How to switch</span>
            <p className="mt-2 text-[15px] leading-relaxed text-black/60">Use the pill at the bottom of every page, the arrows to step through, or visit <span className="font-semibold text-black">/1</span> to <span className="font-semibold text-black">/5</span> directly.</p>
          </div>
        </div>
      </div>
      <Switcher />
    </main>
  );
}
