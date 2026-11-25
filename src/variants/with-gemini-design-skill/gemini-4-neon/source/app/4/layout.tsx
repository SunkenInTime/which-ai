import type { Metadata } from "next";
// Gallery adaptation: fonts come from ../fonts.css (self-hosted, prefixed names) instead of next/font.

export const metadata: Metadata = {
  title: "Cairn | A quiet home for deep memory",
  description:
    "An editorial second brain crafted for readers, essayists, and researchers who turn books and field notes into lasting work.",
};

export default function IterationFourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`gf-fraunces-iter4-display gf-dm-sans-iter4-sans min-h-screen bg-[#F2F6FB] text-[#0E1E36]`}
      style={{ fontFamily: "var(--font-iter4-sans), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
