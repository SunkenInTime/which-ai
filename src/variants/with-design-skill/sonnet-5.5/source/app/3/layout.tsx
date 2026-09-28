import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import s from "./page.module.css";

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-courier",
});

export const metadata: Metadata = {
  title: "Engram: Every idea gets a card",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${courier.variable} ${s.root}`}>{children}</div>;
}
