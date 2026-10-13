"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  MagnifyingGlass,
  BookOpenText,
  LinkSimple,
  CheckCircle,
  WarningCircle,
  ArrowCounterClockwise,
  Plus,
  BookmarkSimple,
} from "@phosphor-icons/react";

interface FolioNote {
  id: string;
  folioCode: string;
  title: string;
  excerpt: string;
  source: string;
  year: string;
  citations: string[];
  category: "manuscript" | "treatise" | "correspondence";
}

const INITIAL_FOLIOS: FolioNote[] = [
  {
    id: "f-104",
    folioCode: "MS-104.B",
    title: "On Memory Palaces and Spatial Indexing",
    excerpt:
      "Architectural loci allow the practitioner to store thousands of cross-referenced propositions without linear decay.",
    source: "Venetian Print Archive, Box IV",
    year: "1582",
    citations: ["MS-088.A", "TR-219.C"],
    category: "treatise",
  },
  {
    id: "f-108",
    folioCode: "MS-108.A",
    title: "Marginalia in Early Botanical Compendia",
    excerpt:
      "Scholars routinely annotated specimen plates with regional soil observations, creating a living layer of empirical corrections.",
    source: "Leiden Herbarium Collection",
    year: "1644",
    citations: ["MS-104.B", "CR-402.D"],
    category: "manuscript",
  },
  {
    id: "f-115",
    folioCode: "CR-115.C",
    title: "Letters on Commonplace Book Taxonomy",
    excerpt:
      "Rather than sorting alphabetically, index entries by recurring philosophical tension so opposing arguments surface together.",
    source: "Basel Epistolary Register",
    year: "1711",
    citations: ["MS-108.A"],
    category: "correspondence",
  },
];

