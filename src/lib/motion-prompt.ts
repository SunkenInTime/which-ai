import fs from "node:fs";
import path from "node:path";

/** Server-only: reads the exact prompt the runner sends, so the page can never drift from it. */
export function readMotionPrompt(groupId: string): string | null {
  const file = path.join(process.cwd(), "docs/benchmarks/motion", `${groupId}.prompt.txt`);
  if (!fs.existsSync(file)) return null;
  const prompt = fs.readFileSync(file, "utf8").trim();
  return prompt.includes("PLACEHOLDER") ? null : prompt;
}
