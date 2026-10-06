import type { Metadata } from "next";
import Garden from "./Garden";

export const metadata: Metadata = {
  title: "Mnemos — Garden",
};

export default function Page() {
  return <Garden />;
}
