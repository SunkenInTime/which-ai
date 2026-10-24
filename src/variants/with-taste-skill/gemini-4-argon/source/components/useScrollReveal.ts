"use client";

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    const markVisible = () => {
      const vh = window.innerHeight || 900;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh + 120) {
          el.classList.add("in-view");
        }
      });
    };

    markVisible();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "120px 0px 120px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", markVisible, { passive: true });
    window.addEventListener("resize", markVisible, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", markVisible);
      window.removeEventListener("resize", markVisible);
    };
  }, []);
}
