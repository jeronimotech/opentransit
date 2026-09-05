---
title: Mobile app
description: Run, configure and ship opentransit-mobile (Flutter).
---

## Run

```bash
flutter pub get && flutter gen-l10n
flutter run --dart-define=MOCK=true                           # demo with fixtures
flutter run --dart-define=API_URL=http://localhost:8001       # iOS simulator
flutter run --dart-define=API_URL=http://10.0.2.2:8001        # Android emulator
```

### `--dart-define`

| Define | Default | Use |
|---|---|---|
| `MOCK` | `false` | use `assets/fixtures/*.json` instead of the network |
| `API_URL` | per platform | API base URL |
| `WEB_HOST` | `opentransit.example.org` | host of the web app whose `https://` URLs the app claims and shares |
| `MAP_STYLE`, `MAP_STYLE_DARK` | OpenFreeMap styles | MapLibre light/dark style |

## What it includes

Map-first home with layers, "Near you" and a draggable sheet; planner with sorting, estimated fare and shared bikes; locate my bus; arrival board; interpolated live buses; typed favorites (Home, Work, custom) and recent trips; alert carousel; follow-along with a local notification near your stop; services layer (OSM); honest accessibility; official complaint links; remote config (flags, minimum version with a forced-update screen, maintenance); deep links.

## Deep links

Custom scheme `opentransit://{city}/plan?…`, `…/stops/{id}`, `…/routes/{id}`, `…/locate`, `…/alerts`, plus the web's canonical URLs (`https://<WEB_HOST>/{city}/…`). To enable them: replace the placeholder host in `android/app/src/main/AndroidManifest.xml` (App Links) and `ios/Runner/Runner.entitlements` (associated domains), pass the same `WEB_HOST` via `--dart-define`, and publish `/.well-known/assetlinks.json` and `apple-app-site-association` on that host.

## Shipping to the stores

- Change the `applicationId` / bundle id and app name; replace icons and splash.
- Pin production `API_URL` and `WEB_HOST` with `--dart-define` in your pipeline.
- Android: CI builds with JDK 21; sign with your keystore. iOS: associated domains and local notifications are already declared; set your signing team.
- The API governs `minAppVersion`: use it to force updates without a new release.

## Verify

```bash
flutter analyze --fatal-infos
flutter test
tool/screenshots.sh                                   # simulator walkthrough with fixtures
tool/screenshots.sh "" integration_test/live_api_test.dart --dart-define=API_URL=http://localhost:8001
```
