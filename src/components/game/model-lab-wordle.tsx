"use client";

import clsx from "clsx";
import { toBlob } from "html-to-image";
import { Check, ChevronDown, Share2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeAwareLogo } from "@/components/gallery/theme-aware-logo";
import { galleryManifest } from "@/lib/gallery-manifest";
import { buildPreviewHref, buildVariantHref } from "@/lib/gallery-paths";
import { type LabSlug, getModelLab } from "@/lib/model-labs";

type Round = {
  id: string;
  previewHref: string;
  liveHref: string;
  answer: LabSlug;
  answerLabel: string;
  modelLabel: string;
  attempts: LabSlug[];
  solved: boolean;
};

type GuessTone = "yes" | "no" | "maybe" | "idle";

type GuessOption = {
  slug: LabSlug;
  label: string;
  logoLightPath: string;
  logoDarkPath?: string;
};

const TOTAL_ROUNDS = 5;
const MAX_GUESSES = 3;
const ROUND_ADVANCE_DELAY_MS = 950;
const ROUND_MISS_ADVANCE_DELAY_MS = 2200;
const WRONG_GUESS_SHAKE_MS = 420;
const CORRECT_GUESS_POP_MS = 620;
const SHARE_URL = "whichai.dev";
const SCORE_IMAGE_MARGIN_PX = 32;

const pickerTriggerClass =
  "flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] px-3 py-2.5 text-left text-sm font-medium text-[var(--gallery-text-primary)] shadow-[var(--gallery-shadow-sm)] backdrop-blur-[12px] transition outline-none hover:border-[var(--gallery-divider-strong)] hover:bg-[var(--gallery-surface)] focus-visible:border-[var(--gallery-accent)] focus-visible:ring-1 focus-visible:ring-[var(--gallery-accent)]";

const pickerListClass =
  "absolute inset-x-0 bottom-[calc(100%+0.25rem)] z-20 flex max-h-60 flex-col gap-1.5 overflow-auto rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-body-bg)] p-2";

const pickerOptionClass = (selected: boolean, disabled = false) =>
  clsx(
    "flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-150",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    selected
      ? "bg-[var(--gallery-accent)]/12 text-[var(--gallery-text-primary)] hover:bg-[var(--gallery-accent)]/20"
      : "bg-[var(--gallery-surface)] text-[var(--gallery-text-primary)] hover:bg-[var(--gallery-accent)]/10 hover:text-[var(--gallery-text-primary)]",
  );

const pickerWidthClass = "w-[min(18rem,calc(100vw-3rem))]";

const GUESS_OPTIONS: GuessOption[] = [
  { slug: "anonymous", label: "Anonymous", logoLightPath: "/anonymous-light.svg", logoDarkPath: "/anonymous-dark.svg" },
  { slug: "xiaomi", label: "MiMo", logoLightPath: "/xiaomi.svg" },
  { slug: "gpt", label: "GPT", logoLightPath: "/openai-gpt.svg", logoDarkPath: "/openai-gpt-dark.svg" },
  { slug: "anthropic", label: "Claude", logoLightPath: "/anthropic-claude.webp" },
  { slug: "google", label: "Gemini", logoLightPath: "/google-gemini.webp" },
  { slug: "meta", label: "Meta", logoLightPath: "/meta.svg" },
  { slug: "x-ai", label: "X AI", logoLightPath: "/xai-light.svg", logoDarkPath: "/xai-dark.svg" },
  { slug: "moonshot", label: "Kimi", logoLightPath: "/kimi-k2.webp" },
  { slug: "z-ai", label: "GLM", logoLightPath: "/glm.webp" },
  { slug: "cursor", label: "Composer", logoLightPath: "/cursor-composer.webp" },
  { slug: "cognition", label: "SWE", logoLightPath: "/cognition.svg", logoDarkPath: "/cognition-dark.svg" },
] as const;

function shuffle<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getGuessOption(lab: LabSlug | null | undefined): GuessOption | undefined {
  return lab ? GUESS_OPTIONS.find((option) => option.slug === lab) : undefined;
}

function getGuessLabel(lab: LabSlug | null | undefined): string {
  return getGuessOption(lab)?.label ?? "";
}

