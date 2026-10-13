"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  MagnifyingGlass,
  Microphone,
  Plant,
  SunHorizon,
  CheckCircle,
  WarningCircle,
  ArrowCounterClockwise,
  Plus,
} from "@phosphor-icons/react";

interface ReflectionEntry {
  id: string;
  season: "spring" | "autumn" | "winter";
  dateLabel: string;
  title: string;
  body: string;
  echoPrompt: string;
}

const INITIAL_REFLECTIONS: ReflectionEntry[] = [
  {
    id: "r-1",
    season: "autumn",
    dateLabel: "October Morning Walk",
    title: "Why Creative Breakthroughs Require Unscheduled Silence",
    body:
      "When every hour is packed with inputs, the mind has no fallow soil to connect what it already knows. Leaving forty minutes without headphones solved the third chapter structure effortlessly.",
    echoPrompt: "Connected to a journal note from two autumns ago on walking rituals.",
  },
  {
    id: "r-2",
    season: "spring",
    dateLabel: "April Studio Notebook",
    title: "Designing Tools That Age Like Paper and Cedar",
    body:
      "Digital workspaces shouldn't clamor for attention with unread badges. They should wait patiently like a linen-bound notebook on a sunlit windowsill.",
    echoPrompt: "Resurfaced alongside your reading notes on Dieter Rams.",
  },
  {
    id: "r-3",
    season: "winter",
    dateLabel: "January Evening Tea",
    title: "Keeping Promises Small Enough to Honor Daily",
    body:
      "Three honest sentences written before sleep carry more cumulative weight over a decade than ambitious weekend essays that never happen.",
    echoPrompt: "Linked to your annual review theme: Continuity over intensity.",
  },
];

export function CanopyReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Interactive Seasonal Memory & Voice Sanctuary
 * Uses honest web glassmorphism approximation (.liquid-glass-web-approx from Appendix C)
 * Shape consistency lock:
 * - Buttons & pills: rounded-full
 * - Cards & panels: rounded-2xl
 * - Inputs: rounded-xl
 */
