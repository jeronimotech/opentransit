---
title: Getting started
description: Run the API, the router, the web app and the mobile app on your machine.
---

Everything runs locally on real data. Bogotá is the first configured city; the same flow works for any city with GTFS (see [Adding a city](/opentransit/en/docs/adding-a-city/)).

## Requirements

- Docker (PostgreSQL/PostGIS).
- Python ≥ 3.12 and a JDK ≥ 21 (OpenTripPlanner runs natively; Docker Desktop's VM is usually too small to build a big-city graph).
- Node ≥ 20 with `pnpm` for the web app; Flutter ≥ 3.41 for mobile.
- About 500 MB of downloads the first time (GTFS + OpenStreetMap extract).

## 1. Backend and router

```bash
git clone https://github.com/jeronimotech/opentransit-api && cd opentransit-api
make venv                    # virtualenv with dependencies
make up                      # Postgres/PostGIS on localhost:5435
make graph CITY=bogota       # download GTFS + OSM, clip to the bbox, build the graph (~2 min)
make otp                     # serve OpenTripPlanner on http://localhost:8080
cp .env.example .env         # set ADMIN_TOKEN (any long random string)
make dev                     # API on http://localhost:8001; first start ingests the GTFS (~1 min)
```

Check it answers:

```bash
curl localhost:8001/healthz
curl "localhost:8001/v1/cities/bogota/plan?fromLat=4.7546&fromLon=-74.0459&toLat=4.5978&toLon=-74.1616" | jq '.itineraries[0]'
open http://localhost:8001/docs      # interactive OpenAPI
```

## 2. Web

```bash
git clone https://github.com/jeronimotech/opentransit-web && cd opentransit-web
pnpm install && cp .env.example .env.local
pnpm dev                     # against the local API (NEXT_PUBLIC_API_URL=http://localhost:8001)
pnpm dev:mock                # no backend, sample data
```

The app is at `http://localhost:3000/bogota`; the operator panel at `/admin`.

## 3. Mobile

```bash
git clone https://github.com/jeronimotech/opentransit-mobile && cd opentransit-mobile
flutter pub get && flutter gen-l10n
flutter run --dart-define=API_URL=http://localhost:8001      # iOS simulator
flutter run --dart-define=API_URL=http://10.0.2.2:8001       # Android emulator
flutter run --dart-define=MOCK=true                          # no backend
```

## Default ports

| Service | Port |
|---|---|
| API | 8001 |
| OpenTripPlanner | 8080 |
| PostgreSQL | 5435 |
| Web | 3000 |

## Next

- Change fares, links or maintenance mode from the [admin panel](/opentransit/en/docs/admin-panel/) without redeploying.
- Read the [data quality notes](/opentransit/en/docs/data-quality/) before trusting timetables, fares or accessibility.
