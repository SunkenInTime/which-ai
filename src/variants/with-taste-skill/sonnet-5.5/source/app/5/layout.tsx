import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/sonnet-5.5/source/app/5/styles.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-v5" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-v5-mono" });

export const metadata: Metadata = {
  title: "Cairn - dump everything, it sorts itself out",
  description:
    "Notes, clips, photos and voice memos land in one pile, then link themselves together.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${grotesk.variable} ${mono.variable} v5`}>{children}</div>;
}
