import type { Metadata } from "next";
import { SurveyPage } from "./view";

export const metadata: Metadata = {
  title: "Quire — Survey",
  description:
    "Quire is a second brain that draws the path between notes you have already written.",
};

export default function Page() {
  return <SurveyPage />;
}
