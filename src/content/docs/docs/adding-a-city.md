---
title: Añadir una ciudad
description: Un YAML, un feed GTFS y un extracto de OpenStreetMap. Sin tocar código.
---

Todo lo específico de una ciudad vive en `opentransit-api/cities/<slug>.yaml` (parte de ello editable luego desde el panel de administración). Las apps leen esa configuración de `GET /v1/cities/{city}` y se adaptan: nombre, colores, modos, componentes, tarifas, enlaces, proveedores de bicis, landing.

## 1. El archivo de ciudad

Copia `cities/_template.yaml` a `cities/<slug>.yaml` y rellena:

```yaml
id: mycity                      # slug de URL
name: Mi Ciudad
country: XX
timezone: Region/City
locale: es-XX
center: { lat: 0.0, lon: 0.0 }
bbox: [minLon, minLat, maxLon, maxLat]
modes: [WALK, BUS]              # subconjunto de WALK,BUS,RAIL,SUBWAY,TRAM,CABLE_CAR,FERRY,BICYCLE
branding: { primary_color: "#1565C0", logo_url: null }
features: { realtime_vehicles: false, trip_updates: false, alerts: false, fares: false, bike_share: false }
attribution: "Datos: <agencia> (GTFS) · Mapa: © OpenMapTiles © OpenStreetMap contributors"

feeds:
  gtfs_static_url: https://example.org/gtfs.zip
  rt_positions_url: null        # GTFS-RT VehiclePositions, si existe
  rt_tripupdates_url: null
  rt_alerts_url: null

otp:
  base_url: ${OTP_MYCITY_URL:-http://localhost:8081}
  feed_id: mycity

agencies:                       # agency_id del GTFS → componente + color
  - { id: "1", name: "Operador principal", component: other, color: "#1565C0" }
```

Los **componentes** (`trunk`, `feeder`, `dual`, `zonal`, `cable`, `rail`, `other`) son la taxonomía con la que las apps colorean e iconizan todo; mapea cada `agency_id` a uno.

## 2. Bloques opcionales (recomendados)

- `components`: paleta e iconos por componente.
- `fares`: tarifa plana estimada (`base`, `transfer`, `transfer_window_minutes`, `max_transfers`). Las apps la muestran siempre como "estimada". Verifícala con la tarifa vigente.
- `config`: cadencias de refresco, banderas de funciones, versión mínima de la app, modo mantenimiento.
- `links` y `services`: páginas oficiales (PQRS, recarga, atención) y las fichas de servicios que aparecen en las apps. Solo enlaces públicos.
- `mobility.bike_share[]`: uno o varios sistemas de bicis/patinetas con feed GBFS (ver abajo).
- `landing`: contenido de la landing pública de la ciudad.

Todo esto se puede editar después desde el [panel de administración](/opentransit/docs/admin-panel/) sin redesplegar.

## 3. Inputs de OpenTripPlanner

Crea `otp/<slug>/`:

- `sources.env`: `GTFS_URL`, `OSM_URL` (un extracto de [Geofabrik](https://download.geofabrik.de)) y `BBOX` para recortarlo.
- `build-config.json`: `transitFeeds[].feedId` = `<slug>`, `transitModelTimeZone`.
- `router-config.json`: updaters GTFS-RT si los hay (`stop-time-updater`, `real-time-alerts`, `vehicle-positions`) o `"updaters": []`.

```bash
make graph CITY=<slug>                  # descarga, recorta y construye el grafo
scripts/otp-native.sh serve <slug> 8081 # o un servicio otp-<slug> en docker-compose.yml
```

## 4. Bicis y patinetas compartidas (GBFS)

Cualquier sistema que publique [GBFS](https://gbfs.org) entra con configuración:

```yaml
mobility:
  bike_share:
    - id: acme
      name: Acme Bikes
      network: acme_city                 # id del updater de OTP
      gbfs_url: https://acme.example/gbfs/gbfs.json
      color: "#00A859"
      url: https://acme.example
      apps: { ios: null, android: null }
      form_factors: [bicycle]
```

`scripts/otp-updaters.py <slug>` genera un updater `vehicle-rental` por red en `router-config.json` (lo ejecuta `otp-native.sh serve`). Reinicia OTP; no hace falta reconstruir el grafo. Desde ese momento `/plan?modes=TRANSIT,WALK,BIKE_RENTAL` devuelve tramos de alquiler con estación de recogida y devolución, disponibilidad en vivo y precio estimado; las apps muestran el chip "Bici pública", la capa de estaciones y las fichas correspondientes con el nombre y color de **tu** red. Varias redes por ciudad son válidas.

## 5. Arranca y valida

Arranca la API: descubre la ciudad, ingiere el estático y lanza los pollers si hay URLs en tiempo real. Revisa:

```bash
curl localhost:8001/v1/cities/<slug>/health
curl "localhost:8001/v1/cities/<slug>/plan?fromLat=…&fromLon=…&toLat=…&toLon=…"
```

Opcional: `scripts/build-pois.sh <slug>` genera la capa de servicios (parqueaderos de bici, baños, cajeros, salud, bibliotecas) desde OpenStreetMap.

## 6. Documenta y comparte

Escribe `docs/cities/<slug>.md` en el repo de la API con lo que el feed **no** trae (tarifas, transbordos, accesibilidad, frecuencias) para que quien desarrolle sepa qué esperar, y abre un pull request. Si prefieres que te acompañemos, abre un issue "New city" en este repositorio.
