"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  CornersOut,
  Plus,
  Sparkle,
  WarningCircle,
  CheckCircle,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";

/**
 * Magnetic CTA Button using Motion's useMotionValue / useTransform
 * Strict adherence to Section 3.B & Section 5:
 * NEVER use useState to track continuous pointer coordinates.
 */
export function MagneticStudioButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const translateX = useTransform(mouseX, [-60, 60], [-6, 6]);
  const translateY = useTransform(mouseY, [-30, 30], [-4, 4]);

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={reduce ? undefined : { x: translateX, y: translateY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-orange-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-orange-700 active:scale-[0.98] whitespace-nowrap dark:bg-orange-500 dark:text-zinc-950 dark:hover:bg-orange-400"
    >
      <span>{label}</span>
      <ArrowRight size={16} weight="bold" />
    </motion.a>
  );
}

interface CanvasItem {
  id: string;
  title: string;
  medium: "architecture" | "material" | "cinema";
  coordinates: string;
  note: string;
  seed: string;
}

const INITIAL_CANVAS_ITEMS: CanvasItem[] = [
  {
    id: "c-1",
    title: "Brutalist Concrete Acoustic Baffles",
    medium: "architecture",
    coordinates: "X: 140, Y: -80",
    note: "Cast-in-place board-marked concrete softens high-frequency reverberation in the north atrium.",
    seed: "atelier-concrete-acoustic-baffle",
  },
  {
    id: "c-2",
    title: "Anodized Brushed Aluminum Swatch",
    medium: "material",
    coordinates: "X: 420, Y: 110",
    note: "Bead-blasted 6061 alloy paired with warm vermilion powder-coated fasteners.",
    seed: "atelier-aluminum-metal-swatch",
  },
  {
    id: "c-3",
    title: "35mm Anamorphic Daylight Study",
    medium: "cinema",
    coordinates: "X: -190, Y: 240",
    note: "Low-angle winter sun grazing across travertine plinths at 16:00.",
    seed: "atelier-daylight-shadow-plinth",
  },
];

