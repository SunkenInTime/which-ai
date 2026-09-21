import type { Metadata } from "next";
import { LampPage } from "./view";

export const metadata: Metadata = {
  title: "Quire — Lamp",
  description:
    "Quire is a second brain that keeps every note but the one you are reading in the dark.",
};

export default function Page() {
  return <LampPage />;
}
