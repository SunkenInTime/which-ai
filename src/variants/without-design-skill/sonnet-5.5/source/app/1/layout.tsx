import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--f-instrument",
});

export const metadata: Metadata = {
  title: "Engram — Think it once. Find it forever.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${instrument.variable} flex-1 overflow-x-clip bg-[color:#f3eee4] font-[family-name:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] text-[color:#1b1a17] selection:bg-[color:#f7dc6f]`}
    >
      {children}
    </div>
  );
}
