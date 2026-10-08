// Copies rendered motion videos and posters from public/motion to the R2 bucket the site serves them from.
//
//   node scripts/motion/upload.mjs [--dry-run]
//
// Needs rclone and an R2 API token scoped to the bucket. Credentials come from the environment or from
// ~/.motionbench/r2.env (KEY=value lines), never from the repo:
//   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
// Object keys mirror public/motion, so the site's base URL is the bucket's public URL.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { benchHome, root } from "./harness.mjs";

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

const required = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET"];
const missing = required.filter((key) => !env[key]);
if (missing.length) {
  console.error(`Missing ${missing.join(", ")}. Set them in the environment or ${envFile}.`);
  process.exit(1);
}

const source = path.join(root, "public/motion");
// Configure the remote through rclone's env vars so no rclone.conf is written anywhere.
const result = spawnSync(
  "rclone",
  [
    "copy",
    source,
    `r2:${env.R2_BUCKET}`,
    // The runner writes `<n>.mp4.<pid>.tmp.mp4` while publishing; those never belong in the bucket.
    "--exclude", "*.tmp.mp4",
    "--exclude", "*.tmp.jpg",
    "--include", "*.mp4",
    "--include", "*.jpg",
    // URLs carry a ?v= version per run, so objects can be cached hard.
    "--header-upload", "Cache-Control: public, max-age=31536000, immutable",
    "--s3-no-check-bucket",
    "--progress",
    ...(process.argv.includes("--dry-run") ? ["--dry-run"] : []),
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
