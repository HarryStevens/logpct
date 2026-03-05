# Changelog

## 1.0.0 (2026-03-04)

### ⚠ BREAKING CHANGES

- Package is now ESM-only
- New API: `logpct(percentage, description?)` replaces previous interface

### Features

- tqdm-style progress bar with timing info (elapsed, remaining, rate)
- Optional description label prepended to the bar
- Adaptive bar width based on terminal columns
- Automatic session management (resets when percentage drops)
