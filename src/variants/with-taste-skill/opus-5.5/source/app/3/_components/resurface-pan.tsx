"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  when: string;
  title: string;
  body: React.ReactNode;
  image?: boolean;
  lit?: boolean;
};

const CARDS: Card[] = [
  {
    when: "March 2023",
    title: "Jacobs: eyes on the street",
    image: true,
    body: (
      <>
        Clipped while reading. &ldquo;Sidewalk contacts are the small change from which a
        city&rsquo;s wealth of public life may grow.&rdquo;
      </>
    ),
  },
  {
    when: "The next two years",
    title: "Filed, then forgotten",
    body: "No tags, no folder, no links. It sits among everything else you saved, which is how most notes end up.",
  },
  {
    when: "Today, 9:14",
    title: "Why our office floor feels empty",
    body: "You start a draft for the leadership offsite: people stopped bumping into each other after the move to the new floor.",
  },
  {
    when: "Today, 9:16",
    title: "Related: Jacobs: eyes on the street",
    lit: true,
    body: "The Related panel brings the 2023 clipping back. Same idea, different building: casual contact needs foot traffic and a reason to linger.",
  },
  {
    when: "Today, 9:20",
    title: "One link, a better argument",
    body: (
      <>
        You type <span className="mono text-(--accent-text)">[[</span> and link it. The draft now
        quotes Jacobs, and the old note shows a backlink to the new one.
      </>
    ),
  },
];

export function ResurfacePan() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const mm = gsap.matchMedia();
    // Pan only on wide screens with motion allowed. Otherwise it stays a vertical list.
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top", // pin starts when section top hits viewport top
          end: () => `+=${distance()}`, // scroll distance = track width minus viewport
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={wrap}
      id="resurfacing"
      aria-labelledby="resurface-title"
      className="relative overflow-hidden border-t border-(--line)"
    >
      <div
        ref={track}
        className="flex flex-col gap-6 px-4 py-20 sm:px-8 md:motion-safe:h-[100dvh] md:motion-safe:w-max md:motion-safe:flex-row md:motion-safe:items-center md:motion-safe:gap-8 md:motion-safe:py-0 md:motion-safe:pl-[8vw] md:motion-safe:pr-[12vw] md:motion-reduce:mx-auto md:motion-reduce:grid md:motion-reduce:max-w-7xl md:motion-reduce:grid-cols-2 md:motion-reduce:py-32 lg:motion-reduce:grid-cols-3"
      >
        <div className="md:motion-safe:w-[min(34vw,440px)] md:motion-safe:shrink-0 md:motion-safe:pr-10">
          <h2
            id="resurface-title"
            className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance md:text-5xl"
          >
            The note you forgot comes back.
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-(--fg-muted)">
            Kept reads what you are writing now and brings up older notes that say something
            related. Here is how that plays out.
          </p>
        </div>
        {CARDS.map((c) => (
          <article
            key={c.title}
            className={`flex flex-col rounded-lg border p-6 md:motion-safe:min-h-[300px] md:motion-safe:w-[min(76vw,380px)] md:motion-safe:shrink-0 ${
              c.lit
                ? "border-(--accent) bg-(--bg-raised) shadow-[inset_0_0_0_1px_var(--accent)]"
                : "border-(--line-strong) bg-(--bg-raised)"
            }`}
          >
            <p className="mono text-xs text-(--fg-faint)">{c.when}</p>
            <h3 className="mt-3 text-xl font-medium leading-snug tracking-tight">{c.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-(--fg-muted)">{c.body}</p>
            {c.image && (
              <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src="https://picsum.photos/seed/kept-city-corner/760/570"
                  alt="A bicycle parked outside a yellow shopfront, a man reading on the step"
                  fill
                  sizes="(min-width: 768px) 380px, 92vw"
                  className="object-cover"
                />
              </div>
            )}
            {c.lit && (
              <p className="mt-auto flex items-center justify-between border-t border-(--line) pt-4 text-sm max-md:mt-5">
                <span className="text-(--fg-muted)">Shares: casual contact, foot traffic</span>
                <span className="rounded-lg bg-(--accent) px-2 py-0.5 text-xs font-medium text-(--accent-ink)">
                  Related
                </span>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
