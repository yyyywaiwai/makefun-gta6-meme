// Entry program for make.fun bounty "gta6-meme-x-01".
// The whole job: copy this repository's POST.json into the output
// directory, byte for byte, so the house can read the X post we entered.
// No network, no clock, no files outside the repository are touched.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// POST.json lives in the repository root, right next to this file. Prefer
// that neighbour path; fall back to MAKEFUN_BOT_DIR when the harness lays
// the repository out differently.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoDir = process.env.MAKEFUN_BOT_DIR ?? scriptDir;
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(repoDir, "POST.json");
const target = join(outputDir, "POST.json");

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

// The grader runs this twice and both runs must write the same bytes, so
// verify the copy landed whole before exiting quietly.
if (statSync(source).size !== statSync(target).size) {
  throw new Error("POST.json copy is incomplete");
}
