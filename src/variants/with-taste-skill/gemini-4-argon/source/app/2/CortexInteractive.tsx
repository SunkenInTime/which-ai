"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  MagnifyingGlass,
  Graph,
  TerminalWindow,
  ArrowsClockwise,
  CheckCircle,
  WarningCircle,
  ArrowCounterClockwise,
  Plus,
} from "@phosphor-icons/react";

interface CortexNode {
  id: string;
  slug: string;
  title: string;
  summary: string;
  latencyMs: string;
  linkedSlugs: string[];
  domain: "architecture" | "incident" | "protocol";
}

const INITIAL_NODES: CortexNode[] = [
  {
    id: "n-1",
    slug: "adr/042-sqlite-wal-concurrency",
    title: "SQLite WAL Concurrency for Local Knowledge Graphs",
    summary:
      "Enabling Write-Ahead Logging with mmap_size=268435456 allows concurrent background embedding indexing without blocking editor keystrokes.",
    latencyMs: "0.18 ms",
    linkedSlugs: ["inc/2026-08-lock-contention", "rfc/local-crdt-sync"],
    domain: "architecture",
  },
  {
    id: "n-2",
    slug: "inc/2026-08-lock-contention",
    title: "Postmortem: FTS5 Indexer Lock Under Bulk Import",
    summary:
      "Batching tokenizer transactions into 500-document frames eliminated write starvation during 40,000-file repository ingestion.",
    latencyMs: "0.24 ms",
    linkedSlugs: ["adr/042-sqlite-wal-concurrency"],
    domain: "incident",
  },
  {
    id: "n-3",
    slug: "rfc/local-crdt-sync",
    title: "Zero-Knowledge End-to-End Encrypted Delta Log",
    summary:
      "Merkle-tree state vectors synchronize atomic block edits across workstation and mobile devices using XChaCha20-Poly1305.",
    latencyMs: "0.31 ms",
    linkedSlugs: ["adr/042-sqlite-wal-concurrency"],
    domain: "protocol",
  },
];

export function CortexReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
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

