import { Capture } from "../ui/capture";
import { Brain } from "@phosphor-icons/react/dist/ssr";

const cards = [
  { quote: "I stopped losing ideas the week I started using it.", name: "Maya Okafor", role: "Product designer" },
  { quote: "It reads my mind two weeks later. Unsettling. Useful.", name: "Tomás Reyes", role: "PhD candidate" },
  { quote: "The first notes app that files itself better than I do.", name: "Ines Berg", role: "Freelance writer" },
];

export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-[#faf7f2] text-[#1d1b17]">
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-6 pb-28 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={22} weight="duotone" className="text-[#d43d6a]" />
            <span className="text-sm font-semibold tracking-tight">Cortex</span>
          </div>
          <a
            href="#"
            className="rounded-full bg-[#1d1b17] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#3a372f] active:scale-[0.98]"
          >
            Start writing
          </a>
        </div>

        <div className="mt-20 grid items-center gap-12 md:mt-28 md:grid-cols-12">
          <div className="md:col-span-6">
            <h1 className="max-w-[16ch] text-5xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
              Sticky notes, but they remember everything.
            </h1>
            <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-[#5d574b]">
              Capture in one tap. Cortex pins each thought to the projects it belongs to, past and future.
            </p>
            <div className="mt-8 max-w-md">
              <Capture />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:col-span-6">
            {cards.map((c, i) => (
              <figure
                key={c.name}
                className={`rounded-2xl bg-white p-5 shadow-sm ${i === 1 ? "md:translate-x-8" : i === 2 ? "md:-translate-x-4" : ""}`}
              >
                <blockquote className="text-[15px] leading-snug text-[#1d1b17]">
                  &ldquo;{c.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-xs text-[#5d574b]">
                  {c.name} &middot; {c.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
