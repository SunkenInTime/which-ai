import type { Metadata } from "next";
// Gallery adaptation: fonts come from ../fonts.css (self-hosted, prefixed names) instead of next/font.

export const metadata: Metadata = {
  title: "Cairn | Think once, recall forever",
  description:
    "Structured, instant second-brain software built on plain files, automatic backlinks, and razor-sharp speed.",
};

export default function IterationThreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`gf-space-grotesk-iter3-sans min-h-screen bg-white text-[#0D0D0F]`}
      style={{ fontFamily: "var(--font-iter3-sans), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
