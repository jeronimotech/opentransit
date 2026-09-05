---
title: Roadmap
description: What is done and what comes next.
---

## Done

**v1.0 — the base.** Three repos, shared contract, multimodal planner on OpenTripPlanner (bus, cable, own bike, walking), live fleet over SSE, stops, routes, alerts, keyless geocoding, web and mobile apps with mock mode, CI in every repo.

**v1.1 — the best of existing apps, on open data.** Home hub, "Locate my bus", arrival board, freshness (live / scheduled / no data), ETA-tinted and interpolated markers, service hours, estimated fare, result sorting, component taxonomy, typed favorites and recents, alert carousel, remote config (flags, minimum version, maintenance), deep links and QR, follow-along, services layer (OSM), honest accessibility, nearby-first search, bike-to-station, complaint links.

**v1.1.1 — "map first".** Usability audit and redesign: the map dominates, sheets peek, no duplicate controls, fleet by zoom, contrast-safe colours, clean headsigns.

**v1.2 — shared bikes (GBFS).** Configurable networks per city (N per city), OTP updater generated from config, rental legs with availability and price, stations layer, pickup/drop-off cards, "Mobility" admin tab.

**Admin panel and per-city landing.** Fares, config, links, services, brand, mobility and landing editable at runtime with history; white-label public landing generated from config; server-side network dedupe.

## Next

- **On-demand legs with estimates and hand-off**: a per-city taxi tariff table (editable in the admin) to estimate price and time with car routing; a "combine with taxi / ride-hailing" option for first and last mile; "Request" buttons deep-linking to operators configured per city.
- **Partner APIs** when agreements exist: real-time prices and booking with ride-hailing platforms, scooters via GBFS.
- **More cities**: the goal is that adding a city is a pull request with a YAML.
- **Optional accounts and sync** for favorites (local to the device today).
- **In-station accessibility** from `pathways.txt` and OSM where data exists.

Proposals are discussed in [Discussions](https://github.com/jeronimotech/opentransit/discussions).
