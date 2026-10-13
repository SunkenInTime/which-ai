"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  MagnifyingGlass,
  Hash,
  GitFork,
  ArrowCounterClockwise,
  Plus,
  WarningCircle,
  CheckCircle,
} from "@phosphor-icons/react";

interface ZettelSlip {
  id: string;
  folgezettel: string;
  title: string;
  proposition: string;
  linksCount: number;
  branch: "epistemology" | "systems" | "rhetoric";
}

const INITIAL_SLIPS: ZettelSlip[] = [
  {
    id: "z-1",
    folgezettel: "14a1",
    title: "Principle of Atomicity in Permanent Notes",
    proposition:
      "Each slip contains exactly one self-contained argument so it can be recombined into any future essay without dragging extraneous context.",
    linksCount: 19,
    branch: "epistemology",
  },
  {
    id: "z-2",
    folgezettel: "14a1a",
    title: "Alphanumeric Branching Over Topic Folders",
    proposition:
      "Topic folders force premature categorization. Alternating numbers and letters allows organic chains of thought to sprout anywhere.",
    linksCount: 12,
    branch: "systems",
  },
  {
    id: "z-3",
    folgezettel: "14a2",
    title: "Surprise as a Metric of Retrieval Quality",
    proposition:
      "A second brain succeeds when querying an old concept surfaces an unexpected counterpoint written years earlier under a different project.",
    linksCount: 27,
    branch: "rhetoric",
  },
  {
    id: "z-4",
    folgezettel: "21b",
    title: "Literature Notes vs. Permanent Synthesis",
    proposition:
      "Never paste raw highlights into the main slip-box. Rewrite every source claim in your own words to force comprehension at capture time.",
    linksCount: 34,
    branch: "epistemology",
  },
];

