import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVars } from "./fonts";
import "@/generated/scoped-variant-css/with-design-skill/deepseek-v4-1-flash/source/app/globals.css";

export const metadata: Metadata = {
  title: "Cairn — a second brain for your notes",
  description:
    "Five design directions for the Cairn landing page: a note-taking app built to hold what you've already written.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div data-source-html lang="en" className={fontVars}>
      <div data-source-body>
        {children}
      </div>
    </div>
  );
}