export function CanopyMemorySanctuary() {
  const [entries, setEntries] = useState<ReflectionEntry[]>(INITIAL_REFLECTIONS);
  const [seasonFilter, setSeasonFilter] = useState<
    "all" | "spring" | "autumn" | "winter"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>("r-1");
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Form states
  const [promptTitle, setPromptTitle] = useState("");
  const [promptBody, setPromptBody] = useState("");
  const [formState, setFormState] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const visibleEntries = entries.filter((item) => {
    const matchesSeason =
      seasonFilter === "all" || item.season === seasonFilter;
    const matchesQuery =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeason && matchesQuery;
  });

  const activeEntry =
    visibleEntries.find((e) => e.id === selectedId) || visibleEntries[0];

  function handleVoiceResurface() {
    setIsTranscribing(true);
    setTimeout(() => {
      setIsTranscribing(false);
    }, 600);
  }

  function handlePlantReflection(e: React.FormEvent) {
    e.preventDefault();
    if (promptTitle.trim().length < 4) {
      setFormState("error");
      setErrorMsg("Please give your reflection a title of at least 4 characters.");
      return;
    }
    if (promptBody.trim().length < 10) {
      setFormState("error");
      setErrorMsg(
        "Write at least 10 characters so Canopy can weave seasonal echoes."
      );
      return;
    }

    setFormState("loading");
    setErrorMsg("");

    setTimeout(() => {
      const created: ReflectionEntry = {
        id: `r-${entries.length + 10}`,
        season: "autumn",
        dateLabel: "Today's Quiet Entry",
        title: promptTitle.trim(),
        body: promptBody.trim(),
        echoPrompt:
          "Woven into your seasonal memory ring for gentle future recall.",
      };
      setEntries((prev) => [created, ...prev]);
      setSelectedId(created.id);
      setPromptTitle("");
      setPromptBody("");
      setFormState("success");
    }, 500);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left 7 columns: Frosted Glass Seasonal Recall Reader */}
      <div className="lg:col-span-7 liquid-glass-web-approx rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <label
              htmlFor="canopy-search-input"
              className="block text-xs font-semibold text-emerald-950 dark:text-emerald-100 mb-2"
            >
              Search reflections by feeling, place, or theme
            </label>
            <div className="relative">
              <MagnifyingGlass
                size={16}
                weight="regular"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-800/70 dark:text-emerald-200/70"
              />
              <input
                id="canopy-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. silence, walking, notebook, cedar"
                className="w-full rounded-xl border border-emerald-900/20 bg-white/85 py-2.5 pl-10 pr-4 text-sm text-emerald-950 placeholder:text-emerald-800/60 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/20 dark:border-emerald-200/20 dark:bg-emerald-950/80 dark:text-emerald-50 dark:placeholder:text-emerald-200/60"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleVoiceResurface}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-emerald-900/20 bg-white/80 px-4 text-xs font-semibold text-emerald-950 transition-transform hover:bg-white active:scale-[0.98] whitespace-nowrap dark:border-emerald-200/20 dark:bg-emerald-900/60 dark:text-emerald-50 dark:hover:bg-emerald-900"
          >
            <Microphone size={15} weight="regular" />
            <span>Simulate voice recall</span>
          </button>
        </div>

        {/* Season Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-emerald-900/15 pb-4 dark:border-emerald-100/15">
          {(
            [
              { id: "all", label: "All Seasons" },
              { id: "spring", label: "Spring Notes" },
              { id: "autumn", label: "Autumn Walks" },
              { id: "winter", label: "Winter Evenings" },
            ] as const
          ).map((pill) => {
            const active = seasonFilter === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setSeasonFilter(pill.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all active:scale-[0.98] ${
                  active
                    ? "bg-amber-600 text-white dark:bg-amber-500 dark:text-stone-950"
                    : "bg-white/70 text-emerald-950 hover:bg-white dark:bg-emerald-950/60 dark:text-emerald-100 dark:hover:bg-emerald-900/80"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Skeletal Loading State */}
        {isTranscribing ? (
          <div aria-live="polite" className="mt-6 space-y-4 py-4">
            <div className="h-5 w-1/3 animate-pulse rounded-xl bg-emerald-900/15 dark:bg-emerald-100/15" />
            <div className="h-20 w-full animate-pulse rounded-2xl bg-emerald-900/10 dark:bg-emerald-100/10" />
            <div className="h-12 w-full animate-pulse rounded-2xl bg-emerald-900/10 dark:bg-emerald-100/10" />
          </div>
        ) : visibleEntries.length === 0 ? (
          /* Empty State */
          <div className="mt-6 rounded-2xl border border-dashed border-emerald-900/25 bg-white/60 p-8 text-center dark:border-emerald-100/20 dark:bg-emerald-950/50">
            <Plant
              size={28}
              weight="regular"
              className="mx-auto text-amber-600 dark:text-amber-400"
            />
            <h4 className="mt-3 text-lg font-bold text-emerald-950 dark:text-emerald-50">
              No reflections found in this season
            </h4>
            <p className="mx-auto mt-1 max-w-md text-sm text-emerald-900/80 dark:text-emerald-200/80">
              Clear your search filter or plant a new daily reflection on the right.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSeasonFilter("all");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2 text-xs font-semibold text-white transition-transform hover:bg-amber-700 active:scale-[0.98] dark:bg-amber-500 dark:text-stone-950"
            >
              <ArrowCounterClockwise size={14} weight="regular" />
              <span>Show all seasonal notes</span>
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {visibleEntries.map((entry) => {
                const selected = activeEntry?.id === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedId(entry.id)}
                    className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all active:scale-[0.99] ${
                      selected
                        ? "border-amber-600 bg-amber-600/10 dark:border-amber-500 dark:bg-amber-500/15"
                        : "border-emerald-900/15 bg-white/75 hover:border-emerald-900/30 dark:border-emerald-100/15 dark:bg-emerald-950/60"
                    }`}
                  >
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                      {entry.dateLabel}
                    </span>
                    <p className="mt-2 text-sm font-bold leading-snug text-emerald-950 dark:text-emerald-50">
                      {entry.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {activeEntry && (
              <div className="rounded-2xl border border-emerald-900/15 bg-white/85 p-5 dark:border-emerald-100/15 dark:bg-emerald-950/80">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/10 pb-3 dark:border-emerald-100/10">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
                    <SunHorizon size={16} weight="regular" />
                    <span>{activeEntry.dateLabel}</span>
                  </div>
                  <span className="text-xs text-emerald-800/80 dark:text-emerald-200/80">
                    Seasonal Memory Ring
                  </span>
                </div>
                <h4 className="mt-3 text-lg font-bold text-emerald-950 dark:text-emerald-50">
                  {activeEntry.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900/90 dark:text-emerald-100/90">
                  {activeEntry.body}
                </p>
                <p className="mt-4 rounded-xl bg-amber-600/10 px-3.5 py-2 text-xs font-medium text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                  Echo: {activeEntry.echoPrompt}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right 5 columns: Plant a Daily Reflection Form */}
      <div className="lg:col-span-5 liquid-glass-web-approx rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-50">
          Plant a Quiet Reflection
        </h3>
        <p className="mt-1 text-sm text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
          Write a thought below to see how Canopy stores and resurfaces personal notes without clutter.
        </p>

        <form onSubmit={handlePlantReflection} className="mt-6 space-y-5" noValidate>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="canopy-entry-title"
              className="text-xs font-semibold text-emerald-950 dark:text-emerald-100"
            >
              Reflection title or moment
            </label>
            <input
              id="canopy-entry-title"
              type="text"
              value={promptTitle}
              onChange={(e) => {
                setPromptTitle(e.target.value);
                if (formState === "error") setFormState("idle");
              }}
              placeholder="e.g. Late Afternoon Rain on the Greenhouse"
              className="rounded-xl border border-emerald-900/20 bg-white/85 px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-800/60 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/20 dark:border-emerald-200/20 dark:bg-emerald-950/80 dark:text-emerald-50 dark:placeholder:text-emerald-200/60"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="canopy-entry-body"
              className="text-xs font-semibold text-emerald-950 dark:text-emerald-100"
            >
              What do you want your future self to remember?
            </label>
            <input
              id="canopy-entry-body"
              type="text"
              value={promptBody}
              onChange={(e) => {
                setPromptBody(e.target.value);
                if (formState === "error") setFormState("idle");
              }}
              placeholder="e.g. Slow mornings yield better architectural decisions than rushed sprints."
              className="rounded-xl border border-emerald-900/20 bg-white/85 px-4 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-800/60 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/20 dark:border-emerald-200/20 dark:bg-emerald-950/80 dark:text-emerald-50 dark:placeholder:text-emerald-200/60"
            />
          </div>

          {formState === "error" && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-2xl border border-red-600/30 bg-red-50/90 p-3 text-xs font-medium text-red-900 dark:bg-red-950/70 dark:text-red-200"
            >
              <WarningCircle size={16} weight="regular" className="mt-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {formState === "success" && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-2xl border border-amber-600/30 bg-amber-50/90 p-3 text-xs font-medium text-amber-950 dark:bg-amber-950/70 dark:text-amber-200"
            >
              <CheckCircle
                size={16}
                weight="regular"
                className="shrink-0 text-amber-600 dark:text-amber-400"
              />
              <span>Reflection planted in your seasonal sanctuary.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={formState === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-amber-700 active:scale-[0.98] disabled:opacity-60 whitespace-nowrap dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
          >
            <Plus size={16} weight="bold" />
            <span>
              {formState === "loading" ? "Planting note..." : "Plant reflection"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
