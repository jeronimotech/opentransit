# opentransit

**Open-source, multi-city, multimodal trip planning on open data.**

[![Site](https://github.com/jeronimotech/opentransit/actions/workflows/deploy.yml/badge.svg)](https://github.com/jeronimotech/opentransit/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/code-MIT-green.svg)](LICENSE)
[![Docs: CC BY 4.0](https://img.shields.io/badge/docs-CC%20BY%204.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)

This repository is the **project hub**: the landing page and the developer documentation, published at
**https://opentransit.tech/** (Spanish by default, English at `/en/`).

opentransit takes the open data a city already publishes (GTFS, GTFS-Realtime, GBFS, OpenStreetMap) and delivers a
web app, a mobile app and an admin panel. No API keys, no proprietary services, MIT licensed. First city on live data:
Bogotá.

| Repository | What | Stack |
|---|---|---|
| [opentransit-api](https://github.com/jeronimotech/opentransit-api) | Multi-tenant backend: city registry, GTFS ingest, live GTFS-RT, bike-share (GBFS), routing via OpenTripPlanner, runtime-editable config | Python · FastAPI · PostGIS · OpenTripPlanner 2 |
| [opentransit-web](https://github.com/jeronimotech/opentransit-web) | Web app (PWA), admin panel, per-city landing | Next.js · TypeScript · MapLibre |
| [opentransit-mobile](https://github.com/jeronimotech/opentransit-mobile) | iOS / Android app | Flutter · MapLibre |

<p>
  <img src="docs-screenshots/landing-desktop.png" alt="Project landing page (desktop)" width="640">
  <img src="docs-screenshots/landing-mobile.png" alt="Project landing page (phone)" width="150">
</p>

## Docs

- [Getting started](https://opentransit.tech/docs/getting-started/) · [Architecture](https://opentransit.tech/docs/architecture/) · [Adding a city](https://opentransit.tech/docs/adding-a-city/)
- [Admin panel](https://opentransit.tech/docs/admin-panel/) · [Web app](https://opentransit.tech/docs/web-app/) · [Mobile app](https://opentransit.tech/docs/mobile-app/) · [Data quality](https://opentransit.tech/docs/data-quality/)
- [API reference](https://opentransit.tech/docs/api/) · [Roadmap](https://opentransit.tech/docs/roadmap/) · [FAQ](https://opentransit.tech/docs/faq/)
- [Contributing](https://opentransit.tech/docs/contributing/) · [Governance](https://opentransit.tech/docs/governance/) · [Security](https://opentransit.tech/docs/security/) · [License](https://opentransit.tech/docs/license/)

## Working on this site

Astro + Starlight, Tailwind, no external services. Spanish sources in `src/content/docs/docs/`, English in
`src/content/docs/en/docs/`; the landing is `src/components/Landing.astro` (both languages).

```bash
npm ci
npm run dev                 # http://localhost:4321/opentransit/
npm run build && npm run check:links
npm run preview & npm run screenshots   # docs-screenshots/ (Playwright)
```

Deploys to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`).

## Community

- Questions and ideas: [Discussions](https://github.com/jeronimotech/opentransit/discussions)
- Propose a city: [New city issue](https://github.com/jeronimotech/opentransit/issues/new/choose)
- Security: [SECURITY.md](SECURITY.md) · Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) · Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)

Code is MIT; documentation content is CC BY 4.0. Data belongs to each transit agency under its own license.
