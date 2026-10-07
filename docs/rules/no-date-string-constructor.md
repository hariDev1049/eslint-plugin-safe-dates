# no-date-string-constructor

Disallow parsing ambiguous date strings with `new Date()` and `Date.parse()`.

💼 Enabled in the `recommended` config.

## Why

JavaScript parses date strings differently depending on their format:

- **Date-only** strings (`"2026-10-07"`) are parsed as **UTC**.
- **Date-time** strings without an offset (`"2026-10-07T00:00"`) are parsed as **local time**.
- **Non-ISO** formats (`"Oct 7, 2026"`) are implementation-defined and may differ between JavaScript engines.

The result depends on the timezone of the machine running the code. A user in India
selects midnight on October 7. `new Date("2026-10-07T00:00").toISOString()` sends
`2026-10-06T18:30:00.000Z` to the server, and a colleague in Finland sees the
deadline on **October 6**.

## Rule details

This rule flags string and template literal arguments to `new Date()` and `Date.parse()`
unless they are ISO 8601 date-time strings with an explicit UTC offset (`Z` or `±hh:mm`).

### ❌ Incorrect

```js
new Date("2026-10-07");
new Date("2026-10-07T10:00");
new Date("Oct 7, 2026 10:00");
new Date("2026-10-07T10:00:00+0530");
new Date(`${year}-${month}-${day}`);
Date.parse("2026-10-07");
```

### ✅ Correct

```js
new Date("2026-10-07T10:00:00Z");
new Date("2026-10-07T10:00:00.000Z");
new Date("2026-10-07T10:00:00+05:30");
new Date(`${date}T00:00:00Z`);
new Date(2026, 9, 7);
new Date(Date.UTC(2026, 9, 7));
new Date(timestamp);
Date.now();
```

## Limitations

This rule only inspects literal values in the source code:

- Variables are not checked: `new Date(input)` is not reported, even if `input` is an ambiguous string.
- For template literals with expressions, only the static ending is checked.
  `` `${value}T00:00:00Z` `` is allowed regardless of what `value` contains.

## When not to use it

If every date in your application is parsed by a dedicated library with an
explicit timezone (for example `date-fns-tz` or `Temporal`), this rule adds little value.

## Options

This rule has no options.