---
title: Contributing
description: How to propose changes to the code, the data and the documentation.
---

## Where things go

| I want to… | Repository |
|---|---|
| Fix or propose something in the API, ingest or routing | [opentransit-api](https://github.com/jeronimotech/opentransit-api) |
| Change the web app, the admin panel or the per-city landing | [opentransit-web](https://github.com/jeronimotech/opentransit-web) |
| Change the mobile app | [opentransit-mobile](https://github.com/jeronimotech/opentransit-mobile) |
| Add a city | "New city" issue in [opentransit](https://github.com/jeronimotech/opentransit/issues/new/choose), then a PR to the API |
| Improve this documentation | [opentransit](https://github.com/jeronimotech/opentransit) |

## Workflow

1. Open an issue or a Discussions thread for large changes; go straight to a PR for small fixes.
2. Branch from `main`, small focused changes, with tests.
3. Each repo's CI must pass: `ruff` + `pytest` (API); `lint`, `typecheck`, `test`, `build` (web); `flutter analyze` + `flutter test` + Android/iOS builds (mobile).
4. A maintainer reviews within a week.

## Style per repository

- **API**: Python 3.12, typed, `ruff`, tests without network or database (fixtures). Nothing city-specific outside `cities/`.
- **Web**: strict TypeScript, small components, all copy in `src/lib/i18n/dict.ts` (es + en). Contract types are read-only.
- **Mobile**: `flutter_lints`, hand-written `fromJson` models, strings in ARB (es source + en), widget tests for new screens.
- **Common rule**: no provider, agency or city hardcoded. Everything comes from the city configuration.

## License of contributions

By contributing you agree your work is released under MIT (code) and CC BY 4.0 (documentation). No CLA or DCO. The [code of conduct](https://github.com/jeronimotech/opentransit/blob/main/CODE_OF_CONDUCT.md) applies.
