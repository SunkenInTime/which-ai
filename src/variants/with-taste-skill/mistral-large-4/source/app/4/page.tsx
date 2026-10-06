import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Graph,
  MagnifyingGlass,
  LockKey,
  Waveform,
  DeviceMobile,
} from "@phosphor-icons/react/dist/ssr";
import { BentoReveal } from "./BentoReveal";

export const metadata: Metadata = {
  title: "Mnemos - Remember everything",
  description:
    "A beautifully simple second brain. Capture, connect, and recall, on every device you own.",
};

export default function Page4() {
  return (
    <div className="min-h-[100dvh] bg-[#0c0e0d] text-zinc-100">
      {/* Nav */}
      <header className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <Link href="./4" className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-gradient-to-br from-zinc-200 to-zinc-500 text-sm font-bold text-zinc-900">
            M
          </span>
          Mnemos
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] text-zinc-400 md:flex">
          <Link href="./4" className="transition-colors hover:text-zinc-100">Overview</Link>
          <Link href="./4" className="transition-colors hover:text-zinc-100">Features</Link>
          <Link href="./4" className="transition-colors hover:text-zinc-100">Privacy</Link>
          <Link href="./4" className="transition-colors hover:text-zinc-100">Support</Link>
        </nav>
        <Link
          href="./4"
          className="rounded-full bg-zinc-100 px-4 py-2 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-white active:scale-[0.97]"
        >
          Get Mnemos
        </Link>
      </header>

      {/* Hero - centered, premium, generous space */}
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center md:pt-24">
        <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-zinc-500">
          Introducing Mnemos
        </p>
        <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-zinc-50 md:text-7xl">
          Remember
          <br />
          everything.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-zinc-400">
          Mnemos is a second brain that captures your ideas, connects them
          automatically, and brings them back exactly when you need them.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <Link
            href="./4"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-[14px] font-medium text-zinc-900 transition-colors hover:bg-white active:scale-[0.97]"
          >
            Get started
            <ArrowRight size={14} weight="bold" />
          </Link>
          <Link
            href="./4"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-6 py-3 text-[14px] font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white active:scale-[0.97]"
          >
            Watch the film
          </Link>
        </div>
      </section>

      {/* Hero image */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Image
          src="https://picsum.photos/seed/mnemos-premium-still/1600/900?grayscale"
          alt="A minimalist desk setup with soft morning light"
          width={1600}
          height={900}
          priority
          className="w-full rounded-3xl border border-zinc-800 object-cover"
        />
      </section>

      {/* Bento grid - 5 cells, asymmetric */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
          Everything in its place.
        </h2>
        <BentoReveal>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[220px_220px]">
            {/* Cell 1 - large, image */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 md:col-span-4 md:row-span-2">
              <Image
                src="https://picsum.photos/seed/mnemos-bento-graph/1000/900?grayscale"
                alt="Abstract network of connected ideas"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <Graph size={22} className="text-emerald-400" weight="duotone" />
                <h3 className="mt-3 text-xl font-semibold text-white">
                  Ideas, connected
                </h3>
                <p className="mt-1 max-w-sm text-sm text-zinc-300">
                  Mnemos links related notes as you write, building a graph of
                  your thinking without you lifting a finger.
                </p>
              </div>
            </div>

            {/* Cell 2 - accent tinted */}
            <div className="flex flex-col justify-between rounded-3xl border border-emerald-900/40 bg-emerald-950/40 p-7 md:col-span-2">
              <MagnifyingGlass size={22} className="text-emerald-400" weight="duotone" />
              <div>
                <h3 className="text-lg font-semibold text-zinc-50">
                  Find anything
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Semantic search recalls the note you half-remember.
                </p>
              </div>
            </div>

            {/* Cell 3 - dark neutral */}
            <div className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7 md:col-span-2">
              <LockKey size={22} className="text-zinc-400" weight="duotone" />
              <div>
                <h3 className="text-lg font-semibold text-zinc-50">
                  Private by design
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  End-to-end encrypted. Your mind belongs to you.
                </p>
              </div>
            </div>

            {/* Cell 4 - wide, image strip */}
            <div className="relative overflow-hidden rounded-3xl border border-zinc-800 md:col-span-3">
              <Image
                src="https://picsum.photos/seed/mnemos-bento-voice/800/440?grayscale"
                alt="A person speaking a voice note"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-7">
                <Waveform size={22} className="text-emerald-400" weight="duotone" />
                <h3 className="mt-3 text-lg font-semibold text-white">
                  Capture by voice
                </h3>
                <p className="mt-1 max-w-[200px] text-sm text-zinc-300">
                  Dictate a thought on the go. Mnemos transcribes it.
                </p>
              </div>
            </div>

            {/* Cell 5 - device */}
            <div className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-800 to-zinc-900 p-7 md:col-span-3">
              <DeviceMobile size={22} className="text-zinc-300" weight="duotone" />
              <div>
                <h3 className="text-lg font-semibold text-zinc-50">
                  Every device
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Phone, tablet, desktop. Your brain, everywhere, in sync.
                </p>
              </div>
            </div>
          </div>
        </BentoReveal>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <blockquote className="text-xl leading-relaxed text-zinc-300 md:text-2xl">
          &ldquo;The first notes app that feels like it was made by people who
          actually take notes.&rdquo;
        </blockquote>
        <p className="mt-6 text-sm text-zinc-500">
          <span className="font-medium text-zinc-300">Mara Chen</span>
          <span className="mx-2 text-zinc-700">/</span>
          Product designer
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#0c0e0d] p-14 text-center md:p-20">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            Your second brain awaits.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-zinc-400">
            Free to start. No credit card. Export everything, anytime.
          </p>
          <Link
            href="./4"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-[14px] font-medium text-zinc-900 transition-colors hover:bg-white active:scale-[0.97]"
          >
            Get Mnemos free
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-xs text-zinc-600">
          <span>Mnemos. Remember everything.</span>
          <div className="flex gap-6">
            <Link href="./4" className="transition-colors hover:text-zinc-300">Privacy</Link>
            <Link href="./4" className="transition-colors hover:text-zinc-300">Terms</Link>
            <Link href="./4" className="transition-colors hover:text-zinc-300">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
