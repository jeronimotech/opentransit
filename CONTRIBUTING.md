# Contributing to the opentransit site and docs

Thanks for helping. This repo holds the project landing page and the developer documentation
(Astro + Starlight). Code lives in `opentransit-api`, `opentransit-web` and `opentransit-mobile`;
open code changes there.

## Docs

- Spanish is the source language (`src/content/docs/docs/*.md`); English lives under
  `src/content/docs/en/docs/*.md` with the same file names. Change both when you can; if you
  can't, open the PR anyway and say so.
- Keep facts checkable: link to the README, contract or config file the statement comes from.
- No secrets, tokens, private hostnames or personal paths in examples.

## Local

```bash
npm ci
npm run dev          # http://localhost:4321/opentransit/
npm run build && npm run check:links
```

## Pull requests

Small and focused. CI builds the site and checks internal links. A maintainer reviews within a
week. By contributing you agree your work is licensed under MIT (code) and CC BY 4.0 (docs).
