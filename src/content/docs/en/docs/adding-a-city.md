---
title: Adding a city
description: One YAML, a GTFS feed and an OpenStreetMap extract. No code changes.
---

Everything city-specific lives in `opentransit-api/cities/<slug>.yaml` (parts of it later editable from the admin panel). The apps read that configuration from `GET /v1/cities/{city}` and adapt: name, colours, modes, components, fares, links, bike providers, landing.

## 1. The city file

Copy `cities/_template.yaml` to `cities/<slug>.yaml` and fill in:

```yaml
id: mycity                      # URL slug
name: My City
country: XX
timezone: Region/City
locale: es-XX
center: { lat: 0.0, lon: 0.0 }
bbox: [minLon, minLat, maxLon, maxLat]
modes: [WALK, BUS]              # subset of WALK,BUS,RAIL,SUBWAY,TRAM,CABLE_CAR,FERRY,BICYCLE
branding: { primary_color: "#1565C0", logo_url: null }
features: { realtime_vehicles: false, trip_updates: false, alerts: false, fares: false, bike_share: false }
attribution: "Data: <agency> (GTFS) · Map: © OpenMapTiles © OpenStreetMap contributors"

feeds:
  gtfs_static_url: https://example.org/gtfs.zip
  rt_positions_url: null        # GTFS-RT VehiclePositions, if any
  rt_tripupdates_url: null
  rt_alerts_url: null

otp:
  base_url: ${OTP_MYCITY_URL:-http://localhost:8081}
  feed_id: mycity

agencies:                       # GTFS agency_id → component + colour
  - { id: "1", name: "Main operator", component: other, color: "#1565C0" }
```

**Components** (`trunk`, `feeder`, `dual`, `zonal`, `cable`, `rail`, `other`) are the taxonomy the apps use for colours and icons; map every `agency_id` to one.

## 2. Optional blocks (recommended)

- `components`: palette and icons per component.
- `fares`: flat estimated fare (`base`, `transfer`, `transfer_window_minutes`, `max_transfers`). Always shown as "estimated". Verify against the tariff in force.
- `config`: refresh cadences, feature flags, minimum app version, maintenance mode.
- `links` and `services`: official pages (complaints, top-up, support) and the service tiles shown in the apps. Public links only.
- `mobility.bike_share[]`: one or more bike/scooter systems with a GBFS feed (below).
- `landing`: content of the city's public landing page.

All of it can be edited later from the [admin panel](/opentransit/en/docs/admin-panel/) without a redeploy.

## 3. OpenTripPlanner inputs

Create `otp/<slug>/`:

- `sources.env`: `GTFS_URL`, `OSM_URL` (a [Geofabrik](https://download.geofabrik.de) extract) and `BBOX` to clip it.
- `build-config.json`: `transitFeeds[].feedId` = `<slug>`, `transitModelTimeZone`.
- `router-config.json`: GTFS-RT updaters if you have them (`stop-time-updater`, `real-time-alerts`, `vehicle-positions`) or `"updaters": []`.

```bash
make graph CITY=<slug>                  # download, clip, build the graph
scripts/otp-native.sh serve <slug> 8081 # or an otp-<slug> service in docker-compose.yml
```

## 4. Shared bikes and scooters (GBFS)

Any system that publishes [GBFS](https://gbfs.org) plugs in with configuration:

```yaml
mobility:
  bike_share:
    - id: acme
      name: Acme Bikes
      network: acme_city                 # OTP updater id
      gbfs_url: https://acme.example/gbfs/gbfs.json
      color: "#00A859"
      url: https://acme.example
      apps: { ios: null, android: null }
      form_factors: [bicycle]
```

`scripts/otp-updaters.py <slug>` writes one `vehicle-rental` updater per network into `router-config.json` (run automatically by `otp-native.sh serve`). Restart OTP; no graph rebuild. From then on `/plan?modes=TRANSIT,WALK,BIKE_RENTAL` returns rental legs with pickup and drop-off stations, live availability and a price estimate; the apps show the "Bici pública" chip, the stations layer and the cards with **your** network's name and colour. Several networks per city are fine.

## 5. Start and validate

Start the API: it discovers the city, ingests the static feed and starts the pollers when realtime URLs are set. Check:

```bash
curl localhost:8001/v1/cities/<slug>/health
curl "localhost:8001/v1/cities/<slug>/plan?fromLat=…&fromLon=…&toLat=…&toLon=…"
```

Optional: `scripts/build-pois.sh <slug>` builds the services layer (bike parking, toilets, ATMs, health, libraries) from OpenStreetMap.

## 6. Document and share

Write `docs/cities/<slug>.md` in the API repo with what the feed does **not** provide (fares, transfers, accessibility, frequencies) so developers know what to expect, and open a pull request. If you would like help, open a "New city" issue in this repository.
