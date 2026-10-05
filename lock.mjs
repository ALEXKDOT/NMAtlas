window.__NMATLAS_HOSTED__ = true;
if (window.top === window.self) {
  const header = document.querySelector('header');
  const button = document.createElement('button');
  button.type = 'button'; button.textContent = 'Lock app'; button.className = 'quiet';
  button.addEventListener('click', () => {
    button.disabled = true;
    const channel = new MessageChannel();
    channel.port1.onmessage = () => location.replace(new URL('unlock.html', import.meta.url));
    navigator.serviceWorker.controller?.postMessage({type: 'lock'}, [channel.port2]);
  });
  header?.append(button);
}
