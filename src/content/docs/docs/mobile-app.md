---
title: App móvil
description: Ejecutar, configurar y publicar opentransit-mobile (Flutter).
---

## Ejecutar

```bash
flutter pub get && flutter gen-l10n
flutter run --dart-define=MOCK=true                           # demo con fixtures
flutter run --dart-define=API_URL=http://localhost:8001       # simulador iOS
flutter run --dart-define=API_URL=http://10.0.2.2:8001        # emulador Android
```

### `--dart-define`

| Define | Por defecto | Uso |
|---|---|---|
| `MOCK` | `false` | usar `assets/fixtures/*.json` en vez de la red |
| `API_URL` | según plataforma | URL base de la API |
| `WEB_HOST` | `opentransit.example.org` | host de la web cuyas URLs `https://` la app reclama y comparte |
| `MAP_STYLE`, `MAP_STYLE_DARK` | estilos de OpenFreeMap | estilo MapLibre claro/oscuro |

## Qué incluye

Home "map first" con capas, "Cerca de ti" y hoja arrastrable; planeador con ordenación, tarifa estimada y bici pública; "Ubica tu bus"; tablero de llegadas; buses en vivo interpolados; favoritos tipados (Casa, Trabajo, personalizados) y viajes recientes; alertas con carrusel; "Iniciar viaje" con notificación local al acercarte a tu parada; capa de servicios (OSM); accesibilidad honesta; enlaces oficiales de PQRS; configuración remota (banderas, versión mínima con pantalla de actualización forzada, mantenimiento); enlaces profundos.

## Enlaces profundos

Esquema propio `opentransit://{city}/plan?…`, `…/stops/{id}`, `…/routes/{id}`, `…/locate`, `…/alerts`, y las URLs canónicas de la web (`https://<WEB_HOST>/{city}/…`). Para activarlas: sustituye el host de ejemplo en `android/app/src/main/AndroidManifest.xml` (App Links) y `ios/Runner/Runner.entitlements` (dominios asociados), pasa el mismo `WEB_HOST` por `--dart-define`, y publica `/.well-known/assetlinks.json` y `apple-app-site-association` en ese host.

## Publicar en tiendas

- Cambia `applicationId` / bundle id y nombre de la app; sustituye iconos y pantalla de arranque.
- Fija `API_URL` y `WEB_HOST` de producción con `--dart-define` en el pipeline.
- Android: la CI compila con JDK 21; firma con tu keystore. iOS: dominios asociados y notificaciones locales ya declarados; ajusta el equipo de firma.
- La API gobierna `minAppVersion`: úsalo para forzar actualizaciones sin publicar de nuevo.

## Verificar

```bash
flutter analyze --fatal-infos
flutter test
tool/screenshots.sh                                   # recorrido en simulador con fixtures
tool/screenshots.sh "" integration_test/live_api_test.dart --dart-define=API_URL=http://localhost:8001
```
