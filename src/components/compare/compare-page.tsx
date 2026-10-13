"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { VariantSwitcher } from "@/components/gallery/variant-header";
import { buildCompareHref, type CompareState } from "@/lib/compare";
import { getGalleryEntry } from "@/lib/gallery-manifest";
import { buildPreviewHref } from "@/lib/gallery-paths";
import type { GalleryEntry, GalleryGroupSlug, IterationId, ModelSlug } from "@/lib/gallery-types";

type Side = "left" | "right";

const SIDE_LABEL: Record<Side, string> = { left: "Left", right: "Right" };
const OTHER_SIDE: Record<Side, Side> = { left: "right", right: "left" };

// The left pane's share of the screen. Dragging snaps to the thirds, and arrow keys with Shift jump between them.
const SNAP_RATIOS = [1 / 3, 1 / 2, 2 / 3];
const MIN_RATIO = 0.15;
const MAX_RATIO = 0.85;
const SNAP_DISTANCE = 0.015;
const KEYBOARD_STEP = 0.02;

const clampRatio = (ratio: number) => Math.min(MAX_RATIO, Math.max(MIN_RATIO, ratio));

function snapRatio(ratio: number): number {
  return SNAP_RATIOS.find((snap) => Math.abs(snap - ratio) < SNAP_DISTANCE) ?? clampRatio(ratio);
}

// The split is a preference rather than part of what's compared, so it lives in localStorage and not the URL.
// useSyncExternalStore lets the server render an even split and the client pick up the saved one on hydration.
const RATIO_STORAGE_KEY = "compare-split-ratio";
const ratioListeners = new Set<() => void>();
// Keeps the ratio for this visit when storage is unavailable.
let memoryRatio: string | null = null;

