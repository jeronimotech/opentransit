---
title: Arquitectura
description: Tres repositorios, un enrutador por ciudad y datos abiertos como única entrada.
---

## Principios

- **Una ciudad es un tenant.** Toda la API está bajo `/v1/cities/{city}/…`. La configuración de cada ciudad vive en un YAML (`cities/<slug>.yaml`); nada del código conoce a Bogotá.
- **OpenTripPlanner enruta; la API normaliza.** OTP 2 construye el grafo con GTFS + OpenStreetMap y aplica GTFS-Realtime y GBFS en tiempo de ejecución. La API nunca expone OTP en crudo: traduce sus respuestas GraphQL al contrato JSON que consumen las apps.
- **Un solo poll sirve a todos.** La API descarga cada feed en tiempo real una vez (≈ cada 15 s) y lo reparte a todos los clientes por SSE con deltas comprimidos.
- **PostGIS guarda la parte ligera del feed.** Rutas, paradas (geografía), formas simplificadas y ventanas de servicio; `stop_times.txt` se procesa en streaming y no se almacena.
- **Sin llaves.** Mapa base de OpenFreeMap, geocodificación con Photon + las paradas del GTFS.

## Diagrama

```mermaid
flowchart LR
  subgraph data["Datos abiertos (por ciudad)"]
    GTFS[GTFS estático]
    RT[GTFS-Realtime<br/>posiciones · trip updates · alertas]
    GBFS[GBFS<br/>bicis / patinetas]
    OSM[OpenStreetMap]
  end
  subgraph otp["OpenTripPlanner 2 (uno por ciudad)"]
    GRAPH[grafo]
    UPD[updaters RT + GBFS]
  end
  subgraph api["opentransit-api"]
    REG[registro de ciudades<br/>cities/*.yaml + overrides]
    POLL[poller GTFS-RT / GBFS]
    NORM[normalizador]
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

## Componentes

### opentransit-api
FastAPI. Módulos principales: registro de ciudades y configuración efectiva (YAML + overrides persistidos en Postgres, editables desde el admin), ingesta del GTFS estático, poller GTFS-RT con frame en memoria y deltas, cliente GBFS, cliente GraphQL de OTP, normalizador, geocodificador, deduplicación de formas de la red, endpoints de administración. Un proceso puede servir varias ciudades; cada una apunta a su propia instancia de OTP.

### opentransit-web
Next.js (App Router). Home "map first", planeador, "Ubica tu bus", tablero de llegadas, buses en vivo, rutas, alertas, favoritos, bicis compartidas, panel `/admin` y landing por ciudad. Modo mock completo para desarrollo y capturas.

### opentransit-mobile
Flutter. Las mismas funciones que la web, más App Links / Universal Links, modo "Iniciar viaje" con notificación local, y pantallas de actualización forzada y mantenimiento gobernadas por la configuración remota.

## Reglas de diseño

Las apps siguen una regla simple: **el mapa es el producto**. Ocupa al menos dos tercios de la pantalla, las hojas inferiores asoman en vez de tapar, y ningún control se repite. La flota en vivo solo se dibuja al acercar el mapa; los colores de las rutas se mezclan con el color del componente y se garantiza contraste ≥ 4.5:1.
