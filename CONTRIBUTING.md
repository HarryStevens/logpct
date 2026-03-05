# Contributing to logpct

Thanks for your interest in contributing! This document covers everything you need to get started.

## Getting started

1. Fork the repo and clone your fork.
2. Install dependencies:

```bash
npm install
```

## Development workflow

1. Create a branch off `main` for your change.
2. Make your changes.
3. Run formatting, linting, and tests before committing:

```bash
npm run format
npm run lint
npm test
```

4. Commit using a [conventional commit message](#commit-messages).
5. Open a pull request against `main`.

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/) and [semantic-release](https://github.com/semantic-release/semantic-release) to automate versioning and changelog generation. Your commit messages directly determine the next version number, so getting them right matters.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

| Type                                 | Purpose                                                 | Version bump  |
| ------------------------------------ | ------------------------------------------------------- | ------------- |
| `fix`                                | Bug fix                                                 | Patch (1.0.x) |
| `feat`                               | New feature                                             | Minor (1.x.0) |
| `feat!` or `BREAKING CHANGE:` footer | Breaking change                                         | Major (x.0.0) |
| `docs`                               | Documentation only                                      | No release    |
| `chore`                              | Maintenance, CI, tooling                                | No release    |
| `refactor`                           | Code change that neither fixes a bug nor adds a feature | No release    |
| `test`                               | Adding or updating tests                                | No release    |

### Examples

```
fix: handle edge case when percentage exceeds 100
```

```
feat: add support for custom bar characters
```

```
feat!: switch to ESM-only

BREAKING CHANGE: CommonJS require() is no longer supported. Use import instead.
```

```
docs: add timing output example to README
```

Only `fix` and `feat` types trigger a release. Use `feat!` or a `BREAKING CHANGE:` footer for major version bumps.

**Note:** If you use zsh, the `!` in `feat!:` will cause an "illegal modifier" error inside double quotes. Use single quotes for commit messages containing `!`:

```bash
git commit -m 'feat!: switch to ESM-only'
```

## Pull requests

- Keep PRs focused on a single change. If you're fixing a bug and adding a feature, make them separate PRs.
- Include a clear description of what your change does and why.
- Make sure CI passes (formatting, linting) before requesting review.
- If you're changing the public API, update the README.

## Project structure

```
logpct/
├── index.js      # Main module — exports the logpct function
└── test/
    └── index.js  # Test script exercising the API
```

## Code style

- Code is formatted with [Prettier](https://prettier.io/) and linted with [ESLint](https://eslint.org/).
- Run `npm run format` to auto-format. Run `npm run lint` to check for errors.
- The project uses ESM (`import`/`export`). No CommonJS.

## Testing

Tests are standalone scripts in `test/` that you run directly with Node:

```bash
npm test
```

## Rotating the npm token

The CI release workflow requires an `NPM_TOKEN` secret to publish to npm. Granular access tokens with write permissions expire every 90 days, so you'll need to regenerate periodically.

1. Log in to [npmjs.com](https://www.npmjs.com) and go to **Avatar > Access Tokens** (or visit `https://www.npmjs.com/settings/<your-username>/tokens`).
2. Delete the old logpct token if it exists.
3. Click **Generate New Token > Granular Access Token**.
4. Fill it out:
   - **Token name:** `logpct`
   - **Expiration:** 90 days
   - **Packages and scopes:** **Read and write**, scoped to **Only select packages and scopes**, then select `logpct`
   - **Organizations:** No access
   - **Bypass two-factor authentication (2FA):** **Check this box.** Without it, CI publishing will fail with an `EOTP` error because there is no way to provide an OTP in a non-interactive environment.
5. Click **Generate token** and copy the value.
6. Go to `https://github.com/HarryStevens/logpct/settings/secrets/actions`.
7. Update the `NPM_TOKEN` secret with the new value.

## Code of conduct

Be kind, be respectful, be constructive. We're all here to build useful software. Harassment, discrimination, or hostile behavior of any kind will not be tolerated.

## Questions?

Open an issue on [GitHub](https://github.com/HarryStevens/logpct/issues) if anything is unclear.