function createRounds(): Round[] {
  const pool = galleryManifest.flatMap((entry) =>
    entry.iterations.map((iteration) => {
      const lab = getModelLab(entry.model);
      return {
        id: `${entry.group}-${entry.model}-${iteration.id}`,
        previewHref: buildPreviewHref(entry.group, entry.model, iteration.id),
        liveHref: buildVariantHref(entry.group, entry.model, iteration.id),
        answer: lab.slug,
        answerLabel: getGuessLabel(lab.slug),
        modelLabel: entry.modelLabel,
      };
    }),
  );

  return shuffle(pool)
    .slice(0, TOTAL_ROUNDS)
    .map((round) => ({ ...round, attempts: [], solved: false }));
}

function getRoundStatus(round: Round): "correct" | "wrong" | "active" {
  if (round.solved) return "correct";
  if (round.attempts.length >= MAX_GUESSES) return "wrong";
  return "active";
}

type RoundTier = "one" | "two" | "three" | "miss";

function getRoundTier(round: Round): RoundTier {
  if (!round.solved) return "miss";
  if (round.attempts.length <= 1) return "one";
  if (round.attempts.length === 2) return "two";
  return "three";
}

const TIER_TILE_CLASS: Record<RoundTier, string> = {
  one: "bg-emerald-500",
  two: "bg-emerald-400",
  three: "bg-amber-400",
  miss: "bg-neutral-800",
};

const TIER_EMOJI: Record<RoundTier, string> = {
  one: "\u{1F7E9}",
  two: "\u{1F7E9}",
  three: "\u{1F7E8}",
  miss: "\u2B1B",
};

function computeBestStreak(rounds: Round[]): number {
  let max = 0;
  let current = 0;
  for (const round of rounds) {
    if (round.solved) {
      current += 1;
      if (current > max) max = current;
    } else {
      current = 0;
    }
  }
  return max;
}

function getRankTitle(score: number, total: number): { title: string; subtitle: string } {
  if (score === total) {
    return {
      title: "Model Whisperer",
      subtitle: "You can spot an AI's fingerprints from a mile away.",
    };
  }
  const ratio = score / total;
  if (ratio >= 0.83) {
    return {
      title: "Signal Reader",
      subtitle: "Near-perfect read on the labs. One got past you.",
    };
  }
  if (ratio >= 0.66) {
    return {
      title: "Pattern Matcher",
      subtitle: "You're picking up on the little tells each model leaves behind.",
    };
  }
  if (ratio >= 0.5) {
    return {
      title: "Getting Warmer",
      subtitle: "The models are starting to reveal themselves.",
    };
  }
  if (ratio >= 0.34) {
    return {
      title: "Coin Flipper",
      subtitle: "Lady luck showed up today more than your eye did.",
    };
  }
  if (ratio > 0) {
    return {
      title: "Rookie Eye",
      subtitle: "Every expert was once a beginner. Run it back.",
    };
  }
  return {
    title: "Back to the Lab",
    subtitle: "Zero hits \u2014 you're due for a streak. Try again.",
  };
}

function getGuessTone(round: Round, lab: LabSlug, selectedGuess: LabSlug | null): GuessTone {
  if (round.attempts.includes(lab)) {
    return lab === round.answer ? "yes" : "no";
  }

  if (selectedGuess === lab) {
    return "maybe";
  }

  return "idle";
}

