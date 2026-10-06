import Link from "next/link";

const versions = [
  { href: "/1", label: "01", name: "Editorial", desc: "Calm serif minimalism on warm paper white" },
  { href: "/2", label: "02", name: "Noir", desc: "Dark, AI-native, glowing gradients" },
  { href: "/3", label: "03", name: "Paper", desc: "Warm journal that feels like paper" },
  { href: "/4", label: "04", name: "Prism", desc: "Bold, loud, gradient SaaS energy" },
  { href: "/5", label: "05", name: "Graph", desc: "Visual knowledge graph on a dark canvas" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-8 py-24">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
          Second Brain — Landing Page Concepts
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight tracking-tight md:text-6xl">
          Five ways to introduce a second brain
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-500">
          Five iterations of a note-taking app landing page. Pick a version,
          or use the switcher button on any page to jump between them.
        </p>
        <div className="mt-12 flex flex-col gap-3">
          {versions.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-900"
            >
              <span className="font-mono text-sm text-zinc-400">{v.label}</span>
              <div>
                <div className="font-semibold">{v.name}</div>
                <div className="text-sm text-zinc-500">{v.desc}</div>
              </div>
              <span className="ml-auto text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-zinc-900">
                →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
