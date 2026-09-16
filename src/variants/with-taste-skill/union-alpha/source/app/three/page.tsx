import { Capture } from "../ui/capture";
import { Brain } from "@phosphor-icons/react/dist/ssr";

const stats = [
  { n: "0", label: "folders to maintain" },
  { n: "1", label: "box to capture into" },
  { n: "\u221E", label: "connections surfaced" },
];

export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-[#f4f6fb] text-[#0c1220]">
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col px-6 pb-28 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={22} weight="duotone" className="text-[#2b4fd8]" />
            <span className="text-sm font-semibold tracking-tight">Cortex</span>
          </div>
          <a
            href="#"
            className="rounded-full bg-[#2b4fd8] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#1f3fb8] active:scale-[0.98]"
          >
            Start writing
          </a>
        </div>

        <div className="mt-24 grid gap-14 md:mt-32 md:grid-cols-12">
          <div className="md:col-span-6">
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
              Your library,
              <br />
              self-shelving.
            </h1>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-[#4a5468]">
              Every thought lands exactly where a future search will find it. No rules to write, no tags to guess.
            </p>
            <div className="mt-10 grid max-w-sm grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-3xl font-semibold text-[#2b4fd8]">{s.n}</div>
                  <div className="mt-1 text-xs leading-snug text-[#4a5468]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-6">
            <Capture />
          </div>
        </div>
      </main>
    </div>
  );
}
