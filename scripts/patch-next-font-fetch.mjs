import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const googleDir = new URL(
  "../node_modules/next/dist/compiled/@next/font/dist/google/",
  import.meta.url,
);

async function patch(file, original, replacement, { patched, unchanged, changed }) {
  const target = fileURLToPath(new URL(file, googleDir));
  const source = await readFile(target, "utf8");

  if (source.includes(replacement)) {
    console.log(unchanged);
  } else if (source.includes(original)) {
    await writeFile(target, source.replace(original, replacement), "utf8");
    console.log(patched);
  } else {
    throw new Error(changed);
  }
}

await patch(
  "fetch-resource.js",
  `                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
                    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/104.0.0.0 Safari/537.36',`,
  `                'User-Agent': 'Mozilla/5.0',`,
  {
    patched: "Patched Next font fetch to avoid stale Google Fonts WOFF2 URLs",
    unchanged: "Next font fetch already uses the stable compatibility response",
    changed: "Next's Google Fonts fetcher changed; review the compatibility patch before building",
  },
);

// The gallery pulls hundreds of font files in one build. Next's stock retry gives up after
// about 0.7s (3 tries from 100ms), so one brief Google Fonts hiccup fails the deploy.
// Six tries from 1s back off for about a minute before giving up.
await patch(
  "retry.js",
  `        retries,
        onRetry(e, attempt) {
            console.error(e.message + \`\\n\\nRetrying \${attempt}/\${retries}...\`);
        },
        minTimeout: 100,`,
  `        retries: 6,
        onRetry(e, attempt) {
            console.error(e.message + \`\\n\\nRetrying \${attempt}/6...\`);
        },
        minTimeout: 1000,`,
  {
    patched: "Patched Next font fetch to retry Google Fonts with longer backoff",
    unchanged: "Next font fetch already retries with longer backoff",
    changed: "Next's Google Fonts retry changed; review the backoff patch before building",
  },
);
