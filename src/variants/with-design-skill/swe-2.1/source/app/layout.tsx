import type { Metadata } from "next";
import type { ReactNode } from "react";
// Gallery adaptation: <html>/<body> become wrapper divs and the source's globals.css is imported through its scoped
// copy. The source renders its IterationSwitcher from app/[iteration]/page.tsx, which the gallery doesn't use.
import "@/generated/scoped-variant-css/with-design-skill/swe-2.1/source/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Commonplace — a second brain for notes",
    template: "%s — Commonplace",
  },
  description:
    "Five visual directions for a note-taking application designed as a second brain.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div data-source-html lang="en" data-scroll-behavior="smooth">
      <div data-source-body>{children}</div>
    </div>
  );
}
