"use client";

// GSAP only. Follows the canonical sticky-stack skeleton (SKILL.md 5.A):
// every card but the last pins at "top top", and each card shrinks and dims
// as the next one scrolls over it. Kept separate from all Motion components.
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function StickyStack({ cards }: { cards: React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top", // pin at viewport top
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
        // Addition to the skeleton: once a card is two deep it fades out
        // fully, so a dimmed card never ghosts through the one above it.
        const twoAhead = cardEls[i + 2];
        if (twoAhead) {
          gsap.fromTo(
            card,
            { opacity: 0.55 },
            {
              opacity: 0,
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                trigger: twoAhead,
                start: "top bottom",
                end: "top 55%",
                scrub: true,
              },
            },
          );
        }
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={ref} className="relative">
      {cards.map((card, i) => (
        <div
          key={i}
          className="stack-card sticky top-0 flex min-h-[100dvh] items-center justify-center px-3 py-4 md:px-10 md:py-8"
        >
          {card}
        </div>
      ))}
    </div>
  );
}
