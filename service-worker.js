// Service Worker für Schatten von Dunkelheim
const CACHE_NAME = 'dunkelheim-v2';

// Dateien die gecached werden sollen
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'styles.css',
  'game-data.js',
  'game-engine.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Installation - Cache alle wichtigen Dateien
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache geöffnet');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Aktivierung - Alte Caches löschen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Alter Cache gelöscht:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch - Aus Cache laden, falls offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Kein Cache - Netzwerk anfragen
        return fetch(event.request).then((response) => {
          // Prüfen ob gültige Antwort
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Response klonen und cachen
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Offline und nicht im Cache - Fallback
        return caches.match('index.html');
      })
  );
});
