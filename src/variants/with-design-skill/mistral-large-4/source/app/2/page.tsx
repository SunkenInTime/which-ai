import type { Metadata } from "next";
import Terminal from "./Terminal";

export const metadata: Metadata = {
  title: "Mnemos — Terminal",
};

export default function Page() {
  return <Terminal />;
}
