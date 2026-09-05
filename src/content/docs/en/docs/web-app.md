---
title: Web app
description: Routes, mock mode, environment variables and design rules of opentransit-web.
---

## Screens

| Route | Screen |
|---|---|
| `/` | City picker (redirects when the API serves one city) |
| `/{city}` | Map-first home: full-bleed map, search pill, layers, sheet with three actions (Plan a trip · Locate my bus · Find a route) and "Near you" |
| `/{city}?view=plan` | Planner: origin/destination autocomplete, time, modes, accessibility, bike-to-station, shared bikes; sorting; estimated fare; detail with legs, directions, follow-along |
| `/{city}/next` | Locate my bus: station → route → next buses (live / scheduled / estimated) |
| `/{city}/stops/{id}` | Arrival board, accessibility, routes, QR, complaints link |
| `/{city}/routes`, `/{city}/routes/{id}` | Route finder and detail with service hours |
| `/{city}/live` | Whole fleet in real time (SSE deltas, interpolation) |
| `/{city}/favorites`, `/{city}/alerts`, `/about` | Local favorites, alerts, about |
| `/{city}/landing` | The city's public landing page, generated from its config |
| `/admin` | Operator panel |

Planner state lives in the URL, so every plan is a shareable link. Spanish by default, English with one click. Light/dark theme. PWA.

## Environment variables

| Variable | Default | Use |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8001` | API base URL |
| `NEXT_PUBLIC_MOCK` | `0` | `1` serves fixtures without a backend |
| `NEXT_PUBLIC_ADMIN_ENABLED` | `1` | `0` removes `/admin` from the deployment |
| `NEXT_PUBLIC_DEFAULT_CITY` + `NEXT_PUBLIC_ROOT_LANDING=1` | — | Single-city deployment: `/` serves its landing and the app lives at `/{city}` |

They are inlined at build time; the Docker image bakes them in with `--build-arg`.

## Commands

```bash
pnpm dev · pnpm dev:mock · pnpm lint · pnpm typecheck · pnpm test · pnpm build
pnpm screenshots            # docs/screenshots from mock mode
```

## Map

MapLibre GL JS with OpenFreeMap vector tiles (no key). The MapLibre worker is copied into `public/vendor/` on install because bundlers break its `import.meta.url` loading.

## Design rules

Summary of the usability audit behind version 1.1.1: the map keeps ≥ 65 % of a phone screen; the sheet peeks at 24 % and can be dragged to 55 % or 92 %; the live fleet is not drawn below zoom 14; route chips blend the feed colour toward the component colour with guaranteed contrast; headsigns are cleaned to `A → B`; 44 px touch targets; `prefers-reduced-motion` respected.