export function AtelierSpatialBoard() {
  const [items, setItems] = useState<CanvasItem[]>(INITIAL_CANVAS_ITEMS);
  const [mediumFilter, setMediumFilter] = useState<
    "all" | "architecture" | "material" | "cinema"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isClustering, setIsClustering] = useState(false);

  // Pin form states
  const [pinTitle, setPinTitle] = useState("");
  const [pinNote, setPinNote] = useState("");
  const [pinStatus, setPinStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [pinError, setPinError] = useState("");

  const visibleItems = items.filter((item) => {
    const matchesMedium =
      mediumFilter === "all" || item.medium === mediumFilter;
    const matchesQuery =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.note.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMedium && matchesQuery;
  });

  function handleAutoCluster() {
    setIsClustering(true);
    setTimeout(() => {
      setIsClustering(false);
    }, 600);
  }

  function handlePinCard(e: React.FormEvent) {
    e.preventDefault();
    if (pinTitle.trim().length < 4) {
      setPinStatus("error");
      setPinError("Enter a reference title of at least 4 characters.");
      return;
    }
    if (pinNote.trim().length < 8) {
      setPinStatus("error");
      setPinError(
        "Add a spatial observation of at least 8 characters so Atelier can cluster it."
      );
      return;
    }

    setPinStatus("loading");
    setPinError("");

    setTimeout(() => {
      const nextItem: CanvasItem = {
        id: `c-${items.length + 10}`,
        title: pinTitle.trim(),
        medium: "architecture",
        coordinates: `X: ${180 + items.length * 40}, Y: 95`,
        note: pinNote.trim(),
        seed: `atelier-custom-pin-${items.length + 1}`,
      };
      setItems((prev) => [nextItem, ...prev]);
      setPinTitle("");
      setPinNote("");
      setPinStatus("success");
    }, 450);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left 8 columns: Interactive Spatial Board */}
      <div className="lg:col-span-8 rounded-2xl border border-zinc-300 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <label
              htmlFor="atelier-canvas-filter"
              className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-2"
            >
              Filter spatial references by material, light, or note
            </label>
            <input
              id="atelier-canvas-filter"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. concrete, aluminum, daylight"
              className="w-full rounded-2xl border border-zinc-300 bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-400"
            />
          </div>

          <button
            type="button"
            onClick={handleAutoCluster}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-zinc-100 px-4 text-xs font-semibold text-zinc-900 transition-transform hover:bg-zinc-200 active:scale-[0.98] whitespace-nowrap dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            <Sparkle size={15} weight="regular" />
            <span>Cluster by hue</span>
          </button>
        </div>

        {/* Medium Filter Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          {(
            [
              { id: "all", label: "All Canvas Nodes" },
              { id: "architecture", label: "Architecture" },
              { id: "material", label: "Material Swatches" },
              { id: "cinema", label: "Lighting Studies" },
            ] as const
          ).map((tab) => {
            const active = mediumFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMediumFilter(tab.id)}
                className={`rounded-2xl px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-[0.98] ${
                  active
                    ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-zinc-950"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skeletal Loading State */}
        {isClustering ? (
          <div
            aria-live="polite"
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[0, 1, 2].map((skeleton) => (
              <div
                key={skeleton}
                className="h-64 animate-pulse rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-800/70"
              />
            ))}
          </div>
        ) : visibleItems.length === 0 ? (
          /* Empty State */
          <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-950/60">
            <CornersOut
              size={28}
              weight="regular"
              className="mx-auto text-zinc-500 dark:text-zinc-400"
            />
            <h4 className="mt-3 font-outfit text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Canvas region is empty
            </h4>
            <p className="mx-auto mt-1 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
              No spatial cards matched your filter criteria. Reset the view or pin a new visual swatch.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setMediumFilter("all");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white transition-transform hover:bg-orange-700 active:scale-[0.98] dark:bg-orange-500 dark:text-zinc-950"
            >
              <ArrowCounterClockwise size={14} weight="regular" />
              <span>Restore all canvas cards</span>
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {visibleItems.map((card) => (
              <div
                key={card.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5 transition-all hover:border-orange-600/50 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={`https://picsum.photos/seed/${card.seed}/600/450`}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="mt-3 font-outfit text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {card.title}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {card.note}
                  </p>
                </div>
                <div className="mt-4 border-t border-zinc-200/80 pt-2.5 flex items-center justify-between font-mono text-[11px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  <span>{card.coordinates}</span>
                  <span className="text-orange-600 dark:text-orange-400 font-semibold">
                    {card.medium}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right 4 columns: Pin New Spatial Card Form */}
      <div className="lg:col-span-4 rounded-2xl border border-zinc-300 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="font-outfit text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Pin a Spatial Swatch
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Add a new study card to the active canvas coordinates.
        </p>

        <form onSubmit={handlePinCard} className="mt-6 space-y-5" noValidate>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="atelier-pin-title"
              className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Reference or swatch title
            </label>
            <input
              id="atelier-pin-title"
              type="text"
              value={pinTitle}
              onChange={(e) => {
                setPinTitle(e.target.value);
                if (pinStatus === "error") setPinStatus("idle");
              }}
              placeholder="e.g. Raw Travertine Plinth Study"
              className="rounded-2xl border border-zinc-300 bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="atelier-pin-note"
              className="text-xs font-semibold text-zinc-800 dark:text-zinc-200"
            >
              Material or lighting annotation
            </label>
            <input
              id="atelier-pin-note"
              type="text"
              value={pinNote}
              onChange={(e) => {
                setPinNote(e.target.value);
                if (pinStatus === "error") setPinStatus("idle");
              }}
              placeholder="e.g. Unsealed porous stone under warm 2700K spot"
              className="rounded-2xl border border-zinc-300 bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-orange-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-400"
            />
          </div>

          {pinStatus === "error" && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-2xl border border-red-600/30 bg-red-50 p-3 text-xs font-medium text-red-800 dark:border-red-500/30 dark:bg-red-950/60 dark:text-red-200"
            >
              <WarningCircle size={16} weight="regular" className="mt-0.5 shrink-0" />
              <span>{pinError}</span>
            </div>
          )}

          {pinStatus === "success" && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-2xl border border-orange-600/30 bg-orange-50 p-3 text-xs font-medium text-orange-900 dark:border-orange-500/30 dark:bg-orange-950/60 dark:text-orange-200"
            >
              <CheckCircle
                size={16}
                weight="regular"
                className="shrink-0 text-orange-600 dark:text-orange-400"
              />
              <span>Swatch pinned to spatial board coordinates.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={pinStatus === "loading"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-700 active:scale-[0.98] disabled:opacity-60 whitespace-nowrap dark:bg-orange-500 dark:text-zinc-950 dark:hover:bg-orange-400"
          >
            <Plus size={16} weight="bold" />
            <span>
              {pinStatus === "loading" ? "Pinning swatch..." : "Pin to canvas"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
