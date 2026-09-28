import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--f-bricolage",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--f-space-mono",
});

export const metadata: Metadata = {
  title: "Engram — Your brain has too many tabs open",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${bricolage.variable} ${spaceMono.variable} flex-1 overflow-x-clip bg-[color:#fff6dc] font-[family-name:var(--f-bricolage),var(--font-geist-sans),sans-serif] text-black selection:bg-black selection:text-[color:#ffd23f]`}
    >
      {children}
    </div>
  );
}
