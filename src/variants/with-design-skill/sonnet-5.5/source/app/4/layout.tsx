import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import s from "./page.module.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Engram: Highlight it once. Find it forever.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${bricolage.variable} ${s.root}`}>{children}</div>;
}
