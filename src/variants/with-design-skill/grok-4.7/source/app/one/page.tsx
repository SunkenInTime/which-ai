import type { Metadata } from "next";
import { MarginPage } from "./view";

export const metadata: Metadata = {
  title: "Quire — Margin",
  description:
    "Quire keeps a second brain in the margin of the note you are writing.",
};

export default function Page() {
  return <MarginPage />;
}
