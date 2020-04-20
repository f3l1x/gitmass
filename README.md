# Gitmass

This is collection of script for managing multiple Github repositories at once.

## Setup

1. Clone this repository `git clone https://github.com/f3l1x/gitmass.git`.
2. Install NPM dependencies `npm install`.
3. Setup ENV variable `GITHUB_TOKEN_GITMASS` with [Github Token](https://github.com/settings/tokens).
   1. Good place is in `~/.bash_profile`.

## Usage

```
./mass scripts/filename
```

**mass** is a shortcut for `node -r esm -r ts-node/register/transpile-only scripts/filename`.
Because gitmass is written in TypeScript and uses ESM loader.
