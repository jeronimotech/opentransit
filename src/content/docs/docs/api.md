---
title: Referencia de la API
description: El contrato JSON que consumen la app web y la app móvil.
---

La documentación interactiva (OpenAPI) está en `GET /docs` de cualquier instancia en marcha. El contrato completo con formas JSON y desviaciones documentadas vive en [`docs/API.md`](https://github.com/jeronimotech/opentransit-api/blob/main/docs/API.md) del repo de la API. Esta página es el mapa.

## Convenciones

JSON en camelCase; tiempos ISO-8601 con desplazamiento; distancias en metros y duraciones en segundos; coordenadas `{lat, lon}`; polilíneas codificadas (precisión 1e-5). Los ids de paradas, rutas y viajes son cadenas opacas con prefijo de feed (`bogota:1234`). Errores siempre como `{"error": {"code": "…", "message": "…"}}`.

## Plataforma

| Endpoint | Devuelve |
|---|---|
| `GET /healthz` | estado y ciudades |
| `GET /v1/cities`, `GET /v1/cities/{city}` | configuración efectiva de la ciudad: modos, componentes, tarifas, `config`, enlaces, servicios, `mobility`, `features` |
| `GET /v1/cities/{city}/landing` | contenido de la landing pública + estadísticas en vivo |
| `GET /v1/cities/{city}/health` | estático, tiempo real (edad, `stale`), enrutador, redes de alquiler |

## Planificación y búsqueda

| Endpoint | Notas |
|---|---|
| `GET …/plan?fromLat&fromLon&toLat&toLon&time&arriveBy&modes&wheelchair&numItineraries&locale` | modos `WALK,BUS,RAIL,SUBWAY,TRAM,CABLE_CAR,BICYCLE,TRANSIT,BIKE_RENTAL,SCOOTER_RENTAL`; itinerarios con tramos, geometría, estado en vivo, alertas, tarifa estimada, `rental` en tramos de alquiler |
| `GET …/geocode?q&lat&lon`, `GET …/reverse?lat&lon` | paradas del GTFS (cercanas primero) + Photon |

## Paradas y rutas

| Endpoint | Notas |
|---|---|
| `GET …/stops/nearby?lat&lon&radius&include=stops,rental` | paradas y estaciones de alquiler con distancia |
| `GET …/stops/{id}`, `…/departures` | detalle, salidas |
| `GET …/stops/{id}/board` | tablero agrupado por ruta con frescura |
| `GET …/stops/{id}/routes/{routeId}/next` | "Ubica tu bus": próximos buses en vivo / estimados / programados |
| `GET …/routes`, `…/routes/{id}` | rutas con ventana de servicio, patrones |
| `GET …/network` | formas de la red, deduplicadas en servidor |
| `GET …/pois?bbox&type` | capa de servicios (GeoJSON) |

## Tiempo real y alquiler

| Endpoint | Notas |
|---|---|
| `GET …/vehicles?bbox&routeId`, `GET …/vehicles/stream?bbox&routeIds` (SSE), `GET …/vehicles/{id}` | flota, deltas comprimidos, detalle con rastro |
| `GET …/alerts?routeId&stopId` | alertas con severidad siempre presente |
| `GET …/rental/networks`, `…/rental/stations?bbox`, `…/rental/stations/{id}` | redes GBFS, estaciones con disponibilidad |

## Administración (`X-Admin-Token`)

| Endpoint | Notas |
|---|---|
| `GET /v1/admin/me` | valida el token |
| `GET/PUT/DELETE /v1/admin/cities/{city}/config`, `GET …/config/history` | configuración editable en caliente: `fares`, `config`, `links`, `services`, `branding`, `mobility`, `landing` |
| `POST …/admin/cities/{city}/ingest-static`, `…/purge` | operaciones |
