import type { Metadata } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--f-sora",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--f-jetbrains",
});

export const metadata: Metadata = {
  title: "Engram — Your notes, wired like a brain",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${sora.variable} ${jetbrains.variable} flex-1 bg-[color:#05060a] font-[family-name:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] text-[#e8eaf2] selection:bg-[color:#5ef0ff]/30`}
    >
      {children}
    </div>
  );
}
