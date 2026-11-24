import type { Metadata } from "next";
// Gallery adaptation: fonts come from ../fonts.css (self-hosted, prefixed names) instead of next/font.

export const metadata: Metadata = {
  title: "Cairn | Your ideas grow stronger together",
  description:
    "A deep, quiet second brain built for researchers, designers, and writers who connect thoughts across years.",
};

export default function IterationTwoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`gf-syne-iter2-display gf-inter-iter2-sans min-h-screen bg-[#0B1A16] text-[#EEF3F0]`}
      style={{ fontFamily: "var(--font-iter2-sans), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
