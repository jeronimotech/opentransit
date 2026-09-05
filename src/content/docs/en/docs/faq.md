---
title: FAQ
description: What cities, operators and developers usually ask.
---

### What does a city need to use opentransit?
A static GTFS feed on a URL. GTFS-Realtime (positions, trip updates, alerts) and GBFS are optional and enable the live and bike-share features.

### Are there API keys or paid services?
No. OpenFreeMap basemap, geocoding with Photon plus the GTFS stops, routing with OpenTripPlanner. A city can swap any of them through configuration.

### Can a city brand it?
Yes: name, primary colour, logo, components and colours, service tiles, official links and its own public landing, all from config and the admin panel. Mobile apps ship with the city's id and icons.

### How are fares computed if the GTFS has none?
With a configurable estimated flat fare per city (base fare, transfer cost, transfer window, max transfers), editable in the admin. Apps always show it as "estimated". If the feed publishes fares (GTFS-Fares), the router uses them.

### What happens when realtime fails?
Apps never show empty stops: they fall back to "scheduled" and say "no live data for N s" from the API's health status.

### Can it integrate with taxis or ride-hailing apps?
On the roadmap: estimates from each city's regulated tariff and hand-off through deep links to configurable operators; real-time price integrations depend on agreements with each platform.

### How many cities per installation?
Several. One API instance serves N cities; each city has its own OpenTripPlanner. The apps show a picker when there is more than one.

### How much hardware?
For Bogotá (1,000+ routes, 9.6 million `stop_times`): the graph builds in about 2 minutes and OpenTripPlanner serves with about 3 GB of RAM; the API uses about 200 MB.

### Which license?
MIT for the code; CC BY 4.0 for this documentation. Data belongs to each agency under its own license.
