import Link from "next/link";

const principles = [
  {
    no: "01",
    title: "Capture",
    body: "Forward emails, clip pages, dictate voice memos. Everything lands in one inbox you never have to sort.",
  },
  {
    no: "02",
    title: "Connect",
    body: "Synapse suggests links as you write, so an idea from March finds the idea you're having in October.",
  },
  {
    no: "03",
    title: "Resurface",
    body: "Each morning, a handful of old notes return, chosen for what you're working on right now.",
  },
];

export default function VariantOne() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[#f6f3ec] text-[#1d1b18]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <span className="font-serif text-2xl tracking-tight">
          Synapse<span className="text-[#b8462b]">.</span>
        </span>
        <nav className="hidden items-center gap-8 text-sm text-[#6b655b] md:flex">
          <a href="#method" className="hover:text-[#1d1b18]">Method</a>
          <a href="#notes" className="hover:text-[#1d1b18]">Notes</a>
          <a href="#" className="hover:text-[#1d1b18]">Pricing</a>
        </nav>
        <Link
          href="#"
          className="rounded-full bg-[#1d1b18] px-5 py-2.5 text-sm font-medium text-[#f6f3ec] transition-colors hover:bg-[#b8462b]"
        >
          Start writing
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 md:px-10">
        <section className="grid gap-14 pb-24 pt-10 md:grid-cols-12 md:pt-20">
          <div className="flex flex-col justify-center md:col-span-7">
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-[#b8462b]">
              A second brain, on paper
            </p>
            <h1 className="font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl">
              Remember everything you&apos;ve ever{" "}
              <em className="text-[#b8462b]">thought.</em>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-8 text-[#5a554c]">
              Synapse is a quiet notebook for the things you read, notice and decide. It
              remembers so you don&apos;t have to, and it hands ideas back when they&apos;re useful.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="#"
                className="rounded-full bg-[#1d1b18] px-7 py-3.5 text-base font-medium text-[#f6f3ec] transition-colors hover:bg-[#b8462b]"
              >
                Open your notebook
              </Link>
              <a href="#method" className="text-base font-medium underline decoration-[#b8462b] decoration-2 underline-offset-8">
                See how it works
              </a>
            </div>
            <p className="mt-6 text-sm text-[#8a8377]">Free for your first 500 notes. No card required.</p>
          </div>

          <div className="relative md:col-span-5">
            <div className="-rotate-2 rounded-sm bg-[#fffdf8] p-8 shadow-[0_30px_60px_-30px_rgba(60,40,20,0.35)] ring-1 ring-black/5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#8a8377]">Tuesday, 7 October</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight">On slow reading</h2>
              <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#3d3a34]">
                <p>
                  Most of what I learned this year came from rereading, not from reading new things.
                </p>
                <p className="border-l-2 border-[#b8462b] bg-[#b8462b]/5 py-1 pl-4 italic">
                  Attention is the scarce resource; memory is the one we can actually build.
                </p>
                <p>
                  This connects to my notes on <span className="underline decoration-[#b8462b]/60">commonplace books</span>
                  {" "}and the argument in <span className="underline decoration-[#b8462b]/60">Deep Work</span>.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2 border-t border-black/10 pt-5 text-xs text-[#6b655b]">
                <span className="rounded-full bg-black/5 px-3 py-1">Linked to 4 notes</span>
                <span className="rounded-full bg-black/5 px-3 py-1">Resurfaced 2× this month</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rotate-3 rounded-sm bg-[#1d1b18] px-5 py-4 text-sm text-[#f6f3ec] shadow-xl md:block">
              <p className="font-serif text-lg italic">“Didn&apos;t you write this in June?”</p>
              <p className="mt-1 text-xs text-[#b9b2a4]">— Synapse, this morning</p>
            </div>
          </div>
        </section>

        <section id="method" className="border-t border-[#1d1b18]/15 py-20">
          <div className="grid gap-12 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.no}>
                <p className="font-serif text-5xl text-[#b8462b]">{p.no}</p>
                <h3 className="mt-4 font-serif text-3xl">{p.title}</h3>
                <p className="mt-4 leading-7 text-[#5a554c]">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="notes" className="grid gap-10 border-t border-[#1d1b18]/15 py-20 md:grid-cols-12">
          <blockquote className="md:col-span-8">
            <p className="font-serif text-4xl leading-tight md:text-5xl">
              “I stopped rereading my own notes because I&apos;d forgotten I had them. Now they
              find me, usually at the exact moment I needed them.”
            </p>
          </blockquote>
          <div className="flex flex-col justify-end md:col-span-4">
            <p className="text-sm font-medium">Early reader</p>
            <p className="text-sm text-[#8a8377]">Graduate researcher, Edinburgh</p>
          </div>
        </section>

        <section className="my-10 rounded-[2rem] bg-[#1d1b18] px-8 py-16 text-center text-[#f6f3ec] md:px-16">
          <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
            Your best ideas are already written down. <em className="text-[#e8875f]">Let&apos;s find them.</em>
          </h2>
          <Link
            href="#"
            className="mt-10 inline-block rounded-full bg-[#f6f3ec] px-7 py-3.5 text-base font-medium text-[#1d1b18] transition-colors hover:bg-[#e8875f]"
          >
            Start your notebook
          </Link>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 pb-28 text-sm text-[#8a8377] md:flex-row md:justify-between md:px-10">
        <p>© 2026 Synapse. Notes that stay with you.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#1d1b18]">Privacy</a>
          <a href="#" className="hover:text-[#1d1b18]">Changelog</a>
          <a href="#" className="hover:text-[#1d1b18]">Contact</a>
        </div>
      </footer>
    </div>
  );
}
