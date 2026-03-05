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
 * terminal width and includes elapsed time, ETA, and optionally real item
 * counts and throughput.
 *
 * ```
 * Downloading:  75%|████████████    | 375/500 [00:33<00:10, 11.36it/s]
 * ```
 *
 * Session timing resets automatically when `pct` drops below the previous
 * value (i.e., a new task started) or when `pct` reaches 100.
 *
 * @param {number} pct   Progress percentage, 0–100.
 * @param {number|string} [totalOrDescription]  Total item count (number) or
 *   label (string). When a number is given, real counts and it/s are shown.
 * @param {string} [description]  Optional label prepended to the bar (used
 *   when `totalOrDescription` is a number).
 *
 * @example
 * logpct(75);                        // bar + elapsed/ETA only
 * logpct(75, "Downloading");         // bar + label
 * logpct(75, 500);                   // bar + 375/500 + it/s
 * logpct(75, 500, "Downloading");    // bar + label + 375/500 + it/s
 */
export default function logpct(pct, totalOrDescription, description) {
  let total = null;
  if (typeof totalOrDescription === "number") {
    total = totalOrDescription;
  } else if (typeof totalOrDescription === "string") {
    description = totalOrDescription;
  }

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
  const remaining = pct > 0 ? (elapsed * (100 - pct)) / pct : 0;

  const current = total !== null ? Math.round((pct / 100) * total) : null;
  const rate = current !== null && elapsed > 0 ? current / elapsed : null;
  const fraction = current !== null ? `${current}/${total} ` : "";
  const speed = rate !== null ? `, ${rate.toFixed(2)}it/s` : "";
  const timing = `${fraction}[${formatTime(elapsed)}<${formatTime(remaining)}${speed}]`;

  const prefix = description ? `${description}: ` : "";
  const pctStr = `${String(Math.floor(pct)).padStart(3)}%`;

  const shell = `${prefix}${pctStr}|| ${timing}`;
  const cols = process.stdout.columns || 80;
  const barWidth = Math.max(10, cols - shell.length);

  const filled = Math.round((pct / 100) * barWidth);
  const bar = "\u2588".repeat(filled) + " ".repeat(barWidth - filled);

  process.stdout.write(`\r${prefix}${pctStr}|${bar}| ${timing}`);

  if (pct >= 100) {
    process.stdout.write("\n");
    startTime = null;
    lastPct = -1;
  }
}