export function CortexRecallEngine() {
  const [nodes, setNodes] = useState<CortexNode[]>(INITIAL_NODES);
  const [query, setQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState<
    "all" | "architecture" | "incident" | "protocol"
  >("all");
  const [selectedId, setSelectedId] = useState<string>("n-1");
  const [isReindexing, setIsReindexing] = useState(false);

  // Capture form state
  const [slugInput, setSlugInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [captureState, setCaptureState] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [captureError, setCaptureError] = useState("");

  const filtered = nodes.filter((node) => {
    const matchesDomain =
      domainFilter === "all" || node.domain === domainFilter;
    const matchesQuery =
      query.trim() === "" ||
      node.title.toLowerCase().includes(query.toLowerCase()) ||
      node.slug.toLowerCase().includes(query.toLowerCase()) ||
      node.summary.toLowerCase().includes(query.toLowerCase());
    return matchesDomain && matchesQuery;
  });

  const activeNode =
    filtered.find((n) => n.id === selectedId) || filtered[0];

  function triggerReindex() {
    setIsReindexing(true);
    setTimeout(() => {
      setIsReindexing(false);
    }, 600);
  }

  function handleCommitNode(e: React.FormEvent) {
    e.preventDefault();
    if (slugInput.trim().length < 4 || !slugInput.includes("/")) {
      setCaptureState("error");
      setCaptureError(
        "Node path must include a namespace slash (e.g. adr/049-cache-layer)."
      );
      return;
    }
    if (titleInput.trim().length < 6) {
      setCaptureState("error");
      setCaptureError(
        "Decision title must be at least 6 characters long."
      );
      return;
    }

    setCaptureState("loading");
    setCaptureError("");

    setTimeout(() => {
      const created: CortexNode = {
        id: `n-${nodes.length + 10}`,
        slug: slugInput.trim().toLowerCase(),
        title: titleInput.trim(),
        summary:
          "Committed to local SQLite graph with bidirectional AST backlinks and FTS5 trigram vectors.",
        latencyMs: "0.14 ms",
        linkedSlugs: ["adr/042-sqlite-wal-concurrency"],
        domain: "architecture",
      };
      setNodes((prev) => [created, ...prev]);
      setSelectedId(created.id);
      setSlugInput("");
      setTitleInput("");
      setCaptureState("success");
    }, 450);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left 7 columns: Semantic Query & Graph Node Inspector */}
      <div className="lg:col-span-7 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <label
              htmlFor="cortex-semantic-query"
              className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-2"
            >
              Query local FTS5 + vector graph
            </label>
            <div className="relative">
              <MagnifyingGlass
                size={16}
                weight="regular"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
              />
              <input
                id="cortex-semantic-query"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ADRs, incidents, or slugs (e.g. sqlite, crdt, wal)"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-4 font-jetbrains text-xs text-zinc-900 placeholder:text-zinc-500 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={triggerReindex}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-zinc-100 px-4 text-xs font-semibold text-zinc-900 transition-transform hover:bg-zinc-200 active:scale-[0.98] whitespace-nowrap dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            <ArrowsClockwise size={15} weight="regular" />
            <span>Rebuild index</span>
          </button>
        </div>

        {/* Domain Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          {(
            [
              { id: "all", label: "All Nodes" },
              { id: "architecture", label: "ADRs" },
              { id: "incident", label: "Postmortems" },
              { id: "protocol", label: "RFCs" },
            ] as const
          ).map((item) => {
            const active = domainFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setDomainFilter(item.id)}
                className={`rounded-xl px-3 py-1.5 font-jetbrains text-xs font-medium transition-all active:scale-[0.98] ${
                  active
                    ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-zinc-950"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Skeletal Loading State */}
        {isReindexing ? (
          <div aria-live="polite" className="mt-6 space-y-3 py-4">
            <div className="h-6 w-2/5 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-20 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800/70" />
            <div className="h-12 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800/70" />
          </div>
        ) : filtered.length === 0 ? (
          /* Empty State */
          <div className="mt-6 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-950/60">
            <TerminalWindow
              size={28}
              weight="regular"
              className="mx-auto text-zinc-500 dark:text-zinc-400"
            />
            <h4 className="mt-3 font-space text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Zero matching graph nodes
            </h4>
            <p className="mx-auto mt-1 max-w-md text-xs text-zinc-600 dark:text-zinc-400">
              No local markdown entries matched your query predicate. Reset the filter or commit a new node on the right.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setDomainFilter("all");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-transform hover:bg-emerald-700 active:scale-[0.98] dark:bg-emerald-500 dark:text-zinc-950"
            >
              <ArrowCounterClockwise size={14} weight="regular" />
              <span>Reset query predicate</span>
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-2.5">
              {filtered.map((node) => {
                const selected = activeNode?.id === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all active:scale-[0.99] sm:flex-row sm:items-center ${
                      selected
                        ? "border-emerald-600 bg-emerald-600/5 dark:border-emerald-500 dark:bg-emerald-500/10"
                        : "border-zinc-200 bg-zinc-50/70 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div>
                      <span className="font-jetbrains text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {node.slug}
                      </span>
                      <p className="mt-1 font-space text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {node.title}
                      </p>
                    </div>
                    <span className="mt-2 sm:mt-0 font-jetbrains text-xs text-zinc-500 dark:text-zinc-400">
                      {node.latencyMs}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeNode && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Graph
                      size={16}
                      weight="regular"
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                    <span className="font-jetbrains text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {activeNode.slug}
                    </span>
                  </div>
                  <span className="font-jetbrains text-xs text-emerald-600 dark:text-emerald-400">
                    Query time: {activeNode.latencyMs}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {activeNode.summary}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="font-jetbrains text-xs text-zinc-500 dark:text-zinc-400">
                    Inbound edges:
                  </span>
                  {activeNode.linkedSlugs.map((edge) => (
                    <span
                      key={edge}
                      className="rounded-xl border border-emerald-600/30 bg-emerald-600/10 px-2.5 py-1 font-jetbrains text-xs text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300"
                    >
                      [[{edge}]]
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right 5 columns: Quick ADR / Node Commit Form */}
      <div className="lg:col-span-5 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="font-space text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Commit an Engineering Note
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Insert a new markdown node and test instant bidirectional graph linking.
        </p>

        <form onSubmit={handleCommitNode} className="mt-6 space-y-5" noValidate>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="cortex-node-slug"
              className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Namespace and note slug
            </label>
            <input
              id="cortex-node-slug"
              type="text"
              value={slugInput}
              onChange={(e) => {
                setSlugInput(e.target.value);
                if (captureState === "error") setCaptureState("idle");
              }}
              placeholder="adr/051-vector-quantization"
              className="rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 font-jetbrains text-xs text-zinc-900 placeholder:text-zinc-500 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-400"
            />
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Format: namespace/slug-name (stored as plain .md file on disk).
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="cortex-node-title"
              className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Architecture decision or incident title
            </label>
            <input
              id="cortex-node-title"
              type="text"
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
                if (captureState === "error") setCaptureState("idle");
              }}
              placeholder="Int8 Scalar Quantization for Local Embeddings"
              className="rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-400"
            />
          </div>

          {captureState === "error" && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-xl border border-red-600/30 bg-red-50 p-3 text-xs font-medium text-red-800 dark:border-red-500/30 dark:bg-red-950/60 dark:text-red-200"
            >
              <WarningCircle size={16} weight="regular" className="mt-0.5 shrink-0" />
              <span>{captureError}</span>
            </div>
          )}

          {captureState === "success" && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-50 p-3 text-xs font-medium text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/60 dark:text-emerald-200"
            >
              <CheckCircle
                size={16}
                weight="regular"
                className="shrink-0 text-emerald-600 dark:text-emerald-400"
              />
              <span>Node indexed in local SQLite graph and linked to ADR-042.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={captureState === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-60 whitespace-nowrap dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400"
          >
            <Plus size={16} weight="bold" />
            <span>
              {captureState === "loading" ? "Indexing node..." : "Commit node to graph"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
