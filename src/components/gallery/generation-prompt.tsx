"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const FAST_SPRING = { type: "spring" as const, stiffness: 680, damping: 32 };

/** `summary`, when given, is shown first and the full prompt sits behind a toggle; copy always copies the full prompt. */
export function GenerationPrompt({ prompt, summary }: { prompt: string; summary?: string }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFlash, setCopyFlash] = useState(false);

  const copyPrompt = async () => {
    setCopyFlash(true);
    window.setTimeout(() => setCopyFlash(false), 180);

    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const active = copyFlash || copied;

  return (
    <div className="group mt-8 flex items-end gap-3">
      <figure className="min-w-0 flex-1 border-l border-[var(--gallery-divider-strong)] pl-5">
        <blockquote
          className={clsx(
            "text-[15px] leading-relaxed text-[var(--gallery-text-secondary)]",
            summary && "whitespace-pre-line",
          )}
        >
          <span className="text-[var(--gallery-text-quaternary)]">Prompt · </span>
          {summary && !expanded ? summary : prompt}
        </blockquote>
        {summary ? (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((open) => !open)}
            className="mt-2 cursor-pointer text-sm text-[var(--gallery-text-tertiary)] underline decoration-[var(--gallery-divider-strong)] underline-offset-4 transition-colors hover:text-[var(--gallery-text-primary)]"
          >
            {expanded ? "Show less" : "Show full prompt"}
          </button>
        ) : null}
      </figure>

      <div
        className={clsx(
          "relative shrink-0 transition-opacity duration-150",
          active
            ? "opacity-100"
            : "opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100",
        )}
      >
        <AnimatePresence>
          {copied ? (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.99 }}
              transition={{ ...FAST_SPRING, duration: 0.12 }}
              className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-tooltip-bg)] px-3 py-1.5 text-xs font-medium text-[var(--gallery-text-primary)] shadow-[var(--gallery-shadow-lg)] backdrop-blur-md"
            >
              Prompt copied
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={copyPrompt}
          aria-label={copied ? "Copied prompt" : "Copy prompt"}
          title={copied ? "Copied" : "Copy prompt"}
          whileTap={{ scale: 0.9 }}
          transition={FAST_SPRING}
          className={clsx(
            "inline-flex size-8 cursor-pointer items-center justify-center rounded-md border shadow-[var(--gallery-shadow-sm)] transition-[border-color,background-color,color,box-shadow,opacity] duration-150",
            !active &&
              "[@media(hover:hover)]:pointer-events-none [@media(hover:hover)]:group-hover:pointer-events-auto [@media(hover:hover)]:group-focus-within:pointer-events-auto",
            active
              ? "border-[var(--gallery-accent)] bg-[color-mix(in_srgb,var(--gallery-accent)_18%,var(--gallery-surface))] text-[var(--gallery-accent)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--gallery-accent)_16%,transparent)]"
              : "border-[var(--gallery-border)] bg-[var(--gallery-surface)] text-[var(--gallery-text-tertiary)] hover:border-[var(--gallery-divider-strong)] hover:bg-[var(--gallery-surface-subtle)] hover:text-[var(--gallery-text-primary)]",
          )}
        >
          <span className="relative inline-flex size-3.5 items-center justify-center">
            <Copy
              aria-hidden="true"
              className={clsx(
                "absolute inset-0 size-3.5 transition-[opacity,transform] duration-150 ease-out",
                copied ? "scale-75 opacity-0" : "scale-100 opacity-80",
              )}
            />
            <Check
              aria-hidden="true"
              strokeWidth={2.25}
              className={clsx(
                "absolute inset-0 size-3.5 transition-[opacity,transform] duration-150 ease-out",
                copied ? "scale-100 opacity-100" : "scale-75 opacity-0",
              )}
            />
          </span>
        </motion.button>
      </div>
    </div>
  );
}
