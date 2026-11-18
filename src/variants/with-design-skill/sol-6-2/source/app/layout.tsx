import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-design-skill/sol-6-2/source/app/globals.css";

export const metadata: Metadata = {
  title: "Morrow | A second brain for your ideas",
  description: "Capture what matters, connect your notes, and find your way back to your best ideas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Gallery adaptation: <html>/<body> become wrapper divs, globals.css is imported through its scoped copy, and the
  // model's switcher isn't rendered. Original: see docs/benchmarks/gpt-6-2-sol.
  return (
    <div data-source-html lang="en">
      <div data-source-body>{children}</div>
    </div>
  );
}