function subscribeRatio(listener: () => void) {
  ratioListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    ratioListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readRatio(): string | null {
  try {
    return window.localStorage.getItem(RATIO_STORAGE_KEY) ?? memoryRatio;
  } catch {
    return memoryRatio;
  }
}

function writeRatio(ratio: number) {
  memoryRatio = String(ratio);
  try {
    window.localStorage.setItem(RATIO_STORAGE_KEY, memoryRatio);
  } catch {
    // Private windows can refuse storage; memoryRatio covers this visit.
  }
  ratioListeners.forEach((listener) => listener());
}

function useSplitRatio(): number {
  const raw = useSyncExternalStore(subscribeRatio, readRatio, () => null);
  const ratio = raw === null ? Number.NaN : Number(raw);
  return Number.isFinite(ratio) ? clampRatio(ratio) : 1 / 2;
}

// Phones stack the panes, so the divider drags vertically there.
const STACKED_QUERY = "(max-width: 767px)";

function useStackedPanes(): boolean {
  return useSyncExternalStore(
    (listener) => {
      const query = window.matchMedia(STACKED_QUERY);
      query.addEventListener("change", listener);
      return () => query.removeEventListener("change", listener);
    },
    () => window.matchMedia(STACKED_QUERY).matches,
    () => false,
  );
}

function selectionFor(entry: GalleryEntry, iteration: IterationId) {
  return {
    group: entry.group,
    model: entry.model,
    iteration: entry.iterations.some((item) => item.id === iteration) ? iteration : ("1" as const),
  };
}

function ComparePane({
  side,
  state,
  share,
  animate,
}: {
  side: Side;
  state: CompareState;
  share: number;
  animate: boolean;
}) {
  const selection = state[side];
  const entry = getGalleryEntry(selection.group, selection.model);
  if (!entry) {
    return null;
  }

  // The switcher is the single view's, pointed at this side of the compare instead of the design's own page.
  const hrefFor = (group: GalleryGroupSlug, model: ModelSlug, iteration: IterationId) => {
    const target = getGalleryEntry(group, model);
    return buildCompareHref({ ...state, [side]: target ? selectionFor(target, iteration) : selection });
  };
  // VS keeps this design where it is and puts the chosen model on the other side.
  const compareHrefFor = (target: GalleryEntry) =>
    buildCompareHref({ ...state, [OTHER_SIDE[side]]: selectionFor(target, selection.iteration) });

  return (
    <section
      aria-label={`${SIDE_LABEL[side]} compare panel`}
      data-testid={`compare-panel-${side}`}
      style={{ flexGrow: share, flexShrink: 1, flexBasis: 0 }}
      className={clsx(
        "relative min-h-0 min-w-0",
        animate && "transition-[flex-grow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
      )}
    >
      <iframe
        title={`${SIDE_LABEL[side]} preview: ${entry.groupLabel}, ${entry.modelLabel}, iteration ${selection.iteration}`}
        src={buildPreviewHref(selection.group, selection.model, selection.iteration)}
        className="absolute inset-0 block size-full bg-[var(--gallery-body-bg)]"
      />
      <VariantSwitcher
        entry={entry}
        iteration={selection.iteration}
        hrefFor={hrefFor}
        compareHrefFor={compareHrefFor}
        pane={{ defaultSide: side, label: `${SIDE_LABEL[side]} design: ${entry.modelLabel}` }}
      />
    </section>
  );
}

function SplitDivider({
  ratio,
  stacked,
  dragging,
  onDragStart,
  onDrag,
  onDragEnd,
  onRatioChange,
}: {
  ratio: number;
  stacked: boolean;
  dragging: boolean;
  onDragStart: () => void;
  onDrag: (ratio: number) => void;
  onDragEnd: () => void;
  onRatioChange: (ratio: number) => void;
}) {
  const ratioAt = (e: ReactPointerEvent<HTMLDivElement>) => {
    const screen = e.currentTarget.parentElement;
    if (!screen) {
      return ratio;
    }
    const rect = screen.getBoundingClientRect();
    const offset = stacked ? e.clientY - rect.top : e.clientX - rect.left;
    return snapRatio(offset / (stacked ? rect.height : rect.width));
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    const back = stacked ? "ArrowUp" : "ArrowLeft";
    const forward = stacked ? "ArrowDown" : "ArrowRight";
    let next: number | null = null;

    if (e.key === back || e.key === forward) {
      const direction = e.key === forward ? 1 : -1;
      if (e.shiftKey) {
        const ordered = direction > 0 ? SNAP_RATIOS : [...SNAP_RATIOS].reverse();
        next =
          ordered.find((snap) => (snap - ratio) * direction > 0.005) ?? (direction > 0 ? MAX_RATIO : MIN_RATIO);
      } else {
        next = clampRatio(ratio + direction * KEYBOARD_STEP);
      }
    } else if (e.key === "Home") {
      next = MIN_RATIO;
    } else if (e.key === "End") {
      next = MAX_RATIO;
    } else if (e.key === "Enter") {
      next = 1 / 2;
    }

    if (next !== null) {
      e.preventDefault();
      onRatioChange(next);
    }
  };

  const leftPercent = Math.round(ratio * 100);
  const snapped = SNAP_RATIOS.some((snap) => Math.abs(snap - ratio) < 0.005);

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-label="Resize panes"
      aria-orientation={stacked ? "horizontal" : "vertical"}
      aria-valuemin={MIN_RATIO * 100}
      aria-valuemax={MAX_RATIO * 100}
      aria-valuenow={leftPercent}
      aria-valuetext={`Left ${leftPercent}%, right ${100 - leftPercent}%`}
      title="Drag to resize. Double-click for an even split."
      data-dragging={dragging || undefined}
      onPointerDown={(e) => {
        if (e.button !== 0) {
          return;
        }
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        e.currentTarget.focus();
        onDragStart();
      }}
      onPointerMove={(e) => {
        if (dragging && e.currentTarget.hasPointerCapture(e.pointerId)) {
          onDrag(ratioAt(e));
        }
      }}
      onPointerUp={onDragEnd}
      onLostPointerCapture={onDragEnd}
      onDoubleClick={() => onRatioChange(1 / 2)}
      onKeyDown={onKeyDown}
      // The line is a pixel; the hit area reaches a few pixels over each preview so it's easy to grab.
      className="group relative z-[90] h-px w-full shrink-0 touch-none bg-[var(--gallery-divider-strong)] outline-none select-none before:absolute before:inset-x-0 before:-inset-y-1.5 before:cursor-row-resize before:content-[''] md:h-auto md:w-px md:before:inset-x-auto md:before:inset-y-0 md:before:-left-1.5 md:before:w-[13px] md:before:cursor-col-resize"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[var(--gallery-accent)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[dragging]:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-1.5 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--gallery-border)] bg-[var(--gallery-surface)] shadow-[var(--gallery-shadow-sm)] transition-colors duration-150 group-hover:border-[var(--gallery-accent)] group-focus-visible:border-[var(--gallery-accent)] group-data-[dragging]:border-[var(--gallery-accent)] md:h-10 md:w-1.5"
      />
      <AnimatePresence>
        {dragging ? (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.12 }}
            className={clsx(
              "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border px-2 py-1 text-[11px] font-medium whitespace-nowrap tabular-nums shadow-[var(--gallery-shadow-md)]",
              snapped
                ? "border-[var(--gallery-accent)] bg-[var(--gallery-accent)] text-[var(--gallery-accent-foreground)]"
                : "border-[var(--gallery-border)] bg-[var(--gallery-tooltip-bg)] text-[var(--gallery-text-primary)]",
            )}
          >
            {leftPercent} / {100 - leftPercent}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ComparePage({ initialState }: { initialState: CompareState }) {
  const storedRatio = useSplitRatio();
  const stacked = useStackedPanes();
  const [dragRatio, setDragRatio] = useState<number | null>(null);
  // Keyboard and double-click changes glide; a drag follows the pointer and a restored split just appears.
  const [animate, setAnimate] = useState(false);

  const dragging = dragRatio !== null;
  const ratio = dragRatio ?? storedRatio;

  const setRatio = (next: number) => {
    setAnimate(true);
    writeRatio(clampRatio(next));
  };

  return (
    <main
      className={clsx(
        "flex h-dvh w-full flex-col overflow-hidden bg-[var(--gallery-body-bg)] md:flex-row",
        // Previews swallow pointer events, so a drag that crosses one would otherwise stall.
        dragging && "cursor-row-resize md:cursor-col-resize [&_iframe]:pointer-events-none",
      )}
    >
      <h1 className="sr-only">Compare</h1>
      <ComparePane side="left" state={initialState} share={ratio} animate={animate && !dragging} />
      <SplitDivider
        ratio={ratio}
        stacked={stacked}
        dragging={dragging}
        onDragStart={() => {
          setAnimate(false);
          setDragRatio(storedRatio);
        }}
        onDrag={setDragRatio}
        onDragEnd={() => {
          if (dragRatio !== null) {
            writeRatio(dragRatio);
            setDragRatio(null);
          }
        }}
        onRatioChange={setRatio}
      />
      <ComparePane side="right" state={initialState} share={1 - ratio} animate={animate && !dragging} />
    </main>
  );
}
