export const ITERATIONS = 600000;
export function fromBase64(value) {
  return Uint8Array.from(atob(value), c => c.charCodeAt(0));
}
export async function deriveKey(password, salt) {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({name: 'PBKDF2', salt: fromBase64(salt), iterations: ITERATIONS, hash: 'SHA-256'}, material, {name: 'AES-GCM', length: 256}, false, ['encrypt', 'decrypt']);
}
export async function decrypt(key, bytes, path) {
  const data = new Uint8Array(bytes);
  return crypto.subtle.decrypt({name: 'AES-GCM', iv: data.slice(0, 12), additionalData: new TextEncoder().encode(path)}, key, data.slice(12));
}
