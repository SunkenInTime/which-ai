"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SelectionAll, Swatches, PresentationChart } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

interface StackBoard {
  title: string;
  subtitle: string;
  description: string;
  seed: string;
  alt: string;
  metricLabel: string;
  metricValue: string;
  icon: "selection" | "swatches" | "presentation";
}

const BOARDS: StackBoard[] = [
  {
    title: "Capture Visual Fragments Without Filing",
    subtitle: "Raw Spatial Ingestion",
    description:
      "Drop RAW photography, PDF floorplans, voice memos, and typography clippings directly onto an infinite 60fps canvas. Atelier extracts dominant color tokens, EXIF metadata, and OCR text in the background.",
    seed: "atelier-architecture-model-studio",
    alt: "Architectural studio table with physical material samples and lighting",
    metricLabel: "Canvas rendering pipeline",
    metricValue: "120 Hz WebGPU",
    icon: "selection",
  },
  {
    title: "Cluster By Visual & Semantic Proximity",
    subtitle: "Associative Memory Grouping",
    description:
      "Pull related references together on a 2D plane. Atelier links spatial neighbors into bidirectional memory threads so your moodboard and your written brief stay synchronized.",
    seed: "atelier-industrial-design-sketches",
    alt: "Industrial design sketches and material swatches arranged spatially",
    metricLabel: "Spatial node capacity",
    metricValue: "10,000+ Frames",
    icon: "swatches",
  },
  {
    title: "Transform Messy Tables Into Client Folios",
    subtitle: "One-Click Narrative Sequences",
    description:
      "Draw a presentation path across any region of your canvas to turn raw research fragments into a structured pitch deck or architectural specification without copying files.",
    seed: "atelier-gallery-exhibition-space",
    alt: "Minimalist gallery space showcasing curated visual sequences",
    metricLabel: "Export fidelity",
    metricValue: "4K Print & Web",
    icon: "presentation",
  },
];

/**
 * Canonical GSAP Sticky-Stack implementation (Section 5.A of design-taste-frontend skill)
 * - Isolated from Motion in its own Client leaf component (Section 10)
 * - Honors prefers-reduced-motion (Section 6.B)
 * - Proper gsap.context() cleanup on unmount
 */
export function AtelierStickyStack() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cardEls[cardEls.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cardEls[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative">
      {BOARDS.map((board) => (
        <div
          key={board.title}
          className="stack-card sticky top-0 min-h-[100dvh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="mx-auto w-full max-w-7xl rounded-2xl border border-zinc-300 bg-white p-6 sm:p-10 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-orange-600/10 px-3.5 py-1.5 text-xs font-semibold text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
                  {board.icon === "selection" && (
                    <SelectionAll size={16} weight="regular" />
                  )}
                  {board.icon === "swatches" && (
                    <Swatches size={16} weight="regular" />
                  )}
                  {board.icon === "presentation" && (
                    <PresentationChart size={16} weight="regular" />
                  )}
                  <span>{board.subtitle}</span>
                </div>

                <h3 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-none text-zinc-900 dark:text-zinc-100">
                  {board.title}
                </h3>

                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[58ch]">
                  {board.description}
                </p>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between max-w-md">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {board.metricLabel}
                  </span>
                  <span className="font-mono text-sm font-bold text-orange-600 dark:text-orange-400">
                    {board.metricValue}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src={`https://picsum.photos/seed/${board.seed}/1100/700`}
                    alt={board.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