export function ModelLabWordle() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGuess, setSelectedGuess] = useState<LabSlug | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [shakeWrongGuess, setShakeWrongGuess] = useState(false);
  const [revealMissedAnswer, setRevealMissedAnswer] = useState(false);
  const [popCorrectGuess, setPopCorrectGuess] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [imageShareState, setImageShareState] = useState<"idle" | "copied" | "downloaded" | "failed">(
    "idle",
  );
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const correctTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shareTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imageShareTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const resultCardRef = useRef<HTMLElement | null>(null);

  const activeRound = rounds[currentRound];
  const gameOver = currentRound >= rounds.length;

  const correctCount = useMemo(() => rounds.filter((round) => round.solved).length, [rounds]);

  const attemptsUsed = useMemo(
    () => rounds.reduce((total, round) => total + round.attempts.length, 0),
    [rounds],
  );

  const perfectRounds = useMemo(
    () => rounds.filter((round) => round.solved && round.attempts.length === 1).length,
    [rounds],
  );

  const bestStreak = useMemo(() => computeBestStreak(rounds), [rounds]);

  const solvedAttempts = useMemo(
    () =>
      rounds.reduce(
        (acc, round) => {
          if (!round.solved) return acc;
          return { sum: acc.sum + round.attempts.length, count: acc.count + 1 };
        },
        { sum: 0, count: 0 },
      ),
    [rounds],
  );

  const avgGuessesPerSolved = solvedAttempts.count
    ? solvedAttempts.sum / solvedAttempts.count
    : 0;

  const accuracyPct = rounds.length
    ? Math.round((correctCount / rounds.length) * 100)
    : 0;

  const rank = useMemo(() => getRankTitle(correctCount, TOTAL_ROUNDS), [correctCount]);
  const isPerfectRun = correctCount === TOTAL_ROUNDS && rounds.length > 0;

  const selectedOption = getGuessOption(selectedGuess);
  const wrongGuessCount = activeRound
    ? activeRound.attempts.filter((attempt) => attempt !== activeRound.answer).length
    : 0;
  const wrongGuessFill = `${(wrongGuessCount / MAX_GUESSES) * 100}%`;

  const guessButtonLabel = (() => {
    if (isAdvancing && activeRound?.solved) return "Correct";
    if (isAdvancing) return "Locked In";
    return "Make a Guess";
  })();

  const guessButtonTone: GuessTone =
    isAdvancing && activeRound?.solved
      ? "yes"
      : isAdvancing
        ? "no"
        : selectedGuess
          ? "maybe"
          : "idle";

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setRounds(createRounds());
    }, 0);

    return () => {
      clearTimeout(initTimer);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current !== null) {
        clearTimeout(advanceTimerRef.current);
      }
      if (shakeTimerRef.current !== null) {
        clearTimeout(shakeTimerRef.current);
      }
      if (revealTimerRef.current !== null) {
        clearTimeout(revealTimerRef.current);
      }
      if (correctTimerRef.current !== null) {
        clearTimeout(correctTimerRef.current);
      }
      if (shareTimerRef.current !== null) {
        clearTimeout(shareTimerRef.current);
      }
      if (imageShareTimerRef.current !== null) {
        clearTimeout(imageShareTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!dropdownOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (dropdownRef.current?.contains(event.target as Node)) {
        return;
      }

      setDropdownOpen(false);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen]);

  function queueNextRound(delayMs = ROUND_ADVANCE_DELAY_MS) {
    if (advanceTimerRef.current !== null) {
      clearTimeout(advanceTimerRef.current);
    }

    setIsAdvancing(true);
    advanceTimerRef.current = setTimeout(() => {
      setCurrentRound((prev) => prev + 1);
      setDropdownOpen(false);
      setSelectedGuess(null);
      setIsAdvancing(false);
      setRevealMissedAnswer(false);
      advanceTimerRef.current = null;
    }, delayMs);
  }

  function submitGuess() {
    if (!activeRound || gameOver || isAdvancing || !selectedGuess) return;
    if (activeRound.attempts.length >= MAX_GUESSES || activeRound.solved) return;

    const guess = selectedGuess;
    const isCorrectGuess = guess === activeRound.answer;
    const updatedRounds = rounds.map((round, index) => {
      if (index !== currentRound) return round;
      const attempts = [...round.attempts, guess];
      return {
        ...round,
        attempts,
        solved: isCorrectGuess,
      };
    });

    setRounds(updatedRounds);
    setSelectedGuess(null);
    setDropdownOpen(false);

    if (isCorrectGuess) {
      if (correctTimerRef.current !== null) {
        clearTimeout(correctTimerRef.current);
      }
      setPopCorrectGuess(false);
      requestAnimationFrame(() => {
        setPopCorrectGuess(true);
        correctTimerRef.current = setTimeout(() => {
          setPopCorrectGuess(false);
          correctTimerRef.current = null;
        }, CORRECT_GUESS_POP_MS);
      });
    } else {
      if (shakeTimerRef.current !== null) {
        clearTimeout(shakeTimerRef.current);
      }
      if (revealTimerRef.current !== null) {
        clearTimeout(revealTimerRef.current);
      }
      setRevealMissedAnswer(false);
      setShakeWrongGuess(true);
      shakeTimerRef.current = setTimeout(() => {
        setShakeWrongGuess(false);
        shakeTimerRef.current = null;
      }, WRONG_GUESS_SHAKE_MS);

      const updatedRound = updatedRounds[currentRound];
      if (updatedRound.attempts.length >= MAX_GUESSES && !updatedRound.solved) {
        revealTimerRef.current = setTimeout(() => {
          setRevealMissedAnswer(true);
          revealTimerRef.current = null;
        }, WRONG_GUESS_SHAKE_MS);
      }
    }

    const updatedRound = updatedRounds[currentRound];
    if (updatedRound.solved || updatedRound.attempts.length >= MAX_GUESSES) {
      queueNextRound(
        updatedRound.solved ? ROUND_ADVANCE_DELAY_MS : ROUND_MISS_ADVANCE_DELAY_MS,
      );
    }
  }

  function resetGame() {
    if (advanceTimerRef.current !== null) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    if (shakeTimerRef.current !== null) {
      clearTimeout(shakeTimerRef.current);
      shakeTimerRef.current = null;
    }
    if (revealTimerRef.current !== null) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    if (correctTimerRef.current !== null) {
      clearTimeout(correctTimerRef.current);
      correctTimerRef.current = null;
    }
    if (shareTimerRef.current !== null) {
      clearTimeout(shareTimerRef.current);
      shareTimerRef.current = null;
    }
    if (imageShareTimerRef.current !== null) {
      clearTimeout(imageShareTimerRef.current);
      imageShareTimerRef.current = null;
    }

    setRounds(createRounds());
    setCurrentRound(0);
    setDropdownOpen(false);
    setSelectedGuess(null);
    setIsAdvancing(false);
    setShakeWrongGuess(false);
    setRevealMissedAnswer(false);
    setPopCorrectGuess(false);
    setShareCopied(false);
    setImageShareState("idle");
  }

  function buildShareText(): string {
    const grid = rounds.map((round) => TIER_EMOJI[getRoundTier(round)]).join("");
    const lines = [
      `Which AI Made This? \u2014 ${correctCount}/${TOTAL_ROUNDS} in ${attemptsUsed} guesses`,
      grid,
      `Perfect: ${perfectRounds} \u00B7 Best streak: ${bestStreak} \u00B7 ${accuracyPct}% accuracy`,
      SHARE_URL,
    ];
    return lines.join("\n");
  }

  function scheduleImageShareStateReset() {
    if (imageShareTimerRef.current !== null) {
      clearTimeout(imageShareTimerRef.current);
    }
    imageShareTimerRef.current = setTimeout(() => {
      setImageShareState("idle");
      imageShareTimerRef.current = null;
    }, 2200);
  }

  async function buildScoreImageBlob(): Promise<Blob> {
    const card = resultCardRef.current;
    if (!card) {
      throw new Error("Score card is unavailable.");
    }

    const m = SCORE_IMAGE_MARGIN_PX;
    const innerW = Math.ceil(Math.max(card.scrollWidth, card.offsetWidth));
    const innerH = Math.ceil(Math.max(card.scrollHeight, card.offsetHeight));

    const blob = await toBlob(card, {
      width: innerW + m * 2,
      height: innerH + m * 2,
      backgroundColor: "#ffffff",
      cacheBust: true,
      pixelRatio: 2,
      style: {
        padding: `${m}px`,
        boxSizing: "border-box",
        overflow: "visible",
      },
    });

    if (!blob) {
      throw new Error("Could not create score image.");
    }

    if (blob.type === "image/png") {
      return blob;
    }

    return new Blob([await blob.arrayBuffer()], { type: "image/png" });
  }

  async function handleShare() {
    const text = buildShareText();
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // Clipboard access may be blocked; fall through to the visual confirmation anyway.
    }

    setShareCopied(true);
    if (shareTimerRef.current !== null) {
      clearTimeout(shareTimerRef.current);
    }
    shareTimerRef.current = setTimeout(() => {
      setShareCopied(false);
      shareTimerRef.current = null;
    }, 2200);
  }

  async function handleImageShare() {
    const supportsClipboardWrite =
      typeof ClipboardItem !== "undefined" &&
      typeof navigator !== "undefined" &&
      typeof navigator.clipboard?.write === "function";

    if (supportsClipboardWrite) {
      try {
        // Pass the Promise<Blob> directly so the user-activation context survives
        // the async toBlob() work (Safari + recent Chrome require this).
        const item = new ClipboardItem({
          "image/png": buildScoreImageBlob(),
        });
        await navigator.clipboard.write([item]);
        setImageShareState("copied");
        scheduleImageShareStateReset();
        return;
      } catch (error) {
        console.error("Score image clipboard copy failed", error);
      }
    }

    try {
      const blob = await buildScoreImageBlob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "which-ai-score.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      setImageShareState("downloaded");
    } catch (error) {
      console.error("Score image generation failed", error);
      setImageShareState("failed");
    }

    scheduleImageShareStateReset();
  }

  return (
    <main className="mx-auto w-full max-w-[1400px] px-5 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-medium tracking-tight text-[var(--gallery-text-primary)] sm:text-4xl">
          Guess the AI Lab
        </h1>
      </header>

      {rounds.length === 0 ? (
        <section className="mt-10 overflow-hidden rounded-2xl border border-[var(--gallery-border)] bg-[var(--gallery-surface)]">
          <div className="h-[calc(100dvh-11rem)] min-h-[640px] animate-pulse bg-[var(--gallery-surface-muted)] sm:h-[calc(100dvh-13rem)]" />
        </section>
      ) : null}

      {!gameOver && activeRound ? (
        <section className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-[var(--gallery-border)] bg-[var(--gallery-surface-muted)]">
            <div className="relative">
              <iframe
                key={activeRound.id}
                title={`Unknown model iteration, round ${currentRound + 1}`}
                src={activeRound.previewHref}
                className="block h-[calc(100dvh-11rem)] min-h-[640px] w-full bg-white sm:h-[calc(100dvh-13rem)]"
              />

              <div className="pointer-events-auto absolute top-4 right-4 z-20 rounded-lg border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] px-1 py-1 text-[var(--gallery-text-tertiary)] shadow-[var(--gallery-shadow-sm)] backdrop-blur-[12px] sm:top-6 sm:right-6">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex flex-col gap-1.5" aria-label={`Round ${currentRound + 1} of ${TOTAL_ROUNDS}`}>
                    {rounds.map((round) => (
                      <span
                        key={round.id}
                        className={clsx(
                          "size-2.5 rounded-full border",
                          getRoundStatus(round) === "correct" && "border-emerald-500 bg-emerald-500",
                          getRoundStatus(round) === "wrong" && "border-rose-500 bg-rose-500",
                          getRoundStatus(round) === "active" && "border-[var(--gallery-divider-strong)] bg-[var(--gallery-surface)]",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {revealMissedAnswer && activeRound ? (
                (() => {
                  const answerOption = getGuessOption(activeRound.answer);
                  return (
                    <div
                      className="lab-missed-reveal-backdrop pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-neutral-900/18 px-6 backdrop-blur-[3px]"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="lab-missed-reveal-popup relative flex max-w-[min(100%,26rem)] items-center gap-3.5 overflow-hidden rounded-2xl border border-[var(--gallery-border)] bg-[var(--gallery-nav-bg)] px-5 py-4 shadow-[0_18px_48px_rgba(0,0,0,0.14)] backdrop-blur-[12px] sm:gap-4 sm:px-6 sm:py-4">
                        {answerOption ? (
                          <ThemeAwareLogo
                            lightSrc={answerOption.logoLightPath}
                            darkSrc={answerOption.logoDarkPath}
                            alt=""
                            width={36}
                            height={36}
                            className="size-9 shrink-0 rounded-md object-contain sm:size-10"
                          />
                        ) : null}
                        <p className="min-w-0 truncate text-xl font-medium tracking-tight text-[var(--gallery-text-primary)] sm:text-2xl">
                          {activeRound.modelLabel}
                        </p>
                      </div>
                    </div>
                  );
                })()
              ) : null}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-24 sm:px-6 sm:pb-6">
                <div className="relative flex w-full items-end justify-center">
                  <div
                    className={clsx("pointer-events-auto relative", pickerWidthClass)}
                    ref={dropdownRef}
                  >
                    <button
                      type="button"
                      onClick={() => setDropdownOpen((open) => !open)}
                      disabled={isAdvancing}
                      className={clsx(
                        pickerTriggerClass,
                        "relative w-full overflow-hidden",
                        wrongGuessCount > 0 && "border-rose-300",
                        shakeWrongGuess && "lab-wrong-shake",
                        popCorrectGuess && "lab-correct-pop",
                        isAdvancing && "cursor-default opacity-80",
                      )}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 rounded-[inherit] bg-rose-500/16 transition-[width] duration-200"
                        style={{ width: wrongGuessFill }}
                      />
                      <span className="relative z-10 flex items-center gap-3">
                        {selectedOption ? (
                          <ThemeAwareLogo
                            lightSrc={selectedOption.logoLightPath}
                            darkSrc={selectedOption.logoDarkPath}
                            alt=""
                            width={18}
                            height={18}
                            className="size-[18px] rounded-sm object-contain"
                          />
                        ) : (
                          <span className="size-[18px] rounded-sm border border-dashed border-[var(--gallery-divider-strong)] bg-[var(--gallery-surface-subtle)]" />
                        )}
                        <span>{selectedOption?.label ?? "Choose a model family"}</span>
                      </span>
                      {wrongGuessCount > 0 ? (
                        <span className="relative z-10 ml-auto mr-2 shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-700">
                          {wrongGuessCount}/{MAX_GUESSES}
                        </span>
                      ) : null}
                      <ChevronDown
                        className={clsx(
                          "relative z-10 size-4 shrink-0 text-[var(--gallery-text-quaternary)] transition-transform",
                          dropdownOpen && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>

                    {dropdownOpen ? (
                      <div className={pickerListClass}>
                        {GUESS_OPTIONS.map((option) => {
                          const alreadyGuessed = activeRound.attempts.includes(option.slug);
                          const tone = getGuessTone(activeRound, option.slug, selectedGuess);
                          const disabled = alreadyGuessed || isAdvancing;

                          return (
                            <button
                              type="button"
                              key={option.slug}
                              onClick={() => {
                                if (!alreadyGuessed && !isAdvancing) {
                                  setSelectedGuess(option.slug);
                                  setDropdownOpen(false);
                                }
                              }}
                              disabled={disabled}
                              className={clsx(
                                pickerOptionClass(tone === "maybe", disabled),
                                disabled && "opacity-60",
                                tone === "yes" &&
                                  "bg-emerald-100 text-neutral-900 hover:bg-emerald-200",
                                tone === "no" &&
                                  "bg-rose-100 text-rose-800 hover:bg-rose-100",
                              )}
                            >
                              <span className="flex min-w-0 flex-1 items-center gap-3">
                                <ThemeAwareLogo
                                  lightSrc={option.logoLightPath}
                                  darkSrc={option.logoDarkPath}
                                  alt=""
                                  width={18}
                                  height={18}
                                  className="size-[18px] rounded-sm object-contain"
                                />
                                <span className="truncate font-medium">{option.label}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>

                </div>

                <button
                  type="button"
                  onClick={submitGuess}
                  disabled={!selectedGuess || isAdvancing}
                  className={clsx(
                    "pointer-events-auto absolute bottom-4 right-4 inline-flex h-[42px] min-w-36 items-center justify-center rounded-lg border px-4 text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-[12px] transition-colors outline-none sm:bottom-6 sm:right-6 focus-visible:border-[var(--gallery-accent)] focus-visible:ring-1 focus-visible:ring-[var(--gallery-accent)] disabled:cursor-not-allowed disabled:opacity-70",
                    guessButtonTone === "yes" &&
                      "border-emerald-200 bg-emerald-50/95 text-emerald-700",
                    guessButtonTone === "no" &&
                      "border-rose-200 bg-rose-50/95 text-rose-700",
                    guessButtonTone === "maybe" &&
                      "border-[var(--gallery-accent)] bg-[var(--gallery-accent)] text-[var(--gallery-accent-foreground)] hover:bg-[color-mix(in_srgb,var(--gallery-accent)_88%,black)]",
                    guessButtonTone === "idle" &&
                      "border-[color-mix(in_srgb,var(--gallery-accent)_20%,white)] bg-[color-mix(in_srgb,var(--gallery-accent)_10%,white)] text-[var(--gallery-accent)]",
                    shakeWrongGuess && "lab-wrong-shake",
                    popCorrectGuess && "lab-correct-pop overflow-hidden",
                  )}
                >
                  {guessButtonLabel}
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {rounds.length > 0 && gameOver ? (
        <section
          ref={resultCardRef}
          aria-label="Game results"
          className={clsx(
            "relative mt-10 overflow-hidden rounded-2xl border bg-[var(--gallery-surface)] p-6 sm:p-8",
            isPerfectRun
              ? "border-emerald-200 shadow-[0_0_0_6px_rgba(16,185,129,0.06)]"
              : "border-[var(--gallery-border)]",
          )}
        >
          {isPerfectRun ? (
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl"
            />
          ) : null}

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-md">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--gallery-text-quaternary)] uppercase">
                Your rank
              </p>
              <h2 className="mt-2 text-3xl font-medium tracking-tight text-[var(--gallery-text-primary)] sm:text-4xl">
                {rank.title}
                {isPerfectRun ? (
                  <span className="ml-3 inline-flex -translate-y-1 items-center rounded-full bg-emerald-500/10 px-2.5 py-1 align-middle text-xs font-semibold tracking-wide text-emerald-700 uppercase">
                    Flawless
                  </span>
                ) : null}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--gallery-text-secondary)]">{rank.subtitle}</p>
            </div>

            <div className="flex items-baseline gap-3 self-start sm:self-end">
              <span className="text-6xl font-medium tracking-tight text-[var(--gallery-text-primary)] tabular-nums sm:text-7xl">
                {correctCount}
              </span>
              <div className="flex flex-col items-start leading-none">
                <span className="text-2xl font-medium tracking-tight text-[var(--gallery-divider-strong)] tabular-nums">
                  / {TOTAL_ROUNDS}
                </span>
                <span className="mt-2 text-xs font-medium tracking-wide text-[var(--gallery-text-tertiary)] uppercase">
                  {attemptsUsed} guesses
                </span>
              </div>
            </div>
          </div>

          <div className="relative mt-7 flex flex-wrap gap-2">
            {rounds.map((round, idx) => {
              const tier = getRoundTier(round);
              return (
                <div
                  key={round.id}
                  title={`Round ${idx + 1} \u00B7 ${round.modelLabel} \u2192 ${round.answerLabel}`}
                  className={clsx(
                    "size-10 rounded-[4px] shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)] sm:size-12",
                    TIER_TILE_CLASS[tier],
                  )}
                />
              );
            })}
          </div>

          <div className="relative mt-7 grid gap-2 sm:grid-cols-4">
            {[
              { label: "Accuracy", value: `${accuracyPct}%` },
              { label: "Perfect rounds", value: perfectRounds, hint: "Solved on first try" },
              { label: "Best streak", value: bestStreak, hint: "In a row" },
              {
                label: "Avg guesses",
                value: solvedAttempts.count ? avgGuessesPerSolved.toFixed(1) : "\u2014",
                hint: "Per solved round",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--gallery-border)] bg-[var(--gallery-surface-subtle)]/70 px-4 py-4"
              >
                <p className="text-[11px] font-medium tracking-[0.14em] text-[var(--gallery-text-tertiary)] uppercase">
                  {stat.label}
                </p>
                <p className="mt-1 text-2xl font-medium tracking-tight text-[var(--gallery-text-primary)] tabular-nums">
                  {stat.value}
                </p>
                {stat.hint ? (
                  <p className="mt-1 text-xs text-[var(--gallery-text-tertiary)]">{stat.hint}</p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="relative mt-7">
            <p className="mb-3 text-[11px] font-semibold tracking-[0.22em] text-[var(--gallery-text-quaternary)] uppercase">
              Round breakdown
            </p>
            <ul className="divide-y divide-[var(--gallery-border)] overflow-hidden rounded-xl border border-[var(--gallery-border)]">
              {rounds.map((round, idx) => {
                const answerOption = getGuessOption(round.answer);
                return (
                  <li
                    key={round.id}
                    className="flex items-center gap-3 bg-[var(--gallery-surface)] px-4 py-3 sm:gap-4"
                  >
                    <span className="w-5 shrink-0 text-xs font-medium tabular-nums text-[var(--gallery-text-quaternary)]">
                      {idx + 1}
                    </span>
                    {answerOption ? (
                      <ThemeAwareLogo
                        lightSrc={answerOption.logoLightPath}
                        darkSrc={answerOption.logoDarkPath}
                        alt=""
                        width={22}
                        height={22}
                        className="size-[22px] shrink-0 rounded-sm object-contain"
                      />
                    ) : (
                      <span className="size-[22px] shrink-0 rounded-sm bg-[var(--gallery-surface-muted)]" />
                    )}
                    <div className="flex min-w-0 flex-1 items-baseline gap-2">
                      <span className="truncate text-sm font-medium text-[var(--gallery-text-primary)]">
                        {round.answerLabel}
                      </span>
                      <span className="truncate text-xs text-[var(--gallery-text-quaternary)]">
                        {round.modelLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5" aria-hidden>
                      {Array.from({ length: MAX_GUESSES }).map((_, i) => {
                        const attempt = round.attempts[i];
                        const isCorrect = attempt === round.answer;
                        return (
                          <span
                            key={i}
                            className={clsx(
                              "size-2 rounded-full",
                              !attempt && "bg-[var(--gallery-divider-strong)]",
                              attempt && isCorrect && "bg-emerald-500",
                              attempt && !isCorrect && "bg-rose-300",
                            )}
                          />
                        );
                      })}
                    </div>
                    <span
                      className={clsx(
                        "w-12 shrink-0 text-right text-xs font-medium tabular-nums",
                        round.solved ? "text-emerald-600" : "text-[var(--gallery-text-quaternary)]",
                      )}
                    >
                      {round.solved
                        ? round.attempts.length === 1
                          ? "Ace"
                          : `${round.attempts.length} tries`
                        : "Missed"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={handleShare}
              className={clsx(
                "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[var(--gallery-accent)]",
                shareCopied
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : "border-transparent bg-[var(--gallery-accent)] text-[var(--gallery-accent-foreground)] hover:bg-[color-mix(in_srgb,var(--gallery-accent)_88%,black)]",
              )}
            >
              {shareCopied ? (
                <>
                  <Check className="size-4" aria-hidden />
                  Copied to clipboard
                </>
              ) : (
                <>
                  <Share2 className="size-4" aria-hidden />
                  Share your score
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleImageShare}
              className={clsx(
                "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[var(--gallery-accent)]",
                imageShareState === "copied" &&
                  "border-emerald-300 bg-emerald-50 text-emerald-700",
                imageShareState === "downloaded" &&
                  "border-[var(--gallery-divider-strong)] bg-[var(--gallery-surface-subtle)] text-[var(--gallery-text-primary)]",
                imageShareState === "failed" && "border-rose-300 bg-rose-50 text-rose-700",
                imageShareState === "idle" &&
                  "border-[var(--gallery-divider-strong)] bg-[var(--gallery-surface)] text-[var(--gallery-text-primary)] hover:border-[var(--gallery-text-quaternary)] hover:bg-[var(--gallery-surface-subtle)]",
              )}
            >
              {imageShareState === "copied" ? (
                <>
                  <Check className="size-4" aria-hidden />
                  Image copied
                </>
              ) : imageShareState === "downloaded" ? (
                "Image downloaded"
              ) : imageShareState === "failed" ? (
                "Image copy failed"
              ) : (
                "Copy score image"
              )}
            </button>
            <button
              type="button"
              onClick={resetGame}
              className="inline-flex items-center justify-center rounded-lg border border-[var(--gallery-divider-strong)] bg-[var(--gallery-surface)] px-4 py-2.5 text-sm font-medium text-[var(--gallery-text-primary)] transition hover:border-[var(--gallery-text-quaternary)] hover:bg-[var(--gallery-surface-subtle)]"
            >
              Play again
            </button>
            <span className="ml-auto shrink-0 rounded-lg bg-[var(--gallery-nav-bg)] px-[0.55rem] py-[0.35rem] text-sm font-bold tracking-wide text-[var(--gallery-accent)]">
              {SHARE_URL}
            </span>
          </div>
        </section>
      ) : null}
    </main>
  );
}
