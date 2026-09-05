---
title: Architecture
description: Three repositories, one router per city, open data as the only input.
---

## Principles

- **A city is a tenant.** The whole API lives under `/v1/cities/{city}/…`. Each city's configuration is a YAML file (`cities/<slug>.yaml`); nothing in the code knows about Bogotá.
- **OpenTripPlanner routes; the API normalizes.** OTP 2 builds the graph from GTFS + OpenStreetMap and applies GTFS-Realtime and GBFS at runtime. The API never exposes raw OTP: it translates GraphQL responses into the JSON contract the apps consume.
- **One poll serves everyone.** The API fetches each realtime feed once (about every 15 s) and fans it out to all clients over SSE with compressed deltas.
- **PostGIS holds the light part of the feed.** Routes, stops (geography), simplified shapes and service windows; `stop_times.txt` is streamed and never stored.
- **No keys.** OpenFreeMap basemap, geocoding with Photon plus the GTFS stops.

## Diagram

```mermaid
flowchart LR
  subgraph data["Open data (per city)"]
    GTFS[GTFS static]
    RT[GTFS-Realtime<br/>positions · trip updates · alerts]
    GBFS[GBFS<br/>bikes / scooters]
    OSM[OpenStreetMap]
  end
  subgraph otp["OpenTripPlanner 2 (one per city)"]
    GRAPH[graph]
    UPD[RT + GBFS updaters]
  end
  subgraph api["opentransit-api"]
    REG[city registry<br/>cities/*.yaml + overrides]
    POLL[GTFS-RT / GBFS poller]
    NORM[normalizer]
    PG[(PostGIS)]
  end
  WEB[opentransit-web<br/>app · admin · landing]
  MOB[opentransit-mobile]
  GTFS --> GRAPH
  OSM --> GRAPH
  RT --> UPD
  GBFS --> UPD
  RT --> POLL
  GBFS --> POLL
  GTFS --> PG
  GRAPH -->|GraphQL| NORM
  PG --> NORM
  POLL --> NORM
  REG --> NORM
  NORM -->|/v1/cities/{city}/…| WEB & MOB
```

## Components

**opentransit-api** — FastAPI. City registry and effective configuration (YAML + overrides persisted in Postgres, editable from the admin), static GTFS ingest, GTFS-RT poller with an in-memory frame and deltas, GBFS client, OTP GraphQL client, normalizer, geocoder, network shape dedupe, admin endpoints. One process can serve several cities; each points at its own OTP instance.

**opentransit-web** — Next.js (App Router). Map-first home, planner, "Ubica tu bus", arrival board, live vehicles, routes, alerts, favorites, shared bikes, `/admin` panel and per-city landing. Full mock mode for development and screenshots.

**opentransit-mobile** — Flutter. Same features as the web, plus App Links / Universal Links, a follow-along mode with a local notification, and forced-update and maintenance screens driven by remote config.

## Design rules

The apps follow one rule: **the map is the product**. It keeps at least two thirds of the screen, bottom sheets peek instead of covering, and no control is duplicated. The live fleet only draws when zoomed in; route colours are blended toward the component colour with guaranteed ≥ 4.5:1 contrast.
