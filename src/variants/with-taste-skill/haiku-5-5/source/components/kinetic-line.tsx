"use client";

import { motion, useReducedMotion } from "motion/react";

export function KineticLine({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className="block">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="mr-[0.22em] inline-block"
          initial={reduce ? false : { opacity: 0, y: "0.5em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.09,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
