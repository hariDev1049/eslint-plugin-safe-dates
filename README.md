# eslint-plugin-safe-dates

[![npm version](https://img.shields.io/npm/v/eslint-plugin-safe-dates)](https://www.npmjs.com/package/eslint-plugin-safe-dates)
[![license](https://img.shields.io/npm/l/eslint-plugin-safe-dates)](./LICENSE)

ESLint rules that catch timezone bugs in JavaScript date handling — before they reach production.

## Why

`new Date("2026-10-07")` is parsed as UTC. `new Date("2026-10-07T00:00")` is parsed as local time.
The same code produces different dates on machines in different timezones, and these bugs
usually surface only in production, for users far from where the code was written.

This plugin flags ambiguous date parsing at write time, in the editor and in CI.

## Installation

```sh
npm install --save-dev eslint eslint-plugin-safe-dates
```

## Usage

Requires ESLint 9+ with [flat config](https://eslint.org/docs/latest/use/configure/configuration-files).

Enable all recommended rules:

```js
// eslint.config.js
import safeDates from "eslint-plugin-safe-dates";

export default [
  // ...your other configs
  safeDates.configs.recommended,
];
```

Or configure rules individually:

```js
// eslint.config.js
import safeDates from "eslint-plugin-safe-dates";

export default [
  {
    plugins: { "safe-dates": safeDates },
    rules: {
      "safe-dates/no-date-string-constructor": "error",
    },
  },
];
```

## Rules

💼 = enabled in the `recommended` config.

| Rule | Description | 💼 |
| --- | --- | --- |
| [no-date-string-constructor](docs/rules/no-date-string-constructor.md) | Disallow parsing ambiguous date strings with `new Date()` and `Date.parse()` | 💼 |

## Requirements

- ESLint 9 or 10 (flat config)
- Node.js 20.19 or later

## License

[MIT](./LICENSE)