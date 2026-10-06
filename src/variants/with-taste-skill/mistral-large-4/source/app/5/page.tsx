"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Graph,
  Lightning,
  Sparkle,
  Waveform,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

const words = ["Capture.", "Connect.", "Recall.", "Think."];

export default function Iteration5() {
  const [wordIndex, setWordIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[#0c0a14] text-white">

      {/* Animated gradient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -left-1/4 h-[80vmax] w-[80vmax] rounded-full bg-rose-500/20 blur-[120px]"
          animate={
            reduceMotion
              ? {}
              : { x: [0, 100, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 -right-1/4 h-[70vmax] w-[70vmax] rounded-full bg-cyan-500/15 blur-[120px]"
          animate={
            reduceMotion
              ? {}
              : { x: [0, -80, 0], y: [0, 100, 0], scale: [1, 1.15, 1] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 left-1/3 h-[60vmax] w-[60vmax] rounded-full bg-amber-500/10 blur-[100px]"
          animate={
            reduceMotion
              ? {}
              : { x: [0, 60, 0], y: [0, -80, 0], scale: [1, 1.1, 1] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-amber-500">
            <Sparkle size={18} weight="fill" className="text-white" />
          </div>
          <span className="bg-gradient-to-r from-rose-300 to-amber-300 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            Mnemosyne
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden items-center gap-8 text-sm text-zinc-400 md:flex"
        >
          <a href="#features" className="transition-colors hover:text-white">Features</a>
          <a href="#magic" className="transition-colors hover:text-white">Magic</a>
          <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
        </motion.div>
        <motion.a
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          href="#start"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-transform hover:scale-105 active:scale-95"
        >
          Get started
        </motion.a>
      </nav>

      {/* Hero - Kinetic type */}
      <section className="relative z-10 mx-auto flex min-h-[70dvh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
          </span>
          AI that actually gets your brain
        </motion.div>

        <h1 className="text-5xl font-bold leading-[1.05] tracking-tighter md:text-7xl lg:text-8xl">
          <span className="block text-zinc-100">Your second brain</span>
          <span className="relative mt-2 block h-[1.1em] overflow-hidden">
            <motion.span
              key={wordIndex}
              initial={reduceMotion ? false : { y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="block bg-gradient-to-r from-rose-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent"
            >
              {words[wordIndex]}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 max-w-lg text-lg leading-relaxed text-zinc-400"
        >
          Ideas flow in. Connections form themselves. Mnemosyne turns scattered
          thoughts into a living, searchable mind.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#start"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/25"
          >
            Start free
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </motion.a>
          <motion.a
            href="#magic"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-zinc-200 backdrop-blur-md transition-colors hover:bg-white/10"
          >
            See the magic
          </motion.a>
        </motion.div>
      </section>

      {/* Floating note cards */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="relative h-[400px] md:h-[480px]">
          {[
            {
              title: "Ideas for the keynote",
              x: "5%",
              y: "10%",
              rotate: -6,
              color: "from-rose-500/20 to-rose-600/5",
              border: "border-rose-500/30",
              delay: 0,
            },
            {
              title: "Books to read this year",
              x: "30%",
              y: "40%",
              rotate: 3,
              color: "from-cyan-500/20 to-cyan-600/5",
              border: "border-cyan-500/30",
              delay: 0.1,
            },
            {
              title: "Trip: Tokyo, April",
              x: "58%",
              y: "5%",
              rotate: 5,
              color: "from-amber-500/20 to-amber-600/5",
              border: "border-amber-500/30",
              delay: 0.2,
            },
            {
              title: "Meeting notes: Q3 planning",
              x: "72%",
              y: "45%",
              rotate: -3,
              color: "from-violet-500/20 to-violet-600/5",
              border: "border-violet-500/30",
              delay: 0.3,
            },
            {
              title: "Random: why octopuses are aliens",
              x: "42%",
              y: "65%",
              rotate: -2,
              color: "from-emerald-500/20 to-emerald-600/5",
              border: "border-emerald-500/30",
              delay: 0.4,
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: card.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: card.delay, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduceMotion ? {} : { scale: 1.05, rotate: 0, zIndex: 20 }}
              className={`absolute w-52 cursor-default rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} p-4 backdrop-blur-md md:w-60`}
              style={{ left: card.x, top: card.y }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white/40" />
                <div className="h-2 w-2 rounded-full bg-white/40" />
                <div className="h-2 w-2 rounded-full bg-white/40" />
              </div>
              <p className="text-sm font-medium text-zinc-100">{card.title}</p>
              <p className="mt-2 text-xs text-zinc-500">Edited 2 min ago</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features - Glass cards */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Built for the way{" "}
            <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
              minds wander
            </span>
          </h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Graph,
              title: "Living connections",
              body: "Notes link themselves as you write. Watch your knowledge graph grow in real time.",
              gradient: "from-rose-500/20 to-rose-600/5",
              iconColor: "text-rose-400",
            },
            {
              icon: Lightning,
              title: "Thought-speed capture",
              body: "A global shortcut catches ideas before they fade. From anywhere, into your brain.",
              gradient: "from-amber-500/20 to-amber-600/5",
              iconColor: "text-amber-400",
            },
            {
              icon: Waveform,
              title: "Voice to text",
              body: "Speak your mind. Mnemosyne transcribes, organizes, and files it for you.",
              gradient: "from-cyan-500/20 to-cyan-600/5",
              iconColor: "text-cyan-400",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={reduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={reduceMotion ? {} : { y: -8 }}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${f.gradient} p-8 backdrop-blur-md`}
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ${f.iconColor}`}>
                <f.icon size={24} weight="duotone" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-zinc-400">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section id="magic" className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
        <motion.blockquote
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl font-medium leading-snug tracking-tight text-zinc-200 md:text-3xl"
        >
          &ldquo;It&apos;s like my brain, but with better search.&rdquo;
        </motion.blockquote>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <img
            src="https://picsum.photos/seed/mnemosyne-avatar-alex/80/80"
            alt="Portrait of Alex Rivera"
            className="h-11 w-11 rounded-full border-2 border-white/20 object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Alex Rivera</p>
            <p className="text-sm text-zinc-500">Founder, Studio Nine</p>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section id="start" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] border border-white/10 bg-gradient-to-br from-rose-500/20 via-zinc-900/50 to-cyan-500/20 p-12 text-center backdrop-blur-md md:p-20"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Upgrade your{" "}
            <span className="bg-gradient-to-r from-rose-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
              mind
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            Free forever for personal use. Your second brain is waiting.
          </p>
          <motion.a
            href="#signup"
            whileHover={reduceMotion ? {} : { scale: 1.05 }}
            whileTap={reduceMotion ? {} : { scale: 0.95 }}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-900 shadow-xl shadow-white/10"
          >
            Start free
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-zinc-500">
          <span className="bg-gradient-to-r from-rose-300 to-amber-300 bg-clip-text font-semibold text-transparent">
            Mnemosyne
          </span>
          <div className="flex gap-8">
            <a href="#privacy" className="transition-colors hover:text-zinc-300">Privacy</a>
            <a href="#terms" className="transition-colors hover:text-zinc-300">Terms</a>
            <a href="#twitter" className="transition-colors hover:text-zinc-300">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
