import type { Metadata } from "next";
// Gallery adaptation: fonts come from ../fonts.css (self-hosted, prefixed names) instead of next/font.

export const metadata: Metadata = {
  title: "Cairn | Keep every thought within reach",
  description:
    "Write freely, connect ideas automatically, and recall any detail across years of reading and research.",
};

export default function IterationOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`gf-instrument-serif-iter1-display gf-plus-jakarta-sans-iter1-sans min-h-screen bg-[#F8F9FA] text-[#111317]`}
      style={{ fontFamily: "var(--font-iter1-sans), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
