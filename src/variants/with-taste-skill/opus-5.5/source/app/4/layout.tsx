import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/opus-5.5/source/app/4/styles.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-v4-display",
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  title: "Kept - where your scattered ideas finally connect",
  description:
    "Capture anything, link it to everything else, and let old notes come back when you need them. Kept is a second brain for students, writers and creative people.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${bricolage.variable} v4 min-h-[100dvh] bg-(--v4-bg) font-sans text-(--v4-fg) antialiased`}
    >
      {children}
    </div>
  );
}
