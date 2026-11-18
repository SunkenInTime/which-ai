import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-design-skill/gpt-6.2-astra/source/app/globals.css";

export const metadata: Metadata = {
  title: "Notefold — A second brain for your ideas",
  description:
    "A personal notebook to capture loose thoughts, connect your notes, and find the right idea again.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Gallery adaptation: <html>/<body> become wrapper divs, the source's globals.css is imported through its
    // scoped copy, and the model's switcher isn't rendered. Original: see docs/benchmarks/gpt-6-2-astra.
    <div data-source-html lang="en" data-scroll-behavior="smooth">
      <div data-source-body>{children}</div>
    </div>
  );
}
