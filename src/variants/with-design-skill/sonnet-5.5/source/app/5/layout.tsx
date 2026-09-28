import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import s from "./page.module.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
});

export const metadata: Metadata = {
  title: "Engram: A map of everything you know",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${spectral.variable} ${s.root}`}>{children}</div>;
}
