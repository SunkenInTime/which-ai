import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/sonnet-5.5/source/app/1/styles.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-v1" });

export const metadata: Metadata = {
  title: "Cairn - notes that find each other",
  description:
    "Cairn links every note you save to the ones that matter, then brings them back while you write.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${outfit.variable} v1`}>{children}</div>;
}
