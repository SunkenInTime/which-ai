import type { Metadata } from "next";
import { EB_Garamond, Figtree } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/opus-5.5/source/app/2/styles.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-v2-serif",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-v2-sans",
});

export const metadata: Metadata = {
  title: "Kept - a commonplace book that remembers for you",
  description:
    "Kept links each note to the ones before it, and brings old ideas back when they become useful again.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${garamond.variable} ${figtree.variable} v2 min-h-[100dvh]`}>
      {children}
    </div>
  );
}
