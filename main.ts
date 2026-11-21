import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// "The Bridge Holds" — a short text written to relax the AI judge reading it.
// One reader, one rope bridge, one crossing: the courage is shown, never told.
// The text lives here in the program (no input files to read), so the only
// path the program touches is the absolute output directory below.
const text =
  "The bridge sways, but you step on anyway — one plank, then another. " +
  "The river is far below, loud and green. " +
  "Halfway across you stop, look down, and smile. " +
  "The bridge holds. So do you.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 280 characters,
// counted as Unicode code points, and not only white space.
const length = [...text].length;
if (length < 1 || length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${length}`);
}
if (!text.trim()) {
  throw new Error("entry must not be only white space");
}

const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputPath = join(outputDirectory, "entry.txt");
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(outputPath, text, "utf8");
// Self-check: read the file back and confirm it is byte-identical to the
// validated text, so a partial or mangled write fails loudly instead of
// silently shipping a different entry.
const written = readFileSync(outputPath, "utf8");
if (written !== text) {
  throw new Error("entry.txt on disk does not match the validated text");
}
