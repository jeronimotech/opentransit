---
title: Contribuir
description: Cómo proponer cambios en el código, los datos y la documentación.
---

## Dónde va cada cosa

| Quiero… | Repositorio |
|---|---|
| Arreglar o proponer algo en la API, la ingesta o el enrutamiento | [opentransit-api](https://github.com/jeronimotech/opentransit-api) |
| Cambiar la app web, el panel de administración o la landing por ciudad | [opentransit-web](https://github.com/jeronimotech/opentransit-web) |
| Cambiar la app móvil | [opentransit-mobile](https://github.com/jeronimotech/opentransit-mobile) |
| Añadir una ciudad | issue "New city" en [opentransit](https://github.com/jeronimotech/opentransit/issues/new/choose), luego PR a la API |
| Mejorar esta documentación | [opentransit](https://github.com/jeronimotech/opentransit) |

## Flujo

1. Abre un issue o un hilo en Discussions si el cambio es grande; para arreglos pequeños ve directo al PR.
2. Rama desde `main`, cambios pequeños y enfocados, con pruebas.
3. La CI de cada repo debe pasar: `ruff` + `pytest` (API); `lint`, `typecheck`, `test`, `build` (web); `flutter analyze` + `flutter test` + compilaciones Android/iOS (móvil).
4. Un mantenedor revisa en el plazo de una semana.

## Estilo por repositorio

- **API**: Python 3.12, tipado, `ruff`, pruebas sin red ni base de datos (fixtures). Nada específico de una ciudad fuera de `cities/`.
- **Web**: TypeScript estricto, componentes pequeños, todo texto en `src/lib/i18n/dict.ts` (es + en). Los tipos del contrato se tratan como solo lectura.
- **Móvil**: `flutter_lints`, modelos `fromJson` escritos a mano, cadenas en ARB (es fuente + en), pruebas de widgets para las pantallas nuevas.
- **Regla común**: ningún proveedor, agencia o ciudad codificado en duro. Todo sale de la configuración de la ciudad.

## Licencia de las contribuciones

Al contribuir aceptas que tu trabajo se publique bajo MIT (código) y CC BY 4.0 (documentación). No pedimos CLA ni DCO. Aplica el [código de conducta](https://github.com/jeronimotech/opentransit/blob/main/CODE_OF_CONDUCT.md).
