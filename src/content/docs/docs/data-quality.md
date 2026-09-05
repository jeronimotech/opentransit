---
title: Calidad del dato
description: Qué revisar en tu feed antes de confiar en horarios, tiempos en vivo, tarifas y accesibilidad.
---

Un planeador es tan bueno como su feed. Estas son las comprobaciones que hicimos en Bogotá y que conviene repetir en cualquier ciudad; las apps ya están preparadas para cada caso.

## GTFS estático

- **Vigencia y versión**: `feed_info.txt` con fechas válidas y un `feed_version` que cambie en cada publicación. Una URL estable (`latest.zip`) evita que los consumidores se queden con versiones viejas.
- **Calendarios**: un único `service_id` para todo el año oculta variaciones reales. Revisa `calendar_dates.txt` para festivos.
- **Tarifas**: si no hay `fare_attributes`/`fare_rules` ni GTFS-Fares v2, las apps no pueden calcular precios. opentransit ofrece una tarifa **estimada** configurable por ciudad, siempre marcada como tal.
- **Transbordos y pasillos**: sin `transfers.txt` ni `pathways.txt`, los tiempos de transbordo se infieren geométricamente.
- **Accesibilidad**: un valor constante en `wheelchair_boarding` para todas las paradas no es un dato, es un valor por defecto. opentransit lo detecta (≥ 99 % de paradas con el mismo valor) y lo muestra como "no verificado".
- **Encabezados de destino**: si `trip_headsign` repite el nombre de la ruta, las apps lo omiten y usan la última parada del patrón.
- **Formas duplicadas**: cuando una ruta comercial se modela como muchas rutas GTFS, la API deduplica las formas de la capa de red.

## GTFS-Realtime

- **Latencia y frecuencia**: mide la edad mediana de las entidades; opentransit expone `health.realtime.entityAgeP50Seconds` y marca `stale` por encima de 90 s.
- **Consistencia referencial**: `trip_id` y `stop_id` deben existir en el estático vigente. Los vehículos con viaje no resuelto se siguen mostrando por ruta, pero no alimentan itinerarios.
- **Cobertura de TripUpdates**: algunos feeds publican una sola `stop_time_update` por viaje (la próxima parada). OTP propaga ese retraso hacia atrás; opentransit solo marca "en vivo" lo que realmente lo está y rellena el resto con "por programación".
- **CORS**: si el feed no permite orígenes de navegador, la API debe proxiarlo (opentransit ya lo hace).

## GBFS

- Versión 3.0: los nombres son arreglos con idioma y la disponibilidad se llama `num_vehicles_available`.
- Planes de precios: filtra planes de prueba o promocionales antes de estimar el costo de un viaje.
- Estaciones fuera del bbox o de otra ciudad en el mismo feed: OTP las registra como no enlazadas; es inofensivo.

## OpenStreetMap

El grafo peatonal y ciclista sale de OSM. Revisa que el extracto cubra el bbox completo y que las estaciones grandes tengan accesos mapeados; la capa de servicios (baños, cajeros, parqueaderos de bici) también viene de ahí.
