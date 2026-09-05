---
title: Gobernanza
description: Quién decide qué y cómo participan las ciudades.
---

## Mantenedores

El proyecto lo inició y lo mantiene [jeronimotech](https://github.com/jeronimotech). Los mantenedores actuales figuran en `.github/CODEOWNERS` de cada repositorio. Se incorporan nuevos mantenedores por invitación tras contribuciones sostenidas.

## Cómo se decide

- **Cambios pequeños** (arreglos, mejoras acotadas): un mantenedor los revisa y fusiona.
- **Cambios de contrato** (la API que consumen las apps): se proponen en un issue con la forma JSON, se documentan en `docs/API.md` y se versionan como adiciones; nunca se rompe un campo existente sin un periodo de transición.
- **Decisiones de producto y hoja de ruta**: se discuten en público en Discussions; los mantenedores deciden buscando consenso y explican el porqué.

## Ciudades y agencias

Una ciudad puede participar de tres formas: aportar sus datos (feeds públicos y bien mantenidos), desplegar su propia instancia (con su marca y su panel), o contribuir código y experiencia de sus equipos. No hace falta acuerdo formal para usar el software; sí pedimos que los feeds usados sean públicos y con licencia abierta, y que se atribuya a la agencia en la app.

## Principios que no se negocian

Datos abiertos como única entrada, sin lock-in de proveedores, sin rastreadores publicitarios en las apps, transparencia con el usuario sobre lo que es estimado y lo que es dato verificado, y licencia MIT.
