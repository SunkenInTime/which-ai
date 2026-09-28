import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "@/generated/scoped-variant-css/with-taste-skill/sonnet-5.5/source/app/3/styles.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-v3" });

export const metadata: Metadata = {
  title: "Cairn - notes that read back to you",
  description:
    "Cairn turns scattered notes into linked pages and surfaces the right ones when you start writing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${bricolage.variable} v3`}>{children}</div>;
}
