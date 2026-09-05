---
title: Hoja de ruta
description: Qué está hecho y qué viene.
---

## Hecho

**v1.0 — la base.** Tres repos, contrato compartido, planeador multimodal con OpenTripPlanner (bus, cable, bici propia, a pie), flota en vivo por SSE, paradas, rutas, alertas, geocodificación sin llaves, apps web y móvil con modo mock, CI en cada repo.

**v1.1 — lo mejor de las apps existentes, con datos abiertos.** Hub de inicio, "Ubica tu bus", tablero de llegadas, frescura (en vivo / programado / sin datos), marcadores por ETA e interpolación, horarios de servicio, tarifa estimada, ordenación de resultados, taxonomía de componentes, favoritos tipados y recientes, carrusel de alertas, configuración remota (banderas, versión mínima, mantenimiento), enlaces profundos y QR, "Iniciar viaje", capa de servicios (OSM), accesibilidad honesta, búsqueda cercana primero, bici a la estación, PQRS.

**v1.1.1 — "map first".** Auditoría de usabilidad y rediseño: el mapa domina, hojas que asoman, sin controles duplicados, flota por zoom, colores con contraste, encabezados limpios.

**v1.2 — bicis compartidas (GBFS).** Redes configurables por ciudad (N por ciudad), updater de OTP generado desde la configuración, tramos de alquiler con disponibilidad y precio, capa de estaciones, fichas de recogida/devolución, admin "Movilidad".

**Panel de administración y landing por ciudad.** Tarifas, configuración, enlaces, servicios, marca, movilidad y landing editables en caliente con historial; landing pública "white-label" generada desde la configuración; deduplicación de la red en servidor.

## Siguiente

- **Tramos bajo demanda con estimación y traspaso**: tabla de tarifa de taxi por ciudad (editable en el admin) para estimar precio y tiempo con enrutamiento en coche; opción "combinar con taxi / app de transporte" para primera y última milla; botones de "Pedir" con enlaces profundos a operadores configurables por ciudad.
- **APIs de aliados** cuando existan acuerdos: precios en tiempo real y reserva con plataformas de transporte, patinetas con GBFS.
- **Más ciudades**: la meta es que añadir una ciudad sea un pull request con un YAML.
- **Cuentas y sincronización opcional** de favoritos (hoy son locales al dispositivo).
- **Accesibilidad en estación** a partir de `pathways.txt` y OSM cuando el dato exista.

Las propuestas se discuten en [Discussions](https://github.com/jeronimotech/opentransit/discussions).
