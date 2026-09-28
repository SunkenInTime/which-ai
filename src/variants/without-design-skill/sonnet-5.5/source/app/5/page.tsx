import { Sora } from "next/font/google";
import { VersionSwitcher } from "../_components/version-switcher";

const sora = Sora({ subsets: ["latin"] });

const nodes = [
  { x: 50, y: 50, r: 9, l: "You" },
  { x: 20, y: 25, r: 5, l: "Reading" },
  { x: 78, y: 22, r: 6, l: "Projects" },
  { x: 85, y: 62, r: 5, l: "Ideas" },
  { x: 58, y: 84, r: 6, l: "People" },
  { x: 22, y: 70, r: 5, l: "Meetings" },
  { x: 40, y: 12, r: 3, l: "" },
  { x: 92, y: 40, r: 3, l: "" },
];
const edges: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [2, 3], [2, 6], [3, 7], [1, 6], [4, 5]];

export default function Page() {
  return (
    <main className={`${sora.className} relative min-h-screen overflow-hidden bg-[#070716] text-[#e8e6ff]`}>
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#5b3fd066,transparent)]" />
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm">
        <span className="font-semibold tracking-wide">&#9673; Engram</span>
        <a href="#" className="rounded-full border border-white/20 px-4 py-1.5 hover:bg-white/10">Enter</a>
      </header>

      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-10 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Every note is a <span className="bg-gradient-to-r from-[#8f7cff] to-[#4de1ff] bg-clip-text text-transparent">star</span>. Your mind is the sky.
          </h1>
          <p className="mt-6 max-w-md text-[#a9a6d6]">
            Engram maps how your ideas connect, then lets you travel through them. A living graph of everything you know.
          </p>
          <div className="mt-8 flex gap-3">
            <a href="#" className="rounded-full bg-gradient-to-r from-[#8f7cff] to-[#4de1ff] px-7 py-3 font-semibold text-[#070716]">Begin mapping</a>
            <a href="#more" className="rounded-full border border-white/20 px-6 py-3 hover:bg-white/10">Explore</a>
          </div>
        </div>
        <svg viewBox="0 0 100 100" className="mx-auto aspect-square w-full max-w-lg" role="img" aria-label="Graph of connected notes">
          {edges.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#8f7cff" strokeOpacity="0.4" strokeWidth="0.3" />
          ))}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={n.r * 1.8} fill="#8f7cff" fillOpacity="0.12" />
              <circle cx={n.x} cy={n.y} r={n.r / 2} fill={i === 0 ? "#4de1ff" : "#c9c2ff"} />
              {n.l && <text x={n.x} y={n.y + n.r + 3.5} textAnchor="middle" fontSize="3" fill="#a9a6d6">{n.l}</text>}
            </g>
          ))}
        </svg>
      </section>

      <section id="more" className="relative mx-auto grid max-w-6xl gap-4 px-6 pb-32 sm:grid-cols-3">
        {[
          ["Constellations", "Clusters form on their own as your notes grow."],
          ["Wormholes", "Jump between distant ideas through shared links."],
          ["Light-years ago", "Old notes drift back into view when they become relevant."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <h3 className="font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-[#a9a6d6]">{d}</p>
          </div>
        ))}
      </section>
      <VersionSwitcher />
    </main>
  );
}
