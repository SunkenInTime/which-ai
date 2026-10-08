"use client";

import clsx from "clsx";
import { ChevronDown, Code2, Layers, Sparkles } from "lucide-react";
import { useId } from "react";
import { ModelBrandLogo } from "@/components/gallery/model-brand-logo";
import type { GalleryEntry, GalleryGroupSlug, ModelSlug } from "@/lib/gallery-types";

const GROUP_ICONS: Record<GalleryGroupSlug, typeof Sparkles> = {
  "with-design-skill": Sparkles,
  "with-taste-skill": Sparkles,
  "without-design-skill": Code2,
  miscellaneous: Layers,
};

const triggerClass =
  "flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] px-3 py-2.5 text-left text-sm font-medium text-[var(--gallery-text-primary)] shadow-[var(--gallery-shadow-sm)] backdrop-blur-[12px] transition outline-none hover:border-[var(--gallery-divider-strong)] hover:bg-[var(--gallery-surface)] focus-visible:border-[var(--gallery-accent)] focus-visible:ring-1 focus-visible:ring-[var(--gallery-accent)]";

const listClass =
  "absolute left-0 right-0 top-full z-50 mt-1 flex max-h-60 flex-col gap-1.5 overflow-auto rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-body-bg)] p-2";

const optionBaseClass =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-150";

const optionClass = (selected: boolean) =>
  clsx(
    optionBaseClass,
    selected
      ? "bg-[var(--gallery-accent)]/12 text-[var(--gallery-text-primary)] hover:bg-[var(--gallery-accent)]/20"
      : "bg-[var(--gallery-surface)] text-[var(--gallery-text-primary)] hover:bg-[var(--gallery-accent)]/10 hover:text-[var(--gallery-text-primary)]",
  );

const labelClass = "mb-1 block text-xs font-medium text-[var(--gallery-text-tertiary)]";

export function CompareGroupSelect({
  value,
  onChange,
  groups,
  getLabel,
  open,
  setOpen,
  showLabel = true,
}: {
  value: GalleryGroupSlug;
  onChange: (value: GalleryGroupSlug) => void;
  groups: readonly GalleryGroupSlug[];
  getLabel: (g: GalleryGroupSlug) => string;
  open: boolean;
  setOpen: (open: boolean) => void;
  showLabel?: boolean;
}) {
  const labelId = useId();
  const listId = useId();
  const SelectedIcon = GROUP_ICONS[value];

  return (
    <div className="relative min-w-0 flex-1">
      <span id={labelId} className={showLabel ? labelClass : "sr-only"}>
        Group
      </span>
      <button
        type="button"
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        className={triggerClass}
        onClick={() => setOpen(!open)}
      >
        <SelectedIcon className="size-4 shrink-0 text-[var(--gallery-accent)]" strokeWidth={2} aria-hidden />
        <span className="min-w-0 flex-1 truncate">{getLabel(value)}</span>
        <ChevronDown
          className={clsx("ml-auto size-4 shrink-0 text-[var(--gallery-text-quaternary)] transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={listId} className={listClass} role="listbox" aria-labelledby={labelId}>
          {groups.map((group) => {
            const Icon = GROUP_ICONS[group];
            const selected = group === value;
            return (
              <button
                key={group}
                type="button"
                role="option"
                aria-selected={selected}
                className={optionClass(selected)}
                onClick={() => {
                  onChange(group);
                  setOpen(false);
                }}
              >
                <Icon
                  className={clsx(
                    "size-4 shrink-0",
                    selected ? "text-[var(--gallery-accent)]" : "text-[var(--gallery-text-tertiary)]",
                  )}
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate">{getLabel(group)}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function CompareModelSelect({
  models,
  value,
  onChange,
  open,
  setOpen,
  showLabel = true,
}: {
  models: GalleryEntry[];
  value: ModelSlug;
  onChange: (value: ModelSlug) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  showLabel?: boolean;
}) {
  const labelId = useId();
  const listId = useId();
  const selected = models.find((m) => m.model === value) ?? models[0];

  return (
    <div className="relative min-w-0 flex-1">
      <span id={labelId} className={showLabel ? labelClass : "sr-only"}>
        Model
      </span>
      <button
        type="button"
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        className={triggerClass}
        onClick={() => setOpen(!open)}
      >
        {selected ? (
          <ModelBrandLogo
            model={selected.model}
            alt=""
            width={20}
            height={20}
            className="size-5 shrink-0 object-contain"
            aria-hidden
          />
        ) : null}
        <span className="min-w-0 flex-1 truncate">{selected?.modelLabel ?? "—"}</span>
        <ChevronDown
          className={clsx("ml-auto size-4 shrink-0 text-[var(--gallery-text-quaternary)] transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={listId} className={listClass} role="listbox" aria-labelledby={labelId}>
          {models.map((m) => {
            const isSelected = m.model === value;
            return (
              <button
                key={m.model}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={optionClass(isSelected)}
                onClick={() => {
                  onChange(m.model);
                  setOpen(false);
                }}
              >
                <ModelBrandLogo
                  model={m.model}
                  alt=""
                  width={20}
                  height={20}
                  className="size-5 shrink-0 object-contain"
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate font-medium">{m.modelLabel}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
