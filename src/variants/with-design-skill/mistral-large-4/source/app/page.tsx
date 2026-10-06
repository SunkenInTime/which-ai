import Link from "next/link";

const versions = [
  {
    n: "1",
    name: "Broadsheet",
    desc: "Editorial newspaper layout — warm paper, serif display, hairline rules, dense columns.",
  },
  {
    n: "2",
    name: "Terminal",
    desc: "Dark machine aesthetic — phosphor green on black, monospace, a live stream of thought.",
  },
  {
    n: "3",
    name: "Ink",
    desc: "Analog notebook — cream paper, ink blue, ruled lines, handwritten margin notes.",
  },
  {
    n: "4",
    name: "Grid",
    desc: "Swiss International style — strict grid, red and black on white, big numerals.",
  },
  {
    n: "5",
    name: "Garden",
    desc: "Organic and alive — deep plum, warm amber, soft shapes that breathe.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-100 px-6 py-20 font-sans">
      <div className="w-full max-w-2xl">
        <p className="text-sm tracking-wide text-zinc-500 uppercase">Mnemos</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900">
          Five takes on a second brain
        </h1>
        <p className="mt-3 max-w-lg text-zinc-600">
          The same landing page for a note-taking app, designed five different
          ways. Pick a direction:
        </p>
        <ul className="mt-10 flex flex-col divide-y divide-zinc-300 border-y border-zinc-300">
          {versions.map((v) => (
            <li key={v.n}>
              <Link
                href={`/${v.n}`}
                className="group flex items-baseline gap-6 py-4 transition-colors hover:bg-white"
              >
                <span className="font-mono text-sm text-zinc-400 group-hover:text-zinc-900">
                  /{v.n}
                </span>
                <span className="w-28 shrink-0 font-medium text-zinc-900">
                  {v.name}
                </span>
                <span className="text-sm text-zinc-600">{v.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
