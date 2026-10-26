const base = new URL('./', import.meta.url);
function destination() {
  const current = new URL(location.href);
  // Also works when a browser has cached an old gate at an app/document URL.
  if (current.pathname !== new URL('unlock.html', base).pathname) return current.href;
  try {
    const target = new URL(current.searchParams.get('next') || './', base);
    if (target.origin !== base.origin || !target.pathname.startsWith(base.pathname) || target.pathname === current.pathname) return base.href;
    if (current.hash) target.hash = current.hash;
    return target.href;
  } catch { return base.href; }
}
const target = destination();
const link = document.querySelector('#continue');
if (link) link.href = target;
// Fresh visitors need neither a worker nor browser storage. Existing visitors
// replace the old worker before navigating, so it cannot redirect them back.
try {
  if (navigator.serviceWorker) {
    const registration = await navigator.serviceWorker.getRegistration(base.href);
    if (registration?.scope === base.href) {
      await navigator.serviceWorker.register(new URL('sw.mjs', base), {type: 'module', scope: base.pathname, updateViaCache: 'none'});
      // Activation claims and reloads every old tab, including this one.
    } else location.replace(target);
  } else location.replace(target);
} catch {
  // Keep the usable link visible if a browser cannot update its old worker.
  const message = document.querySelector('main p');
  if (message) message.textContent = 'NMAtlas is now open without a password. Close other atlas tabs, then open the atlas below.';
}
