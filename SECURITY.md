# Security policy

**Please do not open public issues for security problems.**

Report vulnerabilities in any opentransit component (api, web, mobile, this site) through
GitHub's private vulnerability reporting on the affected repository
(*Security → Report a vulnerability*), or by email to the maintainers listed in
`.github/CODEOWNERS`. You will get an acknowledgement within 5 working days.

Scope: the code in the `jeronimotech/opentransit-*` repositories. Third-party data feeds
(GTFS, GTFS-RT, GBFS) and the transit agencies' own systems are out of scope; report those
to the publisher.

What we care about most: the admin token and admin endpoints, anything that lets a client
reach a private upstream, injection through feed content (names, alert text, URLs), and
supply-chain issues in dependencies. Supported versions: `main` of each repo.
