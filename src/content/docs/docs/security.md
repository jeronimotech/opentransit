---
title: Política de seguridad
description: Cómo reportar vulnerabilidades y qué protegemos.
---

**No abras issues públicos para problemas de seguridad.**

Reporta vulnerabilidades de cualquier componente (API, web, móvil, este sitio) mediante el reporte privado de GitHub del repositorio afectado (*Security → Report a vulnerability*) o al correo de los mantenedores listados en `.github/CODEOWNERS`. Responderemos en un máximo de 5 días hábiles.

## Alcance

El código de los repositorios `jeronimotech/opentransit-*`. Los feeds de terceros (GTFS, GTFS-RT, GBFS) y los sistemas de las agencias quedan fuera; repórtalos al publicador.

## Lo que más nos importa

- El token de administración y los endpoints `/v1/admin/*`.
- Cualquier vía por la que un cliente alcance un sistema privado aguas arriba.
- Inyección a través del contenido del feed (nombres, texto de alertas, URLs).
- Cadena de suministro en dependencias.

## Recomendaciones de despliegue

Sirve el panel de administración solo por HTTPS, usa un `ADMIN_TOKEN` largo y rotado, desactiva `/admin` en despliegues públicos que no lo necesiten, y mantén la API detrás de un proxy con límites de tasa.
