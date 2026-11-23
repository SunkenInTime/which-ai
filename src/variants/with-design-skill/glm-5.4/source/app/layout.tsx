import type { Metadata } from "next";
import type { ReactNode } from "react";
// Gallery adaptation: a scoped copy of the source's globals.css; the source's VariantSwitcher isn't rendered.
import "@/generated/scoped-variant-css/with-design-skill/glm-5.4/source/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Slip, a second brain for your notes",
    template: "%s · Slip",
  },
  description:
    "Five landing page iterations for Slip, a note-taking app that works as a second brain.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div data-source-html lang="en" data-scroll-behavior="smooth">
      <div data-source-body>{children}</div>
    </div>
  );
}
