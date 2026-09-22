"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const concepts = ["one", "two", "three", "four", "five"] as const;

export default function ConceptSwitcher() {
  const pathname = usePathname();
  return (
    <nav className="concept-switcher" aria-label="Switch landing page concept">
      <span className="concept-switcher-label">EXPLORE CONCEPTS</span>
      <div className="concept-switcher-links">
        {concepts.map((concept, index) => (
          <Link key={concept} href={`/${concept}`} aria-label={`Concept ${index + 1}`}
            aria-current={pathname === `/${concept}` ? "page" : undefined}
            className={pathname === `/${concept}` ? "active" : ""}>
            {String(index + 1).padStart(2, "0")}
          </Link>
        ))}
      </div>
    </nav>
  );
}
