import type { Metadata } from "next";
import { NatureLanding } from "../landing-pages";

export const metadata: Metadata = { title: "Margin | Nature" };
export default function Page() { return <NatureLanding />; }
