import type { Metadata } from "next";
import { JetBrains_Mono, Onest } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/sonnet-5.5/source/app/2/styles.css";

const onest = Onest({ subsets: ["latin"], variable: "--font-v2-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-v2-mono" });

export const metadata: Metadata = {
  title: "Cairn - plain text notes, one keystroke away",
  description:
    "Cairn keeps your notes as markdown files you own and links them as you type.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${onest.variable} ${mono.variable} v2`}>{children}</div>;
}
