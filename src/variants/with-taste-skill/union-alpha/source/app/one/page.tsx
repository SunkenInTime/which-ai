import { Capture } from "../ui/capture";
import { Brain } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-center px-6 pb-28 pt-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-950">
          <Brain size={22} weight="duotone" />
          <span className="text-sm font-semibold tracking-tight">Cortex</span>
        </div>
        <a
          href="#"
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 active:scale-[0.98]"
        >
          Start writing
        </a>
      </div>

      <div className="mt-20 grid items-center gap-12 md:mt-28 md:grid-cols-12">
        <div className="md:col-span-7">
          <h1 className="max-w-[16ch] text-5xl font-semibold leading-[1.05] tracking-tighter text-zinc-950 md:text-6xl">
            A place to think out loud.
          </h1>
          <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-zinc-600">
            Cortex captures what you write, finds what it connects to, and files it for the version of you that needs it next.
          </p>
        </div>
        <div className="md:col-span-5">
          <Capture />
        </div>
      </div>

      <p className="mt-24 text-sm text-zinc-500">Free while in beta. No card needed.</p>
    </main>
  );
}
