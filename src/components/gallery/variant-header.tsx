"use client";

import clsx from "clsx";
import Link from "next/link";
import { Check, Home, Palette, PanelLeft, PanelRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ModelBrandLogo } from "@/components/gallery/model-brand-logo";
import { buildCompareHref, buildCompareHrefForSelection } from "@/lib/compare";
import { galleryManifest } from "@/lib/gallery-manifest";
import { sortGalleryEntriesForHome } from "@/lib/gallery-model-order";
import type { GalleryEntry, GalleryGroupSlug, IterationId, ModelSlug } from "@/lib/gallery-types";
import { buildVariantHref } from "@/lib/gallery-paths";
import {
  getServerGallerySwitcherSide,
  getStoredGallerySwitcherSide,
  setStoredGallerySwitcherSide,
  subscribeGallerySwitcherSide,
  type GallerySwitcherSide,
} from "@/lib/gallery-switcher-side";

type PickerMode = "compare" | "model" | "skill" | null;

export const switcherButtonClass =
  "inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-[var(--gallery-text-secondary)] transition-colors outline-none hover:bg-[var(--gallery-hover-bg)] hover:text-[var(--gallery-text-primary)] focus-visible:ring-1 focus-visible:ring-[var(--gallery-accent)]";

const popoverBaseClass =
  "absolute top-0 z-[120] flex max-h-[min(26rem,calc(100vh-3rem))] w-[min(19rem,calc(100vw-5.5rem))] flex-col gap-1.5 overflow-auto rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-body-bg)] p-2 text-[var(--gallery-text-primary)] shadow-[var(--gallery-shadow-md)] backdrop-blur-[12px]";

// Popovers open away from the screen edge the switcher is docked to.
export function getPopoverClass(side: GallerySwitcherSide) {
  return clsx(
    popoverBaseClass,
    side === "left" ? "left-[calc(100%+0.5rem)]" : "right-[calc(100%+0.5rem)]",
  );
}

function getGroupLabel(group: GalleryGroupSlug): string {
  if (group === "with-design-skill") return "With Design Skill";
  if (group === "without-design-skill") return "Without skill";
  return galleryManifest.find((entry) => entry.group === group)?.groupLabel ?? group;
}

function getPaletteTone(group: GalleryGroupSlug, available = true) {
  if (!available) return "text-[var(--gallery-text-quaternary)] opacity-45";
  if (group === "without-design-skill") return "text-[var(--gallery-text-quaternary)] opacity-55";
  return "text-[var(--gallery-accent)]";
}

function getModelOptions(currentEntry: GalleryEntry, iteration: IterationId) {
  const byModel = new Map<ModelSlug, GalleryEntry[]>();
  for (const entry of galleryManifest) {
    byModel.set(entry.model, [...(byModel.get(entry.model) ?? []), entry]);
  }

  const preferredOrder = sortGalleryEntriesForHome(
    Array.from(byModel.values(), (entries) => entries[0]),
  ).map((entry) => entry.model);

  return preferredOrder
    .map((model) => {
      const entries = byModel.get(model) ?? [];
      const currentGroupEntry = entries.find((entry) => entry.group === currentEntry.group);
      const label = entries[0]?.modelLabel ?? model;
      return {
        model,
        label,
        availableInCurrentGroup: Boolean(currentGroupEntry),
        targetEntry: currentGroupEntry,
        href: currentGroupEntry
          ? buildVariantHref(currentGroupEntry.group, currentGroupEntry.model, iteration)
          : null,
      };
    })
    .toSorted((a, b) => {
      if (a.availableInCurrentGroup !== b.availableInCurrentGroup) {
        return a.availableInCurrentGroup ? -1 : 1;
      }
      return preferredOrder.indexOf(a.model) - preferredOrder.indexOf(b.model);
    });
}

function getSkillOptions(currentEntry: GalleryEntry, iteration: IterationId) {
  const groups = Array.from(
    new Map(galleryManifest.map((entry) => [entry.group, entry.groupLabel])).entries(),
    ([group, label]) => ({ group, label: getGroupLabel(group) || label }),
  );

  return groups
    .map(({ group, label }) => {
      const targetEntry = galleryManifest.find(
        (entry) => entry.group === group && entry.model === currentEntry.model,
      );
      return {
        group,
        label,
        availableForModel: Boolean(targetEntry),
        href: targetEntry ? buildVariantHref(targetEntry.group, targetEntry.model, iteration) : null,
      };
    })
    .toSorted((a, b) => {
      if (a.availableForModel !== b.availableForModel) return a.availableForModel ? -1 : 1;
      return groups.findIndex((item) => item.group === a.group) - groups.findIndex((item) => item.group === b.group);
    });
}

