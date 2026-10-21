import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-taste-skill/sol-6-1/source/app/fonts.css";
import "@/generated/scoped-variant-css/with-taste-skill/sol-6-1/source/app/globals.css";
export const metadata: Metadata = {
  title: "Commonplace — A home for your mind",
  description: "A personal second brain for your notes, discoveries, and the connections between them. Explore five perspectives on Commonplace.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <div data-source-html lang="en" data-scroll-behavior="smooth"><div data-source-body>{children}</div></div>; }
