import type { Metadata } from "next";
import "@/generated/scoped-variant-css/with-taste-skill/opus-5.5/source/app/1/styles.css";

export const metadata: Metadata = {
  title: "Kept - notes that come back when they matter",
  description:
    "Kept links everything you capture and brings old notes back the moment they matter to what you're writing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
