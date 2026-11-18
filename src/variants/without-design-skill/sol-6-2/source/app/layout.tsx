import type { Metadata } from "next";
import "@/generated/scoped-variant-css/without-design-skill/sol-6-2/source/app/globals.css";
import "@/generated/scoped-variant-css/without-design-skill/sol-6-2/source/app/concepts.css";

export const metadata: Metadata = {
  title: "Morrow — A second brain for your notes",
  description: "Capture notes, connect ideas, and find your way back to what matters.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Gallery adaptation: <html>/<body> become wrapper divs, the source's CSS is imported through its scoped copies,
  // and the model's switcher isn't rendered. Original: see docs/benchmarks/gpt-6-2-sol.
  return (
    <div data-source-html lang="en">
      <div data-source-body>{children}</div>
    </div>
  );
}
