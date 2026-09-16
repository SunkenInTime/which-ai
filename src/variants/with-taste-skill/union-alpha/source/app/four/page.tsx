import { Capture } from "../ui/capture";
import { Brain } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
  return (
    <div className="min-h-[100dvh] bg-[#12100d] text-[#efe9df]">
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-5xl flex-col px-6 pb-28 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={22} weight="duotone" className="text-[#e08a4b]" />
            <span className="text-sm font-semibold tracking-tight">Cortex</span>
          </div>
          <a
            href="#"
            className="rounded-full bg-[#e08a4b] px-5 py-2 text-sm font-medium text-[#12100d] transition hover:bg-[#f0a268] active:scale-[0.98]"
          >
            Start writing
          </a>
        </div>

        <div className="mt-24 flex flex-1 flex-col items-center justify-center text-center md:mt-32">
          <h1 className="max-w-[20ch] text-5xl font-semibold leading-[1.1] tracking-tighter md:text-7xl">
            Keep every <em className="italic text-[#e08a4b]">loose</em> thought.
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[#b0a794]">
            Cortex is the quiet desk where half-formed ideas become a body of work.
          </p>
          <div className="mt-10 w-full max-w-md text-left">
            <Capture tone="dark" />
          </div>
        </div>

        <p className="text-center text-sm text-[#8a8272]">Free while in beta. Your notes stay yours.</p>
      </main>
    </div>
  );
}
