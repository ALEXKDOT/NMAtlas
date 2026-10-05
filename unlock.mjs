import {deriveKey, decrypt} from './crypto.mjs';
const base = new URL('./', import.meta.url);
const form = document.querySelector('#unlock');
const input = document.querySelector('#password');
const button = document.querySelector('#submit');
const message = document.querySelector('#message');
function request(worker, data) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const timer = setTimeout(() => reject(new Error('The access service did not respond. Reload and try again.')), 15000);
    channel.port1.onmessage = event => { clearTimeout(timer); channel.port1.close(); resolve(event.data); };
    worker.postMessage(data, [channel.port2]);
  });
}
function destination() {
  const current = new URL(location.href);
  let target = current.pathname.endsWith('/unlock.html') ? new URL(current.searchParams.get('next') || './', base) : current;
  if (current.pathname.endsWith('/unlock.html')) target.hash = current.hash;
  if (target.origin !== base.origin || !target.pathname.startsWith(base.pathname) || target.pathname.endsWith('/unlock.html')) target = base;
  return target.href;
}
try {
  if (!isSecureContext || !navigator.serviceWorker || !crypto.subtle) throw new Error('Open this page in a browser with HTTPS and JavaScript enabled.');
  const registration = await navigator.serviceWorker.register(new URL('sw.mjs', base), {type: 'module', scope: base.pathname, updateViaCache: 'none'});
  await navigator.serviceWorker.ready;
  if (!navigator.serviceWorker.controller) await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange', resolve, {once: true}));
  const worker = navigator.serviceWorker.controller || registration.active;
  const config = await (await fetch(new URL('pages-config.json', base), {cache: 'no-store'})).json();
  const status = await request(worker, {type: 'status', version: config.version});
  if (status.unlocked) location.replace(destination());
  else { button.disabled = false; message.textContent = ''; }
  form.addEventListener('submit', async event => {
    event.preventDefault(); button.disabled = true; message.textContent = 'Opening atlas…';
    try {
      const key = await deriveKey(input.value, config.salt);
      const response = await fetch(new URL(config.manifest, base), {cache: 'no-store'});
      if (!response.ok) throw new Error('The app could not be loaded. Reload and try again.');
      const manifest = JSON.parse(new TextDecoder().decode(await decrypt(key, await response.arrayBuffer(), 'manifest')));
      if (manifest.version !== config.version) throw new Error('The app has been updated. Reload and try again.');
      const result = await request(worker, {type: 'unlock', key, version: config.version});
      if (!result.unlocked) throw new Error(result.error || 'Access could not be saved. Enable browser storage and try again.');
      input.value = ''; location.replace(destination());
    } catch (error) {
      message.textContent = error.name === 'OperationError' ? 'Incorrect password. Please try again.' : error.message;
      button.disabled = false; input.focus(); input.select();
    }
  });
} catch (error) { message.textContent = error.message; }
