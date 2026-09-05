---
title: Panel de administración
description: Cambia tarifas, configuración, enlaces, servicios, movilidad y la landing de una ciudad sin redesplegar.
---

El panel vive en la app web en `/admin` (no aparece en la navegación pública). Cada cambio se valida en la API, se guarda en PostgreSQL con historial y se aplica en memoria de inmediato: el siguiente `/plan` ya usa la tarifa nueva y `GET /v1/cities/{city}` la sirve con `Cache-Control: max-age=60`.

## Acceso

Define `ADMIN_TOKEN` en el `.env` de la API. El panel lo pide al entrar, lo valida con `GET /v1/admin/me` y lo guarda solo en `sessionStorage` (se olvida al cerrar la pestaña). Sirve el panel **únicamente por HTTPS**, rota el token cuando alguien deje el equipo y desactívalo en despliegues públicos que no lo necesiten con `NEXT_PUBLIC_ADMIN_ENABLED=0`.

## Pestañas

| Pestaña | Qué edita | Notas |
|---|---|---|
| Tarifas | moneda, pasaje, costo de transbordo, ventana de integración, transbordos máximos, nota | Vista previa en vivo con la misma regla que usa la app. Siempre se publica como "estimada". |
| Configuración | cadencias de refresco, banderas de funciones, versión mínima de la app, mantenimiento | Mantenimiento pide confirmación; la app móvil muestra pantalla de bloqueo. |
| Enlaces | PQRS, recarga, atención, privacidad | Solo `https`. |
| Servicios | fichas de servicios del hub (recarga, PQRS, atención…) | Añadir, quitar, reordenar. |
| Marca | color primario | |
| Movilidad | redes de bicis/patinetas (`mobility.bikeShare[]`) | "Probar feed" muestra lo que la API lee del GBFS. |
| Landing | hero, apps, destacados, capturas, estadísticas, aliados, datos abiertos, FAQ, contacto, pie, SEO | Vista previa del borrador antes de guardar. |
| Historial | revisión, fecha, autor, nota y claves cambiadas | |

Cada sección marca qué campos están **sobrescritos** frente al YAML y permite "Restablecer a YAML"; "Restablecer todo" borra el override completo.

## Semántica de la API

- `GET /v1/admin/cities/{city}/config` → configuración efectiva, override actual, valores del YAML, revisión.
- `PUT …/config` con un cuerpo parcial → fusión profunda (los diccionarios se mezclan, las listas se reemplazan, `null` elimina la clave y vuelve al YAML). La validación se hace sobre el resultado efectivo antes de guardar.
- `DELETE …/config` → restablece; `GET …/config/history` → revisiones.

Reglas de validación (extracto): moneda de 3 letras, importes ≥ 0, ventana 0–600 min, transbordos 0–5, cadencias 5–120 s, `minAppVersion` semver, enlaces `https`, ids únicos. Los detalles completos están en `docs/API.md` del repo de la API.
