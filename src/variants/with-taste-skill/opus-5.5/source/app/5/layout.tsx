import type { Metadata } from "next";
import { Onest } from "next/font/google";
import { MotionProvider } from "./_components/motion-provider";
import "@/generated/scoped-variant-css/with-taste-skill/opus-5.5/source/app/5/styles.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "Kept - a quiet place for ideas to grow",
  description:
    "Kept holds everything you capture, links it together, and brings old notes back when they matter again.",
};

export default function GroveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${onest.variable} v5 min-h-[100dvh] bg-(--bg) font-(family-name:--font-onest) text-(--ink) antialiased`}
    >
      <MotionProvider>{children}</MotionProvider>
    </div>
  );
}
