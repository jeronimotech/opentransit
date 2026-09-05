---
title: Security policy
description: How to report vulnerabilities and what we protect.
---

**Please do not open public issues for security problems.**

Report vulnerabilities in any component (API, web, mobile, this site) through GitHub's private vulnerability reporting on the affected repository (*Security → Report a vulnerability*) or by email to the maintainers listed in `.github/CODEOWNERS`. You will hear back within 5 working days.

## Scope

The code in the `jeronimotech/opentransit-*` repositories. Third-party feeds (GTFS, GTFS-RT, GBFS) and the agencies' own systems are out of scope; report those to the publisher.

## What we care about most

- The admin token and the `/v1/admin/*` endpoints.
- Any way for a client to reach a private upstream system.
- Injection through feed content (names, alert text, URLs).
- Supply chain in dependencies.

## Deployment recommendations

Serve the admin panel over HTTPS only, use a long and rotated `ADMIN_TOKEN`, disable `/admin` on public deployments that do not need it, and keep the API behind a rate-limiting proxy.