export function VellumReveal({
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
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function VellumArchivalDesk() {
  const [folios, setFolios] = useState<FolioNote[]>(INITIAL_FOLIOS);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "manuscript" | "treatise" | "correspondence"
  >("all");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [selectedFolioId, setSelectedFolioId] = useState<string>("f-104");

  // Form states (Label above input, explicit error/loading/success)
  const [noteTitle, setNoteTitle] = useState("");
  const [noteSource, setNoteSource] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const filteredFolios = folios.filter((f) => {
    const matchesCategory =
      activeCategory === "all" || f.category === activeCategory;
    const matchesQuery =
      query.trim() === "" ||
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      f.folioCode.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const activeFolio =
    filteredFolios.find((f) => f.id === selectedFolioId) || filteredFolios[0];

  function handleSimulateVerification() {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
    }, 650);
  }

  function handleAddMarginFolio(e: React.FormEvent) {
    e.preventDefault();
    if (noteTitle.trim().length < 5) {
      setFormStatus("error");
      setErrorMessage(
        "Please enter a folio title of at least 5 characters for archival indexing."
      );
      return;
    }
    if (noteSource.trim().length < 3) {
      setFormStatus("error");
      setErrorMessage(
        "Please specify a primary source or citation shelfmark."
      );
      return;
    }

    setFormStatus("loading");
    setErrorMessage("");

    setTimeout(() => {
      const nextNum = 120 + folios.length;
      const newEntry: FolioNote = {
        id: `f-${nextNum}`,
        folioCode: `MS-${nextNum}.N`,
        title: noteTitle.trim(),
        excerpt:
          "Newly cataloged marginalia linked automatically into your active manuscript graph.",
        source: noteSource.trim(),
        year: "2026",
        citations: ["MS-104.B"],
        category: "manuscript",
      };
      setFolios((prev) => [newEntry, ...prev]);
      setSelectedFolioId(newEntry.id);
      setNoteTitle("");
      setNoteSource("");
      setFormStatus("success");
    }, 500);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left 7 columns: Interactive Folio Search & Citation Reader */}
      <div className="lg:col-span-7 rounded-lg border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <label
              htmlFor="vellum-folio-search"
              className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2"
            >
              Search primary sources and shelfmarks
            </label>
            <div className="relative">
              <MagnifyingGlass
                size={16}
                weight="regular"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
              />
              <input
                id="vellum-folio-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by keyword or code (e.g. Venice, MS-104)"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSimulateVerification}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-100 px-4 text-xs font-semibold text-slate-800 transition-transform hover:bg-slate-200 active:-translate-y-[1px] whitespace-nowrap dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            <LinkSimple size={15} weight="regular" />
            <span>Verify citations</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
          {(
            [
              { id: "all", label: "All Folios" },
              { id: "manuscript", label: "Manuscripts" },
              { id: "treatise", label: "Treatises" },
              { id: "correspondence", label: "Correspondence" },
            ] as const
          ).map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all active:scale-[0.98] ${
                  active
                    ? "bg-blue-700 text-white dark:bg-blue-600"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skeletal Loading State */}
        {isSynthesizing ? (
          <div
            aria-live="polite"
            className="mt-6 space-y-4 py-4"
          >
            <div className="h-5 w-1/3 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-16 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800/70" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800/70" />
              <div className="h-12 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800/70" />
            </div>
          </div>
        ) : filteredFolios.length === 0 ? (
          /* Empty State */
          <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center dark:border-slate-700 dark:bg-slate-950/50">
            <BookOpenText
              size={28}
              weight="regular"
              className="mx-auto text-slate-500 dark:text-slate-400"
            />
            <h4 className="mt-3 font-cormorant text-2xl font-semibold text-slate-900 dark:text-slate-100">
              No archival folios match your filter
            </h4>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-600 dark:text-slate-400">
              Clear your current search terms or catalog a new primary source in the margin composer.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-transform hover:bg-blue-800 active:scale-[0.98] dark:bg-blue-600"
            >
              <ArrowCounterClockwise size={14} weight="regular" />
              <span>Reset archive filter</span>
            </button>
          </div>
        ) : (
          /* Populated Folios List + Detail Reader */
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {filteredFolios.map((item) => {
                const isSelected = activeFolio?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedFolioId(item.id)}
                    className={`flex flex-col justify-between rounded-lg border p-3.5 text-left transition-all active:scale-[0.99] ${
                      isSelected
                        ? "border-blue-700 bg-blue-700/5 dark:border-blue-500 dark:bg-blue-500/10"
                        : "border-slate-200 bg-slate-50/60 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-700 dark:text-blue-400">
                        {item.folioCode}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {item.year}
                      </span>
                    </div>
                    <p className="mt-2 font-cormorant text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
                      {item.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {activeFolio && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <BookmarkSimple
                      size={16}
                      weight="regular"
                      className="text-blue-700 dark:text-blue-400"
                    />
                    <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Shelfmark {activeFolio.folioCode}
                    </span>
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Provenance: {activeFolio.source}
                  </span>
                </div>
                <h4 className="mt-4 font-cormorant text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {activeFolio.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {activeFolio.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Bidirectional backlinks:
                  </span>
                  {activeFolio.citations.map((cit) => (
                    <span
                      key={cit}
                      className="rounded-lg border border-blue-700/30 bg-blue-700/10 px-2.5 py-1 font-mono text-xs font-medium text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300"
                    >
                      {cit}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right 5 columns: Margin Note Composer with Full Form States */}
      <div className="lg:col-span-5 rounded-lg border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="font-cormorant text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Append a Margin Citation
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Test how Vellum validates and links a new folio entry directly into your bibliography.
        </p>

        <form onSubmit={handleAddMarginFolio} className="mt-6 space-y-5" noValidate>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="vellum-note-title"
              className="text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              Folio proposition or heading
            </label>
            <input
              id="vellum-note-title"
              type="text"
              value={noteTitle}
              onChange={(e) => {
                setNoteTitle(e.target.value);
                if (formStatus === "error") setFormStatus("idle");
              }}
              placeholder="e.g. Treatise on Acoustic Architecture"
              className="rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
            />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Indexed automatically with your active manuscript chapter.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="vellum-note-source"
              className="text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              Primary source or archive box
            </label>
            <input
              id="vellum-note-source"
              type="text"
              value={noteSource}
              onChange={(e) => {
                setNoteSource(e.target.value);
                if (formStatus === "error") setFormStatus("idle");
              }}
              placeholder="e.g. Bodleian Folios, Shelf C"
              className="rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-700/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400"
            />
          </div>

          {formStatus === "error" && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-red-600/30 bg-red-50 p-3 text-xs font-medium text-red-800 dark:border-red-500/30 dark:bg-red-950/60 dark:text-red-200"
            >
              <WarningCircle size={16} weight="regular" className="mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {formStatus === "success" && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-lg border border-blue-700/30 bg-blue-50 p-3 text-xs font-medium text-blue-900 dark:border-blue-500/30 dark:bg-blue-950/60 dark:text-blue-200"
            >
              <CheckCircle size={16} weight="regular" className="shrink-0 text-blue-700 dark:text-blue-400" />
              <span>Folio cataloged and linked to MS-104.B in the reader.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={formStatus === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-800 active:scale-[0.98] disabled:opacity-60 whitespace-nowrap dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <Plus size={16} weight="bold" />
            <span>
              {formStatus === "loading" ? "Cataloging folio..." : "Catalog folio entry"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
