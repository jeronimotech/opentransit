---
title: Admin panel
description: Change fares, config, links, services, mobility and the landing of a city without redeploying.
---

The panel lives in the web app at `/admin` (not linked from public navigation). Every change is validated by the API, stored in PostgreSQL with a history and applied in memory at once: the next `/plan` already uses the new fare and `GET /v1/cities/{city}` serves it with `Cache-Control: max-age=60`.

## Access

Set `ADMIN_TOKEN` in the API's `.env`. The panel asks for it, validates it with `GET /v1/admin/me` and keeps it in `sessionStorage` only (forgotten when the tab closes). Serve the panel **over HTTPS only**, rotate the token when someone leaves, and disable it on public deployments that do not need it with `NEXT_PUBLIC_ADMIN_ENABLED=0`.

## Tabs

| Tab | Edits | Notes |
|---|---|---|
| Fares | currency, base fare, transfer cost, transfer window, max transfers, note | Live preview using the same rule as the app. Always published as "estimated". |
| Config | refresh cadences, feature flags, minimum app version, maintenance | Maintenance asks for confirmation; the mobile app shows a blocking screen. |
| Links | complaints, top-up, support, privacy | `https` only. |
| Services | service tiles on the home hub | Add, remove, reorder. |
| Brand | primary colour | |
| Mobility | bike/scooter networks (`mobility.bikeShare[]`) | "Test feed" shows what the API reads from the GBFS. |
| Landing | hero, apps, highlights, screenshots, stats, partners, open data, FAQ, contact, footer, SEO | Preview the draft before saving. |
| History | revision, date, author, note and changed keys | |

Each section marks which fields are **overridden** versus the YAML and offers "Reset to YAML"; "Reset all" clears the whole override.

## API semantics

- `GET /v1/admin/cities/{city}/config` → effective config, current override, YAML values, revision.
- `PUT …/config` with a partial body → deep merge (dicts merge, lists replace, `null` removes a key so the YAML applies again). Validation runs on the effective result before saving.
- `DELETE …/config` → reset; `GET …/config/history` → revisions.

Validation rules (excerpt): 3-letter currency, amounts ≥ 0, window 0–600 min, transfers 0–5, cadences 5–120 s, semver `minAppVersion`, `https` links, unique ids. Full details in `docs/API.md` of the API repo.
