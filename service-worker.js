const APP_VERSION = 'v1';
const STATIC_CACHE = `static-cache-${APP_VERSION}`;
const RUNTIME_CACHE = `runtime-cache-${APP_VERSION}`;

const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
        .map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const cloned = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          const cloned = response.clone();
          caches.open(RUNTIME_CACHE).then(cache => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => {
          if (STATIC_ASSETS.includes(getRelativeUrl(event.request.url))) {
            return caches.match(event.request);
          }
          return undefined;
        });
    })
  );
});

function getRelativeUrl(requestUrl) {
  const url = new URL(requestUrl);
  const scope = self.registration.scope;
  return url.href.startsWith(scope) ? `./${url.href.slice(scope.length)}`.replace('//', '/') : requestUrl;
}
