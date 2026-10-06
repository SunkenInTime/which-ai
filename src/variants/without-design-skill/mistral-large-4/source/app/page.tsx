import Link from "next/link";

const versions = [
  { href: "/1", name: "Minimal", desc: "Clean, quiet, typography-first." },
  { href: "/2", name: "Noir", desc: "Dark mode with an electric accent." },
  { href: "/3", name: "Bloom", desc: "Playful gradients and warmth." },
  { href: "/4", name: "Editorial", desc: "Serif, essays, slow thinking." },
  { href: "/5", name: "Atlas", desc: "Product tour with app preview." },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-24 text-zinc-900">
      <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">
        Mindscape — your second brain
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
        Five landing pages, one brain
      </h1>
      <p className="mt-4 max-w-md text-center text-zinc-500">
        Pick a direction. Each version is a complete landing page iteration.
      </p>
      <div className="mt-12 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {versions.map((v, i) => (
          <Link
            key={v.href}
            href={v.href}
            className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                {i + 1}. {v.name}
              </span>
              <span className="text-zinc-300 transition-colors group-hover:text-zinc-900">
                →
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">{v.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
