import type { Metadata } from "next";
import { DrawerPage } from "./view";

export const metadata: Metadata = {
  title: "Quire — Drawer",
  description:
    "Quire is a second brain filed like a card catalog, one cluster of notes to a card.",
};

export default function Page() {
  return <DrawerPage />;
}
