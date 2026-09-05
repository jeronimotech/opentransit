---
title: Data quality
description: What to check in your feed before trusting timetables, live times, fares and accessibility.
---

A planner is only as good as its feed. These are the checks we ran on Bogotá and that are worth repeating for any city; the apps are already prepared for each case.

## Static GTFS

- **Validity and versioning**: `feed_info.txt` with valid dates and a `feed_version` that changes on every publication. A stable URL (`latest.zip`) keeps consumers from getting stuck on old versions.
- **Calendars**: a single `service_id` for the whole year hides real variations. Check `calendar_dates.txt` for holidays.
- **Fares**: without `fare_attributes`/`fare_rules` or GTFS-Fares v2, apps cannot price trips. opentransit provides a configurable **estimated** flat fare per city, always labelled as such.
- **Transfers and pathways**: without `transfers.txt` or `pathways.txt`, transfer times are inferred geometrically.
- **Accessibility**: a constant `wheelchair_boarding` value on every stop is a default, not data. opentransit detects it (≥ 99 % of stops with the same value) and shows "not verified".
- **Headsigns**: when `trip_headsign` repeats the route name, the apps drop it and use the pattern's last stop.
- **Duplicate shapes**: when one commercial route is modelled as many GTFS routes, the API dedupes the network layer's shapes.

## GTFS-Realtime

- **Latency and cadence**: measure the median entity age; opentransit exposes `health.realtime.entityAgeP50Seconds` and flags `stale` above 90 s.
- **Referential consistency**: `trip_id` and `stop_id` must exist in the current static feed. Vehicles with unresolved trips still show by route but do not feed itineraries.
- **TripUpdates coverage**: some feeds publish a single `stop_time_update` per trip (the next stop). OTP propagates that delay backwards; opentransit only labels "live" what really is and fills the rest with "scheduled".
- **CORS**: if the feed blocks browser origins, the API must proxy it (opentransit does).

## GBFS

- Version 3.0: names are language arrays and availability is `num_vehicles_available`.
- Pricing plans: filter test or promotional plans before estimating a single trip's cost.
- Stations outside the bbox or from another city in the same feed: OTP logs them as unlinked; harmless.

## OpenStreetMap

The walking and cycling graph comes from OSM. Make sure the extract covers the whole bbox and that large stations have mapped entrances; the services layer (toilets, ATMs, bike parking) comes from there too.
