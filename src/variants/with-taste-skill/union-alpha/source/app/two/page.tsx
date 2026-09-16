import { Capture } from "../ui/capture";
import { Brain } from "@phosphor-icons/react/dist/ssr";

const points = [
  { title: "Capture", body: "One box. Notes, links, tags, events. It figures out the type." },
  { title: "Connect", body: "Every entry links back to what you already know, automatically." },
  { title: "Resurface", body: "Old thinking returns exactly when new work makes it relevant." },
];

export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-[#101912] text-[#e9f0e6]">
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-6 pb-28 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={22} weight="duotone" className="text-[#9fd88a]" />
            <span className="text-sm font-semibold tracking-tight">Cortex</span>
          </div>
          <a
            href="#"
            className="rounded-full bg-[#9fd88a] px-5 py-2 text-sm font-medium text-[#101912] transition hover:bg-[#b8e6a6] active:scale-[0.98]"
          >
            Start writing
          </a>
        </div>

        <div className="mt-24 max-w-3xl md:mt-32">
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
            Think in one place.
            <br />
            Find it forever.
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-[#a8bfa0]">
            A second brain that quietly organizes itself, so your attention stays on the idea, not the filing.
          </p>
          <div className="mt-8 max-w-md">
            <Capture tone="dark" />
          </div>
        </div>

        <div className="mt-auto grid gap-10 border-t border-white/10 pt-8 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#9fd88a]">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#a8bfa0]">{p.body}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