export function ZettelReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function ZettelSlipBoxIndex() {
  const [slips, setSlips] = useState<ZettelSlip[]>(INITIAL_SLIPS);
  const [query, setQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState<
    "all" | "epistemology" | "systems" | "rhetoric"
  >("all");
  const [selectedId, setSelectedId] = useState<string>("z-1");
  const [isRecalculating, setIsRecalculating] = useState(false);

  // Form states
  const [sequenceCode, setSequenceCode] = useState("");
  const [slipClaim, setSlipClaim] = useState("");
  const [formState, setFormState] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [errorText, setErrorText] = useState("");

  const visibleSlips = slips.filter((s) => {
    const matchesBranch =
      branchFilter === "all" || s.branch === branchFilter;
    const matchesQuery =
      query.trim() === "" ||
      s.folgezettel.toLowerCase().includes(query.toLowerCase()) ||
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.proposition.toLowerCase().includes(query.toLowerCase());
    return matchesBranch && matchesQuery;
  });

  const activeSlip =
    visibleSlips.find((s) => s.id === selectedId) || visibleSlips[0];

  function handleTraceSequence() {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
    }, 550);
  }

  function handleInsertSlip(e: React.FormEvent) {
    e.preventDefault();
    if (sequenceCode.trim().length < 2) {
      setFormState("error");
      setErrorText(
        "Specify a valid alphanumeric Folgezettel address (e.g. 14a1b or 22a)."
      );
      return;
    }
    if (slipClaim.trim().length < 8) {
      setFormState("error");
      setErrorText(
        "Atomic proposition must be at least 8 characters."
      );
      return;
    }

    setFormState("loading");
    setErrorText("");

    setTimeout(() => {
      const nextSlip: ZettelSlip = {
        id: `z-${slips.length + 10}`,
        folgezettel: sequenceCode.trim(),
        title: slipClaim.trim(),
        proposition:
          "Atomic slip inserted directly into the Folgezettel sequence with automatic parent-child backlinks.",
        linksCount: 1,
        branch: "systems",
      };
      setSlips((prev) => [nextSlip, ...prev]);
      setSelectedId(nextSlip.id);
      setSequenceCode("");
      setSlipClaim("");
      setFormState("success");
    }, 450);
  }

  return (
    <div className="grid grid-cols-1 border border-stone-300 bg-white lg:grid-cols-12 dark:border-stone-800 dark:bg-stone-900">
      {/* Left 8 columns: High-Density Hairline Index */}
      <div className="lg:col-span-8 border-b border-stone-300 p-6 sm:p-8 lg:border-b-0 lg:border-r dark:border-stone-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <label
              htmlFor="zettel-filter-input"
              className="block text-xs font-bold text-stone-900 dark:text-stone-100 mb-2"
            >
              Filter slip-box by Folgezettel address or proposition
            </label>
            <div className="relative">
              <MagnifyingGlass
                size={16}
                weight="regular"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500 dark:text-stone-400"
              />
              <input
                id="zettel-filter-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type address or keyword (e.g. 14a1, atomicity, folders)"
                className="w-full rounded-none border border-stone-400 bg-stone-50 py-2.5 pl-10 pr-4 font-jetbrains text-xs text-stone-900 placeholder:text-stone-500 focus:border-red-600 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-400"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleTraceSequence}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-none border border-stone-400 bg-stone-100 px-4 font-jetbrains text-xs font-semibold text-stone-900 transition-transform hover:bg-stone-200 active:scale-[0.98] whitespace-nowrap dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700"
          >
            <GitFork size={15} weight="regular" />
            <span>Trace sequence</span>
          </button>
        </div>

        {/* Sequence Branch Tabs */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-stone-300 pb-4 dark:border-stone-800">
          {(
            [
              { id: "all", label: "ALL SLIPS (4)" },
              { id: "epistemology", label: "14a EPISTEMOLOGY" },
              { id: "systems", label: "14a1 SYSTEMS" },
              { id: "rhetoric", label: "14a2 RHETORIC" },
            ] as const
          ).map((tab) => {
            const active = branchFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setBranchFilter(tab.id)}
                className={`rounded-none px-3 py-1.5 font-jetbrains text-xs font-semibold transition-colors active:scale-[0.98] ${
                  active
                    ? "bg-red-600 text-white dark:bg-red-500 dark:text-stone-950"
                    : "border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-200 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300 dark:hover:bg-stone-800"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skeletal Loading State */}
        {isRecalculating ? (
          <div aria-live="polite" className="mt-6 space-y-3 py-4">
            <div className="h-8 w-full animate-pulse rounded-none bg-stone-200 dark:bg-stone-800" />
            <div className="h-8 w-full animate-pulse rounded-none bg-stone-200 dark:bg-stone-800" />
            <div className="h-24 w-full animate-pulse rounded-none bg-stone-100 dark:bg-stone-800/70" />
          </div>
        ) : visibleSlips.length === 0 ? (
          /* Empty State */
          <div className="mt-6 border border-dashed border-stone-400 bg-stone-50 p-8 text-center dark:border-stone-700 dark:bg-stone-950">
            <Hash
              size={28}
              weight="regular"
              className="mx-auto text-stone-500 dark:text-stone-400"
            />
            <h4 className="mt-3 text-lg font-bold text-stone-900 dark:text-stone-100">
              No slips at this Folgezettel address
            </h4>
            <p className="mx-auto mt-1 max-w-md text-xs text-stone-600 dark:text-stone-400">
              Clear your filter predicate or file a new atomic slip in the right-hand register.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setBranchFilter("all");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-none bg-red-600 px-4 py-2 font-jetbrains text-xs font-semibold text-white transition-transform hover:bg-red-700 active:scale-[0.98] dark:bg-red-500 dark:text-stone-950"
            >
              <ArrowCounterClockwise size={14} weight="regular" />
              <span>Reset index filter</span>
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div className="divide-y divide-stone-300 border border-stone-300 dark:divide-stone-800 dark:border-stone-800">
              {visibleSlips.map((slip) => {
                const selected = activeSlip?.id === slip.id;
                return (
                  <button
                    key={slip.id}
                    type="button"
                    onClick={() => setSelectedId(slip.id)}
                    className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors ${
                      selected
                        ? "bg-red-600/10 dark:bg-red-500/15"
                        : "bg-white hover:bg-stone-100 dark:bg-stone-900 dark:hover:bg-stone-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-14 shrink-0 font-jetbrains text-xs font-bold text-red-600 dark:text-red-400">
                        {slip.folgezettel}
                      </span>
                      <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        {slip.title}
                      </span>
                    </div>
                    <span className="shrink-0 font-jetbrains text-xs text-stone-500 dark:text-stone-400">
                      {slip.linksCount} links
                    </span>
                  </button>
                );
              })}
            </div>

            {activeSlip && (
              <div className="border-t border-stone-300 pt-5 dark:border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="font-jetbrains text-xs font-bold text-red-600 dark:text-red-400">
                    SLIP ADDRESS: {activeSlip.folgezettel}
                  </span>
                  <span className="font-jetbrains text-xs text-stone-500 dark:text-stone-400">
                    CONNECTED NODES: {activeSlip.linksCount}
                  </span>
                </div>
                <h4 className="mt-2 text-xl font-bold text-stone-900 dark:text-stone-100">
                  {activeSlip.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-stone-700 dark:text-stone-300 max-w-[65ch]">
                  {activeSlip.proposition}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right 4 columns: Atomic Slip Filing Register */}
      <div className="lg:col-span-4 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          File Atomic Slip
        </h3>
        <p className="mt-1 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
          Assign an alphanumeric sequence code and state a single self-contained proposition.
        </p>

        <form onSubmit={handleInsertSlip} className="mt-6 space-y-5" noValidate>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="zettel-seq-code"
              className="text-xs font-bold text-stone-900 dark:text-stone-100"
            >
              Folgezettel sequence ID
            </label>
            <input
              id="zettel-seq-code"
              type="text"
              value={sequenceCode}
              onChange={(e) => {
                setSequenceCode(e.target.value);
                if (formState === "error") setFormState("idle");
              }}
              placeholder="14a1b"
              className="rounded-none border border-stone-400 bg-stone-50 px-3.5 py-2.5 font-jetbrains text-xs text-stone-900 placeholder:text-stone-500 focus:border-red-600 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-400"
            />
            <span className="font-jetbrains text-[11px] text-stone-500 dark:text-stone-400">
              Alternating integer + letter branches from parent slip.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="zettel-slip-claim"
              className="text-xs font-bold text-stone-900 dark:text-stone-100"
            >
              Atomic proposition title
            </label>
            <input
              id="zettel-slip-claim"
              type="text"
              value={slipClaim}
              onChange={(e) => {
                setSlipClaim(e.target.value);
                if (formState === "error") setFormState("idle");
              }}
              placeholder="Cross-disciplinary links compound over decades"
              className="rounded-none border border-stone-400 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-500 focus:border-red-600 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-400"
            />
          </div>

          {formState === "error" && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-none border border-red-600 bg-red-50 p-3 text-xs font-medium text-red-900 dark:bg-red-950/70 dark:text-red-200"
            >
              <WarningCircle size={16} weight="regular" className="mt-0.5 shrink-0" />
              <span>{errorText}</span>
            </div>
          )}

          {formState === "success" && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-none border border-stone-900 bg-stone-100 p-3 text-xs font-medium text-stone-900 dark:border-stone-200 dark:bg-stone-800 dark:text-stone-100"
            >
              <CheckCircle
                size={16}
                weight="regular"
                className="shrink-0 text-red-600 dark:text-red-400"
              />
              <span>Slip filed into active Folgezettel register.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={formState === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-red-600 px-5 py-3 font-jetbrains text-xs font-bold text-white transition-colors hover:bg-red-700 active:scale-[0.98] disabled:opacity-60 whitespace-nowrap dark:bg-red-500 dark:text-stone-950 dark:hover:bg-red-400"
          >
            <Plus size={15} weight="bold" />
            <span>
              {formState === "loading" ? "FILING SLIP..." : "FILE ATOMIC SLIP"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
