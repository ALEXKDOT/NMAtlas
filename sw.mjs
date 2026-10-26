// One-time replacement for the former password worker. No fetch interception.
const base = new URL('./', import.meta.url);
function destination(href) {
  const current = new URL(href);
  if (current.pathname !== new URL('unlock.html', base).pathname) return current.href;
  try {
    const target = new URL(current.searchParams.get('next') || './', base);
    if (target.origin !== base.origin || !target.pathname.startsWith(base.pathname) || target.pathname === current.pathname) return base.href;
    if (current.hash) target.hash = current.hash;
    return target.href;
  } catch { return base.href; }
}
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  await self.clients.claim();
  // Storage may be blocked or disabled; it must never prevent public access.
  try { indexedDB.deleteDatabase('nmatlas-access-' + base.pathname); } catch {}
  await self.registration.unregister();
  const clients = await self.clients.matchAll({type: 'window'});
  await Promise.allSettled(clients.filter(client => client.url.startsWith(base.href)).map(client => client.navigate(destination(client.url))));
})()));
