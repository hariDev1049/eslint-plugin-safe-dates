# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-10-07

### Added

- `no-date-string-constructor` rule: disallows ambiguous date strings in `new Date()`
  and `Date.parse()`, allowing ISO 8601 strings with an explicit UTC offset.
- `recommended` config.