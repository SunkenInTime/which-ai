import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import s from "./page.module.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Engram: Notes sink. Engram digs them up.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${archivo.variable} ${s.root}`}>{children}</div>;
}
