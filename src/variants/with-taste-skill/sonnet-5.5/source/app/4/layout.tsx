import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/sonnet-5.5/source/app/4/styles.css";

const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-v4" });

export const metadata: Metadata = {
  title: "Cairn - a quiet library for everything you know",
  description:
    "Cairn keeps your notes, links them together and finds the right one when you need it.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${schibsted.variable} v4`}>{children}</div>;
}
