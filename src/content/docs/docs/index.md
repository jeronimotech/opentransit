---
title: Documentación
description: Qué es opentransit, cómo está construido y cómo ponerlo en marcha en tu ciudad.
---

**opentransit** es un planeador de viajes multimodal, multiciudad y de código abierto. Toma los datos que una ciudad ya publica (GTFS, GTFS-Realtime, GBFS, OpenStreetMap) y entrega una app web, una app móvil y un panel de administración listos para usar, sin llaves de API ni servicios propietarios.

## Por dónde empezar

- [Primeros pasos](/opentransit/docs/getting-started/): levanta la pila completa en tu máquina en unos 10 minutos.
- [Arquitectura](/opentransit/docs/architecture/): qué hace cada repositorio y cómo fluye el dato.
- [Añadir una ciudad](/opentransit/docs/adding-a-city/): un archivo YAML y un feed GTFS bastan.
- [Referencia de la API](/opentransit/docs/api/): el contrato que consumen la web y el móvil.

## Los tres repositorios

| Repositorio | Qué es | Pila |
|---|---|---|
| [opentransit-api](https://github.com/jeronimotech/opentransit-api) | Backend multi-tenant: registro de ciudades, ingesta GTFS, GTFS-RT en vivo, bicis compartidas (GBFS), enrutamiento vía OpenTripPlanner, configuración editable en caliente | Python 3.12 · FastAPI · PostgreSQL/PostGIS · OpenTripPlanner 2.9 |
| [opentransit-web](https://github.com/jeronimotech/opentransit-web) | App web (PWA) + panel de administración + landing por ciudad | Next.js 15 · React 19 · TypeScript · Tailwind · MapLibre GL |
| [opentransit-mobile](https://github.com/jeronimotech/opentransit-mobile) | App iOS/Android | Flutter 3.41 · maplibre_gl · Riverpod · go_router |

Todo bajo licencia MIT. Primera ciudad en producción de datos: **Bogotá** (TransMilenio, SITP, TransMiCable y el sistema de bicicletas públicas).
