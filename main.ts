// Entry program for make.fun bounty "gta6-meme-x-01".
// The whole job: copy this repository's POST.json into the output
// directory, byte for byte, so the house can read the X post we entered.
// No network, no clock, no files outside the repository are touched.

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
copyFileSync(join(repoDir, "POST.json"), join(outputDir, "POST.json"));
