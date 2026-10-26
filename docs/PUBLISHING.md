# NMAtlas public website

Access update: 26 October 2026. Atlas content remains v0.17.0.

Live URL: https://alexkdot.github.io/NMAtlas/

Private development repository: https://github.com/ALEXKDOT/figee-map
Public website repository: https://github.com/ALEXKDOT/NMAtlas
Both use `main`; GitHub Pages publishes the public repository's root on push.

## Password removal

The website now serves the app, assets and documentation directly. No viewing
password, encryption key, login, session expiry, IndexedDB or service worker is
required to open it. The atlas's scientific content, interactions and teaching
pages are unchanged. Hosted pages still suppress local-only paper links.

The builder retains its tracked-file allowlist. Private papers, local source
configuration, credentials, development tools and private repository history
are not copied. Public app code and allowlisted assets are readable by visitors.

## Publish an update

1. Fetch both repositories and preserve unrelated changes.
2. Run the syntax checks and all checks in `.github/workflows/validate.yml`,
   including `node check-pages.mjs` and `node check-access.mjs`.
3. Commit and push the source changes to `figee-map/main`.
4. Run `node tools/build-pages.mjs /path/to/fresh/distribution`. No password or
   environment variable is needed. The output directory must be empty.
5. Replace generated files in the NMAtlas checkout, preserving `.git`. Remove
   obsolete `protected/`, `pages-config.json`, `crypto.mjs` and `lock.mjs` files.
6. Review, commit and push to `NMAtlas/main`. Wait for GitHub Pages to succeed,
   then verify the live atlas, teaching page and direct links without a password.

## Existing-browser migration

Keep `sw.mjs`, `unlock.html` and `unlock.mjs` at their existing URLs. The replacement
worker activates immediately, stops intercepting requests, attempts to delete
the old access database, unregisters itself and reloads tabs within the atlas
scope. Database deletion is best effort so blocked storage cannot hold up access.
Normal public app pages do not register a worker.

Old unlock links go to their in-scope destination, preserving queries and fragments;
external, malformed or recursive destinations fall back to the atlas root. Old
cached gate pages can also request the replacement worker. If an already-open
browser still shows its old password page, reload it so it can obtain the update.

`check-pages.mjs` builds without a password, compares published app files against
the source and checks output exclusions and stale-output rejection.
`check-access.mjs` covers old links, unsafe destinations, worker replacement,
scope isolation, disabled storage and closed tabs during migration.

Validation on 26 October: all 53 atlas, 13 teaching, 5 curation and 10 workspace
regression groups passed, along with citation and JavaScript/Python syntax checks.
All 279 published app/documentation files matched their source (apart from the
existing hosted-page flag). Real-browser checks covered the old locked worker
upgrading to public access, a saved lesson and step, lesson navigation and its 3D
iframe, and an old documentation unlock link with a fragment. The migration page
versions its script URL to avoid running cached password-form code.
