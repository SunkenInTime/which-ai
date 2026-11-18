import { editions } from "./editions";
import { Landing, landingMetadata } from "./landing";

export const metadata = landingMetadata(editions[0]);
export const viewport = { viewportFit: "cover" as const, themeColor: editions[0].theme };

export default function Home() {
  return <Landing edition={editions[0]} />;
}
