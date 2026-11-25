import type { Metadata } from "next";
// Gallery adaptation: fonts come from ../fonts.css (self-hosted, prefixed names) instead of next/font.

export const metadata: Metadata = {
  title: "Cairn | Local-First Second Brain Workspace",
  description:
    "Try Cairn directly in your browser. Plain Markdown notes, instant wiki-links, and live backlink discovery.",
};

export default function IterationFiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`gf-plus-jakarta-sans-iter5-sans gf-jetbrains-mono-iter5-mono min-h-screen bg-[#F3F5F7] text-[#14171F]`}
      style={{ fontFamily: "var(--font-iter5-sans), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
