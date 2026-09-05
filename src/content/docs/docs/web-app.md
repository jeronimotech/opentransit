---
title: App web
description: Rutas, modo mock, variables de entorno y reglas de diseño de opentransit-web.
---

## Pantallas

| Ruta | Pantalla |
|---|---|
| `/` | Selector de ciudad (redirige si la API sirve una sola) |
| `/{city}` | Home "map first": mapa a pantalla completa, píldora de búsqueda, capas, hoja con tres acciones (Planear viaje · Ubica tu bus · Buscar ruta) y "Cerca de ti" |
| `/{city}?view=plan` | Planeador: origen/destino con autocompletado, hora, modos, accesibilidad, bici a la estación, bici pública; ordenación; tarifa estimada; detalle con tramos, indicaciones, "Iniciar viaje" |
| `/{city}/next` | Ubica tu bus: estación → ruta → próximos buses (En vivo / Por programación / Estimado) |
| `/{city}/stops/{id}` | Tablero de llegadas, accesibilidad, rutas, QR, PQRS |
| `/{city}/routes`, `/{city}/routes/{id}` | Buscador y detalle de ruta con horario de servicio |
| `/{city}/live` | Toda la flota en vivo (SSE con deltas, interpolación) |
| `/{city}/favorites`, `/{city}/alerts`, `/about` | Favoritos (locales), alertas, acerca de |
| `/{city}/landing` | Landing pública de la ciudad, generada desde su configuración |
| `/admin` | Panel de operadores |

El estado del planeador vive en la URL, así que cada plan es un enlace compartible. Español por defecto, inglés con un clic. Tema claro/oscuro. PWA.

## Variables de entorno

| Variable | Por defecto | Uso |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8001` | URL base de la API |
| `NEXT_PUBLIC_MOCK` | `0` | `1` sirve fixtures sin backend |
| `NEXT_PUBLIC_ADMIN_ENABLED` | `1` | `0` retira `/admin` del despliegue |
| `NEXT_PUBLIC_DEFAULT_CITY` + `NEXT_PUBLIC_ROOT_LANDING=1` | — | Despliegue de una sola ciudad: `/` sirve su landing y la app queda en `/{city}` |

Se inyectan en tiempo de compilación; la imagen Docker las fija con `--build-arg`.

## Comandos

```bash
pnpm dev · pnpm dev:mock · pnpm lint · pnpm typecheck · pnpm test · pnpm build
pnpm screenshots            # capturas de docs/screenshots desde el modo mock
```

## Mapa

MapLibre GL JS con teselas vectoriales de OpenFreeMap (sin llave). El worker de MapLibre se copia a `public/vendor/` en la instalación porque los bundlers rompen su carga por `import.meta.url`.

## Reglas de diseño

Resumen de la auditoría de usabilidad que dio forma a la versión 1.1.1: el mapa ocupa ≥ 65 % de la pantalla en móvil; la hoja asoma al 24 % y se puede arrastrar a 55 % o 92 %; la flota en vivo no se dibuja por debajo del zoom 14; los chips de ruta mezclan el color del feed con el del componente y garantizan contraste; los encabezados de destino se limpian a `A → B`; objetivos táctiles de 44 px; se respeta `prefers-reduced-motion`.
