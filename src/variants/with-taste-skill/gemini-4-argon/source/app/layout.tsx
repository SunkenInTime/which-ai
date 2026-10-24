import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-taste-skill/gemini-4-argon/source/app/fonts.css";
import "@/generated/scoped-variant-css/with-taste-skill/gemini-4-argon/source/app/globals.css";

export const metadata: Metadata = {
  title: "Kasten · The Local-First Slip-Box & Second Brain",
  description:
    "Kasten stores every thought as a plain Markdown slip filed by a branching Folgezettel address. Sub-millisecond link traversal, zero cloud lock-in.",
};

// Gallery adaptations: the source's <IterationSwitcher /> bar is not rendered because the gallery
// provides iteration navigation, and the source's Google Fonts / Fontshare <link> tags are replaced
// by fonts.css, which declares the same faces under namespaced family names.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-source-html lang="en" className="js">
      <div data-source-body>{children}</div>
    </div>
  );
}
