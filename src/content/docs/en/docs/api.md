---
title: API reference
description: The JSON contract consumed by the web and mobile apps.
---

Interactive docs (OpenAPI) are at `GET /docs` on any running instance. The full contract with JSON shapes and documented deviations lives in [`docs/API.md`](https://github.com/jeronimotech/opentransit-api/blob/main/docs/API.md) in the API repo. This page is the map.

## Conventions

camelCase JSON; ISO-8601 times with offset; metres and seconds; `{lat, lon}` coordinates; encoded polylines (1e-5). Stop, route and trip ids are opaque, feed-scoped strings (`bogota:1234`). Errors are always `{"error": {"code": "…", "message": "…"}}`.

## Platform

| Endpoint | Returns |
|---|---|
| `GET /healthz` | status and cities |
| `GET /v1/cities`, `GET /v1/cities/{city}` | effective city config: modes, components, fares, `config`, links, services, `mobility`, `features` |
| `GET /v1/cities/{city}/landing` | public landing content + live stats |
| `GET /v1/cities/{city}/health` | static, realtime (age, `stale`), router, rental networks |

## Planning and search

| Endpoint | Notes |
|---|---|
| `GET …/plan?fromLat&fromLon&toLat&toLon&time&arriveBy&modes&wheelchair&numItineraries&locale` | modes `WALK,BUS,RAIL,SUBWAY,TRAM,CABLE_CAR,BICYCLE,TRANSIT,BIKE_RENTAL,SCOOTER_RENTAL`; itineraries with legs, geometry, realtime state, alerts, estimated fare, `rental` on rental legs |
| `GET …/geocode?q&lat&lon`, `GET …/reverse?lat&lon` | GTFS stops (nearby first) + Photon |

## Stops and routes

| Endpoint | Notes |
|---|---|
| `GET …/stops/nearby?lat&lon&radius&include=stops,rental` | stops and rental stations with distance |
| `GET …/stops/{id}`, `…/departures` | detail, departures |
| `GET …/stops/{id}/board` | board grouped by route with freshness |
| `GET …/stops/{id}/routes/{routeId}/next` | "Locate my bus": next buses, live / estimated / scheduled |
| `GET …/routes`, `…/routes/{id}` | routes with service window, patterns |
| `GET …/network` | network shapes, deduped server-side |
| `GET …/pois?bbox&type` | services layer (GeoJSON) |

## Realtime and rental

| Endpoint | Notes |
|---|---|
| `GET …/vehicles?bbox&routeId`, `GET …/vehicles/stream?bbox&routeIds` (SSE), `GET …/vehicles/{id}` | fleet, compressed deltas, detail with trail |
| `GET …/alerts?routeId&stopId` | alerts with severity always present |
| `GET …/rental/networks`, `…/rental/stations?bbox`, `…/rental/stations/{id}` | GBFS networks, stations with availability |

## Admin (`X-Admin-Token`)

| Endpoint | Notes |
|---|---|
| `GET /v1/admin/me` | validates the token |
| `GET/PUT/DELETE /v1/admin/cities/{city}/config`, `GET …/config/history` | runtime-editable config: `fares`, `config`, `links`, `services`, `branding`, `mobility`, `landing` |
| `POST …/admin/cities/{city}/ingest-static`, `…/purge` | operations |
