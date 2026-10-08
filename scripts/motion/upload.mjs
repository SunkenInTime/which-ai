// Copies rendered motion videos and posters from public/motion to the R2 bucket the site serves them from.
//
//   node scripts/motion/upload.mjs [--dry-run]
//
// With an R2 API token, it uses rclone. Credentials come from the environment or from ~/.motionbench/r2.env
// (KEY=value lines), never from the repo:
//   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
// Without one, it uploads each file through wrangler's own Cloudflare login (`wrangler login`).
// Object keys mirror public/motion, so the site's base URL is the bucket's public URL.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { benchHome, resolveBin, resolveLaunch, root } from "./harness.mjs";

const envFile = path.join(benchHome, "r2.env");
const fileEnv = fs.existsSync(envFile)
  ? Object.fromEntries(
      fs
        .readFileSync(envFile, "utf8")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#") && line.includes("="))
        .map((line) => [line.slice(0, line.indexOf("=")).trim(), line.slice(line.indexOf("=") + 1).trim()]),
    )
  : {};
const env = { ...fileEnv, ...process.env };

const source = path.join(root, "public/motion");
const dryRun = process.argv.includes("--dry-run");
// URLs carry a ?v= version per run, so objects can be cached hard.
const cacheControl = "public, max-age=31536000, immutable";

const required = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY"];
if (required.some((key) => !env[key])) uploadWithWrangler(env.R2_BUCKET ?? "whichai-motion");

function uploadWithWrangler(bucket) {
  // Launched without a shell so the Cache-Control value's spaces survive on Windows.
  const { command, prefix } = resolveLaunch(resolveBin("wrangler"));
  const files = fs
    .readdirSync(source, { recursive: true })
    .map(String)
    .filter((rel) => /\.(mp4|jpg)$/.test(rel));
  for (const rel of files) {
    const key = rel.split(path.sep).join("/");
    console.log(`${dryRun ? "would upload" : "upload"} ${key}`);
    if (dryRun) continue;
    const result = spawnSync(
      command,
      [
        ...prefix, "r2", "object", "put", `${bucket}/${key}`, "--file", path.join(source, rel), "--remote",
        "--content-type", key.endsWith(".mp4") ? "video/mp4" : "image/jpeg", "--cache-control", cacheControl,
      ],
      { stdio: ["ignore", "ignore", "inherit"], windowsHide: true },
    );
    if (result.status !== 0) {
      console.error(`Upload of ${key} failed. Is wrangler installed and logged in (\`wrangler login\`)?`);
      process.exit(1);
    }
  }
  process.exit(0);
}

if (!env.R2_BUCKET) {
  console.error(`Missing R2_BUCKET. Set it in the environment or ${envFile}.`);
  process.exit(1);
}
// Configure the remote through rclone's env vars so no rclone.conf is written anywhere.
const result = spawnSync(
  "rclone",
  [
    "copy",
    source,
    `r2:${env.R2_BUCKET}`,
    "--include", "*.mp4",
    "--include", "*.jpg",
    "--header-upload", `Cache-Control: ${cacheControl}`,
    "--s3-no-check-bucket",
    "--progress",
    ...(dryRun ? ["--dry-run"] : []),
  ],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      RCLONE_CONFIG_R2_TYPE: "s3",
      RCLONE_CONFIG_R2_PROVIDER: "Cloudflare",
      RCLONE_CONFIG_R2_ACCESS_KEY_ID: env.R2_ACCESS_KEY_ID,
      RCLONE_CONFIG_R2_SECRET_ACCESS_KEY: env.R2_SECRET_ACCESS_KEY,
      RCLONE_CONFIG_R2_ENDPOINT: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      RCLONE_CONFIG_R2_ACL: "private",
    },
  },
);
process.exit(result.status ?? 1);
