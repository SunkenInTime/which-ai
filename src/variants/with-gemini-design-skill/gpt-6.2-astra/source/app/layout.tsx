import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-gemini-design-skill/gpt-6.2-astra/source/app/globals.css";

export const metadata: Metadata = {
  title: "Folio · A home for your wandering mind",
  description: "Keep your notes, ideas, and discoveries together in a personal second brain.",
  icons: { icon: "/variants/with-gemini-design-skill/gpt-6.2-astra/folio.svg" },
};

// Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its scoped
// copy, and the model's design switcher isn't rendered (the gallery has its own). Original: see docs/benchmarks/gemini-design-skill.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-source-html lang="en" data-scroll-behavior="smooth">
      <div data-source-body>{children}</div>
    </div>
  );
}
