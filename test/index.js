import assert from "node:assert";
import logpct from "../index.js";

// --- Visual smoke tests (existing) ---

const length = 1e5;

for (let i = 0; i < length; i++) {
  logpct(((i + 1) / length) * 100);
}

for (let i = 0; i < length; i++) {
  logpct(((i + 1) / length) * 100, "Processing");
}

// --- Edge-case assertion tests ---

assert.doesNotThrow(() => logpct(0), "pct = 0 should not throw");
assert.doesNotThrow(() => logpct(50), "pct = 50 should not throw");
assert.doesNotThrow(() => logpct(100), "pct = 100 should not throw");

assert.doesNotThrow(
  () => logpct(-10),
  "negative pct should be clamped, not throw",
);
assert.doesNotThrow(
  () => logpct(200),
  "pct > 100 should be clamped, not throw",
);

assert.doesNotThrow(
  () => logpct(50, "With description"),
  "description argument should not throw",
);
assert.doesNotThrow(
  () => logpct(0, "Restart"),
  "resetting to 0 with description should not throw",
);

console.log("\nAll assertions passed.");
