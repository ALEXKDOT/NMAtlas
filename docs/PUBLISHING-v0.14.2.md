# NMAtlas online edition · v0.14.2

Historical record: the owner removed the viewing-password requirement on
26 October 2026. Use [the current publishing instructions](PUBLISHING.md).
The encrypted build, password rotations and access checks below are retired.

Release: 5 October 2026.

The app is called NMAtlas in both headers, document titles, dynamic lesson titles,
data titles, the local launcher and textual project documentation. Author names
and publication citations are unchanged. Earlier screenshot attachments remain
historical records of their release. The private source repository keeps its
existing URL to preserve the established editing workflow.

## Hosting and updates

Live URL: https://alexkdot.github.io/NMAtlas/

Private working source: https://github.com/ALEXKDOT/figee-map
Public encrypted distribution: https://github.com/ALEXKDOT/NMAtlas

The current GitHub plan supports Pages from public repositories. Only the
password screen, access scripts and encrypted app files go to the public
repository. Original papers, machine-specific paths, the local source manifest,
Git history and plaintext app source are excluded. Publication links remain
available; original locally stored paper links are omitted online where possible.

The local source remains unencrypted and editable. Run it with `python3 serve.py`
or `Open NMAtlas.command` as before. Password protection does not affect editing,
Git access or the local server.

After future changes:

1. Run the atlas checks plus `node check-pages.mjs`.
2. Commit and push the private source repository.
3. Obtain the viewing password from the owner’s authorized session. Supply it
   only through the `NMATLAS_PASSWORD` environment variable; never commit it.
4. Run `node tools/build-pages.mjs /path/to/fresh/distribution`.
5. Replace only the generated files in a checkout of the public NMAtlas repository,
   preserving its `.git` directory. Commit and push. GitHub Pages publishes `main`
   from the root. Confirm the live deployment before reporting completion.

Use a fresh distribution folder for every build; old encrypted bundles must not
accumulate. Each deployment has fresh salt, IVs and filenames. A changed worker
version invalidates the previous browser session on the next update.

## Access behavior and limits

The browser derives a nonextractable AES-256-GCM key using PBKDF2-SHA-256 with
600,000 iterations and a random salt. Every app file and the route manifest is
encrypted with a unique 96-bit IV and its path as authenticated data. The password
is not written to the distribution. A service worker decrypts files only after
the password decrypts the manifest successfully. Decrypted responses use
`Cache-Control: no-store`; the app does not cache plaintext files.

The nonextractable key and decrypted routing manifest stay in browser storage for
8 hours so pages, reloads and teaching iframes continue to work. “Lock app” clears
the session and returns open app tabs to the password screen. New visitors and
direct links to the atlas or teaching page must unlock first. HTTPS and service
worker / IndexedDB support are required. There is no external login provider.

This is shared-password encryption for an educational atlas, not user accounts or
server-side authorization. The requested short password is vulnerable to offline
guessing because encrypted files are downloadable. Anyone given access can save
or share the decrypted app. Stronger confidentiality would require a longer
password or a server-backed access system. Do not use it to protect patient data.

## Validation

The required 52 atlas regression groups, citation checks, 11 teaching groups and
5 curation groups passed. Publishing checks decrypt and compare every bundled
file to its source, reject incorrect passwords and modified ciphertext, and
verify that plaintext app files and private papers are absent from the output.
Local browser checks passed: incorrect password rejection; successful unlock;
atlas geometry rendering; teaching iframe rendering and step navigation; reload
persistence; and explicit locking. Live deployment is verified after publication.

## Access-worker hotfix · 19 October 2026

The gate's former “access service did not respond” message was a MessageChannel
reply timeout in the browser, not an authentication API response. Password
submission decrypts the manifest before contacting the worker. A wrong password
fails that decryption and has its own message.

The gate now resolves the current worker for every request, so replacement of a
worker while the form is open cannot leave submission addressed to the original
worker. Request ports close on success, timeout, deserialization failure or send
failure. Storage opens and transactions have bounded waits; timed-out writes are
aborted, late database connections are closed, and failed session loading can be
retried. Configuration/manifest network requests in the worker are bounded.
Storage/configuration errors are no longer silently treated as a locked session.
Encryption, password derivation, session expiry and persistence-before-unlock are
unchanged.

`node check-access.mjs` reproduces the original timeout with a replaced worker and
checks the repair, blocked/hung storage, late connections, transaction aborts,
version mismatch, successful persistence and explicit locking. The incident's
original browser state is unavailable, so this establishes a reproducible defect,
not proof that worker replacement caused that individual incident.

For a gate-only hotfix, copy the reviewed `tools/pages/unlock.mjs` and
`tools/pages/sw.mjs` into the existing public distribution, retaining its
`// Deployment ...` marker. Verify the diff contains only these public scripts.
Do not rebuild or change pages-config.json, salt, manifest, encrypted payloads or
crypto.mjs. This narrowly scoped publishing path does not need the password and
preserves all existing encrypted content. App-content changes still require the
full encrypted rebuild above.

If access still fails: inspect the browser Console and Application → Service
Workers for this scope; check that the current controller is activated and matches
sw.mjs. In Network, pages-config.json and the manifest path it names must return
200 with JSON and binary content respectively. A 404 or HTML response is a
publishing/path problem; a pending/failed request is connectivity. Inspect
IndexedDB `nmatlas-access-/NMAtlas/` without exporting its session or key. Close
other atlas tabs before retrying blocked storage. Never include password values,
keys, session records or decrypted manifests in diagnostic logs. The site has no
server-side access endpoint, authentication environment variables or server auth
logs; NMATLAS_PASSWORD is only a build-time input.

Verification on 19 October: 53 atlas regression groups passed; all 278 bundled
files round-tripped through encryption, with wrong-password and tamper rejection.
The repaired distribution also passed a real-browser unlock with a disposable
local test password, reload persistence and explicit lock. The live old gate
correctly rejected an intentionally invalid password. No production password
was read or used; production successful-unlock validation remains user-side.

## Access-password rotation · 20 October 2026

Rebuild the current atlas distribution with the owner's replacement viewing
password, supplied only through `NMATLAS_PASSWORD`. The password is not stored
in either repository. This deployment uses a fresh salt, encrypted manifest,
encrypted assets and worker version so previous saved access sessions expire
when the updated worker activates. The atlas content and 19 October access-worker
repair are retained.

Future password rotations require the full encrypted rebuild and publishing
checks above; changing the password form or public configuration alone does not
change the encryption key.
