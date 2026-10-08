import fs from "node:fs";
import path from "node:path";

/** Server-only: reads the exact prompt the runner sends, so the page can never drift from it. */
export function readMotionPrompt(groupId: string): string | null {
  const file = path.join(process.cwd(), "docs/benchmarks/motion", `${groupId}.prompt.txt`);
  if (!fs.existsSync(file)) return null;
  const prompt = fs.readFileSync(file, "utf8").trim();
  return prompt.includes("PLACEHOLDER") ? null : prompt;
}

/** The creative brief: the prompt up to where it starts describing how the page becomes a video. */
export function summarizeMotionPrompt(prompt: string): string {
  const cut = prompt.search(/^how the videos? gets? made/im);
  return cut > 0 ? prompt.slice(0, cut).trim() : prompt;
}
