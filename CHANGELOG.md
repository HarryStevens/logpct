## 1.0.0 (2026-03-05)

### ⚠ BREAKING CHANGES

* The module is now ESM-only and the API has changed to logpct(percentage, description?), producing a tqdm-style progress bar with timing info. CommonJS require() is no longer supported.

### Features

* rewrite as ESM with tqdm-style progress bar ([0b79915](https://github.com/HarryStevens/logpct/commit/0b79915d1a3d287a0e33c32add6c6ff650186f88))

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
