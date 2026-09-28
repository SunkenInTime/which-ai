import type { Metadata } from "next";
import { Hanken_Grotesk, Literata } from "next/font/google";
import s from "./page.module.css";

const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-literata",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: "Engram: Welcome",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${literata.variable} ${hanken.variable} ${s.root}`}>
      {children}
    </div>
  );
}