export function VariantSwitcher({
  entry,
  iteration,
}: {
  entry: GalleryEntry;
  iteration: IterationId;
}) {
  const router = useRouter();
  const [openPicker, setOpenPicker] = useState<PickerMode>(null);
  // Docked side is a stored preference; the server snapshot keeps hydration in sync.
  const side = useSyncExternalStore(
    subscribeGallerySwitcherSide,
    getStoredGallerySwitcherSide,
    getServerGallerySwitcherSide,
  );
  const popoverClass = getPopoverClass(side);
  const [compareSearch, setCompareSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const pickerRef = useRef<HTMLElement | null>(null);
  const compareSearchRef = useRef<HTMLInputElement | null>(null);
  const modelSearchRef = useRef<HTMLInputElement | null>(null);
  const groupLabel = getGroupLabel(entry.group);
  const isWithoutSkill = entry.group === "without-design-skill";
  const paletteTone = getPaletteTone(entry.group);
  const modelOptions = useMemo(() => getModelOptions(entry, iteration), [entry, iteration]);
  const compareOptions = useMemo(
    () =>
      modelOptions.map((option) => ({
        ...option,
        href: option.targetEntry
          ? buildCompareHref({
              left: {
                group: entry.group,
                model: entry.model,
                iteration,
              },
              right: {
                group: option.targetEntry.group,
                model: option.targetEntry.model,
                iteration,
              },
            })
          : null,
      })),
    [entry.group, entry.model, iteration, modelOptions],
  );
  const skillOptions = useMemo(() => getSkillOptions(entry, iteration), [entry, iteration]);
  const filteredCompareOptions = useMemo(() => {
    const query = compareSearch.trim().toLowerCase();
    if (!query) return compareOptions;

    return compareOptions.filter((option) =>
      `${option.label} ${option.model}`.toLowerCase().includes(query),
    );
  }, [compareOptions, compareSearch]);
  const filteredModelOptions = useMemo(() => {
    const query = modelSearch.trim().toLowerCase();
    if (!query) return modelOptions;

    return modelOptions.filter((option) =>
      `${option.label} ${option.model}`.toLowerCase().includes(query),
    );
  }, [modelOptions, modelSearch]);
  const firstAvailableCompareMatch = filteredCompareOptions.find((option) => option.href);
  const firstAvailableModelMatch = filteredModelOptions.find((option) => option.href);

  function toggleSide() {
    setStoredGallerySwitcherSide(side === "left" ? "right" : "left");
  }

  useEffect(() => {
    if (!openPicker) return;

    function handlePointerDown(event: MouseEvent) {
      if (pickerRef.current?.contains(event.target as Node)) return;
      setOpenPicker(null);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPicker(null);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openPicker]);

  useEffect(() => {
    function handleCommandPaletteShortcut(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey)) {
        return;
      }

      event.preventDefault();
      setOpenPicker((open) => (open === "model" ? null : "model"));
    }

    document.addEventListener("keydown", handleCommandPaletteShortcut);
    return () => {
      document.removeEventListener("keydown", handleCommandPaletteShortcut);
    };
  }, []);

  useEffect(() => {
    if (openPicker !== "compare") {
      setCompareSearch("");
      return;
    }

    const focusTimer = window.setTimeout(() => {
      compareSearchRef.current?.focus();
      compareSearchRef.current?.select();
    }, 0);

    return () => window.clearTimeout(focusTimer);
  }, [openPicker]);

  useEffect(() => {
    if (openPicker !== "model") {
      setModelSearch("");
      return;
    }

    const focusTimer = window.setTimeout(() => {
      modelSearchRef.current?.focus();
      modelSearchRef.current?.select();
    }, 0);

    return () => window.clearTimeout(focusTimer);
  }, [openPicker]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        e.defaultPrevented ||
        e.isComposing ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === "h") {
        e.preventDefault();
        router.push("/");
        return;
      }

      if (key === "c") {
        e.preventDefault();
        router.push(
          buildCompareHrefForSelection({
            group: entry.group,
            model: entry.model,
            iteration,
          }),
        );
        return;
      }

      if (entry.iterations.some((item) => item.id === key)) {
        e.preventDefault();
        router.push(buildVariantHref(entry.group, entry.model, key as IterationId));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [entry.group, entry.model, entry.iterations, iteration, router]);

  return (
    <nav
      ref={pickerRef}
      aria-label={`${entry.modelLabel} gallery navigation`}
      data-side={side}
      className={clsx(
        "gallery-variant-switcher gallery-elevated-surface fixed top-5 z-[100] flex w-auto flex-col items-center gap-1 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] px-1 py-1 text-[var(--gallery-text-tertiary)] shadow-[var(--gallery-shadow-sm)] backdrop-blur-[12px] sm:top-6",
        side === "left" ? "left-5 sm:left-6" : "right-5 sm:right-6",
      )}
    >
      <Link
        href="/"
        aria-label="Back to Which AI Made This?"
        className={switcherButtonClass}
      >
        <Home className="size-4 shrink-0 opacity-80" aria-hidden="true" />
      </Link>
      <div
        className="h-px w-full shrink-0 bg-[var(--gallery-border)]"
        aria-hidden="true"
      />
      <span className="relative inline-flex">
      <button
        type="button"
        aria-label={`Compare ${entry.modelLabel} iteration ${iteration}`}
        aria-expanded={openPicker === "compare"}
        className={clsx(switcherButtonClass, "text-[10px] font-semibold tracking-[0.12em]")}
        onClick={() => setOpenPicker((open) => (open === "compare" ? null : "compare"))}
      >
        VS
      </button>
      {openPicker === "compare" ? (
        <div className={popoverClass} role="menu" aria-label="Choose compare model">
          <label className="relative flex h-10 shrink-0 items-center rounded-md border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] text-[var(--gallery-text-primary)] shadow-[var(--gallery-shadow-sm)] focus-within:border-[var(--gallery-accent)] focus-within:ring-1 focus-within:ring-[var(--gallery-accent)]">
            <Search
              className="pointer-events-none ml-3 size-3.5 shrink-0 text-[var(--gallery-text-quaternary)]"
              aria-hidden
            />
            <input
              ref={compareSearchRef}
              value={compareSearch}
              onChange={(event) => setCompareSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && firstAvailableCompareMatch?.href) {
                  event.preventDefault();
                  router.push(firstAvailableCompareMatch.href);
                }
              }}
              placeholder="Compare to model"
              aria-label="Search compare models"
              className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-sm font-medium text-[var(--gallery-text-primary)] outline-none placeholder:text-[var(--gallery-text-quaternary)]"
            />
          </label>
          {filteredCompareOptions.length > 0 ? filteredCompareOptions.map((option) => {
            const active = option.model === entry.model;
            const enterTarget = option.href === firstAvailableCompareMatch?.href;
            const content = (
              <>
                <span className="flex min-w-0 flex-1 items-center gap-3">
                  <ModelBrandLogo
                    model={option.model}
                    alt=""
                    width={18}
                    height={18}
                    className={clsx(
                      "size-[18px] rounded-sm object-contain",
                      !option.availableInCurrentGroup && "grayscale opacity-55",
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{option.label}</span>
                    {!option.availableInCurrentGroup ? (
                      <span className="block truncate text-[11px] text-[var(--gallery-text-quaternary)]">
                        Not in {groupLabel}
                      </span>
                    ) : null}
                  </span>
                </span>
                {enterTarget ? (
                  <span className="shrink-0 rounded-[4px] border border-[var(--gallery-accent)]/25 bg-[var(--gallery-accent)]/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--gallery-accent)]">
                    Enter
                  </span>
                ) : active ? (
                  <Check className="size-3.5 shrink-0" aria-hidden />
                ) : null}
              </>
            );
            const className = clsx(
              "flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-150",
              enterTarget || active
                ? "bg-[var(--gallery-accent)]/12 text-[var(--gallery-text-primary)]"
                : option.availableInCurrentGroup
                  ? "bg-[var(--gallery-surface)] text-[var(--gallery-text-primary)] hover:bg-[var(--gallery-accent)]/10"
                  : "cursor-not-allowed bg-[var(--gallery-surface-muted)] text-[var(--gallery-text-quaternary)] opacity-65",
            );

            return option.href ? (
              <Link key={option.model} href={option.href} className={className} role="menuitem">
                {content}
              </Link>
            ) : (
              <button key={option.model} type="button" disabled className={className} role="menuitem">
                {content}
              </button>
            );
          }) : (
            <div className="rounded-md bg-[var(--gallery-surface-muted)] px-3 py-2.5 text-sm font-medium text-[var(--gallery-text-quaternary)]">
              No models found
            </div>
          )}
        </div>
      ) : null}
      </span>
      <div
        className="h-px w-full shrink-0 bg-[var(--gallery-border)]"
        aria-hidden="true"
      />
      <span className="relative inline-flex flex-col items-center gap-0.5 py-0.5">
        <button
          type="button"
          className={clsx(switcherButtonClass, "group/logo")}
          aria-label={`Switch model from ${entry.modelLabel}`}
          aria-expanded={openPicker === "model"}
          onClick={() => setOpenPicker((open) => (open === "model" ? null : "model"))}
        >
          <ModelBrandLogo
            model={entry.model}
            alt=""
            width={22}
            height={22}
            className="size-[1.375rem] object-contain opacity-90 transition-opacity duration-200 group-hover/logo:opacity-100"
            aria-hidden
          />
        </button>
        <button
          type="button"
          className={clsx(switcherButtonClass, "group/skill relative size-7")}
          aria-label={`Switch skill set from ${groupLabel}`}
          aria-expanded={openPicker === "skill"}
          onClick={() => setOpenPicker((open) => (open === "skill" ? null : "skill"))}
        >
          <Palette
            className={`size-3.5 shrink-0 ${paletteTone}`}
            strokeWidth={2}
            aria-hidden
          />
          {isWithoutSkill ? (
            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <span className="h-px w-[130%] max-w-[1.125rem] rotate-[-38deg] rounded-full bg-[var(--gallery-text-quaternary)]/85" />
            </span>
          ) : null}
        </button>
        {openPicker === "model" ? (
          <div className={popoverClass} role="menu" aria-label="Switch model">
            <label className="relative flex h-10 shrink-0 items-center rounded-md border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] text-[var(--gallery-text-primary)] shadow-[var(--gallery-shadow-sm)] focus-within:border-[var(--gallery-accent)] focus-within:ring-1 focus-within:ring-[var(--gallery-accent)]">
              <Search
                className="pointer-events-none ml-3 size-3.5 shrink-0 text-[var(--gallery-text-quaternary)]"
                aria-hidden
              />
              <input
                ref={modelSearchRef}
                value={modelSearch}
                onChange={(event) => setModelSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && firstAvailableModelMatch?.href) {
                    event.preventDefault();
                    router.push(firstAvailableModelMatch.href);
                  }
                }}
                placeholder="Search models"
                aria-label="Search models"
                className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-sm font-medium text-[var(--gallery-text-primary)] outline-none placeholder:text-[var(--gallery-text-quaternary)]"
              />
              <span className="mr-2 shrink-0 rounded-[4px] border border-[var(--gallery-border)] bg-[var(--gallery-surface-muted)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--gallery-text-quaternary)]">
                ⌘ + K
              </span>
            </label>
            {filteredModelOptions.length > 0 ? filteredModelOptions.map((option) => {
              const active = option.model === entry.model;
              const enterTarget = option.href === firstAvailableModelMatch?.href;
              const content = (
                <>
                  <span className="flex min-w-0 flex-1 items-center gap-3">
                    <ModelBrandLogo
                      model={option.model}
                      alt=""
                      width={18}
                      height={18}
                      className={clsx(
                        "size-[18px] rounded-sm object-contain",
                        !option.availableInCurrentGroup && "grayscale opacity-55",
                      )}
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{option.label}</span>
                      {!option.availableInCurrentGroup ? (
                        <span className="block truncate text-[11px] text-[var(--gallery-text-quaternary)]">
                          Not in {groupLabel}
                        </span>
                      ) : null}
                    </span>
                  </span>
                  {active ? (
                    <Check className="size-3.5 shrink-0" aria-hidden />
                  ) : enterTarget ? (
                    <span className="shrink-0 rounded-[4px] border border-[var(--gallery-accent)]/25 bg-[var(--gallery-accent)]/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--gallery-accent)]">
                      Enter
                    </span>
                  ) : null}
                </>
              );
              const className = clsx(
                "flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-150",
                active || enterTarget
                  ? "bg-[var(--gallery-accent)]/12 text-[var(--gallery-text-primary)]"
                  : option.availableInCurrentGroup
                    ? "bg-[var(--gallery-surface)] text-[var(--gallery-text-primary)] hover:bg-[var(--gallery-accent)]/10"
                    : "cursor-not-allowed bg-[var(--gallery-surface-muted)] text-[var(--gallery-text-quaternary)] opacity-65",
              );

              return option.href ? (
                <Link key={option.model} href={option.href} className={className} role="menuitem">
                  {content}
                </Link>
              ) : (
                <button key={option.model} type="button" disabled className={className} role="menuitem">
                  {content}
                </button>
              );
            }) : (
              <div className="rounded-md bg-[var(--gallery-surface-muted)] px-3 py-2.5 text-sm font-medium text-[var(--gallery-text-quaternary)]">
                No models found
              </div>
            )}
          </div>
        ) : null}
        {openPicker === "skill" ? (
          <div className={popoverClass} role="menu" aria-label="Switch skill set">
            {skillOptions.map((option) => {
              const active = option.group === entry.group;
              const available = option.availableForModel;
              const content = (
                <>
                  <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
                    <Palette
                      className={clsx("size-4", getPaletteTone(option.group, available))}
                      strokeWidth={2}
                      aria-hidden
                    />
                    {option.group === "without-design-skill" ? (
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                        <span className="h-px w-[115%] rotate-[-38deg] rounded-full bg-[var(--gallery-text-quaternary)]/85" />
                      </span>
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{option.label}</span>
                    {!available ? (
                      <span className="block truncate text-[11px] text-[var(--gallery-text-quaternary)]">
                        No {entry.modelLabel} run
                      </span>
                    ) : null}
                  </span>
                  {active ? <Check className="size-3.5 shrink-0" aria-hidden /> : null}
                </>
              );
              const className = clsx(
                "flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-150",
                active
                  ? "bg-[var(--gallery-accent)]/12 text-[var(--gallery-text-primary)]"
                  : available
                    ? "bg-[var(--gallery-surface)] text-[var(--gallery-text-primary)] hover:bg-[var(--gallery-accent)]/10"
                    : "cursor-not-allowed bg-[var(--gallery-surface-muted)] text-[var(--gallery-text-quaternary)] opacity-65",
              );

              return option.href ? (
                <Link key={option.group} href={option.href} className={className} role="menuitem">
                  {content}
                </Link>
              ) : (
                <button key={option.group} type="button" disabled className={className} role="menuitem">
                  {content}
                </button>
              );
            })}
          </div>
        ) : null}
      </span>
      <div
        className="h-px w-full shrink-0 bg-[var(--gallery-border)]"
        aria-hidden="true"
      />
      <div
        className="flex flex-col items-center gap-1"
        role="group"
        aria-label="Iterations"
      >
        {entry.iterations.map((item) => {
          const active = item.id === iteration;
          return (
            <Link
              key={item.id}
              href={buildVariantHref(entry.group, entry.model, item.id)}
              aria-current={active ? "page" : undefined}
              aria-label={`Open iteration ${item.id}`}
              className={`gallery-variant-switcher__iteration inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-[11px] font-medium tabular-nums leading-none transition-colors ${
                active
                  ? "bg-[var(--gallery-accent)] text-[var(--gallery-accent-foreground)]"
                  : "text-[var(--gallery-text-secondary)] hover:bg-[var(--gallery-hover-bg)] hover:text-[var(--gallery-text-primary)]"
              }`}
            >
              {item.id}
            </Link>
          );
        })}
      </div>
      <div
        className="h-px w-full shrink-0 bg-[var(--gallery-border)]"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={toggleSide}
        aria-label={side === "left" ? "Dock sidebar on the right" : "Dock sidebar on the left"}
        title={side === "left" ? "Dock right" : "Dock left"}
        className={switcherButtonClass}
      >
        {side === "left" ? (
          <PanelRight className="size-4 shrink-0 opacity-80" aria-hidden="true" />
        ) : (
          <PanelLeft className="size-4 shrink-0 opacity-80" aria-hidden="true" />
        )}
      </button>
    </nav>
  );
}
