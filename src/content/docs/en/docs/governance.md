---
title: Governance
description: Who decides what, and how cities take part.
---

## Maintainers

The project was started and is maintained by [jeronimotech](https://github.com/jeronimotech). Current maintainers are listed in `.github/CODEOWNERS` of each repository. New maintainers are invited after sustained contributions.

## How decisions are made

- **Small changes** (fixes, contained improvements): one maintainer reviews and merges.
- **Contract changes** (the API the apps consume): proposed in an issue with the JSON shape, documented in `docs/API.md` and versioned as additions; an existing field is never broken without a transition period.
- **Product and roadmap decisions**: discussed publicly in Discussions; maintainers decide seeking consensus and explain why.

## Cities and agencies

A city can take part in three ways: contribute its data (public, well-maintained feeds), deploy its own instance (with its brand and panel), or contribute code and expertise from its teams. No formal agreement is needed to use the software; we do ask that the feeds used are public and openly licensed, and that the agency is credited in the app.

## Non-negotiable principles

Open data as the only input, no vendor lock-in, no advertising trackers in the apps, transparency with the user about what is estimated versus verified, and the MIT license.
