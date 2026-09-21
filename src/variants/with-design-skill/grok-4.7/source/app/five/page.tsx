import type { Metadata } from "next";
import { WalkPage } from "./view";

export const metadata: Metadata = {
  title: "Quire — Walk",
  description:
    "Quire is a second brain you can walk through later, when two notes turn out to be the same kind of waiting.",
};

export default function Page() {
  return <WalkPage />;
}
