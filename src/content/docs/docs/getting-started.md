---
title: Primeros pasos
description: Levanta la API, el enrutador, la web y la app móvil en tu máquina.
---

Todo corre en local con datos reales. La primera ciudad configurada es Bogotá; el mismo flujo sirve para cualquier ciudad con GTFS (ver [Añadir una ciudad](/opentransit/docs/adding-a-city/)).

## Requisitos

- Docker (para PostgreSQL/PostGIS).
- Python ≥ 3.12 y un JDK ≥ 21 (OpenTripPlanner corre nativo; la VM de Docker Desktop suele ser pequeña para construir el grafo de una ciudad grande).
- Node ≥ 20 con `pnpm` para la web; Flutter ≥ 3.41 para el móvil.
- Unos 500 MB de descargas la primera vez (GTFS + extracto de OpenStreetMap).

## 1. Backend y enrutador

```bash
git clone https://github.com/jeronimotech/opentransit-api && cd opentransit-api
make venv                    # entorno virtual con dependencias
make up                      # Postgres/PostGIS en localhost:5435
make graph CITY=bogota       # descarga GTFS + OSM, recorta al bbox y construye el grafo (~2 min)
make otp                     # sirve OpenTripPlanner en http://localhost:8080
cp .env.example .env         # define ADMIN_TOKEN (cualquier cadena larga y aleatoria)
make dev                     # API en http://localhost:8001; el primer arranque ingiere el GTFS (~1 min)
```

Comprueba que responde:

```bash
curl localhost:8001/healthz
curl "localhost:8001/v1/cities/bogota/plan?fromLat=4.7546&fromLon=-74.0459&toLat=4.5978&toLon=-74.1616" | jq '.itineraries[0]'
open http://localhost:8001/docs      # OpenAPI interactivo
```

## 2. Web

```bash
git clone https://github.com/jeronimotech/opentransit-web && cd opentransit-web
pnpm install && cp .env.example .env.local
pnpm dev                     # contra la API local (NEXT_PUBLIC_API_URL=http://localhost:8001)
pnpm dev:mock                # sin backend, con datos de ejemplo
```

La app queda en `http://localhost:3000/bogota`; el panel de operadores en `/admin`.

## 3. Móvil

```bash
git clone https://github.com/jeronimotech/opentransit-mobile && cd opentransit-mobile
flutter pub get && flutter gen-l10n
flutter run --dart-define=API_URL=http://localhost:8001      # simulador iOS
flutter run --dart-define=API_URL=http://10.0.2.2:8001       # emulador Android
flutter run --dart-define=MOCK=true                          # sin backend
```

## Puertos por defecto

| Servicio | Puerto |
|---|---|
| API | 8001 |
| OpenTripPlanner | 8080 |
| PostgreSQL | 5435 |
| Web | 3000 |

## Qué hacer después

- Cambia tarifas, enlaces o el modo mantenimiento desde el [panel de administración](/opentransit/docs/admin-panel/) sin redesplegar.
- Revisa las [notas de calidad del dato](/opentransit/docs/data-quality/) antes de confiar en horarios, tarifas o accesibilidad.
