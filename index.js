let startTime = null;
let lastPct = -1;

/** @param {number} seconds @returns {string} "MM:SS" */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

/**
 * Renders a tqdm-style progress bar to stdout. The bar auto-sizes to the
 * terminal width and includes elapsed time, ETA, and rate.
 *
 * ```
 * Downloading: 76%|████████████████████████        | 76/100 [00:33<00:10, 2.30%/s]
 * ```
 *
 * Session timing resets automatically when `pct` drops below the previous
 * value (i.e., a new task started) or when `pct` reaches 100.
 *
 * @param {number} pct   Progress percentage, 0–100.
 * @param {string} [description]  Optional label prepended to the bar.
 *
 * @example
 * for (let i = 0; i <= 100; i++) {
 *   logpct(i, "Processing");
 * }
 */
export default function logpct(pct, description) {
  pct = Math.max(0, Math.min(100, pct));

  if (pct < lastPct) {
    startTime = null;
    lastPct = -1;
  }

  if (startTime === null) {
    startTime = Date.now();
  }

  lastPct = pct;

  const elapsed = (Date.now() - startTime) / 1000;
  const rate = elapsed > 0 ? pct / elapsed : 0;
  const remaining = pct > 0 ? (elapsed * (100 - pct)) / pct : 0;

  const prefix = description ? `${description}: ` : "";
  const pctStr = `${String(Math.floor(pct)).padStart(3)}%`;
  const fraction = `${Math.floor(pct)}/100`;
  const timing = `[${formatTime(elapsed)}<${formatTime(remaining)}, ${rate.toFixed(2)}%/s]`;

  // Build the line without the bar to measure how many columns remain for it.
  const shell = `${prefix}${pctStr}|| ${fraction} ${timing}`;
  const cols = process.stdout.columns || 80;
  const barWidth = Math.max(10, cols - shell.length);

  const filled = Math.round((pct / 100) * barWidth);
  const bar = "\u2588".repeat(filled) + " ".repeat(barWidth - filled);

  process.stdout.write(`\r${prefix}${pctStr}|${bar}| ${fraction} ${timing}`);

  if (pct >= 100) {
    process.stdout.write("\n");
    startTime = null;
    lastPct = -1;
  }
}
