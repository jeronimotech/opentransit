---
title: Documentation
description: What opentransit is, how it is built and how to run it for your city.
---

**opentransit** is an open-source, multi-city, multimodal trip planner. It takes the data a city already publishes (GTFS, GTFS-Realtime, GBFS, OpenStreetMap) and delivers a web app, a mobile app and an admin panel, with no API keys and no proprietary services.

## Where to start

- [Getting started](/opentransit/en/docs/getting-started/): run the full stack locally in about 10 minutes.
- [Architecture](/opentransit/en/docs/architecture/): what each repository does and how data flows.
- [Adding a city](/opentransit/en/docs/adding-a-city/): one YAML file and a GTFS feed.
- [API reference](/opentransit/en/docs/api/): the contract the web and mobile apps consume.

## The three repositories

| Repository | What | Stack |
|---|---|---|
| [opentransit-api](https://github.com/jeronimotech/opentransit-api) | Multi-tenant backend: city registry, GTFS ingest, live GTFS-RT, bike-share (GBFS), routing via OpenTripPlanner, runtime-editable config | Python 3.12 · FastAPI · PostgreSQL/PostGIS · OpenTripPlanner 2.9 |
| [opentransit-web](https://github.com/jeronimotech/opentransit-web) | Web app (PWA) + admin panel + per-city landing | Next.js 15 · React 19 · TypeScript · Tailwind · MapLibre GL |
| [opentransit-mobile](https://github.com/jeronimotech/opentransit-mobile) | iOS/Android app | Flutter 3.41 · maplibre_gl · Riverpod · go_router |

All MIT licensed. First city running on live data: **Bogotá** (TransMilenio, SITP, TransMiCable and the public bike system).
