import {decrypt} from './crypto.mjs';
const base = new URL('./', import.meta.url);
const publicFiles = new Set(['unlock.html', 'unlock.mjs', 'crypto.mjs', 'sw.mjs', 'lock.mjs', 'pages-config.json']);
let currentSession;
let sessionLoading;
let configuration;
async function config() {
  if (!configuration) configuration = fetch(new URL('pages-config.json', base), {cache: 'no-store', signal: AbortSignal.timeout(5000)}).then(r => {
    if (!r.ok) throw new Error('Access configuration unavailable');
    return r.json();
  }).catch(error => { configuration = undefined; throw error; });
  return configuration;
}
const storageError = () => new Error('Browser access storage is unavailable or blocked. Close other atlas tabs and allow site storage, then reload.');
async function database() {
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (error, db) => {
      if (settled) { db?.close(); return; }
      settled = true; clearTimeout(timer);
      if (error) reject(error); else resolve(db);
    };
    const timer = setTimeout(() => finish(storageError()), 3000);
    let request;
    try { request = indexedDB.open('nmatlas-access-' + base.pathname, 1); }
    catch { finish(storageError()); return; }
    request.onupgradeneeded = () => {
      if (settled) { request.transaction.abort(); return; }
      request.result.createObjectStore('access');
    };
    request.onsuccess = () => finish(null, request.result);
    request.onerror = () => finish(storageError());
    request.onblocked = () => finish(storageError());
  });
}
async function storage(mode, operation) {
  const db = await database();
  try { return await new Promise((resolve, reject) => {
    const tx = db.transaction('access', mode);
    const timer = setTimeout(() => {
      // Abort timed-out writes so a failed unlock cannot commit later.
      try { tx.abort(); } catch {}
      reject(storageError());
    }, 3000);
    tx.oncomplete = () => { clearTimeout(timer); resolve(request.result); };
    tx.onerror = tx.onabort = () => { clearTimeout(timer); reject(storageError()); };
    let request;
    try { request = operation(tx.objectStore('access')); }
    catch (error) { clearTimeout(timer); try { tx.abort(); } catch {} reject(error); }
  }); } finally { db.close(); }
}
async function loadSession() {
  if (!sessionLoading) sessionLoading = (async () => {
    const stored = await storage('readonly', s => s.get('session'));
    const settings = await config();
    if (stored?.version === settings.version && stored.expires > Date.now()) currentSession = stored;
  })().catch(error => { sessionLoading = undefined; throw error; });
  await sessionLoading;
  if (currentSession?.expires <= Date.now()) currentSession = undefined;
  return currentSession;
}
async function manifestFor(key) {
  const settings = await config();
  const response = await fetch(new URL(settings.manifest, base), {cache: 'no-store', signal: AbortSignal.timeout(5000)});
  if (!response.ok) throw new Error('Encrypted app unavailable');
  return JSON.parse(new TextDecoder().decode(await decrypt(key, await response.arrayBuffer(), 'manifest')));
}
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('message', event => {
  if (!event.ports[0] || !event.source?.url?.startsWith(base.href)) return;
  event.waitUntil((async () => {
    try {
      const settings = await config();
      await loadSession();
      if (event.data.type === 'unlock') {
        if (event.data.version !== settings.version) throw new Error('The app has been updated. Reload and try again.');
        const manifest = await manifestFor(event.data.key);
        if (manifest.version !== settings.version) throw new Error('App version mismatch');
        const session = {key: event.data.key, manifest, version: settings.version, expires: Date.now() + 8 * 60 * 60 * 1000};
        await storage('readwrite', s => s.put(session, 'session'));
        currentSession = session;
      } else if (event.data.type === 'lock') {
        await storage('readwrite', s => s.delete('session'));
        currentSession = undefined;
        for (const client of await self.clients.matchAll({type: 'window'})) {
          if (client.url.startsWith(base.href)) await client.navigate(new URL('unlock.html', base).href);
        }
      }
      event.ports[0].postMessage({unlocked: Boolean(currentSession)});
    } catch (error) { event.ports[0].postMessage({unlocked: false, error: ['TimeoutError', 'AbortError', 'TypeError'].includes(error.name) ? 'The atlas access files could not be loaded. Check your connection and reload.' : error.message}); }
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
  const relative = decodeURIComponent(url.pathname.slice(base.pathname.length)) || 'index.html';
  if (publicFiles.has(relative) || relative.startsWith('protected/')) return;
  event.respondWith((async () => {
    const headers = {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'};
    if (!['GET', 'HEAD'].includes(event.request.method)) return new Response('Method not allowed', {status: 405, headers});
    let session;
    try { session = await loadSession(); }
    catch { return new Response('Browser access storage or configuration is unavailable. Reload the atlas to try again.', {status: 503, headers}); }
    if (!session) {
      if (event.request.mode === 'navigate') {
        const gate = new URL('unlock.html', base); gate.searchParams.set('next', url.pathname + url.search);
        return Response.redirect(gate.href, 302);
      }
      return new Response('Unlock NMAtlas to access this file.', {status: 401, headers});
    }
    const entry = session.manifest.files[relative];
    if (!entry) return new Response('This file is not included in the online atlas. Original source papers are available only in the local app; use the publication links in the evidence panel.', {status: 404, headers});
    try {
      const response = await fetch(new URL(entry.file, base));
      if (!response.ok) throw new Error('Encrypted file unavailable');
      const bytes = await decrypt(session.key, await response.arrayBuffer(), relative);
      return new Response(event.request.method === 'HEAD' ? null : bytes, {headers: {...headers, 'Content-Type': entry.type}});
    } catch { return new Response('The app file could not be loaded. Reload to try again.', {status: 503, headers}); }
  })());
});

// Deployment c514d6ed-c30f-41b9-932f-e4ef7c789cbb
